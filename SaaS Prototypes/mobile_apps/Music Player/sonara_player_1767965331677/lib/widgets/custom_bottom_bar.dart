import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

/// Navigation item configuration for the curved bottom bar
class CustomBottomBarItem {
  final IconData icon;
  final IconData activeIcon;
  final String label;
  final String route;

  const CustomBottomBarItem({
    required this.icon,
    required this.activeIcon,
    required this.label,
    required this.route,
  });
}

/// Custom curved bottom navigation bar for music streaming app
/// Implements organic curved design with thumb-optimized navigation
class CustomBottomBar extends StatefulWidget {
  final int currentIndex;
  final Function(int) onTap;
  final Color? backgroundColor;
  final Color? selectedItemColor;
  final Color? unselectedItemColor;
  final double height;
  final double curveHeight;

  const CustomBottomBar({
    Key? key,
    required this.currentIndex,
    required this.onTap,
    this.backgroundColor,
    this.selectedItemColor,
    this.unselectedItemColor,
    this.height = 70.0,
    this.curveHeight = 20.0,
  }) : super(key: key);

  @override
  State<CustomBottomBar> createState() => _CustomBottomBarState();
}

class _CustomBottomBarState extends State<CustomBottomBar>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _animation;
  int _previousIndex = 0;

  // Navigation items mapped from Mobile Navigation Hierarchy
  static const List<CustomBottomBarItem> _navItems = [
    CustomBottomBarItem(
      icon: Icons.home_outlined,
      activeIcon: Icons.home_rounded,
      label: 'Home',
      route: '/home-dashboard',
    ),
    CustomBottomBarItem(
      icon: Icons.explore,
      activeIcon: Icons.explore,
      label: 'Explore',
      route: '/search-and-discovery',
    ),
    CustomBottomBarItem(
      icon: Icons.library_music_outlined,
      activeIcon: Icons.library_music,
      label: 'Playlists',
      route: '/playlist-management',
    ),
    CustomBottomBarItem(
      icon: Icons.person_outline_rounded,
      activeIcon: Icons.person_rounded,
      label: 'Profile',
      route: '/user-profile-and-settings',
    ),
  ];

  @override
  void initState() {
    super.initState();
    _previousIndex = widget.currentIndex;
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 250),
      vsync: this,
    );
    _animation = CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeInOutCubic,
    );
    _animationController.forward();
  }

  @override
  void didUpdateWidget(CustomBottomBar oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.currentIndex != widget.currentIndex) {
      _previousIndex = oldWidget.currentIndex;
      _animationController.reset();
      _animationController.forward();
    }
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    // Dark charcoal with slight olive tint
    final backgroundColor =
        widget.backgroundColor ??
        const Color(0xFF252B21);
    final selectedColor =
        widget.selectedItemColor ??
        theme.bottomNavigationBarTheme.selectedItemColor ??
        const Color(0xFFB8D456);
    final unselectedColor =
        widget.unselectedItemColor ??
        theme.bottomNavigationBarTheme.unselectedItemColor ??
        const Color(0xFF8A8A8A);

    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 0, 20, 20),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(32),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 15, sigmaY: 15),
          child: Container(
            height: widget.height + MediaQuery.of(context).padding.bottom,
            decoration: BoxDecoration(
              color: backgroundColor.withValues(alpha: 0.9),
              borderRadius: BorderRadius.circular(32),
              border: Border.all(
                color: Colors.white.withValues(alpha: 0.05),
                width: 1,
              ),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.3),
                  blurRadius: 20,
                  offset: const Offset(0, -4),
                  spreadRadius: 0,
                ),
              ],
            ),
            child: SafeArea(
              top: false,
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 8.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: List.generate(_navItems.length, (index) {
                    final item = _navItems[index];
                    final isSelected = index == widget.currentIndex;

                    return Expanded(
                      child: _BottomBarItemWidget(
                        item: item,
                        isSelected: isSelected,
                        selectedColor: selectedColor,
                        unselectedColor: unselectedColor,
                        animation: _animation,
                        onTap: () {
                          widget.onTap(index);
                          // Navigation is handled by parent widget (MainNavigation)
                        },
                      ),
                    );
                  }),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

/// Individual bottom bar item widget with animation support
class _BottomBarItemWidget extends StatelessWidget {
  final CustomBottomBarItem item;
  final bool isSelected;
  final Color selectedColor;
  final Color unselectedColor;
  final Animation<double> animation;
  final VoidCallback onTap;

  const _BottomBarItemWidget({
    required this.item,
    required this.isSelected,
    required this.selectedColor,
    required this.unselectedColor,
    required this.animation,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(12),
      child: Stack(
        alignment: Alignment.center,
        children: [
          // Green glow effect behind active icon
          if (isSelected)
            Positioned(
              top: 5,
              child: Container(
                width: 50,
                height: 50,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  boxShadow: [
                    BoxShadow(
                      color: selectedColor.withValues(alpha: 0.4),
                      blurRadius: 20,
                      spreadRadius: 5,
                    ),
                  ],
                ),
              ),
            ),
          Container(
            padding: const EdgeInsets.symmetric(vertical: 8.0),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                AnimatedBuilder(
                  animation: animation,
                  builder: (context, child) {
                    return Transform.scale(
                      scale: isSelected ? 1.0 + (animation.value * 0.1) : 1.0,
                      child: Icon(
                        isSelected ? item.activeIcon : item.icon,
                        color: isSelected ? selectedColor : unselectedColor,
                        size: 26,
                      ),
                    );
                  },
                ),
                const SizedBox(height: 4),
                AnimatedDefaultTextStyle(
                  duration: const Duration(milliseconds: 200),
                  style: GoogleFonts.inter(
                    fontSize: 11,
                    fontWeight: isSelected ? FontWeight.w500 : FontWeight.w400,
                    color: isSelected ? selectedColor : unselectedColor,
                    letterSpacing: 0.3,
                  ),
                  child: Text(
                    item.label,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
                const SizedBox(height: 4),
                AnimatedContainer(
                  duration: const Duration(milliseconds: 200),
                  height: isSelected ? 2 : 0,
                  width: isSelected ? 20 : 0,
                  decoration: BoxDecoration(
                    color: isSelected ? selectedColor : Colors.transparent,
                    borderRadius: BorderRadius.circular(1),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

/// Custom clipper for curved bottom bar design
class _CurvedBottomBarClipper extends CustomClipper<Path> {
  final double curveHeight;
  final int itemCount;
  final int currentIndex;

  _CurvedBottomBarClipper({
    required this.curveHeight,
    required this.itemCount,
    required this.currentIndex,
  });

  @override
  Path getClip(Size size) {
    final path = Path();
    final itemWidth = size.width / itemCount;
    final curveStartX = (currentIndex * itemWidth) + (itemWidth * 0.2);
    final curveEndX = (currentIndex * itemWidth) + (itemWidth * 0.8);
    final curveMidX = (curveStartX + curveEndX) / 2;

    // Start from top-left
    path.lineTo(0, curveHeight);

    // Draw curve for selected item
    if (currentIndex >= 0 && currentIndex < itemCount) {
      path.lineTo(curveStartX, curveHeight);

      // Smooth curve using quadratic bezier
      path.quadraticBezierTo(curveMidX, 0, curveEndX, curveHeight);
    }

    // Complete the path
    path.lineTo(size.width, curveHeight);
    path.lineTo(size.width, size.height);
    path.lineTo(0, size.height);
    path.close();

    return path;
  }

  @override
  bool shouldReclip(_CurvedBottomBarClipper oldClipper) {
    return oldClipper.currentIndex != currentIndex ||
        oldClipper.curveHeight != curveHeight ||
        oldClipper.itemCount != itemCount;
  }
}
