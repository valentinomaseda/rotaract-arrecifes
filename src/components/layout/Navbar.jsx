import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <a href="#" className="flex-shrink-0 flex items-center gap-3">
              <img 
                className="h-10 w-auto rounded-full" 
                src="https://placehold.co/100x100/d41367/ffffff?text=Logo" 
                alt="Logo ONG" 
              />
              <span className="font-heading font-bold text-xl text-gray-900">ONG Arrecifes</span>
            </a>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-8">
            <a href="#" className="text-gray-600 hover:text-cranberry px-3 py-2 text-sm font-medium transition-colors font-body">Inicio</a>
            <a href="#about-us-title" className="text-gray-600 hover:text-cranberry px-3 py-2 text-sm font-medium transition-colors font-body">Quiénes Somos</a>
            <a href="#current-project-title" className="text-gray-600 hover:text-cranberry px-3 py-2 text-sm font-medium transition-colors font-body">Proyectos</a>
            <a 
              href="#unete" 
              className="bg-cranberry text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-opacity-90 transition-all shadow-sm font-body"
            >
              Colaborar
            </a>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-cranberry hover:bg-gray-50 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú principal</span>
              {/* Icon when menu is closed */}
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, toggle classes based on menu state. */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 pt-2 pb-6 space-y-1 sm:px-6">
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-cranberry">Inicio</a>
            <a href="#about-us-title" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-cranberry">Quiénes Somos</a>
            <a href="#current-project-title" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-cranberry">Proyectos</a>
            <a href="#unete" className="block px-3 py-2 mt-4 text-center rounded-full text-base font-medium bg-cranberry text-white hover:bg-opacity-90">Colaborar</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
