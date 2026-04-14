import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class NotesTimelineWidget extends StatefulWidget {
  final List<Map<String, dynamic>> notes;
  final VoidCallback onAddNote;

  const NotesTimelineWidget({
    super.key,
    required this.notes,
    required this.onAddNote,
  });

  @override
  State<NotesTimelineWidget> createState() => _NotesTimelineWidgetState();
}

class _NotesTimelineWidgetState extends State<NotesTimelineWidget> {
  final Set<int> _expandedNotes = {};

  void _toggleNoteExpansion(int index) {
    setState(() {
      if (_expandedNotes.contains(index)) {
        _expandedNotes.remove(index);
      } else {
        _expandedNotes.add(index);
      }
    });
    HapticFeedback.lightImpact();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
      decoration: BoxDecoration(
        color: isDark ? AppTheme.surfaceDark : AppTheme.surfaceLight,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: isDark
                ? Colors.white.withValues(alpha: 0.05)
                : Colors.black.withValues(alpha: 0.08),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header with add button
          Padding(
            padding: EdgeInsets.all(4.w),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Reflections & Notes',
                  style: theme.textTheme.titleLarge?.copyWith(
                    color: isDark
                        ? AppTheme.textPrimaryDark
                        : AppTheme.textPrimaryLight,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                Material(
                  color: Colors.transparent,
                  child: InkWell(
                    onTap: () {
                      HapticFeedback.lightImpact();
                      widget.onAddNote();
                    },
                    borderRadius: BorderRadius.circular(12),
                    child: Container(
                      padding: EdgeInsets.all(2.w),
                      decoration: BoxDecoration(
                        color: (isDark
                                ? AppTheme.secondaryDark
                                : AppTheme.secondaryLight)
                            .withValues(alpha: 0.1),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: CustomIconWidget(
                        iconName: 'add',
                        color: isDark
                            ? AppTheme.secondaryDark
                            : AppTheme.secondaryLight,
                        size: 20,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),

          // Notes timeline
          widget.notes.isEmpty
              ? _buildEmptyState(theme, isDark)
              : ListView.separated(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  padding: EdgeInsets.symmetric(horizontal: 4.w),
                  itemCount: widget.notes.length,
                  separatorBuilder: (context, index) => SizedBox(height: 3.h),
                  itemBuilder: (context, index) {
                    final note = widget.notes[index];
                    final isExpanded = _expandedNotes.contains(index);

                    return _buildNoteItem(
                      note,
                      index,
                      isExpanded,
                      theme,
                      isDark,
                    );
                  },
                ),

          SizedBox(height: 2.h),
        ],
      ),
    );
  }

  Widget _buildEmptyState(ThemeData theme, bool isDark) {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.all(6.w),
      child: Column(
        children: [
          Container(
            padding: EdgeInsets.all(4.w),
            decoration: BoxDecoration(
              color: (isDark
                      ? AppTheme.textSecondaryDark
                      : AppTheme.textSecondaryLight)
                  .withValues(alpha: 0.1),
              shape: BoxShape.circle,
            ),
            child: CustomIconWidget(
              iconName: 'note_add',
              color: isDark
                  ? AppTheme.textSecondaryDark
                  : AppTheme.textSecondaryLight,
              size: 32,
            ),
          ),
          SizedBox(height: 3.h),
          Text(
            'No reflections yet',
            style: theme.textTheme.titleMedium?.copyWith(
              color:
                  isDark ? AppTheme.textPrimaryDark : AppTheme.textPrimaryLight,
              fontWeight: FontWeight.w600,
            ),
          ),
          SizedBox(height: 1.h),
          Text(
            'Add your first reflection to track your journey and insights.',
            style: theme.textTheme.bodyMedium?.copyWith(
              color: isDark
                  ? AppTheme.textSecondaryDark
                  : AppTheme.textSecondaryLight,
              height: 1.5,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  Widget _buildNoteItem(
    Map<String, dynamic> note,
    int index,
    bool isExpanded,
    ThemeData theme,
    bool isDark,
  ) {
    final date = note['date'] as DateTime;
    final content = note['content'] as String;
    final mood = note['mood'] as String?;

    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: () => _toggleNoteExpansion(index),
        borderRadius: BorderRadius.circular(12),
        child: Container(
          padding: EdgeInsets.all(4.w),
          decoration: BoxDecoration(
            color: (isDark ? AppTheme.borderDark : AppTheme.borderLight)
                .withValues(alpha: 0.3),
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: (isDark ? AppTheme.borderDark : AppTheme.borderLight)
                  .withValues(alpha: 0.5),
              width: 1,
            ),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Note header
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  // Date and mood
                  Expanded(
                    child: Row(
                      children: [
                        Container(
                          padding: EdgeInsets.all(1.5.w),
                          decoration: BoxDecoration(
                            color: (isDark
                                    ? AppTheme.accentDark
                                    : AppTheme.accentLight)
                                .withValues(alpha: 0.15),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: CustomIconWidget(
                            iconName: 'calendar_today',
                            color: isDark
                                ? AppTheme.accentDark
                                : AppTheme.accentLight,
                            size: 16,
                          ),
                        ),
                        SizedBox(width: 3.w),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                '${date.day}/${date.month}/${date.year}',
                                style: theme.textTheme.bodyMedium?.copyWith(
                                  color: isDark
                                      ? AppTheme.textPrimaryDark
                                      : AppTheme.textPrimaryLight,
                                  fontWeight: FontWeight.w600,
                                ),
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                              ),
                              if (mood != null) ...[
                                SizedBox(height: 0.5.h),
                                Text(
                                  'Mood: $mood',
                                  style: theme.textTheme.bodySmall?.copyWith(
                                    color: isDark
                                        ? AppTheme.textSecondaryDark
                                        : AppTheme.textSecondaryLight,
                                    fontWeight: FontWeight.w500,
                                  ),
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                ),
                              ],
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),

                  // Expand/collapse icon
                  CustomIconWidget(
                    iconName: isExpanded ? 'expand_less' : 'expand_more',
                    color: isDark
                        ? AppTheme.textSecondaryDark
                        : AppTheme.textSecondaryLight,
                    size: 20,
                  ),
                ],
              ),

              SizedBox(height: 2.h),

              // Note content
              AnimatedCrossFade(
                firstChild: Text(
                  content.length > 100
                      ? '${content.substring(0, 100)}...'
                      : content,
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: isDark
                        ? AppTheme.textPrimaryDark
                        : AppTheme.textPrimaryLight,
                    height: 1.5,
                  ),
                  softWrap: true,
                  overflow: TextOverflow.visible,
                ),
                secondChild: Text(
                  content,
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: isDark
                        ? AppTheme.textPrimaryDark
                        : AppTheme.textPrimaryLight,
                    height: 1.5,
                  ),
                  softWrap: true,
                  overflow: TextOverflow.visible,
                ),
                crossFadeState: isExpanded
                    ? CrossFadeState.showSecond
                    : CrossFadeState.showFirst,
                duration: const Duration(milliseconds: 300),
              ),

              if (content.length > 100 && !isExpanded) ...[
                SizedBox(height: 1.h),
                Text(
                  'Tap to read more',
                  style: theme.textTheme.bodySmall?.copyWith(
                    color: isDark
                        ? AppTheme.secondaryDark
                        : AppTheme.secondaryLight,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}
