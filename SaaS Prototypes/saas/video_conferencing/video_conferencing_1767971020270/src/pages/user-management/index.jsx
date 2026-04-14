import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import QuickActionButton from '../../components/ui/QuickActionButton';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

// Import components
import UserStatsCard from './components/UserStatsCard';
import UserTableRow from './components/UserTableRow';
import UserFilters from './components/UserFilters';
import BulkActionsBar from './components/BulkActionsBar';
import UserModal from './components/UserModal';
import AuditLogPanel from './components/AuditLogPanel';

const UserManagement = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isAuditLogOpen, setIsAuditLogOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedUser, setSelectedUser] = useState(null);
  
  const [filters, setFilters] = useState({
    role: '',
    department: '',
    status: '',
    activity: ''
  });

  // Mock user data
  const mockUsers = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      role: "admin",
      department: "engineering",
      status: "active",
      lastLogin: new Date(Date.now() - 3600000),
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      phone: "+1 (555) 123-4567",
      createdAt: new Date(Date.now() - 86400000 * 30),
      permissions: ["create_meetings", "manage_recordings", "user_management"]
    },
    {
      id: 2,
      name: "Mike Wilson",
      email: "mike.wilson@company.com",
      role: "moderator",
      department: "marketing",
      status: "active",
      lastLogin: new Date(Date.now() - 7200000),
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      phone: "+1 (555) 234-5678",
      createdAt: new Date(Date.now() - 86400000 * 45),
      permissions: ["create_meetings", "manage_recordings"]
    },
    {
      id: 3,
      name: "Emma Davis",
      email: "emma.davis@company.com",
      role: "user",
      department: "sales",
      status: "active",
      lastLogin: new Date(Date.now() - 1800000),
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      phone: "+1 (555) 345-6789",
      createdAt: new Date(Date.now() - 86400000 * 15),
      permissions: ["create_meetings"]
    },
    {
      id: 4,
      name: "James Brown",
      email: "james.brown@company.com",
      role: "user",
      department: "hr",
      status: "inactive",
      lastLogin: new Date(Date.now() - 86400000 * 7),
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      phone: "+1 (555) 456-7890",
      createdAt: new Date(Date.now() - 86400000 * 60),
      permissions: []
    },
    {
      id: 5,
      name: "Lisa Anderson",
      email: "lisa.anderson@company.com",
      role: "moderator",
      department: "finance",
      status: "pending",
      lastLogin: null,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      phone: "+1 (555) 567-8901",
      createdAt: new Date(Date.now() - 86400000 * 3),
      permissions: ["create_meetings", "analytics_access"]
    },
    {
      id: 6,
      name: "David Martinez",
      email: "david.martinez@company.com",
      role: "user",
      department: "operations",
      status: "suspended",
      lastLogin: new Date(Date.now() - 86400000 * 14),
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      phone: "+1 (555) 678-9012",
      createdAt: new Date(Date.now() - 86400000 * 90),
      permissions: []
    }
  ];

  const [users, setUsers] = useState(mockUsers);

  // Calculate stats
  const userStats = {
    total: users?.length,
    active: users?.filter(u => u?.status === 'active')?.length,
    inactive: users?.filter(u => u?.status === 'inactive')?.length,
    pending: users?.filter(u => u?.status === 'pending')?.length,
    admins: users?.filter(u => u?.role === 'admin')?.length
  };

  // Filter and search users
  const filteredUsers = users?.filter(user => {
    const matchesSearch = user?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         user?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         user?.department?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    
    const matchesRole = !filters?.role || user?.role === filters?.role;
    const matchesDepartment = !filters?.department || user?.department === filters?.department;
    const matchesStatus = !filters?.status || user?.status === filters?.status;
    
    let matchesActivity = true;
    if (filters?.activity) {
      const now = new Date();
      switch (filters?.activity) {
        case 'today':
          matchesActivity = user?.lastLogin && (now - user?.lastLogin) < 86400000;
          break;
        case 'week':
          matchesActivity = user?.lastLogin && (now - user?.lastLogin) < 604800000;
          break;
        case 'month':
          matchesActivity = user?.lastLogin && (now - user?.lastLogin) < 2592000000;
          break;
        case 'never':
          matchesActivity = !user?.lastLogin;
          break;
        default:
          matchesActivity = true;
      }
    }

    return matchesSearch && matchesRole && matchesDepartment && matchesStatus && matchesActivity;
  });

  // Sort users
  const sortedUsers = [...filteredUsers]?.sort((a, b) => {
    if (sortConfig?.key) {
      const aValue = a?.[sortConfig?.key];
      const bValue = b?.[sortConfig?.key];
      
      if (aValue < bValue) {
        return sortConfig?.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig?.direction === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedUsers?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = sortedUsers?.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig?.key === key && prevConfig?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectUser = (userId, isSelected) => {
    setSelectedUsers(prev => 
      isSelected 
        ? [...prev, userId]
        : prev?.filter(id => id !== userId)
    );
  };

  const handleSelectAll = (isSelected) => {
    setSelectedUsers(isSelected ? paginatedUsers?.map(user => user?.id) : []);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      role: '',
      department: '',
      status: '',
      activity: ''
    });
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleBulkAction = (action) => {
    console.log(`Performing bulk action: ${action} on users:`, selectedUsers);
    // Implement bulk actions here
    setSelectedUsers([]);
  };

  const handleEditUser = (user) => {
    setModalMode('edit');
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  const handleViewUser = (user) => {
    setModalMode('view');
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  const handleDeactivateUser = (user) => {
    const newStatus = user?.status === 'active' ? 'inactive' : 'active';
    setUsers(prev => prev?.map(u => 
      u?.id === user?.id ? { ...u, status: newStatus } : u
    ));
  };

  const handleSaveUser = async (userData) => {
    if (modalMode === 'create') {
      const newUser = {
        ...userData,
        id: Math.max(...users?.map(u => u?.id)) + 1,
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        lastLogin: null,
        createdAt: new Date()
      };
      setUsers(prev => [...prev, newUser]);
    } else if (modalMode === 'edit') {
      setUsers(prev => prev?.map(u => 
        u?.id === selectedUser?.id ? { ...u, ...userData } : u
      ));
    }
  };

  const getSortIcon = (key) => {
    if (sortConfig?.key !== key) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isCollapsed={isSidebarCollapsed}
        onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        notificationCount={3}
      />
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        userRole="admin"
      />
      <main className={`pt-16 transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
      }`}>
        <div className="p-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-foreground mb-2">User Management</h1>
              <p className="text-muted-foreground">
                Manage user accounts, roles, and permissions across your organization
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <Button
                variant="outline"
                onClick={() => setIsAuditLogOpen(true)}
              >
                <Icon name="FileText" size={16} className="mr-2" />
                Audit Log
              </Button>
              
              <Button
                variant="outline"
                onClick={() => console.log('Import users')}
              >
                <Icon name="Upload" size={16} className="mr-2" />
                Import
              </Button>
              
              <Button
                variant="outline"
                onClick={() => console.log('Export users')}
              >
                <Icon name="Download" size={16} className="mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <UserStatsCard
              title="Total Users"
              value={userStats?.total}
              change="+12% from last month"
              changeType="increase"
              icon="Users"
              color="primary"
            />
            <UserStatsCard
              title="Active Users"
              value={userStats?.active}
              change="+8% from last month"
              changeType="increase"
              icon="UserCheck"
              color="success"
            />
            <UserStatsCard
              title="Inactive Users"
              value={userStats?.inactive}
              change="-3% from last month"
              changeType="decrease"
              icon="UserX"
              color="error"
            />
            <UserStatsCard
              title="Pending Users"
              value={userStats?.pending}
              change="+5 new requests"
              changeType="increase"
              icon="Clock"
              color="warning"
            />
            <UserStatsCard
              title="Administrators"
              value={userStats?.admins}
              change="No change"
              changeType="neutral"
              icon="Shield"
              color="primary"
            />
          </div>

          {/* Filters */}
          <UserFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
            onSearchChange={setSearchTerm}
          />

          {/* Bulk Actions */}
          <BulkActionsBar
            selectedCount={selectedUsers?.length}
            onBulkAction={handleBulkAction}
            onClearSelection={() => setSelectedUsers([])}
            totalUsers={filteredUsers?.length}
          />

          {/* Users Table */}
          <div className="bg-surface border border-border rounded-lg shadow-subtle overflow-hidden">
            {/* Desktop Table Header */}
            <div className="hidden lg:block">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      <input
                        type="checkbox"
                        checked={selectedUsers?.length === paginatedUsers?.length && paginatedUsers?.length > 0}
                        onChange={(e) => handleSelectAll(e?.target?.checked)}
                        className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                      />
                    </th>
                    <th className="px-6 py-4 text-left">
                      <button
                        onClick={() => handleSort('name')}
                        className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-micro"
                      >
                        <span>User</span>
                        <Icon name={getSortIcon('name')} size={14} />
                      </button>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <button
                        onClick={() => handleSort('role')}
                        className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-micro"
                      >
                        <span>Role</span>
                        <Icon name={getSortIcon('role')} size={14} />
                      </button>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <button
                        onClick={() => handleSort('department')}
                        className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-micro"
                      >
                        <span>Department</span>
                        <Icon name={getSortIcon('department')} size={14} />
                      </button>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <button
                        onClick={() => handleSort('lastLogin')}
                        className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-micro"
                      >
                        <span>Last Login</span>
                        <Icon name={getSortIcon('lastLogin')} size={14} />
                      </button>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <button
                        onClick={() => handleSort('status')}
                        className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-micro"
                      >
                        <span>Status</span>
                        <Icon name={getSortIcon('status')} size={14} />
                      </button>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers?.map((user) => (
                    <UserTableRow
                      key={user?.id}
                      user={user}
                      isSelected={selectedUsers?.includes(user?.id)}
                      onSelect={handleSelectUser}
                      onEdit={handleEditUser}
                      onDeactivate={handleDeactivateUser}
                      onViewDetails={handleViewUser}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden p-4">
              {paginatedUsers?.map((user) => (
                <UserTableRow
                  key={user?.id}
                  user={user}
                  isSelected={selectedUsers?.includes(user?.id)}
                  onSelect={handleSelectUser}
                  onEdit={handleEditUser}
                  onDeactivate={handleDeactivateUser}
                  onViewDetails={handleViewUser}
                />
              ))}
            </div>

            {/* Empty State */}
            {paginatedUsers?.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <Icon name="Users" size={48} className="text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No users found</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  {searchTerm || Object.values(filters)?.some(f => f) 
                    ? "Try adjusting your search or filters to find what you're looking for."
                    : "No users are currently available in the system."
                  }
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedUsers?.length)} of {sortedUsers?.length} users
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <Icon name="ChevronLeft" size={16} />
                </Button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className="w-8 h-8"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                  
                  {totalPages > 5 && (
                    <>
                      <span className="text-muted-foreground">...</span>
                      <Button
                        variant={currentPage === totalPages ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(totalPages)}
                        className="w-8 h-8"
                      >
                        {totalPages}
                      </Button>
                    </>
                  )}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  <Icon name="ChevronRight" size={16} />
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      {/* User Modal */}
      <UserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        user={selectedUser}
        mode={modalMode}
        onSave={handleSaveUser}
      />
      {/* Audit Log Panel */}
      <AuditLogPanel
        isOpen={isAuditLogOpen}
        onClose={() => setIsAuditLogOpen(false)}
      />
      {/* Quick Action Button */}
      <QuickActionButton userRole="admin" />
    </div>
  );
};

export default UserManagement;