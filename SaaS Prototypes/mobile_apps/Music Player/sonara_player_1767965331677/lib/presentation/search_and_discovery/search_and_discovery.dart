import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../widgets/custom_app_bar.dart';
import '../../widgets/custom_icon_widget.dart';
import '../../widgets/custom_tab_bar.dart';
import '../../widgets/custom_image_widget.dart';
import './widgets/empty_search_state_widget.dart';
import './widgets/recent_search_chip_widget.dart';
import './widgets/search_result_card_widget.dart';

// Delegate for tab bar in sliver
class _TabBarDelegate extends SliverPersistentHeaderDelegate {
  final Widget child;

  _TabBarDelegate({required this.child});

  @override
  double get minExtent => 48;

  @override
  double get maxExtent => 48;

  @override
  Widget build(
      BuildContext context, double shrinkOffset, bool overlapsContent) {
    return Container(
      color: Theme.of(context).scaffoldBackgroundColor,
      child: child,
    );
  }

  @override
  bool shouldRebuild(_TabBarDelegate oldDelegate) => false;
}

/// Search and Discovery screen for comprehensive music exploration
/// Provides intelligent search with category filtering and voice search
class SearchAndDiscovery extends StatefulWidget {
  const SearchAndDiscovery({Key? key}) : super(key: key);

  @override
  State<SearchAndDiscovery> createState() => _SearchAndDiscoveryState();
}

