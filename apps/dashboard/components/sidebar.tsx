"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { label: "overview", href: "/", icon: "nav-overview" },
  { label: "Users", href: "/users", icon: "nav-users" },
  { label: "Providers", href: "/providers", icon: "nav-providers" },
  { label: "App Modules", href: "/app-modules", icon: "nav-app-modules" },
  { label: "Map & Areas", href: "/map-areas", icon: "nav-map-areas" },
  { label: "Finance", href: "/finance", icon: "nav-finance" },
  { label: "Orders", href: "/orders", icon: "nav-orders" },
  { label: "Website", href: "/website", icon: "nav-website" },
  { label: "Settings", href: "/settings", icon: "nav-settings" },
];

const ITEM =
  "flex h-12 w-[216px] items-center gap-2 rounded-[36px] pr-[45px] pl-9 text-2xl leading-[normal] whitespace-nowrap transition-colors duration-200";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 h-dvh min-h-[880px] w-62 shrink-0">
      <Image
        src="/svg/sidebar-top.svg"
        alt=""
        width={256}
        height={224}
        priority
        className="absolute -top-1 -left-[5px] z-10 max-w-none"
      />
      <span className="absolute inset-x-0 top-[220px] bottom-0 rounded-br-4xl bg-primary-50 shadow-sidebar" />

      <div className="relative z-20 flex h-full flex-col">
        <div className="mt-[39px] flex items-center justify-center gap-[35px]">
          <Link href="/" aria-label="The Map dashboard home">
            <Image src="/svg/logo.svg" alt="The Map" width={152} height={34} priority />
          </Link>
          <button type="button" aria-label="Collapse sidebar" className="cursor-pointer">
            <Image src="/svg/sidebar-collapse.svg" alt="" width={24} height={24} />
          </button>
        </div>

        <nav aria-label="Main" className="mt-14 px-[18px]">
          <ul className="flex flex-col gap-8">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`${ITEM} ${
                      active
                        ? "bg-primary-500 text-neutral-50"
                        : "text-primary-900 hover:bg-neutral-50"
                    }`}
                  >
                    <Image src={`/svg/${item.icon}.svg`} alt="" width={24} height={24} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          className={`${ITEM} mx-[18px] mt-auto mb-[21px] cursor-pointer text-error-600 hover:bg-neutral-50`}
        >
          <Image src="/svg/nav-log-out.svg" alt="" width={24} height={24} />
          Log out
        </button>
      </div>
    </aside>
  );
}
