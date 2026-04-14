import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

/// Motivational quote card with daily rotation and share functionality
class MotivationalQuoteWidget extends StatefulWidget {
  const MotivationalQuoteWidget({super.key});

  @override
  State<MotivationalQuoteWidget> createState() =>
      _MotivationalQuoteWidgetState();
}

class _MotivationalQuoteWidgetState extends State<MotivationalQuoteWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _fadeController;
  late Animation<double> _fadeAnimation;

  // Daily motivational quotes
  final List<Map<String, String>> _quotes = [
    {
      "quote": "The secret of getting ahead is getting started.",
      "author": "Mark Twain"
    },
    {
      "quote":
          "Success is the sum of small efforts repeated day in and day out.",
      "author": "Robert Collier"
    },
    {
      "quote": "Don't watch the clock; do what it does. Keep going.",
      "author": "Sam Levenson"
    },
    {
      "quote": "The journey of a thousand miles begins with one step.",
      "author": "Lao Tzu"
    },
    {
      "quote": "Excellence is not a skill, it's an attitude.",
      "author": "Ralph Marston"
    },
    {"quote": "Progress, not perfection, is the goal.", "author": "Unknown"},
    {
      "quote": "Small daily improvements over time lead to stunning results.",
      "author": "Robin Sharma"
    },
  ];

  @override
  void initState() {
    super.initState();
    _initializeAnimation();
  }

  void _initializeAnimation() {
    _fadeController = AnimationController(
      duration: const Duration(milliseconds: 800),
      vsync: this,
    );

    _fadeAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _fadeController,
      curve: Curves.easeInOut,
    ));

    _fadeController.forward();
  }

  @override
  void dispose() {
    _fadeController.dispose();
    super.dispose();
  }

  Map<String, String> _getTodaysQuote() {
    final today = DateTime.now();
    final dayOfYear = today.difference(DateTime(today.year, 1, 1)).inDays;
    final quoteIndex = dayOfYear % _quotes.length;
    return _quotes[quoteIndex];
  }

  void _shareQuote() {
    final quote = _getTodaysQuote();
    final shareText = '"${quote['quote']}" - ${quote['author']}';

    // Copy to clipboard as sharing functionality
    Clipboard.setData(ClipboardData(text: shareText));

    // Show feedback
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          'Quote copied to clipboard!',
          style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
            color: AppTheme.primaryLight,
          ),
        ),
        backgroundColor: AppTheme.secondaryLight,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        margin: EdgeInsets.all(4.w),
      ),
    );

    HapticFeedback.lightImpact();
  }

  @override
  Widget build(BuildContext context) {
    final todaysQuote = _getTodaysQuote();

    return FadeTransition(
      opacity: _fadeAnimation,
      child: Container(
        margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              AppTheme.accentLight.withValues(alpha: 0.1),
              AppTheme.premiumLight.withValues(alpha: 0.1),
            ],
          ),
          borderRadius: BorderRadius.circular(20),
          border: Border.all(
            color: AppTheme.accentLight.withValues(alpha: 0.2),
            width: 1,
          ),
        ),
        child: Padding(
          padding: EdgeInsets.all(5.w),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header with share button
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      CustomIconWidget(
                        iconName: 'format_quote',
                        color: AppTheme.accentLight,
                        size: 20,
                      ),
                      SizedBox(width: 2.w),
                      Text(
                        'Daily Inspiration',
                        style:
                            AppTheme.lightTheme.textTheme.titleSmall?.copyWith(
                          color: AppTheme.accentLight,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
                  GestureDetector(
                    onTap: _shareQuote,
                    child: Container(
                      padding: EdgeInsets.all(2.w),
                      decoration: BoxDecoration(
                        color: AppTheme.accentLight.withValues(alpha: 0.1),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: CustomIconWidget(
                        iconName: 'share',
                        color: AppTheme.accentLight,
                        size: 16,
                      ),
                    ),
                  ),
                ],
              ),

              SizedBox(height: 3.h),

              // Quote text
              Text(
                '"${todaysQuote['quote']}"',
                style: AppTheme.lightTheme.textTheme.bodyLarge?.copyWith(
                  color: AppTheme.textPrimaryLight,
                  fontStyle: FontStyle.italic,
                  height: 1.5,
                  fontWeight: FontWeight.w400,
                ),
                textAlign: TextAlign.left,
              ),

              SizedBox(height: 2.h),

              // Author
              Align(
                alignment: Alignment.centerRight,
                child: Text(
                  '— ${todaysQuote['author']}',
                  style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                    color: AppTheme.textSecondaryLight,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
