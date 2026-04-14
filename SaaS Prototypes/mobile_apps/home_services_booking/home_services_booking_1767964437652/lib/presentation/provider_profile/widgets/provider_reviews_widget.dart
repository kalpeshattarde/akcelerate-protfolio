import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../widgets/custom_icon_widget.dart';

class ProviderReviewsWidget extends StatefulWidget {
  final List<Map<String, dynamic>> reviews;

  const ProviderReviewsWidget({
    super.key,
    required this.reviews,
  });

  @override
  State<ProviderReviewsWidget> createState() => _ProviderReviewsWidgetState();
}

class _ProviderReviewsWidgetState extends State<ProviderReviewsWidget> {
  final Set<int> _expandedReviews = {};

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 4.w),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Customer Reviews',
                  style: theme.textTheme.titleLarge?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),
                TextButton(
                  onPressed: () {
                    _showAllReviews(context);
                  },
                  child: Text(
                    'View All',
                    style: theme.textTheme.labelLarge?.copyWith(
                      color: theme.colorScheme.primary,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
              ],
            ),
          ),
          SizedBox(height: 2.h),
          ListView.separated(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            padding: EdgeInsets.symmetric(horizontal: 4.w),
            itemCount: widget.reviews.length > 3 ? 3 : widget.reviews.length,
            separatorBuilder: (context, index) => SizedBox(height: 2.h),
            itemBuilder: (context, index) {
              final review = widget.reviews[index];
              return _buildReviewCard(context, review, index);
            },
          ),
        ],
      ),
    );
  }

  Widget _buildReviewCard(
    BuildContext context,
    Map<String, dynamic> review,
    int index,
  ) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    final isExpanded = _expandedReviews.contains(index);
    final reviewText = review['comment'] as String? ?? '';
    final shouldShowExpand = reviewText.length > 150;

    return Container(
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: colorScheme.surface,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: colorScheme.outline.withValues(alpha: 0.2),
          width: 1,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              CircleAvatar(
                radius: 20,
                backgroundColor: colorScheme.primary.withValues(alpha: 0.1),
                child: Text(
                  (review['customerName'] as String? ?? 'U')[0].toUpperCase(),
                  style: theme.textTheme.titleMedium?.copyWith(
                    color: colorScheme.primary,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),

              SizedBox(width: 3.w),

              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      review['customerName'] as String? ?? 'Anonymous',
                      style: theme.textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    Row(
                      children: [
                        _buildRatingStars(
                          rating: (review['rating'] as num?)?.toDouble() ?? 0.0,
                        ),
                        SizedBox(width: 2.w),
                        Text(
                          review['date'] as String? ?? '',
                          style: theme.textTheme.bodySmall?.copyWith(
                            color: colorScheme.onSurfaceVariant,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),

              // Helpful votes
              if (review['helpfulVotes'] != null)
                Container(
                  padding: EdgeInsets.symmetric(
                    horizontal: 2.w,
                    vertical: 0.5.h,
                  ),
                  decoration: BoxDecoration(
                    color: colorScheme.secondary.withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      CustomIconWidget(
                        iconName: 'thumb_up',
                        color: colorScheme.secondary,
                        size: 12,
                      ),
                      SizedBox(width: 1.w),
                      Text(
                        '${review['helpfulVotes']}',
                        style: theme.textTheme.labelSmall?.copyWith(
                          color: colorScheme.secondary,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ],
                  ),
                ),
            ],
          ),
          SizedBox(height: 2.h),
          Text(
            isExpanded || !shouldShowExpand
                ? reviewText
                : '${reviewText.substring(0, 150)}...',
            style: theme.textTheme.bodyMedium?.copyWith(
              height: 1.5,
            ),
          ),
          if (shouldShowExpand) ...[
            SizedBox(height: 1.h),
            GestureDetector(
              onTap: () {
                setState(() {
                  if (isExpanded) {
                    _expandedReviews.remove(index);
                  } else {
                    _expandedReviews.add(index);
                  }
                });
              },
              child: Text(
                isExpanded ? 'Show less' : 'Read more',
                style: theme.textTheme.labelMedium?.copyWith(
                  color: colorScheme.primary,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
          ],
          if (review['serviceType'] != null) ...[
            SizedBox(height: 2.h),
            Container(
              padding: EdgeInsets.symmetric(
                horizontal: 2.w,
                vertical: 0.5.h,
              ),
              decoration: BoxDecoration(
                color: colorScheme.primary.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(
                'Service: ${review['serviceType']}',
                style: theme.textTheme.labelSmall?.copyWith(
                  color: colorScheme.primary,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildRatingStars({required double rating}) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: List.generate(5, (index) {
        if (index < rating.floor()) {
          return CustomIconWidget(
            iconName: 'star',
            color: Colors.amber,
            size: 14,
          );
        } else if (index < rating) {
          return CustomIconWidget(
            iconName: 'star_half',
            color: Colors.amber,
            size: 14,
          );
        } else {
          return CustomIconWidget(
            iconName: 'star_border',
            color: Colors.grey.shade400,
            size: 14,
          );
        }
      }),
    );
  }

  void _showAllReviews(BuildContext context) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => Scaffold(
          appBar: AppBar(
            title: const Text('All Reviews'),
            leading: IconButton(
              onPressed: () => Navigator.pop(context),
              icon: CustomIconWidget(
                iconName: 'arrow_back',
                color: Theme.of(context).colorScheme.onSurface,
                size: 24,
              ),
            ),
          ),
          body: ListView.separated(
            padding: EdgeInsets.all(4.w),
            itemCount: widget.reviews.length,
            separatorBuilder: (context, index) => SizedBox(height: 2.h),
            itemBuilder: (context, index) {
              final review = widget.reviews[index];
              return _buildReviewCard(context, review, index);
            },
          ),
        ),
      ),
    );
  }
}
