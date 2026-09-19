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
      <span
        className="font-garet text-3xl md:text-4xl font-bold leading-none tabular-nums"
        style={{
          background: 'linear-gradient(90deg, #d41367, #ff6eb0)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {prefix}{count}{suffix}
      </span>
      <span className="font-montserrat text-sm text-white/40 mt-1">{label}</span>
    </div>
  );
};

export const HeroSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const timer = setTimeout(() => {
      const els = section.querySelectorAll('.animate-hidden, .animate-hidden-left, .animate-hidden-right, .animate-hidden-scale');
      els.forEach((el) => el.classList.add('animate-visible'));
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden text-white"
      aria-label="Introducción"
      style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #12071a 40%, #0f0a1a 70%, #080810 100%)' }}
    >
      {/* ── Blobs de luz ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* Blob cranberry — arriba izquierda */}
        <div
          className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #d41367 0%, transparent 65%)', filter: 'blur(100px)' }}
        />
        {/* Blob magenta — arriba derecha */}
        <div
          className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #e91e8c 0%, transparent 65%)', filter: 'blur(100px)' }}
        />
        {/* Blob violeta — abajo centro */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(ellipse, #6d28d9 0%, transparent 70%)', filter: 'blur(120px)' }}
        />
        {/* Grid sutil */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-24 lg:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

        {/* ── Columna de Texto ── */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:col-span-7 order-1">


          {/* Título */}
          <h1
            className="animate-hidden font-garet text-5xl md:text-6xl lg:text-[4.5rem] leading-[1.08] tracking-tight mb-6"
            style={{ transitionDelay: '120ms' }}
          >
            Impulsando{' '}
            <span style={{
              background: 'linear-gradient(90deg, #d41367, #ff6eb0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              cambios positivos
            </span>{' '}
            en Arrecifes.
          </h1>

          {/* Descripción */}
          <p
            className="animate-hidden font-montserrat text-lg md:text-xl text-white/55 max-w-xl mb-10 leading-relaxed"
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
              className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full font-montserrat font-semibold text-base text-white transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #d41367 0%, #e91e8c 100%)',
                boxShadow: '0 4px 24px rgba(212,19,103,0.45)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 4px 40px rgba(212,19,103,0.7)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 24px rgba(212,19,103,0.45)'; }}
            >
              Súmate al equipo
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#proyecto-actual"
              className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full font-montserrat font-medium text-base text-white/70 transition-all duration-300 hover:text-white"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(212,19,103,0.15)';
                e.currentTarget.style.borderColor = 'rgba(212,19,103,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Proyectos en curso
            </a>
          </div>

          {/* Stats con animación de conteo */}
          <div
            className="animate-hidden w-full"
            style={{ transitionDelay: '480ms' }}
          >
            <div
              className="h-px w-full mb-8"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(212,19,103,0.3), rgba(255,255,255,0.06), rgba(212,19,103,0.3), transparent)' }}
              aria-hidden="true"
            />
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
            {/* Glow detrás de la imagen */}
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-[2.5rem] opacity-50 blur-2xl -z-10"
              style={{ background: 'radial-gradient(ellipse, rgba(212,19,103,0.4) 0%, transparent 70%)' }}
            />
            {/* Decorative ring */}
            <div
              className="absolute -inset-4 rounded-[2.5rem] z-0"
              style={{ border: '1px solid rgba(212,19,103,0.20)' }}
              aria-hidden="true"
            />
            {/* Decorative dot grid */}
            <div
              className="absolute -bottom-6 -left-6 w-32 h-32 z-0 opacity-40"
              aria-hidden="true"
              style={{
                backgroundImage: 'radial-gradient(circle, #d41367 1.5px, transparent 1.5px)',
                backgroundSize: '12px 12px',
              }}
            />

            {/* Image container */}
            <div className="animate-float relative z-10 w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl"
              style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 60px rgba(212,19,103,0.15)' }}
            >
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
              <div className="absolute inset-0 bg-gradient-to-t from-cranberry/30 via-transparent to-transparent rounded-3xl" />
              {/* Ring overlay */}
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl" />
            </div>
          </div>
        </div>

      </div>

      {/* Bottom gradient fade — transición hacia la siguiente sección */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(10,10,15,0.6))' }}
      />
    </section>
  );
};