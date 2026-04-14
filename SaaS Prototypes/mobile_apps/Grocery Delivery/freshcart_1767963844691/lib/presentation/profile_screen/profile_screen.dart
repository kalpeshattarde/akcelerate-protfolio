import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/loyalty_rewards_widget.dart';
import './widgets/profile_header_widget.dart';
import './widgets/settings_section_widget.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen>
    with TickerProviderStateMixin {
  late TabController _tabController;
  bool _isLoading = false;

  // Mock user data
  final Map<String, dynamic> userData = {
    "id": 1,
    "name": "Sarah Johnson",
    "email": "sarah.johnson@email.com",
    "phone": "+1 (555) 123-4567",
    "avatar": "https://images.unsplash.com/photo-1727784892015-4f4b8d67a083",
    "avatarSemanticLabel":
        "Professional headshot of a woman with shoulder-length brown hair wearing a white blazer against a neutral background",
    "membershipTier": "Gold Member",
    "totalOrders": 47,
    "loyaltyPoints": 2840,
    "totalSaved": 156.50,
    "isPhoneVerified": true,
    "isEmailVerified": true,
    "joinDate": "March 2023",
  };

  // Mock rewards data
  final Map<String, dynamic> rewardsData = {
    "currentPoints": 2840,
    "nextTierPoints": 5000,
    "nextTier": "Platinum",
    "freeDeliveries": 3,
    "cashbackRate": 5,
  };

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      body: NestedScrollView(
        headerSliverBuilder: (BuildContext context, bool innerBoxIsScrolled) {
          return <Widget>[
            SliverOverlapAbsorber(
              handle: NestedScrollView.sliverOverlapAbsorberHandleFor(context),
              sliver: SliverAppBar(
                leading: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: CustomImageWidget(
                    imageUrl: 'assets/images/image-1761892441301.png',
                    width: 40,
                    height: 40,
                    fit: BoxFit.contain,
                    semanticLabel:
                        'FreshCart App Logo - Black line-art icon of a grocery bag filled with fresh produce',
                  ),
                ),
                automaticallyImplyLeading: false,
                title: null,
                pinned: true,
                floating: false,
                snap: false,
                elevation: 0,
                backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
                foregroundColor: AppTheme.lightTheme.colorScheme.onSurface,
                surfaceTintColor: Colors.transparent,
                scrolledUnderElevation: 2,
                shadowColor: AppTheme.lightTheme.colorScheme.shadow
                    .withValues(alpha: 0.1),
                actions: [
                  IconButton(
                    icon: const Icon(Icons.settings_outlined),
                    onPressed: () {
                      // Navigate to settings
                    },
                    tooltip: 'Settings',
                  ),
                ],
              ),
            ),
          ];
        },
        body: _buildMainContent(),
      ),
    );
  }

  Widget _buildMainContent() {
    return Builder(
      builder: (BuildContext context) {
        return CustomScrollView(
          slivers: [
            SliverOverlapInjector(
              handle: NestedScrollView.sliverOverlapAbsorberHandleFor(context),
            ),
            SliverToBoxAdapter(
              child: Column(
                children: [
                  _buildProfileTab(),
                  _buildSettingsTab(),
                ],
              ),
            ),
            SliverToBoxAdapter(
              child: SizedBox(height: 10.h),
            ),
          ],
        );
      },
    );
  }

  Widget _buildLoadingState() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          CircularProgressIndicator(
            color: AppTheme.lightTheme.colorScheme.primary,
          ),
          SizedBox(height: 2.h),
          Text(
            'Loading profile...',
            style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildProfileTab() {
    return SingleChildScrollView(
      padding: EdgeInsets.all(4.w),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ProfileHeaderWidget(
            userData: userData,
            onEditPressed: _editProfile,
          ),
          SizedBox(height: 3.h),
          LoyaltyRewardsWidget(
            rewardsData: rewardsData,
            onViewAllPressed: _viewAllRewards,
          ),
          SettingsSectionWidget(
            title: 'Quick Actions',
            items: _getQuickActionItems(),
          ),
          SettingsSectionWidget(
            title: 'Account Information',
            items: _getAccountItems(),
          ),
        ],
      ),
    );
  }

  Widget _buildSettingsTab() {
    return SingleChildScrollView(
      padding: EdgeInsets.all(4.w),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SettingsSectionWidget(
            title: 'Delivery & Addresses',
            items: _getDeliveryItems(),
          ),
          SettingsSectionWidget(
            title: 'Payment & Billing',
            items: _getPaymentItems(),
          ),
          SettingsSectionWidget(
            title: 'App Preferences',
            items: _getPreferenceItems(),
          ),
          SettingsSectionWidget(
            title: 'Help & Support',
            items: _getHelpItems(),
          ),
          SizedBox(height: 2.h),
          _buildSignOutButton(),
          SizedBox(height: 4.h),
        ],
      ),
    );
  }

  List<Map<String, dynamic>> _getQuickActionItems() {
    return [
      {
        "icon": "history",
        "iconColor": AppTheme.lightTheme.colorScheme.primary,
        "title": "Order History",
        "subtitle": "View past orders and reorder",
        "route": "/order-history-screen",
      },
      {
        "icon": "shopping_cart",
        "iconColor": AppTheme.lightTheme.colorScheme.secondary,
        "title": "Shopping Cart",
        "subtitle": "Continue your shopping",
        "route": "/shopping-cart-screen",
      },
      {
        "icon": "favorite",
        "iconColor": AppTheme.lightTheme.colorScheme.error,
        "title": "Wishlist",
        "subtitle": "Saved items for later",
        "route": null,
      },
    ];
  }

  List<Map<String, dynamic>> _getAccountItems() {
    return [
      {
        "icon": "person",
        "iconColor": AppTheme.lightTheme.colorScheme.primary,
        "title": "Personal Information",
        "subtitle": "Name, email, phone number",
        "route": null,
      },
      {
        "icon": "security",
        "iconColor": AppTheme.lightTheme.colorScheme.secondary,
        "title": "Privacy & Security",
        "subtitle": "Password, biometric settings",
        "route": null,
        "trailing": Container(
          padding: EdgeInsets.symmetric(horizontal: 2.w, vertical: 0.5.h),
          decoration: BoxDecoration(
            color: AppTheme.lightTheme.colorScheme.secondary
                .withValues(alpha: 0.1),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Text(
            'Verified',
            style: AppTheme.lightTheme.textTheme.labelSmall?.copyWith(
              color: AppTheme.lightTheme.colorScheme.secondary,
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
      },
      {
        "icon": "notifications",
        "iconColor": AppTheme.lightTheme.colorScheme.tertiary,
        "title": "Notification Preferences",
        "subtitle": "Order updates, promotions",
        "route": null,
      },
    ];
  }

  List<Map<String, dynamic>> _getDeliveryItems() {
    return [
      {
        "icon": "location_on",
        "iconColor": AppTheme.lightTheme.colorScheme.primary,
        "title": "Delivery Addresses",
        "subtitle": "Manage your delivery locations",
        "route": null,
      },
      {
        "icon": "schedule",
        "iconColor": AppTheme.lightTheme.colorScheme.secondary,
        "title": "Delivery Preferences",
        "subtitle": "Time slots, special instructions",
        "route": null,
      },
    ];
  }

  List<Map<String, dynamic>> _getPaymentItems() {
    return [
      {
        "icon": "payment",
        "iconColor": AppTheme.lightTheme.colorScheme.primary,
        "title": "Payment Methods",
        "subtitle": "Cards, digital wallets",
        "route": null,
      },
      {
        "icon": "receipt_long",
        "iconColor": AppTheme.lightTheme.colorScheme.secondary,
        "title": "Billing History",
        "subtitle": "Invoices and receipts",
        "route": null,
      },
      {
        "icon": "local_offer",
        "iconColor": AppTheme.lightTheme.colorScheme.tertiary,
        "title": "Promo Codes",
        "subtitle": "Active and expired codes",
        "route": null,
      },
    ];
  }

  List<Map<String, dynamic>> _getPreferenceItems() {
    return [
      {
        "icon": "language",
        "iconColor": AppTheme.lightTheme.colorScheme.primary,
        "title": "Language",
        "subtitle": "English (US)",
        "route": null,
      },
      {
        "icon": "restaurant",
        "iconColor": AppTheme.lightTheme.colorScheme.secondary,
        "title": "Dietary Restrictions",
        "subtitle": "Allergies, preferences",
        "route": null,
      },
      {
        "icon": "dark_mode",
        "iconColor": AppTheme.lightTheme.colorScheme.onSurfaceVariant,
        "title": "App Theme",
        "subtitle": "Light mode",
        "route": null,
        "trailing": Switch(
          value: false,
          onChanged: _toggleTheme,
          activeColor: AppTheme.lightTheme.colorScheme.primary,
        ),
      },
    ];
  }

  List<Map<String, dynamic>> _getHelpItems() {
    return [
      {
        "icon": "help",
        "iconColor": AppTheme.lightTheme.colorScheme.primary,
        "title": "Help Center",
        "subtitle": "FAQs and support articles",
        "route": null,
      },
      {
        "icon": "chat",
        "iconColor": AppTheme.lightTheme.colorScheme.secondary,
        "title": "Live Chat",
        "subtitle": "Get instant help",
        "route": null,
      },
      {
        "icon": "feedback",
        "iconColor": AppTheme.lightTheme.colorScheme.tertiary,
        "title": "Send Feedback",
        "subtitle": "Help us improve the app",
        "route": null,
      },
      {
        "icon": "info",
        "iconColor": AppTheme.lightTheme.colorScheme.onSurfaceVariant,
        "title": "About FreshCart",
        "subtitle": "Version 2.1.0",
        "route": null,
      },
    ];
  }

  Widget _buildSignOutButton() {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color:
                AppTheme.lightTheme.colorScheme.shadow.withValues(alpha: 0.1),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: InkWell(
        onTap: _signOut,
        borderRadius: BorderRadius.circular(12),
        child: Container(
          padding: EdgeInsets.symmetric(vertical: 2.h),
          decoration: BoxDecoration(
            color: AppTheme.lightTheme.colorScheme.error.withValues(alpha: 0.1),
            borderRadius: BorderRadius.circular(12),
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
              Text(
                'Sign Out',
                style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                  color: AppTheme.lightTheme.colorScheme.error,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _editProfile() {
    HapticFeedback.lightImpact();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: const Text('Edit profile feature coming soon!'),
        backgroundColor: AppTheme.lightTheme.colorScheme.primary,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
      ),
    );
  }

  void _viewAllRewards() {
    HapticFeedback.lightImpact();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: const Text('Rewards center coming soon!'),
        backgroundColor: AppTheme.lightTheme.colorScheme.secondary,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
      ),
    );
  }

  void _toggleTheme(bool value) {
    HapticFeedback.lightImpact();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(value ? 'Dark theme enabled' : 'Light theme enabled'),
        backgroundColor: AppTheme.lightTheme.colorScheme.primary,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
      ),
    );
  }

  void _showSettingsMenu() {
    HapticFeedback.lightImpact();
    showModalBottomSheet(
      context: context,
      backgroundColor: AppTheme.lightTheme.colorScheme.surface,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => Container(
        padding: EdgeInsets.all(4.w),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 12.w,
              height: 0.5.h,
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.colorScheme.outline
                    .withValues(alpha: 0.3),
                borderRadius: BorderRadius.circular(4),
              ),
            ),
            SizedBox(height: 3.h),
            ListTile(
              leading: CustomIconWidget(
                iconName: 'share',
                color: AppTheme.lightTheme.colorScheme.primary,
                size: 6.w,
              ),
              title: const Text('Share Profile'),
              onTap: () {
                Navigator.pop(context);
                _shareProfile();
              },
            ),
            ListTile(
              leading: CustomIconWidget(
                iconName: 'download',
                color: AppTheme.lightTheme.colorScheme.secondary,
                size: 6.w,
              ),
              title: const Text('Export Data'),
              onTap: () {
                Navigator.pop(context);
                _exportData();
              },
            ),
            SizedBox(height: 2.h),
          ],
        ),
      ),
    );
  }

  void _shareProfile() {
    HapticFeedback.lightImpact();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: const Text('Profile sharing feature coming soon!'),
        backgroundColor: AppTheme.lightTheme.colorScheme.primary,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
      ),
    );
  }

  void _exportData() {
    HapticFeedback.lightImpact();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: const Text('Data export feature coming soon!'),
        backgroundColor: AppTheme.lightTheme.colorScheme.secondary,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
      ),
    );
  }

  void _signOut() {
    HapticFeedback.lightImpact();
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: AppTheme.lightTheme.colorScheme.surface,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
        ),
        title: Text(
          'Sign Out',
          style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
            fontWeight: FontWeight.w700,
          ),
        ),
        content: Text(
          'Are you sure you want to sign out of your account?',
          style: AppTheme.lightTheme.textTheme.bodyMedium,
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text(
              'Cancel',
              style: AppTheme.lightTheme.textTheme.labelLarge?.copyWith(
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
            child: const Text('Sign Out'),
          ),
        ],
      ),
    );
  }
}
