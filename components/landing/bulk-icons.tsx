function IconBase({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-7 h-7"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function TieredPriceIcon() {
  return (
    <IconBase>
      <path d="M3 20h4v-5H3z" />
      <path d="M10 20h4v-9h-4z" />
      <path d="M17 20h4V6h-4z" />
      <path d="M3 5l6.5 6.5" />
      <path d="M4.5 5H3v1.5" />
    </IconBase>
  );
}

export function ConfigIncludedIcon() {
  return (
    <IconBase>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2.5M12 18.5V21M21 12h-2.5M5.5 12H3M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8M18.4 18.4l-1.8-1.8M7.4 7.4 5.6 5.6" />
      <path d="M9 15l1.5 1.5L16 11" />
    </IconBase>
  );
}
