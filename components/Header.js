import React, { useState } from 'react';
import DarkModeToggle from './DarkModeToggle';

const navLinks = [
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="w-full bg-gradient-to-r from-purple-700 to-blue-700 shadow-lg sticky top-0 z-30 animate-fade-in-down">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <a href="/" className="inline-flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-10 h-10 bg-white bg-opacity-20 rounded-xl">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2v2H3V3zm4 0h2v2H7V3zm4 0h2v2h-2V3zm4 0h2v2h-2V3zm4 0h2v2h-2V3zM3 7h2v2H3V7zm4 0h2v2H7V7zm4 0h2v2h-2V7zm4 0h2v2h-2V7zm4 0h2v2h-2V7zM3 11h2v2H3v-2zm4 0h2v2H7v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zM3 15h2v2H3v-2zm4 0h2v2H7v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zM3 19h2v2H3v-2zm4 0h2v2H7v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z"/></svg>
            </span>
            <span className="text-2xl font-bold text-white tracking-tight drop-shadow-lg">QR SaaS</span>
          </a>
        </div>
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map(link => (
            <a key={link.name} href={link.href} className="text-white text-base font-medium opacity-80 hover:opacity-100 hover:underline transition-opacity duration-200">
              {link.name}
            </a>
          ))}
          <DarkModeToggle />
        </nav>
  {/* Mobile menu button and dark mode toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <DarkModeToggle />
          <button className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/10 transition" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="absolute top-16 left-0 w-full bg-gradient-to-r from-purple-700 to-blue-700 shadow-lg flex flex-col items-center py-4 gap-4 md:hidden animate-fade-in-down">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="text-white text-lg font-medium opacity-90 hover:opacity-100 hover:underline transition-opacity duration-200" onClick={() => setMenuOpen(false)}>
                {link.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
