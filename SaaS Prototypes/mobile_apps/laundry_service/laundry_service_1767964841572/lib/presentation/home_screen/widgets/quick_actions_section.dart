import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../theme/app_theme.dart';
import './quick_action_card.dart';

class QuickActionsSection extends StatelessWidget {
  final VoidCallback onWashFoldTap;
  final VoidCallback onDryCleanTap;
  final VoidCallback onTrackOrderTap;

  const QuickActionsSection({
    Key? key,
    required this.onWashFoldTap,
    required this.onDryCleanTap,
    required this.onTrackOrderTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: EdgeInsets.symmetric(horizontal: 4.w),
          child: Text(
            'Our Services',
            style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
        SizedBox(height: 2.h),
        Padding(
          padding: EdgeInsets.symmetric(horizontal: 4.w),
          child: Row(
            children: [
              Expanded(
                child: QuickActionCard(
                  title: 'Wash & Fold',
                  iconName: 'local_laundry_service',
                  backgroundColor: Color(0xFF6366F1), // Indigo/Blue
                  lightBackgroundColor:
                      Color(0xFFEEF2FF), // Light blue background
                  onTap: onWashFoldTap,
                ),
              ),
              SizedBox(width: 3.w),
              Expanded(
                child: QuickActionCard(
                  title: 'Dry Clean',
                  iconName: 'dry_cleaning',
                  backgroundColor: Color(0xFFF97316), // Orange
                  lightBackgroundColor:
                      Color(0xFFFFF7ED), // Light orange background
                  onTap: onDryCleanTap,
                ),
              ),
              SizedBox(width: 3.w),
              Expanded(
                child: QuickActionCard(
                  title: 'Track Order',
                  iconName: 'track_changes',
                  backgroundColor: Color(0xFF059669), // Green
                  lightBackgroundColor:
                      Color(0xFFECFDF5), // Light green background
                  onTap: onTrackOrderTap,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
