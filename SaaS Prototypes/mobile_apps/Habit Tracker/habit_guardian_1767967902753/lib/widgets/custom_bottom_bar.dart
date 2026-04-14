import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';

/// Custom BottomNavigationBar implementing Contemplative Minimalism design
/// Provides sanctuary-like navigation with breathing animations and mindful interactions
class CustomBottomBar extends StatefulWidget {
  final int currentIndex;
  final Function(int) onTap;
  final BottomBarVariant variant;
  final bool showLabels;

  const CustomBottomBar({
    super.key,
    required this.currentIndex,
    required this.onTap,
    this.variant = BottomBarVariant.primary,
    this.showLabels = true,
  });

  @override
  State<CustomBottomBar> createState() => _CustomBottomBarState();
}

class _CustomBottomBarState extends State<CustomBottomBar>
    with TickerProviderStateMixin {
  late AnimationController _breathingController;
  late Animation<double> _breathingAnimation;

  // Navigation items with routes and icons
  final List<BottomBarItem> _items = [
    BottomBarItem(
      icon: Icons.home_rounded,
      activeIcon: Icons.home_rounded,
      label: 'Home',
      route: '/habit-dashboard',
    ),
    BottomBarItem(
      icon: Icons.add_circle_outline_rounded,
      activeIcon: Icons.add_circle_rounded,
      label: 'Create',
      route: '/habit-creation',
    ),
    BottomBarItem(
      icon: Icons.analytics_outlined,
      activeIcon: Icons.analytics_rounded,
      label: 'Analytics',
      route: '/progress-analytics',
    ),
    BottomBarItem(
      icon: Icons.person_outline_rounded,
      activeIcon: Icons.person_rounded,
      label: 'Profile',
      route: '/user-profile',
    ),
  ];

  @override
  void initState() {
    super.initState();
    _initializeBreathingAnimation();
  }

  /// Initialize breathing animation for contemplative experience
  void _initializeBreathingAnimation() {
    _breathingController = AnimationController(
      duration: const Duration(seconds: 4),
      vsync: this,
    );

    _breathingAnimation = Tween<double>(
      begin: 0.95,
      end: 1.05,
    ).animate(CurvedAnimation(
      parent: _breathingController,
      curve: Curves.easeInOut,
    ));

    // Start breathing animation
    _breathingController.repeat(reverse: true);
  }

  @override
  void dispose() {
    _breathingController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Container(
      decoration: BoxDecoration(
        color: _getBackgroundColor(isDark),
        boxShadow: [
          BoxShadow(
            color: isDark
                ? Colors.white.withAlpha(13)
                : Colors.black.withAlpha(26),
            blurRadius: 8,
            offset: const Offset(0, -2),
          ),
        ],
      ),
      child: SafeArea(
        child: Container(
          height: 80,
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: _items.asMap().entries.map((entry) {
              final index = entry.key;
              final item = entry.value;
              final isSelected = index == widget.currentIndex;

              return _buildNavigationItem(
                context,
                item,
                index,
                isSelected,
                isDark,
              );
            }).toList(),
          ),
        ),
      ),
    );
  }

  /// Builds individual navigation item with breathing animation
  Widget _buildNavigationItem(
    BuildContext context,
    BottomBarItem item,
    int index,
    bool isSelected,
    bool isDark,
  ) {
    return Expanded(
      child: AnimatedBuilder(
        animation: _breathingAnimation,
        builder: (context, child) {
          return Transform.scale(
            scale: isSelected ? _breathingAnimation.value : 1.0,
            child: Material(
              color: Colors.transparent,
              child: InkWell(
                onTap: () => _handleTap(context, index, item.route),
                borderRadius: BorderRadius.circular(16),
                splashColor: _getAccentColor(isDark).withAlpha(26),
                highlightColor: _getAccentColor(isDark).withAlpha(13),
                child: Container(
                  height: 64,
                  padding:
                      const EdgeInsets.symmetric(horizontal: 4, vertical: 8),
                  child: Column(
                    mainAxisSize: MainAxisSize.max,
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      // Icon with perfect centering
                      Container(
                        width: 32,
                        height: 32,
                        decoration: isSelected
                            ? BoxDecoration(
                                color: _getAccentColor(isDark).withAlpha(26),
                                borderRadius: BorderRadius.circular(12),
                              )
                            : null,
                        child: Center(
                          child: Icon(
                            isSelected ? item.activeIcon : item.icon,
                            size: 24,
                            color: isSelected
                                ? _getAccentColor(isDark)
                                : _getInactiveColor(isDark),
                          ),
                        ),
                      ),

                      // Label with perfect centering and spacing
                      if (widget.showLabels) ...[
                        const SizedBox(height: 4),
                        Flexible(
                          child: Text(
                            item.label,
                            style: GoogleFonts.inter(
                              fontSize: 11,
                              fontWeight: isSelected
                                  ? FontWeight.w500
                                  : FontWeight.w400,
                              color: isSelected
                                  ? _getAccentColor(isDark)
                                  : _getInactiveColor(isDark),
                              letterSpacing: 0.3,
                              height: 1.2,
                            ),
                            textAlign: TextAlign.center,
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                      ],
                    ],
                  ),
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  /// Handles tap with haptic feedback and navigation
  void _handleTap(BuildContext context, int index, String route) {
    // Contextual haptic feedback
    HapticFeedback.lightImpact();

    // Update current index through callback
    widget.onTap(index);

    // Note: Navigation is now handled by AppScaffold
    // The onTap callback will trigger navigation in the parent
  }

  /// Gets background color based on theme and variant
  Color _getBackgroundColor(bool isDark) {
    switch (widget.variant) {
      case BottomBarVariant.primary:
        return isDark ? const Color(0xFF2A2A2A) : const Color(0xFFF8F6F2);
      case BottomBarVariant.surface:
        return isDark ? const Color(0xFF1A1A1A) : const Color(0xFFFEFCF8);
      case BottomBarVariant.transparent:
        return Colors.transparent;
    }
  }

  /// Gets accent color for selected items
  Color _getAccentColor(bool isDark) {
    return isDark ? const Color(0xFF4A7C59) : const Color(0xFF2D5A3D);
  }

  /// Gets inactive color for unselected items
  Color _getInactiveColor(bool isDark) {
    return isDark ? const Color(0xFFB8B8B8) : const Color(0xFF6B6B6B);
  }
}

/// Data class for bottom navigation bar items
class BottomBarItem {
  final IconData icon;
  final IconData activeIcon;
  final String label;
  final String route;

  const BottomBarItem({
    required this.icon,
    required this.activeIcon,
    required this.label,
    required this.route,
  });
}

/// Enum defining different BottomBar variants
enum BottomBarVariant {
  /// Primary variant with surface background
  primary,

  /// Surface variant with main background
  surface,

  /// Transparent variant for overlay contexts
  transparent,
}
