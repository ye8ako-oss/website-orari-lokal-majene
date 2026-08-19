import Link from "next/link";
import { LayoutDashboard } from "lucide-react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex min-h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#001f3f]"
          >
            <LayoutDashboard size={18} />
            <span>Admin ORARI Lokal Majene</span>
          </Link>

          <Link
            href="/"
            className="text-sm font-medium text-gray-500 transition hover:text-[#001f3f]"
          >
            Lihat Website
          </Link>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}
