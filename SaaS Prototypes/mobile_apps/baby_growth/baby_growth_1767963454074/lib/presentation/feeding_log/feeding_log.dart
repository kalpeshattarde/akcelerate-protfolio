import 'dart:async';

import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/amount_input_widget.dart';
import './widgets/feeding_summary_widget.dart';
import './widgets/feeding_timer_widget.dart';
import './widgets/feeding_type_selector_widget.dart';
import './widgets/recent_feeding_list_widget.dart';

class FeedingLog extends StatefulWidget {
  const FeedingLog({Key? key}) : super(key: key);

  @override
  State<FeedingLog> createState() => _FeedingLogState();
}

class _FeedingLogState extends State<FeedingLog> with TickerProviderStateMixin {
  // Timer related variables
  bool _isTimerRunning = false;
  bool _isPaused = false;
  Duration _elapsedTime = Duration.zero;
  Timer? _timer;
  DateTime? _startTime;

  // Feeding type variables
  FeedingType _selectedType = FeedingType.breastfeeding;
  String? _selectedBreastSide;
  String? _bottleType;

  // Amount variables
  double _amount = 0.0;
  String _unit = 'oz';

  // Tab controller for navigation
  late TabController _tabController;

  // Mock data for feeding entries
  final List<Map<String, dynamic>> _feedingEntries = [
    {
      "id": 1,
      "type": "breastfeeding",
      "timestamp": DateTime.now().subtract(const Duration(hours: 2)),
      "duration": const Duration(minutes: 15),
      "side": "left",
    },
    {
      "id": 2,
      "type": "bottle",
      "timestamp": DateTime.now().subtract(const Duration(hours: 4)),
      "amount": 4.0,
      "unit": "oz",
      "bottleType": "formula",
    },
    {
      "id": 3,
      "type": "breastfeeding",
      "timestamp": DateTime.now().subtract(const Duration(hours: 6)),
      "duration": const Duration(minutes: 20),
      "side": "right",
    },
    {
      "id": 4,
      "type": "bottle",
      "timestamp": DateTime.now().subtract(const Duration(hours: 8)),
      "amount": 3.5,
      "unit": "oz",
      "bottleType": "breast_milk",
    },
    {
      "id": 5,
      "type": "solids",
      "timestamp": DateTime.now().subtract(const Duration(hours: 10)),
      "description": "Baby cereal with banana",
    },
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    _selectedBreastSide = 'left';
    _bottleType = 'formula';
  }

  @override
  void dispose() {
    _timer?.cancel();
    _tabController.dispose();
    super.dispose();
  }

  void _startStopTimer() {
    if (_isTimerRunning) {
      _stopTimer();
    } else {
      _startTimer();
    }
  }

