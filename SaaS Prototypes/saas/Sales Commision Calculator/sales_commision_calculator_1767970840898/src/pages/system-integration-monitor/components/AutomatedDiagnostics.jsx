// src/pages/system-integration-monitor/components/AutomatedDiagnostics.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AutomatedDiagnostics = ({ diagnosticsResults, onRunDiagnostics }) => {
  const [selectedTests, setSelectedTests] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [scheduledTests, setScheduledTests] = useState({
    daily_health_check: true,
    hourly_connectivity: true,
    weekly_performance: false,
    monthly_security: true
  });
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const availableTests = [
    {
      id: 'connectivity',
      name: 'Connectivity Test',
      description: 'Verify all system endpoints are reachable',
      duration: '2-5 minutes',
      systems: ['HRIS', 'CRM', 'Payroll', 'Identity Provider'],
      category: 'connection'
    },
    {
      id: 'authentication',
      name: 'Authentication Test',
      description: 'Validate authentication credentials and tokens',
      duration: '3-8 minutes',
      systems: ['HRIS', 'CRM', 'Payroll', 'Identity Provider'],
      category: 'security'
    },
    {
      id: 'data_validation',
      name: 'Data Validation Check',
      description: 'Verify data integrity and schema compliance',
      duration: '5-15 minutes',
      systems: ['HRIS', 'CRM', 'Payroll'],
      category: 'data'
    },
    {
      id: 'performance',
      name: 'Performance Benchmark',
      description: 'Measure response times and throughput',
      duration: '10-20 minutes',
      systems: ['HRIS', 'CRM', 'Payroll', 'Identity Provider'],
      category: 'performance'
    },
    {
      id: 'sync_integrity',
      name: 'Sync Integrity Check',
      description: 'Compare data consistency across systems',
      duration: '15-30 minutes',
      systems: ['HRIS', 'CRM', 'Payroll'],
      category: 'data'
    },
    {
      id: 'security_scan',
      name: 'Security Vulnerability Scan',
      description: 'Check for security vulnerabilities and compliance',
      duration: '20-45 minutes',
      systems: ['HRIS', 'CRM', 'Payroll', 'Identity Provider'],
      category: 'security'
    }
  ];

  const scheduledTestOptions = [
    {
      id: 'daily_health_check',
      name: 'Daily Health Check',
      description: 'Basic connectivity and authentication tests',
      schedule: 'Daily at 6:00 AM',
      tests: ['connectivity', 'authentication']
    },
    {
      id: 'hourly_connectivity',
      name: 'Hourly Connectivity',
      description: 'Quick connectivity verification',
      schedule: 'Every hour',
      tests: ['connectivity']
    },
    {
      id: 'weekly_performance',
      name: 'Weekly Performance Review',
      description: 'Comprehensive performance analysis',
      schedule: 'Sundays at 2:00 AM',
      tests: ['performance', 'sync_integrity']
    },
    {
      id: 'monthly_security',
      name: 'Monthly Security Audit',
      description: 'Full security and vulnerability assessment',
      schedule: 'First Sunday of each month',
      tests: ['security_scan', 'authentication', 'data_validation']
    }
  ];

  const getTestStatusColor = (status) => {
    switch (status) {
      case 'passed': return 'text-success';
      case 'warning': return 'text-warning';
      case 'failed': return 'text-error';
      case 'running': return 'text-info';
      default: return 'text-secondary-400';
    }
  };

  const getTestStatusIcon = (status) => {
    switch (status) {
      case 'passed': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'failed': return 'XCircle';
      case 'running': return 'RefreshCw';
      default: return 'Circle';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'connection': return 'Link';
      case 'security': return 'Shield';
      case 'data': return 'Database';
      case 'performance': return 'Zap';
      default: return 'Activity';
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffMs = now - new Date(date);
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Just completed';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 24 * 60) return `${Math.floor(diffMins / 60)}h ago`;
    return `${Math.floor(diffMins / (24 * 60))}d ago`;
  };

  const handleTestToggle = (testId) => {
    setSelectedTests(prev => 
      prev.includes(testId)
        ? prev.filter(id => id !== testId)
        : [...prev, testId]
    );
  };

  const handleSelectCategory = (category) => {
    const categoryTests = availableTests.filter(test => test.category === category).map(test => test.id);
    setSelectedTests(prev => {
      const hasAllCategoryTests = categoryTests.every(testId => prev.includes(testId));
      if (hasAllCategoryTests) {
        return prev.filter(testId => !categoryTests.includes(testId));
      } else {
        return [...new Set([...prev, ...categoryTests])];
      }
    });
  };

  const handleRunSelected = async () => {
    if (selectedTests.length === 0) {
      alert('Please select at least one test to run.');
      return;
    }

    setIsRunning(true);
    
    for (const testId of selectedTests) {
      const test = availableTests.find(t => t.id === testId);
      for (const system of test.systems) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate test execution
        onRunDiagnostics?.(system, testId);
      }
    }
    
    setIsRunning(false);
    setSelectedTests([]);
  };

  const handleScheduleToggle = (scheduleId) => {
    setScheduledTests(prev => ({
      ...prev,
      [scheduleId]: !prev[scheduleId]
    }));
  };

  const estimatedDuration = () => {
    const selectedTestObjects = availableTests.filter(test => selectedTests.includes(test.id));
    const totalMinutes = selectedTestObjects.reduce((sum, test) => {
      const duration = parseInt(test.duration.split('-')[1]) || 5;
      return sum + duration;
    }, 0);
    
    return totalMinutes;
  };

  const getOverallHealthScore = () => {
    const recentResults = diagnosticsResults?.filter(result => 
      new Date(result.lastRun) > new Date(Date.now() - 24 * 60 * 60 * 1000)
    );
    
    if (!recentResults?.length) return 0;
    
    const passedTests = recentResults.filter(result => result.status === 'passed').length;
    return Math.round((passedTests / recentResults.length) * 100);
  };

  return (
    <div className="bg-surface border border-border rounded-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Automated Diagnostics</h2>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-3 py-2 bg-secondary-50 rounded-sm">
            <Icon name="Activity" size={16} className="text-secondary-600" />
            <span className="text-sm font-medium text-text-primary">
              Health Score: {getOverallHealthScore()}%
            </span>
          </div>
          
          <button
            onClick={() => setShowScheduleModal(true)}
            className="flex items-center space-x-2 px-3 py-2 bg-surface border border-border text-text-primary rounded-sm hover:bg-secondary-50 transition-smooth"
          >
            <Icon name="Calendar" size={16} />
            <span>Schedule</span>
          </button>
        </div>
      </div>

      {/* Recent Test Results */}
      <div className="mb-6">
        <h3 className="font-medium text-text-primary mb-4">Recent Test Results</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {diagnosticsResults?.map((result) => (
            <div key={result.id} className="p-4 border border-border rounded-sm hover:bg-secondary-50 transition-smooth">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Icon name={getCategoryIcon('connection')} size={16} className="text-secondary-600" />
                  <span className="font-medium text-text-primary">{result.test}</span>
                </div>
                <div className={`flex items-center space-x-1 ${getTestStatusColor(result.status)}`}>
                  <Icon 
                    name={getTestStatusIcon(result.status)} 
                    size={14}
                    className={result.status === 'running' ? 'animate-spin' : ''}
                  />
                </div>
              </div>
              
              <div className="text-sm text-text-secondary mb-2">
                System: {result.system}
              </div>
              
              <div className="text-xs text-text-secondary space-y-1">
                <div>{formatTimeAgo(result.lastRun)}</div>
                <div>Duration: {result.duration}s</div>
                <div>{result.details}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available Tests */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-text-primary">Available Diagnostic Tests</h3>
          <div className="flex items-center space-x-3">
            {/* Category Filters */}
            <div className="flex items-center space-x-2">
              {['connection', 'security', 'data', 'performance'].map(category => (
                <button
                  key={category}
                  onClick={() => handleSelectCategory(category)}
                  className="flex items-center space-x-1 px-3 py-2 text-sm border border-border rounded-sm hover:bg-secondary-50 transition-smooth"
                >
                  <Icon name={getCategoryIcon(category)} size={14} />
                  <span className="capitalize">{category}</span>
                </button>
              ))}
            </div>
            
            {selectedTests.length > 0 && (
              <div className="flex items-center space-x-2 px-3 py-2 bg-info-50 border border-info-200 rounded-sm">
                <Icon name="CheckSquare" size={16} className="text-info" />
                <span className="text-sm font-medium text-info">
                  {selectedTests.length} selected
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableTests.map((test) => (
            <div
              key={test.id}
              className={`p-4 border rounded-sm cursor-pointer transition-smooth ${
                selectedTests.includes(test.id)
                  ? 'border-primary bg-primary-50' :'border-border hover:bg-secondary-50'
              }`}
              onClick={() => handleTestToggle(test.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedTests.includes(test.id)}
                    onChange={() => {}}
                    className="mt-1 rounded border-border"
                  />
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon name={getCategoryIcon(test.category)} size={16} className="text-secondary-600" />
                      <span className="font-medium text-text-primary">{test.name}</span>
                    </div>
                    <p className="text-sm text-text-secondary mb-2">{test.description}</p>
                    <div className="text-xs text-text-secondary">
                      Duration: {test.duration}
                    </div>
                  </div>
                </div>
                
                <span className={`px-2 py-1 text-xs rounded ${
                  test.category === 'connection' ? 'bg-blue-100 text-blue-700' :
                  test.category === 'security' ? 'bg-red-100 text-red-700' :
                  test.category === 'data'? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {test.category}
                </span>
              </div>
              
              <div className="text-xs text-text-secondary">
                Systems: {test.systems.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Run Tests Section */}
      {selectedTests.length > 0 && (
        <div className="mb-6 p-4 bg-secondary-50 rounded-sm">
          <h3 className="font-medium text-text-primary mb-3">Test Execution Summary</h3>
          <div className="grid grid-cols-3 gap-4 text-sm mb-4">
            <div>
              <span className="text-text-secondary">Selected Tests:</span>
              <div className="font-medium text-text-primary">{selectedTests.length}</div>
            </div>
            <div>
              <span className="text-text-secondary">Estimated Duration:</span>
              <div className="font-medium text-text-primary">{estimatedDuration()} minutes</div>
            </div>
            <div>
              <span className="text-text-secondary">Systems Affected:</span>
              <div className="font-medium text-text-primary">
                {[...new Set(availableTests.filter(test => selectedTests.includes(test.id)).flatMap(test => test.systems))].length}
              </div>
            </div>
          </div>
          
          <button
            onClick={handleRunSelected}
            disabled={isRunning}
            className="flex items-center space-x-2 px-6 py-2 bg-primary text-white rounded-sm hover:bg-primary-700 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon 
              name={isRunning ? 'RefreshCw' : 'Play'} 
              size={16} 
              className={isRunning ? 'animate-spin' : ''}
            />
            <span>{isRunning ? 'Running Tests...' : 'Run Selected Tests'}</span>
          </button>
        </div>
      )}

      {/* Scheduled Tests */}
      <div>
        <h3 className="font-medium text-text-primary mb-4">Scheduled Diagnostics</h3>
        <div className="space-y-3">
          {scheduledTestOptions.map((schedule) => (
            <div key={schedule.id} className="flex items-center justify-between p-3 border border-border rounded-sm">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={scheduledTests[schedule.id]}
                  onChange={() => handleScheduleToggle(schedule.id)}
                  className="rounded border-border"
                />
                <div>
                  <div className="font-medium text-text-primary">{schedule.name}</div>
                  <div className="text-sm text-text-secondary">{schedule.description}</div>
                  <div className="text-xs text-text-secondary mt-1">
                    Schedule: {schedule.schedule} • Tests: {schedule.tests.join(', ')}
                  </div>
                </div>
              </div>
              
              <div className={`px-3 py-1 text-sm rounded ${
                scheduledTests[schedule.id] 
                  ? 'bg-success-100 text-success' :'bg-secondary-100 text-secondary-600'
              }`}>
                {scheduledTests[schedule.id] ? 'Active' : 'Inactive'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Management Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-200">
          <div className="bg-surface border border-border rounded-sm p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-text-primary">Diagnostic Schedule Management</h3>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="p-2 hover:bg-secondary-100 rounded-sm transition-smooth"
              >
                <Icon name="X" size={20} className="text-text-secondary" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-text-primary mb-3">Current Schedules</h4>
                <div className="space-y-3">
                  {scheduledTestOptions.map((schedule) => (
                    <div key={schedule.id} className="p-4 border border-border rounded-sm">
                      <div className="flex items-center justify-between mb-3">
                        <div className="font-medium text-text-primary">{schedule.name}</div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={scheduledTests[schedule.id]}
                            onChange={() => handleScheduleToggle(schedule.id)}
                            className="rounded border-border"
                          />
                          <span className="text-sm text-text-secondary">Enable</span>
                        </label>
                      </div>
                      <div className="text-sm text-text-secondary mb-2">{schedule.description}</div>
                      <div className="text-xs text-text-secondary">
                        <div>Schedule: {schedule.schedule}</div>
                        <div>Included Tests: {schedule.tests.join(', ')}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="px-4 py-2 border border-border text-text-primary rounded-sm hover:bg-secondary-50 transition-smooth"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="px-4 py-2 bg-primary text-white rounded-sm hover:bg-primary-700 transition-smooth"
                >
                  Save Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutomatedDiagnostics;