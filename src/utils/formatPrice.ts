export const formatPrice = (priceInCents: number) => {
  // priceInCents: 7000 = $70.00
  const amountInPesos = priceInCents / 100;
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(amountInPesos);
};
