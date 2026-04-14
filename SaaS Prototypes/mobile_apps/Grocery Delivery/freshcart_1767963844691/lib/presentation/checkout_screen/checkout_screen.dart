import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../widgets/custom_bottom_bar.dart';
import '../../widgets/main_layout_wrapper.dart';
import './widgets/checkout_progress_widget.dart';
import './widgets/delivery_address_widget.dart';
import './widgets/delivery_time_widget.dart';
import './widgets/order_summary_widget.dart';
import './widgets/payment_method_widget.dart';
import './widgets/special_instructions_widget.dart';

class CheckoutScreen extends StatefulWidget {
  const CheckoutScreen({super.key});

  @override
  State<CheckoutScreen> createState() => _CheckoutScreenState();
}

class _CheckoutScreenState extends State<CheckoutScreen> {
  final TextEditingController _instructionsController = TextEditingController();
  final ScrollController _scrollController = ScrollController();

  int _currentStep = 0;
  bool _isOrderSummaryExpanded = false;
  int _selectedTimeSlotIndex = 0;
  int _selectedPaymentMethodIndex = 0;
  bool _isProcessingOrder = false;

  // Mock data
  final List<Map<String, dynamic>> _cartItems = [
    {
      "id": 1,
      "name": "Fresh Organic Bananas",
      "price": 3.99,
      "quantity": 2,
      "image": "https://images.unsplash.com/photo-1675586677399-2dbd468cad2f",
      "semanticLabel": "Bunch of ripe yellow bananas on white background"
    },
    {
      "id": 2,
      "name": "Whole Milk Gallon",
      "price": 4.49,
      "quantity": 1,
      "image": "https://images.unsplash.com/photo-1600871147778-fbcbcb7413cb",
      "semanticLabel": "Glass of fresh white milk with milk splash"
    },
    {
      "id": 3,
      "name": "Artisan Sourdough Bread",
      "price": 5.99,
      "quantity": 1,
      "image": "https://images.unsplash.com/photo-1646406535610-20df099030a0",
      "semanticLabel":
          "Freshly baked artisan sourdough bread loaf on wooden cutting board"
    },
    {
      "id": 4,
      "name": "Premium Ground Coffee",
      "price": 12.99,
      "quantity": 1,
      "image": "https://images.unsplash.com/photo-1631436448380-4401aee6c47e",
      "semanticLabel": "Dark roasted coffee beans scattered around coffee cup"
    },
    {
      "id": 5,
      "name": "Organic Free-Range Eggs",
      "price": 6.99,
      "quantity": 1,
      "image": "https://images.unsplash.com/photo-1493126955021-1f982a73d3e5",
      "semanticLabel":
          "Brown organic eggs in cardboard carton on rustic wooden surface"
    }
  ];

  final Map<String, dynamic> _selectedAddress = {
    "type": "HOME",
    "name": "John Doe",
    "address": "1234 Oak Street, Apartment 5B, San Francisco, CA 94102",
    "landmark": "Blue Coffee Shop",
    "phone": "+1 (555) 123-4567"
  };

  final List<Map<String, dynamic>> _timeSlots = [
    {
      "label": "Standard",
      "time": "Today, 2-4 PM",
      "type": "standard",
      "fee": 0.0
    },
    {
      "label": "Express",
      "time": "Today, 1-2 PM",
      "type": "express",
      "fee": 4.99
    },
    {
      "label": "Standard",
      "time": "Tomorrow, 9-11 AM",
      "type": "standard",
      "fee": 0.0
    },
    {
      "label": "Standard",
      "time": "Tomorrow, 2-4 PM",
      "type": "standard",
      "fee": 0.0
    }
  ];

  final List<Map<String, dynamic>> _paymentMethods = [
    {"type": "Visa", "lastFour": "4532", "expiry": "12/26"},
    {"type": "Mastercard", "lastFour": "8901", "expiry": "08/25"},
    {"type": "Amex", "lastFour": "1234", "expiry": "03/27"}
  ];

  final List<String> _checkoutSteps = [
    "Review",
    "Address",
    "Payment",
    "Confirm"
  ];

