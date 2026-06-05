import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";

import { ModeToggle } from "./mode-toggle";
import { ThemeProvider } from "./theme-provider";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "ui-ecosystem Docs",
  description: "Documentation and component registry for ui-ecosystem",
};

const navItems = [
  { href: "/docs", label: "Docs" },
  { href: "/docs", label: "Components" },
];

function SiteHeader() {
  return (
    <header className="border-border/40 bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="bg-foreground inline-block h-5 w-5 rounded-sm" />
          <span>ui-ecosystem</span>
        </Link>
        <nav className="hidden items-center gap-4 text-sm md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1 text-sm">
          <a
            href="https://github.com/shadcn-ui"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground px-2 transition-colors"
          >
            GitHub
          </a>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} style-nova font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-svh flex-col">
            <SiteHeader />
            <div className="flex-1">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
