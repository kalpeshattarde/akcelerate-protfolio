import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class SoundMixerBottomSheet extends StatefulWidget {
  final List<Map<String, dynamic>> availableSounds;

  const SoundMixerBottomSheet({
    Key? key,
    required this.availableSounds,
  }) : super(key: key);

  @override
  State<SoundMixerBottomSheet> createState() => _SoundMixerBottomSheetState();
}

class _SoundMixerBottomSheetState extends State<SoundMixerBottomSheet> {
  Map<String, double> soundVolumes = {};
  bool isPlaying = false;

  @override
  void initState() {
    super.initState();
    // Initialize with first 3 sounds at different volumes
    if (widget.availableSounds.isNotEmpty) {
      soundVolumes[widget.availableSounds[0]['id'].toString()] = 0.7;
    }
    if (widget.availableSounds.length > 1) {
      soundVolumes[widget.availableSounds[1]['id'].toString()] = 0.5;
    }
    if (widget.availableSounds.length > 2) {
      soundVolumes[widget.availableSounds[2]['id'].toString()] = 0.3;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 80.h,
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
      ),
      child: Column(
        children: [
          // Handle
          Container(
            width: 12.w,
            height: 0.5.h,
            margin: EdgeInsets.only(top: 1.h, bottom: 2.h),
            decoration: BoxDecoration(
              color: AppTheme.lightTheme.colorScheme.outline,
              borderRadius: BorderRadius.circular(2),
            ),
          ),
          // Header
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 4.w),
            child: Row(
              children: [
                Text(
                  'Sound Mixer',
                  style: AppTheme.lightTheme.textTheme.headlineSmall,
                ),
                const Spacer(),
                IconButton(
                  onPressed: () {
                    setState(() {
                      isPlaying = !isPlaying;
                    });
                  },
                  icon: CustomIconWidget(
                    iconName: isPlaying ? 'pause' : 'play_arrow',
                    color: AppTheme.lightTheme.colorScheme.secondary,
                    size: 32,
                  ),
                ),
              ],
            ),
          ),
          SizedBox(height: 2.h),
          // Master volume
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 4.w),
            child: Container(
              padding: EdgeInsets.all(3.w),
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.colorScheme.secondary
                    .withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(
                  color: AppTheme.lightTheme.colorScheme.secondary,
                  width: 1,
                ),
              ),
              child: Row(
                children: [
                  CustomIconWidget(
                    iconName: 'volume_up',
                    color: AppTheme.lightTheme.colorScheme.secondary,
                    size: 24,
                  ),
                  SizedBox(width: 3.w),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Master Volume',
                          style: AppTheme.lightTheme.textTheme.titleSmall
                              ?.copyWith(
                            color: AppTheme.lightTheme.colorScheme.secondary,
                          ),
                        ),
                        Slider(
                          value: 0.8,
                          onChanged: (value) {},
                          activeColor:
                              AppTheme.lightTheme.colorScheme.secondary,
                          inactiveColor:
                              AppTheme.lightTheme.colorScheme.outline,
                        ),
                      ],
                    ),
                  ),
                  Text(
                    '80%',
                    style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                      color: AppTheme.lightTheme.colorScheme.secondary,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
            ),
          ),
          SizedBox(height: 2.h),
          // Sound list
          Expanded(
            child: ListView.builder(
              padding: EdgeInsets.symmetric(horizontal: 4.w),
              itemCount: widget.availableSounds.length,
              itemBuilder: (context, index) {
                final sound = widget.availableSounds[index];
                final soundId = sound['id'].toString();
                final volume = soundVolumes[soundId] ?? 0.0;
                final isActive = volume > 0;

                return Container(
                  margin: EdgeInsets.only(bottom: 2.h),
                  padding: EdgeInsets.all(3.w),
                  decoration: BoxDecoration(
                    color: isActive
                        ? AppTheme.lightTheme.colorScheme.surface
                        : AppTheme.lightTheme.colorScheme.surface
                            .withValues(alpha: 0.5),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(
                      color: isActive
                          ? AppTheme.lightTheme.colorScheme.secondary
                          : AppTheme.lightTheme.colorScheme.outline,
                      width: isActive ? 2 : 1,
                    ),
                    boxShadow: isActive
                        ? [
                            BoxShadow(
                              color: AppTheme.lightTheme.colorScheme.secondary
                                  .withValues(alpha: 0.2),
                              blurRadius: 8,
                              offset: const Offset(0, 2),
                            ),
                          ]
                        : null,
                  ),
                  child: Row(
                    children: [
                      // Sound image
                      ClipRRect(
                        borderRadius: BorderRadius.circular(8),
                        child: CustomImageWidget(
                          imageUrl: sound['image'] as String,
                          width: 15.w,
                          height: 15.w,
                          fit: BoxFit.cover,
                          semanticLabel: sound['semanticLabel'] as String,
                        ),
                      ),
                      SizedBox(width: 3.w),
                      // Sound info and controls
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              sound['name'] as String,
                              style: AppTheme.lightTheme.textTheme.titleSmall
                                  ?.copyWith(
                                color: isActive
                                    ? AppTheme.lightTheme.colorScheme.onSurface
                                    : AppTheme.lightTheme.colorScheme
                                        .onSurfaceVariant,
                              ),
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                            ),
                            SizedBox(height: 1.h),
                            Row(
                              children: [
                                Expanded(
                                  child: Slider(
                                    value: volume,
                                    onChanged: (value) {
                                      setState(() {
                                        soundVolumes[soundId] = value;
                                      });
                                    },
                                    activeColor: AppTheme
                                        .lightTheme.colorScheme.secondary,
                                    inactiveColor:
                                        AppTheme.lightTheme.colorScheme.outline,
                                  ),
                                ),
                                SizedBox(width: 2.w),
                                SizedBox(
                                  width: 12.w,
                                  child: Text(
                                    '${(volume * 100).round()}%',
                                    style: AppTheme
                                        .lightTheme.textTheme.bodySmall
                                        ?.copyWith(
                                      color: isActive
                                          ? AppTheme
                                              .lightTheme.colorScheme.secondary
                                          : AppTheme.lightTheme.colorScheme
                                              .onSurfaceVariant,
                                      fontWeight: FontWeight.w600,
                                    ),
                                    textAlign: TextAlign.end,
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                      // Mute button
                      IconButton(
                        onPressed: () {
                          setState(() {
                            if (volume > 0) {
                              soundVolumes[soundId] = 0.0;
                            } else {
                              soundVolumes[soundId] = 0.5;
                            }
                          });
                        },
                        icon: CustomIconWidget(
                          iconName: volume > 0 ? 'volume_up' : 'volume_off',
                          color: volume > 0
                              ? AppTheme.lightTheme.colorScheme.secondary
                              : AppTheme
                                  .lightTheme.colorScheme.onSurfaceVariant,
                          size: 24,
                        ),
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
          // Bottom actions
          Padding(
            padding: EdgeInsets.all(4.w),
            child: Row(
              children: [
                Expanded(
                  child: OutlinedButton(
                    onPressed: () {
                      setState(() {
                        soundVolumes.clear();
                      });
                    },
                    child: Text('Clear All'),
                  ),
                ),
                SizedBox(width: 4.w),
                Expanded(
                  child: ElevatedButton(
                    onPressed: () {
                      // Save mix
                      Navigator.pop(context);
                    },
                    child: Text('Save Mix'),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
