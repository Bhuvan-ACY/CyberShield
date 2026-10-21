import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { useAuth } from '../context/AuthContext';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!email.trim()) {
      setFormError('Please enter your account email address.');
      return;
    }

    try {
      setIsSubmitting(true);
      const { error } = await resetPassword(email.trim());

      if (error) {
        setFormError(error.message);
        setIsSubmitting(false);
        return;
      }

      setIsSuccess(true);
      setIsSubmitting(false);
    } catch (err: any) {
      setFormError(err?.message || 'Failed to dispatch password reset request.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-surface-1/30">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mb-6">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-ink-dark transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Sign In
          </Link>
        </div>

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
            Reset Your Password
          </h2>
          <p className="mt-2 text-sm text-ink-muted">
            Enter your registered email address to receive password recovery instructions.
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
              <h3 className="text-lg font-bold text-ink-dark">Reset Link Dispatched</h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                If an account exists for <strong className="text-ink-dark">{email}</strong>, you will receive password reset instructions shortly.
              </p>
              <div className="pt-2">
                <Link to="/login">
                  <Button variant="outline" size="md" className="w-full">
                    Return to Sign In
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              {formError && (
                <div className="mb-6">
                  <Alert variant="error" title="Reset Error">
                    {formError}
                  </Alert>
                </div>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="reset-email" className="block text-sm font-semibold text-ink-primary mb-1">
                    Registered Email Address
                  </label>
                  <Input
                    id="reset-email"
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
                      Sending Instructions...
                    </>
                  ) : (
                    'Send Password Reset Link'
                  )}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-hairline text-center text-sm text-ink-muted">
                <Link to="/login" className="font-semibold text-cobalt hover:underline">
                  Remembered your password? Sign in
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
