import React from 'react';

export const JobsPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ── Hero Section ── */}
      <section className="bg-cranberry text-white py-16 px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl -top-20 -left-20" aria-hidden="true" />
        <div className="absolute w-[300px] h-[300px] bg-white/10 rounded-full blur-2xl bottom-0 right-0" aria-hidden="true" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-montserrat font-bold tracking-widest uppercase bg-white/20">
            Bolsa de Trabajo Local
          </span>
          <h1 className="font-garet text-4xl md:text-5xl lg:text-6xl leading-tight">
            Encontrá tu próximo trabajo en Arrecifes
          </h1>
          <p className="font-montserrat text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Conectamos el talento de nuestra ciudad con las mejores oportunidades locales.
          </p>
        </div>
      </section>

      {/* ── Coming Soon ── */}
      <div className="max-w-3xl mx-auto px-6 py-24 flex flex-col items-center text-center">

        {/* Animated icon */}
        <div className="relative mb-10">
          {/* Outer pulsing ring */}
          <span
            className="absolute inset-0 rounded-full bg-cranberry/10 animate-ping"
            style={{ animationDuration: '2.4s' }}
            aria-hidden="true"
          />
          <div className="relative w-28 h-28 rounded-full bg-white border border-gray-100 shadow-lg flex items-center justify-center">
            <svg
              className="w-12 h-12 text-cranberry"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
              />
            </svg>
          </div>
        </div>

        {/* Badge */}
        <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-montserrat font-bold tracking-widest uppercase bg-cranberry/10 text-cranberry">
          Próximamente
        </span>

        <h2 className="font-garet text-4xl md:text-5xl text-gray-900 mb-5 leading-tight">
          Estamos preparando<br />algo especial
        </h2>

        <p className="font-montserrat text-gray-500 text-lg max-w-xl leading-relaxed">
          La bolsa de trabajo de Rotaract Arrecifes estará disponible muy pronto. 
          Vamos a conectar el talento local con las mejores oportunidades de nuestra ciudad.
        </p>

        {/* Divider dots */}
        <div className="flex gap-2 mt-10 mb-10" aria-hidden="true">
          <span className="w-2 h-2 rounded-full bg-cranberry/30" />
          <span className="w-2 h-2 rounded-full bg-cranberry/60" />
          <span className="w-2 h-2 rounded-full bg-cranberry" />
          <span className="w-2 h-2 rounded-full bg-cranberry/60" />
          <span className="w-2 h-2 rounded-full bg-cranberry/30" />
        </div>

        {/* Feature preview cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-2">
          {[
            {
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              ),
              label: 'Ofertas locales',
              desc: 'Empleos de empresas de Arrecifes',
            },
            {
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              ),
              label: 'Filtros inteligentes',
              desc: 'Por rubro, jornada y experiencia',
            },
            {
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              ),
              label: 'Alertas de empleo',
              desc: 'Notificaciones de nuevas búsquedas',
            },
          ].map(({ icon, label, desc }) => (
            <div
              key={label}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center gap-3 opacity-60"
            >
              <div className="w-10 h-10 rounded-full bg-cranberry/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-cranberry" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  {icon}
                </svg>
              </div>
              <p className="font-montserrat font-semibold text-gray-700 text-sm">{label}</p>
              <p className="font-montserrat text-gray-400 text-xs leading-snug">{desc}</p>
            </div>
          ))}
        </div>
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
  categories, types, experiences,
  selectedCategory, selectedType, selectedExperience,
  setSelectedCategory, setSelectedType, setSelectedExperience,
}) => {
  const [panelOpen, setPanelOpen] = useState(false);

  const activeCount =
    (selectedCategory !== 'Todas' ? 1 : 0) +
    (selectedType !== 'Todos' ? 1 : 0) +
    (selectedExperience !== 'Todos' ? 1 : 0);
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

          {/* Experiencia */}
          <FilterGroup title="Experiencia">
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
          </FilterGroup>

          {/* Limpiar filtros */}
          {hasActive && (
            <div className="py-4">
              <button
                onClick={() => {
                  setSelectedCategory('Todas');
                  setSelectedType('Todos');
                  setSelectedExperience('Todos');
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
