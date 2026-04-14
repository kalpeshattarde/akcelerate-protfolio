import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class RecentFeedingListWidget extends StatelessWidget {
  final List<Map<String, dynamic>> feedingEntries;
  final Function(Map<String, dynamic>) onEditEntry;
  final Function(Map<String, dynamic>) onDeleteEntry;

  const RecentFeedingListWidget({
    Key? key,
    required this.feedingEntries,
    required this.onEditEntry,
    required this.onDeleteEntry,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
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
          Padding(
            padding: EdgeInsets.all(4.w),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Recent Feedings',
                  style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),
                Text(
                  '${feedingEntries.length} entries',
                  style: AppTheme.lightTheme.textTheme.labelMedium?.copyWith(
                    color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                  ),
                ),
              ],
            ),
          ),
          feedingEntries.isEmpty ? _buildEmptyState() : _buildFeedingList(),
        ],
      ),
    );
  }

  Widget _buildEmptyState() {
    return Padding(
      padding: EdgeInsets.all(4.w),
      child: Column(
        children: [
          CustomIconWidget(
            iconName: 'restaurant',
            color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
            size: 48,
          ),
          SizedBox(height: 2.h),
          Text(
            'No feeding entries yet',
            style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
            ),
          ),
          SizedBox(height: 1.h),
          Text(
            'Start tracking your baby\'s feeding sessions',
            style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
            ),
            textAlign: TextAlign.center,
          ),
          SizedBox(height: 2.h),
        ],
      ),
    );
  }

  Widget _buildFeedingList() {
    return ListView.separated(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      itemCount: feedingEntries.length,
      separatorBuilder: (context, index) => Divider(
        height: 1,
        color: AppTheme.lightTheme.colorScheme.outline.withValues(alpha: 0.2),
      ),
      itemBuilder: (context, index) {
        final entry = feedingEntries[index];
        return _buildFeedingEntry(entry);
      },
    );
  }

  Widget _buildFeedingEntry(Map<String, dynamic> entry) {
    final String type = entry['type'] as String;
    final DateTime timestamp = entry['timestamp'] as DateTime;
    final String timeString = _formatTime(timestamp);
    final String dateString = _formatDate(timestamp);

    return Dismissible(
      key: Key(entry['id'].toString()),
      direction: DismissDirection.endToStart,
      background: Container(
        alignment: Alignment.centerRight,
        padding: EdgeInsets.only(right: 4.w),
        color: AppTheme.lightTheme.colorScheme.error,
        child: CustomIconWidget(
          iconName: 'delete',
          color: Colors.white,
          size: 24,
        ),
      ),
      onDismissed: (direction) => onDeleteEntry(entry),
      child: InkWell(
        onTap: () => onEditEntry(entry),
        onLongPress: () => _showEntryDetails(entry),
        child: Padding(
          padding: EdgeInsets.all(4.w),
          child: Row(
            children: [
              _buildTypeIcon(type),
              SizedBox(width: 3.w),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          _getTypeDisplayName(type),
                          style: AppTheme.lightTheme.textTheme.titleSmall
                              ?.copyWith(
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        Text(
                          timeString,
                          style: AppTheme.lightTheme.textTheme.labelMedium
                              ?.copyWith(
                            color: AppTheme
                                .lightTheme.colorScheme.onSurfaceVariant,
                          ),
                        ),
                      ],
                    ),
                    SizedBox(height: 0.5.h),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          _getEntryDetails(entry),
                          style: AppTheme.lightTheme.textTheme.bodyMedium
                              ?.copyWith(
                            color: AppTheme
                                .lightTheme.colorScheme.onSurfaceVariant,
                          ),
                        ),
                        Text(
                          dateString,
                          style: AppTheme.lightTheme.textTheme.labelSmall
                              ?.copyWith(
                            color: AppTheme
                                .lightTheme.colorScheme.onSurfaceVariant,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              SizedBox(width: 2.w),
              CustomIconWidget(
                iconName: 'chevron_right',
                color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                size: 20,
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildTypeIcon(String type) {
    Color color;
    String iconName;

    switch (type) {
      case 'breastfeeding':
        color = AppTheme.lightTheme.colorScheme.primary;
        iconName = 'favorite';
        break;
      case 'bottle':
        color = AppTheme.lightTheme.colorScheme.secondary;
        iconName = 'local_drink';
        break;
      case 'solids':
        color = AppTheme.lightTheme.colorScheme.tertiary;
        iconName = 'restaurant';
        break;
      default:
        color = AppTheme.lightTheme.colorScheme.onSurface;
        iconName = 'restaurant';
    }

    return Container(
      padding: EdgeInsets.all(2.w),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(8),
      ),
      child: CustomIconWidget(
        iconName: iconName,
        color: color,
        size: 20,
      ),
    );
  }

  String _getTypeDisplayName(String type) {
    switch (type) {
      case 'breastfeeding':
        return 'Breastfeeding';
      case 'bottle':
        return 'Bottle';
      case 'solids':
        return 'Solids';
      default:
        return 'Feeding';
    }
  }

  String _getEntryDetails(Map<String, dynamic> entry) {
    final String type = entry['type'] as String;

    switch (type) {
      case 'breastfeeding':
        final Duration? duration = entry['duration'] as Duration?;
        final String? side = entry['side'] as String?;
        String details = '';
        if (duration != null) {
          details += '${duration.inMinutes}m';
        }
        if (side != null) {
          details += details.isNotEmpty ? ' • $side side' : '$side side';
        }
        return details.isNotEmpty ? details : 'No details';

      case 'bottle':
        final double? amount = entry['amount'] as double?;
        final String? unit = entry['unit'] as String?;
        final String? bottleType = entry['bottleType'] as String?;
        String details = '';
        if (amount != null && unit != null) {
          details += '${amount.toStringAsFixed(1)} $unit';
        }
        if (bottleType != null) {
          final displayType =
              bottleType == 'breast_milk' ? 'Breast milk' : 'Formula';
          details += details.isNotEmpty ? ' • $displayType' : displayType;
        }
        return details.isNotEmpty ? details : 'No details';

      case 'solids':
        final String? description = entry['description'] as String?;
        return description ?? 'Solid food';

      default:
        return 'No details';
    }
  }

  String _formatTime(DateTime dateTime) {
    final int hour = dateTime.hour;
    final int minute = dateTime.minute;
    final String period = hour >= 12 ? 'PM' : 'AM';
    final int displayHour = hour == 0 ? 12 : (hour > 12 ? hour - 12 : hour);
    return '${displayHour.toString().padLeft(2, '0')}:${minute.toString().padLeft(2, '0')} $period';
  }

  String _formatDate(DateTime dateTime) {
    final DateTime now = DateTime.now();
    final DateTime today = DateTime(now.year, now.month, now.day);
    final DateTime yesterday = today.subtract(const Duration(days: 1));
    final DateTime entryDate =
        DateTime(dateTime.year, dateTime.month, dateTime.day);

    if (entryDate == today) {
      return 'Today';
    } else if (entryDate == yesterday) {
      return 'Yesterday';
    } else {
      return '${dateTime.month}/${dateTime.day}/${dateTime.year}';
    }
  }

  void _showEntryDetails(Map<String, dynamic> entry) {
    // This would typically show a detailed view or bottom sheet
    // For now, we'll just trigger the edit callback
    onEditEntry(entry);
  }
}
