import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../widgets/custom_bottom_bar.dart';
import '../../widgets/custom_icon_widget.dart';
import './widgets/emergency_service_button.dart';
import './widgets/location_header.dart';
import './widgets/popular_service_card.dart';
import './widgets/service_category_tile.dart';
import './widgets/weather_service_banner.dart';

class ServiceDashboard extends StatefulWidget {
  const ServiceDashboard({super.key});

  @override
  State<ServiceDashboard> createState() => _ServiceDashboardState();
}

class _ServiceDashboardState extends State<ServiceDashboard>
    with TickerProviderStateMixin {
  late AnimationController _staggerController;
  late AnimationController _refreshController;
  late List<Animation<Offset>> _slideAnimations;
  late Animation<double> _fadeAnimation;

  bool _isRefreshing = false;
  String _selectedCategory = 'All Services';
  List<Map<String, dynamic>> _filteredServices = [];

  // Mock data for services
  final List<Map<String, dynamic>> _allServices = [
    {
      "id": 1,
      "name": "House Cleaning",
      "category": "Cleaning",
      "description": "Professional deep cleaning service for your home",
      "startingPrice": "\$49",
      "rating": 4.8,
      "reviewCount": 1247,
      "icon": "cleaning_services",
      "isPopular": true,
      "availableToday": true,
    },
    {
      "id": 2,
      "name": "Plumbing Repair",
      "category": "Plumbing",
      "description": "Expert plumbing solutions for all your needs",
      "startingPrice": "\$75",
      "rating": 4.9,
      "reviewCount": 892,
      "icon": "plumbing",
      "isPopular": true,
      "availableToday": true,
    },
    {
      "id": 3,
      "name": "Electrical Work",
      "category": "Electrical",
      "description": "Licensed electricians for safe installations",
      "startingPrice": "\$85",
      "rating": 4.7,
      "reviewCount": 654,
      "icon": "electrical_services",
      "isPopular": false,
      "availableToday": false,
    },
    {
      "id": 4,
      "name": "Handyman Services",
      "category": "Handyman",
      "description": "General repairs and maintenance tasks",
      "startingPrice": "\$35",
      "rating": 4.6,
      "reviewCount": 423,
      "icon": "handyman",
      "isPopular": false,
      "availableToday": true,
    },
    {
      "id": 5,
      "name": "Beauty & Wellness",
      "category": "Beauty",
      "description": "Professional beauty treatments at home",
      "startingPrice": "\$60",
      "rating": 4.9,
      "reviewCount": 1156,
      "icon": "face",
      "isPopular": true,
      "availableToday": true,
    },
    {
      "id": 6,
      "name": "Appliance Repair",
      "category": "Appliance",
      "description": "Fix and maintain your home appliances",
      "startingPrice": "\$55",
      "rating": 4.5,
      "reviewCount": 789,
      "icon": "home_repair_service",
      "isPopular": false,
      "availableToday": true,
    },
  ];

  // Mock data for popular services
  final List<Map<String, dynamic>> _popularServices = [
    {
      "id": 1,
      "serviceName": "Deep House Cleaning",
      "category": "Cleaning",
      "description": "Complete home sanitization with eco-friendly products",
      "price": "\$89",
      "duration": "3-4 hours",
      "providerName": "Sarah Johnson",
      "providerAvatar":
          "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png",
      "providerRating": 4.9,
      "completedJobs": 156,
    },
    {
      "id": 2,
      "serviceName": "Emergency Plumbing",
      "category": "Plumbing",
      "description": "24/7 emergency plumbing services for urgent repairs",
      "price": "\$125",
      "duration": "1-2 hours",
      "providerName": "Mike Rodriguez",
      "providerAvatar":
          "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png",
      "providerRating": 4.8,
      "completedJobs": 203,
    },
    {
      "id": 3,
      "serviceName": "Home Spa Treatment",
      "category": "Beauty",
      "description": "Relaxing spa experience in the comfort of your home",
      "price": "\$150",
      "duration": "2-3 hours",
      "providerName": "Emma Chen",
      "providerAvatar":
          "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png",
      "providerRating": 5.0,
      "completedJobs": 89,
    },
  ];

  // Mock weather data
  final Map<String, dynamic> _weatherData = {
    "temperature": 72,
    "condition": "Sunny",
    "recommendation":
        "Perfect weather for outdoor maintenance and cleaning services!",
  };

  final List<Map<String, dynamic>> _weatherRecommendedServices = [
    {"name": "Window Cleaning", "icon": "window"},
    {"name": "Garden Care", "icon": "yard"},
    {"name": "Pressure Washing", "icon": "water"},
  ];

  @override
  void initState() {
    super.initState();
    _initializeAnimations();
    _filteredServices = List.from(_allServices);
    _startStaggeredAnimation();
  }

  void _initializeAnimations() {
    _staggerController = AnimationController(
      duration: const Duration(milliseconds: 1200),
      vsync: this,
    );
    _refreshController = AnimationController(
      duration: const Duration(milliseconds: 800),
      vsync: this,
    );

    _slideAnimations = List.generate(
      6,
      (index) =>
          Tween<Offset>(begin: const Offset(0, 0.5), end: Offset.zero).animate(
            CurvedAnimation(
              parent: _staggerController,
              curve: Interval(
                index * 0.1,
                0.6 + (index * 0.1),
                curve: Curves.easeOutCubic,
              ),
            ),
          ),
    );

    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(
        parent: _staggerController,
        curve: const Interval(0.0, 0.6, curve: Curves.easeOut),
      ),
    );
  }

  void _startStaggeredAnimation() {
    Future.delayed(const Duration(milliseconds: 300), () {
      if (mounted) {
        _staggerController.forward();
      }
    });
  }

  @override
  void dispose() {
    _staggerController.dispose();
    _refreshController.dispose();
    super.dispose();
  }

  Future<void> _handleRefresh() async {
    if (_isRefreshing) return;

    setState(() {
      _isRefreshing = true;
    });

    _refreshController.forward();

    // Simulate API call
    await Future.delayed(const Duration(milliseconds: 1500));

    // Reset animations and restart
    _staggerController.reset();
    _refreshController.reset();
    _startStaggeredAnimation();

    setState(() {
      _isRefreshing = false;
    });
  }

  void _filterServices(String category) {
    setState(() {
      _selectedCategory = category;
      if (category == 'All Services') {
        _filteredServices = List.from(_allServices);
      } else {
        _filteredServices =
            _allServices
                .where((service) => service['category'] == category)
                .toList();
      }
    });
  }

  void _showQuickActions(Map<String, dynamic> service) {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder:
          (context) => Container(
            padding: EdgeInsets.all(4.w),
            decoration: BoxDecoration(
              color: Theme.of(context).colorScheme.surface,
              borderRadius: const BorderRadius.vertical(
                top: Radius.circular(20),
              ),
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  width: 12.w,
                  height: 0.5.h,
                  decoration: BoxDecoration(
                    color: Theme.of(
                      context,
                    ).colorScheme.outline.withValues(alpha: 0.3),
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
                SizedBox(height: 3.h),
                Text(
                  service['name'] as String,
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),
                SizedBox(height: 3.h),
                Row(
                  children: [
                    Expanded(
                      child: _buildQuickActionButton(
                        'Add to Favorites',
                        'favorite_border',
                        () => Navigator.pop(context),
                      ),
                    ),
                    SizedBox(width: 4.w),
                    Expanded(
                      child: _buildQuickActionButton(
                        'Share Service',
                        'share',
                        () => Navigator.pop(context),
                      ),
                    ),
                  ],
                ),
                SizedBox(height: 2.h),
                SizedBox(
                  width: double.infinity,
                  child: _buildQuickActionButton(
                    'View Providers',
                    'people',
                    () {
                      Navigator.pop(context);
                      Navigator.pushNamed(context, '/provider-profile');
                    },
                  ),
                ),
                SizedBox(height: 2.h),
              ],
            ),
          ),
    );
  }

  Widget _buildQuickActionButton(
    String title,
    String icon,
    VoidCallback onTap,
  ) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return OutlinedButton(
      onPressed: onTap,
      style: OutlinedButton.styleFrom(
        padding: EdgeInsets.symmetric(vertical: 2.h),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          CustomIconWidget(
            iconName: icon,
            color: colorScheme.primary,
            size: 5.w,
          ),
          SizedBox(width: 2.w),
          Text(
            title,
            style: theme.textTheme.labelLarge?.copyWith(
              fontWeight: FontWeight.w600,
              color: Colors.black,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCategoryFilter() {
    final categories = [
      'All Services',
      'Cleaning',
      'Plumbing',
      'Electrical',
      'Handyman',
      'Beauty',
      'Appliance',
    ];

    return Container(
      height: 6.h,
      margin: EdgeInsets.symmetric(vertical: 2.h),
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        padding: EdgeInsets.symmetric(horizontal: 4.w),
        itemCount: categories.length,
        itemBuilder: (context, index) {
          final category = categories[index];
          final isSelected = category == _selectedCategory;

          return GestureDetector(
            onTap: () => _filterServices(category),
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 200),
              margin: EdgeInsets.only(right: 3.w),
              padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
              decoration: BoxDecoration(
                color:
                    isSelected
                        ? Theme.of(context).colorScheme.primary
                        : Colors.transparent,
                borderRadius: BorderRadius.circular(20),
                border: Border.all(
                  color:
                      isSelected
                          ? Theme.of(context).colorScheme.primary
                          : Theme.of(
                            context,
                          ).colorScheme.outline.withValues(alpha: 0.3),
                  width: 1,
                ),
              ),
              child: Center(
                child: Text(
                  category,
                  style: Theme.of(context).textTheme.labelMedium?.copyWith(
                    color:
                        isSelected
                            ? Theme.of(context).colorScheme.onPrimary
                            : Colors.black,
                    fontWeight: isSelected ? FontWeight.w600 : FontWeight.w400,
                  ),
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildMasonryGrid() {
    return AnimatedBuilder(
      animation: _staggerController,
      builder: (context, child) {
        return Padding(
          padding: EdgeInsets.symmetric(horizontal: 4.w),
          child: Column(
            children: [
              for (int i = 0; i < _filteredServices.length; i += 2)
                Container(
                  margin: EdgeInsets.only(bottom: 2.h),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Expanded(
                        child:
                            i < _slideAnimations.length
                                ? SlideTransition(
                                  position: _slideAnimations[i],
                                  child: FadeTransition(
                                    opacity: _fadeAnimation,
                                    child: ServiceCategoryTile(
                                      service: _filteredServices[i],
                                      onTap:
                                          () => Navigator.pushNamed(
                                            context,
                                            '/service-booking-flow',
                                          ),
                                      onLongPress:
                                          () => _showQuickActions(
                                            _filteredServices[i],
                                          ),
                                    ),
                                  ),
                                )
                                : ServiceCategoryTile(
                                  service: _filteredServices[i],
                                  onTap:
                                      () => Navigator.pushNamed(
                                        context,
                                        '/service-booking-flow',
                                      ),
                                  onLongPress:
                                      () => _showQuickActions(
                                        _filteredServices[i],
                                      ),
                                ),
                      ),
                      SizedBox(width: 4.w),
                      Expanded(
                        child:
                            i + 1 < _filteredServices.length
                                ? (i + 1 < _slideAnimations.length
                                    ? SlideTransition(
                                      position: _slideAnimations[i + 1],
                                      child: FadeTransition(
                                        opacity: _fadeAnimation,
                                        child: ServiceCategoryTile(
                                          service: _filteredServices[i + 1],
                                          onTap:
                                              () => Navigator.pushNamed(
                                                context,
                                                '/service-booking-flow',
                                              ),
                                          onLongPress:
                                              () => _showQuickActions(
                                                _filteredServices[i + 1],
                                              ),
                                        ),
                                      ),
                                    )
                                    : ServiceCategoryTile(
                                      service: _filteredServices[i + 1],
                                      onTap:
                                          () => Navigator.pushNamed(
                                            context,
                                            '/service-booking-flow',
                                          ),
                                      onLongPress:
                                          () => _showQuickActions(
                                            _filteredServices[i + 1],
                                          ),
                                    ))
                                : const SizedBox.shrink(),
                      ),
                    ],
                  ),
                ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildPopularServicesSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: EdgeInsets.symmetric(horizontal: 4.w),
          child: Row(
            children: [
              Text(
                'Popular Services',
                style: Theme.of(
                  context,
                ).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w700),
              ),
              const Spacer(),
              TextButton(
                onPressed:
                    () => Navigator.pushNamed(context, '/service-booking-flow'),
                child: Text(
                  'View All',
                  style: Theme.of(context).textTheme.labelLarge?.copyWith(
                    color: Theme.of(context).colorScheme.primary,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ],
          ),
        ),
        SizedBox(height: 2.h),
        SizedBox(
          height: 45.h,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            padding: EdgeInsets.symmetric(horizontal: 4.w),
            itemCount: _popularServices.length,
            itemBuilder: (context, index) {
              return PopularServiceCard(
                service: _popularServices[index],
                onTap:
                    () => Navigator.pushNamed(context, '/service-booking-flow'),
                onQuickBook:
                    () => Navigator.pushNamed(context, '/service-booking-flow'),
              );
            },
          ),
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      body: SafeArea(
        child: Stack(
          children: [
            RefreshIndicator(
              onRefresh: _handleRefresh,
              color: Theme.of(context).colorScheme.primary,
              child: CustomScrollView(
                slivers: [
                  // Sticky header
                  SliverToBoxAdapter(
                    child: LocationHeader(
                      currentLocation: "123 Main Street, New York, NY",
                      notificationCount: 3,
                      onLocationTap:
                          () =>
                              Navigator.pushNamed(context, '/settings-profile'),
                      onSearchTap:
                          () => Navigator.pushNamed(
                            context,
                            '/service-booking-flow',
                          ),
                      onNotificationTap:
                          () =>
                              Navigator.pushNamed(context, '/service-history'),
                    ),
                  ),
                  // Weather banner
                  SliverToBoxAdapter(
                    child: WeatherServiceBanner(
                      weatherData: _weatherData,
                      recommendedServices: _weatherRecommendedServices,
                      onServiceTap:
                          () => Navigator.pushNamed(
                            context,
                            '/service-booking-flow',
                          ),
                    ),
                  ),
                  // Category filter
                  SliverToBoxAdapter(child: _buildCategoryFilter()),
                  // Service grid
                  SliverToBoxAdapter(child: _buildMasonryGrid()),
                  // Popular services - Reduced top padding and removed bottom padding
                  SliverToBoxAdapter(
                    child: Padding(
                      padding: EdgeInsets.only(top: 1.h),
                      child: _buildPopularServicesSection(),
                    ),
                  ),
                  // Bottom spacing for FAB - Minimized spacing
                  SliverToBoxAdapter(child: SizedBox(height: 2.h)),
                ],
              ),
            ),
            // Emergency service button
            EmergencyServiceButton(
              onTap:
                  () => Navigator.pushNamed(context, '/service-booking-flow'),
            ),
          ],
        ),
      ),
      bottomNavigationBar: const CustomBottomBar(
        currentIndex: 0,
        variant: CustomBottomBarVariant.standard,
      ),
    );
  }
}
