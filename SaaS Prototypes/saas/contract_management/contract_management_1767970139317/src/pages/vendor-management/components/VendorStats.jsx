import React from 'react';
import Icon from '../../../components/AppIcon';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const VendorStats = ({ vendors }) => {
  // Calculate statistics
  const totalVendors = vendors?.length;
  const activeVendors = vendors?.filter(v => v?.status === 'Active')?.length;
  const totalSpend = vendors?.reduce((sum, v) => sum + v?.totalSpend, 0);
  const avgPerformance = vendors?.reduce((sum, v) => sum + v?.performanceScore, 0) / totalVendors;

  // Category distribution
  const categoryData = vendors?.reduce((acc, vendor) => {
    acc[vendor.category] = (acc?.[vendor?.category] || 0) + 1;
    return acc;
  }, {});

  const categoryChartData = Object.entries(categoryData)?.map(([name, value]) => ({
    name,
    value,
    color: getRandomColor()
  }));

  // Performance distribution
  const performanceRanges = {
    'Excellent (90-100%)': vendors?.filter(v => v?.performanceScore >= 90)?.length,
    'Good (75-89%)': vendors?.filter(v => v?.performanceScore >= 75 && v?.performanceScore < 90)?.length,
    'Average (60-74%)': vendors?.filter(v => v?.performanceScore >= 60 && v?.performanceScore < 75)?.length,
    'Poor (0-59%)': vendors?.filter(v => v?.performanceScore < 60)?.length
  };

  const performanceChartData = Object.entries(performanceRanges)?.map(([name, value]) => ({
    name,
    value,
    color: name?.includes('Excellent') ? '#059669' : 
           name?.includes('Good') ? '#0EA5E9' :
           name?.includes('Average') ? '#D97706' : '#DC2626'
  }));

  // Spend by category
  const spendByCategory = vendors?.reduce((acc, vendor) => {
    acc[vendor.category] = (acc?.[vendor?.category] || 0) + vendor?.totalSpend;
    return acc;
  }, {});

  const spendChartData = Object.entries(spendByCategory)?.map(([name, value]) => ({
    name,
    value
  }));

  function getRandomColor() {
    const colors = ['#0EA5E9', '#059669', '#D97706', '#DC2626', '#7C3AED', '#EC4899', '#10B981', '#F59E0B'];
    return colors?.[Math.floor(Math.random() * colors?.length)];
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* Key Metrics */}
      <div className="lg:col-span-1 space-y-4">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Key Metrics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Building2" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Vendors</p>
                  <p className="text-xl font-bold text-text-primary">{totalVendors}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="CheckCircle" size={20} className="text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Vendors</p>
                  <p className="text-xl font-bold text-text-primary">{activeVendors}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="DollarSign" size={20} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Spend</p>
                  <p className="text-xl font-bold text-text-primary">${totalSpend?.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Icon name="TrendingUp" size={20} className="text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Performance</p>
                  <p className="text-xl font-bold text-text-primary">{avgPerformance?.toFixed(1)}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Category Distribution */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Vendor Categories</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryChartData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryChartData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 space-y-2">
          {categoryChartData?.slice(0, 4)?.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item?.color }}
                />
                <span className="text-muted-foreground">{item?.name}</span>
              </div>
              <span className="font-medium text-text-primary">{item?.value}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Performance Distribution */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Performance Distribution</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceChartData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={80} fontSize={12} />
              <Tooltip />
              <Bar dataKey="value" fill="#0EA5E9" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default VendorStats;