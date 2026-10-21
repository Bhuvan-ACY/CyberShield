/**
 * Safe URL Extractor: Extract embedded HTTP/HTTPS links from raw message text without executing any network calls.
 */

// Safe URL regex that matches schemes or naked domain strings
const URL_EXTRACTION_REGEX =
  /\b((?:https?:\/\/|ftp:\/\/|www\.)[^\s<>"'{}|\\^`]+|[a-zA-Z0-9.-]+\.(?:com|org|net|in|gov|xyz|top|click|buzz|club|work|vip|cc|info|biz|ru|cn)(?:\/[^\s<>"'{}|\\^`]*)?)/gi;

/**
 * Extracts and deduplicates all URLs found in the given text.
 * Preserves the original order of discovery.
 */
export function extractEmbeddedUrls(text: string): string[] {
  if (!text) return [];

  const matches = text.match(URL_EXTRACTION_REGEX);
  if (!matches) return [];

  const seen = new Set<string>();
  const results: string[] = [];

  for (const rawMatch of matches) {
    let cleanUrl = rawMatch.replace(/[.,;:!?)\]]+$/, ''); // Strip trailing punctuation
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://') && !cleanUrl.startsWith('ftp://')) {
      cleanUrl = 'https://' + cleanUrl;
    }

    if (!seen.has(cleanUrl.toLowerCase())) {
      seen.add(cleanUrl.toLowerCase());
      results.push(cleanUrl);
    }
  }

  return results;
}
