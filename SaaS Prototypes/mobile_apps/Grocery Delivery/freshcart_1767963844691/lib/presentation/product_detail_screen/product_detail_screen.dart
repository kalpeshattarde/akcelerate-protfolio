import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../theme/app_theme.dart';
import '../../widgets/custom_bottom_bar.dart';
import '../../widgets/main_layout_wrapper.dart';
import './widgets/expandable_section.dart';
import './widgets/product_info_section.dart';
import './widgets/product_reviews_section.dart';
import './widgets/quantity_selector.dart';
import './widgets/related_products_section.dart';

class ProductDetailScreen extends StatefulWidget {
  const ProductDetailScreen({super.key});

  @override
  State<ProductDetailScreen> createState() => _ProductDetailScreenState();
}

class _ProductDetailScreenState extends State<ProductDetailScreen> {
  int _quantity = 1;
  bool _isWishlisted = false;
  bool _isAddingToCart = false;
  int _cartItemCount = 0;

  // Mock product data
  final Map<String, dynamic> _productData = {
    "id": 1,
    "name": "Organic Bananas",
    "brand": "Fresh Farms",
    "price": "\$3.99",
    "originalPrice": "\$4.99",
    "discount": 20,
    "rating": 4.5,
    "reviewCount": 128,
    "inStock": true,
    "stockCount": 15,
    "description":
        """Fresh, organic bananas sourced directly from sustainable farms. 
    These premium bananas are perfect for snacking, smoothies, or baking. 
    Rich in potassium, vitamin B6, and dietary fiber.""",
    "ingredients": "100% Organic Bananas",
    "nutritionFacts": """Per 100g:
    • Calories: 89
    • Carbohydrates: 23g
    • Dietary Fiber: 2.6g
    • Sugars: 12g
    • Protein: 1.1g
    • Potassium: 358mg
    • Vitamin B6: 0.4mg""",
    "images": [
      "https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/5966630/pexels-photo-5966630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/2238309/pexels-photo-2238309.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    "semanticLabels": [
      "Fresh yellow bananas arranged in a bunch on a white background",
      "Close-up view of ripe organic bananas with natural spots showing ripeness",
      "Single peeled banana showing the creamy white flesh inside"
    ]
  };

  // Mock reviews data
  final List<Map<String, dynamic>> _reviewsData = [
    {
      "id": 1,
      "userName": "Sarah Johnson",
      "userAvatar":
          "https://images.unsplash.com/photo-1539813349302-cf36e01e5795",
      "userAvatarSemanticLabel":
          "Profile photo of a smiling woman with blonde hair wearing a blue shirt",
      "rating": 5,
      "date": "2 days ago",
      "comment":
          "These bananas are absolutely perfect! Sweet, fresh, and arrived in excellent condition. Will definitely order again.",
      "helpfulCount": 12,
      "notHelpfulCount": 1
    },
    {
      "id": 2,
      "userName": "Mike Chen",
      "userAvatar":
          "https://images.unsplash.com/photo-1687256457585-3608dfa736c5",
      "userAvatarSemanticLabel":
          "Profile photo of an Asian man with short black hair wearing glasses and a white t-shirt",
      "rating": 4,
      "date": "1 week ago",
      "comment":
          "Great quality bananas, perfect for my morning smoothies. Only minor issue was one banana was a bit overripe.",
      "helpfulCount": 8,
      "notHelpfulCount": 0
    },
    {
      "id": 3,
      "userName": "Emma Rodriguez",
      "userAvatar":
          "https://images.unsplash.com/photo-1639214815013-b148933615e6",
      "userAvatarSemanticLabel":
          "Profile photo of a Hispanic woman with long dark hair wearing a green sweater",
      "rating": 5,
      "date": "2 weeks ago",
      "comment":
          "Excellent organic bananas! My kids love them and I feel good knowing they're pesticide-free.",
      "helpfulCount": 15,
      "notHelpfulCount": 2
    }
  ];

