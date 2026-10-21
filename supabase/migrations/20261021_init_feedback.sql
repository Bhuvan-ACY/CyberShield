-- =====================================================================
-- CyberShield BaaS Migration: Analysis Feedback Table & RLS Policies
-- Reference: ARCHITECTURE.md Section 12.2 / PRD.md Section 13.2
-- =====================================================================

-- 1. Create analysis_feedback table
CREATE TABLE IF NOT EXISTS public.analysis_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    feedback_type VARCHAR(32) NOT NULL CHECK (feedback_type IN ('helpful', 'unhelpful', 'false_positive')),
    detected_category VARCHAR(64) NOT NULL,
    assigned_score SMALLINT NOT NULL CHECK (assigned_score >= 0 AND assigned_score <= 100),
    sanitized_comment TEXT CHECK (length(sanitized_comment) <= 500)
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.analysis_feedback ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Allow anonymous users to insert feedback
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'analysis_feedback' AND policyname = 'Allow anonymous insert feedback'
    ) THEN
        CREATE POLICY "Allow anonymous insert feedback" 
        ON public.analysis_feedback 
        FOR INSERT 
        TO anon 
        WITH CHECK (true);
    END IF;
END
$$;

-- 4. Policy: Deny public select (Only service role or admin can read telemetry)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'analysis_feedback' AND policyname = 'Deny public select feedback'
    ) THEN
        CREATE POLICY "Deny public select feedback" 
        ON public.analysis_feedback 
        FOR SELECT 
        TO anon 
        USING (false);
    END IF;
END
$$;
