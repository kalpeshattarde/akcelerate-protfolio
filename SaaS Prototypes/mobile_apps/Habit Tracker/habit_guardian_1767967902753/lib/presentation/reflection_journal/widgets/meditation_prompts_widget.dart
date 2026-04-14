import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../../theme/app_theme.dart';

class MeditationPromptsWidget extends StatefulWidget {
  final Function(String) onPromptSelected;

  const MeditationPromptsWidget({
    super.key,
    required this.onPromptSelected,
  });

  @override
  State<MeditationPromptsWidget> createState() =>
      _MeditationPromptsWidgetState();
}

class _MeditationPromptsWidgetState extends State<MeditationPromptsWidget>
    with TickerProviderStateMixin {
  late AnimationController _breathingController;
  late Animation<double> _breathingAnimation;

  final List<Map<String, dynamic>> promptCategories = [
    {
      'title': 'Gratitude & Appreciation',
      'icon': Icons.favorite_rounded,
      'color': AppTheme.successLight,
      'prompts': [
        'What three things am I most grateful for today?',
        'Who has positively impacted my life recently, and how?',
        'What small moment today brought me unexpected joy?',
        'How has my journey of growth surprised me this week?',
        'What aspects of my daily routine do I appreciate most?',
      ],
    },
    {
      'title': 'Self-Discovery',
      'icon': Icons.psychology_rounded,
      'color': AppTheme.accentLight,
      'prompts': [
        'What emotions did I experience most strongly today?',
        'How did my habits support my well-being today?',
        'What patterns do I notice in my daily choices?',
        'When do I feel most authentic and true to myself?',
        'What would I tell my past self about today\'s experiences?',
      ],
    },
    {
      'title': 'Mindful Reflection',
      'icon': Icons.self_improvement_rounded,
      'color': AppTheme.secondaryLight,
      'prompts': [
        'How did I practice presence and mindfulness today?',
        'What thoughts kept returning to my mind today?',
        'How did my body feel throughout the day?',
        'What moments today required the most patience?',
        'When did I feel most connected to the present moment?',
      ],
    },
    {
      'title': 'Growth & Learning',
      'icon': Icons.trending_up_rounded,
      'color': AppTheme.premiumLight,
      'prompts': [
        'What challenge helped me grow today?',
        'How did I step outside my comfort zone recently?',
        'What new insight about myself did I discover?',
        'How are my habits evolving to better serve me?',
        'What would I like to learn or improve tomorrow?',
      ],
    },
  ];

  @override
  void initState() {
    super.initState();
    _breathingController = AnimationController(
      duration: const Duration(seconds: 4),
      vsync: this,
    );

    _breathingAnimation = Tween<double>(
      begin: 0.98,
      end: 1.02,
    ).animate(CurvedAnimation(
      parent: _breathingController,
      curve: Curves.easeInOut,
    ));

    _breathingController.repeat(reverse: true);
  }

  @override
  void dispose() {
    _breathingController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _breathingAnimation,
      builder: (context, child) {
        return Transform.scale(
          scale: _breathingAnimation.value,
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _buildHeader(),
                const SizedBox(height: 20),
                Expanded(
                  child: ListView.builder(
                    itemCount: promptCategories.length,
                    itemBuilder: (context, index) {
                      return _buildPromptCategory(
                          promptCategories[index], index);
                    },
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildHeader() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            AppTheme.secondaryLight.withAlpha(25),
            AppTheme.accentLight.withAlpha(25),
          ],
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: AppTheme.secondaryLight.withAlpha(51),
          width: 1,
        ),
      ),
      child: Row(
        children: [
          Container(
            width: 48,
            height: 48,
            decoration: BoxDecoration(
              color: AppTheme.secondaryLight.withAlpha(51),
              borderRadius: BorderRadius.circular(12),
            ),
            child: const Icon(
              Icons.auto_stories_rounded,
              color: AppTheme.secondaryLight,
              size: 24,
            ),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Reflection Prompts',
                  style: GoogleFonts.playfairDisplay(
                    fontSize: 18,
                    fontWeight: FontWeight.w600,
                    color: AppTheme.textPrimaryLight,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  'Gentle questions to guide your inner journey',
                  style: GoogleFonts.inter(
                    fontSize: 12,
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

  Widget _buildPromptCategory(Map<String, dynamic> category, int index) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      decoration: BoxDecoration(
        color: AppTheme.surfaceLight,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: AppTheme.borderLight,
          width: 1,
        ),
      ),
      child: ExpansionTile(
        tilePadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
        childrenPadding: const EdgeInsets.only(bottom: 16),
        leading: Container(
          width: 40,
          height: 40,
          decoration: BoxDecoration(
            color: category['color'].withAlpha(25),
            borderRadius: BorderRadius.circular(10),
          ),
          child: Icon(
            category['icon'],
            color: category['color'],
            size: 20,
          ),
        ),
        title: Text(
          category['title'],
          style: GoogleFonts.inter(
            fontSize: 16,
            fontWeight: FontWeight.w600,
            color: AppTheme.textPrimaryLight,
          ),
        ),
        subtitle: Text(
          '${category['prompts'].length} prompts available',
          style: GoogleFonts.inter(
            fontSize: 12,
            color: AppTheme.textSecondaryLight,
          ),
        ),
        iconColor: category['color'],
        collapsedIconColor: AppTheme.textSecondaryLight,
        children: [
          ...List.generate(
            category['prompts'].length,
            (promptIndex) => _buildPromptItem(
              category['prompts'][promptIndex],
              category['color'],
              promptIndex,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPromptItem(String prompt, Color color, int index) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 20, vertical: 4),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          borderRadius: BorderRadius.circular(12),
          onTap: () => widget.onPromptSelected(prompt),
          child: Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppTheme.primaryLight,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(
                color: color.withAlpha(51),
                width: 1,
              ),
            ),
            child: Row(
              children: [
                Container(
                  width: 24,
                  height: 24,
                  decoration: BoxDecoration(
                    color: color.withAlpha(25),
                    shape: BoxShape.circle,
                  ),
                  child: Center(
                    child: Text(
                      '${index + 1}',
                      style: GoogleFonts.inter(
                        fontSize: 10,
                        fontWeight: FontWeight.w600,
                        color: color,
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Text(
                    prompt,
                    style: GoogleFonts.inter(
                      fontSize: 14,
                      color: AppTheme.textPrimaryLight,
                      height: 1.4,
                    ),
                  ),
                ),
                Icon(
                  Icons.edit_rounded,
                  size: 16,
                  color: color,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
