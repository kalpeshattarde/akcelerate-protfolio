import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import './animated_video_card_widget.dart';

/// Second onboarding content page
/// Showcases AI-powered editing and effects capabilities
class OnboardingContentPageTwoWidget extends StatelessWidget {
  final int currentPage;
  final VoidCallback onNext;
  final VoidCallback onSkip;

  const OnboardingContentPageTwoWidget({
    super.key,
    required this.currentPage,
    required this.onNext,
    required this.onSkip,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return SafeArea(
      child: Column(
        children: [
          SizedBox(height: 6.h),
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 6.w),
            child: Text(
              'Powerful Editing\nTools',
              style: theme.textTheme.displaySmall?.copyWith(
                color: Colors.white,
                fontWeight: FontWeight.w700,
                height: 1.2,
              ),
              textAlign: TextAlign.center,
            ),
          ),
          SizedBox(height: 2.h),
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 8.w),
            child: Text(
              'Professional-grade editing features with AI-powered effects and transitions at your fingertips',
              style: theme.textTheme.bodyLarge?.copyWith(
                color: Colors.white.withValues(alpha: 0.9),
                height: 1.5,
              ),
              textAlign: TextAlign.center,
              maxLines: 3,
              overflow: TextOverflow.ellipsis,
            ),
          ),
          SizedBox(height: 6.h),
          Expanded(child: _buildVideoCardsSection(context)),
          _buildBottomSection(context, theme),
        ],
      ),
    );
  }

  Widget _buildVideoCardsSection(BuildContext context) {
    return Stack(
      alignment: Alignment.center,
      children: [
        Positioned(
          top: 0,
          right: 5.w,
          child: AnimatedVideoCardWidget(
            title: 'Smart Transitions',
            imageUrl:
                'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80',
            semanticLabel:
                'Abstract gradient with smooth flowing transitions in blue and purple tones showcasing smart video transitions',
            offsetX: 10,
            offsetY: -15,
            rotation: 0.08,
            animationDelay: 200,
          ),
        ),
        Positioned(
          top: 10.h,
          left: 5.w,
          child: AnimatedVideoCardWidget(
            title: 'AI Effects',
            imageUrl:
                'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
            semanticLabel:
                'Colorful abstract light effects with bokeh and particles representing AI-powered video effects',
            offsetX: -10,
            offsetY: 5,
            rotation: -0.06,
            animationDelay: 400,
          ),
        ),
        Positioned(
          bottom: 2.h,
          child: AnimatedVideoCardWidget(
            title: 'Color Grading',
            imageUrl:
                'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&q=80',
            semanticLabel:
                'Vibrant color palette with red, orange, and purple gradients demonstrating professional color grading',
            offsetX: 0,
            offsetY: 10,
            rotation: 0.03,
            animationDelay: 600,
          ),
        ),
      ],
    );
  }

  Widget _buildBottomSection(BuildContext context, ThemeData theme) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 6.w, vertical: 3.h),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: List.generate(
              3,
              (index) => Container(
                margin: EdgeInsets.symmetric(horizontal: 1.w),
                width: currentPage == index ? 8.w : 2.w,
                height: 2.w,
                decoration: BoxDecoration(
                  color: currentPage == index
                      ? Colors.white
                      : Colors.white.withValues(alpha: 0.4),
                  borderRadius: BorderRadius.circular(4),
                ),
              ),
            ),
          ),
          SizedBox(height: 4.h),
          SizedBox(
            width: double.infinity,
            height: 7.h,
            child: ElevatedButton(
              onPressed: onNext,
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.white,
                foregroundColor: theme.colorScheme.primary,
                elevation: 8,
                shadowColor: Colors.black.withValues(alpha: 0.3),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                ),
              ),
              child: Text(
                'Next',
                style: theme.textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w600,
                  letterSpacing: 0.5,
                ),
              ),
            ),
          ),
          SizedBox(height: 2.h),
          TextButton(
            onPressed: onSkip,
            style: TextButton.styleFrom(
              foregroundColor: Colors.white,
              padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.5.h),
            ),
            child: Text(
              'Skip Tour',
              style: theme.textTheme.bodyLarge?.copyWith(
                color: Colors.white.withValues(alpha: 0.8),
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
          SizedBox(height: 2.h),
        ],
      ),
    );
  }
}
