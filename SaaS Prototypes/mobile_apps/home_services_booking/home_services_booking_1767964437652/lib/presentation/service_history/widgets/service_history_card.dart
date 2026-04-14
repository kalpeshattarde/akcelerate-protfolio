import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../core/design_constants.dart';
import '../../../widgets/custom_icon_widget.dart';

class ServiceHistoryCard extends StatefulWidget {
  final Map<String, dynamic> serviceData;
  final VoidCallback? onTap;
  final VoidCallback? onRebook;
  final VoidCallback? onContact;
  final VoidCallback? onViewReceipt;
  final VoidCallback? onShare;

  const ServiceHistoryCard({
    super.key,
    required this.serviceData,
    this.onTap,
    this.onRebook,
    this.onContact,
    this.onViewReceipt,
    this.onShare,
  });

  @override
  State<ServiceHistoryCard> createState() => _ServiceHistoryCardState();
}

class _ServiceHistoryCardState extends State<ServiceHistoryCard>
    with SingleTickerProviderStateMixin {
  late AnimationController _expandController;
  late Animation<double> _expandAnimation;
  late Animation<double> _fadeAnimation;
  bool _isExpanded = false;

  @override
  void initState() {
    super.initState();
    _expandController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );
    _expandAnimation = CurvedAnimation(
      parent: _expandController,
      curve: Curves.easeInOut,
    );
    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(
        parent: _expandController,
        curve: const Interval(0.3, 1.0, curve: Curves.easeIn),
      ),
    );
  }

  @override
  void dispose() {
    _expandController.dispose();
    super.dispose();
  }

  void _toggleExpansion() {
    setState(() {
      _isExpanded = !_isExpanded;
    });
    if (_isExpanded) {
      _expandController.forward();
    } else {
      _expandController.reverse();
    }
  }

  Color _getStatusColor() {
    switch (widget.serviceData['status']?.toLowerCase()) {
      case 'completed':
        return const Color(0xFF059669); // Green
      case 'pending':
        return const Color(0xFFF59E0B); // Amber
      case 'cancelled':
        return const Color(0xFFDC2626); // Red
      case 'rescheduled':
        return const Color(0xFF7C3AED); // Purple
      default:
        return const Color(0xFF6B7280); // Gray
    }
  }

  Widget _buildStatusBadge() {
    final status = widget.serviceData['status'] as String? ?? 'unknown';
    final statusColor = _getStatusColor();

    return Container(
      padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 0.5.h),
      decoration: BoxDecoration(
        color: statusColor.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: statusColor.withValues(alpha: 0.3)),
      ),
      child: Text(
        status.toUpperCase(),
        style: Theme.of(context).textTheme.labelSmall?.copyWith(
              color: Colors.white, // Changed to white for high contrast
              fontWeight: FontWeight.w600,
              fontSize: 10.sp,
            ),
      ),
    );
  }

  Widget _buildActionButtons() {
    final status = widget.serviceData['status']?.toLowerCase();

    return Row(
      children: [
        if (status == 'completed') ...[
          _buildActionButton(
            'Re-book',
            'refresh',
            widget.onRebook,
            Theme.of(context).colorScheme.primary,
          ),
          SizedBox(width: 2.w),
          _buildActionButton(
            'Receipt',
            'receipt',
            widget.onViewReceipt,
            Theme.of(context).colorScheme.secondary,
          ),
        ] else if (status == 'pending') ...[
          _buildActionButton(
            'Contact',
            'phone',
            widget.onContact,
            Theme.of(context).colorScheme.primary,
          ),
        ] else if (status == 'cancelled') ...[
          _buildActionButton(
            'Re-book',
            'refresh',
            widget.onRebook,
            Theme.of(context).colorScheme.primary,
          ),
        ],
        const Spacer(),
        _buildActionButton(
          'Share',
          'share',
          widget.onShare,
          Theme.of(context).colorScheme.outline,
        ),
      ],
    );
  }

  Widget _buildActionButton(
    String label,
    String icon,
    VoidCallback? onPressed,
    Color color,
  ) {
    return OutlinedButton.icon(
      onPressed: onPressed,
      style: OutlinedButton.styleFrom(
        side: BorderSide(color: color.withValues(alpha: 0.3)),
        padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
      ),
      icon: CustomIconWidget(
        iconName: icon,
        color: color,
        size: 4.w,
      ),
      label: Text(
        label,
        style: Theme.of(context).textTheme.labelSmall?.copyWith(
              color: color,
              fontWeight: FontWeight.w600,
            ),
      ),
    );
  }

  Widget _buildPhotosSection() {
    final photos = widget.serviceData['photos'] as List<String>? ?? [];
    if (photos.isEmpty) return const SizedBox.shrink();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Service Photos',
          style: Theme.of(context).textTheme.titleSmall?.copyWith(
                fontWeight: FontWeight.w600,
              ),
        ),
        SizedBox(height: 1.h),
        SizedBox(
          height: 20.h,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            itemCount: photos.length,
            itemBuilder: (context, index) {
              return Container(
                width: 30.w,
                margin: EdgeInsets.only(right: 2.w),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(8),
                  image: DecorationImage(
                    image: NetworkImage(photos[index]),
                    fit: BoxFit.cover,
                  ),
                ),
              );
            },
          ),
        ),
        SizedBox(height: 2.h),
      ],
    );
  }

  Widget _buildRatingSection() {
    final rating = widget.serviceData['rating'] as double?;
    if (rating == null) return const SizedBox.shrink();

    return Row(
      children: [
        CustomIconWidget(
          iconName: 'star',
          color: const Color(0xFFFBBF24),
          size: 5.w,
        ),
        SizedBox(width: 1.w),
        Text(
          rating.toStringAsFixed(1),
          style: Theme.of(context).textTheme.titleSmall?.copyWith(
                fontWeight: FontWeight.w600,
              ),
        ),
        SizedBox(width: 2.w),
        Text(
          'Service Rating',
          style: Theme.of(context).textTheme.bodySmall?.copyWith(
                color: Theme.of(context).colorScheme.onSurfaceVariant,
              ),
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    final serviceType =
        widget.serviceData['serviceType'] as String? ?? 'cleaning';

    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
      decoration: ServiceCardDesign.generateCardDecoration(serviceType),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          borderRadius: BorderRadius.circular(ServiceCardDesign.cornerRadius),
          onTap: () {
            _toggleExpansion();
            widget.onTap?.call();
          },
          child: Padding(
            padding: EdgeInsets.all(ServiceCardDesign.cardPadding.w),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Header Row
                Row(
                  children: [
                    // Provider Avatar
                    Container(
                      width: 12.w,
                      height: 12.w,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(8),
                        image: widget.serviceData['providerAvatar'] != null
                            ? DecorationImage(
                                image: NetworkImage(
                                  widget.serviceData['providerAvatar'],
                                ),
                                fit: BoxFit.cover,
                              )
                            : null,
                        color: widget.serviceData['providerAvatar'] == null
                            ? ServiceCardDesign.getContrastingTextColor(
                                    serviceType)
                                .withValues(alpha: 0.2)
                            : null,
                      ),
                      child: widget.serviceData['providerAvatar'] == null
                          ? Center(
                              child: CustomIconWidget(
                                iconName: 'person',
                                color:
                                    ServiceCardDesign.getContrastingTextColor(
                                        serviceType),
                                size: 6.w,
                              ),
                            )
                          : null,
                    ),
                    SizedBox(width: 3.w),

                    // Service Info
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            widget.serviceData['serviceName'] as String? ??
                                'Service',
                            style: theme.textTheme.titleMedium?.copyWith(
                              color: ServiceCardDesign.getContrastingTextColor(
                                  serviceType),
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                          Text(
                            widget.serviceData['providerName'] as String? ??
                                'Provider',
                            style: theme.textTheme.bodySmall?.copyWith(
                              color: ServiceCardDesign.getSecondaryTextColor(
                                  serviceType),
                            ),
                          ),
                        ],
                      ),
                    ),

                    // Status Badge
                    _buildStatusBadge(),
                  ],
                ),

                SizedBox(height: 2.h),

                // Service Details
                Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              CustomIconWidget(
                                iconName: 'calendar_today',
                                color: ServiceCardDesign.getSecondaryTextColor(
                                    serviceType),
                                size: 4.w,
                              ),
                              SizedBox(width: 1.w),
                              Text(
                                widget.serviceData['date'] as String? ?? 'Date',
                                style: theme.textTheme.bodySmall?.copyWith(
                                  color:
                                      ServiceCardDesign.getContrastingTextColor(
                                          serviceType),
                                ),
                              ),
                            ],
                          ),
                          SizedBox(height: 0.5.h),
                          Row(
                            children: [
                              CustomIconWidget(
                                iconName: 'schedule',
                                color: ServiceCardDesign.getSecondaryTextColor(
                                    serviceType),
                                size: 4.w,
                              ),
                              SizedBox(width: 1.w),
                              Text(
                                widget.serviceData['time'] as String? ?? 'Time',
                                style: theme.textTheme.bodySmall?.copyWith(
                                  color:
                                      ServiceCardDesign.getContrastingTextColor(
                                          serviceType),
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),

                    // Price
                    Text(
                      widget.serviceData['totalCost'] as String? ?? '\$0',
                      style: theme.textTheme.titleLarge?.copyWith(
                        color: ServiceCardDesign.getContrastingTextColor(
                            serviceType),
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ],
                ),

                // Expandable Content
                SizeTransition(
                  sizeFactor: _expandAnimation,
                  child: FadeTransition(
                    opacity: _fadeAnimation,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        SizedBox(height: 2.h),

                        // Address
                        if (widget.serviceData['address'] != null) ...[
                          Row(
                            children: [
                              CustomIconWidget(
                                iconName: 'location_on',
                                color: ServiceCardDesign.getSecondaryTextColor(
                                    serviceType),
                                size: 4.w,
                              ),
                              SizedBox(width: 1.w),
                              Expanded(
                                child: Text(
                                  widget.serviceData['address'],
                                  style: theme.textTheme.bodySmall?.copyWith(
                                    color: ServiceCardDesign
                                        .getContrastingTextColor(serviceType),
                                  ),
                                ),
                              ),
                            ],
                          ),
                          SizedBox(height: 1.h),
                        ],

                        // Duration
                        if (widget.serviceData['duration'] != null) ...[
                          Row(
                            children: [
                              CustomIconWidget(
                                iconName: 'timer',
                                color: ServiceCardDesign.getSecondaryTextColor(
                                    serviceType),
                                size: 4.w,
                              ),
                              SizedBox(width: 1.w),
                              Text(
                                'Duration: ${widget.serviceData['duration']}',
                                style: theme.textTheme.bodySmall?.copyWith(
                                  color:
                                      ServiceCardDesign.getContrastingTextColor(
                                          serviceType),
                                ),
                              ),
                            ],
                          ),
                          SizedBox(height: 2.h),
                        ],

                        // Photos Section
                        _buildPhotosSection(),

                        // Rating Section
                        _buildRatingSection(),

                        SizedBox(height: 2.h),

                        // Action Buttons
                        _buildActionButtons(),
                      ],
                    ),
                  ),
                ),

                // Expansion Indicator
                Center(
                  child: AnimatedRotation(
                    turns: _isExpanded ? 0.5 : 0.0,
                    duration: const Duration(milliseconds: 300),
                    child: CustomIconWidget(
                      iconName: 'keyboard_arrow_down',
                      color:
                          ServiceCardDesign.getSecondaryTextColor(serviceType),
                      size: 6.w,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
