import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

/// Custom BottomNavigationBar widget for pet care application
/// Implements gesture-aware navigation with clean visual hierarchy
class CustomBottomBar extends StatelessWidget {
  final int currentIndex;
  final Function(int) onTap;
  final BottomBarVariant variant;
  final bool showLabels;

  const CustomBottomBar({
    super.key,
    required this.currentIndex,
    required this.onTap,
    this.variant = BottomBarVariant.standard,
    this.showLabels = true,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    // Define navigation items with routes and icons
    final items = _getNavigationItems(theme.brightness == Brightness.light);

    return Container(
      decoration: BoxDecoration(
        color: colorScheme.surface,
        boxShadow: variant == BottomBarVariant.floating
            ? [
                BoxShadow(
                  color: theme.brightness == Brightness.light
                      ? const Color(0x0A000000)
                      : const Color(0x1A000000),
                  blurRadius: 8,
                  offset: const Offset(0, -2),
                ),
              ]
            : [
                BoxShadow(
                  color: theme.brightness == Brightness.light
                      ? const Color(0x0A000000)
                      : const Color(0x1A000000),
                  blurRadius: 4,
                  offset: const Offset(0, -1),
                ),
              ],
        borderRadius: variant == BottomBarVariant.floating
            ? const BorderRadius.vertical(top: Radius.circular(16))
            : null,
      ),
      child: SafeArea(
        child: Padding(
          padding: EdgeInsets.symmetric(
            horizontal: variant == BottomBarVariant.floating ? 16 : 0,
            vertical: variant == BottomBarVariant.floating ? 8 : 0,
          ),
          child: BottomNavigationBar(
            currentIndex: currentIndex,
            onTap: (index) => _handleNavigation(context, index),
            type: BottomNavigationBarType.fixed,
            backgroundColor: Colors.transparent,
            elevation: 0,
            selectedItemColor: theme.brightness == Brightness.light
                ? const Color(0xFF2B5F75) // Primary light
                : const Color(0xFF4A8BA3), // Primary dark
            unselectedItemColor: theme.brightness == Brightness.light
                ? const Color(0xFF6A737D) // Text secondary light
                : const Color(0xFFADB5BD), // Text secondary dark
            selectedLabelStyle: GoogleFonts.inter(
              fontSize: 12,
              fontWeight: FontWeight.w500,
              letterSpacing: 0.5,
            ),
            unselectedLabelStyle: GoogleFonts.inter(
              fontSize: 12,
              fontWeight: FontWeight.w400,
              letterSpacing: 0.5,
            ),
            showSelectedLabels: showLabels,
            showUnselectedLabels: showLabels,
            items: items,
          ),
        ),
      ),
    );
  }

  List<BottomNavigationBarItem> _getNavigationItems(bool isLight) {
    return [
      BottomNavigationBarItem(
        icon: _buildIcon(Icons.home_outlined, Icons.home, 0),
        label: 'Home',
        tooltip: 'Home Dashboard',
      ),
      BottomNavigationBarItem(
        icon: _buildIcon(Icons.pets_outlined, Icons.pets, 1),
        label: 'Pets',
        tooltip: 'Pet Profiles',
      ),
      BottomNavigationBarItem(
        icon: _buildIcon(
            Icons.medical_services_outlined, Icons.medical_services, 2),
        label: 'Health',
        tooltip: 'Medical Records',
      ),
      BottomNavigationBarItem(
        icon: _buildIcon(Icons.medication_outlined, Icons.medication, 3),
        label: 'Meds',
        tooltip: 'Medications',
      ),
      BottomNavigationBarItem(
        icon: _buildIcon(Icons.more_horiz, Icons.more_horiz, 4),
        label: 'More',
        tooltip: 'More Options',
      ),
    ];
  }

  Widget _buildIcon(IconData outlinedIcon, IconData filledIcon, int index) {
    final isSelected = currentIndex == index;

    return AnimatedContainer(
      duration: const Duration(milliseconds: 200),
      curve: Curves.easeInOut,
      padding: const EdgeInsets.all(4),
      decoration: isSelected && variant == BottomBarVariant.pill
          ? BoxDecoration(
              color: const Color(0xFF2B5F75).withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(12),
            )
          : null,
      child: Icon(
        isSelected ? filledIcon : outlinedIcon,
        size: 24,
      ),
    );
  }

  void _handleNavigation(BuildContext context, int index) {
    if (index == currentIndex) return;

    onTap(index);

    // Navigate to appropriate route based on index
    final routes = [
      '/home-dashboard',
      '/pet-profile-management',
      '/medical-records',
      '/medication-management',
      '/settings-and-profile', // More section leads to settings
    ];

    if (index < routes.length) {
      // Handle special case for "More" section
      if (index == 4) {
        _showMoreOptions(context);
      } else {
        Navigator.pushNamedAndRemoveUntil(
          context,
          routes[index],
          (route) => false,
        );
      }
    }
  }

  void _showMoreOptions(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => _MoreOptionsSheet(),
    );
  }
}

