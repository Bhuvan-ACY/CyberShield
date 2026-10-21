import React, { useState } from 'react';
import { SCAM_SIMULATION_SCENARIOS, ScamScenario } from '../data/scenarios';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import {
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Info,
} from 'lucide-react';

export const ScenarioSimulator: React.FC = () => {
  const [activeScenarioIndex, setActiveScenarioIndex] = useState<number>(0);
  const [userGuess, setUserGuess] = useState<'scam' | 'safe' | null>(null);
  const [revealedHotspots, setRevealedHotspots] = useState<string[]>([]);

  const scenario: ScamScenario = SCAM_SIMULATION_SCENARIOS[activeScenarioIndex];

  const handleNext = () => {
    setUserGuess(null);
    setRevealedHotspots([]);
    setActiveScenarioIndex((prev) => (prev + 1) % SCAM_SIMULATION_SCENARIOS.length);
  };

  const handleToggleHotspot = (hotspotId: string) => {
    setRevealedHotspots((prev) =>
      prev.includes(hotspotId) ? prev.filter((id) => id !== hotspotId) : [...prev, hotspotId]
    );
  };

  const isAnswered = userGuess !== null;
  const isCorrect = userGuess === (scenario.isScam ? 'scam' : 'safe');

  return (
    <div className="space-y-6">
      {/* Scenario Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-hairline">
        <div className="flex flex-wrap items-center gap-2">
          {SCAM_SIMULATION_SCENARIOS.map((sc, idx) => (
            <button
              key={sc.id}
              onClick={() => {
                setActiveScenarioIndex(idx);
                setUserGuess(null);
                setRevealedHotspots([]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                activeScenarioIndex === idx
                  ? 'bg-ink-dark text-canvas border-ink-dark'
                  : 'bg-canvas text-ink-muted border-hairline hover:bg-surface-1'
              }`}
            >
              Scenario {idx + 1}
            </button>
          ))}
        </div>

        <span className="text-xs text-ink-secondary">
          Scenario {activeScenarioIndex + 1} of {SCAM_SIMULATION_SCENARIOS.length}
        </span>
      </div>

      {/* Main Scenario Simulation Card */}
      <Card className="shadow-flat border-hairline space-y-6">
        <CardHeader className="pb-3 border-none">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <Badge variant="surface" size="sm">
              Domain: {scenario.threatType}
            </Badge>
            <span className="code-chip">{scenario.messageCard.channel} Simulation</span>
          </div>

          <CardTitle className="text-lg">{scenario.title}</CardTitle>
          <CardDescription className="text-xs">
            Inspect the simulated message card below. Tap the highlighted threat hotspots or determine whether this communication is a scam.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 pt-0">
          {/* Simulated Mobile Message Screen */}
          <div className="max-w-lg mx-auto bg-surface-1/40 rounded-xl border-2 border-hairline p-4 sm:p-5 space-y-3 font-sans shadow-sm">
            {/* Header info */}
            <div className="flex items-center justify-between text-xs text-ink-secondary border-b border-hairline pb-2">
              <div className="flex items-center gap-1.5 font-medium text-ink-dark">
                <Smartphone className="h-3.5 w-3.5" />
                <span>{scenario.messageCard.sender}</span>
              </div>
              <span>{scenario.messageCard.timestamp}</span>
            </div>

            {/* Message bubble */}
            <div className="bg-canvas border border-hairline rounded-lg p-4 text-xs sm:text-sm text-ink-primary leading-relaxed shadow-sm">
              <p className="whitespace-pre-wrap">{scenario.messageCard.body}</p>
            </div>
          </div>

          {/* Interactive Hotspot Inspector */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-ink-primary uppercase tracking-wider flex items-center gap-1.5">
                <Info className="h-4 w-4 text-cobalt" />
                Inspect Warning Signs & Hotspots ({scenario.hotspots.length})
              </span>
              <span className="text-[11px] text-ink-secondary">Tap any sign to reveal forensic breakdown</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {scenario.hotspots.map((hs) => {
                const isRevealed = revealedHotspots.includes(hs.id);
                return (
                  <div
                    key={hs.id}
                    onClick={() => handleToggleHotspot(hs.id)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      isRevealed
                        ? 'bg-canvas border-ink-dark/60 shadow-halo'
                        : 'bg-surface-1/40 border-hairline hover:bg-surface-1/70'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-semibold text-xs text-ink-primary truncate">
                        {hs.title}
                      </span>
                      <span className="code-chip text-[9px]">{isRevealed ? 'Hide' : 'Inspect'}</span>
                    </div>

                    {isRevealed ? (
                      <p className="text-[11px] text-ink-muted leading-relaxed mt-1">
                        {hs.explanation}
                      </p>
                    ) : (
                      <p className="text-[11px] text-ink-secondary italic truncate">
                        "{hs.textExcerpt}"
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* User Decision Interaction */}
          <div className="border-t border-hairline pt-6 space-y-4">
            <h4 className="text-sm font-bold text-ink-primary text-center">
              What is your verdict on this communication?
            </h4>

            {!isAnswered ? (
              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setUserGuess('safe')}
                  className="w-36 hover:border-emerald-500"
                >
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  It's Safe
                </Button>

                <Button
                  variant="danger"
                  size="md"
                  onClick={() => setUserGuess('scam')}
                  className="w-36"
                >
                  <ShieldAlert className="h-4 w-4" />
                  It's a Scam!
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <Alert
                  variant={isCorrect ? 'success' : 'error'}
                  title={isCorrect ? 'Correct Assessment!' : 'Incorrect Assessment'}
                >
                  <p className="mb-2">
                    {scenario.isScam
                      ? 'This scenario is an active fraud attempt.'
                      : 'This scenario is a legitimate notification.'}
                  </p>
                  <p className="text-xs">{scenario.verdictExplanation}</p>
                </Alert>

                <div className="flex justify-center">
                  <Button variant="primary" size="sm" onClick={handleNext}>
                    Next Scenario
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
