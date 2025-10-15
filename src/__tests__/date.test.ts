import { describe, expect, it } from 'vitest';
import { formatDateToDisplay, formatTimeToDisplay } from '@/utils/date';

describe('date utils', () => {
  it('formats ISO date to pt-BR', () => {
    expect(formatDateToDisplay('2025-12-25')).toMatch(/25\/12\/2025/);
  });

  it('formats time HH:mm to pt-BR', () => {
    expect(formatTimeToDisplay('08:05')).toMatch(/08:05/);
  });
});


