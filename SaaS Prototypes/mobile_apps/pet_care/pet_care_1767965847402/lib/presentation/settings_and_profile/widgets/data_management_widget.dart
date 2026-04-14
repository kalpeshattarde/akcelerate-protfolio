import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../widgets/custom_icon_widget.dart';

class DataManagementWidget extends StatelessWidget {
  final Map<String, dynamic> dataStatus;
  final VoidCallback onBackupNow;
  final VoidCallback onExportData;
  final VoidCallback onSyncSettings;
  final Function(bool) onAutoBackupToggle;

  const DataManagementWidget({
    super.key,
    required this.dataStatus,
    required this.onBackupNow,
    required this.onExportData,
    required this.onSyncSettings,
    required this.onAutoBackupToggle,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      width: double.infinity,
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: BorderRadius.circular(3.w),
        boxShadow: [
          BoxShadow(
            color: theme.brightness == Brightness.light
                ? const Color(0x0A000000)
                : const Color(0x1A000000),
            blurRadius: 4,
            offset: const Offset(0, 1),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Data Management',
            style: theme.textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.w600,
            ),
          ),
          SizedBox(height: 3.h),

          // Backup Status Card
          Container(
            width: double.infinity,
            padding: EdgeInsets.all(4.w),
            decoration: BoxDecoration(
              color: _getBackupStatusColor(dataStatus["backupStatus"] as String)
                  .withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(2.w),
              border: Border.all(
                color:
                    _getBackupStatusColor(dataStatus["backupStatus"] as String)
                        .withValues(alpha: 0.3),
                width: 1,
              ),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    CustomIconWidget(
                      iconName: _getBackupStatusIcon(
                          dataStatus["backupStatus"] as String),
                      color: _getBackupStatusColor(
                          dataStatus["backupStatus"] as String),
                      size: 5.w,
                    ),
                    SizedBox(width: 3.w),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Backup Status',
                            style: theme.textTheme.titleSmall?.copyWith(
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          Text(
                            dataStatus["backupStatus"] as String,
                            style: theme.textTheme.bodyMedium?.copyWith(
                              color: _getBackupStatusColor(
                                  dataStatus["backupStatus"] as String),
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                SizedBox(height: 2.h),
                Text(
                  'Last backup: ${dataStatus["lastBackup"]}',
                  style: theme.textTheme.bodySmall?.copyWith(
                    color: theme.brightness == Brightness.light
                        ? const Color(0xFF6A737D)
                        : const Color(0xFFADB5BD),
                  ),
                ),
                Text(
                  'Storage used: ${dataStatus["storageUsed"]}',
                  style: theme.textTheme.bodySmall?.copyWith(
                    color: theme.brightness == Brightness.light
                        ? const Color(0xFF6A737D)
                        : const Color(0xFFADB5BD),
                  ),
                ),
              ],
            ),
          ),

          SizedBox(height: 3.h),

          // Auto Backup Toggle
          Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Automatic Backup',
                      style: theme.textTheme.bodyLarge?.copyWith(
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    Text(
                      'Automatically backup your data daily',
                      style: theme.textTheme.bodySmall?.copyWith(
                        color: theme.brightness == Brightness.light
                            ? const Color(0xFF6A737D)
                            : const Color(0xFFADB5BD),
                      ),
                    ),
                  ],
                ),
              ),
              Switch(
                value: dataStatus["autoBackup"] as bool,
                onChanged: onAutoBackupToggle,
              ),
            ],
          ),

          SizedBox(height: 3.h),

