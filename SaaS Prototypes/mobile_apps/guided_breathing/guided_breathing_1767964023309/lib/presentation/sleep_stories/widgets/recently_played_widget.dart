import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class RecentlyPlayedWidget extends StatelessWidget {
  final List<Map<String, dynamic>> stories;
  final Function(Map<String, dynamic>) onStoryTap;

  const RecentlyPlayedWidget({
    Key? key,
    required this.stories,
    required this.onStoryTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 15.h,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        padding: EdgeInsets.symmetric(horizontal: 4.w),
        itemCount: stories.length,
        itemBuilder: (context, index) {
          final story = stories[index];
          return GestureDetector(
            onTap: () => onStoryTap(story),
            child: Container(
              width: 30.w,
              margin: EdgeInsets.only(right: 3.w),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Story thumbnail
                  ClipRRect(
                    borderRadius: BorderRadius.circular(12),
                    child: Stack(
                      children: [
                        CachedNetworkImage(
                          imageUrl: story['thumbnail'],
                          height: 10.h,
                          width: 30.w,
                          fit: BoxFit.cover,
                          placeholder: (context, url) => Container(
                            height: 10.h,
                            width: 30.w,
                            color: AppTheme.lightTheme.colorScheme.surface,
                            child: Center(
                              child: CircularProgressIndicator(
                                color:
                                    AppTheme.lightTheme.colorScheme.secondary,
                                strokeWidth: 2,
                              ),
                            ),
                          ),
                          errorWidget: (context, url, error) => Container(
                            height: 10.h,
                            width: 30.w,
                            color: AppTheme.lightTheme.colorScheme.surface,
                            child: Center(
                              child: CustomIconWidget(
                                iconName: 'bedtime',
                                color: AppTheme
                                    .lightTheme.colorScheme.onSurfaceVariant,
                                size: 32,
                              ),
                            ),
                          ),
                        ),

                        // Play indicator
                        Positioned.fill(
                          child: Container(
                            decoration: BoxDecoration(
                              color: Colors.black.withValues(alpha: 0.3),
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: Center(
                              child: Container(
                                padding: EdgeInsets.all(2.w),
                                decoration: BoxDecoration(
                                  color:
                                      AppTheme.lightTheme.colorScheme.secondary,
                                  borderRadius: BorderRadius.circular(20),
                                ),
                                child: CustomIconWidget(
                                  iconName: 'play_arrow',
                                  color: Colors.white,
                                  size: 16,
                                ),
                              ),
                            ),
                          ),
                        ),

                        // Duration badge
                        Positioned(
                          top: 1.w,
                          right: 1.w,
                          child: Container(
                            padding: EdgeInsets.symmetric(
                                horizontal: 1.5.w, vertical: 0.5.w),
                            decoration: BoxDecoration(
                              color: Colors.black.withValues(alpha: 0.7),
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: Text(
                              '${story['duration']}m',
                              style: AppTheme.lightTheme.textTheme.bodySmall
                                  ?.copyWith(
                                color: Colors.white,
                                fontSize: 10,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),

                  SizedBox(height: 1.h),

                  // Story title
                  Text(
                    story['title'],
                    style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                      color: AppTheme.lightTheme.colorScheme.onSurface,
                      fontWeight: FontWeight.w500,
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),

                  // Narrator
                  Text(
                    story['narrator'],
                    style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                      color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
