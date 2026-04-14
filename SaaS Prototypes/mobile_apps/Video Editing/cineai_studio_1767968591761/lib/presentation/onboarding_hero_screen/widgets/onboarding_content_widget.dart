import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import './animated_video_card_widget.dart';

/// Main content widget for onboarding screen
/// Contains headline, video cards, and navigation controls
class OnboardingContentWidget extends StatelessWidget {
  final int currentPage;
  final VoidCallback onNext;
  final VoidCallback onSkip;

  const OnboardingContentWidget({
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
              'Create Stunning\nAI Videos',
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
              'Transform your ideas into cinematic masterpieces with AI-powered video creation',
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
          left: 5.w,
          child: AnimatedVideoCardWidget(
            title: 'Text to Video',
            imageUrl:
                'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&q=80',
            semanticLabel:
                'Abstract purple and pink gradient background with flowing light patterns representing AI text-to-video generation',
            offsetX: -10,
            offsetY: -20,
            rotation: -0.1,
            animationDelay: 200,
          ),
        ),
        Positioned(
          top: 8.h,
          right: 5.w,
          child: AnimatedVideoCardWidget(
            title: 'Image to Video',
            imageUrl:
                'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
            semanticLabel:
                'Vibrant blue and pink abstract art with dynamic motion blur effects showcasing image-to-video transformation',
            offsetX: 10,
            offsetY: 0,
            rotation: 0.08,
            animationDelay: 400,
          ),
        ),
        Positioned(
          bottom: 2.h,
          child: AnimatedVideoCardWidget(
            title: 'AI Enhancement',
            imageUrl:
                'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80',
            semanticLabel:
                'Futuristic neon lights with purple and blue tones demonstrating AI video enhancement capabilities',
            offsetX: 0,
            offsetY: 10,
            rotation: 0.02,
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
