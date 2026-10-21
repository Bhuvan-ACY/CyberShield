import {
  ThreatAnalysisRequest,
  ThreatAssessmentResult,
  ThreatIndicator,
  ThreatCategory,
} from './types';
import { normalizeText } from './preprocessor/normalizer';
import { extractEmbeddedUrls } from './preprocessor/urlExtractor';
import { evaluatePhishingRules } from './rules/phishing';
import { evaluateDigitalArrestRules } from './rules/digital-arrest';
import { evaluateUrlRules } from './rules/url';
import { evaluateAppMetadataRules } from './rules/app-metadata';
import { deduplicateIndicators } from './context/deduplication';
import { evaluateContext } from './context/evaluator';
import { calculateRiskScore } from './scoring/calculator';
import { generateActionChecklist } from './explainability/recommendations';
import { MANDATORY_LIMITATIONS_DISCLOSURE } from './explainability/formatter';

export * from './types';
export * from './explainability/formatter';

/**
 * Primary Engine Orchestrator
 * Executes pure deterministic threat analysis in-memory without any network latency.
 */
export function runThreatAnalysis(request: ThreatAnalysisRequest): ThreatAssessmentResult {
  const rawFindings: ThreatIndicator[] = [];
  let extractedUrls: string[] = [];
  let wordCount = 0;
  let primaryCategory: ThreatCategory = 'general';
  let processedText = '';

  if (request.type === 'message') {
    primaryCategory = 'phishing';
    const text = request.messageText || '';
    const normalized = normalizeText(text);
    processedText = normalized.normalizedText;
    wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

    // 1. Phishing & Digital Arrest evaluations
    const phishIndicators = evaluatePhishingRules(normalized.normalizedText);
    const arrestIndicators = evaluateDigitalArrestRules(normalized.normalizedText);
    rawFindings.push(...phishIndicators, ...arrestIndicators);

    // If digital arrest indicators dominate, update primary category
    if (arrestIndicators.length > 0) {
      primaryCategory = 'digital_arrest';
    }

    // 2. Extract embedded URLs and run static structural URL analysis
    extractedUrls = extractEmbeddedUrls(text);
    for (const url of extractedUrls) {
      const urlIndicators = evaluateUrlRules(url);
      rawFindings.push(...urlIndicators);
    }
  } else if (request.type === 'url') {
    primaryCategory = 'url';
    const url = request.url || '';
    processedText = url;
    wordCount = url ? 1 : 0;
    extractedUrls = url ? [url] : [];

    const urlIndicators = evaluateUrlRules(url);
    rawFindings.push(...urlIndicators);
  } else if (request.type === 'app' && request.appMetadata) {
    primaryCategory = 'app_metadata';
    processedText = `${request.appMetadata.appName} ${request.appMetadata.installationSource} ${request.appMetadata.permissions.join(' ')}`;
    wordCount = request.appMetadata.permissions.length + 2;

    const appIndicators = evaluateAppMetadataRules(request.appMetadata);
    rawFindings.push(...appIndicators);
  }

  // 3. Deduplicate indicators
  const deduplicated = deduplicateIndicators(rawFindings);

  // 4. Contextual evaluation (Educational context / compound multiplier)
  const contextEval = evaluateContext(processedText, deduplicated);

  // 5. Score calculation and classification
  const scoreResult = calculateRiskScore(
    contextEval.indicators,
    contextEval.contextMultiplier,
    wordCount
  );

  // 6. Action checklist generation
  const actionChecklist = generateActionChecklist(contextEval.indicators, scoreResult.tier);

  return {
    score: scoreResult.score,
    tier: scoreResult.tier,
    headline: scoreResult.headline,
    summary: scoreResult.summary,
    isInconclusive: scoreResult.isInconclusive,
    contextMultiplier: contextEval.contextMultiplier,
    primaryCategory,
    findings: contextEval.indicators,
    extractedUrls,
    actionChecklist,
    limitations: MANDATORY_LIMITATIONS_DISCLOSURE,
    analyzedAt: new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
  };
}
