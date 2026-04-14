import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/add_measurement_widget.dart';
import './widgets/baby_profile_header_widget.dart';
import './widgets/growth_chart_widget.dart';
import './widgets/measurement_summary_widget.dart';

class GrowthTracking extends StatefulWidget {
  const GrowthTracking({Key? key}) : super(key: key);

  @override
  State<GrowthTracking> createState() => _GrowthTrackingState();
}

class _GrowthTrackingState extends State<GrowthTracking>
    with SingleTickerProviderStateMixin {
  String _selectedChartType = 'weight';
  late AnimationController _animationController;
  late Animation<double> _fadeAnimation;

  // Mock baby profile data
  final Map<String, dynamic> _babyProfile = {
    'name': 'Emma Rose',
    'birthDate': '2024-01-15',
    'photo':
        'https://images.pexels.com/photos/1257110/pexels-photo-1257110.jpeg?auto=compress&cs=tinysrgb&w=400',
  };

  // Mock measurements data
  List<Map<String, dynamic>> _measurements = [
    {
      'id': 1,
      'type': 'weight',
      'value': 8.5,
      'unit': 'lbs',
      'date': '2024-01-20',
    },
    {
      'id': 2,
      'type': 'height',
      'value': 20.5,
      'unit': 'inches',
      'date': '2024-01-20',
    },
    {
      'id': 3,
      'type': 'head',
      'value': 14.2,
      'unit': 'inches',
      'date': '2024-01-20',
    },
    {
      'id': 4,
      'type': 'weight',
      'value': 9.2,
      'unit': 'lbs',
      'date': '2024-02-15',
    },
    {
      'id': 5,
      'type': 'height',
      'value': 21.8,
      'unit': 'inches',
      'date': '2024-02-15',
    },
    {
      'id': 6,
      'type': 'head',
      'value': 14.8,
      'unit': 'inches',
      'date': '2024-02-15',
    },
    {
      'id': 7,
      'type': 'weight',
      'value': 10.1,
      'unit': 'lbs',
      'date': '2024-03-20',
    },
    {
      'id': 8,
      'type': 'height',
      'value': 23.2,
      'unit': 'inches',
      'date': '2024-03-20',
    },
    {
      'id': 9,
      'type': 'head',
      'value': 15.4,
      'unit': 'inches',
      'date': '2024-03-20',
    },
    {
      'id': 10,
      'type': 'weight',
      'value': 11.3,
      'unit': 'lbs',
      'date': '2024-04-25',
    },
    {
      'id': 11,
      'type': 'height',
      'value': 24.5,
      'unit': 'inches',
      'date': '2024-04-25',
    },
    {
      'id': 12,
      'type': 'head',
      'value': 16.1,
      'unit': 'inches',
      'date': '2024-04-25',
    },
    {
      'id': 13,
      'type': 'weight',
      'value': 12.8,
      'unit': 'lbs',
      'date': '2024-06-10',
    },
    {
      'id': 14,
      'type': 'height',
      'value': 26.1,
      'unit': 'inches',
      'date': '2024-06-10',
    },
    {
      'id': 15,
      'type': 'head',
      'value': 16.8,
      'unit': 'inches',
      'date': '2024-06-10',
    },
    {
      'id': 16,
      'type': 'weight',
      'value': 14.2,
      'unit': 'lbs',
      'date': '2024-08-15',
    },
    {
      'id': 17,
      'type': 'height',
      'value': 27.8,
      'unit': 'inches',
      'date': '2024-08-15',
    },
    {
      'id': 18,
      'type': 'head',
      'value': 17.4,
      'unit': 'inches',
      'date': '2024-08-15',
    },
  ];

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 800),
      vsync: this,
    );
    _fadeAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeInOut,
    ));
    _animationController.forward();
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      appBar: _buildAppBar(),
      body: FadeTransition(
        opacity: _fadeAnimation,
        child: _buildBody(),
      ),
      floatingActionButton: _buildFloatingActionButton(),
    );
  }

  PreferredSizeWidget _buildAppBar() {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return AppBar(
      title: Text(
        'Growth Tracking',
        style: theme.textTheme.titleLarge?.copyWith(
          fontWeight: FontWeight.w600,
        ),
      ),
      backgroundColor: theme.scaffoldBackgroundColor,
      elevation: 0,
      leading: IconButton(
        onPressed: () => Navigator.pop(context),
        icon: CustomIconWidget(
          iconName: 'arrow_back',
          color: colorScheme.onSurface,
          size: 24,
        ),
      ),
      actions: [
        IconButton(
          onPressed: _showMoreOptions,
          icon: CustomIconWidget(
            iconName: 'more_vert',
            color: colorScheme.onSurface,
            size: 24,
          ),
        ),
      ],
    );
  }

  Widget _buildBody() {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return RefreshIndicator(
      onRefresh: _refreshData,
      color: colorScheme.primary,
      child: SingleChildScrollView(
        physics: const AlwaysScrollableScrollPhysics(),
        padding: EdgeInsets.all(4.w),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Baby Profile Header
            BabyProfileHeaderWidget(babyProfile: _babyProfile),
            SizedBox(height: 4.h),

            // Measurement Summary Cards
            MeasurementSummaryWidget(measurements: _measurements),
            SizedBox(height: 4.h),

            // Growth Chart
            GrowthChartWidget(
              chartType: _selectedChartType,
              measurements: _measurements,
              onChartTypeChanged: _onChartTypeChanged,
            ),
            SizedBox(height: 4.h),

            // Growth Insights
            _buildGrowthInsights(),
            SizedBox(height: 4.h),

            // Recent Measurements
            _buildRecentMeasurements(),
            SizedBox(height: 10.h), // Extra space for FAB
          ],
        ),
      ),
    );
  }

  Widget _buildGrowthInsights() {
    final theme = Theme.of(context);
    final isLight = AppTheme.isLightTheme(context);
    final successColor = AppTheme.getContextSuccessColor(context);

    return Container(
      width: double.infinity,
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            successColor.withValues(alpha: 0.1),
            successColor.withValues(alpha: 0.05),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: successColor.withValues(alpha: 0.2),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              CustomIconWidget(
                iconName: 'insights',
                color: successColor,
                size: 24,
              ),
              SizedBox(width: 2.w),
              Text(
                'Growth Insights',
                style: theme.textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w600,
                  color: successColor,
                ),
              ),
            ],
          ),
          SizedBox(height: 2.h),
          _buildInsightItem(
            'Healthy Growth Pattern',
            'Emma is growing steadily within normal percentiles',
            'trending_up',
          ),
          SizedBox(height: 1.h),
          _buildInsightItem(
            'Weight Gain Velocity',
            'Average 0.8 lbs per month - excellent progress',
            'speed',
          ),
          SizedBox(height: 1.h),
          _buildInsightItem(
            'Next Pediatric Visit',
            'Consider scheduling checkup in 2 weeks',
            'event',
          ),
        ],
      ),
    );
  }

  Widget _buildInsightItem(String title, String description, String iconName) {
    final theme = Theme.of(context);
    final successColor = AppTheme.getContextSuccessColor(context);

    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        CustomIconWidget(
          iconName: iconName,
          color: successColor,
          size: 16,
        ),
        SizedBox(width: 2.w),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: theme.textTheme.bodyMedium?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
              Text(
                description,
                style: theme.textTheme.bodySmall?.copyWith(
                  color: theme.colorScheme.onSurfaceVariant,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildRecentMeasurements() {
    final recentMeasurements = _measurements
        .where((m) => DateTime.parse(m['date']).isAfter(
              DateTime.now().subtract(const Duration(days: 60)),
            ))
        .toList()
      ..sort((a, b) =>
          DateTime.parse(b['date']).compareTo(DateTime.parse(a['date'])));

    return Container(
      width: double.infinity,
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: AppTheme.lightTheme.colorScheme.shadow,
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Recent Measurements',
                style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
              TextButton(
                onPressed: () =>
                    Navigator.pushNamed(context, '/historical-records'),
                child: Text(
                  'View All',
                  style: AppTheme.lightTheme.textTheme.labelLarge?.copyWith(
                    color: AppTheme.lightTheme.colorScheme.primary,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ],
          ),
          SizedBox(height: 2.h),
          if (recentMeasurements.isEmpty)
            _buildEmptyMeasurements()
          else
            ...recentMeasurements
                .take(5)
                .map((measurement) => _buildMeasurementItem(measurement)),
        ],
      ),
    );
  }

  Widget _buildEmptyMeasurements() {
    return Center(
      child: Padding(
        padding: EdgeInsets.symmetric(vertical: 4.h),
        child: Column(
          children: [
            CustomIconWidget(
              iconName: 'add_chart',
              color: AppTheme.lightTheme.colorScheme.outline,
              size: 48,
            ),
            SizedBox(height: 2.h),
            Text(
              'No measurements yet',
              style: AppTheme.lightTheme.textTheme.bodyLarge?.copyWith(
                color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
              ),
            ),
            SizedBox(height: 1.h),
            Text(
              'Tap the + button to add your first measurement',
              style: AppTheme.lightTheme.textTheme.bodySmall,
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildMeasurementItem(Map<String, dynamic> measurement) {
    final date = DateTime.parse(measurement['date']);
    final typeIcon = _getTypeIcon(measurement['type']);
    final typeLabel = _getTypeLabel(measurement['type']);

    return Container(
      margin: EdgeInsets.only(bottom: 2.h),
      padding: EdgeInsets.all(3.w),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.primaryContainer
            .withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: AppTheme.lightTheme.colorScheme.outline.withValues(alpha: 0.2),
        ),
      ),
      child: Row(
        children: [
          Container(
            padding: EdgeInsets.all(2.w),
            decoration: BoxDecoration(
              color: AppTheme.lightTheme.colorScheme.primary
                  .withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(8),
            ),
            child: CustomIconWidget(
              iconName: typeIcon,
              color: AppTheme.lightTheme.colorScheme.primary,
              size: 20,
            ),
          ),
          SizedBox(width: 3.w),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  typeLabel,
                  style: AppTheme.lightTheme.textTheme.labelLarge?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),
                Text(
                  '${measurement['value']} ${measurement['unit']}',
                  style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
          ),
          Text(
            '${date.month}/${date.day}',
            style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFloatingActionButton() {
    return FloatingActionButton.extended(
      onPressed: _showAddMeasurementBottomSheet,
      backgroundColor: AppTheme.lightTheme.colorScheme.primary,
      foregroundColor: Colors.white,
      icon: CustomIconWidget(
        iconName: 'add',
        color: Colors.white,
        size: 24,
      ),
      label: Text(
        'Add Measurement',
        style: AppTheme.lightTheme.textTheme.labelLarge?.copyWith(
          color: Colors.white,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }

  String _getTypeIcon(String type) {
    switch (type) {
      case 'weight':
        return 'monitor_weight';
      case 'height':
        return 'height';
      case 'head':
        return 'face';
      default:
        return 'straighten';
    }
  }

  String _getTypeLabel(String type) {
    switch (type) {
      case 'weight':
        return 'Weight';
      case 'height':
        return 'Height';
      case 'head':
        return 'Head Circumference';
      default:
        return 'Measurement';
    }
  }

  void _onChartTypeChanged(String chartType) {
    setState(() {
      _selectedChartType = chartType;
    });
  }

  void _showAddMeasurementBottomSheet() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => Padding(
        padding: EdgeInsets.only(
          bottom: MediaQuery.of(context).viewInsets.bottom,
        ),
        child: AddMeasurementWidget(
          onMeasurementAdded: _onMeasurementAdded,
        ),
      ),
    );
  }

  void _onMeasurementAdded(Map<String, dynamic> measurement) {
    setState(() {
      _measurements.add(measurement);
    });
  }

  void _showMoreOptions() {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => Container(
        padding: EdgeInsets.all(4.w),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 12.w,
              height: 0.5.h,
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.colorScheme.outline,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            SizedBox(height: 3.h),
            Text(
              'Growth Tracking Options',
              style: AppTheme.lightTheme.textTheme.titleLarge,
            ),
            SizedBox(height: 3.h),
            _buildOptionItem(
                'Export Data', 'file_download', () => _exportData()),
            _buildOptionItem('Share Progress', 'share', () => _shareProgress()),
            _buildOptionItem('Settings', 'settings', () => _openSettings()),
            SizedBox(height: 2.h),
          ],
        ),
      ),
    );
  }

  Widget _buildOptionItem(String title, String icon, VoidCallback onTap) {
    return ListTile(
      leading: CustomIconWidget(
        iconName: icon,
        color: AppTheme.lightTheme.colorScheme.primary,
        size: 24,
      ),
      title: Text(
        title,
        style: AppTheme.lightTheme.textTheme.bodyLarge,
      ),
      onTap: () {
        Navigator.pop(context);
        onTap();
      },
    );
  }

  Future<void> _refreshData() async {
    // Simulate data refresh
    await Future.delayed(const Duration(seconds: 1));
    setState(() {
      // Data would be refreshed from API/database
    });
  }

  void _exportData() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Export feature coming soon')),
    );
  }

  void _shareProgress() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Progress shared successfully')),
    );
  }

  void _openSettings() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Settings feature coming soon')),
    );
  }
}
