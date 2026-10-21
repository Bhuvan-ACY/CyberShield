import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="h-14 w-14 rounded-full bg-surface-1 text-ink-muted flex items-center justify-center mb-4 border border-hairline">
        <FileQuestion className="h-7 w-7" />
      </div>
      <span className="code-chip mb-2">404 NOT FOUND</span>
      <h1 className="text-2xl font-bold text-ink-primary mb-2">Route not located</h1>
      <p className="text-sm text-ink-muted max-w-sm mb-6 leading-relaxed">
        The requested resource or page does not exist. Please return to the CyberShield dashboard or start a threat analysis.
      </p>
      <div className="flex gap-3">
        <Link to="/">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4" />
            Home
          </Button>
        </Link>
        <Link to="/analyze">
          <Button variant="primary">Analyze Threats</Button>
        </Link>
      </div>
    </div>
  );
};
