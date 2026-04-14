import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../theme/app_theme.dart';

class FilterModalWidget extends StatefulWidget {
  final Map<String, dynamic> currentFilters;
  final Function(Map<String, dynamic>) onApplyFilters;

  const FilterModalWidget({
    Key? key,
    required this.currentFilters,
    required this.onApplyFilters,
  }) : super(key: key);

  @override
  State<FilterModalWidget> createState() => _FilterModalWidgetState();
}

class _FilterModalWidgetState extends State<FilterModalWidget> {
  late Map<String, dynamic> _filters;
  RangeValues _durationRange = const RangeValues(5, 60);
  String _selectedInstructor = 'All';
  String _selectedDifficulty = 'All';
  bool _recentlyAdded = false;

  final List<String> _instructors = [
    'All',
    'Sarah Johnson',
    'Michael Chen',
    'Emma Williams',
    'David Rodriguez'
  ];

  final List<String> _difficulties = [
    'All',
    'Beginner',
    'Intermediate',
    'Advanced'
  ];

  @override
  void initState() {
    super.initState();
    _filters = Map.from(widget.currentFilters);
    _initializeFilters();
  }

  void _initializeFilters() {
    _durationRange = RangeValues(
      (_filters['minDuration'] ?? 5).toDouble(),
      (_filters['maxDuration'] ?? 60).toDouble(),
    );
    _selectedInstructor = _filters['instructor'] ?? 'All';
    _selectedDifficulty = _filters['difficulty'] ?? 'All';
    _recentlyAdded = _filters['recentlyAdded'] ?? false;
  }

  void _applyFilters() {
    final filters = {
      'minDuration': _durationRange.start.round(),
      'maxDuration': _durationRange.end.round(),
      'instructor': _selectedInstructor,
      'difficulty': _selectedDifficulty,
      'recentlyAdded': _recentlyAdded,
    };

    widget.onApplyFilters(filters);
    Navigator.pop(context);
  }

