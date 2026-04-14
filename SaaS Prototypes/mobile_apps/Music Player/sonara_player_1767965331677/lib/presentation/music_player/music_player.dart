import 'dart:ui';
import 'package:flutter/material.dart';

import '../../widgets/custom_icon_widget.dart';
import '../../widgets/custom_image_widget.dart';

/// Music Player Screen - Immersive full-screen player with lyrics
class MusicPlayer extends StatefulWidget {
  const MusicPlayer({Key? key}) : super(key: key);

  @override
  State<MusicPlayer> createState() => _MusicPlayerState();
}

class _MusicPlayerState extends State<MusicPlayer>
    with TickerProviderStateMixin {
  late AnimationController _artworkController;
  late Animation<double> _artworkRotation;

  // Playback state
  bool _isPlaying = false;
  bool _isShuffleEnabled = false;
  int _repeatMode = 0; // 0: off, 1: repeat all, 2: repeat one
  double _currentPosition = 106.0; // 1:46
  double _totalDuration = 220.0; // 3:40

  // Mock current song data
  final Map<String, dynamic> _currentSong = {
    "id": 1,
    "title": "Willow",
    "artist": "Taylor Swift",
    "album": "evermore",
    "albumArt": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
    "semanticLabel": "Concert crowd with hands raised under colorful stage lights",
  };

  // Mock lyrics data
  final List<Map<String, dynamic>> _lyrics = [
    {"time": 100.0, "text": "They count me out time and time again"},
    {"time": 106.0, "text": "Life was a willow and it bent right to your wind"},
    {"time": 112.0, "text": "But I come back stronger than a '90s trend"},
  ];

  // Mock playlist data
  final Map<String, dynamic> _fromPlaylist = {
    "name": "evermore",
    "image": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100",
  };

  // Social stats
  final Map<String, String> _socialStats = {
    "comments": "8.5K",
    "likes": "15K",
    "plays": "1.3m",
  };

  @override
  void initState() {
    super.initState();
    _initializeAnimations();
    _startPlaybackSimulation();
  }

  void _initializeAnimations() {
    _artworkController = AnimationController(
      duration: const Duration(seconds: 20),
      vsync: this,
    );

    _artworkRotation = Tween<double>(
      begin: 0,
      end: 1,
    ).animate(_artworkController);

    if (_isPlaying) {
      _artworkController.repeat();
    }
  }

  void _startPlaybackSimulation() {
    Future.doWhile(() async {
      await Future.delayed(const Duration(seconds: 1));
      if (mounted && _isPlaying && _currentPosition < _totalDuration) {
        setState(() {
          _currentPosition += 1;
        });
      }
      return mounted;
    });
  }

  @override
  void dispose() {
    _artworkController.dispose();
    super.dispose();
  }

  void _togglePlayPause() {
    setState(() {
      _isPlaying = !_isPlaying;
      if (_isPlaying) {
        _artworkController.repeat();
      } else {
        _artworkController.stop();
      }
    });
  }

  void _toggleShuffle() {
    setState(() {
      _isShuffleEnabled = !_isShuffleEnabled;
    });
  }

  void _cycleRepeatMode() {
    setState(() {
      _repeatMode = (_repeatMode + 1) % 3;
    });
  }

  void _onSeek(double value) {
    setState(() {
      _currentPosition = value;
    });
  }

  void _previousTrack() {
    setState(() {
      _currentPosition = 0;
    });
  }

  void _nextTrack() {
    setState(() {
      _currentPosition = 0;
    });
  }

  String _formatDuration(double seconds) {
    final minutes = (seconds / 60).floor();
    final remainingSeconds = (seconds % 60).floor();
    return '${minutes}:${remainingSeconds.toString().padLeft(2, '0')}';
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final size = MediaQuery.of(context).size;

    return Scaffold(
      body: Stack(
        children: [
          // Blurred background image
          Positioned.fill(
            child: CustomImageWidget(
              imageUrl: _currentSong["albumArt"] as String,
              width: size.width,
              height: size.height,
              fit: BoxFit.cover,
              semanticLabel: "Background blur",
            ),
          ),
          // Blur effect
          Positioned.fill(
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 50, sigmaY: 50),
              child: Container(
                color: Colors.black.withValues(alpha: 0.4),
              ),
            ),
          ),
          // Gradient overlay
          Positioned.fill(
            child: Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [
                    const Color(0xFF3D4A35).withValues(alpha: 0.7),
                    const Color(0xFF2D3328).withValues(alpha: 0.85),
                    const Color(0xFF1A1F16).withValues(alpha: 0.95),
                  ],
                ),
              ),
            ),
          ),
          // Content
          SafeArea(
          child: Column(
            children: [
              // Header
              _buildHeader(theme),
              const SizedBox(height: 16),
              // Song title and artist
              _buildSongInfo(theme),
              const SizedBox(height: 24),
              // Circular album artwork
              Expanded(
                child: Center(
                  child: _buildCircularArtwork(theme, size),
                ),
              ),
              // Lyrics section
              _buildLyricsSection(theme),
              const SizedBox(height: 20),
              // Progress bar
              _buildProgressBar(theme),
              const SizedBox(height: 24),
              // Playback controls
              _buildPlaybackControls(theme),
              const SizedBox(height: 20),
              // Social stats
              _buildSocialStats(theme),
              const SizedBox(height: 16),
              // From playlist
              _buildFromPlaylist(theme),
              const SizedBox(height: 16),
            ],
          ),
        ),
        ],
      ),
    );
  }

  Widget _buildHeader(ThemeData theme) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          GestureDetector(
            onTap: () => Navigator.pop(context),
            child: CustomIconWidget(
              iconName: 'chevron_left',
              color: Colors.white,
              size: 28,
            ),
          ),
          GestureDetector(
            onTap: () {
              // Show options menu
            },
            child: CustomIconWidget(
              iconName: 'menu',
              color: Colors.white,
              size: 24,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSongInfo(ThemeData theme) {
    return Column(
      children: [
        Text(
          _currentSong["title"] as String,
          style: theme.textTheme.headlineMedium?.copyWith(
            color: Colors.white,
            fontWeight: FontWeight.w700,
            fontSize: 28,
          ),
        ),
        const SizedBox(height: 4),
        Text(
          _currentSong["artist"] as String,
          style: theme.textTheme.bodyLarge?.copyWith(
            color: Colors.white.withValues(alpha: 0.7),
            fontSize: 16,
          ),
        ),
      ],
    );
  }

  Widget _buildCircularArtwork(ThemeData theme, Size size) {
    final artworkSize = size.width * 0.6;
    
    return Container(
      width: artworkSize,
      height: artworkSize,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        border: Border.all(
          color: Colors.white.withValues(alpha: 0.3),
          width: 4,
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.3),
            blurRadius: 30,
            offset: const Offset(0, 15),
          ),
        ],
      ),
      child: ClipOval(
        child: CustomImageWidget(
          imageUrl: _currentSong["albumArt"] as String,
          width: artworkSize,
          height: artworkSize,
          fit: BoxFit.cover,
          semanticLabel: _currentSong["semanticLabel"] as String,
        ),
      ),
    );
  }

  Widget _buildLyricsSection(ThemeData theme) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 32),
      child: Column(
        children: [
          // Previous line
          Text(
            _lyrics[0]["text"] as String,
            style: theme.textTheme.bodyMedium?.copyWith(
              color: Colors.white.withValues(alpha: 0.4),
              fontSize: 14,
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 8),
          // Current line
          Text(
            _lyrics[1]["text"] as String,
            style: theme.textTheme.bodyLarge?.copyWith(
              color: Colors.white,
              fontWeight: FontWeight.w600,
              fontSize: 16,
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 8),
          // Next line
          Text(
            _lyrics[2]["text"] as String,
            style: theme.textTheme.bodyMedium?.copyWith(
              color: Colors.white.withValues(alpha: 0.4),
              fontSize: 14,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  Widget _buildProgressBar(ThemeData theme) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 32),
      child: Column(
        children: [
          SliderTheme(
            data: SliderThemeData(
              trackHeight: 4,
              thumbShape: const RoundSliderThumbShape(enabledThumbRadius: 6),
              overlayShape: const RoundSliderOverlayShape(overlayRadius: 14),
              activeTrackColor: theme.colorScheme.primary,
              inactiveTrackColor: Colors.white.withValues(alpha: 0.2),
              thumbColor: theme.colorScheme.primary,
              overlayColor: theme.colorScheme.primary.withValues(alpha: 0.2),
            ),
            child: Slider(
              value: _currentPosition,
              min: 0,
              max: _totalDuration,
              onChanged: _onSeek,
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  _formatDuration(_currentPosition),
                  style: theme.textTheme.bodySmall?.copyWith(
                    color: Colors.white.withValues(alpha: 0.6),
                  ),
                ),
                Text(
                  _formatDuration(_totalDuration),
                  style: theme.textTheme.bodySmall?.copyWith(
                    color: Colors.white.withValues(alpha: 0.6),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPlaybackControls(ThemeData theme) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 32),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          // Shuffle
          GestureDetector(
            onTap: _toggleShuffle,
            child: CustomIconWidget(
              iconName: 'shuffle',
              color: _isShuffleEnabled
                  ? theme.colorScheme.primary
                  : Colors.white.withValues(alpha: 0.6),
              size: 24,
            ),
          ),
          // Previous
          GestureDetector(
            onTap: _previousTrack,
            child: CustomIconWidget(
              iconName: 'skip_previous',
              color: Colors.white,
              size: 36,
            ),
          ),
          // Play/Pause
          GestureDetector(
            onTap: _togglePlayPause,
            child: Container(
              width: 64,
              height: 64,
              decoration: BoxDecoration(
                color: theme.colorScheme.primary,
                shape: BoxShape.circle,
                boxShadow: [
                  BoxShadow(
                    color: theme.colorScheme.primary.withValues(alpha: 0.4),
                    blurRadius: 20,
                    offset: const Offset(0, 8),
                  ),
                ],
              ),
              child: Center(
                child: CustomIconWidget(
                  iconName: _isPlaying ? 'pause' : 'play_arrow',
                  color: const Color(0xFF1A1F16),
                  size: 32,
                ),
              ),
            ),
          ),
          // Next
          GestureDetector(
            onTap: _nextTrack,
            child: CustomIconWidget(
              iconName: 'skip_next',
              color: Colors.white,
              size: 36,
            ),
          ),
          // Repeat
          GestureDetector(
            onTap: _cycleRepeatMode,
            child: CustomIconWidget(
              iconName: _repeatMode == 2 ? 'repeat_one' : 'repeat',
              color: _repeatMode > 0
                  ? theme.colorScheme.primary
                  : Colors.white.withValues(alpha: 0.6),
              size: 24,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSocialStats(ThemeData theme) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        _buildStatItem('chat_bubble_outline', _socialStats["comments"]!, theme),
        const SizedBox(width: 32),
        _buildStatItem('favorite_border', _socialStats["likes"]!, theme),
        const SizedBox(width: 32),
        _buildStatItem('thumb_up_outlined', _socialStats["plays"]!, theme),
      ],
    );
  }

  Widget _buildStatItem(String icon, String value, ThemeData theme) {
    return Row(
      children: [
        CustomIconWidget(
          iconName: icon,
          color: Colors.white.withValues(alpha: 0.6),
          size: 20,
        ),
        const SizedBox(width: 6),
        Text(
          value,
          style: theme.textTheme.bodyMedium?.copyWith(
            color: Colors.white.withValues(alpha: 0.6),
          ),
        ),
      ],
    );
  }

  Widget _buildFromPlaylist(ThemeData theme) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 20),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.08),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: Colors.white.withValues(alpha: 0.1),
        ),
      ),
      child: Row(
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(8),
            child: CustomImageWidget(
              imageUrl: _fromPlaylist["image"] as String,
              width: 48,
              height: 48,
              fit: BoxFit.cover,
              semanticLabel: "Playlist artwork",
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'from playlist',
                  style: theme.textTheme.bodySmall?.copyWith(
                    color: Colors.white.withValues(alpha: 0.5),
                    fontSize: 12,
                  ),
                ),
                Text(
                  _fromPlaylist["name"] as String,
                  style: theme.textTheme.titleMedium?.copyWith(
                    color: Colors.white,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
          ),
          CustomIconWidget(
            iconName: 'chevron_right',
            color: Colors.white.withValues(alpha: 0.5),
            size: 24,
          ),
        ],
      ),
    );
  }
}
