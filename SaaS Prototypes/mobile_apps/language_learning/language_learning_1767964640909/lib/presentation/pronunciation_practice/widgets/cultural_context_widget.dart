import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class CulturalContextWidget extends StatefulWidget {
  final String targetWord;
  final List<Map<String, dynamic>> regionalVariations;
  final List<Map<String, dynamic>> usageScenarios;

  const CulturalContextWidget({
    Key? key,
    required this.targetWord,
    required this.regionalVariations,
    required this.usageScenarios,
  }) : super(key: key);

  @override
  State<CulturalContextWidget> createState() => _CulturalContextWidgetState();
}

class _CulturalContextWidgetState extends State<CulturalContextWidget>
    with TickerProviderStateMixin {
  late TabController _tabController;
  int _selectedVariationIndex = 0;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.08),
            blurRadius: 12,
            offset: Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        children: [
          Container(
            padding: EdgeInsets.all(6.w),
            child: Row(
              children: [
                CustomIconWidget(
                  iconName: 'public',
                  color: AppTheme.lightTheme.colorScheme.primary,
                  size: 6.w,
                ),
                SizedBox(width: 2.w),
                Text(
                  'Cultural Context',
                  style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
          ),
          TabBar(
            controller: _tabController,
            tabs: [
              Tab(
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    CustomIconWidget(
                      iconName: 'language',
                      color: AppTheme.lightTheme.colorScheme.primary,
                      size: 4.w,
                    ),
                    SizedBox(width: 1.w),
                    Text('Regional'),
                  ],
                ),
              ),
              Tab(
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    CustomIconWidget(
                      iconName: 'chat_bubble_outline',
                      color: AppTheme.lightTheme.colorScheme.primary,
                      size: 4.w,
                    ),
                    SizedBox(width: 1.w),
                    Text('Usage'),
                  ],
                ),
              ),
            ],
          ),
          Container(
            height: 35.h,
            child: TabBarView(
              controller: _tabController,
              children: [
                _buildRegionalVariationsTab(),
                _buildUsageScenariosTab(),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildRegionalVariationsTab() {
    return Container(
      padding: EdgeInsets.all(4.w),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Regional Accent Variations',
            style: AppTheme.lightTheme.textTheme.titleSmall?.copyWith(
              fontWeight: FontWeight.w600,
            ),
          ),
          SizedBox(height: 2.h),

          // Interactive map placeholder
          Container(
            height: 15.h,
            width: double.infinity,
            decoration: BoxDecoration(
              color: AppTheme.lightTheme.colorScheme.primary
                  .withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(
                color: AppTheme.lightTheme.colorScheme.primary
                    .withValues(alpha: 0.3),
              ),
            ),
            child: Stack(
              children: [
                Center(
                  child: CustomIconWidget(
                    iconName: 'map',
                    color: AppTheme.lightTheme.colorScheme.primary
                        .withValues(alpha: 0.5),
                    size: 15.w,
                  ),
                ),
                ...widget.regionalVariations.asMap().entries.map((entry) {
                  final index = entry.key;
                  final variation = entry.value;
                  final positions = [
                    Offset(20.w, 5.h), // American
                    Offset(60.w, 4.h), // British
                    Offset(75.w, 10.h), // Australian
                    Offset(25.w, 3.h), // Canadian
                  ];

                  return Positioned(
                    left: positions[index % positions.length].dx,
                    top: positions[index % positions.length].dy,
                    child: GestureDetector(
                      onTap: () {
                        setState(() {
                          _selectedVariationIndex = index;
                        });
                      },
                      child: Container(
                        padding: EdgeInsets.all(2.w),
                        decoration: BoxDecoration(
                          color: _selectedVariationIndex == index
                              ? AppTheme.lightTheme.colorScheme.primary
                              : AppTheme.lightTheme.colorScheme.surface,
                          shape: BoxShape.circle,
                          border: Border.all(
                            color: AppTheme.lightTheme.colorScheme.primary,
                            width: 2,
                          ),
                        ),
                        child: CustomIconWidget(
                          iconName: 'location_on',
                          color: _selectedVariationIndex == index
                              ? AppTheme.lightTheme.colorScheme.onPrimary
                              : AppTheme.lightTheme.colorScheme.primary,
                          size: 4.w,
                        ),
                      ),
                    ),
                  );
                }).toList(),
              ],
            ),
          ),

          SizedBox(height: 3.h),

          // Selected variation details
          if (widget.regionalVariations.isNotEmpty) ...[
            Container(
              padding: EdgeInsets.all(4.w),
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.colorScheme.surface,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(
                  color: AppTheme.lightTheme.colorScheme.outline
                      .withValues(alpha: 0.3),
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      CustomImageWidget(
                        imageUrl:
                            (widget.regionalVariations[_selectedVariationIndex]
                                    ['flag'] as String?) ??
                                'https://flagcdn.com/w40/us.png',
                        width: 8.w,
                        height: 6.w,
                        fit: BoxFit.cover,
                      ),
                      SizedBox(width: 2.w),
                      Text(
                        (widget.regionalVariations[_selectedVariationIndex]
                                ['region'] as String?) ??
                            'Unknown',
                        style:
                            AppTheme.lightTheme.textTheme.titleSmall?.copyWith(
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 1.h),
                  Text(
                    'Pronunciation: ${(widget.regionalVariations[_selectedVariationIndex]['pronunciation'] as String?) ?? 'N/A'}',
                    style: AppTheme.getMonospaceStyle(
                      isLight: true,
                      fontSize: 14.sp,
                    ),
                  ),
                  SizedBox(height: 1.h),
                  Text(
                    (widget.regionalVariations[_selectedVariationIndex]
                            ['description'] as String?) ??
                        'No description available',
                    style: AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                      color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildUsageScenariosTab() {
    return Container(
      padding: EdgeInsets.all(4.w),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Appropriate Usage Scenarios',
            style: AppTheme.lightTheme.textTheme.titleSmall?.copyWith(
              fontWeight: FontWeight.w600,
            ),
          ),
          SizedBox(height: 2.h),
          Expanded(
            child: ListView.builder(
              itemCount: widget.usageScenarios.length,
              itemBuilder: (context, index) {
                final scenario = widget.usageScenarios[index];
                final icons = [
                  'work',
                  'school',
                  'restaurant',
                  'home',
                  'shopping_cart'
                ];

                return Container(
                  margin: EdgeInsets.only(bottom: 2.h),
                  padding: EdgeInsets.all(4.w),
                  decoration: BoxDecoration(
                    color: AppTheme.lightTheme.colorScheme.surface,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(
                      color: AppTheme.lightTheme.colorScheme.outline
                          .withValues(alpha: 0.3),
                    ),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Container(
                            padding: EdgeInsets.all(2.w),
                            decoration: BoxDecoration(
                              color: AppTheme.lightTheme.colorScheme.primary
                                  .withValues(alpha: 0.1),
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: CustomIconWidget(
                              iconName: icons[index % icons.length],
                              color: AppTheme.lightTheme.colorScheme.primary,
                              size: 5.w,
                            ),
                          ),
                          SizedBox(width: 3.w),
                          Expanded(
                            child: Text(
                              (scenario['context'] as String?) ??
                                  'Unknown Context',
                              style: AppTheme.lightTheme.textTheme.titleSmall
                                  ?.copyWith(
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ),
                        ],
                      ),
                      SizedBox(height: 2.h),
                      Container(
                        padding: EdgeInsets.all(3.w),
                        decoration: BoxDecoration(
                          color: AppTheme.lightTheme.colorScheme.primary
                              .withValues(alpha: 0.05),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Text(
                          '"${(scenario['example'] as String?) ?? 'No example available'}"',
                          style: AppTheme.lightTheme.textTheme.bodyMedium
                              ?.copyWith(
                            fontStyle: FontStyle.italic,
                            color: AppTheme.lightTheme.colorScheme.onSurface,
                          ),
                        ),
                      ),
                      SizedBox(height: 1.h),
                      Text(
                        (scenario['explanation'] as String?) ??
                            'No explanation available',
                        style:
                            AppTheme.lightTheme.textTheme.bodySmall?.copyWith(
                          color:
                              AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                        ),
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
