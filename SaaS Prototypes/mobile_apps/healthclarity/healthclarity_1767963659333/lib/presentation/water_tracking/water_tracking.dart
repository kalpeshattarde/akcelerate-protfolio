import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../theme/app_theme.dart';
import './widgets/hourly_intake_chart_widget.dart';
import './widgets/portion_selector_bottom_sheet.dart';
import './widgets/progress_stats_widget.dart';
import './widgets/quick_action_buttons_widget.dart';
import './widgets/water_glass_grid_widget.dart';
import './widgets/water_progress_ring_widget.dart';

class WaterTracking extends StatefulWidget {
  const WaterTracking({Key? key}) : super(key: key);

  @override
  State<WaterTracking> createState() => _WaterTrackingState();
}

class _WaterTrackingState extends State<WaterTracking>
    with TickerProviderStateMixin {
  double _currentIntake = 32.0;
  final double _dailyGoal = 64.0;
  final int _totalGlasses = 8;

  // Mock hourly data
  final List<Map<String, dynamic>> _hourlyData = [
    {"time": "6AM", "amount": 8.0},
    {"time": "8AM", "amount": 4.0},
    {"time": "10AM", "amount": 8.0},
    {"time": "12PM", "amount": 12.0},
    {"time": "2PM", "amount": 0.0},
    {"time": "4PM", "amount": 0.0},
    {"time": "6PM", "amount": 0.0},
    {"time": "8PM", "amount": 0.0},
  ];

  String get _encouragingMessage {
    final percentage = (_currentIntake / _dailyGoal) * 100;
    if (percentage >= 100) {
      return "🎉 Excellent! You've reached your daily goal!";
    } else if (percentage >= 75) {
      return "💪 Almost there! Keep up the great work!";
    } else if (percentage >= 50) {
      return "👍 You're halfway to your goal!";
    } else if (percentage >= 25) {
      return "🌟 Good start! Keep drinking water!";
    } else {
      return "💧 Time to hydrate! Start your day right!";
    }
  }

  int get _filledGlasses {
    return ((_currentIntake / _dailyGoal) * _totalGlasses)
        .ceil()
        .clamp(0, _totalGlasses);
  }

  void _addWater(double amount) {
    setState(() {
      _currentIntake = (_currentIntake + amount).clamp(0, _dailyGoal * 2);
    });

    // Haptic feedback
    HapticFeedback.lightImpact();

    // Show success message
    if (_currentIntake >= _dailyGoal) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('🎉 Daily goal achieved! Great job!'),
          backgroundColor: AppTheme.successState,
          behavior: SnackBarBehavior.floating,
        ),
      );
    }
  }

  void _onGlassTap(int index) {
    _addWater(8.0); // Standard glass size
  }

  void _onGlassLongPress(int index) {
    _showPortionSelector();
  }

  void _showPortionSelector() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => PortionSelectorBottomSheet(
        onPortionSelected: _addWater,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      appBar: AppBar(
        title: Text(
          'Water Tracking',
          style: Theme.of(context).textTheme.titleLarge?.copyWith(
                color: Theme.of(context).colorScheme.onSurface,
                fontWeight: FontWeight.w600,
              ),
        ),
        backgroundColor: Theme.of(context).scaffoldBackgroundColor,
        elevation: 0,
        centerTitle: true,
        automaticallyImplyLeading: false,
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            // Water Progress Ring
            WaterProgressRingWidget(
              currentIntake: _currentIntake,
              dailyGoal: _dailyGoal,
            ),

            // Progress Stats
            ProgressStatsWidget(
              currentIntake: _currentIntake,
              dailyGoal: _dailyGoal,
              encouragingMessage: _encouragingMessage,
            ),

            // Water Glass Grid
            Container(
              margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
              padding: EdgeInsets.all(4.w),
              decoration: BoxDecoration(
                color: Theme.of(context).colorScheme.surface,
                borderRadius: BorderRadius.circular(12),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: 0.05),
                    blurRadius: 4,
                    offset: const Offset(0, 2),
                  ),
                ],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Daily Glasses',
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                          color: Theme.of(context).colorScheme.onSurface,
                          fontWeight: FontWeight.w600,
                        ),
                  ),
                  SizedBox(height: 1.h),
                  Text(
                    'Tap to add 8oz • Long press for custom amount',
                    style: Theme.of(context).textTheme.bodySmall?.copyWith(
                          color: Theme.of(context)
                              .colorScheme
                              .onSurface
                              .withValues(alpha: 0.7),
                        ),
                  ),
                  WaterGlassGridWidget(
                    totalGlasses: _totalGlasses,
                    filledGlasses: _filledGlasses,
                    onGlassTap: _onGlassTap,
                    onGlassLongPress: _onGlassLongPress,
                  ),
                ],
              ),
            ),

            // Quick Action Buttons
            QuickActionButtonsWidget(
              onQuickAdd: _addWater,
            ),

            // Hourly Intake Chart
            HourlyIntakeChartWidget(
              hourlyData: _hourlyData,
            ),

            SizedBox(height: 15.h), // Bottom padding for bottom nav
          ],
        ),
      ),
    );
  }

  void _showGoalSettings() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(
          'Daily Water Goal',
          style: Theme.of(context).textTheme.titleLarge?.copyWith(
                color: Theme.of(context).colorScheme.onSurface,
                fontWeight: FontWeight.w600,
              ),
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              'Your current daily goal is ${_dailyGoal.toInt()} oz',
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    color: Theme.of(context)
                        .colorScheme
                        .onSurface
                        .withValues(alpha: 0.7),
                  ),
            ),
            SizedBox(height: 2.h),
            Text(
              'Recommended daily intake: 64 oz (8 glasses)',
              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: Theme.of(context).colorScheme.primary,
                    fontWeight: FontWeight.w500,
                  ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text(
              'OK',
              style: Theme.of(context).textTheme.labelLarge?.copyWith(
                    color: Theme.of(context).colorScheme.primary,
                    fontWeight: FontWeight.w600,
                  ),
            ),
          ),
        ],
      ),
    );
  }
}
