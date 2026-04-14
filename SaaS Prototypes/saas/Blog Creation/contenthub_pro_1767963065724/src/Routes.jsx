import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AnalyticsDashboard from './pages/analytics-dashboard';
import ContentCreationDashboard from './pages/content-creation-dashboard';
import SearchResults from './pages/search-results';
import Login from './pages/login';
import ContentEditor from './pages/content-editor';
import ArticleReading from './pages/article-reading';
import CommentManagement from './pages/comment-management';
import UserProfile from './pages/user-profile';
import Register from './pages/register';
import Homepage from './pages/homepage';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AnalyticsDashboard />} />
        <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
        <Route path="/content-creation-dashboard" element={<ContentCreationDashboard />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/login" element={<Login />} />
        <Route path="/content-editor" element={<ContentEditor />} />
        <Route path="/article-reading" element={<ArticleReading />} />
        <Route path="/comment-management" element={<CommentManagement />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;