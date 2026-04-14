import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/profile_header_widget.dart';
import './widgets/settings_item_widget.dart';
import './widgets/settings_section_widget.dart';
import './widgets/subscription_card_widget.dart';
import './widgets/toggle_setting_widget.dart';

class ProfileSettings extends StatefulWidget {
  const ProfileSettings({Key? key}) : super(key: key);

  @override
  State<ProfileSettings> createState() => _ProfileSettingsState();
}

class _ProfileSettingsState extends State<ProfileSettings> {
  // User profile data
  final Map<String, dynamic> userProfile = {
    "name": "Sarah Johnson",
    "email": "sarah.johnson@email.com",
    "wellnessStreak": 28,
    "joinDate": "March 2024",
    "totalSessions": 156,
    "favoriteBreathingPattern": "4-7-8 Technique",
  };

  // Subscription data
  final Map<String, dynamic> subscriptionData = {
    "planName": "Premium",
    "isActive": true,
    "renewalDate": "January 15, 2025",
    "features": [
      "Unlimited Sessions",
      "Offline Downloads",
      "Advanced Analytics",
      "Priority Support"
    ],
  };

  // Settings state
  bool _notificationsEnabled = true;
  bool _reminderNotifications = true;
  bool _achievementAlerts = false;
  bool _contentUpdates = true;
  bool _voiceGuidanceEnabled = true;
  bool _backgroundSoundsEnabled = true;
  bool _hapticFeedbackEnabled = true;
  bool _biometricAuthEnabled = false;
  bool _autoLockPrevention = true;
  bool _highContrastMode = false;
  bool _reducedMotion = false;
  String _selectedAudioQuality = "High";
  String _selectedTextSize = "Medium";
  double _hapticIntensity = 0.7;

