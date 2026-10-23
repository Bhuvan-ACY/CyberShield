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
  Sparkles,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/features/theme';
import { useLenisScroll } from '@/hooks/useLenisScroll';

// Scroll-Driven Storytelling Section Components
import { HeroVisual } from '../components/HeroVisual';
import { ThreatLandscapeStory } from '../components/ThreatLandscapeStory';
import { PhishingInspectorStory } from '../components/PhishingInspectorStory';
import { DigitalArrestStory } from '../components/DigitalArrestStory';
import { WorkflowPipelineStory } from '../components/WorkflowPipelineStory';
import { ExplainableResultStory } from '../components/ExplainableResultStory';
import { SafetyActionsStory } from '../components/SafetyActionsStory';
import { EducationStory } from '../components/EducationStory';

export const LandingPage: React.FC = () => {
  // Initialize smooth momentum scrolling integrated with GSAP ScrollTrigger
  useLenisScroll();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#threats', label: 'Threats' },
    { href: '#phishing-analysis', label: 'Forensics' },
    { href: '#digital-arrest', label: 'Digital Arrest' },
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#scoring', label: 'Scoring' },
    { href: '#safety', label: 'Safety' },
  ];

  return (
    <div className="min-h-screen bg-canvas text-ink-primary font-sans antialiased selection:bg-surface-1">
      {/* =========================================================================
          EMERGENCY SAFETY BANNER (Indian Citizen Escalation)
          Always pitch black (#0a0a0a) across both light & dark themes
          ========================================================================= */}
      <div 
        id="safety-banner" 
        className="bg-[#0a0a0a] text-white text-xs py-1.5 px-4 text-center flex flex-wrap items-center justify-center gap-2 border-b border-[#282b3b]"
      >
        <AlertOctagon className="h-3.5 w-3.5 text-amber-400 shrink-0" />
        <span className="font-medium text-[11px] sm:text-xs text-neutral-300">
          Facing an active digital arrest scam or urgent financial fraud? Dial National Helpline <strong className="underline text-amber-300">1930</strong> immediately.
        </span>
        <a
          href="tel:1930"
          className="ml-1 sm:ml-2 inline-flex items-center gap-1 bg-amber-400 text-[#0a0a0a] px-2 py-0.5 rounded text-[11px] font-bold hover:bg-amber-300 transition-colors shadow-none shrink-0"
        >
          <PhoneCall className="h-3 w-3" />
          Call 1930
        </a>
      </div>

      {/* =========================================================================
          PUBLIC NAVIGATION HEADER - MINIMAL & REFINED
          ========================================================================= */}
      <header className="sticky top-0 z-50 bg-canvas/95 backdrop-blur-md border-b border-hairline shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Left: Brand Identity */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="h-8.5 w-8.5 sm:h-9 sm:w-9 rounded-lg bg-surface-1 border border-hairline flex items-center justify-center text-ink-dark group-hover:border-ink-muted/50 transition-colors shrink-0">
                <Shield className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
              </div>
              <span className="font-bold text-base sm:text-lg tracking-tight text-ink-dark">CyberShield</span>
            </Link>

            {/* Center: Public Informational Links */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-2.5 py-1 rounded-md text-xs font-medium text-ink-muted hover:text-ink-dark hover:bg-surface-1/60 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right: Auth Action Buttons & Theme Toggle */}
            <div className="hidden sm:flex items-center gap-2">
              <ThemeToggle size="sm" />
              <div className="h-3.5 w-px bg-hairline mx-0.5" />
              <Link
                to="/login"
                className="px-2.5 py-1 text-xs font-medium text-ink-muted hover:text-ink-dark hover:bg-surface-1/50 rounded-md transition-colors"
              >
                Sign In
              </Link>
              <Link to="/signup">
                <Button variant="primary" size="sm" className="h-7 px-3 text-xs font-medium rounded-md shadow-none">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Hamburger & Theme Toggle */}
            <div className="lg:hidden flex items-center gap-1.5">
              <ThemeToggle size="sm" />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 rounded-md text-ink-muted hover:text-ink-primary hover:bg-surface-1 focus:outline-none min-h-[36px] min-w-[36px] flex items-center justify-center"
                aria-label="Toggle Public Menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-hairline bg-canvas/98 backdrop-blur-md px-4 pt-2.5 pb-5 space-y-1 shadow-lg">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center px-3 py-2 rounded-md text-xs font-medium text-ink-muted hover:text-ink-dark hover:bg-surface-1/50"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2.5 mt-2 border-t border-hairline flex flex-col gap-2">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full justify-center h-8 text-xs font-medium rounded-md">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="sm" className="w-full justify-center h-8 text-xs font-medium rounded-md">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* =========================================================================
          SECTION 1 — HERO: INTRODUCING CYBERSHIELD
          ========================================================================= */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-hairline bg-gradient-to-b from-canvas via-canvas to-surface-1/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-1 border border-hairline text-xs font-semibold text-ink-primary shadow-flat max-w-full">
            <div className="flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-ink-dark" />
              <span>CITIZEN CYBERSECURITY PLATFORM</span>
            </div>
            <span className="hidden sm:inline text-ink-faint">|</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-medium">100% Client-Side In-Memory Engine</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-ink-dark leading-tight max-w-4xl mx-auto">
            Recognize Digital Threats. <br className="hidden sm:inline" />
            Respond with Confidence.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-ink-muted leading-relaxed max-w-3xl mx-auto">
            CyberShield helps citizens evaluate suspicious messages, deceptive links, digital arrest scam tactics, and risky application permissions through explainable, rule-based analysis.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link to="/signup">
              <Button variant="primary" size="lg" className="text-base font-semibold px-6 shadow-sm">
                Get Started
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <a href="#threats">
              <Button variant="outline" size="lg" className="text-base font-semibold px-6">
                Explore Story Below
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </a>
          </div>

          {/* Forensic Triage Interactive HUD Mockup */}
          <HeroVisual />

          {/* Heuristic Advisory Disclaimer */}
          <div className="pt-4 max-w-2xl mx-auto">
            <p className="text-xs text-ink-secondary bg-surface-1/70 border border-hairline rounded-lg py-2.5 px-4 leading-normal">
              <strong>Advisory Notice:</strong> CyberShield provides heuristic analysis and educational guidance based on known threat patterns. It is an advisory tool and does not guarantee complete security or replace official law enforcement intervention.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 — UNDERSTANDING THE DIGITAL THREAT LANDSCAPE
          ========================================================================= */}
      <ThreatLandscapeStory />

      {/* =========================================================================
          SECTION 3 — PHISHING AND SUSPICIOUS MESSAGE ANALYSIS
          ========================================================================= */}
      <PhishingInspectorStory />

      {/* =========================================================================
          SECTION 4 — DIGITAL ARREST SCAMS AND COERCIVE TACTICS
          ========================================================================= */}
      <DigitalArrestStory />

      {/* =========================================================================
          SECTION 5 — HOW CYBERSHIELD ANALYZES A THREAT (THE 5-STAGE PIPELINE)
          ========================================================================= */}
      <WorkflowPipelineStory />

      {/* =========================================================================
          SECTION 6 — EXPLAINABLE RISK ASSESSMENT
          ========================================================================= */}
      <ExplainableResultStory />

      {/* =========================================================================
          SECTION 7 — FROM THREAT DETECTION TO SAFER ACTIONS
          ========================================================================= */}
      <SafetyActionsStory />

      {/* =========================================================================
          SECTION 8 — CYBERSECURITY AWARENESS AND TRAINING
          ========================================================================= */}
      <EducationStory />

      {/* =========================================================================
          SECTION 9 — FINAL CALL TO ACTION
          ========================================================================= */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-canvas to-surface-1/50 border-b border-hairline text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ink-dark text-canvas text-xs font-semibold shadow-sm">
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
          SECTION 10 — PUBLIC FOOTER
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
                <li><a href="#threats" className="hover:text-ink-dark">Threat Categories</a></li>
                <li><a href="#phishing-analysis" className="hover:text-ink-dark">Message Forensics</a></li>
                <li><a href="#digital-arrest" className="hover:text-ink-dark">Digital Arrest Guidance</a></li>
                <li><a href="#how-it-works" className="hover:text-ink-dark">5-Stage Analysis Pipeline</a></li>
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
                <li><a href="#safety" className="hover:text-ink-dark">Safety Protocol</a></li>
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
