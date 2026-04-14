import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/expandable_section.dart';
import './widgets/pet_basic_info_card.dart';
import './widgets/pet_photo_gallery.dart';
import './widgets/pet_photo_header.dart';
import './widgets/pet_switcher.dart';

class PetProfileManagement extends StatefulWidget {
  const PetProfileManagement({super.key});

  @override
  State<PetProfileManagement> createState() => _PetProfileManagementState();
}

class _PetProfileManagementState extends State<PetProfileManagement> {
  int _currentPetIndex = 0;
  bool _isEditMode = false;
  final ScrollController _scrollController = ScrollController();

  // Mock data for multiple pets
  final List<Map<String, dynamic>> _pets = [
    {
      "id": 1,
      "name": "Luna",
      "breed": "Golden Retriever",
      "age": "3 years",
      "weight": "28.5 kg",
      "image":
          "https://images.unsplash.com/photo-1552053831-71594a27632d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
      "microchip": "982000123456789",
      "adoptionDate": "March 15, 2021",
      "insurance": "PetPlan Premium",
      "color": "Golden",
      "size": "Large",
      "specialNeeds": "Hip dysplasia monitoring",
      "primaryVet": "Dr. Sarah Johnson - VetCare Clinic",
      "backupClinic": "Emergency Pet Hospital",
      "photos": [
        {
          "url":
              "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
          "timestamp": "Dec 20, 2024"
        },
        {
          "url":
              "https://images.unsplash.com/photo-1587300003388-59208cc962cb?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
          "timestamp": "Dec 18, 2024"
        },
        {
          "url":
              "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
          "timestamp": "Dec 15, 2024"
        }
      ]
    },
    {
      "id": 2,
      "name": "Max",
      "breed": "German Shepherd",
      "age": "5 years",
      "weight": "32.0 kg",
      "image":
          "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
      "microchip": "982000987654321",
      "adoptionDate": "June 10, 2019",
      "insurance": "Healthy Paws",
      "color": "Black & Tan",
      "size": "Large",
      "specialNeeds": "Food allergies - grain-free diet",
      "primaryVet": "Dr. Michael Chen - Animal Medical Center",
      "backupClinic": "24/7 Pet Emergency",
      "photos": [
        {
          "url":
              "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
          "timestamp": "Dec 22, 2024"
        },
        {
          "url":
              "https://images.unsplash.com/photo-1551717743-49959800b1f6?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
          "timestamp": "Dec 19, 2024"
        }
      ]
    },
    {
      "id": 3,
      "name": "Bella",
      "breed": "Persian Cat",
      "age": "2 years",
      "weight": "4.2 kg",
      "image":
          "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
      "microchip": "982000456789123",
      "adoptionDate": "January 8, 2022",
      "insurance": "Embrace Pet Insurance",
      "color": "White & Gray",
      "size": "Medium",
      "specialNeeds": "Regular grooming required",
      "primaryVet": "Dr. Emily Rodriguez - Feline Health Center",
      "backupClinic": "Cat Emergency Clinic",
      "photos": []
    }
  ];

  Map<String, dynamic> get _currentPet => _pets[_currentPetIndex];

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  void _onPetChanged(int index) {
    setState(() {
      _currentPetIndex = index;
      _isEditMode = false;
    });

    // Smooth scroll to top when switching pets
    _scrollController.animateTo(
      0,
      duration: const Duration(milliseconds: 300),
      curve: Curves.easeInOut,
    );
  }

