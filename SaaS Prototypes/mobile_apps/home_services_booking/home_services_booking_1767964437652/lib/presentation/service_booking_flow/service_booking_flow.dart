import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../widgets/custom_icon_widget.dart';
import './widgets/booking_progress_indicator.dart';
import './widgets/booking_summary_sheet.dart';
import './widgets/date_time_picker_widget.dart';
import './widgets/pricing_calculator_widget.dart';
import './widgets/provider_selection_widget.dart';
import './widgets/room_selection_widget.dart';
import './widgets/service_customization_widget.dart';
import './widgets/service_header_card.dart';
import './widgets/special_instructions_widget.dart';

class ServiceBookingFlow extends StatefulWidget {
  const ServiceBookingFlow({super.key});

  @override
  State<ServiceBookingFlow> createState() => _ServiceBookingFlowState();
}

class _ServiceBookingFlowState extends State<ServiceBookingFlow>
    with TickerProviderStateMixin {
  late PageController _pageController;
  late AnimationController _celebrationController;
  late Animation<double> _celebrationAnimation;

  int _currentStep = 0;
  final int _totalSteps = 6;
  bool _showSummarySheet = false;

  // Booking data
  final Map<String, dynamic> _selectedService = {
    'id': 'service_1',
    'name': 'Premium House Cleaning',
    'category': 'cleaning',
    'description': 'Complete home cleaning service with professional equipment',
    'basePrice': 75,
  };

  List<String> _selectedRooms = [];
  List<String> _selectedAddOns = [];
  DateTime? _selectedDate;
  String? _selectedTimeSlot;
  String? _selectedProviderId;
  String _specialInstructions = '';

  final List<String> _stepLabels = [
    'Rooms',
    'Add-ons',
    'Schedule',
    'Provider',
    'Details',
    'Review',
  ];

  @override
  void initState() {
    super.initState();
    _pageController = PageController();
    _celebrationController = AnimationController(
      duration: const Duration(milliseconds: 2000),
      vsync: this,
    );
    _celebrationAnimation = Tween<double>(
      begin: 0,
      end: 1,
    ).animate(CurvedAnimation(
      parent: _celebrationController,
      curve: Curves.easeInOut,
    ));
  }

  @override
  void dispose() {
    _pageController.dispose();
    _celebrationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Scaffold(
      backgroundColor: colorScheme.surface,
      appBar: AppBar(
        title: Text('Book Service'),
        backgroundColor: colorScheme.surface,
        elevation: 0,
        leading: IconButton(
          onPressed: () => _handleBackNavigation(),
          icon: CustomIconWidget(
            iconName: 'arrow_back',
            color: colorScheme.onSurface,
            size: 6.w,
          ),
        ),
        actions: [
          if (_currentStep > 0)
            TextButton(
              onPressed: _showBookingSummary,
              child: Text(
                'Review',
                style: theme.textTheme.labelLarge?.copyWith(
                  color: colorScheme.primary,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
        ],
      ),
      body: Stack(
        children: [
          Column(
            children: [
              // Progress indicator
              BookingProgressIndicator(
                currentStep: _currentStep,
                totalSteps: _totalSteps,
                stepLabels: _stepLabels,
              ),

              // Service header
              ServiceHeaderCard(selectedService: _selectedService),

              // Main content
              Expanded(
                child: PageView(
                  controller: _pageController,
                  onPageChanged: (index) {
                    setState(() {
                      _currentStep = index;
                    });
                  },
                  children: [
                    _buildRoomSelectionStep(),
                    _buildServiceCustomizationStep(),
                    _buildDateTimeSelectionStep(),
                    _buildProviderSelectionStep(),
                    _buildSpecialInstructionsStep(),
                    _buildReviewStep(),
                  ],
                ),
              ),

              // Navigation buttons
              _buildNavigationButtons(theme, colorScheme),
            ],
          ),

          // Booking summary sheet
          if (_showSummarySheet)
            Positioned.fill(
              child: GestureDetector(
                onTap: () => setState(() => _showSummarySheet = false),
                child: Container(
                  color: Colors.black.withValues(alpha: 0.5),
                  child: BookingSummarySheet(
                    bookingData: _getBookingData(),
                    onBookService: _handleBookingConfirmation,
                    onClose: () => setState(() => _showSummarySheet = false),
                  ),
                ),
              ),
            ),

          // Celebration overlay
          if (_celebrationAnimation.value > 0)
            Positioned.fill(
              child: AnimatedBuilder(
                animation: _celebrationAnimation,
                builder: (context, child) {
                  return Opacity(
                    opacity: _celebrationAnimation.value,
                    child: Container(
                      color: colorScheme.primary.withValues(alpha: 0.1),
                      child: Center(
                        child: Transform.scale(
                          scale: _celebrationAnimation.value,
                          child: Container(
                            padding: EdgeInsets.all(8.w),
                            decoration: BoxDecoration(
                              color: colorScheme.surface,
                              borderRadius: BorderRadius.circular(20),
                              boxShadow: [
                                BoxShadow(
                                  color:
                                      colorScheme.shadow.withValues(alpha: 0.2),
                                  blurRadius: 20,
                                  offset: const Offset(0, 4),
                                ),
                              ],
                            ),
                            child: Column(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                CustomIconWidget(
                                  iconName: 'check_circle',
                                  color: colorScheme.secondary,
                                  size: 20.w,
                                ),
                                SizedBox(height: 2.h),
                                Text(
                                  'Booking Confirmed!',
                                  style:
                                      theme.textTheme.headlineSmall?.copyWith(
                                    fontWeight: FontWeight.w700,
                                    color: colorScheme.onSurface,
                                  ),
                                ),
                                SizedBox(height: 1.h),
                                Text(
                                  'Your service has been successfully booked',
                                  style: theme.textTheme.bodyMedium?.copyWith(
                                    color: colorScheme.onSurfaceVariant,
                                  ),
                                  textAlign: TextAlign.center,
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildRoomSelectionStep() {
    return SingleChildScrollView(
      child: RoomSelectionWidget(
        selectedRooms: _selectedRooms,
        onRoomsChanged: (rooms) {
          setState(() {
            _selectedRooms = rooms;
          });
        },
      ),
    );
  }

  Widget _buildServiceCustomizationStep() {
    return SingleChildScrollView(
      child: Column(
        children: [
          ServiceCustomizationWidget(
            selectedAddOns: _selectedAddOns,
            onAddOnsChanged: (addOns) {
              setState(() {
                _selectedAddOns = addOns;
              });
            },
          ),
          SizedBox(height: 2.h),
          PricingCalculatorWidget(
            selectedService: _selectedService,
            selectedRooms: _selectedRooms,
            selectedAddOns: _selectedAddOns,
          ),
        ],
      ),
    );
  }

  Widget _buildDateTimeSelectionStep() {
    return SingleChildScrollView(
      child: DateTimePickerWidget(
        selectedDate: _selectedDate,
        selectedTimeSlot: _selectedTimeSlot,
        onDateChanged: (date) {
          setState(() {
            _selectedDate = date;
          });
        },
        onTimeSlotChanged: (timeSlot) {
          setState(() {
            _selectedTimeSlot = timeSlot;
          });
        },
      ),
    );
  }

  Widget _buildProviderSelectionStep() {
    return SingleChildScrollView(
      child: ProviderSelectionWidget(
        selectedProviderId: _selectedProviderId,
        onProviderChanged: (providerId) {
          setState(() {
            _selectedProviderId = providerId;
          });
        },
      ),
    );
  }

  Widget _buildSpecialInstructionsStep() {
    return SingleChildScrollView(
      child: SpecialInstructionsWidget(
        instructions: _specialInstructions,
        onInstructionsChanged: (instructions) {
          setState(() {
            _specialInstructions = instructions;
          });
        },
      ),
    );
  }

  Widget _buildReviewStep() {
    return SingleChildScrollView(
      child: Container(
        padding: EdgeInsets.all(4.w),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Review Your Booking',
              style: Theme.of(context).textTheme.titleLarge?.copyWith(
                    fontWeight: FontWeight.w700,
                  ),
            ),
            SizedBox(height: 2.h),
            PricingCalculatorWidget(
              selectedService: _selectedService,
              selectedRooms: _selectedRooms,
              selectedAddOns: _selectedAddOns,
            ),
            SizedBox(height: 3.h),
            Container(
              width: double.infinity,
              padding: EdgeInsets.all(4.w),
              decoration: BoxDecoration(
                color: Theme.of(context)
                    .colorScheme
                    .secondary
                    .withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Column(
                children: [
                  CustomIconWidget(
                    iconName: 'info',
                    color: Theme.of(context).colorScheme.secondary,
                    size: 8.w,
                  ),
                  SizedBox(height: 1.h),
                  Text(
                    'Ready to book your service?',
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.w600,
                        ),
                    textAlign: TextAlign.center,
                  ),
                  SizedBox(height: 0.5.h),
                  Text(
                    'Tap "Book Service" to confirm your booking and proceed to payment.',
                    style: Theme.of(context).textTheme.bodySmall?.copyWith(
                          color: Theme.of(context).colorScheme.onSurfaceVariant,
                        ),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildNavigationButtons(ThemeData theme, ColorScheme colorScheme) {
    return Container(
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: colorScheme.surface,
        boxShadow: [
          BoxShadow(
            color: colorScheme.shadow.withValues(alpha: 0.1),
            blurRadius: 8,
            offset: const Offset(0, -2),
          ),
        ],
      ),
      child: SafeArea(
        child: Row(
          children: [
            if (_currentStep > 0)
              Expanded(
                child: OutlinedButton(
                  onPressed: _previousStep,
                  style: OutlinedButton.styleFrom(
                    padding: EdgeInsets.symmetric(vertical: 2.h),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  child: Text(
                    'Previous',
                    style: theme.textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ),
            if (_currentStep > 0) SizedBox(width: 4.w),
            Expanded(
              flex: _currentStep == 0 ? 1 : 1,
              child: ElevatedButton(
                onPressed: _canProceed() ? _nextStep : null,
                style: ElevatedButton.styleFrom(
                  padding: EdgeInsets.symmetric(vertical: 2.h),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                child: Text(
                  _currentStep == _totalSteps - 1 ? 'Book Service' : 'Next',
                  style: theme.textTheme.titleMedium?.copyWith(
                    color: colorScheme.onPrimary,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _nextStep() {
    if (_currentStep < _totalSteps - 1) {
      _pageController.nextPage(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
    } else {
      _showBookingSummary();
    }
  }

  void _previousStep() {
    if (_currentStep > 0) {
      _pageController.previousPage(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
    }
  }

  void _handleBackNavigation() {
    if (_currentStep > 0) {
      _previousStep();
    } else {
      Navigator.pop(context);
    }
  }

  bool _canProceed() {
    switch (_currentStep) {
      case 0: // Room selection
        return _selectedRooms.isNotEmpty;
      case 1: // Service customization
        return true; // Add-ons are optional
      case 2: // Date/time selection
        return _selectedDate != null && _selectedTimeSlot != null;
      case 3: // Provider selection
        return _selectedProviderId != null;
      case 4: // Special instructions
        return true; // Instructions are optional
      case 5: // Review
        return true;
      default:
        return false;
    }
  }

  void _showBookingSummary() {
    setState(() {
      _showSummarySheet = true;
    });
  }

  Map<String, dynamic> _getBookingData() {
    double totalPrice = (_selectedService['basePrice'] as num).toDouble();
    totalPrice += _selectedRooms.length * 15.0; // Room price

    // Add-on prices
    final addOnPrices = {
      'Deep Cleaning': 25,
      'Window Cleaning': 15,
      'Carpet Cleaning': 35,
      'Refrigerator Cleaning': 20,
      'Oven Cleaning': 30,
      'Eco-Friendly Products': 10,
    };

    for (final addOn in _selectedAddOns) {
      totalPrice += (addOnPrices[addOn] ?? 0).toDouble();
    }

    return {
      'service': _selectedService,
      'selectedRooms': _selectedRooms,
      'selectedAddOns': _selectedAddOns,
      'selectedDate': _selectedDate,
      'selectedTimeSlot': _selectedTimeSlot,
      'selectedProviderId': _selectedProviderId,
      'specialInstructions': _specialInstructions,
      'totalPrice': totalPrice,
    };
  }

  void _handleBookingConfirmation() {
    setState(() {
      _showSummarySheet = false;
    });

    _celebrationController.forward().then((_) {
      Future.delayed(const Duration(seconds: 1), () {
        Navigator.pushNamed(context, '/live-service-tracking');
      });
    });
  }
}
