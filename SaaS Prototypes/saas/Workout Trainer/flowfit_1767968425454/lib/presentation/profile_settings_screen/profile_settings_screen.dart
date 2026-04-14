import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../core/app_export.dart';
import '../../widgets/custom_app_bar.dart';
import '../../widgets/custom_icon_widget.dart';
import './widgets/integration_card_widget.dart';
import './widgets/profile_header_widget.dart';
import './widgets/setting_item_widget.dart';
import './widgets/settings_section_widget.dart';

class ProfileSettingsScreen extends StatefulWidget {
  const ProfileSettingsScreen({super.key});

  @override
  State<ProfileSettingsScreen> createState() => _ProfileSettingsScreenState();
}

class _ProfileSettingsScreenState extends State<ProfileSettingsScreen> {
  // User profile data
  final Map<String, dynamic> _userData = {
    "name": "Sarah Mitchell",
    "avatar":
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
    "semanticLabel":
        "Profile photo of a woman with long brown hair wearing a white top, smiling at the camera",
    "fitnessLevel": "Intermediate",
    "weeklyGoal": "4 workouts",
    "currentStreak": 12,
    "totalWorkouts": 87,
    "badges": [
      {"icon": "emoji_events", "label": "30 Day Streak", "color": 0xFFFFD700},
      {
        "icon": "local_fire_department",
        "label": "100 Workouts",
        "color": 0xFFFF6B6B,
      },
      {
        "icon": "fitness_center",
        "label": "Strength Master",
        "color": 0xFF00C896,
      },
    ],
  };

  // Integration status
  final Map<String, bool> _integrations = {
    "Apple Health": true,
    "Google Fit": false,
    "Garmin": false,
    "Fitbit": false,
  };

  // Notification settings
  bool _workoutReminders = true;
  bool _streakAlerts = true;
  bool _achievementCelebrations = true;
  TimeOfDay _reminderTime = const TimeOfDay(hour: 7, minute: 0);

