import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class WaterIntakeWidget extends StatefulWidget {
  final int currentIntake;
  final int targetIntake;
  final Function(int) onIntakeUpdate;

  const WaterIntakeWidget({
    Key? key,
    required this.currentIntake,
    required this.targetIntake,
    required this.onIntakeUpdate,
  }) : super(key: key);

  @override
  State<WaterIntakeWidget> createState() => _WaterIntakeWidgetState();
}

class _WaterIntakeWidgetState extends State<WaterIntakeWidget> {
  void _incrementWater() {
    HapticFeedback.lightImpact();
    final newIntake = widget.currentIntake + 250; // 250ml per glass
    widget.onIntakeUpdate(newIntake);
  }

  @override
  Widget build(BuildContext context) {
    final progress = widget.currentIntake / widget.targetIntake;
    final glassesConsumed = (widget.currentIntake / 250).floor();
    final totalGlasses = (widget.targetIntake / 250).floor();

    return Container(
      padding: EdgeInsets.all(4.w),
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
      decoration: BoxDecoration(
        color: Theme.of(context).cardColor,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: Theme.of(context).colorScheme.shadow,
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Water Intake',
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w600,
                      fontSize: 14.sp,
                    ),
              ),
              Text(
                '${widget.currentIntake}ml / ${widget.targetIntake}ml',
                style: Theme.of(context).textTheme.bodySmall?.copyWith(
                      color: Theme.of(context).colorScheme.onSurfaceVariant,
                      fontSize: 10.sp,
                    ),
              ),
            ],
          ),
          SizedBox(height: 2.h),
          // Progress bar
          Container(
            height: 1.h,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(0.5.h),
              color: AppTheme.waterAccent.withValues(alpha: 0.2),
            ),
            child: FractionallySizedBox(
              alignment: Alignment.centerLeft,
              widthFactor: progress.clamp(0.0, 1.0),
              child: Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(0.5.h),
                  color: AppTheme.waterAccent,
                ),
              ),
            ),
          ),
          SizedBox(height: 2.h),
          // Water glasses
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Wrap(
                  spacing: 2.w,
                  runSpacing: 1.h,
                  children: List.generate(totalGlasses, (index) {
                    final isFilled = index < glassesConsumed;
                    return GestureDetector(
                      onTap: _incrementWater,
                      child: Container(
                        width: 8.w,
                        height: 8.w,
                        decoration: BoxDecoration(
                          color: isFilled
                              ? AppTheme.waterAccent
                              : AppTheme.waterAccent.withValues(alpha: 0.2),
                          borderRadius: BorderRadius.circular(4),
                        ),
                        child: CustomIconWidget(
                          iconName: 'local_drink',
                          color: isFilled ? Colors.white : AppTheme.waterAccent,
                          size: 5.w,
                        ),
                      ),
                    );
                  }),
                ),
              ),
              SizedBox(width: 4.w),
              ElevatedButton(
                onPressed: _incrementWater,
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppTheme.waterAccent,
                  foregroundColor: Colors.white,
                  padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    CustomIconWidget(
                      iconName: 'add',
                      color: Colors.white,
                      size: 4.w,
                    ),
                    SizedBox(width: 1.w),
                    Text(
                      '250ml',
                      style: TextStyle(
                        fontSize: 10.sp,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
