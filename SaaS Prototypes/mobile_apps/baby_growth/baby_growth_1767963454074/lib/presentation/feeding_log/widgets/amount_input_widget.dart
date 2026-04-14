import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../theme/app_theme.dart';

class AmountInputWidget extends StatefulWidget {
  final double amount;
  final Function(double) onAmountChanged;
  final String unit;
  final Function(String) onUnitChanged;
  final bool showSlider;

  const AmountInputWidget({
    Key? key,
    required this.amount,
    required this.onAmountChanged,
    required this.unit,
    required this.onUnitChanged,
    this.showSlider = true,
  }) : super(key: key);

  @override
  State<AmountInputWidget> createState() => _AmountInputWidgetState();
}

class _AmountInputWidgetState extends State<AmountInputWidget> {
  late TextEditingController _textController;
  bool _isUsingSlider = true;

  @override
  void initState() {
    super.initState();
    _textController = TextEditingController(
      text: widget.amount > 0 ? widget.amount.toStringAsFixed(1) : '',
    );
  }

  @override
  void dispose() {
    _textController.dispose();
    super.dispose();
  }

  @override
  void didUpdateWidget(AmountInputWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.amount != widget.amount && _isUsingSlider) {
      _textController.text =
          widget.amount > 0 ? widget.amount.toStringAsFixed(1) : '';
    }
  }

  void _onSliderChanged(double value) {
    setState(() {
      _isUsingSlider = true;
    });
    widget.onAmountChanged(value);
  }

  void _onTextChanged(String value) {
    setState(() {
      _isUsingSlider = false;
    });
    final double? parsedValue = double.tryParse(value);
    if (parsedValue != null && parsedValue >= 0) {
      widget.onAmountChanged(parsedValue);
    }
  }

  double get _maxAmount => widget.unit == 'oz' ? 12.0 : 350.0;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.all(4.w),
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: AppTheme.lightTheme.colorScheme.shadow,
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
                'Amount',
                style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
              _buildUnitToggle(),
            ],
          ),
          SizedBox(height: 2.h),
          Row(
            children: [
              Expanded(
                flex: 2,
                child: _buildAmountDisplay(),
              ),
              SizedBox(width: 4.w),
              Expanded(
                flex: 3,
                child: _buildTextInput(),
              ),
            ],
          ),
          if (widget.showSlider) ...[
            SizedBox(height: 2.h),
            _buildSlider(),
          ],
          SizedBox(height: 2.h),
          _buildQuickAmountButtons(),
        ],
      ),
    );
  }

  Widget _buildUnitToggle() {
    return Container(
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.outline.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          _buildUnitButton('oz'),
          _buildUnitButton('ml'),
        ],
      ),
    );
  }

  Widget _buildUnitButton(String unit) {
    final bool isSelected = widget.unit == unit;

    return GestureDetector(
      onTap: () => widget.onUnitChanged(unit),
      child: Container(
        padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
        decoration: BoxDecoration(
          color: isSelected
              ? AppTheme.lightTheme.colorScheme.primary
              : Colors.transparent,
          borderRadius: BorderRadius.circular(6),
        ),
        child: Text(
          unit,
          style: AppTheme.lightTheme.textTheme.labelMedium?.copyWith(
            color: isSelected
                ? Colors.white
                : AppTheme.lightTheme.colorScheme.onSurface,
            fontWeight: FontWeight.w500,
          ),
        ),
      ),
    );
  }

  Widget _buildAmountDisplay() {
    return Container(
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.primary.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: AppTheme.lightTheme.colorScheme.primary,
          width: 1,
        ),
      ),
      child: Column(
        children: [
          Text(
            widget.amount.toStringAsFixed(1),
            style: AppTheme.lightTheme.textTheme.headlineMedium?.copyWith(
              color: AppTheme.lightTheme.colorScheme.primary,
              fontWeight: FontWeight.bold,
            ),
          ),
          Text(
            widget.unit,
            style: AppTheme.lightTheme.textTheme.labelMedium?.copyWith(
              color: AppTheme.lightTheme.colorScheme.primary,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTextInput() {
    return TextFormField(
      controller: _textController,
      keyboardType: const TextInputType.numberWithOptions(decimal: true),
      inputFormatters: [
        FilteringTextInputFormatter.allow(RegExp(r'^\d*\.?\d*')),
      ],
      onChanged: _onTextChanged,
      decoration: InputDecoration(
        labelText: 'Enter amount',
        suffixText: widget.unit,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        contentPadding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.5.h),
      ),
    );
  }

  Widget _buildSlider() {
    return Column(
      children: [
        Slider(
          value: widget.amount.clamp(0.0, _maxAmount),
          min: 0.0,
          max: _maxAmount,
          divisions: widget.unit == 'oz' ? 24 : 70,
          onChanged: _onSliderChanged,
          activeColor: AppTheme.lightTheme.colorScheme.primary,
          inactiveColor:
              AppTheme.lightTheme.colorScheme.primary.withValues(alpha: 0.3),
        ),
        Padding(
          padding: EdgeInsets.symmetric(horizontal: 4.w),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                '0 ${widget.unit}',
                style: AppTheme.lightTheme.textTheme.labelSmall,
              ),
              Text(
                '${_maxAmount.toInt()} ${widget.unit}',
                style: AppTheme.lightTheme.textTheme.labelSmall,
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildQuickAmountButtons() {
    final List<double> quickAmounts = widget.unit == 'oz'
        ? [1.0, 2.0, 3.0, 4.0, 6.0, 8.0]
        : [30.0, 60.0, 90.0, 120.0, 180.0, 240.0];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Quick Select',
          style: AppTheme.lightTheme.textTheme.labelLarge?.copyWith(
            fontWeight: FontWeight.w500,
          ),
        ),
        SizedBox(height: 1.h),
        Wrap(
          spacing: 2.w,
          runSpacing: 1.h,
          children: quickAmounts.map((amount) {
            final bool isSelected = (widget.amount - amount).abs() < 0.1;
            return GestureDetector(
              onTap: () => widget.onAmountChanged(amount),
              child: Container(
                padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
                decoration: BoxDecoration(
                  color: isSelected
                      ? AppTheme.lightTheme.colorScheme.secondary
                          .withValues(alpha: 0.1)
                      : Colors.transparent,
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(
                    color: isSelected
                        ? AppTheme.lightTheme.colorScheme.secondary
                        : AppTheme.lightTheme.colorScheme.outline,
                    width: 1,
                  ),
                ),
                child: Text(
                  '${amount.toStringAsFixed(amount.truncateToDouble() == amount ? 0 : 1)} ${widget.unit}',
                  style: AppTheme.lightTheme.textTheme.labelMedium?.copyWith(
                    color: isSelected
                        ? AppTheme.lightTheme.colorScheme.secondary
                        : AppTheme.lightTheme.colorScheme.onSurface,
                    fontWeight: isSelected ? FontWeight.w600 : FontWeight.w400,
                  ),
                ),
              ),
            );
          }).toList(),
        ),
      ],
    );
  }
}
