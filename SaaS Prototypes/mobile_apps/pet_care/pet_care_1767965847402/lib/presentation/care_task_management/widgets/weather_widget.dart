import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../widgets/custom_icon_widget.dart';

class WeatherWidget extends StatelessWidget {
  final Map<String, dynamic> weatherData;
  final List<String> outdoorRecommendations;

  const WeatherWidget({
    super.key,
    required this.weatherData,
    required this.outdoorRecommendations,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final temperature = weatherData['temperature'] as int;
    final condition = weatherData['condition'] as String;
    final iconName = weatherData['iconName'] as String;
    final humidity = weatherData['humidity'] as int;

    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            theme.brightness == Brightness.light
                ? const Color(0xFF2B5F75)
                : const Color(0xFF4A8BA3),
            theme.brightness == Brightness.light
                ? const Color(0xFF1E4A5F)
                : const Color(0xFF2B5F75),
          ],
        ),
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: theme.brightness == Brightness.light
                ? const Color(0x0A000000)
                : const Color(0x1A000000),
            blurRadius: 8,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        children: [
          _buildWeatherHeader(
              theme, temperature, condition, iconName, humidity),
          if (outdoorRecommendations.isNotEmpty) ...[
            SizedBox(height: 2.h),
            _buildRecommendations(theme),
          ],
        ],
      ),
    );
  }

  Widget _buildWeatherHeader(ThemeData theme, int temperature, String condition,
      String iconName, int humidity) {
    return Row(
      children: [
        Container(
          width: 16.w,
          height: 8.h,
          decoration: BoxDecoration(
            color: Colors.white.withValues(alpha: 0.2),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Center(
            child: CustomIconWidget(
              iconName: iconName,
              color: Colors.white,
              size: 32,
            ),
          ),
        ),
        SizedBox(width: 4.w),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Text(
                    '${temperature}°F',
                    style: theme.textTheme.headlineSmall?.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  SizedBox(width: 2.w),
                  Container(
                    padding:
                        EdgeInsets.symmetric(horizontal: 2.w, vertical: 0.5.h),
                    decoration: BoxDecoration(
                      color: Colors.white.withValues(alpha: 0.2),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      '${humidity}%',
                      style: theme.textTheme.labelSmall?.copyWith(
                        color: Colors.white,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                ],
              ),
              SizedBox(height: 0.5.h),
              Text(
                condition,
                style: theme.textTheme.bodyMedium?.copyWith(
                  color: Colors.white.withValues(alpha: 0.9),
                  fontWeight: FontWeight.w400,
                ),
                overflow: TextOverflow.ellipsis,
              ),
            ],
          ),
        ),
        Container(
          padding: EdgeInsets.all(2.w),
          decoration: BoxDecoration(
            color: Colors.white.withValues(alpha: 0.2),
            borderRadius: BorderRadius.circular(8),
          ),
          child: CustomIconWidget(
            iconName: 'refresh',
            color: Colors.white,
            size: 20,
          ),
        ),
      ],
    );
  }

  Widget _buildRecommendations(ThemeData theme) {
    return Container(
      padding: EdgeInsets.all(3.w),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: Colors.white.withValues(alpha: 0.2),
          width: 1,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              CustomIconWidget(
                iconName: 'lightbulb',
                color: const Color(0xFFE8A547),
                size: 16,
              ),
              SizedBox(width: 2.w),
              Text(
                'Outdoor Activity Tips',
                style: theme.textTheme.labelMedium?.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
          SizedBox(height: 1.h),
          ...outdoorRecommendations
              .map((recommendation) => Padding(
                    padding: EdgeInsets.only(bottom: 0.5.h),
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          width: 1.w,
                          height: 1.w,
                          margin: EdgeInsets.only(top: 1.h, right: 2.w),
                          decoration: BoxDecoration(
                            color: Colors.white.withValues(alpha: 0.7),
                            borderRadius: BorderRadius.circular(0.5.w),
                          ),
                        ),
                        Expanded(
                          child: Text(
                            recommendation,
                            style: theme.textTheme.bodySmall?.copyWith(
                              color: Colors.white.withValues(alpha: 0.9),
                              height: 1.4,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ))
              .toList(),
        ],
      ),
    );
  }
}
