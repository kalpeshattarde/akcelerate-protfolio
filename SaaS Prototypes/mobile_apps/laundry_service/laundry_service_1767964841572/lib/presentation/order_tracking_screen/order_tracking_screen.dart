import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/contact_support_button.dart';
import './widgets/estimated_delivery_card.dart';
import './widgets/order_details_card.dart';
import './widgets/order_progress_timeline.dart';

class OrderTrackingScreen extends StatefulWidget {
  const OrderTrackingScreen({Key? key}) : super(key: key);

  @override
  State<OrderTrackingScreen> createState() => _OrderTrackingScreenState();
}

class _OrderTrackingScreenState extends State<OrderTrackingScreen> {
  bool _isRefreshing = false;

  // Mock order data
  final Map<String, dynamic> _orderData = {
    "orderId": "LF2025081901",
    "currentStatus": "in_process",
    "serviceType": "Wash & Fold",
    "itemCount": 8,
    "totalCost": "450",
    "pickupAddress": "123 MG Road, Bangalore, Karnataka 560001",
    "specialInstructions": "Handle delicate items with care",
    "estimatedDelivery": DateTime.now().add(Duration(hours: 18, minutes: 30)),
    "timestamps": {
      "picked_up": "Today, 09:30 AM",
      "in_process": "Today, 02:15 PM",
      "delivered": "",
    },
  };

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      appBar: _buildAppBar(),
      body: RefreshIndicator(
        onRefresh: _handleRefresh,
        color: AppTheme.lightTheme.primaryColor,
        child: SingleChildScrollView(
          physics: AlwaysScrollableScrollPhysics(),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildOrderHeader(),
              SizedBox(height: 2.h),
              EstimatedDeliveryCard(
                estimatedDelivery: _orderData['estimatedDelivery'] as DateTime,
                isActive: _orderData['currentStatus'] != 'delivered',
              ),
              SizedBox(height: 2.h),
              OrderProgressTimeline(
                currentStatus: _orderData['currentStatus'] as String,
                timestamps: _orderData['timestamps'] as Map<String, String>,
              ),
              SizedBox(height: 2.h),
              OrderDetailsCard(
                orderData: _orderData,
              ),
              SizedBox(height: 2.h),
              ContactSupportButton(),
              SizedBox(height: 2.h),
              _buildShareTrackingButton(),
              SizedBox(height: 4.h),
            ],
          ),
        ),
      ),
    );
  }

  PreferredSizeWidget _buildAppBar() {
    return AppBar(
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      elevation: 0,
      leading: IconButton(
        onPressed: () => Navigator.pop(context),
        icon: CustomIconWidget(
          iconName: 'arrow_back',
          color: AppTheme.lightTheme.colorScheme.onSurface,
          size: 6.w,
        ),
      ),
      title: Text(
        'Track Order',
        style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
          fontWeight: FontWeight.w600,
        ),
      ),
      actions: [
        IconButton(
          onPressed: _handleRefresh,
          icon: _isRefreshing
              ? SizedBox(
                  width: 5.w,
                  height: 5.w,
                  child: CircularProgressIndicator(
                    strokeWidth: 2,
                    valueColor: AlwaysStoppedAnimation<Color>(
                      AppTheme.lightTheme.primaryColor,
                    ),
                  ),
                )
              : CustomIconWidget(
                  iconName: 'refresh',
                  color: AppTheme.lightTheme.colorScheme.onSurface,
                  size: 6.w,
                ),
        ),
        SizedBox(width: 2.w),
      ],
    );
  }

  Widget _buildOrderHeader() {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w),
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: AppTheme.lightTheme.colorScheme.outline.withValues(alpha: 0.2),
        ),
      ),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Order ID',
                  style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                    color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                  ),
                ),
                SizedBox(height: 0.5.h),
                Text(
                  _orderData['orderId'] as String,
                  style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w600,
                    fontFamily: 'monospace',
                  ),
                ),
              ],
            ),
          ),
          InkWell(
            onTap: () => _copyOrderId(),
            borderRadius: BorderRadius.circular(8),
            child: Container(
              padding: EdgeInsets.all(2.w),
              child: CustomIconWidget(
                iconName: 'content_copy',
                color: AppTheme.lightTheme.primaryColor,
                size: 5.w,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildShareTrackingButton() {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w),
      child: ElevatedButton(
        onPressed: _shareTrackingLink,
        style: ElevatedButton.styleFrom(
          backgroundColor: AppTheme.lightTheme.colorScheme.surface,
          foregroundColor: AppTheme.lightTheme.primaryColor,
          elevation: 0,
          padding: EdgeInsets.symmetric(vertical: 3.h),
          side: BorderSide(
            color: AppTheme.lightTheme.primaryColor.withValues(alpha: 0.3),
            width: 1,
          ),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CustomIconWidget(
              iconName: 'share',
              color: AppTheme.lightTheme.primaryColor,
              size: 5.w,
            ),
            SizedBox(width: 2.w),
            Text(
              'Share Tracking Link',
              style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                color: AppTheme.lightTheme.primaryColor,
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _handleRefresh() async {
    if (_isRefreshing) return;

    setState(() {
      _isRefreshing = true;
    });

    // Simulate API call
    await Future.delayed(Duration(seconds: 2));

    // Provide haptic feedback
    HapticFeedback.lightImpact();

    setState(() {
      _isRefreshing = false;
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Order status updated'),
        duration: Duration(seconds: 2),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10),
        ),
      ),
    );
  }

  void _copyOrderId() {
    Clipboard.setData(ClipboardData(text: _orderData['orderId'] as String));
    HapticFeedback.selectionClick();

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            CustomIconWidget(
              iconName: 'check_circle',
              color: Colors.white,
              size: 4.w,
            ),
            SizedBox(width: 2.w),
            Text('Order ID copied to clipboard'),
          ],
        ),
        duration: Duration(seconds: 2),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10),
        ),
      ),
    );
  }

  void _shareTrackingLink() {
    final trackingUrl =
        'https://laundryflow.com/track/${_orderData['orderId']}';
    final shareText = 'Track your LaundryFlow order: $trackingUrl';

    // In a real app, you would use the share_plus package
    // Share.share(shareText);

    // For now, copy to clipboard
    Clipboard.setData(ClipboardData(text: shareText));
    HapticFeedback.selectionClick();

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            CustomIconWidget(
              iconName: 'link',
              color: Colors.white,
              size: 4.w,
            ),
            SizedBox(width: 2.w),
            Expanded(
              child: Text('Tracking link copied to clipboard'),
            ),
          ],
        ),
        duration: Duration(seconds: 3),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10),
        ),
      ),
    );
  }
}
