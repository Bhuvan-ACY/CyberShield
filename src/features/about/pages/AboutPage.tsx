import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Lock, Calculator, AlertTriangle, FileText } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const scoringTiers = [
    { range: '0–24', tier: 'Low Risk', variant: 'low' as const, meaning: 'No or negligible suspicious markers identified. Routine caution applies.' },
    { range: '25–49', tier: 'Moderate Risk', variant: 'moderate' as const, meaning: 'Isolated suspicious indicators or non-standard structures. Independent verification warranted.' },
    { range: '50–74', tier: 'High Risk', variant: 'high' as const, meaning: 'Multiple strong indicators of deception, artificial urgency, or lookalike domains. Do not engage.' },
    { range: '75–100', tier: 'Very High Risk', variant: 'critical' as const, meaning: 'Severe, compounding markers of malicious extortion, digital arrest, or credential harvesting.' },
  ];

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-surface-1 border border-hairline text-xs font-semibold text-ink-primary">
          <FileText className="h-3.5 w-3.5 text-ink-dark" />
          <span>Transparency & Methodology</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink-primary">
          About CyberShield Architecture & Privacy
        </h1>
        <p className="text-sm text-ink-muted leading-relaxed">
          Full technical disclosure of our heuristic scoring formula, privacy guarantees, zero-fetch URL inspection model, and operational limitations.
        </p>
      </div>

      {/* Section 1: Transparent Mathematical Scoring Model */}
      <Card className="shadow-flat border-hairline space-y-4">
        <CardHeader className="pb-3 border-none">
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-cobalt" />
            <CardTitle className="text-lg">Deterministic Risk Scoring Model</CardTitle>
          </div>
          <p className="text-xs text-ink-muted">
            CyberShield rejects opaque "black-box" AI confidence scores. Every risk rating is derived from a transparent, reproducible formula.
          </p>
        </CardHeader>

        <CardContent className="space-y-4 pt-0 text-sm sm:text-base text-ink-primary leading-relaxed">
          <div className="bg-surface-1/60 border border-hairline rounded-lg p-4 font-mono text-sm sm:text-base text-ink-dark">
            S = min(100, max(0, round(( &Sigma; w_i ) &times; C_context )))
          </div>

          <p>
            Where:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-ink-muted">
            <li><strong>w_i:</strong> The static calibrated weight (5 to 40) assigned to the i-th deduplicated triggered rule.</li>
            <li><strong>C_context:</strong> The contextual multiplier (0.4 for educational/advisory text, 1.15 for compounding multi-category extortion, 1.0 baseline).</li>
            <li><strong>Deduplication:</strong> Repeating instances of the same keyword do not inflate the score. If rules share the exact same text span, only the highest-weight indicator fires.</li>
          </ul>

          {/* Classification Tiers Table */}
          <div className="pt-2">
            <span className="font-semibold text-sm text-ink-primary uppercase tracking-wider block mb-2">
              Qualitative Risk Classification Tiers
            </span>
            <div className="border border-hairline rounded-lg overflow-x-auto touch-pan-x">
              <table className="w-full min-w-[500px] text-left text-sm">
                <thead className="bg-surface-1 border-b border-hairline font-semibold text-ink-primary">
                  <tr>
                    <th className="p-3">Score Range</th>
                    <th className="p-3">Classification</th>
                    <th className="p-3">Operational Meaning</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline">
                  {scoringTiers.map((t, idx) => (
                    <tr key={idx} className="hover:bg-surface-1/20">
                      <td className="p-3 font-mono font-medium">{t.range}</td>
                      <td className="p-3">
                        <Badge variant={t.variant} size="md">
                          {t.tier}
                        </Badge>
                      </td>
                      <td className="p-3 text-ink-muted">{t.meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Zero-Retention Privacy Manifesto */}
      <Card className="shadow-flat border-hairline space-y-4">
        <CardHeader className="pb-3 border-none">
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-emerald-600" />
            <CardTitle className="text-xl">Zero-Retention Privacy Manifesto</CardTitle>
          </div>
          <p className="text-sm text-ink-muted">
            How we protect digital citizens under extreme stress without collecting sensitive personal data.
          </p>
        </CardHeader>

        <CardContent className="space-y-3 pt-0 text-sm sm:text-base text-ink-muted leading-relaxed">
          <p>
            When citizens face active cyber extortion or suspicious messages, they may unintentionally input sensitive credentials, personal phone numbers, or private communications. CyberShield is architected specifically to guarantee zero surveillance:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li><strong>Zero Database Logging:</strong> Your submitted text, links, and metadata are held strictly in temporary browser memory. Nothing is written to cloud storage or relational tables.</li>
            <li><strong>No Third-Party AI / LLM APIs:</strong> We do not dispatch your personal messages to commercial AI APIs or remote intelligence providers.</li>
            <li><strong>No Tracking / Marketing Pixels:</strong> We employ zero advertising trackers, behavioral cookies, or session recorders.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Section 3: Technical Limitations & Disclaimers */}
      <Card className="shadow-flat border-hairline space-y-4">
        <CardHeader className="pb-3 border-none">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <CardTitle className="text-xl">Engineering & Detection Limitations</CardTitle>
          </div>
          <p className="text-sm text-ink-muted">
            Responsible cybersecurity disclosure: what the Enhanced MVP can and cannot do.
          </p>
        </CardHeader>

        <CardContent className="space-y-3 pt-0 text-sm sm:text-base text-ink-muted leading-relaxed">
          <p>
            While CyberShield achieves high precision on known scam templates and structural URL anomalies, users must be aware of its boundaries:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li><strong>Zero Network Resolution (SSRF Defense):</strong> To protect you from malicious server exploits, we never establish network connections to submitted links. Therefore, cloaked multi-hop redirects or dynamic HTML payloads cannot be inspected.</li>
            <li><strong>Metadata Analysis Only:</strong> Mobile app assessment evaluates declared permissions and distribution sources. It does not perform binary reverse-engineering or APK bytecode disassembly.</li>
            <li><strong>Absence of Threat is Not Proof of Safety:</strong> Sophisticated spear-phishing or zero-day tactics may bypass heuristic regex patterns. Always verify critical requests directly through trusted, verified channels.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
