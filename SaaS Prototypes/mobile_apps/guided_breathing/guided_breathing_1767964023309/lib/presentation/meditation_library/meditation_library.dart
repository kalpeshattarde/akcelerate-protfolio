import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/filter_chip_widget.dart';
import './widgets/filter_modal_widget.dart';
import './widgets/meditation_card_widget.dart';
import './widgets/search_overlay_widget.dart';

class MeditationLibrary extends StatefulWidget {
  const MeditationLibrary({Key? key}) : super(key: key);

  @override
  State<MeditationLibrary> createState() => _MeditationLibraryState();
}

class _MeditationLibraryState extends State<MeditationLibrary>
    with TickerProviderStateMixin {
  final ScrollController _scrollController = ScrollController();
  final RefreshIndicator _refreshIndicator = RefreshIndicator(
    onRefresh: () async {},
    child: Container(),
  );

  bool _isLoading = false;
  bool _showSearchOverlay = false;
  String _selectedFilter = 'All';
  String _searchQuery = '';
  Map<String, dynamic> _appliedFilters = {};

  final List<String> _filterCategories = [
    'All',
    'New',
    'Sleep',
    'Anxiety',
    'Relaxation',
    'Focus'
  ];

  // Mock meditation data
  final List<Map<String, dynamic>> _allMeditations = [
    {
      "id": 1,
      "title": "Deep Sleep Journey",
      "instructor": "Sarah Johnson",
      "duration": 45,
      "difficulty": "Beginner",
      "category": "Sleep",
      "thumbnail":
          "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400",
      "isFavorite": true,
      "isDownloaded": true,
      "description":
          "A gentle guided meditation to help you drift into peaceful, restorative sleep.",
      "rating": 4.8,
      "plays": 15420,
      "isNew": false,
    },
    {
      "id": 2,
      "title": "Anxiety Relief Breathing",
      "instructor": "Michael Chen",
      "duration": 15,
      "difficulty": "Beginner",
      "category": "Anxiety",
      "thumbnail":
          "https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=400",
      "isFavorite": false,
      "isDownloaded": false,
      "description":
          "Quick and effective breathing techniques to calm anxiety and restore inner peace.",
      "rating": 4.9,
      "plays": 23150,
      "isNew": true,
    },
    {
      "id": 3,
      "title": "Morning Mindfulness",
      "instructor": "Emma Williams",
      "duration": 20,
      "difficulty": "Intermediate",
      "category": "Focus",
      "thumbnail":
          "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400",
      "isFavorite": true,
      "isDownloaded": true,
      "description":
          "Start your day with clarity and intention through mindful awareness practices.",
      "rating": 4.7,
      "plays": 18750,
      "isNew": false,
    },
    {
      "id": 4,
      "title": "Stress Release Meditation",
      "instructor": "David Rodriguez",
      "duration": 30,
      "difficulty": "Intermediate",
      "category": "Relaxation",
      "thumbnail":
          "https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=400",
      "isFavorite": false,
      "isDownloaded": false,
      "description":
          "Release tension and stress with this comprehensive relaxation meditation.",
      "rating": 4.6,
      "plays": 12890,
      "isNew": true,
    },
    {
      "id": 5,
      "title": "Body Scan Relaxation",
      "instructor": "Sarah Johnson",
      "duration": 25,
      "difficulty": "Beginner",
      "category": "Relaxation",
      "thumbnail":
          "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400",
      "isFavorite": true,
      "isDownloaded": false,
      "description":
          "Progressive body scan to release physical tension and promote deep relaxation.",
      "rating": 4.8,
      "plays": 19340,
      "isNew": false,
    },
    {
      "id": 6,
      "title": "Focus Enhancement",
      "instructor": "Michael Chen",
      "duration": 18,
      "difficulty": "Advanced",
      "category": "Focus",
      "thumbnail":
          "https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=400",
      "isFavorite": false,
      "isDownloaded": true,
      "description":
          "Advanced concentration techniques to sharpen mental focus and clarity.",
      "rating": 4.9,
      "plays": 14670,
      "isNew": true,
    },
    {
      "id": 7,
      "title": "Bedtime Stories for Adults",
      "instructor": "Emma Williams",
      "duration": 35,
      "difficulty": "Beginner",
      "category": "Sleep",
      "thumbnail":
          "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400",
      "isFavorite": true,
      "isDownloaded": false,
      "description":
          "Soothing narratives designed to guide you gently into peaceful sleep.",
      "rating": 4.7,
      "plays": 21580,
      "isNew": false,
    },
    {
      "id": 8,
      "title": "Panic Attack Relief",
      "instructor": "David Rodriguez",
      "duration": 10,
      "difficulty": "Beginner",
      "category": "Anxiety",
      "thumbnail":
          "https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=400",
      "isFavorite": false,
      "isDownloaded": true,
      "description":
          "Immediate relief techniques for managing panic attacks and acute anxiety.",
      "rating": 4.9,
      "plays": 16890,
      "isNew": true,
    },
  ];

  List<Map<String, dynamic>> get _filteredMeditations {
    List<Map<String, dynamic>> filtered = List.from(_allMeditations);

    // Apply category filter
    if (_selectedFilter != 'All') {
      if (_selectedFilter == 'New') {
        filtered = filtered.where((m) => m['isNew'] == true).toList();
      } else {
        filtered =
            filtered.where((m) => m['category'] == _selectedFilter).toList();
      }
    }

    // Apply search filter
    if (_searchQuery.isNotEmpty) {
      filtered = filtered.where((m) {
        final title = (m['title'] as String).toLowerCase();
        final instructor = (m['instructor'] as String).toLowerCase();
        final category = (m['category'] as String).toLowerCase();
        final query = _searchQuery.toLowerCase();

        return title.contains(query) ||
            instructor.contains(query) ||
            category.contains(query);
      }).toList();
    }

    // Apply advanced filters
    if (_appliedFilters.isNotEmpty) {
      filtered = filtered.where((m) {
        bool matches = true;

        // Duration filter
        final duration = m['duration'] as int;
        final minDuration = _appliedFilters['minDuration'] ?? 0;
        final maxDuration = _appliedFilters['maxDuration'] ?? 999;
        if (duration < minDuration || duration > maxDuration) {
          matches = false;
        }

        // Instructor filter
        final instructor = _appliedFilters['instructor'];
        if (instructor != null &&
            instructor != 'All' &&
            m['instructor'] != instructor) {
          matches = false;
        }

        // Difficulty filter
        final difficulty = _appliedFilters['difficulty'];
        if (difficulty != null &&
            difficulty != 'All' &&
            m['difficulty'] != difficulty) {
          matches = false;
        }

        // Recently added filter
        final recentlyAdded = _appliedFilters['recentlyAdded'] ?? false;
        if (recentlyAdded && m['isNew'] != true) {
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
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  void _onScroll() {
    if (_scrollController.position.pixels ==
        _scrollController.position.maxScrollExtent) {
      _loadMoreMeditations();
    }
  }

  Future<void> _loadMoreMeditations() async {
    if (_isLoading) return;

    setState(() {
      _isLoading = true;
    });

    // Simulate loading delay
    await Future.delayed(const Duration(seconds: 1));

    setState(() {
      _isLoading = false;
    });
  }

  Future<void> _refreshMeditations() async {
    setState(() {
      _isLoading = true;
    });

    // Simulate refresh delay
    await Future.delayed(const Duration(seconds: 1));

    setState(() {
      _isLoading = false;
    });
  }

  void _toggleFavorite(int meditationId) {
    setState(() {
      final index = _allMeditations.indexWhere((m) => m['id'] == meditationId);
      if (index != -1) {
        _allMeditations[index]['isFavorite'] =
            !(_allMeditations[index]['isFavorite'] ?? false);
      }
    });
  }

  void _downloadMeditation(int meditationId) {
    setState(() {
      final index = _allMeditations.indexWhere((m) => m['id'] == meditationId);
      if (index != -1) {
        _allMeditations[index]['isDownloaded'] = true;
      }
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          'Meditation downloaded successfully',
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

  void _shareMeditation(Map<String, dynamic> meditation) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          'Sharing "${meditation['title']}"',
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

  void _openMeditationPlayer(Map<String, dynamic> meditation) {
    Navigator.pushNamed(context, '/meditation-player');
  }

  void _showFilterModal() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => FilterModalWidget(
        currentFilters: _appliedFilters,
        onApplyFilters: (filters) {
          setState(() {
            _appliedFilters = filters;
          });
        },
      ),
    );
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

                // Filter chips
                _buildFilterChips(),

                // Meditation list
                Expanded(
                  child: RefreshIndicator(
                    onRefresh: _refreshMeditations,
                    color: AppTheme.lightTheme.colorScheme.secondary,
                    backgroundColor: AppTheme.lightTheme.colorScheme.surface,
                    child: _filteredMeditations.isEmpty
                        ? _buildEmptyState()
                        : ListView.builder(
                            controller: _scrollController,
                            padding: EdgeInsets.only(bottom: 2.h),
                            itemCount: _filteredMeditations.length +
                                (_isLoading ? 1 : 0),
                            itemBuilder: (context, index) {
                              if (index == _filteredMeditations.length) {
                                return _buildLoadingIndicator();
                              }

                              final meditation = _filteredMeditations[index];
                              return MeditationCardWidget(
                                meditation: meditation,
                                onTap: () => _openMeditationPlayer(meditation),
                                onFavoriteToggle: () =>
                                    _toggleFavorite(meditation['id']),
                                onDownload: () =>
                                    _downloadMeditation(meditation['id']),
                                onShare: () => _shareMeditation(meditation),
                              );
                            },
                          ),
                  ),
                ),
              ],
            ),
          ),

          // Search overlay
          if (_showSearchOverlay)
            SearchOverlayWidget(
              onSearch: (query) {
                setState(() {
                  _searchQuery = query;
                });
              },
              onClose: () {
                setState(() {
                  _showSearchOverlay = false;
                });
              },
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
            'Meditation Library',
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

          // Search button
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
                iconName: 'search',
                color: AppTheme.lightTheme.colorScheme.onSurface,
                size: 24,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFilterChips() {
    return Container(
      height: 6.h,
      padding: EdgeInsets.symmetric(horizontal: 4.w),
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        itemCount: _filterCategories.length,
        itemBuilder: (context, index) {
          final category = _filterCategories[index];
          return FilterChipWidget(
            label: category,
            isSelected: _selectedFilter == category,
            onTap: () {
              setState(() {
                _selectedFilter = category;
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
            iconName: 'search_off',
            color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
            size: 64,
          ),
          SizedBox(height: 2.h),
          Text(
            'No meditations found',
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
                _selectedFilter = 'All';
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
}
