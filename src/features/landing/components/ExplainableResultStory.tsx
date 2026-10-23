import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ShieldAlert, 
  Scale, 
  Calculator, 
  Layers, 
  Info
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

gsap.registerPlugin(ScrollTrigger);

const scoringTiers = [
  {
    range: '0–24',
    tier: 'Low Risk',
    variant: 'low' as const,
    color: '#16a34a',
    meaning: 'Negligible suspicious patterns detected. Standard caution and vigilance apply.',
  },
  {
    range: '25–49',
    tier: 'Moderate Risk',
    variant: 'moderate' as const,
    color: '#ca8a04',
    meaning: 'Isolated suspicious indicators present. Independent verification through trusted channels strongly recommended.',
  },
  {
    range: '50–74',
    tier: 'High Risk',
    variant: 'high' as const,
    color: '#ea580c',
    meaning: 'Multiple strong indicators of deception, urgency, or lookalike patterns. Do not click links, send money, or share OTPs.',
  },
  {
    range: '75–100',
    tier: 'Very High Risk',
    variant: 'critical' as const,
    color: '#ba1a1a',
    meaning: 'Compounding severe markers of digital arrest extortion, credential harvesting, or dangerous app permissions. Disconnect immediately.',
  },
];

export const ExplainableResultStory: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gaugeCardRef = useRef<HTMLDivElement>(null);
  const evidenceCardRef = useRef<HTMLDivElement>(null);
  const tiersTableRef = useRef<HTMLDivElement>(null);

  // SVG Gauge calculations (Score = 78)
  const score = 78;
  const radius = 64;
  const strokeWidth = 9;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const strokeDashoffset = circumference - progress;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      if (gaugeCardRef.current && evidenceCardRef.current) {
        tl.fromTo(
          gaugeCardRef.current,
          { opacity: 0, y: 30, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power2.out' }
        ).fromTo(
          evidenceCardRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          '-=0.4'
        );
      }

      if (tiersTableRef.current) {
        gsap.fromTo(
          tiersTableRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: tiersTableRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="scoring" 
      className="py-20 sm:py-28 border-b border-hairline bg-surface-1/20 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-1 border border-hairline text-xs font-semibold text-ink-primary shadow-flat">
            <Scale className="h-3.5 w-3.5 text-cobalt" />
            <span>TRANSPARENT FORENSIC ASSESSMENT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-ink-dark">
            Explainable Risk Scoring
          </h2>
          <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
            No unexplainable AI scores or black-box predictions. Every CyberShield assessment is backed by transparent formulas, matched text quotes, and exact rule weights.
          </p>
        </div>

        {/* 2-Column Illustrative Result Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Radial Score Gauge & Metric Breakdown (5 Cols) */}
          <div ref={gaugeCardRef} className="lg:col-span-5 border border-hairline rounded-2xl bg-canvas p-6 sm:p-7 shadow-modal space-y-6">
            <div className="flex items-center justify-between border-b border-hairline pb-4">
              <div>
                <span className="code-chip">ASSESSMENT VERDICT</span>
                <h3 className="text-xl font-bold text-ink-dark mt-1">Calculated Threat Level</h3>
              </div>
              <Badge variant="critical" size="md">
                Very High Risk
              </Badge>
            </div>

            {/* Radial SVG Gauge Mockup */}
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center py-2">
              <div className="relative flex items-center justify-center">
                <svg width="150" height="150" className="transform -rotate-90">
                  {/* Background Track */}
                  <circle
                    cx="75"
                    cy="75"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    className="text-surface-1"
                  />
                  {/* Progress Arc */}
                  <circle
                    cx="75"
                    cy="75"
                    r={radius}
                    stroke="#ba1a1a"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                {/* Score Number in Center */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl sm:text-4xl font-extrabold text-ink-dark font-mono">
                    {score}
                  </span>
                  <span className="text-[11px] font-semibold text-ink-muted uppercase tracking-wider">
                    / 100
                  </span>
                </div>
              </div>

              {/* Tier & Headline Summary */}
              <div className="space-y-2 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-red-600 dark:text-red-400 font-bold">
                  <ShieldAlert className="h-5 w-5 shrink-0" />
                  <span>Immediate Action Required</span>
                </div>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                  Multiple compounding indicators of deception, artificial urgency, and lookalike domain spoofing were identified.
                </p>
                <div className="text-xs font-mono text-ink-secondary">
                  Confidence: <span className="text-ink-primary font-semibold">Deterministic 100%</span>
                </div>
              </div>
            </div>

            {/* Mathematical Formula Preview */}
            <div className="p-4 rounded-xl bg-surface-1/60 border border-hairline space-y-1.5 font-mono text-xs">
              <div className="flex items-center gap-2 text-ink-primary font-bold">
                <Calculator className="h-3.5 w-3.5 text-cobalt" />
                <span>Deterministic Scoring Formula:</span>
              </div>
              <div className="text-cobalt bg-canvas px-2.5 py-1.5 rounded border border-hairline text-center font-bold">
                S = min(100, max(0, round((&Sigma; w_i) &times; C_context)))
              </div>
              <p className="text-[11px] text-ink-secondary leading-normal font-sans">
                Where w_i are deduplicated heuristic rule weights and C_context is the situational attenuation factor.
              </p>
            </div>
          </div>

          {/* Right Column: Matched Evidence Excerpts & Prescribed Next Steps (7 Cols) */}
          <div ref={evidenceCardRef} className="lg:col-span-7 space-y-6">
            <div className="border border-hairline rounded-2xl bg-canvas p-6 sm:p-7 shadow-modal space-y-5">
              <div className="flex items-center justify-between border-b border-hairline pb-4">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-cobalt" />
                  <h3 className="text-lg font-bold text-ink-dark">Matched Evidence & Rule Weights</h3>
                </div>
                <span className="text-xs font-mono text-ink-muted">3 Verified Flags</span>
              </div>

              {/* Matched Finding 1 */}
              <div className="p-3.5 rounded-xl border border-red-500/30 bg-red-500/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
                    High Artificial Urgency (Weight: +25)
                  </span>
                  <Badge variant="critical" size="sm">Severe</Badge>
                </div>
                <blockquote className="text-xs sm:text-sm font-mono text-ink-primary border-l-2 border-red-500 pl-2.5 py-0.5 bg-canvas/70 rounded-r">
                  "disconnected tonight at 9:30 PM"
                </blockquote>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Legitimate utility companies provide written disconnection notices days in advance; immediate nightly disconnection threats are hallmark coercive triggers.
                </p>
              </div>

              {/* Matched Finding 2 */}
              <div className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                    Credential / KYC Harvesting (Weight: +30)
                  </span>
                  <Badge variant="high" size="sm">Elevated</Badge>
                </div>
                <blockquote className="text-xs sm:text-sm font-mono text-ink-primary border-l-2 border-amber-500 pl-2.5 py-0.5 bg-canvas/70 rounded-r">
                  "Update immediately at..."
                </blockquote>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Directing users to third-party portals to "verify KYC" or "update credentials" bypasses official banking channels to steal login credentials.
                </p>
              </div>

              {/* Matched Finding 3 */}
              <div className="p-3.5 rounded-xl border border-cobalt/30 bg-cobalt/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cobalt uppercase tracking-wider">
                    Deceptive Top-Level Domain (Weight: +20)
                  </span>
                  <Badge variant="surface" size="sm">Structural</Badge>
                </div>
                <blockquote className="text-xs sm:text-sm font-mono text-ink-primary border-l-2 border-cobalt pl-2.5 py-0.5 bg-canvas/70 rounded-r break-all">
                  "http://sbi-power-bill.top"
                </blockquote>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Synthesizes banking acronyms with low-cost disposable TLDs (.top) to evade security filters.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Classification Tiers Table */}
        <div ref={tiersTableRef} className="border border-hairline rounded-2xl overflow-hidden bg-canvas shadow-flat space-y-0">
          <div className="bg-surface-1 p-4 border-b border-hairline flex items-center justify-between">
            <h3 className="text-base font-bold text-ink-dark">Operational Risk Scoring Tiers</h3>
            <span className="text-xs text-ink-muted font-mono">Calibrated Range 0–100</span>
          </div>

          <div className="overflow-x-auto touch-pan-x">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="bg-surface-1/40 border-b border-hairline text-ink-primary font-semibold text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-3.5">Score Range</th>
                  <th className="p-3.5">Classification Tier</th>
                  <th className="p-3.5">Operational Guidance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {scoringTiers.map((tier, idx) => (
                  <tr key={idx} className="hover:bg-surface-1/30 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-ink-dark">{tier.range}</td>
                    <td className="p-3.5">
                      <Badge variant={tier.variant} size="md">
                        {tier.tier}
                      </Badge>
                    </td>
                    <td className="p-3.5 text-xs sm:text-sm text-ink-muted leading-relaxed">
                      {tier.meaning}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Disclaimer / Honesty Box */}
        <div className="flex items-start gap-3 p-4 rounded-xl border border-hairline bg-surface-1/40 text-xs text-ink-secondary">
          <Info className="h-4 w-4 text-cobalt shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Advisory Precision Notice:</strong> CyberShield risk scores are heuristic assessments calculated from structural and lexical patterns, not mathematical probabilities of fraud. A low score does not guarantee safety when dealing with targeted, novel social engineering. Always cross-verify through official consumer helplines.
          </p>
        </div>
      </div>
    </section>
  );
};
