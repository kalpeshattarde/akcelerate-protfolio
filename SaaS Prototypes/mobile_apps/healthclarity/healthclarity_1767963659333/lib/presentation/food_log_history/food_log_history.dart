import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/daily_summary_widget.dart';
import './widgets/date_picker_header_widget.dart';
import './widgets/empty_state_widget.dart';
import './widgets/meal_section_widget.dart';

class FoodLogHistory extends StatefulWidget {
  const FoodLogHistory({super.key});

  @override
  State<FoodLogHistory> createState() => _FoodLogHistoryState();
}

class _FoodLogHistoryState extends State<FoodLogHistory> {
  DateTime _selectedDate = DateTime.now();
  String _searchQuery = '';
  bool _isLoading = false;
  List<String> _selectedItems = [];
  bool _isSelectionMode = false;

  // Mock data for food log history
  final Map<String, List<Map<String, dynamic>>> _foodLogData = {
    'breakfast': [
      {
        "id": 1,
        "name": "Oatmeal with Berries",
        "portion": "1 cup",
        "calories": 320,
        "carbs": 54,
        "protein": 12,
        "fats": 8,
        "image":
            "https://images.pexels.com/photos/4828333/pexels-photo-4828333.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "timestamp": "8:30 AM"
      },
      {
        "id": 2,
        "name": "Greek Yogurt",
        "portion": "1 container (170g)",
        "calories": 150,
        "carbs": 8,
        "protein": 20,
        "fats": 4,
        "image":
            "https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "timestamp": "8:45 AM"
      },
    ],
    'lunch': [
      {
        "id": 3,
        "name": "Grilled Chicken Salad",
        "portion": "1 large bowl",
        "calories": 420,
        "carbs": 15,
        "protein": 35,
        "fats": 22,
        "image":
            "https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "timestamp": "12:30 PM"
      },
      {
        "id": 4,
        "name": "Quinoa Bowl",
        "portion": "1 cup",
        "calories": 280,
        "carbs": 45,
        "protein": 12,
        "fats": 6,
        "image":
            "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "timestamp": "1:00 PM"
      },
    ],
    'dinner': [
      {
        "id": 5,
        "name": "Salmon with Vegetables",
        "portion": "6 oz fillet + 1 cup veggies",
        "calories": 450,
        "carbs": 12,
        "protein": 40,
        "fats": 28,
        "image":
            "https://images.pexels.com/photos/1516415/pexels-photo-1516415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "timestamp": "7:00 PM"
      },
    ],
    'snacks': [
      {
        "id": 6,
        "name": "Mixed Nuts",
        "portion": "1 oz (28g)",
        "calories": 170,
        "carbs": 6,
        "protein": 6,
        "fats": 15,
        "image":
            "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "timestamp": "3:30 PM"
      },
      {
        "id": 7,
        "name": "Apple with Peanut Butter",
        "portion": "1 medium apple + 2 tbsp PB",
        "calories": 280,
        "carbs": 32,
        "protein": 8,
        "fats": 16,
        "image":
            "https://images.pexels.com/photos/209439/pexels-photo-209439.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "timestamp": "9:30 PM"
      },
    ],
  };

  // Daily goals
  final double _calorieGoal = 2000;
  final double _carbGoal = 250;
  final double _proteinGoal = 150;
  final double _fatGoal = 67;

  List<Map<String, dynamic>> get _filteredBreakfast {
    if (_searchQuery.isEmpty) return _foodLogData['breakfast'] ?? [];
    return (_foodLogData['breakfast'] ?? [])
        .where((item) => (item['name'] as String)
            .toLowerCase()
            .contains(_searchQuery.toLowerCase()))
        .toList();
  }

  List<Map<String, dynamic>> get _filteredLunch {
    if (_searchQuery.isEmpty) return _foodLogData['lunch'] ?? [];
    return (_foodLogData['lunch'] ?? [])
        .where((item) => (item['name'] as String)
            .toLowerCase()
            .contains(_searchQuery.toLowerCase()))
        .toList();
  }

  List<Map<String, dynamic>> get _filteredDinner {
    if (_searchQuery.isEmpty) return _foodLogData['dinner'] ?? [];
    return (_foodLogData['dinner'] ?? [])
        .where((item) => (item['name'] as String)
            .toLowerCase()
            .contains(_searchQuery.toLowerCase()))
        .toList();
  }

  List<Map<String, dynamic>> get _filteredSnacks {
    if (_searchQuery.isEmpty) return _foodLogData['snacks'] ?? [];
    return (_foodLogData['snacks'] ?? [])
        .where((item) => (item['name'] as String)
            .toLowerCase()
            .contains(_searchQuery.toLowerCase()))
        .toList();
  }

