import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const UserManagement = ({ searchQuery }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const users = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@company.com",
      role: "Procurement Officer",
      department: "Procurement",
      status: "Active",
      lastLogin: "2024-01-15 09:30 AM",
      permissions: ["Create PO", "Approve <$10K", "Manage Suppliers"],
      avatar: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      role: "Finance Manager",
      department: "Finance",
      status: "Active",
      lastLogin: "2024-01-15 08:45 AM",
      permissions: ["Approve All", "View Reports", "Budget Management"],
      avatar: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike.chen@company.com",
      role: "Procurement Specialist",
      department: "Procurement",
      status: "Inactive",
      lastLogin: "2024-01-10 02:15 PM",
      permissions: ["Create PO", "View Suppliers"],
      avatar: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@company.com",
      role: "System Administrator",
      department: "IT",
      status: "Active",
      lastLogin: "2024-01-15 10:00 AM",
      permissions: ["Full Access", "User Management", "System Config"],
      avatar: "https://randomuser.me/api/portraits/women/4.jpg"
    }
  ];

  const roles = [
    { id: 'admin', name: 'System Administrator', permissions: ['Full Access'] },
    { id: 'finance', name: 'Finance Manager', permissions: ['Approve All', 'View Reports', 'Budget Management'] },
    { id: 'procurement', name: 'Procurement Officer', permissions: ['Create PO', 'Approve <$10K', 'Manage Suppliers'] },
    { id: 'specialist', name: 'Procurement Specialist', permissions: ['Create PO', 'View Suppliers'] }
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    setSelectedUsers(
      selectedUsers.length === filteredUsers.length
        ? []
        : filteredUsers.map(user => user.id)
    );
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on users:`, selectedUsers);
    setSelectedUsers([]);
  };

  return (
    <div className="p-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-heading-semibold text-text-primary">User Management</h2>
          <span className="px-3 py-1 bg-primary-100 text-primary rounded-full text-sm font-body-medium">
            {filteredUsers.length} Users
          </span>
        </div>
        <div className="flex items-center space-x-3">
          {selectedUsers.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-text-secondary">
                {selectedUsers.length} selected
              </span>
              <button
                onClick={() => handleBulkAction('activate')}
                className="px-3 py-1.5 bg-success text-white rounded-button text-sm hover:bg-success-700 transition-smooth"
              >
                Activate
              </button>
              <button
                onClick={() => handleBulkAction('deactivate')}
                className="px-3 py-1.5 bg-warning text-white rounded-button text-sm hover:bg-warning-700 transition-smooth"
              >
                Deactivate
              </button>
              <button
                onClick={() => handleBulkAction('delete')}
                className="px-3 py-1.5 bg-error text-white rounded-button text-sm hover:bg-error-700 transition-smooth"
              >
                Delete
              </button>
            </div>
          )}
          <button
            onClick={() => setShowAddUserModal(true)}
            className="flex items-center px-4 py-2 bg-primary text-white rounded-button hover:bg-primary-700 transition-smooth"
          >
            <Icon name="Plus" size={16} className="mr-2" />
            Add User
          </button>
          <button className="flex items-center px-4 py-2 border border-border rounded-button hover:bg-secondary-50 transition-smooth">
            <Icon name="Upload" size={16} className="mr-2" />
            Import Users
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-surface border border-border rounded-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50 border-b border-border">
              <tr>
                <th className="w-12 p-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-border focus:ring-primary"
                  />
                </th>
                <th className="text-left p-4 font-heading-medium text-text-primary">User</th>
                <th className="text-left p-4 font-heading-medium text-text-primary">Role & Department</th>
                <th className="text-left p-4 font-heading-medium text-text-primary">Status</th>
                <th className="text-left p-4 font-heading-medium text-text-primary">Last Login</th>
                <th className="text-left p-4 font-heading-medium text-text-primary">Permissions</th>
                <th className="text-center p-4 font-heading-medium text-text-primary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-border hover:bg-secondary-50 transition-smooth">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      className="rounded border-border focus:ring-primary"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-body-medium text-text-primary">{user.name}</p>
                        <p className="text-sm text-text-secondary">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-body-medium text-text-primary">{user.role}</p>
                      <p className="text-sm text-text-secondary">{user.department}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-body-medium ${
                      user.status === 'Active' ?'bg-success-100 text-success-700' :'bg-error-100 text-error-700'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                        user.status === 'Active' ? 'bg-success-500' : 'bg-error-500'
                      }`}></div>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-text-secondary">{user.lastLogin}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {user.permissions.slice(0, 2).map((permission, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 bg-primary-100 text-primary text-xs rounded-button"
                        >
                          {permission}
                        </span>
                      ))}
                      {user.permissions.length > 2 && (
                        <span className="inline-flex items-center px-2 py-1 bg-secondary-100 text-text-secondary text-xs rounded-button">
                          +{user.permissions.length - 2} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => setEditingUser(user)}
                        className="p-2 text-text-secondary hover:text-primary hover:bg-primary-50 rounded-button transition-smooth"
                        title="Edit User"
                      >
                        <Icon name="Edit" size={16} />
                      </button>
                      <button
                        className="p-2 text-text-secondary hover:text-warning hover:bg-warning-50 rounded-button transition-smooth"
                        title="Reset Password"
                      >
                        <Icon name="Key" size={16} />
                      </button>
                      <button
                        className="p-2 text-text-secondary hover:text-error hover:bg-error-50 rounded-button transition-smooth"
                        title="Delete User"
                      >
                        <Icon name="Trash2" size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Permission Matrix */}
      <div className="mt-8">
        <h3 className="text-lg font-heading-semibold text-text-primary mb-4">Role Permission Matrix</h3>
        <div className="bg-surface border border-border rounded-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary-50 border-b border-border">
                <tr>
                  <th className="text-left p-4 font-heading-medium text-text-primary">Role</th>
                  <th className="text-center p-4 font-heading-medium text-text-primary">Create PO</th>
                  <th className="text-center p-4 font-heading-medium text-text-primary">Approve PO</th>
                  <th className="text-center p-4 font-heading-medium text-text-primary">Manage Users</th>
                  <th className="text-center p-4 font-heading-medium text-text-primary">View Reports</th>
                  <th className="text-center p-4 font-heading-medium text-text-primary">System Config</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role) => (
                  <tr key={role.id} className="border-b border-border">
                    <td className="p-4 font-body-medium text-text-primary">{role.name}</td>
                    <td className="p-4 text-center">
                      <Icon 
                        name={role.permissions.includes('Create PO') || role.permissions.includes('Full Access') ? 'Check' : 'X'} 
                        size={16} 
                        className={role.permissions.includes('Create PO') || role.permissions.includes('Full Access') ? 'text-success' : 'text-error'}
                      />
                    </td>
                    <td className="p-4 text-center">
                      <Icon 
                        name={role.permissions.includes('Approve All') || role.permissions.includes('Full Access') ? 'Check' : 'X'} 
                        size={16} 
                        className={role.permissions.includes('Approve All') || role.permissions.includes('Full Access') ? 'text-success' : 'text-error'}
                      />
                    </td>
                    <td className="p-4 text-center">
                      <Icon 
                        name={role.permissions.includes('User Management') || role.permissions.includes('Full Access') ? 'Check' : 'X'} 
                        size={16} 
                        className={role.permissions.includes('User Management') || role.permissions.includes('Full Access') ? 'text-success' : 'text-error'}
                      />
                    </td>
                    <td className="p-4 text-center">
                      <Icon 
                        name={role.permissions.includes('View Reports') || role.permissions.includes('Full Access') ? 'Check' : 'X'} 
                        size={16} 
                        className={role.permissions.includes('View Reports') || role.permissions.includes('Full Access') ? 'text-success' : 'text-error'}
                      />
                    </td>
                    <td className="p-4 text-center">
                      <Icon 
                        name={role.permissions.includes('System Config') || role.permissions.includes('Full Access') ? 'Check' : 'X'} 
                        size={16} 
                        className={role.permissions.includes('System Config') || role.permissions.includes('Full Access') ? 'text-success' : 'text-error'}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;