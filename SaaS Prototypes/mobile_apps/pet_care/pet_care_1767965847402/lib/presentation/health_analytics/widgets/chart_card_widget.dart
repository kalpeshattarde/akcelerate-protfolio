import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

class ChartCardWidget extends StatefulWidget {
  final String title;
  final String subtitle;
  final Widget chart;
  final VoidCallback? onTap;
  final List<Widget>? actions;
  final bool isLoading;

  const ChartCardWidget({
    super.key,
    required this.title,
    required this.subtitle,
    required this.chart,
    this.onTap,
    this.actions,
    this.isLoading = false,
  });

  @override
  State<ChartCardWidget> createState() => _ChartCardWidgetState();
}

class _ChartCardWidgetState extends State<ChartCardWidget>
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

    return AnimatedBuilder(
      animation: _scaleAnimation,
      builder: (context, child) {
        return Transform.scale(
          scale: _scaleAnimation.value,
          child: GestureDetector(
            onTapDown: (_) => _animationController.forward(),
            onTapUp: (_) {
              _animationController.reverse();
              if (widget.onTap != null) {
                widget.onTap!();
              }
            },
            onTapCancel: () => _animationController.reverse(),
            child: Container(
              width: double.infinity,
              margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
              decoration: BoxDecoration(
                color: theme.colorScheme.surface,
                borderRadius: BorderRadius.circular(16),
                boxShadow: [
                  BoxShadow(
                    color: theme.brightness == Brightness.light
                        ? const Color(0x0A000000)
                        : const Color(0x1A000000),
                    blurRadius: 8,
                    offset: const Offset(0, 2),
                  ),
                ],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildHeader(theme),
                  widget.isLoading ? _buildLoadingState(theme) : widget.chart,
                  SizedBox(height: 2.h),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildHeader(ThemeData theme) {
    return Padding(
      padding: EdgeInsets.all(4.w),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  widget.title,
                  style: theme.textTheme.titleLarge?.copyWith(
                    fontWeight: FontWeight.w600,
                    color: theme.brightness == Brightness.light
                        ? const Color(0xFF1B1F23)
                        : const Color(0xFFE8EAED),
                  ),
                  overflow: TextOverflow.ellipsis,
                ),
                SizedBox(height: 0.5.h),
                Text(
                  widget.subtitle,
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: theme.brightness == Brightness.light
                        ? const Color(0xFF6A737D)
                        : const Color(0xFFADB5BD),
                  ),
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ),
          ),
          if (widget.actions != null) ...widget.actions!,
        ],
      ),
    );
  }

  Widget _buildLoadingState(ThemeData theme) {
    return Container(
      height: 25.h,
      padding: EdgeInsets.all(4.w),
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CircularProgressIndicator(
              color: theme.brightness == Brightness.light
                  ? const Color(0xFF2B5F75)
                  : const Color(0xFF4A8BA3),
            ),
            SizedBox(height: 2.h),
            Text(
              'Loading chart data...',
              style: theme.textTheme.bodyMedium?.copyWith(
                color: theme.brightness == Brightness.light
                    ? const Color(0xFF6A737D)
                    : const Color(0xFFADB5BD),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
