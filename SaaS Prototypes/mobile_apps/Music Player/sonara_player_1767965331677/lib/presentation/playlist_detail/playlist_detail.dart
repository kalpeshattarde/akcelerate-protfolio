import 'dart:ui';
import 'package:flutter/material.dart';

import '../../core/app_export.dart';

/// Playlist Detail screen showing songs in a playlist/album
class PlaylistDetail extends StatefulWidget {
  const PlaylistDetail({Key? key}) : super(key: key);

  @override
  State<PlaylistDetail> createState() => _PlaylistDetailState();
}

class _PlaylistDetailState extends State<PlaylistDetail> {
  bool _isLiked = false;
  bool _isShuffleOn = false;

  // Will be populated from route arguments
  late Map<String, dynamic> _playlistData;
  bool _isInitialized = false;

  final List<Map<String, dynamic>> _songs = [
    {
      "id": 1,
      "title": "Midnight Echo",
      "artist": "Aurora Waves",
      "albumArt": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200",
      "duration": "4:23",
      "isPlaying": false,
    },
    {
      "id": 2,
      "title": "Crystal Dreams",
      "artist": "Aurora Waves",
      "albumArt": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200",
      "duration": "3:47",
      "isPlaying": false,
    },
    {
      "id": 3,
      "title": "Neon Horizon",
      "artist": "Aurora Waves",
      "albumArt": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=200",
      "duration": "5:12",
      "isPlaying": false,
    },
    {
      "id": 4,
      "title": "Stellar Voyage",
      "artist": "Aurora Waves",
      "albumArt": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200",
      "duration": "4:56",
      "isPlaying": false,
    },
    {
      "id": 5,
      "title": "Electric Soul",
      "artist": "Aurora Waves",
      "albumArt": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200",
      "duration": "3:29",
      "isPlaying": false,
    },
    {
      "id": 6,
      "title": "Dreaming Awake",
      "artist": "Aurora Waves",
      "albumArt": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200",
      "duration": "4:15",
      "isPlaying": false,
    },
    {
      "id": 7,
      "title": "Waves of Light",
      "artist": "Aurora Waves",
      "albumArt": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200",
      "duration": "5:02",
      "isPlaying": false,
    },
  ];

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (!_isInitialized) {
      final args = ModalRoute.of(context)?.settings.arguments;
      if (args is Map<String, dynamic>) {
        _playlistData = args;
      } else {
        // Default playlist data
        _playlistData = {
          "title": "Northern Lights",
          "cover": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
          "artist": "Aurora Waves",
          "trackCount": 7,
          "duration": "32 min",
        };
      }
      _isInitialized = true;
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final size = MediaQuery.of(context).size;

    return Scaffold(
      extendBodyBehindAppBar: true,
      body: Stack(
        children: [
          // Background with blurred cover
          Positioned.fill(
            child: CustomImageWidget(
              imageUrl: _playlistData["cover"] as String? ?? 
                  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
              width: size.width,
              height: size.height,
              fit: BoxFit.cover,
              semanticLabel: "Playlist background",
            ),
          ),
          // Blur overlay
          Positioned.fill(
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 50, sigmaY: 50),
              child: Container(
                color: Colors.black.withValues(alpha: 0.5),
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
                    const Color(0xFF2D3328).withValues(alpha: 0.7),
                    const Color(0xFF1A1F16).withValues(alpha: 0.9),
                    const Color(0xFF151912),
                  ],
                ),
              ),
            ),
          ),
          // Content
          CustomScrollView(
            physics: const ClampingScrollPhysics(),
            slivers: [
              // App bar
              SliverAppBar(
                backgroundColor: Colors.transparent,
                pinned: true,
                expandedHeight: 0,
                leading: _buildGlassButton(
                  icon: 'arrow_back',
                  onPressed: () => Navigator.pop(context),
                ),
                actions: [
                  _buildGlassButton(
                    icon: 'more_horiz',
                    onPressed: () => _showOptionsSheet(context),
                  ),
                  const SizedBox(width: 8),
                ],
              ),
              // Playlist header
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(20, 0, 20, 24),
                  child: Column(
                    children: [
                      // Cover art
                      Container(
                        width: 200,
                        height: 200,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(16),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black.withValues(alpha: 0.4),
                              blurRadius: 30,
                              offset: const Offset(0, 15),
                            ),
                          ],
                        ),
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(16),
                          child: CustomImageWidget(
                            imageUrl: _playlistData["cover"] as String? ??
                                "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
                            width: 200,
                            height: 200,
                            fit: BoxFit.cover,
                            semanticLabel: "Playlist cover",
                          ),
                        ),
                      ),
                      const SizedBox(height: 24),
                      // Playlist title
                      Text(
                        _playlistData["title"] as String? ?? "Playlist",
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 24,
                          fontWeight: FontWeight.w700,
                          letterSpacing: -0.5,
                        ),
                        textAlign: TextAlign.center,
                      ),
                      const SizedBox(height: 8),
                      // Artist/creator
                      Text(
                        _playlistData["artist"] as String? ?? "Various Artists",
                        style: TextStyle(
                          color: Colors.white.withValues(alpha: 0.7),
                          fontSize: 16,
                        ),
                      ),
                      const SizedBox(height: 8),
                      // Info
                      Text(
                        "${_songs.length} songs • ${_playlistData["duration"] ?? "32 min"}",
                        style: TextStyle(
                          color: Colors.white.withValues(alpha: 0.5),
                          fontSize: 14,
                        ),
                      ),
                      const SizedBox(height: 24),
                      // Action buttons
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          // Like button
                          GestureDetector(
                            onTap: () => setState(() => _isLiked = !_isLiked),
                            child: Container(
                              width: 48,
                              height: 48,
                              decoration: BoxDecoration(
                                color: Colors.white.withValues(alpha: 0.1),
                                borderRadius: BorderRadius.circular(24),
                                border: Border.all(
                                  color: Colors.white.withValues(alpha: 0.1),
                                  width: 1,
                                ),
                              ),
                              child: Center(
                                child: CustomIconWidget(
                                  iconName: _isLiked ? 'favorite' : 'favorite_border',
                                  color: _isLiked 
                                      ? theme.colorScheme.primary 
                                      : Colors.white,
                                  size: 22,
                                ),
                              ),
                            ),
                          ),
                          const SizedBox(width: 16),
                          // Play button
                          GestureDetector(
                            onTap: () => _handlePlayAll(),
                            child: Container(
                              width: 64,
                              height: 64,
                              decoration: BoxDecoration(
                                color: theme.colorScheme.primary,
                                borderRadius: BorderRadius.circular(32),
                                boxShadow: [
                                  BoxShadow(
                                    color: theme.colorScheme.primary.withValues(alpha: 0.4),
                                    blurRadius: 20,
                                    offset: const Offset(0, 8),
                                  ),
                                ],
                              ),
                              child: const Center(
                                child: CustomIconWidget(
                                  iconName: 'play_arrow',
                                  color: Color(0xFF1A1F16),
                                  size: 32,
                                ),
                              ),
                            ),
                          ),
                          const SizedBox(width: 16),
                          // Shuffle button
                          GestureDetector(
                            onTap: () => setState(() => _isShuffleOn = !_isShuffleOn),
                            child: Container(
                              width: 48,
                              height: 48,
                              decoration: BoxDecoration(
                                color: _isShuffleOn 
                                    ? theme.colorScheme.primary.withValues(alpha: 0.2)
                                    : Colors.white.withValues(alpha: 0.1),
                                borderRadius: BorderRadius.circular(24),
                                border: Border.all(
                                  color: _isShuffleOn 
                                      ? theme.colorScheme.primary
                                      : Colors.white.withValues(alpha: 0.1),
                                  width: 1,
                                ),
                              ),
                              child: Center(
                                child: CustomIconWidget(
                                  iconName: 'shuffle',
                                  color: _isShuffleOn 
                                      ? theme.colorScheme.primary 
                                      : Colors.white,
                                  size: 22,
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
              // Songs list
              SliverPadding(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                sliver: SliverList(
                  delegate: SliverChildBuilderDelegate(
                    (context, index) => _buildSongTile(context, _songs[index], index + 1, theme),
                    childCount: _songs.length,
                  ),
                ),
              ),
              // Bottom padding
              const SliverToBoxAdapter(
                child: SizedBox(height: 100),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildGlassButton({
    required String icon,
    required VoidCallback onPressed,
  }) {
    return GestureDetector(
      onTap: onPressed,
      child: ClipOval(
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
          child: Container(
            width: 40,
            height: 40,
            margin: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: const Color(0xFF1A1F16).withValues(alpha: 0.5),
              shape: BoxShape.circle,
              border: Border.all(
                color: Colors.white.withValues(alpha: 0.1),
                width: 1,
              ),
            ),
            child: Center(
              child: CustomIconWidget(
                iconName: icon,
                color: Colors.white,
                size: 20,
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildSongTile(
    BuildContext context,
    Map<String, dynamic> song,
    int number,
    ThemeData theme,
  ) {
    return GestureDetector(
      onTap: () => _handleSongTap(song),
      child: Container(
        margin: const EdgeInsets.only(bottom: 8),
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: Colors.white.withValues(alpha: 0.05),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: Colors.white.withValues(alpha: 0.05),
            width: 1,
          ),
        ),
        child: Row(
          children: [
            // Track number
            SizedBox(
              width: 24,
              child: Text(
                '$number',
                style: TextStyle(
                  color: Colors.white.withValues(alpha: 0.5),
                  fontSize: 14,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
            // Album art
            ClipRRect(
              borderRadius: BorderRadius.circular(8),
              child: CustomImageWidget(
                imageUrl: song["albumArt"] as String,
                width: 48,
                height: 48,
                fit: BoxFit.cover,
                semanticLabel: "Song artwork",
              ),
            ),
            const SizedBox(width: 12),
            // Song info
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    song["title"] as String,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 15,
                      fontWeight: FontWeight.w500,
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: 4),
                  Text(
                    song["artist"] as String,
                    style: TextStyle(
                      color: Colors.white.withValues(alpha: 0.5),
                      fontSize: 13,
                    ),
                  ),
                ],
              ),
            ),
            // Duration
            Text(
              song["duration"] as String,
              style: TextStyle(
                color: Colors.white.withValues(alpha: 0.5),
                fontSize: 13,
              ),
            ),
            const SizedBox(width: 8),
            // More button
            GestureDetector(
              onTap: () => _showSongOptions(context, song),
              child: CustomIconWidget(
                iconName: 'more_vert',
                color: Colors.white.withValues(alpha: 0.5),
                size: 20,
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _handlePlayAll() {
    Navigator.pushNamed(context, '/music-player', arguments: {
      "playlistName": _playlistData["title"],
      "songs": _songs,
    });
  }

  void _handleSongTap(Map<String, dynamic> song) {
    Navigator.pushNamed(context, '/music-player', arguments: {
      "song": song,
      "playlistName": _playlistData["title"],
    });
  }

  void _showOptionsSheet(BuildContext context) {
    final theme = Theme.of(context);
    showModalBottomSheet(
      context: context,
      backgroundColor: const Color(0xFF2A3025),
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (context) => Container(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 40,
              height: 4,
              decoration: BoxDecoration(
                color: Colors.white.withValues(alpha: 0.3),
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            const SizedBox(height: 24),
            _buildOptionTile(context, 'download', 'Download All', theme.colorScheme.primary),
            _buildOptionTile(context, 'playlist_add', 'Add to Queue', theme.colorScheme.primary),
            _buildOptionTile(context, 'share', 'Share Playlist', theme.colorScheme.primary),
            _buildOptionTile(context, 'edit', 'Edit Playlist', theme.colorScheme.primary),
            const SizedBox(height: 16),
          ],
        ),
      ),
    );
  }

  void _showSongOptions(BuildContext context, Map<String, dynamic> song) {
    final theme = Theme.of(context);
    showModalBottomSheet(
      context: context,
      backgroundColor: const Color(0xFF2A3025),
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (context) => Container(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 40,
              height: 4,
              decoration: BoxDecoration(
                color: Colors.white.withValues(alpha: 0.3),
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            const SizedBox(height: 20),
            Row(
              children: [
                ClipRRect(
                  borderRadius: BorderRadius.circular(8),
                  child: CustomImageWidget(
                    imageUrl: song["albumArt"] as String,
                    width: 56,
                    height: 56,
                    fit: BoxFit.cover,
                    semanticLabel: "Song artwork",
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        song["title"] as String,
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        song["artist"] as String,
                        style: TextStyle(
                          color: Colors.white.withValues(alpha: 0.6),
                          fontSize: 14,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 24),
            _buildOptionTile(context, 'playlist_add', 'Add to Playlist', theme.colorScheme.primary),
            _buildOptionTile(context, 'queue_music', 'Add to Queue', theme.colorScheme.primary),
            _buildOptionTile(context, 'download', 'Download', theme.colorScheme.primary),
            _buildOptionTile(context, 'share', 'Share', theme.colorScheme.primary),
            const SizedBox(height: 8),
          ],
        ),
      ),
    );
  }

  Widget _buildOptionTile(BuildContext context, String icon, String title, Color iconColor) {
    return ListTile(
      contentPadding: EdgeInsets.zero,
      leading: Container(
        width: 40,
        height: 40,
        decoration: BoxDecoration(
          color: iconColor.withValues(alpha: 0.15),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Center(
          child: CustomIconWidget(
            iconName: icon,
            color: iconColor,
            size: 20,
          ),
        ),
      ),
      title: Text(
        title,
        style: const TextStyle(
          color: Colors.white,
          fontSize: 16,
        ),
      ),
      onTap: () {
        Navigator.pop(context);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(title),
            backgroundColor: const Color(0xFF2A3025),
          ),
        );
      },
    );
  }
}

