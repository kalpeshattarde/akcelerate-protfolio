import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import OrganizationalHierarchy from './components/OrganizationalHierarchy';
import UserDataGrid from './components/UserDataGrid';
import UserProfilePanel from './components/UserProfilePanel';
import SystemHealthIndicator from './components/SystemHealthIndicator';
import BulkOperationsToolbar from './components/BulkOperationsToolbar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const UserManagementConsole = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [userRole] = useState('admin'); // Current user role

  useEffect(() => {
    // Mock notifications for admin users
    setNotifications([
      {
        type: 'warning',
        title: 'Security Alert',
        message: 'Multiple failed login attempts detected for user john.doe',
        time: '5 minutes ago',
        read: false
      },
      {
        type: 'info',
        title: 'User Registration',
        message: 'New user pending approval: sarah.wilson@company.com',
        time: '1 hour ago',
        read: false
      },
      {
        type: 'success',
        title: 'System Update',
        message: 'User directory sync completed successfully',
        time: '2 hours ago',
        read: true
      }
    ]);

    // Keyboard shortcuts
    const handleKeyDown = (e) => {
      // Quick user navigation (j/k keys)
      if (e?.key === 'j' || e?.key === 'k') {
        e?.preventDefault();
        // Navigate through user list
      }
      
      // Quick role assignment (r key)
      if (e?.key === 'r' && selectedUser) {
        e?.preventDefault();
        // Open role assignment modal
      }
      
      // Search focus (/ key)
      if (e?.key === '/' && !e?.ctrlKey && !e?.metaKey) {
        e?.preventDefault();
        document.getElementById('user-search')?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedUser]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleUserUpdate = (updatedUser) => {
    // Update user in the system
    console.log('Updating user:', updatedUser);
    setSelectedUser(updatedUser);
  };

  const handleBulkAction = (action, userIds) => {
    console.log(`Performing bulk action: ${action} on users:`, Array.from(userIds));
    
    // Simulate API call
    setTimeout(() => {
      setSelectedUsers(new Set());
      // Show success notification
      setNotifications(prev => [{
        type: 'success',
        title: 'Bulk Action Complete',
        message: `Successfully performed ${action} on ${userIds?.size} users`,
        time: 'Just now',
        read: false
      }, ...prev]);
    }, 1000);
  };

  const handleClearSelection = () => {
    setSelectedUsers(new Set());
  };

  const handleAddUser = () => {
    setIsAddUserModalOpen(true);
  };

  const handleExportUsers = () => {
    // Export user data
    console.log('Exporting user data...');
  };

  const handleImportUsers = () => {
    // Import user data
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv,.xlsx';
    input.onchange = (e) => {
      const file = e?.target?.files?.[0];
      if (file) {
        console.log('Importing users from:', file?.name);
      }
    };
    input?.click();
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>User Management Console - ESG Dashboard Pro</title>
        <meta name="description" content="Administrative interface for managing role-based access control, user permissions, and SSO integration within the ESG analytics platform." />
      </Helmet>
      {/* Header with System Health */}
      <Header 
        userRole={userRole}
        notifications={notifications}
        onDomainSwitch={() => {}}
      />
      {/* Main Content */}
      <div className="pt-16 h-screen flex flex-col">
        {/* Top Action Bar */}
        <div className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-foreground">User Management Console</h1>
              <SystemHealthIndicator />
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Search */}
              <div className="relative">
                <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  id="user-search"
                  type="text"
                  placeholder="Search users... (Press / to focus)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e?.target?.value)}
                  className="pl-9 pr-4 py-2 w-64 bg-muted border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Action Buttons */}
              <Button variant="outline" onClick={handleImportUsers}>
                <Icon name="Upload" size={14} className="mr-1" />
                Import
              </Button>
              
              <Button variant="outline" onClick={handleExportUsers}>
                <Icon name="Download" size={14} className="mr-1" />
                Export
              </Button>
              
              <Button onClick={handleAddUser}>
                <Icon name="UserPlus" size={14} className="mr-1" />
                Add User
              </Button>
            </div>
          </div>
        </div>

        {/* Bulk Operations Toolbar */}
        <BulkOperationsToolbar
          selectedUsers={selectedUsers}
          onBulkAction={handleBulkAction}
          onClearSelection={handleClearSelection}
        />

        {/* Three Panel Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Organizational Hierarchy (25%) */}
          <div className="w-1/4 min-w-[300px] max-w-[400px]">
            <OrganizationalHierarchy
              onUserSelect={handleUserSelect}
              selectedUserId={selectedUser?.id}
            />
          </div>

          {/* Center Panel - User Data Grid (50%) */}
          <div className="flex-1">
            <UserDataGrid
              onUserSelect={handleUserSelect}
              selectedUserId={selectedUser?.id}
              onBulkAction={(action, users) => {
                setSelectedUsers(users);
                handleBulkAction(action, users);
              }}
            />
          </div>

          {/* Right Panel - User Profile (25%) */}
          <div className="w-1/4 min-w-[300px] max-w-[400px]">
            <UserProfilePanel
              selectedUser={selectedUser}
              onUserUpdate={handleUserUpdate}
            />
          </div>
        </div>
      </div>
      {/* Add User Modal */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Add New User</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsAddUserModalOpen(false)}
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Enter last name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="user@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Username</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="username"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Role</label>
                    <select className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="">Select Role</option>
                      <option value="esg-manager">ESG Manager</option>
                      <option value="environmental-analyst">Environmental Analyst</option>
                      <option value="sustainability-officer">Sustainability Officer</option>
                      <option value="operations-manager">Operations Manager</option>
                      <option value="facility-manager">Facility Manager</option>
                      <option value="data-collector">Data Collector</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Department</label>
                    <select className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                      <option value="">Select Department</option>
                      <option value="sustainability">Sustainability</option>
                      <option value="operations">Operations</option>
                      <option value="finance">Finance</option>
                      <option value="compliance">Compliance</option>
                      <option value="it">IT Administration</option>
                    </select>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <h3 className="text-sm font-medium text-foreground mb-3">Account Settings</h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-border" defaultChecked />
                      <span className="text-sm text-foreground">Send welcome email</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-border" />
                      <span className="text-sm text-foreground">Require password change on first login</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-border" />
                      <span className="text-sm text-foreground">Enable MFA requirement</span>
                    </label>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setIsAddUserModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1">
                    <Icon name="UserPlus" size={14} className="mr-1" />
                    Create User
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* Mobile Responsive Message */}
      <div className="lg:hidden fixed inset-0 bg-background flex items-center justify-center p-4 z-50">
        <div className="text-center">
          <Icon name="Monitor" size={48} className="mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Desktop Required</h2>
          <p className="text-muted-foreground">
            The User Management Console is optimized for desktop viewing. Please access this page from a desktop computer for the full experience.
          </p>
          <div className="mt-4">
            <Button variant="outline" onClick={() => window.history?.back()}>
              <Icon name="ArrowLeft" size={14} className="mr-1" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagementConsole;