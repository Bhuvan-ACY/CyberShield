import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  GraduationCap, 
  Gamepad2, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight,
  MousePointerClick
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export const EducationStory: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current || !cardsRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
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
      className="py-20 sm:py-28 border-b border-hairline bg-surface-1/20 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-1 border border-hairline text-xs font-semibold text-ink-primary shadow-flat">
            <GraduationCap className="h-3.5 w-3.5 text-cobalt" />
            <span>CONTINUOUS CITIZEN READINESS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-ink-dark">
            Cybersecurity Awareness & Training
          </h2>
          <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
            Building digital resilience before scams happen. Sharpen your defensive intuition through hands-on simulations, real-world case studies, and structured quizzes.
          </p>
        </div>

        {/* 2 Educational Feature Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Practice Scam Simulator */}
          <div className="border border-hairline rounded-2xl bg-canvas p-6 sm:p-8 shadow-modal flex flex-col justify-between space-y-6 hover:shadow-halo transition-shadow">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-xl bg-ink-dark text-canvas flex items-center justify-center">
                  <Gamepad2 className="h-6 w-6" />
                </div>
                <Badge variant="surface" size="sm">
                  Interactive Practice
                </Badge>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-ink-dark">Interactive Scam Simulator</h3>
                <p className="text-sm sm:text-base text-ink-muted leading-relaxed mt-2">
                  Test your discernment against realistic simulated messages without exposing your real phone number or credentials. Click on hidden deception hotspots to reveal psychological triggers.
                </p>
              </div>

              {/* Fictional Mini Hotspot Demo Box */}
              <div className="rounded-xl border border-hairline bg-surface-1/40 p-4 space-y-3 text-xs">
                <div className="flex items-center justify-between text-ink-muted font-mono">
                  <span>SAMPLE SCENARIO: LOTTERY PHISHING</span>
                  <span className="flex items-center gap-1 text-cobalt font-semibold">
                    <MousePointerClick className="h-3.5 w-3.5" /> 3 Hotspots to Find
                  </span>
                </div>
                <div className="p-3 bg-canvas rounded-lg border border-hairline space-y-1.5">
                  <p className="text-ink-primary font-sans leading-relaxed">
                    "Congratulations! You won ₹25,00,000 in KBC Lucky Draw.{' '}
                    <span className="border-b-2 border-dashed border-red-500 text-red-600 dark:text-red-400 font-semibold cursor-help" title="Hotspot 1: Unsolicited Lottery Prize">
                      Claim before 6 PM
                    </span>{' '}
                    by paying ₹1,200 processing fee to registration officer."
                  </p>
                </div>
              </div>

              <div className="space-y-2 border-t border-hairline pt-3">
                <div className="flex items-center gap-2 text-xs text-ink-secondary">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Real-time feedback explaining manipulative language</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-ink-secondary">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Zero-risk sandbox environment</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-hairline">
              <Link to="/login">
                <Button variant="outline" size="md" className="w-full justify-center font-semibold text-sm">
                  Launch Scam Simulator
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Card 2: Threat Pattern Library & Quizzes */}
          <div className="border border-hairline rounded-2xl bg-canvas p-6 sm:p-8 shadow-modal flex flex-col justify-between space-y-6 hover:shadow-halo transition-shadow">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-xl bg-ink-dark text-canvas flex items-center justify-center">
                  <BookOpen className="h-6 w-6" />
                </div>
                <Badge variant="surface" size="sm">
                  Knowledge Hub & Quizzes
                </Badge>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-ink-dark">Awareness Hub & Readiness Quiz</h3>
                <p className="text-sm sm:text-base text-ink-muted leading-relaxed mt-2">
                  Learn the modus operandi of high-prevalence Indian cyber scam patterns. Take the 10-question adaptive assessment to gauge your family's cyber safety preparedness.
                </p>
              </div>

              {/* Advisory Topics List */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-surface-1/60 border border-hairline">
                  <div className="font-bold text-ink-dark">Digital Arrest Extortion</div>
                  <div className="text-ink-muted mt-0.5">Police & customs video impersonation</div>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-1/60 border border-hairline">
                  <div className="font-bold text-ink-dark">Electricity Bill Disconnection</div>
                  <div className="text-ink-muted mt-0.5">Fake power office KYC urgency</div>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-1/60 border border-hairline">
                  <div className="font-bold text-ink-dark">Courier & Customs Seizure</div>
                  <div className="text-ink-muted mt-0.5">Contraband allegations on Aadhaar</div>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-1/60 border border-hairline">
                  <div className="font-bold text-ink-dark">High-Hazard App APKs</div>
                  <div className="text-ink-muted mt-0.5">Accessibility & SMS interception</div>
                </div>
              </div>

              <div className="space-y-2 border-t border-hairline pt-3">
                <div className="flex items-center gap-2 text-xs text-ink-secondary">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Detailed breakdown of Indian cyber law provisions</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-ink-secondary">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Personalized remediation study links</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-hairline">
              <Link to="/login">
                <Button variant="outline" size="md" className="w-full justify-center font-semibold text-sm">
                  Explore Awareness Library
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
