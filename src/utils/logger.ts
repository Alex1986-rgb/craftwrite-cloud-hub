interface LogEntry {
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  timestamp: string;
  context?: Record<string, any>;
}

class Logger {
  private isDevelopment = import.meta.env.DEV;

  private createLogEntry(level: LogEntry['level'], message: string, context?: Record<string, any>): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      context
    };
  }

  private log(entry: LogEntry) {
    if (this.isDevelopment) {
      const { level, message, timestamp, context } = entry;
      const logMethod = level === 'error' ? console.error : 
                       level === 'warn' ? console.warn : 
                       level === 'debug' ? console.debug : console.log;
      
      logMethod(`[${timestamp}] ${level.toUpperCase()}: ${message}`, context || '');
    }
  }

  info(message: string, context?: Record<string, any>) {
    this.log(this.createLogEntry('info', message, context));
  }

  warn(message: string, context?: Record<string, any>) {
    this.log(this.createLogEntry('warn', message, context));
  }

  error(message: string, context?: Record<string, any>) {
    this.log(this.createLogEntry('error', message, context));
  }

  debug(message: string, context?: Record<string, any>) {
    this.log(this.createLogEntry('debug', message, context));
  }
}

export const logger = new Logger();