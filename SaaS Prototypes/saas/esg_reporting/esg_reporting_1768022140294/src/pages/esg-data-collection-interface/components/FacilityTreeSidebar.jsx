import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FacilityTreeSidebar = ({ 
  selectedFacility, 
  onFacilitySelect, 
  onDepartmentSelect,
  selectedDepartment 
}) => {
  const [expandedNodes, setExpandedNodes] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [facilityData, setFacilityData] = useState([]);

  useEffect(() => {
    const mockFacilityData = [
      {
        id: 'facility-1',
        name: 'Manufacturing Plant - Austin',
        type: 'facility',
        location: 'Austin, TX',
        completionRate: 85,
        lastUpdated: '2025-01-06T14:30:00Z',
        departments: [
          {
            id: 'dept-1-1',
            name: 'Production Floor',
            type: 'department',
            completionRate: 92,
            metricsCount: 24,
            pendingCount: 2
          },
          {
            id: 'dept-1-2',
            name: 'Quality Control',
            type: 'department',
            completionRate: 78,
            metricsCount: 18,
            pendingCount: 4
          },
          {
            id: 'dept-1-3',
            name: 'Maintenance',
            type: 'department',
            completionRate: 65,
            metricsCount: 15,
            pendingCount: 5
          }
        ]
      },
      {
        id: 'facility-2',
        name: 'Distribution Center - Dallas',
        type: 'facility',
        location: 'Dallas, TX',
        completionRate: 72,
        lastUpdated: '2025-01-05T16:45:00Z',
        departments: [
          {
            id: 'dept-2-1',
            name: 'Warehouse Operations',
            type: 'department',
            completionRate: 88,
            metricsCount: 20,
            pendingCount: 2
          },
          {
            id: 'dept-2-2',
            name: 'Shipping & Receiving',
            type: 'department',
            completionRate: 55,
            metricsCount: 16,
            pendingCount: 7
          }
        ]
      },
      {
        id: 'facility-3',
        name: 'Corporate Headquarters',
        type: 'facility',
        location: 'Houston, TX',
        completionRate: 95,
        lastUpdated: '2025-01-07T09:15:00Z',
        departments: [
          {
            id: 'dept-3-1',
            name: 'Administration',
            type: 'department',
            completionRate: 100,
            metricsCount: 12,
            pendingCount: 0
          },
          {
            id: 'dept-3-2',
            name: 'IT Operations',
            type: 'department',
            completionRate: 90,
            metricsCount: 14,
            pendingCount: 1
          }
        ]
      }
    ];

    setFacilityData(mockFacilityData);
    
    // Auto-expand first facility
    setExpandedNodes({ 'facility-1': true });
  }, []);

  const toggleNode = (nodeId) => {
    setExpandedNodes(prev => ({
      ...prev,
      [nodeId]: !prev?.[nodeId]
    }));
  };

  const getCompletionColor = (rate) => {
    if (rate >= 90) return 'text-success';
    if (rate >= 70) return 'text-warning';
    return 'text-error';
  };

  const getCompletionBg = (rate) => {
    if (rate >= 90) return 'bg-success/10';
    if (rate >= 70) return 'bg-warning/10';
    return 'bg-error/10';
  };

  const filteredFacilities = facilityData?.filter(facility =>
    facility?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    facility?.departments?.some(dept => 
      dept?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    )
  );

  const formatLastUpdated = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just updated';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date?.toLocaleDateString();
  };

  return (
    <div className="h-full bg-card border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground">Facilities</h2>
          <Button variant="ghost" size="icon">
            <Icon name="RefreshCw" size={16} />
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search facilities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full pl-9 pr-3 py-2 bg-muted border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>
      {/* Tree View */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {filteredFacilities?.map((facility) => (
            <div key={facility?.id} className="space-y-1">
              {/* Facility Node */}
              <div
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all duration-150 hover:bg-muted ${
                  selectedFacility?.id === facility?.id ? 'bg-primary/10 border border-primary/20' : ''
                }`}
                onClick={() => {
                  onFacilitySelect(facility);
                  toggleNode(facility?.id);
                }}
              >
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-6 h-6 p-0"
                    onClick={(e) => {
                      e?.stopPropagation();
                      toggleNode(facility?.id);
                    }}
                  >
                    <Icon 
                      name={expandedNodes?.[facility?.id] ? "ChevronDown" : "ChevronRight"} 
                      size={14} 
                    />
                  </Button>
                  <Icon name="Building2" size={16} className="text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">
                      {facility?.name}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {facility?.location}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getCompletionBg(facility?.completionRate)} ${getCompletionColor(facility?.completionRate)}`}>
                    {facility?.completionRate}%
                  </div>
                </div>
              </div>

              {/* Department Nodes */}
              {expandedNodes?.[facility?.id] && (
                <div className="ml-6 space-y-1">
                  {facility?.departments?.map((department) => (
                    <div
                      key={department?.id}
                      className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all duration-150 hover:bg-muted ${
                        selectedDepartment?.id === department?.id ? 'bg-secondary/10 border border-secondary/20' : ''
                      }`}
                      onClick={() => onDepartmentSelect(department, facility)}
                    >
                      <div className="flex items-center space-x-2 flex-1 min-w-0">
                        <Icon name="Users" size={14} className="text-secondary flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-foreground truncate">
                            {department?.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {department?.metricsCount} metrics
                            {department?.pendingCount > 0 && (
                              <span className="ml-1 text-warning">
                                • {department?.pendingCount} pending
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getCompletionBg(department?.completionRate)} ${getCompletionColor(department?.completionRate)}`}>
                        {department?.completionRate}%
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Summary Footer */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total Facilities</span>
            <span className="font-medium text-foreground">{facilityData?.length}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Avg. Completion</span>
            <span className="font-medium text-foreground">
              {Math.round(facilityData?.reduce((acc, f) => acc + f?.completionRate, 0) / facilityData?.length)}%
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Last Sync</span>
            <span className="font-medium text-foreground">
              {formatLastUpdated(new Date()?.toISOString())}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityTreeSidebar;