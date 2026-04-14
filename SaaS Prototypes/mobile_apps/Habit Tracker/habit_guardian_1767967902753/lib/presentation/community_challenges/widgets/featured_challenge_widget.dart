import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../../core/app_export.dart';

class FeaturedChallengeWidget extends StatelessWidget {
  final Map<String, dynamic> challenge;
  final VoidCallback onJoin;
  final VoidCallback onShowLeaderboard;
  final Animation<double> breathingAnimation;

  const FeaturedChallengeWidget({
    super.key,
    required this.challenge,
    required this.onJoin,
    required this.onShowLeaderboard,
    required this.breathingAnimation,
  });

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
              borderRadius: BorderRadius.circular(24),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withAlpha(26),
                  blurRadius: 16,
                  offset: const Offset(0, 6),
                ),
                BoxShadow(
                  color: Colors.black.withAlpha(8),
                  blurRadius: 4,
                  offset: const Offset(0, 2),
                ),
              ],
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(24),
              child: Stack(
                children: [
                  // Background image with smooth gradient overlay
                  Container(
                    height: 280,
                    decoration: BoxDecoration(
                      image: DecorationImage(
                        image: NetworkImage(challenge['image']),
                        fit: BoxFit.cover,
                      ),
                    ),
                  ),

                  // Smooth gradient overlay for text legibility
                  Container(
                    height: 280,
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        stops: const [0.0, 0.4, 0.7, 1.0],
                        colors: [
                          Colors.black.withAlpha(13),
                          Colors.black.withAlpha(51),
                          Colors.black.withAlpha(128),
                          Colors.black.withAlpha(179),
                        ],
                      ),
                    ),
                  ),

                  // Content overlay with elegant spacing
                  Container(
                    height: 280,
                    padding: const EdgeInsets.all(28),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        _buildFeaturedBadge(context),
                        const Spacer(),
                        _buildContent(context, isJoined, progress),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildFeaturedBadge(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(
        color: const Color(0xFFD4A574),
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: const Color(0xFFD4A574).withAlpha(77),
            blurRadius: 12,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            Icons.star_rounded,
            size: 18,
            color: const Color(0xFF1A1A1A),
          ),
          const SizedBox(width: 6),
          Text(
            'Featured',
            style: GoogleFonts.inter(
              fontSize: 14,
              fontWeight: FontWeight.w700,
              color: const Color(0xFF1A1A1A),
              letterSpacing: 0.5,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildContent(BuildContext context, bool isJoined, double progress) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Challenge title with elegant bold typography
        Text(
          challenge['title'],
          style: GoogleFonts.inter(
            fontSize: 28,
            fontWeight: FontWeight.w800,
            color: const Color(0xFFFEFCF8),
            height: 1.2,
            letterSpacing: -0.5,
          ),
          maxLines: 2,
          overflow: TextOverflow.ellipsis,
        ),
        const SizedBox(height: 16),

        // Small description in muted tone
        Text(
          challenge['description'],
          style: GoogleFonts.inter(
            fontSize: 16,
            fontWeight: FontWeight.w400,
            color: const Color(0xFFFEFCF8).withAlpha(204),
            height: 1.4,
          ),
          maxLines: 2,
          overflow: TextOverflow.ellipsis,
        ),
        const SizedBox(height: 24),
        _buildStats(context),
        const SizedBox(height: 24),
        _buildActionButton(context, isJoined, progress),
      ],
    );
  }

  Widget _buildStats(BuildContext context) {
    return Row(
      children: [
        _buildStat(
          Icons.people_rounded,
          '${challenge['participants']}',
        ),
        const SizedBox(width: 24),
        _buildStat(Icons.schedule_rounded, challenge['duration']),
        const SizedBox(width: 24),
        _buildStat(
          Icons.signal_cellular_alt_rounded,
          challenge['difficulty'],
        ),
      ],
    );
  }

  Widget _buildStat(IconData icon, String text) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(
          icon,
          size: 18,
          color: const Color(0xFFFEFCF8).withAlpha(179),
        ),
        const SizedBox(width: 8),
        Text(
          text,
          style: GoogleFonts.inter(
            fontSize: 14,
            fontWeight: FontWeight.w600,
            color: const Color(0xFFFEFCF8).withAlpha(179),
          ),
        ),
      ],
    );
  }

  Widget _buildActionButton(
    BuildContext context,
    bool isJoined,
    double progress,
  ) {
    if (isJoined) {
      return Column(
        children: [
          // Progress bar with natural motion - rustic gold accent
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: const Color(0xFFFEFCF8).withAlpha(26),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(
                color: const Color(0xFFFEFCF8).withAlpha(51),
                width: 1,
              ),
            ),
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'Your Progress',
                      style: GoogleFonts.inter(
                        fontSize: 15,
                        fontWeight: FontWeight.w600,
                        color: const Color(0xFFFEFCF8).withAlpha(204),
                      ),
                    ),
                    Row(
                      children: [
                        if (challenge['leaderboardPosition'] != null) ...[
                          Icon(
                            Icons.emoji_events_rounded,
                            size: 18,
                            color: const Color(0xFFD4A574),
                          ),
                          const SizedBox(width: 8),
                          Text(
                            '#${challenge['leaderboardPosition']}',
                            style: GoogleFonts.inter(
                              fontSize: 15,
                              fontWeight: FontWeight.w700,
                              color: const Color(0xFFD4A574),
                            ),
                          ),
                          const SizedBox(width: 20),
                        ],
                        Text(
                          '${(progress * 100).round()}%',
                          style: GoogleFonts.inter(
                            fontSize: 15,
                            fontWeight: FontWeight.w700,
                            color: const Color(0xFFFEFCF8),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                ClipRRect(
                  borderRadius: BorderRadius.circular(8),
                  child: LinearProgressIndicator(
                    value: progress,
                    backgroundColor: const Color(0xFFFEFCF8).withAlpha(51),
                    valueColor: const AlwaysStoppedAnimation<Color>(
                      Color(0xFFD4A574),
                    ),
                    minHeight: 10,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),

          // View Leaderboard button - secondary in outline style
          SizedBox(
            width: double.infinity,
            child: OutlinedButton(
              onPressed: () {
                HapticFeedback.lightImpact();
                onShowLeaderboard();
              },
              style: OutlinedButton.styleFrom(
                side: BorderSide(
                  color: const Color(0xFFFEFCF8),
                  width: 2,
                ),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                ),
                padding: const EdgeInsets.symmetric(vertical: 18),
                backgroundColor: Colors.transparent,
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.leaderboard_rounded,
                    size: 22,
                    color: const Color(0xFFFEFCF8),
                  ),
                  const SizedBox(width: 12),
                  Text(
                    'View Leaderboard',
                    style: GoogleFonts.inter(
                      fontSize: 17,
                      fontWeight: FontWeight.w600,
                      color: const Color(0xFFFEFCF8),
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
        onPressed: () {
          HapticFeedback.lightImpact();
          onJoin();
        },
        style: ElevatedButton.styleFrom(
          backgroundColor: const Color(0xFF2D5A3D),
          foregroundColor: const Color(0xFFFEFCF8),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
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
              size: 24,
              color: const Color(0xFFFEFCF8),
            ),
            const SizedBox(width: 12),
            Text(
              'Join Challenge',
              style: GoogleFonts.inter(
                fontSize: 18,
                fontWeight: FontWeight.w700,
              ),
            ),
          ],
        ),
      ),
    );
  }
}