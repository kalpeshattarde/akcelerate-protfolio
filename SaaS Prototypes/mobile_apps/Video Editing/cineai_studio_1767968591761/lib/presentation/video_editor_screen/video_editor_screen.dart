import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../widgets/custom_bottom_bar.dart';
import '../../widgets/custom_icon_widget.dart';
import './widgets/duration_selector_widget.dart';
import './widgets/floating_action_buttons_widget.dart';
import './widgets/timeline_scrubber_widget.dart';
import './widgets/video_preview_widget.dart';

/// Video Editor Screen with AI enhancement capabilities
class VideoEditorScreen extends StatefulWidget {
  const VideoEditorScreen({super.key});

  @override
  State<VideoEditorScreen> createState() => _VideoEditorScreenState();
}

class _VideoEditorScreenState extends State<VideoEditorScreen> {
  bool _isPlaying = false;
  double _currentPosition = 0.0;
  final double _totalDuration = 15.0;
  int _selectedDuration = 15;
  bool _isProcessing = false;
  CustomBottomBarItem _selectedBottomItem = CustomBottomBarItem.library;

  // Mock video data
  final String _videoUrl =
      "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&q=80";

  final List<String> _thumbnails = [
    "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=200&q=80",
    "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=200&q=80",
    "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=200&q=80",
    "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=200&q=80",
    "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=200&q=80",
  ];

  void _togglePlayPause() {
    setState(() {
      _isPlaying = !_isPlaying;
    });
  }

  void _refreshVideo() {
    setState(() {
      _currentPosition = 0.0;
      _isPlaying = false;
    });
    _showSnackBar('Video refreshed');
  }

  void _toggleFullscreen() {
    _showSnackBar('Fullscreen mode');
  }

  void _onPositionChanged(double position) {
    setState(() {
      _currentPosition = position;
    });
  }

  void _onDurationChanged(int duration) {
    setState(() {
      _selectedDuration = duration;
    });
  }

