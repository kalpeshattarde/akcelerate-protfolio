import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../widgets/custom_icon_widget.dart';
import './widgets/chart_card_widget.dart';
import './widgets/date_range_selector_widget.dart';
import './widgets/exercise_activity_chart_widget.dart';
import './widgets/pet_selector_widget.dart';
import './widgets/symptom_patterns_chart_widget.dart';
import './widgets/trend_alert_widget.dart';
import './widgets/weight_tracking_chart_widget.dart';

class HealthAnalytics extends StatefulWidget {
  const HealthAnalytics({super.key});

  @override
  State<HealthAnalytics> createState() => _HealthAnalyticsState();
}

class _HealthAnalyticsState extends State<HealthAnalytics> {
  String selectedDateRange = '1 Month';
  String selectedPetId = '1';
  bool isLoading = false;
  bool isRefreshing = false;

  // Mock data for pets
  final List<Map<String, dynamic>> pets = [
    {
      "id": "1",
      "name": "Max",
      "breed": "Golden Retriever",
      "age": 3,
      "avatar":
          "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      "id": "2",
      "name": "Luna",
      "breed": "Border Collie",
      "age": 2,
      "avatar":
          "https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      "id": "3",
      "name": "Charlie",
      "breed": "Labrador Mix",
      "age": 5,
      "avatar":
          "https://images.pexels.com/photos/2023384/pexels-photo-2023384.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ];

  // Mock weight data
  final List<Map<String, dynamic>> weightData = [
    {"petId": "1", "weight": 65.0, "date": "01/15/2025"},
    {"petId": "1", "weight": 66.2, "date": "01/22/2025"},
    {"petId": "1", "weight": 64.8, "date": "01/29/2025"},
    {"petId": "1", "weight": 65.5, "date": "02/05/2025"},
    {"petId": "1", "weight": 67.1, "date": "02/12/2025"},
    {"petId": "1", "weight": 66.8, "date": "02/19/2025"},
    {"petId": "1", "weight": 65.9, "date": "02/26/2025"},
    {"petId": "2", "weight": 45.0, "date": "01/15/2025"},
    {"petId": "2", "weight": 45.8, "date": "01/22/2025"},
    {"petId": "2", "weight": 46.2, "date": "01/29/2025"},
    {"petId": "2", "weight": 46.5, "date": "02/05/2025"},
    {"petId": "2", "weight": 47.1, "date": "02/12/2025"},
    {"petId": "3", "weight": 72.0, "date": "01/15/2025"},
    {"petId": "3", "weight": 71.5, "date": "01/22/2025"},
    {"petId": "3", "weight": 70.8, "date": "01/29/2025"},
    {"petId": "3", "weight": 70.2, "date": "02/05/2025"},
  ];

  // Mock exercise data
  final List<Map<String, dynamic>> exerciseData = [
    {"petId": "1", "walks": 45, "playtime": 30, "date": "02/20/2025"},
    {"petId": "1", "walks": 60, "playtime": 25, "date": "02/21/2025"},
    {"petId": "1", "walks": 30, "playtime": 40, "date": "02/22/2025"},
    {"petId": "1", "walks": 50, "playtime": 35, "date": "02/23/2025"},
    {"petId": "1", "walks": 40, "playtime": 20, "date": "02/24/2025"},
    {"petId": "1", "walks": 55, "playtime": 45, "date": "02/25/2025"},
    {"petId": "1", "walks": 35, "playtime": 30, "date": "02/26/2025"},
    {"petId": "2", "walks": 30, "playtime": 50, "date": "02/20/2025"},
    {"petId": "2", "walks": 40, "playtime": 45, "date": "02/21/2025"},
    {"petId": "2", "walks": 35, "playtime": 60, "date": "02/22/2025"},
    {"petId": "2", "walks": 45, "playtime": 40, "date": "02/23/2025"},
    {"petId": "3", "walks": 25, "playtime": 15, "date": "02/20/2025"},
    {"petId": "3", "walks": 30, "playtime": 20, "date": "02/21/2025"},
    {"petId": "3", "walks": 20, "playtime": 10, "date": "02/22/2025"},
  ];

  // Mock symptom data
  final List<Map<String, dynamic>> symptomData = [
    {"petId": "1", "symptom": "Scratching", "date": "02/15/2025"},
    {"petId": "1", "symptom": "Scratching", "date": "02/18/2025"},
    {"petId": "1", "symptom": "Lethargy", "date": "02/20/2025"},
    {"petId": "1", "symptom": "Scratching", "date": "02/22/2025"},
    {"petId": "1", "symptom": "Coughing", "date": "02/24/2025"},
    {"petId": "1", "symptom": "Lethargy", "date": "02/25/2025"},
    {"petId": "2", "symptom": "Excessive Barking", "date": "02/16/2025"},
    {"petId": "2", "symptom": "Restlessness", "date": "02/19/2025"},
    {"petId": "2", "symptom": "Excessive Barking", "date": "02/21/2025"},
    {"petId": "3", "symptom": "Joint Stiffness", "date": "02/17/2025"},
    {"petId": "3", "symptom": "Decreased Appetite", "date": "02/20/2025"},
    {"petId": "3", "symptom": "Joint Stiffness", "date": "02/23/2025"},
  ];

  // Mock trend alerts
  final List<Map<String, dynamic>> trendAlerts = [
    {
      "type": "weight_gain",
      "severity": "medium",
      "title": "Weight Increase Detected",
      "message":
          "Max has gained 2.3 lbs over the past month. Consider adjusting diet or increasing exercise.",
      "timestamp": "2 hours ago",
    },
    {
      "type": "activity_decrease",
      "severity": "low",
      "title": "Reduced Activity",
      "message":
          "Charlie's exercise time has decreased by 15% this week compared to last week.",
      "timestamp": "1 day ago",
    },
  ];

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: theme.brightness == Brightness.light
          ? const Color(0xFFFAFBFC)
          : const Color(0xFF0F1419),
      appBar: AppBar(
        title: Text(
          'Health Analytics',
          style: theme.textTheme.titleLarge?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
        backgroundColor: theme.colorScheme.surface,
        elevation: 0,
        scrolledUnderElevation: 1,
        leading: IconButton(
          icon: CustomIconWidget(
            iconName: 'arrow_back_ios',
            size: 20,
            color: theme.brightness == Brightness.light
                ? const Color(0xFF1B1F23)
                : const Color(0xFFE8EAED),
          ),
          onPressed: () => Navigator.pop(context),
        ),
        actions: [
          IconButton(
            icon: CustomIconWidget(
              iconName: 'share',
              size: 24,
              color: theme.brightness == Brightness.light
                  ? const Color(0xFF1B1F23)
                  : const Color(0xFFE8EAED),
            ),
            onPressed: _shareHealthReport,
            tooltip: 'Share Health Report',
          ),
          IconButton(
            icon: CustomIconWidget(
              iconName: 'download',
              size: 24,
              color: theme.brightness == Brightness.light
                  ? const Color(0xFF1B1F23)
                  : const Color(0xFFE8EAED),
            ),
            onPressed: _exportToPDF,
            tooltip: 'Export to PDF',
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: _refreshData,
        color: theme.brightness == Brightness.light
            ? const Color(0xFF2B5F75)
            : const Color(0xFF4A8BA3),
        child: SingleChildScrollView(
          physics: const AlwaysScrollableScrollPhysics(),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(height: 1.h),

              // Pet Selector
              PetSelectorWidget(
                pets: pets,
                selectedPetId: selectedPetId,
                onPetChanged: _onPetChanged,
              ),

              // Date Range Selector
              DateRangeSelectorWidget(
                selectedRange: selectedDateRange,
                onRangeChanged: _onDateRangeChanged,
              ),

              // Trend Alerts
              TrendAlertWidget(alerts: trendAlerts),

              SizedBox(height: 1.h),

              // Weight Tracking Chart
              ChartCardWidget(
                title: 'Weight Tracking',
                subtitle: 'Monitor weight changes over time',
                isLoading: isLoading,
                chart: WeightTrackingChartWidget(
                  weightData: weightData,
                  selectedPetId: selectedPetId,
                ),
                onTap: () => _showDetailedChart('weight'),
                actions: [
                  IconButton(
                    icon: CustomIconWidget(
                      iconName: 'add',
                      size: 20,
                      color: theme.brightness == Brightness.light
                          ? const Color(0xFF2B5F75)
                          : const Color(0xFF4A8BA3),
                    ),
                    onPressed: () => _addWeightEntry(),
                    tooltip: 'Add Weight Entry',
                  ),
                ],
              ),

              // Exercise Activity Chart
              ChartCardWidget(
                title: 'Exercise Activity',
                subtitle: 'Daily walks and playtime tracking',
                isLoading: isLoading,
                chart: ExerciseActivityChartWidget(
                  exerciseData: exerciseData,
                  selectedPetId: selectedPetId,
                ),
                onTap: () => _showDetailedChart('exercise'),
                actions: [
                  IconButton(
                    icon: CustomIconWidget(
                      iconName: 'add',
                      size: 20,
                      color: theme.brightness == Brightness.light
                          ? const Color(0xFF2B5F75)
                          : const Color(0xFF4A8BA3),
                    ),
                    onPressed: () => _addExerciseEntry(),
                    tooltip: 'Log Exercise',
                  ),
                ],
              ),

              // Symptom Patterns Chart
              ChartCardWidget(
                title: 'Symptom Patterns',
                subtitle: 'Frequency analysis of health symptoms',
                isLoading: isLoading,
                chart: SymptomPatternsChartWidget(
                  symptomData: symptomData,
                  selectedPetId: selectedPetId,
                ),
                onTap: () => _showDetailedChart('symptoms'),
                actions: [
                  IconButton(
                    icon: CustomIconWidget(
                      iconName: 'add',
                      size: 20,
                      color: theme.brightness == Brightness.light
                          ? const Color(0xFF2B5F75)
                          : const Color(0xFF4A8BA3),
                    ),
                    onPressed: () => _addSymptomEntry(),
                    tooltip: 'Log Symptom',
                  ),
                ],
              ),

              SizedBox(height: 4.h),
            ],
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _showQuickActions,
        backgroundColor: theme.brightness == Brightness.light
            ? const Color(0xFFE8A547)
            : const Color(0xFFEDB865),
        foregroundColor: Colors.black,
        icon: CustomIconWidget(
          iconName: 'add',
          size: 24,
          color: Colors.black,
        ),
        label: Text(
          'Quick Log',
          style: theme.textTheme.labelLarge?.copyWith(
            color: Colors.black,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
    );
  }

  void _onPetChanged(String petId) {
    setState(() {
      selectedPetId = petId;
    });
    HapticFeedback.lightImpact();
  }

  void _onDateRangeChanged(String range) {
    setState(() {
      selectedDateRange = range;
      isLoading = true;
    });

    HapticFeedback.lightImpact();

    // Simulate data loading
    Future.delayed(const Duration(milliseconds: 800), () {
      if (mounted) {
        setState(() {
          isLoading = false;
        });
      }
    });
  }

  Future<void> _refreshData() async {
    setState(() {
      isRefreshing = true;
    });

    HapticFeedback.mediumImpact();

    // Simulate data refresh
    await Future.delayed(const Duration(seconds: 2));

    if (mounted) {
      setState(() {
        isRefreshing = false;
      });

      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Health analytics updated'),
          duration: Duration(seconds: 2),
        ),
      );
    }
  }

  void _shareHealthReport() {
    HapticFeedback.lightImpact();
    final selectedPet = pets.firstWhere(
      (pet) => (pet)["id"] == selectedPetId,
    );

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Sharing ${selectedPet["name"]}\'s health report...'),
        duration: const Duration(seconds: 2),
      ),
    );
  }

  void _exportToPDF() {
    HapticFeedback.lightImpact();
    final selectedPet = pets.firstWhere(
      (pet) => (pet)["id"] == selectedPetId,
    );

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Generating PDF report for ${selectedPet["name"]}...'),
        duration: const Duration(seconds: 2),
        action: SnackBarAction(
          label: 'View',
          onPressed: () {
            // Handle PDF view
          },
        ),
      ),
    );
  }

  void _showDetailedChart(String chartType) {
    HapticFeedback.lightImpact();
    final selectedPet = pets.firstWhere(
      (pet) => (pet)["id"] == selectedPetId,
    );

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => _DetailedChartSheet(
        chartType: chartType,
        petName: selectedPet["name"] as String,
      ),
    );
  }

  void _addWeightEntry() {
    HapticFeedback.lightImpact();
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Opening weight entry form...'),
        duration: Duration(seconds: 2),
      ),
    );
  }

  void _addExerciseEntry() {
    HapticFeedback.lightImpact();
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Opening exercise log form...'),
        duration: Duration(seconds: 2),
      ),
    );
  }

  void _addSymptomEntry() {
    HapticFeedback.lightImpact();
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Opening symptom log form...'),
        duration: Duration(seconds: 2),
      ),
    );
  }

  void _showQuickActions() {
    HapticFeedback.lightImpact();
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (context) => _QuickActionsSheet(),
    );
  }
}

