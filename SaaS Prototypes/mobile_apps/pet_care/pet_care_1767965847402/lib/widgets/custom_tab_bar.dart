import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

/// Custom TabBar widget implementing Contemporary Veterinary Minimalism design
/// Provides clean section navigation with medical-grade clarity
class CustomTabBar extends StatelessWidget implements PreferredSizeWidget {
  final List<String> tabs;
  final TabController? controller;
  final Function(int)? onTap;
  final TabBarVariant variant;
  final bool isScrollable;
  final EdgeInsetsGeometry? padding;
  final Color? indicatorColor;
  final Color? labelColor;
  final Color? unselectedLabelColor;

  const CustomTabBar({
    super.key,
    required this.tabs,
    this.controller,
    this.onTap,
    this.variant = TabBarVariant.standard,
    this.isScrollable = false,
    this.padding,
    this.indicatorColor,
    this.labelColor,
    this.unselectedLabelColor,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    // Determine colors based on theme
    final effectiveLabelColor = labelColor ??
        (theme.brightness == Brightness.light
            ? const Color(0xFF2B5F75) // Primary light
            : const Color(0xFF4A8BA3)); // Primary dark

    final effectiveUnselectedLabelColor = unselectedLabelColor ??
        (theme.brightness == Brightness.light
            ? const Color(0xFF6A737D) // Text secondary light
            : const Color(0xFFADB5BD)); // Text secondary dark

    final effectiveIndicatorColor = indicatorColor ?? effectiveLabelColor;

    return Container(
      decoration: _getContainerDecoration(theme),
      padding: padding ?? _getDefaultPadding(),
      child: TabBar(
        controller: controller,
        onTap: onTap,
        tabs: _buildTabs(),
        isScrollable: isScrollable,
        labelColor: effectiveLabelColor,
        unselectedLabelColor: effectiveUnselectedLabelColor,
        indicatorColor: effectiveIndicatorColor,
        indicatorSize: TabBarIndicatorSize.label,
        indicatorWeight: variant == TabBarVariant.thick ? 3.0 : 2.0,
        labelStyle: _getLabelStyle(true),
        unselectedLabelStyle: _getLabelStyle(false),
        labelPadding: _getLabelPadding(),
        indicator: _getCustomIndicator(effectiveIndicatorColor),
        splashFactory: NoSplash.splashFactory,
        overlayColor: WidgetStateProperty.all(Colors.transparent),
        dividerColor: Colors.transparent,
      ),
    );
  }

  List<Widget> _buildTabs() {
    return tabs.map((tabText) {
      return Tab(
        child: Container(
          padding: variant == TabBarVariant.pill
              ? const EdgeInsets.symmetric(horizontal: 16, vertical: 8)
              : const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
          decoration: variant == TabBarVariant.pill
              ? BoxDecoration(
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(
                    color: Colors.transparent,
                    width: 1,
                  ),
                )
              : null,
          child: Text(
            tabText,
            textAlign: TextAlign.center,
            overflow: TextOverflow.ellipsis,
          ),
        ),
      );
    }).toList();
  }

  BoxDecoration? _getContainerDecoration(ThemeData theme) {
    switch (variant) {
      case TabBarVariant.card:
        return BoxDecoration(
          color: theme.colorScheme.surface,
          borderRadius: BorderRadius.circular(12),
          boxShadow: [
            BoxShadow(
              color: theme.brightness == Brightness.light
                  ? const Color(0x0A000000)
                  : const Color(0x1A000000),
              blurRadius: 4,
              offset: const Offset(0, 2),
            ),
          ],
        );
      case TabBarVariant.bordered:
        return BoxDecoration(
          border: Border(
            bottom: BorderSide(
              color: theme.brightness == Brightness.light
                  ? const Color(0xFFE1E4E8)
                  : const Color(0xFF30363D),
              width: 1,
            ),
          ),
        );
      case TabBarVariant.standard:
      case TabBarVariant.thick:
      case TabBarVariant.pill:
      default:
        return null;
    }
  }

  EdgeInsetsGeometry _getDefaultPadding() {
    switch (variant) {
      case TabBarVariant.card:
        return const EdgeInsets.all(4);
      case TabBarVariant.bordered:
        return const EdgeInsets.symmetric(horizontal: 16);
      case TabBarVariant.standard:
      case TabBarVariant.thick:
      case TabBarVariant.pill:
      default:
        return const EdgeInsets.symmetric(horizontal: 16);
    }
  }

  TextStyle _getLabelStyle(bool isSelected) {
    final fontSize = variant == TabBarVariant.thick ? 16.0 : 14.0;
    final fontWeight = isSelected ? FontWeight.w600 : FontWeight.w400;

    return GoogleFonts.inter(
      fontSize: fontSize,
      fontWeight: fontWeight,
      letterSpacing: 0.1,
    );
  }

  EdgeInsetsGeometry _getLabelPadding() {
    if (isScrollable) {
      return const EdgeInsets.symmetric(horizontal: 8);
    }
    return EdgeInsets.zero;
  }

  Decoration? _getCustomIndicator(Color color) {
    switch (variant) {
      case TabBarVariant.pill:
        return BoxDecoration(
          color: color.withValues(alpha: 0.1),
          borderRadius: BorderRadius.circular(20),
          border: Border.all(
            color: color,
            width: 1,
          ),
        );
      case TabBarVariant.card:
        return BoxDecoration(
          color: color,
          borderRadius: BorderRadius.circular(8),
        );
      case TabBarVariant.standard:
      case TabBarVariant.thick:
      case TabBarVariant.bordered:
      default:
        return UnderlineTabIndicator(
          borderSide: BorderSide(
            color: color,
            width: variant == TabBarVariant.thick ? 3.0 : 2.0,
          ),
          insets: const EdgeInsets.symmetric(horizontal: 16),
        );
    }
  }

  @override
  Size get preferredSize {
    switch (variant) {
      case TabBarVariant.thick:
        return const Size.fromHeight(56);
      case TabBarVariant.card:
        return const Size.fromHeight(60);
      case TabBarVariant.standard:
      case TabBarVariant.bordered:
      case TabBarVariant.pill:
      default:
        return const Size.fromHeight(48);
    }
  }
}

/// Factory methods for common TabBar configurations in pet care app
class CustomTabBarFactory {
  /// Creates a TabBar for medical records sections
  static CustomTabBar medicalRecords({
    TabController? controller,
    Function(int)? onTap,
  }) {
    return CustomTabBar(
      tabs: const ['Overview', 'Visits', 'Vaccinations', 'Lab Results'],
      controller: controller,
      onTap: onTap,
      variant: TabBarVariant.standard,
      isScrollable: true,
    );
  }

