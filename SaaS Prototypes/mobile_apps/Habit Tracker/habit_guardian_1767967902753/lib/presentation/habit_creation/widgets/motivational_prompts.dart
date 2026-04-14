import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class MotivationalPrompts extends StatefulWidget {
  final List<String> selectedPrompts;
  final Function(List<String>) onPromptsChanged;

  const MotivationalPrompts({
    super.key,
    required this.selectedPrompts,
    required this.onPromptsChanged,
  });

  @override
  State<MotivationalPrompts> createState() => _MotivationalPromptsState();
}

class _MotivationalPromptsState extends State<MotivationalPrompts> {
  final List<String> prompts = [
    'Start small, dream big',
    'Progress over perfection',
    'One day at a time',
    'Consistency is key',
    'Believe in yourself',
    'Small steps, big changes',
    'You are capable',
    'Growth mindset',
    'Embrace the journey',
    'Stay committed',
    'Trust the process',
    'Be patient with yourself',
  ];

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Text(
              'Motivational Prompts',
              style: theme.textTheme.titleMedium?.copyWith(
                color: isDark
                    ? AppTheme.textPrimaryDark
                    : AppTheme.textPrimaryLight,
                fontWeight: FontWeight.w600,
              ),
            ),
            SizedBox(width: 2.w),
            Text(
              '(Optional)',
              style: theme.textTheme.bodySmall?.copyWith(
                color: isDark
                    ? AppTheme.textSecondaryDark
                    : AppTheme.textSecondaryLight,
                fontStyle: FontStyle.italic,
              ),
            ),
          ],
        ),
        SizedBox(height: 1.h),
        Text(
          'Choose phrases that inspire you',
          style: theme.textTheme.bodySmall?.copyWith(
            color: isDark
                ? AppTheme.textSecondaryDark
                : AppTheme.textSecondaryLight,
          ),
        ),
        SizedBox(height: 2.h),
        Container(
          padding: EdgeInsets.all(4.w),
          decoration: BoxDecoration(
            color: isDark ? AppTheme.surfaceDark : AppTheme.surfaceLight,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: isDark ? AppTheme.borderDark : AppTheme.borderLight,
            ),
            boxShadow: [
              BoxShadow(
                color: isDark
                    ? Colors.white.withValues(alpha: 0.05)
                    : Colors.black.withValues(alpha: 0.08),
                blurRadius: 8,
                offset: const Offset(0, 2),
              ),
            ],
          ),
          child: Column(
            children: [
              _buildPromptChips(context, isDark),
              if (widget.selectedPrompts.isNotEmpty) ...[
                SizedBox(height: 3.h),
                _buildSelectedPromptsPreview(context, isDark),
              ],
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildPromptChips(BuildContext context, bool isDark) {
    return Wrap(
      spacing: 2.w,
      runSpacing: 1.h,
      children: prompts.map((prompt) {
        final isSelected = widget.selectedPrompts.contains(prompt);

        return GestureDetector(
          onTap: () {
            HapticFeedback.lightImpact();
            _togglePrompt(prompt);
          },
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 300),
            curve: Curves.easeInOut,
            padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.5.h),
            decoration: BoxDecoration(
              color: isSelected
                  ? (isDark ? AppTheme.accentDark : AppTheme.accentLight)
                  : (isDark ? AppTheme.primaryDark : AppTheme.primaryLight),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(
                color: isSelected
                    ? (isDark ? AppTheme.accentDark : AppTheme.accentLight)
                    : (isDark ? AppTheme.borderDark : AppTheme.borderLight),
                width: 1.5,
              ),
              boxShadow: isSelected
                  ? [
                      BoxShadow(
                        color: (isDark
                                ? AppTheme.accentDark
                                : AppTheme.accentLight)
                            .withValues(alpha: 0.3),
                        blurRadius: 8,
                        offset: const Offset(0, 2),
                      ),
                    ]
                  : null,
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                if (isSelected) ...[
                  CustomIconWidget(
                    iconName: 'check_circle',
                    size: 4.w,
                    color:
                        isDark ? AppTheme.primaryDark : AppTheme.primaryLight,
                  ),
                  SizedBox(width: 2.w),
                ],
                Flexible(
                  child: Text(
                    prompt,
                    style: Theme.of(context).textTheme.bodySmall?.copyWith(
                          color: isSelected
                              ? (isDark
                                  ? AppTheme.primaryDark
                                  : AppTheme.primaryLight)
                              : (isDark
                                  ? AppTheme.textSecondaryDark
                                  : AppTheme.textSecondaryLight),
                          fontWeight:
                              isSelected ? FontWeight.w600 : FontWeight.w400,
                        ),
                  ),
                ),
              ],
            ),
          ),
        );
      }).toList(),
    );
  }

  Widget _buildSelectedPromptsPreview(BuildContext context, bool isDark) {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: (isDark ? AppTheme.secondaryDark : AppTheme.secondaryLight)
            .withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: (isDark ? AppTheme.secondaryDark : AppTheme.secondaryLight)
              .withValues(alpha: 0.3),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              CustomIconWidget(
                iconName: 'psychology',
                size: 5.w,
                color:
                    isDark ? AppTheme.secondaryDark : AppTheme.secondaryLight,
              ),
              SizedBox(width: 3.w),
              Text(
                'Your Motivational Mantras',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: isDark
                          ? AppTheme.secondaryDark
                          : AppTheme.secondaryLight,
                      fontWeight: FontWeight.w600,
                    ),
              ),
            ],
          ),
          SizedBox(height: 2.h),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: widget.selectedPrompts.map((prompt) {
              return Padding(
                padding: EdgeInsets.only(bottom: 1.h),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      margin: EdgeInsets.only(top: 0.5.h),
                      width: 1.w,
                      height: 1.w,
                      decoration: BoxDecoration(
                        color: isDark
                            ? AppTheme.secondaryDark
                            : AppTheme.secondaryLight,
                        shape: BoxShape.circle,
                      ),
                    ),
                    SizedBox(width: 3.w),
                    Expanded(
                      child: Text(
                        prompt,
                        style: Theme.of(context).textTheme.bodySmall?.copyWith(
                              color: (isDark
                                      ? AppTheme.secondaryDark
                                      : AppTheme.secondaryLight)
                                  .withValues(alpha: 0.8),
                              height: 1.4,
                            ),
                      ),
                    ),
                  ],
                ),
              );
            }).toList(),
          ),
        ],
      ),
    );
  }

  void _togglePrompt(String prompt) {
    final updatedPrompts = List<String>.from(widget.selectedPrompts);
    if (updatedPrompts.contains(prompt)) {
      updatedPrompts.remove(prompt);
    } else {
      updatedPrompts.add(prompt);
    }
    widget.onPromptsChanged(updatedPrompts);
  }
}
