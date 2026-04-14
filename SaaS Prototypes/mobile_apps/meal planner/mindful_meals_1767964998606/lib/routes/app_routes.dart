import 'package:flutter/material.dart';
import '../presentation/splash_screen/splash_screen.dart';
import '../presentation/dietary_preferences_setup/dietary_preferences_setup.dart';
import '../presentation/user_profile/user_profile.dart';
import '../presentation/authentication_screen/authentication_screen.dart';
import '../presentation/onboarding_flow/onboarding_flow.dart';
import '../presentation/grocery_list/grocery_list.dart';
import '../presentation/mindful_eating_timer/mindful_eating_timer.dart';
import '../presentation/recipe_discovery/recipe_discovery.dart';
import '../presentation/recipe_detail/recipe_detail.dart';
import '../presentation/meal_planning_calendar/meal_planning_calendar.dart';
import '../presentation/meal_planning_dashboard/meal_planning_dashboard.dart';

class AppRoutes {
  // TODO: Add your routes here
  static const String initial = '/';
  static const String splash = '/splash-screen';
  static const String dietaryPreferencesSetup = '/dietary-preferences-setup';
  static const String userProfile = '/user-profile';
  static const String authentication = '/authentication-screen';
  static const String onboardingFlow = '/onboarding-flow';
  static const String groceryList = '/grocery-list';
  static const String mindfulEatingTimer = '/mindful-eating-timer';
  static const String recipeDiscovery = '/recipe-discovery';
  static const String recipeDetail = '/recipe-detail';
  static const String mealPlanningCalendar = '/meal-planning-calendar';
  static const String mealPlanningDashboard = '/meal-planning-dashboard';

  static Map<String, WidgetBuilder> routes = {
    initial: (context) => const SplashScreen(),
    splash: (context) => const SplashScreen(),
    dietaryPreferencesSetup: (context) => const DietaryPreferencesSetup(),
    userProfile: (context) => const UserProfile(),
    authentication: (context) => const AuthenticationScreen(),
    onboardingFlow: (context) => const OnboardingFlow(),
    groceryList: (context) => const GroceryList(),
    mindfulEatingTimer: (context) => const MindfulEatingTimer(),
    recipeDiscovery: (context) => const RecipeDiscovery(),
    recipeDetail: (context) => const RecipeDetail(),
    mealPlanningCalendar: (context) => const MealPlanningCalendar(),
    mealPlanningDashboard: (context) => const MealPlanningDashboard(),
    // TODO: Add your other routes here
  };
}
