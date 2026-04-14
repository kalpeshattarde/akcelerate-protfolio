import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../widgets/custom_icon_widget.dart';
import './widgets/provider_availability_widget.dart';
import './widgets/provider_booking_widget.dart';
import './widgets/provider_certifications_widget.dart';
import './widgets/provider_communication_widget.dart';
import './widgets/provider_gallery_widget.dart';
import './widgets/provider_header_widget.dart';
import './widgets/provider_reviews_widget.dart';
import './widgets/provider_services_widget.dart';
import './widgets/provider_stats_widget.dart';

class ProviderProfile extends StatefulWidget {
  const ProviderProfile({super.key});

  @override
  State<ProviderProfile> createState() => _ProviderProfileState();
}

class _ProviderProfileState extends State<ProviderProfile> {
  final ScrollController _scrollController = ScrollController();
  bool _showFloatingBookButton = false;

  // Mock provider data
  final Map<String, dynamic> _providerData = {
    'id': 'provider_001',
    'name': 'Michael Rodriguez',
    'profileImage':
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    'rating': 4.8,
    'reviewCount': 247,
    'yearsExperience': 8,
    'specialization': 'Electrical & Plumbing Services',
    'isAvailable': true,
    'isFavorite': false,
    'startingPrice': 65,
    'discount': 15,
    'responseTime': '2 hours',
    'emergencyAvailable': true,
    'nextAvailable': 'Tomorrow 9:00 AM',
  };

  final Map<String, dynamic> _statsData = {
    'completionRate': 98,
    'averageRating': 4.8,
    'totalServices': 247,
  };

  final List<Map<String, dynamic>> _certifications = [
    {
      'id': 'cert_001',
      'name': 'Licensed Electrician',
      'issuer': 'State Board',
      'icon': 'electrical_services',
      'isVerified': true,
    },
    {
      'id': 'cert_002',
      'name': 'Plumbing Certification',
      'issuer': 'Trade Association',
      'icon': 'plumbing',
      'isVerified': true,
    },
    {
      'id': 'cert_003',
      'name': 'Safety Training',
      'issuer': 'OSHA',
      'icon': 'security',
      'isVerified': true,
    },
    {
      'id': 'cert_004',
      'name': 'Background Check',
      'issuer': 'ServicePro',
      'icon': 'verified_user',
      'isVerified': true,
    },
  ];

  final List<Map<String, dynamic>> _services = [
    {
      'id': 'service_001',
      'name': 'Electrical Repair',
      'icon': 'electrical_services',
    },
    {
      'id': 'service_002',
      'name': 'Plumbing',
      'icon': 'plumbing',
    },
    {
      'id': 'service_003',
      'name': 'Wiring Installation',
      'icon': 'cable',
    },
    {
      'id': 'service_004',
      'name': 'Fixture Installation',
      'icon': 'lightbulb',
    },
    {
      'id': 'service_005',
      'name': 'Emergency Repairs',
      'icon': 'emergency',
    },
  ];

  final List<Map<String, dynamic>> _galleryImages = [
    {
      'id': 'img_001',
      'url':
          'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop',
      'serviceType': 'Electrical Work',
    },
    {
      'id': 'img_002',
      'url':
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      'serviceType': 'Plumbing Repair',
    },
    {
      'id': 'img_003',
      'url':
          'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
      'serviceType': 'Installation',
    },
    {
      'id': 'img_004',
      'url':
          'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop',
      'serviceType': 'Maintenance',
    },
    {
      'id': 'img_005',
      'url':
          'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
      'serviceType': 'Wiring',
    },
    {
      'id': 'img_006',
      'url':
          'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop',
      'serviceType': 'Fixture Setup',
    },
  ];

