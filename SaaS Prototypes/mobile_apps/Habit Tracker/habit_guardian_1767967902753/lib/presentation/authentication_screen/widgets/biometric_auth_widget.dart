import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

/// Biometric authentication widget with platform-specific implementation
class BiometricAuthWidget extends StatefulWidget {
  final Function(bool) onBiometricResult;

  const BiometricAuthWidget({
    super.key,
    required this.onBiometricResult,
  });

  @override
  State<BiometricAuthWidget> createState() => _BiometricAuthWidgetState();
}

class _BiometricAuthWidgetState extends State<BiometricAuthWidget> {
  bool _isAuthenticating = false;

  Future<void> _authenticateWithBiometrics() async {
    if (_isAuthenticating) return;

    setState(() {
      _isAuthenticating = true;
    });

    try {
      // Haptic feedback for interaction
      HapticFeedback.lightImpact();

      // Simulate biometric authentication
      await Future.delayed(const Duration(seconds: 2));

      // For demo purposes, randomly succeed or fail
      final success = DateTime.now().millisecond % 2 == 0;

      if (success) {
        HapticFeedback.mediumImpact();
        widget.onBiometricResult(true);
      } else {
        HapticFeedback.vibrate();
        widget.onBiometricResult(false);

        if (mounted) {
          _showBiometricError();
        }
      }
    } catch (e) {
      HapticFeedback.vibrate();
      widget.onBiometricResult(false);

      if (mounted) {
        _showBiometricError();
      }
    } finally {
      if (mounted) {
        setState(() {
          _isAuthenticating = false;
        });
      }
    }
  }

  void _showBiometricError() {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          'Biometric authentication failed. Please try again.',
          style: GoogleFonts.inter(
            fontSize: 14.sp,
            fontWeight: FontWeight.w400,
          ),
        ),
        backgroundColor: AppTheme.warningLight,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        margin: EdgeInsets.all(4.w),
      ),
    );
  }

  String _getBiometricText() {
    if (Platform.isIOS) {
      return 'Face ID / Touch ID';
    } else if (Platform.isAndroid) {
      return 'Fingerprint';
    } else {
      return 'Biometric Authentication';
    }
  }

  IconData _getBiometricIcon() {
    if (Platform.isIOS) {
      return Icons.face;
    } else if (Platform.isAndroid) {
      return Icons.fingerprint;
    } else {
      return Icons.security;
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Container(
      width: double.infinity,
      height: 6.h,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: isDark ? AppTheme.borderDark : AppTheme.borderLight,
          width: 1.5,
        ),
        boxShadow: [
          BoxShadow(
            color: isDark
                ? Colors.white.withValues(alpha: 0.05)
                : Colors.black.withValues(alpha: 0.05),
            blurRadius: 4,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Material(
        color: isDark ? AppTheme.surfaceDark : AppTheme.surfaceLight,
        borderRadius: BorderRadius.circular(12),
        child: InkWell(
          onTap: _authenticateWithBiometrics,
          borderRadius: BorderRadius.circular(12),
          splashColor:
              (isDark ? AppTheme.secondaryDark : AppTheme.secondaryLight)
                  .withValues(alpha: 0.1),
          highlightColor:
              (isDark ? AppTheme.secondaryDark : AppTheme.secondaryLight)
                  .withValues(alpha: 0.05),
          child: Padding(
            padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                _isAuthenticating
                    ? SizedBox(
                        width: 5.w,
                        height: 5.w,
                        child: CircularProgressIndicator(
                          strokeWidth: 2.0,
                          valueColor: AlwaysStoppedAnimation<Color>(
                            isDark
                                ? AppTheme.secondaryDark
                                : AppTheme.secondaryLight,
                          ),
                        ),
                      )
                    : CustomIconWidget(
                        iconName: _getBiometricIcon().codePoint.toString(),
                        color: isDark
                            ? AppTheme.secondaryDark
                            : AppTheme.secondaryLight,
                        size: 6.w,
                      ),
                SizedBox(width: 3.w),
                Text(
                  _isAuthenticating ? 'Authenticating...' : _getBiometricText(),
                  style: GoogleFonts.inter(
                    fontSize: 14.sp,
                    fontWeight: FontWeight.w500,
                    color: isDark
                        ? AppTheme.secondaryDark
                        : AppTheme.secondaryLight,
                    letterSpacing: 0.1,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}