import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

/// A class that contains all theme configurations for the application.
class AppTheme {
  AppTheme._();

  // Fresh Wellness Color Palette - Soft whites, mint greens, sage and aqua gradients
  static const Color primaryLight = Color(0xFF7BB377); // Fresh mint green
  static const Color primaryVariantLight = Color(0xFF6FA66B); // Medium mint
  static const Color secondaryLight = Color(0xFF9ABEA7); // Sage green
  static const Color secondaryVariantLight = Color(0xFFB8D4C3); // Light sage
  static const Color backgroundLight = Color(0xFFFFFFFE); // Pure white
  static const Color surfaceLight =
      Color(0xFFFAFCFB); // Off-white with mint tint
  static const Color errorLight = Color(0xFFE8A598); // Soft rose
  static const Color successLight = Color(0xFF7BB377); // Fresh mint
  static const Color warningLight = Color(0xFFF2CC8F); // Warm cream
  static const Color accentLight = Color(0xFFE8F5E8); // Very light mint
  static const Color aquaAccent = Color(0xFFB8E6E6); // Soft aqua
  static const Color onPrimaryLight = Color(0xFFFFFFFE);
  static const Color onSecondaryLight = Color(0xFF2A342A);
  static const Color onBackgroundLight = Color(0xFF1C261C); // Deep forest
  static const Color onSurfaceLight = Color(0xFF1C261C);
  static const Color onErrorLight = Color(0xFFFFFFFE);

  // Dark theme colors (maintaining wellness aesthetic)
  static const Color primaryDark = Color(0xFF8FC285); // Brighter mint for dark
  static const Color primaryVariantDark = Color(0xFF7BB377);
  static const Color secondaryDark = Color(0xFFA8C4A2); // Sage for dark
  static const Color secondaryVariantDark = Color(0xFF9ABEA7);
  static const Color backgroundDark = Color(0xFF0F1710); // Very dark green
  static const Color surfaceDark = Color(0xFF1A201A); // Dark surface
  static const Color errorDark = Color(0xFFE8A598); // Soft rose
  static const Color successDark = Color(0xFF8FC285); // Bright mint
  static const Color warningDark = Color(0xFFF2CC8F); // Warm cream
  static const Color accentDark = Color(0xFF1E261E); // Dark mint
  static const Color aquaAccentDark = Color(0xFF2A403F); // Dark aqua
  static const Color onPrimaryDark = Color(0xFF0F1710);
  static const Color onSecondaryDark = Color(0xFF0F1710);
  static const Color onBackgroundDark = Color(0xFFFAFCFB);
  static const Color onSurfaceDark = Color(0xFFFAFCFB);
  static const Color onErrorDark = Color(0xFF0F1710);

  // Card and dialog colors with mint tint
  static const Color cardLight = Color(0xFFFAFCFB);
  static const Color cardDark = Color(0xFF1A201A);
  static const Color dialogLight = Color(0xFFFFFFFE);
  static const Color dialogDark = Color(0xFF1E261E);

  // Shadow colors (soft and airy)
  static const Color shadowLight = Color(0x0A7BB377); // Very soft mint shadow
  static const Color shadowDark = Color(0x0FFAFCFB);

  // Divider colors (subtle)
  static const Color dividerLight = Color(0xFFE8F5E8);
  static const Color dividerDark = Color(0xFF1E261E);

  // Text colors (gentle contrast)
  static const Color textPrimaryLight = Color(0xFF1C261C); // Deep forest
  static const Color textSecondaryLight = Color(0xFF6B7866); // Soft gray-green
  static const Color textDisabledLight = Color(0xFF9ABEA7); // Light sage

  static const Color textPrimaryDark = Color(0xFFFAFCFB);
  static const Color textSecondaryDark = Color(0xFFE8F5E8);
  static const Color textDisabledDark = Color(0xFF8FC285);

