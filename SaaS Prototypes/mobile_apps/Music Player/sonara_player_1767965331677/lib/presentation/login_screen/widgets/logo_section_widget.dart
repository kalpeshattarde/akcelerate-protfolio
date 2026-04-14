import 'package:flutter/material.dart';

import '../../../widgets/custom_icon_widget.dart';

/// Logo section widget displaying the SONORA branding with icon
class LogoSectionWidget extends StatelessWidget {
  const LogoSectionWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        // Logo icon (same as splash screen)
        Container(
          width: 80,
          height: 80,
          decoration: BoxDecoration(
            color: theme.colorScheme.primary.withValues(alpha: 0.15),
            shape: BoxShape.circle,
            border: Border.all(
              color: theme.colorScheme.primary.withValues(alpha: 0.3),
              width: 2,
            ),
          ),
          child: Center(
            child: CustomIconWidget(
              iconName: 'music_note',
              color: theme.colorScheme.primary,
              size: 40,
            ),
          ),
        ),
        const SizedBox(height: 20),
        // SONORA Logo Text
        Text(
          'SONORA',
          style: TextStyle(
            fontSize: 32,
            fontWeight: FontWeight.w700,
            color: theme.colorScheme.primary,
            letterSpacing: 4.0,
          ),
        ),
        const SizedBox(height: 8),
        // Tagline
        Text(
          'Your Music, Your Mood',
          style: TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.w400,
            color: Colors.white.withValues(alpha: 0.6),
            letterSpacing: 0.5,
          ),
        ),
      ],
    );
  }
}
