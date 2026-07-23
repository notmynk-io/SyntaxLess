import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Patch ResizeObserver to defer notifications via requestAnimationFrame
if (typeof window !== 'undefined' && window.ResizeObserver) {
  const NativeResizeObserver = window.ResizeObserver;
  window.ResizeObserver = class extends NativeResizeObserver {
    constructor(callback: ResizeObserverCallback) {
      super((entries, observer) => {
        window.requestAnimationFrame(() => {
          try {
            callback(entries, observer);
          } catch (err) {
            // Ignore benign resize loop errors
          }
        });
      });
    }
  };
}
const suppressResizeObserverError = (e: ErrorEvent | PromiseRejectionEvent) => {
  const msg = 'message' in e ? e.message : e.reason?.message || '';
  if (
    typeof msg === 'string' &&
    (msg.includes('ResizeObserver loop completed with undelivered notifications') ||
     msg.includes('ResizeObserver loop limit exceeded'))
  ) {
    if ('stopImmediatePropagation' in e) {
      e.stopImmediatePropagation();
    }
    if ('preventDefault' in e) {
      e.preventDefault();
    }
    return true;
  }
  return false;
};

window.addEventListener('error', suppressResizeObserverError, true);
window.addEventListener('unhandledrejection', suppressResizeObserverError, true);

// Patch window.onerror as fallback
const originalOnError = window.onerror;
window.onerror = function (message, source, lineno, colno, error) {
  if (
    typeof message === 'string' &&
    (message.includes('ResizeObserver loop completed with undelivered notifications') ||
     message.includes('ResizeObserver loop limit exceeded'))
  ) {
    return true;
  }
  if (originalOnError) {
    return originalOnError.call(this, message, source, lineno, colno, error);
  }
  return false;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

