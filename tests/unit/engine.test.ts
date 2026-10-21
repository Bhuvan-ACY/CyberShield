import { describe, it, expect } from 'vitest';
import { runThreatAnalysis } from '../../src/engine';
import { normalizeText } from '../../src/engine/preprocessor/normalizer';
import { extractEmbeddedUrls } from '../../src/engine/preprocessor/urlExtractor';

describe('CyberShield Detection Engine', () => {
  describe('Preprocessor & URL Extractor', () => {
    it('normalizes Unicode homoglyphs and collapses whitespace', () => {
      // Cyrillic 'а', 'е', 'о'
      const raw = 'Urgent:  Yоur  аccount is   blоcked ';
      const normalized = normalizeText(raw);
      expect(normalized.normalizedText).toBe('Urgent: Your account is blocked');
    });

    it('extracts embedded links from raw text without modifying them', () => {
      const text = 'Click here: https://sbi-update.xyz/login or visit http://192.168.1.1:8080/auth';
      const urls = extractEmbeddedUrls(text);
      expect(urls).toHaveLength(2);
      expect(urls).toContain('https://sbi-update.xyz/login');
      expect(urls).toContain('http://192.168.1.1:8080/auth');
    });
  });

  describe('Phishing Heuristics', () => {
    it('detects OTP request and urgency with high risk score', () => {
      const result = runThreatAnalysis({
        type: 'message',
        messageText: 'URGENT: Your SBI net banking is blocked today. Share your 6-digit OTP immediately to avoid deactivation.',
      });

      expect(result.score).toBeGreaterThanOrEqual(50);
      expect(result.tier).toMatch(/high|very_high/);
      expect(result.findings.some((f) => f.ruleId === 'RULE_PHISH_OTP')).toBe(true);
      expect(result.findings.some((f) => f.ruleId === 'RULE_PHISH_URGENCY')).toBe(true);
      expect(result.actionChecklist.some((a) => a.includes('Do NOT share the OTP'))).toBe(true);
    });

    it('detects deceptive KYC expiry and lookalike URL', () => {
      const result = runThreatAnalysis({
        type: 'message',
        messageText: 'Dear Customer, your PAN card is blocked. Update your KYC now at https://sbi-verification.top',
      });

      expect(result.findings.some((f) => f.ruleId === 'RULE_PHISH_KYC')).toBe(true);
      expect(result.findings.some((f) => f.ruleId === 'RULE_URL_SUSP_TLD')).toBe(true);
      expect(result.findings.some((f) => f.ruleId === 'RULE_URL_LOOKALIKE')).toBe(true);
      expect(result.score).toBeGreaterThanOrEqual(60);
    });
  });

  describe('Digital Arrest Heuristics', () => {
    it('detects CBI/Police impersonation, arrest coercion, and isolation demands', () => {
      const result = runThreatAnalysis({
        type: 'message',
        messageText: 'This is CBI Officer Sharma. An arrest warrant is issued in your name for money laundering. Join WhatsApp video call immediately. Do not hang up or tell family.',
      });

      expect(result.primaryCategory).toBe('digital_arrest');
      expect(result.findings.some((f) => f.ruleId === 'RULE_ARREST_AGENCY')).toBe(true);
      expect(result.findings.some((f) => f.ruleId === 'RULE_ARREST_COERCION')).toBe(true);
      expect(result.findings.some((f) => f.ruleId === 'RULE_ARREST_ISOLATION')).toBe(true);
      expect(result.score).toBeGreaterThanOrEqual(75);
      expect(result.tier).toBe('very_high');
    });

    it('detects fund transfer to fake government escrow account', () => {
      const result = runThreatAnalysis({
        type: 'message',
        messageText: 'Under Enforcement Directorate orders, you must transfer funds to RBI verification account for temporary bond clearance.',
      });

      expect(result.findings.some((f) => f.ruleId === 'RULE_ARREST_EXTORTION')).toBe(true);
      expect(result.score).toBeGreaterThanOrEqual(70);
    });
  });

  describe('URL Analysis Heuristics', () => {
    it('flags raw IP address host and non-standard port', () => {
      const result = runThreatAnalysis({
        type: 'url',
        url: 'http://192.168.1.1:9090/banking/login',
      });

      expect(result.findings.some((f) => f.ruleId === 'RULE_URL_IP_HOST')).toBe(true);
      expect(result.findings.some((f) => f.ruleId === 'RULE_URL_PORT')).toBe(true);
      expect(result.score).toBeGreaterThanOrEqual(50);
    });

    it('flags embedded user authentication syntax (@ abuse)', () => {
      const result = runThreatAnalysis({
        type: 'url',
        url: 'https://hdfcbank.com@malicious-server.com/auth',
      });

      expect(result.findings.some((f) => f.ruleId === 'RULE_URL_EMBED_AUTH')).toBe(true);
      expect(result.score).toBeGreaterThanOrEqual(35);
    });

    it('flags brand lookalike on deceptive root domain', () => {
      const result = runThreatAnalysis({
        type: 'url',
        url: 'https://incometax.gov.in.attacker-server.xyz/verify',
      });

      expect(result.findings.some((f) => f.ruleId === 'RULE_URL_LOOKALIKE')).toBe(true);
      expect(result.findings.some((f) => f.ruleId === 'RULE_URL_SUSP_TLD')).toBe(true);
    });
  });

  describe('Mobile Application Metadata Heuristics', () => {
    it('flags sideloaded source combined with Accessibility and SMS permissions as Critical', () => {
      const result = runThreatAnalysis({
        type: 'app',
        appMetadata: {
          appName: 'Electricity Quick Pay',
          installationSource: 'Direct APK Download / Web',
          permissions: ['BIND_ACCESSIBILITY_SERVICE', 'READ_SMS', 'RECEIVE_SMS'],
        },
      });

      expect(result.primaryCategory).toBe('app_metadata');
      expect(result.findings.some((f) => f.ruleId === 'RULE_APP_SOURCE')).toBe(true);
      expect(result.findings.some((f) => f.ruleId === 'RULE_APP_ACCESSIBILITY')).toBe(true);
      expect(result.findings.some((f) => f.ruleId === 'RULE_APP_SMS')).toBe(true);
      expect(result.score).toBeGreaterThanOrEqual(75);
      expect(result.tier).toBe('very_high');
    });

    it('passes official Play Store app with standard harmless permissions', () => {
      const result = runThreatAnalysis({
        type: 'app',
        appMetadata: {
          appName: 'Official Bank App',
          installationSource: 'Google Play Store',
          permissions: ['INTERNET', 'VIBRATE'],
        },
      });

      expect(result.score).toBe(0);
      expect(result.tier).toBe('low');
      expect(result.findings).toHaveLength(0);
    });
  });

  describe('Contextual Evaluation & Inconclusive Handling', () => {
    it('attenuates score when educational or awareness context is present', () => {
      const text = 'Cyber Awareness Alert: Beware of fake messages asking you to share your OTP immediately.';
      const result = runThreatAnalysis({
        type: 'message',
        messageText: text,
      });

      expect(result.contextMultiplier).toBe(0.4);
      expect(result.findings.some((f) => f.ruleId === 'INFO_EDUCATIONAL_CONTEXT')).toBe(true);
    });

    it('returns inconclusive state for insufficient input text (<3 words with no triggers)', () => {
      const result = runThreatAnalysis({
        type: 'message',
        messageText: 'Hello test',
      });

      expect(result.isInconclusive).toBe(true);
      expect(result.score).toBe(0);
      expect(result.tier).toBe('low');
    });
  });
});
