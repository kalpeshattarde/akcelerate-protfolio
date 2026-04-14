import 'package:flutter/material.dart';

import '../../../core/app_export.dart';
import '../../../widgets/custom_icon_widget.dart';

/// Modal for adding/editing appointments
/// Full-screen form with native date/time pickers
class AddAppointmentModal extends StatefulWidget {
  final Map<String, dynamic>? appointment;
  final Function(Map<String, dynamic>) onSave;

  const AddAppointmentModal({
    super.key,
    this.appointment,
    required this.onSave,
  });

  @override
  State<AddAppointmentModal> createState() => _AddAppointmentModalState();
}

class _AddAppointmentModalState extends State<AddAppointmentModal> {
  final _formKey = GlobalKey<FormState>();
  late TextEditingController _providerController;
  late TextEditingController _notesController;

  String _selectedVisitType = 'Prenatal Checkup';
  DateTime _selectedDate = DateTime.now();
  TimeOfDay _selectedTime = TimeOfDay.now();
  String _selectedReminder = '24 hours';

  final List<String> _visitTypes = [
    'Prenatal Checkup',
    'Ultrasound',
    'Blood Test',
    'Specialist Consultation',
  ];

  final List<String> _reminderOptions = [
    '24 hours',
    '2 hours',
    '30 minutes',
  ];

  @override
  void initState() {
    super.initState();
    _providerController = TextEditingController(
      text: widget.appointment?['provider'] ?? '',
    );
    _notesController = TextEditingController(
      text: widget.appointment?['notes'] ?? '',
    );

    if (widget.appointment != null) {
      _selectedVisitType = widget.appointment!['visitType'] as String;
      _selectedReminder = widget.appointment!['reminder'] as String;
    }
  }

  @override
  void dispose() {
    _providerController.dispose();
    _notesController.dispose();
    super.dispose();
  }

