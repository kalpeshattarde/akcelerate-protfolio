import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

/// A class that contains all theme configurations for the nutrition tracking application.
/// Implements "Purposeful Health Minimalism" design with accessibility-first approach.
class AppTheme {
  AppTheme._();

  // Health & Fitness Color Palette - Accessible Health Clarity
  static const Color primaryBackgroundLight = Color(0xFFFDFCFB); // Ivory canvas
  static const Color primaryTextLight = Color(0xFF292D31); // Graphite
  static const Color calorieAccent = Color(0xFFFF9053); // Melon-orange
  static const Color waterAccent = Color(0xFF32C8FF); // Aqua
  static const Color successState = Color(0xFF4CAF50); // Success green
  static const Color warningState = Color(0xFFFF9800); // Amber warning
  static const Color errorState = Color(0xFFF44336); // Material red
  static const Color darkBackground = Color(0xFF121212); // Material dark
  static const Color darkAccent = Color(0xFFBB86FC); // Material purple
  static const Color neutralGray = Color(0xFF757575); // Secondary text

  // Light theme specific colors
  static const Color surfaceLight = Color(0xFFFDFCFB);
  static const Color cardLight = Color(0xFFF8F7F6);
  static const Color dividerLight = Color(0x1F292D31);
  static const Color shadowLight = Color(0x1A000000);

  // Dark theme specific colors
  static const Color surfaceDark = Color(0xFF1E1E1E);
  static const Color cardDark = Color(0xFF2D2D2D);
  static const Color dividerDark = Color(0x1FFFFFFF);
  static const Color shadowDark = Color(0x1FFFFFFF);
  static const Color primaryTextDark = Color(0xFFE1E3E6);

  // Text emphasis colors for accessibility
  static const Color textHighEmphasisLight = Color(0xFF292D31); // Primary text
  static const Color textMediumEmphasisLight = Color(0x99292D31); // 60% opacity
  static const Color textDisabledLight = Color(0x61292D31); // 38% opacity

  static const Color textHighEmphasisDark =
      Color(0xFFE1E3E6); // Primary dark text
  static const Color textMediumEmphasisDark = Color(0x99E1E3E6); // 60% opacity
  static const Color textDisabledDark = Color(0x61E1E3E6); // 38% opacity

