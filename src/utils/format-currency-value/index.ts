export function formatCurrencyValue(value: number) {
  if (isNaN(value) || (!value && value !== 0)) {
    throw new TypeError('You must provide a number to formatCurrencyValue!');
  }
  
  const currency = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
  
  return currency;
}