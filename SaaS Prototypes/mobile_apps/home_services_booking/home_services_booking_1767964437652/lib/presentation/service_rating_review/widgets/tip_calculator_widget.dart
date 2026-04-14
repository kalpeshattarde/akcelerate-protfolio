import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';
import 'package:google_fonts/google_fonts.dart';


class TipCalculatorWidget extends StatefulWidget {
  final double serviceAmount;
  final ValueChanged<double>? onTipChanged;
  final double? initialTip;

  const TipCalculatorWidget({
    super.key,
    required this.serviceAmount,
    this.onTipChanged,
    this.initialTip,
  });

  @override
  State<TipCalculatorWidget> createState() => _TipCalculatorWidgetState();
}

class _TipCalculatorWidgetState extends State<TipCalculatorWidget>
    with TickerProviderStateMixin {
  late TextEditingController _customAmountController;
  late AnimationController _valueAnimationController;
  late Animation<double> _valueAnimation;

  double _selectedTipAmount = 0.0;
  int _selectedPercentageIndex = -1;
  bool _isCustomAmount = false;

  final List<int> _tipPercentages = [15, 18, 20];

  @override
  void initState() {
    super.initState();
    _customAmountController = TextEditingController();
    _selectedTipAmount = widget.initialTip ?? 0.0;

    _valueAnimationController = AnimationController(
      duration: const Duration(milliseconds: 400),
      vsync: this,
    );

    _valueAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _valueAnimationController,
      curve: Curves.elasticOut,
    ));

    // Initialize selected percentage if initial tip matches
    if (widget.initialTip != null && widget.initialTip! > 0) {
      for (int i = 0; i < _tipPercentages.length; i++) {
        final percentageAmount =
            widget.serviceAmount * (_tipPercentages[i] / 100);
        if ((percentageAmount - widget.initialTip!).abs() < 0.01) {
          _selectedPercentageIndex = i;
          break;
        }
      }
      if (_selectedPercentageIndex == -1) {
        _isCustomAmount = true;
        _customAmountController.text = widget.initialTip!.toStringAsFixed(2);
      }
    }

    _customAmountController.addListener(() {
      if (_isCustomAmount) {
        final value = double.tryParse(_customAmountController.text) ?? 0.0;
        _updateTipAmount(value);
      }
    });
  }

  @override
  void dispose() {
    _customAmountController.dispose();
    _valueAnimationController.dispose();
    super.dispose();
  }

  void _updateTipAmount(double amount) {
    setState(() {
      _selectedTipAmount = amount;
    });

    _valueAnimationController.forward().then((_) {
      _valueAnimationController.reverse();
    });

    widget.onTipChanged?.call(amount);
  }

  void _selectPercentage(int index) {
    final percentage = _tipPercentages[index];
    final amount = widget.serviceAmount * (percentage / 100);

    setState(() {
      _selectedPercentageIndex = index;
      _isCustomAmount = false;
      _customAmountController.clear();
    });

    HapticFeedback.lightImpact();
    _updateTipAmount(amount);
  }

  void _selectCustomAmount() {
    setState(() {
      _selectedPercentageIndex = -1;
      _isCustomAmount = true;
    });

    // Focus on custom amount field
    WidgetsBinding.instance.addPostFrameCallback((_) {
      FocusScope.of(context).requestFocus(FocusNode());
    });
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    final totalAmount = widget.serviceAmount + _selectedTipAmount;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Add Tip (Optional)',
          style: GoogleFonts.inter(
            fontSize: 16.sp,
            fontWeight: FontWeight.w600,
            color: colorScheme.onSurface,
          ),
        ),
        SizedBox(height: 1.h),
        Text(
          'Show appreciation for excellent service',
          style: GoogleFonts.inter(
            fontSize: 12.sp,
            fontWeight: FontWeight.w400,
            color: colorScheme.onSurfaceVariant,
          ),
        ),
        SizedBox(height: 2.h),

        // Service amount display
        Container(
          padding: EdgeInsets.all(4.w),
          decoration: BoxDecoration(
            color: colorScheme.surfaceContainerHighest.withValues(alpha: 0.5),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Service Amount:',
                style: GoogleFonts.inter(
                  fontSize: 14.sp,
                  fontWeight: FontWeight.w500,
                  color: colorScheme.onSurfaceVariant,
                ),
              ),
              Text(
                '\$${widget.serviceAmount.toStringAsFixed(2)}',
                style: GoogleFonts.inter(
                  fontSize: 14.sp,
                  fontWeight: FontWeight.w600,
                  color: colorScheme.onSurface,
                ),
              ),
            ],
          ),
        ),
        SizedBox(height: 2.h),

        // Percentage buttons
        Row(
          children: _tipPercentages.asMap().entries.map((entry) {
            final index = entry.key;
            final percentage = entry.value;
            final isSelected = _selectedPercentageIndex == index;
            final amount = widget.serviceAmount * (percentage / 100);

            return Expanded(
              child: Padding(
                padding: EdgeInsets.only(
                    right: index < _tipPercentages.length - 1 ? 2.w : 0),
                child: GestureDetector(
                  onTap: () => _selectPercentage(index),
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 200),
                    padding: EdgeInsets.symmetric(vertical: 3.h),
                    decoration: BoxDecoration(
                      color: isSelected
                          ? colorScheme.primary
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
                                color:
                                    colorScheme.primary.withValues(alpha: 0.2),
                                blurRadius: 8,
                                offset: const Offset(0, 2),
                              ),
                            ]
                          : null,
                    ),
                    child: Column(
                      children: [
                        Text(
                          '$percentage%',
                          style: GoogleFonts.inter(
                            fontSize: 16.sp,
                            fontWeight: FontWeight.w600,
                            color: isSelected
                                ? colorScheme.onPrimary
                                : colorScheme.onSurface,
                          ),
                        ),
                        SizedBox(height: 0.5.h),
                        Text(
                          '\$${amount.toStringAsFixed(2)}',
                          style: GoogleFonts.inter(
                            fontSize: 12.sp,
                            fontWeight: FontWeight.w400,
                            color: isSelected
                                ? colorScheme.onPrimary.withValues(alpha: 0.8)
                                : colorScheme.onSurfaceVariant,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            );
          }).toList(),
        ),
        SizedBox(height: 2.h),

        // Custom amount option
        GestureDetector(
          onTap: _selectCustomAmount,
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 200),
            padding: EdgeInsets.all(4.w),
            decoration: BoxDecoration(
              color: _isCustomAmount
                  ? colorScheme.primary.withValues(alpha: 0.1)
                  : colorScheme.surface,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(
                color: _isCustomAmount
                    ? colorScheme.primary
                    : colorScheme.outline.withValues(alpha: 0.3),
                width: _isCustomAmount ? 2 : 1,
              ),
            ),
            child: Row(
              children: [
                Expanded(
                  child: Text(
                    'Custom Amount',
                    style: GoogleFonts.inter(
                      fontSize: 14.sp,
                      fontWeight: FontWeight.w500,
                      color: _isCustomAmount
                          ? colorScheme.primary
                          : colorScheme.onSurface,
                    ),
                  ),
                ),
                SizedBox(
                  width: 25.w,
                  child: TextField(
                    controller: _customAmountController,
                    enabled: _isCustomAmount,
                    keyboardType:
                        const TextInputType.numberWithOptions(decimal: true),
                    inputFormatters: [
                      FilteringTextInputFormatter.allow(
                          RegExp(r'^\d*\.?\d{0,2}')),
                    ],
                    decoration: InputDecoration(
                      hintText: '\$0.00',
                      hintStyle: GoogleFonts.inter(
                        fontSize: 14.sp,
                        fontWeight: FontWeight.w400,
                        color: colorScheme.onSurfaceVariant,
                      ),
                      border: InputBorder.none,
                      contentPadding: EdgeInsets.symmetric(horizontal: 2.w),
                    ),
                    style: GoogleFonts.inter(
                      fontSize: 14.sp,
                      fontWeight: FontWeight.w600,
                      color: colorScheme.onSurface,
                    ),
                    textAlign: TextAlign.right,
                  ),
                ),
              ],
            ),
          ),
        ),

        // Total amount display
        if (_selectedTipAmount > 0) ...[
          SizedBox(height: 2.h),
          AnimatedBuilder(
            animation: _valueAnimation,
            builder: (context, child) {
              return Transform.scale(
                scale: 1.0 + (_valueAnimation.value * 0.05),
                child: Container(
                  padding: EdgeInsets.all(4.w),
                  decoration: BoxDecoration(
                    color: colorScheme.primary.withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(
                      color: colorScheme.primary.withValues(alpha: 0.3),
                      width: 1,
                    ),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Total Amount:',
                            style: GoogleFonts.inter(
                              fontSize: 14.sp,
                              fontWeight: FontWeight.w500,
                              color: colorScheme.primary,
                            ),
                          ),
                          Text(
                            'Tip: \$${_selectedTipAmount.toStringAsFixed(2)}',
                            style: GoogleFonts.inter(
                              fontSize: 12.sp,
                              fontWeight: FontWeight.w400,
                              color: colorScheme.onSurfaceVariant,
                            ),
                          ),
                        ],
                      ),
                      Text(
                        '\$${totalAmount.toStringAsFixed(2)}',
                        style: GoogleFonts.inter(
                          fontSize: 18.sp,
                          fontWeight: FontWeight.w700,
                          color: colorScheme.primary,
                        ),
                      ),
                    ],
                  ),
                ),
              );
            },
          ),
        ],
      ],
    );
  }
}