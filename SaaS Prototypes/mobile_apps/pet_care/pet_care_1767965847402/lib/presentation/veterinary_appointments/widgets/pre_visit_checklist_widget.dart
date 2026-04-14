import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../widgets/custom_icon_widget.dart';

class PreVisitChecklistWidget extends StatefulWidget {
  final Map<String, dynamic> appointment;
  final VoidCallback? onClose;

  const PreVisitChecklistWidget({
    super.key,
    required this.appointment,
    this.onClose,
  });

  @override
  State<PreVisitChecklistWidget> createState() =>
      _PreVisitChecklistWidgetState();
}

class _PreVisitChecklistWidgetState extends State<PreVisitChecklistWidget> {
  final Map<String, bool> _checklistItems = {
    'Bring vaccination records': false,
    'Bring previous medical records': false,
    'List current medications': false,
    'Note any symptoms or concerns': false,
    'Prepare questions for the vet': false,
    'Bring pet carrier (for cats)': false,
    'Bring leash and collar': false,
    'Fast pet if required (check with clinic)': false,
    'Bring insurance information': false,
    'Arrive 15 minutes early': false,
  };

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final completedItems = _checklistItems.values.where((item) => item).length;
    final totalItems = _checklistItems.length;
    final progress = completedItems / totalItems;

