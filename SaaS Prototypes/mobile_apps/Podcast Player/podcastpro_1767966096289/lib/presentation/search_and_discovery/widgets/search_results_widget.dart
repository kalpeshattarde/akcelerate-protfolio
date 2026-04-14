import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class SearchResultsWidget extends StatelessWidget {
  final String searchQuery;
  final String selectedCategory;
  final Function(Map<String, dynamic>) onResultTap;
  final Function(Map<String, dynamic>) onResultLongPress;

  const SearchResultsWidget({
    Key? key,
    required this.searchQuery,
    required this.selectedCategory,
    required this.onResultTap,
    required this.onResultLongPress,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final filteredResults = _getFilteredResults();

    if (filteredResults.isEmpty) {
      return _buildEmptyState();
    }

    return ListView.builder(
      physics: const BouncingScrollPhysics(),
      padding: EdgeInsets.symmetric(horizontal: 4.w),
      itemCount: filteredResults.length,
      itemBuilder: (context, index) {
        final result = filteredResults[index];
        return _buildResultItem(result, index);
      },
    );
  }

  Widget _buildEmptyState() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          CustomIconWidget(
            iconName: 'search_off',
            color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
            size: 64,
          ),
          SizedBox(height: 2.h),
          Text(
            searchQuery.isEmpty ? 'Start typing to search' : 'No results found',
            style: AppTheme.lightTheme.textTheme.headlineSmall?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
            ),
          ),
          SizedBox(height: 1.h),
          Text(
            searchQuery.isEmpty
                ? 'Discover podcasts, episodes, and creators'
                : 'Try different keywords or browse categories',
            style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  Widget _buildResultItem(Map<String, dynamic> result, int index) {
    return GestureDetector(
      onTap: () => onResultTap(result),
      onLongPress: () => onResultLongPress(result),
      child: Container(
        margin: EdgeInsets.only(bottom: 2.h),
        padding: EdgeInsets.all(3.w),
        decoration: BoxDecoration(
          color: AppTheme.lightTheme.colorScheme.surface,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color:
                AppTheme.lightTheme.colorScheme.outline.withValues(alpha: 0.1),
          ),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.05),
              blurRadius: 10,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Row(
          children: [
            _buildResultImage(result),
            SizedBox(width: 3.w),
            Expanded(
              child: _buildResultContent(result),
            ),
            _buildResultActions(result),
          ],
        ),
      ),
    );
  }

  Widget _buildResultImage(Map<String, dynamic> result) {
    return Container(
      width: 15.w,
      height: 15.w,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.1),
            blurRadius: 4,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(12),
        child: CustomImageWidget(
          imageUrl: result['image'],
          width: 15.w,
          height: 15.w,
          fit: BoxFit.cover,
        ),
      ),
    );
  }

  Widget _buildResultContent(Map<String, dynamic> result) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Container(
              padding: EdgeInsets.symmetric(horizontal: 2.w, vertical: 0.5.h),
              decoration: BoxDecoration(
                color: _getTypeColor(result['type']).withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(6),
              ),
              child: Text(
                result['type'].toUpperCase(),
                style: AppTheme.lightTheme.textTheme.labelSmall?.copyWith(
                  color: _getTypeColor(result['type']),
                  fontWeight: FontWeight.w600,
                  fontSize: 8.sp,
                ),
              ),
            ),
            if (result['isVerified'] == true) ...[
              SizedBox(width: 2.w),
              CustomIconWidget(
                iconName: 'verified',
                color: AppTheme.lightTheme.colorScheme.secondary,
                size: 14,
              ),
            ],
          ],
        ),
        SizedBox(height: 1.h),
        Text(
          _highlightSearchText(result['title'], searchQuery),
          style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w600,
          ),
          maxLines: 2,
          overflow: TextOverflow.ellipsis,
        ),
        SizedBox(height: 0.5.h),
        Text(
          result['subtitle'],
          style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
            color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
          ),
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
        ),
        SizedBox(height: 1.h),
        Row(
          children: [
            if (result['stats'] != null) ...[
              CustomIconWidget(
                iconName: _getStatsIcon(result['type']),
                color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                size: 12,
              ),
              SizedBox(width: 1.w),
              Text(
                result['stats'],
                style: AppTheme.lightTheme.textTheme.labelSmall?.copyWith(
                  color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                ),
              ),
            ],
            if (result['duration'] != null) ...[
              SizedBox(width: 3.w),
              CustomIconWidget(
                iconName: 'schedule',
                color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                size: 12,
              ),
              SizedBox(width: 1.w),
              Text(
                result['duration'],
                style: AppTheme.lightTheme.textTheme.labelSmall?.copyWith(
                  color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                ),
              ),
            ],
          ],
        ),
      ],
    );
  }

  Widget _buildResultActions(Map<String, dynamic> result) {
    return Column(
      children: [
        GestureDetector(
          onTap: () => onResultLongPress(result),
          child: Container(
            padding: EdgeInsets.all(2.w),
            decoration: BoxDecoration(
              color: AppTheme.lightTheme.colorScheme.secondary
                  .withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(8),
            ),
            child: CustomIconWidget(
              iconName: 'more_vert',
              color: AppTheme.lightTheme.colorScheme.secondary,
              size: 16,
            ),
          ),
        ),
        if (result['type'] == 'episode') ...[
          SizedBox(height: 2.h),
          GestureDetector(
            onTap: () => onResultTap(result),
            child: Container(
              padding: EdgeInsets.all(2.w),
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.colorScheme.secondary,
                borderRadius: BorderRadius.circular(8),
              ),
              child: CustomIconWidget(
                iconName: 'play_arrow',
                color: AppTheme.lightTheme.colorScheme.onSecondary,
                size: 16,
              ),
            ),
          ),
        ],
      ],
    );
  }

  String _highlightSearchText(String text, String query) {
    if (query.isEmpty) return text;
    // In a real implementation, this would return a RichText widget with highlighted matches
    return text;
  }

  Color _getTypeColor(String type) {
    switch (type) {
      case 'podcast':
        return AppTheme.lightTheme.colorScheme.secondary;
      case 'episode':
        return const Color(0xFF4CAF50);
      case 'creator':
        return const Color(0xFF9C27B0);
      default:
        return AppTheme.lightTheme.colorScheme.onSurfaceVariant;
    }
  }

  String _getStatsIcon(String type) {
    switch (type) {
      case 'podcast':
        return 'people';
      case 'episode':
        return 'play_circle';
      case 'creator':
        return 'person';
      default:
        return 'info';
    }
  }

  List<Map<String, dynamic>> _getFilteredResults() {
    final allResults = [
      {
        'id': '1',
        'type': 'podcast',
        'title': 'The Tech Talk Show',
        'subtitle': 'Weekly discussions about latest technology trends',
        'image':
            'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop',
        'stats': '125K subscribers',
        'isVerified': true,
        'category': 'Technology',
      },
      {
        'id': '2',
        'type': 'episode',
        'title': 'AI Revolution: What\'s Next in 2024',
        'subtitle': 'The Tech Talk Show • Dec 28, 2024',
        'image':
            'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=400&fit=crop',
        'duration': '45 min',
        'stats': '25K plays',
        'category': 'Technology',
      },
      {
        'id': '3',
        'type': 'creator',
        'title': 'Sarah Johnson',
        'subtitle': 'Tech journalist and podcast host',
        'image':
            'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop',
        'stats': '50K followers',
        'isVerified': true,
        'category': 'Technology',
      },
      {
        'id': '4',
        'type': 'podcast',
        'title': 'Business Insights Daily',
        'subtitle': 'Your daily dose of business news and analysis',
        'image':
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        'stats': '89K subscribers',
        'category': 'Business',
      },
      {
        'id': '5',
        'type': 'episode',
        'title': 'Startup Funding Trends in 2024',
        'subtitle': 'Business Insights Daily • Dec 27, 2024',
        'image':
            'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=400&fit=crop',
        'duration': '32 min',
        'stats': '18K plays',
        'category': 'Business',
      },
      {
        'id': '6',
        'type': 'podcast',
        'title': 'Comedy Central Podcast',
        'subtitle': 'Laugh out loud with our weekly comedy show',
        'image':
            'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=400&fit=crop',
        'stats': '200K subscribers',
        'isVerified': true,
        'category': 'Comedy',
      },
      {
        'id': '7',
        'type': 'episode',
        'title': 'Stand-up Comedy Special: Best of 2024',
        'subtitle': 'Comedy Central Podcast • Dec 26, 2024',
        'image':
            'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=400&h=400&fit=crop',
        'duration': '58 min',
        'stats': '45K plays',
        'category': 'Comedy',
      },
      {
        'id': '8',
        'type': 'creator',
        'title': 'Mike Chen',
        'subtitle': 'Comedian and podcast host',
        'image':
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
        'stats': '75K followers',
        'category': 'Comedy',
      },
    ];

    List<Map<String, dynamic>> filtered = allResults;

    // Filter by category
    if (selectedCategory != 'All') {
      filtered = filtered
          .where((result) => result['category'] == selectedCategory)
          .toList();
    }

    // Filter by search query
    if (searchQuery.isNotEmpty) {
      filtered = filtered.where((result) {
        final title = (result['title'] as String).toLowerCase();
        final subtitle = (result['subtitle'] as String).toLowerCase();
        final query = searchQuery.toLowerCase();
        return title.contains(query) || subtitle.contains(query);
      }).toList();
    }

    return filtered;
  }
}
