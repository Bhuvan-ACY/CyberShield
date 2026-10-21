/**
 * Text Preprocessor: Unicode homoglyphs, invisible characters, and whitespace normalization.
 */

// Common homoglyphs mapped to ASCII equivalents
const HOMOGLYPH_MAP: Record<string, string> = {
  'а': 'a', 'е': 'e', 'о': 'o', 'р': 'p', 'с': 'c', 'у': 'y', 'х': 'x',
  'А': 'A', 'В': 'B', 'Е': 'E', 'К': 'K', 'М': 'M', 'Н': 'H', 'О': 'O',
  'Р': 'P', 'С': 'C', 'Т': 'T', 'Х': 'X',
  '0': 'o', '1': 'l', // contextual leetspeak handled specifically
};

// Zero-width & invisible character regex
const INVISIBLE_CHARS_REGEX = /[\u200B-\u200D\uFEFF\u00A0\u2000-\u200A]/g;

export interface NormalizedTextResult {
  originalText: string;
  normalizedText: string;
  cleanedText: string;
}

/**
 * Normalizes user-submitted text string by stripping invisible characters,
 * converting homoglyphs, and collapsing excessive whitespaces.
 */
export function normalizeText(rawInput: string): NormalizedTextResult {
  if (!rawInput) {
    return { originalText: '', normalizedText: '', cleanedText: '' };
  }

  // 1. Strip invisible / zero-width spaces
  let text = rawInput.replace(INVISIBLE_CHARS_REGEX, ' ');

  // 2. Collapse excessive whitespace
  text = text.replace(/\s+/g, ' ').trim();

  // 3. Map prominent Cyrillic/homoglyph characters to Latin
  let homoglyphNormalized = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    homoglyphNormalized += HOMOGLYPH_MAP[char] || char;
  }

  return {
    originalText: rawInput,
    normalizedText: homoglyphNormalized,
    cleanedText: text,
  };
}
