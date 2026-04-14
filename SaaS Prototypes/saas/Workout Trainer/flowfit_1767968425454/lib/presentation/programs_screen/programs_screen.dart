import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../widgets/custom_app_bar.dart';
import '../../widgets/custom_icon_widget.dart';
import './widgets/active_program_card_widget.dart';
import './widgets/empty_programs_widget.dart';
import './widgets/program_card_widget.dart';
import './widgets/program_detail_overlay_widget.dart';
import './widgets/program_filter_sheet_widget.dart';

class ProgramsScreen extends StatefulWidget {
  const ProgramsScreen({super.key});

  @override
  State<ProgramsScreen> createState() => _ProgramsScreenState();
}

class _ProgramsScreenState extends State<ProgramsScreen>
    with SingleTickerProviderStateMixin {
  bool _isRefreshing = false;
  String _selectedFilter = 'All';
  Map<String, dynamic>? _activeProgram;
  Map<String, dynamic>? _selectedProgramForDetail;

  // Mock data for active program
  final Map<String, dynamic> mockActiveProgram = {
    "id": 1,
    "title": "4 Week Strength Builder",
    "duration": "4 weeks",
    "currentWeek": 2,
    "totalWeeks": 4,
    "completionPercentage": 0.45,
    "nextWorkout": "Upper Body Power",
    "nextWorkoutDay": "Tomorrow",
    "coverImage":
        "https://img.rocket.new/generatedImages/rocket_gen_img_1af5cc034-1764671662179.png",
    "semanticLabel":
        "Athletic woman performing dumbbell exercises in modern gym with natural lighting",
    "difficulty": "Intermediate",
    "equipment": ["Dumbbells", "Resistance Bands"],
    "weeklyStructure": [
      {"day": "Mon", "workout": "Upper Body", "completed": true},
      {"day": "Tue", "workout": "Lower Body", "completed": true},
      {"day": "Wed", "workout": "Rest", "completed": true},
      {"day": "Thu", "workout": "Full Body", "completed": true},
      {"day": "Fri", "workout": "Core Focus", "completed": false},
      {"day": "Sat", "workout": "Cardio", "completed": false},
      {"day": "Sun", "workout": "Rest", "completed": false},
    ],
    "estimatedFinishDate": "Jan 15, 2025",
  };

  // Mock data for program library
  final List<Map<String, dynamic>> mockPrograms = [
    {
      "id": 2,
      "title": "6 Week Fat Loss Challenge",
      "duration": "6 weeks",
      "difficulty": "Beginner",
      "equipment": ["Bodyweight", "Yoga Mat"],
      "rating": 4.8,
      "totalRatings": 1247,
      "coverImage":
          "https://img.rocket.new/generatedImages/rocket_gen_img_1994e8396-1764671660275.png",
      "semanticLabel":
          "Woman in athletic wear doing plank exercise on yoga mat in bright studio",
      "description":
          "A comprehensive fat loss program combining HIIT workouts, strength training, and nutrition guidance. Perfect for beginners looking to kickstart their fitness journey.",
      "weeklyBreakdown": [
        "Week 1-2: Foundation building with basic movements",
        "Week 3-4: Intensity increase with compound exercises",
        "Week 5-6: Peak performance with advanced circuits",
      ],
      "requirements": [
        "20-30 minutes per session",
        "3-4 workouts per week",
        "Basic fitness level",
      ],
      "trainer": "Sarah Johnson",
    },
    {
      "id": 3,
      "title": "8 Week Muscle Gain Program",
      "duration": "8 weeks",
      "difficulty": "Advanced",
      "equipment": ["Dumbbells", "Barbell", "Bench"],
      "rating": 4.9,
      "totalRatings": 892,
      "coverImage":
          "https://img.rocket.new/generatedImages/rocket_gen_img_122321cb2-1764694022604.png",
      "semanticLabel":
          "Muscular man performing barbell bench press in professional gym setting",
      "description":
          "Advanced muscle building program focusing on progressive overload and hypertrophy. Designed for experienced lifters seeking significant strength gains.",
      "weeklyBreakdown": [
        "Week 1-3: Volume phase with moderate weights",
        "Week 4-6: Strength phase with heavy compounds",
        "Week 7-8: Peak week with max effort training",
      ],
      "requirements": [
        "45-60 minutes per session",
        "5 workouts per week",
        "Advanced fitness level",
      ],
      "trainer": "Mike Thompson",
    },
    {
      "id": 4,
      "title": "Yoga Flow 30 Days",
      "duration": "30 days",
      "difficulty": "Beginner",
      "equipment": ["Yoga Mat", "Blocks"],
      "rating": 4.7,
      "totalRatings": 2103,
      "coverImage":
          "https://images.unsplash.com/photo-1567281267442-a9283538b2cc",
      "semanticLabel":
          "Woman in peaceful yoga pose on mat in serene studio with plants",
      "description":
          "Daily yoga practice to improve flexibility, balance, and mindfulness. Suitable for complete beginners with guided instruction.",
      "weeklyBreakdown": [
        "Week 1: Basic poses and breathing techniques",
        "Week 2-3: Flow sequences and balance work",
        "Week 4: Advanced poses and meditation",
      ],
      "requirements": [
        "15-20 minutes per session",
        "Daily practice",
        "No prior experience needed",
      ],
      "trainer": "Emma Chen",
    },
    {
      "id": 5,
      "title": "HIIT Cardio Blast",
      "duration": "4 weeks",
      "difficulty": "Intermediate",
      "equipment": ["Bodyweight", "Jump Rope"],
      "rating": 4.6,
      "totalRatings": 1567,
      "coverImage":
          "https://img.rocket.new/generatedImages/rocket_gen_img_1161d3d18-1764786894379.png",
      "semanticLabel":
          "Group of people doing high-intensity jumping exercises in outdoor fitness class",
      "description":
          "High-intensity interval training program to boost cardiovascular fitness and burn calories efficiently.",
      "weeklyBreakdown": [
        "Week 1: Foundation intervals",
        "Week 2-3: Progressive intensity",
        "Week 4: Peak performance",
      ],
      "requirements": [
        "25-30 minutes per session",
        "4 workouts per week",
        "Moderate fitness level",
      ],
      "trainer": "Alex Rodriguez",
    },
    {
      "id": 6,
      "title": "Core Strength 21 Days",
      "duration": "3 weeks",
      "difficulty": "Beginner",
      "equipment": ["Yoga Mat"],
      "rating": 4.5,
      "totalRatings": 987,
      "coverImage":
          "https://img.rocket.new/generatedImages/rocket_gen_img_10556bdc4-1764671659618.png",
      "semanticLabel":
          "Woman performing core plank exercise on yoga mat in minimalist gym",
      "description":
          "Focused core strengthening program to build a solid foundation for all fitness activities.",
      "weeklyBreakdown": [
        "Week 1: Basic core activation",
        "Week 2: Progressive core challenges",
        "Week 3: Advanced core stability",
      ],
      "requirements": [
        "15 minutes per session",
        "Daily practice",
        "Beginner friendly",
      ],
      "trainer": "Lisa Park",
    },
  ];

  @override
  void initState() {
    super.initState();
    // Simulate having an active program
    _activeProgram = mockActiveProgram;
  }

  Future<void> _handleRefresh() async {
    setState(() => _isRefreshing = true);

    // Simulate network delay
    await Future.delayed(const Duration(seconds: 1));

    setState(() => _isRefreshing = false);

    if (mounted) {
      HapticFeedback.lightImpact();
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: const Text('Programs updated ✨'),
          duration: const Duration(seconds: 2),
          behavior: SnackBarBehavior.floating,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
        ),
      );
    }
  }

  void _showFilterSheet() {
    HapticFeedback.lightImpact();
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder:
          (context) => ProgramFilterSheetWidget(
            currentFilter: _selectedFilter,
            onFilterSelected: (filter) {
              setState(() => _selectedFilter = filter);
              Navigator.pop(context);
            },
          ),
    );
  }

  void _showProgramDetail(Map<String, dynamic> program) {
    HapticFeedback.lightImpact();
    setState(() => _selectedProgramForDetail = program);

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder:
          (context) => ProgramDetailOverlayWidget(
            program: program,
            onStartProgram: () {
              Navigator.pop(context);
              _startProgram(program);
            },
            onClose: () {
              Navigator.pop(context);
              setState(() => _selectedProgramForDetail = null);
            },
          ),
    );
  }

  void _startProgram(Map<String, dynamic> program) {
    HapticFeedback.mediumImpact();
    setState(() {
      _activeProgram = {
        ...program,
        "currentWeek": 1,
        "totalWeeks": int.parse(program["duration"].toString().split(' ')[0]),
        "completionPercentage": 0.0,
        "nextWorkout": "Day 1 Workout",
        "nextWorkoutDay": "Today",
        "weeklyStructure": List.generate(
          7,
          (index) => {
            "day": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index],
            "workout": index % 3 == 2 ? "Rest" : "Workout ${index + 1}",
            "completed": false,
          },
        ),
        "estimatedFinishDate":
            DateTime.now()
                .add(
                  Duration(
                    days:
                        int.parse(
                          program["duration"].toString().split(' ')[0],
                        ) *
                        7,
                  ),
                )
                .toString()
                .split(' ')[0],
      };
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Started ${program["title"]} 🎉'),
        duration: const Duration(seconds: 2),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
    );
  }

  void _continueProgram() {
    HapticFeedback.mediumImpact();
    Navigator.pushNamed(context, '/workout-player-screen');
  }

  void _saveProgram(Map<String, dynamic> program) {
    HapticFeedback.lightImpact();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('${program["title"]} saved for later ✨'),
        duration: const Duration(seconds: 2),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
    );
  }

  void _shareProgram(Map<String, dynamic> program) {
    HapticFeedback.lightImpact();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Sharing ${program["title"]}...'),
        duration: const Duration(seconds: 2),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
    );
  }

  List<Map<String, dynamic>> _getFilteredPrograms() {
    if (_selectedFilter == 'All') return mockPrograms;

    return mockPrograms.where((program) {
      switch (_selectedFilter) {
        case 'Beginner':
          return program["difficulty"] == 'Beginner';
        case 'Intermediate':
          return program["difficulty"] == 'Intermediate';
        case 'Advanced':
          return program["difficulty"] == 'Advanced';
        case 'Short (< 4 weeks)':
          final weeks = int.parse(program["duration"].toString().split(' ')[0]);
          return weeks < 4;
        case 'Medium (4-6 weeks)':
          final weeks = int.parse(program["duration"].toString().split(' ')[0]);
          return weeks >= 4 && weeks <= 6;
        case 'Long (> 6 weeks)':
          final weeks = int.parse(program["duration"].toString().split(' ')[0]);
          return weeks > 6;
        default:
          return true;
      }
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      appBar: CustomAppBar(
        title: 'Programs',
        actions: [
          Container(
            margin: const EdgeInsets.only(right: 8),
            decoration: BoxDecoration(
              color: theme.colorScheme.surfaceContainerHighest.withValues(
                alpha: 0.5,
              ),
              borderRadius: BorderRadius.circular(12),
            ),
            child: IconButton(
              icon: CustomIconWidget(
                iconName: 'filter_list',
                color: theme.colorScheme.onSurface,
                size: 22,
              ),
              onPressed: _showFilterSheet,
            ),
          ),
          Container(
            decoration: BoxDecoration(
              color: theme.colorScheme.surfaceContainerHighest.withValues(
                alpha: 0.5,
              ),
              borderRadius: BorderRadius.circular(12),
            ),
            child: IconButton(
              icon: CustomIconWidget(
                iconName: 'search',
                color: theme.colorScheme.onSurface,
                size: 22,
              ),
              onPressed: () {
                HapticFeedback.lightImpact();
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content: const Text('Search coming soon ✨'),
                    duration: const Duration(seconds: 2),
                    behavior: SnackBarBehavior.floating,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
      body: _buildBody(context),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {
          HapticFeedback.lightImpact();
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: const Text('Add program coming soon ✨'),
              duration: const Duration(seconds: 2),
              behavior: SnackBarBehavior.floating,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
          );
        },
        label: Text(
          'Add Program',
          style: TextStyle(color: theme.colorScheme.onPrimary, fontSize: 16),
        ),
        icon: CustomIconWidget(
          iconName: 'add',
          color: theme.colorScheme.onPrimary,
          size: 24,
        ),
      ),
    );
  }

  Widget _buildBody(BuildContext context) {
    final theme = Theme.of(context);
    final filteredPrograms = _getFilteredPrograms();

    return _activeProgram == null
        ? EmptyProgramsWidget(
          onExplorePrograms: () {
            setState(() {
              // Scroll to programs section (simulated)
            });
          },
        )
        : RefreshIndicator(
          onRefresh: _handleRefresh,
          color: theme.colorScheme.primary,
          child: CustomScrollView(
            physics: const AlwaysScrollableScrollPhysics(),
            slivers: [
              // Active Program Section
              if (_activeProgram != null)
                SliverToBoxAdapter(
                  child: Padding(
                    padding: EdgeInsets.symmetric(
                      horizontal: 4.w,
                      vertical: 2.h,
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Active Program',
                          style: theme.textTheme.titleLarge?.copyWith(
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                        SizedBox(height: 2.h),
                        ActiveProgramCardWidget(
                          program: _activeProgram!,
                          onContinue: _continueProgram,
                        ),
                      ],
                    ),
                  ),
                ),

              // Filter Indicator
              if (_selectedFilter != 'All')
                SliverToBoxAdapter(
                  child: Padding(
                    padding: EdgeInsets.symmetric(
                      horizontal: 4.w,
                      vertical: 1.h,
                    ),
                    child: Container(
                      padding: EdgeInsets.symmetric(
                        horizontal: 3.w,
                        vertical: 1.h,
                      ),
                      decoration: BoxDecoration(
                        color: theme.colorScheme.primaryContainer,
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          CustomIconWidget(
                            iconName: 'filter_list',
                            color: theme.colorScheme.onPrimaryContainer,
                            size: 16,
                          ),
                          SizedBox(width: 2.w),
                          Text(
                            _selectedFilter,
                            style: theme.textTheme.bodySmall?.copyWith(
                              color: theme.colorScheme.onPrimaryContainer,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          SizedBox(width: 2.w),
                          GestureDetector(
                            onTap:
                                () => setState(() => _selectedFilter = 'All'),
                            child: CustomIconWidget(
                              iconName: 'close',
                              color: theme.colorScheme.onPrimaryContainer,
                              size: 16,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),

              // Program Library Header
              SliverToBoxAdapter(
                child: Padding(
                  padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
                  child: Text(
                    'Program Library',
                    style: theme.textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ),
              ),

              // Program Cards
              if (filteredPrograms.isEmpty)
                SliverToBoxAdapter(
                  child: Padding(
                    padding: EdgeInsets.symmetric(
                      horizontal: 4.w,
                      vertical: 4.h,
                    ),
                    child: Center(
                      child: Column(
                        children: [
                          CustomIconWidget(
                            iconName: 'search_off',
                            color: theme.colorScheme.onSurfaceVariant,
                            size: 48,
                          ),
                          SizedBox(height: 2.h),
                          Text(
                            'No programs found',
                            style: theme.textTheme.titleMedium?.copyWith(
                              color: theme.colorScheme.onSurfaceVariant,
                            ),
                          ),
                          SizedBox(height: 1.h),
                          Text(
                            'Try adjusting your filters',
                            style: theme.textTheme.bodyMedium?.copyWith(
                              color: theme.colorScheme.onSurfaceVariant,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                )
              else
                SliverPadding(
                  padding: EdgeInsets.symmetric(horizontal: 4.w),
                  sliver: SliverList(
                    delegate: SliverChildBuilderDelegate((context, index) {
                      final program = filteredPrograms[index];
                      return Padding(
                        padding: EdgeInsets.only(bottom: 2.h),
                        child: ProgramCardWidget(
                          program: program,
                          onTap: () => _showProgramDetail(program),
                          onSave: () => _saveProgram(program),
                          onShare: () => _shareProgram(program),
                        ),
                      );
                    }, childCount: filteredPrograms.length),
                  ),
                ),

              // Bottom Padding
              SliverToBoxAdapter(child: SizedBox(height: 10.h)),
            ],
          ),
        );
  }
}
