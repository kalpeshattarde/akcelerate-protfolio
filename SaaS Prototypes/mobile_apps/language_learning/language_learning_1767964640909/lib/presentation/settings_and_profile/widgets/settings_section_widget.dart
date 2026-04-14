import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class SettingsSectionWidget extends StatelessWidget {
  final String title;
  final List<Map<String, dynamic>> settings;
  final Function(String, dynamic) onSettingChanged;

  const SettingsSectionWidget({
    Key? key,
    required this.title,
    required this.settings,
    required this.onSettingChanged,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(bottom: 2.h),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: BorderRadius.circular(3.w),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.05),
            blurRadius: 8,
            offset: Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: EdgeInsets.all(4.w),
            child: Text(
              title,
              style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.w600,
                color: AppTheme.lightTheme.colorScheme.onSurface,
              ),
            ),
          ),
          ...settings.asMap().entries.map((entry) {
            final index = entry.key;
            final setting = entry.value;
            final isLast = index == settings.length - 1;

            return Column(
              children: [
                _buildSettingItem(context, setting),
                if (!isLast)
                  Divider(
                    height: 1,
                    color:
                        AppTheme.lightTheme.dividerColor.withValues(alpha: 0.5),
                    indent: 4.w,
                    endIndent: 4.w,
                  ),
              ],
            );
          }).toList(),
        ],
      ),
    );
  }

  Widget _buildSettingItem(BuildContext context, Map<String, dynamic> setting) {
    final String type = setting["type"] as String;
    final String key = setting["key"] as String;
    final String title = setting["title"] as String;
    final String? subtitle = setting["subtitle"] as String?;
    final String iconName = setting["icon"] as String;
    final dynamic value = setting["value"];

    return InkWell(
      onTap: type == "navigation" ? () => onSettingChanged(key, null) : null,
      borderRadius: BorderRadius.circular(3.w),
      child: Padding(
        padding: EdgeInsets.all(4.w),
        child: Row(
          children: [
            Container(
              width: 10.w,
              height: 10.w,
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.primaryColor.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(2.w),
              ),
              child: Center(
                child: CustomIconWidget(
                  iconName: iconName,
                  color: AppTheme.lightTheme.primaryColor,
                  size: 5.w,
                ),
              ),
            ),
            SizedBox(width: 3.w),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: AppTheme.lightTheme.textTheme.bodyLarge?.copyWith(
                      fontWeight: FontWeight.w500,
                      color: AppTheme.lightTheme.colorScheme.onSurface,
                    ),
                    overflow: TextOverflow.ellipsis,
                  ),
                  if (subtitle != null) ...[
                    SizedBox(height: 0.5.h),
                    Text(
                      subtitle,
                      style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                        color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                      ),
                      overflow: TextOverflow.ellipsis,
                      maxLines: 2,
                    ),
                  ],
                ],
              ),
            ),
            SizedBox(width: 2.w),
            _buildSettingControl(context, type, key, value),
          ],
        ),
      ),
    );
  }

  Widget _buildSettingControl(
      BuildContext context, String type, String key, dynamic value) {
    switch (type) {
      case "switch":
        return Switch(
          value: value as bool,
          onChanged: (newValue) => onSettingChanged(key, newValue),
          activeColor: AppTheme.lightTheme.primaryColor,
        );
      case "slider":
        return SizedBox(
          width: 25.w,
          child: Slider(
            value: (value as double).clamp(0.0, 1.0),
            onChanged: (newValue) => onSettingChanged(key, newValue),
            activeColor: AppTheme.lightTheme.primaryColor,
            inactiveColor:
                AppTheme.lightTheme.primaryColor.withValues(alpha: 0.3),
          ),
        );
      case "dropdown":
        return Container(
          padding: EdgeInsets.symmetric(horizontal: 2.w, vertical: 1.h),
          decoration: BoxDecoration(
            color: AppTheme.lightTheme.colorScheme.surface,
            borderRadius: BorderRadius.circular(2.w),
            border: Border.all(
              color: AppTheme.lightTheme.dividerColor,
              width: 1,
            ),
          ),
          child: Text(
            value.toString(),
            style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
              color: AppTheme.lightTheme.primaryColor,
              fontWeight: FontWeight.w500,
            ),
          ),
        );
      case "navigation":
        return CustomIconWidget(
          iconName: 'chevron_right',
          color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
          size: 5.w,
        );
      default:
        return SizedBox.shrink();
    }
  }
}
