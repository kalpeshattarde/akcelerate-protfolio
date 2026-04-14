import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../widgets/custom_icon_widget.dart';
import './widgets/auth_input_field.dart';
import './widgets/auth_toggle_button.dart';
import './widgets/biometric_prompt.dart';
import './widgets/social_login_button.dart';

class AuthenticationScreen extends StatefulWidget {
  const AuthenticationScreen({super.key});

  @override
  State<AuthenticationScreen> createState() => _AuthenticationScreenState();
}

class _AuthenticationScreenState extends State<AuthenticationScreen>
    with TickerProviderStateMixin {
  late AnimationController _logoController;
  late AnimationController _formController;
  late AnimationController _loadingController;
  late Animation<double> _logoAnimation;
  late Animation<double> _formAnimation;
  late Animation<double> _loadingAnimation;

  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _nameController = TextEditingController();
  final _confirmPasswordController = TextEditingController();

  bool _isLogin = true;
  bool _isLoading = false;
  bool _showEmailError = false;
  bool _showPasswordError = false;
  bool _showNameError = false;
  bool _showConfirmPasswordError = false;
  bool _showBiometric = false;
  bool _rememberMe = false;
  String? _emailError;
  String? _passwordError;
  String? _nameError;
  String? _confirmPasswordError;

  // Mock credentials for testing
  final Map<String, String> _mockCredentials = {
    'admin@servicepro.com': 'Admin123!',
    'user@servicepro.com': 'User123!',
    'demo@servicepro.com': 'Demo123!',
  };

  @override
  void initState() {
    super.initState();
    _initializeAnimations();
    _startAnimations();
  }

  void _initializeAnimations() {
    _logoController = AnimationController(
      duration: const Duration(milliseconds: 800),
      vsync: this,
    );
    _formController = AnimationController(
      duration: const Duration(milliseconds: 600),
      vsync: this,
    );
    _loadingController = AnimationController(
      duration: const Duration(milliseconds: 1000),
      vsync: this,
    );

    _logoAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _logoController,
      curve: Curves.elasticOut,
    ));

    _formAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _formController,
      curve: Curves.easeOutCubic,
    ));

    _loadingAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _loadingController,
      curve: Curves.easeInOut,
    ));
  }

  void _startAnimations() {
    _logoController.forward();
    Future.delayed(const Duration(milliseconds: 400), () {
      if (mounted) {
        _formController.forward();
      }
    });
  }

  @override
  void dispose() {
    _logoController.dispose();
    _formController.dispose();
    _loadingController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    _nameController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  void _validateInputs() {
    setState(() {
      _showEmailError = false;
      _showPasswordError = false;
      _showNameError = false;
      _showConfirmPasswordError = false;
    });

    bool hasErrors = false;

    // Email validation
    if (_emailController.text.isEmpty) {
      setState(() {
        _emailError = 'Email is required';
        _showEmailError = true;
      });
      hasErrors = true;
    } else if (!RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$')
        .hasMatch(_emailController.text)) {
      setState(() {
        _emailError = 'Please enter a valid email address';
        _showEmailError = true;
      });
      hasErrors = true;
    }

    // Password validation
    if (_passwordController.text.isEmpty) {
      setState(() {
        _passwordError = 'Password is required';
        _showPasswordError = true;
      });
      hasErrors = true;
    } else if (_passwordController.text.length < 6) {
      setState(() {
        _passwordError = 'Password must be at least 6 characters';
        _showPasswordError = true;
      });
      hasErrors = true;
    }

    // Name validation for signup
    if (!_isLogin && _nameController.text.isEmpty) {
      setState(() {
        _nameError = 'Full name is required';
        _showNameError = true;
      });
      hasErrors = true;
    }

    // Confirm password validation for signup
    if (!_isLogin &&
        _confirmPasswordController.text != _passwordController.text) {
      setState(() {
        _confirmPasswordError = 'Passwords do not match';
        _showConfirmPasswordError = true;
      });
      hasErrors = true;
    }

    if (!hasErrors) {
      _performAuthentication();
    }
  }

  void _performAuthentication() async {
    setState(() => _isLoading = true);
    _loadingController.forward();

    // Simulate network delay
    await Future.delayed(const Duration(seconds: 2));

    if (_isLogin) {
      // Check mock credentials
      if (_mockCredentials.containsKey(_emailController.text) &&
          _mockCredentials[_emailController.text] == _passwordController.text) {
        _handleAuthSuccess();
      } else {
        _handleAuthError(
            'Invalid email or password. Try:\nadmin@servicepro.com / Admin123!');
      }
    } else {
      // Simulate successful signup
      _handleAuthSuccess();
    }
  }

  void _handleAuthSuccess() {
    HapticFeedback.heavyImpact();
    setState(() => _isLoading = false);
    _loadingController.reset();

    // Show biometric prompt for first-time login
    if (_isLogin && !_showBiometric) {
      _showBiometricPrompt();
    } else {
      _navigateToHome();
    }
  }

  void _handleAuthError(String message) {
    setState(() => _isLoading = false);
    _loadingController.reset();

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: Theme.of(context).colorScheme.error,
        behavior: SnackBarBehavior.floating,
        margin: EdgeInsets.all(4.w),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
      ),
    );
  }

  void _showBiometricPrompt() {
    setState(() => _showBiometric = true);
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => BiometricPrompt(
        biometricType: 'fingerprint',
        onSuccess: () {
          Navigator.pop(context);
          _navigateToHome();
        },
        onCancel: () {
          Navigator.pop(context);
          _navigateToHome();
        },
      ),
    );
  }

  void _navigateToHome() {
    Navigator.pushNamedAndRemoveUntil(
      context,
      '/service-dashboard',
      (route) => false,
    );
  }

  void _handleSocialLogin(String provider) {
    // Simulate social login
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('$provider login will be implemented soon'),
        behavior: SnackBarBehavior.floating,
        margin: EdgeInsets.all(4.w),
      ),
    );
  }

  void _toggleAuthMode(bool isLogin) {
    setState(() {
      _isLogin = isLogin;
      _showEmailError = false;
      _showPasswordError = false;
      _showNameError = false;
      _showConfirmPasswordError = false;
    });
  }

  void _clearErrors() {
    setState(() {
      _showEmailError = false;
      _showPasswordError = false;
      _showNameError = false;
      _showConfirmPasswordError = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Scaffold(
      backgroundColor: colorScheme.surface,
      body: SafeArea(
        child: SingleChildScrollView(
          physics: const BouncingScrollPhysics(),
          child: Container(
            width: double.infinity,
            constraints: BoxConstraints(
              minHeight: MediaQuery.of(context).size.height -
                  MediaQuery.of(context).padding.top -
                  MediaQuery.of(context).padding.bottom,
            ),
            child: Column(
              children: [
                SizedBox(height: 4.h),

                // Logo section
                AnimatedBuilder(
                  animation: _logoAnimation,
                  builder: (context, child) {
                    return Transform.scale(
                      scale: _logoAnimation.value,
                      child: Container(
                        width: 20.w,
                        height: 20.w,
                        decoration: BoxDecoration(
                          gradient: LinearGradient(
                            colors: [
                              colorScheme.primary,
                              colorScheme.secondary,
                            ],
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                          ),
                          shape: BoxShape.circle,
                          boxShadow: [
                            BoxShadow(
                              color: colorScheme.primary.withValues(alpha: 0.3),
                              blurRadius: 16,
                              offset: const Offset(0, 8),
                            ),
                          ],
                        ),
                        child: Center(
                          child: CustomIconWidget(
                            iconName: 'home_repair_service',
                            size: 32,
                            color: colorScheme.onPrimary,
                          ),
                        ),
                      ),
                    );
                  },
                ),
                SizedBox(height: 2.h),

                Text(
                  'ServicePro',
                  style: TextStyle(
                    fontSize: 24.sp,
                    fontWeight: FontWeight.w700,
                    color: colorScheme.onSurface,
                    letterSpacing: -0.02,
                  ),
                ),
                SizedBox(height: 1.h),

                Text(
                  _isLogin ? 'Welcome back!' : 'Create your account',
                  style: TextStyle(
                    fontSize: 16.sp,
                    fontWeight: FontWeight.w400,
                    color: colorScheme.onSurfaceVariant,
                  ),
                ),
                SizedBox(height: 4.h),

                // Auth toggle
                FadeTransition(
                  opacity: _formAnimation,
                  child: AuthToggleButton(
                    isLogin: _isLogin,
                    onToggle: _toggleAuthMode,
                  ),
                ),
                SizedBox(height: 4.h),

                // Form section
                SlideTransition(
                  position: Tween<Offset>(
                    begin: const Offset(0, 0.3),
                    end: Offset.zero,
                  ).animate(_formAnimation),
                  child: FadeTransition(
                    opacity: _formAnimation,
                    child: Padding(
                      padding: EdgeInsets.symmetric(horizontal: 7.5.w),
                      child: Form(
                        key: _formKey,
                        child: Column(
                          children: [
                            // Name field (signup only)
                            if (!_isLogin) ...[
                              AuthInputField(
                                label: 'Full Name',
                                hint: 'Enter your full name',
                                iconName: 'person',
                                controller: _nameController,
                                showError: _showNameError,
                                errorText: _nameError,
                                onChanged: _clearErrors,
                              ),
                              SizedBox(height: 3.h),
                            ],

                            // Email field
                            AuthInputField(
                              label: 'Email Address',
                              hint: 'Enter your email',
                              iconName: 'email',
                              keyboardType: TextInputType.emailAddress,
                              controller: _emailController,
                              showError: _showEmailError,
                              errorText: _emailError,
                              onChanged: _clearErrors,
                            ),
                            SizedBox(height: 3.h),

                            // Password field
                            AuthInputField(
                              label: 'Password',
                              hint: 'Enter your password',
                              iconName: 'lock',
                              isPassword: true,
                              controller: _passwordController,
                              showError: _showPasswordError,
                              errorText: _passwordError,
                              onChanged: _clearErrors,
                            ),

                            // Confirm password field (signup only)
                            if (!_isLogin) ...[
                              SizedBox(height: 3.h),
                              AuthInputField(
                                label: 'Confirm Password',
                                hint: 'Confirm your password',
                                iconName: 'lock',
                                isPassword: true,
                                controller: _confirmPasswordController,
                                showError: _showConfirmPasswordError,
                                errorText: _confirmPasswordError,
                                onChanged: _clearErrors,
                              ),
                            ],

                            // Remember me / Forgot password
                            if (_isLogin) ...[
                              SizedBox(height: 2.h),
                              Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  Row(
                                    children: [
                                      Checkbox(
                                        value: _rememberMe,
                                        onChanged: (value) {
                                          setState(() {
                                            _rememberMe = value ?? false;
                                          });
                                        },
                                      ),
                                      Text(
                                        'Remember me',
                                        style: TextStyle(
                                          fontSize: 14.sp,
                                          fontWeight: FontWeight.w400,
                                          color: colorScheme.onSurfaceVariant,
                                        ),
                                      ),
                                    ],
                                  ),
                                  TextButton(
                                    onPressed: () {
                                      ScaffoldMessenger.of(context)
                                          .showSnackBar(
                                        SnackBar(
                                          content: const Text(
                                              'Password reset will be implemented soon'),
                                          behavior: SnackBarBehavior.floating,
                                          margin: EdgeInsets.all(4.w),
                                        ),
                                      );
                                    },
                                    child: Text(
                                      'Forgot Password?',
                                      style: TextStyle(
                                        fontSize: 14.sp,
                                        fontWeight: FontWeight.w500,
                                        color: colorScheme.primary,
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ],
                            SizedBox(height: 4.h),

                            // Login/Signup button
                            AnimatedBuilder(
                              animation: _loadingAnimation,
                              builder: (context, child) {
                                return Container(
                                  width: 85.w,
                                  height: 6.h,
                                  child: ElevatedButton(
                                    onPressed:
                                        _isLoading ? null : _validateInputs,
                                    style: ElevatedButton.styleFrom(
                                      backgroundColor: colorScheme.primary,
                                      foregroundColor: colorScheme.onPrimary,
                                      elevation: _isLoading ? 0 : 2,
                                      shape: RoundedRectangleBorder(
                                        borderRadius: BorderRadius.circular(12),
                                      ),
                                    ),
                                    child: _isLoading
                                        ? Row(
                                            mainAxisAlignment:
                                                MainAxisAlignment.center,
                                            children: [
                                              SizedBox(
                                                width: 5.w,
                                                height: 5.w,
                                                child:
                                                    CircularProgressIndicator(
                                                  strokeWidth: 2,
                                                  valueColor:
                                                      AlwaysStoppedAnimation<
                                                          Color>(
                                                    colorScheme.onPrimary,
                                                  ),
                                                ),
                                              ),
                                              SizedBox(width: 3.w),
                                              Text(
                                                _isLogin
                                                    ? 'Signing In...'
                                                    : 'Creating Account...',
                                                style: TextStyle(
                                                  fontSize: 16.sp,
                                                  fontWeight: FontWeight.w600,
                                                ),
                                              ),
                                            ],
                                          )
                                        : Text(
                                            _isLogin
                                                ? 'Sign In'
                                                : 'Create Account',
                                            style: TextStyle(
                                              fontSize: 16.sp,
                                              fontWeight: FontWeight.w600,
                                            ),
                                          ),
                                  ),
                                );
                              },
                            ),
                            SizedBox(height: 4.h),

                            // Divider
                            Row(
                              children: [
                                Expanded(
                                  child: Divider(
                                    color: colorScheme.outline
                                        .withValues(alpha: 0.3),
                                  ),
                                ),
                                Padding(
                                  padding:
                                      EdgeInsets.symmetric(horizontal: 4.w),
                                  child: Text(
                                    'or continue with',
                                    style: TextStyle(
                                      fontSize: 12.sp,
                                      fontWeight: FontWeight.w400,
                                      color: colorScheme.onSurfaceVariant,
                                    ),
                                  ),
                                ),
                                Expanded(
                                  child: Divider(
                                    color: colorScheme.outline
                                        .withValues(alpha: 0.3),
                                  ),
                                ),
                              ],
                            ),
                            SizedBox(height: 3.h),

                            // Social login buttons
                            Column(
                              children: [
                                SocialLoginButton(
                                  provider: 'Google',
                                  iconName: 'g_translate',
                                  onTap: () => _handleSocialLogin('Google'),
                                ),
                                SizedBox(height: 2.h),
                                SocialLoginButton(
                                  provider: 'Apple',
                                  iconName: 'apple',
                                  onTap: () => _handleSocialLogin('Apple'),
                                ),
                                SizedBox(height: 2.h),
                                SocialLoginButton(
                                  provider: 'Facebook',
                                  iconName: 'facebook',
                                  onTap: () => _handleSocialLogin('Facebook'),
                                ),
                              ],
                            ),
                            SizedBox(height: 4.h),

                            // Emergency access
                            TextButton(
                              onPressed: () {
                                Navigator.pushNamed(
                                    context, '/service-dashboard');
                              },
                              child: Text(
                                'Emergency Service Access',
                                style: TextStyle(
                                  fontSize: 14.sp,
                                  fontWeight: FontWeight.w500,
                                  color: colorScheme.error,
                                ),
                              ),
                            ),
                            SizedBox(height: 2.h),
                          ],
                        ),
                      ),
                    ),
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