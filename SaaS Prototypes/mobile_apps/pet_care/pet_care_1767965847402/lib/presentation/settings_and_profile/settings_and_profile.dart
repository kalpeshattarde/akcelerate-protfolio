import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../widgets/custom_icon_widget.dart';
import './widgets/data_management_widget.dart';
import './widgets/family_sharing_widget.dart';
import './widgets/profile_header_widget.dart';
import './widgets/settings_section_widget.dart';
import './widgets/subscription_management_widget.dart';

class SettingsAndProfile extends StatefulWidget {
  const SettingsAndProfile({super.key});

  @override
  State<SettingsAndProfile> createState() => _SettingsAndProfileState();
}

class _SettingsAndProfileState extends State<SettingsAndProfile> {
  // Mock user profile data
  final Map<String, dynamic> userProfile = {
    "name": "Sarah Johnson",
    "email": "sarah.johnson@email.com",
    "profileImage":
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "subscriptionPlan": "Premium",
    "totalPets": 3,
    "totalRecords": 47,
    "activeReminders": 8,
  };

  // Mock family members data
  final List<Map<String, dynamic>> familyMembers = [
    {
      "id": 1,
      "name": "Michael Johnson",
      "email": "michael.johnson@email.com",
      "avatar":
          "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "role": "Admin",
      "joinedDate": "2024-01-15",
    },
    {
      "id": 2,
      "name": "Emma Johnson",
      "email": "emma.johnson@email.com",
      "avatar":
          "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "role": "Caregiver",
      "joinedDate": "2024-02-20",
    },
  ];

  // Mock subscription data
  final Map<String, dynamic> subscriptionData = {
    "plan": "Premium",
    "price": "\$9.99/month",
    "nextBilling": "March 15, 2025",
    "daysRemaining": 18,
    "features": [
      "Unlimited pet profiles",
      "Advanced health analytics",
      "Family sharing for up to 5 members",
      "Priority customer support",
      "Data export and backup",
      "Veterinary integration",
      "Smart reminders and notifications",
    ],
  };

  // Mock data management status
  final Map<String, dynamic> dataStatus = {
    "backupStatus": "Up to date",
    "lastBackup": "Today at 3:42 PM",
    "storageUsed": "2.4 GB of 5 GB",
    "autoBackup": true,
    "petProfiles": 3,
    "medicalRecords": 47,
    "photos": 156,
    "documents": 23,
  };

  // Settings sections expansion state
  Map<String, bool> sectionExpansion = {
    "account": true,
    "notifications": false,
    "privacy": false,
    "app": false,
    "help": false,
  };

