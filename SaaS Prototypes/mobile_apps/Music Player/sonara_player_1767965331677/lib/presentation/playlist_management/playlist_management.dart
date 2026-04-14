import 'package:flutter/material.dart';
import 'package:flutter_slidable/flutter_slidable.dart';

import '../../core/app_export.dart';
import '../../widgets/custom_app_bar.dart';
import '../../widgets/custom_icon_widget.dart';
import '../../widgets/custom_image_widget.dart';
import './widgets/create_playlist_modal.dart';
import './widgets/empty_state_widget.dart';
import './widgets/playlist_card_widget.dart';

class PlaylistManagement extends StatefulWidget {
  const PlaylistManagement({Key? key}) : super(key: key);

  @override
  State<PlaylistManagement> createState() => _PlaylistManagementState();
}

class _PlaylistManagementState extends State<PlaylistManagement> {
  final TextEditingController _searchController = TextEditingController();
  final ScrollController _scrollController = ScrollController();
  bool _isMultiSelectMode = false;
  final Set<int> _selectedPlaylists = {};
  List<Map<String, dynamic>> _filteredPlaylists = [];

  // Mock user data
  final Map<String, dynamic> _userData = {
    "name": "Alex",
    "avatar":
        "https://img.rocket.new/generatedImages/rocket_gen_img_1311bae8f-1763293463780.png",
    "avatarSemanticLabel":
        "Profile photo of a young man with short brown hair wearing a casual blue shirt",
  };

  final List<Map<String, dynamic>> _playlists = [
    {
      "id": 1,
      "title": "Recently Played",
      "songCount": 47,
      "lastModified": DateTime.now().subtract(Duration(hours: 2)),
      "isSystemPlaylist": true,
      "artwork": "https://images.unsplash.com/photo-1706400631458-71a5f399007f",
      "semanticLabel":
          "Colorful audio mixing console with illuminated buttons and faders in a recording studio",
      "isCollaborative": false,
      "privacy": "private",
    },
    {
      "id": 2,
      "title": "Downloaded",
      "songCount": 124,
      "lastModified": DateTime.now().subtract(Duration(days: 1)),
      "isSystemPlaylist": true,
      "artwork": "https://images.unsplash.com/photo-1605557382304-42409a8a40b7",
      "semanticLabel":
          "Vintage turntable with vinyl record playing, warm lighting highlighting the tonearm and platter",
      "isCollaborative": false,
      "privacy": "private",
    },
    {
      "id": 3,
      "title": "Workout Vibes",
      "songCount": 32,
      "lastModified": DateTime.now().subtract(Duration(days: 3)),
      "isSystemPlaylist": false,
      "artwork":
          "https://img.rocket.new/generatedImages/rocket_gen_img_1d9012db6-1764730666719.png",
      "semanticLabel":
          "Athletic person running on treadmill in modern gym with bright natural lighting",
      "isCollaborative": false,
      "privacy": "public",
      "description": "High energy tracks for intense workouts",
    },
    {
      "id": 4,
      "title": "Road Trip Essentials",
      "songCount": 58,
      "lastModified": DateTime.now().subtract(Duration(days: 5)),
      "isSystemPlaylist": false,
      "artwork": "https://images.unsplash.com/photo-1601232441199-a4931884a68c",
      "semanticLabel":
          "Open highway stretching into distance with mountains and blue sky at sunset",
      "isCollaborative": true,
      "privacy": "friends",
      "description": "Perfect songs for long drives",
    },
    {
      "id": 5,
      "title": "Focus & Study",
      "songCount": 41,
      "lastModified": DateTime.now().subtract(Duration(days: 7)),
      "isSystemPlaylist": false,
      "artwork": "https://images.unsplash.com/photo-1491317002516-6356a658b3e8",
      "semanticLabel":
          "Minimalist desk setup with laptop, coffee cup, and notebook in soft natural light",
      "isCollaborative": false,
      "privacy": "private",
      "description": "Instrumental tracks for concentration",
    },
    {
      "id": 6,
      "title": "Chill Evening",
      "songCount": 27,
      "lastModified": DateTime.now().subtract(Duration(days: 10)),
      "isSystemPlaylist": false,
      "artwork": "https://images.unsplash.com/photo-1705523077366-e34aae65c710",
      "semanticLabel":
          "Cozy living room with warm lamp lighting and comfortable sofa during evening hours",
      "isCollaborative": false,
      "privacy": "public",
      "description": "Relaxing tunes for unwinding",
    },
    {
      "id": 7,
      "title": "Party Hits 2026",
      "songCount": 65,
      "lastModified": DateTime.now().subtract(Duration(days: 12)),
      "isSystemPlaylist": false,
      "artwork": "https://images.unsplash.com/photo-1725206725600-64093591e282",
      "semanticLabel":
          "Crowded concert venue with colorful stage lights and enthusiastic audience with raised hands",
      "isCollaborative": true,
      "privacy": "public",
      "description": "Latest bangers for celebrations",
    },
  ];

