import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../theme/app_theme.dart';
import '../../widgets/custom_bottom_bar.dart';
import './widgets/add_entry_fab_widget.dart';
import './widgets/calendar_view_widget.dart';
import './widgets/entry_creation_modal_widget.dart';
import './widgets/journal_entry_card_widget.dart';
import './widgets/meditation_prompts_widget.dart';
import './widgets/search_filter_widget.dart';

class ReflectionJournal extends StatefulWidget {
  const ReflectionJournal({super.key});

  @override
  State<ReflectionJournal> createState() => _ReflectionJournalState();
}

class _ReflectionJournalState extends State<ReflectionJournal>
    with TickerProviderStateMixin {
  late TabController _tabController;
  late AnimationController _breathingController;
  late AnimationController _fadeController;
  late Animation<double> _breathingAnimation;
  late Animation<double> _fadeAnimation;

  String selectedMood = '';
  bool isSearchVisible = false;
  String searchQuery = '';
  int selectedTabIndex = 0;

  // Mock data for journal entries
  final List<Map<String, dynamic>> _journalEntries = [
    {
      'id': '1',
      'date': DateTime.now().subtract(const Duration(days: 0)),
      'mood': '😊',
      'title': 'Amazing morning routine completion',
      'preview': 'Started the day with meditation and felt so grounded...',
      'content':
          'Today I managed to complete my entire morning routine. I started with 10 minutes of meditation, followed by journaling and some light stretching. I feel incredibly grounded and ready to take on the day with clarity and purpose.',
      'linkedHabits': ['Meditation', 'Morning Routine'],
      'tags': ['grateful', 'energized'],
    },
    {
      'id': '2',
      'date': DateTime.now().subtract(const Duration(days: 1)),
      'mood': '🤔',
      'title': 'Reflecting on yesterday\'s challenges',
      'preview': 'Had some struggles with consistency but learned...',
      'content':
          'Yesterday was challenging. I missed my evening workout and felt disappointed. However, I realize that perfection isn\'t the goal - progress is. Tomorrow I\'ll adjust my schedule to make it more realistic.',
      'linkedHabits': ['Exercise', 'Self-Compassion'],
      'tags': ['learning', 'growth'],
    },
    {
      'id': '3',
      'date': DateTime.now().subtract(const Duration(days: 3)),
      'mood': '🌟',
      'title': 'Breakthrough in mindfulness practice',
      'preview':
          'Experienced a profound sense of peace during today\'s session...',
      'content':
          'During my mindfulness practice today, I experienced a breakthrough. For the first time, I truly felt present and at peace. The racing thoughts quieted, and I felt deeply connected to the moment.',
      'linkedHabits': ['Mindfulness', 'Breathing'],
      'tags': ['breakthrough', 'peaceful'],
    },
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 4, vsync: this);
    _tabController.addListener(() {
      setState(() {
        selectedTabIndex = _tabController.index;
      });
    });

    _breathingController = AnimationController(
      duration: const Duration(seconds: 4),
      vsync: this,
    );

    _fadeController = AnimationController(
      duration: const Duration(milliseconds: 600),
      vsync: this,
    );

    _breathingAnimation = Tween<double>(
      begin: 0.95,
      end: 1.05,
    ).animate(CurvedAnimation(
      parent: _breathingController,
      curve: Curves.easeInOut,
    ));

    _fadeAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _fadeController,
      curve: Curves.easeOut,
    ));

    _breathingController.repeat(reverse: true);
    _fadeController.forward();
  }

  @override
  void dispose() {
    _tabController.dispose();
    _breathingController.dispose();
    _fadeController.dispose();
    super.dispose();
  }

  void _showAddEntryModal() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => EntryCreationModalWidget(
        onSave: (entry) {
          setState(() {
            _journalEntries.insert(0, entry);
          });
        },
      ),
    );
  }

  void _showSearchFilter() {
    setState(() {
      isSearchVisible = !isSearchVisible;
    });
  }

  List<Map<String, dynamic>> get filteredEntries {
    if (searchQuery.isEmpty) return _journalEntries;
    return _journalEntries.where((entry) {
      return entry['title']
              .toString()
              .toLowerCase()
              .contains(searchQuery.toLowerCase()) ||
          entry['content']
              .toString()
              .toLowerCase()
              .contains(searchQuery.toLowerCase()) ||
          entry['tags'].any((tag) =>
              tag.toString().toLowerCase().contains(searchQuery.toLowerCase()));
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.primaryLight,
      appBar: _buildAppBar(),
      body: FadeTransition(
        opacity: _fadeAnimation,
        child: Column(
          children: [
            if (isSearchVisible)
              AnimatedContainer(
                duration: const Duration(milliseconds: 400),
                curve: Curves.easeInOut,
                height: isSearchVisible ? 80 : 0,
                child: SearchFilterWidget(
                  onQueryChanged: (query) {
                    setState(() {
                      searchQuery = query;
                    });
                  },
                ),
              ),
            Expanded(
              child: AnimatedBuilder(
                animation: _tabController,
                builder: (context, child) {
                  return IndexedStack(
                    index: selectedTabIndex,
                    children: [
                      _buildEntriesTab(),
                      _buildCalendarTab(),
                      _buildMeditationTab(),
                      _buildInsightsTab(),
                    ],
                  );
                },
              ),
            ),
          ],
        ),
      ),
      floatingActionButton: ScaleTransition(
        scale: _breathingAnimation,
        child: AddEntryFabWidget(
          onPressed: _showAddEntryModal,
        ),
      ),
      bottomNavigationBar: CustomBottomBar(
        currentIndex: 2,
        onTap: (index) {
          // Handle navigation tap
        },
      ),
    );
  }

  PreferredSizeWidget _buildAppBar() {
    return PreferredSize(
      preferredSize: const Size.fromHeight(120),
      child: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              AppTheme.primaryLight,
              AppTheme.surfaceLight.withAlpha(230),
            ],
          ),
          boxShadow: [
            BoxShadow(
              color: AppTheme.shadowLight.withAlpha(25),
              blurRadius: 16,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
            child: Column(
              children: [
                // Main header row with serene spacing
                Row(
                  children: [
                    // Gentle back icon with breathing space
                    Container(
                      margin: const EdgeInsets.only(right: 20),
                      child: IconButton(
                        icon: const Icon(Icons.arrow_back_ios_rounded),
                        onPressed: () => Navigator.pop(context),
                        color: AppTheme.textSecondaryLight,
                        iconSize: 22,
                        style: IconButton.styleFrom(
                          padding: const EdgeInsets.all(12),
                          minimumSize: const Size(44, 44),
                        ),
                      ),
                    ),

                    // Centered title with handwritten elegance
                    Expanded(
                      child: Center(
                        child: Text(
                          'Journal',
                          style: GoogleFonts.playfairDisplay(
                            fontSize: 28,
                            fontWeight: FontWeight.w500,
                            color: AppTheme.secondaryLight,
                            letterSpacing: 0.8,
                            height: 1.2,
                          ),
                        ),
                      ),
                    ),

                    // Right icons with even spacing and subtle tones
                    Row(
                      children: [
                        IconButton(
                          icon: Icon(
                            Icons.calendar_today_rounded,
                            color: AppTheme.textSecondaryLight.withAlpha(179),
                          ),
                          onPressed: () {
                            _tabController.animateTo(1);
                          },
                          iconSize: 20,
                          style: IconButton.styleFrom(
                            padding: const EdgeInsets.all(10),
                            minimumSize: const Size(40, 40),
                          ),
                        ),
                        const SizedBox(width: 8),
                        IconButton(
                          icon: Icon(
                            isSearchVisible
                                ? Icons.search_off_rounded
                                : Icons.search_rounded,
                            color: AppTheme.textSecondaryLight.withAlpha(179),
                          ),
                          onPressed: _showSearchFilter,
                          iconSize: 20,
                          style: IconButton.styleFrom(
                            padding: const EdgeInsets.all(10),
                            minimumSize: const Size(40, 40),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),

                const SizedBox(height: 16),

                // Secondary navigation with soft icons and meditative style
                _buildSereneTabs(),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildSereneTabs() {
    return Container(
      height: 48,
      decoration: BoxDecoration(
        color: AppTheme.surfaceLight.withAlpha(153),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(
          color: AppTheme.borderLight.withAlpha(128),
          width: 0.8,
        ),
      ),
      child: Row(
        children: [
          _buildSereneTab(
            index: 0,
            icon: Icons.auto_stories_rounded,
            label: 'Entries',
            isActive: selectedTabIndex == 0,
          ),
          _buildSereneTab(
            index: 1,
            icon: Icons.calendar_view_month_rounded,
            label: 'Calendar',
            isActive: selectedTabIndex == 1,
          ),
          _buildSereneTab(
            index: 2,
            icon: Icons.self_improvement_rounded,
            label: 'Prompts',
            isActive: selectedTabIndex == 2,
          ),
          _buildSereneTab(
            index: 3,
            icon: Icons.insights_rounded,
            label: 'Insights',
            isActive: selectedTabIndex == 3,
          ),
        ],
      ),
    );
  }

  Widget _buildSereneTab({
    required int index,
    required IconData icon,
    required String label,
    required bool isActive,
  }) {
    return Expanded(
      child: GestureDetector(
        onTap: () {
          _tabController.animateTo(index);
        },
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 500),
          curve: Curves.easeInOut,
          margin: const EdgeInsets.all(4),
          decoration: BoxDecoration(
            color: isActive ? AppTheme.primaryLight : Colors.transparent,
            borderRadius: BorderRadius.circular(20),
            boxShadow: isActive
                ? [
                    BoxShadow(
                      color: AppTheme.premiumLight.withAlpha(102),
                      blurRadius: 12,
                      offset: const Offset(0, 2),
                    ),
                  ]
                : null,
            border: isActive
                ? Border.all(
                    color: AppTheme.premiumLight.withAlpha(128),
                    width: 1.2,
                  )
                : null,
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              AnimatedContainer(
                duration: const Duration(milliseconds: 400),
                child: Icon(
                  icon,
                  size: 16,
                  color: isActive
                      ? AppTheme.secondaryLight
                      : AppTheme.textSecondaryLight.withAlpha(153),
                ),
              ),
              const SizedBox(height: 2),
              AnimatedDefaultTextStyle(
                duration: const Duration(milliseconds: 400),
                style: GoogleFonts.inter(
                  fontSize: 10,
                  fontWeight: isActive ? FontWeight.w500 : FontWeight.w400,
                  color: isActive
                      ? AppTheme.secondaryLight
                      : AppTheme.textSecondaryLight.withAlpha(153),
                  letterSpacing: 0.3,
                ),
                child: Text(label),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildTabBar() {
    // Replace the old TabBar implementation with AnimatedBuilder
    return AnimatedBuilder(
      animation: _tabController,
      builder: (context, child) {
        return const SizedBox
            .shrink(); // Hide the old tab bar since we use the serene one
      },
    );
  }

  Widget _buildEntriesTab() {
    return filteredEntries.isEmpty
        ? _buildEmptyState()
        : ListView.builder(
            padding: const EdgeInsets.all(16),
            itemCount: filteredEntries.length,
            itemBuilder: (context, index) {
              final entry = filteredEntries[index];
              return AnimatedContainer(
                duration: Duration(milliseconds: 200 + (index * 50)),
                curve: Curves.easeOutCubic,
                child: JournalEntryCardWidget(
                  entry: entry,
                  onTap: () => _showEntryDetails(entry),
                ),
              );
            },
          );
  }

  Widget _buildCalendarTab() {
    return CalendarViewWidget(
      entries: _journalEntries,
      onDateSelected: (date) {
        // Navigate to entries for selected date
      },
    );
  }

  Widget _buildMeditationTab() {
    return MeditationPromptsWidget(
      onPromptSelected: (prompt) {
        // Auto-fill new entry with selected prompt
        _showAddEntryModal();
      },
    );
  }

  Widget _buildInsightsTab() {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Your Journey Insights',
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  color: AppTheme.textPrimaryLight,
                ),
          ),
          const SizedBox(height: 24),
          _buildInsightCard(
            icon: Icons.psychology_rounded,
            title: 'Mood Patterns',
            description: 'Most frequent mood: Grateful 😊',
            color: AppTheme.successLight,
          ),
          const SizedBox(height: 16),
          _buildInsightCard(
            icon: Icons.trending_up_rounded,
            title: 'Growth Moments',
            description: '12 breakthrough entries this month',
            color: AppTheme.accentLight,
          ),
          const SizedBox(height: 16),
          _buildInsightCard(
            icon: Icons.favorite_rounded,
            title: 'Habit Connections',
            description: 'Meditation linked to highest satisfaction',
            color: AppTheme.premiumLight,
          ),
        ],
      ),
    );
  }

  Widget _buildInsightCard({
    required IconData icon,
    required String title,
    required String description,
    required Color color,
  }) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.surfaceLight,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: color.withAlpha(51),
          width: 1,
        ),
      ),
      child: Row(
        children: [
          Container(
            width: 48,
            height: 48,
            decoration: BoxDecoration(
              color: color.withAlpha(51),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(
              icon,
              color: color,
              size: 24,
            ),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        color: AppTheme.textPrimaryLight,
                        fontWeight: FontWeight.w600,
                      ),
                ),
                const SizedBox(height: 4),
                Text(
                  description,
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        color: AppTheme.textSecondaryLight,
                      ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildEmptyState() {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 80,
              height: 80,
              decoration: BoxDecoration(
                color: AppTheme.surfaceLight,
                borderRadius: BorderRadius.circular(20),
                boxShadow: [
                  BoxShadow(
                    color: AppTheme.shadowLight.withAlpha(25),
                    blurRadius: 12,
                    offset: const Offset(0, 4),
                  ),
                ],
              ),
              child: const Icon(
                Icons.auto_stories_rounded,
                size: 40,
                color: AppTheme.textSecondaryLight,
              ),
            ),
            const SizedBox(height: 24),
            Text(
              'Your Reflection Space',
              style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                    color: AppTheme.textPrimaryLight,
                    fontWeight: FontWeight.w600,
                  ),
            ),
            const SizedBox(height: 12),
            Text(
              'Begin your mindful journey by capturing\nthoughts, feelings, and growth moments',
              textAlign: TextAlign.center,
              style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                    color: AppTheme.textSecondaryLight,
                    height: 1.5,
                  ),
            ),
            const SizedBox(height: 32),
            OutlinedButton.icon(
              onPressed: _showAddEntryModal,
              icon: const Icon(Icons.add_rounded),
              label: const Text('Create First Entry'),
              style: OutlinedButton.styleFrom(
                padding:
                    const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _showEntryDetails(Map<String, dynamic> entry) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => Container(
        height: MediaQuery.of(context).size.height * 0.85,
        decoration: const BoxDecoration(
          color: AppTheme.primaryLight,
          borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
        ),
        child: Column(
          children: [
            Container(
              width: 40,
              height: 4,
              margin: const EdgeInsets.symmetric(vertical: 12),
              decoration: BoxDecoration(
                color: AppTheme.borderLight,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.all(24),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Text(
                          entry['mood'],
                          style: const TextStyle(fontSize: 32),
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                entry['title'],
                                style: Theme.of(context)
                                    .textTheme
                                    .titleLarge
                                    ?.copyWith(
                                      color: AppTheme.textPrimaryLight,
                                      fontWeight: FontWeight.w600,
                                    ),
                              ),
                              Text(
                                '${entry['date'].day}/${entry['date'].month}/${entry['date'].year}',
                                style: Theme.of(context)
                                    .textTheme
                                    .bodyMedium
                                    ?.copyWith(
                                      color: AppTheme.textSecondaryLight,
                                    ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 24),
                    Expanded(
                      child: SingleChildScrollView(
                        child: Text(
                          entry['content'],
                          style:
                              Theme.of(context).textTheme.bodyLarge?.copyWith(
                                    color: AppTheme.textPrimaryLight,
                                    height: 1.6,
                                  ),
                        ),
                      ),
                    ),
                    if (entry['linkedHabits'] != null &&
                        entry['linkedHabits'].isNotEmpty)
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const SizedBox(height: 24),
                          Text(
                            'Connected Habits',
                            style: Theme.of(context)
                                .textTheme
                                .titleSmall
                                ?.copyWith(
                                  color: AppTheme.textSecondaryLight,
                                ),
                          ),
                          const SizedBox(height: 8),
                          Wrap(
                            spacing: 8,
                            runSpacing: 8,
                            children: (entry['linkedHabits'] as List)
                                .map((habit) => Container(
                                      padding: const EdgeInsets.symmetric(
                                          horizontal: 12, vertical: 6),
                                      decoration: BoxDecoration(
                                        color: AppTheme.secondaryLight
                                            .withAlpha(25),
                                        borderRadius: BorderRadius.circular(20),
                                      ),
                                      child: Text(
                                        habit,
                                        style: Theme.of(context)
                                            .textTheme
                                            .bodySmall
                                            ?.copyWith(
                                              color: AppTheme.secondaryLight,
                                              fontWeight: FontWeight.w500,
                                            ),
                                      ),
                                    ))
                                .toList(),
                          ),
                        ],
                      ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
