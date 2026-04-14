import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class TargetWordWidget extends StatefulWidget {
  final String targetWord;
  final String phoneticTranscription;
  final String audioUrl;
  final double playbackSpeed;
  final String selectedAccent;
  final Function(double) onSpeedChanged;
  final Function(String) onAccentChanged;

  const TargetWordWidget({
    Key? key,
    required this.targetWord,
    required this.phoneticTranscription,
    required this.audioUrl,
    required this.playbackSpeed,
    required this.selectedAccent,
    required this.onSpeedChanged,
    required this.onAccentChanged,
  }) : super(key: key);

  @override
  State<TargetWordWidget> createState() => _TargetWordWidgetState();
}

class _TargetWordWidgetState extends State<TargetWordWidget>
    with TickerProviderStateMixin {
  bool _isPlaying = false;
  late AnimationController _pulseController;
  late Animation<double> _pulseAnimation;

  final List<String> _accents = [
    'American',
    'British',
    'Australian',
    'Canadian'
  ];
  final List<double> _speeds = [0.5, 0.75, 1.0, 1.25, 1.5];

  @override
  void initState() {
    super.initState();
    _pulseController = AnimationController(
      duration: Duration(milliseconds: 1000),
      vsync: this,
    );
    _pulseAnimation = Tween<double>(begin: 1.0, end: 1.1).animate(
      CurvedAnimation(parent: _pulseController, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _pulseController.dispose();
    super.dispose();
  }

  void _togglePlayback() {
    setState(() {
      _isPlaying = !_isPlaying;
    });

    if (_isPlaying) {
      _pulseController.repeat(reverse: true);
      // Simulate audio playback duration
      Future.delayed(Duration(seconds: 2), () {
        if (mounted) {
          setState(() {
            _isPlaying = false;
          });
          _pulseController.stop();
          _pulseController.reset();
        }
      });
    } else {
      _pulseController.stop();
      _pulseController.reset();
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
        children: [
          Text(
            'Target Word',
            style: AppTheme.lightTheme.textTheme.titleSmall?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
              fontWeight: FontWeight.w500,
            ),
          ),
          SizedBox(height: 2.h),
          AnimatedBuilder(
            animation: _pulseAnimation,
            builder: (context, child) {
              return Transform.scale(
                scale: _isPlaying ? _pulseAnimation.value : 1.0,
                child: Text(
                  widget.targetWord,
                  style: AppTheme.lightTheme.textTheme.headlineMedium?.copyWith(
                    color: AppTheme.lightTheme.colorScheme.primary,
                    fontWeight: FontWeight.w700,
                  ),
                  textAlign: TextAlign.center,
                ),
              );
            },
          ),
          SizedBox(height: 1.h),
          Text(
            widget.phoneticTranscription,
            style: AppTheme.getMonospaceStyle(
              isLight: true,
              fontSize: 16.sp,
              fontWeight: FontWeight.w500,
            ).copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
            ),
            textAlign: TextAlign.center,
          ),
          SizedBox(height: 3.h),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              GestureDetector(
                onTap: _togglePlayback,
                child: Container(
                  padding: EdgeInsets.all(4.w),
                  decoration: BoxDecoration(
                    color: AppTheme.lightTheme.colorScheme.primary,
                    shape: BoxShape.circle,
                    boxShadow: [
                      BoxShadow(
                        color: AppTheme.lightTheme.colorScheme.primary
                            .withValues(alpha: 0.3),
                        blurRadius: 8,
                        offset: Offset(0, 4),
                      ),
                    ],
                  ),
                  child: CustomIconWidget(
                    iconName: _isPlaying ? 'pause' : 'play_arrow',
                    color: AppTheme.lightTheme.colorScheme.onPrimary,
                    size: 8.w,
                  ),
                ),
              ),
              Column(
                children: [
                  Text(
                    'Speed',
                    style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                      color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                  SizedBox(height: 0.5.h),
                  Container(
                    padding:
                        EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
                    decoration: BoxDecoration(
                      color: AppTheme.lightTheme.colorScheme.surface,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(
                        color: AppTheme.lightTheme.colorScheme.outline
                            .withValues(alpha: 0.3),
                      ),
                    ),
                    child: DropdownButton<double>(
                      value: widget.playbackSpeed,
                      underline: SizedBox(),
                      isDense: true,
                      items: _speeds.map((speed) {
                        return DropdownMenuItem<double>(
                          value: speed,
                          child: Text(
                            '${speed}x',
                            style: AppTheme.lightTheme.textTheme.bodySmall,
                          ),
                        );
                      }).toList(),
                      onChanged: (value) {
                        if (value != null) {
                          widget.onSpeedChanged(value);
                        }
                      },
                    ),
                  ),
                ],
              ),
              Column(
                children: [
                  Text(
                    'Accent',
                    style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                      color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                  SizedBox(height: 0.5.h),
                  Container(
                    padding:
                        EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
                    decoration: BoxDecoration(
                      color: AppTheme.lightTheme.colorScheme.surface,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(
                        color: AppTheme.lightTheme.colorScheme.outline
                            .withValues(alpha: 0.3),
                      ),
                    ),
                    child: DropdownButton<String>(
                      value: widget.selectedAccent,
                      underline: SizedBox(),
                      isDense: true,
                      items: _accents.map((accent) {
                        return DropdownMenuItem<String>(
                          value: accent,
                          child: Text(
                            accent,
                            style: AppTheme.lightTheme.textTheme.bodySmall,
                          ),
                        );
                      }).toList(),
                      onChanged: (value) {
                        if (value != null) {
                          widget.onAccentChanged(value);
                        }
                      },
                    ),
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }
}
