import 'package:flutter/material.dart';

import '../../../core/app_export.dart';
import './notification_card_widget.dart';

class NotificationGroupWidget extends StatelessWidget {
  final String groupName;
  final List<Map<String, dynamic>> notifications;
  final Animation<double> breathingAnimation;
  final Function(String) onMarkAsRead;
  final Function(String) onDelete;
  final Function(String) onSnooze;
  final Function(String) onCompleteHabit;

  const NotificationGroupWidget({
    super.key,
    required this.groupName,
    required this.notifications,
    required this.breathingAnimation,
    required this.onMarkAsRead,
    required this.onDelete,
    required this.onSnooze,
    required this.onCompleteHabit,
  });

  IconData get _groupIcon {
    switch (groupName) {
      case 'Habit Reminders':
        return Icons.notifications_active_rounded;
      case 'Achievements':
        return Icons.emoji_events_rounded;
      case 'Community':
        return Icons.people_rounded;
      case 'System':
        return Icons.settings_rounded;
      default:
        return Icons.circle_notifications_rounded;
    }
  }

  int get _unreadCount {
    return notifications.where((n) => !(n['isRead'] ?? false)).length;
  }

  @override
  Widget build(BuildContext context) {
    if (notifications.isEmpty) return const SizedBox.shrink();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildGroupHeader(context),
        ...notifications.map((notification) => NotificationCardWidget(
              notification: notification,
              breathingAnimation: breathingAnimation,
              onMarkAsRead: onMarkAsRead,
              onDelete: onDelete,
              onSnooze: onSnooze,
              onCompleteHabit: onCompleteHabit,
            )),
        const SizedBox(height: 16),
      ],
    );
  }

  Widget _buildGroupHeader(BuildContext context) {
    return Container(
      margin: const EdgeInsets.fromLTRB(16, 16, 16, 8),
      child: Row(
        children: [
          Icon(
            _groupIcon,
            size: 20,
            color: Theme.of(context).colorScheme.primary,
          ),
          const SizedBox(width: 8),
          Text(
            groupName,
            style: GoogleFonts.inter(
              fontSize: 16,
              fontWeight: FontWeight.w600,
              color: Theme.of(context).colorScheme.onSurface,
            ),
          ),
          if (_unreadCount > 0) ...[
            const SizedBox(width: 8),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
              decoration: BoxDecoration(
                color: Theme.of(context).colorScheme.secondary.withAlpha(26),
                borderRadius: BorderRadius.circular(10),
                border: Border.all(
                  color: Theme.of(context).colorScheme.secondary.withAlpha(77),
                  width: 1,
                ),
              ),
              child: Text(
                '$_unreadCount new',
                style: GoogleFonts.inter(
                  fontSize: 11,
                  fontWeight: FontWeight.w600,
                  color: Theme.of(context).colorScheme.secondary,
                ),
              ),
            ),
          ],
          const Spacer(),
          Text(
            '${notifications.length} total',
            style: GoogleFonts.inter(
              fontSize: 12,
              color: Theme.of(context).colorScheme.onSurface.withAlpha(128),
            ),
          ),
        ],
      ),
    );
  }
}
