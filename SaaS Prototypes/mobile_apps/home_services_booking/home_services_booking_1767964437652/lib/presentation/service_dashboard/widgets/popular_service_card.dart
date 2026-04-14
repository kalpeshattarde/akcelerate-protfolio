import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../core/design_constants.dart';
import '../../../widgets/custom_icon_widget.dart';

class PopularServiceCard extends StatefulWidget {
  final Map<String, dynamic> service;
  final VoidCallback? onTap;
  final VoidCallback? onQuickBook;

  const PopularServiceCard({
    super.key,
    required this.service,
    this.onTap,
    this.onQuickBook,
  });

  @override
  State<PopularServiceCard> createState() => _PopularServiceCardState();
}

class _PopularServiceCardState extends State<PopularServiceCard>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
        duration: const Duration(milliseconds: 200), vsync: this);
    _scaleAnimation = Tween<double>(begin: 1.0, end: 0.95).animate(
        CurvedAnimation(parent: _animationController, curve: Curves.easeInOut));
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    final category = widget.service['category'] as String;

    return AnimatedBuilder(
      animation: _scaleAnimation,
      builder: (context, child) {
        return Transform.scale(
          scale: _scaleAnimation.value,
          child: GestureDetector(
            onTap: () {
              _animationController.forward().then((_) {
                _animationController.reverse();
              });
              widget.onTap?.call();
            },
            onTapDown: (_) => _animationController.forward(),
            onTapUp: (_) => _animationController.reverse(),
            onTapCancel: () => _animationController.reverse(),
            child: Container(
              width: 70.w,
              margin: EdgeInsets.only(right: ServiceCardDesign.cardPadding.w),
              decoration: BoxDecoration(
                color: colorScheme.surface,
                borderRadius:
                    BorderRadius.circular(ServiceCardDesign.cornerRadius),
                boxShadow: [
                  BoxShadow(
                    color: colorScheme.shadow
                        .withOpacity(ServiceCardDesign.shadowOpacity),
                    blurRadius: ServiceCardDesign.shadowBlurRadius,
                    offset: ServiceCardDesign.shadowOffset,
                  ),
                ],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Provider header with consistent gradient and styling
                  Container(
                    height: 12.h,
                    decoration: BoxDecoration(
                      borderRadius: const BorderRadius.vertical(
                        top: Radius.circular(ServiceCardDesign.cornerRadius),
                      ),
                      gradient:
                          ServiceCardDesign.generateCardGradient(category),
                    ),
                    child: Stack(
                      children: [
                        Positioned(
                          top: 2.h,
                          left: ServiceCardDesign.cardPadding.w,
                          child: Row(
                            children: [
                              CircleAvatar(
                                radius: 3.h,
                                backgroundImage: NetworkImage(
                                  widget.service['providerAvatar'] as String,
                                ),
                              ),
                              SizedBox(width: 3.w),
                              // Reduced width constraint to prevent overlap with category button
                              SizedBox(
                                width: 28
                                    .w, // Reduced from 32.w to 28.w to provide more space
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      widget.service['providerName'] as String,
                                      style:
                                          theme.textTheme.titleSmall?.copyWith(
                                        color: ServiceCardDesign
                                            .getContrastingTextColor(category),
                                        fontWeight: FontWeight.w600,
                                        fontSize:
                                            ServiceCardDesign.titleFontSize,
                                      ),
                                      maxLines: 1,
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                    SizedBox(height: 0.5.h),
                                    Row(
                                      children: [
                                        CustomIconWidget(
                                          iconName: 'star',
                                          color: const Color(0xFFFBBF24),
                                          size: ServiceCardDesign.smallIconSize,
                                        ),
                                        SizedBox(width: 1.w),
                                        Expanded(
                                          child: Text(
                                            '${widget.service['providerRating']} • ${widget.service['completedJobs']} jobs',
                                            style: theme.textTheme.bodySmall
                                                ?.copyWith(
                                              color: ServiceCardDesign
                                                  .getContrastingTextColor(
                                                      category),
                                              fontWeight: FontWeight.w500,
                                              fontSize: ServiceCardDesign
                                                  .bodyFontSize,
                                            ),
                                            maxLines: 1,
                                            overflow: TextOverflow.ellipsis,
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
                        Positioned(
                          top: 2.h,
                          right: ServiceCardDesign.cardPadding.w,
                          // Add minimum left constraint to prevent overlap with profile info
                          left: 45
                              .w, // Ensure button doesn't start before 45% of card width
                          child: Container(
                            padding: ServiceCardDesign.buttonPadding,
                            decoration:
                                ServiceCardDesign.generateButtonDecoration(
                              backgroundColor: Colors.white,
                            ),
                            child: Text(
                              category,
                              style: theme.textTheme.labelSmall?.copyWith(
                                color:
                                    ServiceCardDesign.getLightButtonTextColor(
                                        category),
                                fontWeight: FontWeight.w600,
                                fontSize: ServiceCardDesign.captionFontSize,
                              ),
                              maxLines: 1, // Prevent text wrapping
                              overflow: TextOverflow
                                  .ellipsis, // Handle overflow gracefully
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),

                  // Service details with improved responsive button layout
                  Padding(
                    padding: EdgeInsets.all(ServiceCardDesign.cardPadding.w),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          widget.service['serviceName'] as String,
                          style: theme.textTheme.titleMedium?.copyWith(
                            fontWeight: FontWeight.w600,
                            fontSize: ServiceCardDesign.titleFontSize,
                          ),
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                        ),
                        SizedBox(height: 1.h),
                        Text(
                          widget.service['description'] as String,
                          style: theme.textTheme.bodySmall?.copyWith(
                            color: colorScheme.onSurfaceVariant,
                            fontSize: ServiceCardDesign.bodyFontSize,
                            height: 1.4,
                          ),
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                        ),
                        SizedBox(height: ServiceCardDesign.innerSpacing.h),

                        // Duration and price row with consistent styling
                        Row(
                          children: [
                            CustomIconWidget(
                              iconName: 'access_time',
                              color: colorScheme.onSurfaceVariant,
                              size: ServiceCardDesign.secondaryIconSize,
                            ),
                            SizedBox(width: 1.w),
                            Text(
                              widget.service['duration'] as String,
                              style: theme.textTheme.bodySmall?.copyWith(
                                color: colorScheme.onSurfaceVariant,
                                fontSize: ServiceCardDesign.bodyFontSize,
                              ),
                            ),
                            const Spacer(),
                            Text(
                              widget.service['price'] as String,
                              style: theme.textTheme.titleSmall?.copyWith(
                                color: ServiceCardDesign.getServicePrimaryColor(
                                    category),
                                fontWeight: FontWeight.w700,
                                fontSize: ServiceCardDesign.titleFontSize,
                              ),
                            ),
                          ],
                        ),
                        SizedBox(height: ServiceCardDesign.innerSpacing.h),

                        // Responsive button layout with proper spacing and visibility
                        LayoutBuilder(
                          builder: (context, constraints) {
                            // Check available width for responsive layout
                            final availableWidth = constraints.maxWidth;
                            final isSmallScreen = availableWidth < 280;

                            if (isSmallScreen) {
                              // Stack buttons vertically on smaller screens
                              return Column(
                                crossAxisAlignment: CrossAxisAlignment.stretch,
                                children: [
                                  // View Details Button (Full Width)
                                  SizedBox(
                                    height: ServiceCardDesign.buttonHeight,
                                    child: OutlinedButton(
                                      onPressed: widget.onTap,
                                      style: OutlinedButton.styleFrom(
                                        padding: EdgeInsets.symmetric(
                                          horizontal: 4.w,
                                          vertical: 1.2.h,
                                        ),
                                        shape: RoundedRectangleBorder(
                                          borderRadius: BorderRadius.circular(
                                            ServiceCardDesign
                                                .buttonBorderRadius,
                                          ),
                                        ),
                                        side: BorderSide(
                                          color: ServiceCardDesign
                                              .getServicePrimaryColor(category),
                                          width: 1.5,
                                        ),
                                        backgroundColor: Colors.transparent,
                                        foregroundColor: ServiceCardDesign
                                            .getServicePrimaryColor(category),
                                      ),
                                      child: Text(
                                        'View Details',
                                        style: theme.textTheme.labelMedium
                                            ?.copyWith(
                                          fontWeight: FontWeight.w600,
                                          fontSize:
                                              ServiceCardDesign.buttonFontSize,
                                          color: ServiceCardDesign
                                              .getServicePrimaryColor(category),
                                        ),
                                        overflow: TextOverflow.ellipsis,
                                      ),
                                    ),
                                  ),
                                  SizedBox(height: 1.5.h),
                                  // Quick Book Button (Full Width)
                                  SizedBox(
                                    height: ServiceCardDesign.buttonHeight,
                                    child: ElevatedButton(
                                      onPressed: widget.onQuickBook,
                                      style: ElevatedButton.styleFrom(
                                        backgroundColor: ServiceCardDesign
                                            .getServicePrimaryColor(category),
                                        foregroundColor: ServiceCardDesign
                                            .getContrastingTextColor(category),
                                        padding: EdgeInsets.symmetric(
                                          horizontal: 4.w,
                                          vertical: 1.2.h,
                                        ),
                                        shape: RoundedRectangleBorder(
                                          borderRadius: BorderRadius.circular(
                                            ServiceCardDesign
                                                .buttonBorderRadius,
                                          ),
                                        ),
                                        elevation: 2,
                                        shadowColor: ServiceCardDesign
                                                .getServicePrimaryColor(
                                                    category)
                                            .withAlpha(77),
                                      ),
                                      child: Text(
                                        'Quick Book',
                                        style: theme.textTheme.labelMedium
                                            ?.copyWith(
                                          color: ServiceCardDesign
                                              .getContrastingTextColor(
                                                  category),
                                          fontWeight: FontWeight.w600,
                                          fontSize:
                                              ServiceCardDesign.buttonFontSize,
                                        ),
                                        overflow: TextOverflow.ellipsis,
                                      ),
                                    ),
                                  ),
                                ],
                              );
                            } else {
                              // Horizontal layout for larger screens
                              return Row(
                                children: [
                                  // View Details Button (Equal Width)
                                  Expanded(
                                    child: SizedBox(
                                      height: ServiceCardDesign.buttonHeight,
                                      child: OutlinedButton(
                                        onPressed: widget.onTap,
                                        style: OutlinedButton.styleFrom(
                                          padding: EdgeInsets.symmetric(
                                            horizontal: 2.w,
                                            vertical: 1.2.h,
                                          ),
                                          shape: RoundedRectangleBorder(
                                            borderRadius: BorderRadius.circular(
                                              ServiceCardDesign
                                                  .buttonBorderRadius,
                                            ),
                                          ),
                                          side: BorderSide(
                                            color: ServiceCardDesign
                                                .getServicePrimaryColor(
                                                    category),
                                            width: 1.5,
                                          ),
                                          backgroundColor: Colors.transparent,
                                          foregroundColor: ServiceCardDesign
                                              .getServicePrimaryColor(category),
                                        ),
                                        child: FittedBox(
                                          fit: BoxFit.scaleDown,
                                          child: Text(
                                            'View Details',
                                            style: theme.textTheme.labelMedium
                                                ?.copyWith(
                                              fontWeight: FontWeight.w600,
                                              fontSize: ServiceCardDesign
                                                  .buttonFontSize,
                                              color: ServiceCardDesign
                                                  .getServicePrimaryColor(
                                                      category),
                                            ),
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                  SizedBox(width: 2.w),
                                  // Quick Book Button (Equal Width)
                                  Expanded(
                                    child: SizedBox(
                                      height: ServiceCardDesign.buttonHeight,
                                      child: ElevatedButton(
                                        onPressed: widget.onQuickBook,
                                        style: ElevatedButton.styleFrom(
                                          backgroundColor: ServiceCardDesign
                                              .getServicePrimaryColor(category),
                                          foregroundColor: ServiceCardDesign
                                              .getContrastingTextColor(
                                                  category),
                                          padding: EdgeInsets.symmetric(
                                            horizontal: 2.w,
                                            vertical: 1.2.h,
                                          ),
                                          shape: RoundedRectangleBorder(
                                            borderRadius: BorderRadius.circular(
                                              ServiceCardDesign
                                                  .buttonBorderRadius,
                                            ),
                                          ),
                                          elevation: 2,
                                          shadowColor: ServiceCardDesign
                                                  .getServicePrimaryColor(
                                                      category)
                                              .withAlpha(77),
                                        ),
                                        child: FittedBox(
                                          fit: BoxFit.scaleDown,
                                          child: Text(
                                            'Quick Book',
                                            style: theme.textTheme.labelMedium
                                                ?.copyWith(
                                              color: ServiceCardDesign
                                                  .getContrastingTextColor(
                                                      category),
                                              fontWeight: FontWeight.w600,
                                              fontSize: ServiceCardDesign
                                                  .buttonFontSize,
                                            ),
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                ],
                              );
                            }
                          },
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
  }
}
