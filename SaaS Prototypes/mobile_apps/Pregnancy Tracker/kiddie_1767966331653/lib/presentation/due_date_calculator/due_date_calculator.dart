import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../widgets/custom_app_bar.dart';
import '../../widgets/custom_icon_widget.dart';
import './widgets/calculation_method_card.dart';
import './widgets/date_input_section.dart';
import './widgets/results_card.dart';

/// Due Date Calculator Screen
/// Enables expecting mothers to establish pregnancy timeline through date input
class DueDateCalculator extends StatefulWidget {
  const DueDateCalculator({super.key});

  @override
  State<DueDateCalculator> createState() => _DueDateCalculatorState();
}

class _DueDateCalculatorState extends State<DueDateCalculator> {
  // Calculation method selection
  String _selectedMethod = 'lmp'; // 'lmp' or 'conception'

  // Date selections
  DateTime? _selectedDate;

  // Validation and results
  String? _errorMessage;
  bool _showResults = false;
  DateTime? _calculatedDueDate;
  int? _currentWeek;
  String? _trimester;

  // Loading state
  bool _isCalculating = false;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      appBar: CustomAppBar.detail(
        title: 'Due Date Calculator',
        onBackPressed: () => Navigator.pop(context),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: EdgeInsets.symmetric(horizontal: 5.w, vertical: 2.h),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Progress indicator
              _buildProgressIndicator(theme),
              SizedBox(height: 3.h),

              // Header section
              _buildHeaderSection(theme),
              SizedBox(height: 4.h),

              // Calculation method selection
              if (!_showResults) ...[
                Text(
                  'Choose Calculation Method',
                  style: theme.textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w600,
                    color: theme.colorScheme.onSurface,
                  ),
                ),
                SizedBox(height: 2.h),
                _buildMethodSelection(),
                SizedBox(height: 4.h),

                // Date input section
                _buildDateInputSection(theme),
                SizedBox(height: 4.h),

                // Calculate button
                _buildCalculateButton(theme),
              ],

              // Results section
              if (_showResults && _calculatedDueDate != null) ...[
                ResultsCard(
                  dueDate: _calculatedDueDate!,
                  currentWeek: _currentWeek ?? 0,
                  trimester: _trimester ?? '',
                  onEdit: _resetCalculation,
                ),
                SizedBox(height: 3.h),
                _buildContinueButton(theme),
              ],

