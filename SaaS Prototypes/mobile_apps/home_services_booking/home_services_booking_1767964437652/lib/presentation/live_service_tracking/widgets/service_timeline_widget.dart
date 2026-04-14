import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../widgets/custom_icon_widget.dart';

class ServiceTimelineWidget extends StatefulWidget {
  final String currentStage;
  final Map<String, dynamic> serviceData;
  final VoidCallback? onStageUpdate;

  const ServiceTimelineWidget({
    super.key,
    required this.currentStage,
    required this.serviceData,
    this.onStageUpdate,
  });

  @override
  State<ServiceTimelineWidget> createState() => _ServiceTimelineWidgetState();
}

class _ServiceTimelineWidgetState extends State<ServiceTimelineWidget>
    with TickerProviderStateMixin {
  late AnimationController _progressController;
  late AnimationController _pulseController;
  late Animation<double> _progressAnimation;
  late Animation<double> _pulseAnimation;

  final List<Map<String, dynamic>> _timelineStages = [
    {
      'id': 'en_route',
      'title': 'Provider En Route',
      'subtitle': 'Your service provider is on the way',
      'icon': 'directions_car',
      'color': Color(0xFF3B82F6),
    },
    {
      'id': 'arrived',
      'title': 'Service Started',
      'subtitle': 'Provider has arrived and started setup',
      'icon': 'play_circle_filled',
      'color': Color(0xFF10B981),
    },
    {
      'id': 'in_progress',
      'title': 'In Progress',
      'subtitle': 'Service is currently being performed',
      'icon': 'build_circle',
      'color': Color(0xFFF59E0B),
    },
    {
      'id': 'completion_review',
      'title': 'Completion Review',
      'subtitle': 'Service completed, awaiting your review',
      'icon': 'check_circle',
      'color': Color(0xFF059669),
    },
  ];

  @override
  void initState() {
    super.initState();
    _progressController = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    );
    _pulseController = AnimationController(
      duration: const Duration(milliseconds: 2000),
      vsync: this,
    );

    _progressAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _progressController,
      curve: Curves.easeInOut,
    ));

    _pulseAnimation = Tween<double>(
      begin: 1.0,
      end: 1.2,
    ).animate(CurvedAnimation(
      parent: _pulseController,
      curve: Curves.easeInOut,
    ));

    _startAnimations();
  }

  void _startAnimations() {
    _progressController.forward();
    _pulseController.repeat(reverse: true);
  }

  @override
  void dispose() {
    _progressController.dispose();
    _pulseController.dispose();
    super.dispose();
  }

  int get _currentStageIndex {
    return _timelineStages
        .indexWhere((stage) => stage['id'] == widget.currentStage);
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
          Text(
            'Service Progress',
            style: theme.textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.w600,
              color: colorScheme.onSurface,
            ),
          ),
          SizedBox(height: 3.h),
          _buildTimeline(context),
          SizedBox(height: 2.h),
          _buildEstimatedTime(context),
        ],
      ),
    );
  }

  Widget _buildTimeline(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Column(
      children: _timelineStages.asMap().entries.map((entry) {
        final index = entry.key;
        final stage = entry.value;
        final isCompleted = index < _currentStageIndex;
        final isCurrent = index == _currentStageIndex;
        final isUpcoming = index > _currentStageIndex;

        return _buildTimelineItem(
          context,
          stage,
          isCompleted,
          isCurrent,
          isUpcoming,
          index == _timelineStages.length - 1,
        );
      }).toList(),
    );
  }

  Widget _buildTimelineItem(
    BuildContext context,
    Map<String, dynamic> stage,
    bool isCompleted,
    bool isCurrent,
    bool isUpcoming,
    bool isLast,
  ) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    final stageColor = stage['color'] as Color;

    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Column(
          children: [
            AnimatedBuilder(
              animation: isCurrent ? _pulseAnimation : _progressAnimation,
              builder: (context, child) {
                return Transform.scale(
                  scale: isCurrent ? _pulseAnimation.value : 1.0,
                  child: Container(
                    width: 12.w,
                    height: 12.w,
                    decoration: BoxDecoration(
                      color: isCompleted || isCurrent
                          ? stageColor
                          : colorScheme.outline.withValues(alpha: 0.3),
                      shape: BoxShape.circle,
                      border: Border.all(
                        color: isCompleted || isCurrent
                            ? stageColor
                            : colorScheme.outline.withValues(alpha: 0.5),
                        width: 2,
                      ),
                    ),
                    child: Center(
                      child: isCompleted
                          ? CustomIconWidget(
                              iconName: 'check',
                              color: Colors.white,
                              size: 6.w,
                            )
                          : CustomIconWidget(
                              iconName: stage['icon'],
                              color: isCurrent
                                  ? Colors.white
                                  : colorScheme.outline.withValues(alpha: 0.6),
                              size: 6.w,
                            ),
                    ),
                  ),
                );
              },
            ),
            if (!isLast)
              AnimatedContainer(
                duration: const Duration(milliseconds: 500),
                width: 2,
                height: 8.h,
                color: isCompleted
                    ? stageColor
                    : colorScheme.outline.withValues(alpha: 0.3),
              ),
          ],
        ),
        SizedBox(width: 4.w),
        Expanded(
          child: Padding(
            padding: EdgeInsets.only(bottom: isLast ? 0 : 6.h),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  stage['title'],
                  style: theme.textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w600,
                    color: isCompleted || isCurrent
                        ? colorScheme.onSurface
                        : colorScheme.onSurfaceVariant,
                  ),
                ),
                SizedBox(height: 0.5.h),
                Text(
                  stage['subtitle'],
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: isCompleted || isCurrent
                        ? colorScheme.onSurfaceVariant
                        : colorScheme.onSurfaceVariant.withValues(alpha: 0.6),
                  ),
                ),
                if (isCurrent && _getStageTime() != null) ...[
                  SizedBox(height: 1.h),
                  Text(
                    _getStageTime()!,
                    style: theme.textTheme.bodySmall?.copyWith(
                      color: stageColor,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ],
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildEstimatedTime(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    final estimatedCompletion =
        widget.serviceData['estimatedCompletion'] as String? ?? '2:30 PM';

    return Container(
      width: double.infinity,
      padding: EdgeInsets.all(3.w),
      decoration: BoxDecoration(
        color: colorScheme.primary.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(3.w),
        border: Border.all(
          color: colorScheme.primary.withValues(alpha: 0.2),
          width: 1,
        ),
      ),
      child: Row(
        children: [
          CustomIconWidget(
            iconName: 'schedule',
            color: colorScheme.primary,
            size: 5.w,
          ),
          SizedBox(width: 3.w),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Estimated Completion',
                  style: theme.textTheme.bodySmall?.copyWith(
                    color: colorScheme.primary,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                Text(
                  estimatedCompletion,
                  style: theme.textTheme.titleMedium?.copyWith(
                    color: colorScheme.primary,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  String? _getStageTime() {
    switch (widget.currentStage) {
      case 'en_route':
        return 'Started 15 minutes ago';
      case 'arrived':
        return 'Arrived 5 minutes ago';
      case 'in_progress':
        return 'In progress for 45 minutes';
      case 'completion_review':
        return 'Completed just now';
      default:
        return null;
    }
  }
}
