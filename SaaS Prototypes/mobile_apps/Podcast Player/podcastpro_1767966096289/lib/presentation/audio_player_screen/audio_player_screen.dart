import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/audio_waveform_widget.dart';
import './widgets/playback_controls_widget.dart';
import './widgets/player_header_widget.dart';
import './widgets/podcast_artwork_widget.dart';
import './widgets/show_notes_widget.dart';

class AudioPlayerScreen extends StatefulWidget {
  const AudioPlayerScreen({Key? key}) : super(key: key);

  @override
  State<AudioPlayerScreen> createState() => _AudioPlayerScreenState();
}

class _AudioPlayerScreenState extends State<AudioPlayerScreen>
    with TickerProviderStateMixin {
  late AnimationController _backgroundController;
  late Animation<Color?> _backgroundAnimation;

  // Player state
  bool _isPlaying = false;
  bool _isLoading = false;
  bool _isFavorite = false;
  double _playbackSpeed = 1.0;
  double _progress = 0.3;
  Duration _currentPosition = const Duration(minutes: 12, seconds: 30);
  Duration _totalDuration = const Duration(minutes: 45, seconds: 20);

  // Mock data
  final Map<String, dynamic> _currentEpisode = {
    "id": 1,
    "title": "The Future of AI in Creative Industries",
    "podcastTitle": "Tech Talks Daily",
    "description":
        """In this fascinating episode, we explore how artificial intelligence is revolutionizing creative industries from music production to visual arts.

# Key Topics Covered
- AI-generated music and its impact on composers
- Machine learning in film production
- The ethics of AI creativity
- Future predictions for creative AI

Join us as we dive deep into the intersection of technology and creativity, featuring insights from leading experts in the field.

Visit our website: https://techtalksdaily.com
Follow us on social media for updates and behind-the-scenes content.""",
    "imageUrl":
        "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&h=500&fit=crop&crop=center",
    "duration": 2720,
    "publishedAt": "2025-07-30T10:00:00Z",
  };

  final List<Map<String, dynamic>> _timestamps = [
    {"seconds": 0, "title": "Introduction and Welcome"},
    {"seconds": 180, "title": "AI in Music Production"},
    {"seconds": 420, "title": "Visual Arts and Machine Learning"},
    {"seconds": 720, "title": "Guest Interview: Dr. Sarah Chen"},
    {"seconds": 1200, "title": "Ethics of AI Creativity"},
    {"seconds": 1800, "title": "Future Predictions"},
    {"seconds": 2400, "title": "Q&A Session"},
  ];

  final List<Map<String, dynamic>> _chapters = [
    {"startTime": 0, "title": "Introduction"},
    {"startTime": 180, "title": "AI Music"},
    {"startTime": 420, "title": "Visual Arts"},
    {"startTime": 720, "title": "Interview"},
    {"startTime": 1200, "title": "Ethics"},
    {"startTime": 1800, "title": "Future"},
    {"startTime": 2400, "title": "Q&A"},
  ];

  // Mock waveform data
  final List<double> _waveformData = List.generate(100, (index) {
    return (0.2 + (index % 10) * 0.08) * (1 + 0.3 * (index % 7));
  });

  @override
  void initState() {
    super.initState();
    _backgroundController = AnimationController(
      duration: const Duration(seconds: 10),
      vsync: this,
    )..repeat(reverse: true);

    _backgroundAnimation = ColorTween(
      begin: AppTheme.lightTheme.colorScheme.secondary.withValues(alpha: 0.1),
      end: AppTheme.lightTheme.colorScheme.secondary.withValues(alpha: 0.3),
    ).animate(CurvedAnimation(
      parent: _backgroundController,
      curve: Curves.easeInOut,
    ));
  }

  @override
  void dispose() {
    _backgroundController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: AnimatedBuilder(
        animation: _backgroundAnimation,
        builder: (context, child) {
          return Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [
                  _backgroundAnimation.value ??
                      AppTheme.lightTheme.colorScheme.secondary
                          .withValues(alpha: 0.1),
                  AppTheme.lightTheme.scaffoldBackgroundColor,
                  AppTheme.lightTheme.scaffoldBackgroundColor,
                ],
                stops: const [0.0, 0.3, 1.0],
              ),
            ),
            child: SafeArea(
              child: Column(
                children: [
                  // Header
                  PlayerHeaderWidget(
                    onMinimize: _handleMinimize,
                    onShare: _handleShare,
                    onFavorite: _handleFavorite,
                    isFavorite: _isFavorite,
                  ),

                  // Artwork and episode info
                  Expanded(
                    flex: 3,
                    child: PodcastArtworkWidget(
                      imageUrl: _currentEpisode['imageUrl'] as String,
                      podcastTitle: _currentEpisode['podcastTitle'] as String,
                      episodeTitle: _currentEpisode['title'] as String,
                      isPlaying: _isPlaying,
                      onTap: _handleArtworkTap,
                      onLongPress: _handleArtworkLongPress,
                    ),
                  ),

                  // Waveform
                  AudioWaveformWidget(
                    progress: _progress,
                    currentPosition: _currentPosition,
                    totalDuration: _totalDuration,
                    onSeek: _handleSeek,
                    waveformData: _waveformData,
                    chapters: _chapters,
                  ),

                  // Playback controls
                  PlaybackControlsWidget(
                    isPlaying: _isPlaying,
                    isLoading: _isLoading,
                    playbackSpeed: _playbackSpeed,
                    onPlayPause: _handlePlayPause,
                    onSkipPrevious: _handleSkipPrevious,
                    onSkipNext: _handleSkipNext,
                    onRewind: _handleRewind,
                    onFastForward: _handleFastForward,
                    onSpeedChange: _handleSpeedChange,
                  ),

                  // Show notes
                  Expanded(
                    flex: 2,
                    child: ShowNotesWidget(
                      showNotes: _currentEpisode['description'] as String,
                      timestamps: _timestamps,
                      onTimestampTap: _handleTimestampTap,
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }

  void _handleMinimize() {
    Navigator.pop(context);
  }

  void _handleShare() {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (context) => Container(
        padding: EdgeInsets.all(4.w),
        decoration: BoxDecoration(
          color: AppTheme.lightTheme.colorScheme.surface,
          borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 12.w,
              height: 0.5.h,
              margin: EdgeInsets.only(bottom: 3.h),
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.colorScheme.onSurface
                    .withValues(alpha: 0.3),
                borderRadius: BorderRadius.circular(10),
              ),
            ),
            Text(
              'Share Episode',
              style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.w600,
              ),
            ),
            SizedBox(height: 3.h),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                _buildShareOption('copy', 'Copy Link'),
                _buildShareOption('message', 'Message'),
                _buildShareOption('email', 'Email'),
                _buildShareOption('more_horiz', 'More'),
              ],
            ),
            SizedBox(height: 4.h),
          ],
        ),
      ),
    );
  }

  Widget _buildShareOption(String icon, String label) {
    return GestureDetector(
      onTap: () {
        Navigator.pop(context);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('$label selected')),
        );
      },
      child: Column(
        children: [
          Container(
            padding: EdgeInsets.all(3.w),
            decoration: BoxDecoration(
              color: AppTheme.lightTheme.colorScheme.secondary
                  .withValues(alpha: 0.1),
              shape: BoxShape.circle,
            ),
            child: CustomIconWidget(
              iconName: icon,
              color: AppTheme.lightTheme.colorScheme.secondary,
              size: 6.w,
            ),
          ),
          SizedBox(height: 1.h),
          Text(
            label,
            style: AppTheme.lightTheme.textTheme.bodySmall,
          ),
        ],
      ),
    );
  }

  void _handleFavorite() {
    setState(() {
      _isFavorite = !_isFavorite;
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content:
            Text(_isFavorite ? 'Added to favorites' : 'Removed from favorites'),
        duration: const Duration(seconds: 2),
      ),
    );
  }

  void _handleArtworkTap() {
    _handlePlayPause();
  }

  void _handleArtworkLongPress() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Episode Options'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              leading: CustomIconWidget(
                iconName: _isFavorite ? 'favorite' : 'favorite_border',
                color: AppTheme.lightTheme.colorScheme.secondary,
                size: 5.w,
              ),
              title: Text(
                  _isFavorite ? 'Remove from Favorites' : 'Add to Favorites'),
              onTap: () {
                Navigator.pop(context);
                _handleFavorite();
              },
            ),
            ListTile(
              leading: CustomIconWidget(
                iconName: 'playlist_add',
                color: AppTheme.lightTheme.colorScheme.onSurface,
                size: 5.w,
              ),
              title: Text('Add to Playlist'),
              onTap: () {
                Navigator.pop(context);
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Added to playlist')),
                );
              },
            ),
            ListTile(
              leading: CustomIconWidget(
                iconName: 'download',
                color: AppTheme.lightTheme.colorScheme.onSurface,
                size: 5.w,
              ),
              title: Text('Download Episode'),
              onTap: () {
                Navigator.pop(context);
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Download started')),
                );
              },
            ),
          ],
        ),
      ),
    );
  }

  void _handleSeek(double position) {
    setState(() {
      _progress = position;
      _currentPosition = Duration(
        seconds: (position * _totalDuration.inSeconds).round(),
      );
    });
  }

  void _handlePlayPause() {
    setState(() {
      if (_isPlaying) {
        _isPlaying = false;
      } else {
        _isLoading = true;
      }
    });

    // Simulate loading
    if (!_isPlaying) {
      Future.delayed(const Duration(milliseconds: 500), () {
        if (mounted) {
          setState(() {
            _isLoading = false;
            _isPlaying = true;
          });
        }
      });
    }
  }

  void _handleSkipPrevious() {
    // Find previous chapter or go to beginning
    final currentSeconds = _currentPosition.inSeconds;
    final previousChapter = _chapters.lastWhere(
      (chapter) => (chapter['startTime'] as int) < currentSeconds,
      orElse: () => _chapters.first,
    );

    final newPosition = Duration(seconds: previousChapter['startTime'] as int);
    setState(() {
      _currentPosition = newPosition;
      _progress = newPosition.inSeconds / _totalDuration.inSeconds;
    });
  }

  void _handleSkipNext() {
    // Find next chapter or go to end
    final currentSeconds = _currentPosition.inSeconds;
    final nextChapterIndex = _chapters.indexWhere(
      (chapter) => (chapter['startTime'] as int) > currentSeconds,
    );

    if (nextChapterIndex != -1) {
      final newPosition =
          Duration(seconds: _chapters[nextChapterIndex]['startTime'] as int);
      setState(() {
        _currentPosition = newPosition;
        _progress = newPosition.inSeconds / _totalDuration.inSeconds;
      });
    }
  }

  void _handleRewind() {
    final newPosition = Duration(
      seconds:
          (_currentPosition.inSeconds - 15).clamp(0, _totalDuration.inSeconds),
    );
    setState(() {
      _currentPosition = newPosition;
      _progress = newPosition.inSeconds / _totalDuration.inSeconds;
    });
  }

  void _handleFastForward() {
    final newPosition = Duration(
      seconds:
          (_currentPosition.inSeconds + 30).clamp(0, _totalDuration.inSeconds),
    );
    setState(() {
      _currentPosition = newPosition;
      _progress = newPosition.inSeconds / _totalDuration.inSeconds;
    });
  }

  void _handleSpeedChange(double speed) {
    setState(() {
      _playbackSpeed = speed;
    });
  }

  void _handleTimestampTap(int seconds) {
    final newPosition = Duration(seconds: seconds);
    setState(() {
      _currentPosition = newPosition;
      _progress = newPosition.inSeconds / _totalDuration.inSeconds;
    });
  }
}
