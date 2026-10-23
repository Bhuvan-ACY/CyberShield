import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { ErrorBoundary } from '@/components/feedback/ErrorBoundary';
import { NotFoundPage } from '@/components/feedback/NotFoundPage';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import { PublicOnlyRoute } from '@/features/auth/components/PublicOnlyRoute';
import { useAuth } from '@/features/auth/context/AuthContext';

// Public Landing Page & Auth Flow Lazy Imports
const LandingPage = React.lazy(() =>
  import('@/features/landing/pages/LandingPage').then((m) => ({ default: m.LandingPage }))
);
const LoginPage = React.lazy(() =>
  import('@/features/auth/pages/LoginPage').then((m) => ({ default: m.LoginPage }))
);
const SignupPage = React.lazy(() =>
  import('@/features/auth/pages/SignupPage').then((m) => ({ default: m.SignupPage }))
);
const ForgotPasswordPage = React.lazy(() =>
  import('@/features/auth/pages/ForgotPasswordPage').then((m) => ({ default: m.ForgotPasswordPage }))
);
const AuthCallbackPage = React.lazy(() =>
  import('@/features/auth/pages/AuthCallbackPage').then((m) => ({ default: m.AuthCallbackPage }))
);
const SignoutPage = React.lazy(() =>
  import('@/features/auth/pages/SignoutPage').then((m) => ({ default: m.SignoutPage }))
);

// Protected Core Application Pages
const HomePage = React.lazy(() =>
  import('@/features/home/pages/HomePage').then((m) => ({ default: m.HomePage }))
);
const AnalyzePage = React.lazy(() =>
  import('@/features/analysis/pages/AnalyzePage').then((m) => ({ default: m.AnalyzePage }))
);
const ResultsPage = React.lazy(() =>
  import('@/features/analysis/pages/ResultsPage').then((m) => ({ default: m.ResultsPage }))
);
const AwarenessPage = React.lazy(() =>
  import('@/features/awareness/pages/AwarenessPage').then((m) => ({ default: m.AwarenessPage }))
);
const SafetyGuidePage = React.lazy(() =>
  import('@/features/safety/pages/SafetyGuidePage').then((m) => ({ default: m.SafetyGuidePage }))
);
const TrainingPage = React.lazy(() =>
  import('@/features/training/pages/TrainingPage').then((m) => ({ default: m.TrainingPage }))
);
const AboutPage = React.lazy(() =>
  import('@/features/about/pages/AboutPage').then((m) => ({ default: m.AboutPage }))
);

const PageLoadingFallback: React.FC = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
    <div className="h-8 w-8 border-2 border-hairline border-t-ink-dark rounded-full animate-spin" />
    <span className="text-sm font-medium text-ink-muted">Loading CyberShield View...</span>
  </div>
);

/**
 * RootRoute decides whether to render the Public Landing Page or redirect
 * authenticated users to the /app dashboard, preventing flicker during initial session restoration.
 */
const RootRoute: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <PageLoadingFallback />;
  }

  if (user) {
    return <Navigate to="/app" replace />;
  }

  return <LandingPage />;
};

export const AppRoutes: React.FC = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoadingFallback />}>
        <Routes>
          {/* 1. Root route: Public Landing Page for visitors, redirect to /app for authenticated users */}
          <Route path="/" element={<RootRoute />} />

          {/* 2. Public Auth Routes (Redirects to /app if already signed in) */}
          <Route element={<PublicOnlyRoute />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
          </Route>

          {/* 3. Auth Callback & Signout Flows */}
          <Route path="auth/callback" element={<AuthCallbackPage />} />
          <Route path="signout" element={<SignoutPage />} />

          {/* 4. Protected Authenticated Application (/app/*) */}
          <Route path="app" element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route index element={<HomePage />} />
              <Route path="analyze" element={<AnalyzePage />} />
              <Route path="analyze/results" element={<ResultsPage />} />
              <Route path="results" element={<Navigate to="/app/analyze/results" replace />} />
              <Route path="awareness" element={<AwarenessPage />} />
              <Route path="safety-guide" element={<SafetyGuidePage />} />
              <Route path="safety" element={<Navigate to="/app/safety-guide" replace />} />
              <Route path="training" element={<TrainingPage />} />
              <Route path="about" element={<AboutPage />} />
            </Route>
          </Route>

          {/* 5. Backwards Compatibility: Redirect root-level paths to /app/* */}
          <Route path="analyze" element={<Navigate to="/app/analyze" replace />} />
          <Route path="analyze/results" element={<Navigate to="/app/analyze/results" replace />} />
          <Route path="results" element={<Navigate to="/app/analyze/results" replace />} />
          <Route path="awareness" element={<Navigate to="/app/awareness" replace />} />
          <Route path="safety-guide" element={<Navigate to="/app/safety-guide" replace />} />
          <Route path="safety" element={<Navigate to="/app/safety-guide" replace />} />
          <Route path="training" element={<Navigate to="/app/training" replace />} />
          <Route path="about" element={<Navigate to="/app/about" replace />} />

          {/* 6. Global Catch-All 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};
