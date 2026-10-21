import { ThreatIndicator } from '../types';

interface PhishRuleDef {
  id: string;
  title: string;
  weight: number;
  severity: ThreatIndicator['severity'];
  regex: RegExp;
  explanation: string;
  recommendation: string;
}

const PHISHING_RULES: PhishRuleDef[] = [
  {
    id: 'RULE_PHISH_OTP',
    title: 'Sensitive Credential / OTP Solicitation',
    weight: 35,
    severity: 'critical',
    regex: /\b(share|send|enter|reply with|provide|verify)\b.*?\b(otp|one[\s-]?time[\s-]?password|pin|cvv|net[\s-]?banking password|card details|login credentials)\b|\b(6[\s-]?digit code|4[\s-]?digit otp)\b/i,
    explanation:
      'The message explicitly requests one-time passwords (OTP), banking PINs, or security credentials. Legitimate institutions and banks never ask for OTPs or PINs via SMS, chat, or email.',
    recommendation:
      'Never share your OTP, PIN, or banking passwords with anyone, even if the caller claims to represent your bank or police.',
  },
  {
    id: 'RULE_PHISH_URGENCY',
    title: 'Artificial Urgency & Time Pressure',
    weight: 15,
    severity: 'moderate',
    regex: /\b(within\s+\d+\s+(hours?|mins?|minutes?)|immediately|urgent(?:ly)?|account\s+(?:will\s+be\s+)?(?:blocked|suspended|deactivated|closed)\s+today|action\s+required\s+now|last\s+chance|final\s+notice)\b/i,
    explanation:
      'The message uses psychological time pressure to bypass critical thinking and force hasty compliance before verification.',
    recommendation:
      'Pause and verify independently. Genuine bank or service alerts provide reasonable grace periods and never demand immediate action under panic.',
  },
  {
    id: 'RULE_PHISH_KYC',
    title: 'Deceptive KYC / Document Expiry Lure',
    weight: 25,
    severity: 'high',
    regex: /\b(kyc\s+(?:has\s+)?expired|update\s+(?:your\s+)?(?:kyc|pan\s+card|aadhaar)|pan\s+(?:is\s+)?blocked|aadhaar\s+(?:linking|verification)|electricity\s+(?:power\s+)?(?:will\s+be\s+)?disconnected|unpaid\s+electricity\s+bill|electricity\s+bill\s+(?:is\s+)?not\s+updated)\b/i,
    explanation:
      'Scammers impersonate banks or utility providers claiming your KYC, PAN card, or electricity account is suspended to manipulate you into opening malicious portals.',
    recommendation:
      'Never update KYC via SMS links or phone calls. Visit your bank branch or the official verified mobile banking application directly.',
  },
  {
    id: 'RULE_PHISH_FINANCIAL',
    title: 'Unsolicited Financial / Reward Lure',
    weight: 20,
    severity: 'moderate',
    regex: /\b(unauthorized\s+transaction|lottery\s+winner|won\s+(?:rs\.?|inr|cash|\$)|refund\s+(?:of\s+rs\.?|approved)|claim\s+(?:your\s+)?(?:reward|prize|cashback)|unpaid\s+electricity\s+bill)\b/i,
    explanation:
      'The message presents unsolicited lottery winnings, unearned refunds, or false debits designed to bait you into interacting with fraud links.',
    recommendation:
      'Do not click links offering unearned refunds or prizes. Check your bank statement directly through official banking channels.',
  },
];

/**
 * Evaluates phishing rules against normalized text string.
 */
export function evaluatePhishingRules(normalizedText: string): ThreatIndicator[] {
  const indicators: ThreatIndicator[] = [];

  for (const rule of PHISHING_RULES) {
    const match = normalizedText.match(rule.regex);
    if (match) {
      indicators.push({
        ruleId: rule.id,
        title: rule.title,
        category: 'phishing',
        weight: rule.weight,
        severity: rule.severity,
        matchedEvidence: match[0],
        explanation: rule.explanation,
        recommendation: rule.recommendation,
        startSpan: match.index,
        endSpan: match.index !== undefined ? match.index + match[0].length : undefined,
      });
    }
  }

  return indicators;
}
