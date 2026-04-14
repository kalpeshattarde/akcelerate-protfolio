import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../widgets/custom_icon_widget.dart';

class CreateTaskBottomSheet extends StatefulWidget {
  final List<Map<String, dynamic>> pets;
  final Function(Map<String, dynamic>) onTaskCreated;

  const CreateTaskBottomSheet({
    super.key,
    required this.pets,
    required this.onTaskCreated,
  });

  @override
  State<CreateTaskBottomSheet> createState() => _CreateTaskBottomSheetState();
}

class _CreateTaskBottomSheetState extends State<CreateTaskBottomSheet> {
  final _formKey = GlobalKey<FormState>();
  final _taskNameController = TextEditingController();
  final _notesController = TextEditingController();

  String? _selectedPetId;
  String _selectedCategory = 'Feeding';
  TimeOfDay _selectedTime = TimeOfDay.now();
  bool _isRecurring = false;
  String _recurringType = 'Daily';

  final List<String> _categories = [
    'Feeding',
    'Exercise',
    'Grooming',
    'Medication',
    'Training',
    'Other'
  ];
  final List<String> _recurringTypes = ['Daily', 'Weekly', 'Monthly'];

  @override
  void dispose() {
    _taskNameController.dispose();
    _notesController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
      ),
      child: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: EdgeInsets.only(
              left: 4.w,
              right: 4.w,
              top: 2.h,
              bottom: MediaQuery.of(context).viewInsets.bottom + 2.h,
            ),
            child: Form(
              key: _formKey,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildHeader(theme),
                  SizedBox(height: 3.h),
                  _buildTaskNameField(theme),
                  SizedBox(height: 2.h),
                  _buildPetSelection(theme),
                  SizedBox(height: 2.h),
                  _buildCategorySelection(theme),
                  SizedBox(height: 2.h),
                  _buildTimeSelection(theme),
                  SizedBox(height: 2.h),
                  _buildRecurringSection(theme),
                  SizedBox(height: 2.h),
                  _buildNotesField(theme),
                  SizedBox(height: 3.h),
                  _buildActionButtons(theme),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildHeader(ThemeData theme) {
    return Column(
      children: [
        Container(
          width: 10.w,
          height: 0.5.h,
          decoration: BoxDecoration(
            color: theme.brightness == Brightness.light
                ? const Color(0xFFE1E4E8)
                : const Color(0xFF30363D),
            borderRadius: BorderRadius.circular(0.25.h),
          ),
        ),
        SizedBox(height: 2.h),
        Row(
          children: [
            Container(
              width: 12.w,
              height: 6.h,
              decoration: BoxDecoration(
                color: theme.brightness == Brightness.light
                    ? const Color(0xFF2B5F75).withValues(alpha: 0.1)
                    : const Color(0xFF4A8BA3).withValues(alpha: 0.2),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Center(
                child: CustomIconWidget(
                  iconName: 'add_task',
                  color: theme.brightness == Brightness.light
                      ? const Color(0xFF2B5F75)
                      : const Color(0xFF4A8BA3),
                  size: 24,
                ),
              ),
            ),
            SizedBox(width: 3.w),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Create New Task',
                    style: theme.textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  SizedBox(height: 0.5.h),
                  Text(
                    'Add a custom care task for your pet',
                    style: theme.textTheme.bodySmall?.copyWith(
                      color: theme.brightness == Brightness.light
                          ? const Color(0xFF6A737D)
                          : const Color(0xFFADB5BD),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildTaskNameField(ThemeData theme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Task Name',
          style: theme.textTheme.bodyMedium?.copyWith(
            fontWeight: FontWeight.w500,
          ),
        ),
        SizedBox(height: 1.h),
        TextFormField(
          controller: _taskNameController,
          decoration: InputDecoration(
            hintText: 'Enter task name',
            prefixIcon: Padding(
              padding: EdgeInsets.all(3.w),
              child: CustomIconWidget(
                iconName: 'task_alt',
                color: theme.brightness == Brightness.light
                    ? const Color(0xFF6A737D)
                    : const Color(0xFFADB5BD),
                size: 20,
              ),
            ),
          ),
          validator: (value) {
            if (value == null || value.trim().isEmpty) {
              return 'Please enter a task name';
            }
            return null;
          },
        ),
      ],
    );
  }

  Widget _buildPetSelection(ThemeData theme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Select Pet',
          style: theme.textTheme.bodyMedium?.copyWith(
            fontWeight: FontWeight.w500,
          ),
        ),
        SizedBox(height: 1.h),
        Container(
          decoration: BoxDecoration(
            border: Border.all(
              color: theme.brightness == Brightness.light
                  ? const Color(0xFFE1E4E8)
                  : const Color(0xFF30363D),
            ),
            borderRadius: BorderRadius.circular(8),
          ),
          child: DropdownButtonFormField<String>(
            value: _selectedPetId,
            decoration: InputDecoration(
              border: InputBorder.none,
              contentPadding:
                  EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
              prefixIcon: Padding(
                padding: EdgeInsets.all(3.w),
                child: CustomIconWidget(
                  iconName: 'pets',
                  color: theme.brightness == Brightness.light
                      ? const Color(0xFF6A737D)
                      : const Color(0xFFADB5BD),
                  size: 20,
                ),
              ),
            ),
            hint: Text('Choose a pet'),
            items: widget.pets.map((pet) {
              return DropdownMenuItem<String>(
                value: pet['id'].toString(),
                child: Row(
                  children: [
                    CircleAvatar(
                      radius: 4.w,
                      backgroundImage: NetworkImage(pet['avatar'] as String),
                    ),
                    SizedBox(width: 2.w),
                    Text(pet['name'] as String),
                  ],
                ),
              );
            }).toList(),
            onChanged: (value) {
              setState(() {
                _selectedPetId = value;
              });
            },
            validator: (value) {
              if (value == null) {
                return 'Please select a pet';
              }
              return null;
            },
          ),
        ),
      ],
    );
  }

  Widget _buildCategorySelection(ThemeData theme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Category',
          style: theme.textTheme.bodyMedium?.copyWith(
            fontWeight: FontWeight.w500,
          ),
        ),
        SizedBox(height: 1.h),
        Wrap(
          spacing: 2.w,
          runSpacing: 1.h,
          children: _categories.map((category) {
            final isSelected = _selectedCategory == category;
            return GestureDetector(
              onTap: () {
                setState(() {
                  _selectedCategory = category;
                });
              },
              child: Container(
                padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
                decoration: BoxDecoration(
                  color: isSelected
                      ? theme.brightness == Brightness.light
                          ? const Color(0xFF2B5F75)
                          : const Color(0xFF4A8BA3)
                      : Colors.transparent,
                  border: Border.all(
                    color: isSelected
                        ? theme.brightness == Brightness.light
                            ? const Color(0xFF2B5F75)
                            : const Color(0xFF4A8BA3)
                        : theme.brightness == Brightness.light
                            ? const Color(0xFFE1E4E8)
                            : const Color(0xFF30363D),
                  ),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Text(
                  category,
                  style: theme.textTheme.bodySmall?.copyWith(
                    color: isSelected
                        ? Colors.white
                        : theme.brightness == Brightness.light
                            ? const Color(0xFF1B1F23)
                            : const Color(0xFFE8EAED),
                    fontWeight: isSelected ? FontWeight.w500 : FontWeight.w400,
                  ),
                ),
              ),
            );
          }).toList(),
        ),
      ],
    );
  }

  Widget _buildTimeSelection(ThemeData theme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Scheduled Time',
          style: theme.textTheme.bodyMedium?.copyWith(
            fontWeight: FontWeight.w500,
          ),
        ),
        SizedBox(height: 1.h),
        GestureDetector(
          onTap: () => _selectTime(context),
          child: Container(
            padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
            decoration: BoxDecoration(
              border: Border.all(
                color: theme.brightness == Brightness.light
                    ? const Color(0xFFE1E4E8)
                    : const Color(0xFF30363D),
              ),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Row(
              children: [
                CustomIconWidget(
                  iconName: 'access_time',
                  color: theme.brightness == Brightness.light
                      ? const Color(0xFF6A737D)
                      : const Color(0xFFADB5BD),
                  size: 20,
                ),
                SizedBox(width: 3.w),
                Text(
                  _selectedTime.format(context),
                  style: theme.textTheme.bodyMedium,
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildRecurringSection(ThemeData theme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Expanded(
              child: Text(
                'Recurring Task',
                style: theme.textTheme.bodyMedium?.copyWith(
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
            Switch(
              value: _isRecurring,
              onChanged: (value) {
                setState(() {
                  _isRecurring = value;
                });
              },
            ),
          ],
        ),
        if (_isRecurring) ...[
          SizedBox(height: 1.h),
          Container(
            decoration: BoxDecoration(
              border: Border.all(
                color: theme.brightness == Brightness.light
                    ? const Color(0xFFE1E4E8)
                    : const Color(0xFF30363D),
              ),
              borderRadius: BorderRadius.circular(8),
            ),
            child: DropdownButtonFormField<String>(
              value: _recurringType,
              decoration: InputDecoration(
                border: InputBorder.none,
                contentPadding:
                    EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
                prefixIcon: Padding(
                  padding: EdgeInsets.all(3.w),
                  child: CustomIconWidget(
                    iconName: 'repeat',
                    color: theme.brightness == Brightness.light
                        ? const Color(0xFF6A737D)
                        : const Color(0xFFADB5BD),
                    size: 20,
                  ),
                ),
              ),
              items: _recurringTypes.map((type) {
                return DropdownMenuItem<String>(
                  value: type,
                  child: Text(type),
                );
              }).toList(),
              onChanged: (value) {
                setState(() {
                  _recurringType = value!;
                });
              },
            ),
          ),
        ],
      ],
    );
  }

  Widget _buildNotesField(ThemeData theme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Notes (Optional)',
          style: theme.textTheme.bodyMedium?.copyWith(
            fontWeight: FontWeight.w500,
          ),
        ),
        SizedBox(height: 1.h),
        TextFormField(
          controller: _notesController,
          maxLines: 3,
          decoration: InputDecoration(
            hintText: 'Add any additional notes or instructions',
            prefixIcon: Padding(
              padding: EdgeInsets.all(3.w),
              child: CustomIconWidget(
                iconName: 'note',
                color: theme.brightness == Brightness.light
                    ? const Color(0xFF6A737D)
                    : const Color(0xFFADB5BD),
                size: 20,
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildActionButtons(ThemeData theme) {
    return Row(
      children: [
        Expanded(
          child: OutlinedButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel'),
          ),
        ),
        SizedBox(width: 4.w),
        Expanded(
          child: ElevatedButton(
            onPressed: _createTask,
            child: Text('Create Task'),
          ),
        ),
      ],
    );
  }

  Future<void> _selectTime(BuildContext context) async {
    final TimeOfDay? picked = await showTimePicker(
      context: context,
      initialTime: _selectedTime,
    );
    if (picked != null && picked != _selectedTime) {
      setState(() {
        _selectedTime = picked;
      });
    }
  }

  void _createTask() {
    if (_formKey.currentState!.validate()) {
      final selectedPet = widget.pets.firstWhere(
        (pet) => pet['id'].toString() == _selectedPetId,
      );

      final newTask = {
        'id': DateTime.now().millisecondsSinceEpoch,
        'taskName': _taskNameController.text.trim(),
        'petId': _selectedPetId,
        'petName': selectedPet['name'],
        'category': _selectedCategory,
        'scheduledTime': _selectedTime.format(context),
        'isCompleted': false,
        'isRecurring': _isRecurring,
        'recurringType': _isRecurring ? _recurringType : null,
        'notes': _notesController.text.trim().isNotEmpty
            ? _notesController.text.trim()
            : null,
        'createdAt': DateTime.now().toIso8601String(),
      };

      widget.onTaskCreated(newTask);
      Navigator.pop(context);
    }
  }
}