  Future<void> _selectDate() async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: _selectedDate,
      firstDate: DateTime.now(),
      lastDate: DateTime.now().add(const Duration(days: 365)),
      builder: (context, child) {
        final theme = Theme.of(context);
        return Theme(
          data: theme.copyWith(
            colorScheme: theme.colorScheme.copyWith(
              primary: theme.colorScheme.primary,
              onPrimary: theme.colorScheme.onPrimary,
            ),
          ),
          child: child!,
        );
      },
    );

    if (picked != null && picked != _selectedDate) {
      setState(() {
        _selectedDate = picked;
      });
    }
  }

  Future<void> _selectTime() async {
    final TimeOfDay? picked = await showTimePicker(
      context: context,
      initialTime: _selectedTime,
      builder: (context, child) {
        final theme = Theme.of(context);
        return Theme(
          data: theme.copyWith(
            colorScheme: theme.colorScheme.copyWith(
              primary: theme.colorScheme.primary,
              onPrimary: theme.colorScheme.onPrimary,
            ),
          ),
          child: child!,
        );
      },
    );

    if (picked != null && picked != _selectedTime) {
      setState(() {
        _selectedTime = picked;
      });
    }
  }

  void _saveAppointment() {
    if (_formKey.currentState!.validate()) {
      final appointment = {
        'id':
            widget.appointment?['id'] ?? DateTime.now().millisecondsSinceEpoch,
        'visitType': _selectedVisitType,
        'provider': _providerController.text,
        'date': _selectedDate,
        'time': _selectedTime,
        'dateTime':
            '${_selectedDate.month}/${_selectedDate.day}/${_selectedDate.year} ${_selectedTime.format(context)}',
        'reminder': _selectedReminder,
        'notes': _notesController.text,
      };

      widget.onSave(appointment);
      Navigator.pop(context);
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: Text(widget.appointment == null
            ? 'Add Appointment'
            : 'Edit Appointment'),
        leading: IconButton(
          icon: CustomIconWidget(
            iconName: 'close',
            color: theme.colorScheme.onSurface,
            size: 24,
          ),
          onPressed: () => Navigator.pop(context),
        ),
        actions: [
          TextButton(
            onPressed: _saveAppointment,
            child: Text(
              'Save',
              style: theme.textTheme.titleMedium!.copyWith(
                color: theme.colorScheme.primary,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        ],
      ),
      body: SafeArea(
        child: Form(
          key: _formKey,
          child: ListView(
            padding: const EdgeInsets.all(16),
            children: [
              Text(
                'Visit Type',
                style: theme.textTheme.titleMedium!.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
              const SizedBox(height: 8),
              DropdownButtonFormField<String>(
                value: _selectedVisitType,
                decoration: InputDecoration(
                  prefixIcon: CustomIconWidget(
                    iconName: 'medical_services',
                    color: theme.colorScheme.primary,
                    size: 24,
                  ),
                ),
                items: _visitTypes.map((type) {
                  return DropdownMenuItem(
                    value: type,
                    child: Text(type),
                  );
                }).toList(),
                onChanged: (value) {
                  setState(() {
                    _selectedVisitType = value!;
                  });
                },
              ),
              const SizedBox(height: 24),
              Text(
                'Healthcare Provider',
                style: theme.textTheme.titleMedium!.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
              const SizedBox(height: 8),
              TextFormField(
                controller: _providerController,
                decoration: InputDecoration(
                  hintText: 'Enter provider name',
                  prefixIcon: CustomIconWidget(
                    iconName: 'person',
                    color: theme.colorScheme.primary,
                    size: 24,
                  ),
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter provider name';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 24),
              Text(
                'Date & Time',
                style: theme.textTheme.titleMedium!.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
              const SizedBox(height: 8),
              Row(
                children: [
                  Expanded(
                    child: InkWell(
                      onTap: _selectDate,
                      borderRadius: BorderRadius.circular(12.0),
                      child: Container(
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          color: theme.colorScheme.surface,
                          borderRadius: BorderRadius.circular(12.0),
                          border: Border.all(
                            color: theme.colorScheme.outline,
                            width: 0.5,
                          ),
                        ),
                        child: Row(
                          children: [
                            CustomIconWidget(
                              iconName: 'calendar_today',
                              color: theme.colorScheme.primary,
                              size: 24,
                            ),
                            const SizedBox(width: 12),
                            Text(
                              '${_selectedDate.month}/${_selectedDate.day}/${_selectedDate.year}',
                              style: theme.textTheme.bodyLarge,
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: InkWell(
                      onTap: _selectTime,
                      borderRadius: BorderRadius.circular(12.0),
                      child: Container(
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          color: theme.colorScheme.surface,
                          borderRadius: BorderRadius.circular(12.0),
                          border: Border.all(
                            color: theme.colorScheme.outline,
                            width: 0.5,
                          ),
                        ),
                        child: Row(
                          children: [
                            CustomIconWidget(
                              iconName: 'access_time',
                              color: theme.colorScheme.primary,
                              size: 24,
                            ),
                            const SizedBox(width: 12),
                            Text(
                              _selectedTime.format(context),
                              style: theme.textTheme.bodyLarge,
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 24),
              Text(
                'Reminder',
                style: theme.textTheme.titleMedium!.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
              const SizedBox(height: 8),
              DropdownButtonFormField<String>(
                value: _selectedReminder,
                decoration: InputDecoration(
                  prefixIcon: CustomIconWidget(
                    iconName: 'notifications',
                    color: theme.colorScheme.primary,
                    size: 24,
                  ),
                ),
                items: _reminderOptions.map((option) {
                  return DropdownMenuItem(
                    value: option,
                    child: Text(option),
                  );
                }).toList(),
                onChanged: (value) {
                  setState(() {
                    _selectedReminder = value!;
                  });
                },
              ),
              const SizedBox(height: 24),
              Text(
                'Notes',
                style: theme.textTheme.titleMedium!.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
              const SizedBox(height: 8),
              TextFormField(
                controller: _notesController,
                maxLines: 4,
                decoration: InputDecoration(
                  hintText: 'Add notes or questions for your provider',
                  prefixIcon: Padding(
                    padding: const EdgeInsets.only(bottom: 60),
                    child: CustomIconWidget(
                      iconName: 'notes',
                      color: theme.colorScheme.primary,
                      size: 24,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
