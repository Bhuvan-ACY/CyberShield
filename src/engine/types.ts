/**
 * Core Domain Contracts for CyberShield Threat Engine
 * Must remain 100% decoupled from React/DOM for deterministic testing.
 */

export type ThreatCategory = 'phishing' | 'digital_arrest' | 'url' | 'app_metadata' | 'general';

export type SeverityLevel = 'informational' | 'low' | 'moderate' | 'high' | 'critical';

export type RiskTier = 'low' | 'moderate' | 'high' | 'very_high';

export interface ThreatIndicator {
  ruleId: string;
  title: string;
  category: ThreatCategory;
  weight: number;
  severity: SeverityLevel;
  matchedEvidence: string;
  explanation: string;
  recommendation: string;
  startSpan?: number;
  endSpan?: number;
}

export interface ThreatAssessmentResult {
  score: number; // 0 to 100 integer
  tier: RiskTier;
  headline: string;
  summary: string;
  isInconclusive: boolean;
  contextMultiplier: number;
  primaryCategory: ThreatCategory;
  findings: ThreatIndicator[];
  extractedUrls: string[];
  actionChecklist: string[];
  limitations: string[];
  analyzedAt: string;
}

export interface AppMetadataPayload {
  appName: string;
  packageId?: string;
  installationSource:
    | 'Google Play Store'
    | 'Apple App Store'
    | 'Direct APK Download / Web'
    | 'WhatsApp / Telegram Link'
    | 'Unknown / Third-Party';
  permissions: string[];
  claimedPublisher?: string;
}

export type AnalysisInputType = 'message' | 'url' | 'app';

export interface ThreatAnalysisRequest {
  type: AnalysisInputType;
  messageText?: string;
  url?: string;
  appMetadata?: AppMetadataPayload;
}
