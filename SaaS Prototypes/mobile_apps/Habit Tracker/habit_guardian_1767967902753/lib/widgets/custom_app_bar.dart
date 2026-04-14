import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';

/// Custom AppBar widget implementing Contemplative Minimalism design
/// Provides sanctuary-like navigation experience with breathing room and mindful interactions
class CustomAppBar extends StatelessWidget implements PreferredSizeWidget {
  final String title;
  final List<Widget>? actions;
  final Widget? leading;
  final bool centerTitle;
  final bool showBackButton;
  final VoidCallback? onBackPressed;
  final Color? backgroundColor;
  final Color? foregroundColor;
  final double elevation;
  final AppBarVariant variant;

  const CustomAppBar({
    super.key,
    required this.title,
    this.actions,
    this.leading,
    this.centerTitle = true,
    this.showBackButton = true,
    this.onBackPressed,
    this.backgroundColor,
    this.foregroundColor,
    this.elevation = 0,
    this.variant = AppBarVariant.primary,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    // Color configuration based on variant and theme
    final Color effectiveBackgroundColor =
        backgroundColor ?? _getBackgroundColor(theme, variant, isDark);
    final Color effectiveForegroundColor =
        foregroundColor ?? _getForegroundColor(theme, variant, isDark);

    return AppBar(
      title: Text(
        title,
        style: GoogleFonts.inter(
          fontSize: 18,
          fontWeight: FontWeight.w600,
          color: effectiveForegroundColor,
          letterSpacing: 0.15,
        ),
      ),
      centerTitle: centerTitle,
      backgroundColor: effectiveBackgroundColor,
      foregroundColor: effectiveForegroundColor,
      elevation: elevation,
      scrolledUnderElevation: elevation + 2,
      shadowColor:
          isDark ? Colors.white.withAlpha(26) : Colors.black.withAlpha(26),
      surfaceTintColor: Colors.transparent,

      // Leading widget configuration
      leading: leading ??
          (showBackButton && Navigator.canPop(context)
              ? _buildBackButton(context, effectiveForegroundColor)
              : null),

      // Actions configuration with proper spacing
      actions: actions != null
          ? [
              ...actions!,
              const SizedBox(width: 8), // Sanctuary spacing
            ]
          : null,

      // Icon theme for consistent styling
      iconTheme: IconThemeData(
        color: effectiveForegroundColor,
        size: 24,
      ),
      actionsIconTheme: IconThemeData(
        color: effectiveForegroundColor,
        size: 24,
      ),

      // System UI overlay style for status bar
      systemOverlayStyle: SystemUiOverlayStyle(
        statusBarColor: Colors.transparent,
        statusBarIconBrightness: isDark ? Brightness.light : Brightness.dark,
        statusBarBrightness: isDark ? Brightness.dark : Brightness.light,
      ),
    );
  }

  /// Builds custom back button with haptic feedback
  Widget _buildBackButton(BuildContext context, Color color) {
    return IconButton(
      icon: Icon(
        Icons.arrow_back_ios_new_rounded,
        color: color,
        size: 20,
      ),
      onPressed: () {
        // Contextual haptic feedback for iOS-like experience
        HapticFeedback.lightImpact();
        if (onBackPressed != null) {
          onBackPressed!();
        } else {
          Navigator.pop(context);
        }
      },
      tooltip: 'Back',
      splashRadius: 24,
    );
  }

  /// Gets background color based on variant and theme
  Color _getBackgroundColor(
      ThemeData theme, AppBarVariant variant, bool isDark) {
    switch (variant) {
      case AppBarVariant.primary:
        return isDark ? const Color(0xFF1A1A1A) : const Color(0xFFFEFCF8);
      case AppBarVariant.surface:
        return isDark ? const Color(0xFF2A2A2A) : const Color(0xFFF8F6F2);
      case AppBarVariant.transparent:
        return Colors.transparent;
      case AppBarVariant.accent:
        return isDark ? const Color(0xFF4A7C59) : const Color(0xFF2D5A3D);
    }
  }

  /// Gets foreground color based on variant and theme
  Color _getForegroundColor(
      ThemeData theme, AppBarVariant variant, bool isDark) {
    switch (variant) {
      case AppBarVariant.primary:
        return isDark ? const Color(0xFFFEFCF8) : const Color(0xFF1A1A1A);
      case AppBarVariant.surface:
        return isDark ? const Color(0xFFFEFCF8) : const Color(0xFF1A1A1A);
      case AppBarVariant.transparent:
        return isDark ? const Color(0xFFFEFCF8) : const Color(0xFF1A1A1A);
      case AppBarVariant.accent:
        return const Color(0xFFFEFCF8);
    }
  }

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}

/// Enum defining different AppBar variants for various contexts
enum AppBarVariant {
  /// Primary variant with main background color
  primary,

  /// Surface variant with elevated background
  surface,

  /// Transparent variant for overlay contexts
  transparent,

  /// Accent variant with forest green background
  accent,
}
