import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../widgets/custom_icon_widget.dart';

class AppointmentCardWidget extends StatelessWidget {
  final Map<String, dynamic> appointment;
  final VoidCallback? onTap;
  final VoidCallback? onCall;
  final VoidCallback? onNavigate;
  final VoidCallback? onReschedule;
  final VoidCallback? onCancel;
  final VoidCallback? onAddNotes;

  const AppointmentCardWidget({
    super.key,
    required this.appointment,
    this.onTap,
    this.onCall,
    this.onNavigate,
    this.onReschedule,
    this.onCancel,
    this.onAddNotes,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isUpcoming = appointment['status'] == 'upcoming';

    return Dismissible(
      key: Key('appointment_${appointment['id']}'),
      direction: DismissDirection.endToStart,
      background: _buildSwipeBackground(theme),
      confirmDismiss: (direction) async => false,
      onDismissed: (direction) {},
      child: Container(
        margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
        decoration: BoxDecoration(
          color: theme.colorScheme.surface,
          borderRadius: BorderRadius.circular(12),
          boxShadow: [
            BoxShadow(
              color: theme.brightness == Brightness.light
                  ? const Color(0x0A000000)
                  : const Color(0x1A000000),
              blurRadius: 4,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Material(
          color: Colors.transparent,
          child: InkWell(
            onTap: onTap,
            borderRadius: BorderRadius.circular(12),
            child: Padding(
              padding: EdgeInsets.all(4.w),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildHeader(theme, isUpcoming),
                  SizedBox(height: 2.h),
                  _buildAppointmentDetails(theme),
                  SizedBox(height: 2.h),
                  _buildActionButtons(theme, isUpcoming),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildSwipeBackground(ThemeData theme) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
      decoration: BoxDecoration(
        color: theme.brightness == Brightness.light
            ? const Color(0xFF2B5F75)
            : const Color(0xFF4A8BA3),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          Padding(
            padding: EdgeInsets.only(right: 6.w),
            child: Row(
              children: [
                GestureDetector(
                  onTap: onReschedule,
                  child: Container(
                    padding: EdgeInsets.all(2.w),
                    decoration: BoxDecoration(
                      color: Colors.white.withValues(alpha: 0.2),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: CustomIconWidget(
                      iconName: 'schedule',
                      color: Colors.white,
                      size: 20,
                    ),
                  ),
                ),
                SizedBox(width: 3.w),
                GestureDetector(
                  onTap: onCancel,
                  child: Container(
                    padding: EdgeInsets.all(2.w),
                    decoration: BoxDecoration(
                      color: Colors.white.withValues(alpha: 0.2),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: CustomIconWidget(
                      iconName: 'cancel',
                      color: Colors.white,
                      size: 20,
                    ),
                  ),
                ),
                SizedBox(width: 3.w),
                GestureDetector(
                  onTap: onAddNotes,
                  child: Container(
                    padding: EdgeInsets.all(2.w),
                    decoration: BoxDecoration(
                      color: Colors.white.withValues(alpha: 0.2),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: CustomIconWidget(
                      iconName: 'note_add',
                      color: Colors.white,
                      size: 20,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildHeader(ThemeData theme, bool isUpcoming) {
    return Row(
      children: [
        Container(
          width: 12.w,
          height: 12.w,
          decoration: BoxDecoration(
            color: theme.brightness == Brightness.light
                ? const Color(0xFF2B5F75).withValues(alpha: 0.1)
                : const Color(0xFF4A8BA3).withValues(alpha: 0.2),
            borderRadius: BorderRadius.circular(8),
          ),
          child: CustomIconWidget(
            iconName: 'local_hospital',
            color: theme.brightness == Brightness.light
                ? const Color(0xFF2B5F75)
                : const Color(0xFF4A8BA3),
            size: 24,
          ),
        ),
        SizedBox(width: 3.w),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                appointment['clinicName'] as String,
                style: theme.textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
                overflow: TextOverflow.ellipsis,
              ),
              SizedBox(height: 0.5.h),
              Text(
                appointment['appointmentType'] as String,
                style: theme.textTheme.bodyMedium?.copyWith(
                  color: theme.brightness == Brightness.light
                      ? const Color(0xFF6A737D)
                      : const Color(0xFFADB5BD),
                ),
                overflow: TextOverflow.ellipsis,
              ),
            ],
          ),
        ),
        Container(
          padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
          decoration: BoxDecoration(
            color: isUpcoming
                ? (theme.brightness == Brightness.light
                    ? const Color(0xFF7BA05B).withValues(alpha: 0.1)
                    : const Color(0xFF9BC474).withValues(alpha: 0.2))
                : (theme.brightness == Brightness.light
                    ? const Color(0xFF6A737D).withValues(alpha: 0.1)
                    : const Color(0xFFADB5BD).withValues(alpha: 0.2)),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Text(
            isUpcoming ? 'Upcoming' : 'Past',
            style: theme.textTheme.labelSmall?.copyWith(
              color: isUpcoming
                  ? (theme.brightness == Brightness.light
                      ? const Color(0xFF7BA05B)
                      : const Color(0xFF9BC474))
                  : (theme.brightness == Brightness.light
                      ? const Color(0xFF6A737D)
                      : const Color(0xFFADB5BD)),
              fontWeight: FontWeight.w500,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildAppointmentDetails(ThemeData theme) {
    return Row(
      children: [
        Container(
          width: 15.w,
          height: 15.w,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(8),
            image: DecorationImage(
              image: NetworkImage(appointment['petPhoto'] as String),
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
                appointment['petName'] as String,
                style: theme.textTheme.titleSmall?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
                overflow: TextOverflow.ellipsis,
              ),
              SizedBox(height: 0.5.h),
              Row(
                children: [
                  CustomIconWidget(
                    iconName: 'calendar_today',
                    color: theme.brightness == Brightness.light
                        ? const Color(0xFF6A737D)
                        : const Color(0xFFADB5BD),
                    size: 16,
                  ),
                  SizedBox(width: 1.w),
                  Text(
                    appointment['date'] as String,
                    style: theme.textTheme.bodySmall?.copyWith(
                      color: theme.brightness == Brightness.light
                          ? const Color(0xFF6A737D)
                          : const Color(0xFFADB5BD),
                    ),
                  ),
                ],
              ),
              SizedBox(height: 0.5.h),
              Row(
                children: [
                  CustomIconWidget(
                    iconName: 'access_time',
                    color: theme.brightness == Brightness.light
                        ? const Color(0xFF6A737D)
                        : const Color(0xFFADB5BD),
                    size: 16,
                  ),
                  SizedBox(width: 1.w),
                  Text(
                    appointment['time'] as String,
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
    );
  }

  Widget _buildActionButtons(ThemeData theme, bool isUpcoming) {
    return Row(
      children: [
        Expanded(
          child: OutlinedButton.icon(
            onPressed: onCall,
            icon: CustomIconWidget(
              iconName: 'phone',
              color: theme.brightness == Brightness.light
                  ? const Color(0xFF2B5F75)
                  : const Color(0xFF4A8BA3),
              size: 16,
            ),
            label: Text('Call'),
            style: OutlinedButton.styleFrom(
              padding: EdgeInsets.symmetric(vertical: 1.5.h),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(8),
              ),
            ),
          ),
        ),
        SizedBox(width: 3.w),
        Expanded(
          child: OutlinedButton.icon(
            onPressed: onNavigate,
            icon: CustomIconWidget(
              iconName: 'directions',
              color: theme.brightness == Brightness.light
                  ? const Color(0xFF2B5F75)
                  : const Color(0xFF4A8BA3),
              size: 16,
            ),
            label: Text('Navigate'),
            style: OutlinedButton.styleFrom(
              padding: EdgeInsets.symmetric(vertical: 1.5.h),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(8),
              ),
            ),
          ),
        ),
      ],
    );
  }
}
