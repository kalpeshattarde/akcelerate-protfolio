import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../widgets/custom_icon_widget.dart';

/// Splash Screen for Melodic Player
/// Provides branded app launch experience while initializing music streaming services
class SplashScreen extends StatefulWidget {
  const SplashScreen({Key? key}) : super(key: key);

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _scaleAnimation;
  late Animation<double> _fadeAnimation;
  bool _isInitializing = true;
  bool _showRetry = false;

  @override
  void initState() {
    super.initState();
    _setupAnimations();
    _initializeApp();
  }

  void _setupAnimations() {
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    );

    _scaleAnimation = Tween<double>(begin: 0.8, end: 1.0).animate(
      CurvedAnimation(parent: _animationController, curve: Curves.easeOutCubic),
    );

    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _animationController, curve: Curves.easeIn),
    );

    _animationController.forward();
  }

  Future<void> _initializeApp() async {
    try {
      // Hide system UI for immersive splash experience
      SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersive);

      // Simulate initialization tasks
      await Future.wait([
        _checkAuthentication(),
        _loadUserPreferences(),
        _fetchMusicCatalogs(),
        _prepareCachedPlaylists(),
        Future.delayed(const Duration(seconds: 2)), // Minimum display time
      ]);

      if (mounted) {
        // Restore system UI
        SystemChrome.setEnabledSystemUIMode(
          SystemUiMode.manual,
          overlays: SystemUiOverlay.values,
        );

        // Navigate based on authentication status
        _navigateToNextScreen();
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _isInitializing = false;
          _showRetry = true;
        });

        // Show retry option after 5 seconds
        Future.delayed(const Duration(seconds: 5), () {
          if (mounted && _showRetry) {
            setState(() => _showRetry = true);
          }
        });
      }
    }
  }

  Future<void> _checkAuthentication() async {
    // Simulate authentication check
    await Future.delayed(const Duration(milliseconds: 500));
  }

  Future<void> _loadUserPreferences() async {
    // Simulate loading user preferences
    await Future.delayed(const Duration(milliseconds: 300));
  }

  Future<void> _fetchMusicCatalogs() async {
    // Simulate fetching music catalogs
    await Future.delayed(const Duration(milliseconds: 800));
  }

  Future<void> _prepareCachedPlaylists() async {
    // Simulate preparing cached playlists
    await Future.delayed(const Duration(milliseconds: 400));
  }

  void _navigateToNextScreen() {
    // Navigate to login screen after splash
    Navigator.pushReplacementNamed(context, '/login-screen');
  }

  void _retryInitialization() {
    setState(() {
      _isInitializing = true;
      _showRetry = false;
    });
    _initializeApp();
  }

  @override
  void dispose() {
    _animationController.dispose();
    SystemChrome.setEnabledSystemUIMode(
      SystemUiMode.manual,
      overlays: SystemUiOverlay.values,
    );
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final size = MediaQuery.of(context).size;

    return Scaffold(
      body: Container(
        width: size.width,
        height: size.height,
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [theme.colorScheme.surface, theme.scaffoldBackgroundColor],
          ),
        ),
        child: SafeArea(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Spacer(flex: 2),
              _buildLogo(theme),
              SizedBox(height: 8.h),
              _buildLoadingIndicator(theme),
              const Spacer(flex: 2),
              _buildVersionInfo(theme),
              SizedBox(height: 4.h),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildLogo(ThemeData theme) {
    return AnimatedBuilder(
      animation: _animationController,
      builder: (context, child) {
        return Transform.scale(
          scale: _scaleAnimation.value,
          child: Opacity(
            opacity: _fadeAnimation.value,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  width: 24.w,
                  height: 24.w,
                  decoration: BoxDecoration(
                    color: theme.colorScheme.primary.withValues(alpha: 0.2),
                    shape: BoxShape.circle,
                  ),
                  child: Center(
                    child: CustomIconWidget(
                      iconName: 'music_note',
                      color: theme.colorScheme.primary,
                      size: 12.w,
                    ),
                  ),
                ),
                SizedBox(height: 4.h),
                Text(
                  'SONORA',
                  style: theme.textTheme.displaySmall?.copyWith(
                    color: theme.colorScheme.primary,
                    fontWeight: FontWeight.w700,
                    letterSpacing: 2.0,
                  ),
                ),
                SizedBox(height: 1.h),
                Text(
                  'Your Music, Your Mood',
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: theme.colorScheme.onSurfaceVariant,
                    letterSpacing: 0.5,
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildLoadingIndicator(ThemeData theme) {
    if (_showRetry) {
      return Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            'Connection timeout',
            style: theme.textTheme.bodyMedium?.copyWith(
              color: theme.colorScheme.error,
            ),
          ),
          SizedBox(height: 2.h),
          ElevatedButton(
            onPressed: _retryInitialization,
            style: ElevatedButton.styleFrom(
              backgroundColor: theme.colorScheme.primary,
              foregroundColor: theme.scaffoldBackgroundColor,
              padding: EdgeInsets.symmetric(horizontal: 8.w, vertical: 1.5.h),
            ),
            child: Text(
              'Retry',
              style: theme.textTheme.labelLarge?.copyWith(
                color: theme.scaffoldBackgroundColor,
              ),
            ),
          ),
        ],
      );
    }

    if (_isInitializing) {
      return SizedBox(
        width: 8.w,
        height: 8.w,
        child: CircularProgressIndicator(
          strokeWidth: 3,
          valueColor: AlwaysStoppedAnimation<Color>(theme.colorScheme.primary),
        ),
      );
    }

    return const SizedBox.shrink();
  }

  Widget _buildVersionInfo(ThemeData theme) {
    return Text(
      'Version 1.0.0',
      style: theme.textTheme.bodySmall?.copyWith(
        color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.6),
        fontSize: 10.sp,
      ),
    );
  }
}
