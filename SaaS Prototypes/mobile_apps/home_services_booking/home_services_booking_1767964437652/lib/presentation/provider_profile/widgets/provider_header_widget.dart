import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../widgets/custom_icon_widget.dart';

class ProviderHeaderWidget extends StatelessWidget {
  final Map<String, dynamic> providerData;

  const ProviderHeaderWidget({
    super.key,
    required this.providerData,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Container(
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [
            Colors.grey.shade50,
            Colors.white,
          ],
        ),
      ),
      child: SafeArea(
        child: Column(
          children: [
            // Custom App Bar
            Padding(
              padding: EdgeInsets.all(4.w),
              child: Row(
                children: [
                  IconButton(
                    onPressed: () => Navigator.pop(context),
                    style: IconButton.styleFrom(
                      backgroundColor: Colors.white,
                      elevation: 2,
                      shadowColor: Colors.black.withAlpha(26),
                    ),
                    icon: CustomIconWidget(
                      iconName: 'arrow_back',
                      color: Colors.grey.shade700,
                      size: 6.w,
                    ),
                  ),
                  const Spacer(),
                  IconButton(
                    onPressed: () {
                      // Handle share provider
                    },
                    style: IconButton.styleFrom(
                      backgroundColor: Colors.white,
                      elevation: 2,
                      shadowColor: Colors.black.withAlpha(26),
                    ),
                    icon: CustomIconWidget(
                      iconName: 'share',
                      color: Colors.grey.shade700,
                      size: 6.w,
                    ),
                  ),
                  SizedBox(width: 2.w),
                  IconButton(
                    onPressed: () {
                      // Handle favorite toggle
                    },
                    style: IconButton.styleFrom(
                      backgroundColor: Colors.white,
                      elevation: 2,
                      shadowColor: Colors.black.withAlpha(26),
                    ),
                    icon: CustomIconWidget(
                      iconName: providerData['isFavorite'] == true
                          ? 'favorite'
                          : 'favorite_border',
                      color: providerData['isFavorite'] == true
                          ? Colors.red.shade400
                          : Colors.grey.shade700,
                      size: 6.w,
                    ),
                  ),
                ],
              ),
            ),

            // Provider Info
            Padding(
              padding: EdgeInsets.fromLTRB(4.w, 0, 4.w, 6.h),
              child: Column(
                children: [
                  // Profile Image
                  Container(
                    width: 25.w,
                    height: 25.w,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      border: Border.all(
                        color: Colors.grey.shade300,
                        width: 3,
                      ),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withAlpha(26),
                          blurRadius: 8,
                          offset: const Offset(0, 2),
                        ),
                      ],
                      image: DecorationImage(
                        image: NetworkImage(
                            providerData['profileImage'] as String),
                        fit: BoxFit.cover,
                      ),
                    ),
                  ),
                  SizedBox(height: 3.h),

                  // Provider Name
                  Text(
                    providerData['name'] as String,
                    style: theme.textTheme.headlineSmall?.copyWith(
                      color: Colors.grey.shade800,
                      fontWeight: FontWeight.w700,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  SizedBox(height: 1.h),

                  // Specialization
                  Text(
                    providerData['specialization'] as String,
                    style: theme.textTheme.titleMedium?.copyWith(
                      color: Colors.grey.shade600,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  SizedBox(height: 2.h),

                  // Stats Row
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      _buildStatItem(
                        context,
                        'star',
                        providerData['rating'].toString(),
                        'Rating',
                      ),
                      Container(
                        width: 1,
                        height: 6.h,
                        color: Colors.grey.shade300,
                      ),
                      _buildStatItem(
                        context,
                        'work',
                        '${providerData['yearsExperience']}+',
                        'Years Exp',
                      ),
                      Container(
                        width: 1,
                        height: 6.h,
                        color: Colors.grey.shade300,
                      ),
                      _buildStatItem(
                        context,
                        'reviews',
                        providerData['reviewCount'].toString(),
                        'Reviews',
                      ),
                    ],
                  ),
                  SizedBox(height: 3.h),

                  // Availability Badge
                  Container(
                    padding:
                        EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.5.h),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(
                        color: Colors.grey.shade200,
                        width: 1.5,
                      ),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withAlpha(13),
                          blurRadius: 8,
                          offset: const Offset(0, 2),
                        ),
                      ],
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        CustomIconWidget(
                          iconName: providerData['isAvailable'] == true
                              ? 'check_circle'
                              : 'schedule',
                          color: providerData['isAvailable'] == true
                              ? const Color(0xFF059669)
                              : const Color(0xFFF59E0B),
                          size: 5.w,
                        ),
                        SizedBox(width: 2.w),
                        Text(
                          providerData['isAvailable'] == true
                              ? 'Available Today'
                              : 'Next Available: ${providerData['nextAvailable']}',
                          style: theme.textTheme.labelLarge?.copyWith(
                            color: Colors.grey.shade700,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStatItem(
    BuildContext context,
    String iconName,
    String value,
    String label,
  ) {
    final theme = Theme.of(context);

    return Column(
      children: [
        CustomIconWidget(
          iconName: iconName,
          color: Colors.grey.shade600,
          size: 6.w,
        ),
        SizedBox(height: 1.h),
        Text(
          value,
          style: theme.textTheme.titleLarge?.copyWith(
            color: Colors.grey.shade800,
            fontWeight: FontWeight.w700,
          ),
        ),
        SizedBox(height: 0.5.h),
        Text(
          label,
          style: theme.textTheme.bodySmall?.copyWith(
            color: Colors.grey.shade600,
          ),
        ),
      ],
    );
  }
}
