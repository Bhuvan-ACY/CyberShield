import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ThemeToggle } from '@/features/theme';

export const SignoutPage: React.FC = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);
  const [signedOutComplete, setSignedOutComplete] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // Trigger Supabase sign out immediately
    const performSignOut = async () => {
      try {
        await signOut();
      } catch (err) {
        console.error('Sign out error:', err);
      } finally {
        if (isMounted) {
          setSignedOutComplete(true);
        }
      }
    };

    performSignOut();

    // 3-second countdown timer interval
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          navigate('/', { replace: true });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [signOut, navigate]);

  const handleRedirectNow = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-canvas flex flex-col justify-between text-ink-primary transition-colors">
      {/* Top Header bar with Theme Toggle */}
      <header className="w-full border-b border-hairline py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-lg bg-surface-1 border border-hairline flex items-center justify-center text-ink-dark">
            <Shield className="h-5 w-5" />
          </div>
          <span className="font-bold text-lg tracking-tight text-ink-dark">CyberShield</span>
        </div>
        <ThemeToggle size="sm" />
      </header>

      {/* Main Signing Out Card */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-canvas border border-hairline rounded-2xl p-8 shadow-xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
          {/* Animated Status Icon */}
          <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-cobalt/10 animate-ping opacity-25" />
            <div className="relative w-16 h-16 rounded-full bg-surface-1 border border-hairline flex items-center justify-center text-cobalt shadow-inner">
              {signedOutComplete ? (
                <CheckCircle2 className="h-8 w-8 text-emerald-500 animate-in zoom-in duration-200" />
              ) : (
                <Loader2 className="h-8 w-8 animate-spin text-cobalt" />
              )}
            </div>
          </div>

          {/* Heading and Feedback */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-ink-dark">
              Signing Out...
            </h1>
            <p className="text-sm text-ink-muted">
              {signedOutComplete
                ? 'Your session has been securely closed and cleared.'
                : 'Securing and closing your CyberShield session...'}
            </p>
          </div>

          {/* Progress / Countdown Visual */}
          <div className="bg-surface-1 border border-hairline rounded-xl p-4 space-y-2">
            <div className="text-xs font-medium text-ink-muted flex items-center justify-between">
              <span>Redirecting to Home</span>
              <span className="font-mono font-bold text-ink-dark text-sm bg-canvas px-2 py-0.5 rounded border border-hairline">
                {countdown}s
              </span>
            </div>
            {/* Smooth animated progress bar */}
            <div className="w-full bg-canvas rounded-full h-1.5 overflow-hidden border border-hairline">
              <div
                className="bg-cobalt h-full transition-all duration-1000 ease-linear rounded-full"
                style={{ width: `${((3 - countdown) / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* Immediate Action Option */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleRedirectNow}
              className="inline-flex items-center gap-2 text-xs font-semibold text-ink-muted hover:text-ink-dark transition-colors py-1.5 px-3 rounded-lg hover:bg-surface-1"
            >
              <span>Click here if not redirected automatically</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-hairline py-4 px-6 text-center text-xs text-ink-muted">
        CyberShield • Citizen Cyber Defense Platform
      </footer>
    </div>
  );
};
