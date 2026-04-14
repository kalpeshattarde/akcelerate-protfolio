import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../widgets/custom_app_bar.dart';
import './widgets/active_session_widget.dart';
import './widgets/educational_content_widget.dart';
import './widgets/session_history_widget.dart';
import './widgets/weekly_stats_widget.dart';

/// Kick Counter Screen
/// Provides a simple, stress-free interface for tracking fetal movements
/// with large touch targets optimized for one-handed operation
class KickCounter extends StatefulWidget {
  const KickCounter({super.key});

  @override
  State<KickCounter> createState() => _KickCounterState();
}

class _KickCounterState extends State<KickCounter>
    with TickerProviderStateMixin {
  // Session state
  bool _isSessionActive = false;
  int _currentKickCount = 0;
  DateTime? _sessionStartTime;
  Duration _sessionDuration = Duration.zero;

  // Animation controllers
  late AnimationController _pulseController;
  late AnimationController _countAnimationController;
  late Animation<double> _pulseAnimation;
  late Animation<double> _scaleAnimation;

  // Timer for session duration
  DateTime? _lastUpdateTime;

  // Mock session history data
  final List<Map<String, dynamic>> _sessionHistory = [
    {
      "id": 1,
      "date": DateTime.now().subtract(const Duration(days: 1)),
      "duration": const Duration(minutes: 45),
      "kickCount": 12,
      "notes": "Baby was very active after lunch",
      "timeOfDay": "Afternoon"
    },
    {
      "id": 2,
      "date": DateTime.now().subtract(const Duration(days: 2)),
      "duration": const Duration(minutes: 38),
      "kickCount": 10,
      "notes": "",
      "timeOfDay": "Evening"
    },
    {
      "id": 3,
      "date": DateTime.now().subtract(const Duration(days: 3)),
      "duration": const Duration(minutes: 52),
      "kickCount": 15,
      "notes": "Strong movements today",
      "timeOfDay": "Morning"
    },
    {
      "id": 4,
      "date": DateTime.now().subtract(const Duration(days: 4)),
      "duration": const Duration(minutes: 41),
      "kickCount": 11,
      "notes": "",
      "timeOfDay": "Afternoon"
    },
    {
      "id": 5,
      "date": DateTime.now().subtract(const Duration(days: 5)),
      "duration": const Duration(minutes: 35),
      "kickCount": 9,
      "notes": "Gentle movements",
      "timeOfDay": "Evening"
    },
  ];

  @override
  void initState() {
    super.initState();
    _initializeAnimations();
  }

  void _initializeAnimations() {
    // Pulse animation for the counter button
    _pulseController = AnimationController(
      duration: const Duration(milliseconds: 1000),
      vsync: this,
    )..repeat(reverse: true);

    _pulseAnimation = Tween<double>(begin: 1.0, end: 1.05).animate(
      CurvedAnimation(parent: _pulseController, curve: Curves.easeInOut),
    );

    // Scale animation for kick count
    _countAnimationController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );

    _scaleAnimation = Tween<double>(begin: 1.0, end: 1.3).animate(
      CurvedAnimation(
        parent: _countAnimationController,
        curve: Curves.elasticOut,
      ),
    );
  }

  @override
  void dispose() {
    _pulseController.dispose();
    _countAnimationController.dispose();
    super.dispose();
  }

  void _startSession() {
    setState(() {
      _isSessionActive = true;
      _currentKickCount = 0;
      _sessionStartTime = DateTime.now();
      _sessionDuration = Duration.zero;
      _lastUpdateTime = DateTime.now();
    });

    // Start duration timer
    _updateSessionDuration();
  }

  void _updateSessionDuration() {
    if (_isSessionActive && mounted) {
      Future.delayed(const Duration(seconds: 1), () {
        if (_isSessionActive && _sessionStartTime != null) {
          setState(() {
            _sessionDuration = DateTime.now().difference(_sessionStartTime!);
          });
          _updateSessionDuration();
        }
      });
    }
  }

  void _endSession() {
    if (_currentKickCount == 0) {
      _showNoKicksDialog();
      return;
    }

    setState(() {
      _isSessionActive = false;

      // Add session to history
      _sessionHistory.insert(0, {
        "id": _sessionHistory.length + 1,
        "date": _sessionStartTime!,
        "duration": _sessionDuration,
        "kickCount": _currentKickCount,
        "notes": "",
        "timeOfDay": _getTimeOfDay(_sessionStartTime!),
      });
    });

    _showSessionSummary();
  }

  void _incrementKickCount() {
    if (!_isSessionActive) return;

    HapticFeedback.mediumImpact();

    setState(() {
      _currentKickCount++;
    });

    // Trigger count animation
    _countAnimationController.forward(from: 0.0);
  }

  void _showNoKicksDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(
          'No Kicks Recorded',
          style: Theme.of(context).textTheme.titleLarge,
        ),
        content: Text(
          'You haven\'t recorded any kicks yet. Would you like to end this session?',
          style: Theme.of(context).textTheme.bodyMedium,
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Continue Session'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              setState(() {
                _isSessionActive = false;
              });
            },
            child: const Text('End Session'),
          ),
        ],
      ),
    );
  }

  void _showSessionSummary() {
    final theme = Theme.of(context);

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Row(
          children: [
            Icon(
              Icons.check_circle_outline,
              color: theme.colorScheme.primary,
              size: 28,
            ),
            const SizedBox(width: 12),
            Text(
              'Session Complete',
              style: theme.textTheme.titleLarge,
            ),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildSummaryRow(
              'Total Kicks',
              '$_currentKickCount',
              Icons.touch_app_rounded,
              theme,
            ),
            const SizedBox(height: 12),
            _buildSummaryRow(
              'Duration',
              _formatDuration(_sessionDuration),
              Icons.timer_outlined,
              theme,
            ),
            const SizedBox(height: 12),
            _buildSummaryRow(
              'Time',
              _getTimeOfDay(_sessionStartTime!),
              Icons.wb_sunny_outlined,
              theme,
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Close'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              _showAddNotesDialog(_sessionHistory.first);
            },
            child: const Text('Add Notes'),
          ),
        ],
      ),
    );
  }

  Widget _buildSummaryRow(
    String label,
    String value,
    IconData icon,
    ThemeData theme,
  ) {
    return Row(
      children: [
        Icon(
          icon,
          size: 20,
          color: theme.colorScheme.onSurfaceVariant,
        ),
        const SizedBox(width: 8),
        Text(
          '$label: ',
          style: theme.textTheme.bodyMedium?.copyWith(
            color: theme.colorScheme.onSurfaceVariant,
          ),
        ),
        Text(
          value,
          style: theme.textTheme.bodyLarge?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
      ],
    );
  }

  void _showAddNotesDialog(Map<String, dynamic> session) {
    final TextEditingController notesController = TextEditingController(
      text: session["notes"] as String,
    );

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(
          'Add Notes',
          style: Theme.of(context).textTheme.titleLarge,
        ),
        content: TextField(
          controller: notesController,
          maxLines: 4,
          decoration: const InputDecoration(
            hintText: 'Add any observations or notes...',
            border: OutlineInputBorder(),
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              setState(() {
                session["notes"] = notesController.text;
              });
              Navigator.pop(context);
            },
            child: const Text('Save'),
          ),
        ],
      ),
    );
  }

  void _deleteSession(int index) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(
          'Delete Session',
          style: Theme.of(context).textTheme.titleLarge,
        ),
        content: Text(
          'Are you sure you want to delete this session?',
          style: Theme.of(context).textTheme.bodyMedium,
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              setState(() {
                _sessionHistory.removeAt(index);
              });
              Navigator.pop(context);
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: Theme.of(context).colorScheme.error,
            ),
            child: const Text('Delete'),
          ),
        ],
      ),
    );
  }

  void _exportData() {
    // Show export options dialog
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(
          'Export Session Data',
          style: Theme.of(context).textTheme.titleLarge,
        ),
        content: Text(
          'Choose how you would like to share your kick counter data with your healthcare provider.',
          style: Theme.of(context).textTheme.bodyMedium,
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          ElevatedButton.icon(
            onPressed: () {
              Navigator.pop(context);
              _showExportSuccess('Email');
            },
            icon: const Icon(Icons.email_outlined, size: 20),
            label: const Text('Email'),
          ),
        ],
      ),
    );
  }

  void _showExportSuccess(String method) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Session data prepared for $method'),
        behavior: SnackBarBehavior.floating,
        action: SnackBarAction(
          label: 'OK',
          onPressed: () {},
        ),
      ),
    );
  }

  String _formatDuration(Duration duration) {
    final minutes = duration.inMinutes;
    final seconds = duration.inSeconds % 60;
    return '${minutes}m ${seconds}s';
  }

  String _getTimeOfDay(DateTime dateTime) {
    final hour = dateTime.hour;
    if (hour < 12) return 'Morning';
    if (hour < 17) return 'Afternoon';
    return 'Evening';
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      appBar: CustomAppBar.detail(
        title: 'Kick Counter',
        actions: [
          CustomAppBarAction(
            icon: Icons.file_download_outlined,
            onPressed: _exportData,
            tooltip: 'Export Data',
          ),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            children: [
              // Active session or start button
              ActiveSessionWidget(
                isSessionActive: _isSessionActive,
                currentKickCount: _currentKickCount,
                sessionDuration: _sessionDuration,
                pulseAnimation: _pulseAnimation,
                scaleAnimation: _scaleAnimation,
                onStartSession: _startSession,
                onEndSession: _endSession,
                onIncrementKick: _incrementKickCount,
              ),

              const SizedBox(height: 24),

              // Weekly stats
              WeeklyStatsWidget(
                sessionHistory: _sessionHistory,
              ),

              const SizedBox(height: 24),

              // Educational content
              const EducationalContentWidget(),

              const SizedBox(height: 24),

              // Session history
              SessionHistoryWidget(
                sessionHistory: _sessionHistory,
                onDeleteSession: _deleteSession,
                onAddNotes: _showAddNotesDialog,
              ),

              const SizedBox(height: 24),
            ],
          ),
        ),
      ),
    );
  }
}
