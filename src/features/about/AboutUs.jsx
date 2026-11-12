import React, { useRef, useState, useEffect } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { youthIdentityData } from '../../data/aboutData';
import { RotaryAreasSection } from './RotaryAreasSection';
import { BoardSection } from './BoardSection';
import { CommitteesCarousel } from './CommitteesCarousel';
import { PastPresidentsGallery } from './PastPresidentsGallery';

// Enhanced SVG icons with a modern, cleaner aesthetic
const icons = {
  Misión: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m-9 9a9 9 0 019-9" />
    </svg>
  ),
  Visión: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  Valores: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
    </svg>
  ),
};

// Sub-component for individual Metric Badges in the dark identity header
const MetricCard = ({ value, label, icon }) => (
  <div className="bg-white/[0.05] backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white/10 hover:border-cranberry/45 hover:bg-white/[0.08] transition-all duration-300 group flex flex-col items-center text-center">
    <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-cranberry/20 border border-cranberry/35 text-pink-300 mb-3.5 group-hover:scale-110 group-hover:bg-cranberry group-hover:text-white transition-all">
      {icon}
    </div>
    <span
      className="block text-2xl sm:text-3xl md:text-4xl font-garet font-bold tracking-tight"
      style={{
        background: 'linear-gradient(90deg, #ffffff 0%, #ff85be 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {value}
    </span>
    <span className="text-[11px] sm:text-xs font-montserrat text-white/70 mt-1.5 font-semibold tracking-wider uppercase">
      {label}
    </span>
  </div>
);

// Enhanced ValueCard component with dark glass & featured cranberry accent
const ValueCard = ({ index, tag, title, description, featured, delay }) => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });
  const num = String(index + 1).padStart(2, '0');

  return (
    <div
      ref={ref}
      className={`min-w-[82vw] max-w-[320px] md:min-w-0 md:max-w-none md:w-full shrink-0 md:shrink snap-start group relative rounded-3xl p-7 sm:p-9 border transition-all duration-700 flex flex-col justify-between overflow-hidden ${
        featured
          ? 'bg-gradient-to-br from-cranberry/30 via-[#260c24] to-[#13091c] border-cranberry/45 shadow-[0_20px_50px_-12px_rgba(212,19,103,0.3)]'
          : 'bg-white/[0.04] backdrop-blur-md border-white/12 hover:border-cranberry/40 hover:bg-white/[0.07]'
      } hover:-translate-y-1.5 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Top glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl opacity-40 group-hover:opacity-75 transition-opacity duration-500"
        style={{ background: 'radial-gradient(circle, #d41367 0%, transparent 70%)' }}
      />

      <div className="relative z-10">
        {/* Header row: icon + number */}
        <div className="flex items-center justify-between mb-6">
          <div
            className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-400 ${
              featured
                ? 'bg-cranberry text-white shadow-[0_8px_20px_rgba(212,19,103,0.45)]'
                : 'bg-cranberry/15 border border-cranberry/30 text-pink-300 group-hover:bg-cranberry group-hover:text-white'
            }`}
          >
            {icons[title]}
          </div>

          <span className="font-garet text-3xl sm:text-4xl font-extrabold text-white/12 group-hover:text-pink-400/25 transition-colors select-none">
            {num}
          </span>
        </div>

        <span className="inline-block font-montserrat text-[10px] font-bold uppercase tracking-[0.2em] text-pink-300/90 mb-1.5">
          {tag}
        </span>

        <h3 className="text-2xl sm:text-3xl font-garet text-white mb-3.5 tracking-tight">
          {title}
        </h3>

        <p className="font-montserrat text-white/75 leading-relaxed text-sm sm:text-base">
          {description}
        </p>
      </div>

      {/* Bottom accent bar */}
      <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
        <span className="font-montserrat text-[11px] text-white/50 font-medium">
          Identidad Rotaract
        </span>
        <span className="h-1.5 w-8 rounded-full bg-gradient-to-r from-cranberry to-pink-400 group-hover:w-14 transition-all duration-500" />
      </div>
    </div>
  );
};

const values = [
  {
    tag: 'Nuestro Propósito',
    title: 'Misión',
    description:
      'Brindar oportunidades a los jóvenes para aumentar sus conocimientos y habilidades, a fin de contribuir a su desarrollo personal y promover mejores relaciones.',
    featured: false,
  },
  {
    tag: 'Nuestro Horizonte',
    title: 'Visión',
    description:
      'Ser reconocidos como una organización líder de jóvenes que fomenta el cambio positivo a través de acciones solidarias y el desarrollo continuo del liderazgo.',
    featured: true,
  },
  {
    tag: 'Nuestros Pilares',
    title: 'Valores',
    description:
      'Compañerismo, integridad, diversidad, servicio y liderazgo son los pilares fundamentales que guían cada una de nuestras acciones y proyectos.',
    featured: false,
  },
];

// Icons specifically for the Metric Cards in the header
const metricIcons = [
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
];

