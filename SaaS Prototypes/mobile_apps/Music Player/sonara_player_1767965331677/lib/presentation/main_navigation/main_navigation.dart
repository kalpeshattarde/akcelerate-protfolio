import 'package:flutter/material.dart';
import '../../core/app_export.dart';
import '../../widgets/custom_bottom_bar.dart';
import '../home_dashboard/home_dashboard.dart';
import '../search_and_discovery/search_and_discovery.dart';
import '../playlist_management/playlist_management.dart';
import '../user_profile_and_settings/user_profile_and_settings.dart';

/// Main navigation wrapper that manages bottom navigation and page switching
class MainNavigation extends StatefulWidget {
  final int initialIndex;
  
  const MainNavigation({Key? key, this.initialIndex = 0}) : super(key: key);

  @override
  State<MainNavigation> createState() => _MainNavigationState();
}

class _MainNavigationState extends State<MainNavigation> {
  late int _currentIndex;

  final List<Widget> _pages = [
    const HomeDashboard(),
    const SearchAndDiscovery(),
    const PlaylistManagement(),
    const UserProfileAndSettings(),
  ];

  final List<String> _routeNames = [
    '/home-dashboard',
    '/search-and-discovery',
    '/playlist-management',
    '/user-profile-and-settings',
  ];

  @override
  void initState() {
    super.initState();
    _currentIndex = widget.initialIndex;
  }

  void _handleBottomNavTap(int index) {
    if (_currentIndex != index) {
      setState(() {
        _currentIndex = index;
      });
      // Update the URL without navigating to a new page
      Navigator.pushReplacementNamed(context, _routeNames[index]);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF1A1F16),
      body: Stack(
        children: [
          // Background gradient
          Container(
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [
                  Color(0xFF2D3328), // Olive green tint
                  Color(0xFF1A1F16), // Dark base
                  Color(0xFF151912), // Darker
                ],
                stops: [0.0, 0.5, 1.0],
              ),
            ),
          ),
          // Additional radial gradient for top-left glow
          Positioned(
            top: -100,
            left: -100,
            child: Container(
              width: 400,
              height: 400,
              decoration: BoxDecoration(
                gradient: RadialGradient(
                  colors: [
                    const Color(0xFF3D4A35).withValues(alpha: 0.6),
                    Colors.transparent,
                  ],
                ),
              ),
            ),
          ),
          IndexedStack(
            index: _currentIndex,
            children: _pages,
          ),
        ],
      ),
      extendBody: true,
      bottomNavigationBar: CustomBottomBar(
        currentIndex: _currentIndex,
        onTap: _handleBottomNavTap,
        height: 70,
        curveHeight: 20,
      ),
    );
  }
}
