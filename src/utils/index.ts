/**
 * @file src/utils/index.ts
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Utilities barrel export
 */
// Text utilities
export {
  truncate,
  slugify,
  capitalize,
  escapeRegex,
  buildKeywordRegex,
  emphasizeText,
  extractInitials,
  pluralize,
  type EmphasisSegment,
} from "./text.utils";

// Date utilities
export {
  formatDate,
  formatRelativeTime,
  formatDuration,
  parseLooseDate,
  isToday,
  addDays,
} from "./date.utils";

// Validation utilities
export {
  validateEmail,
  validatePhone,
  validateName,
  validatePostalCode,
  validatePassword,
  validateUrl,
  validateUsername,
  type PasswordValidation,
} from "./validation.utils";

// Format utilities
export {
  formatPhone,
  formatCurrency,
  formatNumber,
  formatFileSize,
  formatPercentage,
  formatCreditCard,
} from "./format.utils";

// Classname utilities
export * from "./cn.utils";

// Tech utilities
export {
  commonTechnologies,
  getTechIcon,
  normalizeTechName,
  type TechItem,
} from "./tech.utils";