export const AboutUs = () => {
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.2 });
  const valuesTrackRef = useRef(null);
  const [activeValueIndex, setActiveValueIndex] = useState(0);

  const handleValuesScroll = () => {
    if (!valuesTrackRef.current) return;
    const track = valuesTrackRef.current;
    const scrollPosition = track.scrollLeft;
    const firstCard = track.firstElementChild;
    if (!firstCard) return;
    const cardWidth = firstCard.getBoundingClientRect().width;
    const index = Math.round(scrollPosition / (cardWidth + 24));
    setActiveValueIndex(Math.min(Math.max(0, index), values.length - 1));
  };

  useEffect(() => {
    const track = valuesTrackRef.current;
    if (track) {
      track.addEventListener('scroll', handleValuesScroll, { passive: true });
      return () => track.removeEventListener('scroll', handleValuesScroll);
    }
  }, []);

  const scrollToValueIndex = (index) => {
    if (!valuesTrackRef.current) return;
    const track = valuesTrackRef.current;
    const firstCard = track.firstElementChild;
    if (!firstCard) return;
    const cardWidth = firstCard.getBoundingClientRect().width;
    const targetScroll = index * (cardWidth + 24);
    track.scrollTo({ left: targetScroll, behavior: 'smooth' });
    setActiveValueIndex(index);
  };

  const nextValueSlide = () => {
    const newIndex = (activeValueIndex + 1) % values.length;
    scrollToValueIndex(newIndex);
  };

  const prevValueSlide = () => {
    const newIndex = (activeValueIndex - 1 + values.length) % values.length;
    scrollToValueIndex(newIndex);
  };

  return (
    <section
      id="quienes-somos"
      className="scroll-mt-20 relative bg-gradient-to-b from-[#FAF6F8] via-white to-[#F7F4F8] pb-20 md:pb-24 overflow-hidden"
      aria-labelledby="about-us-title"
    >
      {/* ── Bloque Oscuro Inmersivo: Identidad + Métricas + Misión/Visión/Valores ── */}
      <div
        className="relative overflow-hidden text-white py-20 md:py-24 px-6 lg:px-10"
        style={{
          background: 'linear-gradient(135deg, #0b0713 0%, #16091d 45%, #11091a 75%, #09070f 100%)',
        }}
      >
        {/* Resplandores de luz de fondo */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div
            className="absolute -top-32 left-1/4 w-[600px] h-[600px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #d41367 0%, transparent 65%)', filter: 'blur(100px)' }}
          />
          <div
            className="absolute bottom-0 right-10 w-[500px] h-[500px] rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 65%)', filter: 'blur(110px)' }}
          />
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto space-y-16">
          {/* Main Header */}
          <div
            ref={headerRef}
            className={`text-center max-w-4xl mx-auto space-y-6 transition-all duration-800 ${
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-montserrat font-bold uppercase tracking-widest bg-cranberry/20 text-pink-200 border border-cranberry/35">
              <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
              {youthIdentityData.badge}
            </div>

            <h2
              id="about-us-title"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-garet text-white leading-[1.12] tracking-tight"
            >
              Somos un grupo de{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #ff3b8b, #ff85be)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                jóvenes de 18 a 30 años
              </span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-white/75 font-montserrat leading-relaxed max-w-3xl mx-auto">
              {youthIdentityData.description}
            </p>

            {/* Metric Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6 max-w-5xl mx-auto">
              {youthIdentityData.stats.map((stat, index) => (
                <MetricCard
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  icon={metricIcons[index]}
                />
              ))}
            </div>
          </div>

          {/* Value cards container (Misión, Visión, Valores): Carousel on Mobile, Grid on Desktop */}
          <div className="relative">
            {/* Mobile Left Arrow */}
            <button
              onClick={prevValueSlide}
              aria-label="Tarjeta anterior"
              className="flex md:hidden absolute left-1 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-gray-900/90 backdrop-blur-sm text-white border border-white/20 shadow-lg items-center justify-center active:scale-95 transition-all hover:border-cranberry"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Mobile Right Arrow */}
            <button
              onClick={nextValueSlide}
              aria-label="Siguiente tarjeta"
              className="flex md:hidden absolute right-1 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-gray-900/90 backdrop-blur-sm text-white border border-white/20 shadow-lg items-center justify-center active:scale-95 transition-all hover:border-cranberry"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div
              ref={valuesTrackRef}
              role="region"
              aria-label="Misión, Visión y Valores"
              tabIndex={0}
              className="carousel-track flex md:grid overflow-x-auto md:overflow-x-visible gap-6 md:gap-8 lg:gap-8 md:grid-cols-3 pb-6 md:pb-0 pt-2 -mx-6 px-6 md:mx-0 md:px-0 scroll-smooth snap-x snap-mandatory md:snap-none"
            >
              {values.map((v, i) => (
                <ValueCard
                  key={v.title}
                  index={i}
                  tag={v.tag}
                  title={v.title}
                  description={v.description}
                  featured={v.featured}
                  delay={i * 150}
                />
              ))}
            </div>

            {/* Mobile Pagination Dots */}
            <div className="flex md:hidden items-center justify-center gap-1.5 mt-4">
              {values.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToValueIndex(idx)}
                  aria-label={`Ir a tarjeta ${idx + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    idx === activeValueIndex
                      ? 'w-6 h-2 bg-cranberry'
                      : 'w-2 h-2 bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Subsecciones Institucionales con ritmo cromático ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-16 space-y-20 md:space-y-20">
        <RotaryAreasSection />
        <BoardSection />
        <CommitteesCarousel />
        <PastPresidentsGallery />
      </div>
    </section>
  );
};