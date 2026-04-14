import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class MedicationCardWidget extends StatelessWidget {
  final Map<String, dynamic> medication;
  final VoidCallback? onSwipeRight;
  final VoidCallback? onSwipeLeft;
  final VoidCallback? onTap;

  const MedicationCardWidget({
    super.key,
    required this.medication,
    this.onSwipeRight,
    this.onSwipeLeft,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Dismissible(
      key: Key('medication_${medication["id"]}'),
      background: _buildSwipeBackground(context, true),
      secondaryBackground: _buildSwipeBackground(context, false),
      onDismissed: (direction) {
        if (direction == DismissDirection.startToEnd) {
          onSwipeRight?.call();
        } else if (direction == DismissDirection.endToStart) {
          onSwipeLeft?.call();
        }
      },
      child: Card(
        margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
        elevation: 2,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        child: InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(12),
          child: Padding(
            padding: EdgeInsets.all(4.w),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _buildHeader(context),
                SizedBox(height: 2.h),
                _buildMedicationInfo(context),
                SizedBox(height: 2.h),
                _buildStatusAndTimer(context),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildSwipeBackground(BuildContext context, bool isRightSwipe) {
    final theme = Theme.of(context);

    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
      decoration: BoxDecoration(
        color: isRightSwipe ? AppTheme.successLight : AppTheme.warningLight,
        borderRadius: BorderRadius.circular(12),
      ),
      alignment: isRightSwipe ? Alignment.centerLeft : Alignment.centerRight,
      padding: EdgeInsets.symmetric(horizontal: 6.w),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          CustomIconWidget(
            iconName: isRightSwipe ? 'check_circle' : 'more_horiz',
            color: Colors.white,
            size: 32,
          ),
          SizedBox(height: 1.h),
          Text(
            isRightSwipe ? 'Mark Given' : 'Options',
            style: theme.textTheme.labelMedium?.copyWith(
              color: Colors.white,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildHeader(BuildContext context) {
    final theme = Theme.of(context);

    return Row(
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
                medication["petName"] as String? ?? "Unknown Pet",
                style: theme.textTheme.labelMedium?.copyWith(
                  color: theme.brightness == Brightness.light
                      ? AppTheme.textSecondaryLight
                      : AppTheme.textSecondaryDark,
                ),
              ),
              SizedBox(height: 0.5.h),
              Text(
                medication["medicationName"] as String? ?? "Unknown Medication",
                style: theme.textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
            ],
          ),
        ),
        _buildStatusIndicator(context),
      ],
    );
  }

  Widget _buildStatusIndicator(BuildContext context) {
    final status = medication["status"] as String? ?? "upcoming";
    Color statusColor;
    IconData statusIcon;

    switch (status.toLowerCase()) {
      case 'due':
        statusColor = AppTheme.errorLight;
        statusIcon = Icons.schedule;
        break;
      case 'completed':
        statusColor = AppTheme.successLight;
        statusIcon = Icons.check_circle;
        break;
      case 'overdue':
        statusColor = AppTheme.warningLight;
        statusIcon = Icons.warning;
        break;
      default:
        statusColor = AppTheme.primaryLight;
        statusIcon = Icons.access_time;
    }

    return Container(
      padding: EdgeInsets.symmetric(horizontal: 2.w, vertical: 1.h),
      decoration: BoxDecoration(
        color: statusColor.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(6),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          CustomIconWidget(
            iconName: statusIcon.codePoint.toString(),
            color: statusColor,
            size: 16,
          ),
          SizedBox(width: 1.w),
          Text(
            status.toUpperCase(),
            style: Theme.of(context).textTheme.labelSmall?.copyWith(
                  color: statusColor,
                  fontWeight: FontWeight.w600,
                ),
          ),
        ],
      ),
    );
  }

  Widget _buildMedicationInfo(BuildContext context) {
    final theme = Theme.of(context);

    return Row(
      children: [
        Expanded(
          child: _buildInfoItem(
            context,
            'Dosage',
            medication["dosage"] as String? ?? "N/A",
            Icons.medication,
          ),
        ),
        SizedBox(width: 4.w),
        Expanded(
          child: _buildInfoItem(
            context,
            'Frequency',
            medication["frequency"] as String? ?? "N/A",
            Icons.schedule,
          ),
        ),
        SizedBox(width: 4.w),
        Expanded(
          child: _buildInfoItem(
            context,
            'Remaining',
            "${medication["remainingPills"] ?? 0} pills",
            Icons.inventory,
          ),
        ),
      ],
    );
  }

  Widget _buildInfoItem(
      BuildContext context, String label, String value, IconData icon) {
    final theme = Theme.of(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            CustomIconWidget(
              iconName: icon.codePoint.toString(),
              color: theme.brightness == Brightness.light
                  ? AppTheme.textSecondaryLight
                  : AppTheme.textSecondaryDark,
              size: 14,
            ),
            SizedBox(width: 1.w),
            Text(
              label,
              style: theme.textTheme.labelSmall?.copyWith(
                color: theme.brightness == Brightness.light
                    ? AppTheme.textSecondaryLight
                    : AppTheme.textSecondaryDark,
              ),
            ),
          ],
        ),
        SizedBox(height: 0.5.h),
        Text(
          value,
          style: theme.textTheme.bodyMedium?.copyWith(
            fontWeight: FontWeight.w500,
          ),
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
        ),
      ],
    );
  }

  Widget _buildStatusAndTimer(BuildContext context) {
    final theme = Theme.of(context);
    final nextDoseTime = medication["nextDoseTime"] as String? ?? "";
    final timeUntilNext = medication["timeUntilNext"] as String? ?? "";

    return Container(
      padding: EdgeInsets.all(3.w),
      decoration: BoxDecoration(
        color: theme.brightness == Brightness.light
            ? AppTheme.backgroundLight
            : AppTheme.backgroundDark,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Next Dose',
                  style: theme.textTheme.labelSmall?.copyWith(
                    color: theme.brightness == Brightness.light
                        ? AppTheme.textSecondaryLight
                        : AppTheme.textSecondaryDark,
                  ),
                ),
                SizedBox(height: 0.5.h),
                Text(
                  nextDoseTime,
                  style: theme.textTheme.bodyMedium?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
          ),
          Container(
            padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
            decoration: BoxDecoration(
              color: AppTheme.primaryLight.withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(6),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                CustomIconWidget(
                  iconName: 'timer',
                  color: AppTheme.primaryLight,
                  size: 16,
                ),
                SizedBox(width: 1.w),
                Text(
                  timeUntilNext,
                  style: theme.textTheme.labelMedium?.copyWith(
                    color: AppTheme.primaryLight,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
