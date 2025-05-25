import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

const footerLinks = [
  { name: "Privacy", href: "/privacy"},
  { name: "FAQ", href: "/faq" },
  { name: "Terms and Conditions", href: "/terms" },
  { name: "Refund & Cancellation", href: "/refund-cancellation" },
  { name: "About Hind Svaasth Seva", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col">
            <div className="flex-1 w-full flex flex-col gap-5 items-center">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                  <div className="flex gap-5 items-center font-semibold">
                    <Link href={"/"}>Next.js Supabase Starter</Link>
                    <div className="flex items-center gap-2">
                      <DeployButton />
                    </div>
                  </div>
                  {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                </div>
              </nav>
              <div className="flex flex-col gap-5 p-0 m-0">
                {children}
              </div>
              <footer className="w-full border-t bg-background pt-5 pb-7">
                <nav
                  className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground"
                  aria-label="Footer"
                >
                  {footerLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={
                        "relative font-medium transition-colors",
                        "after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-1/2 after:h-[2px] after:bg-custom after:rounded-full after:transition-all after:duration-200",
                        "hover:after:w-full hover:text-custom"
                      }
                      style={{
                        paddingBottom: "2px",
                        display: "inline-block",
                      }}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
                <div className="mt-5 text-center text-xs text-muted-foreground">
                  &copy; {new Date().getFullYear()} Hind Svaasth Seva. All rights reserved.
                </div>
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
