/**
 * @file src/components/core/FileUpload/FileUpload.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Brutal file upload component with drag and drop functionality
 * @client This component requires client-side JavaScript
 */
"use client";

import React, { useState, useCallback, useRef } from "react";
import {
  FaUpload,
  FaTimes,
  FaFile,
  FaImage,
  FaFileAlt,
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFileCode,
  FaFileVideo,
  FaFileAudio,
} from "react-icons/fa";
import { Icon } from "../Icon";
import { cn, brutalBase, getSizeClasses } from "../../../utils/cn.utils";
import { formatFileSize } from "../../../utils/format.utils";

export interface UploadedFile {
  id: string;
  file: File;
  url?: string;
  progress?: number;
  error?: string;
  status?: "uploading" | "success" | "error";
}

export interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  onFileRemove?: (fileId: string) => void;
  onUploadProgress?: (fileId: string, progress: number) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  maxFiles?: number;
  disabled?: boolean;
  label?: string;
  description?: string;
  brutal?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "default" | "compact" | "minimal";
  accentColor?: string;
  className?: string;
}

/**
 * @component FileUpload
 * @description Brutal file upload with drag and drop, progress tracking, and file validation
 */
export const FileUpload: React.FC<FileUploadProps> = ({
  onFilesSelected,
  onFileRemove,
  onUploadProgress,
  accept,
  multiple = true,
  maxSize = 10,
  maxFiles = 10,
  disabled = false,
  label,
  description,
  brutal = true,
  size = "md",
  variant = "default",
  accentColor = "brutal-pink",
  className,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const sizeClasses = getSizeClasses(size);

  const validateFile = useCallback(
    (file: File): string | null => {
      if (maxSize && file.size > maxSize * 1024 * 1024) {
        return `File "${file.name}" exceeds ${maxSize}MB limit`;
      }

      if (accept) {
        const acceptedTypes = accept.split(",").map((type) => type.trim());
        const isAccepted = acceptedTypes.some((acceptedType) => {
          if (acceptedType.startsWith(".")) {
            return file.name.toLowerCase().endsWith(acceptedType.toLowerCase());
          }
          return file.type.match(acceptedType.replace("*", ".*"));
        });

        if (!isAccepted) {
          return `File type "${file.type}" is not accepted`;
        }
      }

      return null;
    },
    [maxSize, accept],
  );

  const handleFiles = useCallback(
    (newFiles: FileList | File[]) => {
      const fileArray = Array.from(newFiles);
      const validFiles: File[] = [];
      const newErrors: string[] = [];

      // Check max files
      if (files.length + fileArray.length > maxFiles) {
        newErrors.push(`Cannot upload more than ${maxFiles} files`);
        setErrors(newErrors);
        return;
      }

      // Validate each file
      fileArray.forEach((file) => {
        const error = validateFile(file);
        if (error) {
          newErrors.push(error);
        } else {
          validFiles.push(file);
        }
      });

      if (validFiles.length > 0) {
        const uploadedFiles: UploadedFile[] = validFiles.map((file) => ({
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          file,
          url: URL.createObjectURL(file),
          status: "uploading",
          progress: 0,
        }));

        setFiles((prev) => [...prev, ...uploadedFiles]);
        onFilesSelected(validFiles);

        // Simulate upload progress for demo
        uploadedFiles.forEach((uploadedFile) => {
          simulateUploadProgress(uploadedFile.id);
        });
      }

      setErrors(newErrors);
    },
    [files.length, maxFiles, onFilesSelected, validateFile],
  );

  const simulateUploadProgress = useCallback(
    (fileId: string) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setFiles((prev) =>
            prev.map((f) =>
              f.id === fileId
                ? { ...f, progress: 100, status: "success" as const }
                : f,
            ),
          );
        } else {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === fileId ? { ...f, progress: Math.round(progress) } : f,
            ),
          );
        }
        onUploadProgress?.(fileId, Math.round(progress));
      }, 200);
    },
    [onUploadProgress],
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (disabled) return;

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [disabled, handleFiles],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        handleFiles(e.target.files);
      }
      // Reset input value to allow re-uploading same file
      e.target.value = "";
    },
    [handleFiles],
  );

  const removeFile = useCallback(
    (fileId: string) => {
      const file = files.find((f) => f.id === fileId);
      if (file?.url) {
        URL.revokeObjectURL(file.url);
      }
      setFiles((prev) => prev.filter((f) => f.id !== fileId));
      onFileRemove?.(fileId);
    },
    [files, onFileRemove],
  );

  const getFileIcon = useCallback((file: File) => {
    const type = file.type.toLowerCase();
    const name = file.name.toLowerCase();

    if (type.startsWith("image/")) return FaImage;
    if (type.includes("pdf")) return FaFilePdf;
    if (
      type.includes("word") ||
      name.endsWith(".doc") ||
      name.endsWith(".docx")
    )
      return FaFileWord;
    if (
      type.includes("excel") ||
      name.endsWith(".xls") ||
      name.endsWith(".xlsx")
    )
      return FaFileExcel;
    if (type.startsWith("video/")) return FaFileVideo;
    if (type.startsWith("audio/")) return FaFileAudio;
    if (
      type.includes("javascript") ||
      type.includes("json") ||
      name.endsWith(".js") ||
      name.endsWith(".ts") ||
      name.endsWith(".jsx") ||
      name.endsWith(".tsx")
    )
      return FaFileCode;

    return FaFileAlt;
  }, []);

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  const isCompact = variant === "compact";
  const isMinimal = variant === "minimal";

  return (
    <div
      className={cn("space-y-4", className)}
      style={
        {
          "--accent-color": accentColor.startsWith("#")
            ? accentColor
            : `var(--brutal-${accentColor.replace("brutal-", "")})`,
        } as React.CSSProperties
      }
    >
      {/* Label */}
      {label && !isMinimal && (
        <label
          className={cn(
            "block font-black uppercase tracking-wider text-brutal-black",
            sizeClasses.text === "text-xs" ? "text-xs" : "text-sm",
          )}
        >
          {label}
        </label>
      )}

      {/* Upload area */}
      <div
        className={cn(
          // Base styling
          "relative transition-all duration-300 cursor-pointer",

          // Size variations
          isCompact ? "p-4" : "p-8",

          // Border styling
          brutal && [
            sizeClasses.border,
            "border-dashed border-brutal-black",
            !dragActive && "hover:shadow-brutal hover:-translate-y-0.5",
          ],
          !brutal && "border-2 border-dashed border-brutal-gray-400 rounded-lg",

          // Drag state
          dragActive && [
            "border-accent bg-accent/10 scale-105",
            brutal && "shadow-brutal-md",
          ],
          !dragActive && "bg-brutal-white hover:bg-brutal-gray-50",

          // Disabled state
          disabled && [
            "opacity-50 cursor-not-allowed",
            "hover:transform-none hover:shadow-none hover:bg-brutal-white",
          ],

          // Transform effects
          brutal && "transform hover:rotate-0",
          brutal && !dragActive && !disabled && "-rotate-1",
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={label || "File upload area"}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !disabled) {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
      >
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleChange}
          disabled={disabled}
          className="sr-only"
          aria-describedby={description ? "upload-description" : undefined}
        />

        <div className="text-center">
          <Icon
            icon={FaUpload}
            size={isCompact ? "lg" : "xl"}
            className={cn(
              "mx-auto mb-3 transition-colors duration-200",
              dragActive ? "text-accent" : "text-brutal-gray-400",
            )}
          />

          <p
            className={cn(
              "font-black uppercase tracking-wider mb-2",
              sizeClasses.text,
              dragActive ? "text-accent" : "text-brutal-black",
            )}
          >
            {dragActive ? "Drop files here" : "Drag & drop files here"}
          </p>

          {!isMinimal && (
            <>
              <p
                className={cn(
                  "text-brutal-gray-600 font-mono mb-2",
                  sizeClasses.text === "text-xs" ? "text-xs" : "text-sm",
                )}
              >
                or click to browse
              </p>

              {accept && (
                <p
                  className={cn(
                    "text-brutal-gray-500 mb-1",
                    "text-xs font-mono",
                  )}
                >
                  Accepted: {accept}
                </p>
              )}

              <p className={cn("text-brutal-gray-500 font-mono", "text-xs")}>
                Max {formatFileSize(maxSize * 1024 * 1024)} per file • Max{" "}
                {maxFiles} files
              </p>
            </>
          )}

          {description && (
            <p
              id="upload-description"
              className={cn("text-brutal-gray-600 font-mono mt-2", "text-xs")}
            >
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Error messages */}
      {errors.length > 0 && (
        <div
          className={cn(
            "p-4 bg-brutal-coral text-brutal-black",
            brutal && [
              "border-4 border-brutal-black shadow-brutal",
              "transform rotate-1",
            ],
            !brutal && "border border-red-400 rounded-lg",
          )}
          role="alert"
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-black uppercase tracking-wider text-sm">
              Upload Errors
            </h4>
            <button
              onClick={clearErrors}
              className={cn(
                "p-1 hover:bg-brutal-black/10 transition-colors rounded",
              )}
              aria-label="Clear errors"
            >
              <Icon icon={FaTimes} size="sm" />
            </button>
          </div>
          <ul className="space-y-1">
            {errors.map((error, idx) => (
              <li
                key={idx}
                className={cn("text-sm font-bold flex items-start gap-2")}
              >
                <span className="text-accent mt-0.5">•</span>
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h4
            className={cn(
              "font-black uppercase tracking-wider text-brutal-black",
              sizeClasses.text === "text-xs" ? "text-xs" : "text-sm",
            )}
          >
            Uploaded Files ({files.length})
          </h4>

          <div className="space-y-2">
            {files.map((file) => {
              const FileIcon = getFileIcon(file.file);
              return (
                <div
                  key={file.id}
                  className={cn(
                    // Base styling
                    "flex items-center gap-3 p-3 transition-all duration-200",
                    "bg-brutal-gray-100",

                    // Brutal styling
                    brutal && [
                      "border-2 border-brutal-black shadow-brutal-sm",
                      "hover:shadow-brutal transform hover:-translate-y-0.5",
                    ],
                    !brutal && "border rounded-lg hover:shadow-md",

                    // Status styling
                    file.status === "success" &&
                      "bg-brutal-mint/20 border-brutal-mint",
                    file.status === "error" &&
                      "bg-brutal-coral/20 border-brutal-coral",
                  )}
                >
                  <Icon
                    icon={FileIcon}
                    size="md"
                    className={cn(
                      "flex-shrink-0",
                      file.status === "success" && "text-brutal-mint",
                      file.status === "error" && "text-brutal-coral",
                      file.status === "uploading" && "text-brutal-gray-600",
                    )}
                  />

                  <div className="flex-1 min-w-0">
                    <p
                      className={cn(
                        "font-bold truncate",
                        sizeClasses.text === "text-xs" ? "text-xs" : "text-sm",
                      )}
                    >
                      {file.file.name}
                    </p>
                    <p
                      className={cn(
                        "text-brutal-gray-600 font-mono",
                        "text-xs",
                      )}
                    >
                      {formatFileSize(file.file.size)}
                      {file.status === "success" && " • Complete"}
                      {file.status === "error" && " • Failed"}
                    </p>
                  </div>

                  {/* Progress bar */}
                  {file.progress !== undefined &&
                    file.status === "uploading" && (
                      <div className="w-20 flex-shrink-0">
                        <div
                          className={cn(
                            "h-2 bg-brutal-gray-300 overflow-hidden",
                            brutal && "border border-brutal-black",
                            !brutal && "rounded-full",
                          )}
                        >
                          <div
                            className={cn(
                              "h-full bg-accent transition-all duration-300",
                              !brutal && "rounded-full",
                            )}
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                        <p className="text-xs font-mono text-center mt-1">
                          {file.progress}%
                        </p>
                      </div>
                    )}

                  {/* Remove button */}
                  <button
                    onClick={() => removeFile(file.id)}
                    className={cn(
                      "p-2 transition-all duration-200 flex-shrink-0",
                      "hover:bg-brutal-black hover:text-brutal-white",
                      brutal && [
                        "border-2 border-brutal-black",
                        "hover:shadow-brutal-sm transform hover:-rotate-3",
                      ],
                      !brutal && "rounded hover:scale-110",
                    )}
                    aria-label={`Remove ${file.file.name}`}
                  >
                    <Icon icon={FaTimes} size="sm" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
