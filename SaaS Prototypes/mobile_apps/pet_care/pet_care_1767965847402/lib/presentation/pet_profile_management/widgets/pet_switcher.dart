import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../../core/app_export.dart';

class PetSwitcher extends StatelessWidget {
  final List<Map<String, dynamic>> pets;
  final int currentPetIndex;
  final Function(int) onPetChanged;

  const PetSwitcher({
    super.key,
    required this.pets,
    required this.currentPetIndex,
    required this.onPetChanged,
  });

  @override
  Widget build(BuildContext context) {
    if (pets.length <= 1) return const SizedBox.shrink();

    return Container(
      height: 12.h,
      padding: EdgeInsets.symmetric(vertical: 2.h),
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        padding: EdgeInsets.symmetric(horizontal: 4.w),
        itemCount: pets.length,
        itemBuilder: (context, index) {
          final pet = pets[index];
          final isSelected = index == currentPetIndex;

          return GestureDetector(
            onTap: () => onPetChanged(index),
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 300),
              margin: EdgeInsets.only(right: 3.w),
              padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
              decoration: BoxDecoration(
                color: isSelected
                    ? AppTheme.lightTheme.colorScheme.primary
                    : AppTheme.lightTheme.colorScheme.surface,
                borderRadius: BorderRadius.circular(25),
                border: Border.all(
                  color: isSelected
                      ? AppTheme.lightTheme.colorScheme.primary
                      : AppTheme.lightTheme.dividerColor,
                  width: 1,
                ),
                boxShadow: isSelected
                    ? [
                        BoxShadow(
                          color: AppTheme.lightTheme.colorScheme.primary
                              .withValues(alpha: 0.3),
                          blurRadius: 8,
                          offset: const Offset(0, 2),
                        ),
                      ]
                    : null,
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  // Pet avatar
                  Container(
                    width: 8.w,
                    height: 8.w,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      border: Border.all(
                        color: isSelected
                            ? Colors.white
                            : AppTheme.lightTheme.dividerColor,
                        width: 1,
                      ),
                    ),
                    child: ClipOval(
                      child: pet['image'] != null
                          ? CustomImageWidget(
                              imageUrl: pet['image'] as String,
                              width: 8.w,
                              height: 8.w,
                              fit: BoxFit.cover,
                            )
                          : Container(
                              color: isSelected
                                  ? Colors.white.withValues(alpha: 0.2)
                                  : AppTheme.lightTheme.colorScheme.primary
                                      .withValues(alpha: 0.1),
                              child: CustomIconWidget(
                                iconName: 'pets',
                                color: isSelected
                                    ? Colors.white
                                    : AppTheme.lightTheme.colorScheme.primary,
                                size: 4.w,
                              ),
                            ),
                    ),
                  ),

                  SizedBox(width: 2.w),

                  // Pet name
                  Text(
                    pet['name'] as String,
                    style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                      color: isSelected
                          ? Colors.white
                          : AppTheme.lightTheme.colorScheme.onSurface,
                      fontWeight:
                          isSelected ? FontWeight.w600 : FontWeight.w400,
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
