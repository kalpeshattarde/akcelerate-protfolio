import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../../core/app_export.dart';

class ImageAssociationWidget extends StatefulWidget {
  final List<Map<String, dynamic>> imageWords;
  final List<Map<String, dynamic>> wordOptions;
  final Function(String, String) onMatch;
  final bool showResult;
  final Map<String, String> userMatches;

  const ImageAssociationWidget({
    Key? key,
    required this.imageWords,
    required this.wordOptions,
    required this.onMatch,
    this.showResult = false,
    required this.userMatches,
  }) : super(key: key);

  @override
  State<ImageAssociationWidget> createState() => _ImageAssociationWidgetState();
}

class _ImageAssociationWidgetState extends State<ImageAssociationWidget>
    with TickerProviderStateMixin {
  String? _draggedWord;
  String? _hoveredImage;
  late AnimationController _shakeController;
  late Animation<double> _shakeAnimation;

  @override
  void initState() {
    super.initState();
    _shakeController = AnimationController(
      duration: const Duration(milliseconds: 500),
      vsync: this,
    );
    _shakeAnimation = Tween<double>(begin: 0, end: 10).animate(
      CurvedAnimation(parent: _shakeController, curve: Curves.elasticIn),
    );
  }

  @override
  void dispose() {
    _shakeController.dispose();
    super.dispose();
  }

  void _triggerShakeAnimation() {
    _shakeController.forward().then((_) {
      _shakeController.reverse();
    });
  }

  bool _isCorrectMatch(String imageId, String word) {
    final imageData = widget.imageWords.firstWhere(
      (item) => (item['id'] as String) == imageId,
      orElse: () => {},
    );
    return (imageData['correctWord'] as String?) == word;
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _shakeAnimation,
      builder: (context, child) {
        return Transform.translate(
          offset: Offset(_shakeAnimation.value, 0),
          child: Column(
            children: [
              Container(
                width: double.infinity,
                padding: EdgeInsets.all(4.w),
                margin: EdgeInsets.symmetric(horizontal: 4.w),
                decoration: BoxDecoration(
                  color: AppTheme.lightTheme.colorScheme.surface,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(
                    color: AppTheme.lightTheme.colorScheme.outline,
                    width: 1,
                  ),
                ),
                child: Text(
                  'Drag words to match with images',
                  style: AppTheme.lightTheme.textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                  textAlign: TextAlign.center,
                ),
              ),
              SizedBox(height: 3.h),
              // Images Section
              Container(
                height: 30.h,
                child: GridView.builder(
                  padding: EdgeInsets.symmetric(horizontal: 4.w),
                  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2,
                    crossAxisSpacing: 3.w,
                    mainAxisSpacing: 2.h,
                    childAspectRatio: 1.2,
                  ),
                  itemCount: widget.imageWords.length,
                  itemBuilder: (context, index) {
                    final imageData = widget.imageWords[index];
                    final imageId = imageData['id'] as String;
                    final imageUrl = imageData['imageUrl'] as String;
                    final matchedWord = widget.userMatches[imageId];
                    final isHovered = _hoveredImage == imageId;
                    final isCorrect = widget.showResult &&
                        matchedWord != null &&
                        _isCorrectMatch(imageId, matchedWord);
                    final isWrong = widget.showResult &&
                        matchedWord != null &&
                        !_isCorrectMatch(imageId, matchedWord);

                    return DragTarget<String>(
                      onWillAcceptWithDetails: (data) {
                        setState(() {
                          _hoveredImage = imageId;
                        });
                        return !widget.showResult;
                      },
                      onLeave: (data) {
                        setState(() {
                          _hoveredImage = null;
                        });
                      },
                      onAcceptWithDetails: (details) {
                        setState(() {
                          _hoveredImage = null;
                        });
                        widget.onMatch(imageId, details.data);
                        if (!_isCorrectMatch(imageId, details.data)) {
                          _triggerShakeAnimation();
                        }
                      },
                      builder: (context, candidateData, rejectedData) {
                        return AnimatedContainer(
                          duration: const Duration(milliseconds: 300),
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(
                              color: isHovered
                                  ? AppTheme.lightTheme.colorScheme.primary
                                  : (isCorrect
                                      ? AppTheme.lightTheme.colorScheme.primary
                                      : (isWrong
                                          ? AppTheme
                                              .lightTheme.colorScheme.error
                                          : AppTheme
                                              .lightTheme.colorScheme.outline)),
                              width: isHovered ? 3 : 2,
                            ),
                            color: isHovered
                                ? AppTheme.lightTheme.colorScheme.primary
                                    .withValues(alpha: 0.1)
                                : (isCorrect
                                    ? AppTheme.lightTheme.colorScheme.primary
                                        .withValues(alpha: 0.1)
                                    : (isWrong
                                        ? AppTheme.lightTheme.colorScheme.error
                                            .withValues(alpha: 0.1)
                                        : AppTheme
                                            .lightTheme.colorScheme.surface)),
                          ),
                          child: Column(
                            children: [
                              Expanded(
                                child: ClipRRect(
                                  borderRadius: const BorderRadius.vertical(
                                      top: Radius.circular(10)),
                                  child: CustomImageWidget(
                                    imageUrl: imageUrl,
                                    width: double.infinity,
                                    height: double.infinity,
                                    fit: BoxFit.cover,
                                  ),
                                ),
                              ),
                              Container(
                                width: double.infinity,
                                padding: EdgeInsets.all(2.w),
                                decoration: BoxDecoration(
                                  color: matchedWord != null
                                      ? (isCorrect
                                          ? AppTheme
                                              .lightTheme.colorScheme.primary
                                              .withValues(alpha: 0.1)
                                          : (isWrong
                                              ? AppTheme
                                                  .lightTheme.colorScheme.error
                                                  .withValues(alpha: 0.1)
                                              : AppTheme.lightTheme.colorScheme
                                                  .outline
                                                  .withValues(alpha: 0.1)))
                                      : AppTheme.lightTheme.colorScheme.outline
                                          .withValues(alpha: 0.1),
                                  borderRadius: const BorderRadius.vertical(
                                      bottom: Radius.circular(10)),
                                ),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    if (matchedWord != null) ...[
                                      Expanded(
                                        child: Text(
                                          matchedWord,
                                          style: AppTheme
                                              .lightTheme.textTheme.bodyMedium
                                              ?.copyWith(
                                            color: isCorrect
                                                ? AppTheme.lightTheme
                                                    .colorScheme.primary
                                                : (isWrong
                                                    ? AppTheme.lightTheme
                                                        .colorScheme.error
                                                    : AppTheme.lightTheme
                                                        .colorScheme.onSurface),
                                            fontWeight: FontWeight.w600,
                                          ),
                                          textAlign: TextAlign.center,
                                        ),
                                      ),
                                      if (widget.showResult) ...[
                                        SizedBox(width: 1.w),
                                        CustomIconWidget(
                                          iconName: isCorrect
                                              ? 'check_circle'
                                              : 'cancel',
                                          color: isCorrect
                                              ? AppTheme.lightTheme.colorScheme
                                                  .primary
                                              : AppTheme
                                                  .lightTheme.colorScheme.error,
                                          size: 16,
                                        ),
                                      ],
                                    ] else ...[
                                      Text(
                                        'Drop here',
                                        style: AppTheme
                                            .lightTheme.textTheme.bodySmall
                                            ?.copyWith(
                                          color: AppTheme.lightTheme.colorScheme
                                              .onSurfaceVariant,
                                          fontStyle: FontStyle.italic,
                                        ),
                                      ),
                                    ],
                                  ],
                                ),
                              ),
                            ],
                          ),
                        );
                      },
                    );
                  },
                ),
              ),
              SizedBox(height: 3.h),
              // Words Section
              Container(
                padding: EdgeInsets.symmetric(horizontal: 4.w),
                child: Text(
                  'Available Words:',
                  style: AppTheme.lightTheme.textTheme.titleSmall?.copyWith(
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
              SizedBox(height: 1.h),
              Container(
                height: 12.h,
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  padding: EdgeInsets.symmetric(horizontal: 4.w),
                  itemCount: widget.wordOptions.length,
                  itemBuilder: (context, index) {
                    final wordData = widget.wordOptions[index];
                    final word = wordData['word'] as String;
                    final isUsed = widget.userMatches.containsValue(word);

                    if (widget.showResult && isUsed) {
                      return const SizedBox.shrink();
                    }

                    return Container(
                      margin: EdgeInsets.only(right: 3.w),
                      child: Draggable<String>(
                        data: word,
                        onDragStarted: () {
                          setState(() {
                            _draggedWord = word;
                          });
                        },
                        onDragEnd: (details) {
                          setState(() {
                            _draggedWord = null;
                          });
                        },
                        feedback: Material(
                          elevation: 8,
                          borderRadius: BorderRadius.circular(20),
                          child: Container(
                            padding: EdgeInsets.symmetric(
                                horizontal: 4.w, vertical: 2.h),
                            decoration: BoxDecoration(
                              color: AppTheme.lightTheme.colorScheme.primary,
                              borderRadius: BorderRadius.circular(20),
                            ),
                            child: Text(
                              word,
                              style: AppTheme.lightTheme.textTheme.bodyMedium
                                  ?.copyWith(
                                color: Colors.white,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ),
                        ),
                        childWhenDragging: Container(
                          padding: EdgeInsets.symmetric(
                              horizontal: 4.w, vertical: 2.h),
                          decoration: BoxDecoration(
                            color: AppTheme.lightTheme.colorScheme.outline
                                .withValues(alpha: 0.3),
                            borderRadius: BorderRadius.circular(20),
                            border: Border.all(
                              color: AppTheme.lightTheme.colorScheme.outline,
                              width: 1,
                            ),
                          ),
                          child: Text(
                            word,
                            style: AppTheme.lightTheme.textTheme.bodyMedium
                                ?.copyWith(
                              color: AppTheme
                                  .lightTheme.colorScheme.onSurfaceVariant
                                  .withValues(alpha: 0.5),
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ),
                        child: AnimatedContainer(
                          duration: const Duration(milliseconds: 200),
                          padding: EdgeInsets.symmetric(
                              horizontal: 4.w, vertical: 2.h),
                          decoration: BoxDecoration(
                            color: isUsed
                                ? AppTheme.lightTheme.colorScheme.outline
                                    .withValues(alpha: 0.1)
                                : AppTheme.lightTheme.colorScheme.surface,
                            borderRadius: BorderRadius.circular(20),
                            border: Border.all(
                              color: isUsed
                                  ? AppTheme.lightTheme.colorScheme.outline
                                      .withValues(alpha: 0.5)
                                  : AppTheme.lightTheme.colorScheme.primary,
                              width: 1,
                            ),
                          ),
                          child: Text(
                            word,
                            style: AppTheme.lightTheme.textTheme.bodyMedium
                                ?.copyWith(
                              color: isUsed
                                  ? AppTheme
                                      .lightTheme.colorScheme.onSurfaceVariant
                                      .withValues(alpha: 0.5)
                                  : AppTheme.lightTheme.colorScheme.primary,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                      ),
                    );
                  },
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}