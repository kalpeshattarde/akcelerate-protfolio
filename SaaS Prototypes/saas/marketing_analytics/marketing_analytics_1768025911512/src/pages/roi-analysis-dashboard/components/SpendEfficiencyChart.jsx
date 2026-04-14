import React, { useState } from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';

const SpendEfficiencyChart = () => {
  const [timeRange, setTimeRange] = useState('6m');
  const [showTrends, setShowTrends] = useState(true);

  const efficiencyData = [
    { month: 'Jan', spend: 45000, efficiency: 3.2, marketTrend: 2.8, seasonalIndex: 0.9 },
    { month: 'Feb', spend: 52000, efficiency: 3.6, marketTrend: 3.1, seasonalIndex: 0.95 },
    { month: 'Mar', spend: 48000, efficiency: 4.1, marketTrend: 3.4, seasonalIndex: 1.1 },
    { month: 'Apr', spend: 55000, efficiency: 3.8, marketTrend: 3.2, seasonalIndex: 1.05 },
    { month: 'May', spend: 62000, efficiency: 4.3, marketTrend: 3.6, seasonalIndex: 1.15 },
    { month: 'Jun', spend: 58000, efficiency: 4.7, marketTrend: 3.8, seasonalIndex: 1.2 },
    { month: 'Jul', spend: 65000, efficiency: 4.2, marketTrend: 3.5, seasonalIndex: 1.1 },
    { month: 'Aug', spend: 70000, efficiency: 4.8, marketTrend: 4.0, seasonalIndex: 1.25 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 p-4 rounded-lg shadow-lg">
          <p className="font-medium text-foreground mb-3">{label} 2024</p>
          <div className="space-y-2">
            {payload?.map((entry, index) => (
              <div key={index} className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: entry?.color }}
                  />
                  <span className="text-sm text-muted-foreground">{entry?.name}:</span>
                </div>
                <span className="text-sm font-medium text-foreground">
                  {entry?.name === 'spend' ? `$${entry?.value?.toLocaleString()}` : 
                   entry?.name === 'seasonalIndex' ? `${entry?.value}x` :
                   `${entry?.value}x`}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-800/20 backdrop-blur-sm border border-gray-700/30 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
            <Icon name="TrendingUp" size={20} className="text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Spend Efficiency Trends</h3>
            <p className="text-sm text-muted-foreground">ROI performance over time with market indicators</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showTrends"
              checked={showTrends}
              onChange={(e) => setShowTrends(e?.target?.checked)}
              className="w-4 h-4 text-primary bg-gray-800/50 border-gray-700/50 rounded focus:ring-primary/50"
            />
            <label htmlFor="showTrends" className="text-sm text-muted-foreground">
              Market Trends
            </label>
          </div>
          
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e?.target?.value)}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="3m">3 Months</option>
            <option value="6m">6 Months</option>
            <option value="12m">12 Months</option>
          </select>
          
          <button className="p-2 rounded-lg hover:bg-gray-800/40 backdrop-blur-sm transition-colors duration-200">
            <Icon name="Download" size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={efficiencyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="month" 
              tick={{ fill: '#A1A1AA', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            />
            <YAxis 
              yAxisId="left"
              tick={{ fill: '#A1A1AA', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              tickFormatter={(value) => `$${(value / 1000)?.toFixed(0)}K`}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              tick={{ fill: '#A1A1AA', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              tickFormatter={(value) => `${value}x`}
            />
            <Tooltip content={<CustomTooltip />} />
            
            <Bar 
              yAxisId="left"
              dataKey="spend" 
              fill="rgba(139, 92, 246, 0.3)"
              stroke="#8B5CF6"
              strokeWidth={1}
              radius={[4, 4, 0, 0]}
              name="Marketing Spend"
            />
            
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="efficiency"
              stroke="#10B981"
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
              name="ROI Efficiency"
            />
            
            {showTrends && (
              <>
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="marketTrend"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Market Trend"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="seasonalIndex"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  strokeDasharray="3 3"
                  dot={false}
                  name="Seasonal Index"
                />
              </>
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-border/50">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-1">
            <div className="w-3 h-3 bg-primary rounded"></div>
            <span className="text-sm text-muted-foreground">Avg Spend</span>
          </div>
          <div className="text-lg font-bold text-foreground">$57.5K</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-1">
            <div className="w-3 h-3 bg-success rounded"></div>
            <span className="text-sm text-muted-foreground">Avg ROI</span>
          </div>
          <div className="text-lg font-bold text-success">4.2x</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-1">
            <div className="w-3 h-3 bg-secondary rounded"></div>
            <span className="text-sm text-muted-foreground">Market Trend</span>
          </div>
          <div className="text-lg font-bold text-secondary">3.4x</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-1">
            <div className="w-3 h-3 bg-warning rounded"></div>
            <span className="text-sm text-muted-foreground">Seasonal</span>
          </div>
          <div className="text-lg font-bold text-warning">1.1x</div>
        </div>
      </div>
    </div>
  );
};

export default SpendEfficiencyChart;