"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { docsSections } from "@/content/docs";
import { cn } from "@/lib/utils";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="mx-auto w-full max-w-7xl flex-1 items-start px-4 sm:px-6 md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 lg:px-8">
      <aside className="top-14 z-30 hidden h-[calc(100svh-3.5rem)] shrink-0 md:sticky md:block">
        <nav className="h-full overflow-y-auto py-8 pr-4 text-sm">
          {docsSections.map((section) => (
            <div key={section.title} className="pb-6">
              <p className="text-foreground mb-2 px-2 text-sm font-semibold">{section.title}</p>
              <ul className="grid gap-0.5">
                <li>
                  <Link
                    href="/docs"
                    className={cn(
                      "text-muted-foreground hover:text-foreground flex w-full items-center rounded-md px-2 py-1.5 transition-colors",
                      pathname === "/docs" && "bg-accent text-accent-foreground font-medium",
                    )}
                  >
                    Overview
                  </Link>
                </li>
                {section.items.map((item) => {
                  const href = `/docs/${item.slug}`;
                  const isActive = pathname === href;

                  return (
                    <li key={item.slug}>
                      <Link
                        href={href}
                        className={cn(
                          "text-muted-foreground hover:text-foreground flex w-full items-center rounded-md px-2 py-1.5 transition-colors",
                          isActive && "bg-accent text-accent-foreground font-medium",
                        )}
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
      <main className="min-w-0 py-8 lg:py-10">{children}</main>
    </div>
  );
}
