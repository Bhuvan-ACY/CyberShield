import React, { useState } from 'react';
import { ThreatAssessmentResult } from '@/engine/types';
import { formatAssessmentPlainText } from '@/engine';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { Button } from '@/components/ui/Button';
import { Check, Copy, PhoneCall, ExternalLink, ShieldAlert } from 'lucide-react';

interface ActionableChecklistProps {
  result: ThreatAssessmentResult;
}

export const ActionableChecklist: React.FC<ActionableChecklistProps> = ({ result }) => {
  const [completedItems, setCompletedItems] = useState<Record<number, boolean>>({});
  const { isCopied, copy } = useCopyToClipboard();

  const toggleItem = (index: number) => {
    setCompletedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleCopySummary = async () => {
    const text = formatAssessmentPlainText(result);
    await copy(text);
  };

  return (
    <div className="border border-hairline rounded-lg bg-canvas p-6 space-y-6 shadow-flat">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-surface-1">
        <div>
          <h3 className="font-bold text-base text-ink-primary">Incident Response Checklist</h3>
          <p className="text-xs text-ink-muted">
            Recommended defensive countermeasures based on detected threat indicators.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleCopySummary}
          className="shrink-0"
        >
          {isCopied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-600" />
              Summary Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy Incident Summary
            </>
          )}
        </Button>
      </div>

      {/* Interactive Checkbox Items */}
      <div className="space-y-3">
        {result.actionChecklist.map((step, idx) => {
          const isDone = !!completedItems[idx];
          return (
            <div
              key={idx}
              onClick={() => toggleItem(idx)}
              className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors select-none ${
                isDone
                  ? 'bg-surface-1/40 border-hairline text-ink-faint line-through'
                  : 'bg-canvas border-hairline hover:bg-surface-1/30 text-ink-primary'
              }`}
            >
              <div
                className={`h-4 w-4 rounded mt-0.5 flex items-center justify-center border transition-colors shrink-0 ${
                  isDone
                    ? 'bg-ink-dark border-ink-dark text-canvas'
                    : 'border-hairline bg-canvas'
                }`}
              >
                {isDone && <Check className="h-3 w-3" />}
              </div>
              <span className="text-xs sm:text-sm leading-relaxed">{step}</span>
            </div>
          );
        })}
      </div>

      {/* Escalation Section */}
      <div className="bg-surface-1/50 rounded-lg p-4 border border-hairline space-y-3">
        <div className="flex items-center gap-2 text-ink-dark font-semibold text-xs tracking-wider uppercase">
          <ShieldAlert className="h-4 w-4 text-error" />
          Official Incident Escalation (India)
        </div>
        <p className="text-xs text-ink-muted leading-relaxed">
          If you have transferred funds or shared banking OTPs, contact the National Cyber Crime Helpline immediately. Police can coordinate with banks to freeze recipient escrow wallets within the golden hour.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <a href="tel:1930">
            <Button variant="danger" size="sm">
              <PhoneCall className="h-3.5 w-3.5" />
              Call Helpline 1930
            </Button>
          </a>
          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="sm">
              <ExternalLink className="h-3.5 w-3.5" />
              cybercrime.gov.in
            </Button>
          </a>
          <a
            href="https://sancharsaathi.gov.in/sfc/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="sm">
              <ExternalLink className="h-3.5 w-3.5" />
              DoT Chakshu
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};
