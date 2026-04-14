import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class ShowNotesWidget extends StatefulWidget {
  final String showNotes;
  final List<Map<String, dynamic>> timestamps;
  final Function(int) onTimestampTap;

  const ShowNotesWidget({
    Key? key,
    required this.showNotes,
    required this.timestamps,
    required this.onTimestampTap,
  }) : super(key: key);

  @override
  State<ShowNotesWidget> createState() => _ShowNotesWidgetState();
}

class _ShowNotesWidgetState extends State<ShowNotesWidget>
    with TickerProviderStateMixin {
  late AnimationController _expandController;
  late Animation<double> _expandAnimation;
  bool _isExpanded = false;
  final ScrollController _scrollController = ScrollController();

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
  }

  @override
  void dispose() {
    _expandController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.1),
            blurRadius: 20,
            offset: const Offset(0, -5),
          ),
        ],
      ),
      child: Column(
        children: [
          // Handle bar
          Container(
            width: 12.w,
            height: 0.5.h,
            margin: EdgeInsets.symmetric(vertical: 2.h),
            decoration: BoxDecoration(
              color: AppTheme.lightTheme.colorScheme.onSurface
                  .withValues(alpha: 0.3),
              borderRadius: BorderRadius.circular(10),
            ),
          ),

          // Header
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 4.w),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Show Notes',
                  style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),
                GestureDetector(
                  onTap: () {
                    setState(() {
                      _isExpanded = !_isExpanded;
                      if (_isExpanded) {
                        _expandController.forward();
                      } else {
                        _expandController.reverse();
                      }
                    });
                  },
                  child: AnimatedRotation(
                    turns: _isExpanded ? 0.5 : 0,
                    duration: const Duration(milliseconds: 300),
                    child: CustomIconWidget(
                      iconName: 'expand_more',
                      color: AppTheme.lightTheme.colorScheme.onSurface,
                      size: 6.w,
                    ),
                  ),
                ),
              ],
            ),
          ),

          SizedBox(height: 2.h),

          // Content
          AnimatedBuilder(
            animation: _expandAnimation,
            builder: (context, child) {
              return SizeTransition(
                sizeFactor: _expandAnimation,
                child: Container(
                  constraints: BoxConstraints(
                    maxHeight: _isExpanded ? 60.h : 20.h,
                  ),
                  child: SingleChildScrollView(
                    controller: _scrollController,
                    padding: EdgeInsets.symmetric(horizontal: 4.w),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Timestamps section
                        if (widget.timestamps.isNotEmpty) ...[
                          Text(
                            'Timestamps',
                            style: AppTheme.lightTheme.textTheme.titleMedium
                                ?.copyWith(
                              fontWeight: FontWeight.w600,
                              color: AppTheme.lightTheme.colorScheme.secondary,
                            ),
                          ),
                          SizedBox(height: 1.h),
                          ...widget.timestamps.map(
                              (timestamp) => _buildTimestampItem(timestamp)),
                          SizedBox(height: 3.h),
                        ],

                        // Show notes content
                        Text(
                          'Episode Description',
                          style: AppTheme.lightTheme.textTheme.titleMedium
                              ?.copyWith(
                            fontWeight: FontWeight.w600,
                            color: AppTheme.lightTheme.colorScheme.secondary,
                          ),
                        ),
                        SizedBox(height: 1.h),
                        _buildRichText(widget.showNotes),
                        SizedBox(height: 4.h),
                      ],
                    ),
                  ),
                ),
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildTimestampItem(Map<String, dynamic> timestamp) {
    return GestureDetector(
      onTap: () => widget.onTimestampTap(timestamp['seconds'] as int),
      child: Container(
        margin: EdgeInsets.only(bottom: 1.h),
        padding: EdgeInsets.all(3.w),
        decoration: BoxDecoration(
          color: AppTheme.lightTheme.colorScheme.surface,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color:
                AppTheme.lightTheme.colorScheme.outline.withValues(alpha: 0.2),
          ),
        ),
        child: Row(
          children: [
            Container(
              padding: EdgeInsets.symmetric(horizontal: 2.w, vertical: 0.5.h),
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.colorScheme.secondary
                    .withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(
                _formatTimestamp(timestamp['seconds'] as int),
                style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                  color: AppTheme.lightTheme.colorScheme.secondary,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
            SizedBox(width: 3.w),
            Expanded(
              child: Text(
                timestamp['title'] as String,
                style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                  fontWeight: FontWeight.w500,
                ),
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
            ),
            CustomIconWidget(
              iconName: 'play_arrow',
              color: AppTheme.lightTheme.colorScheme.secondary
                  .withValues(alpha: 0.7),
              size: 5.w,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildRichText(String content) {
    // Simple rich text implementation
    // In a real app, you'd parse markdown or HTML
    final lines = content.split('\n');

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: lines.map((line) {
        if (line.trim().isEmpty) {
          return SizedBox(height: 1.h);
        }

        // Check if line is a header (starts with #)
        if (line.startsWith('#')) {
          return Padding(
            padding: EdgeInsets.symmetric(vertical: 1.h),
            child: Text(
              line.replaceFirst('#', '').trim(),
              style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.w600,
                color: AppTheme.lightTheme.colorScheme.secondary,
              ),
            ),
          );
        }

        // Check if line contains a link (simplified)
        if (line.contains('http')) {
          return Padding(
            padding: EdgeInsets.only(bottom: 1.h),
            child: GestureDetector(
              onTap: () {
                // Handle link tap
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(content: Text('Link tapped: ${line.trim()}')),
                );
              },
              child: Text(
                line,
                style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                  color: AppTheme.lightTheme.colorScheme.secondary,
                  decoration: TextDecoration.underline,
                ),
              ),
            ),
          );
        }

        // Regular paragraph
        return Padding(
          padding: EdgeInsets.only(bottom: 1.h),
          child: Text(
            line,
            style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
              height: 1.6,
            ),
          ),
        );
      }).toList(),
    );
  }

  String _formatTimestamp(int seconds) {
    final minutes = seconds ~/ 60;
    final remainingSeconds = seconds % 60;
    return '${minutes.toString().padLeft(2, '0')}:${remainingSeconds.toString().padLeft(2, '0')}';
  }
}
