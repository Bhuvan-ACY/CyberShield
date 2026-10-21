import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export const AuthCallbackPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!supabase) {
      navigate('/login', { replace: true });
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/app', { replace: true });
      } else {
        navigate('/login', { replace: true });
      }
    }).catch(() => {
      navigate('/login', { replace: true });
    });
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-3 bg-canvas">
      <div className="h-8 w-8 border-2 border-hairline border-t-ink-dark rounded-full animate-spin" />
      <span className="text-sm font-medium text-ink-muted">Authenticating CyberShield Session...</span>
    </div>
  );
};
