import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../widgets/custom_bottom_bar.dart';

class LibraryScreen extends StatefulWidget {
  const LibraryScreen({super.key});

  @override
  State<LibraryScreen> createState() => _LibraryScreenState();
}

class _LibraryScreenState extends State<LibraryScreen> {
  String _selectedFilter = 'All';
  final List<String> _filters = ['All', 'Recent', 'Favorites', 'Shared'];

  final List<Map<String, dynamic>> _libraryItems = [
    {
      "id": 1,
      "title": "Sunset Beach Waves",
      "thumbnail":
          "https://images.unsplash.com/photo-1636061212944-c5d23e552d19",
      "semanticLabel":
          "Aerial view of ocean waves crashing on sandy beach during golden sunset",
      "date": "12/22/2025",
      "duration": "15s",
      "isFavorite": true,
    },
    {
      "id": 2,
      "title": "Cyberpunk City Night",
      "thumbnail":
          "https://img.rocket.new/generatedImages/rocket_gen_img_1785b17aa-1764640982556.png",
      "semanticLabel":
          "Futuristic neon-lit cityscape with tall buildings and flying vehicles at night",
      "date": "12/21/2025",
      "duration": "20s",
      "isFavorite": false,
    },
    {
      "id": 3,
      "title": "Dancing in Rain",
      "thumbnail": "https://images.unsplash.com/photo-1561731081-76a8ab9c60a9",
      "semanticLabel":
          "Animated character joyfully dancing in the rain with colorful umbrella",
      "date": "12/20/2025",
      "duration": "10s",
      "isFavorite": true,
    },
    {
      "id": 4,
      "title": "Mountain Sunrise",
      "thumbnail":
          "https://images.unsplash.com/photo-1721407965062-b69445c4d18c",
      "semanticLabel":
          "Misty mountain peaks with golden sunrise light breaking through clouds",
      "date": "12/19/2025",
      "duration": "18s",
      "isFavorite": false,
    },
    {
      "id": 5,
      "title": "Neon Abstract",
      "thumbnail":
          "https://images.unsplash.com/photo-1719090024588-80c604910b14",
      "semanticLabel":
          "Abstract geometric patterns with vibrant neon colors and fluid motion",
      "date": "12/18/2025",
      "duration": "12s",
      "isFavorite": true,
    },
    {
      "id": 6,
      "title": "Urban Traffic",
      "thumbnail":
          "https://images.unsplash.com/photo-1614419359838-9837775b26bd",
      "semanticLabel":
          "Time-lapse of busy city traffic with light trails at night",
      "date": "12/17/2025",
      "duration": "25s",
      "isFavorite": false,
    },
  ];

  void _handleFilterSelection(String filter) {
    setState(() {
      _selectedFilter = filter;
    });
  }

  void _handleVideoTap(Map<String, dynamic> item) {
    Navigator.pushNamed(context, '/video-preview-screen', arguments: item);
  }

  void _handleDeleteVideo(int id) {
    setState(() {
      _libraryItems.removeWhere((item) => item['id'] == id);
    });
    Fluttertoast.showToast(
      msg: "Video deleted from library",
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
    );
  }

  void _handleShareVideo(Map<String, dynamic> item) {
    Fluttertoast.showToast(
      msg: "Share feature coming soon",
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
    );
  }

  void _handleToggleFavorite(int id) {
    setState(() {
      final index = _libraryItems.indexWhere((item) => item['id'] == id);
      if (index != -1) {
        _libraryItems[index]['isFavorite'] =
            !_libraryItems[index]['isFavorite'];
      }
    });
  }

