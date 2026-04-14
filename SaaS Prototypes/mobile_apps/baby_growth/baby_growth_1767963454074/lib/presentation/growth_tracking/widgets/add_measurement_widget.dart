import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class AddMeasurementWidget extends StatefulWidget {
  final Function(Map<String, dynamic>) onMeasurementAdded;

  const AddMeasurementWidget({
    Key? key,
    required this.onMeasurementAdded,
  }) : super(key: key);

  @override
  State<AddMeasurementWidget> createState() => _AddMeasurementWidgetState();
}

class _AddMeasurementWidgetState extends State<AddMeasurementWidget> {
  final _formKey = GlobalKey<FormState>();
  final _weightController = TextEditingController();
  final _heightController = TextEditingController();
  final _headController = TextEditingController();

  DateTime _selectedDate = DateTime.now();
  String _weightUnit = 'lbs';
  String _heightUnit = 'inches';
  String _headUnit = 'inches';

  bool _isLoading = false;

  @override
  void dispose() {
    _weightController.dispose();
    _heightController.dispose();
    _headController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          _buildHandle(),
          SizedBox(height: 2.h),
          _buildHeader(),
          SizedBox(height: 3.h),
          _buildDateSelector(),
          SizedBox(height: 3.h),
          _buildMeasurementForm(),
          SizedBox(height: 4.h),
          _buildActionButtons(),
          SizedBox(height: 2.h),
        ],
      ),
    );
  }

  Widget _buildHandle() {
    return Container(
      width: 12.w,
      height: 0.5.h,
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.outline,
        borderRadius: BorderRadius.circular(2),
      ),
    );
  }

  Widget _buildHeader() {
    return Row(
      children: [
        CustomIconWidget(
          iconName: 'add_circle',
          color: AppTheme.lightTheme.colorScheme.primary,
          size: 28,
        ),
        SizedBox(width: 3.w),
        Text(
          'Add New Measurement',
          style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
      ],
    );
  }

  Widget _buildDateSelector() {
    return Container(
      padding: EdgeInsets.all(3.w),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.primaryContainer
            .withValues(alpha: 0.3),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: AppTheme.lightTheme.colorScheme.primary.withValues(alpha: 0.2),
        ),
      ),
      child: Row(
        children: [
          CustomIconWidget(
            iconName: 'calendar_today',
            color: AppTheme.lightTheme.colorScheme.primary,
            size: 20,
          ),
          SizedBox(width: 3.w),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Measurement Date',
                  style: AppTheme.lightTheme.textTheme.labelMedium?.copyWith(
                    color: AppTheme.lightTheme.colorScheme.primary,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                SizedBox(height: 0.5.h),
                Text(
                  '${_selectedDate.month}/${_selectedDate.day}/${_selectedDate.year}',
                  style: AppTheme.lightTheme.textTheme.bodyLarge?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
          ),
          TextButton(
            onPressed: _selectDate,
            child: Text(
              'Change',
              style: AppTheme.lightTheme.textTheme.labelLarge?.copyWith(
                color: AppTheme.lightTheme.colorScheme.primary,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMeasurementForm() {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          _buildMeasurementField(
            'Weight',
            'monitor_weight',
            _weightController,
            _weightUnit,
            ['lbs', 'kg'],
            (value) => setState(() => _weightUnit = value),
            'Enter weight',
          ),
          SizedBox(height: 3.h),
          _buildMeasurementField(
            'Height',
            'height',
            _heightController,
            _heightUnit,
            ['inches', 'cm'],
            (value) => setState(() => _heightUnit = value),
            'Enter height',
          ),
          SizedBox(height: 3.h),
          _buildMeasurementField(
            'Head Circumference',
            'face',
            _headController,
            _headUnit,
            ['inches', 'cm'],
            (value) => setState(() => _headUnit = value),
            'Enter head circumference',
          ),
        ],
      ),
    );
  }

  Widget _buildMeasurementField(
    String label,
    String iconName,
    TextEditingController controller,
    String selectedUnit,
    List<String> units,
    Function(String) onUnitChanged,
    String hint,
  ) {
    return Container(
      padding: EdgeInsets.all(3.w),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: AppTheme.lightTheme.colorScheme.outline.withValues(alpha: 0.3),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              CustomIconWidget(
                iconName: iconName,
                color: AppTheme.lightTheme.colorScheme.primary,
                size: 20,
              ),
              SizedBox(width: 2.w),
              Text(
                label,
                style: AppTheme.lightTheme.textTheme.labelLarge?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
          SizedBox(height: 2.h),
          Row(
            children: [
              Expanded(
                flex: 2,
                child: TextFormField(
                  controller: controller,
                  keyboardType:
                      const TextInputType.numberWithOptions(decimal: true),
                  inputFormatters: [
                    FilteringTextInputFormatter.allow(RegExp(r'^\d*\.?\d*')),
                  ],
                  decoration: InputDecoration(
                    hintText: hint,
                    contentPadding:
                        EdgeInsets.symmetric(horizontal: 3.w, vertical: 2.h),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                      borderSide: BorderSide(
                        color: AppTheme.lightTheme.colorScheme.outline
                            .withValues(alpha: 0.3),
                      ),
                    ),
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                      borderSide: BorderSide(
                        color: AppTheme.lightTheme.colorScheme.outline
                            .withValues(alpha: 0.3),
                      ),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                      borderSide: BorderSide(
                        color: AppTheme.lightTheme.colorScheme.primary,
                        width: 2,
                      ),
                    ),
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return null; // Optional field
                    }
                    final numValue = double.tryParse(value);
                    if (numValue == null || numValue <= 0) {
                      return 'Enter valid number';
                    }
                    return null;
                  },
                ),
              ),
              SizedBox(width: 2.w),
              Expanded(
                child: DropdownButtonFormField<String>(
                  value: selectedUnit,
                  decoration: InputDecoration(
                    contentPadding:
                        EdgeInsets.symmetric(horizontal: 2.w, vertical: 2.h),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                      borderSide: BorderSide(
                        color: AppTheme.lightTheme.colorScheme.outline
                            .withValues(alpha: 0.3),
                      ),
                    ),
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                      borderSide: BorderSide(
                        color: AppTheme.lightTheme.colorScheme.outline
                            .withValues(alpha: 0.3),
                      ),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                      borderSide: BorderSide(
                        color: AppTheme.lightTheme.colorScheme.primary,
                        width: 2,
                      ),
                    ),
                  ),
                  items: units
                      .map((unit) => DropdownMenuItem(
                            value: unit,
                            child: Text(
                              unit,
                              style: AppTheme.lightTheme.textTheme.bodyMedium,
                            ),
                          ))
                      .toList(),
                  onChanged: (value) {
                    if (value != null) onUnitChanged(value);
                  },
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildActionButtons() {
    return Row(
      children: [
        Expanded(
          child: OutlinedButton(
            onPressed: _isLoading ? null : () => Navigator.pop(context),
            style: OutlinedButton.styleFrom(
              padding: EdgeInsets.symmetric(vertical: 2.h),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
            child: Text(
              'Cancel',
              style: AppTheme.lightTheme.textTheme.labelLarge?.copyWith(
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        ),
        SizedBox(width: 4.w),
        Expanded(
          flex: 2,
          child: ElevatedButton(
            onPressed: _isLoading ? null : _saveMeasurements,
            style: ElevatedButton.styleFrom(
              padding: EdgeInsets.symmetric(vertical: 2.h),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
            child: _isLoading
                ? SizedBox(
                    height: 20,
                    width: 20,
                    child: CircularProgressIndicator(
                      strokeWidth: 2,
                      valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                    ),
                  )
                : Text(
                    'Save Measurements',
                    style: AppTheme.lightTheme.textTheme.labelLarge?.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
          ),
        ),
      ],
    );
  }

  Future<void> _selectDate() async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: _selectedDate,
      firstDate:
          DateTime.now().subtract(const Duration(days: 730)), // 2 years ago
      lastDate: DateTime.now(),
      builder: (context, child) {
        return Theme(
          data: Theme.of(context).copyWith(
            colorScheme: AppTheme.lightTheme.colorScheme,
          ),
          child: child!,
        );
      },
    );

    if (picked != null && picked != _selectedDate) {
      setState(() => _selectedDate = picked);
    }
  }

  void _saveMeasurements() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() => _isLoading = true);

    try {
      final measurements = <Map<String, dynamic>>[];

      // Add weight measurement if provided
      if (_weightController.text.isNotEmpty) {
        final weightValue = double.parse(_weightController.text);
        final convertedWeight =
            _weightUnit == 'kg' ? weightValue * 2.20462 : weightValue;

        measurements.add({
          'id': DateTime.now().millisecondsSinceEpoch,
          'type': 'weight',
          'value': convertedWeight,
          'unit': 'lbs',
          'originalValue': weightValue,
          'originalUnit': _weightUnit,
          'date': _selectedDate.toIso8601String(),
        });
      }

      // Add height measurement if provided
      if (_heightController.text.isNotEmpty) {
        final heightValue = double.parse(_heightController.text);
        final convertedHeight =
            _heightUnit == 'cm' ? heightValue / 2.54 : heightValue;

        measurements.add({
          'id': DateTime.now().millisecondsSinceEpoch + 1,
          'type': 'height',
          'value': convertedHeight,
          'unit': 'inches',
          'originalValue': heightValue,
          'originalUnit': _heightUnit,
          'date': _selectedDate.toIso8601String(),
        });
      }

      // Add head circumference measurement if provided
      if (_headController.text.isNotEmpty) {
        final headValue = double.parse(_headController.text);
        final convertedHead = _headUnit == 'cm' ? headValue / 2.54 : headValue;

        measurements.add({
          'id': DateTime.now().millisecondsSinceEpoch + 2,
          'type': 'head',
          'value': convertedHead,
          'unit': 'inches',
          'originalValue': headValue,
          'originalUnit': _headUnit,
          'date': _selectedDate.toIso8601String(),
        });
      }

      if (measurements.isEmpty) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Please enter at least one measurement'),
            backgroundColor: Colors.orange,
          ),
        );
        setState(() => _isLoading = false);
        return;
      }

      // Simulate saving delay
      await Future.delayed(const Duration(milliseconds: 500));

      // Add each measurement
      for (final measurement in measurements) {
        widget.onMeasurementAdded(measurement);
      }

      Navigator.pop(context);

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content:
              Text('${measurements.length} measurement(s) added successfully!'),
          backgroundColor: AppTheme.getSuccessColor(true),
        ),
      );
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Error saving measurements. Please try again.'),
          backgroundColor: Colors.red,
        ),
      );
    } finally {
      setState(() => _isLoading = false);
    }
  }
}
