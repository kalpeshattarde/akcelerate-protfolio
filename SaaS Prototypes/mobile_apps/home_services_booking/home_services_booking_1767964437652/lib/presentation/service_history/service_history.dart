import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../widgets/custom_bottom_bar.dart';
import '../../widgets/custom_icon_widget.dart';
import './widgets/service_history_card.dart';
import './widgets/service_history_empty_state.dart';
import './widgets/service_history_filter_sheet.dart';
import './widgets/service_history_search_bar.dart';

class ServiceHistory extends StatefulWidget {
  const ServiceHistory({super.key});

  @override
  State<ServiceHistory> createState() => _ServiceHistoryState();
}

class _ServiceHistoryState extends State<ServiceHistory>
    with TickerProviderStateMixin {
  late AnimationController _refreshAnimationController;
  late Animation<double> _refreshAnimation;

  String _searchQuery = '';
  Map<String, dynamic> _activeFilters = {
    'serviceCategory': 'All Services',
    'status': 'All Status',
  };

  bool _isLoading = false;
  bool _isRefreshing = false;
  List<Map<String, dynamic>> _allServices = [];
  List<Map<String, dynamic>> _filteredServices = [];

  @override
  void initState() {
    super.initState();
    _refreshAnimationController = AnimationController(
      duration: const Duration(milliseconds: 1000),
      vsync: this,
    );
    _refreshAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _refreshAnimationController,
      curve: Curves.easeInOut,
    ));

    _loadServiceHistory();
  }

  @override
  void dispose() {
    _refreshAnimationController.dispose();
    super.dispose();
  }

  // Mock service history data
  void _loadServiceHistory() {
    setState(() {
      _isLoading = true;
    });

    // Simulate API call delay
    Future.delayed(const Duration(milliseconds: 800), () {
      if (mounted) {
        setState(() {
          _allServices = [
            {
              'id': 1,
              'serviceName': 'Deep House Cleaning',
              'serviceType': 'cleaning',
              'providerName': 'CleanPro Services',
              'providerAvatar':
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
              'date': 'Aug 18, 2025',
              'time': '9:00 AM - 12:00 PM',
              'duration': '3 hours',
              'address': '123 Oak Street, Downtown',
              'totalCost': '\$120.00',
              'status': 'completed',
              'rating': 4.8,
              'photos': [
                'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=200&fit=crop',
              ],
            },
            {
              'id': 2,
              'serviceName': 'Kitchen Sink Repair',
              'serviceType': 'plumbing',
              'providerName': 'AquaFix Plumbing',
              'providerAvatar':
                  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
              'date': 'Aug 15, 2025',
              'time': '2:00 PM - 4:00 PM',
              'duration': '2 hours',
              'address': '123 Oak Street, Downtown',
              'totalCost': '\$85.00',
              'status': 'completed',
              'rating': 4.5,
            },
            {
              'id': 3,
              'serviceName': 'Electrical Outlet Installation',
              'serviceType': 'electrical',
              'providerName': 'PowerTech Electric',
              'providerAvatar':
                  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
              'date': 'Aug 12, 2025',
              'time': '10:00 AM - 11:30 AM',
              'duration': '1.5 hours',
              'address': '123 Oak Street, Downtown',
              'totalCost': '\$95.00',
              'status': 'completed',
              'rating': 5.0,
            },
            {
              'id': 4,
              'serviceName': 'Bathroom Deep Clean',
              'serviceType': 'cleaning',
              'providerName': 'SparkleClean Co.',
              'providerAvatar':
                  'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
              'date': 'Aug 10, 2025',
              'time': '1:00 PM - 3:00 PM',
              'duration': '2 hours',
              'address': '123 Oak Street, Downtown',
              'totalCost': '\$75.00',
              'status': 'cancelled',
            },
            {
              'id': 5,
              'serviceName': 'AC Maintenance',
              'serviceType': 'appliance',
              'providerName': 'CoolAir Services',
              'providerAvatar':
                  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
              'date': 'Aug 8, 2025',
              'time': '11:00 AM - 1:00 PM',
              'duration': '2 hours',
              'address': '123 Oak Street, Downtown',
              'totalCost': '\$110.00',
              'status': 'rescheduled',
            },
            {
              'id': 6,
              'serviceName': 'Furniture Assembly',
              'serviceType': 'handyman',
              'providerName': 'HandyHelper Pro',
              'providerAvatar':
                  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
              'date': 'Aug 5, 2025',
              'time': '3:00 PM - 6:00 PM',
              'duration': '3 hours',
              'address': '123 Oak Street, Downtown',
              'totalCost': '\$140.00',
              'status': 'completed',
              'rating': 4.7,
            },
          ];
          _isLoading = false;
          _applyFilters();
        });
      }
    });
  }

  void _applyFilters() {
    List<Map<String, dynamic>> filtered = List.from(_allServices);

    // Apply search filter
    if (_searchQuery.isNotEmpty) {
      filtered = filtered.where((service) {
        final serviceName = (service['serviceName'] as String).toLowerCase();
        final providerName = (service['providerName'] as String).toLowerCase();
        final serviceType = (service['serviceType'] as String).toLowerCase();
        final query = _searchQuery.toLowerCase();

        return serviceName.contains(query) ||
            providerName.contains(query) ||
            serviceType.contains(query);
      }).toList();
    }

    // Apply category filter
    if (_activeFilters['serviceCategory'] != 'All Services') {
      final category =
          (_activeFilters['serviceCategory'] as String).toLowerCase();
      filtered = filtered.where((service) {
        return (service['serviceType'] as String).toLowerCase() == category;
      }).toList();
    }

    // Apply status filter
    if (_activeFilters['status'] != 'All Status') {
      final status = (_activeFilters['status'] as String).toLowerCase();
      filtered = filtered.where((service) {
        return (service['status'] as String).toLowerCase() == status;
      }).toList();
    }

    // Apply date range filter
    if (_activeFilters['dateRange'] != null) {
      final dateRange = _activeFilters['dateRange'] as Map<String, String>;
      final startDate = DateTime.parse(dateRange['start']!);
      final endDate = DateTime.parse(dateRange['end']!);

      filtered = filtered.where((service) {
        // For demo purposes, we'll use a simple date comparison
        // In a real app, you'd parse the actual service date
        return true; // Simplified for demo
      }).toList();
    }

    setState(() {
      _filteredServices = filtered;
    });
  }

  Future<void> _refreshData() async {
    setState(() {
      _isRefreshing = true;
    });

    _refreshAnimationController.repeat();

    // Simulate refresh delay
    await Future.delayed(const Duration(milliseconds: 1500));

    _refreshAnimationController.stop();
    _refreshAnimationController.reset();

    if (mounted) {
      setState(() {
        _isRefreshing = false;
      });
      _loadServiceHistory();
    }
  }

  void _showFilterSheet() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => SizedBox(
        height: 80.h,
        child: ServiceHistoryFilterSheet(
          currentFilters: _activeFilters,
          onFiltersChanged: (filters) {
            setState(() {
              _activeFilters = filters;
            });
            _applyFilters();
          },
        ),
      ),
    );
  }

  void _onSearchChanged(String query) {
    setState(() {
      _searchQuery = query;
    });
    _applyFilters();
  }

  bool _hasActiveFilters() {
    return _activeFilters['serviceCategory'] != 'All Services' ||
        _activeFilters['status'] != 'All Status' ||
        _activeFilters['dateRange'] != null;
  }

  void _rebookService(Map<String, dynamic> service) {
    // Show confirmation dialog
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Re-book Service'),
        content: Text(
            'Would you like to book "${service['serviceName']}" again with the same details?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              Navigator.pushNamed(context, '/service-booking-flow');
            },
            child: Text('Re-book'),
          ),
        ],
      ),
    );
  }

  void _contactProvider(Map<String, dynamic> service) {
    // Show contact options
    showModalBottomSheet(
      context: context,
      builder: (context) => Container(
        padding: EdgeInsets.all(4.w),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              'Contact ${service['providerName']}',
              style: Theme.of(context).textTheme.titleLarge?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
            ),
            SizedBox(height: 2.h),
            ListTile(
              leading: CustomIconWidget(
                iconName: 'phone',
                color: Theme.of(context).colorScheme.primary,
                size: 6.w,
              ),
              title: Text('Call Provider'),
              onTap: () {
                Navigator.pop(context);
                // Handle phone call
              },
            ),
            ListTile(
              leading: CustomIconWidget(
                iconName: 'message',
                color: Theme.of(context).colorScheme.primary,
                size: 6.w,
              ),
              title: Text('Send Message'),
              onTap: () {
                Navigator.pop(context);
                // Handle messaging
              },
            ),
            SizedBox(height: 2.h),
          ],
        ),
      ),
    );
  }

  void _viewReceipt(Map<String, dynamic> service) {
    // Navigate to receipt view or show receipt details
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Service Receipt'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Service: ${service['serviceName']}'),
            Text('Provider: ${service['providerName']}'),
            Text('Date: ${service['date']}'),
            Text('Total: ${service['totalCost']}'),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Close'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              // Handle receipt download/share
            },
            child: Text('Download'),
          ),
        ],
      ),
    );
  }

  void _shareService(Map<String, dynamic> service) {
    // Handle service sharing
    final shareText =
        'I used ${service['serviceName']} from ${service['providerName']} - great service!';
    // In a real app, you'd use the share package
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Sharing: $shareText'),
        duration: const Duration(seconds: 2),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Scaffold(
      backgroundColor: colorScheme.surface,
      body: Column(
        children: [
          // Search Bar (Sticky Header)
          ServiceHistorySearchBar(
            initialQuery: _searchQuery,
            onSearchChanged: _onSearchChanged,
            onFilterTap: _showFilterSheet,
            hasActiveFilters: _hasActiveFilters(),
          ),

          // Content Area
          Expanded(
            child: _isLoading
                ? _buildLoadingState()
                : _filteredServices.isEmpty
                    ? ServiceHistoryEmptyState(
                        onBookService: () {
                          Navigator.pushNamed(context, '/service-dashboard');
                        },
                        message: _searchQuery.isNotEmpty || _hasActiveFilters()
                            ? 'No services found'
                            : 'No Service History Yet',
                        actionText:
                            _searchQuery.isNotEmpty || _hasActiveFilters()
                                ? 'Clear Filters'
                                : 'Book Your First Service',
                      )
                    : RefreshIndicator(
                        onRefresh: _refreshData,
                        color: colorScheme.primary,
                        child: ListView.builder(
                          physics: const AlwaysScrollableScrollPhysics(),
                          padding: EdgeInsets.only(
                            top: 1.h,
                            bottom: 10.h, // Space for bottom navigation
                          ),
                          itemCount: _filteredServices.length,
                          itemBuilder: (context, index) {
                            final service = _filteredServices[index];
                            return ServiceHistoryCard(
                              serviceData: service,
                              onTap: () {
                                // Handle card tap expansion (handled internally)
                              },
                              onRebook: () => _rebookService(service),
                              onContact: () => _contactProvider(service),
                              onViewReceipt: () => _viewReceipt(service),
                              onShare: () => _shareService(service),
                            );
                          },
                        ),
                      ),
          ),
        ],
      ),
      bottomNavigationBar: CustomBottomBar(
        currentIndex: 2, // History tab
        variant: CustomBottomBarVariant.standard,
        onTap: (index) {
          // Handle bottom navigation
          switch (index) {
            case 0:
              Navigator.pushNamed(context, '/service-dashboard');
              break;
            case 1:
              Navigator.pushNamed(context, '/service-booking-flow');
              break;
            case 2:
              // Already on history screen
              break;
            case 3:
              Navigator.pushNamed(context, '/live-service-tracking');
              break;
            case 4:
              Navigator.pushNamed(context, '/settings-profile');
              break;
          }
        },
      ),
    );
  }

  Widget _buildLoadingState() {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return ListView.builder(
      padding: EdgeInsets.symmetric(vertical: 1.h),
      itemCount: 6,
      itemBuilder: (context, index) {
        return Container(
          margin: EdgeInsets.symmetric(vertical: 1.h, horizontal: 4.w),
          padding: EdgeInsets.all(4.w),
          decoration: BoxDecoration(
            color: colorScheme.surface,
            borderRadius: BorderRadius.circular(12),
            boxShadow: [
              BoxShadow(
                color: colorScheme.shadow.withValues(alpha: 0.05),
                blurRadius: 4,
                offset: const Offset(0, 2),
              ),
            ],
          ),
          child: Column(
            children: [
              Row(
                children: [
                  Container(
                    width: 12.w,
                    height: 12.w,
                    decoration: BoxDecoration(
                      color: colorScheme.outline.withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                  SizedBox(width: 3.w),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          height: 2.h,
                          width: 60.w,
                          decoration: BoxDecoration(
                            color: colorScheme.outline.withValues(alpha: 0.1),
                            borderRadius: BorderRadius.circular(4),
                          ),
                        ),
                        SizedBox(height: 1.h),
                        Container(
                          height: 1.5.h,
                          width: 40.w,
                          decoration: BoxDecoration(
                            color: colorScheme.outline.withValues(alpha: 0.1),
                            borderRadius: BorderRadius.circular(4),
                          ),
                        ),
                      ],
                    ),
                  ),
                  Container(
                    height: 2.h,
                    width: 15.w,
                    decoration: BoxDecoration(
                      color: colorScheme.outline.withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                ],
              ),
              SizedBox(height: 2.h),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(
                    height: 1.5.h,
                    width: 25.w,
                    decoration: BoxDecoration(
                      color: colorScheme.outline.withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(4),
                    ),
                  ),
                  Container(
                    height: 1.5.h,
                    width: 20.w,
                    decoration: BoxDecoration(
                      color: colorScheme.outline.withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(4),
                    ),
                  ),
                ],
              ),
            ],
          ),
        );
      },
    );
  }
}
