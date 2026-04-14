import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../widgets/main_layout_wrapper.dart';
import './widgets/greeting_header_widget.dart';
import './widgets/plan_meal_modal_widget.dart';
import './widgets/quick_action_card_widget.dart';
import './widgets/weekly_meal_card_widget.dart';
import './widgets/wellness_tip_card_widget.dart';

class MealPlanningDashboard extends StatefulWidget {
  const MealPlanningDashboard({Key? key}) : super(key: key);

  @override
  State<MealPlanningDashboard> createState() => _MealPlanningDashboardState();
}

class _MealPlanningDashboardState extends State<MealPlanningDashboard> {
  int _currentBottomNavIndex = 0;
  bool _isRefreshing = false;

  final List<Map<String, dynamic>> _weeklyMealData = [
    {
      "dayName": "Mon",
      "date": "Nov 4",
      "isToday": false,
      "meals": [
        {
          "name": "Oatmeal Bowl",
          "type": "Breakfast",
          "image":
              "https://images.unsplash.com/photo-1630234674868-404d00118f7e",
          "semanticLabel":
              "Bowl of creamy oatmeal topped with fresh berries, nuts, and honey drizzle on wooden table"
        },
        {
          "name": "Quinoa Salad",
          "type": "Lunch",
          "image":
              "https://images.unsplash.com/photo-1656853834420-51980b12a920",
          "semanticLabel":
              "Colorful quinoa salad with cherry tomatoes, cucumber, and herbs in a white bowl"
        },
      ]
    },
    {
      "dayName": "Tue",
      "date": "Nov 5",
      "isToday": false,
      "meals": [
        {
          "name": "Green Smoothie",
          "type": "Breakfast",
          "image":
              "https://images.unsplash.com/photo-1664467488537-e570dfede89f",
          "semanticLabel":
              "Vibrant green smoothie in a tall glass garnished with mint leaves and chia seeds"
        },
        {
          "name": "Chicken Wrap",
          "type": "Lunch",
          "image":
              "https://images.unsplash.com/photo-1630914441321-4e353a4c89f9",
          "semanticLabel":
              "Grilled chicken wrap with lettuce, tomatoes, and sauce in tortilla on white plate"
        },
      ]
    },
    {
      "dayName": "Wed",
      "date": "Nov 6",
      "isToday": false,
      "meals": [
        {
          "name": "Yogurt Parfait",
          "type": "Breakfast",
          "image":
              "https://images.unsplash.com/photo-1691455653742-ea1aded33376",
          "semanticLabel":
              "Greek yogurt parfait layered with granola, berries, and honey in tall glass"
        },
        {
          "name": "Veggie Stir Fry",
          "type": "Lunch",
          "image":
              "https://images.unsplash.com/photo-1619638337289-76f700067719",
          "semanticLabel":
              "Colorful vegetable stir fry with bell peppers, broccoli, and carrots in wok"
        },
        {
          "name": "Pasta Primavera",
          "type": "Dinner",
          "image":
              "https://images.unsplash.com/photo-1662478839788-7d2898ca66cf",
          "semanticLabel":
              "Pasta primavera with fresh vegetables and herbs in white ceramic bowl"
        },
      ]
    },
    {
      "dayName": "Thu",
      "date": "Nov 7",
      "isToday": false,
      "meals": [
        {
          "name": "Avocado Toast",
          "type": "Breakfast",
          "image":
              "https://images.unsplash.com/photo-1725189575269-44b5d2b3241a",
          "semanticLabel":
              "Sliced avocado on toasted bread with cherry tomatoes and microgreens on white plate"
        },
        {
          "name": "Buddha Bowl",
          "type": "Lunch",
          "image":
              "https://images.unsplash.com/photo-1568588849986-44e45a5bb5f2",
          "semanticLabel":
              "Colorful Buddha bowl with roasted vegetables, quinoa, and tahini dressing in ceramic bowl"
        },
        {
          "name": "Grilled Salmon",
          "type": "Dinner",
          "image":
              "https://images.unsplash.com/photo-1589898489661-fe21552ad67c",
          "semanticLabel":
              "Perfectly grilled salmon fillet with lemon and herbs on dark slate plate"
        },
      ]
    },
    {
      "dayName": "Fri",
      "date": "Nov 8",
      "isToday": true,
      "meals": [
        {
          "name": "Chia Pudding",
          "type": "Breakfast",
          "image":
              "https://images.unsplash.com/photo-1591090909710-b6151c0d3d68",
          "semanticLabel":
              "Creamy chia pudding topped with fresh berries and coconut flakes in glass jar"
        },
        {
          "name": "Mediterranean Wrap",
          "type": "Lunch",
          "image":
              "https://images.unsplash.com/photo-1658708009339-cae435c7d672",
          "semanticLabel":
              "Whole wheat wrap filled with hummus, vegetables, and feta cheese cut in half"
        },
      ]
    },
    {
      "dayName": "Sat",
      "date": "Nov 9",
      "isToday": false,
      "meals": [
        {
          "name": "Smoothie Bowl",
          "type": "Breakfast",
          "image":
              "https://images.unsplash.com/photo-1641579719214-534970165dc9",
          "semanticLabel":
              "Acai smoothie bowl topped with fresh fruits, granola, and coconut flakes in white bowl"
        },
        {
          "name": "Caesar Salad",
          "type": "Lunch",
          "image":
              "https://images.unsplash.com/photo-1598148147984-fe53fb44a15d",
          "semanticLabel":
              "Fresh Caesar salad with romaine lettuce, croutons, and parmesan cheese in ceramic bowl"
        },
      ]
    },
    {
      "dayName": "Sun",
      "date": "Nov 10",
      "isToday": false,
      "meals": [
        {
          "name": "Pancakes",
          "type": "Breakfast",
          "image":
              "https://images.unsplash.com/photo-1579008840349-a7253c71a754",
          "semanticLabel":
              "Stack of fluffy pancakes with fresh berries and maple syrup on white plate"
        },
        {
          "name": "Veggie Burger",
          "type": "Lunch",
          "image":
              "https://images.unsplash.com/photo-1641601905519-70554cb7b8c1",
          "semanticLabel":
              "Plant-based veggie burger with lettuce, tomato, and avocado on sesame bun"
        },
      ]
    },
  ];

