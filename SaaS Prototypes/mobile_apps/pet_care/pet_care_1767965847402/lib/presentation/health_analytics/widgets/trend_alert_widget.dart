import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../widgets/custom_icon_widget.dart';

class TrendAlertWidget extends StatelessWidget {
  final List<Map<String, dynamic>> alerts;

  const TrendAlertWidget({
    super.key,
    required this.alerts,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    if (alerts.isEmpty) {
      return const SizedBox.shrink();
    }

    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 2.w, vertical: 1.h),
            child: Text(
              'Health Alerts',
              style: theme.textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.w600,
                color: theme.brightness == Brightness.light
                    ? const Color(0xFF1B1F23)
                    : const Color(0xFFE8EAED),
              ),
            ),
          ),
          ...alerts.map((alert) =>
              _buildAlertCard(context, alert)),
        ],
      ),
    );
  }

  Widget _buildAlertCard(BuildContext context, Map<String, dynamic> alert) {
    final theme = Theme.of(context);
    final alertType = alert["type"] as String;
    final severity = alert["severity"] as String;

    Color alertColor;
    IconData alertIcon;

    switch (severity) {
      case 'high':
        alertColor = theme.brightness == Brightness.light
            ? const Color(0xFFD73A49)
            : const Color(0xFFFF6B7A);
        alertIcon = Icons.warning;
        break;
      case 'medium':
        alertColor = theme.brightness == Brightness.light
            ? const Color(0xFFF66A0A)
            : const Color(0xFFFF8A3D);
        alertIcon = Icons.info;
        break;
      case 'low':
      default:
        alertColor = theme.brightness == Brightness.light
            ? const Color(0xFF28A745)
            : const Color(0xFF4CAF50);
        alertIcon = Icons.check_circle;
        break;
    }

    return Container(
      margin: EdgeInsets.only(bottom: 1.h),
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: alertColor.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: alertColor.withValues(alpha: 0.3),
          width: 1,
        ),
      ),
      child: Row(
        children: [
          Container(
            width: 10.w,
            height: 10.w,
            decoration: BoxDecoration(
              color: alertColor.withValues(alpha: 0.2),
              shape: BoxShape.circle,
            ),
            child: Icon(
              alertIcon,
              color: alertColor,
              size: 20,
            ),
          ),
          SizedBox(width: 3.w),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  alert["title"] as String,
                  style: theme.textTheme.titleSmall?.copyWith(
                    fontWeight: FontWeight.w600,
                    color: theme.brightness == Brightness.light
                        ? const Color(0xFF1B1F23)
                        : const Color(0xFFE8EAED),
                  ),
                  overflow: TextOverflow.ellipsis,
                ),
                SizedBox(height: 0.5.h),
                Text(
                  alert["message"] as String,
                  style: theme.textTheme.bodySmall?.copyWith(
                    color: theme.brightness == Brightness.light
                        ? const Color(0xFF6A737D)
                        : const Color(0xFFADB5BD),
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
                SizedBox(height: 1.h),
                Text(
                  alert["timestamp"] as String,
                  style: theme.textTheme.bodySmall?.copyWith(
                    color: theme.brightness == Brightness.light
                        ? const Color(0xFF959DA5)
                        : const Color(0xFF6A737D),
                    fontSize: 10.sp,
                  ),
                ),
              ],
            ),
          ),
          GestureDetector(
            onTap: () => _dismissAlert(context, alert),
            child: Container(
              width: 8.w,
              height: 8.w,
              decoration: BoxDecoration(
                color: theme.brightness == Brightness.light
                    ? const Color(0xFFE1E4E8)
                    : const Color(0xFF30363D),
                shape: BoxShape.circle,
              ),
              child: CustomIconWidget(
                iconName: 'close',
                size: 16,
                color: theme.brightness == Brightness.light
                    ? const Color(0xFF6A737D)
                    : const Color(0xFFADB5BD),
              ),
            ),
          ),
        ],
      ),
    );
  }

  void _dismissAlert(BuildContext context, Map<String, dynamic> alert) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Alert dismissed: ${alert["title"]}'),
        duration: const Duration(seconds: 2),
      ),
    );
  }
}
