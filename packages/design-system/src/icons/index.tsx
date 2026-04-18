import type { ReactNode, SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
  className?: string;
};

type BaseIconProps = IconProps & {
  children: ReactNode;
};

function IconBase({
  size = 20,
  className,
  children,
  ...props
}: BaseIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowDownIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 5v14" />
      <path d="M6.5 13.5 12 19l5.5-5.5" />
    </IconBase>
  );
}

export function ArrowUpIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 19V5" />
      <path d="M17.5 10.5 12 5l-5.5 5.5" />
    </IconBase>
  );
}

export function ChartBarIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 20h16" />
      <path d="M7 20v-8" />
      <path d="M12 20V7" />
      <path d="M17 20v-11" />
    </IconBase>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m14.5 5.5-7 6.5 7 6.5" />
    </IconBase>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m9.5 5.5 7 6.5-7 6.5" />
    </IconBase>
  );
}

export function ConversionIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 8h11" />
      <path d="m13 5 3 3-3 3" />
      <path d="M19 16H8" />
      <path d="m11 13-3 3 3 3" />
    </IconBase>
  );
}

export function ExternalLinkIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M14 5h5v5" />
      <path d="M10 14 19 5" />
      <path d="M19 13v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4" />
    </IconBase>
  );
}

export function FlaskIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M10 3h4" />
      <path d="M11 3v5l-5.5 9.5a2 2 0 0 0 1.7 3h9.6a2 2 0 0 0 1.7-3L13 8V3" />
      <path d="M8.5 13h7" />
    </IconBase>
  );
}

export function FolderChartIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M3 8.5a2.5 2.5 0 0 1 2.5-2.5H10l1.8 2H18.5A2.5 2.5 0 0 1 21 10.5v7A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5z" />
      <path d="M8 16v-3.5" />
      <path d="M12 16v-5" />
      <path d="M16 16v-2" />
    </IconBase>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </IconBase>
  );
}

export function RevenueIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 19h16" />
      <path d="m6 14 4-4 3 3 5-6" />
      <path d="M18 7h2v2" />
    </IconBase>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </IconBase>
  );
}

export function SessionsIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="4" y="5" width="7" height="6" rx="1.5" />
      <rect x="13" y="5" width="7" height="6" rx="1.5" />
      <rect x="4" y="13" width="7" height="6" rx="1.5" />
      <rect x="13" y="13" width="7" height="6" rx="1.5" />
    </IconBase>
  );
}

export function SettingsIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a2 2 0 1 1-4 0v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a2 2 0 1 1 0-4h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1 1 0 0 0 1.1.2h.1a1 1 0 0 0 .6-.9V4a2 2 0 1 1 4 0v.2a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1 1 0 0 0-.2 1.1v.1a1 1 0 0 0 .9.6h.2a2 2 0 1 1 0 4h-.2a1 1 0 0 0-.9.6z" />
    </IconBase>
  );
}

export function SortIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M8 6v12" />
      <path d="m5.5 8.5 2.5-2.5 2.5 2.5" />
      <path d="M16 18V6" />
      <path d="m13.5 15.5 2.5 2.5 2.5-2.5" />
    </IconBase>
  );
}

export function ThemeIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M21 12.8A8.8 8.8 0 1 1 11.2 3a7 7 0 1 0 9.8 9.8" />
    </IconBase>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="9" cy="8.5" r="2.5" />
      <path d="M4.5 18a4.5 4.5 0 0 1 9 0" />
      <circle cx="17" cy="9.5" r="2" />
      <path d="M14.8 17.5a3.8 3.8 0 0 1 4.2-3" />
    </IconBase>
  );
}
