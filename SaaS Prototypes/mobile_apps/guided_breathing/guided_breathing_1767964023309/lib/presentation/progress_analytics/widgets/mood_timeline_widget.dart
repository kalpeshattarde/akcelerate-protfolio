import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../theme/app_theme.dart';

class MoodTimelineWidget extends StatelessWidget {
  final List<Map<String, dynamic>> moodData;

  const MoodTimelineWidget({
    Key? key,
    required this.moodData,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.all(4.w),
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: AppTheme.shadowLight,
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Mood Timeline',
            style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurface,
              fontWeight: FontWeight.w600,
            ),
          ),
          SizedBox(height: 2.h),
          SizedBox(
            height: 20.h,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: moodData.length,
              itemBuilder: (context, index) {
                final mood = moodData[index];
                return _buildMoodItem(mood, index);
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMoodItem(Map<String, dynamic> mood, int index) {
    final moodLevel = mood['level'] as int;
    final date = mood['date'] as String;
    final note = mood['note'] as String?;

    Color moodColor;
    String moodEmoji;

    switch (moodLevel) {
      case 1:
        moodColor = AppTheme.errorColor;
        moodEmoji = '😢';
        break;
      case 2:
        moodColor = AppTheme.warningColor;
        moodEmoji = '😕';
        break;
      case 3:
        moodColor = AppTheme.lightTheme.colorScheme.onSurfaceVariant;
        moodEmoji = '😐';
        break;
      case 4:
        moodColor = AppTheme.successColor;
        moodEmoji = '🙂';
        break;
      case 5:
        moodColor = AppTheme.secondaryLight;
        moodEmoji = '😊';
        break;
      default:
        moodColor = AppTheme.lightTheme.colorScheme.onSurfaceVariant;
        moodEmoji = '😐';
    }

    return GestureDetector(
      onTap: () => _showMoodDetails(mood),
      child: Container(
        width: 15.w,
        margin: EdgeInsets.only(right: 3.w),
        child: Column(
          children: [
            // Mood indicator
            Container(
              width: 12.w,
              height: 12.w,
              decoration: BoxDecoration(
                color: moodColor.withValues(alpha: 0.2),
                shape: BoxShape.circle,
                border: Border.all(
                  color: moodColor,
                  width: 2,
                ),
              ),
              child: Center(
                child: Text(
                  moodEmoji,
                  style: TextStyle(fontSize: 6.w),
                ),
              ),
            ),
            SizedBox(height: 1.h),
            // Date
            Text(
              date,
              style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                fontWeight: FontWeight.w500,
              ),
              textAlign: TextAlign.center,
            ),
            if (note != null && note.isNotEmpty) ...[
              SizedBox(height: 0.5.h),
              Container(
                width: 1.w,
                height: 1.w,
                decoration: BoxDecoration(
                  color: AppTheme.secondaryLight,
                  shape: BoxShape.circle,
                ),
              ),
            ],
            // Connection line to next item
            if (index < moodData.length - 1) ...[
              SizedBox(height: 1.h),
              Container(
                width: 8.w,
                height: 1,
                color: AppTheme.lightTheme.colorScheme.onSurfaceVariant
                    .withValues(alpha: 0.3),
              ),
            ],
          ],
        ),
      ),
    );
  }

  void _showMoodDetails(Map<String, dynamic> mood) {
    // This would typically show a dialog or navigate to a detail screen
    // For now, we'll just print the mood details
    debugPrint('Mood details: $mood');
  }
}
