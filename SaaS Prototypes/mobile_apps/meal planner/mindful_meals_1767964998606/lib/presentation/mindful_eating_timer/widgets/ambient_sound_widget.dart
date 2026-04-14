import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class AmbientSoundWidget extends StatelessWidget {
  final String selectedSound;
  final Function(String) onSoundSelected;

  const AmbientSoundWidget({
    Key? key,
    required this.selectedSound,
    required this.onSoundSelected,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final soundOptions = [
      {'id': 'silence', 'label': 'Silence', 'icon': 'volume_off'},
      {'id': 'rain', 'label': 'Gentle Rain', 'icon': 'grain'},
      {'id': 'forest', 'label': 'Forest Ambiance', 'icon': 'park'},
    ];

    return Container(
      width: 80.w,
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: BorderRadius.circular(3.w),
        boxShadow: [
          BoxShadow(
            color:
                AppTheme.lightTheme.colorScheme.shadow.withValues(alpha: 0.08),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Ambient Sounds',
            style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
              fontSize: 12.sp,
              color: AppTheme.lightTheme.colorScheme.onSurface,
            ),
          ),
          SizedBox(height: 2.h),
          ...soundOptions.map((sound) {
            final id = sound['id'] as String;
            final label = sound['label'] as String;
            final icon = sound['icon'] as String;
            final isSelected = selectedSound == id;

            return Container(
              margin: EdgeInsets.only(bottom: 1.h),
              child: Material(
                color: Colors.transparent,
                child: InkWell(
                  onTap: () => onSoundSelected(id),
                  borderRadius: BorderRadius.circular(2.w),
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 200),
                    padding:
                        EdgeInsets.symmetric(horizontal: 3.w, vertical: 2.h),
                    decoration: BoxDecoration(
                      color: isSelected
                          ? AppTheme.lightTheme.colorScheme.primary
                              .withValues(alpha: 0.1)
                          : Colors.transparent,
                      borderRadius: BorderRadius.circular(2.w),
                      border: Border.all(
                        color: isSelected
                            ? AppTheme.lightTheme.colorScheme.primary
                            : AppTheme.lightTheme.colorScheme.outline
                                .withValues(alpha: 0.2),
                        width: 1,
                      ),
                    ),
                    child: Row(
                      children: [
                        CustomIconWidget(
                          iconName: icon,
                          size: 5.w,
                          color: isSelected
                              ? AppTheme.lightTheme.colorScheme.primary
                              : AppTheme
                                  .lightTheme.colorScheme.onSurfaceVariant,
                        ),
                        SizedBox(width: 3.w),
                        Expanded(
                          child: Text(
                            label,
                            style: AppTheme.lightTheme.textTheme.bodyMedium
                                ?.copyWith(
                              fontSize: 11.sp,
                              color: isSelected
                                  ? AppTheme.lightTheme.colorScheme.primary
                                  : AppTheme.lightTheme.colorScheme.onSurface,
                            ),
                          ),
                        ),
                        if (isSelected)
                          CustomIconWidget(
                            iconName: 'check_circle',
                            size: 4.w,
                            color: AppTheme.lightTheme.colorScheme.primary,
                          ),
                      ],
                    ),
                  ),
                ),
              ),
            );
          }).toList(),
        ],
      ),
    );
  }
}
