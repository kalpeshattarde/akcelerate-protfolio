import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../theme/app_theme.dart';

class MacroPreferencesWidget extends StatefulWidget {
  final Function(Map<String, double>) onMacrosSet;
  final Map<String, double> initialMacros;

  const MacroPreferencesWidget({
    Key? key,
    required this.onMacrosSet,
    this.initialMacros = const {
      'carbs': 50.0,
      'protein': 25.0,
      'fats': 25.0,
    },
  }) : super(key: key);

  @override
  State<MacroPreferencesWidget> createState() => _MacroPreferencesWidgetState();
}

class _MacroPreferencesWidgetState extends State<MacroPreferencesWidget> {
  late Map<String, double> _macros;
  String? _errorMessage;

  @override
  void initState() {
    super.initState();
    _macros = Map.from(widget.initialMacros);
  }

  void _updateMacro(String macro, double value) {
    setState(() {
      _macros[macro] = value;
      _errorMessage = null;
    });

    final total = _macros.values.reduce((a, b) => a + b);
    if ((total - 100).abs() > 0.1) {
      setState(() {
        _errorMessage = 'Macro percentages must total 100%';
      });
    } else {
      widget.onMacrosSet(_macros);
    }
  }

  Color _getMacroColor(String macro) {
    switch (macro) {
      case 'carbs':
        return AppTheme.calorieAccent;
      case 'protein':
        return AppTheme.waterAccent;
      case 'fats':
        return AppTheme.successState;
      default:
        return AppTheme.neutralGray;
    }
  }

  String _getMacroLabel(String macro) {
    switch (macro) {
      case 'carbs':
        return 'Carbohydrates';
      case 'protein':
        return 'Protein';
      case 'fats':
        return 'Fats';
      default:
        return macro;
    }
  }

  @override
  Widget build(BuildContext context) {
    final total = _macros.values.reduce((a, b) => a + b);

    return Container(
      width: double.infinity,
      padding: EdgeInsets.symmetric(horizontal: 6.w, vertical: 4.h),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          // Title and Description
          Text(
            'Macro Preferences',
            style: AppTheme.lightTheme.textTheme.headlineSmall?.copyWith(
              color: AppTheme.primaryTextLight,
              fontWeight: FontWeight.w700,
            ),
            textAlign: TextAlign.center,
          ),

          SizedBox(height: 2.h),

          Text(
            'Customize your macronutrient distribution to match your dietary goals',
            style: AppTheme.lightTheme.textTheme.bodyLarge?.copyWith(
              color: AppTheme.textMediumEmphasisLight,
            ),
            textAlign: TextAlign.center,
          ),

          SizedBox(height: 4.h),

          // Macro Progress Bars
          Container(
            width: 85.w,
            padding: EdgeInsets.all(4.w),
            decoration: BoxDecoration(
              color: AppTheme.cardLight,
              borderRadius: BorderRadius.circular(12),
              boxShadow: [
                BoxShadow(
                  color: AppTheme.shadowLight,
                  blurRadius: 8,
                  offset: const Offset(0, 2),
                ),
              ],
            ),
            child: Column(
              children: [
                // Combined Progress Bar
                Container(
                  width: double.infinity,
                  height: 3.h,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(8),
                    color: AppTheme.neutralGray.withValues(alpha: 0.1),
                  ),
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(8),
                    child: Row(
                      children: [
                        // Carbs
                        Expanded(
                          flex: _macros['carbs']!.round(),
                          child: Container(
                            color: _getMacroColor('carbs'),
                          ),
                        ),
                        // Protein
                        Expanded(
                          flex: _macros['protein']!.round(),
                          child: Container(
                            color: _getMacroColor('protein'),
                          ),
                        ),
                        // Fats
                        Expanded(
                          flex: _macros['fats']!.round(),
                          child: Container(
                            color: _getMacroColor('fats'),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),

                SizedBox(height: 3.h),

                // Individual Macro Sliders
                ..._macros.entries
                    .map((entry) => _buildMacroSlider(
                          entry.key,
                          entry.value,
                        ))
                    .toList(),

                SizedBox(height: 2.h),

                // Total Percentage Display
                Container(
                  padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
                  decoration: BoxDecoration(
                    color: total == 100
                        ? AppTheme.successState.withValues(alpha: 0.1)
                        : AppTheme.warningState.withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Total:',
                        style:
                            AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                          color: AppTheme.primaryTextLight,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      Text(
                        '${total.toStringAsFixed(0)}%',
                        style:
                            AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                          color: total == 100
                              ? AppTheme.successState
                              : AppTheme.warningState,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),

          SizedBox(height: 2.h),

          // Error Message
          _errorMessage != null
              ? Container(
                  padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
                  child: Text(
                    _errorMessage!,
                    style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                      color: AppTheme.errorState,
                    ),
                    textAlign: TextAlign.center,
                  ),
                )
              : const SizedBox.shrink(),
        ],
      ),
    );
  }

  Widget _buildMacroSlider(String macro, double value) {
    return Container(
      margin: EdgeInsets.only(bottom: 2.h),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  Container(
                    width: 4.w,
                    height: 4.w,
                    decoration: BoxDecoration(
                      color: _getMacroColor(macro),
                      shape: BoxShape.circle,
                    ),
                  ),
                  SizedBox(width: 2.w),
                  Text(
                    _getMacroLabel(macro),
                    style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                      color: AppTheme.primaryTextLight,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ],
              ),
              Text(
                '${value.toStringAsFixed(0)}%',
                style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                  color: AppTheme.primaryTextLight,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ],
          ),
          SizedBox(height: 1.h),
          SliderTheme(
            data: SliderTheme.of(context).copyWith(
              activeTrackColor: _getMacroColor(macro),
              thumbColor: _getMacroColor(macro),
              overlayColor: _getMacroColor(macro).withValues(alpha: 0.2),
              inactiveTrackColor: _getMacroColor(macro).withValues(alpha: 0.2),
              trackHeight: 1.h,
              thumbShape: RoundSliderThumbShape(enabledThumbRadius: 2.w),
            ),
            child: Slider(
              value: value,
              min: 5.0,
              max: 80.0,
              divisions: 75,
              onChanged: (newValue) => _updateMacro(macro, newValue),
            ),
          ),
        ],
      ),
    );
  }
}
