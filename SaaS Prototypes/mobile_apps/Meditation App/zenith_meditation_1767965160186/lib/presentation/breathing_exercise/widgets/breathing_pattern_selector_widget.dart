import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class BreathingPatternSelectorWidget extends StatelessWidget {
  final String selectedPattern;
  final Function(String) onPatternChanged;
  final VoidCallback onClose;

  const BreathingPatternSelectorWidget({
    Key? key,
    required this.selectedPattern,
    required this.onPatternChanged,
    required this.onClose,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final patterns = [
      {
        'name': '4-7-8 Deep Rest',
        'description': 'Inhale 4s • Hold 7s • Exhale 8s',
        'value': '4-7-8',
        'benefits':
            'Activates parasympathetic nervous system for profound relaxation',
        'icon': 'bedtime',
        'color': const Color(0xFF6B73FF),
      },
      {
        'name': 'Box Breathing',
        'description': 'Inhale 4s • Hold 4s • Exhale 4s • Hold 4s',
        'value': 'box',
        'benefits':
            'Navy SEAL technique for stress reduction and mental clarity',
        'icon': 'crop_square',
        'color': const Color(0xFF9C27B0),
      },
      {
        'name': 'Equal Breath',
        'description': 'Inhale 4s • Exhale 4s',
        'value': 'equal',
        'benefits': 'Balances the nervous system and promotes mindful presence',
        'icon': 'balance',
        'color': const Color(0xFF00BCD4),
      },
      {
        'name': 'Triangle Breath',
        'description': 'Inhale 4s • Hold 4s • Exhale 4s',
        'value': 'triangle',
        'benefits': 'Three-part breathing for emotional stability and focus',
        'icon': 'change_history',
        'color': const Color(0xFF4CAF50),
      },
    ];

    return Container(
      height: 80.h,
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [
            AppTheme.lightTheme.colorScheme.surface,
            AppTheme.lightTheme.colorScheme.surface.withValues(alpha: 0.95),
          ],
        ),
        borderRadius: const BorderRadius.vertical(top: Radius.circular(25)),
        boxShadow: [
          BoxShadow(
            color:
                AppTheme.lightTheme.colorScheme.shadow.withValues(alpha: 0.2),
            blurRadius: 30,
            offset: const Offset(0, -10),
          ),
        ],
      ),
      child: Column(
        children: [
          // Enhanced handle bar
          Container(
            margin: EdgeInsets.only(top: 2.h),
            width: 15.w,
            height: 0.6.h,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [
                  AppTheme.lightTheme.colorScheme.secondary
                      .withValues(alpha: 0.3),
                  AppTheme.lightTheme.colorScheme.secondary,
                  AppTheme.lightTheme.colorScheme.secondary
                      .withValues(alpha: 0.3),
                ],
              ),
              borderRadius: BorderRadius.circular(3),
            ),
          ),

          // Enhanced header
          Padding(
            padding: EdgeInsets.fromLTRB(5.w, 3.h, 5.w, 2.h),
            child: Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Breathing Patterns',
                        style: AppTheme.lightTheme.textTheme.headlineSmall
                            ?.copyWith(
                          fontWeight: FontWeight.w300,
                        ),
                      ),
                      SizedBox(height: 0.5.h),
                      Text(
                        'Choose your sacred rhythm',
                        style:
                            AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                          color: AppTheme.lightTheme.colorScheme.secondary,
                        ),
                      ),
                    ],
                  ),
                ),
                GestureDetector(
                  onTap: onClose,
                  child: Container(
                    padding: EdgeInsets.all(2.w),
                    decoration: BoxDecoration(
                      color: AppTheme.lightTheme.colorScheme.secondary
                          .withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: CustomIconWidget(
                      iconName: 'close',
                      color: AppTheme.lightTheme.colorScheme.secondary,
                      size: 6.w,
                    ),
                  ),
                ),
              ],
            ),
          ),

          // Enhanced pattern list
          Expanded(
            child: ListView.builder(
              padding: EdgeInsets.symmetric(horizontal: 5.w),
              itemCount: patterns.length,
              itemBuilder: (context, index) {
                final pattern = patterns[index];
                final isSelected = selectedPattern == pattern['value'];

                return Container(
                  margin: EdgeInsets.only(bottom: 3.h),
                  child: GestureDetector(
                    onTap: () => onPatternChanged(pattern['value'] as String),
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 300),
                      curve: Curves.easeInOut,
                      padding: EdgeInsets.all(5.w),
                      decoration: BoxDecoration(
                        gradient: isSelected
                            ? LinearGradient(
                                begin: Alignment.topLeft,
                                end: Alignment.bottomRight,
                                colors: [
                                  AppTheme.lightTheme.colorScheme.secondary
                                      .withValues(alpha: 0.15),
                                  AppTheme.lightTheme.colorScheme.secondary
                                      .withValues(alpha: 0.08),
                                ],
                              )
                            : LinearGradient(
                                begin: Alignment.topLeft,
                                end: Alignment.bottomRight,
                                colors: [
                                  AppTheme.lightTheme.colorScheme.surface,
                                  AppTheme.lightTheme.colorScheme.surface
                                      .withValues(alpha: 0.8),
                                ],
                              ),
                        border: Border.all(
                          color: isSelected
                              ? AppTheme.lightTheme.colorScheme.secondary
                              : AppTheme.lightTheme.colorScheme.outline
                                  .withValues(alpha: 0.3),
                          width: isSelected ? 2.5 : 1,
                        ),
                        borderRadius: BorderRadius.circular(20),
                        boxShadow: isSelected
                            ? [
                                BoxShadow(
                                  color: AppTheme
                                      .lightTheme.colorScheme.secondary
                                      .withValues(alpha: 0.2),
                                  blurRadius: 20,
                                  spreadRadius: 2,
                                ),
                              ]
                            : [
                                BoxShadow(
                                  color: AppTheme.lightTheme.colorScheme.shadow
                                      .withValues(alpha: 0.05),
                                  blurRadius: 10,
                                  offset: const Offset(0, 2),
                                ),
                              ],
                      ),
                      child: Row(
                        children: [
                          // Pattern icon
                          Container(
                            width: 15.w,
                            height: 15.w,
                            decoration: BoxDecoration(
                              gradient: LinearGradient(
                                begin: Alignment.topLeft,
                                end: Alignment.bottomRight,
                                colors: [
                                  (pattern['color'] as Color)
                                      .withValues(alpha: 0.2),
                                  (pattern['color'] as Color)
                                      .withValues(alpha: 0.1),
                                ],
                              ),
                              borderRadius: BorderRadius.circular(12),
                              border: Border.all(
                                color: (pattern['color'] as Color)
                                    .withValues(alpha: 0.3),
                                width: 1,
                              ),
                            ),
                            child: Center(
                              child: CustomIconWidget(
                                iconName: pattern['icon'] as String,
                                color: pattern['color'] as Color,
                                size: 7.w,
                              ),
                            ),
                          ),

                          SizedBox(width: 4.w),

                          // Pattern content
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  children: [
                                    Expanded(
                                      child: Text(
                                        pattern['name'] as String,
                                        style: AppTheme
                                            .lightTheme.textTheme.titleMedium
                                            ?.copyWith(
                                          color: isSelected
                                              ? AppTheme.lightTheme.colorScheme
                                                  .secondary
                                              : AppTheme.lightTheme.colorScheme
                                                  .onSurface,
                                          fontWeight: FontWeight.w600,
                                        ),
                                      ),
                                    ),
                                    if (isSelected)
                                      Container(
                                        padding: EdgeInsets.all(1.w),
                                        decoration: BoxDecoration(
                                          color: AppTheme
                                              .lightTheme.colorScheme.secondary,
                                          borderRadius:
                                              BorderRadius.circular(20),
                                        ),
                                        child: CustomIconWidget(
                                          iconName: 'check',
                                          color: AppTheme.lightTheme.colorScheme
                                              .onSecondary,
                                          size: 4.w,
                                        ),
                                      ),
                                  ],
                                ),
                                SizedBox(height: 1.h),
                                Container(
                                  padding: EdgeInsets.symmetric(
                                      horizontal: 3.w, vertical: 0.8.h),
                                  decoration: BoxDecoration(
                                    color: (pattern['color'] as Color)
                                        .withValues(alpha: 0.1),
                                    borderRadius: BorderRadius.circular(8),
                                  ),
                                  child: Text(
                                    pattern['description'] as String,
                                    style: AppTheme
                                        .lightTheme.textTheme.bodySmall
                                        ?.copyWith(
                                      color: pattern['color'] as Color,
                                      fontWeight: FontWeight.w500,
                                      letterSpacing: 0.5,
                                    ),
                                  ),
                                ),
                                SizedBox(height: 1.h),
                                Text(
                                  pattern['benefits'] as String,
                                  style: AppTheme.lightTheme.textTheme.bodySmall
                                      ?.copyWith(
                                    color: AppTheme.lightTheme.colorScheme
                                        .onSurfaceVariant,
                                    height: 1.4,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),
          ),

          // Enhanced footer
          Container(
            padding: EdgeInsets.all(5.w),
            child: Text(
              'Each pattern guides you to a deeper state of presence',
              style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                color: AppTheme.lightTheme.colorScheme.secondary
                    .withValues(alpha: 0.7),
                fontStyle: FontStyle.italic,
                letterSpacing: 0.3,
              ),
              textAlign: TextAlign.center,
            ),
          ),
        ],
      ),
    );
  }
}
