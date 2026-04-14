import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class PetSelectorWidget extends StatelessWidget {
  final List<Map<String, dynamic>> pets;
  final String selectedPetId;
  final Function(String) onPetChanged;

  const PetSelectorWidget({
    super.key,
    required this.pets,
    required this.selectedPetId,
    required this.onPetChanged,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final selectedPet = pets.firstWhere(
      (pet) => (pet)["id"] == selectedPetId,
      orElse: () => pets.isNotEmpty ? pets.first : {},
    );

    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
      padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: theme.brightness == Brightness.light
              ? const Color(0xFFE1E4E8)
              : const Color(0xFF30363D),
        ),
      ),
      child: DropdownButtonHideUnderline(
        child: DropdownButton<String>(
          value: selectedPetId,
          isExpanded: true,
          icon: CustomIconWidget(
            iconName: 'keyboard_arrow_down',
            size: 24,
            color: theme.brightness == Brightness.light
                ? const Color(0xFF6A737D)
                : const Color(0xFFADB5BD),
          ),
          dropdownColor: theme.colorScheme.surface,
          style: theme.textTheme.bodyLarge?.copyWith(
            color: theme.brightness == Brightness.light
                ? const Color(0xFF1B1F23)
                : const Color(0xFFE8EAED),
          ),
          onChanged: (String? newValue) {
            if (newValue != null) {
              onPetChanged(newValue);
            }
          },
          selectedItemBuilder: (BuildContext context) {
            return pets.map<Widget>((pet) {
              final petMap = pet;
              return Row(
                children: [
                  Container(
                    width: 10.w,
                    height: 10.w,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: theme.brightness == Brightness.light
                          ? const Color(0xFF2B5F75).withValues(alpha: 0.1)
                          : const Color(0xFF4A8BA3).withValues(alpha: 0.2),
                    ),
                    child: petMap["avatar"] != null
                        ? ClipOval(
                            child: CustomImageWidget(
                              imageUrl: petMap["avatar"] as String,
                              width: 10.w,
                              height: 10.w,
                              fit: BoxFit.cover,
                            ),
                          )
                        : Center(
                            child: CustomIconWidget(
                              iconName: 'pets',
                              size: 20,
                              color: theme.brightness == Brightness.light
                                  ? const Color(0xFF2B5F75)
                                  : const Color(0xFF4A8BA3),
                            ),
                          ),
                  ),
                  SizedBox(width: 3.w),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          petMap["name"] as String,
                          style: theme.textTheme.titleMedium?.copyWith(
                            fontWeight: FontWeight.w600,
                          ),
                          overflow: TextOverflow.ellipsis,
                        ),
                        Text(
                          '${petMap["breed"]} • ${petMap["age"]} years old',
                          style: theme.textTheme.bodySmall?.copyWith(
                            color: theme.brightness == Brightness.light
                                ? const Color(0xFF6A737D)
                                : const Color(0xFFADB5BD),
                          ),
                          overflow: TextOverflow.ellipsis,
                        ),
                      ],
                    ),
                  ),
                ],
              );
            }).toList();
          },
          items: pets.map<DropdownMenuItem<String>>((pet) {
            final petMap = pet;
            return DropdownMenuItem<String>(
              value: petMap["id"] as String,
              child: Row(
                children: [
                  Container(
                    width: 10.w,
                    height: 10.w,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: theme.brightness == Brightness.light
                          ? const Color(0xFF2B5F75).withValues(alpha: 0.1)
                          : const Color(0xFF4A8BA3).withValues(alpha: 0.2),
                    ),
                    child: petMap["avatar"] != null
                        ? ClipOval(
                            child: CustomImageWidget(
                              imageUrl: petMap["avatar"] as String,
                              width: 10.w,
                              height: 10.w,
                              fit: BoxFit.cover,
                            ),
                          )
                        : Center(
                            child: CustomIconWidget(
                              iconName: 'pets',
                              size: 20,
                              color: theme.brightness == Brightness.light
                                  ? const Color(0xFF2B5F75)
                                  : const Color(0xFF4A8BA3),
                            ),
                          ),
                  ),
                  SizedBox(width: 3.w),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          petMap["name"] as String,
                          style: theme.textTheme.titleMedium?.copyWith(
                            fontWeight: FontWeight.w600,
                          ),
                          overflow: TextOverflow.ellipsis,
                        ),
                        Text(
                          '${petMap["breed"]} • ${petMap["age"]} years old',
                          style: theme.textTheme.bodySmall?.copyWith(
                            color: theme.brightness == Brightness.light
                                ? const Color(0xFF6A737D)
                                : const Color(0xFFADB5BD),
                          ),
                          overflow: TextOverflow.ellipsis,
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            );
          }).toList(),
        ),
      ),
    );
  }
}
