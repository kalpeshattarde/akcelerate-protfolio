import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';

import WorkflowCanvas from './components/WorkflowCanvas';
import ComponentPalette from './components/ComponentPalette';
import WorkflowProperties from './components/WorkflowProperties';
import ActiveWorkflowMonitor from './components/ActiveWorkflowMonitor';
import BulkApprovalInterface from './components/BulkApprovalInterface';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ApprovalWorkflows = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('designer');
  const [selectedNode, setSelectedNode] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [workflow, setWorkflow] = useState({
    id: 'wf-new',
    name: 'New Workflow',
    description: '',
    nodes: [
      {
        id: 'start-1',
        type: 'start',
        label: 'Start',
        position: { x: 100, y: 200 },
        properties: {}
      },
      {
        id: 'approval-1',
        type: 'approval',
        label: 'Manager Approval',
        position: { x: 300, y: 200 },
        properties: {
          approver: 'john.doe',
          timeout: '24',
          requireComments: false
        }
      },
      {
        id: 'decision-1',
        type: 'decision',
        label: 'Amount Check',
        position: { x: 500, y: 200 },
        properties: {
          conditionType: 'amount_greater',
          threshold: '10000'
        }
      },
      {
        id: 'approval-2',
        type: 'approval',
        label: 'Finance Approval',
        position: { x: 700, y: 150 },
        properties: {
          approver: 'sarah.wilson',
          timeout: '48'
        }
      },
      {
        id: 'notification-1',
        type: 'notification',
        label: 'Notify Requestor',
        position: { x: 700, y: 250 },
        properties: {
          notificationType: 'email',
          recipients: ['requestor']
        }
      },
      {
        id: 'end-1',
        type: 'end',
        label: 'End',
        position: { x: 900, y: 200 },
        properties: {}
      }
    ],
    connections: [
      { from: 'start-1', to: 'approval-1' },
      { from: 'approval-1', to: 'decision-1' },
      { from: 'decision-1', to: 'approval-2', label: 'Yes' },
      { from: 'decision-1', to: 'notification-1', label: 'No' },
      { from: 'approval-2', to: 'end-1' },
      { from: 'notification-1', to: 'end-1' }
    ],
    properties: {
      active: true,
      priority: 1,
      contractTypes: ['service', 'purchase'],
      triggers: {
        newContract: true,
        modification: false,
        renewal: false
      }
    }
  });

  const views = [
    { id: 'designer', label: 'Workflow Designer', icon: 'GitBranch' },
    { id: 'monitor', label: 'Active Workflows', icon: 'Activity' },
    { id: 'bulk', label: 'Bulk Approval', icon: 'CheckSquare' }
  ];

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNodeSelect = useCallback((node) => {
    setSelectedNode(node);
  }, []);

  const handleNodeMove = useCallback((nodeId, position) => {
    setWorkflow(prev => ({
      ...prev,
      nodes: prev?.nodes?.map(node =>
        node?.id === nodeId ? { ...node, position } : node
      )
    }));
  }, []);

  const handleNodeUpdate = useCallback((nodeId, updatedNode) => {
    setWorkflow(prev => ({
      ...prev,
      nodes: prev?.nodes?.map(node =>
        node?.id === nodeId ? updatedNode : node
      )
    }));
  }, []);

  const handleNodeConnect = useCallback((fromId, toId) => {
    setWorkflow(prev => ({
      ...prev,
      connections: [...prev?.connections, { from: fromId, to: toId }]
    }));
  }, []);

  const handleCanvasClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const handleAddNode = useCallback((nodeType) => {
    const newNode = {
      id: `${nodeType?.id}-${Date.now()}`,
      type: nodeType?.id,
      label: nodeType?.label,
      position: { x: 400, y: 300 },
      properties: {}
    };
    
    setWorkflow(prev => ({
      ...prev,
      nodes: [...prev?.nodes, newNode]
    }));
  }, []);

  const handleTemplateSelect = useCallback((template) => {
    // In a real app, this would load the template configuration
    console.log('Loading template:', template);
    // For now, just show a notification
    alert(`Loading template: ${template?.name}`);
  }, []);

  const handleWorkflowSelect = useCallback((selectedWorkflow) => {
    console.log('Selected workflow:', selectedWorkflow);
    // In a real app, this would open the workflow details
  }, []);

  const handleApprovalAction = useCallback((actionData) => {
    console.log('Bulk approval action:', actionData);
    // In a real app, this would process the bulk action
    alert(`Processing ${actionData?.action} for ${actionData?.items?.length} items`);
  }, []);

  const handleWorkflowUpdate = useCallback((updatedWorkflow) => {
    setWorkflow(updatedWorkflow);
  }, []);

  const handleSaveWorkflow = () => {
    console.log('Saving workflow:', workflow);
    alert('Workflow saved successfully!');
  };

  const handlePublishWorkflow = () => {
    console.log('Publishing workflow:', workflow);
    alert('Workflow published and activated!');
  };

  const renderDesignerView = () => (
    <div className="flex h-full">
      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Canvas Toolbar */}
        <div className="h-14 bg-surface border-b border-border flex items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <h3 className="font-semibold text-text-primary">{workflow?.name}</h3>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Icon name="Undo" size={16} className="mr-2" />
                Undo
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="Redo" size={16} className="mr-2" />
                Redo
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleSaveWorkflow}>
              <Icon name="Save" size={16} className="mr-2" />
              Save Draft
            </Button>
            <Button size="sm" onClick={handlePublishWorkflow}>
              <Icon name="Play" size={16} className="mr-2" />
              Publish
            </Button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1">
          <WorkflowCanvas
            workflow={workflow}
            onNodeSelect={handleNodeSelect}
            selectedNode={selectedNode}
            onNodeMove={handleNodeMove}
            onNodeConnect={handleNodeConnect}
            onCanvasClick={handleCanvasClick}
            zoom={zoom}
            onZoomChange={setZoom}
          />
        </div>
      </div>

      {/* Component Palette */}
      <div className="w-80">
        <ComponentPalette
          onAddNode={handleAddNode}
          onTemplateSelect={handleTemplateSelect}
        />
      </div>

      {/* Properties Panel */}
      <div className="w-80">
        <WorkflowProperties
          selectedNode={selectedNode}
          onNodeUpdate={handleNodeUpdate}
          workflow={workflow}
          onWorkflowUpdate={handleWorkflowUpdate}
        />
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Approval Workflows - ContractFlow Pro</title>
        <meta name="description" content="Visual workflow designer with drag-and-drop interface, approval routing, and automated workflow execution." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="h-[calc(100vh-4rem)]">
            {/* View Selector */}
            <div className="h-14 bg-surface border-b border-border flex items-center px-6">
              <div className="flex space-x-1 bg-muted rounded-lg p-1">
                {views?.map((view) => (
                  <button
                    key={view?.id}
                    onClick={() => setActiveView(view?.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
                      activeView === view?.id
                        ? 'bg-surface text-text-primary shadow-soft'
                        : 'text-muted-foreground hover:text-text-primary'
                    }`}
                  >
                    <Icon name={view?.icon} size={16} />
                    <span>{view?.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* View Content */}
            <div className="h-[calc(100%-3.5rem)]">
              {activeView === 'designer' && renderDesignerView()}
              {activeView === 'monitor' && (
                <ActiveWorkflowMonitor onWorkflowSelect={handleWorkflowSelect} />
              )}
              {activeView === 'bulk' && (
                <BulkApprovalInterface onApprovalAction={handleApprovalAction} />
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ApprovalWorkflows;