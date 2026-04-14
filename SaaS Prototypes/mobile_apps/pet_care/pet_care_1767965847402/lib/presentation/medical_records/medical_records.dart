import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/add_medical_record_bottom_sheet.dart';
import './widgets/medical_record_filter_chips.dart';
import './widgets/medical_record_search_bar.dart';
import './widgets/medical_record_timeline_item.dart';

class MedicalRecords extends StatefulWidget {
  const MedicalRecords({super.key});

  @override
  State<MedicalRecords> createState() => _MedicalRecordsState();
}

class _MedicalRecordsState extends State<MedicalRecords>
    with TickerProviderStateMixin {
  String _searchQuery = '';
  String _selectedFilter = 'All Records';
  bool _isRefreshing = false;
  late AnimationController _refreshController;
  late Animation<double> _refreshAnimation;

  final List<String> _filters = [
    'All Records',
    'Vaccinations',
    'Medications',
    'Surgeries',
    'Illnesses',
    'Checkups',
    'Lab Results',
  ];

  List<Map<String, dynamic>> _medicalRecords = [
    {
      'id': 1,
      'title': 'Annual Wellness Checkup',
      'type': 'checkup',
      'date': '8/25/2025',
      'veterinarian': 'Dr. Sarah Johnson',
      'clinic': 'Happy Paws Veterinary Clinic',
      'description':
          'Comprehensive annual health examination including weight check, dental inspection, and overall wellness assessment. Max is in excellent health with no concerns noted.',
      'medications': [
        'Heartworm Prevention - Heartgard Plus',
        'Flea & Tick Prevention - NexGard'
      ],
      'attachments': [
        {
          'type': 'image',
          'url':
              'https://images.pexels.com/photos/4269505/pexels-photo-4269505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          'name': 'health_report.jpg'
        },
        {
          'type': 'document',
          'url': 'health_certificate.pdf',
          'name': 'Health Certificate'
        }
      ],
      'isExpanded': false,
      'createdAt': '2025-08-25T10:30:00Z',
    },
    {
      'id': 2,
      'title': 'Rabies Vaccination',
      'type': 'vaccination',
      'date': '8/20/2025',
      'veterinarian': 'Dr. Michael Chen',
      'clinic': 'City Animal Hospital',
      'description':
          'Annual rabies vaccination administered. Next dose due in 12 months. No adverse reactions observed.',
      'medications': ['Rabies Vaccine - Nobivac'],
      'attachments': [
        {
          'type': 'image',
          'url':
              'https://images.pexels.com/photos/6235234/pexels-photo-6235234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          'name': 'vaccination_certificate.jpg'
        }
      ],
      'isExpanded': false,
      'createdAt': '2025-08-20T14:15:00Z',
    },
    {
      'id': 3,
      'title': 'Dental Cleaning Surgery',
      'type': 'surgery',
      'date': '8/15/2025',
      'veterinarian': 'Dr. Emily Rodriguez',
      'clinic': 'Advanced Pet Dental Care',
      'description':
          'Professional dental cleaning under anesthesia. Two teeth extracted due to advanced periodontal disease. Recovery was smooth with no complications.',
      'medications': [
        'Pain Management - Rimadyl',
        'Antibiotic - Amoxicillin',
        'Soft Food Diet'
      ],
      'attachments': [
        {
          'type': 'image',
          'url':
              'https://images.pexels.com/photos/6816861/pexels-photo-6816861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          'name': 'dental_xray.jpg'
        },
        {
          'type': 'image',
          'url':
              'https://images.pexels.com/photos/7469137/pexels-photo-7469137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          'name': 'post_surgery.jpg'
        }
      ],
      'isExpanded': false,
      'createdAt': '2025-08-15T09:00:00Z',
    },
    {
      'id': 4,
      'title': 'Ear Infection Treatment',
      'type': 'illness',
      'date': '8/10/2025',
      'veterinarian': 'Dr. Sarah Johnson',
      'clinic': 'Happy Paws Veterinary Clinic',
      'description':
          'Diagnosed with bacterial ear infection in left ear. Prescribed antibiotic ear drops and oral medication. Follow-up appointment scheduled in 2 weeks.',
      'medications': ['Ear Drops - Otomax', 'Oral Antibiotic - Cephalexin'],
      'attachments': [
        {
          'type': 'image',
          'url':
              'https://images.pexels.com/photos/8434791/pexels-photo-8434791.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          'name': 'ear_examination.jpg'
        }
      ],
      'isExpanded': false,
      'createdAt': '2025-08-10T16:45:00Z',
    },
    {
      'id': 5,
      'title': 'Blood Work Panel',
      'type': 'lab results',
      'date': '8/5/2025',
      'veterinarian': 'Dr. Michael Chen',
      'clinic': 'City Animal Hospital',
      'description':
          'Complete blood chemistry panel and CBC performed as part of senior wellness screening. All values within normal ranges for age and breed.',
      'attachments': [
        {
          'type': 'document',
          'url': 'blood_work_results.pdf',
          'name': 'Lab Results'
        },
        {
          'type': 'image',
          'url':
              'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          'name': 'lab_report.jpg'
        }
      ],
      'isExpanded': false,
      'createdAt': '2025-08-05T11:20:00Z',
    },
    {
      'id': 6,
      'title': 'DHPP Booster Vaccination',
      'type': 'vaccination',
      'date': '7/30/2025',
      'veterinarian': 'Dr. Lisa Park',
      'clinic': 'Neighborhood Vet Clinic',
      'description':
          'DHPP (Distemper, Hepatitis, Parvovirus, Parainfluenza) booster vaccination administered. Next booster due in 3 years.',
      'medications': ['DHPP Vaccine - Vanguard Plus'],
      'attachments': [],
      'isExpanded': false,
      'createdAt': '2025-07-30T13:30:00Z',
    },
  ];

  @override
  void initState() {
    super.initState();
    _refreshController = AnimationController(
      duration: const Duration(milliseconds: 1000),
      vsync: this,
    );
    _refreshAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _refreshController,
      curve: Curves.easeInOut,
    ));
  }

  @override
  void dispose() {
    _refreshController.dispose();
    super.dispose();
  }

  List<Map<String, dynamic>> get _filteredRecords {
    List<Map<String, dynamic>> filtered = _medicalRecords;

    // Apply search filter
    if (_searchQuery.isNotEmpty) {
      filtered = filtered.where((record) {
        final title = (record['title'] as String? ?? '').toLowerCase();
        final description =
            (record['description'] as String? ?? '').toLowerCase();
        final veterinarian =
            (record['veterinarian'] as String? ?? '').toLowerCase();
        final clinic = (record['clinic'] as String? ?? '').toLowerCase();
        final query = _searchQuery.toLowerCase();

        return title.contains(query) ||
            description.contains(query) ||
            veterinarian.contains(query) ||
            clinic.contains(query);
      }).toList();
    }

    // Apply type filter
    if (_selectedFilter != 'All Records') {
      final filterType = _selectedFilter.toLowerCase().replaceAll('s', '');
      filtered = filtered.where((record) {
        final recordType = (record['type'] as String? ?? '').toLowerCase();
        return recordType.contains(filterType) ||
            filterType.contains(recordType);
      }).toList();
    }

    // Sort by date (newest first)
    filtered.sort((a, b) {
      final dateA =
          DateTime.tryParse(a['createdAt'] as String? ?? '') ?? DateTime.now();
      final dateB =
          DateTime.tryParse(b['createdAt'] as String? ?? '') ?? DateTime.now();
      return dateB.compareTo(dateA);
    });

    return filtered;
  }

  Map<String, int> get _filterCounts {
    final counts = <String, int>{};

    for (final filter in _filters) {
      if (filter == 'All Records') {
        counts[filter] = _medicalRecords.length;
      } else {
        final filterType = filter.toLowerCase().replaceAll('s', '');
        counts[filter] = _medicalRecords.where((record) {
          final recordType = (record['type'] as String? ?? '').toLowerCase();
          return recordType.contains(filterType) ||
              filterType.contains(recordType);
        }).length;
      }
    }

    return counts;
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final filteredRecords = _filteredRecords;

    return Scaffold(
      backgroundColor: theme.brightness == Brightness.light
          ? const Color(0xFFFAFBFC)
          : const Color(0xFF0F1419),
      appBar: AppBar(
        title: Text(
          'Medical Records',
          style: GoogleFonts.inter(
            fontSize: 14,
            fontWeight: FontWeight.w600,
            color: theme.brightness == Brightness.light
                ? const Color(0xFF1B1F23)
                : const Color(0xFFE8EAED),
          ),
        ),
        backgroundColor: theme.colorScheme.surface,
        elevation: 0,
        scrolledUnderElevation: 1,
        leading: IconButton(
          icon: CustomIconWidget(
            iconName: 'arrow_back_ios',
            color: theme.brightness == Brightness.light
                ? const Color(0xFF1B1F23)
                : const Color(0xFFE8EAED),
            size: 20,
          ),
          onPressed: () => Navigator.pop(context),
        ),
        actions: [
          IconButton(
            icon: CustomIconWidget(
              iconName: 'search',
              color: theme.brightness == Brightness.light
                  ? const Color(0xFF1B1F23)
                  : const Color(0xFFE8EAED),
              size: 24,
            ),
            onPressed: () {
              // Search functionality handled by search bar
            },
          ),
          IconButton(
            icon: CustomIconWidget(
              iconName: 'filter_list',
              color: theme.brightness == Brightness.light
                  ? const Color(0xFF1B1F23)
                  : const Color(0xFFE8EAED),
              size: 24,
            ),
            onPressed: _showFilterDialog,
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: _handleRefresh,
        color: theme.brightness == Brightness.light
            ? const Color(0xFF2B5F75)
            : const Color(0xFF4A8BA3),
        child: Column(
          children: [
            MedicalRecordSearchBar(
              searchQuery: _searchQuery,
              onSearchChanged: (query) => setState(() => _searchQuery = query),
              onFilterTap: _showFilterDialog,
              activeFiltersCount: _selectedFilter != 'All Records' ? 1 : null,
            ),
            MedicalRecordFilterChips(
              filters: _filters,
              selectedFilter: _selectedFilter,
              onFilterSelected: (filter) =>
                  setState(() => _selectedFilter = filter),
              filterCounts: _filterCounts,
            ),
            Expanded(
              child: filteredRecords.isEmpty
                  ? _buildEmptyState(theme)
                  : ListView.builder(
                      padding: EdgeInsets.only(bottom: 10.h),
                      itemCount: filteredRecords.length,
                      itemBuilder: (context, index) {
                        final record = filteredRecords[index];
                        return MedicalRecordTimelineItem(
                          record: record,
                          onTap: () =>
                              _toggleRecordExpansion(record['id'] as int),
                          onEdit: () => _editRecord(record),
                          onShare: () => _shareRecord(record),
                          onDelete: () => _deleteRecord(record['id'] as int),
                        );
                      },
                    ),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _showAddRecordBottomSheet,
        backgroundColor: theme.brightness == Brightness.light
            ? const Color(0xFFE8A547)
            : const Color(0xFFEDB865),
        foregroundColor: Colors.black,
        child: CustomIconWidget(
          iconName: 'add',
          color: Colors.black,
          size: 6.w,
        ),
      ),
    );
  }

  Widget _buildEmptyState(ThemeData theme) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          CustomIconWidget(
            iconName: 'medical_services',
            color: theme.brightness == Brightness.light
                ? const Color(0xFF6A737D)
                : const Color(0xFFADB5BD),
            size: 15.w,
          ),
          SizedBox(height: 3.h),
          Text(
            _searchQuery.isNotEmpty || _selectedFilter != 'All Records'
                ? 'No records found'
                : 'No medical records yet',
            style: GoogleFonts.inter(
              fontSize: 14,
              fontWeight: FontWeight.w600,
              color: theme.brightness == Brightness.light
                  ? const Color(0xFF1B1F23)
                  : const Color(0xFFE8EAED),
            ),
          ),
          SizedBox(height: 1.h),
          Text(
            _searchQuery.isNotEmpty || _selectedFilter != 'All Records'
                ? 'Try adjusting your search or filters'
                : 'Add your first medical record to get started',
            style: GoogleFonts.inter(
              fontSize: 14,
              fontWeight: FontWeight.w400,
              color: theme.brightness == Brightness.light
                  ? const Color(0xFF6A737D)
                  : const Color(0xFFADB5BD),
            ),
            textAlign: TextAlign.center,
          ),
          if (_searchQuery.isEmpty && _selectedFilter == 'All Records') ...[
            SizedBox(height: 4.h),
            ElevatedButton.icon(
              onPressed: _showAddRecordBottomSheet,
              icon: CustomIconWidget(
                iconName: 'add',
                color: Colors.white,
                size: 5.w,
              ),
              label: Text('Add Medical Record'),
              style: ElevatedButton.styleFrom(
                backgroundColor: theme.brightness == Brightness.light
                    ? const Color(0xFF2B5F75)
                    : const Color(0xFF4A8BA3),
                foregroundColor: Colors.white,
                padding: EdgeInsets.symmetric(horizontal: 6.w, vertical: 2.h),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }

  void _toggleRecordExpansion(int recordId) {
    setState(() {
      final recordIndex =
          _medicalRecords.indexWhere((record) => record['id'] == recordId);
      if (recordIndex != -1) {
        _medicalRecords[recordIndex]['isExpanded'] =
            !(_medicalRecords[recordIndex]['isExpanded'] as bool? ?? false);
      }
    });
  }

  void _editRecord(Map<String, dynamic> record) {
    // Navigate to edit screen or show edit dialog
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Edit functionality for ${record['title']}'),
        backgroundColor: Theme.of(context).brightness == Brightness.light
            ? const Color(0xFF2B5F75)
            : const Color(0xFF4A8BA3),
      ),
    );
  }

  void _shareRecord(Map<String, dynamic> record) {
    // Implement share functionality
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Sharing ${record['title']}'),
        backgroundColor: Theme.of(context).brightness == Brightness.light
            ? const Color(0xFF2B5F75)
            : const Color(0xFF4A8BA3),
      ),
    );
  }

  void _deleteRecord(int recordId) {
    setState(() {
      _medicalRecords.removeWhere((record) => record['id'] == recordId);
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Medical record deleted'),
        backgroundColor: AppTheme.errorLight,
        action: SnackBarAction(
          label: 'Undo',
          textColor: Colors.white,
          onPressed: () {
            // Implement undo functionality
          },
        ),
      ),
    );
  }

  Future<void> _handleRefresh() async {
    setState(() => _isRefreshing = true);
    _refreshController.forward();

    // Simulate API call
    await Future.delayed(const Duration(seconds: 2));

    _refreshController.reverse();
    setState(() => _isRefreshing = false);

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Medical records synced'),
        backgroundColor: AppTheme.successLight,
      ),
    );
  }

  void _showFilterDialog() {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      isScrollControlled: true,
      builder: (context) => Container(
        height: 50.h,
        decoration: BoxDecoration(
          color: Theme.of(context).colorScheme.surface,
          borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
        ),
        child: Column(
          children: [
            Container(
              width: 40,
              height: 4,
              margin: const EdgeInsets.symmetric(vertical: 12),
              decoration: BoxDecoration(
                color: Theme.of(context).brightness == Brightness.light
                    ? const Color(0xFFE1E4E8)
                    : const Color(0xFF30363D),
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
              child: Text(
                'Filter Medical Records',
                style: GoogleFonts.inter(
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                  color: Theme.of(context).brightness == Brightness.light
                      ? const Color(0xFF1B1F23)
                      : const Color(0xFFE8EAED),
                ),
              ),
            ),
            Expanded(
              child: ListView.builder(
                padding: EdgeInsets.symmetric(horizontal: 4.w),
                itemCount: _filters.length,
                itemBuilder: (context, index) {
                  final filter = _filters[index];
                  final isSelected = _selectedFilter == filter;
                  final count = _filterCounts[filter] ?? 0;

                  return ListTile(
                    title: Text(
                      filter,
                      style: GoogleFonts.inter(
                        fontSize: 14,
                        fontWeight:
                            isSelected ? FontWeight.w600 : FontWeight.w400,
                        color: isSelected
                            ? Theme.of(context).brightness == Brightness.light
                                ? const Color(0xFF2B5F75)
                                : const Color(0xFF4A8BA3)
                            : Theme.of(context).brightness == Brightness.light
                                ? const Color(0xFF1B1F23)
                                : const Color(0xFFE8EAED),
                      ),
                    ),
                    trailing: Container(
                      padding: EdgeInsets.symmetric(
                          horizontal: 2.w, vertical: 0.5.h),
                      decoration: BoxDecoration(
                        color: isSelected
                            ? (Theme.of(context).brightness == Brightness.light
                                ? const Color(0xFF2B5F75)
                                : const Color(0xFF4A8BA3))
                            : Theme.of(context).brightness == Brightness.light
                                ? const Color(0xFFF6F8FA)
                                : const Color(0xFF21262D),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Text(
                        count.toString(),
                        style: GoogleFonts.inter(
                          fontSize: 14,
                          fontWeight: FontWeight.w600,
                          color: isSelected
                              ? Colors.white
                              : Theme.of(context).brightness == Brightness.light
                                  ? const Color(0xFF6A737D)
                                  : const Color(0xFFADB5BD),
                        ),
                      ),
                    ),
                    onTap: () {
                      setState(() => _selectedFilter = filter);
                      Navigator.pop(context);
                    },
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _showAddRecordBottomSheet() {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      isScrollControlled: true,
      builder: (context) => AddMedicalRecordBottomSheet(
        onRecordAdded: (record) {
          setState(() {
            _medicalRecords.insert(0, record);
          });
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text('Medical record added successfully'),
              backgroundColor: AppTheme.successLight,
            ),
          );
        },
      ),
    );
  }
}
