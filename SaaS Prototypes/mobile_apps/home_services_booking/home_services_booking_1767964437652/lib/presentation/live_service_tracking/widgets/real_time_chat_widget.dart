import 'dart:io' if (dart.library.io) 'dart:io';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:record/record.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../widgets/custom_icon_widget.dart';

class RealTimeChatWidget extends StatefulWidget {
  final List<Map<String, dynamic>> messages;
  final ValueChanged<Map<String, dynamic>>? onMessageSent;
  final Map<String, dynamic> providerData;

  const RealTimeChatWidget({
    super.key,
    required this.messages,
    this.onMessageSent,
    required this.providerData,
  });

  @override
  State<RealTimeChatWidget> createState() => _RealTimeChatWidgetState();
}

class _RealTimeChatWidgetState extends State<RealTimeChatWidget>
    with TickerProviderStateMixin {
  late AnimationController _sendController;
  late AnimationController _recordController;
  late Animation<double> _sendAnimation;
  late Animation<double> _recordAnimation;

  final TextEditingController _messageController = TextEditingController();
  final ScrollController _scrollController = ScrollController();
  final AudioRecorder _audioRecorder = AudioRecorder();

  bool _isRecording = false;
  bool _isTyping = false;
  String? _recordingPath;

  @override
  void initState() {
    super.initState();
    _sendController = AnimationController(
      duration: const Duration(milliseconds: 200),
      vsync: this,
    );
    _recordController = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    );

    _sendAnimation = Tween<double>(
      begin: 1.0,
      end: 0.9,
    ).animate(CurvedAnimation(
      parent: _sendController,
      curve: Curves.easeInOut,
    ));

    _recordAnimation = Tween<double>(
      begin: 1.0,
      end: 1.3,
    ).animate(CurvedAnimation(
      parent: _recordController,
      curve: Curves.easeInOut,
    ));

    _messageController.addListener(() {
      setState(() {
        _isTyping = _messageController.text.isNotEmpty;
      });
    });

    WidgetsBinding.instance.addPostFrameCallback((_) {
      _scrollToBottom();
    });
  }

  @override
  void dispose() {
    _sendController.dispose();
    _recordController.dispose();
    _messageController.dispose();
    _scrollController.dispose();
    _audioRecorder.dispose();
    super.dispose();
  }

  void _scrollToBottom() {
    if (_scrollController.hasClients) {
      _scrollController.animateTo(
        _scrollController.position.maxScrollExtent,
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeOut,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Container(
      height: 50.h,
      decoration: BoxDecoration(
        color: colorScheme.surface,
        borderRadius: BorderRadius.vertical(
          top: Radius.circular(6.w),
        ),
        boxShadow: [
          BoxShadow(
            color: colorScheme.shadow.withValues(alpha: 0.2),
            blurRadius: 16,
            offset: const Offset(0, -4),
          ),
        ],
      ),
      child: Column(
        children: [
          _buildChatHeader(context),
          Expanded(
            child: _buildMessagesList(context),
          ),
          _buildMessageInput(context),
        ],
      ),
    );
  }

  Widget _buildChatHeader(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    final providerName = widget.providerData['name'] as String? ?? 'John Smith';

    return Container(
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        border: Border(
          bottom: BorderSide(
            color: colorScheme.outline.withValues(alpha: 0.2),
            width: 1,
          ),
        ),
      ),
      child: Row(
        children: [
          Container(
            width: 2.w,
            height: 6.h,
            decoration: BoxDecoration(
              color: colorScheme.primary,
              borderRadius: BorderRadius.circular(1.w),
            ),
          ),
          SizedBox(width: 4.w),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Chat with $providerName',
                  style: theme.textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w600,
                    color: colorScheme.onSurface,
                  ),
                ),
                Text(
                  'Online now',
                  style: theme.textTheme.bodySmall?.copyWith(
                    color: Colors.green,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ],
            ),
          ),
          InkWell(
            onTap: () => Navigator.pop(context),
            borderRadius: BorderRadius.circular(2.w),
            child: Container(
              padding: EdgeInsets.all(2.w),
              child: CustomIconWidget(
                iconName: 'keyboard_arrow_down',
                color: colorScheme.onSurfaceVariant,
                size: 6.w,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMessagesList(BuildContext context) {
    return ListView.builder(
      controller: _scrollController,
      padding: EdgeInsets.all(4.w),
      itemCount: widget.messages.length,
      itemBuilder: (context, index) {
        final message = widget.messages[index];
        final isUser = message['isUser'] as bool? ?? false;

        return _buildMessageBubble(context, message, isUser);
      },
    );
  }

  Widget _buildMessageBubble(
    BuildContext context,
    Map<String, dynamic> message,
    bool isUser,
  ) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    final messageText = message['text'] as String? ?? '';
    final messageType = message['type'] as String? ?? 'text';
    final timestamp = message['timestamp'] as String? ?? '12:30 PM';

    return Padding(
      padding: EdgeInsets.only(bottom: 2.h),
      child: Row(
        mainAxisAlignment:
            isUser ? MainAxisAlignment.end : MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          if (!isUser) ...[
            CircleAvatar(
              radius: 4.w,
              backgroundColor: colorScheme.primary,
              child: CustomIconWidget(
                iconName: 'person',
                color: Colors.white,
                size: 4.w,
              ),
            ),
            SizedBox(width: 2.w),
          ],
          Flexible(
            child: Container(
              constraints: BoxConstraints(maxWidth: 70.w),
              padding: EdgeInsets.symmetric(
                horizontal: 4.w,
                vertical: 2.h,
              ),
              decoration: BoxDecoration(
                color: isUser
                    ? colorScheme.primary
                    : colorScheme.surfaceContainerHighest,
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(4.w),
                  topRight: Radius.circular(4.w),
                  bottomLeft: Radius.circular(isUser ? 4.w : 1.w),
                  bottomRight: Radius.circular(isUser ? 1.w : 4.w),
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (messageType == 'voice')
                    _buildVoiceMessage(context, message, isUser)
                  else
                    Text(
                      messageText,
                      style: theme.textTheme.bodyMedium?.copyWith(
                        color: isUser ? Colors.white : colorScheme.onSurface,
                      ),
                    ),
                  SizedBox(height: 0.5.h),
                  Text(
                    timestamp,
                    style: theme.textTheme.bodySmall?.copyWith(
                      color: isUser
                          ? Colors.white.withValues(alpha: 0.7)
                          : colorScheme.onSurfaceVariant,
                    ),
                  ),
                ],
              ),
            ),
          ),
          if (isUser) ...[
            SizedBox(width: 2.w),
            CircleAvatar(
              radius: 4.w,
              backgroundColor: colorScheme.secondary,
              child: CustomIconWidget(
                iconName: 'person',
                color: Colors.white,
                size: 4.w,
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildVoiceMessage(
    BuildContext context,
    Map<String, dynamic> message,
    bool isUser,
  ) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    final duration = message['duration'] as String? ?? '0:15';

    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        InkWell(
          onTap: () => _playVoiceMessage(message),
          borderRadius: BorderRadius.circular(2.w),
          child: Container(
            padding: EdgeInsets.all(2.w),
            decoration: BoxDecoration(
              color: isUser
                  ? Colors.white.withValues(alpha: 0.2)
                  : colorScheme.primary.withValues(alpha: 0.1),
              shape: BoxShape.circle,
            ),
            child: CustomIconWidget(
              iconName: 'play_arrow',
              color: isUser ? Colors.white : colorScheme.primary,
              size: 5.w,
            ),
          ),
        ),
        SizedBox(width: 3.w),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                height: 0.5.h,
                decoration: BoxDecoration(
                  color: isUser
                      ? Colors.white.withValues(alpha: 0.3)
                      : colorScheme.primary.withValues(alpha: 0.3),
                  borderRadius: BorderRadius.circular(0.25.h),
                ),
                child: FractionallySizedBox(
                  alignment: Alignment.centerLeft,
                  widthFactor: 0.6,
                  child: Container(
                    decoration: BoxDecoration(
                      color: isUser ? Colors.white : colorScheme.primary,
                      borderRadius: BorderRadius.circular(0.25.h),
                    ),
                  ),
                ),
              ),
              SizedBox(height: 0.5.h),
              Text(
                duration,
                style: theme.textTheme.bodySmall?.copyWith(
                  color: isUser
                      ? Colors.white.withValues(alpha: 0.8)
                      : colorScheme.onSurfaceVariant,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildMessageInput(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Container(
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        border: Border(
          top: BorderSide(
            color: colorScheme.outline.withValues(alpha: 0.2),
            width: 1,
          ),
        ),
      ),
      child: SafeArea(
        child: Row(
          children: [
            Expanded(
              child: Container(
                decoration: BoxDecoration(
                  color: colorScheme.surfaceContainerHighest,
                  borderRadius: BorderRadius.circular(6.w),
                ),
                child: TextField(
                  controller: _messageController,
                  decoration: InputDecoration(
                    hintText: 'Type a message...',
                    hintStyle: theme.textTheme.bodyMedium?.copyWith(
                      color: colorScheme.onSurfaceVariant,
                    ),
                    border: InputBorder.none,
                    contentPadding: EdgeInsets.symmetric(
                      horizontal: 4.w,
                      vertical: 2.h,
                    ),
                  ),
                  maxLines: null,
                  textCapitalization: TextCapitalization.sentences,
                ),
              ),
            ),
            SizedBox(width: 2.w),
            AnimatedBuilder(
              animation: _recordAnimation,
              builder: (context, child) {
                return Transform.scale(
                  scale: _isRecording ? _recordAnimation.value : 1.0,
                  child: InkWell(
                    onTap: _isTyping ? _sendMessage : _toggleRecording,
                    onLongPress: !_isTyping ? _startRecording : null,
                    borderRadius: BorderRadius.circular(6.w),
                    child: Container(
                      width: 12.w,
                      height: 12.w,
                      decoration: BoxDecoration(
                        color: _isRecording
                            ? Colors.red
                            : (_isTyping
                                ? colorScheme.primary
                                : colorScheme.secondary),
                        shape: BoxShape.circle,
                      ),
                      child: Center(
                        child: AnimatedBuilder(
                          animation: _sendAnimation,
                          builder: (context, child) {
                            return Transform.scale(
                              scale: _sendAnimation.value,
                              child: CustomIconWidget(
                                iconName: _isRecording
                                    ? 'stop'
                                    : (_isTyping ? 'send' : 'mic'),
                                color: Colors.white,
                                size: 6.w,
                              ),
                            );
                          },
                        ),
                      ),
                    ),
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }

  void _sendMessage() {
    if (_messageController.text.trim().isEmpty) return;

    _sendController.forward().then((_) {
      _sendController.reverse();
    });

    final message = {
      'text': _messageController.text.trim(),
      'type': 'text',
      'isUser': true,
      'timestamp': _formatCurrentTime(),
    };

    widget.onMessageSent?.call(message);
    _messageController.clear();

    // Simulate provider response
    Future.delayed(const Duration(seconds: 2), () {
      final responses = [
        'Got it! I\'ll take care of that.',
        'Thanks for the update. Almost done here.',
        'Perfect! I\'ll make sure to handle that properly.',
        'Understood. I\'ll keep you posted on the progress.',
      ];

      final response = {
        'text': responses[DateTime.now().millisecond % responses.length],
        'type': 'text',
        'isUser': false,
        'timestamp': _formatCurrentTime(),
      };

      widget.onMessageSent?.call(response);
    });

    WidgetsBinding.instance.addPostFrameCallback((_) {
      _scrollToBottom();
    });
  }

  Future<void> _toggleRecording() async {
    if (_isRecording) {
      await _stopRecording();
    } else {
      await _startRecording();
    }
  }

  Future<void> _startRecording() async {
    try {
      if (kIsWeb || await Permission.microphone.request().isGranted) {
        setState(() => _isRecording = true);
        _recordController.repeat(reverse: true);

        if (kIsWeb) {
          await _audioRecorder.start(
            const RecordConfig(encoder: AudioEncoder.wav),
            path: 'recording.wav',
          );
        } else {
          final directory = Directory.systemTemp;
          final path =
              '${directory.path}/recording_${DateTime.now().millisecondsSinceEpoch}.m4a';
          await _audioRecorder.start(const RecordConfig(), path: path);
          _recordingPath = path;
        }
      }
    } catch (e) {
      setState(() => _isRecording = false);
      _recordController.stop();
      debugPrint('Recording start error: $e');
    }
  }

  Future<void> _stopRecording() async {
    try {
      final path = await _audioRecorder.stop();
      setState(() => _isRecording = false);
      _recordController.stop();
      _recordController.reset();

      if (path != null) {
        final voiceMessage = {
          'type': 'voice',
          'path': path,
          'duration': '0:15',
          'isUser': true,
          'timestamp': _formatCurrentTime(),
        };

        widget.onMessageSent?.call(voiceMessage);

        WidgetsBinding.instance.addPostFrameCallback((_) {
          _scrollToBottom();
        });
      }
    } catch (e) {
      setState(() => _isRecording = false);
      _recordController.stop();
      debugPrint('Recording stop error: $e');
    }
  }

  void _playVoiceMessage(Map<String, dynamic> message) {
    // Play voice message
    debugPrint('Playing voice message: ${message['path']}');
  }

  String _formatCurrentTime() {
    final now = DateTime.now();
    final hour =
        now.hour > 12 ? now.hour - 12 : (now.hour == 0 ? 12 : now.hour);
    final minute = now.minute.toString().padLeft(2, '0');
    final period = now.hour >= 12 ? 'PM' : 'AM';
    return '$hour:$minute $period';
  }
}
