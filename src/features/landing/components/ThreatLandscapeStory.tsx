import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldAlert, Globe, Smartphone, MessageSquareWarning, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

interface ThreatCardData {
  id: string;
  title: string;
  categoryTag: string;
  badgeVariant: 'critical' | 'high' | 'moderate' | 'low';
  icon: React.ElementType;
  fictionalExemplar: string;
  analysisDescription: string;
  forensicVector: string;
}

const threatCategories: ThreatCardData[] = [
  {
    id: 'phishing',
    title: 'Phishing & Credential Harvesting',
    categoryTag: 'Social Engineering',
    badgeVariant: 'critical',
    icon: MessageSquareWarning,
    fictionalExemplar: 'SMS: "Dear SBI customer, your YONO account is locked. Update KYC at link..."',
    analysisDescription:
      'Impersonates trusted national banks, utility boards, or telecom providers using synthetic urgency to trick victims into entering passwords and 2FA OTPs.',
    forensicVector: 'Analyzes urgency multipliers, unverified SMS sender headers, and credential request keywords.',
  },
  {
    id: 'digital-arrest',
    title: 'Digital Arrest & Coercive Summons',
    categoryTag: 'Psychological Extortion',
    badgeVariant: 'critical',
    icon: ShieldAlert,
    fictionalExemplar: 'WhatsApp Video: "CBI Officer Sharma — Narcotics parcel seized in your name in Mumbai."',
    analysisDescription:
      'Criminal syndicates impersonate police, customs, or court judges over video calls. They forge official letterheads and place victims under fake "digital custody" until funds are transferred.',
    forensicVector: 'Identifies illegal video trial demands, fake narcotics charges, and court clearance escrow transfers.',
  },
  {
    id: 'deceptive-urls',
    title: 'Deceptive Lookalike URLs & Domain Spoofing',
    categoryTag: 'Structural Exploitation',
    badgeVariant: 'high',
    icon: Globe,
    fictionalExemplar: 'URL: http://cybercrime.gov.in.portal-verify-auth.xyz:8080/report',
    analysisDescription:
      'Multi-level subdomains and typo-squatted domains that mimic legitimate portals (.gov.in or banking domains) while routing traffic to fraudulent endpoints.',
    forensicVector: 'Evaluates lookalike subdomains, suspicious TLDs, and dangerous non-standard ports via zero-network parsing.',
  },
  {
    id: 'app-permissions',
    title: 'High-Hazard Sideloaded App Permissions',
    categoryTag: 'Device Exploitation',
    badgeVariant: 'moderate',
    icon: Smartphone,
    fictionalExemplar: 'APK: "PM-Kisan-Update.apk" declaring BIND_ACCESSIBILITY_SERVICE & READ_SMS',
    analysisDescription:
      'Deceptive APKs distributed outside official app stores that abuse Android Accessibility and SMS permissions to silently capture one-time banking passcodes.',
    forensicVector: 'Inspects declared Android manifest metadata against high-hazard banking trojan permission pairings.',
  },
];

export const ThreatLandscapeStory: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 border-b border-hairline bg-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="code-chip">THREAT TAXONOMY</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-ink-dark">
            The Digital Threat Landscape Citizens Face
          </h2>
          <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
            CyberShield is purpose-built to recognize the specific social engineering vectors, coercive tactics, and technical exploits targeting Indian citizens today.
          </p>
        </div>

        {/* 4 Coordinated Threat Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {threatCategories.map((threat, idx) => {
            const Icon = threat.icon;
            return (
              <div
                key={threat.id}
                ref={(el) => (cardsRef.current[idx] = el)}
                className="relative rounded-2xl border border-hairline bg-surface-1/30 p-6 sm:p-8 flex flex-col justify-between hover:border-ink-dark/40 transition-colors shadow-flat"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="h-11 w-11 rounded-xl bg-ink-dark text-canvas flex items-center justify-center shadow-sm">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="code-chip">{threat.categoryTag}</span>
                      <Badge variant={threat.badgeVariant} size="sm">
                        {threat.badgeVariant.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-ink-dark">
                    {threat.title}
                  </h3>

                  {/* Fictional Exemplar Quote Box */}
                  <div className="p-3.5 rounded-lg border border-hairline bg-canvas font-mono text-xs text-ink-secondary leading-relaxed border-l-4 border-l-amber-500">
                    <span className="text-[10px] uppercase font-bold text-ink-faint block mb-1">
                      Real-world exemplar pattern:
                    </span>
                    "{threat.fictionalExemplar}"
                  </div>

                  <p className="text-sm text-ink-muted leading-relaxed">
                    {threat.analysisDescription}
                  </p>
                </div>

                <div className="pt-5 border-t border-hairline mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <span className="text-ink-secondary">
                    <strong>Detection Vector:</strong> {threat.forensicVector}
                  </span>
                  <Link
                    to="/signup"
                    className="inline-flex items-center gap-1 font-semibold text-cobalt hover:underline shrink-0"
                  >
                    Triage In App <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
