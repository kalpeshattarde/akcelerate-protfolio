import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:image_picker/image_picker.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/feedback_categories_widget.dart';
import './widgets/photo_upload_widget.dart';
import './widgets/review_text_field_widget.dart';
import './widgets/service_summary_widget.dart';
import './widgets/star_rating_widget.dart';
import './widgets/tip_calculator_widget.dart';

class ServiceRatingReview extends StatefulWidget {
  const ServiceRatingReview({super.key});

  @override
  State<ServiceRatingReview> createState() => _ServiceRatingReviewState();
}

class _ServiceRatingReviewState extends State<ServiceRatingReview>
    with TickerProviderStateMixin {
  late AnimationController _submitAnimationController;
  late AnimationController _confettiAnimationController;
  late Animation<double> _submitScaleAnimation;
  late Animation<double> _confettiAnimation;

  int _rating = 0;
  String _reviewText = '';
  List<XFile> _photos = [];
  double _tipAmount = 0.0;
  List<String> _selectedCategories = [];
  bool _isAnonymous = false;
  bool _isSubmitting = false;
  bool _isSubmitted = false;

  // Mock service data
  final Map<String, dynamic> _serviceData = {
    'id': 'SRV-2025-001',
    'title': 'Deep House Cleaning Service',
    'category': 'Cleaning',
    'providerName': 'Sarah Johnson',
    'providerAvatar':
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    'providerRating': 4.9,
    'providerReviews': 234,
    'completedDate': 'Today, 2:30 PM',
    'duration': '3 hours',
    'amount': 125.0,
  };

  @override
  void initState() {
    super.initState();

    _submitAnimationController = AnimationController(
      duration: const Duration(milliseconds: 200),
      vsync: this,
    );

    _confettiAnimationController = AnimationController(
      duration: const Duration(milliseconds: 2000),
      vsync: this,
    );

    _submitScaleAnimation = Tween<double>(
      begin: 1.0,
      end: 0.95,
    ).animate(CurvedAnimation(
      parent: _submitAnimationController,
      curve: Curves.easeInOut,
    ));

    _confettiAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _confettiAnimationController,
      curve: Curves.easeOut,
    ));
  }

  @override
  void dispose() {
    _submitAnimationController.dispose();
    _confettiAnimationController.dispose();
    super.dispose();
  }

  bool get _canSubmit => _rating > 0;

  Future<void> _submitReview() async {
    if (!_canSubmit) {
      _showValidationMessage();
      return;
    }

    setState(() {
      _isSubmitting = true;
    });

    _submitAnimationController.forward().then((_) {
      _submitAnimationController.reverse();
    });

    // Simulate API call
    await Future.delayed(const Duration(seconds: 2));

    setState(() {
      _isSubmitting = false;
      _isSubmitted = true;
    });

    // Trigger celebration animation
    _confettiAnimationController.forward();
    HapticFeedback.heavyImpact();

    // Show success message after animation
    await Future.delayed(const Duration(milliseconds: 500));
    _showSuccessDialog();
  }

  void _showValidationMessage() {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          'Please provide a rating to submit your review',
          style: GoogleFonts.inter(
            fontSize: 14.sp,
            fontWeight: FontWeight.w500,
          ),
        ),
        backgroundColor: AppTheme.lightTheme.colorScheme.error,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
      ),
    );
  }

  void _showSuccessDialog() {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // Success animation
            AnimatedBuilder(
              animation: _confettiAnimation,
              builder: (context, child) {
                return Transform.scale(
                  scale: _confettiAnimation.value,
                  child: Container(
                    width: 20.w,
                    height: 20.w,
                    decoration: BoxDecoration(
                      color: AppTheme.lightTheme.colorScheme.secondary,
                      borderRadius: BorderRadius.circular(50),
                    ),
                    child: CustomIconWidget(
                      iconName: 'check',
                      color: Colors.white,
                      size: 32,
                    ),
                  ),
                );
              },
            ),
            SizedBox(height: 3.h),

            Text(
              'Thank You!',
              style: GoogleFonts.inter(
                fontSize: 20.sp,
                fontWeight: FontWeight.w700,
                color: AppTheme.lightTheme.colorScheme.onSurface,
              ),
            ),
            SizedBox(height: 1.h),
            Text(
              'Your review helps other users make better decisions',
              style: GoogleFonts.inter(
                fontSize: 14.sp,
                fontWeight: FontWeight.w400,
                color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
              ),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 3.h),

            // Action buttons
            Column(
              children: [
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: () {
                      Navigator.of(context).pop();
                      _showRebookingOption();
                    },
                    child: Text(
                      'Book Again',
                      style: GoogleFonts.inter(
                        fontSize: 16.sp,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ),
                SizedBox(height: 1.h),
                SizedBox(
                  width: double.infinity,
                  child: TextButton(
                    onPressed: () {
                      Navigator.of(context).pop();
                      Navigator.pushNamed(context, '/service-history');
                    },
                    child: Text(
                      'View Service History',
                      style: GoogleFonts.inter(
                        fontSize: 16.sp,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  void _showRebookingOption() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
      ),
      builder: (context) => Container(
        padding: EdgeInsets.all(6.w),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 12.w,
              height: 0.5.h,
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.colorScheme.outline
                    .withValues(alpha: 0.3),
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            SizedBox(height: 3.h),
            Text(
              'Book Same Service Again?',
              style: GoogleFonts.inter(
                fontSize: 18.sp,
                fontWeight: FontWeight.w600,
                color: AppTheme.lightTheme.colorScheme.onSurface,
              ),
            ),
            SizedBox(height: 1.h),
            Text(
              'We\'ll pre-fill your preferences from this booking',
              style: GoogleFonts.inter(
                fontSize: 14.sp,
                fontWeight: FontWeight.w400,
                color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
              ),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 3.h),
            Row(
              children: [
                Expanded(
                  child: OutlinedButton(
                    onPressed: () {
                      Navigator.of(context).pop();
                      Navigator.pushNamed(context, '/service-dashboard');
                    },
                    child: Text(
                      'Maybe Later',
                      style: GoogleFonts.inter(
                        fontSize: 16.sp,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                ),
                SizedBox(width: 3.w),
                Expanded(
                  child: ElevatedButton(
                    onPressed: () {
                      Navigator.of(context).pop();
                      Navigator.pushNamed(context, '/service-booking-flow');
                    },
                    child: Text(
                      'Book Now',
                      style: GoogleFonts.inter(
                        fontSize: 16.sp,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ),
              ],
            ),
            SizedBox(height: 2.h),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Scaffold(
      backgroundColor: colorScheme.surface,
      appBar: AppBar(
        title: Text(
          'Rate & Review',
          style: GoogleFonts.inter(
            fontSize: 18.sp,
            fontWeight: FontWeight.w600,
            color: colorScheme.onSurface,
          ),
        ),
        backgroundColor: colorScheme.surface,
        elevation: 0,
        leading: IconButton(
          onPressed: () => Navigator.of(context).pop(),
          icon: CustomIconWidget(
            iconName: 'arrow_back',
            color: colorScheme.onSurface,
            size: 24,
          ),
        ),
        actions: [
          if (!_isSubmitted)
            TextButton(
              onPressed: () => Navigator.pushNamed(context, '/service-history'),
              child: Text(
                'Skip',
                style: GoogleFonts.inter(
                  fontSize: 14.sp,
                  fontWeight: FontWeight.w500,
                  color: colorScheme.primary,
                ),
              ),
            ),
        ],
      ),
      body: Stack(
        children: [
          SingleChildScrollView(
            padding: EdgeInsets.all(4.w),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Service summary
                ServiceSummaryWidget(serviceData: _serviceData),
                SizedBox(height: 4.h),

                // Star rating
                Center(
                  child: Column(
                    children: [
                      Text(
                        'How was your experience?',
                        style: GoogleFonts.inter(
                          fontSize: 18.sp,
                          fontWeight: FontWeight.w600,
                          color: colorScheme.onSurface,
                        ),
                      ),
                      SizedBox(height: 2.h),
                      StarRatingWidget(
                        rating: _rating,
                        onRatingChanged: (rating) {
                          setState(() {
                            _rating = rating;
                          });
                        },
                        size: 48.0,
                      ),
                      SizedBox(height: 1.h),
                      if (_rating > 0)
                        Text(
                          _getRatingText(_rating),
                          style: GoogleFonts.inter(
                            fontSize: 14.sp,
                            fontWeight: FontWeight.w500,
                            color: _getRatingColor(_rating),
                          ),
                        ),
                    ],
                  ),
                ),
                SizedBox(height: 4.h),

                // Review text field
                ReviewTextFieldWidget(
                  onChanged: (text) {
                    setState(() {
                      _reviewText = text;
                    });
                  },
                ),
                SizedBox(height: 4.h),

                // Photo upload
                PhotoUploadWidget(
                  onPhotosChanged: (photos) {
                    setState(() {
                      _photos = photos;
                    });
                  },
                ),
                SizedBox(height: 4.h),

                // Feedback categories
                FeedbackCategoriesWidget(
                  onCategoriesChanged: (categories) {
                    setState(() {
                      _selectedCategories = categories;
                    });
                  },
                ),
                SizedBox(height: 4.h),

                // Tip calculator
                TipCalculatorWidget(
                  serviceAmount: _serviceData['amount'] as double,
                  onTipChanged: (tip) {
                    setState(() {
                      _tipAmount = tip;
                    });
                  },
                ),
                SizedBox(height: 4.h),

                // Anonymous toggle
                Container(
                  padding: EdgeInsets.all(4.w),
                  decoration: BoxDecoration(
                    color: colorScheme.surface,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(
                      color: colorScheme.outline.withValues(alpha: 0.2),
                      width: 1,
                    ),
                  ),
                  child: Row(
                    children: [
                      CustomIconWidget(
                        iconName: 'visibility_off',
                        color: colorScheme.onSurfaceVariant,
                        size: 20,
                      ),
                      SizedBox(width: 3.w),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Submit Anonymously',
                              style: GoogleFonts.inter(
                                fontSize: 14.sp,
                                fontWeight: FontWeight.w600,
                                color: colorScheme.onSurface,
                              ),
                            ),
                            Text(
                              'Your name won\'t be shown with this review',
                              style: GoogleFonts.inter(
                                fontSize: 12.sp,
                                fontWeight: FontWeight.w400,
                                color: colorScheme.onSurfaceVariant,
                              ),
                            ),
                          ],
                        ),
                      ),
                      Switch(
                        value: _isAnonymous,
                        onChanged: (value) {
                          setState(() {
                            _isAnonymous = value;
                          });
                        },
                      ),
                    ],
                  ),
                ),
                SizedBox(height: 12.h), // Extra space for submit button
              ],
            ),
          ),

          // Confetti overlay
          if (_isSubmitted)
            AnimatedBuilder(
              animation: _confettiAnimation,
              builder: (context, child) {
                return Positioned.fill(
                  child: IgnorePointer(
                    child: CustomPaint(
                      painter: ConfettiPainter(_confettiAnimation.value),
                    ),
                  ),
                );
              },
            ),
        ],
      ),
      bottomNavigationBar: Container(
        padding: EdgeInsets.all(4.w),
        decoration: BoxDecoration(
          color: colorScheme.surface,
          border: Border(
            top: BorderSide(
              color: colorScheme.outline.withValues(alpha: 0.2),
              width: 1,
            ),
          ),
        ),
        child: SafeArea(
          child: AnimatedBuilder(
            animation: _submitScaleAnimation,
            builder: (context, child) {
              return Transform.scale(
                scale: _submitScaleAnimation.value,
                child: SizedBox(
                  width: double.infinity,
                  height: 56.0,
                  child: ElevatedButton(
                    onPressed:
                        _isSubmitting || _isSubmitted ? null : _submitReview,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: _canSubmit
                          ? colorScheme.primary
                          : colorScheme.outline.withValues(alpha: 0.3),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                    child: _isSubmitting
                        ? Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              SizedBox(
                                width: 5.w,
                                height: 5.w,
                                child: CircularProgressIndicator(
                                  color: colorScheme.onPrimary,
                                  strokeWidth: 2,
                                ),
                              ),
                              SizedBox(width: 3.w),
                              Text(
                                'Submitting...',
                                style: GoogleFonts.inter(
                                  fontSize: 16.sp,
                                  fontWeight: FontWeight.w600,
                                  color: colorScheme.onPrimary,
                                ),
                              ),
                            ],
                          )
                        : Text(
                            _isSubmitted
                                ? 'Review Submitted!'
                                : 'Submit Review',
                            style: GoogleFonts.inter(
                              fontSize: 16.sp,
                              fontWeight: FontWeight.w600,
                              color: _canSubmit
                                  ? colorScheme.onPrimary
                                  : colorScheme.onSurfaceVariant,
                            ),
                          ),
                  ),
                ),
              );
            },
          ),
        ),
      ),
    );
  }

  String _getRatingText(int rating) {
    switch (rating) {
      case 1:
        return 'Poor';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Very Good';
      case 5:
        return 'Excellent';
      default:
        return '';
    }
  }

  Color _getRatingColor(int rating) {
    switch (rating) {
      case 1:
        return const Color(0xFFEF4444);
      case 2:
        return const Color(0xFFF97316);
      case 3:
        return const Color(0xFFF59E0B);
      case 4:
        return const Color(0xFF84CC16);
      case 5:
        return const Color(0xFF22C55E);
      default:
        return AppTheme.lightTheme.colorScheme.onSurfaceVariant;
    }
  }
}

// Custom painter for confetti animation
class ConfettiPainter extends CustomPainter {
  final double progress;

  ConfettiPainter(this.progress);

  @override
  void paint(Canvas canvas, Size size) {
    if (progress == 0) return;

    final paint = Paint();
    final colors = [
      const Color(0xFF2563EB),
      const Color(0xFF10B981),
      const Color(0xFFF59E0B),
      const Color(0xFFEC4899),
      const Color(0xFF8B5CF6),
    ];

    for (int i = 0; i < 50; i++) {
      final x = (i * 37) % size.width;
      final y = size.height * (1 - progress) + (i * 23) % 100;

      paint.color = colors[i % colors.length];
      canvas.drawCircle(
        Offset(x, y),
        2 + (i % 3),
        paint,
      );
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}
