import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertOctagon, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
          <div className="h-12 w-12 rounded-full bg-error-container text-error flex items-center justify-center mb-4">
            <AlertOctagon className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold text-ink-primary mb-2">Something went wrong</h2>
          <p className="text-sm text-ink-muted max-w-md mb-6 leading-relaxed">
            An unexpected error occurred in the application view. Your input was not stored and the application can be safely reset.
          </p>
          <Button onClick={this.handleReset} variant="primary">
            <RotateCcw className="h-4 w-4" />
            Reset to Dashboard
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
