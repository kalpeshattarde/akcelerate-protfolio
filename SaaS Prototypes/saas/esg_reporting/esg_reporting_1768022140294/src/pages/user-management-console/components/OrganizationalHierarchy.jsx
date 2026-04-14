import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const OrganizationalHierarchy = ({ onUserSelect, selectedUserId }) => {
  const [expandedDepartments, setExpandedDepartments] = useState({
    'sustainability': true,
    'operations': false,
    'finance': false,
    'compliance': false,
    'it': false
  });
  const [searchTerm, setSearchTerm] = useState('');

  const organizationData = [
    {
      id: 'sustainability',
      name: 'Sustainability',
      icon: 'Leaf',
      userCount: 12,
      roles: ['ESG Manager', 'Environmental Analyst', 'Sustainability Officer'],
      users: [
        { id: 'u1', name: 'Sarah Johnson', role: 'ESG Manager', status: 'active', lastLogin: '2025-01-07 09:30' },
        { id: 'u2', name: 'Michael Chen', role: 'Environmental Analyst', status: 'active', lastLogin: '2025-01-07 08:15' },
        { id: 'u3', name: 'Emma Rodriguez', role: 'Sustainability Officer', status: 'inactive', lastLogin: '2025-01-05 16:45' },
        { id: 'u4', name: 'David Kim', role: 'Environmental Analyst', status: 'active', lastLogin: '2025-01-07 10:20' }
      ]
    },
    {
      id: 'operations',
      name: 'Operations',
      icon: 'Factory',
      userCount: 28,
      roles: ['Operations Manager', 'Facility Manager', 'Data Collector'],
      users: [
        { id: 'u5', name: 'James Wilson', role: 'Operations Manager', status: 'active', lastLogin: '2025-01-07 07:45' },
        { id: 'u6', name: 'Lisa Thompson', role: 'Facility Manager', status: 'active', lastLogin: '2025-01-07 09:10' },
        { id: 'u7', name: 'Robert Davis', role: 'Data Collector', status: 'pending', lastLogin: 'Never' },
        { id: 'u8', name: 'Maria Garcia', role: 'Facility Manager', status: 'active', lastLogin: '2025-01-06 18:30' }
      ]
    },
    {
      id: 'finance',
      name: 'Finance',
      icon: 'DollarSign',
      userCount: 15,
      roles: ['Finance Manager', 'Cost Analyst', 'Budget Coordinator'],
      users: [
        { id: 'u9', name: 'Jennifer Lee', role: 'Finance Manager', status: 'active', lastLogin: '2025-01-07 08:00' },
        { id: 'u10', name: 'Thomas Brown', role: 'Cost Analyst', status: 'active', lastLogin: '2025-01-07 09:45' },
        { id: 'u11', name: 'Amanda White', role: 'Budget Coordinator', status: 'active', lastLogin: '2025-01-07 07:30' }
      ]
    },
    {
      id: 'compliance',
      name: 'Compliance',
      icon: 'Shield',
      userCount: 8,
      roles: ['Compliance Officer', 'Audit Manager', 'Risk Analyst'],
      users: [
        { id: 'u12', name: 'Daniel Martinez', role: 'Compliance Officer', status: 'active', lastLogin: '2025-01-07 10:15' },
        { id: 'u13', name: 'Rachel Green', role: 'Audit Manager', status: 'active', lastLogin: '2025-01-07 08:45' },
        { id: 'u14', name: 'Kevin Taylor', role: 'Risk Analyst', status: 'inactive', lastLogin: '2025-01-04 14:20' }
      ]
    },
    {
      id: 'it',
      name: 'IT Administration',
      icon: 'Monitor',
      userCount: 6,
      roles: ['System Admin', 'Security Officer', 'IT Support'],
      users: [
        { id: 'u15', name: 'Alex Johnson', role: 'System Admin', status: 'active', lastLogin: '2025-01-07 06:00' },
        { id: 'u16', name: 'Sophie Anderson', role: 'Security Officer', status: 'active', lastLogin: '2025-01-07 09:00' },
        { id: 'u17', name: 'Mark Wilson', role: 'IT Support', status: 'active', lastLogin: '2025-01-07 08:30' }
      ]
    }
  ];

  const toggleDepartment = (departmentId) => {
    setExpandedDepartments(prev => ({
      ...prev,
      [departmentId]: !prev?.[departmentId]
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'inactive': return 'text-error';
      case 'pending': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'CheckCircle';
      case 'inactive': return 'XCircle';
      case 'pending': return 'Clock';
      default: return 'Circle';
    }
  };

  const filteredData = organizationData?.map(dept => ({
    ...dept,
    users: dept?.users?.filter(user => 
      user?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      user?.role?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    )
  }))?.filter(dept => dept?.users?.length > 0 || searchTerm === '');

  return (
    <div className="h-full bg-card border-r border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-foreground mb-3">Organization</h3>
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full pl-9 pr-3 py-2 bg-muted border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>
      {/* Department Tree */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {filteredData?.map((department) => (
            <div key={department?.id} className="space-y-1">
              {/* Department Header */}
              <button
                onClick={() => toggleDepartment(department?.id)}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors duration-150 text-left"
              >
                <div className="flex items-center space-x-3">
                  <Icon name={department?.icon} size={16} className="text-primary" />
                  <div>
                    <div className="text-sm font-medium text-foreground">{department?.name}</div>
                    <div className="text-xs text-muted-foreground">{department?.userCount} users</div>
                  </div>
                </div>
                <Icon 
                  name="ChevronDown" 
                  size={14} 
                  className={`text-muted-foreground transition-transform duration-150 ${
                    expandedDepartments?.[department?.id] ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Department Users */}
              {expandedDepartments?.[department?.id] && (
                <div className="ml-6 space-y-1">
                  {department?.users?.map((user) => (
                    <button
                      key={user?.id}
                      onClick={() => onUserSelect(user)}
                      className={`w-full flex items-center space-x-3 p-2 rounded-lg text-left transition-all duration-150 ${
                        selectedUserId === user?.id
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name="User" size={12} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{user?.name}</div>
                        <div className="text-xs opacity-75 truncate">{user?.role}</div>
                      </div>
                      <div className={`${selectedUserId === user?.id ? 'text-primary-foreground' : getStatusColor(user?.status)}`}>
                        <Icon name={getStatusIcon(user?.status)} size={12} />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Summary Stats */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-foreground">
              {organizationData?.reduce((sum, dept) => sum + dept?.userCount, 0)}
            </div>
            <div className="text-xs text-muted-foreground">Total Users</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-success">
              {organizationData?.reduce((sum, dept) => 
                sum + dept?.users?.filter(u => u?.status === 'active')?.length, 0
              )}
            </div>
            <div className="text-xs text-muted-foreground">Active</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationalHierarchy;