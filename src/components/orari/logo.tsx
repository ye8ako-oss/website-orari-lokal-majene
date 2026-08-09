/* ============================================================
   LOGO ORARI LOKAL MAJENE (SVG)
   ------------------------------------------------------------
   Logo berbentuk perisai (shield) dengan gelombang radio di
   tengah, melambangkan komunikasi radio yang tertib dan
   berwibawa. Warna mengikuti identitas ORARI:
     - Biru Tua  (#003366) = Primary
     - Merah Tua (#B30000) = Secondary
   ============================================================ */
import Image from "next/image";
type LogoProps = {
  className?: string;
  size?: number;
};
export function OrariLogo({ className, size = 60 }: LogoProps) {
  return (
    <Image
      src="/images/logo-orari-lokal-majene.png"
      alt="Logo ORARI Lokal Majene"
      width={size}
      height={size}
      className={className}
      priority
    />
  );
}

export default OrariLogo;
