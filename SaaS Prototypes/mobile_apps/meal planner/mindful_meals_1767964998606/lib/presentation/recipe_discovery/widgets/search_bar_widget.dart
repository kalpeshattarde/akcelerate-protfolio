import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class SearchBarWidget extends StatefulWidget {
  final TextEditingController controller;
  final VoidCallback? onFilterTap;
  final VoidCallback? onVoiceSearch;
  final Function(String)? onChanged;
  final Function(String)? onSubmitted;

  const SearchBarWidget({
    Key? key,
    required this.controller,
    this.onFilterTap,
    this.onVoiceSearch,
    this.onChanged,
    this.onSubmitted,
  }) : super(key: key);

  @override
  State<SearchBarWidget> createState() => _SearchBarWidgetState();
}

class _SearchBarWidgetState extends State<SearchBarWidget> {
  bool _isSearchFocused = false;

  @override
  Widget build(BuildContext context) {
    final bool isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
      child: Row(
        children: [
          // Search Input Field
          Expanded(
            child: Container(
              decoration: BoxDecoration(
                color: isDark ? AppTheme.surfaceDark : AppTheme.surfaceLight,
                borderRadius: BorderRadius.circular(25),
                border: Border.all(
                  color: _isSearchFocused
                      ? (isDark ? AppTheme.primaryDark : AppTheme.primaryLight)
                      : (isDark ? AppTheme.dividerDark : AppTheme.dividerLight),
                  width: _isSearchFocused ? 2 : 1,
                ),
              ),
              child: TextField(
                controller: widget.controller,
                onChanged: widget.onChanged,
                onSubmitted: widget.onSubmitted,
                decoration: InputDecoration(
                  hintText: 'Search mindful recipes...',
                  hintStyle: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        color: isDark
                            ? AppTheme.textDisabledDark
                            : AppTheme.textDisabledLight,
                      ),
                  prefixIcon: Padding(
                    padding: EdgeInsets.all(3.w),
                    child: CustomIconWidget(
                      iconName: 'search',
                      color: isDark
                          ? AppTheme.textSecondaryDark
                          : AppTheme.textSecondaryLight,
                      size: 20,
                    ),
                  ),
                  suffixIcon: widget.controller.text.isNotEmpty
                      ? GestureDetector(
                          onTap: () {
                            widget.controller.clear();
                            if (widget.onChanged != null) {
                              widget.onChanged!('');
                            }
                          },
                          child: Padding(
                            padding: EdgeInsets.all(3.w),
                            child: CustomIconWidget(
                              iconName: 'clear',
                              color: isDark
                                  ? AppTheme.textSecondaryDark
                                  : AppTheme.textSecondaryLight,
                              size: 20,
                            ),
                          ),
                        )
                      : GestureDetector(
                          onTap: widget.onVoiceSearch,
                          child: Padding(
                            padding: EdgeInsets.all(3.w),
                            child: CustomIconWidget(
                              iconName: 'mic',
                              color: isDark
                                  ? AppTheme.textSecondaryDark
                                  : AppTheme.textSecondaryLight,
                              size: 20,
                            ),
                          ),
                        ),
                  border: InputBorder.none,
                  contentPadding:
                      EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
                ),
                onTap: () => setState(() => _isSearchFocused = true),
                onTapOutside: (_) => setState(() => _isSearchFocused = false),
              ),
            ),
          ),

          SizedBox(width: 3.w),

          // Filter Button
          GestureDetector(
            onTap: widget.onFilterTap,
            child: Container(
              padding: EdgeInsets.all(3.w),
              decoration: BoxDecoration(
                color: isDark ? AppTheme.primaryDark : AppTheme.primaryLight,
                borderRadius: BorderRadius.circular(25),
                boxShadow:
                    isDark ? AppTheme.darkWellnessShadow : AppTheme.lightWellnessShadow,
              ),
              child: CustomIconWidget(
                iconName: 'tune',
                color:
                    isDark ? AppTheme.onPrimaryDark : AppTheme.onPrimaryLight,
                size: 24,
              ),
            ),
          ),
        ],
      ),
    );
  }
}