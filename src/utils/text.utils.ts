/**
 * @file src/utils/text.utils.ts
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Text manipulation utilities
 */
export interface EmphasisSegment {
  text: string;
  bold: boolean;
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length).trim() + "...";
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

/**
 * @function capitalize
 * @description Capitalize first letter of each word
 */
export function capitalize(text: string): string {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * @function escapeRegex
 * @description Escape special regex characters
 */
export function escapeRegex(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * @function buildKeywordRegex
 * @description Build regex for keyword highlighting
 */
export function buildKeywordRegex(keywords: string[]): RegExp | null {
  if (!keywords.length) return null;
  try {
    const escaped = keywords.map(escapeRegex);
    return new RegExp(`\\b(${escaped.join("|")})\\b`, "gi");
  } catch {
    return null;
  }
}

/**
 * @function emphasizeText
 * @description Split text into segments with keyword emphasis
 */
export function emphasizeText(
  text: string,
  keywords: string[],
): EmphasisSegment[] {
  const regex = buildKeywordRegex(keywords);
  if (!regex) return [{ text, bold: false }];

  const segments: EmphasisSegment[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  // Reset regex state
  regex.lastIndex = 0;

  while ((match = regex.exec(text)) !== null) {
    const start = match.index;

    // Add non-match segment
    if (start > lastIndex) {
      segments.push({
        text: text.slice(lastIndex, start),
        bold: false,
      });
    }

    // Add match segment
    segments.push({
      text: match[0],
      bold: true,
    });

    lastIndex = start + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    segments.push({
      text: text.slice(lastIndex),
      bold: false,
    });
  }

  return segments;
}

/**
 * @function extractInitials
 * @description Extract initials from name
 */
export function extractInitials(name: string, maxLength = 2): string {
  const words = name.trim().split(/\s+/);
  const initials = words
    .slice(0, maxLength)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
  return initials;
}

/**
 * @function pluralize
 * @description Simple pluralization
 */
export function pluralize(
  count: number,
  singular: string,
  plural?: string,
): string {
  if (count === 1) return `${count} ${singular}`;
  return `${count} ${plural || singular + "s"}`;
}
