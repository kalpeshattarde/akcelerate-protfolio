import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import './animated_video_card_widget.dart';

/// Third onboarding content page
/// Highlights collaboration and sharing features
class OnboardingContentPageThreeWidget extends StatelessWidget {
  final int currentPage;
  final VoidCallback onGetStarted;
  final VoidCallback onSkip;

  const OnboardingContentPageThreeWidget({
    super.key,
    required this.currentPage,
    required this.onGetStarted,
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
              'Share & Export\nEverywhere',
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
              'Export in multiple formats and share directly to your favorite social platforms with one tap',
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
            title: 'Social Ready',
            imageUrl:
                'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
            semanticLabel:
                'Social media icons and network connections in vibrant colors representing social media integration',
            offsetX: -10,
            offsetY: -20,
            rotation: -0.07,
            animationDelay: 200,
          ),
        ),
        Positioned(
          top: 8.h,
          right: 5.w,
          child: AnimatedVideoCardWidget(
            title: 'HD Export',
            imageUrl:
                'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800&q=80',
            semanticLabel:
                '4K ultra HD video quality symbol with sharp crystal-clear resolution showcasing high-definition export',
            offsetX: 10,
            offsetY: 0,
            rotation: 0.05,
            animationDelay: 400,
          ),
        ),
        Positioned(
          bottom: 2.h,
          child: AnimatedVideoCardWidget(
            title: 'Cloud Sync',
            imageUrl:
                'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
            semanticLabel:
                'Cloud storage with glowing data transfer lines demonstrating seamless cloud synchronization',
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
              onPressed: onGetStarted,
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
                'Get Started',
                style: theme.textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w600,
                  letterSpacing: 0.5,
                ),
              ),
            ),
          ),
          SizedBox(height: 4.h),
        ],
      ),
    );
  }
}
