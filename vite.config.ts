/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom'
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@components': path.resolve(__dirname, './src/components'),
            '@const': path.resolve(__dirname, './src/const'),
            '@styles': path.resolve(__dirname, './src/styles'),
            '@contexts': path.resolve(__dirname, './src/contexts')
        }
    }
});
