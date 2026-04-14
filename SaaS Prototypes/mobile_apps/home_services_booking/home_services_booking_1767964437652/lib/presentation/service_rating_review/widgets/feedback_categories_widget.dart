import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../../core/app_export.dart';
import '../../../widgets/custom_icon_widget.dart';

class FeedbackCategoriesWidget extends StatefulWidget {
  final List<String>? initialSelectedCategories;
  final ValueChanged<List<String>>? onCategoriesChanged;

  const FeedbackCategoriesWidget({
    super.key,
    this.initialSelectedCategories,
    this.onCategoriesChanged,
  });

  @override
  State<FeedbackCategoriesWidget> createState() =>
      _FeedbackCategoriesWidgetState();
}

class _FeedbackCategoriesWidgetState extends State<FeedbackCategoriesWidget>
    with TickerProviderStateMixin {
  late AnimationController _animationController;
  late List<AnimationController> _checkboxAnimationControllers;
  late List<Animation<double>> _checkboxAnimations;

  List<String> _selectedCategories = [];

  final List<Map<String, dynamic>> _feedbackCategories = [
    {
      'id': 'punctuality',
      'title': 'Punctuality',
      'description': 'Arrived on time',
      'icon': 'schedule',
    },
    {
      'id': 'professionalism',
      'title': 'Professionalism',
      'description': 'Courteous and respectful',
      'icon': 'business_center',
    },
    {
      'id': 'quality',
      'title': 'Quality',
      'description': 'Excellent work quality',
      'icon': 'star',
    },
    {
      'id': 'cleanliness',
      'title': 'Cleanliness',
      'description': 'Left area clean and tidy',
      'icon': 'cleaning_services',
    },
    {
      'id': 'communication',
      'title': 'Communication',
      'description': 'Clear and helpful communication',
      'icon': 'chat',
    },
    {
      'id': 'value',
      'title': 'Value for Money',
      'description': 'Fair pricing for service',
      'icon': 'attach_money',
    },
  ];

  @override
  void initState() {
    super.initState();
    _selectedCategories = widget.initialSelectedCategories ?? [];

    _animationController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );

    _checkboxAnimationControllers = List.generate(
      _feedbackCategories.length,
      (index) => AnimationController(
        duration: const Duration(milliseconds: 200),
        vsync: this,
      ),
    );

    _checkboxAnimations = _checkboxAnimationControllers.map((controller) {
      return Tween<double>(
        begin: 1.0,
        end: 1.2,
      ).animate(CurvedAnimation(
        parent: controller,
        curve: Curves.elasticOut,
      ));
    }).toList();
  }

  @override
  void dispose() {
    _animationController.dispose();
    for (final controller in _checkboxAnimationControllers) {
      controller.dispose();
    }
    super.dispose();
  }

  void _toggleCategory(String categoryId, int index) {
    setState(() {
      if (_selectedCategories.contains(categoryId)) {
        _selectedCategories.remove(categoryId);
      } else {
        _selectedCategories.add(categoryId);
      }
    });

    // Haptic feedback
    HapticFeedback.lightImpact();

    // Checkbox animation
    _checkboxAnimationControllers[index].forward().then((_) {
      _checkboxAnimationControllers[index].reverse();
    });

    widget.onCategoriesChanged?.call(_selectedCategories);
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'What did you like? (Optional)',
          style: GoogleFonts.inter(
            fontSize: 16.sp,
            fontWeight: FontWeight.w600,
            color: colorScheme.onSurface,
          ),
        ),
        SizedBox(height: 1.h),
        Text(
          'Select all that apply to help others know what to expect',
          style: GoogleFonts.inter(
            fontSize: 12.sp,
            fontWeight: FontWeight.w400,
            color: colorScheme.onSurfaceVariant,
          ),
        ),
        SizedBox(height: 2.h),

        // Categories grid
        GridView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 2,
            crossAxisSpacing: 3.w,
            mainAxisSpacing: 2.h,
            childAspectRatio: 3.5,
          ),
          itemCount: _feedbackCategories.length,
          itemBuilder: (context, index) {
            final category = _feedbackCategories[index];
            final categoryId = category['id'] as String;
            final isSelected = _selectedCategories.contains(categoryId);

            return AnimatedBuilder(
              animation: _checkboxAnimations[index],
              builder: (context, child) {
                return Transform.scale(
                  scale: isSelected ? _checkboxAnimations[index].value : 1.0,
                  child: GestureDetector(
                    onTap: () => _toggleCategory(categoryId, index),
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 200),
                      padding: EdgeInsets.all(3.w),
                      decoration: BoxDecoration(
                        color: isSelected
                            ? colorScheme.primary.withValues(alpha: 0.1)
                            : colorScheme.surface,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(
                          color: isSelected
                              ? colorScheme.primary
                              : colorScheme.outline.withValues(alpha: 0.3),
                          width: isSelected ? 2 : 1,
                        ),
                        boxShadow: isSelected
                            ? [
                                BoxShadow(
                                  color: colorScheme.primary
                                      .withValues(alpha: 0.1),
                                  blurRadius: 4,
                                  offset: const Offset(0, 2),
                                ),
                              ]
                            : null,
                      ),
                      child: Row(
                        children: [
                          // Checkbox with animation
                          AnimatedContainer(
                            duration: const Duration(milliseconds: 200),
                            width: 5.w,
                            height: 5.w,
                            decoration: BoxDecoration(
                              color: isSelected
                                  ? colorScheme.primary
                                  : Colors.transparent,
                              borderRadius: BorderRadius.circular(4),
                              border: Border.all(
                                color: isSelected
                                    ? colorScheme.primary
                                    : colorScheme.outline
                                        .withValues(alpha: 0.5),
                                width: 2,
                              ),
                            ),
                            child: isSelected
                                ? CustomIconWidget(
                                    iconName: 'check',
                                    color: colorScheme.onPrimary,
                                    size: 12,
                                  )
                                : null,
                          ),
                          SizedBox(width: 2.w),

                          // Icon
                          CustomIconWidget(
                            iconName: category['icon'] as String,
                            color: isSelected
                                ? colorScheme.primary
                                : colorScheme.onSurfaceVariant,
                            size: 20,
                          ),
                          SizedBox(width: 2.w),

                          // Text content
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Text(
                                  category['title'] as String,
                                  style: GoogleFonts.inter(
                                    fontSize: 12.sp,
                                    fontWeight: FontWeight.w600,
                                    color: isSelected
                                        ? colorScheme.primary
                                        : colorScheme.onSurface,
                                  ),
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                ),
                                Text(
                                  category['description'] as String,
                                  style: GoogleFonts.inter(
                                    fontSize: 10.sp,
                                    fontWeight: FontWeight.w400,
                                    color: isSelected
                                        ? colorScheme.primary
                                            .withValues(alpha: 0.8)
                                        : colorScheme.onSurfaceVariant,
                                  ),
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                );
              },
            );
          },
        ),

        // Selected count
        if (_selectedCategories.isNotEmpty) ...[
          SizedBox(height: 2.h),
          Container(
            padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
            decoration: BoxDecoration(
              color: colorScheme.primary.withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(16),
            ),
            child: Text(
              '${_selectedCategories.length} ${_selectedCategories.length == 1 ? 'category' : 'categories'} selected',
              style: GoogleFonts.inter(
                fontSize: 12.sp,
                fontWeight: FontWeight.w500,
                color: colorScheme.primary,
              ),
            ),
          ),
        ],
      ],
    );
  }
}