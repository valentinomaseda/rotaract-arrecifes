import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

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
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cranberry/8 text-cranberry mb-6 group-hover:bg-cranberry group-hover:text-white transition-all duration-400">
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
      className="relative bg-gray-50 py-24 md:py-32 px-6 lg:px-8 overflow-hidden"
      aria-labelledby="about-us-title"
    >
      {/* Decorative blob */}
      <div
        className="blob-decoration w-[500px] h-[500px] bg-cranberry/4 -bottom-40 -right-40"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto space-y-20">

        {/* Cabecera */}
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto space-y-5 transition-all duration-800 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        >
          <span className="inline-block text-xs font-montserrat font-semibold tracking-[0.2em] uppercase text-cranberry mb-2">
            Nuestra organización
          </span>
          <h2 id="about-us-title" className="text-4xl md:text-5xl font-garet text-gray-900">
            Quiénes Somos
          </h2>
          <p className="text-xl text-gray-500 font-montserrat leading-relaxed">
            Formados por jóvenes líderes que intercambian ideas, adquieren nuevas habilidades profesionales y desarrollan proyectos para beneficiar a Arrecifes.
          </p>
        </div>

        {/* Value cards grid */}
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

      </div>
    </section>
  );
};