import { ThreatIndicator } from '../types';

interface DigitalArrestRuleDef {
  id: string;
  title: string;
  weight: number;
  severity: ThreatIndicator['severity'];
  regex: RegExp;
  explanation: string;
  recommendation: string;
}

const DIGITAL_ARREST_RULES: DigitalArrestRuleDef[] = [
  {
    id: 'RULE_ARREST_AGENCY',
    title: 'Law Enforcement / Regulatory Impersonation',
    weight: 35,
    severity: 'critical',
    regex: /\b(cbi|central\s+bureau\s+of\s+investigation|enforcement\s+directorate|ncb|narcotics\s+control\s+bureau|crime\s+branch|customs\s+department|mumbai\s+police|delhi\s+police|supreme\s+court|trai|rbi\s+officer)\b/i,
    explanation:
      'The message or caller claims to represent an Indian law enforcement or investigative agency (CBI, ED, Police, Customs). Impersonation of law enforcement is a hallmark of digital arrest syndicates.',
    recommendation:
      'Indian police and investigative agencies do not initiate investigations, issue arrest summons, or take statements via WhatsApp, Skype, or phone calls. Disconnect immediately.',
  },
  {
    id: 'RULE_ARREST_COERCION',
    title: 'Coercive Arrest / Legal Detention Threat',
    weight: 30,
    severity: 'high',
    regex: /\b(arrest\s+warrant|non[\s-]?bailable\s+warrant|asset\s+seizure|bank\s+account\s+freez(?:e|ing)|illegal\s+parcel|parcel\s+(?:is\s+)?seized|drugs\s+(?:found|seized)|passports?\s+(?:found|seized|and\s+contraband)|contraband|money\s+laundering\s+(?:case|investigation)|sim\s+card\s+disconnected\s+by\s+trai|police\s+will\s+arrest)\b/i,
    explanation:
      'The communication uses fabricated criminal allegations—such as illegal narcotics parcels, money laundering, or non-bailable arrest warrants—to instill terror and obedience.',
    recommendation:
      'Real warrants are served in person by uniformed officers with formal legal documentation. High court and police summons are never communicated through chat applications.',
  },
  {
    id: 'RULE_ARREST_ISOLATION',
    title: 'Video Call Isolation & Secrecy Demand',
    weight: 35,
    severity: 'critical',
    regex: /\b((?:skype|whatsapp|zoom)\s+video\s+call|stay\s+on\s+(?:the\s+)?call|do\s+not\s+hang\s+up|confidential\s+investigation|national\s+security\s+secrecy|do\s+not\s+(?:tell|inform)\s+(?:family|lawyer|anyone)|camera\s+must\s+remain\s+on)\b/i,
    explanation:
      'Scammers mandate continuous video surveillance via Skype or WhatsApp and forbid talking to family or lawyers. This psychological isolation prevents victims from seeking outside advice.',
    recommendation:
      'Disconnect the video call immediately. Turn off your camera, block the caller, and inform family members or local police.',
  },
  {
    id: 'RULE_ARREST_EXTORTION',
    title: 'Fund Transfer to "Safety Escrow" / Verification Account',
    weight: 40,
    severity: 'critical',
    regex: /\b(transfer\s+(?:money|funds|amount)\s+to\s+(?:[a-z]+\s+)*(?:rbi|government|escrow|verification|safety)(?:\s+[a-z]+)*\s+account|clearance\s+fee|refundable\s+security\s+deposit|asset\s+verification\s+account|temporary\s+bond|verification\s+deposit)\b/i,
    explanation:
      'The extorter demands immediate bank fund transfers into a supposed "RBI security account" or "police escrow" to clear your name. No government body in India operates such accounts.',
    recommendation:
      'Do not transfer any money. Indian government agencies and banks NEVER possess "secret safety accounts" to verify innocence. Dial 1930 immediately.',
  },
];

/**
 * Evaluates digital arrest rules against normalized text string.
 */
export function evaluateDigitalArrestRules(normalizedText: string): ThreatIndicator[] {
  const indicators: ThreatIndicator[] = [];

  for (const rule of DIGITAL_ARREST_RULES) {
    const match = normalizedText.match(rule.regex);
    if (match) {
      indicators.push({
        ruleId: rule.id,
        title: rule.title,
        category: 'digital_arrest',
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
