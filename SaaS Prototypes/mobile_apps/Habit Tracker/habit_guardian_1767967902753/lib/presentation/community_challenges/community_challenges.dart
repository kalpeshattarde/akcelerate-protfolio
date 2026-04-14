import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/achievement_celebration_widget.dart';
import './widgets/category_filter_chips_widget.dart';
import './widgets/challenge_card_widget.dart';
import './widgets/challenge_join_modal_widget.dart';
import './widgets/featured_challenge_widget.dart';
import './widgets/leaderboard_widget.dart';

class CommunityChallenges extends StatefulWidget {
  const CommunityChallenges({super.key});

  @override
  State<CommunityChallenges> createState() => _CommunityChallengesState();
}

class _CommunityChallengesState extends State<CommunityChallenges>
    with TickerProviderStateMixin {
  late AnimationController _breathingController;
  late AnimationController _fadeAnimationController;
  late Animation<double> _breathingAnimation;
  late Animation<Offset> _slideAnimation;
  late Animation<double> _fadeAnimation;

  String _selectedCategory = 'All';
  final List<String> _categories = [
    'All',
    'Wellness',
    'Productivity',
    'Mindfulness',
    'Fitness',
  ];

  final List<Map<String, dynamic>> _challenges = [
    {
      'id': '1',
      'title': '21-Day Morning Meditation',
      'description':
          'Start each day with 10 minutes of mindful meditation to center your thoughts and embrace inner peace.',
      'category': 'Mindfulness',
      'participants': 1247,
      'duration': '21 days',
      'difficulty': 'Beginner',
      'isJoined': true,
      'progress': 0.65,
      'leaderboardPosition': 23,
      'image': 'https://images.unsplash.com/photo-1690149927312-03c86a305ec4',
      'semanticLabel':
          'Peaceful woman meditating in lotus position in serene natural mountain setting with soft morning light',
      'endDate': '2025-11-28',
    },
    {
      'id': '2',
      'title': '30-Day Hydration Journey',
      'description':
          'Nurture your body with 8 glasses of pure water daily for enhanced energy and glowing vitality.',
      'category': 'Wellness',
      'participants': 892,
      'duration': '30 days',
      'difficulty': 'Easy',
      'isJoined': false,
      'progress': 0.0,
      'leaderboardPosition': null,
      'image': 'https://images.unsplash.com/photo-1694681733672-ecda525b4412',
      'semanticLabel':
          'Crystal clear glass of water with natural light and fresh mint leaves on wooden surface',
      'endDate': '2025-12-07',
    },
    {
      'id': '3',
      'title': '14-Day Digital Sanctuary',
      'description':
          'Create mindful boundaries with technology and reconnect with the present moment.',
      'category': 'Mindfulness',
      'participants': 623,
      'duration': '14 days',
      'difficulty': 'Intermediate',
      'isJoined': true,
      'progress': 0.29,
      'leaderboardPosition': 45,
      'image': 'https://images.unsplash.com/photo-1655273094340-a45dd8412f5f',
      'semanticLabel':
          'Person reading book peacefully in garden sanctuary surrounded by lush green plants and natural tranquility',
      'endDate': '2025-11-21',
    },
    {
      'id': '4',
      'title': '21-Day Movement Flow',
      'description':
          'Embrace gentle movement and strengthen your body with mindful fitness practices.',
      'category': 'Fitness',
      'participants': 734,
      'duration': '21 days',
      'difficulty': 'Intermediate',
      'isJoined': false,
      'progress': 0.0,
      'leaderboardPosition': null,
      'image': 'https://images.unsplash.com/photo-1690491454974-d548ff3e3a23',
      'semanticLabel':
          'Woman practicing yoga in peaceful outdoor setting with soft natural lighting and serene atmosphere',
      'endDate': '2025-12-14',
    },
  ];

  @override
  void initState() {
    super.initState();
    _setupAnimations();
  }

  void _setupAnimations() {
    _breathingController = AnimationController(
      duration: const Duration(milliseconds: 3000),
      vsync: this,
    );
    _breathingAnimation = Tween<double>(begin: 0.98, end: 1.02).animate(
      CurvedAnimation(parent: _breathingController, curve: Curves.easeInOut),
    );

    _fadeAnimationController = AnimationController(
      duration: const Duration(milliseconds: 800),
      vsync: this,
    );
    _slideAnimation = Tween<Offset>(
      begin: const Offset(0, 0.1),
      end: Offset.zero,
    ).animate(CurvedAnimation(
      parent: _fadeAnimationController,
      curve: Curves.easeOutCubic,
    ));
    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _fadeAnimationController, curve: Curves.easeOut),
    );

    _breathingController.repeat(reverse: true);
    _fadeAnimationController.forward();
  }

  @override
  void dispose() {
    _breathingController.dispose();
    _fadeAnimationController.dispose();
    super.dispose();
  }

  List<Map<String, dynamic>> get _filteredChallenges {
    if (_selectedCategory == 'All') return _challenges;
    return _challenges
        .where((challenge) => challenge['category'] == _selectedCategory)
        .toList();
  }

  void _showChallengeJoinModal(Map<String, dynamic> challenge) {
    HapticFeedback.lightImpact();
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => ChallengeJoinModalWidget(
        challenge: challenge,
        onJoin: () => _joinChallenge(challenge),
      ),
    );
  }

  void _joinChallenge(Map<String, dynamic> challenge) {
    HapticFeedback.selectionClick();
    setState(() {
      challenge['isJoined'] = true;
      challenge['participants'] = challenge['participants'] + 1;
    });

    _showAchievementCelebration(
      'Challenge Joined!',
      'Welcome to your ${challenge['title']} journey',
    );
  }

  void _showAchievementCelebration(String title, String message) {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) =>
          AchievementCelebrationWidget(title: title, message: message),
    );
  }

  void _showLeaderboard(Map<String, dynamic> challenge) {
    HapticFeedback.lightImpact();
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => LeaderboardWidget(challenge: challenge),
    );
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark
          ? AppTheme.darkTheme.scaffoldBackgroundColor
          : AppTheme.lightTheme.scaffoldBackgroundColor,
      appBar: AppBar(
        title: Text(
          'Challenges',
          style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
            color: isDark
                ? AppTheme.darkTheme.colorScheme.onSurface
                : AppTheme.lightTheme.colorScheme.onSurface,
            fontWeight: FontWeight.w600,
          ),
        ),
        centerTitle: true,
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: CustomIconWidget(
            iconName: 'arrow_back_ios',
            color: isDark
                ? AppTheme.darkTheme.colorScheme.onSurface
                : AppTheme.lightTheme.colorScheme.onSurface,
            size: 20,
          ),
          onPressed: () {
            HapticFeedback.lightImpact();
            Navigator.pop(context);
          },
        ),
        actions: [
          IconButton(
            icon: CustomIconWidget(
              iconName: 'tune',
              color: isDark
                  ? AppTheme.darkTheme.colorScheme.onSurface
                  : AppTheme.lightTheme.colorScheme.onSurface,
              size: 24,
            ),
            onPressed: () {
              HapticFeedback.lightImpact();
              // TODO: Implement filter bottom sheet
            },
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: () async {
          HapticFeedback.lightImpact();
          await Future.delayed(const Duration(milliseconds: 800));
        },
        color: AppTheme.secondaryLight,
        backgroundColor: AppTheme.lightTheme.cardColor,
        child: SingleChildScrollView(
          physics: const AlwaysScrollableScrollPhysics(),
          child: Column(
            children: [
              SizedBox(height: 2.h),

              // Featured Challenge Section
              FadeTransition(
                opacity: _fadeAnimation,
                child: SlideTransition(
                  position: _slideAnimation,
                  child: Container(
                    margin: EdgeInsets.symmetric(horizontal: 4.w),
                    child: FeaturedChallengeWidget(
                      challenge: _challenges.first,
                      onJoin: () => _joinChallenge(_challenges.first),
                      onShowLeaderboard: () =>
                          _showLeaderboard(_challenges.first),
                      breathingAnimation: _breathingAnimation,
                    ),
                  ),
                ),
              ),

              SizedBox(height: 3.h),

              // Category Filters
              FadeTransition(
                opacity: _fadeAnimation,
                child: SlideTransition(
                  position: _slideAnimation,
                  child: Container(
                    height: 60,
                    margin: EdgeInsets.only(bottom: 2.h),
                    child: CategoryFilterChipsWidget(
                      categories: _categories,
                      selectedCategory: _selectedCategory,
                      onCategorySelected: (category) {
                        HapticFeedback.selectionClick();
                        setState(() {
                          _selectedCategory = category;
                        });
                      },
                    ),
                  ),
                ),
              ),

              // Challenges List
              _buildChallengesList(),

              SizedBox(height: 10.h), // Space for bottom navigation
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildChallengesList() {
    final filteredChallenges = _filteredChallenges;

    if (filteredChallenges.isEmpty) {
      return FadeTransition(
        opacity: _fadeAnimation,
        child: SlideTransition(
          position: _slideAnimation,
          child: _buildEmptyState(),
        ),
      );
    }

    return Column(
      children: filteredChallenges.asMap().entries.map((entry) {
        final index = entry.key;
        final challenge = entry.value;
        return FadeTransition(
          opacity: _fadeAnimation,
          child: SlideTransition(
            position: Tween<Offset>(
              begin: Offset(0, 0.1 + (index * 0.05)),
              end: Offset.zero,
            ).animate(CurvedAnimation(
              parent: _fadeAnimationController,
              curve: Interval(
                0.1 + (index * 0.1),
                1.0,
                curve: Curves.easeOutCubic,
              ),
            )),
            child: Container(
              margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
              child: ChallengeCardWidget(
                challenge: challenge,
                onJoin: () => challenge['isJoined']
                    ? null
                    : _showChallengeJoinModal(challenge),
                onShowLeaderboard: () => _showLeaderboard(challenge),
                breathingAnimation: _breathingAnimation,
              ),
            ),
          ),
        );
      }).toList(),
    );
  }

  Widget _buildEmptyState() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            width: 30.w,
            height: 30.w,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [
                  AppTheme.secondaryLight.withValues(alpha: 0.1),
                  AppTheme.accentLight.withValues(alpha: 0.05),
                ],
              ),
              borderRadius: BorderRadius.circular(6.w),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.05),
                  blurRadius: 16,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            child: CustomIconWidget(
              iconName: 'groups',
              size: 18.w,
              color: AppTheme.secondaryLight.withValues(alpha: 0.6),
            ),
          ),
          SizedBox(height: 4.h),
          Text(
            'No ${_selectedCategory.toLowerCase()} challenges',
            style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
              color: AppTheme.textPrimaryLight,
              fontWeight: FontWeight.w600,
            ),
          ),
          SizedBox(height: 1.h),
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 8.w),
            child: Text(
              'Discover new growth opportunities by exploring different categories or check back later for inspiring challenges.',
              textAlign: TextAlign.center,
              style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                color: AppTheme.textSecondaryLight,
                height: 1.5,
              ),
            ),
          ),
          SizedBox(height: 4.h),
          ElevatedButton(
            onPressed: () {
              HapticFeedback.lightImpact();
              setState(() {
                _selectedCategory = 'All';
              });
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: AppTheme.secondaryLight,
              foregroundColor: AppTheme.primaryLight,
              padding: EdgeInsets.symmetric(horizontal: 8.w, vertical: 2.h),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
              elevation: 0,
            ),
            child: Text(
              'View All Challenges',
              style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                color: AppTheme.primaryLight,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
