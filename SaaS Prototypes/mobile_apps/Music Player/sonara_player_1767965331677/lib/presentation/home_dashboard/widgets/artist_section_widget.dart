import 'package:flutter/material.dart';

import '../../../../core/app_export.dart';
import '../../../widgets/custom_image_widget.dart';

class ArtistSectionWidget extends StatelessWidget {
  final Function(Map<String, dynamic>) onArtistTap;

  const ArtistSectionWidget({Key? key, required this.onArtistTap})
    : super(key: key);

  final List<Map<String, dynamic>> _artists = const [
    {
      "id": 1,
      "name": "Adele",
      "genre": "Pop, Soul",
      "avatar":
          "https://img.rocket.new/generatedImages/rocket_gen_img_1fd7d71c6-1763297677001.png",
      "semanticLabel":
          "Portrait of Adele",
      "followers": "85M",
    },
    {
      "id": 2,
      "name": "Billie Eilish",
      "genre": "Pop, Alternative",
      "avatar":
          "https://img.rocket.new/generatedImages/rocket_gen_img_1fd7d71c6-1763297677001.png",
      "semanticLabel":
          "Portrait of Billie Eilish",
      "followers": "72M",
    },
    {
      "id": 3,
      "name": "Eminem",
      "genre": "Hip-Hop, Rap",
      "avatar":
          "https://img.rocket.new/generatedImages/rocket_gen_img_1c710bfb6-1763294397789.png",
      "semanticLabel":
          "Portrait of Eminem",
      "followers": "68M",
    },
    {
      "id": 4,
      "name": "Taylor Swift",
      "genre": "Pop, Country",
      "avatar":
          "https://img.rocket.new/generatedImages/rocket_gen_img_1fd7d71c6-1763297677001.png",
      "semanticLabel":
          "Portrait of Taylor Swift",
      "followers": "91M",
    },
    {
      "id": 5,
      "name": "Sia",
      "genre": "Pop, Electronic",
      "avatar": "https://img.rocket.new/generatedImages/rocket_gen_img_1fd7d71c6-1763297677001.png",
      "semanticLabel":
          "Portrait of Sia",
      "followers": "78M",
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
                'Artists',
                style: theme.textTheme.headlineMedium?.copyWith(
                  color: theme.colorScheme.onSurface,
                  fontWeight: FontWeight.w700,
                  fontSize: 22,
                  letterSpacing: -0.3,
                ),
              ),
              TextButton(
                key: const ValueKey('artists_see_all'),
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('View all artists'),
                      behavior: SnackBarBehavior.floating,
                      duration: Duration(seconds: 1),
                    ),
                  );
                },
                child: Text(
                  'See all >',
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: theme.colorScheme.primary,
                    fontWeight: FontWeight.w500,
                    fontSize: 14,
                  ),
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 16),
        SizedBox(
          height: 120,
          child: ListView.separated(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            scrollDirection: Axis.horizontal,
            itemCount: _artists.length,
            separatorBuilder: (context, index) => const SizedBox(width: 16),
            itemBuilder: (context, index) {
              final artist = _artists[index];
              return _buildArtistCard(artist, theme, context);
            },
          ),
        ),
      ],
    );
  }

  Widget _buildArtistCard(
    Map<String, dynamic> artist,
    ThemeData theme,
    BuildContext context,
  ) {
    return GestureDetector(
      onTap: () => onArtistTap(artist),
      child: SizedBox(
        width: 80,
        child: Column(
          children: [
            Container(
              width: 80,
              height: 80,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: 0.2),
                    blurRadius: 6,
                    offset: const Offset(0, 2),
                  ),
                ],
              ),
              child: ClipOval(
                child: CustomImageWidget(
                  imageUrl: artist["avatar"] as String,
                  width: 80,
                  height: 80,
                  fit: BoxFit.cover,
                  semanticLabel: artist["semanticLabel"] as String,
                ),
              ),
            ),
            const SizedBox(height: 8),
            Text(
              artist["name"] as String,
              style: theme.textTheme.bodySmall?.copyWith(
                color: theme.colorScheme.onSurface,
                fontWeight: FontWeight.w500,
                fontSize: 12,
              ),
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}
