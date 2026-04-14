import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../widgets/main_layout_wrapper.dart';
import './widgets/calendar_header_widget.dart';
import './widgets/day_detail_modal_widget.dart';
import './widgets/monthly_view_widget.dart';
import './widgets/recipe_suggestions_widget.dart';
import './widgets/weekly_view_widget.dart';

class MealPlanningCalendar extends StatefulWidget {
  const MealPlanningCalendar({Key? key}) : super(key: key);

  @override
  State<MealPlanningCalendar> createState() => _MealPlanningCalendarState();
}

class _MealPlanningCalendarState extends State<MealPlanningCalendar> {
  bool _isWeekView = true;
  DateTime _currentDate = DateTime.now();
  DateTime _selectedDay = DateTime.now();
  bool _isRefreshing = false;

  // Mock meal data storage
  Map<String, List<Map<String, dynamic>>> _mealPlans = {};

  @override
  void initState() {
    super.initState();
    _initializeMockData();
  }

  void _initializeMockData() {
    final today = DateTime.now();
    final todayKey =
        '${today.year}-${today.month.toString().padLeft(2, '0')}-${today.day.toString().padLeft(2, '0')}';
    final tomorrowKey =
        '${today.add(const Duration(days: 1)).year}-${today.add(const Duration(days: 1)).month.toString().padLeft(2, '0')}-${today.add(const Duration(days: 1)).day.toString().padLeft(2, '0')}';

    _mealPlans = {
      todayKey: [
        {
          "id": 1,
          "name": "Avocado Toast with Poached Egg",
          "type": "breakfast",
          "description":
              "Creamy avocado on sourdough with perfectly poached egg",
          "calories": 320,
          "prepTime": "10 min",
          "image":
              "https://images.unsplash.com/photo-1600753871518-4ab710ae2918",
          "semanticLabel":
              "Sliced avocado on toasted bread topped with a poached egg and herbs on a white plate"
        },
        {
          "id": 2,
          "name": "Quinoa Buddha Bowl",
          "type": "lunch",
          "description":
              "Nutritious quinoa with roasted vegetables and tahini dressing",
          "calories": 450,
          "prepTime": "25 min",
          "image":
              "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf",
          "semanticLabel":
              "Colorful bowl with quinoa, roasted vegetables, chickpeas, and green tahini dressing"
        },
      ],
      tomorrowKey: [
        {
          "id": 3,
          "name": "Greek Yogurt Berry Bowl",
          "type": "breakfast",
          "description":
              "Protein-rich Greek yogurt with fresh berries and granola",
          "calories": 280,
          "prepTime": "5 min",
          "image":
              "https://images.unsplash.com/photo-1531159713871-a2cb8b772c84",
          "semanticLabel":
              "Bowl of white Greek yogurt topped with mixed berries and granola on a wooden table"
        },
      ],
    };
  }

  void _toggleView() {
    setState(() {
      _isWeekView = !_isWeekView;
    });
  }

  void _navigateWeek(bool forward) {
    setState(() {
      _currentDate = _currentDate.add(Duration(days: forward ? 7 : -7));
    });
  }

  void _navigateMonth(bool forward) {
    setState(() {
      if (forward) {
        _currentDate = DateTime(_currentDate.year, _currentDate.month + 1, 1);
      } else {
        _currentDate = DateTime(_currentDate.year, _currentDate.month - 1, 1);
      }
    });
  }