  @override
  void initState() {
    super.initState();
    _filteredPlaylists = List.from(_playlists);
    _searchController.addListener(_filterPlaylists);
  }

  @override
  void dispose() {
    _searchController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  void _filterPlaylists() {
    final query = _searchController.text.toLowerCase();
    setState(() {
      if (query.isEmpty) {
        _filteredPlaylists = List.from(_playlists);
      } else {
        _filteredPlaylists = _playlists.where((playlist) {
          final title = (playlist["title"] as String).toLowerCase();
          final description = (playlist["description"] as String? ?? "")
              .toLowerCase();
          return title.contains(query) || description.contains(query);
        }).toList();
      }
    });
  }

  void _toggleMultiSelect() {
    setState(() {
      _isMultiSelectMode = !_isMultiSelectMode;
      if (!_isMultiSelectMode) {
        _selectedPlaylists.clear();
      }
    });
  }

  void _togglePlaylistSelection(int id) {
    setState(() {
      if (_selectedPlaylists.contains(id)) {
        _selectedPlaylists.remove(id);
      } else {
        _selectedPlaylists.add(id);
      }
    });
  }

  void _deleteSelectedPlaylists() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: const Color(0xFF2C2C2C),
        title: Text(
          'Delete Playlists',
          style: Theme.of(
            context,
          ).textTheme.titleLarge?.copyWith(color: const Color(0xFFFFFFFF)),
        ),
        content: Text(
          'Are you sure you want to delete ${_selectedPlaylists.length} playlist(s)?',
          style: Theme.of(
            context,
          ).textTheme.bodyMedium?.copyWith(color: const Color(0xFFB3B3B3)),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text(
              'Cancel',
              style: TextStyle(color: const Color(0xFFB3B3B3)),
            ),
          ),
          TextButton(
            onPressed: () {
              setState(() {
                _playlists.removeWhere(
                  (p) => _selectedPlaylists.contains(p["id"]),
                );
                _filteredPlaylists = List.from(_playlists);
                _selectedPlaylists.clear();
                _isMultiSelectMode = false;
              });
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text('Playlists deleted successfully'),
                  backgroundColor: const Color(0xFF4CAF50),
                ),
              );
            },
            child: Text(
              'Delete',
              style: TextStyle(color: const Color(0xFFCF6679)),
            ),
          ),
        ],
      ),
    );
  }

  void _showCreatePlaylistModal() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => CreatePlaylistModal(
        onPlaylistCreated: (newPlaylist) {
          setState(() {
            _playlists.add(newPlaylist);
            _filteredPlaylists = List.from(_playlists);
          });
        },
      ),
    );
  }

  void _editPlaylist(Map<String, dynamic> playlist) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => CreatePlaylistModal(
        existingPlaylist: playlist,
        onPlaylistCreated: (updatedPlaylist) {
          setState(() {
            final index = _playlists.indexWhere(
              (p) => p["id"] == updatedPlaylist["id"],
            );
            if (index != -1) {
              _playlists[index] = updatedPlaylist;
              _filteredPlaylists = List.from(_playlists);
            }
          });
        },
      ),
    );
  }

  void _deletePlaylist(int id) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: const Color(0xFF2C2C2C),
        title: Text(
          'Delete Playlist',
          style: Theme.of(
            context,
          ).textTheme.titleLarge?.copyWith(color: const Color(0xFFFFFFFF)),
        ),
        content: Text(
          'Are you sure you want to delete this playlist?',
          style: Theme.of(
            context,
          ).textTheme.bodyMedium?.copyWith(color: const Color(0xFFB3B3B3)),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text(
              'Cancel',
              style: TextStyle(color: const Color(0xFFB3B3B3)),
            ),
          ),
          TextButton(
            onPressed: () {
              setState(() {
                _playlists.removeWhere((p) => p["id"] == id);
                _filteredPlaylists = List.from(_playlists);
              });
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text('Playlist deleted successfully'),
                  backgroundColor: const Color(0xFF4CAF50),
                ),
              );
            },
            child: Text(
              'Delete',
              style: TextStyle(color: const Color(0xFFCF6679)),
            ),
          ),
        ],
      ),
    );
  }

  void _sharePlaylist(Map<String, dynamic> playlist) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Sharing "${playlist["title"]}"...'),
        backgroundColor: const Color(0xFF4CAF50),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: Colors.transparent,
      body: RefreshIndicator(
        onRefresh: () async {
          await Future.delayed(Duration(seconds: 1));
          setState(() {
            _filteredPlaylists = List.from(_playlists);
          });
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text('Playlists synced'),
              backgroundColor: theme.colorScheme.primary,
              duration: Duration(seconds: 2),
            ),
          );
        },
        color: theme.colorScheme.primary,
        child: SafeArea(
          child: SingleChildScrollView(
            controller: _scrollController,
            physics: const AlwaysScrollableScrollPhysics(),
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
                child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const SizedBox(height: 20),
                  // Header row with title and actions
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                        'My Playlists',
                        style: theme.textTheme.headlineMedium?.copyWith(
                        color: theme.colorScheme.onSurface,
                          fontWeight: FontWeight.w700,
                          fontSize: 28,
                          letterSpacing: -0.5,
                        ),
                      ),
                      Row(
                        children: [
                          if (_isMultiSelectMode && _selectedPlaylists.isNotEmpty)
                            GestureDetector(
                              onTap: _deleteSelectedPlaylists,
                              child: Container(
                                padding: const EdgeInsets.all(10),
                                decoration: BoxDecoration(
                                  color: const Color(0xFFCF6679).withValues(alpha: 0.2),
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                child: CustomIconWidget(
                                  iconName: 'delete',
                                  color: const Color(0xFFCF6679),
                                  size: 22,
                                ),
                              ),
                            ),
                          const SizedBox(width: 8),
                          GestureDetector(
                            onTap: _toggleMultiSelect,
                            child: Container(
                              padding: const EdgeInsets.all(10),
                              decoration: BoxDecoration(
                                color: _isMultiSelectMode
                                    ? theme.colorScheme.primary.withValues(alpha: 0.2)
                                    : Colors.white.withValues(alpha: 0.08),
                                borderRadius: BorderRadius.circular(12),
                              ),
                              child: CustomIconWidget(
                                iconName: _isMultiSelectMode ? 'close' : 'checklist',
                                color: _isMultiSelectMode
                                    ? theme.colorScheme.primary
                                    : theme.colorScheme.onSurface,
                                size: 22,
                              ),
                      ),
                    ),
                  ],
                ),
                    ],
                  ),
                  const SizedBox(height: 20),
                  // Search bar
                  Container(
                    height: 52,
                          decoration: BoxDecoration(
                      color: Colors.white.withValues(alpha: 0.08),
                      borderRadius: BorderRadius.circular(26),
                            border: Border.all(
                        color: Colors.white.withValues(alpha: 0.1),
                              width: 1,
                            ),
                          ),
                    child: Row(
                      children: [
                        const SizedBox(width: 18),
                        CustomIconWidget(
                          iconName: 'search',
                          color: theme.colorScheme.onSurfaceVariant,
                          size: 22,
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: TextField(
                            controller: _searchController,
                            style: theme.textTheme.bodyLarge?.copyWith(
                              color: theme.colorScheme.onSurface,
                              fontSize: 16,
                            ),
                            decoration: InputDecoration(
                              hintText: 'Search playlists...',
                              hintStyle: theme.textTheme.bodyLarge?.copyWith(
                                color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.5),
                                fontSize: 16,
                              ),
                              border: InputBorder.none,
                              enabledBorder: InputBorder.none,
                              focusedBorder: InputBorder.none,
                              filled: false,
                              isDense: true,
                              contentPadding: EdgeInsets.zero,
                            ),
                          ),
                        ),
                        if (_searchController.text.isNotEmpty)
                          GestureDetector(
                            onTap: () {
                              _searchController.clear();
                              _filterPlaylists();
                            },
                            child: CustomIconWidget(
                              iconName: 'close',
                              color: theme.colorScheme.onSurfaceVariant,
                              size: 18,
                            ),
                          ),
                        const SizedBox(width: 18),
                      ],
                    ),
                  ),
                  const SizedBox(height: 24),
                  // New Playlist button - dashed border style
                  GestureDetector(
                    onTap: _showCreatePlaylistModal,
                    child: Container(
                      padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 16),
                      decoration: BoxDecoration(
                        color: Colors.transparent,
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(
                          color: theme.colorScheme.primary.withValues(alpha: 0.5),
                          width: 1.5,
                          strokeAlign: BorderSide.strokeAlignInside,
                        ),
                      ),
                      child: Row(
                        children: [
                          Container(
                            width: 48,
                            height: 48,
                            decoration: BoxDecoration(
                              color: theme.colorScheme.primary.withValues(alpha: 0.15),
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: Center(
                              child: CustomIconWidget(
                                iconName: 'add',
                                color: theme.colorScheme.primary,
                                size: 28,
                              ),
                            ),
                          ),
                          const SizedBox(width: 16),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'Create New Playlist',
                                style: theme.textTheme.titleMedium?.copyWith(
                                  color: theme.colorScheme.onSurface,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                              const SizedBox(height: 2),
                              Text(
                                'Add your favorite songs',
                                style: theme.textTheme.bodySmall?.copyWith(
                                  color: theme.colorScheme.onSurfaceVariant,
                                ),
                              ),
                            ],
                          ),
                          const Spacer(),
                          CustomIconWidget(
                            iconName: 'chevron_right',
                            color: theme.colorScheme.primary,
                            size: 24,
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 28),
                  // Playlists section header
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'All Playlists',
                        style: theme.textTheme.titleLarge?.copyWith(
                          color: theme.colorScheme.onSurface,
                          fontWeight: FontWeight.w600,
                          fontSize: 20,
                        ),
                      ),
                      Text(
                        '${_filteredPlaylists.length} playlists',
                        style: theme.textTheme.bodyMedium?.copyWith(
                          color: theme.colorScheme.onSurfaceVariant,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  // Playlist content
                  _filteredPlaylists.isEmpty && _searchController.text.isNotEmpty
                      ? _buildEmptySearchState(theme)
                      : _filteredPlaylists.isEmpty
                          ? EmptyStateWidget(onCreatePlaylist: _showCreatePlaylistModal)
                          : ListView.separated(
                              shrinkWrap: true,
                              physics: const NeverScrollableScrollPhysics(),
                              padding: const EdgeInsets.only(bottom: 120),
                      itemCount: _filteredPlaylists.length,
                              separatorBuilder: (context, index) => const SizedBox(height: 12),
                      itemBuilder: (context, index) {
                        final playlist = _filteredPlaylists[index];
                                final isSystemPlaylist = playlist["isSystemPlaylist"] as bool;
                                final isSelected = _selectedPlaylists.contains(playlist["id"]);

                        if (isSystemPlaylist) {
                                  return _buildPlaylistTile(playlist, false, false, theme);
                        }

                        return Slidable(
                          key: ValueKey(playlist["id"]),
                          startActionPane: ActionPane(
                            motion: ScrollMotion(),
                            children: [
                              SlidableAction(
                                onPressed: (context) => _editPlaylist(playlist),
                                backgroundColor: const Color(0xFF2196F3),
                                foregroundColor: Colors.white,
                                icon: Icons.edit_rounded,
                                label: 'Edit',
                                        borderRadius: BorderRadius.circular(12),
                              ),
                              SlidableAction(
                                        onPressed: (context) => _sharePlaylist(playlist),
                                        backgroundColor: theme.colorScheme.primary,
                                foregroundColor: const Color(0xFF121212),
                                icon: Icons.share_rounded,
                                label: 'Share',
                                        borderRadius: BorderRadius.circular(12),
                              ),
                            ],
                          ),
                          endActionPane: ActionPane(
                            motion: ScrollMotion(),
                            children: [
                              SlidableAction(
                                        onPressed: (context) => _deletePlaylist(playlist["id"] as int),
                                backgroundColor: const Color(0xFFCF6679),
                                foregroundColor: Colors.white,
                                icon: Icons.delete_rounded,
                                label: 'Delete',
                                        borderRadius: BorderRadius.circular(12),
                                      ),
                                    ],
                                  ),
                                  child: _buildPlaylistTile(playlist, _isMultiSelectMode, isSelected, theme),
                                );
                              },
                            ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildEmptySearchState(ThemeData theme) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 60),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CustomIconWidget(
              iconName: 'search_off',
              color: theme.colorScheme.onSurfaceVariant,
              size: 64,
            ),
            const SizedBox(height: 16),
            Text(
              'No playlists found',
              style: theme.textTheme.titleMedium?.copyWith(
                color: theme.colorScheme.onSurface,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'Try a different search term',
              style: theme.textTheme.bodyMedium?.copyWith(
                color: theme.colorScheme.onSurfaceVariant,
              ),
                              ),
                            ],
                          ),
      ),
    );
  }

  Widget _buildPlaylistTile(Map<String, dynamic> playlist, bool isMultiSelectMode, bool isSelected, ThemeData theme) {
    return GestureDetector(
                            onTap: () {
        if (isMultiSelectMode) {
                                _togglePlaylistSelection(playlist["id"] as int);
                              } else {
                                Navigator.pushNamed(context, '/playlist-detail', arguments: {
                                  "title": playlist["name"],
                                  "cover": playlist["coverUrl"],
                                  "artist": "Various Artists",
                                  "trackCount": playlist["songCount"],
                                  "duration": "${(playlist["songCount"] as int) * 3} min",
                                });
                              }
                            },
                            onLongPress: () {
        if (!isMultiSelectMode && !(playlist["isSystemPlaylist"] as bool)) {
                                _toggleMultiSelect();
                                _togglePlaylistSelection(playlist["id"] as int);
                              }
                            },
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: isSelected
              ? theme.colorScheme.primary.withValues(alpha: 0.15)
              : Colors.white.withValues(alpha: 0.05),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: isSelected
                ? theme.colorScheme.primary.withValues(alpha: 0.5)
                : Colors.white.withValues(alpha: 0.08),
            width: 1,
          ),
        ),
        child: Row(
          children: [
            // Artwork
            ClipRRect(
              borderRadius: BorderRadius.circular(12),
              child: CustomImageWidget(
                imageUrl: playlist["artwork"] as String,
                width: 60,
                height: 60,
                fit: BoxFit.cover,
                semanticLabel: playlist["semanticLabel"] as String,
              ),
            ),
            const SizedBox(width: 14),
            // Info
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: Text(
                          playlist["title"] as String,
                          style: theme.textTheme.titleMedium?.copyWith(
                            color: theme.colorScheme.onSurface,
                            fontWeight: FontWeight.w600,
                          ),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                      if (playlist["isSystemPlaylist"] as bool)
                        Container(
                          margin: const EdgeInsets.only(left: 8),
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                          decoration: BoxDecoration(
                            color: theme.colorScheme.primary.withValues(alpha: 0.2),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Text(
                            'System',
                            style: theme.textTheme.labelSmall?.copyWith(
                              color: theme.colorScheme.primary,
                              fontSize: 10,
                            ),
                          ),
                        ),
                    ],
                  ),
                  const SizedBox(height: 4),
                  Text(
                    '${playlist["songCount"]} songs',
                    style: theme.textTheme.bodySmall?.copyWith(
                      color: theme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                ],
              ),
            ),
            // Selection or chevron
            if (isMultiSelectMode)
              Container(
                width: 24,
                height: 24,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: isSelected
                      ? theme.colorScheme.primary
                      : Colors.transparent,
                  border: Border.all(
                    color: isSelected
                        ? theme.colorScheme.primary
                        : theme.colorScheme.onSurfaceVariant,
                    width: 2,
                  ),
                ),
                child: isSelected
                    ? Icon(Icons.check, size: 16, color: const Color(0xFF1A1F16))
                    : null,
              )
            else
              CustomIconWidget(
                iconName: 'chevron_right',
                color: theme.colorScheme.onSurfaceVariant,
                size: 24,
                  ),
                ],
              ),
      ),
    );
  }
}
