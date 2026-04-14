import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../../core/app_export.dart';

class CategoryFilterChipsWidget extends StatelessWidget {
  final List<String> categories;
  final String selectedCategory;
  final Function(String) onCategorySelected;

  const CategoryFilterChipsWidget({
    super.key,
    required this.categories,
    required this.selectedCategory,
    required this.onCategorySelected,
  });

  IconData _getCategoryIcon(String category) {
    switch (category) {
      case 'All':
        return Icons.apps_rounded;
      case 'Wellness':
        return Icons.favorite_rounded;
      case 'Productivity':
        return Icons.trending_up_rounded;
      case 'Mindfulness':
        return Icons.spa_rounded;
      case 'Fitness':
        return Icons.fitness_center_rounded;
      default:
        return Icons.circle_rounded;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        physics: const BouncingScrollPhysics(),
        itemCount: categories.length,
        itemBuilder: (context, index) {
          final category = categories[index];
          final isSelected = category == selectedCategory;

          return Container(
            margin: EdgeInsets.only(
              right: index < categories.length - 1 ? 20 : 0,
            ),
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 250),
              curve: Curves.easeOutCubic,
              child: InkWell(
                onTap: () {
                  HapticFeedback.selectionClick();
                  onCategorySelected(category);
                },
                borderRadius: BorderRadius.circular(20),
                child: Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 24,
                    vertical: 16,
                  ),
                  decoration: BoxDecoration(
                    color: isSelected
                        ? const Color(0xFF2D5A3D)
                        : const Color(0xFFF8F6F2),
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(
                      color: isSelected
                          ? const Color(0xFF2D5A3D)
                          : const Color(0xFFE8E4DE),
                      width: isSelected ? 2 : 1,
                    ),
                    boxShadow: [
                      if (isSelected) ...[
                        BoxShadow(
                          color: const Color(0xFF2D5A3D).withAlpha(26),
                          blurRadius: 12,
                          offset: const Offset(0, 4),
                        ),
                      ] else ...[
                        BoxShadow(
                          color: Colors.black.withAlpha(8),
                          blurRadius: 6,
                          offset: const Offset(0, 2),
                        ),
                      ],
                    ],
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(
                        _getCategoryIcon(category),
                        size: 18,
                        color: isSelected
                            ? const Color(0xFFFEFCF8)
                            : const Color(0xFF6B6B6B),
                      ),
                      const SizedBox(width: 10),
                      Text(
                        category,
                        style: GoogleFonts.inter(
                          fontSize: 15,
                          fontWeight: FontWeight.w600,
                          color: isSelected
                              ? const Color(0xFFFEFCF8)
                              : const Color(0xFF1A1A1A),
                          letterSpacing: 0.2,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
