import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '@/components/ui/AppIcon';

interface ProgressData {
  week: number;
  strength: number;
  endurance: number;
  technique: number;
}

interface MilestoneData {
  title: string;
  week: number;
  description: string;
  completed: boolean;
}

interface ProgressVisualizationProps {
  progressData: ProgressData[];
  milestones: MilestoneData[];
}

const ProgressVisualization = ({ progressData, milestones }: ProgressVisualizationProps) => {
  return (
    <div className="space-y-8">
      {/* Progress Charts */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-foreground mb-2">Performance Progression</h3>
          <p className="text-muted-foreground text-sm">Track your development across key metrics</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Line Chart */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center space-x-2">
              <Icon name="ChartBarIcon" size={16} className="text-primary" />
              <span>Overall Progress Trend</span>
            </h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" />
                  <XAxis 
                    dataKey="week" 
                    stroke="#a0a0a0"
                    fontSize={12}
                    tickFormatter={(value) => `Week ${value}`}
                  />
                  <YAxis 
                    stroke="#a0a0a0"
                    fontSize={12}
                    domain={[0, 100]}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#1a1a1a',
                      border: '1px solid #2d2d2d',
                      borderRadius: '8px',
                      color: '#ffffff'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="strength" 
                    stroke="#ff3366" 
                    strokeWidth={3}
                    dot={{ fill: '#ff3366', strokeWidth: 2, r: 4 }}
                    name="Strength"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="endurance" 
                    stroke="#0099ff" 
                    strokeWidth={3}
                    dot={{ fill: '#0099ff', strokeWidth: 2, r: 4 }}
                    name="Endurance"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="technique" 
                    stroke="#00ff88" 
                    strokeWidth={3}
                    dot={{ fill: '#00ff88', strokeWidth: 2, r: 4 }}
                    name="Technique"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center space-x-2">
              <Icon name="ChartBarSquareIcon" size={16} className="text-primary" />
              <span>Current Week Breakdown</span>
            </h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={progressData.slice(-1)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" />
                  <XAxis 
                    dataKey="week" 
                    stroke="#a0a0a0"
                    fontSize={12}
                    tickFormatter={(value) => `Week ${value}`}
                  />
                  <YAxis 
                    stroke="#a0a0a0"
                    fontSize={12}
                    domain={[0, 100]}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#1a1a1a',
                      border: '1px solid #2d2d2d',
                      borderRadius: '8px',
                      color: '#ffffff'
                    }}
                  />
                  <Bar dataKey="strength" fill="#ff3366" name="Strength" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="endurance" fill="#0099ff" name="Endurance" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="technique" fill="#00ff88" name="Technique" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Milestone Tracking */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-foreground mb-2">Milestone Tracking</h3>
          <p className="text-muted-foreground text-sm">Key achievements and upcoming goals</p>
        </div>

        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 bg-muted/20 rounded-lg border border-border">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                milestone.completed 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted border-2 border-muted-foreground'
              }`}>
                {milestone.completed ? (
                  <Icon name="CheckIcon" size={16} />
                ) : (
                  <span className="text-xs font-bold font-mono">{milestone.week}</span>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className={`font-semibold ${milestone.completed ? 'text-primary' : 'text-foreground'}`}>
                    {milestone.title}
                  </h4>
                  <span className="text-xs text-muted-foreground font-mono">Week {milestone.week}</span>
                </div>
                <p className="text-sm text-muted-foreground">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressVisualization;