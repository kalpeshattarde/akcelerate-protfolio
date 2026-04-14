import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../widgets/custom_app_bar.dart';
import './widgets/category_chips_widget.dart';
import './widgets/empty_state_widget.dart';
import './widgets/filter_bottom_sheet_widget.dart';
import './widgets/search_bar_widget.dart';
import './widgets/skeleton_card_widget.dart';
import './widgets/workout_card_widget.dart';

class WorkoutsLibraryScreen extends StatefulWidget {
  const WorkoutsLibraryScreen({super.key});

  @override
  State<WorkoutsLibraryScreen> createState() => _WorkoutsLibraryScreenState();
}

class _WorkoutsLibraryScreenState extends State<WorkoutsLibraryScreen> {
  final TextEditingController _searchController = TextEditingController();
  final ScrollController _scrollController = ScrollController();

  List<String> _recentSearches = ['HIIT', 'Yoga', 'Core Strength'];
  String? _selectedCategory;
  Map<String, dynamic> _currentFilters = {
    'equipment': <String>[],
    'duration': <String>[],
    'muscleGroup': <String>[],
    'difficulty': <String>[],
  };

  bool _isLoading = false;
  bool _isLoadingMore = false;
  bool _isOffline = false;
  List<Map<String, dynamic>> _workouts = [];
  List<Map<String, dynamic>> _filteredWorkouts = [];

  final List<String> _categories = [
    'All',
    'Beginner',
    'Upper Body',
    'Core',
    'Cardio',
    'Yoga',
    'Lower Body',
  ];

  @override
  void initState() {
    super.initState();
    _checkConnectivity();
    _loadWorkouts();
    _scrollController.addListener(_onScroll);
  }

  Future<void> _checkConnectivity() async {
    final connectivityResult = await Connectivity().checkConnectivity();
    setState(() {
      _isOffline = connectivityResult == ConnectivityResult.none;
    });
  }

  Future<void> _loadWorkouts() async {
    setState(() => _isLoading = true);

    await Future.delayed(const Duration(milliseconds: 800));

    setState(() {
      _workouts = [
        {
          "id": 1,
          "title": "Morning Energy Flow",
          "thumbnail":
              "https://img.rocket.new/generatedImages/rocket_gen_img_1c478c714-1765330423995.png",
          "thumbnailLabel":
              "Woman in black athletic wear performing a yoga warrior pose on a purple mat in a bright studio with natural lighting",
          "duration": 15,
          "difficulty": "Beginner",
          "equipment": ["Mat"],
          "muscleGroup": "Full Body",
          "category": "Yoga",
          "isDownloaded": false,
          "isFavorite": false,
        },
        {
          "id": 2,
          "title": "Upper Body Strength Builder",
          "thumbnail":
              "https://img.rocket.new/generatedImages/rocket_gen_img_1d9390292-1764649132607.png",
          "thumbnailLabel":
              "Muscular man performing dumbbell shoulder press exercise in modern gym with industrial lighting",
          "duration": 30,
          "difficulty": "Intermediate",
          "equipment": ["Dumbbells"],
          "muscleGroup": "Upper Body",
          "category": "Upper Body",
          "isDownloaded": true,
          "isFavorite": true,
        },
        {
          "id": 3,
          "title": "Core Crusher HIIT",
          "thumbnail":
              "https://img.rocket.new/generatedImages/rocket_gen_img_10556bdc4-1764671659618.png",
          "thumbnailLabel":
              "Athletic woman in pink sports bra doing plank exercise on yoga mat in minimalist home gym setting",
          "duration": 20,
          "difficulty": "Advanced",
          "equipment": ["Mat"],
          "muscleGroup": "Core",
          "category": "Core",
          "isDownloaded": false,
          "isFavorite": false,
        },
        {
          "id": 4,
          "title": "Cardio Blast",
          "thumbnail":
              "https://img.rocket.new/generatedImages/rocket_gen_img_187ca3e4a-1765401525649.png",
          "thumbnailLabel":
              "Person in blue running shoes sprinting on outdoor track with motion blur effect",
          "duration": 25,
          "difficulty": "Intermediate",
          "equipment": ["None"],
          "muscleGroup": "Cardio",
          "category": "Cardio",
          "isDownloaded": false,
          "isFavorite": true,
        },
        {
          "id": 5,
          "title": "Beginner's Full Body",
          "thumbnail":
              "https://img.rocket.new/generatedImages/rocket_gen_img_13f5c5ab2-1764730666856.png",
          "thumbnailLabel":
              "Young woman in gray workout clothes doing bodyweight squats in bright home gym with wooden floors",
          "duration": 20,
          "difficulty": "Beginner",
          "equipment": ["None"],
          "muscleGroup": "Full Body",
          "category": "Beginner",
          "isDownloaded": true,
          "isFavorite": false,
        },
        {
          "id": 6,
          "title": "Lower Body Power",
          "thumbnail":
              "https://images.unsplash.com/photo-1646072508462-a802209a16f3",
          "thumbnailLabel":
              "Fit person performing barbell squats in professional gym with weight plates visible",
          "duration": 35,
          "difficulty": "Advanced",
          "equipment": ["Dumbbells"],
          "muscleGroup": "Lower Body",
          "category": "Lower Body",
          "isDownloaded": false,
          "isFavorite": false,
        },
        {
          "id": 7,
          "title": "Resistance Band Total Body",
          "thumbnail":
              "https://img.rocket.new/generatedImages/rocket_gen_img_103ced2ac-1764748890445.png",
          "thumbnailLabel":
              "Woman using green resistance band for shoulder exercises in outdoor park setting",
          "duration": 25,
          "difficulty": "Intermediate",
          "equipment": ["Resistance Band"],
          "muscleGroup": "Full Body",
          "category": "Upper Body",
          "isDownloaded": false,
          "isFavorite": true,
        },
        {
          "id": 8,
          "title": "Gentle Yoga Flow",
          "thumbnail":
              "https://images.unsplash.com/photo-1734638901126-bd34c411a029",
          "thumbnailLabel":
              "Peaceful woman in white doing child's pose on blue yoga mat in serene studio with plants",
          "duration": 30,
          "difficulty": "Beginner",
          "equipment": ["Mat"],
          "muscleGroup": "Full Body",
          "category": "Yoga",
          "isDownloaded": true,
          "isFavorite": false,
        },
      ];
      _filteredWorkouts = List.from(_workouts);
      _isLoading = false;
    });
  }

  void _onScroll() {
    if (_scrollController.position.pixels >=
        _scrollController.position.maxScrollExtent - 200) {
      if (!_isLoadingMore) {
        _loadMoreWorkouts();
      }
    }
  }

  Future<void> _loadMoreWorkouts() async {
    setState(() => _isLoadingMore = true);

    await Future.delayed(const Duration(milliseconds: 1000));

    setState(() => _isLoadingMore = false);
  }

  Future<void> _onRefresh() async {
    HapticFeedback.mediumImpact();
    await _checkConnectivity();
    await _loadWorkouts();
  }

  void _onSearch(String query) {
    if (query.isNotEmpty && !_recentSearches.contains(query)) {
      setState(() {
        _recentSearches.insert(0, query);
        if (_recentSearches.length > 5) {
          _recentSearches.removeLast();
        }
      });
    }

    _applyFilters();
  }

  void _onCategorySelected(String category) {
    setState(() {
      _selectedCategory = category == 'All' ? null : category;
    });
    _applyFilters();
  }

  void _showFilterBottomSheet() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder:
          (context) => SizedBox(
            height: 80.h,
            child: FilterBottomSheetWidget(
              currentFilters: _currentFilters,
              onApplyFilters: (filters) {
                setState(() => _currentFilters = filters);
                _applyFilters();
              },
            ),
          ),
    );
  }

  void _applyFilters() {
    setState(() {
      _filteredWorkouts =
          _workouts.where((workout) {
            final searchQuery = _searchController.text.toLowerCase();
            final matchesSearch =
                searchQuery.isEmpty ||
                (workout['title'] as String).toLowerCase().contains(
                  searchQuery,
                );

            final matchesCategory =
                _selectedCategory == null ||
                workout['category'] == _selectedCategory;

            final equipmentFilters =
                _currentFilters['equipment'] as List<String>;
            final matchesEquipment =
                equipmentFilters.isEmpty ||
                (workout['equipment'] as List<String>).any(
                  (e) => equipmentFilters.contains(e),
                );

            final durationFilters = _currentFilters['duration'] as List<String>;
            final matchesDuration =
                durationFilters.isEmpty ||
                _matchesDurationFilter(
                  workout['duration'] as int,
                  durationFilters,
                );

            final muscleGroupFilters =
                _currentFilters['muscleGroup'] as List<String>;
            final matchesMuscleGroup =
                muscleGroupFilters.isEmpty ||
                muscleGroupFilters.contains(workout['muscleGroup']);

            final difficultyFilters =
                _currentFilters['difficulty'] as List<String>;
            final matchesDifficulty =
                difficultyFilters.isEmpty ||
                difficultyFilters.contains(workout['difficulty']);

            return matchesSearch &&
                matchesCategory &&
                matchesEquipment &&
                matchesDuration &&
                matchesMuscleGroup &&
                matchesDifficulty;
          }).toList();
    });
  }

  bool _matchesDurationFilter(int duration, List<String> filters) {
    for (final filter in filters) {
      if (filter == '10-15 min' && duration >= 10 && duration <= 15)
        return true;
      if (filter == '15-30 min' && duration > 15 && duration <= 30) return true;
      if (filter == '30-45 min' && duration > 30 && duration <= 45) return true;
      if (filter == '45+ min' && duration > 45) return true;
    }
    return false;
  }

  void _toggleFavorite(int workoutId) {
    setState(() {
      final index = _workouts.indexWhere((w) => w['id'] == workoutId);
      if (index != -1) {
        _workouts[index]['isFavorite'] =
            !(_workouts[index]['isFavorite'] as bool);
      }
    });
    HapticFeedback.mediumImpact();
  }

  void _downloadWorkout(int workoutId) {
    setState(() {
      final index = _workouts.indexWhere((w) => w['id'] == workoutId);
      if (index != -1) {
        _workouts[index]['isDownloaded'] = true;
      }
    });
    HapticFeedback.mediumImpact();
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Workout downloaded for offline use')),
    );
  }

  void _shareWorkout(int workoutId) {
    HapticFeedback.lightImpact();
    ScaffoldMessenger.of(
      context,
    ).showSnackBar(const SnackBar(content: Text('Sharing workout...')));
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      appBar: CustomAppBar(
        title: 'Workouts',
        actions: [
          IconButton(
            icon: Icon(Icons.search, color: theme.colorScheme.onSurface),
            onPressed: () {
              _showFilterBottomSheet();
            },
          ),
        ],
      ),
      body: Column(
        children: [
          SearchBarWidget(
            controller: _searchController,
            onSearch: _onSearch,
            onFilterTap: _showFilterBottomSheet,
            recentSearches: _recentSearches,
          ),
          CategoryChipsWidget(
            categories: _categories,
            selectedCategory: _selectedCategory,
            onCategorySelected: _onCategorySelected,
          ),
          if (_isOffline)
            Container(
              width: double.infinity,
              padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
              color: theme.colorScheme.errorContainer,
              child: Row(
                children: [
                  CustomIconWidget(
                    iconName: 'cloud_off',
                    color: theme.colorScheme.onErrorContainer,
                    size: 16,
                  ),
                  SizedBox(width: 2.w),
                  Expanded(
                    child: Text(
                      'Offline mode - Showing downloaded workouts',
                      style: theme.textTheme.bodySmall?.copyWith(
                        color: theme.colorScheme.onErrorContainer,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          Expanded(
            child:
                _isLoading
                    ? ListView.builder(
                      itemCount: 5,
                      itemBuilder:
                          (context, index) => const SkeletonCardWidget(),
                    )
                    : _filteredWorkouts.isEmpty
                    ? EmptyStateWidget(
                      message: 'No workouts found',
                      suggestion: 'Try adjusting your filters or search terms',
                      actionLabel: 'Clear Filters',
                      onActionTap: () {
                        setState(() {
                          _searchController.clear();
                          _selectedCategory = null;
                          _currentFilters = {
                            'equipment': <String>[],
                            'duration': <String>[],
                            'muscleGroup': <String>[],
                            'difficulty': <String>[],
                          };
                        });
                        _applyFilters();
                      },
                    )
                    : RefreshIndicator(
                      onRefresh: _onRefresh,
                      child: ListView.builder(
                        controller: _scrollController,
                        padding: EdgeInsets.only(top: 1.h, bottom: 2.h),
                        itemCount:
                            _filteredWorkouts.length + (_isLoadingMore ? 1 : 0),
                        itemBuilder: (context, index) {
                          if (index == _filteredWorkouts.length) {
                            return const Padding(
                              padding: EdgeInsets.all(16),
                              child: Center(child: CircularProgressIndicator()),
                            );
                          }

                          final workout = _filteredWorkouts[index];
                          return WorkoutCardWidget(
                            workout: workout,
                            onTap: () {
                              Navigator.pushNamed(
                                context,
                                '/workout-player-screen',
                                arguments: workout,
                              );
                            },
                            onFavorite:
                                () => _toggleFavorite(workout['id'] as int),
                            onDownload:
                                () => _downloadWorkout(workout['id'] as int),
                            onShare: () => _shareWorkout(workout['id'] as int),
                          );
                        },
                      ),
                    ),
          ),
        ],
      ),
    );
  }

  @override
  void dispose() {
    _searchController.dispose();
    _scrollController.dispose();
    super.dispose();
  }
}
