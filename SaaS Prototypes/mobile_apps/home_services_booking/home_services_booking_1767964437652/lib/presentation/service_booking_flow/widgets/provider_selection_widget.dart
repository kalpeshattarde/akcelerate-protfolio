import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class ProviderSelectionWidget extends StatefulWidget {
  final String? selectedProviderId;
  final Function(String) onProviderChanged;

  const ProviderSelectionWidget({
    super.key,
    this.selectedProviderId,
    required this.onProviderChanged,
  });

  @override
  State<ProviderSelectionWidget> createState() =>
      _ProviderSelectionWidgetState();
}

class _ProviderSelectionWidgetState extends State<ProviderSelectionWidget>
    with TickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _slideAnimation;

  final List<Map<String, dynamic>> _providers = [
    {
      'id': 'provider_1',
      'name': 'Sarah Johnson',
      'avatar':
          'https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png',
      'rating': 4.9,
      'reviewCount': 127,
      'experience': '5+ years',
      'specialties': ['Deep Cleaning', 'Eco-Friendly'],
      'isTopRated': true,
      'completedJobs': 340,
      'responseTime': '< 1 hour',
      'languages': ['English', 'Spanish'],
    },
    {
      'id': 'provider_2',
      'name': 'Michael Chen',
      'avatar':
          'https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png',
      'rating': 4.8,
      'reviewCount': 89,
      'experience': '3+ years',
      'specialties': ['Window Cleaning', 'Carpet Care'],
      'isTopRated': false,
      'completedJobs': 210,
      'responseTime': '< 2 hours',
      'languages': ['English', 'Mandarin'],
    },
    {
      'id': 'provider_3',
      'name': 'Emily Rodriguez',
      'avatar':
          'https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png',
      'rating': 4.9,
      'reviewCount': 156,
      'experience': '4+ years',
      'specialties': ['Appliance Cleaning', 'Organization'],
      'isTopRated': true,
      'completedJobs': 285,
      'responseTime': '< 30 min',
      'languages': ['English', 'Spanish', 'French'],
    },
    {
      'id': 'provider_4',
      'name': 'David Thompson',
      'avatar':
          'https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png',
      'rating': 4.7,
      'reviewCount': 73,
      'experience': '2+ years',
      'specialties': ['Basic Cleaning', 'Move-in/out'],
      'isTopRated': false,
      'completedJobs': 145,
      'responseTime': '< 3 hours',
      'languages': ['English'],
    },
  ];

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );
    _slideAnimation = Tween<double>(
      begin: 0,
      end: 1,
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

    return Container(
      padding: EdgeInsets.all(4.w),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Choose Your Provider',
                style: theme.textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.w700,
                ),
              ),
              Container(
                padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
                decoration: BoxDecoration(
                  color: colorScheme.tertiary.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    CustomIconWidget(
                      iconName: 'verified',
                      color: colorScheme.tertiary,
                      size: 4.w,
                    ),
                    SizedBox(width: 1.w),
                    Text(
                      'Verified',
                      style: theme.textTheme.labelSmall?.copyWith(
                        color: colorScheme.tertiary,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          SizedBox(height: 2.h),
          AnimatedBuilder(
            animation: _slideAnimation,
            builder: (context, child) {
              return Transform.translate(
                offset: Offset(0, (1 - _slideAnimation.value) * 50),
                child: Opacity(
                  opacity: _slideAnimation.value,
                  child: ListView.separated(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: _providers.length,
                    separatorBuilder: (context, index) => SizedBox(height: 2.h),
                    itemBuilder: (context, index) {
                      final provider = _providers[index];
                      final providerId = provider['id'] as String;
                      final isSelected =
                          widget.selectedProviderId == providerId;

                      return _buildProviderCard(
                        provider,
                        isSelected,
                        theme,
                        colorScheme,
                      );
                    },
                  ),
                ),
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildProviderCard(
    Map<String, dynamic> provider,
    bool isSelected,
    ThemeData theme,
    ColorScheme colorScheme,
  ) {
    final providerId = provider['id'] as String;
    final isTopRated = provider['isTopRated'] as bool;

    return GestureDetector(
      onTap: () => widget.onProviderChanged(providerId),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        decoration: BoxDecoration(
          color: isSelected
              ? colorScheme.primary.withValues(alpha: 0.05)
              : colorScheme.surface,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: isSelected
                ? colorScheme.primary
                : colorScheme.outline.withValues(alpha: 0.2),
            width: isSelected ? 2 : 1,
          ),
          boxShadow: [
            BoxShadow(
              color: isSelected
                  ? colorScheme.primary.withValues(alpha: 0.1)
                  : colorScheme.shadow.withValues(alpha: 0.05),
              blurRadius: isSelected ? 12 : 4,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Padding(
          padding: EdgeInsets.all(4.w),
          child: Column(
            children: [
              Row(
                children: [
                  Stack(
                    children: [
                      Container(
                        width: 16.w,
                        height: 16.w,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          border: Border.all(
                            color: isSelected
                                ? colorScheme.primary
                                : colorScheme.outline.withValues(alpha: 0.3),
                            width: 2,
                          ),
                        ),
                        child: ClipOval(
                          child: CustomImageWidget(
                            imageUrl: provider['avatar'] as String,
                            width: 16.w,
                            height: 16.w,
                            fit: BoxFit.cover,
                          ),
                        ),
                      ),
                      if (isTopRated)
                        Positioned(
                          bottom: 0,
                          right: 0,
                          child: Container(
                            width: 5.w,
                            height: 5.w,
                            decoration: BoxDecoration(
                              color: colorScheme.tertiary,
                              shape: BoxShape.circle,
                              border: Border.all(
                                color: colorScheme.surface,
                                width: 2,
                              ),
                            ),
                            child: CustomIconWidget(
                              iconName: 'star',
                              color: colorScheme.onTertiary,
                              size: 2.5.w,
                            ),
                          ),
                        ),
                    ],
                  ),
                  SizedBox(width: 4.w),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Expanded(
                              child: Text(
                                provider['name'] as String,
                                style: theme.textTheme.titleMedium?.copyWith(
                                  fontWeight: FontWeight.w700,
                                  color: isSelected
                                      ? colorScheme.primary
                                      : colorScheme.onSurface,
                                ),
                              ),
                            ),
                            if (isTopRated)
                              Container(
                                padding: EdgeInsets.symmetric(
                                  horizontal: 2.w,
                                  vertical: 0.5.h,
                                ),
                                decoration: BoxDecoration(
                                  color: colorScheme.tertiary,
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                child: Text(
                                  'Top Rated',
                                  style: theme.textTheme.labelSmall?.copyWith(
                                    color: colorScheme.onTertiary,
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                              ),
                          ],
                        ),
                        SizedBox(height: 0.5.h),
                        Row(
                          children: [
                            CustomIconWidget(
                              iconName: 'star',
                              color: colorScheme.tertiary,
                              size: 4.w,
                            ),
                            SizedBox(width: 1.w),
                            Text(
                              '${provider['rating']} (${provider['reviewCount']} reviews)',
                              style: theme.textTheme.bodySmall?.copyWith(
                                color: colorScheme.onSurfaceVariant,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                          ],
                        ),
                        SizedBox(height: 0.5.h),
                        Text(
                          '${provider['experience']} • ${provider['completedJobs']} jobs completed',
                          style: theme.textTheme.bodySmall?.copyWith(
                            color: colorScheme.onSurfaceVariant,
                          ),
                        ),
                      ],
                    ),
                  ),
                  if (isSelected)
                    Container(
                      width: 6.w,
                      height: 6.w,
                      decoration: BoxDecoration(
                        color: colorScheme.primary,
                        shape: BoxShape.circle,
                      ),
                      child: CustomIconWidget(
                        iconName: 'check',
                        color: colorScheme.onPrimary,
                        size: 4.w,
                      ),
                    ),
                ],
              ),
              SizedBox(height: 2.h),
              Row(
                children: [
                  Expanded(
                    child: _buildInfoChip(
                      'Response: ${provider['responseTime']}',
                      colorScheme.secondary,
                      theme,
                      colorScheme,
                    ),
                  ),
                  SizedBox(width: 2.w),
                  Expanded(
                    child: _buildInfoChip(
                      'Languages: ${(provider['languages'] as List).length}',
                      colorScheme.primary,
                      theme,
                      colorScheme,
                    ),
                  ),
                ],
              ),
              SizedBox(height: 1.h),
              Wrap(
                spacing: 2.w,
                runSpacing: 1.h,
                children:
                    (provider['specialties'] as List<String>).map((specialty) {
                  return Container(
                    padding:
                        EdgeInsets.symmetric(horizontal: 3.w, vertical: 0.5.h),
                    decoration: BoxDecoration(
                      color: colorScheme.outline.withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Text(
                      specialty,
                      style: theme.textTheme.labelSmall?.copyWith(
                        color: colorScheme.onSurfaceVariant,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  );
                }).toList(),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildInfoChip(
    String text,
    Color color,
    ThemeData theme,
    ColorScheme colorScheme,
  ) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Text(
        text,
        style: theme.textTheme.labelSmall?.copyWith(
          color: color,
          fontWeight: FontWeight.w600,
        ),
        textAlign: TextAlign.center,
        maxLines: 1,
        overflow: TextOverflow.ellipsis,
      ),
    );
  }
}
