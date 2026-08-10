import {
  ExternalLink,
  IdCard,
  Radio,
  GraduationCap,
  CloudSun,
} from "lucide-react";

const PORTAL = [
  {
    title: "Portal KOMDIGI",
    description: "IAR, IKRAP & UNAR",
    href: "https://iar-ikrap.postel.go.id/",
    icon: IdCard,
  },
  {
    title: "SIORDIG",
    description: "Portal digital ORARI",
    href: "https://digital.orari.or.id/login",
    icon: Radio,
  },
  {
    title: "SeeNow",
    description: "e-Learning & Try-Out",
    href: "https://seenow.postel.go.id/",
    icon: GraduationCap,
  },
  {
    title: "BMKG",
    description: "Cuaca & meteorologi",
    href: "https://www.bmkg.go.id/",
    icon: CloudSun,
  },
];

export function Portal() {
  return (
    <div>
      <div className="mb-3 flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B30000]">
            Akses Cepat
          </p>
          <h3 className="mt-1 font-heading text-xl font-bold text-[#003366]">
            Portal
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {PORTAL.map((item) => {
          const Icon = item.icon;

          return (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-[86px] min-w-0 flex-col justify-between rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#003366]/20 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#003366]/10 text-[#003366] transition-colors group-hover:bg-[#B30000]/10 group-hover:text-[#B30000]">
                  <Icon size={17} />
                </span>
                <ExternalLink
                  size={14}
                  className="mt-1 shrink-0 text-slate-300 transition-colors group-hover:text-[#B30000]"
                />
              </div>

              <div className="mt-3 min-w-0">
                <h4 className="truncate font-heading text-sm font-semibold text-[#003366] group-hover:text-[#B30000]">
                  {item.title}
                </h4>
                <p className="mt-0.5 truncate text-[11px] text-slate-500">
                  {item.description}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default Portal;
