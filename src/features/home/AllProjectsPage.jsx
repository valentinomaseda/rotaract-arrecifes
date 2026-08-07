import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ProjectCard } from '../projects/ProjectCard';
import { projectsData } from '../../data/projectsData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export const AllProjectsPage = () => {
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.1 });
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">

      {/* Hero de la página */}
      <div className="relative bg-white overflow-hidden">
        {/* Decorative blobs */}
        <div className="blob-decoration w-[500px] h-[500px] bg-cranberry/5 -top-40 -right-40" aria-hidden="true" />
        <div className="blob-decoration w-[300px] h-[300px] bg-cranberry/4 top-20 -left-20" aria-hidden="true" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm font-montserrat text-gray-400 mb-8" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-cranberry transition-colors duration-200">Inicio</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-700 font-semibold">Proyectos</span>
          </nav>

          <div
            ref={headerRef}
            className={`max-w-3xl transition-all duration-800 ${
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
          >
            <span className="inline-block text-xs font-montserrat font-semibold tracking-[0.2em] uppercase text-cranberry mb-4">
              Nuestro impacto
            </span>
            <h1 className="font-garet text-5xl md:text-6xl text-gray-900 leading-tight mb-6">
              Todos los{' '}
              <span className="text-gradient-animated">Proyectos</span>
            </h1>
            <p className="font-montserrat text-xl text-gray-500 leading-relaxed max-w-2xl">
              Cada iniciativa representa el esfuerzo y dedicación de nuestros miembros para generar un impacto real y duradero en Arrecifes.
            </p>
          </div>

          {/* Stats bar */}
          <div className="flex flex-wrap items-center gap-8 mt-10 pt-8 border-t border-gray-100">
            <div className="flex flex-col">
              <span className="font-garet text-3xl text-cranberry font-bold">{projectsData.length}</span>
              <span className="font-montserrat text-xs text-gray-400 uppercase tracking-wider mt-0.5">Proyectos totales</span>
            </div>
            <div className="w-px h-10 bg-gray-200 hidden sm:block" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="font-garet text-3xl text-cranberry font-bold">+500</span>
              <span className="font-montserrat text-xs text-gray-400 uppercase tracking-wider mt-0.5">Personas beneficiadas</span>
            </div>
            <div className="w-px h-10 bg-gray-200 hidden sm:block" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="font-garet text-3xl text-cranberry font-bold">5+</span>
              <span className="font-montserrat text-xs text-gray-400 uppercase tracking-wider mt-0.5">Años de impacto</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider" aria-hidden="true" />
      </div>

      {/* Grid de proyectos */}
      <div className="bg-gray-50 py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projectsData.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>

          {/* Volver a la sección proyectos en home */}
          <div className="flex justify-center mt-16 pt-10 border-t border-gray-200">
            <button
              onClick={() => navigate('/', { state: { scrollTo: 'proyectos' } })}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white border border-gray-200 text-gray-700 font-montserrat font-semibold text-base shadow-sm hover:border-cranberry hover:text-cranberry hover:shadow-md transition-all duration-300"
            >
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 text-gray-600 group-hover:bg-cranberry/10 group-hover:text-cranberry transition-all duration-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
              </span>
              Volver a proyectos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
