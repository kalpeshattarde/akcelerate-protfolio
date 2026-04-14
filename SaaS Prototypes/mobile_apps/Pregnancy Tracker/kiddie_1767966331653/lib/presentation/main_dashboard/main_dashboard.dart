import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../core/app_export.dart';
import '../../widgets/custom_app_bar.dart';
import '../../widgets/custom_bottom_bar.dart';
import '../../widgets/custom_icon_widget.dart';
import './widgets/hero_section_widget.dart';
import './widgets/quick_actions_grid_widget.dart';
import './widgets/recent_activity_widget.dart';
import './widgets/todays_tip_card_widget.dart';
import './widgets/upcoming_appointments_widget.dart';

/// Main Dashboard - Pregnancy Journey Command Center
/// Displays current progress and provides quick access to essential tracking tools
class MainDashboard extends StatefulWidget {
  const MainDashboard({super.key});

  @override
  State<MainDashboard> createState() => _MainDashboardState();
}

class _MainDashboardState extends State<MainDashboard> {
  int _currentBottomNavIndex = 0;
  final ScrollController _scrollController = ScrollController();
  bool _isRefreshing = false;

  // Mock pregnancy data
  final Map<String, dynamic> pregnancyData = {
    "currentWeek": 24,
    "trimester": 2,
    "dueDate": "2025-04-15",
    "babySize": "Corn",
    "babySizeImage":
        "https://images.unsplash.com/photo-1675347274514-6f2442593a40",
    "babySizeSemanticLabel":
        "Fresh yellow corn on the cob with green husks against white background",
    "babyLength": "30 cm",
    "babyWeight": "600 g",
    "trimesterProgress": 0.67,
    "userName": "Sarah",
    "greeting": "Good Morning",
  };

  final List<Map<String, dynamic>> todaysTips = [
    {
      "id": 1,
      "title": "Stay Hydrated",
      "content":
          "Drink at least 8-10 glasses of water daily to support your baby's development and maintain amniotic fluid levels.",
      "category": "Wellness",
      "icon": "water_drop",
      "isBookmarked": false,
    },
    {
      "id": 2,
      "title": "Gentle Exercise",
      "content":
          "Try prenatal yoga or swimming for 30 minutes to improve circulation and reduce pregnancy discomfort.",
      "category": "Fitness",
      "icon": "fitness_center",
      "isBookmarked": true,
    },
  ];

  final List<Map<String, dynamic>> upcomingAppointments = [
    {
      "id": 1,
      "title": "Ultrasound Scan",
      "date": "2025-12-15",
      "time": "10:30 AM",
      "doctor": "Dr. Emily Chen",
      "location": "Women's Health Center",
      "type": "Routine Checkup",
    },
    {
      "id": 2,
      "title": "Blood Test",
      "date": "2025-12-20",
      "time": "09:00 AM",
      "doctor": "Dr. Michael Roberts",
      "location": "City Medical Lab",
      "type": "Lab Work",
    },
  ];

  final List<Map<String, dynamic>> recentActivity = [
    {
      "id": 1,
      "type": "kick_count",
      "title": "Kick Counter Session",
      "description": "10 kicks recorded in 2 hours",
      "timestamp": "2 hours ago",
      "icon": "child_care",
    },
    {
      "id": 2,
      "type": "nutrition",
      "title": "Nutrition Log",
      "description": "Logged breakfast and morning snack",
      "timestamp": "4 hours ago",
      "icon": "restaurant",
    },
    {
      "id": 3,
      "type": "weight",
      "title": "Weight Update",
      "description": "Current weight: 68 kg (+12 kg)",
      "timestamp": "Yesterday",
      "icon": "monitor_weight",
    },
  ];

  int get _notificationCount => 3; // Mock notification count

