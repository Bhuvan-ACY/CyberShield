export interface ScamScenario {
  id: string;
  title: string;
  threatType: 'Phishing' | 'Digital Arrest' | 'Malicious APK' | 'Benign Control';
  isScam: boolean;
  messageCard: {
    sender: string;
    channel: 'SMS' | 'WhatsApp' | 'Email';
    timestamp: string;
    body: string;
  };
  hotspots: {
    id: string;
    textExcerpt: string;
    title: string;
    explanation: string;
  }[];
  verdictExplanation: string;
}

export const SCAM_SIMULATION_SCENARIOS: ScamScenario[] = [
  {
    id: 'sim-electricity-apk',
    title: 'Electricity Disconnection & Urgent APK Sideload',
    threatType: 'Malicious APK',
    isScam: true,
    messageCard: {
      sender: '+91 98765 43210 (Personal Mobile)',
      channel: 'SMS',
      timestamp: 'Today, 8:45 PM',
      body: 'Dear consumer, your electricity power will be disconnected tonight at 9:30 PM from the power office because your previous month bill was not updated. Please immediately contact our electricity officer at 9876543210 or install our quick bill payment app: https://bijli-bill-update.xyz/app.apk',
    },
    hotspots: [
      {
        id: 'h1',
        textExcerpt: '+91 98765 43210 (Personal Mobile)',
        title: 'Unregistered Personal Sender',
        explanation: 'State power distribution companies send official SMS notifications from registered entity headers (e.g., "VM-BESCOM" or "TD-TNEB"), never from personal 10-digit phone numbers.',
      },
      {
        id: 'h2',
        textExcerpt: 'disconnected tonight at 9:30 PM',
        title: 'Extreme Artificial Urgency',
        explanation: 'Disconnection notices follow regulated legal timelines with physical letters and prior grace periods. Power is never cut off at night without statutory notices.',
      },
      {
        id: 'h3',
        textExcerpt: 'https://bijli-bill-update.xyz/app.apk',
        title: 'Sideloaded APK on Risky TLD',
        explanation: 'The link prompts downloading a raw ".apk" Android package hosted on a suspicious ".xyz" domain. This app contains SMS-reading malware.',
      },
    ],
    verdictExplanation:
      'This is an active electricity disconnection scam. The attacker uses panic and urgency to force the victim to install malicious financial surveillance software.',
  },
  {
    id: 'sim-cbi-video-summons',
    title: 'CBI Crime Branch WhatsApp Video Arrest Summons',
    threatType: 'Digital Arrest',
    isScam: true,
    messageCard: {
      sender: 'CBI Cyber Cell (+91 91234 56789)',
      channel: 'WhatsApp',
      timestamp: 'Today, 11:15 AM',
      body: 'NOTICE FROM CENTRAL BUREAU OF INVESTIGATION: A non-bailable arrest warrant has been issued against your Aadhaar card for illegal narcotics parcel seized at Mumbai customs. You are placed under Digital Arrest. Join Skype video call immediately for confidential statement. Do not disconnect or inform family, or local police will raid your premises.',
    },
    hotspots: [
      {
        id: 'h1',
        textExcerpt: 'NOTICE FROM CENTRAL BUREAU OF INVESTIGATION',
        title: 'Law Enforcement Impersonation',
        explanation: 'Federal investigative agencies like the CBI never serve legal summons, warrants, or criminal notices over WhatsApp or social messaging apps.',
      },
      {
        id: 'h2',
        textExcerpt: 'placed under Digital Arrest',
        title: 'Fictitious Legal Concept',
        explanation: 'There is no concept of "Digital Arrest" under Indian law (CrPC / BNSS). Arrests in India require physical presence and judicial procedure.',
      },
      {
        id: 'h3',
        textExcerpt: 'Join Skype video call immediately. Do not disconnect or inform family',
        title: 'Psychological Video Isolation',
        explanation: 'Demanding continuous video surveillance and forbidding communication with family is designed to prevent victims from consulting attorneys or police.',
      },
    ],
    verdictExplanation:
      'This is a textbook Digital Arrest extortion operation. Disconnect immediately, turn off the camera, and report the phone number to 1930.',
  },
  {
    id: 'sim-sbi-kyc-lookalike',
    title: 'Bank KYC Expiry with Typosquatting Link',
    threatType: 'Phishing',
    isScam: true,
    messageCard: {
      sender: 'SBI-Alert (+91 88888 12345)',
      channel: 'SMS',
      timestamp: 'Yesterday, 3:20 PM',
      body: 'Dear Customer, your State Bank account is blocked today due to incomplete PAN card linking. Update your KYC within 24 hours to resume transactions: https://sbi-netbanking-update.top/login. Enter your net banking ID and OTP.',
    },
    hotspots: [
      {
        id: 'h1',
        textExcerpt: 'your State Bank account is blocked today',
        title: 'Manufactured Panic',
        explanation: 'Banks do not abruptly freeze accounts via SMS without sending official postal correspondence and offering branch visits.',
      },
      {
        id: 'h2',
        textExcerpt: 'https://sbi-netbanking-update.top/login',
        title: 'Deceptive Lookalike Domain (.top)',
        explanation: 'The official SBI portal is "onlinesbi.sbi" or "sbi.co.in". This URL resides on an attacker-controlled ".top" domain registered to steal credentials.',
      },
      {
        id: 'h3',
        textExcerpt: 'Enter your net banking ID and OTP',
        title: 'Credential & OTP Harvesting',
        explanation: 'Legitimate banking portals never instruct you via SMS to enter your confidential password or OTP on a web link.',
      },
    ],
    verdictExplanation:
      'This is a credential harvesting phishing attack. Submitting credentials here results in immediate takeover of your net-banking account.',
  },
  {
    id: 'sim-benign-bank-alert',
    title: 'Legitimate Bank Debit Transaction Notification',
    threatType: 'Benign Control',
    isScam: false,
    messageCard: {
      sender: 'VM-HDFCBK (Registered Header)',
      channel: 'SMS',
      timestamp: 'Today, 2:10 PM',
      body: 'INR 1,250.00 debited from A/C **5678 on 21-OCT-26 at Mumbai Metro. Avl Bal: INR 24,310.50. Not you? SMS BLOCK 5678 to 567676.',
    },
    hotspots: [
      {
        id: 'h1',
        textExcerpt: 'VM-HDFCBK (Registered Header)',
        title: 'Verified Telecom Header',
        explanation: 'Follows official TRAI alphanumeric sender naming conventions for verified commercial financial institutions.',
      },
      {
        id: 'h2',
        textExcerpt: 'INR 1,250.00 debited from A/C **5678',
        title: 'Masked Account Information',
        explanation: 'Legitimate bank alerts mask sensitive account numbers with asterisks to protect account holder privacy.',
      },
      {
        id: 'h3',
        textExcerpt: 'SMS BLOCK 5678 to 567676',
        title: 'Official Short-Code Hotline',
        explanation: 'Provides an official 5-digit short code to freeze the card rather than prompting the user to visit an unverified third-party web link.',
      },
    ],
    verdictExplanation:
      'This is a legitimate bank transaction notification. It contains no hyperlinks, no requests for OTP or passwords, and uses masked account numbers.',
  },
];
