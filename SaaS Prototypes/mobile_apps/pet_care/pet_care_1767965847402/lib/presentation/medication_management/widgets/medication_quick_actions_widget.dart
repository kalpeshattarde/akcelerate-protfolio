import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class MedicationQuickActionsWidget extends StatelessWidget {
  final Map<String, dynamic> medication;
  final VoidCallback? onSkipDose;
  final VoidCallback? onEditSchedule;
  final VoidCallback? onRefillAlert;
  final VoidCallback? onViewHistory;

  const MedicationQuickActionsWidget({
    super.key,
    required this.medication,
    this.onSkipDose,
    this.onEditSchedule,
    this.onRefillAlert,
    this.onViewHistory,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
        boxShadow: [
          BoxShadow(
            color: theme.brightness == Brightness.light
                ? AppTheme.shadowLight
                : AppTheme.shadowDark,
            blurRadius: 8,
            offset: Offset(0, -2),
          ),
        ],
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          _buildHandle(theme),
          _buildHeader(context),
          _buildMedicationInfo(context),
          _buildActionsList(context),
          SizedBox(height: 2.h),
        ],
      ),
    );
  }

  Widget _buildHandle(ThemeData theme) {
    return Container(
      width: 40,
      height: 4,
      margin: EdgeInsets.symmetric(vertical: 3.w),
      decoration: BoxDecoration(
        color: theme.brightness == Brightness.light
            ? AppTheme.dividerLight
            : AppTheme.dividerDark,
        borderRadius: BorderRadius.circular(2),
      ),
    );
  }

  Widget _buildHeader(BuildContext context) {
    final theme = Theme.of(context);

    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
      child: Row(
        children: [
          Text(
            'Quick Actions',
            style: theme.textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.w600,
            ),
          ),
          Spacer(),
          IconButton(
            onPressed: () => Navigator.of(context).pop(),
            icon: CustomIconWidget(
              iconName: 'close',
              color: theme.brightness == Brightness.light
                  ? AppTheme.textSecondaryLight
                  : AppTheme.textSecondaryDark,
              size: 24,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMedicationInfo(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: theme.brightness == Brightness.light
            ? AppTheme.backgroundLight
            : AppTheme.backgroundDark,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        children: [
          Container(
            width: 12.w,
            height: 12.w,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(8),
              border: Border.all(
                color: theme.brightness == Brightness.light
                    ? AppTheme.dividerLight
                    : AppTheme.dividerDark,
                width: 1,
              ),
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(7),
              child: CustomImageWidget(
                imageUrl: medication["petPhoto"] as String? ?? "",
                width: 12.w,
                height: 12.w,
                fit: BoxFit.cover,
              ),
            ),
          ),
          SizedBox(width: 3.w),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  medication["medicationName"] as String? ??
                      "Unknown Medication",
                  style: theme.textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
                SizedBox(height: 0.5.h),
                Text(
                  "${medication["petName"]} • ${medication["dosage"]}",
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: theme.brightness == Brightness.light
                        ? AppTheme.textSecondaryLight
                        : AppTheme.textSecondaryDark,
                  ),
                ),
                SizedBox(height: 0.5.h),
                Text(
                  "Next: ${medication["nextDoseTime"]}",
                  style: theme.textTheme.bodySmall?.copyWith(
                    color: AppTheme.primaryLight,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildActionsList(BuildContext context) {
    final theme = Theme.of(context);

    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 4.w),
      child: Column(
        children: [
          _buildActionTile(
            context,
            icon: 'skip_next',
            title: 'Skip This Dose',
            subtitle: 'Mark this dose as skipped',
            color: AppTheme.warningLight,
            onTap: () {
              Navigator.of(context).pop();
              onSkipDose?.call();
            },
          ),
          _buildActionTile(
            context,
            icon: 'edit_calendar',
            title: 'Edit Schedule',
            subtitle: 'Modify medication timing',
            color: AppTheme.primaryLight,
            onTap: () {
              Navigator.of(context).pop();
              onEditSchedule?.call();
            },
          ),
          _buildActionTile(
            context,
            icon: 'notification_add',
            title: 'Refill Alert',
            subtitle: 'Set low stock reminder',
            color: AppTheme.accentLight,
            onTap: () {
              Navigator.of(context).pop();
              onRefillAlert?.call();
            },
          ),
          _buildActionTile(
            context,
            icon: 'history',
            title: 'View History',
            subtitle: 'See medication log',
            color: AppTheme.secondaryLight,
            onTap: () {
              Navigator.of(context).pop();
              onViewHistory?.call();
            },
          ),
        ],
      ),
    );
  }

  Widget _buildActionTile(
    BuildContext context, {
    required String icon,
    required String title,
    required String subtitle,
    required Color color,
    required VoidCallback onTap,
  }) {
    final theme = Theme.of(context);

    return ListTile(
      leading: Container(
        width: 10.w,
        height: 10.w,
        decoration: BoxDecoration(
          color: color.withValues(alpha: 0.1),
          borderRadius: BorderRadius.circular(8),
        ),
        child: Center(
          child: CustomIconWidget(
            iconName: icon,
            color: color,
            size: 20,
          ),
        ),
      ),
      title: Text(
        title,
        style: theme.textTheme.titleMedium?.copyWith(
          fontWeight: FontWeight.w500,
        ),
      ),
      subtitle: Text(
        subtitle,
        style: theme.textTheme.bodyMedium?.copyWith(
          color: theme.brightness == Brightness.light
              ? AppTheme.textSecondaryLight
              : AppTheme.textSecondaryDark,
        ),
      ),
      trailing: CustomIconWidget(
        iconName: 'arrow_forward_ios',
        color: theme.brightness == Brightness.light
            ? AppTheme.textSecondaryLight
            : AppTheme.textSecondaryDark,
        size: 16,
      ),
      onTap: onTap,
      contentPadding: EdgeInsets.symmetric(horizontal: 0, vertical: 1.h),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(8),
      ),
    );
  }
}
