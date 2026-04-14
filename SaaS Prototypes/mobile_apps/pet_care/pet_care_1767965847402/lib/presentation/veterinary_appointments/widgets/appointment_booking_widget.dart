import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../widgets/custom_icon_widget.dart';

class AppointmentBookingWidget extends StatefulWidget {
  final VoidCallback? onClose;
  final Function(Map<String, dynamic>)? onBookAppointment;

  const AppointmentBookingWidget({
    super.key,
    this.onClose,
    this.onBookAppointment,
  });

  @override
  State<AppointmentBookingWidget> createState() =>
      _AppointmentBookingWidgetState();
}

class _AppointmentBookingWidgetState extends State<AppointmentBookingWidget> {
  final _formKey = GlobalKey<FormState>();
  final _reasonController = TextEditingController();

  String? _selectedClinic;
  String? _selectedPet;
  String? _selectedAppointmentType;
  DateTime? _selectedDate;
  TimeOfDay? _selectedTime;

  final List<Map<String, dynamic>> _clinics = [
    {
      'id': 1,
      'name': 'City Veterinary Hospital',
      'address': '123 Main Street, Downtown',
      'distance': '2.3 miles',
      'rating': 4.8,
      'phone': '+1 (555) 123-4567',
    },
    {
      'id': 2,
      'name': 'Pet Care Plus Clinic',
      'address': '456 Oak Avenue, Midtown',
      'distance': '3.1 miles',
      'rating': 4.6,
      'phone': '+1 (555) 234-5678',
    },
    {
      'id': 3,
      'name': 'Animal Emergency Center',
      'address': '789 Pine Road, Uptown',
      'distance': '4.2 miles',
      'rating': 4.9,
      'phone': '+1 (555) 345-6789',
    },
  ];

  final List<Map<String, dynamic>> _pets = [
    {
      'id': 1,
      'name': 'Max',
      'breed': 'Golden Retriever',
      'photo':
          'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
    },
    {
      'id': 2,
      'name': 'Luna',
      'breed': 'Persian Cat',
      'photo':
          'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg',
    },
    {
      'id': 3,
      'name': 'Charlie',
      'breed': 'Labrador Mix',
      'photo':
          'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg',
    },
  ];

  final List<String> _appointmentTypes = [
    'General Checkup',
    'Vaccination',
    'Emergency Visit',
    'Dental Cleaning',
    'Surgery Consultation',
    'Follow-up Visit',
    'Grooming',
    'Behavioral Consultation',
  ];

