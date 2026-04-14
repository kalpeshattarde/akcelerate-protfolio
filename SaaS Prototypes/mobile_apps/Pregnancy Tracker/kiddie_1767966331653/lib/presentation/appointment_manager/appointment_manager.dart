import 'package:flutter/material.dart';

import '../../core/app_export.dart';
import '../../widgets/custom_app_bar.dart';
import '../../widgets/custom_bottom_bar.dart';
import '../../widgets/custom_icon_widget.dart';
import './widgets/add_appointment_modal.dart';
import './widgets/appointment_card_widget.dart';
import './widgets/appointment_detail_modal.dart';
import './widgets/calendar_widget.dart';

/// Appointment Manager Screen
/// Manages prenatal healthcare visits with calendar interface
class AppointmentManager extends StatefulWidget {
  const AppointmentManager({super.key});

  @override
  State<AppointmentManager> createState() => _AppointmentManagerState();
}

class _AppointmentManagerState extends State<AppointmentManager>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  DateTime _focusedDay = DateTime.now();
  DateTime? _selectedDay;

  // Mock appointments data
  final Map<DateTime, List<Map<String, dynamic>>> _appointments = {};
  final List<Map<String, dynamic>> _upcomingAppointments = [
    {
      'id': 1,
      'visitType': 'Prenatal Checkup',
      'provider': 'Dr. Sarah Johnson',
      'date': DateTime.now().add(const Duration(days: 3)),
      'time': const TimeOfDay(hour: 10, minute: 30),
      'dateTime':
          '${DateTime.now().add(const Duration(days: 3)).month}/${DateTime.now().add(const Duration(days: 3)).day}/${DateTime.now().add(const Duration(days: 3)).year} 10:30 AM',
      'reminder': '24 hours',
      'notes': 'Bring previous test results',
    },
    {
      'id': 2,
      'visitType': 'Ultrasound',
      'provider': 'Dr. Michael Chen',
      'date': DateTime.now().add(const Duration(days: 7)),
      'time': const TimeOfDay(hour: 14, minute: 0),
      'dateTime':
          '${DateTime.now().add(const Duration(days: 7)).month}/${DateTime.now().add(const Duration(days: 7)).day}/${DateTime.now().add(const Duration(days: 7)).year} 2:00 PM',
      'reminder': '2 hours',
      'notes': 'Anatomy scan - 20 weeks',
    },
    {
      'id': 3,
      'visitType': 'Blood Test',
      'provider': 'City Medical Lab',
      'date': DateTime.now().add(const Duration(days: 10)),
      'time': const TimeOfDay(hour: 9, minute: 0),
      'dateTime':
          '${DateTime.now().add(const Duration(days: 10)).month}/${DateTime.now().add(const Duration(days: 10)).day}/${DateTime.now().add(const Duration(days: 10)).year} 9:00 AM',
      'reminder': '24 hours',
      'notes': 'Fasting required - no food after midnight',
    },
  ];

  final List<Map<String, dynamic>> _pastAppointments = [
    {
      'id': 4,
      'visitType': 'Prenatal Checkup',
      'provider': 'Dr. Sarah Johnson',
      'date': DateTime.now().subtract(const Duration(days: 14)),
      'time': const TimeOfDay(hour: 11, minute: 0),
      'dateTime':
          '${DateTime.now().subtract(const Duration(days: 14)).month}/${DateTime.now().subtract(const Duration(days: 14)).day}/${DateTime.now().subtract(const Duration(days: 14)).year} 11:00 AM',
      'reminder': '24 hours',
      'notes': 'First trimester checkup - everything looks good',
    },
    {
      'id': 5,
      'visitType': 'Specialist Consultation',
      'provider': 'Dr. Emily Rodriguez',
      'date': DateTime.now().subtract(const Duration(days: 30)),
      'time': const TimeOfDay(hour: 15, minute: 30),
      'dateTime':
          '${DateTime.now().subtract(const Duration(days: 30)).month}/${DateTime.now().subtract(const Duration(days: 30)).day}/${DateTime.now().subtract(const Duration(days: 30)).year} 3:30 PM',
      'reminder': '2 hours',
      'notes': 'Discussed nutrition plan and exercise recommendations',
    },
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    _selectedDay = _focusedDay;
    _initializeAppointments();
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  void _initializeAppointments() {
    for (var appointment in _upcomingAppointments) {
      final date = appointment['date'] as DateTime;
      final normalizedDate = DateTime(date.year, date.month, date.day);

      if (_appointments[normalizedDate] == null) {
        _appointments[normalizedDate] = [];
      }
      _appointments[normalizedDate]!.add(appointment);
    }
  }

  void _onDaySelected(DateTime selectedDay, DateTime focusedDay) {
    setState(() {
      _selectedDay = selectedDay;
      _focusedDay = focusedDay;
    });
  }

  void _showAddAppointmentModal({Map<String, dynamic>? appointment}) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => Padding(
        padding: EdgeInsets.only(
          bottom: MediaQuery.of(context).viewInsets.bottom,
        ),
        child: AddAppointmentModal(
          appointment: appointment,
          onSave: (newAppointment) {
            setState(() {
              if (appointment == null) {
                _upcomingAppointments.add(newAppointment);
              } else {
                final index = _upcomingAppointments.indexWhere(
                  (a) => a['id'] == appointment['id'],
                );
                if (index != -1) {
                  _upcomingAppointments[index] = newAppointment;
                }
              }
              _appointments.clear();
              _initializeAppointments();
            });
          },
        ),
      ),
    );
  }

  void _showAppointmentDetail(Map<String, dynamic> appointment) {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (context) => AppointmentDetailModal(
        appointment: appointment,
        onEdit: () => _showAddAppointmentModal(appointment: appointment),
        onDelete: () {
          setState(() {
            _upcomingAppointments
                .removeWhere((a) => a['id'] == appointment['id']);
            _appointments.clear();
            _initializeAppointments();
          });
        },
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: CustomAppBar.dashboard(
        title: 'Appointments',
        actions: [
          CustomAppBarAction(
            icon: Icons.search_rounded,
            onPressed: () {
              // Search functionality
            },
            tooltip: 'Search appointments',
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            Container(
              color: theme.colorScheme.surface,
              child: TabBar(
                controller: _tabController,
                tabs: const [
                  Tab(text: 'Upcoming'),
                  Tab(text: 'Past'),
                ],
              ),
            ),
            Expanded(
              child: TabBarView(
                controller: _tabController,
                children: [
                  _buildUpcomingTab(),
                  _buildPastTab(),
                ],
              ),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => _showAddAppointmentModal(),
        icon: CustomIconWidget(
          iconName: 'add',
          color: theme.floatingActionButtonTheme.foregroundColor ??
              theme.colorScheme.onPrimary,
          size: 24,
        ),
        label: const Text('Add Appointment'),
      ),
      bottomNavigationBar: const CustomBottomBar(currentIndex: 0),
    );
  }

  Widget _buildUpcomingTab() {
    return ListView(
      children: [
        Padding(
          padding: const EdgeInsets.all(16),
          child: CalendarWidget(
            focusedDay: _focusedDay,
            selectedDay: _selectedDay,
            onDaySelected: _onDaySelected,
            appointments: _appointments,
          ),
        ),
        if (_upcomingAppointments.isEmpty)
          _buildEmptyState('No upcoming appointments',
              'Add your first appointment to get started')
        else
          ..._upcomingAppointments.map((appointment) {
            return AppointmentCardWidget(
              appointment: appointment,
              onTap: () => _showAppointmentDetail(appointment),
              onEdit: () => _showAddAppointmentModal(appointment: appointment),
              onDelete: () {
                setState(() {
                  _upcomingAppointments
                      .removeWhere((a) => a['id'] == appointment['id']);
                  _appointments.clear();
                  _initializeAppointments();
                });
              },
            );
          }),
        const SizedBox(height: 80),
      ],
    );
  }

  Widget _buildPastTab() {
    final theme = Theme.of(context);

    return ListView(
      children: [
        if (_pastAppointments.isEmpty)
          _buildEmptyState('No past appointments',
              'Your appointment history will appear here')
        else
          ..._pastAppointments.map((appointment) {
            return AppointmentCardWidget(
              appointment: appointment,
              onTap: () => _showAppointmentDetail(appointment),
              onEdit: () {},
              onDelete: () {
                setState(() {
                  _pastAppointments
                      .removeWhere((a) => a['id'] == appointment['id']);
                });
              },
            );
          }),
        const SizedBox(height: 80),
      ],
    );
  }

  Widget _buildEmptyState(String title, String subtitle) {
    final theme = Theme.of(context);

    return Padding(
      padding: const EdgeInsets.all(32),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            width: 120,
            height: 120,
            decoration: BoxDecoration(
              color: theme.colorScheme.primary.withValues(alpha: 0.1),
              shape: BoxShape.circle,
            ),
            child: Center(
              child: CustomIconWidget(
                iconName: 'event_available',
                color: theme.colorScheme.primary,
                size: 56,
              ),
            ),
          ),
          const SizedBox(height: 24),
          Text(
            title,
            style: theme.textTheme.titleLarge!.copyWith(
              fontWeight: FontWeight.w600,
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 8),
          Text(
            subtitle,
            style: theme.textTheme.bodyMedium!.copyWith(
              color: theme.colorScheme.onSurfaceVariant,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}
