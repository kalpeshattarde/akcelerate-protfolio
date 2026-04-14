import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class ColorThemeSelector extends StatefulWidget {
  final Color selectedColor;
  final Function(Color) onColorSelected;

  const ColorThemeSelector({
    super.key,
    required this.selectedColor,
    required this.onColorSelected,
  });

  @override
  State<ColorThemeSelector> createState() => _ColorThemeSelectorState();
}

class _ColorThemeSelectorState extends State<ColorThemeSelector>
    with TickerProviderStateMixin {
  late AnimationController _selectionController;
  late Animation<double> _selectionAnimation;

  final List<Color> calmingColors = [
    const Color(0xFF2D5A3D), // Deep forest green
    const Color(0xFF4A7C59), // Muted green
    const Color(0xFFC17B5A), // Terracotta
    const Color(0xFFD4A574), // Rustic gold
    const Color(0xFF6B9B7A), // Sage green
    const Color(0xFFB8956A), // Warm amber
    const Color(0xFF8B7355), // Earthy brown
    const Color(0xFF9C8B7A), // Mushroom
    const Color(0xFF7A8B6B), // Olive green
    const Color(0xFFA67C5A), // Clay
    const Color(0xFF5A7C6B), // Teal green
    const Color(0xFF8A6B5C), // Cocoa
  ];

  @override
  void initState() {
    super.initState();
    _initializeSelectionAnimation();
  }

  void _initializeSelectionAnimation() {
    _selectionController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );

    _selectionAnimation = Tween<double>(
      begin: 1.0,
      end: 1.2,
    ).animate(CurvedAnimation(
      parent: _selectionController,
      curve: Curves.elasticOut,
    ));
  }

  @override
  void dispose() {
    _selectionController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Color Theme',
          style: theme.textTheme.titleMedium?.copyWith(
            color:
                isDark ? AppTheme.textPrimaryDark : AppTheme.textPrimaryLight,
            fontWeight: FontWeight.w600,
          ),
        ),
        SizedBox(height: 2.h),
        Container(
          padding: EdgeInsets.all(4.w),
          decoration: BoxDecoration(
            color: isDark ? AppTheme.surfaceDark : AppTheme.surfaceLight,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: isDark ? AppTheme.borderDark : AppTheme.borderLight,
            ),
            boxShadow: [
              BoxShadow(
                color: isDark
                    ? Colors.white.withValues(alpha: 0.05)
                    : Colors.black.withValues(alpha: 0.08),
                blurRadius: 8,
                offset: const Offset(0, 2),
              ),
            ],
          ),
          child: Column(
            children: [
              _buildColorGrid(context, isDark),
              SizedBox(height: 3.h),
              _buildSelectedColorPreview(context, isDark),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildColorGrid(BuildContext context, bool isDark) {
    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 6,
        crossAxisSpacing: 3.w,
        mainAxisSpacing: 2.h,
        childAspectRatio: 1.0,
      ),
      itemCount: calmingColors.length,
      itemBuilder: (context, index) {
        final color = calmingColors[index];
        final isSelected = widget.selectedColor == color;

        return _buildColorSwatch(context, color, isSelected, isDark);
      },
    );
  }

  Widget _buildColorSwatch(
    BuildContext context,
    Color color,
    bool isSelected,
    bool isDark,
  ) {
    return GestureDetector(
      onTap: () {
        HapticFeedback.lightImpact();
        widget.onColorSelected(color);
        if (isSelected) {
          _selectionController.forward().then((_) {
            _selectionController.reverse();
          });
        }
      },
      child: AnimatedBuilder(
        animation: _selectionAnimation,
        builder: (context, child) {
          return Transform.scale(
            scale: isSelected ? _selectionAnimation.value : 1.0,
            child: Container(
              width: 12.w,
              height: 12.w,
              decoration: BoxDecoration(
                color: color,
                shape: BoxShape.circle,
                border: isSelected
                    ? Border.all(
                        color: isDark
                            ? AppTheme.primaryLight
                            : AppTheme.primaryDark,
                        width: 3.0,
                      )
                    : null,
                boxShadow: [
                  BoxShadow(
                    color: color.withValues(alpha: 0.4),
                    blurRadius: isSelected ? 12 : 6,
                    offset: const Offset(0, 2),
                  ),
                  if (isSelected)
                    BoxShadow(
                      color: isDark
                          ? Colors.white.withValues(alpha: 0.2)
                          : Colors.black.withValues(alpha: 0.1),
                      blurRadius: 8,
                      offset: const Offset(0, 4),
                    ),
                ],
              ),
              child: isSelected
                  ? Center(
                      child: CustomIconWidget(
                        iconName: 'check',
                        size: 5.w,
                        color: _getContrastColor(color),
                      ),
                    )
                  : null,
            ),
          );
        },
      ),
    );
  }

  Widget _buildSelectedColorPreview(BuildContext context, bool isDark) {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: widget.selectedColor.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: widget.selectedColor.withValues(alpha: 0.3),
        ),
      ),
      child: Row(
        children: [
          Container(
            width: 8.w,
            height: 8.w,
            decoration: BoxDecoration(
              color: widget.selectedColor,
              shape: BoxShape.circle,
              boxShadow: [
                BoxShadow(
                  color: widget.selectedColor.withValues(alpha: 0.4),
                  blurRadius: 8,
                  offset: const Offset(0, 2),
                ),
              ],
            ),
          ),
          SizedBox(width: 4.w),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Selected Theme',
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        color: widget.selectedColor,
                        fontWeight: FontWeight.w600,
                      ),
                ),
                SizedBox(height: 0.5.h),
                Text(
                  'This color will be used for your habit progress and highlights',
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                        color: widget.selectedColor.withValues(alpha: 0.8),
                        height: 1.3,
                      ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Color _getContrastColor(Color backgroundColor) {
    // Calculate luminance to determine if we need light or dark text
    final luminance = backgroundColor.computeLuminance();
    return luminance > 0.5 ? Colors.black : Colors.white;
  }
}
