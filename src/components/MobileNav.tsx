import { CalendarDays, Home, Search, Users } from "lucide-react";
import Link from "next/link";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/schedule", label: "Schedule", icon: CalendarDays },
  { href: "/groups", label: "Groups", icon: Users },
  { href: "/traveler", label: "Search", icon: Search },
];

export function MobileNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-border bg-background/95 p-2 backdrop-blur md:hidden">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1 rounded-card p-2 text-xs text-muted">
            <Icon className="h-5 w-5 text-accent" aria-hidden />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
