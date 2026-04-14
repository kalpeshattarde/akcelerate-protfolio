import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../theme/app_theme.dart';
import './widgets/address_selection_widget.dart';
import './widgets/order_summary_widget.dart';
import './widgets/service_selection_widget.dart';
import './widgets/wizard_progress_widget.dart';

class BookingWizardModal extends StatefulWidget {
  const BookingWizardModal({Key? key}) : super(key: key);

  @override
  State<BookingWizardModal> createState() => _BookingWizardModalState();
}

class _BookingWizardModalState extends State<BookingWizardModal>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<Offset> _slideAnimation;

  int _currentStep = 1;
  final int _totalSteps = 3;

  String? _selectedService;
  String? _selectedAddress;
  DateTime? _selectedDate;
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: Duration(milliseconds: 300),
      vsync: this,
    );

    _slideAnimation = Tween<Offset>(
      begin: Offset(0, 1),
      end: Offset.zero,
    ).animate(CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeOutCubic,
    ));

    _animationController.forward();
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black.withValues(alpha: 0.5),
      body: GestureDetector(
        onTap: () => _closeModal(),
        child: Container(
          alignment: Alignment.bottomCenter,
          child: GestureDetector(
            onTap: () {}, // Prevent closing when tapping on modal content
            child: SlideTransition(
              position: _slideAnimation,
              child: Container(
                constraints: BoxConstraints(
                  maxHeight: 85.h,
                  minHeight: 60.h,
                ),
                decoration: BoxDecoration(
                  color: AppTheme.lightTheme.scaffoldBackgroundColor,
                  borderRadius: BorderRadius.vertical(
                    top: Radius.circular(20),
                  ),
                ),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    // Drag indicator
                    Container(
                      margin: EdgeInsets.only(top: 1.h),
                      width: 10.w,
                      height: 0.5.h,
                      decoration: BoxDecoration(
                        color: AppTheme.lightTheme.dividerColor,
                        borderRadius: BorderRadius.circular(2),
                      ),
                    ),

                    // Progress header
                    WizardProgressWidget(
                      currentStep: _currentStep,
                      totalSteps: _totalSteps,
                      onClose: _closeModal,
                    ),

                    // Content area
                    Expanded(
                      child: SingleChildScrollView(
                        padding: EdgeInsets.all(4.w),
                        child: _buildStepContent(),
                      ),
                    ),

                    // Bottom action buttons
                    _buildBottomActions(),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildStepContent() {
    switch (_currentStep) {
      case 1:
        return ServiceSelectionWidget(
          selectedService: _selectedService,
          onServiceSelected: (service) {
            setState(() {
              _selectedService = service;
            });
          },
        );
      case 2:
        return AddressSelectionWidget(
          selectedAddress: _selectedAddress,
          onAddressSelected: (address) {
            setState(() {
              _selectedAddress = address;
            });
          },
        );
      case 3:
        return OrderSummaryWidget(
          selectedService: _selectedService,
          selectedAddress: _selectedAddress,
          selectedDate: _selectedDate,
          onDateSelected: (date) {
            setState(() {
              _selectedDate = date;
            });
          },
        );
      default:
        return Container();
    }
  }

  Widget _buildBottomActions() {
    return Container(
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.scaffoldBackgroundColor,
        border: Border(
          top: BorderSide(
            color: AppTheme.lightTheme.dividerColor,
            width: 1,
          ),
        ),
      ),
      child: SafeArea(
        child: Row(
          children: [
            if (_currentStep > 1) ...[
              Expanded(
                flex: 1,
                child: OutlinedButton(
                  onPressed: _isLoading ? null : _goToPreviousStep,
                  child: Text("Back"),
                ),
              ),
              SizedBox(width: 4.w),
            ],
            Expanded(
              flex: 2,
              child: ElevatedButton(
                onPressed: _isLoading ? null : _handleNextAction,
                child: _isLoading
                    ? SizedBox(
                        height: 5.w,
                        width: 5.w,
                        child: CircularProgressIndicator(
                          strokeWidth: 2,
                          valueColor: AlwaysStoppedAnimation<Color>(
                            AppTheme.lightTheme.colorScheme.onPrimary,
                          ),
                        ),
                      )
                    : Text(_getNextButtonText()),
              ),
            ),
          ],
        ),
      ),
    );
  }

  String _getNextButtonText() {
    switch (_currentStep) {
      case 1:
        return "Next";
      case 2:
        return "Next";
      case 3:
        return "Confirm Booking";
      default:
        return "Next";
    }
  }

  bool _canProceedToNext() {
    switch (_currentStep) {
      case 1:
        return _selectedService != null;
      case 2:
        return _selectedAddress != null;
      case 3:
        return _selectedDate != null;
      default:
        return false;
    }
  }

  void _handleNextAction() {
    if (!_canProceedToNext()) return;

    if (_currentStep < _totalSteps) {
      _goToNextStep();
    } else {
      _confirmBooking();
    }
  }

  void _goToNextStep() {
    setState(() {
      _currentStep++;
    });
  }

  void _goToPreviousStep() {
    setState(() {
      _currentStep--;
    });
  }

  Future<void> _confirmBooking() async {
    setState(() {
      _isLoading = true;
    });

    // Simulate booking process
    await Future.delayed(Duration(seconds: 2));

    setState(() {
      _isLoading = false;
    });

    // Navigate to order confirmation screen
    Navigator.of(context).pushReplacementNamed('/order-confirmation-screen');
  }

  void _closeModal() {
    _animationController.reverse().then((_) {
      Navigator.of(context).pop();
    });
  }
}
