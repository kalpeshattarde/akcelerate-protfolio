import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'dart:ui';

/// App bar style variants
enum CustomAppBarStyle { standard, glassmorphism, transparent, gradient }

/// Custom app bar with glassmorphism effects and gradient styling
/// Implements contextual design patterns for video creation workflow
class CustomAppBar extends StatelessWidget implements PreferredSizeWidget {
  /// Title text for the app bar
  final String? title;

  /// Custom title widget (overrides title text)
  final Widget? titleWidget;

  /// Leading widget (typically back button or menu)
  final Widget? leading;

  /// Actions widgets on the right side
  final List<Widget>? actions;

  /// App bar style variant
  final CustomAppBarStyle style;

  /// Whether to show back button automatically
  final bool automaticallyImplyLeading;

  /// Custom elevation
  final double elevation;

  /// Whether to center the title
  final bool centerTitle;

  /// Background color (for standard style)
  final Color? backgroundColor;

  /// Custom height
  final double? height;

  const CustomAppBar({
    super.key,
    this.title,
    this.titleWidget,
    this.leading,
    this.actions,
    this.style = CustomAppBarStyle.standard,
    this.automaticallyImplyLeading = true,
    this.elevation = 2.0,
    this.centerTitle = true,
    this.backgroundColor,
    this.height,
  });

  @override
  Size get preferredSize => Size.fromHeight(height ?? kToolbarHeight);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    Widget appBarContent = _buildAppBarContent(context, theme, isDark);

    // Apply glassmorphism effect if needed
    if (style == CustomAppBarStyle.glassmorphism) {
      appBarContent = ClipRRect(
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
          child: appBarContent,
        ),
      );
    }

    return appBarContent;
  }

  Widget _buildAppBarContent(
    BuildContext context,
    ThemeData theme,
    bool isDark,
  ) {
    final Color effectiveBackgroundColor = _getBackgroundColor(theme, isDark);
    final Color foregroundColor = _getForegroundColor(theme, isDark);

    return Container(
      height: preferredSize.height,
      decoration: _getDecoration(theme, effectiveBackgroundColor),
      child: SafeArea(
        bottom: false,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 4.0),
          child: NavigationToolbar(
            leading: _buildLeading(context, foregroundColor),
            middle: _buildTitle(theme, foregroundColor),
            trailing: _buildActions(foregroundColor),
            centerMiddle: centerTitle,
            middleSpacing: 16.0,
          ),
        ),
      ),
    );
  }

  Color _getBackgroundColor(ThemeData theme, bool isDark) {
    if (backgroundColor != null) return backgroundColor!;

    switch (style) {
      case CustomAppBarStyle.standard:
        return theme.appBarTheme.backgroundColor ?? theme.colorScheme.surface;
      case CustomAppBarStyle.glassmorphism:
        return isDark
            ? theme.colorScheme.surface.withValues(alpha: 0.7)
            : theme.colorScheme.surface.withValues(alpha: 0.8);
      case CustomAppBarStyle.transparent:
        return Colors.transparent;
      case CustomAppBarStyle.gradient:
        return Colors.transparent;
    }
  }

  Color _getForegroundColor(ThemeData theme, bool isDark) {
    switch (style) {
      case CustomAppBarStyle.transparent:
      case CustomAppBarStyle.gradient:
        return Colors.white;
      default:
        return theme.appBarTheme.foregroundColor ?? theme.colorScheme.onSurface;
    }
  }

  BoxDecoration _getDecoration(ThemeData theme, Color backgroundColor) {
    switch (style) {
      case CustomAppBarStyle.gradient:
        return BoxDecoration(
          gradient: LinearGradient(
            colors: [theme.colorScheme.primary, theme.colorScheme.secondary],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          boxShadow: elevation > 0
              ? [
                  BoxShadow(
                    color: theme.shadowColor.withValues(alpha: 0.2),
                    blurRadius: elevation * 2,
                    offset: Offset(0, elevation / 2),
                  ),
                ]
              : null,
        );
      case CustomAppBarStyle.transparent:
        return const BoxDecoration(color: Colors.transparent);
      default:
        return BoxDecoration(
          color: backgroundColor,
          boxShadow: elevation > 0
              ? [
                  BoxShadow(
                    color: theme.shadowColor.withValues(alpha: 0.2),
                    blurRadius: elevation * 2,
                    offset: Offset(0, elevation / 2),
                  ),
                ]
              : null,
          border: style == CustomAppBarStyle.glassmorphism
              ? Border(
                  bottom: BorderSide(
                    color: theme.dividerColor.withValues(alpha: 0.1),
                    width: 1,
                  ),
                )
              : null,
        );
    }
  }

  Widget? _buildLeading(BuildContext context, Color foregroundColor) {
    if (leading != null) return leading;

    if (automaticallyImplyLeading) {
      final ModalRoute<dynamic>? parentRoute = ModalRoute.of(context);
      final bool canPop = parentRoute?.canPop ?? false;

      if (canPop) {
        return IconButton(
          icon: Icon(Icons.arrow_back_ios_new, color: foregroundColor),
          iconSize: 20,
          onPressed: () => Navigator.of(context).pop(),
          tooltip: MaterialLocalizations.of(context).backButtonTooltip,
        );
      }
    }

    return null;
  }

  Widget? _buildTitle(ThemeData theme, Color foregroundColor) {
    if (titleWidget != null) return titleWidget;
    if (title == null) return null;

    return Text(
      title!,
      style: GoogleFonts.inter(
        fontSize: 20,
        fontWeight: FontWeight.w600,
        color: foregroundColor,
        letterSpacing: 0.15,
      ),
      maxLines: 1,
      overflow: TextOverflow.ellipsis,
    );
  }

  Widget? _buildActions(Color foregroundColor) {
    if (actions == null || actions!.isEmpty) return null;

    return Row(
      mainAxisSize: MainAxisSize.min,
      children: actions!.map((action) {
        // Apply foreground color to icon buttons in actions
        if (action is IconButton) {
          return IconButton(
            icon: action.icon,
            iconSize: action.iconSize ?? 24,
            color: foregroundColor,
            onPressed: action.onPressed,
            tooltip: action.tooltip,
          );
        }
        return action;
      }).toList(),
    );
  }
}

