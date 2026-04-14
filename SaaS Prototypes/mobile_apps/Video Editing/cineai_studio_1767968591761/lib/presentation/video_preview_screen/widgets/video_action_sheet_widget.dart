import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../widgets/custom_icon_widget.dart';

/// Bottom action sheet with additional video options
class VideoActionSheetWidget extends StatelessWidget {
  final VoidCallback onDownloadHD;
  final VoidCallback onEditVideo;
  final VoidCallback onCreateVariation;
  final VoidCallback onAddToCollection;

  const VideoActionSheetWidget({
    super.key,
    required this.onDownloadHD,
    required this.onEditVideo,
    required this.onCreateVariation,
    required this.onAddToCollection,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return ClipRRect(
      borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
        child: Container(
          decoration: BoxDecoration(
            color: theme.colorScheme.surface.withValues(alpha: 0.95),
            borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
          ),
          child: SafeArea(
            top: false,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                // Handle Bar
                Container(
                  margin: EdgeInsets.only(top: 2.h),
                  width: 12.w,
                  height: 0.5.h,
                  decoration: BoxDecoration(
                    color: theme.dividerColor,
                    borderRadius: BorderRadius.circular(4),
                  ),
                ),

                SizedBox(height: 3.h),

                // Title
                Padding(
                  padding: EdgeInsets.symmetric(horizontal: 6.w),
                  child: Text(
                    'Video Options',
                    style: theme.textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ),

                SizedBox(height: 3.h),

                // Action Items
                _buildActionItem(
                  context: context,
                  icon: 'download',
                  title: 'Download HD',
                  subtitle: 'Save video in high quality',
                  onTap: onDownloadHD,
                  theme: theme,
                ),

                _buildActionItem(
                  context: context,
                  icon: 'edit',
                  title: 'Edit Video',
                  subtitle: 'Make changes to your video',
                  onTap: onEditVideo,
                  theme: theme,
                ),

                _buildActionItem(
                  context: context,
                  icon: 'auto_awesome',
                  title: 'Create Variation',
                  subtitle: 'Generate a new version with AI',
                  onTap: onCreateVariation,
                  theme: theme,
                ),

                _buildActionItem(
                  context: context,
                  icon: 'collections',
                  title: 'Add to Collection',
                  subtitle: 'Save to your library',
                  onTap: onAddToCollection,
                  theme: theme,
                ),

                SizedBox(height: 2.h),

                // Cancel Button
                Padding(
                  padding: EdgeInsets.symmetric(horizontal: 6.w),
                  child: SizedBox(
                    width: double.infinity,
                    child: OutlinedButton(
                      onPressed: () => Navigator.pop(context),
                      style: OutlinedButton.styleFrom(
                        padding: EdgeInsets.symmetric(vertical: 2.h),
                      ),
                      child: Text('Cancel'),
                    ),
                  ),
                ),

                SizedBox(height: 2.h),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildActionItem({
    required BuildContext context,
    required String icon,
    required String title,
    required String subtitle,
    required VoidCallback onTap,
    required ThemeData theme,
  }) {
    return InkWell(
      onTap: onTap,
      child: Container(
        padding: EdgeInsets.symmetric(horizontal: 6.w, vertical: 2.h),
        child: Row(
          children: [
            // Icon Container
            Container(
              width: 12.w,
              height: 12.w,
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [
                    theme.colorScheme.primary.withValues(alpha: 0.2),
                    theme.colorScheme.secondary.withValues(alpha: 0.1),
                  ],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Center(
                child: CustomIconWidget(
                  iconName: icon,
                  color: theme.colorScheme.primary,
                  size: 24,
                ),
              ),
            ),

            SizedBox(width: 4.w),

            // Text Content
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: theme.textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  SizedBox(height: 0.5.h),
                  Text(
                    subtitle,
                    style: theme.textTheme.bodySmall?.copyWith(
                      color: theme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                ],
              ),
            ),

            // Arrow Icon
            CustomIconWidget(
              iconName: 'chevron_right',
              color: theme.colorScheme.onSurfaceVariant,
              size: 20,
            ),
          ],
        ),
      ),
    );
  }
}