  bool get _hasAnyFood {
    return _filteredBreakfast.isNotEmpty ||
        _filteredLunch.isNotEmpty ||
        _filteredDinner.isNotEmpty ||
        _filteredSnacks.isNotEmpty;
  }

  double get _totalCalories {
    double total = 0;
    for (final meal in _foodLogData.values) {
      for (final food in meal) {
        total += (food['calories'] as num).toDouble();
      }
    }
    return total;
  }

  double get _totalCarbs {
    double total = 0;
    for (final meal in _foodLogData.values) {
      for (final food in meal) {
        total += (food['carbs'] as num).toDouble();
      }
    }
    return total;
  }

  double get _totalProtein {
    double total = 0;
    for (final meal in _foodLogData.values) {
      for (final food in meal) {
        total += (food['protein'] as num).toDouble();
      }
    }
    return total;
  }

  double get _totalFats {
    double total = 0;
    for (final meal in _foodLogData.values) {
      for (final food in meal) {
        total += (food['fats'] as num).toDouble();
      }
    }
    return total;
  }

  double _getMealCalories(String mealType) {
    final meals = _foodLogData[mealType] ?? [];
    return meals.fold(
        0.0, (sum, food) => sum + (food['calories'] as num).toDouble());
  }

  String _getMealTimestamp(String mealType) {
    final meals = _foodLogData[mealType] ?? [];
    if (meals.isEmpty) return '';
    return meals.first['timestamp'] ?? '';
  }

  Future<void> _refreshData() async {
    setState(() {
      _isLoading = true;
    });

    // Simulate API call
    await Future.delayed(const Duration(seconds: 1));

    setState(() {
      _isLoading = false;
    });

    Fluttertoast.showToast(
      msg: "Food log refreshed",
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
    );
  }

  void _onDateChanged(DateTime newDate) {
    setState(() {
      _selectedDate = newDate;
    });
  }

  void _onEditPortion(Map<String, dynamic> foodEntry) {
    HapticFeedback.lightImpact();
    _showPortionEditDialog(foodEntry);
  }

  void _onDuplicate(Map<String, dynamic> foodEntry) {
    HapticFeedback.lightImpact();
    Fluttertoast.showToast(
      msg: "Food item duplicated",
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
    );
  }

  void _onMoveMeal(Map<String, dynamic> foodEntry) {
    HapticFeedback.lightImpact();
    _showMoveMealDialog(foodEntry);
  }

  void _onDelete(Map<String, dynamic> foodEntry) {
    HapticFeedback.mediumImpact();

    // Find and remove the food entry from the appropriate meal
    for (final mealType in _foodLogData.keys) {
      final meals = _foodLogData[mealType] ?? [];
      meals.removeWhere((item) => item['id'] == foodEntry['id']);
    }

    setState(() {});

    Fluttertoast.showToast(
      msg: "Food item deleted",
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
    );
  }

  void _onViewDetails(Map<String, dynamic> foodEntry) {
    _showNutritionDetailsDialog(foodEntry);
  }

  void _onAddToFavorites(Map<String, dynamic> foodEntry) {
    Fluttertoast.showToast(
      msg: "Added to favorites",
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
    );
  }

  void _onShareMeal(Map<String, dynamic> foodEntry) {
    Fluttertoast.showToast(
      msg: "Meal shared successfully",
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
    );
  }

