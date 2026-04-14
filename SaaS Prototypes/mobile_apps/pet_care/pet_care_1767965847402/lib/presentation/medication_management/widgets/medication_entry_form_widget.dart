import 'package:camera/camera.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class MedicationEntryFormWidget extends StatefulWidget {
  final Function(Map<String, dynamic>) onSave;
  final Map<String, dynamic>? existingMedication;

  const MedicationEntryFormWidget({
    super.key,
    required this.onSave,
    this.existingMedication,
  });

  @override
  State<MedicationEntryFormWidget> createState() =>
      _MedicationEntryFormWidgetState();
}

class _MedicationEntryFormWidgetState extends State<MedicationEntryFormWidget> {
  final _formKey = GlobalKey<FormState>();
  final _medicationNameController = TextEditingController();
  final _dosageController = TextEditingController();
  final _instructionsController = TextEditingController();
  final _durationController = TextEditingController();

  String _selectedPet = '';
  String _selectedFrequency = 'Once daily';
  String _selectedDuration = 'Days';
  TimeOfDay _selectedTime = TimeOfDay.now();
  DateTime _startDate = DateTime.now();

  CameraController? _cameraController;
  List<CameraDescription> _cameras = [];
  XFile? _capturedImage;
  bool _isCameraInitialized = false;
  bool _showCamera = false;

  final List<String> _frequencyOptions = [
    'Once daily',
    'Twice daily',
    'Three times daily',
    'Four times daily',
    'Every 8 hours',
    'Every 12 hours',
    'As needed',
    'Custom',
  ];

  final List<String> _durationOptions = ['Days', 'Weeks', 'Months', 'Ongoing'];

