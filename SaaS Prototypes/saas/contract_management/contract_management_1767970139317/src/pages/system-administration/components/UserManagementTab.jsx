import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const UserManagementTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@company.com",
      role: "Contract Administrator",
      department: "Legal",
      status: "Active",
      lastLogin: "2025-01-04 06:30:00",
      permissions: ["Full Access", "User Management", "System Config"],
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah.wilson@company.com",
      role: "Legal Counsel",
      department: "Legal",
      status: "Active",
      lastLogin: "2025-01-04 05:45:00",
      permissions: ["Contract Review", "Approval Authority"],
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "michael.chen@company.com",
      role: "Business User",
      department: "Procurement",
      status: "Active",
      lastLogin: "2025-01-03 16:20:00",
      permissions: ["Contract Creation", "Basic Editing"],
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      email: "emily.rodriguez@company.com",
      role: "Finance Manager",
      department: "Finance",
      status: "Inactive",
      lastLogin: "2025-01-02 14:15:00",
      permissions: ["Budget Approval", "Payment Tracking"],
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "David Park",
      email: "david.park@company.com",
      role: "Compliance Officer",
      department: "Compliance",
      status: "Active",
      lastLogin: "2025-01-04 07:10:00",
      permissions: ["Compliance Monitoring", "Audit Access"],
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const roleOptions = [
    { value: '', label: 'All Roles' },
    { value: 'Contract Administrator', label: 'Contract Administrator' },
    { value: 'Legal Counsel', label: 'Legal Counsel' },
    { value: 'Business User', label: 'Business User' },
    { value: 'Finance Manager', label: 'Finance Manager' },
    { value: 'Compliance Officer', label: 'Compliance Officer' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'Pending', label: 'Pending' }
  ];

  const filteredUsers = useMemo(() => {
    return users?.filter(user => {
      const matchesSearch = user?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                           user?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                           user?.department?.toLowerCase()?.includes(searchQuery?.toLowerCase());
      const matchesRole = !selectedRole || user?.role === selectedRole;
      const matchesStatus = !selectedStatus || user?.status === selectedStatus;
      
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [searchQuery, selectedRole, selectedStatus]);

  const handleUserSelect = (userId) => {
    setSelectedUsers(prev => 
      prev?.includes(userId) 
        ? prev?.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers?.length === filteredUsers?.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers?.map(user => user?.id));
    }
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setShowUserModal(true);
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action} for users:`, selectedUsers);
    setShowBulkModal(false);
    setSelectedUsers([]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-text-primary">User Management</h2>
          <p className="text-muted-foreground">Manage user accounts, roles, and permissions</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            iconName="Upload"
            iconPosition="left"
            onClick={() => console.log('Import users')}
          >
            Import Users
          </Button>
          <Button
            iconName="Plus"
            iconPosition="left"
            onClick={() => {
              setCurrentUser(null);
              setShowUserModal(true);
            }}
          >
            Add User
          </Button>
        </div>
      </div>
      {/* Filters */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            type="search"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="md:col-span-2"
          />
          <Select
            placeholder="Filter by role"
            options={roleOptions}
            value={selectedRole}
            onChange={setSelectedRole}
          />
          <Select
            placeholder="Filter by status"
            options={statusOptions}
            value={selectedStatus}
            onChange={setSelectedStatus}
          />
        </div>
      </div>
      {/* Bulk Actions */}
      {selectedUsers?.length > 0 && (
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-text-primary">
              {selectedUsers?.length} user{selectedUsers?.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowBulkModal(true)}
              >
                Bulk Actions
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedUsers([])}
              >
                Clear Selection
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Users Table */}
      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="w-12 p-4">
                  <Checkbox
                    checked={selectedUsers?.length === filteredUsers?.length && filteredUsers?.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="text-left p-4 font-medium text-text-primary">User</th>
                <th className="text-left p-4 font-medium text-text-primary">Role & Department</th>
                <th className="text-left p-4 font-medium text-text-primary">Status</th>
                <th className="text-left p-4 font-medium text-text-primary">Last Login</th>
                <th className="text-left p-4 font-medium text-text-primary">Permissions</th>
                <th className="text-right p-4 font-medium text-text-primary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers?.map((user) => (
                <tr key={user?.id} className="border-b border-border hover:bg-muted/50">
                  <td className="p-4">
                    <Checkbox
                      checked={selectedUsers?.includes(user?.id)}
                      onChange={() => handleUserSelect(user?.id)}
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user?.avatar}
                        alt={user?.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium text-text-primary">{user?.name}</div>
                        <div className="text-sm text-muted-foreground">{user?.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-text-primary">{user?.role}</div>
                      <div className="text-sm text-muted-foreground">{user?.department}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user?.status === 'Active' ?'bg-success/10 text-success' 
                        : user?.status === 'Inactive' ?'bg-error/10 text-error' :'bg-warning/10 text-warning'
                    }`}>
                      {user?.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-text-primary">
                      {new Date(user.lastLogin)?.toLocaleDateString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(user.lastLogin)?.toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {user?.permissions?.slice(0, 2)?.map((permission, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded text-xs bg-muted text-muted-foreground"
                        >
                          {permission}
                        </span>
                      ))}
                      {user?.permissions?.length > 2 && (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-muted text-muted-foreground">
                          +{user?.permissions?.length - 2} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Edit"
                        onClick={() => handleEditUser(user)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="MoreHorizontal"
                        onClick={() => console.log('More actions for', user?.name)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-300 p-4">
          <div className="bg-surface rounded-lg shadow-elevated w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-text-primary">
                  {currentUser ? 'Edit User' : 'Add New User'}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowUserModal(false)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  placeholder="Enter full name"
                  defaultValue={currentUser?.name || ''}
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Enter email address"
                  defaultValue={currentUser?.email || ''}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Role"
                  options={roleOptions?.slice(1)}
                  value={currentUser?.role || ''}
                  onChange={() => {}}
                />
                <Input
                  label="Department"
                  placeholder="Enter department"
                  defaultValue={currentUser?.department || ''}
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-medium text-text-primary">Permissions</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Full Access', 'User Management', 'System Config', 'Contract Review', 'Approval Authority', 'Budget Approval']?.map((permission) => (
                    <Checkbox
                      key={permission}
                      label={permission}
                      checked={currentUser?.permissions?.includes(permission) || false}
                      onChange={() => {}}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-border flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowUserModal(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => setShowUserModal(false)}>
                {currentUser ? 'Update User' : 'Create User'}
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Bulk Actions Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-300 p-4">
          <div className="bg-surface rounded-lg shadow-elevated w-full max-w-md">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-text-primary">Bulk Actions</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowBulkModal(false)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </div>
            <div className="p-6 space-y-3">
              <Button
                variant="outline"
                fullWidth
                iconName="UserCheck"
                iconPosition="left"
                onClick={() => handleBulkAction('activate')}
              >
                Activate Selected Users
              </Button>
              <Button
                variant="outline"
                fullWidth
                iconName="UserX"
                iconPosition="left"
                onClick={() => handleBulkAction('deactivate')}
              >
                Deactivate Selected Users
              </Button>
              <Button
                variant="outline"
                fullWidth
                iconName="Mail"
                iconPosition="left"
                onClick={() => handleBulkAction('reset-password')}
              >
                Send Password Reset
              </Button>
              <Button
                variant="destructive"
                fullWidth
                iconName="Trash2"
                iconPosition="left"
                onClick={() => handleBulkAction('delete')}
              >
                Delete Selected Users
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementTab;