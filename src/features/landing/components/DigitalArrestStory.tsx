import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldAlert, Video, PhoneCall, AlertOctagon, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export const DigitalArrestStory: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoMockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current || !videoMockRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        videoMockRef.current,
        { opacity: 0, scale: 0.95, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: videoMockRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const coercionVectors = [
    {
      step: '1',
      title: 'False Authority Impersonation',
      desc: 'Criminals wear fake police uniforms and display fabricated CBI or Mumbai Customs identification badges over WhatsApp/Skype video.',
    },
    {
      step: '2',
      title: 'Fabricated Narcotics Allegations',
      desc: 'Victims are told their Aadhaar card was used to send illegal narcotics or contraband in an international courier consignment.',
    },
    {
      step: '3',
      title: 'Forced Isolation & Secrecy',
      desc: 'Victims are strictly instructed not to disconnect the call or alert family members under threat of immediate physical arrest.',
    },
    {
      step: '4',
      title: 'Fraudulent Escrow Demands',
      desc: 'Demands to transfer savings into a "Secret Verification Escrow Account" or "Court Clearance Account" to prove financial innocence.',
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 border-b border-hairline bg-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-xs font-bold text-red-600 dark:text-red-400">
            <AlertOctagon className="h-3.5 w-3.5" />
            CRITICAL CITIZEN SCAM PATTERN
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-ink-dark">
            Demystifying "Digital Arrest" Extortion
          </h2>
          <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
            There is no provision in Indian law for "digital arrest." Law enforcement officers never hold online video court trials or request financial deposits to prove innocence.
          </p>
        </div>

        {/* 2-Column Story: Fictional Video Call Mockup & Forensic Vectors */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Fictional Call Interface Visual (6 cols) */}
          <div className="lg:col-span-6" ref={videoMockRef}>
            <div className="border-2 border-red-500/40 rounded-2xl bg-black text-white p-5 sm:p-7 shadow-modal relative overflow-hidden space-y-5">
              {/* Fake Video Call Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500 animate-ping inline-block" />
                  <span className="font-mono text-xs text-red-400 uppercase font-bold tracking-wider">
                    SIMULATED EXTORTION CALL
                  </span>
                </div>
                <span className="font-mono text-xs text-neutral-400">Duration 18:42</span>
              </div>

              {/* Call Subject Visual */}
              <div className="rounded-xl bg-neutral-900 border border-neutral-800 p-6 text-center space-y-3">
                <div className="h-16 w-16 rounded-full bg-neutral-800 border-2 border-red-500/60 mx-auto flex items-center justify-center text-red-400">
                  <Video className="h-8 w-8" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white tracking-tight">
                    "Officer Rajesh Sharma (Alleged CBI Narcotics Unit)"
                  </h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Caller ID: +91 91234 56789 (Spoofed VOIP)
                  </p>
                </div>

                <div className="inline-block bg-red-950/80 border border-red-600/40 rounded px-3 py-1.5 text-xs text-red-300 font-bold break-words max-w-full">
                  DEMAND: "DO NOT DISCONNECT CALL — DIGITAL CUSTODY IN EFFECT"
                </div>
              </div>

              {/* Forensic Red Flags Box */}
              <div className="space-y-2 text-xs text-neutral-300">
                <div className="flex items-start gap-2 bg-neutral-900/60 p-2.5 rounded border border-neutral-800">
                  <ShieldAlert className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Red Flag 1:</strong> Official Indian police never conduct investigations or formal interrogations over Skype, WhatsApp, or Telegram video.
                  </span>
                </div>
                <div className="flex items-start gap-2 bg-neutral-900/60 p-2.5 rounded border border-neutral-800">
                  <ShieldAlert className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Red Flag 2:</strong> There is no concept of a "Court Clearance Account" or "RBI Verification Deposit."
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: The 4 Steps of Coercion & 1930 Guide CTA (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold tracking-tight text-ink-dark">
                The 4 Stages of Digital Arrest Coercion
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                By understanding their psychological playbook, citizens can instantly recognize the fraud and break the coercion loop without fear.
              </p>
            </div>

            <div className="space-y-3.5">
              {coercionVectors.map((v) => (
                <div
                  key={v.step}
                  className="flex items-start gap-3.5 p-3.5 rounded-xl border border-hairline bg-surface-1/40 hover:bg-surface-1/70 transition-colors"
                >
                  <div className="h-7 w-7 rounded-lg bg-ink-dark text-canvas flex items-center justify-center font-mono font-bold text-xs shrink-0">
                    {v.step}
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-ink-dark">{v.title}</h5>
                    <p className="text-xs text-ink-muted leading-relaxed mt-0.5">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Emergency Action Banner */}
            <div className="p-4 rounded-xl border border-amber-400/40 bg-amber-500/10 space-y-2.5">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-900 dark:text-amber-200">
                <PhoneCall className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <span>The Golden Hour Defense Protocol</span>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                If you or a family member have transferred money under coercion, immediately call India's National Cyber Crime Helpline at <strong>1930</strong>. Police can freeze the recipient mule account if reported within the first two hours.
              </p>
              <div className="pt-1">
                <Link to="/app/safety-guide">
                  <Button variant="secondary" size="sm" className="text-xs font-semibold">
                    View Emergency Escalation Playbook <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
