import 'package:flutter/material.dart';

import '../core/app_export.dart';
import '../presentation/home_dashboard/widgets/mini_player_widget.dart';
import '../services/mini_player_service.dart';

class PersistentMiniPlayerWidget extends StatefulWidget {
  const PersistentMiniPlayerWidget({Key? key}) : super(key: key);

  @override
  State<PersistentMiniPlayerWidget> createState() =>
      _PersistentMiniPlayerWidgetState();
}

class _PersistentMiniPlayerWidgetState extends State<PersistentMiniPlayerWidget>
    with TickerProviderStateMixin {
  final MiniPlayerService _miniPlayerService = MiniPlayerService();
  late AnimationController _slideController;
  late Animation<Offset> _slideAnimation;

  @override
  void initState() {
    super.initState();
    _slideController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );
    _slideAnimation = Tween<Offset>(
      begin: const Offset(0, 1),
      end: Offset.zero,
    ).animate(CurvedAnimation(
      parent: _slideController,
      curve: Curves.easeInOut,
    ));

    _miniPlayerService.addListener(_handleMiniPlayerChange);

    // Show mini player if there's already content
    if (_miniPlayerService.isVisible) {
      _slideController.forward();
    }
  }

  @override
  void dispose() {
    _miniPlayerService.removeListener(_handleMiniPlayerChange);
    _slideController.dispose();
    super.dispose();
  }

  void _handleMiniPlayerChange() {
    if (_miniPlayerService.isVisible) {
      _slideController.forward();
    } else {
      _slideController.reverse();
    }
  }

  void _onExpand() {
    Navigator.pushNamed(context, AppRoutes.audioPlayer);
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _miniPlayerService,
      builder: (context, _) {
        if (!_miniPlayerService.isVisible ||
            _miniPlayerService.currentPodcast == null) {
          return const SizedBox.shrink();
        }

        return SlideTransition(
          position: _slideAnimation,
          child: Container(
            decoration: BoxDecoration(
              boxShadow: [
                BoxShadow(
                  color: AppTheme.lightTheme.colorScheme.shadow
                      .withValues(alpha: 0.1),
                  blurRadius: 10,
                  offset: const Offset(0, -2),
                ),
              ],
            ),
            child: MiniPlayerWidget(
              currentPodcast: _miniPlayerService.currentPodcast,
              isPlaying: _miniPlayerService.isPlaying,
              progress: _miniPlayerService.progress,
              onPlayPause: _miniPlayerService.togglePlayPause,
              onExpand: _onExpand,
              onNext: _miniPlayerService.nextTrack,
              onPrevious: _miniPlayerService.previousTrack,
            ),
          ),
        );
      },
    );
  }
}
