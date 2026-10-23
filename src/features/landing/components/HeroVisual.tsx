import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldAlert, AlertTriangle, CheckCircle2, Cpu } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

gsap.registerPlugin(ScrollTrigger);

export const HeroVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const hudBadgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current || !cardRef.current) return;

    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: 'power3.out' }
      );

      if (hudBadgeRef.current) {
        gsap.fromTo(
          hudBadgeRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.8, delay: 0.4, ease: 'back.out(1.7)' }
        );
      }

      // Scroll-driven subtle float parallax
      gsap.to(cardRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
        y: -40,
        ease: 'none',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-3xl mx-auto pt-6 pb-2 px-4">
      {/* Decorative ambient glow backdrop */}
      <div className="absolute inset-0 bg-gradient-to-r from-cobalt/10 via-amber-500/5 to-error/10 blur-3xl -z-10 rounded-full opacity-60 dark:opacity-40 pointer-events-none" />

      {/* Main Forensic Triage Interface Preview */}
      <div
        ref={cardRef}
        className="relative border border-hairline rounded-2xl bg-canvas p-5 sm:p-7 shadow-modal transition-colors"
      >
        {/* Window Chrome / Status Header */}
        <div className="flex items-center justify-between border-b border-hairline pb-4 mb-5 gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block shrink-0" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block shrink-0" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block shrink-0" />
            <span className="text-xs font-mono font-medium text-ink-muted ml-2 truncate max-w-[130px] sm:max-w-none">
              triage-engine // client_memory_session
            </span>
          </div>

          <div ref={hudBadgeRef} className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-500/10 border border-red-500/30 text-xs font-bold text-red-600 dark:text-red-400">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              THREAT ACTIVE
            </span>
          </div>
        </div>

        {/* Mockup Body: Flagged Incoming Scam SMS */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-1.5 text-xs text-ink-muted">
            <div className="flex flex-wrap items-center gap-2">
              <span className="code-chip">SMS HEADER: VK-SBIELEC</span>
              <span className="text-ink-secondary">Received 14:22 IST</span>
            </div>
            <span className="text-xs font-semibold text-error">Unverified Origin</span>
          </div>

          {/* The Deceptive Message Bubble with Forensic Callouts */}
          <div className="relative rounded-xl border border-hairline bg-surface-1/40 p-4 sm:p-5 space-y-3">
            <p className="text-sm sm:text-base text-ink-primary leading-relaxed font-sans">
              "Dear Citizen, Your electricity connection power will be{' '}
              <span className="bg-red-500/20 text-red-700 dark:text-red-300 font-semibold px-1 rounded underline decoration-red-500 decoration-wavy">
                disconnected tonight at 9:30 PM
              </span>{' '}
              from power office due to pending KYC bill.{' '}
              <span className="bg-amber-500/20 text-amber-800 dark:text-amber-200 font-semibold px-1 rounded">
                Update immediately
              </span>{' '}
              at{' '}
              <span className="font-mono text-xs sm:text-sm bg-surface-1 px-1.5 py-0.5 rounded border border-hairline text-cobalt font-bold underline break-all">
                http://sbipower-billpay.in/update
              </span>{' '}
              or call officer at 9876543210."
            </p>

            {/* Micro indicators detected */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-hairline text-xs">
              <span className="inline-flex items-center gap-1 text-red-600 dark:text-red-400 font-medium">
                <AlertTriangle className="h-3.5 w-3.5" />
                Artificial Time Urgency (+30)
              </span>
              <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
                <Cpu className="h-3.5 w-3.5" />
                Deceptive Lookalike Domain (+25)
              </span>
              <span className="inline-flex items-center gap-1 text-orange-600 dark:text-orange-400 font-medium">
                <ShieldAlert className="h-3.5 w-3.5" />
                Authority Impersonation (+25)
              </span>
            </div>
          </div>

          {/* Instant Analysis Result strip */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-hairline bg-surface-1/70">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold font-mono text-sm shadow-sm shrink-0">
                80
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-ink-primary">Very High Risk Tier</span>
                  <Badge variant="critical" size="sm">
                    CRITICAL
                  </Badge>
                </div>
                <p className="text-xs text-ink-muted">
                  3 compounding indicators. Pure client-side zero-retention analysis.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> 100% In-Memory
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
