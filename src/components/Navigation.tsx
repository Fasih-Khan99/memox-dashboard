'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Agents', href: '/agents' },
    { name: 'Calls', href: '/calls' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* --- MOBILE HEADER --- */}
      <header className="md:hidden bg-gray-900 text-white p-4 flex items-center justify-between sticky top-0 z-50 border-b border-gray-800">
        {/* 3-line Menu Button (Left) */}
        <button
          onClick={toggleMenu}
          className="p-2 hover:bg-gray-800 rounded-md transition-colors"
          aria-label="Open menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Center Heading */}
        <div className="font-bold text-lg tracking-tight">Memox Admin</div>

        {/* Empty div to maintain center alignment */}
        <div className="w-10"></div>
      </header>

      {/* --- SIDE MENU DRAWER (Mobile) & SIDEBAR (Desktop) --- */}
      <nav
        className={`
          fixed inset-y-0 left-0 z-[60] w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out p-6 border-r border-gray-800
          md:relative md:translate-x-0 md:flex md:flex-col
          ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
        `}
      >
        {/* Desktop Title / Mobile Close Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="font-bold text-xl text-blue-400">Memox Admin</div>
          <button onClick={toggleMenu} className="md:hidden p-1 hover:text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)} // Close drawer on link click
              className={`px-4 py-3 rounded-lg font-medium transition-all ${pathname === link.href
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                  : 'hover:bg-gray-800 text-gray-400 hover:text-white'
                }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] md:hidden"
          onClick={toggleMenu}
        />
      )}
    </>
  );
}