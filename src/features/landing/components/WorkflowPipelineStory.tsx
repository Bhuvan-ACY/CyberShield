import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FileText, 
  Search, 
  Layers, 
  Calculator, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  Terminal
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

gsap.registerPlugin(ScrollTrigger);

interface StageData {
  number: string;
  id: string;
  title: string;
  shortDesc: string;
  icon: React.ElementType;
  badge: string;
  technicalDetails: string[];
  mockData: {
    heading: string;
    subheading: string;
    codeSnippet: string;
    previewTags: string[];
  };
}

const pipelineStages: StageData[] = [
  {
    number: '01',
    id: 'input',
    title: 'Citizen Input Submission',
    shortDesc: 'Paste suspicious SMS, WhatsApp messages, web URLs, or declared mobile app permissions directly into the triage interface.',
    icon: FileText,
    badge: 'Raw Telemetry Ingestion',
    technicalDetails: [
      'Zero remote transmissions; text kept in browser memory',
      'Multi-modal input support (Text messages, URLs, APK manifests)',
      'Sanitization and Unicode homoglyph normalization'
    ],
    mockData: {
      heading: 'INPUT PAYLOAD INGESTED',
      subheading: 'Source: SMS / Clipboard [248 chars]',
      codeSnippet: `"URGENT: SBI customer, electricity will be disconnected tonight at 9:30 PM due to unpaid bill. Update KYC immediately at http://sbi-power-bill.top/pay"`,
      previewTags: ['SMS Header: Unknown', 'Length: 142 chars', 'Encoding: UTF-8']
    }
  },
  {
    number: '02',
    id: 'heuristics',
    title: 'Rule-Based Pattern Detection',
    shortDesc: 'The pure TypeScript engine evaluates deterministic regex rules, keyword dictionaries, and structural syntax indicators in browser memory.',
    icon: Search,
    badge: 'Deterministic Heuristics',
    technicalDetails: [
      'Temporal urgency markers: "tonight", "immediately", "9:30 PM"',
      'Impersonation patterns: "SBI customer", "electricity power office"',
      'Lookalike link syntax: non-standard domain (.top) masquerading as utility'
    ],
    mockData: {
      heading: 'EVALUATING HEURISTIC MATCHERS',
      subheading: 'Engine: Pure TypeScript Client Heuristics',
      codeSnippet: `[RULE_01] URGENCY_PATTERN_DETECTED (Weight: +25)
[RULE_02] FINANCIAL_COERCION_FLAGGED (Weight: +30)
[RULE_03] SUSPICIOUS_TLD_TOP (Weight: +20)
[RULE_04] UNVERIFIED_SENDER_HEADER (Weight: +15)`,
      previewTags: ['4 Rules Fired', 'Zero False Positives Attenuation', 'Context: Finance']
    }
  },
  {
    number: '03',
    id: 'evidence',
    title: 'Structured Evidence Extraction',
    shortDesc: 'Matched patterns are extracted with exact quote excerpts, highlighting the deceptive wording and technical anomalies.',
    icon: Layers,
    badge: 'Evidence Isolation',
    technicalDetails: [
      'Pinpoints exact substrings triggering suspicion',
      'Provides human-readable explanations of why each pattern is risky',
      'Categorizes findings into Urgency, Impersonation, and Link Spoofing'
    ],
    mockData: {
      heading: 'STRUCTURED FORENSIC FINDINGS',
      subheading: 'Extracted Evidence Artifacts',
      codeSnippet: `Evidence 1: "disconnected tonight at 9:30 PM" -> High artificial urgency
Evidence 2: "Update KYC immediately" -> Credential / OTP solicitation
Evidence 3: "http://sbi-power-bill.top" -> Deceptive domain (.top TLD)`,
      previewTags: ['3 Matched Snippets', 'Explainable Excerpts', 'Audit Trail Ready']
    }
  },
  {
    number: '04',
    id: 'scoring',
    title: 'Deterministic Risk Scoring',
    shortDesc: 'Deduplicated weights are computed through a transparent mathematical formula, categorizing the threat into Low, Moderate, High, or Very High risk.',
    icon: Calculator,
    badge: 'Transparent Math',
    technicalDetails: [
      'Formula: S = min(100, max(0, round((Σ w_i) * C_context)))',
      'No black-box hallucination or stochastic model uncertainty',
      'Deterministic output: identical inputs produce identical scores every time'
    ],
    mockData: {
      heading: 'RISK SCORE CALCULATION',
      subheading: 'Formula: min(100, (25+30+20+15) * 1.0)',
      codeSnippet: `Raw Weight Sum: 90
Context Multiplier (C_context): 1.0
Calculated Threat Score: 85 / 100
Risk Tier: VERY HIGH RISK (75–100)`,
      previewTags: ['Score: 85/100', 'Tier: Very High', 'Deterministic']
    }
  },
  {
    number: '05',
    id: 'recommendations',
    title: 'Actionable Safety Recommendations',
    shortDesc: 'Generates specific, non-panicking guidance tailored to the threat type, including 1930 escalation and evidence preservation.',
    icon: ShieldCheck,
    badge: 'Citizen Defense Playbook',
    technicalDetails: [
      'Stop action: Do not click the deceptive link or call sender back',
      'Verification: Contact genuine electricity board via official consumer portal',
      'Escalation: Report fraudulent SMS to National Cyber Crime Helpline (1930)'
    ],
    mockData: {
      heading: 'CITIZEN DEFENSE PLAYBOOK',
      subheading: 'Prescribed Protective Steps',
      codeSnippet: `[STEP 1] DO NOT CLICK OR RESPOND: The link aims to harvest credentials.
[STEP 2] VERIFY INDEPENDENTLY: Check electricity bill on official DISCOM portal.
[STEP 3] REPORT TO 1930: Forward SMS to 1909 (Do Not Disturb) and cybercrime.gov.in.`,
      previewTags: ['1930 Helpline', 'Zero Panic Protocol', 'Forensics Preserved']
    }
  }
];

