import 'package:flutter/material.dart';

/// Centralized design constants for consistent UI across all service cards and recommendation boxes
class ServiceCardDesign {
  ServiceCardDesign._();

  // WCAG Compliant Color Palette with Soft Gradients
  static const Map<String, List<Color>> serviceColors = {
    'cleaning': [
      Color(0xFF059669), // Emerald-600 (Primary)
      Color(0xFF047857), // Emerald-700 (Secondary)
    ],
    'plumbing': [
      Color(0xFF0284C7), // Sky-600 (Primary)
      Color(0xFF0369A1), // Sky-700 (Secondary)
    ],
    'electrical': [
      Color(0xFFDC2626), // Red-600 (Primary - for electrical safety)
      Color(0xFFB91C1C), // Red-700 (Secondary)
    ],
    'handyman': [
      Color(0xFF7C3AED), // Violet-600 (Primary)
      Color(0xFF6D28D9), // Violet-700 (Secondary)
    ],
    'beauty': [
      Color(0xFFDB2777), // Pink-600 (Primary)
      Color(0xFFBE185D), // Pink-700 (Secondary)
    ],
    'appliance': [
      Color(0xFF0891B2), // Cyan-600 (Primary)
      Color(0xFF0E7490), // Cyan-700 (Secondary)
    ],
    'weather': [
      Color(0xFFD97706), // Amber-600 (Primary - Warm Amber)
      Color(0xFFB45309), // Amber-700 (Secondary)
    ],
  };

  // Consistent Design Tokens
  static const double cornerRadius = 16.0;
  static const double shadowBlurRadius = 12.0;
  static const double shadowOpacity = 0.15;
  static const Offset shadowOffset = Offset(0, 4);

  // Uniform Padding and Spacing (using percentages from sizer)
  static const double cardPadding = 4.0; // 4.w
  static const double cardMargin = 2.0; // 2.h
  static const double innerSpacing = 2.0; // 2.h
  static const double buttonSpacing = 2.0; // 2.w

  // Button Design Consistency
  static const double buttonHeight = 44.0; // Minimum touch target (WCAG)
  static const double buttonBorderRadius = 8.0;
  static const EdgeInsets buttonPadding = EdgeInsets.symmetric(
    horizontal: 16.0,
    vertical: 12.0,
  );

  // Typography Scale for Consistent Text Hierarchy
  static const double titleFontSize = 16.0;
  static const double bodyFontSize = 14.0;
  static const double captionFontSize = 12.0;
  static const double buttonFontSize = 14.0;

  // Icon Sizing for Visual Consistency
  static const double primaryIconSize = 24.0; // 6.w
  static const double secondaryIconSize = 16.0; // 4.w
  static const double smallIconSize = 12.0; // 3.w

  /// Get gradient colors for a service category with fallback
  static List<Color> getServiceGradient(String category) {
    final normalizedCategory = category.toLowerCase();
    return serviceColors[normalizedCategory] ?? serviceColors['cleaning']!;
  }

  /// Get primary color for a service category
  static Color getServicePrimaryColor(String category) {
    return getServiceGradient(category)[0];
  }

  /// Generate consistent box shadow with category-based color
  static List<BoxShadow> generateCardShadow(String category) {
    final primaryColor = getServicePrimaryColor(category);
    return [
      BoxShadow(
        color: primaryColor.withOpacity(shadowOpacity),
        blurRadius: shadowBlurRadius,
        offset: shadowOffset,
      ),
    ];
  }

  /// Generate consistent linear gradient for cards
  static LinearGradient generateCardGradient(String category) {
    final colors = getServiceGradient(category);
    return LinearGradient(
      begin: Alignment.topLeft,
      end: Alignment.bottomRight,
      colors: [
        colors[0], // Primary color
        colors[1].withAlpha(230), // Secondary with slight transparency
      ],
    );
  }

  /// Consistent decoration for all service cards
  static BoxDecoration generateCardDecoration(String category) {
    return BoxDecoration(
      gradient: generateCardGradient(category),
      borderRadius: BorderRadius.circular(cornerRadius),
      boxShadow: generateCardShadow(category),
    );
  }

  /// Consistent button decoration
  static BoxDecoration generateButtonDecoration({
    required Color backgroundColor,
    double opacity = 0.9,
  }) {
    return BoxDecoration(
      color: backgroundColor.withOpacity(opacity),
      borderRadius: BorderRadius.circular(buttonBorderRadius),
      border: Border.all(color: backgroundColor.withAlpha(128), width: 1.5),
      boxShadow: [
        BoxShadow(
          color: backgroundColor.withAlpha(51),
          blurRadius: 4,
          offset: const Offset(0, 2),
        ),
      ],
    );
  }

  /// WCAG AA Compliant Text Colors
  static Color getContrastingTextColor(String category) {
    // All our gradient colors are dark enough to use white text for WCAG AA compliance
    return Colors.white;
  }

  static Color getSecondaryTextColor(String category) {
    return Colors.white.withAlpha(230);
  }

  static Color getTertiaryTextColor(String category) {
    return Colors.white.withAlpha(179);
  }

  /// Get high contrast button background color for better visibility
  static Color getHighContrastButtonColor(String category) {
    final serviceColor = getServicePrimaryColor(category);

    // Create a darker variant for better contrast on light backgrounds
    final hsl = HSLColor.fromColor(serviceColor);
    return hsl.withLightness(0.25).withSaturation(0.8).toColor();
  }

  /// Get button text color that contrasts well with button background
  static Color getButtonTextColor(String category) {
    return Colors.white;
  }

  /// Get dark text color for light button backgrounds (high contrast)
  static Color getLightButtonTextColor(String category) {
    // Return pure black for maximum contrast and visibility on light button backgrounds
    return const Color(
        0xFF000000); // Pure black for maximum visibility and contrast
  }

  /// Universal gradient application for any widget
  /// Use this method to apply consistent gradients to any container
  static BoxDecoration generateUniversalGradientDecoration({
    required String category,
    double? customRadius,
    bool includeShadow = true,
  }) {
    return BoxDecoration(
      gradient: generateCardGradient(category),
      borderRadius: BorderRadius.circular(customRadius ?? cornerRadius),
      boxShadow: includeShadow ? generateCardShadow(category) : null,
    );
  }

  /// Generate gradient for floating action buttons and special elements
  static BoxDecoration generateFABGradientDecoration(String category) {
    return BoxDecoration(
      gradient: generateCardGradient(category),
      shape: BoxShape.circle,
      boxShadow: [
        BoxShadow(
          color: getServicePrimaryColor(category).withAlpha(77),
          blurRadius: 8,
          offset: const Offset(0, 4),
        ),
      ],
    );
  }

  /// Generate subtle gradient overlay for backgrounds
  static BoxDecoration generateSubtleBackgroundGradient(String category) {
    final colors = getServiceGradient(category);
    return BoxDecoration(
      gradient: LinearGradient(
        begin: Alignment.topCenter,
        end: Alignment.bottomCenter,
        colors: [
          colors[0].withAlpha(13), // Very subtle primary
          colors[1].withAlpha(26), // Slightly more visible secondary
        ],
      ),
    );
  }
}
