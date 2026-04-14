import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../../core/app_export.dart';

class NotificationCardWidget extends StatelessWidget {
  final Map<String, dynamic> notification;
  final Animation<double> breathingAnimation;
  final Function(String) onMarkAsRead;
  final Function(String) onDelete;
  final Function(String) onSnooze;
  final Function(String)? onCompleteHabit;

  const NotificationCardWidget({
    super.key,
    required this.notification,
    required this.breathingAnimation,
    required this.onMarkAsRead,
    required this.onDelete,
    required this.onSnooze,
    this.onCompleteHabit,
  });

  String _formatTimestamp(DateTime timestamp) {
    final now = DateTime.now();
    final difference = now.difference(timestamp);

    if (difference.inMinutes < 60) {
      return '${difference.inMinutes}m ago';
    } else if (difference.inHours < 24) {
      return '${difference.inHours}h ago';
    } else if (difference.inDays < 7) {
      return '${difference.inDays}d ago';
    } else {
      return '${timestamp.day}/${timestamp.month}';
    }
  }

  @override
  Widget build(BuildContext context) {
    final isRead = notification['isRead'] ?? false;
    final hasQuickAction = notification['quickAction'] != null;

    return AnimatedBuilder(
      animation: breathingAnimation,
      builder: (context, child) {
        final scale = !isRead ? breathingAnimation.value : 1.0;

        return Transform.scale(
          scale: scale,
          child: Dismissible(
            key: Key(notification['id']),
            direction: DismissDirection.horizontal,
            background: _buildSwipeBackground(context, isLeading: true),
            secondaryBackground:
                _buildSwipeBackground(context, isLeading: false),
            onDismissed: (direction) {
              if (direction == DismissDirection.endToStart) {
                onDelete(notification['id']);
              } else {
                if (!isRead) {
                  onMarkAsRead(notification['id']);
                } else {
                  onSnooze(notification['id']);
                }
              }
            },
            child: Container(
              margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
              decoration: BoxDecoration(
                color: isRead
                    ? Theme.of(context).colorScheme.surface
                    : Theme.of(context).colorScheme.primary.withAlpha(13),
                borderRadius: BorderRadius.circular(12),
                border: isRead
                    ? Border.all(
                        color:
                            Theme.of(context).colorScheme.outline.withAlpha(51),
                        width: 1,
                      )
                    : Border.all(
                        color:
                            Theme.of(context).colorScheme.primary.withAlpha(77),
                        width: 1.5,
                      ),
              ),
              child: InkWell(
                onTap: () {
                  HapticFeedback.lightImpact();
                  if (!isRead) {
                    onMarkAsRead(notification['id']);
                  }
                  _handleNotificationTap(context);
                },
                borderRadius: BorderRadius.circular(12),
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    children: [
                      _buildHeader(context, isRead),
                      if (hasQuickAction) ...[
                        const SizedBox(height: 12),
                        _buildQuickAction(context),
                      ],
                    ],
                  ),
                ),
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildSwipeBackground(BuildContext context,
      {required bool isLeading}) {
    final backgroundColor = isLeading
        ? Theme.of(context).colorScheme.primary
        : Theme.of(context).colorScheme.secondary;

    final icon = isLeading
        ? (notification['isRead'] ?? false)
            ? Icons.snooze_rounded
            : Icons.mark_email_read_rounded
        : Icons.delete_rounded;

    final label = isLeading
        ? (notification['isRead'] ?? false)
            ? 'Snooze'
            : 'Mark Read'
        : 'Delete';

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
      decoration: BoxDecoration(
        color: backgroundColor,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Align(
        alignment: isLeading ? Alignment.centerLeft : Alignment.centerRight,
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: isLeading ? 20 : 20),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                icon,
                color: Colors.white,
                size: 24,
              ),
              const SizedBox(height: 4),
              Text(
                label,
                style: GoogleFonts.inter(
                  fontSize: 12,
                  fontWeight: FontWeight.w500,
                  color: Colors.white,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildHeader(BuildContext context, bool isRead) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          width: 40,
          height: 40,
          decoration: BoxDecoration(
            color: (notification['color'] as Color).withAlpha(26),
            borderRadius: BorderRadius.circular(20),
          ),
          child: Icon(
            notification['icon'] as IconData,
            color: notification['color'] as Color,
            size: 20,
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Expanded(
                    child: Text(
                      notification['title'],
                      style: GoogleFonts.inter(
                        fontSize: 15,
                        fontWeight: FontWeight.w600,
                        color: Theme.of(context).colorScheme.onSurface,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  if (!isRead) ...[
                    const SizedBox(width: 8),
                    Container(
                      width: 8,
                      height: 8,
                      decoration: BoxDecoration(
                        color: Theme.of(context).colorScheme.secondary,
                        borderRadius: BorderRadius.circular(4),
                      ),
                    ),
                  ],
                ],
              ),
              const SizedBox(height: 4),
              Text(
                notification['message'],
                style: GoogleFonts.inter(
                  fontSize: 14,
                  color: Theme.of(context).colorScheme.onSurface.withAlpha(179),
                  height: 1.4,
                ),
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
              const SizedBox(height: 8),
              Text(
                _formatTimestamp(notification['timestamp']),
                style: GoogleFonts.inter(
                  fontSize: 12,
                  color: Theme.of(context).colorScheme.onSurface.withAlpha(128),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildQuickAction(BuildContext context) {
    final quickAction = notification['quickAction'];

    if (quickAction == 'complete' && onCompleteHabit != null) {
      return SizedBox(
        width: double.infinity,
        child: ElevatedButton(
          onPressed: () {
            HapticFeedback.selectionClick();
            onCompleteHabit!(notification['habitId']);
            onMarkAsRead(notification['id']);
          },
          style: ElevatedButton.styleFrom(
            backgroundColor: Theme.of(context).colorScheme.primary,
            foregroundColor: Theme.of(context).colorScheme.onPrimary,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(8),
            ),
            padding: const EdgeInsets.symmetric(vertical: 10),
            elevation: 0,
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                Icons.check_circle_rounded,
                size: 18,
                color: Theme.of(context).colorScheme.onPrimary,
              ),
              const SizedBox(width: 8),
              Text(
                'Mark Complete',
                style: GoogleFonts.inter(
                  fontSize: 14,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
        ),
      );
    }

    return const SizedBox.shrink();
  }

  void _handleNotificationTap(BuildContext context) {
    final type = notification['type'];

    switch (type) {
      case 'achievement':
        // Navigate to achievement detail or show celebration
        break;
      case 'community':
        // Navigate to challenge or community feed
        break;
      case 'habit_reminder':
        // Navigate to habit detail
        break;
      case 'system':
        // Handle system notification action
        break;
    }
  }
}
