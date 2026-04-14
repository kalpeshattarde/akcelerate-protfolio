// src/pages/bulk-operations-center/components/SchedulingSystem.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const SchedulingSystem = ({ scheduledOperations = [], onCancelScheduled }) => {
  const [expandedOperation, setExpandedOperation] = useState(null);

  const handleCancelScheduled = (operationId) => {
    if (onCancelScheduled) {
      onCancelScheduled(operationId);
    }
  };

  const toggleOperationExpansion = (operationId) => {
    setExpandedOperation(expandedOperation === operationId ? null : operationId);
  };

  const formatScheduleDisplay = (operation) => {
    if (!operation) return '';
    
    if (operation.type === 'immediate') {
      return 'Execute immediately';
    }
    
    if (operation.type === 'scheduled') {
      const date = new Date(operation.scheduledTime);
      return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
    }
    
    if (operation.type === 'recurring') {
      const frequency = operation.recurring?.frequency || 'weekly';
      return `Recurring ${frequency}`;
    }
    
    return 'Unknown schedule';
  };

  return (
    <div className="glass-morphism rounded-2xl p-6 border border-white/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 glass-morphism rounded-full flex items-center justify-center glow-indigo">
            <Icon name="Clock" size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Scheduled Operations</h3>
            <p className="text-sm text-white/70">
              {scheduledOperations.length} operation{scheduledOperations.length !== 1 ? 's' : ''} scheduled
            </p>
          </div>
        </div>
      </div>

      {/* Scheduled Operations List */}
      <div className="space-y-4">
        {scheduledOperations.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Calendar" size={48} className="text-white/30 mx-auto mb-3" />
            <p className="text-white/70">No scheduled operations</p>
            <p className="text-sm text-white/50">Operations will appear here when scheduled</p>
          </div>
        ) : (
          scheduledOperations.map((operation) => (
            <div
              key={operation.id}
              className="glass-morphism rounded-xl p-4 border border-white/20 hover:border-white/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Icon name="Calendar" size={16} className="text-blue-400" />
                    <h4 className="font-medium text-white">{operation.operation || operation.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      operation.type === 'immediate' ? 'bg-green-500/20 text-green-400' :
                      operation.type === 'scheduled'? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'
                    }`}>
                      {operation.type === 'immediate' ? 'Immediate' :
                       operation.type === 'scheduled' ? 'Scheduled' : 'Recurring'}
                    </span>
                  </div>
                  
                  <div className="text-sm text-white/70 space-y-1">
                    <p>Schedule: {formatScheduleDisplay(operation)}</p>
                    {operation.timezone && (
                      <p>Timezone: {operation.timezone}</p>
                    )}
                    {operation.offPeakOnly && (
                      <p className="flex items-center space-x-1">
                        <Icon name="Moon" size={12} className="text-blue-400" />
                        <span>Off-peak hours only</span>
                      </p>
                    )}
                    {operation.emailNotifications && (
                      <p className="flex items-center space-x-1">
                        <Icon name="Mail" size={12} className="text-green-400" />
                        <span>Email notifications enabled</span>
                      </p>
                    )}
                  </div>
                  
                  {operation.createdAt && (
                    <p className="text-xs text-white/50 mt-2">
                      Created: {new Date(operation.createdAt).toLocaleString()}
                    </p>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => toggleOperationExpansion(operation.id)}
                    className="p-2 glass-morphism hover:glass-morphism-hover rounded-xl transition-all duration-300"
                    title="View details"
                  >
                    <Icon 
                      name={expandedOperation === operation.id ? "ChevronUp" : "ChevronDown"} 
                      size={16} 
                      className="text-white/80 hover:text-white" 
                    />
                  </button>
                  <button
                    onClick={() => handleCancelScheduled(operation.id)}
                    className="p-2 glass-morphism hover:glass-morphism-hover rounded-xl transition-all duration-300 text-red-400 hover:text-red-300"
                    title="Cancel scheduled operation"
                  >
                    <Icon name="X" size={16} />
                  </button>
                </div>
              </div>
              
              {/* Expanded Details */}
              {expandedOperation === operation.id && (
                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {operation.recurring && (
                      <div>
                        <h5 className="font-medium text-white mb-2">Recurring Settings</h5>
                        <div className="text-white/70 space-y-1">
                          <p>Frequency: {operation.recurring.frequency}</p>
                          <p>End condition: {operation.recurring.endType}</p>
                          {operation.recurring.endDate && (
                            <p>End date: {new Date(operation.recurring.endDate).toLocaleDateString()}</p>
                          )}
                          {operation.recurring.count && (
                            <p>Executions: {operation.recurring.count}</p>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {operation.emailNotifications && operation.notificationEmails?.length > 0 && (
                      <div>
                        <h5 className="font-medium text-white mb-2">Email Recipients</h5>
                        <div className="text-white/70 space-y-1">
                          {operation.notificationEmails.map((email, index) => (
                            <p key={index} className="flex items-center space-x-2">
                              <Icon name="Mail" size={12} className="text-blue-400" />
                              <span>{email}</span>
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {operation.offPeakOnly && operation.offPeakHours && (
                      <div>
                        <h5 className="font-medium text-white mb-2">Off-Peak Schedule</h5>
                        <div className="text-white/70">
                          <p>{operation.offPeakHours}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SchedulingSystem;