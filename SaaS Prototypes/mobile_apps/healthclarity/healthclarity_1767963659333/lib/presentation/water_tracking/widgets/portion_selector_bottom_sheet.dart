import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class PortionSelectorBottomSheet extends StatefulWidget {
  final Function(double) onPortionSelected;

  const PortionSelectorBottomSheet({
    Key? key,
    required this.onPortionSelected,
  }) : super(key: key);

  @override
  State<PortionSelectorBottomSheet> createState() =>
      _PortionSelectorBottomSheetState();
}

class _PortionSelectorBottomSheetState
    extends State<PortionSelectorBottomSheet> {
  final TextEditingController _customAmountController = TextEditingController();
  final List<Map<String, dynamic>> _presetPortions = [
    {"label": "Small Cup", "amount": 4.0, "icon": "local_cafe"},
    {"label": "Standard Glass", "amount": 8.0, "icon": "local_drink"},
    {"label": "Large Glass", "amount": 12.0, "icon": "wine_bar"},
    {"label": "Water Bottle", "amount": 16.0, "icon": "sports_bar"},
    {"label": "Large Bottle", "amount": 20.0, "icon": "liquor"},
  ];

  @override
  void dispose() {
    _customAmountController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Handle bar
          Center(
            child: Container(
              width: 12.w,
              height: 0.5.h,
              decoration: BoxDecoration(
                color: AppTheme.neutralGray.withValues(alpha: 0.3),
                borderRadius: BorderRadius.circular(2),
              ),
            ),
          ),
          SizedBox(height: 3.h),

          // Title
          Text(
            'Select Portion Size',
            style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
              color: AppTheme.primaryTextLight,
              fontWeight: FontWeight.w600,
            ),
          ),
          SizedBox(height: 3.h),

          // Preset portions
          ...(_presetPortions.map((portion) => _buildPortionOption(
                label: portion["label"] as String,
                amount: portion["amount"] as double,
                icon: portion["icon"] as String,
              ))),

          SizedBox(height: 3.h),

          // Custom amount section
          Text(
            'Custom Amount',
            style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
              color: AppTheme.primaryTextLight,
              fontWeight: FontWeight.w600,
            ),
          ),
          SizedBox(height: 2.h),

          Row(
            children: [
              Expanded(
                child: TextField(
                  controller: _customAmountController,
                  keyboardType: TextInputType.number,
                  decoration: InputDecoration(
                    hintText: 'Enter amount in oz',
                    suffixText: 'oz',
                    suffixStyle:
                        AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                      color: AppTheme.waterAccent,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
              ),
              SizedBox(width: 3.w),
              ElevatedButton(
                onPressed: () {
                  final customAmount =
                      double.tryParse(_customAmountController.text);
                  if (customAmount != null && customAmount > 0) {
                    widget.onPortionSelected(customAmount);
                    Navigator.pop(context);
                  }
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppTheme.waterAccent,
                  padding:
                      EdgeInsets.symmetric(horizontal: 6.w, vertical: 1.5.h),
                ),
                child: Text(
                  'Add',
                  style: AppTheme.lightTheme.textTheme.labelLarge?.copyWith(
                    color: Colors.white,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ],
          ),

          SizedBox(height: 4.h),
        ],
      ),
    );
  }

  Widget _buildPortionOption({
    required String label,
    required double amount,
    required String icon,
  }) {
    return Container(
      margin: EdgeInsets.only(bottom: 2.h),
      child: InkWell(
        onTap: () {
          widget.onPortionSelected(amount);
          Navigator.pop(context);
        },
        borderRadius: BorderRadius.circular(12),
        child: Container(
          padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
          decoration: BoxDecoration(
            border: Border.all(
              color: AppTheme.waterAccent.withValues(alpha: 0.2),
              width: 1,
            ),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Row(
            children: [
              CustomIconWidget(
                iconName: icon,
                color: AppTheme.waterAccent,
                size: 6.w,
              ),
              SizedBox(width: 4.w),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      label,
                      style: AppTheme.lightTheme.textTheme.bodyLarge?.copyWith(
                        color: AppTheme.primaryTextLight,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    Text(
                      '${amount.toInt()} oz',
                      style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                        color: AppTheme.textMediumEmphasisLight,
                      ),
                    ),
                  ],
                ),
              ),
              CustomIconWidget(
                iconName: 'add',
                color: AppTheme.waterAccent,
                size: 5.w,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