  void _showPortionEditDialog(Map<String, dynamic> foodEntry) {
    final TextEditingController portionController = TextEditingController(
      text: foodEntry['portion'] ?? '1 serving',
    );

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(
          'Edit Portion',
          style: AppTheme.lightTheme.textTheme.titleLarge,
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              foodEntry['name'] ?? 'Unknown Food',
              style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                color: AppTheme.calorieAccent,
              ),
            ),
            SizedBox(height: 2.h),
            TextField(
              controller: portionController,
              decoration: const InputDecoration(
                labelText: 'Portion Size',
                hintText: 'e.g., 1 cup, 100g, 2 slices',
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              foodEntry['portion'] = portionController.text;
              setState(() {});
              Navigator.pop(context);
              Fluttertoast.showToast(
                msg: "Portion updated",
                toastLength: Toast.LENGTH_SHORT,
                gravity: ToastGravity.BOTTOM,
              );
            },
            child: const Text('Update'),
          ),
        ],
      ),
    );
  }

  void _showMoveMealDialog(Map<String, dynamic> foodEntry) {
    final List<String> mealTypes = ['breakfast', 'lunch', 'dinner', 'snacks'];

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(
          'Move to Different Meal',
          style: AppTheme.lightTheme.textTheme.titleLarge,
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: mealTypes
              .map((mealType) => ListTile(
                    title: Text(
                      mealType.substring(0, 1).toUpperCase() +
                          mealType.substring(1),
                      style: AppTheme.lightTheme.textTheme.bodyLarge,
                    ),
                    onTap: () {
                      // Remove from current meal
                      for (final currentMealType in _foodLogData.keys) {
                        final meals = _foodLogData[currentMealType] ?? [];
                        meals.removeWhere(
                            (item) => item['id'] == foodEntry['id']);
                      }

                      // Add to new meal
                      _foodLogData[mealType] = _foodLogData[mealType] ?? [];
                      _foodLogData[mealType]!.add(foodEntry);

                      setState(() {});
                      Navigator.pop(context);

                      Fluttertoast.showToast(
                        msg:
                            "Moved to ${mealType.substring(0, 1).toUpperCase() + mealType.substring(1)}",
                        toastLength: Toast.LENGTH_SHORT,
                        gravity: ToastGravity.BOTTOM,
                      );
                    },
                  ))
              .toList(),
        ),
      ),
    );
  }

  void _showNutritionDetailsDialog(Map<String, dynamic> foodEntry) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(
          'Nutrition Details',
          style: AppTheme.lightTheme.textTheme.titleLarge,
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              foodEntry['name'] ?? 'Unknown Food',
              style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                color: AppTheme.calorieAccent,
                fontWeight: FontWeight.w700,
              ),
            ),
            SizedBox(height: 1.h),
            Text(
              'Portion: ${foodEntry['portion'] ?? 'N/A'}',
              style: AppTheme.lightTheme.textTheme.bodyLarge,
            ),
            SizedBox(height: 2.h),
            _buildNutritionRow('Calories', '${foodEntry['calories']} kcal',
                AppTheme.calorieAccent),
            _buildNutritionRow('Carbohydrates', '${foodEntry['carbs']}g',
                AppTheme.waterAccent),
            _buildNutritionRow(
                'Protein', '${foodEntry['protein']}g', AppTheme.successState),
            _buildNutritionRow(
                'Fats', '${foodEntry['fats']}g', AppTheme.warningState),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Close'),
          ),
        ],
      ),
    );
  }

  Widget _buildNutritionRow(String label, String value, Color color) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 0.5.h),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: AppTheme.lightTheme.textTheme.bodyLarge,
          ),
          Text(
            value,
            style: AppTheme.lightTheme.textTheme.bodyLarge?.copyWith(
              color: color,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }

  void _startLogging() {
    Navigator.pushNamed(context, '/food-search-and-logging');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      appBar: AppBar(
        title: Text(
          'Food Log History',
          style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
            fontWeight: FontWeight.w700,
          ),
        ),
        actions: [
          IconButton(
            onPressed: () {
              showSearch(
                context: context,
                delegate: FoodSearchDelegate(
                  onSearchChanged: (query) {
                    setState(() {
                      _searchQuery = query;
                    });
                  },
                ),
              );
            },
            icon: CustomIconWidget(
              iconName: 'search',
              color: AppTheme.lightTheme.colorScheme.onSurface,
              size: 24,
            ),
          ),
          PopupMenuButton<String>(
            onSelected: (value) {
              switch (value) {
                case 'export':
                  Fluttertoast.showToast(
                    msg: "Export functionality coming soon",
                    toastLength: Toast.LENGTH_SHORT,
                    gravity: ToastGravity.BOTTOM,
                  );
                  break;
                case 'settings':
                  Navigator.pushNamed(context, '/profile-and-settings');
                  break;
              }
            },
            itemBuilder: (context) => [
              const PopupMenuItem(
                value: 'export',
                child: Text('Export Data'),
              ),
              const PopupMenuItem(
                value: 'settings',
                child: Text('Settings'),
              ),
            ],
            icon: CustomIconWidget(
              iconName: 'more_vert',
              color: AppTheme.lightTheme.colorScheme.onSurface,
              size: 24,
            ),
          ),
        ],
      ),
      body: Column(
        children: [
          DatePickerHeaderWidget(
            selectedDate: _selectedDate,
            onDateChanged: _onDateChanged,
            onCalendarTap: () {},
          ),
          Expanded(
            child: _hasAnyFood
                ? RefreshIndicator(
                    onRefresh: _refreshData,
                    color: AppTheme.calorieAccent,
                    child: ListView(
                      children: [
                        if (_filteredBreakfast.isNotEmpty)
                          MealSectionWidget(
                            mealType: 'Breakfast',
                            foodEntries: _filteredBreakfast,
                            totalCalories: _getMealCalories('breakfast'),
                            timestamp: _getMealTimestamp('breakfast'),
                            onEditPortion: _onEditPortion,
                            onDuplicate: _onDuplicate,
                            onMoveMeal: _onMoveMeal,
                            onDelete: _onDelete,
                            onViewDetails: _onViewDetails,
                            onAddToFavorites: _onAddToFavorites,
                            onShareMeal: _onShareMeal,
                          ),
                        if (_filteredLunch.isNotEmpty)
                          MealSectionWidget(
                            mealType: 'Lunch',
                            foodEntries: _filteredLunch,
                            totalCalories: _getMealCalories('lunch'),
                            timestamp: _getMealTimestamp('lunch'),
                            onEditPortion: _onEditPortion,
                            onDuplicate: _onDuplicate,
                            onMoveMeal: _onMoveMeal,
                            onDelete: _onDelete,
                            onViewDetails: _onViewDetails,
                            onAddToFavorites: _onAddToFavorites,
                            onShareMeal: _onShareMeal,
                          ),
                        if (_filteredDinner.isNotEmpty)
                          MealSectionWidget(
                            mealType: 'Dinner',
                            foodEntries: _filteredDinner,
                            totalCalories: _getMealCalories('dinner'),
                            timestamp: _getMealTimestamp('dinner'),
                            onEditPortion: _onEditPortion,
                            onDuplicate: _onDuplicate,
                            onMoveMeal: _onMoveMeal,
                            onDelete: _onDelete,
                            onViewDetails: _onViewDetails,
                            onAddToFavorites: _onAddToFavorites,
                            onShareMeal: _onShareMeal,
                          ),
                        if (_filteredSnacks.isNotEmpty)
                          MealSectionWidget(
                            mealType: 'Snacks',
                            foodEntries: _filteredSnacks,
                            totalCalories: _getMealCalories('snacks'),
                            timestamp: _getMealTimestamp('snacks'),
                            onEditPortion: _onEditPortion,
                            onDuplicate: _onDuplicate,
                            onMoveMeal: _onMoveMeal,
                            onDelete: _onDelete,
                            onViewDetails: _onViewDetails,
                            onAddToFavorites: _onAddToFavorites,
                            onShareMeal: _onShareMeal,
                          ),
                        DailySummaryWidget(
                          totalCalories: _totalCalories,
                          calorieGoal: _calorieGoal,
                          totalCarbs: _totalCarbs,
                          totalProtein: _totalProtein,
                          totalFats: _totalFats,
                          carbGoal: _carbGoal,
                          proteinGoal: _proteinGoal,
                          fatGoal: _fatGoal,
                        ),
                        SizedBox(height: 2.h),
                      ],
                    ),
                  )
                : EmptyStateWidget(
                    onStartLogging: _startLogging,
                  ),
          ),
        ],
      ),
      floatingActionButton: _hasAnyFood
          ? FloatingActionButton(
              onPressed: _startLogging,
              backgroundColor: AppTheme.calorieAccent,
              child: CustomIconWidget(
                iconName: 'add',
                color: Colors.white,
                size: 24,
              ),
            )
          : null,
    );
  }
}

