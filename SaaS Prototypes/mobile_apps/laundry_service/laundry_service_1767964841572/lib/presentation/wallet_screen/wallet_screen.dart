import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/credit_balance_widget.dart';
import './widgets/credits_faq_widget.dart';
import './widgets/earning_opportunities_widget.dart';
import './widgets/refer_friend_widget.dart';
import './widgets/referral_tracking_widget.dart';
import './widgets/transaction_history_widget.dart';

class WalletScreen extends StatefulWidget {
  const WalletScreen({Key? key}) : super(key: key);

  @override
  State<WalletScreen> createState() => _WalletScreenState();
}

class _WalletScreenState extends State<WalletScreen> {
  final String _currentBalance = '₹0 Credit';
  final String _referralCode = 'LAUNDRY2025';
  bool _isRefreshing = false;

  // Mock transaction data
  final List<Map<String, dynamic>> _transactions = [
    {
      'type': 'earning',
      'amount': '₹50',
      'description': 'Referral Bonus - Sarah joined',
      'date': '18 Aug 2025, 2:30 PM',
      'details':
          'Your friend Sarah completed their first order using your referral code. Bonus credited to your wallet.',
    },
    {
      'type': 'usage',
      'amount': '₹25',
      'description': 'Order Payment Discount',
      'date': '15 Aug 2025, 11:45 AM',
      'details':
          'Credits used for order #LF2025081501. Remaining balance applied to your laundry service.',
    },
    {
      'type': 'earning',
      'amount': '₹30',
      'description': 'Profile Completion Bonus',
      'date': '12 Aug 2025, 9:15 AM',
      'details':
          'Bonus for completing your profile with address and preferences. Thank you for providing complete information.',
    },
  ];

  // Mock referral data
  final List<Map<String, dynamic>> _pendingReferrals = [
    {
      'name': 'Mike Johnson',
      'date': '17 Aug 2025',
    },
    {
      'name': 'Emma Wilson',
      'date': '16 Aug 2025',
    },
  ];

  final List<Map<String, dynamic>> _successfulReferrals = [
    {
      'name': 'Sarah Davis',
      'date': '18 Aug 2025',
      'reward': '₹50',
    },
    {
      'name': 'John Smith',
      'date': '10 Aug 2025',
      'reward': '₹50',
    },
  ];

  // Mock earning opportunities
  final List<Map<String, dynamic>> _earningOpportunities = [
    {
      'title': 'Rate Recent Order',
      'description': 'Share your experience with our service',
      'reward': '₹10',
      'icon': 'star_rate',
      'actionId': 'rate_order',
      'isCompleted': false,
    },
    {
      'title': 'Complete Profile',
      'description': 'Add your preferences and delivery instructions',
      'reward': '₹20',
      'icon': 'person',
      'actionId': 'complete_profile',
      'isCompleted': true,
    },
    {
      'title': 'First Order Bonus',
      'description': 'Place your first order and get bonus credits',
      'reward': '₹25',
      'icon': 'shopping_bag',
      'actionId': 'first_order',
      'isCompleted': false,
    },
  ];

