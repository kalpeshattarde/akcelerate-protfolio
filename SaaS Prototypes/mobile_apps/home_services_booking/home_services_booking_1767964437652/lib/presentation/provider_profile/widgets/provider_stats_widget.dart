import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../core/design_constants.dart';
import '../../../widgets/custom_icon_widget.dart';

class ProviderStatsWidget extends StatelessWidget {
  final Map<String, dynamic> statsData;

  const ProviderStatsWidget({
    super.key,
    required this.statsData,
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
            'Performance Stats',
            style: theme.textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.w700,
            ),
          ),
          SizedBox(height: 3.h),
          Row(
            children: [
              Expanded(
                child: _buildStatCard(
                  context,
                  'Task Completion',
                  '${statsData['completionRate']}%',
                  'task_alt',
                  'cleaning', // Green for completion
                ),
              ),
              SizedBox(width: 3.w),
              Expanded(
                child: _buildStatCard(
                  context,
                  'Average Rating',
                  '${statsData['averageRating']}',
                  'star',
                  'beauty', // Pink for rating
                ),
              ),
              SizedBox(width: 3.w),
              Expanded(
                child: _buildStatCard(
                  context,
                  'Total Services',
                  '${statsData['totalServices']}',
                  'work_history',
                  'electrical', // Red for services count
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildStatCard(
    BuildContext context,
    String label,
    String value,
    String iconName,
    String category,
  ) {
    final theme = Theme.of(context);

    return Container(
      padding: EdgeInsets.all(3.w),
      decoration: ServiceCardDesign.generateCardDecoration(category),
      child: Column(
        children: [
          CustomIconWidget(
            iconName: iconName,
            color: ServiceCardDesign.getContrastingTextColor(category),
            size: ServiceCardDesign.primaryIconSize,
          ),
          SizedBox(height: 1.h),
          Text(
            value,
            style: theme.textTheme.titleLarge?.copyWith(
              color: ServiceCardDesign.getContrastingTextColor(category),
              fontWeight: FontWeight.w700,
            ),
          ),
          SizedBox(height: 0.5.h),
          Text(
            label,
            style: theme.textTheme.bodySmall?.copyWith(
              color: ServiceCardDesign.getSecondaryTextColor(category),
            ),
            textAlign: TextAlign.center,
            maxLines: 2,
          ),
        ],
      ),
    );
  }
}
