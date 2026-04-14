import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

/// Navigation item configuration for the bottom bar
class CustomBottomBarItem {
  final String label;
  final IconData icon;
  final IconData activeIcon;
  final String route;

  const CustomBottomBarItem({
    required this.label,
    required this.icon,
    required this.activeIcon,
    required this.route,
  });
}

/// Custom bottom navigation bar optimized for thumb reach during workouts
/// Implements Bottom Tab Navigation pattern with haptic feedback
class CustomBottomBar extends StatelessWidget {
  /// Current active route
  final String currentRoute;

  /// Callback when navigation item is tapped
  final Function(String route)? onNavigate;

  /// Elevation of the bottom bar
  final double elevation;

  /// Whether to show labels
  final bool showLabels;

  const CustomBottomBar({
    super.key,
    required this.currentRoute,
    this.onNavigate,
    this.elevation = 8.0,
    this.showLabels = true,
  });

  /// Navigation items mapped from Mobile Navigation Hierarchy
  static const List<CustomBottomBarItem> _navigationItems = [
    CustomBottomBarItem(
      label: 'Today',
      icon: Icons.home_outlined,
      activeIcon: Icons.home_rounded,
      route: '/home-today-screen',
    ),
    CustomBottomBarItem(
      label: 'Workouts',
      icon: Icons.fitness_center_outlined,
      activeIcon: Icons.fitness_center_rounded,
      route: '/workouts-library-screen',
    ),
    CustomBottomBarItem(
      label: 'Programs',
      icon: Icons.calendar_today_outlined,
      activeIcon: Icons.calendar_today_rounded,
      route: '/programs-screen',
    ),
    CustomBottomBarItem(
      label: 'Progress',
      icon: Icons.insights_outlined,
      activeIcon: Icons.insights_rounded,
      route: '/progress-tracking-screen',
    ),
    CustomBottomBarItem(
      label: 'Profile',
      icon: Icons.person_outline_rounded,
      activeIcon: Icons.person_rounded,
      route: '/profile-settings-screen',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Container(
      decoration: BoxDecoration(
        color: colorScheme.surface,
        boxShadow: [
          BoxShadow(
            color: colorScheme.shadow.withValues(alpha: 0.08),
            blurRadius: elevation,
            offset: const Offset(0, -2),
          ),
        ],
      ),
      child: SafeArea(
        top: false,
        child: Container(
          height: 64,
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children:
                _navigationItems.map((item) {
                  final isActive = currentRoute == item.route;
                  return _buildNavigationItem(
                    context: context,
                    item: item,
                    isActive: isActive,
                  );
                }).toList(),
          ),
        ),
      ),
    );
  }

  Widget _buildNavigationItem({
    required BuildContext context,
    required CustomBottomBarItem item,
    required bool isActive,
  }) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    // Color based on active state
    final color = isActive ? colorScheme.primary : colorScheme.onSurfaceVariant;

    return Expanded(
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: () => _handleNavigation(context, item.route),
          borderRadius: BorderRadius.circular(12),
          child: Container(
            padding: const EdgeInsets.symmetric(vertical: 4),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // Icon with smooth transition
                AnimatedSwitcher(
                  duration: const Duration(milliseconds: 200),
                  transitionBuilder: (child, animation) {
                    return ScaleTransition(scale: animation, child: child);
                  },
                  child: Icon(
                    isActive ? item.activeIcon : item.icon,
                    key: ValueKey(isActive),
                    color: color,
                    size: 24,
                  ),
                ),

                // Label with fade transition
                if (showLabels) ...[
                  const SizedBox(height: 4),
                  AnimatedDefaultTextStyle(
                    duration: const Duration(milliseconds: 200),
                    style: theme.textTheme.labelSmall!.copyWith(
                      color: color,
                      fontWeight: isActive ? FontWeight.w600 : FontWeight.w400,
                    ),
                    child: Text(
                      item.label,
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
  }

  void _handleNavigation(BuildContext context, String route) {
    // Provide haptic feedback for navigation
    HapticFeedback.lightImpact();

    // Don't navigate if already on the route
    if (currentRoute == route) return;

    // Use callback if provided, otherwise use Navigator
    if (onNavigate != null) {
      onNavigate!(route);
    } else {
      // Fallback to pushReplacementNamed if no callback provided
      Navigator.pushReplacementNamed(context, route);
    }
  }
}

/// Variant of CustomBottomBar with floating style
class CustomFloatingBottomBar extends StatelessWidget {
  /// Current active route
  final String currentRoute;

  /// Callback when navigation item is tapped
  final Function(String route)? onNavigate;

  /// Margin around the floating bar
  final EdgeInsets margin;

  const CustomFloatingBottomBar({
    super.key,
    required this.currentRoute,
    this.onNavigate,
    this.margin = const EdgeInsets.all(16),
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Padding(
      padding: margin,
      child: Container(
        height: 64,
        decoration: BoxDecoration(
          color: colorScheme.surface,
          borderRadius: BorderRadius.circular(32),
          boxShadow: [
            BoxShadow(
              color: colorScheme.shadow.withValues(alpha: 0.12),
              blurRadius: 16,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: CustomBottomBar(
          currentRoute: currentRoute,
          onNavigate: onNavigate,
          elevation: 0,
          showLabels: false,
        ),
      ),
    );
  }
}
