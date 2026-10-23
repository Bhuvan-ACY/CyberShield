import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '@/lib/utils';

export interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className, size = 'sm' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const label = isDark
    ? 'Switch to Light Mode (currently Dark Mode)'
    : 'Switch to Dark Mode (currently Light Mode)';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={cn(
        'relative inline-flex items-center justify-center rounded-lg border border-hairline bg-surface-1/70 text-ink-primary hover:text-ink-dark hover:bg-surface-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cobalt shrink-0 select-none cursor-pointer',
        size === 'sm' ? 'h-8 w-8' : 'h-9 w-9',
        className
      )}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-amber-400 transition-transform duration-200 hover:rotate-45" />
      ) : (
        <Moon className="h-4 w-4 text-ink-muted transition-transform duration-200 hover:-rotate-12" />
      )}
      <span className="sr-only">{label}</span>
    </button>
  );
};