class _SearchAndDiscoveryState extends State<SearchAndDiscovery>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  final TextEditingController _searchController = TextEditingController();
  final FocusNode _searchFocusNode = FocusNode();
  final ScrollController _scrollController = ScrollController();

  bool _isSearching = false;
  bool _showSuggestions = false;
  String _searchQuery = '';
  String _selectedCategory = 'All';

  // Mock user data
  final Map<String, dynamic> _userData = {
    "name": "Alex",
    "avatar":
        "https://img.rocket.new/generatedImages/rocket_gen_img_1311bae8f-1763293463780.png",
    "avatarSemanticLabel":
        "Profile photo of a young man with short brown hair wearing a casual blue shirt",
  };

  // Mock data for recent searches
  List<String> _recentSearches = [
    'Chill Vibes',
    'Drake',
    'Summer Hits 2025',
    'Lo-fi Beats',
    'Workout Mix',
  ];

  // Mock data for search suggestions
  final List<String> _searchSuggestions = [
    'Trending Now',
    'Top Charts',
    'New Releases',
    'Popular Artists',
    'Mood Playlists',
  ];

  // Mock data for search results
  final List<Map<String, dynamic>> _searchResults = [
    {
      "id": 1,
      "type": "song",
      "title": "Blinding Lights",
      "subtitle": "The Weeknd • After Hours",
      "artwork":
          "https://img.rocket.new/generatedImages/rocket_gen_img_175db5b6f-1766473482097.png",
      "semanticLabel":
          "Album artwork showing neon lights and dark cityscape with purple and pink tones",
      "duration": "3:20",
    },
    {
      "id": 2,
      "type": "artist",
      "title": "Billie Eilish",
      "subtitle": "45.2M monthly listeners",
      "artwork": "https://images.unsplash.com/photo-1614864447692-ff1e56a8585e",
      "semanticLabel":
          "Portrait of young female artist with green hair against dark background",
      "verified": true,
    },
    {
      "id": 3,
      "type": "album",
      "title": "Future Nostalgia",
      "subtitle": "Dua Lipa • 2020 • 11 songs",
      "artwork":
          "https://img.rocket.new/generatedImages/rocket_gen_img_18ba9039d-1765431876796.png",
      "semanticLabel":
          "Colorful album cover with retro 80s aesthetic featuring bright pink and blue colors",
    },
    {
      "id": 4,
      "type": "playlist",
      "title": "Today's Top Hits",
      "subtitle": "Spotify • 8.5M likes",
      "artwork":
          "https://img.rocket.new/generatedImages/rocket_gen_img_1143b8a95-1766575157412.png",
      "semanticLabel":
          "Playlist cover showing modern music production equipment and headphones",
    },
    {
      "id": 5,
      "type": "song",
      "title": "Levitating",
      "subtitle": "Dua Lipa • Future Nostalgia",
      "artwork": "https://images.unsplash.com/photo-1507465334284-4d22caf9bdd7",
      "semanticLabel":
          "Concert stage with purple and blue lighting effects and silhouettes",
      "duration": "3:23",
    },
    {
      "id": 6,
      "type": "artist",
      "title": "The Weeknd",
      "subtitle": "89.7M monthly listeners",
      "artwork": "https://images.unsplash.com/photo-1710250199467-4209e522d6e7",
      "semanticLabel":
          "Male artist portrait with dramatic red lighting and urban background",
      "verified": true,
    },
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 4, vsync: this);
    _searchController.addListener(_onSearchChanged);
    _searchFocusNode.addListener(_onFocusChanged);
  }

  @override
  void dispose() {
    _tabController.dispose();
    _searchController.dispose();
    _searchFocusNode.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  void _onSearchChanged() {
    setState(() {
      _searchQuery = _searchController.text;
      _showSuggestions = _searchQuery.isNotEmpty && _searchQuery.length < 3;
      _isSearching = _searchQuery.isNotEmpty && _searchQuery.length >= 3;
    });
  }

  void _onFocusChanged() {
    setState(() {
      _showSuggestions = _searchFocusNode.hasFocus && _searchQuery.isEmpty;
    });
  }

  void _removeRecentSearch(String search) {
    setState(() {
      _recentSearches.remove(search);
    });
  }

  void _clearSearch() {
    setState(() {
      _searchController.clear();
      _searchQuery = '';
      _isSearching = false;
      _showSuggestions = false;
    });
  }

  void _onSuggestionTap(String suggestion) {
    setState(() {
      _searchController.text = suggestion;
      _searchQuery = suggestion;
      _isSearching = true;
      _showSuggestions = false;
      _searchFocusNode.unfocus();
    });
  }

  void _showFilterBottomSheet() {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (context) => _buildFilterBottomSheet(),
    );
  }

  Widget _buildFilterBottomSheet() {
    final theme = Theme.of(context);
    return Container(
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            margin: const EdgeInsets.only(top: 12),
            width: 40.w,
            height: 4,
            decoration: BoxDecoration(
              color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.3),
              borderRadius: BorderRadius.circular(2),
            ),
          ),
          Padding(
            padding: EdgeInsets.all(4.w),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Filter Results', style: theme.textTheme.headlineSmall),
                SizedBox(height: 3.h),
                Text('Genre', style: theme.textTheme.titleMedium),
                SizedBox(height: 1.h),
                Wrap(
                  spacing: 2.w,
                  runSpacing: 1.h,
                  children: ['Pop', 'Rock', 'Hip Hop', 'Electronic', 'Jazz']
                      .map(
                        (genre) => FilterChip(
                          label: Text(genre),
                          selected: false,
                          onSelected: (selected) {},
                        ),
                      )
                      .toList(),
                ),
                SizedBox(height: 2.h),
                Text('Decade', style: theme.textTheme.titleMedium),
                SizedBox(height: 1.h),
                Wrap(
                  spacing: 2.w,
                  runSpacing: 1.h,
                  children: ['2020s', '2010s', '2000s', '90s', '80s']
                      .map(
                        (decade) => FilterChip(
                          label: Text(decade),
                          selected: false,
                          onSelected: (selected) {},
                        ),
                      )
                      .toList(),
                ),
                SizedBox(height: 3.h),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: () => Navigator.pop(context),
                    child: const Text('Apply Filters'),
                  ),
                ),
                SizedBox(height: 2.h),
              ],
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
      backgroundColor: Colors.transparent,
      body: GestureDetector(
        onTap: () => _searchFocusNode.unfocus(),
        child: SafeArea(
          child: SingleChildScrollView(
            controller: _scrollController,
            physics: const AlwaysScrollableScrollPhysics(),
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const SizedBox(height: 20),
                  // Search Bar with mic inside
                  Container(
                    height: 52,
                    decoration: BoxDecoration(
                      color: Colors.white.withValues(alpha: 0.08),
                      borderRadius: BorderRadius.circular(26),
                      border: Border.all(
                        color: Colors.white.withValues(alpha: 0.1),
                        width: 1,
                      ),
                    ),
                    child: Row(
                      children: [
                        const SizedBox(width: 18),
                        CustomIconWidget(
                          iconName: 'search',
                          color: theme.colorScheme.onSurfaceVariant,
                          size: 22,
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: TextField(
                            controller: _searchController,
                            focusNode: _searchFocusNode,
                            style: theme.textTheme.bodyLarge?.copyWith(
                              color: theme.colorScheme.onSurface,
                              fontSize: 16,
                            ),
                            decoration: InputDecoration(
                              hintText: 'Search songs, artists, albums...',
                              hintStyle: theme.textTheme.bodyLarge?.copyWith(
                                color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.5),
                                fontSize: 16,
                              ),
                              border: InputBorder.none,
                              enabledBorder: InputBorder.none,
                              focusedBorder: InputBorder.none,
                              filled: false,
                              isDense: true,
                              contentPadding: EdgeInsets.zero,
                            ),
                            onChanged: (value) => _onSearchChanged(),
                            onSubmitted: (value) {
                              _searchFocusNode.unfocus();
                            },
                          ),
                        ),
                        if (_searchController.text.isNotEmpty) ...[
                          GestureDetector(
                            onTap: () {
                              _searchController.clear();
                              _onSearchChanged();
                            },
                            child: CustomIconWidget(
                              iconName: 'close',
                              color: theme.colorScheme.onSurfaceVariant,
                              size: 18,
                            ),
                          ),
                          const SizedBox(width: 8),
                        ],
                        // Mic button inside search bar
                        GestureDetector(
                          onTap: () {
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                content: Text('Voice search activated'),
                                behavior: SnackBarBehavior.floating,
                              ),
                            );
                          },
                          child: Container(
                            margin: const EdgeInsets.only(right: 6),
                            padding: const EdgeInsets.all(10),
                            decoration: BoxDecoration(
                              color: theme.colorScheme.primary.withValues(alpha: 0.2),
                              borderRadius: BorderRadius.circular(20),
                            ),
                            child: CustomIconWidget(
                              iconName: 'mic',
                              color: theme.colorScheme.primary,
                              size: 20,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  
                  if (!_showSuggestions) ...[
                    const SizedBox(height: 32),
                    // Recent Searches section
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'Recent Searches',
                          style: theme.textTheme.titleLarge?.copyWith(
                            color: theme.colorScheme.onSurface,
                            fontWeight: FontWeight.w600,
                            fontSize: 22,
                            letterSpacing: -0.3,
                          ),
                        ),
                        GestureDetector(
                          onTap: () {
                            // Clear all recent searches
                          },
                          child: Text(
                            'Clear All',
                            style: theme.textTheme.bodyMedium?.copyWith(
                              color: theme.colorScheme.primary,
                              fontWeight: FontWeight.w500,
                              fontSize: 14,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    Wrap(
                      spacing: 10,
                      runSpacing: 10,
                      children: [
                        _buildSearchChip('Chill Vibes', theme),
                        _buildSearchChip('Drake', theme),
                        _buildSearchChip('Summer Hits 2025', theme),
                        _buildSearchChip('Lo-fi Beats', theme),
                        _buildSearchChip('Workout Mix', theme),
                      ],
                    ),
                    const SizedBox(height: 36),
                    // Trending Searches section
                    Text(
                      'Trending Searches',
                      style: theme.textTheme.titleLarge?.copyWith(
                        color: theme.colorScheme.onSurface,
                        fontWeight: FontWeight.w600,
                        fontSize: 22,
                        letterSpacing: -0.3,
                      ),
                    ),
                    const SizedBox(height: 16),
                    _buildTrendingItem('Trending Now', 0, theme),
                    _buildTrendingItem('Top Charts', 1, theme),
                    _buildTrendingItem('New Releases', 2, theme),
                    _buildTrendingItem('Popular Artists', 3, theme),
                    _buildTrendingItem('Mood Playlists', 4, theme),
                    const SizedBox(height: 120),
                  ],
                  
                  if (_showSuggestions)
                    _buildSearchSuggestions(theme),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildCategoryChip(String label, bool isSelected, ThemeData theme) {
    return GestureDetector(
      onTap: () {
        setState(() {
          _selectedCategory = label;
        });
      },
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 8),
        decoration: BoxDecoration(
          color: isSelected
              ? theme.colorScheme.primary
              : const Color(0xFF2A3025).withValues(alpha: 0.8),
          borderRadius: BorderRadius.circular(20),
        ),
        child: Text(
          label,
          style: theme.textTheme.bodyMedium?.copyWith(
            color: isSelected
                ? const Color(0xFF1A1F16)
                : const Color(0xFFB3B3B3),
            fontWeight: isSelected ? FontWeight.w600 : FontWeight.w400,
            fontSize: 14,
          ),
        ),
      ),
    );
  }

  Widget _buildSearchChip(String label, ThemeData theme) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            const Color(0xFF3D4A35).withValues(alpha: 0.7),
            const Color(0xFF2A3025).withValues(alpha: 0.7),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(
          color: Colors.white.withValues(alpha: 0.08),
          width: 1,
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            label,
            style: theme.textTheme.bodyMedium?.copyWith(
              color: theme.colorScheme.onSurface,
              fontWeight: FontWeight.w500,
              fontSize: 14,
            ),
          ),
          const SizedBox(width: 10),
          GestureDetector(
            onTap: () {
              // Remove this search
            },
            child: CustomIconWidget(
              iconName: 'close',
              color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.7),
              size: 16,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTrendingItem(String title, int index, ThemeData theme) {
    return GestureDetector(
      onTap: () {
        // Navigate to trending category
      },
      child: Container(
        margin: const EdgeInsets.only(bottom: 8),
        padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 16),
        decoration: BoxDecoration(
          color: index % 2 == 1 
              ? const Color(0xFF2A3025).withValues(alpha: 0.5)
              : Colors.transparent,
          borderRadius: BorderRadius.circular(12),
        ),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: theme.colorScheme.primary.withValues(alpha: 0.15),
                borderRadius: BorderRadius.circular(8),
              ),
              child: CustomIconWidget(
                iconName: 'trending_up',
                color: theme.colorScheme.primary,
                size: 20,
              ),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Text(
                title,
                style: theme.textTheme.bodyLarge?.copyWith(
                  color: theme.colorScheme.onSurface,
                  fontWeight: FontWeight.w500,
                  fontSize: 16,
                ),
              ),
            ),
            CustomIconWidget(
              iconName: 'arrow_forward_ios',
              color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.6),
              size: 16,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSearchSuggestions(ThemeData theme) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Search Results',
            style: theme.textTheme.titleLarge?.copyWith(
              color: theme.colorScheme.onSurface,
              fontWeight: FontWeight.w700,
            ),
          ),
          const SizedBox(height: 16),
          // Search results will be populated here
          if (_searchQuery.isNotEmpty)
            ..._searchResults.map((result) => _buildSearchResultItem(result, theme)).toList()
          else
            Center(
        child: Column(
          children: [
                  const SizedBox(height: 40),
                  CustomIconWidget(
                    iconName: 'search',
                    color: theme.colorScheme.onSurfaceVariant,
                    size: 48,
                  ),
                  const SizedBox(height: 16),
                  Text(
                    'Start typing to search',
                    style: theme.textTheme.bodyMedium?.copyWith(
                      color: theme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                ],
              ),
            ),
          const SizedBox(height: 120),
        ],
      ),
    );
  }

  Widget _buildSearchResultItem(Map<String, dynamic> result, ThemeData theme) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: const Color(0xFF2A3025).withValues(alpha: 0.5),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(8),
            child: CustomImageWidget(
              imageUrl: result["artwork"] as String,
              width: 50,
              height: 50,
              fit: BoxFit.cover,
              semanticLabel: result["semanticLabel"] as String,
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  result["title"] as String,
                  style: theme.textTheme.bodyLarge?.copyWith(
                    color: theme.colorScheme.onSurface,
                    fontWeight: FontWeight.w500,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(height: 4),
                Text(
                  result["subtitle"] as String,
                  style: theme.textTheme.bodySmall?.copyWith(
                    color: theme.colorScheme.onSurfaceVariant,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ),
          ),
          Text(
            result["duration"] as String,
            style: theme.textTheme.bodySmall?.copyWith(
              color: theme.colorScheme.onSurfaceVariant,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSuggestionsViewSliver(ThemeData theme) {
    return SliverList(
      delegate: SliverChildBuilderDelegate(
        (context, index) {
          final suggestion = _searchSuggestions[index];
          return ListTile(
            leading: CustomIconWidget(
              iconName: 'trending_up',
              color: theme.colorScheme.primary,
              size: 24,
            ),
            title: Text(suggestion, style: theme.textTheme.bodyLarge),
            onTap: () => _onSuggestionTap(suggestion),
          );
        },
        childCount: _searchSuggestions.length,
      ),
    );
  }

  Widget _buildSuggestionsView(ThemeData theme) {
    return ListView.builder(
      padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
      itemCount: _searchSuggestions.length,
      itemBuilder: (context, index) {
        final suggestion = _searchSuggestions[index];
        return ListTile(
          leading: CustomIconWidget(
            iconName: 'trending_up',
            color: theme.colorScheme.primary,
            size: 24,
          ),
          title: Text(suggestion, style: theme.textTheme.bodyLarge),
          onTap: () => _onSuggestionTap(suggestion),
        );
      },
    );
  }

  Widget _buildRecentSearchesSliver(ThemeData theme) {
    if (_recentSearches.isEmpty) {
      return SliverFillRemaining(
        hasScrollBody: false,
        child: EmptySearchStateWidget(),
      );
    }

    return SliverToBoxAdapter(
      child: Padding(
        padding: EdgeInsets.all(4.w),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Recent Searches', style: theme.textTheme.titleLarge),
                TextButton(
                  key: const ValueKey('recent_searches_clear'),
                  onPressed: () {
                    setState(() {
                      _recentSearches.clear();
                    });
                  },
                  child: Text(
                    'Clear All',
                    style: theme.textTheme.labelLarge?.copyWith(
                      color: theme.colorScheme.primary,
                    ),
                  ),
                ),
              ],
            ),
            SizedBox(height: 2.h),
            Wrap(
              spacing: 2.w,
              runSpacing: 1.h,
              children: _recentSearches
                  .map(
                    (search) => RecentSearchChipWidget(
                      label: search,
                      onDeleted: () => _removeRecentSearch(search),
                      onTap: () => _onSuggestionTap(search),
                    ),
                  )
                  .toList(),
            ),
            SizedBox(height: 3.h),
            Text('Trending Searches', style: theme.textTheme.titleLarge),
            SizedBox(height: 2.h),
            ..._searchSuggestions.map(
              (suggestion) => ListTile(
                leading: CustomIconWidget(
                  iconName: 'trending_up',
                  color: theme.colorScheme.primary,
                  size: 24,
                ),
                title: Text(suggestion, style: theme.textTheme.bodyLarge),
                trailing: CustomIconWidget(
                  iconName: 'arrow_forward',
                  color: theme.colorScheme.onSurfaceVariant,
                  size: 20,
                ),
                onTap: () => _onSuggestionTap(suggestion),
              ),
            ),
            SizedBox(height: 100),
          ],
        ),
      ),
    );
  }

  Widget _buildRecentSearches(ThemeData theme) {
    if (_recentSearches.isEmpty) {
      return EmptySearchStateWidget();
    }

    return SingleChildScrollView(
      padding: EdgeInsets.all(4.w),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('Recent Searches', style: theme.textTheme.titleLarge),
              TextButton(
                onPressed: () {
                  setState(() {
                    _recentSearches.clear();
                  });
                },
                child: Text(
                  'Clear All',
                  style: theme.textTheme.labelLarge?.copyWith(
                    color: theme.colorScheme.primary,
                  ),
                ),
              ),
            ],
          ),
          SizedBox(height: 2.h),
          Wrap(
            spacing: 2.w,
            runSpacing: 1.h,
            children: _recentSearches
                .map(
                  (search) => RecentSearchChipWidget(
                    label: search,
                    onDeleted: () => _removeRecentSearch(search),
                    onTap: () => _onSuggestionTap(search),
                  ),
                )
                .toList(),
          ),
          SizedBox(height: 3.h),
          Text('Trending Searches', style: theme.textTheme.titleLarge),
          SizedBox(height: 2.h),
          ..._searchSuggestions.map(
            (suggestion) => ListTile(
              leading: CustomIconWidget(
                iconName: 'trending_up',
                color: theme.colorScheme.primary,
                size: 24,
              ),
              title: Text(suggestion, style: theme.textTheme.bodyLarge),
              trailing: CustomIconWidget(
                iconName: 'arrow_forward',
                color: theme.colorScheme.onSurfaceVariant,
                size: 20,
              ),
              onTap: () => _onSuggestionTap(suggestion),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSearchResultsSliver(ThemeData theme) {
    if (_searchResults.isEmpty) {
      return SliverFillRemaining(
        hasScrollBody: false,
        child: EmptySearchStateWidget(),
      );
    }

    return SliverFillRemaining(
      hasScrollBody: false,
      child: TabBarView(
        controller: _tabController,
        children: [
          _buildResultsList(theme, _searchResults),
          _buildResultsList(
            theme,
            _searchResults.where((item) => item['type'] == 'song').toList(),
          ),
          _buildResultsList(
            theme,
            _searchResults.where((item) => item['type'] == 'album').toList(),
          ),
          _buildResultsList(
            theme,
            _searchResults.where((item) => item['type'] == 'artist').toList(),
          ),
        ],
      ),
    );
  }

  Widget _buildSearchResults(ThemeData theme) {
    if (_searchResults.isEmpty) {
      return EmptySearchStateWidget();
    }

    return TabBarView(
      controller: _tabController,
      children: [
        _buildResultsList(theme, _searchResults),
        _buildResultsList(
          theme,
          _searchResults.where((item) => item['type'] == 'song').toList(),
        ),
        _buildResultsList(
          theme,
          _searchResults.where((item) => item['type'] == 'album').toList(),
        ),
        _buildResultsList(
          theme,
          _searchResults.where((item) => item['type'] == 'artist').toList(),
        ),
      ],
    );
  }

  Widget _buildResultsList(
    ThemeData theme,
    List<Map<String, dynamic>> results,
  ) {
    if (results.isEmpty) {
      return EmptySearchStateWidget();
    }

    return ListView.separated(
      padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
      itemCount: results.length,
      separatorBuilder: (context, index) => SizedBox(height: 1.h),
      itemBuilder: (context, index) {
        final result = results[index];
        return SearchResultCardWidget(
          title: result['title'] as String,
          subtitle: result['subtitle'] as String,
          artwork: result['artwork'] as String,
          semanticLabel: result['semanticLabel'] as String,
          type: result['type'] as String,
          verified: result['verified'] as bool? ?? false,
          duration: result['duration'] as String?,
          onTap: () {
            // Navigate to appropriate detail screen based on type
            final type = result['type'] as String;
            if (type == 'artist') {
              Navigator.pushNamed(context, '/artist-profile');
            } else if (type == 'song') {
              Navigator.pushNamed(context, '/music-player');
            } else if (type == 'playlist') {
              Navigator.pushNamed(context, '/playlist-management');
            }
          },
          onMoreTap: () {
            _showContextMenu(context, result);
          },
        );
      },
    );
  }

  void _showContextMenu(BuildContext context, Map<String, dynamic> item) {
    final theme = Theme.of(context);
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (context) => Container(
        decoration: BoxDecoration(
          color: theme.colorScheme.surface,
          borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              margin: const EdgeInsets.only(top: 12),
              width: 40.w,
              height: 4,
              decoration: BoxDecoration(
                color: theme.colorScheme.onSurfaceVariant.withValues(
                  alpha: 0.3,
                ),
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            ListTile(
              leading: CustomIconWidget(
                iconName: 'play_arrow',
                color: theme.colorScheme.onSurface,
                size: 24,
              ),
              title: Text('Play Next', style: theme.textTheme.bodyLarge),
              onTap: () {
                Navigator.pop(context);
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Added to play next')),
                );
              },
            ),
            ListTile(
              leading: CustomIconWidget(
                iconName: 'queue_music',
                color: theme.colorScheme.onSurface,
                size: 24,
              ),
              title: Text('Add to Queue', style: theme.textTheme.bodyLarge),
              onTap: () {
                Navigator.pop(context);
                ScaffoldMessenger.of(
                  context,
                ).showSnackBar(const SnackBar(content: Text('Added to queue')));
              },
            ),
            ListTile(
              leading: CustomIconWidget(
                iconName: 'share',
                color: theme.colorScheme.onSurface,
                size: 24,
              ),
              title: Text('Share', style: theme.textTheme.bodyLarge),
              onTap: () {
                Navigator.pop(context);
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Share functionality')),
                );
              },
            ),
            SizedBox(height: 2.h),
          ],
        ),
      ),
    );
  }
}
