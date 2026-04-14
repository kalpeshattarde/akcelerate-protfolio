import 'package:flutter/material.dart';

import '../core/app_export.dart';

class MainLayoutWrapper extends StatefulWidget {
  final Widget child;
  final int currentIndex;

  const MainLayoutWrapper({
    Key? key,
    required this.child,
    required this.currentIndex,
  }) : super(key: key);

  @override
  State<MainLayoutWrapper> createState() => _MainLayoutWrapperState();
}

class _MainLayoutWrapperState extends State<MainLayoutWrapper> {
  void _onBottomNavTapped(int index) {
    // Prevent navigation if already on the selected screen
    if (index == widget.currentIndex) return;

    switch (index) {
      case 0:
        Navigator.pushReplacementNamed(context, '/meal-planning-dashboard');
        break;
      case 1:
        Navigator.pushReplacementNamed(context, '/recipe-discovery');
        break;
      case 2:
        Navigator.pushReplacementNamed(context, '/meal-planning-calendar');
        break;
      case 3:
        Navigator.pushReplacementNamed(context, '/grocery-list');
        break;
      case 4:
        Navigator.pushReplacementNamed(context, '/user-profile');
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      body: widget.child,
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          boxShadow: [
            BoxShadow(
              color: (isDarkMode ? Colors.black : Colors.grey).withAlpha(26),
              blurRadius: 8,
              offset: const Offset(0, -2),
            ),
          ],
        ),
        child: BottomNavigationBar(
          currentIndex: widget.currentIndex,
          onTap: _onBottomNavTapped,
          type: BottomNavigationBarType.fixed,
          elevation: 0,
          backgroundColor:
              isDarkMode ? AppTheme.surfaceDark : AppTheme.surfaceLight,
          selectedItemColor:
              isDarkMode ? AppTheme.primaryDark : AppTheme.primaryLight,
          unselectedItemColor: isDarkMode
              ? AppTheme.textSecondaryDark
              : AppTheme.textSecondaryLight,
          selectedLabelStyle: Theme.of(context).textTheme.labelSmall?.copyWith(
                fontWeight: FontWeight.w600,
              ),
          unselectedLabelStyle: Theme.of(context).textTheme.labelSmall,
          items: [
            BottomNavigationBarItem(
              icon: CustomIconWidget(
                iconName: 'dashboard',
                color: widget.currentIndex == 0
                    ? (isDarkMode
                        ? AppTheme.primaryDark
                        : AppTheme.primaryLight)
                    : (isDarkMode
                        ? AppTheme.textSecondaryDark
                        : AppTheme.textSecondaryLight),
                size: 24,
              ),
              label: 'Dashboard',
            ),
            BottomNavigationBarItem(
              icon: CustomIconWidget(
                iconName: 'restaurant_menu',
                color: widget.currentIndex == 1
                    ? (isDarkMode
                        ? AppTheme.primaryDark
                        : AppTheme.primaryLight)
                    : (isDarkMode
                        ? AppTheme.textSecondaryDark
                        : AppTheme.textSecondaryLight),
                size: 24,
              ),
              label: 'Recipes',
            ),
            BottomNavigationBarItem(
              icon: CustomIconWidget(
                iconName: 'calendar_today',
                color: widget.currentIndex == 2
                    ? (isDarkMode
                        ? AppTheme.primaryDark
                        : AppTheme.primaryLight)
                    : (isDarkMode
                        ? AppTheme.textSecondaryDark
                        : AppTheme.textSecondaryLight),
                size: 24,
              ),
              label: 'Plan',
            ),
            BottomNavigationBarItem(
              icon: CustomIconWidget(
                iconName: 'shopping_cart',
                color: widget.currentIndex == 3
                    ? (isDarkMode
                        ? AppTheme.primaryDark
                        : AppTheme.primaryLight)
                    : (isDarkMode
                        ? AppTheme.textSecondaryDark
                        : AppTheme.textSecondaryLight),
                size: 24,
              ),
              label: 'Grocery',
            ),
            BottomNavigationBarItem(
              icon: Container(
                width: 24,
                height: 24,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  border: Border.all(
                    color: widget.currentIndex == 4
                        ? (isDarkMode
                            ? AppTheme.primaryDark
                            : AppTheme.primaryLight)
                        : (isDarkMode
                            ? AppTheme.textSecondaryDark
                            : AppTheme.textSecondaryLight),
                    width: 2,
                  ),
                ),
                child: ClipOval(
                  child: CustomImageWidget(
                    imageUrl: 'nav_profile_avatar_icon.png',
                    width: 24,
                    height: 24,
                    fit: BoxFit.cover,
                    semanticLabel: 'User profile navigation button',
                  ),
                ),
              ),
              label: 'Profile',
            ),
          ],
        ),
      ),
    );
  }
}
