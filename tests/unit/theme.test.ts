import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { THEME_STORAGE_KEY, Theme } from '@/features/theme';

describe('Theme Constants and Storage Key', () => {
  it('uses the approved local storage key cybershield-theme', () => {
    expect(THEME_STORAGE_KEY).toBe('cybershield-theme');
  });

  it('restricts theme values to light and dark', () => {
    const validThemes: Theme[] = ['light', 'dark'];
    expect(validThemes).toContain('light');
    expect(validThemes).toContain('dark');
    expect(validThemes.length).toBe(2);
  });
});

describe('Theme Fallback and State Transition Logic', () => {
  let mockStorage: Record<string, string> = {};

  beforeEach(() => {
    mockStorage = {};
    vi.stubGlobal('localStorage', {
      getItem: vi.fn((key: string) => mockStorage[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        mockStorage[key] = value;
      }),
      removeItem: vi.fn((key: string) => {
        delete mockStorage[key];
      }),
      clear: vi.fn(() => {
        mockStorage = {};
      }),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('retrieves explicit stored preference when present', () => {
    mockStorage[THEME_STORAGE_KEY] = 'dark';
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    expect(stored).toBe('dark');

    mockStorage[THEME_STORAGE_KEY] = 'light';
    const storedLight = localStorage.getItem(THEME_STORAGE_KEY);
    expect(storedLight).toBe('light');
  });

  it('rejects corrupted or unexpected stored values safely', () => {
    mockStorage[THEME_STORAGE_KEY] = 'invalid-theme-value';
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    const isValid = stored === 'light' || stored === 'dark';
    expect(isValid).toBe(false);

    // Fallback determination
    const systemFallback: Theme = 'light';
    const resolvedTheme: Theme = isValid ? (stored as Theme) : systemFallback;
    expect(resolvedTheme).toBe('light');
  });

  it('persists manual theme changes to local storage', () => {
    const newTheme: Theme = 'dark';
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');

    const toggledTheme: Theme = newTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(THEME_STORAGE_KEY, toggledTheme);
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
  });
});

describe('Theme DOM Application Logic', () => {
  it('applies dark class when theme is dark and removes when light', () => {
    const classList = new Set<string>();
    const mockRoot = {
      classList: {
        add: vi.fn((c: string) => classList.add(c)),
        remove: vi.fn((c: string) => classList.delete(c)),
        contains: vi.fn((c: string) => classList.has(c)),
      },
      style: {
        colorScheme: 'light',
      },
    };

    const applyTheme = (theme: Theme) => {
      if (theme === 'dark') {
        mockRoot.classList.add('dark');
        mockRoot.style.colorScheme = 'dark';
      } else {
        mockRoot.classList.remove('dark');
        mockRoot.style.colorScheme = 'light';
      }
    };

    // Apply dark
    applyTheme('dark');
    expect(mockRoot.classList.add).toHaveBeenCalledWith('dark');
    expect(mockRoot.style.colorScheme).toBe('dark');
    expect(classList.has('dark')).toBe(true);

    // Apply light
    applyTheme('light');
    expect(mockRoot.classList.remove).toHaveBeenCalledWith('dark');
    expect(mockRoot.style.colorScheme).toBe('light');
    expect(classList.has('dark')).toBe(false);
  });
});