              SizedBox(height: 2.h),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildProgressIndicator(ThemeData theme) {
    return Row(
      children: [
        Expanded(
          child: Container(
            height: 4,
            decoration: BoxDecoration(
              color: theme.colorScheme.primary,
              borderRadius: BorderRadius.circular(2),
            ),
          ),
        ),
        SizedBox(width: 2.w),
        Expanded(
          child: Container(
            height: 4,
            decoration: BoxDecoration(
              color: theme.colorScheme.primary,
              borderRadius: BorderRadius.circular(2),
            ),
          ),
        ),
        SizedBox(width: 2.w),
        Expanded(
          child: Container(
            height: 4,
            decoration: BoxDecoration(
              color: theme.colorScheme.outline.withValues(alpha: 0.2),
              borderRadius: BorderRadius.circular(2),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildHeaderSection(ThemeData theme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Calculate Your Due Date',
          style: theme.textTheme.headlineSmall?.copyWith(
            fontWeight: FontWeight.w700,
            color: theme.colorScheme.onSurface,
          ),
        ),
        SizedBox(height: 1.h),
        Text(
          'Knowing your due date helps us provide personalized guidance throughout your pregnancy journey. Choose your preferred calculation method below.',
          style: theme.textTheme.bodyMedium?.copyWith(
            color: theme.colorScheme.onSurfaceVariant,
            height: 1.5,
          ),
        ),
      ],
    );
  }

  Widget _buildMethodSelection() {
    return Column(
      children: [
        CalculationMethodCard(
          title: 'Last Menstrual Period',
          description: 'First day of your last period',
          iconName: 'calendar_today',
          isSelected: _selectedMethod == 'lmp',
          onTap: () => setState(() {
            _selectedMethod = 'lmp';
            _selectedDate = null;
            _errorMessage = null;
          }),
        ),
        SizedBox(height: 2.h),
        CalculationMethodCard(
          title: 'Conception Date',
          description: 'Estimated date of conception',
          iconName: 'favorite',
          isSelected: _selectedMethod == 'conception',
          onTap: () => setState(() {
            _selectedMethod = 'conception';
            _selectedDate = null;
            _errorMessage = null;
          }),
        ),
      ],
    );
  }

  Widget _buildDateInputSection(ThemeData theme) {
    return DateInputSection(
      label: _selectedMethod == 'lmp'
          ? 'Select First Day of Last Period'
          : 'Select Conception Date',
      selectedDate: _selectedDate,
      onTap: _selectDate,
      errorMessage: _errorMessage,
    );
  }

  Future<void> _selectDate() async {
    final DateTime now = DateTime.now();
    final DateTime firstDate = DateTime(now.year - 1, now.month, now.day);
    final DateTime lastDate = now;

    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: _selectedDate ?? now,
      firstDate: firstDate,
      lastDate: lastDate,
      builder: (context, child) {
        final theme = Theme.of(context);
        return Theme(
          data: theme.copyWith(
            colorScheme: theme.colorScheme.copyWith(
              primary: theme.colorScheme.primary,
              onPrimary: theme.colorScheme.onPrimary,
              surface: theme.colorScheme.surface,
              onSurface: theme.colorScheme.onSurface,
            ),
          ),
          child: child!,
        );
      },
    );

    if (picked != null) {
      setState(() {
        _selectedDate = picked;
        _errorMessage = _validateDate(picked);
      });
    }
  }

  String? _validateDate(DateTime date) {
    final now = DateTime.now();
    final difference = now.difference(date).inDays;

    if (_selectedMethod == 'lmp') {
      if (difference < 0) {
        return 'Date cannot be in the future';
      }
      if (difference > 280) {
        return 'Date seems too far in the past. Please verify.';
      }
    } else {
      // Conception date
      if (difference < 0) {
        return 'Date cannot be in the future';
      }
      if (difference > 266) {
        return 'Date seems too far in the past. Please verify.';
      }
    }

    return null;
  }

  Widget _buildCalculateButton(ThemeData theme) {
    final isEnabled = _selectedDate != null && _errorMessage == null;

    return SizedBox(
      width: double.infinity,
      height: 6.h,
      child: ElevatedButton(
        onPressed: isEnabled ? _calculateDueDate : null,
        style: ElevatedButton.styleFrom(
          backgroundColor: isEnabled
              ? theme.colorScheme.primary
              : theme.colorScheme.surfaceContainerHighest,
          foregroundColor: isEnabled
              ? theme.colorScheme.onPrimary
              : theme.colorScheme.onSurfaceVariant,
          elevation: isEnabled ? 2 : 0,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
        ),
        child: _isCalculating
            ? SizedBox(
                height: 20,
                width: 20,
                child: CircularProgressIndicator(
                  strokeWidth: 2,
                  valueColor: AlwaysStoppedAnimation<Color>(
                    theme.colorScheme.onPrimary,
                  ),
                ),
              )
            : Text(
                'Calculate Due Date',
                style: theme.textTheme.labelLarge?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
      ),
    );
  }

  Future<void> _calculateDueDate() async {
    if (_selectedDate == null) return;

    setState(() => _isCalculating = true);

    // Simulate calculation delay for smooth UX
    await Future.delayed(const Duration(milliseconds: 500));

    DateTime dueDate;
    if (_selectedMethod == 'lmp') {
      // Add 280 days (40 weeks) to LMP
      dueDate = _selectedDate!.add(const Duration(days: 280));
    } else {
      // Add 266 days (38 weeks) to conception date
      dueDate = _selectedDate!.add(const Duration(days: 266));
    }

    // Calculate current week
    final now = DateTime.now();
    final daysSinceStart = _selectedMethod == 'lmp'
        ? now.difference(_selectedDate!).inDays
        : now.difference(_selectedDate!).inDays + 14;
    final currentWeek = (daysSinceStart / 7).floor();

    // Determine trimester
    String trimester;
    if (currentWeek <= 13) {
      trimester = 'First Trimester';
    } else if (currentWeek <= 27) {
      trimester = 'Second Trimester';
    } else {
      trimester = 'Third Trimester';
    }

    setState(() {
      _calculatedDueDate = dueDate;
      _currentWeek = currentWeek;
      _trimester = trimester;
      _showResults = true;
      _isCalculating = false;
    });
  }

  void _resetCalculation() {
    setState(() {
      _showResults = false;
      _selectedDate = null;
      _calculatedDueDate = null;
      _currentWeek = null;
      _trimester = null;
      _errorMessage = null;
    });
  }

  Widget _buildContinueButton(ThemeData theme) {
    return SizedBox(
      width: double.infinity,
      height: 6.h,
      child: ElevatedButton(
        onPressed: () {
          // Navigate to pregnancy setup questionnaire
          Navigator.pushNamed(context, '/pregnancy-setup-questionnaire');
        },
        style: ElevatedButton.styleFrom(
          backgroundColor: theme.colorScheme.primary,
          foregroundColor: theme.colorScheme.onPrimary,
          elevation: 2,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'Continue Setup',
              style: theme.textTheme.labelLarge?.copyWith(
                fontWeight: FontWeight.w600,
              ),
            ),
            SizedBox(width: 2.w),
            CustomIconWidget(
              iconName: 'arrow_forward',
              size: 20,
              color: theme.colorScheme.onPrimary,
            ),
          ],
        ),
      ),
    );
  }
}
