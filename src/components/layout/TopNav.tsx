'use client';

import { useState } from 'react';

export default function TopNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <a href="/" className="text-lg sm:text-2xl font-bold text-orange-600 truncate pr-3">
            IgniteMind Academy
          </a>

          <button
            className="md:hidden px-3 py-2 rounded-md border border-orange-200 text-orange-600"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            ☰
          </button>

          <div className="hidden md:flex items-center space-x-4">
            <a href="/resources" className="text-gray-600 hover:text-orange-600 px-3 py-2 rounded-md font-medium">Resources</a>
            <a href="/dashboard" className="text-gray-600 hover:text-orange-600 px-3 py-2 rounded-md font-medium">Dashboard</a>
            <a href="/admin" className="text-gray-600 hover:text-orange-600 px-3 py-2 rounded-md font-medium">Admin</a>
          </div>
        </div>

        {open && (
          <div className="md:hidden pb-3 space-y-1">
            <a href="/resources" className="block text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md font-medium">Resources</a>
            <a href="/dashboard" className="block text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md font-medium">Dashboard</a>
            <a href="/admin" className="block text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md font-medium">Admin</a>
          </div>
        )}
      </div>
    </nav>
  );
}
