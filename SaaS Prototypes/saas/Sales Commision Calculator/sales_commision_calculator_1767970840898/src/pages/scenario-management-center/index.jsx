// src/pages/scenario-management-center/index.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import PageHeader from 'components/ui/PageHeader';
import useSidebar from 'hooks/useSidebar';
import ScenarioGrid from './components/ScenarioGrid';
import BulkOperationsToolbar from './components/BulkOperationsToolbar';
import FilterPanel from './components/FilterPanel';
import ExportModal from './components/ExportModal';
import ComparisonPanel from './components/ComparisonPanel';
import AuditTrailPanel from './components/AuditTrailPanel';

const ScenarioManagementCenter = () => {
  const { getMainContentClasses } = useSidebar();
  const [scenarios, setScenarios] = useState([]);
  const [filteredScenarios, setFilteredScenarios] = useState([]);
  const [selectedScenarios, setSelectedScenarios] = useState([]);
  const [savedScenarios, setSavedScenarios] = useState([]);
  const [filters, setFilters] = useState({
    dateRange: { start: '', end: '' },
    creator: '',
    payoutRange: { min: '', max: '' },
    tags: [],
    status: 'all'
  });
  const [viewMode, setViewMode] = useState('grid'); // grid, comparison
  const [showExportModal, setShowExportModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAuditTrail, setShowAuditTrail] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'modifiedAt', direction: 'desc' });
  const [showComparison, setShowComparison] = useState(false);

  // Mock scenarios data
  const mockScenarios = [
    {
      id: 'SCN-001',
      name: 'Q4 Accelerated Commission Plan',
      createdAt: new Date('2024-01-15T10:30:00'),
      modifiedAt: new Date('2024-01-20T14:45:00'),
      creator: 'Sarah Johnson',
      creatorRole: 'Finance Manager',
      affectedRepCount: 25,
      totalProjectedPayout: 2450000,
      modifiers: {
        spifPercentage: 5.5,
        acceleratorRate: 2.2,
        bonusMultiplier: 1.8
      },
      status: 'approved',
      tags: ['Q4', 'accelerated', 'high-performers'],
      description: `Aggressive commission structure designed to drive Q4 performance with enhanced accelerators for top-tier representatives. Includes special incentives for new client acquisition and territory expansion initiatives.`,
      approvedBy: 'Michael Chen',
      approvedAt: new Date('2024-01-22T09:15:00')
    },
    {
      id: 'SCN-002',
      name: 'New Hire Ramp Plan',
      createdAt: new Date('2024-01-18T09:15:00'),
      modifiedAt: new Date('2024-01-25T11:20:00'),
      creator: 'David Rodriguez',
      creatorRole: 'Sales Director',
      affectedRepCount: 8,
      totalProjectedPayout: 480000,
      modifiers: {
        spifPercentage: 3.0,
        acceleratorRate: 1.5,
        bonusMultiplier: 1.2
      },
      status: 'pending',
      tags: ['new-hire', 'ramp', 'training'],
      description: `Graduated commission structure for new sales representatives with progressive targets and support mechanisms during the first 12 months of employment.`,
      approvedBy: null,
      approvedAt: null
    },
    {
      id: 'SCN-003',
      name: 'Territory Expansion Bonus',
      createdAt: new Date('2024-01-22T16:45:00'),
      modifiedAt: new Date('2024-01-28T13:30:00'),
      creator: 'Lisa Wang',
      creatorRole: 'VP Sales Operations',
      affectedRepCount: 12,
      totalProjectedPayout: 720000,
      modifiers: {
        spifPercentage: 7.2,
        acceleratorRate: 2.8,
        bonusMultiplier: 2.0
      },
      status: 'draft',
      tags: ['territory', 'expansion', 'strategic'],
      description: `Special compensation plan for representatives taking on new territory responsibilities with enhanced commission rates and milestone bonuses.`,
      approvedBy: null,
      approvedAt: null
    },
    {
      id: 'SCN-004',
      name: 'Product Launch Incentive',
      createdAt: new Date('2024-01-25T11:00:00'),
      modifiedAt: new Date('2024-01-30T15:45:00'),
      creator: 'James Thompson',
      creatorRole: 'Product Marketing Manager',
      affectedRepCount: 35,
      totalProjectedPayout: 1750000,
      modifiers: {
        spifPercentage: 4.8,
        acceleratorRate: 1.8,
        bonusMultiplier: 1.6
      },
      status: 'approved',
      tags: ['product-launch', 'incentive', 'cross-sell'],
      description: `Comprehensive incentive program designed to drive adoption of new product lines with tiered commission structures and early adopter bonuses.`,
      approvedBy: 'Sarah Johnson',
      approvedAt: new Date('2024-02-01T10:30:00')
    },
    {
      id: 'SCN-005',
      name: 'Customer Retention Focus',
      createdAt: new Date('2024-01-28T14:20:00'),
      modifiedAt: new Date('2024-02-02T09:10:00'),
      creator: 'Amanda Foster',
      creatorRole: 'Customer Success Director',
      affectedRepCount: 18,
      totalProjectedPayout: 900000,
      modifiers: {
        spifPercentage: 6.0,
        acceleratorRate: 2.5,
        bonusMultiplier: 1.9
      },
      status: 'pending',
      tags: ['retention', 'customer-success', 'renewal'],
      description: `Retention-focused compensation model emphasizing customer satisfaction metrics and long-term relationship building with enhanced renewal bonuses.`,
      approvedBy: null,
      approvedAt: null
    },
    {
      id: 'SCN-006',
      name: 'Mid-Year Adjustment Plan',
      createdAt: new Date('2024-02-01T08:30:00'),
      modifiedAt: new Date('2024-02-05T16:20:00'),
      creator: 'Robert Kim',
      creatorRole: 'Compensation Analyst',
      affectedRepCount: 42,
      totalProjectedPayout: 3150000,
      modifiers: {
        spifPercentage: 4.2,
        acceleratorRate: 1.9,
        bonusMultiplier: 1.4
      },
      status: 'draft',
      tags: ['mid-year', 'adjustment', 'market-correction'],
      description: `Market-responsive compensation adjustments based on competitive analysis and performance data from the first half of the fiscal year.`,
      approvedBy: null,
      approvedAt: null
    }
  ];

  // Initialize scenarios
  useEffect(() => {
    setScenarios(mockScenarios);
    setFilteredScenarios(mockScenarios);
  }, []);

  // Apply filters and search
  useEffect(() => {
    let filtered = [...scenarios];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(scenario =>
        scenario.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scenario.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scenario.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Date range filter
    if (filters.dateRange.start && filters.dateRange.end) {
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);
      filtered = filtered.filter(scenario =>
        scenario.createdAt >= startDate && scenario.createdAt <= endDate
      );
    }

    // Creator filter
    if (filters.creator) {
      filtered = filtered.filter(scenario =>
        scenario.creator.toLowerCase().includes(filters.creator.toLowerCase())
      );
    }

    // Payout range filter
    if (filters.payoutRange.min || filters.payoutRange.max) {
      filtered = filtered.filter(scenario => {
        const payout = scenario.totalProjectedPayout;
        const min = filters.payoutRange.min ? parseFloat(filters.payoutRange.min) : 0;
        const max = filters.payoutRange.max ? parseFloat(filters.payoutRange.max) : Infinity;
        return payout >= min && payout <= max;
      });
    }

    // Status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(scenario => scenario.status === filters.status);
    }

    // Tags filter
    if (filters.tags.length > 0) {
      filtered = filtered.filter(scenario =>
        filters.tags.some(tag => scenario.tags.includes(tag))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredScenarios(filtered);
  }, [scenarios, filters, searchQuery, sortConfig]);

  // Handle scenario selection
  const handleScenarioSelect = (scenarioId, isSelected) => {
    if (isSelected) {
      setSelectedScenarios([...selectedScenarios, scenarioId]);
    } else {
      setSelectedScenarios(selectedScenarios.filter(id => id !== scenarioId));
    }
  };

  // Handle bulk selection
  const handleSelectAll = () => {
    if (selectedScenarios.length === filteredScenarios.length) {
      setSelectedScenarios([]);
    } else {
      setSelectedScenarios(filteredScenarios.map(s => s.id));
    }
  };

  // Handle scenario deletion
  const handleDeleteScenarios = (scenarioIds) => {
    setScenarios(scenarios.filter(s => !scenarioIds.includes(s.id)));
    setSelectedScenarios([]);
  };

  // Handle scenario archiving
  const handleArchiveScenarios = (scenarioIds) => {
    setScenarios(scenarios.map(s => 
      scenarioIds.includes(s.id) ? { ...s, status: 'archived' } : s
    ));
    setSelectedScenarios([]);
  };

  // Handle sort
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Delete' && selectedScenarios.length > 0) {
        handleDeleteScenarios(selectedScenarios);
      }
      if (e.key === 'Escape') {
        setSelectedScenarios([]);
        setViewMode('grid');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedScenarios]);

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Sidebar />
      <Header />
      
      <main className={`pt-16 transition-all duration-300 ${getMainContentClasses()}`}>
        {/* Animated Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PageHeader
            title="Scenario Management Center"
            description="Create, manage, and compare commission scenarios. Analyze impact and track changes across different compensation models."
            icon="GitBranch"
            statusIndicators={[
              {
                icon: 'FileText',
                iconClass: 'text-neon-indigo',
                label: `${savedScenarios?.length || 0} Saved Scenarios`
              },
              {
                icon: 'Zap',
                iconClass: 'text-neon-teal',
                label: 'Real-time Calculations'
              },
              {
                icon: 'Shield',
                iconClass: 'text-neon-aqua',
                label: 'Version Control'
              }
            ]}
            actionButtons={[
              {
                icon: 'Plus',
                label: 'New Scenario',
                onClick: () => setShowCreateModal(true),
                variant: 'primary'
              },
              {
                icon: 'GitCompare',
                label: 'Compare',
                onClick: () => setShowComparison(!showComparison),
                variant: 'secondary'
              },
              {
                icon: 'Download',
                label: 'Export',
                onClick: () => setShowExportModal(true),
                variant: 'secondary'
              }
            ]}
          />
        </motion.div>

        <motion.div 
          className="p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-12 gap-6">
            {/* Filter Panel */}
            <motion.div 
              className="col-span-12 lg:col-span-3"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <FilterPanel
                filters={filters}
                onFiltersChange={setFilters}
                scenarios={scenarios}
              />
            </motion.div>

            {/* Main Content */}
            <motion.div 
              className="col-span-12 lg:col-span-9"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {/* Bulk Operations Toolbar */}
              <motion.div 
                className="mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <BulkOperationsToolbar
                  selectedScenarios={selectedScenarios}
                  onSelectAll={handleSelectAll}
                  onBulkDelete={() => handleDeleteScenarios(selectedScenarios)}
                  onBulkArchive={() => handleArchiveScenarios(selectedScenarios)}
                  totalScenarios={filteredScenarios.length}
                />
              </motion.div>

              {/* Scenario Grid */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <ScenarioGrid
                  scenarios={filteredScenarios}
                  selectedScenarios={selectedScenarios}
                  onScenarioSelect={handleScenarioSelect}
                  onSelectAll={handleSelectAll}
                  onSort={handleSort}
                  sortConfig={sortConfig}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Comparison Panel */}
          {showComparison && selectedScenarios.length > 1 && (
            <motion.div 
              className="mt-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ComparisonPanel
                scenarios={scenarios.filter(s => selectedScenarios.includes(s.id))}
                onClose={() => setShowComparison(false)}
              />
            </motion.div>
          )}

          {/* Audit Trail Panel */}
          {showAuditTrail && (
            <motion.div 
              className="mt-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <AuditTrailPanel
                scenarioId={selectedScenario?.id}
                onClose={() => setShowAuditTrail(false)}
              />
            </motion.div>
          )}
        </motion.div>
      </main>

      {/* Export Modal */}
      {showExportModal && (
        <ExportModal
          scenarios={selectedScenarios.length > 0 ? selectedScenarios : filteredScenarios}
          onClose={() => setShowExportModal(false)}
          onExport={handleExport}
        />
      )}
    </div>
  );
};

export default ScenarioManagementCenter;