/// Factory constructors for common app bar patterns
extension CustomAppBarFactory on CustomAppBar {
  /// Create a standard app bar
  static CustomAppBar standard({
    String? title,
    Widget? titleWidget,
    Widget? leading,
    List<Widget>? actions,
    bool automaticallyImplyLeading = true,
    bool centerTitle = true,
    Color? backgroundColor,
  }) {
    return CustomAppBar(
      title: title,
      titleWidget: titleWidget,
      leading: leading,
      actions: actions,
      style: CustomAppBarStyle.standard,
      automaticallyImplyLeading: automaticallyImplyLeading,
      centerTitle: centerTitle,
      backgroundColor: backgroundColor,
    );
  }

  /// Create a glassmorphism app bar
  static CustomAppBar glassmorphism({
    String? title,
    Widget? titleWidget,
    Widget? leading,
    List<Widget>? actions,
    bool automaticallyImplyLeading = true,
    bool centerTitle = true,
  }) {
    return CustomAppBar(
      title: title,
      titleWidget: titleWidget,
      leading: leading,
      actions: actions,
      style: CustomAppBarStyle.glassmorphism,
      automaticallyImplyLeading: automaticallyImplyLeading,
      centerTitle: centerTitle,
      elevation: 0,
    );
  }

  /// Create a transparent app bar (for overlays)
  static CustomAppBar transparent({
    String? title,
    Widget? titleWidget,
    Widget? leading,
    List<Widget>? actions,
    bool automaticallyImplyLeading = true,
    bool centerTitle = true,
  }) {
    return CustomAppBar(
      title: title,
      titleWidget: titleWidget,
      leading: leading,
      actions: actions,
      style: CustomAppBarStyle.transparent,
      automaticallyImplyLeading: automaticallyImplyLeading,
      centerTitle: centerTitle,
      elevation: 0,
    );
  }

  /// Create a gradient app bar
  static CustomAppBar gradient({
    String? title,
    Widget? titleWidget,
    Widget? leading,
    List<Widget>? actions,
    bool automaticallyImplyLeading = true,
    bool centerTitle = true,
  }) {
    return CustomAppBar(
      title: title,
      titleWidget: titleWidget,
      leading: leading,
      actions: actions,
      style: CustomAppBarStyle.gradient,
      automaticallyImplyLeading: automaticallyImplyLeading,
      centerTitle: centerTitle,
      elevation: 4.0,
    );
  }
}
