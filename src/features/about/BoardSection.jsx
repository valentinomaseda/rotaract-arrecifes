import React, { useRef, useState, useEffect } from 'react';
import { boardMembersData, boardPeriod } from '../../data/aboutData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export const BoardSection = () => {
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
    setActiveIndex(Math.min(Math.max(0, index), boardMembersData.length - 1));
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
    const newIndex = (activeIndex + 1) % boardMembersData.length;
    scrollToIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (activeIndex - 1 + boardMembersData.length) % boardMembersData.length;
    scrollToIndex(newIndex);
  };

  return (
    <div className="py-12 border-t border-gray-100">
      {/* Section Header */}
      <div
        ref={ref}
        className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
      >
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <span className="inline-block text-xs font-montserrat font-semibold tracking-[0.2em] uppercase text-cranberry">
            Liderazgo Institucional
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-montserrat font-semibold bg-cranberry text-white shadow-sm">
            {boardPeriod}
          </span>
        </div>
        <h3 className="text-3xl md:text-4xl font-garet text-gray-900">
          Comisión Directiva Actual
        </h3>
        <p className="text-gray-600 font-montserrat text-base max-w-xl mx-auto">
          Conoce a los jóvenes encargados de coordinar las áreas estratégicas y guiar la gestión del club durante este período.
        </p>

        {/* Divider motif — shared with the Presidents gallery for visual continuity */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <span className="h-px w-10 bg-gray-200" />
          <span className="w-1.5 h-1.5 rotate-45 bg-cranberry/60" />
          <span className="h-px w-10 bg-gray-200" />
        </div>
      </div>

      {/* Board Members Cards Container: Carousel on Mobile, Grid on Desktop */}
      <div
        ref={trackRef}
        className="carousel-track flex sm:grid overflow-x-auto sm:overflow-x-visible gap-6 sm:gap-x-6 sm:gap-y-10 sm:grid-cols-2 lg:grid-cols-4 pb-6 sm:pb-0 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth snap-x snap-mandatory sm:snap-none"
      >
        {boardMembersData.map((member) => (
          <div
            key={member.id}
            className="min-w-[82vw] max-w-[310px] sm:min-w-0 sm:max-w-none sm:w-full shrink-0 sm:shrink snap-start group relative bg-white rounded-3xl overflow-visible border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col"
          >
            {/* Lanyard grommet */}
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 z-10 w-4 h-4 rounded-full bg-white border-2 border-gray-200 group-hover:border-cranberry/50 transition-colors duration-500" />
            <span className="absolute -top-1 left-1/2 -translate-x-1/2 z-10 w-1 h-1 rounded-full bg-gray-300" />

            <div className="rounded-3xl overflow-hidden flex flex-col flex-grow">
              {/* Portrait */}
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                <img
                  src={member.image}
                  alt={`${member.name} - ${member.role}`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/15 to-transparent" />
              </div>

              {/* Role strip — the credential title band */}
              <div
                className={`px-4 py-2 text-center text-[11px] font-montserrat font-bold tracking-[0.14em] uppercase ${member.badgeColor}`}
              >
                {member.role}
              </div>

              {/* Name */}
              <div className="px-6 pt-4 pb-6 text-center">
                <h4 className="text-lg font-garet text-gray-900">
                  {member.name}
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Pagination & Controls */}
      <div className="flex sm:hidden items-center justify-between mt-4 px-2">
        <button
          onClick={prevSlide}
          aria-label="Integrante anterior"
          className="w-9 h-9 rounded-full border border-gray-200 bg-white text-gray-700 hover:text-cranberry hover:border-cranberry flex items-center justify-center shadow-sm active:scale-95 transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex items-center gap-1.5">
          {boardMembersData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              aria-label={`Ir al integrante ${idx + 1}`}
              className={`transition-all duration-300 rounded-full ${idx === activeIndex
                  ? 'w-6 h-2 bg-cranberry'
                  : 'w-2 h-2 bg-gray-300'
                }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          aria-label="Siguiente integrante"
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