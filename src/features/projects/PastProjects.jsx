import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProjectCard } from './ProjectCard';
import { projectsData } from '../../data/projectsData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

// Ícono flecha izquierda
const ChevronLeft = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
  </svg>
);

// Ícono flecha derecha
const ChevronRight = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
  </svg>
);

export const PastProjects = () => {
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.2 });
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Actualiza el estado de los botones según la posición del scroll
  const updateScrollButtons = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener('scroll', updateScrollButtons, { passive: true });
    window.addEventListener('resize', updateScrollButtons);
    return () => {
      el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, []);

  // Desplaza el carrusel según la dirección
  const scroll = (direction) => {
    const el = trackRef.current;
    if (!el) return;
    // Calcula el ancho de una tarjeta (primer hijo)
    const cardWidth = el.firstElementChild?.offsetWidth ?? 320;
    const gap = 24; // gap-6 = 24px
    const scrollAmount = (cardWidth + gap) * 1.2;
    el.scrollBy({ left: direction === 'right' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
  };

  return (
    <section
      id="proyectos"
      className="relative bg-gray-50 py-24 md:py-32 overflow-hidden"
      aria-labelledby="past-projects-title"
    >
      {/* Decorative blobs */}
      <div className="blob-decoration w-[400px] h-[400px] bg-cranberry/4 -top-20 -left-20" aria-hidden="true" />
      <div className="blob-decoration w-[300px] h-[300px] bg-cranberry/3 bottom-0 right-0" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-12 px-6 lg:px-8">

        {/* Cabecera */}
        <div
          ref={headerRef}
          className={`flex flex-col md:flex-row justify-between items-start md:items-end gap-8 transition-all duration-800 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        >
          <div className="max-w-2xl space-y-4">
            <span className="inline-block text-xs font-montserrat font-semibold tracking-[0.2em] uppercase text-cranberry">
              Lo que hemos logrado
            </span>
            <h2 id="past-projects-title" className="text-4xl md:text-5xl font-garet text-gray-900">
              Nuestros Proyectos
            </h2>
            <p className="text-lg text-gray-500 font-montserrat leading-relaxed">
              Conoce algunas de las iniciativas que hemos llevado a cabo para generar un impacto positivo en nuestra ciudad.
            </p>
          </div>

          {/* Decorative counter */}
          <div className="flex-shrink-0 bg-white rounded-2xl px-8 py-5 border border-gray-100 shadow-sm text-center">
            <span className="block font-garet text-4xl text-cranberry font-bold">{projectsData.length}</span>
            <span className="block font-montserrat text-xs text-gray-500 uppercase tracking-wider mt-1">Proyectos</span>
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider" aria-hidden="true" />

        {/* ── Carrusel ── */}
        <div className="relative">
          {/* Botón izquierda */}
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Proyectos anteriores"
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-11 h-11 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-700 cursor-pointer transition-all duration-300 hover:border-cranberry hover:text-cranberry hover:shadow-lg ${
              canScrollLeft ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
            }`}
          >
            <ChevronLeft />
          </button>

          {/* Wrapper que corta el desbordamiento vertical del pb-4 del track */}
          <div className="overflow-hidden">
            {/* Track del carrusel */}
            <div
              ref={trackRef}
              className="flex gap-6 overflow-x-auto overflow-y-hidden pb-4 scroll-smooth carousel-track"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {projectsData.map((project, index) => (
                <div
                  key={project.id}
                  className="flex-none w-[320px] md:w-[360px]"
                >
                  <ProjectCard project={project} index={index} />
                </div>
              ))}
            </div>
          </div>

          {/* Botón derecha */}
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Proyectos siguientes"
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-11 h-11 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-700 cursor-pointer transition-all duration-300 hover:border-cranberry hover:text-cranberry hover:shadow-lg ${
              canScrollRight ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
            }`}
          >
            <ChevronRight />
          </button>

          {/* Fade gradients en los bordes */}
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-4 w-12 bg-gradient-to-r from-gray-50 to-transparent z-10 transition-opacity duration-300"
            style={{ opacity: canScrollLeft ? 1 : 0 }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-gray-50 to-transparent z-10 transition-opacity duration-300"
            style={{ opacity: canScrollRight ? 1 : 0 }}
            aria-hidden="true"
          />
        </div>

        {/* ── Botón Ver más ── */}
        <div className="flex justify-center pt-4">
          <Link
            to="/proyectos"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white border border-gray-200 text-gray-700 font-montserrat font-semibold text-base shadow-sm hover:border-cranberry hover:text-cranberry hover:shadow-md hover:bg-cranberry/3 transition-all duration-300"
          >
            Ver todos los proyectos
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-cranberry/10 text-cranberry group-hover:bg-cranberry group-hover:text-white transition-all duration-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
};