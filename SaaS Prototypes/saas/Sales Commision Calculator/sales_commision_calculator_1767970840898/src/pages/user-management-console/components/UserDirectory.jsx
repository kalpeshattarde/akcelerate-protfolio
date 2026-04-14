// src/pages/user-management-console/components/UserDirectory.jsx
import React, { useState, useMemo } from 'react';
import Icon from 'components/AppIcon';
import { format } from 'date-fns';

const UserDirectory = ({ users, selectedUsers, onSelectionChange, onUserUpdate }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  // Sort users
  const sortedUsers = useMemo(() => {
    if (!sortConfig.key) return users;

    return [...users].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === 'lastLogin') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [users, sortConfig]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(users.map(user => user.id));
    }
  };

  const handleUserSelect = (userId) => {
    if (selectedUsers.includes(userId)) {
      onSelectionChange(selectedUsers.filter(id => id !== userId));
    } else {
      onSelectionChange([...selectedUsers, userId]);
    }
  };

  const handleStatusChange = (userId, newStatus) => {
    onUserUpdate(userId, { status: newStatus });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success-100 text-success';
      case 'inactive': return 'bg-error-100 text-error';
      case 'pending': return 'bg-warning-100 text-warning';
      default: return 'bg-secondary-100 text-secondary-600';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Administrator': return 'bg-primary-100 text-primary';
      case 'Sales Manager': return 'bg-warning-100 text-warning';
      case 'Sales Operations': return 'bg-info-100 text-info';
      case 'Sales Representative': return 'bg-secondary-100 text-secondary-600';
      default: return 'bg-secondary-100 text-secondary-600';
    }
  };

  const formatLastLogin = (timestamp) => {
    try {
      return format(new Date(timestamp), 'MMM dd, yyyy HH:mm');
    } catch {
      return 'Never';
    }
  };

  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || '??';
  };

  const isAllSelected = selectedUsers.length === users.length && users.length > 0;
  const isIndeterminate = selectedUsers.length > 0 && selectedUsers.length < users.length;

  return (
    <div className="bg-surface border border-border rounded-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text-primary">User Directory</h2>
          <div className="text-sm text-text-secondary">
            {selectedUsers.length} of {users.length} selected
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary-50">
            <tr>
              <th className="w-12 px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={input => {
                    if (input) input.indeterminate = isIndeterminate;
                  }}
                  onChange={handleSelectAll}
                  className="rounded border-border focus:ring-primary"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                User
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-secondary-100 transition-smooth"
                onClick={() => handleSort('role')}
              >
                <div className="flex items-center space-x-1">
                  <span>Role</span>
                  <Icon 
                    name={sortConfig.key === 'role' ? (sortConfig.direction === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                  />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-secondary-100 transition-smooth"
                onClick={() => handleSort('department')}
              >
                <div className="flex items-center space-x-1">
                  <span>Department</span>
                  <Icon 
                    name={sortConfig.key === 'department' ? (sortConfig.direction === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                  />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-secondary-100 transition-smooth"
                onClick={() => handleSort('lastLogin')}
              >
                <div className="flex items-center space-x-1">
                  <span>Last Login</span>
                  <Icon 
                    name={sortConfig.key === 'lastLogin' ? (sortConfig.direction === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                  />
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-secondary-100 transition-smooth"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center space-x-1">
                  <span>Status</span>
                  <Icon 
                    name={sortConfig.key === 'status' ? (sortConfig.direction === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                  />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedUsers.map((user) => {
              const isSelected = selectedUsers.includes(user.id);
              return (
                <tr 
                  key={user.id} 
                  className={`hover:bg-secondary-50 transition-smooth ${
                    isSelected ? 'bg-primary-50' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleUserSelect(user.id)}
                      className="rounded border-border focus:ring-primary"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {getInitials(user.name)}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-text-primary">{user.name}</div>
                        <div className="text-sm text-text-secondary">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-sm ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-primary">
                    {user.department}
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary">
                    {formatLastLogin(user.lastLogin)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-sm ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        className="p-1 text-secondary-600 hover:text-primary transition-smooth"
                        title="Edit User"
                      >
                        <Icon name="Edit" size={16} />
                      </button>
                      <button 
                        className="p-1 text-secondary-600 hover:text-info transition-smooth"
                        title="View Permissions"
                      >
                        <Icon name="Key" size={16} />
                      </button>
                      <button 
                        onClick={() => handleStatusChange(user.id, user.status === 'active' ? 'inactive' : 'active')}
                        className={`p-1 transition-smooth ${
                          user.status === 'active' ?'text-secondary-600 hover:text-error' :'text-secondary-600 hover:text-success'
                        }`}
                        title={user.status === 'active' ? 'Deactivate User' : 'Activate User'}
                      >
                        <Icon name={user.status === 'active' ? 'UserX' : 'UserCheck'} size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Users" size={48} className="mx-auto text-secondary-300 mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">No users found</h3>
            <p className="text-text-secondary">No users match your current search criteria</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-border bg-secondary-50">
        <div className="flex items-center justify-between text-sm text-text-secondary">
          <span>Total Users: {users.length}</span>
          <div className="flex items-center space-x-4">
            <span>Use Ctrl+Click for multi-select</span>
            <span>•</span>
            <span>Ctrl+F to search</span>
            <span>•</span>
            <span>Ctrl+R for role assignment</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDirectory;