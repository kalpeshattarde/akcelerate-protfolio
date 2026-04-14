import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'dart:ui';

/// Navigation item configuration for bottom bar
enum CustomBottomBarItem { create, library, search, profile }

/// Custom bottom navigation bar with glassmorphism effects and gradient styling
/// Implements thumb-optimized bottom priority navigation pattern
class CustomBottomBar extends StatefulWidget {
  /// Current selected item
  final CustomBottomBarItem selectedItem;

  /// Callback when navigation item is tapped
  final ValueChanged<CustomBottomBarItem> onItemSelected;

  /// Whether to show glassmorphism effect
  final bool useGlassmorphism;

  /// Custom elevation for the bottom bar
  final double elevation;

  const CustomBottomBar({
    super.key,
    required this.selectedItem,
    required this.onItemSelected,
    this.useGlassmorphism = true,
    this.elevation = 8.0,
  });

  @override
  State<CustomBottomBar> createState() => _CustomBottomBarState();
}

class _CustomBottomBarState extends State<CustomBottomBar>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _scaleAnimation;
  CustomBottomBarItem? _pressedItem;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 150),
      vsync: this,
    );
    _scaleAnimation = Tween<double>(begin: 1.0, end: 0.95).animate(
      CurvedAnimation(parent: _animationController, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  void _handleTapDown(CustomBottomBarItem item) {
    setState(() => _pressedItem = item);
    _animationController.forward();
  }

  void _handleTapUp(CustomBottomBarItem item) {
    _animationController.reverse();
    setState(() => _pressedItem = null);

    // Navigate after animation
    Future.delayed(const Duration(milliseconds: 150), () {
      widget.onItemSelected(item);
      _navigateToRoute(item);
    });
  }

  void _handleTapCancel() {
    _animationController.reverse();
    setState(() => _pressedItem = null);
  }

  void _navigateToRoute(CustomBottomBarItem item) {
    String route;
    switch (item) {
      case CustomBottomBarItem.create:
        route = '/create-screen';
        break;
      case CustomBottomBarItem.library:
        route = '/library-screen';
        break;
      case CustomBottomBarItem.search:
        route = '/effects-library-screen';
        break;
      case CustomBottomBarItem.profile:
        route = '/user-profile-screen';
        break;
    }

    if (ModalRoute.of(context)?.settings.name != route) {
      Navigator.pushNamed(context, route);
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Container(
      decoration: BoxDecoration(
        boxShadow: [
          BoxShadow(
            color: theme.shadowColor.withValues(alpha: 0.2),
            blurRadius: widget.elevation * 2,
            offset: Offset(0, -widget.elevation / 2),
          ),
        ],
      ),
      child: ClipRRect(
        child: widget.useGlassmorphism
            ? BackdropFilter(
                filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
                child: _buildBottomBarContent(theme, isDark),
              )
            : _buildBottomBarContent(theme, isDark),
      ),
    );
  }

  Widget _buildBottomBarContent(ThemeData theme, bool isDark) {
    return Container(
      height: 80,
      decoration: BoxDecoration(
        color: widget.useGlassmorphism
            ? (isDark
                  ? theme.colorScheme.surface.withValues(alpha: 0.8)
                  : theme.colorScheme.surface.withValues(alpha: 0.9))
            : theme.bottomNavigationBarTheme.backgroundColor,
        border: Border(
          top: BorderSide(
            color: theme.dividerColor.withValues(alpha: 0.1),
            width: 1,
          ),
        ),
      ),
      child: SafeArea(
        top: false,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 8.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _buildNavItem(
                item: CustomBottomBarItem.create,
                icon: Icons.add_circle_outline,
                selectedIcon: Icons.add_circle,
                label: 'Create',
                theme: theme,
              ),
              _buildNavItem(
                item: CustomBottomBarItem.library,
                icon: Icons.video_library_outlined,
                selectedIcon: Icons.video_library,
                label: 'Library',
                theme: theme,
              ),
              _buildNavItem(
                item: CustomBottomBarItem.search,
                icon: Icons.search_outlined,
                selectedIcon: Icons.search,
                label: 'Search',
                theme: theme,
              ),
              _buildNavItem(
                item: CustomBottomBarItem.profile,
                icon: Icons.person_outline,
                selectedIcon: Icons.person,
                label: 'Profile',
                theme: theme,
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildNavItem({
    required CustomBottomBarItem item,
    required IconData icon,
    required IconData selectedIcon,
    required String label,
    required ThemeData theme,
  }) {
    final isSelected = widget.selectedItem == item;
    final isPressed = _pressedItem == item;

    return Expanded(
      child: GestureDetector(
        onTapDown: (_) => _handleTapDown(item),
        onTapUp: (_) => _handleTapUp(item),
        onTapCancel: _handleTapCancel,
        child: AnimatedBuilder(
          animation: _scaleAnimation,
          builder: (context, child) {
            return Transform.scale(
              scale: isPressed ? _scaleAnimation.value : 1.0,
              child: child,
            );
          },
          child: Container(
            padding: const EdgeInsets.symmetric(vertical: 8),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // Icon with gradient for selected state
                AnimatedContainer(
                  duration: const Duration(milliseconds: 200),
                  curve: Curves.easeInOut,
                  padding: const EdgeInsets.all(8),
                  decoration: isSelected
                      ? BoxDecoration(
                          gradient: LinearGradient(
                            colors: [
                              theme.colorScheme.primary.withValues(alpha: 0.2),
                              theme.colorScheme.secondary.withValues(
                                alpha: 0.1,
                              ),
                            ],
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                          ),
                          borderRadius: BorderRadius.circular(12),
                        )
                      : null,
                  child: Icon(
                    isSelected ? selectedIcon : icon,
                    size: 24,
                    color: isSelected
                        ? theme.colorScheme.primary
                        : theme.bottomNavigationBarTheme.unselectedItemColor,
                  ),
                ),
                const SizedBox(height: 4),
                // Label
                Text(
                  label,
                  style: GoogleFonts.inter(
                    fontSize: 12,
                    fontWeight: isSelected ? FontWeight.w600 : FontWeight.w400,
                    color: isSelected
                        ? theme.colorScheme.primary
                        : theme.bottomNavigationBarTheme.unselectedItemColor,
                    letterSpacing: 0.5,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

/// Extension to easily use CustomBottomBar in screens
extension CustomBottomBarExtension on BuildContext {
  /// Show bottom bar with current selection
  Widget buildBottomBar({
    required CustomBottomBarItem selectedItem,
    required ValueChanged<CustomBottomBarItem> onItemSelected,
    bool useGlassmorphism = true,
    double elevation = 8.0,
  }) {
    return CustomBottomBar(
      selectedItem: selectedItem,
      onItemSelected: onItemSelected,
      useGlassmorphism: useGlassmorphism,
      elevation: elevation,
    );
  }
}
