import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projectsData } from '../../data/projectsData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

// Galería de imágenes con lightbox simple
const GalleryView = ({ images, title }) => {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-4">
      {/* Imagen principal */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl bg-gray-100">
        <img
          key={active}
          src={images[active]}
          alt={`${title} - foto ${active + 1}`}
          className="w-full h-full object-cover animate-fade-in"
        />
        {/* Flechas */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setActive((p) => (p - 1 + images.length) % images.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-gray-700 hover:text-cranberry hover:border-cranberry border border-transparent transition-all duration-200"
              aria-label="Foto anterior"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
              onClick={() => setActive((p) => (p + 1) % images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-gray-700 hover:text-cranberry border border-transparent hover:border-cranberry transition-all duration-200"
              aria-label="Foto siguiente"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
            </button>
            {/* Indicador */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${i === active ? 'bg-white w-5' : 'bg-white/50'}`}
                  aria-label={`Ir a foto ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto pb-1">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`flex-none w-20 h-14 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
              i === active ? 'border-cranberry shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
            aria-label={`Ver foto ${i + 1}`}
          >
            <img src={src} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

export const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projectsData.find((p) => p.id === id);
  const [headerRef, headerVisible] = useScrollAnimation({ threshold: 0.1 });

  // Proyecto no encontrado
  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6">
        <span className="font-garet text-7xl text-cranberry font-bold">404</span>
        <p className="font-montserrat text-gray-500 text-xl text-center">No encontramos ese proyecto.</p>
        <button
          onClick={() => navigate('/proyectos')}
          className="btn-cranberry text-white px-6 py-3 rounded-full font-montserrat font-semibold"
        >
          Ver todos los proyectos
        </button>
      </div>
    );
  }

  const paragraphs = project.longDescription.split('\n\n');

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <div className="relative bg-white overflow-hidden">
        <div className="blob-decoration w-[400px] h-[400px] bg-cranberry/5 -top-32 -right-32" aria-hidden="true" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm font-montserrat text-gray-400 mb-8 flex-wrap" aria-label="Breadcrumb">
            <button onClick={() => navigate('/')} className="hover:text-cranberry transition-colors duration-200 bg-transparent border-0 p-0 cursor-pointer">
              Inicio
            </button>
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <button onClick={() => navigate('/proyectos')} className="hover:text-cranberry transition-colors duration-200 bg-transparent border-0 p-0 cursor-pointer">
              Proyectos
            </button>
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            <span className="text-gray-700 font-semibold truncate max-w-[200px]">{project.title}</span>
          </nav>

          <div
            ref={headerRef}
            className={`transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
          >
            {/* Category + date */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cranberry/10 px-3 py-1 text-xs font-montserrat font-semibold text-cranberry">
                {project.category}
              </span>
              <span className="text-sm font-montserrat text-gray-400">{project.date}</span>
            </div>

            <h1 className="font-garet text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-tight mb-4 max-w-3xl">
              {project.title}
            </h1>
            <p className="font-montserrat text-xl text-gray-500 max-w-2xl leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>
        <div className="section-divider" aria-hidden="true" />
      </div>

      {/* ── Contenido principal ── */}
      <div className="bg-gray-50 py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* Galería */}
            <div className="lg:col-span-7">
              {(() => {
                const allImages = project.imageUrl
                  ? [project.imageUrl, ...(project.images ?? []).filter(img => img !== project.imageUrl)]
                  : (project.images ?? []);
                return allImages.length > 0
                  ? <GalleryView images={allImages} title={project.title} />
                  : null;
              })()}
            </div>

            {/* Info lateral */}
            <div className="lg:col-span-5 space-y-8">

              {/* Stats cards */}
              {project.stats?.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                  <h2 className="font-garet text-lg text-gray-900">Impacto del proyecto</h2>
                  <div className="divide-y divide-gray-100">
                    {project.stats.map((stat) => (
                      <div key={stat.label} className="flex items-center justify-between py-3">
                        <span className="font-montserrat text-sm text-gray-500">{stat.label}</span>
                        <span className="font-garet text-xl text-cranberry font-bold">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Descripción completa */}
              <div className="space-y-4">
                <h2 className="font-garet text-2xl text-gray-900">Sobre el proyecto</h2>
                {paragraphs.map((para, i) => (
                  <p key={i} className="font-montserrat text-gray-500 leading-relaxed text-base">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* ── Volver ── */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16 pt-10 border-t border-gray-200">
            <button
              onClick={() => navigate('/proyectos')}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white border border-gray-200 text-gray-700 font-montserrat font-semibold text-base shadow-sm hover:border-cranberry hover:text-cranberry hover:shadow-md transition-all duration-300"
            >
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 text-gray-600 group-hover:bg-cranberry/10 group-hover:text-cranberry transition-all duration-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
              </span>
              Ver todos los proyectos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