  @override
  void dispose() {
    _instructionsController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  double get _subtotal {
    return _cartItems.fold(
        0.0,
        (sum, item) =>
            sum + ((item['price'] as double) * (item['quantity'] as int)));
  }

  double get _deliveryFee {
    return _timeSlots[_selectedTimeSlotIndex]['fee'] as double;
  }

  double get _discount => 5.50;

  double get _total => _subtotal + _deliveryFee - _discount;

  @override
  Widget build(BuildContext context) {
    // Get the current tab index from MainLayoutWrapper
    final parentState = MainLayoutWrapper.of(context);
    final currentTabIndex =
        parentState?.currentIndex ?? 2; // Default to Cart tab

    return Scaffold(
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      body: NestedScrollView(
        headerSliverBuilder: (BuildContext context, bool innerBoxIsScrolled) {
          return <Widget>[
            SliverOverlapAbsorber(
              handle: NestedScrollView.sliverOverlapAbsorberHandleFor(context),
              sliver: SliverAppBar(
                leading: IconButton(
                  icon: const Icon(Icons.arrow_back),
                  onPressed: () => Navigator.pop(context),
                ),
                title: Text(
                  'Checkout',
                  style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                    fontWeight: FontWeight.w700,
                  ),
                ),
                pinned: true,
                floating: false,
                snap: false,
                elevation: 0,
                backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
                foregroundColor: AppTheme.lightTheme.colorScheme.onSurface,
                surfaceTintColor: Colors.transparent,
                scrolledUnderElevation: 2,
                shadowColor: AppTheme.lightTheme.colorScheme.shadow
                    .withValues(alpha: 0.1),
              ),
            ),
          ];
        },
        body: _buildMainContent(),
      ),
      bottomNavigationBar: CustomBottomBar(
        currentIndex: currentTabIndex,
        onTap: (index) {
          // Update parent tab index and pop detail screen
          parentState?.updateTabIndex(index);
          if (index != currentTabIndex) {
            Navigator.pop(context);
          }
        },
        variant: BottomBarVariant.primary,
      ),
    );
  }

  String _getRouteForIndex(int index) {
    switch (index) {
      case 0:
        return '/home-screen';
      case 1:
        return '/search-screen';
      case 2:
        return '/shopping-cart-screen';
      case 3:
        return '/order-history-screen';
      case 4:
        return '/profile-screen';
      default:
        return '/home-screen';
    }
  }

