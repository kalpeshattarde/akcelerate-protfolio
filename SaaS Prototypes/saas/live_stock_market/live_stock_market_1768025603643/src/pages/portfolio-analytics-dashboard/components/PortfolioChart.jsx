import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Bar } from 'recharts';
import Button from '../../../components/ui/Button';


const PortfolioChart = () => {
  const [chartType, setChartType] = useState('value');
  const [showBenchmark, setShowBenchmark] = useState(true);

  const chartData = [
    { date: '2024-01', portfolio: 1000000, benchmark: 1000000, returns: 0 },
    { date: '2024-02', portfolio: 1050000, benchmark: 1030000, returns: 5.0 },
    { date: '2024-03', portfolio: 1120000, benchmark: 1080000, returns: 12.0 },
    { date: '2024-04', portfolio: 1080000, benchmark: 1070000, returns: 8.0 },
    { date: '2024-05', portfolio: 1150000, benchmark: 1100000, returns: 15.0 },
    { date: '2024-06', portfolio: 1200000, benchmark: 1130000, returns: 20.0 },
    { date: '2024-07', portfolio: 1180000, benchmark: 1140000, returns: 18.0 },
    { date: '2024-08', portfolio: 1220000, benchmark: 1160000, returns: 22.0 },
    { date: '2024-09', portfolio: 1258473, benchmark: 1180000, returns: 25.84 }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(value);
  };

  const formatPercentage = (value) => {
    return `${value?.toFixed(1)}%`;
  };

  return (
    <div className="bg-card p-8 border-4 border-white">
      {/* BRUTALIST HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <div className="border-l-8 border-primary pl-4">
          <h2 className="text-2xl font-black text-card-foreground tracking-wider">PORTFOLIO</h2>
          <h3 className="text-lg font-black text-warning tracking-wider">PERFORMANCE</h3>
        </div>
        
        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          <div className="flex bg-muted p-2">
            <Button
              variant={chartType === 'value' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setChartType('value')}
              className="font-black tracking-wider bg-primary text-primary-foreground brutalist-hover"
            >
              VALUE
            </Button>
            <Button
              variant={chartType === 'returns' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setChartType('returns')}
              className="font-black tracking-wider bg-warning text-warning-foreground brutalist-hover"
            >
              RETURNS
            </Button>
          </div>
          
          <Button
            variant={showBenchmark ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowBenchmark(!showBenchmark)}
            iconName="BarChart3"
            iconPosition="left"
            className="font-black tracking-wider brutalist-shadow-sm brutalist-hover bg-secondary text-secondary-foreground"
          >
            BENCHMARK
          </Button>
        </div>
      </div>

      {/* CHART CONTAINER */}
      <div className="h-80 w-full bg-background p-4 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'value' ? (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="0" stroke="#000000" strokeWidth={2} />
              <XAxis 
                dataKey="date" 
                stroke="#000000"
                fontSize={14}
                fontWeight="bold"
                axisLine={{ stroke: '#000000', strokeWidth: 3 }}
                tickLine={{ stroke: '#000000', strokeWidth: 2 }}
              />
              <YAxis 
                stroke="#000000"
                fontSize={14}
                fontWeight="bold"
                tickFormatter={formatCurrency}
                axisLine={{ stroke: '#000000', strokeWidth: 3 }}
                tickLine={{ stroke: '#000000', strokeWidth: 2 }}
              />
              <Tooltip 
                formatter={(value, name) => [formatCurrency(value), name === 'portfolio' ? 'PORTFOLIO' : 'BENCHMARK']}
                labelStyle={{ color: '#000000', fontWeight: 'bold', fontFamily: 'Oswald' }}
                contentStyle={{ 
                  backgroundColor: '#FFFFFF',
                  border: '3px solid #000000',
                  borderRadius: '0px',
                  boxShadow: '4px 4px 0px #000000',
                  fontFamily: 'Oswald',
                  fontWeight: 'bold'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="portfolio" 
                stroke="#0000FF" 
                strokeWidth={6}
                dot={{ fill: '#0000FF', strokeWidth: 3, r: 6, stroke: '#000000' }}
                activeDot={{ r: 8, stroke: '#000000', strokeWidth: 3, fill: '#0000FF' }}
              />
              {showBenchmark && (
                <Line 
                  type="monotone" 
                  dataKey="benchmark" 
                  stroke="#FF00FF" 
                  strokeWidth={4}
                  strokeDasharray="0"
                  dot={{ fill: '#FF00FF', strokeWidth: 3, r: 4, stroke: '#000000' }}
                />
              )}
            </LineChart>
          ) : (
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="0" stroke="#000000" strokeWidth={2} />
              <XAxis 
                dataKey="date" 
                stroke="#000000"
                fontSize={14}
                fontWeight="bold"
                axisLine={{ stroke: '#000000', strokeWidth: 3 }}
                tickLine={{ stroke: '#000000', strokeWidth: 2 }}
              />
              <YAxis 
                stroke="#000000"
                fontSize={14}
                fontWeight="bold"
                tickFormatter={formatPercentage}
                axisLine={{ stroke: '#000000', strokeWidth: 3 }}
                tickLine={{ stroke: '#000000', strokeWidth: 2 }}
              />
              <Tooltip 
                formatter={(value) => [formatPercentage(value), 'RETURNS']}
                labelStyle={{ color: '#000000', fontWeight: 'bold', fontFamily: 'Oswald' }}
                contentStyle={{ 
                  backgroundColor: '#FFFFFF',
                  border: '3px solid #000000',
                  borderRadius: '0px',
                  boxShadow: '4px 4px 0px #000000',
                  fontFamily: 'Oswald',
                  fontWeight: 'bold'
                }}
              />
              <Bar 
                dataKey="returns" 
                fill="#00FF00"
                radius={[0, 0, 0, 0]}
                stroke="#000000"
                strokeWidth={2}
              />
            </ComposedChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* LEGEND AND STATUS */}
      <div className="flex items-center justify-between pt-6 border-t-4 border-border">
        <div className="flex items-center gap-8 text-base font-black">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-primary brutalist-border-thin"></div>
            <span className="text-card-foreground tracking-wider">PORTFOLIO</span>
          </div>
          {showBenchmark && (
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-secondary brutalist-border-thin"></div>
              <span className="text-card-foreground tracking-wider">BENCHMARK</span>
            </div>
          )}
        </div>
        
        <div className="text-base font-black text-card-foreground font-mono tracking-wider">
          LAST UPDATE: {new Date()?.toLocaleString('en-IN')}
        </div>
      </div>
    </div>
  );
};

export default PortfolioChart;