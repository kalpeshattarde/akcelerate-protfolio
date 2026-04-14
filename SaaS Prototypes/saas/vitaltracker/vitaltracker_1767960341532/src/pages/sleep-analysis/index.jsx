import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import QuickActionButton from '../../components/ui/QuickActionButton';
import SleepTimeline from './components/SleepTimeline';
import SleepTrendChart from './components/SleepTrendChart';
import SleepGoalProgress from './components/SleepGoalProgress';
import SleepLoggingControls from './components/SleepLoggingControls';
import SleepInsights from './components/SleepInsights';

const SleepAnalysis = () => {
  const [selectedDate, setSelectedDate] = useState(new Date()?.toISOString()?.split('T')?.[0]);
  const [sleepData, setSleepData] = useState([]);
  const [environmentData, setEnvironmentData] = useState({});

  // Mock sleep data
  useEffect(() => {
    const mockSleepData = [
      {
        date: '2025-10-05',
        bedtime: '22:30',
        wakeTime: '07:00',
        duration: '8.5h',
        quality: 85,
        consistency: 88,
        phases: [
          { type: 'light', duration: 25 },
          { type: 'deep', duration: 35 },
          { type: 'rem', duration: 30 },
          { type: 'awake', duration: 10 }
        ]
      },
      {
        date: '2025-10-06',
        bedtime: '23:00',
        wakeTime: '07:30',
        duration: '8.5h',
        quality: 78,
        consistency: 82,
        phases: [
          { type: 'light', duration: 30 },
          { type: 'deep', duration: 30 },
          { type: 'rem', duration: 25 },
          { type: 'awake', duration: 15 }
        ]
      },
      {
        date: '2025-10-07',
        bedtime: '22:15',
        wakeTime: '06:45',
        duration: '8.5h',
        quality: 92,
        consistency: 95,
        phases: [
          { type: 'light', duration: 20 },
          { type: 'deep', duration: 40 },
          { type: 'rem', duration: 35 },
          { type: 'awake', duration: 5 }
        ]
      },
      {
        date: '2025-10-08',
        bedtime: '22:45',
        wakeTime: '07:15',
        duration: '8.5h',
        quality: 80,
        consistency: 85,
        phases: [
          { type: 'light', duration: 28 },
          { type: 'deep', duration: 32 },
          { type: 'rem', duration: 28 },
          { type: 'awake', duration: 12 }
        ]
      },
      {
        date: '2025-10-09',
        bedtime: '23:30',
        wakeTime: '08:00',
        duration: '8.5h',
        quality: 72,
        consistency: 75,
        phases: [
          { type: 'light', duration: 35 },
          { type: 'deep', duration: 25 },
          { type: 'rem', duration: 25 },
          { type: 'awake', duration: 15 }
        ]
      },
      {
        date: '2025-10-10',
        bedtime: '22:00',
        wakeTime: '06:30',
        duration: '8.5h',
        quality: 88,
        consistency: 90,
        phases: [
          { type: 'light', duration: 22 },
          { type: 'deep', duration: 38 },
          { type: 'rem', duration: 32 },
          { type: 'awake', duration: 8 }
        ]
      },
      {
        date: '2025-10-11',
        bedtime: '22:30',
        wakeTime: '07:00',
        duration: '8.5h',
        quality: 85,
        consistency: 88,
        phases: [
          { type: 'light', duration: 25 },
          { type: 'deep', duration: 35 },
          { type: 'rem', duration: 30 },
          { type: 'awake', duration: 10 }
        ]
      }
    ];

    const mockEnvironmentData = {
      temperature: '68°F',
      noise: 'Low',
      screenTime: '45 min',
      caffeine: '2 cups',
      exerciseTime: '6 PM'
    };

    setSleepData(mockSleepData);
    setEnvironmentData(mockEnvironmentData);
  }, []);

  const handleLogSleep = (newSleepData) => {
    const sleepEntry = {
      date: new Date()?.toISOString()?.split('T')?.[0],
      bedtime: newSleepData?.bedtime,
      wakeTime: newSleepData?.wakeTime,
      duration: calculateDuration(newSleepData?.bedtime, newSleepData?.wakeTime),
      quality: newSleepData?.quality * 10, // Convert 1-10 to percentage
      consistency: 85,
      phases: [
        { type: 'light', duration: 25 },
        { type: 'deep', duration: 35 },
        { type: 'rem', duration: 30 },
        { type: 'awake', duration: 10 }
      ],
      notes: newSleepData?.notes
    };

    setSleepData(prev => [...prev, sleepEntry]);
    console.log('Sleep logged:', sleepEntry);
  };

  const calculateDuration = (bedtime, wakeTime) => {
    const bed = new Date(`2000-01-01T${bedtime}`);
    const wake = new Date(`2000-01-02T${wakeTime}`);
    const duration = (wake - bed) / (1000 * 60 * 60);
    return `${duration?.toFixed(1)}h`;
  };

  const getCurrentSleep = () => {
    const today = sleepData?.find(sleep => sleep?.date === selectedDate);
    return today ? today?.duration : '8.5h';
  };

  const getWeeklyAverage = () => {
    const recentSleep = sleepData?.slice(-7);
    const avgDuration = recentSleep?.reduce((sum, sleep) => 
      sum + parseFloat(sleep?.duration?.replace('h', '')), 0
    ) / recentSleep?.length;
    return `${avgDuration?.toFixed(1)}h`;
  };

  return (
    <>
      <Helmet>
        <title>Sleep Analysis - VitalTracker</title>
        <meta name="description" content="Comprehensive sleep pattern tracking and analysis for optimal wellness management" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Sleep Analysis</h1>
            <p className="text-muted-foreground">
              Track your sleep patterns, quality, and trends for better wellness management
            </p>
          </div>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Timeline and Trends */}
            <div className="lg:col-span-2 space-y-6">
              {/* Sleep Timeline */}
              <SleepTimeline 
                sleepData={sleepData}
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
              />

              {/* Sleep Trend Chart */}
              <SleepTrendChart sleepData={sleepData} />

              {/* Sleep Insights - Mobile/Tablet */}
              <div className="lg:hidden">
                <SleepInsights 
                  sleepData={sleepData}
                  environmentData={environmentData}
                />
              </div>
            </div>

            {/* Right Column - Goals, Logging, and Insights */}
            <div className="space-y-6">
              {/* Sleep Goal Progress */}
              <SleepGoalProgress 
                currentSleep={getCurrentSleep()}
                sleepGoal="8.0h"
                weeklyAverage={getWeeklyAverage()}
              />

              {/* Sleep Logging Controls */}
              <SleepLoggingControls onLogSleep={handleLogSleep} />

              {/* Sleep Insights - Desktop */}
              <div className="hidden lg:block">
                <SleepInsights 
                  sleepData={sleepData}
                  environmentData={environmentData}
                />
              </div>
            </div>
          </div>

          {/* Additional Stats Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-card rounded-xl p-6 shadow-wellness elevation-1 text-center">
              <div className="text-2xl font-bold text-primary mb-2">7.2h</div>
              <div className="text-sm text-muted-foreground">Average Sleep</div>
              <div className="text-xs text-success mt-1">+0.3h from last week</div>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-wellness elevation-1 text-center">
              <div className="text-2xl font-bold text-accent mb-2">83%</div>
              <div className="text-sm text-muted-foreground">Sleep Efficiency</div>
              <div className="text-xs text-success mt-1">+5% from last week</div>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-wellness elevation-1 text-center">
              <div className="text-2xl font-bold text-secondary mb-2">22:45</div>
              <div className="text-sm text-muted-foreground">Avg Bedtime</div>
              <div className="text-xs text-warning mt-1">15min later than goal</div>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-wellness elevation-1 text-center">
              <div className="text-2xl font-bold text-success mb-2">6</div>
              <div className="text-sm text-muted-foreground">Consistent Days</div>
              <div className="text-xs text-success mt-1">Great consistency!</div>
            </div>
          </div>
        </main>

        <QuickActionButton />
      </div>
    </>
  );
};

export default SleepAnalysis;