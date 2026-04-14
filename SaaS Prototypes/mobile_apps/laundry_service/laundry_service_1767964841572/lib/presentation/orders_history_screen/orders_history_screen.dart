import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/empty_state_widget.dart';
import './widgets/filter_sort_widget.dart';
import './widgets/order_card_widget.dart';
import './widgets/search_bar_widget.dart';

class OrdersHistoryScreen extends StatefulWidget {
  const OrdersHistoryScreen({Key? key}) : super(key: key);

  @override
  State<OrdersHistoryScreen> createState() => _OrdersHistoryScreenState();
}

class _OrdersHistoryScreenState extends State<OrdersHistoryScreen> {
  String _selectedFilter = 'All';
  String _selectedSort = 'Recent';
  String _searchQuery = '';
  bool _isLoading = false;

  final List<Map<String, dynamic>> _allOrders = [
    {
      "id": 1,
      "orderNumber": "LF001234",
      "serviceType": "Wash & Fold",
      "status": "Active",
      "pickupDate": "19 Aug 2025",
      "itemCount": 12,
      "totalCost": "450.00",
      "timestamp": DateTime.now().subtract(Duration(hours: 2)),
    },
    {
      "id": 2,
      "orderNumber": "LF001235",
      "serviceType": "Dry Clean",
      "status": "Completed",
      "pickupDate": "17 Aug 2025",
      "itemCount": 5,
      "totalCost": "850.00",
      "timestamp": DateTime.now().subtract(Duration(days: 2)),
    },
    {
      "id": 3,
      "orderNumber": "LF001236",
      "serviceType": "Wash & Fold",
      "status": "In Process",
      "pickupDate": "18 Aug 2025",
      "itemCount": 8,
      "totalCost": "320.00",
      "timestamp": DateTime.now().subtract(Duration(days: 1)),
    },
    {
      "id": 4,
      "orderNumber": "LF001237",
      "serviceType": "Dry Clean",
      "status": "Delivered",
      "pickupDate": "15 Aug 2025",
      "itemCount": 3,
      "totalCost": "650.00",
      "timestamp": DateTime.now().subtract(Duration(days: 4)),
    },
    {
      "id": 5,
      "orderNumber": "LF001238",
      "serviceType": "Wash & Fold",
      "status": "Completed",
      "pickupDate": "14 Aug 2025",
      "itemCount": 15,
      "totalCost": "520.00",
      "timestamp": DateTime.now().subtract(Duration(days: 5)),
    },
    {
      "id": 6,
      "orderNumber": "LF001239",
      "serviceType": "Dry Clean",
      "status": "Picked Up",
      "pickupDate": "19 Aug 2025",
      "itemCount": 7,
      "totalCost": "980.00",
      "timestamp": DateTime.now().subtract(Duration(hours: 4)),
    },
  ];

  List<Map<String, dynamic>> get _filteredOrders {
    List<Map<String, dynamic>> filtered = List.from(_allOrders);

    // Apply search filter
    if (_searchQuery.isNotEmpty) {
      filtered = filtered.where((order) {
        final orderNumber = (order['orderNumber'] as String).toLowerCase();
        final serviceType = (order['serviceType'] as String).toLowerCase();
        final query = _searchQuery.toLowerCase();
        return orderNumber.contains(query) || serviceType.contains(query);
      }).toList();
    }

    // Apply status filter
    if (_selectedFilter != 'All') {
      filtered = filtered.where((order) {
        final status = order['status'] as String;
        if (_selectedFilter == 'Active') {
          return ['Active', 'Picked Up', 'In Process'].contains(status);
        } else if (_selectedFilter == 'Completed') {
          return ['Completed', 'Delivered'].contains(status);
        }
        return true;
      }).toList();
    }

    // Apply sorting
    filtered.sort((a, b) {
      switch (_selectedSort) {
        case 'Recent':
          return (b['timestamp'] as DateTime)
              .compareTo(a['timestamp'] as DateTime);
        case 'Oldest':
          return (a['timestamp'] as DateTime)
              .compareTo(b['timestamp'] as DateTime);
        case 'Price':
          final aPrice = double.parse(a['totalCost'] as String);
          final bPrice = double.parse(b['totalCost'] as String);
          return bPrice.compareTo(aPrice);
        default:
          return 0;
      }
    });

    return filtered;
  }

