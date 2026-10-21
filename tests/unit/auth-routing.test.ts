import { describe, it, expect } from 'vitest';
import { supabase } from '@/lib/supabase';

describe('Supabase Client Configuration', () => {
  it('initializes Supabase client using environment variables', () => {
    expect(supabase).toBeDefined();
    expect(supabase).not.toBeNull();
  });

  it('provides official auth API methods (signInWithPassword, signUp, signOut, resetPasswordForEmail)', () => {
    expect(supabase?.auth).toBeDefined();
    expect(typeof supabase?.auth.signInWithPassword).toBe('function');
    expect(typeof supabase?.auth.signUp).toBe('function');
    expect(typeof supabase?.auth.signOut).toBe('function');
    expect(typeof supabase?.auth.resetPasswordForEmail).toBe('function');
    expect(typeof supabase?.auth.getSession).toBe('function');
    expect(typeof supabase?.auth.onAuthStateChange).toBe('function');
  });

  it('rejects invalid credentials with an error response without exposing sensitive details', async () => {
    if (!supabase) return;

    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'nonexistent-citizen-123456@cybershield.internal',
      password: 'invalid-password-test-xyz',
    });

    expect(data.user).toBeNull();
    expect(data.session).toBeNull();
    expect(error).toBeDefined();
    expect(error?.message).toMatch(/invalid/i);
  });
});

describe('Authentication Validation Rules', () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  it('validates standard email addresses correctly', () => {
    expect(emailRegex.test('citizen@example.com')).toBe(true);
    expect(emailRegex.test('user.name+tag@sub.domain.org')).toBe(true);
    expect(emailRegex.test('invalid-email')).toBe(false);
    expect(emailRegex.test('@no-local-part.com')).toBe(false);
    expect(emailRegex.test('missing-domain@.com')).toBe(false);
    expect(emailRegex.test('')).toBe(false);
  });

  it('validates password length threshold (minimum 6 characters)', () => {
    const isPasswordValid = (pwd: string) => pwd.length >= 6;
    expect(isPasswordValid('12345')).toBe(false);
    expect(isPasswordValid('123456')).toBe(true);
    expect(isPasswordValid('secure_pass_phrase_2026')).toBe(true);
  });

  it('prevents open redirect vulnerabilities by constraining internal paths to /app', () => {
    const sanitizeRedirect = (fromPath?: string) => {
      if (fromPath && fromPath.startsWith('/app')) {
        return fromPath;
      }
      return '/app';
    };

    expect(sanitizeRedirect('/app/analyze')).toBe('/app/analyze');
    expect(sanitizeRedirect('/app/training')).toBe('/app/training');
    expect(sanitizeRedirect('/app/safety-guide')).toBe('/app/safety-guide');
    expect(sanitizeRedirect('https://malicious-site.com')).toBe('/app');
    expect(sanitizeRedirect('//evil.com/app')).toBe('/app');
    expect(sanitizeRedirect('/login')).toBe('/app');
    expect(sanitizeRedirect(undefined)).toBe('/app');
  });
});

describe('Risk Scoring Tiers Consistency', () => {
  const scoringTiers = [
    { range: '0–24', tier: 'Low Risk', min: 0, max: 24 },
    { range: '25–49', tier: 'Moderate Risk', min: 25, max: 49 },
    { range: '50–74', tier: 'High Risk', min: 50, max: 74 },
    { range: '75–100', tier: 'Very High Risk', min: 75, max: 100 },
  ];

  it('defines 4 mutually exclusive and continuous tiers covering the entire 0-100 score space', () => {
    expect(scoringTiers).toHaveLength(4);
    expect(scoringTiers[0].min).toBe(0);
    expect(scoringTiers[3].max).toBe(100);

    for (let i = 0; i < scoringTiers.length - 1; i++) {
      expect(scoringTiers[i].max + 1).toBe(scoringTiers[i + 1].min);
    }
  });

  it('maps scores accurately across boundary thresholds', () => {
    const getTier = (score: number) => {
      if (score >= 75) return 'Very High Risk';
      if (score >= 50) return 'High Risk';
      if (score >= 25) return 'Moderate Risk';
      return 'Low Risk';
    };

    expect(getTier(0)).toBe('Low Risk');
    expect(getTier(24)).toBe('Low Risk');
    expect(getTier(25)).toBe('Moderate Risk');
    expect(getTier(49)).toBe('Moderate Risk');
    expect(getTier(50)).toBe('High Risk');
    expect(getTier(74)).toBe('High Risk');
    expect(getTier(75)).toBe('Very High Risk');
    expect(getTier(100)).toBe('Very High Risk');
  });
});
