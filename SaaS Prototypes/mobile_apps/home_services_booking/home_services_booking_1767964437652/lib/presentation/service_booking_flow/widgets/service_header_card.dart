import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../core/design_constants.dart';
import '../../../widgets/custom_icon_widget.dart';

class ServiceHeaderCard extends StatelessWidget {
  final Map<String, dynamic> selectedService;

  const ServiceHeaderCard({
    super.key,
    required this.selectedService,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final serviceCategory =
        selectedService['category'] as String? ?? 'cleaning';

    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
      decoration: ServiceCardDesign.generateCardDecoration(serviceCategory),
      child: Padding(
        padding: EdgeInsets.all(ServiceCardDesign.cardPadding.w),
        child: Row(
          children: [
            // Service Icon
            Container(
              width: 15.w,
              height: 15.w,
              decoration: BoxDecoration(
                color:
                    ServiceCardDesign.getContrastingTextColor(serviceCategory)
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

            // Service Info
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    selectedService['name'] as String? ?? 'Service',
                    style: theme.textTheme.titleLarge?.copyWith(
                      color: ServiceCardDesign.getContrastingTextColor(
                          serviceCategory),
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  SizedBox(height: 0.5.h),
                  Text(
                    selectedService['description'] as String? ??
                        'Professional service',
                    style: theme.textTheme.bodyMedium?.copyWith(
                      color: ServiceCardDesign.getSecondaryTextColor(
                          serviceCategory),
                      height: 1.3,
                    ),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                  SizedBox(height: 1.h),
                  Container(
                    padding:
                        EdgeInsets.symmetric(horizontal: 3.w, vertical: 0.8.h),
                    decoration: BoxDecoration(
                      color: ServiceCardDesign.getHighContrastButtonColor(
                          serviceCategory),
                      borderRadius: BorderRadius.circular(
                          ServiceCardDesign.buttonBorderRadius),
                      border: Border.all(
                        color: Colors.white.withAlpha(102),
                        width: 1.5,
                      ),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withAlpha(51),
                          blurRadius: 6,
                          offset: const Offset(0, 3),
                        ),
                      ],
                    ),
                    child: Text(
                      'Starting at \$${selectedService['basePrice'] ?? '0'}',
                      style: theme.textTheme.labelMedium?.copyWith(
                        color: ServiceCardDesign.getButtonTextColor(
                            serviceCategory),
                        fontWeight: FontWeight.w700,
                        fontSize: ServiceCardDesign.buttonFontSize,
                      ),
                    ),
                  ),
                ],
              ),
            ),

            // Category Badge
            Container(
              padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
              decoration: BoxDecoration(
                color: ServiceCardDesign.getHighContrastButtonColor(
                    serviceCategory),
                borderRadius:
                    BorderRadius.circular(ServiceCardDesign.buttonBorderRadius),
                border: Border.all(
                  color: Colors.white.withAlpha(102),
                  width: 1.5,
                ),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withAlpha(51),
                    blurRadius: 6,
                    offset: const Offset(0, 3),
                  ),
                ],
              ),
              child: Text(
                serviceCategory.toUpperCase(),
                style: theme.textTheme.labelSmall?.copyWith(
                  color: ServiceCardDesign.getButtonTextColor(serviceCategory),
                  fontWeight: FontWeight.w800,
                  fontSize: ServiceCardDesign.captionFontSize,
                ),
              ),
            ),
          ],
        ),
      ),
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
