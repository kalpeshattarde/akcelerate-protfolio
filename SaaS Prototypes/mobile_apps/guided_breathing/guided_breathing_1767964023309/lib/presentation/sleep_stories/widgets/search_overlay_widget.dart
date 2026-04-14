import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class SearchOverlayWidget extends StatefulWidget {
  final Function(String) onSearch;
  final VoidCallback? onVoiceSearch;
  final VoidCallback onClose;
  final bool isDimmed;

  const SearchOverlayWidget({
    Key? key,
    required this.onSearch,
    this.onVoiceSearch,
    required this.onClose,
    this.isDimmed = false,
  }) : super(key: key);

  @override
  State<SearchOverlayWidget> createState() => _SearchOverlayWidgetState();
}

class _SearchOverlayWidgetState extends State<SearchOverlayWidget>
    with SingleTickerProviderStateMixin {
  final TextEditingController _searchController = TextEditingController();
  late AnimationController _animationController;
  late Animation<double> _fadeAnimation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: Duration(milliseconds: 300),
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
    _searchController.dispose();
    super.dispose();
  }

  void _closeOverlay() {
    _animationController.reverse().then((_) {
      widget.onClose();
    });
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _fadeAnimation,
      builder: (context, child) {
        return Container(
          color: widget.isDimmed
              ? Colors.black.withValues(alpha: 0.8 * _fadeAnimation.value)
              : AppTheme.lightTheme.scaffoldBackgroundColor
                  .withValues(alpha: 0.95 * _fadeAnimation.value),
          child: SafeArea(
            child: Padding(
              padding: EdgeInsets.all(4.w),
              child: Column(
                children: [
                  // Search header
                  Row(
                    children: [
                      GestureDetector(
                        onTap: _closeOverlay,
                        child: Container(
                          padding: EdgeInsets.all(2.w),
                          child: CustomIconWidget(
                            iconName: 'arrow_back',
                            color: widget.isDimmed
                                ? Colors.white
                                : AppTheme.lightTheme.colorScheme.onSurface,
                            size: 24,
                          ),
                        ),
                      ),
                      SizedBox(width: 2.w),
                      Expanded(
                        child: Container(
                          padding: EdgeInsets.symmetric(horizontal: 4.w),
                          decoration: BoxDecoration(
                            color: widget.isDimmed
                                ? Colors.white.withValues(alpha: 0.1)
                                : AppTheme.lightTheme.colorScheme.surface
                                    .withValues(alpha: 0.8),
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(
                              color: widget.isDimmed
                                  ? Colors.white.withValues(alpha: 0.3)
                                  : AppTheme.lightTheme.colorScheme.outline
                                      .withValues(alpha: 0.3),
                            ),
                          ),
                          child: TextField(
                            controller: _searchController,
                            autofocus: true,
                            style: AppTheme.lightTheme.textTheme.bodyLarge
                                ?.copyWith(
                              color: widget.isDimmed
                                  ? Colors.white
                                  : AppTheme.lightTheme.colorScheme.onSurface,
                            ),
                            decoration: InputDecoration(
                              hintText: 'Search sleep stories...',
                              hintStyle: AppTheme.lightTheme.textTheme.bodyLarge
                                  ?.copyWith(
                                color: widget.isDimmed
                                    ? Colors.white.withValues(alpha: 0.7)
                                    : AppTheme.lightTheme.colorScheme
                                        .onSurfaceVariant,
                              ),
                              border: InputBorder.none,
                              suffixIcon: _searchController.text.isNotEmpty
                                  ? GestureDetector(
                                      onTap: () {
                                        _searchController.clear();
                                        widget.onSearch('');
                                        setState(() {});
                                      },
                                      child: CustomIconWidget(
                                        iconName: 'clear',
                                        color: widget.isDimmed
                                            ? Colors.white
                                                .withValues(alpha: 0.7)
                                            : AppTheme.lightTheme.colorScheme
                                                .onSurfaceVariant,
                                        size: 20,
                                      ),
                                    )
                                  : null,
                            ),
                            onChanged: (value) {
                              widget.onSearch(value);
                              setState(() {});
                            },
                          ),
                        ),
                      ),

                      // Voice search button (for bedtime mode)
                      if (widget.onVoiceSearch != null) ...[
                        SizedBox(width: 2.w),
                        GestureDetector(
                          onTap: widget.onVoiceSearch,
                          child: Container(
                            padding: EdgeInsets.all(2.w),
                            decoration: BoxDecoration(
                              color: widget.isDimmed
                                  ? Colors.white.withValues(alpha: 0.1)
                                  : AppTheme.lightTheme.colorScheme.surface
                                      .withValues(alpha: 0.8),
                              borderRadius: BorderRadius.circular(12),
                              border: Border.all(
                                color: widget.isDimmed
                                    ? Colors.white.withValues(alpha: 0.3)
                                    : AppTheme.lightTheme.colorScheme.outline
                                        .withValues(alpha: 0.3),
                              ),
                            ),
                            child: CustomIconWidget(
                              iconName: 'mic',
                              color: widget.isDimmed
                                  ? Colors.white
                                  : AppTheme.lightTheme.colorScheme.secondary,
                              size: 20,
                            ),
                          ),
                        ),
                      ],
                    ],
                  ),

                  SizedBox(height: 3.h),

                  // Search suggestions
                  if (_searchController.text.isEmpty) _buildSearchSuggestions(),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildSearchSuggestions() {
    final suggestions = [
      'Sleep stories for anxiety',
      'Nature sounds',
      'Classic fairy tales',
      'Travel adventures',
      'Ocean waves',
      'Forest dreams',
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Popular searches',
          style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
            color: widget.isDimmed
                ? Colors.white
                : AppTheme.lightTheme.colorScheme.onSurface,
            fontWeight: FontWeight.w600,
          ),
        ),
        SizedBox(height: 2.h),
        Wrap(
          spacing: 2.w,
          runSpacing: 1.h,
          children: suggestions
              .map(
                (suggestion) => GestureDetector(
                  onTap: () {
                    _searchController.text = suggestion;
                    widget.onSearch(suggestion);
                    setState(() {});
                  },
                  child: Container(
                    padding:
                        EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.5.h),
                    decoration: BoxDecoration(
                      color: widget.isDimmed
                          ? Colors.white.withValues(alpha: 0.1)
                          : AppTheme.lightTheme.colorScheme.surface
                              .withValues(alpha: 0.8),
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(
                        color: widget.isDimmed
                            ? Colors.white.withValues(alpha: 0.3)
                            : AppTheme.lightTheme.colorScheme.outline
                                .withValues(alpha: 0.3),
                      ),
                    ),
                    child: Text(
                      suggestion,
                      style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                        color: widget.isDimmed
                            ? Colors.white.withValues(alpha: 0.9)
                            : AppTheme.lightTheme.colorScheme.onSurface,
                      ),
                    ),
                  ),
                ),
              )
              .toList(),
        ),
      ],
    );
  }
}
