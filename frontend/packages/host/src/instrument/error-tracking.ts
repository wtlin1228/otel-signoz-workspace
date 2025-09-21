import { logError } from './logger';

import {
  ATTR_EXCEPTION_MESSAGE,
  ATTR_EXCEPTION_TYPE,
  ATTR_EXCEPTION_STACKTRACE,
} from '@opentelemetry/semantic-conventions';

// JavaScript Errors
window.addEventListener('error', (event) => {
  logError('window.onerror', {
    [ATTR_EXCEPTION_MESSAGE]: event.message,
    [ATTR_EXCEPTION_TYPE]: event.error?.name || 'Error',
    [ATTR_EXCEPTION_STACKTRACE]: event.error?.stack || '',
    'exception.source': event.filename,
    'exception.lineno': event.lineno,
    'exception.colno': event.colno,
  });
});

// JavaScript Rejections
window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason || {};
  logError('unhandledrejection', {
    [ATTR_EXCEPTION_MESSAGE]: reason.message || String(reason),
    [ATTR_EXCEPTION_TYPE]: reason.name || typeof reason || 'UnhandledRejection',
    [ATTR_EXCEPTION_STACKTRACE]: reason.stack || '',
  });
});

// JavaScript Console Errors
const originalConsoleError = console.error;
console.error = (...args) => {
  const message = args.map(String).join(' ');
  logError('console.error', {
    [ATTR_EXCEPTION_MESSAGE]: message,
    [ATTR_EXCEPTION_TYPE]: 'ConsoleError',
    [ATTR_EXCEPTION_STACKTRACE]: new Error().stack || '',
  });

  originalConsoleError(...args);
};