/// Bottom sheet for "More" options with contextual actions
class _MoreOptionsSheet extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Container(
      decoration: BoxDecoration(
        color: colorScheme.surface,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
      ),
      child: SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // Handle bar
            Container(
              width: 40,
              height: 4,
              margin: const EdgeInsets.symmetric(vertical: 12),
              decoration: BoxDecoration(
                color: theme.brightness == Brightness.light
                    ? const Color(0xFFE1E4E8)
                    : const Color(0xFF30363D),
                borderRadius: BorderRadius.circular(2),
              ),
            ),

            // Title
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
              child: Text(
                'More Options',
                style: GoogleFonts.inter(
                  fontSize: 20,
                  fontWeight: FontWeight.w600,
                  color: theme.brightness == Brightness.light
                      ? const Color(0xFF1B1F23)
                      : const Color(0xFFE8EAED),
                ),
              ),
            ),

            // Options list
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Column(
                children: [
                  _buildOptionTile(
                    context,
                    icon: Icons.analytics_outlined,
                    title: 'Health Analytics',
                    subtitle: 'View health trends and insights',
                    onTap: () {
                      Navigator.pop(context);
                      Navigator.pushNamed(context, '/health-analytics');
                    },
                  ),
                  _buildOptionTile(
                    context,
                    icon: Icons.task_outlined,
                    title: 'Care Tasks',
                    subtitle: 'Manage daily care routines',
                    onTap: () {
                      Navigator.pop(context);
                      Navigator.pushNamed(context, '/care-task-management');
                    },
                  ),
                  _buildOptionTile(
                    context,
                    icon: Icons.calendar_today_outlined,
                    title: 'Appointments',
                    subtitle: 'Schedule and manage vet visits',
                    onTap: () {
                      Navigator.pop(context);
                      Navigator.pushNamed(context, '/veterinary-appointments');
                    },
                  ),
                  _buildOptionTile(
                    context,
                    icon: Icons.emergency_outlined,
                    title: 'Emergency Resources',
                    subtitle: 'Quick access to emergency contacts',
                    onTap: () {
                      Navigator.pop(context);
                      Navigator.pushNamed(context, '/emergency-resources');
                    },
                  ),
                  _buildOptionTile(
                    context,
                    icon: Icons.settings_outlined,
                    title: 'Settings & Profile',
                    subtitle: 'App preferences and account settings',
                    onTap: () {
                      Navigator.pop(context);
                      Navigator.pushNamed(context, '/settings-and-profile');
                    },
                  ),
                ],
              ),
            ),

            const SizedBox(height: 16),
          ],
        ),
      ),
    );
  }

  Widget _buildOptionTile(
    BuildContext context, {
    required IconData icon,
    required String title,
    required String subtitle,
    required VoidCallback onTap,
  }) {
    final theme = Theme.of(context);

    return ListTile(
      leading: Container(
        width: 40,
        height: 40,
        decoration: BoxDecoration(
          color: theme.brightness == Brightness.light
              ? const Color(0xFF2B5F75).withValues(alpha: 0.1)
              : const Color(0xFF4A8BA3).withValues(alpha: 0.2),
          borderRadius: BorderRadius.circular(8),
        ),
        child: Icon(
          icon,
          color: theme.brightness == Brightness.light
              ? const Color(0xFF2B5F75)
              : const Color(0xFF4A8BA3),
          size: 20,
        ),
      ),
      title: Text(
        title,
        style: GoogleFonts.inter(
          fontSize: 16,
          fontWeight: FontWeight.w500,
          color: theme.brightness == Brightness.light
              ? const Color(0xFF1B1F23)
              : const Color(0xFFE8EAED),
        ),
      ),
      subtitle: Text(
        subtitle,
        style: GoogleFonts.inter(
          fontSize: 14,
          fontWeight: FontWeight.w400,
          color: theme.brightness == Brightness.light
              ? const Color(0xFF6A737D)
              : const Color(0xFFADB5BD),
        ),
      ),
      trailing: Icon(
        Icons.arrow_forward_ios,
        size: 16,
        color: theme.brightness == Brightness.light
            ? const Color(0xFF6A737D)
            : const Color(0xFFADB5BD),
      ),
      onTap: onTap,
      contentPadding: const EdgeInsets.symmetric(horizontal: 4, vertical: 4),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(8),
      ),
    );
  }
}

/// Enum defining different BottomBar variants
enum BottomBarVariant {
  standard,
  floating,
  pill,
}
