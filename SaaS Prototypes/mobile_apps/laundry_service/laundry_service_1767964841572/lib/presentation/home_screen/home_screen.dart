import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/pickup_date_banner.dart';
import './widgets/promotional_card.dart';
import './widgets/quick_actions_section.dart';
import './widgets/recent_orders_carousel.dart';
import './widgets/schedule_pickup_button.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final ScrollController _scrollController = ScrollController();
  bool _isRefreshing = false;

  // Mock data for recent orders
  final List<Map<String, dynamic>> _recentOrders = [
    {
      "orderId": "LF001",
      "status": "Delivered",
      "pickupDate": "Aug 15, 2025",
      "itemCount": 8,
      "totalAmount": "\\₹450",
    },
    {
      "orderId": "LF002",
      "status": "In Process",
      "pickupDate": "Aug 17, 2025",
      "itemCount": 12,
      "totalAmount": "\\₹680",
    },
    {
      "orderId": "LF003",
      "status": "Picked Up",
      "pickupDate": "Aug 18, 2025",
      "itemCount": 5,
      "totalAmount": "\\₹320",
    },
  ];

  // Mock promotional content
  final List<Map<String, dynamic>> _promotions = [
    {
      "title": "First Order 20% Off",
      "description":
          "Get 20% discount on your first laundry order. Use code FIRST20",
      "iconName": "local_offer",
      "backgroundColor": 0xFF10B981,
    },
    {
      "title": "Premium Care Available",
      "description":
          "Try our premium fabric care service for delicate garments",
      "iconName": "star",
      "backgroundColor": 0xFFF59E0B,
    },
  ];

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  Future<void> _handleRefresh() async {
    setState(() {
      _isRefreshing = true;
    });

    // Simulate API call delay
    await Future.delayed(Duration(seconds: 2));

    setState(() {
      _isRefreshing = false;
    });

    // Show refresh feedback
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Updated pickup availability and order status'),
        duration: Duration(seconds: 2),
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  void _navigateToBookingWizard() {
    Navigator.pushNamed(context, '/booking-wizard-modal');
  }

  void _navigateToOrderTracking() {
    Navigator.pushNamed(context, '/order-tracking-screen');
  }

  void _navigateToPricing() {
    Navigator.pushNamed(context, '/pricing-screen');
  }

  void _handleOrderTap(Map<String, dynamic> order) {
    Navigator.pushNamed(context, '/order-tracking-screen');
  }

  void _handleChangeDateTap() {
    showDatePicker(
      context: context,
      initialDate: DateTime.now().add(Duration(days: 1)),
      firstDate: DateTime.now(),
      lastDate: DateTime.now().add(Duration(days: 30)),
    ).then((selectedDate) {
      if (selectedDate != null) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Pickup date updated successfully'),
            duration: Duration(seconds: 2),
          ),
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      body: SafeArea(
        child: RefreshIndicator(
          onRefresh: _handleRefresh,
          color: AppTheme.lightTheme.colorScheme.primary,
          child: CustomScrollView(
            controller: _scrollController,
            slivers: [
              // App Bar
              SliverAppBar(
                floating: true,
                snap: true,
                backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
                elevation: 0,
                automaticallyImplyLeading: false,
                title: Row(
                  children: [
                    Container(
                      padding: EdgeInsets.all(2.w),
                      decoration: BoxDecoration(
                        color: AppTheme.lightTheme.colorScheme.primary,
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: CustomIconWidget(
                        iconName: 'local_laundry_service',
                        color: Colors.white,
                        size: 24,
                      ),
                    ),
                    SizedBox(width: 3.w),
                    Text(
                      'LaundryFlow',
                      style:
                          AppTheme.lightTheme.textTheme.headlineSmall?.copyWith(
                        fontWeight: FontWeight.w700,
                        color: AppTheme.lightTheme.colorScheme.primary,
                      ),
                    ),
                  ],
                ),
                actions: [
                  Container(
                    margin: EdgeInsets.only(right: 4.w),
                    decoration: BoxDecoration(
                      color: AppTheme.lightTheme.colorScheme.surface,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(
                        color: AppTheme.lightTheme.dividerColor,
                        width: 1,
                      ),
                    ),
                    child: IconButton(
                      onPressed: () {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            content: Text('No new notifications'),
                            duration: Duration(seconds: 2),
                          ),
                        );
                      },
                      icon: CustomIconWidget(
                        iconName: 'notifications_outlined',
                        color: AppTheme.lightTheme.colorScheme.onSurface,
                        size: 24,
                      ),
                    ),
                  ),
                ],
              ),

              // Main Content
              SliverToBoxAdapter(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    SizedBox(height: 2.h),

                    // Pickup Date Banner
                    PickupDateBanner(
                      nextPickupDate: 'Tomorrow, Aug 20 • 10:00 AM',
                      onChangeDateTap: _handleChangeDateTap,
                    ),

                    SizedBox(height: 2.h),

                    // Schedule Pickup Button
                    SchedulePickupButton(
                      onTap: _navigateToBookingWizard,
                    ),

                    SizedBox(height: 3.h),

                    // Recent Orders Carousel
                    RecentOrdersCarousel(
                      recentOrders: _recentOrders,
                      onOrderTap: _handleOrderTap,
                    ),

                    SizedBox(height: 4.h),

                    // Quick Actions Section
                    QuickActionsSection(
                      onWashFoldTap: _navigateToBookingWizard,
                      onDryCleanTap: _navigateToBookingWizard,
                      onTrackOrderTap: _navigateToOrderTracking,
                    ),

                    SizedBox(height: 4.h),

                    // Promotional Cards
                    if (_promotions.isNotEmpty) ...[
                      Padding(
                        padding: EdgeInsets.symmetric(horizontal: 4.w),
                        child: Text(
                          'Special Offers',
                          style: AppTheme.lightTheme.textTheme.titleLarge
                              ?.copyWith(
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                      SizedBox(height: 2.h),
                      ..._promotions
                          .map((promotion) => PromotionalCard(
                                promotion: promotion,
                              ))
                          .toList(),
                    ],

                    SizedBox(height: 4.h),

                    // Service Tips Section
                    Container(
                      width: double.infinity,
                      margin: EdgeInsets.symmetric(horizontal: 4.w),
                      padding: EdgeInsets.all(4.w),
                      decoration: BoxDecoration(
                        color: AppTheme.lightTheme.colorScheme.surface,
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(
                          color: AppTheme.lightTheme.dividerColor,
                          width: 1,
                        ),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              CustomIconWidget(
                                iconName: 'lightbulb_outline',
                                color: AppTheme.lightTheme.colorScheme.tertiary,
                                size: 24,
                              ),
                              SizedBox(width: 3.w),
                              Text(
                                'Laundry Tips',
                                style: AppTheme.lightTheme.textTheme.titleMedium
                                    ?.copyWith(
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ],
                          ),
                          SizedBox(height: 2.h),
                          Text(
                            'Separate dark and light colors before pickup to ensure the best care for your garments. Check pockets for any items before scheduling.',
                            style: AppTheme.lightTheme.textTheme.bodyMedium
                                ?.copyWith(
                              color: AppTheme.lightTheme.colorScheme.onSurface
                                  .withValues(alpha: 0.7),
                              height: 1.5,
                            ),
                          ),
                        ],
                      ),
                    ),

                    SizedBox(height: 6.h),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
