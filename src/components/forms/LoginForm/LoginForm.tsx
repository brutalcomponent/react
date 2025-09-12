/**
 * @file src/components/forms/LoginForm/LoginForm.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Brutal login form component with validation
 * @client This component requires client-side JavaScript
 */
"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Input } from "../../core/Input";
import { Button } from "../../core/Button";
import { Checkbox } from "../../core/Checkbox";

export interface LoginFormProps {
  onSubmit: (data: LoginData) => void | Promise<void>;
  loading?: boolean;
  error?: string;
  allowRemember?: boolean;
  forgotPasswordHref?: string;
  signUpHref?: string;
  className?: string;
}

export interface LoginData {
  email: string;
  password: string;
  remember?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  loading = false,
  error,
  allowRemember = true,
  forgotPasswordHref,
  signUpHref,
  className,
}) => {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<LoginData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginData> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
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
        Login
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-brutal-coral border-2 border-brutal-black">
          <p className="text-sm font-bold uppercase">{error}</p>
        </div>
      )}

      <div className="space-y-4">
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
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        {allowRemember && (
          <Checkbox
            label="Remember me"
            checked={formData.remember}
            onChange={(checked) =>
              setFormData({ ...formData, remember: checked })
            }
            disabled={loading}
          />
        )}

        {forgotPasswordHref && (
          <a
            href={forgotPasswordHref}
            className="text-sm font-bold text-brutal-black hover:text-brutal-pink transition-colors uppercase"
          >
            Forgot password?
          </a>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        brutal
        loading={loading}
        className="w-full mt-6"
        size="lg"
      >
        Sign In
      </Button>

      {signUpHref && (
        <p className="mt-4 text-center text-sm">
          <span className="text-brutal-gray-600">Don't have an account? </span>
          <a
            href={signUpHref}
            className="font-bold text-brutal-black hover:text-brutal-pink transition-colors uppercase"
          >
            Sign up
          </a>
        </p>
      )}
    </form>
  );
};
