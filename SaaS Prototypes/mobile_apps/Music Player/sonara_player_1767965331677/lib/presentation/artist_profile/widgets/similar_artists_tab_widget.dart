import 'package:flutter/material.dart';

import '../../../core/app_export.dart';

/// Similar artists tab widget with modern grid design
class SimilarArtistsTabWidget extends StatefulWidget {
  final List<Map<String, dynamic>> artists;
  final Function(Map<String, dynamic>) onArtistTap;

  const SimilarArtistsTabWidget({
    Key? key,
    required this.artists,
    required this.onArtistTap,
  }) : super(key: key);

  @override
  State<SimilarArtistsTabWidget> createState() =>
      _SimilarArtistsTabWidgetState();
}

class _SimilarArtistsTabWidgetState extends State<SimilarArtistsTabWidget> {
  final Set<int> _followingArtists = {};

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return GridView.builder(
      physics: const ClampingScrollPhysics(),
      padding: const EdgeInsets.all(20),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        crossAxisSpacing: 16,
        mainAxisSpacing: 16,
        childAspectRatio: 0.85,
      ),
      itemCount: widget.artists.length,
      itemBuilder: (context, index) {
        final artist = widget.artists[index];
        final isFollowing = _followingArtists.contains(artist["id"]);
        return _buildArtistCard(context, artist, isFollowing, theme);
      },
    );
  }

  Widget _buildArtistCard(
    BuildContext context,
    Map<String, dynamic> artist,
    bool isFollowing,
    ThemeData theme,
  ) {
    return GestureDetector(
      onTap: () => widget.onArtistTap(artist),
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white.withValues(alpha: 0.05),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: Colors.white.withValues(alpha: 0.05),
            width: 1,
          ),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Artist image
            Container(
              width: 80,
              height: 80,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(
                  color: theme.colorScheme.primary.withValues(alpha: 0.3),
                  width: 2,
                ),
              ),
              child: ClipOval(
                child: CustomImageWidget(
                  imageUrl: artist["image"] as String,
                  width: 80,
                  height: 80,
                  fit: BoxFit.cover,
                  semanticLabel: artist["imageSemanticLabel"] as String,
                ),
              ),
            ),
            const SizedBox(height: 12),
            // Artist name
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 12),
              child: Text(
                artist["name"] as String,
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                ),
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                textAlign: TextAlign.center,
              ),
            ),
            const SizedBox(height: 4),
            // Followers
            Text(
              '${artist["followers"]} followers',
              style: TextStyle(
                color: Colors.white.withValues(alpha: 0.5),
                fontSize: 12,
              ),
            ),
            const SizedBox(height: 12),
            // Follow button
            GestureDetector(
              onTap: () {
                setState(() {
                  if (isFollowing) {
                    _followingArtists.remove(artist["id"]);
                  } else {
                    _followingArtists.add(artist["id"] as int);
                  }
                });
              },
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                decoration: BoxDecoration(
                  color: isFollowing
                      ? theme.colorScheme.primary.withValues(alpha: 0.2)
                      : Colors.transparent,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(
                    color: isFollowing
                        ? theme.colorScheme.primary
                        : Colors.white.withValues(alpha: 0.3),
                    width: 1,
                  ),
                ),
                child: Text(
                  isFollowing ? 'Following' : 'Follow',
                  style: TextStyle(
                    color: isFollowing
                        ? theme.colorScheme.primary
                        : Colors.white,
                    fontSize: 12,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
