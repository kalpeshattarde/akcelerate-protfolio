import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';

enum CustomAppBarVariant {
  primary,
  transparent,
  search,
  profile,
}

class CustomAppBar extends StatelessWidget implements PreferredSizeWidget {
  final String? title;
  final CustomAppBarVariant variant;
  final List<Widget>? actions;
  final Widget? leading;
  final bool automaticallyImplyLeading;
  final bool centerTitle;
  final double? elevation;
  final Color? backgroundColor;
  final Color? foregroundColor;
  final PreferredSizeWidget? bottom;
  final VoidCallback? onSearchTap;
  final VoidCallback? onProfileTap;
  final String? searchHint;
  final bool showNotificationBadge;
  final int notificationCount;

  const CustomAppBar({
    super.key,
    this.title,
    this.variant = CustomAppBarVariant.primary,
    this.actions,
    this.leading,
    this.automaticallyImplyLeading = true,
    this.centerTitle = false,
    this.elevation,
    this.backgroundColor,
    this.foregroundColor,
    this.bottom,
    this.onSearchTap,
    this.onProfileTap,
    this.searchHint = 'Search services...',
    this.showNotificationBadge = false,
    this.notificationCount = 0,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return AppBar(
      title: _buildTitle(context),
      leading: _buildLeading(context),
      actions: _buildActions(context),
      automaticallyImplyLeading: automaticallyImplyLeading,
      centerTitle: centerTitle,
      elevation: _getElevation(),
      backgroundColor: _getBackgroundColor(colorScheme),
      foregroundColor: _getForegroundColor(colorScheme),
      surfaceTintColor: Colors.transparent,
      systemOverlayStyle: _getSystemOverlayStyle(colorScheme),
      bottom: bottom,
      titleTextStyle: _getTitleTextStyle(context),
      toolbarHeight: variant == CustomAppBarVariant.search ? 64 : null,
    );
  }

  Widget? _buildTitle(BuildContext context) {
    switch (variant) {
      case CustomAppBarVariant.search:
        return _buildSearchField(context);
      case CustomAppBarVariant.transparent:
      case CustomAppBarVariant.primary:
      case CustomAppBarVariant.profile:
        return title != null ? Text(title!) : null;
    }
  }

  Widget _buildSearchField(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Container(
      height: 40,
      decoration: BoxDecoration(
        color: colorScheme.surface,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: colorScheme.outline.withValues(alpha: 0.3),
          width: 1,
        ),
      ),
      child: TextField(
        onTap: onSearchTap,
        readOnly: onSearchTap != null,
        decoration: InputDecoration(
          hintText: searchHint,
          hintStyle: GoogleFonts.inter(
            fontSize: 14,
            fontWeight: FontWeight.w400,
            color: colorScheme.onSurfaceVariant,
          ),
          prefixIcon: Icon(
            Icons.search_rounded,
            size: 20,
            color: colorScheme.onSurfaceVariant,
          ),
          border: InputBorder.none,
          contentPadding: const EdgeInsets.symmetric(
            horizontal: 16,
            vertical: 8,
          ),
        ),
        style: GoogleFonts.inter(
          fontSize: 14,
          fontWeight: FontWeight.w400,
          color: colorScheme.onSurface,
        ),
      ),
    );
  }

  Widget? _buildLeading(BuildContext context) {
    if (leading != null) return leading;

    if (variant == CustomAppBarVariant.profile) {
      return IconButton(
        onPressed: () => Navigator.pushNamed(context, '/settings-profile'),
        icon: CircleAvatar(
          radius: 16,
          backgroundColor: Theme.of(context).colorScheme.primary,
          child: Icon(
            Icons.person_rounded,
            size: 18,
            color: Theme.of(context).colorScheme.onPrimary,
          ),
        ),
      );
    }

    return null;
  }

