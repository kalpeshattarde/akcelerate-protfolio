import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../widgets/custom_icon_widget.dart';

class ServiceCustomizationWidget extends StatefulWidget {
  final List<String> selectedAddOns;
  final Function(List<String>) onAddOnsChanged;

  const ServiceCustomizationWidget({
    super.key,
    required this.selectedAddOns,
    required this.onAddOnsChanged,
  });

  @override
  State<ServiceCustomizationWidget> createState() =>
      _ServiceCustomizationWidgetState();
}

class _ServiceCustomizationWidgetState extends State<ServiceCustomizationWidget>
    with TickerProviderStateMixin {
  late AnimationController _expansionController;
  late Animation<double> _expansionAnimation;

  final List<Map<String, dynamic>> _addOns = [
    {
      'name': 'Deep Cleaning',
      'description':
          'Thorough cleaning including baseboards, light fixtures, and inside appliances',
      'price': 25,
      'icon': 'cleaning_services',
      'popular': true,
    },
    {
      'name': 'Window Cleaning',
      'description':
          'Interior and exterior window cleaning for crystal clear views',
      'price': 15,
      'icon': 'window',
      'popular': false,
    },
    {
      'name': 'Carpet Cleaning',
      'description': 'Professional steam cleaning for carpets and rugs',
      'price': 35,
      'icon': 'carpet',
      'popular': true,
    },
    {
      'name': 'Refrigerator Cleaning',
      'description': 'Complete interior and exterior refrigerator cleaning',
      'price': 20,
      'icon': 'kitchen',
      'popular': false,
    },
    {
      'name': 'Oven Cleaning',
      'description': 'Deep cleaning of oven interior, racks, and glass door',
      'price': 30,
      'icon': 'microwave',
      'popular': false,
    },
    {
      'name': 'Eco-Friendly Products',
      'description':
          'Use only environmentally safe and non-toxic cleaning products',
      'price': 10,
      'icon': 'eco',
      'popular': true,
    },
  ];

  @override
  void initState() {
    super.initState();
    _expansionController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );
    _expansionAnimation = CurvedAnimation(
      parent: _expansionController,
      curve: Curves.easeInOut,
    );
  }

  @override
  void dispose() {
    _expansionController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Container(
      padding: EdgeInsets.all(4.w),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Service Add-ons',
                style: theme.textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.w700,
                ),
              ),
              if (widget.selectedAddOns.isNotEmpty)
                Container(
                  padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
                  decoration: BoxDecoration(
                    color: colorScheme.secondary.withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Text(
                    '+\$${_calculateAddOnTotal()}',
                    style: theme.textTheme.labelMedium?.copyWith(
                      color: colorScheme.secondary,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ),
            ],
          ),
          SizedBox(height: 2.h),
          ListView.separated(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: _addOns.length,
            separatorBuilder: (context, index) => SizedBox(height: 1.h),
            itemBuilder: (context, index) {
              final addOn = _addOns[index];
              final addOnName = addOn['name'] as String;
              final isSelected = widget.selectedAddOns.contains(addOnName);
              final isPopular = addOn['popular'] as bool;

              return AnimatedContainer(
                duration: const Duration(milliseconds: 200),
                decoration: BoxDecoration(
                  color: isSelected
                      ? colorScheme.primary.withValues(alpha: 0.05)
                      : colorScheme.surface,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(
                    color: isSelected
                        ? colorScheme.primary
                        : colorScheme.outline.withValues(alpha: 0.2),
                    width: isSelected ? 2 : 1,
                  ),
                ),
                child: InkWell(
                  onTap: () => _toggleAddOn(addOnName),
                  borderRadius: BorderRadius.circular(12),
                  child: Padding(
                    padding: EdgeInsets.all(4.w),
                    child: Row(
                      children: [
                        Container(
                          width: 12.w,
                          height: 12.w,
                          decoration: BoxDecoration(
                            color: isSelected
                                ? colorScheme.primary
                                : colorScheme.outline.withValues(alpha: 0.1),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: CustomIconWidget(
                            iconName: addOn['icon'] as String,
                            color: isSelected
                                ? colorScheme.onPrimary
                                : colorScheme.onSurfaceVariant,
                            size: 6.w,
                          ),
                        ),
                        SizedBox(width: 4.w),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                children: [
                                  Expanded(
                                    child: Text(
                                      addOnName,
                                      style:
                                          theme.textTheme.titleMedium?.copyWith(
                                        fontWeight: FontWeight.w600,
                                        color: isSelected
                                            ? colorScheme.primary
                                            : colorScheme.onSurface,
                                      ),
                                    ),
                                  ),
                                  if (isPopular)
                                    Container(
                                      padding: EdgeInsets.symmetric(
                                        horizontal: 2.w,
                                        vertical: 0.5.h,
                                      ),
                                      decoration: BoxDecoration(
                                        color: colorScheme.tertiary,
                                        borderRadius: BorderRadius.circular(12),
                                      ),
                                      child: Text(
                                        'Popular',
                                        style: theme.textTheme.labelSmall
                                            ?.copyWith(
                                          color: colorScheme.onTertiary,
                                          fontWeight: FontWeight.w600,
                                        ),
                                      ),
                                    ),
                                ],
                              ),
                              SizedBox(height: 0.5.h),
                              Text(
                                addOn['description'] as String,
                                style: theme.textTheme.bodySmall?.copyWith(
                                  color: colorScheme.onSurfaceVariant,
                                ),
                                maxLines: 2,
                                overflow: TextOverflow.ellipsis,
                              ),
                            ],
                          ),
                        ),
                        SizedBox(width: 2.w),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.end,
                          children: [
                            Text(
                              '+\$${addOn['price']}',
                              style: theme.textTheme.titleMedium?.copyWith(
                                fontWeight: FontWeight.w700,
                                color: isSelected
                                    ? colorScheme.primary
                                    : colorScheme.onSurface,
                              ),
                            ),
                            SizedBox(height: 1.h),
                            AnimatedContainer(
                              duration: const Duration(milliseconds: 200),
                              width: 5.w,
                              height: 5.w,
                              decoration: BoxDecoration(
                                color: isSelected
                                    ? colorScheme.primary
                                    : Colors.transparent,
                                border: Border.all(
                                  color: isSelected
                                      ? colorScheme.primary
                                      : colorScheme.outline,
                                  width: 2,
                                ),
                                borderRadius: BorderRadius.circular(4),
                              ),
                              child: isSelected
                                  ? CustomIconWidget(
                                      iconName: 'check',
                                      color: colorScheme.onPrimary,
                                      size: 3.w,
                                    )
                                  : null,
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
              );
            },
          ),
        ],
      ),
    );
  }

  void _toggleAddOn(String addOnName) {
    final updatedAddOns = List<String>.from(widget.selectedAddOns);

    if (updatedAddOns.contains(addOnName)) {
      updatedAddOns.remove(addOnName);
    } else {
      updatedAddOns.add(addOnName);
    }

    widget.onAddOnsChanged(updatedAddOns);
  }

  int _calculateAddOnTotal() {
    int total = 0;
    for (final addOnName in widget.selectedAddOns) {
      final addOn = _addOns.firstWhere(
        (addon) => addon['name'] == addOnName,
        orElse: () => {'price': 0},
      );
      total += (addOn['price'] as int? ?? 0);
    }
    return total;
  }
}
