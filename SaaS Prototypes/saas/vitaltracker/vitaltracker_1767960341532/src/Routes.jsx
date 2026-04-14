import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LoginPage from './pages/login';
import Dashboard from './pages/dashboard';
import ProgressReports from './pages/progress-reports';
import ActivityTracking from './pages/activity-tracking';
import NutritionTracking from './pages/nutrition-tracking';
import ProfileSettings from './pages/profile-settings';
import Register from './pages/register';
import SleepAnalysis from './pages/sleep-analysis';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/progress-reports" element={<ProgressReports />} />
        <Route path="/activity-tracking" element={<ActivityTracking />} />
        <Route path="/nutrition-tracking" element={<NutritionTracking />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sleep-analysis" element={<SleepAnalysis />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
