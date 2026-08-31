import type { Metadata } from "next";
import { Inter, Inter_Tight, Geist_Mono } from "next/font/google";
import "./globals.css";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const display = Inter_Tight({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // No metadataBase until there is a confirmed domain. Next resolves the
  // generated OG image relative to the deployment URL in the meantime.
  title: {
    default: "Shahad Qumosani — Product Designer",
    template: "%s — Shahad Qumosani",
  },
  description:
    "Product Designer. I turn complex product problems into clear, thoughtful digital experiences — from product strategy and UX to polished interfaces and design systems.",
  keywords: [
    "Product Designer",
    "UX Designer",
    "UI Designer",
    "Product design",
    "Design systems",
    "Information architecture",
  ],
  authors: [{ name: "Shahad Qumosani" }],
  creator: "Shahad Qumosani",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Shahad Qumosani — Product Designer",
    description:
      "I turn complex product problems into clear, thoughtful digital experiences — from product strategy and UX to polished interfaces and design systems.",
    siteName: "Shahad Qumosani",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shahad Qumosani — Product Designer",
    description:
      "I turn complex product problems into clear, thoughtful digital experiences — from product strategy and UX to polished interfaces and design systems.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
