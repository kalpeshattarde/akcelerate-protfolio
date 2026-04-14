import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../widgets/custom_icon_widget.dart';
import './widgets/photo_upload_section_widget.dart';
import './widgets/provider_location_map_widget.dart';
import './widgets/provider_profile_card_widget.dart';
import './widgets/real_time_chat_widget.dart';
import './widgets/service_timeline_widget.dart';

class LiveServiceTracking extends StatefulWidget {
  const LiveServiceTracking({super.key});

  @override
  State<LiveServiceTracking> createState() => _LiveServiceTrackingState();
}

class _LiveServiceTrackingState extends State<LiveServiceTracking>
    with TickerProviderStateMixin {
  late AnimationController _headerController;
  late AnimationController _contentController;
  late Animation<double> _headerAnimation;
  late Animation<double> _contentAnimation;
  late Animation<Offset> _slideAnimation;

  final ScrollController _scrollController = ScrollController();
  bool _showChatOverlay = false;
  String _currentServiceStage = 'in_progress';
  List<String> _uploadedPhotos = [];

  // Mock service data
  final Map<String, dynamic> _serviceData = {
    'id': 'SRV-2025-001',
    'type': 'Plumbing Service',
    'description': 'Kitchen sink repair and pipe maintenance',
    'scheduledTime': '2:00 PM - 4:00 PM',
    'estimatedCompletion': '3:30 PM',
    'status': 'in_progress',
  };

  final Map<String, dynamic> _providerData = {
    'id': 'PRV-001',
    'name': 'Michael Rodriguez',
    'image':
        'https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png',
    'rating': 4.8,
    'reviewCount': 127,
    'serviceType': 'Plumbing Specialist',
    'completedJobs': 245,
    'experience': '5+ years',
    'responseTime': '< 10 min',
    'isOnline': true,
    'phone': '+1 (555) 123-4567',
  };

  final Map<String, dynamic> _locationData = {
    'providerLat': 40.7128,
    'providerLng': -74.0060,
    'userLat': 40.7589,
    'userLng': -73.9851,
    'estimatedArrival': '12 minutes',
    'distance': '2.3 km',
  };

  final List<Map<String, dynamic>> _chatMessages = [
    {
      'text':
          'Hi! I\'m on my way to your location. Should arrive in about 15 minutes.',
      'type': 'text',
      'isUser': false,
      'timestamp': '1:45 PM',
    },
    {
      'text': 'Great! I\'ll be waiting. The kitchen sink is the main issue.',
      'type': 'text',
      'isUser': true,
      'timestamp': '1:46 PM',
    },
    {
      'text': 'Perfect! I have all the necessary tools. See you soon!',
      'type': 'text',
      'isUser': false,
      'timestamp': '1:47 PM',
    },
  ];

  @override
  void initState() {
    super.initState();
    _initializeAnimations();
    _startPeriodicUpdates();
  }

  void _initializeAnimations() {
    _headerController = AnimationController(
      duration: const Duration(milliseconds: 800),
      vsync: this,
    );
    _contentController = AnimationController(
      duration: const Duration(milliseconds: 1000),
      vsync: this,
    );

    _headerAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _headerController,
      curve: Curves.easeOut,
    ));

    _contentAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _contentController,
      curve: Curves.easeOut,
    ));

    _slideAnimation = Tween<Offset>(
      begin: const Offset(0, 0.3),
      end: Offset.zero,
    ).animate(CurvedAnimation(
      parent: _contentController,
      curve: Curves.easeOut,
    ));

    _headerController.forward();
    Future.delayed(const Duration(milliseconds: 300), () {
      _contentController.forward();
    });
  }

  void _startPeriodicUpdates() {
    // Simulate real-time updates
    Future.delayed(const Duration(seconds: 30), () {
      if (mounted) {
        setState(() {
          _serviceData['estimatedCompletion'] = '3:15 PM';
          _locationData['estimatedArrival'] = '8 minutes';
          _locationData['distance'] = '1.8 km';
        });
      }
    });
  }

  @override
  void dispose() {
    _headerController.dispose();
    _contentController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Scaffold(
      backgroundColor: colorScheme.surface,
      body: Stack(
        children: [
          _buildMainContent(context),
          if (_showChatOverlay) _buildChatOverlay(context),
        ],
      ),
    );
  }

  Widget _buildMainContent(BuildContext context) {
    return CustomScrollView(
      controller: _scrollController,
      slivers: [
        _buildAnimatedAppBar(context),
        SliverToBoxAdapter(
          child: AnimatedBuilder(
            animation: _contentAnimation,
            builder: (context, child) {
              return FadeTransition(
                opacity: _contentAnimation,
                child: SlideTransition(
                  position: _slideAnimation,
                  child: _buildContentSections(context),
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  Widget _buildAnimatedAppBar(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return SliverAppBar(
      expandedHeight: 25.h,
      floating: false,
      pinned: true,
      elevation: 0,
      backgroundColor: colorScheme.surface,
      systemOverlayStyle: SystemUiOverlayStyle.dark,
      leading: IconButton(
        onPressed: () => Navigator.pop(context),
        icon: Container(
          padding: EdgeInsets.all(2.w),
          decoration: BoxDecoration(
            color: colorScheme.onSurface.withValues(alpha: 0.1),
            borderRadius: BorderRadius.circular(2.w),
          ),
          child: CustomIconWidget(
            iconName: 'arrow_back',
            color: colorScheme.onSurface,
            size: 6.w,
          ),
        ),
      ),
      actions: [
        IconButton(
          onPressed: _showEmergencyContact,
          icon: Container(
            padding: EdgeInsets.all(2.w),
            decoration: BoxDecoration(
              color: Colors.red.withValues(alpha: 0.9),
              borderRadius: BorderRadius.circular(2.w),
            ),
            child: CustomIconWidget(
              iconName: 'emergency',
              color: Colors.white,
              size: 6.w,
            ),
          ),
        ),
        SizedBox(width: 2.w),
      ],
      flexibleSpace: FlexibleSpaceBar(
        background: AnimatedBuilder(
          animation: _headerAnimation,
          builder: (context, child) {
            return Container(
              color: colorScheme.surface,
              child: Container(
                padding: EdgeInsets.fromLTRB(4.w, 12.h, 4.w, 4.w),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    FadeTransition(
                      opacity: _headerAnimation,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Container(
                            padding: EdgeInsets.symmetric(
                              horizontal: 3.w,
                              vertical: 1.h,
                            ),
                            decoration: BoxDecoration(
                              color: colorScheme.primaryContainer,
                              borderRadius: BorderRadius.circular(2.w),
                            ),
                            child: Text(
                              _serviceData['id'],
                              style: theme.textTheme.bodySmall?.copyWith(
                                color: colorScheme.onPrimaryContainer,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                          ),
                          SizedBox(height: 1.h),
                          Text(
                            _serviceData['type'],
                            style: theme.textTheme.headlineSmall?.copyWith(
                              color: colorScheme.onSurface,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                          SizedBox(height: 0.5.h),
                          Text(
                            _serviceData['description'],
                            style: theme.textTheme.bodyMedium?.copyWith(
                              color: colorScheme.onSurfaceVariant,
                            ),
                          ),
                          SizedBox(height: 1.h),
                          Row(
                            children: [
                              CustomIconWidget(
                                iconName: 'schedule',
                                color: colorScheme.primary,
                                size: 4.w,
                              ),
                              SizedBox(width: 2.w),
                              Text(
                                _serviceData['scheduledTime'],
                                style: theme.textTheme.bodyMedium?.copyWith(
                                  color: colorScheme.onSurface,
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            );
          },
        ),
      ),
    );
  }

  Widget _buildContentSections(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(4.w),
      child: Column(
        children: [
          ServiceTimelineWidget(
            currentStage: _currentServiceStage,
            serviceData: _serviceData,
            onStageUpdate: _handleStageUpdate,
          ),
          SizedBox(height: 4.h),
          ProviderLocationMapWidget(
            providerData: _providerData,
            locationData: _locationData,
            onMapTap: _showFullScreenMap,
          ),
          SizedBox(height: 4.h),
          ProviderProfileCardWidget(
            providerData: _providerData,
            onCallTap: _makePhoneCall,
            onMessageTap: _sendSMS,
            onChatTap: _showChat,
            onProfileTap: _showProviderProfile,
          ),
          SizedBox(height: 4.h),
          PhotoUploadSectionWidget(
            uploadedPhotos: _uploadedPhotos,
            onPhotosChanged: _handlePhotosChanged,
            title: 'Service Documentation',
            subtitle: 'Upload photos to document the service progress',
          ),
          SizedBox(height: 4.h),
          _buildActionButtons(context),
          SizedBox(height: 8.h), // Bottom padding for safe area
        ],
      ),
    );
  }

  Widget _buildActionButtons(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Row(
      children: [
        Expanded(
          child: ElevatedButton.icon(
            onPressed: _showChat,
            icon: CustomIconWidget(
              iconName: 'chat',
              color: Colors.white,
              size: 5.w,
            ),
            label: Text('Chat'),
            style: ElevatedButton.styleFrom(
              backgroundColor: colorScheme.primary,
              foregroundColor: Colors.white,
              padding: EdgeInsets.symmetric(vertical: 2.h),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(3.w),
              ),
            ),
          ),
        ),
        SizedBox(width: 3.w),
        Expanded(
          child: OutlinedButton.icon(
            onPressed: _showServiceModification,
            icon: CustomIconWidget(
              iconName: 'edit',
              color: colorScheme.primary,
              size: 5.w,
            ),
            label: Text('Modify'),
            style: OutlinedButton.styleFrom(
              foregroundColor: colorScheme.primary,
              padding: EdgeInsets.symmetric(vertical: 2.h),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(3.w),
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildChatOverlay(BuildContext context) {
    return Positioned.fill(
      child: Container(
        color: Colors.black.withValues(alpha: 0.5),
        child: Column(
          children: [
            Expanded(
              child: GestureDetector(
                onTap: _hideChat,
                child: Container(color: Colors.transparent),
              ),
            ),
            RealTimeChatWidget(
              messages: _chatMessages,
              onMessageSent: _handleMessageSent,
              providerData: _providerData,
            ),
          ],
        ),
      ),
    );
  }

  void _handleStageUpdate() {
    // Handle service stage updates
    HapticFeedback.lightImpact();
  }

  void _handlePhotosChanged(List<String> photos) {
    setState(() {
      _uploadedPhotos = photos;
    });
    HapticFeedback.selectionClick();
  }

  void _handleMessageSent(Map<String, dynamic> message) {
    setState(() {
      _chatMessages.add(message);
    });
    HapticFeedback.selectionClick();
  }

  void _makePhoneCall() {
    HapticFeedback.mediumImpact();
    // Implement phone call functionality
    debugPrint('Calling ${_providerData['phone']}');
  }

  void _sendSMS() {
    HapticFeedback.selectionClick();
    // Implement SMS functionality
    debugPrint('Sending SMS to ${_providerData['phone']}');
  }

  void _showChat() {
    setState(() {
      _showChatOverlay = true;
    });
    HapticFeedback.selectionClick();
  }

  void _hideChat() {
    setState(() {
      _showChatOverlay = false;
    });
  }

  void _showProviderProfile() {
    Navigator.pushNamed(context, '/provider-profile');
  }

  void _showFullScreenMap() {
    // Show full screen map
    HapticFeedback.selectionClick();
  }

  void _showEmergencyContact() {
    HapticFeedback.heavyImpact();
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Emergency Contact'),
        content: Text(
            'Do you need immediate assistance? This will contact emergency services.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              // Contact emergency services
            },
            style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
            child: Text('Call Emergency'),
          ),
        ],
      ),
    );
  }

  void _showServiceModification() {
    HapticFeedback.selectionClick();
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => _buildServiceModificationSheet(context),
    );
  }

  Widget _buildServiceModificationSheet(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Container(
      height: 60.h,
      decoration: BoxDecoration(
        color: colorScheme.surface,
        borderRadius: BorderRadius.vertical(
          top: Radius.circular(6.w),
        ),
      ),
      child: Column(
        children: [
          Container(
            width: 12.w,
            height: 1.h,
            margin: EdgeInsets.symmetric(vertical: 2.h),
            decoration: BoxDecoration(
              color: colorScheme.outline.withValues(alpha: 0.3),
              borderRadius: BorderRadius.circular(0.5.h),
            ),
          ),
          Padding(
            padding: EdgeInsets.all(4.w),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Service Modifications',
                  style: theme.textTheme.titleLarge?.copyWith(
                    fontWeight: FontWeight.w600,
                    color: colorScheme.onSurface,
                  ),
                ),
                SizedBox(height: 2.h),
                Text(
                  'What would you like to modify?',
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: colorScheme.onSurfaceVariant,
                  ),
                ),
                SizedBox(height: 3.h),
                _buildModificationOption(
                  context,
                  'schedule',
                  'Reschedule Service',
                  'Change the service time',
                ),
                _buildModificationOption(
                  context,
                  'add',
                  'Add Services',
                  'Include additional services',
                ),
                _buildModificationOption(
                  context,
                  'note_add',
                  'Special Instructions',
                  'Add notes for the provider',
                ),
                _buildModificationOption(
                  context,
                  'cancel',
                  'Cancel Service',
                  'Cancel this service booking',
                  isDestructive: true,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildModificationOption(
    BuildContext context,
    String iconName,
    String title,
    String subtitle, {
    bool isDestructive = false,
  }) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    final color = isDestructive ? colorScheme.error : colorScheme.onSurface;

    return InkWell(
      onTap: () {
        Navigator.pop(context);
        // Handle modification option
      },
      borderRadius: BorderRadius.circular(3.w),
      child: Container(
        padding: EdgeInsets.all(4.w),
        margin: EdgeInsets.only(bottom: 2.h),
        decoration: BoxDecoration(
          border: Border.all(
            color: colorScheme.outline.withValues(alpha: 0.2),
            width: 1,
          ),
          borderRadius: BorderRadius.circular(3.w),
        ),
        child: Row(
          children: [
            Container(
              width: 12.w,
              height: 12.w,
              decoration: BoxDecoration(
                color: color.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(3.w),
              ),
              child: Center(
                child: CustomIconWidget(
                  iconName: iconName,
                  color: color,
                  size: 6.w,
                ),
              ),
            ),
            SizedBox(width: 4.w),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: theme.textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w600,
                      color: color,
                    ),
                  ),
                  SizedBox(height: 0.5.h),
                  Text(
                    subtitle,
                    style: theme.textTheme.bodySmall?.copyWith(
                      color: colorScheme.onSurfaceVariant,
                    ),
                  ),
                ],
              ),
            ),
            CustomIconWidget(
              iconName: 'chevron_right',
              color: colorScheme.onSurfaceVariant,
              size: 5.w,
            ),
          ],
        ),
      ),
    );
  }
}
