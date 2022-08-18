import { formatCurrencyValue } from '.'

describe('formatCurrencyValue', () => {
  it('should return correct value', () => {
    expect(formatCurrencyValue(0)).toBe('R$\xa00,00');
    expect(formatCurrencyValue(10)).toBe('R$\xa010,00');
    expect(formatCurrencyValue(-10)).toBe('-R$\xa010,00');
    expect(formatCurrencyValue(1000)).toBe('R$\xa01.000,00');
  });
});
