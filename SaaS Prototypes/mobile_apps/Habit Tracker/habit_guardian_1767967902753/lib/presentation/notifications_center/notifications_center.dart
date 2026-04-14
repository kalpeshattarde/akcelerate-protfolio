import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../core/app_export.dart';
import './widgets/empty_notifications_widget.dart';
import './widgets/notification_group_widget.dart';
import './widgets/notification_settings_widget.dart';

class NotificationsCenter extends StatefulWidget {
  const NotificationsCenter({super.key});

  @override
  State<NotificationsCenter> createState() => _NotificationsCenterState();
}

class _NotificationsCenterState extends State<NotificationsCenter>
    with TickerProviderStateMixin {
  late AnimationController _breathingController;
  late Animation<double> _breathingAnimation;

  final List<Map<String, dynamic>> _notifications = [];
  bool _showOnlyUnread = false;

  @override
  void initState() {
    super.initState();
    _setupBreathingAnimation();
    _loadNotifications();
  }

  void _setupBreathingAnimation() {
    _breathingController = AnimationController(
      duration: const Duration(milliseconds: 3000),
      vsync: this,
    );
    _breathingAnimation = Tween<double>(
      begin: 0.98,
      end: 1.02,
    ).animate(CurvedAnimation(
      parent: _breathingController,
      curve: Curves.easeInOut,
    ));
    _breathingController.repeat(reverse: true);
  }

  void _loadNotifications() {
    // Mock notifications data
    final mockNotifications = [
      {
        'id': '1',
        'type': 'habit_reminder',
        'title': 'Morning Meditation Time',
        'message': 'Take 10 minutes for your mindful morning practice',
        'timestamp': DateTime.now().subtract(const Duration(minutes: 30)),
        'isRead': false,
        'icon': Icons.spa_rounded,
        'color': Theme.of(context).colorScheme.primary,
        'habitId': 'meditation_001',
        'quickAction': 'complete',
      },
      {
        'id': '2',
        'type': 'achievement',
        'title': 'Streak Milestone! 🎉',
        'message':
            'Congratulations! You\'ve completed 7 days of morning meditation',
        'timestamp': DateTime.now().subtract(const Duration(hours: 2)),
        'isRead': false,
        'icon': Icons.emoji_events_rounded,
        'color': Theme.of(context).colorScheme.tertiary,
        'achievement': '7_day_streak',
      },
      {
        'id': '3',
        'type': 'community',
        'title': 'Challenge Update',
        'message': 'Sarah Chen completed the 21-Day Meditation Challenge!',
        'timestamp': DateTime.now().subtract(const Duration(hours: 4)),
        'isRead': true,
        'icon': Icons.people_rounded,
        'color': Theme.of(context).colorScheme.secondary,
        'challengeId': 'meditation_21',
      },
      {
        'id': '4',
        'type': 'habit_reminder',
        'title': 'Evening Reflection',
        'message': 'How was your day? Take a moment to reflect and journal',
        'timestamp': DateTime.now().subtract(const Duration(hours: 18)),
        'isRead': true,
        'icon': Icons.book_rounded,
        'color': Theme.of(context).colorScheme.primary,
        'habitId': 'journal_001',
        'quickAction': 'complete',
      },
      {
        'id': '5',
        'type': 'system',
        'title': 'Backup Complete',
        'message': 'Your habit data has been safely backed up to the cloud',
        'timestamp': DateTime.now().subtract(const Duration(days: 1)),
        'isRead': true,
        'icon': Icons.backup_rounded,
        'color': Theme.of(context).colorScheme.outline,
      },
    ];

    setState(() {
      _notifications.clear();
      _notifications.addAll(mockNotifications);
    });
  }

  @override
  void dispose() {
    _breathingController.dispose();
    super.dispose();
  }

  List<Map<String, dynamic>> get _filteredNotifications {
    if (_showOnlyUnread) {
      return _notifications.where((n) => !(n['isRead'] ?? false)).toList();
    }
    return _notifications;
  }

  Map<String, List<Map<String, dynamic>>> get _groupedNotifications {
    final filtered = _filteredNotifications;
    final groups = <String, List<Map<String, dynamic>>>{};

    for (final notification in filtered) {
      final type = notification['type'] as String;
      String groupKey;

      switch (type) {
        case 'habit_reminder':
          groupKey = 'Habit Reminders';
          break;
        case 'achievement':
          groupKey = 'Achievements';
          break;
        case 'community':
          groupKey = 'Community';
          break;
        case 'system':
          groupKey = 'System';
          break;
        default:
          groupKey = 'Other';
      }

      groups[groupKey] ??= [];
      groups[groupKey]!.add(notification);
    }

    return groups;
  }

  int get _unreadCount {
    return _notifications.where((n) => !(n['isRead'] ?? false)).length;
  }

  void _markAllAsRead() {
    HapticFeedback.lightImpact();
    setState(() {
      for (final notification in _notifications) {
        notification['isRead'] = true;
      }
    });
  }

  void _markAsRead(String notificationId) {
    setState(() {
      final notification =
          _notifications.firstWhere((n) => n['id'] == notificationId);
      notification['isRead'] = true;
    });
  }

  void _deleteNotification(String notificationId) {
    HapticFeedback.lightImpact();
    setState(() {
      _notifications.removeWhere((n) => n['id'] == notificationId);
    });
  }

  void _snoozeNotification(String notificationId) {
    HapticFeedback.lightImpact();
    // TODO: Implement snooze functionality
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          'Notification snoozed for 1 hour',
          style: GoogleFonts.inter(),
        ),
        backgroundColor: Theme.of(context).colorScheme.primary,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
      ),
    );
  }

  void _completeHabit(String habitId) {
    HapticFeedback.selectionClick();
    // TODO: Implement habit completion
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          'Habit completed! Great job! 🎉',
          style: GoogleFonts.inter(),
        ),
        backgroundColor: Theme.of(context).colorScheme.primary,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
      ),
    );
  }

  void _showNotificationSettings() {
    HapticFeedback.lightImpact();
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => const NotificationSettingsWidget(),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      appBar: _buildAppBar(),
      body: _buildBody(),
    );
  }

  PreferredSizeWidget _buildAppBar() {
    return AppBar(
      title: Row(
        children: [
          Text(
            'Notifications',
            style: GoogleFonts.inter(
              fontSize: 20,
              fontWeight: FontWeight.w600,
              color: Theme.of(context).colorScheme.onSurface,
              letterSpacing: 0.15,
            ),
          ),
          if (_unreadCount > 0) ...[
            const SizedBox(width: 8),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
              decoration: BoxDecoration(
                color: Theme.of(context).colorScheme.secondary,
                borderRadius: BorderRadius.circular(10),
              ),
              child: Text(
                '$_unreadCount',
                style: GoogleFonts.inter(
                  fontSize: 12,
                  fontWeight: FontWeight.w600,
                  color: Theme.of(context).colorScheme.onSecondary,
                ),
              ),
            ),
          ],
        ],
      ),
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      elevation: 0,
      centerTitle: false,
      leading: IconButton(
        icon: Icon(
          Icons.arrow_back_ios_rounded,
          color: Theme.of(context).colorScheme.onSurface,
          size: 20,
        ),
        onPressed: () {
          HapticFeedback.lightImpact();
          Navigator.pop(context);
        },
      ),
      actions: [
        if (_unreadCount > 0)
          TextButton(
            onPressed: _markAllAsRead,
            child: Text(
              'Mark all read',
              style: GoogleFonts.inter(
                fontSize: 14,
                fontWeight: FontWeight.w500,
                color: Theme.of(context).colorScheme.primary,
              ),
            ),
          ),
        IconButton(
          icon: Icon(
            Icons.settings_rounded,
            color: Theme.of(context).colorScheme.primary,
            size: 24,
          ),
          onPressed: _showNotificationSettings,
        ),
        const SizedBox(width: 8),
      ],
    );
  }

  Widget _buildBody() {
    if (_notifications.isEmpty) {
      return const EmptyNotificationsWidget();
    }

    final filteredNotifications = _filteredNotifications;

    if (filteredNotifications.isEmpty && _showOnlyUnread) {
      return _buildNoUnreadNotifications();
    }

    return Column(
      children: [
        _buildFilterChips(),
        Expanded(
          child: RefreshIndicator(
            onRefresh: () async {
              HapticFeedback.lightImpact();
              await Future.delayed(const Duration(milliseconds: 800));
              _loadNotifications();
            },
            color: Theme.of(context).colorScheme.primary,
            child: _buildNotificationsList(),
          ),
        ),
      ],
    );
  }

  Widget _buildFilterChips() {
    return Container(
      height: 60,
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Row(
        children: [
          FilterChip(
            selected: !_showOnlyUnread,
            label: Text(
              'All',
              style: GoogleFonts.inter(
                fontSize: 13,
                fontWeight: FontWeight.w500,
                color: !_showOnlyUnread
                    ? Theme.of(context).colorScheme.onPrimary
                    : Theme.of(context).colorScheme.onSurface.withAlpha(179),
              ),
            ),
            onSelected: (_) {
              HapticFeedback.selectionClick();
              setState(() {
                _showOnlyUnread = false;
              });
            },
            backgroundColor: Theme.of(context).colorScheme.surface,
            selectedColor: Theme.of(context).colorScheme.primary,
            side: BorderSide(
              color: !_showOnlyUnread
                  ? Theme.of(context).colorScheme.primary
                  : Theme.of(context).colorScheme.outline.withAlpha(77),
              width: !_showOnlyUnread ? 2 : 1,
            ),
            showCheckmark: false,
            materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
          ),
          const SizedBox(width: 12),
          FilterChip(
            selected: _showOnlyUnread,
            label: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  'Unread',
                  style: GoogleFonts.inter(
                    fontSize: 13,
                    fontWeight: FontWeight.w500,
                    color: _showOnlyUnread
                        ? Theme.of(context).colorScheme.onPrimary
                        : Theme.of(context)
                            .colorScheme
                            .onSurface
                            .withAlpha(179),
                  ),
                ),
                if (_unreadCount > 0) ...[
                  const SizedBox(width: 6),
                  Container(
                    width: 18,
                    height: 18,
                    decoration: BoxDecoration(
                      color: _showOnlyUnread
                          ? Theme.of(context)
                              .colorScheme
                              .onPrimary
                              .withAlpha(51)
                          : Theme.of(context).colorScheme.secondary,
                      borderRadius: BorderRadius.circular(9),
                    ),
                    child: Center(
                      child: Text(
                        '$_unreadCount',
                        style: GoogleFonts.inter(
                          fontSize: 11,
                          fontWeight: FontWeight.w600,
                          color: _showOnlyUnread
                              ? Theme.of(context).colorScheme.primary
                              : Theme.of(context).colorScheme.onSecondary,
                        ),
                      ),
                    ),
                  ),
                ],
              ],
            ),
            onSelected: (_) {
              HapticFeedback.selectionClick();
              setState(() {
                _showOnlyUnread = true;
              });
            },
            backgroundColor: Theme.of(context).colorScheme.surface,
            selectedColor: Theme.of(context).colorScheme.primary,
            side: BorderSide(
              color: _showOnlyUnread
                  ? Theme.of(context).colorScheme.primary
                  : Theme.of(context).colorScheme.outline.withAlpha(77),
              width: _showOnlyUnread ? 2 : 1,
            ),
            showCheckmark: false,
            materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
          ),
        ],
      ),
    );
  }

  Widget _buildNotificationsList() {
    final groupedNotifications = _groupedNotifications;

    return ListView.builder(
      padding: const EdgeInsets.only(bottom: 16),
      itemCount: groupedNotifications.length,
      itemBuilder: (context, index) {
        final groupName = groupedNotifications.keys.elementAt(index);
        final notifications = groupedNotifications[groupName]!;

        return NotificationGroupWidget(
          groupName: groupName,
          notifications: notifications,
          breathingAnimation: _breathingAnimation,
          onMarkAsRead: _markAsRead,
          onDelete: _deleteNotification,
          onSnooze: _snoozeNotification,
          onCompleteHabit: _completeHabit,
        );
      },
    );
  }

  Widget _buildNoUnreadNotifications() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            width: 120,
            height: 120,
            decoration: BoxDecoration(
              color: Theme.of(context).colorScheme.primary.withAlpha(26),
              borderRadius: BorderRadius.circular(60),
            ),
            child: Icon(
              Icons.mark_email_read_rounded,
              size: 64,
              color: Theme.of(context).colorScheme.primary.withAlpha(128),
            ),
          ),
          const SizedBox(height: 24),
          Text(
            'All caught up!',
            style: GoogleFonts.inter(
              fontSize: 18,
              fontWeight: FontWeight.w500,
              color: Theme.of(context).colorScheme.onSurface,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'No unread notifications at the moment.\nKeep up the great work!',
            textAlign: TextAlign.center,
            style: GoogleFonts.inter(
              fontSize: 14,
              color: Theme.of(context).colorScheme.onSurface.withAlpha(179),
              height: 1.4,
            ),
          ),
        ],
      ),
    );
  }
}
