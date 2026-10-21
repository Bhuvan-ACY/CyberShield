import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const PublicOnlyRoute: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
        <div className="h-8 w-8 border-2 border-hairline border-t-ink-dark rounded-full animate-spin" />
        <span className="text-sm font-medium text-ink-muted">Loading CyberShield...</span>
      </div>
    );
  }

  if (user) {
    const fromPath = (location.state as { from?: { pathname?: string } })?.from?.pathname;
    // Prevent open redirect loops by only redirecting to internal protected /app routes
    const destination = fromPath && fromPath.startsWith('/app') ? fromPath : '/app';
    return <Navigate to={destination} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
