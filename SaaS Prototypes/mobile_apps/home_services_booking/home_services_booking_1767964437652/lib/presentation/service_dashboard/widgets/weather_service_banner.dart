import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../core/design_constants.dart';
import '../../../widgets/custom_icon_widget.dart';

class WeatherServiceBanner extends StatefulWidget {
  final Map<String, dynamic> weatherData;
  final List<Map<String, dynamic>> recommendedServices;
  final VoidCallback? onServiceTap;

  const WeatherServiceBanner({
    super.key,
    required this.weatherData,
    required this.recommendedServices,
    this.onServiceTap,
  });

  @override
  State<WeatherServiceBanner> createState() => _WeatherServiceBannerState();
}

class _WeatherServiceBannerState extends State<WeatherServiceBanner>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _slideAnimation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
        duration: const Duration(milliseconds: 800), vsync: this);
    _slideAnimation = Tween<double>(begin: -1.0, end: 0.0).animate(
        CurvedAnimation(
            parent: _animationController, curve: Curves.easeOutCubic));

    _animationController.forward();
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  String _getWeatherIcon(String condition) {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return 'wb_sunny';
      case 'rainy':
      case 'drizzle':
        return 'water_drop';
      case 'cloudy':
      case 'overcast':
        return 'cloud';
      case 'snowy':
        return 'ac_unit';
      default:
        return 'wb_sunny';
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    if (widget.recommendedServices.isEmpty) {
      return const SizedBox.shrink();
    }

    return AnimatedBuilder(
        animation: _slideAnimation,
        builder: (context, child) {
          return Transform.translate(
              offset: Offset(_slideAnimation.value * 100.w, 0),
              child: Container(
                  margin: EdgeInsets.symmetric(
                      horizontal: ServiceCardDesign.cardPadding.w,
                      vertical: ServiceCardDesign.cardMargin.h),
                  decoration:
                      ServiceCardDesign.generateCardDecoration('weather'),
                  child: Padding(
                      padding: EdgeInsets.all(ServiceCardDesign.cardPadding.w),
                      child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            // Weather info header
                            Row(children: [
                              CustomIconWidget(
                                  iconName: _getWeatherIcon(widget
                                      .weatherData['condition'] as String),
                                  color:
                                      ServiceCardDesign.getContrastingTextColor(
                                          'weather'),
                                  size: ServiceCardDesign.primaryIconSize),
                              SizedBox(width: 3.w),
                              Expanded(
                                  child: Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                    Text('Weather-Based Recommendations',
                                        style: theme.textTheme.titleMedium
                                            ?.copyWith(
                                                color: ServiceCardDesign
                                                    .getContrastingTextColor(
                                                        'weather'),
                                                fontWeight: FontWeight.w600,
                                                fontSize: ServiceCardDesign
                                                    .titleFontSize)),
                                    SizedBox(height: 0.5.h),
                                    Text(
                                        '${widget.weatherData['temperature']}° • ${widget.weatherData['condition']}',
                                        style: theme.textTheme.bodySmall
                                            ?.copyWith(
                                                color: ServiceCardDesign
                                                    .getSecondaryTextColor(
                                                        'weather'),
                                                fontSize: ServiceCardDesign
                                                    .bodyFontSize)),
                                  ])),
                              Container(
                                  padding: ServiceCardDesign.buttonPadding
                                      .copyWith(),
                                  decoration: ServiceCardDesign
                                      .generateButtonDecoration(
                                          backgroundColor: Colors.white),
                                  child: Text('Today',
                                      style: theme.textTheme.labelSmall
                                          ?.copyWith(
                                              color: ServiceCardDesign
                                                  .getContrastingTextColor(
                                                      'weather'),
                                              fontWeight: FontWeight.w600,
                                              fontSize: ServiceCardDesign
                                                  .captionFontSize))),
                            ]),
                            SizedBox(height: ServiceCardDesign.innerSpacing.h),

                            // Weather recommendation text
                            Text(widget.weatherData['recommendation'] as String,
                                style: theme.textTheme.bodyMedium?.copyWith(
                                    color:
                                        ServiceCardDesign.getSecondaryTextColor(
                                            'weather'),
                                    fontSize: ServiceCardDesign.bodyFontSize,
                                    height: 1.4)),

                            SizedBox(
                                height: ServiceCardDesign.innerSpacing.h * 0.5),
                          ]))));
        });
  }
}
