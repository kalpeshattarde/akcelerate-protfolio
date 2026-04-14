import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../widgets/custom_app_bar.dart';
import '../../widgets/custom_bottom_bar.dart';
import './widgets/article_reader_widget.dart';
import './widgets/category_filter_widget.dart';
import './widgets/content_card_widget.dart';
import './widgets/search_header_widget.dart';

class WellnessTipsContent extends StatefulWidget {
  const WellnessTipsContent({super.key});

  @override
  State<WellnessTipsContent> createState() => _WellnessTipsContentState();
}

class _WellnessTipsContentState extends State<WellnessTipsContent>
    with TickerProviderStateMixin {
  late TabController _tabController;
  final TextEditingController _searchController = TextEditingController();
  final ScrollController _scrollController = ScrollController();

  String _searchQuery = '';
  bool _isSearching = false;
  Set<String> _bookmarkedArticles = {};
  bool _isRefreshing = false;

  // Mock data for wellness content
  final List<Map<String, dynamic>> _featuredArticles = [
    {
      "id": "featured_1",
      "title": "Essential Nutrition Guide for Second Trimester",
      "excerpt":
          "Discover the key nutrients your baby needs during months 4-6 and delicious meal ideas to support healthy development.",
      "category": "Nutrition",
      "trimester": "Second",
      "readTime": "8 min read",
      "image": "https://images.unsplash.com/photo-1694180502921-f689c6a8265b",
      "semanticLabel":
          "Colorful fresh vegetables and fruits arranged on a wooden cutting board including tomatoes, avocado, and leafy greens",
      "author": "Dr. Sarah Mitchell",
      "publishDate": "2025-12-05",
      "isTrending": true,
    },
    {
      "id": "featured_2",
      "title": "Gentle Prenatal Yoga Poses for Every Trimester",
      "excerpt":
          "Safe, effective yoga sequences designed specifically for expecting mothers to reduce stress and improve flexibility.",
      "category": "Exercise",
      "trimester": "All",
      "readTime": "12 min read",
      "image":
          "https://img.rocket.new/generatedImages/rocket_gen_img_1be940bab-1764808876910.png",
      "semanticLabel":
          "Pregnant woman in comfortable athletic wear performing a gentle yoga stretch on a purple mat in a bright, peaceful room",
      "author": "Emma Thompson, Certified Prenatal Yoga Instructor",
      "publishDate": "2025-12-04",
      "isTrending": true,
    },
    {
      "id": "featured_3",
      "title": "Managing Anxiety During Pregnancy: Expert Tips",
      "excerpt":
          "Evidence-based strategies to cope with pregnancy-related anxiety and maintain emotional wellness throughout your journey.",
      "category": "Mental Health",
      "trimester": "All",
      "readTime": "10 min read",
      "image":
          "https://img.rocket.new/generatedImages/rocket_gen_img_11552d387-1764832853014.png",
      "semanticLabel":
          "Serene woman with closed eyes practicing meditation in a calm indoor setting with soft natural lighting",
      "author": "Dr. Jennifer Lee, Clinical Psychologist",
      "publishDate": "2025-12-03",
      "isTrending": true,
    },
  ];

  final List<Map<String, dynamic>> _allArticles = [
    {
      "id": "article_1",
      "title": "First Trimester Survival Guide: What to Expect",
      "excerpt":
          "Navigate the first 12 weeks with confidence. Learn about common symptoms, when to call your doctor, and self-care tips.",
      "category": "Pregnancy Basics",
      "trimester": "First",
      "readTime": "7 min read",
      "image":
          "https://img.rocket.new/generatedImages/rocket_gen_img_1be940bab-1764808876910.png",
      "semanticLabel":
          "Pregnant woman in early pregnancy holding her belly while sitting comfortably on a couch with a warm smile",
      "author": "Dr. Maria Garcia",
      "publishDate": "2025-12-02",
      "isTrending": false,
    },
    {
      "id": "article_2",
      "title": "Building Your Hospital Bag: Complete Checklist",
      "excerpt":
          "Don't forget anything important! Our comprehensive checklist covers essentials for mom, baby, and birth partner.",
      "category": "Preparation",
      "trimester": "Third",
      "readTime": "6 min read",
      "image":
          "https://img.rocket.new/generatedImages/rocket_gen_img_1598e07f6-1765125327744.png",
      "semanticLabel":
          "Neatly organized hospital bag with baby clothes, toiletries, and essential items laid out on a white bed",
      "author": "Rachel Adams, Labor & Delivery Nurse",
      "publishDate": "2025-12-01",
      "isTrending": false,
    },
    {
      "id": "article_3",
      "title": "Understanding Your Baby's Movement Patterns",
      "excerpt":
          "Learn what's normal, when to start counting kicks, and important signs that warrant a call to your healthcare provider.",
      "category": "Baby Development",
      "trimester": "Second",
      "readTime": "9 min read",
      "image":
          "https://img.rocket.new/generatedImages/rocket_gen_img_1be940bab-1764808876910.png",
      "semanticLabel":
          "Pregnant woman gently touching her belly with both hands, feeling baby movements in a peaceful home setting",
      "author": "Dr. Sarah Mitchell",
      "publishDate": "2025-11-30",
      "isTrending": false,
    },
    {
      "id": "article_4",
      "title": "Healthy Weight Gain During Pregnancy",
      "excerpt":
          "Evidence-based guidelines for appropriate weight gain, nutrition tips, and how to maintain a healthy pregnancy weight.",
      "category": "Nutrition",
      "trimester": "All",
      "readTime": "8 min read",
      "image": "https://images.unsplash.com/photo-1539136788836-5699e78bfc75",
      "semanticLabel":
          "Healthy pregnancy meal with grilled salmon, quinoa, roasted vegetables, and fresh salad on a white plate",
      "author": "Lisa Chen, Registered Dietitian",
      "publishDate": "2025-11-29",
      "isTrending": false,
    },
    {
      "id": "article_5",
      "title": "Sleep Solutions for Pregnant Women",
      "excerpt":
          "Struggling with sleep? Discover comfortable positions, helpful products, and bedtime routines for better rest.",
      "category": "Self-Care",
      "trimester": "All",
      "readTime": "7 min read",
      "image":
          "https://img.rocket.new/generatedImages/rocket_gen_img_119310297-1764685357145.png",
      "semanticLabel":
          "Pregnant woman sleeping peacefully on her side with a pregnancy pillow in a cozy bedroom with soft lighting",
      "author": "Dr. Emily Roberts",
      "publishDate": "2025-11-28",
      "isTrending": false,
    },
    {
      "id": "article_6",
      "title": "Partner's Guide to Supporting Your Pregnant Partner",
      "excerpt":
          "Practical ways partners can provide emotional and physical support throughout pregnancy and prepare for parenthood together.",
      "category": "Relationships",
      "trimester": "All",
      "readTime": "10 min read",
      "image": "https://images.unsplash.com/photo-1625238967691-b36b2d852b33",
      "semanticLabel":
          "Loving couple embracing, with partner's hands gently placed on pregnant woman's belly in a warm, intimate moment",
      "author": "Michael Johnson, Family Therapist",
      "publishDate": "2025-11-27",
      "isTrending": false,
    },
    {
      "id": "article_7",
      "title": "Natural Remedies for Common Pregnancy Discomforts",
      "excerpt":
          "Safe, natural solutions for morning sickness, heartburn, back pain, and other common pregnancy symptoms.",
      "category": "Health & Wellness",
      "trimester": "All",
      "readTime": "11 min read",
      "image":
          "https://img.rocket.new/generatedImages/rocket_gen_img_1300cddc5-1764755889644.png",
      "semanticLabel":
          "Natural herbal remedies including ginger tea, essential oils, and fresh herbs arranged on a wooden surface",
      "author": "Dr. Amanda Foster",
      "publishDate": "2025-11-26",
      "isTrending": false,
    },
    {
      "id": "article_8",
      "title": "Preparing Siblings for a New Baby",
      "excerpt":
          "Help your older children adjust to becoming big brothers or sisters with age-appropriate activities and conversations.",
      "category": "Family",
      "trimester": "Third",
      "readTime": "8 min read",
      "image": "https://images.unsplash.com/photo-1666891984304-b27bf8f796d0",
      "semanticLabel":
          "Young child gently touching mother's pregnant belly with curiosity and excitement in a bright family room",
      "author": "Patricia Williams, Child Development Specialist",
      "publishDate": "2025-11-25",
      "isTrending": false,
    },
  ];

  final List<String> _categories = [
    'All',
    'Nutrition',
    'Exercise',
    'Mental Health',
    'Pregnancy Basics',
    'Baby Development',
    'Preparation',
    'Self-Care',
    'Relationships',
    'Health & Wellness',
    'Family',
  ];

  final List<String> _trimesterFilters = [
    'All Trimesters',
    'First',
    'Second',
    'Third',
  ];

  String _selectedTrimester = 'All Trimesters';

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 4, vsync: this, initialIndex: 3);
  }

  @override
  void dispose() {
    _tabController.dispose();
    _searchController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  List<Map<String, dynamic>> get _filteredArticles {
    List<Map<String, dynamic>> filtered = List.from(_allArticles);

    // Apply trimester filter
    if (_selectedTrimester != 'All Trimesters') {
      filtered = filtered
          .where(
            (article) =>
                article['trimester'] == _selectedTrimester ||
                article['trimester'] == 'All',
          )
          .toList();
    }

    // Apply search filter
    if (_searchQuery.isNotEmpty) {
      filtered = filtered.where((article) {
        final title = (article['title'] as String).toLowerCase();
        final excerpt = (article['excerpt'] as String).toLowerCase();
        final category = (article['category'] as String).toLowerCase();
        final query = _searchQuery.toLowerCase();
        return title.contains(query) ||
            excerpt.contains(query) ||
            category.contains(query);
      }).toList();
    }

    return filtered;
  }

  Future<void> _handleRefresh() async {
    setState(() => _isRefreshing = true);
    // Simulate content refresh
    await Future.delayed(const Duration(seconds: 2));
    setState(() => _isRefreshing = false);
  }

  void _toggleBookmark(String articleId) {
    setState(() {
      if (_bookmarkedArticles.contains(articleId)) {
        _bookmarkedArticles.remove(articleId);
      } else {
        _bookmarkedArticles.add(articleId);
      }
    });
  }

  void _openArticle(Map<String, dynamic> article) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => ArticleReaderWidget(
          article: article,
          isBookmarked: _bookmarkedArticles.contains(article['id']),
          onBookmarkToggle: () => _toggleBookmark(article['id'] as String),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      appBar: CustomAppBar.detail(
        title: 'Wellness Tips',
        actions: [
          CustomAppBarAction(
            icon: Icons.bookmark_outline,
            onPressed: () {},
            tooltip: 'Bookmarks',
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Search Header
            SearchHeaderWidget(
              controller: _searchController,
              onSearchChanged: _onSearchChanged,
              onVoiceSearch: () {},
            ),

            // Category Filter
            CategoryFilterWidget(
              trimesterFilters: _trimesterFilters,
              selectedTrimester: _selectedTrimester,
              onTrimesterSelected: (trimester) {
                setState(() => _selectedTrimester = trimester);
              },
            ),

            // Content List
            Expanded(child: _buildContentList()),
          ],
        ),
      ),
      bottomNavigationBar: CustomBottomBar(
        currentIndex: 3, // More tab is at index 3
        onTap: (index) {
          HapticFeedback.lightImpact();
          final items = CustomBottomBar.defaultItems;
          if (index < items.length) {
            // Always navigate - removed condition that prevented same-tab navigation
            Navigator.pushReplacementNamed(context, items[index].route);
          }
        },
      ),
    );
  }

  Widget _buildContentList() {
    return RefreshIndicator(
      onRefresh: _handleRefresh,
      child: ListView.builder(
        controller: _scrollController,
        itemCount: _filteredArticles.length,
        itemBuilder: (context, index) {
          final article = _filteredArticles[index];
          return ContentCardWidget(
            article: article,
            isBookmarked: _bookmarkedArticles.contains(article['id']),
            onTap: () => _openArticle(article),
            onBookmarkToggle: () => _toggleBookmark(article['id'] as String),
          );
        },
      ),
    );
  }

  void _onSearchChanged(String query) {
    setState(() => _searchQuery = query);
  }

  void _clearSearch() {
    _searchController.clear();
    setState(() => _searchQuery = '');
  }
}