  // Mock FAQ data
  final List<Map<String, dynamic>> _faqItems = [
    {
      'question': 'How do I earn credits?',
      'answer':
          'You can earn credits by referring friends, completing your profile, rating orders, and participating in promotional activities. Each successful referral gives you ₹50 credits.',
    },
    {
      'question': 'How do I use my credits?',
      'answer':
          'Credits are automatically applied to your orders as discounts. You can choose to use partial or full credits during checkout. Credits never expire and can be accumulated.',
    },
    {
      'question': 'When do referral credits get added?',
      'answer':
          'Referral credits are added to your wallet within 24 hours after your referred friend completes their first order. You will receive a notification once credits are added.',
    },
    {
      'question': 'Can I transfer credits to others?',
      'answer':
          'Credits are non-transferable and tied to your account. However, you can refer friends to help them earn their own credits through our referral program.',
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      appBar: AppBar(
        title: Text(
          'Wallet',
          style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
        backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
        elevation: 0,
        actions: [
          IconButton(
            onPressed: () => _showWalletInfo(context),
            icon: CustomIconWidget(
              iconName: 'info_outline',
              color: AppTheme.lightTheme.primaryColor,
              size: 24,
            ),
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: _handleRefresh,
        color: AppTheme.lightTheme.primaryColor,
        child: SingleChildScrollView(
          physics: AlwaysScrollableScrollPhysics(),
          child: SafeArea(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Credit Balance Section
                CreditBalanceWidget(
                  balance: _currentBalance,
                  onRefresh: _handleBalanceRefresh,
                ),

                // Refer Friend Section
                ReferFriendWidget(
                  referralCode: _referralCode,
                  onShare: _handleReferralShare,
                ),

                // Referral Tracking Section
                ReferralTrackingWidget(
                  pendingReferrals: _pendingReferrals,
                  successfulReferrals: _successfulReferrals,
                ),

                // Earning Opportunities Section
                EarningOpportunitiesWidget(
                  opportunities: _earningOpportunities,
                  onOpportunityTap: _handleOpportunityTap,
                ),

                // Transaction History Section
                TransactionHistoryWidget(
                  transactions: _transactions,
                ),

                // Credits FAQ Section
                CreditsFaqWidget(
                  faqItems: _faqItems,
                ),

                SizedBox(height: 4.h),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Future<void> _handleRefresh() async {
    setState(() {
      _isRefreshing = true;
    });

    // Simulate network call
    await Future.delayed(Duration(seconds: 2));

    setState(() {
      _isRefreshing = false;
    });

    Fluttertoast.showToast(
      msg: 'Wallet refreshed successfully!',
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
      backgroundColor: AppTheme.successLight,
      textColor: Colors.white,
    );
  }

  void _handleBalanceRefresh() {
    Fluttertoast.showToast(
      msg: 'Balance updated!',
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
      backgroundColor: AppTheme.lightTheme.primaryColor,
      textColor: Colors.white,
    );
  }

  void _handleReferralShare() {
    // This is called after successful share
    Fluttertoast.showToast(
      msg: 'Keep sharing to earn more credits!',
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
      backgroundColor: AppTheme.accentLight,
      textColor: Colors.white,
    );
  }

  void _handleOpportunityTap(String actionId) {
    switch (actionId) {
      case 'rate_order':
        _showRatingDialog();
        break;
      case 'complete_profile':
        Navigator.pushNamed(context, '/profile-screen');
        break;
      case 'first_order':
        Navigator.pushNamed(context, '/home-screen');
        break;
      default:
        Fluttertoast.showToast(
          msg: 'Feature coming soon!',
          toastLength: Toast.LENGTH_SHORT,
          gravity: ToastGravity.BOTTOM,
          backgroundColor: AppTheme.textSecondaryLight,
          textColor: Colors.white,
        );
    }
  }

  void _showRatingDialog() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          title: Row(
            children: [
              CustomIconWidget(
                iconName: 'star_rate',
                color: AppTheme.accentLight,
                size: 24,
              ),
              SizedBox(width: 2.w),
              Text(
                'Rate Your Experience',
                style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                'How was your recent laundry service experience?',
                style: AppTheme.lightTheme.textTheme.bodyMedium,
              ),
              SizedBox(height: 3.h),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: List.generate(5, (index) {
                  return GestureDetector(
                    onTap: () {
                      Navigator.of(context).pop();
                      _completeRatingTask();
                    },
                    child: CustomIconWidget(
                      iconName: 'star',
                      color: AppTheme.accentLight,
                      size: 32,
                    ),
                  );
                }),
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: Text(
                'Later',
                style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                  color: AppTheme.textSecondaryLight,
                ),
              ),
            ),
          ],
        );
      },
    );
  }

  void _completeRatingTask() {
    setState(() {
      final rateOrderIndex = _earningOpportunities.indexWhere(
        (opportunity) => (opportunity['actionId'] as String) == 'rate_order',
      );
      if (rateOrderIndex != -1) {
        _earningOpportunities[rateOrderIndex]['isCompleted'] = true;
      }
    });

    Fluttertoast.showToast(
      msg: '₹10 credits earned! Thank you for rating.',
      toastLength: Toast.LENGTH_LONG,
      gravity: ToastGravity.BOTTOM,
      backgroundColor: AppTheme.successLight,
      textColor: Colors.white,
    );
  }

  void _showWalletInfo(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          title: Row(
            children: [
              CustomIconWidget(
                iconName: 'account_balance_wallet',
                color: AppTheme.lightTheme.primaryColor,
                size: 24,
              ),
              SizedBox(width: 2.w),
              Text(
                'Wallet Information',
                style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Your LaundryFlow wallet helps you save money on every order.',
                style: AppTheme.lightTheme.textTheme.bodyMedium,
              ),
              SizedBox(height: 2.h),
              _buildInfoItem(
                  '💰', 'Earn credits through referrals and activities'),
              _buildInfoItem('🎯', 'Use credits as discounts on orders'),
              _buildInfoItem('♾️', 'Credits never expire'),
              _buildInfoItem('🔄', 'Automatic application at checkout'),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: Text(
                'Got it!',
                style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                  color: AppTheme.lightTheme.primaryColor,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          ],
        );
      },
    );
  }

  Widget _buildInfoItem(String emoji, String text) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 0.5.h),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            emoji,
            style: TextStyle(fontSize: 16),
          ),
          SizedBox(width: 2.w),
          Expanded(
            child: Text(
              text,
              style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                color: AppTheme.textSecondaryLight,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
