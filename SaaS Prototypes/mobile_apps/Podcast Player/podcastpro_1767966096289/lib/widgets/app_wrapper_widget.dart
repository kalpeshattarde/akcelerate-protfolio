import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../services/mini_player_service.dart';
import './persistent_mini_player_widget.dart';

class AppWrapperWidget extends StatefulWidget {
  final Widget child;

  const AppWrapperWidget({
    Key? key,
    required this.child,
  }) : super(key: key);

  @override
  State<AppWrapperWidget> createState() => _AppWrapperWidgetState();
}

class _AppWrapperWidgetState extends State<AppWrapperWidget> {
  final MiniPlayerService _miniPlayerService = MiniPlayerService();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: Stack(
        children: [
          // Main content
          widget.child,

          // Persistent mini player overlay
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: AnimatedBuilder(
              animation: _miniPlayerService,
              builder: (context, _) {
                return AnimatedContainer(
                  duration: const Duration(milliseconds: 200),
                  height: _miniPlayerService.isVisible ? 12.h : 0,
                  child: const PersistentMiniPlayerWidget(),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
