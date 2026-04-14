import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class DiscussionForumCardWidget extends StatelessWidget {
  final Map<String, dynamic> discussion;
  final VoidCallback? onTap;

  const DiscussionForumCardWidget({
    Key? key,
    required this.discussion,
    this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final author = discussion['author'] as Map<String, dynamic>? ?? {};
    final replies = discussion['replies'] as int? ?? 0;
    final likes = discussion['likes'] as int? ?? 0;
    final category = discussion['category'] as String? ?? 'General';
    final isExpertAnswer = discussion['hasExpertAnswer'] as bool? ?? false;
    final lastActivity = discussion['lastActivity'] as String? ?? 'Just now';
    final isHot = discussion['isHot'] as bool? ?? false;

    return Card(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 0.5.h),
      elevation: 1,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: EdgeInsets.all(4.w),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header with category and hot indicator
              Row(
                children: [
                  Container(
                    padding:
                        EdgeInsets.symmetric(horizontal: 2.w, vertical: 0.5.h),
                    decoration: BoxDecoration(
                      color: AppTheme.lightTheme.colorScheme.primary
                          .withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      category,
                      style: Theme.of(context).textTheme.labelSmall?.copyWith(
                            color: AppTheme.lightTheme.colorScheme.primary,
                            fontWeight: FontWeight.w500,
                          ),
                    ),
                  ),
                  if (isHot) ...[
                    SizedBox(width: 2.w),
                    Container(
                      padding: EdgeInsets.symmetric(
                          horizontal: 2.w, vertical: 0.5.h),
                      decoration: BoxDecoration(
                        color: Colors.orange.withValues(alpha: 0.1),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          CustomIconWidget(
                            iconName: 'local_fire_department',
                            color: Colors.orange,
                            size: 12,
                          ),
                          SizedBox(width: 1.w),
                          Text(
                            'Hot',
                            style: Theme.of(context)
                                .textTheme
                                .labelSmall
                                ?.copyWith(
                                  color: Colors.orange,
                                  fontWeight: FontWeight.w500,
                                ),
                          ),
                        ],
                      ),
                    ),
                  ],
                  if (isExpertAnswer) ...[
                    SizedBox(width: 2.w),
                    Container(
                      padding: EdgeInsets.symmetric(
                          horizontal: 2.w, vertical: 0.5.h),
                      decoration: BoxDecoration(
                        color: AppTheme.lightTheme.colorScheme.tertiary
                            .withValues(alpha: 0.1),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          CustomIconWidget(
                            iconName: 'verified',
                            color: AppTheme.lightTheme.colorScheme.tertiary,
                            size: 12,
                          ),
                          SizedBox(width: 1.w),
                          Text(
                            'Expert',
                            style: Theme.of(context)
                                .textTheme
                                .labelSmall
                                ?.copyWith(
                                  color:
                                      AppTheme.lightTheme.colorScheme.tertiary,
                                  fontWeight: FontWeight.w500,
                                ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ],
              ),
              SizedBox(height: 1.5.h),

              // Discussion title
              Text(
                discussion['title'] as String? ?? 'Discussion Topic',
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
              SizedBox(height: 1.h),

              // Discussion preview
              if (discussion['preview'] != null)
                Text(
                  discussion['preview'] as String,
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        color: Theme.of(context)
                            .textTheme
                            .bodyMedium
                            ?.color
                            ?.withValues(alpha: 0.7),
                      ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
              SizedBox(height: 2.h),

              // Author and stats
              Row(
                children: [
                  // Author avatar
                  CircleAvatar(
                    radius: 3.w,
                    child: CustomImageWidget(
                      imageUrl: author['avatar'] as String? ?? '',
                      width: 6.w,
                      height: 6.w,
                      fit: BoxFit.cover,
                    ),
                  ),
                  SizedBox(width: 2.w),

                  // Author info
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          author['name'] as String? ?? 'Anonymous',
                          style:
                              Theme.of(context).textTheme.bodySmall?.copyWith(
                                    fontWeight: FontWeight.w500,
                                  ),
                        ),
                        Text(
                          lastActivity,
                          style:
                              Theme.of(context).textTheme.labelSmall?.copyWith(
                                    color: Theme.of(context)
                                        .textTheme
                                        .labelSmall
                                        ?.color
                                        ?.withValues(alpha: 0.6),
                                  ),
                        ),
                      ],
                    ),
                  ),

                  // Stats
                  Row(
                    children: [
                      CustomIconWidget(
                        iconName: 'chat_bubble_outline',
                        color: Theme.of(context)
                                .textTheme
                                .bodySmall
                                ?.color
                                ?.withValues(alpha: 0.6) ??
                            Colors.grey,
                        size: 16,
                      ),
                      SizedBox(width: 1.w),
                      Text(
                        '$replies',
                        style: Theme.of(context).textTheme.bodySmall,
                      ),
                      SizedBox(width: 3.w),
                      CustomIconWidget(
                        iconName: 'favorite_border',
                        color: Theme.of(context)
                                .textTheme
                                .bodySmall
                                ?.color
                                ?.withValues(alpha: 0.6) ??
                            Colors.grey,
                        size: 16,
                      ),
                      SizedBox(width: 1.w),
                      Text(
                        '$likes',
                        style: Theme.of(context).textTheme.bodySmall,
                      ),
                    ],
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
