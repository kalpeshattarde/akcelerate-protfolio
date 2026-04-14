import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TopicDetailsDrawer = ({ 
  topic = null, 
  isOpen = false, 
  onClose,
  onTopicUpdate,
  isReadOnly = false,
  className = ""
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editedTopic, setEditedTopic] = useState(topic);

  React.useEffect(() => {
    setEditedTopic(topic);
    setIsEditing(false);
  }, [topic]);

  if (!isOpen || !topic) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'policies', label: 'Policies', icon: 'FileText' },
    { id: 'stakeholders', label: 'Stakeholders', icon: 'Users' },
    { id: 'history', label: 'History', icon: 'Clock' }
  ];

  const handleSave = () => {
    onTopicUpdate(editedTopic);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTopic(topic);
    setIsEditing(false);
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Basic Information */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">Basic Information</h4>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Title</label>
            {isEditing ? (
              <input
                type="text"
                value={editedTopic?.title || ''}
                onChange={(e) => setEditedTopic(prev => ({ ...prev, title: e?.target?.value }))}
                className="w-full mt-1 px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            ) : (
              <div className="mt-1 text-sm text-foreground">{topic?.title}</div>
            )}
          </div>
          
          <div>
            <label className="text-xs font-medium text-muted-foreground">Description</label>
            {isEditing ? (
              <textarea
                value={editedTopic?.description || ''}
                onChange={(e) => setEditedTopic(prev => ({ ...prev, description: e?.target?.value }))}
                rows={3}
                className="w-full mt-1 px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            ) : (
              <div className="mt-1 text-sm text-foreground">{topic?.description}</div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Impact Score</label>
              {isEditing ? (
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={editedTopic?.impact || 0}
                  onChange={(e) => setEditedTopic(prev => ({ ...prev, impact: parseFloat(e?.target?.value) }))}
                  className="w-full mt-1 px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              ) : (
                <div className="mt-1 text-sm text-foreground">{topic?.impact?.toFixed(1)}</div>
              )}
            </div>
            
            <div>
              <label className="text-xs font-medium text-muted-foreground">Importance Score</label>
              {isEditing ? (
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={editedTopic?.importance || 0}
                  onChange={(e) => setEditedTopic(prev => ({ ...prev, importance: parseFloat(e?.target?.value) }))}
                  className="w-full mt-1 px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              ) : (
                <div className="mt-1 text-sm text-foreground">{topic?.importance?.toFixed(1)}</div>
              )}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground">Category</label>
            <div className="mt-1 flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: topic?.category?.color }}
              />
              <span className="text-sm text-foreground">{topic?.category?.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Assessment */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">Risk Assessment</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
              <span className="text-sm font-medium text-foreground">Financial Risk</span>
            </div>
            <span className="text-sm text-foreground">{topic?.risks?.financial || 'Medium'}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Reputational Risk</span>
            </div>
            <span className="text-sm text-foreground">{topic?.risks?.reputational || 'High'}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Scale" size={16} className="text-secondary" />
              <span className="text-sm font-medium text-foreground">Regulatory Risk</span>
            </div>
            <span className="text-sm text-foreground">{topic?.risks?.regulatory || 'Low'}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPoliciesTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-foreground">Related Policies</h4>
        <Button variant="ghost" size="sm">
          <Icon name="Plus" size={14} />
          Add Policy
        </Button>
      </div>
      
      <div className="space-y-3">
        {topic?.policies?.map((policy, index) => (
          <div key={index} className="p-3 bg-muted rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h5 className="text-sm font-medium text-foreground">{policy?.title}</h5>
                <p className="text-xs text-muted-foreground mt-1">{policy?.description}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-xs text-muted-foreground">
                    Updated: {new Date(policy.lastUpdated)?.toLocaleDateString()}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    policy?.status === 'current' ? 'bg-success/10 text-success' :
                    policy?.status === 'draft'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                  }`}>
                    {policy?.status}
                  </span>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Icon name="ExternalLink" size={14} />
              </Button>
            </div>
          </div>
        )) || (
          <div className="text-center py-8">
            <Icon name="FileText" size={32} className="mx-auto mb-2 text-muted-foreground opacity-50" />
            <p className="text-sm text-muted-foreground">No policies linked yet</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderStakeholdersTab = () => (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-foreground">Stakeholder Feedback</h4>
      
      <div className="space-y-3">
        {topic?.stakeholderFeedback?.map((feedback, index) => (
          <div key={index} className="p-3 bg-muted rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-xs text-primary-foreground font-medium">
                    {feedback?.stakeholder?.charAt(0)}
                  </span>
                </div>
                <span className="text-sm font-medium text-foreground">{feedback?.stakeholder}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {new Date(feedback.date)?.toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm text-foreground">{feedback?.comment}</p>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-1">
                <span className="text-xs text-muted-foreground">Impact:</span>
                <span className="text-xs font-medium text-foreground">{feedback?.impactRating}/10</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-xs text-muted-foreground">Importance:</span>
                <span className="text-xs font-medium text-foreground">{feedback?.importanceRating}/10</span>
              </div>
            </div>
          </div>
        )) || (
          <div className="text-center py-8">
            <Icon name="Users" size={32} className="mx-auto mb-2 text-muted-foreground opacity-50" />
            <p className="text-sm text-muted-foreground">No stakeholder feedback yet</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderHistoryTab = () => (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-foreground">Position History</h4>
      
      <div className="space-y-3">
        {topic?.history?.map((entry, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
            <div className="w-2 h-2 bg-primary rounded-full mt-2" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{entry?.action}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(entry.timestamp)?.toLocaleDateString()}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{entry?.description}</p>
              {entry?.changes && (
                <div className="flex items-center space-x-4 mt-2 text-xs">
                  <span className="text-muted-foreground">
                    Impact: {entry?.changes?.oldImpact} → {entry?.changes?.newImpact}
                  </span>
                  <span className="text-muted-foreground">
                    Importance: {entry?.changes?.oldImportance} → {entry?.changes?.newImportance}
                  </span>
                </div>
              )}
            </div>
          </div>
        )) || (
          <div className="text-center py-8">
            <Icon name="Clock" size={32} className="mx-auto mb-2 text-muted-foreground opacity-50" />
            <p className="text-sm text-muted-foreground">No history available</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      {/* Drawer */}
      <div className={`fixed right-0 top-0 bottom-0 w-96 bg-card border-l border-border shadow-modal z-50 transform transition-transform duration-300 ${className}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: topic?.category?.color }}
            />
            <div>
              <h3 className="font-semibold text-foreground">{topic?.title}</h3>
              <p className="text-sm text-muted-foreground">{topic?.category?.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {!isReadOnly && (
              <Button
                variant={isEditing ? "default" : "ghost"}
                size="sm"
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              >
                <Icon name={isEditing ? "Check" : "Edit"} size={14} />
                {isEditing ? 'Save' : 'Edit'}
              </Button>
            )}
            {isEditing && (
              <Button variant="ghost" size="sm" onClick={handleCancel}>
                <Icon name="X" size={14} />
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={16} />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-3 py-3 text-sm font-medium transition-colors ${
                activeTab === tab?.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={14} />
              <span className="hidden sm:inline">{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'policies' && renderPoliciesTab()}
          {activeTab === 'stakeholders' && renderStakeholdersTab()}
          {activeTab === 'history' && renderHistoryTab()}
        </div>
      </div>
    </>
  );
};

export default TopicDetailsDrawer;