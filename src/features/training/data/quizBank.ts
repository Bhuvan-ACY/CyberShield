export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  recommendedArticleId: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'A caller claiming to be a CBI Inspector tells you that your Aadhaar was used to send an illegal narcotics parcel, and you are under "Digital Arrest" on WhatsApp video call. What is the legally accurate response?',
    options: [
      'Stay on the video call to clear your name and follow the officer\'s instructions.',
      'Transfer money to the government escrow account for temporary bond clearance.',
      'Disconnect immediately. Indian law has no concept of "digital arrest", and police never conduct trials or warrants over video calls.',
      'Ask the officer to show his police badge on camera and proceed with the interrogation.',
    ],
    correctIndex: 2,
    explanation:
      'Under Indian law (CrPC and BNSS), police and investigative agencies (CBI, ED, NCB) never investigate citizens, serve arrest warrants, or demand fund transfers over video calls. Digital Arrest is 100% fictitious extortion.',
    recommendedArticleId: 'digital-arrest-deconstructed',
  },
  {
    id: 2,
    question: 'You receive an urgent SMS: "Dear Customer, your electricity will be disconnected tonight at 9:30 PM due to unpaid bill. Click link to pay." What is the biggest red flag?',
    options: [
      'The message was sent in English rather than regional language.',
      'The message originates from a personal 10-digit mobile number and threatens abrupt nighttime power cutoff.',
      'Electricity companies only communicate via postal mail.',
      'The message does not mention your home address.',
    ],
    correctIndex: 1,
    explanation:
      'Utility providers send SMS from official registered telecom headers (e.g. VM-BESCOM), never personal mobile numbers, and follow statutory disconnection notice periods rather than sudden nighttime blackouts.',
    recommendedArticleId: 'phishing-anatomy-otp',
  },
  {
    id: 3,
    question: 'Which of the following top-level domain (TLD) extensions is the ONLY official domain for central and state government portals in India?',
    options: [
      '.gov.in or .nic.in',
      '.gov.org',
      '.india-gov.com',
      '.gov.xyz',
    ],
    correctIndex: 0,
    explanation:
      'All legitimate Indian government departments, ministries, and court registries strictly use the ".gov.in" or ".nic.in" domain zone managed by the National Informatics Centre (NIC).',
    recommendedArticleId: 'url-anatomy-lookalikes',
  },
  {
    id: 4,
    question: 'In the URL "https://onlinesbi.sbi.co.in.verification-portal.xyz/login", what is the actual destination domain your browser will connect to?',
    options: [
      'onlinesbi.sbi.co.in (State Bank of India)',
      'sbi.co.in (SBI Corporate)',
      'verification-portal.xyz (Attacker Domain)',
      'None; the browser blocks it automatically.',
    ],
    correctIndex: 2,
    explanation:
      'A domain is read from right to left from the first single forward slash. Here, "verification-portal.xyz" is the apex domain. "onlinesbi.sbi.co.in" is merely an attacker-created subdomain designed to fool mobile address bar previews.',
    recommendedArticleId: 'url-anatomy-lookalikes',
  },
  {
    id: 5,
    question: 'What is the national emergency telephone helpline number in India for immediate reporting and freezing of cyber financial fraud?',
    options: [
      '100',
      '112',
      '1930',
      '1091',
    ],
    correctIndex: 2,
    explanation:
      '1930 is the National Cyber Crime Helpline managed by the Indian Cyber Crime Coordination Centre (I4C). Calling 1930 immediately allows operators to freeze transactions across bank networks.',
    recommendedArticleId: 'digital-arrest-deconstructed',
  },
  {
    id: 6,
    question: 'An APK file downloaded from WhatsApp requests "Accessibility Service (BIND_ACCESSIBILITY_SERVICE)" permission. Why is this permission dangerous for a consumer utility app?',
    options: [
      'It allows the app to consume excessive mobile data and battery.',
      'It grants the app complete control to read on-screen text, log passwords, intercept OTPs, and click buttons without your knowledge.',
      'It slows down your smartphone camera.',
      'It requires a paid subscription to Android.',
    ],
    correctIndex: 1,
    explanation:
      'Accessibility Services allow applications to inspect screen contents and synthesize user taps. Trojan banking malware exploits this to harvest passwords and bypass 2-Factor Authentication automatically.',
    recommendedArticleId: 'app-sideloading-hazards',
  },
  {
    id: 7,
    question: 'If a bank customer representative on the phone asks you to read out the 6-digit OTP sent to your phone to "cancel an unauthorized transaction", what should you do?',
    options: [
      'Share the OTP quickly to stop the transaction.',
      'Never share the OTP under any circumstance; banks never ask for OTPs to cancel transactions or verify accounts.',
      'Share only the first 3 digits of the OTP.',
      'Ask the representative for their employee ID and then provide the OTP.',
    ],
    correctIndex: 1,
    explanation:
      'Banks never ask for OTPs, CVVs, or ATM PINs under any circumstances. Fraudsters trigger a real fund transfer and claim the OTP is to "cancel" the charge, when entering it actually authorizes the theft.',
    recommendedArticleId: 'phishing-anatomy-otp',
  },
  {
    id: 8,
    question: 'What is the Department of Telecommunications (DoT) citizen portal used specifically for reporting fraudulent callers and suspicious SMS headers?',
    options: [
      'DigiLocker',
      'Chakshu (Sanchar Saathi)',
      'Aadhaar Self Service Portal',
      'UMANG',
    ],
    correctIndex: 1,
    explanation:
      'Chakshu is the citizen facility on the Sanchar Saathi portal (sancharsaathi.gov.in/sfc/) dedicated to reporting suspected fraudulent communications via calls, SMS, or WhatsApp.',
    recommendedArticleId: 'digital-arrest-deconstructed',
  },
  {
    id: 9,
    question: 'Which of the following is the most secure method for safeguarding your online banking and social media accounts against credential phishing?',
    options: [
      'Using the same complex password across all accounts.',
      'Enabling Multi-Factor Authentication using an Authenticator app (TOTP) or hardware security key instead of SMS.',
      'Changing your password every single day.',
      'Writing down your passwords in your phone notes app.',
    ],
    correctIndex: 1,
    explanation:
      'Authenticator app TOTPs (Time-based One-Time Passwords) cannot be intercepted through SIM swapping or SMS-reading malware, providing superior defense over plain SMS OTPs.',
    recommendedArticleId: 'phishing-anatomy-otp',
  },
  {
    id: 10,
    question: 'What should you do immediately if you realize you have fallen for a digital arrest scam and transferred money to a fraudulent account 20 minutes ago?',
    options: [
      'Wait for the caller to provide a refund receipt tomorrow.',
      'Dial 1930 immediately and notify your bank to initiate a CFCFRMS transaction freeze within the "Golden Hour".',
      'Delete WhatsApp and reset your phone to factory settings.',
      'File an offline complaint at the post office.',
    ],
    correctIndex: 1,
    explanation:
      'The "Golden Hour" (first 1–2 hours after transaction) is critical. Calling 1930 immediately alerts banks to freeze recipient escrow wallets before the funds are withdrawn at ATMs or converted to crypto.',
    recommendedArticleId: 'digital-arrest-deconstructed',
  },
];
