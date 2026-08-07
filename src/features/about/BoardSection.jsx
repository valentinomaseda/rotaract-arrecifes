import React from 'react';
import { boardMembersData, boardPeriod } from '../../data/aboutData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export const BoardSection = () => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <div className="py-12 border-t border-gray-100">
      {/* Section Header */}
      <div
        ref={ref}
        className={`text-center max-w-3xl mx-auto mb-16 space-y-4 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
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
      </div>

      {/* Board Members Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {boardMembersData.map((member) => (
          <div
            key={member.id}
            className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 card-hover flex flex-col justify-between"
          >
            {/* Top image container with zoom effect */}
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
              <img
                src={member.image}
                alt={`${member.name} - ${member.role}`}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
              
              {/* Role badge top left */}
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-montserrat font-semibold shadow-md ${member.badgeColor}`}>
                  {member.role}
                </span>
              </div>

              {/* Name overlaid at bottom of photo */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h4 className="text-xl font-garet drop-shadow-md">
                  {member.name}
                </h4>
              </div>
            </div>

            {/* Card Content & Quote */}
            <div className="p-6 bg-white flex-grow flex flex-col justify-between">
              <div className="relative pl-4 border-l-2 border-cranberry/40 italic text-gray-600 font-montserrat text-xs leading-relaxed">
                "{member.quote}"
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400 font-montserrat">
                <span>Rotaract Club Arrecifes</span>
                <span className="w-2 h-2 rounded-full bg-cranberry/60" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
