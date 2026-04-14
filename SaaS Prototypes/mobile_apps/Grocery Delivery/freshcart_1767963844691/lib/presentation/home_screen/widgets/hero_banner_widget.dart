import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class HeroBannerWidget extends StatefulWidget {
  const HeroBannerWidget({super.key});

  @override
  State<HeroBannerWidget> createState() => _HeroBannerWidgetState();
}

class _HeroBannerWidgetState extends State<HeroBannerWidget> {
  int _currentIndex = 0;
  final CarouselSliderController _carouselController =
      CarouselSliderController();

  final List<Map<String, dynamic>> _bannerData = [
    {
      "id": 1,
      "title": "Fresh Organic Vegetables",
      "subtitle": "Up to 40% OFF",
      "description": "Farm-fresh organic produce delivered to your doorstep",
      "image":
          "https://images.unsplash.com/photo-1667988672217-10a31d5cca30",
      "semanticLabel":
          "Fresh organic vegetables including broccoli, carrots, and leafy greens arranged in a wooden basket",
      "backgroundColor": Color(0xFF4CAF50),
      "textColor": Colors.white,
    },
    {
      "id": 2,
      "title": "Premium Dairy Products",
      "subtitle": "Buy 2 Get 1 FREE",
      "description": "Fresh milk, cheese, and yogurt from local farms",
      "image":
          "https://images.unsplash.com/photo-1558475890-1ebfc06edcf5",
      "semanticLabel":
          "Glass bottles of fresh milk and various dairy products on a rustic wooden table",
      "backgroundColor": Color(0xFF2196F3),
      "textColor": Colors.white,
    },
    {
      "id": 3,
      "title": "Seasonal Fruits",
      "subtitle": "Starting at \$2.99",
      "description": "Sweet and juicy fruits picked at perfect ripeness",
      "image":
          "https://images.unsplash.com/photo-1592060133206-422e97c60097",
      "semanticLabel":
          "Colorful assortment of fresh seasonal fruits including apples, oranges, and berries in a wicker basket",
      "backgroundColor": Color(0xFFFF9800),
      "textColor": Colors.white,
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 45.h,
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
      child: Column(
        children: [
          Expanded(
            child: CarouselSlider.builder(
              carouselController: _carouselController,
              itemCount: _bannerData.length,
              itemBuilder: (context, index, realIndex) {
                final banner = _bannerData[index];
                return _buildBannerCard(banner);
              },
              options: CarouselOptions(
                height: double.infinity,
                viewportFraction: 0.92,
                enlargeCenterPage: true,
                enlargeFactor: 0.2,
                autoPlay: true,
                autoPlayInterval: const Duration(seconds: 4),
                autoPlayAnimationDuration: const Duration(milliseconds: 800),
                autoPlayCurve: Curves.fastOutSlowIn,
                onPageChanged: (index, reason) {
                  setState(() {
                    _currentIndex = index;
                  });
                },
              ),
            ),
          ),
          SizedBox(height: 2.h),
          _buildIndicators(),
        ],
      ),
    );
  }

  Widget _buildBannerCard(Map<String, dynamic> banner) {
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(16),
        gradient: LinearGradient(
          colors: [
            (banner["backgroundColor"] as Color).withValues(alpha: 0.9),
            (banner["backgroundColor"] as Color),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        boxShadow: [
          BoxShadow(
            color:
                AppTheme.lightTheme.colorScheme.shadow.withValues(alpha: 0.15),
            blurRadius: 12,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(16),
        child: Stack(
          children: [
            // Background Image
            Positioned.fill(
              child: CustomImageWidget(
                imageUrl: banner["image"] as String,
                fit: BoxFit.cover,
                semanticLabel: banner["semanticLabel"] as String,
              ),
            ),
            // Gradient Overlay
            Positioned.fill(
              child: Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [
                      (banner["backgroundColor"] as Color)
                          .withValues(alpha: 0.7),
                      (banner["backgroundColor"] as Color)
                          .withValues(alpha: 0.3),
                    ],
                    begin: Alignment.centerLeft,
                    end: Alignment.centerRight,
                  ),
                ),
              ),
            ),
            // Content
            Positioned(
              left: 6.w,
              top: 4.h,
              bottom: 4.h,
              right: 6.w,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    banner["subtitle"] as String,
                    style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                      color: banner["textColor"] as Color,
                      fontWeight: FontWeight.w600,
                      letterSpacing: 0.5,
                    ),
                  ),
                  SizedBox(height: 1.h),
                  Text(
                    banner["title"] as String,
                    style:
                        AppTheme.lightTheme.textTheme.headlineSmall?.copyWith(
                      color: banner["textColor"] as Color,
                      fontWeight: FontWeight.w700,
                      height: 1.2,
                    ),
                  ),
                  SizedBox(height: 1.h),
                  Text(
                    banner["description"] as String,
                    style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                      color:
                          (banner["textColor"] as Color).withValues(alpha: 0.9),
                      height: 1.4,
                    ),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                  SizedBox(height: 2.h),
                  ElevatedButton(
                    onPressed: () => _handleShopNow(banner["id"] as int),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.white,
                      foregroundColor: banner["backgroundColor"] as Color,
                      padding: EdgeInsets.symmetric(
                          horizontal: 6.w, vertical: 1.5.h),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(25),
                      ),
                      elevation: 2,
                    ),
                    child: Text(
                      'Shop Now',
                      style: AppTheme.lightTheme.textTheme.titleSmall?.copyWith(
                        fontWeight: FontWeight.w600,
                        letterSpacing: 0.2,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildIndicators() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: _bannerData.asMap().entries.map((entry) {
        final isActive = entry.key == _currentIndex;
        return GestureDetector(
          onTap: () => _carouselController.animateToPage(entry.key),
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 300),
            width: isActive ? 8.w : 2.w,
            height: 1.h,
            margin: EdgeInsets.symmetric(horizontal: 1.w),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(4),
              color: isActive
                  ? AppTheme.lightTheme.colorScheme.primary
                  : AppTheme.lightTheme.colorScheme.outline
                      .withValues(alpha: 0.3),
            ),
          ),
        );
      }).toList(),
    );
  }

  void _handleShopNow(int bannerId) {
    Navigator.pushNamed(context, '/search-screen');
  }
}
