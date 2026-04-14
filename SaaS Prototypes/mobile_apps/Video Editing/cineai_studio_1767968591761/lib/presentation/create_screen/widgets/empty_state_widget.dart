import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

/// Empty state widget with illustration and sample prompts
class EmptyStateWidget extends StatelessWidget {
  final VoidCallback onSamplePromptTap;

  const EmptyStateWidget({super.key, required this.onSamplePromptTap});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Center(
      child: Padding(
        padding: EdgeInsets.all(6.w),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CustomImageWidget(
              imageUrl:
                  'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400',
              width: 60.w,
              height: 30.h,
              fit: BoxFit.contain,
              semanticLabel:
                  'Illustration of a person creating video content with AI tools on a laptop',
            ),
            SizedBox(height: 3.h),
            Text(
              'Start Creating',
              style: theme.textTheme.headlineSmall?.copyWith(
                fontWeight: FontWeight.w600,
                color: theme.colorScheme.onSurface,
              ),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 1.h),
            Text(
              'Transform your ideas into stunning videos with AI',
              style: theme.textTheme.bodyMedium?.copyWith(
                color: theme.colorScheme.onSurfaceVariant,
              ),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 3.h),
            Text(
              'Try these prompts:',
              style: theme.textTheme.titleSmall?.copyWith(
                fontWeight: FontWeight.w600,
                color: theme.colorScheme.onSurface,
              ),
            ),
            SizedBox(height: 2.h),
            _buildSamplePrompt(
              context,
              'A serene sunset over ocean waves',
              theme,
            ),
            SizedBox(height: 1.h),
            _buildSamplePrompt(
              context,
              'Futuristic city with flying cars',
              theme,
            ),
            SizedBox(height: 1.h),
            _buildSamplePrompt(
              context,
              'Animated character dancing in rain',
              theme,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSamplePrompt(
    BuildContext context,
    String prompt,
    ThemeData theme,
  ) {
    return GestureDetector(
      onTap: onSamplePromptTap,
      child: Container(
        width: double.infinity,
        padding: EdgeInsets.all(3.w),
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [
              theme.colorScheme.primary.withValues(alpha: 0.1),
              theme.colorScheme.secondary.withValues(alpha: 0.05),
            ],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: theme.colorScheme.primary.withValues(alpha: 0.2),
            width: 1,
          ),
        ),
        child: Row(
          children: [
            CustomIconWidget(
              iconName: 'lightbulb_outline',
              color: theme.colorScheme.primary,
              size: 20,
            ),
            SizedBox(width: 2.w),
            Expanded(
              child: Text(
                prompt,
                style: theme.textTheme.bodyMedium?.copyWith(
                  color: theme.colorScheme.onSurface,
                ),
              ),
            ),
            CustomIconWidget(
              iconName: 'arrow_forward',
              color: theme.colorScheme.onSurfaceVariant,
              size: 18,
            ),
          ],
        ),
      ),
    );
  }
}
