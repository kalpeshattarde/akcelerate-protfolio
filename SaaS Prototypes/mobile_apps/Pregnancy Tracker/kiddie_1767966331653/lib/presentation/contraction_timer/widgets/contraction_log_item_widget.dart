import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../widgets/custom_icon_widget.dart';

class ContractionLogItemWidget extends StatelessWidget {
  final Map<String, dynamic> contraction;
  final VoidCallback onDelete;
  final Function(int) onEdit;

  const ContractionLogItemWidget({
    super.key,
    required this.contraction,
    required this.onDelete,
    required this.onEdit,
  });

  String _formatTime(DateTime time) {
    return DateFormat('h:mm a').format(time);
  }

  String _formatDuration(Duration duration) {
    final minutes = duration.inMinutes;
    final seconds = duration.inSeconds.remainder(60);
    return '${minutes}m ${seconds}s';
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final startTime = contraction['startTime'] as DateTime;
    final duration = contraction['duration'] as Duration;
    final interval = contraction['interval'] as double?;
    final intensity = contraction['intensity'] as int?;

    return Container(
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: theme.colorScheme.outline.withValues(alpha: 0.2),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  CustomIconWidget(
                    iconName: 'access_time',
                    color: theme.colorScheme.primary,
                    size: 20,
                  ),
                  SizedBox(width: 2.w),
                  Text(
                    _formatTime(startTime),
                    style: theme.textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
              Row(
                children: [
                  if (intensity == null)
                    IconButton(
                      icon: CustomIconWidget(
                        iconName: 'edit_outlined',
                        color: theme.colorScheme.primary,
                        size: 20,
                      ),
                      onPressed: () {
                        _showIntensityDialog(context, theme);
                      },
                      tooltip: 'Add Intensity',
                    ),
                  IconButton(
                    icon: CustomIconWidget(
                      iconName: 'delete_outline',
                      color: theme.colorScheme.error,
                      size: 20,
                    ),
                    onPressed: () {
                      _showDeleteConfirmation(context, theme);
                    },
                    tooltip: 'Delete',
                  ),
                ],
              ),
            ],
          ),
          SizedBox(height: 2.h),
          Row(
            children: [
              Expanded(
                child: _buildInfoChip(
                  theme,
                  'Duration',
                  _formatDuration(duration),
                  Icons.timer_outlined,
                ),
              ),
              SizedBox(width: 3.w),
              if (interval != null)
                Expanded(
                  child: _buildInfoChip(
                    theme,
                    'Interval',
                    '${interval.toStringAsFixed(1)} min',
                    Icons.schedule_outlined,
                  ),
                ),
            ],
          ),
          if (intensity != null) ...[
            SizedBox(height: 2.h),
            _buildIntensityBar(theme, intensity),
          ],
        ],
      ),
    );
  }

  Widget _buildInfoChip(
    ThemeData theme,
    String label,
    String value,
    IconData icon,
  ) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.5.h),
      decoration: BoxDecoration(
        color: theme.colorScheme.primaryContainer.withValues(alpha: 0.3),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              CustomIconWidget(
                iconName: icon
                    .toString()
                    .split('.')
                    .last
                    .replaceAll('IconData(U+', '')
                    .replaceAll(')', ''),
                color: theme.colorScheme.onSurfaceVariant,
                size: 16,
              ),
              SizedBox(width: 1.w),
              Text(
                label,
                style: theme.textTheme.bodySmall?.copyWith(
                  color: theme.colorScheme.onSurfaceVariant,
                ),
              ),
            ],
          ),
          SizedBox(height: 0.5.h),
          Text(
            value,
            style: theme.textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildIntensityBar(ThemeData theme, int intensity) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'Intensity',
              style: theme.textTheme.bodyMedium?.copyWith(
                color: theme.colorScheme.onSurfaceVariant,
              ),
            ),
            Text(
              '$intensity/10',
              style: theme.textTheme.titleSmall?.copyWith(
                fontWeight: FontWeight.w600,
                color: theme.colorScheme.primary,
              ),
            ),
          ],
        ),
        SizedBox(height: 1.h),
        ClipRRect(
          borderRadius: BorderRadius.circular(4),
          child: LinearProgressIndicator(
            value: intensity / 10,
            minHeight: 8,
            backgroundColor: theme.colorScheme.outline.withValues(alpha: 0.2),
            valueColor: AlwaysStoppedAnimation<Color>(
              _getIntensityColor(theme, intensity),
            ),
          ),
        ),
      ],
    );
  }

  Color _getIntensityColor(ThemeData theme, int intensity) {
    if (intensity <= 3) {
      return Colors.green;
    } else if (intensity <= 6) {
      return Colors.orange;
    } else {
      return theme.colorScheme.error;
    }
  }

  void _showDeleteConfirmation(BuildContext context, ThemeData theme) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Delete Contraction?'),
        content: Text('This action cannot be undone.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              onDelete();
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: theme.colorScheme.error,
            ),
            child: Text('Delete'),
          ),
        ],
      ),
    );
  }

  void _showIntensityDialog(BuildContext context, ThemeData theme) {
    int selectedIntensity = 5;

    showDialog(
      context: context,
      builder: (context) {
        return StatefulBuilder(
          builder: (context, setDialogState) {
            return AlertDialog(
              title: Text('Add Intensity Rating'),
              content: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    'Rate the intensity of this contraction',
                    style: theme.textTheme.bodyMedium,
                  ),
                  SizedBox(height: 3.h),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text('1', style: theme.textTheme.bodySmall),
                      Expanded(
                        child: Slider(
                          value: selectedIntensity.toDouble(),
                          min: 1,
                          max: 10,
                          divisions: 9,
                          label: selectedIntensity.toString(),
                          onChanged: (value) {
                            setDialogState(() {
                              selectedIntensity = value.toInt();
                            });
                          },
                        ),
                      ),
                      Text('10', style: theme.textTheme.bodySmall),
                    ],
                  ),
                  Text(
                    'Intensity: $selectedIntensity',
                    style: theme.textTheme.titleMedium?.copyWith(
                      color: theme.colorScheme.primary,
                    ),
                  ),
                ],
              ),
              actions: [
                TextButton(
                  onPressed: () => Navigator.pop(context),
                  child: Text('Cancel'),
                ),
                ElevatedButton(
                  onPressed: () {
                    Navigator.pop(context);
                    onEdit(selectedIntensity);
                  },
                  child: Text('Save'),
                ),
              ],
            );
          },
        );
      },
    );
  }
}
