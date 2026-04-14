import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import QuickActionButton from '../../components/ui/QuickActionButton';
import ActivityFilters from './components/ActivityFilters';
import ActivityChart from './components/ActivityChart';
import ActivityTable from './components/ActivityTable';
import StepCounter from './components/StepCounter';
import QuickAddButtons from './components/QuickAddButtons';
import AddActivityModal from './components/AddActivityModal';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const ActivityTracking = () => {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [currentSteps, setCurrentSteps] = useState(12500);
  const [dailyGoal, setDailyGoal] = useState(10000);
  const [filters, setFilters] = useState({});

  // Mock activity data
  const mockActivities = [
    {
      id: 1,
      type: 'running',
      name: 'Morning Run',
      duration: 45,
      calories: 450,
      steps: 5200,
      intensity: 'high',
      date: '2025-10-11',
      notes: 'Great morning run in the park'
    },
    {
      id: 2,
      type: 'walking',
      name: 'Evening Walk',
      duration: 30,
      calories: 150,
      steps: 3500,
      intensity: 'low',
      date: '2025-10-10',
      notes: 'Relaxing walk after dinner'
    },
    {
      id: 3,
      type: 'cycling',
      name: 'Bike Commute',
      duration: 25,
      calories: 300,
      steps: 0,
      intensity: 'moderate',
      date: '2025-10-10',
      notes: 'Cycling to work'
    },
    {
      id: 4,
      type: 'yoga',
      name: 'Yoga Session',
      duration: 60,
      calories: 180,
      steps: 0,
      intensity: 'low',
      date: '2025-10-09',
      notes: 'Morning yoga practice'
    },
    {
      id: 5,
      type: 'strength',
      name: 'Weight Training',
      duration: 50,
      calories: 400,
      steps: 0,
      intensity: 'high',
      date: '2025-10-09',
      notes: 'Upper body workout'
    },
    {
      id: 6,
      type: 'swimming',
      name: 'Pool Swimming',
      duration: 40,
      calories: 560,
      steps: 0,
      intensity: 'high',
      date: '2025-10-08',
      notes: 'Lap swimming session'
    },
    {
      id: 7,
      type: 'walking',
      name: 'Lunch Walk',
      duration: 20,
      calories: 100,
      steps: 2200,
      intensity: 'low',
      date: '2025-10-08',
      notes: 'Quick walk during lunch break'
    },
    {
      id: 8,
      type: 'cardio',
      name: 'HIIT Workout',
      duration: 35,
      calories: 420,
      steps: 0,
      intensity: 'high',
      date: '2025-10-07',
      notes: 'High intensity interval training'
    }
  ];

  useEffect(() => {
    setActivities(mockActivities);
    setFilteredActivities(mockActivities);
  }, []);

  useEffect(() => {
    // Simulate real-time step updates
    const stepInterval = setInterval(() => {
      setCurrentSteps(prev => {
        const increment = Math.floor(Math.random() * 10) + 1;
        return Math.min(prev + increment, dailyGoal + 5000);
      });
    }, 5000);

    return () => clearInterval(stepInterval);
  }, [dailyGoal]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    
    let filtered = [...activities];

    // Apply activity type filter
    if (newFilters?.activityType) {
      filtered = filtered?.filter(activity => activity?.type === newFilters?.activityType);
    }

    // Apply search filter
    if (newFilters?.searchQuery) {
      const query = newFilters?.searchQuery?.toLowerCase();
      filtered = filtered?.filter(activity => 
        activity?.name?.toLowerCase()?.includes(query) ||
        activity?.type?.toLowerCase()?.includes(query) ||
        activity?.notes?.toLowerCase()?.includes(query)
      );
    }

    // Apply calorie range filter
    if (newFilters?.calorieRange) {
      filtered = filtered?.filter(activity => 
        activity?.calories >= newFilters?.calorieRange?.[0] && 
        activity?.calories <= newFilters?.calorieRange?.[1]
      );
    }

    // Apply date range filter
    if (newFilters?.dateRange && newFilters?.dateRange !== 'week') {
      const today = new Date();
      const filterDate = new Date();
      
      switch (newFilters?.dateRange) {
        case 'today':
          filterDate?.setHours(0, 0, 0, 0);
          filtered = filtered?.filter(activity => {
            const activityDate = new Date(activity.date);
            return activityDate >= filterDate;
          });
          break;
        case 'month':
          filterDate?.setDate(1);
          filtered = filtered?.filter(activity => {
            const activityDate = new Date(activity.date);
            return activityDate >= filterDate;
          });
          break;
      }
    }

    setFilteredActivities(filtered);
  };

  const handleSaveActivity = (activityData) => {
    if (editingActivity) {
      // Update existing activity
      const updatedActivities = activities?.map(activity =>
        activity?.id === editingActivity?.id ? { ...activityData, id: editingActivity?.id } : activity
      );
      setActivities(updatedActivities);
      setFilteredActivities(updatedActivities);
      setEditingActivity(null);
    } else {
      // Add new activity
      const newActivities = [activityData, ...activities];
      setActivities(newActivities);
      setFilteredActivities(newActivities);
    }
  };

  const handleEditActivity = (activity) => {
    setEditingActivity(activity);
    setIsAddModalOpen(true);
  };

  const handleDeleteActivity = (activityId) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      const updatedActivities = activities?.filter(activity => activity?.id !== activityId);
      setActivities(updatedActivities);
      setFilteredActivities(updatedActivities);
    }
  };

  const handleQuickAdd = (activityData) => {
    const newActivities = [activityData, ...activities];
    setActivities(newActivities);
    setFilteredActivities(newActivities);
  };

  const handleGoalUpdate = (newGoal) => {
    setDailyGoal(newGoal);
  };

  const handleAddActivity = () => {
    setEditingActivity(null);
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setEditingActivity(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Activity Tracking - VitalTracker</title>
        <meta name="description" content="Track your physical activities, monitor steps, and analyze your fitness progress with comprehensive activity logging and visualization tools." />
      </Helmet>
      <Header />
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl">
              <Icon name="Activity" size={24} className="text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Activity Tracking</h1>
              <p className="text-muted-foreground">
                Monitor your physical activities and track your fitness progress
              </p>
            </div>
          </div>
          
          <Button
            variant="default"
            onClick={handleAddActivity}
            iconName="Plus"
            iconPosition="left"
            className="shadow-wellness"
          >
            Add Activity
          </Button>
        </div>

        {/* Top Row - Step Counter and Quick Add */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <StepCounter
            currentSteps={currentSteps}
            dailyGoal={dailyGoal}
            onGoalUpdate={handleGoalUpdate}
          />
          <QuickAddButtons onQuickAdd={handleQuickAdd} />
        </div>

        {/* Activity Chart */}
        <ActivityChart />

        {/* Filters */}
        <ActivityFilters
          onFiltersChange={handleFiltersChange}
          totalActivities={filteredActivities?.length}
        />

        {/* Activity Table */}
        <ActivityTable
          activities={filteredActivities}
          onEditActivity={handleEditActivity}
          onDeleteActivity={handleDeleteActivity}
        />

        {/* Empty State */}
        {filteredActivities?.length === 0 && activities?.length > 0 && (
          <div className="bg-card rounded-xl p-12 text-center shadow-wellness elevation-1 border border-border/40">
            <div className="flex items-center justify-center w-16 h-16 bg-muted/50 rounded-full mx-auto mb-4">
              <Icon name="Search" size={32} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No activities found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters to see more activities
            </p>
            <Button
              variant="outline"
              onClick={() => handleFiltersChange({})}
              iconName="RotateCcw"
              iconPosition="left"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* No Activities State */}
        {activities?.length === 0 && (
          <div className="bg-card rounded-xl p-12 text-center shadow-wellness elevation-1 border border-border/40">
            <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
              <Icon name="Activity" size={32} className="text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Start tracking your activities</h3>
            <p className="text-muted-foreground mb-6">
              Log your first activity to begin monitoring your fitness journey
            </p>
            <Button
              variant="default"
              onClick={handleAddActivity}
              iconName="Plus"
              iconPosition="left"
            >
              Add Your First Activity
            </Button>
          </div>
        )}
      </main>
      {/* Add/Edit Activity Modal */}
      <AddActivityModal
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveActivity}
        editingActivity={editingActivity}
      />
      <QuickActionButton />
    </div>
  );
};

export default ActivityTracking;