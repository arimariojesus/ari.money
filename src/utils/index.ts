export function formatCurrenyValue(value: number) {
  const currency = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
  
  return currency;
}

export function formatDateTime(date: string) {
  return new Intl.DateTimeFormat("pt-BR").format(
    new Date(date)
  );
}