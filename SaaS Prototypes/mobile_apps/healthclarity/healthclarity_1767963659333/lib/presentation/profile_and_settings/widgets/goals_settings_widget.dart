import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class GoalsSettingsWidget extends StatefulWidget {
  final int dailyCalorieTarget;
  final double carbsPercentage;
  final double proteinPercentage;
  final double fatsPercentage;
  final double waterIntakeGoal;
  final Function(int) onCalorieTargetChanged;
  final Function(double, double, double) onMacroDistributionChanged;
  final Function(double) onWaterGoalChanged;

  const GoalsSettingsWidget({
    Key? key,
    required this.dailyCalorieTarget,
    required this.carbsPercentage,
    required this.proteinPercentage,
    required this.fatsPercentage,
    required this.waterIntakeGoal,
    required this.onCalorieTargetChanged,
    required this.onMacroDistributionChanged,
    required this.onWaterGoalChanged,
  }) : super(key: key);

  @override
  State<GoalsSettingsWidget> createState() => _GoalsSettingsWidgetState();
}

class _GoalsSettingsWidgetState extends State<GoalsSettingsWidget> {
  late TextEditingController _calorieController;
  late TextEditingController _waterController;
  late double _carbsPercentage;
  late double _proteinPercentage;
  late double _fatsPercentage;

  @override
  void initState() {
    super.initState();
    _calorieController =
        TextEditingController(text: widget.dailyCalorieTarget.toString());
    _waterController =
        TextEditingController(text: widget.waterIntakeGoal.toStringAsFixed(1));
    _carbsPercentage = widget.carbsPercentage;
    _proteinPercentage = widget.proteinPercentage;
    _fatsPercentage = widget.fatsPercentage;
  }

