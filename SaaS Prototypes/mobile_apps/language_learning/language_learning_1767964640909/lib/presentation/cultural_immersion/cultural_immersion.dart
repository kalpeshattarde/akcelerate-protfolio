
import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../core/app_export.dart';
import './widgets/cultural_artifact_card.dart';
import './widgets/cultural_quiz_widget.dart';
import './widgets/dialect_comparison_widget.dart';
import './widgets/native_speaker_video_card.dart';
import './widgets/virtual_travel_card.dart';

class CulturalImmersion extends StatefulWidget {
  const CulturalImmersion({Key? key}) : super(key: key);

  @override
  State<CulturalImmersion> createState() => _CulturalImmersionState();
}

class _CulturalImmersionState extends State<CulturalImmersion>
    with TickerProviderStateMixin {
  late ScrollController _scrollController;
  late TabController _tabController;
  double _scrollOffset = 0.0;
  int _currentTabIndex = 0;
  bool _isBookmarked = false;

  // Mock data for cultural content
  final List<Map<String, dynamic>> _culturalArtifacts = [
    {
      "id": 1,
      "name": "Traditional Tea Ceremony",
      "description":
          "Ancient ritual of preparing and serving tea with mindful precision and respect for tradition.",
      "image":
          "https://images.pexels.com/photos/5864245/pexels-photo-5864245.jpeg?auto=compress&cs=tinysrgb&w=800",
      "region": "Kyoto, Japan",
      "historicalPeriod": "12th Century",
      "significance":
          "Represents harmony, respect, purity, and tranquility in Japanese culture."
    },
    {
      "id": 2,
      "name": "Flamenco Dance",
      "description":
          "Passionate and expressive art form combining singing, guitar playing, dancing, and handclaps.",
      "image":
          "https://images.pexels.com/photos/8191831/pexels-photo-8191831.jpeg?auto=compress&cs=tinysrgb&w=800",
      "region": "Andalusia, Spain",
      "historicalPeriod": "18th Century",
      "significance":
          "Expression of deep emotions and cultural identity of Andalusian people."
    },
    {
      "id": 3,
      "name": "Maasai Beadwork",
      "description":
          "Intricate jewelry and decorative items made from colorful beads with symbolic meanings.",
      "image":
          "https://images.pexels.com/photos/8191831/pexels-photo-8191831.jpeg?auto=compress&cs=tinysrgb&w=800",
      "region": "Kenya & Tanzania",
      "historicalPeriod": "Ancient Times",
      "significance":
          "Represents social status, age, and marital status within Maasai society."
    },
  ];

  final List<Map<String, dynamic>> _nativeSpeakerVideos = [
    {
      "id": 1,
      "title": "Daily Life in a Spanish Village",
      "description":
          "Experience authentic conversations about traditional Spanish village life and customs.",
      "thumbnail":
          "https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=800",
      "duration": "12:45",
      "speakerName": "María González",
      "speakerLocation": "Ronda, Spain",
      "speakerAvatar":
          "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png",
      "topic": "Village Traditions",
      "videoUrl": "https://example.com/video1.mp4"
    },
    {
      "id": 2,
      "title": "French Market Culture",
      "description":
          "Learn about French market traditions and how to interact with local vendors.",
      "thumbnail":
          "https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=800",
      "duration": "8:30",
      "speakerName": "Pierre Dubois",
      "speakerLocation": "Provence, France",
      "speakerAvatar":
          "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png",
      "topic": "Market Etiquette",
      "videoUrl": "https://example.com/video2.mp4"
    },
  ];

  final List<Map<String, dynamic>> _virtualDestinations = [
    {
      "id": 1,
      "name": "Shibuya Crossing",
      "description":
          "Experience the world's busiest pedestrian crossing and learn urban Japanese expressions.",
      "image":
          "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800",
      "country": "Japan",
      "city": "Tokyo",
      "scenarios": [
        "Asking for directions",
        "Ordering at a convenience store",
        "Using public transport"
      ],
      "difficultyLevel": "Intermediate"
    },
    {
      "id": 2,
      "name": "Parisian Café",
      "description":
          "Immerse yourself in French café culture and practice ordering like a local.",
      "image":
          "https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=800",
      "country": "France",
      "city": "Paris",
      "scenarios": [
        "Ordering coffee",
        "Casual conversations",
        "Reading French newspapers"
      ],
      "difficultyLevel": "Beginner"
    },
    {
      "id": 3,
      "name": "Barcelona Market",
      "description":
          "Navigate through La Boquería market and practice Spanish with local vendors.",
      "image":
          "https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=800",
      "country": "Spain",
      "city": "Barcelona",
      "scenarios": [
        "Buying fresh produce",
        "Haggling prices",
        "Learning about local foods"
      ],
      "difficultyLevel": "Advanced"
    },
  ];

  final List<Map<String, dynamic>> _regionalDialects = [
    {
      "region": "Andalusia",
      "country": "Spain",
      "flag": "https://flagcdn.com/w80/es.png",
      "samplePhrase": "¿Qué tal andas?",
      "translation": "How are you doing?",
      "audioUrl": "https://example.com/audio/andalusian.mp3",
      "characteristics": [
        "Dropping of final 's' sounds",
        "Aspiration of consonants",
        "Distinctive intonation patterns",
        "Unique vocabulary expressions"
      ]
    },
    {
      "region": "Catalonia",
      "country": "Spain",
      "flag": "https://flagcdn.com/w80/es.png",
      "samplePhrase": "Com va això?",
      "translation": "How's it going?",
      "audioUrl": "https://example.com/audio/catalan.mp3",
      "characteristics": [
        "Catalan influence on Spanish",
        "Different pronunciation of 'c' and 'z'",
        "Unique grammatical structures",
        "Regional vocabulary variations"
      ]
    },
    {
      "region": "Buenos Aires",
      "country": "Argentina",
      "flag": "https://flagcdn.com/w80/ar.png",
      "samplePhrase": "¿Cómo andás, che?",
      "translation": "How are you, buddy?",
      "audioUrl": "https://example.com/audio/argentinian.mp3",
      "characteristics": [
        "Voseo usage instead of tú",
        "Italian influence on intonation",
        "Distinctive 'll' and 'y' pronunciation",
        "Unique slang expressions"
      ]
    },
  ];

  final Map<String, dynamic> _culturalQuiz = {
    "question":
        "In Japanese tea ceremony, what does the concept of 'Wa' represent?",
    "image":
        "https://images.pexels.com/photos/5864245/pexels-photo-5864245.jpeg?auto=compress&cs=tinysrgb&w=800",
    "options": [
      "Speed and efficiency",
      "Harmony and peace",
      "Wealth and prosperity",
      "Strength and power"
    ],
    "correctAnswer": 1,
    "explanation":
        "In Japanese tea ceremony, 'Wa' (和) represents harmony and peace. It's one of the four fundamental principles along with respect (Kei), purity (Sei), and tranquility (Jaku). This concept emphasizes creating a harmonious atmosphere where all participants can find inner peace and connection with others."
  };

  @override
  void initState() {
    super.initState();
    _scrollController = ScrollController();
    _tabController = TabController(length: 5, vsync: this);

    _scrollController.addListener(() {
      setState(() {
        _scrollOffset = _scrollController.offset;
      });
    });

    _tabController.addListener(() {
      setState(() {
        _currentTabIndex = _tabController.index;
      });
    });
  }

  @override
  void dispose() {
    _scrollController.dispose();
    _tabController.dispose();
    super.dispose();
  }

  void _showArtifactDetails(Map<String, dynamic> artifact) {
    showModalBottomSheet(
        context: context,
        isScrollControlled: true,
        backgroundColor: Colors.transparent,
        builder: (context) => DraggableScrollableSheet(
            initialChildSize: 0.8,
            maxChildSize: 0.95,
            minChildSize: 0.5,
            builder: (context, scrollController) => Container(
                decoration: BoxDecoration(
                    color: AppTheme.lightTheme.colorScheme.surface,
                    borderRadius:
                        BorderRadius.vertical(top: Radius.circular(20))),
                child: SingleChildScrollView(
                    controller: scrollController,
                    child: Padding(
                        padding: EdgeInsets.all(5.w),
                        child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Center(
                                  child: Container(
                                      width: 12.w,
                                      height: 0.5.h,
                                      decoration: BoxDecoration(
                                          color: AppTheme.lightTheme.colorScheme
                                              .onSurfaceVariant,
                                          borderRadius:
                                              BorderRadius.circular(2)))),
                              SizedBox(height: 3.h),
                              ClipRRect(
                                  borderRadius: BorderRadius.circular(16),
                                  child: CustomImageWidget(
                                      imageUrl: artifact["image"] as String,
                                      width: double.infinity,
                                      height: 30.h,
                                      fit: BoxFit.cover)),
                              SizedBox(height: 3.h),
                              Text(artifact["name"] as String,
                                  style: AppTheme
                                      .lightTheme.textTheme.headlineSmall
                                      ?.copyWith(fontWeight: FontWeight.w700)),
                              SizedBox(height: 1.h),
                              Row(children: [
                                CustomIconWidget(
                                    iconName: 'location_on',
                                    color:
                                        AppTheme.lightTheme.colorScheme.primary,
                                    size: 20),
                                SizedBox(width: 1.w),
                                Text(artifact["region"] as String,
                                    style: AppTheme
                                        .lightTheme.textTheme.bodyLarge
                                        ?.copyWith(
                                            color: AppTheme
                                                .lightTheme.colorScheme.primary,
                                            fontWeight: FontWeight.w500)),
                                Spacer(),
                                Container(
                                    padding: EdgeInsets.symmetric(
                                        horizontal: 3.w, vertical: 0.5.h),
                                    decoration: BoxDecoration(
                                        color: AppTheme
                                            .lightTheme.colorScheme.secondary
                                            .withValues(alpha: 0.1),
                                        borderRadius:
                                            BorderRadius.circular(20)),
                                    child: Text(
                                        artifact["historicalPeriod"] as String,
                                        style: AppTheme
                                            .lightTheme.textTheme.bodySmall
                                            ?.copyWith(
                                                color: AppTheme.lightTheme
                                                    .colorScheme.secondary,
                                                fontWeight: FontWeight.w500))),
                              ]),
                              SizedBox(height: 3.h),
                              Text('Description',
                                  style: AppTheme
                                      .lightTheme.textTheme.titleMedium
                                      ?.copyWith(fontWeight: FontWeight.w600)),
                              SizedBox(height: 1.h),
                              Text(artifact["description"] as String,
                                  style: AppTheme.lightTheme.textTheme.bodyLarge
                                      ?.copyWith(height: 1.5)),
                              SizedBox(height: 3.h),
                              Text('Cultural Significance',
                                  style: AppTheme
                                      .lightTheme.textTheme.titleMedium
                                      ?.copyWith(fontWeight: FontWeight.w600)),
                              SizedBox(height: 1.h),
                              Text(artifact["significance"] as String,
                                  style: AppTheme.lightTheme.textTheme.bodyLarge
                                      ?.copyWith(height: 1.5)),
                              SizedBox(height: 5.h),
                            ]))))));
  }

  void _playVideo(Map<String, dynamic> video) {
    // Implement video player functionality
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: Text('Playing: ${video["title"]}'),
        backgroundColor: AppTheme.lightTheme.colorScheme.primary));
  }

  void _exploreDestination(Map<String, dynamic> destination) {
    // Implement virtual travel experience
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: Text('Exploring: ${destination["name"]}'),
        backgroundColor: AppTheme.lightTheme.colorScheme.primary));
  }

  void _onQuizAnswered(bool isCorrect) {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: Text(isCorrect
            ? 'Correct! Well done!'
            : 'Not quite right, but great try!'),
        backgroundColor: isCorrect
            ? AppTheme.getSuccessColor(true)
            : AppTheme.getWarningColor(true)));
  }

  Widget _buildParallaxHeader() {
    final parallaxOffset = _scrollOffset * 0.5;

    return Container(
        height: 35.h,
        child: Stack(children: [
          Positioned(
              top: -parallaxOffset,
              left: 0,
              right: 0,
              child: Container(
                  height: 40.h,
                  decoration: BoxDecoration(
                      gradient: LinearGradient(
                          begin: Alignment.topCenter,
                          end: Alignment.bottomCenter,
                          colors: [
                        AppTheme.lightTheme.colorScheme.primary,
                        AppTheme.lightTheme.colorScheme.primary
                            .withValues(alpha: 0.8),
                      ])),
                  child: CustomImageWidget(
                      imageUrl:
                          "https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=800",
                      width: double.infinity,
                      height: double.infinity,
                      fit: BoxFit.cover))),
          Container(
              decoration: BoxDecoration(
                  gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [
                Colors.black.withValues(alpha: 0.3),
                Colors.black.withValues(alpha: 0.6),
              ]))),
          SafeArea(
              child: Padding(
                  padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
                  child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(children: [
                          GestureDetector(
                              onTap: () => Navigator.pop(context),
                              child: Container(
                                  padding: EdgeInsets.all(2.w),
                                  decoration: BoxDecoration(
                                      color:
                                          Colors.white.withValues(alpha: 0.2),
                                      shape: BoxShape.circle),
                                  child: CustomIconWidget(
                                      iconName: 'arrow_back',
                                      color: Colors.white,
                                      size: 24))),
                          Spacer(),
                          GestureDetector(
                              onTap: () {
                                setState(() {
                                  _isBookmarked = !_isBookmarked;
                                });
                              },
                              child: Container(
                                  padding: EdgeInsets.all(2.w),
                                  decoration: BoxDecoration(
                                      color:
                                          Colors.white.withValues(alpha: 0.2),
                                      shape: BoxShape.circle),
                                  child: CustomIconWidget(
                                      iconName: _isBookmarked
                                          ? 'bookmark'
                                          : 'bookmark_border',
                                      color: _isBookmarked
                                          ? AppTheme.getAccentColor(true)
                                          : Colors.white,
                                      size: 24))),
                          SizedBox(width: 2.w),
                          GestureDetector(
                              onTap: () {
                                // Implement share functionality
                              },
                              child: Container(
                                  padding: EdgeInsets.all(2.w),
                                  decoration: BoxDecoration(
                                      color:
                                          Colors.white.withValues(alpha: 0.2),
                                      shape: BoxShape.circle),
                                  child: CustomIconWidget(
                                      iconName: 'share',
                                      color: Colors.white,
                                      size: 24))),
                        ]),
                        Spacer(),
                        Row(children: [
                          CustomIconWidget(
                              iconName: 'location_on',
                              color: Colors.white,
                              size: 20),
                          SizedBox(width: 1.w),
                          Text('Global Cultural Journey',
                              style: AppTheme.lightTheme.textTheme.bodyLarge
                                  ?.copyWith(
                                      color:
                                          Colors.white.withValues(alpha: 0.9),
                                      fontWeight: FontWeight.w500)),
                        ]),
                        SizedBox(height: 1.h),
                        Text('Cultural Immersion',
                            style: AppTheme.lightTheme.textTheme.headlineLarge
                                ?.copyWith(
                                    color: Colors.white,
                                    fontWeight: FontWeight.w700)),
                        SizedBox(height: 1.h),
                        Text(
                            'Explore authentic cultures through immersive experiences',
                            style: AppTheme.lightTheme.textTheme.bodyLarge
                                ?.copyWith(
                                    color:
                                        Colors.white.withValues(alpha: 0.8))),
                      ]))),
        ]));
  }

  Widget _buildTabContent() {
    switch (_currentTabIndex) {
      case 0:
        return _buildArtifactsTab();
      case 1:
        return _buildVideosTab();
      case 2:
        return _buildVirtualTravelTab();
      case 3:
        return _buildDialectsTab();
      case 4:
        return _buildQuizTab();
      default:
        return _buildArtifactsTab();
    }
  }

  Widget _buildArtifactsTab() {
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Padding(
          padding: EdgeInsets.symmetric(horizontal: 4.w),
          child: Text('Cultural Artifacts',
              style: AppTheme.lightTheme.textTheme.headlineSmall
                  ?.copyWith(fontWeight: FontWeight.w700))),
      SizedBox(height: 2.h),
      Container(
          height: 40.h,
          child: ListView.builder(
              scrollDirection: Axis.horizontal,
              padding: EdgeInsets.symmetric(horizontal: 4.w),
              itemCount: _culturalArtifacts.length,
              itemBuilder: (context, index) {
                return CulturalArtifactCard(
                    artifact: _culturalArtifacts[index],
                    onTap: () =>
                        _showArtifactDetails(_culturalArtifacts[index]));
              })),
    ]);
  }

  Widget _buildVideosTab() {
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Padding(
          padding: EdgeInsets.symmetric(horizontal: 4.w),
          child: Text('Native Speaker Interviews',
              style: AppTheme.lightTheme.textTheme.headlineSmall
                  ?.copyWith(fontWeight: FontWeight.w700))),
      SizedBox(height: 2.h),
      ListView.builder(
          shrinkWrap: true,
          physics: NeverScrollableScrollPhysics(),
          padding: EdgeInsets.symmetric(horizontal: 4.w),
          itemCount: _nativeSpeakerVideos.length,
          itemBuilder: (context, index) {
            return NativeSpeakerVideoCard(
                video: _nativeSpeakerVideos[index],
                onPlay: () => _playVideo(_nativeSpeakerVideos[index]));
          }),
    ]);
  }

  Widget _buildVirtualTravelTab() {
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Padding(
          padding: EdgeInsets.symmetric(horizontal: 4.w),
          child: Text('Virtual Travel Experiences',
              style: AppTheme.lightTheme.textTheme.headlineSmall
                  ?.copyWith(fontWeight: FontWeight.w700))),
      SizedBox(height: 2.h),
      Container(
          height: 40.h,
          child: ListView.builder(
              scrollDirection: Axis.horizontal,
              padding: EdgeInsets.symmetric(horizontal: 4.w),
              itemCount: _virtualDestinations.length,
              itemBuilder: (context, index) {
                return VirtualTravelCard(
                    destination: _virtualDestinations[index],
                    onExplore: () =>
                        _exploreDestination(_virtualDestinations[index]));
              })),
    ]);
  }

  Widget _buildDialectsTab() {
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Padding(
          padding: EdgeInsets.symmetric(horizontal: 4.w),
          child: Text('Regional Dialects',
              style: AppTheme.lightTheme.textTheme.headlineSmall
                  ?.copyWith(fontWeight: FontWeight.w700))),
      SizedBox(height: 2.h),
      Padding(
          padding: EdgeInsets.symmetric(horizontal: 4.w),
          child: DialectComparisonWidget(dialects: _regionalDialects)),
    ]);
  }

  Widget _buildQuizTab() {
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Padding(
          padding: EdgeInsets.symmetric(horizontal: 4.w),
          child: Text('Cultural Knowledge Quiz',
              style: AppTheme.lightTheme.textTheme.headlineSmall
                  ?.copyWith(fontWeight: FontWeight.w700))),
      SizedBox(height: 2.h),
      CulturalQuizWidget(quiz: _culturalQuiz, onAnswered: _onQuizAnswered),
    ]);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: AppTheme.lightTheme.scaffoldBackgroundColor,
        body: CustomScrollView(controller: _scrollController, slivers: [
          SliverToBoxAdapter(child: _buildParallaxHeader()),
          SliverPersistentHeader(
              pinned: true,
              delegate: _SliverTabBarDelegate(TabBar(
                  controller: _tabController,
                  isScrollable: true,
                  tabAlignment: TabAlignment.start,
                  labelColor: AppTheme.lightTheme.colorScheme.primary,
                  unselectedLabelColor:
                      AppTheme.lightTheme.colorScheme.onSurfaceVariant,
                  indicatorColor: AppTheme.lightTheme.colorScheme.primary,
                  indicatorWeight: 3,
                  labelStyle: AppTheme.lightTheme.textTheme.titleSmall
                      ?.copyWith(fontWeight: FontWeight.w600),
                  unselectedLabelStyle: AppTheme.lightTheme.textTheme.titleSmall
                      ?.copyWith(fontWeight: FontWeight.w400),
                  tabs: [
                    Tab(
                        child: Row(mainAxisSize: MainAxisSize.min, children: [
                      CustomIconWidget(
                          iconName: 'museum',
                          color: _currentTabIndex == 0
                              ? AppTheme.lightTheme.colorScheme.primary
                              : AppTheme
                                  .lightTheme.colorScheme.onSurfaceVariant,
                          size: 20),
                      SizedBox(width: 2.w),
                      Text('Artifacts'),
                    ])),
                    Tab(
                        child: Row(mainAxisSize: MainAxisSize.min, children: [
                      CustomIconWidget(
                          iconName: 'play_circle',
                          color: _currentTabIndex == 1
                              ? AppTheme.lightTheme.colorScheme.primary
                              : AppTheme
                                  .lightTheme.colorScheme.onSurfaceVariant,
                          size: 20),
                      SizedBox(width: 2.w),
                      Text('Videos'),
                    ])),
                    Tab(
                        child: Row(mainAxisSize: MainAxisSize.min, children: [
                      CustomIconWidget(
                          iconName: 'travel_explore',
                          color: _currentTabIndex == 2
                              ? AppTheme.lightTheme.colorScheme.primary
                              : AppTheme
                                  .lightTheme.colorScheme.onSurfaceVariant,
                          size: 20),
                      SizedBox(width: 2.w),
                      Text('Travel'),
                    ])),
                    Tab(
                        child: Row(mainAxisSize: MainAxisSize.min, children: [
                      CustomIconWidget(
                          iconName: 'language',
                          color: _currentTabIndex == 3
                              ? AppTheme.lightTheme.colorScheme.primary
                              : AppTheme
                                  .lightTheme.colorScheme.onSurfaceVariant,
                          size: 20),
                      SizedBox(width: 2.w),
                      Text('Dialects'),
                    ])),
                    Tab(
                        child: Row(mainAxisSize: MainAxisSize.min, children: [
                      CustomIconWidget(
                          iconName: 'quiz',
                          color: _currentTabIndex == 4
                              ? AppTheme.lightTheme.colorScheme.primary
                              : AppTheme
                                  .lightTheme.colorScheme.onSurfaceVariant,
                          size: 20),
                      SizedBox(width: 2.w),
                      Text('Quiz'),
                    ])),
                  ]))),
          SliverToBoxAdapter(
              child: Padding(
                  padding: EdgeInsets.symmetric(vertical: 3.h),
                  child: _buildTabContent())),
        ]));
  }
}

class _SliverTabBarDelegate extends SliverPersistentHeaderDelegate {
  final TabBar tabBar;

  _SliverTabBarDelegate(this.tabBar);

  @override
  double get minExtent => tabBar.preferredSize.height;

  @override
  double get maxExtent => tabBar.preferredSize.height;

  @override
  Widget build(
      BuildContext context, double shrinkOffset, bool overlapsContent) {
    return Container(
        color: AppTheme.lightTheme.scaffoldBackgroundColor, child: tabBar);
  }

  @override
  bool shouldRebuild(covariant SliverPersistentHeaderDelegate oldDelegate) {
    return false;
  }
}
