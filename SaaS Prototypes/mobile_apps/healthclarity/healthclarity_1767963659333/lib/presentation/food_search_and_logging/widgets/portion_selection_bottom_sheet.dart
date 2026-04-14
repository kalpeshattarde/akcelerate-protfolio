import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class PortionSelectionBottomSheet extends StatefulWidget {
  final Map<String, dynamic> foodItem;
  final Function(Map<String, dynamic>) onAddToLog;

  const PortionSelectionBottomSheet({
    Key? key,
    required this.foodItem,
    required this.onAddToLog,
  }) : super(key: key);

  @override
  State<PortionSelectionBottomSheet> createState() =>
      _PortionSelectionBottomSheetState();
}

class _PortionSelectionBottomSheetState
    extends State<PortionSelectionBottomSheet> {
  String selectedServing = '1 serving';
  double customWeight = 100.0;
  bool isCustomWeight = false;
  final TextEditingController weightController = TextEditingController();

  final List<String> commonServings = [
    '1 serving',
    '1 cup',
    '1 piece',
    '100g',
    '1 tbsp',
    '1 slice',
  ];

  @override
  void initState() {
    super.initState();
    weightController.text = customWeight.toString();
  }

  @override
  void dispose() {
    weightController.dispose();
    super.dispose();
  }

  double _calculateCalories() {
    final baseCalories = widget.foodItem['calories'] as int;
    if (isCustomWeight) {
      return (baseCalories * customWeight) / 100;
    }
    return baseCalories.toDouble();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            margin: EdgeInsets.only(top: 2.h),
            width: 12.w,
            height: 0.5.h,
            decoration: BoxDecoration(
              color: AppTheme.lightTheme.colorScheme.outline,
              borderRadius: BorderRadius.circular(2),
            ),
          ),
          Padding(
            padding: EdgeInsets.all(4.w),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    ClipRRect(
                      borderRadius: BorderRadius.circular(8),
                      child: CustomImageWidget(
                        imageUrl: widget.foodItem['image'] as String,
                        width: 15.w,
                        height: 15.w,
                        fit: BoxFit.cover,
                      ),
                    ),
                    SizedBox(width: 4.w),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            widget.foodItem['name'] as String,
                            style: AppTheme.lightTheme.textTheme.titleLarge,
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                          ),
                          SizedBox(height: 0.5.h),
                          Text(
                            widget.foodItem['brand'] as String,
                            style: AppTheme.lightTheme.textTheme.bodyMedium
                                ?.copyWith(
                              color: AppTheme
                                  .lightTheme.colorScheme.onSurfaceVariant,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                SizedBox(height: 3.h),
                Text(
                  'Serving Size',
                  style: AppTheme.lightTheme.textTheme.titleMedium,
                ),
                SizedBox(height: 2.h),
                Wrap(
                  spacing: 2.w,
                  runSpacing: 1.h,
                  children: commonServings.map((serving) {
                    final isSelected =
                        selectedServing == serving && !isCustomWeight;
                    return GestureDetector(
                      onTap: () {
                        setState(() {
                          selectedServing = serving;
                          isCustomWeight = false;
                        });
                      },
                      child: Container(
                        padding: EdgeInsets.symmetric(
                            horizontal: 4.w, vertical: 1.h),
                        decoration: BoxDecoration(
                          color: isSelected
                              ? AppTheme.lightTheme.colorScheme.primaryContainer
                              : AppTheme.lightTheme.colorScheme.surface,
                          border: Border.all(
                            color: isSelected
                                ? AppTheme.lightTheme.colorScheme.primary
                                : AppTheme.lightTheme.colorScheme.outline,
                          ),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Text(
                          serving,
                          style: AppTheme.lightTheme.textTheme.bodyMedium
                              ?.copyWith(
                            color: isSelected
                                ? AppTheme.lightTheme.colorScheme.primary
                                : AppTheme.lightTheme.colorScheme.onSurface,
                          ),
                        ),
                      ),
                    );
                  }).toList(),
                ),
                SizedBox(height: 2.h),
                Row(
                  children: [
                    Checkbox(
                      value: isCustomWeight,
                      onChanged: (value) {
                        setState(() {
                          isCustomWeight = value ?? false;
                        });
                      },
                    ),
                    Text(
                      'Custom weight (grams)',
                      style: AppTheme.lightTheme.textTheme.bodyMedium,
                    ),
                  ],
                ),
                isCustomWeight
                    ? Container(
                        margin: EdgeInsets.only(top: 1.h),
                        child: TextField(
                          controller: weightController,
                          keyboardType: TextInputType.number,
                          inputFormatters: [
                            FilteringTextInputFormatter.digitsOnly
                          ],
                          onChanged: (value) {
                            setState(() {
                              customWeight = double.tryParse(value) ?? 100.0;
                            });
                          },
                          decoration: InputDecoration(
                            labelText: 'Weight in grams',
                            suffixText: 'g',
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12),
                            ),
                          ),
                        ),
                      )
                    : const SizedBox.shrink(),
                SizedBox(height: 3.h),
                Container(
                  padding: EdgeInsets.all(4.w),
                  decoration: BoxDecoration(
                    color: AppTheme.lightTheme.colorScheme.primaryContainer
                        .withValues(alpha: 0.3),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Total Calories:',
                        style: AppTheme.lightTheme.textTheme.titleMedium,
                      ),
                      Text(
                        '${_calculateCalories().toStringAsFixed(0)} cal',
                        style:
                            AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                          color: AppTheme.calorieAccent,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ],
                  ),
                ),
                SizedBox(height: 3.h),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: () {
                      final logEntry =
                          Map<String, dynamic>.from(widget.foodItem);
                      logEntry['selectedServing'] = isCustomWeight
                          ? '${customWeight.toInt()}g'
                          : selectedServing;
                      logEntry['calculatedCalories'] =
                          _calculateCalories().toInt();
                      logEntry['timestamp'] = DateTime.now();

                      widget.onAddToLog(logEntry);
                      Navigator.pop(context);
                    },
                    style: ElevatedButton.styleFrom(
                      padding: EdgeInsets.symmetric(vertical: 2.h),
                    ),
                    child: Text(
                      'Add to Log',
                      style:
                          AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                        color: Colors.white,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ),
                SizedBox(height: 2.h),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