class FoodSearchDelegate extends SearchDelegate<String> {
  final Function(String) onSearchChanged;

  FoodSearchDelegate({required this.onSearchChanged});

  @override
  List<Widget> buildActions(BuildContext context) {
    return [
      IconButton(
        onPressed: () {
          query = '';
          onSearchChanged('');
        },
        icon: CustomIconWidget(
          iconName: 'clear',
          color: AppTheme.lightTheme.colorScheme.onSurface,
          size: 24,
        ),
      ),
    ];
  }

  @override
  Widget buildLeading(BuildContext context) {
    return IconButton(
      onPressed: () {
        close(context, '');
      },
      icon: CustomIconWidget(
        iconName: 'arrow_back',
        color: AppTheme.lightTheme.colorScheme.onSurface,
        size: 24,
      ),
    );
  }

  @override
  Widget buildResults(BuildContext context) {
    onSearchChanged(query);
    close(context, query);
    return Container();
  }

  @override
  Widget buildSuggestions(BuildContext context) {
    final suggestions = [
      'Oatmeal',
      'Greek Yogurt',
      'Chicken Salad',
      'Quinoa Bowl',
      'Salmon',
      'Mixed Nuts',
      'Apple',
    ];

    final filteredSuggestions = suggestions
        .where((suggestion) =>
            suggestion.toLowerCase().contains(query.toLowerCase()))
        .toList();

    return ListView.builder(
      itemCount: filteredSuggestions.length,
      itemBuilder: (context, index) {
        final suggestion = filteredSuggestions[index];
        return ListTile(
          leading: CustomIconWidget(
            iconName: 'search',
            color: AppTheme.neutralGray,
            size: 20,
          ),
          title: Text(
            suggestion,
            style: AppTheme.lightTheme.textTheme.bodyLarge,
          ),
          onTap: () {
            query = suggestion;
            onSearchChanged(query);
            close(context, query);
          },
        );
      },
    );
  }
}
