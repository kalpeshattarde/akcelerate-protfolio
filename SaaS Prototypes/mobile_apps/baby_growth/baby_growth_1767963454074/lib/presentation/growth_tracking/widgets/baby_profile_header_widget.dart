import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class BabyProfileHeaderWidget extends StatelessWidget {
  final Map<String, dynamic> babyProfile;

  const BabyProfileHeaderWidget({
    Key? key,
    required this.babyProfile,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppTheme.lightTheme.colorScheme.primary,
            AppTheme.lightTheme.colorScheme.secondary,
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        children: [
          Row(
            children: [
              _buildBabyPhoto(),
              SizedBox(width: 4.w),
              Expanded(
                child: _buildBabyInfo(),
              ),
            ],
          ),
          SizedBox(height: 3.h),
          _buildAgeProgress(),
        ],
      ),
    );
  }

  Widget _buildBabyPhoto() {
    return Container(
      width: 20.w,
      height: 20.w,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        border: Border.all(
          color: Colors.white,
          width: 3,
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.2),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: ClipOval(
        child: babyProfile['photo'] != null
            ? CustomImageWidget(
                imageUrl: babyProfile['photo'],
                width: 20.w,
                height: 20.w,
                fit: BoxFit.cover,
              )
            : Container(
                color: Colors.white,
                child: CustomIconWidget(
                  iconName: 'child_care',
                  color: AppTheme.lightTheme.colorScheme.primary,
                  size: 10.w,
                ),
              ),
      ),
    );
  }

  Widget _buildBabyInfo() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          babyProfile['name'] ?? 'Baby',
          style: AppTheme.lightTheme.textTheme.headlineSmall?.copyWith(
            color: Colors.white,
            fontWeight: FontWeight.w700,
          ),
        ),
        SizedBox(height: 1.h),
        Row(
          children: [
            CustomIconWidget(
              iconName: 'cake',
              color: Colors.white.withValues(alpha: 0.9),
              size: 16,
            ),
            SizedBox(width: 1.w),
            Text(
              _formatBirthDate(babyProfile['birthDate']),
              style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                color: Colors.white.withValues(alpha: 0.9),
              ),
            ),
          ],
        ),
        SizedBox(height: 0.5.h),
        Row(
          children: [
            CustomIconWidget(
              iconName: 'schedule',
              color: Colors.white.withValues(alpha: 0.9),
              size: 16,
            ),
            SizedBox(width: 1.w),
            Text(
              _calculateAge(babyProfile['birthDate']),
              style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                color: Colors.white.withValues(alpha: 0.9),
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildAgeProgress() {
    final ageInDays = _calculateAgeInDays(babyProfile['birthDate']);
    final progressValue =
        (ageInDays / 730).clamp(0.0, 1.0); // 2 years = 730 days

    return Container(
      padding: EdgeInsets.all(3.w),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.2),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Growth Journey',
                style: AppTheme.lightTheme.textTheme.labelLarge?.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.w600,
                ),
              ),
              Text(
                '${(progressValue * 100).toInt()}%',
                style: AppTheme.lightTheme.textTheme.labelLarge?.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ],
          ),
          SizedBox(height: 1.h),
          ClipRRect(
            borderRadius: BorderRadius.circular(10),
            child: LinearProgressIndicator(
              value: progressValue,
              backgroundColor: Colors.white.withValues(alpha: 0.3),
              valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
              minHeight: 8,
            ),
          ),
          SizedBox(height: 1.h),
          Text(
            _getGrowthMessage(ageInDays),
            style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
              color: Colors.white.withValues(alpha: 0.9),
            ),
          ),
        ],
      ),
    );
  }

  String _formatBirthDate(String? birthDate) {
    if (birthDate == null) return 'Not set';

    try {
      final date = DateTime.parse(birthDate);
      return '${date.month}/${date.day}/${date.year}';
    } catch (e) {
      return 'Invalid date';
    }
  }

  String _calculateAge(String? birthDate) {
    if (birthDate == null) return 'Age unknown';

    try {
      final birth = DateTime.parse(birthDate);
      final now = DateTime.now();
      final difference = now.difference(birth);

      final days = difference.inDays;
      final weeks = (days / 7).floor();
      final months = (days / 30.44).floor(); // Average days per month
      final years = (days / 365.25).floor(); // Account for leap years

      if (years >= 2) {
        return '$years years old';
      } else if (years >= 1) {
        final remainingMonths = months - (years * 12);
        return remainingMonths > 0
            ? '$years year, $remainingMonths months'
            : '$years year old';
      } else if (months >= 1) {
        final remainingWeeks = weeks - (months * 4);
        return remainingWeeks > 0
            ? '$months months, $remainingWeeks weeks'
            : '$months months old';
      } else if (weeks >= 1) {
        final remainingDays = days - (weeks * 7);
        return remainingDays > 0
            ? '$weeks weeks, $remainingDays days'
            : '$weeks weeks old';
      } else {
        return '$days days old';
      }
    } catch (e) {
      return 'Age unknown';
    }
  }

  int _calculateAgeInDays(String? birthDate) {
    if (birthDate == null) return 0;

    try {
      final birth = DateTime.parse(birthDate);
      final now = DateTime.now();
      return now.difference(birth).inDays;
    } catch (e) {
      return 0;
    }
  }

  String _getGrowthMessage(int ageInDays) {
    if (ageInDays < 30) {
      return 'Welcome to your baby\'s growth journey!';
    } else if (ageInDays < 90) {
      return 'Rapid growth phase - track those changes!';
    } else if (ageInDays < 180) {
      return 'Steady development - you\'re doing great!';
    } else if (ageInDays < 365) {
      return 'Amazing progress in the first year!';
    } else if (ageInDays < 730) {
      return 'Toddler growth - exciting milestones ahead!';
    } else {
      return 'Two years of beautiful growth documented!';
    }
  }
}
