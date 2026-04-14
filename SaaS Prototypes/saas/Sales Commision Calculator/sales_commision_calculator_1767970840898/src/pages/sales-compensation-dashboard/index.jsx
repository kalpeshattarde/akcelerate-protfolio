// /home/ubuntu/app/sales_compensation_dashboard/src/pages/sales-compensation-dashboard/index.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import PageHeader from 'components/ui/PageHeader';
import useSidebar from 'hooks/useSidebar';
import SalesRepTable from './components/SalesRepTable';
import CommissionChart from './components/CommissionChart';
import BonusSimulator from './components/BonusSimulator';
import ScenarioManager from './components/ScenarioManager';

const SalesCompensationDashboard = () => {
  const { getMainContentClasses } = useSidebar();
  const [selectedReps, setSelectedReps] = useState([]);
  const [bonusParams, setBonusParams] = useState({
    spifPercentage: 2.5,
    acceleratorRate: 1.5,
    bonusMultiplier: 1.2
  });
  const [savedScenarios, setSavedScenarios] = useState([]);
  const [integrationStatus, setIntegrationStatus] = useState('connected');

  // Mock sales representative data
  const salesRepsData = [
    {
      id: 1,
      name: "Sarah Johnson",
      ytdRevenue: 1250000,
      annualQuota: 1000000,
      salesTier: "Tier 1",
      quotaAttainment: 125,
      baseSalary: 85000,
      commissionRate: 0.08,
      territory: "West Coast"
    },
    {
      id: 2,
      name: "Michael Chen",
      ytdRevenue: 875000,
      annualQuota: 900000,
      salesTier: "Tier 2",
      quotaAttainment: 97.2,
      baseSalary: 75000,
      commissionRate: 0.07,
      territory: "Pacific Northwest"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      ytdRevenue: 1450000,
      annualQuota: 1200000,
      salesTier: "Tier 1",
      quotaAttainment: 120.8,
      baseSalary: 90000,
      commissionRate: 0.09,
      territory: "Southwest"
    },
    {
      id: 4,
      name: "David Thompson",
      ytdRevenue: 650000,
      annualQuota: 800000,
      salesTier: "Tier 3",
      quotaAttainment: 81.3,
      baseSalary: 65000,
      commissionRate: 0.06,
      territory: "Mountain West"
    },
    {
      id: 5,
      name: "Lisa Wang",
      ytdRevenue: 1100000,
      annualQuota: 1000000,
      salesTier: "Tier 2",
      quotaAttainment: 110,
      baseSalary: 80000,
      commissionRate: 0.075,
      territory: "Midwest"
    },
    {
      id: 6,
      name: "Robert Martinez",
      ytdRevenue: 950000,
      annualQuota: 900000,
      salesTier: "Tier 1",
      quotaAttainment: 105.6,
      baseSalary: 85000,
      commissionRate: 0.08,
      territory: "Southeast"
    },
    {
      id: 7,
      name: "Jennifer Kim",
      ytdRevenue: 720000,
      annualQuota: 800000,
      salesTier: "Tier 2",
      quotaAttainment: 90,
      baseSalary: 70000,
      commissionRate: 0.07,
      territory: "Northeast"
    },
    {
      id: 8,
      name: "Alex Turner",
      ytdRevenue: 1350000,
      annualQuota: 1100000,
      salesTier: "Tier 1",
      quotaAttainment: 122.7,
      baseSalary: 88000,
      commissionRate: 0.085,
      territory: "Mid-Atlantic"
    },
    {
      id: 9,
      name: "Maria Gonzalez",
      ytdRevenue: 580000,
      annualQuota: 700000,
      salesTier: "Tier 3",
      quotaAttainment: 82.9,
      baseSalary: 62000,
      commissionRate: 0.06,
      territory: "South Central"
    },
    {
      id: 10,
      name: "James Wilson",
      ytdRevenue: 1180000,
      annualQuota: 1000000,
      salesTier: "Tier 2",
      quotaAttainment: 118,
      baseSalary: 82000,
      commissionRate: 0.075,
      territory: "Great Lakes"
    }
  ];

  // Calculate commission and bonus for selected representatives
  const calculateTotalPayout = () => {
    if (selectedReps.length === 0) return 0;
    
    return selectedReps.reduce((total, rep) => {
      const baseCommission = rep.ytdRevenue * rep.commissionRate;
      const spifBonus = rep.ytdRevenue * (bonusParams.spifPercentage / 100);
      const acceleratorBonus = baseCommission * (bonusParams.acceleratorRate - 1);
      const totalBonus = (spifBonus + acceleratorBonus) * bonusParams.bonusMultiplier;
      return total + baseCommission + totalBonus;
    }, 0);
  };

  // Save current scenario with smooth animation
  const saveScenario = () => {
    const newScenario = {
      id: Date.now(),
      timestamp: new Date(),
      selectedReps: selectedReps.map(rep => rep.id),
      bonusParams: { ...bonusParams },
      totalPayout: calculateTotalPayout(),
      repCount: selectedReps.length
    };
    
    setSavedScenarios(prev => [newScenario, ...prev.slice(0, 4)]);
  };

  // Load scenario with transition
  const loadScenario = (scenario) => {
    const repsToSelect = salesRepsData.filter(rep => 
      scenario.selectedReps.includes(rep.id)
    );
    setSelectedReps(repsToSelect);
    setBonusParams(scenario.bonusParams);
  };

  // Export to PDF (mock implementation)
  const exportToPDF = () => {
    console.log('Exporting to PDF...');
    // Mock PDF export functionality
    alert('PDF export functionality would be implemented here');
  };

  // Simulate integration status updates
  useEffect(() => {
    const statusOptions = ['connected', 'syncing', 'warning'];
    const interval = setInterval(() => {
      setIntegrationStatus(statusOptions[Math.floor(Math.random() * statusOptions.length)]);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const getIntegrationStatusColor = () => {
    switch (integrationStatus) {
      case 'connected': return 'text-neon-teal';
      case 'syncing': return 'text-neon-aqua';
      case 'warning': return 'text-yellow-400';
      default: return 'text-text-muted-dark';
    }
  };

  const getIntegrationStatusIcon = () => {
    switch (integrationStatus) {
      case 'connected': return 'CheckCircle';
      case 'syncing': return 'RefreshCw';
      case 'warning': return 'AlertTriangle';
      default: return 'Circle';
    }
  };

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
            title="Sales Compensation Dashboard"
            description="Adjust sliders to simulate bonus scenarios. Click 'Save Draft' to preserve configurations for later comparison."
            icon="BarChart3"
            statusIndicators={[
              {
                icon: getIntegrationStatusIcon(),
                iconClass: `${getIntegrationStatusColor()} ${integrationStatus === 'syncing' ? 'animate-spin' : ''}`,
                label: `HRIS/CRM: ${integrationStatus.charAt(0).toUpperCase() + integrationStatus.slice(1)}`,
                animated: integrationStatus === 'syncing'
              },
              {
                icon: 'UserCheck',
                iconClass: 'text-neon-indigo',
                label: 'Sales Operations'
              }
            ]}
            actionButtons={[
              {
                icon: 'Download',
                label: 'Export PDF',
                onClick: exportToPDF,
                variant: 'primary'
              }
            ]}
          />
        </motion.div>

        {/* Main Content with Staggered Animation */}
        <motion.div 
          className="flex flex-col lg:flex-row lg:h-[calc(100vh-8rem)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Left Panel - Sales Rep Table with Glass Effect */}
          <motion.div 
            className="w-full lg:w-2/5 glass-morphism border-r border-glass-border backdrop-blur-md"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <SalesRepTable
              salesReps={salesRepsData}
              selectedReps={selectedReps}
              onSelectionChange={setSelectedReps}
            />
          </motion.div>

          {/* Right Panel - Charts and Controls with Glass Effect */}
          <motion.div 
            className="flex-1 glass-morphism backdrop-blur-md overflow-y-auto"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="p-6 space-y-6">
              {/* Commission Chart with Card Animation */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="animate-slide-up"
              >
                <CommissionChart
                  selectedReps={selectedReps}
                  bonusParams={bonusParams}
                />
              </motion.div>

              {/* Bonus Simulator with Interactive Animation */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="animate-slide-up"
              >
                <BonusSimulator
                  bonusParams={bonusParams}
                  onParamsChange={setBonusParams}
                  totalPayout={calculateTotalPayout()}
                  selectedRepsCount={selectedReps.length}
                  onSaveScenario={saveScenario}
                />
              </motion.div>

              {/* Scenario Manager with Delayed Animation */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.7 }}
                className="animate-slide-up"
              >
                <ScenarioManager
                  savedScenarios={savedScenarios}
                  onLoadScenario={loadScenario}
                  onClearScenarios={() => setSavedScenarios([])}
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default SalesCompensationDashboard;