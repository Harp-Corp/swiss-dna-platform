export function DnaLogo({ size = 48, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Swiss DNA Code Logo"
    >
      {/* DNA double helix */}
      <path
        d="M20 8 C20 8, 32 16, 44 12 C44 12, 32 24, 20 20 C20 20, 32 32, 44 28 C44 28, 32 40, 20 36 C20 36, 32 48, 44 44 C44 44, 32 56, 20 52"
        stroke="#1B3A6B"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M44 8 C44 8, 32 16, 20 12 C20 12, 32 24, 44 20 C44 20, 32 32, 20 28 C20 28, 32 40, 44 36 C44 36, 32 48, 20 44 C20 44, 32 56, 44 52"
        stroke="#C9A84C"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Connecting rungs */}
      <line x1="24" y1="10" x2="40" y2="10" stroke="#1B3A6B" strokeWidth="1.5" opacity="0.3" />
      <line x1="22" y1="16" x2="42" y2="16" stroke="#1B3A6B" strokeWidth="1.5" opacity="0.3" />
      <line x1="24" y1="22" x2="40" y2="22" stroke="#1B3A6B" strokeWidth="1.5" opacity="0.3" />
      <line x1="22" y1="28" x2="42" y2="28" stroke="#1B3A6B" strokeWidth="1.5" opacity="0.3" />
      <line x1="24" y1="34" x2="40" y2="34" stroke="#1B3A6B" strokeWidth="1.5" opacity="0.3" />
      <line x1="22" y1="40" x2="42" y2="40" stroke="#1B3A6B" strokeWidth="1.5" opacity="0.3" />
      <line x1="24" y1="46" x2="40" y2="46" stroke="#1B3A6B" strokeWidth="1.5" opacity="0.3" />
      <line x1="22" y1="52" x2="42" y2="52" stroke="#1B3A6B" strokeWidth="1.5" opacity="0.3" />
      {/* Swiss cross badge */}
      <circle cx="52" cy="52" r="9" fill="#E30613" />
      <rect x="49" y="47" width="6" height="10" rx="1" fill="white" />
      <rect x="47" y="49" width="10" height="6" rx="1" fill="white" />
    </svg>
  );
}
