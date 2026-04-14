import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../widgets/custom_app_bar.dart';
import './widgets/data_management_widget.dart';
import './widgets/emergency_contact_widget.dart';
import './widgets/profile_header_widget.dart';
import './widgets/settings_section_widget.dart';

/// User Profile & Settings screen for comprehensive account management
/// Provides pregnancy settings, notifications, privacy, and app preferences
class UserProfileSettings extends StatefulWidget {
  const UserProfileSettings({super.key});

  @override
  State<UserProfileSettings> createState() => _UserProfileSettingsState();
}

class _UserProfileSettingsState extends State<UserProfileSettings> {
  // User profile data
  final Map<String, dynamic> _userData = {
    "name": "Sarah Johnson",
    "profilePhoto":
        "https://img.rocket.new/generatedImages/rocket_gen_img_1453e1878-1763300003100.png",
    "profilePhotoLabel":
        "Profile photo of a woman with long brown hair and a warm smile, wearing a light blue blouse",
    "dueDate": "March 15, 2025",
    "currentWeek": 24,
    "totalWeeks": 40,
    "babyName": "Emma",
  };

  // Emergency contact data
  final Map<String, dynamic> _emergencyContact = {
    "doctorName": "Dr. Emily Martinez",
    "hospitalName": "St. Mary's Medical Center",
    "phoneNumber": "+1 (555) 123-4567",
  };

  // Cloud sync status
  final Map<String, dynamic> _syncStatus = {
    "isActive": true,
    "lastSyncTime": "2 hours ago",
    "usedStorage": 45.8,
    "totalStorage": 100.0,
  };

