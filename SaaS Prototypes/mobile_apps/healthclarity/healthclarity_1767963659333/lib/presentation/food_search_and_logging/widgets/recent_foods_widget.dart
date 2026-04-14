import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import './food_result_card_widget.dart';

class RecentFoodsWidget extends StatelessWidget {
  final List<Map<String, dynamic>> recentFoods;
  final Function(Map<String, dynamic>) onFoodTap;

  const RecentFoodsWidget({
    Key? key,
    required this.recentFoods,
    required this.onFoodTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
          child: Row(
            children: [
              CustomIconWidget(
                iconName: 'history',
                color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                size: 20,
              ),
              SizedBox(width: 2.w),
              Text(
                'Recent Foods',
                style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                  color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                ),
              ),
            ],
          ),
        ),
        ListView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          itemCount: recentFoods.length,
          itemBuilder: (context, index) {
            return FoodResultCardWidget(
              foodItem: recentFoods[index],
              onTap: () => onFoodTap(recentFoods[index]),
            );
          },
        ),
      ],
    );
  }
}
