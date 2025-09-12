/**
 * @file src/modules/editor/BlogEditor/BlogEditor.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Complete blog editor with tabs for write/preview/settings
 * @client This component requires client-side JavaScript
 */
"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../../components/core/Tabs";
import { Card } from "../../../components/core/Card/Card";
import { Button } from "../../../components/core/Button/Button";
import { Input } from "../../../components/core/Input";
import { Textarea } from "../../../components/core/Textarea";
import { Select } from "../../../components/core/Input";
import { Toggle } from "../../../components/core/Toggle";
import { MarkdownEditor } from "../MarkdownEditor/MarkdownEditor";
import { MarkdownPreview } from "../MarkdownPreview/MarkdownPreview";
import { FaPen, FaEye, FaCog, FaSave, FaImage, FaClock } from "react-icons/fa";

export interface BlogEditorData {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  status: "draft" | "published";
  tags: string;
  category: string;
  featuredImage?: string;
  publishedAt?: string;
  isFeatured: boolean;
  author?: string;
}

/**
 * @interface BlogEditorProps
 * @description Props for blog editor component
 */
export interface BlogEditorProps {
  initialData?: Partial<BlogEditorData>;
  onSave?: (data: BlogEditorData) => void | Promise<void>;
  onCancel?: () => void;
  categories?: Array<{ value: string; label: string }>;
  authors?: Array<{ value: string; label: string }>;
  loading?: boolean;
  brutal?: boolean;
  className?: string;
  markdownParser?: (content: string) => string | Promise<string>;
}

/**
 * @component BlogEditor
 * @description Full-featured blog editor with tabs
 * @client Uses useState and various form inputs
 */
export const BlogEditor: React.FC<BlogEditorProps> = ({
  initialData = {},
  onSave,
  onCancel,
  categories = [],
  authors = [],
  loading = false,
  brutal = true,
  className,
  markdownParser,
}) => {
  const [formData, setFormData] = useState<BlogEditorData>({
    title: initialData.title || "",
    slug: initialData.slug || "",
    content: initialData.content || "",
    excerpt: initialData.excerpt || "",
    status: initialData.status || "draft",
    tags: initialData.tags || "",
    category: initialData.category || "",
    featuredImage: initialData.featuredImage || "",
    publishedAt: initialData.publishedAt || "",
    isFeatured: initialData.isFeatured || false,
    author: initialData.author || "",
  });

  const [autoSave, setAutoSave] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  /**
   * @function generateSlug
   * @description Generate URL-friendly slug from title
   */
  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim();
  };

  /**
   * @function handleTitleChange
   * @description Update title and auto-generate slug
   */
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: initialData.slug ? prev.slug : generateSlug(title),
    }));
  };

  /**
   * @function handleSave
   * @description Save the blog post
   */
  const handleSave = async () => {
    if (onSave) {
      await onSave(formData);
      setLastSaved(new Date());
    }
  };

  /**
   * @function getWordCount
   * @description Calculate word count for content
   */
  const getWordCount = (): number => {
    return formData.content.split(/\s+/).filter(Boolean).length;
  };

  return (
    <div className={clsx("min-h-screen bg-brutal-white", className)}>
      <Tabs defaultValue="editor" brutal={brutal}>
        {/* Header */}
        <div
          className={clsx(
            "sticky top-0 z-40",
            "border-b-4 border-brutal-black bg-brutal-white",
            "px-4 py-3",
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0 mr-4">
              <h1 className="text-sm lg:text-base font-bold uppercase truncate">
                {initialData.title ? "Edit Post" : "New Post"}
                {formData.title && (
                  <span className="hidden sm:inline text-brutal-gray-600">
                    {" "}
                    — {formData.title}
                  </span>
                )}
              </h1>
              <div className="flex items-center gap-2 mt-1 text-xs">
                <span
                  className={clsx(
                    "flex items-center gap-1",
                    formData.status === "published"
                      ? "text-brutal-mint"
                      : "text-brutal-yellow",
                  )}
                >
                  <span className="w-2 h-2 rounded-full bg-current" />
                  {formData.status}
                </span>
                {lastSaved && (
                  <span className="text-brutal-gray-500">
                    Saved {lastSaved.toLocaleTimeString()}
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {onCancel && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={onCancel}
                  disabled={loading}
                  brutal={brutal}
                  className="hidden sm:flex"
                >
                  Cancel
                </Button>
              )}

              <Button
                variant="primary"
                size="sm"
                onClick={handleSave}
                disabled={loading}
                loading={loading}
                brutal={brutal}
                leftIcon={() => <FaSave />}
              >
                <span className="hidden sm:inline">Save</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <TabsList brutal={brutal} stretch>
          <TabsTrigger value="editor" icon={FaPen} stretch>
            Write
          </TabsTrigger>
          <TabsTrigger value="preview" icon={FaEye} stretch>
            Preview
          </TabsTrigger>
          <TabsTrigger value="settings" icon={FaCog} stretch>
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Editor Tab */}
        <TabsContent value="editor" className="p-4 lg:p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Title"
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="Post title..."
                brutal={brutal}
                required
              />

              <Input
                label="Slug"
                value={formData.slug}
                onChange={(e: { target: { value: any } }) =>
                  setFormData((prev) => ({
                    ...prev,
                    slug: e.target.value,
                  }))
                }
                placeholder="post-slug"
                brutal={brutal}
                required
              />
            </div>

            <Textarea
              label="Excerpt"
              value={formData.excerpt}
              onChange={(e: { target: { value: any } }) =>
                setFormData((prev) => ({
                  ...prev,
                  excerpt: e.target.value,
                }))
              }
              placeholder="Brief description of your post..."
              rows={3}
              brutal={brutal}
              hint={`${formData.excerpt.length}/300 characters`}
            />

            <div>
              <label className="block text-xs font-bold uppercase mb-2">
                Content
              </label>
              <MarkdownEditor
                value={formData.content}
                onChange={(content) =>
                  setFormData((prev) => ({
                    ...prev,
                    content,
                  }))
                }
                brutal={brutal}
                minHeight="500px"
              />
            </div>
          </div>
        </TabsContent>

        {/* Preview Tab */}
        <TabsContent value="preview" className="p-4 lg:p-6">
          <div className="max-w-4xl mx-auto">
            <Card brutal={brutal} variant="raised">
              <article>
                <header className="mb-8">
                  <h1 className="text-4xl font-black uppercase tracking-wider mb-4">
                    {formData.title || "Untitled Post"}
                  </h1>
                  <p className="text-lg text-brutal-gray-600 font-mono">
                    {formData.excerpt || "No excerpt provided"}
                  </p>
                  <div className="flex items-center gap-4 mt-4 text-xs text-brutal-gray-500">
                    {formData.author && (
                      <span>
                        By{" "}
                        {
                          authors.find((a) => a.value === formData.author)
                            ?.label
                        }
                      </span>
                    )}
                    {formData.category && (
                      <span>
                        {
                          categories.find((c) => c.value === formData.category)
                            ?.label
                        }
                      </span>
                    )}
                    <span>{getWordCount()} words</span>
                  </div>
                </header>

                <MarkdownPreview
                  content={formData.content}
                  parser={markdownParser}
                />
              </article>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="p-4 lg:p-6">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Post Settings */}
            <Card brutal={brutal}>
              <h3 className="text-sm font-bold uppercase mb-4">
                Post Settings
              </h3>

              <div className="space-y-4">
                <Select
                  label="Category"
                  options={[
                    { value: "", label: "Select Category" },
                    ...categories,
                  ]}
                  value={formData.category}
                  onChange={(e: { target: { value: any } }) =>
                    setFormData((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  brutal={brutal}
                />

                <Select
                  label="Author"
                  options={[{ value: "", label: "Select Author" }, ...authors]}
                  value={formData.author}
                  onChange={(e: { target: { value: any } }) =>
                    setFormData((prev) => ({
                      ...prev,
                      author: e.target.value,
                    }))
                  }
                  brutal={brutal}
                />

                <Input
                  label="Tags"
                  value={formData.tags}
                  onChange={(e: { target: { value: any } }) =>
                    setFormData((prev) => ({
                      ...prev,
                      tags: e.target.value,
                    }))
                  }
                  placeholder="tag1, tag2, tag3"
                  brutal={brutal}
                  hint="Separate tags with commas"
                />

                <Select
                  label="Status"
                  options={[
                    { value: "draft", label: "Draft" },
                    { value: "published", label: "Published" },
                  ]}
                  value={formData.status}
                  onChange={(e: { target: { value: string } }) =>
                    setFormData((prev) => ({
                      ...prev,
                      status: e.target.value as "draft" | "published",
                    }))
                  }
                  brutal={brutal}
                />

                <Toggle
                  label="Featured Post"
                  checked={formData.isFeatured}
                  onChange={(checked: any) =>
                    setFormData((prev) => ({
                      ...prev,
                      isFeatured: checked,
                    }))
                  }
                  brutal={brutal}
                />
              </div>
            </Card>

            {/* Editor Settings */}
            <Card brutal={brutal}>
              <h3 className="text-sm font-bold uppercase mb-4">
                Editor Settings
              </h3>

              <div className="space-y-4">
                <Toggle
                  label="Auto-save"
                  checked={autoSave}
                  onChange={setAutoSave}
                  brutal={brutal}
                />

                {/* Featured Image */}
                <div>
                  <label className="block text-xs font-bold uppercase mb-2">
                    Featured Image
                  </label>
                  {formData.featuredImage ? (
                    <div className="space-y-2">
                      <div className="border-4 border-brutal-black p-2">
                        <img
                          src={formData.featuredImage}
                          alt="Featured"
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <Button
                        variant="danger"
                        size="sm"
                        className="w-full"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            featuredImage: "",
                          }))
                        }
                        brutal={brutal}
                      >
                        Remove Image
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full"
                      leftIcon={() => <FaImage />}
                      brutal={brutal}
                    >
                      Upload Image
                    </Button>
                  )}
                </div>

                {/* Publish Date */}
                <Input
                  label="Publish Date"
                  type="datetime-local"
                  value={formData.publishedAt}
                  onChange={(e: { target: { value: any } }) =>
                    setFormData((prev) => ({
                      ...prev,
                      publishedAt: e.target.value,
                    }))
                  }
                  brutal={brutal}
                  leftIcon={FaClock}
                />
              </div>
            </Card>

            {/* Statistics */}
            <Card brutal={brutal} className="md:col-span-2">
              <h3 className="text-sm font-bold uppercase mb-4">Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-xs uppercase text-brutal-gray-600">
                    Words
                  </span>
                  <p className="font-bold text-lg">{getWordCount()}</p>
                </div>
                <div>
                  <span className="text-xs uppercase text-brutal-gray-600">
                    Characters
                  </span>
                  <p className="font-bold text-lg">{formData.content.length}</p>
                </div>
                <div>
                  <span className="text-xs uppercase text-brutal-gray-600">
                    Paragraphs
                  </span>
                  <p className="font-bold text-lg">
                    {formData.content.split("\n\n").filter(Boolean).length}
                  </p>
                </div>
                <div>
                  <span className="text-xs uppercase text-brutal-gray-600">
                    Reading Time
                  </span>
                  <p className="font-bold text-lg">
                    ~{Math.ceil(getWordCount() / 200)} min
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
