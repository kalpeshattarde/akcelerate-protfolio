import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:sizer/sizer.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../../core/app_export.dart';

class EmergencyContactCardWidget extends StatelessWidget {
  final Map<String, dynamic> contact;
  final VoidCallback? onTap;

  const EmergencyContactCardWidget({
    super.key,
    required this.contact,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isEmergencyVet = contact['type'] == 'emergency_vet';
    final isPoisonControl = contact['type'] == 'poison_control';

    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: isEmergencyVet
              ? AppTheme.errorLight.withValues(alpha: 0.3)
              : isPoisonControl
                  ? AppTheme.warningLight.withValues(alpha: 0.3)
                  : theme.dividerColor,
          width: 1,
        ),
        boxShadow: [
          BoxShadow(
            color: theme.brightness == Brightness.light
                ? const Color(0x0A000000)
                : const Color(0x1A000000),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: onTap ?? () => _handleContactTap(context),
          borderRadius: BorderRadius.circular(12),
          child: Padding(
            padding: EdgeInsets.all(4.w),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Container(
                      width: 12.w,
                      height: 12.w,
                      decoration: BoxDecoration(
                        color: _getContactColor().withValues(alpha: 0.1),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Center(
                        child: CustomIconWidget(
                          iconName: _getContactIcon(),
                          color: _getContactColor(),
                          size: 6.w,
                        ),
                      ),
                    ),
                    SizedBox(width: 3.w),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            contact['name'] as String,
                            style: GoogleFonts.inter(
                              fontSize: 13.sp,
                              fontWeight: FontWeight.w600,
                              color: theme.brightness == Brightness.light
                                  ? AppTheme.textPrimaryLight
                                  : AppTheme.textPrimaryDark,
                            ),
                            overflow: TextOverflow.ellipsis,
                          ),
                          if (contact['subtitle'] != null) ...[
                            SizedBox(height: 0.5.h),
                            Text(
                              contact['subtitle'] as String,
                              style: GoogleFonts.inter(
                                fontSize: 13.sp,
                                fontWeight: FontWeight.w400,
                                color: theme.brightness == Brightness.light
                                    ? AppTheme.textSecondaryLight
                                    : AppTheme.textSecondaryDark,
                              ),
                              overflow: TextOverflow.ellipsis,
                            ),
                          ],
                        ],
                      ),
                    ),
                    if (contact['rating'] != null) ...[
                      Container(
                        padding: EdgeInsets.symmetric(
                            horizontal: 2.w, vertical: 0.5.h),
                        decoration: BoxDecoration(
                          color: AppTheme.successLight.withValues(alpha: 0.1),
                          borderRadius: BorderRadius.circular(4),
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            CustomIconWidget(
                              iconName: 'star',
                              color: AppTheme.successLight,
                              size: 3.w,
                            ),
                            SizedBox(width: 1.w),
                            Text(
                              contact['rating'].toString(),
                              style: GoogleFonts.inter(
                                fontSize: 13.sp,
                                fontWeight: FontWeight.w500,
                                color: AppTheme.successLight,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ],
                ),
                SizedBox(height: 2.h),
                Row(
                  children: [
                    if (contact['distance'] != null) ...[
                      Expanded(
                        child: _buildInfoChip(
                          context,
                          icon: 'location_on',
                          text: contact['distance'] as String,
                          color: AppTheme.primaryLight,
                        ),
                      ),
                      SizedBox(width: 2.w),
                    ],
                    if (contact['waitTime'] != null) ...[
                      Expanded(
                        child: _buildInfoChip(
                          context,
                          icon: 'access_time',
                          text: contact['waitTime'] as String,
                          color: AppTheme.warningLight,
                        ),
                      ),
                      SizedBox(width: 2.w),
                    ],
                    if (contact['availability'] != null) ...[
                      Expanded(
                        child: _buildInfoChip(
                          context,
                          icon: 'schedule',
                          text: contact['availability'] as String,
                          color: AppTheme.successLight,
                        ),
                      ),
                    ],
                  ],
                ),
                SizedBox(height: 2.h),
                Row(
                  children: [
                    Expanded(
                      child: ElevatedButton.icon(
                        onPressed: () =>
                            _makePhoneCall(contact['phone'] as String),
                        icon: CustomIconWidget(
                          iconName: 'phone',
                          color: Colors.white,
                          size: 4.w,
                        ),
                        label: Text(
                          'Call Now',
                          style: GoogleFonts.inter(
                            fontSize: 13.sp,
                            fontWeight: FontWeight.w600,
                            color: Colors.white,
                          ),
                        ),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: _getContactColor(),
                          foregroundColor: Colors.white,
                          padding: EdgeInsets.symmetric(vertical: 1.5.h),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                        ),
                      ),
                    ),
                    if (contact['hasNavigation'] == true) ...[
                      SizedBox(width: 2.w),
                      OutlinedButton(
                        onPressed: () => _openNavigation(context),
                        style: OutlinedButton.styleFrom(
                          side: BorderSide(color: _getContactColor()),
                          padding: EdgeInsets.symmetric(
                              horizontal: 3.w, vertical: 1.5.h),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                        ),
                        child: CustomIconWidget(
                          iconName: 'directions',
                          color: _getContactColor(),
                          size: 4.w,
                        ),
                      ),
                    ],
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildInfoChip(
    BuildContext context, {
    required String icon,
    required String text,
    required Color color,
  }) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 2.w, vertical: 1.h),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(6),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          CustomIconWidget(
            iconName: icon,
            color: color,
            size: 3.w,
          ),
          SizedBox(width: 1.w),
          Expanded(
            child: Text(
              text,
              style: GoogleFonts.inter(
                fontSize: 13.sp,
                fontWeight: FontWeight.w500,
                color: color,
              ),
              overflow: TextOverflow.ellipsis,
            ),
          ),
        ],
      ),
    );
  }

  Color _getContactColor() {
    switch (contact['type']) {
      case 'emergency_vet':
        return AppTheme.errorLight;
      case 'poison_control':
        return AppTheme.warningLight;
      case 'regular_vet':
        return AppTheme.primaryLight;
      default:
        return AppTheme.primaryLight;
    }
  }

  String _getContactIcon() {
    switch (contact['type']) {
      case 'emergency_vet':
        return 'local_hospital';
      case 'poison_control':
        return 'warning';
      case 'regular_vet':
        return 'medical_services';
      default:
        return 'phone';
    }
  }

  void _handleContactTap(BuildContext context) {
    if (onTap != null) {
      onTap!();
    }
  }

  Future<void> _makePhoneCall(String phoneNumber) async {
    final Uri phoneUri = Uri(scheme: 'tel', path: phoneNumber);
    try {
      if (await canLaunchUrl(phoneUri)) {
        await launchUrl(phoneUri);
      }
    } catch (e) {
      // Handle error silently
    }
  }

  void _openNavigation(BuildContext context) {
    // Implementation for opening navigation
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Opening navigation to ${contact['name']}'),
        backgroundColor: AppTheme.primaryLight,
      ),
    );
  }
}
