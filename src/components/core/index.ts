/**
 * @file src/components/core/index.ts
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Core components barrel export
 */
// Button components
export { Button, ButtonGroup } from "./Button";
export type { ButtonProps, ButtonGroupProps } from "./Button";

// Card components
export * from "./Card";

// Icon component and common icons
export { Icon } from "./Icon";
export type { IconProps } from "./Icon";
export * from "./Icon";

// Chip components
export { Chip, ChipGroup, TechChip, TechChipGroup } from "./Chip";
export type {
  ChipProps,
  ChipGroupProps,
  TechChipProps,
  TechChipGroupProps,
} from "./Chip";

// LoadingSpinner
export { LoadingSpinner } from "./LoadingSpinner";
export type { LoadingSpinnerProps } from "./LoadingSpinner";

// Modal
export { Modal } from "./Modal";
export type { ModalProps } from "./Modal";

// Text components
export { Text, Heading, AnimatedHeading, WavyTitle } from "./Text";
export type { TextProps, HeadingProps, WavyTitleProps } from "./Text";

// Badge components
export { Badge, BadgeGroup } from "./Badge";
export type { BadgeProps, BadgeGroupProps } from "./Badge";

// Tooltip
export { Tooltip } from "./Tooltip";
export type { TooltipProps } from "./Tooltip";

// Link
export { Link } from "./Link";
export type { LinkProps } from "./Link";

// Code components
export { Code, InlineCode } from "./Code";
export type { CodeProps, InlineCodeProps } from "./Code";

// Quote components
export { Quote, PullQuote } from "./Quote";
export type { QuoteProps, PullQuoteProps } from "./Quote";

// Form elements
export { Input, Select } from "./Input";
export type { InputProps, SelectProps } from "./Input";

export { Textarea } from "./Textarea";
export type { TextareaProps } from "./Textarea";

export { Checkbox, CheckboxGroup } from "./Checkbox";
export type { CheckboxProps, CheckboxGroupProps } from "./Checkbox";

export { Radio, RadioGroup } from "./Radio";
export type { RadioProps, RadioGroupProps } from "./Radio";

export { Toggle } from "./Toggle";
export type { ToggleProps } from "./Toggle";

export { DatePicker } from "./DatePicker";
export type { DatePickerProps } from "./DatePicker";

export { FileUpload } from "./FileUpload";
export type { FileUploadProps, UploadedFile } from "./FileUpload";

// Table and Metric
export {
  Table,
  TableSkeleton,
  type TableProps,
  type Column,
} from "./Table/Table";
export { Metric, MetricSkeleton, type MetricProps } from "./Metric/Metric";

// Tab components
export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  type TabsProps,
  type TabsListProps,
  type TabsTriggerProps,
  type TabsContentProps,
} from "./Tabs";
