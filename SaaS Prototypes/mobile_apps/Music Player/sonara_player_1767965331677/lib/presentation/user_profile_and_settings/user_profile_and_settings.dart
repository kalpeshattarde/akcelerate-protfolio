import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../widgets/custom_bottom_bar.dart';
import '../../widgets/custom_icon_widget.dart';
import './widgets/profile_header_widget.dart';
import './widgets/settings_group_widget.dart';
import './widgets/statistics_section_widget.dart';
import './widgets/storage_management_widget.dart';
import './widgets/toggle_settings_widget.dart';

class UserProfileAndSettings extends StatefulWidget {
  const UserProfileAndSettings({Key? key}) : super(key: key);

  @override
  State<UserProfileAndSettings> createState() => _UserProfileAndSettingsState();
}

class _UserProfileAndSettingsState extends State<UserProfileAndSettings> {
  final ScrollController _scrollController = ScrollController();
  
  // User profile data
  final Map<String, dynamic> _userData = {
    "name": "Alex",
    "email": "alex@email.com",
    "avatar":
        "https://img.rocket.new/generatedImages/rocket_gen_img_1311bae8f-1763293463780.png",
    "avatarSemanticLabel":
        "Profile photo of a young man with short brown hair wearing a casual blue shirt",
    "listeningTime": "142 hours",
    "listeningProgress": 0.71,
    "favoriteGenres": ["Pop", "Rock", "Electronic", "Jazz"],
    "topArtists": [
      {
        "name": "The Weeknd",
        "image":
            "https://img.rocket.new/generatedImages/rocket_gen_img_12947af48-1763294452994.png",
        "semanticLabel":
            "Portrait of a male artist with short dark hair wearing a black leather jacket",
      },
      {
        "name": "Dua Lipa",
        "image":
            "https://img.rocket.new/generatedImages/rocket_gen_img_1fd7d71c6-1763297677001.png",
        "semanticLabel":
            "Portrait of a female artist with long dark hair wearing a red dress",
      },
      {
        "name": "Ed Sheeran",
        "image":
            "https://img.rocket.new/generatedImages/rocket_gen_img_1e30c8f5e-1763292997540.png",
        "semanticLabel":
            "Portrait of a male artist with ginger hair wearing a casual t-shirt",
      },
      {
        "name": "Billie Eilish",
        "image": "https://images.unsplash.com/photo-1618333278391-8a6200f393c1",
        "semanticLabel":
            "Portrait of a young female artist with blonde hair wearing a green hoodie",
      },
    ],
    "subscription": "Premium",
    "storageUsed": "2.4 GB",
    "storageTotal": "5 GB",
    "storageProgress": 0.48,
  };

