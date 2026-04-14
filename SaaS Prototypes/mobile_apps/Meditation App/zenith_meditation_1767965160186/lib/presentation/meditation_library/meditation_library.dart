import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/category_chips_widget.dart';
import './widgets/filter_modal_widget.dart';
import './widgets/meditation_card_widget.dart';
import './widgets/search_bar_widget.dart';

class MeditationLibrary extends StatefulWidget {
  const MeditationLibrary({Key? key}) : super(key: key);

  @override
  State<MeditationLibrary> createState() => _MeditationLibraryState();
}

class _MeditationLibraryState extends State<MeditationLibrary> {
  final ScrollController _scrollController = ScrollController();
  final List<String> _categories = [
    'All',
    'Beginner',
    'Stress Relief',
    'Sleep',
    'Focus',
    'Anxiety',
  ];

  String _selectedCategory = 'All';
  String _searchQuery = '';
  Map<String, dynamic> _currentFilters = {
    'minDuration': 5.0,
    'maxDuration': 60.0,
    'difficulties': <String>[],
    'instructors': <String>[],
    'minRating': 0.0,
    'showOnlyDownloaded': false,
    'showOnlyFavorites': false,
  };

  bool _isLoading = false;
  bool _hasMoreContent = true;
  int _currentPage = 1;

  // Mock meditation data
  final List<Map<String, dynamic>> _allMeditations = [
    {
      "id": 1,
      "title": "Morning Mindfulness",
      "instructor": "Sarah Johnson",
      "instructorPhoto":
          "https://img.rocket.new/generatedImages/rocket_gen_img_1ae7d9bdc-1762274136565.png",
      "instructorPhotoSemanticLabel":
          "Professional headshot of a woman with shoulder-length brown hair wearing a white blouse, smiling warmly at the camera",
      "duration": 15,
      "difficulty": "Beginner",
      "rating": 4.8,
      "playCount": 12450,
      "isBookmarked": true,
      "isDownloaded": true,
      "category": "Beginner",
      "description":
          "Start your day with clarity and intention through this gentle morning meditation practice."
    },
    {
      "id": 2,
      "title": "Deep Sleep Journey",
      "instructor": "Michael Chen",
      "instructorPhoto":
          "https://img.rocket.new/generatedImages/rocket_gen_img_1b2720bf6-1762273579122.png",
      "instructorPhotoSemanticLabel":
          "Portrait of an Asian man with short black hair wearing a dark blue shirt, looking directly at camera with a gentle expression",
      "duration": 45,
      "difficulty": "Intermediate",
      "rating": 4.9,
      "playCount": 8920,
      "isBookmarked": false,
      "isDownloaded": false,
      "category": "Sleep",
      "description":
          "Drift into peaceful slumber with this comprehensive sleep meditation designed for deep rest."
    },
    {
      "id": 3,
      "title": "Stress Release Meditation",
      "instructor": "Emma Williams",
      "instructorPhoto":
          "https://images.unsplash.com/photo-1717807670946-c793b0dc6392",
      "instructorPhotoSemanticLabel":
          "Close-up portrait of a young woman with curly blonde hair and blue eyes, wearing a light pink top, smiling softly",
      "duration": 20,
      "difficulty": "Beginner",
      "rating": 4.7,
      "playCount": 15670,
      "isBookmarked": true,
      "isDownloaded": true,
      "category": "Stress Relief",
      "description":
          "Release tension and find inner calm with this powerful stress-relief meditation session."
    },
    {
      "id": 4,
      "title": "Focus Enhancement",
      "instructor": "David Rodriguez",
      "instructorPhoto":
          "https://img.rocket.new/generatedImages/rocket_gen_img_1b9a68aeb-1762248921203.png",
      "instructorPhotoSemanticLabel":
          "Professional portrait of a Hispanic man with short dark hair and beard, wearing a gray suit jacket, looking confident",
      "duration": 25,
      "difficulty": "Intermediate",
      "rating": 4.6,
      "playCount": 9340,
      "isBookmarked": false,
      "isDownloaded": false,
      "category": "Focus",
      "description":
          "Sharpen your concentration and mental clarity with this focused attention meditation."
    },
    {
      "id": 5,
      "title": "Anxiety Relief",
      "instructor": "Lisa Thompson",
      "instructorPhoto":
          "https://images.unsplash.com/photo-1684262855358-88f296a2cfc2",
      "instructorPhotoSemanticLabel":
          "Portrait of a middle-aged woman with short auburn hair wearing a navy blue blazer, smiling warmly with a professional demeanor",
      "duration": 30,
      "difficulty": "Advanced",
      "rating": 4.9,
      "playCount": 11200,
      "isBookmarked": true,
      "isDownloaded": false,
      "category": "Anxiety",
      "description":
          "Find peace and calm your anxious mind with this specialized anxiety-relief meditation."
    },
    {
      "id": 6,
      "title": "Body Scan Relaxation",
      "instructor": "Sarah Johnson",
      "instructorPhoto":
          "https://img.rocket.new/generatedImages/rocket_gen_img_1ae7d9bdc-1762274136565.png",
      "instructorPhotoSemanticLabel":
          "Professional headshot of a woman with shoulder-length brown hair wearing a white blouse, smiling warmly at the camera",
      "duration": 35,
      "difficulty": "Intermediate",
      "rating": 4.8,
      "playCount": 7890,
      "isBookmarked": false,
      "isDownloaded": true,
      "category": "Stress Relief",
      "description":
          "Experience deep relaxation through systematic body awareness and tension release."
    },
    {
      "id": 7,
      "title": "Loving Kindness",
      "instructor": "Michael Chen",
      "instructorPhoto":
          "https://img.rocket.new/generatedImages/rocket_gen_img_1b2720bf6-1762273579122.png",
      "instructorPhotoSemanticLabel":
          "Portrait of an Asian man with short black hair wearing a dark blue shirt, looking directly at camera with a gentle expression",
      "duration": 18,
      "difficulty": "Beginner",
      "rating": 4.7,
      "playCount": 6540,
      "isBookmarked": true,
      "isDownloaded": false,
      "category": "Beginner",
      "description":
          "Cultivate compassion and kindness towards yourself and others with this heart-opening practice."
    },
    {
      "id": 8,
      "title": "Power Nap Meditation",
      "instructor": "Emma Williams",
      "instructorPhoto":
          "https://images.unsplash.com/photo-1717807670946-c793b0dc6392",
      "instructorPhotoSemanticLabel":
          "Close-up portrait of a young woman with curly blonde hair and blue eyes, wearing a light pink top, smiling softly",
      "duration": 12,
      "difficulty": "Beginner",
      "rating": 4.5,
      "playCount": 4320,
      "isBookmarked": false,
      "isDownloaded": true,
      "category": "Sleep",
      "description":
          "Recharge your energy with this short but effective power nap meditation."
    },
  ];

  List<Map<String, dynamic>> _filteredMeditations = [];

  @override
  void initState() {
    super.initState();
    _filteredMeditations = List.from(_allMeditations);
    _scrollController.addListener(_onScroll);
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  void _onScroll() {
    if (_scrollController.position.pixels >=
        _scrollController.position.maxScrollExtent - 200) {
      if (!_isLoading && _hasMoreContent) {
        _loadMoreContent();
      }
    }
  }

  void _loadMoreContent() {
    setState(() {
      _isLoading = true;
    });

    // Simulate loading more content
    Future.delayed(const Duration(seconds: 2), () {
      if (mounted) {
        setState(() {
          _isLoading = false;
          _currentPage++;
          // Simulate no more content after page 3
          if (_currentPage > 3) {
            _hasMoreContent = false;
          }
        });
      }
    });
  }

  void _filterMeditations() {
    setState(() {
      _filteredMeditations = _allMeditations.where((meditation) {
        // Search query filter
        if (_searchQuery.isNotEmpty) {
          final query = _searchQuery.toLowerCase();
          final title = (meditation['title'] as String? ?? '').toLowerCase();
          final instructor =
              (meditation['instructor'] as String? ?? '').toLowerCase();
          if (!title.contains(query) && !instructor.contains(query)) {
            return false;
          }
        }

        // Category filter
        if (_selectedCategory != 'All') {
          if (meditation['category'] != _selectedCategory) {
            return false;
          }
        }

        // Duration filter
        final duration = meditation['duration'] as int? ?? 0;
        if (duration < _currentFilters['minDuration'] ||
            duration > _currentFilters['maxDuration']) {
          return false;
        }

        // Difficulty filter
        final selectedDifficulties =
            _currentFilters['difficulties'] as List<String>;
        if (selectedDifficulties.isNotEmpty) {
          if (!selectedDifficulties.contains(meditation['difficulty'])) {
            return false;
          }
        }

        // Instructor filter
        final selectedInstructors =
            _currentFilters['instructors'] as List<String>;
        if (selectedInstructors.isNotEmpty) {
          if (!selectedInstructors.contains(meditation['instructor'])) {
            return false;
          }
        }

        // Rating filter
        final rating = meditation['rating'] as double? ?? 0.0;
        if (rating < _currentFilters['minRating']) {
          return false;
        }

        // Download status filter
        if (_currentFilters['showOnlyDownloaded'] as bool) {
          if (!(meditation['isDownloaded'] as bool? ?? false)) {
            return false;
          }
        }

        // Favorites filter
        if (_currentFilters['showOnlyFavorites'] as bool) {
          if (!(meditation['isBookmarked'] as bool? ?? false)) {
            return false;
          }
        }

        return true;
      }).toList();
    });
  }

  void _onSearchChanged(String query) {
    setState(() {
      _searchQuery = query;
    });
    _filterMeditations();
  }

  void _onCategorySelected(String category) {
    setState(() {
      _selectedCategory = category;
    });
    _filterMeditations();
  }

  void _onFiltersApplied(Map<String, dynamic> filters) {
    setState(() {
      _currentFilters = filters;
    });
    _filterMeditations();
  }

  void _showFilterModal() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => FilterModalWidget(
        currentFilters: _currentFilters,
        onFiltersApplied: _onFiltersApplied,
      ),
    );
  }

  void _onVoicePressed() {
    Fluttertoast.showToast(
      msg: "Voice search feature coming soon!",
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
    );
  }

  void _toggleBookmark(int meditationId) {
    setState(() {
      final index = _allMeditations.indexWhere((m) => m['id'] == meditationId);
      if (index != -1) {
        _allMeditations[index]['isBookmarked'] =
            !(_allMeditations[index]['isBookmarked'] as bool);
      }
    });
    _filterMeditations();

    final meditation =
        _allMeditations.firstWhere((m) => m['id'] == meditationId);
    final isBookmarked = meditation['isBookmarked'] as bool;
    Fluttertoast.showToast(
      msg: isBookmarked ? "Added to favorites" : "Removed from favorites",
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
    );
  }

  void _playMeditation(Map<String, dynamic> meditation) {
    Navigator.pushNamed(context, '/meditation-player');
  }

  void _downloadMeditation(Map<String, dynamic> meditation) {
    setState(() {
      final index =
          _allMeditations.indexWhere((m) => m['id'] == meditation['id']);
      if (index != -1) {
        _allMeditations[index]['isDownloaded'] = true;
      }
    });
    _filterMeditations();

    Fluttertoast.showToast(
      msg: "Downloading ${meditation['title']}...",
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
    );
  }

  void _addToPlaylist(Map<String, dynamic> meditation) {
    Fluttertoast.showToast(
      msg: "Added to playlist",
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
    );
  }

  void _removeFromFavorites(Map<String, dynamic> meditation) {
    _toggleBookmark(meditation['id'] as int);
  }

  void _shareMeditation(Map<String, dynamic> meditation) {
    Fluttertoast.showToast(
      msg: "Sharing ${meditation['title']}",
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
    );
  }

  void _rateMeditation(Map<String, dynamic> meditation) {
    Fluttertoast.showToast(
      msg: "Rate ${meditation['title']}",
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
    );
  }

  void _viewInstructorProfile(Map<String, dynamic> meditation) {
    Fluttertoast.showToast(
      msg: "View ${meditation['instructor']}'s profile",
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
    );
  }

  Future<void> _onRefresh() async {
    await Future.delayed(const Duration(seconds: 1));
    setState(() {
      _currentPage = 1;
      _hasMoreContent = true;
    });
    _filterMeditations();

    Fluttertoast.showToast(
      msg: "Content refreshed",
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      appBar: AppBar(
        title: Text(
          'Meditation Library',
          style: AppTheme.lightTheme.appBarTheme.titleTextStyle,
        ),
        backgroundColor: AppTheme.lightTheme.appBarTheme.backgroundColor,
        elevation: AppTheme.lightTheme.appBarTheme.elevation,
        automaticallyImplyLeading: false,
        actions: [
          IconButton(
            icon: CustomIconWidget(
              iconName: 'search',
              color: AppTheme.lightTheme.colorScheme.onSurface,
              size: 6.w,
            ),
            onPressed: () {
              // Focus search bar
            },
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Search Bar
            SearchBarWidget(
              onSearchChanged: _onSearchChanged,
              onFilterPressed: _showFilterModal,
              onVoicePressed: _onVoicePressed,
            ),

            // Category Chips
            CategoryChipsWidget(
              categories: _categories,
              selectedCategory: _selectedCategory,
              onCategorySelected: _onCategorySelected,
            ),

            // Content
            Expanded(
              child: _filteredMeditations.isEmpty
                  ? _buildEmptyState()
                  : RefreshIndicator(
                      onRefresh: _onRefresh,
                      color: AppTheme.lightTheme.colorScheme.secondary,
                      child: ListView.builder(
                        controller: _scrollController,
                        physics: const AlwaysScrollableScrollPhysics(),
                        itemCount:
                            _filteredMeditations.length + (_isLoading ? 1 : 0),
                        itemBuilder: (context, index) {
                          if (index == _filteredMeditations.length) {
                            return _buildLoadingIndicator();
                          }

                          final meditation = _filteredMeditations[index];
                          return MeditationCardWidget(
                            meditation: meditation,
                            onTap: () => _playMeditation(meditation),
                            onBookmark: () =>
                                _toggleBookmark(meditation['id'] as int),
                            onPlay: () => _playMeditation(meditation),
                            onDownload: () => _downloadMeditation(meditation),
                            onAddToPlaylist: () => _addToPlaylist(meditation),
                            onRemoveFromFavorites: () =>
                                _removeFromFavorites(meditation),
                            onShare: () => _shareMeditation(meditation),
                            onRate: () => _rateMeditation(meditation),
                            onViewInstructor: () =>
                                _viewInstructorProfile(meditation),
                          );
                        },
                      ),
                    ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildEmptyState() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          CustomIconWidget(
            iconName: 'self_improvement',
            color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
            size: 20.w,
          ),
          SizedBox(height: 3.h),
          Text(
            'No meditations found',
            style: AppTheme.lightTheme.textTheme.headlineSmall?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
            ),
          ),
          SizedBox(height: 2.h),
          Text(
            'Try adjusting your search or filters\nto discover new content',
            textAlign: TextAlign.center,
            style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
            ),
          ),
          SizedBox(height: 4.h),
          ElevatedButton(
            onPressed: () {
              setState(() {
                _searchQuery = '';
                _selectedCategory = 'All';
                _currentFilters = {
                  'minDuration': 5.0,
                  'maxDuration': 60.0,
                  'difficulties': <String>[],
                  'instructors': <String>[],
                  'minRating': 0.0,
                  'showOnlyDownloaded': false,
                  'showOnlyFavorites': false,
                };
              });
              _filterMeditations();
            },
            child: Text('Clear All Filters'),
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
