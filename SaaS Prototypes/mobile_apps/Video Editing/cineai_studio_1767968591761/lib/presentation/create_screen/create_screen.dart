import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../widgets/custom_bottom_bar.dart';
import '../../widgets/custom_icon_widget.dart';
import './widgets/category_chip_widget.dart';
import './widgets/creation_card_widget.dart';
import './widgets/empty_state_widget.dart';
import './widgets/gradient_input_field_widget.dart';
import './widgets/recent_creation_item_widget.dart';

class CreateScreen extends StatefulWidget {
  const CreateScreen({super.key});

  @override
  State<CreateScreen> createState() => _CreateScreenState();
}

class _CreateScreenState extends State<CreateScreen> {
  final TextEditingController _descriptionController = TextEditingController();
  String _selectedCreationType = 'text';
  String _selectedCategory = 'Trending';
  bool _isGenerating = false;
  int _characterCount = 0;

  final List<Map<String, dynamic>> _recentCreations = [
    {
      "id": 1,
      "title": "Sunset Beach Waves",
      "thumbnail":
          "https://images.unsplash.com/photo-1636061212944-c5d23e552d19",
      "semanticLabel":
          "Aerial view of ocean waves crashing on sandy beach during golden sunset",
      "date": "12/22/2025",
      "duration": "15s",
    },
    {
      "id": 2,
      "title": "Cyberpunk City Night",
      "thumbnail":
          "https://img.rocket.new/generatedImages/rocket_gen_img_1785b17aa-1764640982556.png",
      "semanticLabel":
          "Futuristic neon-lit cityscape with tall buildings and flying vehicles at night",
      "date": "12/21/2025",
      "duration": "20s",
    },
    {
      "id": 3,
      "title": "Dancing in Rain",
      "thumbnail": "https://images.unsplash.com/photo-1561731081-76a8ab9c60a9",
      "semanticLabel":
          "Animated character joyfully dancing in the rain with colorful umbrella",
      "date": "12/20/2025",
      "duration": "10s",
    },
  ];

  @override
  void initState() {
    super.initState();
    SystemChrome.setSystemUIOverlayStyle(
      const SystemUiOverlayStyle(
        statusBarColor: Colors.transparent,
        statusBarIconBrightness: Brightness.dark,
        systemNavigationBarColor: Colors.transparent,
        systemNavigationBarIconBrightness: Brightness.dark,
      ),
    );
  }

  @override
  void dispose() {
    _descriptionController.dispose();
    super.dispose();
  }

  void _handleCreationTypeSelection(String type) {
    setState(() {
      _selectedCreationType = type;
    });

    if (type == 'image') {
      Fluttertoast.showToast(
        msg: "Image to Video selected. Upload an image to continue.",
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.BOTTOM,
      );
    }
  }

  void _handleCategorySelection(String category) {
    setState(() {
      _selectedCategory = category;
    });
  }

  void _handleGenerate() {
    if (_descriptionController.text.trim().isEmpty) {
      Fluttertoast.showToast(
        msg: "Please describe your video first",
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.BOTTOM,
      );
      return;
    }

    setState(() {
      _isGenerating = true;
    });

    Future.delayed(const Duration(seconds: 2), () {
      setState(() {
        _isGenerating = false;
      });

      Fluttertoast.showToast(
        msg: "Video generation started! Check your library.",
        toastLength: Toast.LENGTH_LONG,
        gravity: ToastGravity.BOTTOM,
      );

      Navigator.pushNamed(context, '/video-editor-screen');
    });
  }

  void _handleSamplePromptTap() {
    _descriptionController.text = "A serene sunset over ocean waves";
    setState(() {
      _characterCount = _descriptionController.text.length;
    });
  }

  void _handleCreationTap(Map<String, dynamic> creation) {
    Navigator.pushNamed(context, '/video-preview-screen');
  }

  void _handleCreationDelete(int id) {
    setState(() {
      _recentCreations.removeWhere((item) => item['id'] == id);
    });

    Fluttertoast.showToast(
      msg: "Creation deleted",
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
    );
  }

  void _handleCreationDuplicate(Map<String, dynamic> creation) {
    Fluttertoast.showToast(
      msg: "Creation duplicated",
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
    );
  }

  void _handleCreationShare(Map<String, dynamic> creation) {
    Fluttertoast.showToast(
      msg: "Share template feature coming soon",
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
    );
  }

