/**
 * @file src/utils/validation.utils.ts
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Input validation utilities
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, "");
  return cleaned.length >= 10 && cleaned.length <= 15;
}

export function validateName(name: string): boolean {
  const nameRegex = /^[a-zA-Z\s\-'\.]{2,}$/;
  return nameRegex.test(name.trim());
}

/**
 * @function validatePostalCode
 * @description Validate postal code by country
 */
export function validatePostalCode(code: string, country = "US"): boolean {
  const patterns: Record<string, RegExp> = {
    US: /^\d{5}(-\d{4})?$/,
    CA: /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i,
    UK: /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i,
    GB: /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i,
    AU: /^\d{4}$/,
    DE: /^\d{5}$/,
    FR: /^\d{5}$/,
    JP: /^\d{3}-?\d{4}$/,
  };

  return patterns[country]?.test(code) || code.length > 0;
}

/**
 * @function validatePassword
 * @description Validate password strength
 */
export interface PasswordValidation {
  isValid: boolean;
  errors: string[];
}

export function validatePassword(password: string): PasswordValidation {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain lowercase letter");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain uppercase letter");
  }
  if (!/\d/.test(password)) {
    errors.push("Password must contain number");
  }
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push("Password must contain special character");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * @function validateUrl
 * @description Validate URL format
 */
export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * @function validateUsername
 * @description Validate username (alphanumeric, underscore, dash)
 */
export function validateUsername(username: string): boolean {
  const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
  return usernameRegex.test(username);
}
