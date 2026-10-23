import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  PauseCircle, 
  Search, 
  KeyRound, 
  Ban, 
  Camera, 
  PhoneCall, 
  ArrowRight, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

interface SafetyStep {
  number: string;
  title: string;
  actionText: string;
  icon: React.ElementType;
  badge: string;
  isEmergency?: boolean;
}

const safetySteps: SafetyStep[] = [
  {
    number: '01',
    title: 'Pause Before Responding',
    actionText: 'Scammers deliberately manufacture urgent artificial deadlines ("disconnected tonight", "arrest in 1 hour"). Disconnect the call or close the message immediately.',
    icon: PauseCircle,
    badge: 'Neutralize Panic',
  },
  {
    number: '02',
    title: 'Verify via Independent Channels',
    actionText: 'Never dial numbers or click links included in the suspicious message. Look up your electricity board or bank on your utility bill or official portal directly.',
    icon: Search,
    badge: 'Independent Verification',
  },
  {
    number: '03',
    title: 'Never Share OTPs or Passwords',
    actionText: 'Bank managers, police officers, and court judges will never request your one-time password (OTP), UPI PIN, or net-banking password under any circumstance.',
    icon: KeyRound,
    badge: 'Credential Shield',
  },
  {
    number: '04',
    title: 'Refuse Secret Escrow Transfers',
    actionText: 'Indian law enforcement does not operate "Supreme Court Verification Accounts" or "RBI Escrow Accounts." Refuse demands to transfer money to prove innocence.',
    icon: Ban,
    badge: 'Zero Financial Escrow',
  },
  {
    number: '05',
    title: 'Preserve Forensic Evidence',
    actionText: 'Take clear screenshots of caller IDs, WhatsApp profile images, forged notices, SMS headers (e.g., VK-SBIELEC), and transaction reference IDs (UTR).',
    icon: Camera,
    badge: 'Evidence Integrity',
  },
  {
    number: '06',
    title: 'Act Within the Golden Hour (1930)',
    actionText: 'If money was transferred, immediately dial 1930 (National Cyber Crime Helpline) within 2 hours to freeze illicit fund movement across banking rails.',
    icon: PhoneCall,
    badge: 'Rapid Escalation',
    isEmergency: true,
  },
];

export const SafetyActionsStory: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current || !cardsContainerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsContainerRef.current?.children || [],
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="safety" 
      className="py-20 sm:py-28 border-b border-hairline bg-canvas relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>ACTIONABLE INCIDENT ESCALATION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-ink-dark">
            From Detection to Safer Decisions
          </h2>
          <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
            Receiving a high threat assessment can feel overwhelming. Follow this step-by-step citizen protocol to protect your funds, identity, and peace of mind.
          </p>
        </div>

        {/* 6 Action Cards Grid */}
        <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {safetySteps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <div
                key={idx}
                className={`rounded-2xl border p-6 flex flex-col justify-between space-y-4 transition-all ${
                  step.isEmergency
                    ? 'border-amber-500/50 bg-amber-500/5 shadow-modal ring-1 ring-amber-500/20'
                    : 'border-hairline bg-surface-1/30 hover:border-ink-dark/30 hover:bg-surface-1/60'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-extrabold text-ink-faint">
                      {step.number}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                      step.isEmergency
                        ? 'bg-amber-500 text-black'
                        : 'bg-surface-1 border border-hairline text-ink-secondary'
                    }`}>
                      {step.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${
                      step.isEmergency
                        ? 'bg-amber-500 text-black'
                        : 'bg-ink-dark text-canvas'
                    }`}>
                      <IconComp className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-ink-dark">{step.title}</h3>
                  </div>

                  <p className="text-sm text-ink-muted leading-relaxed">
                    {step.actionText}
                  </p>
                </div>

                {step.isEmergency && (
                  <div className="pt-3 border-t border-amber-500/20 flex items-center justify-between">
                    <a
                      href="tel:1930"
                      className="inline-flex items-center gap-2 text-sm font-bold text-amber-600 dark:text-amber-400 hover:underline"
                    >
                      <PhoneCall className="h-4 w-4" /> Dial 1930 Now
                    </a>
                    <a
                      href="https://cybercrime.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-ink-muted hover:text-ink-dark inline-flex items-center gap-1"
                    >
                      cybercrime.gov.in <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Detailed Safety Playbook Callout */}
        <div className="border border-hairline rounded-2xl bg-surface-1/50 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto shadow-flat">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-ink-dark">Need comprehensive response playbooks?</h4>
            <p className="text-sm text-ink-muted leading-relaxed">
              Explore step-by-step recovery guides for SIM swap, unauthorized banking debits, and identity spoofing.
            </p>
          </div>
          <Link to="/login" className="shrink-0">
            <Button variant="outline" size="md" className="font-semibold text-sm">
              Open Emergency Guide
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