  /// Creates a TabBar for health analytics periods
  static CustomTabBar healthAnalytics({
    TabController? controller,
    Function(int)? onTap,
  }) {
    return CustomTabBar(
      tabs: const ['Week', 'Month', '3 Months', 'Year'],
      controller: controller,
      onTap: onTap,
      variant: TabBarVariant.pill,
      isScrollable: false,
    );
  }

  /// Creates a TabBar for medication management
  static CustomTabBar medicationManagement({
    TabController? controller,
    Function(int)? onTap,
  }) {
    return CustomTabBar(
      tabs: const ['Active', 'Scheduled', 'Completed', 'All'],
      controller: controller,
      onTap: onTap,
      variant: TabBarVariant.bordered,
      isScrollable: false,
    );
  }

  /// Creates a TabBar for pet profile sections
  static CustomTabBar petProfile({
    TabController? controller,
    Function(int)? onTap,
  }) {
    return CustomTabBar(
      tabs: const ['Info', 'Health', 'Care', 'Photos'],
      controller: controller,
      onTap: onTap,
      variant: TabBarVariant.card,
      isScrollable: false,
    );
  }

  /// Creates a TabBar for appointment management
  static CustomTabBar appointments({
    TabController? controller,
    Function(int)? onTap,
  }) {
    return CustomTabBar(
      tabs: const ['Upcoming', 'Past', 'Cancelled'],
      controller: controller,
      onTap: onTap,
      variant: TabBarVariant.thick,
      isScrollable: false,
    );
  }

  /// Creates a TabBar for care task management
  static CustomTabBar careTasks({
    TabController? controller,
    Function(int)? onTap,
  }) {
    return CustomTabBar(
      tabs: const ['Today', 'This Week', 'Overdue', 'Completed'],
      controller: controller,
      onTap: onTap,
      variant: TabBarVariant.standard,
      isScrollable: true,
    );
  }
}

/// Enum defining different TabBar variants for various use cases
enum TabBarVariant {
  /// Standard underline indicator
  standard,

  /// Thicker underline indicator for emphasis
  thick,

  /// Pill-shaped tabs with background color
  pill,

  /// Card-style container with shadow
  card,

  /// Bottom border with clean separation
  bordered,
}
