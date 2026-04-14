import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import DocumentEditor from './components/DocumentEditor';
import ClauseLibrary from './components/ClauseLibrary';
import ApprovalWorkflow from './components/ApprovalWorkflow';
import ContractMetadata from './components/ContractMetadata';
import ActivityTimeline from './components/ActivityTimeline';
import VersionComparison from './components/VersionComparison';

const ContractEditor = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('editor');
  const [documentContent, setDocumentContent] = useState(`
    <h1>SERVICE AGREEMENT</h1>
    <p>This Service Agreement ("Agreement") is entered into on September 4, 2024, between ContractFlow Pro Inc. ("Company") and Vendor Solutions LLC ("Vendor").</p>
    
    <h2>1. SERVICES</h2>
    <p>Vendor shall provide consulting services as described in Exhibit A attached hereto and incorporated by reference.</p>
    
    <h2>2. PAYMENT TERMS</h2>
    <p>Payment shall be made within thirty (30) days of invoice receipt. Late payments shall incur a service charge of 1.5% per month.</p>
    
    <h2>3. TERM</h2>
    <p>This Agreement shall commence on September 1, 2024 and continue for a period of twelve (12) months.</p>
  `);
  
  const [contractMetadata, setContractMetadata] = useState({
    title: 'Vendor Solutions Service Agreement',
    contractType: 'service-agreement',
    vendor: 'Vendor Solutions LLC',
    value: '45000',
    currency: 'USD',
    startDate: '2024-09-01',
    endDate: '2025-08-31',
    renewalTerms: 'Auto-renew for 1 year',
    department: 'procurement',
    owner: 'John Doe',
    priority: 'medium',
    status: 'draft',
    tags: ['consulting', 'annual', 'standard'],
    description: 'Standard consulting services agreement with Vendor Solutions LLC for business process optimization services.'
  });

  const [approvalWorkflow, setApprovalWorkflow] = useState({
    name: 'Standard Contract Approval',
    type: 'sequential',
    steps: [
      { id: 1, name: 'Legal Review', approver: 'john.doe', type: 'review', required: true, timeout: 2 },
      { id: 2, name: 'Finance Approval', approver: 'sarah.smith', type: 'approval', required: true, timeout: 3 },
      { id: 3, name: 'Department Head Sign-off', approver: 'lisa.brown', type: 'approval', required: true, timeout: 2 }
    ],
    conditions: [],
    notifications: true,
    escalation: true
  });

  const [comments, setComments] = useState([]);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(new Date());

  const activeUsers = [
    { id: 1, name: 'John Doe', initials: 'JD', color: '#3B82F6' },
    { id: 2, name: 'Sarah Smith', initials: 'SS', color: '#10B981' },
    { id: 3, name: 'Mike Johnson', initials: 'MJ', color: '#F59E0B' }
  ];

  const tabs = [
    { id: 'editor', label: 'Document Editor', icon: 'Edit3' },
    { id: 'metadata', label: 'Contract Details', icon: 'FileText' },
    { id: 'clauses', label: 'Clause Library', icon: 'Database' },
    { id: 'workflow', label: 'Approval Workflow', icon: 'GitBranch' },
    { id: 'timeline', label: 'Activity Timeline', icon: 'Clock' },
    { id: 'versions', label: 'Version Compare', icon: 'GitCompare' }
  ];

  // Auto-save functionality
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      setIsAutoSaving(true);
      // Simulate auto-save
      setTimeout(() => {
        setIsAutoSaving(false);
        setLastSaved(new Date());
      }, 1000);
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e?.ctrlKey || e?.metaKey) {
        switch (e?.key) {
          case 's':
            e?.preventDefault();
            handleSaveDocument();
            break;
          case 'p':
            e?.preventDefault();
            handlePreviewDocument();
            break;
          case 'e':
            e?.preventDefault();
            handleExportDocument();
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleDocumentChange = (content) => {
    setDocumentContent(content);
  };

  const handleAddComment = (comment) => {
    setComments(prev => [...prev, comment]);
  };

  const handleMetadataChange = (metadata) => {
    setContractMetadata(metadata);
  };

  const handleWorkflowChange = (workflow) => {
    setApprovalWorkflow(workflow);
  };

  const handleInsertClause = (clause) => {
    const clauseHtml = `<div class="clause-insertion"><h3>${clause?.title}</h3><p>${clause?.content}</p></div>`;
    setDocumentContent(prev => prev + '\n' + clauseHtml);
    setActiveTab('editor');
  };

  const handleSaveDocument = () => {
    console.log('Saving document...', {
      content: documentContent,
      metadata: contractMetadata,
      workflow: approvalWorkflow
    });
    setLastSaved(new Date());
  };

  const handlePreviewDocument = () => {
    console.log('Opening document preview...');
  };

  const handleExportDocument = () => {
    console.log('Exporting document...');
  };

  const handleSendForApproval = () => {
    console.log('Sending for approval...', approvalWorkflow);
  };

  const handleSaveMetadata = (metadata) => {
    setContractMetadata(metadata);
    console.log('Metadata saved:', metadata);
  };

  const handleSaveWorkflow = (workflow) => {
    setApprovalWorkflow(workflow);
    console.log('Workflow saved:', workflow);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'editor':
        return (
          <DocumentEditor
            content={documentContent}
            onChange={handleDocumentChange}
            activeUsers={activeUsers}
            comments={comments}
            onAddComment={handleAddComment}
            trackChanges={true}
          />
        );
      case 'metadata':
        return (
          <ContractMetadata
            metadata={contractMetadata}
            onChange={handleMetadataChange}
            onSave={handleSaveMetadata}
          />
        );
      case 'clauses':
        return (
          <ClauseLibrary
            onInsertClause={handleInsertClause}
          />
        );
      case 'workflow':
        return (
          <ApprovalWorkflow
            workflow={approvalWorkflow}
            onChange={handleWorkflowChange}
            onSave={handleSaveWorkflow}
          />
        );
      case 'timeline':
        return (
          <ActivityTimeline />
        );
      case 'versions':
        return (
          <VersionComparison
            onAcceptChange={() => {}}
            onRejectChange={() => {}}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Contract Editor - ContractFlow Pro</title>
        <meta name="description" content="Advanced contract editing suite with AI-powered assistance, clause library, collaborative editing, version control, and workflow automation." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="h-[calc(100vh-4rem)] flex flex-col">
            {/* Top Action Bar */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-surface">
              <div className="flex items-center space-x-4">
                <div>
                  <h1 className="text-xl font-semibold text-text-primary">
                    {contractMetadata?.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                    <span>Status: {contractMetadata?.status}</span>
                    <span>•</span>
                    <span>Owner: {contractMetadata?.owner}</span>
                    <span>•</span>
                    <span className={`flex items-center space-x-1 ${isAutoSaving ? 'text-warning' : 'text-success'}`}>
                      <Icon name={isAutoSaving ? 'Loader2' : 'Check'} size={14} className={isAutoSaving ? 'animate-spin' : ''} />
                      <span>{isAutoSaving ? 'Saving...' : `Saved ${lastSaved?.toLocaleTimeString()}`}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviewDocument}
                  iconName="Eye"
                  iconPosition="left"
                >
                  Preview
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportDocument}
                  iconName="Download"
                  iconPosition="left"
                >
                  Export
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleSaveDocument}
                  iconName="Save"
                  iconPosition="left"
                >
                  Save (Ctrl+S)
                </Button>
                <Button
                  variant="success"
                  size="sm"
                  onClick={handleSendForApproval}
                  iconName="Send"
                  iconPosition="left"
                >
                  Send for Approval
                </Button>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center space-x-1 p-4 border-b border-border bg-muted/30">
              {tabs?.map(tab => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-smooth ${
                    activeTab === tab?.id
                      ? 'bg-surface text-text-primary shadow-soft border border-border'
                      : 'text-muted-foreground hover:text-text-primary hover:bg-muted'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-4 overflow-hidden">
              {renderTabContent()}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ContractEditor;