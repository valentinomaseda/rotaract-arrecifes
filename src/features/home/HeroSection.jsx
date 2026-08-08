import React, { useEffect, useRef } from 'react';
import { useCountUp } from '../../hooks/useCountUp';

const heroImageUrl = '/hero-image.jpeg';

// Stat con animación de conteo
const AnimatedStat = ({ prefix, value, suffix, label, delay }) => {
  const [ref, count] = useCountUp(value, 1600);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center lg:items-start"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="font-garet text-3xl md:text-4xl text-cranberry font-bold leading-none tabular-nums">
        {prefix}{count}{suffix}
      </span>
      <span className="font-montserrat text-sm text-gray-500 mt-1">{label}</span>
    </div>
  );
};

export const HeroSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Pequeño timeout para que el navegador pinte primero y la animación sea visible
    const timer = setTimeout(() => {
      const els = section.querySelectorAll('.animate-hidden, .animate-hidden-left, .animate-hidden-right, .animate-hidden-scale');
      els.forEach((el) => el.classList.add('animate-visible'));
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden"
      aria-label="Introducción"
    >
      {/* Decorative blobs */}
      <div
        className="blob-decoration w-[600px] h-[600px] bg-cranberry/5 -top-40 -left-40"
        aria-hidden="true"
      />
      <div
        className="blob-decoration w-[400px] h-[400px] bg-cranberry/3 top-20 -right-20"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-28 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        {/* ── Columna de Texto ── */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:col-span-7 order-1">

          {/* Badge */}
          <span
            className="animate-hidden inline-flex items-center gap-2 rounded-full bg-cranberry/10 px-4 py-1.5 text-sm font-montserrat font-semibold text-cranberry ring-1 ring-inset ring-cranberry/20 mb-6"
            style={{ transitionDelay: '0ms' }}
          >
            <span className="w-2 h-2 rounded-full bg-cranberry animate-pulse-dot" aria-hidden="true" />
            Rotaract Club Arrecifes
          </span>

          {/* Título */}
          <h1
            className="animate-hidden font-garet text-5xl md:text-6xl lg:text-[4.5rem] text-gray-900 leading-[1.08] tracking-tight mb-6"
            style={{ transitionDelay: '120ms' }}
          >
            Impulsando{' '}
            <span className="text-gradient-animated">
              cambios positivos
            </span>{' '}
            en Arrecifes.
          </h1>

          {/* Descripción */}
          <p
            className="animate-hidden font-montserrat text-lg md:text-xl text-gray-500 max-w-xl mb-10 leading-relaxed"
            style={{ transitionDelay: '240ms' }}
          >
            Somos jóvenes líderes que transforman ideas en acciones. Un espacio para crecer profesionalmente, hacer amigos y servir a nuestra comunidad.
          </p>

          {/* CTAs */}
          <div
            className="animate-hidden flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-14"
            style={{ transitionDelay: '360ms' }}
          >
            <a
              href="#contacto"
              className="btn-cranberry inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full text-white font-montserrat font-semibold text-base"
            >
              Súmate al equipo
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#proyectos"
              className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full bg-gray-50 text-gray-700 font-montserrat font-medium text-base border border-gray-200 hover:border-cranberry hover:text-cranberry hover:bg-cranberry/5 transition-all duration-300"
            >
              Ver Proyectos
            </a>
          </div>

          {/* Stats con animación de conteo */}
          <div
            className="animate-hidden w-full"
            style={{ transitionDelay: '480ms' }}
          >
            <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-8" aria-hidden="true" />
            <div className="flex justify-center lg:justify-start gap-10 md:gap-16">
              <AnimatedStat prefix="+" value={10} suffix="" label="Miembros activos" delay={0} />
              <AnimatedStat prefix="+" value={10} suffix="" label="Proyectos realizados" delay={100} />
              <AnimatedStat prefix="" value={5} suffix="+" label="Años de impacto" delay={200} />
            </div>
          </div>
        </div>

        {/* ── Columna de Imagen ── */}
        <div className="lg:col-span-5 order-2 flex justify-center lg:justify-end">
          <div
            className="animate-hidden-right relative w-full max-w-md lg:max-w-none"
            style={{ transitionDelay: '150ms' }}
          >
            {/* Decorative ring */}
            <div
              className="absolute -inset-4 rounded-[2.5rem] border-2 border-cranberry/15 z-0"
              aria-hidden="true"
            />
            {/* Decorative dot grid */}
            <div
              className="absolute -bottom-6 -left-6 w-32 h-32 z-0 opacity-60"
              aria-hidden="true"
              style={{
                backgroundImage: 'radial-gradient(circle, #d41367 1.5px, transparent 1.5px)',
                backgroundSize: '12px 12px',
              }}
            />

            {/* Image container */}
            <div className="animate-float relative z-10 w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={heroImageUrl}
                alt="Jóvenes de Rotaract Arrecifes trabajando en un proyecto comunitario"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                loading="eager"
                fetchpriority="high"
                decoding="sync"
                width="600"
                height="750"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-cranberry/20 via-transparent to-transparent rounded-3xl" />
              {/* Ring overlay */}
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl" />
            </div>
          </div>
        </div>

      </div>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px section-divider" aria-hidden="true" />
    </section>
  );
};