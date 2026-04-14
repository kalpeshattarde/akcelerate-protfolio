import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Input from '../../../components/ui/Input';

const ComponentPalette = ({ onAddNode, onTemplateSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('nodes');

  const nodeTypes = [
    {
      id: 'start',
      label: 'Start',
      icon: 'Play',
      description: 'Workflow initiation point',
      category: 'control'
    },
    {
      id: 'approval',
      label: 'Approval',
      icon: 'CheckCircle',
      description: 'Single approver step',
      category: 'approval'
    },
    {
      id: 'multi-approval',
      label: 'Multi Approval',
      icon: 'Users',
      description: 'Multiple approvers required',
      category: 'approval'
    },
    {
      id: 'decision',
      label: 'Decision',
      icon: 'GitBranch',
      description: 'Conditional branching',
      category: 'logic'
    },
    {
      id: 'notification',
      label: 'Notification',
      icon: 'Bell',
      description: 'Send alerts or emails',
      category: 'communication'
    },
    {
      id: 'parallel',
      label: 'Parallel Split',
      icon: 'Split',
      description: 'Execute multiple paths',
      category: 'logic'
    },
    {
      id: 'merge',
      label: 'Merge',
      icon: 'Merge',
      description: 'Combine parallel paths',
      category: 'logic'
    },
    {
      id: 'timer',
      label: 'Timer',
      icon: 'Clock',
      description: 'Time-based delays',
      category: 'control'
    },
    {
      id: 'escalation',
      label: 'Escalation',
      icon: 'ArrowUp',
      description: 'Escalate to higher authority',
      category: 'approval'
    },
    {
      id: 'end',
      label: 'End',
      icon: 'Square',
      description: 'Workflow completion',
      category: 'control'
    }
  ];

  const templates = [
    {
      id: 'basic-approval',
      name: 'Basic Approval',
      description: 'Simple single-step approval workflow',
      icon: 'CheckCircle',
      nodes: 3,
      category: 'standard'
    },
    {
      id: 'multi-stage',
      name: 'Multi-Stage Approval',
      description: 'Sequential approval with multiple stages',
      icon: 'Users',
      nodes: 5,
      category: 'standard'
    },
    {
      id: 'financial-approval',
      name: 'Financial Approval',
      description: 'Dollar threshold-based routing',
      icon: 'DollarSign',
      nodes: 7,
      category: 'financial'
    },
    {
      id: 'legal-review',
      name: 'Legal Review',
      description: 'Legal team review with escalation',
      icon: 'Scale',
      nodes: 6,
      category: 'legal'
    },
    {
      id: 'vendor-approval',
      name: 'Vendor Approval',
      description: 'New vendor onboarding workflow',
      icon: 'Building2',
      nodes: 8,
      category: 'vendor'
    },
    {
      id: 'emergency-approval',
      name: 'Emergency Approval',
      description: 'Fast-track approval process',
      icon: 'Zap',
      nodes: 4,
      category: 'special'
    }
  ];

  const categories = [
    { id: 'nodes', label: 'Components', icon: 'Shapes' },
    { id: 'templates', label: 'Templates', icon: 'Layout' }
  ];

  const nodeCategories = [
    { id: 'all', label: 'All Components' },
    { id: 'control', label: 'Control Flow' },
    { id: 'approval', label: 'Approval' },
    { id: 'logic', label: 'Logic' },
    { id: 'communication', label: 'Communication' }
  ];

  const templateCategories = [
    { id: 'all', label: 'All Templates' },
    { id: 'standard', label: 'Standard' },
    { id: 'financial', label: 'Financial' },
    { id: 'legal', label: 'Legal' },
    { id: 'vendor', label: 'Vendor' },
    { id: 'special', label: 'Special' }
  ];

  const [selectedNodeCategory, setSelectedNodeCategory] = useState('all');
  const [selectedTemplateCategory, setSelectedTemplateCategory] = useState('all');

  const filteredNodes = nodeTypes?.filter(node => {
    const matchesSearch = node?.label?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         node?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesCategory = selectedNodeCategory === 'all' || node?.category === selectedNodeCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredTemplates = templates?.filter(template => {
    const matchesSearch = template?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         template?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesCategory = selectedTemplateCategory === 'all' || template?.category === selectedTemplateCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDragStart = (e, nodeType) => {
    e?.dataTransfer?.setData('application/json', JSON.stringify(nodeType));
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div className="w-full h-full bg-surface border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-text-primary mb-3">Workflow Builder</h2>
        
        {/* Search */}
        <Input
          type="search"
          placeholder="Search components..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
          className="mb-3"
        />
        
        {/* Category Tabs */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setActiveCategory(category?.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                activeCategory === category?.id
                  ? 'bg-surface text-text-primary shadow-soft'
                  : 'text-muted-foreground hover:text-text-primary'
              }`}
            >
              <Icon name={category?.icon} size={16} />
              <span>{category?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeCategory === 'nodes' && (
          <div className="p-4">
            {/* Node Categories */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {nodeCategories?.map((category) => (
                  <button
                    key={category?.id}
                    onClick={() => setSelectedNodeCategory(category?.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-smooth ${
                      selectedNodeCategory === category?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted-foreground hover:text-surface'
                    }`}
                  >
                    {category?.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Node Components */}
            <div className="space-y-2">
              {filteredNodes?.map((node) => (
                <div
                  key={node?.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, node)}
                  onClick={() => onAddNode(node)}
                  className="p-3 bg-background border border-border rounded-lg cursor-pointer hover:border-accent hover:shadow-soft transition-all duration-200 group"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-smooth">
                      <Icon name={node?.icon} size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-text-primary">{node?.label}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{node?.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeCategory === 'templates' && (
          <div className="p-4">
            {/* Template Categories */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {templateCategories?.map((category) => (
                  <button
                    key={category?.id}
                    onClick={() => setSelectedTemplateCategory(category?.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-smooth ${
                      selectedTemplateCategory === category?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted-foreground hover:text-surface'
                    }`}
                  >
                    {category?.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Template List */}
            <div className="space-y-3">
              {filteredTemplates?.map((template) => (
                <div
                  key={template?.id}
                  onClick={() => onTemplateSelect(template)}
                  className="p-4 bg-background border border-border rounded-lg cursor-pointer hover:border-accent hover:shadow-soft transition-all duration-200 group"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-smooth">
                      <Icon name={template?.icon} size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-medium text-text-primary">{template?.name}</h4>
                        <span className="text-xs text-muted-foreground">{template?.nodes} nodes</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{template?.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex items-center space-x-2">
            <Icon name="Info" size={12} />
            <span>Drag components to canvas</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="MousePointer" size={12} />
            <span>Click to add at center</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentPalette;