import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class EmergencyHistoryWidget extends StatelessWidget {
  final List<Map<String, dynamic>> emergencyHistory;

  const EmergencyHistoryWidget({
    super.key,
    required this.emergencyHistory,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    if (emergencyHistory.isEmpty) {
      return Container(
        margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
        padding: EdgeInsets.all(6.w),
        decoration: BoxDecoration(
          color: theme.colorScheme.surface,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: theme.dividerColor,
            width: 1,
          ),
        ),
        child: Column(
          children: [
            CustomIconWidget(
              iconName: 'history',
              color: theme.brightness == Brightness.light
                  ? AppTheme.textDisabledLight
                  : AppTheme.textDisabledDark,
              size: 12.w,
            ),
            SizedBox(height: 2.h),
            Text(
              'No Emergency History',
              style: GoogleFonts.inter(
                fontSize: 13.sp,
                fontWeight: FontWeight.w500,
                color: theme.brightness == Brightness.light
                    ? AppTheme.textSecondaryLight
                    : AppTheme.textSecondaryDark,
              ),
            ),
            SizedBox(height: 1.h),
            Text(
              'Your emergency contacts and incidents will appear here',
              style: GoogleFonts.inter(
                fontSize: 13.sp,
                fontWeight: FontWeight.w400,
                color: theme.brightness == Brightness.light
                    ? AppTheme.textDisabledLight
                    : AppTheme.textDisabledDark,
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      );
    }

    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: theme.brightness == Brightness.light
                ? const Color(0x0A000000)
                : const Color(0x1A000000),
            blurRadius: 6,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: EdgeInsets.all(4.w),
            child: Row(
              children: [
                CustomIconWidget(
                  iconName: 'history',
                  color: AppTheme.primaryLight,
                  size: 5.w,
                ),
                SizedBox(width: 2.w),
                Text(
                  'Recent Emergency History',
                  style: GoogleFonts.inter(
                    fontSize: 13.sp,
                    fontWeight: FontWeight.w600,
                    color: theme.brightness == Brightness.light
                        ? AppTheme.textPrimaryLight
                        : AppTheme.textPrimaryDark,
                  ),
                ),
              ],
            ),
          ),
          Container(
            height: 1,
            color: theme.dividerColor,
          ),
          ListView.separated(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: emergencyHistory.length,
            separatorBuilder: (context, index) => Container(
              height: 1,
              margin: EdgeInsets.symmetric(horizontal: 4.w),
              color: theme.dividerColor,
            ),
            itemBuilder: (context, index) {
              final incident = emergencyHistory[index];
              return _buildHistoryItem(context, incident);
            },
          ),
        ],
      ),
    );
  }

  Widget _buildHistoryItem(
      BuildContext context, Map<String, dynamic> incident) {
    final theme = Theme.of(context);
    final DateTime date = incident['date'] as DateTime;
    final String formattedDate = '${date.month}/${date.day}/${date.year}';
    final String formattedTime =
        '${date.hour.toString().padLeft(2, '0')}:${date.minute.toString().padLeft(2, '0')}';

    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: () => _showIncidentDetails(context, incident),
        child: Padding(
          padding: EdgeInsets.all(4.w),
          child: Row(
            children: [
              Container(
                width: 10.w,
                height: 10.w,
                decoration: BoxDecoration(
                  color: _getIncidentColor(incident['type'])
                      .withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Center(
                  child: CustomIconWidget(
                    iconName: _getIncidentIcon(incident['type']),
                    color: _getIncidentColor(incident['type']),
                    size: 5.w,
                  ),
                ),
              ),
              SizedBox(width: 3.w),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      incident['title'] as String,
                      style: GoogleFonts.inter(
                        fontSize: 13.sp,
                        fontWeight: FontWeight.w600,
                        color: theme.brightness == Brightness.light
                            ? AppTheme.textPrimaryLight
                            : AppTheme.textPrimaryDark,
                      ),
                      overflow: TextOverflow.ellipsis,
                    ),
                    SizedBox(height: 0.5.h),
                    Text(
                      incident['petName'] as String,
                      style: GoogleFonts.inter(
                        fontSize: 13.sp,
                        fontWeight: FontWeight.w500,
                        color: AppTheme.primaryLight,
                      ),
                    ),
                    SizedBox(height: 0.5.h),
                    Text(
                      incident['clinic'] as String,
                      style: GoogleFonts.inter(
                        fontSize: 13.sp,
                        fontWeight: FontWeight.w400,
                        color: theme.brightness == Brightness.light
                            ? AppTheme.textSecondaryLight
                            : AppTheme.textSecondaryDark,
                      ),
                      overflow: TextOverflow.ellipsis,
                    ),
                  ],
                ),
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text(
                    formattedDate,
                    style: GoogleFonts.inter(
                      fontSize: 13.sp,
                      fontWeight: FontWeight.w500,
                      color: theme.brightness == Brightness.light
                          ? AppTheme.textSecondaryLight
                          : AppTheme.textSecondaryDark,
                    ),
                  ),
                  SizedBox(height: 0.5.h),
                  Text(
                    formattedTime,
                    style: GoogleFonts.inter(
                      fontSize: 13.sp,
                      fontWeight: FontWeight.w400,
                      color: theme.brightness == Brightness.light
                          ? AppTheme.textDisabledLight
                          : AppTheme.textDisabledDark,
                    ),
                  ),
                  SizedBox(height: 1.h),
                  Container(
                    padding:
                        EdgeInsets.symmetric(horizontal: 2.w, vertical: 0.5.h),
                    decoration: BoxDecoration(
                      color: _getStatusColor(incident['status'])
                          .withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: Text(
                      incident['status'] as String,
                      style: GoogleFonts.inter(
                        fontSize: 13.sp,
                        fontWeight: FontWeight.w500,
                        color: _getStatusColor(incident['status']),
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Color _getIncidentColor(String type) {
    switch (type) {
      case 'emergency':
        return AppTheme.errorLight;
      case 'poison':
        return AppTheme.warningLight;
      case 'injury':
        return AppTheme.primaryLight;
      case 'illness':
        return AppTheme.secondaryLight;
      default:
        return AppTheme.primaryLight;
    }
  }

  String _getIncidentIcon(String type) {
    switch (type) {
      case 'emergency':
        return 'emergency';
      case 'poison':
        return 'warning';
      case 'injury':
        return 'healing';
      case 'illness':
        return 'sick';
      default:
        return 'medical_services';
    }
  }

  Color _getStatusColor(String status) {
    switch (status) {
      case 'Resolved':
        return AppTheme.successLight;
      case 'Follow-up':
        return AppTheme.warningLight;
      case 'Ongoing':
        return AppTheme.errorLight;
      default:
        return AppTheme.primaryLight;
    }
  }

  void _showIncidentDetails(
      BuildContext context, Map<String, dynamic> incident) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => _IncidentDetailsSheet(incident: incident),
    );
  }
}

class _IncidentDetailsSheet extends StatelessWidget {
  final Map<String, dynamic> incident;

  const _IncidentDetailsSheet({required this.incident});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final DateTime date = incident['date'] as DateTime;
    final String formattedDate =
        '${date.month}/${date.day}/${date.year} at ${date.hour.toString().padLeft(2, '0')}:${date.minute.toString().padLeft(2, '0')}';

    return Container(
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
      ),
      child: SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 40,
              height: 4,
              margin: const EdgeInsets.symmetric(vertical: 12),
              decoration: BoxDecoration(
                color: theme.dividerColor,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            Padding(
              padding: EdgeInsets.all(4.w),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Emergency Incident Details',
                    style: GoogleFonts.inter(
                      fontSize: 13.sp,
                      fontWeight: FontWeight.w600,
                      color: theme.brightness == Brightness.light
                          ? AppTheme.textPrimaryLight
                          : AppTheme.textPrimaryDark,
                    ),
                  ),
                  SizedBox(height: 3.h),
                  _buildDetailRow(
                      context, 'Pet', incident['petName'] as String),
                  _buildDetailRow(
                      context, 'Incident', incident['title'] as String),
                  _buildDetailRow(context, 'Date & Time', formattedDate),
                  _buildDetailRow(
                      context, 'Clinic', incident['clinic'] as String),
                  _buildDetailRow(
                      context, 'Status', incident['status'] as String),
                  if (incident['notes'] != null) ...[
                    SizedBox(height: 2.h),
                    Text(
                      'Notes:',
                      style: GoogleFonts.inter(
                        fontSize: 13.sp,
                        fontWeight: FontWeight.w600,
                        color: theme.brightness == Brightness.light
                            ? AppTheme.textPrimaryLight
                            : AppTheme.textPrimaryDark,
                      ),
                    ),
                    SizedBox(height: 1.h),
                    Text(
                      incident['notes'] as String,
                      style: GoogleFonts.inter(
                        fontSize: 13.sp,
                        fontWeight: FontWeight.w400,
                        color: theme.brightness == Brightness.light
                            ? AppTheme.textSecondaryLight
                            : AppTheme.textSecondaryDark,
                      ),
                    ),
                  ],
                  SizedBox(height: 3.h),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: () => Navigator.pop(context),
                      child: Text(
                        'Close',
                        style: GoogleFonts.inter(
                          fontSize: 13.sp,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDetailRow(BuildContext context, String label, String value) {
    final theme = Theme.of(context);

    return Padding(
      padding: EdgeInsets.only(bottom: 2.h),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: 25.w,
            child: Text(
              '$label:',
              style: GoogleFonts.inter(
                fontSize: 12.sp,
                fontWeight: FontWeight.w500,
                color: theme.brightness == Brightness.light
                    ? AppTheme.textSecondaryLight
                    : AppTheme.textSecondaryDark,
              ),
            ),
          ),
          Expanded(
            child: Text(
              value,
              style: GoogleFonts.inter(
                fontSize: 12.sp,
                fontWeight: FontWeight.w400,
                color: theme.brightness == Brightness.light
                    ? AppTheme.textPrimaryLight
                    : AppTheme.textPrimaryDark,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
