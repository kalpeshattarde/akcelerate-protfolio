import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class MetricsCardsWidget extends StatelessWidget {
  final List<Map<String, dynamic>> metricsData;

  const MetricsCardsWidget({
    Key? key,
    required this.metricsData,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // For mobile, use grid layout to avoid horizontal scrolling
    if (100.w < 768) {
      return _buildMobileLayout();
    } else {
      return _buildDesktopLayout();
    }
  }

  Widget _buildMobileLayout() {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 2.w),
      child: GridView.builder(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          childAspectRatio: 1.1,
          crossAxisSpacing: 3.w,
          mainAxisSpacing: 2.h,
        ),
        itemCount: metricsData.length,
        itemBuilder: (context, index) {
          return _buildMetricCard(metricsData[index], isMobile: true);
        },
      ),
    );
  }

  Widget _buildDesktopLayout() {
    return SizedBox(
      height: 18.h,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        padding: EdgeInsets.symmetric(horizontal: 2.w),
        itemCount: metricsData.length,
        itemBuilder: (context, index) {
          return Container(
            width: 38.w,
            margin: EdgeInsets.symmetric(horizontal: 1.5.w),
            child: _buildMetricCard(metricsData[index], isMobile: false),
          );
        },
      ),
    );
  }

  Widget _buildMetricCard(Map<String, dynamic> metric,
      {required bool isMobile}) {
    return Container(
      padding: EdgeInsets.all(isMobile ? 3.w : 4.w),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            AppTheme.lightTheme.colorScheme.surface,
            AppTheme.lightTheme.colorScheme.surface.withValues(alpha: 0.8),
          ],
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: AppTheme.lightTheme.colorScheme.outline.withValues(alpha: 0.2),
          width: 1,
        ),
        boxShadow: [
          BoxShadow(
            color:
                AppTheme.lightTheme.colorScheme.shadow.withValues(alpha: 0.08),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          CustomIconWidget(
            iconName: metric['icon'] as String,
            color: AppTheme.lightTheme.colorScheme.secondary,
            size: isMobile ? 6.w : 8.w,
          ),
          SizedBox(height: isMobile ? 1.h : 1.5.h),
          Flexible(
            child: Text(
              metric['value'].toString(),
              style: AppTheme.lightTheme.textTheme.headlineSmall?.copyWith(
                color: AppTheme.lightTheme.colorScheme.secondary,
                fontWeight: FontWeight.w700,
                fontSize: isMobile ? 16.sp : 18.sp,
              ),
              overflow: TextOverflow.ellipsis,
            ),
          ),
          SizedBox(height: isMobile ? 0.5.h : 1.h),
          Flexible(
            child: Text(
              metric['label'] as String,
              textAlign: TextAlign.center,
              style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                fontSize: isMobile ? 9.sp : 10.sp,
                height: 1.2,
                color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
              ),
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
            ),
          ),
        ],
      ),
    );
  }
}
