import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../core/design_constants.dart';
import '../../../widgets/custom_icon_widget.dart';

class ServiceSummaryWidget extends StatelessWidget {
  final Map<String, dynamic> serviceData;

  const ServiceSummaryWidget({
    super.key,
    required this.serviceData,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final serviceCategory =
        serviceData['serviceCategory'] as String? ?? 'cleaning';

    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w),
      decoration: ServiceCardDesign.generateCardDecoration(serviceCategory),
      child: Padding(
        padding: EdgeInsets.all(ServiceCardDesign.cardPadding.w),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header with service info
            Row(
              children: [
                Container(
                  width: 15.w,
                  height: 15.w,
                  decoration: BoxDecoration(
                    color: ServiceCardDesign.getContrastingTextColor(
                            serviceCategory)
                        .withValues(alpha: 0.2),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Center(
                    child: CustomIconWidget(
                      iconName: _getServiceIcon(serviceCategory),
                      color: ServiceCardDesign.getContrastingTextColor(
                          serviceCategory),
                      size: ServiceCardDesign.primaryIconSize,
                    ),
                  ),
                ),
                SizedBox(width: 4.w),

                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        serviceData['serviceName'] as String? ??
                            'Service Completed',
                        style: theme.textTheme.titleLarge?.copyWith(
                          color: ServiceCardDesign.getContrastingTextColor(
                              serviceCategory),
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                      SizedBox(height: 0.5.h),
                      Text(
                        serviceData['providerName'] as String? ??
                            'Service Provider',
                        style: theme.textTheme.titleMedium?.copyWith(
                          color: ServiceCardDesign.getSecondaryTextColor(
                              serviceCategory),
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ],
                  ),
                ),

                // Completion Badge
                Container(
                  padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
                  decoration: ServiceCardDesign.generateButtonDecoration(
                    backgroundColor: ServiceCardDesign.getContrastingTextColor(
                        serviceCategory),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      CustomIconWidget(
                        iconName: 'check_circle',
                        color: const Color(0xFF059669),
                        size: 4.w,
                      ),
                      SizedBox(width: 1.w),
                      Text(
                        'COMPLETED',
                        style: theme.textTheme.labelSmall?.copyWith(
                          color: ServiceCardDesign.getServicePrimaryColor(
                              serviceCategory),
                          fontWeight: FontWeight.w700,
                          fontSize: ServiceCardDesign.captionFontSize,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),

            SizedBox(height: 3.h),

            // Service details
            Row(
              children: [
                Expanded(
                  child: _buildDetailItem(
                    context,
                    'Date',
                    serviceData['date'] as String? ?? 'Today',
                    'calendar_today',
                    serviceCategory,
                  ),
                ),
                SizedBox(width: 4.w),
                Expanded(
                  child: _buildDetailItem(
                    context,
                    'Duration',
                    serviceData['duration'] as String? ?? '2 hours',
                    'timer',
                    serviceCategory,
                  ),
                ),
                SizedBox(width: 4.w),
                Expanded(
                  child: _buildDetailItem(
                    context,
                    'Cost',
                    serviceData['totalCost'] as String? ?? '\$0',
                    'payments',
                    serviceCategory,
                  ),
                ),
              ],
            ),

            if (serviceData['address'] != null) ...[
              SizedBox(height: 2.h),
              Row(
                children: [
                  CustomIconWidget(
                    iconName: 'location_on',
                    color: ServiceCardDesign.getSecondaryTextColor(
                        serviceCategory),
                    size: 5.w,
                  ),
                  SizedBox(width: 2.w),
                  Expanded(
                    child: Text(
                      serviceData['address'],
                      style: theme.textTheme.bodyMedium?.copyWith(
                        color: ServiceCardDesign.getContrastingTextColor(
                            serviceCategory),
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildDetailItem(
    BuildContext context,
    String label,
    String value,
    String iconName,
    String serviceCategory,
  ) {
    final theme = Theme.of(context);

    return Column(
      children: [
        CustomIconWidget(
          iconName: iconName,
          color: ServiceCardDesign.getSecondaryTextColor(serviceCategory),
          size: 6.w,
        ),
        SizedBox(height: 1.h),
        Text(
          label,
          style: theme.textTheme.bodySmall?.copyWith(
            color: ServiceCardDesign.getSecondaryTextColor(serviceCategory),
          ),
        ),
        SizedBox(height: 0.5.h),
        Text(
          value,
          style: theme.textTheme.titleSmall?.copyWith(
            color: ServiceCardDesign.getContrastingTextColor(serviceCategory),
            fontWeight: FontWeight.w600,
          ),
        ),
      ],
    );
  }

  String _getServiceIcon(String category) {
    switch (category.toLowerCase()) {
      case 'cleaning':
        return 'cleaning_services';
      case 'plumbing':
        return 'plumbing';
      case 'electrical':
        return 'electrical_services';
      case 'handyman':
        return 'handyman';
      case 'beauty':
        return 'face';
      case 'appliance':
        return 'home_repair_service';
      default:
        return 'home_repair_service';
    }
  }
}
