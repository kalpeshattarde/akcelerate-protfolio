import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/cart_item_widget.dart';
import './widgets/delivery_time_selector_widget.dart';
import './widgets/order_summary_widget.dart';
import './widgets/saved_for_later_widget.dart';

class ShoppingCartScreen extends StatefulWidget {
  const ShoppingCartScreen({super.key});

  @override
  State<ShoppingCartScreen> createState() => _ShoppingCartScreenState();
}

class _ShoppingCartScreenState extends State<ShoppingCartScreen> {
  List<Map<String, dynamic>> _cartItems = [];
  List<Map<String, dynamic>> _savedItems = [];
  String? _selectedDeliverySlot = 'standard_2h';
  double _deliveryFee = 2.99;
  String? _appliedPromoCode;
  double _promoDiscount = 0.0;
  bool _isLoading = true;

  // Mock recently viewed products for empty cart state
  final List<Map<String, dynamic>> _recentlyViewedProducts = [
    {
      'id': 1,
      'name': 'Organic Bananas',
      'price': 2.99,
      'image': 'https://images.unsplash.com/photo-1565804212260-280f967e431b',
      'semanticLabel': 'Fresh organic bananas in a bunch on white background',
    },
    {
      'id': 2,
      'name': 'Fresh Milk',
      'price': 4.49,
      'image': 'https://images.unsplash.com/photo-1517448931760-9bf4414148c5',
      'semanticLabel': 'Glass of fresh white milk on wooden table',
    },
    {
      'id': 3,
      'name': 'Whole Wheat Bread',
      'price': 3.99,
      'image': 'https://images.unsplash.com/photo-1626423642733-9bb26dea2691',
      'semanticLabel': 'Sliced whole wheat bread loaf on cutting board',
    },
  ];

  @override
  void initState() {
    super.initState();
    _loadCartData();
  }

  Future<void> _loadCartData() async {
    // Simulate loading cart data
    await Future.delayed(const Duration(milliseconds: 1500));

    setState(() {
      _cartItems = [
        {
          'id': 1,
          'name': 'Organic Fresh Bananas',
          'brand': 'Fresh Farms',
          'weight': '1 lb (6-8 bananas)',
          'price': 2.99,
          'originalPrice': 3.49,
          'discount': 14,
          'quantity': 2,
          'image':
              'https://images.unsplash.com/photo-1565804212260-280f967e431b',
          'semanticLabel':
              'Fresh organic bananas in a bunch on white background',
          'isOutOfStock': false,
        },
        {
          'id': 2,
          'name': 'Whole Milk - Organic',
          'brand': 'Dairy Best',
          'weight': '1 gallon',
          'price': 4.49,
          'quantity': 1,
          'image':
              'https://images.unsplash.com/photo-1517448931760-9bf4414148c5',
          'semanticLabel': 'Glass of fresh white milk on wooden table',
          'isOutOfStock': false,
        },
        {
          'id': 3,
          'name': 'Artisan Sourdough Bread',
          'brand': 'Baker\'s Choice',
          'weight': '1 loaf (24 oz)',
          'price': 5.99,
          'quantity': 1,
          'image':
              'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=800',
          'semanticLabel':
              'Sliced artisan sourdough bread loaf on cutting board',
          'isOutOfStock': false,
        },
        {
          'id': 4,
          'name': 'Premium Avocados',
          'brand': 'Green Valley',
          'weight': '4 count bag',
          'price': 6.99,
          'quantity': 1,
          'image':
              'https://images.unsplash.com/photo-1730541416908-a6e61b86f60b',
          'semanticLabel':
              'Fresh ripe avocados cut in half showing green flesh and pit',
          'isOutOfStock': true,
        },
      ];

      _savedItems = [
        {
          'id': 5,
          'name': 'Greek Yogurt - Vanilla',
          'weight': '32 oz container',
          'price': 4.99,
          'originalPrice': 5.99,
          'discount': 17,
          'image': 'https://images.unsplash.com/photo-1562114808-b4b33cf60f4f',
          'semanticLabel':
              'Creamy vanilla Greek yogurt in white container with spoon',
          'isOutOfStock': false,
        },
        {
          'id': 6,
          'name': 'Organic Spinach',
          'weight': '5 oz bag',
          'price': 3.49,
          'image':
              'https://images.unsplash.com/photo-1573821200883-66e8ec7a730d',
          'semanticLabel':
              'Fresh organic baby spinach leaves in clear plastic bag',
          'isOutOfStock': true,
        },
      ];

      _isLoading = false;
    });
  }

