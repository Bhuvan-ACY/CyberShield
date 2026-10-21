import { ThreatIndicator } from '../types';

export interface ContextEvaluationResult {
  indicators: ThreatIndicator[];
  contextMultiplier: number;
  isEducationalOrAdvisory: boolean;
  hasCompoundRisk: boolean;
}

const ADVISORY_REGEX =
  /\b(beware\s+of|scam\s+alert|fraud\s+alert|caution:|advisory:|warning:|do\s+not\s+fall\s+for|fake\s+messages?\s+are|public\s+service\s+announcement|cyber\s+awareness)\b/i;

/**
 * Contextual evaluation:
 * - Detects advisory/educational phrasing and applies 0.4 attenuation
 * - Detects compounding multi-threat markers and applies 1.15 multiplier
 */
export function evaluateContext(
  text: string,
  deduplicatedIndicators: ThreatIndicator[]
): ContextEvaluationResult {
  let contextMultiplier = 1.0;
  let isEducational = false;
  let hasCompoundRisk = false;

  const modifiedIndicators = [...deduplicatedIndicators];

  // 1. Check for Educational / Warning Context
  if (text && ADVISORY_REGEX.test(text)) {
    isEducational = true;
    contextMultiplier = 0.4;

    modifiedIndicators.unshift({
      ruleId: 'INFO_EDUCATIONAL_CONTEXT',
      title: 'Educational or Scam Advisory Context Detected',
      category: 'general',
      weight: 0,
      severity: 'informational',
      matchedEvidence: text.match(ADVISORY_REGEX)?.[0] || 'Advisory keywords',
      explanation:
        'The text appears to discuss, warn against, or educate regarding a scam rather than execute one. The risk score has been adjusted accordingly.',
      recommendation:
        'Review the findings to ensure this text is truly an educational advisory and not a scam impersonating an advisory.',
    });
  } else {
    // 2. Compound Risk Evaluation: Phishing + Malicious URL or Digital Arrest + Extortion
    const categories = new Set(deduplicatedIndicators.map((ind) => ind.category));
    const ruleIds = new Set(deduplicatedIndicators.map((ind) => ind.ruleId));

    const isDigitalArrestCompound =
      ruleIds.has('RULE_ARREST_AGENCY') &&
      (ruleIds.has('RULE_ARREST_COERCION') || ruleIds.has('RULE_ARREST_ISOLATION') || ruleIds.has('RULE_ARREST_EXTORTION'));

    const isPhishUrlCompound =
      categories.has('phishing') && categories.has('url');

    if (isDigitalArrestCompound || isPhishUrlCompound) {
      hasCompoundRisk = true;
      contextMultiplier = 1.15;
    }
  }

  return {
    indicators: modifiedIndicators,
    contextMultiplier,
    isEducationalOrAdvisory: isEducational,
    hasCompoundRisk,
  };
}
