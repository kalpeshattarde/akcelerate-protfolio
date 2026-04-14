import 'package:flutter/material.dart';

import '../../../../core/app_export.dart';

class TrendingSectionWidget extends StatelessWidget {
  final Function(Map<String, dynamic>) onMusicTap;
  final Function(Map<String, dynamic>) onMusicLongPress;

  const TrendingSectionWidget({
    Key? key,
    required this.onMusicTap,
    required this.onMusicLongPress,
  }) : super(key: key);

  final List<Map<String, dynamic>> _trendingMusic = const [
    {
      "id": 1,
      "title": "Blinding Lights",
      "artist": "The Weeknd",
      "album": "After Hours",
      "image": "https://images.unsplash.com/photo-1698679324756-63617972acb3",
      "semanticLabel":
          "Neon-lit cityscape at night with vibrant purple and blue lights reflecting on wet streets",
      "duration": "3:20",
      "plays": "2.5M",
    },
    {
      "id": 2,
      "title": "Levitating",
      "artist": "Dua Lipa",
      "album": "Future Nostalgia",
      "image": "https://images.unsplash.com/photo-1559502898-e32d52a9de3b",
      "semanticLabel":
          "Disco ball reflecting colorful lights in a vibrant dance club atmosphere",
      "duration": "3:23",
      "plays": "1.8M",
    },
    {
      "id": 3,
      "title": "Save Your Tears",
      "artist": "The Weeknd",
      "album": "After Hours",
      "image": "https://images.unsplash.com/photo-1584521947172-ad6d0433b172",
      "semanticLabel":
          "Emotional concert scene with artist silhouetted against dramatic stage lighting",
      "duration": "3:35",
      "plays": "2.1M",
    },
    {
      "id": 4,
      "title": "Good 4 U",
      "artist": "Olivia Rodrigo",
      "album": "SOUR",
      "image": "https://images.unsplash.com/photo-1490915829216-3f2347b1e830",
      "semanticLabel":
          "Young artist performing with electric guitar under bright stage lights",
      "duration": "2:58",
      "plays": "1.6M",
    },
  ];

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Trending Now',
                style: theme.textTheme.headlineSmall?.copyWith(
                  color: theme.colorScheme.onSurface,
                  fontWeight: FontWeight.w700,
                ),
              ),
              TextButton(
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('View all trending music'),
                      behavior: SnackBarBehavior.floating,
                      duration: Duration(seconds: 1),
                    ),
                  );
                },
                child: Text(
                  'See All',
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: theme.colorScheme.primary,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 12),
        SizedBox(
          height: 200,
          child: ListView.separated(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            scrollDirection: Axis.horizontal,
            itemCount: _trendingMusic.length,
            separatorBuilder: (context, index) => const SizedBox(width: 12),
            itemBuilder: (context, index) {
              final music = _trendingMusic[index];
              return _buildMusicCard(music, theme, context);
            },
          ),
        ),
      ],
    );
  }

  Widget _buildMusicCard(
    Map<String, dynamic> music,
    ThemeData theme,
    BuildContext context,
  ) {
    return GestureDetector(
      onTap: () => onMusicTap(music),
      onLongPress: () => onMusicLongPress(music),
      child: Container(
        width: 140,
        decoration: BoxDecoration(
          color: theme.colorScheme.surface,
          borderRadius: BorderRadius.circular(12),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.1),
              blurRadius: 8,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ClipRRect(
              borderRadius: const BorderRadius.vertical(
                top: Radius.circular(12),
              ),
              child: Stack(
                children: [
                  CustomImageWidget(
                    imageUrl: music["image"] as String,
                    width: 140,
                    height: 140,
                    fit: BoxFit.cover,
                    semanticLabel: music["semanticLabel"] as String,
                  ),
                  Positioned(
                    top: 8,
                    right: 8,
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 8,
                        vertical: 4,
                      ),
                      decoration: BoxDecoration(
                        color: Colors.black.withValues(alpha: 0.6),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          CustomIconWidget(
                            iconName: 'play_arrow',
                            color: Colors.white,
                            size: 12,
                          ),
                          const SizedBox(width: 2),
                          Text(
                            music["plays"] as String,
                            style: theme.textTheme.labelSmall?.copyWith(
                              color: Colors.white,
                              fontSize: 10,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.all(8),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      music["title"] as String,
                      style: theme.textTheme.bodyMedium?.copyWith(
                        color: theme.colorScheme.onSurface,
                        fontWeight: FontWeight.w600,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                    const SizedBox(height: 2),
                    Text(
                      music["artist"] as String,
                      style: theme.textTheme.bodySmall?.copyWith(
                        color: theme.colorScheme.onSurfaceVariant,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
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
}
