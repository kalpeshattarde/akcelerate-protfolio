import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/create_habit_bottom_sheet_widget.dart';
import './widgets/empty_state_widget.dart';
import './widgets/greeting_header_widget.dart';
import './widgets/habit_card_widget.dart';
import './widgets/habit_context_menu_widget.dart';
import './widgets/motivational_quote_widget.dart';

/// Habit Dashboard - Primary home screen with sanctuary-like design
class HabitDashboard extends StatefulWidget {
  const HabitDashboard({super.key});

  @override
  State<HabitDashboard> createState() => _HabitDashboardState();
}

class _HabitDashboardState extends State<HabitDashboard>
    with TickerProviderStateMixin {
  late AnimationController _refreshController;
  late Animation<double> _refreshAnimation;

  final GlobalKey<RefreshIndicatorState> _refreshIndicatorKey =
      GlobalKey<RefreshIndicatorState>();

  OverlayEntry? _contextMenuOverlay;

  // Mock habits data
  List<Map<String, dynamic>> _habits = [
    {
      "id": 1,
      "name": "Morning Meditation",
      "category": "Mindfulness",
      "frequency": "Daily",
      "isCompleted": true,
      "streak": 7,
      "createdAt": DateTime.now().subtract(const Duration(days: 7)),
    },
    {
      "id": 2,
      "name": "Drink 8 Glasses of Water",
      "category": "Health",
      "frequency": "Daily",
      "isCompleted": false,
      "streak": 3,
      "createdAt": DateTime.now().subtract(const Duration(days: 3)),
    },
    {
      "id": 3,
      "name": "Read for 30 Minutes",
      "category": "Learning",
      "frequency": "Daily",
      "isCompleted": true,
      "streak": 12,
      "createdAt": DateTime.now().subtract(const Duration(days: 12)),
    },
    {
      "id": 4,
      "name": "Evening Workout",
      "category": "Fitness",
      "frequency": "Weekdays",
      "isCompleted": false,
      "streak": 5,
      "createdAt": DateTime.now().subtract(const Duration(days: 5)),
    },
  ];

  @override
  void initState() {
    super.initState();
    _initializeAnimations();
    _scheduleAutomaticRefresh();
  }

  void _initializeAnimations() {
    _refreshController = AnimationController(
      duration: const Duration(milliseconds: 1200),
      vsync: this,
    );

    _refreshAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _refreshController,
      curve: Curves.easeInOut,
    ));
  }

  void _scheduleAutomaticRefresh() {
    // Schedule automatic refresh at midnight
    final now = DateTime.now();
    final tomorrow = DateTime(now.year, now.month, now.day + 1);
    final timeUntilMidnight = tomorrow.difference(now);

    Future.delayed(timeUntilMidnight, () {
      if (mounted) {
        _refreshHabits();
        _scheduleAutomaticRefresh(); // Schedule next refresh
      }
    });
  }

  @override
  void dispose() {
    _refreshController.dispose();
    _contextMenuOverlay?.remove();
    super.dispose();
  }

  Future<void> _refreshHabits() async {
    _refreshController.forward();

    // Simulate API call delay
    await Future.delayed(const Duration(milliseconds: 800));

    setState(() {
      // Reset daily completion status
      for (var habit in _habits) {
        if (habit['frequency'] == 'Daily') {
          habit['isCompleted'] = false;
        }
      }
    });

    _refreshController.reverse();

    // Show gentle notification
    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(
            'Habits refreshed for today',
            style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
              color: AppTheme.primaryLight,
            ),
          ),
          backgroundColor: AppTheme.secondaryLight,
          behavior: SnackBarBehavior.floating,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          margin: EdgeInsets.all(4.w),
          duration: const Duration(seconds: 2),
        ),
      );
    }
  }

  void _onNotificationTap() {
    HapticFeedback.lightImpact();
    // Navigate to notifications screen
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Notifications feature coming soon!'),
        backgroundColor: AppTheme.accentLight,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        margin: EdgeInsets.all(4.w),
      ),
    );
  }

  void _onHabitComplete(Map<String, dynamic> habit) {
    setState(() {
      habit['isCompleted'] = true;
      if (habit['isCompleted']) {
        habit['streak'] = (habit['streak'] ?? 0) + 1;
      }
    });

    HapticFeedback.mediumImpact();

    // Show celebration feedback
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            CustomIconWidget(
              iconName: 'celebration',
              color: AppTheme.primaryLight,
              size: 20,
            ),
            SizedBox(width: 2.w),
            Expanded(
              child: Text(
                'Great job! ${habit['name']} completed!',
                style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                  color: AppTheme.primaryLight,
                ),
              ),
            ),
          ],
        ),
        backgroundColor: AppTheme.successLight,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        margin: EdgeInsets.all(4.w),
      ),
    );
  }

  void _onHabitSkip(Map<String, dynamic> habit) {
    HapticFeedback.lightImpact();

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('${habit['name']} skipped for today'),
        backgroundColor: AppTheme.warningLight,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        margin: EdgeInsets.all(4.w),
      ),
    );
  }

  void _onAddNote(Map<String, dynamic> habit) {
    HapticFeedback.lightImpact();

    // Show note input dialog
    showDialog(
      context: context,
      builder: (BuildContext context) {
        final TextEditingController noteController = TextEditingController();

        return AlertDialog(
          backgroundColor: AppTheme.lightTheme.cardColor,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          title: Text(
            'Add Note',
            style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
              color: AppTheme.textPrimaryLight,
              fontWeight: FontWeight.w600,
            ),
          ),
          content: TextField(
            controller: noteController,
            decoration: InputDecoration(
              hintText: 'How did this habit go today?',
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
            maxLines: 3,
            textCapitalization: TextCapitalization.sentences,
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: Text('Cancel'),
            ),
            ElevatedButton(
              onPressed: () {
                if (noteController.text.trim().isNotEmpty) {
                  // Save note logic here
                  Navigator.of(context).pop();
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text('Note added successfully!'),
                      backgroundColor: AppTheme.successLight,
                      behavior: SnackBarBehavior.floating,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                      margin: EdgeInsets.all(4.w),
                    ),
                  );
                }
              },
              child: Text('Save'),
            ),
          ],
        );
      },
    );
  }

  void _showContextMenu(BuildContext context, Map<String, dynamic> habit) {
    _contextMenuOverlay?.remove();

    _contextMenuOverlay = OverlayEntry(
      builder: (context) => Stack(
        children: [
          // Background tap to close
          Positioned.fill(
            child: GestureDetector(
              onTap: _closeContextMenu,
              child: Container(
                color: Colors.black.withValues(alpha: 0.3),
              ),
            ),
          ),

          // Context menu
          Center(
            child: Padding(
              padding: EdgeInsets.all(8.w),
              child: HabitContextMenuWidget(
                habit: habit,
                onEdit: () => _editHabit(habit),
                onArchive: () => _archiveHabit(habit),
                onViewDetails: () => _viewHabitDetails(habit),
                onClose: _closeContextMenu,
              ),
            ),
          ),
        ],
      ),
    );

    Overlay.of(context).insert(_contextMenuOverlay!);
  }

  void _closeContextMenu() {
    _contextMenuOverlay?.remove();
    _contextMenuOverlay = null;
  }

  void _editHabit(Map<String, dynamic> habit) {
    Navigator.pushNamed(context, '/habit-creation', arguments: habit);
  }

  void _archiveHabit(Map<String, dynamic> habit) {
    setState(() {
      _habits.removeWhere((h) => h['id'] == habit['id']);
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('${habit['name']} archived'),
        backgroundColor: AppTheme.warningLight,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        margin: EdgeInsets.all(4.w),
        action: SnackBarAction(
          label: 'Undo',
          textColor: AppTheme.primaryLight,
          onPressed: () {
            setState(() {
              _habits.add(habit);
            });
          },
        ),
      ),
    );
  }

  void _viewHabitDetails(Map<String, dynamic> habit) {
    Navigator.pushNamed(context, '/habit-detail', arguments: habit);
  }

  void _showCreateHabitBottomSheet() {
    HapticFeedback.lightImpact();

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => Padding(
        padding: EdgeInsets.only(
          bottom: MediaQuery.of(context).viewInsets.bottom,
        ),
        child: CreateHabitBottomSheetWidget(
          onCreateHabit: (newHabit) {
            setState(() {
              _habits.add(newHabit);
            });

            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                content: Text('${newHabit['name']} created successfully!'),
                backgroundColor: AppTheme.successLight,
                behavior: SnackBarBehavior.floating,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                margin: EdgeInsets.all(4.w),
              ),
            );
          },
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      body: SafeArea(
        child: RefreshIndicator(
          key: _refreshIndicatorKey,
          onRefresh: _refreshHabits,
          color: AppTheme.secondaryLight,
          backgroundColor: AppTheme.lightTheme.cardColor,
          child: CustomScrollView(
            physics: const AlwaysScrollableScrollPhysics(),
            slivers: [
              // Sticky header with greeting
              SliverAppBar(
                floating: true,
                pinned: true,
                backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
                elevation: 0,
                toolbarHeight: 12.h,
                automaticallyImplyLeading:
                    false, // Disable automatic back button
                flexibleSpace: GreetingHeaderWidget(
                  onProfileTap: _onNotificationTap,
                ),
              ),

              // Main content
              SliverToBoxAdapter(
                child: Column(
                  children: [
                    // Motivational quote
                    const MotivationalQuoteWidget(),

                    SizedBox(height: 2.h),

                    // Habits section
                    _habits.isEmpty
                        ? EmptyStateWidget(
                            onCreateHabit: _showCreateHabitBottomSheet,
                          )
                        : Column(
                            children: [
                              // Section header
                              Padding(
                                padding: EdgeInsets.symmetric(horizontal: 4.w),
                                child: Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    Text(
                                      'Today\'s Habits',
                                      style: AppTheme
                                          .lightTheme.textTheme.headlineSmall
                                          ?.copyWith(
                                        color: AppTheme.textPrimaryLight,
                                        fontWeight: FontWeight.w600,
                                      ),
                                    ),
                                    Text(
                                      '${_habits.where((h) => h['isCompleted'] == true).length}/${_habits.length} completed',
                                      style: AppTheme
                                          .lightTheme.textTheme.bodyMedium
                                          ?.copyWith(
                                        color: AppTheme.textSecondaryLight,
                                      ),
                                    ),
                                  ],
                                ),
                              ),

                              SizedBox(height: 2.h),

                              // Habits list
                              ..._habits
                                  .map((habit) => HabitCardWidget(
                                        habit: habit,
                                        onTap: () => _viewHabitDetails(habit),
                                        onComplete: () =>
                                            _onHabitComplete(habit),
                                        onSkip: () => _onHabitSkip(habit),
                                        onAddNote: () => _onAddNote(habit),
                                        onLongPress: () =>
                                            _showContextMenu(context, habit),
                                      ))
                                  .toList(),

                              SizedBox(
                                  height: 12.h), // Extra space for bottom nav
                            ],
                          ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),

      // Floating action button for creating habits
      floatingActionButton: AnimatedBuilder(
        animation: _refreshAnimation,
        builder: (context, child) {
          return Transform.scale(
            scale: 1.0 - (_refreshAnimation.value * 0.1),
            child: FloatingActionButton(
              onPressed: _showCreateHabitBottomSheet,
              backgroundColor: AppTheme.secondaryLight,
              foregroundColor: AppTheme.primaryLight,
              elevation: 6,
              child: CustomIconWidget(
                iconName: 'add',
                color: AppTheme.primaryLight,
                size: 28,
              ),
            ),
          );
        },
      ),
    );
  }
}
