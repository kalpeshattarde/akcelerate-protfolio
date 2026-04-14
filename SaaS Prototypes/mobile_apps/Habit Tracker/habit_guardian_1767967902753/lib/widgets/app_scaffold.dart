import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../routes/app_routes.dart';
import './custom_bottom_bar.dart';

/// Main app scaffold that provides sticky bottom navigation for all screens
class AppScaffold extends StatefulWidget {
  final Widget child;
  final String currentRoute;

  const AppScaffold({
    super.key,
    required this.child,
    required this.currentRoute,
  });

  @override
  State<AppScaffold> createState() => _AppScaffoldState();
}

class _AppScaffoldState extends State<AppScaffold> {
  int _currentIndex = 0;
  late PageController _pageController;

  // Map routes to bottom nav indices
  final Map<String, int> _routeToIndex = {
    AppRoutes.habitDashboard: 0,
    AppRoutes.habitCreation: 1,
    AppRoutes.progressAnalytics: 2,
    AppRoutes.userProfile: 3,
  };

  @override
  void initState() {
    super.initState();
    _updateCurrentIndex();
    _pageController = PageController(initialPage: _currentIndex);
  }

  @override
  void didUpdateWidget(AppScaffold oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.currentRoute != widget.currentRoute) {
      _updateCurrentIndex();
      // Jump to the new page instantly without any animation
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (_pageController.hasClients && mounted) {
          _pageController.jumpToPage(_currentIndex);
        }
      });
    }
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  void _updateCurrentIndex() {
    final newIndex = _routeToIndex[widget.currentRoute] ?? 0;
    if (_currentIndex != newIndex && mounted) {
      setState(() {
        _currentIndex = newIndex;
      });
    }
  }

  bool _shouldShowBottomNavigation() {
    // Routes where bottom navigation should be hidden
    final hiddenRoutes = [
      AppRoutes.splash,
      AppRoutes.authentication,
      AppRoutes.onboardingFlow,
      AppRoutes.initial,
      // Add any other routes where you don't want bottom nav
    ];

    return !hiddenRoutes.contains(widget.currentRoute);
  }

  void _onBottomNavTap(int index) {
    if (index == _currentIndex || !mounted) return;

    HapticFeedback.lightImpact();

    // Simply jump to the page - no navigation calls that could cause sliding
    _pageController.jumpToPage(index);

    setState(() {
      _currentIndex = index;
    });
  }

  Widget _buildScreen(int index) {
    try {
      switch (index) {
        case 0:
          return AppRoutes.routes[AppRoutes.habitDashboard]!(context);
        case 1:
          return AppRoutes.routes[AppRoutes.habitCreation]!(context);
        case 2:
          return AppRoutes.routes[AppRoutes.progressAnalytics]!(context);
        case 3:
          return AppRoutes.routes[AppRoutes.userProfile]!(context);
        default:
          return AppRoutes.routes[AppRoutes.habitDashboard]!(context);
      }
    } catch (e) {
      // Fallback to prevent crashes
      return const Scaffold(
        body: Center(
          child: Text('Screen not found'),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    // For routes that should show bottom navigation, use PageView for seamless transitions
    if (_shouldShowBottomNavigation()) {
      return Scaffold(
        body: PageView.builder(
          controller: _pageController,
          physics:
              const NeverScrollableScrollPhysics(), // Prevent manual swiping
          itemCount: 4, // Number of bottom nav items
          onPageChanged: (index) {
            // Prevent any automatic page changes - keep bottom nav truly sticky
            if (index != _currentIndex) {
              WidgetsBinding.instance.addPostFrameCallback((_) {
                if (mounted && _pageController.hasClients) {
                  _pageController.jumpToPage(_currentIndex);
                }
              });
            }
          },
          itemBuilder: (context, index) {
            return _buildScreen(index);
          },
        ),
        bottomNavigationBar: Container(
          decoration: BoxDecoration(
            boxShadow: [
              BoxShadow(
                color: Colors.black.withAlpha(26),
                offset: const Offset(0, -2),
                blurRadius: 8,
                spreadRadius: 0,
              ),
            ],
          ),
          child: CustomBottomBar(
            currentIndex: _currentIndex,
            onTap: _onBottomNavTap,
          ),
        ),
      );
    }

    // For routes without bottom navigation, use the original child
    return Scaffold(
      body: widget.child,
    );
  }
}
