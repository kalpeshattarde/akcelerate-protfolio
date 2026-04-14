import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AssessmentPeriodManager = ({ 
  periods = [], 
  currentPeriod = null,
  onPeriodCreate,
  onPeriodUpdate,
  onPeriodDelete,
  onPeriodSelect,
  className = ""
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPeriod, setEditingPeriod] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'draft'
  });

  const statusOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'archived', label: 'Archived' }
  ];

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (editingPeriod) {
      onPeriodUpdate({ ...editingPeriod, ...formData });
      setEditingPeriod(null);
    } else {
      onPeriodCreate({
        ...formData,
        id: Date.now()?.toString(),
        createdAt: new Date()?.toISOString(),
        topicsCount: 0
      });
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      status: 'draft'
    });
    setShowCreateForm(false);
    setEditingPeriod(null);
  };

  const handleEdit = (period) => {
    setEditingPeriod(period);
    setFormData({
      name: period?.name,
      description: period?.description || '',
      startDate: period?.startDate || '',
      endDate: period?.endDate || '',
      status: period?.status
    });
    setShowCreateForm(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'completed': return 'text-primary bg-primary/10';
      case 'archived': return 'text-muted-foreground bg-muted/50';
      default: return 'text-warning bg-warning/10';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'Play';
      case 'completed': return 'CheckCircle';
      case 'archived': return 'Archive';
      default: return 'Edit';
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-card ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Calendar" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Assessment Periods</h3>
            <p className="text-sm text-muted-foreground">
              Manage materiality assessment timeframes
            </p>
          </div>
        </div>
        <Button
          variant="default"
          size="sm"
          onClick={() => setShowCreateForm(true)}
        >
          <Icon name="Plus" size={14} />
          New Period
        </Button>
      </div>
      {/* Current Period Info */}
      {currentPeriod && (
        <div className="p-4 bg-primary/5 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Clock" size={16} className="text-primary" />
              <div>
                <span className="text-sm font-medium text-foreground">Current Period: </span>
                <span className="text-sm text-foreground">{currentPeriod?.name}</span>
              </div>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(currentPeriod?.status)}`}>
              {currentPeriod?.status}
            </div>
          </div>
          {currentPeriod?.description && (
            <p className="text-sm text-muted-foreground mt-2">{currentPeriod?.description}</p>
          )}
        </div>
      )}
      {/* Create/Edit Form */}
      {showCreateForm && (
        <div className="p-4 border-b border-border bg-muted/30">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-foreground">
                {editingPeriod ? 'Edit Period' : 'Create New Period'}
              </h4>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={resetForm}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Period Name"
                type="text"
                value={formData?.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e?.target?.value }))}
                placeholder="e.g., Q4 2024 Assessment"
                required
              />

              <Select
                label="Status"
                options={statusOptions}
                value={formData?.status}
                onChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
              />

              <Input
                label="Start Date"
                type="date"
                value={formData?.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e?.target?.value }))}
              />

              <Input
                label="End Date"
                type="date"
                value={formData?.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e?.target?.value }))}
              />
            </div>

            <Input
              label="Description"
              type="text"
              value={formData?.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e?.target?.value }))}
              placeholder="Optional description"
            />

            <div className="flex space-x-3">
              <Button type="submit" variant="default">
                {editingPeriod ? 'Update Period' : 'Create Period'}
              </Button>
              <Button type="button" variant="ghost" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}
      {/* Periods List */}
      <div className="p-4">
        <div className="space-y-3">
          {periods?.map((period) => (
            <div
              key={period?.id}
              className={`p-4 rounded-lg border transition-all duration-150 hover:shadow-sm cursor-pointer ${
                currentPeriod?.id === period?.id
                  ? 'border-primary bg-primary/5' :'border-border bg-background hover:bg-muted/30'
              }`}
              onClick={() => onPeriodSelect(period)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={getStatusIcon(period?.status)} 
                    size={16} 
                    className={period?.status === 'active' ? 'text-success' : 'text-muted-foreground'}
                  />
                  <div>
                    <h5 className="font-medium text-foreground">{period?.name}</h5>
                    {period?.description && (
                      <p className="text-sm text-muted-foreground">{period?.description}</p>
                    )}
                    <div className="flex items-center space-x-4 mt-1">
                      {period?.startDate && (
                        <span className="text-xs text-muted-foreground">
                          {new Date(period.startDate)?.toLocaleDateString()} - {' '}
                          {period?.endDate ? new Date(period.endDate)?.toLocaleDateString() : 'Ongoing'}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {period?.topicsCount || 0} topics
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(period?.status)}`}>
                    {period?.status}
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e?.stopPropagation();
                        handleEdit(period);
                      }}
                    >
                      <Icon name="Edit" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onPeriodDelete(period?.id);
                      }}
                    >
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {periods?.length === 0 && (
            <div className="text-center py-8">
              <Icon name="Calendar" size={32} className="mx-auto mb-2 text-muted-foreground opacity-50" />
              <p className="text-sm text-muted-foreground">No assessment periods created yet</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCreateForm(true)}
                className="mt-2"
              >
                Create your first period
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentPeriodManager;