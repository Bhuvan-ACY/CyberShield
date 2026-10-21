import { useState, useCallback } from 'react';

interface CopyResult {
  isCopied: boolean;
  copy: (text: string) => Promise<boolean>;
}

export function useCopyToClipboard(resetDelayMs = 2000): CopyResult {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copy = useCallback(
    async (text: string) => {
      if (!navigator?.clipboard) {
        console.warn('Clipboard API not supported in current environment');
        return false;
      }

      try {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), resetDelayMs);
        return true;
      } catch (error) {
        console.error('Failed to copy text to clipboard:', error);
        setIsCopied(false);
        return false;
      }
    },
    [resetDelayMs]
  );

  return { isCopied, copy };
}
