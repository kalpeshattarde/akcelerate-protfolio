import 'package:flutter/material.dart';

import '../../core/app_export.dart';
import '../home_screen/home_screen.dart';
import '../orders_history_screen/orders_history_screen.dart';
import '../pricing_screen/pricing_screen.dart';
import '../wallet_screen/wallet_screen.dart';

class MainNavigationScreen extends StatefulWidget {
  const MainNavigationScreen({Key? key}) : super(key: key);

  @override
  State<MainNavigationScreen> createState() => _MainNavigationScreenState();
}

class _MainNavigationScreenState extends State<MainNavigationScreen> {
  int _currentIndex = 0;

  final List<Widget> _screens = [
    const HomeScreen(),
    const PricingScreen(),
    const OrdersHistoryScreen(),
    const WalletScreen(),
  ];

  final List<BottomNavigationBarItem> _bottomNavItems = [
    BottomNavigationBarItem(
      icon: CustomIconWidget(
        iconName: 'home',
        size: 24,
      ),
      activeIcon: CustomIconWidget(
        iconName: 'home',
        size: 24,
      ),
      label: 'Home',
    ),
    BottomNavigationBarItem(
      icon: CustomIconWidget(
        iconName: 'sell',
        size: 24,
      ),
      activeIcon: CustomIconWidget(
        iconName: 'sell',
        size: 24,
      ),
      label: 'Pricing',
    ),
    BottomNavigationBarItem(
      icon: CustomIconWidget(
        iconName: 'list_alt',
        size: 24,
      ),
      activeIcon: CustomIconWidget(
        iconName: 'list_alt',
        size: 24,
      ),
      label: 'Orders',
    ),
    BottomNavigationBarItem(
      icon: CustomIconWidget(
        iconName: 'account_balance_wallet',
        size: 24,
      ),
      activeIcon: CustomIconWidget(
        iconName: 'account_balance_wallet',
        size: 24,
      ),
      label: 'Wallet',
    ),
  ];

  void _onTabTapped(int index) {
    setState(() {
      _currentIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: _screens,
      ),
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color: AppTheme.lightTheme.scaffoldBackgroundColor,
          border: Border(
            top: BorderSide(
              color: AppTheme.lightTheme.dividerColor,
              width: 1,
            ),
          ),
          boxShadow: [
            BoxShadow(
              color:
                  AppTheme.lightTheme.colorScheme.shadow.withValues(alpha: 0.1),
              blurRadius: 8,
              offset: Offset(0, -2),
            ),
          ],
        ),
        child: SafeArea(
          child: BottomNavigationBar(
            currentIndex: _currentIndex,
            onTap: _onTabTapped,
            type: BottomNavigationBarType.fixed,
            backgroundColor: Colors.transparent,
            elevation: 0,
            selectedItemColor: AppTheme.lightTheme.colorScheme.primary,
            unselectedItemColor: AppTheme.lightTheme.colorScheme.onSurface
                .withValues(alpha: 0.6),
            selectedLabelStyle:
                AppTheme.lightTheme.textTheme.labelMedium?.copyWith(
              fontWeight: FontWeight.w600,
              color: AppTheme.lightTheme.colorScheme.primary,
            ),
            unselectedLabelStyle:
                AppTheme.lightTheme.textTheme.labelMedium?.copyWith(
              fontWeight: FontWeight.w400,
              color: AppTheme.lightTheme.colorScheme.onSurface
                  .withValues(alpha: 0.6),
            ),
            items: _bottomNavItems,
          ),
        ),
      ),
    );
  }
}
