import { AppMetadataPayload } from '@/engine/types';

export interface SampleScenario {
  id: string;
  name: string;
  category: 'message' | 'url' | 'app';
  description: string;
  payload: {
    messageText?: string;
    url?: string;
    appMetadata?: AppMetadataPayload;
  };
}

export const SAMPLE_SCENARIOS: SampleScenario[] = [
  {
    id: 'sbi-kyc-phish',
    name: 'Urgent SBI KYC & Net Banking Expiry SMS',
    category: 'message',
    description: 'Impersonates SBI claiming PAN card expiry and demands immediate OTP verification.',
    payload: {
      messageText:
        'URGENT: Dear Customer, your SBI net banking account is blocked today due to expired KYC. Please update your PAN Card immediately by visiting https://sbi-verification.top or reply with your 6-digit OTP to unblock.',
    },
  },
  {
    id: 'cbi-digital-arrest',
    name: 'CBI Officer Digital Arrest Video Extortion',
    category: 'message',
    description: 'Coercive extortion impersonating CBI alleging money laundering with video isolation demands.',
    payload: {
      messageText:
        'This is Senior CBI Officer Rajesh Sharma from New Delhi Crime Branch. A non-bailable arrest warrant has been issued in your name regarding an illegal parcel containing narcotics and fake passports. You must immediately join Skype video call. Do not disconnect or inform family, or police will arrive within 2 hours.',
    },
  },
  {
    id: 'electricity-bill-disconnection',
    name: 'Electricity Disconnection Scam SMS',
    category: 'message',
    description: 'Threatens power cutoff tonight and lures victim to download an APK or call an extortionist.',
    payload: {
      messageText:
        'Dear consumer, your electricity power will be disconnected tonight at 9:30 PM because your previous month electricity bill was not updated. Immediately contact our electricity officer at 9876543210 or visit https://bijli-bill-update.xyz',
    },
  },
  {
    id: 'deceptive-ip-url',
    name: 'Raw IP Host with Embedded Credential URL',
    category: 'url',
    description: 'Demonstrates @ auth syntax and direct numeric IP hosting.',
    payload: {
      url: 'https://secure-login.hdfcbank.com@192.168.1.1:9090/netbanking/auth',
    },
  },
  {
    id: 'sideloaded-trojan-app',
    name: 'Sideloaded Utility APK with Accessibility Hijacking',
    category: 'app',
    description: 'Direct APK download requesting Accessibility and SMS interception permissions.',
    payload: {
      appMetadata: {
        appName: 'PM Electricity Subsidy 2026',
        packageId: 'com.subsidy.quickpay.apk',
        installationSource: 'WhatsApp / Telegram Link',
        permissions: ['BIND_ACCESSIBILITY_SERVICE', 'READ_SMS', 'RECEIVE_SMS', 'SYSTEM_ALERT_WINDOW'],
        claimedPublisher: 'Ministry of Power (Unofficial)',
      },
    },
  },
  {
    id: 'benign-bank-alert',
    name: 'Legitimate Bank Transaction Alert (Benign Control)',
    category: 'message',
    description: 'Real-world transaction notification without urgency, credential solicitation, or deceptive links.',
    payload: {
      messageText:
        'INR 650.00 debited from your A/C ending in 4321 on 21-OCT-26 at Supermarket Store. Clear balance: INR 18,340.00. If this transaction was not authorized by you, please SMS BLOCK to 567676.',
    },
  },
];
