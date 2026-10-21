import { ThreatAssessmentResult } from '../types';

export const MANDATORY_LIMITATIONS_DISCLOSURE: string[] = [
  'Rule-Based Heuristic Evaluation: Analysis is performed locally using pattern-matching and structural checks. It does not execute live network crawling or decompile application binaries.',
  'No Safety Guarantee: Absence of detected red flags does not guarantee absolute safety. Novel attack vectors or zero-day phishing pages may not be identified.',
  'Zero Data Retention: Your submission is analyzed exclusively in your device browser RAM and is never stored on servers or written to disk.',
  'Informational Purpose: CyberShield is an educational triage utility. It does not constitute formal legal advice or an automated police FIR filing.',
];

/**
 * Generates clean, formatted plain text summary of an assessment for copying or incident reporting.
 */
export function formatAssessmentPlainText(result: ThreatAssessmentResult): string {
  const lines: string[] = [
    '=== CYBERSHIELD THREAT TRIAGE SUMMARY ===',
    `Date & Time: ${result.analyzedAt}`,
    `Calculated Risk Score: ${result.score}/100 [${result.tier.toUpperCase().replace('_', ' ')}]`,
    `Assessment: ${result.headline}`,
    '',
    '--- DETECTED INDICATORS ---',
  ];

  if (result.findings.length === 0) {
    lines.push('No suspicious indicators triggered.');
  } else {
    result.findings.forEach((finding, index) => {
      lines.push(`${index + 1}. [${finding.severity.toUpperCase()}] ${finding.title}`);
      lines.push(`   Matched Evidence: "${finding.matchedEvidence}"`);
      lines.push(`   Why this is risky: ${finding.explanation}`);
      lines.push(`   Action: ${finding.recommendation}`);
      lines.push('');
    });
  }

  if (result.extractedUrls.length > 0) {
    lines.push('--- EXTRACTED EMBEDDED URLS ---');
    result.extractedUrls.forEach((url, i) => lines.push(`${i + 1}. ${url}`));
    lines.push('');
  }

  lines.push('--- RECOMMENDED IMMEDIATE ACTIONS ---');
  result.actionChecklist.forEach((action, i) => lines.push(`${i + 1}. ${action}`));
  lines.push('');
  lines.push('Emergency Reporting: National Cyber Crime Helpline: 1930 | cybercrime.gov.in');
  lines.push('=========================================');

  return lines.join('\n');
}
