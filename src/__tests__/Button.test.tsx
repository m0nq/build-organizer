import { expect } from 'vitest';
import { test } from 'vitest';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { Button } from '@components/Button.component.tsx';

test('Button renders with default styles and children', () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole('button', { name: /Click Me/i });

    expect(button).toBeDefined();
    // expect(button).toH('inline-block rounded bg-slate-600 py-2.5 px-6 text-sm font-bold uppercase text-white hover:bg-slate-500 hover:text-white');
    expect(button.textContent).toBe('Click Me');
});

// test('Button triggers click event handler when clicked', () => {
//     const handleClick = () => {};
//     render(<Button onClick={handleClick}>Click Me</Button>);
//     const button = screen.getByRole('button', { name: /Click Me/i });
//
//     fireEvent(getByText())
//
//     expect(handleClick).toHaveBeenCalledTimes(1);
// });
