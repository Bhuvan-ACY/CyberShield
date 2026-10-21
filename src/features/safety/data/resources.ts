export interface EmergencyResource {
  id: string;
  name: string;
  authority: string;
  purpose: string;
  contactUrlOrPhone: string;
  isDialable: boolean;
  badge: string;
}

export const OFFICIAL_INDIAN_RESOURCES: EmergencyResource[] = [
  {
    id: 'helpline-1930',
    name: 'National Cyber Crime Helpline (1930)',
    authority: 'Indian Cyber Crime Coordination Centre (I4C), Ministry of Home Affairs',
    purpose:
      'Immediate financial fraud reporting. Operates Citizen Financial Cyber Fraud Reporting and Management System (CFCFRMS) to freeze stolen funds in bank pipelines during the "Golden Hour".',
    contactUrlOrPhone: 'tel:1930',
    isDialable: true,
    badge: 'Emergency Hotline (24x7)',
  },
  {
    id: 'cybercrime-gov-in',
    name: 'National Cyber Crime Reporting Portal',
    authority: 'Ministry of Home Affairs, Government of India',
    purpose:
      'Official portal to file formal online cyber complaints (FIRs) for financial fraud, digital arrest scams, cyber blackmail, and social media abuse.',
    contactUrlOrPhone: 'https://cybercrime.gov.in',
    isDialable: false,
    badge: 'Formal Complaint / FIR',
  },
  {
    id: 'dot-chakshu',
    name: 'Department of Telecommunications Chakshu Portal',
    authority: 'Department of Telecommunications (DoT), Sanchar Saathi',
    purpose:
      'Citizen reporting facility for suspected fraud communications received via phone calls, SMS headers, or WhatsApp (e.g. fake electricity bills, digital arrest threats, KYC expiry).',
    contactUrlOrPhone: 'https://sancharsaathi.gov.in/sfc/',
    isDialable: false,
    badge: 'Report Phone Numbers & SMS',
  },
  {
    id: 'cert-in',
    name: 'Indian Computer Emergency Response Team (CERT-In)',
    authority: 'Ministry of Electronics and Information Technology (MeitY)',
    purpose:
      'National nodal agency for responding to cybersecurity incidents, malware outbreaks, phishing websites, and system vulnerabilities.',
    contactUrlOrPhone: 'https://www.cert-in.org.in',
    isDialable: false,
    badge: 'National Security Incident Response',
  },
  {
    id: 'rbi-sachet',
    name: 'RBI Sachet Portal',
    authority: 'Reserve Bank of India (RBI)',
    purpose:
      'Facilitates citizen reporting of unregistered entities, illegal lending apps, and unauthorized financial collection schemes.',
    contactUrlOrPhone: 'https://sachet.rbi.org.in',
    isDialable: false,
    badge: 'Illegal Lending & Deposits',
  },
];

export const IMMEDIATE_VICTIM_STEPS = [
  {
    stepNumber: 1,
    title: 'Freeze Bank Accounts / Cards (Golden Hour)',
    description:
      'If you transferred funds or disclosed debit card / net-banking credentials, call your bank customer support or use mobile banking to immediately freeze the account, debit card, and UPI ID.',
    actionLabel: 'Call 1930 within 2 hours of transaction for the highest probability of fund recovery.',
  },
  {
    stepNumber: 2,
    title: 'Report to National Helpline 1930',
    description:
      'Dial 1930 immediately. Keep your bank account number, transaction reference (UTR) number, wallet details, and suspect account number ready.',
    actionLabel: 'Helpline operators log tickets directly into inter-bank fraud coordination networks.',
  },
  {
    stepNumber: 3,
    title: 'Preserve Forensic Evidence',
    description:
      'Do not delete message threads or WhatsApp chats. Take uncropped screenshots of SMS messages, phone numbers, caller IDs, UPI IDs, and bank transaction confirmation receipts.',
    actionLabel: 'Forensic evidence is critical for police investigation and court proceedings.',
  },
  {
    stepNumber: 4,
    title: 'Change Credentials on a Secure Device',
    description:
      'Change passwords for your email accounts, net-banking, and social media from a different, clean device. Enable Authenticator app 2FA rather than SMS-based OTPs where available.',
    actionLabel: 'Ensure no unauthorized recovery phone numbers or email addresses were added.',
  },
  {
    stepNumber: 5,
    title: 'Report Sender Number on Chakshu',
    description:
      'Submit the fraudster\'s phone number or SMS header on the DoT Chakshu portal (sancharsaathi.gov.in). The Department of Telecommunications disconnects confirmed fraudulent SIMs.',
    actionLabel: 'Helps protect fellow citizens by neutralizing the fraudster\'s telecommunication assets.',
  },
];
