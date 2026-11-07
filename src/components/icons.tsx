interface IconProps {
  width?: number;
  height?: number;
  className?: string;
}

export function IconPlus({ width = 16, height = 16, className }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M8 3v10M3 8h10" />
    </svg>
  );
}

export function IconSearch({ width = 16, height = 16, className }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="7" cy="7" r="4.25" />
      <path d="M10.2 10.2L13.5 13.5" />
    </svg>
  );
}

export function IconTrash({ width = 16, height = 16, className }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 4h11M6.5 4V2.5h3V4M4 4l.6 9.5h6.8L12 4M6.7 6.8v4.4M9.3 6.8v4.4" />
    </svg>
  );
}
