/**
 * @file src/modules/blog/PostContent/PostContent.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Container for blog post content with brutal MDX styles
 */
import React from "react";
import { clsx } from "clsx";

export interface PostContentProps {
  children: React.ReactNode;
  className?: string;
}

export const PostContent: React.FC<PostContentProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={clsx(
        "prose prose-lg max-w-none",
        // Headings
        "prose-headings:font-black prose-headings:uppercase prose-headings:tracking-wider",
        "prose-h1:text-4xl prose-h1:text-brutal-black prose-h1:transform prose-h1:-skew-x-2",
        "prose-h2:text-3xl prose-h2:text-brutal-black",
        "prose-h3:text-2xl prose-h3:text-brutal-black",
        "prose-h4:text-xl prose-h4:text-brutal-black",
        // Paragraphs
        "prose-p:text-brutal-gray-700 prose-p:font-mono prose-p:leading-relaxed",
        // Links
        "prose-a:text-brutal-pink prose-a:no-underline prose-a:font-bold",
        "prose-a:border-b-2 prose-a:border-brutal-pink",
        "prose-a:hover:text-brutal-peach prose-a:hover:border-brutal-peach",
        "prose-a:transition-colors",
        // Lists
        "prose-ul:list-none prose-ul:space-y-2",
        "prose-ul:pl-0",
        "prose-li:text-brutal-gray-700 prose-li:font-mono",
        'prose-li:before:content-["→"] prose-li:before:text-brutal-pink',
        "prose-li:before:font-black prose-li:before:mr-2",
        "prose-ol:list-decimal prose-ol:list-inside",
        // Blockquotes
        "prose-blockquote:border-l-4 prose-blockquote:border-brutal-pink",
        "prose-blockquote:bg-brutal-gray-100 prose-blockquote:py-2",
        "prose-blockquote:pl-4 prose-blockquote:not-italic",
        // Code
        "prose-code:bg-brutal-gray-200 prose-code:text-brutal-black",
        "prose-code:px-2 prose-code:py-1 prose-code:rounded-none",
        "prose-code:before:content-none prose-code:after:content-none",
        "prose-pre:bg-brutal-black prose-pre:text-brutal-white",
        "prose-pre:border-4 prose-pre:border-brutal-black",
        "prose-pre:shadow-brutal",
        // Tables
        "prose-table:border-4 prose-table:border-brutal-black",
        "prose-thead:bg-brutal-black prose-thead:text-brutal-white",
        "prose-th:font-black prose-th:uppercase prose-th:tracking-wider",
        "prose-th:p-3",
        "prose-td:border-2 prose-td:border-brutal-black prose-td:p-3",
        // Images
        "prose-img:border-4 prose-img:border-brutal-black",
        "prose-img:shadow-brutal",
        // Strong
        "prose-strong:font-black prose-strong:text-brutal-pink",
        // HR
        "prose-hr:border-brutal-black prose-hr:border-2",
        className,
      )}
    >
      {children}
    </div>
  );
};

/**
 * @component MDXComponents
 * @description Custom MDX components for blog posts
 */
export const MDXComponents = {
  h1: (props: any) => (
    <h1
      className="text-4xl font-black mb-6 text-brutal-black uppercase tracking-wide transform -skew-x-2"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      className="text-3xl font-bold mb-4 text-brutal-black uppercase tracking-wide"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3 className="text-2xl font-semibold mb-3 text-brutal-black" {...props} />
  ),
  h4: (props: any) => (
    <h4 className="text-xl font-semibold mb-2 text-brutal-black" {...props} />
  ),
  p: (props: any) => (
    <p
      className="mb-6 text-brutal-gray-700 font-mono leading-relaxed"
      {...props}
    />
  ),
  a: (props: any) => (
    <a
      className="text-brutal-pink hover:text-brutal-peach transition-colors duration-200 border-b-2 border-brutal-pink hover:border-brutal-peach font-bold"
      {...props}
    />
  ),
  ul: (props: any) => <ul className="list-none space-y-2 mb-6" {...props} />,
  ol: (props: any) => (
    <ol className="list-decimal list-inside mb-6 space-y-2" {...props} />
  ),
  li: (props: any) => (
    <li className="text-brutal-gray-700 font-mono flex items-start">
      <span className="text-brutal-pink font-black mr-2">→</span>
      <span>{props.children}</span>
    </li>
  ),
  blockquote: (props: any) => (
    <blockquote
      className="border-l-4 border-brutal-pink pl-4 italic mb-6 text-brutal-gray-700 font-mono bg-brutal-gray-100 py-2"
      {...props}
    />
  ),
  code: (props: any) => (
    <code
      className="bg-brutal-gray-200 text-brutal-black px-2 py-1 font-mono text-sm"
      {...props}
    />
  ),
  pre: (props: any) => (
    <pre
      className="bg-brutal-black text-brutal-white p-4 mb-6 overflow-x-auto border-4 border-brutal-black shadow-brutal"
      {...props}
    />
  ),
};
