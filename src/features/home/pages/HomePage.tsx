import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAnalysis } from '@/features/analysis/context/AnalysisContext';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Shield,
  ArrowRight,
  Lock,
  PhoneCall,
  Search,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { analyze } = useAnalysis();
  const [quickInput, setQuickInput] = useState('');

  const handleQuickAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickInput.trim()) {
      navigate('/analyze');
      return;
    }
    analyze({
      type: 'message',
      messageText: quickInput.trim(),
    });
    navigate('/analyze/results');
  };

  const threatDomains = [
    {
      title: 'Digital Arrest Scams',
      badge: 'Critical Threat',
      badgeVariant: 'critical' as const,
      description:
        'Syndicates impersonating CBI, ED, and Police demanding Skype video calls and funds transfer to "court clearance escrow".',
      link: '/awareness',
    },
    {
      title: 'Phishing & Credential Theft',
      badge: 'High Frequency',
      badgeVariant: 'high' as const,
      description:
        'Deceptive SMS notifications alleging expired PAN/KYC or electricity power cutoffs designed to harvest passwords and OTPs.',
      link: '/awareness',
    },
    {
      title: 'Deceptive Lookalike URLs',
      badge: 'Structural Analysis',
      badgeVariant: 'moderate' as const,
      description:
        'Typosquatting and deceptive subdomains masquerading as official government (.gov.in) and banking portals on mobile address bars.',
      link: '/awareness',
    },
    {
      title: 'Sideloaded App Permissions',
      badge: 'Device Security',
      badgeVariant: 'low' as const,
      description:
        'Untrusted APK downloads abusing Android Accessibility and SMS permissions to silently capture banking credentials.',
      link: '/awareness',
    },
  ];

  return (
    <div className="space-y-16 py-4">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-6 pt-4 sm:pt-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-1 border border-hairline text-xs font-semibold text-ink-primary shadow-flat">
          <Shield className="h-3.5 w-3.5 text-ink-dark" />
          <span>CYBERSHIELD ENHANCED MVP</span>
          <span className="text-ink-faint">|</span>
          <span className="text-emerald-700 font-medium">100% Client-Side In-Memory Engine</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-ink-dark leading-tight">
          Citizen Threat Triage & Incident Escalation Engine
        </h1>

        <p className="text-base sm:text-lg text-ink-muted leading-relaxed max-w-2xl mx-auto">
          Instant, explainable heuristic detection of phishing messages, digital arrest extortion summons, malicious URLs, and high-hazard mobile app permissions.
        </p>

        {/* Quick Triage Bar */}
        <form onSubmit={handleQuickAnalyze} className="max-w-xl mx-auto pt-2">
          <div className="flex flex-col sm:flex-row gap-2 border border-hairline rounded-lg p-2 bg-canvas shadow-flat hover:shadow-halo transition-shadow">
            <input
              type="text"
              value={quickInput}
              onChange={(e) => setQuickInput(e.target.value)}
              placeholder="Paste suspicious SMS, link, or extortion threat..."
              className="flex-1 px-3 py-2 text-sm text-ink-primary focus:outline-none placeholder:text-ink-faint"
            />
            <Button type="submit" variant="primary" size="md" className="shrink-0">
              <Search className="h-4 w-4" />
              Triage Now
            </Button>
          </div>
        </form>

        {/* Direct Action Links */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link to="/analyze">
            <Button variant="outline" size="sm">
              Advanced Multi-Tab Analyzer
            </Button>
          </Link>
          <Link to="/training">
            <Button variant="outline" size="sm">
              Practice Scam Simulator
            </Button>
          </Link>
          <Link to="/safety-guide">
            <Button variant="secondary" size="sm" className="text-error font-semibold">
              <PhoneCall className="h-3.5 w-3.5" />
              1930 Emergency Guide
            </Button>
          </Link>
        </div>
      </section>

      {/* High-Priority Active Alert Banner */}
      <section className="max-w-4xl mx-auto">
        <div className="border border-amber-300 bg-amber-50/60 rounded-lg p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                Active Citizen Scam Alert: Fake Police & CBI Video Calls
              </h4>
              <p className="text-xs text-amber-900 leading-relaxed">
                Extortionists are impersonating Indian law enforcement over WhatsApp/Skype video calls alleging narcotics parcels. Real police never issue warrants or hold video trials.
              </p>
            </div>
          </div>

          <Link to="/awareness" className="shrink-0">
            <Button variant="outline" size="sm" className="bg-canvas border-amber-300 text-xs">
              Read Advisory
            </Button>
          </Link>
        </div>
      </section>

      {/* 4 Threat Domains Grid */}
      <section className="space-y-6 max-w-5xl mx-auto">
        <div className="text-center space-y-1">
          <span className="code-chip">HEURISTIC COVERAGE</span>
          <h2 className="text-2xl font-bold text-ink-primary">Core Threat Triage Vectors</h2>
          <p className="text-xs text-ink-muted">
            Engineered specifically to counter high-prevalence social engineering targeting Indian citizens.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {threatDomains.map((domain, i) => (
            <Card key={i} hoverable className="flex flex-col justify-between">
              <div>
                <CardHeader className="pb-3 border-none">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={domain.badgeVariant} size="sm">
                      {domain.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-base">{domain.title}</CardTitle>
                </CardHeader>
                <CardDescription className="text-xs text-ink-muted leading-relaxed px-5">
                  {domain.description}
                </CardDescription>
              </div>

              <div className="pt-4 border-t border-surface-1 px-5 mt-4">
                <Link to={domain.link} className="text-xs font-semibold text-cobalt hover:underline inline-flex items-center gap-1">
                  Learn Protection Strategies <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Zero-Retention Privacy Promise Callout */}
      <section className="max-w-4xl mx-auto border border-hairline rounded-lg p-6 bg-surface-1/30 space-y-4">
        <div className="flex items-center gap-2">
          <Lock className="h-5 w-5 text-emerald-600" />
          <h3 className="font-bold text-sm text-ink-primary">Zero-Knowledge Client Privacy Architecture</h3>
        </div>
        <p className="text-xs text-ink-muted leading-relaxed">
          CyberShield executes 100% of its regex heuristics, scoring algorithms, and evidence extraction inside your web browser memory. Your messages, links, and personal communications are never transmitted to cloud servers, never recorded in databases, and never used to train machine learning models.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-ink-primary">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Zero Database Persistence</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>No Outbound URL Crawling</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Explainable Scoring Formula</span>
          </div>
        </div>
      </section>
    </div>
  );
};
