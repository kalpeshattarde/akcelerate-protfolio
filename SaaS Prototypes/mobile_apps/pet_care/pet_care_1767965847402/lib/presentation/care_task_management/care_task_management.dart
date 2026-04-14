import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../widgets/custom_icon_widget.dart';
import './widgets/create_task_bottom_sheet.dart';
import './widgets/daily_summary_card.dart';
import './widgets/task_category_card.dart';
import './widgets/weather_widget.dart';

class CareTaskManagement extends StatefulWidget {
  const CareTaskManagement({super.key});

  @override
  State<CareTaskManagement> createState() => _CareTaskManagementState();
}

class _CareTaskManagementState extends State<CareTaskManagement>
    with TickerProviderStateMixin {
  int _currentBottomNavIndex = 2; // Care tab active
  late TabController _tabController;
  final Map<String, bool> _expandedCategories = {
    'Feeding': true,
    'Exercise': false,
    'Grooming': false,
    'Medication': false,
  };

  // Mock data
  final List<Map<String, dynamic>> _pets = [
    {
      'id': 1,
      'name': 'Max',
      'breed': 'Golden Retriever',
      'avatar':
          'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop&crop=face',
    },
    {
      'id': 2,
      'name': 'Luna',
      'breed': 'Persian Cat',
      'avatar':
          'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop&crop=face',
    },
    {
      'id': 3,
      'name': 'Charlie',
      'breed': 'Beagle',
      'avatar':
          'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=400&fit=crop&crop=face',
    },
  ];

  final Map<String, dynamic> _weatherData = {
    'temperature': 72,
    'condition': 'Partly Cloudy',
    'iconName': 'wb_cloudy',
    'humidity': 65,
  };

  final List<String> _outdoorRecommendations = [
    'Perfect weather for a long walk with Max',
    'Consider indoor activities for Luna due to humidity',
    'Great time for outdoor training sessions',
  ];

  Map<String, List<Map<String, dynamic>>> _tasksByCategory = {
    'Feeding': [
      {
        'id': 1,
        'taskName': 'Morning Breakfast',
        'petId': '1',
        'petName': 'Max',
        'scheduledTime': '8:00 AM',
        'isCompleted': true,
        'notes': 'Added extra kibble',
      },
      {
        'id': 2,
        'taskName': 'Wet Food',
        'petId': '2',
        'petName': 'Luna',
        'scheduledTime': '12:00 PM',
        'isCompleted': false,
        'notes': null,
      },
      {
        'id': 3,
        'taskName': 'Evening Dinner',
        'petId': '3',
        'petName': 'Charlie',
        'scheduledTime': '6:00 PM',
        'isCompleted': false,
        'notes': 'Half portion due to weight management',
      },
    ],
    'Exercise': [
      {
        'id': 4,
        'taskName': 'Morning Walk',
        'petId': '1',
        'petName': 'Max',
        'scheduledTime': '7:00 AM',
        'isCompleted': true,
        'notes': '30 minutes in the park',
      },
      {
        'id': 5,
        'taskName': 'Playtime',
        'petId': '2',
        'petName': 'Luna',
        'scheduledTime': '3:00 PM',
        'isCompleted': false,
        'notes': 'Interactive toy session',
      },
    ],
    'Grooming': [
      {
        'id': 6,
        'taskName': 'Brush Fur',
        'petId': '2',
        'petName': 'Luna',
        'scheduledTime': '10:00 AM',
        'isCompleted': false,
        'notes': 'Use detangling spray',
      },
      {
        'id': 7,
        'taskName': 'Nail Trim',
        'petId': '3',
        'petName': 'Charlie',
        'scheduledTime': '2:00 PM',
        'isCompleted': false,
        'notes': 'Be gentle, he\'s sensitive',
      },
    ],
    'Medication': [
      {
        'id': 8,
        'taskName': 'Heartworm Prevention',
        'petId': '1',
        'petName': 'Max',
        'scheduledTime': '9:00 AM',
        'isCompleted': false,
        'notes': 'Monthly dose - hide in treat',
      },
    ],
  };

  final List<Map<String, dynamic>> _streakData = [
    {
      'streak': 7,
      'bestStreak': 21,
    },
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 4, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      appBar: AppBar(
        title: Text(
          'Care Tasks',
          style: theme.textTheme.titleLarge?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
        centerTitle: false,
        elevation: 0,
        scrolledUnderElevation: 1,
        actions: [
          IconButton(
            icon: CustomIconWidget(
              iconName: 'refresh',
              color: theme.brightness == Brightness.light
                  ? const Color(0xFF1B1F23)
                  : const Color(0xFFE8EAED),
              size: 24,
            ),
            onPressed: _refreshTasks,
            tooltip: 'Refresh tasks',
          ),
          IconButton(
            icon: CustomIconWidget(
              iconName: 'filter_list',
              color: theme.brightness == Brightness.light
                  ? const Color(0xFF1B1F23)
                  : const Color(0xFFE8EAED),
              size: 24,
            ),
            onPressed: _showFilterOptions,
            tooltip: 'Filter tasks',
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: _refreshTasks,
        child: CustomScrollView(
          slivers: [
            SliverToBoxAdapter(
              child: Column(
                children: [
                  SizedBox(height: 1.h),
                  WeatherWidget(
                    weatherData: _weatherData,
                    outdoorRecommendations: _outdoorRecommendations,
                  ),
                  SizedBox(height: 1.h),
                  DailySummaryCard(
                    currentDate: DateTime.now(),
                    totalTasks: _getTotalTasks(),
                    completedTasks: _getCompletedTasks(),
                    upcomingTasks: _getUpcomingTasks(),
                    overdueTasks: _getOverdueTasks(),
                    streakData: _streakData,
                  ),
                  SizedBox(height: 2.h),
                ],
              ),
            ),
            SliverList(
              delegate: SliverChildBuilderDelegate(
                (context, index) {
                  final categories = _tasksByCategory.keys.toList();
                  final category = categories[index];
                  final tasks = _tasksByCategory[category] ?? [];
                  final completedCount =
                      tasks.where((task) => task['isCompleted'] as bool).length;

                  return TaskCategoryCard(
                    title: category,
                    iconName: _getCategoryIcon(category),
                    taskCount: tasks.length,
                    completedCount: completedCount,
                    tasks: tasks,
                    isExpanded: _expandedCategories[category] ?? false,
                    onToggleExpanded: () => _toggleCategoryExpansion(category),
                    onTaskComplete: (taskIndex) =>
                        _completeTask(category, taskIndex),
                    onTaskReschedule: (taskIndex) =>
                        _rescheduleTask(category, taskIndex),
                    onTaskSkip: (taskIndex) => _skipTask(category, taskIndex),
                    onTaskAddNote: (taskIndex) =>
                        _addTaskNote(category, taskIndex),
                  );
                },
                childCount: _tasksByCategory.keys.length,
              ),
            ),
            SliverToBoxAdapter(
              child: SizedBox(height: 10.h),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _showCreateTaskBottomSheet,
        tooltip: 'Create new task',
        child: CustomIconWidget(
          iconName: 'add',
          color: Colors.black,
          size: 24,
        ),
      ),
      bottomNavigationBar: _buildBottomNavigationBar(theme),
    );
  }

  Widget _buildBottomNavigationBar(ThemeData theme) {
    return Container(
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        boxShadow: [
          BoxShadow(
            color: theme.brightness == Brightness.light
                ? const Color(0x0A000000)
                : const Color(0x1A000000),
            blurRadius: 8,
            offset: const Offset(0, -2),
          ),
        ],
      ),
      child: SafeArea(
        child: BottomNavigationBar(
          currentIndex: _currentBottomNavIndex,
          onTap: _onBottomNavTap,
          type: BottomNavigationBarType.fixed,
          backgroundColor: Colors.transparent,
          elevation: 0,
          selectedItemColor: theme.brightness == Brightness.light
              ? const Color(0xFF2B5F75)
              : const Color(0xFF4A8BA3),
          unselectedItemColor: theme.brightness == Brightness.light
              ? const Color(0xFF6A737D)
              : const Color(0xFFADB5BD),
          items: [
            BottomNavigationBarItem(
              icon: CustomIconWidget(
                iconName: 'home',
                color: _currentBottomNavIndex == 0
                    ? theme.brightness == Brightness.light
                        ? const Color(0xFF2B5F75)
                        : const Color(0xFF4A8BA3)
                    : theme.brightness == Brightness.light
                        ? const Color(0xFF6A737D)
                        : const Color(0xFFADB5BD),
                size: 24,
              ),
              label: 'Home',
            ),
            BottomNavigationBarItem(
              icon: CustomIconWidget(
                iconName: 'pets',
                color: _currentBottomNavIndex == 1
                    ? theme.brightness == Brightness.light
                        ? const Color(0xFF2B5F75)
                        : const Color(0xFF4A8BA3)
                    : theme.brightness == Brightness.light
                        ? const Color(0xFF6A737D)
                        : const Color(0xFFADB5BD),
                size: 24,
              ),
              label: 'Pets',
            ),
            BottomNavigationBarItem(
              icon: Stack(
                children: [
                  CustomIconWidget(
                    iconName: 'task_alt',
                    color: _currentBottomNavIndex == 2
                        ? theme.brightness == Brightness.light
                            ? const Color(0xFF2B5F75)
                            : const Color(0xFF4A8BA3)
                        : theme.brightness == Brightness.light
                            ? const Color(0xFF6A737D)
                            : const Color(0xFFADB5BD),
                    size: 24,
                  ),
                  if (_getUpcomingTasks() > 0)
                    Positioned(
                      right: 0,
                      top: 0,
                      child: Container(
                        padding: EdgeInsets.all(1.w),
                        decoration: BoxDecoration(
                          color: theme.brightness == Brightness.light
                              ? const Color(0xFFE8A547)
                              : const Color(0xFFEDB865),
                          borderRadius: BorderRadius.circular(2.w),
                        ),
                        constraints: BoxConstraints(
                          minWidth: 4.w,
                          minHeight: 4.w,
                        ),
                        child: Text(
                          _getUpcomingTasks().toString(),
                          style: theme.textTheme.labelSmall?.copyWith(
                            color: Colors.black,
                            fontWeight: FontWeight.w600,
                            fontSize: 8.sp,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                    ),
                ],
              ),
              label: 'Care',
            ),
            BottomNavigationBarItem(
              icon: CustomIconWidget(
                iconName: 'medical_services',
                color: _currentBottomNavIndex == 3
                    ? theme.brightness == Brightness.light
                        ? const Color(0xFF2B5F75)
                        : const Color(0xFF4A8BA3)
                    : theme.brightness == Brightness.light
                        ? const Color(0xFF6A737D)
                        : const Color(0xFFADB5BD),
                size: 24,
              ),
              label: 'Health',
            ),
            BottomNavigationBarItem(
              icon: CustomIconWidget(
                iconName: 'more_horiz',
                color: _currentBottomNavIndex == 4
                    ? theme.brightness == Brightness.light
                        ? const Color(0xFF2B5F75)
                        : const Color(0xFF4A8BA3)
                    : theme.brightness == Brightness.light
                        ? const Color(0xFF6A737D)
                        : const Color(0xFFADB5BD),
                size: 24,
              ),
              label: 'More',
            ),
          ],
        ),
      ),
    );
  }

  String _getCategoryIcon(String category) {
    switch (category) {
      case 'Feeding':
        return 'restaurant';
      case 'Exercise':
        return 'directions_run';
      case 'Grooming':
        return 'content_cut';
      case 'Medication':
        return 'medication';
      default:
        return 'task_alt';
    }
  }

  int _getTotalTasks() {
    return _tasksByCategory.values.fold(0, (sum, tasks) => sum + tasks.length);
  }

  int _getCompletedTasks() {
    return _tasksByCategory.values.fold(0, (sum, tasks) {
      return sum + tasks.where((task) => task['isCompleted'] as bool).length;
    });
  }

  int _getUpcomingTasks() {
    return _tasksByCategory.values.fold(0, (sum, tasks) {
      return sum + tasks.where((task) => !(task['isCompleted'] as bool)).length;
    });
  }

  int _getOverdueTasks() {
    // Mock implementation - in real app, compare with current time
    return 2;
  }

  void _toggleCategoryExpansion(String category) {
    setState(() {
      _expandedCategories[category] = !(_expandedCategories[category] ?? false);
    });
  }

  void _completeTask(String category, int taskIndex) {
    setState(() {
      _tasksByCategory[category]![taskIndex]['isCompleted'] = true;
    });

    // Haptic feedback for task completion
    HapticFeedback.mediumImpact();

    // Show completion animation/feedback
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Task completed! Great job! 🎉'),
        backgroundColor: const Color(0xFF28A745),
        behavior: SnackBarBehavior.floating,
        duration: const Duration(seconds: 2),
      ),
    );
  }

  void _rescheduleTask(String category, int taskIndex) {
    showTimePicker(
      context: context,
      initialTime: TimeOfDay.now(),
    ).then((newTime) {
      if (newTime != null) {
        setState(() {
          _tasksByCategory[category]![taskIndex]['scheduledTime'] =
              newTime.format(context);
        });
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Task rescheduled to ${newTime.format(context)}'),
            behavior: SnackBarBehavior.floating,
          ),
        );
      }
    });
  }

  void _skipTask(String category, int taskIndex) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Skip Task'),
        content: Text(
            'Are you sure you want to skip this task? It will be marked as completed for today.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel'),
          ),
          TextButton(
            onPressed: () {
              setState(() {
                _tasksByCategory[category]![taskIndex]['isCompleted'] = true;
                _tasksByCategory[category]![taskIndex]['skipped'] = true;
              });
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text('Task skipped'),
                  behavior: SnackBarBehavior.floating,
                ),
              );
            },
            child: Text('Skip'),
          ),
        ],
      ),
    );
  }

  void _addTaskNote(String category, int taskIndex) {
    final noteController = TextEditingController();
    final currentNote =
        _tasksByCategory[category]![taskIndex]['notes'] as String?;
    if (currentNote != null) {
      noteController.text = currentNote;
    }

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Add Note'),
        content: TextField(
          controller: noteController,
          decoration: InputDecoration(
            hintText: 'Enter task note...',
            border: OutlineInputBorder(),
          ),
          maxLines: 3,
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel'),
          ),
          TextButton(
            onPressed: () {
              setState(() {
                _tasksByCategory[category]![taskIndex]['notes'] =
                    noteController.text.trim().isNotEmpty
                        ? noteController.text.trim()
                        : null;
              });
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text(
                      'Note ${noteController.text.trim().isNotEmpty ? 'added' : 'removed'}'),
                  behavior: SnackBarBehavior.floating,
                ),
              );
            },
            child: Text('Save'),
          ),
        ],
      ),
    );
  }

  void _showCreateTaskBottomSheet() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => CreateTaskBottomSheet(
        pets: _pets,
        onTaskCreated: (newTask) {
          final category = newTask['category'] as String;
          setState(() {
            if (_tasksByCategory[category] != null) {
              _tasksByCategory[category]!.add(newTask);
            } else {
              _tasksByCategory[category] = [newTask];
            }
          });
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text('New task created successfully!'),
              backgroundColor: const Color(0xFF28A745),
              behavior: SnackBarBehavior.floating,
            ),
          );
        },
      ),
    );
  }

  Future<void> _refreshTasks() async {
    // Simulate network delay
    await Future.delayed(const Duration(seconds: 1));

    // In a real app, this would fetch updated tasks from the server
    setState(() {
      // Refresh logic here
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Tasks refreshed'),
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  void _showFilterOptions() {
    showModalBottomSheet(
      context: context,
      builder: (context) => Container(
        padding: EdgeInsets.all(4.w),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              'Filter Tasks',
              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
            ),
            SizedBox(height: 2.h),
            ListTile(
              leading: CustomIconWidget(
                  iconName: 'all_inclusive', color: Colors.grey, size: 24),
              title: Text('All Tasks'),
              onTap: () => Navigator.pop(context),
            ),
            ListTile(
              leading: CustomIconWidget(
                  iconName: 'pending', color: Colors.orange, size: 24),
              title: Text('Pending Only'),
              onTap: () => Navigator.pop(context),
            ),
            ListTile(
              leading: CustomIconWidget(
                  iconName: 'check_circle', color: Colors.green, size: 24),
              title: Text('Completed Only'),
              onTap: () => Navigator.pop(context),
            ),
            ListTile(
              leading: CustomIconWidget(
                  iconName: 'warning', color: Colors.red, size: 24),
              title: Text('Overdue Only'),
              onTap: () => Navigator.pop(context),
            ),
          ],
        ),
      ),
    );
  }

  void _onBottomNavTap(int index) {
    if (index == _currentBottomNavIndex) return;

    setState(() {
      _currentBottomNavIndex = index;
    });

    // Navigate to appropriate screens
    switch (index) {
      case 0:
        Navigator.pushReplacementNamed(context, '/home-dashboard');
        break;
      case 1:
        Navigator.pushReplacementNamed(context, '/pet-profile-management');
        break;
      case 2:
        // Current screen - do nothing
        break;
      case 3:
        Navigator.pushReplacementNamed(context, '/medical-records');
        break;
      case 4:
        Navigator.pushReplacementNamed(context, '/settings-and-profile');
        break;
    }
  }
}
