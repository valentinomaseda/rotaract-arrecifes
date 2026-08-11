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

// Sub-component for individual Metric Badges in the header
const MetricCard = ({ value, label, icon }) => (
  <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col items-center text-center">
    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cranberry/5 text-cranberry mb-4 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <span className="block text-3xl md:text-4xl font-garet text-cranberry font-bold tracking-tight">
      {value}
    </span>
    <span className="text-xs font-montserrat text-gray-500 mt-2 font-medium tracking-wide uppercase">
      {label}
    </span>
  </div>
);

// Enhanced ValueCard component with more depth and subtle interactions
const ValueCard = ({ title, description, delay }) => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`min-w-[82vw] max-w-[320px] md:min-w-0 md:max-w-none md:w-full shrink-0 md:shrink snap-start group relative bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-700 flex flex-col justify-between ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div>
        {/* Subtle overlay effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-cranberry/0 via-cranberry/0 to-cranberry/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500 pointer-events-none" />

        {/* Modern Icon Container */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cranberry/10 text-cranberry mb-8 group-hover:scale-110 group-hover:bg-cranberry group-hover:text-white transition-all duration-400 shadow-inner">
          {icons[title]}
        </div>

        <h3 className="text-3xl font-garet text-gray-950 mb-5 tracking-tight group-hover:text-cranberry transition-colors">
          {title}
        </h3>

        <p className="font-montserrat text-gray-600 leading-relaxed text-base font-medium">
          {description}
        </p>
      </div>

      {/* Decorative full-width accent line on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-full bg-gradient-to-r from-cranberry/0 via-cranberry to-cranberry/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </div>
  );
};

const values = [
  {
    title: 'Misión',
    description:
      'Brindar oportunidades a los jóvenes para aumentar sus conocimientos y habilidades, a fin de contribuir a su desarrollo personal y promover mejores relaciones.',
  },
  {
    title: 'Visión',
    description:
      'Ser reconocidos como una organización líder de jóvenes que fomenta el cambio positivo a través de acciones solidarias y el desarrollo continuo del liderazgo.',
  },
  {
    title: 'Valores',
    description:
      'Compañerismo, integridad, diversidad, servicio y liderazgo son los pilares fundamentales que guían cada una de nuestras acciones y proyectos.',
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
      className="scroll-mt-20 relative bg-gray-50 py-28 md:py-36 px-6 lg:px-10 overflow-hidden"
      aria-labelledby="about-us-title"
    >
      {/* Enhanced Decorative Elements */}
      <div
        className="blob-decoration w-[600px] h-[600px] bg-cranberry/5 -bottom-48 -right-48 rounded-full blur-3xl opacity-60"
        aria-hidden="true"
      />
      <div
        className="blob-decoration w-[500px] h-[500px] bg-blue-500/5 top-24 -left-48 rounded-full blur-3xl opacity-60"
        aria-hidden="true"
      />
      {/* Subtle grid pattern for texture */}
      <div className="absolute inset-0 bg-grid-gray-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-28">

        {/* Main Header with a more impactful layout */}
        <div
          ref={headerRef}
          className={`text-center max-w-5xl mx-auto space-y-8 transition-all duration-800 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        >
          {/* Badge with enhanced style */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs font-montserrat font-semibold uppercase tracking-widest bg-cranberry/10 text-cranberry border border-cranberry/20 shadow-inner">
            <span className="w-2.5 h-2.5 rounded-full bg-cranberry animate-pulse shadow-glow" />
            {youthIdentityData.badge}
          </div>

          <h2 id="about-us-title" className="text-5xl md:text-6xl lg:text-7xl font-garet text-gray-950 leading-tight tracking-tight">
            {youthIdentityData.title}
          </h2>

          <p className="text-xl md:text-2xl text-gray-700 font-montserrat leading-relaxed max-w-4xl mx-auto font-medium">
            {youthIdentityData.description}
          </p>

          {/* Metric Cards Grid - Much more prominent */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-10 max-w-5xl mx-auto">
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
          {/* Mobile Left Arrow (Vertically Centered to Cards) */}
          <button
            onClick={prevValueSlide}
            aria-label="Tarjeta anterior"
            className="flex md:hidden absolute left-1 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-gray-800 border border-gray-200 shadow-lg items-center justify-center active:scale-95 transition-all hover:text-cranberry"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Mobile Right Arrow (Vertically Centered to Cards) */}
          <button
            onClick={nextValueSlide}
            aria-label="Siguiente tarjeta"
            className="flex md:hidden absolute right-1 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-gray-800 border border-gray-200 shadow-lg items-center justify-center active:scale-95 transition-all hover:text-cranberry"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div
            ref={valuesTrackRef}
            className="carousel-track flex md:grid overflow-x-auto md:overflow-x-visible gap-6 md:gap-8 lg:gap-10 md:grid-cols-3 pb-6 md:pb-0 pt-2 -mx-6 px-6 md:mx-0 md:px-0 scroll-smooth snap-x snap-mandatory md:snap-none"
          >
            {values.map((v, i) => (
              <ValueCard
                key={v.title}
                title={v.title}
                description={v.description}
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
                    : 'w-2 h-2 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Remaining Sections (kept for structure) */}
        <RotaryAreasSection />
        <BoardSection />
        <CommitteesCarousel />
        <PastPresidentsGallery />

      </div>
    </section>
  );
};