import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/cooking_frequency_slider_widget.dart';
import './widgets/preference_card_widget.dart';
import './widgets/preference_section_widget.dart';
import './widgets/progress_indicator_widget.dart';
import './widgets/wellness_goal_card_widget.dart';

class DietaryPreferencesSetup extends StatefulWidget {
  const DietaryPreferencesSetup({super.key});

  @override
  State<DietaryPreferencesSetup> createState() =>
      _DietaryPreferencesSetupState();
}

class _DietaryPreferencesSetupState extends State<DietaryPreferencesSetup> {
  // Section expansion states
  bool _isDietaryRestrictionsExpanded = true;
  bool _isAllergiesExpanded = true;
  bool _isCookingSkillExpanded = true;
  bool _isWellnessGoalsExpanded = true;

  // Selection states
  Set<String> _selectedDietaryRestrictions = {};
  Set<String> _selectedAllergies = {};
  String _selectedCookingSkill = '';
  Set<String> _selectedWellnessGoals = {};
  double _cookingFrequency = 2.0;

  // Mock data for dietary restrictions
  final List<Map<String, dynamic>> _dietaryRestrictions = [
    {
      'id': 'vegetarian',
      'title': 'Vegetarian',
      'subtitle': 'No meat, poultry, or fish',
      'icon': 'eco',
    },
    {
      'id': 'vegan',
      'title': 'Vegan',
      'subtitle': 'No animal products',
      'icon': 'nature',
    },
    {
      'id': 'gluten_free',
      'title': 'Gluten-Free',
      'subtitle': 'No wheat, barley, or rye',
      'icon': 'grain',
    },
    {
      'id': 'dairy_free',
      'title': 'Dairy-Free',
      'subtitle': 'No milk or dairy products',
      'icon': 'no_drinks',
    },
    {
      'id': 'keto',
      'title': 'Ketogenic',
      'subtitle': 'Low-carb, high-fat diet',
      'icon': 'fitness_center',
    },
    {
      'id': 'paleo',
      'title': 'Paleo',
      'subtitle': 'Whole foods, no processed items',
      'icon': 'outdoor_grill',
    },
  ];

  // Mock data for allergies
  final List<Map<String, dynamic>> _allergies = [
    {
      'id': 'nuts',
      'title': 'Tree Nuts',
      'subtitle': 'Almonds, walnuts, cashews, etc.',
      'icon': 'warning',
    },
    {
      'id': 'peanuts',
      'title': 'Peanuts',
      'subtitle': 'Peanuts and peanut products',
      'icon': 'warning',
    },
    {
      'id': 'shellfish',
      'title': 'Shellfish',
      'subtitle': 'Shrimp, crab, lobster, etc.',
      'icon': 'warning',
    },
    {
      'id': 'fish',
      'title': 'Fish',
      'subtitle': 'All types of fish',
      'icon': 'warning',
    },
    {
      'id': 'eggs',
      'title': 'Eggs',
      'subtitle': 'Chicken eggs and egg products',
      'icon': 'warning',
    },
    {
      'id': 'soy',
      'title': 'Soy',
      'subtitle': 'Soybeans and soy products',
      'icon': 'warning',
    },
  ];

  // Mock data for cooking skills
  final List<Map<String, dynamic>> _cookingSkills = [
    {
      'id': 'beginner',
      'title': 'Beginner',
      'subtitle': 'Simple recipes with basic techniques',
      'icon': 'school',
    },
    {
      'id': 'intermediate',
      'title': 'Intermediate',
      'subtitle': 'Comfortable with most cooking methods',
      'icon': 'restaurant',
    },
    {
      'id': 'advanced',
      'title': 'Advanced',
      'subtitle': 'Experienced with complex techniques',
      'icon': 'star',
    },
  ];

  // Mock data for wellness goals
  final List<Map<String, dynamic>> _wellnessGoals = [
    {
      'id': 'mindful_eating',
      'title': 'Mindful Eating',
      'description':
          'Focus on being present during meals, savoring flavors, and listening to hunger cues for a more conscious relationship with food.',
      'icon': 'self_improvement',
    },
    {
      'id': 'energy_balance',
      'title': 'Energy Balance',
      'description':
          'Maintain steady energy levels throughout the day with balanced nutrition that supports your active lifestyle and well-being.',
      'icon': 'battery_charging_full',
    },
    {
      'id': 'seasonal_eating',
      'title': 'Seasonal Eating',
      'description':
          'Embrace fresh, local ingredients that change with the seasons for optimal nutrition and environmental sustainability.',
      'icon': 'wb_sunny',
    },
    {
      'id': 'digestive_health',
      'title': 'Digestive Health',
      'description':
          'Support your digestive system with fiber-rich foods, probiotics, and gentle ingredients that promote gut wellness.',
      'icon': 'favorite',
    },
    {
      'id': 'stress_reduction',
      'title': 'Stress Reduction',
      'description':
          'Use nutrition as a tool for managing stress with calming foods and meal routines that promote relaxation.',
      'icon': 'spa',
    },
  ];

  double get _completionProgress {
    int completedSections = 0;
    int totalSections = 4;

    if (_selectedDietaryRestrictions.isNotEmpty) completedSections++;
    if (_selectedCookingSkill.isNotEmpty) completedSections++;
    if (_selectedWellnessGoals.isNotEmpty) completedSections++;
    if (_cookingFrequency > 0) completedSections++;

    return completedSections / totalSections;
  }

  bool get _canContinue {
    return _selectedCookingSkill.isNotEmpty &&
        _selectedWellnessGoals.isNotEmpty;
  }

  void _toggleDietaryRestriction(String id) {
    setState(() {
      if (_selectedDietaryRestrictions.contains(id)) {
        _selectedDietaryRestrictions.remove(id);
      } else {
        _selectedDietaryRestrictions.add(id);
      }
    });
  }

  void _toggleAllergy(String id) {
    setState(() {
      if (_selectedAllergies.contains(id)) {
        _selectedAllergies.remove(id);
      } else {
        _selectedAllergies.add(id);
      }
    });
  }

  void _selectCookingSkill(String id) {
    setState(() {
      _selectedCookingSkill = id;
    });
  }

  void _toggleWellnessGoal(String id) {
    setState(() {
      if (_selectedWellnessGoals.contains(id)) {
        _selectedWellnessGoals.remove(id);
      } else {
        _selectedWellnessGoals.add(id);
      }
    });
  }

  void _onContinue() {
    if (_canContinue) {
      Navigator.pushNamed(context, '/meal-planning-dashboard');
    }
  }

