import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class MedicalRecordSearchBar extends StatefulWidget {
  final String searchQuery;
  final Function(String) onSearchChanged;
  final VoidCallback? onFilterTap;
  final bool showFilter;
  final int? activeFiltersCount;

  const MedicalRecordSearchBar({
    super.key,
    required this.searchQuery,
    required this.onSearchChanged,
    this.onFilterTap,
    this.showFilter = true,
    this.activeFiltersCount,
  });

  @override
  State<MedicalRecordSearchBar> createState() => _MedicalRecordSearchBarState();
}

class _MedicalRecordSearchBarState extends State<MedicalRecordSearchBar> {
  late TextEditingController _searchController;
  bool _isSearchFocused = false;

  @override
  void initState() {
    super.initState();
    _searchController = TextEditingController(text: widget.searchQuery);
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
      child: Row(
        children: [
          Expanded(
            child: _buildSearchField(theme),
          ),
          if (widget.showFilter) ...[
            SizedBox(width: 3.w),
            _buildFilterButton(theme),
          ],
        ],
      ),
    );
  }

  Widget _buildSearchField(ThemeData theme) {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 200),
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: _isSearchFocused
              ? theme.brightness == Brightness.light
                  ? const Color(0xFF2B5F75)
                  : const Color(0xFF4A8BA3)
              : theme.brightness == Brightness.light
                  ? const Color(0xFFE1E4E8)
                  : const Color(0xFF30363D),
          width: _isSearchFocused ? 2 : 1,
        ),
        boxShadow: _isSearchFocused
            ? [
                BoxShadow(
                  color: (theme.brightness == Brightness.light
                          ? const Color(0xFF2B5F75)
                          : const Color(0xFF4A8BA3))
                      .withValues(alpha: 0.1),
                  blurRadius: 8,
                  offset: const Offset(0, 2),
                ),
              ]
            : [
                BoxShadow(
                  color: theme.brightness == Brightness.light
                      ? const Color(0x0A000000)
                      : const Color(0x1A000000),
                  blurRadius: 2,
                  offset: const Offset(0, 1),
                ),
              ],
      ),
      child: TextField(
        controller: _searchController,
        onChanged: widget.onSearchChanged,
        onTap: () => setState(() => _isSearchFocused = true),
        onTapOutside: (_) => setState(() => _isSearchFocused = false),
        style: GoogleFonts.inter(
          fontSize: 14,
          fontWeight: FontWeight.w400,
          color: theme.brightness == Brightness.light
              ? const Color(0xFF1B1F23)
              : const Color(0xFFE8EAED),
        ),
        decoration: InputDecoration(
          hintText: 'Search medical records...',
          hintStyle: GoogleFonts.inter(
            fontSize: 14,
            fontWeight: FontWeight.w400,
            color: theme.brightness == Brightness.light
                ? const Color(0xFF959DA5)
                : const Color(0xFF6A737D),
          ),
          prefixIcon: Padding(
            padding: EdgeInsets.all(3.w),
            child: CustomIconWidget(
              iconName: 'search',
              color: _isSearchFocused
                  ? theme.brightness == Brightness.light
                      ? const Color(0xFF2B5F75)
                      : const Color(0xFF4A8BA3)
                  : theme.brightness == Brightness.light
                      ? const Color(0xFF6A737D)
                      : const Color(0xFFADB5BD),
              size: 5.w,
            ),
          ),
          suffixIcon: widget.searchQuery.isNotEmpty
              ? GestureDetector(
                  onTap: () {
                    _searchController.clear();
                    widget.onSearchChanged('');
                  },
                  child: Padding(
                    padding: EdgeInsets.all(3.w),
                    child: CustomIconWidget(
                      iconName: 'clear',
                      color: theme.brightness == Brightness.light
                          ? const Color(0xFF6A737D)
                          : const Color(0xFFADB5BD),
                      size: 5.w,
                    ),
                  ),
                )
              : null,
          border: InputBorder.none,
          contentPadding: EdgeInsets.symmetric(
            horizontal: 4.w,
            vertical: 2.h,
          ),
        ),
      ),
    );
  }

  Widget _buildFilterButton(ThemeData theme) {
    final hasActiveFilters =
        widget.activeFiltersCount != null && widget.activeFiltersCount! > 0;

    return GestureDetector(
      onTap: widget.onFilterTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        width: 12.w,
        height: 12.w,
        decoration: BoxDecoration(
          color: hasActiveFilters
              ? theme.brightness == Brightness.light
                  ? const Color(0xFF2B5F75)
                  : const Color(0xFF4A8BA3)
              : theme.colorScheme.surface,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: hasActiveFilters
                ? theme.brightness == Brightness.light
                    ? const Color(0xFF2B5F75)
                    : const Color(0xFF4A8BA3)
                : theme.brightness == Brightness.light
                    ? const Color(0xFFE1E4E8)
                    : const Color(0xFF30363D),
            width: hasActiveFilters ? 2 : 1,
          ),
          boxShadow: hasActiveFilters
              ? [
                  BoxShadow(
                    color: (theme.brightness == Brightness.light
                            ? const Color(0xFF2B5F75)
                            : const Color(0xFF4A8BA3))
                        .withValues(alpha: 0.3),
                    blurRadius: 4,
                    offset: const Offset(0, 2),
                  ),
                ]
              : [
                  BoxShadow(
                    color: theme.brightness == Brightness.light
                        ? const Color(0x0A000000)
                        : const Color(0x1A000000),
                    blurRadius: 2,
                    offset: const Offset(0, 1),
                  ),
                ],
        ),
        child: Stack(
          alignment: Alignment.center,
          children: [
            CustomIconWidget(
              iconName: 'tune',
              color: hasActiveFilters
                  ? Colors.white
                  : theme.brightness == Brightness.light
                      ? const Color(0xFF6A737D)
                      : const Color(0xFFADB5BD),
              size: 5.w,
            ),
            if (hasActiveFilters)
              Positioned(
                top: 1.5.w,
                right: 1.5.w,
                child: Container(
                  width: 3.w,
                  height: 3.w,
                  decoration: BoxDecoration(
                    color: AppTheme.errorLight,
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: Colors.white,
                      width: 1,
                    ),
                  ),
                  child: Center(
                    child: Text(
                      widget.activeFiltersCount.toString(),
                      style: GoogleFonts.inter(
                        fontSize: 14,
                        fontWeight: FontWeight.w600,
                        color: Colors.white,
                      ),
                    ),
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
