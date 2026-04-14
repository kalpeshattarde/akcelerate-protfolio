import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../../core/app_export.dart';

class AudioMatchingWidget extends StatefulWidget {
  final String word;
  final String audioUrl;
  final List<String> options;
  final int correctIndex;
  final Function(int) onOptionSelected;
  final bool showResult;
  final int? selectedIndex;

  const AudioMatchingWidget({
    Key? key,
    required this.word,
    required this.audioUrl,
    required this.options,
    required this.correctIndex,
    required this.onOptionSelected,
    this.showResult = false,
    this.selectedIndex,
  }) : super(key: key);

  @override
  State<AudioMatchingWidget> createState() => _AudioMatchingWidgetState();
}

class _AudioMatchingWidgetState extends State<AudioMatchingWidget>
    with TickerProviderStateMixin {
  bool _isPlaying = false;
  late AnimationController _waveController;
  late AnimationController _shakeController;
  late Animation<double> _waveAnimation;
  late Animation<double> _shakeAnimation;

  @override
  void initState() {
    super.initState();
    _waveController = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    );
    _shakeController = AnimationController(
      duration: const Duration(milliseconds: 500),
      vsync: this,
    );
    _waveAnimation = Tween<double>(begin: 0, end: 1).animate(
      CurvedAnimation(parent: _waveController, curve: Curves.easeInOut),
    );
    _shakeAnimation = Tween<double>(begin: 0, end: 10).animate(
      CurvedAnimation(parent: _shakeController, curve: Curves.elasticIn),
    );
  }

  @override
  void dispose() {
    _waveController.dispose();
    _shakeController.dispose();
    super.dispose();
  }

  void _playAudio() {
    setState(() {
      _isPlaying = true;
    });
    _waveController.repeat();

    // Simulate audio playback duration
    Future.delayed(const Duration(seconds: 2), () {
      if (mounted) {
        setState(() {
          _isPlaying = false;
        });
        _waveController.stop();
        _waveController.reset();
      }
    });
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
                child: Column(
                  children: [
                    Text(
                      'Listen and select the correct meaning',
                      style:
                          AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    SizedBox(height: 3.h),
                    GestureDetector(
                      onTap: _playAudio,
                      child: Container(
                        width: 20.w,
                        height: 20.w,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: AppTheme.lightTheme.colorScheme.primary,
                          boxShadow: [
                            BoxShadow(
                              color: AppTheme.lightTheme.colorScheme.primary
                                  .withValues(alpha: 0.3),
                              blurRadius: 20,
                              spreadRadius: 5,
                            ),
                          ],
                        ),
                        child: Center(
                          child: CustomIconWidget(
                            iconName: _isPlaying ? 'pause' : 'play_arrow',
                            color: Colors.white,
                            size: 32,
                          ),
                        ),
                      ),
                    ),
                    SizedBox(height: 2.h),
                    AnimatedBuilder(
                      animation: _waveAnimation,
                      builder: (context, child) {
                        return Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: List.generate(5, (index) {
                            final delay = index * 0.2;
                            final animationValue =
                                (_waveAnimation.value - delay).clamp(0.0, 1.0);
                            final height = _isPlaying
                                ? 4 +
                                    (20 *
                                        (1 - (animationValue - 0.5).abs() * 2)
                                            .clamp(0.0, 1.0))
                                : 4.0;

                            return Container(
                              width: 4,
                              height: height,
                              margin: EdgeInsets.symmetric(horizontal: 1.w),
                              decoration: BoxDecoration(
                                color: AppTheme.lightTheme.colorScheme.primary
                                    .withValues(alpha: 0.7),
                                borderRadius: BorderRadius.circular(2),
                              ),
                            );
                          }),
                        );
                      },
                    ),
                  ],
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