  // Storage usage data
  final Map<String, dynamic> storageData = {
    "totalUsed": "2.4 GB",
    "offlineContent": "1.8 GB",
    "userData": "0.6 GB",
    "availableSpace": "12.6 GB",
  };

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [
              AppTheme.lightTheme.colorScheme.primary,
              AppTheme.lightTheme.colorScheme.secondary,
            ],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),
        child: SafeArea(
          child: Column(
            children: [
              // App Bar
              Container(
                padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
                child: Row(
                  children: [
                    GestureDetector(
                      onTap: () => Navigator.pop(context),
                      child: Container(
                        width: 10.w,
                        height: 10.w,
                        decoration: BoxDecoration(
                          color: AppTheme.lightTheme.colorScheme.onPrimary
                              .withValues(alpha: 0.2),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Center(
                          child: CustomIconWidget(
                            iconName: 'arrow_back',
                            color: AppTheme.lightTheme.colorScheme.onPrimary,
                            size: 6.w,
                          ),
                        ),
                      ),
                    ),
                    SizedBox(width: 4.w),
                    Text(
                      'Profile Settings',
                      style: Theme.of(context)
                          .textTheme
                          .headlineSmall
                          ?.copyWith(
                            color: AppTheme.lightTheme.colorScheme.onPrimary,
                            fontWeight: FontWeight.w600,
                          ),
                    ),
                  ],
                ),
              ),

              // Scrollable Content
              Expanded(
                child: SingleChildScrollView(
                  padding: EdgeInsets.symmetric(horizontal: 4.w),
                  child: Column(
                    children: [
                      SizedBox(height: 2.h),

                      // Profile Header
                      ProfileHeaderWidget(
                        userName: userProfile["name"] as String,
                        userEmail: userProfile["email"] as String,
                        wellnessStreak: userProfile["wellnessStreak"] as int,
                        onEditProfile: _showEditProfileDialog,
                      ),

                      SizedBox(height: 3.h),

                      // Account Settings
                      SettingsSectionWidget(
                        title: 'Account',
                        children: [
                          SettingsItemWidget(
                            iconName: 'email',
                            title: 'Email Address',
                            subtitle: userProfile["email"] as String,
                            onTap: _showChangeEmailDialog,
                          ),
                          SettingsItemWidget(
                            iconName: 'lock',
                            title: 'Change Password',
                            subtitle: 'Last updated 3 months ago',
                            onTap: _showChangePasswordDialog,
                          ),
                          ToggleSettingWidget(
                            iconName: 'fingerprint',
                            title: 'Biometric Authentication',
                            subtitle: 'Use fingerprint or face ID to unlock',
                            value: _biometricAuthEnabled,
                            onChanged: (value) =>
                                setState(() => _biometricAuthEnabled = value),
                          ),
                        ],
                      ),

                      SizedBox(height: 2.h),

                      // Subscription Management
                      SettingsSectionWidget(
                        title: 'Subscription',
                        children: [
                          Container(
                            padding: EdgeInsets.all(4.w),
                            child: SubscriptionCardWidget(
                              planName: subscriptionData["planName"] as String,
                              renewalDate:
                                  subscriptionData["renewalDate"] as String,
                              isActive: subscriptionData["isActive"] as bool,
                              onManageSubscription: _manageSubscription,
                              onUpgrade: _upgradeSubscription,
                            ),
                          ),
                        ],
                      ),

                      SizedBox(height: 2.h),

                      // Notification Settings
                      SettingsSectionWidget(
                        title: 'Notifications',
                        children: [
                          ToggleSettingWidget(
                            iconName: 'notifications',
                            title: 'Push Notifications',
                            subtitle: 'Receive app notifications',
                            value: _notificationsEnabled,
                            onChanged: (value) =>
                                setState(() => _notificationsEnabled = value),
                          ),
                          ToggleSettingWidget(
                            iconName: 'schedule',
                            title: 'Breathing Reminders',
                            subtitle: 'Daily practice reminders',
                            value: _reminderNotifications,
                            onChanged: (value) =>
                                setState(() => _reminderNotifications = value),
                          ),
                          ToggleSettingWidget(
                            iconName: 'emoji_events',
                            title: 'Achievement Alerts',
                            subtitle: 'Celebrate your milestones',
                            value: _achievementAlerts,
                            onChanged: (value) =>
                                setState(() => _achievementAlerts = value),
                          ),
                          ToggleSettingWidget(
                            iconName: 'new_releases',
                            title: 'Content Updates',
                            subtitle: 'New meditations and features',
                            value: _contentUpdates,
                            onChanged: (value) =>
                                setState(() => _contentUpdates = value),
                          ),
                        ],
                      ),

                      SizedBox(height: 2.h),

                      // Audio & Haptic Settings
                      SettingsSectionWidget(
                        title: 'Audio & Haptics',
                        children: [
                          ToggleSettingWidget(
                            iconName: 'record_voice_over',
                            title: 'Voice Guidance',
                            subtitle: 'Audio instructions during sessions',
                            value: _voiceGuidanceEnabled,
                            onChanged: (value) =>
                                setState(() => _voiceGuidanceEnabled = value),
                          ),
                          ToggleSettingWidget(
                            iconName: 'music_note',
                            title: 'Background Sounds',
                            subtitle: 'Ambient sounds and music',
                            value: _backgroundSoundsEnabled,
                            onChanged: (value) => setState(
                                () => _backgroundSoundsEnabled = value),
                          ),
                          SettingsItemWidget(
                            iconName: 'high_quality',
                            title: 'Audio Quality',
                            subtitle: _selectedAudioQuality,
                            onTap: _showAudioQualityDialog,
                          ),
                          ToggleSettingWidget(
                            iconName: 'vibration',
                            title: 'Haptic Feedback',
                            subtitle: 'Vibration during breathing exercises',
                            value: _hapticFeedbackEnabled,
                            onChanged: (value) =>
                                setState(() => _hapticFeedbackEnabled = value),
                          ),
                        ],
                      ),

                      SizedBox(height: 2.h),

                      // App Preferences
                      SettingsSectionWidget(
                        title: 'App Preferences',
                        children: [
                          ToggleSettingWidget(
                            iconName: 'screen_lock_portrait',
                            title: 'Prevent Auto-Lock',
                            subtitle: 'Keep screen on during sessions',
                            value: _autoLockPrevention,
                            onChanged: (value) =>
                                setState(() => _autoLockPrevention = value),
                          ),
                          SettingsItemWidget(
                            iconName: 'palette',
                            title: 'Breathing Circle Style',
                            subtitle: 'Customize visual appearance',
                            onTap: _showBreathingCircleCustomization,
                          ),
                          SettingsItemWidget(
                            iconName: 'timer',
                            title: 'Default Session Length',
                            subtitle: '10 minutes',
                            onTap: _showSessionLengthDialog,
                          ),
                        ],
                      ),

                      SizedBox(height: 2.h),

                      // Accessibility Settings
                      SettingsSectionWidget(
                        title: 'Accessibility',
                        children: [
                          ToggleSettingWidget(
                            iconName: 'contrast',
                            title: 'High Contrast Mode',
                            subtitle: 'Improve text and UI visibility',
                            value: _highContrastMode,
                            onChanged: (value) =>
                                setState(() => _highContrastMode = value),
                          ),
                          ToggleSettingWidget(
                            iconName: 'motion_photos_off',
                            title: 'Reduce Motion',
                            subtitle: 'Minimize animations and effects',
                            value: _reducedMotion,
                            onChanged: (value) =>
                                setState(() => _reducedMotion = value),
                          ),
                          SettingsItemWidget(
                            iconName: 'text_fields',
                            title: 'Text Size',
                            subtitle: _selectedTextSize,
                            onTap: _showTextSizeDialog,
                          ),
                        ],
                      ),

                      SizedBox(height: 2.h),

                      // Privacy & Security
                      SettingsSectionWidget(
                        title: 'Privacy & Security',
                        children: [
                          SettingsItemWidget(
                            iconName: 'download',
                            title: 'Export Data',
                            subtitle: 'Download your wellness data',
                            onTap: _exportUserData,
                          ),
                          SettingsItemWidget(
                            iconName: 'share',
                            title: 'Sharing Preferences',
                            subtitle: 'Control what you share',
                            onTap: _showSharingPreferences,
                          ),
                          SettingsItemWidget(
                            iconName: 'family_restroom',
                            title: 'Family Sharing',
                            subtitle: 'Manage family member access',
                            onTap: _manageFamilySharing,
                          ),
                          SettingsItemWidget(
                            iconName: 'contact_emergency',
                            title: 'Emergency Contacts',
                            subtitle: 'Crisis intervention contacts',
                            onTap: _manageEmergencyContacts,
                            iconColor: AppTheme.warningColor,
                          ),
                        ],
                      ),

                      SizedBox(height: 2.h),

                      // Storage Management
                      SettingsSectionWidget(
                        title: 'Storage',
                        children: [
                          Container(
                            padding: EdgeInsets.all(4.w),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    Text(
                                      'Used Storage',
                                      style: Theme.of(context)
                                          .textTheme
                                          .bodyLarge
                                          ?.copyWith(
                                            color: AppTheme.lightTheme
                                                .colorScheme.onSurface,
                                            fontWeight: FontWeight.w500,
                                          ),
                                    ),
                                    Text(
                                      storageData["totalUsed"] as String,
                                      style: Theme.of(context)
                                          .textTheme
                                          .bodyLarge
                                          ?.copyWith(
                                            color: AppTheme.lightTheme
                                                .colorScheme.secondary,
                                            fontWeight: FontWeight.w600,
                                          ),
                                    ),
                                  ],
                                ),
                                SizedBox(height: 2.h),
                                LinearProgressIndicator(
                                  value: 0.16, // 2.4GB / 15GB
                                  backgroundColor: AppTheme
                                      .lightTheme.colorScheme.outline
                                      .withValues(alpha: 0.2),
                                  valueColor: AlwaysStoppedAnimation<Color>(
                                    AppTheme.lightTheme.colorScheme.secondary,
                                  ),
                                ),
                                SizedBox(height: 2.h),
                                Row(
                                  children: [
                                    Expanded(
                                      child: OutlinedButton(
                                        onPressed: _manageOfflineContent,
                                        child: Text('Manage Downloads'),
                                      ),
                                    ),
                                    SizedBox(width: 3.w),
                                    Expanded(
                                      child: OutlinedButton(
                                        onPressed: _clearCache,
                                        child: Text('Clear Cache'),
                                      ),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),

                      SizedBox(height: 2.h),

                      // Help & Support
                      SettingsSectionWidget(
                        title: 'Help & Support',
                        children: [
                          SettingsItemWidget(
                            iconName: 'help',
                            title: 'FAQ & Help Center',
                            subtitle: 'Find answers to common questions',
                            onTap: () =>
                                Navigator.pushNamed(context, '/help-center'),
                          ),
                          SettingsItemWidget(
                            iconName: 'support_agent',
                            title: 'Contact Support',
                            subtitle: 'Get help from our team',
                            onTap: _contactSupport,
                          ),
                          SettingsItemWidget(
                            iconName: 'school',
                            title: 'Tutorial Replay',
                            subtitle: 'Review app tutorials',
                            onTap: () => Navigator.pushNamed(
                                context, '/onboarding-flow'),
                          ),
                          SettingsItemWidget(
                            iconName: 'rate_review',
                            title: 'Rate BreathEase',
                            subtitle: 'Share your experience',
                            onTap: _rateApp,
                          ),
                        ],
                      ),

                      SizedBox(height: 2.h),

                      // Legal & About
                      SettingsSectionWidget(
                        title: 'Legal & About',
                        children: [
                          SettingsItemWidget(
                            iconName: 'info',
                            title: 'App Version',
                            subtitle: 'BreathEase v2.1.0 (Build 2024.12)',
                            showArrow: false,
                          ),
                          SettingsItemWidget(
                            iconName: 'description',
                            title: 'Terms of Service',
                            onTap: _showTermsOfService,
                          ),
                          SettingsItemWidget(
                            iconName: 'privacy_tip',
                            title: 'Privacy Policy',
                            onTap: _showPrivacyPolicy,
                          ),
                          SettingsItemWidget(
                            iconName: 'gavel',
                            title: 'Legal Information',
                            onTap: _showLegalInfo,
                          ),
                        ],
                      ),

                      SizedBox(height: 3.h),

                      // Logout and Delete Account
                      Container(
                        width: double.infinity,
                        padding: EdgeInsets.symmetric(horizontal: 4.w),
                        child: Column(
                          children: [
                            SizedBox(
                              width: double.infinity,
                              child: OutlinedButton(
                                onPressed: _logout,
                                style: OutlinedButton.styleFrom(
                                  foregroundColor:
                                      AppTheme.lightTheme.colorScheme.onSurface,
                                  side: BorderSide(
                                    color: AppTheme
                                        .lightTheme.colorScheme.outline
                                        .withValues(alpha: 0.5),
                                  ),
                                  padding: EdgeInsets.symmetric(vertical: 2.h),
                                ),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    CustomIconWidget(
                                      iconName: 'logout',
                                      color: AppTheme
                                          .lightTheme.colorScheme.onSurface,
                                      size: 5.w,
                                    ),
                                    SizedBox(width: 2.w),
                                    Text('Sign Out'),
                                  ],
                                ),
                              ),
                            ),
                            SizedBox(height: 2.h),
                            SizedBox(
                              width: double.infinity,
                              child: TextButton(
                                onPressed: _deleteAccount,
                                style: TextButton.styleFrom(
                                  foregroundColor: AppTheme.errorColor,
                                  padding: EdgeInsets.symmetric(vertical: 2.h),
                                ),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    CustomIconWidget(
                                      iconName: 'delete_forever',
                                      color: AppTheme.errorColor,
                                      size: 5.w,
                                    ),
                                    SizedBox(width: 2.w),
                                    Text('Delete Account'),
                                  ],
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),

                      SizedBox(height: 4.h),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _showEditProfileDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: AppTheme.lightTheme.colorScheme.surface,
        title: Text(
          'Edit Profile',
          style: TextStyle(color: AppTheme.lightTheme.colorScheme.onSurface),
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              decoration: InputDecoration(
                labelText: 'Name',
                hintText: userProfile["name"] as String,
              ),
            ),
            SizedBox(height: 2.h),
            TextField(
              decoration: InputDecoration(
                labelText: 'Email',
                hintText: userProfile["email"] as String,
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              _showSuccessMessage('Profile updated successfully');
            },
            child: Text('Save'),
          ),
        ],
      ),
    );
  }

  void _showChangeEmailDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: AppTheme.lightTheme.colorScheme.surface,
        title: Text(
          'Change Email Address',
          style: TextStyle(color: AppTheme.lightTheme.colorScheme.onSurface),
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              decoration: InputDecoration(
                labelText: 'Current Email',
                hintText: userProfile["email"] as String,
                enabled: false,
              ),
            ),
            SizedBox(height: 2.h),
            TextField(
              decoration: InputDecoration(
                labelText: 'New Email',
                hintText: 'Enter new email address',
              ),
            ),
            SizedBox(height: 2.h),
            TextField(
              obscureText: true,
              decoration: InputDecoration(
                labelText: 'Password',
                hintText: 'Confirm with password',
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              _showSuccessMessage('Verification email sent to new address');
            },
            child: Text('Update'),
          ),
        ],
      ),
    );
  }

  void _showChangePasswordDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: AppTheme.lightTheme.colorScheme.surface,
        title: Text(
          'Change Password',
          style: TextStyle(color: AppTheme.lightTheme.colorScheme.onSurface),
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              obscureText: true,
              decoration: InputDecoration(
                labelText: 'Current Password',
                hintText: 'Enter current password',
              ),
            ),
            SizedBox(height: 2.h),
            TextField(
              obscureText: true,
              decoration: InputDecoration(
                labelText: 'New Password',
                hintText: 'Enter new password',
              ),
            ),
            SizedBox(height: 2.h),
            TextField(
              obscureText: true,
              decoration: InputDecoration(
                labelText: 'Confirm Password',
                hintText: 'Confirm new password',
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              _showSuccessMessage('Password updated successfully');
            },
            child: Text('Update'),
          ),
        ],
      ),
    );
  }

  void _manageSubscription() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: AppTheme.lightTheme.colorScheme.surface,
        title: Text(
          'Manage Subscription',
          style: TextStyle(color: AppTheme.lightTheme.colorScheme.onSurface),
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Current Plan: ${subscriptionData["planName"]}',
              style: TextStyle(
                color: AppTheme.lightTheme.colorScheme.onSurface,
                fontWeight: FontWeight.w600,
              ),
            ),
            SizedBox(height: 1.h),
            Text(
              'Renews: ${subscriptionData["renewalDate"]}',
              style: TextStyle(
                  color: AppTheme.lightTheme.colorScheme.onSurfaceVariant),
            ),
            SizedBox(height: 2.h),
            Text(
              'Features included:',
              style: TextStyle(
                color: AppTheme.lightTheme.colorScheme.onSurface,
                fontWeight: FontWeight.w500,
              ),
            ),
            SizedBox(height: 1.h),
            ...(subscriptionData["features"] as List).map((feature) => Padding(
                  padding: EdgeInsets.only(bottom: 0.5.h),
                  child: Row(
                    children: [
                      CustomIconWidget(
                        iconName: 'check_circle',
                        color: AppTheme.successColor,
                        size: 4.w,
                      ),
                      SizedBox(width: 2.w),
                      Text(
                        feature as String,
                        style: TextStyle(
                            color: AppTheme
                                .lightTheme.colorScheme.onSurfaceVariant),
                      ),
                    ],
                  ),
                )),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Close'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              _showSuccessMessage('Redirecting to App Store...');
            },
            child: Text('Manage in Store'),
          ),
        ],
      ),
    );
  }

  void _upgradeSubscription() {
    _showSuccessMessage('Redirecting to upgrade options...');
  }

  void _showAudioQualityDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: AppTheme.lightTheme.colorScheme.surface,
        title: Text(
          'Audio Quality',
          style: TextStyle(color: AppTheme.lightTheme.colorScheme.onSurface),
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: ['Low', 'Medium', 'High', 'Lossless']
              .map(
                (quality) => RadioListTile<String>(
                  title: Text(
                    quality,
                    style: TextStyle(
                        color: AppTheme.lightTheme.colorScheme.onSurface),
                  ),
                  value: quality,
                  groupValue: _selectedAudioQuality,
                  onChanged: (value) {
                    setState(() => _selectedAudioQuality = value!);
                    Navigator.pop(context);
                  },
                  activeColor: AppTheme.lightTheme.colorScheme.secondary,
                ),
              )
              .toList(),
        ),
      ),
    );
  }

  void _showBreathingCircleCustomization() {
    _showSuccessMessage('Breathing circle customization coming soon');
  }

  void _showSessionLengthDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: AppTheme.lightTheme.colorScheme.surface,
        title: Text(
          'Default Session Length',
          style: TextStyle(color: AppTheme.lightTheme.colorScheme.onSurface),
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            '5 minutes',
            '10 minutes',
            '15 minutes',
            '20 minutes',
            '30 minutes'
          ]
              .map(
                (duration) => ListTile(
                  title: Text(
                    duration,
                    style: TextStyle(
                        color: AppTheme.lightTheme.colorScheme.onSurface),
                  ),
                  onTap: () {
                    Navigator.pop(context);
                    _showSuccessMessage(
                        'Default session length updated to $duration');
                  },
                ),
              )
              .toList(),
        ),
      ),
    );
  }

  void _showTextSizeDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: AppTheme.lightTheme.colorScheme.surface,
        title: Text(
          'Text Size',
          style: TextStyle(color: AppTheme.lightTheme.colorScheme.onSurface),
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: ['Small', 'Medium', 'Large', 'Extra Large']
              .map(
                (size) => RadioListTile<String>(
                  title: Text(
                    size,
                    style: TextStyle(
                        color: AppTheme.lightTheme.colorScheme.onSurface),
                  ),
                  value: size,
                  groupValue: _selectedTextSize,
                  onChanged: (value) {
                    setState(() => _selectedTextSize = value!);
                    Navigator.pop(context);
                  },
                  activeColor: AppTheme.lightTheme.colorScheme.secondary,
                ),
              )
              .toList(),
        ),
      ),
    );
  }

  void _exportUserData() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: AppTheme.lightTheme.colorScheme.surface,
        title: Text(
          'Export Data',
          style: TextStyle(color: AppTheme.lightTheme.colorScheme.onSurface),
        ),
        content: Text(
          'Your wellness data will be exported as a CSV file. This includes session history, progress metrics, and preferences.',
          style: TextStyle(
              color: AppTheme.lightTheme.colorScheme.onSurfaceVariant),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              _showSuccessMessage(
                  'Data export started. Check your downloads folder.');
            },
            child: Text('Export'),
          ),
        ],
      ),
    );
  }

  void _showSharingPreferences() {
    _showSuccessMessage('Sharing preferences opened');
  }

  void _manageFamilySharing() {
    _showSuccessMessage('Family sharing management opened');
  }

  void _manageEmergencyContacts() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: AppTheme.lightTheme.colorScheme.surface,
        title: Text(
          'Emergency Contacts',
          style: TextStyle(color: AppTheme.lightTheme.colorScheme.onSurface),
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'These contacts will be available during crisis intervention sessions.',
              style: TextStyle(
                  color: AppTheme.lightTheme.colorScheme.onSurfaceVariant),
            ),
            SizedBox(height: 2.h),
            Container(
              padding: EdgeInsets.all(3.w),
              decoration: BoxDecoration(
                color: AppTheme.warningColor.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(8),
                border: Border.all(
                    color: AppTheme.warningColor.withValues(alpha: 0.3)),
              ),
              child: Row(
                children: [
                  CustomIconWidget(
                    iconName: 'warning',
                    color: AppTheme.warningColor,
                    size: 5.w,
                  ),
                  SizedBox(width: 2.w),
                  Expanded(
                    child: Text(
                      'For immediate emergencies, always call 911',
                      style: TextStyle(
                        color: AppTheme.warningColor,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Close'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              _showSuccessMessage('Emergency contacts management opened');
            },
            child: Text('Manage Contacts'),
          ),
        ],
      ),
    );
  }

  void _manageOfflineContent() {
    _showSuccessMessage('Offline content management opened');
  }

  void _clearCache() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: AppTheme.lightTheme.colorScheme.surface,
        title: Text(
          'Clear Cache',
          style: TextStyle(color: AppTheme.lightTheme.colorScheme.onSurface),
        ),
        content: Text(
          'This will clear temporary files and free up storage space. Your downloaded content and progress will not be affected.',
          style: TextStyle(
              color: AppTheme.lightTheme.colorScheme.onSurfaceVariant),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              _showSuccessMessage('Cache cleared successfully. 0.3 GB freed.');
            },
            child: Text('Clear'),
          ),
        ],
      ),
    );
  }

  void _contactSupport() {
    _showSuccessMessage('Opening support chat...');
  }

  void _rateApp() {
    _showSuccessMessage('Redirecting to app store for rating...');
  }

  void _showTermsOfService() {
    _showSuccessMessage('Terms of Service opened');
  }

  void _showPrivacyPolicy() {
    _showSuccessMessage('Privacy Policy opened');
  }

  void _showLegalInfo() {
    _showSuccessMessage('Legal information opened');
  }

  void _logout() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: AppTheme.lightTheme.colorScheme.surface,
        title: Text(
          'Sign Out',
          style: TextStyle(color: AppTheme.lightTheme.colorScheme.onSurface),
        ),
        content: Text(
          'Are you sure you want to sign out? Your data will be synced to the cloud.',
          style: TextStyle(
              color: AppTheme.lightTheme.colorScheme.onSurfaceVariant),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              Navigator.pushNamedAndRemoveUntil(
                  context, '/login-screen', (route) => false);
            },
            child: Text('Sign Out'),
          ),
        ],
      ),
    );
  }

  void _deleteAccount() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: AppTheme.lightTheme.colorScheme.surface,
        title: Text(
          'Delete Account',
          style: TextStyle(color: AppTheme.errorColor),
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'This action cannot be undone. All your data will be permanently deleted:',
              style: TextStyle(
                  color: AppTheme.lightTheme.colorScheme.onSurfaceVariant),
            ),
            SizedBox(height: 1.h),
            Text('• Session history and progress',
                style: TextStyle(
                    color: AppTheme.lightTheme.colorScheme.onSurfaceVariant)),
            Text('• Downloaded content',
                style: TextStyle(
                    color: AppTheme.lightTheme.colorScheme.onSurfaceVariant)),
            Text('• Personal preferences',
                style: TextStyle(
                    color: AppTheme.lightTheme.colorScheme.onSurfaceVariant)),
            Text('• Subscription benefits',
                style: TextStyle(
                    color: AppTheme.lightTheme.colorScheme.onSurfaceVariant)),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              _showSuccessMessage(
                  'Account deletion request submitted. Check your email for confirmation.');
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: AppTheme.errorColor,
              foregroundColor: Colors.white,
            ),
            child: Text('Delete Account'),
          ),
        ],
      ),
    );
  }

  void _showSuccessMessage(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: AppTheme.successColor,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        margin: EdgeInsets.all(4.w),
      ),
    );
  }
}
