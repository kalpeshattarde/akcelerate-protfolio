import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class ThemeCustomizationWidget extends StatefulWidget {
  final String selectedTheme;
  final Function(String) onThemeChanged;

  const ThemeCustomizationWidget({
    super.key,
    required this.selectedTheme,
    required this.onThemeChanged,
  });

  @override
  State<ThemeCustomizationWidget> createState() =>
      _ThemeCustomizationWidgetState();
}

class _ThemeCustomizationWidgetState extends State<ThemeCustomizationWidget>
    with TickerProviderStateMixin {
  late AnimationController _previewController;
  late Animation<double> _previewAnimation;
  String? _previewingTheme;

  final List<Map<String, dynamic>> _themeOptions = [
    {
      'id': 'sanctuary',
      'name': 'Sanctuary',
      'description': 'Warm, grounding colors for contemplation',
      'primaryColor': const Color(0xFF2D5A3D),
      'secondaryColor': const Color(0xFFC17B5A),
      'backgroundColor': const Color(0xFFFEFCF8),
      'isDefault': true,
    },
    {
      'id': 'ocean',
      'name': 'Ocean Breeze',
      'description': 'Calming blues and teals',
      'primaryColor': const Color(0xFF1B4B5A),
      'secondaryColor': const Color(0xFF4A9EAF),
      'backgroundColor': const Color(0xFFF0F8FA),
      'isDefault': false,
    },
    {
      'id': 'sunset',
      'name': 'Golden Sunset',
      'description': 'Warm oranges and deep purples',
      'primaryColor': const Color(0xFF5A2D4B),
      'secondaryColor': const Color(0xFFD4A574),
      'backgroundColor': const Color(0xFFFAF6F0),
      'isDefault': false,
    },
    {
      'id': 'forest',
      'name': 'Deep Forest',
      'description': 'Rich greens and earth tones',
      'primaryColor': const Color(0xFF2D4B2D),
      'secondaryColor': const Color(0xFF8B7355),
      'backgroundColor': const Color(0xFFF5F7F5),
      'isDefault': false,
    },
  ];

  @override
  void initState() {
    super.initState();
    _initializePreviewAnimation();
  }

  void _initializePreviewAnimation() {
    _previewController = AnimationController(
      duration: const Duration(milliseconds: 600),
      vsync: this,
    );

    _previewAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _previewController,
      curve: Curves.easeInOut,
    ));
  }

  @override
  void dispose() {
    _previewController.dispose();
    super.dispose();
  }

  void _handleThemeSelection(String themeId) {
    HapticFeedback.lightImpact();

    setState(() {
      _previewingTheme = themeId;
    });

    _previewController.forward().then((_) {
      Future.delayed(const Duration(milliseconds: 300), () {
        widget.onThemeChanged(themeId);
        _previewController.reverse().then((_) {
          if (mounted) {
            setState(() {
              _previewingTheme = null;
            });
          }
        });
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 2.w, vertical: 1.h),
            child: Row(
              children: [
                CustomIconWidget(
                  iconName: 'palette',
                  color: AppTheme.lightTheme.colorScheme.primary,
                  size: 24,
                ),
                SizedBox(width: 2.w),
                Text(
                  'Theme Customization',
                  style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                    color: isDark
                        ? AppTheme.darkTheme.colorScheme.onSurface
                        : AppTheme.lightTheme.colorScheme.onSurface,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
          ),
          SizedBox(height: 1.h),
          Container(
            height: 20.h,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              padding: EdgeInsets.symmetric(horizontal: 2.w),
              itemCount: _themeOptions.length,
              itemBuilder: (context, index) {
                return _buildThemeOption(
                  context,
                  theme: _themeOptions[index],
                  index: index,
                  isDark: isDark,
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildThemeOption(
    BuildContext context, {
    required Map<String, dynamic> theme,
    required int index,
    required bool isDark,
  }) {
    final isSelected = widget.selectedTheme == theme['id'];
    final isPreviewing = _previewingTheme == theme['id'];

    return AnimatedBuilder(
      animation: _previewAnimation,
      builder: (context, child) {
        return Transform.scale(
          scale: isPreviewing ? (1.0 + (_previewAnimation.value * 0.1)) : 1.0,
          child: Container(
            width: 40.w,
            margin: EdgeInsets.symmetric(horizontal: 2.w),
            child: GestureDetector(
              onTap: () => _handleThemeSelection(theme['id'] as String),
              child: Container(
                padding: EdgeInsets.all(3.w),
                decoration: BoxDecoration(
                  color: isDark
                      ? AppTheme.darkTheme.colorScheme.surface
                      : AppTheme.lightTheme.colorScheme.surface,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(
                    color: isSelected
                        ? AppTheme.lightTheme.colorScheme.primary
                        : AppTheme.lightTheme.colorScheme.outline
                            .withValues(alpha: 0.3),
                    width: isSelected ? 2 : 1,
                  ),
                  boxShadow: [
                    BoxShadow(
                      color: isSelected
                          ? AppTheme.lightTheme.colorScheme.primary
                              .withValues(alpha: 0.2)
                          : (isDark
                              ? Colors.white.withValues(alpha: 0.03)
                              : Colors.black.withValues(alpha: 0.06)),
                      blurRadius: isSelected ? 12 : 6,
                      offset: const Offset(0, 2),
                    ),
                  ],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Theme preview
                    Container(
                      height: 8.h,
                      decoration: BoxDecoration(
                        color: theme['backgroundColor'] as Color,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(
                          color: AppTheme.lightTheme.colorScheme.outline
                              .withValues(alpha: 0.2),
                          width: 0.5,
                        ),
                      ),
                      child: Stack(
                        children: [
                          // Background pattern
                          Positioned.fill(
                            child: Container(
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(12),
                                gradient: LinearGradient(
                                  colors: [
                                    (theme['primaryColor'] as Color)
                                        .withValues(alpha: 0.1),
                                    (theme['secondaryColor'] as Color)
                                        .withValues(alpha: 0.1),
                                  ],
                                  begin: Alignment.topLeft,
                                  end: Alignment.bottomRight,
                                ),
                              ),
                            ),
                          ),

                          // Color swatches
                          Positioned(
                            top: 1.h,
                            left: 2.w,
                            child: Row(
                              children: [
                                Container(
                                  width: 4.w,
                                  height: 4.w,
                                  decoration: BoxDecoration(
                                    color: theme['primaryColor'] as Color,
                                    shape: BoxShape.circle,
                                  ),
                                ),
                                SizedBox(width: 1.w),
                                Container(
                                  width: 4.w,
                                  height: 4.w,
                                  decoration: BoxDecoration(
                                    color: theme['secondaryColor'] as Color,
                                    shape: BoxShape.circle,
                                  ),
                                ),
                              ],
                            ),
                          ),

                          // Selection indicator
                          if (isSelected)
                            Positioned(
                              top: 1.h,
                              right: 2.w,
                              child: Container(
                                padding: EdgeInsets.all(1.w),
                                decoration: BoxDecoration(
                                  color:
                                      AppTheme.lightTheme.colorScheme.primary,
                                  shape: BoxShape.circle,
                                ),
                                child: CustomIconWidget(
                                  iconName: 'check',
                                  color:
                                      AppTheme.lightTheme.colorScheme.onPrimary,
                                  size: 12,
                                ),
                              ),
                            ),
                        ],
                      ),
                    ),

                    SizedBox(height: 2.h),

                    // Theme name
                    Row(
                      children: [
                        Expanded(
                          child: Text(
                            theme['name'] as String,
                            style: AppTheme.lightTheme.textTheme.titleSmall
                                ?.copyWith(
                              color: isDark
                                  ? AppTheme.darkTheme.colorScheme.onSurface
                                  : AppTheme.lightTheme.colorScheme.onSurface,
                              fontWeight: FontWeight.w600,
                            ),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                        if (theme['isDefault'] as bool? ?? false)
                          Container(
                            padding: EdgeInsets.symmetric(
                                horizontal: 1.5.w, vertical: 0.3.h),
                            decoration: BoxDecoration(
                              color: AppTheme.lightTheme.colorScheme.tertiary
                                  .withValues(alpha: 0.2),
                              borderRadius: BorderRadius.circular(6),
                            ),
                            child: Text(
                              'Default',
                              style: AppTheme.lightTheme.textTheme.labelSmall
                                  ?.copyWith(
                                color: AppTheme.lightTheme.colorScheme.tertiary,
                                fontWeight: FontWeight.w600,
                                fontSize: 8.sp,
                              ),
                            ),
                          ),
                      ],
                    ),

                    SizedBox(height: 0.5.h),

                    // Theme description
                    Text(
                      theme['description'] as String,
                      style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                        color: isDark
                            ? AppTheme.darkTheme.colorScheme.onSurfaceVariant
                            : AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                      ),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ],
                ),
              ),
            ),
          ),
        );
      },
    );
  }
}
