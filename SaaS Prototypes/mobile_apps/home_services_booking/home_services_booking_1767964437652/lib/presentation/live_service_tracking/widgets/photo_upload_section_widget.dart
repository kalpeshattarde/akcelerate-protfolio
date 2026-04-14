
import 'package:camera/camera.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class PhotoUploadSectionWidget extends StatefulWidget {
  final List<String> uploadedPhotos;
  final ValueChanged<List<String>>? onPhotosChanged;
  final String title;
  final String subtitle;

  const PhotoUploadSectionWidget({
    super.key,
    required this.uploadedPhotos,
    this.onPhotosChanged,
    this.title = 'Service Documentation',
    this.subtitle = 'Upload photos to document the service progress',
  });

  @override
  State<PhotoUploadSectionWidget> createState() =>
      _PhotoUploadSectionWidgetState();
}

class _PhotoUploadSectionWidgetState extends State<PhotoUploadSectionWidget>
    with TickerProviderStateMixin {
  late AnimationController _uploadController;
  late Animation<double> _uploadAnimation;

  CameraController? _cameraController;
  List<CameraDescription> _cameras = [];
  bool _isCameraInitialized = false;
  bool _isUploading = false;
  XFile? _capturedImage;
  final ImagePicker _imagePicker = ImagePicker();

  @override
  void initState() {
    super.initState();
    _uploadController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );
    _uploadAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _uploadController,
      curve: Curves.easeInOut,
    ));

    _initializeCamera();
  }

  @override
  void dispose() {
    _uploadController.dispose();
    _cameraController?.dispose();
    super.dispose();
  }

  Future<void> _initializeCamera() async {
    try {
      if (!await _requestCameraPermission()) return;

      _cameras = await availableCameras();
      if (_cameras.isEmpty) return;

      final camera = kIsWeb
          ? _cameras.firstWhere(
              (c) => c.lensDirection == CameraLensDirection.front,
              orElse: () => _cameras.first)
          : _cameras.firstWhere(
              (c) => c.lensDirection == CameraLensDirection.back,
              orElse: () => _cameras.first);

      _cameraController = CameraController(
          camera, kIsWeb ? ResolutionPreset.medium : ResolutionPreset.high);

      await _cameraController!.initialize();
      await _applySettings();

      if (mounted) {
        setState(() {
          _isCameraInitialized = true;
        });
      }
    } catch (e) {
      debugPrint('Camera initialization error: $e');
    }
  }

  Future<bool> _requestCameraPermission() async {
    if (kIsWeb) return true;
    return (await Permission.camera.request()).isGranted;
  }

  Future<void> _applySettings() async {
    if (_cameraController == null) return;

    try {
      await _cameraController!.setFocusMode(FocusMode.auto);
      if (!kIsWeb) {
        try {
          await _cameraController!.setFlashMode(FlashMode.auto);
        } catch (e) {
          debugPrint('Flash mode not supported: $e');
        }
      }
    } catch (e) {
      debugPrint('Camera settings error: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Container(
      width: double.infinity,
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: colorScheme.surface,
        borderRadius: BorderRadius.circular(4.w),
        boxShadow: [
          BoxShadow(
            color: colorScheme.shadow.withValues(alpha: 0.1),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildSectionHeader(context),
          SizedBox(height: 3.h),
          _buildUploadButtons(context),
          if (widget.uploadedPhotos.isNotEmpty) ...[
            SizedBox(height: 3.h),
            _buildPhotoGrid(context),
          ],
          if (_isUploading) ...[
            SizedBox(height: 2.h),
            _buildUploadProgress(context),
          ],
        ],
      ),
    );
  }

  Widget _buildSectionHeader(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            CustomIconWidget(
              iconName: 'photo_camera',
              color: colorScheme.primary,
              size: 6.w,
            ),
            SizedBox(width: 3.w),
            Expanded(
              child: Text(
                widget.title,
                style: theme.textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.w600,
                  color: colorScheme.onSurface,
                ),
              ),
            ),
          ],
        ),
        SizedBox(height: 1.h),
        Text(
          widget.subtitle,
          style: theme.textTheme.bodyMedium?.copyWith(
            color: colorScheme.onSurfaceVariant,
          ),
        ),
      ],
    );
  }

  Widget _buildUploadButtons(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Row(
      children: [
        Expanded(
          child: _buildUploadButton(
            context,
            'photo_camera',
            'Take Photo',
            colorScheme.primary,
            _takePhoto,
          ),
        ),
        SizedBox(width: 3.w),
        Expanded(
          child: _buildUploadButton(
            context,
            'photo_library',
            'From Gallery',
            colorScheme.secondary,
            _pickFromGallery,
          ),
        ),
      ],
    );
  }

  Widget _buildUploadButton(
    BuildContext context,
    String iconName,
    String label,
    Color color,
    VoidCallback onTap,
  ) {
    final theme = Theme.of(context);

    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(3.w),
      child: Container(
        padding: EdgeInsets.symmetric(vertical: 2.h),
        decoration: BoxDecoration(
          color: color.withValues(alpha: 0.1),
          borderRadius: BorderRadius.circular(3.w),
          border: Border.all(
            color: color.withValues(alpha: 0.3),
            width: 1,
          ),
        ),
        child: Column(
          children: [
            CustomIconWidget(
              iconName: iconName,
              color: color,
              size: 8.w,
            ),
            SizedBox(height: 1.h),
            Text(
              label,
              style: theme.textTheme.bodyMedium?.copyWith(
                color: color,
                fontWeight: FontWeight.w500,
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPhotoGrid(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Uploaded Photos (${widget.uploadedPhotos.length})',
          style: theme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w600,
            color: colorScheme.onSurface,
          ),
        ),
        SizedBox(height: 2.h),
        GridView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 3,
            crossAxisSpacing: 2.w,
            mainAxisSpacing: 2.w,
            childAspectRatio: 1,
          ),
          itemCount: widget.uploadedPhotos.length,
          itemBuilder: (context, index) {
            return _buildPhotoItem(
                context, widget.uploadedPhotos[index], index);
          },
        ),
      ],
    );
  }

  Widget _buildPhotoItem(BuildContext context, String photoUrl, int index) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Stack(
      children: [
        Container(
          width: double.infinity,
          height: double.infinity,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(3.w),
            border: Border.all(
              color: colorScheme.outline.withValues(alpha: 0.3),
              width: 1,
            ),
          ),
          child: ClipRRect(
            borderRadius: BorderRadius.circular(3.w),
            child: CustomImageWidget(
              imageUrl: photoUrl,
              width: double.infinity,
              height: double.infinity,
              fit: BoxFit.cover,
            ),
          ),
        ),
        Positioned(
          top: 1.w,
          right: 1.w,
          child: InkWell(
            onTap: () => _removePhoto(index),
            borderRadius: BorderRadius.circular(2.w),
            child: Container(
              width: 6.w,
              height: 6.w,
              decoration: BoxDecoration(
                color: colorScheme.error.withValues(alpha: 0.9),
                shape: BoxShape.circle,
              ),
              child: Center(
                child: CustomIconWidget(
                  iconName: 'close',
                  color: Colors.white,
                  size: 4.w,
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildUploadProgress(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return AnimatedBuilder(
      animation: _uploadAnimation,
      builder: (context, child) {
        return Container(
          padding: EdgeInsets.all(3.w),
          decoration: BoxDecoration(
            color: colorScheme.primary.withValues(alpha: 0.1),
            borderRadius: BorderRadius.circular(3.w),
          ),
          child: Row(
            children: [
              SizedBox(
                width: 5.w,
                height: 5.w,
                child: CircularProgressIndicator(
                  strokeWidth: 2,
                  valueColor:
                      AlwaysStoppedAnimation<Color>(colorScheme.primary),
                ),
              ),
              SizedBox(width: 3.w),
              Text(
                'Uploading photo...',
                style: theme.textTheme.bodyMedium?.copyWith(
                  color: colorScheme.primary,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  Future<void> _takePhoto() async {
    if (!_isCameraInitialized || _cameraController == null) {
      await _initializeCamera();
      if (!_isCameraInitialized) return;
    }

    try {
      setState(() => _isUploading = true);
      _uploadController.forward();

      final XFile photo = await _cameraController!.takePicture();
      setState(() => _capturedImage = photo);

      // Simulate upload process
      await Future.delayed(const Duration(seconds: 2));

      final updatedPhotos = List<String>.from(widget.uploadedPhotos);
      updatedPhotos.add(
          'https://picsum.photos/400/400?random=${DateTime.now().millisecondsSinceEpoch}');

      widget.onPhotosChanged?.call(updatedPhotos);

      setState(() => _isUploading = false);
      _uploadController.reverse();
    } catch (e) {
      setState(() => _isUploading = false);
      _uploadController.reverse();
      debugPrint('Photo capture error: $e');
    }
  }

  Future<void> _pickFromGallery() async {
    try {
      setState(() => _isUploading = true);
      _uploadController.forward();

      final XFile? image = await _imagePicker.pickImage(
        source: ImageSource.gallery,
        maxWidth: 1024,
        maxHeight: 1024,
        imageQuality: 85,
      );

      if (image != null) {
        // Simulate upload process
        await Future.delayed(const Duration(seconds: 2));

        final updatedPhotos = List<String>.from(widget.uploadedPhotos);
        updatedPhotos.add(
            'https://picsum.photos/400/400?random=${DateTime.now().millisecondsSinceEpoch}');

        widget.onPhotosChanged?.call(updatedPhotos);
      }

      setState(() => _isUploading = false);
      _uploadController.reverse();
    } catch (e) {
      setState(() => _isUploading = false);
      _uploadController.reverse();
      debugPrint('Gallery pick error: $e');
    }
  }

  void _removePhoto(int index) {
    final updatedPhotos = List<String>.from(widget.uploadedPhotos);
    updatedPhotos.removeAt(index);
    widget.onPhotosChanged?.call(updatedPhotos);
  }
}
