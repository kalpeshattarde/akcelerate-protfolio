import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

/// App bar variant types for different contexts
enum CustomAppBarVariant {
  /// Standard app bar with title and actions
  standard,

  /// Centered title with back button
  centered,

  /// Large title for main screens
  large,

  /// Transparent overlay for full-screen content
  transparent,

  /// Search-focused app bar
  search,
}

/// Custom app bar for pregnancy tracking application
/// Implements Contemporary Maternal Minimalism with gentle visual hierarchy
/// Provides consistent navigation patterns across the app
class CustomAppBar extends StatelessWidget implements PreferredSizeWidget {
  final String? title;
  final Widget? titleWidget;
  final CustomAppBarVariant variant;
  final List<Widget>? actions;
  final Widget? leading;
  final bool automaticallyImplyLeading;
  final VoidCallback? onBackPressed;
  final Color? backgroundColor;
  final Color? foregroundColor;
  final double? elevation;
  final bool centerTitle;
  final PreferredSizeWidget? bottom;

  const CustomAppBar({
    super.key,
    this.title,
    this.titleWidget,
    this.variant = CustomAppBarVariant.standard,
    this.actions,
    this.leading,
    this.automaticallyImplyLeading = true,
    this.onBackPressed,
    this.backgroundColor,
    this.foregroundColor,
    this.elevation,
    this.centerTitle = true,
    this.bottom,
  });

  /// Factory constructor for dashboard/home screen
  factory CustomAppBar.dashboard({
    Key? key,
    required String title,
    List<Widget>? actions,
  }) {
    return CustomAppBar(
      key: key,
      title: title,
      variant: CustomAppBarVariant.large,
      actions: actions,
      automaticallyImplyLeading: false,
    );
  }

  /// Factory constructor for detail screens with back navigation
  factory CustomAppBar.detail({
    Key? key,
    required String title,
    List<Widget>? actions,
    VoidCallback? onBackPressed,
  }) {
    return CustomAppBar(
      key: key,
      title: title,
      variant: CustomAppBarVariant.centered,
      actions: actions,
      onBackPressed: onBackPressed,
    );
  }

  /// Factory constructor for search functionality
  factory CustomAppBar.search({
    Key? key,
    required Widget searchField,
    VoidCallback? onBackPressed,
  }) {
    return CustomAppBar(
      key: key,
      titleWidget: searchField,
      variant: CustomAppBarVariant.search,
      onBackPressed: onBackPressed,
    );
  }

  /// Factory constructor for transparent overlay (e.g., image viewers)
  factory CustomAppBar.transparent({
    Key? key,
    List<Widget>? actions,
    VoidCallback? onBackPressed,
  }) {
    return CustomAppBar(
      key: key,
      variant: CustomAppBarVariant.transparent,
      actions: actions,
      onBackPressed: onBackPressed,
      backgroundColor: Colors.transparent,
      elevation: 0,
    );
  }

  @override
  Size get preferredSize {
    double height = 56.0; // Standard app bar height

    if (variant == CustomAppBarVariant.large) {
      height = 96.0; // Large title height
    }

    if (bottom != null) {
      height += bottom!.preferredSize.height;
    }

    return Size.fromHeight(height);
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final appBarTheme = theme.appBarTheme;

    final effectiveBackgroundColor = backgroundColor ??
        (variant == CustomAppBarVariant.transparent
            ? Colors.transparent
            : appBarTheme.backgroundColor ?? theme.colorScheme.surface);

    final effectiveForegroundColor = foregroundColor ??
        appBarTheme.foregroundColor ??
        theme.colorScheme.onSurface;

    final effectiveElevation = elevation ??
        (variant == CustomAppBarVariant.transparent
            ? 0
            : appBarTheme.elevation ?? 0);

    return AppBar(
      backgroundColor: effectiveBackgroundColor,
      foregroundColor: effectiveForegroundColor,
      elevation: effectiveElevation,
      centerTitle: variant == CustomAppBarVariant.centered || centerTitle,
      automaticallyImplyLeading: automaticallyImplyLeading,
      systemOverlayStyle: variant == CustomAppBarVariant.transparent
          ? SystemUiOverlayStyle.light
          : theme.brightness == Brightness.light
              ? SystemUiOverlayStyle.dark
              : SystemUiOverlayStyle.light,
      leading: _buildLeading(context, effectiveForegroundColor),
      title: variant == CustomAppBarVariant.large
          ? null
          : _buildTitle(context, effectiveForegroundColor),
      actions: _buildActions(context),
      bottom: bottom,
      flexibleSpace: variant == CustomAppBarVariant.large
          ? _buildFlexibleSpace(context)
          : null,
    );
  }

