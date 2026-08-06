import React from 'react';
import { ProjectCard } from './ProjectCard';
import { projectsData } from '../../data/projectsData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export const PastProjects = () => {
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.2 });

  return (
    <section
      className="relative bg-gray-50 py-24 md:py-32 px-6 lg:px-8 overflow-hidden"
      aria-labelledby="past-projects-title"
    >
      {/* Decorative blobs */}
      <div className="blob-decoration w-[400px] h-[400px] bg-cranberry/4 -top-20 -left-20" aria-hidden="true" />
      <div className="blob-decoration w-[300px] h-[300px] bg-cranberry/3 bottom-0 right-0" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-16">

        {/* Cabecera */}
        <div
          ref={headerRef}
          className={`flex flex-col md:flex-row justify-between items-start md:items-end gap-8 transition-all duration-800 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        >
          <div className="max-w-2xl space-y-4">
            <span className="inline-block text-xs font-montserrat font-semibold tracking-[0.2em] uppercase text-cranberry">
              Lo que hemos logrado
            </span>
            <h2 id="past-projects-title" className="text-4xl md:text-5xl font-garet text-gray-900">
              Nuestros Proyectos
            </h2>
            <p className="text-lg text-gray-500 font-montserrat leading-relaxed">
              Conoce algunas de las iniciativas que hemos llevado a cabo para generar un impacto positivo en nuestra ciudad.
            </p>
          </div>

          {/* Decorative counter */}
          <div className="flex-shrink-0 bg-white rounded-2xl px-8 py-5 border border-gray-100 shadow-sm text-center">
            <span className="block font-garet text-4xl text-cranberry font-bold">{projectsData.length}</span>
            <span className="block font-montserrat text-xs text-gray-500 uppercase tracking-wider mt-1">Proyectos</span>
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider" aria-hidden="true" />

        {/* Grid de tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
};