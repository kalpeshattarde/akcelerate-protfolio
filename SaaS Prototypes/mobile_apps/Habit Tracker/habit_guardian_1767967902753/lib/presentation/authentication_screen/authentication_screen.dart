import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/app_logo_widget.dart';
import './widgets/biometric_auth_widget.dart';
import './widgets/create_account_widget.dart';
import './widgets/divider_widget.dart';
import './widgets/email_input_widget.dart';
import './widgets/forgot_password_widget.dart';
import './widgets/password_input_widget.dart';
import './widgets/sign_in_button_widget.dart';

/// Authentication Screen with sanctuary-like design and biometric options
class AuthenticationScreen extends StatefulWidget {
  const AuthenticationScreen({super.key});

  @override
  State<AuthenticationScreen> createState() => _AuthenticationScreenState();
}

class _AuthenticationScreenState extends State<AuthenticationScreen>
    with TickerProviderStateMixin {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final FocusNode _emailFocusNode = FocusNode();
  final FocusNode _passwordFocusNode = FocusNode();

  bool _isEmailValid = false;
  bool _isPasswordValid = false;
  bool _isLoading = false;
  String? _emailError;
  String? _passwordError;

  late AnimationController _fadeController;
  late Animation<double> _fadeAnimation;

  // Mock credentials for demonstration
  final String _mockEmail = 'user@habitguardian.com';
  final String _mockPassword = 'sanctuary123';

  @override
  void initState() {
    super.initState();
    _initializeAnimations();
    _setupListeners();
  }

  void _initializeAnimations() {
    _fadeController = AnimationController(
      duration: const Duration(milliseconds: 800),
      vsync: this,
    );

    _fadeAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _fadeController,
      curve: Curves.easeInOut,
    ));

    _fadeController.forward();
  }

  void _setupListeners() {
    _emailController.addListener(_validateEmail);
    _passwordController.addListener(_validatePassword);
  }

  void _validateEmail() {
    final email = _emailController.text.trim();
    final emailRegex = RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$');

    setState(() {
      if (email.isEmpty) {
        _isEmailValid = false;
        _emailError = null;
      } else if (!emailRegex.hasMatch(email)) {
        _isEmailValid = false;
        _emailError = 'Please enter a valid email address';
      } else {
        _isEmailValid = true;
        _emailError = null;
      }
    });
  }

  void _validatePassword() {
    final password = _passwordController.text;

    setState(() {
      if (password.isEmpty) {
        _isPasswordValid = false;
        _passwordError = null;
      } else if (password.length < 6) {
        _isPasswordValid = false;
        _passwordError = 'Password must be at least 6 characters';
      } else {
        _isPasswordValid = true;
        _passwordError = null;
      }
    });
  }

  Future<void> _signIn() async {
    if (!_isEmailValid || !_isPasswordValid || _isLoading) return;

    setState(() {
      _isLoading = true;
    });

    // Haptic feedback for interaction
    HapticFeedback.lightImpact();

    try {
      // Simulate authentication delay
      await Future.delayed(const Duration(seconds: 2));

      final email = _emailController.text.trim();
      final password = _passwordController.text;

      // Check mock credentials
      if (email == _mockEmail && password == _mockPassword) {
        // Success - navigate to habit dashboard
        HapticFeedback.heavyImpact();

        if (mounted) {
          Navigator.pushReplacementNamed(context, '/habit-dashboard');
        }
      } else {
        // Show error for wrong credentials
        _showAuthenticationError();
      }
    } catch (e) {
      _showAuthenticationError();
    } finally {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  void _showAuthenticationError() {
    HapticFeedback.mediumImpact();

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          'Invalid credentials. Please use: ${_mockEmail} / ${_mockPassword}',
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
        duration: const Duration(seconds: 4),
      ),
    );
  }

  void _handleForgotPassword() {
    HapticFeedback.lightImpact();

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          'Password reset link would be sent to your email',
          style: GoogleFonts.inter(
            fontSize: 14.sp,
            fontWeight: FontWeight.w400,
          ),
        ),
        backgroundColor: AppTheme.successLight,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        margin: EdgeInsets.all(4.w),
      ),
    );
  }

  void _handleBiometricResult(bool success) {
    if (success) {
      Navigator.pushReplacementNamed(context, '/habit-dashboard');
    }
  }

  void _handleCreateAccount() {
    HapticFeedback.lightImpact();
    Navigator.pushNamed(context, '/onboarding-flow');
  }

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    _emailFocusNode.dispose();
    _passwordFocusNode.dispose();
    _fadeController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? AppTheme.primaryDark : AppTheme.primaryLight,
      body: SafeArea(
        child: AnimatedBuilder(
          animation: _fadeAnimation,
          builder: (context, child) {
            return Opacity(
              opacity: _fadeAnimation.value,
              child: SingleChildScrollView(
                physics: const BouncingScrollPhysics(),
                padding: EdgeInsets.symmetric(horizontal: 6.w),
                child: ConstrainedBox(
                  constraints: BoxConstraints(
                    minHeight: MediaQuery.of(context).size.height -
                        MediaQuery.of(context).padding.top -
                        MediaQuery.of(context).padding.bottom,
                  ),
                  child: IntrinsicHeight(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        SizedBox(height: 8.h),

                        // App Logo with brand recognition
                        const AppLogoWidget(),

                        SizedBox(height: 6.h),

                        // Welcome text
                        Text(
                          'Welcome back to your sanctuary',
                          textAlign: TextAlign.center,
                          style: GoogleFonts.playfairDisplay(
                            fontSize: 20.sp,
                            fontWeight: FontWeight.w400,
                            color: isDark
                                ? AppTheme.textPrimaryDark
                                : AppTheme.textPrimaryLight,
                            height: 1.3,
                          ),
                        ),

                        SizedBox(height: 1.h),

                        Text(
                          'Sign in to continue your mindful journey',
                          textAlign: TextAlign.center,
                          style: GoogleFonts.inter(
                            fontSize: 14.sp,
                            fontWeight: FontWeight.w300,
                            color: isDark
                                ? AppTheme.textSecondaryDark
                                : AppTheme.textSecondaryLight,
                            height: 1.4,
                          ),
                        ),

                        SizedBox(height: 4.h),

                        // Email input field
                        EmailInputWidget(
                          controller: _emailController,
                          onChanged: (_) => _validateEmail(),
                          errorText: _emailError,
                        ),

                        SizedBox(height: 2.h),

                        // Password input field
                        PasswordInputWidget(
                          controller: _passwordController,
                          onChanged: (_) => _validatePassword(),
                          errorText: _passwordError,
                        ),

                        SizedBox(height: 1.h),

                        // Forgot password link
                        ForgotPasswordWidget(
                          onTap: _handleForgotPassword,
                        ),

                        SizedBox(height: 3.h),

                        // Sign in button
                        SignInButtonWidget(
                          isEnabled: _isEmailValid && _isPasswordValid,
                          isLoading: _isLoading,
                          onPressed: _signIn,
                        ),

                        // Divider with 'Or continue with'
                        const DividerWidget(),

                        // Biometric authentication
                        BiometricAuthWidget(
                          onBiometricResult: _handleBiometricResult,
                        ),

                        const Spacer(),

                        // Create account link
                        CreateAccountWidget(
                          onTap: _handleCreateAccount,
                        ),

                        SizedBox(height: 2.h),
                      ],
                    ),
                  ),
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}