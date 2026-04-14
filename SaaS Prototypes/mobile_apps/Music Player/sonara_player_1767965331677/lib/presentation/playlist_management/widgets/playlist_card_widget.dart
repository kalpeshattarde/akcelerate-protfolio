import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

import '../../../core/app_export.dart';

class PlaylistCardWidget extends StatelessWidget {
  final Map<String, dynamic> playlist;
  final bool isMultiSelectMode;
  final bool isSelected;
  final VoidCallback onTap;
  final VoidCallback onLongPress;
  final VoidCallback onToggleSelect;

  const PlaylistCardWidget({
    Key? key,
    required this.playlist,
    required this.isMultiSelectMode,
    required this.isSelected,
    required this.onTap,
    required this.onLongPress,
    required this.onToggleSelect,
  }) : super(key: key);

  String _formatDate(DateTime date) {
    final now = DateTime.now();
    final difference = now.difference(date);

    if (difference.inDays == 0) {
      if (difference.inHours == 0) {
        return '${difference.inMinutes}m ago';
      }
      return '${difference.inHours}h ago';
    } else if (difference.inDays == 1) {
      return 'Yesterday';
    } else if (difference.inDays < 7) {
      return '${difference.inDays}d ago';
    } else {
      return DateFormat('MMM d, yyyy').format(date);
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isSystemPlaylist = playlist["isSystemPlaylist"] as bool;
    final isCollaborative = playlist["isCollaborative"] as bool? ?? false;
    final privacy = playlist["privacy"] as String? ?? "private";

    return GestureDetector(
      onTap: onTap,
      onLongPress: isSystemPlaylist ? null : onLongPress,
      child: Container(
        margin: EdgeInsets.symmetric(horizontal: 16),
        padding: EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: isSelected
              ? const Color(0xFFB8D456).withValues(alpha: 0.1)
              : const Color(0xFF1E1E1E),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isSelected
                ? const Color(0xFFB8D456)
                : const Color(0xFF333333),
            width: isSelected ? 2 : 1,
          ),
        ),
        child: Row(
          children: [
            if (isMultiSelectMode && !isSystemPlaylist)
              Padding(
                padding: EdgeInsets.only(right: 12),
                child: GestureDetector(
                  onTap: onToggleSelect,
                  child: Container(
                    width: 24,
                    height: 24,
                    decoration: BoxDecoration(
                      color: isSelected
                          ? const Color(0xFFB8D456)
                          : Colors.transparent,
                      border: Border.all(
                        color: isSelected
                            ? const Color(0xFFB8D456)
                            : const Color(0xFF666666),
                        width: 2,
                      ),
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: isSelected
                        ? CustomIconWidget(
                            iconName: 'check',
                            color: const Color(0xFF121212),
                            size: 16,
                          )
                        : null,
                  ),
                ),
              ),
            ClipRRect(
              borderRadius: BorderRadius.circular(8),
              child: CustomImageWidget(
                imageUrl: playlist["artwork"] as String,
                width: 64,
                height: 64,
                fit: BoxFit.cover,
                semanticLabel: playlist["semanticLabel"] as String,
              ),
            ),
            SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: Text(
                          playlist["title"] as String,
                          style: theme.textTheme.titleMedium?.copyWith(
                            color: theme.colorScheme.onSurface,
                            fontWeight: FontWeight.w600,
                          ),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                      if (isCollaborative)
                        Padding(
                          padding: EdgeInsets.only(left: 4),
                          child: CustomIconWidget(
                            iconName: 'group',
                            color: const Color(0xFFB8D456),
                            size: 16,
                          ),
                        ),
                    ],
                  ),
                  SizedBox(height: 4),
                  Row(
                    children: [
                      CustomIconWidget(
                        iconName: 'music_note',
                        color: theme.colorScheme.onSurfaceVariant,
                        size: 14,
                      ),
                      SizedBox(width: 4),
                      Text(
                        '${playlist["songCount"]} songs',
                        style: theme.textTheme.bodySmall?.copyWith(
                          color: theme.colorScheme.onSurfaceVariant,
                        ),
                      ),
                      if (!isSystemPlaylist) ...[
                        SizedBox(width: 8),
                        CustomIconWidget(
                          iconName: privacy == "public"
                              ? 'public'
                              : privacy == "friends"
                              ? 'group'
                              : 'lock',
                          color: theme.colorScheme.onSurfaceVariant,
                          size: 14,
                        ),
                        SizedBox(width: 4),
                        Text(
                          privacy == "public"
                              ? 'Public'
                              : privacy == "friends"
                              ? 'Friends'
                              : 'Private',
                          style: theme.textTheme.bodySmall?.copyWith(
                            color: theme.colorScheme.onSurfaceVariant,
                          ),
                        ),
                      ],
                    ],
                  ),
                  SizedBox(height: 4),
                  Text(
                    _formatDate(playlist["lastModified"] as DateTime),
                    style: theme.textTheme.bodySmall?.copyWith(
                      color: const Color(0xFF666666),
                    ),
                  ),
                ],
              ),
            ),
            if (!isMultiSelectMode)
              CustomIconWidget(
                iconName: 'chevron_right',
                color: theme.colorScheme.onSurfaceVariant,
                size: 24,
              ),
          ],
        ),
      ),
    );
  }
}
