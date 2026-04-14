import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../widgets/custom_icon_widget.dart';

/// Floating action buttons for editing operations
class FloatingActionButtonsWidget extends StatelessWidget {
  final VoidCallback onAddContent;
  final VoidCallback onApplyEffects;
  final VoidCallback onAiEnhancement;

  const FloatingActionButtonsWidget({
    super.key,
    required this.onAddContent,
    required this.onApplyEffects,
    required this.onAiEnhancement,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      width: double.infinity,
      padding: EdgeInsets.symmetric(vertical: 2.h),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          _buildActionButton(
            icon: 'add_circle_outline',
            label: 'Add Content',
            gradient: LinearGradient(
              colors: [theme.colorScheme.primary, theme.colorScheme.secondary],
            ),
            onTap: onAddContent,
            theme: theme,
          ),
          _buildActionButton(
            icon: 'auto_fix_high',
            label: 'Effects',
            gradient: LinearGradient(
              colors: [theme.colorScheme.secondary, theme.colorScheme.tertiary],
            ),
            onTap: onApplyEffects,
            theme: theme,
          ),
          _buildActionButton(
            icon: 'psychology',
            label: 'AI Enhance',
            gradient: LinearGradient(
              colors: [theme.colorScheme.tertiary, theme.colorScheme.primary],
            ),
            onTap: onAiEnhancement,
            theme: theme,
          ),
        ],
      ),
    );
  }

  Widget _buildActionButton({
    required String icon,
    required String label,
    required Gradient gradient,
    required VoidCallback onTap,
    required ThemeData theme,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 28.w,
        padding: EdgeInsets.symmetric(vertical: 2.h),
        decoration: BoxDecoration(
          gradient: gradient,
          borderRadius: BorderRadius.circular(16),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.2),
              blurRadius: 8,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            CustomIconWidget(iconName: icon, color: Colors.white, size: 7.w),
            SizedBox(height: 1.h),
            Text(
              label,
              style: theme.textTheme.bodySmall?.copyWith(
                color: Colors.white,
                fontWeight: FontWeight.w600,
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}
