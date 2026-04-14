// src/pages/bulk-operations-center/components/ProgressMonitor.jsx
import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const ProgressMonitor = ({ 
  operationStatus, 
  currentProgress, 
  processedRecords, 
  totalRecords, 
  selectedOperation 
}) => {
  const [estimatedCompletion, setEstimatedCompletion] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [operationSpeed, setOperationSpeed] = useState(0);

  useEffect(() => {
    if (operationStatus === 'processing' && !startTime) {
      setStartTime(new Date());
    }
  }, [operationStatus]);

  useEffect(() => {
    if (startTime && processedRecords > 0) {
      const elapsedTime = (new Date() - startTime) / 1000; // seconds
      const speed = processedRecords / elapsedTime; // records per second
      setOperationSpeed(speed);
      
      if (speed > 0) {
        const remainingRecords = totalRecords - processedRecords;
        const remainingTime = remainingRecords / speed;
        setEstimatedCompletion(new Date(Date.now() + remainingTime * 1000));
      }
    }
  }, [processedRecords, startTime, totalRecords]);

  const getStatusInfo = () => {
    switch (operationStatus) {
      case 'uploading':
        return {
          icon: 'Upload',
          color: 'text-info',
          bgColor: 'bg-info-50',
          title: 'Uploading Files',
          description: 'Transferring files to the server...'
        };
      case 'validating':
        return {
          icon: 'Shield',
          color: 'text-warning',
          bgColor: 'bg-warning-50',
          title: 'Validating Data',
          description: 'Checking data integrity and format...'
        };
      case 'processing':
        return {
          icon: 'RefreshCw',
          color: 'text-primary',
          bgColor: 'bg-primary-50',
          title: 'Processing Operation',
          description: 'Executing bulk operation...'
        };
      case 'completed':
        return {
          icon: 'CheckCircle',
          color: 'text-success',
          bgColor: 'bg-success-50',
          title: 'Operation Completed',
          description: 'All records processed successfully'
        };
      case 'error':
        return {
          icon: 'XCircle',
          color: 'text-error',
          bgColor: 'bg-error-50',
          title: 'Operation Failed',
          description: 'An error occurred during processing'
        };
      default:
        return {
          icon: 'Clock',
          color: 'text-secondary-600',
          bgColor: 'bg-secondary-50',
          title: 'Ready to Process',
          description: 'Waiting for operation to begin'
        };
    }
  };

  const formatDuration = (seconds) => {
    if (seconds < 60) {
      return `${Math.round(seconds)}s`;
    } else if (seconds < 3600) {
      return `${Math.round(seconds / 60)}m ${Math.round(seconds % 60)}s`;
    } else {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.round((seconds % 3600) / 60);
      return `${hours}h ${minutes}m`;
    }
  };

  const formatSpeed = (speed) => {
    if (speed < 1) {
      return `${Math.round(speed * 60)} records/min`;
    } else {
      return `${Math.round(speed)} records/sec`;
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="bg-surface border border-border rounded-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Progress Monitor</h3>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${statusInfo.bgColor}`}>
          <Icon 
            name={statusInfo.icon} 
            size={16} 
            className={`${statusInfo.color} ${
              ['uploading', 'validating', 'processing'].includes(operationStatus) ? 'animate-spin' : ''
            }`} 
          />
        </div>
      </div>

      {/* Status Header */}
      <div className={`p-3 rounded-sm mb-4 ${statusInfo.bgColor}`}>
        <div className="flex items-center space-x-3">
          <Icon name={statusInfo.icon} size={20} className={statusInfo.color} />
          <div>
            <h4 className="font-medium text-text-primary">{statusInfo.title}</h4>
            <p className="text-sm text-text-secondary">{statusInfo.description}</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {operationStatus !== 'idle' && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-primary">
              Progress: {Math.round(currentProgress)}%
            </span>
            <span className="text-sm text-text-secondary">
              {processedRecords} / {totalRecords} records
            </span>
          </div>
          <div className="w-full bg-secondary-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-300 ${
                operationStatus === 'completed' ? 'bg-success' :
                operationStatus === 'error'? 'bg-error' : 'bg-primary'
              }`}
              style={{ width: `${currentProgress}%` }}
            >
              {currentProgress > 10 && (
                <div className="h-full flex items-center justify-center">
                  <span className="text-xs font-medium text-white">
                    {Math.round(currentProgress)}%
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Operation Details */}
      {selectedOperation && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-3 bg-secondary-50 rounded-sm">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="GitBranch" size={14} className="text-secondary-600" />
              <span className="text-xs font-medium text-text-secondary">Operation</span>
            </div>
            <p className="text-sm font-medium text-text-primary">{selectedOperation.name}</p>
          </div>
          
          {startTime && (
            <div className="p-3 bg-secondary-50 rounded-sm">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="Clock" size={14} className="text-secondary-600" />
                <span className="text-xs font-medium text-text-secondary">Started</span>
              </div>
              <p className="text-sm font-medium text-text-primary">
                {startTime.toLocaleTimeString()}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Performance Metrics */}
      {operationStatus === 'processing' && operationSpeed > 0 && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-3 bg-info-50 rounded-sm">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="Zap" size={14} className="text-info" />
              <span className="text-xs font-medium text-text-secondary">Processing Speed</span>
            </div>
            <p className="text-sm font-medium text-text-primary">
              {formatSpeed(operationSpeed)}
            </p>
          </div>
          
          {estimatedCompletion && (
            <div className="p-3 bg-warning-50 rounded-sm">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="Target" size={14} className="text-warning" />
                <span className="text-xs font-medium text-text-secondary">Est. Completion</span>
              </div>
              <p className="text-sm font-medium text-text-primary">
                {estimatedCompletion.toLocaleTimeString()}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Completion Summary */}
      {operationStatus === 'completed' && (
        <div className="p-3 bg-success-50 rounded-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-success">Operation Completed Successfully</p>
              <p className="text-sm text-text-secondary">
                Processed {totalRecords} records
                {startTime && (
                  <> in {formatDuration((new Date() - startTime) / 1000)}</>
                )}
              </p>
            </div>
            <Icon name="CheckCircle" size={24} className="text-success" />
          </div>
        </div>
      )}

      {/* Error State */}
      {operationStatus === 'error' && (
        <div className="p-3 bg-error-50 rounded-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-error">Operation Failed</p>
              <p className="text-sm text-text-secondary">
                {processedRecords} of {totalRecords} records processed before error
              </p>
            </div>
            <Icon name="XCircle" size={24} className="text-error" />
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          {operationStatus === 'processing' && (
            <button className="flex items-center space-x-2 px-3 py-2 text-error hover:bg-error-50 rounded-sm transition-smooth">
              <Icon name="Square" size={16} />
              <span>Cancel</span>
            </button>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 px-3 py-2 text-text-secondary hover:text-text-primary transition-smooth">
            <Icon name="RefreshCw" size={16} />
            <span>Refresh</span>
          </button>
          
          {operationStatus === 'completed' && (
            <button className="flex items-center space-x-2 px-3 py-2 bg-primary text-white rounded-sm hover:bg-primary-700 transition-smooth">
              <Icon name="Download" size={16} />
              <span>Download Report</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressMonitor;