import { formatCurrencyValue } from '.'

describe('formatCurrencyValue', () => {
  it('should return correct value', () => {
    expect(formatCurrencyValue(0)).toBe('R$\xa00,00');
    expect(formatCurrencyValue(10)).toBe('R$\xa010,00');
    expect(formatCurrencyValue(-10)).toBe('-R$\xa010,00');
    expect(formatCurrencyValue(1000)).toBe('R$\xa01.000,00');
  });
  
  it('should throw an error if called with an invalid value', () => {
    const func1 = () => {
      // @ts-ignore
      formatCurrencyValue('test');
    };
    
    expect(func1).toThrow(TypeError);

    const func2 = () => {
      // @ts-ignore
      formatCurrencyValue(null);
    };
    
    expect(func2).toThrow(TypeError);

    const func3 = () => {
      // @ts-ignore
      formatCurrencyValue(undefined);
    };
    
    expect(func3).toThrow(TypeError);
  });
});