  void _resetFilters() {
    setState(() {
      _durationRange = const RangeValues(5, 60);
      _selectedInstructor = 'All';
      _selectedDifficulty = 'All';
      _recentlyAdded = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 80.h,
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.scaffoldBackgroundColor,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
      ),
      child: Column(
        children: [
          // Handle bar
          Container(
            margin: EdgeInsets.only(top: 2.h),
            width: 12.w,
            height: 0.5.h,
            decoration: BoxDecoration(
              color: AppTheme.lightTheme.colorScheme.onSurfaceVariant
                  .withValues(alpha: 0.3),
              borderRadius: BorderRadius.circular(2),
            ),
          ),

          // Header
          Padding(
            padding: EdgeInsets.all(4.w),
            child: Row(
              children: [
                Text(
                  'Filter Meditations',
                  style: AppTheme.lightTheme.textTheme.headlineSmall?.copyWith(
                    color: AppTheme.lightTheme.colorScheme.onSurface,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const Spacer(),
                TextButton(
                  onPressed: _resetFilters,
                  child: Text(
                    'Reset',
                    style: AppTheme.lightTheme.textTheme.labelLarge?.copyWith(
                      color: AppTheme.lightTheme.colorScheme.secondary,
                    ),
                  ),
                ),
              ],
            ),
          ),

          // Filter content
          Expanded(
            child: SingleChildScrollView(
              padding: EdgeInsets.symmetric(horizontal: 4.w),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Duration filter
                  _buildSectionTitle('Duration'),
                  SizedBox(height: 2.h),

                  Container(
                    padding: EdgeInsets.all(4.w),
                    decoration: BoxDecoration(
                      color: AppTheme.lightTheme.colorScheme.surface,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Column(
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              '${_durationRange.start.round()} min',
                              style: AppTheme.lightTheme.textTheme.labelMedium
                                  ?.copyWith(
                                color:
                                    AppTheme.lightTheme.colorScheme.onSurface,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                            Text(
                              '${_durationRange.end.round()} min',
                              style: AppTheme.lightTheme.textTheme.labelMedium
                                  ?.copyWith(
                                color:
                                    AppTheme.lightTheme.colorScheme.onSurface,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                          ],
                        ),
                        RangeSlider(
                          values: _durationRange,
                          min: 1,
                          max: 120,
                          divisions: 119,
                          activeColor:
                              AppTheme.lightTheme.colorScheme.secondary,
                          inactiveColor: AppTheme
                              .lightTheme.colorScheme.onSurfaceVariant
                              .withValues(alpha: 0.3),
                          onChanged: (values) {
                            setState(() {
                              _durationRange = values;
                            });
                          },
                        ),
                      ],
                    ),
                  ),

                  SizedBox(height: 3.h),

                  // Instructor filter
                  _buildSectionTitle('Instructor'),
                  SizedBox(height: 2.h),

                  Container(
                    padding: EdgeInsets.all(4.w),
                    decoration: BoxDecoration(
                      color: AppTheme.lightTheme.colorScheme.surface,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Column(
                      children: _instructors
                          .map(
                            (instructor) => _buildRadioTile(
                              title: instructor,
                              value: instructor,
                              groupValue: _selectedInstructor,
                              onChanged: (value) {
                                setState(() {
                                  _selectedInstructor = value ?? 'All';
                                });
                              },
                            ),
                          )
                          .toList(),
                    ),
                  ),

                  SizedBox(height: 3.h),

                  // Difficulty filter
                  _buildSectionTitle('Difficulty Level'),
                  SizedBox(height: 2.h),

                  Container(
                    padding: EdgeInsets.all(4.w),
                    decoration: BoxDecoration(
                      color: AppTheme.lightTheme.colorScheme.surface,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Column(
                      children: _difficulties
                          .map(
                            (difficulty) => _buildRadioTile(
                              title: difficulty,
                              value: difficulty,
                              groupValue: _selectedDifficulty,
                              onChanged: (value) {
                                setState(() {
                                  _selectedDifficulty = value ?? 'All';
                                });
                              },
                            ),
                          )
                          .toList(),
                    ),
                  ),

                  SizedBox(height: 3.h),

                  // Recently added filter
                  _buildSectionTitle('Recently Added'),
                  SizedBox(height: 2.h),

                  Container(
                    padding: EdgeInsets.all(4.w),
                    decoration: BoxDecoration(
                      color: AppTheme.lightTheme.colorScheme.surface,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: SwitchListTile(
                      title: Text(
                        'Show only recently added meditations',
                        style:
                            AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                          color: AppTheme.lightTheme.colorScheme.onSurface,
                        ),
                      ),
                      value: _recentlyAdded,
                      onChanged: (value) {
                        setState(() {
                          _recentlyAdded = value;
                        });
                      },
                      activeColor: AppTheme.lightTheme.colorScheme.secondary,
                      contentPadding: EdgeInsets.zero,
                    ),
                  ),

                  SizedBox(height: 4.h),
                ],
              ),
            ),
          ),

          // Apply button
          Container(
            padding: EdgeInsets.all(4.w),
            child: SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: _applyFilters,
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppTheme.lightTheme.colorScheme.secondary,
                  foregroundColor: AppTheme.lightTheme.colorScheme.onSecondary,
                  padding: EdgeInsets.symmetric(vertical: 2.h),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(24),
                  ),
                ),
                child: Text(
                  'Apply Filters',
                  style: AppTheme.lightTheme.textTheme.labelLarge?.copyWith(
                    color: AppTheme.lightTheme.colorScheme.onSecondary,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Text(
      title,
      style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
        color: AppTheme.lightTheme.colorScheme.onSurface,
        fontWeight: FontWeight.w600,
      ),
    );
  }

  Widget _buildRadioTile({
    required String title,
    required String value,
    required String groupValue,
    required Function(String?) onChanged,
  }) {
    return RadioListTile<String>(
      title: Text(
        title,
        style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
          color: AppTheme.lightTheme.colorScheme.onSurface,
        ),
      ),
      value: value,
      groupValue: groupValue,
      onChanged: onChanged,
      activeColor: AppTheme.lightTheme.colorScheme.secondary,
      contentPadding: EdgeInsets.zero,
      dense: true,
    );
  }
}
