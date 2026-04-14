import 'package:flutter/material.dart';

import '../../../../core/app_export.dart';
import '../../../widgets/custom_image_widget.dart';

class MoodCardsWidget extends StatelessWidget {
  final Function(Map<String, dynamic>) onMoodTap;

  const MoodCardsWidget({Key? key, required this.onMoodTap}) : super(key: key);

  final List<Map<String, dynamic>> _moods = const [
    {
      "id": 1,
      "name": "Minuit",
      "title": "Midi Minuit",
      "emoji": "",
      "color": Color(0xFF1E1E1E),
      "image": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      "semanticLabel":
          "Sunset over water with vibrant colors",
    },
    {
      "id": 2,
      "name": "Chill",
      "title": "Flamenco Chill",
      "emoji": "",
      "color": Color(0xFF6BCB77),
      "image": "https://images.unsplash.com/photo-1519682337058-a94d519337bc",
      "semanticLabel":
          "Hand holding a red fan",
    },
    {
      "id": 3,
      "name": "Festival",
      "title": "Festivals 2022",
      "emoji": "",
      "color": Color(0xFFFF6B6B),
      "image": "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3",
      "semanticLabel":
          "Crowd with hands raised at a concert",
    },
    {
      "id": 4,
      "name": "Jazz",
      "title": "Jazz Vibes",
      "emoji": "",
      "color": Color(0xFF4D96FF),
      "image": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      "semanticLabel":
          "Two palm trees against a blue sky",
    },
    {
      "id": 5,
      "name": "Mix",
      "title": "Sunny Mix",
      "emoji": "",
      "color": Color(0xFFFFD93D),
      "image": "https://images.unsplash.com/photo-1550258987-190a2d41a8ba",
      "semanticLabel":
          "Pineapple on a sunny background",
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
                'Moods',
                style: theme.textTheme.headlineMedium?.copyWith(
                  color: theme.colorScheme.onSurface,
                  fontWeight: FontWeight.w700,
                  fontSize: 22,
                  letterSpacing: -0.3,
                ),
              ),
              TextButton(
                key: const ValueKey('moods_see_all'),
                onPressed: () {
                  // Navigate to playlists tab (index 2)
                  Navigator.pushNamed(context, '/playlist-management');
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
          height: 130,
          child: ListView.separated(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            scrollDirection: Axis.horizontal,
            itemCount: _moods.length,
            separatorBuilder: (context, index) => const SizedBox(width: 12),
            itemBuilder: (context, index) {
              final mood = _moods[index];
              return _buildMoodCard(mood, theme, context);
            },
          ),
        ),
      ],
    );
  }

  Widget _buildMoodCard(
    Map<String, dynamic> mood,
    ThemeData theme,
    BuildContext context,
  ) {
    return GestureDetector(
      onTap: () => onMoodTap(mood),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 100,
            height: 100,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(12),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.15),
                  blurRadius: 6,
                  offset: const Offset(0, 2),
                ),
              ],
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(12),
              child: Stack(
                fit: StackFit.expand,
                children: [
                  CustomImageWidget(
                    imageUrl: mood["image"] as String,
                    width: 100,
                    height: 100,
                    fit: BoxFit.cover,
                    semanticLabel: mood["semanticLabel"] as String,
                  ),
                  Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        colors: [
                          Colors.black.withValues(alpha: 0.2),
                          Colors.black.withValues(alpha: 0.5),
                        ],
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.start,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        if ((mood["title"] as String).isNotEmpty)
                          Text(
                            mood["title"] as String,
                            style: theme.textTheme.labelSmall?.copyWith(
                              color: Colors.white.withValues(alpha: 0.95),
                              fontWeight: FontWeight.w500,
                              fontSize: 10,
                            ),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 8),
          SizedBox(
            width: 100,
            child: Text(
              mood["name"] as String,
              style: theme.textTheme.bodySmall?.copyWith(
                color: theme.colorScheme.onSurface,
                fontWeight: FontWeight.w500,
                fontSize: 13,
              ),
              textAlign: TextAlign.center,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
          ),
        ],
      ),
    );
  }
}
