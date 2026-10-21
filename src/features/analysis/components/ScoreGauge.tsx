import React from 'react';
import { motion } from 'framer-motion';
import { RiskTier } from '@/engine/types';
import { Badge } from '@/components/ui/Badge';
import { ShieldAlert, ShieldCheck, AlertTriangle } from 'lucide-react';

interface ScoreGaugeProps {
  score: number;
  tier: RiskTier;
  isInconclusive: boolean;
  headline: string;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score,
  tier,
  isInconclusive,
  headline,
}) => {
  const radius = 70;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const strokeDashoffset = circumference - progress;

  const colorConfig = {
    low: {
      stroke: '#16a34a',
      bg: 'text-emerald-500',
      badgeVariant: 'low' as const,
      label: 'Low Risk',
      icon: <ShieldCheck className="h-6 w-6 text-emerald-600" />,
    },
    moderate: {
      stroke: '#ca8a04',
      bg: 'text-amber-500',
      badgeVariant: 'moderate' as const,
      label: 'Moderate Risk',
      icon: <AlertTriangle className="h-6 w-6 text-amber-600" />,
    },
    high: {
      stroke: '#ea580c',
      bg: 'text-orange-500',
      badgeVariant: 'high' as const,
      label: 'High Risk',
      icon: <AlertTriangle className="h-6 w-6 text-orange-600" />,
    },
    very_high: {
      stroke: '#ba1a1a',
      bg: 'text-red-600',
      badgeVariant: 'critical' as const,
      label: 'Very High Risk',
      icon: <ShieldAlert className="h-6 w-6 text-red-600" />,
    },
  };

  const currentConfig = colorConfig[tier];

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 p-6 border border-hairline rounded-lg bg-canvas shadow-flat">
      {/* Animated Radial SVG Gauge */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg width="170" height="170" className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="85"
            cy="85"
            r={radius}
            stroke="#e8e8e8"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <motion.circle
            cx="85"
            cy="85"
            r={radius}
            stroke={isInconclusive ? '#909090' : currentConfig.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: isInconclusive ? circumference : strokeDashoffset }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Inner Score Display */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-5xl font-extrabold tracking-tight text-ink-dark">
            {isInconclusive ? '—' : score}
          </span>
          <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider">
            out of 100
          </span>
        </div>
      </div>

      {/* Details & Classification */}
      <div className="flex-1 space-y-2.5 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          {isInconclusive ? (
            <Badge variant="outline" size="md">
              Inconclusive Context
            </Badge>
          ) : (
            <Badge variant={currentConfig.badgeVariant} size="md">
              {currentConfig.label}
            </Badge>
          )}
          <span className="code-chip">Score: {score}/100</span>
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-ink-primary leading-snug">
          {headline}
        </h2>

        <p className="text-xs text-ink-secondary leading-relaxed">
          {isInconclusive
            ? 'The evaluation engine could not establish definitive threat markers due to sparse input.'
            : `Assessed across 4 heuristic rule categories. Score normalized using contextual weighting and indicator deduplication.`}
        </p>
      </div>
    </div>
  );
};
