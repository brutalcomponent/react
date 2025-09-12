/**
 * @file src/modules/editor/MarkdownPreview/MarkdownPreview.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Markdown preview component (requires marked or similar parser)
 * @client This component requires client-side JavaScript
 */
"use client";

import React, { useState, useEffect } from "react";
import { clsx } from "clsx";

export interface MarkdownPreviewProps {
  content: string;
  className?: string;
  parser?: (content: string) => string | Promise<string>;
}

/**
 * @component MarkdownPreview
 * @description Preview rendered markdown content
 * @client Uses useEffect for parsing
 *
 * Note: This component requires a markdown parser like 'marked' to be installed
 * Example: npm install marked @types/marked
 */
export const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({
  content,
  className,
  parser,
}) => {
  const [html, setHtml] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const parseContent = async () => {
      if (!content) {
        setHtml("");
        return;
      }

      try {
        if (parser) {
          const parsed = await parser(content);
          setHtml(parsed);
        } else {
          // Default: just show the raw markdown
          // In real usage, you'd use a parser like marked
          setHtml(`<pre>${content}</pre>`);
          console.warn(
            "No markdown parser provided. Install marked: npm install marked",
          );
        }
        setError(null);
      } catch (err) {
        console.error("Error parsing markdown:", err);
        setError("Error rendering markdown");
      }
    };

    parseContent();
  }, [content, parser]);

  if (!content) {
    return (
      <div className="text-brutal-gray-400 text-sm italic p-4">
        Preview will appear here...
      </div>
    );
  }

  if (error) {
    return <div className="text-brutal-coral text-sm p-4">{error}</div>;
  }

  return (
    <div
      className={clsx(
        "prose prose-brutal max-w-none",
        // Brutal prose styles
        "prose-headings:font-black prose-headings:uppercase prose-headings:tracking-wider",
        "prose-h1:text-4xl prose-h1:text-brutal-black prose-h1:transform prose-h1:-skew-x-2",
        "prose-h2:text-3xl prose-h2:text-brutal-black",
        "prose-h3:text-2xl prose-h3:text-brutal-black",
        // Paragraphs
        "prose-p:text-brutal-gray-700 prose-p:font-mono prose-p:leading-relaxed",
        // Links
        "prose-a:text-brutal-pink prose-a:no-underline prose-a:font-bold",
        "prose-a:border-b-2 prose-a:border-brutal-pink",
        "prose-a:hover:text-brutal-peach prose-a:hover:border-brutal-peach",
        // Lists
        "prose-ul:list-none prose-ul:space-y-2",
        'prose-li:before:content-["→"] prose-li:before:text-brutal-pink',
        "prose-li:before:font-black prose-li:before:mr-2",
        // Code
        "prose-code:bg-brutal-gray-200 prose-code:text-brutal-black",
        "prose-code:px-2 prose-code:py-1",
        "prose-pre:bg-brutal-black prose-pre:text-brutal-white",
        "prose-pre:border-4 prose-pre:border-brutal-black",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
