import 'package:flutter/material.dart';
import 'package:share_plus/share_plus.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class ArticleReaderWidget extends StatefulWidget {
  final Map<String, dynamic> article;
  final bool isBookmarked;
  final VoidCallback onBookmarkToggle;

  const ArticleReaderWidget({
    super.key,
    required this.article,
    required this.isBookmarked,
    required this.onBookmarkToggle,
  });

  @override
  State<ArticleReaderWidget> createState() => _ArticleReaderWidgetState();
}

class _ArticleReaderWidgetState extends State<ArticleReaderWidget> {
  final ScrollController _scrollController = ScrollController();
  double _textSizeMultiplier = 1.0;
  bool _showScrollToTop = false;

  @override
  void initState() {
    super.initState();
    _scrollController.addListener(_onScroll);
  }

  @override
  void dispose() {
    _scrollController.removeListener(_onScroll);
    _scrollController.dispose();
    super.dispose();
  }

  void _onScroll() {
    if (_scrollController.offset > 300 && !_showScrollToTop) {
      setState(() => _showScrollToTop = true);
    } else if (_scrollController.offset <= 300 && _showScrollToTop) {
      setState(() => _showScrollToTop = false);
    }
  }

  void _shareArticle() {
    Share.share(
      'Check out this article: ${widget.article['title']}\n\n${widget.article['excerpt']}',
      subject: widget.article['title'] as String,
    );
  }

