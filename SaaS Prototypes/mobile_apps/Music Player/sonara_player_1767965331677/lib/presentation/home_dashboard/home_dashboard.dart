import 'dart:ui';
import 'package:flutter/material.dart';

import '../../../core/app_export.dart';
import '../../widgets/custom_bottom_bar.dart';
import './widgets/artist_section_widget.dart';
import './widgets/featured_carousel_widget.dart';
import './widgets/mini_player_widget.dart';
import './widgets/mood_cards_widget.dart';
import './widgets/trending_section_widget.dart';

// Custom painter for dotted pattern
class _DottedPatternPainter extends CustomPainter {
  final Color color;

  _DottedPatternPainter({required this.color});

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.fill;

    const spacing = 8.0;
    const radius = 2.0;

    for (double x = 0; x < size.width; x += spacing) {
      for (double y = 0; y < size.height; y += spacing) {
        canvas.drawCircle(Offset(x, y), radius, paint);
      }
    }
  }

  @override
  bool shouldRepaint(_DottedPatternPainter oldDelegate) => false;
}

class HomeDashboard extends StatefulWidget {
  const HomeDashboard({Key? key}) : super(key: key);

  @override
  State<HomeDashboard> createState() => _HomeDashboardState();
}

class _HomeDashboardState extends State<HomeDashboard> {
  bool _isPlaying = false;
  final ScrollController _scrollController = ScrollController();

  // Mock user data
  final Map<String, dynamic> _userData = {
    "name": "Alex",
    "avatar":
        "https://img.rocket.new/generatedImages/rocket_gen_img_1311bae8f-1763293463780.png",
    "avatarSemanticLabel":
        "Profile photo of a young man with short brown hair wearing a casual blue shirt",
  };

  // Filter state
  String _selectedFilter = "All";

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  Future<void> _handleRefresh() async {
    await Future.delayed(const Duration(milliseconds: 1200));
    if (mounted) {
      setState(() {});
    }
  }

  // Bottom navigation handling moved to MainNavigation wrapper

  void _handleSearchTap() {
    Navigator.pushNamed(context, '/search-and-discovery');
  }

