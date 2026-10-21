import React, { useState } from 'react';
import { ScenarioSimulator } from '../components/ScenarioSimulator';
import { QuizSession } from '../components/QuizSession';
import { Tabs, TabItem } from '@/components/ui/Tabs';
import { Award, Smartphone, CheckSquare } from 'lucide-react';

export const TrainingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('simulator');

  const tabs: TabItem[] = [
    { id: 'simulator', label: 'Interactive Scam Simulator', icon: <Smartphone className="h-4 w-4" /> },
    { id: 'quiz', label: '10-Question Knowledge Quiz', icon: <CheckSquare className="h-4 w-4" /> },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-surface-1 border border-hairline text-xs font-semibold text-ink-primary">
          <Award className="h-3.5 w-3.5 text-amber-500" />
          <span>Interactive Defensive Training</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink-primary">
          Cybersecurity Practice & Simulations
        </h1>
        <p className="text-sm text-ink-muted leading-relaxed">
          Build instinctual defense against psychological manipulation by spotting deceptive hotspots on realistic message cards and testing your scam hygiene.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center">
        <Tabs items={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      {/* Active Experience */}
      <div>
        {activeTab === 'simulator' ? <ScenarioSimulator /> : <QuizSession />}
      </div>
    </div>
  );
};
