/**
 * @file src/modules/auth/TOTPSetup/TOTPSetup.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * TOTP (2FA) setup component
 * @client This component requires client-side JavaScript
 */
"use client";

import React, { useState, useCallback } from "react";
import { FaCopy, FaCheck } from "react-icons/fa";
import { Icon } from "../../../components/core/Icon";
import { QRCode } from "../QRCode/QRCode";
import { TOTPVerifier } from "../TOTPVerifier/TOTPVerifier";
import { useClipboard } from "../../../hooks/useClipboard";
import { cn, getSizeClasses } from "../../../utils/cn.utils";

export interface TOTPSetupProps {
  qrCodeData: string; // SVG or data URL
  secret: string;
  appName?: string;
  onVerified: (code: string) => void;
  brutal?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  accentColor?: string;
  className?: string;
}

export const TOTPSetup: React.FC<TOTPSetupProps> = ({
  qrCodeData,
  secret,
  appName = "Your App",
  onVerified,
  brutal = true,
  size = "md",
  accentColor = "brutal-pink",
  className,
}) => {
  const [step, setStep] = useState<"scan" | "verify">("scan");
  const { copy, copied } = useClipboard({ timeout: 2000 });
  const sizeClasses = getSizeClasses(size);

  const handleVerification = useCallback(
    (code: string) => {
      onVerified(code);
    },
    [onVerified],
  );

  return (
    <div
      className={cn(
        brutal
          ? "p-6 bg-brutal-white border-4 border-brutal-black shadow-brutal"
          : "p-4 bg-white border rounded-lg shadow",
        className,
      )}
      style={
        {
          "--accent-color": accentColor.startsWith("#")
            ? accentColor
            : `var(--brutal-${accentColor.replace("brutal-", "")})`,
        } as React.CSSProperties
      }
    >
      <h2
        className={cn(
          "font-black uppercase tracking-wider mb-6",
          size === "xs"
            ? "text-xl"
            : size === "sm"
              ? "text-2xl"
              : size === "md"
                ? "text-2xl"
                : "text-3xl",
        )}
      >
        Set Up Two-Factor Authentication
      </h2>

      {step === "scan" ? (
        <>
          <div className="space-y-6">
            {/* Step 1 */}
            <div>
              <h3
                className={cn(
                  "font-bold mb-2",
                  size === "xs" ? "text-base" : "text-lg",
                )}
              >
                Step 1: Scan QR Code
              </h3>
              <p
                className={cn(
                  "text-brutal-gray-600 mb-4",
                  sizeClasses.text === "text-xs" ? "text-xs" : "text-sm",
                )}
              >
                Scan this QR code with your authenticator app (Google
                Authenticator, Authy, etc.)
              </p>

              <div className="flex justify-center">
                <QRCode
                  data={qrCodeData}
                  size={200}
                  downloadable={false}
                  brutal={false}
                />
              </div>
            </div>

            {/* Step 2 - Manual entry */}
            <div>
              <h3
                className={cn(
                  "font-bold mb-2",
                  size === "xs" ? "text-base" : "text-lg",
                )}
              >
                Step 2: Or Enter Code Manually
              </h3>
              <p
                className={cn(
                  "text-brutal-gray-600 mb-4",
                  sizeClasses.text === "text-xs" ? "text-xs" : "text-sm",
                )}
              >
                Can't scan? Enter this code in your authenticator app:
              </p>

              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex-1 font-mono",
                    sizeClasses.text === "text-xs"
                      ? "text-xs p-2.5"
                      : "text-sm p-3",
                    brutal
                      ? "bg-brutal-gray-100 border-2 border-brutal-black"
                      : "bg-brutal-gray-100 border rounded",
                  )}
                >
                  {secret}
                </div>
                <button
                  onClick={() => copy(secret)}
                  className={cn(
                    "transition-colors",
                    sizeClasses.text === "text-xs" ? "p-2.5" : "p-3",
                    brutal
                      ? "border-2 border-brutal-black hover:bg-brutal-gray-100"
                      : "border rounded hover:bg-brutal-gray-100",
                  )}
                  aria-label="Copy secret"
                >
                  <Icon icon={copied ? FaCheck : FaCopy} size="sm" />
                </button>
              </div>

              <p
                className={cn(
                  "mt-2 text-brutal-gray-600",
                  sizeClasses.text === "text-xs" ? "text-xs" : "text-xs",
                )}
              >
                Account: {appName}
              </p>
            </div>
          </div>

          <button
            onClick={() => setStep("verify")}
            className={cn(
              "mt-6 w-full px-4 py-3 font-black uppercase tracking-wider transition-colors",
              brutal
                ? "bg-brutal-black text-brutal-white hover:bg-brutal-gray-800 shadow-brutal hover:shadow-brutal-md"
                : "bg-black text-white rounded hover:bg-gray-800",
            )}
            aria-label="Continue to verification"
          >
            Continue to Verification
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => setStep("scan")}
            className={cn(
              "mb-4 font-black",
              sizeClasses.text === "text-xs" ? "text-xs" : "text-sm",
              "text-accent hover:text-brutal-black transition-colors",
            )}
            aria-label="Back to QR Code"
          >
            ← Back to QR Code
          </button>

          <TOTPVerifier onVerify={handleVerification} brutal={false} />
        </>
      )}
    </div>
  );
};
