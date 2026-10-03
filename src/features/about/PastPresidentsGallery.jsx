import React, { useRef, useState, useEffect, useCallback } from 'react';
import { pastPresidentsData } from '../../data/aboutData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

/* ─────────────────────────────────────────────────────────────
   Animaciones CSS por keyframe — una variante por columna
───────────────────────────────────────────────────────────── */
const REVEAL_STYLES = `
  @keyframes revealLeft {
    0%   { opacity: 0; transform: perspective(900px) translateX(-80px) rotateY(25deg) scale(0.88); filter: blur(6px); }
    60%  { opacity: 1; filter: blur(0px); }
    100% { opacity: 1; transform: perspective(900px) translateX(0) rotateY(0deg) scale(1); filter: blur(0px); }
  }
  @keyframes revealBottom {
    0%   { opacity: 0; transform: perspective(900px) translateY(70px) rotateX(-18deg) scale(0.85); filter: blur(6px); }
    60%  { opacity: 1; filter: blur(0px); }
    100% { opacity: 1; transform: perspective(900px) translateY(0) rotateX(0deg) scale(1); filter: blur(0px); }
  }
  @keyframes revealRight {
    0%   { opacity: 0; transform: perspective(900px) translateX(80px) rotateY(-25deg) scale(0.88); filter: blur(6px); }
    60%  { opacity: 1; filter: blur(0px); }
    100% { opacity: 1; transform: perspective(900px) translateX(0) rotateY(0deg) scale(1); filter: blur(0px); }
  }

  /* Shimmer loading skeleton */
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
  .president-skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 800px 100%;
    animation: shimmer 1.4s infinite linear;
  }

  /* Scrollbar oculto */
  .presidents-track::-webkit-scrollbar { display: none; }
  .presidents-track { -ms-overflow-style: none; scrollbar-width: none; }
`;

/* Elige la animación según la columna (idx % 3) */
const ANIMATIONS = ['revealLeft', 'revealBottom', 'revealRight'];

/* ─────────────────────────────────────────────────────────────
   Hook: observa el elemento y activa la animación al entrar
───────────────────────────────────────────────────────────── */
const useRevealOnScroll = (index) => {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Delay escalonado: 0 ms, 150 ms, 300 ms …
          setTimeout(() => setRevealed(true), index * 150);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return [ref, revealed];
};

/* ─────────────────────────────────────────────────────────────
   Hook: tilt 3D suave con el mouse
───────────────────────────────────────────────────────────── */
const useTilt = () => {
  const ref = useRef(null);
  const handleMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
    el.style.transition = 'transform 0.08s linear';
  }, []);
  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)';
    el.style.transition = 'transform 0.6s cubic-bezier(0.22,1,0.36,1)';
  }, []);
  return { ref, handleMouseMove, handleMouseLeave };
};