  List<Map<String, dynamic>> get _filteredItems {
    if (_selectedFilter == 'All') return _libraryItems;
    if (_selectedFilter == 'Favorites') {
      return _libraryItems.where((item) => item['isFavorite'] == true).toList();
    }
    return _libraryItems;
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      body: CustomScrollView(
        slivers: [
          // Enhanced Sticky App Bar with glassmorphism
          SliverAppBar(
            pinned: true,
            floating: false,
            backgroundColor: Colors.transparent,
            elevation: 0,
            surfaceTintColor: Colors.transparent,
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
            title: Text(
              'My Library',
              style: theme.textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.w600,
                color: theme.colorScheme.onSurface,
              ),
            ),
            centerTitle: true,
            actions: [
              Padding(
                padding: EdgeInsets.only(right: 4.w),
                child: IconButton(
                  onPressed: () {
                    Fluttertoast.showToast(
                      msg: "Search feature coming soon",
                      toastLength: Toast.LENGTH_SHORT,
                      gravity: ToastGravity.BOTTOM,
                    );
                  },
                  icon: CustomIconWidget(
                    iconName: 'search',
                    color: theme.colorScheme.primary,
                    size: 24,
                  ),
                ),
              ),
            ],
          ),

          // Sticky Filter Chips
          SliverPersistentHeader(
            pinned: true,
            delegate: _FilterChipsDelegate(
              minHeight: 8.h,
              maxHeight: 8.h,
              child: Container(
                color: theme.scaffoldBackgroundColor,
                padding: EdgeInsets.symmetric(vertical: 1.5.h),
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  padding: EdgeInsets.symmetric(horizontal: 4.w),
                  physics: const BouncingScrollPhysics(),
                  itemCount: _filters.length,
                  itemBuilder: (context, index) {
                    final filter = _filters[index];
                    final isSelected = _selectedFilter == filter;
                    return Padding(
                      padding: EdgeInsets.only(right: 3.w),
                      child: ChoiceChip(
                        label: Text(
                          filter,
                          style: theme.textTheme.bodyMedium?.copyWith(
                            color: isSelected
                                ? theme.colorScheme.onPrimary
                                : theme.colorScheme.onSurfaceVariant,
                            fontWeight: isSelected
                                ? FontWeight.w600
                                : FontWeight.w400,
                          ),
                        ),
                        selected: isSelected,
                        onSelected: (_) => _handleFilterSelection(filter),
                        backgroundColor:
                            theme.colorScheme.surfaceContainerHighest,
                        selectedColor: theme.colorScheme.primary,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(20.0),
                        ),
                        padding: EdgeInsets.symmetric(
                          horizontal: 4.w,
                          vertical: 1.h,
                        ),
                      ),
                    );
                  },
                ),
              ),
            ),
          ),

