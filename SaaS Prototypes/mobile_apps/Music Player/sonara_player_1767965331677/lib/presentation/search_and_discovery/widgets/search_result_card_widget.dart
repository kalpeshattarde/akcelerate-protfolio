import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

/// Widget for displaying individual search result cards
class SearchResultCardWidget extends StatelessWidget {
  final String title;
  final String subtitle;
  final String artwork;
  final String semanticLabel;
  final String type;
  final bool verified;
  final String? duration;
  final VoidCallback onTap;
  final VoidCallback onMoreTap;

  const SearchResultCardWidget({
    Key? key,
    required this.title,
    required this.subtitle,
    required this.artwork,
    required this.semanticLabel,
    required this.type,
    this.verified = false,
    this.duration,
    required this.onTap,
    required this.onMoreTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: EdgeInsets.all(2.w),
        child: Row(
          children: [
            // Artwork
            ClipRRect(
              borderRadius: BorderRadius.circular(type == 'artist' ? 30 : 8),
              child: CustomImageWidget(
                imageUrl: artwork,
                width: 60,
                height: 60,
                fit: BoxFit.cover,
                semanticLabel: semanticLabel,
              ),
            ),
            SizedBox(width: 3.w),

            // Content
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Flexible(
                        child: Text(
                          title,
                          style: theme.textTheme.bodyLarge?.copyWith(
                            fontWeight: FontWeight.w600,
                          ),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                      if (verified) ...[
                        SizedBox(width: 1.w),
                        CustomIconWidget(
                          iconName: 'verified',
                          color: theme.colorScheme.primary,
                          size: 16,
                        ),
                      ],
                    ],
                  ),
                  SizedBox(height: 0.5.h),
                  Row(
                    children: [
                      Flexible(
                        child: Text(
                          subtitle,
                          style: theme.textTheme.bodyMedium?.copyWith(
                            color: theme.colorScheme.onSurfaceVariant,
                          ),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                      if (duration != null) ...[
                        Text(
                          ' • $duration',
                          style: theme.textTheme.bodySmall?.copyWith(
                            color: theme.colorScheme.onSurfaceVariant,
                          ),
                        ),
                      ],
                    ],
                  ),
                ],
              ),
            ),

            // More button
            IconButton(
              icon: CustomIconWidget(
                iconName: 'more_vert',
                color: theme.colorScheme.onSurfaceVariant,
                size: 24,
              ),
              onPressed: onMoreTap,
            ),
          ],
        ),
      ),
    );
  }
}
