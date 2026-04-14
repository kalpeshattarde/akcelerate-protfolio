import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/offline_content_widget.dart';
import './widgets/profile_header_widget.dart';
import './widgets/settings_section_widget.dart';
import './widgets/subscription_card_widget.dart';

class SettingsAndProfile extends StatefulWidget {
  const SettingsAndProfile({Key? key}) : super(key: key);

  @override
  State<SettingsAndProfile> createState() => _SettingsAndProfileState();
}

class _SettingsAndProfileState extends State<SettingsAndProfile> {
  // Mock user profile data
  final Map<String, dynamic> userProfile = {
    "name": "Sarah Johnson",
    "email": "sarah.johnson@email.com",
    "avatar":
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    "level": 12,
    "streak": 47,
    "xp": 2850,
    "achievements": 23,
  };

  // Mock subscription data
  final Map<String, dynamic> subscriptionData = {
    "isPremium": true,
    "planName": "Premium Plus",
    "expiryDate": "March 15, 2025",
    "features": [
      "Unlimited lesson access",
      "AI-powered personalization",
      "Offline content downloads",
      "Advanced analytics",
      "Priority support",
      "Cultural immersion content"
    ],
  };

  // Mock offline packages
  final List<Map<String, dynamic>> offlinePackages = [
    {
      "id": "spanish_basics",
      "name": "Spanish Basics",
      "language": "Spanish",
      "size": 1.2,
      "downloadDate": DateTime.now().subtract(Duration(days: 5)),
      "progress": 1.0,
    },
    {
      "id": "french_intermediate",
      "name": "French Intermediate",
      "language": "French",
      "size": 2.1,
      "downloadDate": DateTime.now().subtract(Duration(days: 2)),
      "progress": 0.75,
    },
    {
      "id": "german_pronunciation",
      "name": "German Pronunciation",
      "language": "German",
      "size": 0.8,
      "downloadDate": DateTime.now().subtract(Duration(days: 1)),
      "progress": 1.0,
    },
  ];

