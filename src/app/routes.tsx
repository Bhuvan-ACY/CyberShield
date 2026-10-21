import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { ErrorBoundary } from '@/components/feedback/ErrorBoundary';
import { NotFoundPage } from '@/components/feedback/NotFoundPage';

// Code splitting as specified in ARCHITECTURE.md Section 20
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
  <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-3">
    <div className="h-6 w-6 border-2 border-hairline border-t-ink-dark rounded-full animate-spin" />
    <span className="text-xs text-ink-muted">Loading CyberShield View...</span>
  </div>
);

export const AppRoutes: React.FC = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoadingFallback />}>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="analyze" element={<AnalyzePage />} />
            <Route path="analyze/results" element={<ResultsPage />} />
            <Route path="awareness" element={<AwarenessPage />} />
            <Route path="safety-guide" element={<SafetyGuidePage />} />
            <Route path="training" element={<TrainingPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};
