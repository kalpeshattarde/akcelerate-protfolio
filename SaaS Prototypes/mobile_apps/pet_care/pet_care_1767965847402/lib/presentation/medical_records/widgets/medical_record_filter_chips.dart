import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../widgets/custom_icon_widget.dart';

class MedicalRecordFilterChips extends StatelessWidget {
  final List<String> filters;
  final String selectedFilter;
  final Function(String) onFilterSelected;
  final Map<String, int> filterCounts;

  const MedicalRecordFilterChips({
    super.key,
    required this.filters,
    required this.selectedFilter,
    required this.onFilterSelected,
    this.filterCounts = const {},
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      height: 7.h,
      padding: EdgeInsets.symmetric(vertical: 1.2.h),
      margin: EdgeInsets.symmetric(vertical: 0.5.h),
      decoration: BoxDecoration(
        color:
            theme.brightness == Brightness.light
                ? const Color(0xFFF8F9FA)
                : const Color(0xFF161B22),
        border: Border(
          bottom: BorderSide(
            color:
                theme.brightness == Brightness.light
                    ? const Color(0xFFE1E4E8)
                    : const Color(0xFF21262D),
            width: 0.5,
          ),
        ),
      ),
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        padding: EdgeInsets.symmetric(horizontal: 4.w),
        itemCount: filters.length,
        separatorBuilder: (context, index) => SizedBox(width: 3.w),
        itemBuilder: (context, index) {
          final filter = filters[index];
          final isSelected = selectedFilter == filter;
          final count = filterCounts[filter] ?? 0;

          return _buildFilterChip(context, theme, filter, isSelected, count);
        },
      ),
    );
  }

  Widget _buildFilterChip(
    BuildContext context,
    ThemeData theme,
    String filter,
    bool isSelected,
    int count,
  ) {
    final chipColors = _getFilterColors(filter, theme);
    final isHighPriorityTab = ['All Records', 'Vaccinations'].contains(filter);

    return GestureDetector(
      onTap: () => onFilterSelected(filter),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 250),
        curve: Curves.easeInOutCubic,
        padding: EdgeInsets.symmetric(
          horizontal: isHighPriorityTab ? 5.w : 4.w,
          vertical: 1.h,
        ),
        decoration: BoxDecoration(
          color:
              isSelected
                  ? chipColors['selectedBackground']
                  : chipColors['unselectedBackground'],
          borderRadius: BorderRadius.circular(25),
          border: Border.all(
            color:
                isSelected
                    ? chipColors['selectedBorder']!
                    : chipColors['unselectedBorder']!,
            width:
                isSelected
                    ? 2.5
                    : isHighPriorityTab
                    ? 1.5
                    : 1,
          ),
          boxShadow: [
            if (isSelected)
              BoxShadow(
                color: chipColors['selectedBackground']!.withValues(alpha: 0.4),
                blurRadius: 8,
                offset: const Offset(0, 3),
                spreadRadius: 1,
              ),
            if (isHighPriorityTab && !isSelected)
              BoxShadow(
                color:
                    theme.brightness == Brightness.light
                        ? Colors.black.withValues(alpha: 0.08)
                        : Colors.white.withValues(alpha: 0.05),
                blurRadius: 4,
                offset: const Offset(0, 2),
              ),
          ],
          gradient:
              isSelected && isHighPriorityTab
                  ? LinearGradient(
                    colors: [
                      chipColors['selectedBackground']!,
                      chipColors['selectedBackground']!.withValues(alpha: 0.9),
                    ],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  )
                  : null,
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            // Main content row with top alignment
            Row(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (_getFilterIcon(filter) != null) ...[
                  Container(
                    padding: EdgeInsets.all(0.4.w),
                    margin: EdgeInsets.only(top: 0.3.h),
                    decoration:
                        isSelected && isHighPriorityTab
                            ? BoxDecoration(
                              color: Colors.white.withValues(alpha: 0.2),
                              borderRadius: BorderRadius.circular(12),
                            )
                            : null,
                    child: CustomIconWidget(
                      iconName: _getFilterIcon(filter)!,
                      color:
                          isSelected
                              ? chipColors['selectedText']!
                              : chipColors['unselectedText']!,
                      size: isHighPriorityTab ? 4.w : 3.5.w,
                    ),
                  ),
                  SizedBox(width: 2.w),
                ],
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    // Text aligned to top
                    Text(
                      filter,
                      style: GoogleFonts.inter(
                        fontSize: isHighPriorityTab ? 13.sp : 12.sp,
                        fontWeight:
                            isSelected
                                ? FontWeight.w700
                                : isHighPriorityTab
                                ? FontWeight.w600
                                : FontWeight.w500,
                        color:
                            isSelected
                                ? chipColors['selectedText']!
                                : chipColors['unselectedText']!,
                        letterSpacing: isHighPriorityTab ? 0.3 : 0.2,
                        height: 1.1,
                        shadows:
                            isSelected
                                ? [
                                  Shadow(
                                    color: Colors.black.withValues(alpha: 0.4),
                                    offset: const Offset(0, 1),
                                    blurRadius: 2,
                                  ),
                                ]
                                : null,
                      ),
                      textAlign: TextAlign.start,
                    ),
                  ],
                ),
                if (count > 0) ...[
                  SizedBox(width: 2.5.w),
                  Container(
                    margin: EdgeInsets.only(top: 0.2.h),
                    padding: EdgeInsets.symmetric(
                      horizontal: 2.w,
                      vertical: 0.3.h,
                    ),
                    decoration: BoxDecoration(
                      color:
                          isSelected
                              ? chipColors['selectedCountBackground']!
                              : chipColors['unselectedCountBackground']!,
                      borderRadius: BorderRadius.circular(12),
                      border:
                          isSelected || isHighPriorityTab
                              ? Border.all(
                                color:
                                    isSelected
                                        ? chipColors['selectedCountBorder']!
                                        : chipColors['unselectedCountBorder']!,
                                width: 0.5,
                              )
                              : null,
                    ),
                    child: Text(
                      count.toString(),
                      style: GoogleFonts.inter(
                        fontSize: isHighPriorityTab ? 11.sp : 10.sp,
                        fontWeight: FontWeight.w700,
                        color:
                            isSelected
                                ? chipColors['selectedCountText']!
                                : chipColors['unselectedCountText']!,
                        height: 1.0,
                        shadows:
                            isSelected
                                ? [
                                  Shadow(
                                    color: Colors.black.withValues(alpha: 0.3),
                                    offset: const Offset(0, 0.5),
                                    blurRadius: 1,
                                  ),
                                ]
                                : null,
                      ),
                    ),
                  ),
                ],
              ],
            ),
          ],
        ),
      ),
    );
  }

  Map<String, Color> _getFilterColors(String filter, ThemeData theme) {
    final isLight = theme.brightness == Brightness.light;

    // Base colors for each filter type with enhanced contrast
    Color baseColor;
    switch (filter.toLowerCase()) {
      case 'all records':
        baseColor =
            isLight
                ? const Color(0xFF0D47A1) // Darker blue for better contrast
                : const Color(0xFF90CAF9);
        break;
      case 'vaccinations':
        baseColor =
            isLight
                ? const Color(0xFF1B5E20) // Darker green for better contrast
                : const Color(0xFFA5D6A7);
        break;
      case 'medications':
        baseColor = isLight ? const Color(0xFF33691E) : const Color(0xFFC5E1A5);
        break;
      case 'surgeries':
        baseColor = isLight ? const Color(0xFFB71C1C) : const Color(0xFFFFCDD2);
        break;
      case 'illnesses':
        baseColor = isLight ? const Color(0xFF880E4F) : const Color(0xFFF8BBD9);
        break;
      case 'checkups':
        baseColor = isLight ? const Color(0xFF4A148C) : const Color(0xFFE1BEE7);
        break;
      case 'lab results':
        baseColor = isLight ? const Color(0xFFE65100) : const Color(0xFFFFE0B2);
        break;
      default:
        baseColor = isLight ? const Color(0xFF212121) : const Color(0xFFE0E0E0);
    }

    if (isLight) {
      return {
        // Selected state with improved contrast
        'selectedBackground': baseColor,
        'selectedBorder': baseColor,
        'selectedText': Colors.white,

        // Unselected state with enhanced visibility
        'unselectedBackground': Colors.white,
        'unselectedBorder': baseColor.withValues(alpha: 0.6),
        'unselectedText': baseColor,

        // Count badge colors with better contrast
        'selectedCountBackground': Colors.white.withValues(alpha: 0.3),
        'selectedCountBorder': Colors.white.withValues(alpha: 0.5),
        'selectedCountText': Colors.white,

        'unselectedCountBackground': baseColor.withValues(alpha: 0.15),
        'unselectedCountBorder': baseColor.withValues(alpha: 0.4),
        'unselectedCountText': baseColor,
      };
    } else {
      // Dark theme with enhanced contrast
      return {
        // Selected state with better visibility
        'selectedBackground': baseColor,
        'selectedBorder': baseColor,
        'selectedText': const Color(0xFF121212),

        // Unselected state
        'unselectedBackground': const Color(0xFF1E1E1E),
        'unselectedBorder': baseColor.withValues(alpha: 0.7),
        'unselectedText': baseColor,

        // Count badge colors
        'selectedCountBackground': const Color(
          0xFF121212,
        ).withValues(alpha: 0.4),
        'selectedCountBorder': const Color(0xFF121212).withValues(alpha: 0.6),
        'selectedCountText': const Color(0xFF121212),

        'unselectedCountBackground': baseColor.withValues(alpha: 0.25),
        'unselectedCountBorder': baseColor.withValues(alpha: 0.5),
        'unselectedCountText': baseColor,
      };
    }
  }

  String? _getFilterIcon(String filter) {
    switch (filter.toLowerCase()) {
      case 'all records':
        return 'view_list';
      case 'vaccinations':
        return 'vaccines';
      case 'medications':
        return 'medication';
      case 'surgeries':
        return 'local_hospital';
      case 'illnesses':
        return 'sick';
      case 'checkups':
        return 'health_and_safety';
      case 'lab results':
        return 'science';
      default:
        return null;
    }
  }
}
