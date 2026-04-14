import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../theme/app_theme.dart';
import './widgets/glassmorphism_header_widget.dart';
import './widgets/login_form_widget.dart';
import './widgets/signup_link_widget.dart';
import './widgets/social_login_widget.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen>
    with TickerProviderStateMixin {
  bool _isLoading = false;
  bool _keyboardVisible = false;
  late AnimationController _heroController;
  late Animation<Offset> _slideAnimation;
  late Animation<double> _fadeAnimation;

  // Mock credentials for demonstration
  final Map<String, String> _mockCredentials = {
    'admin@podcastpro.com': 'admin123',
    'user@podcastpro.com': 'user123',
    'demo@podcastpro.com': 'demo123',
  };

  @override
  void initState() {
    super.initState();
    _heroController = AnimationController(
      duration: const Duration(milliseconds: 1200),
      vsync: this,
    );

    _slideAnimation = Tween<Offset>(
      begin: const Offset(0, 0.3),
      end: Offset.zero,
    ).animate(CurvedAnimation(
      parent: _heroController,
      curve: Curves.elasticOut,
    ));

    _fadeAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _heroController,
      curve: Curves.easeInOut,
    ));

    // Start entrance animation
    _heroController.forward();

    // Listen to keyboard visibility
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _checkKeyboardVisibility();
    });
  }

  @override
  void dispose() {
    _heroController.dispose();
    super.dispose();
  }

  void _checkKeyboardVisibility() {
    final keyboardHeight = MediaQuery.of(context).viewInsets.bottom;
    final isVisible = keyboardHeight > 0;

    if (_keyboardVisible != isVisible) {
      setState(() {
        _keyboardVisible = isVisible;
      });
    }
  }

  Future<void> _handleLogin(String email, String password) async {
    setState(() {
      _isLoading = true;
    });

    // Simulate network delay
    await Future.delayed(const Duration(seconds: 2));

    // Check mock credentials
    if (_mockCredentials.containsKey(email) &&
        _mockCredentials[email] == password) {
      // Success - trigger haptic feedback
      HapticFeedback.lightImpact();

      // Show success toast
      Fluttertoast.showToast(
        msg: "Login successful! Welcome back.",
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.BOTTOM,
        backgroundColor: Colors.green,
        textColor: Colors.white,
        fontSize: 16.0,
      );

      setState(() {
        _isLoading = false;
      });

      // Navigate to home dashboard with hero animation
      await Future.delayed(const Duration(milliseconds: 500));
      if (mounted) {
        Navigator.pushReplacementNamed(context, '/home-dashboard');
      }
    } else {
      // Error - show error message
      setState(() {
        _isLoading = false;
      });

      HapticFeedback.heavyImpact();

      Fluttertoast.showToast(
        msg: "Invalid credentials. Try: admin@podcastpro.com / admin123",
        toastLength: Toast.LENGTH_LONG,
        gravity: ToastGravity.BOTTOM,
        backgroundColor: Colors.red,
        textColor: Colors.white,
        fontSize: 16.0,
      );
    }
  }

  Future<void> _handleSocialLogin(String provider) async {
    setState(() {
      _isLoading = true;
    });

    // Simulate social login process
    await Future.delayed(const Duration(seconds: 1));

    HapticFeedback.lightImpact();

    Fluttertoast.showToast(
      msg: "Signing in with ${provider.toUpperCase()}...",
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
      backgroundColor: AppTheme.lightTheme.colorScheme.secondary,
      textColor: Colors.white,
      fontSize: 16.0,
    );

    setState(() {
      _isLoading = false;
    });

    // Navigate to home dashboard
    await Future.delayed(const Duration(milliseconds: 500));
    if (mounted) {
      Navigator.pushReplacementNamed(context, '/home-dashboard');
    }
  }

  void _handleSignupTap() {
    HapticFeedback.selectionClick();

    Fluttertoast.showToast(
      msg: "Redirecting to Sign Up...",
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
      backgroundColor: AppTheme.lightTheme.colorScheme.secondary,
      textColor: Colors.white,
      fontSize: 16.0,
    );

    // Navigate to onboarding flow (which would include signup)
    Navigator.pushNamed(context, '/onboarding-flow');
  }

  @override
  Widget build(BuildContext context) {
    _checkKeyboardVisibility();

    return Scaffold(
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      body: SafeArea(
        child: AnimatedBuilder(
          animation: _fadeAnimation,
          builder: (context, child) {
            return Opacity(
              opacity: _fadeAnimation.value,
              child: SlideTransition(
                position: _slideAnimation,
                child: SingleChildScrollView(
                  physics: const BouncingScrollPhysics(),
                  child: ConstrainedBox(
                    constraints: BoxConstraints(
                      minHeight: MediaQuery.of(context).size.height -
                          MediaQuery.of(context).padding.top,
                    ),
                    child: Column(
                      children: [
                        // Glassmorphism Header
                        if (!_keyboardVisible)
                          const GlassmorphismHeaderWidget(),

                        // Adaptive spacing based on keyboard visibility
                        SizedBox(height: _keyboardVisible ? 2.h : 4.h),

                        // Login Form
                        LoginFormWidget(
                          onLogin: _handleLogin,
                          isLoading: _isLoading,
                        ),

                        SizedBox(height: 4.h),

                        // Social Login Section
                        SocialLoginWidget(
                          onSocialLogin: _handleSocialLogin,
                          isLoading: _isLoading,
                        ),

                        SizedBox(height: 2.h),

                        // Sign Up Link
                        SignupLinkWidget(
                          onSignupTap: _handleSignupTap,
                        ),

                        // Bottom spacing
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
