import { ThreatIndicator, AppMetadataPayload } from '../types';

/**
 * Evaluates mobile application permissions and installation sources.
 * Note: CyberShield performs metadata & heuristic risk evaluation, not binary APK decompilation.
 */
export function evaluateAppMetadataRules(metadata: AppMetadataPayload): ThreatIndicator[] {
  const indicators: ThreatIndicator[] = [];

  const isOfficialStore =
    metadata.installationSource === 'Google Play Store' ||
    metadata.installationSource === 'Apple App Store';

  // 1. RULE_APP_SOURCE: Non-official installation source
  if (!isOfficialStore) {
    indicators.push({
      ruleId: 'RULE_APP_SOURCE',
      title: 'Untrusted / Sideloaded Installation Source',
      category: 'app_metadata',
      weight: 35,
      severity: 'high',
      matchedEvidence: metadata.installationSource,
      explanation:
        'The application is distributed via direct APK download, web links, or messaging apps rather than verified Google Play Protect or Apple App Store distribution channels.',
      recommendation:
        'Uninstall the APK immediately. Only install applications directly from the Google Play Store or Apple App Store.',
    });
  }

  const permissions = new Set(metadata.permissions.map((p) => p.toUpperCase().trim()));

  // 2. RULE_APP_ACCESSIBILITY: Accessibility Service permission
  const hasAccessibility =
    permissions.has('BIND_ACCESSIBILITY_SERVICE') ||
    permissions.has('ACCESSIBILITY_SERVICE') ||
    Array.from(permissions).some((p) => p.includes('ACCESSIBILITY'));

  if (hasAccessibility) {
    indicators.push({
      ruleId: 'RULE_APP_ACCESSIBILITY',
      title: 'High-Hazard Accessibility Service Abuse (BIND_ACCESSIBILITY_SERVICE)',
      category: 'app_metadata',
      weight: 35,
      severity: 'critical',
      matchedEvidence: 'Accessibility Service Permission',
      explanation:
        'Accessibility Services grant the application total control to read all on-screen content, record keystrokes, and automatically click buttons without user awareness. Financial malware uses this to harvest banking credentials.',
      recommendation:
        'Do not enable Accessibility Services for this app in phone Settings. Banking apps, utility bills, and courier services never need accessibility access.',
    });
  }

  // 3. RULE_APP_SMS: SMS Reading & Interception
  const hasSms =
    permissions.has('READ_SMS') ||
    permissions.has('RECEIVE_SMS') ||
    permissions.has('SEND_SMS') ||
    Array.from(permissions).some((p) => p.includes('SMS'));

  if (hasSms) {
    indicators.push({
      ruleId: 'RULE_APP_SMS',
      title: 'SMS Interception Permission (READ_SMS / RECEIVE_SMS)',
      category: 'app_metadata',
      weight: 25,
      severity: 'high',
      matchedEvidence: 'SMS Interception Permission',
      explanation:
        'Granting SMS access allows the app to intercept 2-Factor Authentication (OTP) messages sent by your bank, enabling unauthorized fund transfers.',
      recommendation:
        'Revoke SMS permissions immediately in app settings. Never grant SMS access to utility bill payment apps or prize apps.',
    });
  }

  // 4. RULE_APP_OVERLAY: Overlay permission
  const hasOverlay =
    permissions.has('SYSTEM_ALERT_WINDOW') ||
    Array.from(permissions).some((p) => p.includes('ALERT_WINDOW') || p.includes('OVERLAY'));

  if (hasOverlay) {
    indicators.push({
      ruleId: 'RULE_APP_OVERLAY',
      title: 'Display Over Other Apps (SYSTEM_ALERT_WINDOW)',
      category: 'app_metadata',
      weight: 20,
      severity: 'moderate',
      matchedEvidence: 'Draw Over Other Apps / Overlay',
      explanation:
        'Allows the application to draw fake phishing overlays over genuine banking apps to capture passwords as you type them.',
      recommendation: 'Revoke "Draw over other apps" permission in phone security settings.',
    });
  }

  // 5. RULE_APP_DEVICE_ADMIN: Device Administrator permission
  const hasAdmin =
    permissions.has('BIND_DEVICE_ADMIN') ||
    Array.from(permissions).some((p) => p.includes('DEVICE_ADMIN'));

  if (hasAdmin) {
    indicators.push({
      ruleId: 'RULE_APP_DEVICE_ADMIN',
      title: 'Device Administrator Access (BIND_DEVICE_ADMIN)',
      category: 'app_metadata',
      weight: 30,
      severity: 'critical',
      matchedEvidence: 'Device Administrator Permission',
      explanation:
        'Grants the app permission to lock the device, prevent uninstallation, and wipe data. Trojan apps use this to prevent victims from removing them.',
      recommendation:
        'Deactivate Device Administrator in phone Settings > Security before attempting to uninstall the app.',
    });
  }

  return indicators;
}
