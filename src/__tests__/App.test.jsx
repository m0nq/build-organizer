import { render } from '@testing-library/react';
import { screen } from '@testing-library/react';
import { test } from 'vitest';
import { expect } from 'vitest';
import { describe } from 'vitest';
// import { fireEvent } from '@testing-library/react';
// import { useState } from 'react';
import App from '../App.jsx';

describe('App test', () => {
  test('renders', () => {
    render(<App />);
    expect(screen.getByText('Increase')).toBeDefined();
  });
});
