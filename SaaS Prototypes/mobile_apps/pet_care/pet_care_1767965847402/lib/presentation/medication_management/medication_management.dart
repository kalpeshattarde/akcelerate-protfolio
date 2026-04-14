import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/medication_card_widget.dart';
import './widgets/medication_entry_form_widget.dart';
import './widgets/medication_filter_widget.dart';
import './widgets/medication_quick_actions_widget.dart';

class MedicationManagement extends StatefulWidget {
  const MedicationManagement({super.key});

  @override
  State<MedicationManagement> createState() => _MedicationManagementState();
}

class _MedicationManagementState extends State<MedicationManagement>
    with TickerProviderStateMixin {
  late TabController _tabController;
  List<Map<String, dynamic>> _medications = [];
  List<Map<String, dynamic>> _filteredMedications = [];
  Map<String, dynamic> _currentFilters = {
    'status': 'All',
    'pet': 'All Pets',
    'frequency': 'All',
    'startDate': null,
    'endDate': null,
  };

  final List<String> _tabLabels = ['Active', 'Scheduled', 'Completed', 'All'];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: _tabLabels.length, vsync: this);
    _initializeMockData();
    _applyFilters();
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  void _initializeMockData() {
    _medications = [
      {
        "id": 1,
        "petName": "Buddy",
        "petPhoto":
            "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400",
        "medicationName": "Carprofen",
        "dosage": "25mg",
        "frequency": "Twice daily",
        "nextDoseTime": "Today 2:00 PM",
        "timeUntilNext": "2h 30m",
        "status": "due",
        "remainingPills": 15,
        "instructions": "Give with food to prevent stomach upset",
        "startDate": "2025-08-20T00:00:00.000Z",
        "duration": "14 Days",
      },
      {
        "id": 2,
        "petName": "Luna",
        "petPhoto":
            "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=400",
        "medicationName": "Prednisolone",
        "dosage": "5mg",
        "frequency": "Once daily",
        "nextDoseTime": "Tomorrow 8:00 AM",
        "timeUntilNext": "18h 15m",
        "status": "upcoming",
        "remainingPills": 28,
        "instructions": "Administer in the morning with breakfast",
        "startDate": "2025-08-25T00:00:00.000Z",
        "duration": "30 Days",
      },
      {
        "id": 3,
        "petName": "Max",
        "petPhoto":
            "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=400",
        "medicationName": "Gabapentin",
        "dosage": "100mg",
        "frequency": "Three times daily",
        "nextDoseTime": "Today 6:00 PM",
        "timeUntilNext": "6h 45m",
        "status": "upcoming",
        "remainingPills": 45,
        "instructions": "Can be given with or without food",
        "startDate": "2025-08-22T00:00:00.000Z",
        "duration": "21 Days",
      },
      {
        "id": 4,
        "petName": "Buddy",
        "petPhoto":
            "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400",
        "medicationName": "Metacam",
        "dosage": "1.5ml",
        "frequency": "Once daily",
        "nextDoseTime": "Today 11:30 AM",
        "timeUntilNext": "Overdue",
        "status": "overdue",
        "remainingPills": 8,
        "instructions": "Shake well before use. Give directly or mix with food",
        "startDate": "2025-08-15T00:00:00.000Z",
        "duration": "10 Days",
      },
      {
        "id": 5,
        "petName": "Luna",
        "petPhoto":
            "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=400",
        "medicationName": "Amoxicillin",
        "dosage": "62.5mg",
        "frequency": "Twice daily",
        "nextDoseTime": "Completed",
        "timeUntilNext": "Course finished",
        "status": "completed",
        "remainingPills": 0,
        "instructions": "Complete full course even if symptoms improve",
        "startDate": "2025-08-10T00:00:00.000Z",
        "duration": "10 Days",
      },
    ];
  }

  void _applyFilters() {
    setState(() {
      _filteredMedications = _medications.where((medication) {
        // Status filter
        if (_currentFilters['status'] != 'All' &&
            medication['status'] != _currentFilters['status'].toLowerCase()) {
          return false;
        }

        // Pet filter
        if (_currentFilters['pet'] != 'All Pets' &&
            medication['petName'] != _currentFilters['pet']) {
          return false;
        }

        // Frequency filter
        if (_currentFilters['frequency'] != 'All' &&
            medication['frequency'] != _currentFilters['frequency']) {
          return false;
        }

        // Date range filter
        if (_currentFilters['startDate'] != null) {
          final medicationDate =
              DateTime.parse(medication['startDate'] as String);
          if (medicationDate.isBefore(_currentFilters['startDate'])) {
            return false;
          }
        }

        if (_currentFilters['endDate'] != null) {
          final medicationDate =
              DateTime.parse(medication['startDate'] as String);
          if (medicationDate.isAfter(_currentFilters['endDate'])) {
            return false;
          }
        }

        return true;
      }).toList();
    });
  }

  List<Map<String, dynamic>> _getFilteredMedicationsByTab(int tabIndex) {
    switch (tabIndex) {
      case 0: // Active
        return _filteredMedications
            .where((med) =>
                (med['status'] as String).toLowerCase() == 'due' ||
                (med['status'] as String).toLowerCase() == 'overdue')
            .toList();
      case 1: // Scheduled
        return _filteredMedications
            .where(
                (med) => (med['status'] as String).toLowerCase() == 'upcoming')
            .toList();
      case 2: // Completed
        return _filteredMedications
            .where(
                (med) => (med['status'] as String).toLowerCase() == 'completed')
            .toList();
      case 3: // All
      default:
        return _filteredMedications;
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Medication Management',
          style: theme.textTheme.titleLarge?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
        actions: [
          IconButton(
            onPressed: _showFilterBottomSheet,
            icon: CustomIconWidget(
              iconName: 'filter_list',
              color: theme.brightness == Brightness.light
                  ? AppTheme.textPrimaryLight
                  : AppTheme.textPrimaryDark,
              size: 24,
            ),
            tooltip: 'Filter medications',
          ),
          IconButton(
            onPressed: () => _showMedicationEntryForm(),
            icon: CustomIconWidget(
              iconName: 'add',
              color: theme.brightness == Brightness.light
                  ? AppTheme.textPrimaryLight
                  : AppTheme.textPrimaryDark,
              size: 24,
            ),
            tooltip: 'Add medication',
          ),
        ],
        bottom: TabBar(
          controller: _tabController,
          tabs: _tabLabels.map((label) => Tab(text: label)).toList(),
          labelColor: AppTheme.primaryLight,
          unselectedLabelColor: theme.brightness == Brightness.light
              ? AppTheme.textSecondaryLight
              : AppTheme.textSecondaryDark,
          indicatorColor: AppTheme.primaryLight,
          labelStyle: theme.textTheme.labelLarge?.copyWith(
            fontWeight: FontWeight.w600,
          ),
          unselectedLabelStyle: theme.textTheme.labelLarge?.copyWith(
            fontWeight: FontWeight.w400,
          ),
        ),
      ),
      body: Column(
        children: [
          _buildSummaryCards(),
          Expanded(
            child: TabBarView(
              controller: _tabController,
              children: _tabLabels.asMap().entries.map((entry) {
                return _buildMedicationList(entry.key);
              }).toList(),
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _showMedicationEntryForm(),
        child: CustomIconWidget(
          iconName: 'add',
          color: Colors.white,
          size: 24,
        ),
        tooltip: 'Add new medication',
      ),
    );
  }

  Widget _buildSummaryCards() {
    final theme = Theme.of(context);
    final dueMedications = _medications
        .where((med) => (med['status'] as String).toLowerCase() == 'due')
        .length;
    final overdueMedications = _medications
        .where((med) => (med['status'] as String).toLowerCase() == 'overdue')
        .length;
    final upcomingMedications = _medications
        .where((med) => (med['status'] as String).toLowerCase() == 'upcoming')
        .length;

    return Container(
      padding: EdgeInsets.all(4.w),
      child: Row(
        children: [
          Expanded(
            child: _buildSummaryCard(
              'Due Now',
              dueMedications.toString(),
              AppTheme.errorLight,
              Icons.schedule,
            ),
          ),
          SizedBox(width: 3.w),
          Expanded(
            child: _buildSummaryCard(
              'Overdue',
              overdueMedications.toString(),
              AppTheme.warningLight,
              Icons.warning,
            ),
          ),
          SizedBox(width: 3.w),
          Expanded(
            child: _buildSummaryCard(
              'Upcoming',
              upcomingMedications.toString(),
              AppTheme.primaryLight,
              Icons.access_time,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSummaryCard(
      String title, String count, Color color, IconData icon) {
    final theme = Theme.of(context);

    return Container(
      padding: EdgeInsets.all(3.w),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: color.withValues(alpha: 0.3),
          width: 1,
        ),
      ),
      child: Column(
        children: [
          CustomIconWidget(
            iconName: icon.codePoint.toString(),
            color: color,
            size: 24,
          ),
          SizedBox(height: 1.h),
          Text(
            count,
            style: theme.textTheme.headlineSmall?.copyWith(
              color: color,
              fontWeight: FontWeight.w700,
            ),
          ),
          Text(
            title,
            style: theme.textTheme.labelMedium?.copyWith(
              color: color,
              fontWeight: FontWeight.w500,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  Widget _buildMedicationList(int tabIndex) {
    final medications = _getFilteredMedicationsByTab(tabIndex);

    if (medications.isEmpty) {
      return _buildEmptyState(tabIndex);
    }

    return RefreshIndicator(
      onRefresh: _refreshMedications,
      color: AppTheme.primaryLight,
      child: ListView.builder(
        padding: EdgeInsets.symmetric(vertical: 2.h),
        itemCount: medications.length,
        itemBuilder: (context, index) {
          final medication = medications[index];
          return MedicationCardWidget(
            medication: medication,
            onSwipeRight: () => _markDoseAsGiven(medication),
            onSwipeLeft: () => _showQuickActions(medication),
            onTap: () => _showMedicationDetails(medication),
          );
        },
      ),
    );
  }

  Widget _buildEmptyState(int tabIndex) {
    final theme = Theme.of(context);
    String title;
    String subtitle;
    IconData icon;

    switch (tabIndex) {
      case 0:
        title = 'No Active Medications';
        subtitle = 'All medications are up to date';
        icon = Icons.check_circle_outline;
        break;
      case 1:
        title = 'No Scheduled Medications';
        subtitle = 'No upcoming doses scheduled';
        icon = Icons.schedule;
        break;
      case 2:
        title = 'No Completed Medications';
        subtitle = 'No medication courses finished yet';
        icon = Icons.history;
        break;
      default:
        title = 'No Medications';
        subtitle = 'Add your first medication to get started';
        icon = Icons.medication_outlined;
    }

    return Center(
      child: Padding(
        padding: EdgeInsets.all(8.w),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CustomIconWidget(
              iconName: icon.codePoint.toString(),
              color: theme.brightness == Brightness.light
                  ? AppTheme.textSecondaryLight
                  : AppTheme.textSecondaryDark,
              size: 64,
            ),
            SizedBox(height: 3.h),
            Text(
              title,
              style: theme.textTheme.titleLarge?.copyWith(
                color: theme.brightness == Brightness.light
                    ? AppTheme.textSecondaryLight
                    : AppTheme.textSecondaryDark,
              ),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 1.h),
            Text(
              subtitle,
              style: theme.textTheme.bodyMedium?.copyWith(
                color: theme.brightness == Brightness.light
                    ? AppTheme.textDisabledLight
                    : AppTheme.textDisabledDark,
              ),
              textAlign: TextAlign.center,
            ),
            if (tabIndex == 3) ...[
              SizedBox(height: 4.h),
              ElevatedButton.icon(
                onPressed: () => _showMedicationEntryForm(),
                icon: CustomIconWidget(
                  iconName: 'add',
                  color: Colors.white,
                  size: 20,
                ),
                label: Text('Add Medication'),
                style: ElevatedButton.styleFrom(
                  padding: EdgeInsets.symmetric(horizontal: 6.w, vertical: 2.h),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }

  void _showFilterBottomSheet() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => DraggableScrollableSheet(
        initialChildSize: 0.7,
        maxChildSize: 0.9,
        minChildSize: 0.5,
        builder: (context, scrollController) => MedicationFilterWidget(
          currentFilters: _currentFilters,
          onFilterChanged: (filters) {
            setState(() {
              _currentFilters = filters;
            });
            _applyFilters();
          },
        ),
      ),
    );
  }

  void _showMedicationEntryForm({Map<String, dynamic>? existingMedication}) {
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (context) => MedicationEntryFormWidget(
          existingMedication: existingMedication,
          onSave: (medicationData) {
            setState(() {
              if (existingMedication != null) {
                final index = _medications
                    .indexWhere((med) => med['id'] == existingMedication['id']);
                if (index != -1) {
                  _medications[index] = medicationData;
                }
              } else {
                _medications.add(medicationData);
              }
            });
            _applyFilters();
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                content: Text(
                  existingMedication != null
                      ? 'Medication updated successfully'
                      : 'Medication added successfully',
                ),
                backgroundColor: AppTheme.successLight,
              ),
            );
          },
        ),
      ),
    );
  }

  void _showQuickActions(Map<String, dynamic> medication) {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (context) => MedicationQuickActionsWidget(
        medication: medication,
        onSkipDose: () => _skipDose(medication),
        onEditSchedule: () =>
            _showMedicationEntryForm(existingMedication: medication),
        onRefillAlert: () => _setRefillAlert(medication),
        onViewHistory: () => _viewMedicationHistory(medication),
      ),
    );
  }

  void _showMedicationDetails(Map<String, dynamic> medication) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(medication['medicationName'] as String),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Pet: ${medication['petName']}'),
            SizedBox(height: 1.h),
            Text('Dosage: ${medication['dosage']}'),
            SizedBox(height: 1.h),
            Text('Frequency: ${medication['frequency']}'),
            SizedBox(height: 1.h),
            Text('Next Dose: ${medication['nextDoseTime']}'),
            SizedBox(height: 1.h),
            Text('Remaining: ${medication['remainingPills']} pills'),
            if (medication['instructions'] != null &&
                (medication['instructions'] as String).isNotEmpty) ...[
              SizedBox(height: 2.h),
              Text(
                'Instructions:',
                style: Theme.of(context).textTheme.titleSmall?.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
              ),
              SizedBox(height: 0.5.h),
              Text(medication['instructions'] as String),
            ],
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: Text('Close'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.of(context).pop();
              _showMedicationEntryForm(existingMedication: medication);
            },
            child: Text('Edit'),
          ),
        ],
      ),
    );
  }

  Future<void> _refreshMedications() async {
    await Future.delayed(Duration(seconds: 1));
    setState(() {
      // Simulate data refresh
      _initializeMockData();
    });
    _applyFilters();
  }

  void _markDoseAsGiven(Map<String, dynamic> medication) {
    setState(() {
      medication['status'] = 'completed';
      medication['nextDoseTime'] = _calculateNextDoseTime(medication);
      medication['timeUntilNext'] = _calculateTimeUntilNext(medication);
      if (medication['remainingPills'] > 0) {
        medication['remainingPills'] =
            (medication['remainingPills'] as int) - 1;
      }
    });
    _applyFilters();

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Dose marked as given for ${medication['petName']}'),
        backgroundColor: AppTheme.successLight,
        action: SnackBarAction(
          label: 'Undo',
          textColor: Colors.white,
          onPressed: () => _undoMarkDose(medication),
        ),
      ),
    );
  }

  void _undoMarkDose(Map<String, dynamic> medication) {
    setState(() {
      medication['status'] = 'due';
      medication['remainingPills'] = (medication['remainingPills'] as int) + 1;
    });
    _applyFilters();
  }

  void _skipDose(Map<String, dynamic> medication) {
    setState(() {
      medication['nextDoseTime'] = _calculateNextDoseTime(medication);
      medication['timeUntilNext'] = _calculateTimeUntilNext(medication);
      medication['status'] = 'upcoming';
    });
    _applyFilters();

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Dose skipped for ${medication['petName']}'),
        backgroundColor: AppTheme.warningLight,
      ),
    );
  }

  void _setRefillAlert(Map<String, dynamic> medication) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Refill alert set for ${medication['medicationName']}'),
        backgroundColor: AppTheme.accentLight,
      ),
    );
  }

  void _viewMedicationHistory(Map<String, dynamic> medication) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Viewing history for ${medication['medicationName']}'),
        backgroundColor: AppTheme.primaryLight,
      ),
    );
  }

  String _calculateNextDoseTime(Map<String, dynamic> medication) {
    final frequency = medication['frequency'] as String;
    final now = DateTime.now();

    switch (frequency.toLowerCase()) {
      case 'once daily':
        return 'Tomorrow ${TimeOfDay.fromDateTime(now.add(Duration(days: 1))).format(context)}';
      case 'twice daily':
        return 'Today ${TimeOfDay.fromDateTime(now.add(Duration(hours: 12))).format(context)}';
      case 'three times daily':
        return 'Today ${TimeOfDay.fromDateTime(now.add(Duration(hours: 8))).format(context)}';
      default:
        return 'Next scheduled time';
    }
  }

  String _calculateTimeUntilNext(Map<String, dynamic> medication) {
    final frequency = medication['frequency'] as String;

    switch (frequency.toLowerCase()) {
      case 'once daily':
        return '24h 0m';
      case 'twice daily':
        return '12h 0m';
      case 'three times daily':
        return '8h 0m';
      default:
        return 'Variable';
    }
  }
}
