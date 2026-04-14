import 'package:flutter/material.dart';
import '../presentation/splash_screen/splash_screen.dart';
import '../presentation/order_tracking_screen/order_tracking_screen.dart';
import '../presentation/booking_wizard_modal/booking_wizard_modal.dart';
import '../presentation/home_screen/home_screen.dart';
import '../presentation/order_confirmation_screen/order_confirmation_screen.dart';
import '../presentation/pricing_screen/pricing_screen.dart';
import '../presentation/orders_history_screen/orders_history_screen.dart';
import '../presentation/wallet_screen/wallet_screen.dart';
import '../presentation/main_navigation/main_navigation_screen.dart';

class AppRoutes {
  // TODO: Add your routes here
  static const String initial = '/';
  static const String splash = '/splash-screen';
  static const String mainNavigation = '/main-navigation';
  static const String orderTracking = '/order-tracking-screen';
  static const String bookingWizardModal = '/booking-wizard-modal';
  static const String home = '/home-screen';
  static const String orderConfirmation = '/order-confirmation-screen';
  static const String pricing = '/pricing-screen';
  static const String ordersHistory = '/orders-history-screen';
  static const String wallet = '/wallet-screen';

  static Map<String, WidgetBuilder> routes = {
    initial: (context) => const SplashScreen(),
    splash: (context) => const SplashScreen(),
    mainNavigation: (context) => const MainNavigationScreen(),
    orderTracking: (context) => const OrderTrackingScreen(),
    bookingWizardModal: (context) => const BookingWizardModal(),
    home: (context) => const HomeScreen(),
    orderConfirmation: (context) => const OrderConfirmationScreen(),
    pricing: (context) => const PricingScreen(),
    ordersHistory: (context) => const OrdersHistoryScreen(),
    wallet: (context) => const WalletScreen(),
    // TODO: Add your other routes here
  };
}
