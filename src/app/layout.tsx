import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../features/components/navbar/navbar";
import { fontVariablesString } from "../lib/fonts";
import AnimatedDust from "../components/ui/animated-dust";

export const metadata: Metadata = {
  title: "AIMC",
  description: "AIMC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${fontVariablesString} font-league-spartan antialiased relative`}

      >
        <AnimatedDust />
        <Navbar />
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
