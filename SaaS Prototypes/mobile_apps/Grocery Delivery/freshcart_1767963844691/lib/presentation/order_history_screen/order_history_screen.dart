import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/empty_state_widget.dart';
import './widgets/filter_bottom_sheet_widget.dart';
import './widgets/order_card_widget.dart';
import './widgets/search_bar_widget.dart';

class OrderHistoryScreen extends StatefulWidget {
  const OrderHistoryScreen({super.key});

  @override
  State<OrderHistoryScreen> createState() => _OrderHistoryScreenState();
}

class _OrderHistoryScreenState extends State<OrderHistoryScreen> {
  final TextEditingController _searchController = TextEditingController();
  final ScrollController _scrollController = ScrollController();

  List<Map<String, dynamic>> _allOrders = [];
  List<Map<String, dynamic>> _filteredOrders = [];
  Map<String, dynamic> _currentFilters = {};
  bool _isLoading = false;
  bool _isSearching = false;
  int _currentPage = 1;
  final int _itemsPerPage = 10;

  @override
  void initState() {
    super.initState();
    _loadMockData();
    _scrollController.addListener(_onScroll);
    _searchController.addListener(_onSearchChanged);
  }

  @override
  void dispose() {
    _searchController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  void _loadMockData() {
    _allOrders = [
      {
        "orderId": "ORD001",
        "orderDate": "2025-10-30T14:30:00.000Z",
        "totalAmount": 89.50,
        "itemCount": 12,
        "status": "Delivered",
        "items": [
          {
            "id": 1,
            "name": "Organic Bananas",
            "quantity": 2,
            "price": 4.99,
            "image":
                "https://images.unsplash.com/photo-1565804212260-280f967e431b",
            "semanticLabel":
                "Fresh yellow bananas in a bunch on white background",
            "isAvailable": true
          },
          {
            "id": 2,
            "name": "Fresh Milk",
            "quantity": 1,
            "price": 3.49,
            "image":
                "https://images.unsplash.com/photo-1658901032926-41e5e72016d9",
            "semanticLabel": "Glass bottle of fresh white milk with blue cap",
            "isAvailable": true
          },
          {
            "id": 3,
            "name": "Whole Wheat Bread",
            "quantity": 1,
            "price": 2.99,
            "image":
                "https://images.unsplash.com/photo-1596662841962-34034e1e6efc",
            "semanticLabel":
                "Sliced whole wheat bread loaf on wooden cutting board",
            "isAvailable": false
          },
          {
            "id": 4,
            "name": "Greek Yogurt",
            "quantity": 3,
            "price": 5.97,
            "image":
                "https://images.unsplash.com/photo-1719077519310-ecc29df7fad5",
            "semanticLabel":
                "White container of Greek yogurt with berries on top",
            "isAvailable": true
          }
        ]
      },
      {
        "orderId": "ORD002",
        "orderDate": "2025-10-28T10:15:00.000Z",
        "totalAmount": 156.75,
        "itemCount": 18,
        "status": "Processing",
        "items": [
          {
            "id": 5,
            "name": "Salmon Fillet",
            "quantity": 2,
            "price": 24.99,
            "image":
                "https://images.unsplash.com/photo-1692213982191-6c42a5695323",
            "semanticLabel": "Fresh salmon fillet with herbs on ice",
            "isAvailable": true
          },
          {
            "id": 6,
            "name": "Avocados",
            "quantity": 4,
            "price": 7.96,
            "image":
                "https://images.unsplash.com/photo-1730541416908-a6e61b86f60b",
            "semanticLabel":
                "Ripe avocados cut in half showing green flesh and pit",
            "isAvailable": true
          },
          {
            "id": 7,
            "name": "Cherry Tomatoes",
            "quantity": 2,
            "price": 5.98,
            "image":
                "https://images.unsplash.com/photo-1721037723435-affcd78040e6",
            "semanticLabel": "Fresh red cherry tomatoes on the vine",
            "isAvailable": true
          }
        ]
      },
      {
        "orderId": "ORD003",
        "orderDate": "2025-10-25T16:45:00.000Z",
        "totalAmount": 67.25,
        "itemCount": 8,
        "status": "Delivered",
        "items": [
          {
            "id": 8,
            "name": "Chicken Breast",
            "quantity": 1,
            "price": 12.99,
            "image":
                "https://images.unsplash.com/photo-1633096013004-e2cb4023b560",
            "semanticLabel": "Raw chicken breast fillets on white plate",
            "isAvailable": true
          },
          {
            "id": 9,
            "name": "Brown Rice",
            "quantity": 1,
            "price": 4.49,
            "image":
                "https://images.unsplash.com/photo-1723879683042-8e72c359ec2e",
            "semanticLabel": "Brown rice grains in wooden bowl with spoon",
            "isAvailable": true
          }
        ]
      },
      {
        "orderId": "ORD004",
        "orderDate": "2025-10-22T12:20:00.000Z",
        "totalAmount": 234.80,
        "itemCount": 25,
        "status": "Cancelled",
        "items": [
          {
            "id": 10,
            "name": "Organic Apples",
            "quantity": 3,
            "price": 8.97,
            "image":
                "https://images.unsplash.com/photo-1456239194997-5812eddd77b7",
            "semanticLabel": "Red organic apples in wooden basket",
            "isAvailable": true
          },
          {
            "id": 11,
            "name": "Pasta",
            "quantity": 2,
            "price": 3.98,
            "image":
                "https://images.unsplash.com/photo-1588511706218-3a500887ce80",
            "semanticLabel": "Uncooked pasta noodles scattered on dark surface",
            "isAvailable": true
          }
        ]
      },
      {
        "orderId": "ORD005",
        "orderDate": "2025-10-20T09:30:00.000Z",
        "totalAmount": 45.60,
        "itemCount": 6,
        "status": "Delivered",
        "items": [
          {
            "id": 12,
            "name": "Orange Juice",
            "quantity": 2,
            "price": 6.98,
            "image":
                "https://images.unsplash.com/photo-1716834092549-7d8fd540b51a",
            "semanticLabel": "Glass of fresh orange juice with orange slices",
            "isAvailable": true
          },
          {
            "id": 13,
            "name": "Eggs",
            "quantity": 1,
            "price": 3.99,
            "image":
                "https://images.unsplash.com/photo-1677372201944-9782f3a4a5ca",
            "semanticLabel": "Brown eggs in cardboard carton",
            "isAvailable": true
          }
        ]
      }
    ];

    _applyFilters();
  }

  void _onScroll() {
    if (_scrollController.position.pixels >=
        _scrollController.position.maxScrollExtent - 200) {
      _loadMoreOrders();
    }
  }

  void _onSearchChanged() {
    setState(() {
      _isSearching = _searchController.text.isNotEmpty;
    });
    _applyFilters();
  }

  void _loadMoreOrders() {
    if (_isLoading) return;

    setState(() {
      _isLoading = true;
    });

    // Simulate loading more orders
    Future.delayed(const Duration(seconds: 1), () {
      if (mounted) {
        setState(() {
          _currentPage++;
          _isLoading = false;
        });
      }
    });
  }

  void _applyFilters() {
    List<Map<String, dynamic>> filtered = List.from(_allOrders);

    // Search filter
    if (_searchController.text.isNotEmpty) {
      final searchTerm = _searchController.text.toLowerCase();
      filtered = filtered.where((order) {
        final orderId = (order['orderId'] as String).toLowerCase();
        final orderDate = DateTime.parse(order['orderDate'] as String);
        final dateString =
            '${orderDate.day}/${orderDate.month}/${orderDate.year}';

        // Search in order ID, date, or item names
        bool matchesOrder =
            orderId.contains(searchTerm) || dateString.contains(searchTerm);

        if (!matchesOrder) {
          final items = order['items'] as List<dynamic>;
          matchesOrder = items.any((item) =>
              (item['name'] as String).toLowerCase().contains(searchTerm));
        }

        return matchesOrder;
      }).toList();
    }

    // Status filter
    if (_currentFilters['status'] != null) {
      filtered = filtered
          .where((order) => order['status'] == _currentFilters['status'])
          .toList();
    }

    // Date range filter
    if (_currentFilters['dateRange'] != null) {
      final dateRange = _currentFilters['dateRange'] as DateTimeRange;
      filtered = filtered.where((order) {
        final orderDate = DateTime.parse(order['orderDate'] as String);
        return orderDate
                .isAfter(dateRange.start.subtract(const Duration(days: 1))) &&
            orderDate.isBefore(dateRange.end.add(const Duration(days: 1)));
      }).toList();
    }

    // Price range filter
    if (_currentFilters['priceRange'] != null) {
      final priceRange = _currentFilters['priceRange'] as RangeValues;
      filtered = filtered.where((order) {
        final totalAmount = order['totalAmount'] as double;
        return totalAmount >= priceRange.start && totalAmount <= priceRange.end;
      }).toList();
    }

    // Sort filter
    if (_currentFilters['sortBy'] != null) {
      final sortBy = _currentFilters['sortBy'] as String;
      switch (sortBy) {
        case 'Recent First':
          filtered.sort((a, b) => DateTime.parse(b['orderDate'] as String)
              .compareTo(DateTime.parse(a['orderDate'] as String)));
          break;
        case 'Oldest First':
          filtered.sort((a, b) => DateTime.parse(a['orderDate'] as String)
              .compareTo(DateTime.parse(b['orderDate'] as String)));
          break;
        case 'Price: High to Low':
          filtered.sort((a, b) => (b['totalAmount'] as double)
              .compareTo(a['totalAmount'] as double));
          break;
        case 'Price: Low to High':
          filtered.sort((a, b) => (a['totalAmount'] as double)
              .compareTo(b['totalAmount'] as double));
          break;
      }
    }

    setState(() {
      _filteredOrders = filtered;
    });
  }

  void _showFilterBottomSheet() {
    HapticFeedback.lightImpact();
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      isScrollControlled: true,
      builder: (context) => SizedBox(
        height: 80.h,
        child: FilterBottomSheetWidget(
          currentFilters: _currentFilters,
          onApplyFilters: (filters) {
            setState(() {
              _currentFilters = filters;
            });
            _applyFilters();
          },
        ),
      ),
    );
  }

