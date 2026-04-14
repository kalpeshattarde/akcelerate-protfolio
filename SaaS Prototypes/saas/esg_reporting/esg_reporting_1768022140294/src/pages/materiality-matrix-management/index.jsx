import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import NotificationCenter from '../../components/ui/NotificationCenter';
import ProgressStatusIndicator from '../../components/ui/ProgressStatusIndicator';
import QuickActionLauncher from '../../components/ui/QuickActionLauncher';
import TopicCategoryFilter from './components/TopicCategoryFilter';
import MaterialityMatrix from './components/MaterialityMatrix';
import TopicDetailsDrawer from './components/TopicDetailsDrawer';
import TopicBulkOperations from './components/TopicBulkOperations';
import AssessmentPeriodManager from './components/AssessmentPeriodManager';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const MaterialityMatrixManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [progressExpanded, setProgressExpanded] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedStakeholders, setSelectedStakeholders] = useState([]);
  const [currentView, setCurrentView] = useState(null);
  const [currentPeriod, setCurrentPeriod] = useState(null);
  const [showPeriodManager, setShowPeriodManager] = useState(false);
  const [userRole] = useState('esg-manager');

  // Mock data
  const [topics, setTopics] = useState([
    {
      id: 1,
      title: "Carbon Emissions Reduction",
      description: "Strategies and targets for reducing greenhouse gas emissions across operations",
      impact: 8.5,
      importance: 9.2,
      category: { id: 'env', name: 'Environmental', color: '#10B981' },
      risks: { financial: 'High', reputational: 'High', regulatory: 'High' },
      policies: [
        {
          title: "Carbon Neutrality Policy",
          description: "Company-wide commitment to achieve net-zero emissions by 2030",
          status: "current",
          lastUpdated: "2024-11-15T00:00:00Z"
        }
      ],
      stakeholderFeedback: [
        {
          stakeholder: "Environmental NGOs",
          comment: "Critical priority for climate action and regulatory compliance",
          impactRating: 9,
          importanceRating: 10,
          date: "2024-12-01T00:00:00Z"
        }
      ],
      history: [
        {
          action: "Position Updated",
          description: "Moved from medium to high priority based on stakeholder feedback",
          timestamp: "2024-11-20T00:00:00Z",
          changes: { oldImpact: 7.2, newImpact: 8.5, oldImportance: 8.1, newImportance: 9.2 }
        }
      ]
    },
    {
      id: 2,
      title: "Employee Diversity & Inclusion",
      description: "Promoting workplace diversity and creating inclusive environments",
      impact: 7.8,
      importance: 8.5,
      category: { id: 'social', name: 'Social', color: '#3B82F6' },
      risks: { financial: 'Medium', reputational: 'High', regulatory: 'Medium' },
      policies: [
        {
          title: "D&I Framework",
          description: "Comprehensive diversity and inclusion strategy",
          status: "current",
          lastUpdated: "2024-10-30T00:00:00Z"
        }
      ],
      stakeholderFeedback: [
        {
          stakeholder: "Employee Resource Groups",
          comment: "Essential for talent retention and company culture",
          impactRating: 8,
          importanceRating: 9,
          date: "2024-11-25T00:00:00Z"
        }
      ],
      history: []
    },
    {
      id: 3,
      title: "Board Independence",
      description: "Ensuring independent oversight and governance structures",
      impact: 6.5,
      importance: 7.8,
      category: { id: 'governance', name: 'Governance', color: '#8B5CF6' },
      risks: { financial: 'Medium', reputational: 'Medium', regulatory: 'High' },
      policies: [],
      stakeholderFeedback: [],
      history: []
    },
    {
      id: 4,
      title: "Water Conservation",
      description: "Efficient water usage and conservation initiatives",
      impact: 5.2,
      importance: 6.1,
      category: { id: 'env', name: 'Environmental', color: '#10B981' },
      risks: { financial: 'Low', reputational: 'Medium', regulatory: 'Low' },
      policies: [],
      stakeholderFeedback: [],
      history: []
    },
    {
      id: 5,
      title: "Supply Chain Ethics",
      description: "Ethical sourcing and supplier code of conduct",
      impact: 7.1,
      importance: 8.9,
      category: { id: 'social', name: 'Social', color: '#3B82F6' },
      risks: { financial: 'High', reputational: 'High', regulatory: 'Medium' },
      policies: [],
      stakeholderFeedback: [],
      history: []
    },
    {
      id: 6,
      title: "Executive Compensation",
      description: "Transparent and performance-linked executive pay structures",
      impact: 4.8,
      importance: 7.2,
      category: { id: 'governance', name: 'Governance', color: '#8B5CF6' },
      risks: { financial: 'Low', reputational: 'Medium', regulatory: 'Medium' },
      policies: [],
      stakeholderFeedback: [],
      history: []
    }
  ]);

  const [categories] = useState([
    { id: 'env', name: 'Environmental', color: '#10B981', count: 2 },
    { id: 'social', name: 'Social', color: '#3B82F6', count: 2 },
    { id: 'governance', name: 'Governance', color: '#8B5CF6', count: 2 },
    { id: 'economic', name: 'Economic', color: '#F59E0B', count: 0 }
  ]);

  const [stakeholderGroups] = useState([
    { id: 'investors', name: 'Investors', weight: 25 },
    { id: 'employees', name: 'Employees', weight: 20 },
    { id: 'customers', name: 'Customers', weight: 20 },
    { id: 'communities', name: 'Communities', weight: 15 },
    { id: 'regulators', name: 'Regulators', weight: 10 },
    { id: 'ngos', name: 'NGOs', weight: 10 }
  ]);

  const [savedViews, setSavedViews] = useState([
    {
      id: 1,
      name: 'High Priority Topics',
      categories: ['env', 'social'],
      stakeholders: ['investors', 'regulators'],
      timestamp: '2024-11-15T00:00:00Z'
    }
  ]);

  const [assessmentPeriods, setAssessmentPeriods] = useState([
    {
      id: 1,
      name: 'Q4 2024 Assessment',
      description: 'Annual materiality assessment for 2024 reporting',
      status: 'active',
      startDate: '2024-10-01',
      endDate: '2024-12-31',
      topicsCount: 6,
      createdAt: '2024-10-01T00:00:00Z'
    },
    {
      id: 2,
      name: 'Q1 2025 Planning',
      description: 'Forward-looking assessment for 2025 strategy',
      status: 'draft',
      startDate: '2025-01-01',
      endDate: '2025-03-31',
      topicsCount: 0,
      createdAt: '2024-11-01T00:00:00Z'
    }
  ]);

  const [notifications] = useState([
    {
      type: 'info',
      title: 'Assessment Period Updated',
      message: 'Q4 2024 Assessment period has been extended to December 31st',
      time: '10 minutes ago',
      read: false,
      category: 'system',
      priority: 'medium'
    },
    {
      type: 'warning',
      title: 'Stakeholder Input Pending',
      message: '3 stakeholder groups have not provided feedback for Carbon Emissions topic',
      time: '2 hours ago',
      read: false,
      category: 'data',
      priority: 'high'
    }
  ]);

  useEffect(() => {
    if (assessmentPeriods?.length > 0) {
      const activePeriod = assessmentPeriods?.find(p => p?.status === 'active') || assessmentPeriods?.[0];
      setCurrentPeriod(activePeriod);
    }
  }, [assessmentPeriods]);

  useEffect(() => {
    // Initialize with all categories selected
    setSelectedCategories(categories?.map(c => c?.id));
    setSelectedStakeholders(stakeholderGroups?.map(s => s?.id));
  }, [categories, stakeholderGroups]);

  const filteredTopics = topics?.filter(topic => {
    const categoryMatch = selectedCategories?.length === 0 || selectedCategories?.includes(topic?.category?.id);
    return categoryMatch;
  });

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setDrawerOpen(true);
  };

  const handleTopicMove = (topicId, newPosition) => {
    setTopics(prev => prev?.map(topic => 
      topic?.id === topicId 
        ? { ...topic, impact: newPosition?.impact, importance: newPosition?.importance }
        : topic
    ));
  };

  const handleTopicUpdate = (updatedTopic) => {
    setTopics(prev => prev?.map(topic => 
      topic?.id === updatedTopic?.id ? updatedTopic : topic
    ));
    setSelectedTopic(updatedTopic);
  };

  const handleBulkUpdate = (topicIds, updates) => {
    setTopics(prev => prev?.map(topic => 
      topicIds?.includes(topic?.id) ? { ...topic, ...updates } : topic
    ));
    setSelectedTopics([]);
  };

  const handleBulkDelete = (topicIds) => {
    setTopics(prev => prev?.filter(topic => !topicIds?.includes(topic?.id)));
    setSelectedTopics([]);
  };

  const handleBulkExport = (topicIds) => {
    const exportData = topics?.filter(topic => topicIds?.includes(topic?.id));
    console.log('Exporting topics:', exportData);
    // Implement export functionality
  };

  const handleSaveView = (viewData) => {
    const newView = {
      ...viewData,
      id: Date.now()
    };
    setSavedViews(prev => [...prev, newView]);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
    setSelectedCategories(view?.categories);
    setSelectedStakeholders(view?.stakeholders);
  };

  const handlePeriodCreate = (periodData) => {
    setAssessmentPeriods(prev => [...prev, periodData]);
  };

  const handlePeriodUpdate = (updatedPeriod) => {
    setAssessmentPeriods(prev => prev?.map(period => 
      period?.id === updatedPeriod?.id ? updatedPeriod : period
    ));
  };

  const handlePeriodDelete = (periodId) => {
    setAssessmentPeriods(prev => prev?.filter(period => period?.id !== periodId));
  };

  const handlePeriodSelect = (period) => {
    setCurrentPeriod(period);
  };

  return (
    <>
      <Helmet>
        <title>Materiality Matrix Management - ESG Dashboard Pro</title>
        <meta name="description" content="Interactive ESG topic prioritization tool for materiality assessments and stakeholder input documentation" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header 
          userRole={userRole}
          notifications={notifications}
        />

        {/* Sidebar */}
        <Sidebar 
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          userRole={userRole}
          currentDomain="operations"
        />

        {/* Main Content */}
        <main className={`pt-16 transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        }`}>
          <div className="p-6">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Materiality Matrix Management</h1>
                <p className="text-muted-foreground mt-1">
                  Interactive ESG topic prioritization and stakeholder assessment tool
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowPeriodManager(!showPeriodManager)}
                >
                  <Icon name="Calendar" size={16} />
                  Manage Periods
                </Button>
                <Button variant="default">
                  <Icon name="Download" size={16} />
                  Export Matrix
                </Button>
              </div>
            </div>

            {/* Assessment Period Manager */}
            {showPeriodManager && (
              <div className="mb-6">
                <AssessmentPeriodManager
                  periods={assessmentPeriods}
                  currentPeriod={currentPeriod}
                  onPeriodCreate={handlePeriodCreate}
                  onPeriodUpdate={handlePeriodUpdate}
                  onPeriodDelete={handlePeriodDelete}
                  onPeriodSelect={handlePeriodSelect}
                />
              </div>
            )}

            {/* Bulk Operations */}
            <div className="mb-6">
              <TopicBulkOperations
                selectedTopics={selectedTopics}
                onBulkUpdate={handleBulkUpdate}
                onBulkDelete={handleBulkDelete}
                onBulkExport={handleBulkExport}
                onClearSelection={() => setSelectedTopics([])}
                assessmentPeriods={assessmentPeriods}
                currentPeriod={currentPeriod}
                onPeriodChange={handlePeriodSelect}
              />
            </div>

            {/* Main Layout */}
            <div className="grid grid-cols-12 gap-6">
              {/* Left Sidebar - Filters */}
              <div className="col-span-12 lg:col-span-3">
                <div className="space-y-6">
                  <TopicCategoryFilter
                    categories={categories}
                    selectedCategories={selectedCategories}
                    onCategoryChange={setSelectedCategories}
                    stakeholderGroups={stakeholderGroups}
                    selectedStakeholders={selectedStakeholders}
                    onStakeholderChange={setSelectedStakeholders}
                    savedViews={savedViews}
                    currentView={currentView}
                    onViewChange={handleViewChange}
                    onSaveView={handleSaveView}
                  />

                  {/* Progress Indicator */}
                  <ProgressStatusIndicator
                    isCompact={!progressExpanded}
                    showDetails={progressExpanded}
                    onToggleDetails={() => setProgressExpanded(!progressExpanded)}
                  />
                </div>
              </div>

              {/* Center - Matrix */}
              <div className="col-span-12 lg:col-span-9">
                <MaterialityMatrix
                  topics={filteredTopics}
                  onTopicSelect={handleTopicSelect}
                  selectedTopic={selectedTopic}
                  onTopicMove={handleTopicMove}
                  isReadOnly={userRole === 'viewer'}
                  showGrid={true}
                />
              </div>
            </div>
          </div>
        </main>

        {/* Topic Details Drawer */}
        <TopicDetailsDrawer
          topic={selectedTopic}
          isOpen={drawerOpen}
          onClose={() => {
            setDrawerOpen(false);
            setSelectedTopic(null);
          }}
          onTopicUpdate={handleTopicUpdate}
          isReadOnly={userRole === 'viewer'}
        />

        {/* Notification Center */}
        <NotificationCenter
          isOpen={notificationOpen}
          onClose={() => setNotificationOpen(false)}
          userRole={userRole}
          position="top-right"
        />

        {/* Quick Action Launcher */}
        <QuickActionLauncher
          userRole={userRole}
          currentPage="materiality-matrix-management"
          position="bottom-right"
          isVisible={true}
        />
      </div>
    </>
  );
};

export default MaterialityMatrixManagement;