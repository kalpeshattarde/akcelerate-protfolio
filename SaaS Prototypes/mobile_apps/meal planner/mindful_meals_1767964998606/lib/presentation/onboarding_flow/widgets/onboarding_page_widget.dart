import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class OnboardingPageWidget extends StatelessWidget {
  final String title;
  final String description;
  final String imageUrl;
  final String semanticLabel;
  final VoidCallback? onContinue;
  final VoidCallback? onSkip;
  final bool showContinueButton;
  final bool showSkipButton;
  final Widget? customContent;

  const OnboardingPageWidget({
    Key? key,
    required this.title,
    required this.description,
    required this.imageUrl,
    required this.semanticLabel,
    this.onContinue,
    this.onSkip,
    this.showContinueButton = true,
    this.showSkipButton = true,
    this.customContent,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Padding(
        padding: EdgeInsets.symmetric(horizontal: 6.w, vertical: 2.h),
        child: Column(
          children: [
            // Skip button
            showSkipButton ? _buildSkipButton() : SizedBox(height: 6.h),

            Expanded(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  // Illustration
                  _buildIllustration(),

                  SizedBox(height: 4.h),

                  // Title
                  _buildTitle(),

                  SizedBox(height: 2.h),

                  // Description
                  _buildDescription(),

                  SizedBox(height: 4.h),

                  // Custom content if provided
                  customContent ?? const SizedBox.shrink(),
                ],
              ),
            ),

            // Continue button
            showContinueButton
                ? _buildContinueButton()
                : const SizedBox.shrink(),
          ],
        ),
      ),
    );
  }

  Widget _buildSkipButton() {
    return Align(
      alignment: Alignment.topRight,
      child: TextButton(
        onPressed: onSkip,
        style: TextButton.styleFrom(
          padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
        ),
        child: Text(
          'Skip',
          style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
            color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
            fontWeight: FontWeight.w500,
          ),
        ),
      ),
    );
  }

  Widget _buildIllustration() {
    return Container(
      width: 70.w,
      height: 30.h,
      constraints: BoxConstraints(
        maxWidth: 280,
        maxHeight: 240,
      ),
      child: CustomImageWidget(
        imageUrl: imageUrl,
        width: 70.w,
        height: 30.h,
        fit: BoxFit.contain,
        semanticLabel: semanticLabel,
      ),
    );
  }

  Widget _buildTitle() {
    return Text(
      title,
      textAlign: TextAlign.center,
      style: AppTheme.lightTheme.textTheme.headlineMedium?.copyWith(
        color: AppTheme.lightTheme.colorScheme.onSurface,
        fontWeight: FontWeight.w600,
      ),
    );
  }

  Widget _buildDescription() {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 4.w),
      child: Text(
        description,
        textAlign: TextAlign.center,
        style: AppTheme.lightTheme.textTheme.bodyLarge?.copyWith(
          color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
          height: 1.5,
        ),
      ),
    );
  }

  Widget _buildContinueButton() {
    return Container(
      width: double.infinity,
      margin: EdgeInsets.only(bottom: 2.h),
      child: ElevatedButton(
        onPressed: onContinue,
        style: ElevatedButton.styleFrom(
          backgroundColor: AppTheme.lightTheme.colorScheme.primary,
          foregroundColor: AppTheme.lightTheme.colorScheme.onPrimary,
          padding: EdgeInsets.symmetric(vertical: 2.h),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          elevation: 2,
        ),
        child: Text(
          'Continue',
          style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
            color: AppTheme.lightTheme.colorScheme.onPrimary,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
    );
  }
}
