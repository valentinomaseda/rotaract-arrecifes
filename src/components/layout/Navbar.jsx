import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#', label: 'Inicio' },
    { href: '#about-us-title', label: 'Quiénes Somos' },
    { href: '#current-project-title', label: 'Proyectos' },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled ? 'navbar-glass' : 'bg-white border-b border-gray-100'
      }`}
      aria-label="Navegación principal"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-20">

          {/* Logo */}
          <div className="flex items-center">
            <a href="#" className="flex-shrink-0 flex items-center gap-3 group">
              <img
                className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
                src="/logo.png"
                alt="Rotaract Arrecifes"
              />
            </a>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {navLinks.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                className="relative px-4 py-2 text-sm font-medium text-gray-600 font-montserrat transition-colors duration-300 hover:text-cranberry group"
              >
                {label}
                {/* Underline animado */}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-cranberry rounded-full transition-all duration-300 group-hover:w-3/4" />
              </a>
            ))}
            <a
              href="#unete"
              className="ml-4 btn-cranberry text-white px-6 py-2.5 rounded-full text-sm font-semibold font-montserrat inline-flex items-center gap-2"
            >
              Colaborar
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2.5 rounded-xl text-gray-600 hover:text-cranberry hover:bg-cranberry/5 focus:outline-none transition-colors duration-200"
              aria-expanded={isOpen}
              aria-label="Abrir menú principal"
            >
              <div className="relative w-6 h-5">
                <span className={`absolute block h-0.5 w-6 bg-current rounded-full transition-all duration-300 ${isOpen ? 'top-2 rotate-45' : 'top-0'}`} />
                <span className={`absolute block h-0.5 bg-current rounded-full transition-all duration-300 top-2 ${isOpen ? 'w-0 opacity-0' : 'w-6 opacity-100'}`} />
                <span className={`absolute block h-0.5 w-6 bg-current rounded-full transition-all duration-300 ${isOpen ? 'top-2 -rotate-45' : 'top-4'}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ease-in-out ${
          isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
      >
        <div className="border-t border-gray-100 bg-white/95 backdrop-blur-md px-4 pt-3 pb-6 space-y-1">
          {navLinks.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 font-montserrat hover:bg-cranberry/5 hover:text-cranberry transition-all duration-200"
            >
              {label}
            </a>
          ))}
          <a
            href="#unete"
            onClick={() => setIsOpen(false)}
            className="block mt-3 px-4 py-3 text-center rounded-xl text-base font-semibold font-montserrat btn-cranberry text-white"
          >
            Colaborar
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
