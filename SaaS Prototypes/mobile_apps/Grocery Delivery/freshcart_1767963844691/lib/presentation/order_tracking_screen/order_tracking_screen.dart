import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../widgets/custom_bottom_bar.dart';
import '../../widgets/main_layout_wrapper.dart';
import './widgets/delivery_map_widget.dart';
import './widgets/delivery_rider_info_widget.dart';
import './widgets/order_status_timeline_widget.dart';
import './widgets/order_summary_widget.dart';

class OrderTrackingScreen extends StatefulWidget {
  const OrderTrackingScreen({super.key});

  @override
  State<OrderTrackingScreen> createState() => _OrderTrackingScreenState();
}

class _OrderTrackingScreenState extends State<OrderTrackingScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _pulseController;
  late Animation<double> _pulseAnimation;

  // Mock data for order tracking
  final Map<String, dynamic> _orderData = {
    'orderId': '12345',
    'status': 'out_for_delivery',
    'estimatedArrival': '15-20 mins',
    'deliveryAddress': '123 Main Street, Apt 4B, San Francisco, CA 94102',
    'subtotal': '\$45.99',
    'deliveryFee': '\$3.99',
    'tax': '\$4.32',
    'total': '\$54.30',
    'items': [
      {
        'id': 1,
        'name': 'Organic Bananas',
        'quantity': 2,
        'price': '\$3.99',
        'totalPrice': '\$7.98',
        'image': 'https://images.unsplash.com/photo-1565804212260-280f967e431b',
        'semanticLabel': 'Fresh organic bananas in a bunch on white background',
      },
      {
        'id': 2,
        'name': 'Fresh Milk - 1 Gallon',
        'quantity': 1,
        'price': '\$4.49',
        'totalPrice': '\$4.49',
        'image': 'https://images.unsplash.com/photo-1631175316696-ee41839378dc',
        'semanticLabel': 'Glass bottle of fresh white milk with blue label',
      },
      {
        'id': 3,
        'name': 'Whole Wheat Bread',
        'quantity': 1,
        'price': '\$2.99',
        'totalPrice': '\$2.99',
        'image': 'https://images.unsplash.com/photo-1596662841962-34034e1e6efc',
        'semanticLabel':
            'Sliced whole wheat bread loaf on wooden cutting board',
      },
      {
        'id': 4,
        'name': 'Greek Yogurt - Vanilla',
        'quantity': 3,
        'price': '\$1.99',
        'totalPrice': '\$5.97',
        'image': 'https://images.unsplash.com/photo-1691043795570-9478750e7fd2',
        'semanticLabel': 'White container of vanilla Greek yogurt with spoon',
      },
    ],
    'riderInfo': {
      'name': 'Michael Rodriguez',
      'rating': 4.8,
      'totalDeliveries': 1247,
      'vehicleInfo': 'Blue Honda Civic - ABC 123',
      'avatar': 'https://images.unsplash.com/photo-1592656392282-2fd8c29ad538',
      'avatarSemanticLabel':
          'Professional headshot of Hispanic man with short black hair wearing delivery uniform',
    },
  };

  final List<Map<String, dynamic>> _orderStatuses = [
    {
      'title': 'Order Confirmed',
      'description': 'Your order has been received and confirmed',
      'timestamp': '2:30 PM',
    },
    {
      'title': 'Being Prepared',
      'description': 'Your items are being picked and packed',
      'timestamp': '2:45 PM',
    },
    {
      'title': 'Out for Delivery',
      'description': 'Your order is on the way to you',
      'timestamp': '3:15 PM',
    },
    {
      'title': 'Delivered',
      'description': 'Your order has been delivered successfully',
      'timestamp': null,
    },
  ];

  int _currentStatusIndex = 2; // Currently "Out for Delivery"

  @override
  void initState() {
    super.initState();
    _initializeAnimations();
  }

  void _initializeAnimations() {
    _pulseController = AnimationController(
      duration: const Duration(seconds: 2),
      vsync: this,
    );

    _pulseAnimation = Tween<double>(
      begin: 0.8,
      end: 1.2,
    ).animate(CurvedAnimation(
      parent: _pulseController,
      curve: Curves.easeInOut,
    ));

    _pulseController.repeat(reverse: true);
  }

  @override
  void dispose() {
    _pulseController.dispose();
    super.dispose();
  }

  void _handleCallRider() {
    HapticFeedback.lightImpact();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Calling ${_orderData['riderInfo']['name']}...'),
        duration: const Duration(seconds: 2),
      ),
    );
  }

  void _handleMessageRider() {
    HapticFeedback.lightImpact();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content:
            Text('Opening chat with ${_orderData['riderInfo']['name']}...'),
        duration: const Duration(seconds: 2),
      ),
    );
  }

  void _handleReorder() {
    HapticFeedback.lightImpact();
    Navigator.pushNamed(context, '/shopping-cart-screen');
  }

  void _handleSupportContact() {
    HapticFeedback.lightImpact();
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => _buildSupportBottomSheet(),
    );
  }

  Widget _buildSupportBottomSheet() {
    return Container(
      padding: EdgeInsets.all(6.w),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 12.w,
            height: 0.5.h,
            decoration: BoxDecoration(
              color: AppTheme.lightTheme.colorScheme.outline
                  .withValues(alpha: 0.3),
              borderRadius: BorderRadius.circular(2),
            ),
          ),
          SizedBox(height: 4.h),
          Text(
            'Need Help?',
            style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.w600,
              color: AppTheme.lightTheme.colorScheme.onSurface,
            ),
          ),
          SizedBox(height: 2.h),
          Text(
            'Our customer support team is here to help you with any delivery issues.',
            style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
            ),
            textAlign: TextAlign.center,
          ),
          SizedBox(height: 4.h),
          _buildSupportOption(
            icon: 'chat',
            title: 'Live Chat',
            subtitle: 'Chat with our support team',
            onTap: () {
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Opening live chat...')),
              );
            },
          ),
          SizedBox(height: 2.h),
          _buildSupportOption(
            icon: 'phone',
            title: 'Call Support',
            subtitle: '1-800-FRESH-CART',
            onTap: () {
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Calling support...')),
              );
            },
          ),
          SizedBox(height: 4.h),
        ],
      ),
    );
  }

  Widget _buildSupportOption({
    required String icon,
    required String title,
    required String subtitle,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: EdgeInsets.all(4.w),
        decoration: BoxDecoration(
          border: Border.all(
            color:
                AppTheme.lightTheme.colorScheme.outline.withValues(alpha: 0.2),
          ),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Row(
          children: [
            Container(
              width: 12.w,
              height: 12.w,
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.colorScheme.secondary
                    .withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Center(
                child: CustomIconWidget(
                  iconName: icon,
                  color: AppTheme.lightTheme.colorScheme.secondary,
                  size: 6.w,
                ),
              ),
            ),
            SizedBox(width: 4.w),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: AppTheme.lightTheme.textTheme.bodyLarge?.copyWith(
                      fontWeight: FontWeight.w600,
                      color: AppTheme.lightTheme.colorScheme.onSurface,
                    ),
                  ),
                  SizedBox(height: 0.5.h),
                  Text(
                    subtitle,
                    style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                      color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                ],
              ),
            ),
            CustomIconWidget(
              iconName: 'chevron_right',
              color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
              size: 5.w,
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    // Get the current tab index from MainLayoutWrapper
    final parentState = MainLayoutWrapper.of(context);
    final currentTabIndex =
        parentState?.currentIndex ?? 3; // Default to Orders tab

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
                  'Track Order',
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
                  // Delivery Map
                  Padding(
                    padding: EdgeInsets.all(4.w),
                    child: DeliveryMapWidget(
                      orderData: _orderData,
                    ),
                  ),

                  // Order Status with Animation
                  Container(
                    margin: EdgeInsets.symmetric(horizontal: 4.w),
                    padding: EdgeInsets.all(4.w),
                    decoration: BoxDecoration(
                      color: AppTheme.lightTheme.colorScheme.surface,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(
                        color: AppTheme.lightTheme.colorScheme.outline
                            .withValues(alpha: 0.2),
                      ),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            AnimatedBuilder(
                              animation: _pulseAnimation,
                              builder: (context, child) {
                                return Transform.scale(
                                  scale: _pulseAnimation.value,
                                  child: Container(
                                    width: 3.w,
                                    height: 3.w,
                                    decoration: BoxDecoration(
                                      color: AppTheme
                                          .lightTheme.colorScheme.secondary,
                                      shape: BoxShape.circle,
                                    ),
                                  ),
                                );
                              },
                            ),
                            SizedBox(width: 3.w),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    _orderStatuses[_currentStatusIndex]['title']
                                        as String,
                                    style: AppTheme
                                        .lightTheme.textTheme.titleMedium
                                        ?.copyWith(
                                      fontWeight: FontWeight.w600,
                                      color: AppTheme
                                          .lightTheme.colorScheme.onSurface,
                                    ),
                                  ),
                                  Text(
                                    _orderStatuses[_currentStatusIndex]
                                        ['description'] as String,
                                    style: AppTheme
                                        .lightTheme.textTheme.bodySmall
                                        ?.copyWith(
                                      color: AppTheme.lightTheme.colorScheme
                                          .onSurfaceVariant,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            Text(
                              _orderData['estimatedArrival'] as String,
                              style: AppTheme.lightTheme.textTheme.titleSmall
                                  ?.copyWith(
                                fontWeight: FontWeight.w600,
                                color:
                                    AppTheme.lightTheme.colorScheme.secondary,
                              ),
                            ),
                          ],
                        ),
                        SizedBox(height: 3.h),
                        Text(
                          'Delivering to: ${_orderData['deliveryAddress']}',
                          style:
                              AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                            color: AppTheme
                                .lightTheme.colorScheme.onSurfaceVariant,
                          ),
                        ),
                      ],
                    ),
                  ),

                  SizedBox(height: 3.h),

                  // Delivery Rider Info
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: 4.w),
                    child: DeliveryRiderInfoWidget(
                      riderInfo:
                          _orderData['riderInfo'] as Map<String, dynamic>,
                      onCallPressed: _handleCallRider,
                      onMessagePressed: _handleMessageRider,
                    ),
                  ),

                  SizedBox(height: 3.h),

                  // Order Status Timeline
                  OrderStatusTimelineWidget(
                    orderStatuses: _orderStatuses,
                    currentStatusIndex: _currentStatusIndex,
                  ),

                  SizedBox(height: 3.h),

                  // Order Summary
                  OrderSummaryWidget(
                    orderData: _orderData,
                    onReorderPressed: _handleReorder,
                  ),

                  SizedBox(height: 4.h),
                ],
              ),
            ),
          ],
        );
      },
    );
  }
}