  void _startTimer() {
    setState(() {
      _isTimerRunning = true;
      _isPaused = false;
      _startTime = DateTime.now();
      _elapsedTime = Duration.zero;
    });

    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (!_isPaused) {
        setState(() {
          _elapsedTime = DateTime.now().difference(_startTime!);
        });
      }
    });
  }

  void _stopTimer() {
    _timer?.cancel();
    setState(() {
      _isTimerRunning = false;
      _isPaused = false;
    });
    _saveCurrentFeeding();
  }

  void _pauseTimer() {
    setState(() {
      _isPaused = true;
    });
  }

  void _resumeTimer() {
    setState(() {
      _isPaused = false;
      _startTime = DateTime.now().subtract(_elapsedTime);
    });
  }

  void _saveCurrentFeeding() {
    final Map<String, dynamic> newEntry = {
      "id": _feedingEntries.length + 1,
      "type": _selectedType.name,
      "timestamp": DateTime.now(),
    };

    switch (_selectedType) {
      case FeedingType.breastfeeding:
        newEntry["duration"] = _elapsedTime;
        if (_selectedBreastSide != null) {
          newEntry["side"] = _selectedBreastSide;
        }
        break;
      case FeedingType.bottle:
        if (_amount > 0) {
          newEntry["amount"] = _amount;
          newEntry["unit"] = _unit;
        }
        if (_bottleType != null) {
          newEntry["bottleType"] = _bottleType;
        }
        break;
      case FeedingType.solids:
        newEntry["description"] = "Solid food feeding";
        break;
    }

    setState(() {
      _feedingEntries.insert(0, newEntry);
      _elapsedTime = Duration.zero;
      _amount = 0.0;
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Feeding session saved successfully!'),
        backgroundColor: AppTheme.lightTheme.colorScheme.tertiary,
      ),
    );
  }

  void _onTypeChanged(FeedingType type) {
    setState(() {
      _selectedType = type;
    });
  }

  void _onBreastSideChanged(String side) {
    setState(() {
      _selectedBreastSide = side;
    });
  }

  void _onBottleTypeChanged(String type) {
    setState(() {
      _bottleType = type;
    });
  }

  void _onAmountChanged(double amount) {
    setState(() {
      _amount = amount;
    });
  }

  void _onUnitChanged(String unit) {
    setState(() {
      _unit = unit;
      // Convert amount when unit changes
      if (unit == 'ml' && _unit == 'oz') {
        _amount = _amount * 29.5735; // Convert oz to ml
      } else if (unit == 'oz' && _unit == 'ml') {
        _amount = _amount / 29.5735; // Convert ml to oz
      }
    });
  }

  void _editEntry(Map<String, dynamic> entry) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => _buildEditEntryBottomSheet(entry),
    );
  }

  void _deleteEntry(Map<String, dynamic> entry) {
    setState(() {
      _feedingEntries.removeWhere((e) => e['id'] == entry['id']);
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Feeding entry deleted'),
        backgroundColor: AppTheme.lightTheme.colorScheme.error,
        action: SnackBarAction(
          label: 'Undo',
          textColor: Colors.white,
          onPressed: () {
            setState(() {
              _feedingEntries.insert(0, entry);
            });
          },
        ),
      ),
    );
  }

  Widget _buildEditEntryBottomSheet(Map<String, dynamic> entry) {
    return Container(
      height: 60.h,
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
      ),
      child: Padding(
        padding: EdgeInsets.all(4.w),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(
              child: Container(
                width: 12.w,
                height: 0.5.h,
                decoration: BoxDecoration(
                  color: AppTheme.lightTheme.colorScheme.outline,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
            ),
            SizedBox(height: 2.h),
            Text(
              'Edit Feeding Entry',
              style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.w600,
              ),
            ),
            SizedBox(height: 2.h),
            Text(
              'Entry details can be edited here. This is a detailed view of the feeding session.',
              style: AppTheme.lightTheme.textTheme.bodyMedium,
            ),
            const Spacer(),
            Row(
              children: [
                Expanded(
                  child: OutlinedButton(
                    onPressed: () => Navigator.pop(context),
                    child: Text('Cancel'),
                  ),
                ),
                SizedBox(width: 4.w),
                Expanded(
                  child: ElevatedButton(
                    onPressed: () {
                      Navigator.pop(context);
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text('Entry updated successfully!'),
                          backgroundColor:
                              AppTheme.lightTheme.colorScheme.tertiary,
                        ),
                      );
                    },
                    child: Text('Save Changes'),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  // Calculate today's summary data
  Map<String, dynamic> _getTodaySummary() {
    final DateTime today = DateTime.now();
    final DateTime startOfDay = DateTime(today.year, today.month, today.day);

    final List<Map<String, dynamic>> todayEntries =
        _feedingEntries.where((entry) {
      final DateTime entryDate = entry['timestamp'] as DateTime;
      return entryDate.isAfter(startOfDay);
    }).toList();

    int totalSessions = todayEntries.length;
    double totalAmount = 0.0;
    Duration totalDuration = Duration.zero;
    DateTime lastFeedingTime = todayEntries.isNotEmpty
        ? todayEntries.first['timestamp'] as DateTime
        : DateTime.now().subtract(const Duration(hours: 3));

    for (final entry in todayEntries) {
      if (entry['amount'] != null) {
        double amount = entry['amount'] as double;
        String unit = entry['unit'] as String? ?? 'oz';
        // Convert to oz for consistency
        if (unit == 'ml') {
          amount = amount / 29.5735;
        }
        totalAmount += amount;
      }

      if (entry['duration'] != null) {
        totalDuration += entry['duration'] as Duration;
      }
    }

    return {
      'totalSessions': totalSessions,
      'totalAmount': totalAmount,
      'totalDuration': totalDuration,
      'lastFeedingTime': lastFeedingTime,
    };
  }

  @override
  Widget build(BuildContext context) {
    final Map<String, dynamic> todaySummary = _getTodaySummary();

    return Scaffold(
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      appBar: AppBar(
        title: Text('Feeding Log'),
        leading: IconButton(
          onPressed: () => Navigator.pop(context),
          icon: CustomIconWidget(
            iconName: 'arrow_back',
            color: AppTheme.lightTheme.colorScheme.onSurface,
            size: 24,
          ),
        ),
        actions: [
          IconButton(
            onPressed: () =>
                Navigator.pushNamed(context, '/historical-records'),
            icon: CustomIconWidget(
              iconName: 'history',
              color: AppTheme.lightTheme.colorScheme.onSurface,
              size: 24,
            ),
          ),
          PopupMenuButton<String>(
            onSelected: (value) {
              switch (value) {
                case 'export':
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Export feature coming soon!')),
                  );
                  break;
                case 'settings':
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Settings feature coming soon!')),
                  );
                  break;
              }
            },
            itemBuilder: (context) => [
              PopupMenuItem(
                value: 'export',
                child: Row(
                  children: [
                    CustomIconWidget(
                      iconName: 'file_download',
                      color: AppTheme.lightTheme.colorScheme.onSurface,
                      size: 20,
                    ),
                    SizedBox(width: 2.w),
                    Text('Export Data'),
                  ],
                ),
              ),
              PopupMenuItem(
                value: 'settings',
                child: Row(
                  children: [
                    CustomIconWidget(
                      iconName: 'settings',
                      color: AppTheme.lightTheme.colorScheme.onSurface,
                      size: 20,
                    ),
                    SizedBox(width: 2.w),
                    Text('Settings'),
                  ],
                ),
              ),
            ],
          ),
        ],
        bottom: TabBar(
          controller: _tabController,
          tabs: const [
            Tab(text: 'Active Session'),
            Tab(text: 'History'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildActiveSessionTab(todaySummary),
          _buildHistoryTab(),
        ],
      ),
    );
  }

  Widget _buildActiveSessionTab(Map<String, dynamic> todaySummary) {
    return SingleChildScrollView(
      child: Column(
        children: [
          SizedBox(height: 2.h),
          FeedingSummaryWidget(
            totalSessions: todaySummary['totalSessions'] as int,
            totalAmount: todaySummary['totalAmount'] as double,
            unit: _unit,
            recommendedAmount: 24.0, // Recommended daily amount in oz
            totalDuration: todaySummary['totalDuration'] as Duration,
            lastFeedingTime: todaySummary['lastFeedingTime'] as DateTime,
          ),
          FeedingTimerWidget(
            isTimerRunning: _isTimerRunning,
            elapsedTime: _elapsedTime,
            onStartStop: _startStopTimer,
            onPause: _pauseTimer,
            onResume: _resumeTimer,
            isPaused: _isPaused,
          ),
          FeedingTypeSelectorWidget(
            selectedType: _selectedType,
            onTypeChanged: _onTypeChanged,
            selectedBreastSide: _selectedBreastSide,
            onBreastSideChanged: _onBreastSideChanged,
            bottleType: _bottleType,
            onBottleTypeChanged: _onBottleTypeChanged,
          ),
          if (_selectedType == FeedingType.bottle ||
              _selectedType == FeedingType.solids)
            AmountInputWidget(
              amount: _amount,
              onAmountChanged: _onAmountChanged,
              unit: _unit,
              onUnitChanged: _onUnitChanged,
              showSlider: _selectedType == FeedingType.bottle,
            ),
          SizedBox(height: 2.h),
        ],
      ),
    );
  }

  Widget _buildHistoryTab() {
    return SingleChildScrollView(
      child: Column(
        children: [
          SizedBox(height: 2.h),
          RecentFeedingListWidget(
            feedingEntries: _feedingEntries,
            onEditEntry: _editEntry,
            onDeleteEntry: _deleteEntry,
          ),
          SizedBox(height: 2.h),
        ],
      ),
    );
  }
}
