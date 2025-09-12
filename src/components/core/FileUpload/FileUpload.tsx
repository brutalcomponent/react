/**
 * @file src/components/core/FileUpload/FileUpload.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Brutal file upload component with drag and drop
 * @client This component requires client-side JavaScript
 */
"use client";

import React, { useState, useCallback, useRef } from "react";
import { clsx } from "clsx";
import { FaUpload, FaTimes, FaFile, FaImage, FaFileAlt } from "react-icons/fa";
import { Icon } from "../Icon/Icon";

export interface UploadedFile {
  id: string;
  file: File;
  url?: string;
  progress?: number;
  error?: string;
}

export interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  onFileRemove?: (fileId: string) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  maxFiles?: number;
  disabled?: boolean;
  brutal?: boolean;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFilesSelected,
  onFileRemove,
  accept,
  multiple = true,
  maxSize = 10,
  maxFiles = 10,
  disabled = false,
  brutal = true,
  className,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (maxSize && file.size > maxSize * 1024 * 1024) {
      return `File "${file.name}" exceeds ${maxSize}MB limit`;
    }
    return null;
  };

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
          id: Math.random().toString(36).substr(2, 9),
          file,
          url: URL.createObjectURL(file),
        }));

        setFiles((prev) => [...prev, ...uploadedFiles]);
        onFilesSelected(validFiles);
      }

      setErrors(newErrors);
    },
    [files.length, maxFiles, onFilesSelected],
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (fileId: string) => {
    const file = files.find((f) => f.id === fileId);
    if (file?.url) {
      URL.revokeObjectURL(file.url);
    }
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
    onFileRemove?.(fileId);
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) return FaImage;
    return FaFileAlt;
  };

  return (
    <div className={className}>
      {/* Upload area */}
      <div
        className={clsx(
          "relative transition-all duration-200",
          brutal ? "border-4" : "border-2",
          "border-dashed border-brutal-black",
          dragActive && "border-brutal-pink bg-brutal-pink/10",
          !dragActive && "bg-brutal-white hover:bg-brutal-gray-50",
          disabled && "opacity-50 cursor-not-allowed",
          !disabled && "cursor-pointer",
          brutal && !disabled && "hover:shadow-brutal",
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleChange}
          disabled={disabled}
          className="sr-only"
        />

        <div className="p-8 text-center">
          <Icon
            icon={FaUpload}
            size="xl"
            className={clsx(
              "mx-auto mb-4",
              dragActive ? "text-brutal-pink" : "text-brutal-gray-400",
            )}
          />
          <p className="text-sm font-bold uppercase tracking-wider mb-2">
            {dragActive ? "Drop files here" : "Drag & drop files here"}
          </p>
          <p className="text-xs text-brutal-gray-600 font-mono">
            or click to browse
          </p>
          {accept && (
            <p className="text-xs text-brutal-gray-500 mt-2">
              Accept: {accept}
            </p>
          )}
          <p className="text-xs text-brutal-gray-500">
            Max {maxSize}MB per file • Max {maxFiles} files
          </p>
        </div>
      </div>

      {/* Error messages */}
      {errors.length > 0 && (
        <div className="mt-4 p-3 bg-brutal-coral border-2 border-brutal-black">
          {errors.map((error, idx) => (
            <p key={idx} className="text-sm font-bold">
              {error}
            </p>
          ))}
        </div>
      )}

      {/* File list */}
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file) => {
            const FileIcon = getFileIcon(file.file);
            return (
              <div
                key={file.id}
                className={clsx(
                  "flex items-center gap-3 p-3",
                  "bg-brutal-gray-100 border-2 border-brutal-black",
                  brutal && "shadow-brutal hover:shadow-brutal-md",
                  "transition-all duration-200",
                )}
              >
                <Icon
                  icon={FileIcon}
                  size="md"
                  className="text-brutal-gray-600"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">{file.file.name}</p>
                  <p className="text-xs text-brutal-gray-600 font-mono">
                    {(file.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                {file.progress !== undefined && (
                  <div className="w-20">
                    <div className="h-2 bg-brutal-gray-300 rounded">
                      <div
                        className="h-full bg-brutal-pink rounded transition-all duration-300"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  </div>
                )}
                <button
                  onClick={() => removeFile(file.id)}
                  className="p-1 hover:bg-brutal-black hover:text-brutal-white transition-colors"
                  aria-label="Remove file"
                >
                  <Icon icon={FaTimes} size="sm" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
