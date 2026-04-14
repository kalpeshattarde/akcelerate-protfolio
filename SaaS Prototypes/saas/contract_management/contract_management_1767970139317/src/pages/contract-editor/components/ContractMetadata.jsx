import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ContractMetadata = ({ metadata, onChange, onSave }) => {
  const [formData, setFormData] = useState({
    title: metadata?.title || '',
    contractType: metadata?.contractType || '',
    vendor: metadata?.vendor || '',
    value: metadata?.value || '',
    currency: metadata?.currency || 'USD',
    startDate: metadata?.startDate || '',
    endDate: metadata?.endDate || '',
    renewalTerms: metadata?.renewalTerms || '',
    department: metadata?.department || '',
    owner: metadata?.owner || '',
    priority: metadata?.priority || 'medium',
    status: metadata?.status || 'draft',
    tags: metadata?.tags || [],
    description: metadata?.description || ''
  });

  const [newTag, setNewTag] = useState('');

  const contractTypes = [
    { value: 'service-agreement', label: 'Service Agreement' },
    { value: 'nda', label: 'Non-Disclosure Agreement' },
    { value: 'purchase-order', label: 'Purchase Order' },
    { value: 'master-service', label: 'Master Service Agreement' },
    { value: 'software-license', label: 'Software License' },
    { value: 'employment', label: 'Employment Contract' },
    { value: 'consulting', label: 'Consulting Agreement' },
    { value: 'partnership', label: 'Partnership Agreement' }
  ];

  const currencies = [
    { value: 'USD', label: 'US Dollar ($)' },
    { value: 'EUR', label: 'Euro (€)' },
    { value: 'GBP', label: 'British Pound (£)' },
    { value: 'CAD', label: 'Canadian Dollar (C$)' },
    { value: 'AUD', label: 'Australian Dollar (A$)' }
  ];

  const departments = [
    { value: 'legal', label: 'Legal' },
    { value: 'procurement', label: 'Procurement' },
    { value: 'finance', label: 'Finance' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'it', label: 'Information Technology' },
    { value: 'operations', label: 'Operations' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' }
  ];

  const priorities = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const statuses = [
    { value: 'draft', label: 'Draft' },
    { value: 'review', label: 'Under Review' },
    { value: 'approval', label: 'Pending Approval' },
    { value: 'negotiation', label: 'In Negotiation' },
    { value: 'execution', label: 'Ready for Execution' },
    { value: 'active', label: 'Active' },
    { value: 'expired', label: 'Expired' },
    { value: 'terminated', label: 'Terminated' }
  ];

  const handleInputChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onChange(updatedData);
  };

  const handleAddTag = () => {
    if (newTag?.trim() && !formData?.tags?.includes(newTag?.trim())) {
      const updatedTags = [...formData?.tags, newTag?.trim()];
      handleInputChange('tags', updatedTags);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = formData?.tags?.filter(tag => tag !== tagToRemove);
    handleInputChange('tags', updatedTags);
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      e?.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-primary">Contract Details</h3>
          <Button
            variant="default"
            size="sm"
            onClick={() => onSave(formData)}
            iconName="Save"
            iconPosition="left"
          >
            Save Metadata
          </Button>
        </div>
      </div>
      {/* Form Content */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {/* Basic Information */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-text-primary border-b border-border pb-2">
            Basic Information
          </h4>
          
          <Input
            label="Contract Title"
            type="text"
            value={formData?.title}
            onChange={(e) => handleInputChange('title', e?.target?.value)}
            placeholder="Enter contract title"
            required
          />

          <Select
            label="Contract Type"
            options={contractTypes}
            value={formData?.contractType}
            onChange={(value) => handleInputChange('contractType', value)}
            placeholder="Select contract type"
            required
          />

          <Input
            label="Vendor/Counterparty"
            type="text"
            value={formData?.vendor}
            onChange={(e) => handleInputChange('vendor', e?.target?.value)}
            placeholder="Enter vendor name"
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Contract Value"
              type="number"
              value={formData?.value}
              onChange={(e) => handleInputChange('value', e?.target?.value)}
              placeholder="0.00"
            />
            <Select
              label="Currency"
              options={currencies}
              value={formData?.currency}
              onChange={(value) => handleInputChange('currency', value)}
            />
          </div>
        </div>

        {/* Dates */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-text-primary border-b border-border pb-2">
            Contract Dates
          </h4>
          
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Start Date"
              type="date"
              value={formData?.startDate}
              onChange={(e) => handleInputChange('startDate', e?.target?.value)}
            />
            <Input
              label="End Date"
              type="date"
              value={formData?.endDate}
              onChange={(e) => handleInputChange('endDate', e?.target?.value)}
            />
          </div>

          <Input
            label="Renewal Terms"
            type="text"
            value={formData?.renewalTerms}
            onChange={(e) => handleInputChange('renewalTerms', e?.target?.value)}
            placeholder="e.g., Auto-renew for 1 year"
          />
        </div>

        {/* Assignment & Status */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-text-primary border-b border-border pb-2">
            Assignment & Status
          </h4>
          
          <Select
            label="Department"
            options={departments}
            value={formData?.department}
            onChange={(value) => handleInputChange('department', value)}
            placeholder="Select department"
          />

          <Input
            label="Contract Owner"
            type="text"
            value={formData?.owner}
            onChange={(e) => handleInputChange('owner', e?.target?.value)}
            placeholder="Enter owner name"
          />

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Priority"
              options={priorities}
              value={formData?.priority}
              onChange={(value) => handleInputChange('priority', value)}
            />
            <Select
              label="Status"
              options={statuses}
              value={formData?.status}
              onChange={(value) => handleInputChange('status', value)}
            />
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-text-primary border-b border-border pb-2">
            Tags & Labels
          </h4>
          
          <div className="flex space-x-2">
            <Input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e?.target?.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add tag..."
              className="flex-1"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddTag}
              disabled={!newTag?.trim()}
              iconName="Plus"
            >
              Add
            </Button>
          </div>

          {formData?.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData?.tags?.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-1 bg-accent/10 text-accent px-2 py-1 rounded-md text-sm"
                >
                  <span>{tag}</span>
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-error transition-smooth"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Description */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-text-primary border-b border-border pb-2">
            Description
          </h4>
          
          <textarea
            value={formData?.description}
            onChange={(e) => handleInputChange('description', e?.target?.value)}
            placeholder="Enter contract description or notes..."
            className="w-full h-24 p-3 text-sm border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>
    </div>
  );
};

export default ContractMetadata;