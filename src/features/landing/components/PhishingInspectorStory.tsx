import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


import { Badge } from '@/components/ui/Badge';

gsap.registerPlugin(ScrollTrigger);

export const PhishingInspectorStory: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const highlight1Ref = useRef<HTMLSpanElement>(null);
  const highlight2Ref = useRef<HTMLSpanElement>(null);
  const highlight3Ref = useRef<HTMLSpanElement>(null);

  const [activeStage, setActiveStage] = useState<number>(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Scroll-driven progressive forensic highlighting
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          end: 'bottom 40%',
          scrub: 0.8,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.25) setActiveStage(0);
            else if (p < 0.5) setActiveStage(1);
            else if (p < 0.75) setActiveStage(2);
            else setActiveStage(3);
          },
        },
      });

      tl.fromTo(cardRef.current, { opacity: 0.6, y: 30 }, { opacity: 1, y: 0, duration: 1 })
        .to(highlight1Ref.current, { backgroundColor: 'rgba(239, 68, 68, 0.25)', color: '#ef4444', duration: 1 }, '+=0.5')
        .to(highlight2Ref.current, { backgroundColor: 'rgba(245, 158, 11, 0.25)', color: '#f59e0b', duration: 1 }, '+=0.5')
        .to(highlight3Ref.current, { backgroundColor: 'rgba(59, 130, 246, 0.25)', color: '#3b82f6', duration: 1 }, '+=0.5');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-20 sm:py-28 border-b border-hairline bg-surface-1/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="code-chip">STEP-BY-STEP FORENSICS</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-ink-dark">
            How CyberShield Inspects Suspicious Messages
          </h2>
          <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
            Scam messages are carefully engineered to evade casual reading. Scroll down to see how our calibrated heuristics identify deceptive patterns sentence by sentence.
          </p>
        </div>

        {/* 2-Column Interactive Visual Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Message Card with Dynamic Visual Highlighting (7 cols) */}
          <div className="lg:col-span-7">
            <div
              ref={cardRef}
              className="border border-hairline rounded-2xl bg-canvas p-6 sm:p-8 shadow-modal space-y-6"
            >
              {/* Message Header */}
              <div className="flex items-center justify-between border-b border-hairline pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-surface-1 flex items-center justify-center font-bold text-xs text-ink-dark border border-hairline">
                    SMS
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-ink-dark">VM-SBIINB (Alleged Bank Alert)</h4>
                    <p className="text-xs text-ink-secondary">Unauthenticated Sender Header</p>
                  </div>
                </div>

                <Badge variant={activeStage >= 3 ? 'critical' : activeStage >= 1 ? 'high' : 'surface'} size="sm">
                  {activeStage >= 3 ? 'VERY HIGH RISK' : activeStage >= 1 ? 'THREAT DETECTED' : 'INSPECTING'}
                </Badge>
              </div>

              {/* Message Text with Progressive Highlight Spans */}
              <div className="rounded-xl border border-hairline bg-surface-1/30 p-5 font-sans text-base sm:text-lg text-ink-primary leading-relaxed space-y-3">
                <p>
                  "Dear valued customer, your savings account #XXXX4892 has been suspended due to pending KYC.{' '}
                  <span
                    ref={highlight1Ref}
                    className={`transition-colors duration-300 px-1 rounded ${
                      activeStage >= 1 ? 'bg-red-500/20 text-red-600 dark:text-red-400 font-semibold' : ''
                    }`}
                  >
                    Action required within 2 hours or permanent deactivation
                  </span>
                  . Please{' '}
                  <span
                    ref={highlight2Ref}
                    className={`transition-colors duration-300 px-1 rounded ${
                      activeStage >= 2 ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 font-semibold' : ''
                    }`}
                  >
                    update your PAN card and NetBanking password immediately
                  </span>{' '}
                  at{' '}
                  <span
                    ref={highlight3Ref}
                    className={`transition-colors duration-300 font-mono text-sm px-1.5 py-0.5 rounded border border-hairline ${
                      activeStage >= 3 ? 'bg-cobalt/20 text-cobalt font-bold underline' : 'bg-surface-1'
                    }`}
                  >
                    https://onlinesbi.co.in.security-login.xyz/kyc
                  </span>
                  . Thank you, State Bank."
                </p>
              </div>

              {/* Progress Indicator Dots */}
              <div className="flex items-center justify-between text-xs text-ink-muted pt-2 border-t border-hairline">
                <span>Scroll down to advance forensic markers</span>
                <div className="flex items-center gap-1.5">
                  <span className={`h-2.5 w-2.5 rounded-full ${activeStage >= 1 ? 'bg-red-500' : 'bg-surface-muted'}`} />
                  <span className={`h-2.5 w-2.5 rounded-full ${activeStage >= 2 ? 'bg-amber-500' : 'bg-surface-muted'}`} />
                  <span className={`h-2.5 w-2.5 rounded-full ${activeStage >= 3 ? 'bg-cobalt' : 'bg-surface-muted'}`} />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Heuristic Explanations Breakdown (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div
              className={`p-5 rounded-xl border transition-all duration-300 ${
                activeStage >= 1
                  ? 'border-red-500/40 bg-red-500/5 shadow-flat'
                  : 'border-hairline bg-canvas opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="code-chip">RULE: PHISH_002</span>
                <span className="text-xs font-bold text-red-600 dark:text-red-400">+30 Weight</span>
              </div>
              <h4 className="font-bold text-sm text-ink-dark">Artificial Temporal Urgency</h4>
              <p className="text-xs text-ink-muted leading-relaxed mt-1">
                Scammers enforce tight deadlines ("within 2 hours") to trigger psychological panic and bypass rational critical verification.
              </p>
            </div>

            <div
              className={`p-5 rounded-xl border transition-all duration-300 ${
                activeStage >= 2
                  ? 'border-amber-500/40 bg-amber-500/5 shadow-flat'
                  : 'border-hairline bg-canvas opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="code-chip">RULE: PHISH_001</span>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400">+35 Weight</span>
              </div>
              <h4 className="font-bold text-sm text-ink-dark">Credential / PII Harvesting</h4>
              <p className="text-xs text-ink-muted leading-relaxed mt-1">
                Legitimate Indian financial institutions never demand password updates or PAN details via SMS links.
              </p>
            </div>

            <div
              className={`p-5 rounded-xl border transition-all duration-300 ${
                activeStage >= 3
                  ? 'border-cobalt/40 bg-cobalt/5 shadow-flat'
                  : 'border-hairline bg-canvas opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="code-chip">RULE: URL_003</span>
                <span className="text-xs font-bold text-cobalt">+35 Weight</span>
              </div>
              <h4 className="font-bold text-sm text-ink-dark">Deceptive Subdomain Masking</h4>
              <p className="text-xs text-ink-muted leading-relaxed mt-1">
                The URL prepends "onlinesbi.co.in" as a deceptive subdomain prefix, while the true domain is ".xyz", a high-frequency fraud TLD.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
