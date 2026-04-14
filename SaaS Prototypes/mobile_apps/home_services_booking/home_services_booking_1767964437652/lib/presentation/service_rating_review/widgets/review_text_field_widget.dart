import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../../core/app_export.dart';

class ReviewTextFieldWidget extends StatefulWidget {
  final String? initialText;
  final ValueChanged<String>? onChanged;
  final int maxLength;
  final String hintText;

  const ReviewTextFieldWidget({
    super.key,
    this.initialText,
    this.onChanged,
    this.maxLength = 500,
    this.hintText = 'Share your experience with this service...',
  });

  @override
  State<ReviewTextFieldWidget> createState() => _ReviewTextFieldWidgetState();
}

class _ReviewTextFieldWidgetState extends State<ReviewTextFieldWidget>
    with SingleTickerProviderStateMixin {
  late TextEditingController _controller;
  late AnimationController _animationController;
  late Animation<double> _expandAnimation;
  bool _isExpanded = false;
  int _currentLength = 0;

  final List<String> _helpfulPrompts = [
    'How was the service quality?',
    'Was the provider punctual?',
    'Would you recommend this service?',
    'Any suggestions for improvement?',
  ];

  @override
  void initState() {
    super.initState();
    _controller = TextEditingController(text: widget.initialText ?? '');
    _currentLength = _controller.text.length;

    _animationController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );

    _expandAnimation = Tween<double>(
      begin: 120.0,
      end: 200.0,
    ).animate(CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeInOut,
    ));

    _controller.addListener(() {
      setState(() {
        _currentLength = _controller.text.length;
      });
      widget.onChanged?.call(_controller.text);
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    _animationController.dispose();
    super.dispose();
  }

  void _toggleExpanded() {
    setState(() {
      _isExpanded = !_isExpanded;
    });

    if (_isExpanded) {
      _animationController.forward();
    } else {
      _animationController.reverse();
    }
  }

  Color _getCharacterCountColor() {
    final percentage = _currentLength / widget.maxLength;
    if (percentage >= 0.9) return AppTheme.lightTheme.colorScheme.error;
    if (percentage >= 0.7) return const Color(0xFFF59E0B);
    return AppTheme.lightTheme.colorScheme.onSurfaceVariant;
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Write Your Review',
          style: GoogleFonts.inter(
            fontSize: 16.sp,
            fontWeight: FontWeight.w600,
            color: colorScheme.onSurface,
          ),
        ),
        SizedBox(height: 2.h),

        // Helpful prompts
        if (!_isExpanded) ...[
          Wrap(
            spacing: 2.w,
            runSpacing: 1.h,
            children: _helpfulPrompts.map((prompt) {
              return GestureDetector(
                onTap: () {
                  if (_controller.text.isEmpty) {
                    _controller.text = prompt + ' ';
                    _controller.selection = TextSelection.fromPosition(
                      TextPosition(offset: _controller.text.length),
                    );
                  }
                },
                child: Container(
                  padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
                  decoration: BoxDecoration(
                    color: colorScheme.primary.withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(
                      color: colorScheme.primary.withValues(alpha: 0.3),
                      width: 1,
                    ),
                  ),
                  child: Text(
                    prompt,
                    style: GoogleFonts.inter(
                      fontSize: 12.sp,
                      fontWeight: FontWeight.w400,
                      color: colorScheme.primary,
                    ),
                  ),
                ),
              );
            }).toList(),
          ),
          SizedBox(height: 2.h),
        ],

        // Text field
        AnimatedBuilder(
          animation: _expandAnimation,
          builder: (context, child) {
            return Container(
              decoration: BoxDecoration(
                color: colorScheme.surface,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(
                  color: _isExpanded
                      ? colorScheme.primary
                      : colorScheme.outline.withValues(alpha: 0.3),
                  width: _isExpanded ? 2 : 1,
                ),
                boxShadow: _isExpanded
                    ? [
                        BoxShadow(
                          color: colorScheme.primary.withValues(alpha: 0.1),
                          blurRadius: 8,
                          offset: const Offset(0, 2),
                        ),
                      ]
                    : null,
              ),
              child: TextField(
                controller: _controller,
                maxLength: widget.maxLength,
                maxLines: null,
                minLines: 3,
                onTap: () {
                  if (!_isExpanded) {
                    _toggleExpanded();
                  }
                },
                decoration: InputDecoration(
                  hintText: widget.hintText,
                  hintStyle: GoogleFonts.inter(
                    fontSize: 14.sp,
                    fontWeight: FontWeight.w400,
                    color: colorScheme.onSurfaceVariant,
                  ),
                  border: InputBorder.none,
                  contentPadding: EdgeInsets.all(4.w),
                  counterText: '',
                ),
                style: GoogleFonts.inter(
                  fontSize: 14.sp,
                  fontWeight: FontWeight.w400,
                  color: colorScheme.onSurface,
                  height: 1.5,
                ),
              ),
            );
          },
        ),

        // Character count and expand button
        SizedBox(height: 1.h),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              '$_currentLength/${widget.maxLength} characters',
              style: GoogleFonts.inter(
                fontSize: 12.sp,
                fontWeight: FontWeight.w400,
                color: _getCharacterCountColor(),
              ),
            ),
            if (!_isExpanded)
              GestureDetector(
                onTap: _toggleExpanded,
                child: Container(
                  padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
                  decoration: BoxDecoration(
                    color: colorScheme.primary.withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        'Expand',
                        style: GoogleFonts.inter(
                          fontSize: 12.sp,
                          fontWeight: FontWeight.w500,
                          color: colorScheme.primary,
                        ),
                      ),
                      SizedBox(width: 1.w),
                      CustomIconWidget(
                        iconName: 'expand_more',
                        color: colorScheme.primary,
                        size: 16,
                      ),
                    ],
                  ),
                ),
              ),
          ],
        ),
      ],
    );
  }
}