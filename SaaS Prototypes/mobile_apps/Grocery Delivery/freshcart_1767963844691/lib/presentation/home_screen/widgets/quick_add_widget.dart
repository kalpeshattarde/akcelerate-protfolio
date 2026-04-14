import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class QuickAddWidget extends StatefulWidget {
  const QuickAddWidget({super.key});

  @override
  State<QuickAddWidget> createState() => _QuickAddWidgetState();
}

class _QuickAddWidgetState extends State<QuickAddWidget> {
  final Map<int, int> _quantities = {};

  final List<Map<String, dynamic>> _quickAddItems = [
    {
      "id": 1,
      "name": "Organic Bananas",
      "price": 2.99,
      "unit": "per lb",
      "image":
          "https://images.unsplash.com/photo-1565804212260-280f967e431b",
      "semanticLabel": "Fresh yellow bananas in a bunch on white background",
      "inStock": true,
    },
    {
      "id": 2,
      "name": "Fresh Milk",
      "price": 4.49,
      "unit": "1 gallon",
      "image":
          "https://images.unsplash.com/photo-1727075171760-9c381e32d8ae",
      "semanticLabel":
          "Glass of fresh white milk on wooden table with milk bottle in background",
      "inStock": true,
    },
    {
      "id": 3,
      "name": "Whole Wheat Bread",
      "price": 3.29,
      "unit": "per loaf",
      "image":
          "https://images.unsplash.com/photo-1596662841962-34034e1e6efc",
      "semanticLabel": "Sliced whole wheat bread loaf on wooden cutting board",
      "inStock": true,
    },
    {
      "id": 4,
      "name": "Free Range Eggs",
      "price": 5.99,
      "unit": "dozen",
      "image":
          "https://images.unsplash.com/photo-1493126955021-1f982a73d3e5",
      "semanticLabel":
          "Brown free-range eggs in cardboard carton on rustic wooden surface",
      "inStock": true,
    },
    {
      "id": 5,
      "name": "Greek Yogurt",
      "price": 6.49,
      "unit": "32 oz",
      "image":
          "https://images.unsplash.com/photo-1649240437402-8e46a4cdf6c8",
      "semanticLabel":
          "White bowl of creamy Greek yogurt with wooden spoon on marble surface",
      "inStock": false,
    },
  ];

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
                    Text(
                      'Quick Add',
                      style:
                          AppTheme.lightTheme.textTheme.headlineSmall?.copyWith(
                        fontWeight: FontWeight.w700,
                        color: AppTheme.lightTheme.colorScheme.onSurface,
                      ),
                    ),
                    SizedBox(height: 0.5.h),
                    Text(
                      'Your frequently purchased items',
                      style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                        color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                      ),
                    ),
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
            height: 32.h,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              padding: EdgeInsets.symmetric(horizontal: 4.w),
              itemCount: _quickAddItems.length,
              itemBuilder: (context, index) {
                final item = _quickAddItems[index];
                return _buildQuickAddCard(item);
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildQuickAddCard(Map<String, dynamic> item) {
    final itemId = item["id"] as int;
    final quantity = _quantities[itemId] ?? 0;
    final isInStock = item["inStock"] as bool;

    return Container(
      width: 40.w,
      margin: EdgeInsets.only(right: 3.w),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color:
                AppTheme.lightTheme.colorScheme.shadow.withValues(alpha: 0.08),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Product Image
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
                      imageUrl: item["image"] as String,
                      width: double.infinity,
                      height: double.infinity,
                      fit: BoxFit.cover,
                      semanticLabel: item["semanticLabel"] as String,
                    ),
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
                    item["name"] as String,
                    style: AppTheme.lightTheme.textTheme.titleSmall?.copyWith(
                      fontWeight: FontWeight.w600,
                      height: 1.2,
                    ),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                  SizedBox(height: 0.5.h),
                  Text(
                    item["unit"] as String,
                    style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                      color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                  const Spacer(),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        '\$${(item["price"] as double).toStringAsFixed(2)}',
                        style:
                            AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.w700,
                          color: AppTheme.lightTheme.colorScheme.primary,
                        ),
                      ),
                      isInStock
                          ? _buildQuantitySelector(itemId)
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

  Widget _buildQuantitySelector(int itemId) {
    final quantity = _quantities[itemId] ?? 0;

    return quantity == 0
        ? GestureDetector(
            onTap: () => _updateQuantity(itemId, 1),
            child: Container(
              width: 8.w,
              height: 8.w,
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.colorScheme.primary,
                borderRadius: BorderRadius.circular(8),
              ),
              child: CustomIconWidget(
                iconName: 'add',
                color: Colors.white,
                size: 4.w,
              ),
            ),
          )
        : Container(
            decoration: BoxDecoration(
              color: AppTheme.lightTheme.colorScheme.primary
                  .withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                GestureDetector(
                  onTap: () => _updateQuantity(itemId, quantity - 1),
                  child: Container(
                    width: 6.w,
                    height: 6.w,
                    decoration: BoxDecoration(
                      color: AppTheme.lightTheme.colorScheme.primary,
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: CustomIconWidget(
                      iconName: 'remove',
                      color: Colors.white,
                      size: 3.w,
                    ),
                  ),
                ),
                Container(
                  width: 8.w,
                  alignment: Alignment.center,
                  child: Text(
                    quantity.toString(),
                    style: AppTheme.lightTheme.textTheme.titleSmall?.copyWith(
                      fontWeight: FontWeight.w600,
                      color: AppTheme.lightTheme.colorScheme.primary,
                    ),
                  ),
                ),
                GestureDetector(
                  onTap: () => _updateQuantity(itemId, quantity + 1),
                  child: Container(
                    width: 6.w,
                    height: 6.w,
                    decoration: BoxDecoration(
                      color: AppTheme.lightTheme.colorScheme.primary,
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: CustomIconWidget(
                      iconName: 'add',
                      color: Colors.white,
                      size: 3.w,
                    ),
                  ),
                ),
              ],
            ),
          );
  }

  void _updateQuantity(int itemId, int newQuantity) {
    setState(() {
      if (newQuantity <= 0) {
        _quantities.remove(itemId);
      } else {
        _quantities[itemId] = newQuantity;
      }
    });
  }
}
