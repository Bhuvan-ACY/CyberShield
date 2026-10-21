import { ThreatIndicator, RiskTier } from '../types';

/**
 * Builds a prioritized checklist of actionable safety steps based on detected indicators.
 */
export function generateActionChecklist(
  indicators: ThreatIndicator[],
  tier: RiskTier
): string[] {
  const steps: string[] = [];
  const ruleIds = new Set(indicators.map((i) => i.ruleId));

  // High urgency steps for Digital Arrest
  if (ruleIds.has('RULE_ARREST_AGENCY') || ruleIds.has('RULE_ARREST_COERCION') || ruleIds.has('RULE_ARREST_ISOLATION')) {
    steps.push('Disconnect the video or audio call immediately. Do not be intimidated by fake uniforms or legal threats.');
    steps.push('Indian law enforcement agencies NEVER issue arrest warrants or conduct investigations over Skype/WhatsApp.');
    steps.push('Do not transfer any money to "escrow", "police clearance", or "RBI verification" accounts under any pretext.');
    steps.push('Call the National Cyber Crime Helpline at 1930 immediately to report the extortion attempt.');
  }

  // Phishing / Credential Theft steps
  if (ruleIds.has('RULE_PHISH_OTP')) {
    steps.push('Do NOT share the OTP or click confirmation links. If you already shared an OTP, contact your bank immediately to freeze your account/cards.');
  }

  if (ruleIds.has('RULE_PHISH_KYC')) {
    steps.push('Do not update KYC details via SMS or WhatsApp links. Only update KYC through your official banking portal or physical branch.');
  }

  // URL steps
  if (ruleIds.has('RULE_URL_LOOKALIKE') || ruleIds.has('RULE_URL_IP_HOST') || ruleIds.has('RULE_URL_SUSP_TLD')) {
    steps.push('Do not open the link or enter login credentials on this website. It is an unverified lookalike destination.');
  }

  // App Sideloading steps
  if (ruleIds.has('RULE_APP_SOURCE') || ruleIds.has('RULE_APP_ACCESSIBILITY') || ruleIds.has('RULE_APP_SMS')) {
    steps.push('Uninstall the APK application immediately. Revoke Accessibility and SMS permissions in your Android Settings.');
  }

  // General hygiene steps based on tier
  if (tier === 'very_high' || tier === 'high') {
    steps.push('Document evidence: Take screenshots of sender numbers, message text, and caller IDs for official reporting.');
    steps.push('Report suspicious communication to the Department of Telecommunications Chakshu portal (sancharsaathi.gov.in/sfc/).');
  } else if (steps.length === 0) {
    steps.push('Always confirm unexpected communications by contacting the institution via its official customer support number.');
    steps.push('Keep mobile and browser security software up to date.');
  }

  return Array.from(new Set(steps));
}