  final List<Map<String, dynamic>> _quickActions = [
    {"title": "Seasonal Recipes", "icon": "eco", "route": "/recipe-discovery"},
    {
      "title": "Mindful Timer",
      "icon": "timer",
      "route": "/mindful-eating-timer"
    },
    {
      "title": "Wellness Progress",
      "icon": "trending_up",
      "route": "/user-profile"
    },
  ];

  final Map<String, dynamic> _wellnessTip = {
    "title": "Mindful Eating This Week",
    "description":
        "Focus on eating slowly and savoring each bite. Take time to appreciate the colors, textures, and flavors of your meals. This practice helps improve digestion and increases meal satisfaction.",
    "tips": [
      "Put your fork down between bites",
      "Chew each bite 20-30 times",
      "Eat without distractions like TV or phone",
      "Notice when you feel satisfied, not full"
    ]
  };

  @override
  Widget build(BuildContext context) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;

    return MainLayoutWrapper(
      currentIndex: 0, // Dashboard tab
      child: Scaffold(
        backgroundColor:
            isDarkMode ? AppTheme.backgroundDark : AppTheme.backgroundLight,
        body: SafeArea(
          child: RefreshIndicator(
            onRefresh: _handleRefresh,
            color: isDarkMode ? AppTheme.primaryDark : AppTheme.primaryLight,
            child: CustomScrollView(
              slivers: [
                SliverToBoxAdapter(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      GreetingHeaderWidget(
                        userName: "Sarah",
                        greeting: _getGreeting(),
                      ),
                      SizedBox(height: 2.h),
                      _buildWeeklyMealSection(context, isDarkMode),
                      SizedBox(height: 3.h),
                      _buildQuickActionsSection(context, isDarkMode),
                      SizedBox(height: 3.h),
                      WellnessTipCardWidget(tipData: _wellnessTip),
                      SizedBox(height: 10.h), // Bottom padding for FAB
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
        floatingActionButton: _buildFloatingActionButton(context, isDarkMode),
        floatingActionButtonLocation: FloatingActionButtonLocation.endFloat,
      ),
    );
  }

  Widget _buildWeeklyMealSection(BuildContext context, bool isDarkMode) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: EdgeInsets.symmetric(horizontal: 4.w),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'This Week',
                style: Theme.of(context).textTheme.titleLarge,
              ),
              GestureDetector(
                onTap: () =>
                    Navigator.pushNamed(context, '/meal-planning-calendar'),
                child: Text(
                  'View Calendar',
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        color: isDarkMode
                            ? AppTheme.primaryDark
                            : AppTheme.primaryLight,
                        fontWeight: FontWeight.w500,
                      ),
                ),
              ),
            ],
          ),
        ),
        SizedBox(height: 2.h),
        Container(
          height: 20.h,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            padding: EdgeInsets.only(left: 4.w),
            itemCount: _weeklyMealData.length,
            itemBuilder: (context, index) {
              final dayData = _weeklyMealData[index];
              return WeeklyMealCardWidget(
                dayData: dayData,
                isToday: dayData["isToday"] as bool,
                onTap: () => _onDayCardTapped(dayData),
              );
            },
          ),
        ),
      ],
    );
  }

  Widget _buildQuickActionsSection(BuildContext context, bool isDarkMode) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: EdgeInsets.symmetric(horizontal: 4.w),
          child: Text(
            'Quick Actions',
            style: Theme.of(context).textTheme.titleLarge,
          ),
        ),
        SizedBox(height: 2.h),
        Container(
          height: 12.h,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            padding: EdgeInsets.only(left: 4.w),
            itemCount: _quickActions.length,
            itemBuilder: (context, index) {
              final action = _quickActions[index];
              return QuickActionCardWidget(
                actionData: action,
                onTap: () => _onQuickActionTapped(action),
              );
            },
          ),
        ),
      ],
    );
  }

  Widget _buildFloatingActionButton(BuildContext context, bool isDarkMode) {
    return FloatingActionButton.extended(
      onPressed: () => _showPlanMealModal(context),
      backgroundColor:
          isDarkMode ? AppTheme.primaryDark : AppTheme.primaryLight,
      foregroundColor:
          isDarkMode ? AppTheme.onPrimaryDark : AppTheme.onPrimaryLight,
      icon: CustomIconWidget(
        iconName: 'add',
        color: isDarkMode ? AppTheme.onPrimaryDark : AppTheme.onPrimaryLight,
        size: 24,
      ),
      label: Text(
        'Plan Meal',
        style: Theme.of(context).textTheme.labelLarge?.copyWith(
              color:
                  isDarkMode ? AppTheme.onPrimaryDark : AppTheme.onPrimaryLight,
            ),
      ),
    );
  }

  String _getGreeting() {
    final hour = DateTime.now().hour;
    if (hour < 12) {
      return 'Good morning,';
    } else if (hour < 17) {
      return 'Good afternoon,';
    } else {
      return 'Good evening,';
    }
  }

  Future<void> _handleRefresh() async {
    setState(() => _isRefreshing = true);

    // Simulate refresh delay
    await Future.delayed(Duration(seconds: 1));

    setState(() => _isRefreshing = false);
  }

  void _onDayCardTapped(Map<String, dynamic> dayData) {
    Navigator.pushNamed(context, '/meal-planning-calendar');
  }

  void _onQuickActionTapped(Map<String, dynamic> action) {
    final route = action["route"] as String;
    Navigator.pushNamed(context, route);
  }

  void _onBottomNavTapped(int index) {
    setState(() => _currentBottomNavIndex = index);

    switch (index) {
      case 0:
        // Already on Dashboard
        break;
      case 1:
        Navigator.pushNamed(context, '/recipe-discovery');
        break;
      case 2:
        Navigator.pushNamed(context, '/meal-planning-calendar');
        break;
      case 3:
        Navigator.pushNamed(context, '/grocery-list');
        break;
      case 4:
        Navigator.pushNamed(context, '/user-profile');
        break;
    }
  }

  void _showPlanMealModal(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => PlanMealModalWidget(
        onMealPlanned: (meal) {
          // Handle meal planning logic here
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text('${meal["name"]} planned successfully!'),
              backgroundColor: Theme.of(context).colorScheme.primary,
            ),
          );
        },
      ),
    );
  }
}