  void _adjustTextSize(bool increase) {
    setState(() {
      if (increase && _textSizeMultiplier < 1.5) {
        _textSizeMultiplier += 0.1;
      } else if (!increase && _textSizeMultiplier > 0.8) {
        _textSizeMultiplier -= 0.1;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      body: CustomScrollView(
        controller: _scrollController,
        slivers: [
          // App Bar with Image
          SliverAppBar(
            expandedHeight: 30.h,
            pinned: true,
            leading: IconButton(
              icon: Container(
                padding: EdgeInsets.all(2.w),
                decoration: BoxDecoration(
                  color: Colors.white.withValues(alpha: 0.9),
                  shape: BoxShape.circle,
                ),
                child: CustomIconWidget(
                  iconName: 'arrow_back',
                  size: 24,
                  color: theme.colorScheme.onSurface,
                ),
              ),
              onPressed: () => Navigator.pop(context),
            ),
            actions: [
              IconButton(
                icon: Container(
                  padding: EdgeInsets.all(2.w),
                  decoration: BoxDecoration(
                    color: Colors.white.withValues(alpha: 0.9),
                    shape: BoxShape.circle,
                  ),
                  child: CustomIconWidget(
                    iconName:
                        widget.isBookmarked ? 'bookmark' : 'bookmark_border',
                    size: 24,
                    color: widget.isBookmarked
                        ? theme.colorScheme.primary
                        : theme.colorScheme.onSurface,
                  ),
                ),
                onPressed: widget.onBookmarkToggle,
              ),
              IconButton(
                icon: Container(
                  padding: EdgeInsets.all(2.w),
                  decoration: BoxDecoration(
                    color: Colors.white.withValues(alpha: 0.9),
                    shape: BoxShape.circle,
                  ),
                  child: CustomIconWidget(
                    iconName: 'share',
                    size: 24,
                    color: theme.colorScheme.onSurface,
                  ),
                ),
                onPressed: _shareArticle,
              ),
              SizedBox(width: 2.w),
            ],
            flexibleSpace: FlexibleSpaceBar(
              background: Stack(
                fit: StackFit.expand,
                children: [
                  CustomImageWidget(
                    imageUrl: widget.article['image'] as String,
                    width: double.infinity,
                    height: double.infinity,
                    fit: BoxFit.cover,
                    semanticLabel: widget.article['semanticLabel'] as String,
                  ),
                  Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        colors: [
                          Colors.transparent,
                          Colors.black.withValues(alpha: 0.5),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),

          // Article Content
          SliverToBoxAdapter(
            child: Container(
              color: theme.scaffoldBackgroundColor,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Header Section
                  Padding(
                    padding: EdgeInsets.all(4.w),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Category Badge
                        Container(
                          padding: EdgeInsets.symmetric(
                            horizontal: 3.w,
                            vertical: 0.8.h,
                          ),
                          decoration: BoxDecoration(
                            color: theme.colorScheme.primary,
                            borderRadius: BorderRadius.circular(20),
                          ),
                          child: Text(
                            widget.article['category'] as String,
                            style: theme.textTheme.labelSmall?.copyWith(
                              color: theme.colorScheme.onPrimary,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                        SizedBox(height: 2.h),

                        // Title
                        Text(
                          widget.article['title'] as String,
                          style: theme.textTheme.headlineSmall?.copyWith(
                            fontWeight: FontWeight.w700,
                            height: 1.3,
                            fontSize:
                                (theme.textTheme.headlineSmall?.fontSize ??
                                        24) *
                                    _textSizeMultiplier,
                          ),
                        ),
                        SizedBox(height: 2.h),

                        // Metadata
                        Row(
                          children: [
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    widget.article['author'] as String,
                                    style: theme.textTheme.bodyMedium?.copyWith(
                                      fontWeight: FontWeight.w600,
                                    ),
                                  ),
                                  SizedBox(height: 0.5.h),
                                  Text(
                                    widget.article['publishDate'] as String,
                                    style: theme.textTheme.bodySmall?.copyWith(
                                      color: theme.colorScheme.onSurfaceVariant,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            Row(
                              children: [
                                CustomIconWidget(
                                  iconName: 'schedule',
                                  size: 18,
                                  color: theme.colorScheme.onSurfaceVariant,
                                ),
                                SizedBox(width: 1.w),
                                Text(
                                  widget.article['readTime'] as String,
                                  style: theme.textTheme.bodyMedium?.copyWith(
                                    color: theme.colorScheme.onSurfaceVariant,
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                        SizedBox(height: 2.h),

                        // Text Size Controls
                        Container(
                          padding: EdgeInsets.symmetric(
                            horizontal: 3.w,
                            vertical: 1.h,
                          ),
                          decoration: BoxDecoration(
                            color: theme.colorScheme.surface,
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(
                              color: theme.colorScheme.outline
                                  .withValues(alpha: 0.3),
                            ),
                          ),
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Text(
                                'Text Size:',
                                style: theme.textTheme.bodySmall?.copyWith(
                                  color: theme.colorScheme.onSurfaceVariant,
                                ),
                              ),
                              SizedBox(width: 2.w),
                              IconButton(
                                icon: CustomIconWidget(
                                  iconName: 'remove',
                                  size: 20,
                                  color: theme.colorScheme.primary,
                                ),
                                onPressed: () => _adjustTextSize(false),
                                constraints: const BoxConstraints(),
                                padding: EdgeInsets.all(1.w),
                              ),
                              Text(
                                'A',
                                style: theme.textTheme.bodyMedium?.copyWith(
                                  fontSize: 14 * _textSizeMultiplier,
                                ),
                              ),
                              IconButton(
                                icon: CustomIconWidget(
                                  iconName: 'add',
                                  size: 20,
                                  color: theme.colorScheme.primary,
                                ),
                                onPressed: () => _adjustTextSize(true),
                                constraints: const BoxConstraints(),
                                padding: EdgeInsets.all(1.w),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),

                  // Divider
                  Divider(
                    height: 1,
                    thickness: 1,
                    color: theme.colorScheme.outline.withValues(alpha: 0.2),
                  ),

                  // Article Body
                  Padding(
                    padding: EdgeInsets.all(4.w),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Introduction
                        Text(
                          widget.article['excerpt'] as String,
                          style: theme.textTheme.bodyLarge?.copyWith(
                            height: 1.6,
                            fontSize:
                                (theme.textTheme.bodyLarge?.fontSize ?? 16) *
                                    _textSizeMultiplier,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                        SizedBox(height: 3.h),

                        // Mock Article Content
                        _buildArticleSection(
                          context,
                          'Understanding the Basics',
                          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                        ),

                        _buildArticleSection(
                          context,
                          'Key Points to Remember',
                          '• First important point about pregnancy wellness\n• Second crucial consideration for maternal health\n• Third essential tip for baby development\n• Fourth recommendation from healthcare experts\n• Fifth guideline for optimal pregnancy outcomes',
                        ),

                        _buildArticleSection(
                          context,
                          'Expert Recommendations',
                          'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.\n\nNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
                        ),

                        _buildArticleSection(
                          context,
                          'When to Consult Your Doctor',
                          'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.\n\nSimilique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
                        ),

                        SizedBox(height: 4.h),

                        // Related Articles Section
                        Text(
                          'Related Articles',
                          style: theme.textTheme.titleLarge?.copyWith(
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        SizedBox(height: 2.h),
                        _buildRelatedArticleCard(
                          context,
                          'Sleep Solutions for Pregnant Women',
                          'Self-Care',
                          '7 min read',
                        ),
                        _buildRelatedArticleCard(
                          context,
                          'Healthy Weight Gain During Pregnancy',
                          'Nutrition',
                          '8 min read',
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
      floatingActionButton: _showScrollToTop
          ? FloatingActionButton(
              onPressed: () {
                _scrollController.animateTo(
                  0,
                  duration: const Duration(milliseconds: 500),
                  curve: Curves.easeOut,
                );
              },
              child: CustomIconWidget(
                iconName: 'arrow_upward',
                size: 24,
                color: theme.colorScheme.onPrimary,
              ),
            )
          : null,
    );
  }

  Widget _buildArticleSection(
    BuildContext context,
    String heading,
    String content,
  ) {
    final theme = Theme.of(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          heading,
          style: theme.textTheme.titleLarge?.copyWith(
            fontWeight: FontWeight.w600,
            fontSize: (theme.textTheme.titleLarge?.fontSize ?? 22) *
                _textSizeMultiplier,
          ),
        ),
        SizedBox(height: 1.5.h),
        Text(
          content,
          style: theme.textTheme.bodyLarge?.copyWith(
            height: 1.6,
            fontSize: (theme.textTheme.bodyLarge?.fontSize ?? 16) *
                _textSizeMultiplier,
          ),
        ),
        SizedBox(height: 3.h),
      ],
    );
  }

  Widget _buildRelatedArticleCard(
    BuildContext context,
    String title,
    String category,
    String readTime,
  ) {
    final theme = Theme.of(context);

    return Card(
      margin: EdgeInsets.only(bottom: 2.h),
      child: InkWell(
        onTap: () {
          // Navigate to related article
        },
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: EdgeInsets.all(3.w),
          child: Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: theme.textTheme.titleSmall?.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                    SizedBox(height: 0.5.h),
                    Row(
                      children: [
                        Text(
                          category,
                          style: theme.textTheme.bodySmall?.copyWith(
                            color: theme.colorScheme.primary,
                          ),
                        ),
                        Text(
                          ' • ',
                          style: theme.textTheme.bodySmall?.copyWith(
                            color: theme.colorScheme.onSurfaceVariant,
                          ),
                        ),
                        Text(
                          readTime,
                          style: theme.textTheme.bodySmall?.copyWith(
                            color: theme.colorScheme.onSurfaceVariant,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              CustomIconWidget(
                iconName: 'arrow_forward_ios',
                size: 20,
                color: theme.colorScheme.onSurfaceVariant,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
