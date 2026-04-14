import 'dart:ui';
import 'package:flutter/material.dart';

import '../../../core/app_export.dart';

class MiniPlayerWidget extends StatelessWidget {
  final bool isPlaying;
  final VoidCallback onPlayPauseTap;
  final VoidCallback onTap;

  const MiniPlayerWidget({
    Key? key,
    required this.isPlaying,
    required this.onPlayPauseTap,
    required this.onTap,
  }) : super(key: key);

  final Map<String, dynamic> _currentTrack = const {
    "title": "Blinding Lights",
    "artist": "The Weeknd",
    "image":
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80",
    "semanticLabel":
        "Concert stage with colorful lights",
  };

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return GestureDetector(
      onTap: onTap,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(16),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 15, sigmaY: 15),
          child: Container(
            margin: const EdgeInsets.symmetric(horizontal: 16),
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: const Color(0xFF2A3025).withValues(alpha: 0.9),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(
                color: Colors.white.withValues(alpha: 0.1),
                width: 1,
              ),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.3),
                  blurRadius: 15,
                  offset: const Offset(0, -4),
                ),
              ],
            ),
            child: Row(
              children: [
                // Album art
                ClipRRect(
                  borderRadius: BorderRadius.circular(8),
                  child: CustomImageWidget(
                    imageUrl: _currentTrack["image"] as String,
                    width: 48,
                    height: 48,
                    fit: BoxFit.cover,
                    semanticLabel: _currentTrack["semanticLabel"] as String,
                  ),
                ),
                const SizedBox(width: 12),
                // Track info
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        _currentTrack["title"] as String,
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 14,
                          fontWeight: FontWeight.w600,
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                      const SizedBox(height: 2),
                      Text(
                        _currentTrack["artist"] as String,
                        style: TextStyle(
                          color: Colors.white.withValues(alpha: 0.6),
                          fontSize: 12,
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ],
                  ),
                ),
                const SizedBox(width: 8),
                // Play/Pause button
                GestureDetector(
                  onTap: onPlayPauseTap,
                  child: Container(
                    width: 40,
                    height: 40,
                    decoration: BoxDecoration(
                      color: theme.colorScheme.primary,
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Center(
                      child: CustomIconWidget(
                        iconName: isPlaying ? 'pause' : 'play_arrow',
                        color: const Color(0xFF1A1F16),
                        size: 24,
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                // Next button
                GestureDetector(
                  onTap: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('Next track'),
                        backgroundColor: Color(0xFF2A3025),
                        behavior: SnackBarBehavior.floating,
                        duration: Duration(seconds: 1),
                      ),
                    );
                  },
                  child: CustomIconWidget(
                    iconName: 'skip_next',
                    color: Colors.white.withValues(alpha: 0.8),
                    size: 28,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
