import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/quizBank';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { CheckCircle2, XCircle, RotateCcw, BookOpen, Award, ArrowRight } from 'lucide-react';

export const QuizSession: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const question: QuizQuestion = QUIZ_QUESTIONS[currentIndex];
  const selectedOption = selectedAnswers[currentIndex];

  const handleSelectOption = (optionIndex: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex,
    }));
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === undefined) return;
    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
      setIsAnswerSubmitted(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setIsAnswerSubmitted(false);
    setIsFinished(false);
  };

  // Calculate score
  const correctCount = Object.entries(selectedAnswers).reduce((acc, [qIdx, ansIdx]) => {
    const q = QUIZ_QUESTIONS[Number(qIdx)];
    return q && q.correctIndex === ansIdx ? acc + 1 : acc;
  }, 0);

  // Remediation: list of questions missed
  const missedQuestions = QUIZ_QUESTIONS.filter(
    (q, idx) => selectedAnswers[idx] !== undefined && selectedAnswers[idx] !== q.correctIndex
  );

  if (isFinished) {
    const percentage = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);
    return (
      <Card className="max-w-2xl mx-auto p-6 sm:p-8 shadow-flat border-hairline space-y-6 text-center">
        <div className="h-16 w-16 rounded-full bg-surface-1 border border-hairline flex items-center justify-center mx-auto text-ink-dark">
          <Award className="h-8 w-8 text-amber-500" />
        </div>

        <div className="space-y-2">
          <span className="code-chip">ASSESSMENT COMPLETE</span>
          <h2 className="text-2xl font-bold text-ink-primary">Cybersecurity Hygiene Score</h2>
          <div className="text-5xl font-extrabold text-ink-dark tracking-tight my-2">
            {correctCount} <span className="text-2xl font-medium text-ink-muted">/ 10</span>
          </div>
          <p className="text-xs sm:text-sm text-ink-muted max-w-md mx-auto">
            {percentage >= 80
              ? 'Outstanding! You demonstrate high awareness of digital arrest coercion, lookalike domains, and OTP deception.'
              : percentage >= 50
              ? 'Good foundation, but certain phishing tactics or permission hazards caught you off guard.'
              : 'Caution warranted. We strongly recommend reviewing our threat awareness guides to avoid falling victim to common extortion tricks.'}
          </p>
        </div>

        {/* Remediation Guide links if any question missed */}
        {missedQuestions.length > 0 && (
          <div className="border border-hairline rounded-lg p-5 bg-surface-1/40 text-left space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-ink-primary uppercase tracking-wider">
              <BookOpen className="h-4 w-4 text-cobalt" />
              Recommended Review Topics ({missedQuestions.length})
            </div>
            <p className="text-xs text-ink-muted">
              Based on questions answered incorrectly, we recommend reading these educational guides:
            </p>

            <div className="space-y-2 pt-1">
              {missedQuestions.map((q) => (
                <div
                  key={q.id}
                  className="p-2.5 rounded bg-canvas border border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                >
                  <span className="text-ink-primary font-medium truncate max-w-full sm:max-w-sm">
                    Q{q.id}: {q.question}
                  </span>
                  <Link to="/app/awareness" className="text-cobalt font-semibold hover:underline shrink-0 flex items-center gap-1 self-start sm:self-auto">
                    Read Guide <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4 border-t border-hairline">
          <Button variant="outline" size="md" onClick={handleReset} className="w-full sm:w-auto min-h-[44px]">
            <RotateCcw className="h-4 w-4" />
            Retake Quiz
          </Button>

          <Link to="/app/awareness" className="w-full sm:w-auto">
            <Button variant="primary" size="md" className="w-full min-h-[44px]">
              Explore Threat Awareness
            </Button>
          </Link>
        </div>
      </Card>
    );
  }

  const isCurrentCorrect = selectedOption === question.correctIndex;

  return (
    <Card className="max-w-2xl mx-auto shadow-flat border-hairline space-y-6">
      {/* Progress header */}
      <CardHeader className="pb-3 border-none">
        <div className="flex items-center justify-between text-sm text-ink-secondary mb-2">
          <span className="code-chip">Question {currentIndex + 1} of {QUIZ_QUESTIONS.length}</span>
          <span>Score: {correctCount} correct</span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-surface-1 h-2 rounded-full overflow-hidden">
          <div
            className="bg-ink-dark h-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
          />
        </div>

        <CardTitle className="text-lg sm:text-xl font-bold leading-snug pt-3">
          {question.question}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 pt-0">
        {/* Options */}
        <div className="space-y-2.5">
          {question.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            let optionStyles = 'border-hairline bg-canvas hover:bg-surface-1/40 text-ink-primary';

            if (isAnswerSubmitted) {
              if (idx === question.correctIndex) {
                optionStyles = 'border-emerald-500 bg-emerald-50 text-emerald-950 dark:bg-emerald-950/50 dark:border-emerald-700 dark:text-emerald-200 font-semibold';
              } else if (isSelected && !isCurrentCorrect) {
                optionStyles = 'border-red-400 bg-red-50 text-red-950 dark:bg-red-950/50 dark:border-red-700 dark:text-red-200';
              } else {
                optionStyles = 'border-hairline bg-canvas opacity-50 text-ink-faint';
              }
            } else if (isSelected) {
              optionStyles = 'border-ink-dark bg-surface-1/80 text-ink-dark font-semibold';
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswerSubmitted}
                className={`w-full text-left p-3.5 rounded-lg border text-sm sm:text-base transition-all flex items-start gap-3 ${optionStyles}`}
              >
                <span className="font-mono text-sm font-bold text-ink-secondary mt-0.5 shrink-0">
                  {String.fromCharCode(65 + idx)}.
                </span>
                <span className="flex-1 leading-relaxed">{option}</span>
                {isAnswerSubmitted && idx === question.correctIndex && (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                )}
                {isAnswerSubmitted && isSelected && !isCurrentCorrect && (
                  <XCircle className="h-4 w-4 text-error shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback Alert after submission */}
        {isAnswerSubmitted && (
          <Alert
            variant={isCurrentCorrect ? 'success' : 'error'}
            title={isCurrentCorrect ? 'Correct!' : 'Incorrect'}
          >
            <p className="text-xs leading-relaxed">{question.explanation}</p>
          </Alert>
        )}

        {/* Action button */}
        <div className="flex justify-end pt-4 border-t border-hairline">
          {!isAnswerSubmitted ? (
            <Button
              variant="primary"
              size="md"
              disabled={selectedOption === undefined}
              onClick={handleSubmitAnswer}
            >
              Submit Answer
            </Button>
          ) : (
            <Button variant="primary" size="md" onClick={handleNextQuestion}>
              {currentIndex + 1 < QUIZ_QUESTIONS.length ? 'Next Question' : 'View Final Score'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
