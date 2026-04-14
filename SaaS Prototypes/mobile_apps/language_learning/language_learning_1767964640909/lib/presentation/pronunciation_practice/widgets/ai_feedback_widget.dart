import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class AiFeedbackWidget extends StatefulWidget {
  final double pronunciationScore;
  final List<String> problematicSounds;
  final List<String> improvementSuggestions;
  final String? userRecordingPath;
  final String? nativeRecordingPath;

  const AiFeedbackWidget({
    Key? key,
    required this.pronunciationScore,
    required this.problematicSounds,
    required this.improvementSuggestions,
    this.userRecordingPath,
    this.nativeRecordingPath,
  }) : super(key: key);

  @override
  State<AiFeedbackWidget> createState() => _AiFeedbackWidgetState();
}

class _AiFeedbackWidgetState extends State<AiFeedbackWidget>
    with TickerProviderStateMixin {
  late AnimationController _scoreController;
  late Animation<double> _scoreAnimation;
  bool _isPlayingUser = false;
  bool _isPlayingNative = false;

  @override
  void initState() {
    super.initState();
    _scoreController = AnimationController(
      duration: Duration(milliseconds: 1500),
      vsync: this,
    );

    _scoreAnimation =
        Tween<double>(begin: 0.0, end: widget.pronunciationScore / 100).animate(
      CurvedAnimation(parent: _scoreController, curve: Curves.easeOutCubic),
    );

    // Start animation after a short delay
    Future.delayed(Duration(milliseconds: 300), () {
      if (mounted) {
        _scoreController.forward();
      }
    });
  }

  @override
  void dispose() {
    _scoreController.dispose();
    super.dispose();
  }

  Color _getScoreColor(double score) {
    if (score >= 80) return AppTheme.getSuccessColor(true);
    if (score >= 60) return AppTheme.getWarningColor(true);
    return AppTheme.lightTheme.colorScheme.error;
  }

  String _getScoreLabel(double score) {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Good';
    if (score >= 70) return 'Fair';
    if (score >= 60) return 'Needs Practice';
    return 'Keep Trying';
  }

  void _playUserRecording() {
    if (widget.userRecordingPath != null) {
      setState(() {
        _isPlayingUser = true;
      });

      // Simulate playback duration
      Future.delayed(Duration(seconds: 2), () {
        if (mounted) {
          setState(() {
            _isPlayingUser = false;
          });
        }
      });
    }
  }

  void _playNativeRecording() {
    if (widget.nativeRecordingPath != null) {
      setState(() {
        _isPlayingNative = true;
      });

      // Simulate playback duration
      Future.delayed(Duration(seconds: 2), () {
        if (mounted) {
          setState(() {
            _isPlayingNative = false;
          });
        }
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
      padding: EdgeInsets.all(6.w),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.08),
            blurRadius: 12,
            offset: Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              CustomIconWidget(
                iconName: 'psychology',
                color: AppTheme.lightTheme.colorScheme.primary,
                size: 6.w,
              ),
              SizedBox(width: 2.w),
              Text(
                'AI Pronunciation Analysis',
                style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),

          SizedBox(height: 4.h),

          // Score visualization
          Center(
            child: Container(
              width: 40.w,
              height: 40.w,
              child: AnimatedBuilder(
                animation: _scoreAnimation,
                builder: (context, child) {
                  return Stack(
                    alignment: Alignment.center,
                    children: [
                      SizedBox(
                        width: 40.w,
                        height: 40.w,
                        child: CircularProgressIndicator(
                          value: _scoreAnimation.value,
                          strokeWidth: 8,
                          backgroundColor: AppTheme
                              .lightTheme.colorScheme.outline
                              .withValues(alpha: 0.2),
                          valueColor: AlwaysStoppedAnimation<Color>(
                            _getScoreColor(widget.pronunciationScore),
                          ),
                        ),
                      ),
                      Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            '${(widget.pronunciationScore * _scoreAnimation.value).toInt()}%',
                            style: AppTheme.lightTheme.textTheme.headlineSmall
                                ?.copyWith(
                              color: _getScoreColor(widget.pronunciationScore),
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                          Text(
                            _getScoreLabel(widget.pronunciationScore),
                            style: AppTheme.lightTheme.textTheme.bodySmall
                                ?.copyWith(
                              color: AppTheme
                                  .lightTheme.colorScheme.onSurfaceVariant,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ],
                      ),
                    ],
                  );
                },
              ),
            ),
          ),

          SizedBox(height: 4.h),

          // Audio comparison
          if (widget.userRecordingPath != null &&
              widget.nativeRecordingPath != null) ...[
            Text(
              'Audio Comparison',
              style: AppTheme.lightTheme.textTheme.titleSmall?.copyWith(
                fontWeight: FontWeight.w600,
              ),
            ),
            SizedBox(height: 2.h),
            Row(
              children: [
                Expanded(
                  child: GestureDetector(
                    onTap: _playUserRecording,
                    child: Container(
                      padding: EdgeInsets.all(4.w),
                      decoration: BoxDecoration(
                        color: _isPlayingUser
                            ? AppTheme.lightTheme.colorScheme.primary
                                .withValues(alpha: 0.1)
                            : AppTheme.lightTheme.colorScheme.surface,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(
                          color: _isPlayingUser
                              ? AppTheme.lightTheme.colorScheme.primary
                              : AppTheme.lightTheme.colorScheme.outline
                                  .withValues(alpha: 0.3),
                        ),
                      ),
                      child: Column(
                        children: [
                          CustomIconWidget(
                            iconName: _isPlayingUser ? 'pause' : 'play_arrow',
                            color: _isPlayingUser
                                ? AppTheme.lightTheme.colorScheme.primary
                                : AppTheme.lightTheme.colorScheme.onSurface,
                            size: 8.w,
                          ),
                          SizedBox(height: 1.h),
                          Text(
                            'Your Recording',
                            style: AppTheme.lightTheme.textTheme.bodySmall
                                ?.copyWith(
                              color: _isPlayingUser
                                  ? AppTheme.lightTheme.colorScheme.primary
                                  : AppTheme
                                      .lightTheme.colorScheme.onSurfaceVariant,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
                SizedBox(width: 4.w),
                Expanded(
                  child: GestureDetector(
                    onTap: _playNativeRecording,
                    child: Container(
                      padding: EdgeInsets.all(4.w),
                      decoration: BoxDecoration(
                        color: _isPlayingNative
                            ? AppTheme.getSuccessColor(true)
                                .withValues(alpha: 0.1)
                            : AppTheme.lightTheme.colorScheme.surface,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(
                          color: _isPlayingNative
                              ? AppTheme.getSuccessColor(true)
                              : AppTheme.lightTheme.colorScheme.outline
                                  .withValues(alpha: 0.3),
                        ),
                      ),
                      child: Column(
                        children: [
                          CustomIconWidget(
                            iconName: _isPlayingNative ? 'pause' : 'play_arrow',
                            color: _isPlayingNative
                                ? AppTheme.getSuccessColor(true)
                                : AppTheme.lightTheme.colorScheme.onSurface,
                            size: 8.w,
                          ),
                          SizedBox(height: 1.h),
                          Text(
                            'Native Speaker',
                            style: AppTheme.lightTheme.textTheme.bodySmall
                                ?.copyWith(
                              color: _isPlayingNative
                                  ? AppTheme.getSuccessColor(true)
                                  : AppTheme
                                      .lightTheme.colorScheme.onSurfaceVariant,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),
            SizedBox(height: 4.h),
          ],

          // Problematic sounds
          if (widget.problematicSounds.isNotEmpty) ...[
            Text(
              'Areas for Improvement',
              style: AppTheme.lightTheme.textTheme.titleSmall?.copyWith(
                fontWeight: FontWeight.w600,
              ),
            ),
            SizedBox(height: 2.h),
            Wrap(
              spacing: 2.w,
              runSpacing: 1.h,
              children: widget.problematicSounds.map((sound) {
                return Container(
                  padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
                  decoration: BoxDecoration(
                    color:
                        AppTheme.getWarningColor(true).withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(
                      color:
                          AppTheme.getWarningColor(true).withValues(alpha: 0.3),
                    ),
                  ),
                  child: Text(
                    '/$sound/',
                    style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                      color: AppTheme.getWarningColor(true),
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                );
              }).toList(),
            ),
            SizedBox(height: 3.h),
          ],

          // Improvement suggestions
          if (widget.improvementSuggestions.isNotEmpty) ...[
            Text(
              'Improvement Tips',
              style: AppTheme.lightTheme.textTheme.titleSmall?.copyWith(
                fontWeight: FontWeight.w600,
              ),
            ),
            SizedBox(height: 2.h),
            ...widget.improvementSuggestions.asMap().entries.map((entry) {
              return Container(
                margin: EdgeInsets.only(bottom: 2.h),
                padding: EdgeInsets.all(4.w),
                decoration: BoxDecoration(
                  color: AppTheme.lightTheme.colorScheme.primary
                      .withValues(alpha: 0.05),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(
                    color: AppTheme.lightTheme.colorScheme.primary
                        .withValues(alpha: 0.2),
                  ),
                ),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      width: 6.w,
                      height: 6.w,
                      decoration: BoxDecoration(
                        color: AppTheme.lightTheme.colorScheme.primary,
                        shape: BoxShape.circle,
                      ),
                      child: Center(
                        child: Text(
                          '${entry.key + 1}',
                          style:
                              AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                            color: AppTheme.lightTheme.colorScheme.onPrimary,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                    ),
                    SizedBox(width: 3.w),
                    Expanded(
                      child: Text(
                        entry.value,
                        style:
                            AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                          color: AppTheme.lightTheme.colorScheme.onSurface,
                        ),
                      ),
                    ),
                  ],
                ),
              );
            }).toList(),
          ],
        ],
      ),
    );
  }
}
