import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UserDataGrid = ({ onUserSelect, selectedUserId, onBulkAction }) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [filterConfig, setFilterConfig] = useState({
    role: 'all',
    status: 'all',
    mfa: 'all',
    department: 'all'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isSelectAll, setIsSelectAll] = useState(false);

  const usersPerPage = 20;

  useEffect(() => {
    // Mock user data
    const mockUsers = [
      {
        id: 'u1',
        username: 'sarah.johnson',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@company.com',
        role: 'ESG Manager',
        department: 'Sustainability',
        status: 'active',
        lastLogin: '2025-01-07 09:30:15',
        mfaEnabled: true,
        permissions: ['read', 'write', 'admin'],
        createdDate: '2024-03-15',
        loginCount: 342,
        sessionActive: true
      },
      {
        id: 'u2',
        username: 'michael.chen',
        name: 'Michael Chen',
        email: 'michael.chen@company.com',
        role: 'Environmental Analyst',
        department: 'Sustainability',
        status: 'active',
        lastLogin: '2025-01-07 08:15:42',
        mfaEnabled: true,
        permissions: ['read', 'write'],
        createdDate: '2024-05-20',
        loginCount: 156,
        sessionActive: false
      },
      {
        id: 'u3',
        username: 'emma.rodriguez',
        name: 'Emma Rodriguez',
        email: 'emma.rodriguez@company.com',
        role: 'Sustainability Officer',
        department: 'Sustainability',
        status: 'inactive',
        lastLogin: '2025-01-05 16:45:23',
        mfaEnabled: false,
        permissions: ['read'],
        createdDate: '2024-01-10',
        loginCount: 89,
        sessionActive: false
      },
      {
        id: 'u4',
        username: 'david.kim',
        name: 'David Kim',
        email: 'david.kim@company.com',
        role: 'Environmental Analyst',
        department: 'Sustainability',
        status: 'active',
        lastLogin: '2025-01-07 10:20:18',
        mfaEnabled: true,
        permissions: ['read', 'write'],
        createdDate: '2024-07-08',
        loginCount: 234,
        sessionActive: true
      },
      {
        id: 'u5',
        username: 'james.wilson',
        name: 'James Wilson',
        email: 'james.wilson@company.com',
        role: 'Operations Manager',
        department: 'Operations',
        status: 'active',
        lastLogin: '2025-01-07 07:45:33',
        mfaEnabled: true,
        permissions: ['read', 'write', 'admin'],
        createdDate: '2024-02-28',
        loginCount: 445,
        sessionActive: true
      },
      {
        id: 'u6',
        username: 'lisa.thompson',
        name: 'Lisa Thompson',
        email: 'lisa.thompson@company.com',
        role: 'Facility Manager',
        department: 'Operations',
        status: 'active',
        lastLogin: '2025-01-07 09:10:55',
        mfaEnabled: false,
        permissions: ['read', 'write'],
        createdDate: '2024-04-12',
        loginCount: 178,
        sessionActive: false
      },
      {
        id: 'u7',
        username: 'robert.davis',
        name: 'Robert Davis',
        email: 'robert.davis@company.com',
        role: 'Data Collector',
        department: 'Operations',
        status: 'pending',
        lastLogin: 'Never',
        mfaEnabled: false,
        permissions: ['read'],
        createdDate: '2025-01-06',
        loginCount: 0,
        sessionActive: false
      },
      {
        id: 'u8',
        username: 'maria.garcia',
        name: 'Maria Garcia',
        email: 'maria.garcia@company.com',
        role: 'Facility Manager',
        department: 'Operations',
        status: 'active',
        lastLogin: '2025-01-06 18:30:12',
        mfaEnabled: true,
        permissions: ['read', 'write'],
        createdDate: '2024-06-03',
        loginCount: 267,
        sessionActive: false
      },
      {
        id: 'u9',
        username: 'jennifer.lee',
        name: 'Jennifer Lee',
        email: 'jennifer.lee@company.com',
        role: 'Finance Manager',
        department: 'Finance',
        status: 'active',
        lastLogin: '2025-01-07 08:00:44',
        mfaEnabled: true,
        permissions: ['read', 'write', 'admin'],
        createdDate: '2024-01-22',
        loginCount: 398,
        sessionActive: true
      },
      {
        id: 'u10',
        username: 'thomas.brown',
        name: 'Thomas Brown',
        email: 'thomas.brown@company.com',
        role: 'Cost Analyst',
        department: 'Finance',
        status: 'active',
        lastLogin: '2025-01-07 09:45:17',
        mfaEnabled: true,
        permissions: ['read', 'write'],
        createdDate: '2024-08-14',
        loginCount: 123,
        sessionActive: true
      }
    ];

    setUsers(mockUsers);
  }, []);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleUserSelection = (userId) => {
    setSelectedUsers(prev => {
      const newSet = new Set(prev);
      if (newSet?.has(userId)) {
        newSet?.delete(userId);
      } else {
        newSet?.add(userId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (isSelectAll) {
      setSelectedUsers(new Set());
      setIsSelectAll(false);
    } else {
      setSelectedUsers(new Set(filteredUsers.map(user => user.id)));
      setIsSelectAll(true);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'inactive': return 'text-error bg-error/10';
      case 'pending': return 'text-warning bg-warning/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getRoleColor = (role) => {
    if (role?.includes('Manager') || role?.includes('Officer')) return 'text-primary bg-primary/10';
    if (role?.includes('Admin')) return 'text-error bg-error/10';
    return 'text-secondary bg-secondary/10';
  };

  const formatLastLogin = (lastLogin) => {
    if (lastLogin === 'Never') return 'Never';
    const date = new Date(lastLogin);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date?.toLocaleDateString();
  };

  // Apply filters and sorting
  const filteredUsers = users?.filter(user => {
    if (filterConfig?.role !== 'all' && user?.role !== filterConfig?.role) return false;
    if (filterConfig?.status !== 'all' && user?.status !== filterConfig?.status) return false;
    if (filterConfig?.mfa !== 'all') {
      const mfaFilter = filterConfig?.mfa === 'enabled';
      if (user?.mfaEnabled !== mfaFilter) return false;
    }
    if (filterConfig?.department !== 'all' && user?.department !== filterConfig?.department) return false;
    return true;
  });

  const sortedUsers = [...filteredUsers]?.sort((a, b) => {
    const aValue = a?.[sortConfig?.key];
    const bValue = b?.[sortConfig?.key];
    
    if (sortConfig?.direction === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedUsers?.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = sortedUsers?.slice(startIndex, startIndex + usersPerPage);

  const uniqueRoles = [...new Set(users.map(user => user.role))];
  const uniqueDepartments = [...new Set(users.map(user => user.department))];

  return (
    <div className="h-full bg-card flex flex-col">
      {/* Header with Filters */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">User Directory</h3>
          <div className="text-sm text-muted-foreground">
            {filteredUsers?.length} of {users?.length} users
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          <select
            value={filterConfig?.role}
            onChange={(e) => setFilterConfig(prev => ({ ...prev, role: e?.target?.value }))}
            className="px-3 py-2 bg-muted border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Roles</option>
            {uniqueRoles?.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>

          <select
            value={filterConfig?.status}
            onChange={(e) => setFilterConfig(prev => ({ ...prev, status: e?.target?.value }))}
            className="px-3 py-2 bg-muted border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>

          <select
            value={filterConfig?.mfa}
            onChange={(e) => setFilterConfig(prev => ({ ...prev, mfa: e?.target?.value }))}
            className="px-3 py-2 bg-muted border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All MFA</option>
            <option value="enabled">MFA Enabled</option>
            <option value="disabled">MFA Disabled</option>
          </select>

          <select
            value={filterConfig?.department}
            onChange={(e) => setFilterConfig(prev => ({ ...prev, department: e?.target?.value }))}
            className="px-3 py-2 bg-muted border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Departments</option>
            {uniqueDepartments?.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        {/* Bulk Actions */}
        {selectedUsers?.size > 0 && (
          <div className="flex items-center space-x-2 p-3 bg-primary/10 rounded-lg">
            <span className="text-sm font-medium text-primary">
              {selectedUsers?.size} users selected
            </span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => onBulkAction('activate', selectedUsers)}>
                <Icon name="CheckCircle" size={14} className="mr-1" />
                Activate
              </Button>
              <Button variant="outline" size="sm" onClick={() => onBulkAction('deactivate', selectedUsers)}>
                <Icon name="XCircle" size={14} className="mr-1" />
                Deactivate
              </Button>
              <Button variant="outline" size="sm" onClick={() => onBulkAction('reset-password', selectedUsers)}>
                <Icon name="Key" size={14} className="mr-1" />
                Reset Password
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Data Grid */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="bg-muted/50 sticky top-0">
            <tr>
              <th className="w-12 p-3 text-left">
                <input
                  type="checkbox"
                  checked={isSelectAll}
                  onChange={handleSelectAll}
                  className="rounded border-border"
                />
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>User</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('role')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Role</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Status</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="p-3 text-left">
                <button
                  onClick={() => handleSort('lastLogin')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Last Login</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="p-3 text-left text-sm font-medium text-foreground">MFA</th>
              <th className="p-3 text-left text-sm font-medium text-foreground">Permissions</th>
              <th className="p-3 text-left text-sm font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers?.map((user) => (
              <tr
                key={user?.id}
                className={`border-b border-border hover:bg-muted/50 cursor-pointer ${
                  selectedUserId === user?.id ? 'bg-primary/5' : ''
                }`}
                onClick={() => onUserSelect(user)}
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedUsers?.has(user?.id)}
                    onChange={() => handleUserSelection(user?.id)}
                    onClick={(e) => e?.stopPropagation()}
                    className="rounded border-border"
                  />
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="User" size={14} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{user?.name}</div>
                      <div className="text-xs text-muted-foreground">{user?.email}</div>
                    </div>
                    {user?.sessionActive && (
                      <div className="w-2 h-2 bg-success rounded-full" title="Active Session" />
                    )}
                  </div>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user?.role)}`}>
                    {user?.role}
                  </span>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(user?.status)}`}>
                    {user?.status}
                  </span>
                </td>
                <td className="p-3">
                  <div className="text-sm text-foreground">{formatLastLogin(user?.lastLogin)}</div>
                  <div className="text-xs text-muted-foreground">{user?.loginCount} logins</div>
                </td>
                <td className="p-3">
                  {user?.mfaEnabled ? (
                    <Icon name="Shield" size={16} className="text-success" />
                  ) : (
                    <Icon name="ShieldOff" size={16} className="text-error" />
                  )}
                </td>
                <td className="p-3">
                  <div className="flex space-x-1">
                    {user?.permissions?.map(permission => (
                      <span
                        key={permission}
                        className="px-1.5 py-0.5 bg-muted text-xs rounded capitalize"
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon" onClick={(e) => e?.stopPropagation()}>
                      <Icon name="Edit" size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={(e) => e?.stopPropagation()}>
                      <Icon name="MoreHorizontal" size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="p-4 border-t border-border flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1}-{Math.min(startIndex + usersPerPage, sortedUsers?.length)} of {sortedUsers?.length}
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            <Icon name="ChevronLeft" size={14} />
          </Button>
          <span className="px-3 py-1 text-sm text-foreground">
            {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            <Icon name="ChevronRight" size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserDataGrid;