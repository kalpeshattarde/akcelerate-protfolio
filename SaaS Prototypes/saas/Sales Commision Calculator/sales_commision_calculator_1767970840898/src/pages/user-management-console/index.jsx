// src/pages/user-management-console/index.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import PageHeader from 'components/ui/PageHeader';
import useSidebar from 'hooks/useSidebar';
import UserDirectory from './components/UserDirectory';
import RoleManagementPanel from './components/RoleManagementPanel';
import AccessControlMatrix from './components/AccessControlMatrix';
import SessionManagement from './components/SessionManagement';
import BulkOperationsPanel from './components/BulkOperationsPanel';
import IntegrationStatusPanel from './components/IntegrationStatusPanel';
import AuditLog from './components/AuditLog';
import AdvancedFilters from './components/AdvancedFilters';
import ExportModal from './components/ExportModal';


const UserManagementConsole = () => {
  const { getMainContentClasses } = useSidebar();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [activeView, setActiveView] = useState('directory');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [showExportModal, setShowExportModal] = useState(false);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [ssoStatus, setSsoStatus] = useState('healthy');
  const [integrationStatus, setIntegrationStatus] = useState('connected');
  const [pendingChanges, setPendingChanges] = useState([]);
  const [auditFilter, setAuditFilter] = useState({ timeRange: '24h', action: 'all' });
  const [filters, setFilters] = useState({
    role: 'all',
    status: 'all',
    department: 'all',
    territory: 'all',
    compensationLevel: 'all',
    lastLogin: 'all'
  });
  const [savedFilters, setSavedFilters] = useState([]);

  // Mock user data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      role: "Sales Manager",
      department: "Sales",
      lastLogin: "2024-01-20T10:30:00Z",
      status: "active",
      territory: "West Coast",
      compensationLevel: "L3",
      permissions: ['read_all_data', 'manage_team', 'approve_bonuses'],
      avatar: null
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@company.com",
      role: "Sales Representative",
      department: "Sales",
      lastLogin: "2024-01-20T09:15:00Z",
      status: "active",
      territory: "Pacific Northwest",
      compensationLevel: "L2",
      permissions: ['read_own_data', 'submit_reports'],
      avatar: null
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.rodriguez@company.com",
      role: "Administrator",
      department: "IT",
      lastLogin: "2024-01-20T11:45:00Z",
      status: "active",
      territory: "All",
      compensationLevel: "L4",
      permissions: ['full_admin', 'system_config', 'user_management'],
      avatar: null
    },
    {
      id: 4,
      name: "David Thompson",
      email: "david.thompson@company.com",
      role: "Sales Representative",
      department: "Sales",
      lastLogin: "2024-01-19T16:20:00Z",
      status: "inactive",
      territory: "Mountain West",
      compensationLevel: "L1",
      permissions: ['read_own_data'],
      avatar: null
    },
    {
      id: 5,
      name: "Lisa Wang",
      email: "lisa.wang@company.com",
      role: "Sales Operations",
      department: "Sales Operations",
      lastLogin: "2024-01-20T08:30:00Z",
      status: "active",
      territory: "Midwest",
      compensationLevel: "L3",
      permissions: ['read_all_data', 'manage_reports', 'configure_plans'],
      avatar: null
    }
  ]);

  // Mock roles data
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Administrator",
      description: "Full system access and user management",
      permissions: ['full_admin', 'system_config', 'user_management', 'audit_access'],
      userCount: 3,
      level: 5
    },
    {
      id: 2,
      name: "Sales Manager",
      description: "Manage team and approve compensation changes",
      permissions: ['read_all_data', 'manage_team', 'approve_bonuses', 'territory_management'],
      userCount: 8,
      level: 4
    },
    {
      id: 3,
      name: "Sales Operations",
      description: "Configure compensation plans and generate reports",
      permissions: ['read_all_data', 'manage_reports', 'configure_plans', 'bulk_operations'],
      userCount: 5,
      level: 3
    },
    {
      id: 4,
      name: "Sales Representative",
      description: "Access own data and submit reports",
      permissions: ['read_own_data', 'submit_reports', 'view_dashboard'],
      userCount: 42,
      level: 2
    }
  ]);

  // Mock audit data
  const [auditLogs, setAuditLogs] = useState([
    {
      id: 1,
      timestamp: "2024-01-20T11:30:00Z",
      user: "Emily Rodriguez",
      action: "role_assignment",
      target: "Michael Chen",
      details: "Assigned Sales Representative role",
      ipAddress: "192.168.1.105",
      justification: "New hire onboarding"
    },
    {
      id: 2,
      timestamp: "2024-01-20T10:45:00Z",
      user: "Sarah Johnson",
      action: "permission_change",
      target: "Territory Access",
      details: "Updated territory restrictions for West Coast team",
      ipAddress: "192.168.1.102",
      justification: "Organizational restructure"
    },
    {
      id: 3,
      timestamp: "2024-01-20T09:15:00Z",
      user: "Emily Rodriguez",
      action: "user_deactivation",
      target: "John Smith",
      details: "Deactivated user account",
      ipAddress: "192.168.1.105",
      justification: "Employee termination"
    }
  ]);

  // Additional state for missing functionality
  const [showUserModal, setShowUserModal] = useState(false);
  const [showBulkPanel, setShowBulkPanel] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [permissions, setPermissions] = useState([
    'read_own_data', 'read_all_data', 'manage_team', 'approve_bonuses', 
    'full_admin', 'system_config', 'user_management', 'audit_access'
  ]);
  const [integrations, setIntegrations] = useState([
    { name: 'Active Directory', status: 'connected', lastSync: '2024-01-20T10:30:00Z' },
    { name: 'Salesforce', status: 'connected', lastSync: '2024-01-20T10:25:00Z' }
  ]);
  const [lastSync, setLastSync] = useState('2024-01-20T10:30:00Z');
  const [activeSessions, setActiveSessions] = useState([]);
  const [auditEntries, setAuditEntries] = useState(auditLogs);
  const [auditFilters, setAuditFilters] = useState({ timeRange: '24h', action: 'all' });
  const [selectedAuditEntry, setSelectedAuditEntry] = useState(null);

  // Derived state for PageHeader
  const activeUsers = users.filter(user => user.status === 'active');
  const totalUsers = users.length;
  const totalRoles = roles.length;

  // Handle user edit operations
  const handleUserEdit = (userId, updatedData) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId ? { ...user, ...updatedData } : user
      )
    );
    
    // Add audit log entry
    const newAuditEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      user: "Current User", // In real app, get from auth context
      action: "user_edit",
      target: users.find(u => u.id === userId)?.name || 'Unknown User',
      details: `Updated user information: ${Object.keys(updatedData).join(', ')}`,
      ipAddress: "192.168.1.100", // In real app, get actual IP
      justification: "User information update"
    };
    setAuditEntries(prev => [newAuditEntry, ...prev]);
  };

  // Handle user deletion
  const handleUserDelete = (userId) => {
    const userToDelete = users.find(u => u.id === userId);
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    
    // Add audit log entry
    const newAuditEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      user: "Current User",
      action: "user_deletion",
      target: userToDelete?.name || 'Unknown User',
      details: "User account deleted",
      ipAddress: "192.168.1.100",
      justification: "User account cleanup"
    };
    setAuditEntries(prev => [newAuditEntry, ...prev]);
  };

  // Handle role operations
  const handleRoleCreate = (roleData) => {
    const newRole = {
      id: Date.now(),
      ...roleData,
      userCount: 0
    };
    setRoles(prev => [...prev, newRole]);
  };

  const handleRoleEdit = (roleId, updatedData) => {
    setRoles(prev => 
      prev.map(role => 
        role.id === roleId ? { ...role, ...updatedData } : role
      )
    );
  };

  const handleRoleDelete = (roleId) => {
    setRoles(prev => prev.filter(role => role.id !== roleId));
  };

  // Handle permission changes
  const handlePermissionChange = (roleId, permission, granted) => {
    setRoles(prev => 
      prev.map(role => {
        if (role.id === roleId) {
          const updatedPermissions = granted 
            ? [...role.permissions, permission]
            : role.permissions.filter(p => p !== permission);
          return { ...role, permissions: updatedPermissions };
        }
        return role;
      })
    );
  };

  // Handle session management
  const handleSessionTerminate = (sessionId) => {
    setActiveSessions(prev => prev.filter(session => session.id !== sessionId));
  };

  const handleBulkSessionTerminate = (sessionIds) => {
    setActiveSessions(prev => prev.filter(session => !sessionIds.includes(session.id)));
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'f':
            e.preventDefault();
            document.getElementById('user-search')?.focus();
            break;
          case 'r':
            e.preventDefault();
            if (selectedUsers.length > 0) {
              setActiveView('roles');
            }
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [selectedUsers]);

  // Simulate SSO status updates
  useEffect(() => {
    const statusOptions = ['healthy', 'syncing', 'warning', 'error'];
    const interval = setInterval(() => {
      setSsoStatus(statusOptions[Math.floor(Math.random() * statusOptions.length)]);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Handle bulk user operations
  const handleBulkOperation = (operation, data) => {
    switch (operation) {
      case 'role_assignment':
        const updatedUsers = users.map(user => {
          if (selectedUsers.includes(user.id)) {
            return { ...user, role: data.role };
          }
          return user;
        });
        setUsers(updatedUsers);
        break;
      case 'status_change':
        setUsers(users.map(user => {
          if (selectedUsers.includes(user.id)) {
            return { ...user, status: data.status };
          }
          return user;
        }));
        break;
      case 'import_users':
        // Handle user import
        console.log('Importing users:', data);
        break;
      default:
        break;
    }
  };

  // Handle export operations
  const handleExport = (type) => {
    console.log('Exporting:', type);
    setShowExportModal(false);
  };

  // Handle filter operations
  const handleSaveFilter = (filterName, filterConfig) => {
    const newFilter = {
      id: Date.now(),
      name: filterName,
      config: filterConfig,
      createdAt: new Date().toISOString()
    };
    setSavedFilters([...savedFilters, newFilter]);
  };

  // Filter users based on current criteria
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = currentFilter === 'all' || 
                         (currentFilter === 'active' && user.status === 'active') ||
                         (currentFilter === 'inactive' && user.status === 'inactive') ||
                         (currentFilter === 'role' && user.role === currentFilter);
    
    return matchesSearch && matchesFilter;
  });

  const views = [
    { id: 'directory', label: 'User Directory', icon: 'Users' },
    { id: 'roles', label: 'Role Management', icon: 'Shield' },
    { id: 'access', label: 'Access Control', icon: 'Key' },
    { id: 'bulk', label: 'Bulk Operations', icon: 'Database' },
    { id: 'audit', label: 'Audit Log', icon: 'FileText' },
    { id: 'sessions', label: 'Sessions', icon: 'Monitor' }
  ];

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Sidebar />
      <Header />
      
      <main className={`pt-16 transition-all duration-300 ${getMainContentClasses()}`}>
        {/* Animated Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PageHeader
            title="User Management Console"
            description="Comprehensive user management with role-based access control, session monitoring, and bulk operations."
            icon="Users"
            statusIndicators={[
              {
                icon: 'Users',
                iconClass: 'text-neon-indigo',
                label: `${totalUsers} Total Users`
              },
              {
                icon: 'UserCheck',
                iconClass: 'text-neon-teal',
                label: `${activeUsers} Active Sessions`
              },
              {
                icon: 'Shield',
                iconClass: 'text-neon-aqua',
                label: 'SOX Compliant'
              }
            ]}
            actionButtons={[
              {
                icon: 'UserPlus',
                label: 'Add User',
                onClick: () => setShowUserModal(true),
                variant: 'primary'
              },
              {
                icon: 'Settings',
                label: 'Bulk Operations',
                onClick: () => setShowBulkPanel(true),
                variant: 'secondary'
              },
              {
                icon: 'Download',
                label: 'Export',
                onClick: () => setShowExportModal(true),
                variant: 'secondary'
              }
            ]}
          />
        </motion.div>

        <motion.div 
          className="p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Filters */}
          <motion.div 
            className="mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <AdvancedFilters
              filters={filters}
              onFiltersChange={setFilters}
              onSaveFilter={handleSaveFilter}
              savedFilters={savedFilters}
            />
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-12 gap-6 mb-8">
            {/* User Directory */}
            <motion.div 
              className="col-span-12 xl:col-span-8"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <UserDirectory
                users={filteredUsers}
                selectedUsers={selectedUsers}
                onSelectionChange={setSelectedUsers}
                onUserEdit={handleUserEdit}
                onUserDelete={handleUserDelete}
                sortConfig={sortConfig}
                onSort={setSortConfig}
              />
            </motion.div>

            {/* Right Panel */}
            <motion.div 
              className="col-span-12 xl:col-span-4 space-y-6"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {/* Role Management */}
              <RoleManagementPanel
                roles={roles}
                onRoleCreate={handleRoleCreate}
                onRoleEdit={handleRoleEdit}
                onRoleDelete={handleRoleDelete}
              />

              {/* Integration Status */}
              <IntegrationStatusPanel
                integrations={integrations}
                status={integrationStatus}
                lastSync={lastSync}
              />
            </motion.div>
          </div>

          {/* Secondary Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            {/* Access Control Matrix */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <AccessControlMatrix
                roles={roles}
                permissions={permissions}
                onPermissionChange={handlePermissionChange}
              />
            </motion.div>

            {/* Session Management */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <SessionManagement
                activeSessions={activeSessions}
                onSessionTerminate={handleSessionTerminate}
                onBulkTerminate={handleBulkSessionTerminate}
              />
            </motion.div>
          </div>

          {/* Audit Log */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <AuditLog
              auditEntries={auditEntries}
              onEntryView={setSelectedAuditEntry}
              filters={auditFilters}
              onFiltersChange={setAuditFilters}
            />
          </motion.div>
        </motion.div>
      </main>

      {/* Bulk Operations Panel */}
      {showBulkPanel && (
        <BulkOperationsPanel
          selectedUsers={selectedUsers}
          onClose={() => setShowBulkPanel(false)}
          onBulkOperation={handleBulkOperation}
        />
      )}

      {/* Export Modal */}
      {showExportModal && (
        <ExportModal
          users={selectedUsers.length > 0 ? selectedUsers : filteredUsers}
          onClose={() => setShowExportModal(false)}
          onExport={handleExport}
        />
      )}
    </div>
  );
};

export default UserManagementConsole;