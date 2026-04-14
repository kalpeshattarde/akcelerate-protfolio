import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

/// Navigation item configuration for bottom bar
class CustomBottomBarItem {
  final String label;
  final IconData icon;
  final IconData? activeIcon;
  final String route;
  final int? badgeCount;

  const CustomBottomBarItem({
    required this.label,
    required this.icon,
    this.activeIcon,
    required this.route,
    this.badgeCount,
  });
}

/// Custom bottom navigation bar for pregnancy tracking app
/// Implements thumb-reachable primary navigation with 48dp touch targets
/// Follows Contemporary Maternal Minimalism design principles
class CustomBottomBar extends StatelessWidget {
  final int currentIndex;
  final Function(int)? onTap;
  final List<CustomBottomBarItem>? items;

  const CustomBottomBar({
    super.key,
    required this.currentIndex,
    this.onTap,
    this.items,
  });

  /// Default navigation items based on Mobile Navigation Hierarchy
  static List<CustomBottomBarItem> get defaultItems => [
        CustomBottomBarItem(
          label: 'Dashboard',
          icon: Icons.home_outlined,
          activeIcon: Icons.home_rounded,
          route: '/main-dashboard',
        ),
        CustomBottomBarItem(
          label: 'Baby',
          icon: Icons.child_care_outlined,
          activeIcon: Icons.child_care_rounded,
          route: '/baby-growth-tracker',
        ),
        CustomBottomBarItem(
          label: 'Health',
          icon: Icons.favorite_outline,
          activeIcon: Icons.favorite_rounded,
          route: '/nutrition-health-reports',
        ),
        CustomBottomBarItem(
          label: 'More',
          icon: Icons.menu_rounded,
          activeIcon: Icons.menu_rounded,
          route: '/wellness-tips-content',
        ),
      ];

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final navigationItems = items ?? defaultItems;

    return Container(
      decoration: BoxDecoration(
        color: theme.bottomNavigationBarTheme.backgroundColor ??
            theme.colorScheme.surface,
        boxShadow: [
          BoxShadow(
            color: theme.colorScheme.shadow.withValues(alpha: 0.08),
            blurRadius: 8.0,
            offset: const Offset(0, -2),
          ),
        ],
      ),
      child: SafeArea(
        child: Container(
          height: 64,
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: List.generate(
              navigationItems.length,
              (index) => _buildNavigationItem(
                context,
                navigationItems[index],
                index,
                currentIndex == index,
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildNavigationItem(
    BuildContext context,
    CustomBottomBarItem item,
    int index,
    bool isSelected,
  ) {
    final theme = Theme.of(context);
    final selectedColor = theme.bottomNavigationBarTheme.selectedItemColor ??
        theme.colorScheme.primary;
    final unselectedColor =
        theme.bottomNavigationBarTheme.unselectedItemColor ??
            theme.colorScheme.onSurface.withValues(alpha: 0.6);

    return Expanded(
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: () {
            // Provide haptic feedback for better user experience
            HapticFeedback.lightImpact();

            // Call the onTap callback if provided
            if (onTap != null) {
              onTap!(index);
            } else {
              // Default navigation behavior - always navigate even if same tab
              Navigator.pushReplacementNamed(context, item.route);
            }
          },
          borderRadius: BorderRadius.circular(12.0),
          child: Container(
            padding: const EdgeInsets.symmetric(vertical: 4),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // Icon with badge support
                Stack(
                  clipBehavior: Clip.none,
                  children: [
                    AnimatedContainer(
                      duration: const Duration(milliseconds: 200),
                      curve: Curves.easeOut,
                      padding: const EdgeInsets.all(4),
                      decoration: BoxDecoration(
                        color: isSelected
                            ? selectedColor.withValues(alpha: 0.12)
                            : Colors.transparent,
                        borderRadius: BorderRadius.circular(12.0),
                      ),
                      child: Icon(
                        isSelected ? (item.activeIcon ?? item.icon) : item.icon,
                        size: 24,
                        color: isSelected ? selectedColor : unselectedColor,
                      ),
                    ),
                    // Badge for notifications (e.g., appointment reminders)
                    if (item.badgeCount != null && item.badgeCount! > 0)
                      Positioned(
                        right: 0,
                        top: 0,
                        child: Container(
                          padding: const EdgeInsets.all(4),
                          decoration: BoxDecoration(
                            color: theme.colorScheme.error,
                            shape: BoxShape.circle,
                            border: Border.all(
                              color: theme.bottomNavigationBarTheme
                                      .backgroundColor ??
                                  theme.colorScheme.surface,
                              width: 1.5,
                            ),
                          ),
                          constraints: const BoxConstraints(
                            minWidth: 16,
                            minHeight: 16,
                          ),
                          child: Text(
                            item.badgeCount! > 9 ? '9+' : '${item.badgeCount}',
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
                ),
                const SizedBox(height: 4),
                // Label with smooth transition
                AnimatedDefaultTextStyle(
                  duration: const Duration(milliseconds: 200),
                  curve: Curves.easeOut,
                  style: (isSelected
                          ? theme.bottomNavigationBarTheme.selectedLabelStyle
                          : theme
                              .bottomNavigationBarTheme.unselectedLabelStyle) ??
                      TextStyle(
                        fontSize: 12,
                        fontWeight:
                            isSelected ? FontWeight.w600 : FontWeight.w400,
                        color: isSelected ? selectedColor : unselectedColor,
                      ),
                  child: Text(
                    item.label,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
