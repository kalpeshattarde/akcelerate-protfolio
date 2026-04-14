import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/category_selector.dart';
import './widgets/color_theme_selector.dart';
import './widgets/description_field.dart';
import './widgets/difficulty_slider.dart';
import './widgets/frequency_picker.dart';
import './widgets/goal_setting_section.dart';
import './widgets/habit_name_field.dart';
import './widgets/motivational_prompts.dart';
import './widgets/reminder_time_picker.dart';

class HabitCreation extends StatefulWidget {
  const HabitCreation({super.key});

  @override
  State<HabitCreation> createState() => _HabitCreationState();
}

class _HabitCreationState extends State<HabitCreation>
    with TickerProviderStateMixin {
  // Form controllers
  final TextEditingController _habitNameController = TextEditingController();
  final TextEditingController _descriptionController = TextEditingController();
  final ScrollController _scrollController = ScrollController();

  // Animation controllers
  late AnimationController _saveButtonController;
  late Animation<double> _saveButtonAnimation;
  late AnimationController _successController;
  late Animation<double> _successAnimation;

  // Form state
  String? _selectedCategory;
  String _selectedFrequency = 'Daily';
  List<String> _customDays = [];
  int? _targetValue;
  String _selectedUnit = 'times';
  TimeOfDay? _reminderTime;
  Color _selectedColor = const Color(0xFF2D5A3D);
  double _difficulty = 1.0;
  List<String> _selectedPrompts = [];

  // Validation state
  String? _habitNameError;
  bool _isFormValid = false;
  bool _isSaving = false;

  @override
  void initState() {
    super.initState();
    _initializeAnimations();
    _habitNameController.addListener(_validateForm);
  }

  void _initializeAnimations() {
    _saveButtonController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );

    _saveButtonAnimation = Tween<double>(
      begin: 1.0,
      end: 0.95,
    ).animate(CurvedAnimation(
      parent: _saveButtonController,
      curve: Curves.easeInOut,
    ));

    _successController = AnimationController(
      duration: const Duration(milliseconds: 800),
      vsync: this,
    );

    _successAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _successController,
      curve: Curves.elasticOut,
    ));
  }

  @override
  void dispose() {
    _habitNameController.dispose();
    _descriptionController.dispose();
    _scrollController.dispose();
    _saveButtonController.dispose();
    _successController.dispose();
    super.dispose();
  }

  void _validateForm() {
    setState(() {
      final habitName = _habitNameController.text.trim();

      if (habitName.isEmpty) {
        _habitNameError = 'Habit name is required';
        _isFormValid = false;
      } else if (habitName.length < 3) {
        _habitNameError = 'Habit name must be at least 3 characters';
        _isFormValid = false;
      } else {
        _habitNameError = null;
        _isFormValid = true;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? AppTheme.primaryDark : AppTheme.primaryLight,
      body: SafeArea(
        child: Column(
          children: [
            _buildHeader(context, isDark),
            Expanded(
              child: _buildForm(context, isDark),
            ),
            _buildBottomSection(context, isDark),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader(BuildContext context, bool isDark) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
      decoration: BoxDecoration(
        color: isDark ? AppTheme.surfaceDark : AppTheme.surfaceLight,
        boxShadow: [
          BoxShadow(
            color: isDark
                ? Colors.white.withValues(alpha: 0.05)
                : Colors.black.withValues(alpha: 0.08),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Row(
        children: [
          GestureDetector(
            onTap: () {
              HapticFeedback.lightImpact();
              Navigator.pop(context);
            },
            child: Container(
              padding: EdgeInsets.all(2.w),
              decoration: BoxDecoration(
                color: (isDark
                        ? AppTheme.textSecondaryDark
                        : AppTheme.textSecondaryLight)
                    .withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(
                'Cancel',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: isDark
                      ? AppTheme.textSecondaryDark
                      : AppTheme.textSecondaryLight,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
          ),
          Expanded(
            child: Center(
              child: Text(
                'Create Habit',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  color: isDark
                      ? AppTheme.textPrimaryDark
                      : AppTheme.textPrimaryLight,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          ),
          AnimatedBuilder(
            animation: _saveButtonAnimation,
            builder: (context, child) {
              return Transform.scale(
                scale: _saveButtonAnimation.value,
                child: GestureDetector(
                  onTap: _isFormValid && !_isSaving ? _saveHabit : null,
                  child: Container(
                    padding:
                        EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.w),
                    decoration: BoxDecoration(
                      color: _isFormValid && !_isSaving
                          ? (isDark
                              ? AppTheme.secondaryDark
                              : AppTheme.secondaryLight)
                          : (isDark
                              ? AppTheme.borderDark
                              : AppTheme.borderLight),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: _isSaving
                        ? SizedBox(
                            width: 4.w,
                            height: 4.w,
                            child: CircularProgressIndicator(
                              strokeWidth: 2,
                              valueColor: AlwaysStoppedAnimation<Color>(
                                isDark
                                    ? AppTheme.primaryDark
                                    : AppTheme.primaryLight,
                              ),
                            ),
                          )
                        : Text(
                            'Save',
                            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                              color: _isFormValid
                                  ? (isDark
                                      ? AppTheme.primaryDark
                                      : AppTheme.primaryLight)
                                  : (isDark
                                      ? AppTheme.textSecondaryDark
                                      : AppTheme.textSecondaryLight),
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                  ),
                ),
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildForm(BuildContext context, bool isDark) {
    return SingleChildScrollView(
      controller: _scrollController,
      padding: EdgeInsets.all(4.w),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          HabitNameField(
            controller: _habitNameController,
            onChanged: (value) => _validateForm(),
            errorText: _habitNameError,
          ),
          SizedBox(height: 4.h),
          CategorySelector(
            selectedCategory: _selectedCategory,
            onCategorySelected: (category) {
              setState(() {
                _selectedCategory = category;
              });
            },
          ),
          SizedBox(height: 4.h),
          FrequencyPicker(
            selectedFrequency: _selectedFrequency,
            customDays: _customDays,
            onFrequencyChanged: (frequency) {
              setState(() {
                _selectedFrequency = frequency;
                if (frequency != 'Custom') {
                  _customDays.clear();
                }
              });
            },
            onCustomDaysChanged: (days) {
              setState(() {
                _customDays = days;
              });
            },
          ),
          SizedBox(height: 4.h),
          GoalSettingSection(
            targetValue: _targetValue,
            selectedUnit: _selectedUnit,
            onTargetChanged: (value) {
              setState(() {
                _targetValue = value;
              });
            },
            onUnitChanged: (unit) {
              setState(() {
                _selectedUnit = unit;
              });
            },
          ),
          SizedBox(height: 4.h),
          ReminderTimePicker(
            selectedTime: _reminderTime,
            onTimeChanged: (time) {
              setState(() {
                _reminderTime = time;
              });
            },
          ),
          SizedBox(height: 4.h),
          DescriptionField(
            controller: _descriptionController,
            onChanged: (value) {},
          ),
          SizedBox(height: 4.h),
          ColorThemeSelector(
            selectedColor: _selectedColor,
            onColorSelected: (color) {
              setState(() {
                _selectedColor = color;
              });
            },
          ),
          SizedBox(height: 4.h),
          DifficultySlider(
            difficulty: _difficulty,
            onDifficultyChanged: (difficulty) {
              setState(() {
                _difficulty = difficulty;
              });
            },
          ),
          SizedBox(height: 4.h),
          MotivationalPrompts(
            selectedPrompts: _selectedPrompts,
            onPromptsChanged: (prompts) {
              setState(() {
                _selectedPrompts = prompts;
              });
            },
          ),
          SizedBox(height: 8.h), // Extra space for bottom section
        ],
      ),
    );
  }

  Widget _buildBottomSection(BuildContext context, bool isDark) {
    return Container(
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: isDark ? AppTheme.surfaceDark : AppTheme.surfaceLight,
        boxShadow: [
          BoxShadow(
            color: isDark
                ? Colors.white.withValues(alpha: 0.05)
                : Colors.black.withValues(alpha: 0.08),
            blurRadius: 8,
            offset: const Offset(0, -2),
          ),
        ],
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (!_isFormValid)
            Container(
              width: double.infinity,
              padding: EdgeInsets.all(3.w),
              margin: EdgeInsets.only(bottom: 2.h),
              decoration: BoxDecoration(
                color: (isDark ? AppTheme.warningDark : AppTheme.warningLight)
                    .withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(8),
                border: Border.all(
                  color: (isDark ? AppTheme.warningDark : AppTheme.warningLight)
                      .withValues(alpha: 0.3),
                ),
              ),
              child: Row(
                children: [
                  CustomIconWidget(
                    iconName: 'info_outline',
                    size: 5.w,
                    color:
                        isDark ? AppTheme.warningDark : AppTheme.warningLight,
                  ),
                  SizedBox(width: 3.w),
                  Expanded(
                    child: Text(
                      'Please complete the required fields to save your habit',
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                            color: isDark
                                ? AppTheme.warningDark
                                : AppTheme.warningLight,
                            fontWeight: FontWeight.w500,
                          ),
                    ),
                  ),
                ],
              ),
            ),
          Text(
            'Your habit will be ready to track once saved',
            textAlign: TextAlign.center,
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
                  color: isDark
                      ? AppTheme.textSecondaryDark
                      : AppTheme.textSecondaryLight,
                ),
          ),
        ],
      ),
    );
  }

  Future<void> _saveHabit() async {
    if (!_isFormValid || _isSaving) return;

    setState(() {
      _isSaving = true;
    });

    HapticFeedback.mediumImpact();
    _saveButtonController.forward();

    // Simulate saving process
    await Future.delayed(const Duration(milliseconds: 1500));

    // Success animation
    await _successController.forward();

    HapticFeedback.heavyImpact();

    // Navigate back to dashboard
    if (mounted) {
      Navigator.pushReplacementNamed(context, '/habit-dashboard');
    }
  }
}