/* ─────────────────────────────────────────────────────────────
   Card individual
───────────────────────────────────────────────────────────── */
const PresidentCard = ({ president, index }) => {
  const [wrapperRef, revealed] = useRevealOnScroll(index);
  const { ref: tiltRef, handleMouseMove, handleMouseLeave } = useTilt();
  const [imgLoaded, setImgLoaded] = useState(false);

  const periodList = president.periods
    ? president.periods
    : president.period
      ? [president.period]
      : [];
  const isMultiTerm = periodList.length > 1;
  const isCurrent = president.isCurrent;

  const animationName = ANIMATIONS[index % 3];

  return (
    <div
      ref={wrapperRef}
      className="min-w-[82vw] max-w-[320px] sm:min-w-0 sm:max-w-none sm:w-full shrink-0 sm:shrink snap-start flex flex-col"
      style={{
        /* Antes de revelar: invisible y en posición inicial de cada keyframe */
        opacity: revealed ? undefined : 0,
        animation: revealed
          ? `${animationName} 0.75s cubic-bezier(0.22, 1, 0.36, 1) both`
          : 'none',
        willChange: 'transform, opacity, filter',
      }}
    >
      {/* Tarjeta con tilt 3D en hover */}
      <div
        ref={tiltRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`group relative bg-white rounded-2xl overflow-hidden border flex flex-col flex-grow ${
          isCurrent
            ? 'border-emerald-200 shadow-xl shadow-emerald-900/8 ring-1 ring-emerald-500/20'
            : 'border-gray-100 shadow-md hover:shadow-2xl hover:shadow-cranberry/8'
        }`}
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        {/* ── Foto ── */}
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
          {/* Skeleton */}
          {!imgLoaded && <div className="absolute inset-0 president-skeleton" />}

          <img
            src={president.image}
            alt={`Presidente ${president.name}`}
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-[1.07] ${
              imgLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
          />

          {/* Gradiente hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Número flotante */}
          <div className="absolute bottom-3 left-4 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-1 group-hover:translate-y-0">
            <span className="font-montserrat text-white/80 text-[11px] font-bold tracking-[0.2em] uppercase">
              #{String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Corner frames */}
          <span
            className={`pointer-events-none absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 transition-all duration-500 ${
              isCurrent ? 'border-emerald-300/90 opacity-100' : 'border-white/80 opacity-0 group-hover:opacity-100'
            }`}
          />
          <span
            className={`pointer-events-none absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 transition-all duration-500 ${
              isCurrent ? 'border-emerald-300/90 opacity-100' : 'border-white/80 opacity-0 group-hover:opacity-100'
            }`}
          />

          {/* Badge "En curso" */}
          {isCurrent && (
            <span className="absolute top-3 right-3 flex items-center gap-1.5 pl-2 pr-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-emerald-700 text-[10px] font-montserrat font-bold tracking-wide shadow-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              En curso
            </span>
          )}
        </div>

        {/* ── Nameplate ── */}
        <div className="px-6 pt-5 pb-3 text-center">
          <h4 className="text-xl font-garet text-gray-900 tracking-wide group-hover:text-cranberry transition-colors duration-300">
            {president.name}
          </h4>
          <p
            className={`mt-1 text-[10px] font-montserrat font-semibold tracking-[0.15em] uppercase ${
              isCurrent ? 'text-emerald-600' : 'text-cranberry/80'
            }`}
          >
            {isCurrent
              ? 'Presidencia en curso'
              : isMultiTerm
                ? `Ex Presidente · ${periodList.length} gestiones`
                : 'Ex Presidente'}
          </p>
          <p className="mt-2 text-xs font-montserrat tracking-wide text-gray-400">
            {periodList.join('   ·   ')}
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-2 px-6">
          <span className="h-px flex-1 bg-gray-100 group-hover:bg-cranberry/20 transition-colors duration-500" />
          <span className="w-1 h-1 rotate-45 bg-gray-200 group-hover:bg-cranberry/40 transition-colors duration-500" />
          <span className="h-px flex-1 bg-gray-100 group-hover:bg-cranberry/20 transition-colors duration-500" />
        </div>

        {/* Achievement */}
        <div className="px-6 py-5 flex-grow">
          <p className="text-gray-600 font-montserrat text-sm leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
            {president.achievement}
          </p>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   Componente principal
───────────────────────────────────────────────────────────── */
export const PastPresidentsGallery = () => {
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.1 });
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.firstElementChild;
    if (!firstCard) return;
    const cardWidth = firstCard.getBoundingClientRect().width;
    const index = Math.round(track.scrollLeft / (cardWidth + 24));
    setActiveIndex(Math.min(Math.max(0, index), pastPresidentsData.length - 1));
    const maxScroll = track.scrollWidth - track.clientWidth;
    setScrollProgress(maxScroll > 0 ? track.scrollLeft / maxScroll : 0);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener('scroll', handleScroll, { passive: true });
    return () => track.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToIndex = (index) => {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.firstElementChild;
    if (!firstCard) return;
    const cardWidth = firstCard.getBoundingClientRect().width;
    track.scrollTo({ left: index * (cardWidth + 24), behavior: 'smooth' });
    setActiveIndex(index);
  };

  const nextSlide = () => scrollToIndex((activeIndex + 1) % pastPresidentsData.length);
  const prevSlide = () => scrollToIndex((activeIndex - 1 + pastPresidentsData.length) % pastPresidentsData.length);

  return (
    <div className="py-12 md:py-10 border-t border-gray-100">
      <style>{REVEAL_STYLES}</style>

      {/* Header */}
      <div
        ref={headerRef}
        className={`text-center max-w-3xl mx-auto mb-10 space-y-4 transition-all duration-700 ${
          headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <span className="inline-block text-xs font-montserrat font-semibold tracking-[0.2em] uppercase text-cranberry">
          Historia &amp; Memoria
        </span>
        <h3 className="text-3xl md:text-4xl font-garet text-gray-900">
          Galería de Presidentes
        </h3>
        <p className="text-gray-600 font-montserrat text-base max-w-xl mx-auto">
          Honramos el liderazgo, dedicación y huella de quienes lideraron la comisión de Rotaract Club Arrecifes a lo largo de las gestiones.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <span className="h-px w-10 bg-gray-200" />
          <span className="w-1.5 h-1.5 rotate-45 bg-cranberry/60" />
          <span className="h-px w-10 bg-gray-200" />
        </div>
      </div>

      {/* Barra de progreso mobile */}
      <div className="sm:hidden max-w-6xl mx-auto px-4 mb-4">
        <div className="h-0.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-cranberry rounded-full transition-all duration-200 ease-out"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>

      {/* Grid / Carrusel */}
      <div
        ref={trackRef}
        className="presidents-track flex sm:grid overflow-x-auto sm:overflow-x-visible gap-6 sm:gap-x-8 sm:gap-y-12 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto pb-6 sm:pb-0 pt-2 -mx-4 px-4 sm:mx-auto sm:px-0 scroll-smooth snap-x snap-mandatory sm:snap-none"
      >
        {pastPresidentsData.map((president, index) => (
          <PresidentCard key={president.id} president={president} index={index} />
        ))}
      </div>

      {/* Controles mobile */}
      <div className="flex sm:hidden items-center justify-between mt-4 px-4">
        <button
          onClick={prevSlide}
          aria-label="Presidente anterior"
          className="w-9 h-9 rounded-full border border-gray-200 bg-white text-gray-700 hover:text-cranberry hover:border-cranberry flex items-center justify-center shadow-sm active:scale-95 transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex items-center gap-1.5">
          {pastPresidentsData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              aria-label={`Ir al presidente ${idx + 1}`}
              className={`transition-all duration-300 rounded-full ${
                idx === activeIndex ? 'w-6 h-2 bg-cranberry' : 'w-2 h-2 bg-gray-300'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          aria-label="Siguiente presidente"
          className="w-9 h-9 rounded-full bg-cranberry text-white flex items-center justify-center shadow-sm active:scale-95 transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};