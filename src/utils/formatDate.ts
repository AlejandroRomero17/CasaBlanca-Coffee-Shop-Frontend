// src/utils/formatDate.ts

export function formatDateForUser(
  dateInput: string | Date,
  options?: Intl.DateTimeFormatOptions,
  locale: string = "es-MX",
  overrideTimeZone?: string
): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  const timeZone =
    overrideTimeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;

  return date.toLocaleString(locale, {
    timeZone,
    dateStyle: "medium",
    timeStyle: "short",
    ...options,
  });
}
