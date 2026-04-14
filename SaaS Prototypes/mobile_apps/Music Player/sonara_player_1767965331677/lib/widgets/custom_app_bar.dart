import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

/// Variants for the custom app bar
enum CustomAppBarVariant {
  /// Standard app bar with title and actions
  standard,

  /// App bar with search functionality
  search,

  /// App bar with back button and title
  detail,

  /// Transparent app bar for overlays
  transparent,

  /// App bar with large title for main screens
  large,
}

/// Custom app bar for music streaming application
/// Implements Contemporary Dark Minimalism with flexible variants
class CustomAppBar extends StatelessWidget implements PreferredSizeWidget {
  final String? title;
  final CustomAppBarVariant variant;
  final List<Widget>? actions;
  final Widget? leading;
  final bool automaticallyImplyLeading;
  final VoidCallback? onSearchTap;
  final TextEditingController? searchController;
  final Function(String)? onSearchChanged;
  final VoidCallback? onSearchSubmitted;
  final Color? backgroundColor;
  final Color? foregroundColor;
  final double elevation;
  final bool centerTitle;
  final Widget? flexibleSpace;
  final PreferredSizeWidget? bottom;

  const CustomAppBar({
    Key? key,
    this.title,
    this.variant = CustomAppBarVariant.standard,
    this.actions,
    this.leading,
    this.automaticallyImplyLeading = true,
    this.onSearchTap,
    this.searchController,
    this.onSearchChanged,
    this.onSearchSubmitted,
    this.backgroundColor,
    this.foregroundColor,
    this.elevation = 0,
    this.centerTitle = false,
    this.flexibleSpace,
    this.bottom,
  }) : super(key: key);

  @override
  Size get preferredSize {
    double height = kToolbarHeight;
    if (variant == CustomAppBarVariant.large) {
      height = 120.0;
    }
    if (bottom != null) {
      height += bottom!.preferredSize.height;
    }
    return Size.fromHeight(height);
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final bgColor =
        backgroundColor ??
        (variant == CustomAppBarVariant.transparent
            ? Colors.transparent
            : theme.appBarTheme.backgroundColor ?? const Color(0xFF121212));
    final fgColor =
        foregroundColor ??
        theme.appBarTheme.foregroundColor ??
        const Color(0xFFFFFFFF);

    switch (variant) {
      case CustomAppBarVariant.search:
        return _buildSearchAppBar(context, bgColor, fgColor);
      case CustomAppBarVariant.large:
        return _buildLargeAppBar(context, bgColor, fgColor);
      case CustomAppBarVariant.transparent:
        return _buildTransparentAppBar(context, fgColor);
      case CustomAppBarVariant.detail:
        return _buildDetailAppBar(context, bgColor, fgColor);
      case CustomAppBarVariant.standard:
      default:
        return _buildStandardAppBar(context, bgColor, fgColor);
    }
  }

  Widget _buildStandardAppBar(
    BuildContext context,
    Color bgColor,
    Color fgColor,
  ) {
    return AppBar(
      backgroundColor: bgColor,
      foregroundColor: fgColor,
      elevation: elevation,
      centerTitle: centerTitle,
      automaticallyImplyLeading: automaticallyImplyLeading,
      leading: leading,
      title: title != null
          ? Text(
              title!,
              style: GoogleFonts.inter(
                fontSize: 20,
                fontWeight: FontWeight.w600,
                color: fgColor,
                letterSpacing: 0.15,
              ),
            )
          : null,
      actions: _buildActions(context, fgColor),
      flexibleSpace: flexibleSpace,
      bottom: bottom,
    );
  }

  Widget _buildDetailAppBar(
    BuildContext context,
    Color bgColor,
    Color fgColor,
  ) {
    return AppBar(
      backgroundColor: bgColor,
      foregroundColor: fgColor,
      elevation: elevation,
      centerTitle: centerTitle,
      automaticallyImplyLeading: false,
      leading: leading,
      title: title != null
          ? Text(
              title!,
              style: GoogleFonts.inter(
                fontSize: 18,
                fontWeight: FontWeight.w600,
                color: fgColor,
                letterSpacing: 0.15,
              ),
            )
          : null,
      actions: _buildActions(context, fgColor),
      bottom: bottom,
    );
  }

