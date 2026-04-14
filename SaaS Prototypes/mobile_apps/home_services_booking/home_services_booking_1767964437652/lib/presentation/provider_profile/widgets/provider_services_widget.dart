import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../core/design_constants.dart';
import '../../../widgets/custom_icon_widget.dart';

class ProviderServicesWidget extends StatelessWidget {
  final List<Map<String, dynamic>> services;

  const ProviderServicesWidget({
    super.key,
    required this.services,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
      padding: EdgeInsets.all(ServiceCardDesign.cardPadding.w),
      decoration: BoxDecoration(
        color: colorScheme.surface,
        borderRadius: BorderRadius.circular(ServiceCardDesign.cornerRadius),
        boxShadow: [
          BoxShadow(
            color: colorScheme.shadow
                .withValues(alpha: ServiceCardDesign.shadowOpacity),
            blurRadius: ServiceCardDesign.shadowBlurRadius,
            offset: ServiceCardDesign.shadowOffset,
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Service Specializations',
            style: theme.textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.w700,
            ),
          ),
          SizedBox(height: 2.h),
          Wrap(
            spacing: 2.w,
            runSpacing: 1.h,
            children: services
                .map((service) => _buildServiceChip(
                      context,
                      service['name'] as String,
                      service['icon'] as String,
                      _getCategoryForService(service['name'] as String),
                    ))
                .toList(),
          ),
        ],
      ),
    );
  }

  Widget _buildServiceChip(
    BuildContext context,
    String serviceName,
    String iconName,
    String category,
  ) {
    final theme = Theme.of(context);

    return Container(
      padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
      decoration: ServiceCardDesign.generateCardDecoration(category),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          CustomIconWidget(
            iconName: iconName,
            color: ServiceCardDesign.getContrastingTextColor(category),
            size: ServiceCardDesign.secondaryIconSize,
          ),
          SizedBox(width: 2.w),
          Text(
            serviceName,
            style: theme.textTheme.labelMedium?.copyWith(
              color: ServiceCardDesign.getContrastingTextColor(category),
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }

  String _getCategoryForService(String serviceName) {
    final name = serviceName.toLowerCase();

    if (name.contains('electrical')) {
      return 'electrical';
    } else if (name.contains('plumbing')) {
      return 'plumbing';
    } else if (name.contains('wiring') ||
        name.contains('fixture') ||
        name.contains('installation')) {
      return 'electrical';
    } else if (name.contains('emergency')) {
      return 'handyman';
    } else {
      return 'handyman'; // Default fallback
    }
  }
}
