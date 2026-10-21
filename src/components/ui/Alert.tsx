import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from 'lucide-react';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'warning' | 'error' | 'success';
  title?: string;
}

export const Alert: React.FC<AlertProps> = ({
  className,
  variant = 'info',
  title,
  children,
  ...props
}) => {
  const variantStyles = {
    info: 'bg-surface-1 border-hairline text-ink-primary',
    warning: 'bg-amber-50 border-amber-200 text-amber-900',
    error: 'bg-error-container/40 border-error/30 text-error-on',
    success: 'bg-emerald-50 border-emerald-200 text-emerald-900',
  };

  const icons = {
    info: <Info className="h-4 w-4 text-ink-secondary shrink-0 mt-0.5" />,
    warning: <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />,
    error: <AlertCircle className="h-4 w-4 text-error shrink-0 mt-0.5" />,
    success: <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />,
  };

  return (
    <div
      role="alert"
      className={cn(
        'flex items-start gap-3 rounded-lg border p-3.5 text-sm leading-relaxed',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {icons[variant]}
      <div className="flex-1 space-y-1">
        {title && <h5 className="font-semibold tracking-tight">{title}</h5>}
        <div className="text-xs sm:text-sm">{children}</div>
      </div>
    </div>
  );
};
