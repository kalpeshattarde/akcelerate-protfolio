import 'dart:convert';
import 'dart:io' if (dart.library.io) 'dart:io';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:path_provider/path_provider.dart';
import 'package:sizer/sizer.dart';
import 'package:universal_html/html.dart' as html;

import '../../../core/app_export.dart';

class ExportOptionsWidget extends StatelessWidget {
  final List<Map<String, dynamic>> selectedRecords;
  final VoidCallback onClose;

  const ExportOptionsWidget({
    Key? key,
    required this.selectedRecords,
    required this.onClose,
  }) : super(key: key);

  Future<void> _exportToPDF() async {
    try {
      final content = _generatePDFContent();
      await _downloadFile(
          content, 'baby_records_${DateTime.now().millisecondsSinceEpoch}.pdf');
    } catch (e) {
      // Handle error silently
    }
  }

  Future<void> _exportToCSV() async {
    try {
      final content = _generateCSVContent();
      await _downloadFile(
          content, 'baby_records_${DateTime.now().millisecondsSinceEpoch}.csv');
    } catch (e) {
      // Handle error silently
    }
  }

  Future<void> _exportToJSON() async {
    try {
      final content = _generateJSONContent();
      await _downloadFile(content,
          'baby_records_${DateTime.now().millisecondsSinceEpoch}.json');
    } catch (e) {
      // Handle error silently
    }
  }

  Future<void> _downloadFile(String content, String filename) async {
    if (kIsWeb) {
      final bytes = utf8.encode(content);
      final blob = html.Blob([bytes]);
      final url = html.Url.createObjectUrlFromBlob(blob);
      final anchor = html.AnchorElement(href: url)
        ..setAttribute("download", filename)
        ..click();
      html.Url.revokeObjectUrl(url);
    } else {
      final directory = await getApplicationDocumentsDirectory();
      final file = File('${directory.path}/$filename');
      await file.writeAsString(content);
    }
  }

  String _generatePDFContent() {
    final buffer = StringBuffer();
    buffer.writeln('BABY TRACKER PRO - HISTORICAL RECORDS REPORT');
    buffer.writeln('Generated on: ${DateTime.now().toString()}');
    buffer.writeln('Total Records: ${selectedRecords.length}');
    buffer.writeln('\n' + '=' * 50 + '\n');

    for (final record in selectedRecords) {
      final category = record['category'] as String? ?? 'General';
      final title = record['title'] as String? ?? 'Record';
      final timestamp = record['timestamp'] as DateTime? ?? DateTime.now();
      final description = record['description'] as String? ?? '';
      final value = record['value'] as String? ?? '';
      final unit = record['unit'] as String? ?? '';

      buffer.writeln('CATEGORY: $category');
      buffer.writeln('TITLE: $title');
      buffer.writeln(
          'DATE: ${timestamp.day}/${timestamp.month}/${timestamp.year}');
      buffer.writeln(
          'TIME: ${timestamp.hour.toString().padLeft(2, '0')}:${timestamp.minute.toString().padLeft(2, '0')}');

      if (value.isNotEmpty) {
        buffer.writeln('VALUE: $value $unit');
      }

      if (description.isNotEmpty) {
        buffer.writeln('DESCRIPTION: $description');
      }

      buffer.writeln('\n' + '-' * 30 + '\n');
    }

    return buffer.toString();
  }

  String _generateCSVContent() {
    final buffer = StringBuffer();
    buffer.writeln('Category,Title,Date,Time,Value,Unit,Description');

    for (final record in selectedRecords) {
      final category = record['category'] as String? ?? 'General';
      final title = record['title'] as String? ?? 'Record';
      final timestamp = record['timestamp'] as DateTime? ?? DateTime.now();
      final description = record['description'] as String? ?? '';
      final value = record['value'] as String? ?? '';
      final unit = record['unit'] as String? ?? '';

      final date = '${timestamp.day}/${timestamp.month}/${timestamp.year}';
      final time =
          '${timestamp.hour.toString().padLeft(2, '0')}:${timestamp.minute.toString().padLeft(2, '0')}';

      buffer.writeln(
          '"$category","$title","$date","$time","$value","$unit","${description.replaceAll('"', '""')}"');
    }

    return buffer.toString();
  }

  String _generateJSONContent() {
    final exportData = {
      'export_info': {
        'app_name': 'Baby Tracker Pro',
        'export_date': DateTime.now().toIso8601String(),
        'total_records': selectedRecords.length,
      },
      'records': selectedRecords
          .map((record) => {
                'category': record['category'] ?? 'General',
                'title': record['title'] ?? 'Record',
                'timestamp':
                    (record['timestamp'] as DateTime?)?.toIso8601String() ??
                        DateTime.now().toIso8601String(),
                'description': record['description'] ?? '',
                'value': record['value'] ?? '',
                'unit': record['unit'] ?? '',
                'has_photo': record['hasPhoto'] ?? false,
              })
          .toList(),
    };

    return const JsonEncoder.withIndent('  ').convert(exportData);
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(6.w),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Expanded(
                child: Text(
                  'Export Records',
                  style: AppTheme.lightTheme.textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.w600,
                    color: AppTheme.lightTheme.colorScheme.onSurface,
                  ),
                ),
              ),
              GestureDetector(
                onTap: onClose,
                child: Container(
                  padding: EdgeInsets.all(2.w),
                  decoration: BoxDecoration(
                    color: AppTheme.lightTheme.colorScheme.onSurfaceVariant
                        .withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: CustomIconWidget(
                    iconName: 'close',
                    size: 20,
                    color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                  ),
                ),
              ),
            ],
          ),
          SizedBox(height: 2.h),
          Text(
            '${selectedRecords.length} records selected for export',
            style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
            ),
          ),
          SizedBox(height: 3.h),
          _buildExportOption(
            icon: 'picture_as_pdf',
            title: 'PDF Report',
            description: 'Formatted report for pediatric visits',
            onTap: _exportToPDF,
          ),
          SizedBox(height: 2.h),
          _buildExportOption(
            icon: 'table_chart',
            title: 'CSV Spreadsheet',
            description: 'Data for analysis in Excel or Google Sheets',
            onTap: _exportToCSV,
          ),
          SizedBox(height: 2.h),
          _buildExportOption(
            icon: 'code',
            title: 'JSON Data',
            description: 'Raw data for backup or import',
            onTap: _exportToJSON,
          ),
          SizedBox(height: 4.h),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: onClose,
              child: Text('Cancel'),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildExportOption({
    required String icon,
    required String title,
    required String description,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: EdgeInsets.all(4.w),
        decoration: BoxDecoration(
          border: Border.all(
            color:
                AppTheme.lightTheme.colorScheme.outline.withValues(alpha: 0.3),
          ),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Row(
          children: [
            Container(
              padding: EdgeInsets.all(3.w),
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.colorScheme.primary
                    .withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(8),
              ),
              child: CustomIconWidget(
                iconName: icon,
                size: 24,
                color: AppTheme.lightTheme.colorScheme.primary,
              ),
            ),
            SizedBox(width: 4.w),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w600,
                      color: AppTheme.lightTheme.colorScheme.onSurface,
                    ),
                  ),
                  SizedBox(height: 0.5.h),
                  Text(
                    description,
                    style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                      color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                ],
              ),
            ),
            CustomIconWidget(
              iconName: 'chevron_right',
              size: 20,
              color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
            ),
          ],
        ),
      ),
    );
  }
}
