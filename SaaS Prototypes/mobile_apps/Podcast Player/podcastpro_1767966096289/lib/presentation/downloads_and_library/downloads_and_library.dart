import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/category_section.dart';
import './widgets/episode_download_card.dart';
import './widgets/floating_action_bar.dart';
import './widgets/search_filter_bar.dart';
import './widgets/storage_overview_card.dart';

class DownloadsAndLibrary extends StatefulWidget {
  const DownloadsAndLibrary({Key? key}) : super(key: key);

  @override
  State<DownloadsAndLibrary> createState() => _DownloadsAndLibraryState();
}

class _DownloadsAndLibraryState extends State<DownloadsAndLibrary>
    with TickerProviderStateMixin {
  late TabController _tabController;
  final ScrollController _scrollController = ScrollController();

  String _searchQuery = '';
  bool _isMultiSelectMode = false;
  Set<String> _selectedEpisodes = {};
  Map<String, bool> _expandedCategories = {};
  bool _hasActiveFilters = false;

  // Mock data for downloads
  final List<Map<String, dynamic>> _downloadedEpisodes = [
    {
      "id": "1",
      "title": "The Future of AI in Healthcare: Transforming Patient Care",
      "podcastName": "Tech Insights Weekly",
      "thumbnail":
          "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop",
      "duration": "45:32",
      "fileSize": 52.3 * 1024 * 1024,
      "downloadStatus": "completed",
      "downloadProgress": 1.0,
      "downloadDate": "Today",
      "category": "Technology",
    },
    {
      "id": "2",
      "title": "Mindfulness and Mental Health: A Deep Dive",
      "podcastName": "Wellness Journey",
      "thumbnail":
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
      "duration": "38:15",
      "fileSize": 44.7 * 1024 * 1024,
      "downloadStatus": "downloading",
      "downloadProgress": 0.65,
      "downloadDate": "Yesterday",
      "category": "Health",
    },
    {
      "id": "3",
      "title": "Startup Success Stories: From Idea to IPO",
      "podcastName": "Entrepreneur's Corner",
      "thumbnail":
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      "duration": "52:18",
      "fileSize": 61.2 * 1024 * 1024,
      "downloadStatus": "completed",
      "downloadProgress": 1.0,
      "downloadDate": "2 days ago",
      "category": "Business",
    },
    {
      "id": "4",
      "title": "Climate Change Solutions: What We Can Do Now",
      "podcastName": "Green Planet",
      "thumbnail":
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop",
      "duration": "41:27",
      "fileSize": 48.9 * 1024 * 1024,
      "downloadStatus": "queued",
      "downloadProgress": 0.0,
      "downloadDate": "3 days ago",
      "category": "Environment",
    },
    {
      "id": "5",
      "title": "The Art of Storytelling in Modern Media",
      "podcastName": "Creative Minds",
      "thumbnail":
          "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop",
      "duration": "36:42",
      "fileSize": 42.1 * 1024 * 1024,
      "downloadStatus": "failed",
      "downloadProgress": 0.0,
      "downloadDate": "1 week ago",
      "category": "Arts",
    },
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    _initializeExpandedCategories();
  }

  @override
  void dispose() {
    _tabController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  void _initializeExpandedCategories() {
    final categories = _getCategories();
    for (String category in categories) {
      _expandedCategories[category] = false;
    }
  }

  List<String> _getCategories() {
    return _downloadedEpisodes
        .map((episode) => episode['category'] as String)
        .toSet()
        .toList();
  }

  List<Map<String, dynamic>> _getFilteredEpisodes() {
    if (_searchQuery.isEmpty) {
      return _downloadedEpisodes;
    }

    return _downloadedEpisodes.where((episode) {
      final title = (episode['title'] as String).toLowerCase();
      final podcastName = (episode['podcastName'] as String).toLowerCase();
      final query = _searchQuery.toLowerCase();

      return title.contains(query) || podcastName.contains(query);
    }).toList();
  }

  Map<String, List<Map<String, dynamic>>> _getCategorizedEpisodes() {
    final filteredEpisodes = _getFilteredEpisodes();
    final Map<String, List<Map<String, dynamic>>> categorized = {};

    for (final episode in filteredEpisodes) {
      final category = episode['category'] as String;
      if (!categorized.containsKey(category)) {
        categorized[category] = [];
      }
      categorized[category]!.add(episode);
    }

    return categorized;
  }

  double _getTotalStorageUsed() {
    return _downloadedEpisodes
        .where((episode) => episode['downloadStatus'] == 'completed')
        .fold(0.0, (sum, episode) => sum + (episode['fileSize'] as double));
  }

  void _toggleMultiSelectMode() {
    setState(() {
      _isMultiSelectMode = !_isMultiSelectMode;
      if (!_isMultiSelectMode) {
        _selectedEpisodes.clear();
      }
    });
  }

  void _toggleEpisodeSelection(String episodeId) {
    setState(() {
      if (_selectedEpisodes.contains(episodeId)) {
        _selectedEpisodes.remove(episodeId);
      } else {
        _selectedEpisodes.add(episodeId);
      }

      if (_selectedEpisodes.isEmpty) {
        _isMultiSelectMode = false;
      }
    });
  }

  void _selectAllEpisodes() {
    setState(() {
      _selectedEpisodes = _getFilteredEpisodes()
          .map((episode) => episode['id'] as String)
          .toSet();
    });
  }

  void _clearSelection() {
    setState(() {
      _selectedEpisodes.clear();
      _isMultiSelectMode = false;
    });
  }

  void _deleteSelectedEpisodes() {
    // Show confirmation dialog
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Delete Episodes'),
          content: Text(
              'Are you sure you want to delete ${_selectedEpisodes.length} episodes?'),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: Text('Cancel'),
            ),
            TextButton(
              onPressed: () {
                // Handle deletion
                Navigator.of(context).pop();
                _clearSelection();
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content:
                        Text('${_selectedEpisodes.length} episodes deleted'),
                    action: SnackBarAction(
                      label: 'Undo',
                      onPressed: () {
                        // Handle undo
                      },
                    ),
                  ),
                );
              },
              child: Text('Delete', style: TextStyle(color: Colors.red)),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final totalStorage = 32.0 * 1024 * 1024 * 1024; // 32 GB
    final usedStorage = _getTotalStorageUsed();
    final categorizedEpisodes = _getCategorizedEpisodes();

    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      appBar: AppBar(
        title: Text('Downloads & Library'),
        actions: [
          if (!_isMultiSelectMode)
            IconButton(
              onPressed: _toggleMultiSelectMode,
              icon: CustomIconWidget(
                iconName: 'checklist',
                size: 6.w,
                color: Theme.of(context).colorScheme.onSurface,
              ),
            ),
          IconButton(
            onPressed: () {
              Navigator.pushNamed(context, '/audio-player-screen');
            },
            icon: CustomIconWidget(
              iconName: 'queue_music',
              size: 6.w,
              color: Theme.of(context).colorScheme.onSurface,
            ),
          ),
        ],
        bottom: TabBar(
          controller: _tabController,
          tabs: const [
            Tab(text: 'Downloads'),
            Tab(text: 'Library'),
          ],
        ),
      ),
      body: Stack(
        children: [
          Column(
            children: [
              SearchFilterBar(
                searchQuery: _searchQuery,
                onSearchChanged: (query) {
                  setState(() {
                    _searchQuery = query;
                  });
                },
                onFilterTap: () {
                  // Show filter bottom sheet
                  _showFilterBottomSheet();
                },
                hasActiveFilters: _hasActiveFilters,
              ),
              Expanded(
                child: TabBarView(
                  controller: _tabController,
                  children: [
                    _buildDownloadsTab(
                        usedStorage, totalStorage, categorizedEpisodes),
                    _buildLibraryTab(),
                  ],
                ),
              ),
            ],
          ),
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: FloatingActionBar(
              selectedCount: _selectedEpisodes.length,
              onDeleteSelected: _deleteSelectedEpisodes,
              onShareSelected: () {
                // Handle share
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                      content:
                          Text('Sharing ${_selectedEpisodes.length} episodes')),
                );
              },
              onAddToPlaylist: () {
                // Handle add to playlist
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                      content: Text(
                          'Added ${_selectedEpisodes.length} episodes to playlist')),
                );
              },
              onSelectAll: _selectAllEpisodes,
              onClearSelection: _clearSelection,
            ),
          ),
        ],
      ),
      bottomNavigationBar: _buildBottomNavigationBar(),
    );
  }

  Widget _buildDownloadsTab(double usedStorage, double totalStorage,
      Map<String, List<Map<String, dynamic>>> categorizedEpisodes) {
    return RefreshIndicator(
      onRefresh: () async {
        // Handle refresh
        await Future.delayed(const Duration(seconds: 1));
      },
      child: CustomScrollView(
        controller: _scrollController,
        slivers: [
          SliverToBoxAdapter(
            child: StorageOverviewCard(
              usedStorage: usedStorage,
              totalStorage: totalStorage,
              onCleanupTap: () {
                _showCleanupBottomSheet();
              },
            ),
          ),
          if (_searchQuery.isEmpty)
            ...categorizedEpisodes.entries.map((entry) {
              final category = entry.key;
              final episodes = entry.value;

              return SliverToBoxAdapter(
                child: CategorySection(
                  title: category,
                  episodes: episodes,
                  isExpanded: _expandedCategories[category] ?? false,
                  onToggleExpanded: () {
                    setState(() {
                      _expandedCategories[category] =
                          !(_expandedCategories[category] ?? false);
                    });
                  },
                  onEpisodeTap: (episode) {
                    if (_isMultiSelectMode) {
                      _toggleEpisodeSelection(episode['id'] as String);
                    } else {
                      Navigator.pushNamed(context, '/audio-player-screen');
                    }
                  },
                  onEpisodeLongPress: (episode) {
                    if (!_isMultiSelectMode) {
                      setState(() {
                        _isMultiSelectMode = true;
                      });
                    }
                    _toggleEpisodeSelection(episode['id'] as String);
                  },
                ),
              );
            }).toList()
          else
            SliverList(
              delegate: SliverChildBuilderDelegate(
                (context, index) {
                  final episode = _getFilteredEpisodes()[index];
                  return EpisodeDownloadCard(
                    episode: episode,
                    isSelected: _selectedEpisodes.contains(episode['id']),
                    onTap: () {
                      if (_isMultiSelectMode) {
                        _toggleEpisodeSelection(episode['id'] as String);
                      } else {
                        Navigator.pushNamed(context, '/audio-player-screen');
                      }
                    },
                    onLongPress: () {
                      if (!_isMultiSelectMode) {
                        setState(() {
                          _isMultiSelectMode = true;
                        });
                      }
                      _toggleEpisodeSelection(episode['id'] as String);
                    },
                    onDelete: () {
                      _showDeleteConfirmation(episode);
                    },
                    onShare: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                            content: Text('Sharing "${episode['title']}"')),
                      );
                    },
                    onAddToPlaylist: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                            content: Text(
                                'Added "${episode['title']}" to playlist')),
                      );
                    },
                  );
                },
                childCount: _getFilteredEpisodes().length,
              ),
            ),
          SliverToBoxAdapter(
            child: SizedBox(height: _selectedEpisodes.isNotEmpty ? 20.h : 10.h),
          ),
        ],
      ),
    );
  }

  Widget _buildLibraryTab() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          CustomIconWidget(
            iconName: 'library_music',
            size: 20.w,
            color: Theme.of(context).colorScheme.onSurfaceVariant,
          ),
          SizedBox(height: 2.h),
          Text(
            'Your Library',
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
          ),
          SizedBox(height: 1.h),
          Text(
            'Playlists, favorites, and listening history\nwill appear here',
            textAlign: TextAlign.center,
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: Theme.of(context).colorScheme.onSurfaceVariant,
                ),
          ),
          SizedBox(height: 4.h),
          ElevatedButton(
            onPressed: () {
              Navigator.pushNamed(context, '/search-and-discovery');
            },
            child: Text('Discover Podcasts'),
          ),
        ],
      ),
    );
  }

  Widget _buildBottomNavigationBar() {
    return BottomNavigationBar(
      type: BottomNavigationBarType.fixed,
      currentIndex: 3, // Downloads & Library is active
      onTap: (index) {
        switch (index) {
          case 0:
            Navigator.pushReplacementNamed(context, '/home-dashboard');
            break;
          case 1:
            Navigator.pushReplacementNamed(context, '/search-and-discovery');
            break;
          case 2:
            Navigator.pushNamed(context, '/audio-player-screen');
            break;
          case 3:
            // Current screen
            break;
        }
      },
      items: [
        BottomNavigationBarItem(
          icon: CustomIconWidget(
            iconName: 'home',
            size: 6.w,
            color: Theme.of(context).colorScheme.onSurfaceVariant,
          ),
          activeIcon: CustomIconWidget(
            iconName: 'home',
            size: 6.w,
            color: AppTheme.lightTheme.colorScheme.secondary,
          ),
          label: 'Home',
        ),
        BottomNavigationBarItem(
          icon: CustomIconWidget(
            iconName: 'search',
            size: 6.w,
            color: Theme.of(context).colorScheme.onSurfaceVariant,
          ),
          activeIcon: CustomIconWidget(
            iconName: 'search',
            size: 6.w,
            color: AppTheme.lightTheme.colorScheme.secondary,
          ),
          label: 'Search',
        ),
        BottomNavigationBarItem(
          icon: CustomIconWidget(
            iconName: 'play_circle',
            size: 6.w,
            color: Theme.of(context).colorScheme.onSurfaceVariant,
          ),
          activeIcon: CustomIconWidget(
            iconName: 'play_circle',
            size: 6.w,
            color: AppTheme.lightTheme.colorScheme.secondary,
          ),
          label: 'Player',
        ),
        BottomNavigationBarItem(
          icon: CustomIconWidget(
            iconName: 'download',
            size: 6.w,
            color: AppTheme.lightTheme.colorScheme.secondary,
          ),
          activeIcon: CustomIconWidget(
            iconName: 'download',
            size: 6.w,
            color: AppTheme.lightTheme.colorScheme.secondary,
          ),
          label: 'Library',
        ),
      ],
    );
  }

  void _showFilterBottomSheet() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => Container(
        height: 60.h,
        decoration: BoxDecoration(
          color: Theme.of(context).cardColor,
          borderRadius: const BorderRadius.only(
            topLeft: Radius.circular(20),
            topRight: Radius.circular(20),
          ),
        ),
        child: Column(
          children: [
            Container(
              margin: EdgeInsets.only(top: 2.h),
              width: 10.w,
              height: 0.5.h,
              decoration: BoxDecoration(
                color: Theme.of(context).colorScheme.onSurfaceVariant,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            Padding(
              padding: EdgeInsets.all(4.w),
              child: Text(
                'Filter Downloads',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
              ),
            ),
            Expanded(
              child: ListView(
                padding: EdgeInsets.symmetric(horizontal: 4.w),
                children: [
                  _buildFilterSection('Status',
                      ['All', 'Downloaded', 'Downloading', 'Queued', 'Failed']),
                  _buildFilterSection('Category', _getCategories()),
                  _buildFilterSection('Date', [
                    'Today',
                    'Yesterday',
                    'This Week',
                    'This Month',
                    'Older'
                  ]),
                ],
              ),
            ),
            Padding(
              padding: EdgeInsets.all(4.w),
              child: Row(
                children: [
                  Expanded(
                    child: OutlinedButton(
                      onPressed: () {
                        setState(() {
                          _hasActiveFilters = false;
                        });
                        Navigator.pop(context);
                      },
                      child: Text('Clear All'),
                    ),
                  ),
                  SizedBox(width: 4.w),
                  Expanded(
                    child: ElevatedButton(
                      onPressed: () {
                        setState(() {
                          _hasActiveFilters = true;
                        });
                        Navigator.pop(context);
                      },
                      child: Text('Apply Filters'),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildFilterSection(String title, List<String> options) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: EdgeInsets.symmetric(vertical: 2.h),
          child: Text(
            title,
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
          ),
        ),
        Wrap(
          spacing: 2.w,
          runSpacing: 1.h,
          children: options.map((option) {
            return FilterChip(
              label: Text(option),
              selected: false,
              onSelected: (selected) {
                // Handle filter selection
              },
            );
          }).toList(),
        ),
        SizedBox(height: 2.h),
      ],
    );
  }

  void _showCleanupBottomSheet() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => Container(
        height: 50.h,
        decoration: BoxDecoration(
          color: Theme.of(context).cardColor,
          borderRadius: const BorderRadius.only(
            topLeft: Radius.circular(20),
            topRight: Radius.circular(20),
          ),
        ),
        child: Column(
          children: [
            Container(
              margin: EdgeInsets.only(top: 2.h),
              width: 10.w,
              height: 0.5.h,
              decoration: BoxDecoration(
                color: Theme.of(context).colorScheme.onSurfaceVariant,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            Padding(
              padding: EdgeInsets.all(4.w),
              child: Text(
                'Storage Cleanup',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
              ),
            ),
            Expanded(
              child: ListView(
                padding: EdgeInsets.symmetric(horizontal: 4.w),
                children: [
                  _buildCleanupOption(
                    'Delete old episodes',
                    'Episodes older than 30 days',
                    '1.2 GB',
                    () {},
                  ),
                  _buildCleanupOption(
                    'Remove failed downloads',
                    'Clear failed download attempts',
                    '45 MB',
                    () {},
                  ),
                  _buildCleanupOption(
                    'Clear cache',
                    'Temporary files and thumbnails',
                    '156 MB',
                    () {},
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCleanupOption(
      String title, String subtitle, String size, VoidCallback onTap) {
    return ListTile(
      title: Text(title),
      subtitle: Text(subtitle),
      trailing: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            size,
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
                  fontWeight: FontWeight.w600,
                  color: AppTheme.lightTheme.colorScheme.secondary,
                ),
          ),
          Text(
            'free up',
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  color: Theme.of(context).colorScheme.onSurfaceVariant,
                ),
          ),
        ],
      ),
      onTap: onTap,
    );
  }

  void _showDeleteConfirmation(Map<String, dynamic> episode) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Delete Episode'),
          content:
              Text('Are you sure you want to delete "${episode['title']}"?'),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: Text('Cancel'),
            ),
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content: Text('Episode deleted'),
                    action: SnackBarAction(
                      label: 'Undo',
                      onPressed: () {
                        // Handle undo
                      },
                    ),
                  ),
                );
              },
              child: Text('Delete', style: TextStyle(color: Colors.red)),
            ),
          ],
        );
      },
    );
  }
}