  void _removeCartItem(int itemId) {
    setState(() {
      _cartItems.removeWhere((item) => item['id'] == itemId);
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: const Text('Item removed from cart'),
        action: SnackBarAction(
          label: 'Undo',
          onPressed: () {
            // Implement undo functionality
          },
        ),
      ),
    );
  }

  void _updateQuantity(int itemId, int newQuantity) {
    setState(() {
      final itemIndex = _cartItems.indexWhere((item) => item['id'] == itemId);
      if (itemIndex != -1) {
        _cartItems[itemIndex]['quantity'] = newQuantity;
      }
    });
  }

  void _moveToWishlist(int itemId) {
    final item = _cartItems.firstWhere((item) => item['id'] == itemId);
    setState(() {
      _cartItems.removeWhere((item) => item['id'] == itemId);
      _savedItems.add(item);
    });

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Item moved to wishlist')),
    );
  }

  void _moveToCart(Map<String, dynamic> item) {
    setState(() {
      _savedItems.removeWhere((savedItem) => savedItem['id'] == item['id']);
      _cartItems.add({...item, 'quantity': 1});
    });

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Item moved to cart')),
    );
  }

  void _removeFromSaved(Map<String, dynamic> item) {
    setState(() {
      _savedItems.removeWhere((savedItem) => savedItem['id'] == item['id']);
    });
  }

  void _onDeliverySlotSelected(String slotId, double fee) {
    setState(() {
      _selectedDeliverySlot = slotId;
      _deliveryFee = fee;
    });
  }

  void _onPromoCodeApplied(String promoCode) {
    setState(() {
      _appliedPromoCode = promoCode;
      // Calculate discount based on promo code
      switch (promoCode) {
        case 'SAVE10':
          _promoDiscount = _subtotal * 0.10;
          break;
        case 'WELCOME20':
          _promoDiscount = _subtotal * 0.20;
          break;
        case 'FIRST15':
          _promoDiscount = _subtotal * 0.15;
          break;
        case 'FRESH25':
          _promoDiscount = _subtotal * 0.25;
          break;
        default:
          _promoDiscount = 0.0;
      }
    });
  }

  void _onPromoCodeRemoved() {
    setState(() {
      _appliedPromoCode = null;
      _promoDiscount = 0.0;
    });
  }

  void _clearCart() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Clear Cart'),
        content: const Text(
            'Are you sure you want to remove all items from your cart?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () {
              setState(() {
                _cartItems.clear();
              });
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Cart cleared')),
              );
            },
            child: const Text('Clear'),
          ),
        ],
      ),
    );
  }

  void _proceedToCheckout() {
    if (_cartItems.isEmpty) return;

    // Check for out of stock items
    final outOfStockItems =
        _cartItems.where((item) => item['isOutOfStock'] == true).toList();

    if (outOfStockItems.isNotEmpty) {
      showDialog(
        context: context,
        builder: (context) => AlertDialog(
          title: const Text('Items Out of Stock'),
          content: const Text(
              'Some items in your cart are currently out of stock. Please remove them before proceeding to checkout.'),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('OK'),
            ),
          ],
        ),
      );
      return;
    }

    HapticFeedback.mediumImpact();
    Navigator.pushNamed(context, '/checkout-screen');
  }

  void _startShopping() {
    Navigator.pushNamedAndRemoveUntil(
      context,
      '/home-screen',
      (route) => false,
    );
  }

  double get _subtotal {
    return _cartItems.fold(0.0, (sum, item) {
      if (item['isOutOfStock'] == true) return sum;
      return sum + (item['price'] * item['quantity']);
    });
  }

  double get _taxes {
    return _subtotal * 0.08; // 8% tax
  }

  int get _totalItems {
    return _cartItems.fold(0, (sum, item) => sum + (item['quantity'] as int));
  }

  @override
  Widget build(BuildContext context) {
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
                  'Shopping Cart',
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
    );
  }

  Widget _buildMainContent() {
    return Builder(
      builder: (BuildContext context) {
        return CustomScrollView(
          slivers: [
            // Cart Header
            if (_cartItems.isNotEmpty)
              SliverToBoxAdapter(
                child: Container(
                  padding: EdgeInsets.all(4.w),
                  decoration: BoxDecoration(
                    color: Theme.of(context).colorScheme.surface,
                    border: Border(
                      bottom: BorderSide(
                        color: Theme.of(context)
                            .colorScheme
                            .outline
                            .withValues(alpha: 0.1),
                      ),
                    ),
                  ),
                  child: Row(
                    children: [
                      CustomIconWidget(
                        iconName: 'shopping_cart',
                        size: 20,
                        color: Theme.of(context).colorScheme.primary,
                      ),
                      SizedBox(width: 2.w),
                      Text(
                        '${_totalItems} item${_totalItems != 1 ? 's' : ''} in cart',
                        style: Theme.of(context).textTheme.titleSmall?.copyWith(
                              fontWeight: FontWeight.w600,
                              color: Theme.of(context).colorScheme.onSurface,
                            ),
                      ),
                      const Spacer(),
                      Text(
                        '\$${_subtotal.toStringAsFixed(2)}',
                        style:
                            Theme.of(context).textTheme.titleMedium?.copyWith(
                                  fontWeight: FontWeight.w700,
                                  color: Theme.of(context).colorScheme.primary,
                                ),
                      ),
                    ],
                  ),
                ),
              ),

            // Scrollable Content
            SliverToBoxAdapter(
              child: SingleChildScrollView(
                child: Column(
                  children: [
                    SizedBox(height: 1.h),

                    // Cart Items
                    ListView.builder(
                      shrinkWrap: true,
                      physics: const NeverScrollableScrollPhysics(),
                      itemCount: _cartItems.length,
                      itemBuilder: (context, index) {
                        final item = _cartItems[index];
                        return CartItemWidget(
                          item: item,
                          onRemove: () => _removeCartItem(item['id']),
                          onQuantityChanged: (quantity) =>
                              _updateQuantity(item['id'], quantity),
                          onMoveToWishlist: () => _moveToWishlist(item['id']),
                        );
                      },
                    ),

                    SizedBox(height: 2.h),

                    // Saved for Later
                    SavedForLaterWidget(
                      savedItems: _savedItems,
                      onMoveToCart: _moveToCart,
                      onRemoveFromSaved: _removeFromSaved,
                    ),

                    SizedBox(height: 2.h),

                    // Delivery Time Selector
                    DeliveryTimeSelectorWidget(
                      selectedSlot: _selectedDeliverySlot,
                      onSlotSelected: _onDeliverySlotSelected,
                    ),

                    SizedBox(height: 2.h),

                    // Order Summary
                    OrderSummaryWidget(
                      subtotal: _subtotal,
                      deliveryFee: _deliveryFee,
                      taxes: _taxes,
                      discount: _promoDiscount,
                      promoCode: _appliedPromoCode,
                      onPromoCodeApplied: _onPromoCodeApplied,
                      onPromoCodeRemoved: _onPromoCodeRemoved,
                    ),

                    SizedBox(height: 10.h), // Space for bottom button
                  ],
                ),
              ),
            ),
          ],
        );
      },
    );
  }
}
