import { Locale } from "@/lib/content/contentMap";
import "../../global.css";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export const metadata = {
  metadataBase: new URL("https://floriansahbi.dev"),
  title: {
    default: "floriansahbi.dev",
    template: "%s | floriansahbi.dev",
  },
  description: "Développeur JavaScript Fullstack (Next.js, TypeScript, CMS headless)",
  openGraph: {
    title: "floriansahbi.dev",
    description: "Développeur JavaScript Fullstack (Next.js, TypeScript, CMS headless)",
    url: "https://floriansahbi.dev",
    siteName: "floriansahbi.dev",
    images: [
      {
        url: "/og.png",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "floriansahbi.dev",
    description: "Développeur JavaScript Fullstack (Next.js, TypeScript, CMS headless)",
    images: ["/og.png"],
  },
  themeColor: "#000000",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: Locale };
}) {
  const { lang } = params;

  return (
    <html lang={lang} className={[inter.variable, calSans.variable].join(" ")}>
      <body className={`bg-black ${process.env.NODE_ENV === "development" ? "debug-screens" : ""}`}>
        {children}
      </body>
    </html>
  );
}