  void _showNotifications() {
    HapticFeedback.lightImpact();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: const Text('Notifications feature coming soon'),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
      ),
    );
  }

  @override
  void initState() {
    super.initState();
    _updateGreeting();
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  void _updateGreeting() {
    final hour = DateTime.now().hour;
    setState(() {
      if (hour < 12) {
        pregnancyData["greeting"] = "Good Morning";
      } else if (hour < 17) {
        pregnancyData["greeting"] = "Good Afternoon";
      } else {
        pregnancyData["greeting"] = "Good Evening";
      }
    });
  }

  Future<void> _handleRefresh() async {
    setState(() => _isRefreshing = true);
    HapticFeedback.mediumImpact();

    // Simulate data refresh
    await Future.delayed(const Duration(seconds: 2));

    setState(() => _isRefreshing = false);

    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: const Text('Dashboard updated successfully'),
          behavior: SnackBarBehavior.floating,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          duration: const Duration(seconds: 2),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      appBar: CustomAppBar.dashboard(
        title: 'Hello, Sarah',
        actions: [
          CustomAppBarAction(
            icon: Icons.notifications_outlined,
            onPressed: _showNotifications,
            tooltip: 'Notifications',
            badgeCount: _notificationCount,
          ),
          CustomAppBarAction(
            icon: Icons.settings_outlined,
            onPressed: () =>
                Navigator.pushNamed(context, '/user-profile-settings'),
            tooltip: 'Settings',
          ),
        ],
      ),
      body: SafeArea(
        child: RefreshIndicator(
          onRefresh: _handleRefresh,
          child: CustomScrollView(
            controller: _scrollController,
            physics: const AlwaysScrollableScrollPhysics(),
            slivers: [
              // Hero Section - Current Week & Baby Size
              SliverToBoxAdapter(
                child: HeroSectionWidget(pregnancyData: pregnancyData),
              ),

              // Quick Actions Grid
              const SliverToBoxAdapter(child: QuickActionsGridWidget()),

              // Today's Tip Card
              SliverToBoxAdapter(
                child: TodaysTipCardWidget(tips: todaysTips),
              ),

              // Upcoming Appointments
              SliverToBoxAdapter(
                child: UpcomingAppointmentsWidget(
                  appointments: upcomingAppointments,
                ),
              ),

              // Recent Activity Feed
              SliverToBoxAdapter(
                child: RecentActivityWidget(activities: recentActivity),
              ),

              // Bottom padding for FAB
              const SliverToBoxAdapter(child: SizedBox(height: 80)),
            ],
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {
          HapticFeedback.mediumImpact();
          showModalBottomSheet(
            context: context,
            shape: const RoundedRectangleBorder(
              borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
            ),
            builder: (context) => _buildEmergencyContactsSheet(theme),
          );
        },
        icon: CustomIconWidget(
          iconName: 'emergency',
          color: theme.colorScheme.onPrimary,
          size: 24,
        ),
        label: Text(
          'Emergency',
          style: theme.textTheme.labelLarge?.copyWith(
            color: theme.colorScheme.onPrimary,
          ),
        ),
        backgroundColor: theme.colorScheme.error,
      ),
      bottomNavigationBar: CustomBottomBar(
        currentIndex: 0, // Dashboard is at index 0
        onTap: (index) {
          HapticFeedback.lightImpact();
          final items = CustomBottomBar.defaultItems;
          if (index < items.length) {
            // Always navigate - removed condition that prevented same-tab navigation
            Navigator.pushReplacementNamed(context, items[index].route);
          }
        },
      ),
    );
  }

  Widget _buildEmergencyContactsSheet(ThemeData theme) {
    final emergencyContacts = [
      {
        "name": "Dr. Emily Chen",
        "role": "Primary OB-GYN",
        "phone": "+1 (555) 123-4567",
        "available": "24/7",
      },
      {
        "name": "City Hospital ER",
        "role": "Emergency Room",
        "phone": "+1 (555) 911-0000",
        "available": "24/7",
      },
      {
        "name": "Pregnancy Helpline",
        "role": "Support Line",
        "phone": "+1 (800) 555-BABY",
        "available": "24/7",
      },
    ];

    return Container(
      padding: const EdgeInsets.all(24),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              CustomIconWidget(
                iconName: 'emergency',
                color: theme.colorScheme.error,
                size: 28,
              ),
              const SizedBox(width: 12),
              Text(
                'Emergency Contacts',
                style: theme.textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
          const SizedBox(height: 24),
          ...emergencyContacts.map(
            (contact) => _buildEmergencyContactCard(theme, contact),
          ),
          const SizedBox(height: 16),
          SizedBox(
            width: double.infinity,
            child: OutlinedButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Close'),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildEmergencyContactCard(
    ThemeData theme,
    Map<String, dynamic> contact,
  ) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: theme.colorScheme.outline.withValues(alpha: 0.2),
        ),
      ),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  contact["name"] as String,
                  style: theme.textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  contact["role"] as String,
                  style: theme.textTheme.bodySmall?.copyWith(
                    color: theme.colorScheme.onSurfaceVariant,
                  ),
                ),
                const SizedBox(height: 8),
                Row(
                  children: [
                    CustomIconWidget(
                      iconName: 'access_time',
                      color: theme.colorScheme.primary,
                      size: 16,
                    ),
                    const SizedBox(width: 4),
                    Text(
                      contact["available"] as String,
                      style: theme.textTheme.bodySmall?.copyWith(
                        color: theme.colorScheme.primary,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          IconButton(
            onPressed: () {
              HapticFeedback.mediumImpact();
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text('Calling ${contact["phone"]}...'),
                  behavior: SnackBarBehavior.floating,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
              );
            },
            icon: CustomIconWidget(
              iconName: 'phone',
              color: theme.colorScheme.primary,
              size: 24,
            ),
            style: IconButton.styleFrom(
              backgroundColor: theme.colorScheme.primary.withValues(alpha: 0.1),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
