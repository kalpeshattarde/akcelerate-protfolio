import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class NotificationsSettingsWidget extends StatefulWidget {
  final bool mealReminders;
  final bool waterAlerts;
  final bool goalAchievements;
  final TimeOfDay breakfastTime;
  final TimeOfDay lunchTime;
  final TimeOfDay dinnerTime;
  final int waterReminderInterval;
  final Function(bool) onMealRemindersChanged;
  final Function(bool) onWaterAlertsChanged;
  final Function(bool) onGoalAchievementsChanged;
  final Function(TimeOfDay, String) onMealTimeChanged;
  final Function(int) onWaterReminderIntervalChanged;

  const NotificationsSettingsWidget({
    Key? key,
    required this.mealReminders,
    required this.waterAlerts,
    required this.goalAchievements,
    required this.breakfastTime,
    required this.lunchTime,
    required this.dinnerTime,
    required this.waterReminderInterval,
    required this.onMealRemindersChanged,
    required this.onWaterAlertsChanged,
    required this.onGoalAchievementsChanged,
    required this.onMealTimeChanged,
    required this.onWaterReminderIntervalChanged,
  }) : super(key: key);

  @override
  State<NotificationsSettingsWidget> createState() =>
      _NotificationsSettingsWidgetState();
}

class _NotificationsSettingsWidgetState
    extends State<NotificationsSettingsWidget> {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Meal Reminders Section
        _buildNotificationToggle(
          title: 'Meal Reminders',
          subtitle: 'Get notified when it\'s time to log your meals',
          iconName: 'restaurant',
          iconColor: AppTheme.calorieAccent,
          value: widget.mealReminders,
          onChanged: widget.onMealRemindersChanged,
        ),
        if (widget.mealReminders) ...[
          SizedBox(height: 1.h),
          _buildMealTimesSection(),
        ],
        SizedBox(height: 2.h),

        // Water Alerts Section
        _buildNotificationToggle(
          title: 'Water Alerts',
          subtitle: 'Regular reminders to stay hydrated',
          iconName: 'water_drop',
          iconColor: AppTheme.waterAccent,
          value: widget.waterAlerts,
          onChanged: widget.onWaterAlertsChanged,
        ),
        if (widget.waterAlerts) ...[
          SizedBox(height: 1.h),
          _buildWaterIntervalSection(),
        ],
        SizedBox(height: 2.h),

        // Goal Achievements Section
        _buildNotificationToggle(
          title: 'Goal Achievements',
          subtitle: 'Celebrate when you reach your daily goals',
          iconName: 'emoji_events',
          iconColor: AppTheme.successState,
          value: widget.goalAchievements,
          onChanged: widget.onGoalAchievementsChanged,
        ),
        SizedBox(height: 2.h),

        // Notification Permissions Info
        _buildPermissionsInfo(),
      ],
    );
  }

  Widget _buildNotificationToggle({
    required String title,
    required String subtitle,
    required String iconName,
    required Color iconColor,
    required bool value,
    required Function(bool) onChanged,
  }) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 2.h),
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.surface.withValues(alpha: 0.5),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: Theme.of(context).colorScheme.outline.withValues(alpha: 0.2),
          width: 1,
        ),
      ),
      child: Row(
        children: [
          // Icon
          Container(
            width: 10.w,
            height: 10.w,
            decoration: BoxDecoration(
              color: iconColor.withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Center(
              child: CustomIconWidget(
                iconName: iconName,
                color: iconColor,
                size: 5.w,
              ),
            ),
          ),
          SizedBox(width: 3.w),
          // Title and Subtitle
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        fontWeight: FontWeight.w500,
                        color: Theme.of(context).colorScheme.onSurface,
                      ),
                ),
                SizedBox(height: 0.5.h),
                Text(
                  subtitle,
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                        color: Theme.of(context).colorScheme.onSurfaceVariant,
                      ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ),
          ),
          SizedBox(width: 2.w),
          // Switch
          Switch(
            value: value,
            onChanged: onChanged,
          ),
        ],
      ),
    );
  }

  Widget _buildMealTimesSection() {
    return Container(
      padding: EdgeInsets.all(3.w),
      decoration: BoxDecoration(
        color: AppTheme.calorieAccent.withValues(alpha: 0.05),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: AppTheme.calorieAccent.withValues(alpha: 0.2),
          width: 1,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Meal Times',
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  fontWeight: FontWeight.w600,
                  color: AppTheme.calorieAccent,
                ),
          ),
          SizedBox(height: 1.h),
          _buildMealTimeItem('Breakfast', widget.breakfastTime, 'breakfast'),
          SizedBox(height: 0.5.h),
          _buildMealTimeItem('Lunch', widget.lunchTime, 'lunch'),
          SizedBox(height: 0.5.h),
          _buildMealTimeItem('Dinner', widget.dinnerTime, 'dinner'),
        ],
      ),
    );
  }

  Widget _buildMealTimeItem(String mealName, TimeOfDay time, String mealType) {
    return InkWell(
      onTap: () => _selectMealTime(mealType, time),
      borderRadius: BorderRadius.circular(6),
      child: Container(
        padding: EdgeInsets.symmetric(horizontal: 2.w, vertical: 1.h),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              mealName,
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    fontWeight: FontWeight.w500,
                  ),
            ),
            Row(
              children: [
                Text(
                  time.format(context),
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        color: AppTheme.calorieAccent,
                        fontWeight: FontWeight.w600,
                      ),
                ),
                SizedBox(width: 1.w),
                CustomIconWidget(
                  iconName: 'schedule',
                  color: AppTheme.calorieAccent,
                  size: 4.w,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildWaterIntervalSection() {
    return Container(
      padding: EdgeInsets.all(3.w),
      decoration: BoxDecoration(
        color: AppTheme.waterAccent.withValues(alpha: 0.05),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: AppTheme.waterAccent.withValues(alpha: 0.2),
          width: 1,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Reminder Interval',
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  fontWeight: FontWeight.w600,
                  color: AppTheme.waterAccent,
                ),
          ),
          SizedBox(height: 1.h),
          Row(
            children: [
              Expanded(
                child: Text(
                  'Every ${widget.waterReminderInterval} hours',
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        fontWeight: FontWeight.w500,
                      ),
                ),
              ),
              Row(
                children: [
                  IconButton(
                    onPressed: widget.waterReminderInterval > 1
                        ? () => widget.onWaterReminderIntervalChanged(
                            widget.waterReminderInterval - 1)
                        : null,
                    icon: CustomIconWidget(
                      iconName: 'remove',
                      color: widget.waterReminderInterval > 1
                          ? AppTheme.waterAccent
                          : Theme.of(context).colorScheme.onSurfaceVariant,
                      size: 4.w,
                    ),
                  ),
                  Container(
                    padding:
                        EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
                    decoration: BoxDecoration(
                      color: AppTheme.waterAccent.withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: Text(
                      '${widget.waterReminderInterval}h',
                      style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                            fontWeight: FontWeight.w600,
                            color: AppTheme.waterAccent,
                          ),
                    ),
                  ),
                  IconButton(
                    onPressed: widget.waterReminderInterval < 8
                        ? () => widget.onWaterReminderIntervalChanged(
                            widget.waterReminderInterval + 1)
                        : null,
                    icon: CustomIconWidget(
                      iconName: 'add',
                      color: widget.waterReminderInterval < 8
                          ? AppTheme.waterAccent
                          : Theme.of(context).colorScheme.onSurfaceVariant,
                      size: 4.w,
                    ),
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildPermissionsInfo() {
    return Container(
      padding: EdgeInsets.all(3.w),
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.surface.withValues(alpha: 0.3),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: Theme.of(context).colorScheme.outline.withValues(alpha: 0.2),
          width: 1,
        ),
      ),
      child: Row(
        children: [
          CustomIconWidget(
            iconName: 'info',
            color: Theme.of(context).colorScheme.onSurfaceVariant,
            size: 5.w,
          ),
          SizedBox(width: 2.w),
          Expanded(
            child: Text(
              'Notifications require permission. You can manage these in your device settings.',
              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: Theme.of(context).colorScheme.onSurfaceVariant,
                  ),
            ),
          ),
        ],
      ),
    );
  }

  Future<void> _selectMealTime(String mealType, TimeOfDay currentTime) async {
    final TimeOfDay? selectedTime = await showTimePicker(
      context: context,
      initialTime: currentTime,
      builder: (BuildContext context, Widget? child) {
        return Theme(
          data: Theme.of(context).copyWith(
            timePickerTheme: TimePickerThemeData(
              backgroundColor: Theme.of(context).colorScheme.surface,
              hourMinuteTextColor: Theme.of(context).colorScheme.onSurface,
              dialHandColor: AppTheme.calorieAccent,
              dialBackgroundColor:
                  AppTheme.calorieAccent.withValues(alpha: 0.1),
            ),
          ),
          child: child!,
        );
      },
    );

    if (selectedTime != null) {
      widget.onMealTimeChanged(selectedTime, mealType);
    }
  }
}
