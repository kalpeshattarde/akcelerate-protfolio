import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../widgets/custom_icon_widget.dart';

class PricingCalculatorWidget extends StatefulWidget {
  final Map<String, dynamic> selectedService;
  final List<String> selectedRooms;
  final List<String> selectedAddOns;

  const PricingCalculatorWidget({
    super.key,
    required this.selectedService,
    required this.selectedRooms,
    required this.selectedAddOns,
  });

  @override
  State<PricingCalculatorWidget> createState() =>
      _PricingCalculatorWidgetState();
}

class _PricingCalculatorWidgetState extends State<PricingCalculatorWidget>
    with TickerProviderStateMixin {
  late AnimationController _priceController;
  late Animation<double> _priceAnimation;

  double _previousTotal = 0;
  double _currentTotal = 0;

  final List<Map<String, dynamic>> _addOnPrices = [
    {'name': 'Deep Cleaning', 'price': 25},
    {'name': 'Window Cleaning', 'price': 15},
    {'name': 'Carpet Cleaning', 'price': 35},
    {'name': 'Refrigerator Cleaning', 'price': 20},
    {'name': 'Oven Cleaning', 'price': 30},
    {'name': 'Eco-Friendly Products', 'price': 10},
  ];

  @override
  void initState() {
    super.initState();
    _priceController = AnimationController(
      duration: const Duration(milliseconds: 800),
      vsync: this,
    );
    _priceAnimation = Tween<double>(
      begin: 0,
      end: 1,
    ).animate(CurvedAnimation(
      parent: _priceController,
      curve: Curves.easeInOut,
    ));

    _calculateTotal();
  }

  @override
  void didUpdateWidget(PricingCalculatorWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.selectedRooms != widget.selectedRooms ||
        oldWidget.selectedAddOns != widget.selectedAddOns) {
      _previousTotal = _currentTotal;
      _calculateTotal();
      _priceController.forward(from: 0);
    }
  }

  @override
  void dispose() {
    _priceController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Container(
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: colorScheme.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: colorScheme.outline.withValues(alpha: 0.2),
        ),
        boxShadow: [
          BoxShadow(
            color: colorScheme.shadow.withValues(alpha: 0.05),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Price Breakdown',
                style: theme.textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.w700,
                ),
              ),
              Container(
                padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
                decoration: BoxDecoration(
                  color: colorScheme.primary.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: CustomIconWidget(
                  iconName: 'calculate',
                  color: colorScheme.primary,
                  size: 5.w,
                ),
              ),
            ],
          ),
          SizedBox(height: 2.h),
          _buildPriceItem(
            'Base Service',
            _getBasePrice(),
            theme,
            colorScheme,
          ),
          if (widget.selectedRooms.isNotEmpty) ...[
            SizedBox(height: 1.h),
            _buildPriceItem(
              'Rooms (${widget.selectedRooms.length})',
              _getRoomPrice(),
              theme,
              colorScheme,
            ),
          ],
          if (widget.selectedAddOns.isNotEmpty) ...[
            SizedBox(height: 1.h),
            ...widget.selectedAddOns.map((addOn) {
              final price = _getAddOnPrice(addOn);
              return Padding(
                padding: EdgeInsets.only(bottom: 1.h),
                child: _buildPriceItem(
                  addOn,
                  price,
                  theme,
                  colorScheme,
                  isAddOn: true,
                ),
              );
            }),
          ],
          SizedBox(height: 2.h),
          Divider(
            color: colorScheme.outline.withValues(alpha: 0.3),
            thickness: 1,
          ),
          SizedBox(height: 1.h),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Total',
                style: theme.textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.w700,
                ),
              ),
              AnimatedBuilder(
                animation: _priceAnimation,
                builder: (context, child) {
                  final animatedValue = _previousTotal +
                      (_currentTotal - _previousTotal) * _priceAnimation.value;
                  return Text(
                    '\$${animatedValue.toStringAsFixed(2)}',
                    style: theme.textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.w700,
                      color: colorScheme.primary,
                    ),
                  );
                },
              ),
            ],
          ),
          SizedBox(height: 1.h),
          Container(
            padding: EdgeInsets.all(3.w),
            decoration: BoxDecoration(
              color: colorScheme.secondary.withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Row(
              children: [
                CustomIconWidget(
                  iconName: 'info',
                  color: colorScheme.secondary,
                  size: 5.w,
                ),
                SizedBox(width: 3.w),
                Expanded(
                  child: Text(
                    'Price includes all materials and equipment. Final price may vary based on actual service requirements.',
                    style: theme.textTheme.bodySmall?.copyWith(
                      color: colorScheme.onSurfaceVariant,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPriceItem(
    String label,
    double price,
    ThemeData theme,
    ColorScheme colorScheme, {
    bool isAddOn = false,
  }) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Expanded(
          child: Row(
            children: [
              if (isAddOn) ...[
                SizedBox(width: 4.w),
                CustomIconWidget(
                  iconName: 'add',
                  color: colorScheme.secondary,
                  size: 4.w,
                ),
                SizedBox(width: 2.w),
              ],
              Expanded(
                child: Text(
                  label,
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: colorScheme.onSurface,
                    fontWeight: isAddOn ? FontWeight.w500 : FontWeight.w400,
                  ),
                ),
              ),
            ],
          ),
        ),
        Text(
          '\$${price.toStringAsFixed(2)}',
          style: theme.textTheme.bodyMedium?.copyWith(
            color: isAddOn ? colorScheme.secondary : colorScheme.onSurface,
            fontWeight: FontWeight.w600,
          ),
        ),
      ],
    );
  }

  double _getBasePrice() {
    return (widget.selectedService['basePrice'] as num?)?.toDouble() ?? 50.0;
  }

  double _getRoomPrice() {
    const pricePerRoom = 15.0;
    return widget.selectedRooms.length * pricePerRoom;
  }

  double _getAddOnPrice(String addOnName) {
    final addOn = _addOnPrices.firstWhere(
      (addon) => addon['name'] == addOnName,
      orElse: () => {'price': 0},
    );
    return (addOn['price'] as num?)?.toDouble() ?? 0.0;
  }

  void _calculateTotal() {
    double total = _getBasePrice();
    total += _getRoomPrice();

    for (final addOn in widget.selectedAddOns) {
      total += _getAddOnPrice(addOn);
    }

    setState(() {
      _currentTotal = total;
    });
  }
}