  void _handleNotificationTap() {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          'You have 3 new notifications',
          style: Theme.of(context).textTheme.bodyMedium?.copyWith(
            color: Theme.of(context).colorScheme.onSurface,
          ),
        ),
        backgroundColor: Theme.of(context).colorScheme.surface,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        duration: const Duration(seconds: 2),
      ),
    );
  }

  Widget _buildFilterButton(String label, ThemeData theme) {
    final isSelected = _selectedFilter == label;
    return GestureDetector(
      onTap: () {
        setState(() {
          _selectedFilter = label;
        });
      },
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 10),
        decoration: BoxDecoration(
          color: isSelected
              ? theme.colorScheme.primary
              : const Color(0xFF2A3025).withValues(alpha: 0.8),
          borderRadius: BorderRadius.circular(22),
        ),
        child: Text(
          label,
          style: theme.textTheme.bodyMedium?.copyWith(
            color: isSelected
                ? const Color(0xFF1A1F16)
                : const Color(0xFFB3B3B3),
            fontWeight: isSelected ? FontWeight.w600 : FontWeight.w400,
            fontSize: 14,
          ),
        ),
      ),
    );
  }

  Widget _buildCuratedTrendingSection(ThemeData theme) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Curated & Trending',
            style: theme.textTheme.headlineMedium?.copyWith(
              color: theme.colorScheme.onSurface,
              fontWeight: FontWeight.w700,
              fontSize: 22,
              letterSpacing: -0.3,
            ),
          ),
          const SizedBox(height: 16),
          Container(
            height: 180,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [
                  theme.colorScheme.primary,
                  theme.colorScheme.primary.withValues(alpha: 0.95),
                ],
              ),
              borderRadius: BorderRadius.circular(16),
            ),
            child: Stack(
              children: [
                // Dotted pattern across entire banner
                Positioned.fill(
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(16),
                    child: CustomPaint(
                      painter: _DottedPatternPainter(
                        color: const Color(0xFF121212).withValues(alpha: 0.1),
                      ),
                    ),
                  ),
                ),
                // Content row
                Row(
                  children: [
                    // Left side - text and buttons
                    Expanded(
                      flex: 5,
                      child: Padding(
                        padding: const EdgeInsets.fromLTRB(20, 20, 10, 20),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  'adele',
                                  style: theme.textTheme.displayMedium?.copyWith(
                                    color: const Color(0xFF1A1F16),
                                    fontWeight: FontWeight.w400,
                                    letterSpacing: 0.5,
                                    fontSize: 38,
                                    height: 1.0,
                                    fontStyle: FontStyle.italic,
                                  ),
                                ),
                                const SizedBox(height: 6),
                                Text(
                                  'LONDON U.K',
                                  style: theme.textTheme.bodySmall?.copyWith(
                                    color: const Color(0xFF1A1F16).withValues(alpha: 0.8),
                                    fontWeight: FontWeight.w500,
                                    letterSpacing: 1.5,
                                    fontSize: 11,
                                  ),
                                ),
                              ],
                            ),
                            // Action buttons
                            Row(
                              children: [
                                Container(
                                  padding: const EdgeInsets.all(10),
                                  decoration: BoxDecoration(
                                    color: const Color(0xFF1A1F16),
                                    shape: BoxShape.circle,
                                  ),
                                  child: CustomIconWidget(
                                    iconName: 'play_arrow',
                                    color: theme.colorScheme.primary,
                                    size: 20,
                                  ),
                                ),
                                const SizedBox(width: 12),
                                CustomIconWidget(
                                  iconName: 'favorite_border',
                                  color: const Color(0xFF1A1F16).withValues(alpha: 0.7),
                                  size: 24,
                                ),
                                const SizedBox(width: 12),
                                Text(
                                  '•••',
                                  style: TextStyle(
                                    color: const Color(0xFF1A1F16).withValues(alpha: 0.7),
                                    fontSize: 18,
                                    letterSpacing: 2,
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ),
                    // Right side - artist image
                    Expanded(
                      flex: 4,
                      child: ClipRRect(
                        borderRadius: const BorderRadius.only(
                          topRight: Radius.circular(16),
                          bottomRight: Radius.circular(16),
                        ),
                        child: CustomImageWidget(
                          imageUrl:
                              'https://img.rocket.new/generatedImages/rocket_gen_img_1fd7d71c6-1763297677001.png',
                          width: double.infinity,
                          height: 180,
                          fit: BoxFit.cover,
                          semanticLabel: 'Adele performing on stage',
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  void _handleMusicCardTap(Map<String, dynamic> music) {
    Navigator.pushNamed(context, '/music-player', arguments: music);
  }

  void _handleMusicCardLongPress(Map<String, dynamic> music) {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (context) => _buildQuickActionsSheet(music),
    );
  }

  void _handleArtistTap(Map<String, dynamic> artist) {
    Navigator.pushNamed(context, '/artist-profile', arguments: artist);
  }

  void _handleMoodTap(Map<String, dynamic> mood) {
    // Navigate directly to music player with the mood playlist
    Navigator.pushNamed(context, '/music-player', arguments: {
      'playlistName': mood['title'] ?? mood['name'],
      'mood': mood['name'],
    });
  }

  void _togglePlayPause() {
    setState(() {
      _isPlaying = !_isPlaying;
    });
  }

  Widget _buildQuickActionsSheet(Map<String, dynamic> music) {
    final theme = Theme.of(context);
    return Container(
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
      ),
      padding: const EdgeInsets.symmetric(vertical: 24, horizontal: 16),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 40,
            height: 4,
            decoration: BoxDecoration(
              color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.3),
              borderRadius: BorderRadius.circular(2),
            ),
          ),
          const SizedBox(height: 24),
          _buildQuickActionItem(
            icon: 'play_arrow',
            label: 'Play Now',
            onTap: () {
              Navigator.pop(context);
              _handleMusicCardTap(music);
            },
          ),
          _buildQuickActionItem(
            icon: 'playlist_add',
            label: 'Add to Playlist',
            onTap: () {
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text('Added to playlist'),
                  behavior: SnackBarBehavior.floating,
                ),
              );
            },
          ),
          _buildQuickActionItem(
            icon: 'share',
            label: 'Share',
            onTap: () {
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text('Share functionality coming soon'),
                  behavior: SnackBarBehavior.floating,
                ),
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildQuickActionItem({
    required String icon,
    required String label,
    required VoidCallback onTap,
  }) {
    final theme = Theme.of(context);
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 16),
        child: Row(
          children: [
            CustomIconWidget(
              iconName: icon,
              color: theme.colorScheme.onSurface,
              size: 24,
            ),
            const SizedBox(width: 16),
            Text(
              label,
              style: theme.textTheme.bodyLarge?.copyWith(
                color: theme.colorScheme.onSurface,
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: Colors.transparent,
      body: Stack(
        children: [
          RefreshIndicator(
            onRefresh: _handleRefresh,
            color: theme.colorScheme.primary,
            child: CustomScrollView(
              controller: _scrollController,
              physics: const AlwaysScrollableScrollPhysics(),
              slivers: [
                SliverAppBar(
                  floating: true,
                  snap: true,
                  automaticallyImplyLeading: false,
                  backgroundColor: Colors.transparent,
                  elevation: 0,
                  expandedHeight: 160,
                  flexibleSpace: FlexibleSpaceBar(
                    background: SafeArea(
                      child: Padding(
                        padding: const EdgeInsets.fromLTRB(16, 8, 16, 0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            // SONORA Logo at top center
                            Center(
                              child: Text(
                                'SONORA',
                                style: theme.textTheme.headlineSmall?.copyWith(
                                  color: theme.colorScheme.primary,
                                  fontWeight: FontWeight.w600,
                                  letterSpacing: 2.0,
                                  fontSize: 22,
                                ),
                              ),
                            ),
                            const SizedBox(height: 14),
                            // Profile and icons row
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Row(
                                  children: [
                                    Container(
                                      width: 44,
                                      height: 44,
                                      decoration: BoxDecoration(
                                        shape: BoxShape.circle,
                                        border: Border.all(
                                          color: theme.colorScheme.primary.withValues(alpha: 0.3),
                                          width: 2,
                                        ),
                                      ),
                                      child: ClipOval(
                                        child: CustomImageWidget(
                                          imageUrl:
                                              _userData["avatar"] as String,
                                          width: 44,
                                          height: 44,
                                          fit: BoxFit.cover,
                                          semanticLabel:
                                              _userData["avatarSemanticLabel"]
                                                  as String,
                                        ),
                                      ),
                                    ),
                                    const SizedBox(width: 12),
                                    Text(
                                      'Hi, ${_userData["name"] as String}',
                                      style: theme.textTheme.titleMedium
                                          ?.copyWith(
                                            color:
                                                theme.colorScheme.onSurface,
                                            fontWeight: FontWeight.w600,
                                            fontSize: 18,
                                          ),
                                    ),
                                  ],
                                ),
                                Row(
                                  children: [
                                    GestureDetector(
                                      onTap: _handleSearchTap,
                                      child: CustomIconWidget(
                                        iconName: 'search',
                                        color: theme.colorScheme.onSurface,
                                        size: 26,
                                      ),
                                    ),
                                    const SizedBox(width: 20),
                                    GestureDetector(
                                      onTap: () {
                                        ScaffoldMessenger.of(context)
                                            .showSnackBar(
                                          const SnackBar(
                                            content: Text('Favorites'),
                                            behavior:
                                                SnackBarBehavior.floating,
                                          ),
                                        );
                                      },
                                      child: CustomIconWidget(
                                        iconName: 'favorite_border',
                                        color: theme.colorScheme.onSurface,
                                        size: 26,
                                      ),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                            const SizedBox(height: 14),
                            // Filter buttons
                            SingleChildScrollView(
                              scrollDirection: Axis.horizontal,
                              padding: const EdgeInsets.only(right: 16),
                              child: Row(
                                children: [
                                  _buildFilterButton('All', theme),
                                  const SizedBox(width: 10),
                                  _buildFilterButton('Trending', theme),
                                  const SizedBox(width: 10),
                                  _buildFilterButton('New Release', theme),
                                  const SizedBox(width: 10),
                                  _buildFilterButton('Top in 2025', theme),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
                SliverToBoxAdapter(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const SizedBox(height: 16),
                      _buildCuratedTrendingSection(theme),
                      const SizedBox(height: 24),
                      MoodCardsWidget(onMoodTap: _handleMoodTap),
                      const SizedBox(height: 24),
                      ArtistSectionWidget(onArtistTap: _handleArtistTap),
                      SizedBox(height: _isPlaying ? 140 : 120),
                    ],
                  ),
                ),
              ],
            ),
          ),
          if (_isPlaying)
            Positioned(
              left: 0,
              right: 0,
              bottom: 100,
              child: MiniPlayerWidget(
                isPlaying: _isPlaying,
                onPlayPauseTap: _togglePlayPause,
                onTap: () {
                  Navigator.pushNamed(context, '/music-player');
                },
              ),
            ),
        ],
      ),
      // Bottom navigation is now handled by MainNavigation wrapper
    );
  }
}
