import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../theme/app_theme.dart';

class LanguageSelectionWidget extends StatefulWidget {
  final Function(String) onLanguageSelected;

  const LanguageSelectionWidget({
    Key? key,
    required this.onLanguageSelected,
  }) : super(key: key);

  @override
  State<LanguageSelectionWidget> createState() =>
      _LanguageSelectionWidgetState();
}

class _LanguageSelectionWidgetState extends State<LanguageSelectionWidget> {
  int selectedIndex = 0;

  final List<Map<String, dynamic>> languages = [
    {
      "code": "es",
      "name": "Spanish",
      "nativeName": "Español",
      "flag": "🇪🇸",
      "greeting": "¡Hola!",
    },
    {
      "code": "fr",
      "name": "French",
      "nativeName": "Français",
      "flag": "🇫🇷",
      "greeting": "Bonjour!",
    },
    {
      "code": "de",
      "name": "German",
      "nativeName": "Deutsch",
      "flag": "🇩🇪",
      "greeting": "Hallo!",
    },
    {
      "code": "it",
      "name": "Italian",
      "nativeName": "Italiano",
      "flag": "🇮🇹",
      "greeting": "Ciao!",
    },
    {
      "code": "pt",
      "name": "Portuguese",
      "nativeName": "Português",
      "flag": "🇵🇹",
      "greeting": "Olá!",
    },
    {
      "code": "ja",
      "name": "Japanese",
      "nativeName": "日本語",
      "flag": "🇯🇵",
      "greeting": "こんにちは!",
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SizedBox(height: 4.h),
        Text(
          'Choose Your Language',
          style: AppTheme.lightTheme.textTheme.headlineMedium?.copyWith(
            fontWeight: FontWeight.bold,
            color: AppTheme.lightTheme.colorScheme.onSurface,
          ),
          textAlign: TextAlign.center,
        ),
        SizedBox(height: 2.h),
        Text(
          'Select the language you want to learn',
          style: AppTheme.lightTheme.textTheme.bodyLarge?.copyWith(
            color: AppTheme.lightTheme.colorScheme.onSurface
                .withValues(alpha: 0.7),
          ),
          textAlign: TextAlign.center,
        ),
        SizedBox(height: 6.h),
        SizedBox(
          height: 35.h,
          child: PageView.builder(
            itemCount: languages.length,
            onPageChanged: (index) {
              setState(() {
                selectedIndex = index;
              });
              widget.onLanguageSelected(languages[index]["code"] as String);
            },
            itemBuilder: (context, index) {
              final language = languages[index];
              final isSelected = index == selectedIndex;

              return AnimatedContainer(
                duration: const Duration(milliseconds: 300),
                margin:
                    EdgeInsets.symmetric(horizontal: isSelected ? 4.w : 8.w),
                child: Card(
                  elevation: isSelected ? 8 : 2,
                  color: isSelected
                      ? AppTheme.lightTheme.colorScheme.primary
                          .withValues(alpha: 0.1)
                      : AppTheme.lightTheme.colorScheme.surface,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                    side: BorderSide(
                      color: isSelected
                          ? AppTheme.lightTheme.colorScheme.primary
                          : Colors.transparent,
                      width: 2,
                    ),
                  ),
                  child: Padding(
                    padding: EdgeInsets.all(4.w),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          language["flag"] as String,
                          style: TextStyle(fontSize: 60.sp),
                        ),
                        SizedBox(height: 2.h),
                        Text(
                          language["name"] as String,
                          style: AppTheme.lightTheme.textTheme.titleLarge
                              ?.copyWith(
                            fontWeight: FontWeight.bold,
                            color: isSelected
                                ? AppTheme.lightTheme.colorScheme.primary
                                : AppTheme.lightTheme.colorScheme.onSurface,
                          ),
                          textAlign: TextAlign.center,
                        ),
                        SizedBox(height: 1.h),
                        Text(
                          language["nativeName"] as String,
                          style: AppTheme.lightTheme.textTheme.bodyMedium
                              ?.copyWith(
                            color: AppTheme.lightTheme.colorScheme.onSurface
                                .withValues(alpha: 0.7),
                          ),
                          textAlign: TextAlign.center,
                        ),
                        SizedBox(height: 2.h),
                        Container(
                          padding: EdgeInsets.symmetric(
                              horizontal: 4.w, vertical: 1.h),
                          decoration: BoxDecoration(
                            color: isSelected
                                ? AppTheme.lightTheme.colorScheme.primary
                                : AppTheme.lightTheme.colorScheme.primary
                                    .withValues(alpha: 0.1),
                            borderRadius: BorderRadius.circular(20),
                          ),
                          child: Text(
                            language["greeting"] as String,
                            style: AppTheme.lightTheme.textTheme.titleMedium
                                ?.copyWith(
                              color: isSelected
                                  ? AppTheme.lightTheme.colorScheme.onPrimary
                                  : AppTheme.lightTheme.colorScheme.primary,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              );
            },
          ),
        ),
        SizedBox(height: 4.h),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: List.generate(
            languages.length,
            (index) => AnimatedContainer(
              duration: const Duration(milliseconds: 300),
              margin: EdgeInsets.symmetric(horizontal: 1.w),
              height: 1.h,
              width: index == selectedIndex ? 6.w : 2.w,
              decoration: BoxDecoration(
                color: index == selectedIndex
                    ? AppTheme.lightTheme.colorScheme.primary
                    : AppTheme.lightTheme.colorScheme.primary
                        .withValues(alpha: 0.3),
                borderRadius: BorderRadius.circular(10),
              ),
            ),
          ),
        ),
      ],
    );
  }
}
