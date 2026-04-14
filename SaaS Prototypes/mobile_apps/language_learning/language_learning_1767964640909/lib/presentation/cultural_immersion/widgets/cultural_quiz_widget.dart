import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class CulturalQuizWidget extends StatefulWidget {
  final Map<String, dynamic> quiz;
  final Function(bool) onAnswered;

  const CulturalQuizWidget({
    Key? key,
    required this.quiz,
    required this.onAnswered,
  }) : super(key: key);

  @override
  State<CulturalQuizWidget> createState() => _CulturalQuizWidgetState();
}

class _CulturalQuizWidgetState extends State<CulturalQuizWidget>
    with TickerProviderStateMixin {
  int? selectedAnswerIndex;
  bool hasAnswered = false;
  late AnimationController _animationController;
  late Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: Duration(milliseconds: 300),
      vsync: this,
    );
    _scaleAnimation = Tween<double>(
      begin: 1.0,
      end: 1.05,
    ).animate(CurvedAnimation(
      parent: _animationController,
      curve: Curves.elasticOut,
    ));
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  void _selectAnswer(int index) {
    if (hasAnswered) return;

    setState(() {
      selectedAnswerIndex = index;
      hasAnswered = true;
    });

    _animationController.forward();

    final isCorrect = index == (widget.quiz["correctAnswer"] as int);
    widget.onAnswered(isCorrect);
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
      padding: EdgeInsets.all(5.w),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.1),
            blurRadius: 16,
            offset: Offset(0, 8),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: EdgeInsets.all(2.w),
                decoration: BoxDecoration(
                  color: AppTheme.lightTheme.colorScheme.primary
                      .withValues(alpha: 0.1),
                  shape: BoxShape.circle,
                ),
                child: CustomIconWidget(
                  iconName: 'quiz',
                  color: AppTheme.lightTheme.colorScheme.primary,
                  size: 24,
                ),
              ),
              SizedBox(width: 3.w),
              Expanded(
                child: Text(
                  'Cultural Knowledge Quiz',
                  style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ],
          ),
          SizedBox(height: 3.h),
          if (widget.quiz["image"] != null) ...[
            ClipRRect(
              borderRadius: BorderRadius.circular(12),
              child: CustomImageWidget(
                imageUrl: widget.quiz["image"] as String,
                width: double.infinity,
                height: 20.h,
                fit: BoxFit.cover,
              ),
            ),
            SizedBox(height: 3.h),
          ],
          Text(
            widget.quiz["question"] as String,
            style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.w600,
              height: 1.4,
            ),
          ),
          SizedBox(height: 3.h),
          ...(widget.quiz["options"] as List).asMap().entries.map(
            (entry) {
              final index = entry.key;
              final option = entry.value as String;
              final isSelected = selectedAnswerIndex == index;
              final isCorrect = index == (widget.quiz["correctAnswer"] as int);

              Color backgroundColor;
              Color borderColor;
              Color textColor = AppTheme.lightTheme.colorScheme.onSurface;

              if (!hasAnswered) {
                backgroundColor = AppTheme.lightTheme.colorScheme.surface;
                borderColor = AppTheme.lightTheme.colorScheme.outline;
              } else if (isSelected) {
                if (isCorrect) {
                  backgroundColor =
                      AppTheme.getSuccessColor(true).withValues(alpha: 0.1);
                  borderColor = AppTheme.getSuccessColor(true);
                  textColor = AppTheme.getSuccessColor(true);
                } else {
                  backgroundColor = AppTheme.lightTheme.colorScheme.error
                      .withValues(alpha: 0.1);
                  borderColor = AppTheme.lightTheme.colorScheme.error;
                  textColor = AppTheme.lightTheme.colorScheme.error;
                }
              } else if (isCorrect && hasAnswered) {
                backgroundColor =
                    AppTheme.getSuccessColor(true).withValues(alpha: 0.1);
                borderColor = AppTheme.getSuccessColor(true);
                textColor = AppTheme.getSuccessColor(true);
              } else {
                backgroundColor = AppTheme.lightTheme.colorScheme.surface;
                borderColor = AppTheme.lightTheme.colorScheme.outline
                    .withValues(alpha: 0.5);
                textColor = AppTheme.lightTheme.colorScheme.onSurfaceVariant;
              }

              return AnimatedBuilder(
                animation: _scaleAnimation,
                builder: (context, child) {
                  return Transform.scale(
                    scale:
                        isSelected && hasAnswered ? _scaleAnimation.value : 1.0,
                    child: GestureDetector(
                      onTap: () => _selectAnswer(index),
                      child: Container(
                        width: double.infinity,
                        margin: EdgeInsets.only(bottom: 2.h),
                        padding: EdgeInsets.all(4.w),
                        decoration: BoxDecoration(
                          color: backgroundColor,
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(color: borderColor, width: 1.5),
                        ),
                        child: Row(
                          children: [
                            Container(
                              width: 6.w,
                              height: 6.w,
                              decoration: BoxDecoration(
                                color: isSelected || (isCorrect && hasAnswered)
                                    ? (isCorrect
                                        ? AppTheme.getSuccessColor(true)
                                        : AppTheme.lightTheme.colorScheme.error)
                                    : Colors.transparent,
                                shape: BoxShape.circle,
                                border: Border.all(
                                  color: borderColor,
                                  width: 2,
                                ),
                              ),
                              child: (isSelected || (isCorrect && hasAnswered))
                                  ? CustomIconWidget(
                                      iconName: isCorrect ? 'check' : 'close',
                                      color: Colors.white,
                                      size: 16,
                                    )
                                  : null,
                            ),
                            SizedBox(width: 4.w),
                            Expanded(
                              child: Text(
                                option,
                                style: AppTheme.lightTheme.textTheme.bodyLarge
                                    ?.copyWith(
                                  color: textColor,
                                  fontWeight: isSelected
                                      ? FontWeight.w600
                                      : FontWeight.w400,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  );
                },
              );
            },
          ).toList(),
          if (hasAnswered) ...[
            SizedBox(height: 2.h),
            Container(
              width: double.infinity,
              padding: EdgeInsets.all(4.w),
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.colorScheme.primary
                    .withValues(alpha: 0.05),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(
                  color: AppTheme.lightTheme.colorScheme.primary
                      .withValues(alpha: 0.2),
                  width: 1,
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      CustomIconWidget(
                        iconName: 'info',
                        color: AppTheme.lightTheme.colorScheme.primary,
                        size: 20,
                      ),
                      SizedBox(width: 2.w),
                      Text(
                        'Cultural Insight',
                        style:
                            AppTheme.lightTheme.textTheme.titleSmall?.copyWith(
                          color: AppTheme.lightTheme.colorScheme.primary,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 1.h),
                  Text(
                    widget.quiz["explanation"] as String,
                    style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                      height: 1.4,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ],
      ),
    );
  }
}
