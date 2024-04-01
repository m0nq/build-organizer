import { expect } from 'vitest';
import { describe } from 'vitest';
import { test } from 'vitest';

const sum = (a, b) => {
  return a + b;
};

describe('Canary tests', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

  test('adds 2 + 3 to equal 5', () => {
    expect(sum(2, 3)).toBe(5);
  });
});
