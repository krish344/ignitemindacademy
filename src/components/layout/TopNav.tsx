'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function TopNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2 pr-3">
            <div className="relative h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0">
              <Image src="/logo.png" alt="IgniteMind Academy" fill className="object-contain" />
            </div>
            <span className="text-base sm:text-xl font-bold text-orange-600 truncate">IgniteMind Academy</span>
          </Link>

          <button
            className="md:hidden px-3 py-2 rounded-md border border-orange-200 text-orange-600"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            ☰
          </button>

          <div className="hidden md:flex items-center gap-1">
            <Link href="/naplan" className="text-gray-600 hover:text-orange-600 px-3 py-2 rounded-md font-medium">NAPLAN</Link>
            <Link href="/test" className="text-gray-600 hover:text-orange-600 px-3 py-2 rounded-md font-medium">Tests</Link>
            <Link href="/pricing" className="text-gray-600 hover:text-orange-600 px-3 py-2 rounded-md font-medium">Pricing</Link>
            <Link href="/about" className="text-gray-600 hover:text-orange-600 px-3 py-2 rounded-md font-medium">About</Link>
            <Link href="/contact" className="text-gray-600 hover:text-orange-600 px-3 py-2 rounded-md font-medium">Contact</Link>
          </div>
        </div>

        {open && (
          <div className="md:hidden pb-3 space-y-1">
            <Link href="/naplan" className="block text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md font-medium">NAPLAN</Link>
            <Link href="/test" className="block text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md font-medium">Practice Tests</Link>
            <Link href="/pricing" className="block text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md font-medium">Pricing</Link>
            <Link href="/about" className="block text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md font-medium">About</Link>
            <Link href="/contact" className="block text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md font-medium">Contact</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
