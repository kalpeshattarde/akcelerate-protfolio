import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

/// Tab item configuration for custom tab bar
class CustomTabItem {
  final String label;
  final IconData? icon;
  final Widget? customWidget;

  const CustomTabItem({required this.label, this.icon, this.customWidget});
}

/// Variants for the custom tab bar
enum CustomTabBarVariant {
  /// Standard horizontal tabs with text labels
  standard,

  /// Tabs with icons and text labels
  iconWithLabel,

  /// Icon-only tabs
  iconOnly,

  /// Scrollable tabs for many items
  scrollable,

  /// Pill-style tabs with rounded background
  pill,
}

/// Custom tab bar for music streaming application
/// Implements horizontal content navigation with smooth transitions
class CustomTabBar extends StatefulWidget implements PreferredSizeWidget {
  final List<CustomTabItem> tabs;
  final CustomTabBarVariant variant;
  final TabController? controller;
  final Function(int)? onTap;
  final Color? backgroundColor;
  final Color? selectedColor;
  final Color? unselectedColor;
  final Color? indicatorColor;
  final double height;
  final EdgeInsetsGeometry? padding;
  final bool isScrollable;

  const CustomTabBar({
    Key? key,
    required this.tabs,
    this.variant = CustomTabBarVariant.standard,
    this.controller,
    this.onTap,
    this.backgroundColor,
    this.selectedColor,
    this.unselectedColor,
    this.indicatorColor,
    this.height = 48.0,
    this.padding,
    this.isScrollable = false,
  }) : super(key: key);

  @override
  Size get preferredSize => Size.fromHeight(height);

  @override
  State<CustomTabBar> createState() => _CustomTabBarState();
}

class _CustomTabBarState extends State<CustomTabBar> {
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final bgColor =
        widget.backgroundColor ??
        theme.appBarTheme.backgroundColor ??
        const Color(0xFF121212);
    final selectedColor =
        widget.selectedColor ??
        theme.tabBarTheme.labelColor ??
        const Color(0xFFB8D456);
    final unselectedColor =
        widget.unselectedColor ??
        theme.tabBarTheme.unselectedLabelColor ??
        const Color(0xFFB3B3B3);
    final indicatorColor = widget.indicatorColor ?? selectedColor;

    switch (widget.variant) {
      case CustomTabBarVariant.pill:
        return _buildPillTabBar(
          context,
          bgColor,
          selectedColor,
          unselectedColor,
        );
      case CustomTabBarVariant.iconOnly:
        return _buildIconOnlyTabBar(
          context,
          bgColor,
          selectedColor,
          unselectedColor,
          indicatorColor,
        );
      case CustomTabBarVariant.iconWithLabel:
        return _buildIconWithLabelTabBar(
          context,
          bgColor,
          selectedColor,
          unselectedColor,
          indicatorColor,
        );
      case CustomTabBarVariant.scrollable:
        return _buildScrollableTabBar(
          context,
          bgColor,
          selectedColor,
          unselectedColor,
          indicatorColor,
        );
      case CustomTabBarVariant.standard:
      default:
        return _buildStandardTabBar(
          context,
          bgColor,
          selectedColor,
          unselectedColor,
          indicatorColor,
        );
    }
  }

  Widget _buildStandardTabBar(
    BuildContext context,
    Color bgColor,
    Color selectedColor,
    Color unselectedColor,
    Color indicatorColor,
  ) {
    return Container(
      height: widget.height,
      color: bgColor,
      padding: widget.padding,
      child: TabBar(
        controller: widget.controller,
        onTap: widget.onTap,
        isScrollable: widget.isScrollable,
        labelColor: selectedColor,
        unselectedLabelColor: unselectedColor,
        indicatorColor: indicatorColor,
        indicatorWeight: 3,
        indicatorSize: TabBarIndicatorSize.label,
        labelStyle: GoogleFonts.inter(
          fontSize: 14,
          fontWeight: FontWeight.w600,
          letterSpacing: 0.1,
        ),
        unselectedLabelStyle: GoogleFonts.inter(
          fontSize: 14,
          fontWeight: FontWeight.w400,
          letterSpacing: 0.1,
        ),
        tabs: widget.tabs.map((tab) {
          return Tab(text: tab.label, child: tab.customWidget);
        }).toList(),
      ),
    );
  }

  Widget _buildIconWithLabelTabBar(
    BuildContext context,
    Color bgColor,
    Color selectedColor,
    Color unselectedColor,
    Color indicatorColor,
  ) {
    return Container(
      height: widget.height + 20,
      color: bgColor,
      padding: widget.padding,
      child: TabBar(
        controller: widget.controller,
        onTap: widget.onTap,
        isScrollable: widget.isScrollable,
        labelColor: selectedColor,
        unselectedLabelColor: unselectedColor,
        indicatorColor: indicatorColor,
        indicatorWeight: 3,
        indicatorSize: TabBarIndicatorSize.label,
        labelStyle: GoogleFonts.inter(
          fontSize: 12,
          fontWeight: FontWeight.w500,
          letterSpacing: 0.4,
        ),
        unselectedLabelStyle: GoogleFonts.inter(
          fontSize: 12,
          fontWeight: FontWeight.w400,
          letterSpacing: 0.4,
        ),
        tabs: widget.tabs.map((tab) {
          return Tab(
            icon: tab.icon != null ? Icon(tab.icon, size: 24) : null,
            text: tab.label,
            child: tab.customWidget,
          );
        }).toList(),
      ),
    );
  }

  Widget _buildIconOnlyTabBar(
    BuildContext context,
    Color bgColor,
    Color selectedColor,
    Color unselectedColor,
    Color indicatorColor,
  ) {
    return Container(
      height: widget.height,
      color: bgColor,
      padding: widget.padding,
      child: TabBar(
        controller: widget.controller,
        onTap: widget.onTap,
        isScrollable: widget.isScrollable,
        labelColor: selectedColor,
        unselectedLabelColor: unselectedColor,
        indicatorColor: indicatorColor,
        indicatorWeight: 3,
        indicatorSize: TabBarIndicatorSize.label,
        tabs: widget.tabs.map((tab) {
          return Tab(
            icon: tab.icon != null ? Icon(tab.icon, size: 26) : null,
            child: tab.customWidget,
          );
        }).toList(),
      ),
    );
  }

  Widget _buildScrollableTabBar(
    BuildContext context,
    Color bgColor,
    Color selectedColor,
    Color unselectedColor,
    Color indicatorColor,
  ) {
    return Container(
      height: widget.height,
      color: bgColor,
      padding: widget.padding,
      child: TabBar(
        controller: widget.controller,
        onTap: widget.onTap,
        isScrollable: true,
        labelColor: selectedColor,
        unselectedLabelColor: unselectedColor,
        indicatorColor: indicatorColor,
        indicatorWeight: 3,
        indicatorSize: TabBarIndicatorSize.label,
        labelPadding: const EdgeInsets.symmetric(horizontal: 20),
        labelStyle: GoogleFonts.inter(
          fontSize: 14,
          fontWeight: FontWeight.w600,
          letterSpacing: 0.1,
        ),
        unselectedLabelStyle: GoogleFonts.inter(
          fontSize: 14,
          fontWeight: FontWeight.w400,
          letterSpacing: 0.1,
        ),
        tabs: widget.tabs.map((tab) {
          return Tab(text: tab.label, child: tab.customWidget);
        }).toList(),
      ),
    );
  }

  Widget _buildPillTabBar(
    BuildContext context,
    Color bgColor,
    Color selectedColor,
    Color unselectedColor,
  ) {
    return Container(
      height: widget.height,
      color: bgColor,
      padding:
          widget.padding ??
          const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        itemCount: widget.tabs.length,
        separatorBuilder: (context, index) => const SizedBox(width: 8),
        itemBuilder: (context, index) {
          final tab = widget.tabs[index];
          final isSelected = widget.controller?.index == index;

          return _PillTab(
            label: tab.label,
            icon: tab.icon,
            isSelected: isSelected,
            selectedColor: selectedColor,
            unselectedColor: unselectedColor,
            onTap: () {
              widget.controller?.animateTo(index);
              widget.onTap?.call(index);
            },
          );
        },
      ),
    );
  }
}

/// Individual pill-style tab widget
class _PillTab extends StatelessWidget {
  final String label;
  final IconData? icon;
  final bool isSelected;
  final Color selectedColor;
  final Color unselectedColor;
  final VoidCallback onTap;

  const _PillTab({
    required this.label,
    this.icon,
    required this.isSelected,
    required this.selectedColor,
    required this.unselectedColor,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        curve: Curves.easeOut,
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
        decoration: BoxDecoration(
          color: isSelected
              ? selectedColor.withValues(alpha: 0.2)
              : const Color(0xFF1E1E1E),
          borderRadius: BorderRadius.circular(20),
          border: Border.all(
            color: isSelected ? selectedColor : const Color(0xFF333333),
            width: 1,
          ),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (icon != null) ...[
              Icon(
                icon,
                size: 18,
                color: isSelected ? selectedColor : unselectedColor,
              ),
              const SizedBox(width: 6),
            ],
            Text(
              label,
              style: GoogleFonts.inter(
                fontSize: 13,
                fontWeight: isSelected ? FontWeight.w600 : FontWeight.w400,
                color: isSelected ? selectedColor : unselectedColor,
                letterSpacing: 0.1,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
