import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

// Se espera que el prop 'project' tenga: { id, title, description, imageUrl, date, category }
export const ProjectCard = ({ project, index = 0 }) => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.08 });
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/proyectos/${project.id}`);
  };

  return (
    <article
      ref={ref}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      aria-label={`Ver detalles del proyecto: ${project.title}`}
      className={`group flex flex-col bg-white rounded-2xl overflow-hidden card-hover border border-gray-100/80 transition-all duration-700 cursor-pointer select-none ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Imagen */}
      <div className="relative w-full aspect-video overflow-hidden bg-gray-100">
        <img
          src={project.imageUrl}
          alt={`Imagen del proyecto: ${project.title}`}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-cranberry/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Date badge */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/95 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-sm max-w-[45%]">
          <span className="font-montserrat text-[10px] sm:text-xs font-semibold text-gray-700 uppercase tracking-wider truncate block">
            {project.date}
          </span>
        </div>

        {/* Category badge */}
        {project.category && (
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-cranberry/90 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-sm max-w-[45%]">
            <span className="font-montserrat text-[10px] sm:text-xs font-semibold text-white uppercase tracking-wider truncate block">
              {project.category}
            </span>
          </div>
        )}

        {/* Arrow icon on hover */}
        <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-md transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out">
          <svg className="w-5 h-5 text-cranberry" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>

      {/* Contenido */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-garet text-xl text-gray-900 mb-3 group-hover:text-cranberry transition-colors duration-300 leading-snug">
          {project.title}
        </h3>
        <p className="font-montserrat text-gray-500 leading-relaxed text-sm line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* Ver más inline */}
        <div className="flex items-center gap-2 mt-4 text-cranberry font-montserrat text-sm font-semibold opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
          Ver proyecto
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </div>

        {/* Bottom accent line */}
        <div className="mt-3 h-0.5 w-8 bg-cranberry/30 rounded-full group-hover:w-full transition-all duration-500 ease-out" />
      </div>
    </article>
  );
};