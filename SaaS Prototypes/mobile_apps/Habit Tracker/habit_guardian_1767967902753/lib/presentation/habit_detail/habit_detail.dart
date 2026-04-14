import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/achievement_badges_widget.dart';
import './widgets/habit_header_widget.dart';
import './widgets/habit_hero_section_widget.dart';
import './widgets/monthly_calendar_widget.dart';
import './widgets/notes_timeline_widget.dart';
import './widgets/progress_chart_widget.dart';
import './widgets/quick_actions_bar_widget.dart';
import './widgets/statistics_cards_widget.dart';
import './widgets/weekly_view_widget.dart';

class HabitDetail extends StatefulWidget {
  const HabitDetail({super.key});

  @override
  State<HabitDetail> createState() => _HabitDetailState();
}

class _HabitDetailState extends State<HabitDetail>
    with TickerProviderStateMixin {
  late ScrollController _scrollController;
  bool _isLoading = true;

  // Mock habit data
  final Map<String, dynamic> _habitData = {
    "id": 1,
    "name": "Morning Meditation",
    "description":
        "Daily 10-minute mindfulness meditation to start the day with clarity and peace.",
    "category": "Mindfulness",
    "currentStreak": 23,
    "isActive": true,
    "isCompletedToday": false,
    "completionPercentage": 78.5,
    "createdDate": DateTime.now().subtract(const Duration(days: 45)),
  };

  final List<Map<String, dynamic>> _weeklyData = [
    {
      "weekNumber": 1,
      "completedDays": 5,
      "totalDays": 7,
      "days": [
        {
          "date": DateTime.now().subtract(const Duration(days: 6)),
          "completed": true
        },
        {
          "date": DateTime.now().subtract(const Duration(days: 5)),
          "completed": true
        },
        {
          "date": DateTime.now().subtract(const Duration(days: 4)),
          "completed": false
        },
        {
          "date": DateTime.now().subtract(const Duration(days: 3)),
          "completed": true
        },
        {
          "date": DateTime.now().subtract(const Duration(days: 2)),
          "completed": true
        },
        {
          "date": DateTime.now().subtract(const Duration(days: 1)),
          "completed": true
        },
        {"date": DateTime.now(), "completed": false},
      ],
    },
    {
      "weekNumber": 2,
      "completedDays": 6,
      "totalDays": 7,
      "days": [
        {
          "date": DateTime.now().subtract(const Duration(days: 13)),
          "completed": true
        },
        {
          "date": DateTime.now().subtract(const Duration(days: 12)),
          "completed": true
        },
        {
          "date": DateTime.now().subtract(const Duration(days: 11)),
          "completed": true
        },
        {
          "date": DateTime.now().subtract(const Duration(days: 10)),
          "completed": false
        },
        {
          "date": DateTime.now().subtract(const Duration(days: 9)),
          "completed": true
        },
        {
          "date": DateTime.now().subtract(const Duration(days: 8)),
          "completed": true
        },
        {
          "date": DateTime.now().subtract(const Duration(days: 7)),
          "completed": true
        },
      ],
    },
  ];

  final Map<DateTime, bool> _monthlyData = {};

  final Map<String, dynamic> _statistics = {
    "totalCompletions": 156,
    "longestStreak": 31,
    "successRate": 78,
    "weeklyAverage": 5.2,
  };

  final List<Map<String, dynamic>> _notes = [
    {
      "id": 1,
      "date": DateTime.now().subtract(const Duration(days: 2)),
      "content":
          "Had a particularly peaceful meditation session today. The breathing exercises helped me feel more centered and focused for the rest of the day. I noticed my mind wandering less than usual.",
      "mood": "Peaceful",
    },
    {
      "id": 2,
      "date": DateTime.now().subtract(const Duration(days: 5)),
      "content":
          "Struggled to focus during meditation today. My mind kept racing with work thoughts. Need to try a different approach tomorrow, maybe guided meditation instead of silent practice.",
      "mood": "Restless",
    },
    {
      "id": 3,
      "date": DateTime.now().subtract(const Duration(days: 8)),
      "content":
          "Reached my 20-day streak! Feeling proud of the consistency. The habit is becoming more natural and I look forward to my morning meditation time.",
      "mood": "Accomplished",
    },
  ];

  final List<Map<String, dynamic>> _achievements = [
    {
      "id": 1,
      "title": "First Week",
      "description": "Complete 7 days in a row",
      "icon": "calendar_view_week",
      "unlocked": true,
      "unlockedDate": DateTime.now().subtract(const Duration(days: 38)),
    },
    {
      "id": 2,
      "title": "Habit Builder",
      "description": "Complete 30 days in a row",
      "icon": "emoji_events",
      "unlocked": false,
      "unlockedDate": null,
    },
    {
      "id": 3,
      "title": "Consistency Master",
      "description": "Complete 100 days total",
      "icon": "military_tech",
      "unlocked": true,
      "unlockedDate": DateTime.now().subtract(const Duration(days: 15)),
    },
  ];

  @override
  void initState() {
    super.initState();
    _scrollController = ScrollController();
    _initializeMonthlyData();
    _simulateDataLoading();
  }

  void _initializeMonthlyData() {
    final now = DateTime.now();
    for (int i = 0; i < 30; i++) {
      final date = now.subtract(Duration(days: i));
      _monthlyData[DateTime(date.year, date.month, date.day)] =
          i % 3 != 0; // Mock completion pattern
    }
  }

  void _simulateDataLoading() {
    Future.delayed(const Duration(milliseconds: 800), () {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    });
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  void _handleBackPressed() {
    Navigator.pop(context);
  }

  void _handleEditPressed() {
    HapticFeedback.lightImpact();
    Navigator.pushNamed(context, '/habit-creation');
  }

  void _handleWeekChanged(int weekIndex) {
    // Handle week navigation
  }

  void _handleDateLongPress(DateTime date, String action) {
    switch (action) {
      case 'add_note':
        _showAddNoteDialog(date);
        break;
      case 'mark_complete':
        _toggleDateCompletion(date);
        break;
      case 'view_details':
        _showDateDetails(date);
        break;
    }
  }

  void _showAddNoteDialog(DateTime date) {
    final TextEditingController noteController = TextEditingController();
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: isDark ? AppTheme.surfaceDark : AppTheme.surfaceLight,
        title: Text(
          'Add Note',
          style: theme.textTheme.titleLarge?.copyWith(
            color:
                isDark ? AppTheme.textPrimaryDark : AppTheme.textPrimaryLight,
          ),
        ),
        content: TextField(
          controller: noteController,
          maxLines: 4,
          decoration: InputDecoration(
            hintText: 'Write your reflection...',
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
            ),
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              if (noteController.text.isNotEmpty) {
                _addNote(date, noteController.text);
                Navigator.pop(context);
              }
            },
            child: Text('Save'),
          ),
        ],
      ),
    );
  }

  void _addNote(DateTime date, String content) {
    setState(() {
      _notes.insert(0, {
        "id": _notes.length + 1,
        "date": date,
        "content": content,
        "mood": "Reflective",
      });
    });

    Fluttertoast.showToast(
      msg: "Note added successfully",
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
    );
  }

  void _toggleDateCompletion(DateTime date) {
    setState(() {
      final dateKey = DateTime(date.year, date.month, date.day);
      _monthlyData[dateKey] = !(_monthlyData[dateKey] ?? false);
    });

    Fluttertoast.showToast(
      msg: _monthlyData[DateTime(date.year, date.month, date.day)] == true
          ? "Marked as completed"
          : "Marked as incomplete",
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
    );
  }

  void _showDateDetails(DateTime date) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    final isCompleted =
        _monthlyData[DateTime(date.year, date.month, date.day)] ?? false;

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: isDark ? AppTheme.surfaceDark : AppTheme.surfaceLight,
        title: Text(
          '${date.day}/${date.month}/${date.year}',
          style: theme.textTheme.titleLarge?.copyWith(
            color:
                isDark ? AppTheme.textPrimaryDark : AppTheme.textPrimaryLight,
          ),
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                CustomIconWidget(
                  iconName: isCompleted ? 'check_circle' : 'cancel',
                  color: isCompleted
                      ? (isDark ? AppTheme.successDark : AppTheme.successLight)
                      : (isDark ? AppTheme.warningDark : AppTheme.warningLight),
                  size: 24,
                ),
                SizedBox(width: 2.w),
                Text(
                  isCompleted ? 'Completed' : 'Not Completed',
                  style: theme.textTheme.bodyLarge?.copyWith(
                    color: isDark
                        ? AppTheme.textPrimaryDark
                        : AppTheme.textPrimaryLight,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Close'),
          ),
        ],
      ),
    );
  }

  void _handleCompleteToday() {
    setState(() {
      _habitData['isCompletedToday'] = !_habitData['isCompletedToday'];
      if (_habitData['isCompletedToday']) {
        _habitData['currentStreak'] = _habitData['currentStreak'] + 1;
      }
    });

    Fluttertoast.showToast(
      msg: _habitData['isCompletedToday']
          ? "Great job! Habit completed for today"
          : "Habit marked as incomplete",
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
    );
  }

  void _handleAddNote() {
    _showAddNoteDialog(DateTime.now());
  }

  void _handleShareProgress() {
    HapticFeedback.lightImpact();
    Fluttertoast.showToast(
      msg: "Progress shared successfully",
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
    );
  }

  void _handleArchiveHabit() {
    HapticFeedback.lightImpact();
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Archive Habit'),
        content: Text(
            'Are you sure you want to archive this habit? You can restore it later from your profile.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              Navigator.pop(context);
              Fluttertoast.showToast(
                msg: "Habit archived successfully",
                toastLength: Toast.LENGTH_SHORT,
                gravity: ToastGravity.BOTTOM,
              );
            },
            child: Text('Archive'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    if (_isLoading) {
      return Scaffold(
        backgroundColor: isDark ? AppTheme.primaryDark : AppTheme.primaryLight,
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              CircularProgressIndicator(
                color:
                    isDark ? AppTheme.secondaryDark : AppTheme.secondaryLight,
              ),
              SizedBox(height: 3.h),
              Text(
                'Loading habit details...',
                style: theme.textTheme.bodyLarge?.copyWith(
                  color: isDark
                      ? AppTheme.textSecondaryDark
                      : AppTheme.textSecondaryLight,
                ),
              ),
            ],
          ),
        ),
      );
    }

    return Scaffold(
      backgroundColor: isDark ? AppTheme.primaryDark : AppTheme.primaryLight,
      body: Column(
        children: [
          // Header
          HabitHeaderWidget(
            habitName: _habitData['name'] as String,
            onEditPressed: _handleEditPressed,
            onBackPressed: _handleBackPressed,
          ),

          // Scrollable content
          Expanded(
            child: RefreshIndicator(
              onRefresh: () async {
                setState(() {
                  _isLoading = true;
                });
                await Future.delayed(const Duration(milliseconds: 800));
                setState(() {
                  _isLoading = false;
                });
                Fluttertoast.showToast(
                  msg: "Data refreshed",
                  toastLength: Toast.LENGTH_SHORT,
                  gravity: ToastGravity.BOTTOM,
                );
              },
              color: isDark ? AppTheme.secondaryDark : AppTheme.secondaryLight,
              child: SingleChildScrollView(
                controller: _scrollController,
                physics: const AlwaysScrollableScrollPhysics(),
                child: Column(
                  children: [
                    // Hero section with streak
                    HabitHeroSectionWidget(
                      currentStreak: _habitData['currentStreak'] as int,
                      isActive: _habitData['isActive'] as bool,
                    ),

                    // Progress chart
                    ProgressChartWidget(
                      completionPercentage:
                          _habitData['completionPercentage'] as double,
                    ),

                    // Weekly view
                    WeeklyViewWidget(
                      weeklyData: _weeklyData,
                      onWeekChanged: _handleWeekChanged,
                    ),

                    // Monthly calendar
                    MonthlyCalendarWidget(
                      habitData: _monthlyData,
                      onDateLongPress: _handleDateLongPress,
                    ),

                    // Statistics cards
                    StatisticsCardsWidget(
                      statistics: _statistics,
                    ),

                    // Achievement badges
                    AchievementBadgesWidget(
                      achievements: _achievements,
                    ),

                    // Notes timeline
                    NotesTimelineWidget(
                      notes: _notes,
                      onAddNote: _handleAddNote,
                    ),

                    // Bottom padding for quick actions bar
                    SizedBox(height: 12.h),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),

      // Quick actions bar
      bottomSheet: QuickActionsBarWidget(
        isCompletedToday: _habitData['isCompletedToday'] as bool,
        onCompleteToday: _handleCompleteToday,
        onAddNote: _handleAddNote,
        onShareProgress: _handleShareProgress,
        onArchiveHabit: _handleArchiveHabit,
      ),
    );
  }
}
