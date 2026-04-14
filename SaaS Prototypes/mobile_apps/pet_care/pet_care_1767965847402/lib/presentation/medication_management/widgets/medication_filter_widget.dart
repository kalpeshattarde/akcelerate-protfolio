import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class MedicationFilterWidget extends StatefulWidget {
  final Function(Map<String, dynamic>) onFilterChanged;
  final Map<String, dynamic> currentFilters;

  const MedicationFilterWidget({
    super.key,
    required this.onFilterChanged,
    required this.currentFilters,
  });

  @override
  State<MedicationFilterWidget> createState() => _MedicationFilterWidgetState();
}

class _MedicationFilterWidgetState extends State<MedicationFilterWidget> {
  late Map<String, dynamic> _filters;

  final List<String> _statusOptions = [
    'All',
    'Due',
    'Upcoming',
    'Completed',
    'Overdue'
  ];
  final List<String> _petOptions = ['All Pets', 'Buddy', 'Luna', 'Max'];
  final List<String> _frequencyOptions = [
    'All',
    'Once daily',
    'Twice daily',
    'Three times daily',
    'As needed'
  ];

  @override
  void initState() {
    super.initState();
    _filters = Map<String, dynamic>.from(widget.currentFilters);
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          _buildHandle(),
          _buildHeader(context),
          Flexible(
            child: SingleChildScrollView(
              padding: EdgeInsets.symmetric(horizontal: 4.w),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildStatusFilter(context),
                  SizedBox(height: 3.h),
                  _buildPetFilter(context),
                  SizedBox(height: 3.h),
                  _buildFrequencyFilter(context),
                  SizedBox(height: 3.h),
                  _buildDateRangeFilter(context),
                  SizedBox(height: 4.h),
                  _buildActionButtons(context),
                  SizedBox(height: 2.h),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildHandle() {
    final theme = Theme.of(context);

    return Container(
      width: 40,
      height: 4,
      margin: EdgeInsets.symmetric(vertical: 3.w),
      decoration: BoxDecoration(
        color: theme.brightness == Brightness.light
            ? AppTheme.dividerLight
            : AppTheme.dividerDark,
        borderRadius: BorderRadius.circular(2),
      ),
    );
  }

  Widget _buildHeader(BuildContext context) {
    final theme = Theme.of(context);

    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
      child: Row(
        children: [
          Text(
            'Filter Medications',
            style: theme.textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.w600,
            ),
          ),
          Spacer(),
          TextButton(
            onPressed: _clearAllFilters,
            child: Text(
              'Clear All',
              style: theme.textTheme.bodyMedium?.copyWith(
                color: AppTheme.primaryLight,
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStatusFilter(BuildContext context) {
    final theme = Theme.of(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Status',
          style: theme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
        SizedBox(height: 2.h),
        Wrap(
          spacing: 2.w,
          runSpacing: 1.h,
          children: _statusOptions.map((status) {
            final isSelected = _filters['status'] == status;
            return FilterChip(
              label: Text(status),
              selected: isSelected,
              onSelected: (selected) {
                setState(() {
                  _filters['status'] = selected ? status : 'All';
                });
              },
              selectedColor: AppTheme.primaryLight.withValues(alpha: 0.2),
              checkmarkColor: AppTheme.primaryLight,
              labelStyle: theme.textTheme.bodyMedium?.copyWith(
                color: isSelected ? AppTheme.primaryLight : null,
                fontWeight: isSelected ? FontWeight.w600 : FontWeight.w400,
              ),
            );
          }).toList(),
        ),
      ],
    );
  }

  Widget _buildPetFilter(BuildContext context) {
    final theme = Theme.of(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Pet',
          style: theme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
        SizedBox(height: 2.h),
        Wrap(
          spacing: 2.w,
          runSpacing: 1.h,
          children: _petOptions.map((pet) {
            final isSelected = _filters['pet'] == pet;
            return FilterChip(
              label: Text(pet),
              selected: isSelected,
              onSelected: (selected) {
                setState(() {
                  _filters['pet'] = selected ? pet : 'All Pets';
                });
              },
              selectedColor: AppTheme.secondaryLight.withValues(alpha: 0.2),
              checkmarkColor: AppTheme.secondaryLight,
              labelStyle: theme.textTheme.bodyMedium?.copyWith(
                color: isSelected ? AppTheme.secondaryLight : null,
                fontWeight: isSelected ? FontWeight.w600 : FontWeight.w400,
              ),
            );
          }).toList(),
        ),
      ],
    );
  }

  Widget _buildFrequencyFilter(BuildContext context) {
    final theme = Theme.of(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Frequency',
          style: theme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
        SizedBox(height: 2.h),
        Wrap(
          spacing: 2.w,
          runSpacing: 1.h,
          children: _frequencyOptions.map((frequency) {
            final isSelected = _filters['frequency'] == frequency;
            return FilterChip(
              label: Text(frequency),
              selected: isSelected,
              onSelected: (selected) {
                setState(() {
                  _filters['frequency'] = selected ? frequency : 'All';
                });
              },
              selectedColor: AppTheme.accentLight.withValues(alpha: 0.2),
              checkmarkColor: AppTheme.accentLight,
              labelStyle: theme.textTheme.bodyMedium?.copyWith(
                color: isSelected ? AppTheme.accentLight : null,
                fontWeight: isSelected ? FontWeight.w600 : FontWeight.w400,
              ),
            );
          }).toList(),
        ),
      ],
    );
  }

  Widget _buildDateRangeFilter(BuildContext context) {
    final theme = Theme.of(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Date Range',
          style: theme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
        SizedBox(height: 2.h),
        Row(
          children: [
            Expanded(
              child: OutlinedButton.icon(
                onPressed: () => _selectStartDate(context),
                icon: CustomIconWidget(
                  iconName: 'calendar_today',
                  color: AppTheme.primaryLight,
                  size: 18,
                ),
                label: Text(
                  _filters['startDate'] != null
                      ? _formatDate(_filters['startDate'])
                      : 'Start Date',
                ),
                style: OutlinedButton.styleFrom(
                  padding: EdgeInsets.symmetric(vertical: 2.h, horizontal: 3.w),
                ),
              ),
            ),
            SizedBox(width: 3.w),
            Expanded(
              child: OutlinedButton.icon(
                onPressed: () => _selectEndDate(context),
                icon: CustomIconWidget(
                  iconName: 'calendar_today',
                  color: AppTheme.primaryLight,
                  size: 18,
                ),
                label: Text(
                  _filters['endDate'] != null
                      ? _formatDate(_filters['endDate'])
                      : 'End Date',
                ),
                style: OutlinedButton.styleFrom(
                  padding: EdgeInsets.symmetric(vertical: 2.h, horizontal: 3.w),
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildActionButtons(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: OutlinedButton(
            onPressed: () => Navigator.of(context).pop(),
            child: Text('Cancel'),
            style: OutlinedButton.styleFrom(
              padding: EdgeInsets.symmetric(vertical: 3.h),
            ),
          ),
        ),
        SizedBox(width: 3.w),
        Expanded(
          child: ElevatedButton(
            onPressed: _applyFilters,
            child: Text('Apply Filters'),
            style: ElevatedButton.styleFrom(
              padding: EdgeInsets.symmetric(vertical: 3.h),
            ),
          ),
        ),
      ],
    );
  }

  Future<void> _selectStartDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: _filters['startDate'] ?? DateTime.now(),
      firstDate: DateTime.now().subtract(Duration(days: 365)),
      lastDate: DateTime.now().add(Duration(days: 365)),
    );

    if (picked != null) {
      setState(() {
        _filters['startDate'] = picked;
      });
    }
  }

  Future<void> _selectEndDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: _filters['endDate'] ?? DateTime.now(),
      firstDate:
          _filters['startDate'] ?? DateTime.now().subtract(Duration(days: 365)),
      lastDate: DateTime.now().add(Duration(days: 365)),
    );

    if (picked != null) {
      setState(() {
        _filters['endDate'] = picked;
      });
    }
  }

  String _formatDate(DateTime date) {
    return "${date.month}/${date.day}/${date.year}";
  }

  void _clearAllFilters() {
    setState(() {
      _filters = {
        'status': 'All',
        'pet': 'All Pets',
        'frequency': 'All',
        'startDate': null,
        'endDate': null,
      };
    });
  }

  void _applyFilters() {
    widget.onFilterChanged(_filters);
    Navigator.of(context).pop();
  }
}
