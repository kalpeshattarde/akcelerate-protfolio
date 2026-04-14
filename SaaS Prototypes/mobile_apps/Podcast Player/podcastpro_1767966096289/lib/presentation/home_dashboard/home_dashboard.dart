import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import '../../services/mini_player_service.dart';
import './widgets/featured_carousel_widget.dart';
import './widgets/podcast_card_widget.dart';
import './widgets/section_header_widget.dart';
import './widgets/trending_card_widget.dart';

class HomeDashboard extends StatefulWidget {
  const HomeDashboard({Key? key}) : super(key: key);

  @override
  State<HomeDashboard> createState() => _HomeDashboardState();
}

class _HomeDashboardState extends State<HomeDashboard>
    with TickerProviderStateMixin {
  late ScrollController _scrollController;
  late AnimationController _headerAnimationController;
  late Animation<double> _headerOpacityAnimation;
  final MiniPlayerService _miniPlayerService = MiniPlayerService();

  int _currentBottomNavIndex = 0;

  // Mock data
  final List<Map<String, dynamic>> _featuredPodcasts = [
    {
      "id": 1,
      "title": "The Future of AI and Machine Learning",
      "author": "Tech Insights",
      "artwork":
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
      "episodes": 45,
      "description":
          "Exploring the cutting-edge developments in artificial intelligence and their impact on society.",
    },
    {
      "id": 2,
      "title": "Mindful Living in a Digital Age",
      "author": "Wellness Weekly",
      "artwork":
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
      "episodes": 32,
      "description":
          "Finding balance and mindfulness in our increasingly connected world.",
    },
    {
      "id": 3,
      "title": "Startup Stories: From Idea to IPO",
      "author": "Business Chronicles",
      "artwork":
          "https://images.unsplash.com/photo-1559136555-9303baea8ebd?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
      "episodes": 28,
      "description":
          "Real stories from entrepreneurs who built successful companies from the ground up.",
    },
  ];

  final List<Map<String, dynamic>> _continueListening = [
    {
      "id": 4,
      "title": "Climate Change Solutions",
      "author": "Green Planet",
      "artwork":
          "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
      "duration": "42 min",
      "progress": 0.65,
    },
    {
      "id": 5,
      "title": "The Art of Storytelling",
      "author": "Creative Minds",
      "artwork":
          "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
      "duration": "38 min",
      "progress": 0.23,
    },
    {
      "id": 6,
      "title": "Space Exploration Today",
      "author": "Cosmic Journey",
      "artwork":
          "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
      "duration": "51 min",
      "progress": 0.89,
    },
  ];

  final List<Map<String, dynamic>> _trendingPodcasts = [
    {
      "id": 7,
      "title": "Cryptocurrency Revolution",
      "author": "Digital Finance",
      "artwork":
          "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
      "listeners": "2.5M",
    },
    {
      "id": 8,
      "title": "Mental Health Matters",
      "author": "Wellness Hub",
      "artwork":
          "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
      "listeners": "1.8M",
    },
    {
      "id": 9,
      "title": "The Science of Cooking",
      "author": "Culinary Lab",
      "artwork":
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
      "listeners": "1.2M",
    },
  ];

  final List<Map<String, dynamic>> _recommendedPodcasts = [
    {
      "id": 10,
      "title": "History Uncovered",
      "author": "Time Travelers",
      "artwork":
          "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
      "duration": "45 min",
    },
    {
      "id": 11,
      "title": "Photography Masterclass",
      "author": "Visual Arts",
      "artwork":
          "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
      "duration": "33 min",
    },
    {
      "id": 12,
      "title": "Music Production Secrets",
      "author": "Sound Studio",
      "artwork":
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3",
      "duration": "52 min",
    },
  ];

  @override
  void initState() {
    super.initState();
    _scrollController = ScrollController();
    _headerAnimationController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );
    _headerOpacityAnimation = Tween<double>(
      begin: 1.0,
      end: 0.0,
    ).animate(CurvedAnimation(
      parent: _headerAnimationController,
      curve: Curves.easeInOut,
    ));

    _scrollController.addListener(_onScroll);
  }

  @override
  void dispose() {
    _scrollController.dispose();
    _headerAnimationController.dispose();
    super.dispose();
  }

  void _onScroll() {
    final offset = _scrollController.offset;
    final maxOffset = 100.0;
    final progress = (offset / maxOffset).clamp(0.0, 1.0);
    _headerAnimationController.value = progress;
  }

  void _onBottomNavTap(int index) {
    setState(() {
      _currentBottomNavIndex = index;
    });

    switch (index) {
      case 0:
        // Already on home
        break;
      case 1:
        Navigator.pushNamed(context, '/search-and-discovery');
        break;
      case 2:
        Navigator.pushNamed(context, '/downloads-and-library');
        break;
      case 3:
        Navigator.pushNamed(context, '/profile-screen');
        break;
    }
  }

  void _onPodcastTap(Map<String, dynamic> podcast) {
    Navigator.pushNamed(context, '/podcast-detail-screen');
  }

  void _onPodcastLongPress(Map<String, dynamic> podcast) {
    _showPodcastOptions(podcast);
  }

  void _showPodcastOptions(Map<String, dynamic> podcast) {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (context) => Container(
        decoration: BoxDecoration(
          color: AppTheme.lightTheme.colorScheme.surface,
          borderRadius: const BorderRadius.only(
            topLeft: Radius.circular(20),
            topRight: Radius.circular(20),
          ),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 40,
              height: 4,
              margin: const EdgeInsets.only(top: 12),
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.colorScheme.onSurfaceVariant
                    .withValues(alpha: 0.3),
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            Padding(
              padding: EdgeInsets.all(4.w),
              child: Column(
                children: [
                  Row(
                    children: [
                      Container(
                        width: 15.w,
                        height: 15.w,
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(8),
                          child: CustomImageWidget(
                            imageUrl: podcast["artwork"] as String,
                            width: 15.w,
                            height: 15.w,
                            fit: BoxFit.cover,
                          ),
                        ),
                      ),
                      SizedBox(width: 3.w),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              podcast["title"] as String,
                              style: AppTheme.lightTheme.textTheme.titleMedium
                                  ?.copyWith(
                                fontWeight: FontWeight.w600,
                              ),
                              maxLines: 2,
                              overflow: TextOverflow.ellipsis,
                            ),
                            Text(
                              podcast["author"] as String,
                              style: AppTheme.lightTheme.textTheme.bodySmall
                                  ?.copyWith(
                                color: AppTheme
                                    .lightTheme.colorScheme.onSurfaceVariant,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 3.h),
                  _buildOptionTile('Play Now', 'play_circle_filled', () {
                    Navigator.pop(context);
                  }),
                  _buildOptionTile('Download', 'download', () {
                    Navigator.pop(context);
                  }),
                  _buildOptionTile('Add to Playlist', 'playlist_add', () {
                    Navigator.pop(context);
                  }),
                  _buildOptionTile('Share', 'share', () {
                    Navigator.pop(context);
                  }),
                  SizedBox(height: 2.h),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildOptionTile(String title, String iconName, VoidCallback onTap) {
    return ListTile(
      leading: CustomIconWidget(
        iconName: iconName,
        color: AppTheme.lightTheme.colorScheme.onSurface,
        size: 24,
      ),
      title: Text(
        title,
        style: AppTheme.lightTheme.textTheme.bodyLarge,
      ),
      onTap: onTap,
    );
  }

  Future<void> _onRefresh() async {
    // Simulate refresh delay
    await Future.delayed(const Duration(seconds: 1));
    // In a real app, this would fetch new data
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
      body: SafeArea(
        child: RefreshIndicator(
          onRefresh: _onRefresh,
          color: AppTheme.lightTheme.colorScheme.secondary,
          child: CustomScrollView(
            controller: _scrollController,
            physics: const BouncingScrollPhysics(),
            slivers: [
              // Dynamic Header
              SliverAppBar(
                expandedHeight: 12.h,
                floating: false,
                pinned: true,
                backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
                elevation: 0,
                flexibleSpace: FlexibleSpaceBar(
                  background: AnimatedBuilder(
                    animation: _headerOpacityAnimation,
                    builder: (context, child) {
                      return Opacity(
                        opacity: _headerOpacityAnimation.value,
                        child: Padding(
                          padding: EdgeInsets.symmetric(
                              horizontal: 4.w, vertical: 2.h),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            mainAxisAlignment: MainAxisAlignment.end,
                            children: [
                              Text(
                                "Good Morning",
                                style: AppTheme.lightTheme.textTheme.bodyLarge
                                    ?.copyWith(
                                  color: AppTheme
                                      .lightTheme.colorScheme.onSurfaceVariant,
                                ),
                              ),
                              Text(
                                "Alex",
                                style: AppTheme
                                    .lightTheme.textTheme.headlineMedium
                                    ?.copyWith(
                                  fontWeight: FontWeight.bold,
                                  color:
                                      AppTheme.lightTheme.colorScheme.onSurface,
                                ),
                              ),
                            ],
                          ),
                        ),
                      );
                    },
                  ),
                ),
                actions: [
                  IconButton(
                    onPressed: () {
                      Navigator.pushNamed(context, '/search-and-discovery');
                    },
                    icon: CustomIconWidget(
                      iconName: 'search',
                      color: AppTheme.lightTheme.colorScheme.onSurface,
                      size: 24,
                    ),
                  ),
                  SizedBox(width: 2.w),
                ],
              ),

              // Featured Content Carousel
              SliverToBoxAdapter(
                child: Column(
                  children: [
                    SizedBox(height: 2.h),
                    FeaturedCarouselWidget(
                      featuredPodcasts: _featuredPodcasts,
                      onPodcastTap: _onPodcastTap,
                    ),
                    SizedBox(height: 3.h),
                  ],
                ),
              ),

              // Continue Listening Section
              SliverToBoxAdapter(
                child: SectionHeaderWidget(
                  title: "Continue Listening",
                  subtitle: "Pick up where you left off",
                  onSeeAllTap: () {},
                ),
              ),

              SliverToBoxAdapter(
                child: SizedBox(
                  height: 35.h,
                  child: ListView.builder(
                    scrollDirection: Axis.horizontal,
                    padding: EdgeInsets.symmetric(horizontal: 4.w),
                    itemCount: _continueListening.length,
                    itemBuilder: (context, index) {
                      return PodcastCardWidget(
                        podcast: _continueListening[index],
                        onTap: _onPodcastTap,
                        onLongPress: _onPodcastLongPress,
                        showProgress: true,
                      );
                    },
                  ),
                ),
              ),

              // Trending Now Section
              SliverToBoxAdapter(
                child: SectionHeaderWidget(
                  title: "Trending Now",
                  subtitle: "What everyone's listening to",
                  onSeeAllTap: () {},
                ),
              ),

              SliverToBoxAdapter(
                child: SizedBox(
                  height: 40.h,
                  child: ListView.builder(
                    scrollDirection: Axis.horizontal,
                    padding: EdgeInsets.symmetric(horizontal: 4.w),
                    itemCount: _trendingPodcasts.length,
                    itemBuilder: (context, index) {
                      return TrendingCardWidget(
                        podcast: _trendingPodcasts[index],
                        onTap: _onPodcastTap,
                        rank: index + 1,
                      );
                    },
                  ),
                ),
              ),

              // Recommended for You Section
              SliverToBoxAdapter(
                child: SectionHeaderWidget(
                  title: "Recommended for You",
                  subtitle: "AI-curated based on your taste",
                  onSeeAllTap: () {},
                ),
              ),

              SliverToBoxAdapter(
                child: SizedBox(
                  height: 35.h,
                  child: ListView.builder(
                    scrollDirection: Axis.horizontal,
                    padding: EdgeInsets.symmetric(horizontal: 4.w),
                    itemCount: _recommendedPodcasts.length,
                    itemBuilder: (context, index) {
                      return PodcastCardWidget(
                        podcast: _recommendedPodcasts[index],
                        onTap: _onPodcastTap,
                        onLongPress: _onPodcastLongPress,
                      );
                    },
                  ),
                ),
              ),

              // Bottom spacing for mini player
              SliverToBoxAdapter(
                child: SizedBox(
                  height: 5.h,
                ),
              ),
            ],
          ),
        ),
      ),

      // Bottom Navigation Bar
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color: AppTheme.lightTheme.colorScheme.surface,
          boxShadow: [
            BoxShadow(
              color:
                  AppTheme.lightTheme.colorScheme.shadow.withValues(alpha: 0.1),
              blurRadius: 10,
              offset: const Offset(0, -2),
            ),
          ],
        ),
        child: BottomNavigationBar(
          currentIndex: _currentBottomNavIndex,
          onTap: _onBottomNavTap,
          type: BottomNavigationBarType.fixed,
          backgroundColor: Colors.transparent,
          elevation: 0,
          selectedItemColor: AppTheme.lightTheme.colorScheme.secondary,
          unselectedItemColor: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
          selectedLabelStyle:
              AppTheme.lightTheme.textTheme.labelSmall?.copyWith(
            fontWeight: FontWeight.w600,
          ),
          unselectedLabelStyle: AppTheme.lightTheme.textTheme.labelSmall,
          items: [
            BottomNavigationBarItem(
              icon: CustomIconWidget(
                iconName: 'home',
                color: _currentBottomNavIndex == 0
                    ? AppTheme.lightTheme.colorScheme.secondary
                    : AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                size: 24,
              ),
              label: 'Home',
            ),
            BottomNavigationBarItem(
              icon: CustomIconWidget(
                iconName: 'search',
                color: _currentBottomNavIndex == 1
                    ? AppTheme.lightTheme.colorScheme.secondary
                    : AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                size: 24,
              ),
              label: 'Search',
            ),
            BottomNavigationBarItem(
              icon: CustomIconWidget(
                iconName: 'download',
                color: _currentBottomNavIndex == 2
                    ? AppTheme.lightTheme.colorScheme.secondary
                    : AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                size: 24,
              ),
              label: 'Library',
            ),
            BottomNavigationBarItem(
              icon: CustomIconWidget(
                iconName: 'person',
                color: _currentBottomNavIndex == 3
                    ? AppTheme.lightTheme.colorScheme.secondary
                    : AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                size: 24,
              ),
              label: 'Profile',
            ),
          ],
        ),
      ),

      // Floating Action Button for Voice Search
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.pushNamed(context, '/search-and-discovery');
        },
        backgroundColor: AppTheme.lightTheme.colorScheme.secondary,
        child: CustomIconWidget(
          iconName: 'mic',
          color: Colors.white,
          size: 24,
        ),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
    );
  }
}
