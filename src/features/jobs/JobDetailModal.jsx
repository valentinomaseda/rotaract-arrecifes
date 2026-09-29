import React, { useEffect, useRef } from "react";

/* --- Icons --- */
const XIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const CheckIcon = () => (
  <svg className="w-4 h-4 text-cranberry flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);
const BriefcaseIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);
const ClockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const MapPinIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const StarIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

/* --- Main Component --- */
export const JobDetailModal = ({ job, onClose }) => {
  const panelRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  useEffect(() => { panelRef.current?.focus(); }, []);

  if (!job) return null;

  const isEmail = job.applyVia?.startsWith("mailto:");
  const buttonText = isEmail ? "Enviar CV por Email" : "Postularse / Contactar";

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-label={`Detalle: ${job.title}`}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative flex flex-col w-full max-w-lg h-full bg-white shadow-2xl focus:outline-none"
        style={{ animation: "slideInRight 0.3s cubic-bezier(0.32, 0.72, 0, 1) both" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="relative flex-shrink-0 px-7 pt-8 pb-6"
          style={{ background: "linear-gradient(135deg, #0a0a0f 0%, #12071a 60%, #0f0a1a 100%)" }}
        >
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-10 right-0 w-48 h-48 rounded-full opacity-20"
              style={{ background: "radial-gradient(circle, #d41367 0%, transparent 70%)", filter: "blur(40px)" }} />
          </div>

          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 flex items-center justify-center w-9 h-9 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Cerrar"
          >
            <XIcon />
          </button>

          <div className="relative z-10 flex flex-wrap gap-2 mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-montserrat font-semibold bg-white/10 text-white/80 border border-white/20">
              {job.category}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-montserrat font-semibold bg-cranberry/30 text-pink-200 border border-cranberry/40">
              {job.type}
            </span>
            {job.modality && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-montserrat font-semibold bg-emerald-900/40 text-emerald-300 border border-emerald-700/40">
                {job.modality}
              </span>
            )}
          </div>

          <div className="relative z-10">
            <h2 className="font-garet text-2xl text-white leading-tight mb-1">{job.title}</h2>
            <p className="font-montserrat text-base font-bold text-cranberry">{job.company}</p>
          </div>

          {job.experience && (
            <div className="relative z-10 flex flex-wrap gap-x-5 gap-y-2 mt-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-montserrat text-white/60">
                <StarIcon /> {job.experience}
              </span>
            </div>
          )}
        </div>

        {/* Scrollable body */}
        <div className="flex-grow overflow-y-auto px-7 py-6 space-y-6">
          {job.description && (
            <div>
              <h3 className="font-montserrat text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <BriefcaseIcon /> Descripcion del puesto
              </h3>
              <p className="font-montserrat text-sm text-gray-700 leading-relaxed">{job.description}</p>
            </div>
          )}

          {job.responsibilities && job.responsibilities.length > 0 && (
            <div>
              <h3 className="font-montserrat text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                Tareas y responsabilidades
              </h3>
              <ul className="space-y-2">
                {job.responsibilities.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 font-montserrat text-sm text-gray-700">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {job.requirements && job.requirements.length > 0 && (
            <div>
              <h3 className="font-montserrat text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                Requisitos
              </h3>
              <ul className="space-y-2">
                {job.requirements.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 font-montserrat text-sm text-gray-700">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sticky CTA footer */}
        <div className="flex-shrink-0 px-7 py-5 border-t border-gray-100 bg-white">
          <a
            href={job.applyVia}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex justify-center items-center gap-2 px-6 py-3.5 rounded-full bg-cranberry text-white font-montserrat font-semibold text-sm hover:bg-cranberry-dark shadow-lg shadow-cranberry/25 hover:shadow-cranberry/40 transition-all duration-300"
          >
            {buttonText}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
      `}</style>
    </div>
  );
};
