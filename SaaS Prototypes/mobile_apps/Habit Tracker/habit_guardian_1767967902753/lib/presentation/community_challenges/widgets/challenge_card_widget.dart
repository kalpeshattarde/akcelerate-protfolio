import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../../core/app_export.dart';

class ChallengeCardWidget extends StatelessWidget {
  final Map<String, dynamic> challenge;
  final VoidCallback? onJoin;
  final VoidCallback onShowLeaderboard;
  final Animation<double> breathingAnimation;

  const ChallengeCardWidget({
    super.key,
    required this.challenge,
    this.onJoin,
    required this.onShowLeaderboard,
    required this.breathingAnimation,
  });

  Color get _difficultyColor {
    switch (challenge['difficulty']) {
      case 'Easy':
        return const Color(0xFF4A7C59); // Muted forest green
      case 'Intermediate':
        return const Color(0xFFC17B5A); // Terracotta
      case 'Advanced':
        return const Color(0xFFD4A574); // Rustic gold
      default:
        return const Color(0xFF4A7C59);
    }
  }

  IconData get _categoryIcon {
    switch (challenge['category']) {
      case 'Wellness':
        return Icons.favorite_rounded;
      case 'Productivity':
        return Icons.trending_up_rounded;
      case 'Mindfulness':
        return Icons.spa_rounded;
      case 'Fitness':
        return Icons.fitness_center_rounded;
      default:
        return Icons.star_rounded;
    }
  }

  @override
  Widget build(BuildContext context) {
    final isJoined = challenge['isJoined'] ?? false;
    final progress = challenge['progress'] ?? 0.0;

    return AnimatedBuilder(
      animation: breathingAnimation,
      builder: (context, child) {
        final scale = isJoined && progress > 0 ? breathingAnimation.value : 1.0;

        return Transform.scale(
          scale: scale,
          child: Container(
            decoration: BoxDecoration(
              color: const Color(0xFFF8F6F2), // Subtle warm white for cards
              borderRadius: BorderRadius.circular(24), // Soft 24px radius
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withAlpha(13), // Light shadow for depth
                  blurRadius: 12,
                  offset: const Offset(0, 4),
                ),
                BoxShadow(
                  color: Colors.black.withAlpha(8),
                  blurRadius: 6,
                  offset: const Offset(0, 1),
                ),
              ],
            ),
            child: Material(
              color: Colors.transparent,
              child: InkWell(
                onTap: () {
                  HapticFeedback.lightImpact();
                  if (isJoined) {
                    onShowLeaderboard();
                  } else if (onJoin != null) {
                    onJoin!();
                  }
                },
                borderRadius: BorderRadius.circular(24),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _buildBannerImage(),
                    Container(
                      padding: const EdgeInsets.all(24), // Consistent padding
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          _buildHeader(context),
                          const SizedBox(height: 20), // Even spacing
                          _buildContent(context),
                          const SizedBox(height: 20), // Rhythmic spacing
                          _buildFooter(context, isJoined, progress),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildBannerImage() {
    return Container(
      height: 160, // Top banner image
      decoration: BoxDecoration(
        borderRadius: const BorderRadius.only(
          topLeft: Radius.circular(24),
          topRight: Radius.circular(24),
        ),
      ),
      child: Stack(
        children: [
          // Background image
          Container(
            width: double.infinity,
            height: 160,
            decoration: BoxDecoration(
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(24),
                topRight: Radius.circular(24),
              ),
              image: DecorationImage(
                image: NetworkImage(challenge['image']),
                fit: BoxFit.cover,
              ),
            ),
          ),

          // Smooth gradient overlay for text legibility
          Container(
            width: double.infinity,
            height: 160,
            decoration: BoxDecoration(
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(24),
                topRight: Radius.circular(24),
              ),
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [
                  Colors.transparent,
                  Colors.black.withAlpha(77), // Smooth gradient
                ],
              ),
            ),
          ),

          // Category badge positioned in top banner
          Positioned(
            top: 16,
            left: 16,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
              decoration: BoxDecoration(
                color: _difficultyColor.withAlpha(230),
                borderRadius: BorderRadius.circular(12),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withAlpha(26),
                    blurRadius: 8,
                    offset: const Offset(0, 2),
                  ),
                ],
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(
                    _categoryIcon,
                    size: 14,
                    color: const Color(0xFFFEFCF8), // Creamy white
                  ),
                  const SizedBox(width: 6),
                  Text(
                    challenge['category'],
                    style: GoogleFonts.inter(
                      fontSize: 12,
                      fontWeight: FontWeight.w600,
                      color: const Color(0xFFFEFCF8), // Creamy white
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildHeader(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Challenge title in bold, elegant typography
              Text(
                challenge['title'],
                style: GoogleFonts.inter(
                  fontSize: 20, // Large enough for clarity
                  fontWeight: FontWeight.w700, // Bold, elegant
                  color: const Color(0xFF1A1A1A), // Near-black
                  height: 1.3,
                  letterSpacing: -0.2,
                ),
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
              const SizedBox(height: 8),

              // Duration and participants info
              Row(
                children: [
                  Icon(
                    Icons.schedule_rounded,
                    size: 16,
                    color: const Color(0xFF6B6B6B), // Medium gray
                  ),
                  const SizedBox(width: 6),
                  Text(
                    challenge['duration'],
                    style: GoogleFonts.inter(
                      fontSize: 13,
                      fontWeight: FontWeight.w500,
                      color: const Color(0xFF6B6B6B), // Medium gray
                    ),
                  ),
                  const SizedBox(width: 16),
                  Icon(
                    Icons.people_rounded,
                    size: 16,
                    color: const Color(0xFF6B6B6B), // Medium gray
                  ),
                  const SizedBox(width: 6),
                  Text(
                    '${challenge['participants']}',
                    style: GoogleFonts.inter(
                      fontSize: 13,
                      fontWeight: FontWeight.w500,
                      color: const Color(0xFF6B6B6B), // Medium gray
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
        const SizedBox(width: 16),

        // Difficulty badge
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
          decoration: BoxDecoration(
            color: _difficultyColor.withAlpha(26),
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: _difficultyColor.withAlpha(77),
              width: 1,
            ),
          ),
          child: Text(
            challenge['difficulty'],
            style: GoogleFonts.inter(
              fontSize: 12,
              fontWeight: FontWeight.w600,
              color: _difficultyColor,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildContent(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Small description in muted tone
        Text(
          challenge['description'],
          style: GoogleFonts.inter(
            fontSize: 15,
            fontWeight: FontWeight.w400,
            color: const Color(0xFF6B6B6B), // Muted tone
            height: 1.5,
          ),
          maxLines: 2,
          overflow: TextOverflow.ellipsis,
        ),

        // Leaderboard position if joined
        if (challenge['isJoined'] &&
            challenge['leaderboardPosition'] != null) ...[
          const SizedBox(height: 16),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            decoration: BoxDecoration(
              color: const Color(0xFFD4A574).withAlpha(26), // Rustic gold
              borderRadius: BorderRadius.circular(12),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(
                  Icons.emoji_events_rounded,
                  size: 16,
                  color: const Color(0xFFD4A574), // Rustic gold
                ),
                const SizedBox(width: 8),
                Text(
                  'Rank #${challenge['leaderboardPosition']}',
                  style: GoogleFonts.inter(
                    fontSize: 13,
                    fontWeight: FontWeight.w600,
                    color: const Color(0xFFD4A574), // Rustic gold
                  ),
                ),
              ],
            ),
          ),
        ],
      ],
    );
  }

  Widget _buildFooter(BuildContext context, bool isJoined, double progress) {
    if (isJoined) {
      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Progress bar with natural motion
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Progress',
                style: GoogleFonts.inter(
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                  color: const Color(0xFF6B6B6B), // Medium gray
                ),
              ),
              Text(
                '${(progress * 100).round()}%',
                style: GoogleFonts.inter(
                  fontSize: 14,
                  fontWeight: FontWeight.w700,
                  color: const Color(0xFFC17B5A), // Terracotta accent
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          ClipRRect(
            borderRadius: BorderRadius.circular(8),
            child: LinearProgressIndicator(
              value: progress,
              backgroundColor: const Color(0xFFE8E4DE), // Minimal border color
              valueColor: const AlwaysStoppedAnimation<Color>(
                Color(0xFFC17B5A), // Terracotta accent for progress
              ),
              minHeight: 8,
            ),
          ),
          const SizedBox(height: 20),

          // View Leaderboard button - secondary in outline
          SizedBox(
            width: double.infinity,
            child: OutlinedButton(
              onPressed: onShowLeaderboard,
              style: OutlinedButton.styleFrom(
                side: const BorderSide(
                  color: Color(0xFF2D5A3D), // Deep forest green
                  width: 1.5,
                ),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16), // Soft rounded edges
                ),
                padding: const EdgeInsets.symmetric(vertical: 18),
                backgroundColor: Colors.transparent,
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.leaderboard_rounded,
                    size: 20,
                    color: const Color(0xFF2D5A3D), // Deep forest green
                  ),
                  const SizedBox(width: 12),
                  Text(
                    'View Leaderboard',
                    style: GoogleFonts.inter(
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                      color: const Color(0xFF2D5A3D), // Deep forest green
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      );
    }

    // Join Challenge button - main action in accent color
    return SizedBox(
      width: double.infinity,
      child: ElevatedButton(
        onPressed: onJoin,
        style: ElevatedButton.styleFrom(
          backgroundColor: const Color(0xFF2D5A3D), // Deep forest green accent
          foregroundColor: const Color(0xFFFEFCF8), // Creamy white
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16), // Soft rounded edges
          ),
          padding: const EdgeInsets.symmetric(vertical: 20),
          elevation: 0,
          shadowColor: Colors.transparent,
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.add_rounded,
              size: 22,
              color: const Color(0xFFFEFCF8), // Creamy white
            ),
            const SizedBox(width: 12),
            Text(
              'Join Challenge',
              style: GoogleFonts.inter(
                fontSize: 16,
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
      ),
    );
  }
}