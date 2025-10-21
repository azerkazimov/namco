"use client";

import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useMobile } from "@/features/store/useMobile";
import MobileNav from "./mobile-nav";
import { SearchDialog } from "@/components/ui/search-dialog";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { isMenuOpen, setIsMenuOpen } = useMobile();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contacts", label: "Contacts" },
    { href: "/careers", label: "Careers" },
  ];

  return (
    <div className={cn(
      "fixed top-0 z-50 w-full transition-all duration-300",
      isScrolled ? "backdrop-blur-md bg-black/20" : "bg-transparent"
    )}>
      {/* Logo and Search Section - Hidden on scroll */}
      <div className={cn(
        "hidden md:block transition-all duration-300",
        isScrolled ? "opacity-0 -translate-y-full" : "opacity-100 translate-y-0"
      )}>
        <div className="flex container mx-auto px-4 sm:px-6 py-3 justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-3xl font-bold text-white hover:text-amber-600 transition-colors duration-200 font-montserrat">
                AIMC
              </span>
            </Link>
          </div>
          <div className="flex gap-2">
            <SearchDialog />
            <Link href="/contacts">
              <Button className="rounded-md flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white shadow">
                Contact Us
                <ArrowUpRight />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Section - Always visible */}
      <nav>
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Desktop Navigation */}
            <div className="hidden md:block w-full">
              <NavigationMenu className="py-2 min-w-full flex justify-between items-center">
                <ul className="min-w-full flex justify-between items-center gap-6">
                  {navLinks.map((link) => (
                    <li
                      key={link.href}
                      className="w-full flex justify-start items-center border-t-2 border-white/30"
                    >
                      <Link href={link.href} legacyBehavior passHref>
                        <NavigationMenuLink
                          className={cn(
                            "text-white py-4 flex items-center justify-start rounded-md text-md font-medium transition-all duration-200 relative font-satoshi",
                            "hover:bg-transparent focus:bg-transparent data-[active=true]:bg-transparent",
                            "data-[active=true]:text-amber-500 hover:text-amber-500 focus:text-amber-500",
                            "before:absolute before:bottom-0 before:left-[10%] before:w-0 before:h-0.5 before:bg-amber-600 before:transition-all before:duration-300 hover:before:w-[80%]"
                          )}
                        >
                          {link.label}
                        </NavigationMenuLink>
                      </Link>
                    </li>
                  ))}
                </ul>
              </NavigationMenu>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <button className="text-white hover:text-gray-300 hover:bg-gray-800 p-2 rounded-xs transition-colors duration-200">
                    <Menu className="h-6 w-6" />
                  </button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-80 bg-neutral-900 border-neutral-700"
                >
                  <MobileNav navLinks={navLinks} />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