  void _onSkip() {
    Navigator.pushNamed(context, '/meal-planning-dashboard');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          onPressed: () => Navigator.pop(context),
          icon: CustomIconWidget(
            iconName: 'arrow_back',
            color: AppTheme.textPrimaryLight,
            size: 24,
          ),
        ),
        actions: [
          TextButton(
            onPressed: _onSkip,
            child: Text(
              'Skip',
              style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                color: AppTheme.textSecondaryLight,
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
          SizedBox(width: 2.w),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Progress indicator
            ProgressIndicatorWidget(
              progress: _completionProgress,
              stepText: 'Step 2 of 3 - Dietary Preferences',
            ),

            // Scrollable content
            Expanded(
              child: SingleChildScrollView(
                padding: EdgeInsets.symmetric(horizontal: 4.w),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    SizedBox(height: 2.h),

                    // Header section
                    Container(
                      width: double.infinity,
                      padding: EdgeInsets.symmetric(vertical: 2.h),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          // Illustration placeholder
                          Container(
                            width: 30.w,
                            height: 30.w,
                            decoration: BoxDecoration(
                              color: AppTheme.accentLight,
                              borderRadius: BorderRadius.circular(20),
                            ),
                            child: Center(
                              child: CustomIconWidget(
                                iconName: 'restaurant_menu',
                                color: AppTheme.primaryLight,
                                size: 48,
                              ),
                            ),
                          ),
                          SizedBox(height: 3.h),
                          Text(
                            'Let\'s personalize your mindful eating journey',
                            textAlign: TextAlign.center,
                            style: AppTheme.lightTheme.textTheme.headlineSmall
                                ?.copyWith(
                              color: AppTheme.textPrimaryLight,
                              fontWeight: FontWeight.w600,
                              height: 1.3,
                            ),
                          ),
                          SizedBox(height: 1.h),
                          Text(
                            'Share your preferences so we can create the perfect meal plan for your wellness goals',
                            textAlign: TextAlign.center,
                            style: AppTheme.lightTheme.textTheme.bodyMedium
                                ?.copyWith(
                              color: AppTheme.textSecondaryLight,
                              height: 1.4,
                            ),
                          ),
                        ],
                      ),
                    ),

                    SizedBox(height: 2.h),

                    // Dietary Restrictions Section
                    PreferenceSectionWidget(
                      title: 'Dietary Restrictions',
                      subtitle: 'Select any dietary preferences you follow',
                      isExpanded: _isDietaryRestrictionsExpanded,
                      onToggle: () {
                        setState(() {
                          _isDietaryRestrictionsExpanded =
                              !_isDietaryRestrictionsExpanded;
                        });
                      },
                      children: [
                        ...(_dietaryRestrictions as List).map((restriction) {
                          final restrictionMap =
                              restriction as Map<String, dynamic>;
                          return PreferenceCardWidget(
                            title: restrictionMap['title'] as String,
                            subtitle: restrictionMap['subtitle'] as String,
                            iconName: restrictionMap['icon'] as String,
                            isSelected: _selectedDietaryRestrictions
                                .contains(restrictionMap['id']),
                            onTap: () => _toggleDietaryRestriction(
                                restrictionMap['id'] as String),
                          );
                        }).toList(),
                      ],
                    ),

                    // Allergies Section
                    PreferenceSectionWidget(
                      title: 'Food Allergies',
                      subtitle: 'Let us know about any food allergies',
                      isExpanded: _isAllergiesExpanded,
                      onToggle: () {
                        setState(() {
                          _isAllergiesExpanded = !_isAllergiesExpanded;
                        });
                      },
                      children: [
                        ...(_allergies as List).map((allergy) {
                          final allergyMap = allergy as Map<String, dynamic>;
                          return PreferenceCardWidget(
                            title: allergyMap['title'] as String,
                            subtitle: allergyMap['subtitle'] as String,
                            iconName: allergyMap['icon'] as String,
                            isSelected:
                                _selectedAllergies.contains(allergyMap['id']),
                            onTap: () =>
                                _toggleAllergy(allergyMap['id'] as String),
                          );
                        }).toList(),
                      ],
                    ),

                    // Cooking Skill Section
                    PreferenceSectionWidget(
                      title: 'Cooking Experience',
                      subtitle: 'Help us match recipes to your skill level',
                      isExpanded: _isCookingSkillExpanded,
                      onToggle: () {
                        setState(() {
                          _isCookingSkillExpanded = !_isCookingSkillExpanded;
                        });
                      },
                      children: [
                        ...(_cookingSkills as List).map((skill) {
                          final skillMap = skill as Map<String, dynamic>;
                          return PreferenceCardWidget(
                            title: skillMap['title'] as String,
                            subtitle: skillMap['subtitle'] as String,
                            iconName: skillMap['icon'] as String,
                            isSelected: _selectedCookingSkill == skillMap['id'],
                            onTap: () =>
                                _selectCookingSkill(skillMap['id'] as String),
                          );
                        }).toList(),
                        SizedBox(height: 2.h),
                        CookingFrequencySliderWidget(
                          value: _cookingFrequency,
                          onChanged: (value) {
                            setState(() {
                              _cookingFrequency = value;
                            });
                          },
                        ),
                      ],
                    ),

                    // Wellness Goals Section
                    PreferenceSectionWidget(
                      title: 'Wellness Goals',
                      subtitle: 'What would you like to focus on?',
                      isExpanded: _isWellnessGoalsExpanded,
                      onToggle: () {
                        setState(() {
                          _isWellnessGoalsExpanded = !_isWellnessGoalsExpanded;
                        });
                      },
                      children: [
                        ...(_wellnessGoals as List).map((goal) {
                          final goalMap = goal as Map<String, dynamic>;
                          return WellnessGoalCardWidget(
                            title: goalMap['title'] as String,
                            description: goalMap['description'] as String,
                            iconName: goalMap['icon'] as String,
                            isSelected:
                                _selectedWellnessGoals.contains(goalMap['id']),
                            onTap: () =>
                                _toggleWellnessGoal(goalMap['id'] as String),
                          );
                        }).toList(),
                      ],
                    ),

                    SizedBox(height: 10.h),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),

      // Bottom sticky area
      bottomNavigationBar: Container(
        padding: EdgeInsets.fromLTRB(4.w, 2.h, 4.w, 2.h),
        decoration: BoxDecoration(
          color: AppTheme.lightTheme.scaffoldBackgroundColor,
          boxShadow: [
            BoxShadow(
              color: AppTheme.shadowLight,
              blurRadius: 8,
              offset: const Offset(0, -2),
            ),
          ],
        ),
        child: SafeArea(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              if (!_canContinue)
                Container(
                  width: double.infinity,
                  padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
                  margin: EdgeInsets.only(bottom: 2.h),
                  decoration: BoxDecoration(
                    color: AppTheme.warningLight.withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(
                      color: AppTheme.warningLight.withValues(alpha: 0.3),
                    ),
                  ),
                  child: Row(
                    children: [
                      CustomIconWidget(
                        iconName: 'info',
                        color: AppTheme.warningLight,
                        size: 20,
                      ),
                      SizedBox(width: 2.w),
                      Expanded(
                        child: Text(
                          'Please select your cooking skill level and at least one wellness goal to continue',
                          style:
                              AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                            color: AppTheme.warningLight,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              SizedBox(
                width: double.infinity,
                height: 6.h,
                child: ElevatedButton(
                  onPressed: _canContinue ? _onContinue : null,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: _canContinue
                        ? AppTheme.primaryLight
                        : AppTheme.textDisabledLight,
                    foregroundColor: AppTheme.onPrimaryLight,
                    elevation: _canContinue ? 2 : 0,
                    shape: RoundedRectangleBorder(
                      borderRadius:
                          BorderRadius.circular(AppTheme.buttonBorderRadius),
                    ),
                  ),
                  child: Text(
                    'Continue to Dashboard',
                    style: AppTheme.lightTheme.textTheme.bodyLarge?.copyWith(
                      color: AppTheme.onPrimaryLight,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
