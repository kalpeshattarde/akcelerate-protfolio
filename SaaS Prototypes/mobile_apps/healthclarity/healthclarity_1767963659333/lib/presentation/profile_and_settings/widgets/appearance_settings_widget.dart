import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class AppearanceSettingsWidget extends StatefulWidget {
  final bool isDarkMode;
  final bool isReducedMotion;
  final bool isColorBlindFriendly;
  final Function(bool) onDarkModeChanged;
  final Function(bool) onReducedMotionChanged;
  final Function(bool) onColorBlindFriendlyChanged;

  const AppearanceSettingsWidget({
    Key? key,
    required this.isDarkMode,
    required this.isReducedMotion,
    required this.isColorBlindFriendly,
    required this.onDarkModeChanged,
    required this.onReducedMotionChanged,
    required this.onColorBlindFriendlyChanged,
  }) : super(key: key);

  @override
  State<AppearanceSettingsWidget> createState() =>
      _AppearanceSettingsWidgetState();
}

class _AppearanceSettingsWidgetState extends State<AppearanceSettingsWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _fadeAnimation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 280),
      vsync: this,
    );
    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _animationController, curve: Curves.easeInOut),
    );
    _animationController.forward();
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return FadeTransition(
      opacity: _fadeAnimation,
      child: Column(
        children: [
          // Dark Mode Toggle
          _buildAppearanceItem(
            title: 'Dark Mode',
            subtitle: 'Switch to dark theme for better night viewing',
            iconName: widget.isDarkMode ? 'dark_mode' : 'light_mode',
            iconColor: widget.isDarkMode
                ? AppTheme.darkAccent
                : AppTheme.calorieAccent,
            trailing: Switch(
              value: widget.isDarkMode,
              onChanged: (value) {
                _animateThemeChange(() {
                  widget.onDarkModeChanged(value);
                });
              },
            ),
          ),
          SizedBox(height: 1.h),
          // Reduced Motion Toggle
          _buildAppearanceItem(
            title: 'Reduced Motion',
            subtitle: 'Minimize animations for accessibility',
            iconName: 'accessibility',
            iconColor: AppTheme.successState,
            trailing: Switch(
              value: widget.isReducedMotion,
              onChanged: widget.onReducedMotionChanged,
            ),
          ),
          SizedBox(height: 1.h),
          // Color Blind Friendly Toggle
          _buildAppearanceItem(
            title: 'Color Blind Friendly',
            subtitle: 'Use patterns and high contrast for better visibility',
            iconName: 'visibility',
            iconColor: AppTheme.waterAccent,
            trailing: Switch(
              value: widget.isColorBlindFriendly,
              onChanged: widget.onColorBlindFriendlyChanged,
            ),
          ),
          SizedBox(height: 2.h),
          // Theme Preview
          _buildThemePreview(),
        ],
      ),
    );
  }

  Widget _buildAppearanceItem({
    required String title,
    required String subtitle,
    required String iconName,
    required Color iconColor,
    required Widget trailing,
  }) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 2.h),
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.surface.withValues(alpha: 0.5),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: Theme.of(context).colorScheme.outline.withValues(alpha: 0.2),
          width: 1,
        ),
      ),
      child: Row(
        children: [
          // Icon
          Container(
            width: 10.w,
            height: 10.w,
            decoration: BoxDecoration(
              color: iconColor.withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Center(
              child: CustomIconWidget(
                iconName: iconName,
                color: iconColor,
                size: 5.w,
              ),
            ),
          ),
          SizedBox(width: 3.w),
          // Title and Subtitle
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        fontWeight: FontWeight.w500,
                        color: Theme.of(context).colorScheme.onSurface,
                      ),
                ),
                SizedBox(height: 0.5.h),
                Text(
                  subtitle,
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                        color: Theme.of(context).colorScheme.onSurfaceVariant,
                      ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ),
          ),
          SizedBox(width: 2.w),
          // Trailing Widget
          trailing,
        ],
      ),
    );
  }

  Widget _buildThemePreview() {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.surface,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: Theme.of(context).colorScheme.outline.withValues(alpha: 0.2),
          width: 1,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              CustomIconWidget(
                iconName: 'palette',
                color: AppTheme.calorieAccent,
                size: 5.w,
              ),
              SizedBox(width: 2.w),
              Text(
                'Theme Preview',
                style: Theme.of(context).textTheme.titleSmall?.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
              ),
            ],
          ),
          SizedBox(height: 2.h),
          // Color Palette Preview
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              _buildColorSwatch('Primary', AppTheme.calorieAccent),
              _buildColorSwatch('Secondary', AppTheme.waterAccent),
              _buildColorSwatch('Success', AppTheme.successState),
              _buildColorSwatch('Warning', AppTheme.warningState),
            ],
          ),
          SizedBox(height: 2.h),
          // Progress Ring Preview
          Row(
            children: [
              Expanded(
                child: Container(
                  height: 15.w,
                  decoration: BoxDecoration(
                    color: widget.isColorBlindFriendly
                        ? Theme.of(context).colorScheme.surface
                        : AppTheme.calorieAccent.withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(8),
                    border: widget.isColorBlindFriendly
                        ? Border.all(
                            color: AppTheme.calorieAccent,
                            width: 2,
                          )
                        : null,
                  ),
                  child: Center(
                    child: Text(
                      widget.isColorBlindFriendly
                          ? 'Pattern Mode'
                          : 'Color Mode',
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                            fontWeight: FontWeight.w500,
                            color: AppTheme.calorieAccent,
                          ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildColorSwatch(String label, Color color) {
    return Column(
      children: [
        Container(
          width: 12.w,
          height: 12.w,
          decoration: BoxDecoration(
            color: color,
            shape: BoxShape.circle,
            border: Border.all(
              color:
                  Theme.of(context).colorScheme.outline.withValues(alpha: 0.2),
              width: 1,
            ),
          ),
        ),
        SizedBox(height: 0.5.h),
        Text(
          label,
          style: Theme.of(context).textTheme.bodySmall?.copyWith(
                fontSize: 10.sp,
              ),
        ),
      ],
    );
  }

  void _animateThemeChange(VoidCallback onComplete) {
    _animationController.reverse().then((_) {
      onComplete();
      _animationController.forward();
    });
  }
}
