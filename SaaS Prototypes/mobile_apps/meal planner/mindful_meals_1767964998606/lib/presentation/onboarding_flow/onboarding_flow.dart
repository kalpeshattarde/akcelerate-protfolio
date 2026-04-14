import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../theme/app_theme.dart';
import './widgets/onboarding_page_widget.dart';
import './widgets/page_indicator_widget.dart';
import './widgets/preference_card_widget.dart';

class OnboardingFlow extends StatefulWidget {
  const OnboardingFlow({Key? key}) : super(key: key);

  @override
  State<OnboardingFlow> createState() => _OnboardingFlowState();
}

class _OnboardingFlowState extends State<OnboardingFlow>
    with TickerProviderStateMixin {
  late PageController _pageController;
  late AnimationController _fadeController;
  late Animation<double> _fadeAnimation;

  int _currentPage = 0;
  final int _totalPages = 4;

  // Preference selections for the final page
  Set<String> _selectedDietaryRestrictions = {};
  String _selectedCookingLevel = '';
  Set<String> _selectedWellnessGoals = {};

  // Mock data for onboarding content
  final List<Map<String, dynamic>> _onboardingData = [
    {
      "title": "Welcome to Mindful Meals",
      "description":
          "Discover the joy of mindful eating with personalized meal planning that nourishes both body and soul. Let's begin your journey to wellness.",
      "imageUrl":
          "https://images.unsplash.com/photo-1687425976709-0faf7b66b854",
      "semanticLabel":
          "Fresh seasonal vegetables and herbs arranged on a wooden cutting board with natural lighting"
    },
    {
      "title": "Personalized Just for You",
      "description":
          "Get meal recommendations tailored to your preferences, dietary needs, and wellness goals. Every suggestion is crafted with your unique journey in mind.",
      "imageUrl":
          "https://images.unsplash.com/photo-1523754079758-30e4ffecebb4",
      "semanticLabel":
          "Colorful array of fresh fruits and vegetables arranged in a heart shape on white background"
    },
    {
      "title": "Mindful Eating Guidance",
      "description":
          "Learn the art of mindful eating with gentle reminders, breathing exercises, and techniques that help you savor every bite and listen to your body.",
      "imageUrl":
          "https://images.unsplash.com/photo-1684354612089-d1c3d37609fa",
      "semanticLabel":
          "Person meditating peacefully in lotus position surrounded by healthy foods and plants"
    }
  ];

  // Mock data for preferences
  final List<Map<String, dynamic>> _dietaryRestrictions = [
    {
      "id": "vegetarian",
      "title": "Vegetarian",
      "description": "Plant-based meals with dairy and eggs",
      "icon": "eco"
    },
    {
      "id": "vegan",
      "title": "Vegan",
      "description": "Completely plant-based nutrition",
      "icon": "local_florist"
    },
    {
      "id": "gluten_free",
      "title": "Gluten-Free",
      "description": "No wheat, barley, or rye ingredients",
      "icon": "no_food"
    },
    {
      "id": "dairy_free",
      "title": "Dairy-Free",
      "description": "No milk or dairy products",
      "icon": "block"
    }
  ];

  final List<Map<String, dynamic>> _cookingLevels = [
    {
      "id": "beginner",
      "title": "Beginner",
      "description": "Simple recipes with basic techniques",
      "icon": "school"
    },
    {
      "id": "intermediate",
      "title": "Intermediate",
      "description": "Moderate complexity with some skills",
      "icon": "trending_up"
    },
    {
      "id": "advanced",
      "title": "Advanced",
      "description": "Complex recipes and techniques",
      "icon": "star"
    }
  ];

  final List<Map<String, dynamic>> _wellnessGoals = [
    {
      "id": "weight_management",
      "title": "Weight Management",
      "description": "Balanced nutrition for healthy weight",
      "icon": "fitness_center"
    },
    {
      "id": "energy_boost",
      "title": "Energy Boost",
      "description": "Foods that naturally increase energy",
      "icon": "bolt"
    },
    {
      "id": "stress_relief",
      "title": "Stress Relief",
      "description": "Calming foods for mental wellness",
      "icon": "self_improvement"
    },
    {
      "id": "better_sleep",
      "title": "Better Sleep",
      "description": "Nutrition that supports restful sleep",
      "icon": "bedtime"
    }
  ];

  @override
  void initState() {
    super.initState();
    _pageController = PageController();
    _fadeController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );
    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _fadeController, curve: Curves.easeInOut),
    );
    _fadeController.forward();
  }

  @override
  void dispose() {
    _pageController.dispose();
    _fadeController.dispose();
    super.dispose();
  }

  void _nextPage() {
    if (_currentPage < _totalPages - 1) {
      HapticFeedback.lightImpact();
      _pageController.nextPage(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
    } else {
      _completeOnboarding();
    }
  }

  void _skipOnboarding() {
    HapticFeedback.lightImpact();
    Navigator.pushReplacementNamed(context, '/dietary-preferences-setup');
  }

  void _completeOnboarding() {
    HapticFeedback.mediumImpact();
    Navigator.pushReplacementNamed(context, '/dietary-preferences-setup');
  }

  void _onPageChanged(int page) {
    setState(() {
      _currentPage = page;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      body: FadeTransition(
        opacity: _fadeAnimation,
        child: Column(
          children: [
            Expanded(
              child: PageView.builder(
                controller: _pageController,
                onPageChanged: _onPageChanged,
                itemCount: _totalPages,
                itemBuilder: (context, index) {
                  if (index < _onboardingData.length) {
                    return OnboardingPageWidget(
                      title: _onboardingData[index]["title"] as String,
                      description:
                          _onboardingData[index]["description"] as String,
                      imageUrl: _onboardingData[index]["imageUrl"] as String,
                      semanticLabel:
                          _onboardingData[index]["semanticLabel"] as String,
                      onContinue: _nextPage,
                      onSkip: _skipOnboarding,
                    );
                  } else {
                    return _buildPreferencesPage();
                  }
                },
              ),
            ),

            // Page indicator
            Container(
              padding: EdgeInsets.symmetric(vertical: 2.h),
              child: PageIndicatorWidget(
                currentPage: _currentPage,
                totalPages: _totalPages,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPreferencesPage() {
    return OnboardingPageWidget(
      title: "Tell Us About You",
      description:
          "Help us personalize your mindful eating journey with a few quick preferences.",
      imageUrl:
          "https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=800",
      semanticLabel:
          "Hands holding a bowl of colorful fresh salad with various vegetables and herbs",
      onContinue: _completeOnboarding,
      onSkip: _skipOnboarding,
      showContinueButton: true,
      customContent: _buildPreferencesContent(),
    );
  }

  Widget _buildPreferencesContent() {
    return Expanded(
      child: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Dietary Restrictions
            _buildSectionTitle("Dietary Preferences"),
            SizedBox(height: 1.h),
            ..._dietaryRestrictions.map((restriction) => PreferenceCardWidget(
                  title: restriction["title"] as String,
                  description: restriction["description"] as String,
                  iconName: restriction["icon"] as String,
                  isSelected:
                      _selectedDietaryRestrictions.contains(restriction["id"]),
                  onTap: () =>
                      _toggleDietaryRestriction(restriction["id"] as String),
                )),

            SizedBox(height: 3.h),

            // Cooking Level
            _buildSectionTitle("Cooking Experience"),
            SizedBox(height: 1.h),
            ..._cookingLevels.map((level) => PreferenceCardWidget(
                  title: level["title"] as String,
                  description: level["description"] as String,
                  iconName: level["icon"] as String,
                  isSelected: _selectedCookingLevel == level["id"],
                  onTap: () => _selectCookingLevel(level["id"] as String),
                )),

            SizedBox(height: 3.h),

            // Wellness Goals
            _buildSectionTitle("Wellness Goals"),
            SizedBox(height: 1.h),
            ..._wellnessGoals.map((goal) => PreferenceCardWidget(
                  title: goal["title"] as String,
                  description: goal["description"] as String,
                  iconName: goal["icon"] as String,
                  isSelected: _selectedWellnessGoals.contains(goal["id"]),
                  onTap: () => _toggleWellnessGoal(goal["id"] as String),
                )),

            SizedBox(height: 2.h),
          ],
        ),
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Text(
      title,
      style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
        color: AppTheme.lightTheme.colorScheme.onSurface,
        fontWeight: FontWeight.w600,
      ),
    );
  }

  void _toggleDietaryRestriction(String restrictionId) {
    setState(() {
      if (_selectedDietaryRestrictions.contains(restrictionId)) {
        _selectedDietaryRestrictions.remove(restrictionId);
      } else {
        _selectedDietaryRestrictions.add(restrictionId);
      }
    });
    HapticFeedback.selectionClick();
  }

  void _selectCookingLevel(String levelId) {
    setState(() {
      _selectedCookingLevel = levelId;
    });
    HapticFeedback.selectionClick();
  }

  void _toggleWellnessGoal(String goalId) {
    setState(() {
      if (_selectedWellnessGoals.contains(goalId)) {
        _selectedWellnessGoals.remove(goalId);
      } else {
        _selectedWellnessGoals.add(goalId);
      }
    });
    HapticFeedback.selectionClick();
  }
}
