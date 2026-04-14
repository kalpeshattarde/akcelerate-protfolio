import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../widgets/custom_icon_widget.dart';

/// Settings section widget with grouped settings items
class SettingsSectionWidget extends StatelessWidget {
  final String title;
  final List<Map<String, dynamic>> items;

  const SettingsSectionWidget({
    super.key,
    required this.title,
    required this.items,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
          child: Text(
            title,
            style: theme.textTheme.titleMedium?.copyWith(
              color: theme.colorScheme.onSurface,
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
        Container(
          margin: EdgeInsets.symmetric(horizontal: 4.w),
          decoration: BoxDecoration(
            color: theme.colorScheme.surface,
            borderRadius: BorderRadius.circular(12),
            boxShadow: [
              BoxShadow(
                color: theme.colorScheme.shadow.withValues(alpha: 0.05),
                blurRadius: 8,
                offset: const Offset(0, 2),
              ),
            ],
          ),
          child: Column(
            children: List.generate(
              items.length,
              (index) => _buildSettingsItem(
                context,
                items[index],
                isLast: index == items.length - 1,
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildSettingsItem(BuildContext context, Map<String, dynamic> item,
      {bool isLast = false}) {
    final theme = Theme.of(context);
    final itemType = item["type"] as String;

    return Column(
      children: [
        Material(
          color: Colors.transparent,
          child: InkWell(
            onTap: item["onTap"] as VoidCallback?,
            borderRadius: BorderRadius.vertical(
              top: Radius.circular(12),
              bottom: isLast ? Radius.circular(12) : Radius.zero,
            ),
            child: Padding(
              padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
              child: Row(
                children: [
                  Container(
                    padding: EdgeInsets.all(2.w),
                    decoration: BoxDecoration(
                      color:
                          (item["iconColor"] as Color).withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: CustomIconWidget(
                      iconName: item["icon"] as String,
                      color: item["iconColor"] as Color,
                      size: 5.w,
                    ),
                  ),
                  SizedBox(width: 3.w),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          item["title"] as String,
                          style: theme.textTheme.bodyLarge?.copyWith(
                            color: theme.colorScheme.onSurface,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                        if (item["subtitle"] != null) ...[
                          SizedBox(height: 0.5.h),
                          Text(
                            item["subtitle"] as String,
                            style: theme.textTheme.bodySmall?.copyWith(
                              color: theme.colorScheme.onSurfaceVariant,
                            ),
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ],
                      ],
                    ),
                  ),
                  SizedBox(width: 2.w),
                  _buildTrailingWidget(context, itemType, item),
                ],
              ),
            ),
          ),
        ),
        if (!isLast)
          Divider(
            height: 1,
            thickness: 0.5,
            indent: 16.w,
            color: theme.colorScheme.outline.withValues(alpha: 0.2),
          ),
      ],
    );
  }

  Widget _buildTrailingWidget(
    BuildContext context,
    String type,
    Map<String, dynamic> item,
  ) {
    final theme = Theme.of(context);

    switch (type) {
      case "toggle":
        return Switch(
          value: item["value"] as bool,
          onChanged: item["onChanged"] as Function(bool)?,
          activeColor: theme.colorScheme.primary,
        );
      case "navigation":
        return CustomIconWidget(
          iconName: 'chevron_right',
          color: theme.colorScheme.onSurfaceVariant,
          size: 5.w,
        );
      case "value":
        return Text(
          item["value"] as String,
          style: theme.textTheme.bodyMedium?.copyWith(
            color: theme.colorScheme.onSurfaceVariant,
          ),
        );
      default:
        return const SizedBox.shrink();
    }
  }
}
