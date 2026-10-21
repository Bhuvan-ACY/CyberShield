import React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <textarea
          ref={ref}
          className={cn(
            'flex min-h-[140px] w-full rounded-lg border border-hairline bg-canvas p-3 text-sm text-ink-primary',
            'placeholder:text-ink-faint focus:outline-none focus:ring-1 focus:ring-ink-dark focus:border-ink-dark',
            'disabled:cursor-not-allowed disabled:opacity-50 transition-colors leading-relaxed',
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
Textarea.displayName = 'Textarea';
