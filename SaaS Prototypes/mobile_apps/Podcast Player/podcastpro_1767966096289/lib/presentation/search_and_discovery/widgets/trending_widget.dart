import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class TrendingWidget extends StatefulWidget {
  final Function(Map<String, dynamic>) onTrendingTap;

  const TrendingWidget({
    Key? key,
    required this.onTrendingTap,
  }) : super(key: key);

  @override
  State<TrendingWidget> createState() => _TrendingWidgetState();
}

class _TrendingWidgetState extends State<TrendingWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _fadeAnimation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    );
    _fadeAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeInOut,
    ));
    _animationController.forward();
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return FadeTransition(
      opacity: _fadeAnimation,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
            child: Row(
              children: [
                CustomIconWidget(
                  iconName: 'trending_up',
                  color: AppTheme.lightTheme.colorScheme.secondary,
                  size: 24,
                ),
                SizedBox(width: 2.w),
                Text(
                  'Trending Now',
                  style: AppTheme.lightTheme.textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.w700,
                  ),
                ),
                const Spacer(),
                GestureDetector(
                  onTap: () {
                    // Navigate to full trending page
                  },
                  child: Text(
                    'See All',
                    style: AppTheme.lightTheme.textTheme.labelLarge?.copyWith(
                      color: AppTheme.lightTheme.colorScheme.secondary,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ],
            ),
          ),
          SizedBox(
            height: 25.h,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              physics: const BouncingScrollPhysics(),
              padding: EdgeInsets.symmetric(horizontal: 4.w),
              itemCount: _getTrendingItems().length,
              itemBuilder: (context, index) {
                final item = _getTrendingItems()[index];
                return _buildTrendingCard(item, index);
              },
            ),
          ),
          SizedBox(height: 2.h),
          _buildTrendingTopics(),
        ],
      ),
    );
  }

  Widget _buildTrendingCard(Map<String, dynamic> item, int index) {
    return GestureDetector(
      onTap: () => widget.onTrendingTap(item),
      child: Container(
        width: 45.w,
        margin: EdgeInsets.only(right: 4.w),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.1),
              blurRadius: 15,
              offset: const Offset(0, 5),
            ),
          ],
        ),
        child: Stack(
          children: [
            ClipRRect(
              borderRadius: BorderRadius.circular(20),
              child: CustomImageWidget(
                imageUrl: item['image'],
                width: 45.w,
                height: 25.h,
                fit: BoxFit.cover,
              ),
            ),
            Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(20),
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [
                    Colors.transparent,
                    Colors.black.withValues(alpha: 0.7),
                  ],
                ),
              ),
            ),
            Positioned(
              top: 3.w,
              left: 3.w,
              child: Container(
                padding: EdgeInsets.symmetric(horizontal: 2.w, vertical: 0.5.h),
                decoration: BoxDecoration(
                  color: _getTrendingColor(index),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    CustomIconWidget(
                      iconName: 'whatshot',
                      color: Colors.white,
                      size: 12,
                    ),
                    SizedBox(width: 1.w),
                    Text(
                      '#${index + 1}',
                      style: AppTheme.lightTheme.textTheme.labelSmall?.copyWith(
                        color: Colors.white,
                        fontWeight: FontWeight.w700,
                        fontSize: 10.sp,
                      ),
                    ),
                  ],
                ),
              ),
            ),
            Positioned(
              bottom: 3.w,
              left: 3.w,
              right: 3.w,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    item['title'],
                    style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.w700,
                    ),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                  SizedBox(height: 0.5.h),
                  Row(
                    children: [
                      CustomIconWidget(
                        iconName: 'play_circle',
                        color: Colors.white.withValues(alpha: 0.8),
                        size: 14,
                      ),
                      SizedBox(width: 1.w),
                      Text(
                        item['plays'],
                        style:
                            AppTheme.lightTheme.textTheme.labelSmall?.copyWith(
                          color: Colors.white.withValues(alpha: 0.8),
                        ),
                      ),
                      SizedBox(width: 3.w),
                      CustomIconWidget(
                        iconName: 'schedule',
                        color: Colors.white.withValues(alpha: 0.8),
                        size: 14,
                      ),
                      SizedBox(width: 1.w),
                      Text(
                        item['duration'],
                        style:
                            AppTheme.lightTheme.textTheme.labelSmall?.copyWith(
                          color: Colors.white.withValues(alpha: 0.8),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTrendingTopics() {
    final topics = [
      'AI & Machine Learning',
      'Cryptocurrency',
      'Remote Work',
      'Mental Health',
      'Climate Change',
      'Space Exploration',
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: EdgeInsets.symmetric(horizontal: 4.w),
          child: Text(
            'Trending Topics',
            style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
        SizedBox(height: 1.h),
        Container(
          height: 5.h,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            physics: const BouncingScrollPhysics(),
            padding: EdgeInsets.symmetric(horizontal: 4.w),
            itemCount: topics.length,
            itemBuilder: (context, index) {
              return Container(
                margin: EdgeInsets.only(right: 3.w),
                padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
                decoration: BoxDecoration(
                  color: AppTheme.lightTheme.colorScheme.secondary
                      .withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(
                    color: AppTheme.lightTheme.colorScheme.secondary
                        .withValues(alpha: 0.3),
                  ),
                ),
                child: Center(
                  child: Text(
                    topics[index],
                    style: AppTheme.lightTheme.textTheme.labelMedium?.copyWith(
                      color: AppTheme.lightTheme.colorScheme.secondary,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  Color _getTrendingColor(int index) {
    final colors = [
      const Color(0xFFFF6B35), // Orange
      const Color(0xFFE91E63), // Pink
      const Color(0xFF9C27B0), // Purple
      const Color(0xFF3F51B5), // Indigo
      const Color(0xFF2196F3), // Blue
    ];
    return colors[index % colors.length];
  }

  List<Map<String, dynamic>> _getTrendingItems() {
    return [
      {
        'id': '1',
        'title': 'The Future of AI in Healthcare',
        'image':
            'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=600&fit=crop',
        'plays': '125K',
        'duration': '42 min',
        'category': 'Technology',
      },
      {
        'id': '2',
        'title': 'Crypto Market Analysis 2024',
        'image':
            'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=600&fit=crop',
        'plays': '98K',
        'duration': '35 min',
        'category': 'Business',
      },
      {
        'id': '3',
        'title': 'Mental Health in Remote Work',
        'image':
            'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=600&fit=crop',
        'plays': '87K',
        'duration': '28 min',
        'category': 'Health',
      },
      {
        'id': '4',
        'title': 'Climate Change Solutions',
        'image':
            'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=400&h=600&fit=crop',
        'plays': '76K',
        'duration': '51 min',
        'category': 'Science',
      },
      {
        'id': '5',
        'title': 'Space Exploration Updates',
        'image':
            'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=600&fit=crop',
        'plays': '65K',
        'duration': '39 min',
        'category': 'Science',
      },
    ];
  }
}
