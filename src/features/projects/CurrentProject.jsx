import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const FORM_VOTACION_URL = 'https://forms.gle/Wtm3uDqYNu33eSUB7';
const AUTOPLAY_INTERVAL = 8000;

const PROJECTS = [
  {
    badge: 'En progreso',
    title: 'Tu Huella, No Tu Colilla',
    description:
      'Instalación de 50 colilleros ecológicos en puntos estratégicos de Arrecifes. Buscamos reducir la contaminación y concientizar mediante códigos QR.',
    stats: [
      { value: '50', label: 'Colilleros' },
      { value: 'Activo', label: 'Estado' },
      { value: 'QR', label: 'Educación' },
    ],
    cta: {
      href: 'https://drive.google.com/file/d/1sWJZDwZ3C59xsntAB4VdBAK4M1R56G-Z/view',
      label: 'Conocé más',
      ariaLabel: 'Saber más sobre Tu Huella, No Tu Colilla',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  },
  {
    badge: '¡Nuevo · 2026!',
    title: 'Ciclo de Capacitaciones',
    description:
      'Una vez al mes traemos a un orador invitado para compartir su experiencia. ¿Qué temáticas te gustaría que abordemos? ¡Ayudanos a definirlo!',
    stats: [
      { value: '1/mes', label: 'Frecuencia' },
      { value: 'Múltiple', label: 'Oradores' },
      { value: 'Abierto', label: 'Público' },
    ],
    cta: {
      href: FORM_VOTACION_URL,
      label: 'Votá las temáticas',
      ariaLabel: 'Votar temáticas del Ciclo de Capacitaciones',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
  },
  {
    badge: 'En progreso',
    title: 'Banco Ortopédico',
    description:
      'Fortalecemos el banco de elementos de Rotary (sillas de ruedas, andadores) para facilitar recursos a personas que los necesitan temporalmente.',
    stats: [
      { value: '25+', label: 'Elementos' },
      { value: 'Rotary', label: 'Sede' },
      { value: 'Activa', label: 'Campaña' },
    ],
    cta: {
      href: 'https://wa.me/5492478513553',
      label: 'Sumate a colaborar',
      ariaLabel: 'Cómo colaborar con la renovación del banco ortopédico',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
  },
];

/* ─── Card Individual ─── */
const ProjectCard = ({ badge, title, description, stats, cta, active, autoplayKey, autoplayDuration, paused }) => (
  <div
    className={`relative flex flex-col h-full bg-white/70 backdrop-blur-2xl rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden border transition-all duration-700 ${active
        ? 'border-white/80 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] opacity-100 scale-100'
        : 'border-white/20 shadow-none opacity-40 scale-[0.95]'
      }`}
    style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
    aria-hidden={!active}
  >
    <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100/50">
      {active && (
        <div
          key={autoplayKey}
          className="h-full bg-gradient-to-r from-cranberry to-cranberry-light rounded-r-full"
          style={{
            animation: `carouselProgress ${autoplayDuration}ms linear forwards`,
            animationPlayState: paused ? 'paused' : 'running',
          }}
        />
      )}
    </div>

    {/* Padding reducido en mobile (p-6) para optimizar el espacio útil */}
    <div className="flex flex-col flex-1 p-6 sm:p-10 md:p-12">
      <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6">
        <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cranberry opacity-40"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-cranberry"></span>
        </span>
        <span className="text-[10px] sm:text-[11px] font-montserrat font-bold tracking-widest uppercase text-gray-500 line-clamp-1">
          {badge}
        </span>
      </div>

      <h3 className="font-garet text-xl sm:text-3xl md:text-4xl text-gray-900 tracking-tight leading-[1.15] mb-3 sm:mb-5">
        {title}
      </h3>

      <p className="font-montserrat text-gray-500 leading-relaxed text-sm sm:text-base mb-6 sm:mb-8 flex-grow">
        {description}
      </p>

      {/* Grid en lugar de flex para asegurar que las columnas no colapsen en pantallas chicas */}
      {stats && (
        <div className="grid grid-cols-3 divide-x divide-gray-100/80 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-gray-100/80">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center sm:items-start px-2 sm:px-4 first:pl-0 last:pr-0 text-center sm:text-left">
              <span className="font-garet text-lg sm:text-2xl font-bold text-gray-900">{stat.value}</span>
              <span className="text-[9px] sm:text-[11px] md:text-xs font-montserrat text-gray-400 font-medium tracking-wide uppercase mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-auto">
        <a
          href={cta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full sm:w-auto gap-3 px-6 sm:px-8 py-3.5 rounded-2xl bg-gray-900 text-white font-montserrat font-medium text-sm sm:text-base hover:bg-cranberry shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_25px_rgba(200,20,50,0.25)] transition-all duration-300 group"
          aria-label={cta.ariaLabel}
          tabIndex={active ? 0 : -1}
        >
          {cta.icon}
          {cta.label}
          <svg className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  </div>
);

const NavArrow = ({ direction, onClick, label }) => (
  <button
    onClick={onClick}
    aria-label={label}
    className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/60 backdrop-blur-md border border-white shadow-[0_8px_20px_rgba(0,0,0,0.04)] text-gray-700 hover:bg-white hover:text-cranberry hover:scale-105 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-cranberry z-30"
  >
    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={direction === 'prev' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
    </svg>
  </button>
);

export const CurrentProject = () => {
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.2 });
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const clipRef = useRef(null);

  // Variables de estado dinámicas
  const [containerW, setContainerW] = useState(0);
  const [layoutConfig, setLayoutConfig] = useState({ ratio: 0.82, gap: 24 });

  const total = PROJECTS.length;

  useEffect(() => {
    if (!clipRef.current) return;
    const update = () => {
      if (clipRef.current) {
        const width = clipRef.current.offsetWidth;
        setContainerW(width);
        // Si es mobile (<768px), la tarjeta ocupa el 90% y el gap es menor.
        setLayoutConfig(width < 768 ? { ratio: 0.90, gap: 16 } : { ratio: 0.85, gap: 32 });
      }
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(clipRef.current);
    return () => ro.disconnect();
  }, []);

  const cardW = containerW > 0 ? containerW * layoutConfig.ratio : 0;
  const peekOffset = containerW > 0 ? (containerW - cardW) / 2 : 0;
  const translateX = peekOffset - current * (cardW + layoutConfig.gap);

  const goTo = useCallback((idx) => setCurrent(((idx % total) + total) % total), [total]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(next, AUTOPLAY_INTERVAL);
    return () => clearTimeout(t);
  }, [current, paused, next]);

  const touchStartX = useRef(null);
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) delta < 0 ? next() : prev();
    touchStartX.current = null;
  };

  return (
    <section
      id="proyecto-actual"
      className="scroll-mt-20 relative bg-gray-50/50 py-16 md:py-32 overflow-hidden"
      aria-labelledby="current-project-title"
    >
      <div className="absolute top-0 left-1/4 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-cranberry/5 rounded-full mix-blend-multiply filter blur-[80px] md:blur-[100px] opacity-70 animate-pulse" aria-hidden="true" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div
          ref={headerRef}
          className={`text-center mb-10 md:mb-16 px-6 lg:px-8 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <span className="text-cranberry font-montserrat font-bold tracking-widest uppercase text-xs md:text-sm mb-2 md:mb-3 block">Iniciativas</span>
          <h2 id="current-project-title" className="font-garet text-3xl md:text-5xl lg:text-6xl text-gray-900 mb-4 md:mb-6 tracking-tight">
            Proyectos Actuales
          </h2>
          <p className="font-montserrat text-gray-500 text-base md:text-xl max-w-2xl mx-auto leading-relaxed px-4">
            Lo que estamos construyendo hoy para transformar Arrecifes mañana.
          </p>
        </div>

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <div className="relative group">
            <div className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <NavArrow direction="prev" onClick={prev} label="Proyecto anterior" />
            </div>
            <div className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <NavArrow direction="next" onClick={next} label="Proyecto siguiente" />
            </div>

            <div
              ref={clipRef}
              className="overflow-hidden pb-4 md:pb-8"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-700"
                style={{
                  gap: `${layoutConfig.gap}px`,
                  transform: `translateX(${translateX}px)`,
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {PROJECTS.map((project, idx) => (
                  <div
                    key={project.title}
                    className="flex-shrink-0"
                    style={{ width: cardW > 0 ? `${cardW}px` : `${layoutConfig.ratio * 100}%` }}
                  >
                    <ProjectCard
                      {...project}
                      active={idx === current}
                      autoplayKey={current}
                      autoplayDuration={AUTOPLAY_INTERVAL}
                      paused={paused}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 md:gap-3 mt-2 md:mt-4">
            {PROJECTS.map((p, idx) => (
              <button
                key={p.title}
                onClick={() => goTo(idx)}
                aria-label={`Ir a ${p.title}`}
                className={`relative h-1.5 md:h-2 transition-all duration-500 rounded-full ${idx === current ? 'w-8 md:w-10 bg-cranberry' : 'w-1.5 md:w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};