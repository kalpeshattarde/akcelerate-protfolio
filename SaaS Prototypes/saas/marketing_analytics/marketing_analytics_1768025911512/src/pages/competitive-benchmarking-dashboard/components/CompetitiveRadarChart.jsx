import React, { useState } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const CompetitiveRadarChart = () => {
  const [selectedCompetitors, setSelectedCompetitors] = useState(['our-brand', 'competitor-a', 'competitor-b']);

  const radarData = [
    {
      metric: 'Brand Awareness',
      'our-brand': 68,
      'competitor-a': 75,
      'competitor-b': 62,
      'competitor-c': 58,
      'competitor-d': 71
    },
    {
      metric: 'Market Share',
      'our-brand': 12.4,
      'competitor-a': 18.2,
      'competitor-b': 9.8,
      'competitor-c': 7.5,
      'competitor-d': 15.1
    },
    {
      metric: 'CPL Efficiency',
      'our-brand': 82,
      'competitor-a': 78,
      'competitor-b': 71,
      'competitor-c': 65,
      'competitor-d': 74
    },
    {
      metric: 'Digital Presence',
      'our-brand': 76,
      'competitor-a': 82,
      'competitor-b': 68,
      'competitor-c': 59,
      'competitor-d': 73
    },
    {
      metric: 'Customer Satisfaction',
      'our-brand': 85,
      'competitor-a': 79,
      'competitor-b': 74,
      'competitor-c': 71,
      'competitor-d': 77
    },
    {
      metric: 'Innovation Index',
      'our-brand': 72,
      'competitor-a': 68,
      'competitor-b': 65,
      'competitor-c': 58,
      'competitor-d': 70
    }
  ];

  const competitors = [
    { id: 'our-brand', name: 'Our Brand', color: '#00D4FF', enabled: true },
    { id: 'competitor-a', name: 'Market Leader', color: '#8B5CF6', enabled: true },
    { id: 'competitor-b', name: 'Direct Rival', color: '#39FF14', enabled: true },
    { id: 'competitor-c', name: 'Emerging Player', color: '#F59E0B', enabled: false },
    { id: 'competitor-d', name: 'Industry Veteran', color: '#EF4444', enabled: false }
  ];

  const toggleCompetitor = (competitorId) => {
    const updatedCompetitors = competitors?.map(comp => 
      comp?.id === competitorId ? { ...comp, enabled: !comp?.enabled } : comp
    );
    
    const enabledIds = updatedCompetitors?.filter(comp => comp?.enabled)?.map(comp => comp?.id);
    setSelectedCompetitors(enabledIds);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="glass-card p-3 border border-border/50">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-xs">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-muted-foreground">
                {competitors?.find(c => c?.id === entry?.dataKey)?.name}:
              </span>
              <span className="font-medium text-foreground">
                {entry?.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Radar" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">
            Competitive Performance Radar
          </h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name="Info" size={16} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            Click legend items to toggle competitors
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3">
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis 
                  dataKey="metric" 
                  tick={{ fill: '#A1A1AA', fontSize: 12 }}
                  className="text-xs"
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]} 
                  tick={{ fill: '#A1A1AA', fontSize: 10 }}
                  tickCount={5}
                />
                
                {competitors?.filter(comp => comp?.enabled)?.map((competitor) => (
                  <Radar
                    key={competitor?.id}
                    name={competitor?.name}
                    dataKey={competitor?.id}
                    stroke={competitor?.color}
                    fill={competitor?.color}
                    fillOpacity={0.1}
                    strokeWidth={2}
                    dot={{ fill: competitor?.color, strokeWidth: 2, r: 4 }}
                  />
                ))}
                
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="xl:col-span-1">
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground mb-4">
              Competitor Selection
            </h4>
            {competitors?.map((competitor) => (
              <div
                key={competitor?.id}
                className={`
                  flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200
                  ${competitor?.enabled 
                    ? 'bg-primary/10 border border-primary/20' :'bg-muted/20 border border-transparent hover:bg-muted/30'
                  }
                `}
                onClick={() => toggleCompetitor(competitor?.id)}
              >
                <div
                  className="w-4 h-4 rounded-full border-2"
                  style={{
                    backgroundColor: competitor?.enabled ? competitor?.color : 'transparent',
                    borderColor: competitor?.color
                  }}
                />
                <div className="flex-1">
                  <span className={`text-sm font-medium ${
                    competitor?.enabled ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {competitor?.name}
                  </span>
                  {competitor?.id === 'our-brand' && (
                    <div className="flex items-center space-x-1 mt-1">
                      <Icon name="Star" size={12} className="text-warning fill-current" />
                      <span className="text-xs text-warning">Your Brand</span>
                    </div>
                  )}
                </div>
                <Icon 
                  name={competitor?.enabled ? "Eye" : "EyeOff"} 
                  size={16} 
                  className={competitor?.enabled ? "text-primary" : "text-muted-foreground"}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitiveRadarChart;