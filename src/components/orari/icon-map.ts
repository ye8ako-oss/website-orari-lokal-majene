/* ============================================================
   HELPER IKON DINAMIS
   ------------------------------------------------------------
   Memetakan nama ikon (string) dari file data ke komponen
   ikon Lucide React. Memudahkan pengelolaan ikon per kartu
   tanpa menulis import satu per satu di setiap section.
   ============================================================ */
import {
  Users,
  Radio,
  Siren,
  HeartHandshake,
  Building2,
  Globe,
  Signal,
  ClipboardCheck,
  Award,
  IdCard,
  MonitorSmartphone,
  Landmark,
  Download,
  Scale,
  FileText,
  Handshake,
  FileSignature,
  Mail,
  FileCheck,
  BookOpen,
  FolderArchive,
  RadioTower,
  type LucideIcon,
} from "lucide-react";

/* Peta nama ikon (string) -> komponen ikon */
const ICON_MAP: Record<string, LucideIcon> = {
  Users,
  Radio,
  Siren,
  HeartHandshake,
  Building2,
  Globe,
  Signal,
  ClipboardCheck,
  Award,
  IdCard,
  MonitorSmartphone,
  Landmark,
  Download,
  Scale,
  FileText,
  Handshake,
  FileSignature,
  Mail,
  FileCheck,
  BookOpen,
  FolderArchive,
  RadioTower,
};

/** Ambil komponen ikon berdasarkan nama string. */
export function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Radio;
}