  @override
  void dispose() {
    _calorieController.dispose();
    _waterController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Daily Calorie Target
        _buildCalorieTargetSection(),
        SizedBox(height: 2.h),
        // Macro Distribution
        _buildMacroDistributionSection(),
        SizedBox(height: 2.h),
        // Water Intake Goal
        _buildWaterGoalSection(),
      ],
    );
  }

  Widget _buildCalorieTargetSection() {
    return Container(
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: AppTheme.calorieAccent.withValues(alpha: 0.05),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: AppTheme.calorieAccent.withValues(alpha: 0.2),
          width: 1,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              CustomIconWidget(
                iconName: 'local_fire_department',
                color: AppTheme.calorieAccent,
                size: 5.w,
              ),
              SizedBox(width: 2.w),
              Text(
                'Daily Calorie Target',
                style: Theme.of(context).textTheme.titleSmall?.copyWith(
                      color: AppTheme.calorieAccent,
                      fontWeight: FontWeight.w600,
                    ),
              ),
            ],
          ),
          SizedBox(height: 1.h),
          Row(
            children: [
              Expanded(
                child: TextField(
                  controller: _calorieController,
                  keyboardType: TextInputType.number,
                  inputFormatters: [
                    FilteringTextInputFormatter.digitsOnly,
                    LengthLimitingTextInputFormatter(4),
                  ],
                  decoration: InputDecoration(
                    labelText: 'Calories',
                    suffixText: 'kcal',
                    contentPadding:
                        EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
                  ),
                  onChanged: (value) {
                    final calories = int.tryParse(value);
                    if (calories != null &&
                        calories >= 800 &&
                        calories <= 5000) {
                      widget.onCalorieTargetChanged(calories);
                    }
                  },
                ),
              ),
              SizedBox(width: 3.w),
              Column(
                children: [
                  IconButton(
                    onPressed: () => _adjustCalories(50),
                    icon: CustomIconWidget(
                      iconName: 'add',
                      color: AppTheme.calorieAccent,
                      size: 5.w,
                    ),
                  ),
                  IconButton(
                    onPressed: () => _adjustCalories(-50),
                    icon: CustomIconWidget(
                      iconName: 'remove',
                      color: AppTheme.calorieAccent,
                      size: 5.w,
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

  Widget _buildMacroDistributionSection() {
    return Container(
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: AppTheme.successState.withValues(alpha: 0.05),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: AppTheme.successState.withValues(alpha: 0.2),
          width: 1,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              CustomIconWidget(
                iconName: 'pie_chart',
                color: AppTheme.successState,
                size: 5.w,
              ),
              SizedBox(width: 2.w),
              Text(
                'Macro Distribution',
                style: Theme.of(context).textTheme.titleSmall?.copyWith(
                      color: AppTheme.successState,
                      fontWeight: FontWeight.w600,
                    ),
              ),
            ],
          ),
          SizedBox(height: 2.h),
          // Carbs Slider
          _buildMacroSlider(
            'Carbohydrates',
            _carbsPercentage,
            const Color(0xFF4CAF50),
            (value) {
              setState(() {
                _carbsPercentage = value;
                _validateMacroDistribution();
              });
            },
          ),
          SizedBox(height: 1.h),
          // Protein Slider
          _buildMacroSlider(
            'Protein',
            _proteinPercentage,
            const Color(0xFF2196F3),
            (value) {
              setState(() {
                _proteinPercentage = value;
                _validateMacroDistribution();
              });
            },
          ),
          SizedBox(height: 1.h),
          // Fats Slider
          _buildMacroSlider(
            'Fats',
            _fatsPercentage,
            const Color(0xFFFF9800),
            (value) {
              setState(() {
                _fatsPercentage = value;
                _validateMacroDistribution();
              });
            },
          ),
          SizedBox(height: 1.h),
          // Total Percentage Display
          Container(
            padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
            decoration: BoxDecoration(
              color: _getTotalPercentage() == 100
                  ? AppTheme.successState.withValues(alpha: 0.1)
                  : AppTheme.warningState.withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Total',
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                ),
                Text(
                  '${_getTotalPercentage().toStringAsFixed(0)}%',
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        fontWeight: FontWeight.w700,
                        color: _getTotalPercentage() == 100
                            ? AppTheme.successState
                            : AppTheme.warningState,
                      ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMacroSlider(
      String label, double value, Color color, Function(double) onChanged) {
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              label,
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    fontWeight: FontWeight.w500,
                  ),
            ),
            Text(
              '${value.toStringAsFixed(0)}%',
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    fontWeight: FontWeight.w600,
                    color: color,
                  ),
            ),
          ],
        ),
        SliderTheme(
          data: SliderTheme.of(context).copyWith(
            activeTrackColor: color,
            thumbColor: color,
            overlayColor: color.withValues(alpha: 0.2),
            inactiveTrackColor: color.withValues(alpha: 0.2),
          ),
          child: Slider(
            value: value,
            min: 0,
            max: 100,
            divisions: 20,
            onChanged: onChanged,
          ),
        ),
      ],
    );
  }

  Widget _buildWaterGoalSection() {
    return Container(
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: AppTheme.waterAccent.withValues(alpha: 0.05),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: AppTheme.waterAccent.withValues(alpha: 0.2),
          width: 1,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              CustomIconWidget(
                iconName: 'water_drop',
                color: AppTheme.waterAccent,
                size: 5.w,
              ),
              SizedBox(width: 2.w),
              Text(
                'Daily Water Goal',
                style: Theme.of(context).textTheme.titleSmall?.copyWith(
                      color: AppTheme.waterAccent,
                      fontWeight: FontWeight.w600,
                    ),
              ),
            ],
          ),
          SizedBox(height: 1.h),
          Row(
            children: [
              Expanded(
                child: TextField(
                  controller: _waterController,
                  keyboardType:
                      const TextInputType.numberWithOptions(decimal: true),
                  inputFormatters: [
                    FilteringTextInputFormatter.allow(
                        RegExp(r'^\d+\.?\d{0,1}')),
                  ],
                  decoration: InputDecoration(
                    labelText: 'Water Intake',
                    suffixText: 'L',
                    contentPadding:
                        EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
                  ),
                  onChanged: (value) {
                    final water = double.tryParse(value);
                    if (water != null && water >= 1.0 && water <= 10.0) {
                      widget.onWaterGoalChanged(water);
                    }
                  },
                ),
              ),
              SizedBox(width: 3.w),
              Column(
                children: [
                  IconButton(
                    onPressed: () => _adjustWater(0.1),
                    icon: CustomIconWidget(
                      iconName: 'add',
                      color: AppTheme.waterAccent,
                      size: 5.w,
                    ),
                  ),
                  IconButton(
                    onPressed: () => _adjustWater(-0.1),
                    icon: CustomIconWidget(
                      iconName: 'remove',
                      color: AppTheme.waterAccent,
                      size: 5.w,
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

  void _adjustCalories(int adjustment) {
    final currentCalories =
        int.tryParse(_calorieController.text) ?? widget.dailyCalorieTarget;
    final newCalories = (currentCalories + adjustment).clamp(800, 5000);
    _calorieController.text = newCalories.toString();
    widget.onCalorieTargetChanged(newCalories);
  }

  void _adjustWater(double adjustment) {
    final currentWater =
        double.tryParse(_waterController.text) ?? widget.waterIntakeGoal;
    final newWater = (currentWater + adjustment).clamp(1.0, 10.0);
    _waterController.text = newWater.toStringAsFixed(1);
    widget.onWaterGoalChanged(newWater);
  }

  double _getTotalPercentage() {
    return _carbsPercentage + _proteinPercentage + _fatsPercentage;
  }

  void _validateMacroDistribution() {
    if (_getTotalPercentage() == 100) {
      widget.onMacroDistributionChanged(
          _carbsPercentage, _proteinPercentage, _fatsPercentage);
    }
  }
}
