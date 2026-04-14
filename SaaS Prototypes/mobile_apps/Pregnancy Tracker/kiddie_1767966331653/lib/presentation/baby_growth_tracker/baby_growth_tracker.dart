import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../widgets/custom_app_bar.dart';
import '../../widgets/custom_bottom_bar.dart';
import '../../widgets/custom_icon_widget.dart';
import './widgets/baby_illustration_widget.dart';
import './widgets/development_card_widget.dart';
import './widgets/mom_tips_widget.dart';
import './widgets/trimester_overview_widget.dart';
import './widgets/week_timeline_widget.dart';

class BabyGrowthTracker extends StatefulWidget {
  const BabyGrowthTracker({super.key});

  @override
  State<BabyGrowthTracker> createState() => _BabyGrowthTrackerState();
}

class _BabyGrowthTrackerState extends State<BabyGrowthTracker>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  int _currentWeek = 20;

  // Mock pregnancy data
  final Map<String, dynamic> pregnancyData = {
    "currentWeek": 20,
    "dueDate": "2025-06-15",
    "trimester": 2,
    "totalWeeks": 40,
  };

  // Mock weekly development data
  final List<Map<String, dynamic>> weeklyDevelopment = [
    {
      "week": 18,
      "babySize": "Bell Pepper",
      "babyLength": "5.6 inches",
      "babyWeight": "6.7 oz",
      "illustration":
          "https://images.unsplash.com/photo-1716434128689-8a1a6876365e",
      "semanticLabel":
          "Red bell pepper on white background representing baby size at 18 weeks",
      "developments": [
        {
          "title": "Hearing Development",
          "description": "Baby can now hear sounds from outside the womb",
          "completed": true,
        },
        {
          "title": "Yawning",
          "description": "Your baby is yawning frequently",
          "completed": true,
        },
        {
          "title": "Fingerprints",
          "description": "Unique fingerprints are forming",
          "completed": true,
        },
      ],
      "momChanges": "You may start feeling baby's movements more regularly",
      "tips": "Start talking and singing to your baby - they can hear you now!",
    },
    {
      "week": 19,
      "babySize": "Mango",
      "babyLength": "6.0 inches",
      "babyWeight": "8.5 oz",
      "illustration":
          "https://img.rocket.new/generatedImages/rocket_gen_img_11d8cbb50-1765256460512.png",
      "semanticLabel":
          "Fresh yellow mango fruit representing baby size at 19 weeks",
      "developments": [
        {
          "title": "Vernix Formation",
          "description": "Protective coating forming on skin",
          "completed": true,
        },
        {
          "title": "Sensory Development",
          "description": "Brain areas for senses are developing",
          "completed": true,
        },
        {
          "title": "Hair Growth",
          "description": "Hair is growing on the scalp",
          "completed": false,
        },
      ],
      "momChanges":
          "Your belly is growing and you may experience round ligament pain",
      "tips": "Practice good posture to ease back pain as your belly grows",
    },
    {
      "week": 20,
      "babySize": "Banana",
      "babyLength": "6.5 inches",
      "babyWeight": "10.2 oz",
      "illustration":
          "https://img.rocket.new/generatedImages/rocket_gen_img_19268da0c-1765042046260.png",
      "semanticLabel":
          "Yellow banana on white background representing baby size at 20 weeks",
      "developments": [
        {
          "title": "Halfway Mark",
          "description": "You're halfway through pregnancy!",
          "completed": true,
        },
        {
          "title": "Swallowing",
          "description": "Baby is swallowing amniotic fluid",
          "completed": true,
        },
        {
          "title": "Meconium Production",
          "description": "First bowel movement forming",
          "completed": true,
        },
        {
          "title": "Sleep Cycles",
          "description": "Regular sleep-wake patterns developing",
          "completed": false,
        },
      ],
      "momChanges": "Your uterus is now at belly button level",
      "tips": "Schedule your anatomy scan if you haven't already",
    },
    {
      "week": 21,
      "babySize": "Carrot",
      "babyLength": "10.5 inches",
      "babyWeight": "12.7 oz",
      "illustration":
          "https://images.unsplash.com/photo-1727181715263-9b9862dcbb63",
      "semanticLabel":
          "Fresh orange carrot with green leaves representing baby size at 21 weeks",
      "developments": [
        {
          "title": "Rapid Growth",
          "description": "Baby is growing quickly now",
          "completed": true,
        },
        {
          "title": "Bone Strengthening",
          "description": "Bones are hardening",
          "completed": true,
        },
        {
          "title": "Movement Patterns",
          "description": "More coordinated movements",
          "completed": false,
        },
      ],
      "momChanges": "You may notice increased appetite",
      "tips": "Focus on nutrient-dense foods to support baby's growth",
    },
    {
      "week": 22,
      "babySize": "Papaya",
      "babyLength": "10.9 inches",
      "babyWeight": "15.2 oz",
      "illustration":
          "https://images.unsplash.com/photo-1552426634-4898f7046048",
      "semanticLabel":
          "Ripe papaya fruit cut in half showing orange flesh representing baby size at 22 weeks",
      "developments": [
        {
          "title": "Eyelid Formation",
          "description": "Eyelids and eyebrows are visible",
          "completed": true,
        },
        {
          "title": "Lip Formation",
          "description": "Lips are more defined",
          "completed": true,
        },
        {
          "title": "Pancreas Development",
          "description": "Pancreas is developing steadily",
          "completed": true,
        },
      ],
      "momChanges": "Your center of gravity is shifting",
      "tips": "Wear comfortable, supportive shoes to maintain balance",
    },
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    _currentWeek = pregnancyData["currentWeek"];
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  Map<String, dynamic> _getCurrentWeekData() {
    return weeklyDevelopment.firstWhere(
      (week) => week["week"] == _currentWeek,
      orElse: () => weeklyDevelopment[2],
    );
  }

  void _onWeekChanged(int week) {
    setState(() {
      _currentWeek = week;
    });
    HapticFeedback.lightImpact();
  }

  void _shareWeeklyIllustration() {
    HapticFeedback.mediumImpact();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Week $_currentWeek illustration saved to gallery'),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
    );
  }

  void _bookmarkWeek() {
    HapticFeedback.lightImpact();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Week $_currentWeek bookmarked'),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
    );
  }

  void _showTrimesterOverview() {
    HapticFeedback.mediumImpact();
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => TrimesterOverviewWidget(
        currentTrimester: pregnancyData["trimester"],
        currentWeek: _currentWeek,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final currentWeekData = _getCurrentWeekData();

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      appBar: CustomAppBar.detail(
        title: 'Baby Growth',
        actions: [
          CustomAppBarAction(
            icon: Icons.bookmark_outline,
            onPressed: _bookmarkWeek,
            tooltip: 'Bookmark Week',
          ),
          CustomAppBarAction(
            icon: Icons.share_outlined,
            onPressed: _shareWeeklyIllustration,
            tooltip: 'Share',
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Tab Bar
            Container(
              color: theme.colorScheme.surface,
              child: TabBar(
                controller: _tabController,
                tabs: const [Tab(text: 'Baby'), Tab(text: 'Mom')],
              ),
            ),

            // Content
            Expanded(
              child: TabBarView(
                controller: _tabController,
                children: [
                  // Baby Tab
                  _buildBabyTab(theme, currentWeekData),

                  // Mom Tab
                  _buildMomTab(theme, currentWeekData),
                ],
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: CustomBottomBar(
        currentIndex: 1, // Baby tab is at index 1
        onTap: (index) {
          HapticFeedback.lightImpact();
          final items = CustomBottomBar.defaultItems;
          if (index < items.length) {
            // Always navigate - removed condition that prevented same-tab navigation
            Navigator.pushReplacementNamed(context, items[index].route);
          }
        },
      ),
    );
  }

  Widget _buildBabyTab(ThemeData theme, Map<String, dynamic> weekData) {
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Week Timeline
          WeekTimelineWidget(
            currentWeek: _currentWeek,
            totalWeeks: pregnancyData["totalWeeks"],
            onWeekSelected: _onWeekChanged,
          ),

          SizedBox(height: 2.h),

          // Baby Illustration with Size Info
          BabyIllustrationWidget(
            week: _currentWeek,
            babySize: weekData["babySize"],
            babyLength: weekData["babyLength"],
            babyWeight: weekData["babyWeight"],
            illustrationUrl: weekData["illustration"],
            semanticLabel: weekData["semanticLabel"],
          ),

          SizedBox(height: 3.h),

          // Development Cards
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 4.w),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Development Milestones',
                  style: theme.textTheme.titleLarge?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),
                SizedBox(height: 2.h),
                ...(weekData["developments"] as List).map((dev) {
                  return DevelopmentCardWidget(
                    title: dev["title"],
                    description: dev["description"],
                    isCompleted: dev["completed"],
                  );
                }).toList(),
              ],
            ),
          ),

          SizedBox(height: 3.h),

          // Trimester Overview Button
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 4.w),
            child: SizedBox(
              width: double.infinity,
              child: OutlinedButton.icon(
                onPressed: _showTrimesterOverview,
                icon: CustomIconWidget(
                  iconName: 'calendar_today',
                  size: 20,
                  color: theme.colorScheme.primary,
                ),
                label: Text('View Trimester Overview'),
                style: OutlinedButton.styleFrom(
                  padding: EdgeInsets.symmetric(vertical: 2.h),
                ),
              ),
            ),
          ),

          SizedBox(height: 4.h),
        ],
      ),
    );
  }

  Widget _buildMomTab(ThemeData theme, Map<String, dynamic> weekData) {
    return SingleChildScrollView(
      child: Padding(
        padding: EdgeInsets.all(4.w),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(height: 2.h),

            // Week Info
            Container(
              padding: EdgeInsets.all(4.w),
              decoration: BoxDecoration(
                color: theme.colorScheme.primaryContainer.withValues(
                  alpha: 0.3,
                ),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Row(
                children: [
                  Container(
                    padding: EdgeInsets.all(3.w),
                    decoration: BoxDecoration(
                      color: theme.colorScheme.primary.withValues(alpha: 0.2),
                      shape: BoxShape.circle,
                    ),
                    child: CustomIconWidget(
                      iconName: 'calendar_today',
                      size: 24,
                      color: theme.colorScheme.primary,
                    ),
                  ),
                  SizedBox(width: 3.w),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Week $_currentWeek',
                          style: theme.textTheme.titleLarge?.copyWith(
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        SizedBox(height: 0.5.h),
                        Text(
                          'Trimester ${pregnancyData["trimester"]}',
                          style: theme.textTheme.bodyMedium?.copyWith(
                            color: theme.colorScheme.onSurfaceVariant,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),

            SizedBox(height: 3.h),

            // Mom Tips Widget
            MomTipsWidget(
              momChanges: weekData["momChanges"],
              tips: weekData["tips"],
            ),

            SizedBox(height: 3.h),

            // Wellness Advice
            Container(
              padding: EdgeInsets.all(4.w),
              decoration: BoxDecoration(
                color: theme.colorScheme.surface,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(
                  color: theme.colorScheme.outline.withValues(alpha: 0.2),
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      CustomIconWidget(
                        iconName: 'favorite',
                        size: 24,
                        color: theme.colorScheme.primary,
                      ),
                      SizedBox(width: 2.w),
                      Text(
                        'Wellness Advice',
                        style: theme.textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 2.h),
                  _buildWellnessItem(
                    theme,
                    'Stay Hydrated',
                    'Drink at least 8-10 glasses of water daily',
                    'water_drop',
                  ),
                  SizedBox(height: 1.5.h),
                  _buildWellnessItem(
                    theme,
                    'Gentle Exercise',
                    'Try prenatal yoga or swimming',
                    'fitness_center',
                  ),
                  SizedBox(height: 1.5.h),
                  _buildWellnessItem(
                    theme,
                    'Rest Well',
                    'Get 7-9 hours of sleep each night',
                    'bedtime',
                  ),
                ],
              ),
            ),

            SizedBox(height: 3.h),

            // Quick Actions
            Text(
              'Quick Actions',
              style: theme.textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.w600,
              ),
            ),
            SizedBox(height: 2.h),
            Row(
              children: [
                Expanded(
                  child: _buildQuickActionCard(
                    theme,
                    'Kick Counter',
                    'track_changes',
                    () => Navigator.pushNamed(context, '/kick-counter'),
                  ),
                ),
                SizedBox(width: 3.w),
                Expanded(
                  child: _buildQuickActionCard(
                    theme,
                    'Appointments',
                    'event',
                    () => Navigator.pushNamed(context, '/appointment-manager'),
                  ),
                ),
              ],
            ),

            SizedBox(height: 4.h),
          ],
        ),
      ),
    );
  }

  Widget _buildWellnessItem(
    ThemeData theme,
    String title,
    String description,
    String iconName,
  ) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          padding: EdgeInsets.all(2.w),
          decoration: BoxDecoration(
            color: theme.colorScheme.primaryContainer.withValues(alpha: 0.3),
            borderRadius: BorderRadius.circular(8),
          ),
          child: CustomIconWidget(
            iconName: iconName,
            size: 20,
            color: theme.colorScheme.primary,
          ),
        ),
        SizedBox(width: 3.w),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: theme.textTheme.bodyLarge?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
              SizedBox(height: 0.5.h),
              Text(
                description,
                style: theme.textTheme.bodyMedium?.copyWith(
                  color: theme.colorScheme.onSurfaceVariant,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildQuickActionCard(
    ThemeData theme,
    String title,
    String iconName,
    VoidCallback onTap,
  ) {
    return InkWell(
      onTap: () {
        HapticFeedback.lightImpact();
        onTap();
      },
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: EdgeInsets.all(4.w),
        decoration: BoxDecoration(
          color: theme.colorScheme.surface,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: theme.colorScheme.outline.withValues(alpha: 0.2),
          ),
        ),
        child: Column(
          children: [
            Container(
              padding: EdgeInsets.all(3.w),
              decoration: BoxDecoration(
                color: theme.colorScheme.primaryContainer.withValues(
                  alpha: 0.3,
                ),
                shape: BoxShape.circle,
              ),
              child: CustomIconWidget(
                iconName: iconName,
                size: 28,
                color: theme.colorScheme.primary,
              ),
            ),
            SizedBox(height: 1.5.h),
            Text(
              title,
              style: theme.textTheme.bodyMedium?.copyWith(
                fontWeight: FontWeight.w600,
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}
