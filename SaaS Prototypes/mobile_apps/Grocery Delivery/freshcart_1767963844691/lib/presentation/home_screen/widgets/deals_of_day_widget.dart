import 'dart:async';

import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class DealsOfDayWidget extends StatefulWidget {
  const DealsOfDayWidget({super.key});

  @override
  State<DealsOfDayWidget> createState() => _DealsOfDayWidgetState();
}

class _DealsOfDayWidgetState extends State<DealsOfDayWidget> {
  Timer? _timer;
  Duration _timeRemaining = const Duration(hours: 23, minutes: 45, seconds: 30);

  final List<Map<String, dynamic>> _deals = [
    {
      "id": 1,
      "name": "Premium Avocados",
      "originalPrice": 8.99,
      "salePrice": 5.99,
      "discount": 33,
      "unit": "pack of 6",
      "image":
          "https://images.unsplash.com/photo-1730541416908-a6e61b86f60b",
      "semanticLabel":
          "Fresh ripe avocados cut in half showing green flesh and brown pit",
      "rating": 4.8,
      "reviewCount": 124,
      "inStock": true,
    },
    {
      "id": 2,
      "name": "Organic Strawberries",
      "originalPrice": 6.49,
      "salePrice": 3.99,
      "discount": 38,
      "unit": "1 lb container",
      "image":
          "https://images.unsplash.com/photo-1673635352332-e531c14a77f5",
      "semanticLabel":
          "Fresh red strawberries with green leaves in clear plastic container",
      "rating": 4.9,
      "reviewCount": 89,
      "inStock": true,
    },
    {
      "id": 3,
      "name": "Wild Caught Salmon",
      "originalPrice": 24.99,
      "salePrice": 18.99,
      "discount": 24,
      "unit": "per lb",
      "image":
          "https://images.unsplash.com/photo-1692213982191-6c42a5695323",
      "semanticLabel":
          "Fresh salmon fillet with pink flesh on ice with lemon slices and herbs",
      "rating": 4.7,
      "reviewCount": 156,
      "inStock": true,
    },
    {
      "id": 4,
      "name": "Artisan Cheese Selection",
      "originalPrice": 15.99,
      "salePrice": 11.99,
      "discount": 25,
      "unit": "variety pack",
      "image":
          "https://images.unsplash.com/photo-1701884781069-2d54feca4928",
      "semanticLabel":
          "Assorted artisan cheeses on wooden board with grapes and crackers",
      "rating": 4.6,
      "reviewCount": 78,
      "inStock": false,
    },
  ];