  void _handleReorderAll(Map<String, dynamic> order) {
    HapticFeedback.lightImpact();
    final items = order['items'] as List<dynamic>;
    final availableItems =
        items.where((item) => item['isAvailable'] == true).length;

    Fluttertoast.showToast(
      msg: '$availableItems items added to cart',
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
      backgroundColor: AppTheme.lightTheme.colorScheme.primary,
      textColor: AppTheme.lightTheme.colorScheme.onPrimary,
    );
  }

  void _handleAddToCart(Map<String, dynamic> item) {
    HapticFeedback.lightImpact();
    Fluttertoast.showToast(
      msg: '${item['name']} added to cart',
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
      backgroundColor: AppTheme.lightTheme.colorScheme.secondary,
      textColor: AppTheme.lightTheme.colorScheme.onSecondary,
    );
  }

  void _handleDownloadReceipt() {
    HapticFeedback.lightImpact();
    Fluttertoast.showToast(
      msg: 'Receipt downloaded successfully',
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
    );
  }

  void _handleRateOrder() {
    HapticFeedback.lightImpact();
    _showRatingDialog();
  }

  void _handleReportIssue() {
    HapticFeedback.lightImpact();
    Fluttertoast.showToast(
      msg: 'Issue reported. We\'ll contact you soon.',
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
    );
  }

