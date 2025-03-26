
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import GradientButton from "./GradientButton";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6",
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-semibold tracking-tight transition-opacity hover:opacity-80"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
              GrapeJS
            </span>
            <span className="ml-1 text-gray-800 dark:text-gray-200">Studio</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLinks />
            <GradientButton onClick={() => window.location.href = "#try-now"}>
              Try Builder
            </GradientButton>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-white dark:bg-gray-900 transform transition-transform duration-300 ease-in-out md:hidden pt-24",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="container flex flex-col items-center space-y-8 py-8">
          <NavLinks mobile onClick={() => setMobileMenuOpen(false)} />
          <GradientButton 
            onClick={() => {
              window.location.href = "#try-now";
              setMobileMenuOpen(false);
            }}
          >
            Try Builder
          </GradientButton>
        </nav>
      </div>
    </header>
  );
};

interface NavLinksProps {
  mobile?: boolean;
  onClick?: () => void;
}

const NavLinks = ({ mobile, onClick }: NavLinksProps) => {
  const links = [
    { name: "Features", href: "#features" },
    { name: "Demo", href: "#demo" },
    { name: "Templates", href: "#templates" },
    { name: "Docs", href: "https://grapesjs.com/docs/" },
  ];

  return (
    <>
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          onClick={onClick}
          className={cn(
            "font-medium transition-colors duration-200",
            mobile ? "text-2xl py-3" : "text-sm",
            "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          )}
        >
          {link.name}
        </a>
      ))}
    </>
  );
};

export default Header;
