import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/bottom_action_bar_widget.dart';
import './widgets/floating_action_button_widget.dart';
import './widgets/ingredients_tab_widget.dart';
import './widgets/instructions_tab_widget.dart';
import './widgets/mindful_tips_tab_widget.dart';
import './widgets/nutrition_tab_widget.dart';
import './widgets/recipe_header_widget.dart';
import './widgets/recipe_info_widget.dart';

class RecipeDetail extends StatefulWidget {
  const RecipeDetail({Key? key}) : super(key: key);

  @override
  State<RecipeDetail> createState() => _RecipeDetailState();
}

class _RecipeDetailState extends State<RecipeDetail>
    with TickerProviderStateMixin {
  late TabController _tabController;
  late ScrollController _scrollController;

  // Mock recipe data
  final Map<String, dynamic> _recipeData = {
    "id": 1,
    "title": "Mindful Mediterranean Bowl",
    "description":
        "A nourishing bowl that celebrates the abundance of Mediterranean flavors with fresh vegetables, ancient grains, and aromatic herbs. This recipe encourages slow, intentional preparation to connect with each ingredient's natural essence.",
    "image":
        "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf",
    "semanticLabel":
        "Colorful Mediterranean bowl with quinoa, roasted vegetables, chickpeas, and fresh herbs arranged artfully on a white ceramic bowl",
    "prepTime": 25,
    "servings": 4,
    "difficulty": "Easy",
    "calories": 420,
  };

  final List<Map<String, dynamic>> _ingredients = [
    {
      "quantity": "1 cup",
      "name": "quinoa, rinsed",
      "substitution": "brown rice or bulgur wheat",
    },
    {
      "quantity": "2 cups",
      "name": "vegetable broth",
      "substitution": "water with herbs",
    },
    {
      "quantity": "1 large",
      "name": "zucchini, diced",
      "substitution": "yellow squash",
    },
    {
      "quantity": "1 cup",
      "name": "cherry tomatoes, halved",
      "substitution": "regular tomatoes, chopped",
    },
    {
      "quantity": "1/2 cup",
      "name": "red onion, thinly sliced",
      "substitution": "shallots or white onion",
    },
    {
      "quantity": "1 can",
      "name": "chickpeas, drained and rinsed",
      "substitution": "white beans or lentils",
    },
    {
      "quantity": "1/4 cup",
      "name": "extra virgin olive oil",
      "substitution": "avocado oil",
    },
    {
      "quantity": "2 tbsp",
      "name": "lemon juice, fresh",
      "substitution": "lime juice or white wine vinegar",
    },
    {
      "quantity": "2 cloves",
      "name": "garlic, minced",
      "substitution": "garlic powder (1 tsp)",
    },
    {
      "quantity": "1/4 cup",
      "name": "fresh parsley, chopped",
      "substitution": "dried parsley (1 tbsp)",
    },
    {
      "quantity": "2 tbsp",
      "name": "fresh mint, chopped",
      "substitution": "dried mint (1 tsp)",
    },
    {
      "quantity": "1/2 tsp",
      "name": "sea salt",
      "substitution": "kosher salt",
    },
    {
      "quantity": "1/4 tsp",
      "name": "black pepper, freshly ground",
      "substitution": "white pepper",
    },
  ];

  final List<Map<String, dynamic>> _instructions = [
    {
      "step":
          "Begin by rinsing the quinoa under cold water until the water runs clear. This removes the natural coating that can make quinoa taste bitter. Take a moment to appreciate the tiny, pearl-like grains.",
    },
    {
      "step":
          "In a medium saucepan, bring the vegetable broth to a gentle boil. Add the quinoa, reduce heat to low, cover, and simmer for 15 minutes. Listen to the gentle bubbling - this is the sound of nourishment being created.",
      "timer": 15,
    },
    {
      "step":
          "While the quinoa cooks, prepare your vegetables mindfully. Dice the zucchini into uniform pieces, feeling the firmness of the fresh vegetable. Halve the cherry tomatoes, noticing their vibrant color and fresh aroma.",
    },
    {
      "step":
          "Heat 2 tablespoons of olive oil in a large skillet over medium heat. Add the diced zucchini and cook for 5-7 minutes until tender and lightly golden. Season with a pinch of salt.",
      "timer": 7,
    },
    {
      "step":
          "Add the cherry tomatoes and red onion to the skillet. Cook for another 3-4 minutes until the tomatoes start to soften and release their juices. Breathe in the Mediterranean aromas.",
      "timer": 4,
    },
    {
      "step":
          "Stir in the chickpeas and minced garlic. Cook for 2 minutes until the garlic becomes fragrant. This is where the magic happens - the melding of flavors.",
      "timer": 2,
    },
    {
      "step":
          "Remove the quinoa from heat and let it rest for 5 minutes. Then fluff gently with a fork, observing how each grain separates beautifully.",
      "timer": 5,
    },
    {
      "step":
          "In a small bowl, whisk together the remaining olive oil, lemon juice, salt, and pepper to create a simple yet flavorful dressing.",
    },
    {
      "step":
          "Combine the fluffy quinoa with the sautéed vegetables in a large serving bowl. Drizzle with the lemon dressing and gently toss to combine all the beautiful colors and textures.",
    },
    {
      "step":
          "Finish by sprinkling the fresh herbs over the bowl. Take a moment to appreciate the vibrant green colors and fresh aromas before serving. Serve warm or at room temperature.",
    },
  ];

  final Map<String, dynamic> _nutritionData = {
    "calories": 420,
    "macronutrients": {
      "protein": {"amount": "14g", "percentage": 28},
      "carbs": {"amount": "58g", "percentage": 55},
      "fat": {"amount": "14g", "percentage": 30},
      "fiber": {"amount": "8g", "percentage": 32},
    },
    "vitamins": [
      {"name": "Vitamin C", "amount": "45mg"},
      {"name": "Folate", "amount": "120mcg"},
      {"name": "Iron", "amount": "4.2mg"},
      {"name": "Magnesium", "amount": "89mg"},
      {"name": "Potassium", "amount": "680mg"},
    ],
    "healthBenefits": [
      "Rich in complete proteins from quinoa, supporting muscle health and satiety",
      "High fiber content promotes digestive health and stable blood sugar levels",
      "Antioxidants from colorful vegetables help protect against cellular damage",
      "Heart-healthy monounsaturated fats from olive oil support cardiovascular wellness",
      "Plant-based iron and folate support energy production and red blood cell formation",
    ],
  };

  final List<Map<String, dynamic>> _mindfulTips = [
    {
      "category": "Presence",
      "title": "Connect with Your Ingredients",
      "description":
          "Before you begin cooking, take a few moments to really observe each ingredient. Notice the colors, textures, and natural aromas. This simple practice helps you become present and appreciative of the nourishment you're about to create.",
      "practice":
          "Hold each ingredient in your hands for a moment. Close your eyes and breathe in its natural scent. Thank the earth for providing this nourishment.",
    },
    {
      "category": "Gratitude",
      "title": "Honor the Journey to Your Kitchen",
      "description":
          "Each ingredient has traveled a unique path to reach your kitchen - from seed to harvest, through many hands that cared for it along the way. Acknowledging this journey cultivates gratitude and connection to the larger web of life.",
      "practice":
          "As you prepare each ingredient, silently thank all the people who helped bring it to you - the farmers, transporters, and store workers.",
    },
    {
      "category": "Seasonal Awareness",
      "title": "Embrace Nature's Timing",
      "description":
          "Mediterranean cuisine celebrates seasonal eating. When possible, choose ingredients that are in season in your area. This not only ensures peak flavor and nutrition but also connects you to the natural rhythms of your local environment.",
      "practice":
          "Visit a local farmer's market to source seasonal ingredients. Ask the farmers about their growing practices and the best ways to prepare their produce.",
    },
    {
      "category": "Sensory Connection",
      "title": "Cook with All Your Senses",
      "description":
          "Mindful cooking engages all five senses. Listen to the sizzle of vegetables in the pan, feel the texture of herbs as you chop them, watch the colors transform as ingredients cook, and breathe in the evolving aromas.",
      "practice":
          "Put away distractions and focus entirely on the cooking process. Notice how the sounds, smells, and colors change throughout the preparation.",
    },
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 4, vsync: this);
    _scrollController = ScrollController();
  }

  @override
  void dispose() {
    _tabController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      body: Stack(
        children: [
          NestedScrollView(
            controller: _scrollController,
            headerSliverBuilder: (context, innerBoxIsScrolled) {
              return [
                RecipeHeaderWidget(
                  recipe: _recipeData,
                  onBackPressed: _handleBackPressed,
                  onSharePressed: _handleSharePressed,
                ),
              ];
            },
            body: Column(
              children: [
                RecipeInfoWidget(recipe: _recipeData),
                Container(
                  color: AppTheme.lightTheme.colorScheme.surface,
                  child: TabBar(
                    controller: _tabController,
                    tabs: [
                      Tab(
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            CustomIconWidget(
                              iconName: 'list_alt',
                              color: AppTheme.lightTheme.colorScheme.primary,
                              size: 16,
                            ),
                            SizedBox(width: 1.w),
                            Text('Ingredients'),
                          ],
                        ),
                      ),
                      Tab(
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            CustomIconWidget(
                              iconName: 'menu_book',
                              color: AppTheme.lightTheme.colorScheme.primary,
                              size: 16,
                            ),
                            SizedBox(width: 1.w),
                            Text('Steps'),
                          ],
                        ),
                      ),
                      Tab(
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            CustomIconWidget(
                              iconName: 'analytics',
                              color: AppTheme.lightTheme.colorScheme.primary,
                              size: 16,
                            ),
                            SizedBox(width: 1.w),
                            Text('Nutrition'),
                          ],
                        ),
                      ),
                      Tab(
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            CustomIconWidget(
                              iconName: 'self_improvement',
                              color: AppTheme.lightTheme.colorScheme.primary,
                              size: 16,
                            ),
                            SizedBox(width: 1.w),
                            Text('Tips'),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
                Expanded(
                  child: TabBarView(
                    controller: _tabController,
                    children: [
                      IngredientsTabWidget(
                        ingredients: _ingredients,
                        onAddToGroceryList: _handleAddToGroceryList,
                      ),
                      InstructionsTabWidget(
                        instructions: _instructions,
                      ),
                      NutritionTabWidget(
                        nutrition: _nutritionData,
                      ),
                      MindfulTipsTabWidget(
                        mindfulTips: _mindfulTips,
                      ),
                    ],
                  ),
                ),
                SizedBox(height: 10.h), // Space for bottom action bar
              ],
            ),
          ),
          FloatingActionButtonWidget(
            onAddToMealPlan: _handleAddToMealPlan,
          ),
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: BottomActionBarWidget(
              onAddToMealPlan: _handleAddToMealPlan,
              onAddToGroceryList: _handleAddAllToGroceryList,
            ),
          ),
        ],
      ),
    );
  }

  void _handleBackPressed() {
    Navigator.pop(context);
  }

  void _handleSharePressed() {
    // Platform-specific sharing implementation
    final recipeText = '''
${_recipeData['title']}

${_recipeData['description']}

Prep Time: ${_recipeData['prepTime']} minutes
Servings: ${_recipeData['servings']}
Calories: ${_recipeData['calories']} per serving

Ingredients:
${_ingredients.map((ingredient) => '• ${ingredient['quantity']} ${ingredient['name']}').join('\n')}

Instructions:
${_instructions.asMap().entries.map((entry) => '${entry.key + 1}. ${entry.value['step']}').join('\n\n')}

Shared from Mindful Meals app
    ''';

    Clipboard.setData(ClipboardData(text: recipeText));

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content:
            Text('Recipe copied to clipboard! You can now share it anywhere.'),
        duration: Duration(seconds: 3),
        behavior: SnackBarBehavior.floating,
        backgroundColor: AppTheme.lightTheme.colorScheme.primary,
      ),
    );
  }

  void _handleAddToMealPlan() {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            CustomIconWidget(
              iconName: 'check_circle',
              color: AppTheme.lightTheme.colorScheme.onPrimary,
              size: 20,
            ),
            SizedBox(width: 2.w),
            Expanded(
              child: Text(
                'Recipe added to your meal plan!',
                style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                  color: AppTheme.lightTheme.colorScheme.onPrimary,
                ),
              ),
            ),
          ],
        ),
        duration: Duration(seconds: 3),
        behavior: SnackBarBehavior.floating,
        backgroundColor: AppTheme.lightTheme.colorScheme.primary,
        action: SnackBarAction(
          label: 'View Plan',
          textColor: AppTheme.lightTheme.colorScheme.onPrimary,
          onPressed: () {
            Navigator.pushNamed(context, '/meal-planning-calendar');
          },
        ),
      ),
    );
  }

  void _handleAddToGroceryList(Map<String, dynamic> ingredient) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('${ingredient['name']} added to grocery list'),
        duration: Duration(seconds: 2),
        behavior: SnackBarBehavior.floating,
        backgroundColor: AppTheme.lightTheme.colorScheme.secondary,
      ),
    );
  }

  void _handleAddAllToGroceryList() {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            CustomIconWidget(
              iconName: 'shopping_cart',
              color: AppTheme.lightTheme.colorScheme.onSecondary,
              size: 20,
            ),
            SizedBox(width: 2.w),
            Expanded(
              child: Text(
                'All ingredients added to grocery list!',
                style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                  color: AppTheme.lightTheme.colorScheme.onSecondary,
                ),
              ),
            ),
          ],
        ),
        duration: Duration(seconds: 3),
        behavior: SnackBarBehavior.floating,
        backgroundColor: AppTheme.lightTheme.colorScheme.secondary,
        action: SnackBarAction(
          label: 'View List',
          textColor: AppTheme.lightTheme.colorScheme.onSecondary,
          onPressed: () {
            Navigator.pushNamed(context, '/grocery-list');
          },
        ),
      ),
    );
  }
}
