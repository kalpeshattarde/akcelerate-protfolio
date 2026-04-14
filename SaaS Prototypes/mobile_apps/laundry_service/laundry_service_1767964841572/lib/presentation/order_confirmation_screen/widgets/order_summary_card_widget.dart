import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../../core/app_export.dart';

class OrderSummaryCardWidget extends StatelessWidget {
  final Map<String, dynamic> orderData;

  const OrderSummaryCardWidget({
    Key? key,
    required this.orderData,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final serviceType = orderData['serviceType'] as String? ?? 'Wash & Fold';
    final pickupAddress =
        orderData['pickupAddress'] as String? ?? 'Default Address';
    final scheduledDate = orderData['scheduledDate'] as String? ?? '20/08/2025';
    final scheduledTime =
        orderData['scheduledTime'] as String? ?? '10:00 AM - 12:00 PM';
    final itemCount = orderData['itemCount'] as int? ?? 5;
    final subtotal = orderData['subtotal'] as double? ?? 250.0;
    final deliveryFee = orderData['deliveryFee'] as double? ?? 50.0;
    final total = orderData['total'] as double? ?? 300.0;

    return Card(
      elevation: 4,
      shadowColor: AppTheme.lightTheme.colorScheme.shadow,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
      ),
      child: Padding(
        padding: EdgeInsets.all(4.w),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Service Type Header
            Row(
              children: [
                CustomIconWidget(
                  iconName: serviceType == 'Dry Clean'
                      ? 'dry_cleaning'
                      : 'local_laundry_service',
                  color: AppTheme.lightTheme.colorScheme.primary,
                  size: 6.w,
                ),
                SizedBox(width: 3.w),
                Expanded(
                  child: Text(
                    serviceType,
                    style: Theme.of(context).textTheme.titleLarge?.copyWith(
                          fontWeight: FontWeight.w600,
                          color: AppTheme.lightTheme.colorScheme.primary,
                        ),
                  ),
                ),
              ],
            ),
            SizedBox(height: 3.h),

            // Pickup Details
            _buildDetailRow(
              context,
              'Pickup Address',
              pickupAddress,
              'location_on',
            ),
            SizedBox(height: 2.h),

            _buildDetailRow(
              context,
              'Scheduled Date',
              scheduledDate,
              'calendar_today',
            ),
            SizedBox(height: 2.h),

            _buildDetailRow(
              context,
              'Time Slot',
              scheduledTime,
              'access_time',
            ),
            SizedBox(height: 2.h),

            _buildDetailRow(
              context,
              'Items',
              '$itemCount pieces',
              'checkroom',
            ),
            SizedBox(height: 3.h),

            // Pricing Breakdown
            Container(
              padding: EdgeInsets.all(3.w),
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.colorScheme.surface,
                borderRadius: BorderRadius.circular(12),
              ),
              child: Column(
                children: [
                  _buildPriceRow(
                      context, 'Subtotal', '₹${subtotal.toStringAsFixed(0)}'),
                  SizedBox(height: 1.h),
                  _buildPriceRow(context, 'Delivery Fee',
                      '₹${deliveryFee.toStringAsFixed(0)}'),
                  SizedBox(height: 1.h),
                  Divider(
                      color: AppTheme.lightTheme.colorScheme.outline
                          .withValues(alpha: 0.3)),
                  SizedBox(height: 1.h),
                  _buildPriceRow(
                    context,
                    'Total Amount',
                    '₹${total.toStringAsFixed(0)}',
                    isTotal: true,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDetailRow(
      BuildContext context, String label, String value, String iconName) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        CustomIconWidget(
          iconName: iconName,
          color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
          size: 5.w,
        ),
        SizedBox(width: 3.w),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                label,
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                    ),
              ),
              SizedBox(height: 0.5.h),
              Text(
                value,
                style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                      fontWeight: FontWeight.w500,
                      color: AppTheme.lightTheme.colorScheme.onSurface,
                    ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildPriceRow(BuildContext context, String label, String amount,
      {bool isTotal = false}) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          label,
          style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                fontWeight: isTotal ? FontWeight.w600 : FontWeight.w400,
                color: isTotal
                    ? AppTheme.lightTheme.colorScheme.onSurface
                    : AppTheme.lightTheme.colorScheme.onSurfaceVariant,
              ),
        ),
        Text(
          amount,
          style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                fontWeight: isTotal ? FontWeight.w700 : FontWeight.w500,
                color: isTotal
                    ? AppTheme.lightTheme.colorScheme.primary
                    : AppTheme.lightTheme.colorScheme.onSurface,
              ),
        ),
      ],
    );
  }
}