          // Video Grid Content
          _filteredItems.isEmpty
              ? SliverFillRemaining(
                  child: Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        CustomIconWidget(
                          iconName: 'video_library',
                          color: theme.colorScheme.onSurfaceVariant.withValues(
                            alpha: 0.5,
                          ),
                          size: 80,
                        ),
                        SizedBox(height: 2.h),
                        Text(
                          'No videos in library',
                          style: theme.textTheme.titleMedium?.copyWith(
                            color: theme.colorScheme.onSurfaceVariant,
                          ),
                        ),
                      ],
                    ),
                  ),
                )
              : SliverPadding(
                  padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
                  sliver: SliverGrid(
                    gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 2,
                      childAspectRatio: 0.68,
                      crossAxisSpacing: 3.w,
                      mainAxisSpacing: 2.h,
                    ),
                    delegate: SliverChildBuilderDelegate((context, index) {
                      final item = _filteredItems[index];
                      return _buildVideoCard(item, theme);
                    }, childCount: _filteredItems.length),
                  ),
                ),
        ],
      ),
      bottomNavigationBar: CustomBottomBar(
        selectedItem: CustomBottomBarItem.library,
        onItemSelected: (item) {
          // Navigation handled by CustomBottomBar internally
        },
      ),
    );
  }

  Widget _buildVideoCard(Map<String, dynamic> item, ThemeData theme) {
    return GestureDetector(
      onTap: () => _handleVideoTap(item),
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(12.0),
          color: theme.colorScheme.surfaceContainerHighest,
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Thumbnail with consistent aspect ratio
            Expanded(
              flex: 6,
              child: Stack(
                children: [
                  ClipRRect(
                    borderRadius: const BorderRadius.vertical(
                      top: Radius.circular(12.0),
                    ),
                    child: CustomImageWidget(
                      imageUrl: item['thumbnail'],
                      height: double.infinity,
                      width: double.infinity,
                      fit: BoxFit.cover,
                      semanticLabel: item['semanticLabel'] ?? '',
                    ),
                  ),
                  // Favorite icon with consistent positioning
                  Positioned(
                    top: 8.0,
                    right: 8.0,
                    child: GestureDetector(
                      onTap: () => _handleToggleFavorite(item['id'] as int),
                      child: Container(
                        padding: const EdgeInsets.all(6.0),
                        decoration: BoxDecoration(
                          color: Colors.black.withValues(alpha: 0.6),
                          shape: BoxShape.circle,
                        ),
                        child: Icon(
                          item['isFavorite'] == true
                              ? Icons.favorite
                              : Icons.favorite_border,
                          color: item['isFavorite'] == true
                              ? Colors.red
                              : Colors.white,
                          size: 18,
                        ),
                      ),
                    ),
                  ),
                  // Duration badge with consistent positioning
                  Positioned(
                    bottom: 8.0,
                    right: 8.0,
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 8.0,
                        vertical: 4.0,
                      ),
                      decoration: BoxDecoration(
                        color: Colors.black.withValues(alpha: 0.7),
                        borderRadius: BorderRadius.circular(4.0),
                      ),
                      child: Text(
                        item['duration'],
                        style: theme.textTheme.bodySmall?.copyWith(
                          color: Colors.white,
                          fontWeight: FontWeight.w600,
                          fontSize: 11.sp,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            // Video info with proper text overflow handling
            Expanded(
              flex: 4,
              child: Padding(
                padding: EdgeInsets.all(3.w),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      item['title'],
                      style: theme.textTheme.titleSmall?.copyWith(
                        fontWeight: FontWeight.w600,
                        fontSize: 13.sp,
                      ),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                    SizedBox(height: 0.5.h),
                    Text(
                      item['date'],
                      style: theme.textTheme.bodySmall?.copyWith(
                        color: theme.colorScheme.onSurfaceVariant,
                        fontSize: 11.sp,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                    const Spacer(),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Expanded(
                          child: IconButton(
                            onPressed: () => _handleShareVideo(item),
                            icon: CustomIconWidget(
                              iconName: 'share',
                              color: theme.colorScheme.primary,
                              size: 20,
                            ),
                            padding: EdgeInsets.zero,
                            constraints: const BoxConstraints(),
                          ),
                        ),
                        SizedBox(width: 2.w),
                        Expanded(
                          child: IconButton(
                            onPressed: () =>
                                _handleDeleteVideo(item['id'] as int),
                            icon: CustomIconWidget(
                              iconName: 'delete',
                              color: theme.colorScheme.error,
                              size: 20,
                            ),
                            padding: EdgeInsets.zero,
                            constraints: const BoxConstraints(),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// Delegate for sticky filter chips
class _FilterChipsDelegate extends SliverPersistentHeaderDelegate {
  final double minHeight;
  final double maxHeight;
  final Widget child;

  _FilterChipsDelegate({
    required this.minHeight,
    required this.maxHeight,
    required this.child,
  });

  @override
  double get minExtent => minHeight;

  @override
  double get maxExtent => maxHeight;

  @override
  Widget build(
    BuildContext context,
    double shrinkOffset,
    bool overlapsContent,
  ) {
    return SizedBox.expand(child: child);
  }

  @override
  bool shouldRebuild(_FilterChipsDelegate oldDelegate) {
    return maxHeight != oldDelegate.maxHeight ||
        minHeight != oldDelegate.minHeight ||
        child != oldDelegate.child;
  }
}
