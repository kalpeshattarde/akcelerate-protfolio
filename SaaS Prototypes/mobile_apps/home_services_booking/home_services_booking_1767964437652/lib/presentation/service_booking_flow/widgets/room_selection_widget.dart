import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';
import '../../../widgets/custom_icon_widget.dart';

class RoomSelectionWidget extends StatefulWidget {
  final List<String> selectedRooms;
  final Function(List<String>) onRoomsChanged;

  const RoomSelectionWidget({
    super.key,
    required this.selectedRooms,
    required this.onRoomsChanged,
  });

  @override
  State<RoomSelectionWidget> createState() => _RoomSelectionWidgetState();
}

class _RoomSelectionWidgetState extends State<RoomSelectionWidget>
    with TickerProviderStateMixin {
  late AnimationController _animationController;
  late AnimationController _shimmerController;
  late Animation<double> _scaleAnimation;
  late Animation<double> _shimmerAnimation;

  final List<Map<String, dynamic>> _rooms = [
    {
      'name': 'Living Room',
      'icon': 'living',
      'area': '250 sq ft',
      'category': 'living',
    },
    {
      'name': 'Kitchen',
      'icon': 'kitchen',
      'area': '180 sq ft',
      'category': 'kitchen',
    },
    {
      'name': 'Master Bedroom',
      'icon': 'bed',
      'area': '200 sq ft',
      'category': 'bedroom',
    },
    {
      'name': 'Bedroom 2',
      'icon': 'bed',
      'area': '150 sq ft',
      'category': 'bedroom',
    },
    {
      'name': 'Bathroom 1',
      'icon': 'bathroom',
      'area': '80 sq ft',
      'category': 'bathroom',
    },
    {
      'name': 'Bathroom 2',
      'icon': 'bathroom',
      'area': '60 sq ft',
      'category': 'bathroom',
    },
    {
      'name': 'Dining Room',
      'icon': 'dining_room',
      'area': '120 sq ft',
      'category': 'dining',
    },
    {
      'name': 'Home Office',
      'icon': 'computer',
      'area': '100 sq ft',
      'category': 'office',
    },
    {
      'name': 'Laundry Room',
      'icon': 'local_laundry_service',
      'area': '70 sq ft',
      'category': 'utility',
    },
    {
      'name': 'Garage',
      'icon': 'garage',
      'area': '400 sq ft',
      'category': 'garage',
    },
  ];

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 200),
      vsync: this,
    );
    _shimmerController = AnimationController(
      duration: const Duration(milliseconds: 1800),
      vsync: this,
    );

    _scaleAnimation = Tween<double>(begin: 1.0, end: 0.95).animate(
      CurvedAnimation(parent: _animationController, curve: Curves.easeInOut),
    );

    _shimmerAnimation = Tween<double>(begin: -1.0, end: 1.0).animate(
      CurvedAnimation(parent: _shimmerController, curve: Curves.easeInOut),
    );

    _shimmerController.repeat();
  }

  @override
  void dispose() {
    _animationController.dispose();
    _shimmerController.dispose();
    super.dispose();
  }

  Color _getGradientColor(String category) {
    switch (category.toLowerCase()) {
      case 'living':
        return const Color(0xFF10B981); // Green for living spaces
      case 'kitchen':
        return const Color(0xFFF59E0B); // Orange for kitchen
      case 'bedroom':
        return const Color(0xFF8B5CF6); // Purple for bedrooms
      case 'bathroom':
        return const Color(0xFF06B6D4); // Cyan for bathrooms
      case 'dining':
        return const Color(0xFFEC4899); // Pink for dining
      case 'office':
        return const Color(0xFF2563EB); // Blue for office
      case 'utility':
        return const Color(0xFF64748B); // Slate for utility
      case 'garage':
        return const Color(0xFF7C2D12); // Brown for garage
      default:
        return const Color(0xFF6366F1); // Default indigo
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Container(
      padding: EdgeInsets.all(4.w),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Select Rooms',
                style: theme.textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.w700,
                ),
              ),
              Container(
                padding: EdgeInsets.symmetric(horizontal: 3.w, vertical: 1.h),
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    colors: [
                      colorScheme.primary,
                      colorScheme.primary.withValues(alpha: 0.8),
                    ],
                  ),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Text(
                  '${widget.selectedRooms.length} selected',
                  style: theme.textTheme.labelMedium?.copyWith(
                    color: Colors.white,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ],
          ),
          SizedBox(height: 2.h),
          GridView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              crossAxisSpacing: 3.w,
              mainAxisSpacing: 2.h,
              childAspectRatio: 1.1,
            ),
            itemCount: _rooms.length,
            itemBuilder: (context, index) {
              final room = _rooms[index];
              final roomName = room['name'] as String;
              final isSelected = widget.selectedRooms.contains(roomName);
              final gradientColor = _getGradientColor(
                room['category'] as String,
              );

              return AnimatedBuilder(
                animation: _scaleAnimation,
                builder: (context, child) {
                  return GestureDetector(
                    onTapDown: (_) => _animationController.forward(),
                    onTapUp: (_) => _animationController.reverse(),
                    onTapCancel: () => _animationController.reverse(),
                    onTap: () => _toggleRoom(roomName),
                    child: Transform.scale(
                      scale: isSelected ? _scaleAnimation.value : 1.0,
                      child: AnimatedContainer(
                        duration: const Duration(milliseconds: 300),
                        curve: Curves.easeInOut,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(16),
                          gradient:
                              isSelected
                                  ? LinearGradient(
                                    begin: Alignment.topLeft,
                                    end: Alignment.bottomRight,
                                    colors: [
                                      gradientColor,
                                      gradientColor.withValues(alpha: 0.8),
                                    ],
                                  )
                                  : LinearGradient(
                                    begin: Alignment.topLeft,
                                    end: Alignment.bottomRight,
                                    colors: [
                                      colorScheme.surface,
                                      colorScheme.surface.withValues(
                                        alpha: 0.9,
                                      ),
                                    ],
                                  ),
                          border: Border.all(
                            color:
                                isSelected
                                    ? gradientColor
                                    : colorScheme.outline.withValues(
                                      alpha: 0.3,
                                    ),
                            width: isSelected ? 2 : 1,
                          ),
                          boxShadow:
                              isSelected
                                  ? [
                                    BoxShadow(
                                      color: gradientColor.withValues(
                                        alpha: 0.3,
                                      ),
                                      blurRadius: 12,
                                      offset: const Offset(0, 4),
                                    ),
                                  ]
                                  : [
                                    BoxShadow(
                                      color: colorScheme.shadow.withValues(
                                        alpha: 0.05,
                                      ),
                                      blurRadius: 4,
                                      offset: const Offset(0, 1),
                                    ),
                                  ],
                        ),
                        child: Stack(
                          children: [
                            // Shimmer effect for selected items
                            if (isSelected)
                              AnimatedBuilder(
                                animation: _shimmerAnimation,
                                builder: (context, child) {
                                  return Container(
                                    decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(16),
                                      gradient: LinearGradient(
                                        begin: Alignment(
                                          -1.0 + _shimmerAnimation.value,
                                          0.0,
                                        ),
                                        end: Alignment(
                                          1.0 + _shimmerAnimation.value,
                                          0.0,
                                        ),
                                        colors: [
                                          Colors.transparent,
                                          Colors.white.withValues(alpha: 0.2),
                                          Colors.transparent,
                                        ],
                                      ),
                                    ),
                                  );
                                },
                              ),
                            // Content
                            Padding(
                              padding: EdgeInsets.all(3.w),
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  Stack(
                                    alignment: Alignment.center,
                                    children: [
                                      Container(
                                        width: 12.w,
                                        height: 12.w,
                                        decoration: BoxDecoration(
                                          color:
                                              isSelected
                                                  ? Colors.white.withValues(
                                                    alpha: 0.2,
                                                  )
                                                  : colorScheme.outline
                                                      .withValues(alpha: 0.1),
                                          borderRadius: BorderRadius.circular(
                                            12,
                                          ),
                                        ),
                                        alignment: Alignment.center,
                                        child: CustomIconWidget(
                                          iconName: room['icon'] as String,
                                          color:
                                              isSelected
                                                  ? Colors.white
                                                  : colorScheme
                                                      .onSurfaceVariant,
                                          size: 6.w,
                                        ),
                                      ),
                                      if (isSelected)
                                        Positioned(
                                          top: -1,
                                          right: -1,
                                          child: AnimatedContainer(
                                            duration: const Duration(
                                              milliseconds: 200,
                                            ),
                                            width: 4.w,
                                            height: 4.w,
                                            decoration: BoxDecoration(
                                              color: Colors.white,
                                              shape: BoxShape.circle,
                                              boxShadow: [
                                                BoxShadow(
                                                  color: gradientColor
                                                      .withValues(alpha: 0.3),
                                                  blurRadius: 4,
                                                  offset: const Offset(0, 2),
                                                ),
                                              ],
                                            ),
                                            alignment: Alignment.center,
                                            child: CustomIconWidget(
                                              iconName: 'check',
                                              color: gradientColor,
                                              size: 2.5.w,
                                            ),
                                          ),
                                        ),
                                    ],
                                  ),
                                  SizedBox(height: 1.5.h),
                                  Container(
                                    width: double.infinity,
                                    child: Text(
                                      roomName,
                                      style: theme.textTheme.labelLarge
                                          ?.copyWith(
                                            color:
                                                isSelected
                                                    ? Colors.white
                                                    : colorScheme.onSurface,
                                            fontWeight:
                                                isSelected
                                                    ? FontWeight.w600
                                                    : FontWeight.w500,
                                          ),
                                      textAlign: TextAlign.center,
                                      maxLines: 1,
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                  ),
                                  SizedBox(height: 0.5.h),
                                  Container(
                                    width: double.infinity,
                                    child: Text(
                                      room['area'] as String,
                                      style: theme.textTheme.bodySmall
                                          ?.copyWith(
                                            color:
                                                isSelected
                                                    ? Colors.white.withValues(
                                                      alpha: 0.9,
                                                    )
                                                    : colorScheme
                                                        .onSurfaceVariant,
                                          ),
                                      textAlign: TextAlign.center,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  );
                },
              );
            },
          ),
        ],
      ),
    );
  }

  void _toggleRoom(String roomName) {
    final updatedRooms = List<String>.from(widget.selectedRooms);

    if (updatedRooms.contains(roomName)) {
      updatedRooms.remove(roomName);
    } else {
      updatedRooms.add(roomName);
    }

    widget.onRoomsChanged(updatedRooms);
  }
}
