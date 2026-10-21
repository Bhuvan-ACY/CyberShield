export interface AwarenessArticle {
  id: string;
  category: 'phishing' | 'digital_arrest' | 'url' | 'app_safety';
  categoryLabel: string;
  title: string;
  readTime: string;
  summary: string;
  content: string[];
  keyTakeaways: string[];
}

export const AWARENESS_ARTICLES: AwarenessArticle[] = [
  {
    id: 'digital-arrest-deconstructed',
    category: 'digital_arrest',
    categoryLabel: 'Digital Arrest Scams',
    title: 'Deconstructing "Digital Arrest": Why Indian Police Never Trial Citizens on Video Calls',
    readTime: '4 min read',
    summary:
      'A deep dive into the psychological coercion tactics used by transnational syndicates impersonating CBI, Customs, and Police officers.',
    content: [
      'In a "Digital Arrest" scam, fraudsters contact victims over phone or WhatsApp, claiming to represent the Central Bureau of Investigation (CBI), Narcotics Control Bureau (NCB), Enforcement Directorate (ED), or state police departments.',
      'The caller claims an illegal parcel containing narcotics, expired passports, or contraband was intercepted at a major airport, or that the victim\'s Aadhaar card was utilized to open bank accounts for terror financing or money laundering.',
      'Victims are ordered to join a Skype or WhatsApp video call where fraudsters wear fabricated police uniforms and sit in front of banners mimicking real police stations. Victims are told they are placed under "digital arrest" and forbidden from hanging up, speaking to family, or seeking legal counsel under penalty of national security charges.',
      'The climax of the extortion occurs when victims are instructed to transfer their entire savings to "RBI-monitored safety accounts" or "court clearance escrow" to verify their financial innocence. Once the transfer is completed, the scammers vanish.',
      'Legal Fact: Under the Indian Code of Criminal Procedure (CrPC) and Bharatiya Nagarik Suraksha Sanhita (BNSS), there is no concept of "digital arrest." Indian police officers and judges never conduct investigations, issue warrants, or demand fund transfers over video calls.',
    ],
    keyTakeaways: [
      'No Indian law enforcement agency conducts trials, arrests, or questioning via WhatsApp or Skype.',
      'Never transfer funds into "police verification" or "RBI clearance" accounts; these are fictitious.',
      'If faced with an aggressive caller threatening immediate arrest over video, disconnect immediately and dial 1930.',
    ],
  },
  {
    id: 'phishing-anatomy-otp',
    category: 'phishing',
    categoryLabel: 'Phishing & Credentials',
    title: 'The Anatomy of Credential Harvesting: From Urgent KYC Alerts to Empty Bank Accounts',
    readTime: '3 min read',
    summary:
      'How artificial urgency, fake banking subdomains, and OTP interception combine to defeat multi-factor authentication.',
    content: [
      'Phishing attacks in India overwhelmingly exploit two psychological triggers: greed (lottery or reward points) and terror (impending account suspension or power cutoff).',
      'A typical lure arrives via SMS: "Dear Customer, your SBI YONO account will be blocked today due to expired KYC. Update immediately at sbi-pan-kyc.xyz".',
      'The link directs to a web page that visually clones the net-banking portal. When the user enters their username and password, the attacker\'s server captures these credentials in real-time and immediately attempts a login on the genuine banking site.',
      'When the real bank sends an OTP to the victim\'s phone, the phishing page prompts: "Enter OTP to complete KYC verification." As soon as the victim submits the OTP, the attacker completes an unauthorized fund transfer or adds a beneficiary.',
      'Key Defense: Multi-Factor Authentication (OTP) is your final line of defense. Banks and utility providers never ask you to input an OTP to prevent account suspension.',
    ],
    keyTakeaways: [
      'Banks will never send an SMS warning that your account is "suspended today" requiring link-based KYC.',
      'Always check the sender ID. Genuine Indian bank SMS headers follow regulatory formats like "VM-HDFCBK" or "AX-SBINB", never personal 10-digit mobile numbers.',
      'Never enter an OTP on any page reached by clicking an unsolicited SMS or WhatsApp link.',
    ],
  },
  {
    id: 'url-anatomy-lookalikes',
    category: 'url',
    categoryLabel: 'Malicious URLs',
    title: 'Reading URL Anatomy: Spotting Typosquatting, Deceptive Subdomains, and Risky TLDs',
    readTime: '5 min read',
    summary:
      'Learn how attackers craft deceptive hostnames to mimic government portals and major banks on mobile address bars.',
    content: [
      'Understanding how web addresses are structured is essential for identifying fraudulent links before clicking.',
      'A URL is read from right to left starting at the Top-Level Domain (TLD). For example, in "https://incometax.gov.in.security-update.xyz/login", the true domain is "security-update.xyz", NOT "incometax.gov.in". "incometax.gov.in" is merely an arbitrary subdomain created by the attacker to deceive users.',
      'Attackers frequently register inexpensive, low-regulation TLDs such as .xyz, .top, .click, .buzz, or .work because they cost pennies and can be discarded quickly.',
      'Another common trick is the embedded user authentication syntax: "https://hdfcbank.com@attacker-portal.com". The browser ignores everything before the "@" as a username, routing the connection directly to "attacker-portal.com".',
      'Indian Government Domains: All legitimate Indian central and state government portals must end in ".gov.in" or ".nic.in". No genuine Indian government department will ever use a ".com" or ".xyz" domain.',
    ],
    keyTakeaways: [
      'Read URLs from the rightmost slash backwards: identify the apex domain and its TLD.',
      'Official Indian government websites always end in .gov.in or .nic.in.',
      'Be skeptical of raw numeric IP addresses (e.g. 192.168.x.x) operating consumer banking or tax forms.',
    ],
  },
  {
    id: 'app-sideloading-hazards',
    category: 'app_safety',
    categoryLabel: 'Mobile App Security',
    title: 'The Danger of Sideloaded APKs: Accessibility Abuse and Automated Banking Fraud',
    readTime: '4 min read',
    summary:
      'Why downloading utility and subsidy apps from WhatsApp links exposes Android devices to complete remote takeover.',
    content: [
      'Android sideloading refers to installing applications from outside the official Google Play Store via raw ".apk" files shared over WhatsApp, Telegram, or malicious websites.',
      'Fraud syndicates distribute fake apps disguised as "PM Electricity Subsidy", "Bank Loan Quick Approval", or "Courier Tracking Update".',
      'Once installed, these malicious apps prompt the user to enable "Accessibility Services" under the guise of optimizing performance or screen calibration.',
      'In Android, Accessibility Services possess powerful capabilities intended to assist users with disabilities: reading any on-screen text, monitoring keystrokes, and clicking buttons programmatically.',
      'Malware exploits accessibility to read incoming bank OTPs, log net-banking passwords, and even initiate automated fund transfers in the background while displaying a black screen or fake loading spinner to the victim.',
    ],
    keyTakeaways: [
      'Never install APK files sent through WhatsApp, Telegram, or SMS links.',
      'Never enable "Accessibility Services" for banking, courier, or utility payment apps.',
      'Keep Google Play Protect activated and review phone Settings > Accessibility regularly.',
    ],
  },
];
