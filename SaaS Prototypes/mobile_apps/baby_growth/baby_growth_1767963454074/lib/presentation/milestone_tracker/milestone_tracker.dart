import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/milestone_category_section.dart';
import './widgets/milestone_detail_modal.dart';
import './widgets/milestone_progress_header.dart';
import './widgets/milestone_search_bar.dart';

class MilestoneTracker extends StatefulWidget {
  const MilestoneTracker({Key? key}) : super(key: key);

  @override
  State<MilestoneTracker> createState() => _MilestoneTrackerState();
}

class _MilestoneTrackerState extends State<MilestoneTracker>
    with TickerProviderStateMixin {
  late AnimationController _celebrationController;
  late ScrollController _scrollController;
  String _searchQuery = '';
  String _ageFilter = 'All Ages';
  String _statusFilter = 'All';

  // Mock milestone data
  final List<Map<String, dynamic>> _allMilestones = [
// Motor Skills
    {
      'id': 1,
      'title': 'Holds head up when lying on tummy',
      'description':
          'Baby can lift and hold their head up for short periods during tummy time.',
      'detailedDescription':
          'This milestone shows developing neck and upper body strength. Your baby should be able to lift their head 45 degrees while on their tummy and hold it steady for a few seconds. This is crucial for future motor development and helps prevent flat head syndrome.',
      'category': 'Motor Skills',
      'ageRange': '2-4 months',
      'status': 'achieved',
      'isCompleted': true,
      'completedDate': '2025-08-15',
      'note':
          'Emma achieved this during tummy time today! She held her head up for almost 30 seconds.',
      'hasReminder': false,
      'tips': [
        'Start with short tummy time sessions (2-3 minutes)',
        'Place colorful toys or mirrors in front of baby to encourage head lifting',
        'Get down on baby\'s level to provide encouragement',
        'Gradually increase tummy time as baby gets stronger'
      ]
    },
    {
      'id': 2,
      'title': 'Rolls from tummy to back',
      'description':
          'Baby can roll from their stomach to their back independently.',
      'detailedDescription':
          'Rolling from tummy to back is usually the first rolling milestone. It requires coordination of head, arm, and core muscles. This movement often happens accidentally at first as baby pushes up during tummy time.',
      'category': 'Motor Skills',
      'ageRange': '3-5 months',
      'status': 'emerging',
      'isCompleted': false,
      'note': '',
      'hasReminder': true,
      'tips': [
        'Continue regular tummy time to build strength',
        'Help baby practice by gently guiding the movement',
        'Ensure a safe, soft surface for rolling practice',
        'Celebrate attempts even if not successful'
      ]
    },
    {
      'id': 3,
      'title': 'Sits without support',
      'description':
          'Baby can sit upright without assistance for several minutes.',
      'detailedDescription':
          'Independent sitting requires strong core muscles and good balance. Baby should be able to sit without support for at least 30 seconds and use their hands to play with toys while sitting.',
      'category': 'Motor Skills',
      'ageRange': '6-8 months',
      'status': 'upcoming',
      'isCompleted': false,
      'note': '',
      'hasReminder': false,
      'tips': [
        'Practice supported sitting with pillows around baby',
        'Encourage reaching for toys while sitting',
        'Start with short sitting sessions',
        'Always supervise to prevent falls'
      ]
    },
    {
      'id': 4,
      'title': 'Crawls on hands and knees',
      'description':
          'Baby moves forward using coordinated hand and knee movements.',
      'detailedDescription':
          'Traditional crawling involves alternating opposite arm and leg movements. Some babies may skip this stage and go straight to walking, which is also normal.',
      'category': 'Motor Skills',
      'ageRange': '7-10 months',
      'status': 'upcoming',
      'isCompleted': false,
      'note': '',
      'hasReminder': false,
      'tips': [
        'Create safe crawling spaces',
        'Place interesting toys just out of reach',
        'Get on the floor and crawl with baby',
        'Ensure the area is baby-proofed'
      ]
    },

// Language
    {
      'id': 5,
      'title': 'Makes cooing sounds',
      'description': 'Baby produces soft vowel sounds like "ooh" and "aah".',
      'detailedDescription':
          'Cooing is one of the first forms of vocal communication. These sounds show that baby is experimenting with their voice and beginning to understand turn-taking in conversation.',
      'category': 'Language',
      'ageRange': '2-4 months',
      'status': 'achieved',
      'isCompleted': true,
      'completedDate': '2025-07-20',
      'note':
          'Emma started cooing during our morning conversations. She seems to respond when I talk to her!',
      'hasReminder': false,
      'tips': [
        'Respond to baby\'s coos with your own sounds',
        'Have "conversations" by taking turns making sounds',
        'Use a sing-song voice when talking to baby',
        'Make eye contact while cooing together'
      ]
    },
    {
      'id': 6,
      'title': 'Babbles with consonant sounds',
      'description':
          'Baby combines consonants and vowels like "ba-ba" or "ma-ma".',
      'detailedDescription':
          'Babbling shows advanced vocal development. Baby is practicing the sounds they\'ll need for real words. This stage is crucial for language development.',
      'category': 'Language',
      'ageRange': '4-7 months',
      'status': 'emerging',
      'isCompleted': false,
      'note': '',
      'hasReminder': true,
      'tips': [
        'Repeat baby\'s babbling sounds back to them',
        'Introduce simple words like "mama" and "dada"',
        'Read books with repetitive sounds',
        'Sing songs with clear consonant sounds'
      ]
    },
    {
      'id': 7,
      'title': 'Says first word',
      'description': 'Baby says their first recognizable word with meaning.',
      'detailedDescription':
          'The first word is a major milestone! It should be used consistently to refer to the same person or object. Common first words include "mama," "dada," or "hi."',
      'category': 'Language',
      'ageRange': '10-14 months',
      'status': 'upcoming',
      'isCompleted': false,
      'note': '',
      'hasReminder': false,
      'tips': [
        'Repeat words clearly and often',
        'Label objects and actions throughout the day',
        'Read together daily',
        'Celebrate any attempts at words'
      ]
    },

// Social
    {
      'id': 8,
      'title': 'Smiles responsively',
      'description': 'Baby smiles in response to your smile or voice.',
      'detailedDescription':
          'Social smiling is different from reflexive smiling. It shows baby recognizes you and wants to interact. This is the beginning of social communication.',
      'category': 'Social',
      'ageRange': '2-3 months',
      'status': 'achieved',
      'isCompleted': true,
      'completedDate': '2025-07-10',
      'note':
          'Emma gave me the biggest smile this morning when I said good morning to her!',
      'hasReminder': false,
      'tips': [
        'Smile at baby frequently throughout the day',
        'Use animated facial expressions',
        'Talk in a warm, loving voice',
        'Respond enthusiastically to baby\'s smiles'
      ]
    },
    {
      'id': 9,
      'title': 'Shows stranger anxiety',
      'description': 'Baby becomes upset or wary around unfamiliar people.',
      'detailedDescription':
          'Stranger anxiety shows healthy attachment development. Baby has learned to distinguish between familiar and unfamiliar faces, which is a cognitive milestone too.',
      'category': 'Social',
      'ageRange': '6-12 months',
      'status': 'upcoming',
      'isCompleted': false,
      'note': '',
      'hasReminder': false,
      'tips': [
        'Stay calm and reassuring during introductions',
        'Allow baby time to warm up to new people',
        'Don\'t force interactions with strangers',
        'This is a normal and healthy development'
      ]
    },
    {
      'id': 10,
      'title': 'Plays peek-a-boo',
      'description': 'Baby enjoys and participates in peek-a-boo games.',
      'detailedDescription':
          'Peek-a-boo helps develop object permanence and social skills. Baby learns that things (and people) still exist even when they can\'t see them.',
      'category': 'Social',
      'ageRange': '6-9 months',
      'status': 'upcoming',
      'isCompleted': false,
      'note': '',
      'hasReminder': false,
      'tips': [
        'Start with simple hiding behind your hands',
        'Use different variations like hiding toys',
        'Let baby initiate the game sometimes',
        'Make it fun with silly voices and expressions'
      ]
    },

// Cognitive
    {
      'id': 11,
      'title': 'Tracks objects with eyes',
      'description':
          'Baby follows moving objects with their eyes from side to side.',
      'detailedDescription':
          'Visual tracking shows developing vision and attention skills. Baby should be able to follow an object moving slowly from one side to the other.',
      'category': 'Cognitive',
      'ageRange': '2-4 months',
      'status': 'achieved',
      'isCompleted': true,
      'completedDate': '2025-07-25',
      'note':
          'Emma loves watching her mobile and follows the toys as they move around.',
      'hasReminder': false,
      'tips': [
        'Use high-contrast toys for better visibility',
        'Move objects slowly for easier tracking',
        'Try different distances from baby\'s face',
        'Use colorful, interesting objects'
      ]
    },
    {
      'id': 12,
      'title': 'Shows object permanence',
      'description': 'Baby looks for objects that have been hidden from view.',
      'detailedDescription':
          'Object permanence is understanding that objects continue to exist even when out of sight. This is a major cognitive leap that develops gradually.',
      'category': 'Cognitive',
      'ageRange': '8-12 months',
      'status': 'upcoming',
      'isCompleted': false,
      'note': '',
      'hasReminder': false,
      'tips': [
        'Play hiding games with favorite toys',
        'Start by partially hiding objects',
        'Use peek-a-boo to reinforce the concept',
        'Be patient as this skill develops gradually'
      ]
    },
  ];

  @override
  void initState() {
    super.initState();
    _celebrationController = AnimationController(
      duration: const Duration(milliseconds: 1000),
      vsync: this,
    );
    _scrollController = ScrollController();
  }

  @override
  void dispose() {
    _celebrationController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  List<Map<String, dynamic>> get _filteredMilestones {
    return _allMilestones.where((milestone) {
      final matchesSearch = _searchQuery.isEmpty ||
          (milestone['title'] as String)
              .toLowerCase()
              .contains(_searchQuery.toLowerCase()) ||
          (milestone['description'] as String)
              .toLowerCase()
              .contains(_searchQuery.toLowerCase());

      bool matchesAge = _ageFilter == 'All Ages';
      if (!matchesAge) {
        final ageRange = milestone['ageRange'] as String;
        final filterOptions = _getAgeRangeFilter(_ageFilter).split('|');
        matchesAge = filterOptions.any((option) =>
            ageRange.contains(option) ||
            option.contains(ageRange.split('-')[0]));
      }

      bool matchesStatus = _statusFilter == 'All';
      if (!matchesStatus) {
        final isCompleted = milestone['isCompleted'] as bool? ?? false;
        final status = milestone['status'] as String? ?? 'upcoming';
        switch (_statusFilter) {
          case 'Achieved':
            matchesStatus = isCompleted && status == 'achieved';
            break;
          case 'In Progress':
            matchesStatus = !isCompleted && status == 'emerging';
            break;
          case 'Upcoming':
            matchesStatus = !isCompleted && status == 'upcoming';
            break;
        }
      }

      return matchesSearch && matchesAge && matchesStatus;
    }).toList();
  }

  String _getAgeRangeFilter(String filter) {
    switch (filter) {
      case '0-3 months':
        return '2-3|2-4|3-5';
      case '3-6 months':
        return '3-5|4-6|4-7';
      case '6-9 months':
        return '6-8|6-9|7-10';
      case '9-12 months':
        return '8-12|9-12|10-14';
      case '12-18 months':
        return '12-15|12-18';
      case '18-24 months':
        return '18-24|18-30';
      default:
        return '';
    }
  }

  Map<String, List<Map<String, dynamic>>> get _categorizedMilestones {
    final categories = <String, List<Map<String, dynamic>>>{};

    for (final milestone in _filteredMilestones) {
      final category = milestone['category'] as String;
      categories[category] = categories[category] ?? [];
      categories[category]!.add(milestone);
    }

    return categories;
  }

  int get _totalMilestones => _allMilestones.length;
  int get _completedMilestones =>
      _allMilestones.where((m) => m['isCompleted'] == true).length;
  double get _completionPercentage => _completedMilestones / _totalMilestones;
  int get _celebrationCount => _completedMilestones;

  void _onMilestoneToggle(int milestoneId, bool isCompleted) {
    setState(() {
      final milestoneIndex =
          _allMilestones.indexWhere((m) => m['id'] == milestoneId);
      if (milestoneIndex != -1) {
        _allMilestones[milestoneIndex]['isCompleted'] = isCompleted;
        _allMilestones[milestoneIndex]['status'] =
            isCompleted ? 'achieved' : 'upcoming';

        if (isCompleted) {
          _allMilestones[milestoneIndex]['completedDate'] =
              '${DateTime.now().month}/${DateTime.now().day}/${DateTime.now().year}';
          _triggerCelebration();
        } else {
          _allMilestones[milestoneIndex]['completedDate'] = null;
        }
      }
    });
  }

  void _triggerCelebration() {
    HapticFeedback.lightImpact();
    _celebrationController.forward().then((_) {
      _celebrationController.reset();
    });

    // Show celebration snackbar
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            CustomIconWidget(
              iconName: 'celebration',
              color: Colors.white,
              size: 5.w,
            ),
            SizedBox(width: 2.w),
            const Text('Milestone achieved! Great job! 🎉'),
          ],
        ),
        backgroundColor: AppTheme.lightTheme.colorScheme.tertiary,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
    );
  }

  void _showMilestoneDetails(Map<String, dynamic> milestone) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => MilestoneDetailModal(
        milestone: milestone,
        onToggleComplete: (isCompleted) {
          Navigator.pop(context);
          _onMilestoneToggle(milestone['id'], isCompleted);
        },
        onAddNote: () {
          Navigator.pop(context);
          _showAddNoteDialog(milestone);
        },
        onSetReminder: () {
          Navigator.pop(context);
          _showSetReminderDialog(milestone);
        },
        onShare: () {
          Navigator.pop(context);
          _shareMilestone(milestone);
        },
      ),
    );
  }

  void _showAddNoteDialog(Map<String, dynamic> milestone) {
    final TextEditingController noteController = TextEditingController();
    noteController.text = milestone['note'] ?? '';

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Add Note'),
        content: TextField(
          controller: noteController,
          maxLines: 4,
          decoration: const InputDecoration(
            hintText: 'Add your thoughts about this milestone...',
            border: OutlineInputBorder(),
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              setState(() {
                final milestoneIndex = _allMilestones
                    .indexWhere((m) => m['id'] == milestone['id']);
                if (milestoneIndex != -1) {
                  _allMilestones[milestoneIndex]['note'] = noteController.text;
                }
              });
              Navigator.pop(context);
            },
            child: const Text('Save'),
          ),
        ],
      ),
    );
  }

  void _showSetReminderDialog(Map<String, dynamic> milestone) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Set Reminder'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              leading: CustomIconWidget(
                iconName: 'today',
                color: AppTheme.lightTheme.colorScheme.primary,
                size: 6.w,
              ),
              title: const Text('Daily reminder'),
              onTap: () {
                _setReminder(milestone, 'daily');
                Navigator.pop(context);
              },
            ),
            ListTile(
              leading: CustomIconWidget(
                iconName: 'date_range',
                color: AppTheme.lightTheme.colorScheme.primary,
                size: 6.w,
              ),
              title: const Text('Weekly reminder'),
              onTap: () {
                _setReminder(milestone, 'weekly');
                Navigator.pop(context);
              },
            ),
            ListTile(
              leading: CustomIconWidget(
                iconName: 'notifications_off',
                color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                size: 6.w,
              ),
              title: const Text('Remove reminder'),
              onTap: () {
                _setReminder(milestone, 'none');
                Navigator.pop(context);
              },
            ),
          ],
        ),
      ),
    );
  }

  void _setReminder(Map<String, dynamic> milestone, String type) {
    setState(() {
      final milestoneIndex =
          _allMilestones.indexWhere((m) => m['id'] == milestone['id']);
      if (milestoneIndex != -1) {
        _allMilestones[milestoneIndex]['hasReminder'] = type != 'none';
        _allMilestones[milestoneIndex]['reminderType'] = type;
      }
    });

    String message = '';
    switch (type) {
      case 'daily':
        message = 'Daily reminder set for this milestone';
        break;
      case 'weekly':
        message = 'Weekly reminder set for this milestone';
        break;
      case 'none':
        message = 'Reminder removed';
        break;
    }

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
    );
  }

  void _shareMilestone(Map<String, dynamic> milestone) {
    final title = milestone['title'] as String;
    final isCompleted = milestone['isCompleted'] as bool;
    final completedDate = milestone['completedDate'] as String?;

    String shareText = '';
    if (isCompleted && completedDate != null) {
      shareText = '🎉 Milestone Achievement! 🎉\n\n'
          'Our little one just achieved: "$title"\n'
          'Completed on: $completedDate\n\n'
          'So proud of this amazing progress! 👶💕\n\n'
          '#BabyMilestones #ProudParents #BabyDevelopment';
    } else {
      shareText = '📝 Working on a new milestone!\n\n'
          'We\'re practicing: "$title"\n\n'
          'Every step of the journey is precious! 👶💕\n\n'
          '#BabyMilestones #BabyDevelopment #ParentingJourney';
    }

    // Use clipboard instead of share_plus for web compatibility
    Clipboard.setData(ClipboardData(text: shareText)).then((_) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: const Text('Milestone details copied to clipboard!'),
            behavior: SnackBarBehavior.floating,
            shape:
                RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          ),
        );
      }
    });
  }

  void _showFilterOptions() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => StatefulBuilder(
        builder: (context, setModalState) => Container(
          padding: EdgeInsets.all(4.w),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Center(
                child: Container(
                  width: 12.w,
                  height: 0.5.h,
                  decoration: BoxDecoration(
                    color: AppTheme.lightTheme.colorScheme.outline
                        .withValues(alpha: 0.3),
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
              ),
              SizedBox(height: 2.h),
              Text(
                'Filter Milestones',
                style: AppTheme.lightTheme.textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
              SizedBox(height: 3.h),
              Text(
                'Status',
                style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w600,
                ),
              ),
              SizedBox(height: 1.h),
              Wrap(
                spacing: 2.w,
                runSpacing: 1.h,
                children: ['All', 'Achieved', 'In Progress', 'Upcoming']
                    .map((status) {
                  final isSelected = _statusFilter == status;
                  return InkWell(
                    onTap: () {
                      setModalState(() {
                        _statusFilter = status;
                      });
                    },
                    borderRadius: BorderRadius.circular(16),
                    child: Container(
                      padding:
                          EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
                      decoration: BoxDecoration(
                        color: isSelected
                            ? AppTheme.lightTheme.colorScheme.primary
                            : AppTheme.lightTheme.colorScheme.surface,
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(
                          color: isSelected
                              ? AppTheme.lightTheme.colorScheme.primary
                              : AppTheme.lightTheme.colorScheme.outline,
                        ),
                      ),
                      child: Text(
                        status,
                        style:
                            AppTheme.lightTheme.textTheme.labelMedium?.copyWith(
                          color: isSelected
                              ? Colors.white
                              : AppTheme.lightTheme.colorScheme.onSurface,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ),
                  );
                }).toList(),
              ),
              SizedBox(height: 3.h),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () {
                    setState(() {
                      // Update the main state with modal state
                    });
                    Navigator.pop(context);
                  },
                  child: const Text('Apply Filters'),
                ),
              ),
              SizedBox(height: 2.h),
            ],
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      appBar: AppBar(
        title: Text(
          'Milestone Tracker',
          style: AppTheme.lightTheme.textTheme.headlineSmall?.copyWith(
            fontWeight: FontWeight.w700,
          ),
        ),
        actions: [
          IconButton(
            onPressed: () {
              // Navigate to historical records
              Navigator.pushNamed(context, '/historical-records');
            },
            icon: CustomIconWidget(
              iconName: 'history',
              color: AppTheme.lightTheme.colorScheme.onSurface,
              size: 6.w,
            ),
          ),
          IconButton(
            onPressed: () {
              // Navigate to dashboard
              Navigator.pushNamed(context, '/dashboard-home');
            },
            icon: CustomIconWidget(
              iconName: 'dashboard',
              color: AppTheme.lightTheme.colorScheme.onSurface,
              size: 6.w,
            ),
          ),
        ],
      ),
      body: _categorizedMilestones.isEmpty
          ? SingleChildScrollView(
              physics: const AlwaysScrollableScrollPhysics(),
              child: SizedBox(
                height: MediaQuery.of(context).size.height * 0.7,
                child: Column(
                  children: [
                    // Progress Header
                    MilestoneProgressHeader(
                      completionPercentage: _completionPercentage,
                      totalMilestones: _totalMilestones,
                      completedMilestones: _completedMilestones,
                      celebrationCount: _celebrationCount,
                    ),

                    // Search Bar
                    MilestoneSearchBar(
                      onSearchChanged: (query) {
                        setState(() {
                          _searchQuery = query;
                        });
                      },
                      onAgeFilterChanged: (filter) {
                        setState(() {
                          _ageFilter = filter;
                        });
                      },
                      onFilterTap: _showFilterOptions,
                    ),

                    // Empty State
                    Expanded(
                      child: Center(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            CustomIconWidget(
                              iconName: 'search_off',
                              color: AppTheme
                                  .lightTheme.colorScheme.onSurfaceVariant,
                              size: 15.w,
                            ),
                            SizedBox(height: 2.h),
                            Text(
                              'No milestones found',
                              style: AppTheme.lightTheme.textTheme.titleMedium
                                  ?.copyWith(
                                color: AppTheme
                                    .lightTheme.colorScheme.onSurfaceVariant,
                              ),
                            ),
                            SizedBox(height: 1.h),
                            Text(
                              'Try adjusting your search or filters',
                              style: AppTheme.lightTheme.textTheme.bodyMedium
                                  ?.copyWith(
                                color: AppTheme
                                    .lightTheme.colorScheme.onSurfaceVariant,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            )
          : RefreshIndicator(
              onRefresh: () async {
                // Refresh functionality
                await Future.delayed(const Duration(milliseconds: 500));
                setState(() {});
              },
              child: CustomScrollView(
                controller: _scrollController,
                physics: const AlwaysScrollableScrollPhysics(),
                keyboardDismissBehavior:
                    ScrollViewKeyboardDismissBehavior.onDrag,
                slivers: [
                  // Progress Header - Now as a sliver
                  SliverToBoxAdapter(
                    child: MilestoneProgressHeader(
                      completionPercentage: _completionPercentage,
                      totalMilestones: _totalMilestones,
                      completedMilestones: _completedMilestones,
                      celebrationCount: _celebrationCount,
                    ),
                  ),

                  // Search Bar - Now as a sliver
                  SliverToBoxAdapter(
                    child: MilestoneSearchBar(
                      onSearchChanged: (query) {
                        setState(() {
                          _searchQuery = query;
                        });
                      },
                      onAgeFilterChanged: (filter) {
                        setState(() {
                          _ageFilter = filter;
                        });
                      },
                      onFilterTap: _showFilterOptions,
                    ),
                  ),

                  // Milestone Categories - Now as proper slivers
                  SliverList(
                    delegate: SliverChildBuilderDelegate(
                      (context, index) {
                        final category =
                            _categorizedMilestones.keys.elementAt(index);
                        final milestones = _categorizedMilestones[category]!;

                        return MilestoneCategorySection(
                          categoryTitle: category,
                          milestones: milestones,
                          onMilestoneToggle: _onMilestoneToggle,
                          onMilestoneDetails: _showMilestoneDetails,
                          onAddNote: _showAddNoteDialog,
                          onSetReminder: _showSetReminderDialog,
                        );
                      },
                      childCount: _categorizedMilestones.keys.length,
                    ),
                  ),

                  // Enhanced bottom padding for the floating action button
                  SliverPadding(
                    padding: EdgeInsets.only(
                      bottom: MediaQuery.of(context).padding.bottom + 15.h,
                    ),
                  ),
                ],
              ),
            ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {
          // Quick add milestone functionality
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: const Text('Quick milestone entry coming soon!'),
              behavior: SnackBarBehavior.floating,
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12)),
            ),
          );
        },
        icon: CustomIconWidget(
          iconName: 'add',
          color: Colors.white,
          size: 5.w,
        ),
        label: const Text('Quick Add'),
      ),
    );
  }
}
