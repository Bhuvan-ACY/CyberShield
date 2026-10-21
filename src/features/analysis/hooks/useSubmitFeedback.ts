import { useMutation } from '@tanstack/react-query';
import { supabase, AnalysisFeedbackPayload } from '@/lib/supabase';

/**
 * TanStack Query Mutation for submitting anonymous analysis feedback to Supabase BaaS.
 * Adheres to RULE-061 & ARCHITECTURE.md Section 9.2.
 */
export function useSubmitFeedback() {
  return useMutation({
    mutationFn: async (payload: AnalysisFeedbackPayload) => {
      if (!supabase) {
        // Safe offline mode simulation if Supabase is disconnected
        return { success: true, offline: true };
      }

      const { data, error } = await supabase.from('analysis_feedback').insert([payload]);
      if (error) {
        throw new Error(error.message);
      }
      return { success: true, data };
    },
    retry: 1,
  });
}
