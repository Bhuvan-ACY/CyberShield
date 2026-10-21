import { describe, it, expect } from 'vitest';
import { runThreatAnalysis } from '../../src/engine';

describe('CyberShield Detection Benchmark Corpus', () => {
  const MALICIOUS_SAMPLES = [
    {
      name: 'Electricity disconnection scam',
      input: 'Dear consumer, your electricity power will be disconnected tonight at 9:30 PM from the power office because your previous month bill was not updated. Please immediately contact our electricity officer at 9876543210 or visit https://bijli-bill-update.xyz',
      expectedTier: ['high', 'very_high'],
    },
    {
      name: 'SBI PAN/KYC expiry phishing',
      input: 'Dear SBI User, your YONO account will be deactivated today. Please update your PAN Card immediately by clicking https://sbi-netbanking.top/kyc or reply with OTP.',
      expectedTier: ['high', 'very_high'],
    },
    {
      name: 'CBI Digital arrest video extortion',
      input: 'This is Officer R.K. Singh from Central Bureau of Investigation (CBI) New Delhi. An arrest warrant is issued in your name for illegal narcotics package found at Mumbai airport. Join Skype video call immediately. Do not hang up or inform your lawyer.',
      expectedTier: ['very_high'],
    },
    {
      name: 'Customs Department illegal parcel seizure',
      input: 'Customs Department Alert: Your DHL parcel containing 5 fake passports and contraband is seized. Transfer funds to RBI safety account for verification deposit or police will arrest you.',
      expectedTier: ['very_high'],
    },
    {
      name: 'Unauthorized debit lottery lure',
      input: 'Congratulations! You have won Rs 25,00,000 in KBC lottery. To claim your reward prize, share your net banking password and OTP with verification manager.',
      expectedTier: ['high', 'very_high'],
    },
  ];

  const BENIGN_SAMPLES = [
    {
      name: 'Legitimate bank debit transaction notification',
      input: 'INR 450.00 debited from A/C XX1234 on 21-OCT-26 at Grocery Store. Avl Bal: INR 12,450.00. If not done by you, SMS BLOCK to 567676.',
      expectedTier: ['low'],
    },
    {
      name: 'Casual personal message',
      input: 'Hey, are we still meeting for lunch today at 1 PM? Let me know when you leave office.',
      expectedTier: ['low'],
    },
    {
      name: 'Legitimate meeting invitation',
      input: 'Team sync scheduled for tomorrow morning at 10 AM to review quarterly performance.',
      expectedTier: ['low'],
    },
    {
      name: 'Official Indian government portal link',
      input: 'Citizens can register voter IDs and download electoral rolls directly at https://eci.gov.in',
      expectedTier: ['low'],
    },
  ];

  it('correctly classifies all malicious benchmark samples as High or Very High', () => {
    for (const sample of MALICIOUS_SAMPLES) {
      const result = runThreatAnalysis({
        type: 'message',
        messageText: sample.input,
      });

      expect(
        sample.expectedTier.includes(result.tier),
        `Failed for sample "${sample.name}": expected ${sample.expectedTier.join('/')}, got ${result.tier} (score: ${result.score})`
      ).toBe(true);
      expect(result.score).toBeGreaterThanOrEqual(50);
      expect(result.findings.length).toBeGreaterThan(0);
    }
  });

  it('correctly classifies benign control samples as Low Risk', () => {
    for (const sample of BENIGN_SAMPLES) {
      const result = runThreatAnalysis({
        type: 'message',
        messageText: sample.input,
      });

      expect(
        result.tier === 'low',
        `Failed for benign sample "${sample.name}": expected low, got ${result.tier} (score: ${result.score})`
      ).toBe(true);
      expect(result.score).toBeLessThan(25);
    }
  });
});
