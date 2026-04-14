import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../widgets/custom_bottom_bar.dart';
import '../../widgets/custom_icon_widget.dart';
import './widgets/address_card_widget.dart';
import './widgets/emergency_contact_widget.dart';
import './widgets/payment_method_widget.dart';
import './widgets/profile_header_widget.dart';
import './widgets/settings_item_widget.dart';
import './widgets/settings_section_widget.dart';

class SettingsProfile extends StatefulWidget {
  const SettingsProfile({super.key});

  @override
  State<SettingsProfile> createState() => _SettingsProfileState();
}

class _SettingsProfileState extends State<SettingsProfile>
    with TickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _fadeAnimation;
  late Animation<Offset> _slideAnimation;

  // Settings state
  bool _notificationsEnabled = true;
  bool _promotionalOffersEnabled = false;
  bool _serviceRemindersEnabled = true;
  bool _motionSensitivityEnabled = false;
  bool _highContrastEnabled = false;
  bool _screenReaderEnabled = false;
  bool _darkModeEnabled = false;
  bool _biometricAuthEnabled = true;
  bool _twoFactorAuthEnabled = false;

  String _selectedLanguage = 'English';
  String _selectedCurrency = 'USD (\$)';
  String _sessionTimeout = '15 minutes';

  // Mock data
  final Map<String, dynamic> _userData = {
    "name": "Sarah Johnson",
    "email": "sarah.johnson@email.com",
    "profileImage":
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    "phone": "+1 (555) 123-4567",
    "joinDate": "March 2023",
  };

  final List<Map<String, dynamic>> _emergencyContacts = [
    {
      "name": "Michael Johnson",
      "phone": "+1 (555) 987-6543",
      "relationship": "Spouse",
    },
    {
      "name": "Emma Johnson",
      "phone": "+1 (555) 456-7890",
      "relationship": "Daughter",
    },
  ];

  final List<Map<String, dynamic>> _paymentMethods = [
    {
      "cardType": "Visa",
      "lastFourDigits": "4532",
      "expiryDate": "12/26",
      "isDefault": true,
    },
    {
      "cardType": "Mastercard",
      "lastFourDigits": "8901",
      "expiryDate": "08/25",
      "isDefault": false,
    },
  ];

  final List<Map<String, dynamic>> _savedAddresses = [
    {
      "title": "Home",
      "address": "123 Oak Street, Apartment 4B",
      "city": "San Francisco",
      "zipCode": "94102",
      "isDefault": true,
    },
    {
      "title": "Office",
      "address": "456 Market Street, Suite 200",
      "city": "San Francisco",
      "zipCode": "94105",
      "isDefault": false,
    },
  ];

  final List<Map<String, dynamic>> _faqData = [
    {
      "question": "How do I cancel a booking?",
      "answer":
          "You can cancel a booking up to 2 hours before the scheduled time through the app. Go to 'My Bookings', select the service, and tap 'Cancel Booking'.",
      "isExpanded": false,
    },
    {
      "question": "What payment methods are accepted?",
      "answer":
          "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay. You can manage your payment methods in the Settings.",
      "isExpanded": false,
    },
    {
      "question": "How do I rate a service provider?",
      "answer":
          "After your service is completed, you'll receive a notification to rate your experience. You can also rate providers through the 'Service History' section.",
      "isExpanded": false,
    },
    {
      "question": "Can I request the same provider again?",
      "answer":
          "Yes! You can favorite providers and request them specifically when booking. Go to 'Provider Profile' and tap the heart icon to add them to favorites.",
      "isExpanded": false,
    },
    {
      "question": "What if I'm not satisfied with the service?",
      "answer":
          "We offer a satisfaction guarantee. Contact our support team within 24 hours, and we'll work to resolve the issue or provide a refund.",
      "isExpanded": false,
    },
  ];

  @override
  void initState() {
    super.initState();
    _initializeAnimations();
  }

  void _initializeAnimations() {
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 800),
      vsync: this,
    );

    _fadeAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _animationController,
      curve: const Interval(0.0, 0.6, curve: Curves.easeOut),
    ));

    _slideAnimation = Tween<Offset>(
      begin: const Offset(0, 0.3),
      end: Offset.zero,
    ).animate(CurvedAnimation(
      parent: _animationController,
      curve: const Interval(0.2, 1.0, curve: Curves.easeOut),
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
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Scaffold(
      backgroundColor: colorScheme.surface.withValues(alpha: 0.95),
      body: AnimatedBuilder(
        animation: _animationController,
        builder: (context, child) {
          return FadeTransition(
            opacity: _fadeAnimation,
            child: SlideTransition(
              position: _slideAnimation,
              child: CustomScrollView(
                slivers: [
                  SliverToBoxAdapter(
                    child: ProfileHeaderWidget(
                      userName: _userData["name"] as String,
                      userEmail: _userData["email"] as String,
                      profileImageUrl: _userData["profileImage"] as String?,
                      onEditProfile: _showEditProfileDialog,
                    ),
                  ),
                  SliverToBoxAdapter(
                    child: Padding(
                      padding: EdgeInsets.all(4.w),
                      child: Column(
                        children: [
                          _buildPersonalInformationSection(),
                          _buildNotificationPreferencesSection(),
                          _buildPaymentMethodsSection(),
                          _buildAddressManagementSection(),
                          _buildAccessibilitySection(),
                          _buildAppPreferencesSection(),
                          _buildSecuritySettingsSection(),
                          _buildEmergencyContactsSection(),
                          _buildHelpSupportSection(),
                          _buildDataManagementSection(),
                          SizedBox(height: 10.h),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
      bottomNavigationBar: const CustomBottomBar(
        currentIndex: 4,
        variant: CustomBottomBarVariant.standard,
      ),
    );
  }

  Widget _buildPersonalInformationSection() {
    return SettingsSectionWidget(
      title: 'Personal Information',
      children: [
        SettingsItemWidget(
          title: 'Edit Profile',
          subtitle: 'Update your personal details',
          iconName: 'person',
          type: SettingsItemType.navigation,
          onTap: _showEditProfileDialog,
          isFirst: true,
        ),
        SettingsItemWidget(
          title: 'Phone Number',
          subtitle: _userData["phone"] as String,
          iconName: 'phone',
          type: SettingsItemType.navigation,
          onTap: _showPhoneUpdateDialog,
        ),
        SettingsItemWidget(
          title: 'Account Information',
          subtitle: 'Member since ${_userData["joinDate"]}',
          iconName: 'info',
          type: SettingsItemType.navigation,
          onTap: _showAccountInfoDialog,
          isLast: true,
        ),
      ],
    );
  }

  Widget _buildNotificationPreferencesSection() {
    return SettingsSectionWidget(
      title: 'Notification Preferences',
      children: [
        SettingsItemWidget(
          title: 'Push Notifications',
          subtitle: 'Booking updates and reminders',
          iconName: 'notifications',
          type: SettingsItemType.toggle,
          switchValue: _notificationsEnabled,
          onSwitchChanged: (value) {
            setState(() => _notificationsEnabled = value);
            _showSuccessSnackBar('Notification preferences updated');
          },
          isFirst: true,
        ),
        SettingsItemWidget(
          title: 'Promotional Offers',
          subtitle: 'Special deals and discounts',
          iconName: 'local_offer',
          type: SettingsItemType.toggle,
          switchValue: _promotionalOffersEnabled,
          onSwitchChanged: (value) {
            setState(() => _promotionalOffersEnabled = value);
            _showSuccessSnackBar('Promotional preferences updated');
          },
        ),
        SettingsItemWidget(
          title: 'Service Reminders',
          subtitle: 'Upcoming appointment notifications',
          iconName: 'schedule',
          type: SettingsItemType.toggle,
          switchValue: _serviceRemindersEnabled,
          onSwitchChanged: (value) {
            setState(() => _serviceRemindersEnabled = value);
            _showSuccessSnackBar('Reminder preferences updated');
          },
          isLast: true,
        ),
      ],
    );
  }

  Widget _buildPaymentMethodsSection() {
    return SettingsSectionWidget(
      title: 'Payment Methods',
      children: [
        SettingsItemWidget(
          title: 'Manage Payment Methods',
          subtitle: '${_paymentMethods.length} cards saved',
          iconName: 'payment',
          type: SettingsItemType.navigation,
          onTap: _showPaymentMethodsDialog,
          isFirst: true,
        ),
        SettingsItemWidget(
          title: 'Add New Card',
          subtitle: 'Credit or debit card',
          iconName: 'add_card',
          type: SettingsItemType.navigation,
          onTap: _showAddPaymentMethodDialog,
          isLast: true,
        ),
      ],
    );
  }

  Widget _buildAddressManagementSection() {
    return SettingsSectionWidget(
      title: 'Address Management',
      children: [
        SettingsItemWidget(
          title: 'Saved Addresses',
          subtitle: '${_savedAddresses.length} locations saved',
          iconName: 'location_on',
          type: SettingsItemType.navigation,
          onTap: _showAddressManagementDialog,
          isFirst: true,
        ),
        SettingsItemWidget(
          title: 'Add New Address',
          subtitle: 'Home, office, or other location',
          iconName: 'add_location',
          type: SettingsItemType.navigation,
          onTap: _showAddAddressDialog,
          isLast: true,
        ),
      ],
    );
  }

  Widget _buildAccessibilitySection() {
    return SettingsSectionWidget(
      title: 'Accessibility',
      children: [
        SettingsItemWidget(
          title: 'Reduce Motion',
          subtitle: 'Minimize animations and transitions',
          iconName: 'accessibility',
          type: SettingsItemType.toggle,
          switchValue: _motionSensitivityEnabled,
          onSwitchChanged: (value) {
            setState(() => _motionSensitivityEnabled = value);
            _showSuccessSnackBar('Motion settings updated');
          },
          isFirst: true,
        ),
        SettingsItemWidget(
          title: 'High Contrast',
          subtitle: 'Improve text and UI visibility',
          iconName: 'contrast',
          type: SettingsItemType.toggle,
          switchValue: _highContrastEnabled,
          onSwitchChanged: (value) {
            setState(() => _highContrastEnabled = value);
            _showSuccessSnackBar('Contrast settings updated');
          },
        ),
        SettingsItemWidget(
          title: 'Screen Reader Support',
          subtitle: 'Enhanced accessibility labels',
          iconName: 'record_voice_over',
          type: SettingsItemType.toggle,
          switchValue: _screenReaderEnabled,
          onSwitchChanged: (value) {
            setState(() => _screenReaderEnabled = value);
            _showSuccessSnackBar('Screen reader settings updated');
          },
          isLast: true,
        ),
      ],
    );
  }

  Widget _buildAppPreferencesSection() {
    return SettingsSectionWidget(
      title: 'App Preferences',
      children: [
        SettingsItemWidget(
          title: 'Dark Mode',
          subtitle: 'Switch between light and dark themes',
          iconName: 'dark_mode',
          type: SettingsItemType.toggle,
          switchValue: _darkModeEnabled,
          onSwitchChanged: (value) {
            setState(() => _darkModeEnabled = value);
            _showSuccessSnackBar('Theme updated');
          },
          isFirst: true,
        ),
        SettingsItemWidget(
          title: 'Language',
          subtitle: _selectedLanguage,
          iconName: 'language',
          type: SettingsItemType.selection,
          trailingText: _selectedLanguage,
          onTap: _showLanguageSelectionDialog,
        ),
        SettingsItemWidget(
          title: 'Currency',
          subtitle: _selectedCurrency,
          iconName: 'attach_money',
          type: SettingsItemType.selection,
          trailingText: _selectedCurrency,
          onTap: _showCurrencySelectionDialog,
          isLast: true,
        ),
      ],
    );
  }

  Widget _buildSecuritySettingsSection() {
    return SettingsSectionWidget(
      title: 'Security Settings',
      children: [
        SettingsItemWidget(
          title: 'Biometric Authentication',
          subtitle: 'Use Face ID or fingerprint',
          iconName: 'fingerprint',
          type: SettingsItemType.toggle,
          switchValue: _biometricAuthEnabled,
          onSwitchChanged: (value) {
            setState(() => _biometricAuthEnabled = value);
            _showSuccessSnackBar('Biometric settings updated');
          },
          isFirst: true,
        ),
        SettingsItemWidget(
          title: 'Session Timeout',
          subtitle: _sessionTimeout,
          iconName: 'timer',
          type: SettingsItemType.selection,
          trailingText: _sessionTimeout,
          onTap: _showSessionTimeoutDialog,
        ),
        SettingsItemWidget(
          title: 'Two-Factor Authentication',
          subtitle: 'Extra security for your account',
          iconName: 'security',
          type: SettingsItemType.toggle,
          switchValue: _twoFactorAuthEnabled,
          onSwitchChanged: (value) {
            setState(() => _twoFactorAuthEnabled = value);
            _showSuccessSnackBar(
                'Two-factor authentication ${value ? 'enabled' : 'disabled'}');
          },
        ),
        SettingsItemWidget(
          title: 'Change Password',
          subtitle: 'Update your account password',
          iconName: 'lock',
          type: SettingsItemType.navigation,
          onTap: _showChangePasswordDialog,
          isLast: true,
        ),
      ],
    );
  }

  Widget _buildEmergencyContactsSection() {
    return SettingsSectionWidget(
      title: 'Emergency Contacts',
      children: [
        SettingsItemWidget(
          title: 'Manage Emergency Contacts',
          subtitle: '${_emergencyContacts.length} contacts configured',
          iconName: 'emergency',
          type: SettingsItemType.navigation,
          onTap: _showEmergencyContactsDialog,
          isFirst: true,
        ),
        SettingsItemWidget(
          title: 'Add Emergency Contact',
          subtitle: 'Quick access for urgent services',
          iconName: 'person_add',
          type: SettingsItemType.navigation,
          onTap: _showAddEmergencyContactDialog,
          isLast: true,
        ),
      ],
    );
  }

  Widget _buildHelpSupportSection() {
    return SettingsSectionWidget(
      title: 'Help & Support',
      children: [
        SettingsItemWidget(
          title: 'FAQ',
          subtitle: 'Frequently asked questions',
          iconName: 'help',
          type: SettingsItemType.navigation,
          onTap: _showFAQDialog,
          isFirst: true,
        ),
        SettingsItemWidget(
          title: 'Contact Support',
          subtitle: 'Get help from our team',
          iconName: 'support_agent',
          type: SettingsItemType.navigation,
          onTap: _showContactSupportDialog,
        ),
        SettingsItemWidget(
          title: 'Report an Issue',
          subtitle: 'Technical problems or feedback',
          iconName: 'bug_report',
          type: SettingsItemType.navigation,
          onTap: _showReportIssueDialog,
        ),
        SettingsItemWidget(
          title: 'Rate the App',
          subtitle: 'Share your experience',
          iconName: 'star_rate',
          type: SettingsItemType.action,
          onTap: _rateApp,
          isLast: true,
        ),
      ],
    );
  }

  Widget _buildDataManagementSection() {
    return SettingsSectionWidget(
      title: 'Data Management',
      children: [
        SettingsItemWidget(
          title: 'Export Service History',
          subtitle: 'Download your booking data',
          iconName: 'download',
          type: SettingsItemType.navigation,
          onTap: _exportServiceHistory,
          isFirst: true,
        ),
        SettingsItemWidget(
          title: 'Privacy Policy',
          subtitle: 'How we handle your data',
          iconName: 'privacy_tip',
          type: SettingsItemType.action,
          onTap: _showPrivacyPolicy,
        ),
        SettingsItemWidget(
          title: 'Terms of Service',
          subtitle: 'App usage terms and conditions',
          iconName: 'description',
          type: SettingsItemType.action,
          onTap: _showTermsOfService,
        ),
        SettingsItemWidget(
          title: 'Delete Account',
          subtitle: 'Permanently remove your account',
          iconName: 'delete_forever',
          type: SettingsItemType.navigation,
          onTap: _showDeleteAccountDialog,
          isDestructive: true,
          isLast: true,
        ),
      ],
    );
  }

  // Dialog methods
  void _showEditProfileDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Edit Profile'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              decoration: InputDecoration(
                labelText: 'Full Name',
                hintText: _userData["name"] as String,
              ),
            ),
            SizedBox(height: 2.h),
            TextField(
              decoration: InputDecoration(
                labelText: 'Email',
                hintText: _userData["email"] as String,
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              _showSuccessSnackBar('Profile updated successfully');
            },
            child: Text('Save'),
          ),
        ],
      ),
    );
  }

  void _showPhoneUpdateDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Update Phone Number'),
        content: TextField(
          decoration: InputDecoration(
            labelText: 'Phone Number',
            hintText: _userData["phone"] as String,
            prefixText: '+1 ',
          ),
          keyboardType: TextInputType.phone,
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              _showSuccessSnackBar('Phone number updated');
            },
            child: Text('Update'),
          ),
        ],
      ),
    );
  }

  void _showAccountInfoDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Account Information'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Name: ${_userData["name"]}'),
            SizedBox(height: 1.h),
            Text('Email: ${_userData["email"]}'),
            SizedBox(height: 1.h),
            Text('Phone: ${_userData["phone"]}'),
            SizedBox(height: 1.h),
            Text('Member Since: ${_userData["joinDate"]}'),
            SizedBox(height: 1.h),
            Text('Account Status: Active'),
          ],
        ),
        actions: [
          ElevatedButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Close'),
          ),
        ],
      ),
    );
  }

  void _showPaymentMethodsDialog() {
    showDialog(
      context: context,
      builder: (context) => Dialog(
        child: Container(
          width: 90.w,
          height: 70.h,
          padding: EdgeInsets.all(4.w),
          child: Column(
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Payment Methods',
                    style: Theme.of(context).textTheme.headlineSmall,
                  ),
                  IconButton(
                    onPressed: () => Navigator.pop(context),
                    icon: CustomIconWidget(
                      iconName: 'close',
                      size: 6.w,
                      color: Theme.of(context).colorScheme.onSurface,
                    ),
                  ),
                ],
              ),
              SizedBox(height: 2.h),
              Expanded(
                child: ListView.builder(
                  itemCount: _paymentMethods.length,
                  itemBuilder: (context, index) {
                    final method = _paymentMethods[index];
                    return PaymentMethodWidget(
                      cardType: method["cardType"] as String,
                      lastFourDigits: method["lastFourDigits"] as String,
                      expiryDate: method["expiryDate"] as String,
                      isDefault: method["isDefault"] as bool,
                      onEdit: () => _showSuccessSnackBar('Edit payment method'),
                      onDelete: () =>
                          _showSuccessSnackBar('Payment method deleted'),
                      onSetDefault: () => _showSuccessSnackBar(
                          'Default payment method updated'),
                    );
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _showAddPaymentMethodDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Add Payment Method'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              decoration: InputDecoration(
                labelText: 'Card Number',
                hintText: '1234 5678 9012 3456',
              ),
              keyboardType: TextInputType.number,
            ),
            SizedBox(height: 2.h),
            Row(
              children: [
                Expanded(
                  child: TextField(
                    decoration: InputDecoration(
                      labelText: 'MM/YY',
                      hintText: '12/26',
                    ),
                  ),
                ),
                SizedBox(width: 3.w),
                Expanded(
                  child: TextField(
                    decoration: InputDecoration(
                      labelText: 'CVV',
                      hintText: '123',
                    ),
                    keyboardType: TextInputType.number,
                  ),
                ),
              ],
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              _showSuccessSnackBar('Payment method added successfully');
            },
            child: Text('Add Card'),
          ),
        ],
      ),
    );
  }

  void _showAddressManagementDialog() {
    showDialog(
      context: context,
      builder: (context) => Dialog(
        child: Container(
          width: 90.w,
          height: 70.h,
          padding: EdgeInsets.all(4.w),
          child: Column(
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Saved Addresses',
                    style: Theme.of(context).textTheme.headlineSmall,
                  ),
                  IconButton(
                    onPressed: () => Navigator.pop(context),
                    icon: CustomIconWidget(
                      iconName: 'close',
                      size: 6.w,
                      color: Theme.of(context).colorScheme.onSurface,
                    ),
                  ),
                ],
              ),
              SizedBox(height: 2.h),
              Expanded(
                child: ListView.builder(
                  itemCount: _savedAddresses.length,
                  itemBuilder: (context, index) {
                    final address = _savedAddresses[index];
                    return AddressCardWidget(
                      title: address["title"] as String,
                      address: address["address"] as String,
                      city: address["city"] as String,
                      zipCode: address["zipCode"] as String,
                      isDefault: address["isDefault"] as bool,
                      onEdit: () => _showSuccessSnackBar('Edit address'),
                      onDelete: () => _showSuccessSnackBar('Address deleted'),
                      onSetDefault: () =>
                          _showSuccessSnackBar('Default address updated'),
                      onViewMap: () => _showSuccessSnackBar('Opening map view'),
                    );
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _showAddAddressDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Add New Address'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              decoration: InputDecoration(
                labelText: 'Address Title',
                hintText: 'Home, Office, etc.',
              ),
            ),
            SizedBox(height: 2.h),
            TextField(
              decoration: InputDecoration(
                labelText: 'Street Address',
                hintText: '123 Main Street',
              ),
            ),
            SizedBox(height: 2.h),
            Row(
              children: [
                Expanded(
                  child: TextField(
                    decoration: InputDecoration(
                      labelText: 'City',
                      hintText: 'San Francisco',
                    ),
                  ),
                ),
                SizedBox(width: 3.w),
                Expanded(
                  child: TextField(
                    decoration: InputDecoration(
                      labelText: 'ZIP Code',
                      hintText: '94102',
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              _showSuccessSnackBar('Address added successfully');
            },
            child: Text('Add Address'),
          ),
        ],
      ),
    );
  }

  void _showLanguageSelectionDialog() {
    final languages = [
      'English',
      'Spanish',
      'French',
      'German',
      'Italian',
      'Portuguese'
    ];

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Select Language'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: languages.map((language) {
            return RadioListTile<String>(
              title: Text(language),
              value: language,
              groupValue: _selectedLanguage,
              onChanged: (value) {
                setState(() => _selectedLanguage = value!);
                Navigator.pop(context);
                _showSuccessSnackBar('Language updated to $value');
              },
            );
          }).toList(),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel'),
          ),
        ],
      ),
    );
  }

  void _showCurrencySelectionDialog() {
    final currencies = [
      'USD (\$)',
      'EUR (€)',
      'GBP (£)',
      'CAD (C\$)',
      'AUD (A\$)'
    ];

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Select Currency'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: currencies.map((currency) {
            return RadioListTile<String>(
              title: Text(currency),
              value: currency,
              groupValue: _selectedCurrency,
              onChanged: (value) {
                setState(() => _selectedCurrency = value!);
                Navigator.pop(context);
                _showSuccessSnackBar('Currency updated to $value');
              },
            );
          }).toList(),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel'),
          ),
        ],
      ),
    );
  }

  void _showSessionTimeoutDialog() {
    final timeouts = [
      '5 minutes',
      '15 minutes',
      '30 minutes',
      '1 hour',
      'Never'
    ];

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Session Timeout'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: timeouts.map((timeout) {
            return RadioListTile<String>(
              title: Text(timeout),
              value: timeout,
              groupValue: _sessionTimeout,
              onChanged: (value) {
                setState(() => _sessionTimeout = value!);
                Navigator.pop(context);
                _showSuccessSnackBar('Session timeout updated');
              },
            );
          }).toList(),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel'),
          ),
        ],
      ),
    );
  }

  void _showChangePasswordDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Change Password'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              decoration: InputDecoration(
                labelText: 'Current Password',
              ),
              obscureText: true,
            ),
            SizedBox(height: 2.h),
            TextField(
              decoration: InputDecoration(
                labelText: 'New Password',
              ),
              obscureText: true,
            ),
            SizedBox(height: 2.h),
            TextField(
              decoration: InputDecoration(
                labelText: 'Confirm New Password',
              ),
              obscureText: true,
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              _showSuccessSnackBar('Password updated successfully');
            },
            child: Text('Update Password'),
          ),
        ],
      ),
    );
  }

  void _showEmergencyContactsDialog() {
    showDialog(
      context: context,
      builder: (context) => Dialog(
        child: Container(
          width: 90.w,
          height: 70.h,
          padding: EdgeInsets.all(4.w),
          child: Column(
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Emergency Contacts',
                    style: Theme.of(context).textTheme.headlineSmall,
                  ),
                  IconButton(
                    onPressed: () => Navigator.pop(context),
                    icon: CustomIconWidget(
                      iconName: 'close',
                      size: 6.w,
                      color: Theme.of(context).colorScheme.onSurface,
                    ),
                  ),
                ],
              ),
              SizedBox(height: 2.h),
              Expanded(
                child: ListView.builder(
                  itemCount: _emergencyContacts.length,
                  itemBuilder: (context, index) {
                    final contact = _emergencyContacts[index];
                    return EmergencyContactWidget(
                      name: contact["name"] as String,
                      phone: contact["phone"] as String,
                      relationship: contact["relationship"] as String,
                      onEdit: () =>
                          _showSuccessSnackBar('Edit emergency contact'),
                      onDelete: () =>
                          _showSuccessSnackBar('Emergency contact deleted'),
                    );
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _showAddEmergencyContactDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Add Emergency Contact'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              decoration: InputDecoration(
                labelText: 'Full Name',
                hintText: 'John Doe',
              ),
            ),
            SizedBox(height: 2.h),
            TextField(
              decoration: InputDecoration(
                labelText: 'Phone Number',
                hintText: '+1 (555) 123-4567',
              ),
              keyboardType: TextInputType.phone,
            ),
            SizedBox(height: 2.h),
            TextField(
              decoration: InputDecoration(
                labelText: 'Relationship',
                hintText: 'Spouse, Parent, Friend, etc.',
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              _showSuccessSnackBar('Emergency contact added');
            },
            child: Text('Add Contact'),
          ),
        ],
      ),
    );
  }

  void _showFAQDialog() {
    showDialog(
      context: context,
      builder: (context) => Dialog(
        child: Container(
          width: 90.w,
          height: 80.h,
          padding: EdgeInsets.all(4.w),
          child: Column(
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Frequently Asked Questions',
                    style: Theme.of(context).textTheme.headlineSmall,
                  ),
                  IconButton(
                    onPressed: () => Navigator.pop(context),
                    icon: CustomIconWidget(
                      iconName: 'close',
                      size: 6.w,
                      color: Theme.of(context).colorScheme.onSurface,
                    ),
                  ),
                ],
              ),
              SizedBox(height: 2.h),
              TextField(
                decoration: InputDecoration(
                  hintText: 'Search FAQ...',
                  prefixIcon: CustomIconWidget(
                    iconName: 'search',
                    size: 5.w,
                    color: Theme.of(context).colorScheme.onSurfaceVariant,
                  ),
                ),
              ),
              SizedBox(height: 2.h),
              Expanded(
                child: ListView.builder(
                  itemCount: _faqData.length,
                  itemBuilder: (context, index) {
                    final faq = _faqData[index];
                    return ExpansionTile(
                      title: Text(
                        faq["question"] as String,
                        style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                              fontWeight: FontWeight.w500,
                            ),
                      ),
                      children: [
                        Padding(
                          padding: EdgeInsets.all(4.w),
                          child: Text(
                            faq["answer"] as String,
                            style: Theme.of(context).textTheme.bodyMedium,
                          ),
                        ),
                      ],
                    );
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _showContactSupportDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Contact Support'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              leading: CustomIconWidget(
                iconName: 'phone',
                size: 6.w,
                color: Theme.of(context).colorScheme.primary,
              ),
              title: Text('Call Support'),
              subtitle: Text('+1 (800) 123-4567'),
              onTap: () {
                Navigator.pop(context);
                _showSuccessSnackBar('Opening phone dialer');
              },
            ),
            ListTile(
              leading: CustomIconWidget(
                iconName: 'email',
                size: 6.w,
                color: Theme.of(context).colorScheme.primary,
              ),
              title: Text('Email Support'),
              subtitle: Text('support@servicepro.com'),
              onTap: () {
                Navigator.pop(context);
                _showSuccessSnackBar('Opening email client');
              },
            ),
            ListTile(
              leading: CustomIconWidget(
                iconName: 'chat',
                size: 6.w,
                color: Theme.of(context).colorScheme.primary,
              ),
              title: Text('Live Chat'),
              subtitle: Text('Available 24/7'),
              onTap: () {
                Navigator.pop(context);
                _showSuccessSnackBar('Starting live chat');
              },
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Close'),
          ),
        ],
      ),
    );
  }

  void _showReportIssueDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Report an Issue'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              decoration: InputDecoration(
                labelText: 'Issue Title',
                hintText: 'Brief description of the problem',
              ),
            ),
            SizedBox(height: 2.h),
            TextField(
              decoration: InputDecoration(
                labelText: 'Description',
                hintText: 'Please provide details about the issue',
              ),
              maxLines: 4,
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              _showSuccessSnackBar('Issue reported successfully');
            },
            child: Text('Submit Report'),
          ),
        ],
      ),
    );
  }

  void _showDeleteAccountDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Delete Account'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              'Are you sure you want to delete your account? This action cannot be undone.',
              style: Theme.of(context).textTheme.bodyMedium,
            ),
            SizedBox(height: 2.h),
            TextField(
              decoration: InputDecoration(
                labelText: 'Type "DELETE" to confirm',
                hintText: 'DELETE',
              ),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              _showSuccessSnackBar('Account deletion request submitted');
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: Theme.of(context).colorScheme.error,
            ),
            child: Text('Delete Account'),
          ),
        ],
      ),
    );
  }

  // Utility methods
  void _rateApp() {
    _showSuccessSnackBar('Opening app store for rating');
  }

  void _exportServiceHistory() {
    _showSuccessSnackBar('Service history exported successfully');
  }

  void _showPrivacyPolicy() {
    _showSuccessSnackBar('Opening privacy policy');
  }

  void _showTermsOfService() {
    _showSuccessSnackBar('Opening terms of service');
  }

  void _showSuccessSnackBar(String message) {
    HapticFeedback.lightImpact();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
        duration: const Duration(seconds: 2),
      ),
    );
  }
}
