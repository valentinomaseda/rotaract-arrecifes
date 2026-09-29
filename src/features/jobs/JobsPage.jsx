import React, { useState, useMemo, useCallback } from "react";
import { JobCard } from "./JobCard";
import { JobDetailModal } from "./JobDetailModal";
import { jobsData } from "../../data/jobsData";

/* ================================================================
   ICONS
================================================================ */
const SearchIcon = () => (
  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);
const ChevronIcon = ({ open }) => (
  <svg
    className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);
const ArrowDownIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

/* ================================================================
   CUSTOM CHECKBOX — cranberry branded
================================================================ */
const CustomCheckbox = ({ checked, onChange, label }) => (
  <label className="flex items-center gap-3 cursor-pointer group select-none">
    {/* Hidden native input for a11y + keyboard support */}
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="sr-only"
    />
    {/* Visual box */}
    <span
      className="flex-shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-150"
      style={{
        background: checked ? '#d41367' : 'white',
        borderColor: checked ? '#d41367' : '#d1d5db',
        boxShadow: checked ? '0 0 0 3px rgba(212,19,103,0.15)' : 'none',
      }}
    >
      {checked && (
        <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2 6l3 3 5-5" />
        </svg>
      )}
    </span>
    {/* Label text */}
    <span className={`text-sm font-montserrat transition-colors duration-150 ${
      checked ? 'text-gray-900 font-semibold' : 'text-gray-600 group-hover:text-gray-900'
    }`}>
      {label}
    </span>
  </label>
);

