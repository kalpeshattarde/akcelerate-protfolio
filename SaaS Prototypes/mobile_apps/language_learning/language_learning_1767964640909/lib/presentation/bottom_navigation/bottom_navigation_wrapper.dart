import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../theme/app_theme.dart';
import '../../widgets/custom_icon_widget.dart';
import '../home_dashboard/home_dashboard.dart';
import '../lesson_interface/lesson_interface.dart';
import '../progress_analytics/progress_analytics.dart';
import '../settings_and_profile/settings_and_profile.dart';

class BottomNavigationWrapper extends StatefulWidget {
  final int initialIndex;

  const BottomNavigationWrapper({Key? key, this.initialIndex = 0})
    : super(key: key);

  @override
  State<BottomNavigationWrapper> createState() =>
      _BottomNavigationWrapperState();
}

class _BottomNavigationWrapperState extends State<BottomNavigationWrapper> {
  late int _currentIndex;
  late PageController _pageController;

  final List<Widget> _screens = [
    const HomeDashboard(),
    const LessonInterface(),
    const ProgressAnalytics(),
    const SettingsAndProfile(),
  ];

  final List<BottomNavigationItem> _navigationItems = [
    BottomNavigationItem(icon: 'home', activeIcon: 'home', label: 'Home'),
    BottomNavigationItem(
      icon: 'school',
      activeIcon: 'school',
      label: 'Lessons',
    ),
    BottomNavigationItem(
      icon: 'analytics',
      activeIcon: 'analytics',
      label: 'Progress',
    ),
    BottomNavigationItem(
      icon: 'person',
      activeIcon: 'person',
      label: 'Profile',
    ),
  ];

  @override
  void initState() {
    super.initState();
    _currentIndex = widget.initialIndex;
    _pageController = PageController(initialPage: _currentIndex);
  }

  void _onItemTapped(int index) {
    setState(() {
      _currentIndex = index;
    });
    _pageController.animateToPage(
      index,
      duration: const Duration(milliseconds: 300),
      curve: Curves.easeInOut,
    );
  }

  void _onPageChanged(int index) {
    setState(() {
      _currentIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: PageView(
        controller: _pageController,
        onPageChanged: _onPageChanged,
        children: _screens,
      ),
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color: AppTheme.lightTheme.colorScheme.surface,
          boxShadow: [
            BoxShadow(
              color: AppTheme.lightTheme.colorScheme.shadow.withValues(
                alpha: 0.1,
              ),
              blurRadius: 20,
              offset: const Offset(0, -5),
            ),
          ],
          border: Border(
            top: BorderSide(
              color: AppTheme.lightTheme.colorScheme.outline.withValues(
                alpha: 0.1,
              ),
              width: 1,
            ),
          ),
        ),
        child: SafeArea(
          child: Container(
            height: 20.w,
            padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.w),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children:
                  _navigationItems.asMap().entries.map((entry) {
                    final index = entry.key;
                    final item = entry.value;
                    final isSelected = _currentIndex == index;

                    return Expanded(
                      child: GestureDetector(
                        onTap: () => _onItemTapped(index),
                        child: AnimatedContainer(
                          duration: const Duration(milliseconds: 200),
                          padding: EdgeInsets.symmetric(
                            horizontal: 2.w,
                            vertical: 1.w,
                          ),
                          decoration: BoxDecoration(
                            color:
                                isSelected
                                    ? AppTheme.lightTheme.colorScheme.primary
                                        .withValues(alpha: 0.1)
                                    : Colors.transparent,
                            borderRadius: BorderRadius.circular(16),
                          ),
                          child: Column(
                            mainAxisSize: MainAxisSize.min,
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              AnimatedContainer(
                                duration: const Duration(milliseconds: 200),
                                child: CustomIconWidget(
                                  iconName:
                                      isSelected ? item.activeIcon : item.icon,
                                  size: isSelected ? 6.w : 5.5.w,
                                  color:
                                      isSelected
                                          ? AppTheme
                                              .lightTheme
                                              .colorScheme
                                              .primary
                                          : AppTheme
                                              .lightTheme
                                              .colorScheme
                                              .onSurface
                                              .withValues(alpha: 0.6),
                                ),
                              ),
                              SizedBox(height: 1.5.w),
                              AnimatedDefaultTextStyle(
                                duration: const Duration(milliseconds: 200),
                                style:
                                    AppTheme.lightTheme.textTheme.bodySmall
                                        ?.copyWith(
                                          fontSize: isSelected ? 11.sp : 10.sp,
                                          fontWeight:
                                              isSelected
                                                  ? FontWeight.w600
                                                  : FontWeight.w500,
                                          color:
                                              isSelected
                                                  ? AppTheme
                                                      .lightTheme
                                                      .colorScheme
                                                      .primary
                                                  : AppTheme
                                                      .lightTheme
                                                      .colorScheme
                                                      .onSurface
                                                      .withValues(alpha: 0.6),
                                          letterSpacing: 0.2,
                                        ) ??
                                    const TextStyle(),
                                child: Text(
                                  item.label,
                                  textAlign: TextAlign.center,
                                  overflow: TextOverflow.visible,
                                  maxLines: 1,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    );
                  }).toList(),
            ),
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }
}

class BottomNavigationItem {
  final String icon;
  final String activeIcon;
  final String label;

  BottomNavigationItem({
    required this.icon,
    required this.activeIcon,
    required this.label,
  });
}
