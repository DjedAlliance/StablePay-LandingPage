"use client";

import { useState } from "react";
import MenuIcon from "@/assets/icon-menu.svg";
import Logo from "@/assets/logo.svg";
import Button from "@/components/Button";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="py-3 sm:py-4 border-b border-white/15 md:border-none sticky top-0 z-30">
        {/* Mobile blur background */}
        <div className="absolute inset-0 backdrop-blur -z-10 md:hidden" />

        <div className="container px-4 sm:px-6">
          <div className="flex justify-between items-center md:border border-white/15 md:p-2.5 rounded-xl max-w-2xl mx-auto relative">
            {/* Desktop blur */}
            <div className="absolute inset-0 backdrop-blur -z-10 hidden md:block" />

            {/* Logo */}
            <Logo className="h-9 w-9" />

            {/* Desktop nav */}
            <nav className="hidden md:flex gap-4 lg:gap-8 text-sm">
              <a className="text-white/70 hover:text-white transition" href="#">
                Features
              </a>
              <a className="text-white/70 hover:text-white transition" href="#">
                Developers Guide
              </a>
              <a className="text-white/70 hover:text-white transition" href="#">
                Integration Docs
              </a>
            </nav>

            {/* Actions */}
            <div className="flex gap-2 sm:gap-4 items-center">
              <Button>Try Now!</Button>

              {/* Hamburger */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="md:hidden"
                aria-label="Open menu"
              >
                <MenuIcon className="w-5 h-5 sm:w-6 sm:h-6 opacity-80 hover:opacity-100 transition" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-screen w-72 z-50
        bg-black/60 backdrop-blur-xl
        border-l border-white/15
        rounded-l-2xl
        px-6 pt-6
        transform transition-transform duration-300 ease-out
        ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Close */}
        <button
          onClick={() => setIsMenuOpen(false)}
          className="text-white/70 hover:text-white text-xl mb-10"
          aria-label="Close menu"
        >
          ✕
        </button>

        {/* Mobile nav */}
        <nav className="flex flex-col gap-6 text-sm">
          <a className="text-white/80 hover:text-white transition" href="#">
            Features
          </a>
          <a className="text-white/80 hover:text-white transition" href="#">
            Developers Guide
          </a>
          <a className="text-white/80 hover:text-white transition" href="#">
            Integration Docs
          </a>
        </nav>
      </aside>
    </>
  );
};
