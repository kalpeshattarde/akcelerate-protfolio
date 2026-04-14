import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const UserTableRow = ({ user, isSelected, onSelect, onEdit, onDeactivate, onViewDetails }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-success/10 text-success', label: 'Active' },
      inactive: { color: 'bg-error/10 text-error', label: 'Inactive' },
      pending: { color: 'bg-warning/10 text-warning', label: 'Pending' },
      suspended: { color: 'bg-muted text-muted-foreground', label: 'Suspended' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.active;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const getRoleBadge = (role) => {
    const roleConfig = {
      admin: { color: 'bg-primary/10 text-primary', label: 'Admin' },
      moderator: { color: 'bg-accent/10 text-accent', label: 'Moderator' },
      user: { color: 'bg-muted text-muted-foreground', label: 'User' },
      guest: { color: 'bg-secondary/10 text-secondary', label: 'Guest' }
    };
    
    const config = roleConfig?.[role] || roleConfig?.user;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const formatLastLogin = (date) => {
    if (!date) return 'Never';
    const now = new Date();
    const loginDate = new Date(date);
    const diffInHours = Math.floor((now - loginDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return loginDate?.toLocaleDateString();
  };

  return (
    <>
      {/* Desktop Row */}
      <tr className="hidden lg:table-row border-b border-border hover:bg-muted/50 transition-micro">
        <td className="px-6 py-4">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(user?.id, e?.target?.checked)}
            className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
          />
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
              <Image
                src={user?.avatar}
                alt={user?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-medium text-foreground">{user?.name}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </td>
        <td className="px-6 py-4">
          {getRoleBadge(user?.role)}
        </td>
        <td className="px-6 py-4 text-sm text-foreground">{user?.department}</td>
        <td className="px-6 py-4 text-sm text-muted-foreground">{formatLastLogin(user?.lastLogin)}</td>
        <td className="px-6 py-4">
          {getStatusBadge(user?.status)}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onViewDetails(user)}
              className="w-8 h-8"
            >
              <Icon name="Eye" size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(user)}
              className="w-8 h-8"
            >
              <Icon name="Edit" size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDeactivate(user)}
              className="w-8 h-8 text-error hover:text-error"
            >
              <Icon name={user?.status === 'active' ? 'UserX' : 'UserCheck'} size={16} />
            </Button>
          </div>
        </td>
      </tr>
      {/* Mobile Card */}
      <div className="lg:hidden bg-surface border border-border rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => onSelect(user?.id, e?.target?.checked)}
              className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
            />
            <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
              <Image
                src={user?.avatar}
                alt={user?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-medium text-foreground">{user?.name}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-8 h-8"
          >
            <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
          </Button>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            {getRoleBadge(user?.role)}
            {getStatusBadge(user?.status)}
          </div>
        </div>

        {isExpanded && (
          <div className="space-y-3 pt-3 border-t border-border">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Department</p>
                <p className="text-foreground font-medium">{user?.department}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Last Login</p>
                <p className="text-foreground font-medium">{formatLastLogin(user?.lastLogin)}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewDetails(user)}
                className="flex-1"
              >
                <Icon name="Eye" size={16} className="mr-2" />
                View Details
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(user)}
                className="flex-1"
              >
                <Icon name="Edit" size={16} className="mr-2" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDeactivate(user)}
                className="text-error hover:text-error"
              >
                <Icon name={user?.status === 'active' ? 'UserX' : 'UserCheck'} size={16} />
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserTableRow;