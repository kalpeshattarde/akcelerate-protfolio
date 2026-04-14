import 'package:flutter/material.dart';

import '../../../core/app_export.dart';

class SoundMixerFab extends StatelessWidget {
  final VoidCallback onPressed;

  const SoundMixerFab({
    Key? key,
    required this.onPressed,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return FloatingActionButton.extended(
      onPressed: onPressed,
      backgroundColor: AppTheme.lightTheme.colorScheme.secondary,
      foregroundColor: AppTheme.lightTheme.colorScheme.onSecondary,
      elevation: 8,
      icon: CustomIconWidget(
        iconName: 'tune',
        color: AppTheme.lightTheme.colorScheme.onSecondary,
        size: 24,
      ),
      label: Text(
        'Sound Mixer',
        style: AppTheme.lightTheme.textTheme.labelLarge?.copyWith(
          color: AppTheme.lightTheme.colorScheme.onSecondary,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }
}
