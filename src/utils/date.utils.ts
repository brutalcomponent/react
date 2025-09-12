/**
 * @file src/utils/date.utils.ts
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Date manipulation and formatting utilities
 */
export function formatDate(
  date: Date | string,
  style: "short" | "long" | "relative" = "short",
): string {
  const d = typeof date === "string" ? new Date(date) : date;

  switch (style) {
    case "long":
      return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

    case "short":
      return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

    case "relative":
      return formatRelativeTime(d);

    default:
      return d.toLocaleDateString();
  }
}

export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? "s" : ""} ago`;
  if (diffHour < 24) return `${diffHour} hour${diffHour > 1 ? "s" : ""} ago`;
  if (diffDay < 7) return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`;
  if (diffWeek < 4) return `${diffWeek} week${diffWeek > 1 ? "s" : ""} ago`;
  if (diffMonth < 12)
    return `${diffMonth} month${diffMonth > 1 ? "s" : ""} ago`;
  return `${diffYear} year${diffYear > 1 ? "s" : ""} ago`;
}

export function formatDuration(
  startDate: Date | string,
  endDate?: Date | string | null,
): string {
  const start = typeof startDate === "string" ? new Date(startDate) : startDate;
  const end = endDate
    ? typeof endDate === "string"
      ? new Date(endDate)
      : endDate
    : new Date();

  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  if (months === 0) return "Less than a month";

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years > 0 && remainingMonths > 0) {
    return `${years} year${years > 1 ? "s" : ""} ${remainingMonths} month${remainingMonths > 1 ? "s" : ""}`;
  } else if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""}`;
  } else {
    return `${remainingMonths} month${remainingMonths > 1 ? "s" : ""}`;
  }
}

/**
 * @function parseLooseDate
 * @description Parse various date formats (YYYY-MM, Month YYYY, etc.)
 */
export function parseLooseDate(dateStr: string): Date {
  if (!dateStr || dateStr.toLowerCase() === "present") {
    return new Date();
  }

  // Try YYYY-MM format
  const yearMonth = /^(\d{4})-(\d{1,2})$/.exec(dateStr);
  if (yearMonth) {
    return new Date(Number(yearMonth[1]), Number(yearMonth[2]) - 1, 1);
  }

  // Try natural parsing
  const parsed = new Date(dateStr);
  if (!isNaN(parsed.getTime())) {
    return parsed;
  }

  // Default to current date
  return new Date();
}

/**
 * @function isToday
 * @description Check if date is today
 */
export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

/**
 * @function addDays
 * @description Add days to a date
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
