import { ThreatIndicator } from '../types';

const SUSPICIOUS_TLDS = new Set([
  'xyz', 'top', 'click', 'buzz', 'club', 'work', 'rest', 'vip', 'cc', 'tk', 'ml', 'ga', 'cf', 'gq', 'fit', 'icu'
]);

const PROTECTED_BRANDS = [
  { brand: 'sbi', official: 'sbi.co.in' },
  { brand: 'hdfc', official: 'hdfcbank.com' },
  { brand: 'icici', official: 'icicibank.com' },
  { brand: 'axis', official: 'axisbank.com' },
  { brand: 'paytm', official: 'paytm.com' },
  { brand: 'amazon', official: 'amazon.in' },
  { brand: 'flipkart', official: 'flipkart.com' },
  { brand: 'incometax', official: 'incometax.gov.in' },
  { brand: 'cybercrime', official: 'cybercrime.gov.in' },
  { brand: 'uidai', official: 'uidai.gov.in' },
  { brand: 'epfindia', official: 'epfindia.gov.in' },
  { brand: 'gov.in', official: 'gov.in' },
];

const IPV4_REGEX = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;

/**
 * Parses and evaluates structural anomalies in a URL string without making any network requests.
 */
export function evaluateUrlRules(rawUrl: string): ThreatIndicator[] {
  const indicators: ThreatIndicator[] = [];

  let parsed: URL;
  try {
    let urlString = rawUrl.trim();
    if (!urlString.startsWith('http://') && !urlString.startsWith('https://')) {
      urlString = 'https://' + urlString;
    }
    parsed = new URL(urlString);
  } catch {
    indicators.push({
      ruleId: 'RULE_URL_MALFORMED',
      title: 'Malformed or Unparseable URL',
      category: 'url',
      weight: 15,
      severity: 'moderate',
      matchedEvidence: rawUrl,
      explanation: 'The provided web address is malformed or uses an invalid format.',
      recommendation: 'Do not attempt to visit malformed links as they may leverage encoding tricks.',
    });
    return indicators;
  }

  const hostname = parsed.hostname.toLowerCase();
  const port = parsed.port;
  const username = parsed.username;

  // 1. RULE_URL_IP_HOST: IP address used directly as hostname
  if (IPV4_REGEX.test(hostname)) {
    indicators.push({
      ruleId: 'RULE_URL_IP_HOST',
      title: 'Direct IP Address Used as Hostname',
      category: 'url',
      weight: 30,
      severity: 'high',
      matchedEvidence: hostname,
      explanation:
        'The URL uses a raw numeric IP address instead of a registered domain name. Legitimate consumer banks and government agencies always operate under named domain certificates.',
      recommendation: 'Do not access banking, government, or email services hosted directly on raw IP addresses.',
    });
  }

  // 2. RULE_URL_EMBED_AUTH: Embedded credentials in URL authority
  if (username) {
    indicators.push({
      ruleId: 'RULE_URL_EMBED_AUTH',
      title: 'Embedded Authentication Syntax (@ Symbol Abuse)',
      category: 'url',
      weight: 35,
      severity: 'critical',
      matchedEvidence: `${username}@${hostname}`,
      explanation:
        'The URL uses the "@" syntax (e.g., https://bank.com@attacker.com) to visually deceive users into thinking they are visiting the legitimate prefix.',
      recommendation: 'Avoid this link completely. Modern browsers interpret the prefix before "@" as username, navigating to the attacker domain.',
    });
  }

  // 3. RULE_URL_PORT: Non-standard web port
  if (port && port !== '80' && port !== '443' && port !== '8080') {
    indicators.push({
      ruleId: 'RULE_URL_PORT',
      title: `Non-Standard Web Port (Port ${port})`,
      category: 'url',
      weight: 20,
      severity: 'moderate',
      matchedEvidence: `:${port}`,
      explanation: `The URL connects through port ${port} instead of standard HTTPS (443) or HTTP (80). Malicious command-and-control servers frequently use arbitrary ports.`,
      recommendation: 'Exercise high caution. Legitimate financial institutions do not route users through obscure custom ports.',
    });
  }

  // 4. RULE_URL_SUSP_TLD: High-risk suspicious Top-Level Domain
  const hostParts = hostname.split('.');
  const tld = hostParts[hostParts.length - 1];
  if (SUSPICIOUS_TLDS.has(tld)) {
    indicators.push({
      ruleId: 'RULE_URL_SUSP_TLD',
      title: `Suspicious High-Risk Top-Level Domain (.${tld})`,
      category: 'url',
      weight: 25,
      severity: 'high',
      matchedEvidence: `.${tld}`,
      explanation: `The domain uses .${tld}, a top-level domain frequently exploited in phishing campaigns due to low acquisition costs and lenient abuse controls.`,
      recommendation: `Check whether the legitimate company actually operates under .${tld}. Most Indian organizations use .com, .in, or .gov.in.`,
    });
  }

  // 5. RULE_URL_SUBDOMAINS: Excessive subdomain nesting
  if (hostParts.length >= 4 && !IPV4_REGEX.test(hostname)) {
    indicators.push({
      ruleId: 'RULE_URL_SUBDOMAINS',
      title: 'Excessive Subdomain Nesting',
      category: 'url',
      weight: 15,
      severity: 'moderate',
      matchedEvidence: hostname,
      explanation:
        'The URL has deep subdomain levels (e.g., login.security.update.domain.com). Attackers nest subdomains to push the real apex domain off the visible mobile address bar.',
      recommendation: 'Inspect the rightmost domain segment just before the TLD to identify the true owner of the domain.',
    });
  }

  // 6. RULE_URL_LOOKALIKE: Brand spoofing and typosquatting
  for (const { brand, official } of PROTECTED_BRANDS) {
    const isExactOfficial = hostname === official || hostname.endsWith('.' + official);
    if (!isExactOfficial) {
      // Check if brand appears anywhere in the hostname
      if (hostname.includes(brand)) {
        indicators.push({
          ruleId: 'RULE_URL_LOOKALIKE',
          title: `Brand Impersonation / Typosquatting (${brand.toUpperCase()})`,
          category: 'url',
          weight: 30,
          severity: 'high',
          matchedEvidence: hostname,
          explanation: `The domain name incorporates "${brand.toUpperCase()}" but is not the official registered host (${official}). This is a classic brand impersonation lure.`,
          recommendation: `Never enter passwords or OTPs on this website. Access the genuine service only at ${official}.`,
        });
        break; // Trigger once per brand match
      }
    }
  }

  return indicators;
}
