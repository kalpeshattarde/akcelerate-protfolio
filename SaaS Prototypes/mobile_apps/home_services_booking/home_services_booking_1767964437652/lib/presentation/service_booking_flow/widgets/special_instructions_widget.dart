import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../widgets/custom_icon_widget.dart';

class SpecialInstructionsWidget extends StatefulWidget {
  final String instructions;
  final Function(String) onInstructionsChanged;

  const SpecialInstructionsWidget({
    super.key,
    required this.instructions,
    required this.onInstructionsChanged,
  });

  @override
  State<SpecialInstructionsWidget> createState() =>
      _SpecialInstructionsWidgetState();
}

class _SpecialInstructionsWidgetState extends State<SpecialInstructionsWidget>
    with TickerProviderStateMixin {
  late TextEditingController _textController;
  late AnimationController _voiceController;
  late Animation<double> _voiceAnimation;

  bool _isRecording = false;
  bool _hasVoiceNote = false;
  int _characterCount = 0;
  final int _maxCharacters = 500;

  final List<String> _quickSuggestions = [
    'Please remove shoes before entering',
    'Pet-friendly cleaning products only',
    'Focus on high-traffic areas',
    'Fragile items in living room',
    'Use side entrance',
    'Allergic to strong scents',
  ];

  @override
  void initState() {
    super.initState();
    _textController = TextEditingController(text: widget.instructions);
    _characterCount = widget.instructions.length;

    _voiceController = AnimationController(
      duration: const Duration(milliseconds: 1000),
      vsync: this,
    );
    _voiceAnimation = Tween<double>(
      begin: 1.0,
      end: 1.2,
    ).animate(CurvedAnimation(
      parent: _voiceController,
      curve: Curves.easeInOut,
    ));

    _textController.addListener(() {
      setState(() {
        _characterCount = _textController.text.length;
      });
      widget.onInstructionsChanged(_textController.text);
    });
  }

  @override
  void dispose() {
    _textController.dispose();
    _voiceController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Container(
      padding: EdgeInsets.all(4.w),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Special Instructions',
            style: theme.textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.w700,
            ),
          ),
          SizedBox(height: 1.h),
          Text(
            'Let your service provider know about any specific requirements or preferences',
            style: theme.textTheme.bodySmall?.copyWith(
              color: colorScheme.onSurfaceVariant,
            ),
          ),
          SizedBox(height: 2.h),
          _buildTextInput(theme, colorScheme),
          SizedBox(height: 2.h),
          _buildVoiceNote(theme, colorScheme),
          SizedBox(height: 2.h),
          _buildQuickSuggestions(theme, colorScheme),
        ],
      ),
    );
  }

  Widget _buildTextInput(ThemeData theme, ColorScheme colorScheme) {
    return Container(
      decoration: BoxDecoration(
        color: colorScheme.surface,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: colorScheme.outline.withValues(alpha: 0.3),
        ),
      ),
      child: Column(
        children: [
          TextField(
            controller: _textController,
            maxLines: 4,
            maxLength: _maxCharacters,
            decoration: InputDecoration(
              hintText: 'Enter any special instructions or requirements...',
              hintStyle: theme.textTheme.bodyMedium?.copyWith(
                color: colorScheme.onSurfaceVariant,
              ),
              border: InputBorder.none,
              contentPadding: EdgeInsets.all(4.w),
              counterText: '',
            ),
            style: theme.textTheme.bodyMedium?.copyWith(
              color: colorScheme.onSurface,
            ),
          ),
          Container(
            padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.w),
            decoration: BoxDecoration(
              color: colorScheme.outline.withValues(alpha: 0.05),
              borderRadius: const BorderRadius.vertical(
                bottom: Radius.circular(12),
              ),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  '$_characterCount/$_maxCharacters characters',
                  style: theme.textTheme.labelSmall?.copyWith(
                    color: _characterCount > _maxCharacters * 0.8
                        ? colorScheme.error
                        : colorScheme.onSurfaceVariant,
                  ),
                ),
                if (_textController.text.isNotEmpty)
                  GestureDetector(
                    onTap: () {
                      _textController.clear();
                      widget.onInstructionsChanged('');
                    },
                    child: CustomIconWidget(
                      iconName: 'clear',
                      color: colorScheme.onSurfaceVariant,
                      size: 4.w,
                    ),
                  ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildVoiceNote(ThemeData theme, ColorScheme colorScheme) {
    return Container(
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: _hasVoiceNote
            ? colorScheme.secondary.withValues(alpha: 0.1)
            : colorScheme.surface,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: _hasVoiceNote
              ? colorScheme.secondary
              : colorScheme.outline.withValues(alpha: 0.3),
        ),
      ),
      child: Column(
        children: [
          Row(
            children: [
              AnimatedBuilder(
                animation: _voiceAnimation,
                builder: (context, child) {
                  return Transform.scale(
                    scale: _isRecording ? _voiceAnimation.value : 1.0,
                    child: GestureDetector(
                      onTap: _toggleRecording,
                      child: Container(
                        width: 12.w,
                        height: 12.w,
                        decoration: BoxDecoration(
                          color: _isRecording
                              ? colorScheme.error
                              : _hasVoiceNote
                                  ? colorScheme.secondary
                                  : colorScheme.primary,
                          shape: BoxShape.circle,
                        ),
                        child: CustomIconWidget(
                          iconName: _isRecording
                              ? 'stop'
                              : _hasVoiceNote
                                  ? 'play_arrow'
                                  : 'mic',
                          color: Colors.white,
                          size: 6.w,
                        ),
                      ),
                    ),
                  );
                },
              ),
              SizedBox(width: 4.w),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      _isRecording
                          ? 'Recording...'
                          : _hasVoiceNote
                              ? 'Voice note recorded'
                              : 'Add voice note',
                      style: theme.textTheme.titleSmall?.copyWith(
                        fontWeight: FontWeight.w600,
                        color: _isRecording
                            ? colorScheme.error
                            : _hasVoiceNote
                                ? colorScheme.secondary
                                : colorScheme.onSurface,
                      ),
                    ),
                    Text(
                      _isRecording
                          ? 'Tap to stop recording'
                          : _hasVoiceNote
                              ? 'Tap to play or re-record'
                              : 'Tap to record special instructions',
                      style: theme.textTheme.bodySmall?.copyWith(
                        color: colorScheme.onSurfaceVariant,
                      ),
                    ),
                  ],
                ),
              ),
              if (_hasVoiceNote)
                GestureDetector(
                  onTap: () {
                    setState(() {
                      _hasVoiceNote = false;
                    });
                  },
                  child: CustomIconWidget(
                    iconName: 'delete',
                    color: colorScheme.error,
                    size: 5.w,
                  ),
                ),
            ],
          ),
          if (_isRecording) ...[
            SizedBox(height: 2.h),
            Container(
              height: 0.5.h,
              decoration: BoxDecoration(
                color: colorScheme.outline.withValues(alpha: 0.2),
                borderRadius: BorderRadius.circular(4),
              ),
              child: LinearProgressIndicator(
                backgroundColor: Colors.transparent,
                valueColor: AlwaysStoppedAnimation<Color>(colorScheme.error),
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildQuickSuggestions(ThemeData theme, ColorScheme colorScheme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Quick Suggestions',
          style: theme.textTheme.titleSmall?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
        SizedBox(height: 1.h),
        Wrap(
          spacing: 2.w,
          runSpacing: 1.h,
          children: _quickSuggestions.map((suggestion) {
            return GestureDetector(
              onTap: () => _addSuggestion(suggestion),
              child: Container(
                padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
                decoration: BoxDecoration(
                  color: colorScheme.primary.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(
                    color: colorScheme.primary.withValues(alpha: 0.3),
                  ),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    CustomIconWidget(
                      iconName: 'add',
                      color: colorScheme.primary,
                      size: 3.w,
                    ),
                    SizedBox(width: 1.w),
                    Text(
                      suggestion,
                      style: theme.textTheme.labelSmall?.copyWith(
                        color: colorScheme.primary,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ],
                ),
              ),
            );
          }).toList(),
        ),
      ],
    );
  }

  void _toggleRecording() {
    setState(() {
      _isRecording = !_isRecording;
      if (_isRecording) {
        _voiceController.repeat(reverse: true);
      } else {
        _voiceController.stop();
        _hasVoiceNote = true;
      }
    });
  }

  void _addSuggestion(String suggestion) {
    final currentText = _textController.text;
    final newText =
        currentText.isEmpty ? suggestion : '$currentText\n$suggestion';

    if (newText.length <= _maxCharacters) {
      _textController.text = newText;
      _textController.selection = TextSelection.fromPosition(
        TextPosition(offset: newText.length),
      );
    }
  }
}
