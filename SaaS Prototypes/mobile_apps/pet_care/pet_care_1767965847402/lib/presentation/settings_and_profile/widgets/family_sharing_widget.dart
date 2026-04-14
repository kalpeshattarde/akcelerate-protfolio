import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class FamilySharingWidget extends StatelessWidget {
  final List<Map<String, dynamic>> familyMembers;
  final VoidCallback onAddMember;
  final Function(Map<String, dynamic>) onEditMember;
  final Function(Map<String, dynamic>) onRemoveMember;

  const FamilySharingWidget({
    super.key,
    required this.familyMembers,
    required this.onAddMember,
    required this.onEditMember,
    required this.onRemoveMember,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      width: double.infinity,
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: BorderRadius.circular(3.w),
        boxShadow: [
          BoxShadow(
            color: theme.brightness == Brightness.light
                ? const Color(0x0A000000)
                : const Color(0x1A000000),
            blurRadius: 4,
            offset: const Offset(0, 1),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Expanded(
                child: Text(
                  'Family Sharing',
                  style: theme.textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
              GestureDetector(
                onTap: onAddMember,
                child: Container(
                  padding: EdgeInsets.all(2.w),
                  decoration: BoxDecoration(
                    color: theme.colorScheme.primary,
                    borderRadius: BorderRadius.circular(2.w),
                  ),
                  child: CustomIconWidget(
                    iconName: 'add',
                    color: Colors.white,
                    size: 4.w,
                  ),
                ),
              ),
            ],
          ),
          SizedBox(height: 2.h),
          Text(
            'Manage household member access with role-based permissions',
            style: theme.textTheme.bodySmall?.copyWith(
              color: theme.brightness == Brightness.light
                  ? const Color(0xFF6A737D)
                  : const Color(0xFFADB5BD),
            ),
          ),
          SizedBox(height: 3.h),
          ...familyMembers
              .map((member) => _buildFamilyMemberCard(context, member))
              .toList(),
          if (familyMembers.isEmpty)
            Container(
              width: double.infinity,
              padding: EdgeInsets.all(4.w),
              decoration: BoxDecoration(
                color: theme.brightness == Brightness.light
                    ? const Color(0xFFFAFBFC)
                    : const Color(0xFF1B2329),
                borderRadius: BorderRadius.circular(2.w),
                border: Border.all(
                  color: theme.brightness == Brightness.light
                      ? const Color(0xFFE1E4E8)
                      : const Color(0xFF30363D),
                  width: 1,
                ),
              ),
              child: Column(
                children: [
                  CustomIconWidget(
                    iconName: 'group_add',
                    color: theme.brightness == Brightness.light
                        ? const Color(0xFF6A737D)
                        : const Color(0xFFADB5BD),
                    size: 8.w,
                  ),
                  SizedBox(height: 2.h),
                  Text(
                    'No family members added yet',
                    style: theme.textTheme.bodyMedium?.copyWith(
                      color: theme.brightness == Brightness.light
                          ? const Color(0xFF6A737D)
                          : const Color(0xFFADB5BD),
                    ),
                  ),
                  SizedBox(height: 1.h),
                  Text(
                    'Add family members to share pet care responsibilities',
                    style: theme.textTheme.bodySmall?.copyWith(
                      color: theme.brightness == Brightness.light
                          ? const Color(0xFF959DA5)
                          : const Color(0xFF6A737D),
                    ),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildFamilyMemberCard(
      BuildContext context, Map<String, dynamic> member) {
    final theme = Theme.of(context);

    return Container(
      margin: EdgeInsets.only(bottom: 2.h),
      padding: EdgeInsets.all(3.w),
      decoration: BoxDecoration(
        color: theme.brightness == Brightness.light
            ? const Color(0xFFFAFBFC)
            : const Color(0xFF1B2329),
        borderRadius: BorderRadius.circular(2.w),
        border: Border.all(
          color: theme.brightness == Brightness.light
              ? const Color(0xFFE1E4E8)
              : const Color(0xFF30363D),
          width: 1,
        ),
      ),
      child: Row(
        children: [
          Container(
            width: 12.w,
            height: 12.w,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: _getRoleColor(member["role"] as String)
                  .withValues(alpha: 0.1),
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(6.w),
              child: member["avatar"] != null
                  ? CustomImageWidget(
                      imageUrl: member["avatar"] as String,
                      width: 12.w,
                      height: 12.w,
                      fit: BoxFit.cover,
                    )
                  : CustomIconWidget(
                      iconName: 'person',
                      color: _getRoleColor(member["role"] as String),
                      size: 6.w,
                    ),
            ),
          ),
          SizedBox(width: 3.w),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  member["name"] as String,
                  style: theme.textTheme.bodyLarge?.copyWith(
                    fontWeight: FontWeight.w500,
                  ),
                  overflow: TextOverflow.ellipsis,
                ),
                SizedBox(height: 0.5.h),
                Text(
                  member["email"] as String,
                  style: theme.textTheme.bodySmall?.copyWith(
                    color: theme.brightness == Brightness.light
                        ? const Color(0xFF6A737D)
                        : const Color(0xFFADB5BD),
                  ),
                  overflow: TextOverflow.ellipsis,
                ),
                SizedBox(height: 1.h),
                Container(
                  padding:
                      EdgeInsets.symmetric(horizontal: 2.w, vertical: 0.5.h),
                  decoration: BoxDecoration(
                    color: _getRoleColor(member["role"] as String)
                        .withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(1.w),
                  ),
                  child: Text(
                    member["role"] as String,
                    style: theme.textTheme.labelSmall?.copyWith(
                      color: _getRoleColor(member["role"] as String),
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
              ],
            ),
          ),
          PopupMenuButton<String>(
            onSelected: (value) {
              if (value == 'edit') {
                onEditMember(member);
              } else if (value == 'remove') {
                onRemoveMember(member);
              }
            },
            itemBuilder: (context) => [
              const PopupMenuItem(
                value: 'edit',
                child: Text('Edit Role'),
              ),
              const PopupMenuItem(
                value: 'remove',
                child: Text('Remove Member'),
              ),
            ],
            child: Container(
              padding: EdgeInsets.all(2.w),
              child: CustomIconWidget(
                iconName: 'more_vert',
                color: theme.brightness == Brightness.light
                    ? const Color(0xFF6A737D)
                    : const Color(0xFFADB5BD),
                size: 4.w,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Color _getRoleColor(String role) {
    switch (role.toLowerCase()) {
      case 'admin':
        return const Color(0xFFD73A49); // Error red for admin
      case 'caregiver':
        return const Color(0xFF2B5F75); // Primary blue for caregiver
      case 'viewer':
        return const Color(0xFF7BA05B); // Secondary green for viewer
      default:
        return const Color(0xFF6A737D); // Default gray
    }
  }
}