  void _handleShareOrder() {
    HapticFeedback.lightImpact();
    Fluttertoast.showToast(
      msg: 'Order details shared',
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
    );
  }

  void _handleVoiceSearch() {
    HapticFeedback.lightImpact();
    Fluttertoast.showToast(
      msg: 'Voice search activated',
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
    );
  }

  void _handleBarcodeSearch() {
    HapticFeedback.lightImpact();
    Fluttertoast.showToast(
      msg: 'Barcode scanner opened',
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
    );
  }

  void _handleExploreProducts() {
    HapticFeedback.lightImpact();
    Navigator.pushNamed(context, '/home-screen');
  }

  void _showRatingDialog() {
    int selectedRating = 5;

    showDialog(
      context: context,
      builder: (context) => StatefulBuilder(
        builder: (context, setDialogState) => AlertDialog(
          backgroundColor: AppTheme.lightTheme.colorScheme.surface,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          title: Text(
            'Rate Your Order',
            style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.w600,
            ),
          ),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                'How was your shopping experience?',
                style: AppTheme.lightTheme.textTheme.bodyLarge,
              ),
              SizedBox(height: 3.h),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: List.generate(5, (index) {
                  return GestureDetector(
                    onTap: () {
                      HapticFeedback.lightImpact();
                      setDialogState(() {
                        selectedRating = index + 1;
                      });
                    },
                    child: Padding(
                      padding: EdgeInsets.symmetric(horizontal: 1.w),
                      child: CustomIconWidget(
                        iconName:
                            index < selectedRating ? 'star' : 'star_border',
                        color: index < selectedRating
                            ? AppTheme.lightTheme.colorScheme.tertiary
                            : AppTheme.lightTheme.colorScheme.outline,
                        size: 32,
                      ),
                    ),
                  );
                }),
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: Text(
                'Cancel',
                style: AppTheme.lightTheme.textTheme.labelLarge?.copyWith(
                  color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                ),
              ),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.pop(context);
                Fluttertoast.showToast(
                  msg: 'Thank you for your $selectedRating star rating!',
                  toastLength: Toast.LENGTH_SHORT,
                  gravity: ToastGravity.BOTTOM,
                  backgroundColor: AppTheme.lightTheme.colorScheme.secondary,
                  textColor: AppTheme.lightTheme.colorScheme.onSecondary,
                );
              },
              child: Text('Submit'),
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _refreshOrders() async {
    HapticFeedback.lightImpact();
    setState(() {
      _isLoading = true;
    });

    // Simulate refresh
    await Future.delayed(const Duration(seconds: 1));

    if (mounted) {
      setState(() {
        _isLoading = false;
        _currentPage = 1;
      });
      _loadMockData();

      Fluttertoast.showToast(
        msg: 'Orders refreshed',
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.BOTTOM,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
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
                title: Text(
                  'Order History',
                  style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                    fontWeight: FontWeight.w700,
                  ),
                ),
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
                    icon: const Icon(Icons.filter_list),
                    onPressed: _showFilterBottomSheet,
                    tooltip: 'Filter orders',
                  ),
                ],
              ),
            ),
          ];
        },
        body: _buildMainContent(),
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
              child: SearchBarWidget(
                controller: _searchController,
                hintText: 'Search orders, products, or dates...',
                onChanged: (value) => _applyFilters(),
                onVoiceSearch: _handleVoiceSearch,
                onBarcodeSearch: _handleBarcodeSearch,
                onClear: () => _applyFilters(),
              ),
            ),
            if (_isSearching || _currentFilters.isNotEmpty)
              SliverToBoxAdapter(
                child: Container(
                  width: double.infinity,
                  padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
                  child: Text(
                    '${_filteredOrders.length} order${_filteredOrders.length != 1 ? 's' : ''} found',
                    style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                      color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                ),
              ),
            _filteredOrders.isEmpty
                ? SliverFillRemaining(
                    child: EmptyStateWidget(
                      onExploreProducts: _handleExploreProducts,
                    ),
                  )
                : SliverList(
                    delegate: SliverChildBuilderDelegate(
                      (context, index) {
                        if (index == _filteredOrders.length) {
                          return Container(
                            padding: EdgeInsets.all(4.w),
                            child: Center(
                              child: CircularProgressIndicator(
                                color: AppTheme.lightTheme.colorScheme.primary,
                              ),
                            ),
                          );
                        }

                        final order = _filteredOrders[index];
                        return OrderCardWidget(
                          order: order,
                          onReorderAll: () => _handleReorderAll(order),
                          onAddToCart: _handleAddToCart,
                          onDownloadReceipt: _handleDownloadReceipt,
                          onRateOrder: _handleRateOrder,
                          onReportIssue: _handleReportIssue,
                          onShareOrder: _handleShareOrder,
                        );
                      },
                      childCount: _filteredOrders.length + (_isLoading ? 1 : 0),
                    ),
                  ),
            SliverToBoxAdapter(
              child: SizedBox(height: 10.h),
            ),
          ],
        );
      },
    );
  }
}
