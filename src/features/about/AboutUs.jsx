import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { youthIdentityData } from '../../data/aboutData';
import { RotaryAreasSection } from './RotaryAreasSection';
import { BoardSection } from './BoardSection';
import { CommitteesCarousel } from './CommitteesCarousel';
import { PastPresidentsGallery } from './PastPresidentsGallery';

// Íconos SVG inline para cada valor
const icons = {
  Misión: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Visión: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  Valores: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
};

const ValueCard = ({ title, description, delay }) => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`group relative bg-white rounded-2xl p-8 border border-gray-100 card-hover transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Accent top line */}
      <div className="absolute top-0 left-8 right-8 h-0.5 rounded-b-full bg-gradient-to-r from-cranberry/0 via-cranberry to-cranberry/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

      {/* Icon */}
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cranberry/10 text-cranberry mb-6 group-hover:bg-cranberry group-hover:text-white transition-all duration-400">
        {icons[title]}
      </div>

      <h3 className="text-2xl font-garet text-gray-900 mb-4">{title}</h3>

      <p className="font-montserrat text-gray-500 leading-relaxed text-sm">
        {description}
      </p>

      {/* Bottom accent */}
      <div className="mt-6 w-8 h-0.5 bg-cranberry/30 rounded-full group-hover:w-16 transition-all duration-400" />
    </div>
  );
};

const values = [
  {
    title: 'Misión',
    description:
      'Brindar oportunidades a los jóvenes para aumentar sus conocimientos y habilidades, a fin de contribuir a su desarrollo personal y promover mejores relaciones.',
  },
  {
    title: 'Visión',
    description:
      'Ser reconocidos como una organización líder de jóvenes que fomenta el cambio positivo a través de acciones solidarias y el desarrollo continuo del liderazgo.',
  },
  {
    title: 'Valores',
    description:
      'Compañerismo, integridad, diversidad, servicio y liderazgo son los pilares fundamentales que guían cada una de nuestras acciones y proyectos.',
  },
];

export const AboutUs = () => {
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.2 });

  return (
    <section
      id="quienes-somos"
      className="scroll-mt-20 relative bg-gray-50 py-24 md:py-32 px-6 lg:px-8 overflow-hidden"
      aria-labelledby="about-us-title"
    >
      {/* Decorative blobs */}
      <div
        className="blob-decoration w-[500px] h-[500px] bg-cranberry/5 -bottom-40 -right-40"
        aria-hidden="true"
      />
      <div
        className="blob-decoration w-[400px] h-[400px] bg-blue-500/5 top-20 -left-40"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto space-y-24">

        {/* Header Principal con énfasis en jóvenes 18-30 */}
        <div
          ref={headerRef}
          className={`text-center max-w-4xl mx-auto space-y-6 transition-all duration-800 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-montserrat font-semibold uppercase tracking-widest bg-cranberry/10 text-cranberry border border-cranberry/20">
            <span className="w-2 h-2 rounded-full bg-cranberry animate-pulse" />
            {youthIdentityData.badge}
          </div>

          <h2 id="about-us-title" className="text-4xl md:text-5xl lg:text-6xl font-garet text-gray-900 leading-tight">
            {youthIdentityData.title}
          </h2>

          <p className="text-lg md:text-xl text-gray-600 font-montserrat leading-relaxed max-w-3xl mx-auto">
            {youthIdentityData.description}
          </p>

          {/* Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 max-w-3xl mx-auto">
            {youthIdentityData.stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
                <span className="block text-2xl md:text-3xl font-garet text-cranberry font-bold">
                  {stat.value}
                </span>
                <span className="text-xs font-montserrat text-gray-500 mt-1 block">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Value cards grid (Misión, Visión, Valores) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {values.map((v, i) => (
            <ValueCard
              key={v.title}
              title={v.title}
              description={v.description}
              delay={i * 120}
            />
          ))}
        </div>

        {/* 7 Áreas de Interés de Rotary */}
        <RotaryAreasSection />

        {/* Comisión Directiva Actual */}
        <BoardSection />

        {/* Mini Carrusel de Comités */}
        <CommitteesCarousel />

        {/* Galería de Presidentes */}
        <PastPresidentsGallery />

      </div>
    </section>
  );
};