  List<Widget>? _buildActions(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    List<Widget> defaultActions = [];

    switch (variant) {
      case CustomAppBarVariant.primary:
        defaultActions.addAll([
          IconButton(
            onPressed: () => Navigator.pushNamed(context, '/service-dashboard'),
            icon: Stack(
              children: [
                Icon(
                  Icons.notifications_outlined,
                  size: 24,
                  color: colorScheme.onSurface,
                ),
                if (showNotificationBadge && notificationCount > 0)
                  Positioned(
                    right: 0,
                    top: 0,
                    child: Container(
                      padding: const EdgeInsets.all(2),
                      decoration: BoxDecoration(
                        color: colorScheme.error,
                        borderRadius: BorderRadius.circular(8),
                      ),
                      constraints: const BoxConstraints(
                        minWidth: 16,
                        minHeight: 16,
                      ),
                      child: Text(
                        notificationCount > 99
                            ? '99+'
                            : notificationCount.toString(),
                        style: GoogleFonts.inter(
                          fontSize: 10,
                          fontWeight: FontWeight.w600,
                          color: colorScheme.onError,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ),
                  ),
              ],
            ),
          ),
          IconButton(
            onPressed: onProfileTap ??
                () => Navigator.pushNamed(context, '/settings-profile'),
            icon: CircleAvatar(
              radius: 14,
              backgroundColor: colorScheme.primary,
              child: Icon(
                Icons.person_rounded,
                size: 16,
                color: colorScheme.onPrimary,
              ),
            ),
          ),
        ]);
        break;

      case CustomAppBarVariant.search:
        defaultActions.addAll([
          IconButton(
            onPressed: () => Navigator.pushNamed(context, '/service-dashboard'),
            icon: Icon(
              Icons.tune_rounded,
              size: 24,
              color: colorScheme.onSurface,
            ),
          ),
        ]);
        break;

      case CustomAppBarVariant.transparent:
        defaultActions.addAll([
          IconButton(
            onPressed: () => Navigator.pushNamed(context, '/service-dashboard'),
            icon: Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: colorScheme.surface.withValues(alpha: 0.9),
                borderRadius: BorderRadius.circular(20),
              ),
              child: Icon(
                Icons.notifications_outlined,
                size: 20,
                color: colorScheme.onSurface,
              ),
            ),
          ),
        ]);
        break;

      case CustomAppBarVariant.profile:
        defaultActions.addAll([
          IconButton(
            onPressed: () => Navigator.pushNamed(context, '/settings-profile'),
            icon: Icon(
              Icons.settings_outlined,
              size: 24,
              color: colorScheme.onSurface,
            ),
          ),
        ]);
        break;
    }

    if (actions != null) {
      defaultActions.addAll(actions!);
    }

    return defaultActions.isNotEmpty ? defaultActions : null;
  }

  double _getElevation() {
    if (elevation != null) return elevation!;

    switch (variant) {
      case CustomAppBarVariant.transparent:
        return 0;
      case CustomAppBarVariant.primary:
      case CustomAppBarVariant.search:
      case CustomAppBarVariant.profile:
        return 0;
    }
  }

  Color? _getBackgroundColor(ColorScheme colorScheme) {
    if (backgroundColor != null) return backgroundColor;

    switch (variant) {
      case CustomAppBarVariant.transparent:
        return Colors.transparent;
      case CustomAppBarVariant.primary:
      case CustomAppBarVariant.search:
      case CustomAppBarVariant.profile:
        return colorScheme.surface;
    }
  }

  Color? _getForegroundColor(ColorScheme colorScheme) {
    if (foregroundColor != null) return foregroundColor;

    switch (variant) {
      case CustomAppBarVariant.transparent:
      case CustomAppBarVariant.primary:
      case CustomAppBarVariant.search:
      case CustomAppBarVariant.profile:
        return colorScheme.onSurface;
    }
  }

  SystemUiOverlayStyle _getSystemOverlayStyle(ColorScheme colorScheme) {
    switch (variant) {
      case CustomAppBarVariant.transparent:
        return SystemUiOverlayStyle.light;
      case CustomAppBarVariant.primary:
      case CustomAppBarVariant.search:
      case CustomAppBarVariant.profile:
        return colorScheme.brightness == Brightness.light
            ? SystemUiOverlayStyle.dark
            : SystemUiOverlayStyle.light;
    }
  }

  TextStyle _getTitleTextStyle(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return GoogleFonts.inter(
      fontSize: 18,
      fontWeight: FontWeight.w600,
      color: _getForegroundColor(colorScheme),
      letterSpacing: -0.02,
    );
  }

  @override
  Size get preferredSize => Size.fromHeight(
        kToolbarHeight + (bottom?.preferredSize.height ?? 0.0),
      );
}