  @override
  void dispose() {
    _reasonController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      height: 90.h,
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
      ),
      child: Column(
        children: [
          _buildHeader(theme),
          Expanded(
            child: SingleChildScrollView(
              padding: EdgeInsets.all(4.w),
              child: Form(
                key: _formKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _buildSectionTitle(theme, 'Select Clinic'),
                    SizedBox(height: 2.h),
                    _buildClinicSelection(theme),
                    SizedBox(height: 3.h),
                    _buildSectionTitle(theme, 'Pet Information'),
                    SizedBox(height: 2.h),
                    _buildPetSelection(theme),
                    SizedBox(height: 3.h),
                    _buildSectionTitle(theme, 'Appointment Details'),
                    SizedBox(height: 2.h),
                    _buildAppointmentTypeSelection(theme),
                    SizedBox(height: 2.h),
                    _buildDateTimeSelection(theme),
                    SizedBox(height: 2.h),
                    _buildReasonField(theme),
                    SizedBox(height: 4.h),
                    _buildBookButton(theme),
                    SizedBox(height: 2.h),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildHeader(ThemeData theme) {
    return Container(
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        border: Border(
          bottom: BorderSide(
            color: theme.brightness == Brightness.light
                ? const Color(0xFFE1E4E8)
                : const Color(0xFF30363D),
            width: 1,
          ),
        ),
      ),
      child: Row(
        children: [
          GestureDetector(
            onTap: widget.onClose,
            child: Container(
              padding: EdgeInsets.all(2.w),
              decoration: BoxDecoration(
                color: theme.brightness == Brightness.light
                    ? const Color(0xFF6A737D).withValues(alpha: 0.1)
                    : const Color(0xFFADB5BD).withValues(alpha: 0.2),
                borderRadius: BorderRadius.circular(8),
              ),
              child: CustomIconWidget(
                iconName: 'close',
                color: theme.brightness == Brightness.light
                    ? const Color(0xFF6A737D)
                    : const Color(0xFFADB5BD),
                size: 20,
              ),
            ),
          ),
          SizedBox(width: 4.w),
          Expanded(
            child: Text(
              'Book Appointment',
              style: theme.textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSectionTitle(ThemeData theme, String title) {
    return Text(
      title,
      style: theme.textTheme.titleMedium?.copyWith(
        fontWeight: FontWeight.w600,
      ),
    );
  }

  Widget _buildClinicSelection(ThemeData theme) {
    return Column(
      children: _clinics.map((clinic) {
        final isSelected = _selectedClinic == clinic['name'];
        return Container(
          margin: EdgeInsets.only(bottom: 2.h),
          decoration: BoxDecoration(
            color: isSelected
                ? (theme.brightness == Brightness.light
                    ? const Color(0xFF2B5F75).withValues(alpha: 0.1)
                    : const Color(0xFF4A8BA3).withValues(alpha: 0.2))
                : Colors.transparent,
            border: Border.all(
              color: isSelected
                  ? (theme.brightness == Brightness.light
                      ? const Color(0xFF2B5F75)
                      : const Color(0xFF4A8BA3))
                  : (theme.brightness == Brightness.light
                      ? const Color(0xFFE1E4E8)
                      : const Color(0xFF30363D)),
              width: isSelected ? 2 : 1,
            ),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Material(
            color: Colors.transparent,
            child: InkWell(
              onTap: () => setState(() => _selectedClinic = clinic['name']),
              borderRadius: BorderRadius.circular(12),
              child: Padding(
                padding: EdgeInsets.all(4.w),
                child: Row(
                  children: [
                    Container(
                      width: 12.w,
                      height: 12.w,
                      decoration: BoxDecoration(
                        color: theme.brightness == Brightness.light
                            ? const Color(0xFF2B5F75).withValues(alpha: 0.1)
                            : const Color(0xFF4A8BA3).withValues(alpha: 0.2),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: CustomIconWidget(
                        iconName: 'local_hospital',
                        color: theme.brightness == Brightness.light
                            ? const Color(0xFF2B5F75)
                            : const Color(0xFF4A8BA3),
                        size: 24,
                      ),
                    ),
                    SizedBox(width: 3.w),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            clinic['name'] as String,
                            style: theme.textTheme.titleSmall?.copyWith(
                              fontWeight: FontWeight.w600,
                            ),
                            overflow: TextOverflow.ellipsis,
                          ),
                          SizedBox(height: 0.5.h),
                          Text(
                            clinic['address'] as String,
                            style: theme.textTheme.bodySmall?.copyWith(
                              color: theme.brightness == Brightness.light
                                  ? const Color(0xFF6A737D)
                                  : const Color(0xFFADB5BD),
                            ),
                            overflow: TextOverflow.ellipsis,
                            maxLines: 2,
                          ),
                          SizedBox(height: 0.5.h),
                          Row(
                            children: [
                              CustomIconWidget(
                                iconName: 'star',
                                color: const Color(0xFFE8A547),
                                size: 14,
                              ),
                              SizedBox(width: 1.w),
                              Text(
                                '${clinic['rating']}',
                                style: theme.textTheme.bodySmall,
                              ),
                              SizedBox(width: 3.w),
                              CustomIconWidget(
                                iconName: 'location_on',
                                color: theme.brightness == Brightness.light
                                    ? const Color(0xFF6A737D)
                                    : const Color(0xFFADB5BD),
                                size: 14,
                              ),
                              SizedBox(width: 1.w),
                              Text(
                                clinic['distance'] as String,
                                style: theme.textTheme.bodySmall?.copyWith(
                                  color: theme.brightness == Brightness.light
                                      ? const Color(0xFF6A737D)
                                      : const Color(0xFFADB5BD),
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        );
      }).toList(),
    );
  }

  Widget _buildPetSelection(ThemeData theme) {
    return DropdownButtonFormField<String>(
      value: _selectedPet,
      decoration: InputDecoration(
        labelText: 'Select Pet',
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
      items: _pets.map((pet) {
        return DropdownMenuItem<String>(
          value: pet['name'],
          child: Row(
            children: [
              Container(
                width: 8.w,
                height: 8.w,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(4),
                  image: DecorationImage(
                    image: NetworkImage(pet['photo'] as String),
                    fit: BoxFit.cover,
                  ),
                ),
              ),
              SizedBox(width: 3.w),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      pet['name'] as String,
                      style: theme.textTheme.bodyMedium?.copyWith(
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    Text(
                      pet['breed'] as String,
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
        );
      }).toList(),
      onChanged: (value) => setState(() => _selectedPet = value),
      validator: (value) => value == null ? 'Please select a pet' : null,
    );
  }

  Widget _buildAppointmentTypeSelection(ThemeData theme) {
    return DropdownButtonFormField<String>(
      value: _selectedAppointmentType,
      decoration: InputDecoration(
        labelText: 'Appointment Type',
        prefixIcon: Padding(
          padding: EdgeInsets.all(3.w),
          child: CustomIconWidget(
            iconName: 'medical_services',
            color: theme.brightness == Brightness.light
                ? const Color(0xFF6A737D)
                : const Color(0xFFADB5BD),
            size: 20,
          ),
        ),
      ),
      items: _appointmentTypes.map((type) {
        return DropdownMenuItem<String>(
          value: type,
          child: Text(type),
        );
      }).toList(),
      onChanged: (value) => setState(() => _selectedAppointmentType = value),
      validator: (value) =>
          value == null ? 'Please select appointment type' : null,
    );
  }

  Widget _buildDateTimeSelection(ThemeData theme) {
    return Row(
      children: [
        Expanded(
          child: TextFormField(
            readOnly: true,
            decoration: InputDecoration(
              labelText: 'Date',
              hintText: 'Select date',
              prefixIcon: Padding(
                padding: EdgeInsets.all(3.w),
                child: CustomIconWidget(
                  iconName: 'calendar_today',
                  color: theme.brightness == Brightness.light
                      ? const Color(0xFF6A737D)
                      : const Color(0xFFADB5BD),
                  size: 20,
                ),
              ),
            ),
            controller: TextEditingController(
              text: _selectedDate != null
                  ? '${_selectedDate!.month}/${_selectedDate!.day}/${_selectedDate!.year}'
                  : '',
            ),
            onTap: () => _selectDate(context),
            validator: (value) =>
                _selectedDate == null ? 'Please select a date' : null,
          ),
        ),
        SizedBox(width: 4.w),
        Expanded(
          child: TextFormField(
            readOnly: true,
            decoration: InputDecoration(
              labelText: 'Time',
              hintText: 'Select time',
              prefixIcon: Padding(
                padding: EdgeInsets.all(3.w),
                child: CustomIconWidget(
                  iconName: 'access_time',
                  color: theme.brightness == Brightness.light
                      ? const Color(0xFF6A737D)
                      : const Color(0xFFADB5BD),
                  size: 20,
                ),
              ),
            ),
            controller: TextEditingController(
              text: _selectedTime != null ? _selectedTime!.format(context) : '',
            ),
            onTap: () => _selectTime(context),
            validator: (value) =>
                _selectedTime == null ? 'Please select a time' : null,
          ),
        ),
      ],
    );
  }

  Widget _buildReasonField(ThemeData theme) {
    return TextFormField(
      controller: _reasonController,
      maxLines: 3,
      decoration: InputDecoration(
        labelText: 'Reason for Visit',
        hintText: 'Describe the reason for this appointment...',
        prefixIcon: Padding(
          padding: EdgeInsets.all(3.w),
          child: CustomIconWidget(
            iconName: 'description',
            color: theme.brightness == Brightness.light
                ? const Color(0xFF6A737D)
                : const Color(0xFFADB5BD),
            size: 20,
          ),
        ),
      ),
      validator: (value) {
        if (value == null || value.trim().isEmpty) {
          return 'Please provide a reason for the visit';
        }
        return null;
      },
    );
  }

  Widget _buildBookButton(ThemeData theme) {
    return SizedBox(
      width: double.infinity,
      child: ElevatedButton(
        onPressed: _bookAppointment,
        style: ElevatedButton.styleFrom(
          padding: EdgeInsets.symmetric(vertical: 2.h),
        ),
        child: Text('Book Appointment'),
      ),
    );
  }

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: DateTime.now().add(const Duration(days: 1)),
      firstDate: DateTime.now(),
      lastDate: DateTime.now().add(const Duration(days: 365)),
    );
    if (picked != null && picked != _selectedDate) {
      setState(() => _selectedDate = picked);
    }
  }

  Future<void> _selectTime(BuildContext context) async {
    final TimeOfDay? picked = await showTimePicker(
      context: context,
      initialTime: const TimeOfDay(hour: 9, minute: 0),
    );
    if (picked != null && picked != _selectedTime) {
      setState(() => _selectedTime = picked);
    }
  }

  void _bookAppointment() {
    if (_formKey.currentState!.validate() && _selectedClinic != null) {
      final appointmentData = {
        'clinic': _selectedClinic,
        'pet': _selectedPet,
        'appointmentType': _selectedAppointmentType,
        'date': _selectedDate,
        'time': _selectedTime,
        'reason': _reasonController.text.trim(),
      };

      widget.onBookAppointment?.call(appointmentData);
    } else if (_selectedClinic == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please select a clinic')),
      );
    }
  }
}
