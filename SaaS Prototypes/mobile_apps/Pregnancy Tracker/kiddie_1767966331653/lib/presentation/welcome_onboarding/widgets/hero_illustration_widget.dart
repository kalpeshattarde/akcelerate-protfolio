import 'package:flutter/material.dart';

import '../../../core/app_export.dart';

/// Hero illustration widget with subtle parallax animation
/// Shows diverse expecting mothers in warm, soft art style
class HeroIllustrationWidget extends StatelessWidget {
  final int currentPage;

  const HeroIllustrationWidget({
    super.key,
    required this.currentPage,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
      child: Stack(
        alignment: Alignment.center,
        children: [
          // Background gradient circle
          Positioned(
            top: 20,
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 600),
              curve: Curves.easeOut,
              width: 280,
              height: 280,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                gradient: RadialGradient(
                  colors: [
                    theme.colorScheme.primary.withValues(alpha: 0.15),
                    theme.colorScheme.secondary.withValues(alpha: 0.05),
                  ],
                ),
              ),
            ),
          ),

          // Main illustration
          AnimatedContainer(
            duration: const Duration(milliseconds: 400),
            curve: Curves.easeOut,
            transform: Matrix4.translationValues(
              currentPage * -10.0,
              0,
              0,
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // Primary illustration image
                CustomImageWidget(
                  imageUrl:
                      'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=80',
                  width: 240,
                  height: 240,
                  fit: BoxFit.contain,
                  semanticLabel:
                      'Illustration of a diverse group of expecting mothers in warm, soft art style with gentle pastel colors, showing supportive community and maternal care',
                ),

                const SizedBox(height: 16),

                // Decorative elements
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    _buildDecorativeIcon(
                      context,
                      'favorite',
                      theme.colorScheme.primary,
                    ),
                    const SizedBox(width: 24),
                    _buildDecorativeIcon(
                      context,
                      'child_care',
                      theme.colorScheme.tertiary,
                    ),
                    const SizedBox(width: 24),
                    _buildDecorativeIcon(
                      context,
                      'spa',
                      theme.colorScheme.secondary,
                    ),
                  ],
                ),
              ],
            ),
          ),

          // Floating decorative elements with parallax
          Positioned(
            top: 40,
            left: 20,
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 500),
              curve: Curves.easeOut,
              transform: Matrix4.translationValues(
                currentPage * 5.0,
                currentPage * -3.0,
                0,
              ),
              child: Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: theme.colorScheme.primary.withValues(alpha: 0.1),
                ),
              ),
            ),
          ),

          Positioned(
            bottom: 60,
            right: 30,
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 500),
              curve: Curves.easeOut,
              transform: Matrix4.translationValues(
                currentPage * -5.0,
                currentPage * 3.0,
                0,
              ),
              child: Container(
                width: 30,
                height: 30,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: theme.colorScheme.tertiary.withValues(alpha: 0.1),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDecorativeIcon(
    BuildContext context,
    String iconName,
    Color color,
  ) {
    return Container(
      padding: const EdgeInsets.all(8),
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        color: color.withValues(alpha: 0.1),
      ),
      child: CustomIconWidget(
        iconName: iconName,
        size: 20,
        color: color,
      ),
    );
  }
}
