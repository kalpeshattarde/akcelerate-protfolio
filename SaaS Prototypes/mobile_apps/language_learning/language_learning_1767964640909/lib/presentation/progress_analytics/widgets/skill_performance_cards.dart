import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class SkillPerformanceCards extends StatefulWidget {
  final List<Map<String, dynamic>> skillsData;

  const SkillPerformanceCards({
    Key? key,
    required this.skillsData,
  }) : super(key: key);

  @override
  State<SkillPerformanceCards> createState() => _SkillPerformanceCardsState();
}

class _SkillPerformanceCardsState extends State<SkillPerformanceCards>
    with TickerProviderStateMixin {
  late List<AnimationController> _animationControllers;
  late List<Animation<double>> _slideAnimations;
  late List<Animation<double>> _progressAnimations;

  @override
  void initState() {
    super.initState();
    _animationControllers = List.generate(
      widget.skillsData.length,
      (index) => AnimationController(
        duration: Duration(milliseconds: 800 + (index * 200)),
        vsync: this,
      ),
    );

    _slideAnimations = _animationControllers.map((controller) {
      return Tween<double>(begin: 50.0, end: 0.0).animate(
        CurvedAnimation(parent: controller, curve: Curves.easeOutCubic),
      );
    }).toList();

    _progressAnimations = _animationControllers.map((controller) {
      return Tween<double>(begin: 0.0, end: 1.0).animate(
        CurvedAnimation(parent: controller, curve: Curves.easeOutCubic),
      );
    }).toList();

    // Stagger animations
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
    for (var controller in _animationControllers) {
      controller.dispose();
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: EdgeInsets.symmetric(horizontal: 4.w),
          child: Text(
            'Skill Performance',
            style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
        SizedBox(height: 2.h),
        ListView.separated(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          padding: EdgeInsets.symmetric(horizontal: 4.w),
          itemCount: widget.skillsData.length,
          separatorBuilder: (context, index) => SizedBox(height: 2.h),
          itemBuilder: (context, index) {
            final skill = widget.skillsData[index];
            return AnimatedBuilder(
              animation: _animationControllers[index],
              builder: (context, child) {
                return Transform.translate(
                  offset: Offset(0, _slideAnimations[index].value),
                  child: Opacity(
                    opacity: _progressAnimations[index].value,
                    child: _buildSkillCard(skill, index),
                  ),
                );
              },
            );
          },
        ),
      ],
    );
  }

  Widget _buildSkillCard(Map<String, dynamic> skill, int index) {
    final skillName = skill['name'] as String;
    final currentLevel = skill['currentLevel'] as double;
    final maxLevel = skill['maxLevel'] as double;
    final progress = currentLevel / maxLevel;
    final strengths = (skill['strengths'] as List).cast<String>();
    final improvements = (skill['improvements'] as List).cast<String>();
    final iconName = skill['icon'] as String;
    final recommendations = (skill['recommendations'] as List).cast<String>();

    Color skillColor;
    switch (skillName.toLowerCase()) {
      case 'listening':
        skillColor = AppTheme.lightTheme.primaryColor;
        break;
      case 'speaking':
        skillColor = AppTheme.lightTheme.colorScheme.tertiary;
        break;
      case 'reading':
        skillColor = AppTheme.lightTheme.colorScheme.secondary;
        break;
      case 'writing':
        skillColor = const Color(0xFF9C27B0);
        break;
      default:
        skillColor = AppTheme.lightTheme.primaryColor;
    }

    return Container(
      width: double.infinity,
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: skillColor.withValues(alpha: 0.2),
          width: 1,
        ),
        boxShadow: [
          BoxShadow(
            color: skillColor.withValues(alpha: 0.1),
            blurRadius: 10,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                width: 12.w,
                height: 12.w,
                decoration: BoxDecoration(
                  color: skillColor.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Center(
                  child: CustomIconWidget(
                    iconName: iconName,
                    size: 24,
                    color: skillColor,
                  ),
                ),
              ),
              SizedBox(width: 3.w),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      skillName,
                      style:
                          AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w600,
                        color: skillColor,
                      ),
                    ),
                    SizedBox(height: 0.5.h),
                    Text(
                      'Level ${currentLevel.toInt()}/${maxLevel.toInt()}',
                      style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                        color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                      ),
                    ),
                  ],
                ),
              ),
              Container(
                padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
                decoration: BoxDecoration(
                  color: skillColor.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Text(
                  '${(progress * 100).round()}%',
                  style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                    color: skillColor,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ],
          ),
          SizedBox(height: 2.h),
          AnimatedBuilder(
            animation: _progressAnimations[index],
            builder: (context, child) {
              return LinearProgressIndicator(
                value: progress * _progressAnimations[index].value,
                backgroundColor: skillColor.withValues(alpha: 0.2),
                valueColor: AlwaysStoppedAnimation<Color>(skillColor),
                minHeight: 6,
              );
            },
          ),
          SizedBox(height: 3.h),
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        CustomIconWidget(
                          iconName: 'trending_up',
                          size: 16,
                          color: AppTheme.lightTheme.colorScheme.tertiary,
                        ),
                        SizedBox(width: 1.w),
                        Text(
                          'Strengths',
                          style:
                              AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                            color: AppTheme.lightTheme.colorScheme.tertiary,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
                    SizedBox(height: 1.h),
                    ...strengths
                        .map((strength) => Padding(
                              padding: EdgeInsets.only(bottom: 0.5.h),
                              child: Row(
                                children: [
                                  Container(
                                    width: 4,
                                    height: 4,
                                    decoration: BoxDecoration(
                                      color: AppTheme
                                          .lightTheme.colorScheme.tertiary,
                                      shape: BoxShape.circle,
                                    ),
                                  ),
                                  SizedBox(width: 2.w),
                                  Expanded(
                                    child: Text(
                                      strength,
                                      style: AppTheme
                                          .lightTheme.textTheme.bodySmall
                                          ?.copyWith(
                                        color: AppTheme.lightTheme.colorScheme
                                            .onSurfaceVariant,
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ))
                        .toList(),
                  ],
                ),
              ),
              SizedBox(width: 4.w),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        CustomIconWidget(
                          iconName: 'trending_down',
                          size: 16,
                          color: AppTheme.lightTheme.colorScheme.error,
                        ),
                        SizedBox(width: 1.w),
                        Text(
                          'Improvements',
                          style:
                              AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                            color: AppTheme.lightTheme.colorScheme.error,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
                    SizedBox(height: 1.h),
                    ...improvements
                        .map((improvement) => Padding(
                              padding: EdgeInsets.only(bottom: 0.5.h),
                              child: Row(
                                children: [
                                  Container(
                                    width: 4,
                                    height: 4,
                                    decoration: BoxDecoration(
                                      color:
                                          AppTheme.lightTheme.colorScheme.error,
                                      shape: BoxShape.circle,
                                    ),
                                  ),
                                  SizedBox(width: 2.w),
                                  Expanded(
                                    child: Text(
                                      improvement,
                                      style: AppTheme
                                          .lightTheme.textTheme.bodySmall
                                          ?.copyWith(
                                        color: AppTheme.lightTheme.colorScheme
                                            .onSurfaceVariant,
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ))
                        .toList(),
                  ],
                ),
              ),
            ],
          ),
          if (recommendations.isNotEmpty) ...[
            SizedBox(height: 3.h),
            Container(
              width: double.infinity,
              padding: EdgeInsets.all(3.w),
              decoration: BoxDecoration(
                color: skillColor.withValues(alpha: 0.05),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(
                  color: skillColor.withValues(alpha: 0.2),
                  width: 1,
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      CustomIconWidget(
                        iconName: 'lightbulb',
                        size: 16,
                        color: skillColor,
                      ),
                      SizedBox(width: 1.w),
                      Text(
                        'AI Recommendations',
                        style:
                            AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                          color: skillColor,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 1.h),
                  ...recommendations
                      .take(2)
                      .map((recommendation) => Padding(
                            padding: EdgeInsets.only(bottom: 0.5.h),
                            child: Text(
                              '• $recommendation',
                              style: AppTheme.lightTheme.textTheme.bodySmall
                                  ?.copyWith(
                                color: AppTheme
                                    .lightTheme.colorScheme.onSurfaceVariant,
                              ),
                            ),
                          ))
                      .toList(),
                ],
              ),
            ),
          ],
        ],
      ),
    );
  }
}
