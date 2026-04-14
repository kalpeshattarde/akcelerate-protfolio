import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class SpeechFeaturesWidget extends StatefulWidget {
  const SpeechFeaturesWidget({Key? key}) : super(key: key);

  @override
  State<SpeechFeaturesWidget> createState() => _SpeechFeaturesWidgetState();
}

class _SpeechFeaturesWidgetState extends State<SpeechFeaturesWidget>
    with TickerProviderStateMixin {
  late AnimationController _micController;
  late AnimationController _waveController;
  late Animation<double> _micAnimation;
  late Animation<double> _waveAnimation;

  bool isRecording = false;
  bool permissionGranted = false;
  String currentPhrase = "Hello, how are you?";
  double accuracy = 0.0;

  @override
  void initState() {
    super.initState();
    _micController = AnimationController(
      duration: const Duration(milliseconds: 1000),
      vsync: this,
    );
    _waveController = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    )..repeat();

    _micAnimation = Tween<double>(begin: 1.0, end: 1.2).animate(
      CurvedAnimation(parent: _micController, curve: Curves.easeInOut),
    );
    _waveAnimation = Tween<double>(begin: 0, end: 1).animate(
      CurvedAnimation(parent: _waveController, curve: Curves.easeInOut),
    );
  }

  void _requestMicrophonePermission() async {
    setState(() {
      permissionGranted = true;
    });

    // Simulate permission request success
    await Future.delayed(const Duration(milliseconds: 500));
    _showPronunciationDemo();
  }

  void _showPronunciationDemo() async {
    setState(() {
      isRecording = true;
    });

    _micController.repeat(reverse: true);

    // Simulate recording and analysis
    await Future.delayed(const Duration(milliseconds: 3000));

    setState(() {
      isRecording = false;
      accuracy = 0.85; // 85% accuracy
    });

    _micController.stop();
    _micController.reset();
  }

  @override
  void dispose() {
    _micController.dispose();
    _waveController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SizedBox(height: 4.h),
        Text(
          'Speech Recognition',
          style: AppTheme.lightTheme.textTheme.headlineMedium?.copyWith(
            fontWeight: FontWeight.bold,
            color: AppTheme.lightTheme.colorScheme.onSurface,
          ),
          textAlign: TextAlign.center,
        ),
        SizedBox(height: 2.h),
        Text(
          'Practice pronunciation with AI-powered\nspeech recognition and instant feedback',
          style: AppTheme.lightTheme.textTheme.bodyLarge?.copyWith(
            color: AppTheme.lightTheme.colorScheme.onSurface
                .withValues(alpha: 0.7),
          ),
          textAlign: TextAlign.center,
        ),
        SizedBox(height: 6.h),

        // Microphone Section
        Container(
          padding: EdgeInsets.all(6.w),
          margin: EdgeInsets.symmetric(horizontal: 6.w),
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [
                AppTheme.lightTheme.colorScheme.primary.withValues(alpha: 0.1),
                AppTheme.lightTheme.colorScheme.secondary
                    .withValues(alpha: 0.1),
              ],
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
            ),
            borderRadius: BorderRadius.circular(20),
            border: Border.all(
              color: AppTheme.lightTheme.colorScheme.primary
                  .withValues(alpha: 0.3),
            ),
          ),
          child: Column(
            children: [
              // Microphone with waves
              Stack(
                alignment: Alignment.center,
                children: [
                  // Animated waves
                  if (isRecording)
                    ...List.generate(3, (index) {
                      return AnimatedBuilder(
                        animation: _waveAnimation,
                        builder: (context, child) {
                          final delay = index * 0.3;
                          final animationValue =
                              (_waveAnimation.value + delay) % 1.0;

                          return Container(
                            width: (20 + (index * 10)).w * (1 + animationValue),
                            height:
                                (20 + (index * 10)).w * (1 + animationValue),
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              border: Border.all(
                                color: AppTheme.lightTheme.colorScheme.primary
                                    .withValues(
                                        alpha: 0.3 - (animationValue * 0.3)),
                                width: 2,
                              ),
                            ),
                          );
                        },
                      );
                    }),

                  // Microphone button
                  AnimatedBuilder(
                    animation: _micAnimation,
                    builder: (context, child) {
                      return Transform.scale(
                        scale: _micAnimation.value,
                        child: GestureDetector(
                          onTap: permissionGranted
                              ? _showPronunciationDemo
                              : _requestMicrophonePermission,
                          child: Container(
                            width: 20.w,
                            height: 20.w,
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              color: isRecording
                                  ? Colors.red
                                  : AppTheme.lightTheme.colorScheme.primary,
                              boxShadow: [
                                BoxShadow(
                                  color: (isRecording
                                          ? Colors.red
                                          : AppTheme
                                              .lightTheme.colorScheme.primary)
                                      .withValues(alpha: 0.3),
                                  blurRadius: 20,
                                  spreadRadius: 5,
                                ),
                              ],
                            ),
                            child: Center(
                              child: CustomIconWidget(
                                iconName: isRecording ? 'stop' : 'mic',
                                color: Colors.white,
                                size: 8.w,
                              ),
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                ],
              ),

              SizedBox(height: 4.h),

              // Status text
              Text(
                isRecording
                    ? 'Listening...'
                    : permissionGranted
                        ? 'Tap to practice pronunciation'
                        : 'Tap to enable microphone',
                style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w600,
                  color: isRecording
                      ? Colors.red
                      : AppTheme.lightTheme.colorScheme.primary,
                ),
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),

        SizedBox(height: 4.h),

        // Practice phrase section
        if (permissionGranted) ...[
          Container(
            padding: EdgeInsets.all(4.w),
            margin: EdgeInsets.symmetric(horizontal: 6.w),
            decoration: BoxDecoration(
              color: AppTheme.lightTheme.colorScheme.surface,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(
                color: AppTheme.lightTheme.colorScheme.outline
                    .withValues(alpha: 0.2),
              ),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.05),
                  blurRadius: 10,
                  offset: const Offset(0, 2),
                ),
              ],
            ),
            child: Column(
              children: [
                Row(
                  children: [
                    CustomIconWidget(
                      iconName: 'record_voice_over',
                      color: AppTheme.lightTheme.colorScheme.primary,
                      size: 6.w,
                    ),
                    SizedBox(width: 3.w),
                    Text(
                      'Practice Phrase',
                      style:
                          AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                ),
                SizedBox(height: 2.h),
                Container(
                  width: double.infinity,
                  padding: EdgeInsets.all(3.w),
                  decoration: BoxDecoration(
                    color: AppTheme.lightTheme.colorScheme.primary
                        .withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(
                    currentPhrase,
                    style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.w500,
                      color: AppTheme.lightTheme.colorScheme.primary,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ),

                // Accuracy feedback
                if (accuracy > 0) ...[
                  SizedBox(height: 3.h),
                  Row(
                    children: [
                      CustomIconWidget(
                        iconName: 'check_circle',
                        color: AppTheme.getSuccessColor(true),
                        size: 5.w,
                      ),
                      SizedBox(width: 2.w),
                      Text(
                        'Accuracy: ${(accuracy * 100).toInt()}%',
                        style:
                            AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.w600,
                          color: AppTheme.getSuccessColor(true),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 1.h),
                  ClipRRect(
                    borderRadius: BorderRadius.circular(10),
                    child: LinearProgressIndicator(
                      value: accuracy,
                      backgroundColor:
                          AppTheme.getSuccessColor(true).withValues(alpha: 0.2),
                      valueColor: AlwaysStoppedAnimation<Color>(
                          AppTheme.getSuccessColor(true)),
                      minHeight: 1.h,
                    ),
                  ),
                ],
              ],
            ),
          ),
          SizedBox(height: 4.h),
        ],

        // Features list
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            _buildFeatureCard('Real-time\nFeedback', 'feedback'),
            _buildFeatureCard('Accent\nTraining', 'hearing'),
            _buildFeatureCard('Progress\nTracking', 'trending_up'),
          ],
        ),
      ],
    );
  }

  Widget _buildFeatureCard(String title, String iconName) {
    return Container(
      width: 25.w,
      padding: EdgeInsets.all(3.w),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.secondary.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color:
              AppTheme.lightTheme.colorScheme.secondary.withValues(alpha: 0.2),
        ),
      ),
      child: Column(
        children: [
          CustomIconWidget(
            iconName: iconName,
            color: AppTheme.lightTheme.colorScheme.secondary,
            size: 6.w,
          ),
          SizedBox(height: 1.h),
          Text(
            title,
            style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
              fontWeight: FontWeight.w500,
              color: AppTheme.lightTheme.colorScheme.secondary,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}
