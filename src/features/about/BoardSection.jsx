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
    <div className="relative rounded-[2.5rem] bg-gradient-to-br from-[#FCF5F8] via-[#F9F4F8] to-[#F3EFF8] border border-cranberry/15 px-5 py-12 sm:px-10 md:py-14 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
      {/* Decorative ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-cranberry/8 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-purple-500/8 blur-3xl"
      />

      {/* Section Header */}
      <div
        ref={ref}
        className={`relative z-10 text-center max-w-3xl mx-auto mb-10 md:mb-12 space-y-4 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="flex items-center justify-center gap-2.5 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-montserrat font-bold tracking-[0.16em] uppercase bg-white/80 border border-cranberry/20 text-cranberry shadow-2xs">
            Liderazgo Institucional
          </span>
          <span className="px-3.5 py-1 rounded-full text-xs font-montserrat font-bold bg-gray-900 text-white shadow-sm">
            {boardPeriod}
          </span>
        </div>
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-garet text-gray-900 tracking-tight">
          Comisión <span className="text-gradient-cranberry">Directiva Actual</span>
        </h3>
        <p className="text-gray-600 font-montserrat text-base max-w-xl mx-auto">
          Conocé a los jóvenes encargados de coordinar las áreas estratégicas y guiar la gestión del club durante este período.
        </p>

        {/* Divider motif */}
        <div className="flex items-center justify-center gap-3 pt-1">
          <span className="h-px w-12 bg-cranberry/25" />
          <span className="w-2 h-2 rotate-45 bg-cranberry" />
          <span className="h-px w-12 bg-cranberry/25" />
        </div>
      </div>

      {/* Board Members Cards Container: Carousel on Mobile, Grid on Desktop */}
      <div
        ref={trackRef}
        role="region"
        aria-label="Comisión Directiva Actual"
        tabIndex={0}
        className="relative z-10 carousel-track flex sm:grid overflow-x-auto sm:overflow-x-visible gap-6 sm:gap-x-6 sm:gap-y-10 sm:grid-cols-2 lg:grid-cols-4 pb-6 sm:pb-0 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth snap-x snap-mandatory sm:snap-none"
      >
        {boardMembersData.map((member) => (
          <div
            key={member.id}
            className="min-w-[82vw] max-w-[310px] sm:min-w-0 sm:max-w-none sm:w-full shrink-0 sm:shrink snap-start group relative bg-white rounded-3xl overflow-visible border border-cranberry/15 shadow-md hover:shadow-2xl hover:border-cranberry/40 hover:-translate-y-1.5 transition-all duration-500 flex flex-col p-2.5"
          >
            {/* Lanyard grommet */}
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 z-20 w-4 h-4 rounded-full bg-white border-2 border-cranberry/35 group-hover:border-cranberry transition-colors duration-500" />
            <span className="absolute -top-1 left-1/2 -translate-x-1/2 z-20 w-1.5 h-1.5 rounded-full bg-cranberry/60" />

            <div className="rounded-2xl overflow-hidden flex flex-col flex-grow bg-gradient-to-b from-gray-50 to-white border border-gray-100">
              {/* Portrait */}
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-900">
                <img
                  src={member.image}
                  alt={`${member.name} - ${member.role}`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-gray-950/75 via-gray-950/20 to-transparent" />

                {/* Floating role badge over bottom of portrait */}
                <div className="absolute bottom-3 left-3 right-3 flex justify-center">
                  <span
                    className={`px-3.5 py-1 rounded-full text-[11px] font-montserrat font-bold tracking-[0.14em] uppercase shadow-md border border-white/20 ${member.badgeColor}`}
                  >
                    {member.role}
                  </span>
                </div>
              </div>

              {/* Name & Period */}
              <div className="px-5 py-4 text-center bg-white">
                <h4 className="text-lg sm:text-xl font-garet text-gray-900 group-hover:text-cranberry transition-colors">
                  {member.name}
                </h4>
                <p className="font-montserrat text-[11px] text-gray-500 font-medium mt-0.5">
                  Junta Directiva · {boardPeriod.replace('Período ', '')}
                </p>
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