  final List<Map<String, dynamic>> _petsList = [
    {
      "id": 1,
      "name": "Buddy",
      "photo":
          "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      "id": 2,
      "name": "Luna",
      "photo":
          "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      "id": 3,
      "name": "Max",
      "photo":
          "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ];

  @override
  void initState() {
    super.initState();
    _initializeForm();
    _initializeCamera();
  }

  void _initializeForm() {
    if (widget.existingMedication != null) {
      final med = widget.existingMedication!;
      _medicationNameController.text = med["medicationName"] as String? ?? "";
      _dosageController.text = med["dosage"] as String? ?? "";
      _instructionsController.text = med["instructions"] as String? ?? "";
      _durationController.text = med["duration"]?.toString() ?? "";
      _selectedPet = med["petName"] as String? ?? "";
      _selectedFrequency = med["frequency"] as String? ?? "Once daily";
    }

    if (_selectedPet.isEmpty && _petsList.isNotEmpty) {
      _selectedPet = _petsList.first["name"] as String;
    }
  }

  Future<void> _initializeCamera() async {
    try {
      if (await _requestCameraPermission()) {
        _cameras = await availableCameras();
        if (_cameras.isNotEmpty) {
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
        }
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

  Future<void> _capturePhoto() async {
    if (_cameraController == null || !_cameraController!.value.isInitialized)
      return;

    try {
      final XFile photo = await _cameraController!.takePicture();
      setState(() {
        _capturedImage = photo;
        _showCamera = false;
      });
    } catch (e) {
      debugPrint('Photo capture error: $e');
    }
  }

  Future<void> _pickImageFromGallery() async {
    try {
      final ImagePicker picker = ImagePicker();
      final XFile? image = await picker.pickImage(source: ImageSource.gallery);

      if (image != null) {
        setState(() {
          _capturedImage = image;
        });
      }
    } catch (e) {
      debugPrint('Gallery picker error: $e');
    }
  }

  @override
  void dispose() {
    _medicationNameController.dispose();
    _dosageController.dispose();
    _instructionsController.dispose();
    _durationController.dispose();
    _cameraController?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: Text(
          widget.existingMedication != null
              ? 'Edit Medication'
              : 'Add Medication',
          style: theme.textTheme.titleLarge,
        ),
        actions: [
          TextButton(
            onPressed: _saveMedication,
            child: Text(
              'Save',
              style: theme.textTheme.titleMedium?.copyWith(
                color: AppTheme.primaryLight,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        ],
      ),
      body: _showCamera ? _buildCameraView() : _buildForm(),
    );
  }

  Widget _buildCameraView() {
    if (!_isCameraInitialized || _cameraController == null) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CircularProgressIndicator(
              color: AppTheme.primaryLight,
            ),
            SizedBox(height: 2.h),
            Text(
              'Initializing camera...',
              style: Theme.of(context).textTheme.bodyMedium,
            ),
          ],
        ),
      );
    }

    return Stack(
      children: [
        CameraPreview(_cameraController!),
        Positioned(
          bottom: 8.h,
          left: 0,
          right: 0,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              FloatingActionButton(
                heroTag: "gallery",
                onPressed: _pickImageFromGallery,
                backgroundColor: Colors.white.withValues(alpha: 0.9),
                child: CustomIconWidget(
                  iconName: 'photo_library',
                  color: AppTheme.primaryLight,
                  size: 24,
                ),
              ),
              FloatingActionButton.large(
                heroTag: "capture",
                onPressed: _capturePhoto,
                backgroundColor: AppTheme.primaryLight,
                child: CustomIconWidget(
                  iconName: 'camera_alt',
                  color: Colors.white,
                  size: 32,
                ),
              ),
              FloatingActionButton(
                heroTag: "close",
                onPressed: () => setState(() => _showCamera = false),
                backgroundColor: Colors.white.withValues(alpha: 0.9),
                child: CustomIconWidget(
                  iconName: 'close',
                  color: AppTheme.errorLight,
                  size: 24,
                ),
              ),
            ],
          ),
        ),
        Positioned(
          top: 6.h,
          left: 4.w,
          right: 4.w,
          child: Container(
            padding: EdgeInsets.all(3.w),
            decoration: BoxDecoration(
              color: Colors.black.withValues(alpha: 0.7),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Text(
              'Position the prescription label in the frame and tap capture',
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    color: Colors.white,
                  ),
              textAlign: TextAlign.center,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildForm() {
    final theme = Theme.of(context);

    return Form(
      key: _formKey,
      child: SingleChildScrollView(
        padding: EdgeInsets.all(4.w),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (_capturedImage != null) _buildCapturedImage(),
            _buildPetSelection(),
            SizedBox(height: 3.h),
            _buildMedicationNameField(),
            SizedBox(height: 3.h),
            _buildDosageField(),
            SizedBox(height: 3.h),
            _buildFrequencySelection(),
            SizedBox(height: 3.h),
            _buildTimeSelection(),
            SizedBox(height: 3.h),
            _buildDurationFields(),
            SizedBox(height: 3.h),
            _buildInstructionsField(),
            SizedBox(height: 3.h),
            _buildCameraButton(),
            SizedBox(height: 6.h),
          ],
        ),
      ),
    );
  }

  Widget _buildCapturedImage() {
    return Container(
      width: double.infinity,
      height: 20.h,
      margin: EdgeInsets.only(bottom: 3.h),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: AppTheme.primaryLight,
          width: 2,
        ),
      ),
      child: Stack(
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(10),
            child: kIsWeb
                ? Image.network(
                    _capturedImage!.path,
                    width: double.infinity,
                    height: double.infinity,
                    fit: BoxFit.cover,
                  )
                : Image.asset(
                    _capturedImage!.path,
                    width: double.infinity,
                    height: double.infinity,
                    fit: BoxFit.cover,
                  ),
          ),
          Positioned(
            top: 2.w,
            right: 2.w,
            child: GestureDetector(
              onTap: () => setState(() => _capturedImage = null),
              child: Container(
                padding: EdgeInsets.all(1.w),
                decoration: BoxDecoration(
                  color: Colors.black.withValues(alpha: 0.7),
                  shape: BoxShape.circle,
                ),
                child: CustomIconWidget(
                  iconName: 'close',
                  color: Colors.white,
                  size: 20,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPetSelection() {
    final theme = Theme.of(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Select Pet',
          style: theme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
        SizedBox(height: 2.h),
        Container(
          height: 15.h,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            itemCount: _petsList.length,
            itemBuilder: (context, index) {
              final pet = _petsList[index];
              final isSelected = _selectedPet == pet["name"];

              return GestureDetector(
                onTap: () =>
                    setState(() => _selectedPet = pet["name"] as String),
                child: Container(
                  width: 20.w,
                  margin: EdgeInsets.only(right: 3.w),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(
                      color: isSelected
                          ? AppTheme.primaryLight
                          : AppTheme.dividerLight,
                      width: isSelected ? 2 : 1,
                    ),
                  ),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Container(
                        width: 12.w,
                        height: 12.w,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          border: Border.all(
                            color: isSelected
                                ? AppTheme.primaryLight
                                : Colors.transparent,
                            width: 2,
                          ),
                        ),
                        child: ClipOval(
                          child: CustomImageWidget(
                            imageUrl: pet["photo"] as String,
                            width: 12.w,
                            height: 12.w,
                            fit: BoxFit.cover,
                          ),
                        ),
                      ),
                      SizedBox(height: 1.h),
                      Text(
                        pet["name"] as String,
                        style: theme.textTheme.labelMedium?.copyWith(
                          color: isSelected ? AppTheme.primaryLight : null,
                          fontWeight:
                              isSelected ? FontWeight.w600 : FontWeight.w400,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ],
                  ),
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  Widget _buildMedicationNameField() {
    return TextFormField(
      controller: _medicationNameController,
      decoration: InputDecoration(
        labelText: 'Medication Name',
        hintText: 'Enter medication name',
        prefixIcon: Padding(
          padding: EdgeInsets.all(3.w),
          child: CustomIconWidget(
            iconName: 'medication',
            color: AppTheme.primaryLight,
            size: 20,
          ),
        ),
      ),
      validator: (value) {
        if (value == null || value.isEmpty) {
          return 'Please enter medication name';
        }
        return null;
      },
    );
  }

  Widget _buildDosageField() {
    return TextFormField(
      controller: _dosageController,
      decoration: InputDecoration(
        labelText: 'Dosage',
        hintText: 'e.g., 10mg, 1 tablet, 2.5ml',
        prefixIcon: Padding(
          padding: EdgeInsets.all(3.w),
          child: CustomIconWidget(
            iconName: 'straighten',
            color: AppTheme.primaryLight,
            size: 20,
          ),
        ),
      ),
      validator: (value) {
        if (value == null || value.isEmpty) {
          return 'Please enter dosage';
        }
        return null;
      },
    );
  }

  Widget _buildFrequencySelection() {
    final theme = Theme.of(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Frequency',
          style: theme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
        SizedBox(height: 2.h),
        DropdownButtonFormField<String>(
          value: _selectedFrequency,
          decoration: InputDecoration(
            prefixIcon: Padding(
              padding: EdgeInsets.all(3.w),
              child: CustomIconWidget(
                iconName: 'schedule',
                color: AppTheme.primaryLight,
                size: 20,
              ),
            ),
          ),
          items: _frequencyOptions.map((frequency) {
            return DropdownMenuItem(
              value: frequency,
              child: Text(frequency),
            );
          }).toList(),
          onChanged: (value) {
            if (value != null) {
              setState(() => _selectedFrequency = value);
            }
          },
        ),
      ],
    );
  }

  Widget _buildTimeSelection() {
    final theme = Theme.of(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Time',
          style: theme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
        SizedBox(height: 2.h),
        InkWell(
          onTap: () async {
            final TimeOfDay? picked = await showTimePicker(
              context: context,
              initialTime: _selectedTime,
            );
            if (picked != null) {
              setState(() => _selectedTime = picked);
            }
          },
          child: Container(
            padding: EdgeInsets.all(4.w),
            decoration: BoxDecoration(
              border: Border.all(color: AppTheme.dividerLight),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Row(
              children: [
                CustomIconWidget(
                  iconName: 'access_time',
                  color: AppTheme.primaryLight,
                  size: 20,
                ),
                SizedBox(width: 3.w),
                Text(
                  _selectedTime.format(context),
                  style: theme.textTheme.bodyLarge,
                ),
                Spacer(),
                CustomIconWidget(
                  iconName: 'arrow_drop_down',
                  color: AppTheme.textSecondaryLight,
                  size: 24,
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildDurationFields() {
    final theme = Theme.of(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Duration',
          style: theme.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
        SizedBox(height: 2.h),
        Row(
          children: [
            Expanded(
              flex: 2,
              child: TextFormField(
                controller: _durationController,
                keyboardType: TextInputType.number,
                decoration: InputDecoration(
                  hintText: 'Number',
                  prefixIcon: Padding(
                    padding: EdgeInsets.all(3.w),
                    child: CustomIconWidget(
                      iconName: 'timer',
                      color: AppTheme.primaryLight,
                      size: 20,
                    ),
                  ),
                ),
                validator: (value) {
                  if (_selectedDuration != 'Ongoing' &&
                      (value == null || value.isEmpty)) {
                    return 'Required';
                  }
                  return null;
                },
              ),
            ),
            SizedBox(width: 3.w),
            Expanded(
              flex: 3,
              child: DropdownButtonFormField<String>(
                value: _selectedDuration,
                items: _durationOptions.map((duration) {
                  return DropdownMenuItem(
                    value: duration,
                    child: Text(duration),
                  );
                }).toList(),
                onChanged: (value) {
                  if (value != null) {
                    setState(() => _selectedDuration = value);
                  }
                },
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildInstructionsField() {
    return TextFormField(
      controller: _instructionsController,
      maxLines: 3,
      decoration: InputDecoration(
        labelText: 'Special Instructions',
        hintText: 'e.g., Take with food, avoid dairy',
        prefixIcon: Padding(
          padding: EdgeInsets.all(3.w),
          child: CustomIconWidget(
            iconName: 'notes',
            color: AppTheme.primaryLight,
            size: 20,
          ),
        ),
      ),
    );
  }

  Widget _buildCameraButton() {
    final theme = Theme.of(context);

    return SizedBox(
      width: double.infinity,
      child: OutlinedButton.icon(
        onPressed: () => setState(() => _showCamera = true),
        icon: CustomIconWidget(
          iconName: 'camera_alt',
          color: AppTheme.primaryLight,
          size: 20,
        ),
        label: Text('Scan Prescription Label'),
        style: OutlinedButton.styleFrom(
          padding: EdgeInsets.symmetric(vertical: 3.h),
        ),
      ),
    );
  }

  void _saveMedication() {
    if (_formKey.currentState!.validate()) {
      final medicationData = {
        "id": widget.existingMedication?["id"] ??
            DateTime.now().millisecondsSinceEpoch,
        "petName": _selectedPet,
        "petPhoto":
            _petsList.firstWhere((pet) => pet["name"] == _selectedPet)["photo"],
        "medicationName": _medicationNameController.text,
        "dosage": _dosageController.text,
        "frequency": _selectedFrequency,
        "time": _selectedTime.format(context),
        "duration": _selectedDuration == 'Ongoing'
            ? 'Ongoing'
            : "${_durationController.text} $_selectedDuration",
        "instructions": _instructionsController.text,
        "status": "upcoming",
        "nextDoseTime": "Today ${_selectedTime.format(context)}",
        "timeUntilNext": "2h 30m",
        "remainingPills": 30,
        "startDate": _startDate.toIso8601String(),
        "capturedImage": _capturedImage?.path,
      };

      widget.onSave(medicationData);
      Navigator.of(context).pop();
    }
  }
}
