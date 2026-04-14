import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../core/app_export.dart';
import '../../widgets/custom_icon_widget.dart';
import './widgets/continue_button_widget.dart';
import './widgets/progress_header_widget.dart';
import './widgets/question_section_widget.dart';

class PregnancySetupQuestionnaire extends StatefulWidget {
  const PregnancySetupQuestionnaire({super.key});

  @override
  State<PregnancySetupQuestionnaire> createState() =>
      _PregnancySetupQuestionnaireState();
}

class _PregnancySetupQuestionnaireState
    extends State<PregnancySetupQuestionnaire> {
  final PageController _pageController = PageController();
  int _currentPage = 0;
  final int _totalPages = 4;

  // Question responses
  bool? _isFirstPregnancy;
  int? _previousBirths;
  List<String> _selectedHealthConditions = [];
  String _additionalNotes = '';
  String? _bloodType;
  List<String> _selectedAllergies = [];

  // Auto-save state
  bool _isSaving = false;
  DateTime? _lastSaved;

  @override
  void initState() {
    super.initState();
    _loadSavedData();
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  Future<void> _loadSavedData() async {
    // Simulate loading saved data
    await Future.delayed(const Duration(milliseconds: 500));
    // In production, load from secure storage
  }

  Future<void> _autoSave() async {
    setState(() {
      _isSaving = true;
    });

    await Future.delayed(const Duration(milliseconds: 800));

    setState(() {
      _isSaving = false;
      _lastSaved = DateTime.now();
    });
  }

  bool _isPageComplete(int page) {
    switch (page) {
      case 0:
        return _isFirstPregnancy != null;
      case 1:
        return _bloodType != null;
      case 2:
        return true; // Health conditions are optional
      case 3:
        return true; // Additional notes are optional
      default:
        return false;
    }
  }

  void _nextPage() {
    if (_currentPage < _totalPages - 1) {
      HapticFeedback.lightImpact();
      _autoSave();
      _pageController.nextPage(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
    } else {
      _completeQuestionnaire();
    }
  }

  void _previousPage() {
    if (_currentPage > 0) {
      HapticFeedback.lightImpact();
      _pageController.previousPage(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
    }
  }

  void _completeQuestionnaire() {
    HapticFeedback.mediumImpact();
    _autoSave();

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(
          'Setup Complete!',
          style: Theme.of(context).textTheme.titleLarge,
        ),
        content: Text(
          'Your personalized pregnancy journey is ready. Let\'s get started!',
          style: Theme.of(context).textTheme.bodyLarge,
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
              Navigator.pushReplacementNamed(context, '/main-dashboard');
            },
            child: const Text('Continue'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      appBar: AppBar(
        backgroundColor: theme.appBarTheme.backgroundColor,
        elevation: 0,
        leading: _currentPage > 0
            ? IconButton(
                icon: CustomIconWidget(
                  iconName: 'arrow_back_ios_new',
                  color: theme.appBarTheme.foregroundColor!,
                  size: 20,
                ),
                onPressed: _previousPage,
              )
            : null,
        title: Text(
          'Health Profile',
          style: theme.appBarTheme.titleTextStyle,
        ),
        centerTitle: true,
        actions: [
          if (_isSaving)
            Padding(
              padding: const EdgeInsets.only(right: 16),
              child: Center(
                child: SizedBox(
                  width: 20,
                  height: 20,
                  child: CircularProgressIndicator(
                    strokeWidth: 2,
                    valueColor: AlwaysStoppedAnimation<Color>(
                      theme.colorScheme.primary,
                    ),
                  ),
                ),
              ),
            )
          else if (_lastSaved != null)
            Padding(
              padding: const EdgeInsets.only(right: 16),
              child: Center(
                child: CustomIconWidget(
                  iconName: 'check_circle',
                  color: theme.colorScheme.primary,
                  size: 20,
                ),
              ),
            ),
        ],
      ),
      body: Column(
        children: [
          ProgressHeaderWidget(
            currentPage: _currentPage,
            totalPages: _totalPages,
            estimatedTimeMinutes: (_totalPages - _currentPage) * 2,
          ),
          Expanded(
            child: PageView(
              controller: _pageController,
              physics: const NeverScrollableScrollPhysics(),
              onPageChanged: (page) {
                setState(() {
                  _currentPage = page;
                });
              },
              children: [
                _buildPregnancyHistoryPage(theme),
                _buildBasicHealthPage(theme),
                _buildHealthConditionsPage(theme),
                _buildAdditionalNotesPage(theme),
              ],
            ),
          ),
          ContinueButtonWidget(
            isEnabled: _isPageComplete(_currentPage),
            isLastPage: _currentPage == _totalPages - 1,
            onPressed: _nextPage,
          ),
        ],
      ),
    );
  }

  Widget _buildPregnancyHistoryPage(ThemeData theme) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          QuestionSectionWidget(
            title: 'Is this your first pregnancy?',
            helpText:
                'This helps us provide relevant information for your journey',
            child: Column(
              children: [
                _buildRadioOption(
                  theme: theme,
                  value: true,
                  groupValue: _isFirstPregnancy,
                  title: 'Yes, this is my first pregnancy',
                  onChanged: (value) {
                    setState(() {
                      _isFirstPregnancy = value;
                      _previousBirths = null;
                    });
                    HapticFeedback.selectionClick();
                  },
                ),
                const SizedBox(height: 12),
                _buildRadioOption(
                  theme: theme,
                  value: false,
                  groupValue: _isFirstPregnancy,
                  title: 'No, I have been pregnant before',
                  onChanged: (value) {
                    setState(() {
                      _isFirstPregnancy = value;
                    });
                    HapticFeedback.selectionClick();
                  },
                ),
              ],
            ),
          ),
          if (_isFirstPregnancy == false) ...[
            const SizedBox(height: 24),
            QuestionSectionWidget(
              title: 'How many previous births?',
              helpText: 'Include live births and stillbirths',
              child: Wrap(
                spacing: 12,
                runSpacing: 12,
                children: List.generate(
                  5,
                  (index) => _buildNumberChip(
                    theme: theme,
                    number: index + 1,
                    isSelected: _previousBirths == index + 1,
                    onTap: () {
                      setState(() {
                        _previousBirths = index + 1;
                      });
                      HapticFeedback.selectionClick();
                    },
                  ),
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildBasicHealthPage(ThemeData theme) {
    final bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    final commonAllergies = [
      'Penicillin',
      'Latex',
      'Pollen',
      'Dust',
      'Pet Dander',
      'Food Allergies',
      'None',
    ];

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          QuestionSectionWidget(
            title: 'What is your blood type?',
            helpText: 'This is important for medical care during pregnancy',
            child: Wrap(
              spacing: 12,
              runSpacing: 12,
              children: bloodTypes.map((type) {
                return _buildBloodTypeChip(
                  theme: theme,
                  bloodType: type,
                  isSelected: _bloodType == type,
                  onTap: () {
                    setState(() {
                      _bloodType = type;
                    });
                    HapticFeedback.selectionClick();
                  },
                );
              }).toList(),
            ),
          ),
          const SizedBox(height: 24),
          QuestionSectionWidget(
            title: 'Do you have any allergies?',
            helpText: 'Select all that apply',
            isOptional: true,
            child: Column(
              children: commonAllergies.map((allergy) {
                final isSelected = _selectedAllergies.contains(allergy);
                return Padding(
                  padding: const EdgeInsets.only(bottom: 12),
                  child: _buildCheckboxOption(
                    theme: theme,
                    title: allergy,
                    isSelected: isSelected,
                    onChanged: (value) {
                      setState(() {
                        if (allergy == 'None') {
                          if (value == true) {
                            _selectedAllergies.clear();
                            _selectedAllergies.add(allergy);
                          } else {
                            _selectedAllergies.remove(allergy);
                          }
                        } else {
                          _selectedAllergies.remove('None');
                          if (value == true) {
                            _selectedAllergies.add(allergy);
                          } else {
                            _selectedAllergies.remove(allergy);
                          }
                        }
                      });
                      HapticFeedback.selectionClick();
                    },
                  ),
                );
              }).toList(),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildHealthConditionsPage(ThemeData theme) {
    final healthConditions = [
      'Diabetes',
      'High Blood Pressure',
      'Thyroid Disorder',
      'Asthma',
      'Heart Condition',
      'Autoimmune Disease',
      'Mental Health Condition',
      'None',
    ];

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          QuestionSectionWidget(
            title: 'Do you have any pre-existing health conditions?',
            helpText:
                'This information helps us provide personalized care recommendations',
            isOptional: true,
            child: Column(
              children: healthConditions.map((condition) {
                final isSelected =
                    _selectedHealthConditions.contains(condition);
                return Padding(
                  padding: const EdgeInsets.only(bottom: 12),
                  child: _buildCheckboxOption(
                    theme: theme,
                    title: condition,
                    isSelected: isSelected,
                    onChanged: (value) {
                      setState(() {
                        if (condition == 'None') {
                          if (value == true) {
                            _selectedHealthConditions.clear();
                            _selectedHealthConditions.add(condition);
                          } else {
                            _selectedHealthConditions.remove(condition);
                          }
                        } else {
                          _selectedHealthConditions.remove('None');
                          if (value == true) {
                            _selectedHealthConditions.add(condition);
                          } else {
                            _selectedHealthConditions.remove(condition);
                          }
                        }
                      });
                      HapticFeedback.selectionClick();
                    },
                  ),
                );
              }).toList(),
            ),
          ),
          const SizedBox(height: 16),
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: theme.colorScheme.primary.withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Row(
              children: [
                CustomIconWidget(
                  iconName: 'lock',
                  color: theme.colorScheme.primary,
                  size: 20,
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Text(
                    'Your health information is encrypted and secure',
                    style: theme.textTheme.bodySmall?.copyWith(
                      color: theme.colorScheme.primary,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAdditionalNotesPage(ThemeData theme) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          QuestionSectionWidget(
            title: 'Any additional information?',
            helpText:
                'Share anything else you think is important for your care',
            isOptional: true,
            child: TextField(
              maxLines: 6,
              maxLength: 500,
              decoration: InputDecoration(
                hintText:
                    'e.g., medications, supplements, lifestyle factors...',
                hintStyle: theme.inputDecorationTheme.hintStyle,
                filled: true,
                fillColor: theme.inputDecorationTheme.fillColor,
                border: theme.inputDecorationTheme.border,
                enabledBorder: theme.inputDecorationTheme.enabledBorder,
                focusedBorder: theme.inputDecorationTheme.focusedBorder,
                contentPadding: const EdgeInsets.all(16),
              ),
              style: theme.textTheme.bodyLarge,
              onChanged: (value) {
                setState(() {
                  _additionalNotes = value;
                });
              },
            ),
          ),
          const SizedBox(height: 24),
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: theme.colorScheme.tertiaryContainer.withValues(alpha: 0.3),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(
                color: theme.colorScheme.tertiaryContainer,
                width: 1,
              ),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    CustomIconWidget(
                      iconName: 'info',
                      color: theme.colorScheme.onTertiaryContainer,
                      size: 20,
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Text(
                        'Privacy & Security',
                        style: theme.textTheme.titleMedium?.copyWith(
                          color: theme.colorScheme.onTertiaryContainer,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Text(
                  'All information is stored securely and encrypted. You can update or delete your data anytime from your profile settings.',
                  style: theme.textTheme.bodySmall?.copyWith(
                    color: theme.colorScheme.onTertiaryContainer,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildRadioOption({
    required ThemeData theme,
    required bool value,
    required bool? groupValue,
    required String title,
    required Function(bool?) onChanged,
  }) {
    final isSelected = value == groupValue;

    return InkWell(
      onTap: () => onChanged(value),
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: isSelected
              ? theme.colorScheme.primary.withValues(alpha: 0.1)
              : theme.colorScheme.surface,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isSelected
                ? theme.colorScheme.primary
                : theme.colorScheme.outline,
            width: isSelected ? 2 : 1,
          ),
        ),
        child: Row(
          children: [
            Container(
              width: 24,
              height: 24,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(
                  color: isSelected
                      ? theme.colorScheme.primary
                      : theme.colorScheme.outline,
                  width: 2,
                ),
                color:
                    isSelected ? theme.colorScheme.primary : Colors.transparent,
              ),
              child: isSelected
                  ? Center(
                      child: Container(
                        width: 8,
                        height: 8,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: theme.colorScheme.onPrimary,
                        ),
                      ),
                    )
                  : null,
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Text(
                title,
                style: theme.textTheme.bodyLarge?.copyWith(
                  fontWeight: isSelected ? FontWeight.w600 : FontWeight.w400,
                  color: isSelected
                      ? theme.colorScheme.primary
                      : theme.colorScheme.onSurface,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCheckboxOption({
    required ThemeData theme,
    required String title,
    required bool isSelected,
    required Function(bool?) onChanged,
  }) {
    return InkWell(
      onTap: () => onChanged(!isSelected),
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: isSelected
              ? theme.colorScheme.primary.withValues(alpha: 0.1)
              : theme.colorScheme.surface,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isSelected
                ? theme.colorScheme.primary
                : theme.colorScheme.outline,
            width: isSelected ? 2 : 1,
          ),
        ),
        child: Row(
          children: [
            Container(
              width: 24,
              height: 24,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(6),
                border: Border.all(
                  color: isSelected
                      ? theme.colorScheme.primary
                      : theme.colorScheme.outline,
                  width: 2,
                ),
                color:
                    isSelected ? theme.colorScheme.primary : Colors.transparent,
              ),
              child: isSelected
                  ? CustomIconWidget(
                      iconName: 'check',
                      color: theme.colorScheme.onPrimary,
                      size: 16,
                    )
                  : null,
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Text(
                title,
                style: theme.textTheme.bodyLarge?.copyWith(
                  fontWeight: isSelected ? FontWeight.w600 : FontWeight.w400,
                  color: isSelected
                      ? theme.colorScheme.primary
                      : theme.colorScheme.onSurface,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildNumberChip({
    required ThemeData theme,
    required int number,
    required bool isSelected,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(12),
      child: Container(
        width: 60,
        height: 60,
        decoration: BoxDecoration(
          color: isSelected
              ? theme.colorScheme.primary
              : theme.colorScheme.surface,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isSelected
                ? theme.colorScheme.primary
                : theme.colorScheme.outline,
            width: isSelected ? 2 : 1,
          ),
        ),
        child: Center(
          child: Text(
            '$number',
            style: theme.textTheme.titleLarge?.copyWith(
              color: isSelected
                  ? theme.colorScheme.onPrimary
                  : theme.colorScheme.onSurface,
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildBloodTypeChip({
    required ThemeData theme,
    required String bloodType,
    required bool isSelected,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
        decoration: BoxDecoration(
          color: isSelected
              ? theme.colorScheme.primary
              : theme.colorScheme.surface,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isSelected
                ? theme.colorScheme.primary
                : theme.colorScheme.outline,
            width: isSelected ? 2 : 1,
          ),
        ),
        child: Text(
          bloodType,
          style: theme.textTheme.titleMedium?.copyWith(
            color: isSelected
                ? theme.colorScheme.onPrimary
                : theme.colorScheme.onSurface,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
    );
  }
}
