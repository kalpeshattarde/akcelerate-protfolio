import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../../core/app_export.dart';

class QuickAccessToolbarWidget extends StatelessWidget {
  final Function(String) onToolTap;

  const QuickAccessToolbarWidget({
    Key? key,
    required this.onToolTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final List<Map<String, dynamic>> tools = [
      {
        'id': 'flashcards',
        'title': 'Flashcards',
        'icon': 'style',
        'color': AppTheme.lightTheme.colorScheme.primary,
        'route': '/lesson-interface',
      },
      {
        'id': 'pronunciation',
        'title': 'Pronunciation',
        'icon': 'record_voice_over',
        'color': AppTheme.getWarningColor(true),
        'route': '/pronunciation-practice',
      },
      {
        'id': 'grammar',
        'title': 'Grammar',
        'icon': 'menu_book',
        'color': AppTheme.getSuccessColor(true),
        'route': '/lesson-interface',
      },
      {
        'id': 'vocabulary',
        'title': 'Vocabulary',
        'icon': 'translate',
        'color': Colors.purple,
        'route': '/lesson-interface',
      },
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: EdgeInsets.symmetric(horizontal: 4.w),
          child: Text(
            'Quick Practice',
            style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
        SizedBox(height: 2.h),
        Padding(
          padding: EdgeInsets.symmetric(horizontal: 4.w),
          child: Row(
            children: tools.map((tool) {
              final int index = tools.indexOf(tool);
              return Expanded(
                child: Padding(
                  padding: EdgeInsets.only(
                    right: index < tools.length - 1 ? 3.w : 0,
                  ),
                  child: _buildToolButton(context, tool),
                ),
              );
            }).toList(),
          ),
        ),
      ],
    );
  }

  Widget _buildToolButton(BuildContext context, Map<String, dynamic> tool) {
    return GestureDetector(
      onTap: () {
        onToolTap(tool['id'] as String);
        Navigator.pushNamed(context, tool['route'] as String);
      },
      child: Container(
        padding: EdgeInsets.symmetric(vertical: 2.h),
        decoration: BoxDecoration(
          color: AppTheme.lightTheme.colorScheme.surface,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: (tool['color'] as Color).withValues(alpha: 0.2),
            width: 1,
          ),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.05),
              blurRadius: 8,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Tool Icon
            Container(
              width: 12.w,
              height: 12.w,
              decoration: BoxDecoration(
                color: (tool['color'] as Color).withValues(alpha: 0.1),
                shape: BoxShape.circle,
              ),
              child: Center(
                child: CustomIconWidget(
                  iconName: tool['icon'] as String,
                  color: tool['color'] as Color,
                  size: 24,
                ),
              ),
            ),
            SizedBox(height: 1.h),

            // Tool Title
            Text(
              tool['title'] as String,
              style: AppTheme.lightTheme.textTheme.labelMedium?.copyWith(
                fontWeight: FontWeight.w500,
                color: AppTheme.lightTheme.colorScheme.onSurface,
              ),
              textAlign: TextAlign.center,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
          ],
        ),
      ),
    );
  }
}
