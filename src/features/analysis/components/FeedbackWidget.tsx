import React, { useState } from 'react';
import { useSubmitFeedback } from '../hooks/useSubmitFeedback';
import { Button } from '@/components/ui/Button';
import { ThumbsUp, ThumbsDown, AlertCircle, CheckCircle2 } from 'lucide-react';

interface FeedbackWidgetProps {
  detectedCategory: string;
  assignedScore: number;
}

export const FeedbackWidget: React.FC<FeedbackWidgetProps> = ({
  detectedCategory,
  assignedScore,
}) => {
  const [feedbackType, setFeedbackType] = useState<'helpful' | 'unhelpful' | 'false_positive' | null>(null);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { mutate, isPending } = useSubmitFeedback();

  const handleSendFeedback = (type: 'helpful' | 'unhelpful' | 'false_positive') => {
    setFeedbackType(type);
    mutate(
      {
        feedback_type: type,
        detected_category: detectedCategory,
        assigned_score: assignedScore,
        sanitized_comment: comment.trim() || undefined,
      },
      {
        onSuccess: () => {
          setIsSubmitted(true);
        },
        onError: () => {
          // Even on error, acknowledge locally without disrupting citizen flow
          setIsSubmitted(true);
        },
      }
    );
  };

  if (isSubmitted) {
    return (
      <div className="border border-hairline rounded-lg p-4 bg-canvas flex items-center justify-center gap-2 text-xs text-ink-primary">
        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
        <span>Thank you for your feedback! Anonymous telemetry helps refine heuristic accuracy.</span>
      </div>
    );
  }

  return (
    <div className="border border-hairline rounded-lg p-5 bg-canvas space-y-3 shadow-flat">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h4 className="text-sm font-bold text-ink-primary uppercase tracking-wider">
            Was this threat assessment helpful?
          </h4>
          <p className="text-xs text-ink-muted">
            Telemetry is strictly anonymized and contains no submitted message text.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant={feedbackType === 'helpful' ? 'primary' : 'outline'}
            size="sm"
            disabled={isPending}
            onClick={() => handleSendFeedback('helpful')}
            className="text-xs"
          >
            <ThumbsUp className="h-3 w-3 mr-1" />
            Helpful
          </Button>

          <Button
            type="button"
            variant={feedbackType === 'unhelpful' ? 'primary' : 'outline'}
            size="sm"
            disabled={isPending}
            onClick={() => handleSendFeedback('unhelpful')}
            className="text-xs"
          >
            <ThumbsDown className="h-3 w-3 mr-1" />
            Unhelpful
          </Button>

          <Button
            type="button"
            variant={feedbackType === 'false_positive' ? 'danger' : 'outline'}
            size="sm"
            disabled={isPending}
            onClick={() => handleSendFeedback('false_positive')}
            className="text-xs"
          >
            <AlertCircle className="h-3 w-3 mr-1" />
            False Positive
          </Button>
        </div>
      </div>

      <div className="pt-2 border-t border-surface-1">
        <input
          type="text"
          value={comment}
          maxLength={500}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Optional: Add a brief note (e.g., 'Missed electricity cutoff keyword') - max 500 chars"
          className="w-full px-3 py-1.5 text-xs rounded border border-hairline bg-surface-1/30 text-ink-primary placeholder:text-ink-faint focus:outline-none focus:ring-1 focus:ring-ink-dark"
        />
      </div>
    </div>
  );
};