  void _addContent() {
    _showBottomSheet(
      title: 'Add Content',
      content: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          _buildBottomSheetOption(
            icon: 'image',
            title: 'Add Image',
            onTap: () {
              Navigator.pop(context);
              _showSnackBar('Image picker opened');
            },
          ),
          _buildBottomSheetOption(
            icon: 'videocam',
            title: 'Add Video Clip',
            onTap: () {
              Navigator.pop(context);
              _showSnackBar('Video picker opened');
            },
          ),
          _buildBottomSheetOption(
            icon: 'text_fields',
            title: 'Add Text',
            onTap: () {
              Navigator.pop(context);
              _showSnackBar('Text editor opened');
            },
          ),
          _buildBottomSheetOption(
            icon: 'music_note',
            title: 'Add Audio',
            onTap: () {
              Navigator.pop(context);
              _showSnackBar('Audio picker opened');
            },
          ),
        ],
      ),
    );
  }

  void _applyEffects() {
    Navigator.pushNamed(context, '/effects-library-screen');
  }

  void _aiEnhancement() {
    setState(() {
      _isProcessing = true;
    });

    _showBottomSheet(
      title: 'AI Enhancement',
      content: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          _buildBottomSheetOption(
            icon: 'auto_awesome',
            title: 'Auto Enhance',
            subtitle: 'Optimize colors and lighting',
            onTap: () {
              Navigator.pop(context);
              _processAiEnhancement('Auto Enhance');
            },
          ),
          _buildBottomSheetOption(
            icon: 'face_retouching_natural',
            title: 'Face Enhancement',
            subtitle: 'Improve facial features',
            onTap: () {
              Navigator.pop(context);
              _processAiEnhancement('Face Enhancement');
            },
          ),
          _buildBottomSheetOption(
            icon: 'hdr_strong',
            title: 'HDR Effect',
            subtitle: 'Enhance dynamic range',
            onTap: () {
              Navigator.pop(context);
              _processAiEnhancement('HDR Effect');
            },
          ),
          _buildBottomSheetOption(
            icon: 'slow_motion_video',
            title: 'Slow Motion',
            subtitle: 'Create smooth slow-mo',
            onTap: () {
              Navigator.pop(context);
              _processAiEnhancement('Slow Motion');
            },
          ),
        ],
      ),
    );
  }

  void _processAiEnhancement(String enhancementType) {
    _showSnackBar('Processing $enhancementType...');

    Future.delayed(const Duration(seconds: 2), () {
      if (mounted) {
        setState(() {
          _isProcessing = false;
        });
        _showSnackBar('$enhancementType applied successfully');
      }
    });
  }

  void _exportVideo() {
    _showBottomSheet(
      title: 'Export Video',
      content: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          _buildBottomSheetOption(
            icon: 'hd',
            title: '1080p HD',
            subtitle: 'Best quality, larger file',
            onTap: () {
              Navigator.pop(context);
              _processExport('1080p HD');
            },
          ),
          _buildBottomSheetOption(
            icon: 'sd',
            title: '720p',
            subtitle: 'Good quality, medium file',
            onTap: () {
              Navigator.pop(context);
              _processExport('720p');
            },
          ),
          _buildBottomSheetOption(
            icon: 'smartphone',
            title: '480p',
            subtitle: 'Mobile optimized, small file',
            onTap: () {
              Navigator.pop(context);
              _processExport('480p');
            },
          ),
        ],
      ),
    );
  }

  void _processExport(String quality) {
    _showSnackBar('Exporting video in $quality...');

    Future.delayed(const Duration(seconds: 3), () {
      if (mounted) {
        _showSnackBar('Video exported successfully');
      }
    });
  }

  void _showBottomSheet({required String title, required Widget content}) {
    final theme = Theme.of(context);

    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      isScrollControlled: true,
      builder: (context) => Container(
        decoration: BoxDecoration(
          color: theme.colorScheme.surface,
          borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
        ),
        padding: EdgeInsets.all(4.w),
        child: SafeArea(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Center(
                child: Container(
                  width: 12.w,
                  height: 4,
                  decoration: BoxDecoration(
                    color: theme.dividerColor,
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
              ),
              SizedBox(height: 2.h),
              Text(title, style: theme.textTheme.titleLarge),
              SizedBox(height: 2.h),
              content,
              SizedBox(height: 2.h),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildBottomSheetOption({
    required String icon,
    required String title,
    String? subtitle,
    required VoidCallback onTap,
  }) {
    final theme = Theme.of(context);

    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: EdgeInsets.all(3.w),
        margin: EdgeInsets.only(bottom: 1.h),
        decoration: BoxDecoration(
          border: Border.all(color: theme.dividerColor, width: 1),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Row(
          children: [
            Container(
              width: 12.w,
              height: 12.w,
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [
                    theme.colorScheme.primary.withValues(alpha: 0.2),
                    theme.colorScheme.secondary.withValues(alpha: 0.1),
                  ],
                ),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Center(
                child: CustomIconWidget(
                  iconName: icon,
                  color: theme.colorScheme.primary,
                  size: 6.w,
                ),
              ),
            ),
            SizedBox(width: 3.w),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: theme.textTheme.bodyLarge?.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  if (subtitle != null) ...[
                    SizedBox(height: 0.5.h),
                    Text(
                      subtitle,
                      style: theme.textTheme.bodySmall?.copyWith(
                        color: theme.colorScheme.onSurfaceVariant,
                      ),
                    ),
                  ],
                ],
              ),
            ),
            CustomIconWidget(
              iconName: 'chevron_right',
              color: theme.colorScheme.onSurfaceVariant,
              size: 5.w,
            ),
          ],
        ),
      ),
    );
  }

  void _showSnackBar(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        behavior: SnackBarBehavior.floating,
        duration: const Duration(seconds: 2),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        flexibleSpace: Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [
                theme.colorScheme.surface.withValues(alpha: 0.95),
                theme.colorScheme.surface.withValues(alpha: 0.85),
              ],
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
            ),
          ),
        ),
        centerTitle: true,
        title: Text(
          'Video Editor',
          style: theme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w600,
            color: theme.colorScheme.onSurface,
          ),
        ),
        actions: [
          Padding(
            padding: EdgeInsets.only(right: 4.w),
            child: IconButton(
              icon: CustomIconWidget(
                iconName: 'share',
                color: theme.colorScheme.secondary,
                size: 6.w,
              ),
              onPressed: _exportVideo,
            ),
          ),
        ],
      ),
      body: Stack(
        children: [
          SingleChildScrollView(
            child: Padding(
              padding: EdgeInsets.all(4.w),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Video preview
                  VideoPreviewWidget(
                    videoUrl: _videoUrl,
                    onPlayPause: _togglePlayPause,
                    onRefresh: _refreshVideo,
                    onFullscreen: _toggleFullscreen,
                    isPlaying: _isPlaying,
                  ),

                  SizedBox(height: 3.h),

                  // Timeline scrubber
                  TimelineScrubberWidget(
                    currentPosition: _currentPosition,
                    totalDuration: _totalDuration,
                    onPositionChanged: _onPositionChanged,
                    thumbnails: _thumbnails,
                  ),

                  SizedBox(height: 3.h),

                  // Duration selector
                  DurationSelectorWidget(
                    selectedDuration: _selectedDuration,
                    onDurationChanged: _onDurationChanged,
                  ),

                  SizedBox(height: 3.h),

                  // Floating action buttons
                  FloatingActionButtonsWidget(
                    onAddContent: _addContent,
                    onApplyEffects: _applyEffects,
                    onAiEnhancement: _aiEnhancement,
                  ),

                  SizedBox(height: 10.h),
                ],
              ),
            ),
          ),

          // Processing overlay
          if (_isProcessing)
            Positioned.fill(
              child: Container(
                color: Colors.black.withValues(alpha: 0.7),
                child: Center(
                  child: Container(
                    padding: EdgeInsets.all(6.w),
                    decoration: BoxDecoration(
                      color: theme.colorScheme.surface,
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        CircularProgressIndicator(
                          valueColor: AlwaysStoppedAnimation<Color>(
                            theme.colorScheme.primary,
                          ),
                        ),
                        SizedBox(height: 2.h),
                        Text(
                          'Processing AI Enhancement...',
                          style: theme.textTheme.bodyLarge?.copyWith(
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
        ],
      ),
      bottomNavigationBar: CustomBottomBar(
        selectedItem: _selectedBottomItem,
        onItemSelected: (item) {
          setState(() {
            _selectedBottomItem = item;
          });
        },
      ),
    );
  }
}
