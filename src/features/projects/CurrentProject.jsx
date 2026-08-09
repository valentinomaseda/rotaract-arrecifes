import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const FORM_VOTACION_URL = 'https://forms.gle/Wtm3uDqYNu33eSUB7';
const AUTOPLAY_INTERVAL = 5000;
const SLIDE_GAP = 24; // px entre cards
const CARD_RATIO = 0.82; // cada card ocupa el 82% del ancho del clip → 9% de peek en cada lado

const PROJECTS = [
  {
    badge: 'En progreso',
    title: 'Tu Huella, No Tu Colilla',
    description:
      'Instalación de 50 colilleros ecológicos en puntos estratégicos de Arrecifes. Buscamos reducir la contaminación, mejorar los espacios públicos y concientizar mediante códigos QR informativos.',
    stats: [
      { value: '50', label: 'Colilleros Eco', color: 'text-cranberry' },
      { value: 'Activo', label: 'Estado', color: 'text-emerald-600' },
      { value: 'QR', label: 'Ed. Ambiental', color: 'text-cranberry' },
    ],
    cta: {
      href: 'https://drive.google.com/file/d/1sWJZDwZ3C59xsntAB4VdBAK4M1R56G-Z/view?usp=sharing',
      label: 'Más información',
      ariaLabel: 'Saber más sobre Tu Huella, No Tu Colilla (abre en nueva pestaña)',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  },
  {
    badge: '¡Nuevo · 2026!',
    title: 'Ciclo de Capacitaciones',
    description:
      'Una vez al mes, en nuestra última reunión, traemos a un orador invitado para compartir su experiencia y conocimiento con toda la comunidad. ¿Qué temáticas te gustaría que abordemos? ¡Votá y ayudanos a definir los próximos encuentros!',
    stats: [
      { value: '1/mes', label: 'Frecuencia', color: 'text-cranberry' },
      { value: '🎤', label: 'Orador invitado', color: 'text-gray-700' },
      { value: 'Abierto', label: 'A todos', color: 'text-emerald-600' },
    ],
    cta: {
      href: FORM_VOTACION_URL,
      label: 'Votá las temáticas',
      ariaLabel: 'Votar temáticas del Ciclo de Capacitaciones (abre en nueva pestaña)',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
  },
  {
    badge: 'En progreso',
    title: 'Banco de Elementos Ortopédicos',
    description:
      'Proyecto destinado a fortalecer y renovar el banco de elementos ortopédicos de Rotary mediante la incorporación de sillas de ruedas, andadores, muletas, colchones antiescaras y otros elementos de apoyo, para facilitar el acceso a recursos esenciales a personas que los necesitan de manera temporal y promover su reutilización solidaria dentro de la comunidad.',
    stats: [
      { value: '25', label: 'Elementos actuales', color: 'text-cranberry' },
      { value: '🏥', label: 'Rotary Club', color: 'text-gray-700' },
      { value: 'Activo', label: 'Recaudación', color: 'text-emerald-600' },
    ],
    cta: {
      href: 'https://wa.me/5492478513553',
      label: 'Cómo colaborar',
      ariaLabel: 'Cómo colaborar con la renovación del banco de elementos ortopédicos',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
  },
];

/* ─── Card individual ─── */
const ProjectCard = ({ badge, title, description, stats, cta, active }) => (
  <div
    className={`flex flex-col h-full bg-gradient-to-b from-gray-50 via-white to-gray-50/50 rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-xl transition-all duration-500 ${
      active
        ? 'opacity-100 scale-100 shadow-xl'
        : 'opacity-40 scale-[0.97] shadow-md'
    }`}
    style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
    aria-hidden={!active}
  >
    <span className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full text-xs font-montserrat font-semibold tracking-widest uppercase bg-cranberry/10 text-cranberry border border-cranberry/20 mb-5">
      <span className="w-2 h-2 rounded-full bg-cranberry animate-pulse" aria-hidden="true" />
      {badge}
    </span>

    <h3 className="font-garet text-2xl md:text-3xl text-gray-900 leading-tight mb-4">{title}</h3>

    <p className="font-montserrat text-gray-600 leading-relaxed text-base md:text-lg mb-6 flex-grow">{description}</p>

    {stats && (
      <div className="grid grid-cols-3 gap-3 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm text-center">
            <span className={`block font-garet text-xl font-bold ${stat.color ?? 'text-cranberry'}`}>{stat.value}</span>
            <span className="text-xs font-montserrat text-gray-500">{stat.label}</span>
          </div>
        ))}
      </div>
    )}

    <div className="mt-auto">
      <a
        href={cta.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-cranberry text-white font-montserrat font-semibold hover:bg-cranberry-dark shadow-lg shadow-cranberry/25 hover:shadow-xl hover:shadow-cranberry/35 transition-all duration-300 group"
        aria-label={cta.ariaLabel}
        tabIndex={active ? 0 : -1}
      >
        {cta.icon}
        {cta.label}
        <svg className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
    </div>
  </div>
);

/* ─── Flecha de navegación ─── */
const NavArrow = ({ direction, onClick, label }) => (
  <button
    onClick={onClick}
    aria-label={label}
    className="flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-full border border-gray-200 bg-white shadow-md text-gray-600 hover:bg-cranberry hover:text-white hover:border-cranberry transition-all duration-300 focus-visible:outline-2 focus-visible:outline-cranberry"
  >
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={direction === 'prev' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
    </svg>
  </button>
);

/* ─── Componente raíz ─── */
export const CurrentProject = () => {
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.2 });
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const clipRef = useRef(null);
  const [containerW, setContainerW] = useState(0);
  const total = PROJECTS.length;

  // Medir el ancho del clip con ResizeObserver para calcular posición exacta del track
  useEffect(() => {
    if (!clipRef.current) return;
    const update = () => { if (clipRef.current) setContainerW(clipRef.current.offsetWidth); };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(clipRef.current);
    return () => ro.disconnect();
  }, []);

  // Cada card ocupa CARD_RATIO del clip → peek de (1-CARD_RATIO)/2 en cada lado
  const cardW = containerW > 0 ? containerW * CARD_RATIO : 0;
  const peekOffset = containerW > 0 ? (containerW - cardW) / 2 : 0;
  const translateX = peekOffset - current * (cardW + SLIDE_GAP);

  const goTo = useCallback((idx) => setCurrent(((idx % total) + total) % total), [total]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Autoplay
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(next, AUTOPLAY_INTERVAL);
    return () => clearTimeout(t);
  }, [current, paused, next]);

  // Swipe táctil
  const touchStartX = useRef(null);
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) delta < 0 ? next() : prev();
    touchStartX.current = null;
  };

  // Teclado
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [prev, next]);

  return (
    <section
      id="proyecto-actual"
      className="scroll-mt-20 relative bg-white py-24 md:py-32 overflow-hidden"
      aria-labelledby="current-project-title"
      aria-roledescription="carousel"
    >
      <div className="blob-decoration w-[500px] h-[500px] bg-cranberry/5 top-0 left-1/2 -translate-x-1/2" aria-hidden="true" />

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-12 px-6 lg:px-8 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        >
          <h2 id="current-project-title" className="font-garet text-4xl md:text-5xl text-gray-900 mb-4">
            Proyectos Actuales
          </h2>
          <p className="font-montserrat text-gray-500 text-lg max-w-xl mx-auto">
            Lo que estamos haciendo hoy para transformar Arrecifes.
          </p>
          <div className="h-px w-24 bg-cranberry/40 mx-auto mt-6 rounded-full" aria-hidden="true" />
        </div>

        {/* Carrusel */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          aria-live="polite"
          aria-atomic="true"
        >
          {/* Wrapper relativo para centrar las flechas sobre la card */}
          <div className="relative">
            {/* Flecha izquierda — fuera del overflow-hidden, centrada verticalmente */}
            <div className="absolute left-2 lg:left-3 top-1/2 -translate-y-1/2 z-20">
              <NavArrow direction="prev" onClick={prev} label="Proyecto anterior" />
            </div>

            {/* Clip: overflow-hidden corta el track; el peek se ve dentro del ancho del container */}
            <div
              ref={clipRef}
              className="overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-500"
                style={{
                  gap: `${SLIDE_GAP}px`,
                  transform: `translateX(${translateX}px)`,
                  transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                {PROJECTS.map((project, idx) => (
                  <div
                    key={project.title}
                    className="flex-shrink-0"
                    style={{ width: cardW > 0 ? `${cardW}px` : `${CARD_RATIO * 100}%` }}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`Proyecto ${idx + 1} de ${total}: ${project.title}`}
                  >
                    <ProjectCard {...project} active={idx === current} />
                  </div>
                ))}
              </div>
            </div>

            {/* Flecha derecha — fuera del overflow-hidden, centrada verticalmente */}
            <div className="absolute right-2 lg:right-3 top-1/2 -translate-y-1/2 z-20">
              <NavArrow direction="next" onClick={next} label="Proyecto siguiente" />
            </div>
          </div>

          {/* Barra de progreso — centrada bajo la card activa */}
          <div
            className="mt-3 h-0.5 bg-gray-100 overflow-hidden rounded-full mx-auto"
            style={{ width: cardW > 0 ? `${cardW}px` : `${CARD_RATIO * 100}%` }}
          >
            <div
              key={current}
              className="h-full bg-cranberry/60 rounded-full"
              style={{
                animation: `carouselProgress ${AUTOPLAY_INTERVAL}ms linear forwards`,
                animationPlayState: paused ? 'paused' : 'running',
              }}
            />
          </div>

          {/* Dots — centrados debajo del carrusel */}
          <div className="flex items-center justify-center gap-2 mt-5" role="tablist" aria-label="Proyectos">
            {PROJECTS.map((p, idx) => (
              <button
                key={p.title}
                role="tab"
                aria-selected={idx === current}
                aria-label={`Ir a ${p.title}`}
                onClick={() => goTo(idx)}
                className={`rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-cranberry ${
                  idx === current
                    ? 'w-8 h-3 bg-cranberry shadow-sm shadow-cranberry/40'
                    : 'w-3 h-3 bg-gray-300 hover:bg-cranberry/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px section-divider" aria-hidden="true" />
    </section>
  );
};