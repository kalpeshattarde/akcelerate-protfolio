import React, { useState, useMemo } from 'react';
import { format, startOfDay, endOfDay, eachDayOfInterval } from 'date-fns';
import Icon from '../../../components/AppIcon';

const TimelineVisualization = ({ records }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [zoomLevel, setZoomLevel] = useState('day'); // day, hour, minute

  // Group records by date
  const recordsByDate = useMemo(() => {
    const grouped = {};
    records.forEach(record => {
      const date = format(new Date(record.timestamp), 'yyyy-MM-dd');
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(record);
    });
    return grouped;
  }, [records]);

  // Get date range
  const dateRange = useMemo(() => {
    if (records.length === 0) return { start: new Date(), end: new Date() };
    
    const timestamps = records.map(r => new Date(r.timestamp));
    const start = new Date(Math.min(...timestamps));
    const end = new Date(Math.max(...timestamps));
    
    return {
      start: startOfDay(start),
      end: endOfDay(end)
    };
  }, [records]);

  // Generate timeline days
  const timelineDays = useMemo(() => {
    return eachDayOfInterval(dateRange);
  }, [dateRange]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return '#EF4444';
      case 'high': return '#F59E0B';
      case 'medium': return '#3B82F6';
      case 'low': return '#10B981';
      default: return '#64748B';
    }
  };

  const getActionTypeIcon = (actionType) => {
    switch (actionType) {
      case 'CREATE': return 'Plus';
      case 'UPDATE': return 'Edit';
      case 'DELETE': return 'Trash2';
      case 'APPROVE': return 'CheckCircle';
      case 'REJECT': return 'XCircle';
      case 'SECURITY': return 'Shield';
      case 'ALERT': return 'AlertTriangle';
      default: return 'Activity';
    }
  };

  const handleDateClick = (date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    setSelectedDate(selectedDate === dateKey ? null : dateKey);
  };

  const getEventIntensity = (count) => {
    if (count === 0) return 'bg-secondary-100';
    if (count <= 2) return 'bg-success-200';
    if (count <= 5) return 'bg-warning-200';
    if (count <= 10) return 'bg-error-200';
    return 'bg-error-400';
  };

  return (
    <div className="h-full flex flex-col bg-surface">
      {/* Timeline Controls */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading-semibold text-text-primary">
            Audit Timeline Visualization
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setZoomLevel('day')}
              className={`px-3 py-1.5 text-sm rounded-button transition-smooth ${
                zoomLevel === 'day' ?'bg-primary text-white' :'bg-secondary-100 text-text-secondary hover:bg-secondary-200'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setZoomLevel('hour')}
              className={`px-3 py-1.5 text-sm rounded-button transition-smooth ${
                zoomLevel === 'hour' ?'bg-primary text-white' :'bg-secondary-100 text-text-secondary hover:bg-secondary-200'
              }`}
            >
              Hour
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-secondary-100 rounded"></div>
            <span className="text-text-secondary">No events</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success-200 rounded"></div>
            <span className="text-text-secondary">1-2 events</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning-200 rounded"></div>
            <span className="text-text-secondary">3-5 events</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error-200 rounded"></div>
            <span className="text-text-secondary">6-10 events</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error-400 rounded"></div>
            <span className="text-text-secondary">10+ events</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {/* Timeline Grid */}
        <div className="mb-8">
          <h4 className="text-sm font-heading-medium text-text-primary mb-4">
            Activity Heatmap
          </h4>
          <div className="grid grid-cols-7 gap-2">
            {/* Day headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-xs text-text-secondary text-center py-2">
                {day}
              </div>
            ))}
            
            {/* Timeline cells */}
            {timelineDays.map((date, index) => {
              const dateKey = format(date, 'yyyy-MM-dd');
              const dayRecords = recordsByDate[dateKey] || [];
              const isSelected = selectedDate === dateKey;
              
              return (
                <button
                  key={index}
                  onClick={() => handleDateClick(date)}
                  className={`w-8 h-8 rounded text-xs transition-smooth ${
                    getEventIntensity(dayRecords.length)
                  } ${
                    isSelected 
                      ? 'ring-2 ring-primary ring-offset-2' :'hover:ring-1 hover:ring-secondary-300'
                  }`}
                  title={`${format(date, 'MMM dd, yyyy')}: ${dayRecords.length} events`}
                >
                  {format(date, 'd')}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Date Details */}
        {selectedDate && recordsByDate[selectedDate] && (
          <div className="bg-secondary-50 rounded-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-heading-semibold text-text-primary">
                Events for {format(new Date(selectedDate), 'MMMM dd, yyyy')}
              </h4>
              <span className="text-sm text-text-secondary">
                {recordsByDate[selectedDate].length} events
              </span>
            </div>

            {/* Timeline for selected date */}
            <div className="space-y-4">
              {recordsByDate[selectedDate]
                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                .map((record, index) => (
                <div key={record.id} className="flex items-start space-x-4">
                  {/* Timeline marker */}
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: getSeverityColor(record.severity) + '20' }}
                    >
                      <Icon 
                        name={getActionTypeIcon(record.actionType)} 
                        size={16} 
                        style={{ color: getSeverityColor(record.severity) }}
                      />
                    </div>
                    {index < recordsByDate[selectedDate].length - 1 && (
                      <div className="w-0.5 h-8 bg-border mt-2"></div>
                    )}
                  </div>

                  {/* Event details */}
                  <div className="flex-1 bg-surface rounded-button p-4 border border-border">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h5 className="font-heading-medium text-text-primary">
                          {record.action}
                        </h5>
                        <p className="text-sm text-text-secondary">
                          by {record.userName}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-text-primary">
                          {format(new Date(record.timestamp), 'HH:mm:ss')}
                        </div>
                        <span 
                          className="inline-flex items-center px-2 py-1 rounded-button text-xs font-body-medium"
                          style={{ 
                            backgroundColor: getSeverityColor(record.severity) + '20',
                            color: getSeverityColor(record.severity)
                          }}
                        >
                          {record.severity}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-text-secondary mb-2">
                      {record.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-text-secondary">
                          Record: {record.affectedRecord}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {record.complianceTags.map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className="inline-flex items-center px-2 py-1 rounded-button text-xs bg-primary-100 text-primary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Summary Statistics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface rounded-card p-6 border border-border">
            <div className="flex items-center space-x-3 mb-3">
              <Icon name="TrendingUp" size={20} className="text-primary" />
              <h4 className="font-heading-medium text-text-primary">Peak Activity</h4>
            </div>
            <div className="text-2xl font-heading-bold text-text-primary mb-1">
              {Math.max(...Object.values(recordsByDate).map(records => records.length))}
            </div>
            <p className="text-sm text-text-secondary">
              events in a single day
            </p>
          </div>

          <div className="bg-surface rounded-card p-6 border border-border">
            <div className="flex items-center space-x-3 mb-3">
              <Icon name="Calendar" size={20} className="text-success" />
              <h4 className="font-heading-medium text-text-primary">Active Days</h4>
            </div>
            <div className="text-2xl font-heading-bold text-text-primary mb-1">
              {Object.keys(recordsByDate).length}
            </div>
            <p className="text-sm text-text-secondary">
              out of {timelineDays.length} total days
            </p>
          </div>

          <div className="bg-surface rounded-card p-6 border border-border">
            <div className="flex items-center space-x-3 mb-3">
              <Icon name="BarChart3" size={20} className="text-warning" />
              <h4 className="font-heading-medium text-text-primary">Daily Average</h4>
            </div>
            <div className="text-2xl font-heading-bold text-text-primary mb-1">
              {(records.length / Math.max(timelineDays.length, 1)).toFixed(1)}
            </div>
            <p className="text-sm text-text-secondary">
              events per day
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineVisualization;