import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/meditation_stats_widget.dart';
import './widgets/profile_header_widget.dart';
import './widgets/settings_section_widget.dart';
import './widgets/sign_out_widget.dart';

class UserProfile extends StatefulWidget {
  const UserProfile({Key? key}) : super(key: key);

  @override
  State<UserProfile> createState() => _UserProfileState();
}

class _UserProfileState extends State<UserProfile> {
  bool _isDarkMode = false;
  bool _notificationsEnabled = true;
  bool _downloadOnWifi = true;

  // Mock user data
  final Map<String, dynamic> _userData = {
    "id": 1,
    "name": "Sarah Johnson",
    "email": "sarah.johnson@email.com",
    "membershipStatus": "Premium Member",
    "avatar":
        "https://img.rocket.new/generatedImages/rocket_gen_img_1ae7d9bdc-1762274136565.png",
    "semanticLabel":
        "Professional headshot of a woman with shoulder-length brown hair wearing a white blouse, smiling warmly at the camera",
    "totalSessions": 127,
    "currentStreak": 15,
    "favoriteCategory": "Sleep & Relaxation",
    "motivationalMessage":
        "You're building a beautiful mindfulness practice. Keep going!",
    "subscriptionPlan": "Premium Annual",
    "renewalDate": "March 15, 2025",
    "audioQuality": "High Quality",
    "storageUsed": "2.3 GB"
  };

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      appBar: AppBar(
        title: Text(
          'Profile',
          style: AppTheme.lightTheme.appBarTheme.titleTextStyle,
        ),
        backgroundColor: AppTheme.lightTheme.appBarTheme.backgroundColor,
        elevation: AppTheme.lightTheme.appBarTheme.elevation,
        // Remove leading back button - navigation handled by bottom nav
        automaticallyImplyLeading: false,
        actions: [
          IconButton(
            icon: CustomIconWidget(
              iconName: 'edit',
              color: AppTheme.lightTheme.colorScheme.onSurface,
              size: 6.w,
            ),
            onPressed: _onEditProfile,
          ),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          physics: const BouncingScrollPhysics(),
          child: Column(
            children: [
              SizedBox(height: 2.h),
              ProfileHeaderWidget(
                userName: _userData["name"] as String,
                membershipStatus: _userData["membershipStatus"] as String,
                avatarUrl: _userData["avatar"] as String,
                semanticLabel: _userData["semanticLabel"] as String,
                onAvatarTap: _onEditProfile,
              ),
              MeditationStatsWidget(
                totalSessions: _userData["totalSessions"] as int,
                currentStreak: _userData["currentStreak"] as int,
                favoriteCategory: _userData["favoriteCategory"] as String,
                motivationalMessage: _userData["motivationalMessage"] as String,
              ),
              SizedBox(height: 2.h),
              _buildAccountSection(),
              SizedBox(height: 2.h),
              _buildPreferencesSection(),
              SizedBox(height: 2.h),
              _buildAppSection(),
              SizedBox(height: 2.h),
              SignOutWidget(onSignOut: _onSignOut),
              SizedBox(height: 4.h),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildAccountSection() {
    return SettingsSectionWidget(
      title: 'Account',
      items: [
        SettingsItem(
          iconName: 'person',
          iconColor: AppTheme.lightTheme.colorScheme.secondary,
          title: 'Edit Profile',
          subtitle: 'Update your personal information',
          onTap: _onEditProfile,
        ),
        SettingsItem(
          iconName: 'card_membership',
          iconColor: AppTheme.lightTheme.colorScheme.tertiary,
          title: 'Subscription Management',
          subtitle:
              '${_userData["subscriptionPlan"]} • Renews ${_userData["renewalDate"]}',
          onTap: _onSubscriptionManagement,
        ),
        SettingsItem(
          iconName: 'privacy_tip',
          iconColor: AppTheme.lightTheme.colorScheme.secondary,
          title: 'Privacy Settings',
          subtitle: 'Manage your data and privacy preferences',
          onTap: _onPrivacySettings,
        ),
        SettingsItem(
          iconName: 'file_download',
          iconColor: AppTheme.lightTheme.colorScheme.tertiary,
          title: 'Data Export',
          subtitle: 'Download your meditation data',
          onTap: _onDataExport,
        ),
      ],
    );
  }

  Widget _buildPreferencesSection() {
    return SettingsSectionWidget(
      title: 'Preferences',
      items: [
        SettingsItem(
          iconName: 'notifications',
          iconColor: AppTheme.lightTheme.colorScheme.secondary,
          title: 'Notification Settings',
          subtitle: _notificationsEnabled ? 'Enabled' : 'Disabled',
          hasSwitch: true,
          switchValue: _notificationsEnabled,
          onSwitchChanged: (value) {
            setState(() {
              _notificationsEnabled = value;
            });
            _showToast(_notificationsEnabled
                ? 'Notifications enabled'
                : 'Notifications disabled');
          },
        ),
        SettingsItem(
          iconName: 'high_quality',
          iconColor: AppTheme.lightTheme.colorScheme.tertiary,
          title: 'Audio Quality',
          subtitle: _userData["audioQuality"] as String,
          trailingText: 'High',
          onTap: _onAudioQuality,
        ),
        SettingsItem(
          iconName: 'download',
          iconColor: AppTheme.lightTheme.colorScheme.secondary,
          title: 'Download Management',
          subtitle: 'Storage used: ${_userData["storageUsed"]}',
          onTap: _onDownloadManagement,
        ),
        SettingsItem(
          iconName: 'dark_mode',
          iconColor: AppTheme.lightTheme.colorScheme.tertiary,
          title: 'Theme Selection',
          subtitle: _isDarkMode ? 'Dark Mode' : 'Light Mode',
          hasSwitch: true,
          switchValue: _isDarkMode,
          onSwitchChanged: (value) {
            setState(() {
              _isDarkMode = value;
            });
            _showToast(
                _isDarkMode ? 'Dark mode enabled' : 'Light mode enabled');
          },
        ),
      ],
    );
  }

  Widget _buildAppSection() {
    return SettingsSectionWidget(
      title: 'App',
      items: [
        SettingsItem(
          iconName: 'help',
          iconColor: AppTheme.lightTheme.colorScheme.secondary,
          title: 'Help & Support',
          subtitle: 'FAQ, tutorials, and contact support',
          onTap: _onHelpSupport,
        ),
        SettingsItem(
          iconName: 'star_rate',
          iconColor: AppTheme.lightTheme.colorScheme.tertiary,
          title: 'Rate App',
          subtitle: 'Share your experience with others',
          onTap: _onRateApp,
        ),
        SettingsItem(
          iconName: 'share',
          iconColor: AppTheme.lightTheme.colorScheme.secondary,
          title: 'Share with Friends',
          subtitle: 'Invite friends to join your mindfulness journey',
          onTap: _onShareApp,
        ),
        SettingsItem(
          iconName: 'info',
          iconColor: AppTheme.lightTheme.colorScheme.tertiary,
          title: 'About',
          subtitle: 'App version, terms, and privacy policy',
          onTap: _onAbout,
        ),
      ],
    );
  }

  void _onEditProfile() {
    _showToast('Edit Profile feature coming soon');
  }

  void _onSubscriptionManagement() {
    _showToast('Subscription management opened');
  }

  void _onPrivacySettings() {
    _showToast('Privacy settings opened');
  }

  void _onDataExport() {
    _showToast('Data export initiated');
  }

  void _onAudioQuality() {
    _showBottomSheet(
      context,
      'Audio Quality',
      [
        _buildQualityOption('Standard Quality', '128 kbps', false),
        _buildQualityOption('High Quality', '320 kbps', true),
        _buildQualityOption('Lossless', 'FLAC', false),
      ],
    );
  }

  void _onDownloadManagement() {
    _showToast('Download management opened');
  }

  void _onHelpSupport() {
    _showToast('Help & Support opened');
  }

  void _onRateApp() {
    _showToast('Rate app dialog opened');
  }

  void _onShareApp() {
    _showToast('Share app dialog opened');
  }

  void _onAbout() {
    _showToast('About page opened');
  }

  void _onSignOut() {
    Navigator.pushNamedAndRemoveUntil(
      context,
      '/authentication-screen',
      (route) => false,
    );
    _showToast('Signed out successfully');
  }

  Widget _buildQualityOption(String title, String subtitle, bool isSelected) {
    return ListTile(
      title: Text(
        title,
        style: AppTheme.lightTheme.textTheme.bodyLarge?.copyWith(
          color: AppTheme.lightTheme.colorScheme.onSurface,
          fontWeight: isSelected ? FontWeight.w600 : FontWeight.w400,
        ),
      ),
      subtitle: Text(
        subtitle,
        style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
          color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
        ),
      ),
      trailing: isSelected
          ? CustomIconWidget(
              iconName: 'check_circle',
              color: AppTheme.lightTheme.colorScheme.secondary,
              size: 6.w,
            )
          : null,
      onTap: () {
        Navigator.pop(context);
        _showToast('Audio quality set to $title');
      },
    );
  }

  void _showBottomSheet(
      BuildContext context, String title, List<Widget> options) {
    showModalBottomSheet(
      context: context,
      backgroundColor: AppTheme.lightTheme.colorScheme.surface,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) {
        return Container(
          padding: EdgeInsets.all(5.w),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Center(
                child: Container(
                  width: 12.w,
                  height: 0.5.h,
                  decoration: BoxDecoration(
                    color: AppTheme.lightTheme.colorScheme.onSurfaceVariant
                        .withValues(alpha: 0.3),
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
              ),
              SizedBox(height: 3.h),
              Text(
                title,
                style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                  color: AppTheme.lightTheme.colorScheme.onSurface,
                  fontWeight: FontWeight.w600,
                ),
              ),
              SizedBox(height: 2.h),
              ...options,
              SizedBox(height: 2.h),
            ],
          ),
        );
      },
    );
  }

  void _showToast(String message) {
    Fluttertoast.showToast(
      msg: message,
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
      backgroundColor:
          AppTheme.lightTheme.colorScheme.onSurface.withValues(alpha: 0.8),
      textColor: AppTheme.lightTheme.colorScheme.surface,
      fontSize: 14.sp,
    );
  }
}