export const WorkflowPipelineStory: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const stagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Create scroll triggers for each stage block
      pipelineStages.forEach((_, idx) => {
        const stageEl = document.getElementById(`pipeline-stage-item-${idx}`);
        if (!stageEl) return;

        ScrollTrigger.create({
          trigger: stageEl,
          start: 'top 65%',
          end: 'bottom 65%',
          onEnter: () => setActiveStageIndex(idx),
          onEnterBack: () => setActiveStageIndex(idx),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const currentStage = pipelineStages[activeStageIndex];

  return (
    <section 
      ref={sectionRef} 
      id="how-it-works" 
      className="py-20 sm:py-28 border-b border-hairline bg-canvas relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-1 border border-hairline text-xs font-semibold text-ink-primary shadow-flat">
            <Terminal className="h-3.5 w-3.5 text-cobalt" />
            <span>THE 5-STAGE TECHNICAL PIPELINE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-ink-dark">
            How CyberShield Analyzes a Threat
          </h2>
          <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
            From raw input to transparent evidence scoring: inspect how our deterministic, client-side engine evaluates threats step by step.
          </p>
        </div>

        {/* 2-Column Coordinated Scroll Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Scrolling Stage Cards (7 Cols) */}
          <div ref={stagesContainerRef} className="lg:col-span-7 space-y-8">
            {pipelineStages.map((stage, idx) => {
              const IconComp = stage.icon;
              const isActive = activeStageIndex === idx;

              return (
                <div
                  key={stage.id}
                  id={`pipeline-stage-item-${idx}`}
                  onClick={() => setActiveStageIndex(idx)}
                  className={`cursor-pointer rounded-2xl border p-6 sm:p-7 transition-all duration-300 ${
                    isActive
                      ? 'border-ink-dark/80 bg-surface-1/60 shadow-modal scale-[1.01]'
                      : 'border-hairline bg-canvas hover:border-ink-dark/30 hover:bg-surface-1/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`h-11 w-11 rounded-xl flex items-center justify-center transition-colors ${
                        isActive ? 'bg-ink-dark text-canvas' : 'bg-surface-1 text-ink-muted'
                      }`}>
                        <IconComp className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="font-mono text-xs font-bold text-cobalt tracking-wider uppercase">
                          Stage {stage.number}
                        </span>
                        <h3 className="text-xl font-bold text-ink-dark">{stage.title}</h3>
                      </div>
                    </div>
                    <Badge variant={isActive ? 'default' : 'surface'} size="sm">
                      {stage.badge}
                    </Badge>
                  </div>

                  <p className="text-sm sm:text-base text-ink-muted leading-relaxed mb-4">
                    {stage.shortDesc}
                  </p>

                  <div className="space-y-1.5 border-t border-hairline/60 pt-3">
                    {stage.technicalDetails.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-xs text-ink-secondary">
                        <CheckCircle2 className={`h-3.5 w-3.5 shrink-0 ${isActive ? 'text-emerald-600' : 'text-ink-faint'}`} />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Terminal / Forensic Output Visualizer (5 Cols - Sticky on Desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-4">
            <div className="border border-hairline rounded-2xl bg-canvas shadow-modal overflow-hidden">
              {/* Terminal Window Bar */}
              <div className="bg-surface-1 px-4 py-3 border-b border-hairline flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500/70 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/70 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/70 inline-block" />
                  <span className="font-mono text-xs font-semibold text-ink-muted ml-2">
                    engine_pipeline // live_stage_{currentStage.number}
                  </span>
                </div>
                <span className="font-mono text-xs text-ink-secondary">STAGE {activeStageIndex + 1}/5</span>
              </div>

              {/* Terminal Content Screen */}
              <div className="p-5 sm:p-6 bg-surface-1/40 space-y-4 font-mono text-xs">
                <div>
                  <div className="flex items-center gap-2 text-cobalt font-bold">
                    <span className="h-2 w-2 rounded-full bg-cobalt animate-pulse" />
                    <span>{currentStage.mockData.heading}</span>
                  </div>
                  <div className="text-ink-muted mt-0.5">{currentStage.mockData.subheading}</div>
                </div>

                {/* Preformatted Output Box */}
                <div className="p-3.5 rounded-lg bg-black text-emerald-400 font-mono text-xs leading-relaxed border border-neutral-800 shadow-inner overflow-x-auto whitespace-pre-wrap break-all">
                  {currentStage.mockData.codeSnippet}
                </div>

                {/* Metadata Tags */}
                <div className="flex flex-wrap gap-2 pt-1 border-t border-hairline">
                  {currentStage.mockData.previewTags.map((tag, tIdx) => (
                    <span key={tIdx} className="px-2 py-0.5 rounded bg-surface-1 border border-hairline text-[11px] text-ink-secondary">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Zero-Knowledge Invariant Callout */}
            <div className="bg-surface-1/70 border border-hairline rounded-xl p-4 flex items-start gap-3 text-xs text-ink-secondary">
              <Lock className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-ink-dark block">Zero-Knowledge Invariant:</strong>
                All five stages execute 100% inside your device's browser memory. Your message text is never sent to external servers or logged.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
