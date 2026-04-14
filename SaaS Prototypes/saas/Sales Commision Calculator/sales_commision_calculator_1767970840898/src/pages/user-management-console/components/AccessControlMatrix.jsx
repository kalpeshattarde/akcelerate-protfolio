// src/pages/user-management-console/components/AccessControlMatrix.jsx
import React, { useState, useMemo } from 'react';
import Icon from 'components/AppIcon';

const AccessControlMatrix = ({ users = [], roles = [], onPermissionChange }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [filterRole, setFilterRole] = useState('all');
  const [filterTerritory, setFilterTerritory] = useState('all');
  const [showDetails, setShowDetails] = useState(false);

  const territories = [...new Set(users?.map(user => user?.territory).filter(Boolean) || [])];
  const compensationLevels = ['L1', 'L2', 'L3', 'L4', 'L5'];
  
  const permissions = [
    { id: 'read_own_data', name: 'Read Own Data', category: 'Data Access', level: 1 },
    { id: 'read_team_data', name: 'Read Team Data', category: 'Data Access', level: 2 },
    { id: 'read_all_data', name: 'Read All Data', category: 'Data Access', level: 4 },
    { id: 'manage_team', name: 'Manage Team', category: 'Team Management', level: 3 },
    { id: 'approve_bonuses', name: 'Approve Bonuses', category: 'Compensation', level: 3 },
    { id: 'configure_plans', name: 'Configure Plans', category: 'Configuration', level: 4 },
    { id: 'user_management', name: 'User Management', category: 'Administration', level: 5 },
    { id: 'system_config', name: 'System Configuration', category: 'Administration', level: 5 },
    { id: 'bulk_operations', name: 'Bulk Operations', category: 'Operations', level: 3 },
    { id: 'audit_access', name: 'Audit Access', category: 'Security', level: 4 },
    { id: 'territory_management', name: 'Territory Management', category: 'Territory', level: 3 }
  ];

  // Filter users based on criteria
  const filteredUsers = useMemo(() => {
    return (users || []).filter(user => {
      const roleMatch = filterRole === 'all' || user?.role === filterRole;
      const territoryMatch = filterTerritory === 'all' || user?.territory === filterTerritory;
      return roleMatch && territoryMatch;
    });
  }, [users, filterRole, filterTerritory]);

  const handlePermissionToggle = (userId, permissionId) => {
    const user = users?.find(u => u?.id === userId);
    if (!user || !onPermissionChange) return;

    const updatedPermissions = user.permissions?.includes(permissionId)
      ? user.permissions.filter(p => p !== permissionId)
      : [...(user.permissions || []), permissionId];
    
    onPermissionChange(userId, updatedPermissions);
  };

  const getPermissionLevel = (user, permission) => {
    const hasPermission = user?.permissions?.includes(permission?.id);
    const userRole = roles?.find(r => r?.name === user?.role);
    const hasRolePermission = userRole?.permissions?.includes(permission?.id);
    
    if (hasPermission) return 'direct';
    if (hasRolePermission) return 'inherited';
    return 'none';
  };

  const getPermissionIcon = (level) => {
    switch (level) {
      case 'direct': return { icon: 'Check', color: 'text-success' };
      case 'inherited': return { icon: 'ArrowDown', color: 'text-info' };
      default: return { icon: 'X', color: 'text-secondary-400' };
    }
  };

  const getCompensationLevelColor = (level) => {
    switch (level) {
      case 'L1': return 'bg-secondary-100 text-secondary-600';
      case 'L2': return 'bg-info-100 text-info';
      case 'L3': return 'bg-warning-100 text-warning';
      case 'L4': return 'bg-primary-100 text-primary';
      case 'L5': return 'bg-error-100 text-error';
      default: return 'bg-secondary-100 text-secondary-600';
    }
  };

  const getTerritoryAccessColor = (userTerritory, accessLevel) => {
    if (accessLevel === 'All') return 'bg-success-100 text-success';
    if (userTerritory === accessLevel) return 'bg-info-100 text-info';
    return 'bg-secondary-100 text-secondary-600';
  };

  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">Access Control Matrix</h2>
          <p className="text-text-secondary">User-to-data visibility mapping with territory restrictions and permission levels</p>
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center space-x-2 px-4 py-2 bg-info text-white rounded-sm hover:bg-info-700 transition-smooth"
        >
          <Icon name={showDetails ? 'EyeOff' : 'Eye'} size={16} />
          <span>{showDetails ? 'Hide Details' : 'Show Details'}</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4 p-4 bg-secondary-50 rounded-sm">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-text-primary">Filter by Role:</label>
          <select 
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-3 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Roles</option>
            {(roles || []).map(role => (
              <option key={role?.id} value={role?.name}>{role?.name}</option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-text-primary">Filter by Territory:</label>
          <select 
            value={filterTerritory}
            onChange={(e) => setFilterTerritory(e.target.value)}
            className="px-3 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Territories</option>
            {territories?.map(territory => (
              <option key={territory} value={territory}>{territory}</option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center space-x-4 ml-auto">
          <div className="flex items-center space-x-2">
            <Icon name="Check" size={16} className="text-success" />
            <span className="text-sm text-text-secondary">Direct Permission</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="ArrowDown" size={16} className="text-info" />
            <span className="text-sm text-text-secondary">Role-based</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="X" size={16} className="text-secondary-400" />
            <span className="text-sm text-text-secondary">No Access</span>
          </div>
        </div>
      </div>

      {/* Access Control Matrix */}
      <div className="bg-surface border border-border rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  User
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Compensation Level
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Territory Access
                </th>
                {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
                  <th key={category} className="px-2 py-3 text-center text-xs font-medium text-text-secondary uppercase tracking-wider border-l border-border">
                    <div className="transform -rotate-45 origin-center whitespace-nowrap">
                      {category}
                    </div>
                  </th>
                ))}
                <th className="px-4 py-3 text-center text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {(filteredUsers || []).map((user) => (
                <tr key={user?.id} className="hover:bg-secondary-50 transition-smooth">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">
                          {user?.name?.split(' ').map(n => n?.[0]).join('').toUpperCase() || '?'}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-text-primary">{user?.name || 'Unknown User'}</div>
                        <div className="text-xs text-text-secondary">{user?.role || 'No Role'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-sm ${getCompensationLevelColor(user?.compensationLevel)}`}>
                      {user?.compensationLevel || 'N/A'}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-sm ${getTerritoryAccessColor(user?.territory, user?.territory)}`}>
                      {user?.territory || 'N/A'}
                    </span>
                  </td>
                  {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
                    <td key={category} className="px-2 py-4 text-center border-l border-border">
                      <div className="space-y-1">
                        {(categoryPermissions || []).map(permission => {
                          const level = getPermissionLevel(user, permission);
                          const { icon, color } = getPermissionIcon(level);
                          return (
                            <button
                              key={permission?.id}
                              onClick={() => handlePermissionToggle(user?.id, permission?.id)}
                              className={`p-1 rounded hover:bg-secondary-100 transition-smooth ${color}`}
                              title={`${permission?.name} - ${level}`}
                            >
                              <Icon name={icon} size={14} />
                            </button>
                          );
                        })}
                      </div>
                    </td>
                  ))}
                  <td className="px-4 py-4 text-center">
                    <button
                      onClick={() => setSelectedUser(selectedUser === user?.id ? null : user?.id)}
                      className="p-1 text-secondary-600 hover:text-primary transition-smooth"
                      title="View Details"
                    >
                      <Icon name="Eye" size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Detail Panel */}
      {selectedUser && (
        <div className="bg-surface border border-border rounded-sm p-6">
          {(() => {
            const user = users?.find(u => u?.id === selectedUser);
            if (!user) return null;
            
            return (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-text-primary">Access Details: {user?.name || 'Unknown User'}</h3>
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="p-1 text-secondary-600 hover:text-error transition-smooth"
                  >
                    <Icon name="X" size={20} />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-text-primary mb-3">Direct Permissions</h4>
                    <div className="space-y-2">
                      {(user?.permissions || []).map(permissionId => {
                        const permission = permissions.find(p => p?.id === permissionId);
                        return permission ? (
                          <div key={permission.id} className="flex items-center justify-between p-2 bg-success-50 border border-success-200 rounded-sm">
                            <span className="text-sm text-success-800">{permission?.name}</span>
                            <button
                              onClick={() => handlePermissionToggle(user?.id, permission?.id)}
                              className="text-success hover:text-error transition-smooth"
                            >
                              <Icon name="X" size={14} />
                            </button>
                          </div>
                        ) : null;
                      })}
                      {(!user?.permissions || user.permissions.length === 0) && (
                        <p className="text-sm text-text-secondary italic">No direct permissions assigned</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-text-primary mb-3">Role-based Permissions</h4>
                    <div className="space-y-2">
                      {(() => {
                        const userRole = roles?.find(r => r?.name === user?.role);
                        return (userRole?.permissions || []).map(permissionId => {
                          const permission = permissions.find(p => p?.id === permissionId);
                          return permission ? (
                            <div key={permission.id} className="flex items-center justify-between p-2 bg-info-50 border border-info-200 rounded-sm">
                              <span className="text-sm text-info-800">{permission?.name}</span>
                              <span className="text-xs text-info-600">via {user?.role}</span>
                            </div>
                          ) : null;
                        });
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default AccessControlMatrix;