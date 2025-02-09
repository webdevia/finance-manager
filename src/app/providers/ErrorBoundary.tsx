import React, { ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

 export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ error, errorInfo });
  }
  render() {
    const { hasError, error, errorInfo } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div>
          <h2>Oops! Something went wrong.</h2>
          <p>We apologize for the inconvenience. Please try refreshing the page.</p>
          <button onClick={() => window.location.reload()}>Refresh Page</button>
          <details style={{marginTop: 20, whiteSpace: 'pre-wrap' }}>
            {error && error.toString()}
            <br />
            {errorInfo && errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return children;
  }
}
