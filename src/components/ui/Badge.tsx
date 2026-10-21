import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'surface' | 'low' | 'moderate' | 'high' | 'critical' | 'cobalt';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  size = 'md',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-sans font-medium rounded-md tracking-tight select-none';

  const variants = {
    default: 'bg-ink-dark text-canvas',
    surface: 'bg-surface-1 text-ink-primary border border-hairline',
    outline: 'border border-hairline text-ink-muted bg-canvas',
    low: 'bg-emerald-50 text-emerald-800 border border-emerald-300',
    moderate: 'bg-amber-50 text-amber-800 border border-amber-300',
    high: 'bg-orange-50 text-orange-800 border border-orange-300',
    critical: 'bg-red-50 text-red-800 border border-red-300',
    cobalt: 'bg-blue-50 text-cobalt border border-blue-200',
  };

  const sizes = {
    sm: 'text-xs px-2.5 py-0.5 font-medium',
    md: 'text-sm px-3 py-1 font-medium',
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
};
