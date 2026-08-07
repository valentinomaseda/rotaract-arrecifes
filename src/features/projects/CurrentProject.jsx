import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export const CurrentProject = () => {
  const [contentRef, contentVisible] = useScrollAnimation({ threshold: 0.15 });

  return (
    <section
      id="proyecto-actual"
      className="scroll-mt-20 relative bg-white py-24 md:py-32 px-6 lg:px-8 overflow-hidden"
      aria-labelledby="current-project-title"
    >
      {/* Decorative blobs */}
      <div
        className="blob-decoration w-[500px] h-[500px] bg-cranberry/5 top-0 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div
          ref={contentRef}
          className={`bg-gradient-to-b from-gray-50 via-white to-gray-50/50 rounded-3xl p-8 sm:p-12 md:p-16 border border-gray-100 shadow-xl transition-all duration-800 space-y-8 text-center ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        >
          {/* Tag & Title */}
          <div className="space-y-4 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-montserrat font-semibold tracking-widest uppercase bg-cranberry/10 text-cranberry border border-cranberry/20">
              <span className="w-2 h-2 rounded-full bg-cranberry animate-pulse" />
              Proyecto Destacado
            </span>

            <h2
              id="current-project-title"
              className="text-3xl md:text-5xl font-garet text-gray-900 leading-tight"
            >
              Tu Huella, No Tu Colilla
            </h2>
          </div>

          {/* Description */}
          <p className="text-gray-600 font-montserrat leading-relaxed text-lg md:text-xl max-w-3xl mx-auto">
            Iniciativa para la instalación de 50 colilleros ecológicos en puntos estratégicos de Arrecifes. Buscamos reducir la contaminación por colillas, mejorar la limpieza de los espacios públicos y concientizar a través de códigos QR informativos en cada dispositivo.
          </p>

          {/* Key Metric Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <span className="block font-garet text-2xl font-bold text-cranberry">50</span>
              <span className="text-xs font-montserrat text-gray-500">Colilleros Eco</span>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <span className="block font-garet text-2xl font-bold text-emerald-600">En Progreso</span>
              <span className="text-xs font-montserrat text-gray-500">Estado Actual</span>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <span className="block font-garet text-2xl font-bold text-cranberry">QR Activos</span>
              <span className="text-xs font-montserrat text-gray-500">Educación Ambiental</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-4 flex justify-center">
            <a
              href="https://drive.google.com/file/d/1sWJZDwZ3C59xsntAB4VdBAK4M1R56G-Z/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-cranberry text-white font-montserrat font-semibold hover:bg-cranberry-dark shadow-lg shadow-cranberry/25 hover:shadow-xl hover:shadow-cranberry/35 transition-all duration-300 group"
              aria-label="Saber más sobre el proyecto (Abre en nueva pestaña)"
            >
              Más Información
              <svg
                className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1"
                fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};