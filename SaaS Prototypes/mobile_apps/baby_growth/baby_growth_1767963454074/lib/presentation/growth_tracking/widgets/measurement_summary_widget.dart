import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class MeasurementSummaryWidget extends StatelessWidget {
  final List<Map<String, dynamic>> measurements;

  const MeasurementSummaryWidget({
    Key? key,
    required this.measurements,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: AppTheme.lightTheme.colorScheme.shadow,
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Latest Measurements',
            style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.w600,
            ),
          ),
          SizedBox(height: 3.h),
          Row(
            children: [
              Expanded(
                  child: _buildMeasurementCard(
                      'Weight', 'weight', 'monitor_weight')),
              SizedBox(width: 3.w),
              Expanded(
                  child: _buildMeasurementCard('Height', 'height', 'height')),
              SizedBox(width: 3.w),
              Expanded(child: _buildMeasurementCard('Head', 'head', 'face')),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildMeasurementCard(String title, String type, String iconName) {
    final latestMeasurement = _getLatestMeasurement(type);
    final previousMeasurement = _getPreviousMeasurement(type);
    final hasData = latestMeasurement != null;
    final hasGrowth = hasData && previousMeasurement != null;

    return Container(
      padding: EdgeInsets.all(3.w),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.primaryContainer
            .withValues(alpha: 0.3),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: AppTheme.lightTheme.colorScheme.primary.withValues(alpha: 0.2),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              CustomIconWidget(
                iconName: iconName,
                color: AppTheme.lightTheme.colorScheme.primary,
                size: 20,
              ),
              SizedBox(width: 1.w),
              Expanded(
                child: Text(
                  title,
                  style: AppTheme.lightTheme.textTheme.labelMedium?.copyWith(
                    color: AppTheme.lightTheme.colorScheme.primary,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ],
          ),
          SizedBox(height: 2.h),
          if (hasData) ...[
            Text(
              _formatValue(latestMeasurement['value'], type),
              style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.w700,
              ),
            ),
            SizedBox(height: 1.h),
            if (hasGrowth)
              _buildGrowthIndicator(
                  latestMeasurement, previousMeasurement, type),
            SizedBox(height: 1.h),
            Text(
              _formatDate(latestMeasurement['date']),
              style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
              ),
            ),
          ] else ...[
            Text(
              'No data',
              style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
              ),
            ),
            SizedBox(height: 1.h),
            Text(
              'Add first measurement',
              style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildGrowthIndicator(
      Map<String, dynamic> latest, Map<String, dynamic> previous, String type) {
    final latestValue = (latest['value'] as num).toDouble();
    final previousValue = (previous['value'] as num).toDouble();
    final growth = latestValue - previousValue;
    final isPositive = growth > 0;
    final isNeutral = growth == 0;

    return Row(
      children: [
        CustomIconWidget(
          iconName: isNeutral
              ? 'remove'
              : (isPositive ? 'trending_up' : 'trending_down'),
          color: isNeutral
              ? AppTheme.lightTheme.colorScheme.onSurfaceVariant
              : (isPositive
                  ? AppTheme.getSuccessColor(true)
                  : AppTheme.getWarningColor(true)),
          size: 16,
        ),
        SizedBox(width: 1.w),
        Expanded(
          child: Text(
            isNeutral
                ? 'No change'
                : '${isPositive ? '+' : ''}${_formatGrowthValue(growth, type)}',
            style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
              color: isNeutral
                  ? AppTheme.lightTheme.colorScheme.onSurfaceVariant
                  : (isPositive
                      ? AppTheme.getSuccessColor(true)
                      : AppTheme.getWarningColor(true)),
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
      ],
    );
  }

  Map<String, dynamic>? _getLatestMeasurement(String type) {
    final filtered = measurements.where((m) => m['type'] == type).toList()
      ..sort((a, b) =>
          DateTime.parse(b['date']).compareTo(DateTime.parse(a['date'])));

    return filtered.isNotEmpty ? filtered.first : null;
  }

  Map<String, dynamic>? _getPreviousMeasurement(String type) {
    final filtered = measurements.where((m) => m['type'] == type).toList()
      ..sort((a, b) =>
          DateTime.parse(b['date']).compareTo(DateTime.parse(a['date'])));

    return filtered.length > 1 ? filtered[1] : null;
  }

  String _formatValue(dynamic value, String type) {
    final numValue = (value as num).toDouble();
    switch (type) {
      case 'weight':
        return '${numValue.toStringAsFixed(1)} lbs';
      case 'height':
        return '${numValue.toStringAsFixed(1)}"';
      case 'head':
        return '${numValue.toStringAsFixed(1)}"';
      default:
        return numValue.toStringAsFixed(1);
    }
  }

  String _formatGrowthValue(double growth, String type) {
    switch (type) {
      case 'weight':
        return '${growth.toStringAsFixed(1)} lbs';
      case 'height':
        return '${growth.toStringAsFixed(1)}"';
      case 'head':
        return '${growth.toStringAsFixed(1)}"';
      default:
        return growth.toStringAsFixed(1);
    }
  }

  String _formatDate(String dateStr) {
    final date = DateTime.parse(dateStr);
    final now = DateTime.now();
    final difference = now.difference(date).inDays;

    if (difference == 0) {
      return 'Today';
    } else if (difference == 1) {
      return 'Yesterday';
    } else if (difference < 7) {
      return '$difference days ago';
    } else {
      return '${date.month}/${date.day}/${date.year}';
    }
  }
}