/* ================================================================
   JOBS PAGE
================================================================ */
export const JobsPage = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);

  const categories = useMemo(() => Array.from(new Set(jobsData.map((j) => j.category))), []);
  const types      = useMemo(() => Array.from(new Set(jobsData.map((j) => j.type))),     []);

  const filteredJobs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return jobsData.filter((job) => {
      const matchCat  = selectedCategories.length === 0 || selectedCategories.includes(job.category);
      const matchType = selectedTypes.length === 0 || selectedTypes.includes(job.type);
      const matchQ    = !q || [job.title, job.company, job.description].some((f) => f?.toLowerCase().includes(q));
      return matchCat && matchType && matchQ;
    });
  }, [selectedCategories, selectedTypes, searchQuery]);

  const hasFilters = selectedCategories.length > 0 || selectedTypes.length > 0 || searchQuery.trim().length > 0;
  const activeFilterCount = selectedCategories.length + selectedTypes.length;

  const clearFilters = useCallback(() => {
    setSelectedCategories([]);
    setSelectedTypes([]);
    setSearchQuery("");
  }, []);

  const toggleCategory = (cat) =>
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );

  const toggleType = (type) =>
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );

  const scrollToJobs = () => {
    document.getElementById("jobs-list")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ── Hero Section (compacto) ── */}
      <section
        className="relative text-white py-14 px-6 lg:px-8 text-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0a0a0f 0%, #12071a 40%, #0f0a1a 70%, #080810 100%)" }}
      >
        {/* Blobs */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-30"
            style={{ background: "radial-gradient(ellipse, #d41367 0%, transparent 65%)", filter: "blur(70px)" }} />
          <div className="absolute bottom-0 -left-20 w-[280px] h-[280px] rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, #e91e8c 0%, transparent 70%)", filter: "blur(70px)" }} />
          <div className="absolute bottom-0 -right-20 w-[240px] h-[240px] rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, #6d28d9 0%, transparent 70%)", filter: "blur(70px)" }} />
          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }} />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Live badge */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full text-xs font-montserrat font-bold tracking-widest uppercase"
            style={{
              background: "rgba(212,19,103,0.18)",
              border: "1px solid rgba(212,19,103,0.35)",
              backdropFilter: "blur(12px)",
            }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cranberry opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cranberry" />
            </span>
            Bolsa de Trabajo Local
          </span>

          <h1 className="font-garet text-3xl md:text-4xl lg:text-5xl leading-tight mb-3">
            Encontra trabajo{" "}
            <span style={{
              background: "linear-gradient(90deg, #d41367, #ff6eb0)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>en Arrecifes</span>
          </h1>

          {/* Contador de ofertas */}
          <p className="font-montserrat text-white/60 text-base mb-6">
            <span className="text-white font-bold text-xl">{jobsData.length}</span> ofertas disponibles en este momento
          </p>

          {/* CTA scroll */}
          <button
            onClick={scrollToJobs}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-montserrat font-semibold text-sm text-white border border-white/20 hover:bg-white/10 transition-colors"
          >
            Ver ofertas <ArrowDownIcon />
          </button>
        </div>
      </section>

      {/* ── Jobs Section ── */}
      <div id="jobs-list" className="max-w-7xl mx-auto px-6 py-10 lg:py-14 flex flex-col lg:flex-row gap-8">

        {/* ── SIDEBAR ── */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <FilterSidebar
            categories={categories}
            types={types}
            selectedCategories={selectedCategories}
            selectedTypes={selectedTypes}
            toggleCategory={toggleCategory}
            toggleType={toggleType}
            activeFilterCount={activeFilterCount}
            onClear={clearFilters}
          />
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 min-w-0">
          {/* Search bar + result count */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center mb-6">
            <div className="relative flex-1 w-full">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="search"
                id="jobs-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por puesto, empresa o palabra clave..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white font-montserrat text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-cranberry/30 focus:border-cranberry/60 transition-all"
              />
            </div>
            <span className="font-montserrat text-sm text-gray-500 whitespace-nowrap flex-shrink-0">
              <span className="font-bold text-gray-800">{filteredJobs.length}</span> oferta{filteredJobs.length !== 1 ? "s" : ""} encontrada{filteredJobs.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Active filter chips */}
          {hasFilters && (
            <div className="flex flex-wrap gap-2 mb-5">
              {selectedCategories.map((cat) => (
                <button key={cat} onClick={() => toggleCategory(cat)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cranberry/10 text-cranberry border border-cranberry/20 text-xs font-montserrat font-semibold hover:bg-cranberry/20 transition-colors">
                  {cat}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              ))}
              {selectedTypes.map((type) => (
                <button key={type} onClick={() => toggleType(type)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-montserrat font-semibold hover:bg-purple-100 transition-colors">
                  {type}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              ))}
              {searchQuery.trim() && (
                <button onClick={() => setSearchQuery("")}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200 text-xs font-montserrat font-semibold hover:bg-gray-200 transition-colors">
                  "{searchQuery}"
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              )}
            </div>
          )}

          {/* Grid */}
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} onOpenDetail={setSelectedJob} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-garet text-xl text-gray-700 mb-1">Sin resultados</p>
              <p className="font-montserrat text-sm text-gray-500 mb-4">No encontramos ofertas con los filtros aplicados.</p>
              <button onClick={clearFilters}
                className="px-5 py-2 rounded-full bg-cranberry text-white font-montserrat font-semibold text-sm hover:bg-cranberry-dark transition-colors">
                Limpiar filtros
              </button>
            </div>
          )}
        </main>
      </div>

      {/* ── Detail Modal ── */}
      {selectedJob && (
        <JobDetailModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
};

/* ================================================================
   FILTER GROUP — collapsible on mobile, always open on desktop
================================================================ */
const FilterGroup = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-3 lg:pointer-events-none focus:outline-none"
        aria-expanded={open}
      >
        <span className="text-sm font-montserrat font-semibold text-gray-700">{title}</span>
        <span className="lg:hidden">
          <ChevronIcon open={open} />
        </span>
      </button>
      <div
        style={{ maxHeight: open ? "500px" : "0px" }}
        className="overflow-hidden transition-[max-height] duration-300 ease-in-out lg:!max-h-none lg:!overflow-visible"
      >
        <div className="pb-3">{children}</div>
      </div>
    </div>
  );
};

/* ================================================================
   FILTER SIDEBAR
================================================================ */
const FilterSidebar = ({
  categories, types,
  selectedCategories, selectedTypes,
  toggleCategory, toggleType,
  activeFilterCount, onClear,
}) => {
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm lg:sticky lg:top-32">
      {/* Mobile toggle header */}
      <button
        type="button"
        onClick={() => setPanelOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-5 lg:pointer-events-none focus:outline-none"
        aria-expanded={panelOpen}
      >
        <span className="font-garet text-lg text-gray-900 flex items-center gap-2">
          <svg className="w-5 h-5 text-cranberry" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filtros
          {activeFilterCount > 0 && (
            <span className="lg:hidden inline-flex items-center justify-center w-5 h-5 rounded-full bg-cranberry text-white text-[10px] font-montserrat font-bold">
              {activeFilterCount}
            </span>
          )}
        </span>
        <span className="lg:hidden">
          <ChevronIcon open={panelOpen} />
        </span>
      </button>

      {/* Filter groups container */}
      <div
        style={{ maxHeight: panelOpen ? "800px" : "0px" }}
        className="overflow-hidden transition-[max-height] duration-300 ease-in-out lg:!max-h-none lg:!overflow-visible"
      >
        <div className="px-6">

          {/* Rubro — checkboxes */}
          <FilterGroup title="Rubro">
            <div className="space-y-2.5">
              {categories.map((cat) => (
                <CustomCheckbox
                  key={cat}
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  label={cat}
                />
              ))}
            </div>
          </FilterGroup>

          {/* Jornada — checkboxes */}
          <FilterGroup title="Jornada">
            <div className="space-y-2.5">
              {types.map((type) => (
                <CustomCheckbox
                  key={type}
                  checked={selectedTypes.includes(type)}
                  onChange={() => toggleType(type)}
                  label={type}
                />
              ))}
            </div>
          </FilterGroup>

          {/* Limpiar */}
          {activeFilterCount > 0 && (
            <div className="py-4">
              <button
                onClick={onClear}
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
