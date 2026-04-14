import 'package:flutter/material.dart';
import 'package:percent_indicator/percent_indicator.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../widgets/custom_icon_widget.dart';

/// Nutrition tab content showing food group intake with circular progress indicators
class NutritionTabContent extends StatelessWidget {
  const NutritionTabContent({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    // Mock nutrition data with pregnancy-specific recommendations
    final List<Map<String, dynamic>> nutritionData = [
      {
        "category": "Protein",
        "current": 65,
        "target": 75,
        "unit": "g",
        "color": const Color(0xFFE8B4B8),
        "icon": "restaurant",
        "tip": "Great for baby's growth and development"
      },
      {
        "category": "Calcium",
        "current": 850,
        "target": 1000,
        "unit": "mg",
        "color": const Color(0xFFA8C4A2),
        "icon": "local_drink",
        "tip": "Essential for baby's bone development"
      },
      {
        "category": "Iron",
        "current": 22,
        "target": 27,
        "unit": "mg",
        "color": const Color(0xFFE8C4A0),
        "icon": "favorite",
        "tip": "Prevents anemia during pregnancy"
      },
      {
        "category": "Folate",
        "current": 520,
        "target": 600,
        "unit": "mcg",
        "color": const Color(0xFFD4A5A5),
        "icon": "eco",
        "tip": "Crucial for neural tube development"
      },
    ];

    return SingleChildScrollView(
      padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header section
          Text(
            "Today's Nutrition",
            style: theme.textTheme.headlineSmall?.copyWith(
              fontWeight: FontWeight.w600,
              color: theme.colorScheme.onSurface,
            ),
          ),
          SizedBox(height: 1.h),
          Text(
            "Track your daily intake to support a healthy pregnancy",
            style: theme.textTheme.bodyMedium?.copyWith(
              color: theme.colorScheme.onSurfaceVariant,
            ),
          ),
          SizedBox(height: 3.h),

          // Nutrition grid
          GridView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              crossAxisSpacing: 3.w,
              mainAxisSpacing: 2.h,
              childAspectRatio: 0.85,
            ),
            itemCount: nutritionData.length,
            itemBuilder: (context, index) {
              final item = nutritionData[index];
              final progress =
                  (item["current"] as int) / (item["target"] as int);

              return Container(
                padding: EdgeInsets.all(4.w),
                decoration: BoxDecoration(
                  color: theme.colorScheme.surface,
                  borderRadius: BorderRadius.circular(12.0),
                  boxShadow: [
                    BoxShadow(
                      color: theme.colorScheme.shadow.withValues(alpha: 0.08),
                      blurRadius: 8.0,
                      offset: const Offset(0, 2),
                    ),
                  ],
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    // Circular progress indicator
                    CircularPercentIndicator(
                      radius: 12.w,
                      lineWidth: 8.0,
                      percent: progress > 1.0 ? 1.0 : progress,
                      center: CustomIconWidget(
                        iconName: item["icon"] as String,
                        color: item["color"] as Color,
                        size: 24,
                      ),
                      progressColor: item["color"] as Color,
                      backgroundColor:
                          (item["color"] as Color).withValues(alpha: 0.2),
                      circularStrokeCap: CircularStrokeCap.round,
                      animation: true,
                      animationDuration: 1200,
                    ),
                    SizedBox(height: 2.h),

                    // Category name
                    Text(
                      item["category"] as String,
                      style: theme.textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w600,
                        color: theme.colorScheme.onSurface,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    SizedBox(height: 0.5.h),

                    // Current vs target
                    Text(
                      "${item["current"]}/${item["target"]} ${item["unit"]}",
                      style: theme.textTheme.bodySmall?.copyWith(
                        color: theme.colorScheme.onSurfaceVariant,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    SizedBox(height: 1.h),

                    // Tip
                    Container(
                      padding: EdgeInsets.symmetric(
                          horizontal: 2.w, vertical: 0.5.h),
                      decoration: BoxDecoration(
                        color: (item["color"] as Color).withValues(alpha: 0.1),
                        borderRadius: BorderRadius.circular(8.0),
                      ),
                      child: Text(
                        item["tip"] as String,
                        style: theme.textTheme.labelSmall?.copyWith(
                          color: theme.colorScheme.onSurface,
                        ),
                        textAlign: TextAlign.center,
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                  ],
                ),
              );
            },
          ),
          SizedBox(height: 3.h),

          // Quick log section
          Container(
            padding: EdgeInsets.all(4.w),
            decoration: BoxDecoration(
              color: theme.colorScheme.primary.withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(12.0),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    CustomIconWidget(
                      iconName: 'add_circle',
                      color: theme.colorScheme.primary,
                      size: 24,
                    ),
                    SizedBox(width: 2.w),
                    Text(
                      "Quick Log",
                      style: theme.textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w600,
                        color: theme.colorScheme.onSurface,
                      ),
                    ),
                  ],
                ),
                SizedBox(height: 2.h),
                Wrap(
                  spacing: 2.w,
                  runSpacing: 1.h,
                  children: [
                    _buildQuickLogButton(
                        context, "Breakfast", Icons.breakfast_dining),
                    _buildQuickLogButton(context, "Lunch", Icons.lunch_dining),
                    _buildQuickLogButton(
                        context, "Dinner", Icons.dinner_dining),
                    _buildQuickLogButton(context, "Snack", Icons.cookie),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildQuickLogButton(
      BuildContext context, String label, IconData icon) {
    final theme = Theme.of(context);
    return ElevatedButton.icon(
      onPressed: () {
        // Quick log functionality
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text("$label logged successfully"),
            duration: const Duration(seconds: 2),
          ),
        );
      },
      icon: Icon(icon, size: 18),
      label: Text(label),
      style: ElevatedButton.styleFrom(
        backgroundColor: theme.colorScheme.surface,
        foregroundColor: theme.colorScheme.onSurface,
        elevation: 0,
        padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8.0),
        ),
      ),
    );
  }
}