  // Settings state
  Map<String, dynamic> settingsState = {
    "aiPersonalization": true,
    "difficultyLevel": 0.7,
    "dailyGoal": 30,
    "visualLearning": true,
    "auditoryLearning": true,
    "kinestheticLearning": false,
    "lessonReminders": true,
    "streakReminders": true,
    "achievementNotifications": true,
    "socialNotifications": false,
    "highContrast": false,
    "textScaling": 1.0,
    "screenReader": false,
    "focusMode": false,
    "languageInterface": "English",
    "biometricAuth": true,
  };

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      appBar: AppBar(
        title: Text(
          "Settings & Profile",
          style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
        backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
        elevation: 0,
        leading: IconButton(
          onPressed: () => Navigator.pop(context),
          icon: CustomIconWidget(
            iconName: 'arrow_back',
            color: AppTheme.lightTheme.colorScheme.onSurface,
            size: 6.w,
          ),
        ),
        actions: [
          IconButton(
            onPressed: _showLogoutDialog,
            icon: CustomIconWidget(
              iconName: 'logout',
              color: AppTheme.lightTheme.colorScheme.error,
              size: 6.w,
            ),
          ),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: EdgeInsets.all(4.w),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Profile Header
              ProfileHeaderWidget(
                userProfile: userProfile,
                onEditProfile: _editProfile,
              ),
              SizedBox(height: 3.h),

              // Subscription Card
              SubscriptionCardWidget(
                subscriptionData: subscriptionData,
                onUpgrade: _upgradeSubscription,
              ),

              // Learning Preferences
              SettingsSectionWidget(
                title: "Learning Preferences",
                settings: [
                  {
                    "key": "aiPersonalization",
                    "title": "AI Personalization",
                    "subtitle": "Adaptive learning based on your progress",
                    "icon": "psychology",
                    "type": "switch",
                    "value": settingsState["aiPersonalization"],
                  },
                  {
                    "key": "difficultyLevel",
                    "title": "Difficulty Level",
                    "subtitle": "Adjust lesson complexity",
                    "icon": "tune",
                    "type": "slider",
                    "value": settingsState["difficultyLevel"],
                  },
                  {
                    "key": "dailyGoal",
                    "title": "Daily Goal",
                    "subtitle": "Set your learning target",
                    "icon": "flag",
                    "type": "dropdown",
                    "value": "${settingsState["dailyGoal"]} minutes",
                  },
                ],
                onSettingChanged: _handleSettingChange,
              ),

              // Learning Style
              SettingsSectionWidget(
                title: "Learning Style",
                settings: [
                  {
                    "key": "visualLearning",
                    "title": "Visual Learning",
                    "subtitle": "Images and visual aids",
                    "icon": "visibility",
                    "type": "switch",
                    "value": settingsState["visualLearning"],
                  },
                  {
                    "key": "auditoryLearning",
                    "title": "Auditory Learning",
                    "subtitle": "Audio and pronunciation focus",
                    "icon": "hearing",
                    "type": "switch",
                    "value": settingsState["auditoryLearning"],
                  },
                  {
                    "key": "kinestheticLearning",
                    "title": "Kinesthetic Learning",
                    "subtitle": "Interactive and hands-on activities",
                    "icon": "touch_app",
                    "type": "switch",
                    "value": settingsState["kinestheticLearning"],
                  },
                ],
                onSettingChanged: _handleSettingChange,
              ),

              // Notifications
              SettingsSectionWidget(
                title: "Notifications",
                settings: [
                  {
                    "key": "lessonReminders",
                    "title": "Lesson Reminders",
                    "subtitle": "Daily learning notifications",
                    "icon": "notifications",
                    "type": "switch",
                    "value": settingsState["lessonReminders"],
                  },
                  {
                    "key": "streakReminders",
                    "title": "Streak Reminders",
                    "subtitle": "Don't break your streak!",
                    "icon": "local_fire_department",
                    "type": "switch",
                    "value": settingsState["streakReminders"],
                  },
                  {
                    "key": "achievementNotifications",
                    "title": "Achievement Alerts",
                    "subtitle": "Celebrate your milestones",
                    "icon": "emoji_events",
                    "type": "switch",
                    "value": settingsState["achievementNotifications"],
                  },
                  {
                    "key": "socialNotifications",
                    "title": "Social Activity",
                    "subtitle": "Friend updates and challenges",
                    "icon": "people",
                    "type": "switch",
                    "value": settingsState["socialNotifications"],
                  },
                ],
                onSettingChanged: _handleSettingChange,
              ),

              // Accessibility
              SettingsSectionWidget(
                title: "Accessibility",
                settings: [
                  {
                    "key": "highContrast",
                    "title": "High Contrast Mode",
                    "subtitle": "Enhanced visual accessibility",
                    "icon": "contrast",
                    "type": "switch",
                    "value": settingsState["highContrast"],
                  },
                  {
                    "key": "textScaling",
                    "title": "Text Size",
                    "subtitle": "Adjust text scaling",
                    "icon": "format_size",
                    "type": "slider",
                    "value": settingsState["textScaling"],
                  },
                  {
                    "key": "screenReader",
                    "title": "Screen Reader Support",
                    "subtitle": "Enhanced audio descriptions",
                    "icon": "record_voice_over",
                    "type": "switch",
                    "value": settingsState["screenReader"],
                  },
                  {
                    "key": "focusMode",
                    "title": "Focus Mode",
                    "subtitle": "Reduce distractions",
                    "icon": "center_focus_strong",
                    "type": "switch",
                    "value": settingsState["focusMode"],
                  },
                ],
                onSettingChanged: _handleSettingChange,
              ),

              // Offline Content
              OfflineContentWidget(
                offlinePackages: offlinePackages,
                onDeletePackage: _deleteOfflinePackage,
                onDownloadMore: _downloadMoreContent,
              ),

              // Account Settings
              SettingsSectionWidget(
                title: "Account & Security",
                settings: [
                  {
                    "key": "changePassword",
                    "title": "Change Password",
                    "subtitle": "Update your account password",
                    "icon": "lock",
                    "type": "navigation",
                    "value": null,
                  },
                  {
                    "key": "biometricAuth",
                    "title": "Biometric Authentication",
                    "subtitle": "Use fingerprint or face unlock",
                    "icon": "fingerprint",
                    "type": "switch",
                    "value": settingsState["biometricAuth"],
                  },
                  {
                    "key": "dataExport",
                    "title": "Export Data",
                    "subtitle": "Download your learning progress",
                    "icon": "download",
                    "type": "navigation",
                    "value": null,
                  },
                  {
                    "key": "privacySettings",
                    "title": "Privacy Settings",
                    "subtitle": "Manage data usage and sharing",
                    "icon": "privacy_tip",
                    "type": "navigation",
                    "value": null,
                  },
                ],
                onSettingChanged: _handleSettingChange,
              ),

              // Language & Region
              SettingsSectionWidget(
                title: "Language & Region",
                settings: [
                  {
                    "key": "languageInterface",
                    "title": "Interface Language",
                    "subtitle": "Change app language",
                    "icon": "language",
                    "type": "dropdown",
                    "value": settingsState["languageInterface"],
                  },
                ],
                onSettingChanged: _handleSettingChange,
              ),

              SizedBox(height: 4.h),
            ],
          ),
        ),
      ),
    );
  }

  void _handleSettingChange(String key, dynamic value) {
    setState(() {
      if (value != null) {
        settingsState[key] = value;
      }
    });

    // Handle navigation settings
    switch (key) {
      case "changePassword":
        _changePassword();
        break;
      case "dataExport":
        _exportData();
        break;
      case "privacySettings":
        _openPrivacySettings();
        break;
      case "languageInterface":
        _changeLanguage();
        break;
    }
  }

  void _editProfile() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => Container(
        height: 50.h,
        decoration: BoxDecoration(
          color: AppTheme.lightTheme.colorScheme.surface,
          borderRadius: BorderRadius.vertical(top: Radius.circular(5.w)),
        ),
        padding: EdgeInsets.all(4.w),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(
              child: Container(
                width: 12.w,
                height: 0.5.h,
                decoration: BoxDecoration(
                  color: AppTheme.lightTheme.dividerColor,
                  borderRadius: BorderRadius.circular(1.w),
                ),
              ),
            ),
            SizedBox(height: 2.h),
            Text(
              "Edit Profile",
              style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.w600,
              ),
            ),
            SizedBox(height: 2.h),
            Center(
              child: Text(
                "Profile editing functionality would be implemented here",
                style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                  color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                ),
                textAlign: TextAlign.center,
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _upgradeSubscription() {
    Navigator.pushNamed(context, '/subscription-plans');
  }

  void _deleteOfflinePackage(String packageId) {
    setState(() {
      offlinePackages.removeWhere((package) => package["id"] == packageId);
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text("Offline package deleted successfully"),
        backgroundColor: AppTheme.lightTheme.colorScheme.primary,
      ),
    );
  }

  void _downloadMoreContent() {
    Navigator.pushNamed(context, '/offline-content');
  }

  void _changePassword() {
    Navigator.pushNamed(context, '/change-password');
  }

  void _exportData() {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content:
            Text("Data export initiated. You'll receive an email shortly."),
        backgroundColor: AppTheme.lightTheme.colorScheme.primary,
      ),
    );
  }

  void _openPrivacySettings() {
    Navigator.pushNamed(context, '/privacy-settings');
  }

  void _changeLanguage() {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (context) => Container(
        height: 40.h,
        decoration: BoxDecoration(
          color: AppTheme.lightTheme.colorScheme.surface,
          borderRadius: BorderRadius.vertical(top: Radius.circular(5.w)),
        ),
        padding: EdgeInsets.all(4.w),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(
              child: Container(
                width: 12.w,
                height: 0.5.h,
                decoration: BoxDecoration(
                  color: AppTheme.lightTheme.dividerColor,
                  borderRadius: BorderRadius.circular(1.w),
                ),
              ),
            ),
            SizedBox(height: 2.h),
            Text(
              "Select Interface Language",
              style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.w600,
              ),
            ),
            SizedBox(height: 2.h),
            Expanded(
              child: ListView(
                children: [
                  "English",
                  "Spanish",
                  "French",
                  "German",
                  "Italian",
                  "Portuguese",
                ]
                    .map((language) => ListTile(
                          title: Text(language),
                          trailing:
                              settingsState["languageInterface"] == language
                                  ? CustomIconWidget(
                                      iconName: 'check',
                                      color: AppTheme.lightTheme.primaryColor,
                                      size: 5.w,
                                    )
                                  : null,
                          onTap: () {
                            setState(() {
                              settingsState["languageInterface"] = language;
                            });
                            Navigator.pop(context);
                          },
                        ))
                    .toList(),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _showLogoutDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(
          "Logout",
          style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
        content: Text(
          "Are you sure you want to logout? Your progress will be synced before logging out.",
          style: AppTheme.lightTheme.textTheme.bodyMedium,
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text(
              "Cancel",
              style: TextStyle(
                  color: AppTheme.lightTheme.colorScheme.onSurfaceVariant),
            ),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              _logout();
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: AppTheme.lightTheme.colorScheme.error,
              foregroundColor: Colors.white,
            ),
            child: Text("Logout"),
          ),
        ],
      ),
    );
  }

  void _logout() {
    // Simulate logout process
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text("Syncing data and logging out..."),
        backgroundColor: AppTheme.lightTheme.colorScheme.primary,
      ),
    );

    // Navigate to login screen after a delay
    Future.delayed(Duration(seconds: 2), () {
      Navigator.pushNamedAndRemoveUntil(
        context,
        '/login-screen',
        (route) => false,
      );
    });
  }
}
