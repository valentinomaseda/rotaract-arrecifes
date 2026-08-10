import React, { useState, useMemo } from 'react';
import { jobsData } from '../../data/jobsData';
import { JobCard } from './JobCard';

export const JobsPage = () => {
  // Estados para los filtros
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedType, setSelectedType] = useState('Todos');
  const [selectedExperience, setSelectedExperience] = useState('Todos');

  // Obtener opciones únicas para los filtros basados en los datos actuales
  const categories = ['Todas', ...new Set(jobsData.map(job => job.category))];
  const types = ['Todos', ...new Set(jobsData.map(job => job.type))];
  const experiences = ['Todos', ...new Set(jobsData.map(job => job.experience))];

  // Filtrar los trabajos
  const filteredJobs = useMemo(() => {
    return jobsData.filter((job) => {
      const matchCategory = selectedCategory === 'Todas' || job.category === selectedCategory;
      const matchType = selectedType === 'Todos' || job.type === selectedType;
      const matchExperience = selectedExperience === 'Todos' || job.experience === selectedExperience;
      
      return matchCategory && matchType && matchExperience;
    });
  }, [selectedCategory, selectedType, selectedExperience]);

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      
      {/* ── Hero Section ── */}
      <section className="bg-cranberry text-white py-16 px-6 lg:px-8 text-center relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl -top-20 -left-20" aria-hidden="true" />
        <div className="absolute w-[300px] h-[300px] bg-white/10 rounded-full blur-2xl bottom-0 right-0" aria-hidden="true" />
        
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-montserrat font-bold tracking-widest uppercase bg-white/20">
            Bolsa de Trabajo Local
          </span>
          <h1 className="font-garet text-4xl md:text-5xl lg:text-6xl leading-tight">
            Encontrá tu próximo trabajo en Arrecifes
          </h1>
          <p className="font-montserrat text-lg md:text-xl text-cranberry-light opacity-90 max-w-2xl mx-auto">
            Conectamos el talento de nuestra ciudad con las mejores oportunidades locales. Explora las búsquedas activas.
          </p>
        </div>
      </section>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-10">
        
        {/* ── Sidebar: Filtros ── */}
        <aside className="w-full lg:w-1/4 lg:shrink-0">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm sticky top-32">
            <h2 className="font-garet text-xl text-gray-900 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-cranberry" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filtros
            </h2>

            <div className="space-y-6">
              {/* Filtro: Categoría */}
              <div>
                <label className="block text-sm font-montserrat font-semibold text-gray-700 mb-2">Rubro</label>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="category"
                        value={cat}
                        checked={selectedCategory === cat}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-4 h-4 text-cranberry border-gray-300 focus:ring-cranberry"
                      />
                      <span className={`text-sm font-montserrat ${selectedCategory === cat ? 'text-gray-900 font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filtro: Tipo */}
              <div>
                <label className="block text-sm font-montserrat font-semibold text-gray-700 mb-2">Jornada</label>
                <div className="space-y-2">
                  {types.map(type => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="type"
                        value={type}
                        checked={selectedType === type}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-4 h-4 text-cranberry border-gray-300 focus:ring-cranberry"
                      />
                      <span className={`text-sm font-montserrat ${selectedType === type ? 'text-gray-900 font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filtro: Experiencia */}
              <div>
                <label className="block text-sm font-montserrat font-semibold text-gray-700 mb-2">Experiencia</label>
                <div className="space-y-2">
                  {experiences.map(exp => (
                    <label key={exp} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="experience"
                        value={exp}
                        checked={selectedExperience === exp}
                        onChange={(e) => setSelectedExperience(e.target.value)}
                        className="w-4 h-4 text-cranberry border-gray-300 focus:ring-cranberry"
                      />
                      <span className={`text-sm font-montserrat ${selectedExperience === exp ? 'text-gray-900 font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>
                        {exp}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

            </div>

            {/* Reset Filters */}
            {(selectedCategory !== 'Todas' || selectedType !== 'Todos' || selectedExperience !== 'Todos') && (
              <button 
                onClick={() => {
                  setSelectedCategory('Todas');
                  setSelectedType('Todos');
                  setSelectedExperience('Todos');
                }}
                className="mt-6 w-full py-2 px-4 border border-gray-200 text-gray-600 rounded-lg text-sm font-montserrat font-medium hover:bg-gray-50 transition-colors"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </aside>

        {/* ── Lista de Trabajos ── */}
        <main className="w-full lg:w-3/4">
          <div className="mb-6 flex justify-between items-end">
            <h2 className="font-garet text-2xl text-gray-900">
              Ofertas Activas
            </h2>
            <span className="font-montserrat text-sm text-gray-500">
              {filteredJobs.length} {filteredJobs.length === 1 ? 'resultado' : 'resultados'}
            </span>
          </div>

          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="font-garet text-2xl text-gray-900 mb-2">No encontramos ofertas</h3>
              <p className="font-montserrat text-gray-500 max-w-md mx-auto">
                No hay búsquedas activas que coincidan con los filtros seleccionados. Probá cambiando alguna opción.
              </p>
              <button 
                onClick={() => {
                  setSelectedCategory('Todas');
                  setSelectedType('Todos');
                  setSelectedExperience('Todos');
                }}
                className="mt-6 px-6 py-2 bg-cranberry/10 text-cranberry font-montserrat font-semibold rounded-full hover:bg-cranberry/20 transition-colors"
              >
                Ver todas las ofertas
              </button>
            </div>
          )}
        </main>

      </div>
    </div>
  );
};
