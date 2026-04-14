import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../theme/app_theme.dart';
import '../../../widgets/custom_icon_widget.dart';
import '../../../widgets/custom_image_widget.dart';

class QuickAccessCardsWidget extends StatelessWidget {
  final VoidCallback onMeditationTap;
  final VoidCallback onSleepStoriesTap;
  final VoidCallback onRecentSessionsTap;

  const QuickAccessCardsWidget({
    Key? key,
    required this.onMeditationTap,
    required this.onSleepStoriesTap,
    required this.onRecentSessionsTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 22.h,
      child: ListView(
        scrollDirection: Axis.horizontal,
        padding: EdgeInsets.symmetric(horizontal: 4.w),
        children: [
          _buildEnhancedQuickAccessCard(
            title: "Today's Meditation",
            subtitle: "5 min • Anxiety Relief",
            iconName: 'self_improvement',
            imageUrl:
                'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3',
            onTap: onMeditationTap,
            gradientColors: [Colors.indigo.shade300, Colors.purple.shade200],
          ),
          SizedBox(width: 4.w),
          _buildEnhancedQuickAccessCard(
            title: "Sleep Stories",
            subtitle: "Peaceful Forest",
            iconName: 'bedtime',
            imageUrl:
                'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3',
            onTap: onSleepStoriesTap,
            gradientColors: [
              Colors.deepPurple.shade300,
              Colors.indigo.shade200,
            ],
          ),
          SizedBox(width: 4.w),
          _buildEnhancedQuickAccessCard(
            title: "Recent Sessions",
            subtitle: "Box Breathing • 3 min",
            iconName: 'history',
            imageUrl:
                'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3',
            onTap: onRecentSessionsTap,
            gradientColors: [Colors.teal.shade300, Colors.green.shade200],
          ),
        ],
      ),
    );
  }

  Widget _buildEnhancedQuickAccessCard({
    required String title,
    required String subtitle,
    required String iconName,
    required String imageUrl,
    required VoidCallback onTap,
    required List<Color> gradientColors,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 42.w,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(16),
          boxShadow: [
            BoxShadow(
              color: AppTheme.lightTheme.colorScheme.shadow.withAlpha(38),
              blurRadius: 12,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(16),
          child: Stack(
            children: [
              // Background Image
              Positioned.fill(
                child: CustomImageWidget(
                  imageUrl: imageUrl,
                  fit: BoxFit.cover,
                  errorWidget: Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                        colors: gradientColors,
                      ),
                    ),
                  ),
                ),
              ),

              // Gradient Overlay
              Positioned.fill(
                child: Container(
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [
                        Colors.black.withAlpha(77),
                        Colors.black.withAlpha(179),
                      ],
                    ),
                  ),
                ),
              ),

              // Content
              Padding(
                padding: EdgeInsets.all(4.w),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Top section with icon
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Container(
                          padding: EdgeInsets.all(2.w),
                          decoration: BoxDecoration(
                            color: Colors.white.withAlpha(51),
                            borderRadius: BorderRadius.circular(8),
                            border: Border.all(
                              color: Colors.white.withAlpha(77),
                              width: 1,
                            ),
                          ),
                          child: CustomIconWidget(
                            iconName: iconName,
                            color: Colors.white,
                            size: 20,
                          ),
                        ),
                        // Category indicator
                        Container(
                          padding: EdgeInsets.symmetric(
                            horizontal: 2.w,
                            vertical: 1.w,
                          ),
                          decoration: BoxDecoration(
                            color: Colors.white.withAlpha(38),
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(
                              color: Colors.white.withAlpha(51),
                              width: 1,
                            ),
                          ),
                          child: Icon(
                            _getCategoryIcon(iconName),
                            color: Colors.white.withAlpha(230),
                            size: 16,
                          ),
                        ),
                      ],
                    ),

                    const Spacer(),

                    // Bottom section with text
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          title,
                          style: AppTheme.lightTheme.textTheme.titleSmall
                              ?.copyWith(
                                color: Colors.white,
                                fontWeight: FontWeight.w700,
                                fontSize: 13.sp,
                                shadows: [
                                  Shadow(
                                    color: Colors.black.withAlpha(128),
                                    offset: const Offset(0, 1),
                                    blurRadius: 2,
                                  ),
                                ],
                              ),
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                        ),
                        SizedBox(height: 0.8.h),
                        Text(
                          subtitle,
                          style: AppTheme.lightTheme.textTheme.bodySmall
                              ?.copyWith(
                                color: Colors.white.withAlpha(230),
                                fontSize: 10.sp,
                                fontWeight: FontWeight.w500,
                                shadows: [
                                  Shadow(
                                    color: Colors.black.withAlpha(128),
                                    offset: const Offset(0, 1),
                                    blurRadius: 2,
                                  ),
                                ],
                              ),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ],
                    ),
                  ],
                ),
              ),

              // Shine effect on hover/press (subtle)
              Positioned.fill(
                child: Material(
                  color: Colors.transparent,
                  child: InkWell(
                    onTap: onTap,
                    borderRadius: BorderRadius.circular(16),
                    splashColor: Colors.white.withAlpha(26),
                    highlightColor: Colors.white.withAlpha(13),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  IconData _getCategoryIcon(String iconName) {
    switch (iconName) {
      case 'self_improvement':
        return Icons.spa; // Meditation/wellness icon
      case 'bedtime':
        return Icons.nights_stay; // Sleep/moon icon
      case 'history':
        return Icons.refresh; // Recent/activity icon
      default:
        return Icons.circle;
    }
  }
}
