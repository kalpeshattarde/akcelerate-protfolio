import 'package:flutter/material.dart';

import '../../../core/app_export.dart';
import '../../../widgets/custom_icon_widget.dart';

/// Detailed view of appointment information
/// Shows all appointment details with action buttons
class AppointmentDetailModal extends StatelessWidget {
  final Map<String, dynamic> appointment;
  final VoidCallback onEdit;
  final VoidCallback onDelete;

  const AppointmentDetailModal({
    super.key,
    required this.appointment,
    required this.onEdit,
    required this.onDelete,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      decoration: BoxDecoration(
        color: theme.scaffoldBackgroundColor,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(20.0)),
      ),
      child: SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              margin: const EdgeInsets.only(top: 12),
              width: 40,
              height: 4,
              decoration: BoxDecoration(
                color:
                    theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.4),
                borderRadius: BorderRadius.circular(2.0),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(24),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Container(
                        width: 56,
                        height: 56,
                        decoration: BoxDecoration(
                          color: _getVisitTypeColor(
                                  theme, appointment['visitType'] as String)
                              .withValues(alpha: 0.2),
                          borderRadius: BorderRadius.circular(16.0),
                        ),
                        child: Center(
                          child: CustomIconWidget(
                            iconName: _getVisitTypeIcon(
                                appointment['visitType'] as String),
                            color: _getVisitTypeColor(
                                theme, appointment['visitType'] as String),
                            size: 28,
                          ),
                        ),
                      ),
                      const SizedBox(width: 16),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              appointment['visitType'] as String,
                              style: theme.textTheme.headlineSmall!.copyWith(
                                fontWeight: FontWeight.w600,
                              ),
                              maxLines: 2,
                              overflow: TextOverflow.ellipsis,
                            ),
                            const SizedBox(height: 4),
                            Text(
                              appointment['dateTime'] as String,
                              style: theme.textTheme.bodyLarge!.copyWith(
                                color: theme.colorScheme.onSurfaceVariant,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 24),
                  _buildDetailRow(
                    context,
                    'Provider',
                    appointment['provider'] as String,
                    'person',
                  ),
                  const SizedBox(height: 16),
                  _buildDetailRow(
                    context,
                    'Reminder',
                    appointment['reminder'] as String,
                    'notifications',
                  ),
                  if (appointment['notes'] != null &&
                      (appointment['notes'] as String).isNotEmpty) ...[
                    const SizedBox(height: 16),
                    _buildDetailRow(
                      context,
                      'Notes',
                      appointment['notes'] as String,
                      'notes',
                    ),
                  ],
                  const SizedBox(height: 32),
                  Row(
                    children: [
                      Expanded(
                        child: OutlinedButton.icon(
                          onPressed: () {
                            Navigator.pop(context);
                            onEdit();
                          },
                          icon: CustomIconWidget(
                            iconName: 'edit',
                            color: theme.colorScheme.primary,
                            size: 20,
                          ),
                          label: const Text('Edit'),
                        ),
                      ),
                      const SizedBox(width: 16),
                      Expanded(
                        child: ElevatedButton.icon(
                          onPressed: () {
                            Navigator.pop(context);
                            _showDeleteConfirmation(context);
                          },
                          icon: CustomIconWidget(
                            iconName: 'delete',
                            color: theme.colorScheme.onError,
                            size: 20,
                          ),
                          label: const Text('Delete'),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: theme.colorScheme.error,
                            foregroundColor: theme.colorScheme.onError,
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDetailRow(
      BuildContext context, String label, String value, String iconName) {
    final theme = Theme.of(context);

    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          width: 40,
          height: 40,
          decoration: BoxDecoration(
            color: theme.colorScheme.primary.withValues(alpha: 0.1),
            borderRadius: BorderRadius.circular(10.0),
          ),
          child: Center(
            child: CustomIconWidget(
              iconName: iconName,
              color: theme.colorScheme.primary,
              size: 20,
            ),
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                label,
                style: theme.textTheme.labelMedium!.copyWith(
                  color: theme.colorScheme.onSurfaceVariant,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                value,
                style: theme.textTheme.bodyLarge!.copyWith(
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  void _showDeleteConfirmation(BuildContext context) {
    final theme = Theme.of(context);

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Delete Appointment'),
        content: const Text(
            'Are you sure you want to delete this appointment? This action cannot be undone.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              onDelete();
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: theme.colorScheme.error,
              foregroundColor: theme.colorScheme.onError,
            ),
            child: const Text('Delete'),
          ),
        ],
      ),
    );
  }

  Color _getVisitTypeColor(ThemeData theme, String visitType) {
    switch (visitType.toLowerCase()) {
      case 'prenatal checkup':
        return theme.colorScheme.primary;
      case 'ultrasound':
        return theme.colorScheme.secondary;
      case 'blood test':
        return theme.colorScheme.tertiary;
      case 'specialist consultation':
        return theme.colorScheme.error;
      default:
        return theme.colorScheme.primary;
    }
  }

  String _getVisitTypeIcon(String visitType) {
    switch (visitType.toLowerCase()) {
      case 'prenatal checkup':
        return 'favorite';
      case 'ultrasound':
        return 'monitor_heart';
      case 'blood test':
        return 'bloodtype';
      case 'specialist consultation':
        return 'medical_services';
      default:
        return 'event';
    }
  }
}