  Widget _buildMainContent() {
    return Builder(
      builder: (BuildContext context) {
        return CustomScrollView(
          slivers: [
            SliverOverlapInjector(
              handle: NestedScrollView.sliverOverlapAbsorberHandleFor(context),
            ),
            SliverToBoxAdapter(
              child: Column(
                children: [
                  // Checkout Progress Widget
                  CheckoutProgressWidget(
                    currentStep: _currentStep,
                    steps: const [
                      'Delivery',
                      'Payment',
                      'Confirm',
                    ],
                  ),
                  Expanded(
                    child: SingleChildScrollView(
                      controller: _scrollController,
                      child: Column(
                        children: [
                          SizedBox(height: 1.h),

                          // Order Summary
                          OrderSummaryWidget(
                            cartItems: _cartItems,
                            subtotal: _subtotal,
                            deliveryFee: _deliveryFee,
                            discount: _discount,
                            total: _total,
                            onEditCart: _handleEditCart,
                            isExpanded: _isOrderSummaryExpanded,
                            onToggleExpansion: () {
                              setState(() {
                                _isOrderSummaryExpanded =
                                    !_isOrderSummaryExpanded;
                              });
                            },
                          ),

                          // Delivery Address
                          DeliveryAddressWidget(
                            selectedAddress: _selectedAddress,
                            onChangeAddress: _handleChangeAddress,
                          ),

                          // Delivery Time
                          DeliveryTimeWidget(
                            timeSlots: _timeSlots,
                            selectedSlotIndex: _selectedTimeSlotIndex,
                            onSlotSelected: (index) {
                              setState(() {
                                _selectedTimeSlotIndex = index;
                              });
                              HapticFeedback.lightImpact();
                            },
                          ),

                          // Payment Method
                          PaymentMethodWidget(
                            paymentMethods: _paymentMethods,
                            selectedMethodIndex: _selectedPaymentMethodIndex,
                            onMethodSelected: (index) {
                              setState(() {
                                _selectedPaymentMethodIndex = index;
                              });
                              HapticFeedback.lightImpact();
                            },
                            onAddNewCard: _handleAddNewCard,
                            onApplePay: _handleApplePay,
                            onGooglePay: _handleGooglePay,
                          ),

                          // Special Instructions
                          SpecialInstructionsWidget(
                            controller: _instructionsController,
                            maxLength: 200,
                          ),

                          SizedBox(height: 2.h),

                          // Security Indicators
                          _buildSecurityIndicators(context),

                          SizedBox(height: 12.h),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        );
      },
    );
  }

  Widget _buildSecurityIndicators(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w),
      padding: EdgeInsets.all(3.w),
      decoration: BoxDecoration(
        color: colorScheme.primaryContainer.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: colorScheme.primary.withValues(alpha: 0.2),
          width: 1,
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          CustomIconWidget(
            iconName: 'security',
            color: AppTheme.accentLight,
            size: 16,
          ),
          SizedBox(width: 2.w),
          Text(
            'Secured by 256-bit SSL encryption',
            style: theme.textTheme.bodySmall?.copyWith(
              color: colorScheme.onSurfaceVariant,
              fontWeight: FontWeight.w500,
            ),
          ),
        ],
      ),
    );
  }

  void _handleEditCart() {
    HapticFeedback.lightImpact();
    Navigator.pushNamed(context, '/shopping-cart-screen');
  }

  void _handleChangeAddress() {
    HapticFeedback.lightImpact();
    _showAddressModal();
  }

  void _handleAddNewCard() {
    HapticFeedback.lightImpact();
    _showAddCardModal();
  }

  void _handleApplePay() {
    HapticFeedback.lightImpact();
    _showPaymentProcessing('Apple Pay');
  }

  void _handleGooglePay() {
    HapticFeedback.lightImpact();
    _showPaymentProcessing('Google Pay');
  }

  void _handlePlaceOrder() async {
    HapticFeedback.mediumImpact();

    setState(() {
      _isProcessingOrder = true;
    });

    // Simulate payment processing
    await Future.delayed(const Duration(seconds: 3));

    if (mounted) {
      setState(() {
        _isProcessingOrder = false;
      });

      // Navigate to order tracking
      Navigator.pushReplacementNamed(context, '/order-tracking-screen');

      // Show success message
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(
            'Order placed successfully! Order #FG${DateTime.now().millisecondsSinceEpoch.toString().substring(8)}',
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: Colors.white,
                ),
          ),
          backgroundColor: AppTheme.accentLight,
          behavior: SnackBarBehavior.floating,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
          ),
        ),
      );
    }
  }

  void _showAddressModal() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => Container(
        height: 60.h,
        decoration: BoxDecoration(
          color: Theme.of(context).colorScheme.surface,
          borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
        ),
        child: Column(
          children: [
            Container(
              width: 10.w,
              height: 0.5.h,
              margin: EdgeInsets.symmetric(vertical: 2.h),
              decoration: BoxDecoration(
                color: Theme.of(context)
                    .colorScheme
                    .outline
                    .withValues(alpha: 0.3),
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 4.w),
              child: Text(
                'Select Delivery Address',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
              ),
            ),
            SizedBox(height: 2.h),
            Expanded(
              child: Center(
                child: Text(
                  'Address selection modal content',
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        color: Theme.of(context).colorScheme.onSurfaceVariant,
                      ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _showAddCardModal() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => Container(
        height: 70.h,
        decoration: BoxDecoration(
          color: Theme.of(context).colorScheme.surface,
          borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
        ),
        child: Column(
          children: [
            Container(
              width: 10.w,
              height: 0.5.h,
              margin: EdgeInsets.symmetric(vertical: 2.h),
              decoration: BoxDecoration(
                color: Theme.of(context)
                    .colorScheme
                    .outline
                    .withValues(alpha: 0.3),
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 4.w),
              child: Text(
                'Add New Payment Method',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
              ),
            ),
            SizedBox(height: 2.h),
            Expanded(
              child: Center(
                child: Text(
                  'Add card form content',
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        color: Theme.of(context).colorScheme.onSurfaceVariant,
                      ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _showPaymentProcessing(String paymentMethod) {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => AlertDialog(
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const CircularProgressIndicator(),
            SizedBox(height: 2.h),
            Text(
              'Processing $paymentMethod payment...',
              style: Theme.of(context).textTheme.bodyMedium,
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );

    // Simulate payment processing
    Future.delayed(const Duration(seconds: 2), () {
      if (mounted) {
        Navigator.pop(context);
        _handlePlaceOrder();
      }
    });
  }
}
