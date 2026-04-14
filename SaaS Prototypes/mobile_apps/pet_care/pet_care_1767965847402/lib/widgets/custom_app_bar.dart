import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

/// Custom AppBar widget implementing Contemporary Veterinary Minimalism design
/// Provides clean, professional interface for pet care applications
class CustomAppBar extends StatelessWidget implements PreferredSizeWidget {
  final String title;
  final List<Widget>? actions;
  final Widget? leading;
  final bool centerTitle;
  final bool showBackButton;
  final VoidCallback? onBackPressed;
  final Color? backgroundColor;
  final Color? foregroundColor;
  final double elevation;
  final AppBarVariant variant;

  const CustomAppBar({
    super.key,
    required this.title,
    this.actions,
    this.leading,
    this.centerTitle = false,
    this.showBackButton = true,
    this.onBackPressed,
    this.backgroundColor,
    this.foregroundColor,
    this.elevation = 0,
    this.variant = AppBarVariant.standard,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    // Determine colors based on variant and theme
    final effectiveBackgroundColor = backgroundColor ??
        (variant == AppBarVariant.transparent
            ? Colors.transparent
            : colorScheme.surface);

    final effectiveForegroundColor = foregroundColor ??
        (theme.brightness == Brightness.light
            ? const Color(0xFF1B1F23)
            : const Color(0xFFE8EAED));

    return AppBar(
      title: Text(
        title,
        style: GoogleFonts.inter(
          fontSize: _getTitleFontSize(),
          fontWeight: FontWeight.w600,
          color: effectiveForegroundColor,
          letterSpacing: 0.15,
        ),
      ),
      centerTitle: centerTitle,
      backgroundColor: effectiveBackgroundColor,
      foregroundColor: effectiveForegroundColor,
      elevation: variant == AppBarVariant.transparent ? 0 : elevation,
      scrolledUnderElevation: variant == AppBarVariant.transparent ? 0 : 1,
      leading: _buildLeading(context, effectiveForegroundColor),
      actions: _buildActions(context, effectiveForegroundColor),
      iconTheme: IconThemeData(
        color: effectiveForegroundColor,
        size: 24,
      ),
      actionsIconTheme: IconThemeData(
        color: effectiveForegroundColor,
        size: 24,
      ),
      systemOverlayStyle: theme.brightness == Brightness.light
          ? const SystemUiOverlayStyle(
              statusBarColor: Colors.transparent,
              statusBarIconBrightness: Brightness.dark,
            )
          : const SystemUiOverlayStyle(
              statusBarColor: Colors.transparent,
              statusBarIconBrightness: Brightness.light,
            ),
    );
  }

  Widget? _buildLeading(BuildContext context, Color foregroundColor) {
    if (leading != null) return leading;

    if (showBackButton && Navigator.of(context).canPop()) {
      return IconButton(
        icon: Icon(
          Icons.arrow_back_ios_new,
          color: foregroundColor,
          size: 20,
        ),
        onPressed: onBackPressed ?? () => Navigator.of(context).pop(),
        tooltip: 'Back',
      );
    }

    return null;
  }

  List<Widget>? _buildActions(BuildContext context, Color foregroundColor) {
    if (actions != null) return actions;

    // Default actions based on current route
    final currentRoute = ModalRoute.of(context)?.settings.name;

    switch (currentRoute) {
      case '/home-dashboard':
        return [
          IconButton(
            icon: Icon(Icons.notifications_outlined, color: foregroundColor),
            onPressed: () => _showNotifications(context),
            tooltip: 'Notifications',
          ),
          IconButton(
            icon: Icon(Icons.person_outline, color: foregroundColor),
            onPressed: () =>
                Navigator.pushNamed(context, '/settings-and-profile'),
            tooltip: 'Profile',
          ),
        ];

      case '/pet-profile-management':
        return [
          IconButton(
            icon: Icon(Icons.add, color: foregroundColor),
            onPressed: () => _addNewPet(context),
            tooltip: 'Add Pet',
          ),
          IconButton(
            icon: Icon(Icons.more_vert, color: foregroundColor),
            onPressed: () => _showPetOptions(context),
            tooltip: 'More options',
          ),
        ];

      case '/medical-records':
        return [
          IconButton(
            icon: Icon(Icons.search, color: foregroundColor),
            onPressed: () => _searchRecords(context),
            tooltip: 'Search records',
          ),
          IconButton(
            icon: Icon(Icons.filter_list, color: foregroundColor),
            onPressed: () => _filterRecords(context),
            tooltip: 'Filter',
          ),
        ];

      case '/medication-management':
        return [
          IconButton(
            icon: Icon(Icons.add_alarm, color: foregroundColor),
            onPressed: () => _addMedicationReminder(context),
            tooltip: 'Add reminder',
          ),
        ];

      case '/health-analytics':
        return [
          IconButton(
            icon: Icon(Icons.share, color: foregroundColor),
            onPressed: () => _shareHealthReport(context),
            tooltip: 'Share report',
          ),
        ];

      case '/veterinary-appointments':
        return [
          IconButton(
            icon: Icon(Icons.calendar_today, color: foregroundColor),
            onPressed: () => _viewCalendar(context),
            tooltip: 'Calendar view',
          ),
        ];

      case '/emergency-resources':
        return [
          IconButton(
            icon: Icon(Icons.phone, color: foregroundColor),
            onPressed: () => _callEmergencyVet(context),
            tooltip: 'Emergency call',
          ),
        ];

      default:
        return null;
    }
  }

  double _getTitleFontSize() {
    switch (variant) {
      case AppBarVariant.large:
        return 24;
      case AppBarVariant.small:
        return 18;
      case AppBarVariant.standard:
      case AppBarVariant.transparent:
      default:
        return 20;
    }
  }

  // Action handlers
  void _showNotifications(BuildContext context) {
    // Implementation for showing notifications
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Notifications opened')),
    );
  }

  void _addNewPet(BuildContext context) {
    // Implementation for adding new pet
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Add new pet')),
    );
  }

  void _showPetOptions(BuildContext context) {
    showModalBottomSheet(
      context: context,
      builder: (context) => Container(
        padding: const EdgeInsets.all(16),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              leading: const Icon(Icons.edit),
              title: const Text('Edit Pet Profile'),
              onTap: () => Navigator.pop(context),
            ),
            ListTile(
              leading: const Icon(Icons.share),
              title: const Text('Share Pet Info'),
              onTap: () => Navigator.pop(context),
            ),
            ListTile(
              leading: const Icon(Icons.archive),
              title: const Text('Archive Pet'),
              onTap: () => Navigator.pop(context),
            ),
          ],
        ),
      ),
    );
  }

  void _searchRecords(BuildContext context) {
    // Implementation for searching medical records
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Search medical records')),
    );
  }

  void _filterRecords(BuildContext context) {
    // Implementation for filtering records
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Filter records')),
    );
  }

  void _addMedicationReminder(BuildContext context) {
    // Implementation for adding medication reminder
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Add medication reminder')),
    );
  }

  void _shareHealthReport(BuildContext context) {
    // Implementation for sharing health report
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Share health report')),
    );
  }

  void _viewCalendar(BuildContext context) {
    // Implementation for viewing calendar
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Calendar view')),
    );
  }

  void _callEmergencyVet(BuildContext context) {
    // Implementation for emergency call
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Calling emergency vet...')),
    );
  }

  @override
  Size get preferredSize => Size.fromHeight(
        variant == AppBarVariant.large ? 72.0 : 56.0,
      );
}

/// Enum defining different AppBar variants
enum AppBarVariant {
  standard,
  large,
  small,
  transparent,
}
