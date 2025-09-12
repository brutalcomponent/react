/**
 * @file src/modules/auth/QRCode/QRCode.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * QR Code display component (requires qr code data as SVG or data URL)
 */
import React from "react";
import { clsx } from "clsx";
import { FaDownload } from "react-icons/fa";
import { Icon } from "../../../components/core/Icon";

export interface QRCodeProps {
  data: string; // SVG string or data URL
  size?: number;
  title?: string;
  downloadable?: boolean;
  brutal?: boolean;
  className?: string;
}

export const QRCode: React.FC<QRCodeProps> = ({
  data,
  size = 256,
  title = "QR Code",
  downloadable = true,
  brutal = true,
  className,
}) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.download = `qr-code-${Date.now()}.png`;

    if (data.startsWith("data:image")) {
      // It's already a data URL
      link.href = data;
    } else {
      // It's SVG, convert to data URL
      const svg = new Blob([data], { type: "image/svg+xml" });
      link.href = URL.createObjectURL(svg);
    }

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className={clsx(
        "inline-block",
        brutal &&
          "p-6 bg-brutal-white border-4 border-brutal-black shadow-brutal",
        className,
      )}
    >
      {title && (
        <h3 className="text-lg font-black uppercase tracking-wider mb-4 text-center">
          {title}
        </h3>
      )}

      <div
        className="bg-white p-4 border-2 border-brutal-black"
        style={{ width: size, height: size }}
      >
        {data.startsWith("<svg") ? (
          <div dangerouslySetInnerHTML={{ __html: data }} />
        ) : (
          <img src={data} alt={title} className="w-full h-full" />
        )}
      </div>

      {downloadable && (
        <button
          onClick={handleDownload}
          className={clsx(
            "mt-4 w-full",
            "flex items-center justify-center gap-2",
            "px-4 py-2 font-bold uppercase tracking-wider",
            "bg-brutal-black text-brutal-white",
            "hover:bg-brutal-gray-800 transition-colors",
          )}
        >
          <Icon icon={FaDownload} size="sm" />
          Download
        </button>
      )}
    </div>
  );
};