  @override
  Widget build(BuildContext context) {
    final filteredOrders = _filteredOrders;

    return Scaffold(
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      appBar: AppBar(
        title: Text(
          'Order History',
          style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
        backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
        elevation: 0,
        actions: [
          IconButton(
            onPressed: _refreshOrders,
            icon: CustomIconWidget(
              iconName: 'refresh',
              color: AppTheme.lightTheme.colorScheme.primary,
              size: 24,
            ),
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            FilterSortWidget(
              selectedFilter: _selectedFilter,
              selectedSort: _selectedSort,
              onFilterChanged: (filter) {
                setState(() {
                  _selectedFilter = filter;
                });
              },
              onSortChanged: (sort) {
                setState(() {
                  _selectedSort = sort;
                });
              },
            ),
            SearchBarWidget(
              onSearchChanged: (query) {
                setState(() {
                  _searchQuery = query;
                });
              },
              hintText: 'Search by order number or service type...',
            ),
            Expanded(
              child: _isLoading
                  ? Center(
                      child: CircularProgressIndicator(
                        color: AppTheme.lightTheme.colorScheme.primary,
                      ),
                    )
                  : filteredOrders.isEmpty
                      ? _searchQuery.isNotEmpty || _selectedFilter != 'All'
                          ? _buildNoResultsWidget()
                          : EmptyStateWidget(
                              onSchedulePickup: () {
                                Navigator.pushNamed(context, '/home-screen');
                              },
                            )
                      : RefreshIndicator(
                          onRefresh: _refreshOrders,
                          color: AppTheme.lightTheme.colorScheme.primary,
                          child: ListView.builder(
                            padding: EdgeInsets.only(bottom: 2.h),
                            itemCount: filteredOrders.length,
                            itemBuilder: (context, index) {
                              final order = filteredOrders[index];
                              return OrderCardWidget(
                                order: order,
                                onTap: () => _navigateToOrderDetails(order),
                                onTrack: () => _trackOrder(order),
                                onReorder: () => _reorder(order),
                                onRate: () => _rateService(order),
                                onDelete: () => _deleteOrder(order),
                              );
                            },
                          ),
                        ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildNoResultsWidget() {
    return Center(
      child: Padding(
        padding: EdgeInsets.all(8.w),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 30.w,
              height: 30.w,
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.colorScheme.onSurfaceVariant
                    .withValues(alpha: 0.1),
                shape: BoxShape.circle,
              ),
              child: Center(
                child: CustomIconWidget(
                  iconName: 'search_off',
                  color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                  size: 40,
                ),
              ),
            ),
            SizedBox(height: 3.h),
            Text(
              'No Orders Found',
              style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.w600,
              ),
            ),
            SizedBox(height: 1.h),
            Text(
              _searchQuery.isNotEmpty
                  ? 'No orders match your search criteria'
                  : 'No orders found for the selected filter',
              textAlign: TextAlign.center,
              style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
              ),
            ),
            SizedBox(height: 3.h),
            TextButton(
              onPressed: () {
                setState(() {
                  _searchQuery = '';
                  _selectedFilter = 'All';
                });
              },
              child: Text('Clear Filters'),
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _refreshOrders() async {
    setState(() {
      _isLoading = true;
    });

    // Simulate API call
    await Future.delayed(Duration(seconds: 1));

    setState(() {
      _isLoading = false;
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Orders updated'),
        backgroundColor: AppTheme.lightTheme.colorScheme.primary,
      ),
    );
  }

  void _navigateToOrderDetails(Map<String, dynamic> order) {
    Navigator.pushNamed(context, '/order-tracking-screen');
  }

  void _trackOrder(Map<String, dynamic> order) {
    Navigator.pushNamed(context, '/order-tracking-screen');
  }

  void _reorder(Map<String, dynamic> order) {
    Navigator.pushNamed(context, '/booking-wizard-modal');
  }

  void _rateService(Map<String, dynamic> order) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(
          'Rate Your Service',
          style: AppTheme.lightTheme.textTheme.titleLarge,
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              'How was your experience with order #${order['orderNumber']}?',
              style: AppTheme.lightTheme.textTheme.bodyMedium,
            ),
            SizedBox(height: 2.h),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: List.generate(5, (index) {
                return GestureDetector(
                  onTap: () {
                    Navigator.pop(context);
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: Text('Thank you for your rating!'),
                        backgroundColor:
                            AppTheme.lightTheme.colorScheme.primary,
                      ),
                    );
                  },
                  child: Padding(
                    padding: EdgeInsets.symmetric(horizontal: 1.w),
                    child: CustomIconWidget(
                      iconName: 'star',
                      color: AppTheme.lightTheme.colorScheme.tertiary,
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
            child: Text('Cancel'),
          ),
        ],
      ),
    );
  }

  void _deleteOrder(Map<String, dynamic> order) {
    setState(() {
      _allOrders.removeWhere((o) => o['id'] == order['id']);
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Order deleted from history'),
        backgroundColor: AppTheme.lightTheme.colorScheme.error,
        action: SnackBarAction(
          label: 'Undo',
          textColor: Colors.white,
          onPressed: () {
            setState(() {
              _allOrders.add(order);
            });
          },
        ),
      ),
    );
  }
}
