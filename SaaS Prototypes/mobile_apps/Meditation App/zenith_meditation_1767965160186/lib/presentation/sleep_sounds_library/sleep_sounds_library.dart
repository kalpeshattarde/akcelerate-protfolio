import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../theme/app_theme.dart';
import '../../widgets/custom_icon_widget.dart';
import './widgets/sleep_timer_bottom_sheet.dart';
import './widgets/sound_card.dart';
import './widgets/sound_category_chip.dart';
import './widgets/sound_mixer_bottom_sheet.dart';
import './widgets/sound_mixer_fab.dart';

class SleepSoundsLibrary extends StatefulWidget {
  const SleepSoundsLibrary({Key? key}) : super(key: key);

  @override
  State<SleepSoundsLibrary> createState() => _SleepSoundsLibraryState();
}

class _SleepSoundsLibraryState extends State<SleepSoundsLibrary>
    with TickerProviderStateMixin {
  late TabController _tabController;
  final TextEditingController _searchController = TextEditingController();

  String selectedCategory = 'All';
  String? currentlyPlayingId;
  Set<String> downloadedSounds = {'1', '3', '5'};
  Set<String> favoriteSounds = {'2', '4', '6'};
  bool isRefreshing = false;

  final List<String> categories = [
    'All',
    'Nature',
    'White Noise',
    'Binaural',
    'ASMR',
  ];

  final List<Map<String, dynamic>> sleepSounds = [
    {
      "id": "1",
      "name": "Ocean Waves",
      "category": "Nature",
      "duration": "8 hours",
      "size": "45.2 MB",
      "image": "https://images.unsplash.com/photo-1725783496558-2da3f660b616",
      "semanticLabel":
          "Peaceful ocean waves crashing on a sandy beach with foam and blue water under a clear sky",
    },
    {
      "id": "2",
      "name": "Rain Forest",
      "category": "Nature",
      "duration": "6 hours",
      "size": "32.8 MB",
      "image": "https://images.unsplash.com/photo-1728050448090-2ee0000c7520",
      "semanticLabel":
          "Lush green rainforest with tall trees, dense foliage, and misty atmosphere with filtered sunlight",
    },
    {
      "id": "3",
      "name": "White Noise",
      "category": "White Noise",
      "duration": "10 hours",
      "size": "28.5 MB",
      "image": "https://images.unsplash.com/photo-1703600091728-8d0a2bf13396",
      "semanticLabel":
          "Abstract white noise visualization with flowing wave patterns in grayscale tones",
    },
    {
      "id": "4",
      "name": "Campfire Crackling",
      "category": "Nature",
      "duration": "4 hours",
      "size": "22.1 MB",
      "image": "https://images.unsplash.com/photo-1615903916703-3a05ba30eb11",
      "semanticLabel":
          "Warm campfire with bright orange flames and glowing embers against a dark background",
    },
    {
      "id": "5",
      "name": "Binaural Beats",
      "category": "Binaural",
      "duration": "2 hours",
      "size": "15.7 MB",
      "image": "https://images.unsplash.com/photo-1658874379930-13ab23191da6",
      "semanticLabel":
          "Person wearing black headphones with closed eyes in a peaceful meditative state",
    },
    {
      "id": "6",
      "name": "Gentle Whispers",
      "category": "ASMR",
      "duration": "3 hours",
      "size": "18.9 MB",
      "image": "https://images.unsplash.com/photo-1542536225-19eb98e66721",
      "semanticLabel":
          "Close-up of a woman's lips near a microphone in soft lighting for ASMR recording",
    },
    {
      "id": "7",
      "name": "Mountain Stream",
      "category": "Nature",
      "duration": "5 hours",
      "size": "27.3 MB",
      "image": "https://images.unsplash.com/photo-1718554800923-6bf5bda703cb",
      "semanticLabel":
          "Clear mountain stream flowing over rocks with moss and green vegetation along the banks",
    },
    {
      "id": "8",
      "name": "Pink Noise",
      "category": "White Noise",
      "duration": "8 hours",
      "size": "35.4 MB",
      "image": "https://images.unsplash.com/photo-1693408714642-a5dc17ff70e9",
      "semanticLabel":
          "Abstract pink and purple gradient waves representing pink noise frequency patterns",
    },
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this, initialIndex: 1);
  }

  @override
  void dispose() {
    _tabController.dispose();
    _searchController.dispose();
    super.dispose();
  }

  List<Map<String, dynamic>> get filteredSounds {
    List<Map<String, dynamic>> filtered = sleepSounds;

    // Filter by category
    if (selectedCategory != 'All') {
      filtered =
          filtered
              .where((sound) => sound['category'] == selectedCategory)
              .toList();
    }

    // Filter by search query
    if (_searchController.text.isNotEmpty) {
      final query = _searchController.text.toLowerCase();
      filtered =
          filtered
              .where(
                (sound) =>
                    (sound['name'] as String).toLowerCase().contains(query) ||
                    (sound['category'] as String).toLowerCase().contains(query),
              )
              .toList();
    }

    return filtered;
  }

  Future<void> _refreshContent() async {
    setState(() => isRefreshing = true);

    // Simulate network refresh
    await Future.delayed(const Duration(seconds: 2));

    setState(() => isRefreshing = false);

    Fluttertoast.showToast(
      msg: "Library updated with new content",
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
    );
  }

  void _playSound(String soundId) {
    setState(() {
      if (currentlyPlayingId == soundId) {
        currentlyPlayingId = null;
      } else {
        currentlyPlayingId = soundId;
      }
    });

    final sound = sleepSounds.firstWhere((s) => s['id'] == soundId);
    Fluttertoast.showToast(
      msg:
          currentlyPlayingId == soundId
              ? "Playing ${sound['name']}"
              : "Stopped playback",
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
    );
  }

  void _downloadSound(String soundId) {
    setState(() {
      if (downloadedSounds.contains(soundId)) {
        downloadedSounds.remove(soundId);
      } else {
        downloadedSounds.add(soundId);
      }
    });

    final sound = sleepSounds.firstWhere((s) => s['id'] == soundId);
    Fluttertoast.showToast(
      msg:
          downloadedSounds.contains(soundId)
              ? "Downloaded ${sound['name']}"
              : "Removed ${sound['name']} from downloads",
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
    );
  }

  void _toggleFavorite(String soundId) {
    setState(() {
      if (favoriteSounds.contains(soundId)) {
        favoriteSounds.remove(soundId);
      } else {
        favoriteSounds.add(soundId);
      }
    });

    final sound = sleepSounds.firstWhere((s) => s['id'] == soundId);
    Fluttertoast.showToast(
      msg:
          favoriteSounds.contains(soundId)
              ? "Added ${sound['name']} to favorites"
              : "Removed ${sound['name']} from favorites",
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
    );
  }

  void _shareSound(String soundId) {
    final sound = sleepSounds.firstWhere((s) => s['id'] == soundId);
    Fluttertoast.showToast(
      msg: "Sharing ${sound['name']}",
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
    );
  }

  void _showSleepTimer() {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      isScrollControlled: true,
      builder:
          (context) => SleepTimerBottomSheet(
            onTimerSet: (minutes, fadeOut) {
              Fluttertoast.showToast(
                msg:
                    "Sleep timer set for ${minutes} minutes${fadeOut ? ' with fade out' : ''}",
                toastLength: Toast.LENGTH_SHORT,
                gravity: ToastGravity.BOTTOM,
              );
            },
          ),
    );
  }

  void _showSoundMixer() {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      isScrollControlled: true,
      builder: (context) => SoundMixerBottomSheet(availableSounds: sleepSounds),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      body: SafeArea(
        child: Column(
          children: [
            // App Bar
            Container(
              padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.colorScheme.surface,
                boxShadow: [
                  BoxShadow(
                    color: AppTheme.lightTheme.colorScheme.shadow,
                    blurRadius: 4,
                    offset: const Offset(0, 2),
                  ),
                ],
              ),
              child: Column(
                children: [
                  // Header with navigation
                  Row(
                    children: [
                      IconButton(
                        onPressed: () => Navigator.pop(context),
                        icon: CustomIconWidget(
                          iconName: 'arrow_back',
                          color: AppTheme.lightTheme.colorScheme.onSurface,
                          size: 24,
                        ),
                      ),
                      Expanded(
                        child: Text(
                          'Sleep Sounds Library',
                          style: AppTheme.lightTheme.textTheme.headlineSmall,
                          textAlign: TextAlign.center,
                        ),
                      ),
                      IconButton(
                        onPressed: _showSleepTimer,
                        icon: CustomIconWidget(
                          iconName: 'timer',
                          color: AppTheme.lightTheme.colorScheme.secondary,
                          size: 24,
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 2.h),
                  // Tab Bar
                  TabBar(
                    controller: _tabController,
                    isScrollable: true,
                    tabAlignment: TabAlignment.center,
                    labelPadding: EdgeInsets.symmetric(horizontal: 4.w),
                    tabs: const [
                      Tab(text: 'Meditation'),
                      Tab(text: 'Sleep Sounds'),
                      Tab(text: 'Focus'),
                    ],
                  ),
                ],
              ),
            ),
            // Search Bar
            Container(
              padding: EdgeInsets.all(4.w),
              child: TextField(
                controller: _searchController,
                onChanged: (value) => setState(() {}),
                decoration: InputDecoration(
                  hintText: 'Search sounds or moods...',
                  prefixIcon: Padding(
                    padding: EdgeInsets.all(3.w),
                    child: CustomIconWidget(
                      iconName: 'search',
                      color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                      size: 20,
                    ),
                  ),
                  suffixIcon:
                      _searchController.text.isNotEmpty
                          ? IconButton(
                            onPressed: () {
                              _searchController.clear();
                              setState(() {});
                            },
                            icon: CustomIconWidget(
                              iconName: 'clear',
                              color:
                                  AppTheme
                                      .lightTheme
                                      .colorScheme
                                      .onSurfaceVariant,
                              size: 20,
                            ),
                          )
                          : Padding(
                            padding: EdgeInsets.all(3.w),
                            child: CustomIconWidget(
                              iconName: 'mic',
                              color: AppTheme.lightTheme.colorScheme.secondary,
                              size: 20,
                            ),
                          ),
                ),
              ),
            ),
            // Category Chips
            Container(
              height: 6.h,
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                padding: EdgeInsets.symmetric(horizontal: 4.w),
                itemCount: categories.length,
                itemBuilder: (context, index) {
                  final category = categories[index];
                  return SoundCategoryChip(
                    category: category,
                    isSelected: selectedCategory == category,
                    onTap: () => setState(() => selectedCategory = category),
                  );
                },
              ),
            ),
            SizedBox(height: 2.h),
            // Content
            Expanded(
              child: TabBarView(
                controller: _tabController,
                children: [
                  // Meditation Tab (placeholder)
                  Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        CustomIconWidget(
                          iconName: 'self_improvement',
                          color: AppTheme.lightTheme.colorScheme.secondary,
                          size: 64,
                        ),
                        SizedBox(height: 2.h),
                        Text(
                          'Meditation Content',
                          style: AppTheme.lightTheme.textTheme.headlineSmall,
                        ),
                        SizedBox(height: 1.h),
                        Text(
                          'Coming Soon',
                          style: AppTheme.lightTheme.textTheme.bodyMedium,
                        ),
                      ],
                    ),
                  ),
                  // Sleep Sounds Tab (main content)
                  RefreshIndicator(
                    onRefresh: _refreshContent,
                    color: AppTheme.lightTheme.colorScheme.secondary,
                    child:
                        filteredSounds.isEmpty
                            ? Center(
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  CustomIconWidget(
                                    iconName: 'cloud_download',
                                    color:
                                        AppTheme
                                            .lightTheme
                                            .colorScheme
                                            .onSurfaceVariant,
                                    size: 64,
                                  ),
                                  SizedBox(height: 2.h),
                                  Text(
                                    'No sounds found',
                                    style:
                                        AppTheme
                                            .lightTheme
                                            .textTheme
                                            .headlineSmall,
                                  ),
                                  SizedBox(height: 1.h),
                                  Text(
                                    'Try adjusting your search or download content for offline use',
                                    style:
                                        AppTheme
                                            .lightTheme
                                            .textTheme
                                            .bodyMedium,
                                    textAlign: TextAlign.center,
                                  ),
                                  SizedBox(height: 3.h),
                                  ElevatedButton(
                                    onPressed: _refreshContent,
                                    child: Text('Refresh Library'),
                                  ),
                                ],
                              ),
                            )
                            : GridView.builder(
                              padding: EdgeInsets.symmetric(horizontal: 4.w),
                              gridDelegate:
                                  SliverGridDelegateWithFixedCrossAxisCount(
                                    crossAxisCount: 2,
                                    childAspectRatio: 0.75,
                                    crossAxisSpacing: 2.w,
                                    mainAxisSpacing: 1.h,
                                  ),
                              itemCount: filteredSounds.length,
                              itemBuilder: (context, index) {
                                final sound = filteredSounds[index];
                                final soundId = sound['id'] as String;

                                return SoundCard(
                                  soundData: sound,
                                  isPlaying: currentlyPlayingId == soundId,
                                  isDownloaded: downloadedSounds.contains(
                                    soundId,
                                  ),
                                  isFavorite: favoriteSounds.contains(soundId),
                                  onTap: () => _playSound(soundId),
                                  onDownload: () => _downloadSound(soundId),
                                  onFavorite: () => _toggleFavorite(soundId),
                                  onShare: () => _shareSound(soundId),
                                );
                              },
                            ),
                  ),
                  // Focus Tab (placeholder)
                  Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        CustomIconWidget(
                          iconName: 'psychology',
                          color: AppTheme.lightTheme.colorScheme.secondary,
                          size: 64,
                        ),
                        SizedBox(height: 2.h),
                        Text(
                          'Focus Sounds',
                          style: AppTheme.lightTheme.textTheme.headlineSmall,
                        ),
                        SizedBox(height: 1.h),
                        Text(
                          'Coming Soon',
                          style: AppTheme.lightTheme.textTheme.bodyMedium,
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
      floatingActionButton:
          _tabController.index == 1
              ? SoundMixerFab(onPressed: _showSoundMixer)
              : null,
    );
  }
}
