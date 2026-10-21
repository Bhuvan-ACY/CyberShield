import React, { useState } from 'react';
import { OFFICIAL_INDIAN_RESOURCES, IMMEDIATE_VICTIM_STEPS } from '../data/resources';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import {
  PhoneCall,
  ExternalLink,
  ShieldAlert,
  CheckSquare,
  Square,
  Camera,
} from 'lucide-react';

export const SafetyGuidePage: React.FC = () => {
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepNumber]: !prev[stepNumber],
    }));
  };

  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-red-50 border border-red-200 text-xs font-semibold text-error">
          <ShieldAlert className="h-3.5 w-3.5 text-error" />
          <span>Emergency Incident Escalation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink-primary">
          Safety Guide & Official Indian Reporting
        </h1>
        <p className="text-sm text-ink-muted leading-relaxed">
          Immediate, practical response steps for citizens facing active fraud, extortion, or unauthorized bank debits, connected to verified Indian authorities.
        </p>
      </div>

      {/* Emergency Callout Card: 1930 */}
      <div className="border-2 border-error/80 bg-red-50/50 rounded-lg p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <span className="code-chip bg-error text-canvas">CRITICAL EMERGENCY</span>
            <h2 className="text-xl sm:text-2xl font-bold text-ink-dark">
              National Cyber Crime Helpline: 1930
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted max-w-xl">
              Operated by the Indian Cyber Crime Coordination Centre (I4C), MHA. Dial 1930 immediately to block and freeze fraudulent transactions across Indian banks before the money leaves the financial system.
            </p>
          </div>

          <a href="tel:1930" className="shrink-0">
            <Button variant="danger" size="lg" className="w-full sm:w-auto shadow-md">
              <PhoneCall className="h-5 w-5" />
              Dial 1930 (Free Hotline)
            </Button>
          </a>
        </div>

        <div className="pt-3 border-t border-error/20 flex flex-wrap gap-4 text-xs text-ink-primary">
          <span><strong>Operates:</strong> 24 hours a day, 7 days a week</span>
          <span><strong>Languages:</strong> All major Indian regional languages</span>
          <span><strong>Coverage:</strong> All 36 States & Union Territories</span>
        </div>
      </div>

      {/* Immediate Incident Checklist */}
      <div className="space-y-4">
        <div>
          <span className="code-chip mb-1">INTERACTIVE GUIDE</span>
          <h2 className="text-xl font-bold text-ink-primary">Immediate Victim Action Checklist</h2>
          <p className="text-xs text-ink-muted">
            Tick off each critical task to ensure forensic preservation and financial containment.
          </p>
        </div>

        <div className="space-y-3">
          {IMMEDIATE_VICTIM_STEPS.map((step) => {
            const isDone = !!completedSteps[step.stepNumber];
            return (
              <div
                key={step.stepNumber}
                onClick={() => toggleStep(step.stepNumber)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  isDone
                    ? 'bg-surface-1/40 border-hairline opacity-75'
                    : 'bg-canvas border-hairline hover:shadow-halo'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 shrink-0 text-ink-primary">
                    {isDone ? (
                      <CheckSquare className="h-5 w-5 text-emerald-600" />
                    ) : (
                      <Square className="h-5 w-5 text-ink-muted" />
                    )}
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="code-chip">Step {step.stepNumber}</span>
                      <h4
                        className={`text-sm font-semibold ${
                          isDone ? 'line-through text-ink-faint' : 'text-ink-primary'
                        }`}
                      >
                        {step.title}
                      </h4>
                    </div>

                    <p className="text-xs text-ink-muted leading-relaxed">
                      {step.description}
                    </p>

                    <div className="text-[11px] font-medium text-cobalt bg-surface-1/60 rounded px-2.5 py-1 inline-block">
                      {step.actionLabel}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Forensic Evidence Checklist */}
      <div className="border border-hairline rounded-lg p-6 bg-canvas space-y-4">
        <div className="flex items-center gap-2">
          <Camera className="h-5 w-5 text-ink-dark" />
          <h3 className="text-base font-bold text-ink-primary">Forensic Evidence Documentation Guide</h3>
        </div>
        <p className="text-xs text-ink-muted leading-relaxed">
          Before blocking fraudsters or deleting apps, gather these essential items required by cyber police officers when filing your formal complaint:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-3.5 rounded-lg bg-surface-1/40 border border-hairline space-y-1">
            <span className="font-semibold text-xs text-ink-dark block">1. Financial Evidence</span>
            <ul className="list-disc pl-4 text-xs text-ink-muted space-y-0.5">
              <li>Bank statement showing debit entry</li>
              <li>12-digit UTR (Unique Transaction Reference) number</li>
              <li>Suspect's UPI handle, QR code, or beneficiary account number</li>
            </ul>
          </div>

          <div className="p-3.5 rounded-lg bg-surface-1/40 border border-hairline space-y-1">
            <span className="font-semibold text-xs text-ink-dark block">2. Communication Evidence</span>
            <ul className="list-disc pl-4 text-xs text-ink-muted space-y-0.5">
              <li>Uncropped screenshots of WhatsApp or Skype chat histories</li>
              <li>Call logs showing timestamps and suspect's phone numbers</li>
              <li>Raw SMS text containing sender headers (e.g. AX-SBINB)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Verified Official Directory Grid */}
      <div className="space-y-4">
        <div>
          <span className="code-chip mb-1">OFFICIAL DIRECTORY</span>
          <h2 className="text-xl font-bold text-ink-primary">Verified Indian Escalation Portals</h2>
          <p className="text-xs text-ink-muted">
            Direct access to official law enforcement, telecommunications, and national security portals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {OFFICIAL_INDIAN_RESOURCES.map((resource) => (
            <Card key={resource.id} hoverable className="flex flex-col justify-between">
              <div>
                <CardHeader className="pb-3 border-none">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <Badge variant="surface" size="sm">
                      {resource.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-base leading-snug">{resource.name}</CardTitle>
                  <p className="text-[11px] font-medium text-ink-secondary mt-0.5">
                    {resource.authority}
                  </p>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-xs text-ink-muted leading-relaxed">
                    {resource.purpose}
                  </p>
                </CardContent>
              </div>

              <div className="pt-4 border-t border-surface-1 mt-4">
                {resource.isDialable ? (
                  <a href={resource.contactUrlOrPhone}>
                    <Button variant="danger" size="sm" className="w-full">
                      <PhoneCall className="h-3.5 w-3.5" />
                      Direct Dial 1930
                    </Button>
                  </a>
                ) : (
                  <a href={resource.contactUrlOrPhone} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="w-full">
                      Visit Official Portal
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Disclaimers Notice */}
      <Alert variant="warning" title="Informational Notice on Law Enforcement Reporting">
        CyberShield is an independent, client-side educational threat triage engine. It does not automatically file police complaints or generate official First Information Reports (FIRs). To initiate official police action and freeze stolen money, you must contact 1930 or file a report at <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="underline font-semibold">cybercrime.gov.in</a>.
      </Alert>
    </div>
  );
};