  void _handleCreationFavorite(Map<String, dynamic> creation) {
    Fluttertoast.showToast(
      msg: "Added to favorites",
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        systemOverlayStyle: const SystemUiOverlayStyle(
          statusBarColor: Colors.transparent,
          statusBarIconBrightness: Brightness.dark,
        ),
        flexibleSpace: Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [
                theme.colorScheme.surface.withValues(alpha: 0.95),
                theme.colorScheme.surface.withValues(alpha: 0.85),
              ],
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
            ),
          ),
        ),
        centerTitle: false,
        titleSpacing: 4.w,
        title: Text(
          'CineAI Studio',
          style: theme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w600,
            color: theme.colorScheme.onSurface,
          ),
        ),
      ),
      body: RefreshIndicator(
        onRefresh: () async {
          await Future.delayed(const Duration(seconds: 1));
          Fluttertoast.showToast(
            msg: "Content refreshed",
            toastLength: Toast.LENGTH_SHORT,
            gravity: ToastGravity.BOTTOM,
          );
        },
        child: SingleChildScrollView(
          physics: const AlwaysScrollableScrollPhysics(),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(height: 12.h),
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 4.w),
                child: Text(
                  'Create Your Video',
                  style: theme.textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.w600,
                    color: theme.colorScheme.onSurface,
                  ),
                ),
              ),
              SizedBox(height: 1.h),
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 4.w),
                child: Text(
                  'Choose your creation method',
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: theme.colorScheme.onSurfaceVariant,
                  ),
                ),
              ),
              SizedBox(height: 2.h),
              CreationCardWidget(
                title: 'Text to Video',
                description: 'Generate videos from text descriptions',
                iconName: 'text_fields',
                isSelected: _selectedCreationType == 'text',
                onTap: () => _handleCreationTypeSelection('text'),
              ),
              CreationCardWidget(
                title: 'Image to Video',
                description: 'Transform images into animated videos',
                iconName: 'image',
                isSelected: _selectedCreationType == 'image',
                onTap: () => _handleCreationTypeSelection('image'),
              ),
              SizedBox(height: 3.h),
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 4.w),
                child: Text(
                  'Categories',
                  style: theme.textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w600,
                    color: theme.colorScheme.onSurface,
                  ),
                ),
              ),
              SizedBox(height: 1.5.h),
              SizedBox(
                height: 5.h,
                child: ListView(
                  scrollDirection: Axis.horizontal,
                  padding: EdgeInsets.symmetric(horizontal: 4.w),
                  children: [
                    CategoryChipWidget(
                      label: 'Trending',
                      isSelected: _selectedCategory == 'Trending',
                      onTap: () => _handleCategorySelection('Trending'),
                    ),
                    CategoryChipWidget(
                      label: 'Animation',
                      isSelected: _selectedCategory == 'Animation',
                      onTap: () => _handleCategorySelection('Animation'),
                    ),
                    CategoryChipWidget(
                      label: 'Cinematic',
                      isSelected: _selectedCategory == 'Cinematic',
                      onTap: () => _handleCategorySelection('Cinematic'),
                    ),
                  ],
                ),
              ),
              SizedBox(height: 3.h),
              GradientInputFieldWidget(
                controller: _descriptionController,
                hintText: 'Describe your video...',
                maxLength: 500,
                onChanged: (value) {
                  setState(() {
                    _characterCount = value.length;
                  });
                },
              ),
              SizedBox(height: 2.h),
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 4.w),
                child: SizedBox(
                  width: double.infinity,
                  height: 7.h,
                  child: ElevatedButton(
                    onPressed: _isGenerating ? null : _handleGenerate,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: theme.colorScheme.primary,
                      foregroundColor: theme.colorScheme.onPrimary,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                      elevation: 4,
                    ),
                    child: _isGenerating
                        ? Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              SizedBox(
                                width: 20,
                                height: 20,
                                child: CircularProgressIndicator(
                                  strokeWidth: 2,
                                  valueColor: AlwaysStoppedAnimation<Color>(
                                    theme.colorScheme.onPrimary,
                                  ),
                                ),
                              ),
                              SizedBox(width: 3.w),
                              Text(
                                'Generating...',
                                style: theme.textTheme.titleMedium?.copyWith(
                                  color: theme.colorScheme.onPrimary,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ],
                          )
                        : Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              CustomIconWidget(
                                iconName: 'auto_awesome',
                                color: theme.colorScheme.onPrimary,
                                size: 24,
                              ),
                              SizedBox(width: 2.w),
                              Text(
                                'Generate Video',
                                style: theme.textTheme.titleMedium?.copyWith(
                                  color: theme.colorScheme.onPrimary,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ],
                          ),
                  ),
                ),
              ),
              SizedBox(height: 4.h),
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 4.w),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'Recent Creations',
                      style: theme.textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w600,
                        color: theme.colorScheme.onSurface,
                      ),
                    ),
                    if (_recentCreations.isNotEmpty)
                      TextButton(
                        onPressed: () {
                          Navigator.pushNamed(context, '/library-screen');
                        },
                        child: Text(
                          'View All',
                          style: theme.textTheme.bodyMedium?.copyWith(
                            color: theme.colorScheme.primary,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                  ],
                ),
              ),
              SizedBox(height: 1.h),
              _recentCreations.isEmpty
                  ? EmptyStateWidget(onSamplePromptTap: _handleSamplePromptTap)
                  : ListView.builder(
                      shrinkWrap: true,
                      physics: const NeverScrollableScrollPhysics(),
                      itemCount: _recentCreations.length,
                      itemBuilder: (context, index) {
                        final creation = _recentCreations[index];
                        return RecentCreationItemWidget(
                          creation: creation,
                          onTap: () => _handleCreationTap(creation),
                          onDelete: () =>
                              _handleCreationDelete(creation['id'] as int),
                          onDuplicate: () => _handleCreationDuplicate(creation),
                          onShare: () => _handleCreationShare(creation),
                          onFavorite: () => _handleCreationFavorite(creation),
                        );
                      },
                    ),
              SizedBox(height: 10.h),
            ],
          ),
        ),
      ),
      bottomNavigationBar: CustomBottomBar(
        selectedItem: CustomBottomBarItem.create,
        onItemSelected: (item) {
          // Navigation handled by CustomBottomBar internally
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.pushNamed(context, '/effects-library-screen');
        },
        backgroundColor: theme.colorScheme.secondary,
        child: CustomIconWidget(
          iconName: 'auto_fix_high',
          color: theme.colorScheme.onSecondary,
          size: 28,
        ),
      ),
    );
  }
}
