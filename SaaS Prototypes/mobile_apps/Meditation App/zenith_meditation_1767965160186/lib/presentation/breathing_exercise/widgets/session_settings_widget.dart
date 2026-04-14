import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class SessionSettingsWidget extends StatelessWidget {
  final int selectedDuration;
  final String selectedSound;
  final Function(int) onDurationChanged;
  final Function(String) onSoundChanged;
  final VoidCallback onClose;

  const SessionSettingsWidget({
    Key? key,
    required this.selectedDuration,
    required this.selectedSound,
    required this.onDurationChanged,
    required this.onSoundChanged,
    required this.onClose,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final durations = [1, 3, 5, 10, 15, 20];
    final sounds = [
      {'name': 'None', 'value': 'none'},
      {'name': 'Ocean Waves', 'value': 'ocean'},
      {'name': 'Forest Rain', 'value': 'rain'},
      {'name': 'Wind Chimes', 'value': 'chimes'},
      {'name': 'Tibetan Bowls', 'value': 'bowls'},
    ];

    return Container(
      height: 75.h,
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
        boxShadow: [
          BoxShadow(
            color: AppTheme.lightTheme.colorScheme.shadow,
            blurRadius: 20,
            offset: const Offset(0, -5),
          ),
        ],
      ),
      child: Column(
        children: [
          // Handle bar
          Container(
            margin: EdgeInsets.only(top: 1.h),
            width: 12.w,
            height: 0.5.h,
            decoration: BoxDecoration(
              color: AppTheme.lightTheme.colorScheme.outline,
              borderRadius: BorderRadius.circular(2),
            ),
          ),
          // Header
          Padding(
            padding: EdgeInsets.all(4.w),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Session Settings',
                  style: AppTheme.lightTheme.textTheme.titleLarge,
                ),
                GestureDetector(
                  onTap: onClose,
                  child: CustomIconWidget(
                    iconName: 'close',
                    color: AppTheme.lightTheme.colorScheme.onSurface,
                    size: 6.w,
                  ),
                ),
              ],
            ),
          ),
          Expanded(
            child: SingleChildScrollView(
              padding: EdgeInsets.symmetric(horizontal: 4.w),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Duration section
                  Text(
                    'Session Duration',
                    style: AppTheme.lightTheme.textTheme.titleMedium,
                  ),
                  SizedBox(height: 2.h),
                  Wrap(
                    spacing: 3.w,
                    runSpacing: 2.h,
                    children: durations.map((duration) {
                      final isSelected = selectedDuration == duration;
                      return GestureDetector(
                        onTap: () => onDurationChanged(duration),
                        child: Container(
                          padding: EdgeInsets.symmetric(
                            horizontal: 6.w,
                            vertical: 2.h,
                          ),
                          decoration: BoxDecoration(
                            color: isSelected
                                ? AppTheme.lightTheme.colorScheme.secondary
                                : AppTheme.lightTheme.colorScheme.surface,
                            border: Border.all(
                              color: isSelected
                                  ? AppTheme.lightTheme.colorScheme.secondary
                                  : AppTheme.lightTheme.colorScheme.outline,
                              width: isSelected ? 2 : 1,
                            ),
                            borderRadius: BorderRadius.circular(25),
                          ),
                          child: Text(
                            '${duration}m',
                            style: AppTheme.lightTheme.textTheme.bodyMedium
                                ?.copyWith(
                              color: isSelected
                                  ? AppTheme.lightTheme.colorScheme.onSecondary
                                  : AppTheme.lightTheme.colorScheme.onSurface,
                              fontWeight: isSelected
                                  ? FontWeight.w600
                                  : FontWeight.w400,
                            ),
                          ),
                        ),
                      );
                    }).toList(),
                  ),
                  SizedBox(height: 4.h),
                  // Background sounds section
                  Text(
                    'Background Sounds',
                    style: AppTheme.lightTheme.textTheme.titleMedium,
                  ),
                  SizedBox(height: 2.h),
                  Column(
                    children: sounds.map((sound) {
                      final isSelected = selectedSound == sound['value'];
                      return Container(
                        margin: EdgeInsets.only(bottom: 2.h),
                        child: GestureDetector(
                          onTap: () => onSoundChanged(sound['value'] as String),
                          child: Container(
                            padding: EdgeInsets.all(4.w),
                            decoration: BoxDecoration(
                              color: isSelected
                                  ? AppTheme.lightTheme.colorScheme.secondary
                                      .withValues(alpha: 0.1)
                                  : AppTheme.lightTheme.colorScheme.surface,
                              border: Border.all(
                                color: isSelected
                                    ? AppTheme.lightTheme.colorScheme.secondary
                                    : AppTheme.lightTheme.colorScheme.outline,
                                width: isSelected ? 2 : 1,
                              ),
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: Row(
                              children: [
                                CustomIconWidget(
                                  iconName: sound['value'] == 'none'
                                      ? 'volume_off'
                                      : 'volume_up',
                                  color: isSelected
                                      ? AppTheme
                                          .lightTheme.colorScheme.secondary
                                      : AppTheme.lightTheme.colorScheme
                                          .onSurfaceVariant,
                                  size: 5.w,
                                ),
                                SizedBox(width: 3.w),
                                Expanded(
                                  child: Text(
                                    sound['name'] as String,
                                    style: AppTheme
                                        .lightTheme.textTheme.bodyMedium
                                        ?.copyWith(
                                      color: isSelected
                                          ? AppTheme
                                              .lightTheme.colorScheme.secondary
                                          : AppTheme
                                              .lightTheme.colorScheme.onSurface,
                                    ),
                                  ),
                                ),
                                if (isSelected)
                                  CustomIconWidget(
                                    iconName: 'check_circle',
                                    color: AppTheme
                                        .lightTheme.colorScheme.secondary,
                                    size: 5.w,
                                  ),
                              ],
                            ),
                          ),
                        ),
                      );
                    }).toList(),
                  ),
                  SizedBox(height: 2.h),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
