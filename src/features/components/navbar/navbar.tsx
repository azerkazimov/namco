"use client";

import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useMobile } from "@/features/store/useMobile";
import MobileNav from "./mobile-nav";
const Navbar = () => {
  const { isMenuOpen, setIsMenuOpen } = useMobile();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/careers", label: "Careers" },
    { href: "/contact", label: "Contact", icon: <ArrowUpRight /> },
  ];

  return (
    <nav className="bg-transparent shadow-lg relative z-20">
      <div className="container mx-auto px-4 sm:px-6 ">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-white hover:text-blue-600 transition-colors duration-200">
                NAMCO
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="space-x-2">
                {navLinks.map((link) => (
                  <NavigationMenuItem key={link.href}>
                    <Link href={link.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          "text-white px-2 py-1 mx-2 flex items-center justify-center gap-1 rounded-md text-md font-medium transition-all duration-200 relative",
                          "hover:bg-transparent focus:bg-transparent data-[active=true]:bg-transparent",
                          "data-[active=true]:text-white hover:text-white focus:text-white",
                          "before:absolute before:bottom-0 before:left-[10%] before:w-0 before:h-0.5 before:bg-white before:transition-all before:duration-300 hover:before:w-[70%]"
                        )}
                      >
                        <span className="flex items-center gap-1">
                          {link.label}
                          {link.icon && <span className="flex items-center">{link.icon}</span>}
                        </span>
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
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
                className="w-80 bg-black border-gray-700"
              >
                <MobileNav navLinks={navLinks} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
