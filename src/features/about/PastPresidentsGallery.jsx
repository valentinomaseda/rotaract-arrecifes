import React, { useRef, useState, useEffect } from 'react';
import { pastPresidentsData } from '../../data/aboutData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export const PastPresidentsGallery = () => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const scrollPosition = track.scrollLeft;
    const firstCard = track.firstElementChild;
    if (!firstCard) return;
    const cardWidth = firstCard.getBoundingClientRect().width;
    const index = Math.round(scrollPosition / (cardWidth + 24));
    setActiveIndex(Math.min(Math.max(0, index), pastPresidentsData.length - 1));
  };

  useEffect(() => {
    const track = trackRef.current;
    if (track) {
      track.addEventListener('scroll', handleScroll, { passive: true });
      return () => track.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollToIndex = (index) => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const firstCard = track.firstElementChild;
    if (!firstCard) return;
    const cardWidth = firstCard.getBoundingClientRect().width;
    const targetScroll = index * (cardWidth + 24);
    track.scrollTo({ left: targetScroll, behavior: 'smooth' });
    setActiveIndex(index);
  };

  const nextSlide = () => {
    const newIndex = (activeIndex + 1) % pastPresidentsData.length;
    scrollToIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (activeIndex - 1 + pastPresidentsData.length) % pastPresidentsData.length;
    scrollToIndex(newIndex);
  };

  return (
    <div className="py-12 md:py-10 border-t border-gray-100">
      {/* Section Header */}
      <div
        ref={ref}
        className={`text-center max-w-3xl mx-auto mb-10 md:mb-8 space-y-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
      >
        <span className="inline-block text-xs font-montserrat font-semibold tracking-[0.2em] uppercase text-cranberry">
          Historia & Memoria
        </span>
        <h3 className="text-3xl md:text-4xl font-garet text-gray-900">
          Galería de Presidentes
        </h3>
        <p className="text-gray-600 font-montserrat text-base max-w-xl mx-auto">
          Honramos el liderazgo, dedicación y huella de quienes lideraron la comisión de Rotaract Club Arrecifes a lo largo de las gestiones.
        </p>

        {/* Divider motif — echoed inside each card's nameplate */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <span className="h-px w-10 bg-gray-200" />
          <span className="w-1.5 h-1.5 rotate-45 bg-cranberry/60" />
          <span className="h-px w-10 bg-gray-200" />
        </div>
      </div>

      {/* Presidents Container: Carousel on Mobile, Grid on Desktop */}
      <div
        ref={trackRef}
        className="carousel-track flex sm:grid overflow-x-auto sm:overflow-x-visible gap-6 sm:gap-x-8 sm:gap-y-12 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto pb-6 sm:pb-0 pt-2 -mx-4 px-4 sm:mx-auto sm:px-0 scroll-smooth snap-x snap-mandatory sm:snap-none"
      >
        {pastPresidentsData.map((president) => {
          // Normalize periods array (supports both periods: [] or period: "")
          const periodList = president.periods
            ? president.periods
            : president.period
              ? [president.period]
              : [];

          const isMultiTerm = periodList.length > 1;
          const isCurrent = president.isCurrent;

          return (
            <div
              key={president.id}
              className={`min-w-[82vw] max-w-[320px] sm:min-w-0 sm:max-w-none sm:w-full shrink-0 sm:shrink snap-start group relative bg-white rounded-2xl overflow-hidden border transition-all duration-500 flex flex-col ${isCurrent
                ? 'border-emerald-200 shadow-lg shadow-emerald-900/5 ring-1 ring-emerald-500/20'
                : 'border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1'
                }`}
            >
              {/* Portrait */}
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                <img
                  src={president.image}
                  alt={`Presidente ${president.name}`}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                />

                {/* Frame corners — always on for the current president, revealed on hover for alumni */}
                <span
                  className={`pointer-events-none absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 transition-all duration-500 ${isCurrent
                    ? 'border-emerald-300/90 opacity-100'
                    : 'border-white/90 opacity-0 group-hover:opacity-100'
                    }`}
                />
                <span
                  className={`pointer-events-none absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 transition-all duration-500 ${isCurrent
                    ? 'border-emerald-300/90 opacity-100'
                    : 'border-white/90 opacity-0 group-hover:opacity-100'
                    }`}
                />

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

              {/* Nameplate */}
              <div className="px-6 pt-5 pb-3 text-center">
                <h4 className="text-xl font-garet text-gray-900 tracking-wide">
                  {president.name}
                </h4>
                <p
                  className={`mt-1 text-[10px] font-montserrat font-semibold tracking-[0.15em] uppercase ${isCurrent ? 'text-emerald-600' : 'text-cranberry/80'
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

              {/* Divider echoing the section header */}
              <div className="flex items-center justify-center gap-2 px-6">
                <span className="h-px flex-1 bg-gray-100" />
                <span className="w-1 h-1 rotate-45 bg-gray-200" />
                <span className="h-px flex-1 bg-gray-100" />
              </div>

              {/* Achievement / Legacy note */}
              <div className="px-6 py-5 flex-grow">
                <p className="text-gray-600 font-montserrat text-sm leading-relaxed">
                  {president.achievement}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Pagination & Controls */}
      <div className="flex sm:hidden items-center justify-between mt-4 px-2">
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
              className={`transition-all duration-300 rounded-full ${idx === activeIndex
                  ? 'w-6 h-2 bg-cranberry'
                  : 'w-2 h-2 bg-gray-300'
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