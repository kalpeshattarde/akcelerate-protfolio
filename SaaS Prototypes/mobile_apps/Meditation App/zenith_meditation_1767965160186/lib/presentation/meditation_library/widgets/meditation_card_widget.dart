import 'package:flutter/material.dart';
import 'package:flutter_slidable/flutter_slidable.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class MeditationCardWidget extends StatelessWidget {
  final Map<String, dynamic> meditation;
  final VoidCallback onTap;
  final VoidCallback onBookmark;
  final VoidCallback onPlay;
  final VoidCallback onDownload;
  final VoidCallback onAddToPlaylist;
  final VoidCallback onRemoveFromFavorites;
  final VoidCallback onShare;
  final VoidCallback onRate;
  final VoidCallback onViewInstructor;

  const MeditationCardWidget({
    Key? key,
    required this.meditation,
    required this.onTap,
    required this.onBookmark,
    required this.onPlay,
    required this.onDownload,
    required this.onAddToPlaylist,
    required this.onRemoveFromFavorites,
    required this.onShare,
    required this.onRate,
    required this.onViewInstructor,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Slidable(
      key: ValueKey(meditation['id']),
      startActionPane: ActionPane(
        motion: const ScrollMotion(),
        children: [
          SlidableAction(
            onPressed: (_) => onPlay(),
            backgroundColor: AppTheme.lightTheme.colorScheme.secondary,
            foregroundColor: AppTheme.lightTheme.colorScheme.onSecondary,
            icon: Icons.play_arrow,
            label: 'Play',
          ),
          SlidableAction(
            onPressed: (_) => onDownload(),
            backgroundColor: AppTheme.lightTheme.colorScheme.tertiary,
            foregroundColor: Colors.white,
            icon: Icons.download,
            label: 'Download',
          ),
          SlidableAction(
            onPressed: (_) => onAddToPlaylist(),
            backgroundColor: AppTheme.lightTheme.colorScheme.primary,
            foregroundColor: AppTheme.lightTheme.colorScheme.onPrimary,
            icon: Icons.playlist_add,
            label: 'Playlist',
          ),
        ],
      ),
      endActionPane: ActionPane(
        motion: const ScrollMotion(),
        children: [
          SlidableAction(
            onPressed: (_) => onRemoveFromFavorites(),
            backgroundColor: AppTheme.lightTheme.colorScheme.error,
            foregroundColor: Colors.white,
            icon: Icons.favorite_border,
            label: 'Remove',
          ),
        ],
      ),
      child: GestureDetector(
        onTap: onTap,
        onLongPress: () => _showContextMenu(context),
        child: Container(
          margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
          decoration: BoxDecoration(
            color: AppTheme.lightTheme.cardColor,
            borderRadius: BorderRadius.circular(16.0),
            boxShadow: [
              BoxShadow(
                color: AppTheme.lightTheme.colorScheme.shadow,
                blurRadius: 8.0,
                offset: const Offset(0, 2),
              ),
            ],
          ),
          child: Padding(
            padding: EdgeInsets.all(4.w),
            child: Row(
              children: [
                // Instructor Photo
                ClipRRect(
                  borderRadius: BorderRadius.circular(12.0),
                  child: CustomImageWidget(
                    imageUrl: meditation['instructorPhoto'] ?? '',
                    width: 15.w,
                    height: 15.w,
                    fit: BoxFit.cover,
                    semanticLabel: meditation['instructorPhotoSemanticLabel'] ??
                        'Instructor photo',
                  ),
                ),
                SizedBox(width: 4.w),
                // Content
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Title and Bookmark
                      Row(
                        children: [
                          Expanded(
                            child: Text(
                              meditation['title'] ?? '',
                              style: AppTheme.lightTheme.textTheme.titleMedium,
                              maxLines: 2,
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                          GestureDetector(
                            onTap: onBookmark,
                            child: CustomIconWidget(
                              iconName:
                                  (meditation['isBookmarked'] as bool? ?? false)
                                      ? 'bookmark'
                                      : 'bookmark_border',
                              color: AppTheme.lightTheme.colorScheme.secondary,
                              size: 5.w,
                            ),
                          ),
                        ],
                      ),
                      SizedBox(height: 1.h),
                      // Instructor Name
                      Text(
                        meditation['instructor'] ?? '',
                        style:
                            AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                          color:
                              AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                        ),
                      ),
                      SizedBox(height: 1.h),
                      // Duration, Difficulty, Download Status
                      Row(
                        children: [
                          _buildBadge(
                            '${meditation['duration']} min',
                            AppTheme.lightTheme.colorScheme.secondary,
                          ),
                          SizedBox(width: 2.w),
                          _buildBadge(
                            meditation['difficulty'] ?? '',
                            AppTheme.lightTheme.colorScheme.tertiary,
                          ),
                          SizedBox(width: 2.w),
                          if (meditation['isDownloaded'] as bool? ?? false)
                            CustomIconWidget(
                              iconName: 'download_done',
                              color: AppTheme.lightTheme.colorScheme.tertiary,
                              size: 4.w,
                            ),
                        ],
                      ),
                      SizedBox(height: 1.h),
                      // Rating and Play Count
                      Row(
                        children: [
                          // Rating Stars
                          Row(
                            children: List.generate(5, (index) {
                              return CustomIconWidget(
                                iconName: index <
                                        (meditation['rating'] as double? ?? 0)
                                            .floor()
                                    ? 'star'
                                    : 'star_border',
                                color:
                                    AppTheme.lightTheme.colorScheme.secondary,
                                size: 3.w,
                              );
                            }),
                          ),
                          SizedBox(width: 2.w),
                          Text(
                            '${meditation['rating']?.toStringAsFixed(1) ?? '0.0'}',
                            style: AppTheme.lightTheme.textTheme.bodySmall,
                          ),
                          SizedBox(width: 4.w),
                          CustomIconWidget(
                            iconName: 'play_circle_outline',
                            color: AppTheme
                                .lightTheme.colorScheme.onSurfaceVariant,
                            size: 3.w,
                          ),
                          SizedBox(width: 1.w),
                          Text(
                            '${meditation['playCount'] ?? 0}',
                            style: AppTheme.lightTheme.textTheme.bodySmall,
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildBadge(String text, Color color) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 2.w, vertical: 0.5.h),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.2),
        borderRadius: BorderRadius.circular(8.0),
      ),
      child: Text(
        text,
        style: AppTheme.lightTheme.textTheme.labelSmall?.copyWith(
          color: color,
          fontWeight: FontWeight.w500,
        ),
      ),
    );
  }

  void _showContextMenu(BuildContext context) {
    showModalBottomSheet(
      context: context,
      backgroundColor: AppTheme.lightTheme.colorScheme.surface,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20.0)),
      ),
      builder: (context) => Container(
        padding: EdgeInsets.all(4.w),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 10.w,
              height: 0.5.h,
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.colorScheme.outline,
                borderRadius: BorderRadius.circular(2.0),
              ),
            ),
            SizedBox(height: 3.h),
            _buildContextMenuItem(
              icon: 'share',
              title: 'Share',
              onTap: () {
                Navigator.pop(context);
                onShare();
              },
            ),
            _buildContextMenuItem(
              icon: 'star_rate',
              title: 'Rate',
              onTap: () {
                Navigator.pop(context);
                onRate();
              },
            ),
            _buildContextMenuItem(
              icon: 'person',
              title: 'View Instructor Profile',
              onTap: () {
                Navigator.pop(context);
                onViewInstructor();
              },
            ),
            SizedBox(height: 2.h),
          ],
        ),
      ),
    );
  }

  Widget _buildContextMenuItem({
    required String icon,
    required String title,
    required VoidCallback onTap,
  }) {
    return ListTile(
      leading: CustomIconWidget(
        iconName: icon,
        color: AppTheme.lightTheme.colorScheme.onSurface,
        size: 6.w,
      ),
      title: Text(
        title,
        style: AppTheme.lightTheme.textTheme.bodyLarge,
      ),
      onTap: onTap,
    );
  }
}
