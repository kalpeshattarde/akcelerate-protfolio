import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../widgets/custom_icon_widget.dart';
import './widgets/appointment_booking_widget.dart';
import './widgets/appointment_card_widget.dart';
import './widgets/pre_visit_checklist_widget.dart';

class VeterinaryAppointments extends StatefulWidget {
  const VeterinaryAppointments({super.key});

  @override
  State<VeterinaryAppointments> createState() => _VeterinaryAppointmentsState();
}

class _VeterinaryAppointmentsState extends State<VeterinaryAppointments>
    with TickerProviderStateMixin {
  late TabController _tabController;
  bool _isRefreshing = false;
  bool _showPastAppointments = false;

  final List<Map<String, dynamic>> _appointments = [
    {
      'id': 1,
      'clinicName': 'City Veterinary Hospital',
      'appointmentType': 'Annual Checkup',
      'petName': 'Max',
      'petPhoto':
          'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
      'date': 'Dec 15, 2024',
      'time': '10:30 AM',
      'status': 'upcoming',
      'clinicPhone': '+1 (555) 123-4567',
      'clinicAddress': '123 Main Street, Downtown',
      'notes': 'Bring vaccination records',
      'reminderSet': true,
    },
    {
      'id': 2,
      'clinicName': 'Pet Care Plus Clinic',
      'appointmentType': 'Vaccination',
      'petName': 'Luna',
      'petPhoto':
          'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg',
      'date': 'Dec 18, 2024',
      'time': '2:15 PM',
      'status': 'upcoming',
      'clinicPhone': '+1 (555) 234-5678',
      'clinicAddress': '456 Oak Avenue, Midtown',
      'notes': 'Rabies and DHPP vaccines due',
      'reminderSet': true,
    },
    {
      'id': 3,
      'clinicName': 'Animal Emergency Center',
      'appointmentType': 'Follow-up Visit',
      'petName': 'Charlie',
      'petPhoto':
          'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg',
      'date': 'Dec 22, 2024',
      'time': '11:00 AM',
      'status': 'upcoming',
      'clinicPhone': '+1 (555) 345-6789',
      'clinicAddress': '789 Pine Road, Uptown',
      'notes': 'Check healing progress from surgery',
      'reminderSet': false,
    },
    {
      'id': 4,
      'clinicName': 'City Veterinary Hospital',
      'appointmentType': 'Dental Cleaning',
      'petName': 'Max',
      'petPhoto':
          'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
      'date': 'Nov 28, 2024',
      'time': '9:00 AM',
      'status': 'past',
      'clinicPhone': '+1 (555) 123-4567',
      'clinicAddress': '123 Main Street, Downtown',
      'notes': 'Completed successfully',
      'reminderSet': false,
    },
    {
      'id': 5,
      'clinicName': 'Pet Care Plus Clinic',
      'appointmentType': 'Emergency Visit',
      'petName': 'Luna',
      'petPhoto':
          'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg',
      'date': 'Nov 15, 2024',
      'time': '3:45 PM',
      'status': 'past',
      'clinicPhone': '+1 (555) 234-5678',
      'clinicAddress': '456 Oak Avenue, Midtown',
      'notes': 'Treated for minor injury',
      'reminderSet': false,
    },
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      appBar: _buildAppBar(theme),
      body: Column(
        children: [
          _buildTabBar(theme),
          Expanded(
            child: TabBarView(
              controller: _tabController,
              children: [
                _buildUpcomingAppointments(theme),
                _buildPastAppointments(theme),
              ],
            ),
          ),
        ],
      ),
      floatingActionButton: _buildFloatingActionButton(theme),
    );
  }

  PreferredSizeWidget _buildAppBar(ThemeData theme) {
    return AppBar(
      title: Text(
        'Appointments',
        style: theme.textTheme.titleLarge?.copyWith(
          fontWeight: FontWeight.w600,
        ),
      ),
      actions: [
        IconButton(
          onPressed: _showCalendarView,
          icon: CustomIconWidget(
            iconName: 'calendar_view_month',
            color: theme.brightness == Brightness.light
                ? const Color(0xFF1B1F23)
                : const Color(0xFFE8EAED),
            size: 24,
          ),
          tooltip: 'Calendar View',
        ),
        IconButton(
          onPressed: _showNotificationSettings,
          icon: CustomIconWidget(
            iconName: 'notifications',
            color: theme.brightness == Brightness.light
                ? const Color(0xFF1B1F23)
                : const Color(0xFFE8EAED),
            size: 24,
          ),
          tooltip: 'Notification Settings',
        ),
      ],
    );
  }

  Widget _buildTabBar(ThemeData theme) {
    return Container(
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
      child: TabBar(
        controller: _tabController,
        tabs: const [
          Tab(text: 'Upcoming'),
          Tab(text: 'Past'),
        ],
      ),
    );
  }

  Widget _buildUpcomingAppointments(ThemeData theme) {
    final upcomingAppointments = _appointments
        .where((appointment) => appointment['status'] == 'upcoming')
        .toList();

    return RefreshIndicator(
      onRefresh: _refreshAppointments,
      child: upcomingAppointments.isEmpty
          ? _buildEmptyState(
              theme, 'No upcoming appointments', 'Schedule your next vet visit')
          : ListView.builder(
              padding: EdgeInsets.symmetric(vertical: 2.h),
              itemCount: upcomingAppointments.length,
              itemBuilder: (context, index) {
                final appointment = upcomingAppointments[index];
                return AppointmentCardWidget(
                  appointment: appointment,
                  onTap: () => _showAppointmentDetails(appointment),
                  onCall: () => _callClinic(appointment),
                  onNavigate: () => _navigateToClinic(appointment),
                  onReschedule: () => _rescheduleAppointment(appointment),
                  onCancel: () => _cancelAppointment(appointment),
                  onAddNotes: () => _addNotes(appointment),
                );
              },
            ),
    );
  }

  Widget _buildPastAppointments(ThemeData theme) {
    final pastAppointments = _appointments
        .where((appointment) => appointment['status'] == 'past')
        .toList();

    return RefreshIndicator(
      onRefresh: _refreshAppointments,
      child: pastAppointments.isEmpty
          ? _buildEmptyState(theme, 'No past appointments',
              'Your appointment history will appear here')
          : ListView.builder(
              padding: EdgeInsets.symmetric(vertical: 2.h),
              itemCount: pastAppointments.length,
              itemBuilder: (context, index) {
                final appointment = pastAppointments[index];
                return AppointmentCardWidget(
                  appointment: appointment,
                  onTap: () => _showAppointmentDetails(appointment),
                  onCall: () => _callClinic(appointment),
                  onNavigate: () => _navigateToClinic(appointment),
                );
              },
            ),
    );
  }

  Widget _buildEmptyState(ThemeData theme, String title, String subtitle) {
    return Center(
      child: Padding(
        padding: EdgeInsets.all(8.w),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 20.w,
              height: 20.w,
              decoration: BoxDecoration(
                color: theme.brightness == Brightness.light
                    ? const Color(0xFF2B5F75).withValues(alpha: 0.1)
                    : const Color(0xFF4A8BA3).withValues(alpha: 0.2),
                borderRadius: BorderRadius.circular(50),
              ),
              child: CustomIconWidget(
                iconName: 'event_available',
                color: theme.brightness == Brightness.light
                    ? const Color(0xFF2B5F75)
                    : const Color(0xFF4A8BA3),
                size: 40,
              ),
            ),
            SizedBox(height: 4.h),
            Text(
              title,
              style: theme.textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.w600,
              ),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 2.h),
            Text(
              subtitle,
              style: theme.textTheme.bodyMedium?.copyWith(
                color: theme.brightness == Brightness.light
                    ? const Color(0xFF6A737D)
                    : const Color(0xFFADB5BD),
              ),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 4.h),
            ElevatedButton.icon(
              onPressed: _showBookingSheet,
              icon: CustomIconWidget(
                iconName: 'add',
                color: Colors.white,
                size: 20,
              ),
              label: Text('Book Appointment'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildFloatingActionButton(ThemeData theme) {
    return FloatingActionButton(
      onPressed: _showBookingSheet,
      tooltip: 'Book Appointment',
      child: CustomIconWidget(
        iconName: 'add',
        color: Colors.black,
        size: 24,
      ),
    );
  }

  Future<void> _refreshAppointments() async {
    setState(() => _isRefreshing = true);

    // Simulate API call
    await Future.delayed(const Duration(seconds: 2));

    setState(() => _isRefreshing = false);

    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Appointments refreshed')),
      );
    }
  }

  void _showBookingSheet() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => AppointmentBookingWidget(
        onClose: () => Navigator.pop(context),
        onBookAppointment: (appointmentData) {
          Navigator.pop(context);
          _bookAppointment(appointmentData);
        },
      ),
    );
  }

  void _showAppointmentDetails(Map<String, dynamic> appointment) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => _buildAppointmentDetailsSheet(appointment),
    );
  }

  Widget _buildAppointmentDetailsSheet(Map<String, dynamic> appointment) {
    final theme = Theme.of(context);
    final isUpcoming = appointment['status'] == 'upcoming';

    return Container(
      height: 70.h,
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
      ),
      child: Column(
        children: [
          Container(
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
                  onTap: () => Navigator.pop(context),
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
                    'Appointment Details',
                    style: theme.textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
                if (isUpcoming)
                  TextButton(
                    onPressed: () {
                      Navigator.pop(context);
                      _showPreVisitChecklist(appointment);
                    },
                    child: Text('Checklist'),
                  ),
              ],
            ),
          ),
          Expanded(
            child: SingleChildScrollView(
              padding: EdgeInsets.all(4.w),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildDetailSection(theme, 'Pet Information', [
                    _buildDetailRow(theme, 'Pet Name', appointment['petName']),
                    _buildDetailRow(theme, 'Appointment Type',
                        appointment['appointmentType']),
                  ]),
                  SizedBox(height: 3.h),
                  _buildDetailSection(theme, 'Clinic Information', [
                    _buildDetailRow(
                        theme, 'Clinic Name', appointment['clinicName']),
                    _buildDetailRow(
                        theme, 'Address', appointment['clinicAddress']),
                    _buildDetailRow(theme, 'Phone', appointment['clinicPhone']),
                  ]),
                  SizedBox(height: 3.h),
                  _buildDetailSection(theme, 'Appointment Details', [
                    _buildDetailRow(theme, 'Date', appointment['date']),
                    _buildDetailRow(theme, 'Time', appointment['time']),
                    _buildDetailRow(theme, 'Status', appointment['status']),
                  ]),
                  if (appointment['notes'] != null) ...[
                    SizedBox(height: 3.h),
                    _buildDetailSection(theme, 'Notes', [
                      Text(
                        appointment['notes'] as String,
                        style: theme.textTheme.bodyMedium,
                      ),
                    ]),
                  ],
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDetailSection(
      ThemeData theme, String title, List<Widget> children) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: theme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
        SizedBox(height: 2.h),
        ...children,
      ],
    );
  }

  Widget _buildDetailRow(ThemeData theme, String label, String value) {
    return Padding(
      padding: EdgeInsets.only(bottom: 1.h),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: 30.w,
            child: Text(
              label,
              style: theme.textTheme.bodyMedium?.copyWith(
                color: theme.brightness == Brightness.light
                    ? const Color(0xFF6A737D)
                    : const Color(0xFFADB5BD),
              ),
            ),
          ),
          Expanded(
            child: Text(
              value,
              style: theme.textTheme.bodyMedium?.copyWith(
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
        ],
      ),
    );
  }

  void _showPreVisitChecklist(Map<String, dynamic> appointment) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => PreVisitChecklistWidget(
        appointment: appointment,
        onClose: () => Navigator.pop(context),
      ),
    );
  }

  void _callClinic(Map<String, dynamic> appointment) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Calling ${appointment['clinicName']}...'),
        action: SnackBarAction(
          label: 'Cancel',
          onPressed: () {},
        ),
      ),
    );
  }

  void _navigateToClinic(Map<String, dynamic> appointment) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Opening directions to ${appointment['clinicName']}'),
      ),
    );
  }

  void _rescheduleAppointment(Map<String, dynamic> appointment) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Reschedule Appointment'),
        content: Text(
            'Would you like to reschedule your appointment with ${appointment['clinicName']}?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              _showBookingSheet();
            },
            child: Text('Reschedule'),
          ),
        ],
      ),
    );
  }

  void _cancelAppointment(Map<String, dynamic> appointment) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Cancel Appointment'),
        content: Text(
            'Are you sure you want to cancel your appointment with ${appointment['clinicName']}?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Keep'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              setState(() {
                _appointments
                    .removeWhere((apt) => apt['id'] == appointment['id']);
              });
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Appointment cancelled')),
              );
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: Theme.of(context).brightness == Brightness.light
                  ? const Color(0xFFD73A49)
                  : const Color(0xFFFF6B7A),
            ),
            child: Text('Cancel'),
          ),
        ],
      ),
    );
  }

  void _addNotes(Map<String, dynamic> appointment) {
    final notesController =
        TextEditingController(text: appointment['notes'] ?? '');

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Add Notes'),
        content: TextField(
          controller: notesController,
          maxLines: 3,
          decoration: InputDecoration(
            hintText: 'Add notes for this appointment...',
            border: OutlineInputBorder(),
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              setState(() {
                final index = _appointments
                    .indexWhere((apt) => apt['id'] == appointment['id']);
                if (index != -1) {
                  _appointments[index]['notes'] = notesController.text.trim();
                }
              });
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Notes saved')),
              );
            },
            child: Text('Save'),
          ),
        ],
      ),
    );
  }

  void _bookAppointment(Map<String, dynamic> appointmentData) {
    final newAppointment = {
      'id': _appointments.length + 1,
      'clinicName': appointmentData['clinic'],
      'appointmentType': appointmentData['appointmentType'],
      'petName': appointmentData['pet'],
      'petPhoto':
          'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
      'date':
          '${appointmentData['date'].month}/${appointmentData['date'].day}/${appointmentData['date'].year}',
      'time': appointmentData['time'].format(context),
      'status': 'upcoming',
      'clinicPhone': '+1 (555) 123-4567',
      'clinicAddress': '123 Main Street, Downtown',
      'notes': appointmentData['reason'],
      'reminderSet': true,
    };

    setState(() {
      _appointments.insert(0, newAppointment);
    });

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Appointment booked successfully!'),
        backgroundColor: Color(0xFF7BA05B),
      ),
    );
  }

  void _showCalendarView() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Calendar view coming soon')),
    );
  }

  void _showNotificationSettings() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Notification settings opened')),
    );
  }
}
