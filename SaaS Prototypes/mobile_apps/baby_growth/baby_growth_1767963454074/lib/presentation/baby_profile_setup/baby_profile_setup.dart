import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/date_picker_widget.dart';
import './widgets/gender_selection_widget.dart';
import './widgets/measurement_input_widget.dart';
import './widgets/photo_picker_widget.dart';
import './widgets/progress_indicator_widget.dart';

class BabyProfileSetup extends StatefulWidget {
  const BabyProfileSetup({Key? key}) : super(key: key);

  @override
  State<BabyProfileSetup> createState() => _BabyProfileSetupState();
}

class _BabyProfileSetupState extends State<BabyProfileSetup>
    with TickerProviderStateMixin {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();

  String? _selectedImagePath;
  DateTime? _birthDate;
  String? _selectedGender;
  String _birthWeight = '';
  String _birthHeight = '';
  String _weightUnit = 'lbs';
  String _heightUnit = 'in';
  bool _hasUnsavedChanges = false;

  late AnimationController _celebrationController;
  late Animation<double> _celebrationAnimation;

  @override
  void initState() {
    super.initState();
    _celebrationController = AnimationController(
      duration: Duration(milliseconds: 1500),
      vsync: this,
    );
    _celebrationAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _celebrationController,
      curve: Curves.elasticOut,
    ));

    _nameController.addListener(_onFormChanged);
  }

  @override
  void dispose() {
    _nameController.dispose();
    _celebrationController.dispose();
    super.dispose();
  }

  void _onFormChanged() {
    setState(() {
      _hasUnsavedChanges = true;
    });
  }

  double _calculateProgress() {
    int completedFields = 0;
    int totalRequiredFields = 3; // Name, birth date, gender

    if (_nameController.text.trim().isNotEmpty) completedFields++;
    if (_birthDate != null) completedFields++;
    if (_selectedGender != null) completedFields++;

    return completedFields / totalRequiredFields;
  }

  bool _isFormValid() {
    return _nameController.text.trim().isNotEmpty &&
        _birthDate != null &&
        _selectedGender != null;
  }

  Future<bool> _onWillPop() async {
    if (!_hasUnsavedChanges) return true;

    return await showDialog<bool>(
          context: context,
          builder: (context) => AlertDialog(
            title: Text('Unsaved Changes'),
            content: Text(
                'You have unsaved changes. Are you sure you want to leave?'),
            actions: [
              TextButton(
                onPressed: () => Navigator.of(context).pop(false),
                child: Text('Stay'),
              ),
              TextButton(
                onPressed: () => Navigator.of(context).pop(true),
                child: Text('Leave'),
              ),
            ],
          ),
        ) ??
        false;
  }

  Future<void> _createProfile() async {
    if (!_isFormValid()) return;

    // Show loading indicator
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => Center(
        child: Container(
          padding: EdgeInsets.all(6.w),
          decoration: BoxDecoration(
            color: AppTheme.lightTheme.colorScheme.surface,
            borderRadius: BorderRadius.circular(12),
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              CircularProgressIndicator(
                color: AppTheme.lightTheme.colorScheme.primary,
              ),
              SizedBox(height: 2.h),
              Text(
                'Creating profile...',
                style: AppTheme.lightTheme.textTheme.bodyMedium,
              ),
            ],
          ),
        ),
      ),
    );

    // Simulate profile creation
    await Future.delayed(Duration(seconds: 2));

    // Close loading dialog
    Navigator.of(context).pop();

    // Show celebration animation
    await _showCelebrationDialog();

    // Navigate to dashboard
    Navigator.pushReplacementNamed(context, '/dashboard-home');
  }

  Future<void> _showCelebrationDialog() async {
    _celebrationController.forward();

    await showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => AnimatedBuilder(
        animation: _celebrationAnimation,
        builder: (context, child) {
          return Transform.scale(
            scale: _celebrationAnimation.value,
            child: AlertDialog(
              backgroundColor: AppTheme.lightTheme.colorScheme.surface,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(20),
              ),
              content: Container(
                padding: EdgeInsets.all(4.w),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    CustomIconWidget(
                      iconName: 'celebration',
                      size: 15.w,
                      color: AppTheme.lightTheme.colorScheme.primary,
                    ),
                    SizedBox(height: 2.h),
                    Text(
                      'Welcome to BabyTracker Pro!',
                      style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                        color: AppTheme.lightTheme.colorScheme.primary,
                        fontWeight: FontWeight.w600,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    SizedBox(height: 1.h),
                    Text(
                      '${_nameController.text}\'s profile has been created successfully!',
                      style: AppTheme.lightTheme.textTheme.bodyMedium,
                      textAlign: TextAlign.center,
                    ),
                    SizedBox(height: 3.h),
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        onPressed: () => Navigator.of(context).pop(),
                        child: Text('Get Started'),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: _onWillPop,
      child: Scaffold(
        backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
        appBar: AppBar(
          title: Text('Baby Profile Setup'),
          leading: IconButton(
            icon: CustomIconWidget(
              iconName: 'arrow_back',
              size: 6.w,
              color: AppTheme.lightTheme.colorScheme.onSurface,
            ),
            onPressed: () async {
              if (await _onWillPop()) {
                Navigator.of(context).pop();
              }
            },
          ),
          actions: [
            IconButton(
              icon: CustomIconWidget(
                iconName: 'add',
                size: 6.w,
                color: AppTheme.lightTheme.colorScheme.primary,
              ),
              onPressed: () {
                // Multiple baby profile support - future implementation
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content: Text('Multiple profiles coming soon!'),
                    backgroundColor: AppTheme.lightTheme.colorScheme.primary,
                  ),
                );
              },
            ),
          ],
        ),
        body: SafeArea(
          child: SingleChildScrollView(
            padding: EdgeInsets.all(4.w),
            child: Form(
              key: _formKey,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Progress Indicator
                  ProgressIndicatorWidget(
                    progress: _calculateProgress(),
                    label: 'Profile Setup Progress',
                  ),

                  SizedBox(height: 4.h),

                  // Photo Picker
                  Center(
                    child: PhotoPickerWidget(
                      selectedImagePath: _selectedImagePath,
                      onImageSelected: (imagePath) {
                        setState(() {
                          _selectedImagePath = imagePath;
                          _hasUnsavedChanges = true;
                        });
                      },
                    ),
                  ),

                  SizedBox(height: 4.h),

                  // Baby Name Input
                  Text(
                    'Baby Name *',
                    style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                      fontWeight: FontWeight.w500,
                      color: AppTheme.lightTheme.colorScheme.onSurface,
                    ),
                  ),
                  SizedBox(height: 1.h),
                  TextFormField(
                    controller: _nameController,
                    decoration: InputDecoration(
                      hintText: 'Enter baby\'s name',
                      prefixIcon: Padding(
                        padding: EdgeInsets.all(3.w),
                        child: CustomIconWidget(
                          iconName: 'child_care',
                          size: 5.w,
                          color: AppTheme.lightTheme.colorScheme.primary,
                        ),
                      ),
                    ),
                    textCapitalization: TextCapitalization.words,
                    inputFormatters: [
                      FilteringTextInputFormatter.allow(RegExp(r'[a-zA-Z\s]')),
                      LengthLimitingTextInputFormatter(30),
                    ],
                    validator: (value) {
                      if (value == null || value.trim().isEmpty) {
                        return 'Please enter baby\'s name';
                      }
                      return null;
                    },
                  ),

                  SizedBox(height: 3.h),

                  // Birth Date Picker
                  DatePickerWidget(
                    selectedDate: _birthDate,
                    label: 'Birth Date *',
                    onDateSelected: (date) {
                      setState(() {
                        _birthDate = date;
                        _hasUnsavedChanges = true;
                      });
                    },
                  ),

                  SizedBox(height: 3.h),

                  // Gender Selection
                  GenderSelectionWidget(
                    selectedGender: _selectedGender,
                    onGenderSelected: (gender) {
                      setState(() {
                        _selectedGender = gender;
                        _hasUnsavedChanges = true;
                      });
                    },
                  ),

                  SizedBox(height: 4.h),

                  // Optional Fields Section
                  Container(
                    width: double.infinity,
                    padding: EdgeInsets.all(4.w),
                    decoration: BoxDecoration(
                      color: AppTheme.lightTheme.colorScheme.surface,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(
                        color: AppTheme.lightTheme.colorScheme.outline
                            .withValues(alpha: 0.2),
                      ),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            CustomIconWidget(
                              iconName: 'info_outline',
                              size: 5.w,
                              color: AppTheme.lightTheme.colorScheme.primary,
                            ),
                            SizedBox(width: 2.w),
                            Text(
                              'Optional Information',
                              style: AppTheme.lightTheme.textTheme.titleMedium
                                  ?.copyWith(
                                color: AppTheme.lightTheme.colorScheme.primary,
                              ),
                            ),
                          ],
                        ),
                        SizedBox(height: 2.h),

                        // Birth Weight
                        MeasurementInputWidget(
                          label: 'Birth Weight',
                          value: _birthWeight,
                          onValueChanged: (value) {
                            setState(() {
                              _birthWeight = value;
                              _hasUnsavedChanges = true;
                            });
                          },
                          primaryUnit: 'lbs',
                          secondaryUnit: 'kg',
                          currentUnit: _weightUnit,
                          onUnitChanged: (unit) {
                            setState(() {
                              _weightUnit = unit;
                              _hasUnsavedChanges = true;
                            });
                          },
                          hint: 'e.g., 7.5',
                        ),

                        SizedBox(height: 3.h),

                        // Birth Height
                        MeasurementInputWidget(
                          label: 'Birth Height',
                          value: _birthHeight,
                          onValueChanged: (value) {
                            setState(() {
                              _birthHeight = value;
                              _hasUnsavedChanges = true;
                            });
                          },
                          primaryUnit: 'in',
                          secondaryUnit: 'cm',
                          currentUnit: _heightUnit,
                          onUnitChanged: (unit) {
                            setState(() {
                              _heightUnit = unit;
                              _hasUnsavedChanges = true;
                            });
                          },
                          hint: 'e.g., 20.5',
                        ),
                      ],
                    ),
                  ),

                  SizedBox(height: 6.h),

                  // Create Profile Button
                  SizedBox(
                    width: double.infinity,
                    height: 6.h,
                    child: ElevatedButton(
                      onPressed: _isFormValid() ? _createProfile : null,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: _isFormValid()
                            ? AppTheme.lightTheme.colorScheme.primary
                            : AppTheme.lightTheme.colorScheme.outline,
                        foregroundColor: Colors.white,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          CustomIconWidget(
                            iconName: 'check_circle',
                            size: 5.w,
                            color: Colors.white,
                          ),
                          SizedBox(width: 2.w),
                          Text(
                            'Create Profile',
                            style: AppTheme.lightTheme.textTheme.titleMedium
                                ?.copyWith(
                              color: Colors.white,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),

                  SizedBox(height: 2.h),

                  // Required Fields Note
                  Center(
                    child: Text(
                      '* Required fields',
                      style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                        color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                      ),
                    ),
                  ),

                  SizedBox(height: 4.h),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
