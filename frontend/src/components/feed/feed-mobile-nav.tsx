"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsIcon } from "../ui/bs-icons";

const navItems = [
  {
    href: "/",
    label: "Home",
    iconName: "home" as const,
  },
  {
    href: "/friends",
    label: "Friends",
    iconName: "friends" as const,
  },
  {
    href: "/notifications",
    label: "Notifications",
    badge: 6,
    iconName: "bell" as const,
  },
  {
    href: "/messages",
    label: "Messages",
    badge: 2,
    iconName: "chat" as const,
  },
];

export function FeedMobileNav() {
  const pathname = usePathname();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-bs-border shadow-[0_-4px_12px_rgba(108,126,147,0.1)]">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center gap-0.5 px-3 py-1 rounded-[8px] transition-all`}
            >
              <span className="relative">
                <span
                  className={`block transition-transform duration-200 ${isActive ? "scale-110" : ""}`}
                >
                  <BsIcon name={item.iconName} size={24} active={isActive} />
                </span>
                {item.badge && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-bs-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </span>
              <span className={`text-[9px] font-medium ${isActive ? "text-bs-primary" : "text-[#7B7B7B]"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* Menu Hamburger */}
        <button className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-[8px] transition-all">
          <BsIcon name="menu" size={24} />
          <span className="text-[9px] font-medium text-[#7B7B7B]">Menu</span>
        </button>
      </div>
    </div>
  );
}
