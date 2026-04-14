import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

/// A class that contains all theme configurations for the music streaming application.
/// Implements Contemporary Dark Minimalism with Nocturne Accent color scheme.
class AppTheme {
  AppTheme._();

  // Color Specifications - Nocturne Accent Theme
  // Primary Background: #121212 (True dark base optimized for OLED battery efficiency and eye comfort)
  static const Color primaryBackgroundDark = Color(0xFF121212);

  // Secondary Background: #1E1E1E (Card surfaces with subtle contrast for content separation)
  static const Color secondaryBackgroundDark = Color(0xFF1E1E1E);

  // Accent Primary: #B8D456 (Lime green for active states, selected tabs, and primary actions)
  static const Color accentPrimary = Color(0xFFB8D456);

  // Accent Secondary: #9BC53D (Darker lime variant for pressed states and secondary highlights)
  static const Color accentSecondary = Color(0xFF9BC53D);

  // Text Primary: #FFFFFF (High contrast white for headings and primary content)
  static const Color textPrimary = Color(0xFFFFFFFF);

  // Text Secondary: #B3B3B3 (Medium contrast gray for supporting text and metadata)
  static const Color textSecondary = Color(0xFFB3B3B3);

  // Text Tertiary: #666666 (Low contrast gray for timestamps and subtle information)
  static const Color textTertiary = Color(0xFF666666);

  // Surface Elevated: #2C2C2C (Elevated surfaces like bottom sheets and modals)
  static const Color surfaceElevated = Color(0xFF2C2C2C);

  // Border Subtle: #333333 (Minimal borders when spatial separation is insufficient)
  static const Color borderSubtle = Color(0xFF333333);

  // Status Success: #4CAF50 (Download complete, connection status, and positive feedback)
  static const Color statusSuccess = Color(0xFF4CAF50);

  // Light theme colors (minimal usage for system compatibility)
  static const Color primaryLight = Color(0xFFB8D456);
  static const Color backgroundLight = Color(0xFFF5F5F5);
  static const Color surfaceLight = Color(0xFFFFFFFF);
  static const Color textLight = Color(0xFF121212);

  // Shadow colors with 20% opacity for subtle elevation
  static const Color shadowDark = Color(0x33000000); // 20% opacity black
  static const Color shadowLight = Color(0x1A000000);

