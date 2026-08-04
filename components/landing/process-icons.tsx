function IconBase({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-8 h-8"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function ChatBubbleIcon() {
  return (
    <IconBase>
      <path d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H10l-4.5 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
      <path d="M8 9.5h8M8 12.5h5" />
    </IconBase>
  );
}

export function UserCheckIcon() {
  return (
    <IconBase>
      <circle cx="10" cy="8" r="3.25" />
      <path d="M3.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
      <path d="M16.5 12.5l2 2 3.5-3.5" />
    </IconBase>
  );
}

export function FileInvoiceIcon() {
  return (
    <IconBase>
      <path d="M6 3h9l4 4v14H6z" />
      <path d="M15 3v4h4" />
      <path d="M9 11h6M9 14h6M9 17h3" />
    </IconBase>
  );
}

export function ExchangeArrowsIcon() {
  return (
    <IconBase>
      <path d="M4 8h14M15 5l3 3-3 3" />
      <path d="M20 16H6M9 13l-3 3 3 3" />
    </IconBase>
  );
}

export function ShieldCheckIcon() {
  return (
    <IconBase>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </IconBase>
  );
}

export function CreditCardIcon() {
  return (
    <IconBase>
      <rect x="2.5" y="5.5" width="19" height="13" rx="1.5" />
      <path d="M2.5 9.5h19" />
      <path d="M6 14.5h4" />
    </IconBase>
  );
}

export function ReceiptIcon() {
  return (
    <IconBase>
      <path d="M6 3h12v18l-2-1.3-2 1.3-2-1.3-2 1.3-2-1.3-2 1.3z" />
      <path d="M9 8h6M9 11.5h6M9 15h4" />
    </IconBase>
  );
}

export function TruckIcon() {
  return (
    <IconBase>
      <path d="M2.5 7h11v9h-11z" />
      <path d="M13.5 10h4l3 3v3h-7z" />
      <circle cx="6.5" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </IconBase>
  );
}

export function HeadsetIcon() {
  return (
    <IconBase>
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
      <rect x="2.5" y="12.5" width="4" height="6" rx="1.5" />
      <rect x="17.5" y="12.5" width="4" height="6" rx="1.5" />
      <path d="M20 18.5v.5a3 3 0 0 1-3 3h-3" />
    </IconBase>
  );
}
