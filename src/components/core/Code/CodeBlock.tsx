/**
 * @file src/components/core/Code/CodeBlock.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Sat Sep 13 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Multi-language code block with syntax highlighting and brutal styling
 */
import React from "react";
import { Code } from "./Code";
import { cn } from "../../../utils/cn.utils";

export interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  filename?: string;
  showLineNumbers?: boolean;
  copyable?: boolean;
  brutal?: boolean;
  variant?: "default" | "terminal" | "minimal";
  accentColor?: string;
  className?: string;
}

/**
 * @component CodeBlock
 * @description Enhanced code block with optional title and filename display
 */
export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  title,
  filename,
  showLineNumbers = true,
  copyable = true,
  brutal = true,
  variant = "default",
  accentColor = "brutal-pink",
  className,
}) => {
  return (
    <div className={cn("space-y-0", className)}>
      {/* Optional title/filename header */}
      {(title || filename) && (
        <div
          className={cn(
            // Header styling
            "px-4 py-2 text-sm font-black uppercase tracking-wider",
            "bg-brutal-gray-100 text-brutal-gray-700",

            // Brutal styling
            brutal && [
              "border-4 border-brutal-black border-b-2",
              "shadow-brutal-sm",
            ],
            !brutal && "border border-b-0 rounded-t-lg",
          )}
          style={
            {
              "--accent-color": accentColor.startsWith("#")
                ? accentColor
                : `var(--brutal-${accentColor.replace("brutal-", "")})`,
            } as React.CSSProperties
          }
        >
          {title && <span className="text-accent">{title}</span>}
          {title && filename && <span className="mx-2">•</span>}
          {filename && <span className="font-mono">{filename}</span>}
        </div>
      )}

      {/* Code component */}
      <Code
        language={language}
        showLineNumbers={showLineNumbers}
        copyable={copyable}
        brutal={brutal}
        variant={variant}
        accentColor={accentColor}
        className={cn(
          // Remove top border radius if we have a title
          (title || filename) && brutal && "!border-t-0",
          (title || filename) && !brutal && "!rounded-t-none",
        )}
      >
        {code}
      </Code>
    </div>
  );
};
