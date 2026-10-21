import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface AccordionItemProps {
  id: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  badge?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  subtitle,
  badge,
  children,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-hairline rounded-lg overflow-hidden bg-canvas">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full text-left px-4 py-3.5 flex items-center justify-between gap-3 hover:bg-surface-1/50 transition-colors focus:outline-none focus:bg-surface-1/70"
      >
        <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 pr-2">
          <div>
            <div className="font-semibold text-sm text-ink-primary">{title}</div>
            {subtitle && <div className="text-xs text-ink-muted mt-0.5">{subtitle}</div>}
          </div>
          {badge && <div className="shrink-0">{badge}</div>}
        </div>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-ink-muted shrink-0 transition-transform duration-200',
            isOpen && 'transform rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <div className="px-4 py-3.5 border-t border-hairline text-sm text-ink-muted leading-relaxed bg-surface-1/20">
          {children}
        </div>
      )}
    </div>
  );
};
