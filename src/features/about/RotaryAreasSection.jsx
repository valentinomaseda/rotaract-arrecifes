import React, { useRef, useState, useEffect } from 'react';
import { rotaryAreasData } from '../../data/aboutData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

// SVG Icons for Rotary 7 Areas of Focus
const AreaIcon = ({ name, className = "w-6 h-6" }) => {
  switch (name) {
    case 'Peace':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      );
    case 'Health':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      );
    case 'Water':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
        </svg>
      );
    case 'Family':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    case 'Education':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      );
    case 'Economy':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      );
    case 'Leaf':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      );
    default:
      return null;
  }
};

export const RotaryAreasSection = () => {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });

  const handleScroll = () => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const scrollPosition = track.scrollLeft;
    const cardWidth = track.firstElementChild?.getBoundingClientRect().width || 320;
    const index = Math.round(scrollPosition / (cardWidth + 24));
    setActiveIndex(Math.min(Math.max(0, index), rotaryAreasData.length - 1));
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
    const cardWidth = track.firstElementChild?.getBoundingClientRect().width || 320;
    const targetScroll = index * (cardWidth + 24);
    track.scrollTo({ left: targetScroll, behavior: 'smooth' });
    setActiveIndex(index);
  };

  const nextSlide = () => {
    const newIndex = (activeIndex + 1) % rotaryAreasData.length;
    scrollToIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (activeIndex - 1 + rotaryAreasData.length) % rotaryAreasData.length;
    scrollToIndex(newIndex);
  };

  return (
    <div className="py-12 border-t border-gray-100">
      {/* Section Header with Navigation Controls */}
      <div
        ref={ref}
        className={`flex flex-col md:flex-row md:items-end justify-between max-w-6xl mx-auto mb-12 space-y-4 md:space-y-0 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-montserrat font-semibold uppercase tracking-wider bg-cranberry/10 text-cranberry">
            <span className="w-2 h-2 rounded-full bg-cranberry animate-pulse" />
            Rotary International
          </span>
          <h3 className="text-3xl md:text-4xl font-garet text-gray-900">
            Las 7 Áreas de Interés
          </h3>
          <p className="text-gray-600 font-montserrat text-base max-w-xl">
            Nuestras causas y proyectos locales en Arrecifes se alinean con los ejes estratégicos globales de Rotary International.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={prevSlide}
            aria-label="Área anterior"
            className="w-12 h-12 rounded-full border border-gray-200 bg-white text-gray-700 hover:text-cranberry hover:border-cranberry hover:shadow-lg transition-all duration-300 flex items-center justify-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            aria-label="Área siguiente"
            className="w-12 h-12 rounded-full bg-cranberry text-white hover:bg-cranberry-dark hover:shadow-lg transition-all duration-300 flex items-center justify-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Carousel Track */}
      <div
        ref={trackRef}
        className="carousel-track flex gap-6 overflow-x-auto pb-8 pt-2 px-4 md:px-0 max-w-6xl mx-auto scroll-smooth"
      >
        {rotaryAreasData.map((area, index) => (
          <div
            key={area.id}
            className={`min-w-[290px] sm:min-w-[340px] md:min-w-[360px] group relative bg-white rounded-3xl p-7 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 card-hover flex flex-col justify-between ${
              index === activeIndex ? 'ring-2 ring-cranberry/30' : ''
            }`}
          >
            {/* Top gradient highlight */}
            <div className={`absolute top-0 left-6 right-6 h-1 rounded-b-full bg-gradient-to-r ${area.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />

            <div>
              {/* Number & Icon Header */}
              <div className="flex items-center justify-between mb-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${area.color} text-white flex items-center justify-center shadow-md transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <AreaIcon name={area.icon} className="w-6 h-6" />
                </div>
                <span className="text-3xl font-garet font-bold text-gray-200 group-hover:text-cranberry/30 transition-colors duration-300">
                  {area.number}
                </span>
              </div>

              {/* Title & Description */}
              <h4 className="text-xl font-garet text-gray-900 mb-3 group-hover:text-cranberry transition-colors duration-300">
                {area.title}
              </h4>
              <p className="text-gray-500 font-montserrat text-sm leading-relaxed">
                {area.description}
              </p>
            </div>

            {/* Bottom Accent Badge */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-montserrat font-medium text-gray-400">
              <span className="text-cranberry font-semibold">{area.shortTitle}</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {rotaryAreasData.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToIndex(idx)}
            aria-label={`Ir al área de interés ${idx + 1}`}
            className={`transition-all duration-300 rounded-full ${
              idx === activeIndex
                ? 'w-8 h-2.5 bg-cranberry'
                : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
