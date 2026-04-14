import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class EarningOpportunitiesWidget extends StatelessWidget {
  final List<Map<String, dynamic>> opportunities;
  final Function(String) onOpportunityTap;

  const EarningOpportunitiesWidget({
    Key? key,
    required this.opportunities,
    required this.onOpportunityTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    if (opportunities.isEmpty) {
      return SizedBox.shrink();
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
          child: Text(
            'Earn More Credits',
            style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
        ListView.builder(
          shrinkWrap: true,
          physics: NeverScrollableScrollPhysics(),
          itemCount: opportunities.length,
          itemBuilder: (context, index) {
            final opportunity = opportunities[index];
            return _buildOpportunityCard(opportunity);
          },
        ),
      ],
    );
  }

  Widget _buildOpportunityCard(Map<String, dynamic> opportunity) {
    final title = opportunity['title'] as String;
    final description = opportunity['description'] as String;
    final reward = opportunity['reward'] as String;
    final iconName = opportunity['icon'] as String;
    final actionId = opportunity['actionId'] as String;
    final isCompleted = opportunity['isCompleted'] as bool? ?? false;

    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.cardColor,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: isCompleted
              ? AppTheme.successLight.withValues(alpha: 0.3)
              : AppTheme.lightTheme.dividerColor,
          width: 1,
        ),
      ),
      child: InkWell(
        onTap: isCompleted ? null : () => onOpportunityTap(actionId),
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: EdgeInsets.all(4.w),
          child: Row(
            children: [
              Container(
                padding: EdgeInsets.all(3.w),
                decoration: BoxDecoration(
                  color: isCompleted
                      ? AppTheme.successLight.withValues(alpha: 0.1)
                      : AppTheme.accentLight.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: CustomIconWidget(
                  iconName: isCompleted ? 'check_circle' : iconName,
                  color: isCompleted
                      ? AppTheme.successLight
                      : AppTheme.accentLight,
                  size: 24,
                ),
              ),
              SizedBox(width: 4.w),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style:
                          AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w600,
                        color: isCompleted
                            ? AppTheme.textSecondaryLight
                            : AppTheme.textPrimaryLight,
                      ),
                    ),
                    SizedBox(height: 0.5.h),
                    Text(
                      description,
                      style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                        color: AppTheme.textSecondaryLight,
                      ),
                    ),
                  ],
                ),
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Container(
                    padding:
                        EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
                    decoration: BoxDecoration(
                      color: isCompleted
                          ? AppTheme.successLight.withValues(alpha: 0.1)
                          : AppTheme.accentLight.withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Text(
                      isCompleted ? 'Completed' : reward,
                      style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                        color: isCompleted
                            ? AppTheme.successLight
                            : AppTheme.accentLight,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                  if (!isCompleted) ...[
                    SizedBox(height: 1.h),
                    CustomIconWidget(
                      iconName: 'arrow_forward_ios',
                      color: AppTheme.textSecondaryLight,
                      size: 16,
                    ),
                  ],
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
