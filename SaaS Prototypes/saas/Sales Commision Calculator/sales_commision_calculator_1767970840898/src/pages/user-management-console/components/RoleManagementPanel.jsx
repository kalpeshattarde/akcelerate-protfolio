// src/pages/user-management-console/components/RoleManagementPanel.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const RoleManagementPanel = ({ roles, users, selectedUsers, onRoleUpdate, onBulkRoleAssignment }) => {
  const [draggedRole, setDraggedRole] = useState(null);
  const [draggedUser, setDraggedUser] = useState(null);
  const [showCreateRole, setShowCreateRole] = useState(false);
  const [newRole, setNewRole] = useState({ name: '', description: '', permissions: [] });

  const availablePermissions = [
    { id: 'read_own_data', name: 'Read Own Data', category: 'Data Access' },
    { id: 'read_all_data', name: 'Read All Data', category: 'Data Access' },
    { id: 'manage_team', name: 'Manage Team', category: 'Team Management' },
    { id: 'approve_bonuses', name: 'Approve Bonuses', category: 'Compensation' },
    { id: 'configure_plans', name: 'Configure Plans', category: 'Configuration' },
    { id: 'user_management', name: 'User Management', category: 'Administration' },
    { id: 'system_config', name: 'System Configuration', category: 'Administration' },
    { id: 'full_admin', name: 'Full Administrator', category: 'Administration' },
    { id: 'bulk_operations', name: 'Bulk Operations', category: 'Operations' },
    { id: 'audit_access', name: 'Audit Access', category: 'Security' },
    { id: 'territory_management', name: 'Territory Management', category: 'Territory' },
    { id: 'submit_reports', name: 'Submit Reports', category: 'Reporting' },
    { id: 'manage_reports', name: 'Manage Reports', category: 'Reporting' },
    { id: 'view_dashboard', name: 'View Dashboard', category: 'Dashboard' }
  ];

  const handleDragStart = (e, type, item) => {
    e.dataTransfer.effectAllowed = 'move';
    if (type === 'role') {
      setDraggedRole(item);
    } else if (type === 'user') {
      setDraggedUser(item);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetRole) => {
    e.preventDefault();
    
    if (draggedUser) {
      // Assign role to user
      onBulkRoleAssignment('role_assignment', { 
        userIds: [draggedUser.id], 
        role: targetRole.name 
      });
      setDraggedUser(null);
    }
  };

  const handleBulkAssignment = (roleId) => {
    const role = roles.find(r => r.id === roleId);
    if (role && selectedUsers.length > 0) {
      onBulkRoleAssignment('role_assignment', {
        userIds: selectedUsers,
        role: role.name
      });
    }
  };

  const handleCreateRole = () => {
    if (newRole.name && newRole.description) {
      const role = {
        id: Date.now(),
        ...newRole,
        userCount: 0,
        level: roles.length + 1
      };
      onRoleUpdate([...roles, role]);
      setNewRole({ name: '', description: '', permissions: [] });
      setShowCreateRole(false);
    }
  };

  const handlePermissionToggle = (permissionId) => {
    const permissions = newRole.permissions.includes(permissionId)
      ? newRole.permissions.filter(p => p !== permissionId)
      : [...newRole.permissions, permissionId];
    setNewRole({ ...newRole, permissions });
  };

  const getRoleLevelColor = (level) => {
    if (level >= 5) return 'border-l-error';
    if (level >= 4) return 'border-l-warning';
    if (level >= 3) return 'border-l-info';
    return 'border-l-success';
  };

  const groupedPermissions = availablePermissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {});

  const selectedUsersData = users.filter(user => selectedUsers.includes(user.id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">Role Management</h2>
          <p className="text-text-secondary">Hierarchical permission structure with drag-drop assignment capabilities</p>
        </div>
        <button
          onClick={() => setShowCreateRole(!showCreateRole)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-sm hover:bg-primary-700 transition-smooth"
        >
          <Icon name="Plus" size={16} />
          <span>Create Role</span>
        </button>
      </div>

      {/* Bulk Assignment Panel */}
      {selectedUsers.length > 0 && (
        <div className="bg-warning-50 border border-warning-200 rounded-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-warning-800">Bulk Role Assignment</h3>
              <p className="text-sm text-warning-700">
                {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected for role assignment
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <select 
                className="px-3 py-2 border border-warning-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-warning focus:border-transparent"
                onChange={(e) => e.target.value && handleBulkAssignment(parseInt(e.target.value))}
                defaultValue=""
              >
                <option value="">Select Role</option>
                {roles.map(role => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Selected Users Preview */}
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedUsersData.slice(0, 5).map(user => (
              <div key={user.id} className="flex items-center space-x-2 px-2 py-1 bg-white border border-warning-300 rounded-sm">
                <span className="text-sm text-warning-800">{user.name}</span>
              </div>
            ))}
            {selectedUsers.length > 5 && (
              <div className="px-2 py-1 bg-warning-100 border border-warning-300 rounded-sm">
                <span className="text-sm text-warning-700">+{selectedUsers.length - 5} more</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Create Role Form */}
      {showCreateRole && (
        <div className="bg-surface border border-border rounded-sm p-6">
          <h3 className="text-lg font-medium text-text-primary mb-4">Create New Role</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Role Name</label>
                <input
                  type="text"
                  value={newRole.name}
                  onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter role name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Description</label>
                <textarea
                  value={newRole.description}
                  onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter role description"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Permissions</label>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {Object.entries(groupedPermissions).map(([category, permissions]) => (
                  <div key={category}>
                    <h4 className="text-sm font-medium text-text-secondary mb-2">{category}</h4>
                    <div className="space-y-1 ml-4">
                      {permissions.map(permission => (
                        <label key={permission.id} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={newRole.permissions.includes(permission.id)}
                            onChange={() => handlePermissionToggle(permission.id)}
                            className="rounded border-border focus:ring-primary"
                          />
                          <span className="text-sm text-text-primary">{permission.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 mt-6">
            <button
              onClick={handleCreateRole}
              className="px-4 py-2 bg-primary text-white rounded-sm hover:bg-primary-700 transition-smooth"
            >
              Create Role
            </button>
            <button
              onClick={() => {
                setShowCreateRole(false);
                setNewRole({ name: '', description: '', permissions: [] });
              }}
              className="px-4 py-2 bg-secondary-100 text-secondary-700 rounded-sm hover:bg-secondary-200 transition-smooth"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Roles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {roles.map((role) => (
          <div
            key={role.id}
            className={`bg-surface border-l-4 ${getRoleLevelColor(role.level)} border-r border-t border-b border-border rounded-sm p-6 hover:shadow-md transition-smooth`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, role)}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-text-primary">{role.name}</h3>
                <p className="text-sm text-text-secondary mt-1">{role.description}</p>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-text-primary">{role.userCount}</div>
                <div className="text-xs text-text-secondary">users</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-text-primary mb-2">Permissions</h4>
                <div className="flex flex-wrap gap-1">
                  {role.permissions?.slice(0, 3).map(permission => (
                    <span key={permission} className="px-2 py-1 bg-primary-100 text-primary text-xs rounded-sm">
                      {availablePermissions.find(p => p.id === permission)?.name || permission}
                    </span>
                  ))}
                  {role.permissions?.length > 3 && (
                    <span className="px-2 py-1 bg-secondary-100 text-secondary-600 text-xs rounded-sm">
                      +{role.permissions.length - 3} more
                    </span>
                  )}
                </div>
              </div>
              
              <div className="pt-3 border-t border-border flex items-center justify-between">
                <span className="text-xs text-text-secondary">Level {role.level}</span>
                <div className="flex items-center space-x-2">
                  <button className="p-1 text-secondary-600 hover:text-primary transition-smooth">
                    <Icon name="Edit" size={16} />
                  </button>
                  <button className="p-1 text-secondary-600 hover:text-error transition-smooth">
                    <Icon name="Trash2" size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Drag Instructions */}
      <div className="bg-info-50 border border-info-200 rounded-sm p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-info flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-info-800">Role Assignment Instructions</h3>
            <div className="text-sm text-info-700 mt-1 space-y-1">
              <p>• Select users from the User Directory and use the bulk assignment panel above</p>
              <p>• Drag users from other views directly onto role cards for quick assignment</p>
              <p>• Use keyboard shortcut Ctrl+R when users are selected to open role assignment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleManagementPanel;