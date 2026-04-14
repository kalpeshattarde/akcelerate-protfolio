import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../widgets/custom_icon_widget.dart';
import '../dashboard_home/dashboard_home.dart';
import '../food_search_and_logging/food_search_and_logging.dart';
import '../profile_and_settings/profile_and_settings.dart';
import '../water_tracking/water_tracking.dart';

class MainLayout extends StatefulWidget {
  final int initialIndex;

  const MainLayout({
    Key? key,
    this.initialIndex = 0,
  }) : super(key: key);

  @override
  State<MainLayout> createState() => _MainLayoutState();
}

class _MainLayoutState extends State<MainLayout> {
  late int _currentIndex;
  late PageController _pageController;

  final List<Widget> _screens = [
    const DashboardHomeContent(),
    const FoodSearchAndLoggingContent(),
    const WaterTrackingContent(),
    const ProfileAndSettingsContent(),
  ];

  final List<String> _screenTitles = [
    'Home',
    'Food Log',
    'Water',
    'Profile',
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

  void _onTabTapped(int index) {
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

  void _showQuickLogModal() {
    showModalBottomSheet(
      context: context,
      backgroundColor: Theme.of(context).cardColor,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
      ),
      isScrollControlled: true,
      builder: (context) => Padding(
        padding: EdgeInsets.only(
          bottom: MediaQuery.of(context).viewInsets.bottom,
        ),
        child: Container(
          padding: EdgeInsets.all(4.w),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 10.w,
                height: 0.5.h,
                decoration: BoxDecoration(
                  color: Theme.of(context)
                      .colorScheme
                      .onSurfaceVariant
                      .withValues(alpha: 0.3),
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
              SizedBox(height: 2.h),
              Text(
                'Quick Log',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
              ),
              SizedBox(height: 2.h),
              _buildQuickLogOption(
                'Log Food',
                'restaurant',
                () {
                  Navigator.pop(context);
                  _onTabTapped(1);
                },
                showDivider: true,
              ),
              _buildQuickActionSection(),
              _buildQuickLogOption(
                'Log Water',
                'local_drink',
                () {
                  Navigator.pop(context);
                  _showQuickWaterLog();
                },
                showDivider: false,
              ),
              SizedBox(height: 2.h),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildQuickActionSection() {
    return Container(
      margin: EdgeInsets.symmetric(vertical: 1.h),
      padding: EdgeInsets.all(3.w),
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.primaryContainer,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Quick Actions',
            style: Theme.of(context).textTheme.titleSmall?.copyWith(
                  color: Theme.of(context).colorScheme.onPrimaryContainer,
                  fontWeight: FontWeight.w600,
                ),
          ),
          SizedBox(height: 1.h),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              _buildQuickActionButton(
                'Apple',
                'local_dining',
                () {
                  _addQuickFood('Apple', 95, 'Breakfast');
                },
              ),
              _buildQuickActionButton(
                'Water 250ml',
                'local_drink',
                () {
                  _addQuickWater(250);
                },
              ),
              _buildQuickActionButton(
                'Banana',
                'local_dining',
                () {
                  _addQuickFood('Banana', 105, 'Snack');
                },
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildQuickActionButton(
    String label,
    String iconName,
    VoidCallback onTap,
  ) {
    return Expanded(
      child: GestureDetector(
        onTap: onTap,
        child: Container(
          margin: EdgeInsets.symmetric(horizontal: 1.w),
          padding: EdgeInsets.symmetric(vertical: 1.h, horizontal: 2.w),
          decoration: BoxDecoration(
            color: Theme.of(context).colorScheme.surface,
            borderRadius: BorderRadius.circular(8),
            border: Border.all(
              color:
                  Theme.of(context).colorScheme.outline.withValues(alpha: 0.3),
            ),
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              CustomIconWidget(
                iconName: iconName,
                color: Theme.of(context).colorScheme.primary,
                size: 5.w,
              ),
              SizedBox(height: 0.5.h),
              Text(
                label,
                style: Theme.of(context).textTheme.bodySmall?.copyWith(
                      fontSize: 10.sp,
                      fontWeight: FontWeight.w500,
                    ),
                textAlign: TextAlign.center,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _addQuickFood(String foodName, int calories, String mealType) {
    Navigator.pop(context);

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Added $foodName ($calories cal) to $mealType'),
        duration: const Duration(seconds: 2),
        action: SnackBarAction(
          label: 'Undo',
          onPressed: () {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                content: Text('Removed $foodName from $mealType'),
                duration: const Duration(seconds: 1),
              ),
            );
          },
        ),
      ),
    );
  }

  void _addQuickWater(int amount) {
    Navigator.pop(context);

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Added ${amount}ml water to daily intake'),
        duration: const Duration(seconds: 2),
        action: SnackBarAction(
          label: 'Undo',
          onPressed: () {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                content: Text('Removed ${amount}ml water'),
                duration: const Duration(seconds: 1),
              ),
            );
          },
        ),
      ),
    );
  }

  void _showQuickWaterLog() {
    showModalBottomSheet(
      context: context,
      backgroundColor: Theme.of(context).cardColor,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
      ),
      builder: (context) => Container(
        padding: EdgeInsets.all(4.w),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              'Log Water Intake',
              style: Theme.of(context).textTheme.titleLarge?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
            ),
            SizedBox(height: 3.h),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                _buildWaterOption('Glass\n250ml', 250),
                _buildWaterOption('Bottle\n500ml', 500),
                _buildWaterOption('Large\n750ml', 750),
                _buildWaterOption('Custom', 0),
              ],
            ),
            SizedBox(height: 2.h),
          ],
        ),
      ),
    );
  }

  Widget _buildWaterOption(String label, int amount) {
    return GestureDetector(
      onTap: () {
        Navigator.pop(context);
        if (amount == 0) {
          _onTabTapped(2); // Navigate to Water tab for custom amount
        } else {
          _addQuickWater(amount);
        }
      },
      child: Container(
        padding: EdgeInsets.symmetric(vertical: 2.h, horizontal: 3.w),
        decoration: BoxDecoration(
          color: Theme.of(context).colorScheme.primaryContainer,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: Theme.of(context).colorScheme.primary.withValues(alpha: 0.3),
          ),
        ),
        child: Column(
          children: [
            CustomIconWidget(
              iconName: 'local_drink',
              color: Theme.of(context).colorScheme.primary,
              size: 6.w,
            ),
            SizedBox(height: 1.h),
            Text(
              label,
              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    fontWeight: FontWeight.w500,
                  ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildQuickLogOption(String title, String iconName, VoidCallback onTap,
      {required bool showDivider}) {
    return Column(
      children: [
        ListTile(
          leading: CustomIconWidget(
            iconName: iconName,
            color: Theme.of(context).colorScheme.primary,
            size: 6.w,
          ),
          title: Text(
            title,
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  fontWeight: FontWeight.w500,
                ),
          ),
          onTap: onTap,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
          ),
        ),
        if (showDivider)
          Divider(
            height: 1,
            color: Theme.of(context).colorScheme.outline.withValues(alpha: 0.2),
          ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: PageView(
        controller: _pageController,
        onPageChanged: _onPageChanged,
        children: _screens,
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: _onTabTapped,
        type: BottomNavigationBarType.fixed,
        backgroundColor:
            Theme.of(context).bottomNavigationBarTheme.backgroundColor,
        selectedItemColor:
            Theme.of(context).bottomNavigationBarTheme.selectedItemColor,
        unselectedItemColor:
            Theme.of(context).bottomNavigationBarTheme.unselectedItemColor,
        elevation: 8,
        items: [
          BottomNavigationBarItem(
            icon: CustomIconWidget(
              iconName: 'home',
              color: _currentIndex == 0
                  ? Theme.of(context)
                      .bottomNavigationBarTheme
                      .selectedItemColor!
                  : Theme.of(context)
                      .bottomNavigationBarTheme
                      .unselectedItemColor!,
              size: 6.w,
            ),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: CustomIconWidget(
              iconName: 'restaurant',
              color: _currentIndex == 1
                  ? Theme.of(context)
                      .bottomNavigationBarTheme
                      .selectedItemColor!
                  : Theme.of(context)
                      .bottomNavigationBarTheme
                      .unselectedItemColor!,
              size: 6.w,
            ),
            label: 'Food Log',
          ),
          BottomNavigationBarItem(
            icon: CustomIconWidget(
              iconName: 'local_drink',
              color: _currentIndex == 2
                  ? Theme.of(context)
                      .bottomNavigationBarTheme
                      .selectedItemColor!
                  : Theme.of(context)
                      .bottomNavigationBarTheme
                      .unselectedItemColor!,
              size: 6.w,
            ),
            label: 'Water',
          ),
          BottomNavigationBarItem(
            icon: CustomIconWidget(
              iconName: 'person',
              color: _currentIndex == 3
                  ? Theme.of(context)
                      .bottomNavigationBarTheme
                      .selectedItemColor!
                  : Theme.of(context)
                      .bottomNavigationBarTheme
                      .unselectedItemColor!,
              size: 6.w,
            ),
            label: 'Profile',
          ),
        ],
      ),
    );
  }
}

// Content widgets without navigation bars
class DashboardHomeContent extends StatelessWidget {
  const DashboardHomeContent({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const DashboardHome();
  }
}

class FoodSearchAndLoggingContent extends StatelessWidget {
  const FoodSearchAndLoggingContent({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const FoodSearchAndLogging();
  }
}

class WaterTrackingContent extends StatelessWidget {
  const WaterTrackingContent({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const WaterTracking();
  }
}

class ProfileAndSettingsContent extends StatelessWidget {
  const ProfileAndSettingsContent({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const ProfileAndSettings();
  }
}
