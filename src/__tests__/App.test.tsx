import { render } from '@testing-library/react';
import { screen } from '@testing-library/react';
import { test } from 'vitest';
import { expect } from 'vitest';
import { describe } from 'vitest';
// import { fireEvent } from '@testing-library/react';
import App from '../App.jsx';

describe('App tests: zero state', () => {
    test('renders upload component as empty state', () => {
        render(<App />);
        // screen.debug();
        expect(screen.getByText('Browse')).toBeDefined();
    });

    test('renders description of upload component', () => {
        render(<App />);
        // screen.debug();
        expect(screen.getByText('You can upload up to 5 json files.')).toBeDefined();
    });
});
