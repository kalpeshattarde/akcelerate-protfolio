import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class CreditsFaqWidget extends StatefulWidget {
  final List<Map<String, dynamic>> faqItems;

  const CreditsFaqWidget({
    Key? key,
    required this.faqItems,
  }) : super(key: key);

  @override
  State<CreditsFaqWidget> createState() => _CreditsFaqWidgetState();
}

class _CreditsFaqWidgetState extends State<CreditsFaqWidget> {
  Set<int> expandedItems = {};

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.cardColor,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: AppTheme.lightTheme.dividerColor,
          width: 1,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: EdgeInsets.all(4.w),
            child: Row(
              children: [
                CustomIconWidget(
                  iconName: 'help_outline',
                  color: AppTheme.lightTheme.primaryColor,
                  size: 24,
                ),
                SizedBox(width: 3.w),
                Text(
                  'How Credits Work',
                  style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
          ),
          ListView.builder(
            shrinkWrap: true,
            physics: NeverScrollableScrollPhysics(),
            itemCount: widget.faqItems.length,
            itemBuilder: (context, index) {
              final faqItem = widget.faqItems[index];
              final isExpanded = expandedItems.contains(index);

              return _buildFaqItem(faqItem, index, isExpanded);
            },
          ),
        ],
      ),
    );
  }

  Widget _buildFaqItem(
      Map<String, dynamic> faqItem, int index, bool isExpanded) {
    final question = faqItem['question'] as String;
    final answer = faqItem['answer'] as String;

    return Column(
      children: [
        if (index > 0)
          Divider(
            color: AppTheme.lightTheme.dividerColor,
            height: 1,
          ),
        InkWell(
          onTap: () {
            setState(() {
              if (isExpanded) {
                expandedItems.remove(index);
              } else {
                expandedItems.add(index);
              }
            });
          },
          child: Padding(
            padding: EdgeInsets.all(4.w),
            child: Row(
              children: [
                Expanded(
                  child: Text(
                    question,
                    style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
                SizedBox(width: 2.w),
                CustomIconWidget(
                  iconName:
                      isExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down',
                  color: AppTheme.textSecondaryLight,
                  size: 24,
                ),
              ],
            ),
          ),
        ),
        if (isExpanded) ...[
          Padding(
            padding: EdgeInsets.fromLTRB(4.w, 0, 4.w, 4.w),
            child: Container(
              width: double.infinity,
              padding: EdgeInsets.all(3.w),
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.scaffoldBackgroundColor,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(
                  color: AppTheme.lightTheme.dividerColor,
                  width: 1,
                ),
              ),
              child: Text(
                answer,
                style: AppTheme.lightTheme.textTheme.bodyMedium?.copyWith(
                  color: AppTheme.textSecondaryLight,
                  height: 1.5,
                ),
              ),
            ),
          ),
        ],
      ],
    );
  }
}
