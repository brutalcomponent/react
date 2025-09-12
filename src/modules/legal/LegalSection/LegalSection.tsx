/**
 * @file src/modules/legal/LegalSection/LegalSection.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Section component for legal documents with brutal styling
 */
import React from "react";
import { clsx } from "clsx";

export interface LegalSectionProps {
  title: string;
  children: React.ReactNode;
  numbered?: boolean;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
}

export const LegalSection: React.FC<LegalSectionProps> = ({
  title,
  children,
  numbered = false,
  className,
  titleClassName,
  contentClassName,
}) => {
  return (
    <section className={clsx("mb-8", className)}>
      <h2
        className={clsx(
          "text-2xl font-black uppercase tracking-wider mb-4",
          "border-b-4 border-brutal-black pb-2",
          "transform -skew-x-2",
          titleClassName,
        )}
      >
        {title}
      </h2>
      <div
        className={clsx(
          "space-y-4 font-mono text-sm leading-relaxed",
          contentClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
};

export interface PrivacyPolicyProps {
  companyName: string;
  email: string;
  lastUpdated: string;
  sections?: {
    informationCollection?: boolean;
    dataUsage?: boolean;
    dataSharing?: boolean;
    dataSecurity?: boolean;
    userRights?: boolean;
    cookies?: boolean;
    children?: boolean;
    international?: boolean;
    changes?: boolean;
  };
  customSections?: React.ReactNode;
  className?: string;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({
  companyName,
  email,
  lastUpdated,
  sections = {
    informationCollection: true,
    dataUsage: true,
    dataSharing: true,
    dataSecurity: true,
    userRights: true,
    cookies: true,
    children: true,
    international: true,
    changes: true,
  },
  customSections,
  className,
}) => {
  return (
    <div className={clsx("max-w-4xl", className)}>
      <div className="mb-8 p-6 bg-brutal-black text-brutal-white">
        <h1 className="text-4xl font-black uppercase tracking-wider mb-2">
          Privacy Policy
        </h1>
        <p className="font-mono text-sm">Last updated: {lastUpdated}</p>
      </div>

      {sections.informationCollection && (
        <LegalSection title="Information We Collect">
          <p>
            {companyName} collects information you provide directly to us, such
            as when you create an account, make a purchase, or contact us.
          </p>
          <div className="pl-4 space-y-2">
            <p>
              <strong>Personal Information:</strong> Name, email, shipping
              address, payment information
            </p>
            <p>
              <strong>Automatic Information:</strong> IP address, browser type,
              device information
            </p>
            <p>
              <strong>Cookies:</strong> We use cookies to enhance your
              experience
            </p>
          </div>
        </LegalSection>
      )}

      {customSections}

      <LegalSection title="Contact Us">
        <p>
          If you have questions about this Privacy Policy, please contact us at{" "}
          <a
            href={`mailto:${email}`}
            className="text-brutal-pink hover:text-brutal-peach transition-colors font-bold"
          >
            {email}
          </a>
        </p>
      </LegalSection>
    </div>
  );
};
