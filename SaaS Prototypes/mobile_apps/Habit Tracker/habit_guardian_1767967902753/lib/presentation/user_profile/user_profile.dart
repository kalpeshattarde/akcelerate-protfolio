import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/achievement_showcase_widget.dart';
import './widgets/premium_section_widget.dart';
import './widgets/profile_header_widget.dart';
import './widgets/profile_stats_widget.dart';
import './widgets/settings_section_widget.dart';
import './widgets/theme_customization_widget.dart';

class UserProfile extends StatefulWidget {
  const UserProfile({super.key});

  @override
  State<UserProfile> createState() => _UserProfileState();
}

class _UserProfileState extends State<UserProfile> {
  String _selectedTheme = 'sanctuary';
  bool _notificationsEnabled = true;
  bool _isPremium = false;

  // Mock user data
  final Map<String, dynamic> _userData = {
    'name': 'Sarah Johnson',
    'email': 'sarah.johnson@email.com',
    'avatar': 'assets/images/sarah_johnson_profile_avatar.png',
    'memberSince': 'January 2024',
  };

  // Mock statistics data
  final Map<String, dynamic> _statsData = {
    'totalHabits': 12,
    'daysActive': 89,
    'longestStreak': 23,
  };

  // Mock achievements data
  final List<Map<String, dynamic>> _achievements = [
    {
      'id': '1',
      'title': 'First Steps',
      'description': 'Created your first habit',
      'icon': 'flag',
      'earned': true,
      'earnedDate': 'January 15, 2024',
    },
    {
      'id': '2',
      'title': 'Week Warrior',
      'description': 'Completed 7 days in a row',
      'icon': 'local_fire_department',
      'earned': true,
      'earnedDate': 'February 2, 2024',
    },
    {
      'id': '3',
      'title': 'Habit Master',
      'description': 'Maintained 5 habits simultaneously',
      'icon': 'star',
      'earned': true,
      'earnedDate': 'March 10, 2024',
    },
    {
      'id': '4',
      'title': 'Century Club',
      'description': 'Complete 100 habit check-ins',
      'icon': 'emoji_events',
      'earned': false,
    },
    {
      'id': '5',
      'title': 'Consistency King',
      'description': 'Maintain a 30-day streak',
      'icon': 'trending_up',
      'earned': false,
    },
  ];

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark
          ? AppTheme.darkTheme.scaffoldBackgroundColor
          : AppTheme.lightTheme.scaffoldBackgroundColor,
      appBar: AppBar(
        title: Text(
          'Profile',
          style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
            color: isDark
                ? AppTheme.darkTheme.colorScheme.onSurface
                : AppTheme.lightTheme.colorScheme.onSurface,
            fontWeight: FontWeight.w600,
          ),
        ),
        centerTitle: true,
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: CustomIconWidget(
            iconName: 'arrow_back_ios',
            color: isDark
                ? AppTheme.darkTheme.colorScheme.onSurface
                : AppTheme.lightTheme.colorScheme.onSurface,
            size: 20,
          ),
          onPressed: () {
            HapticFeedback.lightImpact();
            Navigator.pop(context);
          },
        ),
        actions: [
          IconButton(
            icon: CustomIconWidget(
              iconName: 'settings',
              color: isDark
                  ? AppTheme.darkTheme.colorScheme.onSurface
                  : AppTheme.lightTheme.colorScheme.onSurface,
              size: 24,
            ),
            onPressed: () {
              HapticFeedback.lightImpact();
              _showSettingsDialog();
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        physics: const BouncingScrollPhysics(),
        child: Column(
          children: [
            // Profile Header
            ProfileHeaderWidget(
              userData: _userData,
              onAvatarTap: _handleAvatarUpdate,
            ),

            // Profile Statistics
            ProfileStatsWidget(
              statsData: _statsData,
            ),

            // Premium Section
            PremiumSectionWidget(
              isPremium: _isPremium,
              onUpgradeTap: _handlePremiumUpgrade,
            ),

            // Achievement Showcase
            AchievementShowcaseWidget(
              achievements: _achievements,
            ),

            // Theme Customization
            ThemeCustomizationWidget(
              selectedTheme: _selectedTheme,
              onThemeChanged: _handleThemeChange,
            ),

            // Account Settings
            SettingsSectionWidget(
              title: 'Account Settings',
              items: [
                SettingsItem(
                  icon: 'person',
                  title: 'Personal Information',
                  subtitle: 'Update your profile details',
                  onTap: _navigateToPersonalInfo,
                ),
                SettingsItem(
                  icon: 'security',
                  title: 'Privacy & Security',
                  subtitle: 'Manage your privacy settings',
                  onTap: _navigateToPrivacySecurity,
                ),
                SettingsItem(
                  icon: 'notifications',
                  title: 'Notifications',
                  subtitle: _notificationsEnabled ? 'Enabled' : 'Disabled',
                  trailing: Switch(
                    value: _notificationsEnabled,
                    onChanged: _handleNotificationToggle,
                    activeColor: AppTheme.lightTheme.colorScheme.primary,
                  ),
                ),
              ],
            ),

            // Data & Sync Settings
            SettingsSectionWidget(
              title: 'Data & Sync',
              items: [
                SettingsItem(
                  icon: 'cloud_sync',
                  title: 'Backup & Sync',
                  subtitle: 'Sync your data across devices',
                  onTap: _navigateToBackupSync,
                ),
                SettingsItem(
                  icon: 'download',
                  title: 'Export Data',
                  subtitle: 'Download your habit data',
                  onTap: _handleDataExport,
                ),
                SettingsItem(
                  icon: 'restore',
                  title: 'Import Data',
                  subtitle: 'Import habits from backup',
                  onTap: _handleDataImport,
                ),
              ],
            ),

            // About Section
            SettingsSectionWidget(
              title: 'About',
              items: [
                SettingsItem(
                  icon: 'info',
                  title: 'App Version',
                  subtitle: '1.0.0 (Build 1)',
                ),
                SettingsItem(
                  icon: 'privacy_tip',
                  title: 'Privacy Policy',
                  onTap: _navigateToPrivacyPolicy,
                ),
                SettingsItem(
                  icon: 'description',
                  title: 'Terms of Service',
                  onTap: _navigateToTermsOfService,
                ),
                SettingsItem(
                  icon: 'support',
                  title: 'Contact Support',
                  onTap: _navigateToSupport,
                ),
              ],
            ),

            // Sign Out Button
            Container(
              margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 3.h),
              width: double.infinity,
              child: OutlinedButton(
                onPressed: _handleSignOut,
                style: OutlinedButton.styleFrom(
                  foregroundColor: AppTheme.lightTheme.colorScheme.error,
                  side: BorderSide(
                    color: AppTheme.lightTheme.colorScheme.error
                        .withValues(alpha: 0.5),
                    width: 1,
                  ),
                  padding: EdgeInsets.symmetric(vertical: 2.h),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    CustomIconWidget(
                      iconName: 'logout',
                      color: AppTheme.lightTheme.colorScheme.error,
                      size: 20,
                    ),
                    SizedBox(width: 2.w),
                    Text(
                      'Sign Out',
                      style:
                          AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                        color: AppTheme.lightTheme.colorScheme.error,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ],
                ),
              ),
            ),

            SizedBox(height: 4.h),
          ],
        ),
      ),
    );
  }

  void _handleAvatarUpdate() {
    HapticFeedback.lightImpact();
    // Avatar update is handled in ProfileHeaderWidget
  }

  void _handlePremiumUpgrade() {
    HapticFeedback.lightImpact();
    setState(() {
      _isPremium = true;
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Welcome to Premium! Enjoy all features.'),
        backgroundColor: AppTheme.lightTheme.colorScheme.tertiary,
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  void _handleThemeChange(String themeId) {
    HapticFeedback.lightImpact();
    setState(() {
      _selectedTheme = themeId;
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Theme updated successfully'),
        backgroundColor: AppTheme.lightTheme.colorScheme.primary,
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  void _handleNotificationToggle(bool value) {
    HapticFeedback.lightImpact();
    setState(() {
      _notificationsEnabled = value;
    });
  }

  void _handleDataExport() {
    HapticFeedback.lightImpact();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Exporting your habit data...'),
        backgroundColor: AppTheme.lightTheme.colorScheme.primary,
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  void _handleDataImport() {
    HapticFeedback.lightImpact();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Select a backup file to import'),
        backgroundColor: AppTheme.lightTheme.colorScheme.primary,
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  void _handleSignOut() {
    HapticFeedback.mediumImpact();
    _showSignOutDialog();
  }

  void _showSignOutDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: AppTheme.lightTheme.colorScheme.surface,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
        ),
        title: Row(
          children: [
            CustomIconWidget(
              iconName: 'logout',
              color: AppTheme.lightTheme.colorScheme.error,
              size: 24,
            ),
            SizedBox(width: 2.w),
            Text(
              'Sign Out',
              style: AppTheme.lightTheme.textTheme.titleLarge,
            ),
          ],
        ),
        content: Text(
          'Are you sure you want to sign out? Your data will remain safe and you can sign back in anytime.',
          style: AppTheme.lightTheme.textTheme.bodyMedium,
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text(
              'Cancel',
              style: TextStyle(
                color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
              ),
            ),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              Navigator.pushReplacementNamed(context, '/authentication-screen');
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: AppTheme.lightTheme.colorScheme.error,
            ),
            child: Text(
              'Sign Out',
              style: TextStyle(
                color: AppTheme.lightTheme.colorScheme.onError,
              ),
            ),
          ),
        ],
      ),
    );
  }

  void _showSettingsDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: AppTheme.lightTheme.colorScheme.surface,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
        ),
        title: Text(
          'Quick Settings',
          style: AppTheme.lightTheme.textTheme.titleLarge,
        ),
        content: Text(
          'Access detailed settings from the sections below.',
          style: AppTheme.lightTheme.textTheme.bodyMedium,
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text(
              'Got it',
              style: TextStyle(
                color: AppTheme.lightTheme.colorScheme.primary,
              ),
            ),
          ),
        ],
      ),
    );
  }

  // Navigation methods
  void _navigateToPersonalInfo() {
    HapticFeedback.lightImpact();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Personal Information settings coming soon'),
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  void _navigateToPrivacySecurity() {
    HapticFeedback.lightImpact();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Privacy & Security settings coming soon'),
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  void _navigateToBackupSync() {
    HapticFeedback.lightImpact();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Backup & Sync settings coming soon'),
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  void _navigateToPrivacyPolicy() {
    HapticFeedback.lightImpact();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Opening Privacy Policy...'),
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  void _navigateToTermsOfService() {
    HapticFeedback.lightImpact();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Opening Terms of Service...'),
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  void _navigateToSupport() {
    HapticFeedback.lightImpact();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Opening Support Center...'),
        behavior: SnackBarBehavior.floating,
      ),
    );
  }
}