  final List<Map<String, dynamic>> _reviews = [
    {
      'id': 'review_001',
      'customerName': 'Sarah Johnson',
      'rating': 5.0,
      'date': 'Aug 15, 2025',
      'comment':
          'Michael did an excellent job fixing our electrical issues. He was professional, punctual, and explained everything clearly. The work was completed efficiently and the pricing was fair. Highly recommend his services!',
      'serviceType': 'Electrical Repair',
      'helpfulVotes': 12,
    },
    {
      'id': 'review_002',
      'customerName': 'David Chen',
      'rating': 4.5,
      'date': 'Aug 10, 2025',
      'comment':
          'Great plumbing work! Michael arrived on time and quickly diagnosed the problem. The repair was done professionally and he cleaned up after himself. Will definitely call him again for future plumbing needs.',
      'serviceType': 'Plumbing',
      'helpfulVotes': 8,
    },
    {
      'id': 'review_003',
      'customerName': 'Emily Rodriguez',
      'rating': 5.0,
      'date': 'Aug 5, 2025',
      'comment':
          'Outstanding service! Michael installed new light fixtures throughout our home. His attention to detail and quality of work exceeded our expectations. Very satisfied with the results.',
      'serviceType': 'Installation',
      'helpfulVotes': 15,
    },
    {
      'id': 'review_004',
      'customerName': 'Robert Wilson',
      'rating': 4.0,
      'date': 'Jul 28, 2025',
      'comment':
          'Solid work on our kitchen plumbing. Michael was knowledgeable and got the job done right. Only minor issue was he arrived slightly later than scheduled, but he called ahead to let us know.',
      'serviceType': 'Plumbing',
      'helpfulVotes': 6,
    },
    {
      'id': 'review_005',
      'customerName': 'Lisa Thompson',
      'rating': 5.0,
      'date': 'Jul 20, 2025',
      'comment':
          'Emergency electrical repair was handled perfectly. Michael responded quickly to our urgent call and fixed the problem safely. His expertise and professionalism during a stressful situation was much appreciated.',
      'serviceType': 'Emergency Repair',
      'helpfulVotes': 20,
    },
  ];

  final Map<String, dynamic> _availabilityData = {
    'responseTime': '2 hours',
    'unavailableDates': ['2025-08-25', '2025-08-26'],
  };

  @override
  void initState() {
    super.initState();
    _scrollController.addListener(_onScroll);
  }

  @override
  void dispose() {
    _scrollController.removeListener(_onScroll);
    _scrollController.dispose();
    super.dispose();
  }

  void _onScroll() {
    final shouldShow = _scrollController.offset > 300;
    if (shouldShow != _showFloatingBookButton) {
      setState(() {
        _showFloatingBookButton = shouldShow;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Scaffold(
      backgroundColor: colorScheme.surface,
      body: Stack(
        children: [
          CustomScrollView(
            controller: _scrollController,
            slivers: [
              // Provider header with image and basic info
              SliverToBoxAdapter(
                child: ProviderHeaderWidget(
                  providerData: _providerData,
                ),
              ),

              // Performance statistics
              SliverToBoxAdapter(
                child: ProviderStatsWidget(
                  statsData: _statsData,
                ),
              ),

              // Certifications and verifications
              SliverToBoxAdapter(
                child: ProviderCertificationsWidget(
                  certifications: _certifications,
                ),
              ),

              // Service specializations
              SliverToBoxAdapter(
                child: ProviderServicesWidget(
                  services: _services,
                ),
              ),

              // Work gallery
              SliverToBoxAdapter(
                child: ProviderGalleryWidget(
                  galleryImages: _galleryImages,
                ),
              ),

              // Availability calendar
              SliverToBoxAdapter(
                child: ProviderAvailabilityWidget(
                  availabilityData: _availabilityData,
                ),
              ),

              // Customer reviews
              SliverToBoxAdapter(
                child: ProviderReviewsWidget(
                  reviews: _reviews,
                ),
              ),

              // Communication options
              SliverToBoxAdapter(
                child: ProviderCommunicationWidget(
                  providerData: _providerData,
                ),
              ),

              // Bottom spacing for sticky booking widget
              SliverToBoxAdapter(
                child: SizedBox(height: 20.h),
              ),
            ],
          ),

          // Floating book button (appears when scrolling)
          if (_showFloatingBookButton)
            Positioned(
              top: 6.h,
              right: 4.w,
              child: AnimatedContainer(
                duration: const Duration(milliseconds: 300),
                child: FloatingActionButton.extended(
                  onPressed: () =>
                      Navigator.pushNamed(context, '/service-booking-flow'),
                  backgroundColor: colorScheme.primary,
                  foregroundColor: Colors.white,
                  icon: CustomIconWidget(
                    iconName: 'calendar_today',
                    color: Colors.white,
                    size: 20,
                  ),
                  label: Text(
                    'Book Now',
                    style: theme.textTheme.labelLarge?.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ),
            ),
        ],
      ),

      // Sticky booking widget at bottom
      bottomNavigationBar: ProviderBookingWidget(
        providerData: _providerData,
      ),
    );
  }
}
