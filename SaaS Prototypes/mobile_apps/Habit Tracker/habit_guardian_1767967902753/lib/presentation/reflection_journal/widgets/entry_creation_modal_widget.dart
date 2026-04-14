import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../../theme/app_theme.dart';
import './mood_selector_widget.dart';

class EntryCreationModalWidget extends StatefulWidget {
  final Function(Map<String, dynamic>) onSave;

  const EntryCreationModalWidget({
    super.key,
    required this.onSave,
  });

  @override
  State<EntryCreationModalWidget> createState() =>
      _EntryCreationModalWidgetState();
}

class _EntryCreationModalWidgetState extends State<EntryCreationModalWidget>
    with TickerProviderStateMixin {
  late AnimationController _slideController;
  late AnimationController _fadeController;
  late Animation<Offset> _slideAnimation;
  late Animation<double> _fadeAnimation;

  final TextEditingController _titleController = TextEditingController();
  final TextEditingController _contentController = TextEditingController();
  final FocusNode _titleFocus = FocusNode();
  final FocusNode _contentFocus = FocusNode();

  String selectedMood = '😊';
  List<String> selectedHabits = [];
  List<String> tags = [];

  final List<String> availableHabits = [
    'Meditation',
    'Exercise',
    'Reading',
    'Journaling',
    'Hydration',
    'Sleep',
    'Mindfulness',
    'Gratitude',
  ];

  final List<String> suggestedTags = [
    'grateful',
    'peaceful',
    'energized',
    'reflective',
    'challenging',
    'breakthrough',
    'learning',
    'growth',
  ];

  @override
  void initState() {
    super.initState();

    _slideController = AnimationController(
      duration: const Duration(milliseconds: 600),
      vsync: this,
    );

    _fadeController = AnimationController(
      duration: const Duration(milliseconds: 400),
      vsync: this,
    );

    _slideAnimation = Tween<Offset>(
      begin: const Offset(0, 1),
      end: Offset.zero,
    ).animate(CurvedAnimation(
      parent: _slideController,
      curve: Curves.easeOutCubic,
    ));

    _fadeAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _fadeController,
      curve: Curves.easeOut,
    ));

    _slideController.forward();
    _fadeController.forward();

    // Auto-focus title field after animation
    Future.delayed(const Duration(milliseconds: 700), () {
      _titleFocus.requestFocus();
    });
  }

  @override
  void dispose() {
    _slideController.dispose();
    _fadeController.dispose();
    _titleController.dispose();
    _contentController.dispose();
    _titleFocus.dispose();
    _contentFocus.dispose();
    super.dispose();
  }

  void _saveEntry() {
    if (_titleController.text.trim().isEmpty ||
        _contentController.text.trim().isEmpty) {
      _showValidationError('Please fill in both title and content');
      return;
    }

    final entry = {
      'id': DateTime.now().millisecondsSinceEpoch.toString(),
      'date': DateTime.now(),
      'mood': selectedMood,
      'title': _titleController.text.trim(),
      'preview': _contentController.text.trim().length > 60
          ? '${_contentController.text.trim().substring(0, 60)}...'
          : _contentController.text.trim(),
      'content': _contentController.text.trim(),
      'linkedHabits': selectedHabits,
      'tags': tags,
    };

    HapticFeedback.lightImpact();
    widget.onSave(entry);
    Navigator.pop(context);
  }

  void _showValidationError(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: AppTheme.warningLight,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return SlideTransition(
      position: _slideAnimation,
      child: Container(
        height: MediaQuery.of(context).size.height * 0.9,
        decoration: const BoxDecoration(
          color: AppTheme.primaryLight,
          borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
        ),
        child: Column(
          children: [
            _buildHeader(),
            Expanded(
              child: FadeTransition(
                opacity: _fadeAnimation,
                child: SingleChildScrollView(
                  padding: const EdgeInsets.all(24),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      _buildMoodSection(),
                      const SizedBox(height: 24),
                      _buildTitleSection(),
                      const SizedBox(height: 24),
                      _buildContentSection(),
                      const SizedBox(height: 24),
                      _buildHabitsSection(),
                      const SizedBox(height: 24),
                      _buildTagsSection(),
                      const SizedBox(height: 32),
                      _buildSaveButton(),
                      const SizedBox(height: 20),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: const BoxDecoration(
        border: Border(
          bottom: BorderSide(
            color: AppTheme.borderLight,
            width: 1,
          ),
        ),
      ),
      child: Row(
        children: [
          Container(
            width: 40,
            height: 4,
            decoration: BoxDecoration(
              color: AppTheme.borderLight,
              borderRadius: BorderRadius.circular(2),
            ),
          ),
          const Spacer(),
          Text(
            'New Entry',
            style: GoogleFonts.playfairDisplay(
              fontSize: 20,
              fontWeight: FontWeight.w600,
              color: AppTheme.textPrimaryLight,
            ),
          ),
          const Spacer(),
          GestureDetector(
            onTap: () => Navigator.pop(context),
            child: Container(
              width: 32,
              height: 32,
              decoration: BoxDecoration(
                color: AppTheme.surfaceLight,
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Icon(
                Icons.close_rounded,
                size: 18,
                color: AppTheme.textSecondaryLight,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMoodSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'How are you feeling?',
          style: GoogleFonts.inter(
            fontSize: 16,
            fontWeight: FontWeight.w600,
            color: AppTheme.textPrimaryLight,
          ),
        ),
        const SizedBox(height: 12),
        MoodSelectorWidget(
          selectedMood: selectedMood,
          onMoodSelected: (mood) {
            setState(() {
              selectedMood = mood;
            });
            HapticFeedback.selectionClick();
          },
        ),
      ],
    );
  }

  Widget _buildTitleSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Entry Title',
          style: GoogleFonts.inter(
            fontSize: 16,
            fontWeight: FontWeight.w600,
            color: AppTheme.textPrimaryLight,
          ),
        ),
        const SizedBox(height: 12),
        TextField(
          controller: _titleController,
          focusNode: _titleFocus,
          decoration: InputDecoration(
            hintText: 'Give your reflection a meaningful title...',
            hintStyle: GoogleFonts.inter(
              color: AppTheme.textSecondaryLight,
              fontStyle: FontStyle.italic,
            ),
          ),
          style: GoogleFonts.inter(
            fontSize: 16,
            color: AppTheme.textPrimaryLight,
          ),
          textInputAction: TextInputAction.next,
          onSubmitted: (_) => _contentFocus.requestFocus(),
        ),
      ],
    );
  }

  Widget _buildContentSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Your Reflection',
          style: GoogleFonts.inter(
            fontSize: 16,
            fontWeight: FontWeight.w600,
            color: AppTheme.textPrimaryLight,
          ),
        ),
        const SizedBox(height: 12),
        TextField(
          controller: _contentController,
          focusNode: _contentFocus,
          maxLines: 8,
          decoration: InputDecoration(
            hintText:
                'Share your thoughts, feelings, insights, or gratitude...\n\nWhat did you learn today?\nHow did your habits make you feel?\nWhat are you grateful for?',
            hintStyle: GoogleFonts.inter(
              color: AppTheme.textSecondaryLight,
              fontStyle: FontStyle.italic,
              height: 1.5,
            ),
            alignLabelWithHint: true,
          ),
          style: GoogleFonts.inter(
            fontSize: 16,
            color: AppTheme.textPrimaryLight,
            height: 1.5,
          ),
          textInputAction: TextInputAction.newline,
        ),
      ],
    );
  }

  Widget _buildHabitsSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Connect to Habits',
          style: GoogleFonts.inter(
            fontSize: 16,
            fontWeight: FontWeight.w600,
            color: AppTheme.textPrimaryLight,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          'Link this entry to habits that influenced your day',
          style: GoogleFonts.inter(
            fontSize: 12,
            color: AppTheme.textSecondaryLight,
          ),
        ),
        const SizedBox(height: 12),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: availableHabits.map((habit) {
            final isSelected = selectedHabits.contains(habit);
            return GestureDetector(
              onTap: () {
                setState(() {
                  if (isSelected) {
                    selectedHabits.remove(habit);
                  } else {
                    selectedHabits.add(habit);
                  }
                });
                HapticFeedback.selectionClick();
              },
              child: AnimatedContainer(
                duration: const Duration(milliseconds: 200),
                padding:
                    const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                decoration: BoxDecoration(
                  color: isSelected
                      ? AppTheme.successLight
                      : AppTheme.surfaceLight,
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(
                    color: isSelected
                        ? AppTheme.successLight
                        : AppTheme.borderLight,
                    width: 1,
                  ),
                ),
                child: Text(
                  habit,
                  style: GoogleFonts.inter(
                    fontSize: 14,
                    fontWeight: FontWeight.w500,
                    color: isSelected
                        ? AppTheme.primaryLight
                        : AppTheme.textSecondaryLight,
                  ),
                ),
              ),
            );
          }).toList(),
        ),
      ],
    );
  }

  Widget _buildTagsSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Tags',
          style: GoogleFonts.inter(
            fontSize: 16,
            fontWeight: FontWeight.w600,
            color: AppTheme.textPrimaryLight,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          'Add tags to help organize your reflections',
          style: GoogleFonts.inter(
            fontSize: 12,
            color: AppTheme.textSecondaryLight,
          ),
        ),
        const SizedBox(height: 12),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: suggestedTags.map((tag) {
            final isSelected = tags.contains(tag);
            return GestureDetector(
              onTap: () {
                setState(() {
                  if (isSelected) {
                    tags.remove(tag);
                  } else {
                    tags.add(tag);
                  }
                });
                HapticFeedback.selectionClick();
              },
              child: AnimatedContainer(
                duration: const Duration(milliseconds: 200),
                padding:
                    const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                decoration: BoxDecoration(
                  color: isSelected
                      ? AppTheme.accentLight.withAlpha(25)
                      : AppTheme.surfaceLight,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(
                    color: isSelected
                        ? AppTheme.accentLight
                        : AppTheme.borderLight,
                    width: 1,
                  ),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      '#$tag',
                      style: GoogleFonts.inter(
                        fontSize: 12,
                        fontWeight: FontWeight.w500,
                        color: isSelected
                            ? AppTheme.accentLight
                            : AppTheme.textSecondaryLight,
                      ),
                    ),
                    if (isSelected) ...[
                      const SizedBox(width: 4),
                      Icon(
                        Icons.check_circle_rounded,
                        size: 14,
                        color: AppTheme.accentLight,
                      ),
                    ],
                  ],
                ),
              ),
            );
          }).toList(),
        ),
      ],
    );
  }

  Widget _buildSaveButton() {
    return SizedBox(
      width: double.infinity,
      child: ElevatedButton(
        onPressed: _saveEntry,
        style: ElevatedButton.styleFrom(
          padding: const EdgeInsets.symmetric(vertical: 16),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          elevation: 2,
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.save_rounded, size: 20),
            const SizedBox(width: 8),
            Text(
              'Save Reflection',
              style: GoogleFonts.inter(
                fontSize: 16,
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
