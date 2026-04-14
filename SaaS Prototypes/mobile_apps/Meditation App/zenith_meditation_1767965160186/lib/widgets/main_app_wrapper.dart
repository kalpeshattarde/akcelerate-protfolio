import 'package:flutter/material.dart';

import '../core/app_export.dart';
import '../presentation/home_dashboard/home_dashboard.dart';
import '../presentation/home_dashboard/widgets/bottom_navigation_widget.dart';
import '../presentation/meditation_library/meditation_library.dart';
import '../presentation/progress_tracking/progress_tracking.dart';
import '../presentation/user_profile/user_profile.dart';
import '../theme/app_theme.dart';

class MainAppWrapper extends StatefulWidget {
  final int initialIndex;

  const MainAppWrapper({
    Key? key,
    this.initialIndex = 0,
  }) : super(key: key);

  @override
  State<MainAppWrapper> createState() => _MainAppWrapperState();
}

class _MainAppWrapperState extends State<MainAppWrapper>
    with TickerProviderStateMixin {
  late int _currentIndex;
  late PageController _pageController;

  final List<Widget> _screens = [
    const HomeDashboard(),
    const MeditationLibrary(),
    const ProgressTracking(),
    const UserProfile(),
  ];

  @override
  void initState() {
    super.initState();
    _currentIndex = widget.initialIndex;
    _pageController = PageController(initialPage: _currentIndex);
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  void _onBottomNavTap(int index) {
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
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      body: PageView(
        controller: _pageController,
        onPageChanged: _onPageChanged,
        physics: const NeverScrollableScrollPhysics(), // Disable swipe gestures
        children: _screens,
      ),
      bottomNavigationBar: BottomNavigationWidget(
        currentIndex: _currentIndex,
        onTap: _onBottomNavTap,
      ),
    );
  }
}
