import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Shield, Eye, EyeOff, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const fromPath = (location.state as { from?: { pathname?: string } })?.from?.pathname;
  // Prevent open redirect vulnerabilities; only permit internal application routes
  const destination = fromPath && fromPath.startsWith('/app') ? fromPath : '/app';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // 1. Validation
    if (!email.trim() || !password) {
      setFormError('Please enter both your email address and password.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setFormError('Please enter a valid email address.');
      return;
    }

    try {
      setIsSubmitting(true);
      const { error } = await signIn(email.trim(), password);

      if (error) {
        if (error.message.toLowerCase().includes('invalid login credentials')) {
          setFormError('Invalid email or password. Please verify your credentials.');
        } else if (error.message.toLowerCase().includes('email not confirmed')) {
          setFormError('Please check your inbox and verify your email before signing in.');
        } else {
          setFormError(error.message);
        }
        setIsSubmitting(false);
        return;
      }

      // Successful login
      navigate(destination, { replace: true });
    } catch (err: any) {
      setFormError(err?.message || 'An unexpected authentication error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-surface-1/30">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Link back to public site */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-ink-dark transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Public Website
          </Link>
        </div>

        {/* Brand identity */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="h-10 w-10 rounded-lg bg-ink-dark text-canvas flex items-center justify-center transition-transform group-hover:scale-105">
              <Shield className="h-6 w-6" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xl tracking-tight text-ink-dark">CyberShield</span>
                <span className="code-chip">MVP</span>
              </div>
              <p className="text-xs text-ink-secondary leading-tight">
                Citizen Threat Triage & Incident Escalation
              </p>
            </div>
          </Link>

          <h2 className="mt-6 text-2xl sm:text-3xl font-extrabold text-ink-dark tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-ink-muted">
            Sign in to access your threat analysis workspace and defensive training.
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-canvas py-8 px-6 sm:px-10 border border-hairline rounded-xl shadow-flat">
          {formError && (
            <div className="mb-6">
              <Alert variant="error" title="Sign In Error">
                {formError}
              </Alert>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="login-email" className="block text-sm font-semibold text-ink-primary mb-1">
                Email Address
              </label>
              <Input
                id="login-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="citizen@example.com"
                disabled={isSubmitting}
                className="w-full text-base"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="login-password" className="block text-sm font-semibold text-ink-primary">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-cobalt hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <Input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  disabled={isSubmitting}
                  className="w-full text-base pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-secondary hover:text-ink-dark p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full justify-center text-sm font-semibold mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Signing In to CyberShield...
                </>
              ) : (
                'Sign In to CyberShield'
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-hairline text-center text-sm text-ink-muted">
            <span>Don't have an account yet? </span>
            <Link to="/signup" className="font-semibold text-cobalt hover:underline">
              Create an account
            </Link>
          </div>
        </div>

        {/* Security badge */}
        <div className="mt-6 text-center text-xs text-ink-secondary flex items-center justify-center gap-1.5">
          <Shield className="h-3.5 w-3.5 text-emerald-600" />
          <span>Secured via Supabase Authentication &amp; TLS Encryption</span>
        </div>
      </div>
    </div>
  );
};
