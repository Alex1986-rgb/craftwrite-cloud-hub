
import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProviderErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ProviderErrorBoundaryProps {
  children: React.ReactNode;
}

export class ProviderErrorBoundary extends React.Component<ProviderErrorBoundaryProps, ProviderErrorBoundaryState> {
  constructor(props: ProviderErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ProviderErrorBoundaryState {
    console.error('Provider Error:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Provider ErrorBoundary caught an error:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <CardTitle className="text-xl text-red-800">Ошибка инициализации</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-slate-600">
                Произошла ошибка при инициализации приложения. Попробуйте перезагрузить страницу.
              </p>
              {this.state.error && (
                <details className="text-xs text-slate-500 mt-4">
                  <summary className="cursor-pointer mb-2">Детали ошибки</summary>
                  <pre className="text-left p-2 bg-slate-100 rounded overflow-auto">
                    {this.state.error.message}
                  </pre>
                </details>
              )}
              <Button onClick={this.resetError} className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                Попробовать снова
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ProviderErrorBoundary;
