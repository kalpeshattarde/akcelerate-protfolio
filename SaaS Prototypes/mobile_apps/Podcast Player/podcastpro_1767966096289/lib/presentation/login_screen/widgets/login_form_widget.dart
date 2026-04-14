import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class LoginFormWidget extends StatefulWidget {
  final Function(String email, String password) onLogin;
  final bool isLoading;

  const LoginFormWidget({
    Key? key,
    required this.onLogin,
    required this.isLoading,
  }) : super(key: key);

  @override
  State<LoginFormWidget> createState() => _LoginFormWidgetState();
}

class _LoginFormWidgetState extends State<LoginFormWidget>
    with TickerProviderStateMixin {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _formKey = GlobalKey<FormState>();

  bool _isPasswordVisible = false;
  bool _isEmailValid = false;
  bool _isPasswordValid = false;
  String? _emailError;
  String? _passwordError;

  late AnimationController _breathingController;
  late AnimationController _focusController;
  late Animation<double> _breathingAnimation;
  late Animation<double> _focusAnimation;

  @override
  void initState() {
    super.initState();
    _breathingController = AnimationController(
      duration: const Duration(seconds: 2),
      vsync: this,
    )..repeat(reverse: true);

    _focusController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );

    _breathingAnimation = Tween<double>(
      begin: 0.95,
      end: 1.05,
    ).animate(CurvedAnimation(
      parent: _breathingController,
      curve: Curves.easeInOut,
    ));

    _focusAnimation = Tween<double>(
      begin: 1.0,
      end: 1.02,
    ).animate(CurvedAnimation(
      parent: _focusController,
      curve: Curves.elasticOut,
    ));
  }

  @override
  void dispose() {
    _breathingController.dispose();
    _focusController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  void _validateEmail(String value) {
    setState(() {
      if (value.isEmpty) {
        _emailError = 'Email is required';
        _isEmailValid = false;
      } else if (!RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$').hasMatch(value)) {
        _emailError = 'Please enter a valid email';
        _isEmailValid = false;
      } else {
        _emailError = null;
        _isEmailValid = true;
      }
    });
  }

  void _validatePassword(String value) {
    setState(() {
      if (value.isEmpty) {
        _passwordError = 'Password is required';
        _isPasswordValid = false;
      } else if (value.length < 6) {
        _passwordError = 'Password must be at least 6 characters';
        _isPasswordValid = false;
      } else {
        _passwordError = null;
        _isPasswordValid = true;
      }
    });
  }

  String _getPasswordStrength(String password) {
    if (password.length < 6) return 'Weak';
    if (password.length < 8) return 'Fair';
    if (password.contains(RegExp(r'[A-Z]')) &&
        password.contains(RegExp(r'[0-9]')) &&
        password.contains(RegExp(r'[!@#$%^&*(),.?":{}|<>]'))) {
      return 'Strong';
    }
    return 'Good';
  }

  Color _getStrengthColor(String strength) {
    switch (strength) {
      case 'Weak':
        return Colors.red;
      case 'Fair':
        return Colors.orange;
      case 'Good':
        return Colors.blue;
      case 'Strong':
        return Colors.green;
      default:
        return Colors.grey;
    }
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _breathingAnimation,
      builder: (context, child) {
        return Transform.scale(
          scale: _breathingAnimation.value,
          child: Container(
            margin: EdgeInsets.symmetric(horizontal: 6.w),
            padding: EdgeInsets.all(6.w),
            decoration: BoxDecoration(
              color: AppTheme.lightTheme.colorScheme.surface
                  .withValues(alpha: 0.9),
              borderRadius: BorderRadius.circular(24),
              boxShadow: [
                BoxShadow(
                  color: AppTheme.lightTheme.colorScheme.primary
                      .withValues(alpha: 0.1),
                  blurRadius: 20,
                  offset: const Offset(0, 10),
                ),
              ],
            ),
            child: Form(
              key: _formKey,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Welcome Text
                  Text(
                    'Welcome Back',
                    style:
                        AppTheme.lightTheme.textTheme.headlineSmall?.copyWith(
                      fontWeight: FontWeight.w700,
                      color: AppTheme.lightTheme.colorScheme.primary,
                    ),
                  ),
                  SizedBox(height: 1.h),
                  Text(
                    'Sign in to continue your podcast journey',
                    style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                      color: AppTheme.lightTheme.colorScheme.onSurface
                          .withValues(alpha: 0.7),
                    ),
                  ),
                  SizedBox(height: 4.h),

                  // Email Field
                  AnimatedBuilder(
                    animation: _focusAnimation,
                    builder: (context, child) {
                      return Transform.scale(
                        scale: _focusAnimation.value,
                        child: Container(
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(16),
                            gradient: _isEmailValid
                                ? LinearGradient(
                                    colors: [
                                      Colors.green.withValues(alpha: 0.1),
                                      Colors.green.withValues(alpha: 0.05),
                                    ],
                                  )
                                : _emailError != null
                                    ? LinearGradient(
                                        colors: [
                                          Colors.red.withValues(alpha: 0.1),
                                          Colors.red.withValues(alpha: 0.05),
                                        ],
                                      )
                                    : null,
                          ),
                          child: TextFormField(
                            controller: _emailController,
                            keyboardType: TextInputType.emailAddress,
                            onChanged: _validateEmail,
                            onTap: () => _focusController.forward(),
                            onEditingComplete: () => _focusController.reverse(),
                            decoration: InputDecoration(
                              labelText: 'Email Address',
                              hintText: 'Enter your email',
                              prefixIcon: Padding(
                                padding: EdgeInsets.all(3.w),
                                child: CustomIconWidget(
                                  iconName: 'email',
                                  color: _isEmailValid
                                      ? Colors.green
                                      : _emailError != null
                                          ? Colors.red
                                          : AppTheme
                                              .lightTheme.colorScheme.onSurface
                                              .withValues(alpha: 0.6),
                                  size: 5.w,
                                ),
                              ),
                              suffixIcon: _isEmailValid
                                  ? Padding(
                                      padding: EdgeInsets.all(3.w),
                                      child: CustomIconWidget(
                                        iconName: 'check_circle',
                                        color: Colors.green,
                                        size: 5.w,
                                      ),
                                    )
                                  : null,
                              errorText: _emailError,
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                  SizedBox(height: 3.h),

                  // Password Field
                  AnimatedBuilder(
                    animation: _focusAnimation,
                    builder: (context, child) {
                      return Transform.scale(
                        scale: _focusAnimation.value,
                        child: Container(
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(16),
                            gradient: _isPasswordValid
                                ? LinearGradient(
                                    colors: [
                                      Colors.green.withValues(alpha: 0.1),
                                      Colors.green.withValues(alpha: 0.05),
                                    ],
                                  )
                                : _passwordError != null
                                    ? LinearGradient(
                                        colors: [
                                          Colors.red.withValues(alpha: 0.1),
                                          Colors.red.withValues(alpha: 0.05),
                                        ],
                                      )
                                    : null,
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              TextFormField(
                                controller: _passwordController,
                                obscureText: !_isPasswordVisible,
                                onChanged: _validatePassword,
                                onTap: () => _focusController.forward(),
                                onEditingComplete: () =>
                                    _focusController.reverse(),
                                decoration: InputDecoration(
                                  labelText: 'Password',
                                  hintText: 'Enter your password',
                                  prefixIcon: Padding(
                                    padding: EdgeInsets.all(3.w),
                                    child: CustomIconWidget(
                                      iconName: 'lock',
                                      color: _isPasswordValid
                                          ? Colors.green
                                          : _passwordError != null
                                              ? Colors.red
                                              : AppTheme.lightTheme.colorScheme
                                                  .onSurface
                                                  .withValues(alpha: 0.6),
                                      size: 5.w,
                                    ),
                                  ),
                                  suffixIcon: IconButton(
                                    onPressed: () {
                                      setState(() {
                                        _isPasswordVisible =
                                            !_isPasswordVisible;
                                      });
                                    },
                                    icon: CustomIconWidget(
                                      iconName: _isPasswordVisible
                                          ? 'visibility_off'
                                          : 'visibility',
                                      color: AppTheme
                                          .lightTheme.colorScheme.onSurface
                                          .withValues(alpha: 0.6),
                                      size: 5.w,
                                    ),
                                  ),
                                  errorText: _passwordError,
                                ),
                              ),
                              if (_passwordController.text.isNotEmpty) ...[
                                SizedBox(height: 1.h),
                                Padding(
                                  padding:
                                      EdgeInsets.symmetric(horizontal: 4.w),
                                  child: Row(
                                    children: [
                                      Text(
                                        'Strength: ',
                                        style: AppTheme
                                            .lightTheme.textTheme.bodySmall,
                                      ),
                                      Text(
                                        _getPasswordStrength(
                                            _passwordController.text),
                                        style: AppTheme
                                            .lightTheme.textTheme.bodySmall
                                            ?.copyWith(
                                          color: _getStrengthColor(
                                              _getPasswordStrength(
                                                  _passwordController.text)),
                                          fontWeight: FontWeight.w600,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ],
                          ),
                        ),
                      );
                    },
                  ),
                  SizedBox(height: 2.h),

                  // Forgot Password Link
                  Align(
                    alignment: Alignment.centerRight,
                    child: TextButton(
                      onPressed: () {
                        // Handle forgot password
                      },
                      child: Text(
                        'Forgot Password?',
                        style:
                            AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                          color: AppTheme.lightTheme.colorScheme.secondary,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ),
                  ),
                  SizedBox(height: 3.h),

                  // Login Button
                  SizedBox(
                    width: double.infinity,
                    height: 7.h,
                    child: ElevatedButton(
                      onPressed: (_isEmailValid &&
                              _isPasswordValid &&
                              !widget.isLoading)
                          ? () {
                              widget.onLogin(_emailController.text,
                                  _passwordController.text);
                            }
                          : null,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: (_isEmailValid && _isPasswordValid)
                            ? AppTheme.lightTheme.colorScheme.secondary
                            : AppTheme.lightTheme.colorScheme.onSurface
                                .withValues(alpha: 0.3),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(16),
                        ),
                        elevation: (_isEmailValid && _isPasswordValid) ? 4 : 0,
                      ),
                      child: widget.isLoading
                          ? SizedBox(
                              width: 6.w,
                              height: 6.w,
                              child: CircularProgressIndicator(
                                strokeWidth: 2,
                                valueColor: AlwaysStoppedAnimation<Color>(
                                  AppTheme.lightTheme.colorScheme.onSecondary,
                                ),
                              ),
                            )
                          : Text(
                              'Sign In',
                              style: AppTheme.lightTheme.textTheme.titleMedium
                                  ?.copyWith(
                                color:
                                    AppTheme.lightTheme.colorScheme.onSecondary,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
