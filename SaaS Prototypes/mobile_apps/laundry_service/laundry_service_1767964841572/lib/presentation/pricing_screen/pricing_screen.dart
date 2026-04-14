import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/empty_search_widget.dart';
import './widgets/expandable_section_widget.dart';
import './widgets/filter_chips_widget.dart';
import './widgets/garment_details_bottom_sheet.dart';
import './widgets/promotional_banner_widget.dart';
import './widgets/search_bar_widget.dart';

class PricingScreen extends StatefulWidget {
  const PricingScreen({Key? key}) : super(key: key);

  @override
  State<PricingScreen> createState() => _PricingScreenState();
}

class _PricingScreenState extends State<PricingScreen> {
  final TextEditingController _searchController = TextEditingController();
  String _selectedFilter = 'Both';
  String _searchQuery = '';
  DateTime _lastUpdated = DateTime.now();

  final List<String> _filterOptions = ['Both', 'Wash & Fold', 'Dry Clean'];

  final List<Map<String, dynamic>> _promotionalBanners = [
    {
      "title": "New Year Special",
      "description": "Get 20% off on all dry cleaning services",
      "imageUrl":
          "https://images.pexels.com/photos/5591663/pexels-photo-5591663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "buttonText": "Book Now",
    },
  ];

  final List<Map<String, dynamic>> _garmentCategories = [
    {
      "category": "Shirts & Tops",
      "items": [
        {
          "name": "Formal Shirt",
          "description":
              "Professional dress shirts with crisp finishing and careful attention to collar and cuff details.",
          "washFoldPrice": 45.0,
          "dryCleanPrice": 80.0,
          "processingTime": "24-48 hrs",
          "careInstructions":
              "Machine wash cold, hang dry, iron on medium heat. Avoid bleach and fabric softener.",
        },
        {
          "name": "Casual T-Shirt",
          "description":
              "Comfortable cotton t-shirts with gentle care to maintain fabric softness and color vibrancy.",
          "washFoldPrice": 25.0,
          "dryCleanPrice": 0.0,
          "processingTime": "24 hrs",
          "careInstructions":
              "Machine wash cold with like colors, tumble dry low, avoid high heat.",
        },
        {
          "name": "Polo Shirt",
          "description":
              "Premium polo shirts with special care for collar shape and fabric texture preservation.",
          "washFoldPrice": 35.0,
          "dryCleanPrice": 65.0,
          "processingTime": "24-48 hrs",
          "careInstructions":
              "Wash inside out in cold water, reshape while damp, air dry preferred.",
        },
        {
          "name": "Blouse",
          "description":
              "Delicate women's blouses requiring gentle handling and professional pressing techniques.",
          "washFoldPrice": 40.0,
          "dryCleanPrice": 75.0,
          "processingTime": "24-48 hrs",
          "careInstructions":
              "Hand wash or gentle cycle, use mild detergent, iron on low heat with pressing cloth.",
        },
      ],
    },
    {
      "category": "Pants & Trousers",
      "items": [
        {
          "name": "Formal Trousers",
          "description":
              "Business trousers with professional creasing and careful attention to fabric care.",
          "washFoldPrice": 55.0,
          "dryCleanPrice": 95.0,
          "processingTime": "48 hrs",
          "careInstructions":
              "Dry clean recommended for best results, hang immediately after cleaning.",
        },
        {
          "name": "Jeans",
          "description":
              "Denim care with color preservation and shape maintenance for long-lasting wear.",
          "washFoldPrice": 40.0,
          "dryCleanPrice": 0.0,
          "processingTime": "24-48 hrs",
          "careInstructions":
              "Wash inside out in cold water, air dry to prevent shrinkage, minimal ironing needed.",
        },
        {
          "name": "Chinos",
          "description":
              "Casual cotton trousers with careful pressing to maintain crisp appearance.",
          "washFoldPrice": 45.0,
          "dryCleanPrice": 85.0,
          "processingTime": "24-48 hrs",
          "careInstructions":
              "Machine wash warm, tumble dry medium, iron while slightly damp for best results.",
        },
      ],
    },
    {
      "category": "Dresses & Skirts",
      "items": [
        {
          "name": "Cocktail Dress",
          "description":
              "Elegant evening wear requiring specialized cleaning and careful handling of delicate fabrics.",
          "washFoldPrice": 0.0,
          "dryCleanPrice": 150.0,
          "processingTime": "72 hrs",
          "careInstructions":
              "Professional dry cleaning only, store on padded hangers, avoid direct sunlight.",
        },
        {
          "name": "Casual Dress",
          "description":
              "Everyday dresses with gentle care to maintain fabric quality and color brightness.",
          "washFoldPrice": 60.0,
          "dryCleanPrice": 110.0,
          "processingTime": "48 hrs",
          "careInstructions":
              "Machine wash cold, gentle cycle, hang dry, iron on appropriate heat setting.",
        },
        {
          "name": "Pencil Skirt",
          "description":
              "Professional skirts with precise pressing to maintain sharp lines and professional appearance.",
          "washFoldPrice": 45.0,
          "dryCleanPrice": 85.0,
          "processingTime": "24-48 hrs",
          "careInstructions":
              "Dry clean for best results, store hanging to prevent wrinkles.",
        },
      ],
    },
    {
      "category": "Outerwear",
      "items": [
        {
          "name": "Blazer",
          "description":
              "Professional blazers with expert pressing and shape maintenance for business attire.",
          "washFoldPrice": 0.0,
          "dryCleanPrice": 180.0,
          "processingTime": "72 hrs",
          "careInstructions":
              "Dry clean only, use shoulder-shaped hangers, brush regularly between cleanings.",
        },
        {
          "name": "Winter Coat",
          "description":
              "Heavy winter coats requiring specialized cleaning equipment and extended processing time.",
          "washFoldPrice": 0.0,
          "dryCleanPrice": 250.0,
          "processingTime": "5-7 days",
          "careInstructions":
              "Professional dry cleaning only, store in breathable garment bag during off-season.",
        },
        {
          "name": "Leather Jacket",
          "description":
              "Premium leather care with conditioning and specialized cleaning techniques.",
          "washFoldPrice": 0.0,
          "dryCleanPrice": 300.0,
          "processingTime": "7-10 days",
          "careInstructions":
              "Leather specialist cleaning only, condition regularly, avoid water and heat.",
        },
      ],
    },
    {
      "category": "Undergarments & Sleepwear",
      "items": [
        {
          "name": "Bras",
          "description":
              "Delicate lingerie requiring gentle hand washing or specialized machine cycles.",
          "washFoldPrice": 30.0,
          "dryCleanPrice": 0.0,
          "processingTime": "24 hrs",
          "careInstructions":
              "Hand wash in cold water with mild detergent, air dry flat, no machine drying.",
        },
        {
          "name": "Pajamas",
          "description":
              "Comfortable sleepwear with soft finishing to maintain fabric comfort.",
          "washFoldPrice": 35.0,
          "dryCleanPrice": 0.0,
          "processingTime": "24 hrs",
          "careInstructions":
              "Machine wash warm, tumble dry low, use fabric softener for comfort.",
        },
      ],
    },
  ];

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  List<Map<String, dynamic>> _getFilteredCategories() {
    List<Map<String, dynamic>> filteredCategories = [];

    for (var category in _garmentCategories) {
      List<Map<String, dynamic>> filteredItems = [];

      for (var item in (category['items'] as List<Map<String, dynamic>>)) {
        // Search filter
        if (_searchQuery.isNotEmpty) {
          final name = (item['name'] as String).toLowerCase();
          final description = (item['description'] as String).toLowerCase();
          final searchLower = _searchQuery.toLowerCase();

          if (!name.contains(searchLower) &&
              !description.contains(searchLower)) {
            continue;
          }
        }

        // Service type filter
        final hasWashFold = (item['washFoldPrice'] as double) > 0;
        final hasDryClean = (item['dryCleanPrice'] as double) > 0;

        bool includeItem = false;
        switch (_selectedFilter) {
          case 'Wash & Fold':
            includeItem = hasWashFold;
            break;
          case 'Dry Clean':
            includeItem = hasDryClean;
            break;
          case 'Both':
          default:
            includeItem = hasWashFold || hasDryClean;
            break;
        }

        if (includeItem) {
          filteredItems.add(item);
        }
      }

      if (filteredItems.isNotEmpty) {
        filteredCategories.add({
          'category': category['category'],
          'items': filteredItems,
        });
      }
    }

    return filteredCategories;
  }

