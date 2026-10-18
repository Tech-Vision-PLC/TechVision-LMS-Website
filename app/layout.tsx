import type { Metadata } from "next";
import {Hanken_Grotesk,JetBrains_Mono} from "next/font/google"
import "./globals.css";
import { SiteLoader } from "@/components/SiteLoader";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tech Vision",
  description: "Project-based technology training, mentorship, and career-focused learning in Ethiopia.",
  icons: { icon: "/brand/techvision-mark.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="antialiased  ${hankenGrotesk.variable} ${jetBrainsMono.variable}" suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var m=localStorage.getItem('techvision-theme')||'system';var d=m==='dark'||(m==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.dataset.theme=d?'dark':'light';document.documentElement.dataset.themeMode=m;document.documentElement.style.colorScheme=d?'dark':'light';}catch(e){}})();`,
          }}
        />
        <SiteLoader />
        {children}
      </body>
    </html>
  );
}
