import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';

import '../../../../core/app_export.dart';
import '../../../widgets/custom_image_widget.dart';

class FeaturedCarouselWidget extends StatefulWidget {
  const FeaturedCarouselWidget({Key? key}) : super(key: key);

  @override
  State<FeaturedCarouselWidget> createState() => _FeaturedCarouselWidgetState();
}

class _FeaturedCarouselWidgetState extends State<FeaturedCarouselWidget> {
  int _currentIndex = 0;
  final CarouselSliderController _carouselController =
      CarouselSliderController();

  final List<Map<String, dynamic>> _featuredContent = [
    {
      "id": 1,
      "title": "Summer Vibes 2026",
      "subtitle": "Hot tracks for sunny days",
      "image":
          "https://img.rocket.new/generatedImages/rocket_gen_img_143ae33c1-1765228881469.png",
      "semanticLabel":
          "Colorful summer music festival scene with crowd dancing under bright lights and confetti",
      "gradient": [Color(0xFFFF6B6B), Color(0xFFFFE66D)],
    },
    {
      "id": 2,
      "title": "Midnight Jazz",
      "subtitle": "Smooth jazz for late nights",
      "image":
          "https://img.rocket.new/generatedImages/rocket_gen_img_141c3404a-1766719664193.png",
      "semanticLabel":
          "Dimly lit jazz club with saxophone player performing on stage under warm spotlight",
      "gradient": [Color(0xFF4A148C), Color(0xFF1A237E)],
    },
    {
      "id": 3,
      "title": "Workout Energy",
      "subtitle": "High-energy beats to power your workout",
      "image":
          "https://img.rocket.new/generatedImages/rocket_gen_img_1d9012db6-1764730666719.png",
      "semanticLabel":
          "Athletic person running on treadmill in modern gym with energetic lighting",
      "gradient": [Color(0xFFE91E63), Color(0xFF9C27B0)],
    },
  ];

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Column(
      children: [
        CarouselSlider.builder(
          carouselController: _carouselController,
          itemCount: _featuredContent.length,
          options: CarouselOptions(
            height: 180,
            viewportFraction: 0.9,
            enlargeCenterPage: true,
            autoPlay: true,
            autoPlayInterval: const Duration(seconds: 5),
            autoPlayAnimationDuration: const Duration(milliseconds: 800),
            autoPlayCurve: Curves.easeInOutCubic,
            onPageChanged: (index, reason) {
              setState(() {
                _currentIndex = index;
              });
            },
          ),
          itemBuilder: (context, index, realIndex) {
            final item = _featuredContent[index];
            return _buildFeaturedCard(item, theme);
          },
        ),
        const SizedBox(height: 12),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: List.generate(
            _featuredContent.length,
            (index) => Container(
              width: _currentIndex == index ? 24 : 8,
              height: 8,
              margin: const EdgeInsets.symmetric(horizontal: 4),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(4),
                color: _currentIndex == index
                    ? theme.colorScheme.primary
                    : theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.3),
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildFeaturedCard(Map<String, dynamic> item, ThemeData theme) {
    return GestureDetector(
      onTap: () {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Opening ${item["title"]}'),
            behavior: SnackBarBehavior.floating,
            duration: const Duration(seconds: 1),
          ),
        );
      },
      child: Container(
        width: double.infinity,
        margin: const EdgeInsets.symmetric(horizontal: 4),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(16),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.3),
              blurRadius: 12,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(16),
          child: Stack(
            fit: StackFit.expand,
            children: [
              CustomImageWidget(
                imageUrl: item["image"] as String,
                width: double.infinity,
                height: 180,
                fit: BoxFit.cover,
                semanticLabel: item["semanticLabel"] as String,
              ),
              Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [
                      Colors.transparent,
                      Colors.black.withValues(alpha: 0.7),
                    ],
                  ),
                ),
              ),
              Positioned(
                left: 16,
                right: 16,
                bottom: 16,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      item["title"] as String,
                      style: theme.textTheme.titleLarge?.copyWith(
                        color: Colors.white,
                        fontWeight: FontWeight.w700,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                    const SizedBox(height: 4),
                    Text(
                      item["subtitle"] as String,
                      style: theme.textTheme.bodyMedium?.copyWith(
                        color: Colors.white.withValues(alpha: 0.9),
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
