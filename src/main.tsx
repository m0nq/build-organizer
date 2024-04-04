import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';

import { PhaseProvider } from '@contexts/PhaseBuilder.context.tsx';
import App from './App.tsx';

import '@styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!)
    .render(
        <React.StrictMode>
            <ErrorBoundary fallback={<p>Something went wrong. Refresh and try again?</p>}>
                <PhaseProvider>
                    <App />
                </PhaseProvider>
            </ErrorBoundary>
        </React.StrictMode>
    );
