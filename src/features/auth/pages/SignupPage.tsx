import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { useAuth } from '../context/AuthContext';
import { ThemeToggle } from '@/features/theme';

export const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  const { signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setFormError(null);
    setIsGoogleSubmitting(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        setFormError(error.message);
        setIsGoogleSubmitting(false);
      }
    } catch (err: any) {
      setFormError(err?.message || 'Failed to initialize Google Sign In. Please try again.');
      setIsGoogleSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // 1. Validation
    if (!email.trim() || !password || !confirmPassword) {
      setFormError('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setFormError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setFormError('Password must be at least 6 characters in length.');
      return;
    }

    if (password !== confirmPassword) {
      setFormError('Passwords do not match. Please re-enter.');
      return;
    }

    try {
      setIsSubmitting(true);
      const { session, error } = await signUp(email.trim(), password);

      if (error) {
        setFormError(error.message);
        setIsSubmitting(false);
        return;
      }

      // If Supabase has email confirmation disabled, a session is created right away
      if (session) {
        navigate('/app', { replace: true });
        return;
      }

      // If email confirmation is enabled, notify user
      setIsSuccess(true);
      setIsSubmitting(false);
    } catch (err: any) {
      setFormError(err?.message || 'An error occurred during account creation.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-surface-1/30">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-ink-dark transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Public Website
          </Link>
          <ThemeToggle size="sm" />
        </div>

        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="h-10 w-10 rounded-lg bg-ink-dark text-canvas flex items-center justify-center transition-transform group-hover:scale-105">
              <Shield className="h-6 w-6" />
            </div>
            <span className="font-bold text-xl tracking-tight text-ink-dark">CyberShield</span>
          </Link>

          <h2 className="mt-6 text-2xl sm:text-3xl font-extrabold text-ink-dark tracking-tight">
            Create Your Account
          </h2>
          <p className="mt-2 text-sm text-ink-muted">
            Register for full access to threat analysis, defensive simulators, and 1930 escalation resources.
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-canvas py-8 px-6 sm:px-10 border border-hairline rounded-xl shadow-flat">
          {isSuccess ? (
            <div className="space-y-5 text-center">
              <div className="h-12 w-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-ink-dark">Verification Email Sent</h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                We've dispatched a confirmation link to <strong className="text-ink-dark">{email}</strong>. Please check your inbox and confirm your address to sign in.
              </p>
              <div className="pt-2">
                <Link to="/login">
                  <Button variant="primary" size="md" className="w-full">
                    Proceed to Sign In
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              {formError && (
                <div className="mb-6">
                  <Alert variant="error" title="Registration Error">
                    {formError}
                  </Alert>
                </div>
              )}

              {/* Google OAuth Button */}
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={handleGoogleSignIn}
                disabled={isGoogleSubmitting || isSubmitting}
                className="w-full justify-center text-sm font-semibold flex items-center gap-2.5 bg-canvas hover:bg-surface-1 border-hairline shadow-flat transition-colors"
              >
                {isGoogleSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Connecting to Google...
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Continue with Google</span>
                  </>
                )}
              </Button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-hairline" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-canvas px-3 text-ink-secondary font-medium">Or continue with email</span>
                </div>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="signup-email" className="block text-sm font-semibold text-ink-primary mb-1">
                    Email Address *
                  </label>
                  <Input
                    id="signup-email"
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
                  <label htmlFor="signup-password" className="block text-sm font-semibold text-ink-primary mb-1">
                    Password * (min. 6 characters)
                  </label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
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

                <div>
                  <label htmlFor="signup-confirm-password" className="block text-sm font-semibold text-ink-primary mb-1">
                    Confirm Password *
                  </label>
                  <Input
                    id="signup-confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    disabled={isSubmitting}
                    className="w-full text-base"
                  />
                </div>

                <div className="text-xs text-ink-secondary leading-relaxed">
                  By registering, you acknowledge that CyberShield is a heuristic threat triage engine and educational tool, not an official law enforcement agency.
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
                      Creating Account...
                    </>
                  ) : (
                    'Register for CyberShield'
                  )}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-hairline text-center text-sm text-ink-muted">
                <span>Already have an account? </span>
                <Link to="/login" className="font-semibold text-cobalt hover:underline">
                  Sign in instead
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
