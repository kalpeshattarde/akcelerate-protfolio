import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class BackgroundSoundsModalWidget extends StatefulWidget {
  final List<String> selectedSounds;
  final ValueChanged<List<String>> onSoundsChanged;

  const BackgroundSoundsModalWidget({
    Key? key,
    required this.selectedSounds,
    required this.onSoundsChanged,
  }) : super(key: key);

  @override
  State<BackgroundSoundsModalWidget> createState() =>
      _BackgroundSoundsModalWidgetState();
}

class _BackgroundSoundsModalWidgetState
    extends State<BackgroundSoundsModalWidget> {
  late List<String> _selectedSounds;

  final List<Map<String, dynamic>> _soundOptions = [
    {
      'id': 'rain',
      'name': 'Rain',
      'icon': 'grain',
      'description': 'Gentle rainfall sounds',
    },
    {
      'id': 'ocean',
      'name': 'Ocean Waves',
      'icon': 'waves',
      'description': 'Calming ocean waves',
    },
    {
      'id': 'forest',
      'name': 'Forest',
      'icon': 'park',
      'description': 'Birds and nature sounds',
    },
    {
      'id': 'wind',
      'name': 'Wind',
      'icon': 'air',
      'description': 'Soft wind through trees',
    },
    {
      'id': 'fire',
      'name': 'Fireplace',
      'icon': 'local_fire_department',
      'description': 'Crackling fireplace',
    },
    {
      'id': 'thunder',
      'name': 'Thunder',
      'icon': 'thunderstorm',
      'description': 'Distant thunder sounds',
    },
  ];

  @override
  void initState() {
    super.initState();
    _selectedSounds = List.from(widget.selectedSounds);
  }

  void _toggleSound(String soundId) {
    setState(() {
      if (_selectedSounds.contains(soundId)) {
        _selectedSounds.remove(soundId);
      } else {
        _selectedSounds.add(soundId);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Handle bar
          Container(
            margin: EdgeInsets.only(top: 2.h),
            width: 12.w,
            height: 0.5.h,
            decoration: BoxDecoration(
              color: AppTheme.lightTheme.colorScheme.outline
                  .withValues(alpha: 0.3),
              borderRadius: BorderRadius.circular(2),
            ),
          ),
          SizedBox(height: 3.h),
          // Title
          Text(
            'Background Sounds',
            style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurface,
              fontWeight: FontWeight.w600,
            ),
          ),
          SizedBox(height: 1.h),
          Text(
            'Mix ambient sounds with your meditation',
            style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurface
                  .withValues(alpha: 0.7),
            ),
          ),
          SizedBox(height: 4.h),
          // Sound options grid
          Flexible(
            child: GridView.builder(
              shrinkWrap: true,
              padding: EdgeInsets.symmetric(horizontal: 6.w),
              gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                crossAxisSpacing: 4.w,
                mainAxisSpacing: 2.h,
                childAspectRatio: 1.2,
              ),
              itemCount: _soundOptions.length,
              itemBuilder: (context, index) {
                final sound = _soundOptions[index];
                final isSelected = _selectedSounds.contains(sound['id']);

                return GestureDetector(
                  onTap: () => _toggleSound(sound['id']),
                  child: Container(
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(16),
                      color: isSelected
                          ? AppTheme.lightTheme.colorScheme.secondary
                              .withValues(alpha: 0.1)
                          : AppTheme.lightTheme.colorScheme.surface,
                      border: Border.all(
                        color: isSelected
                            ? AppTheme.lightTheme.colorScheme.secondary
                            : AppTheme.lightTheme.colorScheme.outline
                                .withValues(alpha: 0.2),
                        width: 1,
                      ),
                    ),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Container(
                          width: 12.w,
                          height: 12.w,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: isSelected
                                ? AppTheme.lightTheme.colorScheme.secondary
                                : AppTheme.lightTheme.colorScheme.outline
                                    .withValues(alpha: 0.2),
                          ),
                          child: Center(
                            child: CustomIconWidget(
                              iconName: sound['icon'],
                              color: isSelected
                                  ? AppTheme.lightTheme.colorScheme.onSecondary
                                  : AppTheme.lightTheme.colorScheme.onSurface,
                              size: 6.w,
                            ),
                          ),
                        ),
                        SizedBox(height: 1.h),
                        Text(
                          sound['name'],
                          style: AppTheme.lightTheme.textTheme.bodyMedium
                              ?.copyWith(
                            color: AppTheme.lightTheme.colorScheme.onSurface,
                            fontWeight: FontWeight.w500,
                          ),
                          textAlign: TextAlign.center,
                        ),
                        SizedBox(height: 0.5.h),
                        Text(
                          sound['description'],
                          style:
                              AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                            color: AppTheme.lightTheme.colorScheme.onSurface
                                .withValues(alpha: 0.7),
                          ),
                          textAlign: TextAlign.center,
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),
          SizedBox(height: 2.h),
          // Action buttons
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 6.w, vertical: 2.h),
            child: Row(
              children: [
                Expanded(
                  child: OutlinedButton(
                    onPressed: () => Navigator.pop(context),
                    child: Text('Cancel'),
                  ),
                ),
                SizedBox(width: 4.w),
                Expanded(
                  child: ElevatedButton(
                    onPressed: () {
                      widget.onSoundsChanged(_selectedSounds);
                      Navigator.pop(context);
                    },
                    child: Text('Apply'),
                  ),
                ),
              ],
            ),
          ),
          SizedBox(height: 2.h),
        ],
      ),
    );
  }
}
