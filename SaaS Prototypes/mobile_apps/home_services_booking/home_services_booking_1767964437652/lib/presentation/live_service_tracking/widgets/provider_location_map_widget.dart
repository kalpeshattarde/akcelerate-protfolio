import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../widgets/custom_icon_widget.dart';

class ProviderLocationMapWidget extends StatefulWidget {
  final Map<String, dynamic> providerData;
  final Map<String, dynamic> locationData;
  final VoidCallback? onMapTap;

  const ProviderLocationMapWidget({
    super.key,
    required this.providerData,
    required this.locationData,
    this.onMapTap,
  });

  @override
  State<ProviderLocationMapWidget> createState() =>
      _ProviderLocationMapWidgetState();
}

class _ProviderLocationMapWidgetState extends State<ProviderLocationMapWidget>
    with TickerProviderStateMixin {
  late AnimationController _pulseController;
  late AnimationController _rippleController;
  late Animation<double> _pulseAnimation;
  late Animation<double> _rippleAnimation;

  @override
  void initState() {
    super.initState();
    _pulseController = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    );
    _rippleController = AnimationController(
      duration: const Duration(milliseconds: 2000),
      vsync: this,
    );

    _pulseAnimation = Tween<double>(
      begin: 1.0,
      end: 1.3,
    ).animate(CurvedAnimation(
      parent: _pulseController,
      curve: Curves.easeInOut,
    ));

    _rippleAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _rippleController,
      curve: Curves.easeOut,
    ));

    _startAnimations();
  }

  void _startAnimations() {
    _pulseController.repeat(reverse: true);
    _rippleController.repeat();
  }

  @override
  void dispose() {
    _pulseController.dispose();
    _rippleController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Container(
      width: double.infinity,
      height: 40.h,
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
      child: ClipRRect(
        borderRadius: BorderRadius.circular(4.w),
        child: Stack(
          children: [
            _buildMapContainer(context),
            _buildMapOverlay(context),
            _buildLocationInfo(context),
          ],
        ),
      ),
    );
  }

  Widget _buildMapContainer(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Container(
      width: double.infinity,
      height: double.infinity,
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            colorScheme.primary.withValues(alpha: 0.1),
            colorScheme.secondary.withValues(alpha: 0.1),
          ],
        ),
      ),
      child: Stack(
        children: [
          // Map placeholder with grid pattern
          CustomPaint(
            size: Size(double.infinity, double.infinity),
            painter:
                _MapGridPainter(colorScheme.outline.withValues(alpha: 0.2)),
          ),
          // Provider location marker
          Positioned(
            left: 60.w,
            top: 15.h,
            child: _buildProviderMarker(context),
          ),
          // User location marker
          Positioned(
            left: 20.w,
            top: 25.h,
            child: _buildUserMarker(context),
          ),
          // Route line
          CustomPaint(
            size: Size(double.infinity, double.infinity),
            painter: _RoutePainter(colorScheme.primary),
          ),
        ],
      ),
    );
  }

  Widget _buildProviderMarker(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return AnimatedBuilder(
      animation: _pulseAnimation,
      builder: (context, child) {
        return Stack(
          alignment: Alignment.center,
          children: [
            // Ripple effect
            AnimatedBuilder(
              animation: _rippleAnimation,
              builder: (context, child) {
                return Container(
                  width: 15.w * _rippleAnimation.value,
                  height: 15.w * _rippleAnimation.value,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: colorScheme.primary.withValues(
                        alpha: 0.3 * (1 - _rippleAnimation.value),
                      ),
                      width: 2,
                    ),
                  ),
                );
              },
            ),
            // Provider marker
            Transform.scale(
              scale: _pulseAnimation.value,
              child: Container(
                width: 12.w,
                height: 12.w,
                decoration: BoxDecoration(
                  color: colorScheme.primary,
                  shape: BoxShape.circle,
                  border: Border.all(
                    color: Colors.white,
                    width: 3,
                  ),
                  boxShadow: [
                    BoxShadow(
                      color: colorScheme.shadow.withValues(alpha: 0.3),
                      blurRadius: 8,
                      offset: const Offset(0, 2),
                    ),
                  ],
                ),
                child: Center(
                  child: CustomIconWidget(
                    iconName: 'person',
                    color: Colors.white,
                    size: 6.w,
                  ),
                ),
              ),
            ),
          ],
        );
      },
    );
  }

  Widget _buildUserMarker(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Container(
      width: 10.w,
      height: 10.w,
      decoration: BoxDecoration(
        color: colorScheme.secondary,
        shape: BoxShape.circle,
        border: Border.all(
          color: Colors.white,
          width: 3,
        ),
        boxShadow: [
          BoxShadow(
            color: colorScheme.shadow.withValues(alpha: 0.3),
            blurRadius: 6,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Center(
        child: CustomIconWidget(
          iconName: 'home',
          color: Colors.white,
          size: 5.w,
        ),
      ),
    );
  }

  Widget _buildMapOverlay(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Positioned(
      top: 2.h,
      right: 2.w,
      child: Column(
        children: [
          _buildMapButton(
            context,
            'my_location',
            'Center on me',
            () => _centerOnUser(),
          ),
          SizedBox(height: 1.h),
          _buildMapButton(
            context,
            'zoom_in',
            'Zoom in',
            () => _zoomIn(),
          ),
          SizedBox(height: 1.h),
          _buildMapButton(
            context,
            'zoom_out',
            'Zoom out',
            () => _zoomOut(),
          ),
        ],
      ),
    );
  }

  Widget _buildMapButton(
    BuildContext context,
    String iconName,
    String tooltip,
    VoidCallback onTap,
  ) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Tooltip(
      message: tooltip,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(2.w),
        child: Container(
          width: 10.w,
          height: 10.w,
          decoration: BoxDecoration(
            color: colorScheme.surface.withValues(alpha: 0.9),
            borderRadius: BorderRadius.circular(2.w),
            boxShadow: [
              BoxShadow(
                color: colorScheme.shadow.withValues(alpha: 0.2),
                blurRadius: 4,
                offset: const Offset(0, 2),
              ),
            ],
          ),
          child: Center(
            child: CustomIconWidget(
              iconName: iconName,
              color: colorScheme.onSurface,
              size: 5.w,
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildLocationInfo(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    final estimatedArrival =
        widget.locationData['estimatedArrival'] as String? ?? '12 minutes';
    final distance = widget.locationData['distance'] as String? ?? '2.3 km';

    return Positioned(
      bottom: 0,
      left: 0,
      right: 0,
      child: Container(
        padding: EdgeInsets.all(4.w),
        decoration: BoxDecoration(
          color: colorScheme.surface.withValues(alpha: 0.95),
          borderRadius: BorderRadius.only(
            bottomLeft: Radius.circular(4.w),
            bottomRight: Radius.circular(4.w),
          ),
          border: Border(
            top: BorderSide(
              color: colorScheme.outline.withValues(alpha: 0.2),
              width: 1,
            ),
          ),
        ),
        child: Row(
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    'Estimated Arrival',
                    style: theme.textTheme.bodySmall?.copyWith(
                      color: colorScheme.onSurfaceVariant,
                    ),
                  ),
                  Text(
                    estimatedArrival,
                    style: theme.textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w600,
                      color: colorScheme.primary,
                    ),
                  ),
                ],
              ),
            ),
            Container(
              width: 1,
              height: 6.h,
              color: colorScheme.outline.withValues(alpha: 0.3),
            ),
            SizedBox(width: 4.w),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    'Distance',
                    style: theme.textTheme.bodySmall?.copyWith(
                      color: colorScheme.onSurfaceVariant,
                    ),
                  ),
                  Text(
                    distance,
                    style: theme.textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w600,
                      color: colorScheme.onSurface,
                    ),
                  ),
                ],
              ),
            ),
            InkWell(
              onTap: widget.onMapTap,
              borderRadius: BorderRadius.circular(2.w),
              child: Container(
                padding: EdgeInsets.all(2.w),
                decoration: BoxDecoration(
                  color: colorScheme.primary.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(2.w),
                ),
                child: CustomIconWidget(
                  iconName: 'fullscreen',
                  color: colorScheme.primary,
                  size: 6.w,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _centerOnUser() {
    // Center map on user location
  }

  void _zoomIn() {
    // Zoom in on map
  }

  void _zoomOut() {
    // Zoom out on map
  }
}

class _MapGridPainter extends CustomPainter {
  final Color gridColor;

  _MapGridPainter(this.gridColor);

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = gridColor
      ..strokeWidth = 1;

    const gridSize = 20.0;

    // Draw vertical lines
    for (double x = 0; x < size.width; x += gridSize) {
      canvas.drawLine(
        Offset(x, 0),
        Offset(x, size.height),
        paint,
      );
    }

    // Draw horizontal lines
    for (double y = 0; y < size.height; y += gridSize) {
      canvas.drawLine(
        Offset(0, y),
        Offset(size.width, y),
        paint,
      );
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _RoutePainter extends CustomPainter {
  final Color routeColor;

  _RoutePainter(this.routeColor);

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = routeColor.withValues(alpha: 0.6)
      ..strokeWidth = 3
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    final path = Path();

    // Start from user location (20% width, 25% height)
    final startX = size.width * 0.2;
    final startY = size.height * 0.25;

    // End at provider location (60% width, 15% height)
    final endX = size.width * 0.6;
    final endY = size.height * 0.15;

    path.moveTo(startX, startY);

    // Create curved path
    final controlX1 = startX + (endX - startX) * 0.3;
    final controlY1 = startY - 50;
    final controlX2 = startX + (endX - startX) * 0.7;
    final controlY2 = endY - 30;

    path.cubicTo(controlX1, controlY1, controlX2, controlY2, endX, endY);

    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
