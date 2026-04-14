import 'package:custom_sliding_segmented_control/custom_sliding_segmented_control.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../widgets/custom_app_bar.dart';
import '../../widgets/custom_bottom_bar.dart';
import './widgets/habits_tab_content.dart';
import './widgets/nutrition_tab_content.dart';
import './widgets/reports_tab_content.dart';

/// Nutrition & Health Reports screen
/// Presents maternal wellness data through simple, encouraging visualizations
class NutritionHealthReports extends StatefulWidget {
  const NutritionHealthReports({super.key});

  @override
  State<NutritionHealthReports> createState() => _NutritionHealthReportsState();
}

class _NutritionHealthReportsState extends State<NutritionHealthReports> {
  int _currentTabIndex = 0;
  int _bottomNavIndex = 2; // Health tab active

  final List<String> _tabTitles = ["Nutrition", "Habits", "Reports"];

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      appBar: CustomAppBar.dashboard(
        title: "Health",
        actions: [
          CustomAppBarAction(
            icon: Icons.notifications_outlined,
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text("Notifications feature coming soon"),
                  duration: Duration(seconds: 2),
                ),
              );
            },
            tooltip: "Notifications",
          ),
          CustomAppBarAction(
            icon: Icons.settings_outlined,
            onPressed: () {
              Navigator.pushNamed(context, '/user-profile-settings');
            },
            tooltip: "Settings",
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Segmented control for tab navigation
            Container(
              padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
              child: CustomSlidingSegmentedControl<int>(
                initialValue: _currentTabIndex,
                children: {
                  0: Text(
                    _tabTitles[0],
                    style: theme.textTheme.labelLarge?.copyWith(
                      color: _currentTabIndex == 0
                          ? theme.colorScheme.onPrimary
                          : theme.colorScheme.onSurface,
                    ),
                  ),
                  1: Text(
                    _tabTitles[1],
                    style: theme.textTheme.labelLarge?.copyWith(
                      color: _currentTabIndex == 1
                          ? theme.colorScheme.onPrimary
                          : theme.colorScheme.onSurface,
                    ),
                  ),
                  2: Text(
                    _tabTitles[2],
                    style: theme.textTheme.labelLarge?.copyWith(
                      color: _currentTabIndex == 2
                          ? theme.colorScheme.onPrimary
                          : theme.colorScheme.onSurface,
                    ),
                  ),
                },
                decoration: BoxDecoration(
                  color: theme.colorScheme.surface,
                  borderRadius: BorderRadius.circular(12.0),
                ),
                thumbDecoration: BoxDecoration(
                  color: theme.colorScheme.primary,
                  borderRadius: BorderRadius.circular(10.0),
                  boxShadow: [
                    BoxShadow(
                      color: theme.colorScheme.shadow.withValues(alpha: 0.1),
                      blurRadius: 4.0,
                      offset: const Offset(0, 2),
                    ),
                  ],
                ),
                duration: const Duration(milliseconds: 300),
                curve: Curves.easeInOut,
                onValueChanged: (value) {
                  setState(() {
                    _currentTabIndex = value;
                  });
                },
              ),
            ),

            // Tab content
            Expanded(
              child: IndexedStack(
                index: _currentTabIndex,
                children: const [
                  NutritionTabContent(),
                  HabitsTabContent(),
                  ReportsTabContent(),
                ],
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: CustomBottomBar(
        currentIndex: 2, // Health tab is at index 2
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
}