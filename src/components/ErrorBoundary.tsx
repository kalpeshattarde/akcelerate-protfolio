import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface Props { children: ReactNode }
interface State { hasError: boolean; error?: Error }

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background px-6">
          <div className="text-center max-w-md space-y-4">
            <AlertTriangle className="w-12 h-12 text-destructive mx-auto" />
            <h1 className="text-2xl font-bold text-foreground">Something went wrong</h1>
            <p className="text-muted-foreground">An unexpected error occurred. Please refresh or go back to the homepage.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => window.location.reload()} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium">Refresh Page</button>
              <a href="/" className="px-4 py-2 border border-border text-foreground rounded-lg text-sm font-medium">Go Home</a>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
