import 'package:flutter/material.dart';

class MiniPlayerService extends ChangeNotifier {
  static final MiniPlayerService _instance = MiniPlayerService._internal();
  factory MiniPlayerService() => _instance;
  MiniPlayerService._internal();

  Map<String, dynamic>? _currentPodcast;
  bool _isPlaying = false;
  double _progress = 0.0;
  bool _isVisible = false;

  Map<String, dynamic>? get currentPodcast => _currentPodcast;
  bool get isPlaying => _isPlaying;
  double get progress => _progress;
  bool get isVisible => _isVisible;

  void playPodcast(Map<String, dynamic> podcast) {
    _currentPodcast = podcast;
    _isPlaying = true;
    _isVisible = true;
    _progress = 0.0;
    notifyListeners();
  }

  void togglePlayPause() {
    _isPlaying = !_isPlaying;
    notifyListeners();
  }

  void updateProgress(double progress) {
    _progress = progress;
    notifyListeners();
  }

  void nextTrack() {
    // Handle next track logic
    notifyListeners();
  }

  void previousTrack() {
    // Handle previous track logic
    notifyListeners();
  }

  void hideMiniPlayer() {
    _isVisible = false;
    _currentPodcast = null;
    _isPlaying = false;
    _progress = 0.0;
    notifyListeners();
  }

  void showMiniPlayer() {
    if (_currentPodcast != null) {
      _isVisible = true;
      notifyListeners();
    }
  }
}