  // Settings state
  bool _dailyTipsEnabled = true;
  bool _appointmentReminders = true;
  bool _kickCounterReminders = false;
  bool _contractionAlerts = true;
  bool _darkModeEnabled = false;
  bool _biometricEnabled = true;
  String _measurementUnit = "Imperial";
  String _language = "English";

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      appBar: CustomAppBar.detail(
        title: "Profile & Settings",
        onBackPressed: () => Navigator.pop(context),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          physics: const BouncingScrollPhysics(),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(height: 2.h),

              // Profile Header
              ProfileHeaderWidget(
                userData: _userData,
                onEditPressed: _handleEditProfile,
              ),

              SizedBox(height: 3.h),

              // Pregnancy Settings
              SettingsSectionWidget(
                title: "Pregnancy Settings",
                items: [
                  {
                    "icon": "calendar_month",
                    "iconColor": theme.colorScheme.primary,
                    "title": "Due Date",
                    "subtitle": _userData["dueDate"],
                    "type": "navigation",
                    "onTap": _handleChangeDueDate,
                  },
                  {
                    "icon": "child_care",
                    "iconColor": theme.colorScheme.secondary,
                    "title": "Baby Name",
                    "subtitle": _userData["babyName"],
                    "type": "navigation",
                    "onTap": _handleChangeBabyName,
                  },
                  {
                    "icon": "star",
                    "iconColor": AppTheme.warningLight,
                    "title": "Milestone Preferences",
                    "subtitle": "Customize your tracking milestones",
                    "type": "navigation",
                    "onTap": _handleMilestonePreferences,
                  },
                ],
              ),

              SizedBox(height: 3.h),

              // Notification Settings
              SettingsSectionWidget(
                title: "Notifications",
                items: [
                  {
                    "icon": "lightbulb",
                    "iconColor": theme.colorScheme.primary,
                    "title": "Daily Tips",
                    "subtitle": "Receive daily pregnancy tips and advice",
                    "type": "toggle",
                    "value": _dailyTipsEnabled,
                    "onChanged": (bool value) {
                      setState(() => _dailyTipsEnabled = value);
                      _showToast(
                          "Daily tips ${value ? 'enabled' : 'disabled'}");
                    },
                  },
                  {
                    "icon": "event",
                    "iconColor": theme.colorScheme.secondary,
                    "title": "Appointment Reminders",
                    "subtitle": "Get notified about upcoming appointments",
                    "type": "toggle",
                    "value": _appointmentReminders,
                    "onChanged": (bool value) {
                      setState(() => _appointmentReminders = value);
                      _showToast(
                          "Appointment reminders ${value ? 'enabled' : 'disabled'}");
                    },
                  },
                  {
                    "icon": "touch_app",
                    "iconColor": AppTheme.successLight,
                    "title": "Kick Counter Reminders",
                    "subtitle": "Daily reminders to track baby kicks",
                    "type": "toggle",
                    "value": _kickCounterReminders,
                    "onChanged": (bool value) {
                      setState(() => _kickCounterReminders = value);
                      _showToast(
                          "Kick counter reminders ${value ? 'enabled' : 'disabled'}");
                    },
                  },
                  {
                    "icon": "timer",
                    "iconColor": theme.colorScheme.error,
                    "title": "Contraction Alerts",
                    "subtitle": "Important contraction pattern notifications",
                    "type": "toggle",
                    "value": _contractionAlerts,
                    "onChanged": (bool value) {
                      setState(() => _contractionAlerts = value);
                      _showToast(
                          "Contraction alerts ${value ? 'enabled' : 'disabled'}");
                    },
                  },
                ],
              ),

              SizedBox(height: 3.h),

              // Emergency Contact
              EmergencyContactWidget(
                contactData: _emergencyContact,
                onCallPressed: _handleEmergencyCall,
                onEditPressed: _handleEditEmergencyContact,
              ),

              SizedBox(height: 3.h),

              // Privacy & Security
              SettingsSectionWidget(
                title: "Privacy & Security",
                items: [
                  {
                    "icon": "fingerprint",
                    "iconColor": theme.colorScheme.primary,
                    "title": "Biometric Authentication",
                    "subtitle": "Use Face ID or fingerprint to unlock app",
                    "type": "toggle",
                    "value": _biometricEnabled,
                    "onChanged": (bool value) {
                      setState(() => _biometricEnabled = value);
                      _showToast(
                          "Biometric authentication ${value ? 'enabled' : 'disabled'}");
                    },
                  },
                  {
                    "icon": "shield",
                    "iconColor": AppTheme.successLight,
                    "title": "Privacy Policy",
                    "subtitle": "View our data protection practices",
                    "type": "navigation",
                    "onTap": _handlePrivacyPolicy,
                  },
                  {
                    "icon": "share",
                    "iconColor": theme.colorScheme.secondary,
                    "title": "Data Sharing",
                    "subtitle": "Manage healthcare provider access",
                    "type": "navigation",
                    "onTap": _handleDataSharing,
                  },
                  {
                    "icon": "delete_forever",
                    "iconColor": theme.colorScheme.error,
                    "title": "Delete Account",
                    "subtitle": "Permanently remove all your data",
                    "type": "navigation",
                    "onTap": _handleDeleteAccount,
                  },
                ],
              ),

              SizedBox(height: 3.h),

              // App Preferences
              SettingsSectionWidget(
                title: "App Preferences",
                items: [
                  {
                    "icon": "dark_mode",
                    "iconColor": theme.colorScheme.primary,
                    "title": "Dark Mode",
                    "subtitle": "Switch to dark theme",
                    "type": "toggle",
                    "value": _darkModeEnabled,
                    "onChanged": (bool value) {
                      setState(() => _darkModeEnabled = value);
                      _showToast("Dark mode ${value ? 'enabled' : 'disabled'}");
                    },
                  },
                  {
                    "icon": "straighten",
                    "iconColor": theme.colorScheme.secondary,
                    "title": "Measurement Units",
                    "subtitle": _measurementUnit,
                    "type": "navigation",
                    "onTap": _handleMeasurementUnits,
                  },
                  {
                    "icon": "language",
                    "iconColor": AppTheme.warningLight,
                    "title": "Language",
                    "subtitle": _language,
                    "type": "navigation",
                    "onTap": _handleLanguageSelection,
                  },
                  {
                    "icon": "accessibility",
                    "iconColor": AppTheme.successLight,
                    "title": "Accessibility",
                    "subtitle": "Screen reader and contrast options",
                    "type": "navigation",
                    "onTap": _handleAccessibility,
                  },
                ],
              ),

              SizedBox(height: 3.h),

              // Data Management
              DataManagementWidget(
                syncStatus: _syncStatus,
                onBackupPressed: _handleBackup,
                onExportPressed: _handleExport,
                onSyncPressed: _handleSync,
              ),

              SizedBox(height: 3.h),

              // Support & About
              SettingsSectionWidget(
                title: "Support & About",
                items: [
                  {
                    "icon": "help",
                    "iconColor": theme.colorScheme.primary,
                    "title": "Help Center",
                    "subtitle": "FAQs and support articles",
                    "type": "navigation",
                    "onTap": _handleHelpCenter,
                  },
                  {
                    "icon": "email",
                    "iconColor": theme.colorScheme.secondary,
                    "title": "Contact Support",
                    "subtitle": "Get help from our team",
                    "type": "navigation",
                    "onTap": _handleContactSupport,
                  },
                  {
                    "icon": "star_rate",
                    "iconColor": AppTheme.warningLight,
                    "title": "Rate App",
                    "subtitle": "Share your experience",
                    "type": "navigation",
                    "onTap": _handleRateApp,
                  },
                  {
                    "icon": "info",
                    "iconColor": theme.colorScheme.onSurfaceVariant,
                    "title": "App Version",
                    "subtitle": "1.0.0 (Build 100)",
                    "type": "value",
                    "value": "",
                  },
                ],
              ),

              SizedBox(height: 4.h),

              // Logout Button
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 4.w),
                child: SizedBox(
                  width: double.infinity,
                  child: OutlinedButton.icon(
                    onPressed: _handleLogout,
                    icon: CustomIconWidget(
                      iconName: 'logout',
                      color: theme.colorScheme.error,
                      size: 5.w,
                    ),
                    label: Text(
                      "Log Out",
                      style: theme.textTheme.titleMedium?.copyWith(
                        color: theme.colorScheme.error,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    style: OutlinedButton.styleFrom(
                      padding: EdgeInsets.symmetric(vertical: 2.h),
                      side: BorderSide(
                        color: theme.colorScheme.error,
                        width: 1.5,
                      ),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                  ),
                ),
              ),

              SizedBox(height: 4.h),
            ],
          ),
        ),
      ),
    );
  }

  // Handler methods
  void _handleEditProfile() {
    HapticFeedback.lightImpact();
    _showToast("Edit profile feature coming soon");
  }

  void _handleChangeDueDate() {
    HapticFeedback.lightImpact();
    showDatePicker(
      context: context,
      initialDate: DateTime(2025, 3, 15),
      firstDate: DateTime.now(),
      lastDate: DateTime.now().add(const Duration(days: 365)),
    ).then((date) {
      if (date != null) {
        setState(() {
          _userData["dueDate"] = "${date.month}/${date.day}/${date.year}";
        });
        _showToast("Due date updated successfully");
      }
    });
  }

  void _handleChangeBabyName() {
    HapticFeedback.lightImpact();
    final controller = TextEditingController(text: _userData["babyName"]);

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text("Baby Name"),
        content: TextField(
          controller: controller,
          decoration: const InputDecoration(
            labelText: "Enter baby's name",
            hintText: "Emma",
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text("Cancel"),
          ),
          ElevatedButton(
            onPressed: () {
              setState(() {
                _userData["babyName"] = controller.text;
              });
              Navigator.pop(context);
              _showToast("Baby name updated successfully");
            },
            child: const Text("Save"),
          ),
        ],
      ),
    );
  }

  void _handleMilestonePreferences() {
    HapticFeedback.lightImpact();
    _showToast("Milestone preferences feature coming soon");
  }

  void _handleEmergencyCall() {
    HapticFeedback.mediumImpact();
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text("Emergency Call"),
        content: Text(
            "Call ${_emergencyContact["doctorName"]} at ${_emergencyContact["phoneNumber"]}?"),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text("Cancel"),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              _showToast("Calling emergency contact...");
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: Theme.of(context).colorScheme.error,
            ),
            child: const Text("Call"),
          ),
        ],
      ),
    );
  }

  void _handleEditEmergencyContact() {
    HapticFeedback.lightImpact();
    _showToast("Edit emergency contact feature coming soon");
  }

  void _handlePrivacyPolicy() {
    HapticFeedback.lightImpact();
    _showToast("Opening privacy policy...");
  }

  void _handleDataSharing() {
    HapticFeedback.lightImpact();
    _showToast("Data sharing settings coming soon");
  }

  void _handleDeleteAccount() {
    HapticFeedback.mediumImpact();
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text("Delete Account"),
        content: const Text(
          "Are you sure you want to delete your account? This action cannot be undone and all your pregnancy data will be permanently removed.",
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text("Cancel"),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              _showToast("Account deletion requires email confirmation");
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

  void _handleMeasurementUnits() {
    HapticFeedback.lightImpact();
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text("Measurement Units"),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            RadioListTile<String>(
              title: const Text("Imperial (lb, oz, in)"),
              value: "Imperial",
              groupValue: _measurementUnit,
              onChanged: (value) {
                setState(() => _measurementUnit = value!);
                Navigator.pop(context);
                _showToast("Measurement units updated");
              },
            ),
            RadioListTile<String>(
              title: const Text("Metric (kg, g, cm)"),
              value: "Metric",
              groupValue: _measurementUnit,
              onChanged: (value) {
                setState(() => _measurementUnit = value!);
                Navigator.pop(context);
                _showToast("Measurement units updated");
              },
            ),
          ],
        ),
      ),
    );
  }

  void _handleLanguageSelection() {
    HapticFeedback.lightImpact();
    _showToast("Language selection coming soon");
  }

  void _handleAccessibility() {
    HapticFeedback.lightImpact();
    _showToast("Accessibility settings coming soon");
  }

  void _handleBackup() {
    HapticFeedback.lightImpact();
    _showToast("Creating backup...");
    Future.delayed(const Duration(seconds: 2), () {
      _showToast("Backup completed successfully");
    });
  }

  void _handleExport() {
    HapticFeedback.lightImpact();
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text("Export Data"),
        content: const Text("Choose export format for your pregnancy data:"),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              _showToast("Exporting as PDF...");
            },
            child: const Text("PDF"),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              _showToast("Exporting as CSV...");
            },
            child: const Text("CSV"),
          ),
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text("Cancel"),
          ),
        ],
      ),
    );
  }

  void _handleSync() {
    HapticFeedback.lightImpact();
    _showToast("Syncing data...");
    Future.delayed(const Duration(seconds: 2), () {
      setState(() {
        _syncStatus["lastSyncTime"] = "Just now";
      });
      _showToast("Sync completed successfully");
    });
  }

  void _handleHelpCenter() {
    HapticFeedback.lightImpact();
    _showToast("Opening help center...");
  }

  void _handleContactSupport() {
    HapticFeedback.lightImpact();
    _showToast("Opening support contact...");
  }

  void _handleRateApp() {
    HapticFeedback.lightImpact();
    _showToast("Opening app store...");
  }

  void _handleLogout() {
    HapticFeedback.mediumImpact();
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text("Log Out"),
        content: const Text("Are you sure you want to log out?"),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text("Cancel"),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              Navigator.pushNamedAndRemoveUntil(
                context,
                '/welcome-onboarding',
                (route) => false,
              );
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: Theme.of(context).colorScheme.error,
            ),
            child: const Text("Log Out"),
          ),
        ],
      ),
    );
  }

  void _showToast(String message) {
    Fluttertoast.showToast(
      msg: message,
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
      backgroundColor: Colors.black87,
      textColor: Colors.white,
      fontSize: 14.0,
    );
  }
}