  /// Light theme with fresh wellness aesthetic
  static ThemeData lightTheme = ThemeData(
    brightness: Brightness.light,
    colorScheme: ColorScheme(
      brightness: Brightness.light,
      primary: primaryLight,
      onPrimary: onPrimaryLight,
      primaryContainer: accentLight,
      onPrimaryContainer: textPrimaryLight,
      secondary: secondaryLight,
      onSecondary: onSecondaryLight,
      secondaryContainer: secondaryVariantLight,
      onSecondaryContainer: textPrimaryLight,
      tertiary: aquaAccent,
      onTertiary: textPrimaryLight,
      tertiaryContainer: aquaAccent,
      onTertiaryContainer: textPrimaryLight,
      error: errorLight,
      onError: onErrorLight,
      surface: surfaceLight,
      onSurface: onSurfaceLight,
      onSurfaceVariant: textSecondaryLight,
      outline: dividerLight,
      outlineVariant: dividerLight,
      shadow: shadowLight,
      scrim: shadowLight,
      inverseSurface: surfaceDark,
      onInverseSurface: onSurfaceDark,
      inversePrimary: primaryDark,
    ),
    scaffoldBackgroundColor: backgroundLight,
    cardColor: cardLight,
    dividerColor: dividerLight,
    appBarTheme: AppBarThemeData(
      backgroundColor: backgroundLight,
      foregroundColor: textPrimaryLight,
      elevation: 0,
      shadowColor: Colors.transparent,
      surfaceTintColor: Colors.transparent,
      titleTextStyle: GoogleFonts.inter(
        fontSize: 20,
        fontWeight: FontWeight.w300, // Light weight for calmness
        color: textPrimaryLight,
        letterSpacing: 0.5,
      ),
      iconTheme: const IconThemeData(
        color: textPrimaryLight,
        size: 24,
      ),
    ),
    cardTheme: CardThemeData(
      color: cardLight,
      elevation: 3.0, // Subtle elevation for airy feel
      shadowColor: shadowLight,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20.0), // Smooth rounded corners
      ),
      margin: const EdgeInsets.all(8.0),
    ),
    bottomNavigationBarTheme: BottomNavigationBarThemeData(
      backgroundColor: surfaceLight,
      selectedItemColor: primaryLight,
      unselectedItemColor: textSecondaryLight,
      elevation: 8.0, // Gentle shadow
      type: BottomNavigationBarType.fixed,
      selectedLabelStyle: GoogleFonts.inter(
        fontSize: 12,
        fontWeight: FontWeight.w400, // Light weight
      ),
      unselectedLabelStyle: GoogleFonts.inter(
        fontSize: 12,
        fontWeight: FontWeight.w300, // Ultra-light
      ),
    ),
    floatingActionButtonTheme: FloatingActionButtonThemeData(
      backgroundColor: primaryLight,
      foregroundColor: onPrimaryLight,
      elevation: 6.0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20.0), // Smooth rounded
      ),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        foregroundColor: onPrimaryLight,
        backgroundColor: primaryLight,
        padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
        elevation: 4.0,
        shadowColor: shadowLight,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16.0), // Smooth rounded corners
        ),
        textStyle: GoogleFonts.inter(
          fontSize: 14,
          fontWeight: FontWeight.w400, // Medium for clarity
          letterSpacing: 0.5,
        ),
      ),
    ),
    outlinedButtonTheme: OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        foregroundColor: primaryLight,
        padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
        side: BorderSide(color: primaryLight.withValues(alpha: 0.5), width: 1),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16.0),
        ),
        textStyle: GoogleFonts.inter(
          fontSize: 14,
          fontWeight: FontWeight.w400,
          letterSpacing: 0.5,
        ),
      ),
    ),
    textButtonTheme: TextButtonThemeData(
      style: TextButton.styleFrom(
        foregroundColor: primaryLight,
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12.0),
        ),
        textStyle: GoogleFonts.inter(
          fontSize: 14,
          fontWeight: FontWeight.w400,
          letterSpacing: 0.5,
        ),
      ),
    ),
    textTheme: _buildTextTheme(isLight: true),
    inputDecorationTheme: InputDecorationThemeData(
      fillColor: accentLight,
      filled: true,
      contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(16.0), // Smooth rounded
        borderSide: BorderSide.none,
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(16.0),
        borderSide: BorderSide.none,
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(16.0),
        borderSide: const BorderSide(color: primaryLight, width: 2),
      ),
      errorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(16.0),
        borderSide: const BorderSide(color: errorLight, width: 1),
      ),
      focusedErrorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(16.0),
        borderSide: const BorderSide(color: errorLight, width: 2),
      ),
      labelStyle: GoogleFonts.inter(
        color: textSecondaryLight,
        fontSize: 14,
        fontWeight: FontWeight.w300, // Light weight
      ),
      hintStyle: GoogleFonts.inter(
        color: textDisabledLight,
        fontSize: 14,
        fontWeight: FontWeight.w300,
      ),
      errorStyle: GoogleFonts.inter(
        color: errorLight,
        fontSize: 12,
        fontWeight: FontWeight.w300,
      ),
    ),
    switchTheme: SwitchThemeData(
      thumbColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.selected)) {
          return primaryLight;
        }
        return accentLight;
      }),
      trackColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.selected)) {
          return primaryLight.withValues(alpha: 0.3);
        }
        return dividerLight;
      }),
    ),
    checkboxTheme: CheckboxThemeData(
      fillColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.selected)) {
          return primaryLight;
        }
        return Colors.transparent;
      }),
      checkColor: WidgetStateProperty.all(onPrimaryLight),
      side: BorderSide(color: dividerLight.withValues(alpha: 0.5), width: 1),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(6.0), // Smooth rounded
      ),
    ),
    radioTheme: RadioThemeData(
      fillColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.selected)) {
          return primaryLight;
        }
        return dividerLight;
      }),
    ),
    progressIndicatorTheme: const ProgressIndicatorThemeData(
      color: primaryLight,
      linearTrackColor: accentLight,
      circularTrackColor: accentLight,
    ),
    sliderTheme: SliderThemeData(
      activeTrackColor: primaryLight,
      thumbColor: primaryLight,
      overlayColor: primaryLight.withValues(alpha: 0.1),
      inactiveTrackColor: accentLight,
      trackHeight: 4.0,
    ),
    tabBarTheme: TabBarThemeData(
      labelColor: primaryLight,
      unselectedLabelColor: textSecondaryLight,
      indicatorColor: primaryLight,
      indicatorSize: TabBarIndicatorSize.label,
      labelStyle: GoogleFonts.inter(
        fontSize: 14,
        fontWeight: FontWeight.w400,
      ),
      unselectedLabelStyle: GoogleFonts.inter(
        fontSize: 14,
        fontWeight: FontWeight.w300,
      ),
    ),
    tooltipTheme: TooltipThemeData(
      decoration: BoxDecoration(
        color: textPrimaryLight.withValues(alpha: 0.9),
        borderRadius: BorderRadius.circular(12.0),
      ),
      textStyle: GoogleFonts.inter(
        color: backgroundLight,
        fontSize: 12,
        fontWeight: FontWeight.w300,
      ),
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
    ),
    snackBarTheme: SnackBarThemeData(
      backgroundColor: primaryLight,
      contentTextStyle: GoogleFonts.inter(
        color: onPrimaryLight,
        fontSize: 14,
        fontWeight: FontWeight.w300,
      ),
      actionTextColor: onPrimaryLight,
      behavior: SnackBarBehavior.floating,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16.0),
      ),
    ),
    dialogTheme: DialogThemeData(
      backgroundColor: dialogLight,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20.0),
      ),
    ),
  );

  /// Dark theme with wellness aesthetic
  static ThemeData darkTheme = ThemeData(
    brightness: Brightness.dark,
    colorScheme: ColorScheme(
      brightness: Brightness.dark,
      primary: primaryDark,
      onPrimary: onPrimaryDark,
      primaryContainer: accentDark,
      onPrimaryContainer: textPrimaryDark,
      secondary: secondaryDark,
      onSecondary: onSecondaryDark,
      secondaryContainer: secondaryVariantDark,
      onSecondaryContainer: textPrimaryDark,
      tertiary: aquaAccentDark,
      onTertiary: textPrimaryDark,
      tertiaryContainer: aquaAccentDark,
      onTertiaryContainer: textPrimaryDark,
      error: errorDark,
      onError: onErrorDark,
      surface: surfaceDark,
      onSurface: onSurfaceDark,
      onSurfaceVariant: textSecondaryDark,
      outline: dividerDark,
      outlineVariant: dividerDark,
      shadow: shadowDark,
      scrim: shadowDark,
      inverseSurface: surfaceLight,
      onInverseSurface: onSurfaceLight,
      inversePrimary: primaryLight,
    ),
    scaffoldBackgroundColor: backgroundDark,
    cardColor: cardDark,
    dividerColor: dividerDark,
    appBarTheme: AppBarThemeData(
      backgroundColor: backgroundDark,
      foregroundColor: textPrimaryDark,
      elevation: 0,
      shadowColor: Colors.transparent,
      surfaceTintColor: Colors.transparent,
      titleTextStyle: GoogleFonts.inter(
        fontSize: 20,
        fontWeight: FontWeight.w300,
        color: textPrimaryDark,
        letterSpacing: 0.5,
      ),
      iconTheme: const IconThemeData(
        color: textPrimaryDark,
        size: 24,
      ),
    ),
    cardTheme: CardThemeData(
      color: cardDark,
      elevation: 3.0,
      shadowColor: shadowDark,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20.0),
      ),
      margin: const EdgeInsets.all(8.0),
    ),
    bottomNavigationBarTheme: BottomNavigationBarThemeData(
      backgroundColor: surfaceDark,
      selectedItemColor: primaryDark,
      unselectedItemColor: textSecondaryDark,
      elevation: 8.0,
      type: BottomNavigationBarType.fixed,
      selectedLabelStyle: GoogleFonts.inter(
        fontSize: 12,
        fontWeight: FontWeight.w400,
      ),
      unselectedLabelStyle: GoogleFonts.inter(
        fontSize: 12,
        fontWeight: FontWeight.w300,
      ),
    ),
    floatingActionButtonTheme: FloatingActionButtonThemeData(
      backgroundColor: primaryDark,
      foregroundColor: onPrimaryDark,
      elevation: 6.0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20.0),
      ),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        foregroundColor: onPrimaryDark,
        backgroundColor: primaryDark,
        padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
        elevation: 4.0,
        shadowColor: shadowDark,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16.0),
        ),
        textStyle: GoogleFonts.inter(
          fontSize: 14,
          fontWeight: FontWeight.w400,
          letterSpacing: 0.5,
        ),
      ),
    ),
    outlinedButtonTheme: OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        foregroundColor: primaryDark,
        padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
        side: BorderSide(color: primaryDark.withValues(alpha: 0.5), width: 1),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16.0),
        ),
        textStyle: GoogleFonts.inter(
          fontSize: 14,
          fontWeight: FontWeight.w400,
          letterSpacing: 0.5,
        ),
      ),
    ),
    textButtonTheme: TextButtonThemeData(
      style: TextButton.styleFrom(
        foregroundColor: primaryDark,
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12.0),
        ),
        textStyle: GoogleFonts.inter(
          fontSize: 14,
          fontWeight: FontWeight.w400,
          letterSpacing: 0.5,
        ),
      ),
    ),
    textTheme: _buildTextTheme(isLight: false),
    inputDecorationTheme: InputDecorationThemeData(
      fillColor: accentDark,
      filled: true,
      contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(16.0),
        borderSide: BorderSide.none,
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(16.0),
        borderSide: BorderSide.none,
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(16.0),
        borderSide: const BorderSide(color: primaryDark, width: 2),
      ),
      errorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(16.0),
        borderSide: const BorderSide(color: errorDark, width: 1),
      ),
      focusedErrorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(16.0),
        borderSide: const BorderSide(color: errorDark, width: 2),
      ),
      labelStyle: GoogleFonts.inter(
        color: textSecondaryDark,
        fontSize: 14,
        fontWeight: FontWeight.w300,
      ),
      hintStyle: GoogleFonts.inter(
        color: textDisabledDark,
        fontSize: 14,
        fontWeight: FontWeight.w300,
      ),
      errorStyle: GoogleFonts.inter(
        color: errorDark,
        fontSize: 12,
        fontWeight: FontWeight.w300,
      ),
    ),
    switchTheme: SwitchThemeData(
      thumbColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.selected)) {
          return primaryDark;
        }
        return accentDark;
      }),
      trackColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.selected)) {
          return primaryDark.withValues(alpha: 0.3);
        }
        return dividerDark;
      }),
    ),
    checkboxTheme: CheckboxThemeData(
      fillColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.selected)) {
          return primaryDark;
        }
        return Colors.transparent;
      }),
      checkColor: WidgetStateProperty.all(onPrimaryDark),
      side: BorderSide(color: dividerDark.withValues(alpha: 0.5), width: 1),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(6.0),
      ),
    ),
    radioTheme: RadioThemeData(
      fillColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.selected)) {
          return primaryDark;
        }
        return dividerDark;
      }),
    ),
    progressIndicatorTheme: const ProgressIndicatorThemeData(
      color: primaryDark,
      linearTrackColor: accentDark,
      circularTrackColor: accentDark,
    ),
    sliderTheme: SliderThemeData(
      activeTrackColor: primaryDark,
      thumbColor: primaryDark,
      overlayColor: primaryDark.withValues(alpha: 0.1),
      inactiveTrackColor: accentDark,
      trackHeight: 4.0,
    ),
    tabBarTheme: TabBarThemeData(
      labelColor: primaryDark,
      unselectedLabelColor: textSecondaryDark,
      indicatorColor: primaryDark,
      indicatorSize: TabBarIndicatorSize.label,
      labelStyle: GoogleFonts.inter(
        fontSize: 14,
        fontWeight: FontWeight.w400,
      ),
      unselectedLabelStyle: GoogleFonts.inter(
        fontSize: 14,
        fontWeight: FontWeight.w300,
      ),
    ),
    tooltipTheme: TooltipThemeData(
      decoration: BoxDecoration(
        color: textPrimaryDark.withValues(alpha: 0.9),
        borderRadius: BorderRadius.circular(12.0),
      ),
      textStyle: GoogleFonts.inter(
        color: backgroundDark,
        fontSize: 12,
        fontWeight: FontWeight.w300,
      ),
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
    ),
    snackBarTheme: SnackBarThemeData(
      backgroundColor: primaryDark,
      contentTextStyle: GoogleFonts.inter(
        color: onPrimaryDark,
        fontSize: 14,
        fontWeight: FontWeight.w300,
      ),
      actionTextColor: onPrimaryDark,
      behavior: SnackBarBehavior.floating,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16.0),
      ),
    ),
    dialogTheme: DialogThemeData(
      backgroundColor: dialogDark,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20.0),
      ),
    ),
  );

  /// Helper method to build text theme with wellness aesthetic
  static TextTheme _buildTextTheme({required bool isLight}) {
    final Color textPrimary = isLight ? textPrimaryLight : textPrimaryDark;
    final Color textSecondary =
        isLight ? textSecondaryLight : textSecondaryDark;
    final Color textDisabled = isLight ? textDisabledLight : textDisabledDark;

    return TextTheme(
      // Display styles - Light weights for airy feel
      displayLarge: GoogleFonts.inter(
        fontSize: 57,
        fontWeight: FontWeight.w200, // Ultra-light for airy feel
        color: textPrimary,
        letterSpacing: -0.25,
        height: 1.2,
      ),
      displayMedium: GoogleFonts.inter(
        fontSize: 45,
        fontWeight: FontWeight.w200,
        color: textPrimary,
        height: 1.2,
      ),
      displaySmall: GoogleFonts.inter(
        fontSize: 36,
        fontWeight: FontWeight.w300,
        color: textPrimary,
        height: 1.3,
      ),

      // Headline styles - Light for calmness, medium for clarity
      headlineLarge: GoogleFonts.inter(
        fontSize: 32,
        fontWeight: FontWeight.w300, // Light for calmness
        color: textPrimary,
        letterSpacing: 0.25,
        height: 1.3,
      ),
      headlineMedium: GoogleFonts.inter(
        fontSize: 28,
        fontWeight: FontWeight.w400, // Medium for clarity
        color: textPrimary,
        letterSpacing: 0.25,
        height: 1.3,
      ),
      headlineSmall: GoogleFonts.inter(
        fontSize: 24,
        fontWeight: FontWeight.w400, // Medium for clarity
        color: textPrimary,
        letterSpacing: 0.25,
        height: 1.3,
      ),

      // Title styles - Balanced weights
      titleLarge: GoogleFonts.inter(
        fontSize: 22,
        fontWeight: FontWeight.w400, // Medium for clarity
        color: textPrimary,
        letterSpacing: 0.15,
        height: 1.4,
      ),
      titleMedium: GoogleFonts.inter(
        fontSize: 16,
        fontWeight: FontWeight.w400, // Medium for clarity
        color: textPrimary,
        letterSpacing: 0.15,
        height: 1.4,
      ),
      titleSmall: GoogleFonts.inter(
        fontSize: 14,
        fontWeight: FontWeight.w400, // Medium for clarity
        color: textPrimary,
        letterSpacing: 0.1,
        height: 1.4,
      ),

      // Body styles - Light for body text
      bodyLarge: GoogleFonts.inter(
        fontSize: 16,
        fontWeight: FontWeight.w300, // Light for calmness
        color: textPrimary,
        letterSpacing: 0.5,
        height: 1.5,
      ),
      bodyMedium: GoogleFonts.inter(
        fontSize: 14,
        fontWeight: FontWeight.w300, // Light for calmness
        color: textPrimary,
        letterSpacing: 0.25,
        height: 1.5,
      ),
      bodySmall: GoogleFonts.inter(
        fontSize: 12,
        fontWeight: FontWeight.w300, // Light for calmness
        color: textSecondary,
        letterSpacing: 0.4,
        height: 1.4,
      ),

      // Label styles - Medium for clarity when needed
      labelLarge: GoogleFonts.inter(
        fontSize: 14,
        fontWeight: FontWeight.w400, // Medium for clarity
        color: textPrimary,
        letterSpacing: 0.1,
        height: 1.4,
      ),
      labelMedium: GoogleFonts.inter(
        fontSize: 12,
        fontWeight: FontWeight.w300, // Light
        color: textSecondary,
        letterSpacing: 0.5,
        height: 1.4,
      ),
      labelSmall: GoogleFonts.inter(
        fontSize: 11,
        fontWeight: FontWeight.w300, // Light
        color: textDisabled,
        letterSpacing: 0.5,
        height: 1.3,
      ),
    );
  }

  /// Custom gradient decorations for wellness aesthetic
  static BoxDecoration get mintGradientDecoration => BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            primaryLight.withValues(alpha: 0.8),
            aquaAccent.withValues(alpha: 0.6),
          ],
        ),
        borderRadius: BorderRadius.circular(20.0),
      );

  static BoxDecoration get sageGradientDecoration => BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [
            secondaryLight.withValues(alpha: 0.3),
            accentLight.withValues(alpha: 0.1),
          ],
        ),
        borderRadius: BorderRadius.circular(20.0),
      );

  static BoxDecoration get aquaGradientDecoration => BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topRight,
          end: Alignment.bottomLeft,
          colors: [
            aquaAccent.withValues(alpha: 0.4),
            accentLight.withValues(alpha: 0.2),
          ],
        ),
        borderRadius: BorderRadius.circular(20.0),
      );

  /// Wellness-inspired box shadows (gentle and airy)
  static List<BoxShadow> get lightWellnessShadow => [
        BoxShadow(
          color: primaryLight.withValues(alpha: 0.08),
          blurRadius: 12.0,
          offset: const Offset(0, 4),
          spreadRadius: 0,
        ),
        BoxShadow(
          color: aquaAccent.withValues(alpha: 0.04),
          blurRadius: 8.0,
          offset: const Offset(0, 2),
          spreadRadius: 0,
        ),
      ];

  static List<BoxShadow> get darkWellnessShadow => [
        BoxShadow(
          color: Colors.black.withValues(alpha: 0.3),
          blurRadius: 12.0,
          offset: const Offset(0, 4),
          spreadRadius: 0,
        ),
      ];

  /// Animation durations for organic feel
  static const Duration breatheAnimation =
      Duration(milliseconds: 400); // Slower, more organic
  static const Duration gentleAnimation = Duration(milliseconds: 250);
  static const Duration fastBreathing = Duration(milliseconds: 150);

  /// Border radius constants for smooth rounded design
  static const double cardBorderRadius = 20.0; // More rounded for modern feel
  static const double buttonBorderRadius = 16.0;
  static const double inputBorderRadius = 16.0;
  static const double smallBorderRadius = 12.0;
}
