import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/about_settings_widget.dart';
import './widgets/data_settings_widget.dart';
import './widgets/goals_settings_widget.dart';
import './widgets/notifications_settings_widget.dart';
import './widgets/user_profile_header_widget.dart';

class ProfileAndSettings extends StatefulWidget {
  const ProfileAndSettings({Key? key}) : super(key: key);

  @override
  State<ProfileAndSettings> createState() => _ProfileAndSettingsState();
}

class _ProfileAndSettingsState extends State<ProfileAndSettings>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  // Mock user data
  final Map<String, dynamic> _userData = {
    "name": "Sarah Johnson",
    "currentStreak": 12,
    "avatarUrl":
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
    "dailyCalorieTarget": 2000,
    "carbsPercentage": 50.0,
    "proteinPercentage": 25.0,
    "fatsPercentage": 25.0,
    "waterIntakeGoal": 2.5,
    "mealReminders": true,
    "waterAlerts": true,
    "goalAchievements": true,
    "breakfastTime": const TimeOfDay(hour: 8, minute: 0),
    "lunchTime": const TimeOfDay(hour: 13, minute: 0),
    "dinnerTime": const TimeOfDay(hour: 19, minute: 0),
    "waterReminderInterval": 2,
    "appVersion": "1.2.3",
  };

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 5, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      appBar: AppBar(
        title: Text(
          'Profile',
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
            // User Profile Header
            UserProfileHeaderWidget(
              userName: _userData["name"] as String,
              currentStreak: _userData["currentStreak"] as int,
              avatarUrl: _userData["avatarUrl"] as String?,
            ),

            // Settings Sections
            GoalsSettingsWidget(
              dailyCalorieTarget: _userData["dailyCalorieTarget"] as int,
              carbsPercentage: _userData["carbsPercentage"] as double,
              proteinPercentage: _userData["proteinPercentage"] as double,
              fatsPercentage: _userData["fatsPercentage"] as double,
              waterIntakeGoal: _userData["waterIntakeGoal"] as double,
              onCalorieTargetChanged: (value) {
                setState(() {
                  _userData["dailyCalorieTarget"] = value;
                });
                _showSuccessToast('Calorie target updated to $value kcal');
              },
              onMacroDistributionChanged: (carbs, protein, fats) {
                setState(() {
                  _userData["carbsPercentage"] = carbs;
                  _userData["proteinPercentage"] = protein;
                  _userData["fatsPercentage"] = fats;
                });
                _showSuccessToast('Macro distribution updated');
              },
              onWaterGoalChanged: (value) {
                setState(() {
                  _userData["waterIntakeGoal"] = value;
                });
                _showSuccessToast(
                    'Water goal updated to ${value.toStringAsFixed(1)}L');
              },
            ),

            NotificationsSettingsWidget(
              mealReminders: _userData["mealReminders"] as bool,
              waterAlerts: _userData["waterAlerts"] as bool,
              goalAchievements: _userData["goalAchievements"] as bool,
              breakfastTime: _userData["breakfastTime"] as TimeOfDay,
              lunchTime: _userData["lunchTime"] as TimeOfDay,
              dinnerTime: _userData["dinnerTime"] as TimeOfDay,
              waterReminderInterval: _userData["waterReminderInterval"] as int,
              onMealRemindersChanged: (value) {
                setState(() {
                  _userData["mealReminders"] = value;
                });
                _showSuccessToast(value
                    ? 'Meal reminders enabled'
                    : 'Meal reminders disabled');
              },
              onWaterAlertsChanged: (value) {
                setState(() {
                  _userData["waterAlerts"] = value;
                });
                _showSuccessToast(
                    value ? 'Water alerts enabled' : 'Water alerts disabled');
              },
              onGoalAchievementsChanged: (value) {
                setState(() {
                  _userData["goalAchievements"] = value;
                });
                _showSuccessToast(value
                    ? 'Achievement notifications enabled'
                    : 'Achievement notifications disabled');
              },
              onMealTimeChanged: (time, mealType) {
                setState(() {
                  _userData["${mealType}Time"] = time;
                });
                _showSuccessToast(
                    '${mealType.capitalize()} time updated to ${time.format(context)}');
              },
              onWaterReminderIntervalChanged: (interval) {
                setState(() {
                  _userData["waterReminderInterval"] = interval;
                });
                _showSuccessToast(
                    'Water reminder interval updated to ${interval}h');
              },
            ),

            DataSettingsWidget(
              onExportData: _exportData,
              onBackupData: _backupData,
              onClearData: _clearData,
              onPrivacySettings: _showPrivacySettings,
            ),

            AboutSettingsWidget(
              appVersion: _userData["appVersion"] as String,
              onPrivacyPolicy: _showPrivacyPolicy,
              onTermsOfService: _showTermsOfService,
              onContactSupport: _contactSupport,
              onRateApp: _rateApp,
            ),

            // Bottom padding for bottom nav
            SizedBox(height: 15.h),
          ],
        ),
      ),
    );
  }

  // Dialog Methods
  void _showHelpDialog() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Row(
            children: [
              CustomIconWidget(
                iconName: 'help',
                color: AppTheme.calorieAccent,
                size: 6.w,
              ),
              SizedBox(width: 2.w),
              const Text('Help & Tips'),
            ],
          ),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                '• Use tabs to navigate between different settings',
                style: Theme.of(context).textTheme.bodyMedium,
              ),
              SizedBox(height: 1.h),
              Text(
                '• Goals tab lets you customize your nutrition targets',
                style: Theme.of(context).textTheme.bodyMedium,
              ),
              SizedBox(height: 1.h),
              Text(
                '• Enable reduced motion for better accessibility',
                style: Theme.of(context).textTheme.bodyMedium,
              ),
              SizedBox(height: 1.h),
              Text(
                '• Export your data anytime from the About tab',
                style: Theme.of(context).textTheme.bodyMedium,
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('Got it'),
            ),
          ],
        );
      },
    );
  }

  void _showPersonalInfoDialog() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Personal Information'),
          content: const Text(
              'This feature allows you to update your personal details like name, email, and profile picture.'),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('Close'),
            ),
          ],
        );
      },
    );
  }

  void _showHealthMetricsDialog() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Health Metrics'),
          content: const Text(
              'Update your height, weight, age, and activity level to get more accurate calorie recommendations.'),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('Close'),
            ),
          ],
        );
      },
    );
  }

  void _showDietaryPreferencesDialog() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Dietary Preferences'),
          content: const Text(
              'Set your dietary restrictions, allergies, and food preferences to get personalized recommendations.'),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('Close'),
            ),
          ],
        );
      },
    );
  }

  // Data Management Methods
  void _exportData() {
    _showSuccessToast('Nutrition data exported successfully');
  }

  void _backupData() {
    _showSuccessToast('Data backed up to cloud storage');
  }

  void _clearData() {
    _showSuccessToast('All data cleared successfully');
  }

  void _showPrivacySettings() {
    _showSuccessToast('Privacy settings opened');
  }

  // About Methods
  void _showPrivacyPolicy() {
    _showSuccessToast('Privacy policy opened');
  }

  void _showTermsOfService() {
    _showSuccessToast('Terms of service opened');
  }

  void _contactSupport() {
    _showSuccessToast('Support contact opened');
  }

  void _rateApp() {
    _showSuccessToast('App store rating opened');
  }

  // Utility Methods
  void _showSuccessToast(String message) {
    Fluttertoast.showToast(
      msg: message,
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
      backgroundColor: AppTheme.successState,
      textColor: Colors.white,
      fontSize: 14.sp,
    );
  }
}

extension StringExtension on String {
  String capitalize() {
    return "${this[0].toUpperCase()}${substring(1)}";
  }
}
