export type { StatusBadgeProps } from "./StatusBadge";
export type { ActionButtonProps } from "./ActionButton";
export type { MessageBubbleProps } from "./MessageBubble";

export interface BaseAtomProps {
 className?: string;
 children?: React.ReactNode;
}

export type SizeVariant = "sm" | "md" | "lg";
export type ExtendedSizeVariant = "xs" | "sm" | "md" | "lg" | "xl";

export type ColorVariant =
 | "default"
 | "primary"
 | "secondary"
 | "success"
 | "warning"
 | "danger"
 | "muted";

export type ButtonVariant =
 | "default"
 | "destructive"
 | "outline"
 | "secondary"
 | "ghost"
 | "link";

export type StatusVariant =
 | "active"
 | "inactive"
 | "pending"
 | "completed"
 | "cancelled"
 | "draft";
