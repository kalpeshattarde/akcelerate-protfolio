import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class OrderProgressTimeline extends StatefulWidget {
  final String currentStatus;
  final Map<String, String> timestamps;

  const OrderProgressTimeline({
    Key? key,
    required this.currentStatus,
    required this.timestamps,
  }) : super(key: key);

  @override
  State<OrderProgressTimeline> createState() => _OrderProgressTimelineState();
}

class _OrderProgressTimelineState extends State<OrderProgressTimeline>
    with TickerProviderStateMixin {
  late AnimationController _pulseController;
  late Animation<double> _pulseAnimation;

  final List<Map<String, String>> _stages = [
    {
      'key': 'picked_up',
      'title': 'Picked Up',
      'description': 'Your order has been collected'
    },
    {
      'key': 'in_process',
      'title': 'In Process',
      'description': 'Your items are being processed'
    },
    {
      'key': 'delivered',
      'title': 'Delivered',
      'description': 'Your order has been delivered'
    },
  ];

  @override
  void initState() {
    super.initState();
    _pulseController = AnimationController(
      duration: Duration(seconds: 2),
      vsync: this,
    );
    _pulseAnimation = Tween<double>(
      begin: 0.8,
      end: 1.2,
    ).animate(CurvedAnimation(
      parent: _pulseController,
      curve: Curves.easeInOut,
    ));

    if (_getCurrentStageIndex() < _stages.length - 1) {
      _pulseController.repeat(reverse: true);
    }
  }

  @override
  void dispose() {
    _pulseController.dispose();
    super.dispose();
  }

  int _getCurrentStageIndex() {
    return _stages.indexWhere((stage) => stage['key'] == widget.currentStatus);
  }

  bool _isStageCompleted(int index) {
    return index <= _getCurrentStageIndex();
  }

  bool _isCurrentStage(int index) {
    return index == _getCurrentStageIndex();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 3.h),
      child: Column(
        children: [
          for (int i = 0; i < _stages.length; i++) ...[
            _buildTimelineItem(i),
            if (i < _stages.length - 1) _buildConnector(i),
          ],
        ],
      ),
    );
  }

  Widget _buildTimelineItem(int index) {
    final stage = _stages[index];
    final isCompleted = _isStageCompleted(index);
    final isCurrent = _isCurrentStage(index);
    final timestamp = widget.timestamps[stage['key']!] ?? '';

    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Column(
          children: [
            _buildCircleIndicator(isCompleted, isCurrent),
          ],
        ),
        SizedBox(width: 4.w),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                stage['title']!,
                style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                  color: isCompleted
                      ? AppTheme.lightTheme.primaryColor
                      : AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                  fontWeight: isCurrent ? FontWeight.w600 : FontWeight.w500,
                ),
              ),
              SizedBox(height: 0.5.h),
              Text(
                stage['description']!,
                style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                  color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                ),
              ),
              if (timestamp.isNotEmpty) ...[
                SizedBox(height: 0.5.h),
                Text(
                  timestamp,
                  style: AppTheme.lightTheme.textTheme.labelSmall?.copyWith(
                    color: isCompleted
                        ? AppTheme.lightTheme.primaryColor
                        : AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ],
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildCircleIndicator(bool isCompleted, bool isCurrent) {
    Widget circle = Container(
      width: 6.w,
      height: 6.w,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        color: isCompleted
            ? AppTheme.lightTheme.primaryColor
            : AppTheme.lightTheme.colorScheme.surface,
        border: Border.all(
          color: isCompleted
              ? AppTheme.lightTheme.primaryColor
              : AppTheme.lightTheme.colorScheme.outline,
          width: 2,
        ),
      ),
      child: isCompleted
          ? CustomIconWidget(
              iconName: 'check',
              color: Colors.white,
              size: 3.w,
            )
          : null,
    );

    if (isCurrent && isCompleted) {
      return AnimatedBuilder(
        animation: _pulseAnimation,
        builder: (context, child) {
          return Transform.scale(
            scale: _pulseAnimation.value,
            child: circle,
          );
        },
      );
    }

    return circle;
  }

  Widget _buildConnector(int index) {
    // Removed the vertical blue line - returning empty spacing instead
    return Container(
      margin: EdgeInsets.only(left: 3.w),
      child: SizedBox(
        width: 2,
        height: 4.h,
      ),
    );
  }
}
