import React from 'react';
import { ThreatIndicator } from '@/engine/types';
import { AccordionItem } from '@/components/ui/Accordion';
import { Badge } from '@/components/ui/Badge';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface FindingsAccordionProps {
  findings: ThreatIndicator[];
}

export const FindingsAccordion: React.FC<FindingsAccordionProps> = ({ findings }) => {
  if (findings.length === 0) {
    return (
      <div className="border border-hairline rounded-lg p-6 bg-canvas text-center space-y-2">
        <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto" />
        <h3 className="font-semibold text-sm text-ink-primary">No Suspicious Markers Identified</h3>
        <p className="text-xs text-ink-muted max-w-md mx-auto leading-relaxed">
          The submission did not match any known phishing patterns, digital arrest coercion language, lookalike domain lists, or high-hazard permissions.
        </p>
      </div>
    );
  }

  const severityBadgeMap = {
    informational: 'cobalt' as const,
    low: 'low' as const,
    moderate: 'moderate' as const,
    high: 'high' as const,
    critical: 'critical' as const,
  };

  return (
    <div className="space-y-3">
      {findings.map((finding) => (
        <AccordionItem
          key={finding.ruleId}
          id={finding.ruleId}
          defaultOpen={finding.severity === 'critical' || finding.severity === 'high'}
          title={
            <div className="flex items-center gap-2">
              <AlertCircle
                className={`h-4 w-4 shrink-0 ${
                  finding.severity === 'critical'
                    ? 'text-red-600'
                    : finding.severity === 'high'
                    ? 'text-orange-500'
                    : 'text-amber-500'
                }`}
              />
              <span>{finding.title}</span>
            </div>
          }
          subtitle={<span className="code-chip">{finding.ruleId}</span>}
          badge={
            <Badge variant={severityBadgeMap[finding.severity]} size="sm">
              {finding.severity.toUpperCase()}
            </Badge>
          }
        >
          <div className="space-y-3">
            {/* Matched Evidence quote */}
            <div>
              <span className="text-[11px] font-semibold text-ink-primary uppercase tracking-wider block mb-1">
                Matched Evidence Excerpt
              </span>
              <div className="bg-canvas border border-hairline rounded p-2.5 font-mono text-xs text-ink-dark overflow-x-auto select-all">
                "{finding.matchedEvidence}"
              </div>
            </div>

            {/* Explanation */}
            <div>
              <span className="text-[11px] font-semibold text-ink-primary uppercase tracking-wider block mb-0.5">
                Threat Analysis
              </span>
              <p className="text-xs text-ink-muted leading-relaxed">{finding.explanation}</p>
            </div>

            {/* Recommendation */}
            <div className="bg-surface-1 border border-hairline rounded p-2.5">
              <span className="text-[11px] font-bold text-ink-dark block mb-0.5">
                Recommended Action:
              </span>
              <p className="text-xs text-ink-primary leading-relaxed">{finding.recommendation}</p>
            </div>
          </div>
        </AccordionItem>
      ))}
    </div>
  );
};
