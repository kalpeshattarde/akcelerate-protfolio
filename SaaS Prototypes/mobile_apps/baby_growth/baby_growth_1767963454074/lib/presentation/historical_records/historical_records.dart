import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/calendar_view_widget.dart';
import './widgets/data_type_selector_widget.dart';
import './widgets/date_range_selector_widget.dart';
import './widgets/empty_state_widget.dart';
import './widgets/export_options_widget.dart';
import './widgets/record_card_widget.dart';
import './widgets/search_bar_widget.dart';

class HistoricalRecords extends StatefulWidget {
  const HistoricalRecords({Key? key}) : super(key: key);

  @override
  State<HistoricalRecords> createState() => _HistoricalRecordsState();
}

class _HistoricalRecordsState extends State<HistoricalRecords>
    with TickerProviderStateMixin {
  String _selectedDateRange = 'Last Month';
  String _selectedDataType = 'All Activities';
  String _searchQuery = '';
  bool _isCalendarView = false;
  bool _isMultiSelectMode = false;
  DateTime _selectedCalendarDay = DateTime.now();
  List<int> _selectedRecordIndices = [];
  late AnimationController _fabAnimationController;
  late Animation<double> _fabAnimation;

  final List<Map<String, dynamic>> _allRecords = [
    {
      "id": 1,
      "category": "Growth",
      "title": "Weight Measurement",
      "description":
          "Monthly weight check showing healthy growth progression. Baby is gaining weight consistently.",
      "value": "18.5",
      "unit": "lbs",
      "timestamp": DateTime.now().subtract(const Duration(days: 2, hours: 3)),
      "hasPhoto": true,
    },
    {
      "id": 2,
      "category": "Feeding",
      "title": "Breastfeeding Session",
      "description":
          "Morning feeding session lasted 25 minutes. Baby seemed satisfied and content afterwards.",
      "value": "25",
      "unit": "minutes",
      "timestamp": DateTime.now().subtract(const Duration(days: 1, hours: 8)),
      "hasPhoto": false,
    },
    {
      "id": 3,
      "category": "Sleep",
      "title": "Night Sleep",
      "description":
          "Full night sleep from 8 PM to 6 AM. Only woke up once for feeding at 2 AM.",
      "value": "10",
      "unit": "hours",
      "timestamp": DateTime.now().subtract(const Duration(days: 1, hours: 12)),
      "hasPhoto": false,
    },
    {
      "id": 4,
      "category": "Milestone",
      "title": "First Smile",
      "description":
          "Baby smiled for the first time! It was such a precious moment. The smile lasted for several seconds.",
      "value": "",
      "unit": "",
      "timestamp": DateTime.now().subtract(const Duration(days: 5, hours: 2)),
      "hasPhoto": true,
    },
    {
      "id": 5,
      "category": "Growth",
      "title": "Height Measurement",
      "description":
          "Monthly height measurement showing good growth. Pediatrician is pleased with the progress.",
      "value": "24.5",
      "unit": "inches",
      "timestamp": DateTime.now().subtract(const Duration(days: 7, hours: 1)),
      "hasPhoto": false,
    },
    {
      "id": 6,
      "category": "Feeding",
      "title": "Bottle Feeding",
      "description":
          "Evening bottle feeding with formula. Baby drank the entire bottle and burped well.",
      "value": "6",
      "unit": "oz",
      "timestamp": DateTime.now().subtract(const Duration(days: 3, hours: 6)),
      "hasPhoto": false,
    },
    {
      "id": 7,
      "category": "Sleep",
      "title": "Afternoon Nap",
      "description":
          "Peaceful afternoon nap in the crib. Baby fell asleep easily and woke up refreshed.",
      "value": "2.5",
      "unit": "hours",
      "timestamp": DateTime.now().subtract(const Duration(days: 4, hours: 4)),
      "hasPhoto": false,
    },
    {
      "id": 8,
      "category": "Milestone",
      "title": "Rolling Over",
      "description":
          "Baby rolled over from back to tummy for the first time! Such an exciting developmental milestone.",
      "value": "",
      "unit": "",
      "timestamp": DateTime.now().subtract(const Duration(days: 10, hours: 3)),
      "hasPhoto": true,
    },
    {
      "id": 9,
      "category": "Growth",
      "title": "Head Circumference",
      "description":
          "Regular head circumference measurement during pediatric visit. Growth is on track.",
      "value": "16.2",
      "unit": "inches",
      "timestamp": DateTime.now().subtract(const Duration(days: 14, hours: 2)),
      "hasPhoto": false,
    },
    {
      "id": 10,
      "category": "Feeding",
      "title": "First Solid Food",
      "description":
          "Introduction to rice cereal! Baby was curious and managed to eat a few spoonfuls.",
      "value": "2",
      "unit": "tbsp",
      "timestamp": DateTime.now().subtract(const Duration(days: 12, hours: 5)),
      "hasPhoto": true,
    },
  ];

  @override
  void initState() {
    super.initState();
    _fabAnimationController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );
    _fabAnimation = CurvedAnimation(
      parent: _fabAnimationController,
      curve: Curves.easeInOut,
    );
  }

  @override
  void dispose() {
    _fabAnimationController.dispose();
    super.dispose();
  }

  List<Map<String, dynamic>> get _filteredRecords {
    List<Map<String, dynamic>> filtered = List.from(_allRecords);

    // Filter by date range
    final now = DateTime.now();
    DateTime startDate;
    switch (_selectedDateRange) {
      case 'Last Week':
        startDate = now.subtract(const Duration(days: 7));
        break;
      case 'Last Month':
        startDate = now.subtract(const Duration(days: 30));
        break;
      case 'Last 3 Months':
        startDate = now.subtract(const Duration(days: 90));
        break;
      default:
        startDate = DateTime(2020);
    }

    filtered = filtered.where((record) {
      final recordDate = record['timestamp'] as DateTime? ?? DateTime.now();
      return recordDate.isAfter(startDate);
    }).toList();

    // Filter by data type
    if (_selectedDataType != 'All Activities') {
      filtered = filtered.where((record) {
        final category = record['category'] as String? ?? '';
        return category.toLowerCase() == _selectedDataType.toLowerCase();
      }).toList();
    }

    // Filter by search query
    if (_searchQuery.isNotEmpty) {
      filtered = filtered.where((record) {
        final title = (record['title'] as String? ?? '').toLowerCase();
        final description =
            (record['description'] as String? ?? '').toLowerCase();
        final category = (record['category'] as String? ?? '').toLowerCase();
        final query = _searchQuery.toLowerCase();

        return title.contains(query) ||
            description.contains(query) ||
            category.contains(query);
      }).toList();
    }

    // Sort by timestamp (newest first)
    filtered.sort((a, b) {
      final aTime = a['timestamp'] as DateTime? ?? DateTime.now();
      final bTime = b['timestamp'] as DateTime? ?? DateTime.now();
      return bTime.compareTo(aTime);
    });

    return filtered;
  }

  void _toggleMultiSelectMode() {
    setState(() {
      _isMultiSelectMode = !_isMultiSelectMode;
      _selectedRecordIndices.clear();

      if (_isMultiSelectMode) {
        _fabAnimationController.forward();
      } else {
        _fabAnimationController.reverse();
      }
    });
  }

  void _toggleRecordSelection(int index) {
    setState(() {
      if (_selectedRecordIndices.contains(index)) {
        _selectedRecordIndices.remove(index);
      } else {
        _selectedRecordIndices.add(index);
      }
    });
  }

  void _showExportOptions() {
    final selectedRecords =
        _selectedRecordIndices.map((index) => _filteredRecords[index]).toList();

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => ExportOptionsWidget(
        selectedRecords: selectedRecords,
        onClose: () {
          Navigator.pop(context);
          _toggleMultiSelectMode();
        },
      ),
    );
  }

  void _deleteSelectedRecords() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Delete Records'),
        content: Text(
          'Are you sure you want to delete ${_selectedRecordIndices.length} selected record(s)? This action cannot be undone.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              // In a real app, this would delete from the database
              Navigator.pop(context);
              _toggleMultiSelectMode();
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content:
                      Text('${_selectedRecordIndices.length} records deleted'),
                  backgroundColor: AppTheme.getSuccessColor(true),
                ),
              );
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: AppTheme.getErrorColor(true),
            ),
            child: Text('Delete'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    final filteredRecords = _filteredRecords;

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      appBar: AppBar(
        title: Text(
          'Historical Records',
          style: theme.appBarTheme.titleTextStyle,
        ),
        backgroundColor: theme.appBarTheme.backgroundColor,
        elevation: theme.appBarTheme.elevation,
        leading: IconButton(
          onPressed: () => Navigator.pop(context),
          icon: CustomIconWidget(
            iconName: 'arrow_back',
            size: 24,
            color: colorScheme.onSurface,
          ),
        ),
        actions: [
          if (_isMultiSelectMode) ...[
            IconButton(
              onPressed: _selectedRecordIndices.isNotEmpty
                  ? _deleteSelectedRecords
                  : null,
              icon: CustomIconWidget(
                iconName: 'delete',
                size: 24,
                color: _selectedRecordIndices.isNotEmpty
                    ? AppTheme.getContextErrorColor(context)
                    : colorScheme.onSurfaceVariant,
              ),
            ),
            IconButton(
              onPressed:
                  _selectedRecordIndices.isNotEmpty ? _showExportOptions : null,
              icon: CustomIconWidget(
                iconName: 'file_download',
                size: 24,
                color: _selectedRecordIndices.isNotEmpty
                    ? colorScheme.primary
                    : colorScheme.onSurfaceVariant,
              ),
            ),
          ] else ...[
            IconButton(
              onPressed: _toggleMultiSelectMode,
              icon: CustomIconWidget(
                iconName: 'checklist',
                size: 24,
                color: colorScheme.onSurface,
              ),
            ),
            IconButton(
              onPressed: () {
                setState(() {
                  _isCalendarView = !_isCalendarView;
                });
              },
              icon: CustomIconWidget(
                iconName: _isCalendarView ? 'view_list' : 'calendar_month',
                size: 24,
                color: colorScheme.onSurface,
              ),
            ),
          ],
        ],
      ),
      body: RefreshIndicator(
        onRefresh: () async {
          // Simulate refresh
          await Future.delayed(const Duration(seconds: 1));
          setState(() {});
        },
        child: CustomScrollView(
          slivers: [
            SliverToBoxAdapter(
              child: Column(
                children: [
                  SizedBox(height: 2.h),
                  DateRangeSelectorWidget(
                    selectedRange: _selectedDateRange,
                    onRangeSelected: (range) {
                      setState(() {
                        _selectedDateRange = range;
                      });
                    },
                  ),
                  SizedBox(height: 2.h),
                  DataTypeSelectorWidget(
                    selectedType: _selectedDataType,
                    onTypeSelected: (type) {
                      setState(() {
                        _selectedDataType = type;
                      });
                    },
                  ),
                  SizedBox(height: 2.h),
                  SearchBarWidget(
                    searchQuery: _searchQuery,
                    onSearchChanged: (query) {
                      setState(() {
                        _searchQuery = query;
                      });
                    },
                    onFilterTap: () {
                      // Show advanced filter options
                    },
                  ),
                  if (_isCalendarView) ...[
                    SizedBox(height: 2.h),
                    CalendarViewWidget(
                      records: filteredRecords,
                      selectedDay: _selectedCalendarDay,
                      onDaySelected: (day) {
                        setState(() {
                          _selectedCalendarDay = day;
                        });
                      },
                    ),
                  ],
                  SizedBox(height: 2.h),
                ],
              ),
            ),
            if (filteredRecords.isEmpty)
              SliverFillRemaining(
                child: EmptyStateWidget(
                  title: _searchQuery.isNotEmpty
                      ? 'No matching records found'
                      : 'No records yet',
                  description: _searchQuery.isNotEmpty
                      ? 'Try adjusting your search terms or date range to find more records.'
                      : 'Start tracking your baby\'s activities to see them here. Every milestone matters!',
                  actionText: 'Start Tracking',
                  iconName: _searchQuery.isNotEmpty ? 'search_off' : 'history',
                  onActionTap: () {
                    Navigator.pushNamed(context, '/dashboard-home');
                  },
                ),
              )
            else
              SliverList(
                delegate: SliverChildBuilderDelegate(
                  (context, index) {
                    final record = filteredRecords[index];
                    return RecordCardWidget(
                      record: record,
                      isSelected: _selectedRecordIndices.contains(index),
                      onSelectionChanged: _isMultiSelectMode
                          ? (selected) => _toggleRecordSelection(index)
                          : null,
                      onTap: () {
                        if (!_isMultiSelectMode) {
                          // Navigate to detailed view
                        }
                      },
                      onEdit: () {
                        // Navigate to edit screen
                        final category = record['category'] as String? ?? '';
                        switch (category.toLowerCase()) {
                          case 'growth':
                            Navigator.pushNamed(context, '/growth-tracking');
                            break;
                          case 'feeding':
                            Navigator.pushNamed(context, '/feeding-log');
                            break;
                          case 'sleep':
                            Navigator.pushNamed(context, '/sleep-tracker');
                            break;
                          case 'milestone':
                            Navigator.pushNamed(context, '/milestone-tracker');
                            break;
                          default:
                            Navigator.pushNamed(context, '/dashboard-home');
                        }
                      },
                    );
                  },
                  childCount: filteredRecords.length,
                ),
              ),
            SliverToBoxAdapter(
              child: SizedBox(height: 10.h),
            ),
          ],
        ),
      ),
      floatingActionButton: _isMultiSelectMode
          ? ScaleTransition(
              scale: _fabAnimation,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  if (_selectedRecordIndices.isNotEmpty) ...[
                    FloatingActionButton(
                      onPressed: _showExportOptions,
                      backgroundColor: colorScheme.primary,
                      heroTag: "export",
                      child: CustomIconWidget(
                        iconName: 'file_download',
                        size: 24,
                        color: colorScheme.onPrimary,
                      ),
                    ),
                    SizedBox(height: 2.h),
                  ],
                  FloatingActionButton(
                    onPressed: _toggleMultiSelectMode,
                    backgroundColor: colorScheme.surface,
                    heroTag: "cancel",
                    child: CustomIconWidget(
                      iconName: 'close',
                      size: 24,
                      color: colorScheme.onSurface,
                    ),
                  ),
                ],
              ),
            )
          : FloatingActionButton(
              onPressed: () {
                Navigator.pushNamed(context, '/dashboard-home');
              },
              backgroundColor: colorScheme.primary,
              child: CustomIconWidget(
                iconName: 'add',
                size: 24,
                color: colorScheme.onPrimary,
              ),
            ),
    );
  }
}
