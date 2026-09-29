import React from "react";

const ClockIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const MapPinIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const ChevronRightIcon = () => (
  <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export const JobCard = ({ job, onOpenDetail }) => {
  return (
    <div className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col h-full">
      {/* Badges */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-montserrat font-semibold bg-gray-100 text-gray-600">
          {job.category}
        </span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-montserrat font-semibold bg-cranberry/10 text-cranberry border border-cranberry/20">
          {job.type}
        </span>
        {job.modality && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-montserrat font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            {job.modality}
          </span>
        )}
      </div>

      {/* Title & Company */}
      <div className="mb-3">
        <h3 className="font-garet text-lg text-gray-900 leading-snug mb-0.5">{job.title}</h3>
        <p className="font-montserrat text-sm font-bold text-cranberry">{job.company}</p>
      </div>

      {/* Short description preview (max 2 lines) */}
      {job.description && (
        <p className="font-montserrat text-xs text-gray-500 leading-relaxed line-clamp-2 mb-4 flex-grow">
          {job.description}
        </p>
      )}

      {/* Meta + CTA */}
      <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
        {/* Meta info */}
        <div className="flex items-center gap-3 text-gray-400">
          {job.schedule && (
            <span className="inline-flex items-center gap-1 text-xs font-montserrat">
              <ClockIcon /> {job.schedule}
            </span>
          )}
          {job.modality && (
            <span className="inline-flex items-center gap-1 text-xs font-montserrat">
              <MapPinIcon /> {job.modality}
            </span>
          )}
        </div>

        {/* Ver detalle button */}
        <button
          onClick={() => onOpenDetail(job)}
          className="group inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-cranberry text-white font-montserrat font-semibold text-xs hover:bg-cranberry-dark shadow-sm shadow-cranberry/20 hover:shadow-cranberry/30 transition-all duration-200 flex-shrink-0"
        >
          Ver detalle
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
};
