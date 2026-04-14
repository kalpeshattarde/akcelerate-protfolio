import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class ProviderProfileCardWidget extends StatefulWidget {
  final Map<String, dynamic> providerData;
  final VoidCallback? onCallTap;
  final VoidCallback? onMessageTap;
  final VoidCallback? onChatTap;
  final VoidCallback? onProfileTap;

  const ProviderProfileCardWidget({
    super.key,
    required this.providerData,
    this.onCallTap,
    this.onMessageTap,
    this.onChatTap,
    this.onProfileTap,
  });

  @override
  State<ProviderProfileCardWidget> createState() =>
      _ProviderProfileCardWidgetState();
}

class _ProviderProfileCardWidgetState extends State<ProviderProfileCardWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 200),
      vsync: this,
    );
    _scaleAnimation = Tween<double>(
      begin: 1.0,
      end: 0.95,
    ).animate(CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeInOut,
    ));
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
      width: double.infinity,
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: colorScheme.surface,
        borderRadius: BorderRadius.circular(4.w),
        boxShadow: [
          BoxShadow(
            color: colorScheme.shadow.withValues(alpha: 0.1),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildProviderHeader(context),
          SizedBox(height: 3.h),
          _buildProviderStats(context),
          SizedBox(height: 3.h),
          _buildActionButtons(context),
        ],
      ),
    );
  }

  Widget _buildProviderHeader(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    final providerName = widget.providerData['name'] as String? ?? 'John Smith';
    final providerImage = widget.providerData['image'] as String? ??
        'https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png';
    final rating = widget.providerData['rating'] as double? ?? 4.8;
    final serviceType =
        widget.providerData['serviceType'] as String? ?? 'Plumbing';
    final isOnline = widget.providerData['isOnline'] as bool? ?? true;

    return InkWell(
      onTap: widget.onProfileTap,
      borderRadius: BorderRadius.circular(3.w),
      child: Row(
        children: [
          Stack(
            children: [
              Container(
                width: 16.w,
                height: 16.w,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  border: Border.all(
                    color: colorScheme.primary.withValues(alpha: 0.3),
                    width: 2,
                  ),
                ),
                child: ClipOval(
                  child: CustomImageWidget(
                    imageUrl: providerImage,
                    width: 16.w,
                    height: 16.w,
                    fit: BoxFit.cover,
                  ),
                ),
              ),
              Positioned(
                bottom: 0,
                right: 0,
                child: Container(
                  width: 5.w,
                  height: 5.w,
                  decoration: BoxDecoration(
                    color: isOnline ? Colors.green : Colors.grey,
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: colorScheme.surface,
                      width: 2,
                    ),
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
                        providerName,
                        style: theme.textTheme.titleLarge?.copyWith(
                          fontWeight: FontWeight.w600,
                          color: colorScheme.onSurface,
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    Container(
                      padding: EdgeInsets.symmetric(
                        horizontal: 2.w,
                        vertical: 0.5.h,
                      ),
                      decoration: BoxDecoration(
                        color: colorScheme.primary.withValues(alpha: 0.1),
                        borderRadius: BorderRadius.circular(2.w),
                      ),
                      child: Text(
                        'PRO',
                        style: theme.textTheme.labelSmall?.copyWith(
                          color: colorScheme.primary,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  ],
                ),
                SizedBox(height: 0.5.h),
                Text(
                  serviceType,
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: colorScheme.onSurfaceVariant,
                  ),
                ),
                SizedBox(height: 0.5.h),
                Row(
                  children: [
                    _buildRatingStars(rating),
                    SizedBox(width: 2.w),
                    Text(
                      rating.toStringAsFixed(1),
                      style: theme.textTheme.bodyMedium?.copyWith(
                        fontWeight: FontWeight.w600,
                        color: colorScheme.onSurface,
                      ),
                    ),
                    SizedBox(width: 1.w),
                    Text(
                      '(${widget.providerData['reviewCount'] ?? 127} reviews)',
                      style: theme.textTheme.bodySmall?.copyWith(
                        color: colorScheme.onSurfaceVariant,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildRatingStars(double rating) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Row(
      mainAxisSize: MainAxisSize.min,
      children: List.generate(5, (index) {
        final starRating = index + 1;
        return CustomIconWidget(
          iconName: starRating <= rating ? 'star' : 'star_border',
          color: starRating <= rating
              ? const Color(0xFFFFC107)
              : colorScheme.onSurfaceVariant.withValues(alpha: 0.5),
          size: 4.w,
        );
      }),
    );
  }

  Widget _buildProviderStats(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    final completedJobs = widget.providerData['completedJobs'] as int? ?? 245;
    final experience =
        widget.providerData['experience'] as String? ?? '5+ years';
    final responseTime =
        widget.providerData['responseTime'] as String? ?? '< 10 min';

    return Row(
      children: [
        Expanded(
          child: _buildStatItem(
            context,
            'work',
            completedJobs.toString(),
            'Jobs Completed',
          ),
        ),
        Container(
          width: 1,
          height: 6.h,
          color: colorScheme.outline.withValues(alpha: 0.3),
        ),
        Expanded(
          child: _buildStatItem(
            context,
            'schedule',
            experience,
            'Experience',
          ),
        ),
        Container(
          width: 1,
          height: 6.h,
          color: colorScheme.outline.withValues(alpha: 0.3),
        ),
        Expanded(
          child: _buildStatItem(
            context,
            'speed',
            responseTime,
            'Response Time',
          ),
        ),
      ],
    );
  }

  Widget _buildStatItem(
    BuildContext context,
    String iconName,
    String value,
    String label,
  ) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Column(
      children: [
        CustomIconWidget(
          iconName: iconName,
          color: colorScheme.primary,
          size: 6.w,
        ),
        SizedBox(height: 1.h),
        Text(
          value,
          style: theme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w600,
            color: colorScheme.onSurface,
          ),
          textAlign: TextAlign.center,
        ),
        SizedBox(height: 0.5.h),
        Text(
          label,
          style: theme.textTheme.bodySmall?.copyWith(
            color: colorScheme.onSurfaceVariant,
          ),
          textAlign: TextAlign.center,
          maxLines: 2,
          overflow: TextOverflow.ellipsis,
        ),
      ],
    );
  }

  Widget _buildActionButtons(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Row(
      children: [
        Expanded(
          child: _buildActionButton(
            context,
            'phone',
            'Call',
            colorScheme.primary,
            widget.onCallTap,
          ),
        ),
        SizedBox(width: 3.w),
        Expanded(
          child: _buildActionButton(
            context,
            'message',
            'Message',
            colorScheme.secondary,
            widget.onMessageTap,
          ),
        ),
        SizedBox(width: 3.w),
        Expanded(
          child: _buildActionButton(
            context,
            'chat',
            'Chat',
            const Color(0xFFF59E0B),
            widget.onChatTap,
          ),
        ),
      ],
    );
  }

  Widget _buildActionButton(
    BuildContext context,
    String iconName,
    String label,
    Color color,
    VoidCallback? onTap,
  ) {
    final theme = Theme.of(context);

    return AnimatedBuilder(
      animation: _scaleAnimation,
      builder: (context, child) {
        return Transform.scale(
          scale: _scaleAnimation.value,
          child: InkWell(
            onTap: () {
              _animationController.forward().then((_) {
                _animationController.reverse();
              });
              onTap?.call();
            },
            borderRadius: BorderRadius.circular(3.w),
            child: Container(
              padding: EdgeInsets.symmetric(vertical: 2.h),
              decoration: BoxDecoration(
                color: color.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(3.w),
                border: Border.all(
                  color: color.withValues(alpha: 0.3),
                  width: 1,
                ),
              ),
              child: Column(
                children: [
                  CustomIconWidget(
                    iconName: iconName,
                    color: color,
                    size: 6.w,
                  ),
                  SizedBox(height: 1.h),
                  Text(
                    label,
                    style: theme.textTheme.bodyMedium?.copyWith(
                      color: color,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
