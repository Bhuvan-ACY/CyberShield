import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ThreatAssessmentResult, ThreatAnalysisRequest } from '@/engine/types';
import { runThreatAnalysis } from '@/engine';

interface AnalysisContextType {
  currentResult: ThreatAssessmentResult | null;
  lastRequest: ThreatAnalysisRequest | null;
  isAnalyzing: boolean;
  analyze: (request: ThreatAnalysisRequest) => ThreatAssessmentResult;
  clearAnalysis: () => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export const AnalysisProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentResult, setCurrentResult] = useState<ThreatAssessmentResult | null>(null);
  const [lastRequest, setLastRequest] = useState<ThreatAnalysisRequest | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const analyze = (request: ThreatAnalysisRequest): ThreatAssessmentResult => {
    setIsAnalyzing(true);
    setLastRequest(request);

    // Run deterministic heuristic engine synchronously in memory
    const result = runThreatAnalysis(request);
    setCurrentResult(result);
    setIsAnalyzing(false);
    return result;
  };

  const clearAnalysis = () => {
    setCurrentResult(null);
    setLastRequest(null);
    setIsAnalyzing(false);
  };

  return (
    <AnalysisContext.Provider
      value={{
        currentResult,
        lastRequest,
        isAnalyzing,
        analyze,
        clearAnalysis,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};

export function useAnalysis(): AnalysisContextType {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
}
