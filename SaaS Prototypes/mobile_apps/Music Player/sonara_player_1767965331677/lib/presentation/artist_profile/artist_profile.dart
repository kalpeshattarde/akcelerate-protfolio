import 'dart:ui';
import 'package:flutter/material.dart';

import '../../core/app_export.dart';
import './widgets/albums_tab_widget.dart';
import './widgets/biography_section_widget.dart';
import './widgets/recent_releases_widget.dart';
import './widgets/similar_artists_tab_widget.dart';
import './widgets/songs_tab_widget.dart';

/// Artist Profile screen with olive theme matching app design
class ArtistProfile extends StatefulWidget {
  const ArtistProfile({Key? key}) : super(key: key);

  @override
  State<ArtistProfile> createState() => _ArtistProfileState();
}

class _ArtistProfileState extends State<ArtistProfile>
    with TickerProviderStateMixin {
  late TabController _tabController;
  bool _isFollowing = false;

  final Map<String, dynamic> _artistData = {
    "id": 1,
    "name": "Aurora Waves",
    "image": "https://images.unsplash.com/photo-1553450646-5be0ef527adf?w=800",
    "imageSemanticLabel":
        "Female artist with long flowing hair performing on stage with dramatic lighting",
    "verified": true,
    "followers": "2.4M",
    "monthlyListeners": "8.2M",
    "biography":
        "Aurora Waves is an internationally acclaimed electronic music producer and DJ known for her ethereal soundscapes and innovative production techniques. Born in Oslo, Norway, she began her musical journey at age 15.",
  };

  final List<Map<String, dynamic>> _songs = [
    {
      "id": 1,
      "title": "Midnight Echo",
      "albumArt": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200",
      "albumArtSemanticLabel": "Concert lights",
      "plays": "12.5M",
      "duration": "4:23",
    },
    {
      "id": 2,
      "title": "Crystal Dreams",
      "albumArt": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200",
      "albumArtSemanticLabel": "Festival crowd",
      "plays": "8.9M",
      "duration": "3:47",
    },
    {
      "id": 3,
      "title": "Neon Horizon",
      "albumArt": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=200",
      "albumArtSemanticLabel": "Neon lights",
      "plays": "15.2M",
      "duration": "5:12",
    },
    {
      "id": 4,
      "title": "Stellar Voyage",
      "albumArt": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200",
      "albumArtSemanticLabel": "Music studio",
      "plays": "6.7M",
      "duration": "4:56",
    },
    {
      "id": 5,
      "title": "Electric Soul",
      "albumArt": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200",
      "albumArtSemanticLabel": "DJ performance",
      "plays": "11.3M",
      "duration": "3:29",
    },
  ];

  final List<Map<String, dynamic>> _albums = [
    {
      "id": 1,
      "title": "Northern Lights",
      "cover": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
      "coverSemanticLabel": "Aurora album cover",
      "releaseDate": "2018",
      "trackCount": 12,
    },
    {
      "id": 2,
      "title": "Digital Dreams",
      "cover": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400",
      "coverSemanticLabel": "Digital album cover",
      "releaseDate": "2020",
      "trackCount": 10,
    },
    {
      "id": 3,
      "title": "Cosmic Journey",
      "cover": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400",
      "coverSemanticLabel": "Cosmic album cover",
      "releaseDate": "2022",
      "trackCount": 14,
    },
  ];

  final List<Map<String, dynamic>> _similarArtists = [
    {
      "id": 2,
      "name": "Luna Pulse",
      "image": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=200",
      "imageSemanticLabel": "Female DJ",
      "followers": "1.8M",
    },
    {
      "id": 3,
      "name": "Neon Cascade",
      "image": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200",
      "imageSemanticLabel": "Male producer",
      "followers": "2.1M",
    },
    {
      "id": 4,
      "name": "Stellar Drift",
      "image": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200",
      "imageSemanticLabel": "Artist in studio",
      "followers": "1.5M",
    },
    {
      "id": 5,
      "name": "Echo Realm",
      "image": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200",
      "imageSemanticLabel": "Live performance",
      "followers": "1.9M",
    },
  ];

  final List<Map<String, dynamic>> _recentReleases = [
    {
      "id": 1,
      "title": "Midnight Echo (Remix)",
      "cover": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200",
      "coverSemanticLabel": "Remix cover",
      "releaseDate": "2 days ago",
      "isNew": true,
    },
    {
      "id": 2,
      "title": "Crystal Dreams EP",
      "cover": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200",
      "coverSemanticLabel": "EP cover",
      "releaseDate": "1 week ago",
      "isNew": true,
    },
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 4, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final size = MediaQuery.of(context).size;

    return Scaffold(
      extendBodyBehindAppBar: true,
      body: Stack(
        children: [
          // Background gradient
          Container(
            width: size.width,
            height: size.height,
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [
                  Color(0xFF2D3328),
                  Color(0xFF1A1F16),
                  Color(0xFF151912),
                ],
              ),
            ),
          ),
          // Top-left glow
          Positioned(
            top: -100,
            left: -100,
            child: Container(
              width: 300,
              height: 300,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                gradient: RadialGradient(
                  colors: [
                    theme.colorScheme.primary.withValues(alpha: 0.15),
                    Colors.transparent,
                  ],
                ),
              ),
            ),
          ),
          // Main content
          CustomScrollView(
            physics: const ClampingScrollPhysics(),
            slivers: [
              // Artist header with image
              SliverAppBar(
                expandedHeight: size.height * 0.45,
                pinned: true,
                stretch: true,
                backgroundColor: Colors.transparent,
                automaticallyImplyLeading: false,
                leading: _buildGlassButton(
                  icon: 'arrow_back',
                  onPressed: () => Navigator.of(context).pop(),
                ),
                actions: [
                  _buildGlassButton(
                    icon: 'share',
                    onPressed: () => _showShareSheet(context),
                  ),
                  const SizedBox(width: 8),
                ],
                flexibleSpace: FlexibleSpaceBar(
                  stretchModes: const [
                    StretchMode.zoomBackground,
                    StretchMode.blurBackground,
                  ],
                  background: Stack(
                    fit: StackFit.expand,
                    children: [
                      // Artist image
                      CustomImageWidget(
                        imageUrl: _artistData["image"] as String,
                        width: double.infinity,
                        height: double.infinity,
                        fit: BoxFit.cover,
                        semanticLabel: _artistData["imageSemanticLabel"] as String,
                      ),
                      // Gradient overlay
                      Container(
                        decoration: BoxDecoration(
                          gradient: LinearGradient(
                            begin: Alignment.topCenter,
                            end: Alignment.bottomCenter,
                            colors: [
                              Colors.transparent,
                              const Color(0xFF1A1F16).withValues(alpha: 0.5),
                              const Color(0xFF1A1F16),
                            ],
                            stops: const [0.3, 0.7, 1.0],
                          ),
                        ),
                      ),
                      // Artist info
                      Positioned(
                        bottom: 20,
                        left: 20,
                        right: 20,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                Flexible(
                                  child: Text(
                                    _artistData["name"] as String,
                                    style: const TextStyle(
                                      color: Colors.white,
                                      fontSize: 32,
                                      fontWeight: FontWeight.w700,
                                      letterSpacing: -0.5,
                                    ),
                                  ),
                                ),
                                if (_artistData["verified"] == true) ...[
                                  const SizedBox(width: 8),
                                  Container(
                                    padding: const EdgeInsets.all(2),
                                    decoration: BoxDecoration(
                                      color: theme.colorScheme.primary,
                                      shape: BoxShape.circle,
                                    ),
                                    child: const CustomIconWidget(
                                      iconName: 'check',
                                      color: Color(0xFF1A1F16),
                                      size: 16,
                                    ),
                                  ),
                                ],
                              ],
                            ),
                            const SizedBox(height: 8),
                            Text(
                              "${_artistData["monthlyListeners"]} monthly listeners",
                              style: TextStyle(
                                color: Colors.white.withValues(alpha: 0.7),
                                fontSize: 14,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),

              // Actions row
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(20, 16, 20, 8),
                  child: Row(
                    children: [
                      // Play button
                      Expanded(
                        child: GestureDetector(
                          onTap: _handlePlayAll,
                          child: Container(
                            height: 48,
                            decoration: BoxDecoration(
                              color: theme.colorScheme.primary,
                              borderRadius: BorderRadius.circular(24),
                            ),
                            child: const Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                CustomIconWidget(
                                  iconName: 'play_arrow',
                                  color: Color(0xFF1A1F16),
                                  size: 24,
                                ),
                                SizedBox(width: 8),
                                Text(
                                  'Shuffle Play',
                                  style: TextStyle(
                                    color: Color(0xFF1A1F16),
                                    fontSize: 15,
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(width: 12),
                      // Follow button
                      GestureDetector(
                        onTap: () {
                          setState(() => _isFollowing = !_isFollowing);
                        },
                        child: Container(
                          height: 48,
                          padding: const EdgeInsets.symmetric(horizontal: 24),
                          decoration: BoxDecoration(
                            color: _isFollowing 
                                ? theme.colorScheme.primary.withValues(alpha: 0.2)
                                : Colors.transparent,
                            borderRadius: BorderRadius.circular(24),
                            border: Border.all(
                              color: _isFollowing 
                                  ? theme.colorScheme.primary
                                  : Colors.white.withValues(alpha: 0.3),
                              width: 1.5,
                            ),
                          ),
                          child: Center(
                            child: Text(
                              _isFollowing ? 'Following' : 'Follow',
                              style: TextStyle(
                                color: _isFollowing 
                                    ? theme.colorScheme.primary
                                    : Colors.white,
                                fontSize: 15,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(width: 12),
                      // More options
                      _buildGlassButton(
                        icon: 'more_horiz',
                        onPressed: () {},
                        size: 48,
                      ),
                    ],
                  ),
                ),
              ),

              // Tab bar
              SliverPersistentHeader(
                pinned: true,
                delegate: _TabBarDelegate(
                  tabBar: Container(
                    color: const Color(0xFF1A1F16),
                    child: TabBar(
                      controller: _tabController,
                      labelColor: theme.colorScheme.primary,
                      unselectedLabelColor: Colors.white.withValues(alpha: 0.5),
                      indicatorColor: theme.colorScheme.primary,
                      indicatorWeight: 2,
                      indicatorSize: TabBarIndicatorSize.label,
                      labelStyle: const TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w600,
                      ),
                      tabs: const [
                        Tab(text: "Songs"),
                        Tab(text: "Albums"),
                        Tab(text: "Similar"),
                        Tab(text: "About"),
                      ],
                    ),
                  ),
                ),
              ),

              // Tab content
              SliverFillRemaining(
                child: TabBarView(
                  controller: _tabController,
                  children: [
                    // Songs tab
                    SingleChildScrollView(
                      physics: const ClampingScrollPhysics(),
                      padding: const EdgeInsets.only(bottom: 100),
                      child: SongsTabWidget(
                        songs: _songs,
                        onSongTap: _handleSongTap,
                        onSongLongPress: _showSongContextMenu,
                      ),
                    ),
                    // Albums tab
                    AlbumsTabWidget(
                      albums: _albums,
                      onAlbumTap: _handleAlbumTap,
                    ),
                    // Similar artists tab
                    SimilarArtistsTabWidget(
                      artists: _similarArtists,
                      onArtistTap: _handleArtistTap,
                    ),
                    // About tab
                    SingleChildScrollView(
                      physics: const ClampingScrollPhysics(),
                      padding: const EdgeInsets.only(bottom: 100),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const SizedBox(height: 20),
                          BiographySectionWidget(
                            biography: _artistData["biography"] as String,
                          ),
                          const SizedBox(height: 24),
                          RecentReleasesWidget(
                            releases: _recentReleases,
                            onReleaseTap: _handleReleaseTap,
                          ),
                          const SizedBox(height: 24),
                        ],
                      ),
                    ),
                  ],
                ),
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
    double size = 40,
  }) {
    return GestureDetector(
      onTap: onPressed,
      child: ClipOval(
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
          child: Container(
            width: size,
            height: size,
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

  void _handlePlayAll() {
    Navigator.pushNamed(context, '/music-player');
  }

  void _handleSongTap(Map<String, dynamic> song) {
    Navigator.pushNamed(context, '/music-player');
  }

  void _handleAlbumTap(Map<String, dynamic> album) {
    Navigator.pushNamed(context, '/playlist-detail', arguments: {
      "title": album["title"],
      "cover": album["cover"],
      "artist": _artistData["name"],
      "trackCount": album["trackCount"],
      "duration": "${album["trackCount"] * 4} min",
    });
  }

  void _handleArtistTap(Map<String, dynamic> artist) {
    Navigator.pushNamed(context, '/artist-profile');
  }

  void _handleReleaseTap(Map<String, dynamic> release) {
    Navigator.pushNamed(context, '/playlist-detail', arguments: {
      "title": release["title"],
      "cover": release["cover"],
      "artist": _artistData["name"],
      "trackCount": 5,
      "duration": "18 min",
    });
  }

  void _showShareSheet(BuildContext context) {
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
            Text(
              "Share Artist",
              style: TextStyle(
                color: Colors.white,
                fontSize: 20,
                fontWeight: FontWeight.w600,
              ),
            ),
            const SizedBox(height: 24),
            _buildShareOption(
              context,
              'link',
              'Copy Link',
              theme.colorScheme.primary,
            ),
            _buildShareOption(
              context,
              'share',
              'Share via...',
              theme.colorScheme.primary,
            ),
            const SizedBox(height: 16),
          ],
        ),
      ),
    );
  }

  Widget _buildShareOption(
    BuildContext context,
    String icon,
    String title,
    Color iconColor,
  ) {
    return ListTile(
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
            content: Text(title == 'Copy Link' ? 'Link copied!' : 'Sharing...'),
            backgroundColor: const Color(0xFF2A3025),
          ),
        );
      },
    );
  }

  void _showSongContextMenu(Map<String, dynamic> song) {
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
            // Song info
            Row(
              children: [
                ClipRRect(
                  borderRadius: BorderRadius.circular(8),
                  child: CustomImageWidget(
                    imageUrl: song["albumArt"] as String,
                    width: 56,
                    height: 56,
                    fit: BoxFit.cover,
                    semanticLabel: song["albumArtSemanticLabel"] as String,
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
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                      const SizedBox(height: 4),
                      Text(
                        _artistData["name"] as String,
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
            _buildContextOption(
              context,
              'playlist_add',
              'Add to Playlist',
              theme.colorScheme.primary,
              () {
                Navigator.pop(context);
                Navigator.pushNamed(context, '/playlist-management');
              },
            ),
            _buildContextOption(
              context,
              'download',
              'Download',
              theme.colorScheme.primary,
              () {
                Navigator.pop(context);
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text("Downloading..."),
                    backgroundColor: Color(0xFF2A3025),
                  ),
                );
              },
            ),
            _buildContextOption(
              context,
              'share',
              'Share',
              theme.colorScheme.primary,
              () {
                Navigator.pop(context);
              },
            ),
            const SizedBox(height: 8),
          ],
        ),
      ),
    );
  }

  Widget _buildContextOption(
    BuildContext context,
    String icon,
    String title,
    Color iconColor,
    VoidCallback onTap,
  ) {
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
      onTap: onTap,
    );
  }
}

class _TabBarDelegate extends SliverPersistentHeaderDelegate {
  final Widget tabBar;

  _TabBarDelegate({required this.tabBar});

  @override
  Widget build(
    BuildContext context,
    double shrinkOffset,
    bool overlapsContent,
  ) {
    return tabBar;
  }

  @override
  double get maxExtent => 48;

  @override
  double get minExtent => 48;

  @override
  bool shouldRebuild(covariant SliverPersistentHeaderDelegate oldDelegate) {
    return false;
  }
}
