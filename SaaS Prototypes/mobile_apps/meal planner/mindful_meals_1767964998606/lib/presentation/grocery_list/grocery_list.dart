import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../widgets/main_layout_wrapper.dart';
import './widgets/add_item_dialog.dart';
import './widgets/empty_grocery_state.dart';
import './widgets/grocery_category_section.dart';

class GroceryList extends StatefulWidget {
  const GroceryList({Key? key}) : super(key: key);

  @override
  State<GroceryList> createState() => _GroceryListState();
}

class _GroceryListState extends State<GroceryList>
    with TickerProviderStateMixin {
  final GlobalKey<RefreshIndicatorState> _refreshIndicatorKey =
      GlobalKey<RefreshIndicatorState>();

  // Mock data for grocery items organized by categories
  final List<Map<String, dynamic>> _groceryItems = [
    {
      "id": "1",
      "name": "Organic Spinach",
      "quantity": "2 bunches",
      "category": "Produce",
      "isCompleted": false,
      "sourceMeal": "Green Smoothie Bowl",
      "note": "Fresh, not frozen",
      "addedAt": DateTime.now().subtract(const Duration(hours: 2)),
    },
    {
      "id": "2",
      "name": "Avocados",
      "quantity": "3 pieces",
      "category": "Produce",
      "isCompleted": false,
      "sourceMeal": "Avocado Toast",
      "note": "",
      "addedAt": DateTime.now().subtract(const Duration(hours: 1)),
    },
    {
      "id": "3",
      "name": "Greek Yogurt",
      "quantity": "32 oz container",
      "category": "Dairy",
      "isCompleted": true,
      "sourceMeal": "Breakfast Parfait",
      "note": "Plain, unsweetened",
      "addedAt": DateTime.now().subtract(const Duration(hours: 3)),
    },
    {
      "id": "4",
      "name": "Salmon Fillet",
      "quantity": "1.5 lbs",
      "category": "Meat & Seafood",
      "isCompleted": false,
      "sourceMeal": "Grilled Salmon Dinner",
      "note": "Wild-caught preferred",
      "addedAt": DateTime.now().subtract(const Duration(minutes: 30)),
    },
    {
      "id": "5",
      "name": "Quinoa",
      "quantity": "2 lbs bag",
      "category": "Pantry",
      "isCompleted": false,
      "sourceMeal": "Buddha Bowl",
      "note": "",
      "addedAt": DateTime.now().subtract(const Duration(hours: 4)),
    },
    {
      "id": "6",
      "name": "Almond Milk",
      "quantity": "64 oz carton",
      "category": "Dairy",
      "isCompleted": false,
      "sourceMeal": "Morning Cereal",
      "note": "Unsweetened vanilla",
      "addedAt": DateTime.now().subtract(const Duration(hours: 2)),
    },
    {
      "id": "7",
      "name": "Sweet Potatoes",
      "quantity": "3 lbs",
      "category": "Produce",
      "isCompleted": false,
      "sourceMeal": "Roasted Veggie Bowl",
      "note": "Medium sized",
      "addedAt": DateTime.now().subtract(const Duration(hours: 1)),
    },
    {
      "id": "8",
      "name": "Whole Grain Bread",
      "quantity": "1 loaf",
      "category": "Bakery",
      "isCompleted": true,
      "sourceMeal": "Avocado Toast",
      "note": "Seeded variety",
      "addedAt": DateTime.now().subtract(const Duration(hours: 5)),
    },
  ];

  final Map<String, String> _categoryIcons = {
    'Produce': 'eco',
    'Dairy': 'local_drink',
    'Meat & Seafood': 'set_meal',
    'Pantry': 'kitchen',
    'Frozen': 'ac_unit',
    'Bakery': 'cake',
    'Snacks': 'cookie',
    'Beverages': 'local_cafe',
    'Health & Beauty': 'spa',
    'Household': 'home',
  };

  final List<String> _searchSuggestions = [
    'Organic Spinach',
    'Avocados',
    'Greek Yogurt',
    'Salmon Fillet',
    'Quinoa',
    'Almond Milk',
    'Sweet Potatoes',
    'Whole Grain Bread',
    'Blueberries',
    'Chicken Breast',
    'Brown Rice',
    'Olive Oil',
    'Broccoli',
    'Eggs',
  ];

  Map<String, bool> _expandedCategories = {};
  bool _isConnected = true;

  @override
  void initState() {
    super.initState();
    _initializeExpandedCategories();
    _checkConnectivity();
  }

  void _initializeExpandedCategories() {
    final categories = _getCategories();
    for (String category in categories) {
      _expandedCategories[category] = true;
    }
  }

  void _checkConnectivity() async {
    final connectivityResult = await Connectivity().checkConnectivity();
    setState(() {
      _isConnected = connectivityResult != ConnectivityResult.none;
    });

    Connectivity().onConnectivityChanged.listen((ConnectivityResult result) {
      setState(() {
        _isConnected = result != ConnectivityResult.none;
      });
    });
  }

  List<String> _getCategories() {
    return _groceryItems
        .map((item) => item['category'] as String)
        .toSet()
        .toList()
      ..sort();
  }

  List<Map<String, dynamic>> _getItemsForCategory(String category) {
    return _groceryItems.where((item) => item['category'] == category).toList()
      ..sort((a, b) {
        // Sort by completion status first, then by name
        if (a['isCompleted'] != b['isCompleted']) {
          return a['isCompleted'] ? 1 : -1;
        }
        return (a['name'] as String).compareTo(b['name'] as String);
      });
  }

  int _getTotalItemsCount() {
    return _groceryItems.length;
  }

  int _getCompletedItemsCount() {
    return _groceryItems.where((item) => item['isCompleted'] == true).length;
  }

  Future<void> _refreshGroceryList() async {
    await Future.delayed(const Duration(seconds: 1));

    if (_isConnected) {
      // Simulate syncing with meal plans
      Fluttertoast.showToast(
        msg: "Grocery list synced with meal plans",
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.BOTTOM,
      );
    } else {
      Fluttertoast.showToast(
        msg: "Offline mode - changes will sync when connected",
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.BOTTOM,
      );
    }
  }

  void _toggleItemCompletion(String itemId, bool isCompleted) {
    setState(() {
      final itemIndex =
          _groceryItems.indexWhere((item) => item['id'] == itemId);
      if (itemIndex != -1) {
        _groceryItems[itemIndex]['isCompleted'] = isCompleted;
      }
    });

    Fluttertoast.showToast(
      msg: isCompleted
          ? "Item marked as completed"
          : "Item marked as incomplete",
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
    );
  }

  void _editItem(String itemId) {
    final item = _groceryItems.firstWhere((item) => item['id'] == itemId);

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(
          'Edit Item',
          style: AppTheme.lightTheme.textTheme.titleMedium,
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              decoration: const InputDecoration(
                labelText: 'Item Name',
                border: OutlineInputBorder(),
              ),
              controller: TextEditingController(text: item['name']),
            ),
            SizedBox(height: 2.h),
            TextField(
              decoration: const InputDecoration(
                labelText: 'Quantity',
                border: OutlineInputBorder(),
              ),
              controller: TextEditingController(text: item['quantity']),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text(
              'Cancel',
              style: TextStyle(
                  color: AppTheme.lightTheme.colorScheme.onSurfaceVariant),
            ),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              Fluttertoast.showToast(
                msg: "Item updated successfully",
                toastLength: Toast.LENGTH_SHORT,
                gravity: ToastGravity.BOTTOM,
              );
            },
            child: const Text('Save'),
          ),
        ],
      ),
    );
  }

  void _removeItem(String itemId) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(
          'Remove Item',
          style: AppTheme.lightTheme.textTheme.titleMedium,
        ),
        content: const Text(
            'Are you sure you want to remove this item from your grocery list?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text(
              'Cancel',
              style: TextStyle(
                  color: AppTheme.lightTheme.colorScheme.onSurfaceVariant),
            ),
          ),
          ElevatedButton(
            onPressed: () {
              setState(() {
                _groceryItems.removeWhere((item) => item['id'] == itemId);
              });
              Navigator.pop(context);
              Fluttertoast.showToast(
                msg: "Item removed from list",
                toastLength: Toast.LENGTH_SHORT,
                gravity: ToastGravity.BOTTOM,
              );
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: AppTheme.lightTheme.colorScheme.error,
              foregroundColor: AppTheme.lightTheme.colorScheme.onError,
            ),
            child: const Text('Remove'),
          ),
        ],
      ),
    );
  }

  void _addNoteToItem(String itemId, String note) {
    setState(() {
      final itemIndex =
          _groceryItems.indexWhere((item) => item['id'] == itemId);
      if (itemIndex != -1) {
        _groceryItems[itemIndex]['note'] = note;
      }
    });

    Fluttertoast.showToast(
      msg: note.isEmpty ? "Note removed" : "Note added to item",
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
    );
  }

  void _toggleCategoryExpansion(String category) {
    setState(() {
      _expandedCategories[category] = !(_expandedCategories[category] ?? false);
    });
  }

  void _addNewItem(Map<String, dynamic> item) {
    setState(() {
      _groceryItems.add(item);
    });

    Fluttertoast.showToast(
      msg: "Item added to grocery list",
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
    );
  }

  void _clearCompletedItems() {
    final completedCount = _getCompletedItemsCount();

    if (completedCount == 0) {
      Fluttertoast.showToast(
        msg: "No completed items to clear",
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.BOTTOM,
      );
      return;
    }

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(
          'Clear Completed Items',
          style: AppTheme.lightTheme.textTheme.titleMedium,
        ),
        content: Text('Remove $completedCount completed items from your list?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text(
              'Cancel',
              style: TextStyle(
                  color: AppTheme.lightTheme.colorScheme.onSurfaceVariant),
            ),
          ),
          ElevatedButton(
            onPressed: () {
              setState(() {
                _groceryItems
                    .removeWhere((item) => item['isCompleted'] == true);
              });
              Navigator.pop(context);
              Fluttertoast.showToast(
                msg: "$completedCount completed items cleared",
                toastLength: Toast.LENGTH_SHORT,
                gravity: ToastGravity.BOTTOM,
              );
            },
            child: const Text('Clear'),
          ),
        ],
      ),
    );
  }

  void _shareGroceryList() {
    final activeItems =
        _groceryItems.where((item) => item['isCompleted'] != true).toList();

    if (activeItems.isEmpty) {
      Fluttertoast.showToast(
        msg: "No items to share",
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.BOTTOM,
      );
      return;
    }

    String listText = "My Grocery List:\n\n";
    final categories = _getCategories();

    for (String category in categories) {
      final categoryItems =
          activeItems.where((item) => item['category'] == category).toList();
      if (categoryItems.isNotEmpty) {
        listText += "$category:\n";
        for (var item in categoryItems) {
          listText += "• ${item['name']}";
          if (item['quantity'].isNotEmpty) {
            listText += " (${item['quantity']})";
          }
          listText += "\n";
        }
        listText += "\n";
      }
    }

    // Simulate sharing functionality
    Fluttertoast.showToast(
      msg: "Grocery list ready to share",
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
    );
  }

  void _navigateToMealPlanning() {
    Navigator.pushNamed(context, '/meal-planning-dashboard');
  }

  @override
  Widget build(BuildContext context) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;

    return MainLayoutWrapper(
      currentIndex: 3, // Grocery tab
      child: Scaffold(
        backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
        body: _getTotalItemsCount() == 0
            ? EmptyGroceryState(
                onPlanMeals: _navigateToMealPlanning,
              )
            : RefreshIndicator(
                key: _refreshIndicatorKey,
                onRefresh: _refreshGroceryList,
                color: AppTheme.lightTheme.colorScheme.primary,
                child: Column(
                  children: [
                    Expanded(
                      child: ListView.builder(
                        padding: EdgeInsets.only(bottom: 10.h),
                        itemCount: _getCategories().length,
                        itemBuilder: (context, index) {
                          final category = _getCategories()[index];
                          final categoryItems = _getItemsForCategory(category);

                          return GroceryCategorySection(
                            categoryName: category,
                            iconName: _categoryIcons[category] ?? 'category',
                            items: categoryItems,
                            onItemToggle: _toggleItemCompletion,
                            onItemEdit: _editItem,
                            onItemRemove: _removeItem,
                            onItemAddNote: _addNoteToItem,
                            isExpanded: _expandedCategories[category] ?? false,
                            onToggleExpanded: () =>
                                _toggleCategoryExpansion(category),
                          );
                        },
                      ),
                    ),
                  ],
                ),
              ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            showDialog(
              context: context,
              builder: (context) => AddItemDialog(
                onAddItem: _addNewItem,
              ),
            );
          },
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
