import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class GamificationWidget extends StatefulWidget {
  const GamificationWidget({Key? key}) : super(key: key);

  @override
  State<GamificationWidget> createState() => _GamificationWidgetState();
}

class _GamificationWidgetState extends State<GamificationWidget>
    with TickerProviderStateMixin {
  late AnimationController _xpController;
  late AnimationController _badgeController;
  late AnimationController _streakController;
  late Animation<double> _xpAnimation;
  late Animation<double> _badgeAnimation;
  late Animation<double> _streakAnimation;

  int currentXP = 0;
  int targetXP = 850;
  int streakDays = 0;
  int targetStreak = 7;
  List<bool> unlockedBadges = [false, false, false];

  @override
  void initState() {
    super.initState();
    _xpController = AnimationController(
      duration: const Duration(milliseconds: 2000),
      vsync: this,
    );
    _badgeController = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    );
    _streakController = AnimationController(
      duration: const Duration(milliseconds: 2500),
      vsync: this,
    );

    _xpAnimation = Tween<double>(begin: 0, end: 1).animate(
      CurvedAnimation(parent: _xpController, curve: Curves.easeOutCubic),
    );
    _badgeAnimation = Tween<double>(begin: 0, end: 1).animate(
      CurvedAnimation(parent: _badgeController, curve: Curves.elasticOut),
    );
    _streakAnimation = Tween<double>(begin: 0, end: 1).animate(
      CurvedAnimation(parent: _streakController, curve: Curves.easeInOut),
    );

    _startAnimations();
  }

  void _startAnimations() async {
    await Future.delayed(const Duration(milliseconds: 500));

    // Start XP animation
    _xpController.forward();
    _xpController.addListener(() {
      setState(() {
        currentXP = (_xpAnimation.value * targetXP).round();
      });
    });

    // Start badge animations
    await Future.delayed(const Duration(milliseconds: 1000));
    _badgeController.forward();

    // Unlock badges one by one
    for (int i = 0; i < unlockedBadges.length; i++) {
      await Future.delayed(const Duration(milliseconds: 600));
      setState(() {
        unlockedBadges[i] = true;
      });
    }

    // Start streak animation
    await Future.delayed(const Duration(milliseconds: 500));
    _streakController.forward();
    _streakController.addListener(() {
      setState(() {
        streakDays = (_streakAnimation.value * targetStreak).round();
      });
    });
  }

  @override
  void dispose() {
    _xpController.dispose();
    _badgeController.dispose();
    _streakController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SizedBox(height: 4.h),
        Text(
          'Gamified Learning',
          style: AppTheme.lightTheme.textTheme.headlineMedium?.copyWith(
            fontWeight: FontWeight.bold,
            color: AppTheme.lightTheme.colorScheme.onSurface,
          ),
          textAlign: TextAlign.center,
        ),
        SizedBox(height: 2.h),
        Text(
          'Earn XP, unlock badges, and maintain streaks\nto stay motivated on your learning journey',
          style: AppTheme.lightTheme.textTheme.bodyLarge?.copyWith(
            color: AppTheme.lightTheme.colorScheme.onSurface
                .withValues(alpha: 0.7),
          ),
          textAlign: TextAlign.center,
        ),
        SizedBox(height: 6.h),

        // XP Progress Section
        Container(
          padding: EdgeInsets.all(4.w),
          margin: EdgeInsets.symmetric(horizontal: 6.w),
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [
                AppTheme.getAccentColor(true).withValues(alpha: 0.1),
                AppTheme.getAccentColor(true).withValues(alpha: 0.05),
              ],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(
              color: AppTheme.getAccentColor(true).withValues(alpha: 0.3),
            ),
          ),
          child: Column(
            children: [
              Row(
                children: [
                  Container(
                    padding: EdgeInsets.all(2.w),
                    decoration: BoxDecoration(
                      color: AppTheme.getAccentColor(true),
                      shape: BoxShape.circle,
                    ),
                    child: CustomIconWidget(
                      iconName: 'stars',
                      color: Colors.white,
                      size: 5.w,
                    ),
                  ),
                  SizedBox(width: 3.w),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Experience Points',
                        style:
                            AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      Text(
                        '$currentXP / $targetXP XP',
                        style:
                            AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                          color: AppTheme.lightTheme.colorScheme.onSurface
                              .withValues(alpha: 0.7),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              SizedBox(height: 3.h),
              ClipRRect(
                borderRadius: BorderRadius.circular(10),
                child: LinearProgressIndicator(
                  value: currentXP / targetXP,
                  backgroundColor:
                      AppTheme.getAccentColor(true).withValues(alpha: 0.2),
                  valueColor: AlwaysStoppedAnimation<Color>(
                      AppTheme.getAccentColor(true)),
                  minHeight: 1.5.h,
                ),
              ),
            ],
          ),
        ),

        SizedBox(height: 4.h),

        // Badges Section
        Container(
          padding: EdgeInsets.all(4.w),
          margin: EdgeInsets.symmetric(horizontal: 6.w),
          decoration: BoxDecoration(
            color: AppTheme.lightTheme.colorScheme.surface,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(
              color: AppTheme.lightTheme.colorScheme.outline
                  .withValues(alpha: 0.2),
            ),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withValues(alpha: 0.05),
                blurRadius: 10,
                offset: const Offset(0, 2),
              ),
            ],
          ),
          child: Column(
            children: [
              Text(
                'Achievement Badges',
                style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
              SizedBox(height: 3.h),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  _buildBadge('First Lesson', 'school', 0),
                  _buildBadge('Week Warrior', 'local_fire_department', 1),
                  _buildBadge('Grammar Master', 'menu_book', 2),
                ],
              ),
            ],
          ),
        ),

        SizedBox(height: 4.h),

        // Streak Section
        Container(
          padding: EdgeInsets.all(4.w),
          margin: EdgeInsets.symmetric(horizontal: 6.w),
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [
                AppTheme.lightTheme.colorScheme.primary.withValues(alpha: 0.1),
                AppTheme.lightTheme.colorScheme.secondary
                    .withValues(alpha: 0.1),
              ],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(
              color: AppTheme.lightTheme.colorScheme.primary
                  .withValues(alpha: 0.3),
            ),
          ),
          child: Row(
            children: [
              Container(
                padding: EdgeInsets.all(3.w),
                decoration: BoxDecoration(
                  color: Colors.orange,
                  shape: BoxShape.circle,
                  boxShadow: [
                    BoxShadow(
                      color: Colors.orange.withValues(alpha: 0.3),
                      blurRadius: 10,
                      spreadRadius: 2,
                    ),
                  ],
                ),
                child: CustomIconWidget(
                  iconName: 'local_fire_department',
                  color: Colors.white,
                  size: 6.w,
                ),
              ),
              SizedBox(width: 4.w),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Daily Streak',
                      style:
                          AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    SizedBox(height: 0.5.h),
                    Text(
                      '$streakDays days in a row!',
                      style:
                          AppTheme.lightTheme.textTheme.headlineSmall?.copyWith(
                        fontWeight: FontWeight.bold,
                        color: Colors.orange,
                      ),
                    ),
                    Text(
                      'Keep it up! You\'re on fire! 🔥',
                      style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                        color: AppTheme.lightTheme.colorScheme.onSurface
                            .withValues(alpha: 0.7),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildBadge(String title, String iconName, int index) {
    final isUnlocked = unlockedBadges[index];

    return AnimatedBuilder(
      animation: _badgeAnimation,
      builder: (context, child) {
        return Transform.scale(
          scale: isUnlocked ? 1.0 : 0.8,
          child: Column(
            children: [
              Container(
                width: 18.w,
                height: 18.w,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: isUnlocked
                      ? AppTheme.getAccentColor(true)
                      : AppTheme.lightTheme.colorScheme.outline
                          .withValues(alpha: 0.2),
                  boxShadow: isUnlocked
                      ? [
                          BoxShadow(
                            color: AppTheme.getAccentColor(true)
                                .withValues(alpha: 0.3),
                            blurRadius: 15,
                            spreadRadius: 3,
                          ),
                        ]
                      : null,
                ),
                child: Center(
                  child: CustomIconWidget(
                    iconName: iconName,
                    color: isUnlocked
                        ? Colors.white
                        : AppTheme.lightTheme.colorScheme.outline
                            .withValues(alpha: 0.5),
                    size: 8.w,
                  ),
                ),
              ),
              SizedBox(height: 1.h),
              Text(
                title,
                style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                  fontWeight: FontWeight.w500,
                  color: isUnlocked
                      ? AppTheme.lightTheme.colorScheme.onSurface
                      : AppTheme.lightTheme.colorScheme.onSurface
                          .withValues(alpha: 0.5),
                ),
                textAlign: TextAlign.center,
              ),
            ],
          ),
        );
      },
    );
  }
}
