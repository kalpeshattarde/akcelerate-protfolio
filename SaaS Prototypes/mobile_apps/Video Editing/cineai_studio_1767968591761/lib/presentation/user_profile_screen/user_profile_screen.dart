import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:sizer/sizer.dart';

import '../../widgets/custom_bottom_bar.dart';
import './widgets/profile_header_widget.dart';
import './widgets/stats_card_widget.dart';
import './widgets/settings_section_widget.dart';
import './widgets/activity_timeline_widget.dart';
import './widgets/quick_action_button_widget.dart';

class UserProfileScreen extends StatefulWidget {
  const UserProfileScreen({super.key});

  @override
  State<UserProfileScreen> createState() => _UserProfileScreenState();
}

class _UserProfileScreenState extends State<UserProfileScreen> {
  bool _notificationsEnabled = true;
  bool _autoEnhanceEnabled = false;
  String _selectedQuality = 'HD';
  String _selectedPlan = 'Pro';

  final Map<String, dynamic> _userProfile = {
    'name': 'Alex Morgan',
    'email': 'alex.morgan@example.com',
    'avatar':
        'https://img.rocket.new/generatedImages/rocket_gen_img_1bee0a0ff-1763297194929.png',
    'avatarSemanticLabel':
        'Professional headshot of Alex Morgan with blue background',
    'joinDate': 'December 2024',
    'bio':
        'Creative filmmaker and AI enthusiast. Passionate about storytelling through innovative video technology.',
  };

  final Map<String, int> _userStats = {
    'creations': 127,
    'views': 45800,
    'favorites': 89,
  };

  final List<Map<String, dynamic>> _recentActivity = [
    {
      'title': 'Created "Sunset Dreams"',
      'timestamp': '2 hours ago',
      'thumbnail':
          'https://images.unsplash.com/photo-1596033861469-eaa1dafa3f18',
      'semanticLabel': 'Aerial view of sunset over ocean waves',
      'views': 234,
    },
    {
      'title': 'Upgraded to Pro Plan',
      'timestamp': '1 day ago',
      'thumbnail': '',
      'semanticLabel': '',
      'views': 0,
    },
    {
      'title': 'Created "Neon City"',
      'timestamp': '3 days ago',
      'thumbnail':
          'https://images.unsplash.com/photo-1625910121613-618305a85ed7',
      'semanticLabel': 'Futuristic cityscape with neon lights at night',
      'views': 1524,
    },
  ];