  /// Light theme optimized for health and fitness tracking
  static ThemeData lightTheme = ThemeData(
    brightness: Brightness.light,
    colorScheme: ColorScheme(
      brightness: Brightness.light,
      primary: calorieAccent,
      onPrimary: Colors.white,
      primaryContainer: calorieAccent.withValues(alpha: 0.1),
      onPrimaryContainer: primaryTextLight,
      secondary: waterAccent,
      onSecondary: Colors.white,
      secondaryContainer: waterAccent.withValues(alpha: 0.1),
      onSecondaryContainer: primaryTextLight,
      tertiary: successState,
      onTertiary: Colors.white,
      tertiaryContainer: successState.withValues(alpha: 0.1),
      onTertiaryContainer: primaryTextLight,
      error: errorState,
      onError: Colors.white,
      surface: surfaceLight,
      onSurface: primaryTextLight,
      onSurfaceVariant: textMediumEmphasisLight,
      outline: neutralGray.withValues(alpha: 0.2),
      outlineVariant: neutralGray.withValues(alpha: 0.1),
      shadow: shadowLight,
      scrim: Colors.black54,
      inverseSurface: darkBackground,
      onInverseSurface: textHighEmphasisDark,
      inversePrimary: darkAccent,
    ),
    scaffoldBackgroundColor: primaryBackgroundLight,
    cardColor: cardLight,
    dividerColor: dividerLight,

    // AppBar theme for health app navigation
    appBarTheme: AppBarThemeData(
      backgroundColor: primaryBackgroundLight,
      foregroundColor: primaryTextLight,
      elevation: 0,
      scrolledUnderElevation: 2,
      shadowColor: shadowLight,
      surfaceTintColor: Colors.transparent,
      titleTextStyle: GoogleFonts.dmSans(
        fontSize: 20,
        fontWeight: FontWeight.w600,
        color: primaryTextLight,
      ),
      iconTheme: const IconThemeData(
        color: primaryTextLight,
        size: 24,
      ),
    ),

    // Card theme for food cards and progress widgets
    cardTheme: CardThemeData(
      color: cardLight,
      elevation: 2,
      shadowColor: shadowLight,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12), // Adaptive Food Cards radius
      ),
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
    ),

    // Bottom navigation for main app navigation
    bottomNavigationBarTheme: BottomNavigationBarThemeData(
      backgroundColor: surfaceLight,
      selectedItemColor: calorieAccent,
      unselectedItemColor: neutralGray,
      type: BottomNavigationBarType.fixed,
      elevation: 8,
      selectedLabelStyle: GoogleFonts.dmSans(
        fontSize: 12,
        fontWeight: FontWeight.w500,
      ),
      unselectedLabelStyle: GoogleFonts.dmSans(
        fontSize: 12,
        fontWeight: FontWeight.w400,
      ),
    ),

    // FAB theme for quick actions
    floatingActionButtonTheme: FloatingActionButtonThemeData(
      backgroundColor: waterAccent,
      foregroundColor: Colors.white,
      elevation: 6,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
      ),
    ),

    // Button themes for health app interactions
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        foregroundColor: Colors.white,
        backgroundColor: calorieAccent,
        elevation: 2,
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        textStyle: GoogleFonts.dmSans(
          fontSize: 15,
          fontWeight: FontWeight.w600,
        ),
      ),
    ),

    outlinedButtonTheme: OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        foregroundColor: calorieAccent,
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
        side: BorderSide(color: calorieAccent, width: 1.5),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        textStyle: GoogleFonts.dmSans(
          fontSize: 15,
          fontWeight: FontWeight.w500,
        ),
      ),
    ),

    textButtonTheme: TextButtonThemeData(
      style: TextButton.styleFrom(
        foregroundColor: calorieAccent,
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
        textStyle: GoogleFonts.dmSans(
          fontSize: 15,
          fontWeight: FontWeight.w500,
        ),
      ),
    ),

    // Typography theme using DM Sans
    textTheme: _buildTextTheme(isLight: true),

    // Input decoration for food logging forms
    inputDecorationTheme: InputDecorationThemeData(
      fillColor: surfaceLight,
      filled: true,
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: BorderSide(color: neutralGray.withValues(alpha: 0.2)),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: BorderSide(color: neutralGray.withValues(alpha: 0.2)),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: const BorderSide(color: calorieAccent, width: 2),
      ),
      errorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: const BorderSide(color: errorState, width: 1.5),
      ),
      focusedErrorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: const BorderSide(color: errorState, width: 2),
      ),
      labelStyle: GoogleFonts.dmSans(
        color: textMediumEmphasisLight,
        fontSize: 15,
        fontWeight: FontWeight.w400,
      ),
      hintStyle: GoogleFonts.dmSans(
        color: textDisabledLight,
        fontSize: 15,
        fontWeight: FontWeight.w400,
      ),
    ),

    // Switch theme for settings
    switchTheme: SwitchThemeData(
      thumbColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.selected)) {
          return calorieAccent;
        }
        return neutralGray;
      }),
      trackColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.selected)) {
          return calorieAccent.withValues(alpha: 0.3);
        }
        return neutralGray.withValues(alpha: 0.2);
      }),
    ),

    // Checkbox theme
    checkboxTheme: CheckboxThemeData(
      fillColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.selected)) {
          return calorieAccent;
        }
        return Colors.transparent;
      }),
      checkColor: WidgetStateProperty.all(Colors.white),
      side: BorderSide(color: neutralGray.withValues(alpha: 0.5), width: 1.5),
    ),

    // Radio theme
    radioTheme: RadioThemeData(
      fillColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.selected)) {
          return calorieAccent;
        }
        return neutralGray;
      }),
    ),

    // Progress indicator theme for macro tracking
    progressIndicatorTheme: const ProgressIndicatorThemeData(
      color: calorieAccent,
      linearTrackColor: Color(0x1FFF9053),
    ),

    // Slider theme for portion sizes
    sliderTheme: SliderThemeData(
      activeTrackColor: calorieAccent,
      thumbColor: calorieAccent,
      overlayColor: calorieAccent.withValues(alpha: 0.2),
      inactiveTrackColor: calorieAccent.withValues(alpha: 0.2),
      trackHeight: 4,
      thumbShape: const RoundSliderThumbShape(enabledThumbRadius: 8),
    ),

    // Tab bar theme for navigation
    tabBarTheme: TabBarThemeData(
      labelColor: calorieAccent,
      unselectedLabelColor: neutralGray,
      indicatorColor: calorieAccent,
      indicatorSize: TabBarIndicatorSize.label,
      labelStyle: GoogleFonts.dmSans(
        fontSize: 14,
        fontWeight: FontWeight.w600,
      ),
      unselectedLabelStyle: GoogleFonts.dmSans(
        fontSize: 14,
        fontWeight: FontWeight.w400,
      ),
    ),

    // Tooltip theme
    tooltipTheme: TooltipThemeData(
      decoration: BoxDecoration(
        color: primaryTextLight.withValues(alpha: 0.9),
        borderRadius: BorderRadius.circular(8),
      ),
      textStyle: GoogleFonts.dmSans(
        color: Colors.white,
        fontSize: 12,
        fontWeight: FontWeight.w400,
      ),
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
    ),

    // SnackBar theme for feedback
    snackBarTheme: SnackBarThemeData(
      backgroundColor: primaryTextLight,
      contentTextStyle: GoogleFonts.dmSans(
        color: Colors.white,
        fontSize: 14,
        fontWeight: FontWeight.w400,
      ),
      actionTextColor: waterAccent,
      behavior: SnackBarBehavior.floating,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
    ),
    dialogTheme: DialogThemeData(backgroundColor: surfaceLight),
  );

  /// Dark theme optimized for evening nutrition logging
  static ThemeData darkTheme = ThemeData(
    brightness: Brightness.dark,
    colorScheme: ColorScheme(
      brightness: Brightness.dark,
      primary: darkAccent,
      onPrimary: Colors.black,
      primaryContainer: darkAccent.withValues(alpha: 0.2),
      onPrimaryContainer: textHighEmphasisDark,
      secondary: waterAccent,
      onSecondary: Colors.black,
      secondaryContainer: waterAccent.withValues(alpha: 0.2),
      onSecondaryContainer: textHighEmphasisDark,
      tertiary: successState,
      onTertiary: Colors.white,
      tertiaryContainer: successState.withValues(alpha: 0.2),
      onTertiaryContainer: textHighEmphasisDark,
      error: errorState,
      onError: Colors.white,
      surface: surfaceDark,
      onSurface: textHighEmphasisDark,
      onSurfaceVariant: textMediumEmphasisDark,
      outline: neutralGray.withValues(alpha: 0.3),
      outlineVariant: neutralGray.withValues(alpha: 0.2),
      shadow: shadowDark,
      scrim: Colors.black87,
      inverseSurface: primaryBackgroundLight,
      onInverseSurface: primaryTextLight,
      inversePrimary: calorieAccent,
    ),
    scaffoldBackgroundColor: darkBackground,
    cardColor: cardDark,
    dividerColor: dividerDark,

    // AppBar theme for dark mode
    appBarTheme: AppBarThemeData(
      backgroundColor: darkBackground,
      foregroundColor: textHighEmphasisDark,
      elevation: 0,
      scrolledUnderElevation: 2,
      shadowColor: shadowDark,
      surfaceTintColor: Colors.transparent,
      titleTextStyle: GoogleFonts.dmSans(
        fontSize: 20,
        fontWeight: FontWeight.w600,
        color: textHighEmphasisDark,
      ),
      iconTheme: const IconThemeData(
        color: textHighEmphasisDark,
        size: 24,
      ),
    ),

    // Card theme for dark mode
    cardTheme: CardThemeData(
      color: cardDark,
      elevation: 2,
      shadowColor: shadowDark,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
    ),

    // Bottom navigation for dark mode
    bottomNavigationBarTheme: BottomNavigationBarThemeData(
      backgroundColor: surfaceDark,
      selectedItemColor: darkAccent,
      unselectedItemColor: neutralGray,
      type: BottomNavigationBarType.fixed,
      elevation: 8,
      selectedLabelStyle: GoogleFonts.dmSans(
        fontSize: 12,
        fontWeight: FontWeight.w500,
      ),
      unselectedLabelStyle: GoogleFonts.dmSans(
        fontSize: 12,
        fontWeight: FontWeight.w400,
      ),
    ),

    // FAB theme for dark mode
    floatingActionButtonTheme: FloatingActionButtonThemeData(
      backgroundColor: waterAccent,
      foregroundColor: Colors.black,
      elevation: 6,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
      ),
    ),

    // Button themes for dark mode
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        foregroundColor: Colors.black,
        backgroundColor: darkAccent,
        elevation: 2,
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        textStyle: GoogleFonts.dmSans(
          fontSize: 15,
          fontWeight: FontWeight.w600,
        ),
      ),
    ),

    outlinedButtonTheme: OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        foregroundColor: darkAccent,
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
        side: BorderSide(color: darkAccent, width: 1.5),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        textStyle: GoogleFonts.dmSans(
          fontSize: 15,
          fontWeight: FontWeight.w500,
        ),
      ),
    ),

    textButtonTheme: TextButtonThemeData(
      style: TextButton.styleFrom(
        foregroundColor: darkAccent,
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
        textStyle: GoogleFonts.dmSans(
          fontSize: 15,
          fontWeight: FontWeight.w500,
        ),
      ),
    ),

    // Typography theme for dark mode
    textTheme: _buildTextTheme(isLight: false),

    // Input decoration for dark mode
    inputDecorationTheme: InputDecorationThemeData(
      fillColor: surfaceDark,
      filled: true,
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: BorderSide(color: neutralGray.withValues(alpha: 0.3)),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: BorderSide(color: neutralGray.withValues(alpha: 0.3)),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: const BorderSide(color: darkAccent, width: 2),
      ),
      errorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: const BorderSide(color: errorState, width: 1.5),
      ),
      focusedErrorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: const BorderSide(color: errorState, width: 2),
      ),
      labelStyle: GoogleFonts.dmSans(
        color: textMediumEmphasisDark,
        fontSize: 15,
        fontWeight: FontWeight.w400,
      ),
      hintStyle: GoogleFonts.dmSans(
        color: textDisabledDark,
        fontSize: 15,
        fontWeight: FontWeight.w400,
      ),
    ),

    // Switch theme for dark mode
    switchTheme: SwitchThemeData(
      thumbColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.selected)) {
          return darkAccent;
        }
        return neutralGray;
      }),
      trackColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.selected)) {
          return darkAccent.withValues(alpha: 0.3);
        }
        return neutralGray.withValues(alpha: 0.2);
      }),
    ),

    // Checkbox theme for dark mode
    checkboxTheme: CheckboxThemeData(
      fillColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.selected)) {
          return darkAccent;
        }
        return Colors.transparent;
      }),
      checkColor: WidgetStateProperty.all(Colors.black),
      side: BorderSide(color: neutralGray.withValues(alpha: 0.5), width: 1.5),
    ),

    // Radio theme for dark mode
    radioTheme: RadioThemeData(
      fillColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.selected)) {
          return darkAccent;
        }
        return neutralGray;
      }),
    ),

    // Progress indicator theme for dark mode
    progressIndicatorTheme: const ProgressIndicatorThemeData(
      color: darkAccent,
      linearTrackColor: Color(0x1FBB86FC),
    ),

    // Slider theme for dark mode
    sliderTheme: SliderThemeData(
      activeTrackColor: darkAccent,
      thumbColor: darkAccent,
      overlayColor: darkAccent.withValues(alpha: 0.2),
      inactiveTrackColor: darkAccent.withValues(alpha: 0.2),
      trackHeight: 4,
      thumbShape: const RoundSliderThumbShape(enabledThumbRadius: 8),
    ),

    // Tab bar theme for dark mode
    tabBarTheme: TabBarThemeData(
      labelColor: darkAccent,
      unselectedLabelColor: neutralGray,
      indicatorColor: darkAccent,
      indicatorSize: TabBarIndicatorSize.label,
      labelStyle: GoogleFonts.dmSans(
        fontSize: 14,
        fontWeight: FontWeight.w600,
      ),
      unselectedLabelStyle: GoogleFonts.dmSans(
        fontSize: 14,
        fontWeight: FontWeight.w400,
      ),
    ),

    // Tooltip theme for dark mode
    tooltipTheme: TooltipThemeData(
      decoration: BoxDecoration(
        color: textHighEmphasisDark.withValues(alpha: 0.9),
        borderRadius: BorderRadius.circular(8),
      ),
      textStyle: GoogleFonts.dmSans(
        color: Colors.black,
        fontSize: 12,
        fontWeight: FontWeight.w400,
      ),
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
    ),

    // SnackBar theme for dark mode
    snackBarTheme: SnackBarThemeData(
      backgroundColor: textHighEmphasisDark,
      contentTextStyle: GoogleFonts.dmSans(
        color: Colors.black,
        fontSize: 14,
        fontWeight: FontWeight.w400,
      ),
      actionTextColor: waterAccent,
      behavior: SnackBarBehavior.floating,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
    ),
    dialogTheme: DialogThemeData(backgroundColor: surfaceDark),
  );

  /// Helper method to build text theme using DM Sans font family
  static TextTheme _buildTextTheme({required bool isLight}) {
    final Color textHighEmphasis =
        isLight ? textHighEmphasisLight : textHighEmphasisDark;
    final Color textMediumEmphasis =
        isLight ? textMediumEmphasisLight : textMediumEmphasisDark;
    final Color textDisabled = isLight ? textDisabledLight : textDisabledDark;

    return TextTheme(
      // Display styles for large headers
      displayLarge: GoogleFonts.dmSans(
        fontSize: 57,
        fontWeight: FontWeight.w700,
        color: textHighEmphasis,
        letterSpacing: -0.25,
      ),
      displayMedium: GoogleFonts.dmSans(
        fontSize: 45,
        fontWeight: FontWeight.w700,
        color: textHighEmphasis,
      ),
      displaySmall: GoogleFonts.dmSans(
        fontSize: 36,
        fontWeight: FontWeight.w700,
        color: textHighEmphasis,
      ),

      // Headline styles for section headers
      headlineLarge: GoogleFonts.dmSans(
        fontSize: 32,
        fontWeight: FontWeight.w700,
        color: textHighEmphasis,
      ),
      headlineMedium: GoogleFonts.dmSans(
        fontSize: 28,
        fontWeight: FontWeight.w600,
        color: textHighEmphasis,
      ),
      headlineSmall: GoogleFonts.dmSans(
        fontSize: 22, // Daily calorie goals and section headers
        fontWeight: FontWeight.w700,
        color: textHighEmphasis,
      ),

      // Title styles for cards and dialogs
      titleLarge: GoogleFonts.dmSans(
        fontSize: 20,
        fontWeight: FontWeight.w600,
        color: textHighEmphasis,
        letterSpacing: 0.15,
      ),
      titleMedium: GoogleFonts.dmSans(
        fontSize: 16,
        fontWeight: FontWeight.w600,
        color: textHighEmphasis,
        letterSpacing: 0.15,
      ),
      titleSmall: GoogleFonts.dmSans(
        fontSize: 14,
        fontWeight: FontWeight.w600,
        color: textHighEmphasis,
        letterSpacing: 0.1,
      ),

      // Body styles for main content
      bodyLarge: GoogleFonts.dmSans(
        fontSize: 15, // Food logging and macro descriptions
        fontWeight: FontWeight.w400,
        color: textHighEmphasis,
        letterSpacing: 0.5,
      ),
      bodyMedium: GoogleFonts.dmSans(
        fontSize: 15, // Consistent reading during food logging
        fontWeight: FontWeight.w500,
        color: textHighEmphasis,
        letterSpacing: 0.25,
      ),
      bodySmall: GoogleFonts.dmSans(
        fontSize: 12, // Food card details and nutritional information
        fontWeight: FontWeight.w400,
        color: textMediumEmphasis,
        letterSpacing: 0.4,
      ),

      // Label styles for buttons and form fields
      labelLarge: GoogleFonts.dmSans(
        fontSize: 14,
        fontWeight: FontWeight.w600, // Bold weights for numerical values
        color: textHighEmphasis,
        letterSpacing: 1.25,
      ),
      labelMedium: GoogleFonts.dmSans(
        fontSize: 12,
        fontWeight: FontWeight.w600, // Calorie counts and macro percentages
        color: textMediumEmphasis,
        letterSpacing: 0.4,
      ),
      labelSmall: GoogleFonts.dmSans(
        fontSize: 10,
        fontWeight: FontWeight.w700, // Data emphasis for quick scanning
        color: textDisabled,
        letterSpacing: 1.5,
      ),
    );
  }
}