  Widget? _buildLeading(BuildContext context, Color foregroundColor) {
    if (leading != null) return leading;

    if (!automaticallyImplyLeading) return null;

    final canPop = Navigator.of(context).canPop();
    if (!canPop) return null;

    return IconButton(
      icon: Icon(Icons.arrow_back_ios_new_rounded, size: 20),
      color: foregroundColor,
      tooltip: 'Back',
      onPressed: () {
        HapticFeedback.lightImpact();
        if (onBackPressed != null) {
          onBackPressed!();
        } else {
          Navigator.of(context).pop();
        }
      },
    );
  }

  Widget? _buildTitle(BuildContext context, Color foregroundColor) {
    if (titleWidget != null) return titleWidget;
    if (title == null) return null;

    final theme = Theme.of(context);

    TextStyle titleStyle;
    switch (variant) {
      case CustomAppBarVariant.large:
        titleStyle = theme.textTheme.headlineMedium!.copyWith(
          color: foregroundColor,
          fontWeight: FontWeight.w600,
        );
        break;
      case CustomAppBarVariant.search:
        return titleWidget;
      default:
        titleStyle = theme.appBarTheme.titleTextStyle ??
            theme.textTheme.titleLarge!.copyWith(
              color: foregroundColor,
            );
    }

    return Text(
      title!,
      style: titleStyle,
      maxLines: 1,
      overflow: TextOverflow.ellipsis,
    );
  }

  List<Widget>? _buildActions(BuildContext context) {
    if (actions == null || actions!.isEmpty) return null;

    return actions!.map((action) {
      // Ensure proper touch target size (48dp minimum)
      if (action is IconButton) {
        return Padding(
          padding: const EdgeInsets.symmetric(horizontal: 4),
          child: action,
        );
      }
      return action;
    }).toList();
  }

  Widget? _buildFlexibleSpace(BuildContext context) {
    if (variant != CustomAppBarVariant.large) return null;

    return FlexibleSpaceBar(
      titlePadding: const EdgeInsets.only(left: 16, bottom: 16),
      title: title != null
          ? Text(
              title!,
              style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                    color: foregroundColor ??
                        Theme.of(context).appBarTheme.foregroundColor,
                    fontWeight: FontWeight.w600,
                  ),
            )
          : titleWidget,
      centerTitle: false,
    );
  }
}

/// Custom app bar action button with consistent styling
class CustomAppBarAction extends StatelessWidget {
  final IconData icon;
  final VoidCallback onPressed;
  final String? tooltip;
  final Color? color;
  final int? badgeCount;

  const CustomAppBarAction({
    super.key,
    required this.icon,
    required this.onPressed,
    this.tooltip,
    this.color,
    this.badgeCount,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final effectiveColor = color ?? theme.appBarTheme.foregroundColor;

    return Stack(
      clipBehavior: Clip.none,
      children: [
        IconButton(
          icon: Icon(icon, size: 24),
          color: effectiveColor,
          tooltip: tooltip,
          onPressed: () {
            HapticFeedback.lightImpact();
            onPressed();
          },
        ),
        if (badgeCount != null && badgeCount! > 0)
          Positioned(
            right: 8,
            top: 8,
            child: Container(
              padding: const EdgeInsets.all(4),
              decoration: BoxDecoration(
                color: theme.colorScheme.error,
                shape: BoxShape.circle,
                border: Border.all(
                  color: theme.appBarTheme.backgroundColor ??
                      theme.colorScheme.surface,
                  width: 1.5,
                ),
              ),
              constraints: const BoxConstraints(
                minWidth: 16,
                minHeight: 16,
              ),
              child: Text(
                badgeCount! > 9 ? '9+' : '$badgeCount',
                style: TextStyle(
                  color: theme.colorScheme.onError,
                  fontSize: 10,
                  fontWeight: FontWeight.w600,
                ),
                textAlign: TextAlign.center,
              ),
            ),
          ),
      ],
    );
  }
}
