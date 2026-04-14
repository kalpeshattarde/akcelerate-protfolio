import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class SearchOverlayWidget extends StatefulWidget {
  final Function(String) onSearch;
  final VoidCallback onClose;

  const SearchOverlayWidget({
    Key? key,
    required this.onSearch,
    required this.onClose,
  }) : super(key: key);

  @override
  State<SearchOverlayWidget> createState() => _SearchOverlayWidgetState();
}

class _SearchOverlayWidgetState extends State<SearchOverlayWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _fadeAnimation;
  late Animation<Offset> _slideAnimation;

  final TextEditingController _searchController = TextEditingController();
  final FocusNode _focusNode = FocusNode();

  final List<String> _recentSearches = [
    'Sleep meditation',
    'Anxiety relief',
    'Morning mindfulness',
    'Deep relaxation',
    'Stress reduction',
  ];

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );

    _fadeAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeInOut,
    ));

    _slideAnimation = Tween<Offset>(
      begin: const Offset(0, -1),
      end: Offset.zero,
    ).animate(CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeOutCubic,
    ));

    _animationController.forward();

    // Auto-focus search field
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _focusNode.requestFocus();
    });
  }

  @override
  void dispose() {
    _animationController.dispose();
    _searchController.dispose();
    _focusNode.dispose();
    super.dispose();
  }

  void _handleSearch(String query) {
    if (query.trim().isNotEmpty) {
      widget.onSearch(query.trim());
      _closeOverlay();
    }
  }

  void _closeOverlay() {
    _animationController.reverse().then((_) {
      widget.onClose();
    });
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _animationController,
      builder: (context, child) {
        return Container(
          color: AppTheme.lightTheme.scaffoldBackgroundColor.withValues(
            alpha: _fadeAnimation.value * 0.95,
          ),
          child: SafeArea(
            child: SlideTransition(
              position: _slideAnimation,
              child: Column(
                children: [
                  // Search header
                  Container(
                    padding: EdgeInsets.all(4.w),
                    child: Row(
                      children: [
                        GestureDetector(
                          onTap: _closeOverlay,
                          child: Container(
                            padding: EdgeInsets.all(2.w),
                            child: CustomIconWidget(
                              iconName: 'arrow_back',
                              color: AppTheme.lightTheme.colorScheme.onSurface,
                              size: 24,
                            ),
                          ),
                        ),
                        SizedBox(width: 2.w),

                        // Search field
                        Expanded(
                          child: Container(
                            decoration: BoxDecoration(
                              color: AppTheme.lightTheme.colorScheme.surface,
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: TextField(
                              controller: _searchController,
                              focusNode: _focusNode,
                              style: AppTheme.lightTheme.textTheme.bodyLarge
                                  ?.copyWith(
                                color:
                                    AppTheme.lightTheme.colorScheme.onSurface,
                              ),
                              decoration: InputDecoration(
                                hintText: 'Search meditations...',
                                hintStyle: AppTheme
                                    .lightTheme.textTheme.bodyLarge
                                    ?.copyWith(
                                  color: AppTheme
                                      .lightTheme.colorScheme.onSurfaceVariant,
                                ),
                                prefixIcon: Padding(
                                  padding: EdgeInsets.all(3.w),
                                  child: CustomIconWidget(
                                    iconName: 'search',
                                    color: AppTheme.lightTheme.colorScheme
                                        .onSurfaceVariant,
                                    size: 20,
                                  ),
                                ),
                                suffixIcon: _searchController.text.isNotEmpty
                                    ? GestureDetector(
                                        onTap: () {
                                          _searchController.clear();
                                          setState(() {});
                                        },
                                        child: Padding(
                                          padding: EdgeInsets.all(3.w),
                                          child: CustomIconWidget(
                                            iconName: 'clear',
                                            color: AppTheme.lightTheme
                                                .colorScheme.onSurfaceVariant,
                                            size: 20,
                                          ),
                                        ),
                                      )
                                    : GestureDetector(
                                        onTap: () {
                                          // Voice search functionality would go here
                                        },
                                        child: Padding(
                                          padding: EdgeInsets.all(3.w),
                                          child: CustomIconWidget(
                                            iconName: 'mic',
                                            color: AppTheme.lightTheme
                                                .colorScheme.onSurfaceVariant,
                                            size: 20,
                                          ),
                                        ),
                                      ),
                                border: InputBorder.none,
                                contentPadding: EdgeInsets.symmetric(
                                  horizontal: 4.w,
                                  vertical: 2.h,
                                ),
                              ),
                              onSubmitted: _handleSearch,
                              onChanged: (value) => setState(() {}),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),

                  // Search content
                  Expanded(
                    child: SingleChildScrollView(
                      padding: EdgeInsets.symmetric(horizontal: 4.w),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          // Recent searches
                          if (_recentSearches.isNotEmpty) ...[
                            Text(
                              'Recent Searches',
                              style: AppTheme.lightTheme.textTheme.titleMedium
                                  ?.copyWith(
                                color:
                                    AppTheme.lightTheme.colorScheme.onSurface,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                            SizedBox(height: 2.h),
                            ...(_recentSearches.map(
                                (search) => _buildRecentSearchItem(search))),
                            SizedBox(height: 3.h),
                          ],

                          // Popular searches
                          Text(
                            'Popular Searches',
                            style: AppTheme.lightTheme.textTheme.titleMedium
                                ?.copyWith(
                              color: AppTheme.lightTheme.colorScheme.onSurface,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          SizedBox(height: 2.h),

                          _buildPopularSearchChips(),

                          SizedBox(height: 3.h),

                          // Categories
                          Text(
                            'Browse by Category',
                            style: AppTheme.lightTheme.textTheme.titleMedium
                                ?.copyWith(
                              color: AppTheme.lightTheme.colorScheme.onSurface,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          SizedBox(height: 2.h),

                          _buildCategoryGrid(),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildRecentSearchItem(String search) {
    return ListTile(
      leading: CustomIconWidget(
        iconName: 'history',
        color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
        size: 20,
      ),
      title: Text(
        search,
        style: AppTheme.lightTheme.textTheme.bodyLarge?.copyWith(
          color: AppTheme.lightTheme.colorScheme.onSurface,
        ),
      ),
      trailing: GestureDetector(
        onTap: () {
          // Remove from recent searches
        },
        child: CustomIconWidget(
          iconName: 'close',
          color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
          size: 18,
        ),
      ),
      onTap: () => _handleSearch(search),
      contentPadding: EdgeInsets.zero,
    );
  }

  Widget _buildPopularSearchChips() {
    final popularSearches = [
      'Sleep',
      'Anxiety',
      'Stress',
      'Focus',
      'Relaxation',
      'Mindfulness'
    ];

    return Wrap(
      spacing: 2.w,
      runSpacing: 1.h,
      children: popularSearches
          .map((search) => GestureDetector(
                onTap: () => _handleSearch(search),
                child: Container(
                  padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
                  decoration: BoxDecoration(
                    color: AppTheme.lightTheme.colorScheme.surface,
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(
                      color: AppTheme.lightTheme.colorScheme.onSurfaceVariant
                          .withValues(alpha: 0.3),
                    ),
                  ),
                  child: Text(
                    search,
                    style: AppTheme.lightTheme.textTheme.labelMedium?.copyWith(
                      color: AppTheme.lightTheme.colorScheme.onSurface,
                    ),
                  ),
                ),
              ))
          .toList(),
    );
  }

  Widget _buildCategoryGrid() {
    final categories = [
      {'name': 'Sleep Stories', 'icon': 'bedtime'},
      {'name': 'Breathing', 'icon': 'air'},
      {'name': 'Meditation', 'icon': 'self_improvement'},
      {'name': 'Relaxation', 'icon': 'spa'},
    ];

    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        crossAxisSpacing: 3.w,
        mainAxisSpacing: 2.h,
        childAspectRatio: 2.5,
      ),
      itemCount: categories.length,
      itemBuilder: (context, index) {
        final category = categories[index];
        return GestureDetector(
          onTap: () => _handleSearch(category['name'] ?? ''),
          child: Container(
            decoration: BoxDecoration(
              color: AppTheme.lightTheme.colorScheme.surface,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(
                color: AppTheme.lightTheme.colorScheme.onSurfaceVariant
                    .withValues(alpha: 0.2),
              ),
            ),
            child: Row(
              children: [
                SizedBox(width: 3.w),
                CustomIconWidget(
                  iconName: category['icon'] ?? 'category',
                  color: AppTheme.lightTheme.colorScheme.secondary,
                  size: 24,
                ),
                SizedBox(width: 2.w),
                Expanded(
                  child: Text(
                    category['name'] ?? '',
                    style: AppTheme.lightTheme.textTheme.labelMedium?.copyWith(
                      color: AppTheme.lightTheme.colorScheme.onSurface,
                      fontWeight: FontWeight.w500,
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