  // Settings values
  Map<String, dynamic> settingsValues = {
    "biometricAuth": true,
    "medicationReminders": true,
    "appointmentAlerts": true,
    "healthInsights": false,
    "dataSharing": false,
    "familyAccess": true,
    "vetIntegration": true,
    "measurementUnit": "Imperial",
    "language": "English",
    "theme": "System",
  };

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: theme.brightness == Brightness.light
          ? const Color(0xFFFAFBFC)
          : const Color(0xFF0F1419),
      appBar: AppBar(
        title: Text(
          'Settings & Profile',
          style: theme.textTheme.titleLarge?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
        backgroundColor: theme.colorScheme.surface,
        elevation: 0,
        scrolledUnderElevation: 1,
        leading: IconButton(
          icon: CustomIconWidget(
            iconName: 'arrow_back_ios',
            color: theme.brightness == Brightness.light
                ? const Color(0xFF1B1F23)
                : const Color(0xFFE8EAED),
            size: 20,
          ),
          onPressed: () => Navigator.pop(context),
        ),
        actions: [
          IconButton(
            icon: CustomIconWidget(
              iconName: 'help_outline',
              color: theme.brightness == Brightness.light
                  ? const Color(0xFF1B1F23)
                  : const Color(0xFFE8EAED),
              size: 24,
            ),
            onPressed: _showHelpDialog,
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(4.w),
        child: Column(
          children: [
            // Profile Header
            ProfileHeaderWidget(
              userProfile: userProfile,
              onEditProfile: _editProfile,
            ),

            SizedBox(height: 3.h),

            // Account Settings Section
            SettingsSectionWidget(
              title: 'Account Settings',
              isExpanded: sectionExpansion["account"]!,
              onToggleExpanded: () => _toggleSection("account"),
              items: [
                SettingsItem(
                  title: 'Email & Password',
                  subtitle: 'Update your account credentials',
                  icon: 'email',
                  onTap: _manageEmailPassword,
                ),
                SettingsItem(
                  title: 'Biometric Authentication',
                  subtitle: 'Use Face ID or fingerprint to secure your data',
                  icon: 'fingerprint',
                  trailing: Switch(
                    value: settingsValues["biometricAuth"] as bool,
                    onChanged: (value) =>
                        _updateSetting("biometricAuth", value),
                  ),
                  hasArrow: false,
                ),
                SettingsItem(
                  title: 'Two-Factor Authentication',
                  subtitle: 'Add an extra layer of security',
                  icon: 'security',
                  onTap: _setup2FA,
                ),
              ],
            ),

            // Notification Preferences Section
            SettingsSectionWidget(
              title: 'Notification Preferences',
              isExpanded: sectionExpansion["notifications"]!,
              onToggleExpanded: () => _toggleSection("notifications"),
              items: [
                SettingsItem(
                  title: 'Medication Reminders',
                  subtitle: 'Get notified when it\'s time for pet medications',
                  icon: 'medication',
                  trailing: Switch(
                    value: settingsValues["medicationReminders"] as bool,
                    onChanged: (value) =>
                        _updateSetting("medicationReminders", value),
                  ),
                  hasArrow: false,
                ),
                SettingsItem(
                  title: 'Appointment Alerts',
                  subtitle: 'Reminders for upcoming vet appointments',
                  icon: 'event',
                  trailing: Switch(
                    value: settingsValues["appointmentAlerts"] as bool,
                    onChanged: (value) =>
                        _updateSetting("appointmentAlerts", value),
                  ),
                  hasArrow: false,
                ),
                SettingsItem(
                  title: 'Health Insights',
                  subtitle: 'Weekly health reports and trends',
                  icon: 'insights',
                  trailing: Switch(
                    value: settingsValues["healthInsights"] as bool,
                    onChanged: (value) =>
                        _updateSetting("healthInsights", value),
                  ),
                  hasArrow: false,
                ),
                SettingsItem(
                  title: 'Notification Schedule',
                  subtitle: 'Customize quiet hours and frequency',
                  icon: 'schedule',
                  onTap: _manageNotificationSchedule,
                ),
              ],
            ),

            // Privacy Controls Section
            SettingsSectionWidget(
              title: 'Privacy Controls',
              isExpanded: sectionExpansion["privacy"]!,
              onToggleExpanded: () => _toggleSection("privacy"),
              items: [
                SettingsItem(
                  title: 'Data Sharing',
                  subtitle: 'Share anonymized data for research',
                  icon: 'share',
                  trailing: Switch(
                    value: settingsValues["dataSharing"] as bool,
                    onChanged: (value) => _updateSetting("dataSharing", value),
                  ),
                  hasArrow: false,
                ),
                SettingsItem(
                  title: 'Family Access',
                  subtitle: 'Allow family members to view pet data',
                  icon: 'family_restroom',
                  trailing: Switch(
                    value: settingsValues["familyAccess"] as bool,
                    onChanged: (value) => _updateSetting("familyAccess", value),
                  ),
                  hasArrow: false,
                ),
                SettingsItem(
                  title: 'Veterinary Integration',
                  subtitle: 'Share data with your veterinary clinic',
                  icon: 'local_hospital',
                  trailing: Switch(
                    value: settingsValues["vetIntegration"] as bool,
                    onChanged: (value) =>
                        _updateSetting("vetIntegration", value),
                  ),
                  hasArrow: false,
                ),
                SettingsItem(
                  title: 'Privacy Policy',
                  subtitle: 'Review our privacy practices',
                  icon: 'policy',
                  onTap: _viewPrivacyPolicy,
                ),
              ],
            ),

            // App Preferences Section
            SettingsSectionWidget(
              title: 'App Preferences',
              isExpanded: sectionExpansion["app"]!,
              onToggleExpanded: () => _toggleSection("app"),
              items: [
                SettingsItem(
                  title: 'Measurement Units',
                  subtitle: settingsValues["measurementUnit"] as String,
                  icon: 'straighten',
                  onTap: _selectMeasurementUnit,
                ),
                SettingsItem(
                  title: 'Language',
                  subtitle: settingsValues["language"] as String,
                  icon: 'language',
                  onTap: _selectLanguage,
                ),
                SettingsItem(
                  title: 'Theme',
                  subtitle: settingsValues["theme"] as String,
                  icon: 'palette',
                  onTap: _selectTheme,
                ),
                SettingsItem(
                  title: 'Default Pet',
                  subtitle: 'Set which pet appears first',
                  icon: 'pets',
                  onTap: _selectDefaultPet,
                ),
              ],
            ),

            SizedBox(height: 3.h),

            // Family Sharing Widget
            FamilySharingWidget(
              familyMembers: familyMembers,
              onAddMember: _addFamilyMember,
              onEditMember: _editFamilyMember,
              onRemoveMember: _removeFamilyMember,
            ),

            SizedBox(height: 3.h),

            // Data Management Widget
            DataManagementWidget(
              dataStatus: dataStatus,
              onBackupNow: _backupNow,
              onExportData: _exportData,
              onSyncSettings: _syncSettings,
              onAutoBackupToggle: _toggleAutoBackup,
            ),

            SizedBox(height: 3.h),

            // Subscription Management Widget
            SubscriptionManagementWidget(
              subscriptionData: subscriptionData,
              onUpgrade: _upgradeSubscription,
              onViewBilling: _viewBillingHistory,
              onManageSubscription: _manageSubscription,
            ),

            SizedBox(height: 3.h),

            // Help and Support Section
            SettingsSectionWidget(
              title: 'Help & Support',
              isExpanded: sectionExpansion["help"]!,
              onToggleExpanded: () => _toggleSection("help"),
              items: [
                SettingsItem(
                  title: 'FAQ',
                  subtitle: 'Frequently asked questions',
                  icon: 'help',
                  onTap: _viewFAQ,
                ),
                SettingsItem(
                  title: 'Contact Support',
                  subtitle: 'Get help from our team',
                  icon: 'support_agent',
                  onTap: _contactSupport,
                ),
                SettingsItem(
                  title: 'Tutorial Replay',
                  subtitle: 'Watch the app tutorial again',
                  icon: 'play_circle',
                  onTap: _replayTutorial,
                ),
                SettingsItem(
                  title: 'Rate the App',
                  subtitle: 'Share your feedback',
                  icon: 'star_rate',
                  onTap: _rateApp,
                ),
              ],
            ),

            SizedBox(height: 4.h),

            // Sign Out Button
            Container(
              width: double.infinity,
              padding: EdgeInsets.symmetric(horizontal: 4.w),
              child: OutlinedButton(
                onPressed: _signOut,
                style: OutlinedButton.styleFrom(
                  foregroundColor: const Color(0xFFD73A49),
                  side: const BorderSide(color: Color(0xFFD73A49)),
                  padding: EdgeInsets.symmetric(vertical: 2.h),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(2.w),
                  ),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    CustomIconWidget(
                      iconName: 'logout',
                      color: const Color(0xFFD73A49),
                      size: 4.w,
                    ),
                    SizedBox(width: 2.w),
                    Text(
                      'Sign Out',
                      style: theme.textTheme.bodyMedium?.copyWith(
                        color: const Color(0xFFD73A49),
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ],
                ),
              ),
            ),

            SizedBox(height: 2.h),

            // App Version
            Text(
              'PetCare Tracker v2.1.0',
              style: theme.textTheme.bodySmall?.copyWith(
                color: theme.brightness == Brightness.light
                    ? const Color(0xFF959DA5)
                    : const Color(0xFF6A737D),
              ),
            ),

            SizedBox(height: 4.h),
          ],
        ),
      ),
    );
  }

  void _toggleSection(String section) {
    setState(() {
      sectionExpansion[section] = !sectionExpansion[section]!;
    });
  }

  void _updateSetting(String key, dynamic value) {
    setState(() {
      settingsValues[key] = value;
    });

    // Show confirmation for important settings
    if (key == "biometricAuth" && value == true) {
      _showBiometricSetupDialog();
    }
  }

  void _editProfile() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Edit profile functionality')),
    );
  }

  void _manageEmailPassword() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Email & password management')),
    );
  }

  void _setup2FA() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Two-factor authentication setup')),
    );
  }

  void _manageNotificationSchedule() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Notification schedule settings')),
    );
  }

  void _selectMeasurementUnit() {
    showModalBottomSheet(
      context: context,
      builder: (context) => Container(
        padding: EdgeInsets.all(4.w),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              'Select Measurement Unit',
              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
            ),
            SizedBox(height: 2.h),
            ListTile(
              title: const Text('Imperial (lbs, inches)'),
              trailing: settingsValues["measurementUnit"] == "Imperial"
                  ? CustomIconWidget(
                      iconName: 'check',
                      color: Theme.of(context).colorScheme.primary,
                      size: 20)
                  : null,
              onTap: () {
                _updateSetting("measurementUnit", "Imperial");
                Navigator.pop(context);
              },
            ),
            ListTile(
              title: const Text('Metric (kg, cm)'),
              trailing: settingsValues["measurementUnit"] == "Metric"
                  ? CustomIconWidget(
                      iconName: 'check',
                      color: Theme.of(context).colorScheme.primary,
                      size: 20)
                  : null,
              onTap: () {
                _updateSetting("measurementUnit", "Metric");
                Navigator.pop(context);
              },
            ),
          ],
        ),
      ),
    );
  }

  void _selectLanguage() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Language selection')),
    );
  }

  void _selectTheme() {
    showModalBottomSheet(
      context: context,
      builder: (context) => Container(
        padding: EdgeInsets.all(4.w),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              'Select Theme',
              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
            ),
            SizedBox(height: 2.h),
            ListTile(
              title: const Text('System'),
              subtitle: const Text('Follow device settings'),
              trailing: settingsValues["theme"] == "System"
                  ? CustomIconWidget(
                      iconName: 'check',
                      color: Theme.of(context).colorScheme.primary,
                      size: 20)
                  : null,
              onTap: () {
                _updateSetting("theme", "System");
                Navigator.pop(context);
              },
            ),
            ListTile(
              title: const Text('Light'),
              trailing: settingsValues["theme"] == "Light"
                  ? CustomIconWidget(
                      iconName: 'check',
                      color: Theme.of(context).colorScheme.primary,
                      size: 20)
                  : null,
              onTap: () {
                _updateSetting("theme", "Light");
                Navigator.pop(context);
              },
            ),
            ListTile(
              title: const Text('Dark'),
              trailing: settingsValues["theme"] == "Dark"
                  ? CustomIconWidget(
                      iconName: 'check',
                      color: Theme.of(context).colorScheme.primary,
                      size: 20)
                  : null,
              onTap: () {
                _updateSetting("theme", "Dark");
                Navigator.pop(context);
              },
            ),
          ],
        ),
      ),
    );
  }

  void _selectDefaultPet() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Default pet selection')),
    );
  }

  void _viewPrivacyPolicy() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Privacy policy viewer')),
    );
  }

  void _addFamilyMember() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Add family member')),
    );
  }

  void _editFamilyMember(Map<String, dynamic> member) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('Edit ${member["name"]}')),
    );
  }

  void _removeFamilyMember(Map<String, dynamic> member) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Remove Family Member'),
        content: Text(
            'Are you sure you want to remove ${member["name"]} from family sharing?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () {
              setState(() {
                familyMembers.removeWhere((m) => m["id"] == member["id"]);
              });
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                    content:
                        Text('${member["name"]} removed from family sharing')),
              );
            },
            child: const Text('Remove'),
          ),
        ],
      ),
    );
  }

  void _backupNow() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Starting backup...')),
    );
  }

  void _exportData() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Exporting data...')),
    );
  }

  void _syncSettings() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Sync settings')),
    );
  }

  void _toggleAutoBackup(bool value) {
    setState(() {
      dataStatus["autoBackup"] = value;
    });
  }

  void _upgradeSubscription() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Upgrade to Premium')),
    );
  }

  void _viewBillingHistory() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Billing history')),
    );
  }

  void _manageSubscription() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Manage subscription')),
    );
  }

  void _viewFAQ() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('FAQ section')),
    );
  }

  void _contactSupport() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Contact support')),
    );
  }

  void _replayTutorial() {
    Navigator.pushNamed(context, '/onboarding-flow');
  }

  void _rateApp() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Rate the app')),
    );
  }

  void _signOut() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Sign Out'),
        content: const Text(
            'Are you sure you want to sign out? You will need to sign in again to access your data.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              Navigator.pushNamedAndRemoveUntil(
                  context, '/splash-screen', (route) => false);
            },
            child: const Text('Sign Out'),
          ),
        ],
      ),
    );
  }

  void _showHelpDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Help & Support'),
        content: const Text(
            'Need help with settings? Contact our support team or check the FAQ section for common questions.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('OK'),
          ),
        ],
      ),
    );
  }

  void _showBiometricSetupDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Biometric Authentication'),
        content: const Text(
            'Biometric authentication has been enabled. You can now use Face ID or fingerprint to secure your pet data.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('OK'),
          ),
        ],
      ),
    );
  }
}
