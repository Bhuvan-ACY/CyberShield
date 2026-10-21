import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * Initialized Supabase client for optional telemetry/feedback.
 * Core threat analysis runs 100% locally in-memory and never depends on Supabase connectivity.
 */
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export interface AnalysisFeedbackPayload {
  feedback_type: 'helpful' | 'unhelpful' | 'false_positive';
  detected_category: string;
  assigned_score: number;
  sanitized_comment?: string;
}

/**
 * Submit optional user feedback without blocking or crashing on failure.
 */
export async function submitAnalysisFeedback(payload: AnalysisFeedbackPayload): Promise<boolean> {
  if (!supabase) {
    // Supabase not configured in current environment; log gracefully
    return true;
  }

  try {
    const { error } = await supabase.from('analysis_feedback').insert([payload]);
    if (error) {
      console.warn('Feedback submission warning:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Feedback submission error:', err);
    return false;
  }
}
