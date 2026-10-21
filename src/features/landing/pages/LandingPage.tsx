import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  PhoneCall,
  Menu,
  X,
  AlertOctagon,
  ArrowRight,
  Lock,
  Search,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  GraduationCap,
  Scale,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export const LandingPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#safety', label: 'Safety Resources' },
    { href: '#scoring', label: 'Risk Scoring' },
    { href: '#privacy', label: 'Privacy & Limits' },
  ];

  const problemThreats = [
    {
      title: 'Phishing & Credential Theft',
      tag: 'Financial Coercion',
      description:
        'Deceptive SMS and WhatsApp messages claiming blocked bank accounts, urgent electricity disconnection, or fake lottery winnings designed to extract credentials and OTPs.',
    },
    {
      title: 'Digital Arrest Extortion',
      tag: 'Psychological Coercion',
      description:
        'Scammers posing as police, CBI, or customs officials over video calls, placing victims under fraudulent "digital custody" and demanding security deposits to prevent arrest.',
    },
    {
      title: 'Deceptive Lookalike URLs',
      tag: 'Domain Spoofing',
      description:
        'Typo-squatted domains and multi-level subdomains mimicking genuine government portals (.gov.in) and trusted banking sites to steal payment information.',
    },
    {
      title: 'High-Hazard App Permissions',
      tag: 'Device Exploitation',
      description:
        'Sideloaded APKs distributed outside official stores requesting SMS and Accessibility services to intercept two-factor codes and silently drain accounts.',
    },
  ];

  const featuresList = [
    {
      title: 'Suspicious Message Analysis',
      icon: Search,
      badge: 'Natural Language Heuristics',
      description:
        'Examines messages for artificial urgency, impersonation, credential harvesting, OTP requests, and financial pressure through calibrated regex heuristics.',
    },
    {
      title: 'URL Risk Inspection',
      icon: Cpu,
      badge: 'Syntax & TLD Parsing',
      description:
        'Zero-fetch structural URL inspection identifies lookalike subdomains, suspicious TLDs, and dangerous non-standard ports without exposing you to live exploits.',
    },
    {
      title: 'Digital Arrest Awareness',
      icon: AlertOctagon,
      badge: 'Extortion Defense',
      description:
        'Specialized detection vectors identify illegal video call demands, narcotics allegations, and bogus court seals, dispelling intimidation tactics.',
    },
    {
      title: 'Explainable Risk Assessment',
      icon: Scale,
      badge: 'Deterministic Scoring',
      description:
        'Every score (0–100) displays exact matched evidence excerpts and calibrated rule weights, rejecting unexplainable black-box AI scores.',
    },
    {
      title: 'Safety & Incident Escalation',
      icon: PhoneCall,
      badge: 'Golden Hour Protocol',
      description:
        'Direct access to India’s 1930 National Cyber Crime helpline, Chakshu reporting portal, and a forensic evidence preservation checklist.',
    },
    {
      title: 'Cybersecurity Training',
      icon: GraduationCap,
      badge: 'Hands-on Practice',
      description:
        'Interactive simulated message cards with clickable warning hotspots and an adaptive 10-question quiz with remediation study links.',
    },
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Citizen Input',
      description: 'Paste suspicious message text, web links, or declared mobile app permissions into the triage interface.',
    },
    {
      step: '02',
      title: 'Client-Side Evaluation',
      description: 'The pure TypeScript heuristic engine normalizes Unicode homoglyphs and evaluates calibrated threat indicators locally in browser memory.',
    },
    {
      step: '03',
      title: 'Deterministic Calculation',
      description: 'Deduplicated rule weights are combined with educational attenuation or multi-vector compound threat multipliers to yield a score between 0 and 100.',
    },
    {
      step: '04',
      title: 'Explainable Findings',
      description: 'Review matched evidence quotes, operational risk levels, and clear explanations explaining exactly why each flag was raised.',
    },
    {
      step: '05',
      title: 'Actionable Escalation',
      description: 'Receive tailored next steps: block contacts, freeze accounts via 1930 within the Golden Hour, or lodge formal complaints on cybercrime.gov.in.',
    },
  ];

  const scoringTiers = [
    {
      range: '0–24',
      tier: 'Low Risk',
      variant: 'low' as const,
      meaning: 'Negligible suspicious patterns detected. Standard caution and vigilance apply.',
    },
    {
      range: '25–49',
      tier: 'Moderate Risk',
      variant: 'moderate' as const,
      meaning: 'Isolated suspicious indicators present. Independent verification through trusted channels strongly recommended.',
    },
    {
      range: '50–74',
      tier: 'High Risk',
      variant: 'high' as const,
      meaning: 'Multiple strong indicators of deception, urgency, or lookalike patterns. Do not click links, send money, or share OTPs.',
    },
    {
      range: '75–100',
      tier: 'Very High Risk',
      variant: 'critical' as const,
      meaning: 'Compounding severe markers of digital arrest extortion, credential harvesting, or dangerous app permissions. Disconnect immediately.',
    },
  ];

  return (
    <div className="min-h-screen bg-canvas text-ink-primary font-sans antialiased selection:bg-surface-1">
      {/* =========================================================================
          SECTION C: Emergency Safety Banner (Indian Citizen Escalation)
          ========================================================================= */}
      <div id="safety-banner" className="bg-ink-dark text-canvas text-xs sm:text-sm py-2 px-4 text-center flex flex-wrap items-center justify-center gap-2 border-b border-ink-mid">
        <AlertOctagon className="h-4 w-4 text-amber-400 shrink-0" />
        <span className="font-medium">
          Facing an active digital arrest scam or urgent financial fraud? Dial the National Cyber Crime Helpline at <strong className="underline text-amber-300">1930</strong> immediately.
        </span>
        <a
          href="tel:1930"
          className="ml-2 inline-flex items-center gap-1.5 bg-amber-400 text-ink-dark px-3 py-0.5 rounded text-xs font-bold hover:bg-amber-300 transition-colors shadow-sm"
        >
          <PhoneCall className="h-3.5 w-3.5" />
          Call 1930
        </a>
      </div>

      {/* =========================================================================
          SECTION A: Public Navigation Bar
          ========================================================================= */}
      <header className="sticky top-0 z-sticky bg-canvas/95 backdrop-blur-sm border-b border-hairline transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Left: Brand Identity */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="h-10 w-10 rounded-lg bg-ink-dark text-canvas flex items-center justify-center transition-transform group-hover:scale-105">
                <Shield className="h-5.5 w-5.5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-lg sm:text-xl tracking-tight text-ink-dark">CyberShield</span>
                  <span className="code-chip">MVP</span>
                </div>
                <p className="text-xs text-ink-secondary leading-none hidden sm:block">
                  Citizen Threat Triage & Incident Escalation
                </p>
              </div>
            </Link>

            {/* Center: Public Informational Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3.5 py-1.5 rounded-lg text-sm font-medium text-ink-muted hover:text-ink-dark hover:bg-surface-1/60 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right: Auth Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <Link to="/login">
                <Button variant="outline" size="sm" className="text-sm font-semibold">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary" size="sm" className="text-sm font-semibold">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Hamburger */}
            <div className="lg:hidden flex items-center">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-ink-muted hover:text-ink-primary hover:bg-surface-1 focus:outline-none"
                aria-label="Toggle Public Menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-hairline bg-canvas px-4 pt-3 pb-6 space-y-2 shadow-lg">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3.5 py-2 rounded-lg text-sm font-medium text-ink-muted hover:text-ink-dark hover:bg-surface-1/50"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-hairline flex flex-col gap-2">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="md" className="w-full justify-center">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="md" className="w-full justify-center">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* =========================================================================
          SECTION B: Hero Section
          ========================================================================= */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-hairline bg-gradient-to-b from-canvas via-canvas to-surface-1/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-1 border border-hairline text-xs font-semibold text-ink-primary shadow-flat">
            <Shield className="h-4 w-4 text-ink-dark" />
            <span>CITIZEN CYBERSECURITY PLATFORM</span>
            <span className="text-ink-faint">|</span>
            <span className="text-emerald-700 font-medium">100% Client-Side In-Memory Engine</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-ink-dark leading-tight max-w-4xl mx-auto">
            Recognize Digital Threats. <br className="hidden sm:inline" />
            Respond with Confidence.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-ink-muted leading-relaxed max-w-3xl mx-auto">
            CyberShield helps you examine suspicious messages, deceptive links, digital arrest scam tactics, and potentially risky mobile application information through explainable, rule-based analysis.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link to="/signup">
              <Button variant="primary" size="lg" className="text-base font-semibold px-6 shadow-sm">
                Get Started
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <a href="#features">
              <Button variant="outline" size="lg" className="text-base font-semibold px-6">
                Explore Features
              </Button>
            </a>
          </div>

          {/* Heuristic Advisory Disclaimer */}
          <div className="pt-6 max-w-2xl mx-auto">
            <p className="text-xs text-ink-secondary bg-surface-1/70 border border-hairline rounded-lg py-2.5 px-4 leading-normal">
              <strong>Advisory Notice:</strong> CyberShield provides heuristic analysis and educational guidance based on known threat patterns. It is an advisory tool and does not guarantee complete security or replace official law enforcement intervention.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION D: Problem Statement
          ========================================================================= */}
      <section className="py-16 sm:py-20 border-b border-hairline bg-canvas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="code-chip">THE CHALLENGE</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink-dark">
              High-Prevalence Cyber Scams Targeting Citizens
            </h2>
            <p className="text-base text-ink-muted leading-relaxed">
              Cybercrime syndicates exploit fear, urgency, and technical opacity. Recognizing core deception patterns is the first line of defense.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {problemThreats.map((threat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-hairline bg-canvas hover:shadow-halo transition-shadow space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="code-chip">{threat.tag}</span>
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-ink-dark">{threat.title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{threat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION E: Features
          ========================================================================= */}
      <section id="features" className="py-16 sm:py-24 border-b border-hairline bg-surface-1/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="code-chip">CORE CAPABILITIES</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink-dark">
              Built for Explainable Citizen Threat Triage
            </h2>
            <p className="text-base text-ink-muted leading-relaxed">
              Every feature is engineered to provide transparent, deterministic analysis without sending your private text to external servers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuresList.map((feat, idx) => {
              const IconComp = feat.icon;
              return (
                <Card key={idx} className="shadow-flat border-hairline flex flex-col justify-between hover:shadow-halo transition-shadow">
                  <div>
                    <CardHeader className="pb-3 border-none">
                      <div className="flex items-center justify-between mb-3">
                        <div className="h-10 w-10 rounded-lg bg-ink-dark text-canvas flex items-center justify-center">
                          <IconComp className="h-5 w-5" />
                        </div>
                        <Badge variant="surface" size="sm">
                          {feat.badge}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl font-bold">{feat.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-ink-muted leading-relaxed">{feat.description}</p>
                    </CardContent>
                  </div>
                  <div className="p-6 pt-0 border-t border-surface-1 mt-4">
                    <Link
                      to="/login"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-cobalt hover:underline"
                    >
                      Access in Dashboard <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION F: How It Works
          ========================================================================= */}
      <section id="how-it-works" className="py-16 sm:py-24 border-b border-hairline bg-canvas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="code-chip">THE PIPELINE</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink-dark">
              How CyberShield Evaluates Threats
            </h2>
            <p className="text-base text-ink-muted leading-relaxed">
              A transparent, 5-stage heuristic workflow executed entirely inside your browser.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {workflowSteps.map((ws, idx) => (
              <div
                key={idx}
                className="border border-hairline rounded-xl p-5 bg-canvas flex flex-col justify-between space-y-3 hover:border-ink-dark/40 transition-colors"
              >
                <div>
                  <span className="font-mono text-2xl font-extrabold text-ink-faint block mb-2">
                    {ws.step}
                  </span>
                  <h3 className="text-base font-bold text-ink-dark mb-1">{ws.title}</h3>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                    {ws.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-surface-1/60 border border-hairline rounded-xl p-6 max-w-3xl mx-auto flex items-start gap-4">
            <Lock className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-ink-dark">Zero-Knowledge Local Processing</h4>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                CyberShield never transmits your submitted message text or URLs to remote servers for scanning. Analysis runs 100% in local memory using regular expressions, homoglyph normalizers, and syntactic URL parsers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION G: Risk Scoring Breakdown
          ========================================================================= */}
      <section id="scoring" className="py-16 sm:py-24 border-b border-hairline bg-surface-1/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="code-chip">METHODOLOGY</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink-dark">
              Deterministic Risk Scoring System
            </h2>
            <p className="text-base text-ink-muted leading-relaxed">
              Scores are calculated via reproducible formula: S = min(100, max(0, round((&Sigma; w_i) &times; C_context)))
            </p>
          </div>

          <div className="border border-hairline rounded-xl overflow-hidden bg-canvas shadow-flat">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-1 border-b border-hairline font-semibold text-ink-primary">
                <tr>
                  <th className="p-3.5">Score Range</th>
                  <th className="p-3.5">Classification Tier</th>
                  <th className="p-3.5">Operational Guidance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {scoringTiers.map((tier, idx) => (
                  <tr key={idx} className="hover:bg-surface-1/30">
                    <td className="p-3.5 font-mono font-bold text-ink-dark">{tier.range}</td>
                    <td className="p-3.5">
                      <Badge variant={tier.variant} size="md">
                        {tier.tier}
                      </Badge>
                    </td>
                    <td className="p-3.5 text-ink-muted leading-relaxed">{tier.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-xs text-ink-secondary space-y-1 bg-canvas border border-hairline rounded-lg p-4 leading-relaxed">
            <p>
              <strong>Important Clarification:</strong> CyberShield risk scores are heuristic assessments, not mathematically calibrated probabilities of fraud. A low score does not guarantee that an unknown sender is benign; advanced social engineering may bypass initial keyword patterns. Always verify through official channels.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION H: Privacy and Limitations
          ========================================================================= */}
      <section id="privacy" className="py-16 sm:py-24 border-b border-hairline bg-canvas">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="code-chip">GOVERNANCE & TRUST</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink-dark">
              Privacy Manifesto & Technical Limitations
            </h2>
            <p className="text-base text-ink-muted leading-relaxed">
              Transparent disclosure of what our platform does with your data, and what it cannot do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Privacy Manifesto */}
            <div className="border border-hairline rounded-xl p-6 bg-surface-1/30 space-y-3">
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-ink-dark">Our Privacy Commitments</h3>
              </div>
              <ul className="space-y-2.5 text-sm text-ink-muted">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Zero Message Logging:</strong> Submitted messages and URLs are never saved in database tables or logs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>No Third-Party AI APIs:</strong> Data is not sent to external LLMs or third-party intelligence services.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Anonymized Telemetry:</strong> Only voluntary, anonymous feedback ratings (helpful/unhelpful) are persisted.</span>
                </li>
              </ul>
            </div>

            {/* Technical Limitations */}
            <div className="border border-hairline rounded-xl p-6 bg-surface-1/30 space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <h3 className="text-lg font-bold text-ink-dark">Engineering Boundaries</h3>
              </div>
              <ul className="space-y-2.5 text-sm text-ink-muted">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold shrink-0 mt-0.5">•</span>
                  <span><strong>Zero Network Resolution:</strong> CyberShield never resolves or fetches URLs to protect you from server-side exploits.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold shrink-0 mt-0.5">•</span>
                  <span><strong>Metadata Analysis Only:</strong> Mobile evaluations inspect declared permissions, not compiled APK binary code.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold shrink-0 mt-0.5">•</span>
                  <span><strong>Not Law Enforcement:</strong> CyberShield cannot accept official crime reports. Report active crimes via 1930.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION I: Final Call to Action
          ========================================================================= */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-canvas to-surface-1/50 border-b border-hairline text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ink-dark text-canvas text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>PROTECT YOUR DIGITAL LIFE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-ink-dark leading-tight">
            Take the First Step Toward Safer Digital Decisions.
          </h2>

          <p className="text-base sm:text-lg text-ink-muted max-w-2xl mx-auto leading-relaxed">
            Create an account or sign in to triage suspicious communications, master defensive awareness, and access emergency response playbooks.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link to="/signup">
              <Button variant="primary" size="lg" className="text-base font-semibold px-8 shadow-sm">
                Get Started
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="text-base font-semibold px-8">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION J: Public Footer
          ========================================================================= */}
      <footer className="bg-canvas border-t border-hairline py-12 text-sm text-ink-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded bg-ink-dark text-canvas flex items-center justify-center">
                  <Shield className="h-4 w-4" />
                </div>
                <span className="font-bold text-base text-ink-dark">CyberShield</span>
              </div>
              <p className="text-sm leading-relaxed text-ink-muted">
                Citizen Threat Triage & Incident Escalation Engine. Built on transparent, explainable client-side heuristics.
              </p>
              <div className="flex items-center gap-1.5 text-xs text-ink-secondary">
                <Lock className="h-3.5 w-3.5 text-emerald-600" />
                <span>Zero data persistence. 100% in-memory processing.</span>
              </div>
            </div>

            {/* Platform Links */}
            <div className="space-y-2">
              <h4 className="font-semibold text-ink-primary text-xs uppercase tracking-wider">Features</h4>
              <ul className="space-y-1.5 text-sm">
                <li><a href="#features" className="hover:text-ink-dark">Message Analysis</a></li>
                <li><a href="#features" className="hover:text-ink-dark">URL Structure Parsing</a></li>
                <li><a href="#features" className="hover:text-ink-dark">Digital Arrest Guidance</a></li>
                <li><a href="#scoring" className="hover:text-ink-dark">Deterministic Scoring</a></li>
              </ul>
            </div>

            {/* Official Indian Resources */}
            <div className="space-y-2">
              <h4 className="font-semibold text-ink-primary text-xs uppercase tracking-wider">Emergency Resources</h4>
              <ul className="space-y-1.5 text-sm">
                <li>
                  <a href="tel:1930" className="text-error font-semibold hover:underline inline-flex items-center gap-1">
                    <PhoneCall className="h-3 w-3" /> Dial 1930 Helpline
                  </a>
                </li>
                <li>
                  <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-cobalt inline-flex items-center gap-1">
                    cybercrime.gov.in <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
                <li>
                  <a href="https://sancharsaathi.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-cobalt inline-flex items-center gap-1">
                    Chakshu Sanchar Saathi <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Account & Info */}
            <div className="space-y-2">
              <h4 className="font-semibold text-ink-primary text-xs uppercase tracking-wider">Get Started</h4>
              <ul className="space-y-1.5 text-sm">
                <li><Link to="/login" className="hover:text-ink-dark">Citizen Login</Link></li>
                <li><Link to="/signup" className="hover:text-ink-dark">Create Account</Link></li>
                <li><a href="#privacy" className="hover:text-ink-dark">Privacy Manifesto</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-hairline flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ink-secondary">
            <p>
              <strong>Disclaimer:</strong> CyberShield is an educational, heuristic threat triage engine. It does not ping external servers or decompile APKs. It is not an official government portal. In active emergencies, report immediately to official law enforcement via 1930.
            </p>
            <div className="shrink-0">
              &copy; {new Date().getFullYear()} CyberShield Enhanced MVP. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
