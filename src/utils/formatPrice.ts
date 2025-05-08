// src/utils/formatPrice.ts

/**
 * Formats a number into a currency string.
 *
 * @param value   The numeric amount to format.
 * @param locale  BCP 47 language tag, defaults to "es-MX".
 * @param currency  ISO 4217 currency code, defaults to "MXN".
 * @returns A localized currency string, e.g. "$1,234.00".
 */
export function formatPrice(
  value: number,
  locale: string = "es-MX",
  currency: string = "MXN"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
