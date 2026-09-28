import React, { useState, useMemo } from 'react';
import { JobCard } from './JobCard';
import { jobsData } from '../../data/jobsData';

export const JobsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedType, setSelectedType] = useState('Todos');

  const categories = ['Todas', ...Array.from(new Set(jobsData.map(j => j.category)))];
  const types = ['Todos', ...Array.from(new Set(jobsData.map(j => j.type)))];

  const filteredJobs = useMemo(() => {
    return jobsData.filter(job => {
      const matchCategory = selectedCategory === 'Todas' || job.category === selectedCategory;
      const matchType = selectedType === 'Todos' || job.type === selectedType;
      return matchCategory && matchType;
    });
  }, [selectedCategory, selectedType]);
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ── Hero Section ── */}
      <section
        className="relative text-white py-20 px-6 lg:px-8 text-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #12071a 40%, #0f0a1a 70%, #080810 100%)' }}
      >
        {/* Blobs de luz */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-30"
            style={{ background: 'radial-gradient(ellipse, #d41367 0%, transparent 65%)', filter: 'blur(80px)' }} />
          <div className="absolute bottom-0 -left-20 w-[350px] h-[350px] rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, #e91e8c 0%, transparent 70%)', filter: 'blur(80px)' }} />
          <div className="absolute bottom-0 -right-20 w-[300px] h-[300px] rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, #6d28d9 0%, transparent 70%)', filter: 'blur(80px)' }} />
          {/* Grid sutil */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }} />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-5">
          {/* Badge glassmorphism */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-montserrat font-bold tracking-widest uppercase"
            style={{
              background: 'rgba(212,19,103,0.18)',
              border: '1px solid rgba(212,19,103,0.35)',
              backdropFilter: 'blur(12px)',
            }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cranberry opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cranberry" />
            </span>
            Bolsa de Trabajo Local
          </span>

          <h1 className="font-garet text-4xl md:text-5xl lg:text-6xl leading-tight">
            Encontrá tu próximo{' '}
            <span style={{
              background: 'linear-gradient(90deg, #d41367, #ff6eb0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>trabajo en Arrecifes</span>
          </h1>
          <p className="font-montserrat text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
            Todas las ofertas de empleo de Arrecifes, centralizadas en un solo lugar. Encontrá tu próximo desafío.
          </p>
        </div>
      </section>

      {/* ── Jobs Section ── */}
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20 flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-1/4">
          <FilterSidebar 
            categories={categories}
            types={types}
            selectedCategory={selectedCategory}
            selectedType={selectedType}
            setSelectedCategory={setSelectedCategory}
            setSelectedType={setSelectedType}
          />
        </aside>
        <main className="w-full lg:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          {filteredJobs.length === 0 && (
             <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 mt-6">
               <p className="text-gray-500 font-montserrat">No se encontraron trabajos con los filtros seleccionados.</p>
             </div>
          )}
        </main>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   Chevron icon — rotates when open
───────────────────────────────────────────────────────────── */
const ChevronIcon = ({ open }) => (
  <svg
    className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

/* ─────────────────────────────────────────────────────────────
   FilterGroup — individual collapsible section (mobile only)
   On lg+ it's always open and the button is non-interactive.
───────────────────────────────────────────────────────────── */
const FilterGroup = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      {/* Header row */}
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between py-3 lg:pointer-events-none focus:outline-none"
        aria-expanded={open}
      >
        <span className="text-sm font-montserrat font-semibold text-gray-700">{title}</span>
        <span className="lg:hidden">
          <ChevronIcon open={open} />
        </span>
      </button>

      {/*
        Mobile: height-based transition controlled by `open` state.
        Desktop (lg+): always visible via `lg:!max-h-none lg:!overflow-visible`.
        We use inline style for max-height to allow smooth animation.
      */}
      <div
        style={{ maxHeight: open ? '500px' : '0px' }}
        className="overflow-hidden transition-[max-height] duration-300 ease-in-out lg:!max-h-none lg:!overflow-visible"
      >
        <div className="pb-3">
          {children}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   FilterSidebar — outer panel.
   Mobile: the whole card collapses/expands with a top toggle.
   Desktop (lg+): always open, no toggle shown.
───────────────────────────────────────────────────────────── */
const FilterSidebar = ({
  categories, types,
  selectedCategory, selectedType,
  setSelectedCategory, setSelectedType,
}) => {
  const [panelOpen, setPanelOpen] = useState(false);

  const activeCount =
    (selectedCategory !== 'Todas' ? 1 : 0) +
    (selectedType !== 'Todos' ? 1 : 0);
  const hasActive = activeCount > 0;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm lg:sticky lg:top-32">

      {/* ── Panel header / mobile toggle ── */}
      <button
        type="button"
        onClick={() => setPanelOpen(v => !v)}
        className="w-full flex items-center justify-between px-6 py-5 lg:pointer-events-none focus:outline-none"
        aria-expanded={panelOpen}
      >
        <span className="font-garet text-xl text-gray-900 flex items-center gap-2">
          <svg className="w-5 h-5 text-cranberry" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filtros
          {/* Badge with active filter count — only on mobile */}
          {hasActive && (
            <span className="lg:hidden inline-flex items-center justify-center w-5 h-5 rounded-full bg-cranberry text-white text-[10px] font-montserrat font-bold">
              {activeCount}
            </span>
          )}
        </span>
        <span className="lg:hidden">
          <ChevronIcon open={panelOpen} />
        </span>
      </button>

      {/* ── Filter group container ── */}
      <div
        style={{ maxHeight: panelOpen ? '700px' : '0px' }}
        className="overflow-hidden transition-[max-height] duration-300 ease-in-out lg:!max-h-none lg:!overflow-visible"
      >
        <div className="px-6">

          {/* Rubro */}
          <FilterGroup title="Rubro">
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
          </FilterGroup>

          {/* Jornada */}
          <FilterGroup title="Jornada">
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
          </FilterGroup>



          {/* Limpiar filtros */}
          {hasActive && (
            <div className="py-4">
              <button
                onClick={() => {
                  setSelectedCategory('Todas');
                  setSelectedType('Todos');
                }}
                className="w-full py-2 px-4 border border-gray-200 text-gray-600 rounded-lg text-sm font-montserrat font-medium hover:bg-gray-50 transition-colors"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
