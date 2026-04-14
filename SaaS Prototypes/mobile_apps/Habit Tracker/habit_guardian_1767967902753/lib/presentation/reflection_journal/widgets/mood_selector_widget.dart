import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../../theme/app_theme.dart';

class MoodSelectorWidget extends StatefulWidget {
  final String selectedMood;
  final Function(String) onMoodSelected;

  const MoodSelectorWidget({
    super.key,
    required this.selectedMood,
    required this.onMoodSelected,
  });

  @override
  State<MoodSelectorWidget> createState() => _MoodSelectorWidgetState();
}

class _MoodSelectorWidgetState extends State<MoodSelectorWidget>
    with TickerProviderStateMixin {
  late AnimationController _breathingController;
  late Animation<double> _breathingAnimation;

  final List<Map<String, dynamic>> moods = [
    {'emoji': '😊', 'label': 'Joyful', 'color': AppTheme.successLight},
    {'emoji': '😌', 'label': 'Peaceful', 'color': AppTheme.secondaryLight},
    {'emoji': '🤔', 'label': 'Reflective', 'color': AppTheme.accentLight},
    {
      'emoji': '😔',
      'label': 'Melancholy',
      'color': AppTheme.textSecondaryLight
    },
    {'emoji': '😤', 'label': 'Frustrated', 'color': AppTheme.warningLight},
    {'emoji': '🌟', 'label': 'Inspired', 'color': AppTheme.premiumLight},
    {'emoji': '😴', 'label': 'Tired', 'color': AppTheme.borderLight},
    {'emoji': '💪', 'label': 'Energized', 'color': AppTheme.accentLight},
  ];

  @override
  void initState() {
    super.initState();
    _breathingController = AnimationController(
      duration: const Duration(seconds: 3),
      vsync: this,
    );

    _breathingAnimation = Tween<double>(
      begin: 0.95,
      end: 1.05,
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
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.surfaceLight,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: AppTheme.borderLight,
          width: 1,
        ),
      ),
      child: Column(
        children: [
          // Selected mood display with breathing animation
          AnimatedBuilder(
            animation: _breathingAnimation,
            builder: (context, child) {
              return Transform.scale(
                scale: widget.selectedMood.isNotEmpty
                    ? _breathingAnimation.value
                    : 1.0,
                child: Container(
                  width: 80,
                  height: 80,
                  decoration: BoxDecoration(
                    color: _getSelectedMoodColor().withAlpha(25),
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: _getSelectedMoodColor(),
                      width: 2,
                    ),
                  ),
                  child: Center(
                    child: Text(
                      widget.selectedMood,
                      style: const TextStyle(fontSize: 36),
                    ),
                  ),
                ),
              );
            },
          ),
          const SizedBox(height: 16),
          Text(
            _getSelectedMoodLabel(),
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  color: _getSelectedMoodColor(),
                  fontWeight: FontWeight.w600,
                ),
          ),
          const SizedBox(height: 20),
          // Mood grid
          GridView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 4,
              crossAxisSpacing: 12,
              mainAxisSpacing: 12,
              childAspectRatio: 1,
            ),
            itemCount: moods.length,
            itemBuilder: (context, index) {
              final mood = moods[index];
              final isSelected = widget.selectedMood == mood['emoji'];

              return _MoodOption(
                emoji: mood['emoji'],
                label: mood['label'],
                color: mood['color'],
                isSelected: isSelected,
                onTap: () {
                  HapticFeedback.selectionClick();
                  widget.onMoodSelected(mood['emoji']);
                },
              );
            },
          ),
        ],
      ),
    );
  }

  Color _getSelectedMoodColor() {
    final mood = moods.firstWhere(
      (m) => m['emoji'] == widget.selectedMood,
      orElse: () => moods[0],
    );
    return mood['color'];
  }

  String _getSelectedMoodLabel() {
    final mood = moods.firstWhere(
      (m) => m['emoji'] == widget.selectedMood,
      orElse: () => moods[0],
    );
    return mood['label'];
  }
}

class _MoodOption extends StatefulWidget {
  final String emoji;
  final String label;
  final Color color;
  final bool isSelected;
  final VoidCallback onTap;

  const _MoodOption({
    required this.emoji,
    required this.label,
    required this.color,
    required this.isSelected,
    required this.onTap,
  });

  @override
  State<_MoodOption> createState() => _MoodOptionState();
}

class _MoodOptionState extends State<_MoodOption>
    with SingleTickerProviderStateMixin {
  late AnimationController _tapController;
  late Animation<double> _scaleAnimation;
  late Animation<double> _opacityAnimation;

  @override
  void initState() {
    super.initState();
    _tapController = AnimationController(
      duration: const Duration(milliseconds: 150),
      vsync: this,
    );

    _scaleAnimation = Tween<double>(
      begin: 1.0,
      end: 0.95,
    ).animate(CurvedAnimation(
      parent: _tapController,
      curve: Curves.easeInOut,
    ));

    _opacityAnimation = Tween<double>(
      begin: 1.0,
      end: 0.8,
    ).animate(CurvedAnimation(
      parent: _tapController,
      curve: Curves.easeInOut,
    ));
  }

  @override
  void dispose() {
    _tapController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: (_) => _tapController.forward(),
      onTapUp: (_) => _tapController.reverse(),
      onTapCancel: () => _tapController.reverse(),
      onTap: widget.onTap,
      child: AnimatedBuilder(
        animation: _tapController,
        builder: (context, child) {
          return Transform.scale(
            scale: _scaleAnimation.value,
            child: Opacity(
              opacity: _opacityAnimation.value,
              child: AnimatedContainer(
                duration: const Duration(milliseconds: 200),
                decoration: BoxDecoration(
                  color: widget.isSelected
                      ? widget.color.withAlpha(51)
                      : AppTheme.primaryLight,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(
                    color:
                        widget.isSelected ? widget.color : AppTheme.borderLight,
                    width: widget.isSelected ? 2 : 1,
                  ),
                  boxShadow: widget.isSelected
                      ? [
                          BoxShadow(
                            color: widget.color.withAlpha(51),
                            blurRadius: 8,
                            offset: const Offset(0, 2),
                          ),
                        ]
                      : null,
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      widget.emoji,
                      style: const TextStyle(fontSize: 20),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      widget.label,
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                            color: widget.isSelected
                                ? widget.color
                                : AppTheme.textSecondaryLight,
                            fontWeight: widget.isSelected
                                ? FontWeight.w600
                                : FontWeight.w400,
                            fontSize: 10,
                          ),
                      textAlign: TextAlign.center,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
