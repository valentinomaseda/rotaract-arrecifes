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
    background: linear-gradient(90deg, #efe9df 25%, #e3dacb 50%, #efe9df 75%);
    background-size: 800px 100%;
    animation: shimmer 1.4s infinite linear;
  }

  /* Film grain texture for nostalgic archive feel */
  .archive-grain {
    background-image: radial-gradient(rgba(120, 90, 60, 0.08) 1px, transparent 0);
    background-size: 18px 18px;
  }

  /* Subtle vintage photo filter that awakens on hover */
  .vintage-portrait {
    filter: sepia(0.24) contrast(1.04) brightness(0.98) saturate(0.85);
    transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), filter 0.7s ease, opacity 0.6s ease;
  }
  .group:hover .vintage-portrait {
    filter: sepia(0) contrast(1.02) brightness(1) saturate(1.02);
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
   Card individual — Estilo Retrato de Archivo / Salón de Honor
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
      className="min-w-[84vw] max-w-[330px] sm:min-w-0 sm:max-w-none sm:w-full shrink-0 sm:shrink snap-start flex flex-col"
      style={{
        opacity: revealed ? undefined : 0,
        animation: revealed
          ? `${animationName} 0.75s cubic-bezier(0.22, 1, 0.36, 1) both`
          : 'none',
        willChange: 'transform, opacity, filter',
      }}
    >
      {/* Marco tipo retrato con passe-partout cálido */}
      <div
        ref={tiltRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`group relative rounded-2xl p-3 sm:p-3.5 transition-all duration-500 flex flex-col flex-grow ${
          isCurrent
            ? 'bg-[#FDFBF7] border-2 border-[#D4AF37]/50 shadow-[0_20px_50px_-12px_rgba(120,90,40,0.18)]'
            : 'bg-[#FDFBF7] border border-[#E5DEC9] shadow-[0_14px_35px_-10px_rgba(80,60,35,0.12)] hover:shadow-[0_24px_50px_-12px_rgba(140,95,50,0.22)] hover:border-[#C8B69E]'
        }`}
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        {/* Borde interior tipo passe-partout de galería */}
        <div className="relative flex flex-col flex-grow rounded-xl border border-[#EBE3D5] bg-[#FAF7F2] overflow-hidden">

          {/* ── Retrato Fotográfico ── */}
          <div className="relative aspect-[4/5] overflow-hidden bg-[#E8E0D2]">
            {/* Skeleton cálido */}
            {!imgLoaded && <div className="absolute inset-0 president-skeleton" />}

            <img
              src={president.image}
              alt={`Presidente ${president.name}`}
              onLoad={() => setImgLoaded(true)}
              className={`vintage-portrait w-full h-full object-cover object-center group-hover:scale-[1.05] ${
                imgLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
            />

            {/* Viñeta fotográfica analógica permanente + gradiente cálido */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                boxShadow: 'inset 0 0 55px rgba(38, 24, 12, 0.35)',
                background: 'linear-gradient(to top, rgba(28, 18, 10, 0.72) 0%, rgba(28, 18, 10, 0.12) 40%, transparent 100%)',
              }}
            />

            {/* Esquineros tipo álbum histórico (fijos, sutiles en dorado viejo) */}
            <span className="pointer-events-none absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#E6D5B8]/80 transition-all duration-500 group-hover:w-6 group-hover:h-6 group-hover:border-white" />
            <span className="pointer-events-none absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#E6D5B8]/80 transition-all duration-500 group-hover:w-6 group-hover:h-6 group-hover:border-white" />
            <span className="pointer-events-none absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#E6D5B8]/80 transition-all duration-500 group-hover:w-6 group-hover:h-6 group-hover:border-white" />
            <span className="pointer-events-none absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#E6D5B8]/80 transition-all duration-500 group-hover:w-6 group-hover:h-6 group-hover:border-white" />

            {/* Badge "En funciones" */}
            {isCurrent && (
              <span className="absolute top-3.5 right-4 flex items-center gap-1.5 pl-2 pr-2.5 py-1 rounded-full bg-[#1C140D]/80 backdrop-blur-sm border border-[#D4AF37]/50 text-[#F3E5AB] text-[10px] font-montserrat font-bold tracking-wider uppercase shadow-sm">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
                </span>
                En funciones
              </span>
            )}

            {/* Pie de foto manuscrito / estampado sobre la viñeta inferior */}
            <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between text-white">
              <div>
                <p className="font-montserrat text-[10px] uppercase tracking-[0.22em] text-[#E6D5B8]">
                  {isCurrent
                    ? 'Presidencia Actual'
                    : index === 0
                      ? 'Presidente Fundador'
                      : isMultiTerm
                        ? `Ex Presidente · ${periodList.length} Períodos`
                        : 'Ex Presidente'}
                </p>
                <h4 className="text-xl sm:text-2xl font-garet text-[#FFFDF9] tracking-wide leading-tight mt-0.5 drop-shadow">
                  {president.name}
                </h4>
              </div>
            </div>
          </div>

          {/* ── Placa Conmemorativa y Períodos ── */}
          <div className="px-5 pt-4 pb-3 bg-gradient-to-b from-[#F7F2E7] to-[#FAF7F2] border-b border-[#EBE3D5]">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {periodList.map((p) => (
                <span
                  key={p}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-montserrat font-bold tracking-[0.12em] uppercase border ${
                    isCurrent
                      ? 'bg-cranberry/10 text-cranberry border-cranberry/25'
                      : 'bg-[#EFE8DA] text-[#6E563B] border-[#DDD2BE]'
                  }`}
                >
                  <svg className="w-3 h-3 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Gestión {p}
                </span>
              ))}
            </div>
          </div>

          {/* ── Reseña Histórica / Huella de Gestión ── */}
          <div className="relative px-6 py-5 flex-grow flex flex-col justify-between bg-[#FAF7F2]">
            {/* Comilla tipográfica decorativa de fondo */}
            <span
              aria-hidden="true"
              className="pointer-events-none select-none absolute top-1 left-3 font-serif text-6xl leading-none text-[#8C7355]/12"
            >
              “
            </span>

            <p className="relative z-10 text-[#4A3F35] font-montserrat text-sm leading-relaxed italic">
              {president.achievement}
            </p>
          </div>
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
    <div className="relative rounded-[2.5rem] bg-[#F6F0E4] border border-[#E4DAC8] px-5 py-12 sm:px-10 md:py-16 overflow-hidden shadow-[inset_0_2px_20px_rgba(120,90,50,0.06)]">
      <style>{REVEAL_STYLES}</style>

      {/* Textura de papel / grano de archivo y halos cálidos */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 archive-grain opacity-75" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[650px] h-[300px] rounded-full opacity-35"
        style={{ background: 'radial-gradient(ellipse, rgba(196, 154, 92, 0.32) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-0 w-[400px] h-[300px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(212, 19, 103, 0.25) 0%, transparent 70%)', filter: 'blur(70px)' }}
      />

      {/* Marco ornamental interior sutil */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 sm:inset-5 rounded-[2rem] border border-[#E2D6C1]/70"
      />

      {/* Header */}
      <div
        ref={headerRef}
        className={`relative z-10 text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-4 transition-all duration-700 ${
          headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EFE7D6] border border-[#D8CBB5] text-[#7A6248] text-[11px] font-montserrat font-bold tracking-[0.22em] uppercase">
          <svg className="w-3.5 h-3.5 text-cranberry" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Memoria Institucional · Desde 2022
        </div>

        <h3 className="text-3xl sm:text-4xl md:text-5xl font-garet text-[#2C221A] tracking-tight">
          Galería de Presidentes
        </h3>

        <p className="text-[#665647] font-montserrat text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Cada gestión dejó un capítulo escrito en nuestra historia. Recordamos y honramos a quienes llevaron el pin presidencial y guiaron el camino de Rotaract Club Arrecifes.
        </p>

        {/* Ornamento clásico de libro de actas */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#C8B69E]" />
          <span className="w-2 h-2 rotate-45 border border-[#8C7355] bg-[#FAF6F0]" />
          <span className="w-2 h-2 rotate-45 bg-cranberry" />
          <span className="w-2 h-2 rotate-45 border border-[#8C7355] bg-[#FAF6F0]" />
          <span className="h-px w-14 bg-gradient-to-l from-transparent to-[#C8B69E]" />
        </div>
      </div>

      {/* Barra de progreso mobile */}
      <div className="relative z-10 sm:hidden max-w-6xl mx-auto px-2 mb-4">
        <div className="h-1 bg-[#E5DEC9] rounded-full overflow-hidden">
          <div
            className="h-full bg-cranberry rounded-full transition-all duration-200 ease-out"
            style={{ width: `${Math.max(15, scrollProgress * 100)}%` }}
          />
        </div>
      </div>

      {/* Grid / Carrusel */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div
          ref={trackRef}
          className="presidents-track flex sm:grid overflow-x-auto sm:overflow-x-visible gap-6 sm:gap-x-8 sm:gap-y-12 sm:grid-cols-2 lg:grid-cols-3 pb-6 sm:pb-0 pt-2 -mx-2 px-2 sm:mx-0 sm:px-0 scroll-smooth snap-x snap-mandatory sm:snap-none"
        >
          {pastPresidentsData.map((president, index) => (
            <PresidentCard key={president.id} president={president} index={index} />
          ))}
        </div>
      </div>

      {/* Controles mobile */}
      <div className="relative z-10 flex sm:hidden items-center justify-between mt-4 px-2">
        <button
          onClick={prevSlide}
          aria-label="Presidente anterior"
          className="w-10 h-10 rounded-full border border-[#D8CBB5] bg-[#FDFBF7] text-[#5C4938] hover:text-cranberry hover:border-cranberry flex items-center justify-center shadow-sm active:scale-95 transition-all"
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
                idx === activeIndex ? 'w-6 h-2 bg-cranberry' : 'w-2 h-2 bg-[#C8B69E]'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          aria-label="Siguiente presidente"
          className="w-10 h-10 rounded-full bg-cranberry text-white flex items-center justify-center shadow-sm active:scale-95 transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Pie de página de archivo */}
      <p className="relative z-10 text-center font-montserrat text-xs text-[#8C7355] tracking-widest uppercase mt-10">
        « El liderazgo pasa de mano en mano, la vocación de servicio permanece »
      </p>
    </div>
  );
};