  // Mock related products data
  final List<Map<String, dynamic>> _relatedProducts = [
    {
      "id": 2,
      "name": "Organic Apples",
      "brand": "Fresh Farms",
      "price": "\$4.99",
      "image": "https://images.unsplash.com/photo-1508431822127-707daa5c7f21",
      "semanticLabel":
          "Fresh red apples with green leaves arranged in a wooden basket"
    },
    {
      "id": 3,
      "name": "Fresh Strawberries",
      "brand": "Berry Best",
      "price": "\$5.99",
      "image": "https://images.unsplash.com/photo-1640958899516-c08a59225611",
      "semanticLabel":
          "Bright red strawberries with green tops arranged on a white plate"
    },
    {
      "id": 4,
      "name": "Organic Oranges",
      "brand": "Citrus Grove",
      "price": "\$3.49",
      "image": "https://images.unsplash.com/photo-1650978908957-17183c684360",
      "semanticLabel":
          "Fresh orange citrus fruits cut in half showing the juicy interior"
    },
    {
      "id": 5,
      "name": "Fresh Blueberries",
      "brand": "Berry Best",
      "price": "\$6.99",
      "image": "https://images.unsplash.com/photo-1468165196271-4e91eae54eb2",
      "semanticLabel":
          "Fresh blueberries scattered on a white surface with some in a small bowl"
    }
  ];

  bool _isFavorite = false;

  @override
  Widget build(BuildContext context) {
    // Get the current tab index from MainLayoutWrapper
    final parentState = MainLayoutWrapper.of(context);
    final currentTabIndex = parentState?.currentIndex ?? 0;

    return Scaffold(
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      body: NestedScrollView(
        headerSliverBuilder: (BuildContext context, bool innerBoxIsScrolled) {
          return <Widget>[
            SliverOverlapAbsorber(
              handle: NestedScrollView.sliverOverlapAbsorberHandleFor(context),
              sliver: SliverAppBar(
                leading: IconButton(
                  icon: const Icon(Icons.arrow_back),
                  onPressed: () => Navigator.pop(context),
                ),
                title: null,
                pinned: true,
                floating: false,
                snap: false,
                elevation: 0,
                backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
                foregroundColor: AppTheme.lightTheme.colorScheme.onSurface,
                surfaceTintColor: Colors.transparent,
                scrolledUnderElevation: 2,
                shadowColor: AppTheme.lightTheme.colorScheme.shadow
                    .withValues(alpha: 0.1),
                actions: [
                  IconButton(
                    icon: Icon(
                      _isFavorite ? Icons.favorite : Icons.favorite_border,
                      color: _isFavorite
                          ? AppTheme.lightTheme.colorScheme.error
                          : AppTheme.lightTheme.colorScheme.onSurface,
                    ),
                    onPressed: _toggleFavorite,
                    tooltip: 'Add to wishlist',
                  ),
                  IconButton(
                    icon: const Icon(Icons.share_outlined),
                    onPressed: _shareProduct,
                    tooltip: 'Share product',
                  ),
                ],
              ),
            ),
          ];
        },
        body: _buildMainContent(),
      ),
      bottomNavigationBar: CustomBottomBar(
        currentIndex: currentTabIndex,
        onTap: (index) {
          // Update parent tab index and pop detail screen
          parentState?.updateTabIndex(index);
          if (index != currentTabIndex) {
            Navigator.pop(context);
          }
        },
        variant: BottomBarVariant.primary,
      ),
    );
  }

