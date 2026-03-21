import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./workshop.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Strategist OS",
  description:
    "Full Strategist Operating System: Define, Model, Interrogate, Execute, Reflect — worked examples and daily review.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body
        className={`workshop-root min-h-screen font-sans antialiased`}
        style={{ fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
