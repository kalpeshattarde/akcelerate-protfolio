import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../../core/app_export.dart';

class AddressSelectionWidget extends StatelessWidget {
  final String? selectedAddress;
  final Function(String) onAddressSelected;

  const AddressSelectionWidget({
    Key? key,
    required this.selectedAddress,
    required this.onAddressSelected,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final List<Map<String, dynamic>> addresses = [
      {
        "id": "home",
        "label": "Home",
        "address": "123 MG Road, Koramangala, Bangalore - 560034",
        "isDefault": true,
      },
      {
        "id": "office",
        "label": "Office",
        "address": "456 Brigade Road, Commercial Street, Bangalore - 560025",
        "isDefault": false,
      },
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          "Select Pickup Address",
          style: AppTheme.lightTheme.textTheme.headlineSmall?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
        SizedBox(height: 3.h),
        Container(
          decoration: BoxDecoration(
            border: Border.all(color: AppTheme.lightTheme.dividerColor),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Column(
            children: [
              ...addresses.asMap().entries.map((entry) {
                final index = entry.key;
                final address = entry.value;
                return _buildAddressItem(
                    address, index == addresses.length - 1);
              }).toList(),
              _buildAddNewAddressItem(),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildAddressItem(Map<String, dynamic> address, bool isLast) {
    final bool isSelected = selectedAddress == address["id"];

    return GestureDetector(
      onTap: () => onAddressSelected(address["id"] as String),
      child: Container(
        padding: EdgeInsets.all(4.w),
        decoration: BoxDecoration(
          color: isSelected
              ? AppTheme.lightTheme.primaryColor.withValues(alpha: 0.05)
              : Colors.transparent,
          border: !isLast
              ? Border(
                  bottom: BorderSide(
                    color: AppTheme.lightTheme.dividerColor,
                    width: 1,
                  ),
                )
              : null,
        ),
        child: Row(
          children: [
            Radio<String>(
              value: address["id"] as String,
              groupValue: selectedAddress,
              onChanged: (value) {
                if (value != null) {
                  onAddressSelected(value);
                }
              },
              activeColor: AppTheme.lightTheme.primaryColor,
            ),
            SizedBox(width: 3.w),
            CustomIconWidget(
              iconName: address["id"] == "home" ? 'home' : 'business',
              color: AppTheme.lightTheme.colorScheme.secondary,
              size: 5.w,
            ),
            SizedBox(width: 3.w),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Text(
                        address["label"] as String,
                        style:
                            AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      if (address["isDefault"] == true) ...[
                        SizedBox(width: 2.w),
                        Container(
                          padding: EdgeInsets.symmetric(
                              horizontal: 2.w, vertical: 0.5.h),
                          decoration: BoxDecoration(
                            color: AppTheme.lightTheme.primaryColor
                                .withValues(alpha: 0.1),
                            borderRadius: BorderRadius.circular(4),
                          ),
                          child: Text(
                            "Default",
                            style: AppTheme.lightTheme.textTheme.labelSmall
                                ?.copyWith(
                              color: AppTheme.lightTheme.primaryColor,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ),
                      ],
                    ],
                  ),
                  SizedBox(height: 0.5.h),
                  Text(
                    address["address"] as String,
                    style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                      color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildAddNewAddressItem() {
    return GestureDetector(
      onTap: () {
        // Handle add new address
      },
      child: Container(
        padding: EdgeInsets.all(4.w),
        child: Row(
          children: [
            Container(
              padding: EdgeInsets.all(2.w),
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.primaryColor.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(8),
              ),
              child: CustomIconWidget(
                iconName: 'add',
                color: AppTheme.lightTheme.primaryColor,
                size: 5.w,
              ),
            ),
            SizedBox(width: 4.w),
            Text(
              "Add New Address",
              style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                color: AppTheme.lightTheme.primaryColor,
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
