import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
        <div className="h-8 w-8 border-2 border-hairline border-t-ink-dark rounded-full animate-spin" />
        <span className="text-sm font-medium text-ink-muted">Verifying CyberShield Authentication...</span>
      </div>
    );
  }

  if (!user) {
    // Preserve the intended path so user lands back there after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
