import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class SocialLoginWidget extends StatefulWidget {
  final Function(String provider) onSocialLogin;
  final bool isLoading;

  const SocialLoginWidget({
    Key? key,
    required this.onSocialLogin,
    required this.isLoading,
  }) : super(key: key);

  @override
  State<SocialLoginWidget> createState() => _SocialLoginWidgetState();
}

class _SocialLoginWidgetState extends State<SocialLoginWidget>
    with TickerProviderStateMixin {
  late AnimationController _elasticController;
  late Animation<double> _elasticAnimation;
  String? _pressedButton;

  @override
  void initState() {
    super.initState();
    _elasticController = AnimationController(
      duration: const Duration(milliseconds: 200),
      vsync: this,
    );

    _elasticAnimation = Tween<double>(
      begin: 1.0,
      end: 0.95,
    ).animate(CurvedAnimation(
      parent: _elasticController,
      curve: Curves.elasticOut,
    ));
  }

  @override
  void dispose() {
    _elasticController.dispose();
    super.dispose();
  }

  void _handleButtonPress(String provider) async {
    if (widget.isLoading) return;

    setState(() {
      _pressedButton = provider;
    });

    await _elasticController.forward();
    await _elasticController.reverse();

    widget.onSocialLogin(provider);

    setState(() {
      _pressedButton = null;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 6.w),
      child: Column(
        children: [
          // Divider with "OR"
          Row(
            children: [
              Expanded(
                child: Container(
                  height: 1,
                  color: AppTheme.lightTheme.colorScheme.onSurface
                      .withValues(alpha: 0.2),
                ),
              ),
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 4.w),
                child: Text(
                  'OR',
                  style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                    color: AppTheme.lightTheme.colorScheme.onSurface
                        .withValues(alpha: 0.6),
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
              Expanded(
                child: Container(
                  height: 1,
                  color: AppTheme.lightTheme.colorScheme.onSurface
                      .withValues(alpha: 0.2),
                ),
              ),
            ],
          ),
          SizedBox(height: 4.h),

          // Social Login Title
          Text(
            'Continue with',
            style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurface
                  .withValues(alpha: 0.8),
              fontWeight: FontWeight.w500,
            ),
          ),
          SizedBox(height: 3.h),

          // Social Login Buttons
          Column(
            children: [
              // Google Sign-In Button
              AnimatedBuilder(
                animation: _elasticAnimation,
                builder: (context, child) {
                  return Transform.scale(
                    scale: _pressedButton == 'google'
                        ? _elasticAnimation.value
                        : 1.0,
                    child: Container(
                      width: double.infinity,
                      height: 7.h,
                      margin: EdgeInsets.only(bottom: 2.h),
                      child: ElevatedButton(
                        onPressed: widget.isLoading
                            ? null
                            : () => _handleButtonPress('google'),
                        style: ElevatedButton.styleFrom(
                          backgroundColor:
                              AppTheme.lightTheme.colorScheme.surface,
                          foregroundColor:
                              AppTheme.lightTheme.colorScheme.onSurface,
                          elevation: 2,
                          shadowColor: AppTheme.lightTheme.colorScheme.primary
                              .withValues(alpha: 0.1),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(16),
                            side: BorderSide(
                              color: AppTheme.lightTheme.colorScheme.onSurface
                                  .withValues(alpha: 0.1),
                              width: 1,
                            ),
                          ),
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            // Google Icon (using a colored container as placeholder)
                            Container(
                              width: 6.w,
                              height: 6.w,
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                gradient: LinearGradient(
                                  colors: [
                                    Colors.red,
                                    Colors.orange,
                                    Colors.yellow,
                                    Colors.green,
                                  ],
                                ),
                              ),
                              child: Center(
                                child: Text(
                                  'G',
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 3.w,
                                  ),
                                ),
                              ),
                            ),
                            SizedBox(width: 3.w),
                            Text(
                              'Continue with Google',
                              style: AppTheme.lightTheme.textTheme.titleMedium
                                  ?.copyWith(
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  );
                },
              ),

              // Apple Sign-In Button (iOS style)
              AnimatedBuilder(
                animation: _elasticAnimation,
                builder: (context, child) {
                  return Transform.scale(
                    scale: _pressedButton == 'apple'
                        ? _elasticAnimation.value
                        : 1.0,
                    child: Container(
                      width: double.infinity,
                      height: 7.h,
                      margin: EdgeInsets.only(bottom: 2.h),
                      child: ElevatedButton(
                        onPressed: widget.isLoading
                            ? null
                            : () => _handleButtonPress('apple'),
                        style: ElevatedButton.styleFrom(
                          backgroundColor:
                              AppTheme.lightTheme.colorScheme.primary,
                          foregroundColor:
                              AppTheme.lightTheme.colorScheme.onPrimary,
                          elevation: 2,
                          shadowColor: AppTheme.lightTheme.colorScheme.primary
                              .withValues(alpha: 0.3),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(16),
                          ),
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            CustomIconWidget(
                              iconName: 'apple',
                              color: AppTheme.lightTheme.colorScheme.onPrimary,
                              size: 6.w,
                            ),
                            SizedBox(width: 3.w),
                            Text(
                              'Continue with Apple',
                              style: AppTheme.lightTheme.textTheme.titleMedium
                                  ?.copyWith(
                                color:
                                    AppTheme.lightTheme.colorScheme.onPrimary,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  );
                },
              ),

              // Facebook Sign-In Button
              AnimatedBuilder(
                animation: _elasticAnimation,
                builder: (context, child) {
                  return Transform.scale(
                    scale: _pressedButton == 'facebook'
                        ? _elasticAnimation.value
                        : 1.0,
                    child: Container(
                      width: double.infinity,
                      height: 7.h,
                      child: ElevatedButton(
                        onPressed: widget.isLoading
                            ? null
                            : () => _handleButtonPress('facebook'),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF1877F2),
                          foregroundColor: Colors.white,
                          elevation: 2,
                          shadowColor:
                              const Color(0xFF1877F2).withValues(alpha: 0.3),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(16),
                          ),
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            CustomIconWidget(
                              iconName: 'facebook',
                              color: Colors.white,
                              size: 6.w,
                            ),
                            SizedBox(width: 3.w),
                            Text(
                              'Continue with Facebook',
                              style: AppTheme.lightTheme.textTheme.titleMedium
                                  ?.copyWith(
                                color: Colors.white,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  );
                },
              ),
            ],
          ),
        ],
      ),
    );
  }
}
