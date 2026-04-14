import 'package:flutter/material.dart';
import '../presentation/onboarding_screen/onboarding_screen.dart';
import '../presentation/product_detail_screen/product_detail_screen.dart';
import '../presentation/splash_screen/splash_screen.dart';
import '../presentation/order_tracking_screen/order_tracking_screen.dart';
import '../presentation/authentication_screen/authentication_screen.dart';
import '../presentation/checkout_screen/checkout_screen.dart';
import '../widgets/main_layout_wrapper.dart';

class AppRoutes {
  // Unauthenticated routes
  static const String initial = '/';
  static const String onboarding = '/onboarding-screen';
  static const String splash = '/splash-screen';
  static const String authentication = '/authentication-screen';

  // Main layout wrapper - entry point for authenticated app
  static const String mainLayout = '/main-layout';

  // Main tab routes - all go through MainLayoutWrapper
  static const String home = '/home-screen';
  static const String search = '/search-screen';
  static const String shoppingCart = '/shopping-cart-screen';
  static const String orderHistory = '/order-history-screen';
  static const String profile = '/profile-screen';

  // Detail screens - these should be pushed within the MainLayoutWrapper context
  static const String productDetail = '/product-detail-screen';
  static const String checkout = '/checkout-screen';
  static const String orderTracking = '/order-tracking-screen';

  static Map<String, WidgetBuilder> routes = {
    initial: (context) => const SplashScreen(),
    onboarding: (context) => const OnboardingScreen(),
    splash: (context) => const SplashScreen(),
    authentication: (context) => const AuthenticationScreen(),

    // Main layout - default entry point after authentication
    mainLayout: (context) => const MainLayoutWrapper(initialIndex: 0),

    // Main authenticated screens with persistent bottom navigation
    home: (context) => const MainLayoutWrapper(initialIndex: 0),
    search: (context) => const MainLayoutWrapper(initialIndex: 1),
    shoppingCart: (context) => const MainLayoutWrapper(initialIndex: 2),
    orderHistory: (context) => const MainLayoutWrapper(initialIndex: 3),
    profile: (context) => const MainLayoutWrapper(initialIndex: 4),

    // Detail screens - wrapped to maintain bottom navigation context
    productDetail: (context) => const ProductDetailScreen(),
    checkout: (context) => const CheckoutScreen(),
    orderTracking: (context) => const OrderTrackingScreen(),
  };

  /// Helper method to get the correct route for a tab index
  static String getRouteForIndex(int index) {
    switch (index) {
      case 0:
        return home;
      case 1:
        return search;
      case 2:
        return shoppingCart;
      case 3:
        return orderHistory;
      case 4:
        return profile;
      default:
        return home;
    }
  }
}
