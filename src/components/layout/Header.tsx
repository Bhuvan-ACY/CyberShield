import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Shield, PhoneCall, Menu, X, AlertOctagon, LogOut, User as UserIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/features/auth/context/AuthContext';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const navLinks = [
    { to: '/app/analyze', label: 'Analyze Threats' },
    { to: '/app/awareness', label: 'Awareness Center' },
    { to: '/app/safety-guide', label: 'Safety & 1930 Guide' },
    { to: '/app/training', label: 'Training & Quizzes' },
    { to: '/app/about', label: 'About & Privacy' },
  ];

  const isActive = (path: string) => {
    if (path === '/app/analyze') {
      return location.pathname === '/app/analyze' || location.pathname === '/app/analyze/results';
    }
    return location.pathname === path;
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/', { replace: true });
  };

  return (
    <header className="sticky top-0 z-sticky bg-canvas/95 backdrop-blur-sm border-b border-hairline transition-all">
      {/* Emergency Alert Banner */}
      <div className="bg-ink-dark text-canvas text-xs py-1.5 px-4 text-center flex items-center justify-center gap-2 border-b border-ink-mid">
        <AlertOctagon className="h-3.5 w-3.5 text-amber-400 shrink-0" />
        <span className="font-medium">
          Under active digital arrest coercion or urgent fraud? Dial National Helpline <strong className="underline text-amber-300">1930</strong> immediately.
        </span>
        <a
          href="tel:1930"
          className="ml-2 inline-flex items-center gap-1 bg-amber-400 text-ink-dark px-2.5 py-0.5 rounded text-xs font-bold hover:bg-amber-300 transition-colors"
        >
          <PhoneCall className="h-3.5 w-3.5" />
          Call 1930
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/app" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-lg bg-ink-dark text-canvas flex items-center justify-center transition-transform group-hover:scale-105">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-ink-dark">CyberShield</span>
                <span className="code-chip">MVP</span>
              </div>
              <p className="text-xs text-ink-secondary leading-tight hidden sm:block">
                Citizen Threat Triage & Incident Escalation
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors',
                  isActive(link.to)
                    ? 'bg-surface-1 text-ink-dark font-semibold'
                    : 'text-ink-muted hover:text-ink-primary hover:bg-surface-1/60'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action CTAs & User Controls */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Link
              to="/app/analyze"
              className="inline-flex items-center justify-center text-xs font-semibold px-3.5 py-2 rounded-lg bg-ink-dark text-canvas hover:bg-ink-primary transition-colors shadow-flat"
            >
              Analyze Threat
            </Link>

            {user && (
              <div className="flex items-center gap-2 pl-2 border-l border-hairline">
                <div className="hidden lg:flex items-center gap-1.5 text-xs text-ink-secondary">
                  <UserIcon className="h-3.5 w-3.5" />
                  <span className="max-w-[120px] truncate" title={user.email || ''}>
                    {user.email}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleSignOut}
                  title="Sign Out of CyberShield"
                  className="inline-flex items-center gap-1 text-xs font-medium text-ink-muted hover:text-error px-2 py-1 rounded hover:bg-surface-1 transition-colors"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-ink-muted hover:text-ink-primary hover:bg-surface-1 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-hairline bg-canvas px-4 pt-2 pb-4 space-y-1">
          {user && (
            <div className="px-3 py-2 text-xs text-ink-secondary border-b border-hairline mb-2 flex items-center justify-between">
              <span className="truncate">{user.email}</span>
              <span className="code-chip">Authenticated</span>
            </div>
          )}

          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                'block px-3 py-2 rounded-lg text-sm font-medium',
                isActive(link.to)
                  ? 'bg-surface-1 text-ink-dark font-semibold'
                  : 'text-ink-muted hover:text-ink-primary hover:bg-surface-1/50'
              )}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-2 space-y-2">
            <Link
              to="/app/analyze"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center px-4 py-2 text-sm font-semibold rounded-lg bg-ink-dark text-canvas"
            >
              Start Threat Analysis
            </Link>

            {user && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleSignOut();
                }}
                className="w-full text-center px-4 py-2 text-sm font-medium text-error border border-error/30 rounded-lg hover:bg-error/10 transition-colors flex items-center justify-center gap-1.5"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

