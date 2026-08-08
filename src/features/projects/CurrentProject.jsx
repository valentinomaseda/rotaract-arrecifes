import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const FORM_VOTACION_URL = 'https://forms.gle/Wtm3uDqYNu33eSUB7';

const ProjectCard = ({ badge, title, description, stats, cta, className = '' }) => {
  const [ref, visible] = useScrollAnimation({ threshold: 0.12 });

  return (
    <div
      ref={ref}
      className={`flex flex-col bg-gradient-to-b from-gray-50 via-white to-gray-50/50 rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-xl transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
    >
      {/* Badge */}
      <span className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full text-xs font-montserrat font-semibold tracking-widest uppercase bg-cranberry/10 text-cranberry border border-cranberry/20 mb-5">
        <span className="w-2 h-2 rounded-full bg-cranberry animate-pulse" aria-hidden="true" />
        {badge}
      </span>

      {/* Title */}
      <h3 className="font-garet text-2xl md:text-3xl text-gray-900 leading-tight mb-4">
        {title}
      </h3>

      {/* Description */}
      <p className="font-montserrat text-gray-600 leading-relaxed text-base md:text-lg mb-6 flex-grow">
        {description}
      </p>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm text-center">
              <span className={`block font-garet text-xl font-bold ${stat.color ?? 'text-cranberry'}`}>
                {stat.value}
              </span>
              <span className="text-xs font-montserrat text-gray-500">{stat.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="mt-auto">
        <a
          href={cta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-cranberry text-white font-montserrat font-semibold hover:bg-cranberry-dark shadow-lg shadow-cranberry/25 hover:shadow-xl hover:shadow-cranberry/35 transition-all duration-300 group"
          aria-label={cta.ariaLabel}
        >
          {cta.icon}
          {cta.label}
          <svg
            className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"
            fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export const CurrentProject = () => {
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.2 });

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

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-12 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        >
          <h2
            id="current-project-title"
            className="font-garet text-4xl md:text-5xl text-gray-900 mb-4"
          >
            Proyectos Actuales
          </h2>
          <p className="font-montserrat text-gray-500 text-lg max-w-xl mx-auto">
            Lo que estamos haciendo hoy para transformar Arrecifes.
          </p>
          <div className="h-px w-24 bg-cranberry/40 mx-auto mt-6 rounded-full" aria-hidden="true" />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

          <ProjectCard
            badge="En progreso"
            title="Tu Huella, No Tu Colilla"
            description="Instalación de 50 colilleros ecológicos en puntos estratégicos de Arrecifes. Buscamos reducir la contaminación, mejorar los espacios públicos y concientizar mediante códigos QR informativos."
            stats={[
              { value: '50', label: 'Colilleros Eco', color: 'text-cranberry' },
              { value: 'Activo', label: 'Estado', color: 'text-emerald-600' },
              { value: 'QR', label: 'Ed. Ambiental', color: 'text-cranberry' },
            ]}
            cta={{
              href: 'https://drive.google.com/file/d/1sWJZDwZ3C59xsntAB4VdBAK4M1R56G-Z/view?usp=sharing',
              label: 'Más información',
              ariaLabel: 'Saber más sobre Tu Huella, No Tu Colilla (abre en nueva pestaña)',
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
            }}
          />

          <ProjectCard
            badge="¡Nuevo · 2026!"
            title="Ciclo de Capacitaciones"
            description="Una vez al mes, en nuestra última reunión, traemos a un orador invitado para compartir su experiencia y conocimiento con toda la comunidad. ¿Qué temáticas te gustaría que abordemos? ¡Votá y ayudanos a definir los próximos encuentros!"
            stats={[
              { value: '1/mes', label: 'Frecuencia', color: 'text-cranberry' },
              { value: '🎤', label: 'Orador invitado', color: 'text-gray-700' },
              { value: 'Abierto', label: 'A todos', color: 'text-emerald-600' },
            ]}
            cta={{
              href: FORM_VOTACION_URL,
              label: 'Votá las temáticas',
              ariaLabel: 'Votar temáticas del Ciclo de Capacitaciones (abre en nueva pestaña)',
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              ),
            }}
          />

          <ProjectCard
            className="md:col-span-2 max-w-3xl mx-auto w-full"
            badge="En progreso"
            title="Banco de Elementos Ortopédicos"
            description="Proyecto destinado a fortalecer y renovar el banco de elementos ortopédicos de Rotary mediante la incorporación de sillas de ruedas, andadores, muletas, colchones antiescaras y otros elementos de apoyo, para facilitar el acceso a recursos esenciales a personas que los necesitan de manera temporal y promover su reutilización solidaria dentro de la comunidad."
            stats={[
              { value: '25', label: 'Elementos actuales', color: 'text-cranberry' },
              { value: '🏥', label: 'Rotary Club', color: 'text-gray-700' },
              { value: 'Activo', label: 'Recaudación', color: 'text-emerald-600' },
            ]}
            cta={{
              href: 'https://wa.me/5492478513553',
              label: 'Cómo colaborar',
              ariaLabel: 'Cómo colaborar con la renovación del banco de elementos ortopédicos',
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              ),
            }}
          />

        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px section-divider" aria-hidden="true" />
    </section>
  );
};