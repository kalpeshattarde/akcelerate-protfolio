import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/episode_card_widget.dart';
import './widgets/floating_play_button_widget.dart';
import './widgets/parallax_header_widget.dart';
import './widgets/search_bar_widget.dart';

class PodcastDetailScreen extends StatefulWidget {
  const PodcastDetailScreen({Key? key}) : super(key: key);

  @override
  State<PodcastDetailScreen> createState() => _PodcastDetailScreenState();
}

class _PodcastDetailScreenState extends State<PodcastDetailScreen>
    with TickerProviderStateMixin {
  late ScrollController _scrollController;
  late AnimationController _refreshController;
  late Animation<double> _refreshAnimation;

  bool _isSubscribed = false;
  bool _isPlaying = false;
  bool _isRefreshing = false;
  String _searchQuery = '';
  List<Map<String, dynamic>> _selectedEpisodes = [];
  bool _isMultiSelectMode = false;

  // Mock podcast data
  final Map<String, dynamic> _podcastData = {
    "id": "podcast_001",
    "title": "Tech Innovators Podcast",
    "creator": "Sarah Chen & Marcus Rodriguez",
    "description":
        "Exploring the latest breakthroughs in technology, AI, and innovation with industry leaders and visionary entrepreneurs. Join us weekly for deep dives into the future of tech.",
    "artwork":
        "https://images.unsplash.com/photo-1590736969955-71cc94901144?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
    "subscribers": "125K",
    "rating": "4.8",
    "episodeCount": "156",
    "category": "Technology",
    "language": "English",
    "website": "https://techinnovators.podcast.com"
  };

  // Mock episodes data
  final List<Map<String, dynamic>> _allEpisodes = [
    {
      "id": "ep_001",
      "title": "The Future of Artificial Intelligence with Dr. Emily Watson",
      "description":
          "A comprehensive discussion about the current state and future prospects of AI technology, covering machine learning, neural networks, and ethical considerations in AI development.",
      "thumbnail":
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
      "duration": 3420,
      "publishDate": "July 28, 2025",
      "status": "new",
      "progress": 0.0,
      "downloadSize": "45.2 MB"
    },
    {
      "id": "ep_002",
      "title": "Blockchain Revolution: Beyond Cryptocurrency",
      "description":
          "Exploring blockchain applications beyond digital currency, including supply chain management, healthcare records, and decentralized finance solutions.",
      "thumbnail":
          "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
      "duration": 2880,
      "publishDate": "July 21, 2025",
      "status": "partial",
      "progress": 0.65,
      "downloadSize": "38.7 MB"
    },
    {
      "id": "ep_003",
      "title": "Quantum Computing: The Next Frontier",
      "description":
          "Understanding quantum computing principles, current limitations, and potential applications that could revolutionize computing as we know it.",
      "thumbnail":
          "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
      "duration": 4200,
      "publishDate": "July 14, 2025",
      "status": "completed",
      "progress": 1.0,
      "downloadSize": "52.1 MB"
    },
    {
      "id": "ep_004",
      "title": "Sustainable Tech: Green Innovation for Tomorrow",
      "description":
          "Examining how technology companies are addressing climate change through renewable energy, efficient computing, and sustainable manufacturing practices.",
      "thumbnail":
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
      "duration": 3600,
      "publishDate": "July 7, 2025",
      "status": "new",
      "progress": 0.0,
      "downloadSize": "47.8 MB"
    },
    {
      "id": "ep_005",
      "title": "The Metaverse: Virtual Worlds and Digital Identity",
      "description":
          "Diving deep into virtual reality, augmented reality, and the emerging metaverse ecosystem, discussing opportunities and challenges ahead.",
      "thumbnail":
          "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
      "duration": 3240,
      "publishDate": "June 30, 2025",
      "status": "partial",
      "progress": 0.32,
      "downloadSize": "42.3 MB"
    }
  ];

  List<Map<String, dynamic>> _filteredEpisodes = [];

  @override
  void initState() {
    super.initState();
    _scrollController = ScrollController();
    _refreshController = AnimationController(
      duration: const Duration(milliseconds: 1000),
      vsync: this,
    );
    _refreshAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _refreshController,
      curve: Curves.easeInOut,
    ));

    _filteredEpisodes = List.from(_allEpisodes);
  }

  @override
  void dispose() {
    _scrollController.dispose();
    _refreshController.dispose();
    super.dispose();
  }

  void _handleSubscribe() {
    setState(() {
      _isSubscribed = !_isSubscribed;
    });

    // Show toast notification
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          _isSubscribed
              ? 'Subscribed to ${_podcastData['title']}'
              : 'Unsubscribed from ${_podcastData['title']}',
          style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
            color: AppTheme.lightTheme.colorScheme.onPrimary,
          ),
        ),
        backgroundColor: AppTheme.lightTheme.colorScheme.secondary,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        duration: const Duration(seconds: 2),
      ),
    );
  }

  void _handleShare() {
    // Simulate sharing functionality
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          'Sharing ${_podcastData['title']}...',
          style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
            color: AppTheme.lightTheme.colorScheme.onPrimary,
          ),
        ),
        backgroundColor: AppTheme.lightTheme.colorScheme.primary,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        duration: const Duration(seconds: 2),
      ),
    );
  }

  void _handlePlayPause() {
    setState(() {
      _isPlaying = !_isPlaying;
    });
  }

  void _handleEpisodeTap(Map<String, dynamic> episode) {
    if (_isMultiSelectMode) {
      _toggleEpisodeSelection(episode);
    } else {
      Navigator.pushNamed(context, '/audio-player-screen');
    }
  }

  void _toggleEpisodeSelection(Map<String, dynamic> episode) {
    setState(() {
      final isSelected = _selectedEpisodes.any((e) => e['id'] == episode['id']);
      if (isSelected) {
        _selectedEpisodes.removeWhere((e) => e['id'] == episode['id']);
      } else {
        _selectedEpisodes.add(episode);
      }

      if (_selectedEpisodes.isEmpty) {
        _isMultiSelectMode = false;
      }
    });
  }

  void _handleEpisodeLongPress(Map<String, dynamic> episode) {
    if (!_isMultiSelectMode) {
      setState(() {
        _isMultiSelectMode = true;
        _selectedEpisodes.add(episode);
      });
    }
  }

  void _handleDownload(Map<String, dynamic> episode) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          'Downloading "${episode['title']}"...',
          style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
            color: AppTheme.lightTheme.colorScheme.onPrimary,
          ),
        ),
        backgroundColor: AppTheme.lightTheme.colorScheme.secondary,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        duration: const Duration(seconds: 2),
      ),
    );
  }

  void _handleAddToPlaylist(Map<String, dynamic> episode) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          'Added "${episode['title']}" to playlist',
          style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
            color: AppTheme.lightTheme.colorScheme.onPrimary,
          ),
        ),
        backgroundColor: AppTheme.lightTheme.colorScheme.secondary,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        duration: const Duration(seconds: 2),
      ),
    );
  }

  void _handleShareEpisode(Map<String, dynamic> episode) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          'Sharing "${episode['title']}"...',
          style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
            color: AppTheme.lightTheme.colorScheme.onPrimary,
          ),
        ),
        backgroundColor: AppTheme.lightTheme.colorScheme.primary,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        duration: const Duration(seconds: 2),
      ),
    );
  }

  void _handleSearchChanged(String query) {
    setState(() {
      _searchQuery = query;
      if (query.isEmpty) {
        _filteredEpisodes = List.from(_allEpisodes);
      } else {
        _filteredEpisodes = _allEpisodes.where((episode) {
          final title = (episode['title'] as String).toLowerCase();
          final description = (episode['description'] as String).toLowerCase();
          final searchLower = query.toLowerCase();
          return title.contains(searchLower) ||
              description.contains(searchLower);
        }).toList();
      }
    });
  }

  void _handleSearchClear() {
    setState(() {
      _searchQuery = '';
      _filteredEpisodes = List.from(_allEpisodes);
    });
  }

  Future<void> _handleRefresh() async {
    setState(() {
      _isRefreshing = true;
    });

    _refreshController.forward();

    // Simulate network request
    await Future.delayed(const Duration(seconds: 2));

    setState(() {
      _isRefreshing = false;
    });

    _refreshController.reverse();

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          'Episodes updated',
          style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
            color: AppTheme.lightTheme.colorScheme.onPrimary,
          ),
        ),
        backgroundColor: AppTheme.lightTheme.colorScheme.secondary,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        duration: const Duration(seconds: 1),
      ),
    );
  }

  void _handleBatchDownload() {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          'Downloading ${_selectedEpisodes.length} episodes...',
          style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
            color: AppTheme.lightTheme.colorScheme.onPrimary,
          ),
        ),
        backgroundColor: AppTheme.lightTheme.colorScheme.secondary,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        duration: const Duration(seconds: 2),
      ),
    );

    setState(() {
      _selectedEpisodes.clear();
      _isMultiSelectMode = false;
    });
  }

  void _cancelMultiSelect() {
    setState(() {
      _selectedEpisodes.clear();
      _isMultiSelectMode = false;
    });
  }

  Widget _buildMultiSelectAppBar() {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.secondary.withValues(alpha: 0.1),
        border: Border(
          bottom: BorderSide(
            color:
                AppTheme.lightTheme.colorScheme.outline.withValues(alpha: 0.2),
          ),
        ),
      ),
      child: SafeArea(
        child: Row(
          children: [
            GestureDetector(
              onTap: _cancelMultiSelect,
              child: CustomIconWidget(
                iconName: 'close',
                size: 24,
                color: AppTheme.lightTheme.colorScheme.secondary,
              ),
            ),
            SizedBox(width: 4.w),
            Text(
              '${_selectedEpisodes.length} selected',
              style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                color: AppTheme.lightTheme.colorScheme.secondary,
                fontWeight: FontWeight.w600,
              ),
            ),
            const Spacer(),
            GestureDetector(
              onTap: _handleBatchDownload,
              child: Container(
                padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
                decoration: BoxDecoration(
                  color: AppTheme.lightTheme.colorScheme.secondary,
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    CustomIconWidget(
                      iconName: 'download',
                      size: 16,
                      color: AppTheme.lightTheme.colorScheme.onSecondary,
                    ),
                    SizedBox(width: 1.w),
                    Text(
                      'Download',
                      style:
                          AppTheme.lightTheme.textTheme.labelMedium?.copyWith(
                        color: AppTheme.lightTheme.colorScheme.onSecondary,
                        fontWeight: FontWeight.w600,
                      ),
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

  Widget _buildEpisodesList() {
    return SliverList(
      delegate: SliverChildBuilderDelegate(
        (context, index) {
          final episode = _filteredEpisodes[index];
          final isSelected =
              _selectedEpisodes.any((e) => e['id'] == episode['id']);

          return Container(
            decoration: isSelected
                ? BoxDecoration(
                    color: AppTheme.lightTheme.colorScheme.secondary
                        .withValues(alpha: 0.1),
                    border: Border.all(
                      color: AppTheme.lightTheme.colorScheme.secondary
                          .withValues(alpha: 0.3),
                    ),
                  )
                : null,
            child: EpisodeCardWidget(
              episode: episode,
              onTap: () => _handleEpisodeTap(episode),
              onLongPress: () => _handleEpisodeLongPress(episode),
              onDownload: () => _handleDownload(episode),
              onAddToPlaylist: () => _handleAddToPlaylist(episode),
              onShare: () => _handleShareEpisode(episode),
            ),
          );
        },
        childCount: _filteredEpisodes.length,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      body: Stack(
        children: [
          RefreshIndicator(
            onRefresh: _handleRefresh,
            color: AppTheme.lightTheme.colorScheme.secondary,
            backgroundColor: AppTheme.lightTheme.colorScheme.surface,
            child: CustomScrollView(
              controller: _scrollController,
              physics: const BouncingScrollPhysics(),
              slivers: [
                SliverAppBar(
                  backgroundColor: Colors.transparent,
                  elevation: 0,
                  leading: GestureDetector(
                    onTap: () => Navigator.pop(context),
                    child: Container(
                      margin: EdgeInsets.all(2.w),
                      decoration: BoxDecoration(
                        color: AppTheme.lightTheme.colorScheme.surface
                            .withValues(alpha: 0.9),
                        shape: BoxShape.circle,
                      ),
                      child: CustomIconWidget(
                        iconName: 'arrow_back',
                        size: 24,
                        color: AppTheme.lightTheme.colorScheme.onSurface,
                      ),
                    ),
                  ),
                  actions: [
                    GestureDetector(
                      onTap: () => Navigator.pushNamed(
                          context, '/downloads-and-library'),
                      child: Container(
                        margin: EdgeInsets.all(2.w),
                        decoration: BoxDecoration(
                          color: AppTheme.lightTheme.colorScheme.surface
                              .withValues(alpha: 0.9),
                          shape: BoxShape.circle,
                        ),
                        child: CustomIconWidget(
                          iconName: 'library_music',
                          size: 24,
                          color: AppTheme.lightTheme.colorScheme.onSurface,
                        ),
                      ),
                    ),
                  ],
                  expandedHeight: 0,
                  floating: true,
                  pinned: false,
                ),
                ParallaxHeaderWidget(
                  podcastData: _podcastData,
                  scrollController: _scrollController,
                  onSubscribe: _handleSubscribe,
                  onShare: _handleShare,
                  isSubscribed: _isSubscribed,
                ),
                SliverToBoxAdapter(
                  child: SearchBarWidget(
                    onSearchChanged: _handleSearchChanged,
                    onClear: _handleSearchClear,
                    searchQuery: _searchQuery,
                  ),
                ),
                SliverToBoxAdapter(
                  child: Container(
                    padding:
                        EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
                    child: Row(
                      children: [
                        Text(
                          _searchQuery.isEmpty
                              ? 'Episodes (${_allEpisodes.length})'
                              : 'Results (${_filteredEpisodes.length})',
                          style: AppTheme.lightTheme.textTheme.titleMedium
                              ?.copyWith(
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        const Spacer(),
                        if (_filteredEpisodes.isEmpty &&
                            _searchQuery.isNotEmpty)
                          Text(
                            'No matches found',
                            style: AppTheme.lightTheme.textTheme.bodySmall
                                ?.copyWith(
                              color: AppTheme
                                  .lightTheme.colorScheme.onSurfaceVariant,
                            ),
                          ),
                      ],
                    ),
                  ),
                ),
                _buildEpisodesList(),
                SliverToBoxAdapter(
                  child: SizedBox(height: 20.h),
                ),
              ],
            ),
          ),
          if (_isMultiSelectMode) _buildMultiSelectAppBar(),
          FloatingPlayButtonWidget(
            isPlaying: _isPlaying,
            onPlayPause: _handlePlayPause,
            scrollController: _scrollController,
          ),
        ],
      ),
    );
  }
}
