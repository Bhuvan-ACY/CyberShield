import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-sans font-semibold rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-dark/20 disabled:pointer-events-none disabled:opacity-50 select-none';

    const variants = {
      primary: 'bg-ink-dark text-canvas hover:bg-ink-primary active:bg-ink-mid shadow-flat',
      secondary: 'bg-surface-1 text-ink-primary hover:bg-hairline/60 active:bg-hairline',
      outline: 'border border-hairline bg-canvas text-ink-primary hover:bg-surface-1 active:bg-hairline/40 shadow-flat',
      ghost: 'text-ink-primary hover:bg-surface-1 active:bg-hairline/30',
      danger: 'bg-error text-canvas hover:bg-error-on active:bg-error-on/90',
    };

    const sizes = {
      sm: 'text-xs h-8 px-3 py-1 gap-1.5',
      md: 'text-sm h-10 px-4 py-2 gap-2',
      lg: 'text-base h-12 px-6 py-3 gap-2.5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