  /// Dark theme - Primary theme for music streaming app
  static ThemeData darkTheme = ThemeData(
    brightness: Brightness.dark,
    colorScheme: ColorScheme(
      brightness: Brightness.dark,
      primary: accentPrimary,
      onPrimary: primaryBackgroundDark,
      primaryContainer: accentSecondary,
      onPrimaryContainer: primaryBackgroundDark,
      secondary: accentPrimary,
      onSecondary: primaryBackgroundDark,
      secondaryContainer: accentSecondary,
      onSecondaryContainer: primaryBackgroundDark,
      tertiary: accentPrimary,
      onTertiary: primaryBackgroundDark,
      tertiaryContainer: accentSecondary,
      onTertiaryContainer: primaryBackgroundDark,
      error: Color(0xFFCF6679),
      onError: primaryBackgroundDark,
      surface: secondaryBackgroundDark,
      onSurface: textPrimary,
      onSurfaceVariant: textSecondary,
      outline: borderSubtle,
      outlineVariant: borderSubtle,
      shadow: shadowDark,
      scrim: shadowDark,
      inverseSurface: surfaceLight,
      onInverseSurface: textLight,
      inversePrimary: accentSecondary,
    ),
    scaffoldBackgroundColor: primaryBackgroundDark,
    cardColor: secondaryBackgroundDark,
    dividerColor: borderSubtle,
    appBarTheme: AppBarThemeData(
      backgroundColor: primaryBackgroundDark,
      foregroundColor: textPrimary,
      elevation: 0,
      centerTitle: false,
      titleTextStyle: GoogleFonts.inter(
        fontSize: 20,
        fontWeight: FontWeight.w600,
        color: textPrimary,
        letterSpacing: 0.15,
      ),
    ),
    cardTheme: CardThemeData(
      color: secondaryBackgroundDark,
      elevation: 2.0,
      shadowColor: shadowDark,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12.0)),
    ),
    bottomNavigationBarTheme: BottomNavigationBarThemeData(
      backgroundColor: secondaryBackgroundDark,
      selectedItemColor: accentPrimary,
      unselectedItemColor: textSecondary,
      elevation: 8.0,
      type: BottomNavigationBarType.fixed,
      selectedLabelStyle: GoogleFonts.inter(
        fontSize: 12,
        fontWeight: FontWeight.w500,
      ),
      unselectedLabelStyle: GoogleFonts.inter(
        fontSize: 12,
        fontWeight: FontWeight.w400,
      ),
    ),
    floatingActionButtonTheme: FloatingActionButtonThemeData(
      backgroundColor: accentPrimary,
      foregroundColor: primaryBackgroundDark,
      elevation: 4.0,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16.0)),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        foregroundColor: primaryBackgroundDark,
        backgroundColor: accentPrimary,
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
        elevation: 2.0,
        shadowColor: shadowDark,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12.0),
        ),
        textStyle: GoogleFonts.inter(
          fontSize: 14,
          fontWeight: FontWeight.w500,
          letterSpacing: 0.1,
        ),
      ),
    ),
    outlinedButtonTheme: OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        foregroundColor: accentPrimary,
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
        side: BorderSide(color: borderSubtle, width: 1),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12.0),
        ),
        textStyle: GoogleFonts.inter(
          fontSize: 14,
          fontWeight: FontWeight.w500,
          letterSpacing: 0.1,
        ),
      ),
    ),
    textButtonTheme: TextButtonThemeData(
      style: TextButton.styleFrom(
        foregroundColor: accentPrimary,
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8.0)),
        textStyle: GoogleFonts.inter(
          fontSize: 14,
          fontWeight: FontWeight.w500,
          letterSpacing: 0.1,
        ),
      ),
    ),
    textTheme: _buildTextTheme(isDark: true),
    inputDecorationTheme: InputDecorationThemeData(
      fillColor: secondaryBackgroundDark,
      filled: true,
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12.0),
        borderSide: BorderSide(color: borderSubtle, width: 1),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12.0),
        borderSide: BorderSide(color: borderSubtle, width: 1),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12.0),
        borderSide: BorderSide(color: accentPrimary, width: 2),
      ),
      errorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12.0),
        borderSide: BorderSide(color: Color(0xFFCF6679), width: 1),
      ),
      focusedErrorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12.0),
        borderSide: BorderSide(color: Color(0xFFCF6679), width: 2),
      ),
      labelStyle: GoogleFonts.inter(
        color: textSecondary,
        fontSize: 14,
        fontWeight: FontWeight.w400,
      ),
      hintStyle: GoogleFonts.inter(
        color: textTertiary,
        fontSize: 14,
        fontWeight: FontWeight.w400,
      ),
      prefixIconColor: textSecondary,
      suffixIconColor: textSecondary,
    ),
    switchTheme: SwitchThemeData(
      thumbColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.selected)) {
          return accentPrimary;
        }
        return textTertiary;
      }),
      trackColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.selected)) {
          return accentPrimary.withValues(alpha: 0.5);
        }
        return borderSubtle;
      }),
    ),
    checkboxTheme: CheckboxThemeData(
      fillColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.selected)) {
          return accentPrimary;
        }
        return Colors.transparent;
      }),
      checkColor: WidgetStateProperty.all(primaryBackgroundDark),
      side: BorderSide(color: borderSubtle, width: 1),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(4)),
    ),
    radioTheme: RadioThemeData(
      fillColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.selected)) {
          return accentPrimary;
        }
        return borderSubtle;
      }),
    ),
    progressIndicatorTheme: ProgressIndicatorThemeData(
      color: accentPrimary,
      linearTrackColor: borderSubtle,
      circularTrackColor: borderSubtle,
    ),
    sliderTheme: SliderThemeData(
      activeTrackColor: accentPrimary,
      thumbColor: accentPrimary,
      overlayColor: accentPrimary.withValues(alpha: 0.2),
      inactiveTrackColor: borderSubtle,
      trackHeight: 4.0,
    ),
    tabBarTheme: TabBarThemeData(
      labelColor: accentPrimary,
      unselectedLabelColor: textSecondary,
      indicatorColor: accentPrimary,
      indicatorSize: TabBarIndicatorSize.label,
      labelStyle: GoogleFonts.inter(
        fontSize: 14,
        fontWeight: FontWeight.w600,
        letterSpacing: 0.1,
      ),
      unselectedLabelStyle: GoogleFonts.inter(
        fontSize: 14,
        fontWeight: FontWeight.w400,
        letterSpacing: 0.1,
      ),
    ),
    tooltipTheme: TooltipThemeData(
      decoration: BoxDecoration(
        color: surfaceElevated,
        borderRadius: BorderRadius.circular(8),
        boxShadow: [
          BoxShadow(color: shadowDark, blurRadius: 8, offset: Offset(0, 2)),
        ],
      ),
      textStyle: GoogleFonts.inter(
        color: textPrimary,
        fontSize: 12,
        fontWeight: FontWeight.w400,
      ),
      padding: EdgeInsets.symmetric(horizontal: 12, vertical: 8),
    ),
    snackBarTheme: SnackBarThemeData(
      backgroundColor: surfaceElevated,
      contentTextStyle: GoogleFonts.inter(
        color: textPrimary,
        fontSize: 14,
        fontWeight: FontWeight.w400,
      ),
      actionTextColor: accentPrimary,
      behavior: SnackBarBehavior.floating,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12.0)),
      elevation: 4.0,
    ),
    bottomSheetTheme: BottomSheetThemeData(
      backgroundColor: surfaceElevated,
      modalBackgroundColor: surfaceElevated,
      elevation: 8.0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24.0)),
      ),
    ),
    dialogTheme: DialogThemeData(
      backgroundColor: surfaceElevated,
      elevation: 8.0,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16.0)),
      titleTextStyle: GoogleFonts.inter(
        fontSize: 20,
        fontWeight: FontWeight.w600,
        color: textPrimary,
      ),
      contentTextStyle: GoogleFonts.inter(
        fontSize: 14,
        fontWeight: FontWeight.w400,
        color: textSecondary,
      ),
    ),
  );

  /// Light theme - Minimal implementation for system compatibility
  static ThemeData lightTheme = ThemeData(
    brightness: Brightness.light,
    colorScheme: ColorScheme(
      brightness: Brightness.light,
      primary: accentSecondary,
      onPrimary: backgroundLight,
      primaryContainer: accentPrimary,
      onPrimaryContainer: textLight,
      secondary: accentSecondary,
      onSecondary: backgroundLight,
      secondaryContainer: accentPrimary,
      onSecondaryContainer: textLight,
      tertiary: accentSecondary,
      onTertiary: backgroundLight,
      tertiaryContainer: accentPrimary,
      onTertiaryContainer: textLight,
      error: Color(0xFFB00020),
      onError: backgroundLight,
      surface: surfaceLight,
      onSurface: textLight,
      onSurfaceVariant: Color(0xFF666666),
      outline: Color(0xFFCCCCCC),
      outlineVariant: Color(0xFFE0E0E0),
      shadow: shadowLight,
      scrim: shadowLight,
      inverseSurface: primaryBackgroundDark,
      onInverseSurface: textPrimary,
      inversePrimary: accentPrimary,
    ),
    scaffoldBackgroundColor: backgroundLight,
    cardColor: surfaceLight,
    dividerColor: Color(0xFFE0E0E0),
    appBarTheme: AppBarThemeData(
      backgroundColor: surfaceLight,
      foregroundColor: textLight,
      elevation: 0,
      centerTitle: false,
      titleTextStyle: GoogleFonts.inter(
        fontSize: 20,
        fontWeight: FontWeight.w600,
        color: textLight,
        letterSpacing: 0.15,
      ),
    ),
    textTheme: _buildTextTheme(isDark: false),
    dialogTheme: DialogThemeData(backgroundColor: surfaceLight),
  );

  /// Helper method to build text theme based on brightness
  /// Implements Inter font family with specified weights for all text styles
  static TextTheme _buildTextTheme({required bool isDark}) {
    final Color primaryColor = isDark ? textPrimary : textLight;
    final Color secondaryColor = isDark ? textSecondary : Color(0xFF666666);
    final Color tertiaryColor = isDark ? textTertiary : Color(0xFF999999);

    return TextTheme(
      // Display styles - Headings with Inter font
      displayLarge: GoogleFonts.inter(
        fontSize: 57,
        fontWeight: FontWeight.w700,
        color: primaryColor,
        letterSpacing: -0.25,
        height: 1.12,
      ),
      displayMedium: GoogleFonts.inter(
        fontSize: 45,
        fontWeight: FontWeight.w700,
        color: primaryColor,
        letterSpacing: 0,
        height: 1.16,
      ),
      displaySmall: GoogleFonts.inter(
        fontSize: 36,
        fontWeight: FontWeight.w600,
        color: primaryColor,
        letterSpacing: 0,
        height: 1.22,
      ),

      // Headline styles - Section headers
      headlineLarge: GoogleFonts.inter(
        fontSize: 32,
        fontWeight: FontWeight.w600,
        color: primaryColor,
        letterSpacing: 0,
        height: 1.25,
      ),
      headlineMedium: GoogleFonts.inter(
        fontSize: 28,
        fontWeight: FontWeight.w600,
        color: primaryColor,
        letterSpacing: 0,
        height: 1.29,
      ),
      headlineSmall: GoogleFonts.inter(
        fontSize: 24,
        fontWeight: FontWeight.w600,
        color: primaryColor,
        letterSpacing: 0,
        height: 1.33,
      ),

      // Title styles - Card titles, list items
      titleLarge: GoogleFonts.inter(
        fontSize: 22,
        fontWeight: FontWeight.w500,
        color: primaryColor,
        letterSpacing: 0,
        height: 1.27,
      ),
      titleMedium: GoogleFonts.inter(
        fontSize: 16,
        fontWeight: FontWeight.w500,
        color: primaryColor,
        letterSpacing: 0.15,
        height: 1.5,
      ),
      titleSmall: GoogleFonts.inter(
        fontSize: 14,
        fontWeight: FontWeight.w500,
        color: primaryColor,
        letterSpacing: 0.1,
        height: 1.43,
      ),

      // Body styles - Main content text
      bodyLarge: GoogleFonts.inter(
        fontSize: 16,
        fontWeight: FontWeight.w400,
        color: primaryColor,
        letterSpacing: 0.5,
        height: 1.5,
      ),
      bodyMedium: GoogleFonts.inter(
        fontSize: 14,
        fontWeight: FontWeight.w400,
        color: secondaryColor,
        letterSpacing: 0.25,
        height: 1.43,
      ),
      bodySmall: GoogleFonts.inter(
        fontSize: 12,
        fontWeight: FontWeight.w400,
        color: secondaryColor,
        letterSpacing: 0.4,
        height: 1.33,
      ),

      // Label styles - Buttons, tabs, captions
      labelLarge: GoogleFonts.inter(
        fontSize: 14,
        fontWeight: FontWeight.w500,
        color: primaryColor,
        letterSpacing: 0.1,
        height: 1.43,
      ),
      labelMedium: GoogleFonts.inter(
        fontSize: 12,
        fontWeight: FontWeight.w500,
        color: secondaryColor,
        letterSpacing: 0.5,
        height: 1.33,
      ),
      labelSmall: GoogleFonts.inter(
        fontSize: 11,
        fontWeight: FontWeight.w400,
        color: tertiaryColor,
        letterSpacing: 0.5,
        height: 1.45,
      ),
    );
  }

  /// Animation duration constants - 200-300ms for essential transitions
  static const Duration animationFast = Duration(milliseconds: 200);
  static const Duration animationMedium = Duration(milliseconds: 250);
  static const Duration animationSlow = Duration(milliseconds: 300);
  static const Duration animationModal = Duration(milliseconds: 400);

  /// Animation curves - Easing for smooth transitions
  static const Curve animationCurve = Curves.easeOut;
  static const Curve animationCurveSpring = Curves.easeInOutCubic;

  /// Border radius constants
  static const double radiusSmall = 8.0;
  static const double radiusMedium = 12.0;
  static const double radiusLarge = 16.0;
  static const double radiusXLarge = 24.0;

  /// Elevation constants - Subtle 2-4dp shadows
  static const double elevationLow = 2.0;
  static const double elevationMedium = 4.0;
  static const double elevationHigh = 8.0;

  /// Spacing constants
  static const double spacingXSmall = 4.0;
  static const double spacingSmall = 8.0;
  static const double spacingMedium = 16.0;
  static const double spacingLarge = 24.0;
  static const double spacingXLarge = 32.0;
}
