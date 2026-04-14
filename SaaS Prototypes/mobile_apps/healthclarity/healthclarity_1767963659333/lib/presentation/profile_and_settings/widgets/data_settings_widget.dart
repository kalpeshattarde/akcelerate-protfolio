import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class DataSettingsWidget extends StatelessWidget {
  final VoidCallback onExportData;
  final VoidCallback onBackupData;
  final VoidCallback onClearData;
  final VoidCallback onPrivacySettings;

  const DataSettingsWidget({
    Key? key,
    required this.onExportData,
    required this.onBackupData,
    required this.onClearData,
    required this.onPrivacySettings,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Export Data
        _buildDataItem(
          context: context,
          title: 'Export Data',
          subtitle: 'Download your nutrition data as CSV file',
          iconName: 'download',
          iconColor: AppTheme.successState,
          onTap: onExportData,
        ),
        SizedBox(height: 1.h),

        // Backup Data
        _buildDataItem(
          context: context,
          title: 'Backup Data',
          subtitle: 'Save your data to cloud storage',
          iconName: 'cloud_upload',
          iconColor: AppTheme.waterAccent,
          onTap: onBackupData,
        ),
        SizedBox(height: 1.h),

        // Privacy Settings
        _buildDataItem(
          context: context,
          title: 'Privacy Settings',
          subtitle: 'Manage your data privacy preferences',
          iconName: 'privacy_tip',
          iconColor: AppTheme.calorieAccent,
          onTap: onPrivacySettings,
        ),
        SizedBox(height: 2.h),

        // Data Usage Info
        _buildDataUsageInfo(context),
        SizedBox(height: 2.h),

        // Clear Data (Danger Zone)
        _buildDangerZone(context),
      ],
    );
  }

  Widget _buildDataItem({
    required BuildContext context,
    required String title,
    required String subtitle,
    required String iconName,
    required Color iconColor,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(8),
      child: Container(
        padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 2.h),
        decoration: BoxDecoration(
          color: Theme.of(context).colorScheme.surface.withValues(alpha: 0.5),
          borderRadius: BorderRadius.circular(8),
          border: Border.all(
            color: Theme.of(context).colorScheme.outline.withValues(alpha: 0.2),
            width: 1,
          ),
        ),
        child: Row(
          children: [
            // Icon
            Container(
              width: 10.w,
              height: 10.w,
              decoration: BoxDecoration(
                color: iconColor.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Center(
                child: CustomIconWidget(
                  iconName: iconName,
                  color: iconColor,
                  size: 5.w,
                ),
              ),
            ),
            SizedBox(width: 3.w),
            // Title and Subtitle
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          fontWeight: FontWeight.w500,
                          color: Theme.of(context).colorScheme.onSurface,
                        ),
                  ),
                  SizedBox(height: 0.5.h),
                  Text(
                    subtitle,
                    style: Theme.of(context).textTheme.bodySmall?.copyWith(
                          color: Theme.of(context).colorScheme.onSurfaceVariant,
                        ),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                ],
              ),
            ),
            SizedBox(width: 2.w),
            // Arrow Icon
            CustomIconWidget(
              iconName: 'chevron_right',
              color: Theme.of(context).colorScheme.onSurfaceVariant,
              size: 5.w,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDataUsageInfo(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: AppTheme.waterAccent.withValues(alpha: 0.05),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: AppTheme.waterAccent.withValues(alpha: 0.2),
          width: 1,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              CustomIconWidget(
                iconName: 'storage',
                color: AppTheme.waterAccent,
                size: 5.w,
              ),
              SizedBox(width: 2.w),
              Text(
                'Data Usage',
                style: Theme.of(context).textTheme.titleSmall?.copyWith(
                      color: AppTheme.waterAccent,
                      fontWeight: FontWeight.w600,
                    ),
              ),
            ],
          ),
          SizedBox(height: 2.h),
          _buildDataUsageItem(context, 'Food Logs', '2.3 MB', '1,247 entries'),
          SizedBox(height: 1.h),
          _buildDataUsageItem(
              context, 'Water Tracking', '0.8 MB', '892 entries'),
          SizedBox(height: 1.h),
          _buildDataUsageItem(context, 'Progress Data', '0.5 MB', '365 days'),
          SizedBox(height: 1.h),
          Divider(
            color: AppTheme.waterAccent.withValues(alpha: 0.2),
            thickness: 1,
          ),
          SizedBox(height: 1.h),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Total Storage Used',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
              ),
              Text(
                '3.6 MB',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      fontWeight: FontWeight.w700,
                      color: AppTheme.waterAccent,
                    ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildDataUsageItem(
      BuildContext context, String category, String size, String count) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                category,
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      fontWeight: FontWeight.w500,
                    ),
              ),
              Text(
                count,
                style: Theme.of(context).textTheme.bodySmall?.copyWith(
                      color: Theme.of(context).colorScheme.onSurfaceVariant,
                    ),
              ),
            ],
          ),
        ),
        Text(
          size,
          style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                fontWeight: FontWeight.w600,
                color: AppTheme.waterAccent,
              ),
        ),
      ],
    );
  }

  Widget _buildDangerZone(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: AppTheme.errorState.withValues(alpha: 0.05),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: AppTheme.errorState.withValues(alpha: 0.2),
          width: 1,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              CustomIconWidget(
                iconName: 'warning',
                color: AppTheme.errorState,
                size: 5.w,
              ),
              SizedBox(width: 2.w),
              Text(
                'Danger Zone',
                style: Theme.of(context).textTheme.titleSmall?.copyWith(
                      color: AppTheme.errorState,
                      fontWeight: FontWeight.w600,
                    ),
              ),
            ],
          ),
          SizedBox(height: 2.h),
          Text(
            'Permanently delete all your nutrition data. This action cannot be undone.',
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  color: Theme.of(context).colorScheme.onSurfaceVariant,
                ),
          ),
          SizedBox(height: 2.h),
          SizedBox(
            width: double.infinity,
            child: OutlinedButton(
              onPressed: () => _showClearDataDialog(context),
              style: OutlinedButton.styleFrom(
                foregroundColor: AppTheme.errorState,
                side: BorderSide(color: AppTheme.errorState, width: 1.5),
                padding: EdgeInsets.symmetric(vertical: 1.5.h),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  CustomIconWidget(
                    iconName: 'delete_forever',
                    color: AppTheme.errorState,
                    size: 4.w,
                  ),
                  SizedBox(width: 2.w),
                  Text(
                    'Clear All Data',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          fontWeight: FontWeight.w600,
                        ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  void _showClearDataDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Row(
            children: [
              CustomIconWidget(
                iconName: 'warning',
                color: AppTheme.errorState,
                size: 6.w,
              ),
              SizedBox(width: 2.w),
              Text(
                'Clear All Data',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                      color: AppTheme.errorState,
                    ),
              ),
            ],
          ),
          content: Text(
            'Are you sure you want to permanently delete all your nutrition data? This action cannot be undone.',
            style: Theme.of(context).textTheme.bodyMedium,
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('Cancel'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.of(context).pop();
                onClearData();
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: AppTheme.errorState,
                foregroundColor: Colors.white,
              ),
              child: const Text('Delete All'),
            ),
          ],
        );
      },
    );
  }
}
