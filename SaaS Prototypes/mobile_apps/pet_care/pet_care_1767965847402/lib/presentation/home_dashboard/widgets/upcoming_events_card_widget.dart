import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../widgets/custom_icon_widget.dart';

class UpcomingEventsCardWidget extends StatelessWidget {
  final List<Map<String, dynamic>> events;
  final Function(Map<String, dynamic>) onEventTap;

  const UpcomingEventsCardWidget({
    super.key,
    required this.events,
    required this.onEventTap,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Container(
        width: double.infinity,
        padding: EdgeInsets.all(4.w),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Upcoming Events',
                  style: theme.textTheme.titleLarge?.copyWith(
                    fontWeight: FontWeight.w600,
                    color: theme.colorScheme.onSurface,
                  ),
                ),
                GestureDetector(
                  onTap: () =>
                      Navigator.pushNamed(context, '/veterinary-appointments'),
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
            SizedBox(height: 2.h),
            events.isEmpty
                ? _buildEmptyState(context)
                : ListView.separated(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: events.length > 3 ? 3 : events.length,
                    separatorBuilder: (context, index) =>
                        SizedBox(height: 1.5.h),
                    itemBuilder: (context, index) {
                      final event = events[index];
                      return _buildEventItem(context, event);
                    },
                  ),
          ],
        ),
      ),
    );
  }

  Widget _buildEmptyState(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      width: double.infinity,
      padding: EdgeInsets.symmetric(vertical: 3.h),
      child: Column(
        children: [
          CustomIconWidget(
            iconName: 'event_available',
            color: theme.colorScheme.primary.withValues(alpha: 0.5),
            size: 10.w,
          ),
          SizedBox(height: 1.5.h),
          Text(
            'No upcoming events',
            style: theme.textTheme.titleMedium?.copyWith(
              color: theme.colorScheme.onSurface.withValues(alpha: 0.7),
            ),
          ),
          SizedBox(height: 0.5.h),
          Text(
            'Schedule appointments and reminders',
            style: theme.textTheme.bodyMedium?.copyWith(
              color: theme.colorScheme.onSurface.withValues(alpha: 0.5),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildEventItem(BuildContext context, Map<String, dynamic> event) {
    final theme = Theme.of(context);
    final eventType = event['type'] as String;
    final isUrgent = event['isUrgent'] as bool? ?? false;

    return GestureDetector(
      onTap: () => onEventTap(event),
      child: Container(
        padding: EdgeInsets.all(3.w),
        decoration: BoxDecoration(
          color: isUrgent
              ? theme.colorScheme.error.withValues(alpha: 0.05)
              : theme.colorScheme.surface,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isUrgent
                ? theme.colorScheme.error.withValues(alpha: 0.3)
                : theme.colorScheme.outline.withValues(alpha: 0.2),
            width: 1,
          ),
        ),
        child: Row(
          children: [
            Container(
              padding: EdgeInsets.all(2.5.w),
              decoration: BoxDecoration(
                color:
                    _getEventTypeColor(eventType, theme).withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(10),
              ),
              child: CustomIconWidget(
                iconName: _getEventIcon(eventType),
                color: _getEventTypeColor(eventType, theme),
                size: 5.w,
              ),
            ),
            SizedBox(width: 3.w),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: Text(
                          event['title'] as String,
                          style: theme.textTheme.bodyLarge?.copyWith(
                            fontWeight: FontWeight.w500,
                            color: theme.colorScheme.onSurface,
                          ),
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                      if (isUrgent)
                        Container(
                          padding: EdgeInsets.symmetric(
                              horizontal: 1.5.w, vertical: 0.5.h),
                          decoration: BoxDecoration(
                            color: theme.colorScheme.error,
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Text(
                            'Urgent',
                            style: theme.textTheme.labelSmall?.copyWith(
                              color: Colors.white,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                    ],
                  ),
                  SizedBox(height: 0.5.h),
                  Row(
                    children: [
                      CustomIconWidget(
                        iconName: 'pets',
                        color:
                            theme.colorScheme.onSurface.withValues(alpha: 0.6),
                        size: 3.w,
                      ),
                      SizedBox(width: 1.w),
                      Text(
                        event['petName'] as String,
                        style: theme.textTheme.bodySmall?.copyWith(
                          color: theme.colorScheme.onSurface
                              .withValues(alpha: 0.6),
                        ),
                      ),
                      Text(
                        ' • ',
                        style: theme.textTheme.bodySmall?.copyWith(
                          color: theme.colorScheme.onSurface
                              .withValues(alpha: 0.4),
                        ),
                      ),
                      CustomIconWidget(
                        iconName: 'schedule',
                        color:
                            theme.colorScheme.onSurface.withValues(alpha: 0.6),
                        size: 3.w,
                      ),
                      SizedBox(width: 1.w),
                      Text(
                        event['dateTime'] as String,
                        style: theme.textTheme.bodySmall?.copyWith(
                          color: theme.colorScheme.onSurface
                              .withValues(alpha: 0.6),
                        ),
                      ),
                    ],
                  ),
                  if (event['location'] != null &&
                      (event['location'] as String).isNotEmpty) ...[
                    SizedBox(height: 0.5.h),
                    Row(
                      children: [
                        CustomIconWidget(
                          iconName: 'location_on',
                          color: theme.colorScheme.onSurface
                              .withValues(alpha: 0.6),
                          size: 3.w,
                        ),
                        SizedBox(width: 1.w),
                        Expanded(
                          child: Text(
                            event['location'] as String,
                            style: theme.textTheme.bodySmall?.copyWith(
                              color: theme.colorScheme.onSurface
                                  .withValues(alpha: 0.6),
                            ),
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                      ],
                    ),
                  ],
                ],
              ),
            ),
            CustomIconWidget(
              iconName: 'arrow_forward_ios',
              color: theme.colorScheme.onSurface.withValues(alpha: 0.4),
              size: 4.w,
            ),
          ],
        ),
      ),
    );
  }

  String _getEventIcon(String type) {
    switch (type.toLowerCase()) {
      case 'vet_appointment':
        return 'local_hospital';
      case 'vaccination':
        return 'vaccines';
      case 'grooming':
        return 'content_cut';
      case 'medication_refill':
        return 'medication';
      case 'checkup':
        return 'health_and_safety';
      case 'dental':
        return 'dental_care';
      default:
        return 'event';
    }
  }

  Color _getEventTypeColor(String type, ThemeData theme) {
    switch (type.toLowerCase()) {
      case 'vet_appointment':
        return const Color(0xFF9C27B0);
      case 'vaccination':
        return theme.colorScheme.error;
      case 'grooming':
        return theme.colorScheme.secondary;
      case 'medication_refill':
        return theme.colorScheme.tertiary;
      case 'checkup':
        return theme.colorScheme.primary;
      case 'dental':
        return const Color(0xFF00BCD4);
      default:
        return theme.colorScheme.onSurface;
    }
  }
}
