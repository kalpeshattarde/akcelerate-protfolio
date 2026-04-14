import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const NewPOModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    supplier: '',
    amount: '',
    dueDate: '',
    priority: 'medium',
    items: '',
    description: '',
    assignee: 'John Smith'
  });

  const [errors, setErrors] = useState({});

  const supplierOptions = [
    'TechCorp Solutions',
    'Office Supplies Inc',
    'Industrial Equipment Co',
    'Global Manufacturing',
    'Software Licensing Ltd',
    'Construction Materials',
    'Medical Supplies Pro',
    'IT Hardware Direct',
    'Facility Services Group',
    'Catering Solutions'
  ];

  const assigneeOptions = [
    'John Smith',
    'Sarah Johnson',
    'Mike Wilson',
    'Lisa Chen',
    'Tom Anderson',
    'Robert Taylor',
    'Emily White',
    'Chris Martinez',
    'Amanda Garcia',
    'Kevin Rodriguez'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.supplier) newErrors.supplier = 'Supplier is required';
    if (!formData.amount) newErrors.amount = 'Amount is required';
    if (formData.amount && (isNaN(formData.amount) || parseFloat(formData.amount) <= 0)) {
      newErrors.amount = 'Amount must be a valid positive number';
    }
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
    if (!formData.items) newErrors.items = 'Number of items is required';
    if (formData.items && (isNaN(formData.items) || parseInt(formData.items) <= 0)) {
      newErrors.items = 'Items must be a valid positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const newPO = {
      id: `PO-2024-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      supplier: formData.supplier,
      amount: parseFloat(formData.amount),
      dueDate: formData.dueDate,
      priority: formData.priority,
      items: parseInt(formData.items),
      lastUpdated: new Date().toISOString(),
      assignee: formData.assignee,
      description: formData.description
    };

    onSubmit(newPO);
    
    // Reset form
    setFormData({
      supplier: '',
      amount: '',
      dueDate: '',
      priority: 'medium',
      items: '',
      description: '',
      assignee: 'John Smith'
    });
    setErrors({});
  };

  const handleClose = () => {
    setFormData({
      supplier: '',
      amount: '',
      dueDate: '',
      priority: 'medium',
      items: '',
      description: '',
      assignee: 'John Smith'
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-modal p-4">
      <div className="bg-surface rounded-card w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-heading-semibold text-text-primary">Create New Purchase Order</h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-button hover:bg-secondary-100 transition-smooth"
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Supplier */}
            <div className="md:col-span-2">
              <label className="block text-sm font-body-medium text-text-primary mb-2">
                Supplier *
              </label>
              <select
                value={formData.supplier}
                onChange={(e) => handleInputChange('supplier', e.target.value)}
                className={`w-full px-3 py-2 border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth ${
                  errors.supplier ? 'border-error' : 'border-border'
                }`}
              >
                <option value="">Select a supplier</option>
                {supplierOptions.map(supplier => (
                  <option key={supplier} value={supplier}>{supplier}</option>
                ))}
              </select>
              {errors.supplier && (
                <p className="mt-1 text-sm text-error">{errors.supplier}</p>
              )}
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-body-medium text-text-primary mb-2">
                Amount (USD) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  placeholder="0.00"
                  className={`w-full pl-8 pr-3 py-2 border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth ${
                    errors.amount ? 'border-error' : 'border-border'
                  }`}
                />
              </div>
              {errors.amount && (
                <p className="mt-1 text-sm text-error">{errors.amount}</p>
              )}
            </div>

            {/* Items Count */}
            <div>
              <label className="block text-sm font-body-medium text-text-primary mb-2">
                Number of Items *
              </label>
              <input
                type="number"
                min="1"
                value={formData.items}
                onChange={(e) => handleInputChange('items', e.target.value)}
                placeholder="1"
                className={`w-full px-3 py-2 border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth ${
                  errors.items ? 'border-error' : 'border-border'
                }`}
              />
              {errors.items && (
                <p className="mt-1 text-sm text-error">{errors.items}</p>
              )}
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-body-medium text-text-primary mb-2">
                Due Date *
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleInputChange('dueDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full px-3 py-2 border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth ${
                  errors.dueDate ? 'border-error' : 'border-border'
                }`}
              />
              {errors.dueDate && (
                <p className="mt-1 text-sm text-error">{errors.dueDate}</p>
              )}
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-body-medium text-text-primary mb-2">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => handleInputChange('priority', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            {/* Assignee */}
            <div className="md:col-span-2">
              <label className="block text-sm font-body-medium text-text-primary mb-2">
                Assignee
              </label>
              <select
                value={formData.assignee}
                onChange={(e) => handleInputChange('assignee', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
              >
                {assigneeOptions.map(assignee => (
                  <option key={assignee} value={assignee}>{assignee}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-body-medium text-text-primary mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Brief description of the purchase order..."
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth resize-none"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-border">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border border-border rounded-button hover:bg-secondary-100 transition-smooth text-text-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded-button hover:bg-primary-700 transition-smooth flex items-center space-x-2"
            >
              <Icon name="Plus" size={18} />
              <span>Create Purchase Order</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPOModal;