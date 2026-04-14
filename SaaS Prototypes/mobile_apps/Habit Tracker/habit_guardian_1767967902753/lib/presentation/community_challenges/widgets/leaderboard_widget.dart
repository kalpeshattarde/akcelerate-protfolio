import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../../core/app_export.dart';

class LeaderboardWidget extends StatelessWidget {
  final Map<String, dynamic> challenge;

  const LeaderboardWidget({
    super.key,
    required this.challenge,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(top: 60),
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.surface,
        borderRadius: const BorderRadius.only(
          topLeft: Radius.circular(24),
          topRight: Radius.circular(24),
        ),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          _buildHeader(context),
          _buildLeaderboard(context),
          const SizedBox(height: 24),
        ],
      ),
    );
  }

  Widget _buildHeader(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        border: Border(
          bottom: BorderSide(
            color: Theme.of(context).colorScheme.outline.withAlpha(51),
            width: 1,
          ),
        ),
      ),
      child: Column(
        children: [
          // Handle bar
          Container(
            width: 40,
            height: 4,
            decoration: BoxDecoration(
              color: Theme.of(context).colorScheme.outline.withAlpha(77),
              borderRadius: BorderRadius.circular(2),
            ),
          ),
          const SizedBox(height: 16),

          Row(
            children: [
              Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(12),
                  image: DecorationImage(
                    image: NetworkImage(challenge['image']),
                    fit: BoxFit.cover,
                  ),
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      challenge['title'],
                      style: GoogleFonts.inter(
                        fontSize: 18,
                        fontWeight: FontWeight.w600,
                        color: Theme.of(context).colorScheme.onSurface,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                    const SizedBox(height: 4),
                    Text(
                      'Leaderboard',
                      style: GoogleFonts.inter(
                        fontSize: 14,
                        color: Theme.of(context)
                            .colorScheme
                            .onSurface
                            .withAlpha(179),
                      ),
                    ),
                  ],
                ),
              ),
              IconButton(
                onPressed: () {
                  HapticFeedback.lightImpact();
                  Navigator.pop(context);
                },
                icon: Icon(
                  Icons.close_rounded,
                  color: Theme.of(context).colorScheme.onSurface.withAlpha(179),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildLeaderboard(BuildContext context) {
    final leaderboardData = _generateMockLeaderboard();

    return Container(
      constraints: BoxConstraints(
        maxHeight: MediaQuery.of(context).size.height * 0.6,
      ),
      child: ListView.builder(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        shrinkWrap: true,
        itemCount: leaderboardData.length,
        itemBuilder: (context, index) {
          final user = leaderboardData[index];
          final isCurrentUser = user['isCurrentUser'] ?? false;

          return Container(
            margin: const EdgeInsets.only(bottom: 12),
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: isCurrentUser
                  ? Theme.of(context).colorScheme.primary.withAlpha(26)
                  : Theme.of(context).colorScheme.surface,
              border: isCurrentUser
                  ? Border.all(
                      color:
                          Theme.of(context).colorScheme.primary.withAlpha(77),
                      width: 1.5,
                    )
                  : Border.all(
                      color:
                          Theme.of(context).colorScheme.outline.withAlpha(51),
                      width: 1,
                    ),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Row(
              children: [
                _buildRankBadge(context, user['rank']),
                const SizedBox(width: 16),
                _buildAvatar(user['avatar'], user['name']),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Expanded(
                            child: Text(
                              user['name'],
                              style: GoogleFonts.inter(
                                fontSize: 15,
                                fontWeight: FontWeight.w600,
                                color: Theme.of(context).colorScheme.onSurface,
                              ),
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                          if (isCurrentUser) ...[
                            const SizedBox(width: 8),
                            Container(
                              padding: const EdgeInsets.symmetric(
                                horizontal: 8,
                                vertical: 2,
                              ),
                              decoration: BoxDecoration(
                                color: Theme.of(context).colorScheme.primary,
                                borderRadius: BorderRadius.circular(8),
                              ),
                              child: Text(
                                'You',
                                style: GoogleFonts.inter(
                                  fontSize: 11,
                                  fontWeight: FontWeight.w600,
                                  color:
                                      Theme.of(context).colorScheme.onPrimary,
                                ),
                              ),
                            ),
                          ],
                        ],
                      ),
                      const SizedBox(height: 4),
                      Row(
                        children: [
                          Icon(
                            Icons.local_fire_department_rounded,
                            size: 14,
                            color: Theme.of(context).colorScheme.secondary,
                          ),
                          const SizedBox(width: 4),
                          Text(
                            '${user['streak']} day streak',
                            style: GoogleFonts.inter(
                              fontSize: 13,
                              color: Theme.of(context)
                                  .colorScheme
                                  .onSurface
                                  .withAlpha(179),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                const SizedBox(width: 16),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Text(
                      '${user['points']}',
                      style: GoogleFonts.inter(
                        fontSize: 16,
                        fontWeight: FontWeight.w700,
                        color: Theme.of(context).colorScheme.primary,
                      ),
                    ),
                    Text(
                      'points',
                      style: GoogleFonts.inter(
                        fontSize: 11,
                        color: Theme.of(context)
                            .colorScheme
                            .onSurface
                            .withAlpha(128),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildRankBadge(BuildContext context, int rank) {
    Color badgeColor;
    IconData? badgeIcon;

    switch (rank) {
      case 1:
        badgeColor = const Color(0xFFFFD700); // Gold
        badgeIcon = Icons.emoji_events_rounded;
        break;
      case 2:
        badgeColor = const Color(0xFFC0C0C0); // Silver
        badgeIcon = Icons.emoji_events_rounded;
        break;
      case 3:
        badgeColor = const Color(0xFFCD7F32); // Bronze
        badgeIcon = Icons.emoji_events_rounded;
        break;
      default:
        badgeColor = Theme.of(context).colorScheme.outline.withAlpha(77);
        badgeIcon = null;
    }

    return Container(
      width: 36,
      height: 36,
      decoration: BoxDecoration(
        color: badgeColor.withAlpha(26),
        borderRadius: BorderRadius.circular(18),
        border: Border.all(
          color: badgeColor,
          width: 2,
        ),
      ),
      child: Center(
        child: badgeIcon != null
            ? Icon(
                badgeIcon,
                size: 18,
                color: badgeColor,
              )
            : Text(
                '$rank',
                style: GoogleFonts.inter(
                  fontSize: 14,
                  fontWeight: FontWeight.w700,
                  color: Theme.of(context).colorScheme.onSurface,
                ),
              ),
      ),
    );
  }

  Widget _buildAvatar(String? avatar, String name) {
    if (avatar != null && avatar.isNotEmpty) {
      return CircleAvatar(
        radius: 20,
        backgroundImage: NetworkImage(avatar),
      );
    }

    return CircleAvatar(
      radius: 20,
      child: Text(
        name.isNotEmpty ? name[0].toUpperCase() : '?',
        style: GoogleFonts.inter(
          fontSize: 16,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }

  List<Map<String, dynamic>> _generateMockLeaderboard() {
    return [
      {
        'rank': 1,
        'name': 'Sarah Chen',
        'avatar':
            'https://images.unsplash.com/photo-1494790108755-2616b612b169',
        'streak': 21,
        'points': 2150,
        'isCurrentUser': false,
      },
      {
        'rank': 2,
        'name': 'Michael Torres',
        'avatar':
            'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
        'streak': 20,
        'points': 2050,
        'isCurrentUser': false,
      },
      {
        'rank': 3,
        'name': 'Emma Wilson',
        'avatar':
            'https://images.pixabay.com/photo/2017/11/02/14/27/model-2911363_960_720.jpg',
        'streak': 19,
        'points': 1975,
        'isCurrentUser': false,
      },
      {
        'rank': 23,
        'name': 'You',
        'avatar': null,
        'streak': 14,
        'points': 1425,
        'isCurrentUser': true,
      },
      {
        'rank': 24,
        'name': 'David Kim',
        'avatar': null,
        'streak': 13,
        'points': 1380,
        'isCurrentUser': false,
      },
    ];
  }
}