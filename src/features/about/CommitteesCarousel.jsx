import React, { useRef, useState, useEffect } from 'react';
import { committeesData } from '../../data/aboutData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

// SVG Icons for each Committee
const CommitteeIcon = ({ name, className = "w-10 h-10" }) => {
  switch (name) {
    case 'Megaphone':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.684A1.761 1.761 0 013 12V8c0-.77.495-1.442 1.218-1.684l13.782-4.824A1.76 1.76 0 0120 3.168v13.664a1.76 1.76 0 01-2 1.684L5.436 13.684z" />
        </svg>
      );
    case 'Sparkles':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      );
    case 'Users':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    case 'DollarSign':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V6m0 12v-2m0 0c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'Leaf':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'Globe':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      );
    case 'Heart':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      );
    case 'HandsHolding':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
    case 'Briefcase':
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    default:
      return null;
  }
};

// Gradient mapping for committee headers
const gradients = [
  "from-pink-500 via-rose-500 to-cranberry",
  "from-purple-500 via-indigo-500 to-blue-600",
  "from-blue-500 via-sky-500 to-teal-500",
  "from-emerald-500 via-teal-600 to-green-600",
  "from-green-500 via-emerald-600 to-teal-700",
  "from-cyan-500 via-blue-600 to-indigo-700",
  "from-rose-400 via-pink-500 to-red-500",
  "from-amber-400 via-orange-500 to-rose-500",
  "from-violet-500 via-purple-600 to-indigo-700",
];

export const CommitteesCarousel = () => {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });

  // Update active dot on scroll
  const handleScroll = () => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const scrollPosition = track.scrollLeft;
    const cardWidth = track.firstElementChild?.getBoundingClientRect().width || 320;
    const index = Math.round(scrollPosition / (cardWidth + 24));
    setActiveIndex(Math.min(Math.max(0, index), committeesData.length - 1));
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
    const newIndex = (activeIndex + 1) % committeesData.length;
    scrollToIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (activeIndex - 1 + committeesData.length) % committeesData.length;
    scrollToIndex(newIndex);
  };

  return (
    <div className="py-16 border-t border-gray-100 bg-gradient-to-b from-white via-gray-50/50 to-white">
      {/* Section Header */}
      <div
        ref={ref}
        className={`flex flex-col md:flex-row md:items-end justify-between max-w-6xl mx-auto mb-12 space-y-4 md:space-y-0 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
      >
        <div className="space-y-3">
          <span className="inline-block text-xs font-montserrat font-semibold tracking-[0.2em] uppercase text-cranberry">
            Estructura Operativa
          </span>
          <h3 className="text-3xl md:text-4xl font-garet text-gray-900">
            Nuestros Comités de Trabajo
          </h3>
          <p className="text-gray-600 font-montserrat text-base max-w-xl">
            Cada comité impulsa iniciativas específicas coordinando esfuerzos en beneficio del club y la comunidad.
          </p>
        </div>

        {/* Carousel controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={prevSlide}
            aria-label="Comité anterior"
            className="w-12 h-12 rounded-full border border-gray-200 bg-white text-gray-700 hover:text-cranberry hover:border-cranberry hover:shadow-lg transition-all duration-300 flex items-center justify-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            aria-label="Comité siguiente"
            className="w-12 h-12 rounded-full bg-cranberry text-white hover:bg-cranberry-dark hover:shadow-lg transition-all duration-300 flex items-center justify-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mini Carousel Track */}
      <div
        ref={trackRef}
        className="carousel-track flex gap-6 overflow-x-auto pb-8 pt-2 px-4 md:px-0 max-w-6xl mx-auto scroll-smooth"
      >
        {committeesData.map((committee, idx) => {
          const gradient = gradients[idx % gradients.length];

          return (
            <div
              key={committee.id}
              className={`min-w-[290px] sm:min-w-[340px] md:min-w-[360px] group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 card-hover flex flex-col justify-between ${idx === activeIndex ? 'ring-2 ring-cranberry/30' : ''
                }`}
            >
              {/* Committee Icon Header (Gradient Box + Icon) */}
              <div className={`relative h-44 p-6 bg-gradient-to-br ${gradient} text-white flex flex-col justify-between overflow-hidden`}>
                {/* Background decorative circle */}
                <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none" />

                <div className="flex items-center justify-between z-10">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-montserrat font-semibold text-white shadow-sm border border-white/30">
                    {committee.category}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <CommitteeIcon name={committee.icon} className="w-6 h-6" />
                  </div>
                </div>

                <h4 className="text-2xl font-garet text-white drop-shadow-md z-10">
                  {committee.name}
                </h4>
              </div>

              {/* Description & Tags */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
                <p className="text-gray-600 font-montserrat text-sm leading-relaxed">
                  {committee.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {committeesData.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToIndex(idx)}
            aria-label={`Ir al comité ${idx + 1}`}
            className={`transition-all duration-300 rounded-full ${idx === activeIndex
                ? 'w-8 h-2.5 bg-cranberry'
                : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
              }`}
          />
        ))}
      </div>
    </div>
  );
};
