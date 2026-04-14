import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class VirtualTravelCard extends StatelessWidget {
  final Map<String, dynamic> destination;
  final VoidCallback onExplore;

  const VirtualTravelCard({
    Key? key,
    required this.destination,
    required this.onExplore,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
        width: 80.w,
        margin: EdgeInsets.only(right: 4.w),
        decoration:
            BoxDecoration(borderRadius: BorderRadius.circular(20), boxShadow: [
          BoxShadow(
              color: Colors.black.withValues(alpha: 0.15),
              blurRadius: 16,
              offset: Offset(0, 8)),
        ]),
        child: Stack(children: [
          ClipRRect(
              borderRadius: BorderRadius.circular(20),
              child: CustomImageWidget(
                  imageUrl: destination["image"] as String,
                  width: double.infinity,
                  height: 35.h,
                  fit: BoxFit.cover)),
          Container(
              decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(20),
                  gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [
                        Colors.transparent,
                        Colors.black.withValues(alpha: 0.7),
                      ]))),
          Positioned(
              top: 3.h,
              right: 4.w,
              child: Container(
                  padding: EdgeInsets.all(2.w),
                  decoration: BoxDecoration(
                      color: Colors.white.withValues(alpha: 0.2),
                      shape: BoxShape.circle),
                  child: CustomIconWidget(
                      iconName: 'three_sixty', color: Colors.white, size: 24))),
          Positioned(
              bottom: 0,
              left: 0,
              right: 0,
              child: Padding(
                  padding: EdgeInsets.all(5.w),
                  child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(children: [
                          CustomIconWidget(
                              iconName: 'location_on',
                              color: Colors.white,
                              size: 20),
                          SizedBox(width: 1.w),
                          Text(destination["country"] as String,
                              style: AppTheme.lightTheme.textTheme.bodyMedium
                                  ?.copyWith(
                                      color:
                                          Colors.white.withValues(alpha: 0.9),
                                      fontWeight: FontWeight.w500)),
                        ]),
                        SizedBox(height: 1.h),
                        Text(destination["name"] as String,
                            style: AppTheme.lightTheme.textTheme.headlineSmall
                                ?.copyWith(
                                    color: Colors.white,
                                    fontWeight: FontWeight.w700),
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis),
                        SizedBox(height: 1.h),
                        Text(destination["description"] as String,
                            style: AppTheme.lightTheme.textTheme.bodyMedium
                                ?.copyWith(
                                    color: Colors.white.withValues(alpha: 0.8)),
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis),
                        SizedBox(height: 2.h),
                        Row(children: [
                          Expanded(
                              child: ElevatedButton(
                                  onPressed: onExplore,
                                  style: ElevatedButton.styleFrom(
                                      backgroundColor: AppTheme
                                          .lightTheme.colorScheme.primary,
                                      foregroundColor: Colors.white,
                                      padding:
                                          EdgeInsets.symmetric(vertical: 1.5.h),
                                      shape: RoundedRectangleBorder(
                                          borderRadius:
                                              BorderRadius.circular(12))),
                                  child: Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.center,
                                      children: [
                                        CustomIconWidget(
                                            iconName: 'explore',
                                            color: Colors.white,
                                            size: 20),
                                        SizedBox(width: 2.w),
                                        Text('Explore Now',
                                            style: AppTheme
                                                .lightTheme.textTheme.titleSmall
                                                ?.copyWith(
                                                    color: Colors.white,
                                                    fontWeight:
                                                        FontWeight.w600)),
                                      ]))),
                          SizedBox(width: 3.w),
                          Container(
                              padding: EdgeInsets.all(1.5.h),
                              decoration: BoxDecoration(
                                  color: Colors.white.withValues(alpha: 0.2),
                                  borderRadius: BorderRadius.circular(12)),
                              child: CustomIconWidget(
                                  iconName: 'bookmark_border',
                                  color: Colors.white,
                                  size: 24)),
                        ]),
                      ]))),
        ]));
  }
}
