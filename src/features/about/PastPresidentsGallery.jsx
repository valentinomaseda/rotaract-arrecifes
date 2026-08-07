import React from 'react';
import { pastPresidentsData } from '../../data/aboutData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export const PastPresidentsGallery = () => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <div className="py-16 border-t border-gray-100">
      {/* Section Header */}
      <div
        ref={ref}
        className={`text-center max-w-3xl mx-auto mb-16 space-y-4 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
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
      </div>

      {/* Presidents Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
              className={`group relative bg-white rounded-3xl overflow-hidden border transition-all duration-500 card-hover flex flex-col justify-between ${
                isCurrent ? 'border-emerald-200 shadow-md ring-2 ring-emerald-500/20' : 'border-gray-100 shadow-sm hover:shadow-xl'
              }`}
            >
              {/* Top Photo & Badges */}
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                  src={president.image}
                  alt={`Presidente ${president.name}`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Status / Multi-term indicator badge (Top Left) */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
                  {isCurrent && (
                    <span className="px-3 py-1 bg-emerald-600 text-white rounded-full text-xs font-montserrat font-bold shadow-md flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      En curso
                    </span>
                  )}
                  {isMultiTerm && (
                    <span className="px-3 py-1 bg-amber-500 text-white rounded-full text-xs font-montserrat font-bold shadow-md flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      {periodList.length} Gestiones
                    </span>
                  )}
                </div>

                {/* Period badges list (Top Right) */}
                <div className="absolute top-4 right-4 flex flex-col items-end gap-1.5">
                  {periodList.map((per, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 rounded-full text-xs font-montserrat font-semibold shadow-md ${
                        isCurrent && idx === periodList.length - 1
                          ? 'bg-emerald-600 text-white'
                          : 'bg-cranberry text-white'
                      }`}
                    >
                      {per}
                    </span>
                  ))}
                </div>

                {/* Name at bottom of photo */}
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <h4 className="text-2xl font-garet drop-shadow-md">
                    {president.name}
                  </h4>
                  <p className="text-xs font-montserrat text-gray-200 mt-1 flex items-center gap-1.5">
                    {isCurrent ? (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        Presidente Actual
                      </>
                    ) : (
                      'Ex Presidente Rotaract Arrecifes'
                    )}
                  </p>
                </div>
              </div>

              {/* Achievement / Legacy note */}
              <div className="p-6 bg-white flex-grow flex flex-col justify-between">
                <p className="text-gray-600 font-montserrat text-sm leading-relaxed">
                  {president.achievement}
                </p>

                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400 font-montserrat">
                  {isCurrent ? (
                    <span className="text-emerald-600 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Gestión en curso
                    </span>
                  ) : (
                    <span className="text-cranberry font-medium">
                      {isMultiTerm ? `${periodList.length} Períodos Cumplidos` : 'Período Cumplido'}
                    </span>
                  )}
                  <span className={`w-1.5 h-1.5 rounded-full ${isCurrent ? 'bg-emerald-500' : 'bg-cranberry'}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
