import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class LeaderboardCardWidget extends StatelessWidget {
  final Map<String, dynamic> user;
  final int rank;
  final bool isCurrentUser;

  const LeaderboardCardWidget({
    Key? key,
    required this.user,
    required this.rank,
    this.isCurrentUser = false,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final xp = user['xp'] as int? ?? 0;
    final weeklyXp = user['weeklyXp'] as int? ?? 0;
    final previousRank = user['previousRank'] as int? ?? rank;
    final rankChange = previousRank - rank;

    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 0.5.h),
      decoration: BoxDecoration(
        color: isCurrentUser
            ? AppTheme.lightTheme.colorScheme.primary.withValues(alpha: 0.1)
            : AppTheme.lightTheme.colorScheme.surface,
        borderRadius: BorderRadius.circular(12),
        border: isCurrentUser
            ? Border.all(
                color: AppTheme.lightTheme.colorScheme.primary,
                width: 2,
              )
            : null,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.05),
            blurRadius: 4,
            offset: Offset(0, 2),
          ),
        ],
      ),
      child: Padding(
        padding: EdgeInsets.all(4.w),
        child: Row(
          children: [
            // Rank with trophy for top 3
            Container(
              width: 12.w,
              height: 12.w,
              decoration: BoxDecoration(
                color: _getRankColor(rank),
                shape: BoxShape.circle,
              ),
              child: Center(
                child: rank <= 3
                    ? CustomIconWidget(
                        iconName: 'emoji_events',
                        color: Colors.white,
                        size: 20,
                      )
                    : Text(
                        '$rank',
                        style:
                            Theme.of(context).textTheme.titleMedium?.copyWith(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold,
                                ),
                      ),
              ),
            ),
            SizedBox(width: 3.w),

            // User avatar
            CircleAvatar(
              radius: 5.w,
              child: CustomImageWidget(
                imageUrl: user['avatar'] as String? ?? '',
                width: 10.w,
                height: 10.w,
                fit: BoxFit.cover,
              ),
            ),
            SizedBox(width: 3.w),

            // User info
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: Text(
                          user['name'] as String? ?? 'Unknown',
                          style: Theme.of(context)
                              .textTheme
                              .titleMedium
                              ?.copyWith(
                                fontWeight: FontWeight.w600,
                                color: isCurrentUser
                                    ? AppTheme.lightTheme.colorScheme.primary
                                    : null,
                              ),
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                      if (rankChange != 0)
                        Container(
                          padding: EdgeInsets.symmetric(
                              horizontal: 2.w, vertical: 0.5.h),
                          decoration: BoxDecoration(
                            color: rankChange > 0
                                ? Colors.green.withValues(alpha: 0.1)
                                : Colors.red.withValues(alpha: 0.1),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              CustomIconWidget(
                                iconName: rankChange > 0
                                    ? 'keyboard_arrow_up'
                                    : 'keyboard_arrow_down',
                                color:
                                    rankChange > 0 ? Colors.green : Colors.red,
                                size: 14,
                              ),
                              Text(
                                '${rankChange.abs()}',
                                style: Theme.of(context)
                                    .textTheme
                                    .labelSmall
                                    ?.copyWith(
                                      color: rankChange > 0
                                          ? Colors.green
                                          : Colors.red,
                                      fontWeight: FontWeight.w500,
                                    ),
                              ),
                            ],
                          ),
                        ),
                    ],
                  ),
                  SizedBox(height: 0.5.h),

                  // XP info
                  Row(
                    children: [
                      CustomIconWidget(
                        iconName: 'stars',
                        color: AppTheme.lightTheme.colorScheme.tertiary,
                        size: 14,
                      ),
                      SizedBox(width: 1.w),
                      Text(
                        '$weeklyXp XP this week',
                        style: Theme.of(context).textTheme.bodySmall,
                      ),
                      Spacer(),
                      Text(
                        '$xp total XP',
                        style: Theme.of(context).textTheme.bodySmall?.copyWith(
                              fontWeight: FontWeight.w500,
                            ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Color _getRankColor(int rank) {
    switch (rank) {
      case 1:
        return Color(0xFFFFD700); // Gold
      case 2:
        return Color(0xFFC0C0C0); // Silver
      case 3:
        return Color(0xFFCD7F32); // Bronze
      default:
        return AppTheme.lightTheme.colorScheme.primary;
    }
  }
}
