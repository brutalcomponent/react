/**
 * @file src/modules/auth/QRCode/QRCode.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * QR Code display component (requires QR code data as SVG string or image data URL)
 */
import React, { useMemo, useCallback } from "react";
import { FaDownload } from "react-icons/fa";
import { Icon } from "../../../components/core/Icon";
import { cn, getSizeClasses } from "../../../utils/cn.utils";

export interface QRCodeProps {
  data: string; // SVG string or data URL
  size?: number;
  title?: string;
  downloadable?: boolean;
  brutal?: boolean;
  accentColor?: string;
  className?: string;
}

export const QRCode: React.FC<QRCodeProps> = ({
  data,
  size = 256,
  title = "QR Code",
  downloadable = true,
  brutal = true,
  accentColor = "brutal-pink",
  className,
}) => {
  const isSvgString = useMemo(() => data.trim().startsWith("<svg"), [data]);
  const isImageDataUrl = useMemo(() => data.startsWith("data:image"), [data]);

  const handleDownload = useCallback(() => {
    const link = document.createElement("a");
    link.download = `qr-code-${Date.now()}.png`;

    if (isImageDataUrl) {
      // Already a data URL (png/jpg/etc.)
      link.href = data;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    // SVG string -> object URL
    const svg = new Blob([data], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svg);
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [data, isImageDataUrl]);

  return (
    <div
      className={cn(
        "inline-block",
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
      {title && (
        <h3 className="text-lg font-black uppercase tracking-wider mb-4 text-center">
          {title}
        </h3>
      )}

      <div
        className={cn(
          "bg-brutal-white p-4",
          brutal ? "border-2 border-brutal-black" : "border rounded",
        )}
        style={{ width: size, height: size }}
        aria-label="QR code"
        role="img"
      >
        {isSvgString ? (
          <div
            className="w-full h-full"
            // Note: Ensure sanitized input upstream if needed
            dangerouslySetInnerHTML={{ __html: data }}
          />
        ) : (
          <img
            src={data}
            alt={title || "QR Code"}
            className="w-full h-full object-contain"
            width={size}
            height={size}
          />
        )}
      </div>

      {downloadable && (
        <button
          onClick={handleDownload}
          className={cn(
            "mt-4 w-full flex items-center justify-center gap-2",
            "px-4 py-2 font-black uppercase tracking-wider",
            brutal
              ? "bg-brutal-black text-brutal-white border-2 border-brutal-black hover:bg-brutal-gray-800 shadow-brutal-sm hover:shadow-brutal transition-colors"
              : "bg-black text-white rounded hover:bg-gray-800 transition-colors",
          )}
          aria-label="Download QR code"
        >
          <Icon icon={FaDownload} size="sm" />
          Download
        </button>
      )}
    </div>
  );
};
