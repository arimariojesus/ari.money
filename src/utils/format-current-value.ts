export function formatCurrenyValue(value: number) {
  const currency = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
  
  return currency;
}