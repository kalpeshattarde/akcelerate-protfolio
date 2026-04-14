import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../widgets/custom_bottom_bar.dart';
import '../../widgets/custom_icon_widget.dart';
import './widgets/greeting_header_widget.dart';
import './widgets/health_alerts_widget.dart';
import './widgets/pet_quick_access_widget.dart';
import './widgets/quick_actions_widget.dart';
import './widgets/todays_tasks_card_widget.dart';
import './widgets/upcoming_events_card_widget.dart';

class HomeDashboard extends StatefulWidget {
  const HomeDashboard({super.key});

  @override
  State<HomeDashboard> createState() => _HomeDashboardState();
}

class _HomeDashboardState extends State<HomeDashboard> {
  int _currentBottomIndex = 0;
  int _selectedPetIndex = 0;
  bool _isRefreshing = false;

  // Mock data for demonstration
  final List<Map<String, dynamic>> _mockPets = [
    {
      "id": 1,
      "name": "Buddy",
      "breed": "Golden Retriever",
      "age": "3 years",
      "photo":
          "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400",
      "healthStatus": "excellent",
      "pendingTasks": 2,
      "hasAlert": false,
    },
    {
      "id": 2,
      "name": "Luna",
      "breed": "Persian Cat",
      "age": "2 years",
      "photo":
          "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=400",
      "healthStatus": "good",
      "pendingTasks": 1,
      "hasAlert": true,
    },
    {
      "id": 3,
      "name": "Max",
      "breed": "German Shepherd",
      "age": "5 years",
      "photo":
          "https://images.pexels.com/photos/333083/pexels-photo-333083.jpeg?auto=compress&cs=tinysrgb&w=400",
      "healthStatus": "fair",
      "pendingTasks": 3,
      "hasAlert": false,
    },
  ];

  final List<Map<String, dynamic>> _mockTasks = [
    {
      "id": 1,
      "title": "Morning Medication - Arthritis Pills",
      "type": "medication",
      "petName": "Buddy",
      "time": "8:00 AM",
      "isCompleted": false,
      "isOverdue": false,
    },
    {
      "id": 2,
      "title": "Breakfast - Premium Kibble",
      "type": "feeding",
      "petName": "Luna",
      "time": "7:30 AM",
      "isCompleted": true,
      "isOverdue": false,
    },
    {
      "id": 3,
      "title": "Morning Walk",
      "type": "exercise",
      "petName": "Max",
      "time": "6:30 AM",
      "isCompleted": false,
      "isOverdue": true,
    },
    {
      "id": 4,
      "title": "Grooming Session",
      "type": "grooming",
      "petName": "Luna",
      "time": "2:00 PM",
      "isCompleted": false,
      "isOverdue": false,
    },
  ];

  final List<Map<String, dynamic>> _mockEvents = [
    {
      "id": 1,
      "title": "Annual Checkup",
      "type": "vet_appointment",
      "petName": "Buddy",
      "dateTime": "Tomorrow, 10:00 AM",
      "location": "Happy Paws Veterinary Clinic",
      "isUrgent": false,
    },
    {
      "id": 2,
      "title": "Vaccination Due - Rabies",
      "type": "vaccination",
      "petName": "Luna",
      "dateTime": "Sep 2, 2:30 PM",
      "location": "Pet Care Center",
      "isUrgent": true,
    },
    {
      "id": 3,
      "title": "Dental Cleaning",
      "type": "dental",
      "petName": "Max",
      "dateTime": "Sep 5, 9:00 AM",
      "location": "Advanced Pet Dentistry",
      "isUrgent": false,
    },
  ];