  void _onImageSelected(String imagePath) {
    setState(() {
      _pets[_currentPetIndex]['image'] = imagePath;
    });

    // Show success feedback
    HapticFeedback.lightImpact();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('${_currentPet['name']}\'s photo updated successfully!'),
        backgroundColor: AppTheme.lightTheme.colorScheme.primary,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
      ),
    );
  }

  void _onEditPressed() {
    setState(() {
      _isEditMode = !_isEditMode;
    });

    HapticFeedback.selectionClick();

    if (_isEditMode) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Edit mode enabled - Tap fields to modify'),
          behavior: SnackBarBehavior.floating,
        ),
      );
    }
  }

  void _onAddPhoto(String source) {
    // Mock adding photo functionality
    final newPhoto = {
      "url": source == 'camera'
          ? "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3"
          : "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
      "timestamp": "Just now"
    };

    setState(() {
      (_currentPet['photos'] as List).insert(0, newPhoto);
    });

    HapticFeedback.lightImpact();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('New photo added to ${_currentPet['name']}\'s gallery!'),
        backgroundColor: AppTheme.lightTheme.colorScheme.secondary,
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  void _onPhotoTap(int index) {
    final photos = _currentPet['photos'] as List;

    showDialog(
      context: context,
      barrierColor: Colors.black87,
      builder: (context) => Dialog(
        backgroundColor: Colors.transparent,
        insetPadding: EdgeInsets.all(2.w),
        child: Stack(
          children: [
            Center(
              child: Container(
                constraints: BoxConstraints(
                  maxWidth: 90.w,
                  maxHeight: 70.h,
                ),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(12),
                  child: CustomImageWidget(
                    imageUrl: photos[index]['url'] as String,
                    width: double.infinity,
                    height: double.infinity,
                    fit: BoxFit.contain,
                  ),
                ),
              ),
            ),
            Positioned(
              top: 4.h,
              right: 4.w,
              child: GestureDetector(
                onTap: () => Navigator.pop(context),
                child: Container(
                  padding: EdgeInsets.all(2.w),
                  decoration: BoxDecoration(
                    color: Colors.black.withValues(alpha: 0.5),
                    shape: BoxShape.circle,
                  ),
                  child: CustomIconWidget(
                    iconName: 'close',
                    color: Colors.white,
                    size: 6.w,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _generatePetReport() {
    HapticFeedback.mediumImpact();

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Generate Pet Report'),
        content: Text(
            'Generate a comprehensive PDF report for ${_currentPet['name']}?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text(
                      '${_currentPet['name']}\'s report generated successfully!'),
                  action: SnackBarAction(
                    label: 'View',
                    onPressed: () {},
                  ),
                ),
              );
            },
            child: const Text('Generate'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      appBar: AppBar(
        title: Text('${_currentPet['name']}\'s Profile'),
        backgroundColor: AppTheme.lightTheme.colorScheme.surface,
        foregroundColor: AppTheme.lightTheme.colorScheme.onSurface,
        elevation: 0,
        scrolledUnderElevation: 1,
        leading: IconButton(
          icon: CustomIconWidget(
            iconName: 'arrow_back_ios',
            color: AppTheme.lightTheme.colorScheme.onSurface,
            size: 20,
          ),
          onPressed: () => Navigator.pop(context),
        ),
        actions: [
          IconButton(
            icon: CustomIconWidget(
              iconName: 'share',
              color: AppTheme.lightTheme.colorScheme.onSurface,
              size: 24,
            ),
            onPressed: _generatePetReport,
            tooltip: 'Share pet profile',
          ),
          IconButton(
            icon: CustomIconWidget(
              iconName: 'more_vert',
              color: AppTheme.lightTheme.colorScheme.onSurface,
              size: 24,
            ),
            onPressed: () => _showMoreOptions(context),
            tooltip: 'More options',
          ),
        ],
      ),
      body: Column(
        children: [
          // Pet switcher for multiple pets
          PetSwitcher(
            pets: _pets,
            currentPetIndex: _currentPetIndex,
            onPetChanged: _onPetChanged,
          ),

          // Main content
          Expanded(
            child: SingleChildScrollView(
              controller: _scrollController,
              physics: const BouncingScrollPhysics(),
              child: Column(
                children: [
                  // Pet photo header
                  PetPhotoHeader(
                    currentImageUrl: _currentPet['image'] as String?,
                    onImageSelected: _onImageSelected,
                    petName: _currentPet['name'] as String,
                  ),

                  SizedBox(height: 2.h),

                  // Basic info card
                  PetBasicInfoCard(
                    name: _currentPet['name'] as String,
                    breed: _currentPet['breed'] as String,
                    age: _currentPet['age'] as String,
                    weight: _currentPet['weight'] as String,
                    onEditPressed: _onEditPressed,
                  ),

                  // Basic Info expandable section
                  ExpandableSection(
                    title: 'Basic Information',
                    icon: 'info',
                    content: _buildBasicInfoContent(),
                  ),

                  // Physical Traits expandable section
                  ExpandableSection(
                    title: 'Physical Traits',
                    icon: 'pets',
                    content: _buildPhysicalTraitsContent(),
                  ),

                  // Emergency Contacts expandable section
                  ExpandableSection(
                    title: 'Emergency Contacts',
                    icon: 'emergency',
                    content: _buildEmergencyContactsContent(),
                  ),

                  // Photo Gallery expandable section
                  ExpandableSection(
                    title: 'Photo Gallery',
                    icon: 'photo_library',
                    initiallyExpanded: true,
                    content: PetPhotoGallery(
                      photos: (_currentPet['photos'] as List)
                          .cast<Map<String, dynamic>>(),
                      onAddPhoto: _onAddPhoto,
                      onPhotoTap: _onPhotoTap,
                    ),
                  ),

                  SizedBox(height: 10.h),
                ],
              ),
            ),
          ),
        ],
      ),

      // Floating action button for quick actions
      floatingActionButton: _isEditMode
          ? FloatingActionButton.extended(
              onPressed: () {
                setState(() {
                  _isEditMode = false;
                });
                HapticFeedback.mediumImpact();
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('Changes saved successfully!'),
                    backgroundColor: Colors.green,
                    behavior: SnackBarBehavior.floating,
                  ),
                );
              },
              icon: CustomIconWidget(
                iconName: 'save',
                color: Colors.white,
                size: 20,
              ),
              label: const Text('Save Changes'),
              backgroundColor: AppTheme.lightTheme.colorScheme.primary,
            )
          : null,
    );
  }

  Widget _buildBasicInfoContent() {
    return Column(
      children: [
        _buildInfoRow(
            'Microchip ID', _currentPet['microchip'] as String, 'qr_code'),
        SizedBox(height: 2.h),
        _buildInfoRow('Adoption Date', _currentPet['adoptionDate'] as String,
            'calendar_today'),
        SizedBox(height: 2.h),
        _buildInfoRow(
            'Insurance', _currentPet['insurance'] as String, 'security'),
      ],
    );
  }

  Widget _buildPhysicalTraitsContent() {
    return Column(
      children: [
        _buildInfoRow('Color', _currentPet['color'] as String, 'palette'),
        SizedBox(height: 2.h),
        _buildInfoRow('Size', _currentPet['size'] as String, 'straighten'),
        SizedBox(height: 2.h),
        _buildInfoRow('Special Needs', _currentPet['specialNeeds'] as String,
            'medical_services'),
      ],
    );
  }

  Widget _buildEmergencyContactsContent() {
    return Column(
      children: [
        _buildContactRow('Primary Veterinarian',
            _currentPet['primaryVet'] as String, 'local_hospital'),
        SizedBox(height: 2.h),
        _buildContactRow('Backup Clinic', _currentPet['backupClinic'] as String,
            'emergency'),
      ],
    );
  }

  Widget _buildInfoRow(String label, String value, String iconName) {
    return Container(
      padding: EdgeInsets.all(3.w),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.primary.withValues(alpha: 0.05),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: AppTheme.lightTheme.dividerColor,
          width: 1,
        ),
      ),
      child: Row(
        children: [
          CustomIconWidget(
            iconName: iconName,
            color: AppTheme.lightTheme.colorScheme.primary,
            size: 5.w,
          ),
          SizedBox(width: 3.w),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  label,
                  style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                    color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                  ),
                ),
                SizedBox(height: 0.5.h),
                Text(
                  value,
                  style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ],
            ),
          ),
          if (_isEditMode)
            CustomIconWidget(
              iconName: 'edit',
              color: AppTheme.lightTheme.colorScheme.primary,
              size: 4.w,
            ),
        ],
      ),
    );
  }

  Widget _buildContactRow(String label, String value, String iconName) {
    return Container(
      padding: EdgeInsets.all(3.w),
      decoration: BoxDecoration(
        color:
            AppTheme.lightTheme.colorScheme.secondary.withValues(alpha: 0.05),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: AppTheme.lightTheme.dividerColor,
          width: 1,
        ),
      ),
      child: Row(
        children: [
          CustomIconWidget(
            iconName: iconName,
            color: AppTheme.lightTheme.colorScheme.secondary,
            size: 5.w,
          ),
          SizedBox(width: 3.w),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  label,
                  style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                    color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                  ),
                ),
                SizedBox(height: 0.5.h),
                Text(
                  value,
                  style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ],
            ),
          ),
          GestureDetector(
            onTap: () {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text('Calling $label...'),
                  action: SnackBarAction(
                    label: 'Cancel',
                    onPressed: () {},
                  ),
                ),
              );
            },
            child: Container(
              padding: EdgeInsets.all(2.w),
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.colorScheme.secondary,
                borderRadius: BorderRadius.circular(8),
              ),
              child: CustomIconWidget(
                iconName: 'phone',
                color: Colors.white,
                size: 4.w,
              ),
            ),
          ),
        ],
      ),
    );
  }

  void _showMoreOptions(BuildContext context) {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (context) => Container(
        decoration: BoxDecoration(
          color: AppTheme.lightTheme.colorScheme.surface,
          borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
        ),
        child: SafeArea(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 40,
                height: 4,
                margin: const EdgeInsets.symmetric(vertical: 12),
                decoration: BoxDecoration(
                  color: AppTheme.lightTheme.dividerColor,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(16),
                child: Text(
                  'Pet Options',
                  style: AppTheme.lightTheme.textTheme.titleLarge,
                ),
              ),
              ListTile(
                leading: CustomIconWidget(
                  iconName: 'medical_services',
                  color: AppTheme.lightTheme.colorScheme.primary,
                  size: 24,
                ),
                title: const Text('Medical Records'),
                subtitle: const Text('View health history'),
                onTap: () {
                  Navigator.pop(context);
                  Navigator.pushNamed(context, '/medical-records');
                },
              ),
              ListTile(
                leading: CustomIconWidget(
                  iconName: 'medication',
                  color: AppTheme.lightTheme.colorScheme.secondary,
                  size: 24,
                ),
                title: const Text('Medications'),
                subtitle: const Text('Manage prescriptions'),
                onTap: () {
                  Navigator.pop(context);
                  Navigator.pushNamed(context, '/medication-management');
                },
              ),
              ListTile(
                leading: CustomIconWidget(
                  iconName: 'analytics',
                  color: AppTheme.lightTheme.colorScheme.tertiary,
                  size: 24,
                ),
                title: const Text('Health Analytics'),
                subtitle: const Text('View trends and insights'),
                onTap: () {
                  Navigator.pop(context);
                  Navigator.pushNamed(context, '/health-analytics');
                },
              ),
              const SizedBox(height: 16),
            ],
          ),
        ),
      ),
    );
  }
}
