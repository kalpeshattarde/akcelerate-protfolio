import 'dart:async';

import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/food_logging_form_widget.dart';
import './widgets/food_result_card_widget.dart';
import './widgets/meal_category_tabs_widget.dart';
import './widgets/no_results_widget.dart';
import './widgets/portion_selection_bottom_sheet.dart';
import './widgets/recent_foods_widget.dart';
import './widgets/search_bar_widget.dart';

class FoodSearchAndLogging extends StatefulWidget {
  const FoodSearchAndLogging({Key? key}) : super(key: key);

  @override
  State<FoodSearchAndLogging> createState() => _FoodSearchAndLoggingState();
}

class _FoodSearchAndLoggingState extends State<FoodSearchAndLogging>
    with TickerProviderStateMixin {
  final TextEditingController _searchController = TextEditingController();
  late TabController _tabController;
  Timer? _debounceTimer;

  List<Map<String, dynamic>> _searchResults = [];
  List<Map<String, dynamic>> _selectedFoods = [];
  bool _isLoading = false;
  bool _isSearching = false;
  String _currentSearchQuery = '';

  // Mock food database
  final List<Map<String, dynamic>> _foodDatabase = [
    {
      "id": 1,
      "name": "Grilled Chicken Breast",
      "brand": "Fresh Market",
      "calories": 165,
      "serving": "100g",
      "image":
          "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "protein": 31.0,
      "carbs": 0.0,
      "fat": 3.6,
    },
    {
      "id": 2,
      "name": "Brown Rice",
      "brand": "Organic Valley",
      "calories": 112,
      "serving": "100g cooked",
      "image":
          "https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "protein": 2.6,
      "carbs": 22.0,
      "fat": 0.9,
    },
    {
      "id": 3,
      "name": "Greek Yogurt",
      "brand": "Chobani",
      "calories": 59,
      "serving": "100g",
      "image":
          "https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "protein": 10.0,
      "carbs": 3.6,
      "fat": 0.4,
    },
    {
      "id": 4,
      "name": "Avocado",
      "brand": "Fresh Produce",
      "calories": 160,
      "serving": "100g",
      "image":
          "https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "protein": 2.0,
      "carbs": 8.5,
      "fat": 14.7,
    },
    {
      "id": 5,
      "name": "Banana",
      "brand": "Fresh Produce",
      "calories": 89,
      "serving": "100g",
      "image":
          "https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "protein": 1.1,
      "carbs": 22.8,
      "fat": 0.3,
    },
    {
      "id": 6,
      "name": "Salmon Fillet",
      "brand": "Ocean Fresh",
      "calories": 208,
      "serving": "100g",
      "image":
          "https://images.pexels.com/photos/1516415/pexels-photo-1516415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "protein": 25.4,
      "carbs": 0.0,
      "fat": 12.4,
    },
    {
      "id": 7,
      "name": "Sweet Potato",
      "brand": "Farm Fresh",
      "calories": 86,
      "serving": "100g",
      "image":
          "https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "protein": 1.6,
      "carbs": 20.1,
      "fat": 0.1,
    },
    {
      "id": 8,
      "name": "Almonds",
      "brand": "Nature's Best",
      "calories": 579,
      "serving": "100g",
      "image":
          "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "protein": 21.2,
      "carbs": 21.6,
      "fat": 49.9,
    },
    {
      "id": 9,
      "name": "Spinach",
      "brand": "Green Leaf",
      "calories": 23,
      "serving": "100g",
      "image":
          "https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "protein": 2.9,
      "carbs": 3.6,
      "fat": 0.4,
    },
    {
      "id": 10,
      "name": "Quinoa",
      "brand": "Ancient Grains",
      "calories": 120,
      "serving": "100g cooked",
      "image":
          "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "protein": 4.4,
      "carbs": 21.3,
      "fat": 1.9,
    },
  ];

  // Recent foods (subset of database for demo)
  List<Map<String, dynamic>> _recentFoods = [];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 4, vsync: this);
    _recentFoods = _foodDatabase.take(5).toList();

    // Set initial time-based meal category
    _setInitialMealCategory();
  }

  void _setInitialMealCategory() {
    final hour = DateTime.now().hour;
    int initialIndex = 0;

    if (hour >= 5 && hour < 11) {
      initialIndex = 0; // Breakfast
    } else if (hour >= 11 && hour < 16) {
      initialIndex = 1; // Lunch
    } else if (hour >= 16 && hour < 21) {
      initialIndex = 2; // Dinner
    } else {
      initialIndex = 3; // Snacks
    }

    _tabController.animateTo(initialIndex);
  }

  @override
  void dispose() {
    _searchController.dispose();
    _tabController.dispose();
    _debounceTimer?.cancel();
    super.dispose();
  }

  void _onSearchChanged(String query) {
    _debounceTimer?.cancel();
    _debounceTimer = Timer(const Duration(milliseconds: 300), () {
      _performSearch(query);
    });
  }

  void _performSearch(String query) {
    setState(() {
      _currentSearchQuery = query;
      _isSearching = query.isNotEmpty;

      if (query.isEmpty) {
        _searchResults.clear();
      } else {
        _searchResults = _foodDatabase.where((food) {
          final name = (food['name'] as String).toLowerCase();
          final brand = (food['brand'] as String).toLowerCase();
          final searchLower = query.toLowerCase();
          return name.contains(searchLower) || brand.contains(searchLower);
        }).toList();
      }
    });
  }

  void _onScanPressed() {
    // Future barcode scanning integration
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          'Barcode scanning coming soon!',
          style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
            color: Colors.white,
          ),
        ),
        backgroundColor: AppTheme.lightTheme.colorScheme.primary,
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  void _onFoodTap(Map<String, dynamic> food) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => Padding(
        padding: EdgeInsets.only(
          bottom: MediaQuery.of(context).viewInsets.bottom,
        ),
        child: PortionSelectionBottomSheet(
          foodItem: food,
          onAddToLog: _onAddToLog,
        ),
      ),
    );
  }

  void _onAddToLog(Map<String, dynamic> foodEntry) {
    setState(() {
      // Check if food already exists in selection
      final existingIndex = _selectedFoods.indexWhere((item) =>
          item['id'] == foodEntry['id'] &&
          item['selectedServing'] == foodEntry['selectedServing']);

      if (existingIndex != -1) {
        // Update quantity if same food and serving exists
        _selectedFoods[existingIndex]['quantity'] =
            (_selectedFoods[existingIndex]['quantity'] as int? ?? 1) + 1;
      } else {
        // Add new food entry
        foodEntry['quantity'] = 1;
        _selectedFoods.add(foodEntry);
      }
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          '${foodEntry['name']} added to log',
          style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
            color: Colors.white,
          ),
        ),
        backgroundColor: AppTheme.successState,
        behavior: SnackBarBehavior.floating,
        duration: const Duration(seconds: 2),
      ),
    );
  }

  void _onRemoveFood(int index) {
    setState(() {
      _selectedFoods.removeAt(index);
    });
  }

  void _onUpdateQuantity(int index, int newQuantity) {
    setState(() {
      _selectedFoods[index]['quantity'] = newQuantity;
    });
  }

  void _onAddCustomFood() {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          'Custom food entry coming soon!',
          style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
            color: Colors.white,
          ),
        ),
        backgroundColor: AppTheme.lightTheme.colorScheme.primary,
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  Future<void> _saveToLog() async {
    if (_selectedFoods.isEmpty) return;

    setState(() {
      _isLoading = true;
    });

    // Simulate API call
    await Future.delayed(const Duration(seconds: 1));

    setState(() {
      _isLoading = false;
      _selectedFoods.clear();
      _searchController.clear();
      _searchResults.clear();
      _currentSearchQuery = '';
      _isSearching = false;
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          'Foods logged successfully!',
          style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
            color: Colors.white,
          ),
        ),
        backgroundColor: AppTheme.successState,
        behavior: SnackBarBehavior.floating,
      ),
    );

    // Navigate back to dashboard
    Navigator.pushReplacementNamed(context, '/dashboard-home');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      appBar: AppBar(
        title: Text(
          'Food Log',
          style: Theme.of(context).textTheme.titleLarge?.copyWith(
                color: Theme.of(context).colorScheme.onSurface,
                fontWeight: FontWeight.w600,
              ),
        ),
        backgroundColor: Theme.of(context).scaffoldBackgroundColor,
        elevation: 0,
        centerTitle: true,
        automaticallyImplyLeading: false,
        actions: [
          IconButton(
            onPressed: () {
              Navigator.pushNamed(context, '/food-log-history');
            },
            icon: CustomIconWidget(
              iconName: 'history',
              color: Theme.of(context).colorScheme.onSurface,
              size: 6.w,
            ),
            tooltip: 'Food History',
          ),
        ],
      ),
      body: Column(
        children: [
          // Search Bar
          SearchBarWidget(
            controller: _searchController,
            onChanged: _onSearchChanged,
            onScanPressed: _onScanPressed,
          ),

          // Meal Category Tabs
          MealCategoryTabsWidget(
            tabController: _tabController,
          ),

          // Main Content
          Expanded(
            child: SingleChildScrollView(
              padding: EdgeInsets.only(bottom: 12.h),
              child: Column(
                children: [
                  // Food Logging Form
                  FoodLoggingFormWidget(
                    onAddToLog: _onAddToLog,
                    selectedMeal: _currentMealType,
                  ),

                  // Search or Recent Foods Section
                  if (_currentSearchQuery.isNotEmpty) ...[
                    SizedBox(height: 2.h),
                    Container(
                      alignment: Alignment.centerLeft,
                      padding: EdgeInsets.symmetric(horizontal: 4.w),
                      child: Text(
                        'Search Results',
                        style:
                            Theme.of(context).textTheme.titleMedium?.copyWith(
                                  fontWeight: FontWeight.w600,
                                ),
                      ),
                    ),
                    SizedBox(height: 1.h),
                    _buildSearchResults(),
                  ] else ...[
                    SizedBox(height: 2.h),
                    Container(
                      alignment: Alignment.centerLeft,
                      padding: EdgeInsets.symmetric(horizontal: 4.w),
                      child: Text(
                        'Recent Foods',
                        style:
                            Theme.of(context).textTheme.titleMedium?.copyWith(
                                  fontWeight: FontWeight.w600,
                                ),
                      ),
                    ),
                    SizedBox(height: 1.h),
                    _buildRecentFoods(),
                  ],
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  String get _currentMealType {
    final mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];
    return mealTypes[_tabController.index];
  }

  void _onSearchSubmitted(String value) {
    _performSearch(value);
  }

  Widget _buildSearchResults() {
    if (_searchResults.isEmpty && _currentSearchQuery.isNotEmpty) {
      return NoResultsWidget(
        searchQuery: _currentSearchQuery,
        onAddCustomFood: _onAddCustomFood,
      );
    }

    return Column(
      children: _searchResults.map((food) {
        return FoodResultCardWidget(
          foodItem: food,
          onTap: () => _onFoodTap(food),
        );
      }).toList(),
    );
  }

  Widget _buildRecentFoods() {
    return RecentFoodsWidget(
      recentFoods: _recentFoods,
      onFoodTap: _onFoodTap,
    );
  }
}