  // Settings state
  bool _notificationsEnabled = true;
  bool _offlineModeEnabled = true;
  bool _socialSharingEnabled = false;
  bool _darkThemeEnabled = true;
  String _audioQuality = "High (320 kbps)";
  String _downloadQuality = "Medium (192 kbps)";

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: Colors.transparent,
      body: SafeArea(
        child: SingleChildScrollView(
          controller: _scrollController,
          physics: const AlwaysScrollableScrollPhysics(),
        child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
                const SizedBox(height: 20),
                // Header row
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'Profile',
                      style: theme.textTheme.headlineMedium?.copyWith(
                        color: theme.colorScheme.onSurface,
                        fontWeight: FontWeight.w700,
                        fontSize: 28,
                        letterSpacing: -0.5,
                      ),
                    ),
                    GestureDetector(
                      onTap: _handleEditProfile,
                      child: Container(
                        padding: const EdgeInsets.all(10),
                        decoration: BoxDecoration(
                          color: Colors.white.withValues(alpha: 0.08),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: CustomIconWidget(
                          iconName: 'settings',
                          color: theme.colorScheme.onSurface,
                          size: 22,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 28),
                // Profile card
                _buildProfileCard(theme),
                const SizedBox(height: 24),
                // Stats row
                _buildStatsRow(theme),
                const SizedBox(height: 28),
                // Settings sections
                _buildSectionTitle('Account', theme),
                const SizedBox(height: 12),
                _buildSettingsTile(
                  icon: 'workspace_premium',
                    title: 'Subscription',
                    subtitle: _userData['subscription'] as String,
                    onTap: _handleSubscription,
                  theme: theme,
                  showBadge: true,
                  badgeText: 'PRO',
                  ),
                const SizedBox(height: 10),
                _buildSettingsTile(
                  icon: 'shield',
                    title: 'Privacy',
                    subtitle: 'Manage your privacy settings',
                    onTap: _handlePrivacy,
                  theme: theme,
              ),
                const SizedBox(height: 24),
                _buildSectionTitle('Preferences', theme),
                const SizedBox(height: 12),
                _buildToggleTile(
                  icon: 'notifications_active',
                title: 'Push Notifications',
                value: _notificationsEnabled,
                  onChanged: (v) => setState(() => _notificationsEnabled = v),
                  theme: theme,
              ),
                const SizedBox(height: 10),
                _buildToggleTile(
                icon: 'cloud_download',
                title: 'Offline Mode',
                value: _offlineModeEnabled,
                  onChanged: (v) => setState(() => _offlineModeEnabled = v),
                  theme: theme,
              ),
                const SizedBox(height: 10),
                _buildToggleTile(
                icon: 'share',
                title: 'Social Sharing',
                value: _socialSharingEnabled,
                  onChanged: (v) => setState(() => _socialSharingEnabled = v),
                  theme: theme,
              ),
                const SizedBox(height: 24),
                _buildSectionTitle('Audio', theme),
                const SizedBox(height: 12),
                _buildSettingsTile(
                    icon: 'high_quality',
                    title: 'Streaming Quality',
                    subtitle: _audioQuality,
                    onTap: _handleStreamingQuality,
                  theme: theme,
                  ),
                const SizedBox(height: 10),
                _buildSettingsTile(
                  icon: 'download_for_offline',
                    title: 'Download Quality',
                    subtitle: _downloadQuality,
                    onTap: _handleDownloadQuality,
                  theme: theme,
                  ),
                const SizedBox(height: 10),
                _buildSettingsTile(
                    icon: 'equalizer',
                    title: 'Equalizer',
                    subtitle: 'Customize your sound',
                    onTap: _handleEqualizer,
                  theme: theme,
              ),
                const SizedBox(height: 24),
                // Storage card
                _buildStorageCard(theme),
                const SizedBox(height: 24),
                _buildSectionTitle('Support', theme),
                const SizedBox(height: 12),
                _buildSettingsTile(
                    icon: 'help_outline',
                    title: 'Help & FAQ',
                    onTap: _handleHelp,
                  theme: theme,
                  ),
                const SizedBox(height: 10),
                _buildSettingsTile(
                    icon: 'feedback',
                    title: 'Send Feedback',
                    onTap: _handleFeedback,
                  theme: theme,
                  ),
                const SizedBox(height: 10),
                _buildSettingsTile(
                    icon: 'info_outline',
                    title: 'About',
                    subtitle: 'Version 2.4.1',
                    onTap: _handleAbout,
                  theme: theme,
                  ),
                const SizedBox(height: 28),
              // Sign out button
                GestureDetector(
                  onTap: _handleSignOut,
                  child: Container(
                width: double.infinity,
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    decoration: BoxDecoration(
                      color: const Color(0xFFCF6679).withValues(alpha: 0.15),
                      borderRadius: BorderRadius.circular(14),
                      border: Border.all(
                        color: const Color(0xFFCF6679).withValues(alpha: 0.3),
                      ),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        CustomIconWidget(
                    iconName: 'logout',
                          color: const Color(0xFFCF6679),
                          size: 22,
                  ),
                        const SizedBox(width: 10),
                        Text(
                          'Sign Out',
                          style: theme.textTheme.titleMedium?.copyWith(
                            color: const Color(0xFFCF6679),
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 120),
            ],
          ),
        ),
      ),
      ),
    );
  }

  Widget _buildProfileCard(ThemeData theme) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            theme.colorScheme.primary.withValues(alpha: 0.2),
            theme.colorScheme.primary.withValues(alpha: 0.05),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: theme.colorScheme.primary.withValues(alpha: 0.3),
        ),
      ),
      child: Row(
        children: [
          GestureDetector(
            onTap: _handleChangePhoto,
            child: Stack(
              children: [
                Container(
                  width: 80,
                  height: 80,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: theme.colorScheme.primary,
                      width: 3,
                    ),
                  ),
                  child: ClipOval(
                    child: CustomImageWidget(
                      imageUrl: _userData['avatar'] as String,
                      width: 80,
                      height: 80,
                      fit: BoxFit.cover,
                      semanticLabel: _userData['avatarSemanticLabel'] as String,
                    ),
                  ),
                ),
                Positioned(
                  bottom: 0,
                  right: 0,
                  child: Container(
                    padding: const EdgeInsets.all(6),
                    decoration: BoxDecoration(
                      color: theme.colorScheme.primary,
                      shape: BoxShape.circle,
                    ),
                    child: CustomIconWidget(
                      iconName: 'camera_alt',
                      color: const Color(0xFF1A1F16),
                      size: 14,
                    ),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(width: 20),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  _userData['name'] as String,
                  style: theme.textTheme.headlineSmall?.copyWith(
                    color: theme.colorScheme.onSurface,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  _userData['email'] as String,
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: theme.colorScheme.onSurfaceVariant,
                  ),
                ),
                const SizedBox(height: 12),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(
                    color: theme.colorScheme.primary.withValues(alpha: 0.2),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      CustomIconWidget(
                        iconName: 'workspace_premium',
                        color: theme.colorScheme.primary,
                        size: 16,
                      ),
                      const SizedBox(width: 6),
                      Text(
                        _userData['subscription'] as String,
                        style: theme.textTheme.bodySmall?.copyWith(
                          color: theme.colorScheme.primary,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStatsRow(ThemeData theme) {
    return Row(
      children: [
        Expanded(
          child: _buildStatCard(
            icon: 'headphones',
            value: _userData['listeningTime'] as String,
            label: 'Listening Time',
            theme: theme,
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: _buildStatCard(
            icon: 'library_music',
            value: '${(_userData['favoriteGenres'] as List).length}',
            label: 'Genres',
            theme: theme,
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: _buildStatCard(
            icon: 'people',
            value: '${(_userData['topArtists'] as List).length}',
            label: 'Top Artists',
            theme: theme,
          ),
        ),
      ],
    );
  }

  Widget _buildStatCard({
    required String icon,
    required String value,
    required String label,
    required ThemeData theme,
  }) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 12),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.05),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: Colors.white.withValues(alpha: 0.08),
        ),
      ),
      child: Column(
        children: [
          CustomIconWidget(
            iconName: icon,
            color: theme.colorScheme.primary,
            size: 24,
          ),
          const SizedBox(height: 8),
          Text(
            value,
            style: theme.textTheme.titleMedium?.copyWith(
              color: theme.colorScheme.onSurface,
              fontWeight: FontWeight.w700,
            ),
          ),
          const SizedBox(height: 2),
          Text(
            label,
            style: theme.textTheme.bodySmall?.copyWith(
              color: theme.colorScheme.onSurfaceVariant,
              fontSize: 11,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  Widget _buildSectionTitle(String title, ThemeData theme) {
    return Text(
      title,
      style: theme.textTheme.titleMedium?.copyWith(
        color: theme.colorScheme.onSurfaceVariant,
        fontWeight: FontWeight.w600,
        fontSize: 14,
        letterSpacing: 0.5,
      ),
    );
  }

  Widget _buildSettingsTile({
    required String icon,
    required String title,
    String? subtitle,
    required VoidCallback onTap,
    required ThemeData theme,
    bool showBadge = false,
    String? badgeText,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white.withValues(alpha: 0.05),
          borderRadius: BorderRadius.circular(14),
          border: Border.all(
            color: Colors.white.withValues(alpha: 0.08),
          ),
        ),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: theme.colorScheme.primary.withValues(alpha: 0.15),
                borderRadius: BorderRadius.circular(10),
              ),
              child: CustomIconWidget(
                iconName: icon,
                color: theme.colorScheme.primary,
                size: 20,
              ),
            ),
            const SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Text(
                        title,
                        style: theme.textTheme.bodyLarge?.copyWith(
                          color: theme.colorScheme.onSurface,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                      if (showBadge && badgeText != null) ...[
                        const SizedBox(width: 8),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                          decoration: BoxDecoration(
                            color: theme.colorScheme.primary,
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Text(
                            badgeText,
                            style: theme.textTheme.labelSmall?.copyWith(
                              color: const Color(0xFF1A1F16),
                              fontWeight: FontWeight.w700,
                              fontSize: 10,
                            ),
                          ),
                        ),
                      ],
                    ],
                  ),
                  if (subtitle != null) ...[
                    const SizedBox(height: 2),
                    Text(
                      subtitle,
                      style: theme.textTheme.bodySmall?.copyWith(
                        color: theme.colorScheme.onSurfaceVariant,
                      ),
                    ),
                  ],
                ],
              ),
            ),
            CustomIconWidget(
              iconName: 'chevron_right',
              color: theme.colorScheme.onSurfaceVariant,
              size: 20,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildToggleTile({
    required String icon,
    required String title,
    required bool value,
    required ValueChanged<bool> onChanged,
    required ThemeData theme,
  }) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.05),
        borderRadius: BorderRadius.circular(14),
        border: Border.all(
          color: Colors.white.withValues(alpha: 0.08),
        ),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: theme.colorScheme.primary.withValues(alpha: 0.15),
              borderRadius: BorderRadius.circular(10),
            ),
            child: CustomIconWidget(
              iconName: icon,
              color: theme.colorScheme.primary,
              size: 20,
            ),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Text(
              title,
              style: theme.textTheme.bodyLarge?.copyWith(
                color: theme.colorScheme.onSurface,
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
          Switch(
            value: value,
            onChanged: onChanged,
            activeColor: theme.colorScheme.primary,
            activeTrackColor: theme.colorScheme.primary.withValues(alpha: 0.3),
            inactiveThumbColor: Colors.white.withValues(alpha: 0.5),
            inactiveTrackColor: Colors.white.withValues(alpha: 0.1),
          ),
        ],
      ),
    );
  }

  Widget _buildStorageCard(ThemeData theme) {
    final progress = _userData['storageProgress'] as double;
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.05),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: Colors.white.withValues(alpha: 0.08),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: theme.colorScheme.primary.withValues(alpha: 0.15),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: CustomIconWidget(
                      iconName: 'storage',
                      color: theme.colorScheme.primary,
                      size: 20,
                    ),
                  ),
                  const SizedBox(width: 12),
                  Text(
                    'Storage',
                    style: theme.textTheme.titleMedium?.copyWith(
                      color: theme.colorScheme.onSurface,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
              GestureDetector(
                onTap: _handleClearCache,
                child: Text(
                  'Clear Cache',
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: theme.colorScheme.primary,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          ClipRRect(
            borderRadius: BorderRadius.circular(4),
            child: LinearProgressIndicator(
              value: progress,
              backgroundColor: Colors.white.withValues(alpha: 0.1),
              valueColor: AlwaysStoppedAnimation<Color>(
                progress > 0.8 ? const Color(0xFFCF6679) : theme.colorScheme.primary,
              ),
              minHeight: 8,
            ),
          ),
          const SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                '${_userData['storageUsed']} used',
                style: theme.textTheme.bodyMedium?.copyWith(
                  color: theme.colorScheme.onSurfaceVariant,
                ),
              ),
              Text(
                '${_userData['storageTotal']} total',
                style: theme.textTheme.bodyMedium?.copyWith(
                  color: theme.colorScheme.onSurfaceVariant,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  void _handleEditProfile() {
    showDialog(
      context: context,
      builder: (context) => _buildEditProfileDialog(),
    );
  }

  void _handleChangePhoto() {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (context) => _buildPhotoOptionsSheet(),
    );
  }

  void _handleSubscription() {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Opening subscription management...'),
        duration: const Duration(seconds: 2),
      ),
    );
  }

  void _handlePrivacy() {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Opening privacy settings...'),
        duration: const Duration(seconds: 2),
      ),
    );
  }

  void _handleStreamingQuality() {
    showDialog(
      context: context,
      builder: (context) => _buildQualityDialog(
        title: 'Streaming Quality',
        currentQuality: _audioQuality,
        onSelected: (quality) {
          setState(() => _audioQuality = quality);
        },
      ),
    );
  }

  void _handleDownloadQuality() {
    showDialog(
      context: context,
      builder: (context) => _buildQualityDialog(
        title: 'Download Quality',
        currentQuality: _downloadQuality,
        onSelected: (quality) {
          setState(() => _downloadQuality = quality);
        },
      ),
    );
  }

  void _handleEqualizer() {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Opening equalizer settings...'),
        duration: const Duration(seconds: 2),
      ),
    );
  }

  void _handleClearCache() {
    showDialog(
      context: context,
      builder: (context) => _buildClearCacheDialog(),
    );
  }

  void _handleLanguage() {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Opening language settings...'),
        duration: const Duration(seconds: 2),
      ),
    );
  }

  void _showThemePreview() {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          _darkThemeEnabled
              ? 'Dark theme active'
              : 'Light theme preview available',
        ),
        duration: const Duration(seconds: 2),
      ),
    );
  }

  void _handleHelp() {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Opening help center...'),
        duration: const Duration(seconds: 2),
      ),
    );
  }

  void _handleFeedback() {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Opening feedback form...'),
        duration: const Duration(seconds: 2),
      ),
    );
  }

  void _handleAbout() {
    showDialog(context: context, builder: (context) => _buildAboutDialog());
  }

  void _handleSignOut() {
    showDialog(context: context, builder: (context) => _buildSignOutDialog());
  }

  Widget _buildEditProfileDialog() {
    final theme = Theme.of(context);
    final nameController = TextEditingController(
      text: _userData['name'] as String,
    );
    final emailController = TextEditingController(
      text: _userData['email'] as String,
    );

    return AlertDialog(
      title: Text('Edit Profile'),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          TextField(
            controller: nameController,
            decoration: InputDecoration(
              labelText: 'Name',
              prefixIcon: Icon(Icons.person),
            ),
          ),
          SizedBox(height: 2.h),
          TextField(
            controller: emailController,
            decoration: InputDecoration(
              labelText: 'Email',
              prefixIcon: Icon(Icons.email),
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
            setState(() {
              _userData['name'] = nameController.text;
              _userData['email'] = emailController.text;
            });
            Navigator.pop(context);
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(content: Text('Profile updated successfully')),
            );
          },
          child: Text('Save'),
        ),
      ],
    );
  }

  Widget _buildPhotoOptionsSheet() {
    final theme = Theme.of(context);

    return Container(
      padding: EdgeInsets.all(4.w),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 12.w,
            height: 0.5.h,
            decoration: BoxDecoration(
              color: theme.colorScheme.outline,
              borderRadius: BorderRadius.circular(4),
            ),
          ),
          SizedBox(height: 2.h),
          Text('Change Profile Photo', style: theme.textTheme.titleLarge),
          SizedBox(height: 2.h),
          ListTile(
            leading: CustomIconWidget(
              iconName: 'camera_alt',
              color: theme.colorScheme.primary,
              size: 6.w,
            ),
            title: Text('Take Photo'),
            onTap: () {
              Navigator.pop(context);
              ScaffoldMessenger.of(
                context,
              ).showSnackBar(SnackBar(content: Text('Opening camera...')));
            },
          ),
          ListTile(
            leading: CustomIconWidget(
              iconName: 'photo_library',
              color: theme.colorScheme.primary,
              size: 6.w,
            ),
            title: Text('Choose from Gallery'),
            onTap: () {
              Navigator.pop(context);
              ScaffoldMessenger.of(
                context,
              ).showSnackBar(SnackBar(content: Text('Opening gallery...')));
            },
          ),
          ListTile(
            leading: CustomIconWidget(
              iconName: 'delete',
              color: Colors.red,
              size: 6.w,
            ),
            title: Text('Remove Photo', style: TextStyle(color: Colors.red)),
            onTap: () {
              Navigator.pop(context);
              ScaffoldMessenger.of(
                context,
              ).showSnackBar(SnackBar(content: Text('Photo removed')));
            },
          ),
          SizedBox(height: 2.h),
        ],
      ),
    );
  }

  Widget _buildQualityDialog({
    required String title,
    required String currentQuality,
    required Function(String) onSelected,
  }) {
    final qualities = [
      'Low (96 kbps)',
      'Medium (192 kbps)',
      'High (320 kbps)',
      'Lossless (FLAC)',
    ];

    return AlertDialog(
      title: Text(title),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        children: qualities.map((quality) {
          final isSelected = quality == currentQuality;
          return RadioListTile<String>(
            title: Text(quality),
            value: quality,
            groupValue: currentQuality,
            activeColor: Theme.of(context).colorScheme.primary,
            onChanged: (value) {
              if (value != null) {
                onSelected(value);
                Navigator.pop(context);
              }
            },
          );
        }).toList(),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(context),
          child: Text('Cancel'),
        ),
      ],
    );
  }

  Widget _buildClearCacheDialog() {
    return AlertDialog(
      title: Text('Clear Cache'),
      content: Text(
        'This will remove all downloaded music and cached data. You can re-download your music later.',
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(context),
          child: Text('Cancel'),
        ),
        ElevatedButton(
          onPressed: () {
            Navigator.pop(context);
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(content: Text('Cache cleared successfully')),
            );
          },
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.red,
            foregroundColor: Colors.white,
          ),
          child: Text('Clear'),
        ),
      ],
    );
  }

  Widget _buildAboutDialog() {
    final theme = Theme.of(context);

    return AlertDialog(
      title: Text('About Melodic Player'),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Center(
            child: Text(
              'SONORA',
              style: theme.textTheme.headlineMedium?.copyWith(
                color: theme.colorScheme.primary,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
          SizedBox(height: 1.h),
          Center(
            child: Text(
              'Version 2.4.1',
              style: theme.textTheme.bodyMedium?.copyWith(
                color: theme.colorScheme.onSurfaceVariant,
              ),
            ),
          ),
          SizedBox(height: 2.h),
          Text(
            'Your personal music streaming companion with mood-based playlists and artist discovery.',
            style: theme.textTheme.bodyMedium,
            textAlign: TextAlign.center,
          ),
          SizedBox(height: 2.h),
          Text(
            '© 2026 Melodic Player. All rights reserved.',
            style: theme.textTheme.bodySmall?.copyWith(
              color: theme.colorScheme.onSurfaceVariant,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(context),
          child: Text('Close'),
        ),
      ],
    );
  }

  Widget _buildSignOutDialog() {
    return AlertDialog(
      title: Text('Sign Out'),
      content: Text('Are you sure you want to sign out?'),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(context),
          child: Text('Cancel'),
        ),
        ElevatedButton(
          onPressed: () {
            Navigator.pop(context);
            Navigator.pushReplacementNamed(context, '/login-screen');
          },
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.red,
            foregroundColor: Colors.white,
          ),
          child: Text('Sign Out'),
        ),
      ],
    );
  }
}
