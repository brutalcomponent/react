/**
 * @file src/modules/blog/LicenseInfo/LicenseInfo.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Display Creative Commons license information
 */
import React from "react";
import { clsx } from "clsx";

export interface LicenseInfoProps {
  type?: "CC BY-NC-SA 4.0" | "CC BY 4.0" | "CC BY-SA 4.0" | "CC BY-NC 4.0";
  className?: string;
}

export const LicenseInfo: React.FC<LicenseInfoProps> = ({
  type = "CC BY-NC-SA 4.0",
  className,
}) => {
  const licenseUrls = {
    "CC BY-NC-SA 4.0": "https://creativecommons.org/licenses/by-nc-sa/4.0/",
    "CC BY 4.0": "https://creativecommons.org/licenses/by/4.0/",
    "CC BY-SA 4.0": "https://creativecommons.org/licenses/by-sa/4.0/",
    "CC BY-NC 4.0": "https://creativecommons.org/licenses/by-nc/4.0/",
  };

  return (
    <div
      className={clsx(
        "mt-12 p-4 bg-brutal-gray-100 border-t-4 border-brutal-black transform skew-x-2",
        className,
      )}
    >
      <p className="text-sm text-brutal-gray-600 font-mono">
        This work is licensed under{" "}
        <a
          href={licenseUrls[type]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brutal-pink hover:text-brutal-peach transition-colors duration-200 uppercase tracking-wide font-bold"
        >
          {type}
        </a>
      </p>
    </div>
  );
};
