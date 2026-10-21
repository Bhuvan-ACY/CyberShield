import React from 'react';
import { AnalysisForm } from '../components/AnalysisForm';
import { Shield, Eye, Lock, AlertTriangle } from 'lucide-react';

export const AnalyzePage: React.FC = () => {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-surface-1 border border-hairline text-xs font-semibold text-ink-primary">
          <Shield className="h-3.5 w-3.5 text-ink-dark" />
          <span>Explainable Threat Triage Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink-primary">
          Analyze Suspicious Communications
        </h1>
        <p className="text-sm text-ink-muted leading-relaxed">
          Inspect text messages, phishing emails, extortion summons, URLs, or mobile app permissions against real-time heuristic detection rules.
        </p>
      </div>

      {/* Main Analysis Form */}
      <AnalysisForm />

      {/* Educational Advisory Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto pt-6">
        <div className="p-4 rounded-lg border border-hairline bg-canvas space-y-2">
          <div className="flex items-center gap-2 text-ink-dark font-semibold text-xs uppercase tracking-wider">
            <Lock className="h-4 w-4 text-emerald-600" />
            Zero-Knowledge Privacy
          </div>
          <p className="text-xs text-ink-muted leading-relaxed">
            All text and URLs are analyzed locally in your browser memory. We never store submissions in remote databases or transmit them to third-party AI models.
          </p>
        </div>

        <div className="p-4 rounded-lg border border-hairline bg-canvas space-y-2">
          <div className="flex items-center gap-2 text-ink-dark font-semibold text-xs uppercase tracking-wider">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            Digital Arrest Protection
          </div>
          <p className="text-xs text-ink-muted leading-relaxed">
            Detects CBI, Police, and Customs impersonation patterns. Learn why Indian law enforcement never issues arrest warrants over WhatsApp video calls.
          </p>
        </div>

        <div className="p-4 rounded-lg border border-hairline bg-canvas space-y-2">
          <div className="flex items-center gap-2 text-ink-dark font-semibold text-xs uppercase tracking-wider">
            <Eye className="h-4 w-4 text-cobalt" />
            Static URL Security
          </div>
          <p className="text-xs text-ink-muted leading-relaxed">
            We inspect domain structure, non-standard ports, and brand lookalikes without connecting to or executing malicious destination web servers.
          </p>
        </div>
      </div>
    </div>
  );
};
