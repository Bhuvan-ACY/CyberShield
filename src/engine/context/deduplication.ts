import { ThreatIndicator } from '../types';

/**
 * Deduplicates triggered threat indicators:
 * 1. Collapses duplicate rule IDs so repeating keywords only increment internal match counts.
 * 2. Filters overlapping text spans, keeping the higher-weight rule.
 */
export function deduplicateIndicators(indicators: ThreatIndicator[]): ThreatIndicator[] {
  if (indicators.length <= 1) return [...indicators];

  // Map to hold unique rules by ruleId, taking highest weight if duplicate occurs
  const ruleMap = new Map<string, ThreatIndicator>();

  for (const item of indicators) {
    const existing = ruleMap.get(item.ruleId);
    if (!existing) {
      ruleMap.set(item.ruleId, item);
    } else {
      // If same rule triggered again, keep the one with longer/more specific evidence
      if (item.matchedEvidence.length > existing.matchedEvidence.length) {
        ruleMap.set(item.ruleId, item);
      }
    }
  }

  const uniqueList = Array.from(ruleMap.values());

  // Filter overlapping spans: if rule A and rule B span the exact same region, keep higher weight
  const filtered: ThreatIndicator[] = [];

  for (let i = 0; i < uniqueList.length; i++) {
    const current = uniqueList[i];
    let isSuppressed = false;

    if (current.startSpan !== undefined && current.endSpan !== undefined) {
      for (let j = 0; j < uniqueList.length; j++) {
        if (i === j) continue;
        const other = uniqueList[j];
        if (other.startSpan !== undefined && other.endSpan !== undefined) {
          // Check for exact or near-identical span
          const isExactSpan =
            current.startSpan === other.startSpan && current.endSpan === other.endSpan;
          if (isExactSpan && other.weight > current.weight) {
            isSuppressed = true;
            break;
          }
        }
      }
    }

    if (!isSuppressed) {
      filtered.push(current);
    }
  }

  return filtered;
}