class _DetailedChartSheet extends StatelessWidget {
  final String chartType;
  final String petName;

  const _DetailedChartSheet({
    required this.chartType,
    required this.petName,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      height: 80.h,
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
      ),
      child: Column(
        children: [
          Container(
            width: 40,
            height: 4,
            margin: const EdgeInsets.symmetric(vertical: 12),
            decoration: BoxDecoration(
              color: theme.brightness == Brightness.light
                  ? const Color(0xFFE1E4E8)
                  : const Color(0xFF30363D),
              borderRadius: BorderRadius.circular(2),
            ),
          ),
          Padding(
            padding: EdgeInsets.all(4.w),
            child: Row(
              children: [
                Expanded(
                  child: Text(
                    'Detailed ${_getChartTitle(chartType)} - $petName',
                    style: theme.textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
                IconButton(
                  icon: CustomIconWidget(
                    iconName: 'close',
                    size: 24,
                    color: theme.brightness == Brightness.light
                        ? const Color(0xFF6A737D)
                        : const Color(0xFFADB5BD),
                  ),
                  onPressed: () => Navigator.pop(context),
                ),
              ],
            ),
          ),
          Expanded(
            child: Center(
              child: Text(
                'Detailed $chartType chart view with zoom and pan capabilities',
                style: theme.textTheme.bodyLarge?.copyWith(
                  color: theme.brightness == Brightness.light
                      ? const Color(0xFF6A737D)
                      : const Color(0xFFADB5BD),
                ),
                textAlign: TextAlign.center,
              ),
            ),
          ),
        ],
      ),
    );
  }

  String _getChartTitle(String type) {
    switch (type) {
      case 'weight':
        return 'Weight Tracking';
      case 'exercise':
        return 'Exercise Activity';
      case 'symptoms':
        return 'Symptom Patterns';
      default:
        return 'Chart';
    }
  }
}

class _QuickActionsSheet extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
      ),
      child: SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 40,
              height: 4,
              margin: const EdgeInsets.symmetric(vertical: 12),
              decoration: BoxDecoration(
                color: theme.brightness == Brightness.light
                    ? const Color(0xFFE1E4E8)
                    : const Color(0xFF30363D),
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
              child: Text(
                'Quick Log Entry',
                style: theme.textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 4.w),
              child: Column(
                children: [
                  _buildQuickActionTile(
                    context,
                    icon: 'monitor_weight',
                    title: 'Log Weight',
                    subtitle: 'Record current weight measurement',
                    onTap: () {
                      Navigator.pop(context);
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                            content: Text('Opening weight entry...')),
                      );
                    },
                  ),
                  _buildQuickActionTile(
                    context,
                    icon: 'directions_run',
                    title: 'Log Exercise',
                    subtitle: 'Record walks and playtime',
                    onTap: () {
                      Navigator.pop(context);
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                            content: Text('Opening exercise log...')),
                      );
                    },
                  ),
                  _buildQuickActionTile(
                    context,
                    icon: 'health_and_safety',
                    title: 'Log Symptom',
                    subtitle: 'Record health symptoms or concerns',
                    onTap: () {
                      Navigator.pop(context);
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Opening symptom log...')),
                      );
                    },
                  ),
                ],
              ),
            ),
            SizedBox(height: 2.h),
          ],
        ),
      ),
    );
  }

  Widget _buildQuickActionTile(
    BuildContext context, {
    required String icon,
    required String title,
    required String subtitle,
    required VoidCallback onTap,
  }) {
    final theme = Theme.of(context);

    return ListTile(
      leading: Container(
        width: 10.w,
        height: 10.w,
        decoration: BoxDecoration(
          color: theme.brightness == Brightness.light
              ? const Color(0xFF2B5F75).withValues(alpha: 0.1)
              : const Color(0xFF4A8BA3).withValues(alpha: 0.2),
          borderRadius: BorderRadius.circular(8),
        ),
        child: CustomIconWidget(
          iconName: icon,
          size: 20,
          color: theme.brightness == Brightness.light
              ? const Color(0xFF2B5F75)
              : const Color(0xFF4A8BA3),
        ),
      ),
      title: Text(
        title,
        style: theme.textTheme.titleMedium?.copyWith(
          fontWeight: FontWeight.w500,
        ),
      ),
      subtitle: Text(
        subtitle,
        style: theme.textTheme.bodySmall?.copyWith(
          color: theme.brightness == Brightness.light
              ? const Color(0xFF6A737D)
              : const Color(0xFFADB5BD),
        ),
      ),
      trailing: CustomIconWidget(
        iconName: 'arrow_forward_ios',
        size: 16,
        color: theme.brightness == Brightness.light
            ? const Color(0xFF6A737D)
            : const Color(0xFFADB5BD),
      ),
      onTap: onTap,
      contentPadding: EdgeInsets.symmetric(horizontal: 2.w, vertical: 1.h),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(8),
      ),
    );
  }
}
