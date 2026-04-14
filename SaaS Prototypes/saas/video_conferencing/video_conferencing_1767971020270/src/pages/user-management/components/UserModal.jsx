import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const UserModal = ({ 
  isOpen, 
  onClose, 
  user = null, 
  mode = 'create', // 'create', 'edit', 'view'
  onSave 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    department: '',
    phone: '',
    status: 'active',
    permissions: []
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user && (mode === 'edit' || mode === 'view')) {
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        role: user?.role || 'user',
        department: user?.department || '',
        phone: user?.phone || '',
        status: user?.status || 'active',
        permissions: user?.permissions || []
      });
    } else {
      setFormData({
        name: '',
        email: '',
        role: 'user',
        department: '',
        phone: '',
        status: 'active',
        permissions: []
      });
    }
    setErrors({});
  }, [user, mode, isOpen]);

  const roleOptions = [
    { value: 'admin', label: 'Administrator' },
    { value: 'moderator', label: 'Moderator' },
    { value: 'user', label: 'User' },
    { value: 'guest', label: 'Guest' }
  ];

  const departmentOptions = [
    { value: '', label: 'Select an option' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' },
    { value: 'operations', label: 'Operations' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' },
    { value: 'suspended', label: 'Suspended' }
  ];

  const permissionOptions = [
    { id: 'create_meetings', label: 'Create Meetings', description: 'Can schedule and create new meetings' },
    { id: 'manage_recordings', label: 'Manage Recordings', description: 'Can view, download, and delete recordings' },
    { id: 'user_management', label: 'User Management', description: 'Can manage other users and permissions' },
    { id: 'analytics_access', label: 'Analytics Access', description: 'Can view usage analytics and reports' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handlePermissionChange = (permissionId, checked) => {
    setFormData(prev => ({
      ...prev,
      permissions: checked 
        ? [...(prev?.permissions || []), permissionId]
        : (prev?.permissions || [])?.filter(p => p !== permissionId)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.department) {
      newErrors.department = 'Department is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await onSave?.(formData);
      onClose?.();
    } catch (error) {
      console.error('Error saving user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getModalTitle = () => {
    switch (mode) {
      case 'create': return 'Add New User';
      case 'edit': return 'Edit User';
      case 'view': return 'User Details';
      default: return 'User';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 transition-opacity bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="inline-block w-full max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl border border-gray-200">
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">
              {getModalTitle()}
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="w-10 h-10 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              <Icon name="X" size={18} />
            </Button>
          </div>

          {/* Content */}
          <div className="px-8 py-8 max-h-[calc(100vh-200px)] overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* User Avatar (View/Edit mode) */}
              {(mode === 'edit' || mode === 'view') && user && (
                <div className="flex items-center space-x-6 p-6 bg-gray-50 rounded-lg">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                    <Image
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 text-lg">{user?.name}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Member since {new Date(user?.createdAt || Date.now())?.toLocaleDateString()}
                    </p>
                    {user?.lastLogin && (
                      <p className="text-sm text-gray-500">
                        Last login: {new Date(user.lastLogin)?.toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Basic Information Section */}
              <div className="space-y-8">
                <div className="pb-3 border-b border-gray-200">
                  <h4 className="text-lg font-medium text-gray-900">
                    Basic Information
                  </h4>
                </div>
                
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="min-w-0">
                    <Input
                      label="Full Name"
                      type="text"
                      value={formData?.name || ''}
                      onChange={(e) => handleInputChange('name', e?.target?.value)}
                      error={errors?.name}
                      required
                      disabled={mode === 'view'}
                      placeholder="Enter full name"
                    />
                  </div>

                  <div className="min-w-0">
                    <Input
                      label="Email Address"
                      type="email"
                      value={formData?.email || ''}
                      onChange={(e) => handleInputChange('email', e?.target?.value)}
                      error={errors?.email}
                      required
                      disabled={mode === 'view'}
                      placeholder="Enter email address"
                    />
                  </div>
                </div>

                {/* Role and Department Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="min-w-0">
                    <Select
                      label="Role"
                      options={roleOptions}
                      value={formData?.role || ''}
                      onChange={(value) => handleInputChange('role', value)}
                      required
                      disabled={mode === 'view'}
                      placeholder="Select role"
                    />
                  </div>

                  <div className="min-w-0">
                    <Select
                      label="Department"
                      options={departmentOptions}
                      value={formData?.department || ''}
                      onChange={(value) => handleInputChange('department', value)}
                      error={errors?.department}
                      required
                      disabled={mode === 'view'}
                      placeholder="Select an option"
                    />
                  </div>
                </div>

                {/* Phone and Status Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="min-w-0">
                    <Input
                      label="Phone Number"
                      type="tel"
                      value={formData?.phone || ''}
                      onChange={(e) => handleInputChange('phone', e?.target?.value)}
                      disabled={mode === 'view'}
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div className="min-w-0">
                    <Select
                      label="Status"
                      options={statusOptions}
                      value={formData?.status || ''}
                      onChange={(value) => handleInputChange('status', value)}
                      disabled={mode === 'view'}
                    />
                  </div>
                </div>
              </div>

              {/* Permissions Section */}
              <div className="space-y-6">
                <div className="pb-3 border-b border-gray-200">
                  <h4 className="text-lg font-medium text-gray-900">
                    Permissions
                  </h4>
                </div>
                
                {mode !== 'view' ? (
                  <div className="grid grid-cols-1 gap-6">
                    {permissionOptions?.map((permission) => (
                      <div key={permission?.id} className="p-5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <Checkbox
                          checked={formData?.permissions?.includes(permission?.id) || false}
                          onChange={(e) => handlePermissionChange(permission?.id, e?.target?.checked)}
                          label={permission?.label}
                          description={permission?.description}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {formData?.permissions?.map((permissionId) => {
                      const permission = permissionOptions?.find(p => p?.id === permissionId);
                      return permission ? (
                        <span
                          key={permissionId}
                          className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                        >
                          {permission?.label}
                        </span>
                      ) : null;
                    })}
                    {(!formData?.permissions || formData?.permissions?.length === 0) && (
                      <span className="text-sm text-gray-500 py-4">No permissions assigned</span>
                    )}
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-4 px-8 py-6 bg-gray-50 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="min-w-[100px]"
            >
              {mode === 'view' ? 'Close' : 'Cancel'}
            </Button>
            
            {mode !== 'view' && (
              <Button
                type="submit"
                onClick={handleSubmit}
                loading={isLoading}
                disabled={isLoading}
                className="min-w-[120px]"
              >
                {mode === 'create' ? 'Create User' : 'Save Changes'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;