  // Preferences
  bool _metricUnits = false;
  bool _autoAdjustDifficulty = true;
  bool _focusMode = false;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      appBar: CustomAppBar(
        title: 'Profile & Settings',
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new),
          onPressed: () => Navigator.pop(context),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.settings),
            onPressed: () => _showSettingsMenu(context),
          ),
        ],
      ),
      body: SingleChildScrollView(
        physics: const BouncingScrollPhysics(),
        child: Column(
          children: [
            // Profile Header
            ProfileHeaderWidget(userData: _userData),

            const SizedBox(height: 24),

            // Personal Info Section
            SettingsSectionWidget(
              title: "Personal Info",
              children: [
                SettingItemWidget(
                  icon: "flag",
                  title: "Fitness Goal",
                  subtitle: _userData["weeklyGoal"],
                  onTap: () => _showGoalPicker(context),
                ),
                SettingItemWidget(
                  icon: "trending_up",
                  title: "Fitness Level",
                  subtitle: _userData["fitnessLevel"],
                  onTap: () => _showLevelPicker(context),
                ),
                SettingItemWidget(
                  icon: "fitness_center",
                  title: "Available Equipment",
                  subtitle: "Dumbbells, Resistance Bands",
                  onTap: () => _showEquipmentPicker(context),
                ),
              ],
            ),

            const SizedBox(height: 24),

            // Integrations Section
            SettingsSectionWidget(
              title: "Health Integrations",
              children: [
                IntegrationCardWidget(
                  name: "Apple Health",
                  icon: "favorite",
                  isConnected: _integrations["Apple Health"]!,
                  lastSync:
                      _integrations["Apple Health"]! ? "2 hours ago" : null,
                  onToggle:
                      (value) => _toggleIntegration("Apple Health", value),
                  onSync:
                      _integrations["Apple Health"]!
                          ? () => _syncIntegration("Apple Health")
                          : null,
                ),
                IntegrationCardWidget(
                  name: "Google Fit",
                  icon: "directions_run",
                  isConnected: _integrations["Google Fit"]!,
                  lastSync: _integrations["Google Fit"]! ? "Never" : null,
                  onToggle: (value) => _toggleIntegration("Google Fit", value),
                  onSync:
                      _integrations["Google Fit"]!
                          ? () => _syncIntegration("Google Fit")
                          : null,
                ),
                IntegrationCardWidget(
                  name: "Garmin",
                  icon: "watch",
                  isConnected: _integrations["Garmin"]!,
                  lastSync: _integrations["Garmin"]! ? "Never" : null,
                  onToggle: (value) => _toggleIntegration("Garmin", value),
                  onSync:
                      _integrations["Garmin"]!
                          ? () => _syncIntegration("Garmin")
                          : null,
                ),
                IntegrationCardWidget(
                  name: "Fitbit",
                  icon: "monitor_heart",
                  isConnected: _integrations["Fitbit"]!,
                  lastSync: _integrations["Fitbit"]! ? "Never" : null,
                  onToggle: (value) => _toggleIntegration("Fitbit", value),
                  onSync:
                      _integrations["Fitbit"]!
                          ? () => _syncIntegration("Fitbit")
                          : null,
                ),
              ],
            ),

            const SizedBox(height: 24),

            // Notifications Section
            SettingsSectionWidget(
              title: "Notifications",
              children: [
                SettingItemWidget(
                  icon: "notifications",
                  title: "Workout Reminders",
                  trailing: Switch(
                    value: _workoutReminders,
                    onChanged: (value) {
                      HapticFeedback.lightImpact();
                      setState(() => _workoutReminders = value);
                    },
                  ),
                ),
                SettingItemWidget(
                  icon: "schedule",
                  title: "Reminder Time",
                  subtitle: _reminderTime.format(context),
                  onTap: () => _showTimePicker(context),
                  enabled: _workoutReminders,
                ),
                SettingItemWidget(
                  icon: "local_fire_department",
                  title: "Streak Alerts",
                  trailing: Switch(
                    value: _streakAlerts,
                    onChanged: (value) {
                      HapticFeedback.lightImpact();
                      setState(() => _streakAlerts = value);
                    },
                  ),
                ),
                SettingItemWidget(
                  icon: "celebration",
                  title: "Achievement Celebrations",
                  trailing: Switch(
                    value: _achievementCelebrations,
                    onChanged: (value) {
                      HapticFeedback.lightImpact();
                      setState(() => _achievementCelebrations = value);
                    },
                  ),
                ),
              ],
            ),

            const SizedBox(height: 24),

            // Preferences Section
            SettingsSectionWidget(
              title: "Preferences",
              children: [
                SettingItemWidget(
                  icon: "straighten",
                  title: "Units",
                  subtitle:
                      _metricUnits ? "Metric (kg, cm)" : "Imperial (lb, in)",
                  trailing: Switch(
                    value: _metricUnits,
                    onChanged: (value) {
                      HapticFeedback.lightImpact();
                      setState(() => _metricUnits = value);
                    },
                  ),
                ),
                SettingItemWidget(
                  icon: "tune",
                  title: "Auto-Adjust Difficulty",
                  subtitle: "Based on performance",
                  trailing: Switch(
                    value: _autoAdjustDifficulty,
                    onChanged: (value) {
                      HapticFeedback.lightImpact();
                      setState(() => _autoAdjustDifficulty = value);
                    },
                  ),
                ),
                SettingItemWidget(
                  icon: "brightness_4",
                  title: "Focus Mode",
                  subtitle: "Reduced UI brightness",
                  trailing: Switch(
                    value: _focusMode,
                    onChanged: (value) {
                      HapticFeedback.lightImpact();
                      setState(() => _focusMode = value);
                    },
                  ),
                ),
              ],
            ),

            const SizedBox(height: 24),

            // Account Section
            SettingsSectionWidget(
              title: "Account",
              children: [
                SettingItemWidget(
                  icon: "workspace_premium",
                  title: "Subscription",
                  subtitle: "Free Plan",
                  onTap: () => _showSubscriptionInfo(context),
                ),
                SettingItemWidget(
                  icon: "download",
                  title: "Export Data",
                  subtitle: "Download your workout history",
                  onTap: () => _exportData(context),
                ),
                SettingItemWidget(
                  icon: "privacy_tip",
                  title: "Privacy & Data",
                  onTap: () => _showPrivacySettings(context),
                ),
                SettingItemWidget(
                  icon: "restart_alt",
                  title: "Reset Preferences",
                  onTap: () => _showResetDialog(context),
                  textColor: theme.colorScheme.error,
                ),
              ],
            ),

            const SizedBox(height: 24),

            // Support Section
            SettingsSectionWidget(
              title: "Support",
              children: [
                SettingItemWidget(
                  icon: "help_outline",
                  title: "FAQ & Help",
                  onTap: () => _openFAQ(context),
                ),
                SettingItemWidget(
                  icon: "email",
                  title: "Contact Support",
                  onTap: () => _contactSupport(context),
                ),
                SettingItemWidget(
                  icon: "info_outline",
                  title: "App Version",
                  subtitle: "1.0.0 (Build 100)",
                  onTap: () => _shareAppInfo(context),
                ),
              ],
            ),

            const SizedBox(height: 100),
          ],
        ),
      ),
    );
  }

  void _showGoalPicker(BuildContext context) {
    final theme = Theme.of(context);
    final goals = [
      "2 workouts",
      "3 workouts",
      "4 workouts",
      "5 workouts",
      "6 workouts",
      "Daily",
    ];

    showModalBottomSheet(
      context: context,
      backgroundColor: theme.colorScheme.surface,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder:
          (context) => SafeArea(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  margin: const EdgeInsets.only(top: 12),
                  width: 40,
                  height: 4,
                  decoration: BoxDecoration(
                    color: theme.colorScheme.onSurfaceVariant.withValues(
                      alpha: 0.3,
                    ),
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(24),
                  child: Text("Weekly Goal", style: theme.textTheme.titleLarge),
                ),
                ...goals.map(
                  (goal) => ListTile(
                    title: Text(goal),
                    trailing:
                        _userData["weeklyGoal"] == goal
                            ? CustomIconWidget(
                              iconName: 'check',
                              color: theme.colorScheme.primary,
                              size: 24,
                            )
                            : null,
                    onTap: () {
                      HapticFeedback.lightImpact();
                      setState(() => _userData["weeklyGoal"] = goal);
                      Navigator.pop(context);
                    },
                  ),
                ),
                const SizedBox(height: 24),
              ],
            ),
          ),
    );
  }

  void _showLevelPicker(BuildContext context) {
    final theme = Theme.of(context);
    final levels = ["Beginner", "Intermediate", "Advanced"];

    showModalBottomSheet(
      context: context,
      backgroundColor: theme.colorScheme.surface,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder:
          (context) => SafeArea(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  margin: const EdgeInsets.only(top: 12),
                  width: 40,
                  height: 4,
                  decoration: BoxDecoration(
                    color: theme.colorScheme.onSurfaceVariant.withValues(
                      alpha: 0.3,
                    ),
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(24),
                  child: Text(
                    "Fitness Level",
                    style: theme.textTheme.titleLarge,
                  ),
                ),
                ...levels.map(
                  (level) => ListTile(
                    title: Text(level),
                    trailing:
                        _userData["fitnessLevel"] == level
                            ? CustomIconWidget(
                              iconName: 'check',
                              color: theme.colorScheme.primary,
                              size: 24,
                            )
                            : null,
                    onTap: () {
                      HapticFeedback.lightImpact();
                      setState(() => _userData["fitnessLevel"] = level);
                      Navigator.pop(context);
                    },
                  ),
                ),
                const SizedBox(height: 24),
              ],
            ),
          ),
    );
  }

  void _showEquipmentPicker(BuildContext context) {
    final theme = Theme.of(context);
    final equipment = {
      "Dumbbells": true,
      "Resistance Bands": true,
      "Yoga Mat": false,
      "Pull-up Bar": false,
      "Kettlebell": false,
      "Bench": false,
    };

    showModalBottomSheet(
      context: context,
      backgroundColor: theme.colorScheme.surface,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder:
          (context) => StatefulBuilder(
            builder:
                (context, setModalState) => SafeArea(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(vertical: 24),
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Container(
                          margin: const EdgeInsets.only(bottom: 12),
                          width: 40,
                          height: 4,
                          decoration: BoxDecoration(
                            color: theme.colorScheme.onSurfaceVariant
                                .withValues(alpha: 0.3),
                            borderRadius: BorderRadius.circular(2),
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 24),
                          child: Text(
                            "Available Equipment",
                            style: theme.textTheme.titleLarge,
                          ),
                        ),
                        const SizedBox(height: 16),
                        ...equipment.keys.map(
                          (item) => CheckboxListTile(
                            title: Text(item),
                            value: equipment[item],
                            onChanged: (value) {
                              HapticFeedback.lightImpact();
                              setModalState(
                                () => equipment[item] = value ?? false,
                              );
                            },
                          ),
                        ),
                        const SizedBox(height: 16),
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 24),
                          child: SizedBox(
                            width: double.infinity,
                            child: ElevatedButton(
                              onPressed: () {
                                HapticFeedback.mediumImpact();
                                Navigator.pop(context);
                              },
                              child: const Text("Save"),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
          ),
    );
  }

  void _toggleIntegration(String name, bool value) {
    HapticFeedback.lightImpact();
    setState(() => _integrations[name] = value);

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          value ? "$name connected successfully" : "$name disconnected",
        ),
        duration: const Duration(seconds: 2),
      ),
    );
  }

  void _syncIntegration(String name) {
    HapticFeedback.mediumImpact();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text("Syncing with $name..."),
        duration: const Duration(seconds: 2),
      ),
    );
  }

  void _showTimePicker(BuildContext context) async {
    final TimeOfDay? picked = await showTimePicker(
      context: context,
      initialTime: _reminderTime,
    );

    if (picked != null) {
      HapticFeedback.lightImpact();
      setState(() => _reminderTime = picked);
    }
  }

  void _showSubscriptionInfo(BuildContext context) {
    final theme = Theme.of(context);

    showDialog(
      context: context,
      builder:
          (context) => AlertDialog(
            title: const Text("Subscription"),
            content: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text("Current Plan: Free", style: theme.textTheme.titleMedium),
                const SizedBox(height: 16),
                Text(
                  "Upgrade to Premium for:",
                  style: theme.textTheme.bodyMedium,
                ),
                const SizedBox(height: 8),
                Text(
                  "• Unlimited workout programs\n• Advanced progress analytics\n• Personalized meal plans\n• Ad-free experience",
                  style: theme.textTheme.bodySmall,
                ),
              ],
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(context),
                child: const Text("Maybe Later"),
              ),
              ElevatedButton(
                onPressed: () {
                  Navigator.pop(context);
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text("Premium features coming soon!"),
                    ),
                  );
                },
                child: const Text("Upgrade"),
              ),
            ],
          ),
    );
  }

  void _exportData(BuildContext context) {
    HapticFeedback.mediumImpact();
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text("Preparing your data export..."),
        duration: Duration(seconds: 2),
      ),
    );
  }

  void _showPrivacySettings(BuildContext context) {
    final theme = Theme.of(context);

    showModalBottomSheet(
      context: context,
      backgroundColor: theme.colorScheme.surface,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder:
          (context) => SafeArea(
            child: Padding(
              padding: const EdgeInsets.all(24),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text("Privacy & Data", style: theme.textTheme.titleLarge),
                  const SizedBox(height: 24),
                  Text(
                    "Your workout data is stored locally on your device and synced with connected health apps only with your permission.",
                    style: theme.textTheme.bodyMedium,
                  ),
                  const SizedBox(height: 16),
                  ListTile(
                    contentPadding: EdgeInsets.zero,
                    title: const Text("View Privacy Policy"),
                    trailing: CustomIconWidget(
                      iconName: 'open_in_new',
                      color: theme.colorScheme.primary,
                      size: 20,
                    ),
                    onTap: () {
                      Navigator.pop(context);
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text("Opening privacy policy..."),
                        ),
                      );
                    },
                  ),
                  ListTile(
                    contentPadding: EdgeInsets.zero,
                    title: const Text("Delete My Data"),
                    trailing: CustomIconWidget(
                      iconName: 'delete_outline',
                      color: theme.colorScheme.error,
                      size: 20,
                    ),
                    onTap: () {
                      Navigator.pop(context);
                      _showDeleteDataDialog(context);
                    },
                  ),
                ],
              ),
            ),
          ),
    );
  }

  void _showDeleteDataDialog(BuildContext context) {
    showDialog(
      context: context,
      builder:
          (context) => AlertDialog(
            title: const Text("Delete All Data?"),
            content: const Text(
              "This will permanently delete all your workout history, progress, and preferences. This action cannot be undone.",
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(context),
                child: const Text("Cancel"),
              ),
              ElevatedButton(
                onPressed: () {
                  Navigator.pop(context);
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text("Data deletion cancelled")),
                  );
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Theme.of(context).colorScheme.error,
                ),
                child: const Text("Delete"),
              ),
            ],
          ),
    );
  }

  void _showResetDialog(BuildContext context) {
    showDialog(
      context: context,
      builder:
          (context) => AlertDialog(
            title: const Text("Reset Preferences?"),
            content: const Text(
              "This will reset all your settings to default values. Your workout history will not be affected.",
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(context),
                child: const Text("Cancel"),
              ),
              ElevatedButton(
                onPressed: () {
                  Navigator.pop(context);
                  setState(() {
                    _workoutReminders = true;
                    _streakAlerts = true;
                    _achievementCelebrations = true;
                    _metricUnits = false;
                    _autoAdjustDifficulty = true;
                    _focusMode = false;
                  });
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text("Preferences reset to defaults"),
                    ),
                  );
                },
                child: const Text("Reset"),
              ),
            ],
          ),
    );
  }

  void _openFAQ(BuildContext context) {
    ScaffoldMessenger.of(
      context,
    ).showSnackBar(const SnackBar(content: Text("Opening FAQ...")));
  }

  void _contactSupport(BuildContext context) {
    ScaffoldMessenger.of(
      context,
    ).showSnackBar(const SnackBar(content: Text("Opening support contact...")));
  }

  void _shareAppInfo(BuildContext context) {
    HapticFeedback.lightImpact();
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text("App info copied to clipboard")),
    );
  }

  void _showSettingsMenu(BuildContext context) {
    showModalBottomSheet(
      context: context,
      backgroundColor: Theme.of(context).colorScheme.surface,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder:
          (context) => SafeArea(
            child: Column(
              children: [
                Padding(
                  padding: const EdgeInsets.all(24),
                  child: Text(
                    "Settings",
                    style: Theme.of(context).textTheme.titleLarge,
                  ),
                ),
                const SizedBox(height: 24),
                ListTile(
                  leading: const Icon(Icons.notifications),
                  title: const Text("Notifications"),
                  onTap: () => _showNotificationSettings(context),
                ),
                ListTile(
                  leading: const Icon(Icons.settings),
                  title: const Text("App Settings"),
                  onTap: () => _showAppSettings(context),
                ),
                ListTile(
                  leading: const Icon(Icons.help_outline),
                  title: const Text("Help & Support"),
                  onTap: () => _showHelpSettings(context),
                ),
              ],
            ),
          ),
    );
  }

  void _showNotificationSettings(BuildContext context) {
    // Implementation for notification settings
  }

  void _showAppSettings(BuildContext context) {
    // Implementation for app settings
  }

  void _showHelpSettings(BuildContext context) {
    // Implementation for help settings
  }
}
