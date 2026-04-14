// src/Routes.jsx
import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";

// Page imports
import LoginRegister from "pages/login-register";
import SearchResultsDashboard from "pages/search-results-dashboard";
import BookingReviewPayment from "pages/booking-review-payment";
import UserDashboardTripManagement from "pages/user-dashboard-trip-management";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/login-register" element={<LoginRegister />} />
          <Route path="/search-results-dashboard" element={<SearchResultsDashboard />} />
          <Route path="/booking-review-payment" element={<BookingReviewPayment />} />
          <Route path="/user-dashboard-trip-management" element={<UserDashboardTripManagement />} />
          <Route path="/" element={<SearchResultsDashboard />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;