import type { Metadata } from "next";
import AnimatedDust from "../components/ui/animated-dust";
import Navbar from "../features/components/navbar/navbar";
import { fontVariablesString } from "../lib/fonts";
import "./globals.css";
import Footer from "@/features/components/footer/footer";

export const metadata: Metadata = {
  title: "AIMC - Advanced Industrial Maintenance & Consulting",
  description:
    "Leading provider of industrial automation, predictive maintenance, thermography, and consulting services for metal ore processing and industrial equipment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body
        className={`${fontVariablesString} font-satoshi antialiased relative`}
      >
        {/* <AnimatedDust /> */}
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
