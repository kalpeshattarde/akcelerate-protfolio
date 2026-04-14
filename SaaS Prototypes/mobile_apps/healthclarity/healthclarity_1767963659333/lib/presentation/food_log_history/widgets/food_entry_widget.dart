import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_slidable/flutter_slidable.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class FoodEntryWidget extends StatelessWidget {
  final Map<String, dynamic> foodEntry;
  final Function(Map<String, dynamic>) onEditPortion;
  final Function(Map<String, dynamic>) onDuplicate;
  final Function(Map<String, dynamic>) onMoveMeal;
  final Function(Map<String, dynamic>) onDelete;
  final Function(Map<String, dynamic>) onViewDetails;
  final Function(Map<String, dynamic>) onAddToFavorites;
  final Function(Map<String, dynamic>) onShareMeal;

  const FoodEntryWidget({
    super.key,
    required this.foodEntry,
    required this.onEditPortion,
    required this.onDuplicate,
    required this.onMoveMeal,
    required this.onDelete,
    required this.onViewDetails,
    required this.onAddToFavorites,
    required this.onShareMeal,
  });

  void _showContextMenu(BuildContext context) {
    HapticFeedback.mediumImpact();
    showModalBottomSheet(
      context: context,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => Container(
        padding: EdgeInsets.symmetric(vertical: 2.h),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 12.w,
              height: 0.5.h,
              decoration: BoxDecoration(
                color: AppTheme.neutralGray.withValues(alpha: 0.3),
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            SizedBox(height: 2.h),
            _buildContextMenuItem(
              context,
              'View Nutrition Details',
              'info',
              () => onViewDetails(foodEntry),
            ),
            _buildContextMenuItem(
              context,
              'Add to Favorites',
              'favorite_border',
              () => onAddToFavorites(foodEntry),
            ),
            _buildContextMenuItem(
              context,
              'Share Meal',
              'share',
              () => onShareMeal(foodEntry),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildContextMenuItem(
    BuildContext context,
    String title,
    String iconName,
    VoidCallback onTap,
  ) {
    return ListTile(
      leading: CustomIconWidget(
        iconName: iconName,
        color: AppTheme.lightTheme.colorScheme.onSurface,
        size: 24,
      ),
      title: Text(
        title,
        style: AppTheme.lightTheme.textTheme.bodyLarge,
      ),
      onTap: () {
        Navigator.pop(context);
        onTap();
      },
    );
  }

  void _showDeleteConfirmation(BuildContext context) {
    HapticFeedback.heavyImpact();
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(
          'Delete Food Entry',
          style: AppTheme.lightTheme.textTheme.titleLarge,
        ),
        content: Text(
          'Are you sure you want to delete "${foodEntry["name"]}" from your log?',
          style: AppTheme.lightTheme.textTheme.bodyLarge,
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              onDelete(foodEntry);
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: AppTheme.errorState,
            ),
            child: Text(
              'Delete',
              style: TextStyle(color: Colors.white),
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final carbs = (foodEntry["carbs"] as num?)?.toDouble() ?? 0.0;
    final protein = (foodEntry["protein"] as num?)?.toDouble() ?? 0.0;
    final fats = (foodEntry["fats"] as num?)?.toDouble() ?? 0.0;
    final calories = (foodEntry["calories"] as num?)?.toDouble() ?? 0.0;

    return Slidable(
      key: ValueKey(foodEntry["id"]),
      startActionPane: ActionPane(
        motion: const ScrollMotion(),
        children: [
          SlidableAction(
            onPressed: (context) {
              HapticFeedback.lightImpact();
              onEditPortion(foodEntry);
            },
            backgroundColor: AppTheme.waterAccent,
            foregroundColor: Colors.white,
            icon: Icons.edit,
            label: 'Edit',
          ),
          SlidableAction(
            onPressed: (context) {
              HapticFeedback.lightImpact();
              onDuplicate(foodEntry);
            },
            backgroundColor: AppTheme.successState,
            foregroundColor: Colors.white,
            icon: Icons.copy,
            label: 'Duplicate',
          ),
          SlidableAction(
            onPressed: (context) {
              HapticFeedback.lightImpact();
              onMoveMeal(foodEntry);
            },
            backgroundColor: AppTheme.calorieAccent,
            foregroundColor: Colors.white,
            icon: Icons.move_up,
            label: 'Move',
          ),
        ],
      ),
      endActionPane: ActionPane(
        motion: const ScrollMotion(),
        children: [
          SlidableAction(
            onPressed: (context) => _showDeleteConfirmation(context),
            backgroundColor: AppTheme.errorState,
            foregroundColor: Colors.white,
            icon: Icons.delete,
            label: 'Delete',
          ),
        ],
      ),
      child: InkWell(
        onLongPress: () => _showContextMenu(context),
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
          child: Row(
            children: [
              Container(
                width: 12.w,
                height: 12.w,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(8),
                  color: AppTheme.lightTheme.colorScheme.primaryContainer,
                ),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(8),
                  child: foodEntry["image"] != null
                      ? CustomImageWidget(
                          imageUrl: foodEntry["image"],
                          width: 12.w,
                          height: 12.w,
                          fit: BoxFit.cover,
                        )
                      : Center(
                          child: CustomIconWidget(
                            iconName: 'restaurant',
                            color: AppTheme.calorieAccent,
                            size: 20,
                          ),
                        ),
                ),
              ),
              SizedBox(width: 3.w),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      foodEntry["name"] ?? "Unknown Food",
                      style: AppTheme.lightTheme.textTheme.titleMedium,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                    SizedBox(height: 0.5.h),
                    Text(
                      foodEntry["portion"] ?? "1 serving",
                      style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                        color: AppTheme.neutralGray,
                      ),
                    ),
                    SizedBox(height: 1.h),
                    Row(
                      children: [
                        _buildMacroChip('C', carbs, AppTheme.waterAccent),
                        SizedBox(width: 2.w),
                        _buildMacroChip('P', protein, AppTheme.successState),
                        SizedBox(width: 2.w),
                        _buildMacroChip('F', fats, AppTheme.warningState),
                      ],
                    ),
                  ],
                ),
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text(
                    '${calories.toStringAsFixed(0)}',
                    style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                      color: AppTheme.calorieAccent,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  Text(
                    'kcal',
                    style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                      color: AppTheme.neutralGray,
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildMacroChip(String label, double value, Color color) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 2.w, vertical: 0.5.h),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Text(
        '$label ${value.toStringAsFixed(0)}g',
        style: AppTheme.lightTheme.textTheme.labelSmall?.copyWith(
          color: color,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }
}
