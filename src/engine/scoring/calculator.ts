import { ThreatIndicator, RiskTier } from '../types';

export interface ScoreCalculationResult {
  score: number;
  tier: RiskTier;
  headline: string;
  summary: string;
  isInconclusive: boolean;
}

/**
 * Calculates normalized 0-100 risk score and maps to qualitative classification tier.
 */
export function calculateRiskScore(
  indicators: ThreatIndicator[],
  contextMultiplier: number,
  wordCount: number
): ScoreCalculationResult {
  // If no indicators and word count is very small, flag as inconclusive
  if (indicators.length === 0 && wordCount < 3) {
    return {
      score: 0,
      tier: 'low',
      headline: 'Inconclusive Assessment',
      summary:
        'The submitted content contains insufficient text or context for deterministic heuristic evaluation. Please provide a more complete message, URL, or details.',
      isInconclusive: true,
    };
  }

  // If no indicators triggered on normal text
  if (indicators.length === 0) {
    return {
      score: 0,
      tier: 'low',
      headline: 'No Immediate Threat Indicators Detected',
      summary:
        'Our heuristic rules did not identify known credential theft patterns, digital arrest markers, deceptive URLs, or high-hazard permissions in this submission.',
      isInconclusive: false,
    };
  }

  // Sum of individual rule weights
  const rawSum = indicators.reduce((acc, ind) => acc + ind.weight, 0);

  // Apply context multiplier and clamp strictly to [0, 100]
  const calculatedScore = Math.min(100, Math.max(0, Math.round(rawSum * contextMultiplier)));

  let tier: RiskTier = 'low';
  let headline = '';
  let summary = '';

  if (calculatedScore >= 75) {
    tier = 'very_high';
    headline = 'Severe Threat Warning (Imminent Deception / Extortion)';
    summary =
      'High-confidence indicators of malicious extortion, digital arrest, or severe credential theft detected. Extreme caution required.';
  } else if (calculatedScore >= 50) {
    tier = 'high';
    headline = 'High Probability Scam / Threat Detected';
    summary =
      'Multiple strong indicators of deception, urgent lures, or suspicious links identified. Do not comply with requested actions.';
  } else if (calculatedScore >= 25) {
    tier = 'moderate';
    headline = 'Moderate Risk — Suspicious Elements Present';
    summary =
      'Some suspicious patterns or non-standard structures were identified. Verify independently through official channels.';
  } else {
    tier = 'low';
    headline = 'Low Threat Probability';
    summary =
      'Only minimal or non-critical indicators were identified. Always exercise standard cybersecurity hygiene.';
  }

  return {
    score: calculatedScore,
    tier,
    headline,
    summary,
    isInconclusive: false,
  };
}
