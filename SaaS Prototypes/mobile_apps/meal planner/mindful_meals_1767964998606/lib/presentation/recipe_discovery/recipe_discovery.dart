import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../widgets/main_layout_wrapper.dart';
import './widgets/filter_bottom_sheet_widget.dart';
import './widgets/filter_chip_widget.dart';
import './widgets/quick_actions_widget.dart';
import './widgets/recipe_card_widget.dart';
import './widgets/search_bar_widget.dart';

class RecipeDiscovery extends StatefulWidget {
  const RecipeDiscovery({Key? key}) : super(key: key);

  @override
  State<RecipeDiscovery> createState() => _RecipeDiscoveryState();
}

class _RecipeDiscoveryState extends State<RecipeDiscovery>
    with TickerProviderStateMixin {
  final TextEditingController _searchController = TextEditingController();
  final ScrollController _scrollController = ScrollController();

  bool _isLoading = false;
  bool _isLoadingMore = false;
  String _searchQuery = '';
  Map<String, String> _activeFilters = {};
  int _currentPage = 1;
  final int _itemsPerPage = 10;

  // Mock data for recipes
  final List<Map<String, dynamic>> _allRecipes = [
    {
      "id": 1,
      "title": "Mindful Mediterranean Bowl",
      "image": "https://images.unsplash.com/photo-1735385391178-f65c2e9b638d",
      "semanticLabel":
          "Colorful Mediterranean bowl with quinoa, cherry tomatoes, cucumber, olives, and feta cheese on a white ceramic plate",
      "prepTime": "25 min",
      "difficulty": "Easy",
      "isMindful": true,
      "category": "lunch",
      "dietaryRestrictions": ["vegetarian"],
      "cookingTime": "quick"
    },
    {
      "id": 2,
      "title": "Zen Garden Green Smoothie",
      "image": "https://images.unsplash.com/photo-1715611935642-f36a19fb3d6a",
      "semanticLabel":
          "Fresh green smoothie in a tall glass with spinach, banana, and chia seeds, garnished with mint leaves",
      "prepTime": "10 min",
      "difficulty": "Easy",
      "isMindful": true,
      "category": "breakfast",
      "dietaryRestrictions": ["vegan", "gluten-free"],
      "cookingTime": "quick"
    },
    {
      "id": 3,
      "title": "Nourishing Lentil Curry",
      "image": "https://images.unsplash.com/photo-1708782344490-9026aaa5eec7",
      "semanticLabel":
          "Rich red lentil curry in a white bowl with fresh cilantro garnish and basmati rice on the side",
      "prepTime": "45 min",
      "difficulty": "Medium",
      "isMindful": false,
      "category": "dinner",
      "dietaryRestrictions": ["vegan", "gluten-free"],
      "cookingTime": "medium"
    },
    {
      "id": 4,
      "title": "Peaceful Overnight Oats",
      "image": "https://images.unsplash.com/photo-1649118173382-dad295004282",
      "semanticLabel":
          "Mason jar filled with overnight oats topped with fresh berries, sliced almonds, and a drizzle of honey",
      "prepTime": "5 min",
      "difficulty": "Easy",
      "isMindful": true,
      "category": "breakfast",
      "dietaryRestrictions": ["vegetarian"],
      "cookingTime": "quick"
    },
    {
      "id": 5,
      "title": "Harmony Herb-Crusted Salmon",
      "image": "https://images.unsplash.com/photo-1539136788836-5699e78bfc75",
      "semanticLabel":
          "Grilled salmon fillet with herb crust served with roasted vegetables and lemon wedges on a dark slate plate",
      "prepTime": "35 min",
      "difficulty": "Medium",
      "isMindful": false,
      "category": "dinner",
      "dietaryRestrictions": ["pescatarian"],
      "cookingTime": "medium"
    },
    {
      "id": 6,
      "title": "Tranquil Thai Coconut Soup",
      "image": "https://images.unsplash.com/photo-1615522811702-2b94328f7923",
      "semanticLabel":
          "Creamy coconut soup with mushrooms, lime leaves, and chili in a white ceramic bowl with chopsticks",
      "prepTime": "30 min",
      "difficulty": "Medium",
      "isMindful": true,
      "category": "lunch",
      "dietaryRestrictions": ["vegan"],
      "cookingTime": "medium"
    },
    {
      "id": 7,
      "title": "Serene Quinoa Salad",
      "image": "https://images.unsplash.com/photo-1681911418960-9bca34383200",
      "semanticLabel":
          "Fresh quinoa salad with diced vegetables, herbs, and pomegranate seeds in a glass bowl with wooden serving spoons",
      "prepTime": "20 min",
      "difficulty": "Easy",
      "isMindful": false,
      "category": "lunch",
      "dietaryRestrictions": ["vegan", "gluten-free"],
      "cookingTime": "quick"
    },
    {
      "id": 8,
      "title": "Mindful Mushroom Risotto",
      "image": "https://images.unsplash.com/photo-1627124679711-80f287a6451f",
      "semanticLabel":
          "Creamy mushroom risotto garnished with fresh herbs and parmesan cheese in a white bowl with a silver spoon",
      "prepTime": "50 min",
      "difficulty": "Hard",
      "isMindful": true,
      "category": "dinner",
      "dietaryRestrictions": ["vegetarian"],
      "cookingTime": "long"
    },
  ];

  List<Map<String, dynamic>> _filteredRecipes = [];
  List<Map<String, dynamic>> _displayedRecipes = [];

  // Filter options
  final Map<String, List<String>> _filterOptions = {
    'meal_type': ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
    'dietary_restrictions': [
      'Vegetarian',
      'Vegan',
      'Gluten-Free',
      'Pescatarian'
    ],
    'cooking_time': ['Quick', 'Medium', 'Long'],
    'difficulty': ['Easy', 'Medium', 'Hard'],
  };

  @override
  void initState() {
    super.initState();
    _filteredRecipes = List.from(_allRecipes);
    _loadRecipes();
    _scrollController.addListener(_onScroll);
  }

  @override
  void dispose() {
    _searchController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  void _onScroll() {
    if (_scrollController.position.pixels >=
        _scrollController.position.maxScrollExtent - 200) {
      _loadMoreRecipes();
    }
  }

  void _loadRecipes() {
    setState(() {
      _isLoading = true;
    });

    // Simulate API call delay
    Future.delayed(Duration(milliseconds: 500), () {
      _applyFilters();
      _currentPage = 1;
      final endIndex =
          (_currentPage * _itemsPerPage).clamp(0, _filteredRecipes.length);

      setState(() {
        _displayedRecipes = _filteredRecipes.take(endIndex).toList();
        _isLoading = false;
      });
    });
  }

  void _loadMoreRecipes() {
    if (_isLoadingMore || _displayedRecipes.length >= _filteredRecipes.length)
      return;

    setState(() {
      _isLoadingMore = true;
    });

    Future.delayed(Duration(milliseconds: 300), () {
      _currentPage++;
      final startIndex = (_currentPage - 1) * _itemsPerPage;
      final endIndex =
          (_currentPage * _itemsPerPage).clamp(0, _filteredRecipes.length);

      if (startIndex < _filteredRecipes.length) {
        setState(() {
          _displayedRecipes
              .addAll(_filteredRecipes.sublist(startIndex, endIndex));
          _isLoadingMore = false;
        });
      } else {
        setState(() {
          _isLoadingMore = false;
        });
      }
    });
  }

  void _applyFilters() {
    _filteredRecipes = _allRecipes.where((recipe) {
      // Search query filter
      if (_searchQuery.isNotEmpty) {
        final title = (recipe['title'] as String).toLowerCase();
        if (!title.contains(_searchQuery.toLowerCase())) {
          return false;
        }
      }

      // Category filters
      for (String filterKey in _activeFilters.keys) {
        final filterValue = _activeFilters[filterKey]!.toLowerCase();

        switch (filterKey) {
          case 'meal_type':
            if ((recipe['category'] as String).toLowerCase() != filterValue) {
              return false;
            }
            break;
          case 'dietary_restrictions':
            final restrictions = recipe['dietaryRestrictions'] as List;
            if (!restrictions
                .any((r) => (r as String).toLowerCase() == filterValue)) {
              return false;
            }
            break;
          case 'cooking_time':
            if ((recipe['cookingTime'] as String).toLowerCase() !=
                filterValue) {
              return false;
            }
            break;
          case 'difficulty':
            if ((recipe['difficulty'] as String).toLowerCase() != filterValue) {
              return false;
            }
            break;
        }
      }

      return true;
    }).toList();
  }

  void _onSearchChanged(String query) {
    setState(() {
      _searchQuery = query;
    });
    _loadRecipes();
  }

  void _onSearchSubmitted(String query) {
    _onSearchChanged(query);
  }

  void _showFilterBottomSheet() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => FilterBottomSheetWidget(
        filterOptions: _filterOptions,
        selectedFilters: _activeFilters,
        onFiltersChanged: (filters) {
          setState(() {
            _activeFilters = filters;
          });
          _loadRecipes();
        },
      ),
    );
  }

  void _removeFilter(String filterKey) {
    setState(() {
      _activeFilters.remove(filterKey);
    });
    _loadRecipes();
  }

  Future<void> _onRefresh() async {
    _loadRecipes();
  }

  void _showQuickActions(Map<String, dynamic> recipe) {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (context) => Container(
        margin: EdgeInsets.all(4.w),
        child: QuickActionsWidget(
          onSaveToFavorites: () {
            Navigator.pop(context);
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(content: Text('Recipe saved to favorites!')),
            );
          },
          onAddToMealPlan: () {
            Navigator.pop(context);
            Navigator.pushNamed(context, '/meal-planning-calendar');
          },
          onShareRecipe: () {
            Navigator.pop(context);
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(content: Text('Recipe shared successfully!')),
            );
          },
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final bool isDark = Theme.of(context).brightness == Brightness.dark;

    return MainLayoutWrapper(
      currentIndex: 1, // Recipes tab
      child: Scaffold(
        backgroundColor:
            isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight,
        body: SafeArea(
          child: Column(
            children: [
              // Sticky Header
              Container(
                color:
                    isDark ? AppTheme.backgroundDark : AppTheme.backgroundLight,
                child: Column(
                  children: [
                    // App Bar
                    Padding(
                      padding:
                          EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
                      child: Row(
                        children: [
                          GestureDetector(
                            onTap: () => Navigator.pop(context),
                            child: CustomIconWidget(
                              iconName: 'arrow_back',
                              color: isDark
                                  ? AppTheme.textPrimaryDark
                                  : AppTheme.textPrimaryLight,
                              size: 24,
                            ),
                          ),
                          SizedBox(width: 4.w),
                          Expanded(
                            child: Text(
                              'Recipe Discovery',
                              style: Theme.of(context)
                                  .textTheme
                                  .headlineSmall
                                  ?.copyWith(
                                    fontWeight: FontWeight.w600,
                                  ),
                            ),
                          ),
                          GestureDetector(
                            onTap: () =>
                                Navigator.pushNamed(context, '/user-profile'),
                            child: CircleAvatar(
                              radius: 20,
                              backgroundColor: isDark
                                  ? AppTheme.primaryDark
                                  : AppTheme.primaryLight,
                              child: CustomIconWidget(
                                iconName: 'person',
                                color: isDark
                                    ? AppTheme.onPrimaryDark
                                    : AppTheme.onPrimaryLight,
                                size: 20,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),

                    // Search Bar
                    SearchBarWidget(
                      controller: _searchController,
                      onFilterTap: _showFilterBottomSheet,
                      onChanged: _onSearchChanged,
                      onSubmitted: _onSearchSubmitted,
                      onVoiceSearch: () {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                              content:
                                  Text('Voice search feature coming soon!')),
                        );
                      },
                    ),

                    // Filter Chips
                    if (_activeFilters.isNotEmpty)
                      Container(
                        height: 6.h,
                        margin: EdgeInsets.symmetric(horizontal: 4.w),
                        child: ListView.builder(
                          scrollDirection: Axis.horizontal,
                          itemCount: _activeFilters.length,
                          itemBuilder: (context, index) {
                            final entry =
                                _activeFilters.entries.elementAt(index);
                            return FilterChipWidget(
                              label: entry.value,
                              isSelected: true,
                              onRemove: () => _removeFilter(entry.key),
                            );
                          },
                        ),
                      ),
                  ],
                ),
              ),

              // Main Content
              Expanded(
                child: _isLoading
                    ? Center(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            CircularProgressIndicator(
                              color: isDark
                                  ? AppTheme.primaryDark
                                  : AppTheme.primaryLight,
                            ),
                            SizedBox(height: 2.h),
                            Text(
                              'Discovering mindful recipes...',
                              style: Theme.of(context)
                                  .textTheme
                                  .bodyMedium
                                  ?.copyWith(
                                    color: isDark
                                        ? AppTheme.textSecondaryDark
                                        : AppTheme.textSecondaryLight,
                                  ),
                            ),
                          ],
                        ),
                      )
                    : _displayedRecipes.isEmpty
                        ? _buildEmptyState(isDark)
                        : RefreshIndicator(
                            onRefresh: _onRefresh,
                            color: isDark
                                ? AppTheme.primaryDark
                                : AppTheme.primaryLight,
                            child: ListView.builder(
                              controller: _scrollController,
                              physics: AlwaysScrollableScrollPhysics(),
                              itemCount: _displayedRecipes.length +
                                  (_isLoadingMore ? 1 : 0),
                              itemBuilder: (context, index) {
                                if (index == _displayedRecipes.length) {
                                  return Container(
                                    padding: EdgeInsets.all(4.w),
                                    child: Center(
                                      child: CircularProgressIndicator(
                                        color: isDark
                                            ? AppTheme.primaryDark
                                            : AppTheme.primaryLight,
                                      ),
                                    ),
                                  );
                                }

                                final recipe = _displayedRecipes[index];
                                return RecipeCardWidget(
                                  recipe: recipe,
                                  onTap: () => Navigator.pushNamed(
                                      context, '/recipe-detail'),
                                  onLongPress: () => _showQuickActions(recipe),
                                );
                              },
                            ),
                          ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildEmptyState(bool isDark) {
    return Center(
      child: Padding(
        padding: EdgeInsets.all(8.w),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CustomIconWidget(
              iconName: 'search_off',
              color: isDark
                  ? AppTheme.textDisabledDark
                  : AppTheme.textDisabledLight,
              size: 80,
            ),
            SizedBox(height: 3.h),
            Text(
              'Discover New Flavors',
              style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
            ),
            SizedBox(height: 1.h),
            Text(
              'No recipes found matching your criteria.\nTry adjusting your filters or search terms.',
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    color: isDark
                        ? AppTheme.textSecondaryDark
                        : AppTheme.textSecondaryLight,
                  ),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 4.h),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                ElevatedButton(
                  onPressed: () {
                    setState(() {
                      _activeFilters.clear();
                      _searchController.clear();
                      _searchQuery = '';
                    });
                    _loadRecipes();
                  },
                  child: Text('Clear Filters'),
                ),
                OutlinedButton(
                  onPressed: _showFilterBottomSheet,
                  child: Text('Browse All'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
