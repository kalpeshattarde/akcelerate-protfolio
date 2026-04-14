import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../widgets/custom_bottom_bar.dart';
import './widgets/category_tabs_widget.dart';
import './widgets/effect_card_widget.dart';
import './widgets/effect_preview_modal_widget.dart';
import './widgets/search_header_widget.dart';

/// Effects Library Screen - Showcases AI-powered video effects
/// Implements glassmorphism design with organized categories
class EffectsLibraryScreen extends StatefulWidget {
  const EffectsLibraryScreen({super.key});

  @override
  State<EffectsLibraryScreen> createState() => _EffectsLibraryScreenState();
}

class _EffectsLibraryScreenState extends State<EffectsLibraryScreen>
    with SingleTickerProviderStateMixin {
  // Selected category for filtering
  String _selectedCategory = 'All';

  // Search query
  String _searchQuery = '';

  // Loading state for pull-to-refresh
  bool _isRefreshing = false;

  // Selected effect for preview
  Map<String, dynamic>? _selectedEffect;

  // Mock effects data
  final List<Map<String, dynamic>> _allEffects = [
    {
      "id": 1,
      "name": "Cinematic Glow",
      "category": "Cinematic",
      "isPremium": false,
      "thumbnail":
          "https://images.unsplash.com/photo-1505372475100-8c851505877e",
      "semanticLabel":
          "Cinematic effect showing warm golden glow with lens flare on dark background",
      "description":
          "Add professional cinematic glow with warm tones and subtle lens flares",
      "isFavorite": false,
      "lastUsed": DateTime.now().subtract(const Duration(hours: 2)),
    },
    {
      "id": 2,
      "name": "Neon Dreams",
      "category": "Animation",
      "isPremium": true,
      "thumbnail":
          "https://images.unsplash.com/photo-1617751218806-9077a9093d8b",
      "semanticLabel":
          "Vibrant neon lights effect with purple and pink glowing lines on dark background",
      "description":
          "Transform your video with vibrant neon light trails and glowing effects",
      "isFavorite": true,
      "lastUsed": DateTime.now().subtract(const Duration(minutes: 30)),
    },
    {
      "id": 3,
      "name": "Film Grain",
      "category": "Cinematic",
      "isPremium": false,
      "thumbnail":
          "https://images.unsplash.com/photo-1650077259478-178094a42075",
      "semanticLabel":
          "Vintage film grain texture effect showing grainy overlay on movie scene",
      "description":
          "Add authentic film grain texture for vintage cinematic look",
      "isFavorite": false,
      "lastUsed": DateTime.now().subtract(const Duration(days: 1)),
    },
    {
      "id": 4,
      "name": "Color Pop",
      "category": "Color Grading",
      "isPremium": false,
      "thumbnail":
          "https://img.rocket.new/generatedImages/rocket_gen_img_1adf5f86d-1764655704801.png",
      "semanticLabel":
          "Color grading effect showing vibrant saturated colors with high contrast",
      "description":
          "Enhance colors with vibrant saturation and dynamic contrast",
      "isFavorite": true,
      "lastUsed": DateTime.now().subtract(const Duration(hours: 5)),
    },
    {
      "id": 5,
      "name": "Smooth Fade",
      "category": "Transitions",
      "isPremium": false,
      "thumbnail":
          "https://img.rocket.new/generatedImages/rocket_gen_img_154a1ae3d-1766470409730.png",
      "semanticLabel":
          "Smooth transition effect showing gradual fade between two scenes",
      "description": "Professional smooth fade transition between scenes",
      "isFavorite": false,
      "lastUsed": DateTime.now().subtract(const Duration(hours: 8)),
    },
    {
      "id": 6,
      "name": "Light Leaks",
      "category": "Cinematic",
      "isPremium": true,
      "thumbnail":
          "https://images.unsplash.com/photo-1621886169522-6276dd723703",
      "semanticLabel":
          "Light leak effect with warm orange and yellow light streaks across frame",
      "description": "Add dreamy light leaks for artistic cinematic feel",
      "isFavorite": true,
      "lastUsed": DateTime.now().subtract(const Duration(minutes: 15)),
    },
    {
      "id": 7,
      "name": "Particle Burst",
      "category": "Animation",
      "isPremium": true,
      "thumbnail":
          "https://images.unsplash.com/photo-1732881280874-35282593b39a",
      "semanticLabel":
          "Particle burst animation with glowing white particles exploding outward",
      "description":
          "Dynamic particle burst animation with customizable colors",
      "isFavorite": false,
      "lastUsed": DateTime.now().subtract(const Duration(days: 2)),
    },
    {
      "id": 8,
      "name": "Vintage Tone",
      "category": "Color Grading",
      "isPremium": false,
      "thumbnail":
          "https://images.unsplash.com/photo-1635070042598-c5b98eb14d09",
      "semanticLabel":
          "Vintage color grading with warm sepia tones and faded colors",
      "description": "Classic vintage color grading with warm sepia tones",
      "isFavorite": false,
      "lastUsed": DateTime.now().subtract(const Duration(hours: 12)),
    },
    {
      "id": 9,
      "name": "Glitch Effect",
      "category": "Animation",
      "isPremium": true,
      "thumbnail":
          "https://img.rocket.new/generatedImages/rocket_gen_img_1c333512e-1766470409313.png",
      "semanticLabel":
          "Digital glitch effect with RGB color separation and distortion",
      "description": "Modern digital glitch with RGB separation and distortion",
      "isFavorite": true,
      "lastUsed": DateTime.now().subtract(const Duration(hours: 1)),
    },
    {
      "id": 10,
      "name": "Zoom Blur",
      "category": "Transitions",
      "isPremium": false,
      "thumbnail":
          "https://images.unsplash.com/photo-1711188377754-07a980089822",
      "semanticLabel":
          "Zoom blur transition effect with radial motion blur from center",
      "description": "Dynamic zoom blur transition for dramatic scene changes",
      "isFavorite": false,
      "lastUsed": DateTime.now().subtract(const Duration(days: 3)),
    },
    {
      "id": 11,
      "name": "Bokeh Blur",
      "category": "Cinematic",
      "isPremium": true,
      "thumbnail":
          "https://images.unsplash.com/photo-1734178822766-ede4d58960f8",
      "semanticLabel":
          "Bokeh blur effect with circular light orbs on blurred background",
      "description": "Professional bokeh blur with circular light orbs",
      "isFavorite": false,
      "lastUsed": DateTime.now().subtract(const Duration(hours: 6)),
    },
    {
      "id": 12,
      "name": "Cyberpunk",
      "category": "Color Grading",
      "isPremium": true,
      "thumbnail":
          "https://img.rocket.new/generatedImages/rocket_gen_img_1cd75392f-1764676817351.png",
      "semanticLabel":
          "Cyberpunk color grading with neon blue and magenta tones",
      "description": "Futuristic cyberpunk color grading with neon tones",
      "isFavorite": true,
      "lastUsed": DateTime.now().subtract(const Duration(minutes: 45)),
    },
  ];

  // Categories for filtering
  final List<String> _categories = [
    'All',
    'Cinematic',
    'Animation',
    'Color Grading',
    'Transitions',
  ];

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        flexibleSpace: Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [
                theme.colorScheme.surface.withValues(alpha: 0.95),
                theme.colorScheme.surface.withValues(alpha: 0.85),
              ],
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
            ),
          ),
        ),
        centerTitle: true,
        leading: IconButton(
          icon: CustomIconWidget(
            iconName: 'arrow_back',
            color: theme.colorScheme.primary,
            size: 24,
          ),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
        title: Text(
          'Effects Library',
          style: theme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w600,
            color: theme.colorScheme.onSurface,
          ),
        ),
      ),
      body: Column(
        children: [
          // Search header with filter and close
          SearchHeaderWidget(
            searchQuery: _searchQuery,
            onSearchChanged: (query) {
              setState(() {
                _searchQuery = query;
              });
            },
            onFilterTap: _showFilterOptions,
            onCloseTap: () => Navigator.pop(context),
          ),

          // Category tabs
          CategoryTabsWidget(
            categories: _categories,
            selectedCategory: _selectedCategory,
            onCategorySelected: (category) {
              setState(() {
                _selectedCategory = category;
              });
            },
          ),

          // Recently used section (only show if there are recently used effects)
          if (_getRecentlyUsedEffects().isNotEmpty) ...[
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
              child: Row(
                children: [
                  CustomIconWidget(
                    iconName: 'history',
                    size: 20,
                    color: theme.colorScheme.primary,
                  ),
                  SizedBox(width: 2.w),
                  Text(
                    'Recently Used',
                    style: theme.textTheme.titleMedium?.copyWith(
                      color: theme.colorScheme.onSurface,
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(
              height: 12.h,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                padding: EdgeInsets.symmetric(horizontal: 4.w),
                itemCount: _getRecentlyUsedEffects().length,
                separatorBuilder: (context, index) => SizedBox(width: 3.w),
                itemBuilder: (context, index) {
                  final effect = _getRecentlyUsedEffects()[index];
                  return _buildRecentEffectCard(effect, theme);
                },
              ),
            ),
          ],

          // Effects grid
          Expanded(
            child: RefreshIndicator(
              onRefresh: _handleRefresh,
              color: theme.colorScheme.primary,
              child: _buildEffectsGrid(theme),
            ),
          ),
        ],
      ),
      bottomNavigationBar: CustomBottomBar(
        selectedItem: CustomBottomBarItem.search,
        onItemSelected: (item) {
          // Navigation handled by CustomBottomBar
        },
      ),
    );
  }

  Widget _buildEffectsGrid(ThemeData theme) {
    final filteredEffects = _getFilteredEffects();

    if (filteredEffects.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CustomIconWidget(
              iconName: 'search_off',
              size: 64,
              color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.5),
            ),
            SizedBox(height: 2.h),
            Text(
              'No effects found',
              style: theme.textTheme.titleMedium?.copyWith(
                color: theme.colorScheme.onSurfaceVariant,
              ),
            ),
            SizedBox(height: 1.h),
            Text(
              'Try adjusting your filters',
              style: theme.textTheme.bodyMedium?.copyWith(
                color: theme.colorScheme.onSurfaceVariant.withValues(
                  alpha: 0.7,
                ),
              ),
            ),
          ],
        ),
      );
    }

    return GridView.builder(
      padding: EdgeInsets.all(4.w),
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        crossAxisSpacing: 3.w,
        mainAxisSpacing: 3.w,
        childAspectRatio: 0.75,
      ),
      itemCount: filteredEffects.length,
      itemBuilder: (context, index) {
        final effect = filteredEffects[index];
        return EffectCardWidget(
          effect: effect,
          onTap: () => _showEffectPreview(effect),
          onLongPress: () => _showQuickActions(effect),
          onFavoriteToggle: () => _toggleFavorite(effect),
        );
      },
    );
  }

  Widget _buildRecentEffectCard(Map<String, dynamic> effect, ThemeData theme) {
    return GestureDetector(
      onTap: () => _showEffectPreview(effect),
      child: Container(
        width: 20.w,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: theme.colorScheme.primary.withValues(alpha: 0.3),
            width: 2,
          ),
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(10),
          child: Stack(
            fit: StackFit.expand,
            children: [
              CustomImageWidget(
                imageUrl: effect["thumbnail"] as String,
                fit: BoxFit.cover,
                semanticLabel: effect["semanticLabel"] as String,
              ),
              Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [
                      Colors.transparent,
                      Colors.black.withValues(alpha: 0.7),
                    ],
                  ),
                ),
              ),
              Positioned(
                bottom: 1.h,
                left: 2.w,
                right: 2.w,
                child: Text(
                  effect["name"] as String,
                  style: theme.textTheme.labelSmall?.copyWith(
                    color: Colors.white,
                    fontWeight: FontWeight.w600,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  List<Map<String, dynamic>> _getFilteredEffects() {
    return _allEffects.where((effect) {
      final matchesCategory =
          _selectedCategory == 'All' || effect["category"] == _selectedCategory;
      final matchesSearch =
          _searchQuery.isEmpty ||
          (effect["name"] as String).toLowerCase().contains(
            _searchQuery.toLowerCase(),
          );
      return matchesCategory && matchesSearch;
    }).toList();
  }

  List<Map<String, dynamic>> _getRecentlyUsedEffects() {
    final recentEffects = _allEffects.where((effect) {
      final lastUsed = effect["lastUsed"] as DateTime;
      final hoursSinceUsed = DateTime.now().difference(lastUsed).inHours;
      return hoursSinceUsed < 24;
    }).toList();

    recentEffects.sort((a, b) {
      final aTime = a["lastUsed"] as DateTime;
      final bTime = b["lastUsed"] as DateTime;
      return bTime.compareTo(aTime);
    });

    return recentEffects.take(5).toList();
  }

  Future<void> _handleRefresh() async {
    setState(() {
      _isRefreshing = true;
    });

    await Future.delayed(const Duration(seconds: 1));

    setState(() {
      _isRefreshing = false;
    });

    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: const Text('Effects library updated'),
          duration: const Duration(seconds: 2),
          behavior: SnackBarBehavior.floating,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
        ),
      );
    }
  }

  void _showEffectPreview(Map<String, dynamic> effect) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => EffectPreviewModalWidget(
        effect: effect,
        onApply: () {
          Navigator.pop(context);
          _applyEffect(effect);
        },
      ),
    );
  }

  void _showQuickActions(Map<String, dynamic> effect) {
    final theme = Theme.of(context);

    showModalBottomSheet(
      context: context,
      backgroundColor: theme.colorScheme.surface,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            SizedBox(height: 1.h),
            Container(
              width: 10.w,
              height: 0.5.h,
              decoration: BoxDecoration(
                color: theme.colorScheme.onSurfaceVariant.withValues(
                  alpha: 0.3,
                ),
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            SizedBox(height: 2.h),
            ListTile(
              leading: CustomIconWidget(
                iconName: effect["isFavorite"] == true
                    ? 'favorite'
                    : 'favorite_border',
                color: effect["isFavorite"] == true
                    ? Colors.red
                    : theme.colorScheme.onSurface,
                size: 24,
              ),
              title: Text(
                effect["isFavorite"] == true
                    ? 'Remove from Favorites'
                    : 'Add to Favorites',
                style: theme.textTheme.bodyLarge,
              ),
              onTap: () {
                Navigator.pop(context);
                _toggleFavorite(effect);
              },
            ),
            ListTile(
              leading: CustomIconWidget(
                iconName: 'play_circle_outline',
                color: theme.colorScheme.onSurface,
                size: 24,
              ),
              title: Text(
                'Preview on Current Video',
                style: theme.textTheme.bodyLarge,
              ),
              onTap: () {
                Navigator.pop(context);
                _previewOnVideo(effect);
              },
            ),
            ListTile(
              leading: CustomIconWidget(
                iconName: 'auto_awesome',
                color: theme.colorScheme.onSurface,
                size: 24,
              ),
              title: Text('Similar Effects', style: theme.textTheme.bodyLarge),
              onTap: () {
                Navigator.pop(context);
                _showSimilarEffects(effect);
              },
            ),
            SizedBox(height: 2.h),
          ],
        ),
      ),
    );
  }

  void _showFilterOptions() {
    final theme = Theme.of(context);

    showModalBottomSheet(
      context: context,
      backgroundColor: theme.colorScheme.surface,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            SizedBox(height: 1.h),
            Container(
              width: 10.w,
              height: 0.5.h,
              decoration: BoxDecoration(
                color: theme.colorScheme.onSurfaceVariant.withValues(
                  alpha: 0.3,
                ),
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            SizedBox(height: 2.h),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 4.w),
              child: Row(
                children: [
                  Text('Filter Options', style: theme.textTheme.titleLarge),
                ],
              ),
            ),
            SizedBox(height: 2.h),
            ListTile(
              leading: CustomIconWidget(
                iconName: 'star',
                color: theme.colorScheme.primary,
                size: 24,
              ),
              title: Text('Premium Only', style: theme.textTheme.bodyLarge),
              trailing: Switch(value: false, onChanged: (value) {}),
            ),
            ListTile(
              leading: CustomIconWidget(
                iconName: 'favorite',
                color: Colors.red,
                size: 24,
              ),
              title: Text('Favorites Only', style: theme.textTheme.bodyLarge),
              trailing: Switch(value: false, onChanged: (value) {}),
            ),
            SizedBox(height: 2.h),
          ],
        ),
      ),
    );
  }

  void _toggleFavorite(Map<String, dynamic> effect) {
    setState(() {
      effect["isFavorite"] = !(effect["isFavorite"] as bool);
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          effect["isFavorite"] == true
              ? 'Added to favorites'
              : 'Removed from favorites',
        ),
        duration: const Duration(seconds: 2),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
    );
  }

  void _applyEffect(Map<String, dynamic> effect) {
    if (effect["isPremium"] == true) {
      _showPremiumPrompt(effect);
      return;
    }

    setState(() {
      effect["lastUsed"] = DateTime.now();
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Applying ${effect["name"]}...'),
        duration: const Duration(seconds: 2),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
    );
  }

  void _previewOnVideo(Map<String, dynamic> effect) {
    if (effect["isPremium"] == true) {
      _showPremiumPrompt(effect);
      return;
    }

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Previewing ${effect["name"]} on video...'),
        duration: const Duration(seconds: 2),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
    );
  }

  void _showSimilarEffects(Map<String, dynamic> effect) {
    final category = effect["category"] as String;
    setState(() {
      _selectedCategory = category;
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Showing similar $category effects'),
        duration: const Duration(seconds: 2),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
    );
  }

  void _showPremiumPrompt(Map<String, dynamic> effect) {
    final theme = Theme.of(context);

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        title: Row(
          children: [
            CustomIconWidget(
              iconName: 'workspace_premium',
              color: theme.colorScheme.primary,
              size: 24,
            ),
            SizedBox(width: 2.w),
            Text('Premium Effect', style: theme.textTheme.titleLarge),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Unlock ${effect["name"]} and all premium effects',
              style: theme.textTheme.bodyLarge,
            ),
            SizedBox(height: 2.h),
            Container(
              padding: EdgeInsets.all(3.w),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [
                    theme.colorScheme.primary.withValues(alpha: 0.2),
                    theme.colorScheme.secondary.withValues(alpha: 0.1),
                  ],
                ),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Column(
                children: [
                  Text(
                    '\$9.99/month',
                    style: theme.textTheme.headlineSmall?.copyWith(
                      color: theme.colorScheme.primary,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 1.h),
                  Text(
                    'Unlimited premium effects',
                    style: theme.textTheme.bodyMedium?.copyWith(
                      color: theme.colorScheme.onSurfaceVariant,
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
            child: Text(
              'Maybe Later',
              style: theme.textTheme.labelLarge?.copyWith(
                color: theme.colorScheme.onSurfaceVariant,
              ),
            ),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: const Text('Subscription feature coming soon!'),
                  duration: const Duration(seconds: 2),
                  behavior: SnackBarBehavior.floating,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
              );
            },
            child: const Text('Upgrade Now'),
          ),
        ],
      ),
    );
  }
}
