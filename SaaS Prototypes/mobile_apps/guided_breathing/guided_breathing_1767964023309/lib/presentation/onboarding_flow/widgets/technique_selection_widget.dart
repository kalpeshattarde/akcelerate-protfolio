import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class TechniqueSelectionWidget extends StatefulWidget {
  final Function(String) onTechniqueSelected;
  final String selectedTechnique;

  const TechniqueSelectionWidget({
    Key? key,
    required this.onTechniqueSelected,
    required this.selectedTechnique,
  }) : super(key: key);

  @override
  State<TechniqueSelectionWidget> createState() =>
      _TechniqueSelectionWidgetState();
}

class _TechniqueSelectionWidgetState extends State<TechniqueSelectionWidget> {
  final List<Map<String, dynamic>> techniques = [
    {
      'name': '4-7-8 Breathing',
      'key': '4-7-8',
      'description': 'Inhale for 4, hold for 7, exhale for 8 seconds',
      'benefits': 'Reduces anxiety and promotes sleep',
      'icon': 'nights_stay',
    },
    {
      'name': 'Box Breathing',
      'key': 'box',
      'description': 'Inhale, hold, exhale, hold - each for 4 seconds',
      'benefits': 'Improves focus and reduces stress',
      'icon': 'crop_square',
    },
  ];

  void _selectTechnique(String technique) {
    HapticFeedback.selectionClick();
    widget.onTechniqueSelected(technique);
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(
          'Choose Your Breathing Technique',
          style: AppTheme.lightTheme.textTheme.headlineSmall?.copyWith(
            color: AppTheme.lightTheme.colorScheme.onSurface,
            fontWeight: FontWeight.w600,
          ),
          textAlign: TextAlign.center,
        ),
        SizedBox(height: 3.h),
        Text(
          'Select a technique to try during the demonstration',
          style: AppTheme.lightTheme.textTheme.bodyLarge?.copyWith(
            color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
          ),
          textAlign: TextAlign.center,
        ),
        SizedBox(height: 4.h),
        ...techniques
            .map((technique) => _buildTechniqueCard(technique))
            .toList(),
      ],
    );
  }

  Widget _buildTechniqueCard(Map<String, dynamic> technique) {
    final bool isSelected = widget.selectedTechnique == technique['key'];

    return Container(
      margin: EdgeInsets.only(bottom: 2.h),
      child: GestureDetector(
        onTap: () => _selectTechnique(technique['key']),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 300),
          padding: EdgeInsets.all(4.w),
          decoration: BoxDecoration(
            color: isSelected
                ? AppTheme.lightTheme.colorScheme.secondary
                    .withValues(alpha: 0.2)
                : AppTheme.lightTheme.colorScheme.surface,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(
              color: isSelected
                  ? AppTheme.lightTheme.colorScheme.secondary
                  : AppTheme.lightTheme.colorScheme.outline
                      .withValues(alpha: 0.3),
              width: isSelected ? 2 : 1,
            ),
            boxShadow: [
              BoxShadow(
                color: AppTheme.lightTheme.colorScheme.shadow
                    .withValues(alpha: 0.1),
                blurRadius: 8,
                offset: const Offset(0, 2),
              ),
            ],
          ),
          child: Row(
            children: [
              Container(
                width: 12.w,
                height: 12.w,
                decoration: BoxDecoration(
                  color: isSelected
                      ? AppTheme.lightTheme.colorScheme.secondary
                      : AppTheme.lightTheme.colorScheme.secondary
                          .withValues(alpha: 0.3),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Center(
                  child: CustomIconWidget(
                    iconName: technique['icon'],
                    color: AppTheme.lightTheme.colorScheme.onSecondary,
                    size: 24,
                  ),
                ),
              ),
              SizedBox(width: 4.w),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      technique['name'],
                      style:
                          AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                        color: AppTheme.lightTheme.colorScheme.onSurface,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    SizedBox(height: 0.5.h),
                    Text(
                      technique['description'],
                      style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                        color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                      ),
                    ),
                    SizedBox(height: 0.5.h),
                    Text(
                      technique['benefits'],
                      style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                        color: AppTheme.lightTheme.colorScheme.secondary,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ],
                ),
              ),
              if (isSelected)
                CustomIconWidget(
                  iconName: 'check_circle',
                  color: AppTheme.lightTheme.colorScheme.secondary,
                  size: 24,
                ),
            ],
          ),
        ),
      ),
    );
  }
}
