import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class MedicalRecordTimelineItem extends StatelessWidget {
  final Map<String, dynamic> record;
  final VoidCallback? onTap;
  final VoidCallback? onEdit;
  final VoidCallback? onShare;
  final VoidCallback? onDelete;

  const MedicalRecordTimelineItem({
    super.key,
    required this.record,
    this.onTap,
    this.onEdit,
    this.onShare,
    this.onDelete,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final recordType = record['type'] as String? ?? 'checkup';
    final isExpanded = record['isExpanded'] as bool? ?? false;

    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildTimelineIndicator(recordType, theme),
          SizedBox(width: 3.w),
          Expanded(
            child: _buildRecordCard(context, theme, isExpanded),
          ),
        ],
      ),
    );
  }

  Widget _buildTimelineIndicator(String recordType, ThemeData theme) {
    Color indicatorColor;
    IconData iconData;

    switch (recordType.toLowerCase()) {
      case 'vaccination':
        indicatorColor = AppTheme.successLight;
        iconData = Icons.vaccines;
        break;
      case 'illness':
        indicatorColor = AppTheme.errorLight;
        iconData = Icons.sick;
        break;
      case 'surgery':
        indicatorColor = AppTheme.warningLight;
        iconData = Icons.local_hospital;
        break;
      case 'checkup':
      default:
        indicatorColor = theme.brightness == Brightness.light
            ? const Color(0xFF2B5F75)
            : const Color(0xFF4A8BA3);
        iconData = Icons.health_and_safety;
        break;
    }

    return Column(
      children: [
        Container(
          width: 10.w,
          height: 10.w,
          decoration: BoxDecoration(
            color: indicatorColor,
            shape: BoxShape.circle,
            boxShadow: [
              BoxShadow(
                color: indicatorColor.withValues(alpha: 0.3),
                blurRadius: 4,
                offset: const Offset(0, 2),
              ),
            ],
          ),
          child: CustomIconWidget(
            iconName: _getIconName(iconData),
            color: Colors.white,
            size: 5.w,
          ),
        ),
        Container(
          width: 2,
          height: 8.h,
          color: theme.brightness == Brightness.light
              ? const Color(0xFFE1E4E8)
              : const Color(0xFF30363D),
        ),
      ],
    );
  }

  Widget _buildRecordCard(
      BuildContext context, ThemeData theme, bool isExpanded) {
    return GestureDetector(
      onTap: onTap,
      onLongPress: () => _showContextMenu(context),
      child: Container(
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
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildCardHeader(theme),
            if (isExpanded) _buildExpandedContent(theme),
            _buildCardFooter(theme),
          ],
        ),
      ),
    );
  }

  Widget _buildCardHeader(ThemeData theme) {
    return Padding(
      padding: EdgeInsets.all(4.w),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Text(
                  record['title'] as String? ?? 'Medical Record',
                  style: GoogleFonts.inter(
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                    color: theme.brightness == Brightness.light
                        ? const Color(0xFF1B1F23)
                        : const Color(0xFFE8EAED),
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
              _buildRecordTypeBadge(theme),
            ],
          ),
          SizedBox(height: 1.h),
          Row(
            children: [
              CustomIconWidget(
                iconName: 'calendar_today',
                color: theme.brightness == Brightness.light
                    ? const Color(0xFF6A737D)
                    : const Color(0xFFADB5BD),
                size: 4.w,
              ),
              SizedBox(width: 2.w),
              Text(
                record['date'] as String? ?? 'No date',
                style: GoogleFonts.inter(
                  fontSize: 14,
                  fontWeight: FontWeight.w400,
                  color: theme.brightness == Brightness.light
                      ? const Color(0xFF6A737D)
                      : const Color(0xFFADB5BD),
                ),
              ),
              SizedBox(width: 4.w),
              CustomIconWidget(
                iconName: 'person',
                color: theme.brightness == Brightness.light
                    ? const Color(0xFF6A737D)
                    : const Color(0xFFADB5BD),
                size: 4.w,
              ),
              SizedBox(width: 2.w),
              Expanded(
                child: Text(
                  record['veterinarian'] as String? ?? 'Unknown vet',
                  style: GoogleFonts.inter(
                    fontSize: 14,
                    fontWeight: FontWeight.w400,
                    color: theme.brightness == Brightness.light
                        ? const Color(0xFF6A737D)
                        : const Color(0xFFADB5BD),
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildRecordTypeBadge(ThemeData theme) {
    final recordType = record['type'] as String? ?? 'checkup';
    Color badgeColor;

    switch (recordType.toLowerCase()) {
      case 'vaccination':
        badgeColor = AppTheme.successLight;
        break;
      case 'illness':
        badgeColor = AppTheme.errorLight;
        break;
      case 'surgery':
        badgeColor = AppTheme.warningLight;
        break;
      case 'checkup':
      default:
        badgeColor = theme.brightness == Brightness.light
            ? const Color(0xFF2B5F75)
            : const Color(0xFF4A8BA3);
        break;
    }

    return Container(
      padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 0.5.h),
      decoration: BoxDecoration(
        color: badgeColor.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: badgeColor.withValues(alpha: 0.3),
          width: 1,
        ),
      ),
      child: Text(
        recordType.toUpperCase(),
        style: GoogleFonts.inter(
          fontSize: 14,
          fontWeight: FontWeight.w600,
          color: badgeColor,
          letterSpacing: 0.5,
        ),
      ),
    );
  }

  Widget _buildExpandedContent(ThemeData theme) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 4.w),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (record['description'] != null) ...[
            Text(
              'Description',
              style: GoogleFonts.inter(
                fontSize: 14,
                fontWeight: FontWeight.w600,
                color: theme.brightness == Brightness.light
                    ? const Color(0xFF1B1F23)
                    : const Color(0xFFE8EAED),
              ),
            ),
            SizedBox(height: 0.5.h),
            Text(
              record['description'] as String,
              style: GoogleFonts.inter(
                fontSize: 14,
                fontWeight: FontWeight.w400,
                color: theme.brightness == Brightness.light
                    ? const Color(0xFF6A737D)
                    : const Color(0xFFADB5BD),
                height: 1.4,
              ),
            ),
            SizedBox(height: 2.h),
          ],
          if (record['medications'] != null) ...[
            Text(
              'Medications',
              style: GoogleFonts.inter(
                fontSize: 14,
                fontWeight: FontWeight.w600,
                color: theme.brightness == Brightness.light
                    ? const Color(0xFF1B1F23)
                    : const Color(0xFFE8EAED),
              ),
            ),
            SizedBox(height: 0.5.h),
            ...(record['medications'] as List).map((med) => Padding(
                  padding: EdgeInsets.only(bottom: 0.5.h),
                  child: Row(
                    children: [
                      Container(
                        width: 1.w,
                        height: 1.w,
                        decoration: BoxDecoration(
                          color: theme.brightness == Brightness.light
                              ? const Color(0xFF6A737D)
                              : const Color(0xFFADB5BD),
                          shape: BoxShape.circle,
                        ),
                      ),
                      SizedBox(width: 2.w),
                      Expanded(
                        child: Text(
                          med as String,
                          style: GoogleFonts.inter(
                            fontSize: 14,
                            fontWeight: FontWeight.w400,
                            color: theme.brightness == Brightness.light
                                ? const Color(0xFF6A737D)
                                : const Color(0xFFADB5BD),
                          ),
                        ),
                      ),
                    ],
                  ),
                )),
            SizedBox(height: 2.h),
          ],
          if (record['attachments'] != null &&
              (record['attachments'] as List).isNotEmpty) ...[
            Text(
              'Attachments',
              style: GoogleFonts.inter(
                fontSize: 14,
                fontWeight: FontWeight.w600,
                color: theme.brightness == Brightness.light
                    ? const Color(0xFF1B1F23)
                    : const Color(0xFFE8EAED),
              ),
            ),
            SizedBox(height: 1.h),
            SizedBox(
              height: 15.w,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                itemCount: (record['attachments'] as List).length,
                separatorBuilder: (context, index) => SizedBox(width: 2.w),
                itemBuilder: (context, index) {
                  final attachment = (record['attachments'] as List)[index]
                      as Map<String, dynamic>;
                  return _buildAttachmentThumbnail(attachment, theme);
                },
              ),
            ),
            SizedBox(height: 2.h),
          ],
        ],
      ),
    );
  }

  Widget _buildAttachmentThumbnail(
      Map<String, dynamic> attachment, ThemeData theme) {
    return Container(
      width: 15.w,
      height: 15.w,
      decoration: BoxDecoration(
        color: theme.brightness == Brightness.light
            ? const Color(0xFFF6F8FA)
            : const Color(0xFF21262D),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: theme.brightness == Brightness.light
              ? const Color(0xFFE1E4E8)
              : const Color(0xFF30363D),
          width: 1,
        ),
      ),
      child: attachment['type'] == 'image'
          ? ClipRRect(
              borderRadius: BorderRadius.circular(7),
              child: CustomImageWidget(
                imageUrl: attachment['url'] as String,
                width: 15.w,
                height: 15.w,
                fit: BoxFit.cover,
              ),
            )
          : Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                CustomIconWidget(
                  iconName: 'description',
                  color: theme.brightness == Brightness.light
                      ? const Color(0xFF6A737D)
                      : const Color(0xFFADB5BD),
                  size: 6.w,
                ),
                SizedBox(height: 0.5.h),
                Text(
                  attachment['name'] as String? ?? 'File',
                  style: GoogleFonts.inter(
                    fontSize: 14,
                    fontWeight: FontWeight.w400,
                    color: theme.brightness == Brightness.light
                        ? const Color(0xFF6A737D)
                        : const Color(0xFFADB5BD),
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  textAlign: TextAlign.center,
                ),
              ],
            ),
    );
  }

  Widget _buildCardFooter(ThemeData theme) {
    return Container(
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: theme.brightness == Brightness.light
            ? const Color(0xFFF6F8FA)
            : const Color(0xFF21262D),
        borderRadius: const BorderRadius.only(
          bottomLeft: Radius.circular(12),
          bottomRight: Radius.circular(12),
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          if (record['clinic'] != null)
            Expanded(
              child: Row(
                children: [
                  CustomIconWidget(
                    iconName: 'local_hospital',
                    color: theme.brightness == Brightness.light
                        ? const Color(0xFF6A737D)
                        : const Color(0xFFADB5BD),
                    size: 4.w,
                  ),
                  SizedBox(width: 2.w),
                  Expanded(
                    child: Text(
                      record['clinic'] as String,
                      style: GoogleFonts.inter(
                        fontSize: 14,
                        fontWeight: FontWeight.w400,
                        color: theme.brightness == Brightness.light
                            ? const Color(0xFF6A737D)
                            : const Color(0xFFADB5BD),
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ],
              ),
            ),
          Row(
            children: [
              GestureDetector(
                onTap: onEdit,
                child: Container(
                  padding: EdgeInsets.all(2.w),
                  child: CustomIconWidget(
                    iconName: 'edit',
                    color: theme.brightness == Brightness.light
                        ? const Color(0xFF2B5F75)
                        : const Color(0xFF4A8BA3),
                    size: 4.w,
                  ),
                ),
              ),
              GestureDetector(
                onTap: onShare,
                child: Container(
                  padding: EdgeInsets.all(2.w),
                  child: CustomIconWidget(
                    iconName: 'share',
                    color: theme.brightness == Brightness.light
                        ? const Color(0xFF2B5F75)
                        : const Color(0xFF4A8BA3),
                    size: 4.w,
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  void _showContextMenu(BuildContext context) {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (context) => Container(
        decoration: BoxDecoration(
          color: Theme.of(context).colorScheme.surface,
          borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
        ),
        child: SafeArea(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 40,
                height: 4,
                margin: const EdgeInsets.symmetric(vertical: 12),
                decoration: BoxDecoration(
                  color: Theme.of(context).brightness == Brightness.light
                      ? const Color(0xFFE1E4E8)
                      : const Color(0xFF30363D),
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
              ListTile(
                leading: CustomIconWidget(
                  iconName: 'edit',
                  color: Theme.of(context).brightness == Brightness.light
                      ? const Color(0xFF2B5F75)
                      : const Color(0xFF4A8BA3),
                  size: 24,
                ),
                title: Text('Edit Record'),
                onTap: () {
                  Navigator.pop(context);
                  onEdit?.call();
                },
              ),
              ListTile(
                leading: CustomIconWidget(
                  iconName: 'content_copy',
                  color: Theme.of(context).brightness == Brightness.light
                      ? const Color(0xFF2B5F75)
                      : const Color(0xFF4A8BA3),
                  size: 24,
                ),
                title: Text('Duplicate'),
                onTap: () {
                  Navigator.pop(context);
                  // Handle duplicate
                },
              ),
              ListTile(
                leading: CustomIconWidget(
                  iconName: 'picture_as_pdf',
                  color: Theme.of(context).brightness == Brightness.light
                      ? const Color(0xFF2B5F75)
                      : const Color(0xFF4A8BA3),
                  size: 24,
                ),
                title: Text('Export PDF'),
                onTap: () {
                  Navigator.pop(context);
                  // Handle PDF export
                },
              ),
              ListTile(
                leading: CustomIconWidget(
                  iconName: 'notifications',
                  color: Theme.of(context).brightness == Brightness.light
                      ? const Color(0xFF2B5F75)
                      : const Color(0xFF4A8BA3),
                  size: 24,
                ),
                title: Text('Set Reminder'),
                onTap: () {
                  Navigator.pop(context);
                  // Handle reminder
                },
              ),
              ListTile(
                leading: CustomIconWidget(
                  iconName: 'share',
                  color: Theme.of(context).brightness == Brightness.light
                      ? const Color(0xFF2B5F75)
                      : const Color(0xFF4A8BA3),
                  size: 24,
                ),
                title: Text('Share'),
                onTap: () {
                  Navigator.pop(context);
                  onShare?.call();
                },
              ),
              ListTile(
                leading: CustomIconWidget(
                  iconName: 'delete',
                  color: AppTheme.errorLight,
                  size: 24,
                ),
                title: Text(
                  'Delete',
                  style: TextStyle(color: AppTheme.errorLight),
                ),
                onTap: () {
                  Navigator.pop(context);
                  _showDeleteConfirmation(context);
                },
              ),
              SizedBox(height: 2.h),
            ],
          ),
        ),
      ),
    );
  }

  void _showDeleteConfirmation(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Delete Record'),
        content: Text(
            'Are you sure you want to delete this medical record? This action cannot be undone.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel'),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              onDelete?.call();
            },
            style: TextButton.styleFrom(
              foregroundColor: AppTheme.errorLight,
            ),
            child: Text('Delete'),
          ),
        ],
      ),
    );
  }

  String _getIconName(IconData iconData) {
    switch (iconData) {
      case Icons.vaccines:
        return 'vaccines';
      case Icons.sick:
        return 'sick';
      case Icons.local_hospital:
        return 'local_hospital';
      case Icons.health_and_safety:
        return 'health_and_safety';
      default:
        return 'health_and_safety';
    }
  }
}
