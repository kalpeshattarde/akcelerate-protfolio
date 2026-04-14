import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/category_chip_widget.dart';
import './widgets/recently_played_widget.dart';
import './widgets/search_overlay_widget.dart';
import './widgets/sleep_timer_modal_widget.dart';
import './widgets/story_card_widget.dart';

class SleepStories extends StatefulWidget {
  const SleepStories({Key? key}) : super(key: key);

  @override
  State<SleepStories> createState() => _SleepStoriesState();
}

class _SleepStoriesState extends State<SleepStories>
    with TickerProviderStateMixin {
  final ScrollController _scrollController = ScrollController();

  bool _isLoading = false;
  bool _showSearchOverlay = false;
  String _selectedCategory = 'All';
  String _searchQuery = '';
  Map<String, dynamic> _appliedFilters = {};
  int _currentHour = DateTime.now().hour;

  final List<String> _storyCategories = [
    'All',
    'Classic Tales',
    'Nature Journeys',
    'Fantasy Adventures',
    'Travel Stories'
  ];

  // Mock sleep stories data
  final List<Map<String, dynamic>> _allStories = [
    {
      "id": 1,
      "title": "Forest Dreams",
      "narrator": "Luna Mitchell",
      "duration": 45,
      "category": "Nature Journeys",
      "thumbnail":
          "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=400",
      "isDownloaded": true,
      "isFavorite": true,
      "description":
          "A peaceful journey through an ancient forest filled with gentle sounds of nature.",
      "rating": 4.8,
      "plays": 18420,
      "sleepTimerCompatible": true,
      "isNew": false,
      "narratorGender": "Female",
      "theme": "Nature"
    },
    {
      "id": 2,
      "title": "The Sleepy Castle",
      "narrator": "Oliver James",
      "duration": 35,
      "category": "Fantasy Adventures",
      "thumbnail":
          "https://images.pexels.com/photos/2387819/pexels-photo-2387819.jpeg?auto=compress&cs=tinysrgb&w=400",
      "isDownloaded": false,
      "isFavorite": false,
      "description":
          "A magical tale of a castle where dreams come true and worries fade away.",
      "rating": 4.9,
      "plays": 23150,
      "sleepTimerCompatible": true,
      "isNew": true,
      "narratorGender": "Male",
      "theme": "Fantasy"
    },
    {
      "id": 3,
      "title": "Ocean Waves Journey",
      "narrator": "Sarah Chen",
      "duration": 60,
      "category": "Nature Journeys",
      "thumbnail":
          "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=400",
      "isDownloaded": true,
      "isFavorite": true,
      "description":
          "Drift away with the gentle rhythm of ocean waves and coastal breezes.",
      "rating": 4.7,
      "plays": 19750,
      "sleepTimerCompatible": true,
      "isNew": false,
      "narratorGender": "Female",
      "theme": "Ocean"
    },
    {
      "id": 4,
      "title": "Grandmother's Stories",
      "narrator": "Margaret Rose",
      "duration": 30,
      "category": "Classic Tales",
      "thumbnail":
          "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=400",
      "isDownloaded": false,
      "isFavorite": false,
      "description":
          "Timeless bedtime stories passed down through generations.",
      "rating": 4.6,
      "plays": 15890,
      "sleepTimerCompatible": true,
      "isNew": false,
      "narratorGender": "Female",
      "theme": "Classic"
    },
    {
      "id": 5,
      "title": "Journey to the Stars",
      "narrator": "David Kim",
      "duration": 50,
      "category": "Fantasy Adventures",
      "thumbnail":
          "https://images.pexels.com/photos/2387819/pexels-photo-2387819.jpeg?auto=compress&cs=tinysrgb&w=400",
      "isDownloaded": true,
      "isFavorite": true,
      "description":
          "A cosmic adventure through galaxies far away, perfect for peaceful sleep.",
      "rating": 4.8,
      "plays": 21340,
      "sleepTimerCompatible": true,
      "isNew": true,
      "narratorGender": "Male",
      "theme": "Space"
    },
    {
      "id": 6,
      "title": "Tuscany Vineyard Walk",
      "narrator": "Isabella Romano",
      "duration": 40,
      "category": "Travel Stories",
      "thumbnail":
          "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=400",
      "isDownloaded": false,
      "isFavorite": false,
      "description":
          "A leisurely stroll through Italian vineyards under the moonlight.",
      "rating": 4.9,
      "plays": 16670,
      "sleepTimerCompatible": true,
      "isNew": true,
      "narratorGender": "Female",
      "theme": "Travel"
    },
    {
      "id": 7,
      "title": "The Sleepy Train",
      "narrator": "Thomas Wright",
      "duration": 25,
      "category": "Travel Stories",
      "thumbnail":
          "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=400",
      "isDownloaded": true,
      "isFavorite": false,
      "description":
          "A gentle train journey through peaceful countryside landscapes.",
      "rating": 4.7,
      "plays": 14580,
      "sleepTimerCompatible": true,
      "isNew": false,
      "narratorGender": "Male",
      "theme": "Travel"
    },
    {
      "id": 8,
      "title": "Secret Garden Dreams",
      "narrator": "Emily Watson",
      "duration": 55,
      "category": "Classic Tales",
      "thumbnail":
          "https://images.pexels.com/photos/2387819/pexels-photo-2387819.jpeg?auto=compress&cs=tinysrgb&w=400",
      "isDownloaded": false,
      "isFavorite": true,
      "description":
          "A reimagining of the classic tale in a dreamy, sleep-inducing format.",
      "rating": 4.8,
      "plays": 22890,
      "sleepTimerCompatible": true,
      "isNew": false,
      "narratorGender": "Female",
      "theme": "Garden"
    },
  ];

  List<Map<String, dynamic>> get _recentlyPlayedStories {
    return _allStories
        .where((story) => [1, 3, 5].contains(story['id']))
        .toList();
  }

  List<Map<String, dynamic>> get _filteredStories {
    List<Map<String, dynamic>> filtered = List.from(_allStories);

    // Apply category filter
    if (_selectedCategory != 'All') {
      filtered =
          filtered.where((s) => s['category'] == _selectedCategory).toList();
    }

    // Apply search filter
    if (_searchQuery.isNotEmpty) {
      filtered = filtered.where((s) {
        final title = (s['title'] as String).toLowerCase();
        final narrator = (s['narrator'] as String).toLowerCase();
        final category = (s['category'] as String).toLowerCase();
        final query = _searchQuery.toLowerCase();

        return title.contains(query) ||
            narrator.contains(query) ||
            category.contains(query);
      }).toList();
    }

    // Apply advanced filters
    if (_appliedFilters.isNotEmpty) {
      filtered = filtered.where((s) {
        bool matches = true;

        // Duration filter
        final duration = s['duration'] as int;
        final minDuration = _appliedFilters['minDuration'] ?? 0;
        final maxDuration = _appliedFilters['maxDuration'] ?? 999;
        if (duration < minDuration || duration > maxDuration) {
          matches = false;
        }

        // Narrator gender filter
        final narratorGender = _appliedFilters['narratorGender'];
        if (narratorGender != null &&
            narratorGender != 'All' &&
            s['narratorGender'] != narratorGender) {
          matches = false;
        }

        // Theme filter
        final theme = _appliedFilters['theme'];
        if (theme != null && theme != 'All' && s['theme'] != theme) {
          matches = false;
        }

        return matches;
      }).toList();
    }

    return filtered;
  }

  @override
  void initState() {
    super.initState();
    _scrollController.addListener(_onScroll);
    _adjustScreenBrightness();
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  void _adjustScreenBrightness() {
    // Automatically dim interface during evening hours (6 PM - 6 AM)
    if (_currentHour >= 18 || _currentHour <= 6) {
      // In a real implementation, you would adjust screen brightness here
    }
  }

  void _onScroll() {
    if (_scrollController.position.pixels ==
        _scrollController.position.maxScrollExtent) {
      _loadMoreStories();
    }
  }

  Future<void> _loadMoreStories() async {
    if (_isLoading) return;

    setState(() {
      _isLoading = true;
    });

    await Future.delayed(const Duration(seconds: 1));

    setState(() {
      _isLoading = false;
    });
  }

  Future<void> _refreshStories() async {
    setState(() {
      _isLoading = true;
    });

    await Future.delayed(const Duration(seconds: 1));

    setState(() {
      _isLoading = false;
    });
  }

  void _toggleFavorite(int storyId) {
    setState(() {
      final index = _allStories.indexWhere((s) => s['id'] == storyId);
      if (index != -1) {
        _allStories[index]['isFavorite'] =
            !(_allStories[index]['isFavorite'] ?? false);
      }
    });
  }

  void _downloadStory(int storyId) {
    setState(() {
      final index = _allStories.indexWhere((s) => s['id'] == storyId);
      if (index != -1) {
        _allStories[index]['isDownloaded'] = true;
      }
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          'Story downloaded successfully',
          style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
            color: AppTheme.lightTheme.colorScheme.onSurface,
          ),
        ),
        backgroundColor: AppTheme.lightTheme.colorScheme.surface,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
    );
  }

  void _addToBedtimeRoutine(Map<String, dynamic> story) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          '"${story['title']}" added to bedtime routine',
          style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
            color: AppTheme.lightTheme.colorScheme.onSurface,
          ),
        ),
        backgroundColor: AppTheme.lightTheme.colorScheme.surface,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
    );
  }

  void _setSleepTimer(Map<String, dynamic> story) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => SleepTimerModalWidget(
        story: story,
        onTimerSet: (duration) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text(
                'Sleep timer set for $duration minutes',
                style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                  color: AppTheme.lightTheme.colorScheme.onSurface,
                ),
              ),
              backgroundColor: AppTheme.lightTheme.colorScheme.surface,
              behavior: SnackBarBehavior.floating,
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12)),
            ),
          );
        },
      ),
    );
  }

  void _playStory(Map<String, dynamic> story) {
    Navigator.pushNamed(context, '/meditation-player', arguments: story);
  }

  void _voiceSearch() {
    setState(() {
      _showSearchOverlay = true;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      body: Stack(
        children: [
          // Main content
          SafeArea(
            child: Column(
              children: [
                // Header
                _buildHeader(),

                // Recently played section (if any)
                if (_recentlyPlayedStories.isNotEmpty)
                  _buildRecentlyPlayedSection(),

                // Category chips
                _buildCategoryChips(),

                // Stories list
                Expanded(
                  child: RefreshIndicator(
                    onRefresh: _refreshStories,
                    color: AppTheme.lightTheme.colorScheme.secondary,
                    backgroundColor: AppTheme.lightTheme.colorScheme.surface,
                    child: _filteredStories.isEmpty
                        ? _buildEmptyState()
                        : ListView.builder(
                            controller: _scrollController,
                            padding: EdgeInsets.only(bottom: 2.h),
                            itemCount:
                                _filteredStories.length + (_isLoading ? 1 : 0),
                            itemBuilder: (context, index) {
                              if (index == _filteredStories.length) {
                                return _buildLoadingIndicator();
                              }

                              final story = _filteredStories[index];
                              return StoryCardWidget(
                                story: story,
                                onTap: () => _playStory(story),
                                onFavoriteToggle: () =>
                                    _toggleFavorite(story['id']),
                                onDownload: () => _downloadStory(story['id']),
                                onAddToBedtimeRoutine: () =>
                                    _addToBedtimeRoutine(story),
                                onSetSleepTimer: () => _setSleepTimer(story),
                              );
                            },
                          ),
                  ),
                ),
              ],
            ),
          ),

          // Search overlay with voice search
          if (_showSearchOverlay)
            SearchOverlayWidget(
              onSearch: (query) {
                setState(() {
                  _searchQuery = query;
                });
              },
              onVoiceSearch: _voiceSearch,
              onClose: () {
                setState(() {
                  _showSearchOverlay = false;
                });
              },
              isDimmed: _currentHour >= 18 || _currentHour <= 6,
            ),
        ],
      ),
    );
  }

  Widget _buildHeader() {
    return Container(
      padding: EdgeInsets.all(4.w),
      child: Row(
        children: [
          Text(
            'Sleep Stories',
            style: AppTheme.lightTheme.textTheme.headlineMedium?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurface,
              fontWeight: FontWeight.w700,
            ),
          ),
          const Spacer(),

          // Filter button
          GestureDetector(
            onTap: _showFilterModal,
            child: Container(
              padding: EdgeInsets.all(2.w),
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.colorScheme.surface
                    .withValues(alpha: 0.8),
                borderRadius: BorderRadius.circular(12),
              ),
              child: CustomIconWidget(
                iconName: 'tune',
                color: AppTheme.lightTheme.colorScheme.onSurface,
                size: 24,
              ),
            ),
          ),

          SizedBox(width: 2.w),

          // Search button (with voice search icon for bedtime)
          GestureDetector(
            onTap: () {
              setState(() {
                _showSearchOverlay = true;
              });
            },
            child: Container(
              padding: EdgeInsets.all(2.w),
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.colorScheme.surface
                    .withValues(alpha: 0.8),
                borderRadius: BorderRadius.circular(12),
              ),
              child: CustomIconWidget(
                iconName: (_currentHour >= 18 || _currentHour <= 6)
                    ? 'mic'
                    : 'search',
                color: AppTheme.lightTheme.colorScheme.onSurface,
                size: 24,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildRecentlyPlayedSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
          child: Text(
            'Recently Played',
            style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurface,
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
        RecentlyPlayedWidget(
          stories: _recentlyPlayedStories,
          onStoryTap: _playStory,
        ),
        SizedBox(height: 1.h),
      ],
    );
  }

  Widget _buildCategoryChips() {
    return Container(
      height: 6.h,
      padding: EdgeInsets.symmetric(horizontal: 4.w),
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        itemCount: _storyCategories.length,
        itemBuilder: (context, index) {
          final category = _storyCategories[index];
          return CategoryChipWidget(
            label: category,
            isSelected: _selectedCategory == category,
            onTap: () {
              setState(() {
                _selectedCategory = category;
              });
            },
          );
        },
      ),
    );
  }

  Widget _buildEmptyState() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          CustomIconWidget(
            iconName: 'bedtime',
            color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
            size: 64,
          ),
          SizedBox(height: 2.h),
          Text(
            'No stories found',
            style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurface,
              fontWeight: FontWeight.w600,
            ),
          ),
          SizedBox(height: 1.h),
          Text(
            'Try adjusting your filters or search terms',
            style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
            ),
            textAlign: TextAlign.center,
          ),
          SizedBox(height: 3.h),
          ElevatedButton(
            onPressed: () {
              setState(() {
                _selectedCategory = 'All';
                _searchQuery = '';
                _appliedFilters.clear();
              });
            },
            child: Text('Clear Filters'),
          ),
        ],
      ),
    );
  }

  Widget _buildLoadingIndicator() {
    return Container(
      padding: EdgeInsets.all(4.w),
      child: Center(
        child: CircularProgressIndicator(
          color: AppTheme.lightTheme.colorScheme.secondary,
        ),
      ),
    );
  }

  void _showFilterModal() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => Container(
        decoration: BoxDecoration(
          color: AppTheme.lightTheme.colorScheme.surface,
          borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              margin: EdgeInsets.only(top: 2.h),
              width: 12.w,
              height: 0.5.h,
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            Padding(
              padding: EdgeInsets.all(4.w),
              child: Text(
                'Filter Stories',
                style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                  color: AppTheme.lightTheme.colorScheme.onSurface,
                ),
              ),
            ),
            // Filter options would go here
            SizedBox(height: 30.h),
          ],
        ),
      ),
    );
  }
}
