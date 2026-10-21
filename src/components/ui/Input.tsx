import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={cn(
            'flex h-10 w-full rounded-lg border border-hairline bg-canvas px-3 py-2 text-sm text-ink-primary',
            'placeholder:text-ink-faint focus:outline-none focus:ring-1 focus:ring-ink-dark focus:border-ink-dark',
            'disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
            error && 'border-error focus:ring-error focus:border-error',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1.5 text-xs text-error font-medium">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';