  Widget _buildMainContent() {
    return Builder(
      builder: (BuildContext context) {
        return CustomScrollView(
          slivers: [
            SliverOverlapInjector(
              handle: NestedScrollView.sliverOverlapAbsorberHandleFor(context),
            ),
            SliverToBoxAdapter(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  ProductInfoSection(
                    product: _productData,
                    isWishlisted: _isWishlisted,
                    onWishlistToggle: _toggleWishlist,
                  ),
                  if (_productData['inStock'] as bool)
                    QuantitySelector(
                      quantity: _quantity,
                      onQuantityChanged: (newQuantity) {
                        setState(() {
                          _quantity = newQuantity;
                        });
                      },
                      maxQuantity: _productData['stockCount'] as int,
                      enabled: !_isAddingToCart,
                    ),
                  SizedBox(height: 2.h),
                  ExpandableSection(
                    title: 'Product Overview',
                    initiallyExpanded: true,
                    content: Text(
                      _productData['description'] as String,
                      style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                        color: AppTheme.lightTheme.colorScheme.onSurface,
                        height: 1.5,
                      ),
                    ),
                  ),
                  ExpandableSection(
                    title: 'Ingredients',
                    content: Text(
                      _productData['ingredients'] as String,
                      style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                        color: AppTheme.lightTheme.colorScheme.onSurface,
                        height: 1.5,
                      ),
                    ),
                  ),
                  ExpandableSection(
                    title: 'Nutrition Facts',
                    content: Text(
                      _productData['nutritionFacts'] as String,
                      style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                        color: AppTheme.lightTheme.colorScheme.onSurface,
                        height: 1.5,
                      ),
                    ),
                  ),
                  SizedBox(height: 3.h),
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: 4.w),
                    child: Text(
                      'Customer Reviews',
                      style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                        fontWeight: FontWeight.w700,
                        color: AppTheme.lightTheme.colorScheme.onSurface,
                      ),
                    ),
                  ),
                  SizedBox(height: 2.h),
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: 4.w),
                    child: ProductReviewsSection(
                      reviews: _reviewsData,
                      averageRating: _productData['rating'] as double,
                      totalReviews: _productData['reviewCount'] as int,
                    ),
                  ),
                  SizedBox(height: 4.h),
                  RelatedProductsSection(
                    relatedProducts: _relatedProducts,
                  ),
                  SizedBox(height: 12.h), // Bottom padding for nav bar
                ],
              ),
            ),
          ],
        );
      },
    );
  }

  Widget _buildAddToCartSection() {
    return Container(
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        boxShadow: [
          BoxShadow(
            color:
                AppTheme.lightTheme.colorScheme.shadow.withValues(alpha: 0.1),
            blurRadius: 8,
            offset: Offset(0, -2),
          ),
        ],
      ),
      child: SafeArea(
        child: Row(
          children: [
            Expanded(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Total Price',
                    style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                      color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                  Text(
                    _calculateTotalPrice(),
                    style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.w700,
                      color: AppTheme.lightTheme.colorScheme.primary,
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(width: 4.w),
            Expanded(
              flex: 2,
              child: ElevatedButton(
                onPressed: _isAddingToCart ? null : _addToCart,
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppTheme.lightTheme.colorScheme.secondary,
                  foregroundColor: AppTheme.lightTheme.colorScheme.onSecondary,
                  padding: EdgeInsets.symmetric(vertical: 2.h),
                ),
                child: _isAddingToCart
                    ? SizedBox(
                        height: 20,
                        width: 20,
                        child: CircularProgressIndicator(
                          strokeWidth: 2,
                          valueColor: AlwaysStoppedAnimation<Color>(
                            AppTheme.lightTheme.colorScheme.onSecondary,
                          ),
                        ),
                      )
                    : Text(
                        'Add to Cart',
                        style:
                            AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.w600,
                          color: AppTheme.lightTheme.colorScheme.onSecondary,
                        ),
                      ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  String _calculateTotalPrice() {
    final priceString = _productData['price'] as String;
    final price = double.parse(priceString.replaceAll('\$', ''));
    final total = price * _quantity;
    return '\$${total.toStringAsFixed(2)}';
  }

  void _toggleWishlist() {
    HapticFeedback.lightImpact();
    setState(() {
      _isWishlisted = !_isWishlisted;
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content:
            Text(_isWishlisted ? 'Added to wishlist' : 'Removed from wishlist'),
        backgroundColor: _isWishlisted
            ? AppTheme.lightTheme.colorScheme.secondary
            : AppTheme.lightTheme.colorScheme.onSurfaceVariant,
        duration: Duration(seconds: 2),
      ),
    );
  }

  Future<void> _addToCart() async {
    HapticFeedback.mediumImpact();
    setState(() {
      _isAddingToCart = true;
    });

    // Simulate API call
    await Future.delayed(Duration(milliseconds: 800));

    setState(() {
      _isAddingToCart = false;
      _cartItemCount += _quantity;
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('${_productData['name']} added to cart!'),
        backgroundColor: AppTheme.lightTheme.colorScheme.secondary,
        duration: Duration(seconds: 2),
        action: SnackBarAction(
          label: 'View Cart',
          textColor: AppTheme.lightTheme.colorScheme.onSecondary,
          onPressed: _navigateToCart,
        ),
      ),
    );
  }

  void _shareProduct() {
    HapticFeedback.lightImpact();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Share feature coming soon!'),
        backgroundColor: AppTheme.lightTheme.colorScheme.primary,
      ),
    );
  }

  void _navigateToCart() {
    HapticFeedback.lightImpact();
    Navigator.pushNamed(context, '/shopping-cart-screen');
  }

  void _toggleFavorite() {
    setState(() {
      _isFavorite = !_isFavorite;
    });
  }
}
