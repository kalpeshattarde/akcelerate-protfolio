import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../../core/app_export.dart';

class MultipleChoiceWidget extends StatefulWidget {
  final String question;
  final List<String> options;
  final int? selectedIndex;
  final int? correctIndex;
  final bool showResult;
  final Function(int) onOptionSelected;

  const MultipleChoiceWidget({
    Key? key,
    required this.question,
    required this.options,
    this.selectedIndex,
    this.correctIndex,
    this.showResult = false,
    required this.onOptionSelected,
  }) : super(key: key);

  @override
  State<MultipleChoiceWidget> createState() => _MultipleChoiceWidgetState();
}

class _MultipleChoiceWidgetState extends State<MultipleChoiceWidget>
    with TickerProviderStateMixin {
  late AnimationController _shakeController;
  late Animation<double> _shakeAnimation;

  @override
  void initState() {
    super.initState();
    _shakeController = AnimationController(
      duration: const Duration(milliseconds: 500),
      vsync: this,
    );
    _shakeAnimation = Tween<double>(begin: 0, end: 10).animate(
      CurvedAnimation(parent: _shakeController, curve: Curves.elasticIn),
    );
  }

  @override
  void dispose() {
    _shakeController.dispose();
    super.dispose();
  }

  void _triggerShakeAnimation() {
    _shakeController.forward().then((_) {
      _shakeController.reverse();
    });
  }

  Color _getOptionColor(int index) {
    if (!widget.showResult) {
      return widget.selectedIndex == index
          ? AppTheme.lightTheme.colorScheme.primary.withValues(alpha: 0.1)
          : AppTheme.lightTheme.colorScheme.surface;
    }

    if (index == widget.correctIndex) {
      return AppTheme.lightTheme.colorScheme.primary.withValues(alpha: 0.1);
    } else if (index == widget.selectedIndex && index != widget.correctIndex) {
      return AppTheme.lightTheme.colorScheme.error.withValues(alpha: 0.1);
    }
    return AppTheme.lightTheme.colorScheme.surface;
  }

  Color _getOptionBorderColor(int index) {
    if (!widget.showResult) {
      return widget.selectedIndex == index
          ? AppTheme.lightTheme.colorScheme.primary
          : AppTheme.lightTheme.colorScheme.outline;
    }

    if (index == widget.correctIndex) {
      return AppTheme.lightTheme.colorScheme.primary;
    } else if (index == widget.selectedIndex && index != widget.correctIndex) {
      return AppTheme.lightTheme.colorScheme.error;
    }
    return AppTheme.lightTheme.colorScheme.outline;
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _shakeAnimation,
      builder: (context, child) {
        return Transform.translate(
          offset: Offset(_shakeAnimation.value, 0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                width: double.infinity,
                padding: EdgeInsets.all(4.w),
                margin: EdgeInsets.symmetric(horizontal: 4.w),
                decoration: BoxDecoration(
                  color: AppTheme.lightTheme.colorScheme.surface,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(
                    color: AppTheme.lightTheme.colorScheme.outline,
                    width: 1,
                  ),
                ),
                child: Text(
                  widget.question,
                  style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                  textAlign: TextAlign.center,
                ),
              ),
              SizedBox(height: 3.h),
              ...widget.options.asMap().entries.map((entry) {
                final index = entry.key;
                final option = entry.value;
                final isSelected = widget.selectedIndex == index;
                final isCorrect = widget.correctIndex == index;
                final isWrong = widget.showResult &&
                    isSelected &&
                    index != widget.correctIndex;

                return Container(
                  margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
                  child: GestureDetector(
                    onTap: widget.showResult
                        ? null
                        : () {
                            widget.onOptionSelected(index);
                            if (widget.showResult &&
                                index != widget.correctIndex) {
                              _triggerShakeAnimation();
                            }
                          },
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 300),
                      width: double.infinity,
                      padding: EdgeInsets.all(4.w),
                      decoration: BoxDecoration(
                        color: _getOptionColor(index),
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(
                          color: _getOptionBorderColor(index),
                          width: isSelected ? 2 : 1,
                        ),
                      ),
                      child: Row(
                        children: [
                          Container(
                            width: 6.w,
                            height: 6.w,
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              color: isSelected
                                  ? _getOptionBorderColor(index)
                                  : Colors.transparent,
                              border: Border.all(
                                color: _getOptionBorderColor(index),
                                width: 2,
                              ),
                            ),
                            child: isSelected
                                ? Center(
                                    child: CustomIconWidget(
                                      iconName: widget.showResult
                                          ? (isCorrect ? 'check' : 'close')
                                          : 'check',
                                      color: Colors.white,
                                      size: 12,
                                    ),
                                  )
                                : null,
                          ),
                          SizedBox(width: 3.w),
                          Expanded(
                            child: Text(
                              option,
                              style: AppTheme.lightTheme.textTheme.bodyLarge
                                  ?.copyWith(
                                color: isSelected
                                    ? _getOptionBorderColor(index)
                                    : AppTheme.lightTheme.colorScheme.onSurface,
                                fontWeight: isSelected
                                    ? FontWeight.w600
                                    : FontWeight.w400,
                              ),
                            ),
                          ),
                          if (widget.showResult && isCorrect)
                            CustomIconWidget(
                              iconName: 'check_circle',
                              color: AppTheme.lightTheme.colorScheme.primary,
                              size: 20,
                            ),
                          if (isWrong)
                            CustomIconWidget(
                              iconName: 'cancel',
                              color: AppTheme.lightTheme.colorScheme.error,
                              size: 20,
                            ),
                        ],
                      ),
                    ),
                  ),
                );
              }).toList(),
            ],
          ),
        );
      },
    );
  }
}
