import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

enum DownloadStatus { queued, downloading, completed, failed }

class DownloadStatusIndicator extends StatelessWidget {
  final DownloadStatus status;
  final double? progress;
  final VoidCallback? onRetry;

  const DownloadStatusIndicator({
    Key? key,
    required this.status,
    this.progress,
    this.onRetry,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    switch (status) {
      case DownloadStatus.queued:
        return Container(
          width: 6.w,
          height: 6.w,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            border: Border.all(
              color: Theme.of(context).colorScheme.onSurfaceVariant,
              width: 2,
            ),
          ),
          child: CustomIconWidget(
            iconName: 'download',
            size: 3.w,
            color: Theme.of(context).colorScheme.onSurfaceVariant,
          ),
        );

      case DownloadStatus.downloading:
        return SizedBox(
          width: 6.w,
          height: 6.w,
          child: Stack(
            alignment: Alignment.center,
            children: [
              CircularProgressIndicator(
                value: progress ?? 0.0,
                strokeWidth: 2,
                backgroundColor: Colors.grey.withValues(alpha: 0.3),
                valueColor: AlwaysStoppedAnimation<Color>(
                  AppTheme.lightTheme.colorScheme.secondary,
                ),
              ),
              Text(
                '${((progress ?? 0.0) * 100).toInt()}%',
                style: Theme.of(context).textTheme.labelSmall?.copyWith(
                      fontSize: 8.sp,
                      fontWeight: FontWeight.w600,
                    ),
              ),
            ],
          ),
        );

      case DownloadStatus.completed:
        return Container(
          width: 6.w,
          height: 6.w,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: Colors.green,
          ),
          child: CustomIconWidget(
            iconName: 'check',
            size: 3.w,
            color: Colors.white,
          ),
        );

      case DownloadStatus.failed:
        return GestureDetector(
          onTap: onRetry,
          child: Container(
            width: 6.w,
            height: 6.w,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: Colors.red,
            ),
            child: CustomIconWidget(
              iconName: 'refresh',
              size: 3.w,
              color: Colors.white,
            ),
          ),
        );
    }
  }
}
