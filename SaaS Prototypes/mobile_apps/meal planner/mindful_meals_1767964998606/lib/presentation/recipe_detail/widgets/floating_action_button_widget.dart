import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class FloatingActionButtonWidget extends StatelessWidget {
  final VoidCallback onAddToMealPlan;

  const FloatingActionButtonWidget({
    Key? key,
    required this.onAddToMealPlan,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Positioned(
      right: 4.w,
      top: 30.h,
      child: FloatingActionButton.extended(
        onPressed: onAddToMealPlan,
        backgroundColor: AppTheme.lightTheme.colorScheme.primary,
        foregroundColor: AppTheme.lightTheme.colorScheme.onPrimary,
        elevation: 4,
        icon: CustomIconWidget(
          iconName: 'add',
          color: AppTheme.lightTheme.colorScheme.onPrimary,
          size: 20,
        ),
        label: Text(
          'Add to Plan',
          style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
            color: AppTheme.lightTheme.colorScheme.onPrimary,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
    );
  }
}