  void _onDaySelected(DateTime selectedDay) {
    setState(() {
      _selectedDay = selectedDay;
    });

    final dateKey =
        '${selectedDay.year}-${selectedDay.month.toString().padLeft(2, '0')}-${selectedDay.day.toString().padLeft(2, '0')}';
    final dayMeals = _mealPlans[dateKey] ?? [];

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => DayDetailModalWidget(
        selectedDate: selectedDay,
        dayMeals: dayMeals,
        onMealPlanned: _onMealPlanned,
        onMealRemoved: _onMealRemoved,
        onMealEdited: _onMealEdited,
      ),
    );
  }

  void _onMealPlanned(
      String dateKey, String mealType, Map<String, dynamic> meal) {
    setState(() {
      if (_mealPlans[dateKey] == null) {
        _mealPlans[dateKey] = [];
      }

      // Remove existing meal of the same type
      _mealPlans[dateKey]!.removeWhere(
          (existingMeal) => (existingMeal['type'] as String) == mealType);

      // Add new meal with type
      final mealWithType = Map<String, dynamic>.from(meal);
      mealWithType['type'] = mealType;
      _mealPlans[dateKey]!.add(mealWithType);
    });
  }

  void _onMealRemoved(String dateKey, String mealType) {
    setState(() {
      if (_mealPlans[dateKey] != null) {
        _mealPlans[dateKey]!
            .removeWhere((meal) => (meal['type'] as String) == mealType);

        if (_mealPlans[dateKey]!.isEmpty) {
          _mealPlans.remove(dateKey);
        }
      }
    });
  }

  void _onMealEdited(
      String dateKey, String mealType, Map<String, dynamic> meal) {
    // For now, just show the meal selection modal
    // In a real app, this would open an edit modal
    _onMealPlanned(dateKey, mealType, meal);
  }

  void _onRecipeSelected(Map<String, dynamic> recipe) {
    // Quick add to today's meal plan
    final today = DateTime.now();
    final todayKey =
        '${today.year}-${today.month.toString().padLeft(2, '0')}-${today.day.toString().padLeft(2, '0')}';
    final mealType = recipe['type'] as String;

    _onMealPlanned(todayKey, mealType, recipe);

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Added ${recipe['name']} to today\'s ${mealType}'),
        backgroundColor: AppTheme.lightTheme.colorScheme.primary,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
      ),
    );
  }

  Future<void> _onRefresh() async {
    setState(() {
      _isRefreshing = true;
    });

    // Simulate network refresh
    await Future.delayed(const Duration(seconds: 1));

    setState(() {
      _isRefreshing = false;
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: const Text('Meal plans synchronized'),
        backgroundColor: AppTheme.lightTheme.colorScheme.primary,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
      ),
    );
  }

  void _showQuickPlanModal() {
    final today = DateTime.now();
    final todayKey =
        '${today.year}-${today.month.toString().padLeft(2, '0')}-${today.day.toString().padLeft(2, '0')}';
    final dayMeals = _mealPlans[todayKey] ?? [];

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => DayDetailModalWidget(
        selectedDate: today,
        dayMeals: dayMeals,
        onMealPlanned: _onMealPlanned,
        onMealRemoved: _onMealRemoved,
        onMealEdited: _onMealEdited,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;

    return MainLayoutWrapper(
      currentIndex: 2, // Plan tab
      child: Scaffold(
        backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
        appBar: AppBar(
          title: Text(
            'Meal Calendar',
            style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  color: AppTheme.lightTheme.colorScheme.onSurface,
                  fontWeight: FontWeight.w600,
                ),
          ),
          backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
          elevation: 0,
          leading: IconButton(
            onPressed: () => Navigator.pop(context),
            icon: CustomIconWidget(
              iconName: 'arrow_back',
              color: AppTheme.lightTheme.colorScheme.onSurface,
              size: 24,
            ),
          ),
          actions: [
            if (_isRefreshing)
              Padding(
                padding: EdgeInsets.all(4.w),
                child: SizedBox(
                  width: 20,
                  height: 20,
                  child: CircularProgressIndicator(
                    strokeWidth: 2,
                    valueColor: AlwaysStoppedAnimation<Color>(
                      AppTheme.lightTheme.colorScheme.primary,
                    ),
                  ),
                ),
              )
            else
              IconButton(
                onPressed: _onRefresh,
                icon: CustomIconWidget(
                  iconName: 'refresh',
                  color: AppTheme.lightTheme.colorScheme.onSurface,
                  size: 24,
                ),
              ),
          ],
        ),
        body: RefreshIndicator(
          onRefresh: _onRefresh,
          color: AppTheme.lightTheme.colorScheme.primary,
          child: Column(
            children: [
              CalendarHeaderWidget(
                isWeekView: _isWeekView,
                onToggleView: _toggleView,
                currentDate: _currentDate,
                onPreviousWeek: () => _navigateWeek(false),
                onNextWeek: () => _navigateWeek(true),
                onPreviousMonth: () => _navigateMonth(false),
                onNextMonth: () => _navigateMonth(true),
              ),
              Expanded(
                child: _isWeekView
                    ? WeeklyViewWidget(
                        currentWeek: _currentDate,
                        weeklyMeals: _mealPlans,
                        onMealPlanned: _onMealPlanned,
                        onMealRemoved: _onMealRemoved,
                        onMealEdited: _onMealEdited,
                      )
                    : SingleChildScrollView(
                        child: Column(
                          children: [
                            MonthlyViewWidget(
                              currentMonth: _currentDate,
                              monthlyMeals: _mealPlans,
                              onDaySelected: _onDaySelected,
                              selectedDay: _selectedDay,
                            ),
                            SizedBox(height: 2.h),
                          ],
                        ),
                      ),
              ),
              RecipeSuggestionsWidget(
                onRecipeSelected: _onRecipeSelected,
              ),
            ],
          ),
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: _showQuickPlanModal,
          backgroundColor: AppTheme.lightTheme.colorScheme.primary,
          child: CustomIconWidget(
            iconName: 'add',
            color: AppTheme.lightTheme.colorScheme.onPrimary,
            size: 24,
          ),
        ),
      ),
    );
  }
}
