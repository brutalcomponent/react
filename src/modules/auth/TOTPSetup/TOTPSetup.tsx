/**
 * @file src/modules/auth/TOTPSetup/TOTPSetup.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * TOTP (2FA) setup component
 * @client This component requires client-side JavaScript
 */
"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import { FaKey, FaCopy, FaCheck } from "react-icons/fa";
import { Icon } from "../../../components/core/Icon";
import { QRCode } from "../QRCode/QRCode";
import { TOTPVerifier } from "../TOTPVerifier/TOTPVerifier";
import { useClipboard } from "../../../hooks/useClipboard";

export interface TOTPSetupProps {
  qrCodeData: string; // SVG or data URL
  secret: string;
  appName?: string;
  onVerified: (code: string) => void;
  brutal?: boolean;
  className?: string;
}

export const TOTPSetup: React.FC<TOTPSetupProps> = ({
  qrCodeData,
  secret,
  appName = "Your App",
  onVerified,
  brutal = true,
  className,
}) => {
  const [step, setStep] = useState<"scan" | "verify">("scan");
  const { copy, copied } = useClipboard({ timeout: 2000 });

  const handleVerification = (code: string) => {
    onVerified(code);
  };

  return (
    <div
      className={clsx(
        brutal &&
          "p-6 bg-brutal-white border-4 border-brutal-black shadow-brutal",
        className,
      )}
    >
      <h2 className="text-2xl font-black uppercase tracking-wider mb-6">
        Set Up Two-Factor Authentication
      </h2>

      {step === "scan" ? (
        <>
          <div className="space-y-6">
            {/* Step 1 */}
            <div>
              <h3 className="text-lg font-bold mb-2">Step 1: Scan QR Code</h3>
              <p className="text-sm text-brutal-gray-600 mb-4">
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
              <h3 className="text-lg font-bold mb-2">
                Step 2: Or Enter Code Manually
              </h3>
              <p className="text-sm text-brutal-gray-600 mb-4">
                Can't scan? Enter this code in your authenticator app:
              </p>

              <div className="flex items-center gap-2">
                <div
                  className={clsx(
                    "flex-1 p-3 font-mono text-sm",
                    "bg-brutal-gray-100 border-2 border-brutal-black",
                  )}
                >
                  {secret}
                </div>
                <button
                  onClick={() => copy(secret)}
                  className={clsx(
                    "p-3 border-2 border-brutal-black",
                    "hover:bg-brutal-gray-100 transition-colors",
                  )}
                  aria-label="Copy secret"
                >
                  <Icon icon={copied ? FaCheck : FaCopy} size="sm" />
                </button>
              </div>

              <p className="mt-2 text-xs text-brutal-gray-600">
                Account: {appName}
              </p>
            </div>
          </div>

          <button
            onClick={() => setStep("verify")}
            className={clsx(
              "mt-6 w-full",
              "px-4 py-3 font-bold uppercase tracking-wider",
              "bg-brutal-black text-brutal-white",
              "hover:bg-brutal-gray-800 transition-colors",
              brutal && "shadow-brutal hover:shadow-brutal-md",
            )}
          >
            Continue to Verification
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => setStep("scan")}
            className="mb-4 text-sm font-bold text-brutal-pink hover:text-brutal-peach"
          >
            ← Back to QR Code
          </button>

          <TOTPVerifier onVerify={handleVerification} brutal={false} />
        </>
      )}
    </div>
  );
};