  @override
  void initState() {
    super.initState();
    _startCountdown();
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  void _startCountdown() {
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_timeRemaining.inSeconds > 0) {
        setState(() {
          _timeRemaining = Duration(seconds: _timeRemaining.inSeconds - 1);
        });
      } else {
        timer.cancel();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(vertical: 2.h),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 4.w),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        CustomIconWidget(
                          iconName: 'local_fire_department',
                          color: AppTheme.lightTheme.colorScheme.error,
                          size: 6.w,
                        ),
                        SizedBox(width: 2.w),
                        Text(
                          'Deals of the Day',
                          style: AppTheme.lightTheme.textTheme.headlineSmall
                              ?.copyWith(
                            fontWeight: FontWeight.w700,
                            color: AppTheme.lightTheme.colorScheme.onSurface,
                          ),
                        ),
                      ],
                    ),
                    SizedBox(height: 0.5.h),
                    _buildCountdownTimer(),
                  ],
                ),
                TextButton(
                  onPressed: () =>
                      Navigator.pushNamed(context, '/search-screen'),
                  child: Text(
                    'View All',
                    style: AppTheme.lightTheme.textTheme.titleSmall?.copyWith(
                      color: AppTheme.lightTheme.colorScheme.primary,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ],
            ),
          ),
          SizedBox(height: 2.h),
          SizedBox(
            height: 35.h,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              padding: EdgeInsets.symmetric(horizontal: 4.w),
              itemCount: _deals.length,
              itemBuilder: (context, index) {
                final deal = _deals[index];
                return _buildDealCard(deal);
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCountdownTimer() {
    final hours = _timeRemaining.inHours;
    final minutes = _timeRemaining.inMinutes % 60;
    final seconds = _timeRemaining.inSeconds % 60;

    return Container(
      padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.error.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: AppTheme.lightTheme.colorScheme.error.withValues(alpha: 0.3),
          width: 1,
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          CustomIconWidget(
            iconName: 'access_time',
            color: AppTheme.lightTheme.colorScheme.error,
            size: 4.w,
          ),
          SizedBox(width: 1.w),
          Text(
            'Ends in ${hours.toString().padLeft(2, '0')}:${minutes.toString().padLeft(2, '0')}:${seconds.toString().padLeft(2, '0')}',
            style: AppTheme.lightTheme.textTheme.labelLarge?.copyWith(
              color: AppTheme.lightTheme.colorScheme.error,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDealCard(Map<String, dynamic> deal) {
    final isInStock = deal["inStock"] as bool;
    final discount = deal["discount"] as int;

    return Container(
      width: 45.w,
      margin: EdgeInsets.only(right: 3.w),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color:
                AppTheme.lightTheme.colorScheme.shadow.withValues(alpha: 0.1),
            blurRadius: 12,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Product Image with Discount Badge
          Expanded(
            flex: 3,
            child: Container(
              width: double.infinity,
              decoration: const BoxDecoration(
                borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
              ),
              child: ClipRRect(
                borderRadius:
                    const BorderRadius.vertical(top: Radius.circular(16)),
                child: Stack(
                  children: [
                    CustomImageWidget(
                      imageUrl: deal["image"] as String,
                      width: double.infinity,
                      height: double.infinity,
                      fit: BoxFit.cover,
                      semanticLabel: deal["semanticLabel"] as String,
                    ),
                    // Discount Badge
                    Positioned(
                      top: 2.w,
                      left: 2.w,
                      child: Container(
                        padding: EdgeInsets.symmetric(
                            horizontal: 2.w, vertical: 0.5.h),
                        decoration: BoxDecoration(
                          color: AppTheme.lightTheme.colorScheme.error,
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Text(
                          '$discount% OFF',
                          style: AppTheme.lightTheme.textTheme.labelSmall
                              ?.copyWith(
                            color: Colors.white,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                      ),
                    ),
                    // Out of Stock Overlay
                    if (!isInStock)
                      Positioned.fill(
                        child: Container(
                          color: Colors.black.withValues(alpha: 0.5),
                          child: Center(
                            child: Container(
                              padding: EdgeInsets.symmetric(
                                  horizontal: 3.w, vertical: 1.h),
                              decoration: BoxDecoration(
                                color: AppTheme.lightTheme.colorScheme.error,
                                borderRadius: BorderRadius.circular(20),
                              ),
                              child: Text(
                                'Out of Stock',
                                style: AppTheme.lightTheme.textTheme.labelSmall
                                    ?.copyWith(
                                  color: Colors.white,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
                  ],
                ),
              ),
            ),
          ),
          // Product Details
          Expanded(
            flex: 2,
            child: Padding(
              padding: EdgeInsets.all(3.w),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    deal["name"] as String,
                    style: AppTheme.lightTheme.textTheme.titleSmall?.copyWith(
                      fontWeight: FontWeight.w600,
                      height: 1.2,
                    ),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                  SizedBox(height: 0.5.h),
                  Text(
                    deal["unit"] as String,
                    style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                      color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                  SizedBox(height: 1.h),
                  // Rating
                  Row(
                    children: [
                      CustomIconWidget(
                        iconName: 'star',
                        color: Colors.amber,
                        size: 3.5.w,
                      ),
                      SizedBox(width: 1.w),
                      Text(
                        '${deal["rating"]} (${deal["reviewCount"]})',
                        style:
                            AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                          color:
                              AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                        ),
                      ),
                    ],
                  ),
                  const Spacer(),
                  // Price and Add Button
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            '\$${(deal["salePrice"] as double).toStringAsFixed(2)}',
                            style: AppTheme.lightTheme.textTheme.titleMedium
                                ?.copyWith(
                              fontWeight: FontWeight.w700,
                              color: AppTheme.lightTheme.colorScheme.primary,
                            ),
                          ),
                          Text(
                            '\$${(deal["originalPrice"] as double).toStringAsFixed(2)}',
                            style: AppTheme.lightTheme.textTheme.bodySmall
                                ?.copyWith(
                              color: AppTheme
                                  .lightTheme.colorScheme.onSurfaceVariant,
                              decoration: TextDecoration.lineThrough,
                            ),
                          ),
                        ],
                      ),
                      isInStock
                          ? GestureDetector(
                              onTap: () => _addToCart(deal["id"] as int),
                              child: Container(
                                width: 8.w,
                                height: 8.w,
                                decoration: BoxDecoration(
                                  color:
                                      AppTheme.lightTheme.colorScheme.primary,
                                  borderRadius: BorderRadius.circular(8),
                                ),
                                child: CustomIconWidget(
                                  iconName: 'add',
                                  color: Colors.white,
                                  size: 4.w,
                                ),
                              ),
                            )
                          : const SizedBox.shrink(),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  void _addToCart(int dealId) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: const Text('Item added to cart'),
        duration: const Duration(seconds: 2),
        action: SnackBarAction(
          label: 'View Cart',
          onPressed: () =>
              Navigator.pushNamed(context, '/shopping-cart-screen'),
        ),
      ),
    );
  }
}
