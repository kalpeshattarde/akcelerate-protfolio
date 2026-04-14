import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({Key? key}) : super(key: key);

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  // Mock user data
  final Map<String, dynamic> _userData = {
    "name": "Alex Johnson",
    "email": "alex.johnson@example.com",
    "profileImage":
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
    "joinDate": "January 2024",
    "totalListeningTime": "240 hours",
    "podcastsFollowed": 45,
    "episodesCompleted": 127,
    "favoriteGenres": ["Technology", "Business", "Health & Wellness"],
  };

  final List<Map<String, dynamic>> _listeningStats = [
    {
      "title": "Total Hours",
      "value": "240h",
      "icon": "schedule",
      "color": AppTheme.lightTheme.colorScheme.secondary,
    },
    {
      "title": "Podcasts Followed",
      "value": "45",
      "icon": "podcasts",
      "color": AppTheme.lightTheme.colorScheme.primary,
    },
    {
      "title": "Episodes Completed",
      "value": "127",
      "icon": "check_circle",
      "color": Colors.green,
    },
    {
      "title": "Achievements",
      "value": "12",
      "icon": "emoji_events",
      "color": Colors.amber,
    },
  ];

  final List<Map<String, dynamic>> _recentlyPlayed = [
    {
      "title": "The Future of AI",
      "author": "Tech Insights",
      "artwork":
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
      "lastPlayed": "2 hours ago",
    },
    {
      "title": "Mindful Living",
      "author": "Wellness Weekly",
      "artwork":
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
      "lastPlayed": "Yesterday",
    },
    {
      "title": "Startup Stories",
      "author": "Business Chronicles",
      "artwork":
          "https://images.unsplash.com/photo-1559136555-9303baea8ebd?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
      "lastPlayed": "3 days ago",
    },
  ];

  final List<Map<String, dynamic>> _settingsOptions = [
    {
      "title": "Account Settings",
      "subtitle": "Manage your account details",
      "icon": "person",
      "action": "account",
    },
    {
      "title": "Playback & Download",
      "subtitle": "Audio quality and download preferences",
      "icon": "settings",
      "action": "playback",
    },
    {
      "title": "Notifications",
      "subtitle": "Manage your notification preferences",
      "icon": "notifications",
      "action": "notifications",
    },
    {
      "title": "Privacy & Security",
      "subtitle": "Control your data and privacy settings",
      "icon": "shield",
      "action": "privacy",
    },
    {
      "title": "Help & Support",
      "subtitle": "Get help and contact support",
      "icon": "help",
      "action": "support",
    },
    {
      "title": "About",
      "subtitle": "App version and legal information",
      "icon": "info",
      "action": "about",
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      body: SafeArea(
        child: CustomScrollView(
          physics: const BouncingScrollPhysics(),
          slivers: [
            // App Bar
            SliverAppBar(
              expandedHeight: 25.h,
              floating: false,
              pinned: true,
              backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
              elevation: 0,
              leading: IconButton(
                onPressed: () => Navigator.pop(context),
                icon: CustomIconWidget(
                  iconName: 'arrow_back',
                  color: AppTheme.lightTheme.colorScheme.onSurface,
                  size: 24,
                ),
              ),
              actions: [
                IconButton(
                  onPressed: () => _showEditProfileDialog(),
                  icon: CustomIconWidget(
                    iconName: 'edit',
                    color: AppTheme.lightTheme.colorScheme.onSurface,
                    size: 24,
                  ),
                ),
                SizedBox(width: 2.w),
              ],
              flexibleSpace: FlexibleSpaceBar(
                background: _buildProfileHeader(),
              ),
            ),

            // Listening Stats
            SliverToBoxAdapter(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(height: 2.h),
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: 4.w),
                    child: Text(
                      "Listening Stats",
                      style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  SizedBox(height: 2.h),
                  _buildStatsGrid(),
                  SizedBox(height: 3.h),
                ],
              ),
            ),

            // Recently Played
            SliverToBoxAdapter(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: 4.w),
                    child: Text(
                      "Recently Played",
                      style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  SizedBox(height: 2.h),
                ],
              ),
            ),

            SliverList(
              delegate: SliverChildBuilderDelegate(
                (context, index) {
                  return _buildRecentlyPlayedItem(_recentlyPlayed[index]);
                },
                childCount: _recentlyPlayed.length,
              ),
            ),

            // Settings Section
            SliverToBoxAdapter(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(height: 3.h),
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: 4.w),
                    child: Text(
                      "Settings",
                      style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  SizedBox(height: 2.h),
                ],
              ),
            ),

            SliverList(
              delegate: SliverChildBuilderDelegate(
                (context, index) {
                  return _buildSettingsItem(_settingsOptions[index]);
                },
                childCount: _settingsOptions.length,
              ),
            ),

            // Sign Out Button
            SliverToBoxAdapter(
              child: Padding(
                padding: EdgeInsets.all(4.w),
                child: Column(
                  children: [
                    SizedBox(height: 2.h),
                    SizedBox(
                      width: double.infinity,
                      child: OutlinedButton.icon(
                        onPressed: () => _showSignOutDialog(),
                        icon: CustomIconWidget(
                          iconName: 'logout',
                          color: AppTheme.lightTheme.colorScheme.error,
                          size: 20,
                        ),
                        label: Text(
                          "Sign Out",
                          style:
                              AppTheme.lightTheme.textTheme.bodyLarge?.copyWith(
                            color: AppTheme.lightTheme.colorScheme.error,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        style: OutlinedButton.styleFrom(
                          side: BorderSide(
                            color: AppTheme.lightTheme.colorScheme.error,
                            width: 1.5,
                          ),
                          padding: EdgeInsets.symmetric(vertical: 3.h),
                        ),
                      ),
                    ),
                    SizedBox(height: 5.h),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildProfileHeader() {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          // Profile Image
          Container(
            width: 25.w,
            height: 25.w,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              border: Border.all(
                color: AppTheme.lightTheme.colorScheme.secondary,
                width: 3,
              ),
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(50.w),
              child: CustomImageWidget(
                imageUrl: _userData["profileImage"] as String,
                width: 25.w,
                height: 25.w,
                fit: BoxFit.cover,
              ),
            ),
          ),
          SizedBox(height: 2.h),

          // Name
          Text(
            _userData["name"] as String,
            style: AppTheme.lightTheme.textTheme.headlineSmall?.copyWith(
              fontWeight: FontWeight.bold,
            ),
            textAlign: TextAlign.center,
          ),

          // Email
          Text(
            _userData["email"] as String,
            style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
            ),
            textAlign: TextAlign.center,
          ),

          // Join Date
          Text(
            "Member since ${_userData["joinDate"]}",
            style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  Widget _buildStatsGrid() {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 4.w),
      child: GridView.builder(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          crossAxisSpacing: 3.w,
          mainAxisSpacing: 2.h,
          childAspectRatio: 1.5,
        ),
        itemCount: _listeningStats.length,
        itemBuilder: (context, index) {
          final stat = _listeningStats[index];
          return Container(
            decoration: BoxDecoration(
              color: AppTheme.lightTheme.colorScheme.surface,
              borderRadius: BorderRadius.circular(12),
              boxShadow: [
                BoxShadow(
                  color: AppTheme.lightTheme.colorScheme.shadow
                      .withValues(alpha: 0.1),
                  blurRadius: 8,
                  offset: const Offset(0, 2),
                ),
              ],
            ),
            padding: EdgeInsets.all(4.w),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                CustomIconWidget(
                  iconName: stat["icon"] as String,
                  color: stat["color"] as Color,
                  size: 28,
                ),
                SizedBox(height: 1.h),
                Text(
                  stat["value"] as String,
                  style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Text(
                  stat["title"] as String,
                  style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                    color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                  ),
                  textAlign: TextAlign.center,
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildRecentlyPlayedItem(Map<String, dynamic> episode) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color:
                AppTheme.lightTheme.colorScheme.shadow.withValues(alpha: 0.05),
            blurRadius: 4,
            offset: const Offset(0, 1),
          ),
        ],
      ),
      child: ListTile(
        contentPadding: EdgeInsets.all(3.w),
        leading: Container(
          width: 15.w,
          height: 15.w,
          child: ClipRRect(
            borderRadius: BorderRadius.circular(8),
            child: CustomImageWidget(
              imageUrl: episode["artwork"] as String,
              width: 15.w,
              height: 15.w,
              fit: BoxFit.cover,
            ),
          ),
        ),
        title: Text(
          episode["title"] as String,
          style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w600,
          ),
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
        ),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              episode["author"] as String,
              style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
              ),
            ),
            SizedBox(height: 0.5.h),
            Text(
              "Last played: ${episode["lastPlayed"]}",
              style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                color: AppTheme.lightTheme.colorScheme.secondary,
                fontSize: 10.sp,
              ),
            ),
          ],
        ),
        trailing: CustomIconWidget(
          iconName: 'play_circle_filled',
          color: AppTheme.lightTheme.colorScheme.secondary,
          size: 24,
        ),
        onTap: () {
          // Navigate to podcast detail or audio player
        },
      ),
    );
  }

  Widget _buildSettingsItem(Map<String, dynamic> setting) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 0.5.h),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: BorderRadius.circular(12),
      ),
      child: ListTile(
        contentPadding: EdgeInsets.all(3.w),
        leading: Container(
          width: 12.w,
          height: 12.w,
          decoration: BoxDecoration(
            color: AppTheme.lightTheme.colorScheme.secondary
                .withValues(alpha: 0.1),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Center(
            child: CustomIconWidget(
              iconName: setting["icon"] as String,
              color: AppTheme.lightTheme.colorScheme.secondary,
              size: 20,
            ),
          ),
        ),
        title: Text(
          setting["title"] as String,
          style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
        subtitle: Text(
          setting["subtitle"] as String,
          style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
            color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
          ),
        ),
        trailing: CustomIconWidget(
          iconName: 'chevron_right',
          color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
          size: 20,
        ),
        onTap: () => _handleSettingTap(setting["action"] as String),
      ),
    );
  }

  void _handleSettingTap(String action) {
    switch (action) {
      case 'account':
        // Navigate to account settings
        break;
      case 'playback':
        // Navigate to playback settings
        break;
      case 'notifications':
        // Navigate to notification settings
        break;
      case 'privacy':
        // Navigate to privacy settings
        break;
      case 'support':
        // Navigate to help & support
        break;
      case 'about':
        // Navigate to about page
        break;
    }
  }

  void _showEditProfileDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(
          "Edit Profile",
          style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
            fontWeight: FontWeight.bold,
          ),
        ),
        content: Text(
          "Profile editing functionality will be implemented here.",
          style: AppTheme.lightTheme.textTheme.bodyMedium,
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text("Cancel"),
          ),
          ElevatedButton(
            onPressed: () => Navigator.pop(context),
            child: Text("Save"),
          ),
        ],
      ),
    );
  }

  void _showSignOutDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(
          "Sign Out",
          style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
            fontWeight: FontWeight.bold,
          ),
        ),
        content: Text(
          "Are you sure you want to sign out of your account?",
          style: AppTheme.lightTheme.textTheme.bodyMedium,
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text("Cancel"),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              Navigator.pushNamedAndRemoveUntil(
                context,
                '/login-screen',
                (route) => false,
              );
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: AppTheme.lightTheme.colorScheme.error,
            ),
            child: Text("Sign Out"),
          ),
        ],
      ),
    );
  }
}
