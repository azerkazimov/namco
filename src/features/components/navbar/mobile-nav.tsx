"use client";

import { useMobile } from "@/features/store/useMobile";
import Link from "next/link";

interface MobileNavProps {
  navLinks: { href: string; label: string, icon?: React.ReactNode }[];
}

export default function MobileNav({ navLinks }: MobileNavProps) {
  const { setIsMenuOpen } = useMobile();
  
  return (
    <div className="flex flex-col h-full pt-12 px-4">
      <div className="flex flex-col space-y-4">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-gray-300 hover:text-white block px-4 py-3 rounded-md text-lg font-medium transition-colors duration-200 hover:bg-gray-800"
            onClick={() => setIsMenuOpen(false)}
          >
            {link.label}
            {link.icon}
          </Link>
        ))}
      </div>
    </div>
  );
}
