import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class WeeklyMealCardWidget extends StatelessWidget {
  final Map<String, dynamic> dayData;
  final bool isToday;
  final VoidCallback onTap;

  const WeeklyMealCardWidget({
    Key? key,
    required this.dayData,
    required this.isToday,
    required this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;

    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 34.w,
        margin: EdgeInsets.only(right: 3.w),
        decoration: BoxDecoration(
          color: isDarkMode ? AppTheme.cardDark : AppTheme.cardLight,
          borderRadius: BorderRadius.circular(AppTheme.cardBorderRadius),
          border: isToday
              ? Border.all(
                  color:
                      isDarkMode ? AppTheme.primaryDark : AppTheme.primaryLight,
                  width: 2,
                )
              : null,
          boxShadow: isDarkMode
              ? AppTheme.darkWellnessShadow
              : AppTheme.lightWellnessShadow,
        ),
        child: Padding(
          padding: EdgeInsets.all(3.w),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Flexible(
                    child: Text(
                      dayData["dayName"] as String,
                      style: Theme.of(context).textTheme.titleSmall?.copyWith(
                            color: isToday
                                ? (isDarkMode
                                    ? AppTheme.primaryDark
                                    : AppTheme.primaryLight)
                                : null,
                            fontWeight: FontWeight.w600,
                          ),
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  if (isToday)
                    Container(
                      padding: EdgeInsets.symmetric(
                          horizontal: 2.w, vertical: 0.5.h),
                      decoration: BoxDecoration(
                        color: isDarkMode
                            ? AppTheme.primaryDark
                            : AppTheme.primaryLight,
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Text(
                        'Today',
                        style: Theme.of(context).textTheme.labelSmall?.copyWith(
                              color: isDarkMode
                                  ? AppTheme.onPrimaryDark
                                  : AppTheme.onPrimaryLight,
                              fontSize: 8.sp,
                            ),
                      ),
                    ),
                ],
              ),
              SizedBox(height: 0.5.h),
              Text(
                dayData["date"] as String,
                style: Theme.of(context).textTheme.bodySmall?.copyWith(
                      color: isDarkMode
                          ? AppTheme.textSecondaryDark
                          : AppTheme.textSecondaryLight,
                      fontSize: 10.sp,
                    ),
                overflow: TextOverflow.ellipsis,
              ),
              SizedBox(height: 1.5.h),
              Expanded(child: _buildMealsList(context, isDarkMode)),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildMealsList(BuildContext context, bool isDarkMode) {
    final meals = dayData["meals"] as List<Map<String, dynamic>>;

    if (meals.isEmpty) {
      return Container(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CustomIconWidget(
              iconName: 'add_circle_outline',
              color: isDarkMode
                  ? AppTheme.textDisabledDark
                  : AppTheme.textDisabledLight,
              size: 20,
            ),
            SizedBox(height: 1.h),
            Text(
              'Plan meals',
              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: isDarkMode
                        ? AppTheme.textDisabledDark
                        : AppTheme.textDisabledLight,
                    fontSize: 9.sp,
                  ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      );
    }

    return ListView.builder(
      shrinkWrap: true,
      physics: NeverScrollableScrollPhysics(),
      itemCount: meals.length > 3 ? 3 : meals.length,
      itemBuilder: (context, index) {
        if (index == 2 && meals.length > 3) {
          final remaining = meals.length - 2;
          return Container(
            margin: EdgeInsets.only(top: 0.5.h),
            child: Text(
              '+$remaining more',
              style: Theme.of(context).textTheme.labelSmall?.copyWith(
                    color: isDarkMode
                        ? AppTheme.primaryDark
                        : AppTheme.primaryLight,
                    fontSize: 9.sp,
                    fontWeight: FontWeight.w500,
                  ),
            ),
          );
        }
        return _buildMealItem(context, meals[index], isDarkMode);
      },
    );
  }

  Widget _buildMealItem(
      BuildContext context, Map<String, dynamic> meal, bool isDarkMode) {
    return Container(
      margin: EdgeInsets.only(bottom: 0.8.h),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(6),
            child: CustomImageWidget(
              imageUrl: meal["image"] as String,
              width: 7.w,
              height: 3.h,
              fit: BoxFit.cover,
              semanticLabel: meal["semanticLabel"] as String,
            ),
          ),
          SizedBox(width: 2.w),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  meal["name"] as String,
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                        fontWeight: FontWeight.w500,
                        fontSize: 9.sp,
                      ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
                SizedBox(height: 0.2.h),
                Text(
                  meal["type"] as String,
                  style: Theme.of(context).textTheme.labelSmall?.copyWith(
                        color: isDarkMode
                            ? AppTheme.textSecondaryDark
                            : AppTheme.textSecondaryLight,
                        fontSize: 8.sp,
                      ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}