  final List<Map<String, dynamic>> _mockAlerts = [
    {
      "id": 1,
      "title": "Vaccination Overdue",
      "type": "vaccination_overdue",
      "petName": "Luna",
      "description":
          "Rabies vaccination is 5 days overdue. Schedule appointment immediately.",
      "severity": "critical",
      "timeAgo": "2 hours ago",
    },
    {
      "id": 2,
      "title": "Weight Gain Alert",
      "type": "weight_change",
      "petName": "Buddy",
      "description":
          "Buddy has gained 3 lbs in the past month. Consider diet adjustment.",
      "severity": "medium",
      "timeAgo": "1 day ago",
    },
  ];

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final currentDate = _getCurrentDate();
    final weatherSuggestion = _getWeatherSuggestion();

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      body: SafeArea(
        child: RefreshIndicator(
          onRefresh: _handleRefresh,
          child: SingleChildScrollView(
            physics: const AlwaysScrollableScrollPhysics(),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Greeting Header
                Padding(
                  padding: EdgeInsets.all(4.w),
                  child: GreetingHeaderWidget(
                    userName: "Sarah",
                    currentDate: currentDate,
                    weatherSuggestion: weatherSuggestion,
                  ),
                ),

                SizedBox(height: 2.h),

                // Today's Tasks Card
                Padding(
                  padding: EdgeInsets.symmetric(horizontal: 4.w),
                  child: TodaysTasksCardWidget(
                    tasks: _mockTasks,
                    onTaskComplete: _handleTaskComplete,
                    onTaskReschedule: _handleTaskReschedule,
                  ),
                ),

                SizedBox(height: 3.h),

                // Pet Quick Access
                PetQuickAccessWidget(
                  pets: _mockPets,
                  selectedPetIndex: _selectedPetIndex,
                  onPetSelected: _handlePetSelection,
                ),

                SizedBox(height: 3.h),

                // Upcoming Events Card
                Padding(
                  padding: EdgeInsets.symmetric(horizontal: 4.w),
                  child: UpcomingEventsCardWidget(
                    events: _mockEvents,
                    onEventTap: _handleEventTap,
                  ),
                ),

                SizedBox(height: 3.h),

                // Health Alerts
                HealthAlertsWidget(
                  alerts: _mockAlerts,
                  onAlertTap: _handleAlertTap,
                  onAlertDismiss: _handleAlertDismiss,
                ),

                SizedBox(height: 3.h),

                // Quick Actions
                QuickActionsWidget(
                  onActionTap: _handleQuickAction,
                ),

                SizedBox(height: 10.h), // Bottom padding for FAB
              ],
            ),
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _showQuickActionSheet,
        icon: CustomIconWidget(
          iconName: 'add',
          color:
              theme.floatingActionButtonTheme.foregroundColor ?? Colors.black,
          size: 24,
        ),
        label: Text(
          'Log Activity',
          style: theme.textTheme.labelLarge?.copyWith(
            color:
                theme.floatingActionButtonTheme.foregroundColor ?? Colors.black,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
      bottomNavigationBar: CustomBottomBar(
        currentIndex: _currentBottomIndex,
        onTap: _handleBottomNavigation,
      ),
    );
  }

  String _getCurrentDate() {
    final now = DateTime.now();
    final months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    final weekdays = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ];

    return '${weekdays[now.weekday - 1]}, ${months[now.month - 1]} ${now.day}';
  }

  String _getWeatherSuggestion() {
    final hour = DateTime.now().hour;
    if (hour >= 6 && hour < 10) {
      return "Perfect morning weather for a walk with your pets!";
    } else if (hour >= 10 && hour < 16) {
      return "Great day for outdoor activities and playtime.";
    } else if (hour >= 16 && hour < 20) {
      return "Evening walks are ideal for your pets' exercise.";
    }
    return "";
  }

  Future<void> _handleRefresh() async {
    setState(() => _isRefreshing = true);

    // Simulate API call delay
    await Future.delayed(const Duration(seconds: 2));

    setState(() => _isRefreshing = false);

    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Pet data refreshed successfully'),
          duration: Duration(seconds: 2),
        ),
      );
    }
  }

  void _handleTaskComplete(int index) {
    setState(() {
      if (index < _mockTasks.length) {
        _mockTasks[index]['isCompleted'] = true;
      }
    });

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Task marked as complete!'),
        duration: Duration(seconds: 2),
      ),
    );
  }

  void _handleTaskReschedule(int index) {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Task rescheduled for later'),
        duration: Duration(seconds: 2),
      ),
    );
  }

  void _handlePetSelection(int index) {
    setState(() {
      _selectedPetIndex = index;
    });
  }

  void _handleEventTap(Map<String, dynamic> event) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(event['title'] as String),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Pet: ${event['petName']}'),
            const SizedBox(height: 8),
            Text('Date & Time: ${event['dateTime']}'),
            if (event['location'] != null) ...[
              const SizedBox(height: 8),
              Text('Location: ${event['location']}'),
            ],
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Close'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              Navigator.pushNamed(context, '/veterinary-appointments');
            },
            child: const Text('View Details'),
          ),
        ],
      ),
    );
  }

  void _handleAlertTap(Map<String, dynamic> alert) {
    Navigator.pushNamed(context, '/health-analytics');
  }

  void _handleAlertDismiss(int index) {
    setState(() {
      if (index < _mockAlerts.length) {
        _mockAlerts.removeAt(index);
      }
    });
  }

  void _handleQuickAction(String action) {
    String message;
    switch (action) {
      case 'feed':
        message = 'Feeding logged successfully';
        break;
      case 'walk':
        message = 'Walk activity logged';
        break;
      case 'medication':
        message = 'Medication administered';
        break;
      case 'symptom':
        message = 'Symptom logged for review';
        break;
      default:
        message = 'Activity logged';
    }

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        duration: const Duration(seconds: 2),
      ),
    );
  }

  void _showQuickActionSheet() {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      isScrollControlled: true,
      builder: (context) => Container(
        decoration: BoxDecoration(
          color: Theme.of(context).colorScheme.surface,
          borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
        ),
        child: SafeArea(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 40,
                height: 4,
                margin: const EdgeInsets.symmetric(vertical: 12),
                decoration: BoxDecoration(
                  color: Theme.of(context)
                      .colorScheme
                      .outline
                      .withValues(alpha: 0.3),
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
              Padding(
                padding: EdgeInsets.all(4.w),
                child: Text(
                  'Quick Actions',
                  style: Theme.of(context).textTheme.titleLarge?.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                ),
              ),
              QuickActionsWidget(
                onActionTap: (action) {
                  Navigator.pop(context);
                  _handleQuickAction(action);
                },
              ),
              SizedBox(height: 2.h),
            ],
          ),
        ),
      ),
    );
  }

  void _handleBottomNavigation(int index) {
    setState(() {
      _currentBottomIndex = index;
    });
  }
}
