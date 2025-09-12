/**
 * @file src/components/forms/RegisterForm/RegisterForm.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Brutal registration form component
 * @client This component requires client-side JavaScript
 */
"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { Input } from "../../core/Input";
import { Button } from "../../core/Button";
import { Checkbox } from "../../core/Checkbox";

export interface RegisterFormProps {
  onSubmit: (data: RegisterData) => void | Promise<void>;
  loading?: boolean;
  error?: string;
  requireTerms?: boolean;
  termsHref?: string;
  privacyHref?: string;
  loginHref?: string;
  className?: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  loading = false,
  error,
  requireTerms = true,
  termsHref = "/terms",
  privacyHref = "/privacy",
  loginHref = "/login",
  className,
}) => {
  const [formData, setFormData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof RegisterData, string>>
  >({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof RegisterData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, and number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (requireTerms && !formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      await onSubmit(formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(
        "bg-brutal-white p-8 border-4 border-brutal-black shadow-brutal",
        "w-full max-w-md",
        className,
      )}
    >
      <h2 className="text-3xl font-black uppercase tracking-wider mb-6 text-brutal-black transform -skew-x-2">
        Register
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-brutal-coral border-2 border-brutal-black">
          <p className="text-sm font-bold uppercase">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        <Input
          label="Name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
          leftIcon={FaUser}
          placeholder="John Doe"
          disabled={loading}
          brutal
        />

        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
          leftIcon={FaEnvelope}
          placeholder="your@email.com"
          disabled={loading}
          brutal
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            error={errors.password}
            leftIcon={FaLock}
            placeholder="••••••••"
            disabled={loading}
            brutal
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[38px] text-brutal-gray-500 hover:text-brutal-black transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="relative">
          <Input
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            error={errors.confirmPassword}
            leftIcon={FaLock}
            placeholder="••••••••"
            disabled={loading}
            brutal
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-[38px] text-brutal-gray-500 hover:text-brutal-black transition-colors"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>

      {requireTerms && (
        <div className="mt-4 space-y-2">
          <Checkbox
            checked={formData.acceptTerms}
            onChange={(checked) =>
              setFormData({ ...formData, acceptTerms: checked })
            }
            error={errors.acceptTerms}
            disabled={loading}
          />
          <div className="ml-9 text-xs text-brutal-gray-700">
            I accept the{" "}
            <a
              href={termsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brutal-pink hover:text-brutal-peach font-bold"
              onClick={(e) => e.stopPropagation()}
            >
              terms of service
            </a>
            {" and "}
            <a
              href={privacyHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brutal-pink hover:text-brutal-peach font-bold"
              onClick={(e) => e.stopPropagation()}
            >
              privacy policy
            </a>
          </div>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        brutal
        loading={loading}
        loadingText="Creating account..."
        className="w-full mt-6"
        size="lg"
      >
        Create Account
      </Button>

      {loginHref && (
        <p className="mt-4 text-center text-sm">
          <span className="text-brutal-gray-600">
            Already have an account?{" "}
          </span>
          <a
            href={loginHref}
            className="font-bold text-brutal-black hover:text-brutal-pink transition-colors uppercase"
          >
            Sign in
          </a>
        </p>
      )}
    </form>
  );
};
