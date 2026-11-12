import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useSwipe } from '../../hooks/useSwipe';
import { getUpcomingCapacitacion, getPastCapacitaciones } from '../../data/capacitacionesData';

const AUTOPLAY_INTERVAL = 8000;

const upcomingCap = getUpcomingCapacitacion();
const pastCaps = getPastCapacitaciones();

const CAPACITACIONES_SLIDE = upcomingCap
  ? {
      badge: 'Próxima Capacitación',
      category: 'Desarrollo Profesional',
      tabLabel: 'Capacitaciones',
      accent: {
        iconBg: 'from-cranberry via-pink-600 to-purple-700',
        pillBg: 'bg-cranberry/10 text-cranberry border-cranberry/25',
        cardBg: 'from-white via-[#FFF9FC] to-[#FCEEF5]/70',
        cardBorder: 'border-cranberry/20',
        statBg: 'bg-cranberry/[0.04] border-cranberry/15 hover:bg-cranberry/[0.08]',
        statBar: 'bg-cranberry',
        statValueText: 'text-cranberry-dark',
        btnClass: 'bg-cranberry hover:bg-cranberry-dark shadow-[0_8px_20px_rgba(212,19,103,0.28)]',
        numberText: 'text-cranberry/15',
        glow: 'rgba(212, 19, 103, 0.16)',
      },
      projectIcon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: `Ciclo de Capacitaciones: ${upcomingCap.topic}`,
      description: upcomingCap.description.split('\n\n')[0],
      stats: [
        { value: `Ed. #${upcomingCap.edition}`, label: 'Encuentro' },
        { value: `${upcomingCap.time} hs`, label: 'Horario' },
        { value: 'Virtual', label: 'Modalidad' },
      ],
      cta: {
        href: upcomingCap.registrationLink || '/capacitaciones',
        internal: !upcomingCap.registrationLink,
        label: upcomingCap.registrationLink ? '¡Inscribite acá!' : 'Ver detalles',
        ariaLabel: `Ver detalles de la capacitación ${upcomingCap.topic}`,
        note: 'Abierto a toda la comunidad',
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        ),
      },
    }
  : {
      badge: 'Ciclo en marcha',
      category: 'Desarrollo Profesional',
      tabLabel: 'Capacitaciones',
      accent: {
        iconBg: 'from-cranberry via-pink-600 to-purple-700',
        pillBg: 'bg-cranberry/10 text-cranberry border-cranberry/25',
        cardBg: 'from-white via-[#FFF9FC] to-[#FCEEF5]/70',
        cardBorder: 'border-cranberry/20',
        statBg: 'bg-cranberry/[0.04] border-cranberry/15 hover:bg-cranberry/[0.08]',
        statBar: 'bg-cranberry',
        statValueText: 'text-cranberry-dark',
        btnClass: 'bg-cranberry hover:bg-cranberry-dark shadow-[0_8px_20px_rgba(212,19,103,0.28)]',
        numberText: 'text-cranberry/15',
        glow: 'rgba(212, 19, 103, 0.16)',
      },
      projectIcon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'Ciclo de Capacitaciones Abiertas',
      description:
        'Encuentros virtuales mensuales gratuitos con referentes e invitados especiales sobre finanzas, comunicación y liderazgo. ¡Repasá los resúmenes y aprendizajes de las ediciones anteriores!',
      stats: [
        { value: `${pastCaps.length}`, label: 'Ediciones' },
        { value: 'Mensual', label: 'Frecuencia' },
        { value: 'Gratuito', label: 'Acceso' },
      ],
      cta: {
        href: '/capacitaciones',
        internal: true,
        label: 'Ver charlas y resúmenes',
        ariaLabel: 'Ir al Ciclo de Capacitaciones',
        note: 'Material y grabaciones disponibles',
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        ),
      },
    };

