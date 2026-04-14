import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class SocialComparisonWidget extends StatefulWidget {
  final Map<String, dynamic> userStats;
  final List<Map<String, dynamic>> peerData;

  const SocialComparisonWidget({
    Key? key,
    required this.userStats,
    required this.peerData,
  }) : super(key: key);

  @override
  State<SocialComparisonWidget> createState() => _SocialComparisonWidgetState();
}

class _SocialComparisonWidgetState extends State<SocialComparisonWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 1200),
      vsync: this,
    );
    _animation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _animationController, curve: Curves.easeOutCubic),
    );
    _animationController.forward();
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final userRank = widget.userStats['rank'] as int;
    final totalUsers = widget.peerData.length + 1;
    final percentile = ((totalUsers - userRank) / totalUsers * 100).round();

    return Container(
      width: double.infinity,
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.05),
            blurRadius: 10,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Peer Comparison',
                style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
              Container(
                padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
                decoration: BoxDecoration(
                  color:
                      AppTheme.lightTheme.primaryColor.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    CustomIconWidget(
                      iconName: 'shield',
                      size: 16,
                      color: AppTheme.lightTheme.primaryColor,
                    ),
                    SizedBox(width: 1.w),
                    Text(
                      'Privacy Protected',
                      style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                        color: AppTheme.lightTheme.primaryColor,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          SizedBox(height: 3.h),
          AnimatedBuilder(
            animation: _animation,
            builder: (context, child) {
              return Container(
                width: double.infinity,
                padding: EdgeInsets.all(4.w),
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [
                      AppTheme.lightTheme.primaryColor.withValues(alpha: 0.1),
                      AppTheme.lightTheme.colorScheme.tertiary
                          .withValues(alpha: 0.1),
                    ],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(
                    color:
                        AppTheme.lightTheme.primaryColor.withValues(alpha: 0.2),
                    width: 1,
                  ),
                ),
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        CustomIconWidget(
                          iconName: 'emoji_events',
                          size: 24,
                          color: AppTheme.lightTheme.colorScheme.tertiary,
                        ),
                        SizedBox(width: 2.w),
                        Text(
                          'Your Rank: #$userRank',
                          style: AppTheme.lightTheme.textTheme.titleMedium
                              ?.copyWith(
                            fontWeight: FontWeight.w600,
                            color: AppTheme.lightTheme.primaryColor,
                          ),
                        ),
                      ],
                    ),
                    SizedBox(height: 1.h),
                    Text(
                      'Top $percentile% of learners',
                      style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                        color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                      ),
                    ),
                  ],
                ),
              );
            },
          ),
          SizedBox(height: 3.h),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _buildStatComparison(
                'Weekly XP',
                widget.userStats['weeklyXp'] as int,
                _calculateAverage('weeklyXp'),
                'trending_up',
              ),
              _buildStatComparison(
                'Streak',
                widget.userStats['streak'] as int,
                _calculateAverage('streak'),
                'local_fire_department',
              ),
              _buildStatComparison(
                'Accuracy',
                widget.userStats['accuracy'] as int,
                _calculateAverage('accuracy'),
                'target',
              ),
            ],
          ),
          SizedBox(height: 3.h),
          Text(
            'Performance Insights',
            style: AppTheme.lightTheme.textTheme.titleSmall?.copyWith(
              fontWeight: FontWeight.w600,
            ),
          ),
          SizedBox(height: 2.h),
          AnimatedBuilder(
            animation: _animation,
            builder: (context, child) {
              return Column(
                children: _buildInsights().map((insight) {
                  return Container(
                    width: double.infinity,
                    margin: EdgeInsets.only(bottom: 1.h),
                    padding: EdgeInsets.all(3.w),
                    decoration: BoxDecoration(
                      color: insight['color'].withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(
                        color: insight['color'].withValues(alpha: 0.3),
                        width: 1,
                      ),
                    ),
                    child: Row(
                      children: [
                        CustomIconWidget(
                          iconName: insight['icon'] as String,
                          size: 16,
                          color: insight['color'] as Color,
                        ),
                        SizedBox(width: 2.w),
                        Expanded(
                          child: Text(
                            insight['text'] as String,
                            style: AppTheme.lightTheme.textTheme.bodySmall
                                ?.copyWith(
                              color: AppTheme
                                  .lightTheme.colorScheme.onSurfaceVariant,
                            ),
                          ),
                        ),
                      ],
                    ),
                  );
                }).toList(),
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildStatComparison(
      String label, int userValue, double avgValue, String iconName) {
    final isAboveAverage = userValue > avgValue;
    final difference = ((userValue - avgValue) / avgValue * 100).abs().round();

    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        return Column(
          children: [
            Container(
              width: 12.w,
              height: 12.w,
              decoration: BoxDecoration(
                color: isAboveAverage
                    ? AppTheme.lightTheme.colorScheme.tertiary
                        .withValues(alpha: 0.1)
                    : AppTheme.lightTheme.colorScheme.error
                        .withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Center(
                child: CustomIconWidget(
                  iconName: iconName,
                  size: 20,
                  color: isAboveAverage
                      ? AppTheme.lightTheme.colorScheme.tertiary
                      : AppTheme.lightTheme.colorScheme.error,
                ),
              ),
            ),
            SizedBox(height: 1.h),
            Text(
              '$userValue',
              style: AppTheme.lightTheme.textTheme.titleSmall?.copyWith(
                fontWeight: FontWeight.w600,
                color: isAboveAverage
                    ? AppTheme.lightTheme.colorScheme.tertiary
                    : AppTheme.lightTheme.colorScheme.error,
              ),
            ),
            Text(
              label,
              style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
              ),
            ),
            SizedBox(height: 0.5.h),
            Container(
              padding: EdgeInsets.symmetric(horizontal: 2.w, vertical: 0.5.h),
              decoration: BoxDecoration(
                color: isAboveAverage
                    ? AppTheme.lightTheme.colorScheme.tertiary
                        .withValues(alpha: 0.1)
                    : AppTheme.lightTheme.colorScheme.error
                        .withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Text(
                '${isAboveAverage ? '+' : '-'}$difference%',
                style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                  color: isAboveAverage
                      ? AppTheme.lightTheme.colorScheme.tertiary
                      : AppTheme.lightTheme.colorScheme.error,
                  fontWeight: FontWeight.w500,
                  fontSize: 10.sp,
                ),
              ),
            ),
          ],
        );
      },
    );
  }

  double _calculateAverage(String key) {
    if (widget.peerData.isEmpty) return 0.0;
    final sum =
        widget.peerData.fold<int>(0, (sum, peer) => sum + (peer[key] as int));
    return sum / widget.peerData.length;
  }

  List<Map<String, dynamic>> _buildInsights() {
    final insights = <Map<String, dynamic>>[];

    final weeklyXpAvg = _calculateAverage('weeklyXp');
    final userWeeklyXp = widget.userStats['weeklyXp'] as int;

    if (userWeeklyXp > weeklyXpAvg * 1.2) {
      insights.add({
        'icon': 'trending_up',
        'color': AppTheme.lightTheme.colorScheme.tertiary,
        'text': 'You\'re earning 20% more XP than average learners this week!',
      });
    } else if (userWeeklyXp < weeklyXpAvg * 0.8) {
      insights.add({
        'icon': 'trending_down',
        'color': AppTheme.lightTheme.colorScheme.error,
        'text':
            'Consider increasing your daily practice to match peer performance.',
      });
    }

    final streakAvg = _calculateAverage('streak');
    final userStreak = widget.userStats['streak'] as int;

    if (userStreak > streakAvg * 1.5) {
      insights.add({
        'icon': 'local_fire_department',
        'color': AppTheme.lightTheme.colorScheme.tertiary,
        'text':
            'Outstanding consistency! Your streak is 50% longer than average.',
      });
    }

    final accuracyAvg = _calculateAverage('accuracy');
    final userAccuracy = widget.userStats['accuracy'] as int;

    if (userAccuracy > accuracyAvg + 10) {
      insights.add({
        'icon': 'star',
        'color': AppTheme.lightTheme.colorScheme.tertiary,
        'text':
            'Excellent accuracy! You\'re mastering concepts faster than peers.',
      });
    }

    if (insights.isEmpty) {
      insights.add({
        'icon': 'info',
        'color': AppTheme.lightTheme.primaryColor,
        'text': 'Keep practicing consistently to improve your ranking!',
      });
    }

    return insights;
  }
}
