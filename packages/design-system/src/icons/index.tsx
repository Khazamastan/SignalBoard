import type { SVGProps } from "react";

export type IconProps = Omit<SVGProps<SVGSVGElement>, "width" | "height"> & {
  size?: number;
};

const baseIconProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function SearchIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...baseIconProps} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function MenuIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...baseIconProps} {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

export function ChartBarIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...baseIconProps} {...props}>
      <path d="M4 20h16" />
      <path d="M7 20v-8" />
      <path d="M12 20V9" />
      <path d="M17 20v-5" />
    </svg>
  );
}

export function FlaskIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...baseIconProps} {...props}>
      <path d="M10 3h4" />
      <path d="M10 3v5l-5 8a4 4 0 0 0 3.4 6h7.2A4 4 0 0 0 19 16l-5-8V3" />
      <path d="M8 13h8" />
    </svg>
  );
}

export function FolderChartIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...baseIconProps} {...props}>
      <path d="M3 8a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
      <path d="M8 16v-3" />
      <path d="M12 16v-5" />
      <path d="M16 16v-2" />
    </svg>
  );
}

export function SettingsIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...baseIconProps} {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a1.5 1.5 0 0 1 0 2.1 1.5 1.5 0 0 1-2.1 0l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V19a1.5 1.5 0 0 1-3 0v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a1.5 1.5 0 0 1-2.1 0 1.5 1.5 0 0 1 0-2.1l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H5a1.5 1.5 0 0 1 0-3h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a1.5 1.5 0 0 1 0-2.1 1.5 1.5 0 0 1 2.1 0l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9V5a1.5 1.5 0 0 1 3 0v.2a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a1.5 1.5 0 0 1 2.1 0 1.5 1.5 0 0 1 0 2.1l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6H19a1.5 1.5 0 0 1 0 3h-.2a1 1 0 0 0-.9.6Z" />
    </svg>
  );
}

export function ChevronLeftIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...baseIconProps} {...props}>
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

export function ChevronRightIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...baseIconProps} {...props}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export function ExternalLinkIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...baseIconProps} {...props}>
      <path d="M14 5h5v5" />
      <path d="m10 14 9-9" />
      <path d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

export function ArrowUpIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...baseIconProps} {...props}>
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}

export function ArrowDownIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...baseIconProps} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function SortIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...baseIconProps} {...props}>
      <path d="m18 10-6-6-6 6" />
      <path d="m6 14 6 6 6-6" />
    </svg>
  );
}

export function UsersIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...baseIconProps} {...props}>
      <path d="M16 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <path d="M2 20a6 6 0 0 1 12 0" />
      <path d="M14 20a4 4 0 0 1 8 0" />
    </svg>
  );
}

export function RevenueIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...baseIconProps} {...props}>
      <path d="M4 20h16" />
      <path d="m6 15 4-4 3 3 5-6" />
      <path d="M18 8h2v2" />
    </svg>
  );
}

export function SessionsIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...baseIconProps} {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="m12 12 4-2" />
      <path d="M12 5v2" />
      <path d="M5 12h2" />
      <path d="M17 12h2" />
      <path d="M12 17v2" />
    </svg>
  );
}

export function ConversionIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...baseIconProps} {...props}>
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </svg>
  );
}

export function ThemeIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...baseIconProps} {...props}>
      <path d="M12 4a8 8 0 1 0 0 16Z" />
      <path d="M12 4v16" />
    </svg>
  );
}
