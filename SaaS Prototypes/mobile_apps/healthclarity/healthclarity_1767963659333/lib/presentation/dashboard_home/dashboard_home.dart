import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/calorie_ring_widget.dart';
import './widgets/greeting_header_widget.dart';
import './widgets/macro_progress_widget.dart';
import './widgets/meal_card_widget.dart';
import './widgets/water_intake_widget.dart';

class DashboardHome extends StatefulWidget {
  const DashboardHome({Key? key}) : super(key: key);

  @override
  State<DashboardHome> createState() => _DashboardHomeState();
}

class _DashboardHomeState extends State<DashboardHome>
    with TickerProviderStateMixin {
  int _waterIntake = 1500; // ml
  final int _targetWaterIntake = 2500; // ml
  bool _isReducedMotion = false;

  // Mock user data
  final String _userName = "Sarah";
  final int _streakCount = 7;
  final DateTime _currentDate = DateTime.now();

  // Mock calorie data
  final int _consumedCalories = 1450;
  final int _totalCalories = 2000;

  // Mock macro data
  final Map<String, dynamic> _macroData = {
    'carbs': {'consumed': 180.0, 'target': 250.0},
    'protein': {'consumed': 85.0, 'target': 120.0},
    'fats': {'consumed': 45.0, 'target': 65.0},
  };

  // Mock recent meals data
  final List<Map<String, dynamic>> _recentMeals = [
    {
      'id': 1,
      'name': 'Grilled Chicken Salad',
      'type': 'Lunch',
      'calories': 420,
      'time': '12:30 PM',
      'image':
          'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      'id': 2,
      'name': 'Greek Yogurt with Berries',
      'type': 'Snack',
      'calories': 180,
      'time': '10:15 AM',
      'image':
          'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      'id': 3,
      'name': 'Avocado Toast',
      'type': 'Breakfast',
      'calories': 320,
      'time': '8:00 AM',
      'image':
          'https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  @override
  void initState() {
    super.initState();
    _checkReducedMotion();
  }

  void _checkReducedMotion() {
    // In a real app, this would check system accessibility settings
    setState(() {
      _isReducedMotion = false; // Default to false for demo
    });
  }

  void _updateWaterIntake(int newIntake) {
    setState(() {
      _waterIntake = newIntake.clamp(0, 5000);
    });
  }

  void _onMealEdit(Map<String, dynamic> meal) {
    Navigator.pushNamed(context, AppRoutes.foodSearchAndLogging);
  }

  void _onMealDelete(Map<String, dynamic> meal) {
    setState(() {
      _recentMeals.removeWhere((m) => m['id'] == meal['id']);
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('${meal['name']} deleted'),
        action: SnackBarAction(
          label: 'Undo',
          onPressed: () {
            setState(() {
              _recentMeals.add(meal);
            });
          },
        ),
      ),
    );
  }

  void _onMealDuplicate(Map<String, dynamic> meal) {
    final duplicatedMeal = Map<String, dynamic>.from(meal);
    duplicatedMeal['id'] = DateTime.now().millisecondsSinceEpoch;
    duplicatedMeal['time'] = 'Just now';

    setState(() {
      _recentMeals.insert(0, duplicatedMeal);
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('${meal['name']} duplicated')),
    );
  }

  Future<void> _onRefresh() async {
    await Future.delayed(const Duration(milliseconds: 1000));
    // In a real app, this would sync data from server
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Data refreshed')),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      body: SafeArea(
        child: RefreshIndicator(
          onRefresh: _onRefresh,
          color: AppTheme.calorieAccent,
          child: CustomScrollView(
            slivers: [
              // Greeting Header
              SliverToBoxAdapter(
                child: GreetingHeaderWidget(
                  userName: _userName,
                  streakCount: _streakCount,
                  currentDate: _currentDate,
                ),
              ),

              // Calorie Ring
              SliverToBoxAdapter(
                child: Container(
                  padding: EdgeInsets.symmetric(vertical: 2.h),
                  child: Center(
                    child: CalorieRingWidget(
                      consumedCalories: _consumedCalories,
                      totalCalories: _totalCalories,
                      isReducedMotion: _isReducedMotion,
                    ),
                  ),
                ),
              ),

              // Macro Progress
              SliverToBoxAdapter(
                child: MacroProgressWidget(macroData: _macroData),
              ),

              // Water Intake
              SliverToBoxAdapter(
                child: WaterIntakeWidget(
                  currentIntake: _waterIntake,
                  targetIntake: _targetWaterIntake,
                  onIntakeUpdate: _updateWaterIntake,
                ),
              ),

              // Recent Meals Header
              SliverToBoxAdapter(
                child: Padding(
                  padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Recent Meals',
                        style:
                            Theme.of(context).textTheme.titleMedium?.copyWith(
                                  fontWeight: FontWeight.w600,
                                  fontSize: 16.sp,
                                ),
                      ),
                      TextButton(
                        onPressed: () => Navigator.pushNamed(
                            context, AppRoutes.foodLogHistory),
                        child: Text(
                          'View All',
                          style:
                              Theme.of(context).textTheme.bodyMedium?.copyWith(
                                    color: AppTheme.calorieAccent,
                                    fontWeight: FontWeight.w500,
                                  ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),

              // Recent Meals List
              _recentMeals.isEmpty
                  ? SliverToBoxAdapter(
                      child: Container(
                        padding: EdgeInsets.all(8.w),
                        child: Column(
                          children: [
                            CustomIconWidget(
                              iconName: 'restaurant',
                              color: Theme.of(context)
                                  .colorScheme
                                  .onSurfaceVariant
                                  .withValues(alpha: 0.5),
                              size: 15.w,
                            ),
                            SizedBox(height: 2.h),
                            Text(
                              'No meals logged today',
                              style: Theme.of(context)
                                  .textTheme
                                  .titleMedium
                                  ?.copyWith(
                                    color: Theme.of(context)
                                        .colorScheme
                                        .onSurfaceVariant,
                                  ),
                            ),
                            SizedBox(height: 1.h),
                            Text(
                              'Tap the + button to log your first meal',
                              style: Theme.of(context)
                                  .textTheme
                                  .bodyMedium
                                  ?.copyWith(
                                    color: Theme.of(context)
                                        .colorScheme
                                        .onSurfaceVariant,
                                  ),
                              textAlign: TextAlign.center,
                            ),
                          ],
                        ),
                      ),
                    )
                  : SliverList(
                      delegate: SliverChildBuilderDelegate(
                        (context, index) {
                          return MealCardWidget(
                            mealData: _recentMeals[index],
                            onEdit: _onMealEdit,
                            onDelete: _onMealDelete,
                            onDuplicate: _onMealDuplicate,
                          );
                        },
                        childCount: _recentMeals.length,
                      ),
                    ),

              // Bottom padding for FAB and bottom nav
              SliverToBoxAdapter(
                child: SizedBox(height: 15.h),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
