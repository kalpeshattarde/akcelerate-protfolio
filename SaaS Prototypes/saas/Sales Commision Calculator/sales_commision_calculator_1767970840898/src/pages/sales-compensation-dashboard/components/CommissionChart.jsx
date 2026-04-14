import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const CommissionChart = ({ selectedReps, bonusParams }) => {
  // Calculate chart data
  const chartData = useMemo(() => {
    if (selectedReps.length === 0) return [];

    return selectedReps.map(rep => {
      const baseCommission = rep.ytdRevenue * rep.commissionRate;
      const spifBonus = rep.ytdRevenue * (bonusParams.spifPercentage / 100);
      const acceleratorBonus = baseCommission * (bonusParams.acceleratorRate - 1);
      const totalBonus = (spifBonus + acceleratorBonus) * bonusParams.bonusMultiplier;
      const totalPayout = baseCommission + totalBonus;

      return {
        name: rep.name.split(' ')[0], // First name only for chart
        fullName: rep.name,
        quotaAttainment: rep.quotaAttainment,
        baseCommission,
        totalBonus,
        totalPayout,
        ytdRevenue: rep.ytdRevenue,
        quota: rep.annualQuota
      };
    });
  }, [selectedReps, bonusParams]);

  // Get bar color based on performance with neon theme
  const getBarColor = (attainment) => {
    if (attainment >= 100) return '#10B981'; // neon-teal
    if (attainment >= 80) return '#F59E0B'; // warning amber
    return '#EF4444'; // error red
  };

  // Format currency for display
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Custom tooltip with glassmorphism
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <motion.div 
          className="glass-morphism-elevated border border-glass-border rounded-xl shadow-glow p-4 max-w-xs"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <h4 className="font-semibold text-text-primary-dark mb-2">{data.fullName}</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary-dark">YTD Revenue:</span>
              <span className="font-medium text-text-primary-dark">{formatCurrency(data.ytdRevenue)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary-dark">Quota Attainment:</span>
              <span className={`font-medium ${
                data.quotaAttainment >= 100 ? 'text-neon-teal' : 
                data.quotaAttainment >= 80 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {data.quotaAttainment.toFixed(1)}%
              </span>
            </div>
            <div className="border-t border-glass-border pt-1 mt-2">
              <div className="flex justify-between">
                <span className="text-text-secondary-dark">Base Commission:</span>
                <span className="font-medium text-text-primary-dark">{formatCurrency(data.baseCommission)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary-dark">Bonus Amount:</span>
                <span className="font-medium text-neon-indigo">{formatCurrency(data.totalBonus)}</span>
              </div>
              <div className="flex justify-between font-semibold border-t border-glass-border pt-1 mt-1">
                <span className="text-text-primary-dark">Total Payout:</span>
                <span className="text-neon-indigo">{formatCurrency(data.totalPayout)}</span>
              </div>
            </div>
          </div>
        </motion.div>
      );
    }
    return null;
  };

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    if (chartData.length === 0) return null;

    const totalPayout = chartData.reduce((sum, rep) => sum + rep.totalPayout, 0);
    const totalRevenue = chartData.reduce((sum, rep) => sum + rep.ytdRevenue, 0);
    const avgAttainment = chartData.reduce((sum, rep) => sum + rep.quotaAttainment, 0) / chartData.length;
    const topPerformer = chartData.reduce((top, rep) => 
      rep.quotaAttainment > top.quotaAttainment ? rep : top
    );

    return {
      totalPayout,
      totalRevenue,
      avgAttainment,
      topPerformer
    };
  }, [chartData]);

  if (selectedReps.length === 0) {
    return (
      <motion.div 
        className="card-glass"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-center py-8">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Icon name="BarChart3" size={48} className="mx-auto text-text-muted-dark mb-4" />
          </motion.div>
          <h3 className="text-lg font-medium text-text-primary-dark mb-2">Commission Visualization</h3>
          <p className="text-text-secondary-dark">
            Select sales representatives from the table to view their commission breakdown and quota attainment.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="card-glass glow-indigo"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="p-4 border-b border-glass-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-text-primary-dark">Commission & Quota Attainment</h3>
            <p className="text-sm text-text-secondary-dark mt-1">
              Total payout with bonus simulation for {selectedReps.length} representative{selectedReps.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          {summaryStats && (
            <motion.div 
              className="text-right glass-morphism-elevated px-4 py-2 rounded-xl glow-teal"
              key={summaryStats.totalPayout}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-2xl font-bold text-neon-teal">{formatCurrency(summaryStats.totalPayout)}</div>
              <div className="text-sm text-text-secondary-dark">Total Projected Payout</div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Chart */}
      <div className="p-4">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="rgba(255, 255, 255, 0.1)" 
                className="chart-gridlines"
              />
              <XAxis 
                dataKey="name" 
                stroke="rgba(255, 255, 255, 0.7)"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={60}
                className="chart-label"
              />
              <YAxis 
                stroke="rgba(255, 255, 255, 0.7)"
                fontSize={12}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                className="chart-label"
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="totalPayout" 
                radius={[4, 4, 0, 0]}
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth={1}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.quotaAttainment)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-neon-teal rounded glow-teal"></div>
            <span className="text-text-secondary-dark">≥100% Quota</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-400 rounded"></div>
            <span className="text-text-secondary-dark">80-99% Quota</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-400 rounded"></div>
            <span className="text-text-secondary-dark">&lt;80% Quota</span>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      {summaryStats && (
        <div className="p-4 border-t border-glass-border glass-morphism-elevated">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-lg font-semibold text-text-primary-dark">{formatCurrency(summaryStats.totalRevenue)}</div>
              <div className="text-xs text-text-secondary-dark">Total YTD Revenue</div>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-lg font-semibold text-text-primary-dark">{summaryStats.avgAttainment.toFixed(1)}%</div>
              <div className="text-xs text-text-secondary-dark">Avg Quota Attainment</div>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-lg font-semibold text-neon-indigo">{summaryStats.topPerformer.name.split(' ')[0]}</div>
              <div className="text-xs text-text-secondary-dark">Top Performer</div>
            </motion.div>
            <motion.div 
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-lg font-semibold text-text-primary-dark">{chartData.length}</div>
              <div className="text-xs text-text-secondary-dark">Representatives</div>
            </motion.div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CommissionChart;