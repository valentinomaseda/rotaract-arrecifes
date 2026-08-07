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
        className={`text-center max-w-3xl mx-auto mb-16 space-y-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
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

      {/* Board Members Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
        {boardMembersData.map((member) => (
          <div
            key={member.id}
            className="group relative bg-white rounded-3xl overflow-visible border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col"
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
              <div className="px-6 pt-4 text-center">
                <h4 className="text-lg font-garet text-gray-900">
                  {member.name}
                </h4>
              </div>

              {/* Quote */}
              <div className="relative px-6 pt-3 pb-6 flex-grow">
                <span className="absolute top-1 left-4 text-5xl font-garet text-cranberry/10 select-none leading-none">
                  "
                </span>
                <p className="relative pl-3 text-gray-600 font-montserrat text-xs leading-relaxed italic">
                  {member.quote}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};