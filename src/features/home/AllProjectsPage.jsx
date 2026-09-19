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
      <div
        className="relative overflow-hidden text-white"
        style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #12071a 40%, #0f0a1a 70%, #080810 100%)' }}
      >
        {/* Blobs de luz */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-25"
            style={{ background: 'radial-gradient(ellipse, #d41367 0%, transparent 65%)', filter: 'blur(80px)' }} />
          <div className="absolute top-0 -right-20 w-[400px] h-[400px] rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, #e91e8c 0%, transparent 70%)', filter: 'blur(80px)' }} />
          <div className="absolute bottom-0 -left-20 w-[350px] h-[350px] rounded-full opacity-12"
            style={{ background: 'radial-gradient(circle, #6d28d9 0%, transparent 70%)', filter: 'blur(80px)' }} />
          {/* Grid sutil */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-14">
          {/* Breadcrumb adaptado al dark */}
          <nav className="flex items-center gap-2 text-sm font-montserrat text-white/30 mb-10" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white transition-colors duration-200">Inicio</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white/70 font-semibold">Proyectos</span>
          </nav>

          <div
            ref={headerRef}
            className={`max-w-3xl transition-all duration-800 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
          >
            {/* Badge glassmorphism */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-montserrat font-bold tracking-widest uppercase mb-5"
              style={{
                background: 'rgba(212,19,103,0.18)',
                border: '1px solid rgba(212,19,103,0.35)',
                backdropFilter: 'blur(12px)',
              }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cranberry opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cranberry" />
              </span>
              Nuestro impacto
            </span>

            <h1 className="font-garet text-5xl md:text-6xl leading-tight mb-6">
              Todos los{' '}
              <span style={{
                background: 'linear-gradient(90deg, #d41367, #ff6eb0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Proyectos</span>
            </h1>
            <p className="font-montserrat text-xl text-white/55 leading-relaxed max-w-2xl">
              Cada iniciativa representa el esfuerzo y dedicación de nuestros miembros para generar un impacto real y duradero en Arrecifes.
            </p>
          </div>

          {/* Stats bar — dark mode */}
          <div className="flex flex-wrap items-center gap-8 mt-10 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            {[
              { value: '+10', label: 'Proyectos totales' },
              { value: '+5', label: 'Años de impacto' },
            ].map(({ value, label }, i) => (
              <React.Fragment key={label}>
                {i > 0 && <div className="w-px h-10 hidden sm:block" style={{ background: 'rgba(255,255,255,0.08)' }} aria-hidden="true" />}
                <div className="flex flex-col">
                  <span className="font-garet text-3xl font-bold" style={{
                    background: 'linear-gradient(90deg, #d41367, #ff6eb0)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>{value}</span>
                  <span className="font-montserrat text-xs text-white/35 uppercase tracking-wider mt-0.5">{label}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Fade hacia la sección siguiente */}
        <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(10,10,15,0.5))' }} />
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
