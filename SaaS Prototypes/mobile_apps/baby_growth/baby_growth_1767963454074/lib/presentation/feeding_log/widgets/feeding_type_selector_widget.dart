import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

enum FeedingType { breastfeeding, bottle, solids }

class FeedingTypeSelectorWidget extends StatefulWidget {
  final FeedingType selectedType;
  final Function(FeedingType) onTypeChanged;
  final String? selectedBreastSide;
  final Function(String)? onBreastSideChanged;
  final String? bottleType;
  final Function(String)? onBottleTypeChanged;

  const FeedingTypeSelectorWidget({
    Key? key,
    required this.selectedType,
    required this.onTypeChanged,
    this.selectedBreastSide,
    this.onBreastSideChanged,
    this.bottleType,
    this.onBottleTypeChanged,
  }) : super(key: key);

  @override
  State<FeedingTypeSelectorWidget> createState() =>
      _FeedingTypeSelectorWidgetState();
}

class _FeedingTypeSelectorWidgetState extends State<FeedingTypeSelectorWidget> {
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
            color: AppTheme.lightTheme.colorScheme.shadow,
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Feeding Type',
            style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.w600,
            ),
          ),
          SizedBox(height: 2.h),
          Row(
            children: [
              Expanded(
                child: _buildTypeButton(
                  type: FeedingType.breastfeeding,
                  icon: 'favorite',
                  label: 'Breastfeeding',
                  color: AppTheme.lightTheme.colorScheme.primary,
                ),
              ),
              SizedBox(width: 2.w),
              Expanded(
                child: _buildTypeButton(
                  type: FeedingType.bottle,
                  icon: 'local_drink',
                  label: 'Bottle',
                  color: AppTheme.lightTheme.colorScheme.secondary,
                ),
              ),
              SizedBox(width: 2.w),
              Expanded(
                child: _buildTypeButton(
                  type: FeedingType.solids,
                  icon: 'restaurant',
                  label: 'Solids',
                  color: AppTheme.lightTheme.colorScheme.tertiary,
                ),
              ),
            ],
          ),
          if (widget.selectedType == FeedingType.breastfeeding) ...[
            SizedBox(height: 2.h),
            _buildBreastSideSelector(),
          ],
          if (widget.selectedType == FeedingType.bottle) ...[
            SizedBox(height: 2.h),
            _buildBottleTypeSelector(),
          ],
        ],
      ),
    );
  }

  Widget _buildTypeButton({
    required FeedingType type,
    required String icon,
    required String label,
    required Color color,
  }) {
    final bool isSelected = widget.selectedType == type;

    return GestureDetector(
      onTap: () => widget.onTypeChanged(type),
      child: Container(
        padding: EdgeInsets.symmetric(vertical: 2.h, horizontal: 2.w),
        decoration: BoxDecoration(
          color: isSelected ? color.withValues(alpha: 0.1) : Colors.transparent,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isSelected ? color : AppTheme.lightTheme.colorScheme.outline,
            width: isSelected ? 2 : 1,
          ),
        ),
        child: Column(
          children: [
            CustomIconWidget(
              iconName: icon,
              color: isSelected
                  ? color
                  : AppTheme.lightTheme.colorScheme.onSurface,
              size: 24,
            ),
            SizedBox(height: 1.h),
            Text(
              label,
              style: AppTheme.lightTheme.textTheme.labelMedium?.copyWith(
                color: isSelected
                    ? color
                    : AppTheme.lightTheme.colorScheme.onSurface,
                fontWeight: isSelected ? FontWeight.w600 : FontWeight.w400,
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildBreastSideSelector() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Breast Side',
          style: AppTheme.lightTheme.textTheme.labelLarge?.copyWith(
            fontWeight: FontWeight.w500,
          ),
        ),
        SizedBox(height: 1.h),
        Row(
          children: [
            Expanded(
              child: _buildSideButton('Left', 'left'),
            ),
            SizedBox(width: 2.w),
            Expanded(
              child: _buildSideButton('Right', 'right'),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildSideButton(String label, String value) {
    final bool isSelected = widget.selectedBreastSide == value;

    return GestureDetector(
      onTap: () => widget.onBreastSideChanged?.call(value),
      child: Container(
        padding: EdgeInsets.symmetric(vertical: 1.5.h),
        decoration: BoxDecoration(
          color: isSelected
              ? AppTheme.lightTheme.colorScheme.primary.withValues(alpha: 0.1)
              : Colors.transparent,
          borderRadius: BorderRadius.circular(8),
          border: Border.all(
            color: isSelected
                ? AppTheme.lightTheme.colorScheme.primary
                : AppTheme.lightTheme.colorScheme.outline,
            width: isSelected ? 2 : 1,
          ),
        ),
        child: Text(
          label,
          style: AppTheme.lightTheme.textTheme.labelMedium?.copyWith(
            color: isSelected
                ? AppTheme.lightTheme.colorScheme.primary
                : AppTheme.lightTheme.colorScheme.onSurface,
            fontWeight: isSelected ? FontWeight.w600 : FontWeight.w400,
          ),
          textAlign: TextAlign.center,
        ),
      ),
    );
  }

  Widget _buildBottleTypeSelector() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Bottle Content',
          style: AppTheme.lightTheme.textTheme.labelLarge?.copyWith(
            fontWeight: FontWeight.w500,
          ),
        ),
        SizedBox(height: 1.h),
        Row(
          children: [
            Expanded(
              child: _buildBottleButton('Formula', 'formula'),
            ),
            SizedBox(width: 2.w),
            Expanded(
              child: _buildBottleButton('Breast Milk', 'breast_milk'),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildBottleButton(String label, String value) {
    final bool isSelected = widget.bottleType == value;

    return GestureDetector(
      onTap: () => widget.onBottleTypeChanged?.call(value),
      child: Container(
        padding: EdgeInsets.symmetric(vertical: 1.5.h),
        decoration: BoxDecoration(
          color: isSelected
              ? AppTheme.lightTheme.colorScheme.secondary.withValues(alpha: 0.1)
              : Colors.transparent,
          borderRadius: BorderRadius.circular(8),
          border: Border.all(
            color: isSelected
                ? AppTheme.lightTheme.colorScheme.secondary
                : AppTheme.lightTheme.colorScheme.outline,
            width: isSelected ? 2 : 1,
          ),
        ),
        child: Text(
          label,
          style: AppTheme.lightTheme.textTheme.labelMedium?.copyWith(
            color: isSelected
                ? AppTheme.lightTheme.colorScheme.secondary
                : AppTheme.lightTheme.colorScheme.onSurface,
            fontWeight: isSelected ? FontWeight.w600 : FontWeight.w400,
          ),
          textAlign: TextAlign.center,
        ),
      ),
    );
  }
}
