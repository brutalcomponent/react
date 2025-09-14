/**
 * @file src/components/forms/ContactForm/ContactForm.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Brutal contact form component
 * @client This component requires client-side JavaScript
 */
"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { FaEnvelope, FaUser, FaPhone, FaBuilding } from "react-icons/fa";
import { Input } from "../../core/Input";
import { Select, Textarea } from "../../core/Input";
import { Button } from "../../core/Button";

export interface ContactFormProps {
  onSubmit: (data: ContactData) => void | Promise<void>;
  loading?: boolean;
  error?: string;
  success?: boolean;
  subjectOptions?: string[];
  showPhone?: boolean;
  showCompany?: boolean;
  className?: string;
}

export interface ContactData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  onSubmit,
  loading = false,
  error,
  success = false,
  subjectOptions = [
    "General Inquiry",
    "Support",
    "Sales",
    "Partnership",
    "Other",
  ],
  showPhone = true,
  showCompany = true,
  className,
}) => {
  const [formData, setFormData] = useState<ContactData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<ContactData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (
      showPhone &&
      formData.phone &&
      !/^[\d\s\-\+\(\)]+$/.test(formData.phone)
    ) {
      newErrors.phone = "Invalid phone number";
    }

    if (!formData.subject) {
      newErrors.subject = "Please select a subject";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message is too short";
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

  if (success) {
    return (
      <div
        className={clsx(
          "bg-brutal-mint p-8 border-4 border-brutal-black shadow-brutal text-center",
          "w-full max-w-md",
          className,
        )}
      >
        <h3 className="text-2xl font-black uppercase tracking-wider mb-4 text-brutal-black">
          Message Sent!
        </h3>
        <p className="text-brutal-gray-700 font-mono">
          Thank you for contacting us. We'll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(
        "bg-brutal-white p-8 border-4 border-brutal-black shadow-brutal",
        "w-full max-w-lg",
        className,
      )}
    >
      <h2 className="text-3xl font-black uppercase tracking-wider mb-6 text-brutal-black transform -skew-x-2">
        Get in Touch
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-brutal-coral border-2 border-brutal-black">
          <p className="text-sm font-bold uppercase">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            error={errors.email}
            leftIcon={FaEnvelope}
            placeholder="your@email.com"
            disabled={loading}
            brutal
          />
        </div>

        {(showPhone || showCompany) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {showPhone && (
              <Input
                label="Phone (Optional)"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                error={errors.phone}
                leftIcon={FaPhone}
                placeholder="+1 (555) 123-4567"
                disabled={loading}
                brutal
              />
            )}

            {showCompany && (
              <Input
                label="Company (Optional)"
                type="text"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                error={errors.company}
                leftIcon={FaBuilding}
                placeholder="Acme Inc."
                disabled={loading}
                brutal
              />
            )}
          </div>
        )}

        <Select
          label="Subject"
          value={formData.subject}
          onChange={(e) =>
            setFormData({ ...formData, subject: e.target.value })
          }
          error={errors.subject}
          options={[
            { value: "", label: "Select a subject..." },
            ...subjectOptions.map((opt) => ({ value: opt, label: opt })),
          ]}
          disabled={loading}
          brutal
        />

        <Textarea
          label="Message"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          error={errors.message}
          placeholder="Tell us what's on your mind..."
          rows={6}
          disabled={loading}
          brutal
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        brutal
        loading={loading}
        className="w-full mt-6"
        size="lg"
        uppercase
      >
        Send Message
      </Button>
    </form>
  );
};
