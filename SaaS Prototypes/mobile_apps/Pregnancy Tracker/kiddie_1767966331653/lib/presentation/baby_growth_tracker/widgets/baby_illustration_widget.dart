import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class BabyIllustrationWidget extends StatefulWidget {
  final int week;
  final String babySize;
  final String babyLength;
  final String babyWeight;
  final String illustrationUrl;
  final String semanticLabel;

  const BabyIllustrationWidget({
    super.key,
    required this.week,
    required this.babySize,
    required this.babyLength,
    required this.babyWeight,
    required this.illustrationUrl,
    required this.semanticLabel,
  });

  @override
  State<BabyIllustrationWidget> createState() => _BabyIllustrationWidgetState();
}

class _BabyIllustrationWidgetState extends State<BabyIllustrationWidget> {
  double _scale = 1.0;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w),
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: theme.colorScheme.shadow.withValues(alpha: 0.08),
            blurRadius: 12,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        children: [
          // Illustration with pinch-to-zoom
          GestureDetector(
            onScaleStart: (details) {
              setState(() => _scale = 1.0);
            },
            onScaleUpdate: (details) {
              setState(() {
                _scale = details.scale.clamp(1.0, 3.0);
              });
            },
            onScaleEnd: (details) {
              setState(() => _scale = 1.0);
            },
            child: Container(
              height: 35.h,
              width: double.infinity,
              decoration: BoxDecoration(
                color:
                    theme.colorScheme.primaryContainer.withValues(alpha: 0.1),
                borderRadius:
                    const BorderRadius.vertical(top: Radius.circular(16)),
              ),
              child: ClipRRect(
                borderRadius:
                    const BorderRadius.vertical(top: Radius.circular(16)),
                child: Transform.scale(
                  scale: _scale,
                  child: CustomImageWidget(
                    imageUrl: widget.illustrationUrl,
                    width: double.infinity,
                    height: 35.h,
                    fit: BoxFit.cover,
                    semanticLabel: widget.semanticLabel,
                  ),
                ),
              ),
            ),
          ),

          // Size Information
          Padding(
            padding: EdgeInsets.all(4.w),
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    CustomIconWidget(
                      iconName: 'straighten',
                      size: 20,
                      color: theme.colorScheme.primary,
                    ),
                    SizedBox(width: 2.w),
                    Text(
                      'Size of a ${widget.babySize}',
                      style: theme.textTheme.titleLarge?.copyWith(
                        fontWeight: FontWeight.w600,
                        color: theme.colorScheme.primary,
                      ),
                    ),
                  ],
                ),
                SizedBox(height: 2.h),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    _buildSizeInfo(
                      theme,
                      'Length',
                      widget.babyLength,
                      'height',
                    ),
                    Container(
                      width: 1,
                      height: 4.h,
                      color: theme.colorScheme.outline.withValues(alpha: 0.2),
                    ),
                    _buildSizeInfo(
                      theme,
                      'Weight',
                      widget.babyWeight,
                      'monitor_weight',
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSizeInfo(
      ThemeData theme, String label, String value, String iconName) {
    return Column(
      children: [
        CustomIconWidget(
          iconName: iconName,
          size: 24,
          color: theme.colorScheme.onSurfaceVariant,
        ),
        SizedBox(height: 1.h),
        Text(
          label,
          style: theme.textTheme.bodySmall?.copyWith(
            color: theme.colorScheme.onSurfaceVariant,
          ),
        ),
        SizedBox(height: 0.5.h),
        Text(
          value,
          style: theme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
      ],
    );
  }
}
