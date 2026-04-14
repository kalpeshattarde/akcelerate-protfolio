import 'package:flutter/material.dart';

import '../../../core/app_export.dart';

/// Albums tab widget with modern card design
class AlbumsTabWidget extends StatelessWidget {
  final List<Map<String, dynamic>> albums;
  final Function(Map<String, dynamic>) onAlbumTap;

  const AlbumsTabWidget({
    Key? key,
    required this.albums,
    required this.onAlbumTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return ListView.builder(
      physics: const ClampingScrollPhysics(),
      padding: const EdgeInsets.all(20),
      itemCount: albums.length,
      itemBuilder: (context, index) {
        final album = albums[index];
        return _buildAlbumCard(context, album, theme);
      },
    );
  }

  Widget _buildAlbumCard(
    BuildContext context,
    Map<String, dynamic> album,
    ThemeData theme,
  ) {
    return GestureDetector(
      onTap: () => onAlbumTap(album),
      child: Container(
        margin: const EdgeInsets.only(bottom: 16),
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: Colors.white.withValues(alpha: 0.05),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: Colors.white.withValues(alpha: 0.05),
            width: 1,
          ),
        ),
        child: Row(
          children: [
            // Album cover
            ClipRRect(
              borderRadius: BorderRadius.circular(12),
              child: CustomImageWidget(
                imageUrl: album["cover"] as String,
                width: 80,
                height: 80,
                fit: BoxFit.cover,
                semanticLabel: album["coverSemanticLabel"] as String,
              ),
            ),
            const SizedBox(width: 16),
            // Album info
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    album["title"] as String,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: 6),
                  Text(
                    album["releaseDate"] as String,
                    style: TextStyle(
                      color: Colors.white.withValues(alpha: 0.5),
                      fontSize: 13,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Row(
                    children: [
                      CustomIconWidget(
                        iconName: 'music_note',
                        color: theme.colorScheme.primary.withValues(alpha: 0.7),
                        size: 14,
                      ),
                      const SizedBox(width: 4),
                      Text(
                        '${album["trackCount"]} tracks',
                        style: TextStyle(
                          color: Colors.white.withValues(alpha: 0.5),
                          fontSize: 13,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            // Play button
            Container(
              width: 44,
              height: 44,
              decoration: BoxDecoration(
                color: theme.colorScheme.primary,
                borderRadius: BorderRadius.circular(22),
              ),
              child: const Center(
                child: CustomIconWidget(
                  iconName: 'play_arrow',
                  color: Color(0xFF1A1F16),
                  size: 24,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
