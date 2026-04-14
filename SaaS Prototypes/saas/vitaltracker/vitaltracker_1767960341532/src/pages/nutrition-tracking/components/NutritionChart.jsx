import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NutritionChart = () => {
  const [activeTab, setActiveTab] = useState('calories');

  // Mock data for the last 7 days
  const weeklyData = [
    { day: 'Mon', calories: 1850, protein: 95, carbs: 220, fat: 65 },
    { day: 'Tue', calories: 2100, protein: 110, carbs: 250, fat: 75 },
    { day: 'Wed', calories: 1950, protein: 88, carbs: 240, fat: 70 },
    { day: 'Thu', calories: 2200, protein: 120, carbs: 260, fat: 80 },
    { day: 'Fri', calories: 1800, protein: 85, carbs: 210, fat: 60 },
    { day: 'Sat', calories: 2300, protein: 125, carbs: 280, fat: 85 },
    { day: 'Sun', calories: 2000, protein: 100, carbs: 235, fat: 72 }
  ];

  // Today's macronutrient breakdown
  const macroData = [
    { name: 'Protein', value: 25, color: '#10B981' },
    { name: 'Carbs', value: 50, color: '#3B82F6' },
    { name: 'Fat', value: 25, color: '#F59E0B' }
  ];

  const tabs = [
    { id: 'calories', label: 'Calories', icon: 'Zap' },
    { id: 'macros', label: 'Macros', icon: 'PieChart' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border/40 rounded-lg p-3 shadow-wellness elevation-2">
          <p className="font-medium text-foreground">{label}</p>
          <p className="text-sm text-primary">
            {activeTab === 'calories' ? 'Calories: ' : 'Value: '}
            <span className="font-semibold">{payload?.[0]?.value}</span>
            {activeTab === 'calories' ? ' kcal' : 'g'}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-xl p-6 elevation-2">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Nutrition Analytics</h3>
        <div className="flex space-x-1 bg-muted/30 rounded-lg p-1">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === tab?.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {activeTab === 'calories' && (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="day" 
                stroke="#6B7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6B7280"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="calories" 
                fill="#5DB075" 
                radius={[4, 4, 0, 0]}
                className="hover:opacity-80 transition-opacity"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      {activeTab === 'macros' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={macroData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {macroData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Percentage']}
                  labelStyle={{ color: '#1F2937' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Today's Breakdown</h4>
            {macroData?.map((macro, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: macro?.color }}
                  />
                  <span className="text-sm font-medium text-foreground">{macro?.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">{macro?.value}%</span>
              </div>
            ))}
            
            <div className="pt-4 border-t border-border/40">
              <Button variant="outline" size="sm" fullWidth iconName="Download">
                Export Data
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionChart;