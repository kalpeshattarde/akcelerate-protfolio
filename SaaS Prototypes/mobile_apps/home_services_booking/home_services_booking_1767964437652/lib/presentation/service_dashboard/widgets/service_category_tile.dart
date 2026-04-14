import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../core/design_constants.dart';
import '../../../widgets/custom_icon_widget.dart';

class ServiceCategoryTile extends StatefulWidget {
  final Map<String, dynamic> service;
  final VoidCallback? onTap;
  final VoidCallback? onLongPress;

  const ServiceCategoryTile({
    super.key,
    required this.service,
    this.onTap,
    this.onLongPress,
  });

  @override
  State<ServiceCategoryTile> createState() => _ServiceCategoryTileState();
}

class _ServiceCategoryTileState extends State<ServiceCategoryTile>
    with TickerProviderStateMixin {
  late AnimationController _scaleController;
  late AnimationController _shimmerController;
  late Animation<double> _scaleAnimation;
  late Animation<double> _shimmerAnimation;

  @override
  void initState() {
    super.initState();
    _scaleController = AnimationController(
        duration: const Duration(milliseconds: 150), vsync: this);
    _shimmerController = AnimationController(
        duration: const Duration(milliseconds: 1500), vsync: this);

    _scaleAnimation = Tween<double>(begin: 1.0, end: 0.95).animate(
        CurvedAnimation(parent: _scaleController, curve: Curves.easeInOut));

    _shimmerAnimation = Tween<double>(begin: -1.0, end: 1.0).animate(
        CurvedAnimation(parent: _shimmerController, curve: Curves.easeInOut));

    _shimmerController.repeat();
  }

  @override
  void dispose() {
    _scaleController.dispose();
    _shimmerController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final category = widget.service['category'] as String;

    return AnimatedBuilder(
        animation: _scaleAnimation,
        builder: (context, child) {
          return Transform.scale(
              scale: _scaleAnimation.value,
              child: GestureDetector(
                  onTap: () {
                    _scaleController.forward().then((_) {
                      _scaleController.reverse();
                    });
                    widget.onTap?.call();
                  },
                  onLongPress: widget.onLongPress,
                  onTapDown: (_) => _scaleController.forward(),
                  onTapUp: (_) => _scaleController.reverse(),
                  onTapCancel: () => _scaleController.reverse(),
                  child: Container(
                      height: 32.h,
                      margin: EdgeInsets.only(
                          bottom: ServiceCardDesign.cardMargin.h),
                      decoration:
                          ServiceCardDesign.generateCardDecoration(category),
                      child: Stack(children: [
                        // Shimmer effect with consistent styling
                        AnimatedBuilder(
                            animation: _shimmerAnimation,
                            builder: (context, child) {
                              return Container(
                                  decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(
                                          ServiceCardDesign.cornerRadius),
                                      gradient: LinearGradient(
                                          begin: Alignment(
                                              -1.0 + _shimmerAnimation.value,
                                              0.0),
                                          end: Alignment(
                                              1.0 + _shimmerAnimation.value,
                                              0.0),
                                          colors: [
                                            Colors.transparent,
                                            Colors.white.withAlpha(26),
                                            Colors.transparent,
                                          ])));
                            }),

                        // Content with consistent padding and spacing
                        Padding(
                            padding:
                                EdgeInsets.all(ServiceCardDesign.cardPadding.w),
                            child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  // Header row with consistent icon and badge styling
                                  Row(children: [
                                    Container(
                                        padding: EdgeInsets.all(2.w),
                                        decoration: ServiceCardDesign
                                            .generateButtonDecoration(
                                                backgroundColor: Colors.white),
                                        child: CustomIconWidget(
                                            iconName: widget.service['icon']
                                                as String,
                                            color: ServiceCardDesign
                                                .getLightButtonTextColor(
                                                    category),
                                            size: ServiceCardDesign
                                                .primaryIconSize)),
                                    const Spacer(),
                                    if (widget.service['isPopular'] == true)
                                      Container(
                                          padding: ServiceCardDesign
                                              .buttonPadding
                                              .copyWith(),
                                          decoration: ServiceCardDesign
                                              .generateButtonDecoration(
                                                  backgroundColor: Colors
                                                      .white),
                                          child: Text('Popular',
                                              style: theme.textTheme.labelSmall
                                                  ?.copyWith(
                                                      color: ServiceCardDesign
                                                          .getLightButtonTextColor(
                                                              category),
                                                      fontWeight:
                                                          FontWeight.w600,
                                                      fontSize: ServiceCardDesign
                                                          .captionFontSize))),
                                  ]),
                                  SizedBox(
                                      height: ServiceCardDesign.innerSpacing.h),

                                  // Service name with consistent typography
                                  Text(widget.service['name'] as String,
                                      style: theme.textTheme.titleMedium
                                          ?.copyWith(
                                              color: ServiceCardDesign
                                                  .getContrastingTextColor(
                                                      category),
                                              fontWeight: FontWeight.w700,
                                              fontSize: ServiceCardDesign
                                                  .titleFontSize),
                                      maxLines: 2,
                                      overflow: TextOverflow.ellipsis),
                                  SizedBox(height: 1.h),

                                  // Description with consistent color and spacing
                                  Text(widget.service['description'] as String,
                                      style: theme.textTheme.bodySmall
                                          ?.copyWith(
                                              color: ServiceCardDesign
                                                  .getSecondaryTextColor(
                                                      category),
                                              fontSize: ServiceCardDesign
                                                  .bodyFontSize,
                                              height: 1.4),
                                      maxLines: 2,
                                      overflow: TextOverflow.ellipsis),
                                  SizedBox(height: 1.5.h),

                                  // Price information with consistent styling
                                  Row(children: [
                                    Text('Starting at',
                                        style: theme.textTheme.bodySmall
                                            ?.copyWith(
                                                color: ServiceCardDesign
                                                    .getTertiaryTextColor(
                                                        category),
                                                fontSize: ServiceCardDesign
                                                    .bodyFontSize)),
                                    SizedBox(width: 1.w),
                                    Text(
                                        widget.service['startingPrice']
                                            as String,
                                        style: theme
                                            .textTheme.titleSmall
                                            ?.copyWith(
                                                color: ServiceCardDesign
                                                    .getContrastingTextColor(
                                                        category),
                                                fontWeight: FontWeight.w700,
                                                fontSize: ServiceCardDesign
                                                    .titleFontSize)),
                                  ]),
                                  SizedBox(height: 1.h),

                                  // Rating information with consistent icon and text styling
                                  Row(children: [
                                    CustomIconWidget(
                                        iconName: 'star',
                                        color: const Color(
                                            0xFFFBBF24), // Consistent star color across all cards
                                        size: ServiceCardDesign
                                            .secondaryIconSize),
                                    SizedBox(width: 1.w),
                                    Text(widget.service['rating'].toString(),
                                        style: theme.textTheme.bodySmall
                                            ?.copyWith(
                                                color: ServiceCardDesign
                                                    .getContrastingTextColor(
                                                        category),
                                                fontWeight: FontWeight.w600,
                                                fontSize: ServiceCardDesign
                                                    .bodyFontSize)),
                                    SizedBox(width: 1.w),
                                    Text('(${widget.service['reviewCount']})',
                                        style: theme.textTheme.bodySmall
                                            ?.copyWith(
                                                color: ServiceCardDesign
                                                    .getTertiaryTextColor(
                                                        category),
                                                fontSize: ServiceCardDesign
                                                    .bodyFontSize)),
                                  ]),

                                  // Spacer to maintain consistent layout
                                  const Spacer(),
                                ])),
                      ]))));
        });
  }
}
