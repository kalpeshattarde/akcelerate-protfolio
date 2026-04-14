import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import QuickActionButton from '../../components/ui/QuickActionButton';
import MetricRing from './components/MetricRing';
import QuickStatsCard from './components/QuickStatsCard';
import WeeklyChart from './components/WeeklyChart';
import AchievementBadges from './components/AchievementBadges';
import GoalSettingPanel from './components/GoalSettingPanel';
import QuickActionWidget from './components/QuickActionWidget';
import Icon from '../../components/AppIcon';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Mock user data with enhanced profile
  const userData = {
    name: "Sarah Johnson",
    avatar: "/assets/images/sarah_johnson_profile.png",
    memberSince: "2024-01-15",
    currentStreak: 12,
    totalPoints: 2847
  };

  // Enhanced health metrics with real-time simulation and additional parameters
  const [healthMetrics, setHealthMetrics] = useState({
    steps: { 
      current: 8547, 
      target: 10000, 
      unit: 'steps', 
      trend: 12,
      distance: 6.2,
      distanceUnit: 'km',
      activeMinutes: 45,
      caloriesBurned: 420,
      avgPace: '8:30'
    },
    calories: { 
      current: 1850, 
      target: 2200, 
      unit: 'kcal', 
      trend: -3,
      remaining: 350,
      basalRate: 1680,
      activeRate: 170,
      mealCalories: 1850,
      burnRate: 95
    },
    water: { 
      current: 6.5, 
      target: 8, 
      unit: 'glasses', 
      trend: 8,
      remaining: 1.5,
      lastIntake: '2:30 PM',
      avgIntake: 250,
      intakeUnit: 'ml',
      hydrationLevel: 81
    },
    sleep: { 
      current: 7.2, 
      target: 8, 
      unit: 'hours', 
      trend: 5,
      remaining: 0.8,
      deepSleep: 2.1,
      lightSleep: 4.6,
      remSleep: 0.5,
      sleepQuality: 82,
      bedtime: '10:45 PM',
      wakeTime: '6:00 AM'
    }
  });

  // Loading simulation
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Set personalized greeting based on time
    const hour = new Date()?.getHours();
    if (hour < 6) setGreeting('Good night');
    else if (hour < 12) setGreeting('Good morning');
    else if (hour < 17) setGreeting('Good afternoon');
    else if (hour < 22) setGreeting('Good evening');
    else setGreeting('Good night');

    // Simulate real-time metric updates
    const metricsTimer = setInterval(() => {
      setHealthMetrics(prev => {
        const newSteps = Math.min(
          prev?.steps?.current + Math.floor(Math.random() * 25), 
          prev?.steps?.target + 500
        );
        
        return {
          ...prev,
          steps: {
            ...prev?.steps,
            current: newSteps
          }
        };
      });
    }, 45000); // Update every 45 seconds

    return () => {
      clearInterval(timer);
      clearInterval(metricsTimer);
    };
  }, []);

  const handleMetricClick = (metricType) => {
    const routeMap = {
      steps: '/activity-tracking',
      calories: '/nutrition-tracking',
      water: '/nutrition-tracking',
      sleep: '/sleep-analysis'
    };
    navigate(routeMap?.[metricType] || '/dashboard');
  };

  const handleProfileClick = () => {
    navigate('/profile-settings');
  };

  const calculatePercentage = (current, target) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  // Enhanced metric configurations with Health.io colors
  const metricConfigs = [
    {
      key: 'steps',
      title: 'Daily Steps',
      icon: 'Footprints',
      color: '#52C41A',
      bgColor: 'wellness-green'
    },
    {
      key: 'calories',
      title: 'Calories Burned',
      icon: 'Flame',
      color: '#ED8936',
      bgColor: 'wellness-orange'
    },
    {
      key: 'water',
      title: 'Water Intake',
      icon: 'Droplets',
      color: '#4299E1',
      bgColor: 'wellness-blue'
    },
    {
      key: 'sleep',
      title: 'Sleep Quality',
      icon: 'Moon',
      color: '#9F7AEA',
      bgColor: 'wellness-purple'
    }
  ];

  // Get wellness score based on metrics
  const getWellnessScore = () => {
    const scores = metricConfigs?.map(config => {
      const metric = healthMetrics?.[config?.key];
      return calculatePercentage(metric?.current, metric?.target);
    });
    return Math.round(scores?.reduce((sum, score) => sum + score, 0) / scores?.length);
  };

  const wellnessScore = getWellnessScore();

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <motion.div
            className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full mx-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <div className="space-y-2">
            <h2 className="wellness-title-secondary">Loading your wellness data...</h2>
            <p className="wellness-text-secondary">Preparing your personalized health insights</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background wellness-smooth-scroll">
      <Header />
      <main className="wellness-container py-8">
        {/* Enhanced Welcome Section with Better Responsive Design */}
        <motion.section
          className="wellness-spacing-md rounded-2xl wellness-gradient-primary text-white wellness-section relative overflow-hidden mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between wellness-gap-md">
              {/* Welcome Content */}
              <div className="space-y-4 flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center wellness-gap-sm">
                  <h1 className="wellness-title-primary text-white text-shadow min-w-0">
                    <span className="text-constrained">
                      {greeting}, {userData?.name?.split(' ')?.[0]}! 👋
                    </span>
                  </h1>
                  <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm flex-shrink-0">
                    {userData?.currentStreak} day streak! 🔥
                  </div>
                </div>
                
                <p className="text-white/90 font-medium wellness-text-primary">
                  {currentTime?.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                
                <div className="flex flex-wrap items-center wellness-gap-sm text-sm">
                  <div className="flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                    <Icon name="Target" size={16} />
                    <span className="whitespace-nowrap">Wellness: {wellnessScore}%</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                    <Icon name="Award" size={16} />
                    <span className="whitespace-nowrap">{userData?.totalPoints?.toLocaleString()} pts</span>
                  </div>
                </div>
              </div>
              
              {/* Profile Section with Enhanced Layout */}
              <div className="flex items-center wellness-gap-sm mt-4 lg:mt-0 flex-shrink-0">
                <div className="text-right text-white/90 hidden sm:block">
                  <p className="text-sm">Member since</p>
                  <p className="font-semibold">
                    {new Date(userData.memberSince)?.toLocaleDateString('en-US', { 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </p>
                </div>
                <motion.button
                  className="w-16 h-16 rounded-full overflow-hidden border-3 border-white/30 wellness-elevation-2 hover:border-white/50 focus-wellness-strong transition-all duration-200 flex items-center justify-center flex-shrink-0"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleProfileClick}
                  aria-label={`View profile for ${userData?.name}`}
                  title="Click to view profile settings"
                >
                  <img 
                    src={userData?.avatar} 
                    alt={userData?.name}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                </motion.button>
              </div>
            </div>
          </div>
          
          {/* Enhanced Background Pattern */}
          <div className="absolute inset-0 opacity-10 overflow-hidden">
            <div className="absolute top-4 right-4 w-32 h-32 rounded-full bg-white/20 blur-sm" />
            <div className="absolute bottom-4 left-4 w-24 h-24 rounded-full bg-white/10 blur-sm" />
            <div className="absolute top-1/2 right-1/3 w-16 h-16 rounded-full bg-white/15 blur-sm" />
          </div>
        </motion.section>

        {/* Health Metrics Grid - Enhanced with Better Spacing and Fixed Heights */}
        <motion.section
          className="wellness-grid wellness-section mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {metricConfigs?.map((config, index) => {
            const metric = healthMetrics?.[config?.key];
            const percentage = calculatePercentage(metric?.current, metric?.target);
            
            return (
              <motion.div
                key={config?.key}
                className="wellness-card-metric relative"
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.15 + 0.3,
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1]
                }}
              >
                <MetricRing
                  title={config?.title}
                  value={metric?.current}
                  target={metric?.target}
                  unit={metric?.unit}
                  icon={config?.icon}
                  color={config?.color}
                  bgColor={config?.bgColor}
                  percentage={percentage}
                  trend={metric?.trend}
                  isGoalAchieved={percentage >= 100}
                  onClick={() => handleMetricClick(config?.key)}
                />
              </motion.div>
            );
          })}
        </motion.section>

        {/* Secondary Content Grid - Enhanced Layout with Better Spacing */}
        <section className="grid grid-cols-1 lg:grid-cols-3 wellness-gap-lg wellness-section mb-10">
          {/* Weekly Chart - Enhanced Container */}
          <motion.div
            className="lg:col-span-2 wellness-card-chart wellness-content-container"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <WeeklyChart />
          </motion.div>

          {/* Quick Stats - Enhanced Container */}
          <motion.div
            className="wellness-card-stats wellness-content-container"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <QuickStatsCard />
          </motion.div>
        </section>

        {/* Bottom Content Grid - Enhanced Layout with Better Spacing */}
        <section className="grid grid-cols-1 lg:grid-cols-2 wellness-gap-lg wellness-section mb-10">
          {/* Achievement Badges - Enhanced Container with Proper Overflow Management */}
          <motion.div
            className="achievements-container wellness-content-container relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <AchievementBadges />
          </motion.div>

          {/* Quick Actions Widget - Enhanced Container with Z-index Management */}
          <motion.div
            className="quick-actions-container wellness-content-container relative z-elevated"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <QuickActionWidget />
          </motion.div>
        </section>

        {/* Enhanced Motivational Section with Better Spacing */}
        <motion.section
          className="wellness-card wellness-spacing-lg text-center relative overflow-hidden mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="relative z-10 space-y-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Icon name="Heart" size={24} color="#52C41A" />
            </div>
            <div className="space-y-3">
              <h3 className="wellness-title-secondary text-center">
                "Every step towards better health is a victory worth celebrating."
              </h3>
              <p className="wellness-text-secondary text-center max-w-2xl mx-auto">
                Your wellness journey is unique and valuable. Keep moving forward! 💚
              </p>
            </div>
            
            {/* Enhanced Wellness Tips Grid with Better Spacing */}
            <div className="wellness-grid-3 pt-8">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mx-auto">
                  <Icon name="Activity" size={20} color="#48BB78" />
                </div>
                <h4 className="wellness-text-accent">Stay Active</h4>
                <p className="wellness-text-secondary text-constrained-multiline">
                  Aim for 150 minutes of moderate activity weekly
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto">
                  <Icon name="Droplets" size={20} color="#4299E1" />
                </div>
                <h4 className="wellness-text-accent">Stay Hydrated</h4>
                <p className="wellness-text-secondary text-constrained-multiline">
                  Drink water consistently throughout the day
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto">
                  <Icon name="Moon" size={20} color="#9F7AEA" />
                </div>
                <h4 className="wellness-text-accent">Quality Sleep</h4>
                <p className="wellness-text-secondary text-constrained-multiline">
                  Maintain consistent sleep schedule for recovery
                </p>
              </div>
            </div>
          </div>
          
          {/* Enhanced Background Decoration */}
          <div className="absolute inset-0 opacity-5 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-primary transform translate-x-16 -translate-y-16 blur-sm" />
            <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-accent transform -translate-x-12 translate-y-12 blur-sm" />
            <div className="absolute top-1/2 left-1/2 w-20 h-20 rounded-full bg-secondary transform -translate-x-10 -translate-y-10 blur-sm opacity-30" />
          </div>
        </motion.section>
      </main>
      {/* Floating Components with Enhanced Positioning and Z-index */}
      <div className="fixed bottom-6 right-6 z-elevated space-y-4">
        <QuickActionButton />
      </div>
      <GoalSettingPanel />
    </div>
  );
};

export default Dashboard;