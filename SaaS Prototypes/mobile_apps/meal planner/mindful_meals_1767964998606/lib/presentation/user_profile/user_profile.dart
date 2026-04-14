import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../theme/app_theme.dart';
import '../../widgets/custom_icon_widget.dart';
import '../../widgets/main_layout_wrapper.dart';
import './widgets/dietary_preference_tag_widget.dart';
import './widgets/notification_toggle_widget.dart';
import './widgets/profile_header_widget.dart';
import './widgets/profile_section_card_widget.dart';
import './widgets/settings_list_item_widget.dart';
import './widgets/wellness_progress_widget.dart';

class UserProfile extends StatefulWidget {
  const UserProfile({Key? key}) : super(key: key);

  @override
  State<UserProfile> createState() => _UserProfileState();
}

class _UserProfileState extends State<UserProfile>
    with SingleTickerProviderStateMixin {
  final ImagePicker _imagePicker = ImagePicker();

  // Mock user data
  final Map<String, dynamic> _userData = {
    "id": 1,
    "name": "Sarah Chen",
    "email": "sarah.chen@mindfulmeals.com",
    "avatar": "sarah_chen_user_button_profile.png",
    "wellnessStreak": 12,
    "joinDate": "2024-01-15",
    "preferences": {
      "notifications": {
        "mealReminders": true,
        "weeklyPlanning": true,
        "wellnessTips": false,
        "recipeUpdates": true,
      },
      "dietary": ["Vegetarian", "Gluten-Free", "Organic"],
      "goals": {
        "mindfulEating": 78.0,
        "mealPlanning": 65.0,
        "seasonalEating": 42.0,
      },
    },
  };

  @override
  void initState() {
    super.initState();
  }

  @override
  void dispose() {
    super.dispose();
  }

  Future<void> _handleAvatarEdit() async {
    showModalBottomSheet(
      context: context,
      backgroundColor: AppTheme.lightTheme.colorScheme.surface,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder:
          (context) => Container(
            padding: EdgeInsets.all(4.w),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  width: 10.w,
                  height: 0.5.h,
                  decoration: BoxDecoration(
                    color: AppTheme.lightTheme.colorScheme.outline,
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
                SizedBox(height: 3.h),
                Text(
                  'Update Profile Photo',
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    color: AppTheme.lightTheme.colorScheme.onSurface,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                SizedBox(height: 3.h),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    _buildPhotoOption(
                      'Camera',
                      'camera_alt',
                      () => _pickImage(ImageSource.camera),
                    ),
                    _buildPhotoOption(
                      'Gallery',
                      'photo_library',
                      () => _pickImage(ImageSource.gallery),
                    ),
                  ],
                ),
                SizedBox(height: 3.h),
              ],
            ),
          ),
    );
  }

  Widget _buildPhotoOption(String label, String iconName, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Column(
        children: [
          Container(
            width: 15.w,
            height: 15.w,
            decoration: BoxDecoration(
              color: AppTheme.lightTheme.colorScheme.primary.withValues(
                alpha: 0.1,
              ),
              shape: BoxShape.circle,
            ),
            child: Center(
              child: CustomIconWidget(
                iconName: iconName,
                color: AppTheme.lightTheme.colorScheme.primary,
                size: 6.w,
              ),
            ),
          ),
          SizedBox(height: 1.h),
          Text(
            label,
            style: Theme.of(context).textTheme.labelMedium?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurface,
            ),
          ),
        ],
      ),
    );
  }

  Future<void> _pickImage(ImageSource source) async {
    Navigator.pop(context);

    try {
      if (source == ImageSource.camera) {
        final permission = await Permission.camera.request();
        if (!permission.isGranted) return;
      }

      final XFile? image = await _imagePicker.pickImage(
        source: source,
        maxWidth: 512,
        maxHeight: 512,
        imageQuality: 80,
      );

      if (image != null) {
        setState(() {
          _userData["avatar"] = image.path;
        });

        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Profile photo updated successfully'),
            backgroundColor: AppTheme.lightTheme.colorScheme.primary,
          ),
        );
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Failed to update photo. Please try again.'),
          backgroundColor: AppTheme.lightTheme.colorScheme.error,
        ),
      );
    }
  }

  void _handleLogout() {
    showDialog(
      context: context,
      builder:
          (context) => AlertDialog(
            backgroundColor: AppTheme.lightTheme.colorScheme.surface,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(16),
            ),
            title: Text(
              'Sign Out',
              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                color: AppTheme.lightTheme.colorScheme.onSurface,
                fontWeight: FontWeight.w600,
              ),
            ),
            content: Text(
              'Are you sure you want to sign out of your account?',
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
              ),
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
                  Navigator.pushNamedAndRemoveUntil(
                    context,
                    '/authentication-screen',
                    (route) => false,
                  );
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppTheme.lightTheme.colorScheme.error,
                  foregroundColor: AppTheme.lightTheme.colorScheme.onError,
                ),
                child: Text('Sign Out'),
              ),
            ],
          ),
    );
  }

  void _updateNotificationSetting(String key, bool value) {
    setState(() {
      (_userData["preferences"]["notifications"] as Map<String, dynamic>)[key] =
          value;
    });
  }

  @override
  Widget build(BuildContext context) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;
    final notifications =
        _userData["preferences"]["notifications"] as Map<String, dynamic>;
    final dietaryPrefs = _userData["preferences"]["dietary"] as List<dynamic>;
    final goals = _userData["preferences"]["goals"] as Map<String, dynamic>;

    return MainLayoutWrapper(
      currentIndex: 4, // Profile tab
      child: Scaffold(
        backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
        body: SafeArea(
          child: RefreshIndicator(
            onRefresh: () async {
              await Future.delayed(Duration(seconds: 1));
              setState(() {
                _userData["wellnessStreak"] = _userData["wellnessStreak"] + 1;
              });
            },
            color: AppTheme.lightTheme.colorScheme.primary,
            child: SingleChildScrollView(
              physics: AlwaysScrollableScrollPhysics(),
              padding: EdgeInsets.all(4.w),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Header
                  Row(
                    children: [
                      Expanded(
                        child: Text(
                          'Profile',
                          style: Theme.of(
                            context,
                          ).textTheme.headlineMedium?.copyWith(
                            color: AppTheme.lightTheme.colorScheme.onSurface,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                      ),
                      IconButton(
                        onPressed:
                            () => Navigator.pushNamed(
                              context,
                              '/meal-planning-dashboard',
                            ),
                        icon: CustomIconWidget(
                          iconName: 'settings',
                          color:
                              AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                          size: 6.w,
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 3.h),

                  // Profile Header
                  ProfileHeaderWidget(
                    userName: _userData["name"] as String,
                    userEmail: _userData["email"] as String,
                    avatarUrl: _userData["avatar"] as String,
                    wellnessStreak: _userData["wellnessStreak"] as int,
                    onEditAvatar: _handleAvatarEdit,
                  ),
                  SizedBox(height: 3.h),

                  // Personal Information Section
                  ProfileSectionCardWidget(
                    title: 'Personal Information',
                    iconName: 'person',
                    onTap:
                        () => Navigator.pushNamed(
                          context,
                          '/dietary-preferences-setup',
                        ),
                    children: [
                      NotificationToggleWidget(
                        title: 'Meal Reminders',
                        subtitle: 'Get notified about upcoming meals',
                        value: notifications["mealReminders"] as bool,
                        onChanged:
                            (value) => _updateNotificationSetting(
                              'mealReminders',
                              value,
                            ),
                      ),
                      NotificationToggleWidget(
                        title: 'Weekly Planning',
                        subtitle: 'Reminders for meal planning sessions',
                        value: notifications["weeklyPlanning"] as bool,
                        onChanged:
                            (value) => _updateNotificationSetting(
                              'weeklyPlanning',
                              value,
                            ),
                      ),
                      NotificationToggleWidget(
                        title: 'Wellness Tips',
                        subtitle: 'Daily mindful eating insights',
                        value: notifications["wellnessTips"] as bool,
                        onChanged:
                            (value) => _updateNotificationSetting(
                              'wellnessTips',
                              value,
                            ),
                      ),
                    ],
                  ),

                  // Dietary Preferences Section
                  ProfileSectionCardWidget(
                    title: 'Dietary Preferences',
                    iconName: 'restaurant',
                    onTap:
                        () => Navigator.pushNamed(
                          context,
                          '/dietary-preferences-setup',
                        ),
                    children: [
                      Wrap(
                        children:
                            dietaryPrefs
                                .map(
                                  (pref) => DietaryPreferenceTagWidget(
                                    label: pref,
                                    isActive: true,
                                    onTap:
                                        () => Navigator.pushNamed(
                                          context,
                                          '/dietary-preferences-setup',
                                        ),
                                  ),
                                )
                                .toList(),
                      ),
                    ],
                  ),

                  // Wellness Goals Section
                  ProfileSectionCardWidget(
                    title: 'Wellness Goals',
                    iconName: 'trending_up',
                    children: [
                      WellnessProgressWidget(
                        mindfulEatingProgress: goals["mindfulEating"] as double,
                        mealPlanningProgress: goals["mealPlanning"] as double,
                        seasonalEatingProgress:
                            goals["seasonalEating"] as double,
                      ),
                    ],
                  ),

                  // App Settings Section
                  ProfileSectionCardWidget(
                    title: 'App Settings',
                    iconName: 'settings',
                    children: [
                      SettingsListItemWidget(
                        title: 'Notifications',
                        subtitle: 'Manage your notification preferences',
                        iconName: 'notifications',
                        onTap:
                            () => Navigator.pushNamed(
                              context,
                              '/meal-planning-dashboard',
                            ),
                      ),
                      SettingsListItemWidget(
                        title: 'Privacy',
                        subtitle: 'Data usage and privacy settings',
                        iconName: 'privacy_tip',
                        onTap:
                            () => Navigator.pushNamed(
                              context,
                              '/meal-planning-dashboard',
                            ),
                      ),
                      SettingsListItemWidget(
                        title: 'Data Export',
                        subtitle: 'Download your meal planning data',
                        iconName: 'download',
                        onTap:
                            () => Navigator.pushNamed(
                              context,
                              '/meal-planning-dashboard',
                            ),
                      ),
                      SettingsListItemWidget(
                        title: 'Help & Support',
                        subtitle: 'Get help with using the app',
                        iconName: 'help',
                        onTap:
                            () => Navigator.pushNamed(
                              context,
                              '/meal-planning-dashboard',
                            ),
                      ),
                      SettingsListItemWidget(
                        title: 'About',
                        subtitle: 'App version and information',
                        iconName: 'info',
                        onTap:
                            () => Navigator.pushNamed(
                              context,
                              '/meal-planning-dashboard',
                            ),
                        showDivider: false,
                      ),
                    ],
                  ),

                  // Premium Features Section
                  Container(
                    width: double.infinity,
                    margin: EdgeInsets.only(bottom: 2.h),
                    padding: EdgeInsets.all(4.w),
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        colors: [
                          AppTheme.lightTheme.colorScheme.primary.withValues(
                            alpha: 0.1,
                          ),
                          AppTheme.lightTheme.colorScheme.secondary.withValues(
                            alpha: 0.1,
                          ),
                        ],
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                      ),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(
                        color: AppTheme.lightTheme.colorScheme.primary
                            .withValues(alpha: 0.3),
                        width: 1,
                      ),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            CustomIconWidget(
                              iconName: 'star',
                              color: AppTheme.lightTheme.colorScheme.primary,
                              size: 6.w,
                            ),
                            SizedBox(width: 3.w),
                            Text(
                              'Premium Features',
                              style: Theme.of(
                                context,
                              ).textTheme.titleMedium?.copyWith(
                                color: AppTheme.lightTheme.colorScheme.primary,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ],
                        ),
                        SizedBox(height: 2.h),
                        Text(
                          'Unlock advanced meal planning, personalized nutrition insights, and exclusive seasonal recipes.',
                          style: Theme.of(
                            context,
                          ).textTheme.bodyMedium?.copyWith(
                            color: AppTheme.lightTheme.colorScheme.onSurface,
                          ),
                        ),
                        SizedBox(height: 2.h),
                        SizedBox(
                          width: double.infinity,
                          child: ElevatedButton(
                            onPressed:
                                () => Navigator.pushNamed(
                                  context,
                                  '/meal-planning-dashboard',
                                ),
                            style: ElevatedButton.styleFrom(
                              backgroundColor:
                                  AppTheme.lightTheme.colorScheme.primary,
                              foregroundColor:
                                  AppTheme.lightTheme.colorScheme.onPrimary,
                              padding: EdgeInsets.symmetric(vertical: 2.h),
                            ),
                            child: Text('Upgrade to Premium'),
                          ),
                        ),
                      ],
                    ),
                  ),

                  // Logout Button
                  Container(
                    width: double.infinity,
                    margin: EdgeInsets.only(bottom: 2.h),
                    child: OutlinedButton(
                      onPressed: _handleLogout,
                      style: OutlinedButton.styleFrom(
                        foregroundColor: AppTheme.lightTheme.colorScheme.error,
                        side: BorderSide(
                          color: AppTheme.lightTheme.colorScheme.error,
                        ),
                        padding: EdgeInsets.symmetric(vertical: 2.h),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          CustomIconWidget(
                            iconName: 'logout',
                            color: AppTheme.lightTheme.colorScheme.error,
                            size: 5.w,
                          ),
                          SizedBox(width: 2.w),
                          Text('Sign Out'),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
