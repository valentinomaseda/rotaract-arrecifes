import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export const CurrentProject = () => {
  const [textRef, textVisible] = useScrollAnimation({ threshold: 0.15 });
  const [imageRef, imageVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      className="relative bg-white py-24 md:py-32 px-6 lg:px-8 overflow-hidden"
      aria-labelledby="current-project-title"
    >
      {/* Decorative blob */}
      <div
        className="blob-decoration w-[450px] h-[450px] bg-cranberry/5 top-0 left-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

        {/* ── Columna de Texto ── */}
        <div
          ref={textRef}
          className={`lg:col-span-5 space-y-8 text-center lg:text-left order-2 lg:order-1 transition-all duration-800 ${
            textVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        >
          {/* Tag + título */}
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 text-cranberry font-montserrat font-semibold tracking-wider uppercase text-xs">
              <span className="w-6 h-0.5 bg-cranberry rounded-full" aria-hidden="true" />
              Proyecto Destacado
              <span className="w-6 h-0.5 bg-cranberry rounded-full" aria-hidden="true" />
            </span>
            <h2
              id="current-project-title"
              className="text-3xl md:text-5xl font-garet text-gray-900 leading-tight"
            >
              Colecta Anual de Alimentos
            </h2>
          </div>

          <p className="text-gray-500 font-montserrat leading-relaxed text-lg">
            Estamos reuniendo alimentos no perecederos para abastecer a comedores comunitarios de la ciudad durante los meses de invierno. Tu aporte hace la diferencia directa en nuestra comunidad.
          </p>

          {/* Progress bar decorativa */}
          <div className="space-y-2 text-left">
            <div className="flex justify-between font-montserrat text-sm">
              <span className="text-gray-600 font-medium">Meta de recolección</span>
              <span className="text-cranberry font-semibold">68%</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r from-cranberry to-pink-400 rounded-full transition-all duration-1500 ease-out ${
                  textVisible ? 'w-[68%]' : 'w-0'
                }`}
                style={{ transitionDelay: '400ms' }}
              />
            </div>
            <p className="font-montserrat text-xs text-gray-400">340 kg reunidos de 500 kg objetivo</p>
          </div>

          {/* CTA */}
          <div className="pt-2 flex justify-center lg:justify-start">
            <a
              href="https://forms.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border-2 border-cranberry/30 text-cranberry font-montserrat font-semibold hover:bg-cranberry hover:text-white hover:border-cranberry hover:shadow-lg hover:shadow-cranberry/25 transition-all duration-300 group"
              aria-label="Participar en la colecta (Abre en nueva pestaña)"
            >
              Quiero colaborar
              <svg
                className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1"
                fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* ── Columna de Imagen ── */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <div
            ref={imageRef}
            className={`relative transition-all duration-900 ${
              imageVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
          >
            {/* Decorative background card */}
            <div
              className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl bg-cranberry/8 z-0"
              aria-hidden="true"
            />
            <div className="relative z-10 w-full rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/projects/current/colecta.jpg"
                alt="Voluntarios organizando la colecta de alimentos"
                loading="lazy"
                className="w-full aspect-square md:aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              {/* Badge flotante sobre imagen */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-lg">
                  <p className="font-montserrat text-xs text-gray-500 uppercase tracking-wider">Estado</p>
                  <p className="font-garet text-sm text-cranberry font-bold">En progreso</p>
                </div>
                <div className="bg-cranberry/90 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-lg text-white">
                  <p className="font-montserrat text-xs uppercase tracking-wider opacity-80">Invierno</p>
                  <p className="font-garet text-sm font-bold">2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};