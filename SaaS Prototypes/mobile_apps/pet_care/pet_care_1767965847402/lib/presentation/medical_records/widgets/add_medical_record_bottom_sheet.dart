import 'dart:io';

import 'package:camera/camera.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:image_picker/image_picker.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class AddMedicalRecordBottomSheet extends StatefulWidget {
  final Function(Map<String, dynamic>) onRecordAdded;

  const AddMedicalRecordBottomSheet({
    super.key,
    required this.onRecordAdded,
  });

  @override
  State<AddMedicalRecordBottomSheet> createState() =>
      _AddMedicalRecordBottomSheetState();
}

class _AddMedicalRecordBottomSheetState
    extends State<AddMedicalRecordBottomSheet> {
  final _formKey = GlobalKey<FormState>();
  final _titleController = TextEditingController();
  final _descriptionController = TextEditingController();
  final _veterinarianController = TextEditingController();
  final _clinicController = TextEditingController();

  String _selectedType = 'Checkup';
  DateTime _selectedDate = DateTime.now();
  List<XFile> _attachments = [];
  bool _isLoading = false;

  final List<String> _recordTypes = [
    'Checkup',
    'Vaccination',
    'Surgery',
    'Illness',
    'Lab Results',
    'Medication',
  ];

  CameraController? _cameraController;
  List<CameraDescription>? _cameras;
  bool _isCameraInitialized = false;
  bool _showCamera = false;

  @override
  void initState() {
    super.initState();
    _initializeCamera();
  }

  @override
  void dispose() {
    _titleController.dispose();
    _descriptionController.dispose();
    _veterinarianController.dispose();
    _clinicController.dispose();
    _cameraController?.dispose();
    super.dispose();
  }

  Future<void> _initializeCamera() async {
    try {
      if (await _requestCameraPermission()) {
        _cameras = await availableCameras();
        if (_cameras != null && _cameras!.isNotEmpty) {
          final camera = kIsWeb
              ? _cameras!.firstWhere(
                  (c) => c.lensDirection == CameraLensDirection.front,
                  orElse: () => _cameras!.first)
              : _cameras!.firstWhere(
                  (c) => c.lensDirection == CameraLensDirection.back,
                  orElse: () => _cameras!.first);

          _cameraController = CameraController(
            camera,
            kIsWeb ? ResolutionPreset.medium : ResolutionPreset.high,
          );

          await _cameraController!.initialize();
          await _applySettings();

          if (mounted) {
            setState(() => _isCameraInitialized = true);
          }
        }
      }
    } catch (e) {
      // Camera initialization failed, continue without camera
      if (mounted) {
        setState(() => _isCameraInitialized = false);
      }
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
          // Flash not supported, continue without
        }
      }
    } catch (e) {
      // Settings not supported, continue without
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      height: 90.h,
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
      ),
      child: Column(
        children: [
          _buildHeader(theme),
          Expanded(
            child: _showCamera ? _buildCameraView(theme) : _buildForm(theme),
          ),
        ],
      ),
    );
  }

  Widget _buildHeader(ThemeData theme) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
        border: Border(
          bottom: BorderSide(
            color: theme.brightness == Brightness.light
                ? const Color(0xFFE1E4E8)
                : const Color(0xFF30363D),
            width: 1,
          ),
        ),
      ),
      child: Column(
        children: [
          Container(
            width: 40,
            height: 4,
            decoration: BoxDecoration(
              color: theme.brightness == Brightness.light
                  ? const Color(0xFFE1E4E8)
                  : const Color(0xFF30363D),
              borderRadius: BorderRadius.circular(2),
            ),
          ),
          SizedBox(height: 2.h),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Add Medical Record',
                style: GoogleFonts.inter(
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                  color: theme.brightness == Brightness.light
                      ? const Color(0xFF1B1F23)
                      : const Color(0xFFE8EAED),
                ),
              ),
              GestureDetector(
                onTap: () => Navigator.pop(context),
                child: CustomIconWidget(
                  iconName: 'close',
                  color: theme.brightness == Brightness.light
                      ? const Color(0xFF6A737D)
                      : const Color(0xFFADB5BD),
                  size: 6.w,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildForm(ThemeData theme) {
    return Form(
      key: _formKey,
      child: SingleChildScrollView(
        padding: EdgeInsets.all(4.w),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildTypeSelector(theme),
            SizedBox(height: 3.h),
            _buildTitleField(theme),
            SizedBox(height: 3.h),
            _buildDateSelector(theme),
            SizedBox(height: 3.h),
            _buildVeterinarianField(theme),
            SizedBox(height: 3.h),
            _buildClinicField(theme),
            SizedBox(height: 3.h),
            _buildDescriptionField(theme),
            SizedBox(height: 3.h),
            _buildAttachmentsSection(theme),
            SizedBox(height: 10.h),
          ],
        ),
      ),
    );
  }

  Widget _buildTypeSelector(ThemeData theme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Record Type',
          style: GoogleFonts.inter(
            fontSize: 14,
            fontWeight: FontWeight.w600,
            color: theme.brightness == Brightness.light
                ? const Color(0xFF1B1F23)
                : const Color(0xFFE8EAED),
          ),
        ),
        SizedBox(height: 1.h),
        Wrap(
          spacing: 2.w,
          runSpacing: 1.h,
          children: _recordTypes.map((type) {
            final isSelected = _selectedType == type;
            return GestureDetector(
              onTap: () => setState(() => _selectedType = type),
              child: Container(
                padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 1.h),
                decoration: BoxDecoration(
                  color: isSelected
                      ? (theme.brightness == Brightness.light
                          ? const Color(0xFF2B5F75)
                          : const Color(0xFF4A8BA3))
                      : theme.colorScheme.surface,
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(
                    color: isSelected
                        ? (theme.brightness == Brightness.light
                            ? const Color(0xFF2B5F75)
                            : const Color(0xFF4A8BA3))
                        : theme.brightness == Brightness.light
                            ? const Color(0xFFE1E4E8)
                            : const Color(0xFF30363D),
                  ),
                ),
                child: Text(
                  type.toUpperCase(),
                  style: GoogleFonts.inter(
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                    color: isSelected
                        ? Colors.white
                        : theme.brightness == Brightness.light
                            ? const Color(0xFF1B1F23)
                            : const Color(0xFFE8EAED),
                  ),
                ),
              ),
            );
          }).toList(),
        ),
      ],
    );
  }

  Widget _buildTitleField(ThemeData theme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Title *',
          style: GoogleFonts.inter(
            fontSize: 14,
            fontWeight: FontWeight.w600,
            color: theme.brightness == Brightness.light
                ? const Color(0xFF1B1F23)
                : const Color(0xFFE8EAED),
          ),
        ),
        SizedBox(height: 1.h),
        TextFormField(
          controller: _titleController,
          style: GoogleFonts.inter(
            fontSize: 14,
            fontWeight: FontWeight.w400,
            color: theme.brightness == Brightness.light
                ? const Color(0xFF1B1F23)
                : const Color(0xFFE8EAED),
          ),
          decoration: _inputDecoration(theme, 'Enter record title'),
          validator: (value) {
            if (value?.isEmpty ?? true) {
              return 'Title is required';
            }
            return null;
          },
        ),
      ],
    );
  }

  Widget _buildDateSelector(ThemeData theme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Date',
          style: GoogleFonts.inter(
            fontSize: 14,
            fontWeight: FontWeight.w600,
            color: theme.brightness == Brightness.light
                ? const Color(0xFF1B1F23)
                : const Color(0xFFE8EAED),
          ),
        ),
        SizedBox(height: 1.h),
        GestureDetector(
          onTap: () => _selectDate(context),
          child: Container(
            padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
            decoration: BoxDecoration(
              color: theme.colorScheme.surface,
              borderRadius: BorderRadius.circular(8),
              border: Border.all(
                color: theme.brightness == Brightness.light
                    ? const Color(0xFFE1E4E8)
                    : const Color(0xFF30363D),
                width: 1,
              ),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  '${_selectedDate.month}/${_selectedDate.day}/${_selectedDate.year}',
                  style: GoogleFonts.inter(
                    fontSize: 14,
                    fontWeight: FontWeight.w400,
                    color: theme.brightness == Brightness.light
                        ? const Color(0xFF1B1F23)
                        : const Color(0xFFE8EAED),
                  ),
                ),
                CustomIconWidget(
                  iconName: 'calendar_today',
                  color: theme.brightness == Brightness.light
                      ? const Color(0xFF6A737D)
                      : const Color(0xFFADB5BD),
                  size: 5.w,
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildVeterinarianField(ThemeData theme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Veterinarian',
          style: GoogleFonts.inter(
            fontSize: 14,
            fontWeight: FontWeight.w600,
            color: theme.brightness == Brightness.light
                ? const Color(0xFF1B1F23)
                : const Color(0xFFE8EAED),
          ),
        ),
        SizedBox(height: 1.h),
        TextFormField(
          controller: _veterinarianController,
          style: GoogleFonts.inter(
            fontSize: 14,
            fontWeight: FontWeight.w400,
            color: theme.brightness == Brightness.light
                ? const Color(0xFF1B1F23)
                : const Color(0xFFE8EAED),
          ),
          decoration: _inputDecoration(theme, 'Dr. Smith'),
        ),
      ],
    );
  }

  Widget _buildClinicField(ThemeData theme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Clinic/Hospital',
          style: GoogleFonts.inter(
            fontSize: 14,
            fontWeight: FontWeight.w600,
            color: theme.brightness == Brightness.light
                ? const Color(0xFF1B1F23)
                : const Color(0xFFE8EAED),
          ),
        ),
        SizedBox(height: 1.h),
        TextFormField(
          controller: _clinicController,
          style: GoogleFonts.inter(
            fontSize: 14,
            fontWeight: FontWeight.w400,
            color: theme.brightness == Brightness.light
                ? const Color(0xFF1B1F23)
                : const Color(0xFFE8EAED),
          ),
          decoration: _inputDecoration(theme, 'Animal Hospital'),
        ),
      ],
    );
  }

  Widget _buildDescriptionField(ThemeData theme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Description',
          style: GoogleFonts.inter(
            fontSize: 14,
            fontWeight: FontWeight.w600,
            color: theme.brightness == Brightness.light
                ? const Color(0xFF1B1F23)
                : const Color(0xFFE8EAED),
          ),
        ),
        SizedBox(height: 1.h),
        TextFormField(
          controller: _descriptionController,
          style: GoogleFonts.inter(
            fontSize: 14,
            fontWeight: FontWeight.w400,
            color: theme.brightness == Brightness.light
                ? const Color(0xFF1B1F23)
                : const Color(0xFFE8EAED),
          ),
          decoration: _inputDecoration(theme, 'Enter details about the record'),
          maxLines: 4,
        ),
      ],
    );
  }

  Widget _buildAttachmentsSection(ThemeData theme) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'Attachments',
              style: GoogleFonts.inter(
                fontSize: 12,
                fontWeight: FontWeight.w600,
                color: theme.brightness == Brightness.light
                    ? const Color(0xFF1B1F23)
                    : const Color(0xFFE8EAED),
              ),
            ),
            Row(
              children: [
                GestureDetector(
                  onTap: _pickImageFromGallery,
                  child: Container(
                    padding: EdgeInsets.all(2.w),
                    decoration: BoxDecoration(
                      color: theme.brightness == Brightness.light
                          ? const Color(0xFF2B5F75).withValues(alpha: 0.1)
                          : const Color(0xFF4A8BA3).withValues(alpha: 0.2),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: CustomIconWidget(
                      iconName: 'photo_library',
                      color: theme.brightness == Brightness.light
                          ? const Color(0xFF2B5F75)
                          : const Color(0xFF4A8BA3),
                      size: 5.w,
                    ),
                  ),
                ),
                SizedBox(width: 2.w),
                if (_isCameraInitialized)
                  GestureDetector(
                    onTap: () => setState(() => _showCamera = true),
                    child: Container(
                      padding: EdgeInsets.all(2.w),
                      decoration: BoxDecoration(
                        color: theme.brightness == Brightness.light
                            ? const Color(0xFF2B5F75).withValues(alpha: 0.1)
                            : const Color(0xFF4A8BA3).withValues(alpha: 0.2),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: CustomIconWidget(
                        iconName: 'camera_alt',
                        color: theme.brightness == Brightness.light
                            ? const Color(0xFF2B5F75)
                            : const Color(0xFF4A8BA3),
                        size: 5.w,
                      ),
                    ),
                  ),
              ],
            ),
          ],
        ),
        SizedBox(height: 2.h),
        if (_attachments.isNotEmpty)
          SizedBox(
            height: 20.w,
            child: ListView.separated(
              scrollDirection: Axis.horizontal,
              itemCount: _attachments.length,
              separatorBuilder: (context, index) => SizedBox(width: 2.w),
              itemBuilder: (context, index) {
                return _buildAttachmentThumbnail(
                    _attachments[index], theme, index);
              },
            ),
          )
        else
          Container(
            width: double.infinity,
            height: 15.h,
            decoration: BoxDecoration(
              color: theme.brightness == Brightness.light
                  ? const Color(0xFFF6F8FA)
                  : const Color(0xFF21262D),
              borderRadius: BorderRadius.circular(8),
              border: Border.all(
                color: theme.brightness == Brightness.light
                    ? const Color(0xFFE1E4E8)
                    : const Color(0xFF30363D),
                width: 1,
              ),
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                CustomIconWidget(
                  iconName: 'add_photo_alternate',
                  color: theme.brightness == Brightness.light
                      ? const Color(0xFF6A737D)
                      : const Color(0xFFADB5BD),
                  size: 8.w,
                ),
                SizedBox(height: 1.h),
                Text(
                  'Add photos or documents',
                  style: GoogleFonts.inter(
                    fontSize: 12,
                    fontWeight: FontWeight.w400,
                    color: theme.brightness == Brightness.light
                        ? const Color(0xFF6A737D)
                        : const Color(0xFFADB5BD),
                  ),
                ),
              ],
            ),
          ),
      ],
    );
  }

  Widget _buildAttachmentThumbnail(
      XFile attachment, ThemeData theme, int index) {
    return Stack(
      children: [
        Container(
          width: 20.w,
          height: 20.w,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(8),
            border: Border.all(
              color: theme.brightness == Brightness.light
                  ? const Color(0xFFE1E4E8)
                  : const Color(0xFF30363D),
              width: 1,
            ),
          ),
          child: ClipRRect(
            borderRadius: BorderRadius.circular(7),
            child: kIsWeb
                ? Image.network(
                    attachment.path,
                    width: 20.w,
                    height: 20.w,
                    fit: BoxFit.cover,
                  )
                : Image.file(
                    File(attachment.path),
                    width: 20.w,
                    height: 20.w,
                    fit: BoxFit.cover,
                  ),
          ),
        ),
        Positioned(
          top: 1.w,
          right: 1.w,
          child: GestureDetector(
            onTap: () => setState(() => _attachments.removeAt(index)),
            child: Container(
              width: 6.w,
              height: 6.w,
              decoration: BoxDecoration(
                color: AppTheme.errorLight,
                shape: BoxShape.circle,
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: 0.2),
                    blurRadius: 2,
                    offset: const Offset(0, 1),
                  ),
                ],
              ),
              child: CustomIconWidget(
                iconName: 'close',
                color: Colors.white,
                size: 3.w,
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildCameraView(ThemeData theme) {
    if (!_isCameraInitialized || _cameraController == null) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CircularProgressIndicator(),
            SizedBox(height: 2.h),
            Text(
              'Initializing camera...',
              style: GoogleFonts.inter(
                fontSize: 12,
                fontWeight: FontWeight.w400,
                color: theme.brightness == Brightness.light
                    ? const Color(0xFF6A737D)
                    : const Color(0xFFADB5BD),
              ),
            ),
          ],
        ),
      );
    }

    return Column(
      children: [
        Expanded(
          child: Container(
            width: double.infinity,
            child: CameraPreview(_cameraController!),
          ),
        ),
        Container(
          padding: EdgeInsets.all(4.w),
          color: Colors.black,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              GestureDetector(
                onTap: _pickImageFromGallery,
                child: Container(
                  width: 12.w,
                  height: 12.w,
                  decoration: BoxDecoration(
                    color: Colors.white.withValues(alpha: 0.2),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: CustomIconWidget(
                    iconName: 'photo_library',
                    color: Colors.white,
                    size: 6.w,
                  ),
                ),
              ),
              GestureDetector(
                onTap: _capturePhoto,
                child: Container(
                  width: 16.w,
                  height: 16.w,
                  decoration: BoxDecoration(
                    color: Colors.white,
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: Colors.white,
                      width: 3,
                    ),
                  ),
                  child: Container(
                    margin: EdgeInsets.all(1.w),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      shape: BoxShape.circle,
                    ),
                  ),
                ),
              ),
              Container(
                width: 12.w,
                height: 12.w,
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildActionButtons(ThemeData theme) {
    return Row(
      children: [
        Expanded(
          child: TextButton(
            onPressed: _isLoading ? null : () => Navigator.pop(context),
            style: TextButton.styleFrom(
              padding: EdgeInsets.symmetric(vertical: 2.h),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(8),
                side: BorderSide(
                  color: theme.brightness == Brightness.light
                      ? const Color(0xFFE1E4E8)
                      : const Color(0xFF30363D),
                ),
              ),
            ),
            child: Text(
              'Cancel',
              style: GoogleFonts.inter(
                fontSize: 14,
                fontWeight: FontWeight.w600,
                color: theme.brightness == Brightness.light
                    ? const Color(0xFF1B1F23)
                    : const Color(0xFFE8EAED),
              ),
            ),
          ),
        ),
        SizedBox(width: 4.w),
        Expanded(
          child: ElevatedButton(
            onPressed: _isLoading ? null : _saveRecord,
            style: ElevatedButton.styleFrom(
              backgroundColor: theme.brightness == Brightness.light
                  ? const Color(0xFF2B5F75)
                  : const Color(0xFF4A8BA3),
              foregroundColor: Colors.white,
              padding: EdgeInsets.symmetric(vertical: 2.h),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(8),
              ),
            ),
            child: _isLoading
                ? SizedBox(
                    width: 5.w,
                    height: 5.w,
                    child: CircularProgressIndicator(
                      strokeWidth: 2,
                      valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                    ),
                  )
                : Text(
                    'Save Record',
                    style: GoogleFonts.inter(
                      fontSize: 14,
                      fontWeight: FontWeight.w600,
                      color: Colors.white,
                    ),
                  ),
          ),
        ),
      ],
    );
  }

  InputDecoration _inputDecoration(ThemeData theme, String hintText) {
    return InputDecoration(
      hintText: hintText,
      hintStyle: GoogleFonts.inter(
        fontSize: 14,
        fontWeight: FontWeight.w400,
        color: theme.brightness == Brightness.light
            ? const Color(0xFF959DA5)
            : const Color(0xFF6A737D),
      ),
      filled: true,
      fillColor: theme.colorScheme.surface,
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(8),
        borderSide: BorderSide(
          color: theme.brightness == Brightness.light
              ? const Color(0xFFE1E4E8)
              : const Color(0xFF30363D),
          width: 1,
        ),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(8),
        borderSide: BorderSide(
          color: theme.brightness == Brightness.light
              ? const Color(0xFFE1E4E8)
              : const Color(0xFF30363D),
          width: 1,
        ),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(8),
        borderSide: BorderSide(
          color: theme.brightness == Brightness.light
              ? const Color(0xFF2B5F75)
              : const Color(0xFF4A8BA3),
          width: 2,
        ),
      ),
      contentPadding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 2.h),
    );
  }

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: _selectedDate,
      firstDate: DateTime(2000),
      lastDate: DateTime.now(),
    );
    if (picked != null && picked != _selectedDate) {
      setState(() => _selectedDate = picked);
    }
  }

  Future<void> _pickImageFromGallery() async {
    try {
      final ImagePicker picker = ImagePicker();
      final XFile? image = await picker.pickImage(source: ImageSource.gallery);
      if (image != null) {
        setState(() => _attachments.add(image));
        if (_showCamera) {
          setState(() => _showCamera = false);
        }
      }
    } catch (e) {
      // Handle error silently
    }
  }

  Future<void> _capturePhoto() async {
    if (_cameraController == null || !_cameraController!.value.isInitialized)
      return;

    try {
      final XFile photo = await _cameraController!.takePicture();
      setState(() {
        _attachments.add(photo);
        _showCamera = false;
      });
    } catch (e) {
      // Handle error silently
    }
  }

  Future<void> _saveRecord() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() => _isLoading = true);

    try {
      final record = {
        'id': DateTime.now().millisecondsSinceEpoch,
        'title': _titleController.text,
        'type': _selectedType.toLowerCase(),
        'date':
            '${_selectedDate.month}/${_selectedDate.day}/${_selectedDate.year}',
        'veterinarian': _veterinarianController.text.isNotEmpty
            ? _veterinarianController.text
            : 'Unknown',
        'clinic': _clinicController.text,
        'description': _descriptionController.text,
        'attachments': _attachments
            .map((file) => {
                  'type': 'image',
                  'url': file.path,
                  'name': file.name,
                })
            .toList(),
        'isExpanded': false,
        'createdAt': DateTime.now().toIso8601String(),
      };

      widget.onRecordAdded(record);
      Navigator.pop(context);
    } catch (e) {
      // Handle error
    } finally {
      setState(() => _isLoading = false);
    }
  }
}