          // Data Statistics
          Container(
            width: double.infinity,
            padding: EdgeInsets.all(3.w),
            decoration: BoxDecoration(
              color: theme.brightness == Brightness.light
                  ? const Color(0xFFFAFBFC)
                  : const Color(0xFF1B2329),
              borderRadius: BorderRadius.circular(2.w),
              border: Border.all(
                color: theme.brightness == Brightness.light
                    ? const Color(0xFFE1E4E8)
                    : const Color(0xFF30363D),
                width: 1,
              ),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Data Overview',
                  style: theme.textTheme.titleSmall?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),
                SizedBox(height: 2.h),
                Row(
                  children: [
                    Expanded(
                      child: _buildDataStat(
                        context,
                        'Pet Profiles',
                        dataStatus["petProfiles"].toString(),
                        Icons.pets,
                      ),
                    ),
                    SizedBox(width: 3.w),
                    Expanded(
                      child: _buildDataStat(
                        context,
                        'Medical Records',
                        dataStatus["medicalRecords"].toString(),
                        Icons.medical_services,
                      ),
                    ),
                  ],
                ),
                SizedBox(height: 2.h),
                Row(
                  children: [
                    Expanded(
                      child: _buildDataStat(
                        context,
                        'Photos',
                        dataStatus["photos"].toString(),
                        Icons.photo_library,
                      ),
                    ),
                    SizedBox(width: 3.w),
                    Expanded(
                      child: _buildDataStat(
                        context,
                        'Documents',
                        dataStatus["documents"].toString(),
                        Icons.description,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),

          SizedBox(height: 3.h),

          // Action Buttons
          Row(
            children: [
              Expanded(
                child: ElevatedButton(
                  onPressed: onBackupNow,
                  style: ElevatedButton.styleFrom(
                    padding: EdgeInsets.symmetric(vertical: 2.h),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(2.w),
                    ),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      CustomIconWidget(
                        iconName: 'backup',
                        color: Colors.white,
                        size: 4.w,
                      ),
                      SizedBox(width: 2.w),
                      Text(
                        'Backup Now',
                        style: theme.textTheme.bodyMedium?.copyWith(
                          color: Colors.white,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              SizedBox(width: 3.w),
              Expanded(
                child: OutlinedButton(
                  onPressed: onExportData,
                  style: OutlinedButton.styleFrom(
                    padding: EdgeInsets.symmetric(vertical: 2.h),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(2.w),
                    ),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      CustomIconWidget(
                        iconName: 'download',
                        color: theme.colorScheme.primary,
                        size: 4.w,
                      ),
                      SizedBox(width: 2.w),
                      Text(
                        'Export Data',
                        style: theme.textTheme.bodyMedium?.copyWith(
                          color: theme.colorScheme.primary,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),

          SizedBox(height: 2.h),

          // Sync Settings Link
          GestureDetector(
            onTap: onSyncSettings,
            child: Container(
              width: double.infinity,
              padding: EdgeInsets.symmetric(vertical: 2.h),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  CustomIconWidget(
                    iconName: 'sync',
                    color: theme.brightness == Brightness.light
                        ? const Color(0xFF6A737D)
                        : const Color(0xFFADB5BD),
                    size: 4.w,
                  ),
                  SizedBox(width: 2.w),
                  Text(
                    'Sync Settings',
                    style: theme.textTheme.bodyMedium?.copyWith(
                      color: theme.brightness == Brightness.light
                          ? const Color(0xFF6A737D)
                          : const Color(0xFFADB5BD),
                      decoration: TextDecoration.underline,
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

  Widget _buildDataStat(
      BuildContext context, String label, String value, IconData icon) {
    final theme = Theme.of(context);

    return Column(
      children: [
        CustomIconWidget(
          iconName: icon.toString().split('.').last,
          color: theme.colorScheme.primary,
          size: 5.w,
        ),
        SizedBox(height: 1.h),
        Text(
          value,
          style: theme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w600,
            color: theme.colorScheme.primary,
          ),
        ),
        Text(
          label,
          style: theme.textTheme.labelSmall?.copyWith(
            color: theme.brightness == Brightness.light
                ? const Color(0xFF6A737D)
                : const Color(0xFFADB5BD),
          ),
          textAlign: TextAlign.center,
        ),
      ],
    );
  }

  Color _getBackupStatusColor(String status) {
    switch (status.toLowerCase()) {
      case 'up to date':
        return const Color(0xFF28A745); // Success green
      case 'syncing':
        return const Color(0xFFE8A547); // Warning amber
      case 'failed':
        return const Color(0xFFD73A49); // Error red
      default:
        return const Color(0xFF6A737D); // Default gray
    }
  }

  String _getBackupStatusIcon(String status) {
    switch (status.toLowerCase()) {
      case 'up to date':
        return 'check_circle';
      case 'syncing':
        return 'sync';
      case 'failed':
        return 'error';
      default:
        return 'cloud';
    }
  }
}
