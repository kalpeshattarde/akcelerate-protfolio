import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../../core/app_export.dart';

/// Trust badges widget displaying HIPAA compliance and veterinary certifications
class TrustBadgesWidget extends StatefulWidget {
  const TrustBadgesWidget({super.key});

  @override
  State<TrustBadgesWidget> createState() => _TrustBadgesWidgetState();
}

class _TrustBadgesWidgetState extends State<TrustBadgesWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _badgeController;
  late Animation<double> _badgeOpacity;
  late Animation<Offset> _badgeSlide;

  @override
  void initState() {
    super.initState();
    _initializeBadgeAnimation();
  }

  void _initializeBadgeAnimation() {
    _badgeController = AnimationController(
      duration: const Duration(milliseconds: 1200),
      vsync: this,
    );

    _badgeOpacity = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _badgeController,
      curve: const Interval(0.6, 1.0, curve: Curves.easeIn),
    ));

    _badgeSlide = Tween<Offset>(
      begin: const Offset(0.0, 0.5),
      end: Offset.zero,
    ).animate(CurvedAnimation(
      parent: _badgeController,
      curve: const Interval(0.4, 0.9, curve: Curves.easeOut),
    ));

    // Start badge animation after logo animation
    Future.delayed(const Duration(milliseconds: 1800), () {
      if (mounted) {
        _badgeController.forward();
      }
    });
  }

  @override
  void dispose() {
    _badgeController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _badgeController,
      builder: (context, child) {
        return SlideTransition(
          position: _badgeSlide,
          child: FadeTransition(
            opacity: _badgeOpacity,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // HIPAA Compliance Badge
                _buildTrustBadge(
                  icon: 'security',
                  label: 'HIPAA\nCompliant',
                  color: AppTheme.lightTheme.colorScheme.primary,
                ),

                SizedBox(width: 8.w),

                // Veterinary Association Badge
                _buildTrustBadge(
                  icon: 'verified',
                  label: 'Vet\nCertified',
                  color: AppTheme.lightTheme.colorScheme.secondary,
                ),

                SizedBox(width: 8.w),

                // Security Rating Badge
                _buildTrustBadge(
                  icon: 'star',
                  label: '5-Star\nSecurity',
                  color: AppTheme.lightTheme.colorScheme.tertiary,
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildTrustBadge({
    required String icon,
    required String label,
    required Color color,
  }) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.5.h),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: color.withValues(alpha: 0.3),
          width: 1,
        ),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          CustomIconWidget(
            iconName: icon,
            size: 4.w,
            color: color,
          ),
          SizedBox(height: 0.5.h),
          Text(
            label,
            style: AppTheme.lightTheme.textTheme.labelSmall?.copyWith(
              color: color,
              fontSize: 2.5.w,
              fontWeight: FontWeight.w500,
              height: 1.2,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}