  void _onSearchChanged(String query) {
    setState(() {
      _searchQuery = query;
    });
  }

  void _onFilterChanged(String filter) {
    setState(() {
      _selectedFilter = filter;
    });
  }

  void _onItemTap(Map<String, dynamic> item) {
    // Show item details or add to booking
    Navigator.pushNamed(context, '/booking-wizard-modal');
  }

  void _onItemLongPress(Map<String, dynamic> item) {
    GarmentDetailsBottomSheet.show(context, item);
  }

  void _onPromotionalBannerTap() {
    Navigator.pushNamed(context, '/booking-wizard-modal');
  }

  void _clearFilters() {
    setState(() {
      _searchQuery = '';
      _selectedFilter = 'Both';
      _searchController.clear();
    });
  }

  Future<void> _onRefresh() async {
    // Simulate refresh with haptic feedback
    await Future.delayed(Duration(milliseconds: 1000));
    setState(() {
      _lastUpdated = DateTime.now();
    });
  }

  void _sharePrice() {
    // Share functionality for pricing list
    final String shareText =
        "Check out LaundryFlow's competitive pricing! Download the app for convenient laundry services.";
    // In a real app, you would use share_plus plugin here
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Pricing list ready to share!'),
        action: SnackBarAction(
          label: 'Share',
          onPressed: () {
            // Implement actual sharing
          },
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final filteredCategories = _getFilteredCategories();
    final hasResults = filteredCategories.isNotEmpty;

    return Scaffold(
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      appBar: AppBar(
        title: Text(
          'Pricing',
          style: AppTheme.lightTheme.textTheme.headlineSmall?.copyWith(
            fontWeight: FontWeight.w700,
          ),
        ),
        actions: [
          IconButton(
            onPressed: _sharePrice,
            icon: CustomIconWidget(
              iconName: 'share',
              color: AppTheme.lightTheme.colorScheme.onSurface,
              size: 24,
            ),
          ),
        ],
        elevation: 0,
        backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Search Bar
            SearchBarWidget(
              controller: _searchController,
              onChanged: _onSearchChanged,
              hintText: "Search garments...",
            ),

            // Filter Chips
            FilterChipsWidget(
              options: _filterOptions,
              selectedOption: _selectedFilter,
              onSelectionChanged: _onFilterChanged,
            ),

            SizedBox(height: 1.h),

            // Last Updated Info
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 4.w),
              child: Row(
                children: [
                  CustomIconWidget(
                    iconName: 'update',
                    color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                    size: 16,
                  ),
                  SizedBox(width: 2.w),
                  Text(
                    'Updated: ${_lastUpdated.day}/${_lastUpdated.month}/${_lastUpdated.year} ${_lastUpdated.hour}:${_lastUpdated.minute.toString().padLeft(2, '0')}',
                    style: AppTheme.lightTheme.textTheme.labelSmall?.copyWith(
                      color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                ],
              ),
            ),

            SizedBox(height: 2.h),

            // Content
            Expanded(
              child: hasResults
                  ? RefreshIndicator(
                      onRefresh: _onRefresh,
                      color: AppTheme.lightTheme.colorScheme.primary,
                      child: ListView.builder(
                        physics: AlwaysScrollableScrollPhysics(),
                        itemCount: filteredCategories.length +
                            (_promotionalBanners.isNotEmpty ? 1 : 0),
                        itemBuilder: (context, index) {
                          // Show promotional banner first
                          if (index == 0 && _promotionalBanners.isNotEmpty) {
                            return PromotionalBannerWidget(
                              banner: _promotionalBanners.first,
                              onTap: _onPromotionalBannerTap,
                            );
                          }

                          // Adjust index for categories
                          final categoryIndex = _promotionalBanners.isNotEmpty
                              ? index - 1
                              : index;
                          final category = filteredCategories[categoryIndex];

                          return ExpandableSectionWidget(
                            title: category['category'] as String,
                            items:
                                category['items'] as List<Map<String, dynamic>>,
                            initiallyExpanded: categoryIndex == 0,
                            onItemTap: _onItemTap,
                            onItemLongPress: _onItemLongPress,
                          );
                        },
                      ),
                    )
                  : EmptySearchWidget(
                      searchQuery: _searchQuery,
                      onClearFilters: _clearFilters,
                    ),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => Navigator.pushNamed(context, '/booking-wizard-modal'),
        icon: CustomIconWidget(
          iconName: 'request_quote',
          color: AppTheme.lightTheme.colorScheme.onPrimary,
          size: 20,
        ),
        label: Text(
          'Get Quote',
          style: AppTheme.lightTheme.textTheme.labelLarge?.copyWith(
            color: AppTheme.lightTheme.colorScheme.onPrimary,
            fontWeight: FontWeight.w600,
          ),
        ),
        backgroundColor: AppTheme.lightTheme.colorScheme.primary,
        elevation: 4,
      ),
    );
  }
}
