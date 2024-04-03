import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';

import '@styles/global.css';
import { PhaseProvider } from '@/contexts/Phase.context.tsx';

ReactDOM.createRoot(document.getElementById('root')!)
    .render(
        <React.StrictMode>
            <PhaseProvider>
                <App />
            </PhaseProvider>
        </React.StrictMode>
    );
