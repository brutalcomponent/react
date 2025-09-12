/**
 * @file src/utils/format.utils.ts
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Formatting utilities for display
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }

  if (cleaned.length === 11 && cleaned[0] === "1") {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }

  return phone;
}

export function formatCurrency(
  amount: number,
  currency = "USD",
  locale = "en-US",
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}

export function formatNumber(
  num: number,
  decimals = 0,
  locale = "en-US",
): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

/**
 * @function formatFileSize
 * @description Format bytes to human readable size
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";

  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * @function formatPercentage
 * @description Format number as percentage
 */
export function formatPercentage(value: number, decimals = 0): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * @function formatCreditCard
 * @description Format credit card number with spaces
 */
export function formatCreditCard(cardNumber: string): string {
  const cleaned = cardNumber.replace(/\s/g, "");
  const groups = cleaned.match(/.{1,4}/g) || [];
  return groups.join(" ");
}
