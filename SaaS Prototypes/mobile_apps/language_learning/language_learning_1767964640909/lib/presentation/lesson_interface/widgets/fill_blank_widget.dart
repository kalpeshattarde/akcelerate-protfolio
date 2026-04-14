import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../../core/app_export.dart';

class FillBlankWidget extends StatefulWidget {
  final String sentence;
  final String correctAnswer;
  final List<String> suggestions;
  final Function(String) onAnswerSubmitted;
  final bool showResult;
  final String? userAnswer;

  const FillBlankWidget({
    Key? key,
    required this.sentence,
    required this.correctAnswer,
    required this.suggestions,
    required this.onAnswerSubmitted,
    this.showResult = false,
    this.userAnswer,
  }) : super(key: key);

  @override
  State<FillBlankWidget> createState() => _FillBlankWidgetState();
}

class _FillBlankWidgetState extends State<FillBlankWidget>
    with TickerProviderStateMixin {
  late TextEditingController _controller;
  late AnimationController _shakeController;
  late Animation<double> _shakeAnimation;
  String _selectedSuggestion = '';

  @override
  void initState() {
    super.initState();
    _controller = TextEditingController(text: widget.userAnswer ?? '');
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
    _controller.dispose();
    _shakeController.dispose();
    super.dispose();
  }

  void _triggerShakeAnimation() {
    _shakeController.forward().then((_) {
      _shakeController.reverse();
    });
  }

  List<String> get _filteredSuggestions {
    if (_controller.text.isEmpty) return widget.suggestions;
    return widget.suggestions
        .where((suggestion) =>
            suggestion.toLowerCase().contains(_controller.text.toLowerCase()))
        .toList();
  }

  bool get _isCorrect {
    return widget.userAnswer?.toLowerCase().trim() ==
        widget.correctAnswer.toLowerCase().trim();
  }

  @override
  Widget build(BuildContext context) {
    final parts = widget.sentence.split('___');

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
                child: RichText(
                  textAlign: TextAlign.center,
                  text: TextSpan(
                    style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w600,
                      color: AppTheme.lightTheme.colorScheme.onSurface,
                    ),
                    children: [
                      if (parts.isNotEmpty) TextSpan(text: parts[0]),
                      WidgetSpan(
                        child: Container(
                          constraints: BoxConstraints(minWidth: 20.w),
                          padding: EdgeInsets.symmetric(
                              horizontal: 2.w, vertical: 0.5.h),
                          margin: EdgeInsets.symmetric(horizontal: 1.w),
                          decoration: BoxDecoration(
                            color: widget.showResult
                                ? (_isCorrect
                                    ? AppTheme.lightTheme.colorScheme.primary
                                        .withValues(alpha: 0.1)
                                    : AppTheme.lightTheme.colorScheme.error
                                        .withValues(alpha: 0.1))
                                : AppTheme.lightTheme.colorScheme.outline
                                    .withValues(alpha: 0.1),
                            borderRadius: BorderRadius.circular(8),
                            border: Border.all(
                              color: widget.showResult
                                  ? (_isCorrect
                                      ? AppTheme.lightTheme.colorScheme.primary
                                      : AppTheme.lightTheme.colorScheme.error)
                                  : AppTheme.lightTheme.colorScheme.outline,
                              width: 1,
                            ),
                          ),
                          child: Text(
                            widget.showResult
                                ? (widget.userAnswer?.isNotEmpty == true
                                    ? widget.userAnswer!
                                    : '___')
                                : (_controller.text.isNotEmpty
                                    ? _controller.text
                                    : '___'),
                            style: AppTheme.lightTheme.textTheme.titleMedium
                                ?.copyWith(
                              color: widget.showResult
                                  ? (_isCorrect
                                      ? AppTheme.lightTheme.colorScheme.primary
                                      : AppTheme.lightTheme.colorScheme.error)
                                  : AppTheme.lightTheme.colorScheme.onSurface,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                      ),
                      if (parts.length > 1) TextSpan(text: parts[1]),
                    ],
                  ),
                ),
              ),
              SizedBox(height: 3.h),
              if (!widget.showResult) ...[
                Container(
                  margin: EdgeInsets.symmetric(horizontal: 4.w),
                  child: TextField(
                    controller: _controller,
                    onChanged: (value) {
                      setState(() {});
                    },
                    onSubmitted: (value) {
                      if (value.trim().isNotEmpty) {
                        widget.onAnswerSubmitted(value.trim());
                        if (value.trim().toLowerCase() !=
                            widget.correctAnswer.toLowerCase()) {
                          _triggerShakeAnimation();
                        }
                      }
                    },
                    decoration: InputDecoration(
                      hintText: 'Type your answer here...',
                      suffixIcon: _controller.text.isNotEmpty
                          ? IconButton(
                              onPressed: () {
                                widget
                                    .onAnswerSubmitted(_controller.text.trim());
                                if (_controller.text.trim().toLowerCase() !=
                                    widget.correctAnswer.toLowerCase()) {
                                  _triggerShakeAnimation();
                                }
                              },
                              icon: CustomIconWidget(
                                iconName: 'send',
                                color: AppTheme.lightTheme.colorScheme.primary,
                                size: 20,
                              ),
                            )
                          : null,
                    ),
                  ),
                ),
                if (_filteredSuggestions.isNotEmpty &&
                    _controller.text.isNotEmpty) ...[
                  SizedBox(height: 2.h),
                  Container(
                    margin: EdgeInsets.symmetric(horizontal: 4.w),
                    child: Text(
                      'Suggestions:',
                      style:
                          AppTheme.lightTheme.textTheme.labelMedium?.copyWith(
                        color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                  SizedBox(height: 1.h),
                  Container(
                    height: 6.h,
                    child: ListView.builder(
                      scrollDirection: Axis.horizontal,
                      padding: EdgeInsets.symmetric(horizontal: 4.w),
                      itemCount: _filteredSuggestions.length,
                      itemBuilder: (context, index) {
                        final suggestion = _filteredSuggestions[index];
                        return Container(
                          margin: EdgeInsets.only(right: 2.w),
                          child: GestureDetector(
                            onTap: () {
                              _controller.text = suggestion;
                              setState(() {
                                _selectedSuggestion = suggestion;
                              });
                            },
                            child: Container(
                              padding: EdgeInsets.symmetric(
                                  horizontal: 3.w, vertical: 1.h),
                              decoration: BoxDecoration(
                                color: _selectedSuggestion == suggestion
                                    ? AppTheme.lightTheme.colorScheme.primary
                                        .withValues(alpha: 0.1)
                                    : AppTheme.lightTheme.colorScheme.surface,
                                borderRadius: BorderRadius.circular(20),
                                border: Border.all(
                                  color: _selectedSuggestion == suggestion
                                      ? AppTheme.lightTheme.colorScheme.primary
                                      : AppTheme.lightTheme.colorScheme.outline,
                                  width: 1,
                                ),
                              ),
                              child: Text(
                                suggestion,
                                style: AppTheme.lightTheme.textTheme.bodyMedium
                                    ?.copyWith(
                                  color: _selectedSuggestion == suggestion
                                      ? AppTheme.lightTheme.colorScheme.primary
                                      : AppTheme
                                          .lightTheme.colorScheme.onSurface,
                                  fontWeight: _selectedSuggestion == suggestion
                                      ? FontWeight.w600
                                      : FontWeight.w400,
                                ),
                              ),
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                ],
              ],
              if (widget.showResult) ...[
                Container(
                  margin: EdgeInsets.symmetric(horizontal: 4.w),
                  padding: EdgeInsets.all(3.w),
                  decoration: BoxDecoration(
                    color: _isCorrect
                        ? AppTheme.lightTheme.colorScheme.primary
                            .withValues(alpha: 0.1)
                        : AppTheme.lightTheme.colorScheme.error
                            .withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(
                      color: _isCorrect
                          ? AppTheme.lightTheme.colorScheme.primary
                          : AppTheme.lightTheme.colorScheme.error,
                      width: 1,
                    ),
                  ),
                  child: Row(
                    children: [
                      CustomIconWidget(
                        iconName: _isCorrect ? 'check_circle' : 'cancel',
                        color: _isCorrect
                            ? AppTheme.lightTheme.colorScheme.primary
                            : AppTheme.lightTheme.colorScheme.error,
                        size: 20,
                      ),
                      SizedBox(width: 2.w),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              _isCorrect ? 'Correct!' : 'Incorrect',
                              style: AppTheme.lightTheme.textTheme.labelLarge
                                  ?.copyWith(
                                color: _isCorrect
                                    ? AppTheme.lightTheme.colorScheme.primary
                                    : AppTheme.lightTheme.colorScheme.error,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                            if (!_isCorrect) ...[
                              SizedBox(height: 0.5.h),
                              Text(
                                'Correct answer: ${widget.correctAnswer}',
                                style: AppTheme.lightTheme.textTheme.bodySmall
                                    ?.copyWith(
                                  color: AppTheme
                                      .lightTheme.colorScheme.onSurfaceVariant,
                                ),
                              ),
                            ],
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ],
          ),
        );
      },
    );
  }
}
