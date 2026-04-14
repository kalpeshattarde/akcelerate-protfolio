import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:share_plus/share_plus.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../widgets/custom_icon_widget.dart';

class ExportDialogWidget extends StatelessWidget {
  final List<Map<String, dynamic>> contractionLog;
  final double averageDuration;
  final double averageInterval;

  const ExportDialogWidget({
    super.key,
    required this.contractionLog,
    required this.averageDuration,
    required this.averageInterval,
  });

  String _generateExportText() {
    final buffer = StringBuffer();
    buffer.writeln('Contraction Timer Report');
    buffer.writeln(
        'Generated: ${DateFormat('MMM dd, yyyy h:mm a').format(DateTime.now())}');
    buffer.writeln('');
    buffer.writeln('Summary:');
    buffer.writeln('Total Contractions: ${contractionLog.length}');
    buffer.writeln(
        'Average Duration: ${averageDuration.toStringAsFixed(1)} minutes');
    buffer.writeln(
        'Average Interval: ${averageInterval > 0 ? '${averageInterval.toStringAsFixed(1)} minutes' : 'N/A'}');
    buffer.writeln('');
    buffer.writeln('Detailed Log:');
    buffer.writeln('Time | Duration | Interval | Intensity');
    buffer.writeln('----------------------------------------');

    for (final contraction in contractionLog.reversed) {
      final startTime = contraction['startTime'] as DateTime;
      final duration = contraction['duration'] as Duration;
      final interval = contraction['interval'] as double?;
      final intensity = contraction['intensity'] as int?;

      buffer.writeln(
        '${DateFormat('h:mm a').format(startTime)} | '
        '${duration.inMinutes}m ${duration.inSeconds.remainder(60)}s | '
        '${interval != null ? '${interval.toStringAsFixed(1)}m' : 'N/A'} | '
        '${intensity ?? 'N/A'}',
      );
    }

    return buffer.toString();
  }

  String _generateCSV() {
    final buffer = StringBuffer();
    buffer.writeln('Time,Duration (seconds),Interval (minutes),Intensity');

    for (final contraction in contractionLog.reversed) {
      final startTime = contraction['startTime'] as DateTime;
      final duration = contraction['duration'] as Duration;
      final interval = contraction['interval'] as double?;
      final intensity = contraction['intensity'] as int?;

      buffer.writeln(
        '${DateFormat('yyyy-MM-dd HH:mm:ss').format(startTime)},'
        '${duration.inSeconds},'
        '${interval?.toStringAsFixed(2) ?? ''},'
        '${intensity ?? ''}',
      );
    }

    return buffer.toString();
  }

  Future<void> _shareData(String format) async {
    final data = format == 'text' ? _generateExportText() : _generateCSV();
    final fileName =
        'contraction_log_${DateFormat('yyyyMMdd_HHmmss').format(DateTime.now())}';

    await Share.share(
      data,
      subject: 'Contraction Timer Report',
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return AlertDialog(
      title: Row(
        children: [
          CustomIconWidget(
            iconName: 'file_download',
            color: theme.colorScheme.primary,
            size: 24,
          ),
          SizedBox(width: 2.w),
          Text('Export Contraction Data'),
        ],
      ),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Text(
            'Choose export format to share with your healthcare provider:',
            style: theme.textTheme.bodyMedium,
          ),
          SizedBox(height: 3.h),
          _buildExportOption(
            context,
            theme,
            'Text Report',
            'Human-readable summary with detailed log',
            Icons.description_outlined,
            () => _shareData('text'),
          ),
          SizedBox(height: 2.h),
          _buildExportOption(
            context,
            theme,
            'CSV File',
            'Spreadsheet format for data analysis',
            Icons.table_chart_outlined,
            () => _shareData('csv'),
          ),
        ],
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(context),
          child: Text('Cancel'),
        ),
      ],
    );
  }

  Widget _buildExportOption(
    BuildContext context,
    ThemeData theme,
    String title,
    String description,
    IconData icon,
    VoidCallback onTap,
  ) {
    return InkWell(
      onTap: () {
        Navigator.pop(context);
        onTap();
      },
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: EdgeInsets.all(4.w),
        decoration: BoxDecoration(
          border: Border.all(
            color: theme.colorScheme.outline.withValues(alpha: 0.3),
          ),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Row(
          children: [
            Container(
              padding: EdgeInsets.all(3.w),
              decoration: BoxDecoration(
                color:
                    theme.colorScheme.primaryContainer.withValues(alpha: 0.3),
                borderRadius: BorderRadius.circular(8),
              ),
              child: CustomIconWidget(
                iconName: icon
                    .toString()
                    .split('.')
                    .last
                    .replaceAll('IconData(U+', '')
                    .replaceAll(')', ''),
                color: theme.colorScheme.primary,
                size: 24,
              ),
            ),
            SizedBox(width: 3.w),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: theme.textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  SizedBox(height: 0.5.h),
                  Text(
                    description,
                    style: theme.textTheme.bodySmall?.copyWith(
                      color: theme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                ],
              ),
            ),
            CustomIconWidget(
              iconName: 'arrow_forward_ios',
              color: theme.colorScheme.onSurfaceVariant,
              size: 16,
            ),
          ],
        ),
      ),
    );
  }
}
