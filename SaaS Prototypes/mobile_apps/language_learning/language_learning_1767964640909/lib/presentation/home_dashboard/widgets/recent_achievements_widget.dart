import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../../core/app_export.dart';
import '../../../theme/app_theme.dart';
import '../../../widgets/custom_icon_widget.dart';

class RecentAchievementsWidget extends StatefulWidget {
  final List<Map<String, dynamic>> achievements;

  const RecentAchievementsWidget({Key? key, required this.achievements})
    : super(key: key);

  @override
  State<RecentAchievementsWidget> createState() =>
      _RecentAchievementsWidgetState();
}

class _RecentAchievementsWidgetState extends State<RecentAchievementsWidget>
    with TickerProviderStateMixin {
  late List<AnimationController> _animationControllers;
  late List<Animation<double>> _scaleAnimations;
  late List<Animation<double>> _rotationAnimations;

  @override
  void initState() {
    super.initState();
    _initializeAnimations();
  }

  void _initializeAnimations() {
    _animationControllers = List.generate(
      widget.achievements.length,
      (index) => AnimationController(
        duration: Duration(milliseconds: 800 + (index * 200)),
        vsync: this,
      ),
    );

    _scaleAnimations =
        _animationControllers.map((controller) {
          return Tween<double>(begin: 0.0, end: 1.0).animate(
            CurvedAnimation(parent: controller, curve: Curves.elasticOut),
          );
        }).toList();

    _rotationAnimations =
        _animationControllers.map((controller) {
          return Tween<double>(begin: 0.0, end: 1.0).animate(
            CurvedAnimation(parent: controller, curve: Curves.easeInOut),
          );
        }).toList();

    // Start animations with delays
    for (int i = 0; i < _animationControllers.length; i++) {
      Future.delayed(Duration(milliseconds: i * 150), () {
        if (mounted) {
          _animationControllers[i].forward();
        }
      });
    }
  }

  @override
  void dispose() {
    for (final controller in _animationControllers) {
      controller.dispose();
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (widget.achievements.isEmpty) {
      return const SizedBox.shrink();
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Header section with improved spacing
        Padding(
          padding: EdgeInsets.symmetric(horizontal: 4.w),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Row(
                children: [
                  Container(
                    padding: EdgeInsets.all(2.w),
                    decoration: BoxDecoration(
                      color: AppTheme.getAccentColor(
                        true,
                      ).withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: CustomIconWidget(
                      iconName: 'emoji_events',
                      color: AppTheme.getAccentColor(true),
                      size: 20,
                    ),
                  ),
                  SizedBox(width: 3.w),
                  Text(
                    'Recent Achievements',
                    style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.w700,
                      color: const Color(0xFF2C3E50),
                    ),
                  ),
                ],
              ),
              GestureDetector(
                onTap:
                    () => Navigator.pushNamed(context, '/progress-analytics'),
                child: Container(
                  padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
                  decoration: BoxDecoration(
                    color: AppTheme.lightTheme.colorScheme.primary.withValues(
                      alpha: 0.1,
                    ),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Text(
                    'View All',
                    style: AppTheme.lightTheme.textTheme.labelMedium?.copyWith(
                      color: AppTheme.lightTheme.colorScheme.primary,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
        SizedBox(height: 2.5.h),

        // Achievement cards with perfect alignment and consistent spacing
        Container(
          margin: EdgeInsets.symmetric(horizontal: 4.w),
          child: IntrinsicHeight(
            child: Row(
              crossAxisAlignment:
                  CrossAxisAlignment.stretch, // Ensures equal heights
              mainAxisAlignment:
                  MainAxisAlignment.spaceBetween, // Perfect distribution
              children: List.generate(
                widget.achievements.length > 3 ? 3 : widget.achievements.length,
                (index) {
                  return Expanded(
                    flex: 1, // Ensures equal width distribution
                    child: Container(
                      margin: EdgeInsets.only(
                        right:
                            index < 2 && index < widget.achievements.length - 1
                                ? 2.w
                                : 0,
                        left: index > 0 ? 2.w : 0,
                      ),
                      child: _buildAchievementBadge(
                        context,
                        widget.achievements[index],
                        index,
                      ),
                    ),
                  );
                },
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildAchievementBadge(
    BuildContext context,
    Map<String, dynamic> achievement,
    int index,
  ) {
    return AnimatedBuilder(
      animation: _animationControllers[index],
      builder: (context, child) {
        return Transform.scale(
          scale: _scaleAnimations[index].value,
          child: Transform.rotate(
            angle:
                _rotationAnimations[index].value *
                0.05, // Reduced rotation for subtlety
            child: GestureDetector(
              onTap: () => _showAchievementDetails(context, achievement),
              child: Container(
                height: 15.h, // Fixed height ensures perfect alignment
                width: double.infinity, // Ensures full width usage
                padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 2.h),
                decoration: BoxDecoration(
                  // Enhanced beige/cream background with subtle gradient
                  gradient: LinearGradient(
                    colors: [
                      const Color(0xFFF8F5F0), // Lighter cream
                      const Color(0xFFF5F1E8), // Original beige/cream
                    ],
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                  ),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(
                    color: const Color(0xFFE8DCC0).withValues(alpha: 0.7),
                    width: 1.2,
                  ),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withValues(alpha: 0.08),
                      blurRadius: 12,
                      offset: const Offset(0, 4),
                      spreadRadius: 0,
                    ),
                    BoxShadow(
                      color: Colors.white.withValues(alpha: 0.5),
                      blurRadius: 6,
                      offset: const Offset(0, -1),
                      spreadRadius: 0,
                    ),
                  ],
                ),
                child: Column(
                  mainAxisAlignment:
                      MainAxisAlignment.center, // Perfect vertical centering
                  crossAxisAlignment:
                      CrossAxisAlignment.center, // Perfect horizontal centering
                  mainAxisSize: MainAxisSize.max,
                  children: [
                    // Enhanced achievement icon with improved styling
                    Container(
                      width: 11.w,
                      height: 11.w,
                      decoration: BoxDecoration(
                        // Enhanced orange gradient background
                        gradient: LinearGradient(
                          colors: [
                            AppTheme.getAccentColor(true),
                            AppTheme.getAccentColor(
                              true,
                            ).withValues(alpha: 0.8),
                          ],
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                        ),
                        shape: BoxShape.circle,
                        boxShadow: [
                          BoxShadow(
                            color: AppTheme.getAccentColor(
                              true,
                            ).withValues(alpha: 0.4),
                            blurRadius: 8,
                            offset: const Offset(0, 3),
                            spreadRadius: 0,
                          ),
                        ],
                      ),
                      child: Center(
                        child: CustomIconWidget(
                          iconName: achievement['icon'] as String,
                          color: Colors.white,
                          size: 18,
                        ),
                      ),
                    ),
                    SizedBox(height: 1.8.h),

                    // Achievement title with enhanced typography
                    Flexible(
                      child: Container(
                        alignment:
                            Alignment.center, // Ensures perfect text alignment
                        child: Text(
                          achievement['title'] as String,
                          style: AppTheme.lightTheme.textTheme.labelMedium
                              ?.copyWith(
                                fontWeight: FontWeight.w600,
                                color: const Color(0xFF2C3E50),
                                height: 1.25,
                                letterSpacing: -0.2,
                              ),
                          textAlign: TextAlign.center,
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        );
      },
    );
  }

  void _showAchievementDetails(
    BuildContext context,
    Map<String, dynamic> achievement,
  ) {
    showDialog(
      context: context,
      builder:
          (context) => Dialog(
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(20),
            ),
            child: Container(
              padding: EdgeInsets.all(6.w),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(20),
                gradient: LinearGradient(
                  colors: [
                    AppTheme.getAccentColor(true).withValues(alpha: 0.1),
                    AppTheme.getAccentColor(true).withValues(alpha: 0.05),
                  ],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  // Celebration Icon
                  Container(
                    width: 20.w,
                    height: 20.w,
                    decoration: BoxDecoration(
                      color: AppTheme.getAccentColor(true),
                      shape: BoxShape.circle,
                      boxShadow: [
                        BoxShadow(
                          color: AppTheme.getAccentColor(
                            true,
                          ).withValues(alpha: 0.3),
                          blurRadius: 16,
                          offset: const Offset(0, 4),
                        ),
                      ],
                    ),
                    child: Center(
                      child: CustomIconWidget(
                        iconName: achievement['icon'] as String,
                        color: Colors.white,
                        size: 32,
                      ),
                    ),
                  ),
                  SizedBox(height: 3.h),

                  // Achievement Title
                  Text(
                    'Achievement Unlocked!',
                    style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.w700,
                      color: AppTheme.getAccentColor(true),
                    ),
                    textAlign: TextAlign.center,
                  ),
                  SizedBox(height: 1.h),

                  Text(
                    achievement['title'] as String,
                    style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  SizedBox(height: 2.h),

                  // Achievement Description
                  Text(
                    achievement['description'] as String,
                    style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                      color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  SizedBox(height: 3.h),

                  // Close Button
                  ElevatedButton(
                    onPressed: () => Navigator.pop(context),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppTheme.getAccentColor(true),
                      foregroundColor: Colors.white,
                      padding: EdgeInsets.symmetric(
                        horizontal: 8.w,
                        vertical: 1.5.h,
                      ),
                    ),
                    child: const Text('Awesome!'),
                  ),
                ],
              ),
            ),
          ),
    );
  }
}