  void _handleEditProfile() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => _buildEditProfileModal(),
    );
  }

  Widget _buildEditProfileModal() {
    final theme = Theme.of(context);
    final nameController = TextEditingController(text: _userProfile['name']);
    final bioController = TextEditingController(text: _userProfile['bio']);

    return Container(
      height: 85.h,
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(20.0)),
      ),
      child: Padding(
        padding: EdgeInsets.all(4.w),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Edit Profile',
                  style: theme.textTheme.titleLarge?.copyWith(
                    fontWeight: FontWeight.w700,
                  ),
                ),
                IconButton(
                  onPressed: () => Navigator.pop(context),
                  icon: const Icon(Icons.close),
                ),
              ],
            ),
            SizedBox(height: 3.h),
            Center(
              child: Stack(
                children: [
                  CircleAvatar(
                    radius: 50,
                    backgroundImage: NetworkImage(_userProfile['avatar']),
                  ),
                  Positioned(
                    bottom: 0,
                    right: 0,
                    child: Container(
                      decoration: BoxDecoration(
                        color: theme.colorScheme.primary,
                        shape: BoxShape.circle,
                      ),
                      child: IconButton(
                        onPressed: () {
                          Fluttertoast.showToast(
                            msg: "Image picker feature coming soon",
                            toastLength: Toast.LENGTH_SHORT,
                            gravity: ToastGravity.BOTTOM,
                          );
                        },
                        icon: Icon(
                          Icons.camera_alt,
                          color: theme.colorScheme.onPrimary,
                          size: 20,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(height: 3.h),
            TextField(
              controller: nameController,
              decoration: const InputDecoration(
                labelText: 'Display Name',
                prefixIcon: Icon(Icons.person_outline),
              ),
            ),
            SizedBox(height: 2.h),
            TextField(
              controller: bioController,
              maxLines: 3,
              maxLength: 150,
              decoration: const InputDecoration(
                labelText: 'Bio',
                prefixIcon: Icon(Icons.edit_outlined),
                alignLabelWithHint: true,
              ),
            ),
            const Spacer(),
            SizedBox(
              width: double.infinity,
              height: 7.h,
              child: ElevatedButton(
                onPressed: () {
                  Navigator.pop(context);
                  Fluttertoast.showToast(
                    msg: "Profile updated successfully",
                    toastLength: Toast.LENGTH_SHORT,
                    gravity: ToastGravity.BOTTOM,
                  );
                },
                child: const Text('Save Changes'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _handleShareProfile() {
    Fluttertoast.showToast(
      msg: "Share profile feature coming soon",
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
    );
  }

  void _handleExportPortfolio() {
    Fluttertoast.showToast(
      msg: "Exporting portfolio...",
      toastLength: Toast.LENGTH_LONG,
      gravity: ToastGravity.BOTTOM,
    );
  }

  void _handleDeleteAccount() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Delete Account'),
        content: const Text(
          'Are you sure you want to delete your account? This action cannot be undone.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              Fluttertoast.showToast(
                msg: "Account deletion requires confirmation email",
                toastLength: Toast.LENGTH_LONG,
                gravity: ToastGravity.BOTTOM,
              );
            },
            child: Text(
              'Delete',
              style: TextStyle(color: Theme.of(context).colorScheme.error),
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        systemOverlayStyle: const SystemUiOverlayStyle(
          statusBarColor: Colors.transparent,
          statusBarIconBrightness: Brightness.light,
        ),
        flexibleSpace: Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [Colors.black.withValues(alpha: 0.3), Colors.transparent],
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
            ),
          ),
        ),
        centerTitle: true,
        title: Text(
          'Profile',
          style: theme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w600,
            color: Colors.white,
          ),
        ),
        actions: [
          Padding(
            padding: EdgeInsets.only(right: 4.w),
            child: IconButton(
              onPressed: () {
                Fluttertoast.showToast(
                  msg: "Settings feature coming soon",
                  toastLength: Toast.LENGTH_SHORT,
                  gravity: ToastGravity.BOTTOM,
                );
              },
              icon: const Icon(Icons.settings_outlined, color: Colors.white),
            ),
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: () async {
          await Future.delayed(const Duration(seconds: 1));
          Fluttertoast.showToast(
            msg: "Profile refreshed",
            toastLength: Toast.LENGTH_SHORT,
            gravity: ToastGravity.BOTTOM,
          );
        },
        child: SingleChildScrollView(
          physics: const AlwaysScrollableScrollPhysics(),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              ProfileHeaderWidget(
                userProfile: _userProfile,
                onEditPressed: _handleEditProfile,
              ),
              SizedBox(height: 2.h),
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 4.w),
                child: Row(
                  children: [
                    Expanded(
                      child: StatsCardWidget(
                        icon: 'video_library',
                        value: _userStats['creations']!,
                        label: 'Creations',
                      ),
                    ),
                    SizedBox(width: 3.w),
                    Expanded(
                      child: StatsCardWidget(
                        icon: 'visibility',
                        value: _userStats['views']!,
                        label: 'Total Views',
                      ),
                    ),
                    SizedBox(width: 3.w),
                    Expanded(
                      child: StatsCardWidget(
                        icon: 'favorite',
                        value: _userStats['favorites']!,
                        label: 'Favorites',
                      ),
                    ),
                  ],
                ),
              ),
              SizedBox(height: 3.h),
              SettingsSectionWidget(
                title: 'Account Settings',
                items: [
                  {
                    'icon': 'email',
                    'title': 'Email',
                    'subtitle': _userProfile['email'],
                    'trailing': 'arrow',
                    'onTap': () {
                      Fluttertoast.showToast(
                        msg: "Email settings coming soon",
                        toastLength: Toast.LENGTH_SHORT,
                        gravity: ToastGravity.BOTTOM,
                      );
                    },
                  },
                  {
                    'icon': 'lock',
                    'title': 'Password',
                    'subtitle': 'Change your password',
                    'trailing': 'arrow',
                    'onTap': () {
                      Fluttertoast.showToast(
                        msg: "Password change coming soon",
                        toastLength: Toast.LENGTH_SHORT,
                        gravity: ToastGravity.BOTTOM,
                      );
                    },
                  },
                  {
                    'icon': 'notifications',
                    'title': 'Notifications',
                    'subtitle': 'Manage notification preferences',
                    'trailing': 'switch',
                    'value': _notificationsEnabled,
                    'onChanged': (value) {
                      setState(() {
                        _notificationsEnabled = value;
                      });
                    },
                  },
                ],
              ),
              SizedBox(height: 2.h),
              SettingsSectionWidget(
                title: 'Subscription',
                items: [
                  {
                    'icon': 'workspace_premium',
                    'title': 'Current Plan',
                    'subtitle': '$_selectedPlan Plan',
                    'trailing': 'arrow',
                    'onTap': () {
                      Fluttertoast.showToast(
                        msg: "Upgrade feature coming soon",
                        toastLength: Toast.LENGTH_SHORT,
                        gravity: ToastGravity.BOTTOM,
                      );
                    },
                  },
                  {
                    'icon': 'receipt_long',
                    'title': 'Billing History',
                    'subtitle': 'View past invoices',
                    'trailing': 'arrow',
                    'onTap': () {
                      Fluttertoast.showToast(
                        msg: "Billing history coming soon",
                        toastLength: Toast.LENGTH_SHORT,
                        gravity: ToastGravity.BOTTOM,
                      );
                    },
                  },
                ],
              ),
              SizedBox(height: 2.h),
              SettingsSectionWidget(
                title: 'Creative Preferences',
                items: [
                  {
                    'icon': 'hd',
                    'title': 'Default Video Quality',
                    'subtitle': _selectedQuality,
                    'trailing': 'arrow',
                    'onTap': () {
                      Fluttertoast.showToast(
                        msg: "Quality settings coming soon",
                        toastLength: Toast.LENGTH_SHORT,
                        gravity: ToastGravity.BOTTOM,
                      );
                    },
                  },
                  {
                    'icon': 'auto_fix_high',
                    'title': 'AI Enhancement',
                    'subtitle': 'Automatically enhance videos',
                    'trailing': 'switch',
                    'value': _autoEnhanceEnabled,
                    'onChanged': (value) {
                      setState(() {
                        _autoEnhanceEnabled = value;
                      });
                    },
                  },
                ],
              ),
              SizedBox(height: 3.h),
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 4.w),
                child: Text(
                  'Recent Activity',
                  style: theme.textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
              SizedBox(height: 1.h),
              ActivityTimelineWidget(activities: _recentActivity),
              SizedBox(height: 3.h),
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 4.w),
                child: Text(
                  'Quick Actions',
                  style: theme.textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
              SizedBox(height: 1.h),
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 4.w),
                child: Row(
                  children: [
                    Expanded(
                      child: QuickActionButtonWidget(
                        icon: 'share',
                        label: 'Share Profile',
                        onTap: _handleShareProfile,
                      ),
                    ),
                    SizedBox(width: 3.w),
                    Expanded(
                      child: QuickActionButtonWidget(
                        icon: 'download',
                        label: 'Export Portfolio',
                        onTap: _handleExportPortfolio,
                      ),
                    ),
                  ],
                ),
              ),
              SizedBox(height: 2.h),
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 4.w),
                child: QuickActionButtonWidget(
                  icon: 'delete_forever',
                  label: 'Delete Account',
                  onTap: _handleDeleteAccount,
                  isDestructive: true,
                ),
              ),
              SizedBox(height: 10.h),
            ],
          ),
        ),
      ),
      bottomNavigationBar: CustomBottomBar(
        selectedItem: CustomBottomBarItem.profile,
        onItemSelected: (item) {},
      ),
    );
  }
}
