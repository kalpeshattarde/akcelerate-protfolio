import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';
import 'package:wakelock_plus/wakelock_plus.dart';

import '../../core/app_export.dart';
import '../../widgets/custom_app_bar.dart';
import '../../widgets/custom_icon_widget.dart';
import './widgets/active_timer_widget.dart';
import './widgets/contraction_log_item_widget.dart';
import './widgets/emergency_contact_widget.dart';
import './widgets/export_dialog_widget.dart';
import './widgets/pattern_recognition_widget.dart';

class ContractionTimer extends StatefulWidget {
  const ContractionTimer({super.key});

  @override
  State<ContractionTimer> createState() => _ContractionTimerState();
}

class _ContractionTimerState extends State<ContractionTimer>
    with WidgetsBindingObserver {
  // Timer state
  bool _isTimingContraction = false;
  DateTime? _contractionStartTime;
  Timer? _timer;
  Duration _currentDuration = Duration.zero;

  // Contraction log data
  final List<Map<String, dynamic>> _contractionLog = [];

  // Pattern recognition
  double _averageDuration = 0.0;
  double _averageInterval = 0.0;
  bool _showHospitalAlert = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    // Prevent screen from sleeping during active timing
    WakelockPlus.enable();
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    _timer?.cancel();
    WakelockPlus.disable();
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    // Maintain timing even when app goes to background
    if (state == AppLifecycleState.paused && _isTimingContraction) {
      // Timer continues in background
    }
  }

  void _startContraction() {
    setState(() {
      _isTimingContraction = true;
      _contractionStartTime = DateTime.now();
      _currentDuration = Duration.zero;
    });

    // Maximum haptic feedback for start
    Feedback.forLongPress(context);

    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_contractionStartTime != null) {
        setState(() {
          _currentDuration = DateTime.now().difference(_contractionStartTime!);
        });
      }
    });
  }

  void _endContraction({int? intensity}) {
    if (_contractionStartTime == null) return;

    final endTime = DateTime.now();
    final duration = endTime.difference(_contractionStartTime!);

    // Calculate interval from previous contraction
    double? interval;
    if (_contractionLog.isNotEmpty) {
      final previousEnd = _contractionLog.last['endTime'] as DateTime;
      interval =
          _contractionStartTime!.difference(previousEnd).inSeconds / 60.0;
    }

    setState(() {
      _contractionLog.insert(0, {
        'id': DateTime.now().millisecondsSinceEpoch,
        'startTime': _contractionStartTime,
        'endTime': endTime,
        'duration': duration,
        'interval': interval,
        'intensity': intensity,
      });

      _isTimingContraction = false;
      _contractionStartTime = null;
      _currentDuration = Duration.zero;
    });

    _timer?.cancel();
    _timer = null;

    // Strong haptic feedback for end
    HapticFeedback.mediumImpact();

    // Recalculate patterns
    _calculatePatterns();
  }

  void _calculatePatterns() {
    if (_contractionLog.length < 3) return;

    // Calculate average duration (last 5 contractions)
    final recentContractions = _contractionLog.take(5).toList();
    final totalDuration = recentContractions.fold<int>(
      0,
      (sum, item) => sum + (item['duration'] as Duration).inSeconds,
    );
    _averageDuration = totalDuration / recentContractions.length / 60.0;

    // Calculate average interval
    final intervalsOnly = recentContractions
        .where((item) => item['interval'] != null)
        .map((item) => item['interval'] as double)
        .toList();

    if (intervalsOnly.isNotEmpty) {
      _averageInterval =
          intervalsOnly.reduce((a, b) => a + b) / intervalsOnly.length;
    }

    // Check hospital timing guidelines (5-1-1 rule: 5 min apart, 1 min long, for 1 hour)
    if (_averageDuration >= 1.0 &&
        _averageInterval <= 5.0 &&
        _contractionLog.length >= 12) {
      setState(() {
        _showHospitalAlert = true;
      });
    }
  }

  void _deleteContraction(int id) {
    setState(() {
      _contractionLog.removeWhere((item) => item['id'] == id);
    });
    _calculatePatterns();
  }

  void _editContraction(int id, int newIntensity) {
    setState(() {
      final index = _contractionLog.indexWhere((item) => item['id'] == id);
      if (index != -1) {
        _contractionLog[index]['intensity'] = newIntensity;
      }
    });
  }

  void _showExportDialog() {
    showDialog(
      context: context,
      builder: (context) => ExportDialogWidget(
        contractionLog: _contractionLog,
        averageDuration: _averageDuration,
        averageInterval: _averageInterval,
      ),
    );
  }

  void _showIntensityDialog() {
    showDialog(
      context: context,
      builder: (context) {
        final theme = Theme.of(context);
        int selectedIntensity = 5;

        return StatefulBuilder(
          builder: (context, setDialogState) {
            return AlertDialog(
              title: Text(
                'Rate Contraction Intensity',
                style: theme.textTheme.titleLarge,
              ),
              content: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    'On a scale of 1-10, how intense was this contraction?',
                    style: theme.textTheme.bodyMedium,
                  ),
                  SizedBox(height: 3.h),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        '1',
                        style: theme.textTheme.bodySmall,
                      ),
                      Expanded(
                        child: Slider(
                          value: selectedIntensity.toDouble(),
                          min: 1,
                          max: 10,
                          divisions: 9,
                          label: selectedIntensity.toString(),
                          onChanged: (value) {
                            setDialogState(() {
                              selectedIntensity = value.toInt();
                            });
                            HapticFeedback.selectionClick();
                          },
                        ),
                      ),
                      Text(
                        '10',
                        style: theme.textTheme.bodySmall,
                      ),
                    ],
                  ),
                  SizedBox(height: 1.h),
                  Text(
                    'Intensity: $selectedIntensity',
                    style: theme.textTheme.titleMedium?.copyWith(
                      color: theme.colorScheme.primary,
                    ),
                  ),
                ],
              ),
              actions: [
                TextButton(
                  onPressed: () {
                    Navigator.pop(context);
                    _endContraction();
                  },
                  child: Text('Skip'),
                ),
                ElevatedButton(
                  onPressed: () {
                    Navigator.pop(context);
                    _endContraction(intensity: selectedIntensity);
                  },
                  child: Text('Save'),
                ),
              ],
            );
          },
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      appBar: CustomAppBar.detail(
        title: 'Contraction Timer',
        onBackPressed: () => Navigator.pop(context),
        actions: [
          if (_contractionLog.isNotEmpty)
            CustomAppBarAction(
              icon: Icons.file_download_outlined,
              tooltip: 'Export Data',
              onPressed: _showExportDialog,
            ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Emergency contact banner
            EmergencyContactWidget(),

            // Hospital alert banner
            if (_showHospitalAlert)
              Container(
                width: double.infinity,
                padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
                color: theme.colorScheme.error.withValues(alpha: 0.1),
                child: Row(
                  children: [
                    CustomIconWidget(
                      iconName: 'warning_amber_rounded',
                      color: theme.colorScheme.error,
                      size: 24,
                    ),
                    SizedBox(width: 3.w),
                    Expanded(
                      child: Text(
                        'Contractions are regular. Consider contacting your healthcare provider.',
                        style: theme.textTheme.bodyMedium?.copyWith(
                          color: theme.colorScheme.error,
                        ),
                      ),
                    ),
                    IconButton(
                      icon: CustomIconWidget(
                        iconName: 'close',
                        color: theme.colorScheme.error,
                        size: 20,
                      ),
                      onPressed: () {
                        setState(() {
                          _showHospitalAlert = false;
                        });
                      },
                    ),
                  ],
                ),
              ),

            Expanded(
              child: SingleChildScrollView(
                padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    // Active timer or start button
                    if (_isTimingContraction)
                      ActiveTimerWidget(
                        duration: _currentDuration,
                        onEndContraction: _showIntensityDialog,
                      )
                    else
                      _buildStartButton(theme),

                    SizedBox(height: 3.h),

                    // Pattern recognition
                    if (_contractionLog.length >= 3)
                      PatternRecognitionWidget(
                        averageDuration: _averageDuration,
                        averageInterval: _averageInterval,
                        contractionCount: _contractionLog.length,
                      ),

                    SizedBox(height: 3.h),

                    // Contraction log header
                    if (_contractionLog.isNotEmpty) ...[
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            'Contraction Log',
                            style: theme.textTheme.titleLarge,
                          ),
                          TextButton.icon(
                            onPressed: () {
                              showDialog(
                                context: context,
                                builder: (context) => AlertDialog(
                                  title: Text('Clear All Contractions?'),
                                  content: Text(
                                    'This will delete all recorded contractions. This action cannot be undone.',
                                  ),
                                  actions: [
                                    TextButton(
                                      onPressed: () => Navigator.pop(context),
                                      child: Text('Cancel'),
                                    ),
                                    ElevatedButton(
                                      onPressed: () {
                                        setState(() {
                                          _contractionLog.clear();
                                          _averageDuration = 0.0;
                                          _averageInterval = 0.0;
                                          _showHospitalAlert = false;
                                        });
                                        Navigator.pop(context);
                                      },
                                      style: ElevatedButton.styleFrom(
                                        backgroundColor:
                                            theme.colorScheme.error,
                                      ),
                                      child: Text('Clear All'),
                                    ),
                                  ],
                                ),
                              );
                            },
                            icon: CustomIconWidget(
                              iconName: 'delete_outline',
                              color: theme.colorScheme.error,
                              size: 20,
                            ),
                            label: Text(
                              'Clear All',
                              style: TextStyle(color: theme.colorScheme.error),
                            ),
                          ),
                        ],
                      ),
                      SizedBox(height: 2.h),

                      // Contraction log list
                      ListView.separated(
                        shrinkWrap: true,
                        physics: NeverScrollableScrollPhysics(),
                        itemCount: _contractionLog.length,
                        separatorBuilder: (context, index) =>
                            SizedBox(height: 2.h),
                        itemBuilder: (context, index) {
                          final contraction = _contractionLog[index];
                          return ContractionLogItemWidget(
                            contraction: contraction,
                            onDelete: () =>
                                _deleteContraction(contraction['id']),
                            onEdit: (intensity) => _editContraction(
                              contraction['id'],
                              intensity,
                            ),
                          );
                        },
                      ),
                    ] else
                      _buildEmptyState(theme),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStartButton(ThemeData theme) {
    return Container(
      width: double.infinity,
      height: 30.h,
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            theme.colorScheme.primary,
            theme.colorScheme.primaryContainer,
          ],
        ),
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: theme.colorScheme.primary.withValues(alpha: 0.3),
            blurRadius: 20,
            offset: Offset(0, 10),
          ),
        ],
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: _startContraction,
          borderRadius: BorderRadius.circular(20),
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                CustomIconWidget(
                  iconName: 'play_circle_filled',
                  color: theme.colorScheme.onPrimary,
                  size: 64,
                ),
                SizedBox(height: 2.h),
                Text(
                  'Start Contraction',
                  style: theme.textTheme.headlineMedium?.copyWith(
                    color: theme.colorScheme.onPrimary,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                SizedBox(height: 1.h),
                Text(
                  'Tap when contraction begins',
                  style: theme.textTheme.bodyLarge?.copyWith(
                    color: theme.colorScheme.onPrimary.withValues(alpha: 0.9),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildEmptyState(ThemeData theme) {
    return Container(
      padding: EdgeInsets.all(8.w),
      child: Column(
        children: [
          CustomIconWidget(
            iconName: 'timer_outlined',
            color: theme.colorScheme.onSurfaceVariant,
            size: 80,
          ),
          SizedBox(height: 3.h),
          Text(
            'No Contractions Recorded',
            style: theme.textTheme.titleLarge?.copyWith(
              color: theme.colorScheme.onSurfaceVariant,
            ),
            textAlign: TextAlign.center,
          ),
          SizedBox(height: 1.h),
          Text(
            'Start timing your contractions to track patterns and prepare for labor.',
            style: theme.textTheme.bodyMedium?.copyWith(
              color: theme.colorScheme.onSurfaceVariant,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}