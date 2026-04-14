import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:sizer/sizer.dart';

import '../../../core/app_export.dart';

class GrowthChartWidget extends StatefulWidget {
  final String chartType;
  final List<Map<String, dynamic>> measurements;
  final Function(String) onChartTypeChanged;

  const GrowthChartWidget({
    Key? key,
    required this.chartType,
    required this.measurements,
    required this.onChartTypeChanged,
  }) : super(key: key);

  @override
  State<GrowthChartWidget> createState() => _GrowthChartWidgetState();
}

class _GrowthChartWidgetState extends State<GrowthChartWidget> {
  bool showPercentiles = false;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.all(4.w),
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.surface,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: AppTheme.lightTheme.colorScheme.shadow,
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildChartHeader(),
          SizedBox(height: 3.h),
          _buildChartTypeSelector(),
          SizedBox(height: 2.h),
          _buildPercentileToggle(),
          SizedBox(height: 3.h),
          _buildChart(),
        ],
      ),
    );
  }

  Widget _buildChartHeader() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          'Growth Chart',
          style: AppTheme.lightTheme.textTheme.titleLarge?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
        IconButton(
          onPressed: () => _showExportOptions(),
          icon: CustomIconWidget(
            iconName: 'share',
            color: AppTheme.lightTheme.colorScheme.primary,
            size: 24,
          ),
        ),
      ],
    );
  }

  Widget _buildChartTypeSelector() {
    return Container(
      decoration: BoxDecoration(
        color: AppTheme.lightTheme.colorScheme.primaryContainer,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        children: [
          _buildSelectorButton('Weight', 'weight'),
          _buildSelectorButton('Height', 'height'),
          _buildSelectorButton('Head', 'head'),
        ],
      ),
    );
  }

  Widget _buildSelectorButton(String label, String type) {
    final isSelected = widget.chartType == type;
    return Expanded(
      child: GestureDetector(
        onTap: () => widget.onChartTypeChanged(type),
        child: Container(
          padding: EdgeInsets.symmetric(vertical: 2.h),
          decoration: BoxDecoration(
            color: isSelected
                ? AppTheme.lightTheme.colorScheme.primary
                : Colors.transparent,
            borderRadius: BorderRadius.circular(12),
          ),
          child: Text(
            label,
            textAlign: TextAlign.center,
            style: AppTheme.lightTheme.textTheme.labelLarge?.copyWith(
              color: isSelected
                  ? Colors.white
                  : AppTheme.lightTheme.colorScheme.primary,
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildPercentileToggle() {
    return Row(
      children: [
        Switch(
          value: showPercentiles,
          onChanged: (value) => setState(() => showPercentiles = value),
        ),
        SizedBox(width: 2.w),
        Text(
          'Show Percentiles',
          style: AppTheme.lightTheme.textTheme.bodyMedium,
        ),
      ],
    );
  }

  Widget _buildChart() {
    return Container(
      height: 40.h,
      child: _getFilteredMeasurements().isEmpty
          ? _buildEmptyChart()
          : LineChart(_buildLineChartData()),
    );
  }

  Widget _buildEmptyChart() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          CustomIconWidget(
            iconName: 'show_chart',
            color: AppTheme.lightTheme.colorScheme.outline,
            size: 48,
          ),
          SizedBox(height: 2.h),
          Text(
            'No ${widget.chartType} data yet',
            style: AppTheme.lightTheme.textTheme.bodyLarge?.copyWith(
              color: AppTheme.lightTheme.colorScheme.onSurfaceVariant,
            ),
          ),
          SizedBox(height: 1.h),
          Text(
            'Add your first measurement to see the chart',
            style: AppTheme.lightTheme.textTheme.bodySmall,
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  LineChartData _buildLineChartData() {
    final filteredData = _getFilteredMeasurements();
    final spots = filteredData.asMap().entries.map((entry) {
      return FlSpot(
        entry.key.toDouble(),
        (entry.value['value'] as num).toDouble(),
      );
    }).toList();

    return LineChartData(
      gridData: FlGridData(
        show: true,
        drawVerticalLine: true,
        horizontalInterval: _getHorizontalInterval(),
        verticalInterval: 1,
        getDrawingHorizontalLine: (value) {
          return FlLine(
            color:
                AppTheme.lightTheme.colorScheme.outline.withValues(alpha: 0.2),
            strokeWidth: 1,
          );
        },
        getDrawingVerticalLine: (value) {
          return FlLine(
            color:
                AppTheme.lightTheme.colorScheme.outline.withValues(alpha: 0.2),
            strokeWidth: 1,
          );
        },
      ),
      titlesData: FlTitlesData(
        show: true,
        rightTitles:
            const AxisTitles(sideTitles: SideTitles(showTitles: false)),
        topTitles: const AxisTitles(sideTitles: SideTitles(showTitles: false)),
        bottomTitles: AxisTitles(
          sideTitles: SideTitles(
            showTitles: true,
            reservedSize: 30,
            interval: 1,
            getTitlesWidget: (value, meta) {
              if (value.toInt() >= 0 && value.toInt() < filteredData.length) {
                final date =
                    DateTime.parse(filteredData[value.toInt()]['date']);
                return SideTitleWidget(
                  axisSide: meta.axisSide,
                  child: Text(
                    '${date.month}/${date.day}',
                    style: AppTheme.lightTheme.textTheme.bodySmall,
                  ),
                );
              }
              return const Text('');
            },
          ),
        ),
        leftTitles: AxisTitles(
          sideTitles: SideTitles(
            showTitles: true,
            interval: _getHorizontalInterval(),
            reservedSize: 42,
            getTitlesWidget: (value, meta) {
              return SideTitleWidget(
                axisSide: meta.axisSide,
                child: Text(
                  _formatYAxisValue(value),
                  style: AppTheme.lightTheme.textTheme.bodySmall,
                ),
              );
            },
          ),
        ),
      ),
      borderData: FlBorderData(
        show: true,
        border: Border.all(
          color: AppTheme.lightTheme.colorScheme.outline.withValues(alpha: 0.3),
        ),
      ),
      minX: 0,
      maxX: filteredData.length > 1 ? (filteredData.length - 1).toDouble() : 1,
      minY: _getMinY(),
      maxY: _getMaxY(),
      lineBarsData: [
        LineChartBarData(
          spots: spots,
          isCurved: true,
          gradient: LinearGradient(
            colors: [
              AppTheme.lightTheme.colorScheme.primary,
              AppTheme.lightTheme.colorScheme.secondary,
            ],
          ),
          barWidth: 3,
          isStrokeCapRound: true,
          dotData: FlDotData(
            show: true,
            getDotPainter: (spot, percent, barData, index) {
              return FlDotCirclePainter(
                radius: 4,
                color: AppTheme.lightTheme.colorScheme.primary,
                strokeWidth: 2,
                strokeColor: Colors.white,
              );
            },
          ),
          belowBarData: BarAreaData(
            show: true,
            gradient: LinearGradient(
              colors: [
                AppTheme.lightTheme.colorScheme.primary.withValues(alpha: 0.3),
                AppTheme.lightTheme.colorScheme.primary.withValues(alpha: 0.1),
              ],
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
            ),
          ),
        ),
        if (showPercentiles) ..._buildPercentileLines(),
      ],
      lineTouchData: LineTouchData(
        enabled: true,
        touchTooltipData: LineTouchTooltipData(
          getTooltipItems: (touchedSpots) {
            return touchedSpots.map((LineBarSpot touchedSpot) {
              final measurement = filteredData[touchedSpot.x.toInt()];
              return LineTooltipItem(
                '${_formatYAxisValue(touchedSpot.y)}\n${DateTime.parse(measurement['date']).month}/${DateTime.parse(measurement['date']).day}',
                AppTheme.lightTheme.textTheme.bodySmall!.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.w600,
                ),
              );
            }).toList();
          },
        ),
      ),
    );
  }

  List<LineChartBarData> _buildPercentileLines() {
    // Mock percentile data - in real app, this would come from medical growth charts
    final percentileData = _generatePercentileData();

    return [
      _buildPercentileLine(
          percentileData['5th']!, Colors.red.withValues(alpha: 0.5), '5th'),
      _buildPercentileLine(percentileData['50th']!,
          Colors.orange.withValues(alpha: 0.5), '50th'),
      _buildPercentileLine(
          percentileData['95th']!, Colors.green.withValues(alpha: 0.5), '95th'),
    ];
  }

  LineChartBarData _buildPercentileLine(
      List<FlSpot> spots, Color color, String label) {
    return LineChartBarData(
      spots: spots,
      isCurved: true,
      color: color,
      barWidth: 2,
      isStrokeCapRound: true,
      dotData: const FlDotData(show: false),
      dashArray: [5, 5],
    );
  }

  Map<String, List<FlSpot>> _generatePercentileData() {
    final filteredData = _getFilteredMeasurements();
    if (filteredData.isEmpty) return {'5th': [], '50th': [], '95th': []};

    // Generate mock percentile data based on chart type
    final baseValue = _getBasePercentileValue();
    final length = filteredData.length;

    return {
      '5th': List.generate(
          length, (index) => FlSpot(index.toDouble(), baseValue * 0.85)),
      '50th':
          List.generate(length, (index) => FlSpot(index.toDouble(), baseValue)),
      '95th': List.generate(
          length, (index) => FlSpot(index.toDouble(), baseValue * 1.15)),
    };
  }

  double _getBasePercentileValue() {
    switch (widget.chartType) {
      case 'weight':
        return 15.0; // lbs
      case 'height':
        return 28.0; // inches
      case 'head':
        return 17.0; // inches
      default:
        return 15.0;
    }
  }

  List<Map<String, dynamic>> _getFilteredMeasurements() {
    return widget.measurements
        .where((measurement) => measurement['type'] == widget.chartType)
        .toList()
      ..sort((a, b) =>
          DateTime.parse(a['date']).compareTo(DateTime.parse(b['date'])));
  }

  double _getHorizontalInterval() {
    switch (widget.chartType) {
      case 'weight':
        return 2.0;
      case 'height':
        return 2.0;
      case 'head':
        return 1.0;
      default:
        return 2.0;
    }
  }

  String _formatYAxisValue(double value) {
    switch (widget.chartType) {
      case 'weight':
        return '${value.toStringAsFixed(1)} lbs';
      case 'height':
        return '${value.toStringAsFixed(1)}"';
      case 'head':
        return '${value.toStringAsFixed(1)}"';
      default:
        return value.toStringAsFixed(1);
    }
  }

  double _getMinY() {
    final filteredData = _getFilteredMeasurements();
    if (filteredData.isEmpty) return 0;

    final values =
        filteredData.map((m) => (m['value'] as num).toDouble()).toList();
    final minValue = values.reduce((a, b) => a < b ? a : b);
    return (minValue * 0.9).floorToDouble();
  }

  double _getMaxY() {
    final filteredData = _getFilteredMeasurements();
    if (filteredData.isEmpty) return 10;

    final values =
        filteredData.map((m) => (m['value'] as num).toDouble()).toList();
    final maxValue = values.reduce((a, b) => a > b ? a : b);
    return (maxValue * 1.1).ceilToDouble();
  }

  void _showExportOptions() {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => Container(
        padding: EdgeInsets.all(4.w),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 12.w,
              height: 0.5.h,
              decoration: BoxDecoration(
                color: AppTheme.lightTheme.colorScheme.outline,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            SizedBox(height: 3.h),
            Text(
              'Export Growth Chart',
              style: AppTheme.lightTheme.textTheme.titleLarge,
            ),
            SizedBox(height: 3.h),
            _buildExportOption(
                'PDF Report', 'picture_as_pdf', () => _exportToPDF()),
            _buildExportOption('Share Image', 'share', () => _shareChart()),
            SizedBox(height: 2.h),
          ],
        ),
      ),
    );
  }

  Widget _buildExportOption(String title, String icon, VoidCallback onTap) {
    return ListTile(
      leading: CustomIconWidget(
        iconName: icon,
        color: AppTheme.lightTheme.colorScheme.primary,
        size: 24,
      ),
      title: Text(
        title,
        style: AppTheme.lightTheme.textTheme.bodyLarge,
      ),
      onTap: () {
        Navigator.pop(context);
        onTap();
      },
    );
  }

  void _exportToPDF() {
    // Implementation for PDF export
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('PDF export feature coming soon')),
    );
  }

  void _shareChart() {
    // Implementation for chart sharing
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Chart shared successfully')),
    );
  }
}
