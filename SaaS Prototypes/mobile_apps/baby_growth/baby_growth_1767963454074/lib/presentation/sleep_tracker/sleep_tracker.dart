import 'dart:async';

import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/sleep_log_widget.dart';
import './widgets/sleep_pattern_widget.dart';
import './widgets/sleep_quality_selector_widget.dart';
import './widgets/sleep_summary_widget.dart';
import './widgets/sleep_timer_widget.dart';

class SleepTracker extends StatefulWidget {
  const SleepTracker({Key? key}) : super(key: key);

  @override
  State<SleepTracker> createState() => _SleepTrackerState();
}

class _SleepTrackerState extends State<SleepTracker>
    with TickerProviderStateMixin {
  bool _isTimerActive = false;
  Duration _currentDuration = Duration.zero;
  DateTime? _sessionStartTime;
  Timer? _timer;
  late TabController _tabController;

  // Mock data for sleep sessions
  final List<Map<String, dynamic>> _sleepSessions = [
    {
      "id": 1,
      "startTime": DateTime.now().subtract(const Duration(hours: 8)),
      "endTime": DateTime.now().subtract(const Duration(hours: 2)),
      "duration": const Duration(hours: 6),
      "type": "night",
      "quality": "peaceful",
      "notes": "Slept through the night without waking up",
    },
    {
      "id": 2,
      "startTime": DateTime.now().subtract(const Duration(hours: 12)),
      "endTime": DateTime.now().subtract(const Duration(hours: 11)),
      "duration": const Duration(hours: 1),
      "type": "nap",
      "quality": "normal",
      "notes": "Short afternoon nap",
    },
    {
      "id": 3,
      "startTime": DateTime.now().subtract(const Duration(days: 1, hours: 8)),
      "endTime": DateTime.now().subtract(const Duration(days: 1, hours: 3)),
      "duration": const Duration(hours: 5),
      "type": "night",
      "quality": "restless",
      "notes": "Woke up several times during the night",
    },
    {
      "id": 4,
      "startTime": DateTime.now().subtract(const Duration(days: 1, hours: 14)),
      "endTime": DateTime.now().subtract(const Duration(days: 1, hours: 13)),
      "duration": const Duration(minutes: 45),
      "type": "nap",
      "quality": "peaceful",
      "notes": "Good morning nap",
    },
  ];

  // Mock data for weekly sleep pattern
  final List<Map<String, dynamic>> _weeklyData = [
    {"dayHours": 2.5, "nightHours": 8.0},
    {"dayHours": 3.0, "nightHours": 7.5},
    {"dayHours": 2.0, "nightHours": 8.5},
    {"dayHours": 2.8, "nightHours": 7.8},
    {"dayHours": 3.2, "nightHours": 8.2},
    {"dayHours": 2.6, "nightHours": 7.9},
    {"dayHours": 2.9, "nightHours": 8.1},
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _timer?.cancel();
    _tabController.dispose();
    super.dispose();
  }

  void _toggleTimer() {
    setState(() {
      if (_isTimerActive) {
        _stopTimer();
      } else {
        _startTimer();
      }
    });
  }

  void _startTimer() {
    _isTimerActive = true;
    _sessionStartTime = DateTime.now();
    _currentDuration = Duration.zero;

    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (mounted) {
        setState(() {
          _currentDuration = DateTime.now().difference(_sessionStartTime!);
        });
      }
    });
  }

  void _stopTimer() {
    _timer?.cancel();
    _isTimerActive = false;

    if (_sessionStartTime != null && _currentDuration.inMinutes > 0) {
      _showSleepSessionDialog();
    }
  }

  void _showSleepSessionDialog() {
    String selectedQuality = 'normal';
    String selectedType = 'nap';
    TextEditingController notesController = TextEditingController();

    showDialog(
      context: context,
      builder: (BuildContext context) {
        return StatefulBuilder(
          builder: (context, setDialogState) {
            return AlertDialog(
              title: Text(
                'Save Sleep Session',
                style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
              content: SingleChildScrollView(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Duration: ${_formatDuration(_currentDuration)}',
                      style:
                          AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                        color: AppTheme.lightTheme.colorScheme.primary,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    SizedBox(height: 2.h),
                    Text(
                      'Sleep Type',
                      style: AppTheme.lightTheme.textTheme.titleSmall?.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    SizedBox(height: 1.h),
                    Row(
                      children: [
                        Expanded(
                          child: RadioListTile<String>(
                            title: const Text('Nap'),
                            value: 'nap',
                            groupValue: selectedType,
                            onChanged: (value) {
                              setDialogState(() {
                                selectedType = value!;
                              });
                            },
                            contentPadding: EdgeInsets.zero,
                          ),
                        ),
                        Expanded(
                          child: RadioListTile<String>(
                            title: const Text('Night'),
                            value: 'night',
                            groupValue: selectedType,
                            onChanged: (value) {
                              setDialogState(() {
                                selectedType = value!;
                              });
                            },
                            contentPadding: EdgeInsets.zero,
                          ),
                        ),
                      ],
                    ),
                    SizedBox(height: 2.h),
                    SleepQualitySelectorWidget(
                      selectedQuality: selectedQuality,
                      onQualitySelected: (quality) {
                        setDialogState(() {
                          selectedQuality = quality;
                        });
                      },
                    ),
                    SizedBox(height: 2.h),
                    TextField(
                      controller: notesController,
                      decoration: const InputDecoration(
                        labelText: 'Notes (optional)',
                        hintText: 'Add any observations about the sleep...',
                      ),
                      maxLines: 3,
                    ),
                  ],
                ),
              ),
              actions: [
                TextButton(
                  onPressed: () {
                    Navigator.of(context).pop();
                    setState(() {
                      _currentDuration = Duration.zero;
                    });
                  },
                  child: const Text('Cancel'),
                ),
                ElevatedButton(
                  onPressed: () {
                    _saveSleepSession(
                        selectedType, selectedQuality, notesController.text);
                    Navigator.of(context).pop();
                  },
                  child: const Text('Save'),
                ),
              ],
            );
          },
        );
      },
    );
  }

  void _saveSleepSession(String type, String quality, String notes) {
    final newSession = {
      "id": _sleepSessions.length + 1,
      "startTime": _sessionStartTime!,
      "endTime": DateTime.now(),
      "duration": _currentDuration,
      "type": type,
      "quality": quality,
      "notes": notes.isNotEmpty ? notes : null,
    };

    setState(() {
      _sleepSessions.insert(0, newSession);
      _currentDuration = Duration.zero;
    });
  }

  void _editSleepSession(int index) {
    // Implementation for editing sleep session
    // This would open a similar dialog to the save dialog
  }

  void _deleteSleepSession(int index) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Delete Sleep Session'),
          content:
              const Text('Are you sure you want to delete this sleep session?'),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('Cancel'),
            ),
            ElevatedButton(
              onPressed: () {
                setState(() {
                  _sleepSessions.removeAt(index);
                });
                Navigator.of(context).pop();
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: AppTheme.lightTheme.colorScheme.error,
              ),
              child: const Text('Delete'),
            ),
          ],
        );
      },
    );
  }

  String _formatDuration(Duration duration) {
    String twoDigits(int n) => n.toString().padLeft(2, '0');
    String hours = twoDigits(duration.inHours);
    String minutes = twoDigits(duration.inMinutes.remainder(60));
    String seconds = twoDigits(duration.inSeconds.remainder(60));
    return '$hours:$minutes:$seconds';
  }

  Duration _getTodayTotalSleep() {
    final today = DateTime.now();
    int totalMinutes = 0;

    for (var session in _sleepSessions) {
      final sessionDate = session['startTime'] as DateTime;
      if (sessionDate.day == today.day &&
          sessionDate.month == today.month &&
          sessionDate.year == today.year) {
        totalMinutes += (session['duration'] as Duration).inMinutes;
      }
    }

    return Duration(minutes: totalMinutes);
  }

  Duration _getTodayDaySleep() {
    final today = DateTime.now();
    int totalMinutes = 0;

    for (var session in _sleepSessions) {
      final sessionDate = session['startTime'] as DateTime;
      if (sessionDate.day == today.day &&
          sessionDate.month == today.month &&
          sessionDate.year == today.year &&
          session['type'] == 'nap') {
        totalMinutes += (session['duration'] as Duration).inMinutes;
      }
    }

    return Duration(minutes: totalMinutes);
  }

  Duration _getTodayNightSleep() {
    final today = DateTime.now();
    int totalMinutes = 0;

    for (var session in _sleepSessions) {
      final sessionDate = session['startTime'] as DateTime;
      if (sessionDate.day == today.day &&
          sessionDate.month == today.month &&
          sessionDate.year == today.year &&
          session['type'] == 'night') {
        totalMinutes += (session['duration'] as Duration).inMinutes;
      }
    }

    return Duration(minutes: totalMinutes);
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      appBar: AppBar(
        title: Text(
          'Sleep Tracker',
          style: theme.appBarTheme.titleTextStyle,
        ),
        backgroundColor: theme.appBarTheme.backgroundColor,
        elevation: theme.appBarTheme.elevation,
        leading: IconButton(
          onPressed: () => Navigator.pop(context),
          icon: CustomIconWidget(
            iconName: 'arrow_back',
            color: colorScheme.onSurface,
            size: 6.w,
          ),
        ),
        actions: [
          IconButton(
            onPressed: () {
              // Navigate to historical records
              Navigator.pushNamed(context, '/historical-records');
            },
            icon: CustomIconWidget(
              iconName: 'history',
              color: colorScheme.primary,
              size: 6.w,
            ),
          ),
        ],
        bottom: TabBar(
          controller: _tabController,
          tabs: const [
            Tab(text: 'Timer'),
            Tab(text: 'Log'),
            Tab(text: 'Patterns'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          // Timer Tab
          SingleChildScrollView(
            padding: EdgeInsets.all(4.w),
            child: Column(
              children: [
                SleepSummaryWidget(
                  totalSleep: _getTodayTotalSleep(),
                  daySleep: _getTodayDaySleep(),
                  nightSleep: _getTodayNightSleep(),
                ),
                SizedBox(height: 3.h),
                SleepTimerWidget(
                  isTimerActive: _isTimerActive,
                  currentDuration: _currentDuration,
                  onStartStop: _toggleTimer,
                ),
                SizedBox(height: 3.h),
                if (_sleepSessions.isNotEmpty) ...[
                  Container(
                    width: double.infinity,
                    padding: EdgeInsets.all(4.w),
                    decoration: BoxDecoration(
                      color: colorScheme.surface,
                      borderRadius: BorderRadius.circular(4.w),
                      boxShadow: [
                        BoxShadow(
                          color: colorScheme.shadow,
                          blurRadius: 8,
                          offset: const Offset(0, 2),
                        ),
                      ],
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Recent Sleep Sessions',
                          style: theme.textTheme.titleMedium?.copyWith(
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        SizedBox(height: 2.h),
                        ..._sleepSessions.take(3).map((session) {
                          final duration = session['duration'] as Duration;
                          final type = session['type'] as String;
                          final startTime = session['startTime'] as DateTime;

                          return Padding(
                            padding: EdgeInsets.only(bottom: 2.h),
                            child: Row(
                              children: [
                                CustomIconWidget(
                                  iconName: type == 'night'
                                      ? 'nights_stay'
                                      : 'wb_sunny',
                                  color: type == 'night'
                                      ? colorScheme.primary
                                      : colorScheme.secondary,
                                  size: 5.w,
                                ),
                                SizedBox(width: 3.w),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        '${type.toUpperCase()} SLEEP',
                                        style: theme.textTheme.labelSmall
                                            ?.copyWith(
                                          color: type == 'night'
                                              ? colorScheme.primary
                                              : colorScheme.secondary,
                                          fontWeight: FontWeight.w600,
                                        ),
                                      ),
                                      Text(
                                        '${startTime.hour.toString().padLeft(2, '0')}:${startTime.minute.toString().padLeft(2, '0')}',
                                        style:
                                            theme.textTheme.bodySmall?.copyWith(
                                          color: colorScheme.onSurfaceVariant,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                                Text(
                                  '${duration.inHours}h ${duration.inMinutes.remainder(60)}m',
                                  style: theme.textTheme.titleSmall?.copyWith(
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                              ],
                            ),
                          );
                        }).toList(),
                      ],
                    ),
                  ),
                ],
              ],
            ),
          ),
          // Log Tab
          SingleChildScrollView(
            padding: EdgeInsets.all(4.w),
            child: SleepLogWidget(
              sleepSessions: _sleepSessions,
              onEdit: _editSleepSession,
              onDelete: _deleteSleepSession,
            ),
          ),
          // Patterns Tab
          SingleChildScrollView(
            padding: EdgeInsets.all(4.w),
            child: SleepPatternWidget(
              weeklyData: _weeklyData,
            ),
          ),
        ],
      ),
      floatingActionButton: _tabController.index == 1
          ? FloatingActionButton(
              onPressed: () {
                // Quick add sleep session
                _showSleepSessionDialog();
              },
              child: CustomIconWidget(
                iconName: 'add',
                color: Colors.white,
                size: 6.w,
              ),
            )
          : null,
    );
  }
}
