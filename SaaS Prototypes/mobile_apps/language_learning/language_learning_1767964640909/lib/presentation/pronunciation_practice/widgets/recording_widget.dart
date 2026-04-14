
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:path_provider/path_provider.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:record/record.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class RecordingWidget extends StatefulWidget {
  final Function(String?) onRecordingComplete;
  final Function(double) onVolumeChanged;

  const RecordingWidget({
    Key? key,
    required this.onRecordingComplete,
    required this.onVolumeChanged,
  }) : super(key: key);

  @override
  State<RecordingWidget> createState() => _RecordingWidgetState();
}

class _RecordingWidgetState extends State<RecordingWidget>
    with TickerProviderStateMixin {
  final AudioRecorder _audioRecorder = AudioRecorder();
  bool _isRecording = false;
  bool _hasPermission = false;
  String? _recordingPath;
  double _currentVolume = 0.0;

  late AnimationController _pulseController;
  late AnimationController _waveController;
  late Animation<double> _pulseAnimation;
  late Animation<double> _waveAnimation;

  final List<double> _waveformData = List.generate(20, (index) => 0.0);

  @override
  void initState() {
    super.initState();
    _initializeAnimations();
    _requestMicrophonePermission();
  }

  void _initializeAnimations() {
    _pulseController = AnimationController(
      duration: Duration(milliseconds: 1000),
      vsync: this,
    );

    _waveController = AnimationController(
      duration: Duration(milliseconds: 100),
      vsync: this,
    );

    _pulseAnimation = Tween<double>(begin: 1.0, end: 1.2).animate(
      CurvedAnimation(parent: _pulseController, curve: Curves.easeInOut),
    );

    _waveAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _waveController, curve: Curves.easeInOut),
    );
  }

  Future<void> _requestMicrophonePermission() async {
    if (kIsWeb) {
      setState(() {
        _hasPermission = true;
      });
      return;
    }

    final status = await Permission.microphone.request();
    setState(() {
      _hasPermission = status.isGranted;
    });
  }

  Future<void> _startRecording() async {
    if (!_hasPermission) {
      await _requestMicrophonePermission();
      if (!_hasPermission) return;
    }

    try {
      if (kIsWeb) {
        await _audioRecorder.start(
          const RecordConfig(encoder: AudioEncoder.wav),
          path: 'recording.wav',
        );
      } else {
        final directory = await getTemporaryDirectory();
        final path =
            '${directory.path}/recording_${DateTime.now().millisecondsSinceEpoch}.m4a';
        await _audioRecorder.start(
          const RecordConfig(encoder: AudioEncoder.aacLc),
          path: path,
        );
      }

      setState(() {
        _isRecording = true;
      });

      _pulseController.repeat(reverse: true);
      _startVolumeMonitoring();
    } catch (e) {
      print('Error starting recording: $e');
    }
  }

  Future<void> _stopRecording() async {
    try {
      final path = await _audioRecorder.stop();

      setState(() {
        _isRecording = false;
        _recordingPath = path;
        _currentVolume = 0.0;
      });

      _pulseController.stop();
      _pulseController.reset();
      _waveController.stop();
      _waveController.reset();

      widget.onRecordingComplete(path);
    } catch (e) {
      print('Error stopping recording: $e');
    }
  }

  void _startVolumeMonitoring() {
    // Simulate volume monitoring with random values
    if (_isRecording) {
      Future.delayed(Duration(milliseconds: 100), () {
        if (_isRecording && mounted) {
          final volume =
              (0.1 + (0.9 * (DateTime.now().millisecond % 100) / 100));
          setState(() {
            _currentVolume = volume;
            _updateWaveform(volume);
          });
          widget.onVolumeChanged(volume);
          _waveController.forward().then((_) => _waveController.reverse());
          _startVolumeMonitoring();
        }
      });
    }
  }

  void _updateWaveform(double volume) {
    for (int i = _waveformData.length - 1; i > 0; i--) {
      _waveformData[i] = _waveformData[i - 1];
    }
    _waveformData[0] = volume;
  }

  @override
  void dispose() {
    _pulseController.dispose();
    _waveController.dispose();
    _audioRecorder.dispose();
    super.dispose();
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
            _isRecording ? 'Recording...' : 'Tap to Record',
            style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
              color: _isRecording
                  ? AppTheme.lightTheme.colorScheme.error
                  : AppTheme.lightTheme.colorScheme.onSurface,
              fontWeight: FontWeight.w600,
            ),
          ),
          SizedBox(height: 3.h),

          // Waveform visualization
          Container(
            height: 8.h,
            width: double.infinity,
            child: AnimatedBuilder(
              animation: _waveAnimation,
              builder: (context, child) {
                return CustomPaint(
                  painter: WaveformPainter(
                    waveformData: _waveformData,
                    isRecording: _isRecording,
                    animationValue: _waveAnimation.value,
                  ),
                  size: Size(double.infinity, 8.h),
                );
              },
            ),
          ),

          SizedBox(height: 3.h),

          // Recording button
          GestureDetector(
            onTap: _hasPermission
                ? (_isRecording ? _stopRecording : _startRecording)
                : _requestMicrophonePermission,
            child: AnimatedBuilder(
              animation: _pulseAnimation,
              builder: (context, child) {
                return Transform.scale(
                  scale: _isRecording ? _pulseAnimation.value : 1.0,
                  child: Container(
                    width: 20.w,
                    height: 20.w,
                    decoration: BoxDecoration(
                      color: _isRecording
                          ? AppTheme.lightTheme.colorScheme.error
                          : AppTheme.lightTheme.colorScheme.primary,
                      shape: BoxShape.circle,
                      boxShadow: [
                        BoxShadow(
                          color: (_isRecording
                                  ? AppTheme.lightTheme.colorScheme.error
                                  : AppTheme.lightTheme.colorScheme.primary)
                              .withValues(alpha: 0.3),
                          blurRadius: 12,
                          offset: Offset(0, 6),
                        ),
                      ],
                    ),
                    child: Center(
                      child: CustomIconWidget(
                        iconName: _isRecording ? 'stop' : 'mic',
                        color: AppTheme.lightTheme.colorScheme.onPrimary,
                        size: 10.w,
                      ),
                    ),
                  ),
                );
              },
            ),
          ),

          SizedBox(height: 2.h),

          if (!_hasPermission)
            Container(
              padding: EdgeInsets.all(3.w),
              decoration: BoxDecoration(
                color: AppTheme.getWarningColor(true).withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Row(
                children: [
                  CustomIconWidget(
                    iconName: 'warning',
                    color: AppTheme.getWarningColor(true),
                    size: 5.w,
                  ),
                  SizedBox(width: 2.w),
                  Expanded(
                    child: Text(
                      'Microphone permission required for recording',
                      style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                        color: AppTheme.getWarningColor(true),
                      ),
                    ),
                  ),
                ],
              ),
            ),

          if (_isRecording)
            Container(
              margin: EdgeInsets.only(top: 2.h),
              padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.colorScheme.primary
                    .withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  CustomIconWidget(
                    iconName: 'volume_up',
                    color: AppTheme.lightTheme.colorScheme.primary,
                    size: 5.w,
                  ),
                  SizedBox(width: 2.w),
                  Text(
                    'Volume: ${(_currentVolume * 100).toInt()}%',
                    style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                      color: AppTheme.lightTheme.colorScheme.primary,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ],
              ),
            ),
        ],
      ),
    );
  }
}

class WaveformPainter extends CustomPainter {
  final List<double> waveformData;
  final bool isRecording;
  final double animationValue;

  WaveformPainter({
    required this.waveformData,
    required this.isRecording,
    required this.animationValue,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = isRecording
          ? AppTheme.lightTheme.colorScheme.primary
          : AppTheme.lightTheme.colorScheme.outline.withValues(alpha: 0.5)
      ..strokeWidth = 2
      ..style = PaintingStyle.fill;

    final barWidth = size.width / waveformData.length;

    for (int i = 0; i < waveformData.length; i++) {
      final barHeight = waveformData[i] * size.height * 0.8;
      final x = i * barWidth;
      final y = (size.height - barHeight) / 2;

      final opacity = isRecording ? (0.3 + 0.7 * animationValue) : 0.3;

      canvas.drawRRect(
        RRect.fromRectAndRadius(
          Rect.fromLTWH(x + barWidth * 0.1, y, barWidth * 0.8, barHeight),
          Radius.circular(barWidth * 0.2),
        ),
        paint..color = paint.color.withValues(alpha: opacity),
      );
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}
