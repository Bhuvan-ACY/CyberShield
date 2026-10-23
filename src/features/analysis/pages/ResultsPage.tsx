import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAnalysis } from '../context/AnalysisContext';
import { ScoreGauge } from '../components/ScoreGauge';
import { FindingsAccordion } from '../components/FindingsAccordion';
import { ActionableChecklist } from '../components/ActionableChecklist';
import { FeedbackWidget } from '../components/FeedbackWidget';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, RotateCcw, Link2, Info } from 'lucide-react';

export const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentResult, clearAnalysis } = useAnalysis();

  if (!currentResult) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
        <div className="h-12 w-12 rounded-full bg-surface-1 border border-hairline flex items-center justify-center">
          <Info className="h-6 w-6 text-ink-muted" />
        </div>
        <h2 className="text-xl font-bold text-ink-primary">No Active Analysis Available</h2>
        <p className="text-xs text-ink-muted max-w-sm leading-relaxed">
          You have not submitted a threat to analyze or the previous ephemeral result was cleared.
        </p>
        <Link to="/app/analyze">
          <Button variant="primary">
            <ArrowLeft className="h-4 w-4" />
            Start New Threat Triage
          </Button>
        </Link>
      </div>
    );
  }

  const handleAnalyzeAnother = () => {
    clearAnalysis();
    navigate('/app/analyze');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-hairline">
        <div>
          <span className="code-chip mb-1">TRIAGE VERDICT</span>
          <h1 className="text-2xl font-extrabold text-ink-primary">Threat Assessment Report</h1>
          <p className="text-xs text-ink-muted">Analyzed: {currentResult.analyzedAt} IST</p>
        </div>

        <Button variant="outline" size="sm" onClick={handleAnalyzeAnother} className="shrink-0">
          <RotateCcw className="h-3.5 w-3.5" />
          Analyze Another Threat
        </Button>
      </div>

      {/* Radial Score Gauge & Classification */}
      <ScoreGauge
        score={currentResult.score}
        tier={currentResult.tier}
        isInconclusive={currentResult.isInconclusive}
        headline={currentResult.headline}
      />

      {/* Extracted URLs Section if any */}
      {currentResult.extractedUrls.length > 0 && (
        <div className="border border-hairline rounded-lg p-4 sm:p-5 bg-canvas space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-ink-dark uppercase tracking-wider">
            <Link2 className="h-4 w-4 text-cobalt" />
            Extracted Embedded Web Addresses ({currentResult.extractedUrls.length})
          </div>
          <div className="space-y-1.5">
            {currentResult.extractedUrls.map((url, i) => (
              <div
                key={i}
                className="bg-surface-1 border border-hairline rounded px-3 py-2 text-xs sm:text-sm font-mono text-ink-dark overflow-x-auto select-all break-all"
              >
                {url}
              </div>
            ))}
          </div>
          <p className="text-xs text-ink-muted">
            Analyzed for lookalike patterns and port anomalies. CyberShield does not establish network connections to these destinations.
          </p>
        </div>
      )}

      {/* Findings Breakdown */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <h3 className="font-bold text-lg text-ink-primary">
            Triggered Heuristic Indicators ({currentResult.findings.length})
          </h3>
          <span className="text-xs sm:text-sm text-ink-secondary">
            Context multiplier applied: {currentResult.contextMultiplier}x
          </span>
        </div>

        <FindingsAccordion findings={currentResult.findings} />
      </div>

      {/* Remedial Action Checklist */}
      <ActionableChecklist result={currentResult} />

      {/* Supabase Anonymous Feedback Telemetry */}
      <FeedbackWidget
        detectedCategory={currentResult.primaryCategory}
        assignedScore={currentResult.score}
      />

      {/* Mandatory Limitations Disclosure per PRD Section 7.2 */}
      <div className="border border-hairline rounded-lg p-5 bg-surface-1/40 space-y-2.5 text-xs text-ink-muted">
        <h4 className="font-bold text-ink-primary text-xs uppercase tracking-wider">
          Mandatory Analysis Scope & Limitations Disclosure
        </h4>
        <ul className="list-disc pl-4 space-y-1.5 leading-relaxed">
          {currentResult.limitations.map((limitation, i) => (
            <li key={i}>{limitation}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
