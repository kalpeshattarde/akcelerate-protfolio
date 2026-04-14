import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../widgets/custom_tab_bar.dart';
import './widgets/emergency_contact_card_widget.dart';
import './widgets/emergency_header_widget.dart';
import './widgets/emergency_history_widget.dart';
import './widgets/first_aid_card_widget.dart';

class EmergencyResources extends StatefulWidget {
  const EmergencyResources({super.key});

  @override
  State<EmergencyResources> createState() => _EmergencyResourcesState();
}

class _EmergencyResourcesState extends State<EmergencyResources>
    with TickerProviderStateMixin {
  late TabController _tabController;
  String _currentLocation = 'Locating...';
  bool _isLoadingLocation = true;

  // Mock data for emergency contacts
  final List<Map<String, dynamic>> _emergencyContacts = [
    {
      "id": 1,
      "name": "24/7 Emergency Animal Hospital",
      "type": "emergency_vet",
      "phone": "+1-555-0123",
      "subtitle": "24 Hour Emergency Care",
      "distance": "2.3 miles",
      "waitTime": "15-30 min",
      "availability": "Open Now",
      "rating": 4.8,
      "hasNavigation": true,
      "address": "123 Emergency Blvd, City, State 12345",
    },
    {
      "id": 2,
      "name": "Pet Poison Control Hotline",
      "type": "poison_control",
      "phone": "+1-888-426-4435",
      "subtitle": "ASPCA Poison Control Center",
      "availability": "24/7 Available",
      "hasNavigation": false,
    },
    {
      "id": 3,
      "name": "VetCare Emergency Clinic",
      "type": "emergency_vet",
      "phone": "+1-555-0456",
      "subtitle": "Emergency & Critical Care",
      "distance": "4.1 miles",
      "waitTime": "45-60 min",
      "availability": "Open Now",
      "rating": 4.6,
      "hasNavigation": true,
      "address": "456 Veterinary Way, City, State 12345",
    },
    {
      "id": 4,
      "name": "Animal Emergency Center",
      "type": "emergency_vet",
      "phone": "+1-555-0789",
      "subtitle": "Specialized Emergency Services",
      "distance": "6.8 miles",
      "waitTime": "30-45 min",
      "availability": "Open Now",
      "rating": 4.9,
      "hasNavigation": true,
      "address": "789 Animal Care Dr, City, State 12345",
    },
  ];

  // Mock data for first aid information
  final List<Map<String, dynamic>> _firstAidItems = [
    {
      "id": 1,
      "title": "Choking Emergency",
      "icon": "warning",
      "severity": "Critical",
      "description":
          "Immediate action required when pet is unable to breathe due to blocked airway.",
      "steps": [
        "Stay calm and restrain your pet safely",
        "Open the mouth and look for visible objects",
        "For small objects, use tweezers to carefully remove",
        "For large dogs: lift hind legs, apply firm pressure below rib cage",
        "For small dogs/cats: hold upside down and apply back blows",
        "Check mouth again and remove any dislodged objects",
        "If unsuccessful after 1-2 minutes, rush to emergency vet immediately"
      ],
      "warning":
          "Never use your fingers to remove objects as this may push them deeper. If pet loses consciousness, begin rescue breathing."
    },
    {
      "id": 2,
      "title": "Severe Bleeding",
      "icon": "healing",
      "severity": "Critical",
      "description":
          "Control bleeding from wounds or injuries until veterinary care is available.",
      "steps": [
        "Apply direct pressure with clean cloth or gauze",
        "Do not remove cloth if it becomes soaked - add more layers",
        "Elevate the injured area above heart level if possible",
        "Apply pressure to pressure points if bleeding continues",
        "Wrap firmly with bandage but not too tight to cut circulation",
        "Monitor for signs of shock (pale gums, rapid breathing)",
        "Transport to emergency vet immediately while maintaining pressure"
      ],
      "warning":
          "Do not use tourniquets unless specifically trained. Watch for signs of shock and keep pet warm."
    },
    {
      "id": 3,
      "title": "Poisoning Symptoms",
      "icon": "warning",
      "severity": "High",
      "description": "Recognize and respond to potential poisoning in pets.",
      "steps": [
        "Identify the poison if possible (save packaging/take photos)",
        "Remove pet from source of poison immediately",
        "Do NOT induce vomiting unless specifically instructed by poison control",
        "Call Pet Poison Control Hotline immediately",
        "Provide pet's weight, age, and amount consumed if known",
        "Follow poison control instructions exactly",
        "Monitor breathing, heart rate, and consciousness",
        "Transport to emergency vet with poison information"
      ],
      "warning":
          "Never induce vomiting for caustic substances, petroleum products, or if pet is unconscious. Time is critical in poisoning cases."
    },
    {
      "id": 4,
      "title": "Seizure Management",
      "icon": "medical_services",
      "severity": "High",
      "description": "Safe handling of pets experiencing seizures.",
      "steps": [
        "Stay calm and time the seizure duration",
        "Clear area of furniture and objects that could cause injury",
        "Do NOT put hands near the mouth - pets cannot swallow tongues",
        "Gently cushion the head with soft material",
        "Speak softly and reassuringly",
        "Note seizure characteristics for veterinary report",
        "If seizure lasts more than 5 minutes, this is an emergency",
        "After seizure, keep pet calm and quiet until vet visit"
      ],
      "warning":
          "Seizures lasting over 5 minutes or multiple seizures require immediate emergency care. Post-seizure confusion is normal."
    },
    {
      "id": 5,
      "title": "Heatstroke Prevention",
      "icon": "thermostat",
      "severity": "Medium",
      "description": "Recognize and treat overheating in pets.",
      "steps": [
        "Move pet to cool, shaded area immediately",
        "Apply cool (not cold) water to paw pads and belly",
        "Offer small amounts of cool water to drink",
        "Use fan to increase air circulation",
        "Apply cool wet towels to neck and armpits",
        "Monitor temperature if possible (normal is 101-102.5°F)",
        "Stop cooling when temperature reaches 103°F",
        "Transport to vet even if pet seems recovered"
      ],
      "warning":
          "Never use ice water as this can cause shock. Heatstroke can cause organ damage even after recovery."
    },
  ];

  // Mock data for emergency history
  final List<Map<String, dynamic>> _emergencyHistory = [
    {
      "id": 1,
      "title": "Chocolate Ingestion",
      "petName": "Max (Golden Retriever)",
      "type": "poison",
      "date": DateTime.now().subtract(const Duration(days: 15)),
      "clinic": "24/7 Emergency Animal Hospital",
      "status": "Resolved",
      "notes":
          "Induced vomiting successfully. Pet recovered fully within 24 hours. Owner educated on chocolate toxicity."
    },
    {
      "id": 2,
      "title": "Laceration on Paw",
      "petName": "Luna (Border Collie)",
      "type": "injury",
      "date": DateTime.now().subtract(const Duration(days: 32)),
      "clinic": "VetCare Emergency Clinic",
      "status": "Follow-up",
      "notes":
          "Deep cut required 8 stitches. Healing well. Follow-up appointment scheduled for stitch removal."
    },
    {
      "id": 3,
      "title": "Difficulty Breathing",
      "petName": "Whiskers (Persian Cat)",
      "type": "emergency",
      "date": DateTime.now().subtract(const Duration(days: 67)),
      "clinic": "Animal Emergency Center",
      "status": "Resolved",
      "notes":
          "Asthma attack triggered by environmental allergens. Responded well to bronchodilator treatment."
    },
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
    _getCurrentLocation();
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  Future<void> _getCurrentLocation() async {
    try {
      // Request location permission
      final permission = await Permission.location.request();
      if (permission.isGranted) {
        // Get current position
        final position = await Geolocator.getCurrentPosition(
          desiredAccuracy: LocationAccuracy.high,
        );

        // For demo purposes, using mock location
        setState(() {
          _currentLocation = 'Downtown, City, State';
          _isLoadingLocation = false;
        });
      } else {
        setState(() {
          _currentLocation = 'Location access denied';
          _isLoadingLocation = false;
        });
      }
    } catch (e) {
      setState(() {
        _currentLocation = 'Unable to get location';
        _isLoadingLocation = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      body: Column(
        children: [
          EmergencyHeaderWidget(
            currentLocation: _currentLocation,
          ),
          Container(
            color: theme.colorScheme.surface,
            child: CustomTabBar(
              tabs: const ['Emergency', 'First Aid', 'History'],
              controller: _tabController,
              variant: TabBarVariant.standard,
              padding: EdgeInsets.symmetric(horizontal: 4.w),
            ),
          ),
          Expanded(
            child: TabBarView(
              controller: _tabController,
              children: [
                _buildEmergencyTab(),
                _buildFirstAidTab(),
                _buildHistoryTab(),
              ],
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _callEmergencyVet,
        backgroundColor: AppTheme.errorLight,
        foregroundColor: Colors.white,
        icon: CustomIconWidget(
          iconName: 'phone',
          color: Colors.white,
          size: 5.w,
        ),
        label: Text(
          'Emergency Call',
          style: GoogleFonts.inter(
            fontSize: 13.sp,
            fontWeight: FontWeight.w600,
            color: Colors.white,
          ),
        ),
      ),
    );
  }

  Widget _buildEmergencyTab() {
    return RefreshIndicator(
      onRefresh: _refreshEmergencyContacts,
      child: ListView(
        padding: EdgeInsets.symmetric(vertical: 2.h),
        children: [
          // Quick action buttons
          Container(
            margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
            child: Row(
              children: [
                Expanded(
                  child: _buildQuickActionButton(
                    context,
                    icon: 'phone',
                    label: 'Call 911',
                    color: AppTheme.errorLight,
                    onTap: _call911,
                  ),
                ),
                SizedBox(width: 2.w),
                Expanded(
                  child: _buildQuickActionButton(
                    context,
                    icon: 'warning',
                    label: 'Poison Control',
                    color: AppTheme.warningLight,
                    onTap: _callPoisonControl,
                  ),
                ),
              ],
            ),
          ),

          // Emergency contacts section
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
            child: Row(
              children: [
                CustomIconWidget(
                  iconName: 'local_hospital',
                  color: AppTheme.errorLight,
                  size: 5.w,
                ),
                SizedBox(width: 2.w),
                Text(
                  'Nearest Emergency Vets',
                  style: GoogleFonts.inter(
                    fontSize: 13.sp,
                    fontWeight: FontWeight.w600,
                    color: Theme.of(context).brightness == Brightness.light
                        ? AppTheme.textPrimaryLight
                        : AppTheme.textPrimaryDark,
                  ),
                ),
              ],
            ),
          ),

          // Emergency contacts list
          ..._emergencyContacts
              .map((contact) => EmergencyContactCardWidget(
                    contact: contact,
                    onTap: () => _handleContactTap(contact),
                  ))
              .toList(),

          SizedBox(height: 10.h), // Space for FAB
        ],
      ),
    );
  }

  Widget _buildFirstAidTab() {
    return ListView(
      padding: EdgeInsets.symmetric(vertical: 2.h),
      children: [
        // First aid header
        Padding(
          padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  CustomIconWidget(
                    iconName: 'medical_services',
                    color: AppTheme.primaryLight,
                    size: 5.w,
                  ),
                  SizedBox(width: 2.w),
                  Text(
                    'Pet First Aid Guide',
                    style: GoogleFonts.inter(
                      fontSize: 13.sp,
                      fontWeight: FontWeight.w600,
                      color: Theme.of(context).brightness == Brightness.light
                          ? AppTheme.textPrimaryLight
                          : AppTheme.textPrimaryDark,
                    ),
                  ),
                ],
              ),
              SizedBox(height: 1.h),
              Text(
                'Tap any card to view detailed step-by-step instructions',
                style: GoogleFonts.inter(
                  fontSize: 13.sp,
                  fontWeight: FontWeight.w400,
                  color: Theme.of(context).brightness == Brightness.light
                      ? AppTheme.textSecondaryLight
                      : AppTheme.textSecondaryDark,
                ),
              ),
            ],
          ),
        ),

        // First aid cards
        ..._firstAidItems
            .map((item) => FirstAidCardWidget(
                  firstAidItem: item,
                ))
            .toList(),

        SizedBox(height: 10.h), // Space for FAB
      ],
    );
  }

  Widget _buildHistoryTab() {
    return ListView(
      padding: EdgeInsets.symmetric(vertical: 2.h),
      children: [
        EmergencyHistoryWidget(
          emergencyHistory: _emergencyHistory,
        ),
        SizedBox(height: 10.h), // Space for FAB
      ],
    );
  }

  Widget _buildQuickActionButton(
    BuildContext context, {
    required String icon,
    required String label,
    required Color color,
    required VoidCallback onTap,
  }) {
    return Container(
      height: 12.h,
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: color.withValues(alpha: 0.3),
          width: 1,
        ),
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(12),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              CustomIconWidget(
                iconName: icon,
                color: color,
                size: 8.w,
              ),
              SizedBox(height: 1.h),
              Text(
                label,
                style: GoogleFonts.inter(
                  fontSize: 13.sp,
                  fontWeight: FontWeight.w600,
                  color: color,
                ),
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
      ),
    );
  }

  Future<void> _refreshEmergencyContacts() async {
    // Simulate refresh delay
    await Future.delayed(const Duration(seconds: 1));

    // In a real app, this would fetch updated emergency contacts
    setState(() {
      // Refresh completed
    });
  }

  void _handleContactTap(Map<String, dynamic> contact) {
    // Handle contact tap - could show more details or initiate call
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Tapped ${contact['name']}'),
        backgroundColor: AppTheme.primaryLight,
      ),
    );
  }

  void _callEmergencyVet() {
    // Call the first emergency vet in the list
    if (_emergencyContacts.isNotEmpty) {
      final firstVet = _emergencyContacts.first;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Calling ${firstVet['name']}...'),
          backgroundColor: AppTheme.errorLight,
          action: SnackBarAction(
            label: 'Cancel',
            textColor: Colors.white,
            onPressed: () {},
          ),
        ),
      );
    }
  }

  void _call911() {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: const Text('Calling 911 Emergency Services...'),
        backgroundColor: AppTheme.errorLight,
        action: SnackBarAction(
          label: 'Cancel',
          textColor: Colors.white,
          onPressed: () {},
        ),
      ),
    );
  }

  void _callPoisonControl() {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: const Text('Calling Pet Poison Control Hotline...'),
        backgroundColor: AppTheme.warningLight,
        action: SnackBarAction(
          label: 'Cancel',
          textColor: Colors.white,
          onPressed: () {},
        ),
      ),
    );
  }
}
