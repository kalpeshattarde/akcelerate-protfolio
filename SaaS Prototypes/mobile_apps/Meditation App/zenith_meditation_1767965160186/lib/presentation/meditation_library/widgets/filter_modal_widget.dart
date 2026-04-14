import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../theme/app_theme.dart';

class FilterModalWidget extends StatefulWidget {
  final Map<String, dynamic> currentFilters;
  final Function(Map<String, dynamic>) onFiltersApplied;

  const FilterModalWidget({
    Key? key,
    required this.currentFilters,
    required this.onFiltersApplied,
  }) : super(key: key);

  @override
  State<FilterModalWidget> createState() => _FilterModalWidgetState();
}

class _FilterModalWidgetState extends State<FilterModalWidget> {
  late Map<String, dynamic> _filters;
  late RangeValues _durationRange;
  late double _minRating;

  @override
  void initState() {
    super.initState();
    _filters = Map.from(widget.currentFilters);
    _durationRange = RangeValues(
      (_filters['minDuration'] as double? ?? 5.0),
      (_filters['maxDuration'] as double? ?? 60.0),
    );
    _minRating = _filters['minRating'] as double? ?? 0.0;
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 80.h,
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(20.0)),
      ),
      child: Column(
        children: [
          // Handle
          Container(
            margin: EdgeInsets.only(top: 2.h),
            width: 10.w,
            height: 0.5.h,
            decoration: BoxDecoration(
              color: AppTheme.lightTheme.colorScheme.outline,
              borderRadius: BorderRadius.circular(2.0),
            ),
          ),
          // Header
          Padding(
            padding: EdgeInsets.all(4.w),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Filter Meditations',
                  style: AppTheme.lightTheme.textTheme.headlineSmall,
                ),
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
          Divider(color: AppTheme.lightTheme.colorScheme.outline),
          // Content
          Expanded(
            child: SingleChildScrollView(
              padding: EdgeInsets.all(4.w),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildDurationFilter(),
                  SizedBox(height: 4.h),
                  _buildDifficultyFilter(),
                  SizedBox(height: 4.h),
                  _buildInstructorFilter(),
                  SizedBox(height: 4.h),
                  _buildRatingFilter(),
                  SizedBox(height: 4.h),
                  _buildDownloadStatusFilter(),
                ],
              ),
            ),
          ),
          // Apply Button
          Container(
            padding: EdgeInsets.all(4.w),
            child: SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: _applyFilters,
                child: Text('Apply Filters'),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDurationFilter() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Duration (minutes)',
          style: AppTheme.lightTheme.textTheme.titleMedium,
        ),
        SizedBox(height: 2.h),
        RangeSlider(
          values: _durationRange,
          min: 5.0,
          max: 120.0,
          divisions: 23,
          labels: RangeLabels(
            '${_durationRange.start.round()}',
            '${_durationRange.end.round()}',
          ),
          onChanged: (values) {
            setState(() {
              _durationRange = values;
            });
          },
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              '${_durationRange.start.round()} min',
              style: AppTheme.lightTheme.textTheme.bodySmall,
            ),
            Text(
              '${_durationRange.end.round()} min',
              style: AppTheme.lightTheme.textTheme.bodySmall,
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildDifficultyFilter() {
    final difficulties = ['Beginner', 'Intermediate', 'Advanced'];
    final selectedDifficulties =
        _filters['difficulties'] as List<String>? ?? [];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Difficulty Level',
          style: AppTheme.lightTheme.textTheme.titleMedium,
        ),
        SizedBox(height: 2.h),
        Wrap(
          spacing: 2.w,
          runSpacing: 1.h,
          children: difficulties.map((difficulty) {
            final isSelected = selectedDifficulties.contains(difficulty);
            return FilterChip(
              label: Text(difficulty),
              selected: isSelected,
              onSelected: (selected) {
                setState(() {
                  if (selected) {
                    selectedDifficulties.add(difficulty);
                  } else {
                    selectedDifficulties.remove(difficulty);
                  }
                  _filters['difficulties'] = selectedDifficulties;
                });
              },
              backgroundColor: AppTheme.lightTheme.colorScheme.surface,
              selectedColor: AppTheme.lightTheme.colorScheme.secondary
                  .withValues(alpha: 0.2),
              checkmarkColor: AppTheme.lightTheme.colorScheme.secondary,
            );
          }).toList(),
        ),
      ],
    );
  }

  Widget _buildInstructorFilter() {
    final instructors = [
      'Sarah Johnson',
      'Michael Chen',
      'Emma Williams',
      'David Rodriguez',
      'Lisa Thompson',
    ];
    final selectedInstructors = _filters['instructors'] as List<String>? ?? [];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Instructors',
          style: AppTheme.lightTheme.textTheme.titleMedium,
        ),
        SizedBox(height: 2.h),
        Wrap(
          spacing: 2.w,
          runSpacing: 1.h,
          children: instructors.map((instructor) {
            final isSelected = selectedInstructors.contains(instructor);
            return FilterChip(
              label: Text(instructor),
              selected: isSelected,
              onSelected: (selected) {
                setState(() {
                  if (selected) {
                    selectedInstructors.add(instructor);
                  } else {
                    selectedInstructors.remove(instructor);
                  }
                  _filters['instructors'] = selectedInstructors;
                });
              },
              backgroundColor: AppTheme.lightTheme.colorScheme.surface,
              selectedColor: AppTheme.lightTheme.colorScheme.secondary
                  .withValues(alpha: 0.2),
              checkmarkColor: AppTheme.lightTheme.colorScheme.secondary,
            );
          }).toList(),
        ),
      ],
    );
  }

  Widget _buildRatingFilter() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Minimum Rating',
          style: AppTheme.lightTheme.textTheme.titleMedium,
        ),
        SizedBox(height: 2.h),
        Slider(
          value: _minRating,
          min: 0.0,
          max: 5.0,
          divisions: 10,
          label: '${_minRating.toStringAsFixed(1)} stars',
          onChanged: (value) {
            setState(() {
              _minRating = value;
            });
          },
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              '0 stars',
              style: AppTheme.lightTheme.textTheme.bodySmall,
            ),
            Text(
              '${_minRating.toStringAsFixed(1)} stars',
              style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                color: AppTheme.lightTheme.colorScheme.secondary,
                fontWeight: FontWeight.w600,
              ),
            ),
            Text(
              '5 stars',
              style: AppTheme.lightTheme.textTheme.bodySmall,
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildDownloadStatusFilter() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Download Status',
          style: AppTheme.lightTheme.textTheme.titleMedium,
        ),
        SizedBox(height: 2.h),
        CheckboxListTile(
          title: Text('Show only downloaded'),
          value: _filters['showOnlyDownloaded'] as bool? ?? false,
          onChanged: (value) {
            setState(() {
              _filters['showOnlyDownloaded'] = value ?? false;
            });
          },
          controlAffinity: ListTileControlAffinity.leading,
          contentPadding: EdgeInsets.zero,
        ),
        CheckboxListTile(
          title: Text('Show only favorites'),
          value: _filters['showOnlyFavorites'] as bool? ?? false,
          onChanged: (value) {
            setState(() {
              _filters['showOnlyFavorites'] = value ?? false;
            });
          },
          controlAffinity: ListTileControlAffinity.leading,
          contentPadding: EdgeInsets.zero,
        ),
      ],
    );
  }

  void _resetFilters() {
    setState(() {
      _filters = {
        'minDuration': 5.0,
        'maxDuration': 60.0,
        'difficulties': <String>[],
        'instructors': <String>[],
        'minRating': 0.0,
        'showOnlyDownloaded': false,
        'showOnlyFavorites': false,
      };
      _durationRange = const RangeValues(5.0, 60.0);
      _minRating = 0.0;
    });
  }

  void _applyFilters() {
    _filters['minDuration'] = _durationRange.start;
    _filters['maxDuration'] = _durationRange.end;
    _filters['minRating'] = _minRating;

    widget.onFiltersApplied(_filters);
    Navigator.pop(context);
  }
}