    return Container(
      height: 85.h,
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
      ),
      child: Column(
        children: [
          _buildHeader(theme),
          _buildAppointmentInfo(theme),
          _buildProgressSection(theme, progress, completedItems, totalItems),
          Expanded(
            child: _buildChecklistItems(theme),
          ),
          _buildFooter(theme, progress),
        ],
      ),
    );
  }

  Widget _buildHeader(ThemeData theme) {
    return Container(
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        border: Border(
          bottom: BorderSide(
            color: theme.brightness == Brightness.light
                ? const Color(0xFFE1E4E8)
                : const Color(0xFF30363D),
            width: 1,
          ),
        ),
      ),
      child: Row(
        children: [
          GestureDetector(
            onTap: widget.onClose,
            child: Container(
              padding: EdgeInsets.all(2.w),
              decoration: BoxDecoration(
                color: theme.brightness == Brightness.light
                    ? const Color(0xFF6A737D).withValues(alpha: 0.1)
                    : const Color(0xFFADB5BD).withValues(alpha: 0.2),
                borderRadius: BorderRadius.circular(8),
              ),
              child: CustomIconWidget(
                iconName: 'close',
                color: theme.brightness == Brightness.light
                    ? const Color(0xFF6A737D)
                    : const Color(0xFFADB5BD),
                size: 20,
              ),
            ),
          ),
          SizedBox(width: 4.w),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Pre-Visit Checklist',
                  style: theme.textTheme.titleLarge?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),
                Text(
                  'Prepare for your upcoming appointment',
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: theme.brightness == Brightness.light
                        ? const Color(0xFF6A737D)
                        : const Color(0xFFADB5BD),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAppointmentInfo(ThemeData theme) {
    return Container(
      margin: EdgeInsets.all(4.w),
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: theme.brightness == Brightness.light
            ? const Color(0xFF2B5F75).withValues(alpha: 0.05)
            : const Color(0xFF4A8BA3).withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: theme.brightness == Brightness.light
              ? const Color(0xFF2B5F75).withValues(alpha: 0.2)
              : const Color(0xFF4A8BA3).withValues(alpha: 0.3),
        ),
      ),
      child: Row(
        children: [
          Container(
            width: 15.w,
            height: 15.w,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(8),
              image: DecorationImage(
                image: NetworkImage(widget.appointment['petPhoto'] as String),
                fit: BoxFit.cover,
              ),
            ),
          ),
          SizedBox(width: 4.w),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  '${widget.appointment['petName']} - ${widget.appointment['appointmentType']}',
                  style: theme.textTheme.titleSmall?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                  overflow: TextOverflow.ellipsis,
                ),
                SizedBox(height: 1.h),
                Row(
                  children: [
                    CustomIconWidget(
                      iconName: 'local_hospital',
                      color: theme.brightness == Brightness.light
                          ? const Color(0xFF2B5F75)
                          : const Color(0xFF4A8BA3),
                      size: 16,
                    ),
                    SizedBox(width: 1.w),
                    Expanded(
                      child: Text(
                        widget.appointment['clinicName'] as String,
                        style: theme.textTheme.bodySmall?.copyWith(
                          color: theme.brightness == Brightness.light
                              ? const Color(0xFF2B5F75)
                              : const Color(0xFF4A8BA3),
                        ),
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                  ],
                ),
                SizedBox(height: 0.5.h),
                Row(
                  children: [
                    CustomIconWidget(
                      iconName: 'schedule',
                      color: theme.brightness == Brightness.light
                          ? const Color(0xFF6A737D)
                          : const Color(0xFFADB5BD),
                      size: 16,
                    ),
                    SizedBox(width: 1.w),
                    Text(
                      '${widget.appointment['date']} at ${widget.appointment['time']}',
                      style: theme.textTheme.bodySmall?.copyWith(
                        color: theme.brightness == Brightness.light
                            ? const Color(0xFF6A737D)
                            : const Color(0xFFADB5BD),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildProgressSection(
      ThemeData theme, double progress, int completed, int total) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w),
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: theme.brightness == Brightness.light
            ? const Color(0xFF7BA05B).withValues(alpha: 0.05)
            : const Color(0xFF9BC474).withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Preparation Progress',
                style: theme.textTheme.titleSmall?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
              Text(
                '$completed/$total completed',
                style: theme.textTheme.bodyMedium?.copyWith(
                  color: theme.brightness == Brightness.light
                      ? const Color(0xFF7BA05B)
                      : const Color(0xFF9BC474),
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
          SizedBox(height: 2.h),
          LinearProgressIndicator(
            value: progress,
            backgroundColor: theme.brightness == Brightness.light
                ? const Color(0xFFE1E4E8)
                : const Color(0xFF30363D),
            valueColor: AlwaysStoppedAnimation<Color>(
              theme.brightness == Brightness.light
                  ? const Color(0xFF7BA05B)
                  : const Color(0xFF9BC474),
            ),
            minHeight: 8,
          ),
        ],
      ),
    );
  }

  Widget _buildChecklistItems(ThemeData theme) {
    return ListView.builder(
      padding: EdgeInsets.all(4.w),
      itemCount: _checklistItems.length,
      itemBuilder: (context, index) {
        final item = _checklistItems.keys.elementAt(index);
        final isChecked = _checklistItems[item] ?? false;

        return Container(
          margin: EdgeInsets.only(bottom: 2.h),
          decoration: BoxDecoration(
            color: isChecked
                ? (theme.brightness == Brightness.light
                    ? const Color(0xFF7BA05B).withValues(alpha: 0.1)
                    : const Color(0xFF9BC474).withValues(alpha: 0.2))
                : theme.colorScheme.surface,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: isChecked
                  ? (theme.brightness == Brightness.light
                      ? const Color(0xFF7BA05B)
                      : const Color(0xFF9BC474))
                  : (theme.brightness == Brightness.light
                      ? const Color(0xFFE1E4E8)
                      : const Color(0xFF30363D)),
              width: isChecked ? 2 : 1,
            ),
          ),
          child: Material(
            color: Colors.transparent,
            child: InkWell(
              onTap: () => setState(() => _checklistItems[item] = !isChecked),
              borderRadius: BorderRadius.circular(12),
              child: Padding(
                padding: EdgeInsets.all(4.w),
                child: Row(
                  children: [
                    Container(
                      width: 6.w,
                      height: 6.w,
                      decoration: BoxDecoration(
                        color: isChecked
                            ? (theme.brightness == Brightness.light
                                ? const Color(0xFF7BA05B)
                                : const Color(0xFF9BC474))
                            : Colors.transparent,
                        border: Border.all(
                          color: isChecked
                              ? (theme.brightness == Brightness.light
                                  ? const Color(0xFF7BA05B)
                                  : const Color(0xFF9BC474))
                              : (theme.brightness == Brightness.light
                                  ? const Color(0xFFE1E4E8)
                                  : const Color(0xFF30363D)),
                          width: 2,
                        ),
                        borderRadius: BorderRadius.circular(4),
                      ),
                      child: isChecked
                          ? CustomIconWidget(
                              iconName: 'check',
                              color: Colors.white,
                              size: 16,
                            )
                          : null,
                    ),
                    SizedBox(width: 4.w),
                    Expanded(
                      child: Text(
                        item,
                        style: theme.textTheme.bodyMedium?.copyWith(
                          decoration:
                              isChecked ? TextDecoration.lineThrough : null,
                          color: isChecked
                              ? (theme.brightness == Brightness.light
                                  ? const Color(0xFF6A737D)
                                  : const Color(0xFFADB5BD))
                              : null,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildFooter(ThemeData theme, double progress) {
    return Container(
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        border: Border(
          top: BorderSide(
            color: theme.brightness == Brightness.light
                ? const Color(0xFFE1E4E8)
                : const Color(0xFF30363D),
            width: 1,
          ),
        ),
      ),
      child: Column(
        children: [
          if (progress == 1.0)
            Container(
              width: double.infinity,
              padding: EdgeInsets.all(3.w),
              decoration: BoxDecoration(
                color: theme.brightness == Brightness.light
                    ? const Color(0xFF7BA05B).withValues(alpha: 0.1)
                    : const Color(0xFF9BC474).withValues(alpha: 0.2),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Row(
                children: [
                  CustomIconWidget(
                    iconName: 'check_circle',
                    color: theme.brightness == Brightness.light
                        ? const Color(0xFF7BA05B)
                        : const Color(0xFF9BC474),
                    size: 20,
                  ),
                  SizedBox(width: 3.w),
                  Expanded(
                    child: Text(
                      'Great! You\'re all prepared for your appointment.',
                      style: theme.textTheme.bodyMedium?.copyWith(
                        color: theme.brightness == Brightness.light
                            ? const Color(0xFF7BA05B)
                            : const Color(0xFF9BC474),
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          SizedBox(height: 2.h),
          Row(
            children: [
              Expanded(
                child: OutlinedButton(
                  onPressed: widget.onClose,
                  child: Text('Close'),
                ),
              ),
              SizedBox(width: 4.w),
              Expanded(
                child: ElevatedButton.icon(
                  onPressed: () {
                    // Add to calendar functionality
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                          content: Text('Added reminder to calendar')),
                    );
                  },
                  icon: CustomIconWidget(
                    iconName: 'calendar_today',
                    color: Colors.white,
                    size: 16,
                  ),
                  label: Text('Add Reminder'),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
