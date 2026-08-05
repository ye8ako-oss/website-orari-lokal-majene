/* ============================================================
   LOGO ORARI LOKAL MAJENE (SVG)
   ------------------------------------------------------------
   Logo berbentuk perisai (shield) dengan gelombang radio di
   tengah, melambangkan komunikasi radio yang tertib dan
   berwibawa. Warna mengikuti identitas ORARI:
     - Biru Tua  (#003366) = Primary
     - Merah Tua (#B30000) = Secondary
   ============================================================ */

type LogoProps = {
  className?: string;
  size?: number;
};

export function OrariLogo({ className, size = 48 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Logo ORARI Lokal Majene"
    >
      {/* Bentuk perisai (shield) */}
      <path
        d="M32 2 L58 11 V31 C58 47 47 57 32 62 C17 57 6 47 6 31 V11 Z"
        fill="#003366"
      />
      {/* Garis tepi perisai */}
      <path
        d="M32 2 L58 11 V31 C58 47 47 57 32 62 C17 57 6 47 6 31 V11 Z"
        stroke="#B30000"
        strokeWidth="2.5"
        fill="none"
      />
      {/* Bingkai dalam */}
      <path
        d="M32 7 L53 14 V31 C53 44 44 52.5 32 56.5 C20 52.5 11 44 11 31 V14 Z"
        stroke="#ffffff"
        strokeWidth="1.2"
        fill="none"
        opacity="0.55"
      />
      {/* Menara / tiang antenna di tengah */}
      <rect x="30.6" y="26" width="2.8" height="18" fill="#ffffff" rx="1" />
      {/* Puncah antenna (bola) */}
      <circle cx="32" cy="24" r="2.6" fill="#ffffff" />
      {/* Gelombang radio kiri & kanan */}
      <path
        d="M21 36 Q24 32 21 28"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M43 36 Q40 32 43 28"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M16 38 Q21 32 16 26"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M48 38 Q43 32 48 26"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      {/* Garis bawah (tanah) */}
      <line x1="14" y1="46" x2="50" y2="46" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" />
    </svg>
  );
}

export default OrariLogo;