const PROJECTS = [
  {
    badge: 'En progreso',
    category: 'Medio Ambiente',
    tabLabel: 'Medio Ambiente',
    accent: {
      iconBg: 'from-emerald-600 via-teal-600 to-cyan-700',
      pillBg: 'bg-emerald-500/12 text-emerald-800 border-emerald-500/25',
      cardBg: 'from-white via-[#F6FDF9] to-[#EBF9F2]/80',
      cardBorder: 'border-emerald-500/25',
      statBg: 'bg-emerald-600/[0.05] border-emerald-600/15 hover:bg-emerald-600/[0.09]',
      statBar: 'bg-emerald-600',
      statValueText: 'text-emerald-900',
      btnClass: 'bg-emerald-600 hover:bg-emerald-700 shadow-[0_8px_20px_rgba(5,150,105,0.28)]',
      numberText: 'text-emerald-600/15',
      glow: 'rgba(16, 185, 129, 0.16)',
    },
    projectIcon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Tu Huella, No Tu Colilla',
    description:
      'Instalación de 50 colilleros ecológicos en puntos estratégicos de Arrecifes. Buscamos reducir la contaminación y concientizar mediante códigos QR.',
    stats: [
      { value: '50', label: 'Colilleros' },
      { value: 'Activo', label: 'Estado' },
      { value: 'Medio Ambiente', label: 'Área' },
    ],
    cta: {
      href: 'https://drive.google.com/file/d/1sWJZDwZ3C59xsntAB4VdBAK4M1R56G-Z/view',
      label: 'Conocé más del proyecto',
      ariaLabel: 'Saber más sobre Tu Huella, No Tu Colilla',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  },
  CAPACITACIONES_SLIDE,
  {
    badge: 'En progreso',
    category: 'Salud Comunitaria',
    tabLabel: 'Hospital Municipal',
    accent: {
      iconBg: 'from-rose-600 via-cranberry to-pink-700',
      pillBg: 'bg-rose-500/12 text-cranberry border-cranberry/25',
      cardBg: 'from-white via-[#FFF8FA] to-[#FDECF2]/80',
      cardBorder: 'border-cranberry/25',
      statBg: 'bg-rose-500/[0.05] border-cranberry/15 hover:bg-rose-500/[0.09]',
      statBar: 'bg-cranberry',
      statValueText: 'text-cranberry-dark',
      btnClass: 'bg-cranberry hover:bg-cranberry-dark shadow-[0_8px_20px_rgba(212,19,103,0.28)]',
      numberText: 'text-cranberry/15',
      glow: 'rgba(212, 19, 103, 0.16)',
    },
    projectIcon: (
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Donación al Hospital Municipal',
    description:
      'Estamos trabajando para donar una cama eléctrica de tres movimientos para el sector de cardiología del Hospital Municipal Santa Francisca Romana.',
    stats: [
      { value: '3 Mov.', label: 'Cama Eléctrica' },
      { value: 'Cardiología', label: 'Sector' },
      { value: 'Activo', label: 'Estado' },
    ],
    footerInfo: {
      title: 'Hospital Municipal Santa Francisca Romana',
      subtitle: 'Equipamiento destinado al sector de Cardiología · Gestión directa del club',
    },
  },
];

/* ─── Card Individual ─── */
const ProjectCard = ({
  index,
  badge,
  category,
  accent,
  projectIcon,
  title,
  description,
  stats,
  cta,
  footerInfo,
  active,
  autoplayKey,
  autoplayDuration,
  paused,
  onSelect,
}) => {
  const stepNumber = String(index + 1).padStart(2, '0');

  return (
    <article
      onClick={!active ? onSelect : undefined}
      className={`relative flex flex-col h-full rounded-[1.75rem] sm:rounded-[2.25rem] overflow-hidden border bg-gradient-to-br ${
        accent?.cardBg || 'from-white to-pink-50/40'
      } transition-all duration-700 ${
        active
          ? `${accent?.cardBorder || 'border-cranberry/25'} shadow-[0_24px_60px_-15px_rgba(18,7,26,0.13),0_0_0_1px_rgba(212,19,103,0.08)] opacity-100 scale-100`
          : 'border-gray-200/60 shadow-sm opacity-45 hover:opacity-70 scale-[0.95] cursor-pointer'
      }`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      aria-hidden={!active}
    >
      {/* Barra superior de progreso */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-200/70 z-20">
        {active && (
          <div
            key={autoplayKey}
            className={`carousel-progress-bar h-full w-full bg-gradient-to-r ${
              accent?.iconBg || 'from-cranberry via-pink-500 to-cranberry-dark'
            }`}
            style={{
              '--autoplay-duration': `${autoplayDuration}ms`,
              animationPlayState: paused ? 'paused' : 'running',
            }}
          />
        )}
      </div>

      {/* Resplandor decorativo interno */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle, ${accent?.glow || 'rgba(212,19,103,0.14)'} 0%, transparent 70%)`,
          opacity: active ? 1 : 0,
        }}
      />

      {/* Marca de agua decorativa de fondo (ícono gigante tenue) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 -right-8 w-44 h-44 opacity-[0.045] text-gray-900 transform -rotate-12 scale-[2.6] flex items-center justify-center"
      >
        {projectIcon}
      </div>

      <div className="relative z-10 flex flex-col flex-1 p-5 sm:p-7 md:px-9 md:py-7">
        {/* Cabecera de la tarjeta: ícono + badges + numeración */}
        <div className="flex items-center justify-between gap-4 mb-3.5 sm:mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br ${
                accent?.iconBg || 'from-cranberry to-pink-600'
              } flex items-center justify-center shadow-lg flex-shrink-0 ring-4 ring-white/80`}
            >
              {projectIcon}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-900 text-white text-[10px] font-montserrat font-bold tracking-wider uppercase shadow-xs">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-pink-400" />
                </span>
                {badge}
              </span>

              {category && (
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full border text-[10px] font-montserrat font-bold tracking-wide ${
                    accent?.pillBg || 'bg-cranberry/10 text-cranberry border-cranberry/20'
                  }`}
                >
                  {category}
                </span>
              )}
            </div>
          </div>

          <span
            aria-hidden="true"
            className={`font-garet text-3xl sm:text-5xl font-extrabold leading-none select-none ${
              accent?.numberText || 'text-cranberry/15'
            }`}
          >
            {stepNumber}
          </span>
        </div>

        {/* Título y descripción */}
        <div className="mb-4 sm:mb-5 flex-grow">
          <h3 className="font-garet text-xl sm:text-2xl md:text-3xl text-gray-900 tracking-tight leading-snug mb-2">
            {title}
          </h3>

          <p className="font-montserrat text-gray-600 leading-relaxed text-xs sm:text-sm md:text-base max-w-3xl">
            {description}
          </p>
        </div>

        {/* Indicadores clave en sub-cards con acento lateral de color */}
        {stats && (
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-5">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={`relative overflow-hidden flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-2 px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border text-center sm:text-left transition-colors duration-300 ${
                  accent?.statBg || 'bg-white/80 border-gray-200/80'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`hidden sm:block absolute left-0 top-2 bottom-2 w-1 rounded-r-full ${
                    accent?.statBar || 'bg-cranberry'
                  }`}
                />
                <span
                  className={`font-garet text-sm sm:text-lg md:text-xl font-bold leading-tight ${
                    accent?.statValueText || 'text-gray-900'
                  }`}
                >
                  {stat.value}
                </span>
                <span className="text-[9px] sm:text-[11px] font-montserrat text-gray-600 font-semibold tracking-wider uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Pie de tarjeta: CTA interactivo o bloque informativo de impacto */}
        <div className="mt-auto pt-3.5 sm:pt-4 border-t border-gray-200/60">
          {cta ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {cta.internal ? (
                <Link
                  to={cta.href}
                  className={`interactive-control inline-flex items-center justify-center w-full sm:w-auto gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-white font-montserrat font-semibold text-xs sm:text-sm group ${
                    accent?.btnClass || 'bg-cranberry hover:bg-cranberry-dark'
                  }`}
                  aria-label={cta.ariaLabel}
                  tabIndex={active ? 0 : -1}
                >
                  {cta.icon}
                  {cta.label}
                  <svg
                    className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              ) : (
                <a
                  href={cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`interactive-control inline-flex items-center justify-center w-full sm:w-auto gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-white font-montserrat font-semibold text-xs sm:text-sm group ${
                    accent?.btnClass || 'bg-cranberry hover:bg-cranberry-dark'
                  }`}
                  aria-label={cta.ariaLabel}
                  tabIndex={active ? 0 : -1}
                >
                  {cta.icon}
                  {cta.label}
                  <svg
                    className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              )}

              {cta.note && (
                <span className="hidden sm:inline font-montserrat text-xs text-gray-500 font-medium text-right">
                  {cta.note}
                </span>
              )}
            </div>
          ) : (
            footerInfo && (
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/80 backdrop-blur-xs border border-cranberry/20 shadow-2xs">
                <div className="w-9 h-9 rounded-lg bg-cranberry text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="font-montserrat text-xs sm:text-sm font-bold text-gray-900 truncate">
                    {footerInfo.title}
                  </p>
                  <p className="font-montserrat text-[11px] text-gray-600 line-clamp-1">
                    {footerInfo.subtitle}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </article>
  );
};

const NavArrow = ({ direction, onClick, label }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className="interactive-control flex-shrink-0 w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-white border border-gray-200/90 shadow-sm text-gray-700 hover:border-cranberry hover:text-cranberry hover:shadow-md z-30"
  >
    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={direction === 'prev' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
    </svg>
  </button>
);

export const CurrentProject = () => {
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.2 });
  const [current, setCurrent] = useState(0);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );
  const clipRef = useRef(null);

  const [containerW, setContainerW] = useState(0);
  const [layoutConfig, setLayoutConfig] = useState({ ratio: 0.84, gap: 24 });

  const total = PROJECTS.length;
  const paused = hoverPaused || userPaused;

  useEffect(() => {
    if (!clipRef.current) return;
    const update = () => {
      if (clipRef.current) {
        const width = clipRef.current.offsetWidth;
        setContainerW(width);
        setLayoutConfig(width < 768 ? { ratio: 0.90, gap: 16 } : { ratio: 0.84, gap: 28 });
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

  const { handlers: swipeHandlers } = useSwipe({
    onSwipeLeft: next,
    onSwipeRight: prev,
    threshold: 40,
  });

  return (
    <section
      id="proyecto-actual"
      className="scroll-mt-16 relative bg-gradient-to-b from-[#FAF4F7] via-[#F6EFF4] to-[#F2ECF2] py-10 md:py-12 lg:py-14 overflow-hidden border-b border-cranberry/10"
      aria-labelledby="current-project-title"
    >
      {/* Patrón de puntos sutil */}
      <div className="pointer-events-none absolute inset-0 bg-dots-subtle opacity-60" aria-hidden="true" />
      {/* Blobs de ambientación */}
      <div
        className="pointer-events-none absolute -top-24 left-1/4 w-[420px] md:w-[620px] h-[420px] md:h-[620px] bg-cranberry/[0.07] rounded-full blur-[90px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-1/4 w-[360px] md:w-[500px] h-[360px] md:h-[500px] bg-pink-500/[0.07] rounded-full blur-[90px]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Cabecera compacta: título a la izquierda y selector de proyectos a la derecha en desktop */}
        <div
          ref={headerRef}
          className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-4 md:mb-6 px-6 lg:px-8 transition-all duration-1000 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cranberry/10 border border-cranberry/20 text-cranberry font-montserrat font-bold tracking-widest uppercase text-[10px] mb-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cranberry opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cranberry" />
              </span>
              Iniciativas en curso
            </div>

            <h2
              id="current-project-title"
              className="font-garet text-2xl sm:text-3xl md:text-4xl text-gray-900 tracking-tight leading-tight"
            >
              Proyectos{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #d41367, #ff5ca8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Actuales
              </span>
            </h2>

            <p className="font-montserrat text-gray-500 text-xs sm:text-sm md:text-base max-w-xl mx-auto lg:mx-0 mt-1">
              Lo que estamos construyendo hoy desde el club para transformar Arrecifes mañana.
            </p>
          </div>

          {/* Selector rápido de proyectos (Pills) */}
          <div
            className="self-center lg:self-end inline-flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-2xl bg-gray-100/90 border border-gray-200/70 max-w-full"
            role="tablist"
            aria-label="Seleccionar proyecto actual"
          >
            {PROJECTS.map((project, idx) => {
              const isSelected = idx === current;
              const num = String(idx + 1).padStart(2, '0');
              return (
                <button
                  key={project.title}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => goTo(idx)}
                  className={`interactive-control inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-montserrat text-xs font-semibold ${
                    isSelected
                      ? 'bg-white text-gray-900 shadow-sm border border-gray-200/80'
                      : 'text-gray-500 hover:text-gray-800 border border-transparent'
                  }`}
                >
                  <span
                    className={`font-garet text-[10px] ${
                      isSelected ? 'text-cranberry' : 'text-gray-400'
                    }`}
                  >
                    {num}
                  </span>
                  <span>{project.tabLabel || project.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Carrusel */}
        <div
          onMouseEnter={() => setHoverPaused(true)}
          onMouseLeave={() => setHoverPaused(false)}
          onTouchStart={() => setHoverPaused(true)}
          onTouchEnd={() => setHoverPaused(false)}
        >
          {/* Hint de deslizamiento — solo mobile */}
          <div className="flex md:hidden items-center justify-center gap-2 mb-2 text-gray-400 pointer-events-none select-none">
            <svg className="w-3.5 h-3.5 animate-bounce-x" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            <span className="font-montserrat text-[11px] tracking-wide">Deslizá para explorar</span>
            <svg className="w-3.5 h-3.5 animate-bounce-x-reverse" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>

          <div className="relative">
            <div
              ref={clipRef}
              className="overflow-hidden py-2 md:py-3 select-none"
              style={{ touchAction: 'pan-y' }}
              {...swipeHandlers}
            >
              <div
                className="flex items-stretch transition-transform duration-700"
                style={{
                  gap: `${layoutConfig.gap}px`,
                  transform: `translateX(${translateX}px)`,
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {PROJECTS.map((project, idx) => (
                  <div
                    key={project.title}
                    className="flex-shrink-0 flex flex-col"
                    style={{ width: cardW > 0 ? `${cardW}px` : `${layoutConfig.ratio * 100}%` }}
                  >
                    <ProjectCard
                      {...project}
                      index={idx}
                      active={idx === current}
                      autoplayKey={current}
                      autoplayDuration={AUTOPLAY_INTERVAL}
                      paused={paused}
                      onSelect={() => goTo(idx)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Barra inferior de controles: Anterior / Indicadores / Pausa / Siguiente */}
          <div className="flex items-center justify-center gap-3 mt-2 px-6">
            <NavArrow direction="prev" onClick={prev} label="Proyecto anterior" />

            <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-gray-200/80 shadow-sm">
              {PROJECTS.map((p, idx) => (
                <button
                  key={p.title}
                  type="button"
                  onClick={() => goTo(idx)}
                  aria-label={`Ir a ${p.title}`}
                  className={`interactive-control relative h-2 transition-all duration-500 rounded-full ${
                    idx === current ? 'w-8 bg-cranberry' : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}

              <span className="mx-1 h-3.5 w-px bg-gray-200" aria-hidden="true" />

              <button
                type="button"
                onClick={() => setUserPaused((prevPaused) => !prevPaused)}
                aria-label={userPaused ? 'Reanudar rotación automática' : 'Pausar rotación automática'}
                title={userPaused ? 'Reanudar rotación automática' : 'Pausar rotación automática'}
                className="interactive-control w-5 h-5 rounded-full flex items-center justify-center text-gray-500 hover:text-cranberry"
              >
                {userPaused ? (
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                )}
              </button>
            </div>

            <NavArrow direction="next" onClick={next} label="Proyecto siguiente" />
          </div>
        </div>
      </div>
    </section>
  );
};
