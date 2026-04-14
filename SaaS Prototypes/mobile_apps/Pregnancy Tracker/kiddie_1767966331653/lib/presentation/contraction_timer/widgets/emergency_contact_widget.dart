import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../../core/app_export.dart';
import '../../../widgets/custom_icon_widget.dart';

class EmergencyContactWidget extends StatelessWidget {
  const EmergencyContactWidget({super.key});

  Future<void> _makePhoneCall(String phoneNumber) async {
    final Uri launchUri = Uri(
      scheme: 'tel',
      path: phoneNumber,
    );
    if (await canLaunchUrl(launchUri)) {
      await launchUrl(launchUri);
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      width: double.infinity,
      padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
      decoration: BoxDecoration(
        color: theme.colorScheme.errorContainer.withValues(alpha: 0.2),
        border: Border(
          bottom: BorderSide(
            color: theme.colorScheme.error.withValues(alpha: 0.3),
            width: 1,
          ),
        ),
      ),
      child: Row(
        children: [
          Container(
            padding: EdgeInsets.all(2.w),
            decoration: BoxDecoration(
              color: theme.colorScheme.error.withValues(alpha: 0.1),
              shape: BoxShape.circle,
            ),
            child: CustomIconWidget(
              iconName: 'local_hospital',
              color: theme.colorScheme.error,
              size: 24,
            ),
          ),
          SizedBox(width: 3.w),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Emergency Contacts',
                  style: theme.textTheme.titleSmall?.copyWith(
                    fontWeight: FontWeight.w600,
                    color: theme.colorScheme.error,
                  ),
                ),
                Text(
                  'Quick access to healthcare provider',
                  style: theme.textTheme.bodySmall?.copyWith(
                    color: theme.colorScheme.onSurfaceVariant,
                  ),
                ),
              ],
            ),
          ),
          IconButton(
            onPressed: () {
              _showEmergencyContactsDialog(context, theme);
            },
            icon: CustomIconWidget(
              iconName: 'phone',
              color: theme.colorScheme.error,
              size: 24,
            ),
            tooltip: 'Call Emergency Contact',
          ),
        ],
      ),
    );
  }

  void _showEmergencyContactsDialog(BuildContext context, ThemeData theme) {
    final emergencyContacts = [
      {
        'name': 'Healthcare Provider',
        'phone': '555-0123',
        'type': 'Primary',
      },
      {
        'name': 'Hospital Labor & Delivery',
        'phone': '555-0456',
        'type': 'Hospital',
      },
      {
        'name': 'Emergency Services',
        'phone': '911',
        'type': 'Emergency',
      },
    ];

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Row(
          children: [
            CustomIconWidget(
              iconName: 'local_hospital',
              color: theme.colorScheme.error,
              size: 24,
            ),
            SizedBox(width: 2.w),
            Text('Emergency Contacts'),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: emergencyContacts.map((contact) {
            return ListTile(
              contentPadding: EdgeInsets.zero,
              leading: Container(
                padding: EdgeInsets.all(2.w),
                decoration: BoxDecoration(
                  color:
                      theme.colorScheme.errorContainer.withValues(alpha: 0.3),
                  shape: BoxShape.circle,
                ),
                child: CustomIconWidget(
                  iconName:
                      contact['type'] == 'Emergency' ? 'emergency' : 'phone',
                  color: theme.colorScheme.error,
                  size: 20,
                ),
              ),
              title: Text(
                contact['name']!,
                style: theme.textTheme.titleSmall?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
              subtitle: Text(
                contact['phone']!,
                style: theme.textTheme.bodyMedium,
              ),
              trailing: IconButton(
                icon: CustomIconWidget(
                  iconName: 'call',
                  color: theme.colorScheme.primary,
                  size: 24,
                ),
                onPressed: () {
                  Navigator.pop(context);
                  _makePhoneCall(contact['phone']!);
                },
              ),
            );
          }).toList(),
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
}
