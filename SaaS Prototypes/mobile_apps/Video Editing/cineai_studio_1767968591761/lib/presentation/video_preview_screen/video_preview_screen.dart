import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:share_plus/share_plus.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../widgets/custom_icon_widget.dart';
import './widgets/video_action_sheet_widget.dart';
import './widgets/video_controls_overlay_widget.dart';
import './widgets/video_player_widget.dart';
import './widgets/video_timeline_widget.dart';

/// Video Preview Screen - Immersive full-screen video playback with sharing and editing
class VideoPreviewScreen extends StatefulWidget {
  const VideoPreviewScreen({super.key});

  @override
  State<VideoPreviewScreen> createState() => _VideoPreviewScreenState();
}

class _VideoPreviewScreenState extends State<VideoPreviewScreen>
    with SingleTickerProviderStateMixin {
  // Video playback state
  bool _isPlaying = false;
  bool _showControls = true;
  double _currentPosition = 0.0;
  double _videoDuration = 30.0; // Default 30 seconds
  double _zoomLevel = 1.0;
  bool _isBuffering = false;
  bool _isLoading = true;

  // Animation controllers
  late AnimationController _controlsAnimationController;
  late Animation<double> _controlsOpacityAnimation;

  // Mock video data
  final Map<String, dynamic> _videoData = {
    "id": "video_001",
    "title": "AI Generated Cinematic Video",
    "duration": 30.0,
    "thumbnail": "https://images.unsplash.com/photo-1688012766283-917a9f975e57",
    "semanticLabel":
        "Cinematic video preview showing abstract purple and pink gradient light effects with smooth transitions",
    "videoUrl":
        "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
    "createdAt": "2025-12-23T06:08:52.313032",
    "resolution": "1080p",
    "format": "MP4",
  };

  @override
  void initState() {
    super.initState();
    _initializeAnimations();
    _loadVideo();
    _hideSystemUI();
  }

  void _initializeAnimations() {
    _controlsAnimationController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );

    _controlsOpacityAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(
        parent: _controlsAnimationController,
        curve: Curves.easeInOut,
      ),
    );

    _controlsAnimationController.forward();
  }

  Future<void> _loadVideo() async {
    setState(() => _isLoading = true);

    // Simulate video loading
    await Future.delayed(const Duration(seconds: 2));

    setState(() {
      _isLoading = false;
      _videoDuration = _videoData["duration"] as double;
    });
  }

  void _hideSystemUI() {
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersiveSticky);
  }

  void _showSystemUI() {
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.edgeToEdge);
  }

  @override
  void dispose() {
    _controlsAnimationController.dispose();
    _showSystemUI();
    super.dispose();
  }

  void _togglePlayPause() {
    setState(() => _isPlaying = !_isPlaying);
    _resetControlsTimer();
  }

  void _toggleControls() {
    setState(() => _showControls = !_showControls);

    if (_showControls) {
      _controlsAnimationController.forward();
      _resetControlsTimer();
    } else {
      _controlsAnimationController.reverse();
    }
  }

  void _resetControlsTimer() {
    if (_isPlaying) {
      Future.delayed(const Duration(seconds: 3), () {
        if (mounted && _isPlaying) {
          setState(() => _showControls = false);
          _controlsAnimationController.reverse();
        }
      });
    }
  }

  void _onSeek(double position) {
    setState(() => _currentPosition = position);
  }

  void _handleZoom(double scale) {
    setState(() {
      _zoomLevel = (_zoomLevel * scale).clamp(1.0, 3.0);
    });
  }

  Future<void> _shareVideo() async {
    try {
      await Share.share(
        'Check out this amazing AI-generated video!\n\nCreated with CineAI Studio',
        subject: 'AI Generated Video',
      );
    } catch (e) {
      _showSnackBar('Unable to share video');
    }
  }

  void _showActionSheet() {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      isScrollControlled: true,
      builder: (context) => VideoActionSheetWidget(
        onDownloadHD: _downloadHD,
        onEditVideo: _editVideo,
        onCreateVariation: _createVariation,
        onAddToCollection: _addToCollection,
      ),
    );
  }

  Future<void> _downloadHD() async {
    Navigator.pop(context);
    _showSnackBar('Downloading HD video...');
    await Future.delayed(const Duration(seconds: 2));
    _showSnackBar('Video downloaded successfully');
  }

  void _editVideo() {
    Navigator.pop(context);
    Navigator.pushNamed(context, '/video-editor-screen');
  }

  void _createVariation() {
    Navigator.pop(context);
    _showSnackBar('Creating video variation...');
  }

  void _addToCollection() {
    Navigator.pop(context);
    _showSnackBar('Added to collection');
  }

  void _showSnackBar(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        margin: EdgeInsets.all(4.w),
      ),
    );
  }

  void _closePreview() {
    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final videoData =
        ModalRoute.of(context)?.settings.arguments as Map<String, dynamic>?;

    return Scaffold(
      backgroundColor: Colors.black,
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        systemOverlayStyle: const SystemUiOverlayStyle(
          statusBarColor: Colors.transparent,
          statusBarIconBrightness: Brightness.light,
        ),
        flexibleSpace: Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [Colors.black.withValues(alpha: 0.5), Colors.transparent],
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
            ),
          ),
        ),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () => Navigator.pop(context),
        ),
        title: Text(
          videoData?['title'] ?? 'Video Preview',
          style: theme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w600,
            color: Colors.white,
          ),
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
        ),
        centerTitle: true,
        actions: [
          IconButton(
            onPressed: _shareVideo,
            icon: CustomIconWidget(
              iconName: 'share',
              color: Colors.white,
              size: 24,
            ),
          ),
        ],
      ),
      body: GestureDetector(
        onTap: _toggleControls,
        onDoubleTap: _togglePlayPause,
        child: Stack(
          children: [
            // Video Player
            Positioned.fill(
              child: VideoPlayerWidget(
                videoUrl: _videoData["videoUrl"] as String,
                thumbnail: _videoData["thumbnail"] as String,
                semanticLabel: _videoData["semanticLabel"] as String,
                isPlaying: _isPlaying,
                isLoading: _isLoading,
                isBuffering: _isBuffering,
                zoomLevel: _zoomLevel,
                onZoomChange: _handleZoom,
              ),
            ),

            // Top Overlay Controls
            if (_showControls)
              Positioned(
                top: 0,
                left: 0,
                right: 0,
                child: FadeTransition(
                  opacity: _controlsOpacityAnimation,
                  child: Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        colors: [
                          Colors.black.withValues(alpha: 0.7),
                          Colors.transparent,
                        ],
                      ),
                    ),
                    child: SafeArea(
                      bottom: false,
                      child: Padding(
                        padding: EdgeInsets.symmetric(
                          horizontal: 4.w,
                          vertical: 2.h,
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            // Close Button
                            GestureDetector(
                              onTap: _closePreview,
                              child: Container(
                                padding: EdgeInsets.all(2.w),
                                decoration: BoxDecoration(
                                  color: Colors.black.withValues(alpha: 0.3),
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                child: CustomIconWidget(
                                  iconName: 'close',
                                  color: Colors.white,
                                  size: 24,
                                ),
                              ),
                            ),

                            // Share Button
                            GestureDetector(
                              onTap: _shareVideo,
                              child: Container(
                                padding: EdgeInsets.all(2.w),
                                decoration: BoxDecoration(
                                  color: Colors.black.withValues(alpha: 0.3),
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                child: CustomIconWidget(
                                  iconName: 'share',
                                  color: Colors.white,
                                  size: 24,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
              ),

            // Center Play/Pause Overlay
            if (_showControls && !_isLoading)
              Center(
                child: FadeTransition(
                  opacity: _controlsOpacityAnimation,
                  child: VideoControlsOverlayWidget(
                    isPlaying: _isPlaying,
                    onPlayPause: _togglePlayPause,
                  ),
                ),
              ),

            // Bottom Controls
            if (_showControls && !_isLoading)
              Positioned(
                bottom: 0,
                left: 0,
                right: 0,
                child: FadeTransition(
                  opacity: _controlsOpacityAnimation,
                  child: Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.bottomCenter,
                        end: Alignment.topCenter,
                        colors: [
                          Colors.black.withValues(alpha: 0.7),
                          Colors.transparent,
                        ],
                      ),
                    ),
                    child: SafeArea(
                      top: false,
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          // Timeline Scrubber
                          VideoTimelineWidget(
                            currentPosition: _currentPosition,
                            duration: _videoDuration,
                            onSeek: _onSeek,
                            thumbnail: _videoData["thumbnail"] as String,
                            semanticLabel:
                                _videoData["semanticLabel"] as String,
                          ),

                          SizedBox(height: 2.h),

                          // Bottom Action Buttons
                          Padding(
                            padding: EdgeInsets.symmetric(horizontal: 4.w),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                              children: [
                                _buildActionButton(
                                  icon: 'download',
                                  label: 'Download',
                                  onTap: () => _downloadHD(),
                                  theme: theme,
                                ),
                                _buildActionButton(
                                  icon: 'edit',
                                  label: 'Edit',
                                  onTap: _editVideo,
                                  theme: theme,
                                ),
                                _buildActionButton(
                                  icon: 'auto_awesome',
                                  label: 'Variation',
                                  onTap: _createVariation,
                                  theme: theme,
                                ),
                                _buildActionButton(
                                  icon: 'more_horiz',
                                  label: 'More',
                                  onTap: _showActionSheet,
                                  theme: theme,
                                ),
                              ],
                            ),
                          ),

                          SizedBox(height: 2.h),
                        ],
                      ),
                    ),
                  ),
                ),
              ),

            // Loading Indicator
            if (_isLoading)
              Center(
                child: Container(
                  padding: EdgeInsets.all(6.w),
                  decoration: BoxDecoration(
                    color: Colors.black.withValues(alpha: 0.7),
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
                        'Loading video...',
                        style: theme.textTheme.bodyMedium?.copyWith(
                          color: Colors.white,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildActionButton({
    required String icon,
    required String label,
    required VoidCallback onTap,
    required ThemeData theme,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.5.h),
        decoration: BoxDecoration(
          color: Colors.white.withValues(alpha: 0.1),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: Colors.white.withValues(alpha: 0.2),
            width: 1,
          ),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            CustomIconWidget(iconName: icon, color: Colors.white, size: 24),
            SizedBox(height: 0.5.h),
            Text(
              label,
              style: theme.textTheme.labelSmall?.copyWith(
                color: Colors.white,
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
