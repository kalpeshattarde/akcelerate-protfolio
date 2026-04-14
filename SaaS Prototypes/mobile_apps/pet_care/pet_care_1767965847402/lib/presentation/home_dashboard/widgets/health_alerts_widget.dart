import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../widgets/custom_icon_widget.dart';

class HealthAlertsWidget extends StatelessWidget {
  final List<Map<String, dynamic>> alerts;
  final Function(Map<String, dynamic>) onAlertTap;
  final Function(int) onAlertDismiss;

  const HealthAlertsWidget({
    super.key,
    required this.alerts,
    required this.onAlertTap,
    required this.onAlertDismiss,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    if (alerts.isEmpty) return const SizedBox.shrink();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: EdgeInsets.symmetric(horizontal: 4.w),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  Text(
                    'Health Alerts',
                    style: theme.textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.w600,
                      color: theme.colorScheme.onSurface,
                    ),
                  ),
                  SizedBox(width: 2.w),
                  Container(
                    padding:
                        EdgeInsets.symmetric(horizontal: 2.w, vertical: 0.5.h),
                    decoration: BoxDecoration(
                      color: theme.colorScheme.error.withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      '${alerts.length}',
                      style: theme.textTheme.labelMedium?.copyWith(
                        color: theme.colorScheme.error,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ],
              ),
              GestureDetector(
                onTap: () => Navigator.pushNamed(context, '/health-analytics'),
                child: Text(
                  'View All',
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: theme.colorScheme.primary,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
            ],
          ),
        ),
        SizedBox(height: 2.h),
        SizedBox(
          height: 16.h,
          child: ListView.separated(
            scrollDirection: Axis.horizontal,
            padding: EdgeInsets.symmetric(horizontal: 4.w),
            itemCount: alerts.length,
            separatorBuilder: (context, index) => SizedBox(width: 3.w),
            itemBuilder: (context, index) {
              final alert = alerts[index];
              return _buildAlertCard(context, alert, index);
            },
          ),
        ),
      ],
    );
  }

  Widget _buildAlertCard(
      BuildContext context, Map<String, dynamic> alert, int index) {
    final theme = Theme.of(context);
    final severity = alert['severity'] as String;
    final alertColor = _getAlertColor(severity, theme);

    return GestureDetector(
      onTap: () => onAlertTap(alert),
      child: Container(
        width: 70.w,
        padding: EdgeInsets.all(3.w),
        decoration: BoxDecoration(
          color: alertColor.withValues(alpha: 0.05),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: alertColor.withValues(alpha: 0.3),
            width: 1,
          ),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Container(
                  padding: EdgeInsets.all(2.w),
                  decoration: BoxDecoration(
                    color: alertColor.withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: CustomIconWidget(
                    iconName: _getAlertIcon(alert['type'] as String),
                    color: alertColor,
                    size: 4.w,
                  ),
                ),
                SizedBox(width: 2.w),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        alert['title'] as String,
                        style: theme.textTheme.titleSmall?.copyWith(
                          fontWeight: FontWeight.w600,
                          color: theme.colorScheme.onSurface,
                        ),
                        overflow: TextOverflow.ellipsis,
                      ),
                      Text(
                        alert['petName'] as String,
                        style: theme.textTheme.bodySmall?.copyWith(
                          color: theme.colorScheme.onSurface
                              .withValues(alpha: 0.6),
                        ),
                      ),
                    ],
                  ),
                ),
                GestureDetector(
                  onTap: () => onAlertDismiss(index),
                  child: Container(
                    padding: EdgeInsets.all(1.w),
                    child: CustomIconWidget(
                      iconName: 'close',
                      color: theme.colorScheme.onSurface.withValues(alpha: 0.4),
                      size: 4.w,
                    ),
                  ),
                ),
              ],
            ),
            SizedBox(height: 1.5.h),
            Text(
              alert['description'] as String,
              style: theme.textTheme.bodyMedium?.copyWith(
                color: theme.colorScheme.onSurface.withValues(alpha: 0.8),
              ),
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
            ),
            const Spacer(),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Container(
                  padding:
                      EdgeInsets.symmetric(horizontal: 2.w, vertical: 0.5.h),
                  decoration: BoxDecoration(
                    color: alertColor.withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    _getSeverityText(severity),
                    style: theme.textTheme.labelSmall?.copyWith(
                      color: alertColor,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
                Text(
                  alert['timeAgo'] as String,
                  style: theme.textTheme.bodySmall?.copyWith(
                    color: theme.colorScheme.onSurface.withValues(alpha: 0.5),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  String _getAlertIcon(String type) {
    switch (type.toLowerCase()) {
      case 'vaccination_overdue':
        return 'vaccines';
      case 'medication_refill':
        return 'medication';
      case 'weight_change':
        return 'monitor_weight';
      case 'symptom_alert':
        return 'warning';
      case 'appointment_reminder':
        return 'event';
      case 'health_decline':
        return 'trending_down';
      default:
        return 'notification_important';
    }
  }

  Color _getAlertColor(String severity, ThemeData theme) {
    switch (severity.toLowerCase()) {
      case 'critical':
        return theme.colorScheme.error;
      case 'high':
        return const Color(0xFFFF9800);
      case 'medium':
        return theme.colorScheme.tertiary;
      case 'low':
        return theme.colorScheme.primary;
      default:
        return theme.colorScheme.onSurface;
    }
  }

  String _getSeverityText(String severity) {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'Critical';
      case 'high':
        return 'High Priority';
      case 'medium':
        return 'Medium';
      case 'low':
        return 'Low Priority';
      default:
        return 'Alert';
    }
  }
}
