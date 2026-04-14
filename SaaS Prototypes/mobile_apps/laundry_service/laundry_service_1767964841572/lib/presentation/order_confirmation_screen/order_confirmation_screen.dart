import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/action_buttons_widget.dart';
import './widgets/celebration_animation_widget.dart';
import './widgets/estimated_timeline_widget.dart';
import './widgets/order_number_widget.dart';
import './widgets/order_summary_card_widget.dart';

class OrderConfirmationScreen extends StatefulWidget {
  const OrderConfirmationScreen({Key? key}) : super(key: key);

  @override
  State<OrderConfirmationScreen> createState() =>
      _OrderConfirmationScreenState();
}

class _OrderConfirmationScreenState extends State<OrderConfirmationScreen> {
  late String orderNumber;
  late Map<String, dynamic> orderData;

  @override
  void initState() {
    super.initState();
    _initializeOrderData();
    _triggerHapticFeedback();
  }

  void _initializeOrderData() {
    // Generate realistic order data
    orderNumber =
        'LF${DateTime.now().millisecondsSinceEpoch.toString().substring(8)}';

    orderData = {
      'serviceType': 'Wash & Fold',
      'pickupAddress': '123 MG Road, Bangalore, Karnataka 560001',
      'scheduledDate': '20/08/2025',
      'scheduledTime': '10:00 AM - 12:00 PM',
      'itemCount': 8,
      'subtotal': 320.0,
      'deliveryFee': 50.0,
      'total': 370.0,
      'estimatedDelivery': '22/08/2025',
    };
  }

  void _triggerHapticFeedback() {
    // Provide success haptic feedback
    HapticFeedback.mediumImpact();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      appBar: AppBar(
        title: Text('Order Confirmed'),
        leading: IconButton(
          icon: CustomIconWidget(
            iconName: 'arrow_back',
            color: AppTheme.lightTheme.colorScheme.onSurface,
            size: 6.w,
          ),
          onPressed: () {
            Navigator.pushNamedAndRemoveUntil(
              context,
              '/home-screen',
              (route) => false,
            );
          },
        ),
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: EdgeInsets.symmetric(horizontal: 4.w),
          child: Column(
            children: [
              SizedBox(height: 2.h),

              // Celebration Animation
              CelebrationAnimationWidget(),
              SizedBox(height: 3.h),

              // Success Message
              Text(
                'Order Confirmed!',
                style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                      fontWeight: FontWeight.w700,
                      color: AppTheme.lightTheme.colorScheme.primary,
                    ),
                textAlign: TextAlign.center,
              ),
              SizedBox(height: 1.h),

              Text(
                'Your laundry pickup has been scheduled successfully',
                style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                      color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                    ),
                textAlign: TextAlign.center,
              ),
              SizedBox(height: 4.h),

              // Order Number
              OrderNumberWidget(orderNumber: orderNumber),
              SizedBox(height: 4.h),

              // Order Summary Card
              OrderSummaryCardWidget(orderData: orderData),
              SizedBox(height: 4.h),

              // Estimated Timeline
              EstimatedTimelineWidget(),
              SizedBox(height: 4.h),

              // Action Buttons
              ActionButtonsWidget(
                orderNumber: orderNumber,
                orderData: orderData,
              ),
              SizedBox(height: 4.h),
            ],
          ),
        ),
      ),
    );
  }
}
