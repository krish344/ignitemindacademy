"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { InstagramIconFilled } from "@/components/ui/InstagramIcon";

const nav = [
  { href: "/naplan", label: "NAPLAN" },
  { href: "/test", label: "Mock Tests" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-14 sm:h-16 items-center justify-between gap-2">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="relative h-8 w-8 sm:h-10 sm:w-10">
              <Image
                src="/logo.png"
                alt={site.name}
                fill
                className="object-contain"
              />
            </div>
            <span className="text-sm sm:text-xl font-bold text-gray-900 truncate max-w-[120px] sm:max-w-none">
              {site.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-700 hover:text-orange-600 px-3 py-2 rounded-lg hover:bg-orange-50 transition-colors whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={site.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 text-white shadow-sm hover:shadow-md transition-shadow"
              aria-label="Follow us on Instagram"
            >
              <InstagramIconFilled className="w-5 h-5" />
            </a>
            <Link
              href="/book"
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full text-sm hover:shadow-lg transition-all whitespace-nowrap"
            >
              Book Free
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg border border-slate-200 hover:bg-slate-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-100">
            <nav className="flex flex-col gap-1">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-base font-medium text-slate-700 hover:text-orange-600 px-3 py-3 rounded-lg hover:bg-orange-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex gap-3 mt-4 pt-4 border-t border-slate-100">
                <a
                  href={site.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 text-center border border-slate-200 rounded-lg text-slate-700 font-medium"
                >
                  📸 Instagram
                </a>
                <Link
                  href="/book"
                  className="flex-1 py-3 text-center bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book Free
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