  Widget _buildSearchAppBar(
    BuildContext context,
    Color bgColor,
    Color fgColor,
  ) {
    return AppBar(
      backgroundColor: bgColor,
      foregroundColor: fgColor,
      elevation: elevation,
      automaticallyImplyLeading: false,
      title: Container(
        height: 44,
        decoration: BoxDecoration(
          color: const Color(0xFF1E1E1E),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: const Color(0xFF333333), width: 1),
        ),
        child: TextField(
          controller: searchController,
          onChanged: onSearchChanged,
          onSubmitted: (value) => onSearchSubmitted?.call(),
          style: GoogleFonts.inter(
            fontSize: 14,
            fontWeight: FontWeight.w400,
            color: fgColor,
          ),
          decoration: InputDecoration(
            hintText: 'Search songs, artists, albums...',
            hintStyle: GoogleFonts.inter(
              fontSize: 14,
              fontWeight: FontWeight.w400,
              color: const Color(0xFF666666),
            ),
            prefixIcon: Icon(
              Icons.search_rounded,
              color: const Color(0xFFB3B3B3),
              size: 22,
            ),
            suffixIcon: searchController?.text.isNotEmpty ?? false
                ? IconButton(
                    icon: Icon(
                      Icons.close_rounded,
                      color: const Color(0xFFB3B3B3),
                      size: 20,
                    ),
                    onPressed: () {
                      searchController?.clear();
                      onSearchChanged?.call('');
                    },
                  )
                : null,
            border: InputBorder.none,
            contentPadding: const EdgeInsets.symmetric(
              horizontal: 16,
              vertical: 12,
            ),
          ),
        ),
      ),
      actions: actions,
      bottom: bottom,
    );
  }

  Widget _buildLargeAppBar(BuildContext context, Color bgColor, Color fgColor) {
    return PreferredSize(
      preferredSize: preferredSize,
      child: Container(
        color: bgColor,
        padding: EdgeInsets.only(
          top: MediaQuery.of(context).padding.top,
          left: 16,
          right: 16,
          bottom: 16,
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                if (leading != null)
                  leading!
                else
                  const SizedBox(width: 48),
                if (actions != null) ..._buildActions(context, fgColor),
              ],
            ),
            const SizedBox(height: 8),
            if (title != null)
              Padding(
                padding: const EdgeInsets.only(left: 4),
                child: Text(
                  title!,
                  style: GoogleFonts.inter(
                    fontSize: 32,
                    fontWeight: FontWeight.w700,
                    color: fgColor,
                    letterSpacing: 0,
                    height: 1.25,
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildTransparentAppBar(BuildContext context, Color fgColor) {
    return AppBar(
      backgroundColor: Colors.transparent,
      foregroundColor: fgColor,
      elevation: 0,
      automaticallyImplyLeading: false,
      leading: leading,
      title: title != null
          ? Text(
              title!,
              style: GoogleFonts.inter(
                fontSize: 18,
                fontWeight: FontWeight.w600,
                color: fgColor,
                letterSpacing: 0.15,
              ),
            )
          : null,
      actions: actions?.map((action) {
        return Container(
          margin: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: Colors.black.withValues(alpha: 0.5),
            shape: BoxShape.circle,
          ),
          child: action,
        );
      }).toList(),
      bottom: bottom,
    );
  }

  List<Widget> _buildActions(BuildContext context, Color fgColor) {
    final defaultActions = <Widget>[];

    if (variant == CustomAppBarVariant.standard && onSearchTap != null) {
      defaultActions.add(
        IconButton(
          icon: const Icon(Icons.search_rounded),
          onPressed: onSearchTap,
          color: fgColor,
          tooltip: 'Search',
        ),
      );
    }

    if (actions != null) {
      defaultActions.addAll(actions!);
    }

    return defaultActions;
  }
}
