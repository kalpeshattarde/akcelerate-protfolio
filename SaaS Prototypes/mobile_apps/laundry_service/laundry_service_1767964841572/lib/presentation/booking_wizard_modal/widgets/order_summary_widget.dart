import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../../core/app_export.dart';

class OrderSummaryWidget extends StatelessWidget {
  final String? selectedService;
  final String? selectedAddress;
  final DateTime? selectedDate;
  final Function(DateTime) onDateSelected;

  const OrderSummaryWidget({
    Key? key,
    required this.selectedService,
    required this.selectedAddress,
    required this.selectedDate,
    required this.onDateSelected,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final Map<String, String> serviceNames = {
      "wash_fold": "Wash & Fold",
      "dry_clean": "Dry Clean",
    };

    final Map<String, String> servicePrices = {
      "wash_fold": "₹99",
      "dry_clean": "₹199",
    };

    final Map<String, String> addressLabels = {
      "home": "Home - 123 MG Road, Koramangala",
      "office": "Office - 456 Brigade Road, Commercial Street",
    };

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          "Order Summary",
          style: AppTheme.lightTheme.textTheme.headlineSmall?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
        SizedBox(height: 3.h),
        Container(
          padding: EdgeInsets.all(4.w),
          decoration: BoxDecoration(
            color: AppTheme.lightTheme.colorScheme.surface,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: AppTheme.lightTheme.dividerColor),
          ),
          child: Column(
            children: [
              _buildSummaryRow(
                "Service",
                selectedService != null
                    ? serviceNames[selectedService!] ?? ""
                    : "",
                Icons.local_laundry_service,
              ),
              SizedBox(height: 2.h),
              _buildSummaryRow(
                "Address",
                selectedAddress != null
                    ? addressLabels[selectedAddress!] ?? ""
                    : "",
                Icons.location_on,
              ),
              SizedBox(height: 2.h),
              _buildSummaryRow(
                "Estimated Price",
                selectedService != null
                    ? servicePrices[selectedService!] ?? ""
                    : "",
                Icons.currency_rupee,
              ),
            ],
          ),
        ),
        SizedBox(height: 3.h),
        Text(
          "Select Pickup Date",
          style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
        SizedBox(height: 2.h),
        GestureDetector(
          onTap: () => _showDatePicker(context),
          child: Container(
            padding: EdgeInsets.all(4.w),
            decoration: BoxDecoration(
              border: Border.all(color: AppTheme.lightTheme.dividerColor),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Row(
              children: [
                CustomIconWidget(
                  iconName: 'calendar_today',
                  color: AppTheme.lightTheme.primaryColor,
                  size: 5.w,
                ),
                SizedBox(width: 3.w),
                Expanded(
                  child: Text(
                    selectedDate != null
                        ? "${selectedDate!.day}/${selectedDate!.month}/${selectedDate!.year}"
                        : "Select pickup date",
                    style: AppTheme.lightTheme.textTheme.bodyLarge?.copyWith(
                      color: selectedDate != null
                          ? AppTheme.lightTheme.colorScheme.onSurface
                          : AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                ),
                CustomIconWidget(
                  iconName: 'keyboard_arrow_down',
                  color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                  size: 5.w,
                ),
              ],
            ),
          ),
        ),
        SizedBox(height: 3.h),
        Container(
          padding: EdgeInsets.all(4.w),
          decoration: BoxDecoration(
            color: AppTheme.lightTheme.primaryColor.withValues(alpha: 0.05),
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: AppTheme.lightTheme.primaryColor.withValues(alpha: 0.2),
            ),
          ),
          child: Row(
            children: [
              CustomIconWidget(
                iconName: 'info',
                color: AppTheme.lightTheme.primaryColor,
                size: 5.w,
              ),
              SizedBox(width: 3.w),
              Expanded(
                child: Text(
                  "Pickup will be scheduled between 9 AM - 6 PM on the selected date",
                  style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                    color: AppTheme.lightTheme.primaryColor,
                  ),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildSummaryRow(String label, String value, IconData iconData) {
    return Row(
      children: [
        CustomIconWidget(
          iconName: iconData.toString().split('.').last,
          color: AppTheme.lightTheme.colorScheme.secondary,
          size: 5.w,
        ),
        SizedBox(width: 3.w),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                label,
                style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                  color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                ),
              ),
              SizedBox(height: 0.5.h),
              Text(
                value,
                style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Future<void> _showDatePicker(BuildContext context) async {
    final DateTime now = DateTime.now();
    final DateTime firstDate = now.add(Duration(days: 1));
    final DateTime lastDate = now.add(Duration(days: 30));

    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: selectedDate ?? firstDate,
      firstDate: firstDate,
      lastDate: lastDate,
      builder: (context, child) {
        return Theme(
          data: Theme.of(context).copyWith(
            colorScheme: Theme.of(context).colorScheme.copyWith(
                  primary: AppTheme.lightTheme.primaryColor,
                ),
          ),
          child: child!,
        );
      },
    );

    if (picked != null) {
      onDateSelected(picked);
    }
  }
}
